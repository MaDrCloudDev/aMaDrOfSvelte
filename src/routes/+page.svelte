<script lang="ts">
	import { enhance } from '$app/forms';
	import { Label, Input } from 'flowbite-svelte';
	import Logo from '$lib/Logo.svelte';
	// import type { PageData } from './$types';
	import Toasts from '$lib/toasts/Toasts.svelte';
	import { addToast } from '$lib/toasts/store';
	import { onMount } from 'svelte';

	let message = 'Hello, World!';
	let types = ['success', 'error', 'info'];
	let type = 'success';
	let dismissible = true;
	let timeout = 0;

	// export let data: PageData;
	export let data;

	onMount(() => {
		if (data.user) {
			addToast({
				message: 'Logged in',
				type: 'success',
				dismissible: true,
				timeout: 2000
			});
		}
	});
</script>

<Toasts />

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
		<div class="text-center mt-4">
			<span
				>Made by <a
					href="https://madr.io/"
					target="_blank"
					class="text-[#328eef] font-bold hover:underline">MaDr</a
				>. Check out my
				<a
					href="https://github.com/madrclouddev/"
					target="_blank"
					class="text-[#328eef] font-bold hover:underline">GitHub</a
				>!</span
			>
		</div>
	</div>
</div>
