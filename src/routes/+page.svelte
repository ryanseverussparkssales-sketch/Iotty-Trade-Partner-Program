<script lang="ts">
	import switchWhiteHero from '$lib/assets/photos/switch-white-hero.webp';
	import model4gWhite from '$lib/assets/photos/model-4g-white.webp';
	import model4gBlack from '$lib/assets/photos/model-4g-black.webp';

	// -- Klaviyo (client-side, no backend needed) --
	const KLAVIYO_PUBLIC_KEY = 'KBnFmt'; // IOTTY, LLC
	const KLAVIYO_LIST_ID = 'TqBaPp'; // "Trade Outreach Prospects"

	let name = $state('');
	let company = $state('');
	let email = $state('');
	let status: 'idle' | 'loading' | 'success' | 'error' = $state('idle');
	let errorMessage = $state('');

	async function joinProgram(e: SubmitEvent) {
		e.preventDefault();
		if (!email.trim()) return;
		status = 'loading';
		errorMessage = '';

		try {
			const res = await fetch(`https://a.klaviyo.com/client/subscriptions?company_id=${KLAVIYO_PUBLIC_KEY}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					revision: '2024-10-15'
				},
				body: JSON.stringify({
					data: {
						type: 'subscription',
						attributes: {
							profile: {
								data: {
									type: 'profile',
									attributes: {
										email: email.trim().toLowerCase(),
										first_name: name.trim() || undefined,
										properties: {
											Company: company.trim() || undefined,
											Source: 'Trade Program — Pre-Launch Page'
										}
									}
								}
							}
						},
						relationships: {
							list: { data: { type: 'list', id: KLAVIYO_LIST_ID } }
						}
					}
				})
			});

			if (res.ok) {
				status = 'success';
			} else {
				status = 'error';
				errorMessage = 'Something went wrong — email trade@iottysmarthome.com and we’ll add you directly.';
			}
		} catch {
			status = 'error';
			errorMessage = 'Something went wrong — email trade@iottysmarthome.com and we’ll add you directly.';
		}
	}
</script>

<svelte:head>
	<title>iotty Trade Partners — Join the Program</title>
	<meta
		name="description"
		content="Join the iotty Trade Partner Program before September and save 20% on every order. Early members get first placement on the partner directory."
	/>
</svelte:head>

<!-- ============ HERO ============ -->
<section class="relative overflow-hidden bg-ink text-paper">
	<div class="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pt-20 pb-24 lg:grid-cols-[1.05fr_1fr]">
		<div>
			<p class="overline-label text-manila">Pre-launch · Founding round</p>
			<h1 class="mt-6 text-5xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
				Join before September.<br />
				<span class="text-manila">Save 20% on every order.</span>
			</h1>
			<p class="mt-6 max-w-md text-[0.95rem] leading-relaxed text-paper/70">
				Sign up for a pre-launch preview of the iotty Trade Partner Program. It's free, takes
				thirty seconds, and locks in 20% off every order placed before September.
			</p>
			<div class="mt-10 flex flex-wrap items-center gap-6">
				<a
					href="#join"
					class="frame-motif-light bg-paper px-8 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-manila"
				>
					Get More Info
				</a>
				<a
					href="/apply"
					class="text-sm font-medium text-paper underline decoration-paper/40 underline-offset-4 hover:decoration-paper"
				>
					Ready to join the program →
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
				Alexa · Google Home · Siri · SmartThings — no hub required
			</figcaption>
		</figure>
	</div>
</section>

<!-- ============ WHY JOIN EARLY ============ -->
<section class="mx-auto max-w-6xl px-6 py-24">
	<p class="overline-label text-pencil">Why join before launch</p>
	<h2 class="mt-6 max-w-2xl text-3xl font-semibold tracking-tight">
		Early members get first pick — literally.
	</h2>

	<div class="mt-12 grid gap-6 sm:grid-cols-2">
		<div class="frame-motif p-8">
			<p class="overline-label text-manila-deep">Pre-launch preview</p>
			<p class="mt-4 text-sm leading-relaxed text-pencil">
				See the full trade program, pricing, and terms before we open it up to everyone else.
			</p>
		</div>
		<div class="frame-motif p-8">
			<p class="overline-label text-manila-deep">Partner directory</p>
			<p class="mt-4 text-sm leading-relaxed text-pencil">
				The first companies to join get first placement on the iotty partner directory when it goes live.
			</p>
		</div>
	</div>

	<div class="mt-6 grid gap-6 sm:grid-cols-2">
		<figure class="frame-motif overflow-hidden">
			<img
				src={model4gWhite}
				alt="iotty 4-gang smart switch in white tempered glass"
				class="h-full w-full object-cover"
				width="1000"
				height="1254"
				loading="lazy"
			/>
			<figcaption class="border-t border-canvas px-5 py-3 font-mono text-[0.6875rem] tracking-widest text-pencil uppercase">
				White finish
			</figcaption>
		</figure>
		<figure class="frame-motif overflow-hidden">
			<img
				src={model4gBlack}
				alt="iotty 4-gang smart switch in black tempered glass"
				class="h-full w-full object-cover"
				width="1000"
				height="1254"
				loading="lazy"
			/>
			<figcaption class="border-t border-canvas px-5 py-3 font-mono text-[0.6875rem] tracking-widest text-pencil uppercase">
				Black finish
			</figcaption>
		</figure>
	</div>

	<p class="mt-10 max-w-2xl text-sm leading-relaxed text-pencil">
		Italian tempered-glass smart switches. Works with Alexa, Google Home, Siri Shortcuts, and
		SmartThings — no hub required. UL #E527071 &amp; TÜV certified, 2.4GHz Wi-Fi.
	</p>
</section>

<!-- ============ JOIN FORM ============ -->
<section id="join" class="border-y border-canvas bg-canvas/40">
	<div class="mx-auto max-w-xl px-6 py-24 text-center">
		<p class="overline-label text-pencil">20% off · orders placed before September</p>
		<h2 class="mt-6 text-3xl font-semibold tracking-tight">Get More Info</h2>
		<p class="mt-4 text-sm leading-relaxed text-pencil">
			Leave your details and we'll send the pre-launch preview as soon as it's ready.
		</p>
		<p class="mt-3 text-sm text-pencil">
			Ready to join the program now?
			<a href="/apply" class="font-medium text-ink underline underline-offset-4">Full application →</a>
		</p>

		{#if status === 'success'}
			<div class="frame-motif mt-10 bg-paper p-8">
				<p class="overline-label text-manila-deep">You're in</p>
				<p class="mt-3 text-sm leading-relaxed text-pencil">
					Watch your inbox for the pre-launch preview. Ready to join the program now instead?
					<a href="/apply" class="font-medium text-ink underline underline-offset-4">Full application →</a>
				</p>
			</div>
		{:else}
			<form onsubmit={joinProgram} class="mt-10 space-y-4 text-left">
				<div>
					<label for="name" class="overline-label text-pencil">Name</label>
					<input
						id="name"
						type="text"
						bind:value={name}
						class="mt-2 w-full border-canvas bg-paper px-4 py-3 text-sm focus:border-ink focus:ring-ink"
						placeholder="Jane Rivera"
					/>
				</div>
				<div>
					<label for="company" class="overline-label text-pencil">Company</label>
					<input
						id="company"
						type="text"
						bind:value={company}
						class="mt-2 w-full border-canvas bg-paper px-4 py-3 text-sm focus:border-ink focus:ring-ink"
						placeholder="Rivera Electric"
					/>
				</div>
				<div>
					<label for="email" class="overline-label text-pencil">Email</label>
					<input
						id="email"
						type="email"
						required
						bind:value={email}
						class="mt-2 w-full border-canvas bg-paper px-4 py-3 text-sm focus:border-ink focus:ring-ink"
						placeholder="jane@riveraelectric.com"
					/>
				</div>

				{#if status === 'error'}
					<p class="text-sm text-red-700">{errorMessage}</p>
				{/if}

				<button
					type="submit"
					disabled={status === 'loading'}
					class="frame-motif w-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-manila-deep hover:text-ink disabled:opacity-50"
				>
					{status === 'loading' ? 'Sending…' : 'Get More Info'}
				</button>
			</form>
		{/if}
	</div>
</section>

<!-- ============ FOOTER ADMIN LINK ============ -->
<div class="mx-auto max-w-6xl px-6 py-6 text-right">
	<a
		href="https://iotty-trade-partner-program.vercel.app/admin"
		class="font-mono text-[0.6875rem] tracking-widest text-pencil/50 uppercase hover:text-pencil"
	>
		Admin →
	</a>
</div>
