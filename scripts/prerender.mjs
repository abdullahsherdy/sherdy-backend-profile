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
 * Prerendering is a build-time SEO *enhancement*, never a deploy blocker: any
 * failure (browser won't launch, a route errors) is logged loudly and the build
 * still exits 0, shipping the client-rendered SPA (whose index.html already
 * carries baseline title/description/OG/Person JSON-LD).
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
  //
  // Order matters: `vite preview` serves dist/index.html as the SPA fallback for any
  // route without its own file. We overwrite dist/index.html with the homepage snapshot,
  // which bakes the homepage @graph (incl. FAQPage) into that file as static <script> tags
  // that React (createRoot) does NOT clean up on other routes. So the homepage MUST be
  // prerendered LAST — that way every other route falls back to the clean built shell
  // (baseline Person only) and never inherits the homepage's FAQ/ProfilePage nodes.
  return [...articleRoutes, "/articles", "/updates", "/"];
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

/**
 * Launch Chromium. On Linux (Vercel's serverless build image) the Chromium that
 * ships with `puppeteer` fails to start — the image lacks shared libraries it needs
 * (libnspr4.so, …). So on Linux we point puppeteer at @sparticuz/chromium, a Chromium
 * built for AWS Lambda / Vercel with those libs bundled. Locally (Windows/macOS) we
 * use puppeteer's own bundled Chromium, so a dev machine needs no extra setup.
 */
async function launchBrowser() {
  const viewport = { width: 1366, height: 900 };
  if (process.platform === "linux") {
    const chromium = (await import("@sparticuz/chromium")).default;
    chromium.setGraphicsMode = false; // no GPU/WebGL in a headless build container
    return puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      defaultViewport: viewport,
    });
  }
  return puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: viewport,
  });
}

const routes = await discoverRoutes();

let server;
let browser;
let failed = 0;
try {
  server = await preview({ preview: { port: PORT, strictPort: true }, logLevel: "warn" });
  const baseUrl = server.resolvedUrls?.local?.[0]?.replace(/\/$/, "") ?? `http://localhost:${PORT}`;

  browser = await launchBrowser();
  const page = await browser.newPage();
  for (const route of routes) {
    try {
      const bytes = await snapshot(page, baseUrl, route);
      console.log(`  prerendered ${route} -> ${outPathFor(route)} (${bytes} bytes)`);
    } catch (err) {
      failed++;
      console.error(`  ⚠️  prerender FAILED ${route}: ${err.message}`);
    }
  }
  await page.close();
} catch (err) {
  // Browser couldn't launch (or preview wouldn't start). Ship the SPA shell — it
  // still has baseline SEO — and warn loudly rather than break the deployment.
  const bar = "=".repeat(72);
  console.error(`\n${bar}`);
  console.error("⚠️  PRERENDER SKIPPED — could not run headless Chromium.");
  console.error(`    ${err.message}`);
  console.error("    The site deploys as a client-rendered SPA (baseline SEO intact).");
  console.error(`${bar}\n`);
} finally {
  await browser?.close().catch(() => {});
  await server?.httpServer?.close();
}

if (failed > 0) {
  console.error(
    `\n⚠️  prerender: ${routes.length - failed}/${routes.length} routes rendered, ${failed} failed (those ship as the SPA shell).`
  );
} else {
  console.log(`prerender complete: ${routes.length} routes`);
}
// Never fail the build over prerendering — it is an enhancement. Explicit exit also
// guarantees termination if the preview server keeps sockets open.
process.exit(0);
