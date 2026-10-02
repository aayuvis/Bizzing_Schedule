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
| **Spent at fixed prices** | Each app's shop sells its own cosmetics (outfits, stickers, themes, board skins) at a printed price. **No random rewards, no gacha, no packs, no doubling or betting.** Content (worlds, lessons) is never bought with coins. |
| **Never bought with real money** | No path from real money to coins. Paid plans unlock *content*, never coins or cosmetics. |
| **Rare avatars stay (owner's decision)** | Avatars may carry rarity tiers (Common · Rare · Epic · Legendary) — they make the collection worth building and help sell the paid plan. Every rare avatar says, on its card, exactly how it is unlocked: **a named learning milestone** ("master 500 words", "finish Level 5") **or included with the paid plan**. Never a random draw, never a pack, never sold one by one for real money, never bought with coins by chance. |
| **Finance teaches it** | Bizzing Finance shows the same wallet as the child's income: what was earned where, the save / spend / give jars, the bank. It is the one place coins are *taught*. |
| **The Hive pays nothing** | Keeping a plan is its own reward; the Hive shows medals and the comb, never coins. |

**Storage contract (until the shared server exists):** `localStorage['bizzing.wallet']`
(same origin, every app reads and writes) = `{ v:1, kids: { "<first name, lower case>":
{ coins, ledger: [{ a:'bee', t:<ms>, n:+5, why:'stop' }] } } }`. Append to the ledger, never
rewrite it; trim to 2,000 entries. The server version replaces this key; the shape stays. **Use the shared helper** `integration/bizzing-wallet.js` (`earn`, `spend`, `balance`, `migrateFrom`, `ledger`) from the Bizzing_Schedule repo rather than writing to the key directly — it enforces the amounts, the cap and fixed prices, and is tested (`app/test/wallet.mjs`).

## 2. Home screen anatomy — modelled on Bizzing Bee's home

**Bizzing Bee's home is the family template (owner's decision)**: the honeycomb backdrop, the
mascot greeting card with a speech bubble, the daily ring card, a "… of the hour" card, two big
painted journey cards, and a row of small tip/quote cards, under five tabs. Every app builds its
home in that look with its own mascot, art and words. Its one change: **only one card carries the
filled primary button** (§2.3).

Every app's home has the same five parts, in this order. The app's own world fills them.

