<script lang="ts">
	import { enhance } from '$app/forms';

	// export let form: { message?: string };
	export let form;
</script>

<div class="mt-[16rem]">
	<section class="text-center flex flex-col gap-1 w-fit mx-auto">
		<h2>Sign in</h2>
		<a
			href="/api/oauth?provider=github"
			class="border border-black px-2 py-1 hover:text-white hover:bg-black">Continue with Github</a
		>
		<p class="center">or</p>
	</section>
	<section class="flex justify-center">
		<form method="post" use:enhance>
			<label for="username">username</label><br />
			<input id="username" name="username" class="border border-black" /><br />
			<label for="password">password</label><br />
			<input type="password" id="password" name="password" class="border border-black" /><br />
			<div class="text-center">
				<input
					type="submit"
					value="Continue"
					class="border border-black px-2 py-1 mt-2 mb-1 cursor-pointer hover:text-white hover:bg-black"
				/>
			</div>
		</form>
	</section>
	<section class="text-center">
		{#if form?.message}
			<p class="error">{form.message || ''}</p>
		{/if}
		<a href="/signup" class="hover:text-[#328eef]">Create a new account</a>
	</section>
</div>
