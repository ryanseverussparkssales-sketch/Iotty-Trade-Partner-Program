/**
 * Trade program Google Form -> Pipedrive
 *
 * Install (2 min):
 *  1. Open the trade Google Form -> Responses -> "Link to Sheets" (if not already linked) -> open the sheet.
 *  2. Extensions -> Apps Script -> paste this file.
 *  3. Project Settings -> Script properties -> add PIPEDRIVE_TOKEN = <the iotty Pipedrive API token>.
 *  4. Run `install` once and approve permissions. That adds the on-submit trigger.
 *  5. Optional: run `backfill` once to push every existing response.
 *
 * Each submission creates (or reuses, matched by email/company) a Person, an Organization,
 * and one open deal per company in the "Trade Partners" pipeline, stage "Applied".
 * The person is tagged Segment = Trade and Lead Source = Trade Lander - Signup, and all form answers go in a note.
 */

const PD = 'https://api.pipedrive.com/v1';
const PIPELINE_ID = 7;        // Trade Partners
const STAGE_ID = 73;          // Applied
const LEAD_SOURCE = 'Trade Lander - Signup';
const F = {                   // Pipedrive person custom-field keys
  segment: '420872747e7dd867f8ff528f682247bbb8593bbe',   // enum: 62 = Trade
  leadSource: '7d0d0a3703a5b72373c3439b64e044243f9c00ca'
};
const SEGMENT_TRADE = 62;
const SYNCED_COL = 'Pipedrive Deal';  // written back to the sheet so nothing double-syncs

function install() {
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('onFormSubmit').forSpreadsheet(SpreadsheetApp.getActive()).onFormSubmit().create();
}

function onFormSubmit(e) {
  syncRow_(e.range.getSheet(), e.range.getRow());
}

function backfill() {
  const sh = responseSheet_();
  for (let r = 2; r <= sh.getLastRow(); r++) syncRow_(sh, r);
}

// ---------- core ----------
function syncRow_(sh, row) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].map(String);
    let syncCol = headers.indexOf(SYNCED_COL) + 1;
    if (!syncCol) { syncCol = headers.length + 1; sh.getRange(1, syncCol).setValue(SYNCED_COL); headers.push(SYNCED_COL); }
    if (sh.getRange(row, syncCol).getValue()) return; // already synced

    const vals = sh.getRange(row, 1, 1, headers.length).getValues()[0];
    const answers = {};
    headers.forEach((h, i) => { if (h && h !== SYNCED_COL && vals[i] !== '') answers[h] = vals[i]; });

    const email = pick_(answers, /e-?mail/i);
    if (!email) return;
    const first = pick_(answers, /first name/i);
    const last = pick_(answers, /last name/i);
    const name = pick_(answers, /^(full )?name$|your name|contact name/i) || [first, last].filter(String).join(' ') || email;
    const company = pick_(answers, /company|business|organi[sz]ation/i) || name;
    const phone = pick_(answers, /phone|mobile|cell/i);

    const orgId = findOrg_(company) || pd_('post', '/organizations', { name: company }).id;

    let personId = findPerson_(email);
    const personBody = {
      name, org_id: orgId,
      [F.segment]: SEGMENT_TRADE,
      [F.leadSource]: LEAD_SOURCE
    };
    if (personId) {
      pd_('put', '/persons/' + personId, personBody);
    } else {
      personBody.email = [{ value: email, primary: true, label: 'work' }];
      if (phone) personBody.phone = [{ value: String(phone), primary: true, label: 'work' }];
      personId = pd_('post', '/persons', personBody).id;
    }

    // one deal per company: reuse an open Trade Partners deal if the org already has one
    const open = (pd_('get', '/organizations/' + orgId + '/deals?status=open') || [])
      .find(d => d.pipeline_id === PIPELINE_ID);
    const dealId = open ? open.id : pd_('post', '/deals', {
      title: company + ' - Trade Program', org_id: orgId, person_id: personId,
      pipeline_id: PIPELINE_ID, stage_id: STAGE_ID
    }).id;

    const note = '<b>Trade program sign-up (trade.iottysmarthome.com)</b><br>' +
      Object.keys(answers).map(k => '<b>' + esc_(k) + ':</b> ' + esc_(answers[k])).join('<br>');
    pd_('post', '/notes', { content: note, deal_id: dealId, person_id: personId, org_id: orgId });

    sh.getRange(row, syncCol).setValue(dealId);
  } finally {
    lock.releaseLock();
  }
}

// ---------- helpers ----------
function responseSheet_() {
  const ss = SpreadsheetApp.getActive();
  return ss.getSheets().find(s => /form responses/i.test(s.getName())) || ss.getSheets()[0];
}
function pick_(obj, re) {
  const k = Object.keys(obj).find(h => re.test(h));
  return k ? String(obj[k]).trim() : '';
}
function findPerson_(email) {
  const r = pd_('get', '/persons/search?exact_match=true&fields=email&term=' + encodeURIComponent(email));
  return r && r.items && r.items.length ? r.items[0].item.id : null;
}
function findOrg_(name) {
  const r = pd_('get', '/organizations/search?exact_match=true&term=' + encodeURIComponent(name));
  return r && r.items && r.items.length ? r.items[0].item.id : null;
}
function pd_(method, path, body) {
  const token = PropertiesService.getScriptProperties().getProperty('PIPEDRIVE_TOKEN');
  const url = PD + path + (path.includes('?') ? '&' : '?') + 'api_token=' + token;
  const opts = { method, contentType: 'application/json', muteHttpExceptions: true };
  if (body) opts.payload = JSON.stringify(body);
  const res = UrlFetchApp.fetch(url, opts);
  const json = JSON.parse(res.getContentText() || '{}');
  if (!json.success) throw new Error('Pipedrive ' + method + ' ' + path + ': ' + res.getContentText());
  return json.data;
}
function esc_(v) {
  return String(v).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}
