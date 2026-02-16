import { describe, it, expect, vi } from 'vitest';
import { ROUTES } from '../../src/lib/constants';

describe('Auth Utils', () => {
	it('should define navigation functions', async () => {
		const module = await import('../../src/lib/auth-utils');
		expect(module.navigateToProfile).toBeDefined();
		expect(module.navigateToSettings).toBeDefined();
		expect(module.openGitHubRepo).toBeDefined();
		expect(module.handleSignOut).toBeDefined();
		expect(module.handleGitHubSignIn).toBeDefined();
	});
});
