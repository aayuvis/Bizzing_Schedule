/* Grown-ups — peace of mind without a control panel. The page answers "is my
   child OK and on track?" in one screen, and its only buttons are the ones a
   grown-up SHOULD press: set the non-negotiables, cheer, and look after data.

   The PIN is a deterrent, not security. It says so on screen (the family rule). */

import { weekDays, DAY_SHORT, dur, clock, dow } from '../time.js';
import { CATS, APPS, cat } from '../cats.js';
import { weekStats, breathingRoom, goalProgress, blocksFor, BANDS } from '../model.js';
import { seenApps, unassigned } from '../activity.js';
import { esc, ring, pct, icon, avatar, plural, STICKERS } from '../ui.js';

export function gate(c) {
  const set = !!c.h.parent.pin;
  return `<div class="gate card">
    <img src="./art/huddle.webp" alt="" class="gate-art">
    <h1>For grown-ups</h1>
    <p class="muted">${set ? 'Enter the family PIN.' : 'Choose a 4-digit PIN for this page.'}</p>
    <form data-form="${set ? 'unlock' : 'setPin'}" class="pin-form">
      <input name="pin" inputmode="numeric" pattern="[0-9]{4}" maxlength="4" autocomplete="off" placeholder="••••" aria-label="PIN" required>
      <button class="btn">${set ? 'Open' : 'Set PIN'}</button>
    </form>
    ${c.h.demo ? '<p class="muted small">Sample family PIN: <b>1234</b></p>' : ''}
    <p class="muted small">The PIN keeps curious fingers out; it is not a lock. Everything stays on this device.</p>
  </div>`;
}

function insights(c, kid) {
  const { h, today: t, now } = c;
  const w = weekStats(h, kid, t, t, now);
  const out = [];
  const tight = weekDays(t).filter((d) => blocksFor(kid, d).length && breathingRoom(kid, d) < 30);
  if (tight.length) out.push(['🌿', `${tight.map((d) => DAY_SHORT[dow(d)]).join(', ')} ${tight.length > 1 ? 'have' : 'has'} under 30 min of free time after school. High performers need slack too.`, 'warn']);
  if (w.pct != null) out.push([w.pct >= 0.8 ? '🍯' : '🐝', `${kid.name} has kept ${pct(w.pct)} of plans this week${w.good ? ` with ${plural(w.good, 'strong day')}` : ''}.`, w.pct >= 0.8 ? 'good' : '']);
  const sK = w.mins.kept.screen, sP = w.mins.planned.screen;
  if (sP && sK > sP * 1.2) out.push(['📺', `Screen time is ${dur(sK - sP)} over plan this week (${dur(sK)} of ${dur(sP)}). Worth a light chat, not a lecture.`, 'warn']);
  else if (sP) out.push(['📺', `Screen time is within plan: ${dur(sK)} of ${dur(sP)}.`, 'good']);
  for (const g of kid.goals.filter((x) => !x.done)) {
    const p = goalProgress(h, kid, g, t, now);
    if (p >= 0.75) out.push([g.emoji, `“${g.title}” is ${pct(p)} there. A kudos would land well.`, 'good']);
  }
  if (w.open >= 5) out.push(['✍️', `${plural(w.open, 'plan')} not checked in this week — not missed, just unmarked. The evening wrap-up takes a minute.`, '']);
  return out.slice(0, 5);
}

export function grown(c) {
  const { h, today: t, now, S } = c;
  const tab = S.grownTab || 'overview';
  return `
  <div class="view-h"><div><h1>Grown-ups</h1><p class="muted">Peace of mind, without running their day for them.</p></div>
    <div class="vh-r"><button class="btn ghost" data-act="lockGrown">${icon('lock')} Lock</button></div></div>
  <div class="seg tabs">${[['overview', 'Overview'], ['anchors', 'Fixed times'], ['kudos', 'Send kudos'], ['family', 'Family & apps'], ['settings', 'Settings']].map(([v, l]) =>
    `<button class="${tab === v ? 'on' : ''}" data-act="grownTab" data-v="${v}">${l}</button>`).join('')}</div>
  ${{ overview, anchors, kudos, family, settings }[tab](c)}`;
}

