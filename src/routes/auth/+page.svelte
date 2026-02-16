<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Alert, AlertDescription } from '$lib/components/ui/alert';
	import { signIn } from '$lib/auth-client';
	import GitHubIcon from '$lib/components/icons/GitHubIcon.svelte';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let authLoading = $state(false);
	let authError = $state(data.error || '');

	async function handleGitHubSignIn() {
		if (authLoading) return;
		authLoading = true;
		authError = '';

		try {
			await signIn.social({
				provider: 'github',
				callbackURL: '/dashboard'
			});
		} catch (error) {
			authError = 'Failed to sign in. Please try again.';
		} finally {
			authLoading = false;
		}
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-background">
	<div class="container mx-auto max-w-md px-4 py-8 sm:px-6 lg:px-8">
		<div class="space-y-8 text-center">
			<div class="space-y-6">
				<div class="flex justify-center">
					<img
						src="/madr-logo.png"
						alt="aMaDrOfSvelte Logo"
						class="h-20 w-20 rounded-2xl object-contain"
					/>
				</div>
				<h1 class="text-3xl font-bold tracking-tight">Welcome Back</h1>
				<p class="text-muted-foreground">Sign in to your account to continue</p>
			</div>

			{#if data.message}
				<Alert>
					<AlertDescription>{data.message}</AlertDescription>
				</Alert>
			{/if}

			{#if authError}
				<Alert variant="destructive">
					<AlertDescription>{authError}</AlertDescription>
				</Alert>
			{/if}

			<Card>
				<CardHeader>
					<CardTitle>Sign In</CardTitle>
					<CardDescription>Use your GitHub account to sign in</CardDescription>
				</CardHeader>
				<CardContent>
					<Button onclick={handleGitHubSignIn} disabled={authLoading} class="w-full">
						{#if authLoading}
							<SpinnerIcon class="mr-2 h-4 w-4 animate-spin" />
							Processing...
						{:else}
							<GitHubIcon class="mr-2 h-4 w-4" />
							Sign in with GitHub
						{/if}
					</Button>
				</CardContent>
			</Card>

			<p class="text-sm text-muted-foreground">
				Don't have an account? Signing in with GitHub will create one for you.
			</p>
		</div>
	</div>
</div>
