/* modals.js — every sheet that opens over a screen. */

import { DAY_SHORT, clock, dur, hhmm, niceDate, addDays, ymd, weekStart } from '../time.js';
import { CATS, CAT_IDS, APPS, cat } from '../cats.js';
import { blocksFor, status, KR_SOURCES, BANDS } from '../model.js';
import { parse } from '../parse.js';
import { GOAL_TEMPLATES } from './goals.js';
import { esc, icon, avatar, AVATARS, ring, plural } from '../ui.js';

export function modal(c) {
  const m = c.S.modal;
  if (!m) return '';
  const body = { quick, routine, task, goal, blockMenu, wrap, focus, kudosOpen, badge, kid, huddle, help, confirm }[m.type](c, m);
  const wide = ['goal', 'huddle', 'focus'].includes(m.type);
  return `<div class="overlay ${m.type === 'focus' ? 'dark' : ''}" data-act="closeBg"><div class="sheet ${wide ? 'wide' : ''} sh-${m.type}" role="dialog" aria-modal="true">${body}</div></div>`;
}

const head = (t, sub = '') => `<header class="sh-h"><div><h2>${t}</h2>${sub ? `<p class="muted small">${sub}</p>` : ''}</div><button class="icon-btn" data-act="close" aria-label="Close">${icon('close')}</button></header>`;

const catPicker = (sel) => `<div class="catpick">${CAT_IDS.map((id) => `<label style="--c:${CATS[id].color};--s:${CATS[id].soft}"><input type="radio" name="cat" value="${id}" ${sel === id ? 'checked' : ''}><span>${CATS[id].emoji} ${CATS[id].name}</span></label>`).join('')}</div>`;

/* ── quick add / command palette ── */
export function quickPreview(text, today) {
  if (!text.trim()) return `<div class="qa-hint"><b>Type it the way you'd say it.</b><ul>
    <li><code>piano mon wed 5pm 30m</code> → a routine</li><li><code>maths homework tomorrow</code> → a to-do</li>
    <li><code>dentist thu 4:15pm</code> → a one-off</li><li><code>reading every day 8pm 20m</code></li></ul></div>`;
  const p = parse(text, today), x = cat(p.cat);
  const kind = { routine: '🔁 Routine', event: '📅 One-off', task: '📝 To-do' }[p.kind];
  const when = p.kind === 'routine' ? `${p.days.length === 7 ? 'every day' : p.days.map((d) => DAY_SHORT[d]).join(', ')} · ${clock(p.start)} · ${dur(p.dur)}`
    : p.kind === 'event' ? `${niceDate(p.date, today)} · ${clock(p.start)} · ${dur(p.dur)}` : p.date ? `due ${niceDate(p.date, today).toLowerCase()}` : 'no date — on the board';
  return `<div class="qa-prev" style="--c:${x.color};--s:${x.soft}"><span class="qa-kind">${kind}</span><b>${esc(p.title || '…')}</b><span class="muted">${when}</span><span class="loz" style="--c:${x.color};--s:${x.soft}">${x.emoji} ${x.name}</span>${p.pri === 'high' ? '<span class="pri">!</span>' : ''}<kbd>↵</kbd></div>`;
}

function quick(c, m) {
  const cmds = [['Go to Today', 'go', 'today', 'g t'], ['Go to Board', 'go', 'board', 'g b'], ['Go to Week', 'go', 'week', 'g w'], ['Go to Goals', 'go', 'goals', 'g g'], ['Go to Hive', 'go', 'hive', 'g h'],
                ['Start a focus sprint', 'focus', '', 'f'], ['Wrap up the day', 'wrapUp', '', ''], ['Keyboard shortcuts', 'help', '', '?']];
  return `<form class="qa" data-form="quick">
    <div class="qa-in">${icon('sparkle')}<input name="q" id="qa-input" placeholder="Add anything… “soccer tue thu 5:30pm 1h”" autocomplete="off" value="${esc(m.q || '')}" aria-label="Quick add"><kbd>esc</kbd></div>
    <div id="qa-prev">${quickPreview(m.q || '', c.today)}</div>
    <div class="qa-cmds"><small class="muted">Jump to</small>${cmds.map(([l, a, v, k]) => `<button type="button" class="qa-cmd" data-act="${a}" data-v="${v}">${l}${k ? `<kbd>${k}</kbd>` : ''}</button>`).join('')}</div>
  </form>`;
}

