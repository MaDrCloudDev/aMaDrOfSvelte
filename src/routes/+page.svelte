<script lang="ts">
	import { enhance } from '$app/forms';
	import { Label, Input } from 'flowbite-svelte';
	import Logo from '$lib/Logo.svelte';
	// import type { PageData } from './$types';

	// export let data: PageData;
	export let data;
</script>

<div class="grid grid-cols-12 place-items-center">
	<div class="col-span-12">
		<p class="font-bold text-lg italic text-red-600 text-center">
			This page is protected and can only be accessed by authenticated users.
		</p>
		<div class="flex justify-center mt-4">
			<Logo />
		</div>
	</div>
	<div class="col-span-12">
		<pre class="code flex">
			{JSON.stringify(data.user, null, 2)}
		</pre>
		<form use:enhance method="post">
			<Input type="submit" value="Sign out" class="cursor-pointer hover:bg-gray-100" />
		</form>
	</div>
</div>
