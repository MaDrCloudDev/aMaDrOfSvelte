<script lang="ts">
	import { Badge } from '#lib/components/ui/badge/index.ts';
	import * as Card from '#lib/components/ui/card/index.ts';
	import { APP_NAME, GITHUB_REPO_URL } from '#lib/constants.ts';

	const stack = [
		{ group: 'Framework', items: ['SvelteKit 3', 'Svelte 5 runes', 'TypeScript 6', 'Vite 8'] },
		{ group: 'Auth', items: ['Better Auth', 'GitHub OAuth', 'Cookie sessions'] },
		{ group: 'Data', items: ['Drizzle ORM', 'libSQL / Turso', 'SQL migrations'] },
		{ group: 'UI', items: ['Tailwind CSS 4', 'shadcn-svelte', 'Bits UI', 'mode-watcher'] },
		{ group: 'Tooling', items: ['Bun', 'Vitest 5', 'ESLint', 'Prettier', 'GitHub Actions'] },
		{ group: 'Delivery', items: ['Vercel adapter', 'Service worker', 'Installable PWA'] }
	];

	const lifecycle = [
		{
			file: 'src/env.ts',
			text: 'declares and validates every environment variable when the server starts.'
		},
		{
			file: 'src/hooks.server.ts',
			text: 'serves Better Auth under /api/auth/* and puts the session on event.locals.'
		},
		{
			file: '+page.server.ts',
			text: 'load functions guard routes and query typed data through Drizzle.'
		},
		{
			file: '+page.svelte',
			text: 'components render with shadcn-svelte primitives and Tailwind tokens.'
		},
		{
			file: 'src/service-worker/',
			text: 'precaches the build and static assets so the app shell works offline.'
		}
	];
</script>

<svelte:head>
	<title>About · {APP_NAME}</title>
</svelte:head>

<div class="container mx-auto space-y-8 px-4 py-8 sm:px-6 lg:px-8">
	<div class="space-y-3 text-center">
		<h1 class="text-4xl font-bold">About {APP_NAME}</h1>
		<p class="mx-auto max-w-2xl text-lg text-muted-foreground">
			A small, opinionated full-stack SvelteKit starter. Clone it, set five environment variables,
			and you have GitHub sign-in, a typed database and a component kit working together.
		</p>
	</div>

	<Card.Root>
		<Card.Header>
			<Card.Title>Stack</Card.Title>
			<Card.Description>What's actually installed.</Card.Description>
		</Card.Header>
		<Card.Content class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each stack as { group, items } (group)}
				<div class="space-y-2">
					<h2 class="text-sm font-semibold">{group}</h2>
					<div class="flex flex-wrap gap-2">
						{#each items as item (item)}
							<Badge variant="secondary">{item}</Badge>
						{/each}
					</div>
				</div>
			{/each}
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Header>
			<Card.Title>How a request flows</Card.Title>
			<Card.Description>The files to read first when you extend this starter.</Card.Description>
		</Card.Header>
		<Card.Content>
			<ol class="space-y-3">
				{#each lifecycle as step, i (step.file)}
					<li class="flex gap-3 text-sm">
						<span
							class="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold"
						>
							{i + 1}
						</span>
						<p class="text-muted-foreground">
							<code class="rounded bg-muted px-1.5 py-0.5 text-foreground">{step.file}</code>
							{step.text}
						</p>
					</li>
				{/each}
			</ol>
		</Card.Content>
	</Card.Root>

	<p class="text-center text-sm text-muted-foreground">
		Source, setup guide and license on
		<a class="underline" href={GITHUB_REPO_URL} rel="external">GitHub</a>.
	</p>
</div>
