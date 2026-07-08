/* =====================================================================
   Nitesh Patel — Intern Prep Tracker  ·  app.js
   Vanilla JS. State persisted in localStorage. No build step.
   ===================================================================== */

const PROFILE_KEY = "tracker_active_profile";

/* ---------- Profile + State (set after login) ---------- */
let PROFILE_ID = null;
let SEED = null;
let STORE_KEY = null;
let state = null;

/* ---------- Firebase live sync (optional) ---------- */
let firebaseReady = false, fbDb = null, _pushTimer = null;

function load() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return reconcile(JSON.parse(raw));
  } catch (e) { /* fall through */ }
  // First run: deep-clone the seed
  return JSON.parse(JSON.stringify({
    plan: SEED.plan,
    skills: SEED.skills,
    companies: SEED.companies,
    resume: SEED.resume,
    stories: SEED.stories,
    contacts: SEED.contacts,
    tasksDone: {},        // taskId -> true
    daily: {},            // "YYYY-MM-DD" -> { dsa, sql, ml, stats, apti, mock }
    openWeeks: { w1: true },
    friendSnapshot: null  // read-only progress snapshot shared by a friend
  }));
}

function save() {
  state.updatedAt = Date.now();
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
  if (firebaseReady) {
    clearTimeout(_pushTimer);
    _pushTimer = setTimeout(() => { pushProgress(); pushState(); }, 600);
  }
}

// Non-destructively merge new SEED skills / plan tasks into saved state.
function reconcile(s) {
  // Firebase drops empty objects/arrays, so guarantee these always exist.
  if (!s || typeof s !== "object") s = {};
  if (!s.tasksDone || typeof s.tasksDone !== "object") s.tasksDone = {};
  if (!s.daily || typeof s.daily !== "object") s.daily = {};
  if (!s.openWeeks || typeof s.openWeeks !== "object") s.openWeeks = {};
  if (!Array.isArray(s.skills)) s.skills = JSON.parse(JSON.stringify(SEED.skills));
  if (!Array.isArray(s.plan)) s.plan = JSON.parse(JSON.stringify(SEED.plan));
  if (Array.isArray(s.skills)) {
    const have = new Set(s.skills.map(k => k.id));
    SEED.skills.forEach(sk => { if (!have.has(sk.id)) s.skills.push(JSON.parse(JSON.stringify(sk))); });
    // Refresh display metadata from SEED (labels/targets can change); keep the user's count.
    s.skills.forEach(k => {
      const seed = SEED.skills.find(x => x.id === k.id);
      if (seed) { k.name = seed.name; k.note = seed.note; k.target = seed.target; k.unit = seed.unit; k.icon = seed.icon; k.color = seed.color; }
    });
  }
  if (Array.isArray(s.plan)) {
    SEED.plan.forEach(seedWk => {
      const wk = s.plan.find(w => w.id === seedWk.id);
      if (!wk) { s.plan.push(JSON.parse(JSON.stringify(seedWk))); return; }
      // Refresh week metadata from SEED (range/title/dates can change); keep task-done state.
      wk.range = seedWk.range; wk.title = seedWk.title; wk.dates = seedWk.dates; wk.badge = seedWk.badge;
      seedWk.days.forEach(seedDay => {
        const day = wk.days.find(d => d.label === seedDay.label);
        if (!day) { wk.days.push(JSON.parse(JSON.stringify(seedDay))); return; }
        const haveT = new Set(day.tasks.map(t => t.id));
        seedDay.tasks.forEach(t => { if (!haveT.has(t.id)) day.tasks.push(JSON.parse(JSON.stringify(t))); });
      });
    });
    // Keep weeks in SEED order so "this week" detection is stable.
    s.plan.sort((a, b) => SEED.plan.findIndex(w => w.id === a.id) - SEED.plan.findIndex(w => w.id === b.id));
  }
  return s;
}

