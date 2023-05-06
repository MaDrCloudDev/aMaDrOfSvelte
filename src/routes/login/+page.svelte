<script lang="ts">
	import { enhance } from '$app/forms';
	import { Label, Input } from 'flowbite-svelte';
	import { Button } from 'flowbite-svelte';

	// export let form: { message?: string };
	export let form;
</script>

<h2>Sign in</h2>
<a href="/api/oauth?provider=github"><Button color="dark">Continue with Github</Button></a>
<p>or</p>
<form method="post" use:enhance>
	<Label for="username">username</Label>
	<Input id="username" name="username" />
	<Label for="password">password</Label>
	<Input type="password" id="password" name="password" />
	<Input type="submit" value="Continue" />
</form>
{#if form?.message}
	<p class="error">{form.message || ''}</p>
{/if}
<a href="/signup"><Button color="dark">Create a new account</Button></a>
