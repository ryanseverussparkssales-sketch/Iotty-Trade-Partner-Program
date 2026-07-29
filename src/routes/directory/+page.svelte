<script lang="ts">
	import { TRADES } from '$lib/content';
	import type { DirectoryListing } from '$lib/types/database';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let stateFilter: string = $state('');
	let tradeFilter: string = $state('');

	const states: string[] = $derived([...new Set(data.listings.map((l: DirectoryListing) => l.state))].sort());

	const filtered: DirectoryListing[] = $derived(
		data.listings.filter(
			(l: DirectoryListing) =>
				(!stateFilter || l.state === stateFilter) && (!tradeFilter || l.trade === tradeFilter)
		)
	);

	const selectClass =
		'border-canvas bg-paper px-4 py-2.5 text-sm focus:border-ink focus:ring-ink';
</script>

<svelte:head>
	<title>Find an Installer — iotty Trade Partners</title>
	<meta
		name="description"
		content="Find an iotty-approved electrician, integrator, builder, or designer near you."
	/>
</svelte:head>

<section class="mx-auto max-w-6xl px-6 py-20">
	<p class="overline-label text-pencil">The directory</p>
	<h1 class="mt-6 max-w-2xl text-4xl leading-tight font-semibold tracking-tight">
		Find an installer.
		<span class="text-manila-deep">Every listing is an approved trade partner.</span>
	</h1>

	{#if data.listings.length > 0}
		<div class="mt-10 flex flex-wrap items-center gap-4">
			<label class="flex items-center gap-3">
				<span class="overline-label text-pencil">State</span>
				<select class={selectClass} bind:value={stateFilter}>
					<option value="">All</option>
					{#each states as st (st)}
						<option value={st}>{st}</option>
					{/each}
				</select>
			</label>
			<label class="flex items-center gap-3">
				<span class="overline-label text-pencil">Trade</span>
				<select class={selectClass} bind:value={tradeFilter}>
					<option value="">All</option>
					{#each TRADES as trade (trade)}
						<option value={trade}>{trade}</option>
					{/each}
				</select>
			</label>
			<p class="ml-auto font-mono text-xs text-pencil">
				{filtered.length} partner{filtered.length === 1 ? '' : 's'}
			</p>
		</div>

		<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each filtered as listing (listing.id)}
				<div class="frame-motif flex flex-col bg-paper p-7">
					<div class="flex items-start justify-between gap-3">
						<h2 class="text-lg leading-snug font-semibold">{listing.company}</h2>
						{#if listing.founding}
							<span class="overline-label shrink-0 bg-ink px-2 py-1 text-manila">Founding</span>
						{/if}
					</div>
					<p class="mt-2 text-sm text-pencil">{listing.trade}</p>
					<p class="mt-1 font-mono text-xs text-pencil">
						{listing.metro ? `${listing.metro} · ` : ''}{listing.state}
					</p>
					{#if listing.website}
						<a
							href={listing.website.startsWith('http') ? listing.website : `https://${listing.website}`}
							rel="external nofollow"
							class="mt-5 text-sm font-medium underline underline-offset-4 hover:text-manila-deep"
						>
							Visit website
						</a>
					{/if}
				</div>
			{/each}
		</div>
	{:else}
		<div class="frame-motif mt-12 bg-canvas/40 p-12 text-center">
			<p class="overline-label text-manila-deep">Founding round in progress</p>
			<p class="mx-auto mt-4 max-w-md text-[0.95rem] leading-relaxed text-pencil">
				The first fifty founding partners are being approved right now. Listings go live the moment
				partners activate — and early partners own their metro on this map.
			</p>
			<a
				href="/apply"
				class="frame-motif mt-8 inline-block bg-ink px-8 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-manila-deep hover:text-ink"
			>
				Be the first listing in your metro
			</a>
		</div>
	{/if}
</section>
