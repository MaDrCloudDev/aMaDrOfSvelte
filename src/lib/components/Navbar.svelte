<script lang="ts">
	import { page } from '$app/state';
	import { Menu, X, User as UserIcon, LogOut } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { ROUTES } from '$lib/constants';
	import {
		handleSignOut,
		handleGitHubSignIn,
		navigateToProfile,
		openGitHubRepo
	} from '$lib/auth-utils';
	import { cn } from '$lib/utils';
	import type { User } from '$lib/server/auth';
	import DarkModeToggle from './DarkModeToggle.svelte';
	import GitHubIcon from './icons/GitHubIcon.svelte';
	import SpinnerIcon from './icons/SpinnerIcon.svelte';

	type NavLink = {
		href: string;
		label: string;
	};

	const publicNavLinks: NavLink[] = [
		{ href: ROUTES.HOME, label: 'Home' },
		{ href: ROUTES.COMPONENTS, label: 'Components' },
		{ href: ROUTES.ABOUT, label: 'About' }
	];

	const privateNavLinks: NavLink[] = [
		{ href: ROUTES.COMPONENTS, label: 'Components' },
		{ href: ROUTES.ABOUT, label: 'About' }
	];

	let {
		user = null
	}: {
		user?: User | null;
	} = $props();

	let mobileMenuOpen = $state(false);
	let authLoading = $state(false);
	let navElement: HTMLElement | undefined;

	const navLinks = $derived(user ? privateNavLinks : publicNavLinks);

	function isActiveRoute(route: string): boolean {
		return page.url.pathname === route;
	}

	function desktopNavClass(route: string): string {
		return cn(
			'text-sm font-medium transition-colors hover:text-primary',
			isActiveRoute(route) ? 'text-primary' : 'text-muted-foreground'
		);
	}

	function mobileNavClass(route: string): string {
		return cn(
			'block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
			isActiveRoute(route) ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
		);
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
		if (mobileMenuOpen) {
			setTimeout(() => {
				const firstItem = navElement?.querySelector(
					'#mobile-menu a, #mobile-menu button'
				) as HTMLElement;
				if (firstItem) {
					firstItem.focus();
				}
			}, 0);
		}
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	async function handleAuthAction() {
		if (authLoading) return;
		authLoading = true;

		try {
			if (user) {
				await handleSignOut();
			} else {
				await handleGitHubSignIn();
			}
		} finally {
			authLoading = false;
		}
	}

	function handleClickOutside(event: MouseEvent): void {
		if (mobileMenuOpen && navElement && !navElement.contains(event.target as Node)) {
			closeMobileMenu();
		}
	}

	function handleKeydown(event: KeyboardEvent): void {
		if (event.key === 'Escape' && mobileMenuOpen) {
			closeMobileMenu();
			return;
		}

		if (!(mobileMenuOpen && event.key === 'Tab')) {
			return;
		}

		const focusableElements = navElement?.querySelectorAll(
			'#mobile-menu a, #mobile-menu button'
		) as NodeListOf<HTMLElement> | undefined;

		if (!focusableElements || focusableElements.length === 0) {
			return;
		}

		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		if (event.shiftKey && document.activeElement === firstElement) {
			event.preventDefault();
			lastElement.focus();
		} else if (!event.shiftKey && document.activeElement === lastElement) {
			event.preventDefault();
			firstElement.focus();
		}
	}
</script>

<svelte:window onclick={handleClickOutside} onkeydown={handleKeydown} />

<nav
	bind:this={navElement}
	class="fixed top-0 right-0 left-0 z-50 border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
	aria-label="Main navigation"
>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="relative flex h-16 items-center justify-between">
			<div class="flex items-center space-x-4">
				<a href={ROUTES.HOME} class="flex items-center space-x-3">
					<img
						src="/madr-logo.png"
						alt="aMaDrOfSvelte Logo"
						class="h-8 w-8 rounded-lg object-contain"
					/>
					<span class="font-semibold text-foreground">aMaDrOfSvelte</span>
				</a>
			</div>

			<div
				class="pointer-events-none absolute inset-y-0 left-1/2 hidden -translate-x-1/2 md:flex md:items-center"
			>
				<div class="pointer-events-auto flex items-center gap-6">
					{#each navLinks as link (link.href)}
						<a href={link.href} class={desktopNavClass(link.href)}>
							{link.label}
						</a>
					{/each}
				</div>
			</div>

			<div class="hidden items-center space-x-3 md:flex">
				<DarkModeToggle />
				<button
					onclick={openGitHubRepo}
					class="flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-3 text-sm hover:bg-accent hover:text-accent-foreground"
					title="View on GitHub"
					aria-label="View project on GitHub"
				>
					<GitHubIcon class="h-4 w-4" />
					Repo
				</button>

				{#if user}
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							{#snippet child({ props })}
								<Button
									variant="outline"
									size="sm"
									class="h-9 max-w-[18rem] cursor-pointer gap-2"
									{...props}
								>
									<UserIcon class="h-4 w-4" />
									<span class="truncate">{user.email}</span>
								</Button>
							{/snippet}
						</DropdownMenu.Trigger>
						<DropdownMenu.Content class="w-56" align="end">
							<DropdownMenu.Label>
								<div class="flex flex-col space-y-1">
									<p class="text-sm leading-none font-medium">{user.name || 'User'}</p>
									<p class="text-xs leading-none text-muted-foreground">{user.email}</p>
								</div>
							</DropdownMenu.Label>
							<DropdownMenu.Separator />
							<DropdownMenu.Item onclick={navigateToProfile}>
								<UserIcon class="mr-2 h-4 w-4" />
								<span>Dashboard</span>
							</DropdownMenu.Item>
							<DropdownMenu.Item onclick={openGitHubRepo}>
								<GitHubIcon class="mr-2 h-4 w-4" />
								<span>GitHub</span>
							</DropdownMenu.Item>
							<DropdownMenu.Separator />
							<DropdownMenu.Item onclick={handleAuthAction} disabled={authLoading}>
								{#if authLoading}
									<SpinnerIcon class="mr-2 h-4 w-4 animate-spin" />
									<span>Signing out...</span>
								{:else}
									<LogOut class="mr-2 h-4 w-4" />
									<span>Log out</span>
								{/if}
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				{:else}
					<Button
						variant="outline"
						size="sm"
						class="h-9 cursor-pointer"
						onclick={handleAuthAction}
						disabled={authLoading}
					>
						{#if authLoading}
							<SpinnerIcon class="mr-2 h-4 w-4 animate-spin" />
							Processing...
						{:else}
							Sign in with GitHub
							<GitHubIcon class="h-4 w-4" />
						{/if}
					</Button>
				{/if}
			</div>

			<div class="flex items-center space-x-3 md:hidden">
				<button
					onclick={toggleMobileMenu}
					class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
					aria-label={mobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
					aria-expanded={mobileMenuOpen}
					aria-controls="mobile-menu"
				>
					{#if mobileMenuOpen}
						<X class="h-4 w-4" />
					{:else}
						<Menu class="h-4 w-4" />
					{/if}
				</button>
			</div>
		</div>

		{#if mobileMenuOpen}
			<div
				id="mobile-menu"
				class="border-t bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 md:hidden"
				role="menu"
				aria-label="Mobile navigation menu"
			>
				<div class="space-y-1 px-4 pt-2 pb-3">
					{#if user}
						<div class="mb-3 border-b pb-3">
							<div class="flex items-center gap-3">
								<div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
									<UserIcon class="h-4 w-4 text-primary" />
								</div>
								<div>
									<p class="text-sm font-medium text-foreground">{user.name || 'User'}</p>
									<p class="text-xs text-muted-foreground">{user.email}</p>
								</div>
							</div>
						</div>
					{/if}

					{#each navLinks as link (link.href)}
						<a href={link.href} onclick={closeMobileMenu} class={mobileNavClass(link.href)}>
							{link.label}
						</a>
					{/each}

					<div class="space-y-2 border-t pt-3">
						<div class="flex justify-center py-2">
							<DarkModeToggle />
						</div>

						<button
							onclick={() => {
								closeMobileMenu();
								openGitHubRepo();
							}}
							class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
						>
							<GitHubIcon class="h-4 w-4" />
							Repo
						</button>

						{#if user}
							<Button
								variant="outline"
								size="sm"
								class="w-full cursor-pointer"
								onclick={() => {
									closeMobileMenu();
									navigateToProfile();
								}}
							>
								<UserIcon class="mr-2 h-4 w-4" />
								Dashboard
							</Button>
							<Button
								variant="outline"
								size="sm"
								class="w-full cursor-pointer"
								disabled={authLoading}
								onclick={() => {
									closeMobileMenu();
									handleAuthAction();
								}}
							>
								{#if authLoading}
									<SpinnerIcon class="mr-2 h-4 w-4 animate-spin" />
									Signing out...
								{:else}
									<LogOut class="mr-2 h-4 w-4" />
									Log out
								{/if}
							</Button>
						{:else}
							<Button
								variant="outline"
								size="sm"
								class="w-full cursor-pointer"
								disabled={authLoading}
								onclick={() => {
									closeMobileMenu();
									handleAuthAction();
								}}
							>
								{#if authLoading}
									<SpinnerIcon class="mr-2 h-4 w-4 animate-spin" />
									Processing...
								{:else}
									Sign in with GitHub
									<GitHubIcon class="h-4 w-4" />
								{/if}
							</Button>
						{/if}
					</div>
				</div>
			</div>
		{/if}
	</div>
</nav>

<div class="h-16"></div>
