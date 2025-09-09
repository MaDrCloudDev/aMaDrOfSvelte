import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { verifyPassword, createSession } from '$lib/server/auth';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/dashboard');
	}
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		if (!email || !password) {
			return fail(400, {
				error: 'Email and password are required',
				email
			});
		}

		const user = await db.select().from(users).where(eq(users.email, email)).limit(1);

		if (user.length === 0) {
			return fail(400, {
				error: 'Invalid email or password',
				email
			});
		}

		const validPassword = await verifyPassword(user[0].passwordHash, password);

		if (!validPassword) {
			return fail(400, {
				error: 'Invalid email or password',
				email
			});
		}

		const sessionId = await createSession(user[0].id);

		cookies.set('session', sessionId, {
			path: '/',
			maxAge: 60 * 60 * 24 * 30, // 30 days
			httpOnly: true,
			secure: true,
			sameSite: 'lax'
		});

		throw redirect(302, '/dashboard');
	}
};
