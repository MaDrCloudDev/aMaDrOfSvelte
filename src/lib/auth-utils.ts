import { toast } from 'svelte-sonner';
import { goto, refreshAll } from '$app/navigation';
import { resolve } from '$app/paths';
import { signIn, signOut } from '#lib/auth-client.ts';
import { ROUTES } from '#lib/constants.ts';

function errorMessage(error: unknown, fallback: string): string {
	return error instanceof Error ? error.message : fallback;
}

export async function handleGitHubSignIn(): Promise<void> {
	try {
		const { error } = await signIn.social({
			provider: 'github',
			callbackURL: ROUTES.DASHBOARD,
			errorCallbackURL: ROUTES.AUTH
		});
		if (error) throw new Error(error.message ?? 'Failed to sign in');
	} catch (error) {
		toast.error(`Sign in failed: ${errorMessage(error, 'Failed to sign in')}`);
	}
}

export async function handleSignOut(): Promise<void> {
	try {
		const { error } = await signOut();
		if (error) throw new Error(error.message ?? 'Failed to sign out');
		toast.success('Signed out');
		await refreshAll();
		await goto(resolve(ROUTES.HOME));
	} catch (error) {
		toast.error(`Sign out failed: ${errorMessage(error, 'Failed to sign out')}`);
	}
}
