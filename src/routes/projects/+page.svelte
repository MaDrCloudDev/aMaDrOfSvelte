<script>
	import Card from '$lib/Card.svelte';
	export let data;
	console.log(data);

	let { users } = data.users;
	console.log(users);
</script>

<container class="grid sm:grid-cols-2 md:grid-cols-3 gap-2 p-4">
	<div class="text-center col-span-3">
		<p class="font-bold text-md sm:text-2xl mb-2">
			This page is protected and can only be accessed by authenticated users.
		</p>
	</div>
	{#each users as user}
		<Card imageUrl={user.image} title={user.username} description={user.address.address} />
	{/each}
</container>
