<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import { ModeWatcher } from 'mode-watcher';
	import { page } from '$app/state';
	import Navbar from '#lib/components/Navbar.svelte';
	import PWAInstallPrompt from '#lib/components/PWAInstallPrompt.svelte';
	import { Toaster } from '#lib/components/ui/sonner/index.ts';
	import { ROUTES } from '#lib/constants.ts';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();

	const hideNavbar = $derived(page.route.id === ROUTES.AUTH);
</script>

<ModeWatcher />

<a
	href="#main"
	class="sr-only rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60]"
>
	Skip to content
</a>

{#if !hideNavbar}
	<Navbar user={data.user} />
{/if}

<main id="main" tabindex="-1" class="outline-none">
	{@render children()}
</main>

<PWAInstallPrompt />
<Toaster richColors />
