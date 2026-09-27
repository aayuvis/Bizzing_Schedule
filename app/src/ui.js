/* ui.js — small pure helpers that turn values into markup. No state here. */

import { cat, CATS } from './cats.js';

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const pct = (x) => (x == null ? '—' : `${Math.round(x * 100)}%`);
export const plural = (n, one, many = one + 's') => `${n} ${n === 1 ? one : many}`;

export const avatar = (id, cls = '') => `<img class="av ${cls}" src="./avatars/${esc(id)}.png" alt="" draggable="false">`;
export const AVATARS = ['bizzy', 'melody', 'rocket', 'koi', 'panda', 'redpanda', 'snowfox', 'pengu', 'ottie', 'capy', 'neko', 'froggy', 'robo', 'astro', 'comet', 'pixel', 'samurai', 'scopey', 'beaker', 'goldlegend', 'aryabhatta'];

export function lozenge(c, label) {
  const x = cat(c);
  return `<span class="loz" style="--c:${x.color};--s:${x.soft}">${x.emoji} ${esc(label ?? x.name)}</span>`;
}

/* A progress ring. v in 0..1. */
export function ring(v, size = 56, stroke = 7, color = 'var(--honey)', inner = '') {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r, off = c * (1 - Math.max(0, Math.min(1, v || 0)));
  return `<svg class="ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true">
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="var(--ring-bg)" stroke-width="${stroke}"/>
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"
      stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}" transform="rotate(-90 ${size / 2} ${size / 2})"/>
    ${inner ? `<text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" class="ring-t">${inner}</text>` : ''}
  </svg>`;
}

/* A pointy-top hexagon path centred on (cx, cy). */
export function hexPath(cx, cy, r) {
  const p = [];
  for (let i = 0; i < 6; i++) { const a = Math.PI / 180 * (60 * i - 90); p.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`); }
  return `M${p.join('L')}Z`;
}

export function spark(vals, w = 88, h = 26, color = 'var(--honey-d)', target = null) {
  const xs = vals.map((v, i) => [i, v]).filter(([, v]) => v != null);
  if (xs.length < 2) return '';
  const max = Math.max(target || 0, ...xs.map(([, v]) => v), 1);
  const X = (i) => 3 + (i / (vals.length - 1)) * (w - 6), Y = (v) => h - 3 - (v / max) * (h - 6);
  const d = xs.map(([i, v], k) => `${k ? 'L' : 'M'}${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join('');
  const [li, lv] = xs[xs.length - 1];
  return `<svg class="spark" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true">
    ${target ? `<line x1="0" x2="${w}" y1="${Y(target).toFixed(1)}" y2="${Y(target).toFixed(1)}" stroke="var(--line)" stroke-dasharray="3 3"/>` : ''}
    <path d="${d}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${X(li).toFixed(1)}" cy="${Y(lv).toFixed(1)}" r="3" fill="${color}"/></svg>`;
}

/* Donut of minutes by category. */
export function donut(mins, size = 150, stroke = 22) {
  const entries = Object.entries(mins).filter(([, m]) => m > 0);
  const total = entries.reduce((a, [, m]) => a + m, 0);
  const r = (size - stroke) / 2, c = 2 * Math.PI * r;
  let acc = 0;
  const arcs = entries.map(([id, m]) => {
    const len = (m / total) * c, gap = entries.length > 1 ? 2 : 0;
    const s = `<circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${CATS[id].color}" stroke-width="${stroke}"
      stroke-dasharray="${Math.max(0, len - gap).toFixed(1)} ${(c - len + gap).toFixed(1)}" stroke-dashoffset="${(-acc).toFixed(1)}"
      transform="rotate(-90 ${size / 2} ${size / 2})"><title>${CATS[id].name}</title></circle>`;
    acc += len;
    return s;
  }).join('');
  return `<svg class="donut" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-label="Time by kind">
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="var(--ring-bg)" stroke-width="${stroke}"/>${arcs}</svg>`;
}

/* Line icons for the chrome. Emoji carry the fun; these carry the structure. */
const P = {
  today: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  board: '<rect x="3" y="4" width="5" height="16" rx="1.5"/><rect x="10" y="4" width="5" height="11" rx="1.5"/><rect x="17" y="4" width="4" height="7" rx="1.5"/>',
  week: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  goals: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
  hive: '<path d="M12 2l4.3 2.5v5L12 12 7.7 9.5v-5z"/><path d="M7.7 9.5L12 12v5l-4.3 2.5L3.4 17v-5z"/><path d="M16.3 9.5L20.6 12v5l-4.3 2.5L12 17v-5z"/>',
  grown: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
  bell: '<path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 003.4 0"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
  more: '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>',
  left: '<path d="M15 18l-6-6 6-6"/>', right: '<path d="M9 18l6-6-6-6"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16v4z"/>',
  play: '<path d="M7 4l13 8-13 8z"/>', pause: '<path d="M7 4h4v16H7zM14 4h4v16h-4z"/>',
  sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
};
export const icon = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || ''}</svg>`;

export const STICKERS = ['🌟', '🐝', '🍯', '💛', '🎉', '🚀', '🏆', '🎹', '⚽', '📚', '🌈', '🦸'];
