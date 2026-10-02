# The Bizzing family standard — v1 (Oct 2026)

What every Bizzing app must do the same way, so five apps feel like one family and the
Bizzing Hive can sit at the centre. Each app keeps its own world, art and subject; this is the
shared layer on top. Written from the October 2026 family audit (67 elements × 5 apps).

Where an app's own CLAUDE.md is stricter, the stricter rule wins. Where this standard and an
app disagree, change the app — or raise it with the owner; never quietly diverge.

**The bar:** every app scores **at least 4 (strong)** on the 39 key elements listed at the end.

---

## 1. One currency: Bizzing coins 🪙

One wallet per child, shared by every app. Earned for learning, spent on fixed-price things,
and taught as real money in Bizzing Finance.

| Rule | Detail |
|---|---|
| **One wallet** | Per child, across all apps. Each app's old currency (Bee coins, India shells, etc.) converts 1:1 at migration and is retired. |
| **Earned only for learning** | Correct answers, finished stops/lessons, mastery milestones. **Never** for time on the app, logins, streaks, dice or luck. |
| **Standard amounts** | Right answer in practice **1** · stop/lesson/story finished **5** · level/band/world mastered **20** · contest/mock completed **10**. An app may not invent bigger payouts. |
| **Daily earn cap** | 100 coins per app per child per day (stops grinding; it is never shown as a target). |
| **Spent at fixed prices** | Each app's shop sells its own cosmetics (outfits, stickers, themes, board skins) at a printed price. **No random rewards, no gacha, no packs, no rarity tiers, no doubling or betting.** |
| **Never bought with real money** | No path from real money to coins. Paid plans unlock *content*, never coins or cosmetics. |
| **Nothing paid is cosmetic-exclusive** | A free child can earn every cosmetic. Paid plans never lock avatars or skins behind "rare/legendary". |
| **Finance teaches it** | Bizzing Finance shows the same wallet as the child's income: what was earned where, the save / spend / give jars, the bank. It is the one place coins are *taught*. |
| **The Hive pays nothing** | Keeping a plan is its own reward; the Hive shows medals and the comb, never coins. |

**Storage contract (until the shared server exists):** `localStorage['bizzing.wallet']`
(same origin, every app reads and writes) = `{ v:1, kids: { "<first name, lower case>":
{ coins, ledger: [{ a:'bee', t:<ms>, n:+5, why:'stop' }] } } }`. Append to the ledger, never
rewrite it; trim to 2,000 entries. The server version replaces this key; the shape stays. **Use the shared helper** `integration/bizzing-wallet.js` (`earn`, `spend`, `balance`, `migrateFrom`, `ledger`) from the Bizzing_Schedule repo rather than writing to the key directly — it enforces the amounts, the cap and fixed prices, and is tested (`app/test/wallet.mjs`).

## 2. Home screen anatomy

Every app's home has the same five parts, in this order. The app's own world fills them.

1. **Family top bar** (§3).
2. **Greeting** — one line from the app's mascot, specific to what the child did last.
3. **ONE Continue card** — the single next step, with a progress bar and a large button.
   Exactly one primary button on the screen. Never two "next" lessons that disagree.
4. **Today's three** — up to three small daily cards (a 5-minute practice, a challenge, a
   story or game). Optional to do; nothing is lost for skipping.
5. **Ways in** — tiles to the app's main areas (Atlas/World, Library, Games, Goals). Maximum
   six tiles.

On a phone the home fits **one screen above the fold** to the Continue button.

## 3. The family top bar

Same in every app, same height (56px), same order:

`[⬡ back to Hive] [App name] ………… [theme] [🔒 grown-ups] [avatar ▾ child switcher]`

- **⬡ back to Hive** opens `https://aayuvis.github.io/Bizzing_Schedule/` (the Hive). Hidden
  only inside a running drill.
- **Child switcher** lists every child in the household; switching never mixes their data.
- **🔒 grown-ups** opens the PIN-gated grown-ups area (§7).

## 4. Navigation

- **The back button never leaves the app.** Every screen has a hash route (`#/atlas`,
  `#/stop/12`…); back returns to the previous screen inside the app.
- **Deep links from the Hive:** `#/continue` opens the Continue card's target directly;
  `?from=hive` shows a "← back to my day" chip that returns to the Hive.
- Phone: bottom tab bar, maximum five tabs (Home · World · Practice · Library · Me, or the
  app's equivalents). Desktop: the same five as a sidebar or top tabs.

## 5. Profiles and data

- A **household** of children; first name, age band and avatar only. Never birthdate,
  surname, school, photo, email or location.
- **Sibling switching** in the top bar on every app (§3).
- All storage behind the app's **`Store` seam**, versioned, `vN_to_vN+1` steps only.
- Nothing is transmitted except what the app's privacy page names (Geography's Street View is
  the one named exception). No analytics, no third-party scripts, no ads.

## 6. Learning and feedback

- **Right answers advance; wrong answers hold** until tapped, and say why.
- **Rank/level moves only with right answers or mastery** — never with time, dice, games of
  chance or coins.
- **Mastery is evidence-based and spaced**: correct, and again after a gap. A child cannot
  mark something "mastered" themselves, and mastery is re-checked over time.
