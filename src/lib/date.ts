/**
 * Format a date-only string ("YYYY-MM-DD") for display. Anchored at local
 * midnight so the calendar day never drifts across timezones. Returns "" for
 * empty or unparseable input so callers can render conditionally.
 *
 * (Reviews use `formatReviewDate` in lib/reviews.ts — that one takes a full ISO
 * timestamp; this one is for the date-only frontmatter/changelog values.)
 */
export function formatDate(date: string, month: "short" | "long" = "short"): string {
  if (!date) return "";
  const d = new Date(`${date}T00:00:00`);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month, day: "numeric" });
}