/* ── routine editor ── */
function routine(c, m) {
  const r = m.r || { title: '', cat: m.cat || 'study', days: m.days || [0, 1, 2, 3, 4], start: m.start ?? 17 * 60, dur: 30, anchor: !!m.anchor, auto: false, app: null };
  const locked = r.anchor && !c.S.grown && m.id;
  const one = !!(m.id ? r.date : m.oneOff);
  return `${head(m.id ? (locked ? `${cat(r.cat).emoji} ${esc(r.title)}` : 'Edit plan') : m.anchor ? 'New fixed time' : 'New plan', locked ? '🔒 A grown-up set this one. You can check it in, but not move it.' : 'Something that happens at a time — once, or every week.')}
  <form data-form="routine" class="form">
    <input type="hidden" name="id" value="${m.id || ''}"><input type="hidden" name="kid" value="${m.kid || ''}">
    <fieldset ${locked ? 'disabled' : ''}>
    <label class="fld"><span>What</span><input name="title" value="${esc(r.title)}" placeholder="Piano practice" required maxlength="60" autofocus></label>
    <div class="fld"><span>Kind</span>${catPicker(r.cat)}</div>
    <div class="fld app-fld"><span>Counted by a Bizzing app?</span><select name="app"><option value="">No — I'll check it in</option>${Object.entries(APPS).map(([id, a]) => `<option value="${id}" ${r.app === id ? 'selected' : ''}>${a.emoji} ${a.name} counts it</option>`).join('')}</select></div>
    <div class="fld"><span>When</span>
      <div class="seg sm"><label><input type="radio" name="rep" value="week" ${one ? '' : 'checked'}><span>Every week</span></label><label><input type="radio" name="rep" value="once" ${one ? 'checked' : ''}><span>Just once</span></label></div>
      <div class="days rep-week">${DAY_SHORT.map((d, i) => `<label><input type="checkbox" name="d${i}" ${r.days.includes(i) ? 'checked' : ''}><span>${d[0]}${d[1]}</span></label>`).join('')}
        <button type="button" class="btn ghost xs" data-act="daysPreset" data-v="wd">Weekdays</button><button type="button" class="btn ghost xs" data-act="daysPreset" data-v="all">Every day</button></div>
      <input class="rep-once" type="date" name="date" value="${r.date || m.date || c.today}">
    </div>
    <div class="row2">
      <label class="fld"><span>Starts</span><input type="time" name="start" value="${hhmm(r.start)}" step="300" required></label>
      <label class="fld"><span>For <output id="durOut">${dur(r.dur)}</output></span><input type="range" name="dur" min="5" max="240" step="5" value="${r.dur}" data-out="durOut"></label>
    </div>
    <button type="button" class="btn ghost sm fit" data-act="findTime">✨ Find a free time for me</button>
    ${c.S.grown ? `<div class="fld row wrap"><label class="tog"><input type="checkbox" name="anchor" ${r.anchor ? 'checked' : ''}><span>🔒 Fixed time (set by a grown-up)</span></label>
      <label class="tog"><input type="checkbox" name="auto" ${r.auto ? 'checked' : ''}><span>Counts itself (like school)</span></label></div>` : ''}
    </fieldset>
    <footer class="sh-f">${m.id && !locked ? `<button type="button" class="btn danger ghost" data-act="rmRoutine" data-id="${m.id}">${icon('trash')} Remove</button>` : '<span></span>'}
      ${locked ? `<button type="button" class="btn" data-act="close">OK</button>` : `<button class="btn">${m.id ? 'Save' : 'Add to plan'}</button>`}</footer>
  </form>`;
}

