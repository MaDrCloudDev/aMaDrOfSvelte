<script>
	import Card from '$lib/Card.svelte';
</script>

<container class="grid sm:grid-cols-2 md:grid-cols-3 gap-2 p-4">
	<div class="text-center col-span-3">
		<p class="font-bold text-md sm:text-2xl mb-2">
			This page is protected and can only be accessed by authenticated users.
		</p>
	</div>
	<Card />
	<Card />
	<Card />
	<Card />
	<Card />
	<Card />
</container>
