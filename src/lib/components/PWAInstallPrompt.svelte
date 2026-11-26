<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '#lib/components/ui/button/index.ts';
	import { APP_NAME } from '#lib/constants.ts';

	// Chromium-only, not in lib.dom yet
	interface BeforeInstallPromptEvent extends Event {
		prompt(): Promise<void>;
		userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
	}

	const DISMISSED_KEY = 'pwa-install-dismissed';

	let deferredPrompt = $state<BeforeInstallPromptEvent | null>(null);

	onMount(() => {
		function onBeforeInstallPrompt(event: Event) {
			event.preventDefault();
			if (localStorage.getItem(DISMISSED_KEY)) return;
			deferredPrompt = event as BeforeInstallPromptEvent;
		}

		function onAppInstalled() {
			deferredPrompt = null;
		}

		window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
		window.addEventListener('appinstalled', onAppInstalled);
		return () => {
			window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
			window.removeEventListener('appinstalled', onAppInstalled);
		};
	});

	async function install() {
		if (!deferredPrompt) return;
		await deferredPrompt.prompt();
		await deferredPrompt.userChoice;
		deferredPrompt = null;
	}

	function dismiss() {
		localStorage.setItem(DISMISSED_KEY, '1');
		deferredPrompt = null;
	}
</script>

{#if deferredPrompt}
	<aside
		class="fixed right-4 bottom-4 z-50 max-w-sm rounded-lg border bg-background p-4 shadow-lg"
		aria-labelledby="pwa-install-title"
	>
		<div class="flex flex-col gap-3">
			<p id="pwa-install-title" class="text-sm font-medium">Install {APP_NAME}</p>
			<p class="text-xs text-muted-foreground">
				Add it to your device for quick access and offline support.
			</p>
			<div class="flex gap-2">
				<Button size="sm" onclick={install}>Install</Button>
				<Button variant="outline" size="sm" onclick={dismiss}>Not now</Button>
			</div>
		</div>
	</aside>
{/if}
