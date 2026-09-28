/* icons.js — the icon library: emoji, each with the words a child would type.

   Type to icon: as a title is typed, `suggestIcon` picks the best match ("piano
   practice" → 🎹, "soccer training" → ⚽). The picker searches the same words, so
   "swim", "pool" and "lesson" all find 🏊. Emoji because they are colourful, free,
   need no download, and every phone draws them.

   Matching is on WHOLE words or word starts, never substrings inside a word — a
   "cat" must not match "education". Earlier entries win ties, so the specific
   ones come first within each group. */

import { cat } from './cats.js';

export const LIB = [
  // study & school
  ['📚', 'books study reading read library homework revise revision'],
  ['📖', 'book read reading story novel chapter'],
  ['✏️', 'write writing pencil homework worksheet draft'],
  ['📝', 'notes list todo task essay spelling words test quiz'],
  ['🔢', 'maths math numbers times tables arithmetic sums'],
  ['📐', 'geometry ruler angles shapes measure'],
  ['🧮', 'abacus counting mental maths'],
  ['🦘', 'kangaroo maths contest olympiad'],
  ['🔬', 'science lab experiment microscope biology'],
  ['🧪', 'chemistry experiment science fair'],
  ['🌍', 'geography world earth map countries'],
  ['🗺️', 'map atlas explore trip'],
  ['🏛️', 'history museum'],
  ['🗣️', 'language speaking debate speech hindi french spanish'],
  ['🔤', 'letters alphabet phonics'],
  ['🐝', 'bee spelling bizzing'],
  ['🏫', 'school class classes'],
  ['🎒', 'backpack bag pack school'],
  ['💻', 'computer coding code programming laptop'],
  ['🤖', 'robot robotics lego'],
  ['♟️', 'chess strategy'],
  ['🧩', 'puzzle puzzles jigsaw brain'],
  ['🏆', 'trophy win champion contest competition final bee'],
  ['🥇', 'medal gold first place'],
  ['🎯', 'goal target aim focus'],
  // music & art
  ['🎹', 'piano keyboard keys recital'],
  ['🎻', 'violin viola cello strings'],
  ['🎸', 'guitar ukulele'],
  ['🥁', 'drums drum percussion tabla'],
  ['🎺', 'trumpet brass band'],
  ['🎷', 'saxophone sax jazz'],
  ['🪈', 'flute recorder bansuri'],
  ['🎤', 'sing singing choir voice karaoke'],
  ['🎵', 'music song songs practice'],
  ['🎨', 'art paint painting colour color'],
  ['🖍️', 'draw drawing crayons colouring coloring'],
  ['✂️', 'craft crafts cutting scissors origami'],
  ['📷', 'photo photography camera'],
  ['🎭', 'drama theatre theater acting rehearsal'],
  ['💃', 'dance dancing ballet bharatanatyam kathak hiphop'],
  ['🧶', 'knit knitting sewing'],
  // sport & move
  ['⚽', 'soccer football'],
  ['🏏', 'cricket bat'],
  ['🏀', 'basketball'],
  ['🎾', 'tennis'],
  ['🏸', 'badminton'],
  ['🏓', 'ping pong table tennis'],
  ['🏐', 'volleyball'],
  ['🏈', 'american football'],
  ['⚾', 'baseball softball'],
  ['🏊', 'swim swimming pool lesson'],
  ['🚴', 'bike biking cycling cycle ride'],
  ['🏃', 'run running jog jogging race track'],
  ['🥋', 'karate taekwondo judo martial arts'],
  ['🤸', 'gymnastics gym tumbling cartwheel'],
  ['🧘', 'yoga stretch stretching meditate meditation calm breathe'],
  ['⛸️', 'skating ice skate'],
  ['🛹', 'skateboard skate'],
  ['⛳', 'golf'],
  ['🏒', 'hockey'],
  ['🧗', 'climbing climb bouldering'],
  ['🥾', 'hike hiking walk walking trail'],
  ['🐕', 'dog walk pet puppy'],
  // play & friends
  ['🧸', 'toys play teddy'],
  ['🎲', 'board game games dice'],
  ['🎮', 'video games gaming console switch minecraft'],
  ['🛝', 'playground park slide swing'],
  ['👫', 'friends friend playdate hangout'],
  ['🎉', 'party celebration fun'],
  ['🎂', 'birthday cake'],
  ['🎁', 'gift present card'],
  ['🪁', 'kite outside outdoors'],
  ['🏖️', 'beach sand'],
  ['🌳', 'outside outdoors nature tree garden'],
  ['🧱', 'lego building blocks build'],
  // screens
  ['📺', 'tv television show cartoons watch'],
  ['🎬', 'movie film cinema night'],
  ['📱', 'phone tablet ipad screen'],
  ['🎧', 'podcast audiobook listen headphones'],
  // family & home
  ['🏡', 'home house family'],
  ['🍽️', 'dinner lunch meal eat'],
  ['🥣', 'breakfast cereal'],
  ['🍳', 'cook cooking bake baking kitchen'],
  ['🧹', 'chores tidy clean cleaning sweep'],
  ['🧺', 'laundry clothes'],
  ['🛏️', 'make bed room'],
  ['🗑️', 'trash bins rubbish recycling'],
  ['🪴', 'plants water watering'],
  ['🐟', 'fish feed aquarium'],
  ['🐈', 'cat kitten pet'],
  ['👵', 'grandma nani dadi granny'],
  ['👴', 'grandpa nana dada grandad'],
  ['📞', 'call phone video chat'],
  ['🛒', 'shopping groceries store'],
  ['🚗', 'drive car trip travel'],
  ['✈️', 'flight plane holiday vacation'],
  ['🛕', 'temple mandir puja'],
  ['🕌', 'mosque masjid'],
  ['⛪', 'church'],
  ['🪯', 'gurdwara'],
  ['🪔', 'diwali diya festival india stories'],
  // body & rest
  ['🌙', 'sleep bedtime night lights out'],
  ['😴', 'nap rest tired'],
  ['🛁', 'bath shower wash'],
  ['🪥', 'teeth brush brushing'],
  ['💧', 'water drink hydrate'],
  ['🍎', 'snack fruit healthy'],
  ['🩺', 'doctor checkup'],
  ['🦷', 'dentist'],
  ['💊', 'medicine vitamins'],
  // money & misc
  ['🪙', 'money coins save saving allowance finance'],
  ['💡', 'idea think invent'],
  ['⭐', 'star special'],
  ['❤️', 'love kind kindness help helping'],
  ['🌱', 'grow start new habit'],
  ['🚀', 'rocket launch big'],
  ['⏰', 'alarm wake morning early'],
  ['📅', 'plan planning calendar week huddle'],
];

