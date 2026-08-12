/**
 * Prerender each route to a static HTML snapshot so non-JS crawlers (most AI
 * answer-engine bots + social scrapers) and search engines get real per-route
 * <title>/<meta>/JSON-LD and page content — not the empty `<div id="root">` shell.
 *
 * Mechanism: headless-browser snapshot (NOT SSR-based SSG). We run the *real*
 * built app in Chromium via `vite preview`, so `Seo.tsx`'s useEffect and every
 * DOM-dependent component (React Flow, framer-motion, etc.) work unchanged, and
 * the snapshot contains the fully-rendered DOM.
 *
 * The client still bootstraps with createRoot (not hydrateRoot), so there is a
 * brief re-render over the prerendered HTML — an accepted tradeoff for a
 * portfolio that avoids hydration-mismatch crashes from animation libs / ids.
 *
 * Runs after `vite build` (see package.json). Writes dist/<route>/index.html.
 * Fail-soft per route; only a failed homepage exits non-zero.
 */
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { preview } from "vite";
import puppeteer from "puppeteer";

const DIST = "dist";
const ARTICLES_DIR = "src/content/articles";
const PORT = 4183;

// Reuse the sitemap script's frontmatter reader so route discovery stays in sync.
function frontmatterField(raw, key) {
  const match = new RegExp(`^${key}:\\s*(.+)$`, "m").exec(raw.split(/^---$/m)[1] ?? "");
  return match ? match[1].trim().replace(/^["']|["']$/g, "") : "";
}

async function discoverRoutes() {
  const files = (await readdir(ARTICLES_DIR)).filter((f) => f.endsWith(".md"));
  const articleRoutes = [];
  for (const file of files) {
    const raw = await readFile(join(ARTICLES_DIR, file), "utf8");
    if (frontmatterField(raw, "draft") === "true") continue; // drafts excluded from prod builds
    const slug = frontmatterField(raw, "slug") || file.replace(/\.md$/, "");
    articleRoutes.push(`/articles/${slug}`);
  }
  // /playground is an interactive Monaco tool with no SEO value — deliberately excluded.
  return ["/", "/articles", "/updates", ...articleRoutes];
}

/** Scroll top-to-bottom to trigger framer-motion whileInView reveals + lazy imports. */
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const step = 600;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        total += step;
        if (total >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 60);
    });
  });
  await page.evaluate(() => window.scrollTo(0, 0));
}

function outPathFor(route) {
  return route === "/"
    ? join(DIST, "index.html")
    : join(DIST, route.replace(/^\//, ""), "index.html");
}

async function snapshot(page, baseUrl, route) {
  await page.goto(baseUrl + route, { waitUntil: "networkidle0", timeout: 45000 });
  // Wait for the SPA to actually render content and set its per-route title.
  await page.waitForFunction(
    () => {
      const root = document.getElementById("root");
      return root && root.children.length > 0 && !!document.title;
    },
    { timeout: 30000 }
  );
  await autoScroll(page);
  await new Promise((r) => setTimeout(r, 400)); // let Seo.tsx's effect + reveals settle
  const html = "<!DOCTYPE html>\n" + (await page.evaluate(() => document.documentElement.outerHTML));

  const outPath = outPathFor(route);
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, html, "utf8");
  return html.length;
}

const routes = await discoverRoutes();

const server = await preview({
  preview: { port: PORT, strictPort: true },
  logLevel: "warn",
});
const baseUrl = server.resolvedUrls?.local?.[0]?.replace(/\/$/, "") ?? `http://localhost:${PORT}`;

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
  defaultViewport: { width: 1366, height: 900 },
});

let failed = 0;
try {
  const page = await browser.newPage();
  for (const route of routes) {
    try {
      const bytes = await snapshot(page, baseUrl, route);
      console.log(`  prerendered ${route} -> ${outPathFor(route)} (${bytes} bytes)`);
    } catch (err) {
      failed++;
      console.error(`  FAILED ${route}: ${err.message}`);
      if (route === "/") {
        // The homepage is the one route we cannot ship as an empty shell.
        throw new Error("Homepage prerender failed — aborting build.");
      }
    }
  }
  await page.close();
} finally {
  await browser.close();
  await server.httpServer?.close();
}

console.log(`prerender complete: ${routes.length - failed}/${routes.length} routes`);
// A failed homepage already threw above (build aborts). Individual article/page
// failures are fail-soft — they still ship as the SPA shell, so exit clean.
// Explicit exit also guarantees termination if the preview server keeps sockets open.
process.exit(0);
