<script lang="ts">
	import '../app.css';
	import '@fontsource-variable/inter';
	import '@fontsource/ibm-plex-mono/400.css';
	import '@fontsource/ibm-plex-mono/500.css';
	import favicon from '$lib/assets/favicon.svg';
	import type { Snippet } from 'svelte';
	import type { LayoutServerData } from './$types';

	let { children, data }: { children: Snippet; data: LayoutServerData } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>iotty Trade Partners — the trade program for the glass switch</title>
	<meta
		name="description"
		content="Trade pricing, an installer directory, and founding-partner status for electricians, integrators, builders, and designers. 50 founding slots nationally."
	/>
</svelte:head>

<header class="sticky top-0 z-50 border-b border-canvas bg-paper/90 backdrop-blur">
	<div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
		<a href="/" class="flex items-baseline gap-3">
			<span class="text-lg font-semibold tracking-tight">iotty</span>
			<span class="overline-label text-pencil">Trade Partners</span>
		</a>
		<nav class="flex items-center gap-8">
			<a href="/#program" class="hidden text-sm text-pencil transition-colors hover:text-ink sm:block">Program</a>
			<a href="/#math" class="hidden text-sm text-pencil transition-colors hover:text-ink sm:block">The math</a>
			<a href="/#tiers" class="hidden text-sm text-pencil transition-colors hover:text-ink sm:block">Tiers</a>
			<a href="/directory" class="hidden text-sm text-pencil transition-colors hover:text-ink sm:block">Directory</a>
			<a
				href="/apply"
				class="frame-motif bg-ink px-5 py-2 text-sm font-medium text-paper transition-colors hover:bg-manila-deep hover:text-ink"
			>
				Apply — {data.foundingRemaining} of {data.foundingCap} slots left
			</a>
		</nav>
	</div>
</header>

{@render children()}

<footer class="border-t border-canvas bg-ink text-paper">
	<div class="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-3">
		<div>
			<p class="text-lg font-semibold">iotty <span class="overline-label ml-2 align-middle text-manila">Trade Partners</span></p>
			<p class="mt-3 max-w-xs text-sm leading-relaxed text-paper/60">
				The Italian tempered-glass smart switch — and the program that pays professionals to install it.
			</p>
		</div>
		<div class="text-sm">
			<p class="overline-label mb-4 text-manila">Program</p>
			<ul class="space-y-2 text-paper/70">
				<li><a class="transition-colors hover:text-paper" href="/#tiers">Tiers &amp; pricing</a></li>
				<li><a class="transition-colors hover:text-paper" href="/#math">Partner economics</a></li>
				<li><a class="transition-colors hover:text-paper" href="/directory">Find an installer</a></li>
				<li><a class="transition-colors hover:text-paper" href="/apply">Apply</a></li>
			</ul>
		</div>
		<div class="text-sm">
			<p class="overline-label mb-4 text-manila">iotty</p>
			<ul class="space-y-2 text-paper/70">
				<li><a class="transition-colors hover:text-paper" href="https://iottysmarthome.com" rel="external">iottysmarthome.com</a></li>
				<li><a class="transition-colors hover:text-paper" href="mailto:trade@iottysmarthome.com">trade@iottysmarthome.com</a></li>
			</ul>
		</div>
	</div>
	<div class="border-t border-paper/10">
		<p class="mx-auto max-w-6xl px-6 py-6 font-mono text-[0.6875rem] tracking-widest text-paper/40 uppercase">
			© 2026 iotty · Trade Partner Program
		</p>
	</div>
</footer>
