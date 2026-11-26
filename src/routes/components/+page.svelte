<script lang="ts">
	import { Button } from '#lib/components/ui/button/index.ts';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '#lib/components/ui/card/index.ts';
	import { Input } from '#lib/components/ui/input/index.ts';
	import { Label } from '#lib/components/ui/label/index.ts';
	import { Alert, AlertDescription } from '#lib/components/ui/alert/index.ts';
	import { Separator } from '#lib/components/ui/separator/index.ts';
	import { Switch } from '#lib/components/ui/switch/index.ts';
	import {
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger
	} from '#lib/components/ui/select/index.ts';
	import { Textarea } from '#lib/components/ui/textarea/index.ts';
	import { Badge } from '#lib/components/ui/badge/index.ts';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '#lib/components/ui/tabs/index.ts';
	import * as Dialog from '#lib/components/ui/dialog/index.ts';
	import { toast } from 'svelte-sonner';
	import { APP_NAME, SHADCN_SVELTE_URL } from '#lib/constants.ts';

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
	let dialogOpen = $state(false);

	function saveProfile() {
		dialogOpen = false;
		toast.success('Profile saved', {
			description: `${nameValue} · ${planLabels[billingPlan]} plan`
		});
	}
</script>

<svelte:head>
	<title>Components · {APP_NAME}</title>
</svelte:head>

<div>
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
					rel="external noopener"
					href={SHADCN_SVELTE_URL}
				>
					shadcn-svelte
				</a>.
			</p>
		</div>

		<Tabs value="forms" class="space-y-6">
			<TabsList class="grid w-full grid-cols-4 md:max-w-xl">
				<TabsTrigger value="forms">Forms</TabsTrigger>
				<TabsTrigger value="feedback">Feedback</TabsTrigger>
				<TabsTrigger value="layout">Layout</TabsTrigger>
				<TabsTrigger value="overlays">Overlays</TabsTrigger>
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
									<p id="updates-label" class="text-sm font-medium">Product Updates</p>
									<p class="text-xs text-muted-foreground">
										Enable release and changelog notifications.
									</p>
								</div>
								<Switch bind:checked={notificationsEnabled} aria-labelledby="updates-label" />
							</div>
							<div class="flex items-center justify-between rounded-md border p-3">
								<div>
									<p id="marketing-label" class="text-sm font-medium">Marketing Emails</p>
									<p class="text-xs text-muted-foreground">
										Allow occasional product and event announcements.
									</p>
								</div>
								<Switch bind:checked={marketingEmails} aria-labelledby="marketing-label" />
							</div>

							<div class="space-y-2">
								<Label for="plan-demo">Billing Plan</Label>
								<Select bind:value={billingPlan} type="single">
									<SelectTrigger id="plan-demo" class="w-full">
										{planLabels[billingPlan]}
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="starter">Starter</SelectItem>
										<SelectItem value="pro">Pro</SelectItem>
										<SelectItem value="enterprise">Enterprise</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div class="space-y-2">
								<Label for="priority-demo">Support Priority</Label>
								<Select bind:value={priority} type="single">
									<SelectTrigger id="priority-demo" class="w-full">
										{priorityLabels[priority]}
									</SelectTrigger>
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
								Use badges for concise state labeling in cards, lists, and tables.
							</CardDescription>
						</CardHeader>
						<CardContent class="space-y-4">
							<div class="flex flex-wrap gap-2">
								<Badge>Active</Badge>
								<Badge variant="secondary">Queued</Badge>
								<Badge variant="outline">Draft</Badge>
								<Badge class="bg-green-700 text-white hover:bg-green-700">Healthy</Badge>
								<Badge variant="destructive">Failed</Badge>
							</div>
							<p class="text-sm text-muted-foreground">
								Current profile plan: <strong>{planLabels[billingPlan]}</strong>
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
			<TabsContent value="overlays" class="space-y-6">
				<div class="grid gap-6 lg:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Dialog</CardTitle>
							<CardDescription>
								Accessible modal with focus trapping, Escape to close, and a confirm action.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Dialog.Root bind:open={dialogOpen}>
								<Dialog.Trigger>
									{#snippet child({ props })}
										<Button {...props}>Review profile</Button>
									{/snippet}
								</Dialog.Trigger>
								<Dialog.Content>
									<Dialog.Header>
										<Dialog.Title>Save profile?</Dialog.Title>
										<Dialog.Description>
											Values come from the Forms tab, so edit them there and reopen this.
										</Dialog.Description>
									</Dialog.Header>
									<dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
										<dt class="text-muted-foreground">Name</dt>
										<dd>{nameValue}</dd>
										<dt class="text-muted-foreground">Email</dt>
										<dd>{emailValue}</dd>
										<dt class="text-muted-foreground">Plan</dt>
										<dd>{planLabels[billingPlan]}</dd>
									</dl>
									<Dialog.Footer>
										<Button variant="outline" onclick={() => (dialogOpen = false)}>Cancel</Button>
										<Button onclick={saveProfile}>Save</Button>
									</Dialog.Footer>
								</Dialog.Content>
							</Dialog.Root>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Toasts</CardTitle>
							<CardDescription>
								Sonner notifications, used by the app's sign-in and sign-out flows.
							</CardDescription>
						</CardHeader>
						<CardContent class="flex flex-wrap gap-2">
							<Button variant="outline" onclick={() => toast('Changes queued')}>Default</Button>
							<Button variant="outline" onclick={() => toast.success('Deployed to production')}>
								Success
							</Button>
							<Button variant="outline" onclick={() => toast.error('Build failed')}>Error</Button>
							<Button
								variant="outline"
								onclick={() =>
									toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
										loading: 'Running migrations…',
										success: 'Migrations applied',
										error: 'Migration failed'
									})}
							>
								Promise
							</Button>
						</CardContent>
					</Card>
				</div>
			</TabsContent>
		</Tabs>
	</div>
</div>
