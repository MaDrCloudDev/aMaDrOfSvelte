import { signIn, signOut } from '$lib/auth-client';
import { toast } from 'svelte-sonner';
import { goto, invalidateAll } from '$app/navigation';
import { ROUTES } from './constants';

function logAuthError(scope: string, error: unknown): void {
	if (import.meta.env.DEV) {
		console.error(`${scope}:`, error);
	}
}

export async function handleSignOut(): Promise<void> {
	try {
		await signOut({
			fetchOptions: {
				onSuccess: async () => {
					toast.success('Successfully signed out!');
					await invalidateAll();
					await goto(ROUTES.HOME);
				}
			}
		});
	} catch (error) {
		logAuthError('Sign out error', error);
		const message = error instanceof Error ? error.message : 'Failed to sign out';
		toast.error(`Sign out failed: ${message}`);
	}
}

export async function handleGitHubSignIn(): Promise<void> {
	try {
		await signIn.social({
			provider: 'github',
			callbackURL: ROUTES.DASHBOARD
		});
	} catch (error) {
		logAuthError('GitHub sign-in error', error);
		const message = error instanceof Error ? error.message : 'Failed to sign in';
		toast.error(`Sign in failed: ${message}`);
	}
}

export function navigateToProfile(): void {
	void goto(ROUTES.DASHBOARD);
}

export function openGitHubRepo(): void {
	if (typeof window !== 'undefined') {
		window.open(ROUTES.GITHUB_REPO, '_blank', 'noopener,noreferrer');
	}
}
