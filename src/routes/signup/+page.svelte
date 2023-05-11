<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { Label, Input } from 'flowbite-svelte';
	// export let form: { message?: string };
	export let form;
</script>

<container class="flex flex-col max-w-xs mx-auto gap-4 mt-10">
	<div class="text-center flex flex-col gap-4 text-[1.2rem]">
		<h2>Create an account</h2>
		<a href="/api/oauth?provider=github"><Button color="dark">Continue with Github</Button></a>
		<p>or</p>
	</div>
	<form method="post" use:enhance class="flex flex-col gap-4">
		<Label for="username" class="text-[1.2rem]">username</Label>
		<Input id="username" size="lg" name="username" />
		<Label for="password" class="text-[1.2rem]">password</Label>
		<Input type="password" size="lg" id="password" name="password" />
		<Input type="submit" size="lg" class="cursor-pointer hover:bg-gray-100" value="Continue" />
	</form>
	<div class="flex flex-col text-center gap-4">
		<span class="text-[1.2rem]">Already signed up?</span>
		{#if form?.message}
			<p class="error">{form.message || ''}</p>
		{/if}
		<a href="/login"
			><button
				color="dark"
				class="border border-black px-2 py-1 rounded-lg text-[1rem] hover:bg-gray-50"
				>Sign in</button
			></a
		>
	</div>
</container>
