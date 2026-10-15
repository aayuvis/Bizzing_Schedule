/* badges.js — twelve medals, every one EARNED FROM EVIDENCE.

   A badge is computed from the log, never handed out: nothing arrives for
   opening the app, and nothing is lost for missing a day (no streaks — counts
   in a window, or counts over all time). Once earned, the date is kept on the
   child so the moment can be celebrated exactly once. */

import { ymd, addDays, weekStart, weekDays, nowMin } from './time.js';
import { blocksFor, status, weekStats, dayScore } from './model.js';

const countKept = (h, kid, cat, today, now, days = 120) => {
  let n = 0;
  for (let i = 0; i < days; i++) {
    const d = addDays(today, -i);
    if (d < kid.created) break;
    for (const b of blocksFor(kid, d)) if (b.r.cat === cat && status(h, kid, b, d, today, now).s === 'done') n++;
  }
  return n;
};

const bestWeek = (h, kid, today, now, test) => {
  for (let w = 0; w < 16; w++) {
    const wk = addDays(weekStart(today), -7 * w);
    if (addDays(wk, 6) < kid.created) break;
    if (test(weekStats(h, kid, wk, today, now), wk)) return true;
  }
  return false;
};

export const BADGES = [
  { id: 'rocket', av: 'rocket', art: 'badge-rocket', name: 'Lift-off', desc: 'Check in on 5 different days.',
    calc: (h, k, t, n) => { let c = 0; for (let i = 0; i < 60; i++) { const d = addDays(t, -i); if (d < k.created) break; if (k.log[d]) c++; } return [c, 5]; } },
  { id: 'sunrise', av: 'snowfox', art: 'badge-sunrise', name: 'Early Bird', desc: 'Keep your first plan of the day, 5 times.',
    calc: (h, k, t, n) => { let c = 0; for (let i = 0; i < 60; i++) { const d = addDays(t, -i); if (d < k.created) break; const b = blocksFor(k, d).find((x) => !x.r.auto); if (b && status(h, k, b, d, t, n).s === 'done') c++; } return [c, 5]; } },
  { id: 'comb', av: 'robo', art: 'badge-comb', name: 'Full Comb', desc: 'A week where you keep 9 in 10 of your plans.',
    calc: (h, k, t, n) => [bestWeek(h, k, t, n, (w) => w.planned >= 10 && w.pct >= 0.9) ? 1 : 0, 1] },
  { id: 'balance', av: 'beaker', art: 'badge-balance', name: 'Balanced Week', desc: 'Keep time in 5 different kinds of things in one week — and keep screens to plan.',
    calc: (h, k, t, n) => [bestWeek(h, k, t, n, (w) => Object.entries(w.mins.kept).filter(([c, m]) => c !== 'rest' && c !== 'school' && m >= 30).length >= 5 && w.mins.kept.screen <= Math.max(w.mins.planned.screen, 60)) ? 1 : 0, 1] },
  { id: 'book', av: 'scopey', art: 'badge-book', name: 'Deep Thinker', desc: 'Keep 15 study blocks.', calc: (h, k, t, n) => [countKept(h, k, 'study', t, n), 15] },
  { id: 'sneaker', av: 'comet', art: 'badge-sneaker', name: 'Mover', desc: 'Keep 10 sport or movement blocks.', calc: (h, k, t, n) => [countKept(h, k, 'move', t, n), 10] },
  { id: 'palette', av: 'melody', art: 'badge-palette', name: 'Maker', desc: 'Keep 10 music or art blocks.', calc: (h, k, t, n) => [countKept(h, k, 'create', t, n), 10] },
  { id: 'owl', av: 'aryabhatta', art: 'badge-owl', name: 'Night Owl Tamer', desc: 'Get to bed on plan 7 times.', calc: (h, k, t, n) => [countKept(h, k, 'rest', t, n), 7] },
  { id: 'lantern', av: 'samurai', art: 'badge-lantern', name: 'Laser Focus', desc: 'Finish 5 focus sprints.', calc: (h, k) => [k.focus.length, 5] },
  { id: 'summit', av: 'goldlegend', art: 'badge-summit', name: 'Summit', desc: 'Finish a goal.', calc: (h, k) => [k.goals.filter((g) => g.done).length, 1] },
  { id: 'heart', av: 'panda', art: 'badge-heart', name: 'Cheered On', desc: 'Receive 5 kudos from your family.', calc: (h, k) => [k.kudos.length, 5] },
  { id: 'compass', av: 'astro', art: 'badge-compass', name: 'Navigator', desc: 'Plan your own week in a Sunday huddle, 2 times.', calc: (h, k) => [k.huddles.length, 2] },
];

/* COMPANIONS: every medal brings one avatar, earned exactly the way the medal is.
   No coins, no shop, nothing random (CONCEPT §5). Nine avatars are free from the
   start, and a child always keeps the one they are already wearing. */
export const FREE_AVATARS = ['bizzy', 'koi', 'redpanda', 'pengu', 'ottie', 'capy', 'neko', 'froggy', 'pixel'];
export const AV_NAME = { bizzy: 'Bizzy', koi: 'Koi', redpanda: 'Red Panda', pengu: 'Pengu', ottie: 'Ottie', capy: 'Capy', neko: 'Neko',
  froggy: 'Froggy', pixel: 'Pixel', rocket: 'Rocket', snowfox: 'Snowfox', robo: 'Robo', beaker: 'Beaker', scopey: 'Scopey', comet: 'Comet',
  melody: 'Melody', aryabhatta: 'Aryabhatta', samurai: 'Samurai', goldlegend: 'Gold Legend', panda: 'Panda', astro: 'Astro' };

/* Every avatar, free ones first, with whether this child may wear it and which
   medal opens it. kid null = a child who does not exist yet: the free ones only. */
export function avatarChoices(kid) {
  return [...FREE_AVATARS, ...BADGES.map((b) => b.av)].map((id) => {
    const b = BADGES.find((x) => x.av === id);
    return { id, name: AV_NAME[id], medal: b ? b.name : null, ok: !b || !!(kid && (kid.badges[b.id] || kid.avatar === id)) };
  });
}
export const canWear = (kid, id) => avatarChoices(kid).some((a) => a.id === id && a.ok);

export function badgeStates(h, kid, today = ymd(), now = nowMin()) {
  return BADGES.map((b) => {
    const [have, need] = b.calc(h, kid, today, now);
    return { ...b, have: Math.min(have, need), need, earned: kid.badges[b.id] || null };
  });
}

/* Record newly earned badges; return them so the app can celebrate once. */
export function award(h, kid, today = ymd(), now = nowMin()) {
  const fresh = [];
  for (const b of badgeStates(h, kid, today, now)) {
    if (!b.earned && b.have >= b.need) { kid.badges[b.id] = today; fresh.push(b); }
  }
  return fresh;
}