function todayKey(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

/* ---------- Helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("show"), 1800);
}
function esc(s) { return (s || "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }

/* ---------- Progress computations ---------- */
function allTasks() {
  const ids = [];
  state.plan.forEach(w => w.days.forEach(d => d.tasks.forEach(t => ids.push(t.id))));
  return ids;
}
function tasksDoneCount() {
  return allTasks().filter(id => state.tasksDone[id]).length;
}
function weekProgress(week) {
  let total = 0, done = 0;
  week.days.forEach(d => d.tasks.forEach(t => { total++; if (state.tasksDone[t.id]) done++; }));
  return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
}
function overallPct() {
  const total = allTasks().length;
  return total ? Math.round((tasksDoneCount() / total) * 100) : 0;
}
function streak() {
  let s = 0;
  const d = new Date();
  // Count consecutive days (ending today or yesterday) with any activity
  for (let i = 0; i < 365; i++) {
    const key = todayKey(d);
    const day = state.daily[key];
    const active = day && Object.values(day).some(v => v > 0);
    if (active) { s++; }
    else if (i === 0) { /* today empty, keep checking from yesterday */ }
    else { break; }
    d.setDate(d.getDate() - 1);
  }
  return s;
}
function daysUntil(dateStr) {
  const target = new Date(dateStr + "T00:00:00");
  const now = new Date(); now.setHours(0, 0, 0, 0);
  return Math.round((target - now) / 86400000);
}

/* ===================================================================
   VIEWS
   =================================================================== */
const views = {};

/* ---------- Dashboard ---------- */
views.dashboard = () => {
  const pct = overallPct();
  const done = tasksDoneCount();
  const total = allTasks().length;

  const wrap = el("div", "grid");

  // Countdown (data-driven per profile)
  const cd = el("div", "card");
  const cdList = SEED.meta.countdown || [];
  const boxes = cdList.map((c, i) =>
    `<div class="cd-box ${i === cdList.length - 1 ? 'alt' : ''}"><div class="cd-num">${Math.max(daysUntil(c.date), 0)}</div><div class="cd-lab">${esc(c.label)}</div></div>`
  ).join("");
  cd.innerHTML = `<h3>Countdown</h3><div class="countdown">${boxes}</div>`;
  wrap.appendChild(cd);

  // Stat cards
  const stats = el("div", "grid grid-4");
  stats.appendChild(statCard("Overall Prep", pct + "%", `${done}/${total} tasks done`));
  stats.appendChild(statCard("Current Streak", streak() + "🔥", "consecutive active days", true));
  const primary = skillById("dsa") || state.skills[0];
  if (primary) stats.appendChild(statCard(primary.name, primary.count, "of " + primary.target + " target"));
  if (state.companies) {
    const compDone = state.companies.filter(c => /applied|shortlist|interview|offer/i.test(c.status)).length;
    stats.appendChild(statCard("Companies Active", compDone, "applied / shortlisted+"));
  } else if (cdList[0]) {
    stats.appendChild(statCard("Days to Goal", Math.max(daysUntil(cdList[0].date), 0), "keep the momentum"));
  }
  wrap.appendChild(stats);

  // Two-column: progress + today
  const cols = el("div", "grid grid-2");

  // Skills mini progress
  const sp = el("div", "card");
  sp.innerHTML = `<h3>Skill Progress</h3>`;
  state.skills.forEach(s => {
    const p = Math.min(100, Math.round((s.count / s.target) * 100));
    const row = el("div", "", `
      <div style="display:flex;justify-content:space-between;font-size:13px;margin:10px 0 5px;">
        <span style="font-weight:600;">${s.icon} ${esc(s.name)}</span>
        <span style="color:var(--muted);">${s.count}/${s.target}</span>
      </div>
      <div class="bar ${p >= 100 ? 'green' : ''}"><span style="width:${p}%"></span></div>`);
    sp.appendChild(row);
  });
  cols.appendChild(sp);

  // This week focus
  const tw = el("div", "card");
  const curWeek = currentWeek();
  const wp = weekProgress(curWeek);
  tw.innerHTML = `<div class="card-h"><h3>This Week · ${esc(curWeek.title)}</h3><span class="chip">${wp.pct}%</span></div>
    <p class="note" style="margin-bottom:10px;">${esc(curWeek.dates)} — ${wp.done}/${wp.total} tasks</p>`;
  const todoList = el("div");
  let shown = 0;
  curWeek.days.forEach(d => d.tasks.forEach(t => {
    if (!state.tasksDone[t.id] && shown < 6) {
      todoList.appendChild(taskNode(t));
      shown++;
    }
  }));
  if (shown === 0) todoList.innerHTML = `<p class="empty">All tasks done this week. 🎉</p>`;
  tw.appendChild(todoList);
  cols.appendChild(tw);
  wrap.appendChild(cols);

  // Quick log
  const ql = el("div", "card");
  ql.innerHTML = `<div class="card-h"><h3>Log Today's Work</h3><span class="note">${todayKey()}</span></div>`;
  const logRow = el("div", "grid grid-3");
  state.skills.forEach(skill => {
    const k = skill.id;
    const today = state.daily[todayKey()] || {};
    const v = today[k] || 0;
    const box = el("div", "");
    box.innerHTML = `<div style="font-size:12px;font-weight:600;color:var(--muted);margin-bottom:6px;">${skill ? skill.name : k}</div>`;
    const c = el("div", "counter");
    const minus = el("button", "", "−");
    const val = el("div", "cval", v);
    const plus = el("button", "", "+");
    minus.onclick = () => logDelta(k, -1, val);
    plus.onclick = () => logDelta(k, +1, val);
    c.append(minus, val, plus);
    box.appendChild(c);
    logRow.appendChild(box);
  });
  ql.appendChild(logRow);
  ql.appendChild(el("p", "note", `Logging here also bumps your Skills counters and keeps your streak alive.`));
  wrap.appendChild(ql);

  return wrap;
};

function statCard(label, value, sub, accent) {
  const c = el("div", "card stat" + (accent ? " accent" : ""));
  c.innerHTML = `<span class="label">${label}</span><span class="value">${value}</span><span class="sub">${sub}</span>`;
  return c;
}

function logDelta(skillKey, delta, valNode) {
  const key = todayKey();
  if (!state.daily[key]) state.daily[key] = {};
  const cur = state.daily[key][skillKey] || 0;
  const next = Math.max(0, cur + delta);
  state.daily[key][skillKey] = next;
  if (valNode) valNode.textContent = next;
  // Mirror to skill counter
  const skill = skillById(skillKey);
  if (skill) skill.count = Math.max(0, skill.count + delta);
  save();
  // refresh streak pill + dashboard stat numbers live
  renderChrome();
  if (currentView === "dashboard") { /* numbers update on next nav; keep light */ }
}

/* ---------- 4-Week Plan ---------- */
views.plan = () => {
  const wrap = el("div");
  state.plan.forEach(week => {
    const wp = weekProgress(week);
    const isOpen = state.openWeeks[week.id];
    const wEl = el("div", "week" + (isOpen ? " open" : ""));
    const head = el("div", "week-head");
    head.innerHTML = `
      <div class="w-left">
        <div class="week-badge ${week.badge}">${week.id.replace('w', 'W')}</div>
        <div><h3>${esc(week.title)}</h3><div class="w-dates">${esc(week.dates)}</div></div>
      </div>
      <div class="week-mini">
        <div class="bar ${wp.pct >= 100 ? 'green' : ''}" style="width:90px;"><span style="width:${wp.pct}%"></span></div>
        <span class="pct">${wp.pct}%</span>
        <span style="color:var(--muted);font-size:13px;">${isOpen ? '▴' : '▾'}</span>
      </div>`;
    head.onclick = () => {
      state.openWeeks[week.id] = !state.openWeeks[week.id];
      save(); render();
    };
    wEl.appendChild(head);

    const body = el("div", "week-body");
    week.days.forEach(day => {
      const db = el("div", "day-block");
      db.appendChild(el("div", "day-label", day.label));
      day.tasks.forEach(t => db.appendChild(taskNode(t)));
      body.appendChild(db);
    });
    wEl.appendChild(body);
    wrap.appendChild(wEl);
  });
  return wrap;
};

function taskNode(t) {
  const done = !!state.tasksDone[t.id];
  const node = el("div", "task" + (done ? " done" : ""));
  node.innerHTML = `
    <input type="checkbox" ${done ? "checked" : ""} />
    <div class="t-body">
      <span class="t-tag tag-${t.tag}">${t.tag}</span>
      <div class="t-title">${esc(t.text)}</div>
    </div>`;
  const cb = $("input", node);
  node.onclick = (e) => {
    if (e.target !== cb) cb.checked = !cb.checked;
    state.tasksDone[t.id] = cb.checked;
    node.classList.toggle("done", cb.checked);
    save();
    renderChrome();
  };
  return node;
}

/* ---------- Skills ---------- */
views.skills = () => {
  const wrap = el("div", "grid");
  const card = el("div", "card");
  card.innerHTML = `<h3>Skill Counters — tap +/− as you solve</h3>`;
  state.skills.forEach(s => {
    const p = Math.min(100, Math.round((s.count / s.target) * 100));
    const row = el("div", "skill-row");
    const ic = el("div", "skill-ic"); ic.style.background = s.color; ic.textContent = s.icon;
    const info = el("div", "skill-info");
    info.innerHTML = `<div class="s-name">${esc(s.name)}</div>
      <div class="s-meta">${esc(s.note)} · ${s.count}/${s.target} ${s.unit} · ${p}%</div>
      <div class="bar ${p >= 100 ? 'green' : ''}"><span style="width:${p}%"></span></div>`;
    const counter = el("div", "counter");
    const minus = el("button", "", "−");
    const val = el("div", "cval", s.count);
    const plus = el("button", "", "+");
    minus.onclick = () => { s.count = Math.max(0, s.count - 1); save(); render(); };
    plus.onclick = () => { s.count++; save(); render(); };
    counter.append(minus, val, plus);
    row.append(ic, info, counter);
    card.appendChild(row);
  });
  wrap.appendChild(card);

  const tip = el("div", "card");
  tip.innerHTML = `<h3>Spend your marginal hour wisely</h3>
    <p class="note">Target split for the 4-week window: <b>60% DSA + SQL</b>, <b>25% ML depth</b>, <b>10% stats/puzzles</b>, <b>5% resume + outreach</b>. Medium LeetCode consistently beats hard LeetCode occasionally. Skip CP rating grinding and hard DP for now.</p>`;
  wrap.appendChild(tip);
  return wrap;
};

/* ---------- Companies ---------- */
views.companies = () => {
  const wrap = el("div", "grid");
  const tiers = [["dream", "Dream — 5-6"], ["realistic", "Realistic — 5-10"], ["stretch", "Stretch — apply, don't bank on"]];
  const statuses = ["Not started", "Researching", "Applied", "Shortlisted", "Interview", "Offer", "Rejected"];

  tiers.forEach(([tier, title]) => {
    const list = state.companies.filter(c => c.tier === tier);
    const card = el("div", "card");
    card.innerHTML = `<div class="card-h"><h3><span class="tier-pill tier-${tier === 'realistic' ? 'real' : tier}">${title}</span></h3></div>`;
    const table = el("table");
    table.innerHTML = `<thead><tr>
      <th style="width:14%">Company</th><th style="width:13%">Role</th>
      <th style="width:18%">Test format</th><th style="width:18%">Key topics</th>
      <th style="width:15%">Senior contact</th><th style="width:13%">Status</th><th style="width:5%"></th>
    </tr></thead>`;
    const tb = el("tbody");
    list.forEach(c => {
      const tr = el("tr");
      tr.appendChild(tdInput(c, "name"));
      tr.appendChild(tdInput(c, "role"));
      tr.appendChild(tdInput(c, "test"));
      tr.appendChild(tdInput(c, "topics"));
      tr.appendChild(tdInput(c, "senior"));
      // status select
      const tdS = el("td");
      const sel = el("select", "status-sel");
      statuses.forEach(s => { const o = el("option", "", s); o.value = s; if (s === c.status) o.selected = true; sel.appendChild(o); });
      sel.onchange = () => { c.status = sel.value; save(); };
      tdS.appendChild(sel);
      tr.appendChild(tdS);
      // delete
      const tdD = el("td");
      const del = el("button", "icon-btn", "✕");
      del.onclick = () => { state.companies = state.companies.filter(x => x.id !== c.id); save(); render(); };
      tdD.appendChild(del);
      tr.appendChild(tdD);
      tb.appendChild(tr);
    });
    table.appendChild(tb);
    card.appendChild(table);
    const add = el("button", "btn outline sm add-row", "+ Add company");
    add.onclick = () => {
      state.companies.push({ id: "c" + Date.now(), name: "", tier, role: "", test: "", topics: "", senior: "", status: "Not started" });
      save(); render();
    };
    card.appendChild(add);
    wrap.appendChild(card);
  });
  return wrap;
};

function tdInput(obj, field) {
  const td = el("td");
  const inp = el("input");
  inp.value = obj[field] || "";
  inp.placeholder = "—";
  inp.oninput = () => { obj[field] = inp.value; save(); };
  td.appendChild(inp);
  return td;
}

/* ---------- Resume ---------- */
views.resume = () => {
  const wrap = el("div", "grid");
  const mk = (title, items, accent) => {
    const card = el("div", "card");
    const done = items.filter(i => i.done).length;
    card.innerHTML = `<div class="card-h"><h3>${title}</h3><span class="chip">${done}/${items.length}</span></div>`;
    items.forEach(i => {
      const node = el("div", "task" + (i.done ? " done" : ""));
      node.innerHTML = `<input type="checkbox" ${i.done ? "checked" : ""} />
        <div class="t-body"><div class="t-title">${esc(i.text)}</div></div>`;
      const cb = $("input", node);
      node.onclick = (e) => { if (e.target !== cb) cb.checked = !cb.checked; i.done = cb.checked; node.classList.toggle("done", cb.checked); save(); };
      card.appendChild(node);
    });
    return card;
  };
  wrap.appendChild(mk("🔴 Critical — fix before applying anywhere", state.resume.critical));
  wrap.appendChild(mk("✍️ Content upgrades", state.resume.content));

  const ref = el("div", "card");
  ref.innerHTML = `<h3>Bullet formula (from the deck)</h3>
    <p class="note"><b>Action Verb → Method / What you did → Measurable Outcome.</b></p>
    <p class="note" style="margin-top:8px;color:var(--accent);"><s>"Worked on acoustics for the AUV project"</s></p>
    <p class="note" style="color:var(--green);">"Used TDoA algorithm for underwater pinger localization via 3 hydrophones, enabling accurate target tracking."</p>
    <p class="note" style="margin-top:10px;">Rule: if a bullet has no number, no specific tool, and no comparative result — it's filler. Cut it.</p>`;
  wrap.appendChild(ref);
  return wrap;
};

/* ---------- Tailored Resumes ---------- */
function hl(t) { return esc(t).replace(/\[([^\]]+)\]/g, '<mark class="ph">$1</mark>'); }
function rUl(arr, withHl) { return '<ul class="r-ul">' + arr.map(x => `<li>${withHl ? hl(x) : esc(x)}</li>`).join('') + '</ul>'; }
function rSection(title, innerHTML) { const d = el("div", "r-section"); d.innerHTML = `<div class="r-sec-title">${esc(title)}</div>${innerHTML}`; return d; }

