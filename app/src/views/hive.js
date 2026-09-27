/* Hive — the week as a honeycomb, the balance of a life, and the medals.
   Everything positive is loud here; nothing negative is shown at all. A skipped
   block is simply a cell without honey. */

import { weekDays, DAY_SHORT, dur, shortDate, addDays, weekStart } from '../time.js';
import { CATS, APPS, cat } from '../cats.js';
import { blocksFor, status, weekStats, history } from '../model.js';
import { badgeStates } from '../badges.js';
import { esc, ring, donut, hexPath, pct, plural, icon } from '../ui.js';

export function hive(c) {
  const { h, kid, today: t, now } = c;
  const w = weekStats(h, kid, t, t, now);
  const last = weekStats(h, kid, addDays(t, -7), t, now);
  const hist = history(h, kid, 12, t, now);
  const bs = badgeStates(h, kid, t, now);
  const earned = bs.filter((b) => b.earned);
  const kept = { ...w.mins.kept }; delete kept.school; delete kept.rest;
  const keptTotal = Object.values(kept).reduce((a, b) => a + b, 0);
  const focus = kid.focus.filter((f) => weekDays(t).includes(f.d)).reduce((a, f) => a + f.mins, 0);

  return `
  <div class="view-h"><div><h1>My Hive</h1><p class="muted">Every plan you keep fills a cell with honey.</p></div></div>

  <div class="card comb-card">
    <div class="card-h"><h2>This week's comb</h2></div>
    <div class="comb-grid">${comb(c, w)}${jar(c, w)}</div>
  </div>

  <div class="stat-row">
    <div class="stat">${ring(w.pct ?? 0, 64, 8, 'var(--honey)', pct(w.pct))}<div><b>Rhythm</b><small>${w.pct != null && last.pct != null ? (w.pct >= last.pct ? `▲ up from ${pct(last.pct)} last week` : `last week ${pct(last.pct)}`) : 'plans kept this week'}</small></div></div>
    <div class="stat"><span class="big-n">${w.good}</span><div><b>Strong days</b><small>days with 8 in 10 kept</small></div></div>
    <div class="stat"><span class="big-n">${dur(w.mins.kept.bizzing)}</span><div><b>Bizzing time</b><small>${Object.entries(w.mins.apps).map(([a, m]) => `${APPS[a].emoji} ${dur(m)}`).join(' · ') || 'counted by the apps'}</small></div></div>
    <div class="stat"><span class="big-n">${dur(focus)}</span><div><b>Focus</b><small>sprint minutes this week</small></div></div>
  </div>

  <div class="hive-grid">
    <div class="card">
      <div class="card-h"><h2>Balance this week</h2><span class="muted small">kept time, not counting school & sleep</span></div>
      <div class="balance">
        <div class="bal-d">${donut(kept, 150, 22)}<div class="bal-c"><b>${dur(keptTotal)}</b><small>kept</small></div></div>
        <ul class="bal-l">${Object.keys(CATS).filter((id) => id !== 'school' && id !== 'rest' && (w.mins.kept[id] || w.mins.planned[id])).map((id) => {
          const k = w.mins.kept[id] || 0, p = w.mins.planned[id] || 0, x = CATS[id];
          const over = id === 'screen' && p && k > p * 1.1;
          return `<li><span class="dot" style="background:${x.color}"></span><span class="bl-n">${x.emoji} ${x.name}</span>
            <span class="bl-bar"><i style="width:${Math.min(100, Math.round(k / Math.max(p, k, 1) * 100))}%;background:${x.color}"></i>${p ? `<em style="left:${Math.min(100, Math.round(p / Math.max(p, k, 1) * 100))}%"></em>` : ''}</span>
            <span class="bl-v ${over ? 'over' : ''}">${dur(k)}${p ? `<small>/${dur(p)}</small>` : ''}</span></li>`;
        }).join('')}</ul>
      </div>
    </div>

    <div class="card">
      <div class="card-h"><h2>12 weeks of honey</h2><span class="muted small">darker = more plans kept</span></div>
      <div class="heat" role="img" aria-label="Twelve weeks of kept plans">
        <div class="heat-days">${DAY_SHORT.map((d) => `<span>${d[0]}</span>`).join('')}</div>
        ${hist.map((row) => `<div class="heat-col">${row.map((x) => `<i class="${x.future ? 'fut' : x.pct == null ? 'none' : ''}" style="--a:${x.pct == null ? 0 : (0.15 + 0.85 * x.pct).toFixed(2)}" title="${x.d}${x.pct != null ? ` · ${pct(x.pct)} kept` : ''}"></i>`).join('')}</div>`).join('')}
      </div>
      <p class="muted small">No streaks here, on purpose. A day off costs nothing.</p>
    </div>
  </div>

  <div class="card">
    <div class="card-h"><h2>Medals</h2><span class="muted small">${earned.length} of ${bs.length} earned · every one from real effort</span></div>
    <div class="badges">${bs.map((b) => `<div class="badge ${b.earned ? 'on' : ''}" title="${esc(b.desc)}">
      <img src="./art/${b.art}.webp" alt="" loading="lazy"><b>${esc(b.name)}</b>
      ${b.earned ? `<small>earned ${shortDate(b.earned)}</small>` : `<div class="bar thin"><i style="width:${Math.round(b.have / b.need * 100)}%"></i></div><small>${b.have}/${b.need} · ${esc(b.desc)}</small>`}</div>`).join('')}</div>
  </div>

  ${kid.kudos.length ? `<div class="card">
    <div class="card-h"><h2>Kudos wall</h2><span class="muted small">from your family</span></div>
    <div class="kudos-wall">${kid.kudos.slice(0, 12).map((k, i) => `<figure class="note n${i % 4}"><span class="stk">${esc(k.sticker)}</span><blockquote>${esc(k.text)}</blockquote><figcaption>— ${esc(k.from)} · ${shortDate(k.at)}</figcaption></figure>`).join('')}</div>
  </div>` : ''}`;
}

