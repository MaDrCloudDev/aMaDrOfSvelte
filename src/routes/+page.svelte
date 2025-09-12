<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
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
				<a href="/auth?mode=signup">
					<Button size="lg" class="w-full sm:w-auto">Get Started</Button>
				</a>
				<a href="/auth?mode=signin">
					<Button variant="outline" size="lg" class="w-full sm:w-auto">Sign In</Button>
				</a>
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

	<!-- CTA Section -->
	<div class="border-t">
		<div class="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
			<div class="space-y-6 text-center">
				<h2 class="text-3xl font-bold">Let's build something cool</h2>
				<p class="mx-auto max-w-xl text-muted-foreground">
					Sign in with GitHub and see how everything works, or just clone the repo and start
					hacking.
				</p>
				<div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
					<Button size="lg" href="/auth?mode=signup">Get Started</Button>
					<Button
						size="lg"
						variant="outline"
						href="https://github.com/madrclouddev/amadrofsvelte"
						target="_blank"
					>
						View on GitHub
					</Button>
				</div>
			</div>
		</div>
	</div>
</div>
