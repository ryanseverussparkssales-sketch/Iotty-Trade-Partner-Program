#!/usr/bin/env node
/**
 * Bulk-load a Hermes collector run into the shared partners table.
 * Usage: node hermes/upsert-prospects.mjs <file.json>
 * Input: JSON array of {company, contact_name, email, phone, trade, state,
 *        metro?, website?, fit_score?, socials?, enrichment?}
 * Uses the dedupe-safe upsert_prospect() RPC — re-runs are harmless.
 */
import { readFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
	console.error('[hermes] SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required (repo-root .env)');
	process.exit(1);
}
const file = process.argv[2];
if (!file) {
	console.error('Usage: node hermes/upsert-prospects.mjs <file.json>');
	process.exit(1);
}

const db = createClient(url, key, { auth: { persistSession: false } });
const rows = JSON.parse(readFileSync(file, 'utf8'));
if (!Array.isArray(rows)) {
	console.error('[hermes] input must be a JSON array');
	process.exit(1);
}

let ok = 0;
let failed = 0;
for (const r of rows) {
	const { data, error } = await db.rpc('upsert_prospect', {
		p_company: r.company,
		p_contact_name: r.contact_name,
		p_email: r.email,
		p_phone: r.phone ?? '',
		p_trade: r.trade,
		p_state: r.state,
		p_metro: r.metro ?? null,
		p_website: r.website ?? null,
		p_fit_score: r.fit_score ?? null,
		p_socials: r.socials ?? null,
		p_enrichment: r.enrichment ?? null
	});
	if (error) {
		failed++;
		console.error(`[hermes] FAILED ${r.email}:`, error.message);
	} else {
		ok++;
		console.log(`[hermes] upserted ${r.email} → ${data}`);
	}
}
console.log(`[hermes] done: ${ok} upserted, ${failed} failed, ${rows.length} total`);
