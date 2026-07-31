<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { MSRP, TIERS, TRADE_SCALE } from '$lib/content';
	import logoBlack from '$lib/assets/iotty-black.svg';
	// switchWhite (angled) retired — replaced by model shots
	import model1gWhite from '$lib/assets/photos/model-1g-white.webp';
	import model2gWhite from '$lib/assets/photos/model-2g-white.webp';
	import model3gWhite from '$lib/assets/photos/model-3g-white.webp';
	import model4gWhite from '$lib/assets/photos/model-4g-white.webp';
	import model1gBlack from '$lib/assets/photos/model-1g-black.webp';
	import model2gBlack from '$lib/assets/photos/model-2g-black.webp';
	import model3gBlack from '$lib/assets/photos/model-3g-black.webp';
	import model4gBlack from '$lib/assets/photos/model-4g-black.webp';
	
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

	// the full line — all 8 models rotate through the hero
	const MODELS = [
		{ src: model1gWhite, caption: '1-gang · white glass' },
		{ src: model1gBlack, caption: '1-gang · black glass' },
		{ src: model2gWhite, caption: '2-gang · white glass' },
		{ src: model2gBlack, caption: '2-gang · black glass' },
		{ src: model3gWhite, caption: '3-gang · white glass' },
		{ src: model3gBlack, caption: '3-gang · black glass' },
		{ src: model4gWhite, caption: '4-gang · white glass' },
		{ src: model4gBlack, caption: '4-gang · black glass' }
	];
	let modelIndex: number = $state(0);

	onMount(() => {
		let tWord: ReturnType<typeof setTimeout>;
		const tickWord = () => {
			crossIndex = (crossIndex + 1) % CROSS_WORDS.length;
			// hold longer on the closer — "trade"
			tWord = setTimeout(tickWord, crossIndex === CROSS_WORDS.length - 1 ? 3200 : 1400);
		};
		tWord = setTimeout(tickWord, 1400);

		const tModel = setInterval(() => {
			modelIndex = (modelIndex + 1) % MODELS.length;
		}, 3500);

		return () => {
			clearTimeout(tWord);
			clearInterval(tModel);
		};
	});

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

<!-- ============ MOTIVA SEQUENCE — iotty × ____ (auto) ============ -->
<section class="flex min-h-[38vh] flex-col items-center justify-center bg-paper px-6 py-14">
	<!-- × sits at dead center; logo right-aligns to it, word grows rightward — nothing shifts -->
	<h2 class="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-x-6 text-6xl font-semibold tracking-tight sm:text-8xl">
		<span class="flex justify-end">
			<img src={logoBlack} alt="iotty" class="h-12 w-auto sm:h-20" width="111" height="55" />
		</span>
		<span class="font-mono font-normal text-canvas" aria-hidden="true">×</span>
		<span class="inline-grid overflow-hidden text-left">
			{#key crossIndex}
				<span
					in:fly={{ y: 36, duration: 420, delay: 140 }}
					out:fly={{ y: -36, duration: 320 }}
					class="col-start-1 row-start-1 whitespace-nowrap text-manila-deep"
				>
					{CROSS_WORDS[crossIndex]}
				</span>
			{/key}
		</span>
	</h2>
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
				The trade program <span class="text-manila">for The Luxury Smart Switch.</span>
			</h1>
			<p class="mt-8 max-w-xl text-lg leading-relaxed text-paper/70">
				Enroll today for trade discounts and direct support from the team that builds it — no distributor, no
				hub, no waiting.
			</p>
			<div class="mt-10 flex flex-wrap items-center gap-6">
				<a
					href="/apply"
					class="frame-motif-light bg-paper px-8 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-manila"
				>
					Claim a founding slot
				</a>
				<p class="font-mono text-sm text-paper/60">Founding spots limited</p>
			</div>
		</div>
		<figure class="frame-motif-light overflow-hidden">
			<div class="relative aspect-[4/5] max-h-[62vh] w-full">
				{#each MODELS as model, i (model.caption)}
					<img
						src={model.src}
						alt="iotty {model.caption} smart switch, backlit on a plaster wall"
						class="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
						class:opacity-0={i !== modelIndex}
						width="1000"
						height="1250"
						loading={i === 0 ? 'eager' : 'lazy'}
					/>
				{/each}
			</div>
			<figcaption class="flex items-center justify-between border-t border-paper/15 px-5 py-3 font-mono text-[0.6875rem] tracking-widest text-paper/50 uppercase">
				<span>{MODELS[modelIndex].caption} · backlit touch</span>
				<span class="text-manila/70">{modelIndex + 1} / {MODELS.length}</span>
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
				Founding partners lock <span class="font-medium text-ink">Pro pricing — 25% off MSRP — for 12 months</span>
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
				src={model4gBlack}
				alt="iotty 4-gang smart switch in black tempered glass on a limestone wall at dusk"
				class="h-full w-full object-cover"
				width="1000"
				height="1254"
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
							<th class="px-6 py-4 font-medium">Founding cost −25%</th>
							<th class="px-6 py-4 font-medium">Your margin</th>
						</tr>
					</thead>
					<tbody class="font-mono">
						{#each MSRP as row (row.sku)}
							<tr class="border-t border-canvas">
								<td class="px-6 py-3.5 font-sans font-medium">{row.sku}</td>
								<td class="px-6 py-3.5 text-pencil">${row.price}</td>
								<td class="px-6 py-3.5">${(row.price * 0.75).toFixed(2)}</td>
								<td class="px-6 py-3.5 text-manila-deep">+${(row.price * 0.25).toFixed(2)}</td>
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
				{#if i === 0}
					<ul class="mt-4 space-y-1.5 border-t border-canvas pt-4 font-mono text-xs text-pencil">
						{#each TRADE_SCALE as s (s.range)}
							<li class="flex items-baseline justify-between gap-3">
								<span>{s.range}</span>
								<span class="text-manila-deep">{s.pct}</span>
							</li>
						{/each}
					</ul>
				{/if}
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
			Apply in 5 minutes — founding spots limited
		</a>
	</div>
</section>