function versionProjects(ver, twoPage) {
  const pool = SEED.resumeProjects;
  const order = ver.onePage.slice();
  if (twoPage) {
    // append every other project not already listed, in pool order
    Object.keys(pool).forEach(id => { if (!order.includes(id)) order.push(id); });
  }
  return order.map(id => pool[id]).filter(Boolean);
}

function resumeSheet(ver, C, twoPage) {
  const s = el("div", "resume-sheet");
  const head = el("div", "r-head");
  head.innerHTML = `
    <div class="r-name">${esc(C.name)}</div>
    <div class="r-headline">${esc(C.headline)}</div>
    <div class="r-contact">${hl(C.contact)}</div>
    <div class="r-tagline">${esc(ver.summary)}</div>`;
  s.appendChild(head);

  s.appendChild(rSection("Education", `
    <div class="r-item"><div class="r-item-h"><span>${esc(C.education.degree)}</span><span>${esc(C.education.span)}</span></div>
    <div class="r-sub">${esc(C.education.cpi)}</div></div>`));

  s.appendChild(rSection("Scholastic Achievements", rUl(C.scholastic)));

  let sk = "";
  Object.entries(ver.skills).forEach(([k, v]) => { sk += `<div class="r-skill"><span class="r-skill-k">${esc(k)}</span><span>${esc(v)}</span></div>`; });
  s.appendChild(rSection("Technical Skills", sk));

  const projs = versionProjects(ver, twoPage);
  let pj = "";
  projs.forEach(p => {
    pj += `<div class="r-item"><div class="r-item-h"><span><b>${esc(p.name)}</b> — ${esc(p.org)}</span><span>${esc(p.date)}</span></div>${rUl(p.bullets, true)}</div>`;
  });
  s.appendChild(rSection(twoPage ? "Projects" : "Key Projects", pj));

  if (twoPage) {
    s.appendChild(rSection("Relevant Coursework", `<p class="r-course">${hl(C.coursework)}</p>`));
  }

  s.appendChild(rSection("Position of Responsibility", `
    <div class="r-item"><div class="r-item-h"><span><b>${esc(C.por.title)}</b></span><span>${esc(C.por.date)}</span></div>${rUl(C.por.bullets)}</div>`));

  s.appendChild(rSection("Extracurricular Activities", rUl(C.extras)));
  return s;
}

