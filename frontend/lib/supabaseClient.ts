import { createClient } from "@supabase/supabase-js";

// Falls back to a placeholder during build so static prerendering doesn't crash
// when NEXT_PUBLIC_SUPABASE_URL isn't set yet. Set real values in .env.local
// (or your host's env vars) before running/deploying for the app to work.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: true, autoRefreshToken: true },
});

export type Role = "fan" | "volunteer" | "organizer" | "staff";
