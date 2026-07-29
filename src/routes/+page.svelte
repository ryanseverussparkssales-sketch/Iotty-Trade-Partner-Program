<script lang="ts">
	import { fade } from 'svelte/transition';
	import { MSRP, TIERS } from '$lib/content';
	import switchHero from '$lib/assets/photos/switch-white-hero.webp';
	import switchWhite from '$lib/assets/photos/switch-white-angled.webp';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Motiva-style scroll sequence — "iotty × ____", ending on trade
	const CROSS_WORDS = [
		'design',
		'install',
		'smart home',
		'lighting',
		'outlets',
		'builders',
		'remodelers',
		'innovation',
		'trade'
	];
	let crossIndex: number = $state(0);
	let crossWrap: HTMLElement | null = $state(null);

	function onScroll() {
		if (!crossWrap) return;
		const total = crossWrap.offsetHeight - window.innerHeight;
		if (total <= 0) return;
		const progress = Math.min(1, Math.max(0, -crossWrap.getBoundingClientRect().top / total));
		crossIndex = Math.min(CROSS_WORDS.length - 1, Math.floor(progress * CROSS_WORDS.length));
	}

	const segments = [
		{
			label: 'Electricians',
			line: 'Same box, same 15 minutes of wire time — 4× the ticket. A glass upgrade on every reno and panel job.'
		},
		{
			label: 'Custom integrators',
			line: 'The switch that finally matches the rest of a $200k system. Glass, backlit, no hub, no programming labor.'
		},
		{
			label: 'Builders',
			line: 'Two switches in the model home kitchen is the cheapest wow on your options sheet.'
		},
		{
			label: 'Designers',
			line: 'The one smart-home product that belongs on a mood board. Trade pricing; your electrician handles install.'
		}
	];

	const steps = [
		{ n: '01', t: 'Apply', d: '5 minutes. Business name, trade, license or EIN. No fees, no minimums.' },
		{ n: '02', t: 'Approved in a day', d: 'A real person reviews and calls you within 48 hours. Founding slot locked.' },
		{ n: '03', t: 'Demo kit ships', d: 'Half price, first switch free. Install it in your own place this weekend.' },
		{ n: '04', t: 'You’re on the map', d: 'Directory listing live. Order per-project at your tier price, forever.' }
	];
</script>

<svelte:window onscroll={onScroll} />

