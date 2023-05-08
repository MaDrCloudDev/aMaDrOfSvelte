<script>
	import { enhance } from '$app/forms';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Dropdown,
		DropdownItem,
		Chevron,
		DropdownDivider
	} from 'flowbite-svelte';

	export let user;

	function closeMenu() {
		document.getElementById('nav-hamburger').click();
	}
</script>

<Navbar let:hidden let:toggle>
	<NavBrand href="/">
		<img
			src="https://raw.githubusercontent.com/MaDrCloudDev/projectsImages/87a496345380971e12ea45b8e24bd23ae64aa25e/MaDrLogo.svg"
			class="mr-3 h-6 sm:h-9"
			alt="Flowbite Logo"
		/>
		<span
			class="self-center whitespace-nowrap text-xl font-semibold dark:text-white hover:text-[#328eef]"
		>
			svelteKitMaDrS
		</span>
	</NavBrand>
	<NavHamburger id="nav-hamburger" on:click={toggle} />
	<NavUl {hidden}>
		<NavLi id="nav-menu1" class="cursor-pointer"><Chevron aligned>Dropdown</Chevron></NavLi>
		<NavLi href="/projects" on:click={closeMenu}>Projects</NavLi>
		<NavLi href="/blog" on:click={closeMenu}>Blog</NavLi>
		<NavLi href="/contact" on:click={closeMenu}>Contact</NavLi>
		{#if user}
			<li class="py-2 px-3 sm:py-0 sm:px-0">
				<form use:enhance method="post">
					<input
						type="submit"
						value="Sign out"
						class="cursor-pointer hover:text-blue-700"
						on:click={closeMenu}
					/>
				</form>
			</li>
		{:else}
			<NavLi href="/login" on:click={closeMenu} class="cursor-pointer hover:text-blue-700"
				>Login</NavLi
			>
		{/if}
		<Dropdown triggeredBy="#nav-menu1" class="w-44 z-20">
			<DropdownItem href="/projects" on:click={closeMenu}>Projects</DropdownItem>
			<DropdownItem href="/blog" on:click={closeMenu}>Blog</DropdownItem>
			<DropdownItem href="/contact" on:click={closeMenu}>Contact</DropdownItem>
		</Dropdown>
	</NavUl>
</Navbar>
