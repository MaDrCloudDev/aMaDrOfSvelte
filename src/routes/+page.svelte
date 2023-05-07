<script lang="ts">
	import { enhance } from '$app/forms';
	import { Label, Input } from 'flowbite-svelte';
	import Logo from '$lib/Logo.svelte';
	// import type { PageData } from './$types';

	// export let data: PageData;
	export let data;
</script>

<container class="w-fit mx-auto p-4">
	<div class="text-center">
		<p class="font-bold text-md sm:text-2xl mb-2">
			This page is protected and can only be accessed by authenticated users.
		</p>
	</div>
	<!-- component -->
	<div class="flex justify-center">
		<Logo />
	</div>
	<pre class="code">
{JSON.stringify(data.user, null, 2)}
</pre>
	<form use:enhance method="post">
		<Input type="submit" value="Sign out" class="cursor-pointer hover:bg-gray-100" />
	</form>
	<!-- component -->
</container>
