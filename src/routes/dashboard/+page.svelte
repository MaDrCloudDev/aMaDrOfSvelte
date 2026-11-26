<script lang="ts">
	import { Badge } from '#lib/components/ui/badge/index.ts';
	import * as Card from '#lib/components/ui/card/index.ts';
	import { APP_NAME } from '#lib/constants.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const dateFormat = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' });
	const dateTimeFormat = new Intl.DateTimeFormat(undefined, {
		dateStyle: 'medium',
		timeStyle: 'short'
	});

	const stats = $derived([
		{ label: 'Registered users', value: data.stats.users, hint: 'Rows in the user table' },
		{
			label: 'Active sessions',
			value: data.stats.activeSessions,
			hint: 'Unexpired sessions, all users'
		},
		{
			label: 'Linked providers',
			value: data.stats.providers.length,
			hint: data.stats.providers.join(', ') || 'None'
		},
		{
			label: 'Member since',
			value: dateFormat.format(data.user.createdAt),
			hint: data.user.emailVerified ? 'Email verified' : 'Email not verified'
		}
	]);

	function describeAgent(userAgent: string | null): string {
		if (!userAgent) return 'Unknown device';
		const browser = /(Firefox|Edg|Chrome|Safari)\/[\d.]+/.exec(userAgent)?.[1] ?? 'Browser';
		const os = /(Windows|Mac OS X|Android|iPhone|Linux)/.exec(userAgent)?.[1] ?? 'unknown OS';
		return `${browser === 'Edg' ? 'Edge' : browser} on ${os.replace('Mac OS X', 'macOS')}`;
	}
</script>

<svelte:head>
	<title>Dashboard · {APP_NAME}</title>
</svelte:head>

<div class="container mx-auto space-y-6 px-4 py-8 sm:px-6 lg:px-8">
	<div class="flex items-center gap-4">
		{#if data.user.image}
			<img src={data.user.image} alt="" class="size-14 rounded-full border" />
		{/if}
		<div>
			<h1 class="text-2xl font-bold tracking-tight">Welcome, {data.user.name}</h1>
			<p class="text-muted-foreground">{data.user.email}</p>
		</div>
	</div>

	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each stats as stat (stat.label)}
			<Card.Root>
				<Card.Header class="pb-2">
					<Card.Description>{stat.label}</Card.Description>
					<Card.Title class="text-2xl">{stat.value}</Card.Title>
				</Card.Header>
				<Card.Content>
					<p class="text-xs text-muted-foreground">{stat.hint}</p>
				</Card.Content>
			</Card.Root>
		{/each}
	</div>

	<Card.Root>
		<Card.Header>
			<Card.Title>Your recent sessions</Card.Title>
			<Card.Description>
				Loaded in <code>+page.server.ts</code> with a typed Drizzle query. Every value here comes from
				the database.
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<ul class="divide-y">
				{#each data.recentSessions as s (s.id)}
					<li class="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
						<div class="flex items-center gap-2">
							<span class="font-medium">{describeAgent(s.userAgent)}</span>
							{#if s.id === data.currentSessionId}
								<Badge variant="secondary">This device</Badge>
							{/if}
						</div>
						<span class="text-muted-foreground">
							Signed in {dateTimeFormat.format(s.createdAt)} · expires
							{dateFormat.format(s.expiresAt)}
						</span>
					</li>
				{/each}
			</ul>
		</Card.Content>
	</Card.Root>
</div>
