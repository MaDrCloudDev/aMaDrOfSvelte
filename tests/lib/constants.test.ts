import { describe, expect, it } from 'vitest';
import { GITHUB_REPO_URL, ROUTES, SHADCN_SVELTE_URL } from '../../src/lib/constants';

describe('constants', () => {
	it('exposes a stable route map', () => {
		expect(ROUTES.HOME).toBe('/');
		expect(ROUTES.AUTH).toBe('/auth');
		expect(ROUTES.DASHBOARD).toBe('/dashboard');
		expect(ROUTES.COMPONENTS).toBe('/components');
		expect(ROUTES.ABOUT).toBe('/about');
		expect(ROUTES.GITHUB_REPO).toBe(GITHUB_REPO_URL);
	});

	it('uses secure urls for external links', () => {
		expect(GITHUB_REPO_URL.startsWith('https://')).toBe(true);
		expect(SHADCN_SVELTE_URL.startsWith('https://')).toBe(true);
	});
});
