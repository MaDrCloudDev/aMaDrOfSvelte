<script>
	import { Tooltip, Button } from 'flowbite-svelte';
	let style = 'light';
</script>

<Button id="style-light">Light tooltip</Button>
<Button id="style-dark">Dark tooltip</Button>
<Tooltip {style} triggeredBy="[id^='style-']" on:show={(ev) => (style = ev.target.id.split('-')[1])}
	>Tooltip content</Tooltip
>
