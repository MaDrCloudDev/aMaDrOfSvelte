import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	if (locals.user) {
		throw redirect(302, '/dashboard');
	}

	const message = url.searchParams.get('message');
	const error = url.searchParams.get('error');

	return {
		message,
		error
	};
};