1. **Family top bar** (§3).
2. **Greeting card** — the app's mascot with a one-line speech bubble specific to what the child did last (Bee: Bizzy). Beside it, the **daily ring** and one **"… of the hour"** card (word, number, place, story).
3. **ONE Continue card** — the big painted "Next on your journey" card: the single next step, with a progress bar and the only filled button on the screen. A second painted card may show the longer journey with a progress bar and a secondary (outline) button. Never two "next" lessons that disagree; placement ("Find your level") belongs in onboarding, not home.
4. **Today's three** — the row of small cards (a tip, a quote, a 5-minute practice, a challenge, a story or game). Optional; nothing is lost for skipping.
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
- Five tabs, named as Bee names them: **Home · Atlas · Practice · Library · Play** (each app may rename Atlas to its world, e.g. Word Atlas, Explorer's Atlas). Phone: bottom tab bar; desktop: top tabs as on Bee. The child's own page (avatar, medals, collection) opens from the avatar in the top bar.

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

## 16. Benchmarks — where to look before building

For every key element, **copy the in-family model first** (it already follows these rules and
the code is next door), then look at the outside benchmark for polish. Where a famous product
does something these rules forbid, it is listed under *Don't borrow*.

**The reference apps, in short:** Bizzing Bee is the model for the **home screen look and feel**
(the owner's chosen template), narration, game polish, rare-avatar collections and
try-before-signup. Bizzing Maths is the model for the learning loop, navigation, tests, privacy
and the single Continue. Bizzing Finance is the model for households, medals and the versioned store.
Bizzing Hive is the model for home layout, first-load weight, no-streak motivation and family
integration.

| Id | Element | Copy from (Bizzing) | What exactly | Outside benchmark | Borrow | Don't borrow |
|---|---|---|---|---|---|---|
| A1 | Welcome screen | **Bizzing Maths** | Welcome with the promise in one line and the age range ('Fast and fearless with numbers — ages 6 to 14') | Khan Academy Kids | One friendly character, one sentence, one big button | — |
| A3 | Time to first learning | **Bizzing Maths** | Name + age chip + Let's go → first question in ~5 taps; 'Find my level' starts questions at once | Duolingo | Placement questions begin before the account is finished | — |
| A4 | Profile setup | **Bizzing Maths** | viewWelcome: first name, 3 age bands, avatar; the hint 'never surname, birthday, photo, email' | Khan Academy Kids | Parent-created child profiles with a name and avatar only | — |
| A5 | Demo mode | **Bizzing Bee** | The landing 'try it' card: 8 real words with recorded audio before any account (landSay/landCheck); the Hive's ?demo sample family | Duolingo | A full first lesson before sign-up | — |
| B1 | Home layout | **Bizzing Bee** | The home grid: honeycomb backdrop, Bizzy greeting card with speech bubble, daily ring, word-of-the-hour card, two painted journey cards, tip and quote row, five tabs (owner's chosen family template) | Duolingo | One obvious next step that everything else on home supports | Hearts, gems, leagues and the streak flame on home |
| B2 | One Continue | **Bizzing Maths** | Journey card 'Continue' that deep-links to the next station (views.js journeyCard) | Duolingo | A single, large, always-the-same-place start button | — |
| B3 | Progress on home | **Bizzing Maths** | 'Station 1 of 16' meter and rank bar right beside Continue | Brilliant | Course progress shown as position on a path, not a percentage list | — |
| B6 | Navigation & back | **Bizzing Maths** | Hash routes #/nav/arg with back button and NAV_OF for sub-screens | Apple HIG tab bars | ≤ 5 tabs, back always returns inside the app | — |
| B7 | Sibling switching | **Bizzing Finance** | 'Children in this household' switch + add; each child keeps their own town, money and ladder | Khan Academy Kids / Epic | Child profiles under one grown-up, one tap to switch | — |
| C3 | Learning path | **Bizzing Maths** | 10 levels, 59 lands, 165 stops; concepts spiral across levels; land and level tests | Brilliant / DragonBox | Short ordered steps where each one builds the next | — |
| C4 | Gating & unlocks | **Bizzing Geography** | worldOpen by age band or the place before; tester mode opens gates without rewriting the child | Khan Academy | Units open on readiness; a locked item says exactly how to open it | — |
| C6 | Rank moves only on learning | **Bizzing Maths** | 9 ranks Pebble→Aryabhata, each with a sourced fact, moving only on right answers | Khan Academy | Mastery levels (Familiar → Proficient → Mastered) from evidence | XP for time, logins or games of chance |
| D1 | The why before the drill | **Bizzing Maths** | Stop tabs Story → Learn (worked steps, figure, algebra) → Your turn → Drill | Brilliant | Explain by doing: an interactive picture of why, before practice | — |
| D3 | Answer feedback | **Bizzing Maths** | Wrong answer holds: 'Not this time. It is 26' then the trick worked on the child's own question | Khan Academy | Step-by-step hints on the exact item the child got wrong | Auto-advancing past a wrong answer |
| D5 | Mastery from evidence | **Bizzing Maths** | objectives.js: goals moved only by evidence; stars at working / 70% / 90%+ pace; Leitner gaps for facts | Anki-style spacing / Khan mastery challenges | Mastery confirmed again after a gap, and re-checked over time | A 'Complete' button the child presses |
| D7 | Facts & sources | **Bizzing Geography** | Facts generated from Natural Earth data; test/data.mjs proves capitals sit inside their country | Britannica Kids | Every fact traceable to a named source | — |
| D8 | Question testing | **Bizzing Maths** | ~57k generated questions through trick, answer and plain arithmetic; leak checks; permuted options | (no consumer equivalent — Maths and Geography are the benchmark) | — | — |
| E1 | Short daily session | **Bizzing Maths** | 'Twenty facts' and 10-question drills that end on an end card | Duolingo | A 3–5 minute lesson that always ends with a clear finish screen | Daily-goal pressure and streak reminders |
| F2 | Games teach | **Bizzing Maths** | Number Rush feeds Leitner; Make the Target puzzles solved before they are served | DragonBox | The game mechanic *is* the maths, not a reward for it | Prodigy-style battles where the learning is a toll gate |
| F3 | Game polish | **Bizzing Bee** | Type Blaster: painted backdrop, combo, on-screen keyboard, 72 sound calls, confetti | Duolingo (lesson animations) / Toca Boca | Every answer moves something; a small, satisfying sound per action | — |
| F4 | Keyboard + touch | **Bizzing Maths** | One shared keypad + keyboard function (padKey); the browser check drives every game both ways | Apple accessibility guidelines | Every action reachable by keyboard and by touch | — |
| I3 | No random rewards (rarity allowed) | **Bizzing Finance** | Fixed-price wardrobe and companion items from the one wallet; keepsakes 'kept, never given'; a test that fails on any random reward | Apple Fitness limited-edition awards | Rare items earned by a named achievement, with the rule printed on the item | Gacha, packs and loot boxes (Prodigy, Roblox); paying for a chance at a rare |
| I4 | Medals from evidence | **Bizzing Finance** | 50 decision badges ('Steady hand: did nothing on a red day'), a deeds shelf, a first-receipt keepsake | Khan Academy badges / Apple Fitness awards | Earned once from real evidence, shown on a shelf with what earned it | Badges for days in a row |
| J1 | Celebration moments | **Bizzing Bee** | Confetti, sounds, level-up evolution; the Hive's medal spin-in and kudos reveal | Duolingo / Apple Fitness rings | A short, specific end-of-lesson celebration that names what was done | Comparing children or leaderboards |
| J2 | No streaks | **Bizzing Maths** | 'Nothing expires. A day off costs nothing.' and 'Not this time' on a miss; the Hive's 'good days this week' | Khan Academy Kids | No loss for a day off | Duolingo's streak and streak freeze |
| K1 | Narration | **Bizzing Bee** | 128k words each with a recorded clip, a voice review queue and clip lint | Khan Academy Kids / Epic Read-to-me | Every instruction read aloud for pre-readers; text highlighted as it is read | — |
| L1 | Visual polish | **Bizzing Maths** | Coherent graph-paper identity with painted plates | Khan Academy Kids / Toca Boca | One art direction applied to every screen and control | — |
| L4 | Phone layout | **Bizzing Maths** | Thumb-reachable keypad and tab bar; no overflow at 390px | Apple HIG | 44pt touch targets, bottom navigation, nothing past the screen edge | — |
| L5 | Accessibility | **Bizzing Maths** | Skip link, aria-labels, radio pickers with arrow keys, reduced motion, contrast tested | WCAG 2.2 AA | Contrast, focus, motion and labels as testable rules | — |
| M1 | Grown-ups report card | **Bizzing Bee** | Parent zone: band, accuracy, five readiness signals, missed-word log | IXL Analytics / Apple Screen Time weekly report | Skill-level diagnosis, plus a short weekly digest a parent actually reads | — |
| M2 | Reports learning, not usage | **Bizzing Maths** | Reports fluent facts, lapses ('slipped since fluent'), traps to help with — not minutes | IXL diagnostic | Says what the child can do now and what to work on next | Time-on-app shown as achievement |
| M3 | PIN & grown-up controls | **Bizzing Maths** | PIN stated as a deterrent, backup/restore file, delete child with confirm | Khan Academy Kids parent gate / Apple Screen Time passcode | A grown-up gate before settings and anything that changes the child | — |
| N1 | Offline / PWA | **Bizzing Maths** | sw.js hashed cache-first, manifest standalone (add PNG 192/512 icons) | Google PWA checklist | Installable, offline after first visit, proper icons | — |
| N2 | First-load weight | **Bizzing Hive** | ~1.3 MB whole build; JS ~112 KB; art as WebP files, never inlined | web.dev performance budgets | A written budget enforced in the build | — |
| N3 | Tests & gates | **Bizzing Maths** | 13 engine suites + a Chromium check on desktop and phone, each assertion proven by breaking it | (internal benchmark) | — | — |
| N4 | Storage seam & migrations | **Bizzing Finance** | One versioned store with migrations v1→v9; refuses to downgrade | (internal benchmark — Maths and Finance) | — | — |
| N5 | Privacy by construction | **Bizzing Maths** | Name + band + avatar only; no network calls; a privacy page that stays true | Apple Kids category / kidSAFE | No ads, no tracking, data minimal by design | — |
| O3 | Hive integration | **Bizzing Hive** | The tested reader of bizzing.activity and the drop-in writer + wallet helper in integration/ | Apple Family Sharing / Google Family Link | One family account that every app recognises | — |
| O4 | Family brand layer | **Bizzing Hive** | The family top bar and honeycomb mark defined in the standard | Google Workspace app switcher | The same top bar in every app so moving between them feels like one product | — |

---

## The 39 key elements (minimum 4 each)

| Area | Elements |
|---|---|
| First impression | A1 welcome · A3 time to first learning · A4 profile setup · A5 demo mode |
| Home | B1 layout · B2 one Continue · B3 progress on home · B6 navigation/back · B7 sibling switch |
| Progression | C3 learning path · C4 gating · C6 rank moves only on learning |
| Learning | D1 the why · D3 feedback · D5 mastery · D7 sources · D8 question testing |
| Sessions & games | E1 short daily session · F2 games teach · F3 game polish · F4 keyboard + touch |
| Rewards | I3 no random rewards (rarity allowed, earned or with the plan) · I4 medals from evidence · J1 celebration · J2 no streaks |
| Audio & look | K1 narration · L1 visual polish · L4 phone layout · L5 accessibility |
| Grown-ups | M1 report card · M2 learning not usage · M3 PIN & controls |
| Platform | N1 offline/PWA · N2 first-load weight · N3 tests · N4 storage seam · N5 privacy |
| Family | O3 Hive integration · O4 family brand layer |

Not in an app's own chat: **O1 entitlements, O2 pricing, O5 marketing pages, O6 locale/
currency display** — these come with the shared family server and billing, built once.
