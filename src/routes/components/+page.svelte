<script>
	import Accordion from '$lib/Accordion.svelte';
	import Buttons from '$lib/Buttons.svelte';
	import Tooltip from '$lib/Tooltip.svelte';
	import Timeline from '$lib/Timeline.svelte';
	import Table from '$lib/Table.svelte';
	import Tabs from '$lib/Tabs.svelte';
	import Spinner from '$lib/Spinner.svelte';
	import SpeedDial from '$lib/SpeedDial.svelte';
	import Popover from '$lib/Popover.svelte';
	import Modal from '$lib/Modal.svelte';

	let style = 'dark';
</script>

<div class="grid md:grid-cols-2 gap-4">
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
	<div>
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
