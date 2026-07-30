<script lang="ts">
	import closerVideo from '$lib/assets/video/iotty-closer.mp4';
	import closerPoster from '$lib/assets/video/closer-poster.webp';

	// Drop the YouTube video ID here (the part after v= or youtu.be/) to go live.
	const YOUTUBE_ID = 'yztD6529Cr8';

	// ===== the outreach cycle, drawn as a ring =====
	const CYCLE = [
		{ n: '01', label: 'Source', note: 'Licenses, CEDIA, ASID, Maps' },
		{ n: '02', label: 'Enrich', note: 'Contact, socials, fit score' },
		{ n: '03', label: 'Queue', note: 'Top 20 by score, due today' },
		{ n: '04', label: 'Touch', note: 'Call + email, 8 over 14 days' },
		{ n: '05', label: 'Disposition', note: 'Connect, objection, DNC' },
		{ n: '06', label: 'Convert', note: 'Application → approval' }
	];

	const R = 250;
	const CX = 400;
	const CY = 400;
	const rad = (deg: number) => (deg * Math.PI) / 180;
	const px = (deg: number, r = R) => CX + r * Math.cos(rad(deg));
	const py = (deg: number, r = R) => CY + r * Math.sin(rad(deg));
	// node i sits at -90 + 60i degrees
	const nodeAngle = (i: number) => -90 + i * 60;
	// arc from node i to node i+1, with a gap so arrows don't collide with circles
	const GAP = 15;
	const arc = (i: number) => {
		const a1 = nodeAngle(i) + GAP;
		const a2 = nodeAngle(i) + 60 - GAP;
		return `M ${px(a1).toFixed(1)} ${py(a1).toFixed(1)} A ${R} ${R} 0 0 1 ${px(a2).toFixed(1)} ${py(a2).toFixed(1)}`;
	};

	const dbTables = [
		{
			name: 'partners',
			role: 'One row per company — forever',
			cols: ['company · contact · email · phone', 'trade · state · metro', 'status · founding · source', 'fit_score · enrichment · socials', 'last_touch_at · cadence_step']
		},
		{
			name: 'touches',
			role: 'Every call, email, voicemail',
			cols: ['channel · direction', 'disposition · objection', 'cadence_step · agent', '→ trigger rolls up to partner']
		},
		{
			name: 'daily_call_queue',
			role: 'View — who gets a human today',
			cols: ['top 20 by fit_score', 'has phone, not touched today', 'prospect + contacted only']
		},
		{
			name: 'directory_listings',
			role: 'View — what the public sees',
			cols: ['approved · activated · ordering', 'company · trade · metro · site', 'no contact data exposed']
		}
	];

	const stages = ['prospect', 'contacted', 'applied', 'approved', 'activated', 'ordering'];
</script>

<svelte:head>
	<title>iotty Trade Partners — system demo</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<!-- ============ BANNER ============ -->
<section class="bg-paper">
	<video
		src={closerVideo}
		poster={closerPoster}
		autoplay
		muted
		loop
		playsinline
		class="h-auto w-full"
		aria-label="iotty × growth"
	></video>
</section>

<!-- ============ INTRO ============ -->
<section class="mx-auto max-w-6xl px-6 pt-16 pb-10">
	<p class="overline-label text-pencil">The system behind the program</p>
	<h1 class="mt-5 max-w-3xl text-4xl leading-[1.1] font-semibold tracking-tight sm:text-5xl">
		Not a landing page. <span class="text-manila-deep">A channel that runs itself.</span>
	</h1>
	<p class="mt-6 max-w-2xl text-[0.95rem] leading-relaxed text-pencil">
		Prospecting, outreach, applications, approvals, and the installer directory all live in one
		database. Fifty new qualified trade contacts enter it every day; partners come out the other end
		listed on the map. Here's what's under it.
	</p>
</section>

