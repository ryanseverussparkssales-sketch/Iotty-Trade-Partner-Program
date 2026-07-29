import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
	const code = url.searchParams.get('code');
	const next = url.searchParams.get('next') ?? '/account';
	if (code) {
		const { error } = await locals.supabase.auth.exchangeCodeForSession(code);
		if (error) console.error('[auth] code exchange failed:', error);
	}
	// only allow same-site redirects
	redirect(303, next.startsWith('/') ? next : '/account');
};
