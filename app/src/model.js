/* model.js — the household, the plan, and every number the app shows.

   Views render these; they never compute them. If a view is doing arithmetic on
   a log, it is in the wrong file (the Finance rule, and it holds here).

   THE PROMISES THIS FILE KEEPS
   • Adherence is measured from evidence. A block counts as kept because the
     child said so, because a Bizzing app reported the minutes, or because the
     grown-up marked it as a fixed anchor that simply happens (school, sleep).
     Time spent in THIS app never counts for anything.
   • A block that has not ended yet is never a miss. A routine added today is
     never a miss yesterday (`from`), and a routine retired keeps its history
     (`until`) instead of being deleted out from under last week's numbers.
   • No streaks. A day with no plan costs nothing; the Hive counts good days in
     a window, never an unbroken run.
   • State is a household. Nothing child-shaped lives at the top level, so a
     second child never inherits the first's plan, log or goals. */

import { ymd, addDays, dow, weekDays, weekStart, nowMin, daysBetween } from './time.js';
import { CATS, CAT_IDS } from './cats.js';
import { appMinutes, appMinutesRange } from './activity.js';

export const uid = () => Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);

export function newHousehold() {
  return { v: 1, parent: { pin: null, name: '' }, kids: [], active: null, created: ymd() };
}

export function newKid({ name, band = '9-11', avatar = 'bizzy' }) {
  return {
    id: uid(), name: name.trim(), band, avatar, created: ymd(),
    routines: [], tasks: [], goals: [],
    log: {},      // date → { routineId: { s: 'done'|'part'|'skip', mv?: startMin } }
    extras: {},   // date → [{ id, cat, mins, title }]  (self-reported, never Bizzing time)
    mood: {},     // date → emoji
    focus: [],    // [{ d, mins, goalId?, taskId? }]
    kudos: [],    // [{ id, from, text, sticker, at, seen }]
    badges: {},   // badgeId → date earned
    huddles: [],  // [{ wk, at, top3 }]
  };
}

export const activeKid = (h) => (h && (h.kids.find((k) => k.id === h.active) || h.kids[0])) || null;
export const BANDS = { '6-8': 'Ages 6–8', '9-11': 'Ages 9–11', '12-14': 'Ages 12–14' };

/* ─── routines & the day's blocks ─────────────────────────────────────── */

export function addRoutine(kid, r, today = ymd()) {
  const x = {
    id: uid(), title: r.title, cat: r.cat || 'play', start: r.start, dur: Math.max(5, r.dur || 30),
    days: r.date ? [] : (r.days && r.days.length ? [...r.days].sort() : [0, 1, 2, 3, 4, 5, 6]),
    date: r.date || null, from: r.from || today, until: null,
    anchor: !!r.anchor, auto: !!r.auto, app: r.app || null, by: r.by || 'kid',
  };
  kid.routines.push(x);
  return x;
}

/* Retire, don't delete, once there is history: last week's numbers were made
   against this routine and must not change because it is gone this week. */
export function removeRoutine(kid, id, today = ymd()) {
  const r = kid.routines.find((x) => x.id === id);
  if (!r) return;
  const used = r.date ? r.date < today : r.from < today;
  if (used) r.until = addDays(today, -1);
  else kid.routines = kid.routines.filter((x) => x.id !== id);
}

export const onDate = (r, date) =>
  (r.date ? r.date === date : r.days.includes(dow(date))) &&
  (!r.from || r.date || date >= r.from) && (!r.until || date <= r.until);

export function blocksFor(kid, date) {
  const L = kid.log[date] || {};
  return kid.routines.filter((r) => onDate(r, date))
    .map((r) => ({ r, start: L[r.id] && L[r.id].mv != null ? L[r.id].mv : r.start, dur: r.dur }))
    .sort((a, b) => a.start - b.start || a.r.title.localeCompare(b.r.title));
}

export function ended(date, b, today, now) {
  if (date < today) return true;
  if (date > today) return false;
  return b.start + b.dur <= now;
}

/* The status of one block on one date — and HOW we know it. */
export function status(h, kid, b, date, today = ymd(), now = nowMin()) {
  const e = (kid.log[date] || {})[b.r.id];
  const over = ended(date, b, today, now);
  if (e && e.s) return { s: e.s, how: 'kid' };
  if (b.r.app) {
    const mins = appMinutes(h, kid, date)[b.r.app] || 0;
    if (mins >= b.dur * 0.6) return { s: 'done', how: 'app', mins };
    if (mins > 0 && over) return { s: 'part', how: 'app', mins };
    if (mins > 0) return { s: 'now', how: 'app', mins };
  }
  if (b.r.auto && over) return { s: 'done', how: 'auto' };
  if (over) return { s: 'open' };
  if (date === today && b.start <= now) return { s: 'now' };
  return { s: 'later' };
}

