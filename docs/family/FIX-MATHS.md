# Bizzing Maths — fix brief (family audit, Oct 2026)

Paste this into the Bizzing Maths chat, or point that chat at this file. It is the work to bring Bizzing Maths to **at least 4 (strong) on every key element** and in line with the **[Bizzing family standard](https://github.com/aayuvis/Bizzing_Schedule/blob/claude/amazing-knuth-4aemgz/docs/family/FAMILY-STANDARD.md)** (read it first — it is the shared spec for currency, home, navigation, rewards, audio and performance).

- **Repo:** `aayuvis/Bizzing-Maths` — app in `app/`. Follow the repo's own CLAUDE.md for branch, tests and deploy.
- **Audited:** claude/magical-ptolemy-a97qe0 @ 3819a95 (newest code at audit time).
- **Today:** average **3.7** across 67 elements; **10 of 39 key elements below 4**.
- **Verdict:** Bizzing Maths has the deepest content in the family. It has 165 stops across 10 levels and 18 painted places, each with story, why and your-turn steps, and wrong answers worked on the exact question. All 13 test suites pass and check every trick, puzzle and story sum. The Arcade is plain and has little juice, there is no recorded voice and no Hive feed, and Home is crowded. Pricing, entitlements and locale are not built, so this is a strong engine and Atlas inside a product that is not yet commercial.
- **Context:** Maths is the family benchmark for teaching quality (4.5 core learning) — other apps copy its question-testing and "why" pattern. Keep every existing hard rule.

## How to work this brief

1. Do **Fix first** in one commit, deploy, and confirm.
2. Work the **key elements** table top to bottom (it is ordered by area); batch related rows into one commit each.
3. Apply **Harmonise** — these are changes every app is making at the same time, so do them as written.
4. For every row, add the check in **Done when** to the app's tests and **prove it by breaking it once**.
5. Finish with the **Definition of done** below and report back the new scores.

## 1. Fix first (trust)

- None critical. Finish the in-progress "core content above the fold" work first so this brief lands on a stable base.

## 2. Key elements below 4

| Id | Element | Now | What the audit saw | Change | Done when | Effort |
|---|---|---|---|---|---|---|
| A5 | Demo mode | **1** | No demo/guest mode; welcome form is the only entry (main.js screen(): no kid → viewWelcome). | Add 'Try a trick first' — one story+drill playable before creating a child, discarded afterwards. | `?demo` opens a labelled sample child with weeks of progress; never touches the real household or shared feeds. | M |
| B1 | Home layout | **3** | Home (d-04): journey card, hero, ring, number of day, two journey cards, 4 tiles, trick of day, progress — 12 cards; decorative '+' badges (app.css:476) look tappable. | Cut Home to journey card + today ring + one secondary row; move number/trick of day below fold; remove fake '+' badges. | Home follows the family anatomy (top bar, greeting, ONE Continue, Today's three, ≤ 6 tiles); Continue above the fold at 390×844. | M |
| B7 | Sibling switching | **3** | Me page 'Switch or add' → viewWho; switchKid sets active; theme follows child. Not on Home or top bar. | Tap avatar in top bar to open a quick child switcher sheet. | Household of children with a switcher in the top bar; switching never mixes data; tested with two children. | S |
| F3 | Game polish | **2** | Rush is a single purple bubble on graph paper (d-12); Arcade tiles are CSS circles/target; WebAudio beeps only (ui.js:55). | Add painted game art, pop particles, combo meter, music loop and screen-shake-free juice. | Every game meets standard §10: title card, how-to, motion on every answer, sound, finish screen. | M |
| I4 | Medals from evidence | **2** | Stars per stop and 35 goals exist, but no badge/medal shelf or collection view (no badge code in views2). | Add an evidence-earned medal shelf (first land, 100 fluent facts, tower floor 4) shown once. | A medal shelf of evidence-earned medals in the family medallion style, each celebrated once. | M |
| J1 | Celebration moments | **3** | confetti + sfx.level on passes (ui.js), end cards with stars; no character celebration or level-up ceremony seen. | Build a level/land completion ceremony with the buddy and Aryabhata. | Specific celebration on finishes and milestones (motion + sound), never comparing children. | M |
| K1 | Narration | **2** | Device speechSynthesis only (ui.js:107), prefers en-IN; 'Read it to me' on stories; quality varies by device, nothing recorded. | Record narration for stories and question prompts for 6–7 non-readers. | Read-aloud for every question and instruction with the family narrator; recorded clips for the 6–8 band; clips lint-checked. | L |
| M1 | Grown-ups report card | **3** | Grown-ups (PIN): per-child week stats, tricks mastered, facts fluent, traps, lapses, goals report (views.js:704). | Add trend over weeks and per-strand chart; time-of-day pattern. | Grown-ups report card with Time · Progress · Mastery per child, in the family format the Hive can merge. | M |
| N2 | First-load weight | **2** | Single 1.32 MB JS chunk (463 KB gz), Vite warns; first load ~3.9 MB transferred; 845 KB fonts. | Code-split chapters/library by route; lazy-load per-theme fonts. | First screen ≤ 1.5 MB transferred on a phone; initial JS ≤ 400 KB gzipped; data and art lazy per route. | M |
| O3 | Hive integration | **1** | grep for bizzing.activity in src: none; Schedule's writer not wired. | Import integration/bizzing-activity.js and write minutes/stops; add privacy line. | Writes `bizzing.activity` (minutes + milestones) via the family drop-in; accepts `#/continue` and `?from=hive`; top bar ⬡ back to Hive. | S |

Already at 4 or 5 (keep them there): A1 Welcome screen, A3 Time to first learning, A4 Profile setup, B2 One Continue, B3 Progress on home, B6 Navigation & back, C3 Learning path, C4 Gating & unlocks, C6 Rank moves only on learning, D1 The why before the drill, D3 Answer feedback, D5 Mastery from evidence, D7 Facts & sources, D8 Question testing, E1 Short daily session, F2 Games teach, F4 Keyboard + touch, I3 No random rewards (rarity allowed), J2 No streaks, L1 Visual polish, L4 Phone layout, L5 Accessibility, M2 Reports learning, not usage, M3 PIN & grown-up controls, N1 Offline / PWA, N3 Tests & gates, N4 Storage seam & migrations, N5 Privacy by construction, O4 Family brand layer.

## 3a. Draw inspiration from

For each element below 4, copy the in-family model first, then the outside benchmark. Full table in the family standard §16.

| Id | Element | Copy from (Bizzing) | What exactly | Outside benchmark | Don't borrow |
|---|---|---|---|---|---|
| A5 | Demo mode | **Bizzing Bee** | The landing 'try it' card: 8 real words with recorded audio before any account (landSay/landCheck); the Hive's ?demo sample family | Duolingo: A full first lesson before sign-up | — |
| B1 | Home layout | **Bizzing Bee** | The home grid: honeycomb backdrop, Bizzy greeting card with speech bubble, daily ring, word-of-the-hour card, two painted journey cards, tip and quote row, five tabs (owner's chosen family template) | Duolingo: One obvious next step that everything else on home supports | Hearts, gems, leagues and the streak flame on home |
| B7 | Sibling switching | **Bizzing Finance** | 'Children in this household' switch + add; each child keeps their own town, money and ladder | Khan Academy Kids / Epic: Child profiles under one grown-up, one tap to switch | — |
| F3 | Game polish | **Bizzing Bee** | Type Blaster: painted backdrop, combo, on-screen keyboard, 72 sound calls, confetti | Duolingo (lesson animations) / Toca Boca: Every answer moves something; a small, satisfying sound per action | — |
| I4 | Medals from evidence | **Bizzing Finance** | 50 decision badges ('Steady hand: did nothing on a red day'), a deeds shelf, a first-receipt keepsake | Khan Academy badges / Apple Fitness awards: Earned once from real evidence, shown on a shelf with what earned it | Badges for days in a row |
| J1 | Celebration moments | **Bizzing Bee** | Confetti, sounds, level-up evolution; the Hive's medal spin-in and kudos reveal | Duolingo / Apple Fitness rings: A short, specific end-of-lesson celebration that names what was done | Comparing children or leaderboards |
| K1 | Narration | **Bizzing Bee** | 128k words each with a recorded clip, a voice review queue and clip lint | Khan Academy Kids / Epic Read-to-me: Every instruction read aloud for pre-readers; text highlighted as it is read | — |
| M1 | Grown-ups report card | **Bizzing Bee** | Parent zone: band, accuracy, five readiness signals, missed-word log | IXL Analytics / Apple Screen Time weekly report: Skill-level diagnosis, plus a short weekly digest a parent actually reads | — |
| N2 | First-load weight | **Bizzing Hive** | ~1.3 MB whole build; JS ~112 KB; art as WebP files, never inlined | web.dev performance budgets: A written budget enforced in the build | — |
| O3 | Hive integration | **Bizzing Hive** | The tested reader of bizzing.activity and the drop-in writer + wallet helper in integration/ | Apple Family Sharing / Google Family Link: One family account that every app recognises | — |

## 3. Harmonise with the family

- **Currency:** Maths has no currency today (a strength). Adopt Bizzing coins at the standard amounts only; add a small fixed-price cosmetics shop (avatar outfits, board skins) or show coins flowing to Finance. Never let coins move rank.
- **Medals:** add an evidence-earned medal shelf (first land, 100 fluent facts, Puzzle Tower floor 4) in the family medallion style.
- **Home:** make Journey "Continue" the only filled-primary button; "Twenty facts" and others become Today's three.
- **Audio:** replace device speech with recorded family-narrator clips for stories and 6–7 question prompts.
- **Games:** give Number Rush and the Arcade painted art, particles, combo meter, music loop (standard §10).
- **Weight:** split the 1.32 MB chunk by route (chapters, library); lazy-load per-theme fonts.
- **Siblings:** add the top-bar child switcher.
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
