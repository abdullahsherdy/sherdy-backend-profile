# Reviews — Presentation & Trust Enhancements

**Status:** proposed · **Date:** 2026-08-23 · **Owner area:** reviews system
**Source:** parallel site audit (reviews analyst). Companion to the existing `features/reviews/plan.md` (build/architecture + Addendum A). This file is **presentation & trust only** — it does not change the security model.

## Context

Reviews are visitor-submitted testimonials stored in Supabase, read via `useReviews` (React Query key `["reviews"]`), and rendered in two places: the Hero social-proof strip and the `Reviews` section (near the end of the page, between Latest Articles and About). Each review carries a structured `category: "engineering" | "teaching"` discriminator, a free-text `role`, a 1–5 `rating`, body text, and `createdAt`. Per Addendum A (2026-08-21), submissions **publish immediately** — the `approved` column is now only a dashboard kill switch, not a moderation gate.

The system is well-built (accessible form, category styling, RLS boundary). The issues are (1) a **now-false trust claim**, (2) undifferentiated presentation that makes recruiters and parents read the same mixed wall, and (3) missing trust signals the data already supports.

## Goal alignment

Reviews are goal #5 (social proof) but they *serve* goals #1–3: a recruiter wants to see **client/engineering** outcomes; a parent wants to see **student/teaching** outcomes. Today both audiences get one reverse-chron blend and have to hunt. Segmenting the presentation lets each visitor self-select the proof relevant to them — without any audience selector on the page itself (consistent with the home-page "no segmentation" decision, which was about the *global* narrative, not about filtering testimonials).

---

## P0 — Correctness / trust

### 1. The "verified" label is now factually false
- **Finding:** `ReviewCard.tsx:28`, `Hero.tsx:82/87`, and `Reviews.tsx:35` display a `✓ verified` micro-label on every review. This was **truthful under the original moderation design** (`plan.md:161` — reviews appeared only after manual approval). Addendum A (`plan.md:241-263`) removed that gate: reviews are now anonymous, instant-publish, defended only by a honeypot (`ReviewForm.tsx:100-105`) + client/DB validation. Nothing verifies the reviewer.
- **Impact:** Claiming "verified" for unverified, anonymous submissions is misleading — and a recruiter or client who notices undercuts *all* the social proof. This is a trust/integrity issue, not cosmetics.
- **Fix (pick one):**
  - **(a) Remove the word** — simplest, honest. Drop the `✓ verified` label from all three surfaces; keep the category color as the only micro-label (or show the date instead).
  - **(b) Re-earn a truthful badge** — only mark reviews "verified" where verification actually happened (e.g. a curated subset you confirmed, gated by a real `verified` boolean column, default `false`). Do **not** reuse the `approved` column for this — it's the kill switch.
- **Recommendation:** (a) now (removes the false claim immediately); (b) later if you want a real trust badge.

---

## P1 — Presentation (the "best presentation" ask)

### 2. Recommended direction: **segmented tabs + a promoted lead review**
Evaluated three directions; the recommendation composes the best of two:

- **Direction C (primary): segmented tabs.** Add a tab control above the grid: **"All · Clients & Engineering · Students & Parents"**, defaulting to **All**. Filter the already-fetched list by `category` client-side — **no new fetch, no schema change** (`category` already exists). `src/components/ui/tabs.tsx` already exists in the repo.
  - *Why:* lets each audience jump straight to relevant proof; makes the existing `category` data do visible work; scales gracefully as volume grows.
- **Direction A (light overlay): promote the lead review.** Within the active tab, render the strongest review (highest rating, then longest substantive body) as a wider "lead" card at the top, the rest in the grid below. Gives the wall a focal point instead of a flat matrix.
- **Explicitly DO NOT build Direction B (carousel/marquee):** auto-scrolling motion isn't covered by the reduced-motion rules in `index.css:237-255`, looks broken at low review volume, and adds complexity for no trust gain. Skip it.

