<script lang="ts">
	import { enhance } from '$app/forms';
	import { TRADES, US_STATES } from '$lib/content';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	let submitting: boolean = $state(false);

	const inputClass =
		'w-full border-canvas bg-paper px-4 py-3 text-sm focus:border-ink focus:ring-ink placeholder:text-pencil/50';
</script>

<svelte:head>
	<title>Apply — iotty Trade Partners</title>
</svelte:head>

<section class="mx-auto max-w-6xl px-6 py-20">
	<div class="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
		<!-- Left rail -->
		<div>
			<p class="overline-label text-pencil">Founding application</p>
			<h1 class="mt-6 text-4xl leading-tight font-semibold tracking-tight">
				Five minutes.<br />
				<span class="text-manila-deep">No fees, no minimums.</span>
			</h1>
			<p class="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-pencil">
				A real person reviews every application and calls you within 48 hours. Founding partners lock 25% off MSRP
				for 12 months, get their first switch free with the demo kit, and go on the installer directory at launch.
			</p>
			<div class="frame-motif mt-10 inline-block bg-ink px-6 py-4 font-mono text-sm text-paper">
				Founding spots limited
			</div>
		</div>

		<!-- Form -->
		{#if form?.success}
			<div class="frame-motif self-start bg-canvas/40 p-10">
				<p class="overline-label text-manila-deep">Application received</p>
				<h2 class="mt-4 text-2xl font-semibold">Your slot is held.</h2>
				<p class="mt-4 max-w-md text-[0.95rem] leading-relaxed text-pencil">
					We review every application personally — expect a call or email within one business day. If you want to
					jump the line, reply to the confirmation with a photo of your latest project.
				</p>
				<a href="/" class="mt-8 inline-block text-sm font-medium underline underline-offset-4">Back to the program</a>
			</div>
		{:else}
			<form
				method="POST"
				class="space-y-6 self-start"
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

				<div class="grid gap-6 sm:grid-cols-2">
					<label class="block">
						<span class="overline-label text-pencil">Company *</span>
						<input class={inputClass} type="text" name="company" required value={form?.values?.company ?? ''} placeholder="Sparks Electric LLC" />
					</label>
					<label class="block">
						<span class="overline-label text-pencil">Your name *</span>
						<input class={inputClass} type="text" name="contact_name" required value={form?.values?.contact_name ?? ''} placeholder="First and last" />
					</label>
					<label class="block">
						<span class="overline-label text-pencil">Email *</span>
						<input class={inputClass} type="email" name="email" required value={form?.values?.email ?? ''} placeholder="you@company.com" />
					</label>
					<label class="block">
						<span class="overline-label text-pencil">Phone *</span>
						<input class={inputClass} type="tel" name="phone" required value={form?.values?.phone ?? ''} placeholder="(555) 555-5555" />
					</label>
					<label class="block">
						<span class="overline-label text-pencil">Trade *</span>
						<select class={inputClass} name="trade" required>
							<option value="" disabled selected={!form?.values?.trade}>Select your trade</option>
							{#each TRADES as trade (trade)}
								<option value={trade} selected={form?.values?.trade === trade}>{trade}</option>
							{/each}
						</select>
					</label>
					<label class="block">
						<span class="overline-label text-pencil">State *</span>
						<select class={inputClass} name="state" required>
							<option value="" disabled selected={!form?.values?.state}>State</option>
							{#each US_STATES as st (st)}
								<option value={st} selected={form?.values?.state === st}>{st}</option>
							{/each}
						</select>
					</label>
					<label class="block">
						<span class="overline-label text-pencil">License # or EIN</span>
						<input class={inputClass} type="text" name="license_or_ein" value={form?.values?.license_or_ein ?? ''} placeholder="Speeds up approval" />
					</label>
					<label class="block">
						<span class="overline-label text-pencil">Website or portfolio</span>
						<input class={inputClass} type="text" name="website" value={form?.values?.website ?? ''} placeholder="yourcompany.com" />
					</label>
				</div>

				<label class="block">
					<span class="overline-label text-pencil">Anything we should know?</span>
					<textarea class={inputClass} name="notes" rows="3" placeholder="Typical projects, volume, the metro you work…">{form?.values?.notes ?? ''}</textarea>
				</label>

				<button
					type="submit"
					disabled={submitting}
					class="frame-motif w-full bg-ink px-8 py-4 text-sm font-semibold text-paper transition-colors hover:bg-manila-deep hover:text-ink disabled:opacity-60 sm:w-auto"
				>
					{submitting ? 'Submitting…' : 'Submit application'}
				</button>
				<p class="text-xs text-pencil">
					By applying you agree to program terms including MAP pricing. We never share your information.
				</p>
			</form>
		{/if}
	</div>
</section>
