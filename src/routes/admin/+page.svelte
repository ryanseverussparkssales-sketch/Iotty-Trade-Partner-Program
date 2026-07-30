<script lang="ts">
	import { MSRP } from '$lib/content';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// ===== Margin presenter =====
	// landed cost as % of MSRP — adjustable; Bryan can give real numbers live
	let landedPct: number = $state(30);
	let tradePct: number = $state(20);
	let proPct: number = $state(25);
	let elitePct: number = $state(35);

	interface TierRow {
		name: string;
		discount: number;
	}
	const tiers: TierRow[] = $derived([
		{ name: 'Trade', discount: tradePct },
		{ name: 'Pro', discount: proPct },
		{ name: 'Elite', discount: elitePct }
	]);

	const money = (n: number) => `$${n.toFixed(2)}`;

	function partnerCost(msrp: number, discount: number): number {
		return msrp * (1 - discount / 100);
	}
	function iottyMargin(msrp: number, discount: number): number {
		return partnerCost(msrp, discount) - msrp * (landedPct / 100);
	}
	function iottyMarginPct(msrp: number, discount: number): number {
		const cost = partnerCost(msrp, discount);
		return cost > 0 ? (iottyMargin(msrp, discount) / cost) * 100 : 0;
	}

	const funnelOrder = ['prospect', 'contacted', 'applied', 'approved', 'activated', 'ordering'];
</script>

<svelte:head>
	<title>Admin — iotty Trade Partners</title>
</svelte:head>

<section class="mx-auto max-w-6xl px-6 py-16">
	<div class="flex flex-wrap items-center justify-between gap-4">
		<div>
			<p class="overline-label text-pencil">Admin</p>
			<h1 class="mt-3 text-3xl font-semibold tracking-tight">Program dashboard</h1>
		</div>
		<a href="/account" class="text-sm text-pencil underline underline-offset-4 hover:text-ink">Back to profile</a>
	</div>

	<!-- ===== Funnel ===== -->
	{#if data.stats}
		<div class="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-canvas bg-canvas sm:grid-cols-3 lg:grid-cols-6">
			{#each funnelOrder as st (st)}
				<div class="bg-paper p-5">
					<p class="overline-label text-pencil">{st}</p>
					<p class="mt-2 font-mono text-3xl">{data.stats.by_status[st] ?? 0}</p>
				</div>
			{/each}
		</div>
		<p class="mt-3 font-mono text-xs text-pencil">
			Founding slots taken: {data.stats.founding_taken} / 50
		</p>
	{/if}

	<!-- ===== Margin presenter ===== -->
	<div class="frame-motif mt-14 bg-ink p-8 text-paper sm:p-10">
		<div class="flex flex-wrap items-baseline justify-between gap-4">
			<h2 class="text-2xl font-semibold">Margin presenter</h2>
			<p class="overline-label text-manila">Live tier modeling</p>
		</div>

		<div class="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
			<label class="block">
				<span class="overline-label text-paper/60">Landed cost — {landedPct}% of MSRP</span>
				<input type="range" min="10" max="60" step="1" bind:value={landedPct} class="mt-3 w-full accent-[#e8d5b5]" />
			</label>
			<label class="block">
				<span class="overline-label text-paper/60">Trade — {tradePct}% off</span>
				<input type="range" min="10" max="50" step="1" bind:value={tradePct} class="mt-3 w-full accent-[#e8d5b5]" />
				<span class="mt-1.5 block font-mono text-[0.6875rem] text-paper/40">Real site: 15% &lt;$500 · 20% $500–1k · 25% &gt;$1k</span>
			</label>
			<label class="block">
				<span class="overline-label text-paper/60">Pro — {proPct}% off</span>
				<input type="range" min="15" max="55" step="1" bind:value={proPct} class="mt-3 w-full accent-[#e8d5b5]" />
			</label>
			<label class="block">
				<span class="overline-label text-paper/60">Elite — {elitePct}% off</span>
				<input type="range" min="20" max="60" step="1" bind:value={elitePct} class="mt-3 w-full accent-[#e8d5b5]" />
			</label>
		</div>

		{#each tiers as tier (tier.name)}
			<div class="mt-8">
				<div class="flex items-baseline gap-4">
					<h3 class="text-lg font-semibold">{tier.name}</h3>
					<span class="font-mono text-manila">−{tier.discount}%</span>
				</div>
				<div class="mt-3 overflow-x-auto">
					<table class="w-full min-w-[560px] text-left text-sm">
						<thead>
							<tr class="border-b border-paper/15 font-mono text-[0.6875rem] tracking-widest text-paper/50 uppercase">
								<th class="py-2 pr-4 font-medium">Product</th>
								<th class="py-2 pr-4 font-medium">MSRP</th>
								<th class="py-2 pr-4 font-medium">Partner pays</th>
								<th class="py-2 pr-4 font-medium">Partner margin</th>
								<th class="py-2 pr-4 font-medium">iotty margin</th>
								<th class="py-2 font-medium">iotty %</th>
							</tr>
						</thead>
						<tbody class="font-mono">
							{#each MSRP as row (row.sku)}
								{@const cost = partnerCost(row.price, tier.discount)}
								{@const im = iottyMargin(row.price, tier.discount)}
								<tr class="border-b border-paper/10">
									<td class="py-2 pr-4 font-sans">{row.sku}</td>
									<td class="py-2 pr-4 text-paper/60">${row.price}</td>
									<td class="py-2 pr-4">{money(cost)}</td>
									<td class="py-2 pr-4 text-manila">+{money(row.price - cost)}</td>
									<td class="py-2 pr-4 {im < 0 ? 'text-red-400' : ''}">{money(im)}</td>
									<td class="py-2 {im < 0 ? 'text-red-400' : 'text-paper/70'}">{iottyMarginPct(row.price, tier.discount).toFixed(0)}%</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		{/each}
		<p class="mt-6 text-xs leading-relaxed text-paper/50">
			iotty margin = partner price − landed cost. Red means the tier sells below landed cost at that setting.
			Slide landed cost to Bryan's real number during the call — everything updates live.
		</p>
	</div>

	<!-- ===== Recent applications ===== -->
	{#if data.stats?.recent?.length}
		<div class="mt-14">
			<h2 class="text-2xl font-semibold">Recent applications</h2>
			<div class="frame-motif mt-4 overflow-hidden bg-paper">
				<table class="w-full text-left text-sm">
					<thead>
						<tr class="bg-ink font-mono text-[0.6875rem] tracking-widest text-paper uppercase">
							<th class="px-5 py-3 font-medium">Company</th>
							<th class="px-5 py-3 font-medium">Trade</th>
							<th class="px-5 py-3 font-medium">State</th>
							<th class="px-5 py-3 font-medium">Status</th>
							<th class="px-5 py-3 font-medium">Applied</th>
						</tr>
					</thead>
					<tbody>
						{#each data.stats.recent as r (r.company + r.created_at)}
							<tr class="border-t border-canvas">
								<td class="px-5 py-2.5 font-medium">{r.company}</td>
								<td class="px-5 py-2.5 text-pencil">{r.trade}</td>
								<td class="px-5 py-2.5 font-mono text-xs">{r.state}</td>
								<td class="px-5 py-2.5 text-pencil">{r.status}</td>
								<td class="px-5 py-2.5 font-mono text-xs text-pencil">{new Date(r.created_at).toLocaleDateString()}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if}
</section>