function overview(c) {
  const { h, today: t, now } = c;
  return `<div class="gw-kids">${h.kids.map((kid) => {
    const w = weekStats(h, kid, t, t, now);
    const moods = weekDays(t).map((d) => kid.mood[d] || '');
    return `<article class="card gw-kid">
      <header>${avatar(kid.avatar, 'lg')}<div><h2>${esc(kid.name)}</h2><small class="muted">${BANDS[kid.band]}</small></div>
        <div class="gw-ring">${ring(w.pct ?? 0, 64, 8, 'var(--honey)', pct(w.pct))}<small>this week</small></div></header>
      <ul class="insights">${insights(c, kid).map(([e, s, k]) => `<li class="${k}"><span>${e}</span>${esc(s)}</li>`).join('') || '<li><span>✨</span>A fresh week — nothing to report yet.</li>'}</ul>
      <div class="gw-week">${weekDays(t).map((d, i) => {
        const x = w.per[i], room = breathingRoom(kid, d);
        return `<div class="gw-d ${d === t ? 'today' : ''}"><b>${DAY_SHORT[i]}</b>
          <i class="gw-bar" style="--p:${x.pct == null ? 0 : Math.round(x.pct * 100)}%" title="${x.pct == null ? 'not yet' : pct(x.pct) + ' kept'}"></i>
          <small class="${room < 30 ? 'tight' : ''}">🌿${dur(room)}</small><span class="mood">${moods[i]}</span></div>`;
      }).join('')}</div>
      <div class="gw-goals">${kid.goals.filter((g) => !g.done).map((g) => { const p = goalProgress(h, kid, g, t, now);
        return `<div class="gw-g"><span>${g.emoji}</span><span class="gw-gt">${esc(g.title)}</span><span class="bar thin"><i style="width:${Math.round(p * 100)}%"></i></span><b>${pct(p)}</b></div>`; }).join('')}</div>
      <footer><button class="btn sm" data-act="grownTab" data-v="kudos" data-kid="${kid.id}">💛 Send kudos</button>
        <button class="btn ghost sm" data-act="viewAs" data-id="${kid.id}">Open ${esc(kid.name)}'s day ${icon('right')}</button></footer>
    </article>`;
  }).join('')}</div>
  <div class="card tip"><b>How this is meant to work.</b> You set the few things that are fixed — school, lessons, bedtime.
    ${esc(h.kids.map((k) => k.name).join(' and ') || 'Your child')} arrange${h.kids.length === 1 ? 's' : ''} the rest and check in with one tap. You see the shape of the week,
    not every minute, and you cheer what you see. A Sunday huddle of ten minutes replaces a week of reminders.</div>`;
}

function anchors(c) {
  const { h } = c;
  return h.kids.map((kid) => `<div class="card">
    <div class="card-h"><h2>${avatar(kid.avatar, 'sm')} ${esc(kid.name)}'s fixed times</h2>
      <button class="btn sm" data-act="newRoutine" data-kid="${kid.id}" data-anchor="1">${icon('plus')} Add fixed time</button></div>
    <p class="muted small">Fixed times show a 🔒 to ${esc(kid.name)}: they can check them in but not move or delete them. Everything else is theirs to arrange.</p>
    <ul class="anchor-list">${kid.routines.filter((r) => r.anchor && !r.until).map((r) => `<li style="--c:${cat(r.cat).color}">
      <span class="dot" style="background:${cat(r.cat).color}"></span><b>${cat(r.cat).emoji} ${esc(r.title)}</b>
      <span class="muted">${r.date ? r.date : r.days.length === 7 ? 'Every day' : r.days.map((d) => DAY_SHORT[d]).join(' ')} · ${clock(r.start)}–${clock(r.start + r.dur)}</span>
      ${r.auto ? '<span class="loz sm">counts itself</span>' : ''}
      <button class="icon-btn" data-act="editRoutine" data-id="${r.id}" data-kid="${kid.id}" aria-label="Edit">${icon('edit')}</button></li>`).join('') || '<li class="muted">None yet.</li>'}</ul>
  </div>`).join('');
}

