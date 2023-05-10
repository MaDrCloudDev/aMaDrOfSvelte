<script lang="ts">
	import { enhance } from '$app/forms';
	import { Label, Input } from 'flowbite-svelte';
	import { Button } from 'flowbite-svelte';

	// export let form: { message?: string };
	export let form;
</script>

<div class="grid grid-cols-12 place-items-center">
	<div class="col-span-12 text-center">
		<h2>Sign in</h2>
		<a href="/api/oauth?provider=github"><Button color="dark">Continue with Github</Button></a>
		<p>or</p>
	</div>
	<form method="post" use:enhance class="grid col-span-12 gap-2">
		<Label for="username">username</Label>
		<Input id="username" name="username" />
		<Label for="password">password</Label>
		<Input type="password" id="password" name="password" />
		<Input type="submit" value="Continue" class="cursor-pointer hover:bg-gray-100" />
		<span class="text-center">Need an account?</span>
	</form>

	<div class="col-span-12 mt-2">
		{#if form?.message}
			<p class="error">{form.message || ''}</p>
		{/if}
		<a href="/signup"
			><button color="dark" class="border border-black px-2 py-1 rounded-lg"
				>Create an account</button
			></a
		>
	</div>
</div>
