import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { auth } from '$lib/server/auth';

export const actions: Actions = {
	default: async ({ request }) => {
		try {
			await auth.api.signOut({
				headers: request.headers
			});
		} catch (error) {
			// Ignore errors if user is already signed out
		}

		throw redirect(302, '/login?message=Successfully signed out');
	}
};
