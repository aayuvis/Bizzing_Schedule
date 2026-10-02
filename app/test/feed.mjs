/* feed.mjs — the family feed keeps its three promises: built from what is held, ranked by
   learning, and it ends. Each check was watched failing by breaking the engine once. */
const F = await import('../../integration/bizzing-feed.js');
let fail = 0; const ok = (n, c, x = '') => { if (!c) { fail++; console.log('✗', n, x); } };
const T = Date.UTC(2026, 9, 2, 12), today = Math.floor(T / 864e5);
const kinds = ['story', 'fact', 'tip', 'game'];
const items = [];
for (let i = 0; i < 400; i++) items.push({ id: 'c' + i, kind: i % 9 === 0 ? 'play' : kinds[i % 4], bands: [i % 3 === 0 ? '11-14' : '8-10'],
  topics: ['t' + (i % 25)], key: i % 50 === 0 ? 'w' + i : undefined, play: i % 9 === 0 ? { q: 'q', opts: ['a', 'b', 'c'] } : undefined, title: 'T' + i });
const run = (o = {}) => F.feedFor({ items, band: '8-10', now: T, ...o });
const base = run();
ok('a session is twenty cards and no more', base.length === 20);
ok('never above the band', base.every((x) => items.find((i) => i.id === x.id).bands.includes('8-10')));
ok('never three of a kind in a row', base.every((x, i) => i < 2 || !(base[i - 1].kind === x.kind && base[i - 2].kind === x.kind)));
ok('at most five questions', base.filter((x) => items.find((i) => i.id === x.id).play).length <= 5);
ok('every card says why it is there', base.every((x) => typeof x.why === 'string' && x.why.length > 3));
const lop = [...Array(30)].map((_, i) => ({ id: 's' + i, kind: 'story', bands: ['8-10'], topics: ['hot'], title: 'S' })).concat([...Array(6)].map((_, i) => ({ id: 'f' + i, kind: 'fact', bands: ['8-10'], topics: [], title: 'F' })));
const lopsided = F.feedFor({ items: lop, band: '8-10', now: T, signals: [{ topic: 'hot', w: 30, why: 'Because' }], maxKind: 99, maxWhy: 99 });
ok('even when one kind dominates, never three in a row', lopsided.every((x, i) => i < 2 || !(lopsided[i - 1].kind === x.kind && lopsided[i - 2].kind === x.kind)), lopsided.map((x) => x.kind[0]).join(''));
const qs = [...Array(30)].map((_, i) => ({ id: 'p' + i, kind: i % 2 ? 'quiz' : 'pick', bands: ['8-10'], topics: ['hot'], play: { q: 'q', opts: ['a', 'b'] }, title: 'P' })).concat([...Array(30)].map((_, i) => ({ id: 'n' + i, kind: 'fact', bands: ['8-10'], topics: [], title: 'N' })));
ok('even when questions dominate, at most five a session', F.feedFor({ items: qs, band: '8-10', now: T, signals: [{ topic: 'hot', w: 30, why: 'B' }], maxKind: 99, maxWhy: 99 }).filter((x) => x.id[0] === 'p').length <= 5);
const ctx = run({ signals: [{ topic: 't7', w: 8, why: 'Because you read T7' }] });
ok('what the child did moves its cards up, and says so', ctx.slice(0, 4).some((x) => x.why === 'Because you read T7'));
ok('one reason never leads more than six cards', ctx.filter((x) => x.why === 'Because you read T7').length <= 6);
const due = run({ due: { w100: 'A word that slipped on Tuesday — its gap is over' } });
ok('a slipped word comes back, first, with its reason', due[0].why.startsWith('A word that slipped'));
const seen = {}; base.forEach((x) => { seen[x.id] = today; });
const again = run({ seen });
ok('what was seen today is not shown again today', again.every((x) => !seen[x.id]));
ok('locked cards never appear', run({ unlocked: (it) => it.kind !== 'game' }).every((x) => x.kind !== 'game'));
ok('a done thing never comes back as news', run({ skip: (it) => it.kind === 'story' }).every((x) => x.kind !== 'story'));
const ord = Array.from({ length: 300 }, (_, i) => F.order('q' + i, 4).indexOf(0));
const slots = [0, 1, 2, 3].map((s) => ord.filter((v) => v === s).length);
ok('the right option is spread across slots, not written first', slots.every((n) => n > 45), JSON.stringify(slots));
ok('the order is the same every time', F.order('q9', 4).join() === F.order('q9', 4).join());
const html = F.feedCard({ id: 'x', kind: 'play', title: 'Q', play: { q: 'Which?', opts: ['right', 'w1', 'w2'] } }, { why: 'Because' }, {});
ok('a card renders its question with every option', (html.match(/data-bzf="ans"/g) || []).length === 3);
ok('a wrong answer holds and names the right one', /Not this time — it is “right”/.test(F.feedCard({ id: 'x', kind: 'play', title: 'Q', play: { q: '?', opts: ['right', 'w'] } }, {}, { st: 'wrong', o: 1 })));
ok('the feed ends with a finished card that loads nothing more', /That’s today’s feed/.test(F.feedEnd({ href: '#/continue' })) && !/load more|see more/i.test(F.feedEnd({})));
// level and progress: 1,200 cards over 10 levels; a child on level 4
const lv = [];
for (let i = 0; i < 1200; i++) lv.push({ id: 'L' + i, kind: kinds[Math.floor(i / 10) % 4], bands: ['8-10'], level: 1 + (i % 10), topics: ['x' + (i % 40)], key: i === 11 ? 'slip' : undefined, title: 'L' + i });
const L4 = F.feedFor({ items: lv, band: '8-10', now: T, level: 4, levelName: (n) => 'Level ' + n, due: { slip: 'A word that slipped — its gap is over' } });
const lvOf = (x) => lv.find((i) => i.id === x.id).level;
ok('nothing beyond the next level ever appears', L4.every((x) => lvOf(x) <= 5));
ok('most of the session is at the child\'s level (≥ 60%)', L4.filter((x) => lvOf(x) === 4).length >= 12, L4.map(lvOf).join(','));
ok('at most two peeks at the next level, labelled', L4.filter((x) => lvOf(x) === 5).length <= 2 && L4.filter((x) => lvOf(x) === 5).every((x) => x.why === 'Coming up on Level 5'));
ok('review is at most a quarter', L4.filter((x) => lvOf(x) < 4).length <= 5);
ok('what slipped from an earlier level comes back first', L4[0].id === 'L11' && L4[0].tier === 'review');
const L8 = F.feedFor({ items: lv, band: '8-10', now: T, level: 8 });
ok('a child who climbs gets a different feed (only shared review cards overlap)', L8.filter((x) => L4.some((y) => y.id === x.id)).every((x) => x.tier === 'review') && L8.filter((x) => x.tier === 'now').every((x) => lvOf(x) === 8));
// lopsided: few cards at the child's level, many far above and many below — the caps must hold
const thin = [...Array(4)].map((_, i) => ({ id: 'n' + i, kind: kinds[i], bands: ['8-10'], level: 4, title: 'n' }))
  .concat([...Array(60)].map((_, i) => ({ id: 'hi' + i, kind: kinds[i % 4], bands: ['8-10'], level: 9, topics: ['hot'], title: 'h' })))
  .concat([...Array(60)].map((_, i) => ({ id: 'lo' + i, kind: kinds[i % 4], bands: ['8-10'], level: 1, topics: ['hot'], title: 'l' })))
  .concat([...Array(60)].map((_, i) => ({ id: 'nx' + i, kind: kinds[i % 4], bands: ['8-10'], level: 5, topics: ['hot'], title: 'x' })));
const TH = F.feedFor({ items: thin, band: '8-10', now: T, level: 4, signals: [{ topic: 'hot', w: 30, why: 'B' }], maxKind: 99, maxWhy: 99 });
ok('even when far-ahead cards are hot, none beyond the next level', TH.every((x) => !x.id.startsWith('hi')));
ok('even when review is hot, at most a quarter is review', TH.filter((x) => x.id.startsWith('lo')).length <= 5, TH.map((x) => x.id.replace(/\d+/, '')).join(','));
ok('even when the next level is hot, at most two peeks', TH.filter((x) => x.id.startsWith('nx')).length <= 2);
if (fail) { console.log(`feed: ${fail} FAILED`); process.exit(1); }
console.log('feed: all 27 passed');
