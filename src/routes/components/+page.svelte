<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Alert, AlertDescription } from '$lib/components/ui/alert';
	import { Separator } from '$lib/components/ui/separator';

	let inputValue = $state('');
	let emailValue = $state('');
</script>

<div class="min-h-screen bg-background">
	<div class="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="mb-8 space-y-4">
			<h1 class="text-4xl font-bold text-foreground">Component Showcase</h1>
			<p class="text-xl text-muted-foreground">
				A few example UI components. Install more from <a
					class="underline"
					aria-label="Install more components from shadcn-svelte"
					target="_blank"
					href="https://shadcn-svelte.com/">shadcn-svelte</a
				>
			</p>
		</div>

		<!-- Component Sections -->
		<div class="space-y-8">
			<!-- Buttons Section -->
			<Card>
				<CardHeader>
					<CardTitle>Buttons</CardTitle>
					<CardDescription
						>Buttons for every occasion. They all work exactly like you'd expect.</CardDescription
					>
				</CardHeader>
				<CardContent class="space-y-6">
					<div class="space-y-4">
						<div>
							<h4 class="mb-3 text-sm font-medium">Button Variants</h4>
							<div class="flex flex-wrap gap-2">
								<Button>Default</Button>
								<Button variant="secondary">Secondary</Button>
								<Button variant="outline">Outline</Button>
								<Button variant="ghost">Ghost</Button>
								<Button variant="link">Link</Button>
								<Button variant="destructive">Destructive</Button>
							</div>
						</div>
						<Separator />
						<div>
							<h4 class="mb-3 text-sm font-medium">Button Sizes</h4>
							<div class="flex flex-wrap items-center gap-2">
								<Button size="sm">Small</Button>
								<Button size="default">Default</Button>
								<Button size="lg">Large</Button>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<!-- Form Inputs Section -->
			<Card>
				<CardHeader>
					<CardTitle>Form Components</CardTitle>
					<CardDescription
						>Forms that don't make users want to throw their computer out the window.</CardDescription
					>
				</CardHeader>
				<CardContent class="space-y-4">
					<div class="grid gap-4 md:grid-cols-2">
						<div class="space-y-2">
							<Label for="email-demo">Email Address</Label>
							<Input
								id="email-demo"
								type="email"
								placeholder="Enter your email"
								bind:value={emailValue}
							/>
							<p class="text-xs text-muted-foreground">
								Current value: {emailValue || 'Empty'}
							</p>
						</div>
						<div class="space-y-2">
							<Label for="text-demo">Text Input</Label>
							<Input
								id="text-demo"
								type="text"
								placeholder="Enter some text"
								bind:value={inputValue}
							/>
							<p class="text-xs text-muted-foreground">
								Current value: {inputValue || 'Empty'}
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			<!-- Cards Section -->
			<Card>
				<CardHeader>
					<CardTitle>Card Components</CardTitle>
					<CardDescription
						>Cards for grouping related stuff together. Pretty straightforward.</CardDescription
					>
				</CardHeader>
				<CardContent>
					<div class="grid gap-4 md:grid-cols-2">
						<Card class="border-2">
							<CardHeader>
								<CardTitle class="text-lg">Sample Card</CardTitle>
								<CardDescription>Look, a card inside a card. Cardception.</CardDescription>
							</CardHeader>
							<CardContent>
								<p class="mb-4 text-muted-foreground">
									Cards are perfect for organizing related information into digestible sections.
								</p>
								<Button size="sm">Action Button</Button>
							</CardContent>
						</Card>

						<Card class="border-2">
							<CardHeader>
								<CardTitle class="text-lg">Another Card</CardTitle>
								<CardDescription>Cards can hold whatever you want</CardDescription>
							</CardHeader>
							<CardContent>
								<div class="space-y-2">
									<div class="flex justify-between">
										<span class="text-sm">Progress</span>
										<span class="text-sm font-medium">75%</span>
									</div>
									<div class="h-2 w-full rounded-full bg-secondary">
										<div class="h-2 rounded-full bg-primary" style="width: 75%"></div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</CardContent>
			</Card>

			<!-- Alerts Section -->
			<Card>
				<CardHeader>
					<CardTitle>Alert Components</CardTitle>
					<CardDescription
						>When you need to tell users something important (or not so important).</CardDescription
					>
				</CardHeader>
				<CardContent class="space-y-4">
					<Alert>
						<AlertDescription>
							This is a default alert. It provides helpful information or context.
						</AlertDescription>
					</Alert>

					<Alert variant="destructive">
						<AlertDescription>
							This is a destructive alert. It indicates an error or warning state.
						</AlertDescription>
					</Alert>

					<Alert class="border-green-500 text-green-700 dark:text-green-400">
						<AlertDescription>
							This is a success alert with custom styling for positive feedback.
						</AlertDescription>
					</Alert>

					<Alert class="border-yellow-500 text-yellow-700 dark:text-yellow-400">
						<AlertDescription>
							This is a warning alert to draw attention to important information.
						</AlertDescription>
					</Alert>
				</CardContent>
			</Card>

			<!-- Layout Section -->
			<Card>
				<CardHeader>
					<CardTitle>Layout Components</CardTitle>
					<CardDescription>Lines that separate things. Revolutionary, I know.</CardDescription>
				</CardHeader>
				<CardContent class="space-y-6">
					<div class="space-y-4">
						<div>
							<h4 class="mb-3 text-sm font-medium">Horizontal Separator</h4>
							<p class="text-muted-foreground">Content above separator</p>
							<Separator class="my-4" />
							<p class="text-muted-foreground">Content below separator</p>
						</div>

						<div>
							<h4 class="mb-3 text-sm font-medium">Vertical Separator</h4>
							<div class="flex items-center space-x-4">
								<span class="text-muted-foreground">Left content</span>
								<Separator orientation="vertical" class="h-4" />
								<span class="text-muted-foreground">Right content</span>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<!-- Grid Layout Example -->
			<Card>
				<CardHeader>
					<CardTitle>Responsive Grid Layout</CardTitle>
					<CardDescription>Grids that actually work on mobile. What a concept.</CardDescription>
				</CardHeader>
				<CardContent>
					<div class="grid gap-4 md:grid-cols-3">
						<div class="rounded-lg border-2 border-dashed border-border p-6 text-center">
							<h3 class="mb-2 font-semibold">Column 1</h3>
							<p class="text-sm text-muted-foreground">Responsive grid item</p>
						</div>
						<div class="rounded-lg border-2 border-dashed border-border p-6 text-center">
							<h3 class="mb-2 font-semibold">Column 2</h3>
							<p class="text-sm text-muted-foreground">Responsive grid item</p>
						</div>
						<div class="rounded-lg border-2 border-dashed border-border p-6 text-center">
							<h3 class="mb-2 font-semibold">Column 3</h3>
							<p class="text-sm text-muted-foreground">Responsive grid item</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	</div>
</div>
