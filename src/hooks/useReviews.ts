import { useQuery } from "@tanstack/react-query";
import { fetchApprovedReviews } from "@/lib/reviews";
import { isReviewsConfigured } from "@/lib/supabase";

/** Shared React Query key so the Hero strip and Reviews section read one cache. */
export const REVIEWS_QUERY_KEY = ["reviews"] as const;

/**
 * Fetch approved reviews via React Query. Disabled (never fetches, `data` stays
 * undefined) when Supabase env is absent, so the site renders cleanly with no keys.
 */
export function useReviews() {
  return useQuery({
    queryKey: REVIEWS_QUERY_KEY,
    queryFn: fetchApprovedReviews,
    enabled: isReviewsConfigured,
    staleTime: 5 * 60 * 1000, // 5 min — reviews change rarely
  });
}
