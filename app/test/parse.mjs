/* parse.mjs — quick-add understands the way people say plans. */
import { parse } from '../src/parse.js';
let fail = 0;
const T = '2026-09-23'; // a Wednesday
const eq = (name, got, want) => {
  const g = JSON.stringify(got), w = JSON.stringify(want);
  if (g !== w) { fail++; console.log(`✗ ${name}\n    got  ${g}\n    want ${w}`); }
};
const P = (s) => { const p = parse(s, T); return { kind: p.kind, title: p.title, days: p.days, date: p.date, start: p.start, dur: p.dur, cat: p.cat, pri: p.pri }; };

eq('routine with two days', P('piano mon wed 5pm 30m'), { kind: 'routine', title: 'Piano', days: [0, 2], date: null, start: 1020, dur: 30, cat: 'create', pri: 'normal' });
eq('every day', P('spelling practice every day 7pm 20m').days, [0, 1, 2, 3, 4, 5, 6]);
eq('every day title', P('spelling practice every day 7pm 20m').title, 'Spelling practice');
eq('1h30', P('soccer sat 10am 1h30').dur, 90);
eq('1h 30m', P('soccer sat 10am 1h 30m').dur, 90);
eq('1.5h', P('swimming sun 9am 1.5h').dur, 90);
eq('single weekday with time is weekly', P('soccer sat 10am 1h30').kind, 'routine');
eq('weekdays', P('homework weekdays 4:30pm 45m').days, [0, 1, 2, 3, 4]);
eq('24h time', P('reading daily 20:15 20m').start, 20 * 60 + 15);
eq('task tomorrow', P('maths homework tomorrow'), { kind: 'task', title: 'Maths homework', days: [], date: '2026-09-24', start: null, dur: null, cat: 'study', pri: 'normal' });
eq('task on named day → next such day', P('science project fri !').date, '2026-09-25');
eq('high priority', P('science project fri !').pri, 'high');
eq('today counts as next wednesday', P('library books wed').date, '2026-09-23');
eq('one-off appointment', P('dentist thu 4:15pm 45m'), { kind: 'event', title: 'Dentist', days: [], date: '2026-09-24', start: 16 * 60 + 15, dur: 45, cat: 'play', pri: 'normal' });
eq('event today default duration', P('call nani today 6pm').dur, 30);
eq('event today', P('call nani today 6pm').kind, 'event');
eq('plain task keeps title', P('tidy my desk'), { kind: 'task', title: 'Tidy my desk', days: [], date: null, start: null, dur: null, cat: 'family', pri: 'normal' });
eq('numbers in a title survive', P('read 20 pages').title, 'Read 20 pages');
eq('at 5 means afternoon', P('tennis tue at 5 1h').start, 17 * 60);
eq('tv is screens', P('tv fri 7pm 30m').cat, 'screen');
eq('bizzing app', P('bizzing bee weekdays 5pm 20m').cat, 'bizzing');
eq('weekends', P('movie night weekends 6pm 90m').days, [5, 6]);
eq('mon & wed', P('karate mon & wed 6pm 45m').days, [0, 2]);
if (fail) { console.log(`parse: ${fail} FAILED`); process.exit(1); }
console.log('parse: all passed');
