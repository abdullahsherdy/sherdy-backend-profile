# Implementation Tracker — Site Enhancement Plans

**Started:** 2026-08-24 · **Mode:** section-by-section, **user reviews each section before the next**
**Source plans:** [`home-page`](./home-page/plan.md) · [`navbar`](./navbar/plan.md) · [`reviews/presentation`](./reviews/presentation.md) · [`content-pages`](./content-pages/plan.md) · [`site-wide`](./site-wide/plan.md)

Goal priority driving order: **(1) get hired → (2) get students → (3) market services → (4) show work → (5) social proof.**

## Review protocol

Each **section** below is implemented as one unit, verified (`npm run lint` + `npm run build`), then **presented for your review**. Nothing proceeds to the next section until you approve. No commits/pushes unless you ask.

Legend: `[ ]` todo · `[~]` in progress · `[x]` done · `[⏸]` deferred (needs asset/decision from you)

---

## ✅ Already done (quick wins + 2026-08-21 home reorg)

- [x] Résumé 404 fixed · false "verified" label removed · Projects `asChild` · Contact form labels · `/playground` re-linked · toggle aria-labels · "Hire Me"→`#contact` · Calendly CTA gated
- [x] Home reorg: engineering-first order, de-duplication, background-tint rhythm

---

## Section 1 — Home page  (owner: `home-page/plan.md`)  ✅ implemented — awaiting review

- [x] **1A** Lead with the strongest backend project (reorder `projects[]`, FixMate first) — home #3
- [x] **1B** Trim the End-to-End Software Development card from 12 tags → 6 — home #5
- [x] **1C** `LatestArticles` header → `SectionHeading`/`.eyebrow` + normalize section anatomy (`px-4`, `scroll-mt-24`, `data-section`) — home #7 / site-wide DS
- [x] **1D** Move `PublicWork` stats into `portfolio.ts` (`publicWork`) — home #8 · *YouTube stat still qualitative — quantify once real counts provided*
- [x] **1E** WorkExperience engineering/teaching balance — call-forward tile fills the empty engineering cell, links to `#projects` — home #9
- [⏸] **1F** Add a Hero portrait — needs a photo asset from you — home #6

## Section 2 — Navbar & Footer  (owner: `navbar/plan.md`)  ✅ implemented — awaiting review

- [x] **2A** Persistent nav CTA ("Hire me" → `/#contact`) in desktop bar + top of mobile drawer; also "Hire me" + "Résumé" in the new footer. *Desktop CTA gated to `lg+` so it doesn't crowd the already-dense `md` bar (10 links); mobile drawer always shows it. Résumé path extracted to `resumeUrl` in `portfolio.ts` (single source, reused by Hero/Footer) — the file already existed, so navbar #1's "404" was stale.* — navbar #2
- [x] **2B** Scrollspy fixes: `#learning` re-observe (LearningRoadmap `onReady` → `roadmapLoaded` re-runs the effect) · bottom-activation for Contact (rAF scroll listener) · topmost-wins (shared `visible` Set, no flicker) — navbar #3
- [x] **2C** a11y: hamburger `aria-expanded`/`aria-controls` · drawer `role="dialog"`+`aria-modal`+real Tab focus-trap+focus-restore · mobile `aria-current` · labelled `<nav>` landmarks (Primary / Mobile / Footer) — navbar #4
- [x] **2D** Footer rebuilt as a second conversion surface (brand+tagline · Hire me/Résumé CTAs · Explore section-mirror · Connect socials+email · copyright + reduced-motion-aware back-to-top) — navbar #6
- [x] **2E** Polish: `scroll-mt-24` on `#learning` (already present on `#articles`) · logo as router `<Link>` — navbar #7

## Section 3 — Reviews  (owner: `reviews/presentation.md`)  ✅ implemented — awaiting review

