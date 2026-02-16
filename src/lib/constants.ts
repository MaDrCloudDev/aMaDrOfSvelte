export const GITHUB_REPO_URL = 'https://github.com/MaDrCloudDev/aMaDrOfSvelte';
export const SHADCN_SVELTE_URL = 'https://shadcn-svelte.com/';

export const ROUTES = {
	HOME: '/',
	AUTH: '/auth',
	DASHBOARD: '/dashboard',
	COMPONENTS: '/components',
	ABOUT: '/about',
	SETTINGS: '/dashboard?tab=settings',
	GITHUB_REPO: GITHUB_REPO_URL
} as const;
