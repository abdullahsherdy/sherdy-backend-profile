# Site Audit & Enhancement Plans

**Date:** 2026-08-23 · **Status:** proposed (analysis + plans — nothing implemented yet)

This folder holds the whole-site enhancement audit for the portfolio. Each subfolder is one area, with a `plan.md` (the reviews folder also keeps its original build plan). Every plan is **advisory** — prioritized, file-anchored findings for you to greenlight, not changes already made. Pick a plan (or just the P0/P1 items across plans), approve it, and it gets implemented.

## Site goal priority (drives every recommendation)

1. **Get hired** for software-engineering roles
2. **Get students** for courses
3. **Market teaching services** (private/group courses, mentorship)
4. **Show the work** (projects, public work, articles)
5. **Show social proof** (reviews)

## The plans

| Area | File | Covers |
|---|---|---|
| **Home page** | [`home-page/plan.md`](./home-page/plan.md) | Per-section content/UX on the (already-reorganized) home page: the Projects `asChild` bug, hero CTA misdirection, project ordering, Calendly check, Services tag overload, portrait, de-dup re-check |
| **Navigation** | [`navbar/plan.md`](./navbar/plan.md) | Navbar + footer + scrollspy: the broken CV link, no persistent CTA, scrollspy defects, a11y (labels/focus-trap), orphaned `/playground`, footer rebuild |
| **Reviews** | [`reviews/presentation.md`](./reviews/presentation.md) | Presentation & trust: the now-false "verified" label, segmented-tab presentation, average-until-N≥3, dates/avatars, StarRating a11y (companion to the existing [`reviews/plan.md`](./reviews/plan.md)) |
| **Content pages** | [`content-pages/plan.md`](./content-pages/plan.md) | Articles/playground/updates/404: article footer converts to nothing, playground discoverability, OG images, Mermaid theme bug, shared-component extraction (`PageShell`/`AuthorByline`/`formatDate`) |
| **Site-wide** | [`site-wide/plan.md`](./site-wide/plan.md) | Cross-cutting technical: the 812 kB home chunk (eager Supabase + markdown), SEO schema gaps (AggregateRating/Course), a11y (Contact labels, amber contrast), dark-mode shadows/theme-color, design-system drift |

## Top quick wins (highest value ÷ effort — start here)

These are small, high-impact, and mostly independent. Ranked:

| # | Fix | Where | Owning plan | Effort |
|---|---|---|---|---|
| 1 | **Résumé link 404s** — Hero links `/resume/Abdullah_Sherdy_SWE.pdf`; file is `public/resume/abdullahshery.swe.pdf` | `Hero.tsx:60` | navbar #1 (P0) | trivial |
| 2 | **"verified" label is now false** — reviews are anonymous instant-publish; remove the word (or earn a real badge) | `ReviewCard.tsx:28`, `Hero.tsx:82/87`, `Reviews.tsx:35` | reviews #1 (P0) | trivial |
| 3 | **Invalid `button > a`** in Projects — add `asChild` to 3 MagneticButtons | `Projects.tsx:35/43/92` | home #1 (P0) | trivial |
| 4 | **Contact form has no labels** (placeholder-only) — WCAG fail on the conversion form | `Contact.tsx:109/124/140` | site-wide a11y #1 | trivial |
| 5 | **`/playground` is orphaned** — nav + footer links commented out; route is live | `Navbar.tsx:16`, `Footer.tsx:8` | content-pages #1 / navbar #5 | trivial |
| 6 | **aria-labels** on the icon-only theme toggles + hamburger | `Navbar.tsx:86/91/146` | navbar #4 | trivial |
| 7 | **"Hire Me" primary CTA scrolls to Projects, not contact** — relabel or retarget | `Hero.tsx:56` | home #2 | trivial |
| 8 | **Verify the Calendly URL** — "Book a Free Call" is the primary CTA on every service card; likely a placeholder | `Services.tsx:9` | home #4 | needs your confirm |

Fixing #1–#7 is roughly a single focused sitting and clears the most damaging issues (dead résumé, a false trust claim, an invalid-HTML a11y bug, an unlabeled conversion form, a hidden flagship feature).

## Bigger efforts (worth planning separately)

- **Trim the 812 kB home chunk** — get `@supabase/supabase-js` off the eager home path and split article metadata from bodies (`site-wide` perf). The biggest measurable performance win.
- **Reviews presentation** — segmented "Clients & Engineering / Students & Parents" tabs + a promoted lead review (`reviews` #2).
- **SEO structured data** — add `AggregateRating` (on Course/Service/Org, not Person) + `Course` schema (`site-wide` SEO) once review volume supports it.
- **Article conversion + shared shell** — rebuild the article footer to offer hire/learn paths and extract `PageShell`/`AuthorByline`/`formatDate` (`content-pages`).

## Cross-cutting items (owned once, referenced everywhere)

Several findings surface in more than one area. To avoid double-work, each is **owned by one plan**; others cross-reference it:

- **Broken CV** → owned by `navbar` (also hits home).
- **False "verified"** → owned by `reviews` (also in Hero).
- **Contact labels / amber contrast / reduced-motion / skip-links** → owned by `site-wide` a11y (skip-links also in `navbar`).
- **Playground discoverability** → owned by `content-pages` (also in `navbar`).
- **Section-anatomy drift** (`LatestArticles`, `Projects py-20`) → owned by `site-wide` (also noted in `home-page`/`navbar`).
- **OG image per article** → owned by `content-pages` (also in `site-wide` SEO).

## Notes & loose ends

- **Home-page analysis was done by direct code read**, not an agent — the delegated analyst hit the same transient stream error twice, so this area was reviewed first-hand against current code. That read caught one bug the automated cross-cutting pass got wrong: it reported DS-02 (`MagneticButton > a`) as "resolved in code," but `Projects.tsx` was never converted (quick win #3).
- **The home page is already reorganized/de-duplicated** (shipped 2026-08-21). These plans are the *next* layer, not a redo. A fresh de-dup check (home #, "De-duplication re-check") confirms no further content duplication remains — the repetition you originally sensed was resolved in the reorg.
- **Two uncommitted doc edits** are outstanding from the prior task (`CLAUDE.md`, `docs/design-system.md`). Not committed — waiting on your say-so. The `design-system.md` "Known Issues" table is also now partly stale (DS-02 resolved except in Projects; DS-04 improved) — a doc-sync is listed in `site-wide`.
- **The earlier "issue in LearningRoadmap.tsx"** appears to be doc drift, not a code defect — no tsc/lint/build error was found. The one real, *separate* roadmap-adjacent bug is the Mermaid theme-toggle issue in articles (`content-pages` #5) and the scrollspy `#learning` re-observe defect (`navbar` #3). If you meant something specific by "issue," point me at the symptom and I'll dig in.
- **No code has been changed.** Every item above is a proposal. Tell me which plan(s) to implement — or just "do the quick wins" — and I'll execute with the usual verification (`npm run build`/`lint`, an `updates.ts` entry per user-facing change) and confirm before committing.
