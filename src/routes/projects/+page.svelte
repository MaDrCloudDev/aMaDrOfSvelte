<script>
	import Card from '$lib/Card.svelte';
	export let data;
	console.log(data);

	let { users } = data.users;
	console.log(users);
</script>

<container class="grid gap-2 p-4 place-items-center">
	<div class="text-center col-span-1 sm:col-span-3">
		<p class="font-bold text-lg italic text-red-600">
			This page is protected and can only be accessed by authenticated users.
		</p>
	</div>
	{#each users as user}
		<Card imageUrl={user.image} title={user.username} description={user.address.address} />
	{/each}
</container>
