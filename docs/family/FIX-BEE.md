# Bizzing Bee — fix brief (family audit, Oct 2026)

Paste this into the Bizzing Bee chat, or point that chat at this file. It is the work to bring Bizzing Bee to **at least 4 (strong) on every key element** and in line with the **[Bizzing family standard](https://github.com/aayuvis/Bizzing_Schedule/blob/claude/amazing-knuth-4aemgz/docs/family/FAMILY-STANDARD.md)** (read it first — it is the shared spec for currency, home, navigation, rewards, audio and performance).

- **Repo:** `aayuvis/Bizzing-Bee` — app in `spellbound-app/`. Follow the repo's own CLAUDE.md for branch, tests and deploy.
- **Audited:** claude/bizzing-bee-publication-ncxwdf @ 6a80e104c (newest code at audit time).
- **Today:** average **3.4** across 67 elements; **24 of 39 key elements below 4**.
- **Verdict:** Bizzing Bee is the family's richest app: a 128k-word fully voiced library, a painted Atlas, 14+ spelling-driven games and deep concept explainers, all polished on desktop and phone. It is held back by streak/rarity mechanics, self-markable never-decaying mastery, three competing home CTAs, and a 41MB first load with no PWA. Commercial plumbing (entitlements, billing, Hive feed) is still client-side or absent.
- **Context:** Bee is the richest app (128k voiced words, 14+ games, deep library) — protect that. Its 46 test files expect a different Chromium path and have no runner: make them run (`npm test`) as part of N3.

## How to work this brief

1. Do **Fix first** in one commit, deploy, and confirm.
2. Work the **key elements** table top to bottom (it is ordered by area); batch related rows into one commit each.
3. Apply **Harmonise** — these are changes every app is making at the same time, so do them as written.
4. For every row, add the check in **Done when** to the app's tests and **prove it by breaking it once**.
5. Finish with the **Definition of done** below and report back the new scores.

## 1. Fix first (trust)

- **Remove the seeded admin/admin account** from `auth.js` (and any default credentials). Add a test that fails if any default login exists.
- Make the parent PIN **mandatory** before any purchase or plan screen.
- Fix the **97 "often misspelled" entries** that equal the word itself (e.g. "army"); add a data-lint test (`m ≠ w`).
- Correct the misattributed "Native American Proverb" quote; quotes need a sourced attribution or are removed.

## 2. Key elements below 4

| Id | Element | Now | What the audit saw | Change | Done when | Effort |
|---|---|---|---|---|---|---|
| A3 | Time to first learning | **3** | Landing → signup (email+password) → 5 onboarding steps → home ≈12 taps; then a cinematic splash needing two taps before the first word. | Skip the splash on first run and drop the child straight into the first Atlas stop after the goal step. | First real question or lesson within 3 taps of finishing setup; asserted in the browser check. | S |
| B1 | Home layout | **3** | Home (desk-04): greeting, 3-ring goal, Word of the hour, two journey cards, tip, quote — 7 cards, roughly equal weight. | Keep the layout exactly — it is the family template (owner's decision). Give "Next on your journey" the only filled button and make every other card visibly secondary. | Home follows the family anatomy (top bar, greeting, ONE Continue, Today's three, ≤ 6 tiles); Continue above the fold at 390×844. | S |
| B2 | One Continue | **2** | Home shows three competing CTAs: 'Find your level · Start', Atlas 'Start', and Journey 'Practise' — no single next step. | Collapse to one primary 'Continue' button computed from placement + atlas frontier; others become secondary links. | Exactly one filled-primary button on home, computed by one next-step function shared by every screen; test counts primary buttons = 1. | S |
| B3 | Progress on home | **3** | Stage 1 of 20 bar, 'first stop · Tier 1', goal rings 0/10 — present but scattered across cards. | One unified progress strip: current Atlas region, stage, words mastered this week. | Home shows where the child is (level/world + progress bar) next to Continue. | S |
| B6 | Navigation & back | **3** | 5-tab top bar on desktop, bottom tab bar on phone, back pills; no URL hash routing, so browser back/deep links don't work. | Mirror state.nav into location.hash and handle popstate so phone back and deep links work. | Every screen has a hash route; browser back never leaves the app; `#/continue` and `?from=hive` work; tested. | M |
| B7 | Sibling switching | **3** | Parent zone 'Add child', speller list with Active; switching sits in drawer/parent, not on the home header. | Add a one-tap avatar switcher in the header with per-child PIN-free switch. | Household of children with a switcher in the top bar; switching never mixes data; tested with two children. | S |
| C4 | Gating & unlocks | **3** | Stops open in order; stage opens on mastering 24 words or passing Champ Challenge; many paywall locks (Advanced $299, plans). | Separate learning locks from paywall locks visually; never show a padlock-with-price to a child. | Unlocks by age band or the step before; never a dead end; locked items say how to open them. | M |
| C6 | Rank moves only on learning | **3** | Bee Band (difficulty) separate from 10-form bee evolution which grows on words spelled right; evo tab explains it honestly. | Collapse to fewer visible meters; Band, Stage, Tier, Evolution and Level is too many ladders. | Rank/level moves only on right answers or mastery; games of chance, time and coins never move it; tested. | M |
| D3 | Answer feedback | **3** | Wrong (phone-04): '✗ Not quite — it's "army". Saved for revision' + Check again; no letter-diff or rule shown; mascot frowns. | Show a letter-by-letter diff and the trick/concept that explains the miss; keep the mascot neutral. | Right answers advance; wrong answers hold until tapped and show why; never auto-advance on wrong. | M |
| D5 | Mastery from evidence | **2** | markMastered (app3.js:7068) sets luMastered once true and never decays; 'Complete' button on a card self-marks mastery. | Require spaced correct recalls on separate days for mastery; remove self-mark from counting. | Mastery needs right answers spaced over time; the child cannot self-mark mastery; mastery decays and is re-checked. | M |
| D7 | Facts & sources | **2** | 97 of 7,667 'often misspelled' entries equal the word itself (army shows 'Often misspelled "army"'); quote misattributed 'Native American Proverb'. | Add a data-lint test: m≠w, quote attributions sourced; fix the 97 entries. | Every fact derives from data or carries `sources[]`; a data-lint test fails on missing sources or self-contradicting numbers. | S |
| D8 | Question testing | **3** | Definition text masked per CLAUDE.md; Finish-the-Sentence beeps the word; header search could reveal spelling mid-drill. | Disable header search/finder while a drill or game word is live; add a generated leak test across all modes. | Generated questions tested: one right answer, not in the text, distinct options, even answer slots. | S |
| I3 | No random rewards (rarity allowed) | **2** | Avatars have RARE/EPIC/LEGENDARY rarity and OVR stats, locked behind 'Plan' (paid tier); coin shop sells worlds/concepts. | Keep rarity and paid-plan rare avatars (owner's decision). Put the unlock rule on every rare card; remove any random draw; coins buy cosmetics only. | Every rare avatar names its unlock (milestone or plan); no random rewards anywhere; coin shop sells no content; tested. | S |
| I4 | Medals from evidence | **3** | 80 badges in My Hive; streak badges up to 100 days, mastery badges (First Ten…Word Wizard). | Replace streak badges with evidence badges (concepts mastered, traps conquered). | A medal shelf of evidence-earned medals in the family medallion style, each celebrated once. | S |
| J2 | No streaks | **2** | Streak card with rewards at 3/7/14/30 days, Streak Freeze item, streak badges to 100 days (app3.js:492, 6279); frowning mascot on a miss. | Replace streak with 'good days this week', remove freezes and streak rewards, keep mascot kind on misses. | No streak counts, freezes or "days in a row"; "good days this week" at most; a test fails on streak copy. | S |
| L5 | Accessibility | **3** | 83 aria-labels across main files, 14 prefers-reduced-motion rules, 8 focus-visible; heavy inline-style buttons, long splash animation. | Add an automated axe pass and label every icon-only button. | WCAG AA contrast in every theme and mode, visible focus, reduced motion respected, labelled controls; tested. | M |
| M2 | Reports learning, not usage | **3** | Signals: consistency, accuracy, coverage, review health, readiness; but mastery is self-markable and never decays. | Report retained-on-a-later-day mastery per concept, not cumulative counts. | The report states what the child can now do (from evidence), not only minutes and taps. | M |
| M3 | PIN & grown-up controls | **3** | 4-digit parent PIN (optional, off by default), remove speller, research capture export; seeded admin/admin account in auth.js. | Make PIN mandatory before purchase screens; remove the shipped admin/admin seed; add full data export. | Grown-ups area behind a PIN; no dev/tester unlocks or XP buttons outside tester mode; backup, restore, erase. | S |
| N1 | Offline / PWA | **2** | No service worker or web manifest; works offline only when the folder is opened locally; hosted clips stream from GitHub. | Add a SW with core-cache and a manifest so it installs and runs offline. | Service worker + manifest; works offline after first visit; installable. | M |
| N2 | First-load weight | **1** | First load transfers ~41MB on desktop (29MB phone): words-data 2.2MB, app3 1.26MB, many data files eagerly loaded. | Lazy-load word shards and trivia, minify, code-split app3; target <2MB first load. | First screen ≤ 1.5 MB transferred on a phone; initial JS ≤ 400 KB gzipped; data and art lazy per route. | L |
| N3 | Tests & gates | **3** | 46 Playwright .cjs tests in tests/ plus qa/; no package.json runner or CI; hard-coded chromium paths. | Add a single npm test runner and CI workflow that runs all suites on every push. | Engine tests + browser check (desktop and phone) run before every deploy; each assertion proven by breaking it. | M |
| N4 | Storage seam & migrations | **2** | One blob save to localStorage 'sb_saas_v2' (app3.js:11737); 26+ direct localStorage calls in app3; ad-hoc one-off migrations. | Introduce a Store module with versioned vN→vN+1 steps and route every key through it. | All storage behind one versioned Store seam with `vN_to_vN+1` migrations; tested. | M |
| N5 | Privacy by construction | **3** | Age band not birthdate, local-only, opt-in telemetry; but parent email+password required and admin/admin seeded. | Make accounts optional locally, drop the seed, keep the privacy page matched by tests. | Only first name, age band, avatar; no third-party requests (bar named exceptions); no seeded accounts; privacy page true. | S |
| O3 | Hive integration | **1** | No reference to bizzing.activity anywhere in the codebase; no Hive deep links. | Import integration/bizzing-activity.js and write session minutes/words on each finish. | Writes `bizzing.activity` (minutes + milestones) via the family drop-in; accepts `#/continue` and `?from=hive`; top bar ⬡ back to Hive. | S |

Already at 4 or 5 (keep them there): A1 Welcome screen, A4 Profile setup, A5 Demo mode, C3 Learning path, D1 The why before the drill, E1 Short daily session, F2 Games teach, F3 Game polish, F4 Keyboard + touch, J1 Celebration moments, K1 Narration, L1 Visual polish, L4 Phone layout, M1 Grown-ups report card, O4 Family brand layer.

## 3a. Draw inspiration from

For each element below 4, copy the in-family model first, then the outside benchmark. Full table in the family standard §16.

| Id | Element | Copy from (Bizzing) | What exactly | Outside benchmark | Don't borrow |
|---|---|---|---|---|---|
| A3 | Time to first learning | **Bizzing Maths** | Name + age chip + Let's go → first question in ~5 taps; 'Find my level' starts questions at once | Duolingo: Placement questions begin before the account is finished | — |
| B1 | Home layout | **Bizzing Bee (you)** | You are the family template — keep the look; fix only the button hierarchy; see Bizzing Maths's journey card for the single Continue | Duolingo: One obvious next step that everything else on home supports | Hearts, gems, leagues and the streak flame on home |
| B2 | One Continue | **Bizzing Maths** | Journey card 'Continue' that deep-links to the next station (views.js journeyCard) | Duolingo: A single, large, always-the-same-place start button | — |
| B3 | Progress on home | **Bizzing Maths** | 'Station 1 of 16' meter and rank bar right beside Continue | Brilliant: Course progress shown as position on a path, not a percentage list | — |
| B6 | Navigation & back | **Bizzing Maths** | Hash routes #/nav/arg with back button and NAV_OF for sub-screens | Apple HIG tab bars: ≤ 5 tabs, back always returns inside the app | — |
| B7 | Sibling switching | **Bizzing Finance** | 'Children in this household' switch + add; each child keeps their own town, money and ladder | Khan Academy Kids / Epic: Child profiles under one grown-up, one tap to switch | — |
| C4 | Gating & unlocks | **Bizzing Geography** | worldOpen by age band or the place before; tester mode opens gates without rewriting the child | Khan Academy: Units open on readiness; a locked item says exactly how to open it | — |
| C6 | Rank moves only on learning | **Bizzing Maths** | 9 ranks Pebble→Aryabhata, each with a sourced fact, moving only on right answers | Khan Academy: Mastery levels (Familiar → Proficient → Mastered) from evidence | XP for time, logins or games of chance |
| D3 | Answer feedback | **Bizzing Maths** | Wrong answer holds: 'Not this time. It is 26' then the trick worked on the child's own question | Khan Academy: Step-by-step hints on the exact item the child got wrong | Auto-advancing past a wrong answer |
| D5 | Mastery from evidence | **Bizzing Maths** | objectives.js: goals moved only by evidence; stars at working / 70% / 90%+ pace; Leitner gaps for facts | Anki-style spacing / Khan mastery challenges: Mastery confirmed again after a gap, and re-checked over time | A 'Complete' button the child presses |
| D7 | Facts & sources | **Bizzing Geography** | Facts generated from Natural Earth data; test/data.mjs proves capitals sit inside their country | Britannica Kids: Every fact traceable to a named source | — |
| D8 | Question testing | **Bizzing Maths** | ~57k generated questions through trick, answer and plain arithmetic; leak checks; permuted options | (no consumer equivalent — Maths and Geography are the benchmark) | — |
| I3 | No random rewards (rarity allowed) | **Bizzing Finance** | Fixed-price wardrobe and companion items from the one wallet; keepsakes 'kept, never given'; a test that fails on any random reward | Apple Fitness limited-edition awards: Rare items earned by a named achievement, with the rule printed on the item | Gacha, packs and loot boxes (Prodigy, Roblox); paying for a chance at a rare |
| I4 | Medals from evidence | **Bizzing Finance** | 50 decision badges ('Steady hand: did nothing on a red day'), a deeds shelf, a first-receipt keepsake | Khan Academy badges / Apple Fitness awards: Earned once from real evidence, shown on a shelf with what earned it | Badges for days in a row |
| J2 | No streaks | **Bizzing Maths** | 'Nothing expires. A day off costs nothing.' and 'Not this time' on a miss; the Hive's 'good days this week' | Khan Academy Kids: No loss for a day off | Duolingo's streak and streak freeze |
| L5 | Accessibility | **Bizzing Maths** | Skip link, aria-labels, radio pickers with arrow keys, reduced motion, contrast tested | WCAG 2.2 AA: Contrast, focus, motion and labels as testable rules | — |
| M2 | Reports learning, not usage | **Bizzing Maths** | Reports fluent facts, lapses ('slipped since fluent'), traps to help with — not minutes | IXL diagnostic: Says what the child can do now and what to work on next | Time-on-app shown as achievement |
| M3 | PIN & grown-up controls | **Bizzing Maths** | PIN stated as a deterrent, backup/restore file, delete child with confirm | Khan Academy Kids parent gate / Apple Screen Time passcode: A grown-up gate before settings and anything that changes the child | — |
| N1 | Offline / PWA | **Bizzing Maths** | sw.js hashed cache-first, manifest standalone (add PNG 192/512 icons) | Google PWA checklist: Installable, offline after first visit, proper icons | — |
| N2 | First-load weight | **Bizzing Hive** | ~1.3 MB whole build; JS ~112 KB; art as WebP files, never inlined | web.dev performance budgets: A written budget enforced in the build | — |
| N3 | Tests & gates | **Bizzing Maths** | 13 engine suites + a Chromium check on desktop and phone, each assertion proven by breaking it | (internal benchmark) | — |
| N4 | Storage seam & migrations | **Bizzing Finance** | One versioned store with migrations v1→v9; refuses to downgrade | (internal benchmark — Maths and Finance) | — |
| N5 | Privacy by construction | **Bizzing Maths** | Name + band + avatar only; no network calls; a privacy page that stays true | Apple Kids category / kidSAFE: No ads, no tracking, data minimal by design | — |
| O3 | Hive integration | **Bizzing Hive** | The tested reader of bizzing.activity and the drop-in writer + wallet helper in integration/ | Apple Family Sharing / Google Family Link: One family account that every app recognises | — |

## 3. Harmonise with the family

- **Currency:** retire Bee coins into Bizzing coins 1:1 (`bizzing.wallet`). The coin shop keeps fixed-price cosmetics only; content (worlds, concepts) is never bought with coins.
- **Rewards:** remove streak rewards (3/7/14/30 days), the Streak Freeze item and streak badges; replace with "good days this week". Mascot never frowns on a miss.
- **Avatars (owner's decision: rare avatars stay):** keep RARE/EPIC/LEGENDARY tiers, the trading-card design and paid-plan rare avatars. Each rare card must say exactly how it unlocks — a named learning milestone or "comes with the plan". No random draws or packs; the coin shop sells cosmetics only, never worlds or concepts.
- **Ladders:** collapse Band, Stage, Tier, Evolution and Level into one visible level that moves on spelling right (Bee Band can stay as the difficulty measure underneath).
- **Home (owner's decision: Bee's home is the family template):** keep its look exactly. Change only the buttons: "Next on your journey" holds the single filled Start; the Bizzing Bee Journey keeps an outline Practise; move "Find your level" into onboarding. Other apps will copy this home — keep it clean.
- **Navigation:** mirror `state.nav` into the URL hash and handle `popstate`.
- **Weight:** 41 MB first load → ≤ 1.5 MB: lazy-load word shards, trivia and data per route; code-split `app3`; add a service worker and manifest.
- **Storage:** move the single localStorage blob behind a versioned Store seam with migrations.
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
