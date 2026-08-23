# Home Page — Section-Level Enhancements (Post-Reorg)

**Status:** proposed · **Date:** 2026-08-23 · **Owner area:** home page (`src/pages/Index.tsx` + `src/components/sections/*`)
**Source:** direct code read (the home-sections analyst agent failed twice on a transient stream error, so this pass was done first-hand against current code). Line anchors verified this session.

## Context

The home page was **already reorganized and de-duplicated** in the prior pass (shipped 2026-08-21, "Redesigned the home page flow"). Current `<main>` order is the intended engineering-first narrative:

**Hero → Projects → PublicWork → Skills → Learning → WorkExperience → Services → LatestArticles → Reviews → About → Contact**

That flow is good and should be preserved. The earlier de-duplication is confirmed complete: GenzApp now reads differently in Projects (the build) vs Experience (the engagement); Skills shows Specialization (depth) + Full toolbox (breadth) without restating; About is trimmed to bio + location + education. **This plan is about the *next* layer** — per-section content quality, conversion, one real HTML bug, and goal/UX alignment — not re-litigating the reorg.

## Goal alignment

The top of the page (Hero → Projects → PublicWork → Skills) is correctly engineering-first for goal #1. The weak spots are: the primary hero CTA misdirects, the résumé is broken (cross-cutting), the strongest *backend* project isn't first, and the teaching conversion path (Services → Calendly) may be dead. Those are the highest-leverage home fixes.

---

## P0 — Real bug

### 1. `Projects.tsx` nests `<a>` inside `<MagneticButton>` without `asChild` (invalid HTML)
- **Finding:** Three buttons render `<MagneticButton …><a href=…></a></MagneticButton>` with **no `asChild`**: the "Code" button (`Projects.tsx:35-40`), the "Demo" button (`:43-48`), and "Visit GitHub Profile" (`:92-97`). Without `asChild`, `MagneticButton` renders a `<button>` and puts the `<a>` inside it → `button > a`, which is invalid HTML and breaks keyboard activation (exactly the DS-02 anti-pattern CLAUDE.md warns against).
- **Note:** This contradicts the design-system doc's implied "DS-02 resolved" status — Hero, Services, and Contact use `asChild` correctly, but **Projects was never converted**. It's the straggler.
- **Fix:** Add `asChild` to all three (matching Hero/Services/Contact):
  ```tsx
  <MagneticButton asChild variant="outline" size="sm">
    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">…</a>
  </MagneticButton>
  ```
- **Impact:** Accessibility + valid markup on the most important proof section. Trivial fix.

---

## P1 — Conversion & content

### 2. The primary hero CTA misdirects
- **Finding:** In the Hero, **"Hire Me" is the primary button but links to `#projects`** (`Hero.tsx:56-57`), while the actual contact action, **"Get In Touch," is a low-priority `ghost` button** (`:70-72`). A recruiter clicking the biggest, boldest "Hire Me" expects to reach a way to *hire*, not to scroll to the project list.
- **Fix (choose one):**
  - **(a)** Relabel the primary to **"See My Work"** (honest about where it goes) and promote "Get In Touch"/"Hire Me" to a clearly-visible contact CTA; or
  - **(b)** Point "Hire Me" at `#contact` and add a separate secondary "See Projects".
- **Recommendation:** (a) — keep the proof-first intent but stop mislabeling it; make the real hiring CTA visually findable.

