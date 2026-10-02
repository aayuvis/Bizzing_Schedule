/* main.js — state, render, and the one dispatcher.

   The family idiom: state → render() → a string of markup, and every button
   carries data-act="name". One click listener finds the nearest data-act and
   runs ACT[name]; one submit listener runs FORM[name]. Nothing else listens. */

/* Fonts are bundled, never fetched from a third party: offline-first, and
   nothing on a child's screen phones anyone. Latin subsets only. */
import '@fontsource/nunito/latin-600.css';
import '@fontsource/nunito/latin-700.css';
import '@fontsource/nunito/latin-800.css';
import '@fontsource/nunito/latin-900.css';
import '@fontsource/fredoka/latin-500.css';
import '@fontsource/fredoka/latin-600.css';
import '../styles/app.css';
import { Store } from './store.js';
import { ymd, nowMin, hm, addDays, parseYmd, clock } from './time.js';
import { CATS } from './cats.js';
import * as M from './model.js';
import { award, BADGES } from './badges.js';
import { parse } from './parse.js';
import { demoHousehold, starterWeek } from './demo.js';
import { today as vToday } from './views/today.js';
import { board as vBoard, COLS } from './views/board.js';
import { week as vWeek, weekSlotTime } from './views/week.js';
import { goals as vGoals, GOAL_TEMPLATES } from './views/goals.js';
import { hive as vHive } from './views/hive.js';
import { grown as vGrown, gate } from './views/grown.js';
import { modal, onboarding, quickPreview } from './views/modals.js';
import { esc, icon, avatar } from './ui.js';

const $app = document.getElementById('app');

const S = {
  h: Store.loadHousehold(),
  view: 'today', grown: false, grownTab: 'overview', kudosKid: null,
  modal: null, toast: null, setup: false,
  boardScope: 'today', boardFilter: null, weekOf: ymd(),
  device: { nudges: Store.loadDevice('nudges', false) },
  nudged: new Set(), celebrate: [],
};
const VIEWS = ['today', 'board', 'week', 'goals', 'hive', 'grown'];
const TITLES = { today: 'Today', board: 'Board', week: 'Week', goals: 'Goals', hive: 'My Hive', grown: 'Grown-ups' };

/* The clock the whole render agrees on. ?now=YYYY-MM-DDTHH:MM pins it, so a
   test (or a screenshot) can look at 5pm on a Tuesday whenever it runs. */
const PIN = new URLSearchParams(location.search).get('now');
const clockNow = () => (PIN ? new Date(PIN) : new Date());
S.weekOf = ymd(clockNow());   // the week view opens on the week the whole render agrees on
const ctx = () => { const d = clockNow(); return { S, h: S.h, kid: M.activeKid(S.h), today: ymd(d), now: nowMin(d) }; };

