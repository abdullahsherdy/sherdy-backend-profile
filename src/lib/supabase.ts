import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Read inline like the EmailJS vars (src/components/sections/Contact.tsx) — no central env wrapper exists.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * Shared Supabase client, or `null` when the env vars are absent.
 * Mirrors the EmailJS "silently no-op without config" behavior so the site
 * still builds and renders with no keys set. The anon key is meant to be public;
 * Row-Level Security (insert-only-unapproved, read-only-approved) is the real boundary.
 */
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;

/** True when reviews can be submitted/read (env configured). */
export const isReviewsConfigured = Boolean(supabase);
