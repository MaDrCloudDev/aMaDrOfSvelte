<script lang="ts">
	import { LayoutDashboard, LogOut, Menu, User as UserIcon, X } from '@lucide/svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { handleGitHubSignIn, handleSignOut } from '#lib/auth-utils.ts';
	import { Button } from '#lib/components/ui/button/index.ts';
	import * as DropdownMenu from '#lib/components/ui/dropdown-menu/index.ts';
	import { APP_NAME, GITHUB_REPO_URL, ROUTES } from '#lib/constants.ts';
	import type { User } from '#lib/server/auth.ts';
	import { cn } from '#lib/utils.ts';
	import DarkModeToggle from './DarkModeToggle.svelte';
	import GitHubIcon from './icons/GitHubIcon.svelte';
	import SpinnerIcon from './icons/SpinnerIcon.svelte';

	let { user = null }: { user?: User | null } = $props();

	const navLinks = $derived([
		user ? { href: ROUTES.DASHBOARD, label: 'Dashboard' } : { href: ROUTES.HOME, label: 'Home' },
		{ href: ROUTES.COMPONENTS, label: 'Components' },
		{ href: ROUTES.ABOUT, label: 'About' }
	]);

	let mobileMenuOpen = $state(false);
	let authLoading = $state(false);
	let navElement: HTMLElement | undefined = $state();
	let menuButton: HTMLElement | null = $state(null);

	afterNavigate(() => (mobileMenuOpen = false));

	const isActive = (href: string) => page.url.pathname === href;

	async function runAuthAction() {
		if (authLoading) return;
		authLoading = true;
		mobileMenuOpen = false;
		try {
			await (user ? handleSignOut() : handleGitHubSignIn());
		} finally {
			authLoading = false;
		}
	}

	function onWindowClick(event: MouseEvent) {
		if (mobileMenuOpen && navElement && !navElement.contains(event.target as Node)) {
			mobileMenuOpen = false;
		}
	}

	function onWindowKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && mobileMenuOpen) {
			mobileMenuOpen = false;
			menuButton?.focus();
		}
	}
</script>

<svelte:window onclick={onWindowClick} onkeydown={onWindowKeydown} />

{#snippet signInLabel()}
	{#if authLoading}
		<SpinnerIcon class="size-4 animate-spin" />
		Redirecting…
	{:else}
		<GitHubIcon class="size-4" />
		Sign in with GitHub
	{/if}
{/snippet}

<nav
	bind:this={navElement}
	class="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60"
	aria-label="Main navigation"
>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="relative flex h-16 items-center justify-between">
			<a href={resolve(user ? ROUTES.DASHBOARD : ROUTES.HOME)} class="flex items-center gap-3">
				<img src="/madr-logo.png" alt="" class="size-8 rounded-lg object-contain" />
				<span class="font-semibold text-foreground">{APP_NAME}</span>
			</a>
			<div class="absolute inset-y-0 left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex">
				{#each navLinks as link (link.href)}
					<a
						href={resolve(link.href)}
						aria-current={isActive(link.href) ? 'page' : undefined}
						class={cn(
							'text-sm font-medium transition-colors hover:text-primary',
							isActive(link.href) ? 'text-primary' : 'text-muted-foreground'
						)}
					>
						{link.label}
					</a>
				{/each}
			</div>

			<div class="hidden items-center gap-3 md:flex">
				<DarkModeToggle />
				<Button variant="outline" size="sm" href={GITHUB_REPO_URL} target="_blank" rel="noopener">
					<GitHubIcon class="size-4" />
					Repo
					<span class="sr-only">(opens in a new tab)</span>
				</Button>

				{#if user}
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							{#snippet child({ props })}
								<Button variant="outline" size="sm" class="max-w-72" {...props}>
									<UserIcon class="size-4" />
									<span class="truncate">{user.email}</span>
								</Button>
							{/snippet}
						</DropdownMenu.Trigger>
						<DropdownMenu.Content class="w-56" align="end">
							<DropdownMenu.Label>
								<div class="flex flex-col gap-1">
									<p class="text-sm leading-none font-medium">{user.name}</p>
									<p class="text-xs leading-none text-muted-foreground">{user.email}</p>
								</div>
							</DropdownMenu.Label>
							<DropdownMenu.Separator />
							<DropdownMenu.Item onSelect={() => goto(resolve(ROUTES.DASHBOARD))}>
								<LayoutDashboard class="size-4" />
								Dashboard
							</DropdownMenu.Item>
							<DropdownMenu.Separator />
							<DropdownMenu.Item onSelect={runAuthAction} disabled={authLoading}>
								<LogOut class="size-4" />
								{authLoading ? 'Signing out…' : 'Sign out'}
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				{:else}
					<Button size="sm" onclick={runAuthAction} disabled={authLoading}>
						{@render signInLabel()}
					</Button>
				{/if}
			</div>

			<div class="flex items-center gap-2 md:hidden">
				<DarkModeToggle />
				<Button
					bind:ref={menuButton}
					variant="outline"
					size="icon"
					onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
					aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
					aria-expanded={mobileMenuOpen}
					aria-controls="mobile-menu"
				>
					{#if mobileMenuOpen}<X class="size-4" />{:else}<Menu class="size-4" />{/if}
				</Button>
			</div>
		</div>

		{#if mobileMenuOpen}
			<div
				id="mobile-menu"
				class="space-y-1 border-t pt-2 pb-4 md:hidden"
				role="region"
				aria-label="Site menu"
			>
				{#if user}
					<div class="mb-2 flex items-center gap-3 border-b px-3 pb-3">
						<div class="flex size-8 items-center justify-center rounded-full bg-primary/10">
							<UserIcon class="size-4 text-primary" />
						</div>
						<div class="min-w-0">
							<p class="truncate text-sm font-medium">{user.name}</p>
							<p class="truncate text-xs text-muted-foreground">{user.email}</p>
						</div>
					</div>
				{/if}

				{#each navLinks as link (link.href)}
					<a
						href={resolve(link.href)}
						aria-current={isActive(link.href) ? 'page' : undefined}
						class={cn(
							'block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
							isActive(link.href) ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
						)}
					>
						{link.label}
					</a>
				{/each}

				<div class="grid gap-2 border-t pt-3">
					<Button variant="outline" size="sm" href={GITHUB_REPO_URL} target="_blank" rel="noopener">
						<GitHubIcon class="size-4" />
						Repo
						<span class="sr-only">(opens in a new tab)</span>
					</Button>
					{#if user}
						<Button variant="outline" size="sm" onclick={runAuthAction} disabled={authLoading}>
							<LogOut class="size-4" />
							{authLoading ? 'Signing out…' : 'Sign out'}
						</Button>
					{:else}
						<Button size="sm" onclick={runAuthAction} disabled={authLoading}>
							{@render signInLabel()}
						</Button>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</nav>
