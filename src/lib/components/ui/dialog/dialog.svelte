<script lang="ts" module>
	import { Dialog as DialogPrimitive } from 'bits-ui';
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		open?: boolean;
		children: Snippet;
	};

	let { open = $bindable(false), children }: Props = $props();
</script>

<DialogPrimitive.Root bind:open>
	{@render children()}
</DialogPrimitive.Root>
