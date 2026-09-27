/* Today — the one screen a child should need most days. Now, next, one tap. */

import { longDate, clock, dur, partOfDay } from '../time.js';
import { cat, CATS, APPS } from '../cats.js';
import { blocksFor, status, dayScore, tasksFor, goalProgress, cheer, catMinutes } from '../model.js';
import { appMinutes } from '../activity.js';
import { esc, ring, icon, lozenge, plural, hexPath } from '../ui.js';

const GREET = { morning: 'Good morning', day: 'Good afternoon', evening: 'Good evening', night: 'Sleep well' };
const QUICK = [['screen', 15, '📺 +15m TV'], ['play', 30, '🧩 +30m play'], ['move', 30, '⚽ +30m outside'], ['study', 20, '📚 +20m reading'], ['family', 20, '🏡 +20m helping']];

export function today(c) {
  const { h, kid, today: t, now, S } = c;
  const bl = blocksFor(kid, t).map((b) => ({ ...b, st: status(h, kid, b, t, t, now) }));
  const sc = dayScore(h, kid, t, t, now);
  const pod = partOfDay(now);
  const cur = bl.find((b) => b.start <= now && now < b.start + b.dur && b.r.cat !== 'school') || bl.find((b) => b.start <= now && now < b.start + b.dur);
  const next = bl.find((b) => b.start > now);
  const open = bl.filter((b) => b.st.s === 'open');
  const tasks = tasksFor(kid, 'today', t);
  const unseen = kid.kudos.filter((k) => !k.seen);
  const cells = bl.filter((b) => b.st.s in { done: 1, part: 1 }).length;

  return `
  <section class="hero sky-${pod}" style="background-image:url(./art/sky-${pod}.webp)">
    <div class="hero-in">
      <div class="hero-txt">
        <p class="eyebrow">${longDate(t)}</p>
        <h1>${GREET[pod]}, ${esc(kid.name)}</h1>
        <p class="bizzy"><img src="./avatars/bizzy.png" alt="" class="bz-av"><span>${esc(cheer(h, kid, t, now))}</span></p>
      </div>
      <div class="hero-stats">
        <div class="hs">${ring(sc.pct ?? 0, 74, 9, 'var(--honey)', sc.planned ? `${Math.round((sc.pct || 0) * 100)}%` : '—')}<span>kept so far</span></div>
        <div class="hs hs-comb">${miniComb(bl)}<span>${plural(cells, 'cell')} of honey</span></div>
      </div>
    </div>
  </section>

  ${unseen.length ? `<button class="kudos-banner" data-act="openKudos">
      <span class="kb-stk">${esc(unseen[0].sticker)}</span>
      <span><b>${esc(unseen[0].from)} sent you kudos!</b> Tap to open${unseen.length > 1 ? ` · ${unseen.length} new` : ''}</span>
      <span class="kb-go">Open 🎁</span></button>` : ''}

  <div class="today-grid">
    <div class="col-main">
      ${nowCard(c, cur, next)}
      ${open.length && now >= 17 * 60 ? `<button class="wrap-card" data-act="wrapUp">
          <span class="wc-ic">🌙</span><span><b>Wrap up your day</b><br><small>${plural(open.length, 'plan')} to check in · about ${Math.max(1, Math.ceil(open.length * 0.1))} min</small></span>
          <span class="wc-go">Start ${icon('right')}</span></button>` : ''}
      <div class="card">
        <div class="card-h"><h2>Today's plan</h2>
          <div class="ch-actions"><button class="btn ghost sm" data-act="newRoutine" data-date="${t}">${icon('plus')} Add</button></div></div>
        ${bl.length ? `<ol class="timeline">${bl.map((b) => block(c, b)).join('')}</ol>`
                    : `<div class="empty"><img src="./art/empty-week.webp" alt=""><p>Nothing planned today. Enjoy it — or add something.</p></div>`}
      </div>
    </div>

    <div class="col-side">
      <div class="card">
        <div class="card-h"><h2>To-dos</h2><button class="btn ghost sm" data-act="go" data-v="board">Board ${icon('right')}</button></div>
        <form class="inline-add" data-form="quickTask"><input name="t" placeholder="Add a to-do for today…" autocomplete="off" aria-label="Add a to-do"><button class="btn sm" aria-label="Add">${icon('plus')}</button></form>
        ${tasks.length ? `<ul class="todo">${tasks.map((x) => `
          <li class="${x.status === 'done' ? 'is-done' : ''}">
            <button class="tick ${x.status === 'done' ? 'on' : ''}" data-act="toggleTask" data-id="${x.id}" aria-label="${x.status === 'done' ? 'Mark not done' : 'Mark done'}">${icon('check')}</button>
            <button class="todo-t" data-act="editTask" data-id="${x.id}">${esc(x.title)}${x.pri === 'high' ? ' <span class="pri">!</span>' : ''}</button>
            <span class="dot" style="background:${cat(x.cat).color}" title="${cat(x.cat).name}"></span>
          </li>`).join('')}</ul>` : `<p class="muted small pad">No to-dos due today. ✨</p>`}
      </div>

      <div class="card">
        <div class="card-h"><h2>Also did</h2><span class="muted small">one tap, no essays</span></div>
        <div class="chips">${QUICK.map(([ct, m, l]) => `<button class="chip" data-act="quickLog" data-cat="${ct}" data-m="${m}">${l}</button>`).join('')}</div>
        ${(kid.extras[t] || []).length ? `<ul class="extras">${kid.extras[t].map((x) => `<li><span class="dot" style="background:${cat(x.cat).color}"></span>${esc(x.title)} · ${dur(x.mins)}
            <button class="x" data-act="rmExtra" data-id="${x.id}" aria-label="Remove">${icon('close')}</button></li>`).join('')}</ul>` : ''}
        ${bizzingToday(c)}
      </div>

      ${kid.goals.filter((g) => !g.done).length ? `<div class="card">
        <div class="card-h"><h2>Goals</h2><button class="btn ghost sm" data-act="go" data-v="goals">All ${icon('right')}</button></div>
        <div class="mini-goals">${kid.goals.filter((g) => !g.done).slice(0, 4).map((g) => {
          const p = goalProgress(h, kid, g, t, now);
          return `<button class="mg" data-act="go" data-v="goals">${ring(p, 46, 6, cat(g.cat).color, g.emoji)}<span>${esc(g.title)}<small>${Math.round(p * 100)}%</small></span></button>`;
        }).join('')}</div></div>` : ''}

      <button class="focus-cta" data-act="focus">${icon('bolt')}<span><b>Focus sprint</b><small>A timer, a bee, no distractions</small></span></button>
    </div>
  </div>`;
}

