/* Goals — outcomes with a WHY, measured by evidence, climbed in steps. */

import { niceDate, dur } from '../time.js';
import { cat, APPS, CATS } from '../cats.js';
import { goalProgress, krValue, krHistory, daysLeft } from '../model.js';
import { esc, ring, spark, icon, plural } from '../ui.js';

export function goals(c) {
  const { kid } = c;
  const live = kid.goals.filter((g) => !g.done), done = kid.goals.filter((g) => g.done);
  return `
  <div class="view-h">
    <div><h1>Goals</h1><p class="muted">Big things, broken into small ones. Progress counts itself wherever it can.</p></div>
    <div class="vh-r"><button class="btn" data-act="newGoal">${icon('plus')} New goal</button></div>
  </div>
  ${live.length ? `<div class="goal-grid">${live.map((g) => goalCard(c, g)).join('')}</div>`
    : `<div class="card empty big"><img src="./art/empty-goals.webp" alt=""><h2>What would you love to get better at?</h2><p class="muted">A contest, an instrument, a sport, a stack of books. Pick one and we'll break it into steps.</p><button class="btn" data-act="newGoal">${icon('plus')} Set a goal</button></div>`}
  ${done.length ? `<h2 class="sec-h">🏔️ Summits reached</h2><div class="done-goals">${done.map((g) => `<div class="dg"><span>${g.emoji}</span><b>${esc(g.title)}</b><small>${niceDate(g.done, c.today)}</small></div>`).join('')}</div>` : ''}`;
}

function krUnit(kr) { return kr.unit || (/^(app|cat|focus)/.test(kr.source) ? 'min' : ''); }

function goalCard(c, g) {
  const { h, kid, today: t, now } = c;
  const p = goalProgress(h, kid, g, t, now), left = daysLeft(g, t), x = cat(g.cat);
  const linked = kid.tasks.filter((k) => k.goalId === g.id && k.status !== 'done').length;
  return `<article class="goal" style="--c:${x.color};--s:${x.soft}">
    <header>
      <div class="g-ring">${ring(p, 84, 10, x.color, `${Math.round(p * 100)}%`)}</div>
      <div class="g-h">
        <span class="g-em">${g.emoji}</span>
        <h2>${esc(g.title)}</h2>
        ${g.why ? `<p class="why">“${esc(g.why)}”</p>` : ''}
        <div class="g-meta">${left != null ? `<span class="meta ${left < 14 ? 'soon' : ''}">${icon('flag')} ${left > 0 ? `${left} days to go` : left === 0 ? 'Today!' : 'Date passed'}</span>` : ''}
          ${linked ? `<span class="meta">📝 ${plural(linked, 'task')}</span>` : ''}</div>
      </div>
      <button class="icon-btn" data-act="editGoal" data-id="${g.id}" aria-label="Edit goal">${icon('edit')}</button>
    </header>
    ${g.krs.length ? `<ul class="krs">${g.krs.map((kr) => {
      const v = krValue(h, kid, g, kr, t, null, now), f = Math.min(1, v / Math.max(1, kr.target)), u = krUnit(kr);
      const src = kr.source.split(':');
      const auto = src[0] === 'app' ? `auto · ${APPS[src[1]]?.name || 'Bizzing'}` : src[0] === 'cat' ? `from kept ${CATS[src[1]]?.name.toLowerCase()} time` : src[0] === 'routine' ? 'from your plan' : src[0] === 'tasks' ? 'from finished tasks' : src[0] === 'focus' ? 'from focus sprints' : 'you count it';
      return `<li>
        <div class="kr-top"><b>${esc(kr.title)}</b><span class="kr-v ${f >= 1 ? 'hit' : ''}">${u === 'min' ? dur(v) : v}<small> / ${u === 'min' ? dur(kr.target) : `${kr.target} ${u}`}${kr.per === 'week' ? ' this week' : ''}</small></span></div>
        <div class="bar"><i style="width:${Math.round(f * 100)}%"></i></div>
        <div class="kr-foot"><small class="muted">${auto}</small>
          ${kr.per === 'week' ? spark(krHistory(h, kid, g, kr, 6, t), 88, 24, x.color, kr.target) : ''}
          ${src[0] === 'manual' ? `<span class="kr-btns"><button class="btn ghost xs" data-act="krBump" data-g="${g.id}" data-k="${kr.id}" data-d="-1" aria-label="One less">−</button><button class="btn xs" data-act="krBump" data-g="${g.id}" data-k="${kr.id}" data-d="1">+1</button></span>` : ''}
        </div></li>`;
    }).join('')}</ul>` : ''}
    ${g.steps.length ? `<ol class="steps">${g.steps.map((s, i) => `<li class="${s.done ? 'on' : ''}">
        <button class="step" data-act="stepToggle" data-g="${g.id}" data-s="${s.id}" aria-pressed="${s.done}"><span class="sn">${s.done ? '✓' : i + 1}</span>${esc(s.t)}</button></li>`).join('')}</ol>` : ''}
    <footer>
      <button class="btn ghost sm" data-act="focus" data-goal="${g.id}">${icon('bolt')} Focus on this</button>
      <button class="btn ghost sm" data-act="newTask" data-goal="${g.id}">${icon('plus')} Task</button>
      ${p >= 1 ? `<button class="btn sm gold" data-act="goalDone" data-id="${g.id}">🏔️ I did it!</button>` : ''}
    </footer>
  </article>`;
}

/* Templates: a child picks the shape of goal, then makes it theirs. */
export const GOAL_TEMPLATES = [
  { key: 'bee', emoji: '🏆', title: 'Win a spelling bee round', cat: 'study', why: '',
    krs: [{ title: 'Bizzing Bee practice', source: 'app:bee', per: 'week', target: 100, unit: 'min' }, { title: 'Word lists finished', source: 'tasks', per: 'total', target: 8, unit: 'lists' }],
    steps: ['Learn the roots list', 'Mock bee at home', 'School round'] },
  { key: 'maths', emoji: '🦘', title: 'Do my best in a maths contest', cat: 'study', why: '',
    krs: [{ title: 'Bizzing Maths practice', source: 'app:maths', per: 'week', target: 60, unit: 'min' }, { title: 'Past papers done', source: 'manual', per: 'total', target: 5, unit: 'papers' }],
    steps: ['Find the past papers', 'One timed paper', 'Review my mistakes'] },
  { key: 'music', emoji: '🎹', title: 'Play a piece at the recital', cat: 'create', why: '',
    krs: [{ title: 'Practice minutes', source: 'cat:create', per: 'week', target: 90, unit: 'min' }],
    steps: ['First page', 'Second page', 'Play it for the family'] },
  { key: 'read', emoji: '📚', title: 'Read 10 books', cat: 'study', why: '',
    krs: [{ title: 'Books finished', source: 'manual', per: 'total', target: 10, unit: 'books' }], steps: [] },
  { key: 'sport', emoji: '⚽', title: 'Get stronger at my sport', cat: 'move', why: '',
    krs: [{ title: 'Sport & movement', source: 'cat:move', per: 'week', target: 180, unit: 'min' }], steps: ['Learn a new skill', 'Show the coach'] },
  { key: 'india', emoji: '🪔', title: 'Know 20 stories from India', cat: 'bizzing', why: '',
    krs: [{ title: 'Bizzing India time', source: 'app:india', per: 'week', target: 60, unit: 'min' }], steps: [] },
  { key: 'custom', emoji: '🎯', title: '', cat: 'study', why: '', krs: [], steps: [] },
];
