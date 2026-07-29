import { supabase } from '$lib/server/supabase';
import type { DirectoryListing } from '$lib/types/database';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	let listings: DirectoryListing[] = [];
	const db = supabase();
	if (db) {
		const { data, error } = await db
			.from('directory_listings')
			.select('id, company, trade, state, metro, website, founding, created_at')
			.order('state')
			.order('company');
		if (!error && data) listings = data as DirectoryListing[];
		else if (error) console.error('[directory] listings load failed:', error);
	}
	return { listings };
};
