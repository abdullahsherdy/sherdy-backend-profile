# Content Pages — Articles, Playground, Updates, 404

**Status:** proposed · **Date:** 2026-08-23 · **Owner area:** non-home routes
**Source:** parallel site audit (content-pages analyst). Line anchors as-reported — re-confirm at implementation.

## Context

Beyond the home page the site has four route surfaces: `/articles` (list) + `/articles/:slug` (reader), `/playground` (standalone C# editor), `/updates` (changelog), and the `*` catch-all (NotFound). The articles system is the authority engine — Markdown files rendered with react-markdown, syntax highlighting, a runnable-C# playground, per-article SEO, reading-position persistence. It's genuinely strong. The gaps are **conversion** (articles convert to nothing), **discoverability** (the playground is orphaned), and **polish** on the thin pages (Updates, 404).

Reality check: there is currently **one published article**. Several "sparse" findings below are partly a volume problem that fixes itself as articles are added — but the conversion and discoverability gaps are real today.

## Goal alignment

An article is often a recruiter's or student's **first** touch (via search). Yet the article footer offers only social links — it converts a warm reader to *nothing*. Closing that loop (reader → "hire me" / "learn with me") is the highest-value content-pages work for goals #1–3.

---

## P0 — Discoverability

### 1. `/playground` is orphaned
- **Finding:** The route is live (`App.tsx:28`) but its nav link (`Navbar.tsx:16`) and footer link (`Footer.tsx:8`) are **both commented out**. The runnable-C# playground — a strong, uncommon engineering *and* teaching differentiator — is reachable only by typing the URL. `PlaygroundPage.tsx:34` also passes a dead `activeSection="playground"`.
- **Fix:** Re-enable the nav + footer links; clean up the dead `activeSection`. (Cross-listed as `navbar/plan.md` #5.)

---

## P1 — Conversion

### 2. The article footer converts to nothing
- **Finding:** `AuthorFooter.tsx:9-31` renders only social links. A reader who just finished a deep .NET tutorial is the *warmest* lead the site gets, and is offered no next step toward hiring or learning.
- **Fix:** Rebuild the footer CTA to offer two clear paths: **"Hire me"** → home `#contact`, and **"Learn with me" / mentorship** → home `#services` (or a dedicated booking link when available). Keep socials secondary. This is the single highest-value content change.

### 3. Articles list has no conversion path or wayfinding
- **Finding:** `/articles` is a bare 3-col grid (`ArticleList.tsx:27`) with a tag filter that's meaningless at one article (`:13-22`), no CTA, no subscribe/RSS, no search/sort. Header ignores the `.eyebrow` convention (`ArticlesPage.tsx:25-30`).
- **Fix:** Add a short intro + a CTA band (hire / learn). Gate the tag filter to render only when tags are plural. Bring the header into the `.eyebrow` + `SectionHeading` system. Defer search/sort/RSS until article count justifies them — but note the deferral so it's a choice, not an oversight.

---

## P2 — Article reader polish & real bugs

### 4. Per-article Open Graph image is missing
- **Finding:** `Seo.tsx` has no `image` prop; `structuredData.ts:277` hard-codes a generic image; the `cover` frontmatter field *is* parsed (`articles.ts:32`) but never used. Every article shares one generic social-share preview.
- **Fix:** Thread `cover` → `Seo` `image` → OG/Twitter tags + article JSON-LD. High leverage for shared links. (Cross-listed in `site-wide/plan.md` SEO.)

### 5. Reader bugs
- **MermaidDiagram theme bug:** `MermaidDiagram.tsx:12` reads `isDark` once and keys the render on `[code]` only, so diagrams don't re-render on dark/light toggle — they keep the theme they first rendered with. Add the theme to the effect deps.
- **`dateModified` == `datePublished`** always (`structuredData.ts:271-272`) — wire a real modified date (frontmatter or file mtime) so "freshness" signals aren't faked.
- **CodeCompare has no syntax highlighting** (`CodeCompare.tsx:59`) — plain text where the rest of the article is highlighted; inconsistent.
- **Quiz answers render as plain text** (`Quiz.tsx:73`) — no formatting/markdown.

### 6. Missing reader affordances
- No share button, no related/next-article link, no "back to all articles" beyond the nav. At one article these are low-value; add share + next when count grows. Note as deferred.

### 7. Article-not-found fallback is bare
- **Finding:** `ArticlePage.tsx:48-57` renders a bare "not found" with no Navbar/Footer/Seo — a jarring dead end mid-site.
- **Fix:** Give it the standard page shell (see `site-wide` PageShell idea) + a link back to `/articles`.

---

## P2 — Updates page

### 8. Amber "Fixed" collides with the design system
- **Finding:** `UpdatesPage.tsx:13` uses amber to mean "Fixed". Site-wide, **amber = teaching/services**, not a status color. This overloads the token's meaning.
- **Fix:** Use `--destructive`/neutral or a dedicated status palette for update *kinds*; keep amber reserved for teaching. Also: the timeline dot is always `bg-primary` regardless of kind (`:45`) — color it by kind. Header ignores `.eyebrow` (`:29-32`) — bring it into the convention. Optional: filter-by-kind control.

---

## P2 — NotFound (404)

### 9. Off-brand, reloads, un-noindexed
- **Findings:**
  - Only links home; the raw `<a href="/">` (`:19`) forces a full reload instead of client-side nav.
  - Off-brand: no Navbar/Footer/Seo/logo; uses `font-bold` not `font-display` (`:17`).
  - Leftover `console.error` (`:7-12`).
  - No `noindex` — and because `vercel.json:4` rewrites everything to the homepage with a 200, unknown URLs are **soft-404s** (SEO issue, cross-listed in `site-wide`).
- **Fix:** Rebuild on the standard shell (Navbar/Footer/Seo with `noindex`), `font-display`, router `<Link>`, drop the `console.error`, and offer useful links (home, articles, contact) instead of a dead end.

---

## P1 — De-duplication (shared components)

The content pages repeat three things that should be extracted:

- **Author byline is duplicated** — rendered both in `ArticleView.tsx:78-92` and `AuthorFooter.tsx:4-32`. Extract a single `<AuthorByline>` and use it in both.
- **Page-shell boilerplate** (Navbar + skip target + Seo + Footer) is hand-repeated per page and *missing* on NotFound and the article-not-found branch. Extract a `<PageShell>` and adopt it everywhere — this also fixes #7 and #9 and the route-level skip-link gap (see `navbar`/`site-wide`).
- **Date formatting is triplicated** — `ArticleCard.tsx:12`, `ArticleView.tsx:60`, `UpdatesPage.tsx:51`. Extract one `formatDate` helper (this is where the `dateModified` fix and any relative-date display should also live).

---

## What's already good (don't regress)
- `CollectionPage` + breadcrumb JSON-LD on the articles list.
- Reading-progress bar on article cards (`ArticleCard.tsx:25-29`) and accessible full-card overlay link (`:36-37`).
- The playground itself is well-built; the only real issue is discoverability (#1) — plus thin first-time guidance (`PlaygroundPage.tsx:8-22`: add example snippets) and hard-to-use Monaco on mobile (`Playground.tsx:63`).

## Sequencing
1. **#1 playground discoverability (P0)** — one-line uncomment, high value.
2. **#2 article footer CTA (P1)** — the top conversion win.
3. **De-dup extractions (PageShell / AuthorByline / formatDate)** — unlocks #7, #9, and route skip-links cheaply.
4. **#4 OG image + #5 Mermaid theme bug (P2)** — real correctness fixes.
5. **Updates + NotFound polish (P2)**; defer search/RSS/related-articles until article volume justifies them.

## Verification (manual)
- Playground reachable from nav + footer; no dead `activeSection` warning.
- Article footer offers hire + learn paths that resolve to `#contact` / `#services`.
- Toggle theme on an article with a Mermaid diagram → diagram re-themes.
- Shared article link shows its own `cover` image in preview (OG debugger).
- 404 page renders full shell, `noindex`, client-side links, no console noise.
- `npm run build` + `npm run lint` clean; `updates.ts` entry for user-facing changes (playground link, article CTAs).
