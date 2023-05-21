<script>
	import Accordion from '$lib/flowbite/Accordion.svelte';
	import Buttons from '$lib/flowbite/Buttons.svelte';
	import Tooltip from '$lib/flowbite/Tooltip.svelte';
	import Timeline from '$lib/flowbite/Timeline.svelte';
	import Table from '$lib/flowbite/Table.svelte';
	import Tabs from '$lib/flowbite/Tabs.svelte';
	import Spinner from '$lib/flowbite/Spinner.svelte';
	import SpeedDial from '$lib/flowbite/SpeedDial.svelte';
	import Popover from '$lib/flowbite/Popover.svelte';
	import Modal from '$lib/flowbite/Modal.svelte';

	let style = 'dark';
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
	<div>
		<Buttons />
	</div>
	<div>
		<Modal />
	</div>
	<div>
		<Popover />
	</div>
	<div>
		<Spinner />
	</div>
	<div>
		<Accordion />
	</div>
	<div class="">
		<Tooltip />
	</div>
	<div>
		<Table />
	</div>
	<div>
		<Tabs />
	</div>
	<div>
		<Timeline />
	</div>
	<div>
		<SpeedDial />
	</div>
</div>
