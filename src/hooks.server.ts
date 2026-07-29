import { createServerClient } from '@supabase/ssr';
import { redirect, type Handle } from '@sveltejs/kit';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$lib/supabase-config';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
		cookies: {
			getAll: () => event.cookies.getAll(),
			setAll: (cookies) => {
				cookies.forEach(({ name, value, options }) => {
					event.cookies.set(name, value, { ...options, path: '/' });
				});
			}
		}
	});

	// getUser() validates the JWT with the auth server — never trust getSession() alone
	const {
		data: { user }
	} = await event.locals.supabase.auth.getUser();
	event.locals.user = user;

	const path = event.url.pathname;
	if ((path.startsWith('/account') || path.startsWith('/admin')) && !user) {
		redirect(303, `/login?next=${encodeURIComponent(path)}`);
	}

	return resolve(event, {
		filterSerializedResponseHeaders: (name) =>
			name === 'content-range' || name === 'x-supabase-api-version'
	});
};
