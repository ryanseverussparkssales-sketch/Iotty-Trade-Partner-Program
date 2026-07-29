import { fail } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabase';
import { TRADES, US_STATES } from '$lib/content';
import type { PartnerApplication } from '$lib/types/database';
import type { Actions } from './$types';

const required = ['company', 'contact_name', 'email', 'phone', 'trade', 'state'] as const;

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const values = Object.fromEntries(
			[...form.entries()].map(([k, v]) => [k, String(v).trim()])
		) as Record<string, string>;

		const missing = required.filter((k) => !values[k]);
		if (missing.length) {
			return fail(400, { values, error: `Missing required fields: ${missing.join(', ')}` });
		}
		if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) {
			return fail(400, { values, error: 'That email address doesn’t look right.' });
		}
		if (!(TRADES as readonly string[]).includes(values.trade)) {
			return fail(400, { values, error: 'Please pick a trade from the list.' });
		}
		if (!(US_STATES as readonly string[]).includes(values.state)) {
			return fail(400, { values, error: 'Please pick a state from the list.' });
		}

		const db = supabase();
		if (!db) {
			// Backend not wired yet — fail loudly in dev rather than silently dropping a lead.
			console.error('[apply] application received but Supabase not configured:', values);
			return fail(503, {
				values,
				error: 'Applications are briefly offline. Email trade@iottysmarthome.com and we will hold your slot.'
			});
		}

		const application: PartnerApplication = {
			company: values.company,
			contact_name: values.contact_name,
			email: values.email.toLowerCase(),
			phone: values.phone,
			trade: values.trade,
			state: values.state,
			license_or_ein: values.license_or_ein || null,
			website: values.website || null,
			notes: values.notes || null,
			status: 'applied',
			founding: true,
			source: 'site_application'
		};
		const { error } = await db.from('partners').insert(application);

		if (error) {
			// 23505 = unique violation (already applied with this email)
			if (error.code === '23505') {
				return fail(409, { values, error: 'Looks like this email already applied — we’ll be in touch within a day.' });
			}
			console.error('[apply] partners insert failed:', error);
			return fail(500, {
				values,
				error: 'Something broke on our end. Email trade@iottysmarthome.com and we will hold your slot.'
			});
		}

		return { success: true };
	}
};
