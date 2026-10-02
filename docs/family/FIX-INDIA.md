# Bizzing India — fix brief (family audit, Oct 2026)

Paste this into the Bizzing India chat, or point that chat at this file. It is the work to bring Bizzing India to **at least 4 (strong) on every key element** and in line with the **[Bizzing family standard](https://github.com/aayuvis/Bizzing_Schedule/blob/claude/amazing-knuth-4aemgz/docs/family/FAMILY-STANDARD.md)** (read it first — it is the shared spec for currency, home, navigation, rewards, audio and performance).

- **Repo:** `aayuvis/bizzingindia.com` — app in `app/`. Follow the repo's own CLAUDE.md for branch, tests and deploy.
- **Audited:** claude/bizzingindia-github-pages-8qsv38 @ b36a8520 (newest code at audit time).
- **Today:** average **3.2** across 67 elements; **28 of 39 key elements below 4**.
- **Verdict:** Bizzing India is the richest content app in the family: 344 narrated, illustrated stories, a mist-lifting map, nine properly typeset Indian-language packs with spaced repetition, and fourteen games. The product shell lags well behind that content. There is one child per device, browser back exits the app, the grown-ups' controls (including a developer unlock) sit open on the child's page, 11.6 MB of JS loads on first open, and there is no demo, price, parent report or Hive integration.
- **Context:** India has the family's best stories (344 narrated, illustrated, sourced) and best Indic typography — protect both. All editorial rules in docs/05 still bind. Another Claude session is actively working on this repo; coordinate before large refactors.

## How to work this brief

1. Do **Fix first** in one commit, deploy, and confirm.
2. Work the **key elements** table top to bottom (it is ordered by area); batch related rows into one commit each.
3. Apply **Harmonise** — these are changes every app is making at the same time, so do them as written.
4. For every row, add the check in **Done when** to the app's tests and **prove it by breaking it once**.
5. Finish with the **Definition of done** below and report back the new scores.

## 1. Fix first (trust)

- **Gate the grown-ups area behind a PIN.** Today it sits on the child's Me page with no PIN, and a child can tap **Developer unlock** (opens every world and avatar pack) or **Start again** (wipes the profile). Remove the developer unlock from production entirely; tester mode only.
- **Fix the back button:** browser back from the map leaves the app (about:blank). Put view + arg in `location.hash` and handle `popstate`.
- **Fill `sources[]` on every Dharma object** — `data-dharma.js` has none across all four faiths, against the repo's own rule 2.
- **Call the parent report:** Paathshala `report()` (paath.js:1778) is never called.

## 2. Key elements below 4

| Id | Element | Now | What the audit saw | Change | Done when | Effort |
|---|---|---|---|---|---|---|
| A3 | Time to first learning | **3** | Measured 8 taps through 5–6 onboarding steps to Home, +1 to first story; Bhasha lesson needs Bhasha tab → Start. | Let 'Read it →' on landing play tonight's story immediately, onboarding after the first story. | First real question or lesson within 3 taps of finishing setup; asserted in the browser check. | M |
| A5 | Demo mode | **1** | No demo: 'I have an account' and 'Read it →' both just open onboarding (app.js:6576); no guest/sample profile. | Add a guest mode that opens one story and one Hindi lesson before any setup. | `?demo` opens a labelled sample child with weeks of progress; never touches the real household or shared feeds. | M |
| B1 | Home layout | **3** | Home desktop: greeting+deed+word, ring, Stories/India cards, Ask Dadi, subhashita, 3 tiles, yatra stats, mala — 9 blocks; phone CTA below fold. | Cut to greeting, one Continue card, today's ring; move nuggets below the fold. | Home follows the family anatomy (top bar, greeting, ONE Continue, Today's three, ≤ 6 tiles); Continue above the fold at 390×844. | M |
| B2 | One Continue | **3** | 'Start — hear a story' sits inside Today's ring; on 390px it is below the fold under 'I did it' deed button. | Make one 'Continue: <next lesson/story>' button the first thing on phone home. | Exactly one filled-primary button on home, computed by one next-step function shared by every screen; test counts primary buttons = 1. | S |
| B3 | Progress on home | **3** | 'Your yatra' block: stories 0/344, places 0/34, beads, verses; ring 0/3 — near page bottom; 34 vs 36 places inconsistent. | Surface a compact progress strip near the top and reconcile place counts. | Home shows where the child is (level/world + progress bar) next to Continue. | S |
| B6 | Navigation & back | **2** | 7 tabs desktop, 5+More phone bar, backlinks; but no hash/history: goBack() from map left the app to about:blank; no deep links. | Put view+arg in location.hash and handle popstate so back and shared links work. | Every screen has a hash route; browser back never leaves the app; `#/continue` and `?from=hive` work; tested. | M |
| B7 | Sibling switching | **1** | Single profile object S in bi_v1 (app.js:73); no child list or switcher; 'Start again' wipes everything. | Make state a household {kids[],active} with a switcher behind the grown-up gate. | Household of children with a switcher in the top bar; switching never mixes data; tested with two children. | L |
| C4 | Gating & unlocks | **3** | Age band hides hard history; project locked until test; worlds/packs locked by sikke; premium course 'A grown-up unlocks this'. | Gate on demonstrated mastery, not coins, and explain each lock in child words. | Unlocks by age band or the step before; never a dead end; locked items say how to open them. | M |
| C6 | Rank moves only on learning | **2** | 8 Gurukul ranks at 60 XP each (app.js:94); XP == sikke from anything incl. Ludo/Saap-Sidi luck; tops out at 420 XP. | Drive rank from mastered objectives and Bhasha rungs only, never game coins. | Rank/level moves only on right answers or mastery; games of chance, time and coins never move it; tested. | S |
| D3 | Answer feedback | **3** | Wrong shows correct option + sentence explanation, but auto-advances after 2.6s (app.js:7151) — does not hold until dismissed. | Hold wrong answers until the child taps Continue; replay audio of the right one. | Right answers advance; wrong answers hold until tapped and show why; never auto-advance on wrong. | S |
| D7 | Facts & sources | **3** | 14/14 eras carry sources; every story has a prose 'source'; but data-dharma.js has 0 sources across 4 faiths, against CLAUDE.md rule 2. | Fill sources[] on every Dharma object and give citations, not prose attributions. | Every fact derives from data or carries `sources[]`; a data-lint test fails on missing sources or self-contradicting numbers. | M |
| E1 | Short daily session | **3** | Lessons 'about five minutes'; 'If you only have five minutes' tile; lesson end dropped straight back to pack page, no wrap-up. | Add a 5-minute 'Aaj ka' session: one story + one lesson + review, with a clean finish card. | A 5–10 minute daily session that ends cleanly with a summary of what was practised. | M |
| F2 | Games teach | **3** | State Hunt/Gyanpati/Shabd teach; Ludo and Saap-Sidi are pure dice yet pay sikke and XP; Gyanpati doubles a pot (press-your-luck). | Pay nothing for luck games; score quizzes on accuracy, not pot size. | Every game is scored on the learning decision, never luck; no betting or doubling. | S |
| F3 | Game polish | **3** | Boards drawn as crafted objects, dice tumble; but no sound effects in any game except Sabhyata (one AudioContext). | Add a small, mutable SFX set (tap, right, wrong, win) shared by all games. | Every game meets standard §10: title card, how-to, motion on every answer, sound, finish screen. | M |
| I3 | No random rewards (rarity allowed) | **3** | Earned-only coins, sacred never drawn, no duplicates (economy.js rules) — but 'Open the pitara' is still a random draw of real people. | Replace the random draw with a choose-your-next card bought with earned coins. | No random rewards, packs, rarity tiers or paid cosmetics; everything earnable with coins at a fixed price. | S |
| I4 | Medals from evidence | **2** | No badges/medals; progress tokens are lit states, mala beads (self-reported 'I did it'), cards collected. | Add evidence-based medals (first rung mastered, 10 states lit) celebrated once. | A medal shelf of evidence-earned medals in the family medallion style, each celebrated once. | M |
| J1 | Celebration moments | **3** | Toast '🐚 +12 · story finished', 'mist lifted off Tamil Nadu' card; no celebration screen at lesson end. | Add a short end-of-lesson celebration naming what was learned. | Specific celebration on finishes and milestones (motion + sound), never comparing children. | S |
| J2 | No streaks | **3** | No shaming copy; but '🪔 N-day streak' on home and a streak pill on the map (app.js:888,1949); press-your-luck quiz. | Replace streak count with 'good days this week' as Schedule does. | No streak counts, freezes or "days in a row"; "good days this week" at most; a test fails on streak copy. | S |
| L4 | Phone layout | **3** | No horizontal overflow at 390; bottom tab bar; but ~120px header, home CTA below fold, map labels unreadable, timeline clipped ('300 BCE'). | Collapse top bar controls into one row/menu on phone and enlarge map labels. | No element past the device width at 390px (measured against the viewport you set, not innerWidth); thumb-reachable tabs. | M |
| L5 | Accessibility | **3** | focus-visible outlines, 52 aria-labels, reduced-motion respected in 8+ places; text over busy backdrops lowers contrast. | Run an automated contrast audit per world and fix text over backdrops. | WCAG AA contrast in every theme and mode, visible focus, reduced motion respected, labelled controls; tested. | M |
| M1 | Grown-ups report card | **2** | Only Bhasha 'How it is going' page; Paathshala report() (paath.js:1778) is never called anywhere. | Build one grown-ups page aggregating Bhasha, Paathshala and map mastery. | Grown-ups report card with Time · Progress · Mastery per child, in the family format the Hive can merge. | M |
| M2 | Reports learning, not usage | **3** | Bhasha report lists grammar met and rungs, never minutes; Paathshala report designed for objectives but not shown. | Surface mastered objectives with dates of evidence per child. | The report states what the child can now do (from evidence), not only minutes and taps. | M |
| M3 | PIN & grown-up controls | **2** | 'Grown-ups' card on child's Me page, no PIN; child can tap Developer unlock (opens all worlds/packs) and Start again; no export. | Put grown-up settings behind a PIN gate and remove dev unlock from production. | Grown-ups area behind a PIN; no dev/tester unlocks or XP buttons outside tester mode; backup, restore, erase. | S |
| N2 | First-load weight | **2** | 90 synchronous scripts, 11.6 MB JS on first load (data-bhasha-hi-passages.js 3.5 MB); 793 MB app folder. | Lazy-load data packs per section; ship only the shell and home data at boot. | First screen ≤ 1.5 MB transferred on a phone; initial JS ≤ 400 KB gzipped; data and art lazy per route. | M |
| N3 | Tests & gates | **3** | tools/: verify.js view walk, test-bhasha (649 pass), check-paath, qc-paath; no npm test, no CI or deploy gate runs them. | Add npm test and make deploy.sh and CI refuse to ship on failure. | Engine tests + browser check (desktop and phone) run before every deploy; each assertion proven by breaking it. | S |
| N4 | Storage seam & migrations | **2** | Store seam exists (app.js:12) but schemaVersion 1, no-op migrate; kauris migration inline; entitlements/sabhyata/games/downloads hit localStorage directly. | Route every key through Store with versioned vN_to_vN+1 steps. | All storage behind one versioned Store seam with `vN_to_vN+1` migrations; tested. | M |
| O3 | Hive integration | **1** | No bizzing.activity writes and no deep links (grep finds none); no hash routes for Hive to open. | Write bizzing.activity on story/lesson finish and expose hash deep links. | Writes `bizzing.activity` (minutes + milestones) via the family drop-in; accepts `#/continue` and `?from=hive`; top bar ⬡ back to Hive. | S |
| O4 | Family brand layer | **3** | Peacock mark, Gattu, Bee-style rank ladder, data-act idiom; but own tokens.css, own avatars, coin shown as both 🪙 and 🐚. | Adopt shared family tokens and one coin glyph; align avatar set naming. | Family top bar, honeycomb mark, Continue card shape, medallion medals and the shared avatar set are in place. | M |

