<script lang="ts">
	import { enhance } from '$app/forms';
	import { Label, Input } from 'flowbite-svelte';
	import { Button } from 'flowbite-svelte';

	// export let form: { message?: string };
	export let form;
</script>

<div class="flex flex-col text-center mb-[-20px]">
	<span class="italic text-xl font-bold text-blue-700"
		>A modern, contained full-stack template manageable by solo developers; but usable by large
		teams</span
	>
	<span
		>Made by <a
			href="https://madr.io"
			target="_blank"
			class="font-bold text-blue-700 hover:underline hover:cursor-pointer">MaDr</a
		></span
	>
</div>
<container class="flex flex-col max-w-xs mx-auto gap-4 mt-10 h-[32rem]">
	<div class="text-center flex flex-col gap-4 text-[1.2rem]">
		<h2>Sign in</h2>
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
		<span class="text-[1.2rem]">Need an account?</span>
		{#if form?.message}
			<p class="error">{form.message || ''}</p>
		{/if}
		<a href="/signup"
			><button class="border border-black px-2 py-1 rounded-lg text-[1rem] hover:bg-gray-50"
				>Create an account</button
			></a
		>
	</div>
</container>