export const KEPT = { done: 1, part: 0.5, skip: 0, open: 0 };

export function mark(kid, rid, date, s) {
  const L = kid.log[date] || (kid.log[date] = {});
  const e = L[rid] || (L[rid] = {});
  if (s == null) delete e.s; else e.s = s;
  if (!Object.keys(e).length) delete L[rid];
  if (!Object.keys(L).length) delete kid.log[date];
}

export function shift(kid, rid, date, start) {
  const L = kid.log[date] || (kid.log[date] = {});
  const e = L[rid] || (L[rid] = {});
  e.mv = Math.max(0, Math.min(23 * 60 + 30, start));
}

/* ─── adherence ───────────────────────────────────────────────────────── */

export function dayScore(h, kid, date, today = ymd(), now = nowMin()) {
  let planned = 0, kept = 0, open = 0, skipped = 0, done = 0, total = 0;
  for (const b of blocksFor(kid, date)) {
    total++;
    const st = status(h, kid, b, date, today, now);
    if (!(st.s in KEPT)) continue;          // not ended and not marked: not yet due
    planned++;
    kept += KEPT[st.s];
    if (st.s === 'open') open++;
    if (st.s === 'skip') skipped++;
    if (st.s === 'done') done++;
  }
  return { planned, kept, open, skipped, done, total, pct: planned ? kept / planned : null };
}

/* Minutes KEPT per category over a set of dates. Bizzing time is the apps'
   own report and nothing else; everything else is blocks + self-report. */
export function catMinutes(h, kid, dates, today = ymd(), now = nowMin()) {
  const kept = Object.fromEntries(CAT_IDS.map((c) => [c, 0]));
  const planned = Object.fromEntries(CAT_IDS.map((c) => [c, 0]));
  for (const d of dates) {
    if (d > today) continue;
    for (const b of blocksFor(kid, d)) {
      const st = status(h, kid, b, d, today, now);
      planned[b.r.cat] += b.dur;
      if (b.r.cat !== 'bizzing' && st.s in KEPT) kept[b.r.cat] += b.dur * KEPT[st.s];
    }
    for (const x of kid.extras[d] || []) if (x.cat !== 'bizzing') kept[x.cat] += x.mins;
  }
  const apps = appMinutesRange(h, kid, dates);
  kept.bizzing = Object.values(apps).reduce((a, b) => a + b, 0);
  return { kept, planned, apps };
}

export function weekStats(h, kid, anyDate, today = ymd(), now = nowMin()) {
  const days = weekDays(anyDate);
  const per = days.map((d) => ({ d, ...(d <= today ? dayScore(h, kid, d, today, now) : { planned: 0, kept: 0, open: 0, pct: null, total: blocksFor(kid, d).length }) }));
  const planned = per.reduce((a, x) => a + x.planned, 0);
  const kept = per.reduce((a, x) => a + x.kept, 0);
  const open = per.reduce((a, x) => a + x.open, 0);
  const good = per.filter((x) => x.pct != null && x.pct >= 0.8).length;
  return { days, per, planned, kept, open, good, pct: planned ? kept / planned : null, mins: catMinutes(h, kid, days, today, now) };
}

/* 12 weeks × 7 days of day-scores, for the Hive heatmap. Oldest first. */
export function history(h, kid, weeks = 12, today = ymd(), now = nowMin()) {
  const start = addDays(weekStart(today), -7 * (weeks - 1));
  const out = [];
  for (let w = 0; w < weeks; w++) {
    const row = [];
    for (let i = 0; i < 7; i++) {
      const d = addDays(start, w * 7 + i);
      row.push({ d, future: d > today, ...(d <= today ? dayScore(h, kid, d, today, now) : {}) });
    }
    out.push(row);
  }
  return out;
}

/* Unscheduled minutes between the end of school and bedtime: the number a
   grown-up of a busy child most needs and least often sees. */
