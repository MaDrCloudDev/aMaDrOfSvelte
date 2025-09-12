import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { auth } from '$lib/server/auth';

export const load: PageServerLoad = async ({ request }) => {
	await auth.api.signOut({
		headers: request.headers
	});

	throw redirect(302, '/login?message=Successfully signed out');
};
