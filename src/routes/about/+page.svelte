<script lang="ts">
	import { Button } from '$lib/components/ui/button';
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
		<!-- Hero Section -->
		<div class="mb-12 space-y-4 text-center">
			<h1 class="text-4xl font-bold text-foreground">About aMaDrOfSvelte</h1>
			<p class="mx-auto max-w-2xl text-xl text-muted-foreground">
				The auth starter I wish I had when I started building web apps, and my current preffered
				stack.
			</p>
		</div>

		<!-- Tech Stack -->
		<Card class="mb-8">
			<CardHeader>
				<CardTitle>Technology Stack</CardTitle>
				<CardDescription>
					I picked the tools I actually enjoy using for building lean, serverless applications.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					<div class="space-y-3">
						<h3 class="flex items-center gap-2 font-semibold">🚀 Frontend</h3>
						<div class="flex flex-wrap gap-2">
							<Badge>SvelteKit 5</Badge>
							<Badge>Svelte 5</Badge>
							<Badge>TypeScript</Badge>
							<Badge>Vite</Badge>
						</div>
					</div>

					<div class="space-y-3">
						<h3 class="flex items-center gap-2 font-semibold">🎨 Styling</h3>
						<div class="flex flex-wrap gap-2">
							<Badge>Tailwind CSS 4</Badge>
							<Badge>shadcn-svelte</Badge>
							<Badge>CSS Variables</Badge>
							<Badge>Dark Mode</Badge>
						</div>
					</div>

					<div class="space-y-3">
						<h3 class="flex items-center gap-2 font-semibold">🗄️ Backend</h3>
						<div class="flex flex-wrap gap-2">
							<Badge>Drizzle ORM</Badge>
							<Badge>Turso Database</Badge>
							<Badge>Sessions</Badge>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>

		<!-- Features -->
		<div class="mb-8 grid gap-6 md:grid-cols-2">
			<Card>
				<CardHeader>
					<CardTitle>🔐 Authentication Features</CardTitle>
				</CardHeader>
				<CardContent class="space-y-3">
					<ul class="space-y-2 text-muted-foreground">
						<li>• Sign up and login with email</li>
						<li>• Sessions that don't randomly expire</li>
						<li>• Routes that actually stay protected</li>
					</ul>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>🎯 Developer Experience</CardTitle>
				</CardHeader>
				<CardContent class="space-y-3">
					<ul class="space-y-2 text-muted-foreground">
						<li>• Database queries that won't break at runtime</li>
						<li>• Hot reload that doesn't lose your state</li>
						<li>• Reusable Components</li>
						<li>• Design that adapts to any screen</li>
						<li>• UI that works with screen readers</li>
					</ul>
				</CardContent>
			</Card>
		</div>

		<!-- Architecture -->
		<Card class="mb-8">
			<CardHeader>
				<CardTitle>Architecture Overview</CardTitle>
				<CardDescription>How the different parts of aMaDrOfSvelte work together</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="space-y-6">
					<div class="grid gap-4 md:grid-cols-3">
						<div class="space-y-2 text-center">
							<div class="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-primary">
								<span class="text-2xl">🌐</span>
							</div>
							<h3 class="font-semibold">Frontend</h3>
							<p class="text-sm text-muted-foreground">
								SvelteKit does the heavy lifting for routing and rendering
							</p>
						</div>

						<div class="space-y-2 text-center">
							<div class="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-primary">
								<span class="text-2xl">⚡</span>
							</div>
							<h3 class="font-semibold">API Layer</h3>
							<p class="text-sm text-muted-foreground">
								Server hooks keep track of who's logged in and what they can do
							</p>
						</div>

						<div class="space-y-2 text-center">
							<div class="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-primary">
								<span class="text-2xl">🗄️</span>
							</div>
							<h3 class="font-semibold">Database</h3>
							<p class="text-sm text-muted-foreground">
								Turso makes SQLite fast everywhere, no matter where your users are
							</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	</div>
</div>
