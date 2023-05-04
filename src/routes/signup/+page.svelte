<script lang="ts">
	import { enhance } from '$app/forms';

	// export let form: { message?: string };
	export let form;
</script>

<div class="mt-[18rem]">
	<section class="text-center">
		<h2>Create an account</h2>
		<a href="/api/oauth?provider=github">Continue with Github</a>
		<p class="">or</p>
	</section>
	<form method="post" use:enhance>
		<label for="username">username</label><br />
		<input id="username" name="username" class="border border-black" /><br />
		<label for="password">password</label><br />
		<input type="password" id="password" name="password" class="border border-black" /><br />
		<div class="text-center">
			<input type="submit" value="Continue" class="" />
		</div>
	</form>
	<div class="text-center">
		{#if form?.message}
			<p class="error">{form.message || ''}</p>
		{/if}
		<a href="/login" class="link">Sign in</a>
	</div>
</div>
