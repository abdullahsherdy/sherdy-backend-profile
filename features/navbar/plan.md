# Navigation Enhancements — Navbar, Footer, Scrollspy

**Status:** proposed · **Date:** 2026-08-23 · **Owner area:** site-wide navigation
**Source:** parallel site audit (navigation analyst). All line anchors are as-reported — re-confirm at implementation.

## Context

The nav is a fixed top bar (`src/components/sections/Navbar.tsx`) mixing same-page anchor links (`/#projects`) with route links (Articles → `/articles`), plus a portaled mobile drawer, two social icons, and a dark-mode toggle. Active state is driven by one `IntersectionObserver` scrollspy in `src/pages/Index.tsx`. The `<main>` order and `navLinks` order currently match the intended flow (Projects → Skills → Learning → Experience → Services → Articles → Reviews → About → Contact), and PublicWork is correctly excluded from nav/scrollspy.

**The structure is sound. The gaps are conversion affordances, a broken résumé link, scrollspy reliability, and accessibility.**

## Goal alignment

The always-visible nav is the one element a recruiter sees no matter where they scroll — yet today it offers **zero conversion action** and **no working résumé**. Fixing that is the highest-leverage nav work for goal #1 (hiring).

---

## P0 — Goal-critical bug

### 1. The "Download CV" link 404s
- **Finding:** `Hero.tsx` links to `/resume/Abdullah_Sherdy_SWE.pdf`, but the file on disk is `public/resume/abdullahshery.swe.pdf` (verified, ~145 KB). The names differ in spelling, casing, and separators — it 404s everywhere and is guaranteed to fail on Vercel's case-sensitive filesystem.
- **Impact:** The site's *only* résumé link is dead. Direct hit to goal #1.
- **Fix:** Reconcile the href with the actual filename (rename the file to a clean slug like `Abdullah-Sherdy-Backend-Engineer.pdf` and point the link at it — do both in one change so the URL is also human-readable). Consider committing the résumé filename as a constant in `src/data/portfolio.ts` so Hero + nav + footer all reference one source.

---

## P1 — High impact

### 2. No persistent CTA in the bar
- **Finding:** The bar is links + 2 social icons + theme toggle (`Navbar.tsx:57-88`). The only "Hire Me" lives in the Hero; once scrolled past, there is no persistent conversion action.
- **Fix:** Add a primary CTA button in the bar — "Hire me" (→ `#contact`) and/or a "Résumé" button (→ the fixed PDF). Keep it a single teal primary so hierarchy stays clear. On mobile, surface it at the top of the drawer.

### 3. Scrollspy reliability (three real defects)
- **`#learning` stops being observed.** The observer effect runs once on mount with empty deps and grabs `getElementById("learning")` — which at first paint is the Suspense *fallback* div. When the lazy `LearningRoadmap` resolves, the fallback unmounts and the real `<section id="learning">` is never observed, so "Learning" never activates. **Fix:** re-run observation after the roadmap mounts (observe via a ref, or re-query when the lazy chunk resolves / add `learning` to effect deps keyed on a "loaded" flag).
- **Contact may never activate at page bottom.** Classic bottom-of-page scrollspy failure — if Contact doesn't reach the 40–45% active band at max scroll, it never highlights. **Fix:** add a bottom sentinel, or on `scrollY + innerHeight >= scrollHeight` force the last section active.
- **Last-writer-wins flicker.** The callback sets active to the *last* intersecting entry in the batch rather than the topmost. **Fix:** pick the topmost intersecting entry.

---

## P2 — Medium impact

### 4. Accessibility fixes (mostly easy)
- **Unlabeled theme toggles:** desktop (`Navbar.tsx:86`) and mobile (`:146`) toggles are icon-only `<Button size="icon">` with no `aria-label` → announced as nameless "button" (WCAG 4.1.2). Add `aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}`.
- **Hamburger** (`:91-98`) lacks `aria-expanded` / `aria-controls`; label stays "Open menu" while open. Wire both.
- **Mobile drawer** (`:111`) has `aria-label` but no `role="dialog"` / `aria-modal="true"`, and **no real focus trap** (focus is *moved* to the close button but Tab can walk into the background). Add dialog semantics + a genuine trap.
- **`aria-current`** is set on desktop links but not mobile (`:130, :139`).
- **Skip link + `id="main"` are home-only** (`Index.tsx:59-66`). Route pages (`/articles`, `/articles/:slug`, `/updates`, `/playground`) have neither, so keyboard users tab through the whole navbar every time. (Cross-listed in `site-wide/plan.md`.)
- **Two unlabeled `<nav>` landmarks** (`Navbar.tsx:47`, `Footer.tsx:6`) — add distinguishing `aria-label` ("Primary", "Footer").

### 5. Surface hidden pages & contact channels
- **`/playground` is orphaned** — its nav (`Navbar.tsx:16`) and footer (`Footer.tsx:8`) links are both commented out, yet the route is live. The runnable-C# playground is a strong engineering/teaching differentiator reachable only by typing the URL. Re-enable it. (Cross-listed in `content-pages/plan.md` as its top discoverability fix.)
- **`socials` carries `email`, `youtube`, `leetcode`, `whatsapp`** but the desktop bar exposes only GitHub + LinkedIn. Add a `mailto:` shortcut for recruiters (and consider YouTube, which already appears in the mobile drawer but not desktop).
- **Dead wiring:** `PlaygroundPage` passes `activeSection="playground"` to a nav link that no longer exists — clean up when re-adding the link.

### 6. Rebuild the Footer as a second conversion surface
- **Finding:** The footer (`Footer.tsx`) is just two links (Articles, Updates) + copyright — no socials, no email, no résumé, no back-to-top, no section mirror. After a long single-scroll page, it does almost nothing for any goal.
- **Fix:** Real footer — a compact mirror of the home sections, socials (aligned with the bar's set), email, résumé link, back-to-top. This is where a reader who scrolled the whole page lands.

---

## P3 — Low / polish

### 7. Small fixes
- Add `scroll-mt-24` to `LearningRoadmap.tsx:219` (`id="learning"`) and `LatestArticles.tsx:11` (`id="articles"`) so anchor jumps clear the fixed bar (their headings currently tuck under it).
- Make the logo a router `<Link>` instead of raw `<a href="/">` (`Navbar.tsx:50`) so it doesn't force a full reload from route pages.
- Sticky bar is fully static (no scroll listener) — optional polish: add a subtle shadow/border-strengthen on scroll. Low priority; current blur bar is fine.

---

## Sequencing

1. **CV 404 (P0)** — trivial, goal-critical, ship immediately.
2. **aria-labels on toggles + hamburger (P2)** — trivial, ships with #1.
3. **Persistent nav CTA (P1)** — small, high value.
4. **Scrollspy fixes (P1)** — the `#learning` re-observe and bottom-activation are real bugs worth a focused pass.
5. **Playground/footer/skip-link (P2)** — medium batch.

## Verification (manual — repo has no test runner)

- `npm run dev`: CV button downloads the real PDF; nav CTA resolves to `#contact`/résumé; scroll top→bottom highlights track correctly incl. Learning (after roadmap loads) and Contact at the very bottom; playground reachable from nav + footer.
- Keyboard: Tab reaches a visible skip link on every route; theme toggle and hamburger announce proper names; mobile drawer traps focus and closes on Escape.
- `npm run build` + `npm run lint` clean.
- **Per project convention:** add an entry to `src/data/updates.ts` for any user-facing change (e.g. the résumé fix, the new nav CTA).
