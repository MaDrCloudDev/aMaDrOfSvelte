import { createAuthClient } from 'better-auth/svelte';
import { browser } from '$app/environment';

export const authClient = createAuthClient({
	baseURL: browser ? window.location.origin : 'http://localhost:5173'
});

export const { signIn, signOut, useSession } = authClient;
