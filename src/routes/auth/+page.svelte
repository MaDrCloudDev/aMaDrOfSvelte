<script lang="ts">
	import { resolve } from '$app/paths';
	import { handleGitHubSignIn } from '#lib/auth-utils.ts';
	import GitHubIcon from '#lib/components/icons/GitHubIcon.svelte';
	import SpinnerIcon from '#lib/components/icons/SpinnerIcon.svelte';
	import { Alert, AlertDescription } from '#lib/components/ui/alert/index.ts';
	import { Button } from '#lib/components/ui/button/index.ts';
	import * as Card from '#lib/components/ui/card/index.ts';
	import { APP_NAME, ROUTES } from '#lib/constants.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let loading = $state(false);

	async function signIn() {
		loading = true;
		await handleGitHubSignIn();
		loading = false;
	}
</script>

<svelte:head>
	<title>Sign in · {APP_NAME}</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center px-4">
	<div class="w-full max-w-md space-y-8 text-center">
		<a href={resolve(ROUTES.HOME)} class="inline-block">
			<img src="/madr-logo.png" alt="{APP_NAME} home" class="size-20 rounded-2xl object-contain" />
		</a>
		<div class="space-y-2">
			<h1 class="text-3xl font-bold tracking-tight">Welcome back</h1>
			<p class="text-muted-foreground">Sign in to continue to {APP_NAME}.</p>
		</div>

		{#if data.error}
			<Alert variant="destructive" class="text-left" role="alert">
				<AlertDescription>{data.error}</AlertDescription>
			</Alert>
		{/if}

		<Card.Root>
			<Card.Header>
				<Card.Title>Sign in</Card.Title>
				<Card.Description>New here? Signing in creates your account.</Card.Description>
			</Card.Header>
			<Card.Content>
				<Button onclick={signIn} disabled={loading} aria-busy={loading} class="w-full">
					{#if loading}
						<SpinnerIcon class="size-4 animate-spin" />
						Redirecting to GitHub…
					{:else}
						<GitHubIcon class="size-4" />
						Continue with GitHub
					{/if}
				</Button>
			</Card.Content>
		</Card.Root>
	</div>
</div>
