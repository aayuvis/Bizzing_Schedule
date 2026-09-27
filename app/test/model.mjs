/* model.mjs — the numbers the app shows are the numbers the log supports. */
import * as M from '../src/model.js';
import { demoHousehold } from '../src/demo.js';
import { badgeStates, award, BADGES } from '../src/badges.js';
import { addDays, weekDays } from '../src/time.js';

let fail = 0, n = 0;
const ok = (name, cond, extra = '') => { n++; if (!cond) { fail++; console.log(`✗ ${name} ${extra}`); } };
const T = '2026-09-23'; // Wednesday

/* 1. a future block is never a miss; an ended unmarked block is "open" */
{
  const h = M.newHousehold(), k = M.newKid({ name: 'Mira' }); h.kids.push(k);
  const r = M.addRoutine(k, { title: 'Piano', cat: 'create', days: [2], start: 17 * 60, dur: 30 }, '2026-09-01');
  const b = M.blocksFor(k, T)[0];
  ok('future block is later', M.status(h, k, b, T, T, 16 * 60).s === 'later');
  ok('running block is now', M.status(h, k, b, T, T, 17 * 60 + 5).s === 'now');
  ok('ended unmarked is open', M.status(h, k, b, T, T, 18 * 60).s === 'open');
  ok('no score before it ends', M.dayScore(h, k, T, T, 16 * 60).planned === 0);
  ok('open counts as planned, not kept', M.dayScore(h, k, T, T, 18 * 60).planned === 1 && M.dayScore(h, k, T, T, 18 * 60).kept === 0);
  M.mark(k, r.id, T, 'part');
  ok('part is half', M.dayScore(h, k, T, T, 18 * 60).kept === 0.5);
  M.mark(k, r.id, T, 'done');
  ok('done is whole', M.dayScore(h, k, T, T, 18 * 60).pct === 1);
  M.mark(k, r.id, T, null);
  ok('clearing a mark removes the entry', !k.log[T]);
}

/* 2. a routine added today is not a miss yesterday; retiring keeps history */
{
  const h = M.newHousehold(), k = M.newKid({ name: 'Mira' }); h.kids.push(k);
  M.addRoutine(k, { title: 'Reading', cat: 'study', days: [0, 1, 2, 3, 4, 5, 6], start: 20 * 60, dur: 20 }, T);
  ok('not on the plan before it existed', M.blocksFor(k, addDays(T, -1)).length === 0);
  ok('on the plan from today', M.blocksFor(k, T).length === 1);
  const r2 = M.addRoutine(k, { title: 'Chess', cat: 'create', days: [0, 1, 2, 3, 4, 5, 6], start: 18 * 60, dur: 30 }, addDays(T, -7));
  M.mark(k, r2.id, addDays(T, -2), 'done');
  M.removeRoutine(k, r2.id, T);
  ok('retired routine keeps its past', M.blocksFor(k, addDays(T, -2)).some((b) => b.r.id === r2.id));
  ok('retired routine leaves the future', !M.blocksFor(k, T).some((b) => b.r.id === r2.id));
  const r3 = M.addRoutine(k, { title: 'Oops', cat: 'play', days: [2], start: 10 * 60, dur: 30 }, T);
  M.removeRoutine(k, r3.id, T);
  ok('a routine with no history is simply deleted', !k.routines.some((r) => r.id === r3.id));
}

/* 3. auto blocks count themselves; app blocks count from the APP, never from typing */
{
  const h = M.newHousehold(), k = M.newKid({ name: 'Mira' }); h.kids.push(k);
  h.demo = true; h.demoFeed = [];
  M.addRoutine(k, { title: 'School', cat: 'school', days: [0, 1, 2, 3, 4], start: 8 * 60, dur: 390, auto: true }, '2026-09-01');
  const bee = M.addRoutine(k, { title: 'Bee', cat: 'bizzing', days: [2], start: 16 * 60, dur: 20, app: 'bee' }, '2026-09-01');
  const sch = M.blocksFor(k, T)[0];
  ok('auto block counts itself once over', M.status(h, k, sch, T, T, 15 * 60).s === 'done');
  const bb = M.blocksFor(k, T).find((b) => b.r.id === bee.id);
  ok('app block with no minutes is open', M.status(h, k, bb, T, T, 17 * 60).s === 'open');
  h.demoFeed.push({ a: 'bee', d: T, t: 960, m: 8, who: 'Mira' });
  ok('a few minutes is partly', M.status(h, k, bb, T, T, 17 * 60).s === 'part');
  h.demoFeed.push({ a: 'bee', d: T, t: 1000, m: 6, who: 'Mira' });
  ok('60% of the time is done', M.status(h, k, bb, T, T, 17 * 60).s === 'done' && M.status(h, k, bb, T, T, 17 * 60).how === 'app');
  h.demoFeed.push({ a: 'bee', d: T, t: 1000, m: 30, who: 'Someone Else' });
  ok('another child\'s minutes are not mine', M.catMinutes(h, k, [T], T, 17 * 60).kept.bizzing === 14);
  M.addExtra(k, T, { cat: 'bizzing', mins: 500 });
  ok('self-report can never add Bizzing time', M.catMinutes(h, k, [T], T, 17 * 60).kept.bizzing === 14);
}