- **Every question is generated and tested**: one right answer, not in the text, even answer
  slots (the Geography/Maths test pattern).
- **Facts carry sources** (`sources[]`), or are derived from data. Nothing from memory.

## 7. Grown-ups area

- Behind a **4-digit PIN** that the screen calls a deterrent, not security.
- **No developer/tester unlocks outside tester mode**; tester mode opens gates and never
  rewrites the child (no "add XP" buttons).
- **Report card** in the same three measures everywhere, so the Hive can merge them:
  **Time** (active minutes) · **Progress** (steps along the path) · **Mastery** (what the child
  can now do, from evidence). Never usage dressed up as learning.
- Backup, restore and erase.
- Every number a grown-up sees must be internally consistent (one rate, one rule, no projections
  on zero).

## 8. Motivation

- **No streaks**, no streak freezes, no "you'll lose…" messages. Count good days in a window.
- **Medals earned from evidence**, each celebrated once, with art in the family medallion style.
- Celebrate effort and specifics ("12 words in a row"), never compare children.

## 9. Audio

- **Read-aloud for every question and instruction** in the 6–8 band (and on tap for older
  bands), using the family narrator: English `en-IN-Chirp3-HD-Laomedeia` at 1.02, Hindi
  `hi-IN-Neural2-A` at 0.88. Clips are measured on build (no silent 200-OK clips: reject
  anything under −20 dB or 0.35 s).
- Short, soft sound effects for right / wrong / finish / medal; **one mute** in the top bar's
  menu, remembered per device.

## 10. Games

Every game has, at minimum: a title card, a 3-second how-to, motion on every answer (not just a
text change), sound (§9), a finish screen with what was practised, keyboard **and** touch, and a
score built on the *learning decision*, never luck.

## 11. Performance and offline

- **First screen ≤ 1.5 MB transferred on a phone**; initial JavaScript ≤ 400 KB gzipped.
  Data files and art load per route, never all up front; art never inlined into JS.
- **PWA**: service worker (hashed assets cache-first, pages network-first), manifest with
  icons, works offline after first visit.

## 12. Look and feel

- Each app keeps its own world and its six (or three) themes, but shares the **family brand
  layer**: the top bar, the honeycomb ⬡ mark, the Continue card shape (16px radius, one
  primary colour), the medallion medal style, the family avatar set (Bee's 21 + Geography's 40
  creatures, offered in every app).
- Text in Indic scripts follows Bizzing India's rule: a real face, unbroken shirorekha, never
  letter-spaced.
- Phone layout passes the device-width overflow check (Chromium widens `innerWidth` on
  overflow under emulation — measure against the viewport you set).
- Contrast meets WCAG AA in every theme, light and dark; focus is always visible; reduced
  motion is respected.

## 13. Bizzing Hive integration

- **Write `bizzing.activity`** with the drop-in `integration/bizzing-activity.js` from the
  Bizzing_Schedule repo: active minutes, per child, never transmitted.
- App ids: `bee`, `maths`, `geography`, `india`, `finance`.
- **Write milestones** with `trackMilestone(app, who, ev, label)` from the same drop-in: `{ a, d, t, m:0, ev:'band'|'world'|'stop'|'mastery',
  label }` (Hive goals read these once the reader supports them).
- Accept `#/continue` and `?from=hive` (§4).
- Grown-ups pages link to the Hive's grown-ups page for the family-wide view.

## 14. Demo mode

`?demo` opens a sample child with a few weeks of believable progress, clearly labelled
"Sample", never touching a real household or the shared feeds.

## 15. Tests every app keeps

The app's browser check asserts, at minimum: back button stays in the app · Continue card is
the only primary button on home · grown-ups area needs the PIN · no third-party requests (bar
named exceptions) · no overflow at 390px measured against the device width · contrast in every
theme · the activity feed is written · coins are earned only by the standard events.
**Prove each assertion by breaking it once.**

---

## The 39 key elements (minimum 4 each)

| Area | Elements |
|---|---|
| First impression | A1 welcome · A3 time to first learning · A4 profile setup · A5 demo mode |
| Home | B1 layout · B2 one Continue · B3 progress on home · B6 navigation/back · B7 sibling switch |
| Progression | C3 learning path · C4 gating · C6 rank moves only on learning |
| Learning | D1 the why · D3 feedback · D5 mastery · D7 sources · D8 question testing |
| Sessions & games | E1 short daily session · F2 games teach · F3 game polish · F4 keyboard + touch |
| Rewards | I3 no loot/gacha · I4 medals from evidence · J1 celebration · J2 no streaks |
| Audio & look | K1 narration · L1 visual polish · L4 phone layout · L5 accessibility |
| Grown-ups | M1 report card · M2 learning not usage · M3 PIN & controls |
| Platform | N1 offline/PWA · N2 first-load weight · N3 tests · N4 storage seam · N5 privacy |
| Family | O3 Hive integration · O4 family brand layer |

Not in an app's own chat: **O1 entitlements, O2 pricing, O5 marketing pages, O6 locale/
currency display** — these come with the shared family server and billing, built once.
