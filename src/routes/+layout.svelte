<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/Navbar.svelte';

	export let data;
	console.log(data);
</script>

<svelte:head>
	<title>svelteKitMaDrs | MaDr</title>
</svelte:head>

<div class="max-w-5xl mx-auto">
	<div class="sticky top-0">
		<Navbar user={data.user} />
	</div>
	<div>
		<slot />
	</div>
</div>
