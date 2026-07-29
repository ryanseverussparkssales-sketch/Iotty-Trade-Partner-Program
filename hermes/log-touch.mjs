#!/usr/bin/env node
/**
 * Log an outreach touch against a partner by email.
 * Usage: node hermes/log-touch.mjs <partner_email> <channel> <disposition> [cadence_step] [notes...]
 * Channels: call | voicemail | email | linkedin | sms | other
 * The touches trigger rolls last_touch_at / cadence_step up to the partner row.
 */
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
	console.error('[hermes] SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required (repo-root .env)');
	process.exit(1);
}
const [email, channel, disposition, stepArg, ...noteParts] = process.argv.slice(2);
if (!email || !channel || !disposition) {
	console.error('Usage: node hermes/log-touch.mjs <partner_email> <channel> <disposition> [cadence_step] [notes...]');
	process.exit(1);
}
const db = createClient(url, key, { auth: { persistSession: false } });

const { data: partner, error: findErr } = await db
	.from('partners')
	.select('id, company, status')
	.ilike('email', email)
	.single();
if (findErr || !partner) {
	console.error(`[hermes] no partner found for ${email}`, findErr?.message ?? '');
	process.exit(1);
}

const cadence_step = stepArg && !Number.isNaN(Number(stepArg)) ? Number(stepArg) : null;
const notes = noteParts.length ? noteParts.join(' ') : null;

const { error } = await db.from('touches').insert({
	partner_id: partner.id,
	channel,
	disposition,
	cadence_step,
	notes,
	agent: 'ryan'
});
if (error) {
	console.error('[hermes] touch insert failed:', error.message);
	process.exit(1);
}
console.log(`[hermes] logged ${channel}/${disposition} for ${partner.company} (${partner.status})`);

// mark prospects as contacted after their first touch
if (partner.status === 'prospect') {
	const { error: upErr } = await db.from('partners').update({ status: 'contacted' }).eq('id', partner.id);
	if (upErr) console.error('[hermes] status bump failed:', upErr.message);
	else console.log('[hermes] status: prospect → contacted');
}