let undoFn = null;
function save() { if (S.h) Store.saveHousehold(S.h); }
function toast(text, undo = null) {
  S.toast = text; undoFn = undo;
  renderToast();
  clearTimeout(toast.t);
  toast.t = setTimeout(() => { S.toast = null; undoFn = null; renderToast(); }, undo ? 5000 : 3000);
}
function renderToast() {
  let el = document.getElementById('toast');
  if (!el) { el = document.createElement('div'); el.id = 'toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
  el.className = S.toast ? 'show' : '';
  el.innerHTML = S.toast ? `${esc(S.toast)}${undoFn ? ' <button data-act="undo">Undo</button>' : ''}` : '';
}

/* Medals are computed from evidence after every change; a new one is
   celebrated exactly once. */
function checkAwards() {
  const c = ctx();
  if (!c.kid) return;
  const fresh = award(S.h, c.kid, c.today, c.now);
  if (fresh.length) { S.celebrate.push(...fresh); save(); }
  if (!S.modal && S.celebrate.length) { S.modal = { type: 'badge', b: S.celebrate.shift() }; confetti(innerWidth / 2, innerHeight / 3, 60); }
}

/* ─── render ─────────────────────────────────────────────────────────── */

const keep = ['.wk-wrap', '.kanban'];
function render() {
  const scroll = keep.map((s) => { const e = $app.querySelector(s); return e ? [e.scrollLeft, e.scrollTop] : null; });
  const hadModal = !!$app.querySelector('.sheet');
  if (!S.h || !S.h.kids.length) { $app.innerHTML = onboarding(S) + modal({ ...ctx(), S }); afterRender(hadModal); return; }
  const c = ctx();
  const V = { today: vToday, board: vBoard, week: vWeek, goals: vGoals, hive: vHive, grown: S.grown ? vGrown : gate };
  const openCount = M.tasksFor(c.kid, 'today', c.today).filter((t) => t.status !== 'done').length;
  const newKudos = c.kid.kudos.filter((k) => !k.seen).length;
  const nav = (v, ic, label, badge = '') => `<button class="nav-i ${S.view === v ? 'on' : ''}" data-act="go" data-v="${v}" aria-current="${S.view === v ? 'page' : 'false'}">${icon(ic)}<span>${label}</span>${badge}</button>`;
  $app.innerHTML = `
  <div class="shell view-${S.view}">
    <aside class="side">
      <div class="brand"><svg viewBox="0 0 32 32" class="logo" aria-hidden="true"><path d="M16 2l12 7v14l-12 7-12-7V9z" fill="var(--honey)"/><path d="M11 13h10M11 17h10M11 21h6" stroke="#2A1B4E" stroke-width="2.4" stroke-linecap="round"/></svg><span>Bizzing<b>Schedule</b></span></div>
      <div class="kids">${S.h.kids.map((k) => `<button class="kid-b ${k.id === c.kid.id ? 'on' : ''}" data-act="kid" data-id="${k.id}" title="${esc(k.name)}">${avatar(k.avatar)}<span>${esc(k.name)}</span></button>`).join('')}</div>
      <button class="qa-btn" data-act="quick">${icon('plus')}<span>Add anything</span><kbd>⌘K</kbd></button>
      <nav class="nav">
        ${nav('today', 'today', 'Today')}
        ${nav('board', 'board', 'Board', openCount ? `<span class="cnt">${openCount}</span>` : '')}
        ${nav('week', 'week', 'Week')}
        ${nav('goals', 'goals', 'Goals')}
        ${nav('hive', 'hive', 'My Hive', newKudos ? '<span class="cnt dot">●</span>' : '')}
        <div class="nav-sep"></div>
        ${nav('grown', 'grown', 'Grown-ups', S.grown ? '<span class="cnt open">open</span>' : '')}
      </nav>
      <button class="side-focus" data-act="focus">${icon('bolt')} Focus sprint</button>
      <p class="side-foot">Part of the <b>Bizzing</b> family · nothing leaves this device</p>
    </aside>
    <main class="main">
      <header class="top">
        <button class="top-kid" data-act="kidMenu">${avatar(c.kid.avatar)}<b>${esc(c.kid.name)}</b>${S.h.kids.length > 1 ? icon('right', 'rot') : ''}</button>
        <h1 class="top-t">${TITLES[S.view]}</h1>
        <button class="top-search" data-act="quick">${icon('search')}<span>Add anything… <em>piano mon wed 5pm</em></span><kbd>⌘K</kbd></button>
        <div class="top-r">
          <button class="icon-btn m-only" data-act="go" data-v="hive" aria-label="My Hive">${icon('hive')}</button>
          <button class="icon-btn m-only" data-act="go" data-v="grown" aria-label="Grown-ups">${icon('grown')}</button>
          <button class="icon-btn ${S.device.nudges ? 'on' : ''}" data-act="nudgeBell" aria-label="Nudges" title="${S.device.nudges ? 'Nudges on' : 'Nudges off'}">${icon('bell')}</button>
        </div>
      </header>
      ${S.h.demo ? `<div class="demo-bar">👀 <span>Sample family<span class="d-long"> — tap anything; it stays on this device</span>.</span> <button data-act="leaveDemo">Set up ours →</button></div>` : ''}
      <div class="view">${V[S.view](c)}</div>
    </main>
    <nav class="tabbar">
      ${[['today', 'today', 'Today'], ['week', 'week', 'Week'], ['+'], ['board', 'board', 'Board'], ['goals', 'goals', 'Goals']].map(([v, ic, l]) => v === '+'
        ? `<button class="tab-add" data-act="quick" aria-label="Add anything">${icon('plus')}</button>`
        : `<button class="tab ${S.view === v ? 'on' : ''}" data-act="go" data-v="${v}">${icon(ic)}<span>${l}</span></button>`).join('')}
    </nav>
  </div>
  ${modal(c)}`;
  keep.forEach((s, i) => { const e = $app.querySelector(s); if (e && scroll[i]) { e.scrollLeft = scroll[i][0]; e.scrollTop = scroll[i][1]; } });
  /* A phone opens the week at the end of school — the part of the day that is
     actually the child's to plan — the way a calendar opens at working hours. */
  const wk = $app.querySelector('.wk-wrap');
  if (wk && !scroll[0] && innerWidth <= 860) wk.scrollTop = (14.5 - 7) * 60 * 0.9 + 10;
  afterRender(hadModal);
}

function afterRender(hadModal) {
  const sheet = $app.querySelector('.sheet');
  if (sheet && !hadModal) {
    const f = sheet.querySelector('[autofocus], #qa-input') || sheet.querySelector('button, input');
    if (f) f.focus({ preventScroll: true });
  }
  if (S.modal && S.modal.type === 'focus' && S.modal.running) tickFocus();
}

/* ─── helpers ────────────────────────────────────────────────────────── */

const kidOf = (id) => (id && S.h.kids.find((k) => k.id === id)) || M.activeKid(S.h);
const go = (v) => { S.view = v; S.modal = null; if (location.hash !== '#' + v) history.pushState(null, '', '#' + v); render(); scrollTo(0, 0); };
const close = () => { S.modal = null; checkAwards(); render(); };

function confetti(x, y, n = 28) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const colors = ['#F5A524', '#FCD34D', '#EC4899', '#22C55E', '#6366F1', '#0EA5E9'];
  for (let i = 0; i < n; i++) {
    const d = document.createElement('i');
    d.className = 'conf';
    d.style.cssText = `left:${x}px;top:${y}px;background:${colors[i % colors.length]}`;
    document.body.appendChild(d);
    const a = Math.random() * Math.PI * 2, v = 80 + Math.random() * 180;
    d.animate([{ transform: 'translate(0,0) rotate(0) scale(1)', opacity: 1 },
               { transform: `translate(${Math.cos(a) * v}px,${Math.sin(a) * v + 140}px) rotate(${Math.random() * 720}deg) scale(.6)`, opacity: 0 }],
              { duration: 900 + Math.random() * 500, easing: 'cubic-bezier(.2,.7,.4,1)' }).onfinish = () => d.remove();
  }
}
const burstAt = (el, n) => { if (!el) return confetti(innerWidth / 2, innerHeight / 2, n); const r = el.getBoundingClientRect(); confetti(r.left + r.width / 2, r.top + r.height / 2, n); };

