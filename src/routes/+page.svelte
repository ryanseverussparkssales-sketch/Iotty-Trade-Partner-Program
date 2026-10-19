<script lang="ts">
	import switchWhiteHero from '$lib/assets/photos/switch-white-hero.webp';
	import model1gWhite from '$lib/assets/photos/model-1g-white.webp';
	import model4gBlack from '$lib/assets/photos/model-4g-black.webp';
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { TRADES, US_STATES } from '$lib/content';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
	let submitting = $state(false);
	const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
	const VOLUMES = ['Just getting started', '1–10', '11–50', '50+'];
	const inputClass =
		'mt-2 w-full border-canvas bg-paper px-4 py-3 text-sm focus:border-ink focus:ring-ink placeholder:text-pencil/50';
	const val = (k: string) => ((form as any)?.values?.[k] as string) ?? '';

	// -- The two offers. Edit here only. --
	const SIGNUP_URL = '#signup'; // native form below
	const GOOGLE_FORM_URL = 'https://forms.gle/TNRuBjJ4HUF82Mcg8'; // backup
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
				Alexa · Google Home · Siri Shortcuts · SmartThings — no hub
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

<!-- ============ SIGN-UP FORM ============ -->
<section id="signup" class="scroll-mt-20 border-t border-canvas bg-canvas/40">
	<div class="mx-auto max-w-xl px-4 py-20 sm:px-6">
		<p class="overline-label text-pencil">{DISCOUNT} off · initial trade program</p>
		<h2 class="mt-6 text-3xl font-semibold tracking-tight">Sign up for trade pricing.</h2>
		<p class="mt-4 text-sm leading-relaxed text-pencil">One minute. No fees, no minimums to sign up.</p>

		{#if form?.success}
			<div class="frame-motif mt-10 bg-paper p-8">
				<p class="overline-label text-manila-deep">You're in</p>
				<h3 class="mt-3 text-xl font-semibold">Your {DISCOUNT} trade discount is locked in.</h3>
				<p class="mt-3 text-sm leading-relaxed text-pencil">
					Our trade team will reach out within one business day. Want a free switch while you wait?
				</p>
				<a
					href={BOOKING_URL}
					target="_blank"
					rel="noopener"
					class="frame-motif mt-6 block bg-ink px-6 py-3.5 text-center text-sm font-semibold text-paper transition-colors hover:bg-manila-deep hover:text-ink"
				>
					Book 15 min — get a free switch →
				</a>
			</div>
		{:else}
			<form
				method="POST"
				action="?/signup"
				class="mt-10 space-y-5"
				use:enhance={() => {
					submitting = true;
					return async ({ update }) => {
						await update({ reset: false });
						submitting = false;
					};
				}}
			>
				{#if form?.error}
					<p class="border border-manila-deep bg-manila/20 px-4 py-3 text-sm">{form.error}</p>
				{/if}

				<div class="grid gap-5 sm:grid-cols-2">
					<div>
						<label for="contact_name" class="overline-label text-pencil">Name</label>
						<input id="contact_name" name="contact_name" required autocomplete="name" value={val('contact_name')} class={inputClass} placeholder="Jane Rivera" />
					</div>
					<div>
						<label for="company" class="overline-label text-pencil">Company</label>
						<input id="company" name="company" required autocomplete="organization" value={val('company')} class={inputClass} placeholder="Rivera Electric" />
					</div>
					<div>
						<label for="email" class="overline-label text-pencil">Email</label>
						<input id="email" name="email" type="email" required autocomplete="email" value={val('email')} class={inputClass} placeholder="jane@riveraelectric.com" />
					</div>
					<div>
						<label for="phone" class="overline-label text-pencil">Phone</label>
						<input id="phone" name="phone" type="tel" required autocomplete="tel" value={val('phone')} class={inputClass} placeholder="(555) 555-0123" />
					</div>
					<div>
						<label for="trade" class="overline-label text-pencil">Trade</label>
						<select id="trade" name="trade" required class={inputClass}>
							<option value="" disabled selected={!val('trade')}>Select…</option>
							{#each TRADES as t}<option value={t} selected={val('trade') === t}>{t}</option>{/each}
						</select>
					</div>
					<div>
						<label for="state" class="overline-label text-pencil">State</label>
						<select id="state" name="state" required class={inputClass}>
							<option value="" disabled selected={!val('state')}>Select…</option>
							{#each US_STATES as st}<option value={st} selected={val('state') === st}>{st}</option>{/each}
						</select>
					</div>
				</div>
				<div>
					<label for="volume" class="overline-label text-pencil">Smart-switch jobs per year</label>
					<select id="volume" name="volume" class={inputClass}>
						<option value="" selected={!val('volume')}>Optional</option>
						{#each VOLUMES as vol}<option value={vol} selected={val('volume') === vol}>{vol}</option>{/each}
					</select>
				</div>

				{#each UTM_KEYS as k}
					{#if page.url.searchParams.get(k)}<input type="hidden" name={k} value={page.url.searchParams.get(k)} />{/if}
				{/each}
				<div class="hidden" aria-hidden="true">
					<input name="website_hp" tabindex="-1" autocomplete="off" />
				</div>

				<button
					type="submit"
					disabled={submitting}
					class="frame-motif w-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-manila-deep hover:text-ink disabled:opacity-50"
				>
					{submitting ? 'Signing you up…' : `Lock in ${DISCOUNT} off →`}
				</button>
				<p class="text-center text-xs text-pencil">
					Trouble with the form? <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener" class="underline underline-offset-4">Use the Google Form</a>
				</p>
			</form>
		{/if}
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
			<h2 class="mt-6 text-3xl font-semibold tracking-tight">Italian tempered glass. Ten-minute install.</h2>
			<ul class="mt-6 space-y-3 text-sm leading-relaxed text-pencil">
				<li>1–4 gang, white or black glass, customizable backlit touch</li>
				<li>Fits standard US electrical boxes · add-on dimmer module per switch · multi-way supported</li>
				<li>Alexa, Google Home, Siri Shortcuts, SmartThings — no hub required</li>
				<li>2.4GHz Wi-Fi · UL #E527071 &amp; TÜV certified</li>
			</ul>
			<p class="mt-8 text-sm text-pencil">
				Questions? <a href="mailto:ryan@iottysmarthome.com" class="font-medium text-ink underline underline-offset-4">ryan@iottysmarthome.com</a>
				· <a href="tel:+15512664688" class="font-medium text-ink underline underline-offset-4">(551) 266-4688</a>
			</p>
		</div>
	</div>
</section>

<!-- ============ CLOSING CTA ============ -->
<section class="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
	<h2 class="text-3xl font-semibold tracking-tight">Pick your way in.</h2>
	<div class="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
		<a href={SIGNUP_URL} class="frame-motif bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-manila-deep hover:text-ink">
			Sign up — {DISCOUNT} off
		</a>
		<a href={BOOKING_URL} target="_blank" rel="noopener" class="frame-motif px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-canvas">
			Book 15 min — free switch
		</a>
	</div>
</section>
