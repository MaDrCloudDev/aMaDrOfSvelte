<script>
	import Post from '$lib/Post.svelte';
	export let data;

	const posts = data.blogposts;
	console.log(posts);
</script>

<container class="grid md:grid-cols-2 sm:p-4 gap-4 mx-auto place-items-center">
	<div class="text-center col-span-1 md:col-span-2">
		<p class="font-bold text-lg italic text-red-600">
			This page is protected and can only be accessed by authenticated users.
		</p>
	</div>
	{#each posts as post}
		<Post title={post.title} description={post.description} imageUrl={post.img} />
	{/each}
</container>
