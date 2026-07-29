import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) redirect(303, '/account');
	return {};
};

export const actions: Actions = {
	default: async ({ request, url, locals }) => {
		const form = await request.formData();
		const email = String(form.get('email') ?? '')
			.trim()
			.toLowerCase();
		if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
			return fail(400, { email, error: 'That email address doesn’t look right.' });
		}
		const next = url.searchParams.get('next') ?? '/account';
		const { error } = await locals.supabase.auth.signInWithOtp({
			email,
			options: { emailRedirectTo: `${url.origin}/auth/callback?next=${encodeURIComponent(next)}` }
		});
		if (error) {
			console.error('[login] signInWithOtp failed:', error);
			return fail(500, { email, error: 'Couldn’t send the sign-in link — try again in a minute.' });
		}
		return { sent: true, email };
	}
};