function download(name, text) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
  a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

/* ─── actions ────────────────────────────────────────────────────────── */

const ACT = {
  go: (d) => go(d.v),
  kid: (d) => { S.h.active = d.id; save(); render(); },
  kidMenu: () => { if (S.h.kids.length < 2) return go('grown'); const i = S.h.kids.findIndex((k) => k.id === M.activeKid(S.h).id); S.h.active = S.h.kids[(i + 1) % S.h.kids.length].id; save(); render(); toast(`Showing ${M.activeKid(S.h).name}'s plan`); },
  quick: () => { S.modal = { type: 'quick', q: '' }; render(); },
  help: () => { S.modal = { type: 'help' }; render(); },
  close, closeBg: (d, el, e) => { if (e.target === el && S.modal?.type !== 'focus') close(); },
  undo: () => { if (undoFn) { undoFn(); undoFn = null; S.toast = null; save(); render(); renderToast(); } },

  /* check-ins */
  mark: (d, el) => {
    const c = ctx(), prev = (c.kid.log[c.today] || {})[d.id]?.s ?? null;
    M.mark(c.kid, d.id, c.today, d.s || null);
    save();
    if (d.s === 'done') burstAt(el, 26);
    const r = c.kid.routines.find((x) => x.id === d.id);
    if (S.modal?.type === 'blockMenu') S.modal = null;
    checkAwards(); render();
    if (d.s) toast(d.s === 'done' ? `🍯 ${r.title} — done!` : d.s === 'part' ? `🌗 Partly counts. ${r.title}` : `Skipped ${r.title}. No worries.`, () => M.mark(c.kid, d.id, c.today, prev));
  },
  later: (d) => {
    const c = ctx(), b = M.blocksFor(c.kid, c.today).find((x) => x.r.id === d.id);
    M.shift(c.kid, d.id, c.today, Math.max(b.start, c.now) + (+d.m || 15));
    save(); S.modal = null; render(); toast(`${b.r.title} moved to ${clock(M.blocksFor(c.kid, c.today).find((x) => x.r.id === d.id).start)} today`);
  },
  blockMenu: (d) => { S.modal = { type: 'blockMenu', id: d.id }; render(); },
  wrapUp: () => { S.modal = { type: 'wrap' }; render(); },
  wrapMark: (d, el) => { const c = ctx(); M.mark(c.kid, d.id, c.today, d.s); save(); if (d.s === 'done') burstAt(el, 12); render(); },
  mood: (d) => { const c = ctx(); c.kid.mood[c.today] = d.v; save(); render(); },
  wrapDone: () => { S.modal = null; confetti(innerWidth / 2, innerHeight / 2, 50); checkAwards(); render(); toast('Day wrapped. Sleep well 🌙'); },
  quickLog: (d, el) => { const c = ctx(); M.addExtra(c.kid, c.today, { cat: d.cat, mins: +d.m, title: el.textContent.replace(/^\S+\s\+\d+m\s/, '').replace(/^./, (x) => x.toUpperCase()) }); save(); render(); toast(`Logged ${d.m} min of ${CATS[d.cat].name.toLowerCase()}`); },
  rmExtra: (d) => { const c = ctx(); M.removeExtra(c.kid, c.today, d.id); save(); render(); },
  openKudos: () => { const k = M.activeKid(S.h).kudos.find((x) => !x.seen); if (!k) return; k.seen = true; save(); S.modal = { type: 'kudosOpen', id: k.id }; render(); confetti(innerWidth / 2, innerHeight / 3, 50); },

  /* routines */
  newRoutine: (d) => { S.modal = { type: 'routine', kid: d.kid || '', anchor: !!d.anchor, oneOff: false, date: d.date || null, days: d.date ? [(parseYmd(d.date).getDay() + 6) % 7] : null, start: d.start ? +d.start : null }; render(); },
  editRoutine: (d) => {
    const k = kidOf(d.kid), r = k.routines.find((x) => x.id === d.id);
    if (!r) return;
    S.modal = { type: 'routine', id: r.id, kid: d.kid || '', r: { ...r } }; render();
  },
  rmRoutine: (d) => {
    const k = kidOf(S.modal?.kid), c = ctx();
    const r = k.routines.find((x) => x.id === d.id);
    M.removeRoutine(k, d.id, c.today); save(); S.modal = null; render(); toast(`Removed ${r.title} from the plan`);
  },
  daysPreset: (d, el) => { const f = el.closest('form'); for (let i = 0; i < 7; i++) f[`d${i}`].checked = d.v === 'all' || i < 5; },
  findTime: (d, el) => {
    const f = el.closest('form'), k = kidOf(f.kid.value);
    const days = [0, 1, 2, 3, 4, 5, 6].filter((i) => f[`d${i}`].checked);
    const t = M.suggestStart({ ...k, routines: k.routines.filter((r) => r.id !== f.id.value) }, days.length ? days : [0, 1, 2, 3, 4], +f.dur.value, ctx().today);
    if (t == null) return toast('No free slot that fits every chosen day — try fewer days or a shorter time.');
    f.start.value = `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
    toast(`✨ ${clock(t)} is free on every day you picked`);
  },

  /* tasks */
  newTask: (d) => { S.modal = { type: 'task', goal: d.goal || null }; render(); },
  editTask: (d) => { const t = M.activeKid(S.h).tasks.find((x) => x.id === d.id); if (t) { S.modal = { type: 'task', id: t.id, t: JSON.parse(JSON.stringify(t)) }; render(); } },
  rmTask: (d) => { const k = M.activeKid(S.h); const t = k.tasks.find((x) => x.id === d.id); const i = k.tasks.indexOf(t); k.tasks.splice(i, 1); save(); S.modal = null; render(); toast(`Deleted “${t.title}”`, () => k.tasks.splice(i, 0, t)); },
  toggleTask: (d, el) => { const c = ctx(); const t = c.kid.tasks.find((x) => x.id === d.id); const was = t.status; M.moveTask(c.kid, d.id, t.status === 'done' ? 'todo' : 'done', c.today); if (t.status === 'done') burstAt(el, 18); save(); checkAwards(); render(); if (t.status === 'done') toast(`✅ ${t.title}`, () => M.moveTask(c.kid, d.id, was, c.today)); },
  taskMove: (d, el) => moveCard(d.id, +d.dir, el),
  boardScope: (d) => { S.boardScope = d.v; render(); },
  boardFilter: (d) => { S.boardFilter = d.v || null; render(); },

  /* week */
  weekNav: (d) => { S.weekOf = +d.d === 0 ? ymd(clockNow()) : addDays(S.weekOf, +d.d); render(); },
  weekSlot: (d, el, e) => {
    const r = el.getBoundingClientRect();
    ACT.newRoutine({ date: d.date, start: weekSlotTime(e.clientY - r.top) });
  },
  huddle: () => { S.modal = { type: 'huddle', step: 0 }; render(); },
  hudStep: (d) => { S.modal.step = +d.v; render(); },

  /* goals */
  newGoal: () => { S.modal = { type: 'goal' }; render(); },
  goalTpl: (d) => { const t = GOAL_TEMPLATES.find((x) => x.key === d.v); S.modal = { type: 'goal', tpl: d.v, g: { ...JSON.parse(JSON.stringify(t)), steps: t.steps.map((s) => ({ id: 'n', t: s, done: false })), krs: t.krs.map((k) => ({ id: 'n', ...k })) } }; render(); },
  editGoal: (d) => { const g = M.activeKid(S.h).goals.find((x) => x.id === d.id); S.modal = { type: 'goal', id: g.id, g: JSON.parse(JSON.stringify(g)) }; render(); },
  rmGoal: (d) => { S.modal = { type: 'confirm', title: 'Delete this goal?', text: 'Its tasks stay on the board. This can’t be undone.', ok: 'Delete', act: 'rmGoalYes', id: d.id }; render(); },
  rmGoalYes: (d) => { const k = M.activeKid(S.h); k.goals = k.goals.filter((g) => g.id !== d.id); k.tasks.forEach((t) => { if (t.goalId === d.id) t.goalId = null; }); save(); S.modal = null; render(); },
  krBump: (d, el) => {
    const c = ctx(), g = c.kid.goals.find((x) => x.id === d.g), kr = g.krs.find((x) => x.id === d.k);
    if (kr.per === 'week') { const key = addDays(c.today, -((parseYmd(c.today).getDay() + 6) % 7)); kr.vals[key] = Math.max(0, (kr.vals[key] || 0) + +d.d); }
    else kr.value = Math.max(0, (kr.value || 0) + +d.d);
    if (+d.d > 0) burstAt(el, 14);
    save(); checkAwards(); render();
  },
  stepToggle: (d, el) => { const g = M.activeKid(S.h).goals.find((x) => x.id === d.g), s = g.steps.find((x) => x.id === d.s); s.done = !s.done; if (s.done) burstAt(el, 18); save(); render(); },
  goalDone: (d) => { const c = ctx(); const g = c.kid.goals.find((x) => x.id === d.id); g.done = c.today; save(); confetti(innerWidth / 2, innerHeight / 3, 90); checkAwards(); render(); toast(`🏔️ Summit! “${g.title}”`); },

  /* focus */
  focus: (d) => { S.modal = { type: 'focus', goal: d.goal || null }; render(); },
  focusGo: (d) => { S.modal = { ...S.modal, running: true, mins: +d.v, end: Date.now() + +d.v * 60000, start: Date.now() }; render(); },
  focusStop: () => {
    const m = S.modal, mins = Math.floor((Date.now() - m.start) / 60000);
    if (mins >= 3) { M.addFocus(M.activeKid(S.h), mins, m.goal, null, ctx().today); save(); S.modal = { ...m, running: false, finished: true, mins }; }
    else S.modal = null;
    render();
  },

  /* grown-ups */
  grownTab: (d) => { S.grownTab = d.v; if (d.kid) S.kudosKid = d.kid; if (S.view !== 'grown') S.view = 'grown'; render(); },
  lockGrown: () => { S.grown = false; go('today'); },
  viewAs: (d) => { S.h.active = d.id; save(); go('today'); },
  kudosIdea: (d, el) => { const t = el.closest('.card').querySelector('textarea'); t.value = d.v; t.focus(); },
  addKid: () => { S.modal = { type: 'kid' }; render(); },
  editKid: (d) => { S.modal = { type: 'kid', id: d.id }; render(); },
  rmKid: (d) => { S.modal = { type: 'confirm', title: 'Remove this child?', text: 'Their plan, goals and history are deleted from this device.', ok: 'Remove', act: 'rmKidYes', id: d.id }; render(); },
  rmKidYes: (d) => { S.h.kids = S.h.kids.filter((k) => k.id !== d.id); S.h.active = S.h.kids[0]?.id; save(); S.modal = null; render(); },
  nudgeBell: () => { S.grown ? (S.grownTab = 'settings', go('grown')) : ACT.nudges(); },
  nudges: async () => {
    const on = !S.device.nudges;
    if (on && typeof Notification !== 'undefined' && Notification.permission === 'default') { try { await Notification.requestPermission(); } catch {} }
    S.device.nudges = on; Store.saveDevice('nudges', on); render();
    toast(on ? '🔔 Nudges on — five minutes before each plan' : 'Nudges off');
  },
  exportData: () => { download(`bizzing-schedule-${ymd()}.json`, Store.exportBlob(S.h)); toast('Backup downloaded'); },
  changePin: () => { S.h.parent.pin = null; S.grown = false; save(); render(); },
  leaveDemo: () => { S.modal = { type: 'confirm', title: 'Leave the sample family?', text: 'The sample family is cleared from this device and you set up your own.', ok: 'Set up ours', act: 'leaveDemoYes' }; render(); },
  leaveDemoYes: () => { S.h = null; Store.wipe(); S.modal = null; S.setup = true; S.grown = false; S.view = 'today'; render(); },
  wipe: () => { S.modal = { type: 'confirm', title: 'Erase everything?', text: 'Every child, plan, goal and medal on this device. Download a backup first if you might want it.', ok: 'Erase', act: 'leaveDemoYes' }; render(); },
  setupStart: () => { S.setup = true; render(); scrollTo(0, 0); },
  setupBack: () => { S.setup = false; render(); },
  demo: () => { S.h = demoHousehold(ymd(clockNow()), nowMin(clockNow())); save(); for (const k of S.h.kids) award(S.h, k, ymd(clockNow()), nowMin(clockNow())); save(); render(); scrollTo(0, 0); toast('Meet Anaya and Kabir 👋'); },
};

/* Keyboard + touch + mouse all land on the same move. */
function moveCard(id, dir, el) {
  const c = ctx(), t = c.kid.tasks.find((x) => x.id === id);
  const order = COLS.map((x) => x[0]), i = order.indexOf(t.status), j = Math.max(0, Math.min(2, i + dir));
  if (i === j) return;
  const was = t.status;
  M.moveTask(c.kid, id, order[j], c.today);
  save();
  if (order[j] === 'done') burstAt(el, 22);
  checkAwards(); render();
  const card = $app.querySelector(`[data-card="${id}"]`); if (card && !S.modal) card.focus();
  toast(order[j] === 'done' ? `🍯 Done: ${t.title}` : `Moved to ${COLS[j][1]}`, () => M.moveTask(c.kid, id, was, c.today));
}

/* ─── forms ──────────────────────────────────────────────────────────── */

const FORM = {
  quick: (v, f) => {
    const c = ctx(); const text = (v.q || '').trim(); if (!text) return;
    const p = parse(text, c.today);
    if (p.kind === 'task') M.addTask(c.kid, { title: p.title || text, cat: p.cat, due: p.date, pri: p.pri, by: S.grown ? 'grown' : 'kid' }, c.today);
    else M.addRoutine(c.kid, { title: p.title || text, cat: p.cat, days: p.days, date: p.kind === 'event' ? p.date : null, start: p.start, dur: p.dur, by: S.grown ? 'grown' : 'kid' }, c.today);
    save();
    if (S.modal?.type === 'huddle') { f.q.value = ''; f.querySelector('#qa-prev').innerHTML = ''; render(); }
    else { S.modal = null; render(); }
    toast(p.kind === 'task' ? `📝 Added to the board: ${p.title}` : p.kind === 'event' ? `📅 ${p.title} — ${clock(p.start)}` : `🔁 ${p.title} added to the week`);
  },
  quickTask: (v, f) => {
    const c = ctx(); if (!v.t.trim()) return;
    const p = parse(v.t, c.today);
    M.addTask(c.kid, { title: p.title || v.t.trim(), cat: p.cat, due: p.date || (S.view === 'today' || S.boardScope === 'today' ? c.today : null), pri: p.pri, by: S.grown ? 'grown' : 'kid' }, c.today);
    save(); render();
    const inp = $app.querySelector(`form[data-form="quickTask"] input`); if (inp) inp.focus();
  },
  routine: (v) => {
    const c = ctx(), k = kidOf(v.kid);
    const days = [0, 1, 2, 3, 4, 5, 6].filter((i) => v[`d${i}`]);
    const once = v.rep === 'once';
    const data = { title: v.title.trim(), cat: v.cat || 'play', start: hm(v.start), dur: +v.dur, days: once ? [] : days.length ? days : [0, 1, 2, 3, 4], date: once ? v.date : null, app: v.app || null };
    if (S.grown) { data.anchor = !!v.anchor; data.auto = !!v.auto; data.by = 'grown'; }
    if (v.id) {
      const r = k.routines.find((x) => x.id === v.id);
      const timeChanged = r.start !== data.start || r.dur !== data.dur || String(r.days) !== String(data.days);
      /* A routine whose TIME changes after it has history is retired and
         replaced, so last week's numbers stay what they were. */
      if (timeChanged && r.from < c.today && !r.date && !data.date) {
        M.removeRoutine(k, r.id, c.today);
        M.addRoutine(k, { ...r, ...data, anchor: data.anchor ?? r.anchor, auto: data.auto ?? r.auto, by: data.by || r.by }, c.today);
      } else Object.assign(r, data);
    } else M.addRoutine(k, { ...data, from: c.today }, c.today);
    save(); S.modal = null; render(); toast(v.id ? 'Saved' : `🔁 ${data.title} is on the plan`);
  },
  task: (v) => {
    const c = ctx(), k = c.kid;
    const sub = [];
    for (let i = 0; `st${i}` in v; i++) if (v[`st${i}`].trim()) sub.push({ t: v[`st${i}`].trim(), done: !!v[`sd${i}`] });
    if (v.stnew && v.stnew.trim()) sub.push({ t: v.stnew.trim(), done: false });
    const data = { title: v.title.trim(), cat: v.cat || 'study', due: v.due || null, est: v.est ? +v.est : null, goalId: v.goalId || null, pri: v.pri ? 'high' : 'normal', sub };
    if (v.id) Object.assign(k.tasks.find((x) => x.id === v.id), data);
    else M.addTask(k, { ...data, by: S.grown ? 'grown' : 'kid' }, c.today);
    save(); S.modal = null; render(); toast(v.id ? 'Saved' : `📝 ${data.title}`);
  },
  goal: (v) => {
    const c = ctx(), k = c.kid;
    const krs = [];
    for (let i = 0; `krt${i}` in v; i++) {
      if (!v[`krt${i}`].trim() || !+v[`krn${i}`]) continue;
      const id = v[`kri${i}`];
      const old = S.modal.id && S.modal.g.krs.find((x) => x.id === id);
      krs.push({ ...(old || {}), id: old ? id : M.uid(), title: v[`krt${i}`].trim(), source: v[`krs${i}`], target: +v[`krn${i}`], per: v[`krp${i}`], vals: old?.vals || {}, value: old?.value || 0, unit: /^(app|cat|focus)/.test(v[`krs${i}`]) ? 'min' : (old?.unit || '') });
    }
    const steps = [];
    for (let i = 0; `gs${i}` in v; i++) if (v[`gs${i}`].trim()) steps.push({ id: M.uid(), t: v[`gs${i}`].trim(), done: !!v[`gsd${i}`] });
    const data = { title: v.title.trim(), emoji: v.emoji.trim() || '🎯', why: v.why.trim(), due: v.due || null, cat: v.cat, krs, steps };
    const editing = !!S.modal.id;
    if (S.modal.id) Object.assign(k.goals.find((g) => g.id === S.modal.id), data);
    else { M.addGoal(k, { ...data, krs: [], steps: [] }, c.today); Object.assign(k.goals.at(-1), { krs, steps }); }
    save(); S.modal = null; render(); toast(editing ? 'Saved' : `🎯 New goal: ${data.title}`);
  },
  kid: (v) => {
    if (v.id) Object.assign(S.h.kids.find((k) => k.id === v.id), { name: v.name.trim(), band: v.band, avatar: v.avatar });
    else { const k = M.newKid(v); if (v.starter) starterWeek(k, ctx().today); S.h.kids.push(k); }
    save(); S.modal = null; render();
  },
  setup: (v) => {
    const h = M.newHousehold();
    h.parent = { pin: v.pin, name: (v.from || '').trim() };
    const k = M.newKid(v); if (v.starter) starterWeek(k, ctx().today);
    h.kids.push(k); h.active = k.id;
    S.h = h; S.setup = false; save(); render(); scrollTo(0, 0);
    toast(`Welcome, ${k.name}! 🐝 Tap ✓ when you finish something.`);
  },
  unlock: (v, f) => { if (v.pin === S.h.parent.pin) { S.grown = true; render(); } else { f.pin.value = ''; f.classList.remove('shake'); void f.offsetWidth; f.classList.add('shake'); } },
  setPin: (v) => { S.h.parent.pin = v.pin; S.grown = true; save(); render(); toast('PIN set'); },
  kudos: (v, f) => {
    const k = S.h.kids.find((x) => x.id === v.kid) || M.activeKid(S.h);
    M.sendKudos(k, { from: v.from.trim(), text: v.text.trim(), sticker: v.sticker }, ctx().today);
    if (!S.h.parent.name) S.h.parent.name = v.from.trim();
    save(); f.text.value = ''; confetti(innerWidth / 2, innerHeight / 2, 40); toast(`💛 Sent to ${k.name} — it'll be waiting on their Today screen`);
  },
  huddle: (v) => {
    const c = ctx();
    const top3 = [v.p0, v.p1, v.p2].map((x) => (x || '').trim()).filter(Boolean);
    const wk = addDays(c.today, 7 - ((parseYmd(c.today).getDay() + 6) % 7));
    c.kid.huddles = c.kid.huddles.filter((x) => x.wk !== wk);
    c.kid.huddles.push({ wk, at: c.today, top3 });
    for (const t of top3) M.addTask(c.kid, { title: t, cat: 'study', due: addDays(wk, 6), pri: 'high' }, c.today);
    save(); S.modal = null; confetti(innerWidth / 2, innerHeight / 3, 60); checkAwards(); render(); toast('🧭 Week locked in. Your top three are on the board.');
  },
};

