import { signIn, signOut } from '$lib/auth-client';
import { toast } from 'svelte-sonner';
import { goto } from '$app/navigation';
import { ROUTES } from './constants';

export async function handleSignOut(): Promise<void> {
	try {
		await signOut({
			fetchOptions: {
				onSuccess: () => {
					toast.success('Successfully signed out!');
					setTimeout(() => {
						goto(ROUTES.HOME);
					}, 1000);
				}
			}
		});
	} catch (error) {
		console.error('Sign out error:', error);
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
		console.error('GitHub sign-in error:', error);
		const message = error instanceof Error ? error.message : 'Failed to sign in';
		toast.error(`Sign in failed: ${message}`);
	}
}

export function navigateToProfile(): void {
	goto(ROUTES.DASHBOARD);
}

export function navigateToSettings(): void {
	goto(ROUTES.SETTINGS);
}

export function openGitHubRepo(): void {
	window.open(ROUTES.GITHUB_REPO, '_blank', 'noopener,noreferrer');
}