/* ── task editor ── */
function task(c, m) {
  const t = m.t || { title: '', cat: 'study', due: null, est: null, pri: 'normal', goalId: m.goal || null, sub: [], status: 'todo' };
  const goals = c.kid.goals.filter((g) => !g.done);
  return `${head(m.id ? 'Edit card' : 'New card', t.by === 'grown' ? 'Added by a grown-up' : '')}
  <form data-form="task" class="form">
    <input type="hidden" name="id" value="${m.id || ''}">
    <label class="fld"><span>What needs doing</span><input name="title" value="${esc(t.title)}" required maxlength="80" placeholder="Science fair poster" autofocus></label>
    <div class="fld"><span>Kind</span>${catPicker(t.cat)}</div>
    <div class="row2">
      <label class="fld"><span>Due</span><input type="date" name="due" value="${t.due || ''}"></label>
      <label class="fld"><span>About how long</span><select name="est">${[['', '—'], [10, '10 min'], [20, '20 min'], [30, '30 min'], [45, '45 min'], [60, '1 hour'], [90, '1½ hours'], [120, '2 hours']].map(([v, l]) => `<option value="${v}" ${String(t.est || '') === String(v) ? 'selected' : ''}>${l}</option>`).join('')}</select></label>
    </div>
    <div class="row2">
      <label class="fld"><span>Part of a goal?</span><select name="goalId"><option value="">No</option>${goals.map((g) => `<option value="${g.id}" ${t.goalId === g.id ? 'selected' : ''}>${g.emoji} ${esc(g.title)}</option>`).join('')}</select></label>
      <label class="tog fld"><input type="checkbox" name="pri" ${t.pri === 'high' ? 'checked' : ''}><span>❗ Important</span></label>
    </div>
    <div class="fld"><span>Steps</span>
      <ul class="subs">${t.sub.map((s, i) => `<li><label><input type="checkbox" name="sd${i}" ${s.done ? 'checked' : ''}><input name="st${i}" value="${esc(s.t)}" aria-label="Step ${i + 1}"></label></li>`).join('')}
        <li><input name="stnew" placeholder="+ add a step" aria-label="New step"></li></ul>
    </div>
    <footer class="sh-f">${m.id ? `<button type="button" class="btn danger ghost" data-act="rmTask" data-id="${m.id}">${icon('trash')} Delete</button>` : '<span></span>'}<button class="btn">${m.id ? 'Save' : 'Add card'}</button></footer>
  </form>`;
}

