import { isRedirect } from '@sveltejs/kit';
import { describe, expect, it } from 'vitest';
import { load } from '../../src/routes/auth/+page.server.ts';

type LoadEvent = Parameters<typeof load>[0];

function run(url: string, user: App.Locals['user'] = null) {
	return load({ locals: { user, session: null }, url: new URL(url) } as unknown as LoadEvent);
}

describe('/auth load', () => {
	it('returns no error by default', async () => {
		expect(await run('http://localhost/auth')).toEqual({ error: null });
	});

	it('maps known Better Auth error codes to friendly messages', async () => {
		expect(await run('http://localhost/auth?error=access_denied')).toEqual({
			error: 'GitHub sign-in was cancelled.'
		});
	});

	it('still explains unknown error codes', async () => {
		expect(await run('http://localhost/auth?error=something_odd')).toEqual({
			error: 'Sign-in failed (something odd).'
		});
	});

	it('redirects signed-in users to the dashboard', async () => {
		const user = { id: '1' } as NonNullable<App.Locals['user']>;
		const error = await Promise.resolve(run('http://localhost/auth', user)).catch(
			(e: unknown) => e
		);
		expect(isRedirect(error)).toBe(true);
		expect(error).toMatchObject({ status: 303, location: '/dashboard' });
	});
});
