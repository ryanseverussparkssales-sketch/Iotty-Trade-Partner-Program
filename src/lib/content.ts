export const FOUNDING_CAP = 50;

export const MSRP = [
	{ sku: '1-gang', price: 90 },
	{ sku: '2-gang', price: 130 },
	{ sku: '3-gang', price: 165 },
	{ sku: '4-gang', price: 200 },
	{ sku: 'Dimmer module', price: 27 }
] as const;

export const TIERS = [
	{
		name: 'Trade',
		discount: '25%',
		qualification: 'Approved application',
		perks: [
			'Directory listing',
			'Priority email support',
			'Logo & asset kit',
			'Demo kit at 50% off'
		]
	},
	{
		name: 'Pro',
		discount: '35%',
		qualification: '$5k / rolling 12 months',
		perks: [
			'Featured directory listing',
			'Priority phone line',
			'Early access to new products',
			'Co-branded collateral'
		]
	},
	{
		name: 'Elite',
		discount: '40%',
		qualification: '$15k / rolling 12 months',
		perks: [
			'Priority lead routing',
			'Dedicated rep · Net 30 terms',
			'Roadmap input',
			'Co-op marketing & case studies'
		]
	}
] as const;

export const TRADES = [
	'Electrician / electrical contractor',
	'Custom integrator (AV / smart home)',
	'Builder / remodeler',
	'Interior designer / architect',
	'Other'
] as const;

export const US_STATES = [
	'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
	'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
	'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC'
] as const;
