# Bizzing Finance — fix brief (family audit, Oct 2026)

Paste this into the Bizzing Finance chat, or point that chat at this file. It is the work to bring Bizzing Finance to **at least 4 (strong) on every key element** and in line with the **[Bizzing family standard](https://github.com/aayuvis/Bizzing_Schedule/blob/claude/amazing-knuth-4aemgz/docs/family/FAMILY-STANDARD.md)** (read it first — it is the shared spec for currency, home, navigation, rewards, audio and performance).

- **Repo:** `aayuvis/bizzingfinance` — app in `app/`. Follow the repo's own CLAUDE.md for branch, tests and deploy.
- **Audited:** claude/peaceful-mayer-8v29cu @ 4303af0 (newest code at audit time).
- **Today:** average **3.1** across 67 elements; **24 of 39 key elements below 4**.
- **Verdict:** A thoughtful, ethically rigorous money simulator with genuinely good art, a well-designed mastery record and decision-scored games, but as a product it is wide and shallow: 32 MCQ-driven cards, cluttered Home with competing next steps, and flat game feel. Several numbers undermine trust (2%/week bank vs 4.5% town rate, ₹1.48 crore snowball, a parent report crediting the child with a default). Commercial readiness is near zero (no pricing, entitlements, Hive feed) and the 2.5 MB bundle hurts first load.
- **Context:** Finance is sold only inside the Bizzing Family plan (not standalone). Its no-loot design and versioned store (v1→v9) are exemplary. The owner judges it weak: the brief targets depth and polish, not breadth.

## How to work this brief

1. Do **Fix first** in one commit, deploy, and confirm.
2. Work the **key elements** table top to bottom (it is ordered by area); batch related rows into one commit each.
3. Apply **Harmonise** — these are changes every app is making at the same time, so do them as written.
4. For every row, add the check in **Done when** to the app's tests and **prove it by breaking it once**.
5. Finish with the **Definition of done** below and report back the new scores.

## 1. Fix first (trust)

- **One interest rate:** the Bank pays 2% a week (sim.js:57, about 180% a year) while the Exchange shows a town bank rate of 4.50%. One annualised town rate must drive both.
- **Snowball projection:** shows ₹1,48,27,206 at 10 years on a ₹0 balance (views.js:895). Project the actual balance at the real rate.
- **Report honesty:** the grown-up report says "keep 50% back — their choice, not a default" when 50% is the default (views.js:1546 vs sim.js:51). Report a choice only when the child changed it.
- **Remove "Add 200 XP"** from the grown-ups page outside tester mode (views.js:1526) — it rewrites the child.
- Wrong answers still give 12 XP: XP for right answers and mastery only.

## 2. Key elements below 4

| Id | Element | Now | What the audit saw | Change | Done when | Effort |
|---|---|---|---|---|---|---|
| A4 | Profile setup | **3** | views.js:43-84 name, two bands (8–10/11+), currency. Minimal data, but no avatar for the child at all; companion is only adopted later for money. | Add a free starting avatar pick from the family set so the child has an identity on day one. | Setup asks only first name, age band, avatar; ≤ 30 seconds; test asserts no other child fields. | M |
| A5 | Demo mode | **2** | No demo or try-before-setup; landing goes straight to profile creation. Tester mode exists only behind the grown-up PIN. | Add a "peek at Bizzington" read-only demo household from the landing for parents to explore before creating a child. | `?demo` opens a labelled sample child with weeks of progress; never touches the real household or shared feeds. | M |
| B1 | Home layout | **2** | Home desktop full-page ~2930px: town, greeting, wallet strip, today's lesson, three quests, three journeys with 9 rows, till, dailies, put-right. Too many equal-weight cards. | Cut Home to street + one next step + today's three; move journeys and dailies behind a "More today" fold. | Home follows the family anatomy (top bar, greeting, ONE Continue, Today's three, ≤ 6 tiles); Continue above the fold at 390×844. | M |
| B2 | One Continue | **2** | Competing CTAs: "Read it" (Needs and wants), letter, jobs, shelter, quests; Atlas "Up next" says Money is an agreement — two different "next" lessons. | One hero "Continue" button computed from a single next-step function shared by Home and Learn. | Exactly one filled-primary button on home, computed by one next-step function shared by every screen; test counts primary buttons = 1. | S |
| B3 | Progress on home | **3** | Level pill "Lv 1 · Saver", net-worth strip, quests 0/3, put-right 0/4 on Home; no curriculum progress (chapter x of 8) on Home. | Add a compact chapter/world progress bar on Home tied to the Atlas. | Home shows where the child is (level/world + progress bar) next to Continue. | S |
| C3 | Learning path | **3** | 8 chapters × 4 cards across 5 worlds (8/8/8/4/4 stops), checkpoints after chapters, 30 levels; linear and short. | Add more stops per chapter with graded difficulty, especially Exchange and Works (only 4 each). | A visible, ordered path with levels; a child always knows the next step and why. | L |
| C6 | Rank moves only on learning | **3** | 30 levels/5 ranks (content.js:14-25) from XP; wrong answer still gives 12 XP; parent page "Add 200 XP" (views.js:1526) rewrites level outside tester mode. | Award XP only for right answers/mastery; remove grantXP from non-tester parent page. | Rank/level moves only on right answers or mastery; games of chance, time and coins never move it; tested. | S |
| D1 | The why before the drill | **3** | 32 narrated ~37s explainers (5 beats, Nana Bizz, CSS-composited stage), then teach text + "For instance" + read-to-me. Stage visuals minimal. | Richer staged demonstrations (show jars filling, interest stacking) and an interactive "try it" step before the questions. | Each lesson/stop teaches the idea (the why) before practice; checked on a sample of stops. | M |
| D3 | Answer feedback | **3** | Wrong answer shows "Not quite — and this is the useful bit: <why>" then Next; cannot retry. Game feedback is just "Yes." | Let a wrong answer retry once after the why; give games specific feedback ("a cake is a want unless…"). | Right answers advance; wrong answers hold until tapped and show why; never auto-advance on wrong. | S |
| D7 | Facts & sources | **2** | sources.js + test/sources.mjs good, but Bank pays 2%/week (sim.js:57) while Exchange shows bank rate 4.50%; snowball shows ₹1,48,27,206 at 10y on a ₹0 balance. | Make one annualised town rate drive bank and Exchange; snowball on actual balance with a realistic rate. | Every fact derives from data or carries `sources[]`; a data-lint test fails on missing sources or self-contradicting numbers. | S |
| D8 | Question testing | **2** | shuffledDrill permutes options by card id (content.js:329); every authored answer is a:1. No test checks leaks or runs objectives validate(). | Add a test that runs validate(), checks answer positions are spread and that stems never contain the answer text. | Generated questions tested: one right answer, not in the text, distinct options, even answer slots. | S |
| E1 | Short daily session | **3** | Today's three quests (letter, scam, card) + daily till ~5 min and a clear 0/3 counter; "Closing time" only after quests claimed. | Package a 7-minute "Today in town" sequence that plays the three in order and ends with a closing card. | A 5–10 minute daily session that ends cleanly with a summary of what was practised. | M |
| F3 | Game polish | **2** | Games seen are flat: emoji card + two buttons (Needs vs Wants, Scam Spotter); Change Rush plain lanes and circles; covers are painted but gameplay is not. | Bring the painted art into play screens; add motion, coin sounds and end-of-round celebration. | Every game meets standard §10: title card, how-to, motion on every answer, sound, finish screen. | M |
| J1 | Celebration moments | **3** | Confetti on start and pay day, sfx, level-up overlay, toasts ("+22 XP"); game ends modest. | Design bigger moments for chapter completion and first goal reached. | Specific celebration on finishes and milestones (motion + sound), never comparing children. | S |
| J2 | No streaks | **3** | No loot, no shame copy; but flame "days in a row" chip in top bar on every screen resets to 1 on a missed day (sim.js:796-799). | Replace the streak chip with "good days this week" count that never resets visibly. | No streak counts, freezes or "days in a row"; "good days this week" at most; a test fails on streak copy. | S |
| K1 | Narration | **3** | 165 mp3 clips (6 MB) narrate 32 lessons in an Indian voice; elsewhere read-to-me uses device speechSynthesis (ui.js:134-146), quality varies. | Record narration for letters, glossary and onboarding lines. | Read-aloud for every question and instruction with the family narrator; recorded clips for the 6–8 band; clips lint-checked. | M |
| L4 | Phone layout | **3** | Phone 390px: no page overflow on home/lesson/jars; 4-tab bottom bar for sprouts; Home is a very long scroll; confetti over content. | Shorten phone Home and pin the primary CTA above the tab bar. | No element past the device width at 390px (measured against the viewport you set, not innerWidth); thumb-reachable tabs. | M |
| L5 | Accessibility | **3** | :focus-visible ring, reduced-motion media queries, aria-labels on icon buttons; Home has 0 h1 and 5 unnamed buttons. | Add one h1 per screen, label all buttons, test with axe in CI. | WCAG AA contrast in every theme and mode, visible focus, reduced motion respected, labelled controls; tested. | S |
| M1 | Grown-ups report card | **3** | Grown-up page: what they learned, what they decided, talk prompts, printable week, children, settings, backup — long single scroll. | Lead with a one-glance summary card (objectives moved, lapses, decisions) before settings. | Grown-ups report card with Time · Progress · Mastery per child, in the family format the Hive can merge. | M |
| M2 | Reports learning, not usage | **3** | Reports objectives and decisions not minutes; but on day one it reports "Set the pay-day rule to keep 50% back. Their choice, not a default" — the default (views.js:1546, sim.js:51). | Log only rules the child actually changed (decisions.log), never infer from current state. | The report states what the child can now do (from evidence), not only minutes and taps. | S |
| N2 | First-load weight | **2** | Main bundle index.js 2.56 MB (1.71 MB gzip) because art is base64 in JS (*-gen.js ~1.9 MB); build 9.1 MB. | Move art to hashed WebP files and lazy-load per world; target <300 KB initial JS. | First screen ≤ 1.5 MB transferred on a phone; initial JS ≤ 400 KB gzipped; data and art lazy per route. | M |
| N3 | Tests & gates | **3** | 10 node test files, 182 checks pass (economy, business, market, companion, sources, backup, puzzle); no browser/DOM check, no objectives validate() test. | Add Playwright check of built app (phone+desktop, overflow, errors) and validate() to npm test. | Engine tests + browser check (desktop and phone) run before every deploy; each assertion proven by breaking it. | M |
| O3 | Hive integration | **1** | No bizzing.activity writer (grep empty); no deep links to Bee/India/Maths/Schedule beyond a landing mention. | Import integration/bizzing-activity.js and write lesson/game minutes; add family app links. | Writes `bizzing.activity` (minutes + milestones) via the family drop-in; accepts `#/continue` and `?from=hive`; top bar ⬡ back to Hive. | S |
| O4 | Family brand layer | **3** | Bizzing wordmark, mark, Bee-style Atlas and tokens; but own fonts/palette and no shared family avatars or ds-src tokens. | Adopt the family token package and avatars so Finance looks like a sibling. | Family top bar, honeycomb mark, Continue card shape, medallion medals and the shared avatar set are in place. | M |

Already at 4 or 5 (keep them there): A1 Welcome screen, A3 Time to first learning, B6 Navigation & back, B7 Sibling switching, C4 Gating & unlocks, D5 Mastery from evidence, F2 Games teach, F4 Keyboard + touch, I3 No random rewards (rarity allowed), I4 Medals from evidence, L1 Visual polish, M3 PIN & grown-up controls, N1 Offline / PWA, N4 Storage seam & migrations, N5 Privacy by construction.

## 3a. Draw inspiration from

For each element below 4, copy the in-family model first, then the outside benchmark. Full table in the family standard §16.

| Id | Element | Copy from (Bizzing) | What exactly | Outside benchmark | Don't borrow |
|---|---|---|---|---|---|
| A4 | Profile setup | **Bizzing Maths** | viewWelcome: first name, 3 age bands, avatar; the hint 'never surname, birthday, photo, email' | Khan Academy Kids: Parent-created child profiles with a name and avatar only | — |
| A5 | Demo mode | **Bizzing Bee** | The landing 'try it' card: 8 real words with recorded audio before any account (landSay/landCheck); the Hive's ?demo sample family | Duolingo: A full first lesson before sign-up | — |
| B1 | Home layout | **Bizzing Bee** | The home grid: honeycomb backdrop, Bizzy greeting card with speech bubble, daily ring, word-of-the-hour card, two painted journey cards, tip and quote row, five tabs (owner's chosen family template) | Duolingo: One obvious next step that everything else on home supports | Hearts, gems, leagues and the streak flame on home |
| B2 | One Continue | **Bizzing Maths** | Journey card 'Continue' that deep-links to the next station (views.js journeyCard) | Duolingo: A single, large, always-the-same-place start button | — |
| B3 | Progress on home | **Bizzing Maths** | 'Station 1 of 16' meter and rank bar right beside Continue | Brilliant: Course progress shown as position on a path, not a percentage list | — |
| C3 | Learning path | **Bizzing Maths** | 10 levels, 59 lands, 165 stops; concepts spiral across levels; land and level tests | Brilliant / DragonBox: Short ordered steps where each one builds the next | — |
| C6 | Rank moves only on learning | **Bizzing Maths** | 9 ranks Pebble→Aryabhata, each with a sourced fact, moving only on right answers | Khan Academy: Mastery levels (Familiar → Proficient → Mastered) from evidence | XP for time, logins or games of chance |
| D1 | The why before the drill | **Bizzing Maths** | Stop tabs Story → Learn (worked steps, figure, algebra) → Your turn → Drill | Brilliant: Explain by doing: an interactive picture of why, before practice | — |
| D3 | Answer feedback | **Bizzing Maths** | Wrong answer holds: 'Not this time. It is 26' then the trick worked on the child's own question | Khan Academy: Step-by-step hints on the exact item the child got wrong | Auto-advancing past a wrong answer |
| D7 | Facts & sources | **Bizzing Geography** | Facts generated from Natural Earth data; test/data.mjs proves capitals sit inside their country | Britannica Kids: Every fact traceable to a named source | — |
| D8 | Question testing | **Bizzing Maths** | ~57k generated questions through trick, answer and plain arithmetic; leak checks; permuted options | (no consumer equivalent — Maths and Geography are the benchmark) | — |
| E1 | Short daily session | **Bizzing Maths** | 'Twenty facts' and 10-question drills that end on an end card | Duolingo: A 3–5 minute lesson that always ends with a clear finish screen | Daily-goal pressure and streak reminders |
| F3 | Game polish | **Bizzing Bee** | Type Blaster: painted backdrop, combo, on-screen keyboard, 72 sound calls, confetti | Duolingo (lesson animations) / Toca Boca: Every answer moves something; a small, satisfying sound per action | — |
| J1 | Celebration moments | **Bizzing Bee** | Confetti, sounds, level-up evolution; the Hive's medal spin-in and kudos reveal | Duolingo / Apple Fitness rings: A short, specific end-of-lesson celebration that names what was done | Comparing children or leaderboards |
| J2 | No streaks | **Bizzing Maths** | 'Nothing expires. A day off costs nothing.' and 'Not this time' on a miss; the Hive's 'good days this week' | Khan Academy Kids: No loss for a day off | Duolingo's streak and streak freeze |
| K1 | Narration | **Bizzing Bee** | 128k words each with a recorded clip, a voice review queue and clip lint | Khan Academy Kids / Epic Read-to-me: Every instruction read aloud for pre-readers; text highlighted as it is read | — |
| L4 | Phone layout | **Bizzing Maths** | Thumb-reachable keypad and tab bar; no overflow at 390px | Apple HIG: 44pt touch targets, bottom navigation, nothing past the screen edge | — |
| L5 | Accessibility | **Bizzing Maths** | Skip link, aria-labels, radio pickers with arrow keys, reduced motion, contrast tested | WCAG 2.2 AA: Contrast, focus, motion and labels as testable rules | — |
| M1 | Grown-ups report card | **Bizzing Bee** | Parent zone: band, accuracy, five readiness signals, missed-word log | IXL Analytics / Apple Screen Time weekly report: Skill-level diagnosis, plus a short weekly digest a parent actually reads | — |
| M2 | Reports learning, not usage | **Bizzing Maths** | Reports fluent facts, lapses ('slipped since fluent'), traps to help with — not minutes | IXL diagnostic: Says what the child can do now and what to work on next | Time-on-app shown as achievement |
| N2 | First-load weight | **Bizzing Hive** | ~1.3 MB whole build; JS ~112 KB; art as WebP files, never inlined | web.dev performance budgets: A written budget enforced in the build | — |
| N3 | Tests & gates | **Bizzing Maths** | 13 engine suites + a Chromium check on desktop and phone, each assertion proven by breaking it | (internal benchmark) | — |
| O3 | Hive integration | **Bizzing Hive** | The tested reader of bizzing.activity and the drop-in writer + wallet helper in integration/ | Apple Family Sharing / Google Family Link: One family account that every app recognises | — |
| O4 | Family brand layer | **Bizzing Hive** | The family top bar and honeycomb mark defined in the standard | Google Workspace app switcher: The same top bar in every app so moving between them feels like one product | — |

## 3. Harmonise with the family

- **Currency (Finance's new role):** Finance becomes the home of Bizzing coins. Its wallet *is* `bizzing.wallet`: show income from every app, the save / spend / give jars and the bank on the same coins. Keep its existing rules (one currency, no loot, sources for every figure).
- **Streaks:** remove the flame "days in a row" chip (sim.js:796-799); "good days this week" at most.
- **Home:** one Continue from a single next-step function shared by Home and Learn (today they disagree); cut the ~2,900px desktop home to the family anatomy.
- **Content depth:** 32 lessons × 3 MCQs is thin — add item types (sort, build a budget, drag coins, spot the error) and deepen each lesson; generated, tested questions like Maths.
- **Games:** bring the painted art into play screens; motion, coin sounds, end-of-round celebration (standard §10).
- **Weight:** art is base64 inside JS (2.56 MB main bundle) → hashed WebP files, lazy per world; initial JS ≤ 400 KB gz.
- **Audio:** recorded narration for letters, glossary and onboarding with the family narrator.
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
