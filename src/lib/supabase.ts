import type { SupabaseClient } from "@supabase/supabase-js";

// Read inline like the EmailJS vars (src/components/sections/Contact.tsx) — no central env wrapper exists.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * True when reviews can be submitted/read (env configured). Cheap and synchronous,
 * so the render path (Hero strip, Reviews section, useReviews `enabled` gate) can
 * check it without pulling in the Supabase SDK.
 */
export const isReviewsConfigured = Boolean(url && anonKey);

let clientPromise: Promise<SupabaseClient | null> | null = null;

/**
 * Lazily create (and cache) the Supabase client. `@supabase/supabase-js` is loaded
 * via dynamic import so it stays OFF the eager home-page chunk — reviews hydrate
 * after first paint through React Query. Returns `null` when the env vars are
 * absent, mirroring the EmailJS "silently no-op without config" behavior.
 *
 * The anon key is meant to be public; Row-Level Security (anon inserts publish
 * immediately, reads are approved-only) is the real boundary.
 */
export function getSupabase(): Promise<SupabaseClient | null> {
  if (!isReviewsConfigured) return Promise.resolve(null);
  if (!clientPromise) {
    clientPromise = import("@supabase/supabase-js").then(({ createClient }) =>
      createClient(url as string, anonKey as string)
    );
  }
  return clientPromise;
}
