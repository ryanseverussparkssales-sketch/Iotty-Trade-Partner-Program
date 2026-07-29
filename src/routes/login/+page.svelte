<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
	let submitting: boolean = $state(false);
</script>

<svelte:head>
	<title>Sign in — iotty Trade Partners</title>
</svelte:head>

<section class="mx-auto flex min-h-[60vh] max-w-6xl items-center px-6 py-20">
	<div class="mx-auto w-full max-w-md">
		<p class="overline-label text-pencil">Partner sign in</p>
		<h1 class="mt-4 text-4xl font-semibold tracking-tight">No passwords. <span class="text-manila-deep">Just your email.</span></h1>

		{#if form?.sent}
			<div class="frame-motif mt-10 bg-canvas/40 p-8">
				<p class="overline-label text-manila-deep">Link sent</p>
				<p class="mt-3 text-[0.95rem] leading-relaxed text-pencil">
					Check <span class="font-medium text-ink">{form.email}</span> for a sign-in link. It's valid for one
					hour — open it on this device.
				</p>
			</div>
		{:else}
			<form
				method="POST"
				class="mt-10 space-y-5"
				use:enhance={() => {
					submitting = true;
					return async ({ update }) => {
						submitting = false;
						await update();
					};
				}}
			>
				{#if form?.error}
					<p class="border border-manila-deep bg-manila/20 px-4 py-3 text-sm">{form.error}</p>
				{/if}
				<label class="block">
					<span class="overline-label text-pencil">Email</span>
					<input
						class="w-full border-canvas bg-paper px-4 py-3 text-sm focus:border-ink focus:ring-ink"
						type="email"
						name="email"
						required
						value={form?.email ?? ''}
						placeholder="you@company.com"
					/>
				</label>
				<button
					type="submit"
					disabled={submitting}
					class="frame-motif w-full bg-ink px-8 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-manila-deep hover:text-ink disabled:opacity-60"
				>
					{submitting ? 'Sending…' : 'Email me a sign-in link'}
				</button>
				<p class="text-xs leading-relaxed text-pencil">
					Use the email you applied with — your partner profile is matched to it. Not a partner yet?
					<a href="/apply" class="underline underline-offset-4">Apply in 5 minutes</a>.
				</p>
			</form>
		{/if}
	</div>
</section>
