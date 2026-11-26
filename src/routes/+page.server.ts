import { redirect } from '@sveltejs/kit';
import { ROUTES } from '#lib/constants.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) redirect(303, ROUTES.DASHBOARD);
};
