import type { Handle } from '@sveltejs/kit';
import { validateSession } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('session');

	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { user, session } = await validateSession(sessionId);

	if (user && session) {
		event.locals.user = user;
		event.locals.session = session;
	} else {
		event.locals.user = null;
		event.locals.session = null;
		event.cookies.delete('session', { path: '/' });
	}

	return resolve(event);
};
