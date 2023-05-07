<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/Navbar.svelte';

	export let data;
	console.log(data);
</script>

<svelte:head>
	<title>svelteKitMaDrs | MaDr</title>
</svelte:head>

<Navbar user={data.user} />
<div class="max-w-5xl mx-auto">
	<div>
		<slot />
	</div>
</div>
