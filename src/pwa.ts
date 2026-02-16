import { Workbox } from 'workbox-window';

let wb: Workbox | null = null;

export function initPWA(): void {
	void setupPWA();
}

async function setupPWA(): Promise<void> {
	if (wb || !('serviceWorker' in navigator)) {
		return;
	}

	if (import.meta.env.DEV) {
		try {
			const response = await fetch('/service-worker.js', { method: 'HEAD' });
			if (!response.ok) {
				return;
			}
		} catch {
			return;
		}
	}

	wb = new Workbox('/service-worker.js');

	wb.addEventListener('controlling', () => {
		window.location.reload();
	});

	try {
		await wb.register();
	} catch (error) {
		if (import.meta.env.DEV) {
			console.error('Service worker registration failed:', error);
		}
	}
}

export function updatePWA(): void {
	wb?.messageSkipWaiting();
}
