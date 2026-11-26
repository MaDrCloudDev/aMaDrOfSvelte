import { redirect } from '@sveltejs/kit';
import { ROUTES } from '#lib/constants.ts';
import type { PageServerLoad } from './$types';

// Better Auth sends failed OAuth logins here as ?error=<code>
const ERROR_MESSAGES: Record<string, string> = {
	access_denied: 'GitHub sign-in was cancelled.',
	state_mismatch: 'Your sign-in session expired. Please try again.'
};

export const load: PageServerLoad = async ({ locals, url }) => {
	if (locals.user) redirect(303, ROUTES.DASHBOARD);

	const error = url.searchParams.get('error');
	return {
		error: error
			? (ERROR_MESSAGES[error] ?? `Sign-in failed (${error.replaceAll('_', ' ')}).`)
			: null
	};
};
