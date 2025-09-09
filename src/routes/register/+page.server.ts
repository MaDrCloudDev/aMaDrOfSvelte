import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { hashPassword, createSession } from '$lib/server/auth';

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
		const confirmPassword = data.get('confirmPassword') as string;

		if (!email || !password || !confirmPassword) {
			return fail(400, {
				error: 'All fields are required',
				email
			});
		}

		if (password !== confirmPassword) {
			return fail(400, {
				error: 'Passwords do not match',
				email
			});
		}

		if (password.length < 6) {
			return fail(400, {
				error: 'Password must be at least 6 characters',
				email
			});
		}

		// Check if user already exists
		const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

		if (existingUser.length > 0) {
			return fail(400, {
				error: 'User with this email already exists',
				email
			});
		}

		const passwordHash = await hashPassword(password);

		const newUser = await db
			.insert(users)
			.values({
				email,
				passwordHash,
				createdAt: new Date()
			})
			.returning();

		const sessionId = await createSession(newUser[0].id);

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
