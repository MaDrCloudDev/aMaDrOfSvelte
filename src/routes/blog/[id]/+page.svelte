<script>
	import Post from '$lib/Post.svelte';

	export let data;

	const { post } = data;
</script>

<div class="flex flex-col text-center">
	<h1 class="text-xl font-bold underline p-4">{post.title}</h1>
	<p class="text-lg px-2 pb-2">{post.description}</p>
	<a href="/blog" class="text-sm pb-4 hover:text-blue-700 hover:dark:text-yellow-400"
		>&#8592; back to all posts</a
	>
</div>
