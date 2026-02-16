import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ROUTES } from '../../src/lib/constants';

const signInSocial = vi.fn();
const signOut = vi.fn();
const goto = vi.fn().mockResolvedValue(undefined);
const invalidateAll = vi.fn().mockResolvedValue(undefined);
const toastSuccess = vi.fn();
const toastError = vi.fn();

vi.mock('$lib/auth-client', () => ({
	signIn: {
		social: signInSocial
	},
	signOut
}));

vi.mock('$app/navigation', () => ({
	goto,
	invalidateAll
}));

vi.mock('svelte-sonner', () => ({
	toast: {
		success: toastSuccess,
		error: toastError
	}
}));

describe('auth-utils', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('starts github auth with dashboard callback', async () => {
		const { handleGitHubSignIn } = await import('../../src/lib/auth-utils');

		await handleGitHubSignIn();

		expect(signInSocial).toHaveBeenCalledWith({
			provider: 'github',
			callbackURL: ROUTES.DASHBOARD
		});
		expect(toastError).not.toHaveBeenCalled();
	});

	it('shows a toast when github auth throws', async () => {
		const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
		signInSocial.mockRejectedValueOnce(new Error('oauth unavailable'));
		const { handleGitHubSignIn } = await import('../../src/lib/auth-utils');

		await handleGitHubSignIn();

		expect(toastError).toHaveBeenCalledWith('Sign in failed: oauth unavailable');
		errorSpy.mockRestore();
	});

	it('invalidates and redirects after successful sign out', async () => {
		signOut.mockImplementationOnce(
			async (options: { fetchOptions?: { onSuccess?: () => Promise<void> } }) => {
				await options.fetchOptions?.onSuccess?.();
			}
		);
		const { handleSignOut } = await import('../../src/lib/auth-utils');

		await handleSignOut();

		expect(toastSuccess).toHaveBeenCalledWith('Successfully signed out!');
		expect(invalidateAll).toHaveBeenCalledTimes(1);
		expect(goto).toHaveBeenCalledWith(ROUTES.HOME);
		expect(toastError).not.toHaveBeenCalled();
	});

	it('navigates to dashboard for profile action', async () => {
		const { navigateToProfile } = await import('../../src/lib/auth-utils');

		navigateToProfile();

		expect(goto).toHaveBeenCalledWith(ROUTES.DASHBOARD);
	});

	it('opens repository in a new tab', async () => {
		const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
		const { openGitHubRepo } = await import('../../src/lib/auth-utils');

		openGitHubRepo();

		expect(openSpy).toHaveBeenCalledWith(ROUTES.GITHUB_REPO, '_blank', 'noopener,noreferrer');
		openSpy.mockRestore();
	});
});
