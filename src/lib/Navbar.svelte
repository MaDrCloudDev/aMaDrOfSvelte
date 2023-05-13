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
	import { DarkMode } from 'flowbite-svelte';

	export let user;

	function closeMenu() {
		if (window.innerWidth < 768) {
			document.getElementById('nav-hamburger').click();
		}
	}
</script>

<Navbar
	let:hidden
	let:toggle
	navClass="sticky top-2 rounded-lg py-2 border px-4 mt-2 mb-2 shadow-xl z-50"
>
	<NavBrand href="/">
		<img
			src="https://raw.githubusercontent.com/MaDrCloudDev/projectsImages/87a496345380971e12ea45b8e24bd23ae64aa25e/MaDrLogo.svg"
			class="mr-3 h-6 sm:h-9"
			alt="Flowbite Logo"
		/>
		<span class="text-xl font-semibold dark:text-white hover:text-blue-700"> aMaDrOfSvelte </span>
	</NavBrand>
	<NavHamburger id="nav-hamburger" on:click={toggle} />
	<NavUl {hidden} ulClass="text-md md:flex items-center gap-3">
		<NavLi id="nav-menu1" class="cursor-pointer"><Chevron aligned>Dropdown</Chevron></NavLi>
		<NavLi href="/projects" on:click={closeMenu}>Projects</NavLi>
		<NavLi href="/blog" on:click={closeMenu}>Blog</NavLi>
		<NavLi href="/components" on:click={closeMenu}>Components?</NavLi>
		<NavLi href="/contact" on:click={closeMenu}>Contact</NavLi>
		{#if user}
			<li class="py-2 px-3 md:py-0 md:px-0">
				<form use:enhance method="post">
					<input
						type="submit"
						value="Sign out"
						class="block py-2 pr-4 pl-3 md:p-0 rounded text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover:cursor-pointer"
						on:click={closeMenu}
					/>
				</form>
			</li>
		{:else}
			<!-- <NavLi href="/login" on:click={closeMenu} class="cursor-pointer hover:text-blue-700"
				>Login</NavLi
			> -->
		{/if}
		<Dropdown triggeredBy="#nav-menu1" class="w-44 z-20 sticky top-0">
			<DropdownItem href="/projects" on:click={closeMenu}>Projects</DropdownItem>
			<DropdownItem href="/blog" on:click={closeMenu}>Blog</DropdownItem>
			<DropdownItem href="/contact" on:click={closeMenu}>Contact</DropdownItem>
			<DropdownItem href="/components" on:click={closeMenu}>Components?</DropdownItem>
		</Dropdown>
		<NavLi class=""><DarkMode /></NavLi>
	</NavUl>
</Navbar>
