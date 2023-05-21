<script>
	import Card from '$lib/flowbite/Card.svelte';

	export let data;

	const projects = data.projects;
	console.log(projects);
</script>

<container class="grid gap-2 p-4 place-items-center">
	<div class="text-center col-span-1 sm:col-span-3">
		<p class="font-bold text-lg italic text-red-600 dark:text-red-400 mb-4">
			This page is protected and can only be accessed by authenticated users.
		</p>
	</div>
	{#each projects as project}
		<Card
			imageUrl={project.img}
			title={project.name}
			description={project.description}
			slug={`/projects/${project.id}/`}
		/>
	{/each}
</container>
