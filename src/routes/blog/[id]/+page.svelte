<script>
	import Post from '$lib/Post.svelte';

	export let data;

	const { post } = data;
</script>

<h1 class="flex justify-center text-xl font-bold underline p-4">{post.title}</h1>
<p class="flex justify-center text-lg px-2 pb-4">{post.description}</p>
