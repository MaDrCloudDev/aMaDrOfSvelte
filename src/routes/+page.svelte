<script lang="ts">
	import { handleGitHubSignIn } from '#lib/auth-utils.ts';
	import GitHubIcon from '#lib/components/icons/GitHubIcon.svelte';
	import SpinnerIcon from '#lib/components/icons/SpinnerIcon.svelte';
	import { Button } from '#lib/components/ui/button/index.ts';
	import * as Card from '#lib/components/ui/card/index.ts';
	import { APP_NAME, GITHUB_REPO_URL, ROUTES } from '#lib/constants.ts';

	let loading = $state(false);

	async function signIn() {
		loading = true;
		await handleGitHubSignIn();
		loading = false;
	}

	const features = [
		{
			title: 'Authentication',
			body: 'Better Auth with GitHub OAuth, cookie sessions, and server-side route guards.'
		},
		{
			title: 'Database',
			body: 'Drizzle ORM on libSQL: a local SQLite file in dev, Turso in production. Same code.'
		},
		{
			title: 'UI kit',
			body: 'shadcn-svelte on Tailwind CSS 4 with light/dark themes and no flash on load.'
		},
		{
			title: 'SvelteKit 3',
			body: 'Svelte 5 runes, validated env vars in src/env.ts, and #lib subpath imports.'
		},
		{
			title: 'Offline-ready',
			body: 'A native SvelteKit service worker precaches the app shell, plus an install prompt.'
		},
		{
			title: 'Tooling',
			body: 'Bun, TypeScript 6, Vitest, ESLint, Prettier, and a CI workflow that runs them all.'
		}
	];
</script>

<svelte:head>
	<title>{APP_NAME}: a full-stack SvelteKit starter</title>
</svelte:head>

<section class="container mx-auto space-y-8 px-4 pt-16 pb-12 text-center sm:px-6 lg:px-8">
	<img src="/madr-logo.png" alt="" class="mx-auto size-20 rounded-2xl object-contain" />
	<div class="space-y-4">
		<h1 class="text-4xl font-bold tracking-tight sm:text-6xl">{APP_NAME}</h1>
		<p class="mx-auto max-w-2xl text-xl text-muted-foreground">
			A small, decisive full-stack SvelteKit starter. Auth, database and UI already work together,
			so you start on your actual idea.
		</p>
	</div>
	<div class="flex flex-col justify-center gap-3 sm:flex-row">
		<Button size="lg" onclick={signIn} disabled={loading} aria-busy={loading}>
			{#if loading}
				<SpinnerIcon class="size-4 animate-spin" />
				Redirecting…
			{:else}
				<GitHubIcon class="size-4" />
				Try the demo sign-in
			{/if}
		</Button>
		<Button size="lg" variant="outline" href={ROUTES.COMPONENTS}>Browse components</Button>
		<Button size="lg" variant="ghost" href={GITHUB_REPO_URL} target="_blank" rel="noopener">
			View source
			<span class="sr-only">(opens in a new tab)</span>
		</Button>
	</div>
</section>

<section class="container mx-auto px-4 pb-16 sm:px-6 lg:px-8">
	<h2 class="mb-8 text-center text-3xl font-bold">What's included</h2>
	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each features as feature (feature.title)}
			<Card.Root>
				<Card.Header>
					<Card.Title>{feature.title}</Card.Title>
					<Card.Description>{feature.body}</Card.Description>
				</Card.Header>
			</Card.Root>
		{/each}
	</div>
</section>
