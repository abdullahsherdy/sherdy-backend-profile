# Site-Wide — Performance, SEO, Accessibility, Design Consistency

**Status:** proposed · **Date:** 2026-08-23 · **Owner area:** cross-cutting technical
**Source:** parallel site audit (cross-cutting analyst), grounded in the real production build output. Line anchors as-reported — re-confirm at implementation.

## Context

This plan covers concerns that span the whole site rather than one section: bundle/performance, SEO/structured data, accessibility, dark mode, and design-system consistency. It's the technical backbone behind the section-level plans.

**Build reality (measured, not guessed):** the alarming-looking `cynefin` (690 kB), `mermaid.core` (595 kB), `cytoscape` (443 kB), and `katex` (258 kB) chunks are **correctly lazy / on-demand** — they load only inside articles that use those diagram/math types, and current visitors never download most of them. The one real problem is the **home `index` chunk at 812 kB (248 kB gzip)**, which every visitor pays on first paint.

## Goal alignment

Performance and SEO are how a recruiter or student *arrives* and how fast the page proves itself. The accessibility fixes (Contact labels, contrast, aria-labels) are both correctness (WCAG) and conversion — a form a screen reader can't navigate is a lost lead.

---

## Performance — trim the 812 kB home chunk

`vite.config.ts:1-22` has **no `manualChunks`**, so vendor code lands in one big home bundle. Targets, largest reducible first:

### P1
1. **Supabase umbrella is the biggest reducible weight (~130–160 kB).** `@supabase/supabase-js` is pulled onto the **home path eagerly** via `Hero.tsx:6-7` + `Reviews.tsx:7-9` → `useReviews.ts` → `supabase.ts:1`. The app only ever calls `.select()` / `.insert()`. **Fix options:** use the narrower `@supabase/postgrest-js` against the REST endpoint, or dynamic-import the client so it's off the critical path (reviews can hydrate just after first paint). Biggest single win.
2. **Every article's full Markdown is eager-globbed.** `articles.ts:16-20` uses `import.meta.glob(..., { eager: true })`, and the home imports it via `LatestArticles.tsx:5`. So **all article bodies ship in the home chunk** and it grows linearly with each article published. **Fix:** split frontmatter/metadata (needed for the home teaser + list) from the body (needed only in the reader) — glob metadata eagerly, lazy-import bodies.

