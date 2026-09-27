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
  await page.click('.catpick label:has-text("Music & art")');
  await page.click('.days label:has-text("Sa")');
  await page.click('.days label:has-text("We")');   // untick the pre-selected day
  await page.click('form[data-form=routine] button:has-text("Add to plan")');
  const violin = await page.evaluate(() => window.__bzs.M.activeKid(window.__bzs.S.h).routines.find((r) => r.title === 'Violin'));
  ok(`${label}: the plan editor's chips and day toggles work`, violin && violin.cat === 'create' && violin.days.join() === '5', JSON.stringify(violin && { cat: violin.cat, days: violin.days }));

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

  // focus sprint opens and stops
  await page.goto(`${URL0}?now=${NOW}#today`);
  await page.waitForSelector('.focus-cta');
  await page.click('.focus-cta'); await page.click('.fs-n >> text=10');
  await page.waitForSelector('#fs-time');
  await shot('8-focus');
  await page.keyboard.press('Escape');
  ok(`${label}: a sprint stopped in the first minute records nothing`, await page.evaluate(() => window.__bzs.S.h.kids[0].focus.length === 5));

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
  const src = readFileSync(fileURLToPath(new URL('../../integration/bizzing-activity.js', import.meta.url)), 'utf8').replace('export function', 'function') + '\nwindow.trackActivity = trackActivity;';
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
