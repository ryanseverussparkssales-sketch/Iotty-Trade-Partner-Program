/**
 * Public Supabase config — safe to ship to the client by design.
 * The anon key only unlocks what RLS allows (insert applications, read own
 * partner row when signed in, public directory view, counter RPC).
 */
export const SUPABASE_URL = 'https://ogodslwbdxidudymtvnn.supabase.co';
export const SUPABASE_ANON_KEY =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nb2RzbHdiZHhpZHVkeW10dm5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQwNTMxMzMsImV4cCI6MjA5OTYyOTEzM30.lJkHsJAoA-JUM7UzJKqyjmgrjCWkW8YYo0X_rQ6Elz8';
