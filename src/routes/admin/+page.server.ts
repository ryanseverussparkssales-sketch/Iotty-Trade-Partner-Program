import type { PageServerLoad } from './$types';

interface FunnelStats {
	by_status: Record<string, number>;
	founding_taken: number;
	recent?: Array<{
		company: string;
		trade: string;
		state: string;
		status: string;
		created_at: string;
	}>;
}

// Public preview (through the demo lander, pre-launch): anyone can see the funnel
// counts and margin presenter — no sign-in required, no company names shown.
// A signed-in admin session sees the full view, including the recent-applications
// list. Ryan: this is intentionally open right now; re-tighten when the demo
// section gets gated.
export const load: PageServerLoad = async ({ locals }) => {
	const { data: isAdmin } = await locals.supabase.rpc('is_admin');
	const admin = isAdmin === true;

	const { data, error: rpcError } = await locals.supabase.rpc(
		admin ? 'admin_funnel_stats' : 'public_funnel_stats'
	);
	if (rpcError) console.error('[admin] funnel stats failed:', rpcError);

	return { stats: (data as FunnelStats | null) ?? null, isAdmin: admin };
};
