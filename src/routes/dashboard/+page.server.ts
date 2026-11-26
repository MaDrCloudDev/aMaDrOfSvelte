import { redirect } from '@sveltejs/kit';
import { count, desc, eq, gt } from 'drizzle-orm';
import { ROUTES } from '#lib/constants.ts';
import { db } from '#lib/server/db/index.ts';
import { account, session, user } from '#lib/server/db/schema.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(303, ROUTES.HOME);

	const now = new Date();
	const [[users], [activeSessions], providers, recentSessions] = await Promise.all([
		db.select({ value: count() }).from(user),
		db.select({ value: count() }).from(session).where(gt(session.expiresAt, now)),
		db
			.select({ providerId: account.providerId })
			.from(account)
			.where(eq(account.userId, locals.user.id)),
		db
			.select({
				id: session.id,
				createdAt: session.createdAt,
				expiresAt: session.expiresAt,
				userAgent: session.userAgent
			})
			.from(session)
			.where(eq(session.userId, locals.user.id))
			.orderBy(desc(session.createdAt))
			.limit(5)
	]);

	return {
		user: locals.user,
		currentSessionId: locals.session?.id,
		stats: {
			users: users.value,
			activeSessions: activeSessions.value,
			providers: providers.map((p) => p.providerId)
		},
		recentSessions
	};
};