/* ─── wiring ─────────────────────────────────────────────────────────── */

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]');
  if (!el || el.tagName === 'INPUT') return;
  /* A click anywhere in a sheet bubbles up to the overlay. Only a click on the
     backdrop itself is "close" — anything else must keep its default, or a
     label would stop toggling its radio. */
  if (el.dataset.act === 'closeBg' && e.target !== el) return;
  if (el.closest('.kcard') && drag.suppress) return;
  const fn = ACT[el.dataset.act];
  if (fn) { e.preventDefault(); fn(el.dataset, el, e); }
});
document.addEventListener('change', (e) => {
  if (e.target.dataset.act === 'importData') {
    const file = e.target.files[0]; if (!file) return;
    file.text().then((t) => { S.h = Store.importBlob(t); Store.saveNow(S.h); render(); toast('Backup restored'); }).catch((err) => toast(err.message));
  }
});
document.addEventListener('submit', (e) => {
  const f = e.target.closest('form[data-form]');
  if (!f) return;
  e.preventDefault();
  const v = {};
  for (const [k, val] of new FormData(f)) v[k] = val;
  FORM[f.dataset.form]?.(v, f);
});
document.addEventListener('input', (e) => {
  const t = e.target;
  if (t.id === 'qa-input') { if (S.modal) S.modal.q = t.value; const p = document.getElementById('qa-prev'); if (p) p.innerHTML = t.value || S.modal?.type !== 'huddle' ? quickPreview(t.value, ctx().today) : ''; }
  if (t.dataset.out) { const o = document.getElementById(t.dataset.out); const n = +t.value; o.textContent = n < 60 ? `${n}m` : `${Math.floor(n / 60)}h${n % 60 ? ` ${n % 60}m` : ''}`; }
});

