/* wallet.mjs — the family currency keeps its rules. */
const mem = {}; globalThis.localStorage = { getItem: (k) => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: (k) => { delete mem[k]; } };
const W = await import('../../integration/bizzing-wallet.js');
let fail = 0; const ok = (n, c, x = '') => { if (!c) { fail++; console.log('✗', n, x); } };
const T = Date.UTC(2026, 9, 2, 12);
ok('answer pays 1', W.earn('maths', 'Anaya', 'answer', T) === 1);
ok('unknown events pay nothing (no time, streak, dice)', ['time', 'streak', 'login', 'dice', 'luck'].every((e) => W.earn('maths', 'Anaya', e, T) === 0));
ok('unknown app pays nothing', W.earn('hive', 'Anaya', 'answer', T) === 0);
ok('names are case-insensitive', W.earn('bee', 'anaya', 'stop', T) === 5 && W.balance('ANAYA') === 6);
for (let i = 0; i < 30; i++) W.earn('geography', 'Anaya', 'mastery', T);
ok('daily cap is 100 per app', W.ledger('Anaya').filter((x) => x.a === 'geography').reduce((a, x) => a + x.n, 0) === 100);
ok('cap resets the next day', W.earn('geography', 'Anaya', 'answer', T + 864e5) === 1);
ok('cap is per app', W.earn('india', 'Anaya', 'mastery', T) === 20);
const before = W.balance('Anaya');
ok('spend at a fixed price', W.spend('bee', 'Anaya', 40, 'outfit:crown', T) && W.balance('Anaya') === before - 40);
ok('cannot overspend', !W.spend('bee', 'Anaya', 1e6, 'x', T));
ok('no fractional or negative prices', !W.spend('bee', 'Anaya', 2.5, 'x', T) && !W.spend('bee', 'Anaya', -5, 'x', T));
ok('a second child is separate', W.balance('Kabir') === 0);
ok('migration is once per app', W.migrateFrom('bee', 'Kabir', 250, T) === 250 && W.migrateFrom('bee', 'Kabir', 250, T) === 0 && W.balance('Kabir') === 250);
const b2 = W.balance('Kabir'); W.spend('bee', 'Kabir', 120, 'avatar:thor', T);
ok('refund returns exactly what was paid, once', W.refund('bee', 'Kabir', 'avatar:thor', T) === 120 && W.refund('bee', 'Kabir', 'avatar:thor', T) === 0 && W.balance('Kabir') === b2);
ok('refund of something never bought pays nothing', W.refund('bee', 'Kabir', 'avatar:zeus', T) === 0);
ok('ledger is append-only and explains every coin', W.ledger('Anaya').reduce((a, x) => a + x.n, 0) === W.balance('Anaya'));
if (fail) { console.log(`wallet: ${fail} FAILED`); process.exit(1); }
console.log('wallet: all 15 passed');
