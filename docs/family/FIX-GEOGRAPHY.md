# Bizzing Geography — fix brief (family audit, Oct 2026)

Paste this into the Bizzing Geography chat, or point that chat at this file. It is the work to bring Bizzing Geography to **at least 4 (strong) on every key element** and in line with the **[Bizzing family standard](https://github.com/aayuvis/Bizzing_Schedule/blob/claude/amazing-knuth-4aemgz/docs/family/FAMILY-STANDARD.md)** (read it first — it is the shared spec for currency, home, navigation, rewards, audio and performance).

- **Repo:** `aayuvis/Bizzing_Geography` — app in `app/`. Follow the repo's own CLAUDE.md for branch, tests and deploy.
- **Audited:** claude/festive-johnson-r5be1n @ 9a5e2d3 (newest code at audit time).
- **Today:** average **3.3** across 67 elements; **18 of 39 key elements below 4**.
- **Verdict:** A deep, unusually trustworthy geography app: data-derived facts, 33,750 tested questions, a painted atlas, ten expeditions and an eight-tool Library, all without streaks or loot. It falls short of world-class on feel and reach: no narration (read-aloud is dead code), mostly multiple-choice drills, thin game juice, a heavy single bundle and small maps on phones. Commercial plumbing (entitlements, pricing, Hive feed) is absent and the grown-ups settings render broken.
- **Context:** Geography's question testing (33,750 questions) and data sourcing are best-in-class — keep them. Street View stays on by default (owner's decision); the privacy page must keep saying exactly what Google sees.

## How to work this brief

1. Do **Fix first** in one commit, deploy, and confirm.
2. Work the **key elements** table top to bottom (it is ordered by area); batch related rows into one commit each.
3. Apply **Harmonise** — these are changes every app is making at the same time, so do them as written.
4. For every row, add the check in **Done when** to the app's tests and **prove it by breaking it once**.
5. Finish with the **Definition of done** below and report back the new scores.

## 1. Fix first (trust)