/* Board drag: a mouse drags after 6px; a finger after a short press, so a
   swipe still scrolls the page. Either way the drop is the same moveTask. */
const drag = { suppress: false };
document.addEventListener('pointerdown', (e) => {
  const card = e.target.closest('.kcard');
  if (!card || e.target.closest('button') || e.button > 0) return;
  Object.assign(drag, { id: card.dataset.card, card, x: e.clientX, y: e.clientY, on: false, pending: true, suppress: false, type: e.pointerType });
  if (e.pointerType !== 'mouse') drag.timer = setTimeout(() => { if (drag.pending) startDrag(e); }, 230);
});
function startDrag(e) {
  drag.on = true; drag.suppress = true;
  const r = drag.card.getBoundingClientRect();
  drag.dx = drag.x - r.left; drag.dy = drag.y - r.top;
  drag.ghost = drag.card.cloneNode(true);
  drag.ghost.classList.add('ghost');
  drag.ghost.style.width = r.width + 'px';
  document.body.appendChild(drag.ghost);
  drag.card.classList.add('lifted');
  moveGhost(drag.x, drag.y);
  navigator.vibrate?.(8);
}
function moveGhost(x, y) {
  drag.ghost.style.transform = `translate(${x - drag.dx}px,${y - drag.dy}px) rotate(2deg)`;
  document.querySelectorAll('.kcol').forEach((c) => c.classList.remove('over'));
  const col = document.elementFromPoint(x, y)?.closest('.kcol');
  if (col) col.classList.add('over');
}
document.addEventListener('pointermove', (e) => {
  if (!drag.pending) return;
  const dist = Math.hypot(e.clientX - drag.x, e.clientY - drag.y);
  if (!drag.on) {
    if (drag.type === 'mouse' && dist > 6) startDrag(e);
    else if (drag.type !== 'mouse' && dist > 10) { clearTimeout(drag.timer); drag.pending = false; }
    return;
  }
  moveGhost(e.clientX, e.clientY);
});
document.addEventListener('touchmove', (e) => { if (drag.on) e.preventDefault(); }, { passive: false });
function endDrag(e) {
  clearTimeout(drag.timer);
  if (!drag.pending) return;
  drag.pending = false;
  if (!drag.on) { if (e.type === 'pointerup' && e.target.closest('.kcard') === drag.card && !e.target.closest('button')) ACT.editTask({ id: drag.id }); return; }
  drag.on = false;
  drag.ghost.remove(); drag.card.classList.remove('lifted');
  document.querySelectorAll('.kcol').forEach((c) => c.classList.remove('over'));
  const col = document.elementFromPoint(e.clientX, e.clientY)?.closest('.kcol');
  const t = M.activeKid(S.h).tasks.find((x) => x.id === drag.id);
  if (col && t && col.dataset.col !== t.status) {
    const order = COLS.map((x) => x[0]);
    moveCard(drag.id, order.indexOf(col.dataset.col) - order.indexOf(t.status), col);
  }
  setTimeout(() => (drag.suppress = false), 50);
}
document.addEventListener('pointerup', endDrag);
document.addEventListener('pointercancel', endDrag);