function nowCard(c, cur, next) {
  const { now } = c;
  if (!cur && !next) return `<div class="now-card calm"><div><p class="eyebrow">That's the day</p><h2>Nothing else planned. 🌙</h2></div></div>`;
  if (!cur) return `<div class="now-card" style="--c:${cat(next.r.cat).color};--s:${cat(next.r.cat).soft}">
      <div class="nc-l"><p class="eyebrow">Up next · in ${dur(next.start - now)}</p>
      <h2>${cat(next.r.cat).emoji} ${esc(next.r.title)}</h2><p class="muted">${clock(next.start)} – ${clock(next.start + next.dur)}</p></div>
      <div class="nc-r"><button class="btn ghost" data-act="later" data-id="${next.r.id}">+15m later</button></div></div>`;
  const left = cur.start + cur.dur - now, done = cur.st.s === 'done';
  const prog = (now - cur.start) / cur.dur;
  return `<div class="now-card live" style="--c:${cat(cur.r.cat).color};--s:${cat(cur.r.cat).soft}">
    <div class="nc-l"><p class="eyebrow"><span class="pulse"></span> Now · ${dur(left)} left</p>
      <h2>${cat(cur.r.cat).emoji} ${esc(cur.r.title)}</h2>
      <div class="bar"><i style="width:${Math.round(prog * 100)}%"></i></div>
      ${next ? `<p class="muted small">Then: ${esc(next.r.title)} at ${clock(next.start)}</p>` : ''}</div>
    <div class="nc-r">${cur.r.cat === 'school' || cur.r.app ? (cur.r.app ? `<span class="auto-tag">Counts itself from ${APPS[cur.r.app].name}</span>` : '') :
      done ? `<span class="done-tag">${icon('check')} Done</span>` :
      `<button class="btn big" data-act="mark" data-id="${cur.r.id}" data-s="done">${icon('check')} Done</button>`}</div></div>`;
}

