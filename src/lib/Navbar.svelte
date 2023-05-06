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
</script>

<Navbar let:hidden let:toggle>
	<NavBrand href="/">
		<img
			src="https://raw.githubusercontent.com/MaDrCloudDev/projectsImages/87a496345380971e12ea45b8e24bd23ae64aa25e/MaDrLogo.svg"
			class="mr-3 h-6 sm:h-9"
			alt="Flowbite Logo"
		/>
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			svelteKitMaDrS
		</span>
	</NavBrand>
	<NavHamburger on:click={toggle} />
	<NavUl {hidden}>
		<NavLi id="nav-menu1" class="cursor-pointer"><Chevron aligned>Dropdown</Chevron></NavLi>
		<NavLi href="/projects">Projects</NavLi>
		<NavLi href="/blog">Blog</NavLi>
		<NavLi href="/contact">Contact</NavLi>
		{#if user}
			<NavLi href="">
				<form use:enhance method="post">
					<input type="submit" value="Sign out" class="cursor-pointer" />
				</form></NavLi
			>
		{:else}
			<NavLi href="/login">Login</NavLi>
		{/if}
		<Dropdown triggeredBy="#nav-menu1" class="w-44 z-20">
			<DropdownItem>Projects</DropdownItem>
			<DropdownItem>Blog</DropdownItem>
			<DropdownItem>Contact</DropdownItem>
		</Dropdown>
	</NavUl>
</Navbar>
