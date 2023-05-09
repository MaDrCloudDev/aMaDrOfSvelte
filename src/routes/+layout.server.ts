import type { LayoutServerLoad } from './$types';
import { loadFlashMessage } from 'sveltekit-flash-message/server';

export const load = loadFlashMessage(async ({ locals }) => {
	const { user } = await locals.auth.validateUser();
	return {
		user
	};
}) satisfies LayoutServerLoad;

// export const load = async ({ locals }) => {
// 	const { user } = await locals.auth.validateUser();
// 	// if (!user) throw redirect(302, '/login');
// 	return {
// 		user
// 	};
// };