export function breathingRoom(kid, date) {
  const bl = blocksFor(kid, date);
  const school = bl.filter((b) => b.r.cat === 'school');
  const from = Math.max(15 * 60, ...school.map((b) => b.start + b.dur));
  const bed = bl.find((b) => b.r.cat === 'rest' && b.start >= 18 * 60);
  const to = bed ? bed.start : 21 * 60;
  let busy = 0, cur = from;
  for (const b of bl) {
    if (b.r.cat === 'rest' || b.r.cat === 'play') continue;   // free time is free
    const s = Math.max(b.start, cur), e = Math.min(b.start + b.dur, to);
    if (e > s) { busy += e - s; cur = e; }
  }
  return Math.max(0, to - from - busy);
}

/* Clashes: two blocks on the same date that overlap. */
export function clashes(kid, date) {
  const bl = blocksFor(kid, date), out = [];
  for (let i = 0; i < bl.length; i++)
    for (let j = i + 1; j < bl.length; j++)
      if (bl[j].start < bl[i].start + bl[i].dur) out.push([bl[i].r.id, bl[j].r.id]);
  return out;
}

/* Earliest start that is free on EVERY chosen day — "Find me a time". */
export function suggestStart(kid, days, dur, today = ymd()) {
  const dates = weekDays(today).filter((d) => days.includes(dow(d)));
  const weekend = days.every((i) => i >= 5);
  for (let t = (weekend ? 9 : 15.5) * 60; t + dur <= 20.5 * 60; t += 15) {
    const ok = dates.every((d) => blocksFor(kid, d).every((b) => t + dur <= b.start || t >= b.start + b.dur));
    if (ok) return t;
  }
  return null;
}

/* ─── self-report (the only typing a child does) ──────────────────────── */

export function addExtra(kid, date, x) {
  (kid.extras[date] || (kid.extras[date] = [])).push({ id: uid(), cat: x.cat, mins: x.mins, title: x.title || CATS[x.cat].name });
}
export function removeExtra(kid, date, id) {
  kid.extras[date] = (kid.extras[date] || []).filter((x) => x.id !== id);
  if (!kid.extras[date].length) delete kid.extras[date];
}

/* ─── tasks ───────────────────────────────────────────────────────────── */

export function addTask(kid, t, today = ymd()) {
  const x = { id: uid(), title: t.title, cat: t.cat || 'study', due: t.due || null, est: t.est || null,
              status: 'todo', goalId: t.goalId || null, pri: t.pri || 'normal', sub: t.sub || [], created: today, doneAt: null, by: t.by || 'kid' };
  kid.tasks.push(x);
  return x;
}

export function moveTask(kid, id, to, today = ymd()) {
  const t = kid.tasks.find((x) => x.id === id);
  if (!t) return null;
  t.status = to;
  t.doneAt = to === 'done' ? today : null;
  return t;
}

export function tasksFor(kid, scope, today = ymd()) {
  const wk = new Set(weekDays(today));
  return kid.tasks.filter((t) => {
    if (t.status === 'done') return scope === 'today' ? t.doneAt === today : wk.has(t.doneAt);
    if (t.status === 'doing') return true;
    if (scope === 'today') return t.due && t.due <= today;
    return !t.due || t.due <= addDays(weekStart(today), 6);
  }).sort((a, b) => (a.pri === 'high' ? -1 : 0) - (b.pri === 'high' ? -1 : 0) || (a.due || '9').localeCompare(b.due || '9'));
}

/* ─── goals ───────────────────────────────────────────────────────────── */

/* A goal is an outcome with a WHY, measured by key results that come from
   evidence (the apps, the kept blocks, the finished tasks), plus milestones a
   child ticks. A KR is weekly ("20 min of Bizzing Bee a day" → 140/week) or
   total ("finish 10 practice papers"). */
export const KR_SOURCES = {
  app: 'Minutes in a Bizzing app (automatic)',
  cat: 'Minutes kept in a kind of time',
  routine: 'Times a routine was kept',
  tasks: 'Tasks finished for this goal',
  focus: 'Focus-sprint minutes for this goal',
  manual: 'A number I count myself',
};

export function addGoal(kid, g, today = ymd()) {
  const x = { id: uid(), title: g.title, emoji: g.emoji || '🎯', why: g.why || '', cat: g.cat || 'study', due: g.due || null,
              krs: (g.krs || []).map((k) => ({ id: uid(), vals: {}, value: 0, ...k })),
              steps: (g.steps || []).map((t) => (typeof t === 'string' ? { id: uid(), t, done: false } : { id: uid(), ...t })),
              created: g.created || today, done: null };
  kid.goals.push(x);
  return x;
}

