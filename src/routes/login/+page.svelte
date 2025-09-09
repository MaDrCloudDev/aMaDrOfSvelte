<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Alert, AlertDescription } from '$lib/components/ui/alert';
	import { Separator } from '$lib/components/ui/separator';

	let { form }: { form: ActionData } = $props();
</script>

<div class="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background p-4">
	<Card class="w-full max-w-md">
		<CardHeader class="space-y-1">
			<CardTitle class="text-center text-2xl font-bold">Already have an account?</CardTitle>
			<CardDescription class="text-center">Sign in!</CardDescription>
		</CardHeader>
		<CardContent>
			<form class="space-y-4" method="POST" use:enhance>
				{#if form?.error}
					<Alert variant="destructive">
						<AlertDescription>{form.error}</AlertDescription>
					</Alert>
				{/if}

				<div class="space-y-2">
					<Label for="email">Email</Label>
					<Input
						id="email"
						name="email"
						type="email"
						placeholder="Enter your email"
						autocomplete="email"
						required
						value={form?.email ?? ''}
					/>
				</div>

				<div class="space-y-2">
					<Label for="password">Password</Label>
					<Input
						id="password"
						name="password"
						type="password"
						placeholder="Enter your password"
						autocomplete="current-password"
						required
					/>
				</div>

				<Button type="submit" class="w-full">Sign in</Button>
			</form>

			<div class="mt-6">
				<Separator />
				<p class="mt-4 text-center text-sm text-muted-foreground">
					Don't have an account?
					<a href="/register" class="font-medium text-primary hover:underline"> Sign up </a>
				</p>
			</div>
		</CardContent>
	</Card>
</div>
