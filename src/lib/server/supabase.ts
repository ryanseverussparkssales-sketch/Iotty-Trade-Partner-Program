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

export function supabase(): SupabaseClient | null {
	if (client) return client;
	const url = env.SUPABASE_URL;
	const key = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_ANON_KEY;
	if (!url || !key) return null;
	client = createClient(url, key, { auth: { persistSession: false } });
	return client;
}