Already at 4 or 5 (keep them there): A1 Welcome screen, A4 Profile setup, C3 Learning path, D1 The why before the drill, D5 Mastery from evidence, D8 Question testing, F4 Keyboard + touch, K1 Narration, L1 Visual polish, N1 Offline / PWA, N5 Privacy by construction.

## 3a. Draw inspiration from

For each element below 4, copy the in-family model first, then the outside benchmark. Full table in the family standard §16.

| Id | Element | Copy from (Bizzing) | What exactly | Outside benchmark | Don't borrow |
|---|---|---|---|---|---|
| A3 | Time to first learning | **Bizzing Maths** | Name + age chip + Let's go → first question in ~5 taps; 'Find my level' starts questions at once | Duolingo: Placement questions begin before the account is finished | — |
| A5 | Demo mode | **Bizzing Bee** | The landing 'try it' card: 8 real words with recorded audio before any account (landSay/landCheck); the Hive's ?demo sample family | Duolingo: A full first lesson before sign-up | — |
| B1 | Home layout | **Bizzing Bee** | The home grid: honeycomb backdrop, Bizzy greeting card with speech bubble, daily ring, word-of-the-hour card, two painted journey cards, tip and quote row, five tabs (owner's chosen family template) | Duolingo: One obvious next step that everything else on home supports | Hearts, gems, leagues and the streak flame on home |
| B2 | One Continue | **Bizzing Maths** | Journey card 'Continue' that deep-links to the next station (views.js journeyCard) | Duolingo: A single, large, always-the-same-place start button | — |
| B3 | Progress on home | **Bizzing Maths** | 'Station 1 of 16' meter and rank bar right beside Continue | Brilliant: Course progress shown as position on a path, not a percentage list | — |
| B6 | Navigation & back | **Bizzing Maths** | Hash routes #/nav/arg with back button and NAV_OF for sub-screens | Apple HIG tab bars: ≤ 5 tabs, back always returns inside the app | — |
| B7 | Sibling switching | **Bizzing Finance** | 'Children in this household' switch + add; each child keeps their own town, money and ladder | Khan Academy Kids / Epic: Child profiles under one grown-up, one tap to switch | — |
| C4 | Gating & unlocks | **Bizzing Geography** | worldOpen by age band or the place before; tester mode opens gates without rewriting the child | Khan Academy: Units open on readiness; a locked item says exactly how to open it | — |
| C6 | Rank moves only on learning | **Bizzing Maths** | 9 ranks Pebble→Aryabhata, each with a sourced fact, moving only on right answers | Khan Academy: Mastery levels (Familiar → Proficient → Mastered) from evidence | XP for time, logins or games of chance |
| D3 | Answer feedback | **Bizzing Maths** | Wrong answer holds: 'Not this time. It is 26' then the trick worked on the child's own question | Khan Academy: Step-by-step hints on the exact item the child got wrong | Auto-advancing past a wrong answer |
| D7 | Facts & sources | **Bizzing Geography** | Facts generated from Natural Earth data; test/data.mjs proves capitals sit inside their country | Britannica Kids: Every fact traceable to a named source | — |
| E1 | Short daily session | **Bizzing Maths** | 'Twenty facts' and 10-question drills that end on an end card | Duolingo: A 3–5 minute lesson that always ends with a clear finish screen | Daily-goal pressure and streak reminders |
| F2 | Games teach | **Bizzing Maths** | Number Rush feeds Leitner; Make the Target puzzles solved before they are served | DragonBox: The game mechanic *is* the maths, not a reward for it | Prodigy-style battles where the learning is a toll gate |
| F3 | Game polish | **Bizzing Bee** | Type Blaster: painted backdrop, combo, on-screen keyboard, 72 sound calls, confetti | Duolingo (lesson animations) / Toca Boca: Every answer moves something; a small, satisfying sound per action | — |
| I3 | No random rewards (rarity allowed) | **Bizzing Finance** | Fixed-price wardrobe and companion items from the one wallet; keepsakes 'kept, never given'; a test that fails on any random reward | Apple Fitness limited-edition awards: Rare items earned by a named achievement, with the rule printed on the item | Gacha, packs and loot boxes (Prodigy, Roblox); paying for a chance at a rare |
| I4 | Medals from evidence | **Bizzing Finance** | 50 decision badges ('Steady hand: did nothing on a red day'), a deeds shelf, a first-receipt keepsake | Khan Academy badges / Apple Fitness awards: Earned once from real evidence, shown on a shelf with what earned it | Badges for days in a row |
| J1 | Celebration moments | **Bizzing Bee** | Confetti, sounds, level-up evolution; the Hive's medal spin-in and kudos reveal | Duolingo / Apple Fitness rings: A short, specific end-of-lesson celebration that names what was done | Comparing children or leaderboards |
| J2 | No streaks | **Bizzing Maths** | 'Nothing expires. A day off costs nothing.' and 'Not this time' on a miss; the Hive's 'good days this week' | Khan Academy Kids: No loss for a day off | Duolingo's streak and streak freeze |
| L4 | Phone layout | **Bizzing Maths** | Thumb-reachable keypad and tab bar; no overflow at 390px | Apple HIG: 44pt touch targets, bottom navigation, nothing past the screen edge | — |
| L5 | Accessibility | **Bizzing Maths** | Skip link, aria-labels, radio pickers with arrow keys, reduced motion, contrast tested | WCAG 2.2 AA: Contrast, focus, motion and labels as testable rules | — |
| M1 | Grown-ups report card | **Bizzing Bee** | Parent zone: band, accuracy, five readiness signals, missed-word log | IXL Analytics / Apple Screen Time weekly report: Skill-level diagnosis, plus a short weekly digest a parent actually reads | — |
| M2 | Reports learning, not usage | **Bizzing Maths** | Reports fluent facts, lapses ('slipped since fluent'), traps to help with — not minutes | IXL diagnostic: Says what the child can do now and what to work on next | Time-on-app shown as achievement |
| M3 | PIN & grown-up controls | **Bizzing Maths** | PIN stated as a deterrent, backup/restore file, delete child with confirm | Khan Academy Kids parent gate / Apple Screen Time passcode: A grown-up gate before settings and anything that changes the child | — |
| N2 | First-load weight | **Bizzing Hive** | ~1.3 MB whole build; JS ~112 KB; art as WebP files, never inlined | web.dev performance budgets: A written budget enforced in the build | — |
| N3 | Tests & gates | **Bizzing Maths** | 13 engine suites + a Chromium check on desktop and phone, each assertion proven by breaking it | (internal benchmark) | — |
| N4 | Storage seam & migrations | **Bizzing Finance** | One versioned store with migrations v1→v9; refuses to downgrade | (internal benchmark — Maths and Finance) | — |
| O3 | Hive integration | **Bizzing Hive** | The tested reader of bizzing.activity and the drop-in writer + wallet helper in integration/ | Apple Family Sharing / Google Family Link: One family account that every app recognises | — |
| O4 | Family brand layer | **Bizzing Hive** | The family top bar and honeycomb mark defined in the standard | Google Workspace app switcher: The same top bar in every app so moving between them feels like one product | — |

## 3. Harmonise with the family

- **Currency:** retire sikke and shells into Bizzing coins 1:1. Coins only for learning at the standard amounts — **not** from Ludo or Saap-Sidi dice.
- **Rank:** drive Gurukul ranks from mastered objectives and Bhasha rungs only, never from game coins (today XP == sikke, including dice luck).
- **No gambling:** remove the Gyanpati press-your-luck pot that doubles shells; replace the random "Open the pitara" draw with choose-your-next at a fixed coin price.
- **Streaks:** remove the "🪔 N-day streak" on home and the streak pill on the map; "good days this week" at most.
- **Feedback:** wrong answers currently auto-advance after 2.6 s — hold until tapped, and explain.
- **Medals:** evidence medals (first Bhasha rung mastered, 10 states lit), family medallion style.
- **Home:** one Continue at the top on phones (today "Start — hear a story" sits below the fold under the deed button).
- **Siblings:** a household with the top-bar switcher (today one child per device).
- **Weight:** 90 synchronous scripts and 11.6 MB of JS before home → ship only the shell and home data at boot; lazy-load data packs per section.
- **Storage:** move to a versioned Store seam with migrations.
- **Family top bar** (standard §3): ⬡ back to Hive · app name · theme · 🔒 grown-ups · avatar ▾ child switcher, 56px, same order as every app.
- **Hive integration** (standard §13): copy `integration/bizzing-activity.js` and `integration/bizzing-wallet.js` from the Bizzing_Schedule repo. Call `trackActivity('<app id>', () => activeChild()?.name)` at start-up and `trackMilestone(...)` when a band, world, stop or mastery is reached; pay coins only through `earn()` and charge through `spend()`. App ids: `bee`, `maths`, `geography`, `india`, `finance`. Accept `#/continue` and `?from=hive`.
- **Grown-ups report card** in the family format: Time · Progress · Mastery per child.
- **Demo mode** at `?demo` (standard §14).

## 4. Not in this chat

Entitlements (O1), pricing (O2), marketing pages (O5) and locale/currency display (O6) come with the shared family server and billing, built once for every app. Do not build app-local paywalls.

## 5. Definition of done

- [ ] Every Fix-first item shipped and tested.
- [ ] Every key element above at **≥ 4**, each with its Done-when check in the test suite.
- [ ] Harmonise items done; old currency migrated 1:1 with a store migration step.
- [ ] Browser check passes on desktop and phone: back stays in app · one primary button on home · PIN on grown-ups · no third-party requests · no overflow at 390px (device width) · contrast in every theme · activity feed written · coins only from standard events.
- [ ] Deployed per the repo's CLAUDE.md; reply with the commit and a re-score of the rows you changed.
