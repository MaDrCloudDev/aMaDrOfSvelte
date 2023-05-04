<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form use:enhance method="post">
	<input type="submit" class="cursor-pointer border border-black px-2 py-1" value="Sign out" />
</form>
