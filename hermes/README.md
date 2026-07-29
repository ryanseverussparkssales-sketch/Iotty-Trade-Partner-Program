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

## The VPS engine (leadengine) — LIVE as of 2026-07-29

Prospecting runs on the **leadengine stack** at `/opt/leadengine` on the VPS
(srv1728993, 2.25.168.99, root + ed25519 key; note: Windows System32 ssh.exe is
blocked on Ryan's desktop — use Hermes's bundled ssh at
`C:\Users\Ryan\AppData\Local\hermes\git\usr\bin\ssh.exe`). It shares this same
Supabase project. Systemd timers run harvester/dispatcher/enrich/watchdog
continuously; budget-paced (client budget $25/mo).

Configured for iotty:

- Client `iotty` (iotty Trade Partners) with three active campaigns matching
  `geo-targets.json`: **T1 FL-TX-CA** (12 metros, 250 leads, $8), **T2 highAOV**
  (9 metros, 150 leads, $5), **T3 outliers** (10 metros, 100 leads, $4).
- Verticals: electrician, integrator (added to the library 2026-07-29), builder,
  remodeler, designer.
- **Promoter**: `promote_iotty_prospects(50)` runs daily at 12:00 UTC (7am CT)
  via pg_cron (`iotty-promote-prospects`) — moves the top-scored enriched iotty
  leads into `partners` as `prospect`, mapping vertical→trade, area→state/metro,
  and adding the state-tier fit bonus. Deduped by email; never touches existing
  rows. Ops: `leadengine status` / `leadengine campaigns iotty` on the VPS.

## Daily rhythm (the 50/day loop)

1. leadengine harvests + enriches within budget (systemd timers, hands-off);
   the 12:00 UTC promoter feeds up to 50 fresh prospects into `partners`.
   `upsert-prospects.mjs` remains for manual/side-channel lists.
2. Email cadence is HELD pending sender-domain decision (see plan §7) — when it
   turns on, each send logs a `touches` row with `channel='email'`, `agent='hermes'`.
3. Morning + afternoon: `call-queue.mjs` → Ryan dials → `log-touch.mjs` after each.
4. Applications land in the same table from the site; approval flips them onto the
   directory. No exports, no syncing, one database.
