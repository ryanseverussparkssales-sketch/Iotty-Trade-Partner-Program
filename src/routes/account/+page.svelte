<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const statusCopy: Record<string, { label: string; note: string }> = {
		prospect: { label: 'Prospect', note: 'We have you on our radar — apply to lock a founding slot.' },
		contacted: { label: 'In conversation', note: 'We’ve been in touch — apply to lock your slot.' },
		applied: { label: 'Application in review', note: 'A real person reviews every application — expect a call within one business day.' },
		approved: { label: 'Approved partner', note: 'You’re in. Grab your demo kit and get glass on a wall.' },
		activated: { label: 'Activated', note: 'Demo kit secured — order per-project at your tier price.' },
		ordering: { label: 'Ordering partner', note: 'Thanks for building with iotty.' },
		declined: { label: 'Not approved', note: 'Reach out if circumstances change — the door isn’t closed.' },
		dnc: { label: '—', note: '' }
	};
</script>

<svelte:head>
	<title>Your profile — iotty Trade Partners</title>
</svelte:head>

<section class="mx-auto max-w-6xl px-6 py-20">
	<div class="flex flex-wrap items-start justify-between gap-6">
		<div>
			<p class="overline-label text-pencil">Partner profile</p>
			<h1 class="mt-4 text-4xl font-semibold tracking-tight">
				{data.partner?.company ?? data.email}
			</h1>
		</div>
		<div class="flex items-center gap-4">
			{#if data.isAdmin}
				<a href="/admin" class="frame-motif bg-manila-deep px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper">Admin</a>
			{/if}
			<form method="POST" action="/auth/logout">
				<button type="submit" class="text-sm text-pencil underline underline-offset-4 hover:text-ink">Sign out</button>
			</form>
		</div>
	</div>

	{#if data.partner}
		{@const status = statusCopy[data.partner.status] ?? { label: data.partner.status, note: '' }}
		<div class="mt-12 grid gap-6 lg:grid-cols-3">
			<div class="frame-motif bg-ink p-8 text-paper">
				<p class="overline-label text-manila">Status</p>
				<p class="mt-3 text-2xl font-semibold">{status.label}</p>
				{#if data.partner.founding}
					<p class="overline-label mt-4 inline-block bg-paper/10 px-2 py-1 text-manila">Founding partner</p>
				{/if}
				<p class="mt-4 text-sm leading-relaxed text-paper/70">{status.note}</p>
			</div>
			<div class="frame-motif bg-paper p-8">
				<p class="overline-label text-pencil">Your pricing</p>
				<p class="mt-3 font-mono text-4xl text-manila-deep">
					{data.partner.founding || ['approved', 'activated', 'ordering'].includes(data.partner.status) ? '35%' : '25%'}
				</p>
				<p class="mt-1 text-sm text-pencil">off MSRP{data.partner.founding ? ' — Pro tier, locked 12 months' : ''}</p>
				<p class="mt-4 text-sm leading-relaxed text-pencil">
					2-gang: <span class="font-mono">$84.50</span> · 4-gang: <span class="font-mono">$130.00</span> · dimmer
					module <span class="font-mono">$17.55</span>
				</p>
			</div>
			<div class="frame-motif bg-paper p-8">
				<p class="overline-label text-pencil">On file</p>
				<ul class="mt-4 space-y-2 text-sm text-pencil">
					<li><span class="font-medium text-ink">{data.partner.contact_name}</span></li>
					<li>{data.partner.trade}</li>
					<li>{data.partner.metro ? `${data.partner.metro} · ` : ''}{data.partner.state}</li>
					{#if data.partner.website}<li>{data.partner.website}</li>{/if}
					<li class="pt-2 text-xs">Something wrong? Email <a class="underline" href="mailto:trade@iottysmarthome.com">trade@iottysmarthome.com</a></li>
				</ul>
			</div>
		</div>

		{#if ['approved', 'activated', 'ordering'].includes(data.partner.status)}
			<div class="frame-motif mt-6 flex flex-wrap items-center justify-between gap-6 bg-canvas/40 p-8">
				<div>
					<p class="text-lg font-semibold">Next step: the demo kit</p>
					<p class="mt-1 text-sm text-pencil">2-gang + 1-gang + dimmer at 50% off — first switch free for founding partners.</p>
				</div>
				<a href="mailto:trade@iottysmarthome.com?subject=Demo kit order" class="frame-motif bg-ink px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-manila-deep hover:text-ink">
					Order demo kit
				</a>
			</div>
		{/if}
	{:else}
		<div class="frame-motif mt-12 bg-canvas/40 p-10">
			<p class="text-lg font-semibold">No partner record for {data.email} yet.</p>
			<p class="mt-2 max-w-lg text-sm leading-relaxed text-pencil">
				If you applied with a different email, sign in with that one. Otherwise — founding slots are still open.
			</p>
			<a href="/apply" class="frame-motif mt-6 inline-block bg-ink px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-manila-deep hover:text-ink">
				Apply now
			</a>
		</div>
	{/if}
</section>
