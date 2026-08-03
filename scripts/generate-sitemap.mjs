import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const SITE_URL = "https://abdullahsherdy.tech";
const ARTICLES_DIR = "src/content/articles";

const staticPages = [
  { loc: "/", priority: "1.0" },
  { loc: "/articles", priority: "0.8" },
];

function frontmatterField(raw, key) {
  const match = new RegExp(`^${key}:\\s*(.+)$`, "m").exec(raw.split(/^---$/m)[1] ?? "");
  return match ? match[1].trim().replace(/^["']|["']$/g, "") : "";
}

const files = (await readdir(ARTICLES_DIR)).filter((f) => f.endsWith(".md"));
const articleEntries = [];
for (const file of files) {
  const raw = await readFile(join(ARTICLES_DIR, file), "utf8");
  if (frontmatterField(raw, "draft") === "true") continue;
  const slug = frontmatterField(raw, "slug") || file.replace(/\.md$/, "");
  const date = frontmatterField(raw, "date");
  articleEntries.push({ loc: `/articles/${slug}`, priority: "0.7", lastmod: date });
}

const urls = [...staticPages, ...articleEntries]
  .map(
    (p) =>
      `  <url>\n    <loc>${SITE_URL}${p.loc}</loc>\n${p.lastmod ? `    <lastmod>${p.lastmod}</lastmod>\n` : ""}    <priority>${p.priority}</priority>\n  </url>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

await writeFile("public/sitemap.xml", xml);
console.log(`sitemap.xml written with ${staticPages.length + articleEntries.length} URLs`);
