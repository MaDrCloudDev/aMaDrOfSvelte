import { redirect, type Actions, fail } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();
	if (!user) {
		throw redirect(302, '/login');
	} else {
		return {
			projects: await prisma.project.findMany()
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
