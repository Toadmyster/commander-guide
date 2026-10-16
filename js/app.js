(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const CFG = window.APP_CONFIG || {};
  const C = window.CONTENT;

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
    go(0, false);
    await pull();
  }

  // ---------- state ----------
  const key = () => "cap_checklist_" + capId;
  function loadLocal() {
    try { state = JSON.parse(ls.get(key())) || { done: {}, updated: 0 }; } catch (e) { state = { done: {}, updated: 0 }; }
    $("#toEmail").value = ls.get("cap_report_to") || CFG.DEFAULT_REPORT_EMAIL || "";
    $("#yourName").value = ls.get("cap_report_name") || "";
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
        renderAll();
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
        // text/plain avoids a CORS preflight with Apps Script
        await fetch(CFG.SYNC_URL, { method: "POST", headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({ id: capId, done: state.done, updated: state.updated }) });
        setSync("Synced ✓");
      } catch (e) { setSync("Offline — will retry on next change"); }
    }, 600);
  }
  function setSync(t) { $("#sync").textContent = t; }

  // ---------- rendering ----------
  function renderAll() { renderWelcome(); renderLinks(); renderChecklist(); updateProgress(); }

  function renderWelcome() { $("#welcome").innerHTML = C.welcome; }

  function renderLinks() {
    $("#links").innerHTML = C.links.map(l =>
      `<li><a href="${l.u}" target="_blank" rel="noopener"><strong>${l.t} ↗</strong><small>${l.d}</small></a></li>`).join("");
  }

  function renderChecklist() {
    $("#checklist").innerHTML = C.groups.map(g => {
      const n = g.items.filter(i => state.done[i.id]).length;
      return `<div class="group">${g.name}<small>${n}/${g.items.length}</small></div>` +
        g.items.map(i => `
          <div class="item ${state.done[i.id] ? "done" : ""}" data-id="${i.id}" role="checkbox" tabindex="0" aria-checked="${!!state.done[i.id]}">
            <div class="box"></div>
            <div><span class="t">${i.t}</span><span class="d">${i.d || ""}</span>
            ${i.link ? `<a href="${i.link}" target="_blank" rel="noopener">Open resource ↗</a>` : ""}</div>
          </div>`).join("");
    }).join("");
  }

  function counts() {
    const done = allItems.filter(i => state.done[i.id]).length;
    return { done, total: allItems.length, pct: Math.round(100 * done / allItems.length) };
  }
  function updateProgress() {
    const { done, total, pct } = counts();
    $("#ring").style.setProperty("--p", pct);
    $("#ringPct").textContent = pct + "%";
    $("#progText").textContent = `${done} of ${total} complete`;
    $("#barFill").style.width = pct + "%";
    $("#barText").textContent = `${done} of ${total} complete`;
    $("#preview").textContent = buildReport();
  }

  $("#checklist").addEventListener("click", e => {
    if (e.target.closest("a")) return;
    const el = e.target.closest(".item"); if (!el) return;
    toggle(el.dataset.id);
  });
  $("#checklist").addEventListener("keydown", e => {
    if (e.key === " " || e.key === "Enter") { const el = e.target.closest(".item"); if (el) { e.preventDefault(); toggle(el.dataset.id); } }
  });
  function toggle(id) {
    if (state.done[id]) delete state.done[id]; else state.done[id] = new Date().toISOString().slice(0, 10);
    save();
    const top = $$(".pane")[2].scrollTop;
    renderChecklist(); updateProgress();
    $$(".pane")[2].scrollTop = top;
    if (navigator.vibrate) navigator.vibrate(8);
  }

  // ---------- report ----------
  function buildReport() {
    const { done, total, pct } = counts();
    const name = $("#yourName").value.trim();
    const note = $("#note").value.trim();
    const lines = [
      "Squadron Commander Progress Report",
      `CAP ID: ${capId}` + (name ? `  |  ${name}` : ""),
      `Date: ${new Date().toLocaleDateString()}`,
      `Progress: ${done} of ${total} (${pct}%)`, ""
    ];
    C.groups.forEach(g => {
      lines.push(g.name.toUpperCase());
      g.items.forEach(i => lines.push(`  [${state.done[i.id] ? "x" : " "}] ${i.t}` + (state.done[i.id] ? ` (${state.done[i.id]})` : "")));
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
  const panes = $$(".pane"), N = panes.length;
  let idx = 0;

  function go(i, anim = true) {
    idx = Math.max(0, Math.min(N - 1, i));
    track.classList.toggle("drag", !anim);
    track.style.transform = `translateX(${-idx * 100 / N}%)`;
    $$("#tabbar button").forEach((b, n) => b.classList.toggle("on", n === idx));
    $("#title").textContent = panes[idx].dataset.title;
    panes.forEach((p, n) => p.setAttribute("aria-hidden", n !== idx));
    if (idx === 3) $("#preview").textContent = buildReport();
    try { history.replaceState(null, "", "#" + idx); } catch (e) {}
  }
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-go]"); if (b) { go(+b.dataset.go); panes[idx].scrollTop = 0; }
  });

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
    dx = x;
    // rubber-band at the ends
    if ((idx === 0 && dx > 0) || (idx === N - 1 && dx < 0)) dx *= 0.3;
    track.classList.add("drag");
    track.style.transform = `translateX(calc(${-idx * 100 / N}% + ${dx}px))`;
  }, { passive: true });
  vp.addEventListener("touchend", () => {
    if (!dragging) return; dragging = false;
    if (locked !== "h") return;
    const fast = Math.abs(dx) > 40 && Date.now() - t0 < 300;
    if (dx < -vp.clientWidth * 0.25 || (fast && dx < 0)) go(idx + 1);
    else if (dx > vp.clientWidth * 0.25 || (fast && dx > 0)) go(idx - 1);
    else go(idx);
  });
  // keyboard / trackpad support for desktop
  document.addEventListener("keydown", e => {
    if (e.target.closest("input,textarea")) return;
    if (e.key === "ArrowRight") go(idx + 1); if (e.key === "ArrowLeft") go(idx - 1);
  });
  window.addEventListener("hashchange", () => { const n = +location.hash.slice(1); if (!isNaN(n) && n !== idx) go(n); });

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
  const h = +location.hash.slice(1);
  start();
  if (!isNaN(h) && h > 0 && capId) go(h, false);
})();
