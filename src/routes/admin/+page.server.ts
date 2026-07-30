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

interface HarvestSession {
	title: string;
	origin: string;
	area: string;
	verticals: string[];
	status: string;
	leads_found: number;
	max_leads: number;
	cost_spent: string;
	max_cost: string;
	created_at: string;
}

// Public preview (through the demo lander, pre-launch): anyone can see the funnel
// counts, margin presenter, and live harvest sessions — no sign-in required, no
// company names shown. A signed-in admin session sees the full view, including
// the recent-applications list. Ryan: this is intentionally open right now;
// re-tighten when the demo section gets gated.
//
// Harvest sessions come from public_iotty_harvest_sessions(), a SECURITY DEFINER
// function scoped hard to clients.slug = 'iotty' — safe to expose publicly even
// though the underlying scrape_sessions table also holds a second client's rows.
export const load: PageServerLoad = async ({ locals }) => {
	const { data: isAdmin } = await locals.supabase.rpc('is_admin');
	const admin = isAdmin === true;

	const [{ data, error: rpcError }, { data: harvest, error: harvestError }] = await Promise.all([
		locals.supabase.rpc(admin ? 'admin_funnel_stats' : 'public_funnel_stats'),
		locals.supabase.rpc('public_iotty_harvest_sessions', { p_limit: 30 })
	]);
	if (rpcError) console.error('[admin] funnel stats failed:', rpcError);
	if (harvestError) console.error('[admin] harvest sessions failed:', harvestError);

	return {
		stats: (data as FunnelStats | null) ?? null,
		harvestSessions: (harvest as HarvestSession[] | null) ?? [],
		isAdmin: admin
	};
};
