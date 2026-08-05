<script lang="ts">
	import { TIERS } from '$lib/content';
	import switchWhiteHero from '$lib/assets/photos/switch-white-hero.webp';
	import switchBlack4g from '$lib/assets/photos/switch-black-4g.webp';
	import model3gWhite from '$lib/assets/photos/model-3g-white.webp';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const steps = [
		{ n: '01', t: 'Apply', d: '5 minutes. Business name, trade, license or EIN. No fees, no minimums.' },
		{ n: '02', t: 'Approved in a day', d: 'A real person reviews and calls you within 48 hours. Founding slot locked.' },
		{ n: '03', t: 'On the map', d: 'Directory listing goes live. Order at your tier price, forever.' }
	];

	const starterPacks = [
		{
			name: 'Starter',
			value: 500,
			contents: ['1× 4-gang', '1× 2-gang', '2× 1-gang', '1× dimmer module'],
			blurb: 'One statement piece plus single switches for the hallway and the closet.'
		},
		{
			name: 'Builder',
			value: 1000,
			contents: ['2× 4-gang', '2× 2-gang', '3× 1-gang', '1× dimmer module'],
			blurb: 'A real assortment across every room size — the pack most partners reorder first.'
		},
		{
			name: 'Showcase',
			value: 1800,
			contents: ['3× 4-gang', '2× 3-gang', '3× 2-gang', '4× 1-gang', '2× dimmer modules'],
			blurb: 'A full showroom wall — every configuration, ready to demo on day one.'
		}
	];
</script>

<!-- ============ HERO ============ -->
<section class="relative overflow-hidden bg-ink text-paper">
	<div class="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pt-20 pb-24 lg:grid-cols-[1.05fr_1fr]">
		<div>
			<p class="overline-label text-manila">Founding round · National · 50 slots</p>
			<h1 class="mt-6 text-5xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
				Join the directory.<br />
				Pre-order in hand.<br />
				<span class="text-manila">Earn trade pricing for life.</span>
			</h1>
			<p class="mt-6 max-w-md text-[0.95rem] leading-relaxed text-paper/70">
				The Italian tempered-glass smart switch — free to join, no minimums, and a starter pack
				you can pre-order at 20% off through August.
			</p>
			<div class="mt-10 flex flex-wrap items-center gap-6">
				<a
					href="/apply"
					class="frame-motif-light bg-paper px-8 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-manila"
				>
					Apply for a directory spot
				</a>
				<a
					href="#starter-packs"
					class="text-sm font-medium text-paper underline decoration-paper/40 underline-offset-4 hover:decoration-paper"
				>
					Pre-order a starter pack — 20% off
				</a>
			</div>
		</div>
		<figure class="frame-motif-light overflow-hidden">
			<div class="aspect-[4/5] max-h-[62vh] w-full">
				<img
					src={switchWhiteHero}
					alt="iotty smart switch in white tempered glass, backlit on a wall"
					class="h-full w-full object-cover"
					width="1000"
					height="1250"
					loading="eager"
				/>
			</div>
			<figcaption
				class="border-t border-paper/15 px-5 py-3 font-mono text-[0.6875rem] tracking-widest text-paper/50 uppercase"
			>
				Backlit touch · no hub required
			</figcaption>
		</figure>
	</div>
</section>