function rangeFor(g, kr, today, weekOf) {
  if (kr.per === 'week') return weekDays(weekOf || today).filter((d) => d <= today);
  const out = [];
  for (let d = g.created; d <= today && out.length < 800; d = addDays(d, 1)) out.push(d);
  return out;
}

export function krValue(h, kid, g, kr, today = ymd(), weekOf = null, now = nowMin()) {
  const dates = rangeFor(g, kr, today, weekOf);
  const set = new Set(dates);
  const [src, arg] = String(kr.source).split(':');
  switch (src) {
    case 'app': { const m = appMinutesRange(h, kid, dates); return arg ? (m[arg] || 0) : Object.values(m).reduce((a, b) => a + b, 0); }
    case 'cat': return Math.round(catMinutes(h, kid, dates, today, now).kept[arg] || 0);
    case 'routine': {
      let n = 0;
      for (const d of dates) for (const b of blocksFor(kid, d)) if (b.r.id === arg && status(h, kid, b, d, today, now).s === 'done') n++;
      return n;
    }
    case 'tasks': return kid.tasks.filter((t) => t.goalId === g.id && t.status === 'done' && (kr.per !== 'week' || set.has(t.doneAt))).length;
    case 'focus': return kid.focus.filter((f) => f.goalId === g.id && set.has(f.d)).reduce((a, f) => a + f.mins, 0);
    default: return kr.per === 'week' ? (kr.vals[weekStart(weekOf || today)] || 0) : (kr.value || 0);
  }
}

export function goalProgress(h, kid, g, today = ymd(), now = nowMin()) {
  const parts = g.krs.map((kr) => Math.min(1, krValue(h, kid, g, kr, today, null, now) / Math.max(1, kr.target)));
  if (g.steps.length) parts.push(g.steps.filter((s) => s.done).length / g.steps.length);
  return parts.length ? parts.reduce((a, b) => a + b, 0) / parts.length : 0;
}

/* The last n weeks of a weekly KR, oldest first — the sparkline. */
export function krHistory(h, kid, g, kr, n = 6, today = ymd()) {
  const out = [];
  for (let i = n - 1; i >= 0; i--) {
    const wk = addDays(weekStart(today), -7 * i);
    if (addDays(wk, 6) < g.created) { out.push(null); continue; }
    out.push(i === 0 ? krValue(h, kid, g, kr, today, wk) : krValue(h, kid, g, kr, addDays(wk, 6), wk, 24 * 60));
  }
  return out;
}

/* Days left to a goal's date, or null. */
export const daysLeft = (g, today = ymd()) => (g.due ? daysBetween(today, g.due) : null);

/* ─── focus, kudos, huddle ────────────────────────────────────────────── */

export function addFocus(kid, mins, goalId, taskId, today = ymd()) {
  kid.focus.push({ d: today, mins, goalId: goalId || null, taskId: taskId || null });
}

export function sendKudos(kid, k, today = ymd()) {
  kid.kudos.unshift({ id: uid(), from: k.from || 'A grown-up', text: k.text, sticker: k.sticker || '🌟', at: today, seen: false });
}

export const thisWeeksHuddle = (kid, today = ymd()) => kid.huddles.find((x) => x.wk === weekStart(today));

/* ─── what Bizzy says ─────────────────────────────────────────────────── */

/* Praise names the EFFORT and the specific thing — never the child's worth,
   never a comparison with anyone. A skipped day gets no comment at all. */
export function cheer(h, kid, today = ymd(), now = nowMin()) {
  const s = dayScore(h, kid, today, today, now);
  const w = weekStats(h, kid, today, today, now);
  const first = kid.name;
  if (s.total === 0) return `No plan today, ${first} — a free day is a good day too.`;
  if (s.planned === 0) return `Morning, ${first}! ${s.total} things on today's plan. One at a time.`;
  if (s.pct === 1 && s.planned === s.total) return `Every single plan kept today, ${first}. That's what steady looks like. 🍯`;
  if (s.pct >= 0.8) return `${s.done} done so far — you're keeping your word to yourself, ${first}.`;
  if (w.good >= 3) return `${w.good} strong days this week already. Tomorrow's a fresh comb.`;
  if (s.open) return `${s.open} still to check in — one tap each, whenever you're ready.`;
  return `Plans change, ${first}. What matters is you're back here. 🐝`;
}
