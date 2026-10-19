import { fail } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabase';
import { pushTradeSignup } from '$lib/server/pipedrive';
import { TRADES, US_STATES } from '$lib/content';
import type { Actions } from './$types';

const required = ['contact_name', 'company', 'email', 'phone', 'trade', 'state'] as const;
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

export const actions: Actions = {
	signup: async ({ request }) => {
		const form = await request.formData();
		const v = Object.fromEntries([...form.entries()].map(([k, x]) => [k, String(x).trim()])) as Record<string, string>;

		if (v.website_hp) return { success: true }; // honeypot: bots fill hidden fields

		const missing = required.filter((k) => !v[k]);
		if (missing.length) return fail(400, { values: v, error: 'Please fill in every field.' });
		if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email))
			return fail(400, { values: v, error: 'That email address doesn’t look right.' });
		if (!(TRADES as readonly string[]).includes(v.trade)) return fail(400, { values: v, error: 'Pick your trade.' });
		if (!(US_STATES as readonly string[]).includes(v.state)) return fail(400, { values: v, error: 'Pick your state.' });

		const utm: Record<string, string> = {};
		for (const k of UTM_KEYS) if (v[k]) utm[k] = v[k].slice(0, 200);

		let saved = false;
		const db = supabase();
		if (db) {
			const { error } = await db.from('partners').insert({
				company: v.company,
				contact_name: v.contact_name,
				email: v.email.toLowerCase(),
				phone: v.phone,
				trade: v.trade,
				state: v.state,
				notes: [v.volume && `Smart-switch jobs/yr: ${v.volume}`, Object.keys(utm).length && `UTM: ${JSON.stringify(utm)}`]
					.filter(Boolean)
					.join(' | ') || null,
				status: 'applied',
				founding: false,
				source: 'lander_signup'
			});
			saved = !error || error.code === '23505'; // already signed up = fine
			if (error && error.code !== '23505') console.error('[signup] partners insert failed:', error);
		}

		let dealId: number | null = null;
		try {
			dealId = await pushTradeSignup({
				company: v.company,
				contact_name: v.contact_name,
				email: v.email.toLowerCase(),
				phone: v.phone,
				trade: v.trade,
				state: v.state,
				volume: v.volume,
				utm
			});
		} catch (e) {
			console.error('[signup] pipedrive push failed:', e);
		}

		if (!saved && !dealId) {
			return fail(500, {
				values: v,
				error: 'Something broke on our end. Email trade@iottysmarthome.com and we’ll lock in your discount.'
			});
		}
		return { success: true };
	}
};
