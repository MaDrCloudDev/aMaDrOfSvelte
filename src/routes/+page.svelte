<script lang="ts">
	import { enhance } from '$app/forms';
	import { Label, Input } from 'flowbite-svelte';
	// import type { PageData } from './$types';

	// export let data: PageData;
	export let data;
</script>

<p>This page is protected and can only be accessed by authenticated users.</p>
<pre class="code">
{JSON.stringify(data.user, null, 2)}
</pre>

<form use:enhance method="post">
	<Input type="submit" value="Sign out" class="cursor-pointer" />
</form>