function block(c, b) {
  const { r, st } = b;
  const x = cat(r.cat);
  const S = { done: 'Done', part: 'Partly', skip: 'Skipped', open: 'Check in', now: 'Now', later: '' };
  const how = st.how === 'app' ? `<span class="how">auto · ${APPS[r.app].name}</span>` : st.how === 'auto' ? `<span class="how">happens anyway</span>` : '';
  const appBar = r.app ? (() => { const m = appMinutes(c.h, c.kid, c.today)[r.app] || 0; return `<div class="app-bar"><div class="bar thin"><i style="width:${Math.min(100, Math.round(m / r.dur * 100))}%"></i></div><small>${m} of ${r.dur} min in ${APPS[r.app].name}</small></div>`; })() : '';
  const canTick = !r.auto && !r.app;
  return `<li class="blk st-${st.s}" style="--c:${x.color};--s:${x.soft}">
    <div class="blk-time">${clock(b.start)}<small>${dur(b.dur)}</small></div>
    <div class="blk-body">
      <div class="blk-top">
        <button class="blk-t" data-act="editRoutine" data-id="${r.id}">${x.emoji} ${esc(r.title)} ${r.anchor ? `<span class="anchor" title="Set by a grown-up">${icon('lock')}</span>` : ''}</button>
        ${S[st.s] ? `<span class="st st-${st.s}">${S[st.s]}</span>` : ''}${how}
      </div>
      ${appBar}
    </div>
    <div class="blk-act">
      ${canTick ? `<button class="tick lg ${st.s === 'done' ? 'on' : ''}" data-act="mark" data-id="${r.id}" data-s="${st.s === 'done' ? '' : 'done'}" aria-label="${st.s === 'done' ? 'Undo' : 'Mark done'}">${icon('check')}</button>
      <button class="icon-btn" data-act="blockMenu" data-id="${r.id}" aria-label="More">${icon('more')}</button>` : ''}
    </div>
  </li>`;
}

function miniComb(bl) {
  const n = Math.min(bl.length, 12), r = 9, w = 16;
  if (!n) return `<svg width="74" height="74"></svg>`;
  const cols = 4;
  const cells = bl.slice(0, n).map((b, i) => {
    const row = Math.floor(i / cols), col = i % cols;
    const cx = 10 + col * w + (row % 2 ? w / 2 : 0), cy = 10 + row * 14;
    const f = b.st.s === 'done' ? 'var(--honey)' : b.st.s === 'part' ? 'var(--honey-l)' : 'rgba(255,255,255,.25)';
    return `<path d="${hexPath(cx, cy, r)}" fill="${f}" stroke="rgba(255,255,255,.7)" stroke-width="1.2"/>`;
  }).join('');
  return `<svg width="74" height="74" viewBox="0 0 74 54" aria-hidden="true">${cells}</svg>`;
}

function bizzingToday(c) {
  const m = appMinutes(c.h, c.kid, c.today);
  const ids = Object.keys(m);
  if (!ids.length) return `<p class="muted small biz-none">🐝 Bizzing apps log their own minutes here — nothing yet today.</p>`;
  return `<div class="biz-today">${ids.map((id) => `<span class="biz-pill">${APPS[id].emoji} ${APPS[id].name} · ${dur(m[id])}</span>`).join('')}<small class="muted">counted automatically</small></div>`;
}
