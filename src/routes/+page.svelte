<script lang="ts">
	import switchWhiteHero from '$lib/assets/photos/switch-white-hero.webp';
	import model1gWhite from '$lib/assets/photos/model-1g-white.webp';
	import model4gBlack from '$lib/assets/photos/model-4g-black.webp';

	// -- The two offers. Edit here only. --
	const SIGNUP_URL = 'https://forms.gle/TNRuBjJ4HUF82Mcg8'; // Google Form — trade program sign-up
	const BOOKING_URL = 'https://calendar.app.google/ZVqpTgEoREX7qJdz9'; // "Speak With Ryan @ iotty smart home" — 15 min
	const DISCOUNT = '20%';
</script>

<svelte:head>
	<title>iotty Trade Program — Trade Pricing &amp; a Free Switch</title>
	<meta
		name="description"
		content="Join the initial iotty trade program for {DISCOUNT} off trade orders, or book a 15-minute call and get a free iotty smart switch."
	/>
</svelte:head>

<!-- ============ HERO ============ -->
<section class="bg-ink text-paper">
	<div class="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:pt-20 lg:pb-24">
		<div>
			<p class="overline-label text-manila">iotty Trade Program · Initial round</p>
			<h1 class="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
				The glass switch your clients ask about.<br />
				<span class="text-manila">Trade pricing for the pros who install it.</span>
			</h1>
			<p class="mt-6 max-w-md text-[0.95rem] leading-relaxed text-paper/70">
				For electricians, integrators, builders, and designers. Two ways in — pick one or both.
			</p>
			<div class="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
				<a
					href={SIGNUP_URL}
					target="_blank"
					rel="noopener"
					class="frame-motif-light bg-paper px-7 py-3.5 text-center text-sm font-semibold text-ink transition-colors hover:bg-manila"
				>
					Sign up — get {DISCOUNT} off
				</a>
				<a
					href={BOOKING_URL}
					target="_blank"
					rel="noopener"
					class="frame-motif-light px-7 py-3.5 text-center text-sm font-semibold text-paper transition-colors hover:bg-paper/10"
				>
					Book 15 min — get a free switch
				</a>
			</div>
		</div>
		<figure class="frame-motif-light overflow-hidden">
			<div class="aspect-[4/5] max-h-[60vh] w-full">
				<img
					src={switchWhiteHero}
					alt="iotty smart switch in white tempered glass, backlit on a wall"
					class="h-full w-full object-cover"
					width="1000"
					height="1250"
					loading="eager"
				/>
			</div>
			<figcaption class="border-t border-paper/15 px-5 py-3 font-mono text-[0.6875rem] tracking-widest text-paper/50 uppercase">
				Alexa · Google Home · Siri · SmartThings — no hub
			</figcaption>
		</figure>
	</div>
</section>

<!-- ============ TWO OFFERS ============ -->
<section id="offers" class="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
	<p class="overline-label text-pencil">Two ways in</p>
	<h2 class="mt-6 max-w-2xl text-3xl font-semibold tracking-tight">
		Lock in trade pricing, or see the switch for yourself.
	</h2>

	<div class="mt-12 grid gap-6 md:grid-cols-2">
		<!-- Offer 1 -->
		<article class="frame-motif flex flex-col p-8">
			<p class="overline-label text-manila-deep">01 · Sign up</p>
			<h3 class="mt-4 text-2xl font-semibold tracking-tight">
				Join the initial trade program. Save {DISCOUNT}.
			</h3>
			<p class="mt-4 text-sm leading-relaxed text-pencil">
				Early partners get {DISCOUNT} off trade orders. Two-minute form — no commitment, no
				minimums to sign up.
			</p>
			<ul class="mt-6 space-y-2 text-sm text-ink">
				<li>— {DISCOUNT} off as an initial-round partner</li>
				<li>— First look at full trade pricing and terms</li>
				<li>— Direct line to the iotty trade team</li>
			</ul>
			<div class="mt-auto pt-8"><a
				href={SIGNUP_URL}
				target="_blank"
				rel="noopener"
				class="frame-motif block bg-ink px-6 py-3.5 text-center text-sm font-semibold text-paper transition-colors hover:bg-manila-deep hover:text-ink"
			>
				Sign up for the trade program →
			</a></div>
		</article>

		<!-- Offer 2 -->
		<article class="frame-motif flex flex-col p-8">
			<p class="overline-label text-manila-deep">02 · Book a call</p>
			<h3 class="mt-4 text-2xl font-semibold tracking-tight">
				15 minutes with our trade team. A free switch.
			</h3>
			<p class="mt-4 text-sm leading-relaxed text-pencil">
				Book a quick call, tell us about your jobs, and we'll send you an iotty switch to
				install, demo, or hand a client.
			</p>
			<ul class="mt-6 space-y-2 text-sm text-ink">
				<li>— 15 minutes, on your schedule</li>
				<li>— A real switch in your hands, not a brochure</li>
				<li>— Trade pricing walkthrough included</li>
			</ul>
			<div class="mt-auto pt-8"><a
				href={BOOKING_URL}
				target="_blank"
				rel="noopener"
				class="frame-motif block bg-ink px-6 py-3.5 text-center text-sm font-semibold text-paper transition-colors hover:bg-manila-deep hover:text-ink"
			>
				Book a 15-minute call →
			</a></div>
		</article>
	</div>
</section>

<!-- ============ PRODUCT ============ -->
<section class="border-y border-canvas bg-canvas/40">
	<div class="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2">
		<div class="grid grid-cols-2 gap-4">
			<figure class="frame-motif overflow-hidden bg-paper">
				<img src={model1gWhite} alt="iotty 1-gang smart switch, white glass" class="h-full w-full object-cover" width="1000" height="1254" loading="lazy" />
			</figure>
			<figure class="frame-motif overflow-hidden bg-paper">
				<img src={model4gBlack} alt="iotty 4-gang smart switch, black glass" class="h-full w-full object-cover" width="1000" height="1254" loading="lazy" />
			</figure>
		</div>
		<div>
			<p class="overline-label text-pencil">The product</p>
			<h2 class="mt-6 text-3xl font-semibold tracking-tight">Italian tempered glass. Standard install.</h2>
			<ul class="mt-6 space-y-3 text-sm leading-relaxed text-pencil">
				<li>1–4 gang, white or black glass, backlit touch</li>
				<li>Alexa, Google Home, Siri Shortcuts, SmartThings — no hub required</li>
				<li>2.4GHz Wi-Fi · UL #E527071 &amp; TÜV certified</li>
			</ul>
			<p class="mt-8 text-sm text-pencil">
				Questions? <a href="mailto:trade@iottysmarthome.com" class="font-medium text-ink underline underline-offset-4">trade@iottysmarthome.com</a>
				· <a href="tel:+15512664688" class="font-medium text-ink underline underline-offset-4">(551) 266-4688</a>
			</p>
		</div>
	</div>
</section>

<!-- ============ CLOSING CTA ============ -->
<section class="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
	<h2 class="text-3xl font-semibold tracking-tight">Pick your way in.</h2>
	<div class="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
		<a href={SIGNUP_URL} target="_blank" rel="noopener" class="frame-motif bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-manila-deep hover:text-ink">
			Sign up — {DISCOUNT} off
		</a>
		<a href={BOOKING_URL} target="_blank" rel="noopener" class="frame-motif px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-canvas">
			Book 15 min — free switch
		</a>
	</div>
</section>
