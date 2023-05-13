<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/Navbar.svelte';
	import Footer from '$lib/Footer.svelte';

	export let data;
</script>

<svelte:head>
	<title>aMaDrOfSvelte | MaDr</title>
</svelte:head>

<div class="max-w-5xl mx-auto px-2">
	<Navbar user={data.user} />
	<slot />
	<Footer />
</div>
