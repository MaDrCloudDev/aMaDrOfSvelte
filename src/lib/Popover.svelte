<script>
	import { Popover, Button } from 'flowbite-svelte';
	let style = 'light';
</script>

<Button id="b1">Default popover</Button>
<Popover class="w-64 text-sm font-light " title="Popover title" triggeredBy="#b1">
	And here's some amazing content. It's very engaging. Right?
</Popover>
