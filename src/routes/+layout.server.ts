import { supabase } from '$lib/server/supabase';
import { FOUNDING_CAP } from '$lib/content';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	let taken = 13; // graceful default until the database is wired
	const db = supabase();
	if (db) {
		// security-definer counter — works with the anon key, exposes no rows
		const { data, error } = await db.rpc('founding_slots_taken');
		if (!error && typeof data === 'number') taken = data;
		else if (error) console.error('[layout] founding_slots_taken failed:', error);
	}
	return {
		foundingCap: FOUNDING_CAP,
		foundingRemaining: Math.max(0, FOUNDING_CAP - taken)
	};
};
