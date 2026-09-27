/* parse.js — quick-add in plain words. The fastest way to plan is to type the
   way you'd say it:

     piano mon wed 5pm 30m          → a routine, Mon + Wed, 5:00pm, 30 min
     spelling practice every day 7pm 20m
     soccer sat 10am 1h30
     math homework tomorrow         → a task due tomorrow
     science project fri !          → a task due Friday, high priority
     dentist thu 4:15pm 45m         → a one-off on the coming Thursday

   A time + days is a routine; a time + one date is a one-off; no time is a task.
   Anything not understood stays in the title, so nothing typed is ever lost. */

import { ymd, addDays, dow } from './time.js';
import { guessCat } from './cats.js';

const DAYS = { mon: 0, monday: 0, tue: 1, tues: 1, tuesday: 1, wed: 2, weds: 2, wednesday: 2, thu: 3, thur: 3, thurs: 3, thursday: 3,
               fri: 4, friday: 4, sat: 5, saturday: 5, sun: 6, sunday: 6 };

export function parse(text, today = ymd()) {
  let s = ' ' + text.trim().replace(/\s+/g, ' ') + ' ';
  const take = (re) => { const m = s.match(re); if (m) s = s.replace(m[0], ' '); return m; };
  const out = { title: '', cat: null, days: [], date: null, start: null, dur: null, pri: 'normal', kind: 'task' };

  if (take(/\s!+\s/) || take(/\s(urgent|important)\s/i)) out.pri = 'high';

  // duration: 1h30, 1h 30m, 1.5h, 90m, 45 min
  let m = take(/\s(\d+(?:\.\d+)?)\s?(?:h|hr|hrs|hour|hours)\s?(?:(\d{1,2})\s?(?:m|min|mins|minutes)?)?(?=\s)/i);
  if (m) out.dur = Math.round(parseFloat(m[1]) * 60) + (m[2] ? +m[2] : 0);
  else if ((m = take(/\s(\d{1,3})\s?(?:m|min|mins|minutes)(?=\s)/i))) out.dur = +m[1];

  // time: 5pm, 5:30pm, 17:30, "at 5"
  if ((m = take(/\s(?:at\s)?(\d{1,2})(?::(\d{2}))?\s?(am|pm)(?=\s)/i))) {
    let h = +m[1] % 12; if (m[3].toLowerCase() === 'pm') h += 12;
    out.start = h * 60 + (m[2] ? +m[2] : 0);
  } else if ((m = take(/\s(?:at\s)?([01]?\d|2[0-3]):([0-5]\d)(?=\s)/))) {
    out.start = +m[1] * 60 + +m[2];
  } else if ((m = take(/\sat\s(\d{1,2})(?=\s)/i))) {
    const h = +m[1]; out.start = (h >= 1 && h <= 7 ? h + 12 : h) * 60;
  }

  // days
  if (take(/\s(every ?day|daily|each day)(?=\s)/i)) out.days = [0, 1, 2, 3, 4, 5, 6];
  else if (take(/\s(weekdays|school days|mon(?:day)?\s?-\s?fri(?:day)?)(?=\s)/i)) out.days = [0, 1, 2, 3, 4];
  else if (take(/\s(weekends?)(?=\s)/i)) out.days = [5, 6];
  const every = !!take(/\s(every|each)(?=\s)/i);
  let d;
  while ((d = s.match(/\s(mon(?:day)?|tue(?:s(?:day)?)?|tuesday|wed(?:s|nesday)?|thu(?:r(?:s(?:day)?)?)?|thursday|fri(?:day)?|sat(?:urday)?|sun(?:day)?)s?(?=[\s,&])/i))) {
    const i = DAYS[d[1].toLowerCase()];
    if (i != null && !out.days.includes(i)) out.days.push(i);
    s = s.replace(d[0], ' ');
  }
  s = s.replace(/\s(and|&|,)(?=\s)/gi, ' ');
  if (take(/\s(today|tonight)(?=\s)/i)) out.date = today;
  else if (take(/\s(tomorrow|tmrw|tmr)(?=\s)/i)) out.date = addDays(today, 1);

  // one named day with no "every": the NEXT such day (today counts)
  if (out.days.length === 1 && !every && out.start == null) {
    out.date = nextDay(today, out.days[0]); out.days = [];
  } else if (out.days.length === 1 && !every && out.start != null && /\b(dentist|doctor|party|appointment|match|recital|exam|test|trip|visit)\b/i.test(text)) {
    out.date = nextDay(today, out.days[0]); out.days = [];
  }

  out.title = s.replace(/\s+/g, ' ').trim().replace(/^(to |a |an )/i, '');
  out.title = out.title ? out.title[0].toUpperCase() + out.title.slice(1) : '';
  out.cat = guessCat(text);

  if (out.start != null && out.days.length) out.kind = 'routine';
  else if (out.start != null) { out.kind = 'event'; out.date = out.date || today; }
  else out.kind = 'task';
  if (out.kind !== 'task' && !out.dur) out.dur = 30;
  return out;
}

export function nextDay(today, i) {
  const n = (i - dow(today) + 7) % 7;
  return addDays(today, n);
}
