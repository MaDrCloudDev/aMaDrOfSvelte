<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '#lib/components/ui/button/index.ts';
	import { APP_NAME, ROUTES } from '#lib/constants.ts';

	const notFound = $derived(page.status === 404);
</script>

<svelte:head>
	<title>{page.status} · {APP_NAME}</title>
</svelte:head>

<div
	class="container mx-auto flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center"
>
	<p class="text-sm font-semibold text-muted-foreground">{page.status}</p>
	<h1 class="text-3xl font-bold tracking-tight">
		{notFound ? 'Page not found' : 'Something went wrong'}
	</h1>
	<p class="max-w-md text-muted-foreground">
		{notFound ? "That page doesn't exist, or it moved." : page.error?.message}
	</p>
	<Button href={ROUTES.HOME}>Back home</Button>
</div>