/* ── goal editor ── */
function goal(c, m) {
  if (!m.id && !m.tpl) return `${head('A new goal', 'Pick a shape — you can change everything after.')}
    <div class="tpls">${GOAL_TEMPLATES.map((t) => `<button class="tpl" data-act="goalTpl" data-v="${t.key}" style="--c:${cat(t.cat).color};--s:${cat(t.cat).soft}"><span>${t.emoji}</span><b>${t.title || 'Something else'}</b><small>${t.krs.map((k) => k.title).join(' · ') || 'Build it yourself'}</small></button>`).join('')}</div>`;
  const g = m.g;
  const routines = c.kid.routines.filter((r) => !r.until);
  const srcOpts = (sel) => [
    ...Object.entries(APPS).map(([id, a]) => [`app:${id}`, `${a.emoji} Minutes in ${a.name} (automatic)`]),
    ...CAT_IDS.filter((id) => id !== 'bizzing').map((id) => [`cat:${id}`, `${CATS[id].emoji} Minutes of ${CATS[id].name.toLowerCase()} kept`]),
    ...routines.map((r) => [`routine:${r.id}`, `🔁 Times “${r.title}” kept`]),
    ['tasks', '📝 Tasks finished for this goal'], ['focus', '⚡ Focus-sprint minutes'], ['manual', '✋ A number I count myself'],
  ].map(([v, l]) => `<option value="${v}" ${sel === v ? 'selected' : ''}>${esc(l)}</option>`).join('');
  return `${head(m.id ? 'Edit goal' : `${g.emoji} New goal`, 'An outcome, a reason, a few numbers that count themselves, and steps.')}
  <form data-form="goal" class="form">
    <input type="hidden" name="id" value="${m.id || ''}">
    <div class="row2 g-top"><label class="fld em"><span>Icon</span><input name="emoji" value="${esc(g.emoji)}" maxlength="4"></label>
      <label class="fld grow"><span>My goal</span><input name="title" value="${esc(g.title)}" required maxlength="70" placeholder="Make the district spelling bee final" autofocus></label></div>
    <label class="fld"><span>Why it matters to me</span><input name="why" value="${esc(g.why)}" maxlength="120" placeholder="Because…"></label>
    <div class="row2"><label class="fld"><span>By (optional)</span><input type="date" name="due" value="${g.due || ''}"></label>
      <label class="fld"><span>Kind</span><select name="cat">${CAT_IDS.map((id) => `<option value="${id}" ${g.cat === id ? 'selected' : ''}>${CATS[id].emoji} ${CATS[id].name}</option>`).join('')}</select></label></div>
    <div class="fld"><span>How I'll measure it</span>
      <div class="kr-ed">${[...g.krs, { id: 'new', title: '', source: 'manual', per: 'week', target: '' }].map((k, i) => `<div class="kr-row ${k.id === 'new' ? 'new' : ''}">
        <input name="krt${i}" value="${esc(k.title)}" placeholder="${k.id === 'new' ? '+ another measure, e.g. Practice minutes' : ''}" aria-label="Measure name">
        <select name="krs${i}" aria-label="Counted from">${srcOpts(k.source)}</select>
        <input name="krn${i}" type="number" min="1" max="10000" value="${k.target}" placeholder="target" aria-label="Target">
        <select name="krp${i}" aria-label="Per"><option value="week" ${k.per === 'week' ? 'selected' : ''}>per week</option><option value="total" ${k.per === 'total' ? 'selected' : ''}>in total</option></select>
        <input type="hidden" name="kri${i}" value="${k.id}"></div>`).join('')}</div></div>
    <div class="fld"><span>Steps on the way</span>
      <ol class="subs">${[...g.steps, { id: 'new', t: '', done: false }].map((s, i) => `<li><input name="gs${i}" value="${esc(s.t)}" placeholder="${s.id === 'new' ? '+ add a step' : ''}" aria-label="Step"><input type="hidden" name="gsd${i}" value="${s.done ? 1 : ''}"></li>`).join('')}</ol></div>
    <footer class="sh-f">${m.id ? `<button type="button" class="btn danger ghost" data-act="rmGoal" data-id="${m.id}">${icon('trash')} Delete goal</button>` : '<span></span>'}<button class="btn">${m.id ? 'Save' : 'Set this goal'}</button></footer>
  </form>`;
}

/* ── one block's menu ── */
function blockMenu(c, m) {
  const r = c.kid.routines.find((x) => x.id === m.id);
  return `${head(`${cat(r.cat).emoji} ${esc(r.title)}`, 'How did it go?')}
  <div class="choice">
    <button class="ch ch-done" data-act="mark" data-id="${r.id}" data-s="done"><span>✅</span>Done</button>
    <button class="ch ch-part" data-act="mark" data-id="${r.id}" data-s="part"><span>🌗</span>Partly</button>
    <button class="ch ch-skip" data-act="mark" data-id="${r.id}" data-s="skip"><span>⏭️</span>Skipped — that's OK</button>
  </div>
  <div class="row wrap center">${r.anchor ? '' : `<button class="btn ghost sm" data-act="later" data-id="${r.id}">⏰ 15 min later today</button><button class="btn ghost sm" data-act="later" data-id="${r.id}" data-m="30">30 min later</button>`}
    <button class="btn ghost sm" data-act="mark" data-id="${r.id}" data-s="">Clear</button>
    <button class="btn ghost sm" data-act="editRoutine" data-id="${r.id}">${icon('edit')} Edit</button></div>`;
}

