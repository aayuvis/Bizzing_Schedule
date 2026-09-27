/* time.js — dates as local 'YYYY-MM-DD' strings, times as minutes after midnight.
   Weeks start on Monday, and a weekday index is 0 = Mon … 6 = Sun everywhere. */

const pad = (n) => String(n).padStart(2, '0');

export const ymd = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const parseYmd = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
export const addDays = (s, n) => { const d = parseYmd(s); d.setDate(d.getDate() + n); return ymd(d); };
export const dow = (s) => (parseYmd(s).getDay() + 6) % 7;
export const weekStart = (s) => addDays(s, -dow(s));
export const weekDays = (s) => { const w = weekStart(s); return [0, 1, 2, 3, 4, 5, 6].map((i) => addDays(w, i)); };
export const daysBetween = (a, b) => Math.round((parseYmd(b) - parseYmd(a)) / 864e5);

export const DAY_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const DAY_LONG = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const hm = (s) => { const [h, m] = String(s).split(':').map(Number); return h * 60 + (m || 0); };
export const hhmm = (min) => `${pad(Math.floor(min / 60) % 24)}:${pad(min % 60)}`;
export const nowMin = (d = new Date()) => d.getHours() * 60 + d.getMinutes();

export function clock(min) {
  const h = Math.floor(min / 60) % 24, m = min % 60;
  const ap = h < 12 ? 'am' : 'pm';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m ? `${h12}:${pad(m)}${ap}` : `${h12}${ap}`;
}

export function dur(mins) {
  mins = Math.round(mins);
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60), m = mins % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

export function niceDate(s, today = ymd()) {
  const n = daysBetween(today, s);
  if (n === 0) return 'Today';
  if (n === 1) return 'Tomorrow';
  if (n === -1) return 'Yesterday';
  const d = parseYmd(s);
  if (n > 1 && n < 7) return DAY_LONG[dow(s)];
  return `${DAY_SHORT[dow(s)]} ${d.getDate()} ${MONTH[d.getMonth()]}`;
}

export const longDate = (s) => { const d = parseYmd(s); return `${DAY_LONG[dow(s)]}, ${d.getDate()} ${MONTH[d.getMonth()]}`; };
export const shortDate = (s) => { const d = parseYmd(s); return `${d.getDate()} ${MONTH[d.getMonth()]}`; };

/* Part of the day, for the painted sky and the greeting. */
export function partOfDay(min) {
  if (min < 5 * 60 || min >= 20 * 60 + 30) return 'night';
  if (min < 11 * 60) return 'morning';
  if (min < 17 * 60) return 'day';
  return 'evening';
}
