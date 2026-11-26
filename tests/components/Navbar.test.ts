import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Navbar from '../../src/lib/components/Navbar.svelte';

vi.mock('$app/navigation', () => ({ afterNavigate: vi.fn(), goto: vi.fn(), refreshAll: vi.fn() }));
vi.mock('$app/state', () => ({ page: { url: new URL('http://localhost/'), route: { id: '/' } } }));
vi.mock('$app/paths', () => ({ resolve: (path: string) => path }));

describe('Navbar mobile menu', () => {
	it('opens, then Escape closes it and returns focus to the toggle', async () => {
		const user = userEvent.setup();
		render(Navbar);

		const toggle = screen.getByRole('button', { name: 'Open menu' });
		expect(toggle.getAttribute('aria-expanded')).toBe('false');

		await user.click(toggle);
		expect(screen.getByRole('region', { name: 'Site menu' })).toBeTruthy();
		expect(toggle.getAttribute('aria-expanded')).toBe('true');

		await user.keyboard('{Escape}');
		expect(screen.queryByRole('region', { name: 'Site menu' })).toBeNull();
		expect(document.activeElement).toBe(toggle);
	});

	it('announces that the repo link opens a new tab', () => {
		render(Navbar);
		expect(screen.getAllByRole('link', { name: /Repo \(opens in a new tab\)/ }).length).toBe(1);
	});
});