### 3. Category legibility
- Tint the initial-avatar (see #5) and the card's left accent bar by category — teal for engineering/client, amber for teaching/student — so even in the **All** tab the two kinds are visually separable at a glance. (The left accent bar already exists per the design system; extend the same logic to the avatar.)

---

## P2 — Trust signals the data already supports

### 4. Don't show an average rating until it's credible
- **Finding:** `computeReviewStats` (`reviews.ts:85-89`) computes an average that renders even at N=1, where "5.0 from 1 review" reads as thin/self-serving.
- **Fix:** Suppress the numeric average until **N ≥ 3**; below that, show only the count ("3 reviews") or nothing. Add a **star distribution** bar (how many 5★, 4★, …) once N is meaningful — extend `computeReviewStats`.

### 5. Show dates and real avatars
- **Dates:** `createdAt` is already fetched (`reviews.ts:44,56`) but never rendered. Show a relative/short date on each card — recency is itself a trust signal (and pairs with removing "verified").
- **Avatars:** render a tinted initial-avatar (category color) instead of a bare glyph; `src/components/ui/avatar.tsx` already exists.

### 6. Optional: link a client review to the project it's about
- Add an optional curated `project_slug` (schema addition) so a client testimonial can deep-link to the relevant Projects entry — turning a review into navigation toward engineering proof (goal #1). Curated/optional, not user-submitted. Defer unless you want the linkage.

---

## P3 — Copy, validation, a11y

### 7. Stale copy
- The form still references the old moderation flow ("once I approve…", `plan.md:171` lineage) — update any user-facing text to match instant publish ("your review appears right away").

### 8. Validation parity
- Client validation doesn't enforce the DB caps (name ≤ 80, role ≤ 60). Mirror the limits client-side so a valid-looking submit isn't rejected by the DB (or silently truncated).

### 9. Accessibility (interactive StarRating + form)
- **Focus desync:** the interactive `StarRating` roving-tabindex can desync from the visual/selected star (`StarRating.tsx:48-56, 70/78`). Reconcile focus index with selected value.
- **Error not associated:** `StarRating` accepts an `id` prop but it's unused, so the rating error message isn't programmatically tied to the control (`ReviewForm.tsx:224-227`). Wire `aria-describedby`.
- **No focus management on submit:** after submit, move focus to the success message so SR users are told it worked.
- **Glyph semantics:** the `✓` is read literally as "check mark" — if any check glyph survives #1, give it `aria-hidden` + a text alternative.

---

## Sequencing

1. **#1 remove false "verified" (P0)** — trivial, do first; it's a correctness/trust fix, not an enhancement.
2. **#4 + #5 (P2)** — suppress-average-until-N≥3 and show dates: small, high trust-per-effort, pair naturally with #1.
3. **#2 segmented tabs (P1)** — the core "best presentation" deliverable.
4. **#3 + #2-lead (P1 polish)** — category tinting + promoted lead card.
5. **#7–#9 (P3)** — copy/validation/a11y cleanup.

## What does NOT change
- **Security model is untouched.** RLS stays the boundary; anon still INSERTs only `approved=true` rows and SELECTs only `approved=true`; no service-role key on the client. Presentation changes are client-side filtering + display only.
- Schema changes are **optional** and limited to additive columns (`verified` bool if choosing 1b; `project_slug` if choosing #6) — neither is required for the core presentation upgrade.

## Verification (manual)
- `npm run dev`: tabs filter correctly (All / engineering / teaching); lead card promotes the strongest review; average hidden below N=3; dates render; no "verified" claim remains (or only on truly-verified rows).
- Keyboard: interactive StarRating arrow-keys land on the visually-focused star; rating error announced; focus moves to confirmation on submit.
- Reduced-motion: no auto-motion introduced.
- Hero social-proof strip and Reviews section still share the `["reviews"]` cache (one fetch).
- `npm run build` + `npm run lint` clean; add an `updates.ts` entry (e.g. "Reviews now sorted into Clients & Students").
