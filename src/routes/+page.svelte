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
	import GitHubIcon from '$lib/components/icons/GitHubIcon.svelte';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';

	let authLoading = $state(false);

	async function handleSignInClick() {
		if (authLoading) return;
		authLoading = true;
		try {
			await handleGitHubSignIn();
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
					SvelteKit 2 + Svelte 5 starter with Better Auth (GitHub OAuth), Drizzle ORM, Turso
					(libSQL), Tailwind CSS 4, shadcn-svelte, and PWA support.
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
						Better Auth with GitHub OAuth, cookie sessions, and protected route guards.
					</CardDescription>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>UI Components</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription
						>shadcn-svelte primitives styled with Tailwind CSS 4 design tokens.</CardDescription
					>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Database</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription
						>Turso (libSQL) with Drizzle ORM for end-to-end typed queries.</CardDescription
					>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>SvelteKit</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription>Server routes, SSR, and Svelte 5 runes in one project.</CardDescription>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>TypeScript</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription>Strict typing across routes, auth, and database models.</CardDescription>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>PWA Ready</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription
						>Manifest + Workbox service worker with install prompt support.</CardDescription
					>
				</CardContent>
			</Card>
		</div>
	</div>
</div>
