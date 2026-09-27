/* Week — the plan as a picture. Seven columns, one colour per kind of time,
   clashes outlined, and the number grown-ups most need: free time after school. */

import { weekDays, DAY_SHORT, shortDate, clock, dur, weekStart, dow } from '../time.js';
import { cat } from '../cats.js';
import { blocksFor, status, dayScore, breathingRoom, clashes } from '../model.js';
import { esc, icon } from '../ui.js';

const FROM = 7 * 60, TO = 22 * 60, PX = 0.9;   // px per minute

export function week(c) {
  const { h, kid, today: t, now, S } = c;
  const days = weekDays(S.weekOf);
  const isThis = weekStart(S.weekOf) === weekStart(t);
  const hours = []; for (let m = FROM; m < TO; m += 60) hours.push(m);
  const nowTop = (now - FROM) * PX;

  return `
  <div class="view-h">
    <div><h1>Week</h1><p class="muted">${shortDate(days[0])} – ${shortDate(days[6])} · tap an empty space to plan, tap a block to change it</p></div>
    <div class="vh-r">
      <div class="seg"><button data-act="weekNav" data-d="-7" aria-label="Previous week">${icon('left')}</button>
        <button class="${isThis ? 'on' : ''}" data-act="weekNav" data-d="0">This week</button>
        <button data-act="weekNav" data-d="7" aria-label="Next week">${icon('right')}</button></div>
      <button class="btn" data-act="huddle">🪺 Sunday huddle</button>
    </div>
  </div>
  <div class="wk-wrap"><div class="wk" style="--h:${(TO - FROM) * PX}px">
    <div class="wk-rail"><div class="wk-dh"></div>${hours.map((m) => `<div class="wk-hr" style="top:${(m - FROM) * PX}px">${clock(m)}</div>`).join('')}</div>
    ${days.map((d) => {
      const bl = blocksFor(kid, d);
      const cl = new Set(clashes(kid, d).flat());
      const sc = d <= t ? dayScore(h, kid, d, t, now) : null;
      const room = breathingRoom(kid, d);
      return `<div class="wk-day ${d === t ? 'is-today' : ''}">
        <div class="wk-dh">
          <b>${DAY_SHORT[dow(d)]}</b><span>${shortDate(d).split(' ')[0]}</span>
          ${sc && sc.planned ? `<i class="wk-sc" style="--p:${Math.round(sc.pct * 100)}%" title="${Math.round(sc.pct * 100)}% kept"></i>` : '<i class="wk-sc none"></i>'}
          <small class="room ${room < 30 ? 'tight' : ''}" title="Free time after school">🌿 ${dur(room)}</small>
        </div>
        <div class="wk-col" data-act="weekSlot" data-date="${d}">
          ${hours.map((m) => `<div class="wk-line" style="top:${(m - FROM) * PX}px"></div>`).join('')}
          ${bl.map((b) => {
            const top = Math.max(0, (b.start - FROM) * PX), bottom = Math.min((TO - FROM) * PX, (b.start + b.dur - FROM) * PX);
            if (bottom <= 0 || top >= (TO - FROM) * PX) return '';
            const st = status(h, kid, b, d, t, now).s, x = cat(b.r.cat);
            return `<button class="wb st-${st} ${cl.has(b.r.id) ? 'clash' : ''} ${bottom - top < 30 ? 'tiny' : ''}" style="top:${top}px;height:${Math.max(18, bottom - top - 2)}px;--c:${x.color};--s:${x.soft}"
              data-act="editRoutine" data-id="${b.r.id}" data-date="${d}" title="${esc(b.r.title)} · ${clock(b.start)}–${clock(b.start + b.dur)}${cl.has(b.r.id) ? ' · clashes with another block' : ''}">
              <b>${x.emoji} ${esc(b.r.title)}</b><small>${clock(b.start)} · ${dur(b.dur)}</small>${b.r.anchor ? icon('lock', 'wb-lock') : ''}</button>`;
          }).join('')}
          ${d === t && now > FROM && now < TO ? `<div class="wk-now" style="top:${nowTop}px"></div>` : ''}
        </div>
      </div>`;
    }).join('')}
  </div></div>
  <p class="legend muted small"><span class="lg st-done"></span> kept <span class="lg st-part"></span> partly <span class="lg st-open"></span> not checked in <span class="lg st-later"></span> coming up <span class="lg clash"></span> clash · 🌿 = free time between school and bedtime</p>`;
}

export const weekSlotTime = (offsetY) => {
  const m = FROM + offsetY / PX;
  return Math.max(FROM, Math.min(TO - 30, Math.round(m / 15) * 15));
};
