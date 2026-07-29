import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

interface FunnelStats {
	by_status: Record<string, number>;
	founding_taken: number;
	recent: Array<{
		company: string;
		trade: string;
		state: string;
		status: string;
		created_at: string;
	}>;
}

export const load: PageServerLoad = async ({ locals }) => {
	const { data: isAdmin } = await locals.supabase.rpc('is_admin');
	if (isAdmin !== true) error(403, 'Admin access only');

	const { data, error: rpcError } = await locals.supabase.rpc('admin_funnel_stats');
	if (rpcError) console.error('[admin] funnel stats failed:', rpcError);

	return { stats: (data as FunnelStats | null) ?? null };
};
