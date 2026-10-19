import { env } from '$env/dynamic/private';

/**
 * Minimal Pipedrive push for trade sign-ups. No-ops (returns null) when
 * PIPEDRIVE_TOKEN isn't set, so the site never breaks on a missing env var.
 * Matches by email (person) and exact name (org); one open deal per company
 * in the Trade Partners pipeline.
 */
const PD = 'https://api.pipedrive.com/v1';
const PIPELINE_ID = 7; // Trade Partners
const STAGE_ID = 73; // Applied
const F = {
	segment: '420872747e7dd867f8ff528f682247bbb8593bbe', // enum 62 = Trade
	leadSource: '7d0d0a3703a5b72373c3439b64e044243f9c00ca',
	utmSource: '1495ca19d096b79f153c7845858cafc7f58c9d12',
	utmMedium: '05ab974f57b1f6f27f74b2b3df6e9b3261f9d934',
	utmCampaign: '8c12a0040ca57aef4a96e54954d8947c19c2c51b',
	utmContent: '147abe27905b9a31de3d16690e99592a2f4f70c8'
};
const SEGMENT_TRADE = 62;

async function pd<T = any>(method: string, path: string, body?: unknown): Promise<T> {
	const token = env.PIPEDRIVE_TOKEN;
	const url = `${PD}${path}${path.includes('?') ? '&' : '?'}api_token=${token}`;
	const res = await fetch(url, {
		method,
		headers: body ? { 'Content-Type': 'application/json' } : undefined,
		body: body ? JSON.stringify(body) : undefined
	});
	const json = await res.json().catch(() => ({}));
	if (!json.success) throw new Error(`Pipedrive ${method} ${path}: ${res.status} ${JSON.stringify(json).slice(0, 300)}`);
	return json.data as T;
}

export interface TradeSignup {
	company: string;
	contact_name: string;
	email: string;
	phone: string;
	trade: string;
	state: string;
	volume?: string;
	utm?: Record<string, string>;
}

export async function pushTradeSignup(s: TradeSignup): Promise<number | null> {
	if (!env.PIPEDRIVE_TOKEN) return null;

	const orgHit = await pd<any>('GET', `/organizations/search?exact_match=true&term=${encodeURIComponent(s.company)}`);
	const orgId: number = orgHit?.items?.[0]?.item?.id ?? (await pd<any>('POST', '/organizations', { name: s.company })).id;

	const personFields: Record<string, unknown> = {
		name: s.contact_name,
		org_id: orgId,
		[F.segment]: SEGMENT_TRADE,
		[F.leadSource]: 'Trade Lander - Signup'
	};
	const u = s.utm ?? {};
	if (u.utm_source) personFields[F.utmSource] = u.utm_source;
	if (u.utm_medium) personFields[F.utmMedium] = u.utm_medium;
	if (u.utm_campaign) personFields[F.utmCampaign] = u.utm_campaign;
	if (u.utm_content) personFields[F.utmContent] = u.utm_content;

	const personHit = await pd<any>('GET', `/persons/search?exact_match=true&fields=email&term=${encodeURIComponent(s.email)}`);
	let personId: number | undefined = personHit?.items?.[0]?.item?.id;
	if (personId) {
		await pd('PUT', `/persons/${personId}`, personFields);
	} else {
		personId = (
			await pd<any>('POST', '/persons', {
				...personFields,
				email: [{ value: s.email, primary: true, label: 'work' }],
				phone: [{ value: s.phone, primary: true, label: 'work' }]
			})
		).id;
	}

	const orgDeals = (await pd<any[]>('GET', `/organizations/${orgId}/deals?status=open`)) ?? [];
	const open = orgDeals.find((d) => d.pipeline_id === PIPELINE_ID);
	const dealId: number =
		open?.id ??
		(
			await pd<any>('POST', '/deals', {
				title: `${s.company} - Trade Program`,
				org_id: orgId,
				person_id: personId,
				pipeline_id: PIPELINE_ID,
				stage_id: STAGE_ID
			})
		).id;

	const lines = [
		['Trade', s.trade],
		['State', s.state],
		['Smart-switch jobs / year', s.volume],
		['Phone', s.phone],
		...Object.entries(u)
	].filter(([, v]) => v);
	await pd('POST', '/notes', {
		content:
			'<b>Trade program sign-up (trade.iottysmarthome.com)</b><br>' +
			lines.map(([k, v]) => `<b>${k}:</b> ${String(v).replace(/[<>&]/g, '')}`).join('<br>'),
		deal_id: dealId,
		person_id: personId,
		org_id: orgId
	});

	return dealId;
}
