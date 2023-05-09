<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/Navbar.svelte';
	import { initFlash } from 'sveltekit-flash-message/client';
	import { page } from '$app/stores';

	const flash = initFlash(page);

	export let data;
	console.log(data);
</script>

<svelte:head>
	<title>svelteKitMaDrs | MaDr</title>
</svelte:head>

{#if $flash}
	{@const bg = $flash.type == 'success' ? '#3D9970' : '#FF4136'}
	<div style:background-color={bg} class="flash">{$flash.message}</div>
{/if}
<div class=" max-w-5xl mx-auto px-2">
	<Navbar user={data.user} />
	<slot />
</div>
