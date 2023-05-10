<script>
	import { Button } from 'flowbite-svelte';
	import { AccordionItem, Accordion } from 'flowbite-svelte';
	import { Tooltip } from 'flowbite-svelte';
	import { Timeline, TimelineItem } from 'flowbite-svelte';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { Tabs, TabItem } from 'flowbite-svelte';
	import { Spinner } from 'flowbite-svelte';
	import { SpeedDial, SpeedDialButton } from 'flowbite-svelte';
	import { Popover } from 'flowbite-svelte';
	import { Modal } from 'flowbite-svelte';
	let defaultModal = false;

	let style = 'dark';
</script>

<div>
	<Button>Default</Button>
	<Button color="alternative">Alternative</Button>
	<Button color="dark">Dark</Button>
	<Button color="light">Light</Button>
	<Button color="green">Green</Button>
	<Button color="red">Red</Button>
	<Button color="yellow">Yellow</Button>
	<Button color="purple">Purple</Button>
</div>
<div>
	<Accordion>
		<AccordionItem>
			<span slot="header">My Header 1</span>
			<p class="mb-2 text-gray-500 dark:text-gray-400">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint
				explicabo ...
			</p>
			<p class="text-gray-500 dark:text-gray-400">
				Check out this guide to learn how to <a
					href="/"
					target="_blank"
					rel="noreferrer"
					class="text-blue-600 dark:text-blue-500 hover:underline">get started</a
				> and start developing websites even faster with components on top of Tailwind CSS.
			</p>
		</AccordionItem>
		<AccordionItem>
			<span slot="header">My Header 2</span>
			<p class="mb-2 text-gray-500 dark:text-gray-400">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint
				explicabo ...
			</p>
			<p class="mb-2 text-gray-500 dark:text-gray-400">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint
				explicabo ...
			</p>
			<p class="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
			<ul class="list-disc pl-5 dark:text-gray-400 text-gray-500">
				<li>
					<a
						href="/"
						target="_blank"
						rel="noreferrer"
						class="text-blue-600 dark:text-blue-500 hover:underline">Lorem ipsum</a
					>
				</li>
				<li>
					<a
						href="https://tailwindui.com/"
						rel="noreferrer"
						target="_blank"
						class="text-blue-600 dark:text-blue-500 hover:underline">Tailwind UI</a
					>
				</li>
			</ul>
		</AccordionItem>
	</Accordion>
</div>
<div>
	<Button id="style-light">Light tooltip</Button>
	<Button id="style-dark">Dark tooltip</Button>
	<Tooltip
		{style}
		triggeredBy="[id^='style-']"
		on:show={(ev) => (style = ev.target.id.split('-')[1])}>Tooltip content</Tooltip
	>
</div>
<div>
	<script>
		import { Timeline, TimelineItem, Button } from 'flowbite-svelte';
	</script>

	<Timeline>
		<TimelineItem title="Application UI code in Tailwind CSS" date="February 2022">
			<p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
				Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar,
				and pre-order E-commerce & Marketing pages.
			</p>
			<Button color="alternative"
				>Learn more<svg
					class="ml-2 w-3 h-3"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/></svg
				></Button
			>
		</TimelineItem>
		<TimelineItem title="Application UI code in Tailwind CSS" date="March 2022">
			<p class="text-base font-normal text-gray-500 dark:text-gray-400">
				All of the pages and components are first designed in Figma and we keep a parity between the
				two versions even as we update the project.
			</p>
		</TimelineItem>
		<TimelineItem title="Application UI code in Tailwind CSS" date="April 2022">
			<p class="text-base font-normal text-gray-500 dark:text-gray-400">
				Get started with dozens of web components and interactive elements built on top of Tailwind
				CSS.
			</p>
		</TimelineItem>
	</Timeline>
