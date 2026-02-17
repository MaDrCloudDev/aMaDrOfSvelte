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
			<p class="mx-auto max-w-3xl text-xl text-muted-foreground">
				A production-oriented SvelteKit starter built around Better Auth, Turso, Drizzle, Tailwind
				4, and shadcn-svelte.
			</p>
		</div>

		<Card class="mb-8">
			<CardHeader>
				<CardTitle>Stack at a Glance</CardTitle>
				<CardDescription>
					Everything here reflects the actual repo setup, not placeholder boilerplate.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
					<div class="space-y-3">
						<h3 class="font-semibold">Framework</h3>
						<div class="flex flex-wrap gap-2">
							<Badge>SvelteKit 2</Badge>
							<Badge>Svelte 5 runes</Badge>
							<Badge>TypeScript</Badge>
						</div>
					</div>
					<div class="space-y-3">
						<h3 class="font-semibold">Auth</h3>
						<div class="flex flex-wrap gap-2">
							<Badge>Better Auth</Badge>
							<Badge>GitHub OAuth</Badge>
							<Badge>Session cookies</Badge>
						</div>
					</div>
					<div class="space-y-3">
						<h3 class="font-semibold">Data</h3>
						<div class="flex flex-wrap gap-2">
							<Badge>Turso / libSQL</Badge>
							<Badge>Drizzle ORM</Badge>
							<Badge>SQL migrations</Badge>
						</div>
					</div>
					<div class="space-y-3">
						<h3 class="font-semibold">UI + Delivery</h3>
						<div class="flex flex-wrap gap-2">
							<Badge>Tailwind CSS 4</Badge>
							<Badge>shadcn-svelte</Badge>
							<Badge>Vite PWA</Badge>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>

		<div class="grid gap-6 md:grid-cols-2">
			<Card>
				<CardHeader>
					<CardTitle>Auth + Routing Model</CardTitle>
				</CardHeader>
				<CardContent class="space-y-3 text-muted-foreground">
					<p>`hooks.server.ts` hydrates `locals.user` and `locals.session` on every request.</p>
					<p>
						Protected pages use server `load` functions (for example
						`src/routes/dashboard/+page.server.ts`) to redirect unauthenticated users.
					</p>
					<p>
						Client auth actions are centralized in `src/lib/auth-utils.ts` so button handlers stay
						small and consistent.
					</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Data + UI Model</CardTitle>
				</CardHeader>
				<CardContent class="space-y-3 text-muted-foreground">
					<p>
						Database access is typed through Drizzle (`src/lib/server/db/**`) against a Turso/libSQL
						database.
					</p>
					<p>
						UI primitives live in `src/lib/components/ui/**` with app-level composition in
						`src/lib/components/**`.
					</p>
					<p>
						Theme state, toasts, and PWA wiring are already integrated so new features can focus on
						product logic.
					</p>
				</CardContent>
			</Card>
		</div>

		<Card class="mt-8">
			<CardHeader>
				<CardTitle>Request Lifecycle in This Repo</CardTitle>
				<CardDescription
					>Typical path from browser request to typed data and rendered UI.</CardDescription
				>
			</CardHeader>
			<CardContent class="space-y-4 text-muted-foreground">
				<p>
					<strong>1.</strong> Request hits SvelteKit and `hooks.server.ts` resolves session state.
				</p>
				<Separator />
				<p>
					<strong>2.</strong> Server load/actions enforce auth and fetch typed data through Drizzle.
				</p>
				<Separator />
				<p>
					<strong>3.</strong> Route components render using shadcn-svelte primitives + Tailwind 4 tokens.
				</p>
				<Separator />
				<p>
					<strong>4.</strong> Client interactions call shared auth helpers and refresh state via navigation/invalidation.
				</p>
			</CardContent>
		</Card>
	</div>
</div>
