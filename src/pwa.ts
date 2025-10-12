import { Workbox } from 'workbox-window';

let wb: Workbox;

export function initPWA() {
	if ('serviceWorker' in navigator) {
		if (import.meta.env.DEV) {
			fetch('/service-worker.js')
				.then((response) => {
					if (response.ok) {
						registerServiceWorker();
					} else {
						console.log('Service worker not available in development mode');
					}
				})
				.catch(() => {
					console.log('Service worker not available in development mode');
				});
		} else {
			registerServiceWorker();
		}
	}
}

function registerServiceWorker() {
	wb = new Workbox('/service-worker.js');

	wb.addEventListener('installed', () => {
		console.log('Service worker installed');
	});

	wb.addEventListener('waiting', () => {
		console.log('Service worker waiting');
	});

	wb.addEventListener('controlling', () => {
		console.log('Service worker controlling');
		window.location.reload();
	});

	wb.register().catch((error) => {
		console.error('Service worker registration failed:', error);
	});
}

export function updatePWA() {
	if (wb) {
		wb.messageSkipWaiting();
	}
}