views.resumes = () => {
  const wrap = el("div");
  const C = SEED.resumeCommon;
  if (!state.activeResume || !SEED.resumeVersions.some(v => v.id === state.activeResume)) {
    state.activeResume = SEED.resumeVersions[0].id;
  }
  if (state.resumePages !== "2") state.resumePages = state.resumePages || "1";
  const twoPage = state.resumePages === "2";
  const ver = SEED.resumeVersions.find(v => v.id === state.activeResume);

  // Genuineness banner
  const banner = el("div", "card resume-banner no-print");
  banner.innerHTML = `<p class="note"><b>✔ Everything below is real.</b> Every bullet is taken straight from your resume — no invented numbers. The only <mark class="ph">highlighted</mark> fields are personal details you fill in (email, phone, GitHub, LinkedIn) and an optional coursework line. Add a metric only if it is genuinely true. <b>Confirm all dates</b> — your original PDF had typos (years showing 2030).</p>`;
  wrap.appendChild(banner);

  // Tabs
  const tabs = el("div", "resume-tabs no-print");
  SEED.resumeVersions.forEach(v => {
    const b = el("button", "rtab" + (v.id === state.activeResume ? " active" : ""), v.label);
    b.onclick = () => { state.activeResume = v.id; save(); render(); };
    tabs.appendChild(b);
  });
  wrap.appendChild(tabs);

  // Page-length toggle + analysis + actions
  const an = el("div", "card resume-analysis no-print");
  const head = el("div", "card-h");
  head.innerHTML = `<h3>Why this version — ${esc(ver.label)}</h3>`;
  const ctrls = el("div", "r-ctrls");
  const toggle = el("div", "page-toggle");
  ["1", "2"].forEach(p => {
    const b = el("button", "pt-btn" + (state.resumePages === p ? " active" : ""), p + "-page");
    b.onclick = () => { state.resumePages = p; save(); render(); };
    toggle.appendChild(b);
  });
  const printBtn = el("button", "btn accent sm", "⤓ Download / Print PDF");
  printBtn.onclick = () => window.print();
  ctrls.append(toggle, printBtn);
  head.appendChild(ctrls);
  an.appendChild(head);
  an.insertAdjacentHTML("beforeend", `
    <p class="note"><b>Best for:</b> ${esc(ver.targets.join(", "))}</p>
    <p class="note" style="margin-top:6px;">${esc(ver.analysis)}</p>
    <p class="note" style="margin-top:8px;color:var(--accent);"><b>To make it stronger & honest:</b> ${esc(ver.tip)}</p>
    <p class="note" style="margin-top:8px;"><b>Which length?</b> Use the <b>1-page</b> cut for the IIT Bombay placement portal (mandatory). Use the <b>2-page</b> cut for off-campus applications, referrals and LinkedIn — it includes all your projects plus coursework.</p>`);
  wrap.appendChild(an);

  // The resume sheet
  wrap.appendChild(resumeSheet(ver, C, twoPage));
  return wrap;
};

