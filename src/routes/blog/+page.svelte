<script>
	import Post from '$lib/Post.svelte';
	export let data;

	const posts = data.blogposts;
	console.log(posts);
</script>

<container class="grid md:grid-cols-2 md:p-4 mx-auto place-items-center">
	<div class="text-center col-span-1 md:col-span-2">
		<p class="font-bold text-lg italic text-red-600 dark:text-red-400 mb-4">
			This page is protected and can only be accessed by authenticated users.
		</p>
	</div>
	{#each posts as post}
		<div class="mb-10">
			<Post title={post.title} description={post.description} imageUrl={post.img} />
		</div>
	{/each}
</container>