<!-- ============ PRODUCT ============ -->
<section id="product" class="mx-auto max-w-6xl px-6 py-24">
	<div class="grid gap-12 lg:grid-cols-2">
		<h2 class="text-4xl leading-[1.1] font-semibold tracking-tight">
			Luxury isn't plastic.<br />
			It's artisanal Italian glass.<br />
			<span class="text-manila-deep">Now, that's a smart switch.</span>
		</h2>
		<div class="flex flex-col justify-end gap-3 text-[0.95rem] leading-relaxed text-pencil">
			<p class="overline-label text-pencil">
				Alexa · Google Home · Siri Shortcuts · SmartThings — UL #E527071 &amp; TUV · no hub · 2.4GHz Wi-Fi
			</p>
			<p>Built for electricians, integrators, builders &amp; remodelers, and designers.</p>
		</div>
	</div>

	<div class="mt-16 grid gap-6 sm:grid-cols-2">
		<figure class="frame-motif overflow-hidden">
			<img
				src={switchBlack4g}
				alt="iotty 4-gang smart switch in black tempered glass"
				class="h-full w-full object-cover"
				width="1000"
				height="1254"
				loading="lazy"
			/>
			<figcaption class="border-t border-canvas px-5 py-3 font-mono text-[0.6875rem] tracking-widest text-pencil uppercase">
				4-gang · black glass
			</figcaption>
		</figure>
		<figure class="frame-motif overflow-hidden">
			<img
				src={model3gWhite}
				alt="iotty 3-gang smart switch in white tempered glass"
				class="h-full w-full object-cover"
				width="1000"
				height="1254"
				loading="lazy"
			/>
			<figcaption class="border-t border-canvas px-5 py-3 font-mono text-[0.6875rem] tracking-widest text-pencil uppercase">
				3-gang · white glass
			</figcaption>
		</figure>
	</div>
</section>

<!-- ============ PRE-ORDER STARTER PACKS ============ -->
<section id="starter-packs" class="border-y border-canvas bg-canvas/40">
	<div class="mx-auto max-w-6xl px-6 py-24">
		<p class="overline-label text-pencil">Pre-order starter packs · 20% off through August</p>
		<h2 class="mt-6 text-3xl font-semibold tracking-tight">Walk in with product in hand.</h2>
		<div class="mt-12 grid gap-6 lg:grid-cols-3">
			{#each starterPacks as pack (pack.name)}
				<div class="frame-motif flex flex-col bg-paper p-8">
					<p class="overline-label text-manila-deep">{pack.name}</p>
					<div class="mt-3 flex items-baseline gap-3">
						<p class="font-mono text-3xl text-ink">${(pack.value * 0.8).toLocaleString()}</p>
						<p class="font-mono text-sm text-pencil line-through">${pack.value.toLocaleString()}</p>
					</div>
					<p class="mt-1 font-mono text-xs text-pencil">pre-order price · 20% off list</p>
					<ul class="mt-6 space-y-1.5 font-mono text-sm text-pencil">
						{#each pack.contents as item (item)}
							<li>{item}</li>
						{/each}
					</ul>
					<p class="mt-6 flex-1 text-sm leading-relaxed text-pencil">{pack.blurb}</p>
					<a
						href="mailto:trade@iottysmarthome.com?subject=Pre-order — {pack.name} pack (20% off)"
						class="frame-motif mt-8 inline-block bg-ink px-6 py-3 text-center text-sm font-semibold text-paper transition-colors hover:bg-manila-deep hover:text-ink"
					>
						Pre-order the {pack.name}
					</a>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ============ DIRECTORY SIGN-UP ============ -->
<section id="directory" class="mx-auto max-w-6xl px-6 py-24">
	<p class="overline-label text-pencil">How it works</p>
	<h2 class="mt-6 max-w-2xl text-3xl font-semibold tracking-tight">Get listed. Get paid on every quote.</h2>
	<div class="mt-12 grid gap-10 sm:grid-cols-3">
		{#each steps as step (step.n)}
			<div>
				<p class="font-mono text-sm text-manila-deep">{step.n}</p>
				<h3 class="mt-3 text-lg font-semibold">{step.t}</h3>
				<p class="mt-2 text-sm leading-relaxed text-pencil">{step.d}</p>
			</div>
		{/each}
	</div>

	<div class="frame-motif mt-14 grid divide-y divide-canvas sm:grid-cols-3 sm:divide-x sm:divide-y-0">
		{#each TIERS as tier (tier.name)}
			<div class="p-6">
				<p class="text-sm font-semibold text-ink">{tier.name}</p>
				<p class="font-mono text-2xl text-manila-deep">{tier.discount}</p>
				<p class="overline-label mt-1 text-pencil">off MSRP</p>
			</div>
		{/each}
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
