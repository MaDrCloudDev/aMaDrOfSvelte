<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/Navbar.svelte';
</script>

<svelte:head>
	<title>svelteKitMaDrs | MaDr</title>
</svelte:head>

<Navbar />
<div class="max-w-4xl w-fit flex flex-col mx-auto">
	<slot />
</div>