/* ---------- Stories ---------- */
views.stories = () => {
  const wrap = el("div", "grid grid-2");
  state.stories.forEach(s => {
    const card = el("div", "card story-card");
    card.innerHTML = `<div class="story-label">${s.label}</div><p class="note" style="margin-bottom:10px;">${esc(s.hint)}</p>`;
    const ta = el("textarea");
    ta.value = s.text || "";
    ta.placeholder = "Write your STAR-format story here (Situation, Task, Action, Result)…";
    ta.oninput = () => { s.text = ta.value; save(); };
    card.appendChild(ta);
    wrap.appendChild(card);
  });
  return wrap;
};

/* ---------- Contacts ---------- */
views.contacts = () => {
  const wrap = el("div", "grid");
  const intro = el("div", "card");
  intro.innerHTML = `<h3>Seniors are everything</h3>
    <p class="note">They know what got asked. They'll review your resume honestly. Message them NOW — not after shortlists. Suggested opener: <i>"Hi, I'm Nitesh, Civil 2nd year, targeting analytics roles. I saw the Profiles in Analytics session — could I send my resume for one round of feedback this week?"</i></p>`;
  wrap.appendChild(intro);

  const grid = el("div", "grid grid-3");
  state.contacts.forEach(c => {
    const card = el("div", "card");
    card.innerHTML = `<div class="card-h"><h3>${esc(c.name)}</h3>
      <input type="checkbox" ${c.reached ? "checked" : ""} title="Reached out" style="width:18px;height:18px;accent-color:var(--green);"/></div>
      <p class="note" style="font-weight:600;color:var(--navy);">${esc(c.role)}</p>
      <p class="note" style="margin:6px 0;">📱 ${esc(c.phone)}</p>
      <p class="note">${esc(c.note)}</p>`;
    const cb = $("input", card);
    cb.onchange = () => { c.reached = cb.checked; save(); toast(c.reached ? "Marked as contacted ✓" : "Unmarked"); };
    grid.appendChild(card);
  });
  wrap.appendChild(grid);
  return wrap;
};

/* ---------- Resources ---------- */
views.resources = () => {  const wrap = el("div");
  SEED.resources.forEach(group => {
    wrap.appendChild(el("div", "section-title", group.cat));
    const card = el("div", "card");
    group.items.forEach(r => {
      const a = el("a", "res-link");
      a.href = r.url; a.target = "_blank"; a.rel = "noopener noreferrer";
      a.innerHTML = `<div><div class="r-name">${esc(r.name)}</div><div class="r-desc">${esc(r.desc)}</div></div><span class="r-arrow">↗</span>`;
      card.appendChild(a);
    });
    wrap.appendChild(card);
  });
  return wrap;
};

