/**
 * Free checklist storage by CAP ID using Google Sheets + Apps Script.
 * Sheet columns (row 1 headers): id | done | updated
 *
 * Deploy: Extensions > Apps Script > paste this > Deploy > New deployment
 *   Type: Web app | Execute as: Me | Who has access: Anyone
 * Copy the Web App URL into js/config.js (SYNC_URL).
 */
const SHEET_NAME = "Checklists";

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) { sh = ss.insertSheet(SHEET_NAME); sh.appendRow(["id", "done", "updated"]); }
  return sh;
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const id = String((e.parameter && e.parameter.id) || "").replace(/\D/g, "");
  if (!id) return json_({});
  const rows = sheet_().getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === id) return json_({ id: id, done: JSON.parse(rows[i][1] || "{}"), updated: Number(rows[i][2]) });
  }
  return json_({});
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const body = JSON.parse(e.postData.contents);
    const id = String(body.id || "").replace(/\D/g, "");
    if (!id || id.length > 8) return json_({ ok: false });
    const sh = sheet_();
    const rows = sh.getDataRange().getValues();
    const vals = [id, JSON.stringify(body.done || {}), Number(body.updated) || Date.now()];
    for (let i = 1; i < rows.length; i++) {
      if (String(rows[i][0]) === id) { sh.getRange(i + 1, 1, 1, 3).setValues([vals]); return json_({ ok: true }); }
    }
    sh.appendRow(vals);
    return json_({ ok: true });
  } finally { lock.releaseLock(); }
}
