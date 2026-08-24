import { supabase } from "./supabase";

/**
 * A published testimonial. Reuses the site-wide `"engineering" | "teaching"`
 * discriminator (see Experience in src/data/portfolio.ts) to drive teal vs amber styling.
 */
export interface Review {
  id: string;
  name: string;
  role: string; // "Student" · "Parent" · "Client" · "Colleague" · free text
  org: string | null; // optional course/company
  category: "engineering" | "teaching";
  rating: number; // 1–5
  quote: string;
  createdAt: string;
}

/** Fields a visitor submits. `approved`/`id`/`createdAt` are server-owned. */
export type ReviewInput = Omit<Review, "id" | "createdAt">;

/** Shape of a row as selected from Postgres (snake_case columns). */
interface ReviewRow {
  id: string;
  created_at: string;
  name: string;
  role: string;
  org: string | null;
  category: "engineering" | "teaching";
  rating: number;
  quote: string;
}

const rowToReview = (row: ReviewRow): Review => ({
  id: row.id,
  name: row.name,
  role: row.role,
  org: row.org,
  category: row.category,
  rating: row.rating,
  quote: row.quote,
  createdAt: row.created_at,
});

const SELECT_COLUMNS = "id, created_at, name, role, org, category, rating, quote";

/**
 * Fetch approved reviews, newest first. RLS returns only `approved = true` rows.
 * Returns `[]` when Supabase is not configured so callers can render an empty state.
 */
export async function fetchApprovedReviews(): Promise<Review[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("reviews")
    .select(SELECT_COLUMNS)
    .eq("approved", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as ReviewRow[] | null)?.map(rowToReview) ?? [];
}

/**
 * Insert a review. `approved` is omitted so the column default (now `true`) applies,
 * publishing it immediately — the RLS INSERT policy requires `approved = true` to match.
 * A row can still be hidden after the fact by setting `approved = false` in the dashboard.
 */
export async function submitReview(input: ReviewInput): Promise<void> {
  if (!supabase) throw new Error("Reviews are not configured.");
  const { error } = await supabase.from("reviews").insert({
    name: input.name.trim(),
    role: input.role.trim(),
    org: input.org?.trim() ? input.org.trim() : null,
    category: input.category,
    rating: input.rating,
    quote: input.quote.trim(),
  });
  if (error) throw error;
}

export interface ReviewStats {
  count: number;
  average: number; // 0 when there are no reviews
  /** A numeric average is only credible past a few ratings; below that, callers show the count alone. */
  showAverage: boolean;
}

/** Below this many reviews an average is statistical noise — suppress the number, keep the count. */
const MIN_REVIEWS_FOR_AVERAGE = 3;

/** Aggregate rating + count for the Hero strip and section summary. */
export function computeReviewStats(reviews: Review[]): ReviewStats {
  if (reviews.length === 0) return { count: 0, average: 0, showAverage: false };
  const sum = reviews.reduce((total, r) => total + r.rating, 0);
  const count = reviews.length;
  return { count, average: sum / count, showAverage: count >= MIN_REVIEWS_FOR_AVERAGE };
}

/**
 * Short, stable date for a review card (e.g. "Aug 23, 2026"). Returns "" for an
 * unparseable value so the caller can omit the line.
 */
export function formatReviewDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}
