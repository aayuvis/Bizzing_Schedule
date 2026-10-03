/* activity.mjs — the drop-in stamps a minute and a milestone on the day its own clock says.
   It used to take the day from new Date() while timing with Date.now(): a pinned clock wrote
   minutes under the real date, and Geography's test broke when the real date rolled over. */
const mem = {}; globalThis.localStorage = { getItem: (k) => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: (k) => { delete mem[k]; } };
let t = new Date(2020, 0, 15, 16, 5).getTime(), tick = null;
Date.now = () => t; globalThis.window = globalThis; globalThis.addEventListener = () => {}; globalThis.removeEventListener = () => {};
globalThis.document = { visibilityState: 'visible' }; globalThis.setInterval = (fn) => { tick = fn; return 1; }; globalThis.clearInterval = () => {};
const A = await import('../../integration/bizzing-activity.js');
let fail = 0; const ok = (n, c, x = '') => { if (!c) { fail++; console.log('✗', n, x); } };
A.trackActivity('maths', () => 'Asha');
for (let i = 0; i < 9; i++) { t += 15000; tick(); }
const rows = JSON.parse(mem['bizzing.activity'] || '{"s":[]}').s;
ok('a minute is written', rows.some((r) => !r.ev && r.m >= 1));
ok('it is written on the day its clock says, not the wall clock', rows.filter((r) => !r.ev).every((r) => r.d === '2020-01-15'), JSON.stringify(rows.map((r) => r.d)));
A.trackMilestone('maths', 'Asha', 'stop', 'Times Market');
const ms = JSON.parse(mem['bizzing.activity']).s.filter((r) => r.ev);
ok('a milestone is written on the same day', ms.length === 1 && ms[0].d === '2020-01-15', JSON.stringify(ms));
if (fail) { console.log(`activity: ${fail} FAILED`); process.exit(1); }
console.log('activity: all 3 passed');
