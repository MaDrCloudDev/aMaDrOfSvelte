const DARK_MODE_KEY = 'darkMode';

export function getInitialDarkMode(storage: Storage, prefersDark: boolean): boolean {
	const savedPreference = storage.getItem(DARK_MODE_KEY);
	return savedPreference === null ? prefersDark : savedPreference === 'true';
}

export function applyDarkMode(enabled: boolean, root: HTMLElement, storage: Storage): void {
	root.classList.toggle('dark', enabled);
	storage.setItem(DARK_MODE_KEY, enabled ? 'true' : 'false');
}
