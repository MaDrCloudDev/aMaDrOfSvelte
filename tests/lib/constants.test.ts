import { describe, it, expect } from 'vitest';

describe('Constants', () => {
	it('should export ROUTES object with all necessary routes', async () => {
		const module = await import('../../src/lib/constants');
		expect(module.ROUTES).toBeDefined();
		expect(module.ROUTES.HOME).toBe('/');
		expect(module.ROUTES.DASHBOARD).toBe('/dashboard');
		expect(module.ROUTES.COMPONENTS).toBe('/components');
		expect(module.ROUTES.ABOUT).toBe('/about');
		expect(module.ROUTES.SETTINGS).toBe('/dashboard?tab=settings');
		expect(module.GITHUB_REPO_URL).toBeDefined();
	});
});