<!-- ============ MOTIVA SCROLL — iotty × ____ ============ -->
<section bind:this={crossWrap} class="relative" style="height: {CROSS_WORDS.length * 52}vh">
	<div class="sticky top-0 flex h-screen flex-col items-center justify-center bg-paper px-6">
		<p class="overline-label mb-8 text-pencil">
			{String(crossIndex + 1).padStart(2, '0')} / {String(CROSS_WORDS.length).padStart(2, '0')}
		</p>
		<h2 class="flex flex-wrap items-baseline justify-center gap-x-5 text-center text-6xl font-semibold tracking-tight sm:text-8xl">
			<span>iotty</span>
			<span class="font-mono font-normal text-canvas" aria-hidden="true">×</span>
			{#key crossIndex}
				<span in:fade={{ duration: 250 }} class="text-manila-deep">{CROSS_WORDS[crossIndex]}</span>
			{/key}
		</h2>
		<p class="overline-label mt-10 text-pencil/60" class:invisible={crossIndex === CROSS_WORDS.length - 1}>
			Keep scrolling
		</p>
	</div>
</section>

<!-- ============ HERO ============ -->
<section class="relative overflow-hidden bg-ink text-paper">
	<!-- letter-grid backdrop, Motiva-style -->
	<div
		aria-hidden="true"
		class="pointer-events-none absolute inset-0 font-mono text-[11px] leading-[2.2] tracking-[0.6em] text-paper/[0.05] select-none"
	>
		{#each Array(28) as _, row (row)}
			<div class="whitespace-nowrap">IOTTYTRADEPARTNERSIOTTYTRADEPARTNERSIOTTYTRADEPARTNERSIOTTYTRADE</div>
		{/each}
	</div>

	<div class="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pt-20 pb-24 lg:grid-cols-[1.05fr_1fr]">
		<div>
			<p class="overline-label text-manila">The trade program · Founding round</p>
			<h1 class="mt-6 text-5xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
				The trade program <span class="text-manila">for the glass switch.</span>
			</h1>
			<p class="mt-8 max-w-xl text-lg leading-relaxed text-paper/70">
				Italian tempered glass. Backlit touch. No hub. iotty is opening its US trade channel — and holding
				<span class="font-mono text-manila">{data.foundingCap}</span> founding slots for the professionals who get there first.
			</p>
			<div class="mt-10 flex flex-wrap items-center gap-6">
				<a
					href="/apply"
					class="frame-motif-light bg-paper px-8 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-manila"
				>
					Claim a founding slot
				</a>
				<p class="font-mono text-sm text-paper/60">
					<span class="text-manila">{data.foundingRemaining}</span> / {data.foundingCap} remaining
				</p>
			</div>
		</div>
		<figure class="frame-motif-light max-h-[70vh] overflow-hidden">
			<img
				src={switchHero}
				alt="iotty 1-gang smart dimmer switch in white tempered glass on a plaster wall, glowing with warm backlight"
				class="h-full w-full object-cover"
				width="1000"
				height="1241"
				loading="lazy"
			/>
			<figcaption class="border-t border-paper/15 px-5 py-3 font-mono text-[0.6875rem] tracking-widest text-paper/50 uppercase">
				1-gang · white glass · backlit touch
			</figcaption>
		</figure>
	</div>
</section>

<!-- ============ WHY / PROGRAM ============ -->
<section id="program" class="mx-auto max-w-6xl px-6 py-24">
	<div class="grid gap-12 lg:grid-cols-2">
		<h2 class="text-4xl leading-[1.1] font-semibold tracking-tight">
			The switch your clients show&nbsp;off.
			<span class="text-manila-deep">The program that pays you to install it.</span>
		</h2>
		<div class="space-y-5 text-[0.95rem] leading-relaxed text-pencil">
			<p>
				The trade decides what goes in walls. So instead of spending everything on ads, iotty is putting margin
				where it belongs: with the electricians, integrators, builders, and designers who put the product in front
				of homeowners every day.
			</p>
			<p>
				Founding partners lock <span class="font-medium text-ink">Pro pricing — 35% off MSRP — for 12 months</span>
				regardless of volume, get a listing on the installer directory the day it launches, and get their first
				glass switch free with the demo kit.
			</p>
			<p class="overline-label pt-2 text-pencil">
				Alexa · Google Home · Siri Shortcuts · SmartThings — UL #E527071 &amp; TUV · no hub · 2.4GHz Wi-Fi
			</p>
		</div>
	</div>

	<div class="mt-16 grid items-stretch gap-6 lg:grid-cols-[1fr_1.6fr]">
		<figure class="frame-motif hidden overflow-hidden lg:block">
			<img
				src={switchWhite}
				alt="iotty 4-gang smart switch in white tempered glass, photographed at an angle"
				class="h-full w-full object-cover"
				width="1200"
				height="675"
				loading="lazy"
			/>
		</figure>
		<div class="grid gap-px overflow-hidden border border-canvas bg-canvas sm:grid-cols-2">
			{#each segments as seg (seg.label)}
				<div class="bg-paper p-8">
					<p class="overline-label text-manila-deep">{seg.label}</p>
					<p class="mt-4 text-sm leading-relaxed text-pencil">{seg.line}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ============ THE MATH ============ -->
<section id="math" class="border-y border-canvas bg-canvas/40">
	<div class="mx-auto max-w-6xl px-6 py-24">
		<p class="overline-label text-pencil">Partner economics</p>
		<h2 class="mt-6 max-w-2xl text-3xl font-semibold tracking-tight">
			Same 15 minutes of labor. Four times the ticket.
		</h2>
		<div class="mt-12 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
			<div class="frame-motif overflow-hidden bg-paper">
				<table class="w-full text-left text-sm">
					<thead>
						<tr class="bg-ink font-mono text-[0.6875rem] tracking-widest text-paper uppercase">
							<th class="px-6 py-4 font-medium">Product</th>
							<th class="px-6 py-4 font-medium">MSRP</th>
							<th class="px-6 py-4 font-medium">Founding cost −35%</th>
							<th class="px-6 py-4 font-medium">Your margin</th>
						</tr>
					</thead>
					<tbody class="font-mono">
						{#each MSRP as row (row.sku)}
							<tr class="border-t border-canvas">
								<td class="px-6 py-3.5 font-sans font-medium">{row.sku}</td>
								<td class="px-6 py-3.5 text-pencil">${row.price}</td>
								<td class="px-6 py-3.5">${(row.price * 0.65).toFixed(2)}</td>
								<td class="px-6 py-3.5 text-manila-deep">+${(row.price * 0.35).toFixed(2)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<div class="space-y-5 text-[0.95rem] leading-relaxed text-pencil">
				<p>
					Bill at MSRP inside the job — or bundle it into the quote — and a single 2-gang box clears
					<span class="font-medium text-ink">$45.50 before labor</span>, on the same wire time as a $25 commodity
					switch.
				</p>
				<p>
					A modest reno with six gangs of iotty is <span class="font-medium text-ink">$250+ of product margin</span>
					you're currently leaving on the truck — before the upsell does what upsells do for the rest of the invoice.
				</p>
				<p class="font-mono text-xs">
					Dimming is added per-switch with the $27 module — quote it on every dimmable circuit.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- ============ TIERS ============ -->
<section id="tiers" class="mx-auto max-w-6xl px-6 py-24">
	<p class="overline-label text-pencil">Three tiers</p>
	<h2 class="mt-6 text-3xl font-semibold tracking-tight">Free to join. Priced like a trade brand should be.</h2>
	<div class="mt-12 grid gap-6 lg:grid-cols-3">
		{#each TIERS as tier, i (tier.name)}
			<div class="frame-motif flex flex-col p-8 {i === 1 ? 'bg-ink text-paper' : 'bg-paper'}">
				<div class="flex items-baseline justify-between">
					<h3 class="text-xl font-semibold">{tier.name}</h3>
					<span class="font-mono text-2xl {i === 1 ? 'text-manila' : 'text-manila-deep'}">{tier.discount}</span>
				</div>
				<p class="overline-label mt-1 {i === 1 ? 'text-paper/50' : 'text-pencil'}">off MSRP</p>
				<p class="mt-6 font-mono text-xs {i === 1 ? 'text-paper/60' : 'text-pencil'}">{tier.qualification}</p>
				<ul class="mt-6 space-y-3 text-sm {i === 1 ? 'text-paper/80' : 'text-pencil'}">
					{#each tier.perks as perk (perk)}
						<li class="flex gap-3">
							<span class="{i === 1 ? 'text-manila' : 'text-manila-deep'}">—</span>
							{perk}
						</li>
					{/each}
				</ul>
				{#if i === 1}
					<p class="mt-8 border-t border-paper/15 pt-5 text-sm text-manila">
						Founding partners start here — locked 12 months, no volume requirement.
					</p>
				{/if}
			</div>
		{/each}
	</div>
</section>

<!-- ============ HOW IT WORKS ============ -->
<section class="border-y border-canvas bg-canvas/40">
	<div class="mx-auto max-w-6xl px-6 py-24">
		<p class="overline-label text-pencil">How it works</p>
		<div class="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
			{#each steps as step (step.n)}
				<div>
					<p class="font-mono text-sm text-manila-deep">{step.n}</p>
					<h3 class="mt-3 text-lg font-semibold">{step.t}</h3>
					<p class="mt-2 text-sm leading-relaxed text-pencil">{step.d}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ============ CLOSING CTA ============ -->
<section class="bg-ink text-paper">
	<div class="mx-auto max-w-6xl px-6 py-24 text-center">
		<p class="overline-label text-manila">Founding round · National</p>
		<h2 class="mx-auto mt-6 max-w-2xl text-4xl leading-tight font-semibold tracking-tight">
			Fifty slots. One per company. <span class="text-manila">Own your metro on the map.</span>
		</h2>
		<a
			href="/apply"
			class="frame-motif-light mt-10 inline-block bg-paper px-10 py-4 text-sm font-semibold text-ink transition-colors hover:bg-manila"
		>
			Apply in 5 minutes — {data.foundingRemaining} slots left
		</a>
	</div>
</section>
