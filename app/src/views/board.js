/* Board — to-dos as cards in three columns. Drag with a finger or a mouse, or
   focus a card and use ← → (the family rule: keyboard AND touch, always). */

import { niceDate, dur } from '../time.js';
import { cat, CATS, CAT_IDS } from '../cats.js';
import { tasksFor } from '../model.js';
import { esc, icon, plural } from '../ui.js';

export const COLS = [['todo', 'To do', '📝'], ['doing', 'Doing', '⚡'], ['done', 'Done', '🍯']];

export function board(c) {
  const { kid, today: t, S } = c;
  const scope = S.boardScope;
  let list = scope === 'all' ? kid.tasks.filter((x) => x.status !== 'done' || x.doneAt >= t.slice(0, 8) + '01') : tasksFor(kid, scope, t);
  if (S.boardFilter) list = list.filter((x) => x.cat === S.boardFilter);
  const goals = Object.fromEntries(kid.goals.map((g) => [g.id, g]));
  const usedCats = [...new Set(kid.tasks.map((x) => x.cat))];

  return `
  <div class="view-h">
    <div><h1>Task board</h1><p class="muted">${plural(list.filter((x) => x.status !== 'done').length, 'thing')} to do · drag cards, or focus one and press ← →</p></div>
    <div class="vh-r">
      <div class="seg" role="tablist">${[['today', 'Today'], ['week', 'This week'], ['all', 'Everything']].map(([v, l]) =>
        `<button role="tab" aria-selected="${scope === v}" class="${scope === v ? 'on' : ''}" data-act="boardScope" data-v="${v}">${l}</button>`).join('')}</div>
      <button class="btn" data-act="newTask">${icon('plus')} New task</button>
    </div>
  </div>
  <div class="chips filt">
    <button class="chip ${!S.boardFilter ? 'on' : ''}" data-act="boardFilter" data-v="">All kinds</button>
    ${CAT_IDS.filter((id) => usedCats.includes(id)).map((id) => `<button class="chip ${S.boardFilter === id ? 'on' : ''}" data-act="boardFilter" data-v="${id}" style="--c:${CATS[id].color}">${CATS[id].emoji} ${CATS[id].name}</button>`).join('')}
  </div>
  <div class="kanban">
    ${COLS.map(([st, label, em]) => {
      const cards = list.filter((x) => x.status === st);
      return `<section class="kcol" data-col="${st}" aria-label="${label}">
        <header><span>${em} ${label}</span><span class="count">${cards.length}</span></header>
        <div class="kcards">
          ${cards.map((x) => card(x, goals, t)).join('') ||
            `<div class="kempty">${st === 'done' ? 'Finished things land here. 🍯' : st === 'doing' ? 'Drag what you’re working on here.' : `<img src="./art/empty-board.webp" alt=""><span>All clear!</span>`}</div>`}
        </div>
        ${st === 'todo' ? `<form class="kadd" data-form="quickTask"><input name="t" placeholder="+ Add a card" autocomplete="off" aria-label="Add a card"></form>` : ''}
      </section>`;
    }).join('')}
  </div>`;
}

function card(x, goals, t) {
  const k = cat(x.cat), g = x.goalId && goals[x.goalId];
  const subDone = x.sub.filter((s) => s.done).length;
  const late = x.due && x.due < t && x.status !== 'done';
  return `<article class="kcard ${x.status === 'done' ? 'is-done' : ''}" tabindex="0" data-card="${x.id}" style="--c:${k.color};--s:${k.soft}" aria-label="${esc(x.title)}">
    <div class="kc-top"><span class="loz" style="--c:${k.color};--s:${k.soft}">${k.emoji} ${k.name}</span>${x.pri === 'high' ? '<span class="pri" title="Important">!</span>' : ''}</div>
    <h3>${esc(x.title)}</h3>
    ${x.sub.length ? `<div class="kc-sub"><div class="bar thin"><i style="width:${Math.round(subDone / x.sub.length * 100)}%"></i></div><small>${subDone}/${x.sub.length}</small></div>` : ''}
    <div class="kc-meta">
      ${x.due ? `<span class="meta ${late ? 'late' : ''}">${icon('clock')} ${niceDate(x.due, t)}</span>` : ''}
      ${x.est ? `<span class="meta">⏱ ${dur(x.est)}</span>` : ''}
      ${g ? `<span class="meta for-goal" title="${esc(g.title)}">${g.emoji} goal</span>` : ''}
      ${x.by === 'grown' ? `<span class="meta">from a grown-up</span>` : ''}
    </div>
    <div class="kc-move" aria-hidden="true">
      <button tabindex="-1" data-act="taskMove" data-id="${x.id}" data-dir="-1" aria-label="Move left">${icon('left')}</button>
      <button tabindex="-1" data-act="taskMove" data-id="${x.id}" data-dir="1" aria-label="Move right">${icon('right')}</button>
    </div>
  </article>`;
}
