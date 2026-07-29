import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';

/**
 * Server-only Supabase client — the same database the Hermes prospecting
 * stack writes into. Uses the service-role key when present (admin scripts),
 * otherwise the anon key (RLS allows insert-only applications + the
 * founding_slots_taken() counter). Returns null when env vars are absent so
 * the site still builds/renders before the backend is wired.
 */
let client: SupabaseClient | null = null;

// Public fallbacks so a fresh deploy works before env vars are configured.
// The anon key is a *public* client key by design — RLS is the security
// boundary (insert-only applications + counter RPC + directory view).
// Env vars, when set, always win (and the service-role key is env-only).
const PUBLIC_FALLBACK_URL = 'https://ogodslwbdxidudymtvnn.supabase.co';
const PUBLIC_FALLBACK_ANON_KEY =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nb2RzbHdiZHhpZHVkeW10dm5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQwNTMxMzMsImV4cCI6MjA5OTYyOTEzM30.lJkHsJAoA-JUM7UzJKqyjmgrjCWkW8YYo0X_rQ6Elz8';

export function supabase(): SupabaseClient | null {
	if (client) return client;
	const url = env.SUPABASE_URL || PUBLIC_FALLBACK_URL;
	const key = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_ANON_KEY || PUBLIC_FALLBACK_ANON_KEY;
	if (!url || !key) return null;
	client = createClient(url, key, { auth: { persistSession: false } });
	return client;
}
