import type { Partner } from '$lib/types/database';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// RLS: authenticated users can read only the partner row matching their email
	const { data, error } = await locals.supabase
		.from('partners')
		.select('*')
		.limit(1)
		.maybeSingle();
	if (error) console.error('[account] partner load failed:', error);

	const { data: isAdmin } = await locals.supabase.rpc('is_admin');

	return {
		partner: (data as Partner | null) ?? null,
		email: locals.user?.email ?? '',
		isAdmin: isAdmin === true
	};
};