### P2
3. **Add `manualChunks`** to split the React/router/query vendor core from app code so it caches independently across deploys.
4. **Defer Mermaid to viewport.** `MermaidDiagram.tsx:10` imports mermaid on mount; render on intersection instead. (Pairs with the theme-toggle bug fix in `content-pages`.)
5. **Slim rehype-highlight languages** (`ArticleView.tsx:101`) to the set actually used (C#, bash, json, …) instead of the full common set.
6. **`QueryClient` uses defaults** (`App.tsx:15`) — set sane `staleTime`/`gcTime` so reviews aren't refetched needlessly.
7. **Remove dead deps:** `recharts` (only referenced by unused `ui/chart.tsx:2`) and `embla-carousel` (unused `ui/carousel.tsx`). Confirm no other import, then drop.

**Correctly off the home path already (do not "fix"):** framer-motion and React Flow are article/roadmap-only; the diagram/math giants are lazy. Don't chase them.

---

## SEO — strong foundation, four gaps

Foundation is genuinely good: `Seo.tsx` manages title/description/OG, `structuredData.ts` emits a JSON-LD `@graph`, `prerender.mjs` prerenders routes (fails open), `robots.txt` + generated `sitemap.xml` exist.

### P1
1. **No `AggregateRating` / `Review` schema despite having review data.** Emit it from the real reviews — attached to `Course` / `Service` / `Organization`, **not** `Person` (Google disallows `Person` aggregateRating and may penalize). Depends on having ≥ a few reviews. Strong rich-result opportunity.
2. **No `Course` schema.** The teaching offering has no structured-data representation. Add `Course` (and/or `Service`) JSON-LD so courses are eligible for rich results — directly serves goals #2–3.

### P2
3. **Soft-404s.** `vercel.json:4` rewrites all unknown paths to the homepage with HTTP 200, and NotFound has no `Seo`/`noindex` — so bad URLs look like duplicate homepages to crawlers. Add `noindex` on NotFound (cross-listed in `content-pages` #9); consider a real 404 status where feasible.

### P3
4. **`og:image` never set dynamically** (`Seo.tsx:33-37`) — one static image for all pages. Thread per-article `cover` through (cross-listed in `content-pages` #4).

---

## Accessibility

### P1 (WCAG failures / easy)
1. **Contact form has NO real labels — placeholder-only** (`Contact.tsx:109,124,140`). Placeholders vanish on input and aren't reliably announced → WCAG 3.3.2 / 4.1.2 fail on the site's primary conversion form. Add visible `<label>`s (or visually-hidden labels wired via `htmlFor`/`id`). **Highest-priority a11y fix** — it's the conversion form.
2. **Amber text fails AA contrast in light mode.** `--accent` (`38 90% 50%`) as text on light backgrounds is ~2.5:1 (needs 4.5:1). Affects `Hero.tsx:84-85`, `Reviews.tsx:33`, and any amber body text. **Fix:** darken the amber used *for text* (keep the bright amber for borders/fills/icons, which don't need text contrast), or only use amber text on dark surfaces. Design-token decision — see DS section.

### P2
3. **Dark-mode toggle has no `aria-label`** (cross-listed in `navbar` #4).
4. **`prefers-reduced-motion` gaps:** `UpdatesPage.tsx:37`, `LearningRoadmap` animated edges (`:120/131/226`) + `index.css:307`, and the Hero `animate-ping` (`:20`) aren't covered by the reduced-motion rules. Extend the `@media (prefers-reduced-motion: reduce)` block to disable/така them.
5. **Two `<nav>` landmarks unlabeled** and **skip-link is home-only** (both cross-listed in `navbar`).

---

## Dark mode

- **Strength — don't regress:** FOUC is properly prevented via the inline script in `index.html:11-19` + `useDarkMode.ts:4-6`. Keep this.
- **P2:** `theme-color` meta (`index.html:9-10`) doesn't follow the manual toggle — the mobile browser chrome stays one color when the user flips themes. Update it from the toggle.
- **P2:** Shadows use hardcoded `rgba(0,0,0,0.1)` (`index.css:165`) which is invisible on the dark navy background — elevation disappears in dark mode. Tokenize shadows with `hsl(var(--foreground) / …)` (see DS-03).

---

## Design-system consistency

The design system (`docs/design-system.md`) is well-documented but has drifted from code in both directions:

### Doc is stale (update the doc)
- **DS-02** (`MagneticButton > a` invalid HTML) is marked **High/open** but is **resolved in code** — `asChild` is implemented. Downgrade/close in the doc (`design-system.md:252`).
- **DS-04** (amber unused) is marked open but amber usage has **improved** — update to reflect current state (`:254`).

### Code drift (fix the code)
- **`LatestArticles.tsx:11` breaks section anatomy** — `py-16` with no `px-4`, and missing `scroll-mt-24` + `data-section`. Bring it in line (also referenced in `navbar` for the anchor offset).
- **`Projects` uses `py-20`** where the documented standard is `py-16` — minor vertical-rhythm drift.

### Still-open DS issues (unchanged)
- **DS-01** `--secondary` == `--muted` (identical values) — differentiate or document as intentional.
- **DS-03** shadows hardcoded, not tokenized — see dark-mode above.
- **DS-05** no gradient tokens — gradients live in component CSS.

**Note:** the amber-contrast a11y fix (#2 above) and DS-04 are the same token conversation — resolve them together: define a text-safe amber vs a fill/border amber.

---

## Sequencing
1. **Contact form labels (a11y P1)** — trivial, it's the conversion form, do first.
2. **Amber text contrast (a11y P1 + DS-04)** — token decision, affects Hero/Reviews.
3. **Supabase off the home critical path + split article metadata/body (perf P1)** — the two real bundle wins; measure before/after with `npm run build`.
4. **AggregateRating + Course schema (SEO P1)** — once review volume supports it; big rich-result upside for goals #1–3.
5. **manualChunks, dead-dep removal, reduced-motion, theme-color, shadow tokens, DS doc sync (P2)** — batchable cleanup.

## Verification (manual)
- **Perf:** `npm run build`, compare the `index` chunk before/after (target: well under 812 kB; Supabase no longer in the eager home chunk). Confirm reviews still load on the home page.
- **SEO:** validate JSON-LD in Google's Rich Results Test (aggregateRating on Course/Service/Org, not Person); confirm NotFound emits `noindex`.
- **A11y:** Contact form fields have programmatic labels (screen-reader pass); amber text meets 4.5:1 (contrast checker); reduced-motion disables the flagged animations; theme-color follows the toggle on mobile.
- **Dark mode:** no FOUC on reload; shadows visible; toggle re-themes everything including Mermaid diagrams.
- `npm run lint` clean; `updates.ts` entries for user-facing changes (faster load, accessible contact form).
