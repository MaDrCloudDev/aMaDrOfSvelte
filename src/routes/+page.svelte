<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { signIn } from '$lib/auth-client';

	// Add loading state
	let authLoading = $state(false);

	async function handleGitHubSignIn() {
		if (authLoading) return; // Prevent multiple clicks
		authLoading = true; // Start loading
		try {
			await signIn.social({
				provider: 'github',
				callbackURL: '/dashboard' // Add callbackURL to match navbar behavior
			});
		} catch (error) {
			console.error('Sign in error:', error);
			authLoading = false; // Reset loading state on error
		}
	}
</script>

<div class="min-h-screen bg-background">
	<!-- Hero Section -->
	<div class="container mx-auto px-4 pt-8 pb-16 sm:px-6 lg:px-8">
		<div class="space-y-8 text-center">
			<div class="space-y-6">
				<div class="flex justify-center">
					<img
						src="/madr-logo.png"
						alt="aMaDrOfSvelte Logo"
						class="h-20 w-20 rounded-2xl object-contain"
					/>
				</div>
				<h1 class="text-4xl font-bold tracking-tight sm:text-6xl">aMaDrOfSvelte</h1>
				<p class="mx-auto max-w-2xl text-xl text-muted-foreground">
					Because nobody wants to build auth from scratch again. SvelteKit 5, Tailwind 4, and all
					the good stuff you actually want to use.
				</p>
			</div>

			<div class="flex flex-col justify-center gap-4 sm:flex-row">
				<Button onclick={handleGitHubSignIn} disabled={authLoading}>
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
						Sign in with
						<svg class="ml-2 h-4 w-4" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
							/>
						</svg>
					{/if}
				</Button>
			</div>
		</div>
	</div>

	<!-- Features Section -->
	<div class="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
		<div class="mb-12 space-y-4 text-center">
			<h2 class="text-3xl font-bold">Skip the boring stuff</h2>
			<p class="mx-auto max-w-2xl text-muted-foreground">
				I got tired of setting up the same auth flow over and over, so I built this. Now you don't
				have to.
			</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			<Card>
				<CardHeader>
					<CardTitle class="flex items-center gap-2">🔐 Secure Authentication</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription>
						GitHub OAuth authentication, secure session handling, and route protection. The security
						stuff that actually matters.
					</CardDescription>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle class="flex items-center gap-2">🎨 Modern UI</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription>
						shadcn-svelte components that don't suck, plus Tailwind 4 for when you need to customize
						things.
					</CardDescription>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle class="flex items-center gap-2">🚀 Fast Database</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription>
						Turso is stupid fast and Drizzle keeps your queries type-safe. No more "undefined is not
						a function" surprises.
					</CardDescription>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle class="flex items-center gap-2">⚡ SvelteKit 5</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription>
						SvelteKit 5 with runes because the new reactivity system is actually pretty sweet.
					</CardDescription>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle class="flex items-center gap-2">🛠️ Developer Experience</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription>
						TypeScript everywhere, hot reload that actually works, and tooling that doesn't fight
						you.
					</CardDescription>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle class="flex items-center gap-2">📱 Responsive Design</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription>
						Looks good on phones, tablets, and those weird ultrawide monitors your coworker has.
					</CardDescription>
				</CardContent>
			</Card>
		</div>
	</div>
</div>
