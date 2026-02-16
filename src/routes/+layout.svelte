<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import PWAInstallPrompt from '$lib/components/PWAInstallPrompt.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { initPWA } from '../pwa';

	let { children, data }: { children?: Snippet; data: LayoutData } = $props();

	let hideNavbar = $derived(page.route.id === '/auth' || page.route.id?.startsWith('/auth/'));

	onMount(() => {
		initPWA();
	});
</script>

{#if !hideNavbar}
	<Navbar user={data.user} />
{/if}

{@render children?.()}

<PWAInstallPrompt />
<Toaster />
