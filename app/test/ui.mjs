/* ui.mjs — drive the BUILT app in Chromium, desktop and phone, at the sub-path
   it is published under. Every check is something a family would notice. */
import { chromium } from 'playwright';
import { serve, BASE } from './serve.mjs';
import { fileURLToPath } from 'node:url';
import { mkdirSync } from 'node:fs';

const ROOT = fileURLToPath(new URL('../build', import.meta.url));
const SHOTS = process.env.SHOTS || fileURLToPath(new URL('../../shots', import.meta.url));
mkdirSync(SHOTS, { recursive: true });
const srv = await serve(ROOT);
const URL0 = `http://localhost:${srv.address().port}${BASE}`;
const NOW = '2026-09-23T17:10';   // a Wednesday, just after school
let fail = 0;
const ok = (name, cond, extra = '') => { if (!cond) { fail++; console.log(`✗ ${name} ${extra}`); } else console.log(`✓ ${name}`); };

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });

async function run(label, vp, isMobile) {
  const ctx = await browser.newContext({ viewport: vp, isMobile, hasTouch: isMobile, deviceScaleFactor: isMobile ? 2 : 1 });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('request', (r) => { if (!r.url().startsWith(URL0) && !r.url().startsWith('data:')) errors.push('third-party request ' + r.url()); });
  page.on('requestfailed', (r) => { if (r.url().startsWith(URL0)) errors.push('failed ' + r.url()); });
  page.on('response', (r) => { if (r.url().startsWith(URL0) && r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
  /* Nothing pokes off the right edge of the screen — unless it lives inside a
     container that scrolls sideways on purpose (the week grid, the board). */
  /* Nothing pokes off the right edge of the screen — unless it lives inside a
     container that scrolls sideways on purpose (the week grid, the board).
     Measured against the DEVICE width: under mobile emulation Chromium widens
     innerWidth to fit whatever overflows, so innerWidth can never catch it. */
  const noOverflow = async (where) => {
    const bad = await page.evaluate((W) => {
      const scrolls = (el) => { for (let p = el.parentElement; p; p = p.parentElement) { const o = getComputedStyle(p).overflowX; if (o === 'auto' || o === 'scroll' || o === 'hidden') return true; } return false; };
      const out = [...document.querySelectorAll('.view *, .top *')].filter((el) => { const r = el.getBoundingClientRect(); return r.width && r.right > W + 1 && !scrolls(el) && getComputedStyle(el).position !== 'fixed'; })
        .slice(0, 3).map((el) => `${el.tagName.toLowerCase()}.${[...el.classList].join('.')} right=${Math.round(el.getBoundingClientRect().right)}`);
      if (document.scrollingElement.scrollWidth > W + 1) out.push(`page is ${document.scrollingElement.scrollWidth}px wide`);
      return out;
    }, vp.width);
    ok(`${label}: nothing runs off the screen on ${where}`, !bad.length, bad.join(' | '));
  };
  const imgsOk = async (where) => { const bad = await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src)); ok(`${label}: every picture loads on ${where}`, !bad.length, bad.join(' ')); };
  const shot = (n) => page.screenshot({ path: `${SHOTS}/${label}-${n}.png`, fullPage: false });

  await page.goto(`${URL0}?now=${NOW}`);
  await page.waitForSelector('.onb');
  ok(`${label}: first run offers setup and a sample`, await page.isVisible('text=Set up our family') && await page.isVisible('text=Explore a sample family'));
  await imgsOk('welcome'); await shot('0-welcome');
  await page.click('text=Explore a sample family');
  await page.waitForSelector('.timeline');
  await page.waitForTimeout(400);
  const title = await page.textContent('.hero h1');
  ok(`${label}: Today greets the child by name`, /Anaya/.test(title), title);
  ok(`${label}: a Bizzing-app block shows minutes from the app`, await page.locator('.app-bar small').first().isVisible());
  await imgsOk('today'); await noOverflow('today'); await shot('1-today');

  // check in a block: an open one from earlier today
  const tickBtn = page.locator('.blk.st-open .tick, .blk.st-now .tick, .blk.st-later .tick').first();
  if (await tickBtn.count()) {
    const li = tickBtn.locator('xpath=ancestor::li[1]');
    const titleTxt = (await li.locator('.blk-t').textContent()).trim();
    await tickBtn.click();
    await page.waitForTimeout(200);
    const after = await page.locator('.blk', { hasText: titleTxt.slice(3, 15) }).first().getAttribute('class');
    ok(`${label}: one tap marks a block done`, /st-done/.test(after), after);
    ok(`${label}: and says so, with undo`, /Undo/.test(await page.textContent('#toast')));
  }

  // quick add
  if (isMobile) await page.click('.tab-add'); else await page.keyboard.press('Control+k');
  await page.waitForSelector('#qa-input');
  await page.fill('#qa-input', 'chess club tue thu 4:45pm 45m');
  ok(`${label}: quick add previews a routine`, /Routine/.test(await page.textContent('#qa-prev')) && /Tue, Thu/.test(await page.textContent('#qa-prev')));
  await shot('2-quickadd');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(200);
  const hasChess = await page.evaluate(() => window.__bzs.M.activeKid(window.__bzs.S.h).routines.some((r) => r.title === 'Chess club' && r.start === 16 * 60 + 45 && r.days.join() === '1,3'));
  ok(`${label}: quick add creates the routine`, hasChess);

  // the routine editor: chips and toggles respond to a tap
  await page.click(isMobile ? '.tab >> text=Today' : '.nav-i >> text=Today');
  await page.click('.card-h button:has-text("Add")');
  await page.waitForSelector('form[data-form=routine]');
  await page.fill('input[name=title]', 'Violin');
  ok(`${label}: typing a title picks its icon`, (await page.textContent('.iconf-b')).trim() === '🎻');
  await page.click('.iconf-b');
  await page.fill('.icon-q', 'rocket');
  ok(`${label}: the icon search narrows to matches`, (await page.locator('.icon-grid button:visible').count()) === 1);
  await page.click('.icon-grid button[data-v="🚀"]');
  await page.fill('input[name=title]', 'Violin');
  ok(`${label}: a hand-picked icon is not overwritten by typing`, (await page.textContent('.iconf-b')).trim() === '🚀');
  await page.click('.catpick label:has-text("Music & art")');
  await page.click('.days label:has-text("Sa")');
  await page.click('.days label:has-text("We")');   // untick the pre-selected day
  ok(`${label}: a plan can run longer than four hours`, +(await page.getAttribute('input[name=dur]', 'max')) >= 600);
  await page.fill('input[name=start]', '08:00');   // a school-length day: 8:00 for 8 hours
  await page.$eval('input[name=dur]', (e) => { e.value = '480'; e.dispatchEvent(new Event('input', { bubbles: true })); });
  ok(`${label}: the length readout follows the slider past four hours`, (await page.textContent('#durOut')).trim() === '8h');
  await page.click('form[data-form=routine] button:has-text("Add to plan")');
  const violin = await page.evaluate(() => window.__bzs.M.activeKid(window.__bzs.S.h).routines.find((r) => r.title === 'Violin'));
  ok(`${label}: the plan editor's chips, day toggles and icon all save`, violin && violin.cat === 'create' && violin.days.join() === '5' && violin.icon === '🚀' && violin.dur === 480, JSON.stringify(violin && { cat: violin.cat, days: violin.days, icon: violin.icon, dur: violin.dur }));

  // week
  await page.evaluate(() => { location.hash = 'week'; });
  await page.click(isMobile ? '.tab >> text=Week' : '.nav-i >> text=Week');
  await page.waitForSelector('.wk');
  ok(`${label}: week shows seven days`, (await page.locator('.wk-day').count()) === 7);
  /* added on a Wednesday: this week only Thursday is ahead of it; next week has both */
  ok(`${label}: a new routine starts from today, not last Tuesday`, (await page.locator('.wb', { hasText: 'Chess club' }).count()) === 1);
  await page.click('[data-act=weekNav][data-d="7"]');
  ok(`${label}: and is on both days next week`, (await page.locator('.wb', { hasText: 'Chess club' }).count()) === 2);
  await page.click('[data-act=weekNav][data-d="0"]');
  ok(`${label}: the clash it makes is outlined`, (await page.locator('.wb.clash').count()) > 0);
  // week drag: pick a block up and drop it on another day, an hour later
  const vio = () => page.evaluate(() => { const r = window.__bzs.M.activeKid(window.__bzs.S.h).routines.find((x) => x.title === 'Violin' && !x.until); return r && { days: r.days.join(), start: r.start }; });
  if (!isMobile) {
    const vb = await page.locator('.wb', { hasText: 'Violin' }).first().boundingBox();
    const fri = await page.locator('.wk-col').nth(4).boundingBox();
    await page.mouse.move(vb.x + vb.width / 2, vb.y + 10); await page.mouse.down();
    await page.mouse.move(vb.x + vb.width / 2 - 20, vb.y + 20, { steps: 3 });
    await page.mouse.move(fri.x + fri.width / 2, vb.y + 10 + 54, { steps: 8 });   // 54px = one hour at 0.9px a minute
    await page.mouse.up();
    const v = await vio();
    ok(`${label}: dragging a week block moves it to the day and time it was dropped on`, v && v.days === '4' && v.start === 9 * 60, JSON.stringify(v));
    ok(`${label}: a drag does not also open the editor`, !(await page.locator('form[data-form=routine]').count()));
    await page.click('#toast button');   // Undo
    ok(`${label}: Undo puts it back`, JSON.stringify(await vio()) === JSON.stringify({ days: '5', start: 8 * 60 }));
  }
  /* keyboard: Alt + arrows move the focused block 15 minutes or a day */
  await page.locator('.wb', { hasText: 'Violin' }).first().focus();
  await page.keyboard.press('Alt+ArrowDown');
  await page.keyboard.press('Alt+ArrowLeft');
  ok(`${label}: Alt + arrows move a focused block by keyboard`, JSON.stringify(await vio()) === JSON.stringify({ days: '4', start: 8 * 60 + 15 }), JSON.stringify(await vio()));
  await page.keyboard.press('Alt+Shift+ArrowUp');
  const vlen = () => page.evaluate(() => window.__bzs.M.activeKid(window.__bzs.S.h).routines.find((x) => x.title === 'Violin' && !x.until).dur);
  ok(`${label}: Alt + Shift + arrows change a focused block's length`, (await vlen()) === 8 * 60 - 15, await vlen());
  if (!isMobile) {   /* drag the bottom edge up an hour */
    const gb = await page.locator('.wb', { hasText: 'Violin' }).first().locator('.wb-grip').boundingBox();
    await page.mouse.move(gb.x + gb.width / 2, gb.y + gb.height / 2); await page.mouse.down();
    await page.mouse.move(gb.x + gb.width / 2, gb.y + gb.height / 2 - 54, { steps: 8 }); await page.mouse.up();
    ok(`${label}: dragging the bottom edge makes a block shorter`, (await vlen()) === 7 * 60 - 15, await vlen());
    ok(`${label}: and does not move it or open the editor`, JSON.stringify(await vio()) === JSON.stringify({ days: '4', start: 8 * 60 + 15 }) && !(await page.locator('form[data-form=routine]').count()));
  }
  await noOverflow('week'); await shot('3-week');

  // board: keyboard move and mouse drag
  await page.click(isMobile ? '.tab >> text=Board' : '.nav-i >> text=Board');
  await page.waitForSelector('.kanban');
  await page.click('.seg >> text=This week');
  const card = page.locator('[data-col="todo"] .kcard').first();
  const id = await card.getAttribute('data-card');
  await card.focus();
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(150);
  ok(`${label}: → moves a card to Doing`, (await page.locator(`[data-col="doing"] [data-card="${id}"]`).count()) === 1);
  if (!isMobile) {
    const c2 = page.locator('[data-col="doing"] .kcard').first(), id2 = await c2.getAttribute('data-card');
    const a = await c2.boundingBox(), b = await page.locator('[data-col="done"]').boundingBox();
    await page.mouse.move(a.x + 30, a.y + 20); await page.mouse.down();
    await page.mouse.move(a.x + 60, a.y + 40, { steps: 4 }); await page.mouse.move(b.x + 60, b.y + 80, { steps: 8 }); await page.mouse.up();
    await page.waitForTimeout(200);
    ok(`${label}: dragging a card to Done moves it`, (await page.locator(`[data-col="done"] [data-card="${id2}"]`).count()) === 1);
  } else {
    await page.locator(`[data-col="doing"] [data-card="${id}"] button[data-dir="1"]`).tap();
    await page.waitForTimeout(150);
    ok(`${label}: a tap on → moves a card on a phone`, (await page.locator(`[data-col="done"] [data-card="${id}"]`).count()) === 1);
  }
  await noOverflow('board'); await shot('4-board');

  // goals
  await page.click(isMobile ? '.tab >> text=Goals' : '.nav-i >> text=Goals');
  await page.waitForSelector('.goal');
  const before = await page.evaluate(() => window.__bzs.M.activeKid(window.__bzs.S.h).goals[1].krs[1].value);
  await page.locator('.goal').nth(1).locator('button:has-text("+1")').click();
  const after = await page.evaluate(() => window.__bzs.M.activeKid(window.__bzs.S.h).goals[1].krs[1].value);
  ok(`${label}: +1 counts a manual measure`, after === before + 1, `${before}→${after}`);
  await noOverflow('goals'); await shot('5-goals');

  // hive
  await page.goto(`${URL0}?now=${NOW}#hive`);
  await page.waitForSelector('.comb');
  await page.waitForTimeout(500);
  ok(`${label}: hive shows the comb and 12 medals`, (await page.locator('.badge').count()) === 12);
  ok(`${label}: some medals are earned`, (await page.locator('.badge.on').count()) > 0);
  ok(`${label}: every medal shows the companion it brings`, (await page.locator('.badge .comp img').count()) === 12);
  await imgsOk('hive'); await noOverflow('hive'); await shot('6-hive');

  // grown-ups
  await page.goto(`${URL0}?now=${NOW}#grown`);
  await page.waitForSelector('.gate');
  await page.fill('input[name=pin]', '0000'); await page.keyboard.press('Enter');
  ok(`${label}: a wrong PIN does not open`, await page.isVisible('.gate'));
  await page.fill('input[name=pin]', '1234'); await page.keyboard.press('Enter');
  await page.waitForSelector('.gw-kid');
  ok(`${label}: grown-ups see both children`, (await page.locator('.gw-kid').count()) === 2);
  ok(`${label}: with plain-language insights`, (await page.locator('.insights li').count()) >= 2);
  await noOverflow('grown-ups'); await shot('7-grown');
  await page.click('button:has-text("Send kudos")');
  await page.fill('textarea[name=text]', 'Great focus today!');
  await page.click('button:has-text("Send 🎁")');
  ok(`${label}: kudos arrive on the child's record`, await page.evaluate(() => window.__bzs.S.h.kids[0].kudos[0].text === 'Great focus today!'));

  // worlds: three muted palettes, each with its own night, one tap, remembered on this device
  await page.goto(`${URL0}?now=${NOW}#today`);
  await page.waitForSelector('.themes');
  ok(`${label}: three world buttons and a Night button`, (await page.locator('.top .themes button[data-act=theme]').count()) === 3 && (await page.locator('.top .themes button[data-act=night]').count()) === 1);
  await page.click('.top .themes button[data-v="marigold"]');
  await page.click('.top .themes button[data-act=night]');
  ok(`${label}: Night darkens the world you are in`, (await page.getAttribute('html', 'data-theme')) === 'night' && (await page.getAttribute('html', 'data-world')) === 'marigold');
  await page.reload(); await page.waitForSelector('.timeline'); await page.waitForTimeout(500);   // let the background fade finish
  ok(`${label}: and both are remembered`, (await page.getAttribute('html', 'data-theme')) === 'night' && (await page.getAttribute('html', 'data-world')) === 'marigold');
  const contrast = await page.evaluate(() => { const el = document.querySelector('.blk-body'); const c = getComputedStyle(el); return [c.backgroundColor, getComputedStyle(el.querySelector('.blk-t')).color]; });
  ok(`${label}: at night a block is dark with light text`, /rgb\((\d+), (\d+), (\d+)\)/.test(contrast[0]) && contrast[0].match(/\d+/g).slice(0, 3).reduce((a, b) => a + +b, 0) < 300 && contrast[1].match(/\d+/g).slice(0, 3).reduce((a, b) => a + +b, 0) > 500, contrast.join(' / '));
  /* every piece of text on Today, against the colour actually behind it (WCAG AA for large-ish UI text: 3:1), in all six looks */
  const poorText = () => page.evaluate(() => {
    const lum = (c) => { const [r, g, b] = c.match(/[\d.]+/g).slice(0, 3).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
    const bgOf = (el) => { for (let e = el; e; e = e.parentElement) { const st = getComputedStyle(e); if (st.backgroundImage !== 'none') return null;   /* a painting or gradient: judged by eye */ const a = st.backgroundColor.match(/[\d.]+/g); if (a && (a.length < 4 || +a[3] > 0.5)) return st.backgroundColor; } return 'rgb(255,255,255)'; };
    const out = [];
    for (const el of document.querySelectorAll('.view *')) {
      if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
      const r = el.getBoundingClientRect(); if (!r.width || r.bottom < 0 || r.top > innerHeight) continue;
      const bg = bgOf(el); if (!bg) continue;                       // text over a painting: judged by eye
      const a = lum(getComputedStyle(el).color), b = lum(bg), ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
      if (ratio < 3) out.push(`${el.tagName.toLowerCase()}.${el.getAttribute('class') || ''} “${el.textContent.trim().slice(0, 24)}”: ${ratio.toFixed(1)}`);
    }
    return out.slice(0, 5);
  });
  const looks = {};
  for (const w of ['meadow', 'marigold', 'lagoon']) for (const night of [true, false]) {
    await page.click(`.top .themes button[data-v="${w}"]`);
    if ((await page.getAttribute('html', 'data-theme') === 'night') !== night) await page.click('.top .themes button[data-act=night]');
    await page.waitForTimeout(350);
    const poor = await poorText();
    if (!night) looks[w] = await page.evaluate(() => { const card = document.querySelector('.card'); return [getComputedStyle(document.querySelector('h1')).fontFamily.split(',')[0], getComputedStyle(card).borderTopLeftRadius, getComputedStyle(card).boxShadow, getComputedStyle(document.querySelector('.hero')).backgroundImage.split('/').pop()].join(' | '); });
    ok(`${label}: every word on Today is readable in ${w}${night ? ' at night' : ''}`, !poor.length, poor.join(' | '));
    if (night) { await noOverflow(`today in ${w} at night`); }
    await shot(`9-${w}${night ? '-night' : ''}`);
  }
  const L = Object.values(looks).map((x) => x.split(' | '));
  ok(`${label}: each world has its own typeface, corners, shadow and painting`, [0, 1, 2, 3].every((i) => new Set(L.map((x) => x[i])).size === 3), JSON.stringify(looks));
  await page.click('.top .themes button[data-v="meadow"]');

  // focus sprint opens and stops
  await page.goto(`${URL0}?now=${NOW}#today`);
  await page.waitForSelector('.focus-cta');
  await page.click('.focus-cta'); await page.click('.fs-n >> text=10');
  await page.waitForSelector('#fs-time');
  ok(`${label}: the child's own avatar keeps them company in a sprint`, (await page.getAttribute('.fs-bee', 'src')) === `./avatars/${await page.evaluate(() => window.__bzs.S.h.kids[0].avatar)}.png`);
  await shot('8-focus');
  await page.keyboard.press('Escape');
  ok(`${label}: a sprint stopped in the first minute records nothing`, await page.evaluate(() => window.__bzs.S.h.kids[0].focus.length === 5));
  // Today: drag a block down for later (today only); Undo; keyboard; the school timetable
  await page.goto(`${URL0}?now=${NOW}#today`);
  await page.waitForSelector('.timeline');
  const piano = () => page.evaluate(() => { const k = window.__bzs.S.h.kids[0], r = k.routines.find((x) => x.title === 'Piano practice'); return { mv: (k.log['2026-09-23'] || {})[r.id]?.mv ?? null, start: r.start }; });
  if (!isMobile) {
    const pb = await page.locator('.blk.can-drag', { hasText: 'Piano practice' }).locator('.blk-body').boundingBox();
    await page.mouse.move(pb.x + 40, pb.y + pb.height / 2); await page.mouse.down();
    await page.mouse.move(pb.x + 40, pb.y + pb.height / 2 + 10, { steps: 2 });
    await page.mouse.move(pb.x + 40, pb.y + pb.height / 2 + 30, { steps: 6 }); await page.mouse.up();
    const p1 = await piano();
    ok(`${label}: dragging a Today block down moves it later, today only`, p1.mv === 18 * 60 && p1.start === 17 * 60 + 30, JSON.stringify(p1));
    ok(`${label}: and a drag does not open the editor`, !(await page.locator('form[data-form=routine]').count()));
    await page.click('#toast button');
    ok(`${label}: Undo puts it back on Today`, (await piano()).mv === null);
  }
  await page.locator('.blk', { hasText: 'Piano practice' }).locator('.blk-t').focus();
  await page.keyboard.press('Alt+ArrowDown');
  ok(`${label}: Alt + Down moves a Today block 15 minutes later`, (await piano()).mv === 17 * 60 + 45, JSON.stringify(await piano()));
  await page.evaluate(() => { const k = window.__bzs.S.h.kids[0]; delete k.log['2026-09-23'][k.routines.find((x) => x.title === 'Piano practice').id]; window.__bzs.render(); });
  await page.click('.blk .blk-t:has-text("School")');
  await page.waitForSelector('.sh-school');
  ok(`${label}: tapping the school block opens its timetable`, (await page.locator('.tt-list li').count()) === 9);
  await page.click('.tt-days button:has-text("Fr")');
  ok(`${label}: a day pill shows that day's periods`, (await page.locator('.tt-list li', { hasText: 'Assembly' }).count()) === 1);
  await page.click('.sh-school button:has-text("Edit timetable")');
  await page.fill('input[name=p0t]', 'Form time');
  await page.click('form[data-form=timetable] button:has-text("Save")');
  ok(`${label}: an edited period saves`, (await page.locator('.tt-list li', { hasText: 'Form time' }).count()) === 1 && (await page.locator('.tt-list li', { hasText: 'Registration' }).count()) === 0);
  await noOverflow('school timetable'); await shot('10-school');
  await page.keyboard.press('Escape');

  // a medal's companion: celebrated once, worn with one tap
  await page.evaluate(() => { const k = window.__bzs.S.h.kids[0]; k.badges.lantern = k.badges.lantern || '2026-01-01';
    window.__bzs.S.modal = { type: 'badge', b: { id: 'lantern', av: 'samurai', art: 'badge-lantern', name: 'Laser Focus', desc: 'Finish 5 focus sprints.' } }; window.__bzs.render(); });
  await page.click('.badge-cel button:has-text("Wear Samurai")');
  ok(`${label}: wearing a medal's companion changes the avatar`, await page.evaluate(() => window.__bzs.S.h.kids[0].avatar === 'samurai'));

  ok(`${label}: no errors in the console`, errors.length === 0, errors.join('\n   '));
  await ctx.close();
}

/* a real family's first minute */
async function setup() {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto(`${URL0}?now=${NOW}`);
  await page.click('text=Set up our family');
  await page.fill('input[name=from]', 'Dad');
  await page.fill('input[name=name]', 'Zara');
  await page.fill('input[name=pin]', '4321');
  await page.click('button:has-text("Let\'s go")');
  await page.waitForSelector('.timeline');
  const s = await page.evaluate(() => ({ n: window.__bzs.S.h.kids.length, r: window.__bzs.S.h.kids[0].routines.length, keys: Object.keys(window.__bzs.S.h.kids[0]).sort().join(',') }));
  ok('setup: one child with a starter week', s.n === 1 && s.r >= 6, JSON.stringify(s));
  ok('setup: nothing but a first name and an age band describes the child', !/birth|surname|email|school|photo|location/i.test(s.keys), s.keys);
  const ls = await page.evaluate(() => Object.keys(localStorage));
  ok('setup: the shared Bizzing feed is not written by Schedule', !ls.includes('bizzing.activity'), ls.join());
  await page.reload(); await page.waitForSelector('.timeline');
  ok('setup: it survives a reload', /Zara/.test(await page.textContent('.hero h1')));
  await ctx.close();
}

/* the Bizzing apps' own feed is read for the right child */
async function feed() {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${URL0}?now=${NOW}`);
  await page.click('text=Set up our family');
  await page.fill('input[name=name]', 'Zara'); await page.fill('input[name=pin]', '4321');
  await page.click('button:has-text("Let\'s go")');
  await page.evaluate(() => localStorage.setItem('bizzing.activity', JSON.stringify({ v: 1, s: [{ a: 'bee', d: '2026-09-23', t: 1000, m: 14, who: 'zara' }, { a: 'maths', d: '2026-09-23', t: 900, m: 9, who: 'Zara' }] })));
  await page.reload(); await page.waitForSelector('.timeline');
  const txt = await page.textContent('.biz-today');
  ok('feed: Bizzing minutes appear without typing', /Bizzing Bee · 14m/.test(txt) && /Bizzing Maths · 9m/.test(txt), txt);
  await ctx.close();
}

/* the drop-in writer the sibling apps will use: active minutes count, idle ones do not */
async function writer() {
  const { readFileSync } = await import('node:fs');
  const src = readFileSync(fileURLToPath(new URL('../../integration/bizzing-activity.js', import.meta.url)), 'utf8').replaceAll('export function', 'function') + '\nwindow.trackActivity = trackActivity;';
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.clock.install({ time: new Date('2026-09-23T16:00:00') });
  await page.goto(URL0 + '?now=' + NOW);
  await page.addScriptTag({ content: src });
  await page.evaluate(() => { localStorage.removeItem('bizzing.activity'); window.stop1 = trackActivity('bee', () => 'Anaya'); });
  for (let i = 0; i < 12; i++) { await page.mouse.click(5, 5); await page.clock.runFor(15000); }   // 3 busy minutes
  const busy = await page.evaluate(() => JSON.parse(localStorage.getItem('bizzing.activity')));
  ok('writer: three active minutes are recorded as one session', busy && busy.s.length === 1 && busy.s[0].m >= 2 && busy.s[0].m <= 3 && busy.s[0].who === 'Anaya' && busy.s[0].a === 'bee', JSON.stringify(busy));
  await page.clock.runFor(10 * 60000);                                                            // 10 idle minutes
  const total = () => page.evaluate(() => JSON.parse(localStorage.getItem('bizzing.activity')).s.reduce((a, x) => a + x.m, 0));
  const idle = await total();
  ok('writer: after the last touch, at most the two-minute grace counts', idle - busy.s[0].m <= 2, `${busy.s[0].m} → ${idle}`);
  await page.clock.runFor(30 * 60000);
  ok('writer: an open, untouched tab then adds nothing at all', (await total()) === idle, `${idle} → ${await total()}`);
  await page.evaluate(() => { document.dispatchEvent(new Event('visibilitychange')); });
  await page.evaluate(() => Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true }));
  for (let i = 0; i < 12; i++) { await page.mouse.click(5, 5); await page.clock.runFor(15000); }
  ok('writer: a hidden tab adds nothing even with input', (await total()) === idle);
  ok('writer: contains no network code at all', !/\b(fetch|XMLHttpRequest|sendBeacon|WebSocket|EventSource|import\()/.test(src.replace(/\/\*[\s\S]*?\*\//g, '')));
  await ctx.close();
}

await writer();
await run('desktop', { width: 1366, height: 900 }, false);
await run('phone', { width: 390, height: 844 }, true);
await setup();
await feed();
await browser.close(); srv.close();
if (fail) { console.log(`ui: ${fail} FAILED`); process.exit(1); }
console.log('ui: all passed');
