/**
 * Single source of truth for database shapes (per LEADOSSTACK-SKILLS §3).
 * Matches the real `partners` table in the shared iotty/Hermes Supabase project.
 */

export type PartnerStatus =
	| 'prospect'
	| 'contacted'
	| 'applied'
	| 'approved'
	| 'activated'
	| 'ordering'
	| 'declined'
	| 'dnc';

export interface Partner {
	id: string;
	created_at: string;
	company: string;
	contact_name: string;
	email: string;
	phone: string;
	trade: string;
	state: string;
	license_or_ein: string | null;
	website: string | null;
	notes: string | null;
	status: PartnerStatus;
	founding: boolean;
	source: string;
	fit_score: number | null;
	metro: string | null;
	socials: Record<string, string> | null;
	enrichment: Record<string, unknown> | null;
	last_touch_at: string | null;
	cadence_step: number | null;
}

/** Public row shape of the `directory_listings` view (approved+ partners, safe fields only). */
export type DirectoryListing = Pick<
	Partner,
	'id' | 'company' | 'trade' | 'state' | 'metro' | 'website' | 'founding' | 'created_at'
>;

/** Payload the public application form is allowed to insert. */
export type PartnerApplication = Pick<
	Partner,
	'company' | 'contact_name' | 'email' | 'phone' | 'trade' | 'state'
> &
	Partial<Pick<Partner, 'license_or_ein' | 'website' | 'notes'>> & {
		status: 'applied';
		founding: boolean;
		source: 'site_application';
	};