let gPending = false;
document.addEventListener('keydown', (e) => {
  const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName);
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if (S.h?.kids.length) ACT.quick(); return; }
  if (e.key === 'Escape' && S.modal) { e.preventDefault(); if (S.modal.type === 'focus' && S.modal.running) return ACT.focusStop(); return close(); }
  if (typing || !S.h?.kids.length) return;
  const card = document.activeElement?.closest?.('.kcard');
  if (card && !S.modal) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); return moveCard(card.dataset.card, e.key === 'ArrowRight' ? 1 : -1, card); }
    if (e.key === 'Enter') { e.preventDefault(); return ACT.editTask({ id: card.dataset.card }); }
  }
  if (S.modal) return;
  if (gPending) { gPending = false; const v = { t: 'today', b: 'board', w: 'week', g: 'goals', h: 'hive' }[e.key]; if (v) return go(v); }
  if (e.key === 'g') { gPending = true; setTimeout(() => (gPending = false), 900); return; }
  if (e.key === '/') { e.preventDefault(); return ACT.quick(); }
  if (e.key === 'f') return ACT.focus({});
  if (e.key === '?') return ACT.help();
});

addEventListener('popstate', () => { const v = location.hash.slice(1); if (VIEWS.includes(v)) { S.view = v; S.modal = null; render(); } });

