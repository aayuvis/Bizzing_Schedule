/* avatars.mjs — the family avatar engine keeps its rules. */
const mem = {}; globalThis.localStorage = { getItem: (k) => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: (k) => { delete mem[k]; } };
const A = await import('../../integration/bizzing-avatars.js');
const W = await import('../../integration/bizzing-wallet.js');
let fail = 0; const ok = (n, c, x = '') => { if (!c) { fail++; console.log('✗', n, x); } };
const T = Date.UTC(2026, 9, 2, 12);
const order = ['common', 'common', 'rare', 'rare', 'rare', 'epic', 'epic', 'legendary'];
const cat = [];
for (let p = 1; p <= 12; p++) order.forEach((tier, i) => cat.push({ id: `p${p}-${i}`, name: `Face ${p}.${i}`, pack: p, tier, art: `av/p${p}-${i}.webp`,
  ...(tier === 'legendary' ? { milestone: { id: `world${p}`, label: `Finish world ${p}` } } : {}) }));
ok('a well-formed catalogue passes', A.validate(cat).length === 0, A.validate(cat).join('; '));
// prove the validator by breaking it, one rule at a time
const broke = (f) => { const c = structuredClone(cat); f(c); return A.validate(c).length > 0; };
ok('refuses 95 avatars', broke((c) => c.pop()));
ok('refuses a pack with two legendaries', broke((c) => { c[2].tier = 'legendary'; c[2].milestone = { id: 'x', label: 'x' }; }));
ok('refuses a legendary with no milestone', broke((c) => { delete c[7].milestone; }));
ok('a real person needs a one-line about', broke((c) => { c[3].real = true; }) && !broke((c) => { c[3].real = true; c[3].about = 'Physicist'; }));
ok('a sacred figure is allowed, but never in a villain pack', !broke((c) => { c[3].sacred = true; }) && A.sacredSafe([{ id: 'x', sacred: true, pack: 12 }], [12]).length === 1 && A.sacredSafe([{ id: 'x', sacred: true, pack: 3 }], [12]).length === 0);
ok('refuses an off-list price', broke((c) => { c[3].price = 99; }));
ok('refuses a duplicate id', broke((c) => { c[3].id = c[4].id; }));
ok('refuses a thirteenth pack', broke((c) => { c[3].pack = 13; }));
const rare1 = cat[2], rare9 = cat.find((a) => a.pack === 9 && a.tier === 'rare'), leg1 = cat[7], com9 = cat.find((a) => a.pack === 9);
ok('commons are free in every pack on every plan', A.stateOf(com9, { plan: 'free' }).state === 'owned');
ok('pack 9 waits for world 5, in plain words', A.stateOf(rare9, { plan: 'free' }).state === 'world' && A.stateOf(rare9, {}).world === 5 && !/\$|₹|£|€|buy|pay|plan/i.test(A.stateOf(rare9, {}).say));
ok('family plan opens pack 9', A.stateOf(rare9, { plan: 'family' }).state === 'buy');
ok('packs 5–12 wait for their world on the free plan', cat.filter((a) => a.pack >= 5 && a.tier !== 'common').every((a) => A.stateOf(a, {}).state === 'world'));
ok('packs 1–4 open to everyone (worlds 1–2)', cat.filter((a) => a.pack <= 4 && a.tier === 'rare').every((a) => A.stateOf(a, {}).state === 'buy'));
ok('legendary names its milestone first', A.stateOf(leg1, { plan: 'free' }).say === 'First: Finish world 1');
ok('cannot buy without the coins', !A.buy('maths', 'Anaya', rare1, { plan: 'free' }, T) && A.stateOf(rare1, { who: 'Anaya' }).short === 120);
for (let d = 0; d < 9; d++) for (let i = 0; i < 5; i++) W.earn('maths', 'Anaya', 'mastery', T + d * 864e5);
ok('buys a rare at exactly 120', A.buy('maths', 'Anaya', rare1, { plan: 'free' }, T) && W.ledger('Anaya').at(-1).n === -120 && W.ledger('Anaya').at(-1).why === `avatar:${rare1.id}`);
ok('an owned face is not sold twice', A.stateOf(rare1, { owned: [rare1.id] }).state === 'owned' && !A.buy('maths', 'Anaya', rare1, { owned: [rare1.id] }, T));
ok('legendary sells only after the milestone', !A.buy('maths', 'Anaya', leg1, {}, T) && A.buy('maths', 'Anaya', leg1, { milestones: ['world1'] }, T) && W.ledger('Anaya').at(-1).n === -500);
ok('a world cannot be bought without the coins', !A.buyWorld('maths', 'Kabir', 5, {}, T));
for (let d = 0; d < 3; d++) for (let i = 0; i < 5; i++) W.earn('maths', 'Kabir', 'mastery', T + d * 864e5);
ok('world 5 costs exactly 240 and opens pack 9', A.buyWorld('maths', 'Kabir', 5, {}, T) && W.ledger('Kabir').at(-1).n === -240 && A.stateOf(rare9, { worlds: [5] }).state === 'buy');
ok('an open world is never sold', !A.buyWorld('maths', 'Kabir', 1, {}, T) && !A.buyWorld('maths', 'Kabir', 5, { worlds: [5] }, T) && !A.buyWorld('maths', 'Kabir', 4, { plan: 'family' }, T));
ok('a pack can be re-homed to another world', A.stateOf({ ...rare9, world: 1 }, {}).state === 'buy' && A.stateOf({ ...rare1, world: 7 }, {}).state === 'world');
ok('refuses a nonsense world', broke((c) => { c[3].world = 0; }));
ok('prices are the family table', A.TIERS.rare.price === 120 && A.TIERS.epic.price === 250 && A.TIERS.legendary.price === 500 && A.TIERS.common.price === 0);
if (fail) { console.log(`avatars: ${fail} FAILED`); process.exit(1); }
console.log('avatars: all 25 passed');