</div>
<div>
	<Table>
		<TableHead>
			<TableHeadCell>Product name</TableHeadCell>
			<TableHeadCell>Color</TableHeadCell>
			<TableHeadCell>Category</TableHeadCell>
			<TableHeadCell>Price</TableHeadCell>
		</TableHead>
		<TableBody class="divide-y">
			<TableBodyRow>
				<TableBodyCell>Apple MacBook Pro 17"</TableBodyCell>
				<TableBodyCell>Sliver</TableBodyCell>
				<TableBodyCell>Laptop</TableBodyCell>
				<TableBodyCell>$2999</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>Microsoft Surface Pro</TableBodyCell>
				<TableBodyCell>White</TableBodyCell>
				<TableBodyCell>Laptop PC</TableBodyCell>
				<TableBodyCell>$1999</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>Magic Mouse 2</TableBodyCell>
				<TableBodyCell>Black</TableBodyCell>
				<TableBodyCell>Accessories</TableBodyCell>
				<TableBodyCell>$99</TableBodyCell>
			</TableBodyRow>
		</TableBody>
	</Table>
</div>
<div>
	<Tabs>
		<TabItem open title="Profile">
			<p class="text-sm text-gray-500 dark:text-gray-400">
				<b>Profile:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
				incididunt ut labore et dolore magna aliqua.
			</p>
		</TabItem>
		<TabItem title="Settings">
			<p class="text-sm text-gray-500 dark:text-gray-400">
				<b>Settings:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
				incididunt ut labore et dolore magna aliqua.
			</p>
		</TabItem>
		<TabItem title="Users">
			<p class="text-sm text-gray-500 dark:text-gray-400">
				<b>Users:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
				incididunt ut labore et dolore magna aliqua.
			</p>
		</TabItem>
		<TabItem title="Dashboard">
			<p class="text-sm text-gray-500 dark:text-gray-400">
				<b>Dashboard:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
				incididunt ut labore et dolore magna aliqua.
			</p>
		</TabItem>
		<TabItem disabled>
			<span slot="title" class="text-gray-400 dark:text-gray-500">Disabled</span>
			<p class="text-sm text-gray-500 dark:text-gray-400">
				<b>Disabled:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
				incididunt ut labore et dolore magna aliqua.
			</p>
		</TabItem>
	</Tabs>
</div>
<div>
	<Spinner size={4} />
	<Spinner size={6} />
	<Spinner size={8} />
</div>
<div>
	<SpeedDial defaultClass="absolute right-6 bottom-6">
		<SpeedDialButton name="Share">
			<svg
				aria-hidden="true"
				class="w-6 h-6"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"
				/></svg
			>
		</SpeedDialButton>
		<SpeedDialButton name="Print">
			<svg
				aria-hidden="true"
				class="w-6 h-6"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
					clip-rule="evenodd"
				/></svg
			>
		</SpeedDialButton>
		<SpeedDialButton name="Download">
			<svg
				aria-hidden="true"
				class="w-6 h-6"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					clip-rule="evenodd"
					d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 00-2 0v1.586l-.293-.293a.999.999 0 10-1.414 1.414l2 2a.999.999 0 001.414 0l2-2a.999.999 0 10-1.414-1.414l-.293.293V9z"
					fill-rule="evenodd"
				/></svg
			>
		</SpeedDialButton>
		<SpeedDialButton name="Copy">
			<svg
				aria-hidden="true"
				class="w-6 h-6"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" /><path
					d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z"
				/></svg
			>
		</SpeedDialButton>
	</SpeedDial>
</div>
<div>
	<Button id="b1">Default popover</Button>
	<Popover class="w-64 text-sm font-light " title="Popover title" triggeredBy="#b1">
		And here's some amazing content. It's very engaging. Right?
	</Popover>
</div>
<div>
	<Button on:click={() => (defaultModal = true)}>Default modal</Button>
	<Modal title="Terms of Service" bind:open={defaultModal} autoclose>
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			With less than a month to go before the European Union enacts new consumer privacy laws for
			its citizens, companies around the world are updating their terms of service agreements to
			comply.
		</p>
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25
			and is meant to ensure a common set of data rights in the European Union. It requires
			organizations to notify users as soon as possible of high-risk data breaches that could
			personally affect them.
		</p>
		<svelte:fragment slot="footer">
			<Button on:click={() => alert('Handle "success"')}>I accept</Button>
			<Button color="alternative">Decline</Button>
		</svelte:fragment>
	</Modal>
</div>
