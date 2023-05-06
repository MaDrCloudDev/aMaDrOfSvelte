<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/Navbar.svelte';

	export let data;
	console.log(data);
</script>

<svelte:head>
	<title>svelteKitMaDrs | MaDr</title>
</svelte:head>

<div class="max-w-5xl flex flex-col mx-auto">
	<Navbar user={data.user} />
	<slot />
</div>
