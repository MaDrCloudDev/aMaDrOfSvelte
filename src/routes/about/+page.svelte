<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
</script>

<div class="min-h-screen bg-background">
	<div class="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
		<div class="mb-10 space-y-3 text-center">
			<h1 class="text-4xl font-bold text-foreground">About aMaDrOfSvelte</h1>
			<p class="mx-auto max-w-3xl text-lg text-muted-foreground">
				A full-stack starter centered on SvelteKit 2 + Svelte 5 runes, Better Auth, Drizzle,
				Turso/libSQL, Tailwind CSS 4, and shadcn-svelte.
			</p>
		</div>

		<div class="grid gap-6 lg:grid-cols-2">
			<Card>
				<CardHeader>
					<CardTitle>Stack by Layer</CardTitle>
					<CardDescription>Concrete tools used in this template.</CardDescription>
				</CardHeader>
				<CardContent class="space-y-5">
					<div class="space-y-2">
						<p class="text-sm font-medium">Framework</p>
						<div class="flex flex-wrap gap-2">
							<Badge>SvelteKit 2</Badge>
							<Badge>Svelte 5 Runes</Badge>
							<Badge>TypeScript</Badge>
						</div>
					</div>
					<div class="space-y-2">
						<p class="text-sm font-medium">Auth</p>
						<div class="flex flex-wrap gap-2">
							<Badge>Better Auth</Badge>
							<Badge>GitHub OAuth</Badge>
							<Badge>Cookie Sessions</Badge>
						</div>
					</div>
					<div class="space-y-2">
						<p class="text-sm font-medium">Data</p>
						<div class="flex flex-wrap gap-2">
							<Badge>Drizzle ORM</Badge>
							<Badge>Turso / libSQL</Badge>
							<Badge>SQLite Schema</Badge>
						</div>
					</div>
					<div class="space-y-2">
						<p class="text-sm font-medium">UI and Delivery</p>
						<div class="flex flex-wrap gap-2">
							<Badge>shadcn-svelte</Badge>
							<Badge>Tailwind CSS 4</Badge>
							<Badge>Vite PWA</Badge>
							<Badge>Vercel Adapter</Badge>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>What This Template Solves</CardTitle>
					<CardDescription>Baseline architecture already wired and testable.</CardDescription>
				</CardHeader>
				<CardContent class="space-y-3 text-sm text-muted-foreground">
					<p>
						1. Auth flow: sign-in, callback handling, server-side session hydration, protected
						routes.
					</p>
					<p>2. Data layer: schema file, drizzle config, migration folder, and typed db client.</p>
					<p>
						3. UI layer: reusable component primitives with consistent design tokens and dark mode.
					</p>
					<p>4. Delivery: build-ready config, PWA registration, and deployment adapter setup.</p>
					<Separator />
					<p>
						You should still tailor schema tables, page copy, auth providers, and product-specific
						routes to your domain.
					</p>
				</CardContent>
			</Card>
		</div>

		<Card class="mt-6">
			<CardHeader>
				<CardTitle>Request Lifecycle in This Repo</CardTitle>
				<CardDescription>How a typical authenticated request flows through the app.</CardDescription
				>
			</CardHeader>
			<CardContent>
				<div class="grid gap-4 md:grid-cols-4">
					<div class="rounded-md border p-4">
						<p class="text-sm font-medium">1. Route hit</p>
						<p class="mt-1 text-sm text-muted-foreground">
							SvelteKit route or endpoint receives the request.
						</p>
					</div>
					<div class="rounded-md border p-4">
						<p class="text-sm font-medium">2. Session lookup</p>
						<p class="mt-1 text-sm text-muted-foreground">
							`hooks.server.ts` resolves Better Auth session into `locals`.
						</p>
					</div>
					<div class="rounded-md border p-4">
						<p class="text-sm font-medium">3. Data/query</p>
						<p class="mt-1 text-sm text-muted-foreground">
							Server load/action uses Drizzle + Turso with typed schema.
						</p>
					</div>
					<div class="rounded-md border p-4">
						<p class="text-sm font-medium">4. UI response</p>
						<p class="mt-1 text-sm text-muted-foreground">
							Svelte components render with shared UI primitives and tokens.
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	</div>
</div>
