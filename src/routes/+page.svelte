<script lang="ts">
	import { enhance } from '$app/forms';
	// import type { PageData } from './$types';

	// export let data: PageData;
	export let data;
</script>

<p>This page is protected and can only be accessed by authenticated users.</p>
<pre class="code">
{JSON.stringify(data.user, null, 2)}
</pre>

<form use:enhance method="post">
	<input
		type="submit"
		class="cursor-pointer border border-white text-white mt-1 px-2 py-1 hover:text-[#fffb00] hover:border-[#328eef]"
		value="Sign out"
	/>
</form>
