# Hermes ↔ iotty Trade Partners — Database Contract

The site and the Hermes prospecting stack share **one Supabase database** (project
`ogodslwbdxidudymtvnn`). Hermes writes prospects in; the site writes applications in;
both meet in `public.partners`. This doc is the contract — keep Hermes collectors
pointed at these shapes and nothing breaks.

## Environment

Scripts here need (see `.env.example` at repo root):

```
SUPABASE_URL=https://ogodslwbdxidudymtvnn.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...   # dashboard → Settings → API. NEVER ships to the site/client.
```

The public site runs on the anon key (insert-only applications + counter + directory view).
Everything Hermes does requires the **service role key**.

## The `partners` table — one row per company, forever

Status is the pipeline. Hermes owns the left side, humans own the right:

```
prospect → contacted → applied → approved → activated → ordering
                                        ↘ declined      ↘ dnc
```

- **Hermes inserts at `prospect`** via `upsert_prospect(...)` (below) — never raw inserts.
- The site's application form inserts at `applied` (or *upgrades* a Hermes prospect —
  same email = same row, status moves forward).
- `founding` flag: set true by the site on applications; Ryan sets it manually when
  approving a prospect who came through outreach.
- Enrichment fields Hermes maintains: `fit_score` (numeric — drives the call queue),
  `metro`, `socials` (jsonb), `enrichment` (jsonb, merged shallowly on re-upsert),
  `last_touch_at` + `cadence_step` (maintained automatically by the touches trigger).

## Dedupe rule

`unique index on lower(email)`. `upsert_prospect()` is conflict-safe: re-upserting an
existing email **enriches** the row (fills missing metro/website, updates fit_score,
merges enrichment) and **never regresses status** — a prospect who already applied or
was approved stays where they are. 50/day collectors can re-run without fear.

## `touches` — every outreach event, both agents and humans

One row per touch: `partner_id, at, channel (call|voicemail|email|linkedin|sms|other),
direction, cadence_step, disposition, objection, notes, agent ('hermes'|'ryan')`.
Insert a touch and a trigger rolls `last_touch_at` / `cadence_step` up to the partner
row. Log the `objection` text on calls — the tally after 200 dials rewrites the script.

## `daily_call_queue` view — who gets a human today

Top 20 prospects/contacted: has a phone, not touched today, ordered by
`fit_score desc`. Ryan works this list in the two daily call blocks
(6:30–8:00 AM / 3:30–5:30 PM trade windows). Service-role only.

## `directory_listings` view — what the public sees

`company, trade, state, metro, website, founding` for `approved|activated|ordering`
only. Powers `/directory` on the site through the anon key. Approving a partner
(status update) is all it takes to put them on the map.

## Scripts

- `node hermes/upsert-prospects.mjs <file.json>` — bulk-load a collector run.
  Accepts a JSON array of `{company, contact_name, email, phone, trade, state,
  metro?, website?, fit_score?, socials?, enrichment?}`.
- `node hermes/call-queue.mjs` — print today's call queue as a worklist.
- `node hermes/log-touch.mjs <partner_email> <channel> <disposition> [cadence_step] [notes]`
  — log a touch from the command line after a call block.

All three read `.env` at repo root. Run them from the repo root.

## Geo targeting (`geo-targets.json`)

Collector allocation is driven by iotty's own D2C sales data, not guesswork.
`geo-targets.json` splits the daily 50 across three tiers: **Tier 1 (50%)** FL/TX/CA
(45% of all consumer orders — FL alone is 2× CA), **Tier 2 (30%)** NY/NJ/IL/GA/NC/AZ/WA
(volume plus high-AOV multi-gang buying), **Tier 3 (20%)** the AOV outliers — Alabama's
$943 and Wisconsin's $737 average orders on tiny volume mean whole-home quantities are
already being installed there by *someone*; Hermes's job is to find who. The file also
carries the per-metro hints and fit_score bonuses (state tier, Lutron/Caséta/Control4
mentions on the company site, reno-heavy reviews). Update it when new sales data lands;
collectors read it, nothing else needs to change.

## Daily rhythm (the 50/day loop)

1. Collectors gather ~50 contacts (segment mix: 25 electricians / 15 integrators /
   5 builders / 5 designers) → `upsert-prospects.mjs`.
2. Hermes sends the cadence emails for whoever is due (Day 1/5/11/14) → logs each
   as a `touches` row with `channel='email'`, `agent='hermes'`.
3. Morning + afternoon: `call-queue.mjs` → Ryan dials → `log-touch.mjs` after each.
4. Applications land in the same table from the site; approval flips them onto the
   directory. No exports, no syncing, one database.
