/* demo.js — a sample family, so a grown-up can see the whole app working in
   one tap before typing a thing. Three weeks of believable history, generated
   from a fixed seed so the demo is the same every time it is opened.

   The demo is flagged `demo: true` and keeps its Bizzing-app minutes in its own
   feed (demoFeed): a sample family must never write into the real shared feed
   that the other Bizzing apps own. */

import { ymd, addDays, dow, weekStart } from './time.js';
import { newHousehold, newKid, addRoutine, addTask, addGoal, mark, addExtra, sendKudos, addFocus, blocksFor, uid } from './model.js';

function rng(seed) {
  return () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

const WD = [0, 1, 2, 3, 4], ALL = [0, 1, 2, 3, 4, 5, 6];
const H = (h, m = 0) => h * 60 + m;

export function demoHousehold(today = ymd(), now = new Date().getHours() * 60 + new Date().getMinutes()) {
  const r = rng(20260927);
  const h = newHousehold();
  h.demo = true;
  h.demoFeed = [];
  h.parent = { pin: '1234', name: 'Mum' };
  const start = addDays(weekStart(today), -21);

  /* ── Anaya, 10 ── */
  const a = newKid({ name: 'Anaya', band: '9-11', avatar: 'melody' });
  a.created = start;
  const R = (x) => addRoutine(a, { ...x, from: start }, start);
  R({ title: 'School', cat: 'school', days: WD, start: H(8, 15), dur: 395, anchor: true, auto: true, by: 'grown' });
  const bee = R({ title: 'Spelling on Bizzing Bee', cat: 'bizzing', days: WD, start: H(16), dur: 20, app: 'bee' });
  R({ title: 'Homework', cat: 'study', days: WD, start: H(16, 30), dur: 45, anchor: true, by: 'grown' });
  const piano = R({ title: 'Piano practice', cat: 'create', days: [0, 2, 4], start: H(17, 30), dur: 30 });
  R({ title: 'Soccer training', cat: 'move', days: [1, 3], start: H(17, 30), dur: 60, anchor: true, by: 'grown' });
  R({ title: 'Free play', cat: 'play', days: WD, start: H(18, 30), dur: 45 });
  R({ title: 'Kangaroo prep on Bizzing Maths', cat: 'bizzing', days: [2, 5], start: H(19, 15), dur: 25, app: 'maths' });
  R({ title: 'TV time', cat: 'screen', days: WD, start: H(19, 45), dur: 30 });
  R({ title: 'Reading', cat: 'study', days: ALL, start: H(20, 15), dur: 20 });
  R({ title: 'Lights out', cat: 'rest', days: ALL, start: H(20, 45), dur: 30, anchor: true, by: 'grown' });
  R({ title: 'Soccer match', cat: 'move', days: [5], start: H(9), dur: 90, anchor: true, by: 'grown' });
  R({ title: 'Help with chores', cat: 'family', days: [5], start: H(11, 30), dur: 30 });
  R({ title: 'Playdate / friends', cat: 'play', days: [5], start: H(14), dur: 120 });
  R({ title: 'Stories on Bizzing India', cat: 'bizzing', days: [6], start: H(10, 30), dur: 25, app: 'india' });
  R({ title: 'Family dinner at Nani’s', cat: 'family', days: [6], start: H(18), dur: 90, anchor: true, by: 'grown' });
  R({ title: 'Movie night', cat: 'screen', days: [6], start: H(16), dur: 90 });

  const g1 = addGoal(a, { title: 'Make the district spelling bee final', emoji: '🏆', cat: 'study', due: addDays(today, 46), created: start,
    why: 'I want to see how far I can go — and spell “onomatopoeia” on stage.',
    krs: [{ title: 'Bizzing Bee practice', source: 'app:bee', per: 'week', target: 100, unit: 'min' },
          { title: 'Spelling lists finished', source: 'tasks', per: 'total', target: 8, unit: 'lists' }],
    steps: [{ t: 'Learn the Greek & Latin roots list', done: true }, { t: 'Mock bee with Mum', done: true }, { t: 'Three mock contests on Bizzing Bee', done: false }, { t: 'School round', done: false }] });
  const g2 = addGoal(a, { title: 'Maths Kangaroo — top 10 again', emoji: '🦘', cat: 'study', due: addDays(today, 110), created: start,
    why: 'Last year was rank 14. I think I can do it again, and better.',
    krs: [{ title: 'Bizzing Maths practice', source: 'app:maths', per: 'week', target: 60, unit: 'min' },
          { title: 'Past papers done', source: 'manual', per: 'total', target: 6, unit: 'papers', value: 3 },
          { title: 'Focus sprints on maths', source: 'focus', per: 'total', target: 120, unit: 'min' }],
    steps: [] });
  const g3 = addGoal(a, { title: 'Play Für Elise at the winter recital', emoji: '🎹', cat: 'create', due: addDays(today, 70), created: start,
    why: 'Nani will be there.',
    krs: [{ title: 'Piano practice kept', source: 'routine:' + piano.id, per: 'week', target: 3, unit: 'times' }],
    steps: [{ t: 'First page hands together', done: true }, { t: 'Middle section', done: false }, { t: 'Play it through for Dad', done: false }] });
  addGoal(a, { title: 'More time outside', emoji: '🌳', cat: 'move', created: start, why: 'Feels good. Sleep better.',
    krs: [{ title: 'Sport & movement', source: 'cat:move', per: 'week', target: 180, unit: 'min' }], steps: [] });

  const T = (x) => addTask(a, { ...x }, start);
  T({ title: 'Spelling list 12 — 20 words', cat: 'study', goalId: g1.id, due: addDays(today, -9) }).status = 'done';
  a.tasks.at(-1).doneAt = addDays(today, -9);
  T({ title: 'Spelling list 13 — 20 words', cat: 'study', goalId: g1.id, due: addDays(today, -3) }).status = 'done';
  a.tasks.at(-1).doneAt = addDays(today, -4);
  T({ title: 'Spelling list 14 — 20 words', cat: 'study', goalId: g1.id, due: today, est: 25, pri: 'high' });
  T({ title: 'Science fair poster', cat: 'study', due: addDays(today, 3), est: 60, sub: [{ t: 'Pick the question', done: true }, { t: 'Run the experiment', done: true }, { t: 'Draw the chart', done: false }, { t: 'Glue it all up', done: false }] }).status = 'doing';
  T({ title: 'Kangaroo past paper 4', cat: 'study', goalId: g2.id, due: addDays(today, 2), est: 45 });
  T({ title: 'Return library books', cat: 'family', due: addDays(today, 1) });
  T({ title: 'Birthday card for Nani', cat: 'create', due: addDays(today, 4), est: 30 });
  T({ title: 'Tidy desk', cat: 'family', due: today, est: 10 });
  T({ title: 'Practise the recital piece slowly', cat: 'create', goalId: g3.id, est: 20 });

  /* ── Kabir, 7 ── */
  const k = newKid({ name: 'Kabir', band: '6-8', avatar: 'rocket' });
  k.created = start;
  const K = (x) => addRoutine(k, { ...x, from: start }, start);
  K({ title: 'School', cat: 'school', days: WD, start: H(8, 15), dur: 395, anchor: true, auto: true, by: 'grown' });
  K({ title: 'Stories on Bizzing India', cat: 'bizzing', days: WD, start: H(16), dur: 15, app: 'india' });
  K({ title: 'Lego & building', cat: 'create', days: [0, 2, 4], start: H(16, 30), dur: 45 });
  K({ title: 'Park with friends', cat: 'play', days: [1, 3], start: H(16, 30), dur: 60 });
  K({ title: 'Reading with Dad', cat: 'study', days: ALL, start: H(19), dur: 20 });
  K({ title: 'Cartoons', cat: 'screen', days: ALL, start: H(17, 45), dur: 30 });
  K({ title: 'Bath & bed', cat: 'rest', days: ALL, start: H(19, 30), dur: 30, anchor: true, by: 'grown' });
  K({ title: 'Swimming lesson', cat: 'move', days: [5], start: H(10), dur: 45, anchor: true, by: 'grown' });
  addGoal(k, { title: 'Swim a whole length', emoji: '🏊', cat: 'move', created: start, why: 'Like Anaya!',
    krs: [], steps: [{ t: 'Float on my back', done: true }, { t: 'Put my face in', done: true }, { t: 'Half a length', done: false }, { t: 'A whole length!', done: false }] });
  addGoal(k, { title: 'Read 20 books this term', emoji: '📚', cat: 'study', created: start,
    krs: [{ title: 'Books finished', source: 'manual', per: 'total', target: 20, unit: 'books', value: 7 }], steps: [] });
  addTask(k, { title: 'Show-and-tell: my rock collection', cat: 'school', due: addDays(today, 1) }, start);
  addTask(k, { title: 'Feed the fish', cat: 'family', due: today }, start);

  /* ── the history: plausible, imperfect, improving ── */
  for (const kid of [a, k]) {
    for (let d = start; d <= today; d = addDays(d, 1)) {
      const age = (Date.parse(today) - Date.parse(d)) / 864e5;
      for (const b of blocksFor(kid, d)) {
        if (b.r.auto) continue;
        const endT = b.start + b.dur;
        if (d === today && endT > now) continue;
        if (b.r.app) {
          const x = r();
          const m = x < 0.72 ? Math.round(b.dur * (0.9 + r() * 0.5)) : x < 0.87 ? Math.round(b.dur * 0.4) : 0;
          if (m) h.demoFeed.push({ a: b.r.app, d, t: b.start + Math.round(r() * 10), m, who: kid.name });
          continue;
        }
        if (d === today && r() < 0.35) continue;     // today: a couple still to check in
        const x = r() - Math.min(0.1, (21 - age) * 0.005);  // better lately
        mark(kid, b.r.id, d, x < 0.8 ? 'done' : x < 0.88 ? 'part' : x < 0.93 ? 'skip' : null);
      }
      if (dow(d) >= 5 && r() < 0.6) addExtra(kid, d, { cat: 'screen', mins: 30, title: 'Extra TV' });
      if (r() < 0.3) addExtra(kid, d, { cat: 'play', mins: 30 + 15 * Math.floor(r() * 3), title: 'Played outside' });
      if (r() < 0.55 && d < today) kid.mood[d] = ['😄', '🙂', '😐', '🙂', '😄'][Math.floor(r() * 5)];
    }
  }
  // a few sessions of Bizzing Bee off-plan (weekends, the week before the bee)
  for (let i = 1; i < 21; i += 3) h.demoFeed.push({ a: 'bee', d: addDays(today, -i), t: H(11), m: 10 + Math.round(r() * 15), who: 'Anaya' });

  for (let i = 0; i < 5; i++) addFocus(a, 25, i < 3 ? g2.id : null, null, addDays(today, -2 * i - 1));
  a.focus.forEach((f, i) => (f.d = addDays(today, -2 * i - 1)));
  sendKudos(a, { from: 'Dad', text: 'Saw you practise piano without being asked. That was cool.', sticker: '🎹' }, addDays(today, -6));
  sendKudos(a, { from: 'Mum', text: 'Four spelling lists in two weeks. You are putting the work in!', sticker: '🐝' }, addDays(today, -2));
  sendKudos(a, { from: 'Nani', text: 'Proud of my girl. Keep going beta.', sticker: '💛' }, addDays(today, -1));
  a.kudos.forEach((x, i) => { x.at = addDays(today, -[1, 2, 6][i]); x.seen = i > 0; });
  sendKudos(k, { from: 'Mum', text: 'Face in the water! Brave boy.', sticker: '🌊' }, addDays(today, -3));
  a.huddles.push({ wk: addDays(weekStart(today), -7), at: addDays(weekStart(today), -1), top3: ['Spelling list 13', 'Science fair question', 'Two piano practices'] });

  h.kids.push(a, k);
  h.active = a.id;
  return h;
}

/* A starter week for a real child — the grown-up's anchors plus sensible
   defaults the child then rearranges. Every block is editable. */
export function starterWeek(kid, today = ymd(), opts = {}) {
  const R = (x) => addRoutine(kid, x, today);
  if (opts.school !== false) R({ title: 'School', cat: 'school', days: WD, start: H(8, 15), dur: 390, anchor: true, auto: true, by: 'grown' });
  R({ title: 'Homework', cat: 'study', days: WD, start: H(16, 15), dur: 40 });
  R({ title: 'Bizzing Bee', cat: 'bizzing', days: WD, start: H(17), dur: 20, app: 'bee' });
  R({ title: 'Free play', cat: 'play', days: WD, start: H(17, 30), dur: 60 });
  R({ title: 'Reading', cat: 'study', days: ALL, start: H(19, 45), dur: 20 });
  R({ title: 'Screen time', cat: 'screen', days: ALL, start: H(19), dur: 30 });
  R({ title: 'Bedtime', cat: 'rest', days: ALL, start: kid.band === '6-8' ? H(20) : kid.band === '9-11' ? H(20, 45) : H(21, 30), dur: 30, anchor: true, by: 'grown' });
  return kid;
}

export { uid };
