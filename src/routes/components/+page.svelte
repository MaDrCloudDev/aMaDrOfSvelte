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
							<div class="flex items-center justify-between rounded-md border p-3">
								<div>
									<p class="text-sm font-medium">Marketing Emails</p>
									<p class="text-xs text-muted-foreground">Receive announcements and tips.</p>
								</div>
								<Switch bind:checked={marketingEmails} />
							</div>
							<div class="space-y-2">
								<Label for="plan-demo">Billing Plan</Label>
								<Select bind:value={billingPlan} type="single">
									<SelectTrigger id="plan-demo">{planLabels[billingPlan]}</SelectTrigger>
									<SelectContent>
										<SelectItem value="starter">Starter</SelectItem>
										<SelectItem value="pro">Pro</SelectItem>
										<SelectItem value="enterprise">Enterprise</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div class="space-y-2">
								<Label for="priority-demo">Incident Priority</Label>
								<Select bind:value={priority} type="single">
									<SelectTrigger id="priority-demo">{priorityLabels[priority]}</SelectTrigger>
									<SelectContent>
										<SelectItem value="normal">Normal</SelectItem>
										<SelectItem value="high">High</SelectItem>
										<SelectItem value="critical">Critical</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</CardContent>
					</Card>
				</div>
			</TabsContent>

			<TabsContent value="feedback" class="space-y-6">
				<div class="grid gap-6 lg:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Status Badges</CardTitle>
							<CardDescription>
								Compact labels for resource state and workflow metadata.
							</CardDescription>
						</CardHeader>
						<CardContent class="space-y-4">
							<div class="flex flex-wrap gap-2">
								<Badge>Active</Badge>
								<Badge variant="secondary">Pending</Badge>
								<Badge variant="outline">Draft</Badge>
								<Badge variant="destructive">Failed</Badge>
							</div>
							<Separator />
							<p class="text-sm text-muted-foreground">
								Current settings: {planLabels[billingPlan]} plan, {priorityLabels[priority]} priority,
								updates {notificationsEnabled ? 'enabled' : 'disabled'}.
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
						</div>
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	</div>
</div>