<!-- ============ VIDEO FRAME ============ -->
<section class="mx-auto max-w-6xl px-6 pb-20">
	<div class="frame-motif overflow-hidden bg-ink">
		{#if YOUTUBE_ID}
			<div class="aspect-video w-full">
				<iframe
					class="h-full w-full"
					src="https://www.youtube-nocookie.com/embed/{YOUTUBE_ID}?rel=0"
					title="iotty Trade Partners walkthrough"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>
			</div>
		{:else}
			<div class="flex aspect-video w-full flex-col items-center justify-center gap-4 text-paper/40">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="h-16 w-16">
					<circle cx="12" cy="12" r="10" />
					<path d="M10 8.5v7l6-3.5-6-3.5z" fill="currentColor" stroke="none" />
				</svg>
				<p class="overline-label">Walkthrough video</p>
			</div>
		{/if}
	</div>
	<p class="mt-3 font-mono text-[0.6875rem] tracking-widest text-pencil uppercase">
		Full system walkthrough · {YOUTUBE_ID ? 'watch above' : 'coming shortly'}
	</p>
</section>

<!-- ============ THE DATABASE ============ -->
<section class="border-y border-canvas bg-canvas/40">
	<div class="mx-auto max-w-6xl px-6 py-20">
		<p class="overline-label text-pencil">01 — The database</p>
		<h2 class="mt-5 max-w-2xl text-3xl font-semibold tracking-tight">
			One table holds the whole funnel.
		</h2>
		<p class="mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-pencil">
			A prospect the agents find and a partner who applies on the site are the same row — status is
			the only thing that changes. No exports, no syncing, no CRM to reconcile.
		</p>

		<!-- status pipeline -->
		<div class="mt-10 flex flex-wrap items-center gap-2">
			{#each stages as s, i (s)}
				<span class="frame-motif bg-paper px-4 py-2 font-mono text-xs tracking-widest uppercase">{s}</span>
				{#if i < stages.length - 1}
					<span class="text-manila-deep" aria-hidden="true">→</span>
				{/if}
			{/each}
		</div>

		<div class="mt-10 grid gap-px overflow-hidden border border-canvas bg-canvas sm:grid-cols-2">
			{#each dbTables as t (t.name)}
				<div class="bg-paper p-7">
					<p class="font-mono text-sm font-medium text-manila-deep">{t.name}</p>
					<p class="mt-1 text-sm font-medium">{t.role}</p>
					<ul class="mt-4 space-y-1.5 font-mono text-xs text-pencil">
						{#each t.cols as c (c)}
							<li>{c}</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
		<p class="mt-6 font-mono text-xs text-pencil">
			Postgres · row-level security · public site reads nothing it shouldn't
		</p>
	</div>
</section>

<!-- ============ THE CYCLE ============ -->
<section class="mx-auto max-w-6xl px-6 py-20">
	<p class="overline-label text-pencil">02 — The cycle</p>
	<h2 class="mt-5 max-w-2xl text-3xl font-semibold tracking-tight">
		Prospecting and outreach, running in a loop.
	</h2>

	<div class="mt-12 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
		<svg viewBox="0 0 800 800" class="w-full" role="img" aria-label="The prospecting and outreach cycle">
			<defs>
				<marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
					<path d="M 0 0 L 10 5 L 0 10 z" fill="#c9a96e" />
				</marker>
			</defs>

			<!-- centre -->
			<circle cx={CX} cy={CY} r="118" fill="#0d0d0d" />
			<text x={CX} y={CY - 14} text-anchor="middle" class="fill-[#e8d5b5] font-mono text-[13px] tracking-[0.2em] uppercase">shared</text>
			<text x={CX} y={CY + 12} text-anchor="middle" class="fill-[#fafaf8] text-[22px] font-semibold">database</text>
			<text x={CX} y={CY + 40} text-anchor="middle" class="fill-[#fafaf8]/50 font-mono text-[11px] tracking-widest uppercase">50 / day in</text>

			<!-- arcs -->
			{#each CYCLE as _, i (i)}
				<path d={arc(i)} fill="none" stroke="#c9a96e" stroke-width="2" marker-end="url(#arrow)" opacity="0.85" />
			{/each}

			<!-- nodes -->
			{#each CYCLE as step, i (step.n)}
				{@const x = px(nodeAngle(i))}
				{@const y = py(nodeAngle(i))}
				{@const side = i === 0 || i === 3 ? 'mid' : x > CX ? 'right' : 'left'}
				<circle cx={x} cy={y} r="58" fill="#fafaf8" stroke="#0d0d0d" stroke-width="1.5" />
				<text x={x} y={y - 16} text-anchor="middle" class="fill-[#c9a96e] font-mono text-[12px]">{step.n}</text>
				<text x={x} y={y + 6} text-anchor="middle" class="fill-[#0d0d0d] text-[16px] font-semibold">{step.label}</text>
				<!-- notes read outward so they never crowd the centre -->
				<text
					x={side === 'right' ? x - 34 : side === 'left' ? x + 34 : x}
					y={y + 90}
					text-anchor={side === 'right' ? 'start' : side === 'left' ? 'end' : 'middle'}
					class="fill-[#6b6b68] font-mono text-[11px]">{step.note}</text
				>
			{/each}
		</svg>

		<div class="space-y-6 text-[0.95rem] leading-relaxed text-pencil">
			<p>
				<span class="font-medium text-ink">Agents source and enrich overnight.</span> Collectors work state
				license databases, the CEDIA directory, design rosters, and Maps — weighted to the metros where
				iotty already sells.
			</p>
			<p>
				<span class="font-medium text-ink">The queue is built, not chosen.</span> Every morning the top
				contacts by fit score who are due for a phone touch land in one list. Phone time goes to the best
				twenty, not to whoever's alphabetically first.
			</p>
			<p>
				<span class="font-medium text-ink">Every touch writes back.</span> Connects, voicemails, objections
				heard, do-not-calls — all logged against the company, so cadence position is always current and nobody
				gets called twice.
			</p>
			<p>
				<span class="font-medium text-ink">Conversion closes the loop.</span> An application from the site
				lands in the same row the agents created. Approve it and the partner appears on the public directory.
			</p>
		</div>
	</div>
</section>

<!-- ============ KNOWLEDGE BASE ============ -->
<section class="border-y border-canvas bg-canvas/40">
	<div class="mx-auto max-w-6xl px-6 py-20">
		<div class="flex flex-wrap items-baseline justify-between gap-4">
			<div>
				<p class="overline-label text-pencil">03 — Install knowledge base</p>
				<h2 class="mt-5 max-w-2xl text-3xl font-semibold tracking-tight">
					The support layer partners never have to call about.
				</h2>
			</div>
			<span class="overline-label bg-ink px-3 py-1.5 text-manila">On the roadmap</span>
		</div>
		<p class="mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-pencil">
			Every install question an electrician asks once, answered permanently — searchable by the partner,
			and answerable by an agent on the phone at 7am.
		</p>

		<div class="mt-10 grid gap-px overflow-hidden border border-canvas bg-canvas sm:grid-cols-2 lg:grid-cols-4">
			{#each [{ t: 'Wiring & install', d: 'Neutral requirements, box depth, 3-way, multi-gang layouts, the 10-minute swap.' }, { t: 'Network & setup', d: '2.4GHz reality, app pairing, Alexa / Google / Siri / SmartThings, client handoff.' }, { t: 'Troubleshooting', d: 'The dozen things that go wrong, and the fix — before it becomes a callback.' }, { t: 'Sell sheets', d: 'Client-facing one-pagers, spec sheets, photography partners can put in a proposal.' }] as card (card.t)}
				<div class="bg-paper p-7">
					<p class="font-medium">{card.t}</p>
					<p class="mt-3 text-sm leading-relaxed text-pencil">{card.d}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ============ PHYSICAL COLLATERAL ============ -->
<section class="mx-auto max-w-6xl px-6 py-20">
	<p class="overline-label text-pencil">04 — In the partner's hands</p>
	<h2 class="mt-5 max-w-2xl text-3xl font-semibold tracking-tight">
		The glass does the selling. These put it in front of the client.
	</h2>

	<div class="mt-12 grid gap-8 lg:grid-cols-2">
		<figure>
			<div class="flex aspect-[4/3] items-center justify-center border border-dashed border-canvas bg-canvas/30">
				<p class="overline-label text-pencil/60">Demo board mockup</p>
			</div>
			<figcaption class="mt-4">
				<p class="font-medium">The demo board</p>
				<p class="mt-2 text-sm leading-relaxed text-pencil">
					Live switches on a carryable board — powered, backlit, dimming. What an integrator sets on the
					kitchen island at the design meeting, and what an electrician keeps in the truck.
				</p>
			</figcaption>
		</figure>

		<figure>
			<div class="flex aspect-[4/3] items-center justify-center border border-dashed border-canvas bg-canvas/30">
				<p class="overline-label text-pencil/60">Design booklet mockup</p>
			</div>
			<figcaption class="mt-4">
				<p class="font-medium">The design booklet</p>
				<p class="mt-2 text-sm leading-relaxed text-pencil">
					Finishes, gang configurations, and room photography in a piece a designer will actually leave on
					a client's table — the mood-board argument for the whole line.
				</p>
			</figcaption>
		</figure>
	</div>
</section>

<!-- ============ CLOSE ============ -->
<section class="bg-ink text-paper">
	<div class="mx-auto max-w-6xl px-6 py-20 text-center">
		<p class="overline-label text-manila">Founding round · National</p>
		<h2 class="mx-auto mt-6 max-w-2xl text-4xl leading-tight font-semibold tracking-tight">
			The channel is built. <span class="text-manila">Now it just needs partners.</span>
		</h2>
		<div class="mt-10 flex flex-wrap items-center justify-center gap-5">
			<a href="/apply" class="frame-motif-light bg-paper px-8 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-manila">
				Apply in 5 minutes
			</a>
			<a href="/" class="text-sm text-paper/60 underline underline-offset-4 hover:text-paper">Back to the program</a>
		</div>
	</div>
</section>
