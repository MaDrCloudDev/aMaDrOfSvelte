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
</script>

<div class="min-h-screen bg-background">
	<div class="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
		<div class="mb-12 space-y-4 text-center">
			<h1 class="text-4xl font-bold text-foreground">About aMaDrOfSvelte</h1>
			<p class="mx-auto max-w-2xl text-xl text-muted-foreground">
				Modern stack for rapid development.
			</p>
		</div>
		<Card class="mb-8">
			<CardHeader>
				<CardTitle>Technology Stack</CardTitle>
				<CardDescription>
					Production-ready tools for building scalable web applications.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					<div class="space-y-3">
						<h3 class="flex items-center gap-2 font-semibold">Frontend</h3>
						<div class="mx-auto flex flex-wrap gap-2">
							<Badge>SvelteKit</Badge>
							<Badge>Svelte 5</Badge>
							<Badge>TypeScript</Badge>
							<Badge>Vite</Badge>
						</div>
					</div>
					<div class="space-y-3">
						<h3 class="flex items-center gap-2 font-semibold">Styling</h3>
						<div class="flex flex-wrap gap-2">
							<Badge>Tailwind CSS 4</Badge>
							<Badge>shadcn-svelte</Badge>
							<Badge>CSS Variables</Badge>
							<Badge>Dark Mode</Badge>
						</div>
					</div>
					<div class="space-y-3">
						<h3 class="flex items-center gap-2 font-semibold">Backend</h3>
						<div class="flex flex-wrap gap-2">
							<Badge>Drizzle ORM</Badge>
							<Badge>Turso Database</Badge>
							<Badge>Better Auth</Badge>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
		<div class="mb-8 grid gap-6 md:grid-cols-2">
			<Card>
				<CardHeader>
					<CardTitle>Authentication</CardTitle>
				</CardHeader>
				<CardContent class="space-y-3">
					<ul class="space-y-2 text-muted-foreground">
						<li>• GitHub OAuth integration</li>
						<li>• Persistent session management</li>
						<li>• Protected route middleware</li>
					</ul>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Developer Experience</CardTitle>
				</CardHeader>
				<CardContent class="space-y-3">
					<ul class="space-y-2 text-muted-foreground">
						<li>• Type-safe database queries</li>
						<li>• Hot module replacement</li>
						<li>• Component-based architecture</li>
						<li>• Responsive design system</li>
						<li>• Accessibility built-in</li>
					</ul>
				</CardContent>
			</Card>
		</div>
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
								SvelteKit handles routing, rendering, and server-side functionality
							</p>
						</div>
						<div class="space-y-2 text-center">
							<div class="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-primary">
								<span class="text-2xl">⚡</span>
							</div>
							<h3 class="font-semibold">API Layer</h3>
							<p class="text-sm text-muted-foreground">
								Server hooks manage authentication and authorization
							</p>
						</div>
						<div class="space-y-2 text-center">
							<div class="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-primary">
								<span class="text-2xl">🗄️</span>
							</div>
							<h3 class="font-semibold">Database</h3>
							<p class="text-sm text-muted-foreground">
								Turso provides edge SQLite with global distribution
							</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	</div>
</div>
