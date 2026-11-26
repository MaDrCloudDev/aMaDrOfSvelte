import { defineEnvVars } from '@sveltejs/kit/env';

// Every env var the app uses. No schema = required. https://svelte.dev/docs/kit/environment-variables
const optional = (value: string | undefined) => value || undefined;

export const variables = defineEnvVars({
	// file:local.db locally, libsql://... for Turso
	DATABASE_URL: {},
	// Turso only
	DATABASE_AUTH_TOKEN: { schema: optional },

	BETTER_AUTH_SECRET: {
		schema: (value) => {
			if (!value || value.length < 32) {
				throw new Error(
					'BETTER_AUTH_SECRET must be at least 32 characters (openssl rand -base64 32)'
				);
			}
			return value;
		}
	},
	// falls back to the request origin if unset
	BETTER_AUTH_URL: { schema: optional },

	GITHUB_CLIENT_ID: {},
	GITHUB_CLIENT_SECRET: {}
});
