<script lang="ts">
	import '../app.css';
	import '@fontsource-variable/inter';
	import '@fontsource/ibm-plex-mono/400.css';
	import '@fontsource/ibm-plex-mono/500.css';
	import favicon from '$lib/assets/favicon.svg';
	import logoBlack from '$lib/assets/iotty-black.svg';
	import logoWhite from '$lib/assets/iotty-white.svg';
	import type { Snippet } from 'svelte';
	import type { LayoutServerData } from './$types';

	let { children, data }: { children: Snippet; data: LayoutServerData } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>iotty Trade Partners — the trade program for the glass switch</title>
	<meta
		name="description"
		content="Trade pricing on the iotty glass smart switch for electricians, integrators, builders, and designers."
	/>
</svelte:head>

<header class="sticky top-0 z-50 border-b border-canvas bg-paper/90 backdrop-blur">
	<div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
		<a href="/" class="flex items-center gap-3">
			<img src={logoBlack} alt="iotty" class="h-5 w-auto" width="111" height="55" />
			<span class="overline-label text-pencil">Trade Partners</span>
		</a>
		<a
			href="/#offers"
			class="frame-motif bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-manila-deep hover:text-ink sm:px-5"
		>
			Get trade pricing
		</a>
	</div>
</header>

{@render children()}

<footer class="border-t border-canvas bg-ink text-paper">
	<div class="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-3">
		<div>
			<p class="flex items-center gap-3">
				<img src={logoWhite} alt="iotty" class="h-6 w-auto" width="111" height="55" />
				<span class="overline-label text-manila">Trade Partners</span>
			</p>
			<p class="mt-3 max-w-xs text-sm leading-relaxed text-paper/60">
				The Italian tempered-glass smart switch — with trade pricing for the pros who install it.
			</p>
		</div>
		<div class="text-sm">
			<p class="overline-label mb-4 text-manila">Program</p>
			<ul class="space-y-2 text-paper/70">
				<li><a class="transition-colors hover:text-paper" href="/#offers">Trade pricing</a></li>
				<li><a class="transition-colors hover:text-paper" href="/#offers">Book a call</a></li>
			</ul>
		</div>
		<div class="text-sm">
			<p class="overline-label mb-4 text-manila">iotty</p>
			<ul class="space-y-2 text-paper/70">
				<li><a class="transition-colors hover:text-paper" href="https://iottysmarthome.com" rel="external">iottysmarthome.com</a></li>
				<li><a class="transition-colors hover:text-paper" href="mailto:ryan@iottysmarthome.com">ryan@iottysmarthome.com</a></li>
			</ul>
		</div>
	</div>
	<div class="border-t border-paper/10">
		<p class="mx-auto max-w-6xl px-6 py-6 font-mono text-[0.6875rem] tracking-widest text-paper/40 uppercase">
			© 2026 iotty · Trade Partner Program
		</p>
	</div>
</footer>
