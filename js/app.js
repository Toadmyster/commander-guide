(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const CFG = window.APP_CONFIG || {};
  const C = window.CONTENT;
  const PUB = window.PUB, DESK = window.DESK, LIB = window.LIBRARY;

  // ---------- storage helpers ----------
  const cookie = {
    get(n) { const m = document.cookie.match(new RegExp("(?:^|; )" + n + "=([^;]*)")); return m ? decodeURIComponent(m[1]) : ""; },
    set(n, v, days = 365) { document.cookie = `${n}=${encodeURIComponent(v)}; max-age=${days * 86400}; path=/; SameSite=Lax`; },
    del(n) { document.cookie = `${n}=; max-age=0; path=/`; }
  };
  const ls = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  let capId = "";
  let state = { done: {}, updated: 0 };
  const allItems = C.groups.flatMap(g => g.items);

  // ---------- rich text: [[CAPR 39-2]], [[key|label]], **bold** ----------
  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  function rich(s) {
    return esc(s)
      .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (m, key, label) => {
        const url = PUB[key.trim()];
        if (!url) { console.warn("Missing publication link:", key); return esc(label || key); }
        return `<a class="plink" href="${url}" target="_blank" rel="noopener">${label || key}</a>`;
      })
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  }
  const plain = s => s.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (m, k, l) => l || k).replace(/\*\*/g, "");

  // ---------- login ----------
  function start() {
    capId = cookie.get("cap_id") || ls.get("cap_id") || "";
    if (capId) enter(); else { $("#login").hidden = false; }
  }
  $("#loginForm").addEventListener("submit", e => {
    e.preventDefault();
    const v = $("#capId").value.replace(/\D/g, "");
    if (!v) return;
    capId = v;
    cookie.set("cap_id", v); ls.set("cap_id", v);
    $("#login").hidden = true;
    enter();
  });

  async function enter() {
    $("#app").hidden = false;
    $("#login").hidden = true;
    $("#who").textContent = "CAP ID " + capId;
    $("#sheetId").textContent = capId;
    loadLocal();
    renderAll();
    const h = location.hash.slice(1);
    go(pages.includes(h) ? h : "home", false);
    await pull();
  }

  // ---------- state ----------
  const key = () => "cap_checklist_" + capId;
  function loadLocal() {
    try { state = JSON.parse(ls.get(key())) || { done: {}, updated: 0 }; } catch (e) { state = { done: {}, updated: 0 }; }
    $("#toEmail").value = ls.get("cap_report_to") || CFG.DEFAULT_REPORT_EMAIL || "";
    $("#yourName").value = ls.get("cap_report_name") || "";
    openGroup = ls.get(groupKey()) || "";
  }
  function save() {
    state.updated = Date.now();
    ls.set(key(), JSON.stringify(state));
    push();
  }

  // Optional cloud sync (Google Apps Script web app)
  async function pull() {
    if (!CFG.SYNC_URL) { setSync("Saved on this device only"); return; }
    try {
      setSync("Syncing…");
      const r = await fetch(`${CFG.SYNC_URL}?id=${encodeURIComponent(capId)}`);
      const remote = await r.json();
      if (remote && remote.done && (remote.updated || 0) > (state.updated || 0)) {
        state = { done: remote.done, updated: remote.updated };
        ls.set(key(), JSON.stringify(state));
        renderChecklist(); updateProgress();
      }
      setSync("Synced ✓");
    } catch (e) { setSync("Offline — saved on this device"); }
  }
  let pushTimer;
  function push() {
    if (!CFG.SYNC_URL) return;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(async () => {
      try {
        await fetch(CFG.SYNC_URL, { method: "POST", headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({ id: capId, done: state.done, updated: state.updated }) });
        setSync("Synced ✓");
      } catch (e) { setSync("Offline — will retry on next change"); }
    }, 600);
  }
  function setSync(t) { $("#sync").textContent = t; }

  // ---------- rendering ----------
  function renderAll() {
    $("#welcome").innerHTML = C.welcome;
    renderLinks(); renderDesk(); renderLibrary();
    renderChecklist(); updateProgress();
  }

  function renderLinks() {
    $("#links").innerHTML = C.links.map(l =>
      `<li><a href="${l.u}" target="_blank" rel="noopener"><strong>${l.t} ↗</strong><small>${l.d}</small></a></li>`).join("");
  }

  // ----- Desk guide -----
  function renderDesk() {
    $("#deskTitle").textContent = DESK.title;
    $("#deskSub").textContent = DESK.subtitle;
    $("#deskUpdated").textContent = DESK.updated;
    $("#deskIntro").innerHTML = rich(DESK.intro);
    $("#deskBody").innerHTML = DESK.sections.map(sec => {
      let body = "";
      if (sec.type === "top12") {
        body = `<ol class="top12">` + sec.rows.map((r, i) =>
          `<li><span class="num">${i + 1}</span><div><div class="t-pub">${rich(r[0])}</div><strong class="t-subj">${esc(r[1])}</strong><p class="t-why">${esc(r[2])}</p></div></li>`).join("") + `</ol>`;
      } else if (sec.type === "bullets") {
        body = `<ul class="bul">` + sec.items.map(t => `<li>${rich(t)}</li>`).join("") + `</ul>`;
      } else if (sec.type === "rhythm") {
        body = sec.rows.map(r => `<div class="rhythm"><span class="when">${esc(r[0])}</span><div><strong>${esc(r[1])}</strong><p>${esc(r[2])}</p></div></div>`).join("");
      } else if (sec.type === "callout") {
        body = `<div class="callout"><strong>${esc(sec.lead)}</strong><p>${esc(sec.text)}</p></div>`;
      } else {
        body = `<p class="para">${rich(sec.text)}</p>`;
      }
      return `<details class="acc"${sec.open ? " open" : ""}><summary>${esc(sec.title)}</summary><div class="acc-body">${body}</div></details>`;
    }).join("");
  }

  // ----- Essential publications library -----
  const kindOf = html => /^\s*<a[^>]*>CAPR/.test(html) ? "reg" : /^\s*<a[^>]*>CAWGP/.test(html) ? "cal" : "pam";
  function pubCard(r, shelf) {
    const num = rich(r[0]);
    const q = (plain(r[0]) + " " + r[1] + " " + (r[2] || "")).toLowerCase();
    return `<article class="pub k-${kindOf(num)} f-item" data-kind="${shelf}" data-q="${esc(q)}">
      <div class="pub-num">${num}</div>
      <h4>${esc(r[1])}</h4>${r[2] ? `<p>${esc(r[2])}</p>` : ""}
      <span class="open-hint">Open PDF ↗</span></article>`;
  }
  function shelf(title, sub, inner, kind) {
    return `<section class="shelf" data-shelf="${kind}"><h3 class="shelf-h"><span>${title}</span></h3>${sub ? `<p class="shelf-sub">${sub}</p>` : ""}${inner}</section>`;
  }
  function renderLibrary() {
    $("#libTitle").textContent = LIB.title;
    $("#libSub").textContent = LIB.subtitle;
    $("#libUpdated").textContent = LIB.updated;
    $("#libPurpose").innerHTML = rich(LIB.purpose);

    const parts = [];
    parts.push(shelf("1 · Core National Regulations", "", LIB.regs.map(r => pubCard(r, "reg")).join(""), "reg"));
    parts.push(shelf("2 · Essential Commander Pamphlets and Guides", "", LIB.pamphlets.map(r => pubCard(r, "pam")).join(""), "pam"));
    parts.push(shelf("3 · California Wing Publications", esc(LIB.calwingNote),
      LIB.calwing.map(r => pubCard(r, "cal")).join(""), "cal"));
    parts.push(shelf("4 · Recommended Commander Binder / Digital Folder", "",
      `<ul class="bul dark">` + LIB.binder.map(t => `<li class="f-item" data-kind="all" data-q="${esc(plain(t).toLowerCase())}">${rich(t)}</li>`).join("") + `</ul>`, "all"));
    parts.push(shelf("5 · Two Publications Worth Highlighting", "",
      LIB.highlights.map(h => `<article class="feat f-item" data-kind="all" data-q="${esc((h.key + " " + h.title + " " + h.text).toLowerCase())}">
        <div class="feat-star">★ Worth highlighting</div>
        <h4>${rich("[[" + h.key + "]]")} — ${esc(h.title)}</h4><p>${esc(h.text)}</p></article>`).join(""), "all"));
    parts.push(`<section class="shelf meta"><h3 class="shelf-h"><span>6 · Currency Note</span></h3><p class="note">${esc(LIB.currency)}</p></section>`);
    parts.push(`<section class="shelf meta"><h3 class="shelf-h"><span>Official Reference Pages</span></h3><ul class="official">` +
      LIB.official.map(o => `<li>${rich("[[" + o[1] + "|" + o[0] + " ↗]]")}</li>`).join("") + `</ul></section>`);
    $("#libBody").innerHTML = parts.join("");
    applyLibFilter();
  }
  let libF = "all";
  function applyLibFilter() {
    const q = $("#libSearch").value.trim().toLowerCase();
    let any = false;
    $$("#libBody .shelf:not(.meta)").forEach(sh => {
      const kind = sh.dataset.shelf;
      const kindOk = libF === "all" || kind === libF;
      let vis = 0;
      $$(".f-item", sh).forEach(it => {
        const ok = kindOk && (!q || it.dataset.q.includes(q));
        it.hidden = !ok; if (ok) vis++;
      });
      sh.hidden = vis === 0; if (vis) any = true;
    });
    $$("#libBody .meta").forEach(m => { m.hidden = !(libF === "all" && !q); });
    $("#libEmpty").hidden = any;
  }
  $("#libSearch").addEventListener("input", applyLibFilter);
  $("#chips").addEventListener("click", e => {
    const b = e.target.closest(".chip"); if (!b) return;
    libF = b.dataset.f;
    $$("#chips .chip").forEach(c => c.classList.toggle("on", c === b));
    applyLibFilter();
  });

  // ----- Checklist -----
  // state.done[id] = "YYYY-MM-DD" (complete) or "NA" (not applicable); missing = open
  const openDetails = new Set();      // items whose details drawer is open
  const naExpanded = new Set();       // not-applicable items the user expanded
  let openGroup = "";                 // accordion: key of the open section ("" = all collapsed)
  const groupKey = () => "cap_open_group_" + capId;
  const statusOf = id => { const v = state.done[id]; return v === "NA" ? "na" : v ? "done" : "open"; };

  function detailParts(i) {
    const parts = [];
    if (i.refs && i.refs.length) parts.push(`<div class="dt"><strong>Regulations &amp; links</strong><ul>${i.refs.map(r => `<li>${rich(r)}</li>`).join("")}</ul></div>`);
    if (i.help) parts.push(`<div class="dt"><strong>Who can help</strong><p>${rich(i.help)}</p></div>`);
    if (i.wing) parts.push(`<div class="dt"><strong>Wing-specific</strong><p>${rich(i.wing)}</p></div>`);
    if (!parts.length) parts.push(`<div class="dt"><p>No additional details for this item.</p></div>`);
    return parts.join("");
  }
  function actsHtml(st) {
    return `<div class="acts">
        <button class="seg done" data-act="done" aria-pressed="${st === "done"}">${st === "done" ? "✓ " : ""}Complete</button>
        <button class="seg na" data-act="na" aria-pressed="${st === "na"}">${st === "na" ? "✓ " : ""}Not applicable</button>
      </div>`;
  }

  function itemHtml(i) {
    const st = statusOf(i.id);
    const badge = i.req
      ? `<span class="badge req">Required</span><span class="badge-note">${esc(i.req)}</span>`
      : `<span class="badge sug">Suggested</span>`;

    if (st === "na") {
      // Collapsed by default to just the crossed-out title; tap to expand (e.g. if marked in error)
      const open = naExpanded.has(i.id);
      return `<div class="item st-na ${open ? "na-open" : "na-collapsed"}" data-id="${i.id}">
        <button class="na-head" data-act="naToggle" aria-expanded="${open}">
          <span class="stat" aria-hidden="true"></span>
          <span class="t">${esc(i.t)}</span>
          <span class="na-tag">N/A</span>
          <span class="chev" aria-hidden="true"></span>
        </button>
        ${open ? `<div class="na-body"><p class="d na-desc">${esc(i.d)}</p><div class="badges na-badges">${badge}</div><div class="det">${detailParts(i)}</div>${actsHtml(st)}</div>` : ""}
      </div>`;
    }

    const open = openDetails.has(i.id);
    return `<div class="item st-${st}" data-id="${i.id}">
      <button class="item-top" data-act="details" aria-expanded="${open}">
        <span class="stat" aria-hidden="true"></span>
        <span class="body"><span class="t">${esc(i.t)}</span><span class="badges">${badge}</span><span class="d">${esc(i.d)}</span></span>
        <span class="chev" aria-hidden="true"></span>
      </button>
      <div class="det"${open ? "" : " hidden"}>${detailParts(i)}</div>
      ${actsHtml(st)}
    </div>`;
  }

  function groupHtml(key, name, count, inner) {
    const open = openGroup === key;
    return `<section class="grp${open ? " open" : ""}" data-g="${key}">
      <button class="group" data-act="group" aria-expanded="${open}">
        <span class="g-name">${esc(name)}</span>${count ? `<span class="g-count${count.all ? " all" : ""}">${count.text}</span>` : ""}
        <span class="chev" aria-hidden="true"></span>
      </button>
      <div class="g-body"${open ? "" : " hidden"}>${inner}</div>
    </section>`;
  }

  function renderChecklist() {
    $("#legend").innerHTML = C.legend;
    $("#checklist").innerHTML = C.groups.map((g, gi) => {
      const n = g.items.filter(i => state.done[i.id]).length;
      return groupHtml(String(gi), g.name, { text: `${n}/${g.items.length}`, all: n === g.items.length }, g.items.map(itemHtml).join(""));
    }).join("") +
      `<h3 class="sect-h">Ongoing reminders</h3><div class="ongoing"><ul class="bul">${C.ongoing.map(t => `<li>${rich(t)}</li>`).join("")}</ul></div>`;
  }

  function counts() {
    const total = allItems.length;
    const na = allItems.filter(i => state.done[i.id] === "NA").length;
    const done = allItems.filter(i => state.done[i.id] && state.done[i.id] !== "NA").length;
    const applicable = total - na;
    return { done, na, total, applicable, pct: applicable ? Math.round(100 * done / applicable) : 0 };
  }
  function progressText() {
    const { done, na, applicable } = counts();
    return `${done} of ${applicable} complete` + (na ? ` · ${na} not applicable` : "");
  }
  function updateProgress() {
    const { pct } = counts();
    $("#homeBar").style.width = pct + "%";
    $("#ringPct").textContent = pct + "%";
    $("#progText").textContent = progressText();
    $("#barFill").style.width = pct + "%";
    $("#barText").textContent = progressText();
    $("#preview").textContent = buildReport();
  }

  $("#checklist").addEventListener("click", e => {
    if (e.target.closest("a")) return;
    const btn = e.target.closest("[data-act]"); if (!btn) return;
    const act = btn.dataset.act;

    if (act === "group") {                                   // accordion section header
      const grp = btn.closest(".grp");
      setOpenGroup(grp.classList.contains("open") ? "" : grp.dataset.g, true);
      return;
    }
    const item = btn.closest(".item"); if (!item) return;
    const id = item.dataset.id;
    if (act === "details") {
      const det = $(".det", item);
      det.hidden = !det.hidden;
      btn.setAttribute("aria-expanded", String(!det.hidden));
      if (det.hidden) openDetails.delete(id); else openDetails.add(id);
    } else if (act === "naToggle") {                         // expand/collapse a not-applicable card
      if (naExpanded.has(id)) naExpanded.delete(id); else naExpanded.add(id);
      rerenderKeepScroll();
    } else {
      setStatus(id, act);
    }
  });
  function setOpenGroup(key, scroll) {
    openGroup = key;
    ls.set(groupKey(), key);
    $$("#checklist .grp").forEach(g => {
      const open = g.dataset.g === key;
      g.classList.toggle("open", open);
      $(".group", g).setAttribute("aria-expanded", String(open));
      $(".g-body", g).hidden = !open;
    });
    if (scroll && key) {
      const g = $(`#checklist .grp[data-g="${key}"]`);
      if (g) setTimeout(() => {
        // scroll only the checklist pane (scrollIntoView would also shift the sliding viewport sideways)
        const pane = $('.pane[data-page="checklist"]');
        const top = g.getBoundingClientRect().top - pane.getBoundingClientRect().top + pane.scrollTop - 8;
        pane.scrollTo({ top, behavior: "smooth" });
      }, 30);
    }
  }
  function rerenderKeepScroll() {
    const pane = $('.pane[data-page="checklist"]');
    const top = pane.scrollTop;
    renderChecklist(); updateProgress();
    pane.scrollTop = top;
  }
  function setStatus(id, act) {
    const cur = statusOf(id);
    if (act === cur) delete state.done[id];                       // tap again to clear
    else state.done[id] = act === "na" ? "NA" : new Date().toISOString().slice(0, 10);
    naExpanded.delete(id);                                        // a card marked N/A starts collapsed
    save();
    rerenderKeepScroll();
    if (navigator.vibrate) navigator.vibrate(8);
  }

  // ---------- report ----------
  function buildReport() {
    const { done, na, applicable, pct } = counts();
    const name = $("#yourName").value.trim();
    const note = $("#note").value.trim();
    const lines = [
      "Squadron Commander Progress Report",
      `CAP ID: ${capId}` + (name ? `  |  ${name}` : ""),
      `Date: ${new Date().toLocaleDateString()}`,
      `Progress: ${done} of ${applicable} complete (${pct}%)` + (na ? `, ${na} not applicable` : ""), ""
    ];
    C.groups.forEach(g => {
      lines.push(g.name.toUpperCase());
      g.items.forEach(i => {
        const v = state.done[i.id];
        const mark = v === "NA" ? "N/A" : v ? "x" : " ";
        lines.push(`  [${mark}] ${i.t}` + (i.req ? " (Required)" : "") + (v && v !== "NA" ? ` (${v})` : ""));
      });
      lines.push("");
    });
    if (note) lines.push("Notes: " + note, "");
    return lines.join("\n");
  }
  ["toEmail", "yourName", "note"].forEach(id => $("#" + id).addEventListener("input", () => {
    $("#preview").textContent = buildReport();
    ls.set("cap_report_to", $("#toEmail").value); ls.set("cap_report_name", $("#yourName").value);
  }));
  $("#reportForm").addEventListener("submit", e => {
    e.preventDefault();
    const to = $("#toEmail").value.trim();
    const subj = `Squadron Commander Progress Report – CAP ID ${capId}`;
    location.href = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(buildReport())}`;
  });
  $("#copyBtn").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(buildReport()); toast("Report copied"); }
    catch (e) { toast("Copy not available"); }
  });

  // ---------- navigation / swipe ----------
  const track = $("#track"), vp = $("#viewport");
  const panes = $$(".pane");
  const pages = panes.map(p => p.dataset.page);
  const N = panes.length;
  const welcomePage = $("#welcomePage");
  let idx = 0, welcomeOpen = false;
  track.style.width = (N * 100) + "%";
  panes.forEach(p => { p.style.width = (100 / N) + "%"; });

  function setHeader() {
    const title = welcomeOpen ? "Welcome" : panes[idx].dataset.title;
    $("#title").textContent = title;
    $("#backBtn").hidden = !welcomeOpen;
    $("#brandIcon").hidden = welcomeOpen;
    const active = welcomeOpen ? "home" : pages[idx];
    $$("#tabbar button").forEach(b => b.classList.toggle("on", b.dataset.go === active));
  }
  function openWelcome() {
    welcomeOpen = true;
    welcomePage.style.transform = ""; welcomePage.classList.remove("drag");
    welcomePage.classList.add("open"); welcomePage.setAttribute("aria-hidden", "false");
    welcomePage.scrollTop = 0;
    setHeader();
    try { history.replaceState(null, "", "#welcome"); } catch (e) {}
  }
  function closeWelcome() {
    welcomeOpen = false;
    welcomePage.classList.remove("drag"); welcomePage.style.transform = "";
    welcomePage.classList.remove("open"); welcomePage.setAttribute("aria-hidden", "true");
    setHeader();
    try { history.replaceState(null, "", "#" + pages[idx]); } catch (e) {}
  }
  function go(name, anim = true) {
    if (name === "welcome") { openWelcome(); return; }
    let i = typeof name === "number" ? name : pages.indexOf(name);
    if (i < 0) i = 0;
    if (welcomeOpen) closeWelcome();
    idx = Math.max(0, Math.min(N - 1, i));
    track.classList.toggle("drag", !anim);
    track.style.transform = `translateX(${-idx * 100 / N}%)`;
    panes.forEach((p, n) => p.setAttribute("aria-hidden", n !== idx));
    setHeader();
    if (pages[idx] === "report") $("#preview").textContent = buildReport();
    try { history.replaceState(null, "", "#" + pages[idx]); } catch (e) {}
  }
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-go]"); if (!b) return;
    const target = b.dataset.go;
    go(target);
    if (target !== "welcome") { const p = panes[idx]; if (p) p.scrollTop = 0; }
  });
  $("#backBtn").addEventListener("click", closeWelcome);

  // finger-following swipe
  let sx = 0, sy = 0, dx = 0, dragging = false, locked = null, t0 = 0;
  vp.addEventListener("touchstart", e => {
    if (e.touches.length > 1 || e.target.closest("input,textarea")) return;
    sx = e.touches[0].clientX; sy = e.touches[0].clientY; dx = 0; locked = null; dragging = true; t0 = Date.now();
  }, { passive: true });
  vp.addEventListener("touchmove", e => {
    if (!dragging) return;
    const x = e.touches[0].clientX - sx, y = e.touches[0].clientY - sy;
    if (locked === null && (Math.abs(x) > 8 || Math.abs(y) > 8)) locked = Math.abs(x) > Math.abs(y) ? "h" : "v";
    if (locked !== "h") return;
    if (welcomeOpen) {                      // swipe right to go back
      dx = Math.max(0, x);
      welcomePage.classList.add("drag");
      welcomePage.style.transform = `translateX(${dx}px)`;
      return;
    }
    dx = x;
    if ((idx === 0 && dx > 0) || (idx === N - 1 && dx < 0)) dx *= 0.3;   // rubber-band at ends
    track.classList.add("drag");
    track.style.transform = `translateX(calc(${-idx * 100 / N}% + ${dx}px))`;
  }, { passive: true });
  vp.addEventListener("touchend", () => {
    if (!dragging) return; dragging = false;
    if (locked !== "h") return;
    const fast = Math.abs(dx) > 40 && Date.now() - t0 < 300;
    if (welcomeOpen) {
      if (dx > vp.clientWidth * 0.25 || (fast && dx > 0)) closeWelcome();
      else { welcomePage.classList.remove("drag"); welcomePage.style.transform = ""; }
      return;
    }
    if (dx < -vp.clientWidth * 0.25 || (fast && dx < 0)) go(idx + 1);
    else if (dx > vp.clientWidth * 0.25 || (fast && dx > 0)) go(idx - 1);
    else go(idx);
  });
  document.addEventListener("keydown", e => {
    if (e.target.closest("input,textarea")) return;
    if (welcomeOpen) { if (e.key === "ArrowLeft" || e.key === "Escape") closeWelcome(); return; }
    if (e.key === "ArrowRight") go(idx + 1);
    if (e.key === "ArrowLeft") go(idx - 1);
  });
  window.addEventListener("hashchange", () => {
    const h = location.hash.slice(1);
    if (h === "welcome" && !welcomeOpen) openWelcome();
    else if (pages.includes(h) && (welcomeOpen || h !== pages[idx])) go(h);
  });

  // ---------- account sheet ----------
  const sheet = (open) => { $("#sheet").hidden = $("#sheetBg").hidden = !open; };
  $("#menuBtn").onclick = () => sheet(true);
  $("#closeSheet").onclick = $("#sheetBg").onclick = () => sheet(false);
  $("#logoutBtn").onclick = () => {
    cookie.del("cap_id"); try { localStorage.removeItem("cap_id"); } catch (e) {}
    sheet(false); $("#app").hidden = true; $("#capId").value = ""; $("#login").hidden = false;
  };
  $("#resetBtn").onclick = () => {
    if (!confirm("Clear all checklist progress for this CAP ID?")) return;
    state = { done: {}, updated: 0 }; save(); renderChecklist(); updateProgress(); sheet(false); toast("Checklist reset");
  };

  function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); setTimeout(() => t.classList.remove("show"), 1800); }

  // ---------- PWA ----------
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
  start();
})();
