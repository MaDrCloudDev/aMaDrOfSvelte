import { redirect, type Actions, fail } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();
	if (!user) {
		throw redirect(302, '/login');
	} else {
		const fetchPosts = async () => {
			const res = await fetch(`https://dummyjson.com/posts`);
			const posts = await res.json();
			return posts;
		};
		return {
			posts: await fetchPosts()
		};
	}
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