### 3. Lead with the strongest *backend* project
- **Finding:** `projects[]` order is **Wasla (ML/CV grad project) → FixMate (.NET Clean Architecture API) → GenzApp (auth module)** (`portfolio.ts:54-102`). For a **.NET backend** hire (goal #1), the ML/computer-vision grad project is the least on-brand thing to show first; FixMate is the most on-brand.
- **Fix:** Consider ordering **FixMate first** (or Wasla), so the first card a recruiter reads is production .NET backend work. Keep Wasla — it's a strong breadth signal — just not necessarily the lead. (Pure data reorder in `portfolio.ts`; low risk.)

### 4. Verify the Calendly URL — it may be a dead placeholder
- **Finding:** `Services.tsx:9` hard-codes `CALENDLY_URL = "https://calendly.com/abdullahsherdy"`, and **"Book a Free Call" is the primary CTA on all four service cards** (`:122-130`). CLAUDE.md explicitly notes this should be "updated with the real Calendly link when available" — strongly implying it's a placeholder.
- **Impact:** If it 404s, the main conversion action for goals #2–3 (teaching/services) is broken on every service card.
- **Fix:** Confirm the link resolves to a real booking page; if not, either wire the real one or fall back the primary CTA to WhatsApp/email until Calendly exists. **Needs the user to confirm.**

### 5. Trim the engineering Services card's tag overload
- **Finding:** The "End-to-End Software Development" card lists **12 tags** (`Services.tsx:74`: Front-end, Back-end, Full-stack, API Development, Database Design, Deployment, DevOps & CI/CD, Cloud Services, Testing & QA, Performance Optimization, Security, Maintenance & Support). That reads as unfocused "I do everything," which *weakens* the specialist positioning the rest of the page builds.
- **Fix:** Cut to the 4–6 that matter for the buyer (e.g. Clean Architecture APIs, Database Design, React/Next.js, Docker/CI-CD). Depth beats breadth here.

---

## P2 — Presentation & polish

### 6. Add a portrait to the Hero
- **Finding:** The Hero is all type — no photo. For a personal portfolio whose goal is hiring and teaching (both relationship/trust businesses), a face materially increases connection and memorability. Currently there's no image of Abdullah anywhere on the page.
- **Fix:** Add a tasteful portrait (optimized, `loading="eager"` above the fold, with proper `alt`). Design decision — keep it consistent with the engineering aesthetic (e.g. a single portrait beside or above the headline). Optional but high-value for a portfolio.

### 7. `LatestArticles` uses an off-pattern header
- **Finding:** `LatestArticles.tsx:16` hand-rolls an `<h2>` + `<p>` instead of using `SectionHeading` + the `.eyebrow` convention every other section uses. It also lacks `scroll-mt-24` / `data-section` and puts `px-4` on the inner container instead of the section (`:11-12`) — a section-anatomy drift. (Anatomy drift cross-listed in `site-wide` and `navbar`.)
- **Fix:** Adopt `SectionHeading eyebrow="Writing"/"From the blog"` and normalize the section wrapper to match the others.

### 8. Move PublicWork stats into `portfolio.ts` and quantify YouTube
- **Finding:** PublicWork's stat cards are **hardcoded in the component** (`PublicWork.tsx:7-29`), against the project convention that content data lives in `src/data/portfolio.ts`. Also the YouTube stat is vague — "Tech tutorials" with no number, next to "50+ public repos" and "550+ problems solved," so it reads as the weak one.
- **Fix:** Lift the stats into `portfolio.ts` (consistency + one edit point), and quantify YouTube (subscriber/video count) or reframe it so it carries a concrete signal like its neighbors.

### 9. WorkExperience engineering/teaching visual imbalance
- **Finding:** The Engineering group has **1 card** and Teaching has **6** (`portfolio.ts:114-191`). In a `md:grid-cols-2` grid, the lone engineering card sits at half width against six teaching cards — visually underlining the exact gap (thin engineering history) that hurts goal #1. (The user has said they'll strengthen engineering roles later — this is a presentation note for the interim, not a request to fabricate roles.)
- **Fix (interim):** Make the single engineering card full-width, or add a brief "currently expanding my engineering track" line / link to Projects so the section doesn't visually shout "only one job." Revisit when more roles are added.

---

## De-duplication re-check (ask #3)

The prior pass removed the real duplication. Current state is clean; only minor, defensible overlaps remain:

| Item | Verdict |
|---|---|
| GenzApp in Projects vs Experience | **OK** — now differentiated (build vs engagement). |
| Teaching in WorkExperience vs Services | **OK** — distinct (history vs current offer); `focusAreas` teaching row already removed. |
| Skills "Specialization" vs "Full toolbox" | **OK** — depth vs breadth, no restatement. |
| Social links in PublicWork *and* Contact *and* Footer *and* Navbar | **Minor** — PublicWork frames GitHub/LeetCode/YouTube as *proof stats* (counts), Contact frames them as *reach me*; defensible. Consolidation is a Footer/Contact concern (see `navbar`), not a home-section rewrite. |
| "Clean Architecture" repeated across Hero/Skills/Projects/Services | **OK** — a genuine core competency, not duplication. |

**Conclusion:** No further content de-duplication needed on the home page. The repetition the user originally sensed was resolved in the reorg.

---

## Cross-cutting items that also hit the home page (owned elsewhere — listed so nothing's lost)

- **Broken "Download CV"** (`Hero.tsx:60`) → **owned by `navbar/plan.md` #1 (P0)**.
- **False "verified reviews"** label (`Hero.tsx:82,87`) → **owned by `reviews/presentation.md` #1 (P0)**.
- **Contact form has no `<label>`s** (`Contact.tsx:109,124,140` — placeholder-only) → **owned by `site-wide/plan.md` a11y #1 (P1)**. (Note: the form *does* correctly wire `aria-invalid`/`aria-describedby` for errors — only the field labels are missing.)
- **Amber text contrast** in the Hero reviews pill (`Hero.tsx:84-85`) → **owned by `site-wide/plan.md` a11y #2**.
- **Scrollspy: `#learning` never re-observed** (the Suspense fallback at `Index.tsx:71` carries `id="learning"`, gets observed, then is replaced by the real section which is never observed) → **owned by `navbar/plan.md` #3**.
- **`Projects` uses `py-20`** vs the `py-16` standard → **owned by `site-wide` DS drift**.
- **Eager Supabase + eager article markdown on the home path** (via `Hero`/`Reviews` and `LatestArticles`) → **owned by `site-wide/plan.md` perf**.

---

## Sequencing (home-only work)
1. **#1 Projects `asChild` fix (P0)** — trivial, correctness.
2. **#2 hero CTA + #3 project order (P1)** — small data/label edits, direct goal-#1 impact.
3. **#4 verify Calendly (P1)** — needs user confirmation; unblocks goals #2–3.
4. **#5 Services tag trim + #7 LatestArticles header + #8 PublicWork data (P2)** — content/consistency batch.
5. **#6 portrait + #9 experience balance (P2)** — design/content, do when convenient.

## Verification (manual)
- `npm run dev`: Projects "Code"/"Demo"/"Visit GitHub" render as real anchors (inspect DOM — no `button > a`; keyboard Enter activates them); hero primary CTA label matches its destination; first project card is the on-brand backend one; "Book a Free Call" resolves to a live page; Services engineering card shows a tight tag set.
- Full scroll still reads as the intended narrative; no two adjacent sections share a background tint.
- `npm run build` + `npm run lint` clean.
- `src/data/updates.ts`: add an entry for any user-facing change (e.g. reordered projects, fixed booking link).