/* ── evening wrap-up: one screen, a tap per plan ── */
function wrap(c, m) {
  const { h, kid, today: t, now } = c;
  const bl = blocksFor(kid, t).filter((b) => ['open', 'done', 'part', 'skip'].includes(status(h, kid, b, t, t, now).s) && !b.r.auto && !b.r.app);
  const moods = ['😄', '🙂', '😐', '😕', '😴'];
  return `${head('🌙 Wrap up today', 'Tap how each one went. That’s it.')}
  <ul class="wrap-list">${bl.map((b) => { const s = status(h, kid, b, t, t, now).s; return `<li style="--c:${cat(b.r.cat).color}">
    <span class="wl-t">${cat(b.r.cat).emoji} ${esc(b.r.title)}<small>${clock(b.start)}</small></span>
    <span class="wl-b">${[['done', '✅'], ['part', '🌗'], ['skip', '⏭️']].map(([v, e]) => `<button class="${s === v ? 'on' : ''}" data-act="wrapMark" data-id="${b.r.id}" data-s="${v}" aria-label="${v}">${e}</button>`).join('')}</span></li>`; }).join('') || '<li class="muted">Nothing to check in.</li>'}</ul>
  <div class="mood-q"><b>How was today?</b><div class="moods">${moods.map((e) => `<button class="${kid.mood[t] === e ? 'on' : ''}" data-act="mood" data-v="${e}">${e}</button>`).join('')}</div></div>
  <footer class="sh-f"><span class="muted small">Plans change. Skipping isn't failing — it's information.</span><button class="btn" data-act="wrapDone">All done 🍯</button></footer>`;
}

/* ── focus sprint ── */
function focus(c, m) {
  const g = m.goal && c.kid.goals.find((x) => x.id === m.goal);
  if (!m.running && !m.finished) return `${head('⚡ Focus sprint', g ? `For: ${g.emoji} ${esc(g.title)}` : 'Pick a length. Put everything else away.')}
    <div class="fs-pick">${[10, 15, 20, 25].map((n) => `<button class="fs-n" data-act="focusGo" data-v="${n}"><b>${n}</b><small>min</small></button>`).join('')}</div>
    <p class="muted small center">Short is fine. Ten focused minutes beat an hour of half-trying.</p>`;
  if (m.finished) return `<div class="fs-done"><div class="fs-big">🍯</div><h2>${m.mins} focused minutes!</h2><p>That's real work, and it's in your Hive now.</p><button class="btn" data-act="close">Nice</button></div>`;
  const left = Math.max(0, m.end - Date.now()), total = m.mins * 60000;
  const mm = Math.floor(left / 60000), ss = Math.floor((left % 60000) / 1000);
  return `<div class="fs-run"><p class="eyebrow">${g ? `${g.emoji} ${esc(g.title)}` : 'Focus sprint'}</p>
    <div class="fs-ring" id="fs-ring">${ring(1 - left / total, 240, 14, 'var(--honey)')}<div class="fs-time" id="fs-time">${mm}:${String(ss).padStart(2, '0')}</div><img class="fs-bee" src="./avatars/bizzy.png" alt=""></div>
    <div class="row center"><button class="btn ghost light" data-act="focusStop">Stop early</button></div></div>`;
}

function kudosOpen(c, m) {
  const k = c.kid.kudos.find((x) => x.id === m.id);
  return `<div class="kudos-open"><div class="ko-stk">${esc(k.sticker)}</div><blockquote>${esc(k.text)}</blockquote><p class="ko-from">— ${esc(k.from)}</p>
    <button class="btn" data-act="close">💛 Keep it in my Hive</button></div>`;
}

function badge(c, m) {
  return `<div class="badge-cel"><img src="./art/${m.b.art}.webp" alt=""><p class="eyebrow">New medal</p><h2>${esc(m.b.name)}</h2><p>${esc(m.b.desc)}</p><button class="btn" data-act="close">Brilliant!</button></div>`;
}

