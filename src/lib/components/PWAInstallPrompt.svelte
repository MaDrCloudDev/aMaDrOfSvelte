<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';

	let deferredPrompt = $state<any>(null);
	let showInstallPrompt = $state(false);

	onMount(() => {
		function handleBeforeInstallPrompt(e: Event) {
			e.preventDefault();
			deferredPrompt = e;
			showInstallPrompt = true;
		}

		function handleAppInstalled() {
			showInstallPrompt = false;
			deferredPrompt = null;
		}

		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
		window.addEventListener('appinstalled', handleAppInstalled);

		return () => {
			window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
			window.removeEventListener('appinstalled', handleAppInstalled);
		};
	});

	async function installApp() {
		if (deferredPrompt) {
			deferredPrompt.prompt();
			const result = await deferredPrompt.userChoice;
			if (result.outcome === 'accepted') {
				showInstallPrompt = false;
			}
			deferredPrompt = null;
		}
	}
</script>

{#if showInstallPrompt}
	<div class="fixed right-4 bottom-4 max-w-sm rounded-lg border bg-background p-4 shadow-lg">
		<div class="flex flex-col space-y-3">
			<div class="text-sm font-medium">Install aMaDrOfSvelte</div>
			<div class="text-xs text-muted-foreground">
				Install this app for a better experience and offline access.
			</div>
			<div class="flex space-x-2">
				<Button size="sm" onclick={installApp}>Install</Button>
				<Button variant="outline" size="sm" onclick={() => (showInstallPrompt = false)}>
					Later
				</Button>
			</div>
		</div>
	</div>
{/if}
