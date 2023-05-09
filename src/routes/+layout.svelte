<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/Navbar.svelte';

	export let data;
	console.log(data);
</script>

<svelte:head>
	<title>svelteKitMaDrs | MaDr</title>
</svelte:head>

<div class=" max-w-5xl mx-auto px-2">
	<Navbar user={data.user} />
	<slot />
</div>
