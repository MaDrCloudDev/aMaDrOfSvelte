<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import { signIn, signOut } from '$lib/auth-client';
	import { Separator } from '$lib/components/ui/separator';
	import { Menu, X } from '@lucide/svelte';

	import type { User } from '$lib/server/auth';

	let { user = null }: { user?: User | null } = $props();
	let mobileMenuOpen = $state(false);
	let navElement: HTMLElement;
	let authLoading = $state(false);

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	async function handleSignOut() {
		try {
			authLoading = true;
			await signOut({
				fetchOptions: {
					onSuccess: () => {
						window.location.href = '/?message=Signed out';
					}
				}
			});
		} catch (error) {
			console.error('Sign out error:', error);
			authLoading = false;
		}
	}

	async function handleGitHubAuth() {
		if (authLoading) return;
		authLoading = true;
		if (user) {
			await handleSignOut();
			return;
		}
		try {
			await signIn.social({
				provider: 'github',
				callbackURL: '/dashboard'
			});
		} catch (error) {
			console.error('GitHub sign-in error:', error);
			authLoading = false;
		}
	}

	function handleClickOutside(event: MouseEvent) {
		if (mobileMenuOpen && navElement && !navElement.contains(event.target as Node)) {
			closeMobileMenu();
		}
	}

	// Close mobile menu on escape key
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && mobileMenuOpen) {
			closeMobileMenu();
		}
	}
</script>

<svelte:window onclick={handleClickOutside} onkeydown={handleKeydown} />

<nav
	bind:this={navElement}
	class="fixed top-0 right-0 left-0 z-50 border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<!-- Logo/Brand -->
			<div class="flex items-center space-x-4">
				<a href="/" class="flex items-center space-x-3">
					<img
						src="/madr-logo.png"
						alt="aMaDrOfSvelte Logo"
						class="h-8 w-8 rounded-lg object-contain"
					/>
					<span class="font-semibold text-foreground">aMaDrOfSvelte</span>
				</a>
			</div>

			<!-- Navigation Links -->
			<div class="hidden items-center space-x-6 md:flex">
				{#if user}
					<a
						href="/dashboard"
						class="text-sm font-medium transition-colors hover:text-primary {page.url.pathname ===
						'/dashboard'
							? 'text-primary'
							: 'text-muted-foreground'}"
					>
						Dashboard
					</a>
					<a
						href="/components"
						class="text-sm font-medium transition-colors hover:text-primary {page.url.pathname ===
						'/components'
							? 'text-primary'
							: 'text-muted-foreground'}"
					>
						Components
					</a>
					<a
						href="/about"
						class="text-sm font-medium transition-colors hover:text-primary {page.url.pathname ===
						'/about'
							? 'text-primary'
							: 'text-muted-foreground'}"
					>
						About
					</a>
				{:else}
					<a
						href="/"
						class="text-sm font-medium transition-colors hover:text-primary {page.url.pathname ===
						'/'
							? 'text-primary'
							: 'text-muted-foreground'}"
					>
						Home
					</a>
					<a
						href="/components"
						class="text-sm font-medium transition-colors hover:text-primary {page.url.pathname ===
						'/components'
							? 'text-primary'
							: 'text-muted-foreground'}"
					>
						Components
					</a>
					<a
						href="/about"
						class="text-sm font-medium transition-colors hover:text-primary {page.url.pathname ===
						'/about'
							? 'text-primary'
							: 'text-muted-foreground'}"
					>
						About
					</a>
				{/if}
			</div>

			<!-- Mobile Menu Button -->
			<div class="flex items-center space-x-3 md:hidden">
				<button
					onclick={toggleMobileMenu}
					class="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
					aria-label="Toggle mobile menu"
				>
					{#if mobileMenuOpen}
						<X class="h-4 w-4" />
					{:else}
						<Menu class="h-4 w-4" />
					{/if}
				</button>
			</div>

			<!-- User Actions -->
			<div class="hidden items-center space-x-3 md:flex">
				<!-- GitHub Link -->
				<a
					href="https://github.com/MaDrCloudDev/aMaDrOfSvelte"
					target="_blank"
					rel="noopener noreferrer"
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
							d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
						/>
					</svg>
					Repo
				</a>

				{#if user}
					<div class="hidden items-center space-x-3 sm:flex">
						<span class="mr-0 text-sm text-muted-foreground">
							{user.email}
						</span>
						<Separator orientation="vertical" class="h-4" />
					</div>
				{:else}
					<!-- no extra content when logged out -->
				{/if}
				<Button
					variant="outline"
					size="sm"
					class="h-9"
					onclick={handleGitHubAuth}
					disabled={authLoading}
				>
					{#if authLoading}
						<svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24">
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
						{user ? 'Logout' : 'Sign in with'}
						{#if !user}
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
					{/if}
				</Button>
			</div>
		</div>

		<!-- Mobile Menu -->
		{#if mobileMenuOpen}
			<div
				class="border-t bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 md:hidden"
			>
				<div class="space-y-1 px-4 pt-2 pb-3">
					{#if user}
						<!-- User info on mobile -->
						<div class="mb-3 border-b pb-3">
							<p class="text-sm font-medium text-foreground">{user.email}</p>
						</div>

						<!-- Authenticated navigation -->
						<a
							href="/dashboard"
							onclick={closeMobileMenu}
							class="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground {page
								.url.pathname === '/dashboard'
								? 'bg-accent text-accent-foreground'
								: 'text-muted-foreground'}"
						>
							Dashboard
						</a>
						<a
							href="/components"
							onclick={closeMobileMenu}
							class="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground {page
								.url.pathname === '/components'
								? 'bg-accent text-accent-foreground'
								: 'text-muted-foreground'}"
						>
							Components
						</a>
						<a
							href="/about"
							onclick={closeMobileMenu}
							class="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground {page
								.url.pathname === '/about'
								? 'bg-accent text-accent-foreground'
								: 'text-muted-foreground'}"
						>
							About
						</a>

						<!-- Logout button -->
						<div class="border-t pt-3">
							<Button
								variant="outline"
								size="sm"
								class="w-full"
								disabled={authLoading}
								onclick={() => {
									closeMobileMenu();
									handleGitHubAuth();
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
									Logout
								{/if}
							</Button>
						</div>
					{:else}
						<!-- Unauthenticated navigation -->
						<a
							href="/"
							onclick={closeMobileMenu}
							class="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground {page
								.url.pathname === '/'
								? 'bg-accent text-accent-foreground'
								: 'text-muted-foreground'}"
						>
							Home
						</a>
						<a
							href="/components"
							onclick={closeMobileMenu}
							class="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground {page
								.url.pathname === '/components'
								? 'bg-accent text-accent-foreground'
								: 'text-muted-foreground'}"
						>
							Components
						</a>
						<a
							href="/about"
							onclick={closeMobileMenu}
							class="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground {page
								.url.pathname === '/about'
								? 'bg-accent text-accent-foreground'
								: 'text-muted-foreground'}"
						>
							About
						</a>

						<!-- Auth button -->
						<div class="space-y-2 border-t pt-3">
							<Button
								size="sm"
								class="w-full"
								disabled={authLoading}
								onclick={() => {
									closeMobileMenu();
									handleGitHubAuth();
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

<!-- Spacer to prevent content from hiding behind fixed navbar -->
<div class="h-16"></div>
