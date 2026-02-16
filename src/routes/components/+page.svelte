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
	import { Switch } from '$lib/components/ui/switch';
	import { Select, SelectContent, SelectItem, SelectTrigger } from '$lib/components/ui/select';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Badge } from '$lib/components/ui/badge';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import { SHADCN_SVELTE_URL } from '$lib/constants';

	const planLabels = {
		starter: 'Starter',
		pro: 'Pro',
		enterprise: 'Enterprise'
	} as const;

	const priorityLabels = {
		normal: 'Normal',
		high: 'High',
		critical: 'Critical'
	} as const;

	let nameValue = $state('Ada Lovelace');
	let emailValue = $state('ada@example.com');
	let bioValue = $state(
		'Building production SvelteKit apps with auth, typed data, and reusable UI.'
	);
	let notificationsEnabled = $state(true);
	let marketingEmails = $state(false);
	let billingPlan = $state<keyof typeof planLabels>('pro');
	let priority = $state<keyof typeof priorityLabels>('normal');
</script>

<div class="min-h-screen bg-background">
	<div class="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
		<div class="mb-8 space-y-3">
			<h1 class="text-4xl font-bold text-foreground">Component Playground</h1>
			<p class="max-w-3xl text-lg text-muted-foreground">
				Focused examples of shadcn-svelte components in realistic UI patterns. Add more components
				from
				<a
					class="underline"
					aria-label="Install more components from shadcn-svelte"
					target="_blank"
					href={SHADCN_SVELTE_URL}>shadcn-svelte</a
				>.
			</p>
		</div>

		<Tabs value="forms" class="space-y-6">
			<TabsList class="grid w-full grid-cols-3 md:max-w-xl">
				<TabsTrigger value="forms">Forms</TabsTrigger>
				<TabsTrigger value="feedback">Feedback</TabsTrigger>
				<TabsTrigger value="layout">Layout</TabsTrigger>
			</TabsList>

			<TabsContent value="forms" class="space-y-6">
				<div class="grid gap-6 lg:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Profile Form</CardTitle>
							<CardDescription>
								Inputs, labels, textarea, and action buttons in a common account settings flow.
							</CardDescription>
						</CardHeader>
						<CardContent class="space-y-4">
							<div class="space-y-2">
								<Label for="name-demo">Name</Label>
								<Input id="name-demo" type="text" bind:value={nameValue} />
							</div>
							<div class="space-y-2">
								<Label for="email-demo">Email</Label>
								<Input id="email-demo" type="email" bind:value={emailValue} />
							</div>
							<div class="space-y-2">
								<Label for="bio-demo">Bio</Label>
								<Textarea id="bio-demo" bind:value={bioValue} class="min-h-[110px]" />
							</div>
							<Separator />
							<div class="flex flex-wrap gap-2">
								<Button size="sm">Save Changes</Button>
								<Button size="sm" variant="outline">Cancel</Button>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Preferences</CardTitle>
							<CardDescription>
								Switches and selects for feature flags, plans, and priority controls.
							</CardDescription>
						</CardHeader>
						<CardContent class="space-y-5">
							<div class="flex items-center justify-between rounded-md border p-3">
								<div>
									<p class="text-sm font-medium">Product Updates</p>
									<p class="text-xs text-muted-foreground">
										Enable release and changelog notifications.
									</p>
								</div>
								<Switch bind:checked={notificationsEnabled} />
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Form Components</CardTitle>
					<CardDescription>Input fields and form controls.</CardDescription>
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
						<div class="space-y-2">
							<Label for="textarea-demo">Textarea</Label>
							<Textarea
								id="textarea-demo"
								placeholder="Enter a longer message..."
								bind:value={textareaValue}
								class="min-h-[100px]"
							/>
							<p class="text-xs text-muted-foreground">
								Current value: {textareaValue || 'Empty'}
							</p>
						</div>
						<div class="space-y-2">
							<Label for="select-demo">Select Option</Label>
							<Select bind:value={selectedOption} type="multiple">
								<SelectTrigger id="select-demo">
									<SelectTrigger placeholder="Select an option" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="option1">Option 1</SelectItem>
									<SelectItem value="option2">Option 2</SelectItem>
									<SelectItem value="option3">Option 3</SelectItem>
								</SelectContent>
							</Select>
							<p class="text-xs text-muted-foreground">
								Selected: {selectedOption}
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Alert States</CardTitle>
							<CardDescription>
								Informational, warning, and destructive messaging patterns.
							</CardDescription>
						</CardHeader>
						<CardContent class="space-y-3">
							<Alert>
								<AlertDescription>
									Deployment completed and cache invalidation succeeded.
								</AlertDescription>
							</Alert>
							<Alert class="border-yellow-500 text-yellow-700 dark:text-yellow-400">
								<AlertDescription>
									Token expires soon. Rotate secrets before next release window.
								</AlertDescription>
							</Alert>
							<Alert variant="destructive">
								<AlertDescription>
									Database auth failed. Verify `DATABASE_AUTH_TOKEN` and network access.
								</AlertDescription>
							</Alert>
						</CardContent>
					</Card>
				</div>
			</TabsContent>

			<TabsContent value="layout" class="space-y-6">
				<Card>
					<CardHeader>
						<CardTitle>Card + Separator Composition</CardTitle>
						<CardDescription>
							A common dashboard block with grouped actions and metric cards.
						</CardDescription>
					</CardHeader>
					<CardContent class="space-y-6">
						<div class="flex flex-wrap items-center gap-3">
							<Button size="sm">Primary Action</Button>
							<Button size="sm" variant="secondary">Secondary Action</Button>
							<Separator orientation="vertical" class="h-5" />
							<Button size="sm" variant="outline">Open Logs</Button>
						</div>
						<Separator />
						<div class="grid gap-4 md:grid-cols-3">
							<Card>
								<CardHeader>
									<CardTitle class="text-base">Requests</CardTitle>
								</CardHeader>
								<CardContent>
									<p class="text-2xl font-semibold">12,480</p>
									<p class="text-xs text-muted-foreground">Last 24 hours</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle class="text-base">Error Rate</CardTitle>
								</CardHeader>
								<CardContent>
									<p class="text-2xl font-semibold">0.14%</p>
									<p class="text-xs text-muted-foreground">Stable</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle class="text-base">Latency P95</CardTitle>
								</CardHeader>
								<CardContent>
									<p class="text-2xl font-semibold">184ms</p>
									<p class="text-xs text-muted-foreground">Edge region average</p>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Card Components</CardTitle>
					<CardDescription>Content containers with headers and actions.</CardDescription>
				</CardHeader>
				<CardContent>
					<div class="grid gap-4 md:grid-cols-2">
						<Card class="border-2">
							<CardHeader>
								<CardTitle class="text-lg">Sample Card</CardTitle>
								<CardDescription>Example card with content and actions.</CardDescription>
							</CardHeader>
							<CardContent>
								<p class="mb-4 text-muted-foreground">
									Cards organize related information into sections.
								</p>
								<Button size="sm">Action Button</Button>
							</CardContent>
						</Card>
						<Card class="border-2">
							<CardHeader>
								<CardTitle class="text-lg">Another Card</CardTitle>
								<CardDescription>Cards support various content types.</CardDescription>
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
			<Card>
				<CardHeader>
					<CardTitle>Alert Components</CardTitle>
					<CardDescription>Status messages and notifications.</CardDescription>
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
			<Card>
				<CardHeader>
					<CardTitle>Layout Components</CardTitle>
					<CardDescription>Visual separators and dividers.</CardDescription>
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
			<Card>
				<CardHeader>
					<CardTitle>Responsive Grid Layout</CardTitle>
					<CardDescription>Mobile-first grid system.</CardDescription>
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
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	</div>
</div>
