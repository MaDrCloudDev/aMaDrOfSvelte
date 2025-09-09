<script lang="ts">
	import type { PageData } from './$types';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';

	let { data }: { data: PageData } = $props();
</script>

<div class="min-h-screen bg-background">
	<!-- Main Content -->
	<main class="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
		<div class="grid gap-6">
			<!-- Welcome Card -->
			<Card>
				<CardHeader>
					<CardTitle>Welcome to your Dashboard!</CardTitle>
					<CardDescription>
						You are successfully logged in as {data.user.email}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p class="text-muted-foreground">
						This is a template dashboard. You can start building your application from here.
					</p>
				</CardContent>
			</Card>

			<!-- Stats Grid -->
			<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle class="text-sm font-medium">Total Users</CardTitle>
					</CardHeader>
					<CardContent>
						<div class="text-2xl font-bold">1</div>
						<p class="text-xs text-muted-foreground">You're the first user!</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle class="text-sm font-medium">Active Sessions</CardTitle>
					</CardHeader>
					<CardContent>
						<div class="text-2xl font-bold">1</div>
						<p class="text-xs text-muted-foreground">Current session</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle class="text-sm font-medium">Database</CardTitle>
					</CardHeader>
					<CardContent>
						<div class="text-2xl font-bold">Turso</div>
						<p class="text-xs text-muted-foreground">Connected & ready</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle class="text-sm font-medium">Framework</CardTitle>
					</CardHeader>
					<CardContent>
						<div class="text-2xl font-bold">SvelteKit</div>
						<p class="text-xs text-muted-foreground">v5 + Tailwind 4</p>
					</CardContent>
				</Card>
			</div>

			<!-- Features Card -->
			<Card>
				<CardHeader>
					<CardTitle>Template Features</CardTitle>
					<CardDescription>
						This template includes the following features out of the box
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div class="grid gap-4 md:grid-cols-2">
						<div class="space-y-2">
							<h4 class="font-medium">Authentication</h4>
							<ul class="space-y-1 text-sm text-muted-foreground">
								<li>• User registration & login</li>
								<li>• Password hashing with Argon2</li>
								<li>• Session management</li>
								<li>• Protected routes</li>
							</ul>
						</div>
						<div class="space-y-2">
							<h4 class="font-medium">Tech Stack</h4>
							<ul class="space-y-1 text-sm text-muted-foreground">
								<li>• SvelteKit 5</li>
								<li>• Tailwind CSS 4</li>
								<li>• shadcn-svelte</li>
								<li>• Drizzle ORM + Turso</li>
							</ul>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	</main>
</div>
