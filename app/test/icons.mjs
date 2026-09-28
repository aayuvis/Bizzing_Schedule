/* icons.mjs — type to icon picks what a child would expect, and never a substring. */
import { suggestIcon, findIcons, iconOf, LIB } from '../src/icons.js';
let fail = 0;
const eq = (name, got, want) => { if (got !== want) { fail++; console.log(`✗ ${name}: got ${got}, want ${want}`); } };
const cases = [['Piano practice', '🎹'], ['Soccer training', '⚽'], ['Spelling on Bizzing Bee', '🐝'], ['Swimming lesson', '🏊'],
  ['Homework', '📚'], ['TV time', '📺'], ['Movie night', '🎬'], ['Free play', '🧸'], ['Lights out', '🌙'], ['Maths homework', '🔢'],
  ['Kangaroo prep on Bizzing Maths', '🦘'], ['Stories on Bizzing India', '🪔'], ['Feed the fish', '🐟'], ['Science fair poster', '🧪'],
  ['Karate', '🥋'], ['Call Nani', '👵'], ['Dentist', '🦷'], ['Tidy desk', '🧹'], ['Birthday card for Nani', '🎂']];
for (const [t, e] of cases) eq(`suggest "${t}"`, suggestIcon(t), e);
eq('nothing for gibberish', suggestIcon('zzqx'), null);
eq('no substring matches ("cat" inside "education")', suggestIcon('education'), null);
eq('search by word start', findIcons('pia')[0], '🎹');
eq('search by synonym', findIcons('pool')[0], '🏊');
eq('empty search returns the whole library', findIcons('').length, LIB.length);
eq('a chosen icon wins', iconOf({ title: 'Piano', icon: '🚀', cat: 'create' }), '🚀');
eq('goals keep their emoji', iconOf({ title: 'x', emoji: '🏆', cat: 'study' }), '🏆');
eq('falls back to the kind of time', iconOf({ title: 'zzqx', cat: 'move' }), '⚽');
eq('library has no duplicate icons', new Set(LIB.map(([e]) => e)).size, LIB.length);
if (fail) { console.log(`icons: ${fail} FAILED`); process.exit(1); }
console.log(`icons: all ${cases.length + 9} passed`);
