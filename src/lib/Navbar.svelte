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

<Navbar let:hidden let:toggle class="max-w-5xl mx-auto">
	<NavBrand href="/" on:click={toggle}>
		<img
			src="https://raw.githubusercontent.com/MaDrCloudDev/projectsImages/87a496345380971e12ea45b8e24bd23ae64aa25e/MaDrLogo.svg"
			class="mr-3 h-6 sm:h-9"
			alt="Flowbite Logo"
		/>
		<span
			class="self-center whitespace-nowrap text-xl font-semibold dark:text-white hover:text-[#328eef]"
			on:click={toggle}
			on:keydown={toggle}
		>
			svelteKitMaDrS
		</span>
	</NavBrand>
	<NavHamburger on:click={toggle} />
	<NavUl {hidden}>
		<NavLi id="nav-menu1" class="cursor-pointer"><Chevron aligned>Dropdown</Chevron></NavLi>
		<NavLi href="/projects" on:click={toggle}>Projects</NavLi>
		<NavLi href="/blog" on:click={toggle}>Blog</NavLi>
		<NavLi href="/contact" on:click={toggle}>Contact</NavLi>
		{#if user}
			<li on:keydown={toggle}>
				<form use:enhance method="post">
					<input type="submit" value="Sign out" class="cursor-pointer hover:text-blue-700" />
				</form>
			</li>
		{:else}
			<NavLi href="/login" on:click={toggle} class="cursor-pointer hover:text-blue-700">Login</NavLi
			>
		{/if}
		<Dropdown triggeredBy="#nav-menu1" class="w-44 z-20">
			<DropdownItem href="/projects" on:click={toggle}>Projects</DropdownItem>
			<DropdownItem href="/blog" on:click={toggle}>Blog</DropdownItem>
			<DropdownItem href="/contact" on:click={toggle}>Contact</DropdownItem>
		</Dropdown>
	</NavUl>
</Navbar>
