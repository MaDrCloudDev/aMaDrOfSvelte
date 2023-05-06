import { redirect, type Actions, fail } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';

export const load = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();
	if (!user) throw redirect(302, '/login');
	return {
		user
	};
};