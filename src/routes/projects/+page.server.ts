import { redirect, type Actions, fail } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
	console.log('Server Load Ran');
	const fetchProducts = async () => {
		const res = await fetch(`https://dummyjson.com/products`);
		const data = await res.json();
		return data.results;
	};

	return {
		projects: fetchProducts()
	};
};

export const actions: Actions = {
	// signout
	default: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);
		await auth.invalidateSession(session.sessionId);
		locals.auth.setSession(null);
	}
};
