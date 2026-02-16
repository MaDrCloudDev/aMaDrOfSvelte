import { beforeEach, describe, expect, it } from 'vitest';
import { applyDarkMode, getInitialDarkMode } from '../../src/lib/theme';

describe('theme utilities', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('prefers stored value over system preference', () => {
		localStorage.setItem('darkMode', 'true');
		expect(getInitialDarkMode(localStorage, false)).toBe(true);

		localStorage.setItem('darkMode', 'false');
		expect(getInitialDarkMode(localStorage, true)).toBe(false);
	});

	it('falls back to system preference when no value is stored', () => {
		expect(getInitialDarkMode(localStorage, true)).toBe(true);
		expect(getInitialDarkMode(localStorage, false)).toBe(false);
	});

	it('applies class and persists the value', () => {
		const root = document.documentElement;

		applyDarkMode(true, root, localStorage);
		expect(root.classList.contains('dark')).toBe(true);
		expect(localStorage.getItem('darkMode')).toBe('true');

		applyDarkMode(false, root, localStorage);
		expect(root.classList.contains('dark')).toBe(false);
		expect(localStorage.getItem('darkMode')).toBe('false');
	});
});
