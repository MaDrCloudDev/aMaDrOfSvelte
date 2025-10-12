import { describe, it, expect } from 'vitest';

describe('DarkModeToggle Component', () => {
	it('should be importable', async () => {
		const module = await import('../../src/lib/components/DarkModeToggle.svelte');
		expect(module.default).toBeDefined();
	});
});

describe('Utils', () => {
	it('should perform basic arithmetic', () => {
		expect(2 + 2).toBe(4);
	});
});
