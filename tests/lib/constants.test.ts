import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { ROUTES } from '../../src/lib/constants.ts';

describe('ROUTES', () => {
	it.each(Object.entries(ROUTES))('%s (%s) points at a real page', (_name, path) => {
		expect(existsSync(`src/routes${path}/+page.svelte`.replace('//', '/'))).toBe(true);
	});
});