/* ---------- Additional Resources (shared links) ---------- */
views.extra = () => {
  const wrap = el("div");
  (SEED.extra || []).forEach(group => {
    wrap.appendChild(el("div", "section-title", group.cat));
    const card = el("div", "card");
    group.items.forEach(r => {
      const a = el("a", "res-link");
      a.href = r.url; a.target = "_blank"; a.rel = "noopener noreferrer";
      a.innerHTML = `<div><div class="r-name">${esc(r.name)}</div><div class="r-desc">${esc(r.desc)}</div></div><span class="r-arrow">↗</span>`;
      card.appendChild(a);
    });
    wrap.appendChild(card);
  });
  return wrap;
};

/* ---------- Daily Log ---------- */
views.log = () => {
  const wrap = el("div", "grid");

  // Heatmap (last 28 days)
  const heatCard = el("div", "card");
  heatCard.innerHTML = `<h3>Activity — last 28 days</h3>`;
  const heat = el("div", "heat");
  const d = new Date(); d.setDate(d.getDate() - 27);
  for (let i = 0; i < 28; i++) {
    const key = todayKey(d);
    const day = state.daily[key] || {};
    const total = Object.values(day).reduce((a, b) => a + b, 0);
    const lvl = total === 0 ? 0 : total < 3 ? 1 : total < 6 ? 2 : total < 12 ? 3 : 4;
    const cell = el("div", "heat-cell heat-" + lvl);
    cell.title = `${key}: ${total} items`;
    heat.appendChild(cell);
    d.setDate(d.getDate() + 1);
  }
  heatCard.appendChild(heat);
  wrap.appendChild(heatCard);

  // History list
  const histCard = el("div", "card");
  histCard.innerHTML = `<h3>Log history</h3>`;
  const keys = Object.keys(state.daily).filter(k => Object.values(state.daily[k]).some(v => v > 0)).sort().reverse();
  if (keys.length === 0) {
    histCard.appendChild(el("p", "empty", "No activity logged yet. Use the dashboard to log today's work."));
  } else {
    keys.forEach(k => {
      const day = state.daily[k];
      const row = el("div", "log-day");
      let bubbles = "";
      Object.entries(day).forEach(([sk, v]) => { if (v > 0) { const s = skillById(sk); bubbles += `<span class="log-bubble">${esc(s ? s.name : sk)}: ${v}</span>`; } });
      row.innerHTML = `<div class="d-date">${k}</div><div class="d-stats">${bubbles}</div>`;
      histCard.appendChild(row);
    });
  }
  wrap.appendChild(histCard);
  return wrap;
};

/* ---------- Friend's Progress (share-code, progress-only) ---------- */

// Build a PROGRESS-ONLY snapshot. Deliberately excludes resources, resumes,
// contacts, companies, stories — only momentum data is shared.
function buildProgressSnapshot() {
  const heat = [];
  const d = new Date(); d.setDate(d.getDate() - 27);
  for (let i = 0; i < 28; i++) {
    const day = state.daily[todayKey(d)] || {};
    heat.push(Object.values(day).reduce((a, b) => a + b, 0));
    d.setDate(d.getDate() + 1);
  }
  return {
    v: 1,
    name: SEED.meta.name,
    generated: todayKey(),
    streak: streak(),
    overallPct: overallPct(),
    tasksDone: tasksDoneCount(),
    tasksTotal: allTasks().length,
    skills: state.skills.map(s => ({ name: s.name, icon: s.icon, count: s.count, target: s.target })),
    weeks: state.plan.map(w => { const p = weekProgress(w); return { title: w.title, pct: p.pct, done: p.done, total: p.total }; }),
    heat
  };
}

function encodeSnap(o) { return btoa(unescape(encodeURIComponent(JSON.stringify(o)))); }
function decodeSnap(s) { return JSON.parse(decodeURIComponent(escape(atob(s.trim())))); }

// Read-only render of a progress snapshot (used for the friend's data).
function renderSnapshot(snap) {
  const box = el("div", "card");
  box.innerHTML = `<div class="card-h"><h3>${esc(snap.name || "Friend")}'s Progress</h3>
    <span class="note">shared ${esc(snap.generated || "")}</span></div>`;

  const stats = el("div", "grid grid-3");
  stats.appendChild(statCard("Streak", (snap.streak || 0) + "🔥", "consecutive active days", true));
  stats.appendChild(statCard("Overall Prep", (snap.overallPct || 0) + "%", `${snap.tasksDone || 0}/${snap.tasksTotal || 0} tasks done`));
  const topSkill = (snap.skills || []).reduce((a, b) => (b.count > (a ? a.count : -1) ? b : a), null);
  stats.appendChild(statCard("Most Practised", topSkill ? topSkill.count : 0, topSkill ? esc(topSkill.name) : "—"));
  box.appendChild(stats);

  if (Array.isArray(snap.skills) && snap.skills.length) {
    box.appendChild(el("h3", "", "Skill Progress"));
    snap.skills.forEach(s => {
      const p = s.target ? Math.min(100, Math.round((s.count / s.target) * 100)) : 0;
      box.appendChild(el("div", "", `
        <div style="display:flex;justify-content:space-between;font-size:13px;margin:10px 0 5px;">
          <span style="font-weight:600;">${esc(s.icon || "")} ${esc(s.name)}</span>
          <span style="color:var(--muted);">${s.count}/${s.target}</span>
        </div>
        <div class="bar ${p >= 100 ? 'green' : ''}"><span style="width:${p}%"></span></div>`));
    });
  }

  if (Array.isArray(snap.weeks) && snap.weeks.length) {
    box.appendChild(el("h3", "", "Weekly Plan"));
    snap.weeks.forEach(w => {
      box.appendChild(el("div", "", `
        <div style="display:flex;justify-content:space-between;font-size:13px;margin:10px 0 5px;">
          <span style="font-weight:600;">${esc(w.title)}</span>
          <span style="color:var(--muted);">${w.done}/${w.total} · ${w.pct}%</span>
        </div>
        <div class="bar ${w.pct >= 100 ? 'green' : ''}"><span style="width:${w.pct}%"></span></div>`));
    });
  }

  if (Array.isArray(snap.heat) && snap.heat.length) {
    box.appendChild(el("h3", "", "Activity — last 28 days"));
    const heat = el("div", "heat");
    snap.heat.forEach(total => {
      const lvl = total === 0 ? 0 : total < 3 ? 1 : total < 6 ? 2 : total < 12 ? 3 : 4;
      const cell = el("div", "heat-cell heat-" + lvl);
      cell.title = `${total} items`;
      heat.appendChild(cell);
    });
    box.appendChild(heat);
  }
  return box;
}