function jar(c, w) {
  const { h, kid, today: t, now } = c;
  /* the SAME cells the comb draws: every non-school block this week */
  let total = 0, full = 0, due = 0;
  for (const d of w.days) for (const b of blocksFor(kid, d)) {
    if (b.r.cat === 'school') continue;
    const s = status(h, kid, b, d, t, now).s;
    total++;
    if (s === 'done') full++; else if (s === 'part') full += 0.5;
    if (s !== 'later' && s !== 'now') due++;
  }
  full = Math.round(full);
  const lvl = total ? Math.min(1, full / total) : 0, top = 30 + 92 * (1 - lvl);
  return `<aside class="comb-side">
    <svg viewBox="0 0 120 140" class="jar" aria-hidden="true">
      <defs><clipPath id="jarc"><path d="M22 34 Q14 40 14 58 V116 Q14 132 32 132 H88 Q106 132 106 116 V58 Q106 40 98 34 Z"/></clipPath>
        <linearGradient id="hon" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#FFC94A"/><stop offset="1" stop-color="#E08A00"/></linearGradient></defs>
      <g clip-path="url(#jarc)"><rect x="0" y="0" width="120" height="140" fill="#FFF8E6"/>
        <path d="M0 ${top} Q30 ${top - 6} 60 ${top} T120 ${top} V140 H0 Z" fill="url(#hon)"/></g>
      <path d="M22 34 Q14 40 14 58 V116 Q14 132 32 132 H88 Q106 132 106 116 V58 Q106 40 98 34 Z" fill="none" stroke="#C98A1B" stroke-width="3"/>
      <rect x="24" y="14" width="72" height="20" rx="6" fill="#8B5A2B"/><rect x="18" y="26" width="84" height="10" rx="5" fill="#A26A34"/>
      <path d="M40 70 h40 M40 80 h28" stroke="rgba(255,255,255,.55)" stroke-width="5" stroke-linecap="round"/>
    </svg>
    <div class="jar-n"><b>${full}</b><span>of ${total} cells</span></div>
    <p class="muted small">${total - due > 0 ? `${plural(total - due, 'plan')} still to come this week.` : 'The week is done.'}</p>
    <ul class="comb-key"><li><i class="k-full"></i>kept</li><li><i class="k-half"></i>partly</li><li><i class="k-empty"></i>not this time</li><li><i class="k-fut"></i>coming up</li></ul>
  </aside>`;
}

function comb(c, w) {
  const { h, kid, today: t, now } = c;
  const R = 13, DX = R * Math.sqrt(3), DY = R * 1.5;
  const rows = w.days.map((d, i) => {
    const bl = blocksFor(kid, d).filter((b) => b.r.cat !== 'school');
    return { d, i, cells: bl.map((b) => ({ b, s: status(h, kid, b, d, t, now).s })) };
  });
  const maxN = Math.max(8, ...rows.map((r) => r.cells.length));
  const W = 58 + maxN * DX + DX / 2 + 8, H = rows.length * DY * 1.35 + 20;
  const out = rows.map((r) => {
    const y = 20 + r.i * DY * 1.35;
    return `<text x="0" y="${y + 4}" class="comb-l${r.d === t ? ' today' : ''}">${DAY_SHORT[r.i]}</text>` + r.cells.map((x, j) => {
      const cx = 58 + j * DX + (r.i % 2 ? DX / 2 : 0), k = CATS[x.b.r.cat];
      const fill = x.s === 'done' ? k.color : x.s === 'part' ? k.soft : 'transparent';
      const cls = x.s === 'done' ? 'full' : x.s === 'part' ? 'half' : x.s === 'later' || x.s === 'now' ? 'fut' : 'empty';
      return `<path class="cell ${cls}" d="${hexPath(cx, y, R - 1)}" fill="${fill}" stroke="${x.s === 'done' || x.s === 'part' ? k.color : 'var(--line-2)'}"><title>${esc(x.b.r.title)} · ${x.s}</title></path>`;
    }).join('');
  }).join('');
  return `<div class="comb-wrap"><svg class="comb" viewBox="0 0 ${W.toFixed(0)} ${H.toFixed(0)}" role="img" aria-label="This week's plans as honeycomb cells">${out}</svg></div>`;
}
