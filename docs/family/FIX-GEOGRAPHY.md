# Bizzing Geography — fix brief v2 (family audit, 2 Oct 2026)

Paste this into the Bizzing Geography chat, or point that chat at this file. It replaces the v1 brief. It is the work to bring Bizzing Geography to **at least 4 on every key element** and in line with the **[Bizzing family standard v2](https://github.com/aayuvis/Bizzing_Schedule/blob/claude/amazing-knuth-4aemgz/docs/family/FAMILY-STANDARD.md)**. Read the standard first.

- **Repo:** aayuvis/Bizzing_Geography — app in `app/`. Follow the repo's own CLAUDE.md for branch, tests and deploy.
- **Audited:** claude/festive-johnson-r5be1n @ 9f8781c.
- **Today:** average **3.36** across 152 elements; **33 of 97 key elements below 4**.
- **Verdict:** Bizzing Geography is the most finished-looking app in the family: a painted Explorer’s Atlas of 10 worlds and 45 stations, ten expeditions with in-app projects, eight Library tools and six designed themes in light and dark, with zero console errors and a deep test suite. Teaching is honest and sourced, and the family-brief fixes (one Continue, top bar, Hive feed, demo, report card, read-aloud, phone maps) all work as claimed. It is weakest where it is most like a quiz app: mostly 4-option MC, no hints, a text-only mistake list, synth sound, no music, and only one true game. The economy is cosmetic and thin (ten map pins/frames, no rare avatars or customisation), and list mode leaks the answer on continent questions — a real bug to fix first.
- **Strengths to keep:** Painted Atlas, 10 world plates and 6 themed living scenes form one coherent, high-quality art direction. · Facts from data, sourced, India depiction tested; 33,750 generated questions checked for leaks and slot bias. · Expeditions with in-app projects and a later-day test rule teach and measure real learning. · Family layer done right: one Continue, Hive feed, demo, PIN report card on learning, zero third-party requests.

## How to work this brief

1. Do **§1 Fix first** in one commit, deploy and confirm it.
2. Do **§2 Harmonise**: every app is making these changes at the same time, so do them as written. Copy the shared files from the Bizzing_Schedule repo: `integration/bizzing-activity.js`, `bizzing-wallet.js`, `bizzing-avatars.js` and `bizzing-avatars.css`.
3. Work the **§3 key elements** table top to bottom, batching related rows into one commit each.
4. For every row, add the **Done when** check to the app's tests, and **prove it by breaking it once**.
5. Finish with **§6 Definition of done**, and report back the commit and the new scores.

## 1. Fix first (trust)

- **List mode leaks the answer.** On continent map questions it shows only ONE option: the right one (`mapList` in views.js). Fix it, and add a test that every list has ≥ 3 options with the answer slot evenly spread (E11).
- **"1 points"** in GeoGuess results; the Compass rose is clipped on the right in Compass drills.
- **Phone Atlas** world-pin labels overlap and clip. The Street View setting label is squeezed into three columns. Dictionary rows sit on the moving scene with low contrast.
- **The "Place of the hour" card** opens the generic page, not the place shown.

## 2. Harmonise with the family (standard v2)

- **Mascot (§2):** the owner picks from Shelly / Kip / Roam. Compass Owl today guides onboarding only. The mascot goes on the icon, logo, home, worlds, finish screens, and empty and error states.
- **App icon:** the mascot on teal with map contours.
- **Avatars (§8):** 40 today, all free by rule. That rule is now overridden. Keep the 5 packs, add **Bee's Big Beasts pack** (with Vasuki replaced), and generate 6 packs, one per theme (ocean, rainforest, desert, polar, mountains, sky), for 96. Pair two packs to each world. The map pins and frames become Extras.
- **Worlds (§7):** the six living themes are closest to the bar already. Paint their **night variants** (today the plates are not dimmed), add one idle character or vehicle loop each, and add a music loop each.
- **Tabs:** Home · Atlas · Expeditions · Library (+ Play if the quizzes gather there). Add ☰.
- **Icons (§9):** the stop glyphs, world pins, tiles and filters are emoji (Atlas 33 per screen). Replace them with the SVG set.
- **Music (§11):** none today. Add a loop per world and for home, plus the volume slider.
- **Mistakes deck (F3), hints (E6) and item types beyond multiple choice (E4)** are the learning gaps.
- **Search** across places, stops and dictionary entries (C4).
- **Top bar and ☰ (§3):** `[⬡ Hive] [☰] [mascot + Bizzing …] … [search] [coin chip] [theme] [🔒] [avatar ▾]`, 56 px. The ☰ drawer lists My page · Shop · Collection · Medals · *(up to 4 app areas)* · Settings · Grown-ups 🔒 · Help · Privacy · Back to the Hive.
- **Settings (§5):** Bee's sheet, with the sections in this order: Me · Sound & music · Look · Comfort · Grown-ups 🔒.
- **Glossary (§21):** Bizzing coins · World · Stop · Continue · Collection · Shop · Medals · Grown-ups · Family plan.
- **Hive (§19):** activity and milestones written, coins through the wallet, avatars through the engine, `#/continue` and `?from=hive` accepted.

## 3. Key elements below 4

| Id | Element | Now | What the audit saw | Change | Done when | Effort |
|---|---|---|---|---|---|---|
| A8 | First-session "aha" | **3** | 8–10 child lands on "Eight compass points" with a plan grid; I scored 3/10 random. The first question sits below fold on desktop; confetti fires before any answer (09). | Start each new child on an easy confidence question (find your continent) and celebrate the first right answer, not account creation. | A new child gets a right answer and a celebration inside two minutes (scripted in the check). | S |
| B5 | Mascot / greeting personality | **3** | Avatar speaks one line in a bubble that references the last activity ("You pinned five places… best 1,763"). Compass Owl is the onboarding guide only; no animation or… | Give the chosen companion small idle motion and reactions on right/wrong in runs. | Mascot greeting with a line built from the last session, never the same line twice in a row. | M |
| C4 | Search | **2** | Searches exist per tool: dictionary look-up, landmarks search, Map Explorer find-a-country. No search across stops, countries, landmarks and words together. | Add one search box (top bar) indexing stops, countries, capitals, landmarks and dictionary words. | Search pill/icon finds any lesson, stop, story, word or place; check searches three known items. | M |
| D10 | World ambient life | **3** | Living theme scene (44–101 props, boats, balloons, birds) behind every screen; the world plates themselves are static with no characters or sound. | Add light parallax or a few animated sprites on the world plates and the island. | Three ambient layers per world, paused when hidden, frozen under reduced motion (check). | M |
| E6 | Hints & scaffolding | **2** | No hints inside drills. Capitals card offers "Give me 4 choices" and "Reveal" as scaffolds; list mode for maps. | Add a one-step hint per question (e.g. continent highlight, first letter) that halves the reward. | A hint on the exact wrong item, never revealing the answer. | M |
| E9 | Mastery from evidence | **3** | Stars from runs, "known" capitals from two-day evidence, expedition day rule. "I’ve read it ★" self-mark grants a star; nothing decays. | Drop the read-it star; let stars fade to a review state after weeks without practice. | Mastery from spaced evidence; a miss drops one step and is shown. | S |
| E11 | Question testing & answer-leak protection | **3** | test/stops.mjs: 33,750 questions, slot balance OK. But list mode on continent questions shows ONE option, the right one ("Tap Africa" → only "Angola") — an answer leak… | Fix mapList for multi-country answers: draw distractors from other continents; add a test that list mode always has ≥4 options. | Generated questions tested: one right answer, no leak, even answer slots (test suite). | S |
| F3 | Mistake review | **2** | End card "To look at again" lists missed question text and answer (13, 39-flags-end) — flag misses show no flag image; no persistent mistakes deck. | Keep a per-child mistakes deck and a "practise my misses" button, with figures/flags shown. | A mistakes deck that brings missed items back after a gap. | M |
| F4 | Session end summary | **3** | End card: stars, "3 of 10 right", one line, next-station button on pass, missed list. GeoGuess: per-place km and points. | Add time taken, stars change and coins earned to the summary. | Finish screen names what was practised and what is next. | S |
| G2 | Average game quality | **3** | Quizzes are clean 4-choice or tap-map runs sharing one runner; competent but samey. | Give each quiz a distinct mechanic (flag builder, capital typing race). | Every game meets §14; average game score ≥ 4 on the next audit. | M |
| G6 | Game animation & juice | **3** | Pop on right, shake on wrong, pin drop, line draws, score counts up, confetti on medals. Modest. | Add combo feedback and an end-of-round reveal animation on the map. | Motion on every answer; combo or progress feedback. | M |
| G7 | Game sound | **2** | Synthesised WebAudio blips (sfx.good/bad/level); no music, no voice-over. | Commission a small sound kit (pin drop, coin, reveal) and an ambient loop per theme. | Effects and a music loop in every game. | M |
| I4 | Mascot quality & presence across the app | **2** | Compass Owl guides onboarding only; afterwards the chosen avatar gives one line on home. No mascot in runs, results or empty states. | Bring the companion into run feedback and end cards. | One mascot (§2) on icon, logo, home, worlds, finishes, empty and error states — six poses. | M |
| J4 | Rare/collectible tiers present | **1** | All 40 free, none locked, no tiers — a stated rule. Owner wants Common/Rare/Epic/Legendary. | Add a tier badge and a rare pack unlocked by medals/coins, keeping all current ones free. | Common · Rare · Epic · Legendary on every card, via bizzing-avatars.js. | M |
| J5 | Unlock path stated on every avatar | **2** | Nothing per avatar states how it is got; all simply selectable. "35 more wait on your page". | Label each face (Free / medal / coins) once tiers exist. | Every card states its path in plain words (`stateOf().say`). | S |
| J6 | Avatar shown across the app | **3** | Avatar in top bar, home greeting, report card. Not on the GeoGuess pin, run results or the atlas. | Use the avatar as the map pin and on end cards. | The chosen avatar in top bar, greeting, finish screens, map and the Hive. | S |
| J7 | Showcase / trading-card / profile page | **2** | Me page: medals, coins/shop, faces, theme, settings (50-me). No showcase/profile card to admire or share. | Add an explorer card: avatar, rank, countries known map, top medals. | Collection page: all 96 by pack, owned and locked, with paths; the night glow. | M |
| K4 | Shop variety | **2** | 10 items: 5 map pins, 5 map frames (20–50 coins). No avatars, themes, stickers or board skins. | Add avatar accessories, rare avatars, Atlas island skins, stickers. | At least three kinds of thing to buy (avatars, worlds, one cosmetic line). | M |
| K5 | Rare avatars obtainable with coins and/or milestones | **1** | No rare avatars; all free by rule. | Add a rare pack for coins or medal milestones. | Rare avatars by coins (and Legendaries by milestone + coins). | M |
| K9 | Wallet & coin history visible to the child | **3** | "Lately: +1 right answers ·…" one line under the balance. No full ledger view. | Add a tap-through coin history (family ledger exists). | Coin chip opens the wallet history (§1.1). | S |
| K10 | Economy balance | **2** | Entire shop costs ~340 coins; a child earning 30–100/day empties it in a week; then coins are pointless. | Add long-term sinks (rare avatars 300–800, island skins) to make saving matter. | A free child has something worth saving for in week 4 (Legendary, world 3). | M |
| L3 | Celebration moments | **3** | Confetti and a medallion pop when a medal is first earned; confetti on stars gained; "Round complete" card. | Add a fuller finish moment for expeditions and world completion. | Celebration on every finish and milestone, naming what was done. | M |
| M3 | Sound effects | **3** | Synthesised blips for right/wrong/coin/level. | Replace with a designed sound kit. | Right · wrong · finish · medal · coin · unlock effects. | M |
| M4 | Music | **1** | No music. | Add a soft ambient loop per theme, off by default. | Music per world, home and games per §11, with CREDITS.md. | M |
| M5 | Mute/volume controls | **3** | Sound on/off in avatar menu; "Read aloud" setting; no volume. | Add separate sfx/voice toggles. | Effects, music and one volume slider in Settings §5; mute one tap from ☰. | S |
| N4 | Iconography system: SVG vs emoji vs raster | **2** | Counted: home 8 SVG icons/11 emoji, atlas 8/33, library 8/8, Me 13/16. Nav is SVG; stop glyphs, world pins, tiles and filters are emoji. | Draw the stop/world glyphs as a SVG set in the app’s style. | Zero emoji in controls (check counts); SVG family set everywhere. | M |
| N5 | Icon quality & legibility | **3** | Emoji render differently per OS; small ones on world pins are legible; SVG nav icons crisp. | Same as N4. | Icons legible at 24px in light and dark. | M |
| N12 | Visual bugs found | **2** | Phone atlas labels collide (Capitals/Rivers clipped); grown-ups Street View label split into 3 columns; dictionary text over the sea; compass rose in plan clipped; "1… | Fix each; add label-collision and grammar checks. | No visual bug from this brief's list remains (each has a check). | S |
| P3 | Touch target sizes | **3** | Home phone: ring goal buttons 30×30, theme/grown-ups 38×38, "Have a look" 34px tall, tester "Turn off" 20px, footer links 18px. | Raise all to 44px. | Every target ≥ 44 px (check samples). | S |
| P6 | Screen-reader labels & reduced motion | **3** | aria-labels on maps/rings, list mode, reduced motion respected; list mode gives one option on continent questions. | Fix list mode; label emoji glyphs. | aria-labels on icon buttons; reduced motion respected. | S |
| R2 | First-load weight | **3** | Fresh first load 1.34 MB, JS 1.0 MB raw (332 KB gz) — over Vite’s 500 KB chunk warning. | Split maps data and views by route. | First screen ≤ 1.5 MB on a phone; initial JS ≤ 400 KB gzipped. | M |
| R7 | Security | **3** | No secrets in repo, no accounts. Street View key ships in public JS (referrer-restricted by intent; restriction still a to-do in CLAUDE.md). | Confirm the key restriction in Google Cloud. | No seeded accounts or pass codes in client code. | S |
| T9 | Shareability | **2** | Expedition certificates in-app; no share card or printable world certificate. | Add share/print cards for medals and GeoGuess scores. | Certificates per §13, shared from the grown-ups area. | M |

Already at 4 or 5 (keep them there): A1 Landing/welcome clarity, A3 Time to first learning, A4 Profile setup minimal & fast, A5 Demo / try-before-signup, B1 Home layout & hierarchy, B2 Exactly one primary Continue, B3 Progress visible on home, B7 Phone home: Continue above the fold, B10 Returning-child state, C1 Tab model, C2 Back button & hash routing, C3 Sibling switching, C5 Dead ends & broken links found in the walkthrough, D1 Number of worlds/lands/levels, D3 World art quality, D4 World art consistency, D5 World variety, D8 World progression visible, E3 Teaching the why, E5 Answer feedback, E10 Content accuracy & sourcing, F1 Short daily session, G4 Learning IS the mechanic, G5 Game art, G10 Keyboard AND touch in every game, G11 Filler/useless games, J1 Avatar count, J2 Avatar art quality, K1 Currency present, K2 Earned only for learning, K3 A shop exists, K7 Prices visible and fixed, K8 No random rewards / gacha / pay-to-win, L1 Medals/badges from evidence, L5 No streak pressure, L6 Positive tone on mistakes, N1 Overall visual polish, N2 Art-direction consistency across all screens, N6 Font quality: faces used, self-hosted, display/body pairing, weights loaded, O3 Night/dark mode present, O4 Night mode quality, P1 Phone layout: no overflow at 390 px, P2 Thumb reach & bottom tab bar, P4 Contrast in light and dark, P5 Keyboard navigation & visible focus, Q1 Grown-ups area behind a PIN, Q2 Report card quality, Q3 Reports learning, not just usage, Q4 Controls, Q5 Data export / erase, Q6 Multiple children managed, Q7 Tester/dev controls hidden from the child, R1 Offline / PWA installable, R4 Console errors during the walkthrough, R5 Automated tests & browser checks, R6 Storage seam & versioned migrations, S1 Child data minimal, S2 No third-party requests, S3 Privacy page accurate, S4 Sensitive content handled, T3 Paywall never on the child's screen, T5 Bizzing Hive feed written, T6 Deep links accepted, T7 Family top bar / brand layer.

### 3a. Draw inspiration from

For each row above, copy the in-family model first, then the outside benchmark (standard §23).

| Id | Copy from (Bizzing) | What exactly | Outside benchmark | Don't borrow |
|---|---|---|---|---|
| A8 | **Bizzing Maths** (4) | First stop: story beats, worked steps, 'Your turn' typed steps, 10-q drill; first pass triggers 'First star' medal ceremony with confetti… | Duolingo · Khan Academy Kids: A first lesson before sign-up; placement that starts as questions; one friendly character and one big button | Long sign-up forms; asking for a child's email or birthday |
| B5 | **Bizzing Maths** (4) | Child's own avatar greets with a contextual line ('Last time: twenty facts, 19 of 20 right'), Nova on onboarding, Aryabhata in ceremonies. | Duolingo (the path) · Bizzing Bee's own home (owner's template): One obvious next step everything else supports; a home that picks up exactly where the child left off | Hearts, gems, leagues and the streak flame on home |
| C4 | **Bizzing Bee** (4) | Header 'Search any word…' gives live dictionary matches (rhythm, latin) and 'See all matches'; Word Finder searches 40k/128k. Search does… | Apple HIG tab bars · Khan Academy Kids profiles: ≤ 5 tabs, back always stays inside the app, one-tap child profiles, a search that finds any lesson | Hamburger menus hiding main areas |
| D10 | — (no app at 4 yet) | — | Prodigy (world map) · Toca Boca (world feel) · Monument Valley (art direction): Each world a distinct, alive place with its own palette and sound; the map shows where you are and what is next | Worlds that are only a background behind the same quiz |
| E6 | **Bizzing Maths** (4) | Guided 'Your turn' shows a step after two misses; 'Show me' in Make the Target; sudoku hints; tip to do Your turn first. | Brilliant · DragonBox · Khan Academy: Interactive why before practice; varied item types; hints on the exact wrong item; mastery that is re-checked | Multiple-choice only; self-marked 'complete' |
| E9 | **Bizzing Maths** (4) | Stars from drill accuracy/pace; 32 goals measured from evidence; fluent decays; 'Slipped since fluent' in report. Stops never decay. | Brilliant · DragonBox · Khan Academy: Interactive why before practice; varied item types; hints on the exact wrong item; mastery that is re-checked | Multiple-choice only; self-marked 'complete' |
| E11 | **Bizzing Maths** (5) | npm test passes: ~57k trick questions ×3 routes, 4720 level questions, 5179 voice lines, puzzles proven unique; leak tests. | Brilliant · DragonBox · Khan Academy: Interactive why before practice; varied item types; hints on the exact wrong item; mastery that is re-checked | Multiple-choice only; self-marked 'complete' |
| F3 | **Bizzing Bee** (4) | Misses 'Saved for revision', Revision pile, My traps radar, 'My missed words' list, Tricky review. | Duolingo lessons · Anki: 3–5 minute sessions with a clean finish screen; a mistakes deck that comes back later | Daily-goal pressure and streak reminders |
| F4 | **Bizzing Maths** (4) | Run end: stars, '8 of 10 right', station count, missed items, next-station button (d-18); games list what was practised. | Duolingo lessons · Anki: 3–5 minute sessions with a clean finish screen; a mistakes deck that comes back later | Daily-goal pressure and streak reminders |
| G2 | **Bizzing Maths** (4) | Each game has title card + how-to, painted plate, pop/wobble, combo meter, music loop, finish screen naming facts practised (d-31..41). | DragonBox · Prodigy (polish) · Toca Boca (feel): The learning is the mechanic; every action has motion and sound; levels and personal bests | Battles where learning is a toll gate; luck-based scoring |
| G6 | **Bizzing Bee** (4) | Combos (5x), stars, confetti, speed bonus, hearts, glitch effects. Quiz screens static. | DragonBox · Prodigy (polish) · Toca Boca (feel): The learning is the mechanic; every action has motion and sound; levels and personal bests | Battles where learning is a toll gate; luck-based scoring |
| G7 | — (no app at 4 yet) | — | DragonBox · Prodigy (polish) · Toca Boca (feel): The learning is the mechanic; every action has motion and sound; levels and personal bests | Battles where learning is a toll gate; luck-based scoring |
| I4 | **Bizzing Bee** (4) | Bizzy appears in logo, lessons, arcade, Bizzillionaire lifeline, home tip. Speaking only in explainers. | Epic · Khan Academy Kids characters: Illustrated, read-aloud stories; a cast that appears everywhere | Stories as walls of text |
| J4 | **Bizzing India** (4) | IND_RARITY: Starter/Rare/Epic/Legendary (10/18/26/24); sacred figures flat, real people 40 coins. | Pokémon-style collections done ethically · Apple Memoji (customisation): Rare tiers with the unlock printed on the card; outfits and frames; a showcase page | Gacha, packs, random drops, pay-for-a-chance |
| J5 | **Bizzing India** (4) | Card prices (🪙40) shown; gods free; "How meeting someone works" explains price and that rare cards name the learning. | Pokémon-style collections done ethically · Apple Memoji (customisation): Rare tiers with the unlock printed on the card; outfits and frames; a showcase page | Gacha, packs, random drops, pay-for-a-chance |
| J6 | **Bizzing Maths** (4) | Avatar on Home greeting, top bar, contest field/podium, ceremony, report card; frame shows in top bar. | Pokémon-style collections done ethically · Apple Memoji (customisation): Rare tiers with the unlock printed on the card; outfits and frames; a showcase page | Gacha, packs, random drops, pay-for-a-chance |
| J7 | **Bizzing India** (4) | avcard pages: lore, ITIHAAS evidence, quote with source (w-avcard-gandhi); Me page shelf. | Pokémon-style collections done ethically · Apple Memoji (customisation): Rare tiers with the unlock printed on the card; outfits and frames; a showcase page | Gacha, packs, random drops, pay-for-a-chance |
| K4 | — (no app at 4 yet) | — | Khan Academy energy points · Club Penguin-style fixed-price shops: Coins earned only by learning, spent on fixed-price cosmetics, rare avatars, game skins and unlocks worth saving for | Coins sold for real money; loot boxes; content locked behind coins |
| K5 | **Bizzing India** (4) | Real-people cards bought with coins; rarity prices 120/250/500; mastery chips "MASTERED" on Akbar's Darbar. | Khan Academy energy points · Club Penguin-style fixed-price shops: Coins earned only by learning, spent on fixed-price cosmetics, rare avatars, game skins and unlocks worth saving for | Coins sold for real money; loot boxes; content locked behind coins |
| K9 | **Bizzing Finance** (4) | Wallet: every movement dated, printable statement; jars, bank vault, net worth on Progress. | Khan Academy energy points · Club Penguin-style fixed-price shops: Coins earned only by learning, spent on fixed-price cosmetics, rare avatars, game skins and unlocks worth saving for | Coins sold for real money; loot boxes; content locked behind coins |
| K10 | — (no app at 4 yet) | — | Khan Academy energy points · Club Penguin-style fixed-price shops: Coins earned only by learning, spent on fixed-price cosmetics, rare avatars, game skins and unlocks worth saving for | Coins sold for real money; loot boxes; content locked behind coins |
| L3 | **Bizzing Maths** (4) | Medal ceremony with child's face, Aryabhata, confetti, sound (d-18); confetti on stop passes; game finish cards. | Khan Academy badges · Apple Fitness awards: Evidence badges with beautiful art, a level-up ceremony, certificates to share with family | Streak badges; leaderboards comparing children |
| M3 | — (no app at 4 yet) | — | Khan Academy Kids · Epic Read-to-me: Every instruction read aloud for pre-readers in a warm recorded voice; soft sounds and a mute | Robotic device speech; loud reward jingles |
| M4 | — (no app at 4 yet) | — | Khan Academy Kids · Epic Read-to-me: Every instruction read aloud for pre-readers in a warm recorded voice; soft sounds and a mute | Robotic device speech; loud reward jingles |
| M5 | — (no app at 4 yet) | — | Khan Academy Kids · Epic Read-to-me: Every instruction read aloud for pre-readers in a warm recorded voice; soft sounds and a mute | Robotic device speech; loud reward jingles |
| N4 | **Bizzing India** (4) | Nav/UI icons inline SVG (12-24 per screen); emoji mainly as content (🪙, 🙏 Greetings, 🗺⛰ map toggle, 🪔 badges). Raster only for art. | Toca Boca · Khan Academy Kids · Duolingo (illustration system): One art direction everywhere; a real SVG icon set (not emoji); self-hosted display + body fonts; meaningful motion | Emoji as UI icons; mixed icon styles; system fonts |
| N5 | **Bizzing Bee** (4) | SVG icon set consistent stroke weight (nav, top bar); iconSVG grid-fallback trap documented; emoji vary by platform. | Toca Boca · Khan Academy Kids · Duolingo (illustration system): One art direction everywhere; a real SVG icon set (not emoji); self-hosted display + body fonts; meaningful motion | Emoji as UI icons; mixed icon styles; system fonts |
| N12 | — (no app at 4 yet) | — | Toca Boca · Khan Academy Kids · Duolingo (illustration system): One art direction everywhere; a real SVG icon set (not emoji); self-hosted display + body fonts; meaningful motion | Emoji as UI icons; mixed icon styles; system fonts |
| P3 | — (no app at 4 yet) | — | Apple HIG · WCAG 2.2 AA: 44 pt targets, bottom tabs, contrast and focus as tested rules | Fixed desktop layouts squeezed onto phones |
| P6 | **Bizzing Maths** (4) | No unnamed buttons or alt-less images; aria-live on answers; reduced motion stops motif (animation none) and calms game pops. | Apple HIG · WCAG 2.2 AA: 44 pt targets, bottom tabs, contrast and focus as tested rules | Fixed desktop layouts squeezed onto phones |
| R2 | **Bizzing Finance** (4) | First load ~760KB raw: index.js 597KB (199KB gz), CSS 61KB, 2 fonts; lessons lazy chunks. | web.dev performance budgets · Google PWA checklist: A written budget enforced in the build; offline after first visit | Shipping every data file at boot |
| R7 | **Bizzing Maths** (4) | No secrets or accounts in client; PIN stored locally in plain text (documented as deterrent). | web.dev performance budgets · Google PWA checklist: A written budget enforced in the build; offline after first visit | Shipping every data file at boot |
| T9 | — (no app at 4 yet) | — | Apple Family Sharing · Google Workspace app switcher: One family account every app recognises; the same top bar in every app; share cards for milestones | Paywalls on the child's screen |

## 4. Games, worlds and features (from the walkthrough)

**Games to improve or cut** (each must meet standard §14):

| Game | Score | Verdict | Note |
|---|---|---|---|
| Country Capitals quiz (type / 4 choices / reveal) | 3 | improve | Typing plus a box system across days is real learning; plain MC chrome, no timer, mistakes text-only. |
| Flags quiz | 3 | improve | Clean flag SVGs; missed flags reviewed as text without the flag. |
| Dictionary quiz | 2 | improve | Plain word-to-meaning MC; no pictures. |

**Absent, weak or useless features:**

- **Rare / tiered avatars** (absent): All 40 free by rule; owner wants Common→Legendary tiers and something to save for.
- **Avatar customisation** (absent): No outfits, accessories or avatar frames.
- **Mistakes deck** (weak): Only an end-of-run text list; flags shown without the flag; nothing persists.
- **List mode on continent questions** (useless): Shows a single option, the right one — leaks the answer for screen-reader and keyboard users.
- **Music** (absent): No music at all; sfx are synth blips.
- **Recorded narration** (absent): Device TTS only; quality varies widely by device.
- **Global search** (absent): Only per-tool searches; cannot find a stop or country from one box.
- **Stories / cast** (absent): No stories, no recurring characters beyond Compass Owl in onboarding.
- **Mock contest / Geo Bee** (absent): Only level checks; the family’s contest format is missing.
- **Map shop** (weak): Ten cosmetic pins and frames, ~340 coins total; economy runs dry in a week.
- **Hints in drills** (absent): No hint step in any station question.
- **Place of the hour card** (weak): Shows one postcard but opens the generic Where on Earth? page.
- **Dictionary** (weak): 309 words as bare text over the moving scene; no pictures.
- **Share / certificate cards** (weak): Expedition certificate only; nothing printable or shareable for worlds or medals.

**Visual bugs and dead ends seen** (each gets a check):

- List mode on continent map questions shows ONE option, the right answer (62-listmode-one-option)
- Phone Atlas: world pin labels overlap and clip ("als", "ers")
- Grown-ups: Street View setting label split into three narrow columns
- Dictionary entries sit on the moving scene with no card; bottom rows low contrast over the sea
- Compass rose beside the plan figure in Compass drills is tiny and clipped on the right (NE/E/SE)
- GeoGuess results say "1 points"
- Stop page lesson card leaves a large empty left column on desktop
- Scene balloons sit behind page subtitles; world subtitles truncated with ellipsis
- #/lib/<unknown> keeps a bad URL while showing the Library (not a trap)
- Place of the hour card opens the generic Where on Earth? page, not the place shown

## 5. Not in this chat

Entitlements (T1), pricing in the product (T2), free-vs-paid copy (T4) and marketing pages (T8) come with the shared family server and billing, which is built once for every app. Do not build app-local paywalls. Until then, "family plan" is a flag the grown-ups' tester mode can set. **Narration:** none new for now (owner's decision). Do not add it.

## 6. Definition of done

- [ ] Every Fix-first item is shipped and tested.
- [ ] Every key element in §3 is at **≥ 4**, each with its Done-when check in the test suite.
- [ ] `validate(avatars)` returns `[]`: 96 avatars in 12 × 8, tiers 2/3/2/1, every Legendary has a milestone, nothing sacred or real.
- [ ] At least six worlds meet §7 (painted, three ambient layers, a designed night, music), screenshotted in light and dark at 390 px and 1280 px.
- [ ] The mascot and app icon ship per §2 (the owner's pick).
- [ ] Top bar, ☰, tabs and Settings match §3–§5.
- [ ] The browser check (§22) passes on desktop and phone.
- [ ] Deployed per the repo's CLAUDE.md. Reply with the commit and a re-score of every row you changed.