- **Fix the grown-ups settings page:** the `.tog` switch style at `styles/app.css:397` squeezes the toggle labels into a 50px column and overflows the card. Rename the label class and add a browser check that would have caught it.
- **Fix the phone header** clipping the lock button at 390px.
- Update CONCEPT.md: it says "No Street View by default" while the code (and CLAUDE.md, the owner's decision) has it on by default.

## 2. Key elements below 4

| Id | Element | Now | What the audit saw | Change | Done when | Effort |
|---|---|---|---|---|---|---|
| A3 | Time to first learning | **3** | Landing→name→age→avatar→world→home→Start→stop lesson→Start practice: ~8 taps before the first question. | Let the welcome end directly in the first station's first question; keep the lesson as an inline "why" card. | First real question or lesson within 3 taps of finishing setup; asserted in the browser check. | S |
| A5 | Demo mode | **2** | No demo or try-first mode; tester mode exists only behind the grown-ups PIN and still requires a child profile. | Offer a "Try one question" on the landing page with no profile, then save progress on sign-up. | `?demo` opens a labelled sample child with weeks of progress; never touches the real household or shared feeds. | M |
| B1 | Home layout | **3** | Home (d-03-home): hello card, Today's ring, word of day, two journey cards, two minis. Dense; on phone the expedition card is below the fold. | Collapse to one hero "next" card plus ring; move word/landmark/place into a scroller below. | Home follows the family anatomy (top bar, greeting, ONE Continue, Today's three, ≤ 6 tiles); Continue above the fold at 390×844. | M |
| B2 | One Continue | **2** | Home shows three competing primaries: ring "▶ Start", journey "▶ Start", expedition "▶ Begin" (views.js:206-224); the two Starts open the same stop. | One dominant Continue button; demote the others to secondary links. | Exactly one filled-primary button on home, computed by one next-step function shared by every screen; test counts primary buttons = 1. | S |
| B3 | Progress on home | **3** | Journey chip "Level 3 · 0 of 11" with bar, ring 0/3, rank pill in header. No world/continent mastery view on home. | Add a small "countries you know" map tile that fills by fill colour as capitals are mastered. | Home shows where the child is (level/world + progress bar) next to Continue. | M |
| B7 | Sibling switching | **3** | Me page lists explorers and "+ Add an explorer"; switchKid (main.js:249). No switch from header; no per-child lock. | Tap header avatar for a quick who-is-playing switcher. | Household of children with a switcher in the top bar; switching never mixes data; tested with two children. | S |
| C6 | Rank moves only on learning | **3** | 9 ranks by XP = right answers only (model.js RANKS), each with a sourced history fact. Repeating easy drills still farms XP. | Weight XP by new/mastered items, not raw right answers. | Rank/level moves only on right answers or mastery; games of chance, time and coins never move it; tested. | S |
| E1 | Short daily session | **3** | Ring counts sessions (2/3/5 goal), drills are 10 Qs, expedition days are short; no single "today's 5-minute session" button. | A daily "5-minute trip": mixed review + one new item + one map, ending cleanly. | A 5–10 minute daily session that ends cleanly with a summary of what was practised. | M |
| F3 | Game polish | **2** | WebAudio blips (ui.js:57) and CSS confetti only; map answers have no animation, no pin drop/line animation seen. | Animate guess-to-answer line and pin drop, add score count-up and gentle haptics. | Every game meets standard §10: title card, how-to, motion on every answer, sound, finish screen. | M |
| I4 | Medals from evidence | **2** | Stars per stop, ranks, expedition certificates; no badge/medal shelf for e.g. "all of Africa's capitals". | Evidence-computed medals (continent capitals mastered, 50 flags) on the Me page. | A medal shelf of evidence-earned medals in the family medallion style, each celebrated once. | M |
| J1 | Celebration moments | **3** | Confetti + level jingle on star gain/level/creation (main.js:161); feedback text is a terse "Right." | Varied, specific praise naming the effort ("you found it from the coastline"). | Specific celebration on finishes and milestones (motion + sound), never comparing children. | S |
| K1 | Narration | **1** | ui.js:114 say() and setSayRate exist but are never called anywhere (grep); no recorded narration; 6-year-olds must read. | Wire a read-aloud button on every question and lesson, Indian English voice, as the family does. | Read-aloud for every question and instruction with the family narrator; recorded clips for the 6–8 band; clips lint-checked. | S |
| L4 | Phone layout | **3** | Bottom tab bar, no sideways scroll; but header clips the lock button at 390 (p-03), world map only ~320 px wide for taps, atlas pins unlabeled. | Full-bleed zoomable map on phone, auto-zoom to continent; fix header overflow. | No element past the device width at 390px (measured against the viewport you set, not innerWidth); thumb-reachable tabs. | M |
| L5 | Accessibility | **3** | Skip link, aria labels, reduced-motion respected for confetti, "hold it still" switch. Settings toggles render broken (d-12-grownups); animated scenes behind text. | Fix .tog collision; screen-reader text alternative for map questions (list mode). | WCAG AA contrast in every theme and mode, visible focus, reduced motion respected, labelled controls; tested. | M |
| M1 | Grown-ups report card | **3** | Grown-ups page: 7-day questions/right, stops passed, capitals known, expedition objectives. Settings block visibly broken (label squeezed into 50px column). | Fix layout; add per-world mastery bars and a weekly trend. | Grown-ups report card with Time · Progress · Mastery per child, in the family format the Hive can merge. | M |
| M3 | PIN & grown-up controls | **3** | 4-digit PIN (stated as deterrent), tester mode, Street View toggle, backup/restore/wipe with confirm. app.css:397 .tog switch style breaks these labels. | Rename the label class, add per-child delete and daily goal settings. | Grown-ups area behind a PIN; no dev/tester unlocks or XP buttons outside tester mode; backup, restore, erase. | S |
| N2 | First-load weight | **2** | Single 1.28 MB JS chunk (442 KB gzip, Vite warning); 7.6 MB transferred on first desktop session; build 36 MB. | Code-split library tools and data (places, history) with dynamic import; AVIF/smaller plates. | First screen ≤ 1.5 MB transferred on a phone; initial JS ≤ 400 KB gzipped; data and art lazy per route. | M |
| O3 | Hive integration | **1** | No bizzing.activity writer or Hive deep links (grep: none); listed as "where to pick up". | Import the Schedule writer to report sessions; accept deep links to stops. | Writes `bizzing.activity` (minutes + milestones) via the family drop-in; accepts `#/continue` and `?from=hive`; top bar ⬡ back to Hive. | S |

Already at 4 or 5 (keep them there): A1 Welcome screen, A4 Profile setup, B6 Navigation & back, C3 Learning path, C4 Gating & unlocks, D1 The why before the drill, D3 Answer feedback, D5 Mastery from evidence, D7 Facts & sources, D8 Question testing, F2 Games teach, F4 Keyboard + touch, I3 No loot/gacha/rarity, J2 No streaks, L1 Visual polish, M2 Reports learning, not usage, N1 Offline / PWA, N3 Tests & gates, N4 Storage seam & migrations, N5 Privacy by construction, O4 Family brand layer.

## 3. Harmonise with the family

- **Currency:** no currency today. Adopt Bizzing coins at the standard amounts; fixed-price cosmetics (map pins, compass skins, avatar outfits). Never move rank.
- **Rank:** weight XP by new or mastered items so repeating easy drills cannot farm rank.
- **Home:** one Continue (the ring Start and journey Start open the same stop; the expedition Begin competes) — keep one, demote the rest.
- **Audio:** wire the existing `say()` (ui.js:114, never called) to a read-aloud button on every question and lesson, then record clips with the family narrator.
- **Games:** animate the guess-to-answer line and pin drop, count the score up, add sounds (standard §10). Add a timed round (E2).
- **Medals:** evidence medals (all of Africa's capitals, 50 flags) on the Me page.
- **Phone maps:** the world map is ~320px wide on a phone — full-bleed map with pinch-zoom.
- **Weight:** split the 1.28 MB chunk (library tools, places, history via dynamic import); 7.6 MB first session → ≤ 1.5 MB.
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
