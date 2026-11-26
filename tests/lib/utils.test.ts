import { describe, expect, it } from 'vitest';
import { cn } from '../../src/lib/utils.ts';

describe('cn', () => {
	it('joins conditional classes', () => {
		expect(cn('px-2', undefined, null, { hidden: false, 'font-bold': true })).toBe(
			'px-2 font-bold'
		);
	});

	it('lets later Tailwind classes win conflicts', () => {
		expect(cn('px-2 text-sm', 'px-4')).toBe('text-sm px-4');
	});
});
