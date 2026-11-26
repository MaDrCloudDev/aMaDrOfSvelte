import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { mode } from 'mode-watcher';
import { describe, expect, it } from 'vitest';
import DarkModeToggle from '../../src/lib/components/DarkModeToggle.svelte';

describe('DarkModeToggle', () => {
	it('has an accessible name', () => {
		render(DarkModeToggle);
		expect(screen.getByRole('button', { name: 'Toggle dark mode' })).toBeTruthy();
	});

	it('flips the mode on click', async () => {
		render(DarkModeToggle);
		const before = mode.current;
		await userEvent.click(screen.getByRole('button', { name: 'Toggle dark mode' }));
		expect(mode.current).not.toBe(before);
	});
});