const tokenise = (s) => String(s).toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
const INDEX = LIB.map(([e, k], i) => ({ e, i, words: tokenise(k) }));

/* Score one entry against the typed words: an exact word is worth 3, a word
   start (≥ 3 letters, so "pia" finds piano) is worth 1. */
function score(entry, words) {
  let s = 0;
  for (const w of words) {
    if (entry.words.includes(w)) s += 3;
    else if (w.length >= 3 && entry.words.some((k) => k.startsWith(w))) s += 1;
  }
  return s;
}

/* Icons for the picker's search box, best first. An empty query returns all. */
export function findIcons(q, limit = LIB.length) {
  const words = tokenise(q);
  if (!words.length) return LIB.map(([e]) => e).slice(0, limit);
  return INDEX.map((x) => ({ e: x.e, i: x.i, s: score(x, words) })).filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s || a.i - b.i).slice(0, limit).map((x) => x.e);
}

/* Words that say WHEN or HOW, not WHAT: "maths homework" is about maths, "piano
   practice" about piano. They still count alone ("Homework" → 📚), just for less. */
const GENERIC = new Set(['homework', 'practice', 'practise', 'study', 'lesson', 'lessons', 'class', 'classes', 'training', 'prep', 'time', 'night', 'club']);

/* The icon a title suggests, or null. Only exact words count here, so a half-typed
   word does not flicker through three wrong icons on its way. */
const memo = new Map();
export function suggestIcon(title) {
  const key = String(title || '').toLowerCase();
  if (memo.has(key)) return memo.get(key);
  const words = tokenise(key);
  let best = null, bestS = 0;
  for (const x of INDEX) {
    const s = x.words.filter((k) => words.includes(k)).reduce((a, k) => a + (GENERIC.has(k) ? 0.5 : 1), 0);
    if (s > bestS) { best = x.e; bestS = s; }
  }
  if (memo.size > 500) memo.clear();
  memo.set(key, best);
  return best;
}

/* What to draw for a routine, task or goal: the chosen icon, else what the title
   suggests, else the kind of time's own emoji. Old records need no migration. */
export const iconOf = (x) => (x && (x.icon || x.emoji || suggestIcon(x.title) || cat(x.cat).emoji)) || '⭐';

/* The picker, as a form field. `data-auto` stays 1 until the child picks by hand;
   while it is 1, typing the title keeps the icon in step. */
export function iconField(name, value, title, catId) {
  const v = value || suggestIcon(title) || cat(catId).emoji;
  return `<div class="iconf" data-auto="${value ? 0 : 1}">
    <input type="hidden" name="${name}" value="${v}">
    <button type="button" class="iconf-b" data-act="iconOpen" aria-label="Choose an icon" title="Choose an icon">${v}</button>
    <div class="iconf-pop" hidden>
      <input class="icon-q" placeholder="Search icons — try “swim”" aria-label="Search icons" autocomplete="off">
      <div class="icon-grid">${LIB.map(([e, k]) => `<button type="button" data-act="iconPick" data-v="${e}" data-k="${k}" title="${k.split(' ')[0]}">${e}</button>`).join('')}</div>
    </div>
  </div>`;
}
