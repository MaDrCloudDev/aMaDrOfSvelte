<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { handleGitHubSignIn } from '$lib/auth-utils';

	let authLoading = $state(false);

	async function handleSignInClick() {
		if (authLoading) return;
		authLoading = true;
		try {
			await handleGitHubSignIn();
		} catch (error) {
			console.error('Sign in error:', error);
		} finally {
			authLoading = false;
		}
	}
</script>

<div class="min-h-screen bg-background">
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
					SvelteKit template with auth, database, UI components, and PWA support.
				</p>
			</div>
			<div class="flex flex-col justify-center gap-4 sm:flex-row">
				<Button onclick={handleSignInClick} disabled={authLoading}>
					{#if authLoading}
						<SpinnerIcon class="mr-2 h-4 w-4 animate-spin" />
						Processing...
					{:else}
						Sign in with GitHub
						<GitHubIcon class="h-4 w-4" />
					{/if}
				</Button>
			</div>
		</div>
	</div>
	<div class="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
		<div class="mb-12 space-y-4 text-center">
			<h2 class="text-3xl font-bold">What's included</h2>
		</div>
		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			<Card>
				<CardHeader>
					<CardTitle>Authentication</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription>
						GitHub OAuth with Better Auth. Session management and route protection.
					</CardDescription>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>UI Components</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription>shadcn-svelte components with Tailwind CSS 4.</CardDescription>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Database</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription>Turso SQLite with Drizzle ORM for type-safe queries.</CardDescription>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>SvelteKit</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription>Full-stack framework with Svelte 5 runes.</CardDescription>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>TypeScript</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription>End-to-end type safety with hot reload.</CardDescription>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>PWA Ready</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription
						>Install as native app with offline caching and service worker.</CardDescription
					>
				</CardContent>
			</Card>
		</div>
	</div>
</div>
