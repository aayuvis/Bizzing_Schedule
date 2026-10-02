/* cats.js — the nine kinds of time in a child's week. One colour each, used the
   same way on every surface (a block, a card, a lozenge, a slice of the balance
   ring), so a child learns the colour once and reads every screen by it. */

export const CATS = {
  school:  { name: 'School',          emoji: '🏫', color: '#3B82F6', soft: '#DBEAFE' },
  study:   { name: 'Study',           emoji: '📚', color: '#6366F1', soft: '#E0E7FF' },
  bizzing: { name: 'Bizzing apps',    emoji: '🐝', color: '#E8A10C', soft: '#FEF3C7' },
  move:    { name: 'Sport & move',    emoji: '⚽', color: '#16A34A', soft: '#DCFCE7' },
  create:  { name: 'Music & art',     emoji: '🎹', color: '#A855F7', soft: '#F3E8FF' },
  play:    { name: 'Play & friends',  emoji: '🧩', color: '#EC4899', soft: '#FCE7F3' },
  screen:  { name: 'TV & screens',    emoji: '📺', color: '#0D9488', soft: '#CCFBF1' },
  family:  { name: 'Family & chores', emoji: '🏡', color: '#EA580C', soft: '#FFEDD5' },
  rest:    { name: 'Rest & sleep',    emoji: '🌙', color: '#475569', soft: '#E2E8F0' },
};
export const CAT_IDS = Object.keys(CATS);
export const cat = (id) => CATS[id] || CATS.play;

/* The Bizzing family. Time in these is REPORTED BY THE APP, never typed. */
export const APPS = {
  bee:     { name: 'Bizzing Bee',     emoji: '🐝', what: 'spelling' },
  maths:   { name: 'Bizzing Maths',   emoji: '🔢', what: 'maths' },
  india:   { name: 'Bizzing India',   emoji: '🪔', what: 'stories & Hindi' },
  geography: { name: 'Bizzing Geography', emoji: '🌍', what: 'maps & the world' },
  finance: { name: 'Bizzing Finance', emoji: '🪙', what: 'money' },
  english: { name: 'Bizzing English', emoji: '🦊', what: 'reading, writing & speaking' },
};

/* Keyword → category, for quick-add. Order matters: first hit wins. */
export const KEYWORDS = [
  ['bizzing', /\b(bizzing|spelling bee app|bee app)\b/],
  ['school', /\b(school|class(es)?|tuition|kumon|lesson)\b/],
  ['study', /\b(home ?work|study|revise|revision|read(ing)?|book|essay|project|math(s)?|science|spelling|worksheet|test prep|olympiad|kangaroo)\b/],
  ['move', /\b(soccer|football|cricket|swim(ming)?|tennis|basketball|karate|taekwondo|dance|gym(nastics)?|run(ning)?|bike|cycling|yoga|sport|practice match|skating|badminton)\b/],
  ['create', /\b(piano|violin|guitar|music|sing(ing)?|draw(ing)?|paint(ing)?|art|craft|lego build|coding|robotics|chess)\b/],
  ['play', /\b(play|playdate|friends?|park|games?|hang ?out|party)\b/],
  ['screen', /\b(tv|show|movie|film|youtube|video games?|screen|tablet|switch|minecraft)\b/],
  ['family', /\b(family|dinner|lunch|breakfast|chores?|tidy|clean|laundry|grandma|grandpa|nani|dadi|temple|gurdwara|church|mosque|visit)\b/],
  ['rest', /\b(sleep|bed ?time|nap|rest|wind ?down|shower|bath)\b/],
];

export function guessCat(text) {
  const t = text.toLowerCase();
  for (const [id, re] of KEYWORDS) if (re.test(t)) return id;
  return 'play';
}
