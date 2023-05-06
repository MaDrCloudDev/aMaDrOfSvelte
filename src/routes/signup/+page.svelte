<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { Label, Input } from 'flowbite-svelte';
	// export let form: { message?: string };
	export let form;
</script>

<container class="w-fit mx-auto">
	<!-- component -->
	<div class="text-center grid gap-2">
		<h2>Create an account</h2>
		<a href="/api/oauth?provider=github"><Button color="dark">Continue with Github</Button></a>
		<p class="">or</p>
	</div>
	<form method="post" use:enhance class="grid gap-2">
		<Label for="username">username</Label>
		<Input id="username" name="username" />
		<Label for="password">password</Label>
		<Input type="password" id="password" name="password" />
		<Input type="submit" value="Continue" class="cursor-pointer hover:bg-gray-100" />
	</form>
	<div class="text-center m-2">
		{#if form?.message}
			<p class="error">{form.message || ''}</p>
		{/if}
		<a href="/login"><Button color="dark">Sign in</Button></a>
	</div>
	<!-- component -->
</container>
