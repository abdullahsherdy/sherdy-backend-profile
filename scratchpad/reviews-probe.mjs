// Read-only diagnostic: confirms the reviews table exists, the anon key is valid,
// and how many APPROVED rows the public site can see. Uses the same query the app uses.
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

// Parse .env without adding a dotenv dependency.
const env = Object.fromEntries(
  readFileSync(new URL("../.env", import.meta.url), "utf8")
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

const url = env.VITE_SUPABASE_URL;
const key = env.VITE_SUPABASE_ANON_KEY;
console.log("URL present:", Boolean(url), "| key prefix:", key?.slice(0, 14) + "...");

const supabase = createClient(url, key);

// 1) The exact app query: approved = true, newest first.
const approved = await supabase
  .from("reviews")
  .select("id, created_at, name, role, category, rating, approved")
  .eq("approved", true)
  .order("created_at", { ascending: false });

console.log("\n[approved=true] error:", approved.error?.message ?? "none");
console.log("[approved=true] rows:", approved.data?.length ?? 0);
if (approved.data?.length) console.table(approved.data);

// 2) Count of ALL rows visible to anon (RLS should hide unapproved -> equals approved count).
const all = await supabase.from("reviews").select("*", { count: "exact", head: true });
console.log("\n[no filter] anon-visible count:", all.count, "| error:", all.error?.message ?? "none");