function kid(c, m) {
  const k = m.id ? c.h.kids.find((x) => x.id === m.id) : { name: '', band: '9-11', avatar: 'bizzy' };
  return `${head(m.id ? `Edit ${esc(k.name)}` : 'Add a child', 'First name and age band. That’s all we ever keep.')}
  <form data-form="kid" class="form"><input type="hidden" name="id" value="${m.id || ''}">
    <label class="fld"><span>First name</span><input name="name" value="${esc(k.name)}" required maxlength="20" autocomplete="off" autofocus></label>
    <div class="fld"><span>Age</span><div class="seg sm">${Object.entries(BANDS).map(([v, l]) => `<label><input type="radio" name="band" value="${v}" ${k.band === v ? 'checked' : ''}><span>${l}</span></label>`).join('')}</div></div>
    <div class="fld"><span>Avatar</span><div class="avpick">${AVATARS.map((a) => `<label><input type="radio" name="avatar" value="${a}" ${k.avatar === a ? 'checked' : ''}>${avatar(a)}</label>`).join('')}</div></div>
    ${m.id ? '' : `<label class="tog"><input type="checkbox" name="starter" checked><span>Start with a sensible week (school, homework, play, reading, bedtime) to rearrange</span></label>`}
    <footer class="sh-f">${m.id && c.h.kids.length > 1 ? `<button type="button" class="btn danger ghost" data-act="rmKid" data-id="${m.id}">Remove</button>` : '<span></span>'}<button class="btn">${m.id ? 'Save' : 'Add'}</button></footer>
  </form>`;
}

/* ── Sunday huddle: ten minutes, together, once a week ── */
function huddle(c, m) {
  const { h, kid, today: t, now } = c;
  const step = m.step || 0;
  const steps = ['Celebrate', 'Look ahead', 'Top three'];
  const nav = `<ol class="hud-steps">${steps.map((s, i) => `<li class="${i === step ? 'on' : i < step ? 'past' : ''}">${i + 1}. ${s}</li>`).join('')}</ol>`;
  let body = '';
  if (step === 0) {
    const kept = kid.tasks.filter((x) => x.status === 'done' && x.doneAt >= addDays(weekStart(t), -7));
    body = `<img src="./art/huddle.webp" alt="" class="hud-art"><h3>What went well this week?</h3>
      <p class="muted">Start here, always. Read these out loud.</p>
      <ul class="hud-wins">${kept.slice(0, 6).map((x) => `<li>✅ ${esc(x.title)}</li>`).join('') || '<li>🌱 A fresh start — that counts too.</li>'}
      ${Object.keys(kid.badges).length ? `<li>🏅 ${plural(Object.keys(kid.badges).length, 'medal')} in the Hive</li>` : ''}</ul>`;
  } else if (step === 1) {
    const nxt = addDays(weekStart(t), 7);
    body = `<h3>The week ahead</h3><p class="muted">Anything new? A test, a party, a match? Add it now — one line each.</p>
      <form data-form="quick" class="qa inline"><div class="qa-in">${icon('sparkle')}<input name="q" id="qa-input" placeholder="science test fri · birthday party sat 2pm 2h" autocomplete="off"></div><div id="qa-prev"></div></form>
      <ul class="hud-days">${[0, 1, 2, 3, 4, 5, 6].map((i) => { const d = addDays(nxt, i); const n = blocksFor(kid, d).length; return `<li><b>${DAY_SHORT[i]}</b><span>${plural(n, 'plan')}</span></li>`; }).join('')}</ul>`;
  } else {
    body = `<h3>${esc(kid.name)}'s top three for the week</h3><p class="muted">Chosen by ${esc(kid.name)}. Grown-ups can suggest; the child decides.</p>
      <form data-form="huddle" class="form">${[0, 1, 2].map((i) => `<label class="fld"><span>${['🥇', '🥈', '🥉'][i]}</span><input name="p${i}" maxlength="60" ${i === 0 ? 'required' : ''} placeholder="${['Finish the science poster', 'Practise piano 3 times', 'Beat my Bee score'][i]}"></label>`).join('')}
      <footer class="sh-f"><span></span><button class="btn">Lock in my week 🧭</button></footer></form>`;
  }
  return `${head('🪺 Sunday huddle', '10 minutes, together, once a week')}${nav}<div class="hud-body">${body}</div>
    ${step < 2 ? `<footer class="sh-f">${step ? `<button class="btn ghost" data-act="hudStep" data-v="${step - 1}">Back</button>` : '<span></span>'}<button class="btn" data-act="hudStep" data-v="${step + 1}">Next</button></footer>` : ''}`;
}

