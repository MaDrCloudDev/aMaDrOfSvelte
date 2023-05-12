<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form use:enhance method="post">
	<input
		type="submit"
		class="cursor-pointer border border-white texte-white mt-1 px-2 py-1 hover:text-[#fffb00] hover:border-blue-700"
		value="Sign out"
	/>
</form>
