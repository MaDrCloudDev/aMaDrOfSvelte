<script lang="ts">
	import { enhance } from '$app/forms';
	import { Label, Input } from 'flowbite-svelte';
	import { Button } from 'flowbite-svelte';

	// export let form: { message?: string };
	export let form;
</script>

<div class="grid grid-cols-12 place-items-center text-2xl">
	<div class="col-span-12 text-center">
		<h2 class="mb-4">Sign in</h2>
		<a href="/api/oauth?provider=github"
			><Button color="dark" class="text-lg mb-4">Continue with Github</Button></a
		>
		<p class="mb-4">or</p>
	</div>
	<form method="post" use:enhance class="grid col-span-12 gap-4">
		<Label for="username" defaultClass="text-2xl">username</Label>
		<Input id="username" name="username" />
		<Label for="password" defaultClass="text-2xl">password</Label>
		<Input type="password" id="password" name="password" />
		<Input type="submit" value="Continue" size="xl" class="cursor-pointer hover:bg-gray-100 py-2" />
		<span class="text-center mb-4">Need an account?</span>
	</form>

	<div class="col-span-12 mt-2">
		{#if form?.message}
			<p class="error">{form.message || ''}</p>
		{/if}
		<a href="/signup"
			><button color="dark" class="border border-black px-2 py-1 rounded-lg text-lg"
				>Create an account</button
			></a
		>
	</div>
</div>
