import { hash, verify } from '@node-rs/argon2';
import { db } from './db';
import { users, sessions } from './db/schema';
import { eq } from 'drizzle-orm';
import { randomBytes } from 'crypto';

<<<<<<< Updated upstream
export async function hashPassword(password: string): Promise<string> {
	return await hash(password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});
}
=======
export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'sqlite'
	}),
	secret: BETTER_AUTH_SECRET,
	baseURL: BETTER_AUTH_URL,
	emailAndPassword: {
		enabled: false
	},
	socialProviders: {
		github: {
			clientId: env.GITHUB_CLIENT_ID || '',
			clientSecret: env.GITHUB_CLIENT_SECRET || ''
		}
	},
	session: {
		expiresIn: 60 * 60 * 24 * 30,
		updateAge: 60 * 60 * 24
	},
	plugins: [sveltekitCookies(getRequestEvent)]
});
>>>>>>> Stashed changes

export async function verifyPassword(hash: string, password: string): Promise<boolean> {
	return await verify(hash, password);
}

export function generateSessionId(): string {
	return randomBytes(32).toString('hex');
}

export async function createSession(userId: number): Promise<string> {
	const sessionId = generateSessionId();
	const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days

	await db.insert(sessions).values({
		id: sessionId,
		userId,
		expiresAt
	});

	return sessionId;
}

export async function validateSession(sessionId: string) {
	const result = await db
		.select({
			user: {
				id: users.id,
				email: users.email
			},
			session: {
				id: sessions.id,
				expiresAt: sessions.expiresAt
			}
		})
		.from(sessions)
		.innerJoin(users, eq(sessions.userId, users.id))
		.where(eq(sessions.id, sessionId))
		.limit(1);

	if (result.length === 0) {
		return { user: null, session: null };
	}

	const { user, session } = result[0];

	if (Date.now() >= session.expiresAt.getTime()) {
		await db.delete(sessions).where(eq(sessions.id, sessionId));
		return { user: null, session: null };
	}

	return { user, session };
}

export async function invalidateSession(sessionId: string): Promise<void> {
	await db.delete(sessions).where(eq(sessions.id, sessionId));
}