- [x] **3A** Tinted category initial-avatars + short date on each `ReviewCard`; `computeReviewStats` gained `showAverage` (N ≥ 3 gate) — numeric average now suppressed below 3 reviews in both the Reviews summary line and the Hero social-proof strip (shows count-only). `formatReviewDate` added to `lib/reviews.ts`. *Star-distribution bar skipped — meaningless at low N and contradicts the average-suppression gate.* — reviews #4, #5
- [x] **3B** Segmented tabs (All · Clients & Engineering · Students & Parents) filtering the fetched list client-side by `category` (no new fetch/schema); each tab promotes its strongest review (highest rating, then longest quote) as a wider `featured` lead card, rest in the grid; empty-category tabs show a gentle note. Category tinting via avatar + existing left accent bar. *No carousel (Direction B explicitly rejected in the plan).* — reviews #2, #3
- [x] **3C** Copy already instant-publish (verified — no stale moderation wording anywhere) · client validation parity added (name ≤ 80, role ≤ 60 + `maxLength` attrs) · StarRating a11y: keyboard change now moves DOM focus to the selected star (fixes roving-tabindex desync) + new `describedById` prop wires the rating error via `aria-describedby`. *Submit-success is announced by the existing toast live region + Radix focus-return; no extra focus juggling added.* — reviews #7, #8, #9

*Security model untouched: RLS stays the boundary, `approved` stays a dashboard kill switch, all changes are client-side filter/display. Schema additions (`verified`, `project_slug`) remain deferred.*

## Section 4 — Content pages  (owner: `content-pages/plan.md`)

- [ ] **4A** Extract shared `PageShell` / `AuthorByline` / `formatDate` (unlocks 4E cheaply) — content-pages de-dup
- [ ] **4B** Article footer CTA — "Hire me" (`#contact`) + "Learn with me" (`#services`) — content-pages #2
- [ ] **4C** Articles list: intro + CTA band · gate tag filter to plural · `.eyebrow` header — content-pages #3
- [ ] **4D** Per-article OG image (`cover`→`Seo`) + reader bugs (Mermaid theme · real `dateModified` · CodeCompare highlight · Quiz markdown) — content-pages #4, #5
- [ ] **4E** Updates kind-colors (stop overloading amber) · rebuild NotFound on the shell (`noindex`, `<Link>`, no `console.error`) — content-pages #8, #9

## Section 5 — Site-wide technical  (owner: `site-wide/plan.md`)

- [ ] **5A** Amber text-contrast token (text-safe amber vs fill/border amber) — a11y #2 + DS-04
- [ ] **5B** Perf: Supabase off the eager home path + split article metadata/body — perf P1
- [ ] **5C** Perf/polish: `manualChunks` · drop dead deps (`recharts`, `embla`) · `QueryClient` staleTime · reduced-motion gaps · `theme-color` follows toggle · tokenize shadows — perf/a11y/dark P2
- [ ] **5D** SEO structured data: `AggregateRating` + `Course`/`Service` (on Org/Course, not Person) · NotFound `noindex` — SEO P1
- [ ] **5E** Design-system doc sync (DS-02/DS-04 status) — DS

---

## Cross-section notes

- Every user-facing change gets a newest-first `src/data/updates.ts` entry (project convention).
- Some items are cross-listed; each is owned once here to avoid double-work.
- `[⏸]` items need something from you (a portrait photo; a real Calendly URL) before they can ship.

## Progress log

- 2026-08-24 — tracker created; awaiting choice of starting section.
- 2026-08-24 — **Section 1 (Home page) implemented** — 1A–1E applied; lint clean (0 errors), build passes (4 routes prerendered). 1F deferred (portrait asset). Awaiting user review before Section 2.
- 2026-08-24 — **Section 2 (Navbar & Footer) implemented** — 2A–2E applied across Navbar, Footer, Index scrollspy, LearningRoadmap (`onReady`), Hero + `portfolio.ts` (`resumeUrl`). Two `updates.ts` entries prepended. Awaiting user review before Section 3.
- 2026-08-24 — **Section 3 (Reviews) implemented** — 3A–3C applied across `lib/reviews.ts` (`showAverage` gate + `formatReviewDate`), `ReviewCard` (avatars, dates, `featured` lead variant), `Reviews.tsx` (segmented tabs + client-side filter + lead card), `Hero.tsx` (average gated), `ReviewForm`/`StarRating` (validation parity + a11y). One `updates.ts` entry prepended. Lint clean (0 errors), build passes (4 routes). Per user instruction, proceeding to Section 4 without pausing — full set to be reviewed at the end.
