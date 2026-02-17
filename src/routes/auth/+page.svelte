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
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let authLoading = $state(false);
	let authError = $state('');

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
			console.error('Sign in error:', error);
			authError = 'Failed to sign in. Please try again.';
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

			{#if data.error || authError}
				<Alert variant="destructive">
					<AlertDescription>{authError || data.error}</AlertDescription>
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
							<svg class="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
									fill="none"
								></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
								></path>
							</svg>
							Processing...
						{:else}
							<svg class="mr-2 h-4 w-4" viewBox="0 0 24 24">
								<path
									fill="currentColor"
									d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
								/>
							</svg>
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