/* 4. goals measure themselves */
{
  const h = M.newHousehold(), k = M.newKid({ name: 'Mira' }); h.kids.push(k); h.demo = true; h.demoFeed = [];
  const g = M.addGoal(k, { title: 'Bee final', created: '2026-09-01', krs: [{ title: 'Bee', source: 'app:bee', per: 'week', target: 100 }, { title: 'Lists', source: 'tasks', per: 'total', target: 4 }], steps: ['a', 'b'] }, '2026-09-01');
  h.demoFeed.push({ a: 'bee', d: T, t: 900, m: 50, who: 'Mira' }, { a: 'bee', d: addDays(T, -7), t: 900, m: 80, who: 'Mira' });
  ok('weekly app KR counts only this week', M.krValue(h, k, g, g.krs[0], T) === 50);
  const t1 = M.addTask(k, { title: 'L1', goalId: g.id }, T); M.moveTask(k, t1.id, 'done', T);
  ok('task KR counts finished linked tasks', M.krValue(h, k, g, g.krs[1], T) === 1);
  g.steps[0].done = true;
  const p = M.goalProgress(h, k, g, T);
  ok('progress averages KRs and steps', Math.abs(p - (0.5 + 0.25 + 0.5) / 3) < 1e-9, p);
  const hist = M.krHistory(h, k, g, g.krs[0], 6, T);
  ok('history has last week', hist[4] === 80 && hist[5] === 50, JSON.stringify(hist));
}

/* 5. the household: a second child never inherits the first's anything */
{
  const h = M.newHousehold(), a = M.newKid({ name: 'A' }), b = M.newKid({ name: 'B' }); h.kids.push(a, b);
  M.addRoutine(a, { title: 'x', cat: 'play', days: [2], start: 600, dur: 30 }, T);
  M.addTask(a, { title: 't' }, T); M.addGoal(a, { title: 'g' }, T); M.sendKudos(a, { text: 'hi' }, T);
  ok('B has an empty plan', !b.routines.length && !b.tasks.length && !b.goals.length && !b.kudos.length);
  ok('nothing child-shaped at the top', Object.keys(h).every((k) => ['v', 'parent', 'kids', 'active', 'created'].includes(k)));
}

/* 6. clash + breathing room + find-a-time */
{
  const k = M.newKid({ name: 'Mira' });
  M.addRoutine(k, { title: 'School', cat: 'school', days: [0, 1, 2, 3, 4], start: 8 * 60, dur: 420 }, '2026-09-01');
  M.addRoutine(k, { title: 'Soccer', cat: 'move', days: [2], start: 17 * 60, dur: 60 }, '2026-09-01');
  M.addRoutine(k, { title: 'Piano', cat: 'create', days: [2], start: 17 * 60 + 30, dur: 30 }, '2026-09-01');
  M.addRoutine(k, { title: 'Bed', cat: 'rest', days: [0, 1, 2, 3, 4, 5, 6], start: 20 * 60 + 30, dur: 30 }, '2026-09-01');
  ok('overlap is a clash', M.clashes(k, T).length === 1);
  ok('breathing room = school end to bed minus busy', M.breathingRoom(k, T) === (20 * 60 + 30 - 15 * 60) - 60, M.breathingRoom(k, T));
  const s = M.suggestStart(k, [2], 60, T);
  ok('find-a-time avoids every block', s === 15 * 60 + 30, s);
}

/* 7. the demo is sane, and every badge is earnable-from-evidence */
{
  const h = demoHousehold(T, 17 * 60);
  const a = h.kids[0];
  const w = M.weekStats(h, a, T, T, 17 * 60);
  ok('demo has a plausible rhythm', w.pct > 0.5 && w.pct < 1, w.pct);
  ok('demo feed stays in the demo', Array.isArray(h.demoFeed) && h.demoFeed.length > 20);
  ok('demo feed names its child', h.demoFeed.every((x) => x.who));
  const bs = badgeStates(h, a, T, 17 * 60);
  ok('twelve badges', bs.length === 12 && BADGES.length === 12);
  const fresh = award(h, a, T, 17 * 60);
  ok('demo earns some medals, not all', fresh.length > 0 && fresh.length < 12, fresh.map((b) => b.id).join(','));
  ok('award is idempotent', award(h, a, T, 17 * 60).length === 0);
  const empty = M.newKid({ name: 'New' }); empty.created = T;
  ok('a brand-new child has earned nothing', badgeStates(M.newHousehold(), empty, T).every((b) => b.have < b.need));
  ok('cheer never shames', !/fail|bad|lazy|behind|missed/i.test(M.cheer(h, a, T, 17 * 60)));
}

if (fail) { console.log(`model: ${fail} of ${n} FAILED`); process.exit(1); }
console.log(`model: all ${n} passed`);
