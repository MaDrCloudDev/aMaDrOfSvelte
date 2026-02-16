import { describe, expect, it } from 'vitest';

describe('DarkModeToggle', () => {
	it('is importable', async () => {
		const module = await import('../../src/lib/components/DarkModeToggle.svelte');
		expect(module.default).toBeDefined();
	});
});
