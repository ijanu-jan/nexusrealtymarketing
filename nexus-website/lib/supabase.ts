import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let _public: SupabaseClient | null = null;
let _admin: SupabaseClient | null = null;

/**
 * Public/anon client — safe for read-only browser & server use under RLS.
 * Returns null when env vars are missing (so pages can fall back to static demo data
 * during local development before Supabase is wired up).
 */
export function getSupabase(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  if (!_public) _public = createClient(url, anonKey, { auth: { persistSession: false } });
  return _public;
}

/**
 * Server-only admin client. Never import from a "use client" file.
 * Use only inside API routes / server actions.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (!url || !serviceKey) return null;
  if (!_admin) _admin = createClient(url, serviceKey, { auth: { persistSession: false } });
  return _admin;
}
