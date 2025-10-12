<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { Menu, X, User as UserIcon, Settings, LogOut, Github } from '@lucide/svelte';
	import DarkModeToggle from './DarkModeToggle.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { ROUTES } from '$lib/constants';
	import {
		handleSignOut,
		handleGitHubSignIn,
		navigateToProfile,
		navigateToSettings,
		openGitHubRepo
	} from '$lib/auth-utils';
	import type { User } from '$lib/server/auth';

	let {
		user = null
	}: {
		user?: User | null;
	} = $props();
	let mobileMenuOpen = $state(false);
	let navElement: HTMLElement;
	let authLoading = $state(false);

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

	function handleClickOutside(event: MouseEvent) {
		if (mobileMenuOpen && navElement && !navElement.contains(event.target as Node)) {
			closeMobileMenu();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && mobileMenuOpen) {
			closeMobileMenu();
		}
		if (mobileMenuOpen && event.key === 'Tab') {
			const focusableElements = navElement?.querySelectorAll(
				'#mobile-menu a, #mobile-menu button'
			) as NodeListOf<HTMLElement>;

			if (focusableElements.length > 0) {
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
		<div class="flex h-16 items-center justify-between">
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
			<div class="hidden items-center space-x-6 md:flex">
				{#if user}
					<a
						href={ROUTES.COMPONENTS}
						class="text-sm font-medium transition-colors hover:text-primary {page.url.pathname ===
						ROUTES.COMPONENTS
							? 'text-primary'
							: 'text-muted-foreground'}"
					>
						Components
					</a>
					<a
						href={ROUTES.ABOUT}
						class="text-sm font-medium transition-colors hover:text-primary {page.url.pathname ===
						ROUTES.ABOUT
							? 'text-primary'
							: 'text-muted-foreground'}"
					>
						About
					</a>
				{:else}
					<a
						href={ROUTES.HOME}
						class="text-sm font-medium transition-colors hover:text-primary {page.url.pathname ===
						ROUTES.HOME
							? 'text-primary'
							: 'text-muted-foreground'}"
					>
						Home
					</a>
					<a
						href={ROUTES.COMPONENTS}
						class="text-sm font-medium transition-colors hover:text-primary {page.url.pathname ===
						ROUTES.COMPONENTS
							? 'text-primary'
							: 'text-muted-foreground'}"
					>
						Components
					</a>
					<a
						href={ROUTES.ABOUT}
						class="text-sm font-medium transition-colors hover:text-primary {page.url.pathname ===
						ROUTES.ABOUT
							? 'text-primary'
							: 'text-muted-foreground'}"
					>
						About
					</a>
				{/if}
			</div>
			<div class="flex items-center space-x-3 md:hidden">
				<button
					onclick={toggleMobileMenu}
					class="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
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
			<div class="hidden items-center space-x-3 md:flex">
				<DarkModeToggle />
				<button
					onclick={openGitHubRepo}
					class="flex h-9 items-center justify-center gap-2 rounded-md border border-input bg-background px-2 text-sm hover:bg-accent hover:text-accent-foreground"
					title="View on GitHub"
					aria-label="View project on GitHub"
				>
					<svg
						class="h-4 w-4"
						fill="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.230.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
						/>
					</svg>
					Repo
				</button>
				{#if user}
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							{#snippet child({ props })}
								<Button variant="outline" size="sm" class="h-9 gap-2" {...props}>
									<UserIcon class="h-4 w-4" />
									<span class="hidden sm:inline-block">{user.email}</span>
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
							<DropdownMenu.Group>
								<DropdownMenu.Item onclick={navigateToProfile}>
									<UserIcon class="mr-2 h-4 w-4" />
									<span>Profile</span>
								</DropdownMenu.Item>
								<DropdownMenu.Item onclick={navigateToSettings}>
									<Settings class="mr-2 h-4 w-4" />
									<span>Settings</span>
								</DropdownMenu.Item>
							</DropdownMenu.Group>
							<DropdownMenu.Separator />
							<DropdownMenu.Item onclick={openGitHubRepo}>
								<Github class="mr-2 h-4 w-4" />
								<span>GitHub</span>
							</DropdownMenu.Item>
							<DropdownMenu.Separator />
							<DropdownMenu.Item onclick={handleAuthAction} disabled={authLoading}>
								<LogOut class="mr-2 h-4 w-4" />
								<span>{authLoading ? 'Signing out...' : 'Log out'}</span>
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				{:else}
					<Button
						variant="outline"
						size="sm"
						class="h-9"
						onclick={handleAuthAction}
						disabled={authLoading}
					>
						{#if authLoading}
							<svg class="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
									fill="none"
								></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
								></path>
							</svg>
							Processing...
						{:else}
							Sign in with
							<Github class="ml-2 h-4 w-4" />
						{/if}
					</Button>
				{/if}
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
						<a
							href={ROUTES.COMPONENTS}
							onclick={closeMobileMenu}
							class="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground {page
								.url.pathname === ROUTES.COMPONENTS
								? 'bg-accent text-accent-foreground'
								: 'text-muted-foreground'}"
						>
							Components
						</a>
						<a
							href={ROUTES.ABOUT}
							onclick={closeMobileMenu}
							class="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground {page
								.url.pathname === ROUTES.ABOUT
								? 'bg-accent text-accent-foreground'
								: 'text-muted-foreground'}"
						>
							About
						</a>
						<Separator class="my-3" />
						<div class="space-y-2">
							<button
								onclick={() => {
									closeMobileMenu();
									navigateToProfile();
								}}
								class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
							>
								<UserIcon class="h-4 w-4" />
								Profile
							</button>
							<button
								onclick={() => {
									closeMobileMenu();
									navigateToSettings();
								}}
								class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
							>
								<Settings class="h-4 w-4" />
								Settings
							</button>
							<button
								onclick={() => {
									closeMobileMenu();
									openGitHubRepo();
								}}
								class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
							>
								<Github class="h-4 w-4" />
								GitHub
							</button>
						</div>
						<Separator class="my-3" />
						<Button
							variant="outline"
							size="sm"
							class="w-full"
							disabled={authLoading}
							onclick={() => {
								closeMobileMenu();
								handleSignOut();
							}}
						>
							{#if authLoading}
								<svg class="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
									<circle
										class="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										stroke-width="4"
										fill="none"
									></circle>
									<path
										class="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
									></path>
								</svg>
								Signing out...
							{:else}
								<LogOut class="mr-2 h-4 w-4" />
								Logout
							{/if}
						</Button>
					{:else}
						<a
							href={ROUTES.HOME}
							onclick={closeMobileMenu}
							class="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground {page
								.url.pathname === ROUTES.HOME
								? 'bg-accent text-accent-foreground'
								: 'text-muted-foreground'}"
						>
							Home
						</a>
						<a
							href={ROUTES.COMPONENTS}
							onclick={closeMobileMenu}
							class="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground {page
								.url.pathname === ROUTES.COMPONENTS
								? 'bg-accent text-accent-foreground'
								: 'text-muted-foreground'}"
						>
							Components
						</a>
						<a
							href={ROUTES.ABOUT}
							onclick={closeMobileMenu}
							class="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground {page
								.url.pathname === ROUTES.ABOUT
								? 'bg-accent text-accent-foreground'
								: 'text-muted-foreground'}"
						>
							About
						</a>
						<div class="space-y-2 border-t pt-3">
							<div class="flex justify-center py-2">
								<DarkModeToggle />
							</div>
							<Button
								size="sm"
								class="w-full"
								disabled={authLoading}
								onclick={() => {
									closeMobileMenu();
									handleAuthAction();
								}}
							>
								{#if authLoading}
									<svg class="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
										<circle
											class="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											stroke-width="4"
											fill="none"
										></circle>
										<path
											class="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
										></path>
									</svg>
									Processing...
								{:else}
									Sign in with
									<svg
										class="h-4 w-4"
										fill="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
										/>
									</svg>
								{/if}
							</Button>
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</nav>

<div class="h-16"></div>
