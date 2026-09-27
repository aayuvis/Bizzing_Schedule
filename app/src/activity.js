/* activity.js — time in the Bizzing apps, READ from the apps themselves.

   Every Bizzing app is served from the same origin (aayuvis.github.io), so they
   share localStorage. The contract (integration/bizzing-activity.js is the
   drop-in writer, docs/02-activity-contract.md the spec):

     localStorage['bizzing.activity'] = {
       v: 1,
       s: [ { a: 'bee', d: '2026-09-27', t: 1020, m: 18, who: 'Anaya' }, … ]
     }
       a    app id — bee | maths | india | finance
       d    local date the session started
       t    start, minutes after midnight
       m    ACTIVE minutes (visible and touched in the last two minutes)
       who  the child's first name as that app knows it (optional)

   Nothing here is typed by the child — that is the whole point. A child is never
   asked "how long did you spend on Bizzing Bee?"; the Bee says.

   Attribution: a session names its child by first name. A session with no name
   belongs to the only child if there is one, and otherwise to nobody (the
   grown-up's page shows it as unassigned rather than guessing). */

import { Store } from './store.js';
import { APPS } from './cats.js';

export const FEED_KEY = 'bizzing.activity';

export function feed(h) {
  if (h && h.demo) return h.demoFeed || [];
  const raw = Store.readRaw(FEED_KEY);
  return raw && Array.isArray(raw.s) ? raw.s.filter(valid) : [];
}

const valid = (x) => x && APPS[x.a] && /^\d{4}-\d{2}-\d{2}$/.test(x.d) && x.m > 0 && x.m < 600;

export function belongs(x, kid, h) {
  if (x.who) return x.who.trim().toLowerCase() === kid.name.trim().toLowerCase();
  return h.kids.length === 1;
}

/* { bee: 18, maths: 12 } for one child on one date */
export function appMinutes(h, kid, date) {
  const out = {};
  for (const x of feed(h)) if (x.d === date && belongs(x, kid, h)) out[x.a] = (out[x.a] || 0) + x.m;
  return out;
}

export function appMinutesRange(h, kid, dates) {
  const set = new Set(dates), out = {};
  for (const x of feed(h)) if (set.has(x.d) && belongs(x, kid, h)) out[x.a] = (out[x.a] || 0) + x.m;
  return out;
}

export function sessions(h, kid, date) {
  return feed(h).filter((x) => x.d === date && belongs(x, kid, h)).sort((a, b) => a.t - b.t);
}

export function unassigned(h) {
  return feed(h).filter((x) => !x.who && h.kids.length !== 1).length;
}

/* Which apps have EVER reported on this device — the Connect panel. */
export function seenApps(h) {
  const s = new Set(feed(h).map((x) => x.a));
  return Object.keys(APPS).map((id) => ({ id, ...APPS[id], seen: s.has(id) }));
}