views.friend = () => {
  const wrap = el("div", "grid");
  const friendId = SEED.meta.friendId;
  const friendName = (PROFILES[friendId] && PROFILES[friendId].meta.name) || "your friend";

  // Firebase live mode — auto-sync, no codes needed.
  if (firebaseReady) {
    const live = el("div", "card");
    live.innerHTML = `<div class="card-h"><h3>Live Sync</h3><span class="live-dot">🟢 Connected</span></div>
      <p class="note">You're sharing your progress automatically as <strong>${esc(SEED.meta.name)}</strong> — progress only (streak, skills, task % and plan), never your resume, resources or contacts. ${esc(friendName)}'s latest progress appears below the moment they open the app.</p>`;
    wrap.appendChild(live);

    const container = el("div", "");
    container.innerHTML = `<div class="card"><p class="empty">Waiting for ${esc(friendName)} to open the app…</p></div>`;
    wrap.appendChild(container);

    try {
      const ref = fbDb.ref("progress/" + friendId);
      ref.off();
      ref.on("value", (snap) => {
        const data = snap.val();
        container.innerHTML = "";
        if (data && Array.isArray(data.skills)) container.appendChild(renderSnapshot(data));
        else container.innerHTML = `<div class="card"><p class="empty">Waiting for ${esc(friendName)} to open the app…</p></div>`;
      });
    } catch (e) { /* ignore */ }
    return wrap;
  }

  // 1) Share my progress
  const share = el("div", "card");
  share.innerHTML = `<h3>Share My Progress</h3>
    <p class="note" style="margin-bottom:10px;">This code contains <strong>only your progress</strong> — streak, skill counts, task % and weekly plan. It never includes your resources, resumes, contacts or companies. Generate it, copy, and send it to your friend.</p>`;
  const genBtn = el("button", "primary-btn", "⚙ Generate my progress code");
  const codeArea = el("textarea", "share-code");
  codeArea.readOnly = true;
  codeArea.placeholder = "Your code will appear here…";
  const copyBtn = el("button", "ghost-btn", "⧉ Copy code");
  copyBtn.style.display = "none";
  genBtn.onclick = () => {
    codeArea.value = encodeSnap(buildProgressSnapshot());
    copyBtn.style.display = "";
    toast("Progress code generated ✓");
  };
  copyBtn.onclick = async () => {
    if (!codeArea.value) return;
    try { await navigator.clipboard.writeText(codeArea.value); toast("Copied to clipboard ✓"); }
    catch (e) { codeArea.select(); document.execCommand("copy"); toast("Copied ✓"); }
  };
  share.append(genBtn, codeArea, copyBtn);
  wrap.appendChild(share);

  // 2) Load friend's progress
  const load = el("div", "card");
  load.innerHTML = `<h3>Load Your Friend's Progress</h3>
    <p class="note" style="margin-bottom:10px;">Paste the code your friend sent you, then press Show. Their progress is stored on your device only.</p>`;
  const inArea = el("textarea", "share-code");
  inArea.placeholder = "Paste your friend's code here…";
  const showBtn = el("button", "primary-btn", "👁 Show progress");
  showBtn.onclick = () => {
    const raw = inArea.value.trim();
    if (!raw) { toast("Paste a code first"); return; }
    try {
      const snap = decodeSnap(raw);
      if (!snap || typeof snap !== "object" || !Array.isArray(snap.skills)) throw new Error("bad");
      state.friendSnapshot = snap;
      save(); render();
      toast("Friend's progress loaded ✓");
    } catch (e) { toast("That code isn't valid ✗"); }
  };
  load.append(inArea, showBtn);
  wrap.appendChild(load);

  // 3) Show stored friend snapshot (if any)
  if (state.friendSnapshot) {
    wrap.appendChild(renderSnapshot(state.friendSnapshot));
    const clear = el("button", "ghost-btn danger", "✕ Remove friend's progress");
    clear.onclick = () => { state.friendSnapshot = null; save(); render(); toast("Cleared"); };
    wrap.appendChild(clear);
  }

  return wrap;
};

/* ===================================================================
   UTILS
   =================================================================== */
function skillById(id) { return state.skills.find(s => s.id === id); }
function currentWeek() {
  const tk = todayKey();
  const plan = state.plan || [];
  for (const w of plan) { if (Array.isArray(w.range) && tk >= w.range[0] && tk <= w.range[1]) return w; }
  if (plan.length && plan[0].range && tk < plan[0].range[0]) return plan[0];
  return plan[plan.length - 1] || plan[0];
}

/* ===================================================================
   RENDER / NAV
   =================================================================== */
let currentView = "dashboard";

