import { redirect, type Actions, fail } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
	const fetchUsers = async () => {
		const res = await fetch(`https://dummyjson.com/users`);
		const users = await res.json();
		return users;
	};
	return {
		users: await fetchUsers()
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
