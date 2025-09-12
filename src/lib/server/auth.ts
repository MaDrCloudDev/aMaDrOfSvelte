import { betterAuth } from 'better-auth';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db';
import { BETTER_AUTH_SECRET, BETTER_AUTH_URL } from '$env/static/private';
import { env } from '$env/dynamic/private';

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

export type Session = typeof auth.$Infer.Session.session;
export type User = typeof auth.$Infer.Session.user;