function renderChrome() {
  $("#streakPill").textContent = `🔥 ${streak()} day streak`;
  const dt = new Date();
  $("#datePill").textContent = dt.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
}

function render() {
  const content = $("#content");
  content.innerHTML = "";
  content.appendChild(views[currentView]());
  const [title, sub] = SEED.meta.titles[currentView] || [currentView, ""];
  $("#viewTitle").textContent = title;
  $("#viewSub").textContent = sub;
  document.querySelectorAll(".nav-item").forEach(b => b.classList.toggle("active", b.dataset.view === currentView));
  renderChrome();
  window.scrollTo(0, 0);
}

/* ---- Backup / Restore / Reset ---- */
$("#exportBtn").onclick = () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `intern-prep-backup-${todayKey()}.json`;
  a.click();
  toast("Backup downloaded ✓");
};
$("#importBtn").onclick = () => $("#importInput").click();
$("#importInput").onchange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      state = JSON.parse(reader.result);
      save(); render();
      toast("Restored from backup ✓");
    } catch (err) { toast("Invalid backup file ✗"); }
  };
  reader.readAsText(file);
};
$("#resetBtn").onclick = () => {
  if (confirm("Reset everything to the original plan? Your progress will be lost (consider Backup first).")) {
    localStorage.removeItem(STORE_KEY);
    state = load();
    save(); render();
    toast("Reset to default plan");
  }
};

/* ---- Profile branding + dynamic nav ---- */
function applyBranding() {
  const m = SEED.meta;
  const bm = document.querySelector(".brand-mark"); if (bm) bm.textContent = m.initials || "";
  const bs = document.querySelector(".brand-text strong"); if (bs) bs.textContent = m.name;
  const bsp = document.querySelector(".brand-text span"); if (bsp) bsp.textContent = m.season || "";
  document.title = m.name + " · Prep Tracker";
}
function buildNav() {
  const nav = document.getElementById("nav");
  nav.innerHTML = "";
  (SEED.meta.nav || []).forEach((it, i) => {
    const b = el("button", "nav-item" + (i === 0 ? " active" : ""));
    b.dataset.view = it.view;
    b.innerHTML = `<span>${it.icon}</span> ${esc(it.label)}`;
    b.addEventListener("click", () => { currentView = it.view; render(); closeSidebar(); });
    nav.appendChild(b);
  });
}

/* Mobile sidebar drawer */
function openSidebar() {
  document.getElementById("sidebar")?.classList.add("open");
  const b = document.getElementById("backdrop"); if (b) b.hidden = false;
}
function closeSidebar() {
  document.getElementById("sidebar")?.classList.remove("open");
  const b = document.getElementById("backdrop"); if (b) b.hidden = true;
}

/* ---- Firebase live sync ---- */
function initFirebase() {
  try {
    if (typeof firebase === "undefined" || !window.FIREBASE_CONFIG || !FIREBASE_CONFIG.databaseURL) return;
    if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
    fbDb = firebase.database();
    firebaseReady = true;
  } catch (e) { firebaseReady = false; }
}
function pushProgress() {
  if (!firebaseReady || !fbDb) return;
  try { fbDb.ref("progress/" + PROFILE_ID).set(buildProgressSnapshot()); } catch (e) { /* ignore */ }
}
function pushState() {
  if (!firebaseReady || !fbDb) return;
  try { fbDb.ref("state/" + PROFILE_ID).set(state); } catch (e) { /* ignore */ }
}
// Pull the latest full state from the cloud (if newer than local) and keep it
// in sync across devices. Only adopts remote data that is NEWER, so nothing is clobbered.
function cloudRestore() {
  if (!firebaseReady || !fbDb) return;
  const ref = fbDb.ref("state/" + PROFILE_ID);
  const adopt = (remote) => {
    if (remote && (remote.updatedAt || 0) > (state.updatedAt || 0)) {
      state = reconcile(remote);
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
      render();
      return true;
    }
    return false;
  };
  ref.once("value").then((snap) => {
    if (adopt(snap.val())) toast("Progress synced from cloud ✓");
    ref.on("value", (s) => adopt(s.val()));   // live updates from your other devices
  }).catch(() => { /* ignore */ });
}

/* ---- Boot / Login ---- */
function boot(profileId) {
  PROFILE_ID = profileId;
  SEED = PROFILES[profileId];
  STORE_KEY = SEED.meta.storeKey;
  state = load();
  currentView = SEED.meta.nav[0].view;
  applyBranding();
  buildNav();
  initFirebase();
  // Persist locally only — do NOT push to the cloud yet, or an empty new device
  // could overwrite good cloud data before we restore it.
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
  render();
  cloudRestore();
}

function initLogin() {
  // Profile can be chosen via a plain link (?u=nitesh) — the most reliable path.
  const u = new URLSearchParams(location.search).get("u");
  if (u && PROFILES[u]) {
    localStorage.setItem(PROFILE_KEY, u);
    history.replaceState(null, "", location.pathname);
    boot(u);
    return;
  }
  const saved = localStorage.getItem(PROFILE_KEY);
  if (saved && PROFILES[saved]) { boot(saved); return; }
  showLogin();
}
function showLogin() {
  const ov = document.getElementById("login");
  if (ov) ov.hidden = false;
}

/* ---- Boot ---- */
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) logoutBtn.onclick = () => { localStorage.removeItem(PROFILE_KEY); location.reload(); };
const menuBtn = document.getElementById("menuBtn");
if (menuBtn) menuBtn.onclick = openSidebar;
const backdrop = document.getElementById("backdrop");
if (backdrop) backdrop.onclick = closeSidebar;
initLogin();
