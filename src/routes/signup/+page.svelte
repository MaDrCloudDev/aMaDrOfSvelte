<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { Label, Input } from 'flowbite-svelte';
	// export let form: { message?: string };
	export let form;
</script>

<div class="flex flex-col text-center mb-[-20px]">
	<span class="italic text-xl font-bold text-blue-700 dark:text-yellow-400"
		>A modern, contained full-stack template manageable by solo developers; but usable by large
		teams</span
	>
	<span
		>Made by <a
			href="https://madr.io"
			target="_blank"
			class="font-bold text-blue-700 dark:text-yellow-400 hover:underline hover:cursor-pointer"
			>MaDr</a
		></span
	>
</div>
<container class="flex flex-col max-w-xs mx-auto mt-10 h-[32rem]">
	<div class="text-center flex flex-col text-[1.2rem] gap-2">
		<h2>Create an account</h2>
		<a href="/api/oauth?provider=github"><Button color="purple">Continue with Github</Button></a>
		<p>or</p>
	</div>
	<form method="post" use:enhance class="flex flex-col gap-4">
		<Label for="username" class="text-[1.2rem]">username</Label>
		<Input id="username" size="lg" name="username" />
		<Label for="password" class="text-[1.2rem]">password</Label>
		<Input type="password" size="lg" id="password" name="password" />
		<Input
			type="submit"
			size="md"
			class="text-center font-medium focus:ring-4 focus:outline-none inline-flex items-center justify-center px-5 py-2.5 text-sm text-white bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 rounded-lg w-[40%] mx-auto hover:cursor-pointer"
			value="Continue"
		/>
	</form>
	<div class="flex flex-col text-center gap-2 mt-2">
		<span class="text-[1.2rem]">Already signed up?</span>
		{#if form?.message}
			<p class="error">{form.message || ''}</p>
		{/if}
		<a href="/login"
			><button
				class="border border-black px-2 py-1 rounded-lg text-[1rem] hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-white"
				>Sign in</button
			></a
		>
	</div>
</container>