function help() {
  const k = [['⌘K / Ctrl K or /', 'Quick add anything'], ['g then t · b · w · g · h', 'Today · Board · Week · Goals · Hive'], ['f', 'Focus sprint'], ['← →', 'On a board card: move it'], ['Enter', 'On a card: open it'], ['Esc', 'Close'], ['?', 'This list']];
  return `${head('Keyboard shortcuts')}<table class="keys">${k.map(([a, b]) => `<tr><td><kbd>${a}</kbd></td><td>${b}</td></tr>`).join('')}</table>`;
}

function confirm(c, m) {
  return `${head(esc(m.title))}<p>${esc(m.text)}</p><footer class="sh-f"><button class="btn ghost" data-act="close">Cancel</button><button class="btn danger" data-act="${m.act}" data-id="${m.id || ''}">${esc(m.ok)}</button></footer>`;
}

/* ── first run ── */
export function onboarding(S) {
  if (S.setup) return `<div class="onb"><div class="onb-card card">
    <img src="./art/splash.webp" alt="" class="onb-art sm">
    <h1>Who's planning?</h1><p class="muted">Start with one child — add brothers and sisters any time.</p>
    <form data-form="setup" class="form">
      <label class="fld"><span>Your name, as the kids say it</span><input name="from" placeholder="Mum, Dad, Nani…" maxlength="24"></label>
      <label class="fld"><span>Child's first name</span><input name="name" required maxlength="20" autocomplete="off" autofocus></label>
      <div class="fld"><span>Age</span><div class="seg sm">${Object.entries(BANDS).map(([v, l], i) => `<label><input type="radio" name="band" value="${v}" ${i === 1 ? 'checked' : ''}><span>${l}</span></label>`).join('')}</div></div>
      <div class="fld"><span>Pick an avatar</span><div class="avpick">${AVATARS.slice(0, 14).map((a, i) => `<label><input type="radio" name="avatar" value="${a}" ${i === 0 ? 'checked' : ''}>${avatar(a)}</label>`).join('')}</div></div>
      <label class="fld"><span>A 4-digit PIN for the grown-ups' page</span><input name="pin" inputmode="numeric" pattern="[0-9]{4}" maxlength="4" required placeholder="••••"></label>
      <label class="tog"><input type="checkbox" name="starter" checked><span>Start with a sensible week to rearrange</span></label>
      <footer class="sh-f"><button type="button" class="btn ghost" data-act="setupBack">Back</button><button class="btn">Let's go 🐝</button></footer>
    </form></div></div>`;
  return `<div class="onb"><div class="onb-hero">
    <img src="./art/splash.webp" alt="" class="onb-art">
    <div class="onb-txt">
      <p class="eyebrow">Bizzing Schedule</p>
      <h1>Structure for them.<br>Peace of mind for you.</h1>
      <p class="lead">A day planner, task board and goal tracker for busy, ambitious kids — school, practice, Bizzing, friends, TV and rest, in one place that feels like play.</p>
      <ul class="onb-pts"><li>🗓️ <b>Plan the week together</b> — grown-ups set the fixed times, kids arrange the rest</li>
        <li>✅ <b>One tap to check in</b> — Bizzing apps count their own minutes</li>
        <li>🏆 <b>Goals that measure themselves</b> — and a Hive that fills with honey</li>
        <li>🔒 <b>Private by design</b> — first name only, nothing leaves the device</li></ul>
      <div class="row wrap"><button class="btn big" data-act="setupStart">Set up our family</button><button class="btn big ghost" data-act="demo">Explore a sample family</button></div>
    </div></div></div>`;
}
