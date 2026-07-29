#!/usr/bin/env node
/**
 * Print today's call queue (top 20 by fit score, not yet touched today).
 * Usage: node hermes/call-queue.mjs
 */
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
	console.error('[hermes] SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required (repo-root .env)');
	process.exit(1);
}
const db = createClient(url, key, { auth: { persistSession: false } });

const { data, error } = await db.from('daily_call_queue').select('*');
if (error) {
	console.error('[hermes] queue load failed:', error.message);
	process.exit(1);
}
if (!data?.length) {
	console.log('[hermes] queue is empty — run the collectors or check back tomorrow');
	process.exit(0);
}

console.log(`\n=== TODAY'S CALL QUEUE (${data.length}) ===\n`);
for (const [i, p] of data.entries()) {
	const score = p.fit_score != null ? String(p.fit_score).padStart(5) : '  n/a';
	const step = p.cadence_step != null ? `step ${p.cadence_step}` : 'fresh';
	console.log(
		`${String(i + 1).padStart(2)}. [${score}] ${p.company} — ${p.contact_name ?? '?'} · ${p.phone} · ${p.trade} · ${p.metro ?? p.state} · ${step} (${p.status})`
	);
}
console.log('\nLog each dial: node hermes/log-touch.mjs <email> call <disposition> [step] [notes]\n');