function kudos(c) {
  const { h, S } = c;
  const to = S.kudosKid || h.kids[0]?.id;
  return `<div class="card kudos-form">
    <h2>Send kudos 💛</h2>
    <p class="muted">Name the effort, not the result: “you practised without being asked” beats “you’re so smart”.</p>
    <form data-form="kudos">
      <div class="who">${h.kids.map((k) => `<label class="who-k"><input type="radio" name="kid" value="${k.id}" ${k.id === to ? 'checked' : ''}>${avatar(k.avatar, 'sm')} ${esc(k.name)}</label>`).join('')}</div>
      <div class="stickers">${STICKERS.map((s, i) => `<label><input type="radio" name="sticker" value="${s}" ${i === 0 ? 'checked' : ''}><span>${s}</span></label>`).join('')}</div>
      <textarea name="text" rows="3" maxlength="200" placeholder="I noticed you…" required></textarea>
      <div class="row"><input name="from" value="${esc(h.parent.name || '')}" placeholder="From (Mum, Dad, Nani…)" maxlength="24" required><button class="btn">Send 🎁</button></div>
    </form>
    <div class="chips">${['You kept going when it got hard.', 'You planned your own week — that’s grown-up stuff.', 'I saw you practise without being asked.', 'Your focus today was amazing.'].map((s) => `<button class="chip" data-act="kudosIdea" data-v="${esc(s)}">${esc(s)}</button>`).join('')}</div>
  </div>`;
}

function family(c) {
  const { h } = c;
  const apps = seenApps(h), un = unassigned(h);
  return `<div class="card">
    <div class="card-h"><h2>Children</h2><button class="btn sm" data-act="addKid">${icon('plus')} Add a child</button></div>
    <ul class="fam">${h.kids.map((k) => `<li>${avatar(k.avatar, 'sm')}<b>${esc(k.name)}</b><span class="muted">${BANDS[k.band]}</span>
      <button class="btn ghost sm" data-act="editKid" data-id="${k.id}">Edit</button></li>`).join('')}</ul>
    <p class="muted small">First name and age band only — never a birthday, surname, photo or school.</p>
  </div>
  <div class="card">
    <div class="card-h"><h2>Bizzing apps</h2><span class="muted small">time counted automatically</span></div>
    <ul class="apps">${apps.map((a) => `<li class="${a.seen ? 'on' : ''}"><span class="app-em">${a.emoji}</span><b>${a.name}</b><span class="muted">${a.what}</span>
      <span class="loz sm ${a.seen ? 'ok' : ''}">${a.seen ? '● reporting' : 'not seen on this device yet'}</span></li>`).join('')}</ul>
    <p class="muted small">Bizzing apps on this device report their own minutes here, matched by your child’s first name. Nothing is sent anywhere.
    ${un ? `<b>${plural(un, 'session')} had no name</b> — make sure each child uses the same first name in every Bizzing app.` : ''}</p>
  </div>`;
}

function settings(c) {
  const { h, S } = c;
  const n = S.device.nudges;
  return `<div class="card">
    <h2>Nudges on this device</h2>
    <p class="muted">A gentle heads-up five minutes before a plan, and one evening reminder to wrap up. Never more than that, never at night.</p>
    <div class="row"><button class="btn ${n ? 'ghost' : ''}" data-act="nudges">${n ? 'Turn nudges off' : 'Turn on nudges'}</button>
      <span class="muted small">${typeof Notification === 'undefined' ? 'This browser can’t show notifications — nudges appear inside the app.' : Notification.permission === 'granted' ? 'Notifications allowed.' : Notification.permission === 'denied' ? 'Notifications are blocked in this browser’s settings; nudges appear inside the app.' : 'You’ll be asked once.'}</span></div>
    <p class="muted small">On iPhone, add this page to the Home Screen (Share → Add to Home Screen) to get nudges while it is open. The native iPhone app will deliver them even when it is closed.</p>
  </div>
  <div class="card">
    <h2>Your data</h2>
    <p class="muted">Everything lives on this device. No account, no analytics, no ads — and a child’s name never leaves the screen.</p>
    <div class="row wrap">
      <button class="btn ghost" data-act="exportData">⬇ Download a backup</button>
      <label class="btn ghost file">⬆ Restore a backup<input type="file" accept="application/json" data-act="importData" hidden></label>
      <button class="btn ghost" data-act="changePin">Change PIN</button>
      ${h.demo ? `<button class="btn" data-act="leaveDemo">Leave the sample family & set up ours</button>` : `<button class="btn danger" data-act="wipe">Erase everything</button>`}
    </div>
  </div>`;
}
