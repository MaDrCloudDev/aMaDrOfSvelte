<script>
	import Post from '$lib/Post.svelte';
</script>

<container class="grid md:grid-cols-2 sm:p-4 gap-2 mx-auto place-items-center">
	<div class="text-center col-span-1 md:col-span-2">
		<p class="font-bold text-md sm:text-2xl p-2">
			This page is protected and can only be accessed by authenticated users.
		</p>
	</div>
	<Post />
	<Post />
	<Post />
	<Post />
	<Post />
	<Post />
</container>