/* ─── the clock: focus timer, live "now", gentle nudges ───────────────── */

function tickFocus() {
  clearTimeout(tickFocus.t);
  const m = S.modal;
  if (!m || m.type !== 'focus' || !m.running) return;
  const left = Math.max(0, m.end - Date.now());
  const el = document.getElementById('fs-time');
  if (el) el.textContent = `${Math.floor(left / 60000)}:${String(Math.floor((left % 60000) / 1000)).padStart(2, '0')}`;
  const ring = document.querySelector('#fs-ring .ring circle:last-of-type');
  if (ring) { const c = +ring.getAttribute('stroke-dasharray'); ring.setAttribute('stroke-dashoffset', (c * (left / (m.mins * 60000))).toFixed(1)); }
  if (left <= 0) {
    M.addFocus(M.activeKid(S.h), m.mins, m.goal, null, ctx().today); save();
    S.modal = { ...m, running: false, finished: true };
    notify('⚡ Sprint complete!', `${m.mins} focused minutes. Take a break.`);
    confetti(innerWidth / 2, innerHeight / 2, 80); checkAwards(); render(); return;
  }
  tickFocus.t = setTimeout(tickFocus, 250);
}

async function notify(title, body) {
  toast(`${title} ${body}`);
  if (!S.device.nudges || typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
  try {
    const reg = await navigator.serviceWorker?.getRegistration();
    if (reg) reg.showNotification(title, { body, icon: './icon-192.png', badge: './icon-192.png', tag: title });
    else new Notification(title, { body, icon: './icon-192.png' });
  } catch {}
}

let lastMin = -1;
setInterval(() => {
  if (!S.h || !S.h.kids.length) return;
  const c = ctx();
  if (c.now === lastMin) return;
  lastMin = c.now;
  if (S.device.nudges && c.now >= 6 * 60 && c.now < 21 * 60 + 30) {
    for (const b of M.blocksFor(c.kid, c.today)) {
      const key = `${c.today}:${b.r.id}`;
      if (b.start - c.now > 0 && b.start - c.now <= 5 && !S.nudged.has(key) && b.r.cat !== 'school') {
        S.nudged.add(key); notify(`${CATS[b.r.cat].emoji} ${b.r.title} in ${b.start - c.now} min`, `${clock(b.start)} – ${clock(b.start + b.dur)}`);
      }
    }
    const open = M.dayScore(S.h, c.kid, c.today, c.today, c.now).open;
    if (c.now === 19 * 60 + 30 && open && !S.nudged.has(c.today + ':wrap')) { S.nudged.add(c.today + ':wrap'); notify('🌙 Wrap up your day', `${open} plans to check in — one tap each.`); }
  }
  const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName);
  if (!S.modal && !typing && !drag.on && (S.view === 'today' || S.view === 'week')) render();
}, 20000);

/* ─── boot ───────────────────────────────────────────────────────────── */

const start = location.hash.slice(1);
if (VIEWS.includes(start)) S.view = start;
if (new URLSearchParams(location.search).has('demo') && !S.h) ACT.demo();
if (S.h) for (const k of S.h.kids) award(S.h, k, ymd(clockNow()), nowMin(clockNow()));
render();

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  addEventListener('load', () => navigator.serviceWorker.register('./sw.js', { scope: './' }).catch(() => {}));
}

window.__bzs = { S, M, render };
