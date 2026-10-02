# Bizzing Finance — fix brief v2 (family audit, 2 Oct 2026)

Paste this into the Bizzing Finance chat, or point that chat at this file. It replaces the v1 brief. It is the work to bring Bizzing Finance to **at least 4 on every key element** and in line with the **[Bizzing family standard v2](https://github.com/aayuvis/Bizzing_Schedule/blob/claude/amazing-knuth-4aemgz/docs/family/FAMILY-STANDARD.md)**. Read the standard first.

- **Repo:** aayuvis/bizzingfinance — app in `app/`. Follow the repo's own CLAUDE.md for branch, tests and deploy.
- **Audited:** claude/peaceful-mayer-8v29cu @ 5742888 (2026-10-02).
- **Today:** average **3.27** across 152 elements; **41 of 97 key elements below 4**.
- **Verdict:** All four parent-visible number bugs from FIX-FINANCE are fixed: one 4.00% town rate drives Bank and Exchange, the snowball projects the real balance (₹100→₹149 at 10y), the report names a split as a choice only when changed, and Add 200 XP exists only in tester mode. Home is now one Continue on a painted street, the Atlas is strong, and privacy/no-loot design is exemplary. But content is thin (40 MCQ lessons, ~6–10 hours), game play screens are flat, Change Rush freezes on a catch, and new parent-visible faults appeared: the report calls every child she/her and says a child who just played has not been in. No rarity, no cosmetics, no music, no pricing or entitlements — it remains a polished simulator, not yet a product.
- **Strengths to keep:** All four FIX-FINANCE number bugs verified fixed in the running app · Exemplary privacy: zero external requests, allow-list backup, minimal child data · Decision-scored games (Market Cup, Market Storm) teach the right instincts · Mastery counted only after a gap; reports learning, lapses and decisions

## How to work this brief

1. Do **§1 Fix first** in one commit, deploy and confirm it.
2. Do **§2 Harmonise**: every app is making these changes at the same time, so do them as written. Copy the shared files from the Bizzing_Schedule repo: `integration/bizzing-activity.js`, `bizzing-wallet.js`, `bizzing-avatars.js` and `bizzing-avatars.css`.
3. Work the **§3 key elements** table top to bottom, batching related rows into one commit each.
4. For every row, add the **Done when** check to the app's tests, and **prove it by breaking it once**.
5. Finish with **§6 Definition of done**, and report back the commit and the new scores.

## 1. Fix first (trust)

- **Change Rush freezes for good** after a catch with other coins on screen (arcade.js:931-934 splices a cleared array, and the rAF loop throws). Add a test that plays 60 s with overlapping coins.
- **The report calls every child "she".** Use the child's name or "they" (§15).
- **The PIN is stored in plain text and stays unlocked after a reload.** Store a hash and ask again after a reload (Q1).
- **Closing a lesson unanswered skips it for good.** Continue must come back to it.
- **Wrong-answer feedback leaks the answer** before the child has tried again (E5, E11).
- **"Sell 10% for ₹0"** while equity shows ₹1,500. **"Its price over the last 0 years"** and **"Revenue grew 0.0%"** in year 1: no projection on zero (§15).
- **Dark mode puts a line through the street labels.** Paintings stay full-bright. Confetti sits over the Continue button.

## 2. Harmonise with the family (standard v2)

- **Mascot (§2):** the owner picks from Pip / Penny / Bo. Pip is already the greeter, so making Pip the one mascot is the smallest step. Nana Bizz, Mags, Bo and Bea stay as the town's cast.
- **App icon:** the mascot on emerald with acorns. No currency symbol (currency is a setting).
- **Avatars (§8), the owner overriding docs/11:** adopt the family engine, priced in family Bizzing coins (the child's income in Finance). There are 21 avatars today with no tiers. Keep those not shared with a sibling, add **Bee's Critter Crew and Vibe packs**, and generate the rest to 96, two packs per world. Update Finance's CLAUDE.md to record the decision. Town money stays the curriculum and never buys avatars.
- **Worlds (§7):** **create six** (today there are only Light and Dark). Draw them from the town: for example Market Row Morning, Old Harbour, Clocktower Square, Exchange Quarter, The Works and Festival Night, each painted with a night variant and ambient townsfolk.
- **Tabs (§4):** Home · Town · Learn · Money · Play. The 7 desktop tabs and the phone "More" move into ☰.
- **Music (§11):** none today. Add a loop per world and for home, plus the volume slider. Keep the lesson narration as it is.
- **Settings (§5):** sound, look and comfort go in the family order. Allowance, pay day and chores go behind the PIN.
- **Lessons (E4):** go beyond multiple choice. The lesson stage is "a mostly empty sky with a 24 px icon", so paint it.
- **Mistakes deck (F3)** and **search (C4)**.
- **Top bar and ☰ (§3):** `[⬡ Hive] [☰] [mascot + Bizzing …] … [search] [coin chip] [theme] [🔒] [avatar ▾]`, 56 px. The ☰ drawer lists My page · Shop · Collection · Medals · *(up to 4 app areas)* · Settings · Grown-ups 🔒 · Help · Privacy · Back to the Hive.
- **Settings (§5):** Bee's sheet, with the sections in this order: Me · Sound & music · Look · Comfort · Grown-ups 🔒.
- **Glossary (§21):** Bizzing coins · World · Stop · Continue · Collection · Shop · Medals · Grown-ups · Family plan.
- **Hive (§19):** activity and milestones written, coins through the wallet, avatars through the engine, `#/continue` and `?from=hive` accepted.

## 3. Key elements below 4

| Id | Element | Now | What the audit saw | Change | Done when | Effort |
|---|---|---|---|---|---|---|
| A8 | First-session "aha" | **3** | First lesson has 37–73s narrated stage + 3 MCQs; success possible in 2 min. But Continue skips "Money is an agreement" (stop 1) and starts at stop 2. | Make the first beat stop 1 and end it with a visible win (coin into a jar on the street). | A new child gets a right answer and a celebration inside two minutes (scripted in the check). | S |
| B3 | Progress visible on home | **3** | Home shows "Stop 1 of 40 · Saver L1", 0/3 today, Atlas "0 of 40 stops", wallet. Progress bar on hero is thin/grey. | Show world progress (Market Row 2/8) as the street itself filling, not a grey bar. | Progress bar and position ("stop 3 of 12") on the Continue card. | M |
| B10 | Returning-child state | **2** | Leaving a lesson via "← All chapters" without answering moves the beat on: Home then offered "Where money comes from" and "Needs and wants" was skipped (w2 log). | Keep an unfinished lesson as the next step until it is answered; never mark seen on open. | Reload mid-journey → Continue points at the exact stop left (check). | S |
| C3 | Sibling switching | **3** | Avatar ▾ opens "Who is playing?"; add a child via grown-ups. Each child separate town. Works but adding is buried in Settings/Parents. | Show sibling avatars directly in the switcher with a PIN-guarded "+". | Avatar ▾ in the top bar lists every child; switching tested with two children, no data mixed. | S |
| C4 | Search | **2** | Only Money Words (44 terms) is searchable; no search across lessons, games, letters. | Add one search over cards, glossary and games from the Atlas header. | Search pill/icon finds any lesson, stop, story, word or place; check searches three known items. | M |
| C5 | Dead ends & broken links found in the walkthrough | **3** | No dead links, but Change Rush freezes mid-game (rAF loop throws), test-out/overlays have no visible close (backdrop/Esc only). | Fix Change Rush loop; add an explicit ✕ to every overlay. | Walkthrough finds no dead end; check visits every route and asserts a heading and a way back. | S |
| D10 | World ambient life | **2** | Street has a companion walking and a ping on the postbox; walks are static; no ambient sound or townsfolk motion. | Add idle animations (smoke, gulls, lanterns) and a soft ambient loop per world. | Three ambient layers per world, paused when hidden, frozen under reduced motion (check). | M |
| E5 | Answer feedback | **3** | Right advances with "Next question"; wrong holds ("Not this time — and this is the useful bit…") but the explanation states the answer before the second go. | On a wrong pick, explain the misconception without naming the right option; reveal after the second try. | Right advances; wrong holds, explains on the exact item, waits for a tap (check). | S |
| E6 | Hints & scaffolding | **2** | Hints: "Read it to me", an example box. No graded hints inside a question; second go is the scaffold. | Add one non-revealing hint per question that points back to the stage beat. | A hint on the exact wrong item, never revealing the answer. | M |
| E9 | Mastery from evidence | **3** | mastery.js: learned only when retained after a gap or transferred; but a single jar "+" tap records KEEP-2 transfer (main.js:872), bankIn records GROW-1. | Require a decision with an alternative (e.g., chose jar over spending) before logging a transfer. | Mastery from spaced evidence; a miss drops one step and is shown. | S |
| E11 | Question testing & answer-leak protection | **3** | Options permuted per card (shuffledDrill), test/questions.mjs; but wrong-answer feedback leaks the answer before retry. | Hold the explanation until the second attempt. | Generated questions tested: one right answer, no leak, even answer slots (test suite). | S |
| F3 | Mistake review | **2** | Revise shelf exists (retrieval), "What she found hard" in the report; no child-facing deck of missed questions. | Add "Ones to try again" built from wrong first answers. | A mistakes deck that brings missed items back after a gap. | M |
| F4 | Session end summary | **3** | Games end with an end card ("You practised: …", wage). Lessons/sessions have no summary; closing time card only after quests. | One end-of-session card: what you learned, earned, kept. | Finish screen names what was practised and what is next. | S |
| G2 | Average game quality | **3** | Played all 12 with keyboard (w6): each completes with a teaching end card; UI is flat panels over a blurred cover painting. | Draw play objects (coins, stalls, towers) in the painted style instead of flat panels. | Every game meets §14; average game score ≥ 4 on the next audit. | L |
| G5 | Game art | **2** | Arcade covers are lovely paintings, but play screens are flat lanes/cards/bar charts with the cover blurred behind (contact-games-mid.png). | Bring sprites into play (coins, crates, stall, tower). | Every game has painted art in its world's style. | L |
| G6 | Game animation & juice | **2** | Motion on answers (flash), confetti at ends; Change Rush coins drop; little juice (no particles, squash, combo). | Add hit-stop, coin bursts, number pops and streak-free combos within a round. | Motion on every answer; combo or progress feedback. | M |
| G7 | Game sound | **2** | WebAudio synth clicks/coins/bell (ui.js:40); no music, no recorded effects. | Add a small recorded SFX set and a per-game loop. | Effects and a music loop in every game. | M |
| G10 | Keyboard AND touch in every game | **3** | Keyboard works in all 12 (w6); touch buttons/lanes exist (crLane, hold button). Change Rush freezes after a catch with several coins on screen. | Fix the Change Rush splice bug (arcade.js:931-934) and test touch in the browser check. | Browser check plays every game by keyboard AND by touch. | S |
| J1 | Avatar count | **3** | 21 family avatars at setup (desk-01-setup), all free. | State the count in the profile and allow changing later. | 96 avatars in 12 packs of 8; `validate()` returns [] in the test suite. | S |
| J4 | Rare/collectible tiers present | **1** | No rarity tiers anywhere; refused by design (docs/11). | Add Common/Rare/Epic frames earned by milestones, never random. | Common · Rare · Epic · Legendary on every card, via bizzing-avatars.js. | M |
| J5 | Unlock path stated on every avatar | **1** | Avatars have no unlock path — all 21 free; nothing to unlock. | Gate some avatars on world completion with the path written under each. | Every card states its path in plain words (`stateOf().say`). | M |
| J6 | Avatar shown across the app | **3** | Avatar in top bar and child switcher; not on Home greeting (Pip shown), results or map. | Show the child's avatar walking the street and on end cards. | The chosen avatar in top bar, greeting, finish screens, map and the Hive. | S |
| J7 | Showcase / trading-card / profile page | **2** | Collection has badges, keepsakes, people met, money museum; no child profile/showcase card. | A profile card with avatar, rank, three proudest badges, printable. | Collection page: all 96 by pack, owned and locked, with paths; the night glow. | M |
| K2 | Earned only for learning | **3** | Wages from jobs, games and lessons; but games pay for poor play (job with 0 crates paid ₹27) and are uncapped — replaying farms money. | Cap game wages per day per game. | Coins only from the four standard events; check fails on any other. | S |
| K4 | Shop variety | **2** | Store: 6 capability items + 2 "lovely useless" (kite, brass button); no avatar/theme/board skins. | Add cosmetics (stall awnings, avatar frames, board skins) at fixed prices. | At least three kinds of thing to buy (avatars, worlds, one cosmetic line). | M |
| K5 | Rare avatars obtainable with coins and/or milestones | **1** | No avatar purchasable or milestone-unlocked. | Let saved town money buy avatar frames; milestones unlock rare avatars. | Rare avatars by coins (and Legendaries by milestone + coins). | M |
| K10 | Economy balance | **3** | Rent, food, pet food, repairs (₹1,200 fountain) give saving targets; uncapped game wages can flood the economy. | Daily wage cap and weekly bills scaled to income. | A free child has something worth saving for in week 4 (Legendary, world 3). | S |
| L3 | Celebration moments | **3** | Confetti on first home, store buy, venture open, end cards with lines; first-receipt keepsake slip is charming. | Make celebrations distinct per moment instead of reused confetti. | Celebration on every finish and milestone, naming what was done. | M |
| M3 | Sound effects | **2** | Synthesised WebAudio clicks/coin/bell/bad (ui.js). | Recorded, warm SFX set. | Right · wrong · finish · medal · coin · unlock effects. | S |
| M4 | Music | **1** | No music anywhere. | A gentle loop per world, off by default for lessons. | Music per world, home and games per §11, with CREDITS.md. | M |
| M5 | Mute/volume controls | **3** | Settings: Sound on/off, narration speed slower/normal. No volume. | Separate voice and effects toggles. | Effects, music and one volume slider in Settings §5; mute one tap from ☰. | S |
| N12 | Visual bugs found | **3** | Phone: "Postbox" label clipped at left edge; dark mode street labels look struck through; confetti over text; Atlas numbering skips current stop. | Fix label positions and confetti layering. | No visual bug from this brief's list remains (each has a check). | S |
| O4 | Night mode quality | **3** | Dark UI good contrast, but street and hero paintings stay full-bright in dark (phone-dark-61-home). | Dim/tone paintings in dark mode. | Every world has a designed night; AA on every plate in dark (check). | S |
| P3 | Touch target sizes | **3** | Home phone: 14 targets under 44px (36×36 top-bar icons, 36px Read-it-to-me, Travel). | Raise top-bar and chip targets to 44px. | Every target ≥ 44 px (check samples). | S |
| P6 | Screen-reader labels & reduced motion | **3** | All imgs have alt; reduced-motion supported; 16 buttons without accessible name on Home; SVG street g role=button. | Label icon-only buttons. | aria-labels on icon buttons; reduced motion respected. | S |
| Q1 | Grown-ups area behind a PIN | **2** | PIN set by whoever opens it first; stored plaintext in bzf_profile; unlock persists across reload ("gate":true saved) until "Lock". | Ask for the PIN at setup by the grown-up; never persist the unlocked state. | Grown-ups behind the PIN; PIN hashed and re-asked after reload. | S |
| Q2 | Report card quality | **3** | Report: Time · Progress · Mastery, what moved, found hard, one thing to try, coming next, six strands. Hard-codes "she/her" for every child; says a child who played… | Use the child's name or "they"; base "not in" on activity. | Report card: Time · Progress · Mastery per child + what to help with next. | S |
| R4 | Console errors during the walkthrough | **3** | 1 page error across the walk: "Cannot read properties of undefined (reading 'y')" — Change Rush loop dies. | Fix and add a game-loop assertion to browser check. | Zero console errors across the walkthrough (check). | S |
| R7 | Security | **3** | No secrets in client; PIN plaintext in localStorage; sim clock client-side. | Hash the PIN; server clock before launch. | No seeded accounts or pass codes in client code. | S |
| S4 | Sensitive content handled | **3** | Money handled carefully (no advice, fictional firms) but Market Game firms are thin disguises of real ones (Harbor Roasters 32,000 shops, Bellwether "trillions" index… | Make companies clearly fictional without real-world identifiers. | Sacred figures never as villains; real people with an about line; sensitive content reviewed. | S |
| T9 | Shareability | **2** | Till puzzle has a share that carries no answer; printable week page; no certificates or share cards. | World-completion certificate and receipt share card. | Certificates per §13, shared from the grown-ups area. | M |

Already at 4 or 5 (keep them there): A1 Landing/welcome clarity, A3 Time to first learning, A4 Profile setup minimal & fast, A5 Demo / try-before-signup, B1 Home layout & hierarchy, B2 Exactly one primary Continue, B5 Mascot / greeting personality, B7 Phone home: Continue above the fold, C1 Tab model, C2 Back button & hash routing, D1 Number of worlds/lands/levels, D3 World art quality, D4 World art consistency, D5 World variety, D8 World progression visible, E3 Teaching the why, E10 Content accuracy & sourcing, F1 Short daily session, G4 Learning IS the mechanic, G11 Filler/useless games, I4 Mascot quality & presence across the app, J2 Avatar art quality, K1 Currency present, K3 A shop exists, K7 Prices visible and fixed, K8 No random rewards / gacha / pay-to-win, K9 Wallet & coin history visible to the child, L1 Medals/badges from evidence, L5 No streak pressure, L6 Positive tone on mistakes, N1 Overall visual polish, N2 Art-direction consistency across all screens, N4 Iconography system: SVG vs emoji vs raster, N5 Icon quality & legibility, N6 Font quality: faces used, self-hosted, display/body pairing, weights loaded, O3 Night/dark mode present, P1 Phone layout: no overflow at 390 px, P2 Thumb reach & bottom tab bar, P4 Contrast in light and dark, P5 Keyboard navigation & visible focus, Q3 Reports learning, not just usage, Q4 Controls, Q5 Data export / erase, Q6 Multiple children managed, Q7 Tester/dev controls hidden from the child, R1 Offline / PWA installable, R2 First-load weight, R5 Automated tests & browser checks, R6 Storage seam & versioned migrations, S1 Child data minimal, S2 No third-party requests, S3 Privacy page accurate, T3 Paywall never on the child's screen, T5 Bizzing Hive feed written, T6 Deep links accepted, T7 Family top bar / brand layer.

### 3a. Draw inspiration from

For each row above, copy the in-family model first, then the outside benchmark (standard §23).

| Id | Copy from (Bizzing) | What exactly | Outside benchmark | Don't borrow |
|---|---|---|---|---|
| A8 | **Bizzing Maths** (4) | First stop: story beats, worked steps, 'Your turn' typed steps, 10-q drill; first pass triggers 'First star' medal ceremony with confetti… | Duolingo · Khan Academy Kids: A first lesson before sign-up; placement that starts as questions; one friendly character and one big button | Long sign-up forms; asking for a child's email or birthday |
| B3 | **Bizzing Maths** (4) | Today's ring (right answers 20/20, stops 1/1, puzzle 0/1), 'Station 2 of 16', progress tiles (goals, Atlas stars, tower). | Duolingo (the path) · Bizzing Bee's own home (owner's template): One obvious next step everything else supports; a home that picks up exactly where the child left off | Hearts, gems, leagues and the streak flame on home |
| B10 | **Bizzing Maths** (4) | Returning Home names last activity ('You cleared floor 1 of the Puzzle Tower last time') and Continue goes to station 2 (d-20, d-62). | Duolingo (the path) · Bizzing Bee's own home (owner's template): One obvious next step everything else supports; a home that picks up exactly where the child left off | Hearts, gems, leagues and the streak flame on home |
| C3 | **Bizzing Maths** (4) | Avatar ▾ sheet lists both children, one tap to switch, add a child, sound and dark toggles (d-62). | Apple HIG tab bars · Khan Academy Kids profiles: ≤ 5 tabs, back always stays inside the app, one-tap child profiles, a search that finds any lesson | Hamburger menus hiding main areas |
| C4 | **Bizzing Bee** (4) | Header 'Search any word…' gives live dictionary matches (rhythm, latin) and 'See all matches'; Word Finder searches 40k/128k. Search does… | Apple HIG tab bars · Khan Academy Kids profiles: ≤ 5 tabs, back always stays inside the app, one-tap child profiles, a search that finds any lesson | Hamburger menus hiding main areas |
| C5 | **Bizzing Maths** (4) | No dead ends in walkthrough; quibbles: Library/Vedic stones and Times-table stops stay locked in tester mode; overlays (sudoku) hide nav. | Apple HIG tab bars · Khan Academy Kids profiles: ≤ 5 tabs, back always stays inside the app, one-tap child profiles, a search that finds any lesson | Hamburger menus hiding main areas |
| D10 | — (no app at 4 yet) | — | Prodigy (world map) · Toca Boca (world feel) · Monument Valley (art direction): Each world a distinct, alive place with its own palette and sound; the map shows where you are and what is next | Worlds that are only a background behind the same quiz |
| E5 | **Bizzing Maths** (5) | Right auto-advances on the keystroke; wrong holds with 'Not this time. It is 20' + reason chip or the trick worked on that exact question… | Brilliant · DragonBox · Khan Academy: Interactive why before practice; varied item types; hints on the exact wrong item; mastery that is re-checked | Multiple-choice only; self-marked 'complete' |
| E6 | **Bizzing Maths** (4) | Guided 'Your turn' shows a step after two misses; 'Show me' in Make the Target; sudoku hints; tip to do Your turn first. | Brilliant · DragonBox · Khan Academy: Interactive why before practice; varied item types; hints on the exact wrong item; mastery that is re-checked | Multiple-choice only; self-marked 'complete' |
| E9 | **Bizzing Maths** (4) | Stars from drill accuracy/pace; 32 goals measured from evidence; fluent decays; 'Slipped since fluent' in report. Stops never decay. | Brilliant · DragonBox · Khan Academy: Interactive why before practice; varied item types; hints on the exact wrong item; mastery that is re-checked | Multiple-choice only; self-marked 'complete' |
| E11 | **Bizzing Maths** (5) | npm test passes: ~57k trick questions ×3 routes, 4720 level questions, 5179 voice lines, puzzles proven unique; leak tests. | Brilliant · DragonBox · Khan Academy: Interactive why before practice; varied item types; hints on the exact wrong item; mastery that is re-checked | Multiple-choice only; self-marked 'complete' |
| F3 | **Bizzing Bee** (4) | Misses 'Saved for revision', Revision pile, My traps radar, 'My missed words' list, Tricky review. | Duolingo lessons · Anki: 3–5 minute sessions with a clean finish screen; a mistakes deck that comes back later | Daily-goal pressure and streak reminders |
| F4 | **Bizzing Maths** (4) | Run end: stars, '8 of 10 right', station count, missed items, next-station button (d-18); games list what was practised. | Duolingo lessons · Anki: 3–5 minute sessions with a clean finish screen; a mistakes deck that comes back later | Daily-goal pressure and streak reminders |
| G2 | **Bizzing Maths** (4) | Each game has title card + how-to, painted plate, pop/wobble, combo meter, music loop, finish screen naming facts practised (d-31..41). | DragonBox · Prodigy (polish) · Toca Boca (feel): The learning is the mechanic; every action has motion and sound; levels and personal bests | Battles where learning is a toll gate; luck-based scoring |
| G5 | **Bizzing Maths** (4) | Painted plates for Rush meadow, archery field, pier; bubbles are canvas gradients; Sudoku has no art (plain white overlay). | DragonBox · Prodigy (polish) · Toca Boca (feel): The learning is the mechanic; every action has motion and sound; levels and personal bests | Battles where learning is a toll gate; luck-based scoring |
| G6 | **Bizzing Bee** (4) | Combos (5x), stars, confetti, speed bonus, hearts, glitch effects. Quiz screens static. | DragonBox · Prodigy (polish) · Toca Boca (feel): The learning is the mechanic; every action has motion and sound; levels and personal bests | Battles where learning is a toll gate; luck-based scoring |
| G7 | — (no app at 4 yet) | — | DragonBox · Prodigy (polish) · Toca Boca (feel): The learning is the mechanic; every action has motion and sound; levels and personal bests | Battles where learning is a toll gate; luck-based scoring |
| G10 | **Bizzing Maths** (5) | Rush played by keyboard (desktop) and tapping on-screen pad (phone); Line by click/tap/arrows; Target by keys 1–4 and +−×÷ or taps. | DragonBox · Prodigy (polish) · Toca Boca (feel): The learning is the mechanic; every action has motion and sound; levels and personal bests | Battles where learning is a toll gate; luck-based scoring |
| J1 | **Bizzing Bee** (4) | 142 in the Hive collection (18 packs ×8 plus champions), 20 starters; 150 defined in avatars.js. | Pokémon-style collections done ethically · Apple Memoji (customisation): Rare tiers with the unlock printed on the card; outfits and frames; a showcase page | Gacha, packs, random drops, pay-for-a-chance |
| J4 | **Bizzing India** (4) | IND_RARITY: Starter/Rare/Epic/Legendary (10/18/26/24); sacred figures flat, real people 40 coins. | Pokémon-style collections done ethically · Apple Memoji (customisation): Rare tiers with the unlock printed on the card; outfits and frames; a showcase page | Gacha, packs, random drops, pay-for-a-chance |
| J5 | **Bizzing India** (4) | Card prices (🪙40) shown; gods free; "How meeting someone works" explains price and that rare cards name the learning. | Pokémon-style collections done ethically · Apple Memoji (customisation): Rare tiers with the unlock printed on the card; outfits and frames; a showcase page | Gacha, packs, random drops, pay-for-a-chance |
| J6 | **Bizzing Maths** (4) | Avatar on Home greeting, top bar, contest field/podium, ceremony, report card; frame shows in top bar. | Pokémon-style collections done ethically · Apple Memoji (customisation): Rare tiers with the unlock printed on the card; outfits and frames; a showcase page | Gacha, packs, random drops, pay-for-a-chance |
| J7 | **Bizzing India** (4) | avcard pages: lore, ITIHAAS evidence, quote with source (w-avcard-gandhi); Me page shelf. | Pokémon-style collections done ethically · Apple Memoji (customisation): Rare tiers with the unlock printed on the card; outfits and frames; a showcase page | Gacha, packs, random drops, pay-for-a-chance |
| K2 | **Bizzing Maths** (5) | Coins only for right answers/passed stops/tests; daily cap in wallet; never touch xp. | Khan Academy energy points · Club Penguin-style fixed-price shops: Coins earned only by learning, spent on fixed-price cosmetics, rare avatars, game skins and unlocks worth saving for | Coins sold for real money; loot boxes; content locked behind coins |
| K4 | — (no app at 4 yet) | — | Khan Academy energy points · Club Penguin-style fixed-price shops: Coins earned only by learning, spent on fixed-price cosmetics, rare avatars, game skins and unlocks worth saving for | Coins sold for real money; loot boxes; content locked behind coins |
| K5 | **Bizzing India** (4) | Real-people cards bought with coins; rarity prices 120/250/500; mastery chips "MASTERED" on Akbar's Darbar. | Khan Academy energy points · Club Penguin-style fixed-price shops: Coins earned only by learning, spent on fixed-price cosmetics, rare avatars, game skins and unlocks worth saving for | Coins sold for real money; loot boxes; content locked behind coins |
| K10 | — (no app at 4 yet) | — | Khan Academy energy points · Club Penguin-style fixed-price shops: Coins earned only by learning, spent on fixed-price cosmetics, rare avatars, game skins and unlocks worth saving for | Coins sold for real money; loot boxes; content locked behind coins |
| L3 | **Bizzing Maths** (4) | Medal ceremony with child's face, Aryabhata, confetti, sound (d-18); confetti on stop passes; game finish cards. | Khan Academy badges · Apple Fitness awards: Evidence badges with beautiful art, a level-up ceremony, certificates to share with family | Streak badges; leaderboards comparing children |
| M3 | — (no app at 4 yet) | — | Khan Academy Kids · Epic Read-to-me: Every instruction read aloud for pre-readers in a warm recorded voice; soft sounds and a mute | Robotic device speech; loud reward jingles |
| M4 | — (no app at 4 yet) | — | Khan Academy Kids · Epic Read-to-me: Every instruction read aloud for pre-readers in a warm recorded voice; soft sounds and a mute | Robotic device speech; loud reward jingles |
| M5 | — (no app at 4 yet) | — | Khan Academy Kids · Epic Read-to-me: Every instruction read aloud for pre-readers in a warm recorded voice; soft sounds and a mute | Robotic device speech; loud reward jingles |
| N12 | — (no app at 4 yet) | — | Toca Boca · Khan Academy Kids · Duolingo (illustration system): One art direction everywhere; a real SVG icon set (not emoji); self-hosted display + body fonts; meaningful motion | Emoji as UI icons; mixed icon styles; system fonts |
| O4 | **Bizzing India** (4) | Night dims frieze, warm dark cards, accent buttons with dark text (n-home-d, n-game-gyanpati-d). Night map dark and low contrast. | Apple's dark-mode guidance · Duolingo night: Each theme designed, not recoloured; art dimmed for night; follows the device setting | White flashes; pastel cards with light text at night |
| P3 | — (no app at 4 yet) | — | Apple HIG · WCAG 2.2 AA: 44 pt targets, bottom tabs, contrast and focus as tested rules | Fixed desktop layouts squeezed onto phones |
| P6 | **Bizzing Maths** (4) | No unnamed buttons or alt-less images; aria-live on answers; reduced motion stops motif (animation none) and calms game pops. | Apple HIG · WCAG 2.2 AA: 44 pt targets, bottom tabs, contrast and focus as tested rules | Fixed desktop layouts squeezed onto phones |
| Q1 | **Bizzing Maths** (4) | PIN keypad gate, labelled 'a deterrent, not a lock' (d-50). | IXL Analytics · Apple Screen Time weekly report: Skill-level diagnosis and a short weekly digest behind a PIN | Minutes shown as achievement; dev buttons a child can reach |
| Q2 | **Bizzing Maths** (4) | Per child: Time/Progress/Mastery with 6-week bars, strand bars, tricks mastered, traps, lapses, 32 goals (d-51). | IXL Analytics · Apple Screen Time weekly report: Skill-level diagnosis and a short weekly digest behind a PIN | Minutes shown as achievement; dev buttons a child can reach |
| R4 | **Bizzing Maths** (5) | 0 page errors, 0 console errors across all walks. | web.dev performance budgets · Google PWA checklist: A written budget enforced in the build; offline after first visit | Shipping every data file at boot |
| R7 | **Bizzing Maths** (4) | No secrets or accounts in client; PIN stored locally in plain text (documented as deterrent). | web.dev performance budgets · Google PWA checklist: A written budget enforced in the build; offline after first visit | Shipping every data file at boot |
| S4 | **Bizzing Maths** (5) | Vedic origin told honestly with sources; Aryabhata and Brahmagupta facts dated; money stops neutral. | Apple Kids category · kidSAFE: No ads, no tracking, data minimal by design, a privacy page that is true | Third-party scripts on a child's screen |
| T9 | — (no app at 4 yet) | — | Apple Family Sharing · Google Workspace app switcher: One family account every app recognises; the same top bar in every app; share cards for milestones | Paywalls on the child's screen |

## 4. Games, worlds and features (from the walkthrough)

**Games to improve or cut** (each must meet standard §14):

| Game | Score | Verdict | Note |
|---|---|---|---|
| Change Rush | 2 | improve | Exact-change catching is a good idea, but the loop throws and freezes after a catch with several coins falling. |
| Compound Climb | 3 | improve | Hold-to-grow with crash risk teaches compounding well; bar chart visuals only. |
| Stall Rush | 3 | improve | Serve/restock queue for 60s; busy vs profitable. Buttons, no stall drawn. |
| Main Street | 3 | improve | Board game with emoji tiles and real-money chance cards; slow, flat, two bots. |
| Times Twelve | 2 | improve | Eight monthly-to-yearly MCQs; a worksheet, not a game. |
| The Snowball | 2 | improve | Six compounding guesses with good explanation; a quiz, not a game. |
| The Market Game | 3 | improve | 40 fictional firms, annual reports, assess what hurts it; dense text, '0 years' price glitch. |

**Absent, weak or useless features:**

- **Avatar rarity and unlocks** (absent): 21 avatars all free at setup; no Common/Rare/Epic tiers, no milestone or coin path.
- **Cosmetic shop** (absent): Store sells capability items; no avatar outfits, stall skins or board themes for the child.
- **Music** (absent): No music in any screen or game; only synthesised clicks.
- **Recorded narration beyond lessons** (weak): Questions, letters, glossary and onboarding use device TTS.
- **Lesson item variety** (weak): Every assessed item is 4-option MCQ; no sort, drag or build items in lessons.
- **Mistake review deck** (absent): No child-facing list of questions got wrong.
- **Pricing and entitlements** (absent): No price, no free/paid split, no server entitlement.
- **Certificates / share cards** (absent): No world certificate or shareable card; only a printable parent week.
- **Parent PIN** (weak): First visitor sets it; plaintext in storage; stays unlocked across reloads.
- **Parent report pronouns** (weak): Every child is 'she/her' (report.js:45,92; views.js:1415).
- **Lesson stage visuals** (weak): Narrated stage is mostly empty sky with tiny line icons.
- **Home hero plates** (useless): Five near-empty blurred sky backdrops behind Continue add nothing; walk paintings would.
- **Search** (weak): Only the glossary is searchable.

**Visual bugs and dead ends seen** (each gets a check):

- Phone Home: 'Postbox' label clipped at the left edge of the street
- Dark mode: street building labels render with a line through them; paintings stay full-bright
- Confetti layered over text and Continue button on first Home
- Home hero says 'Stop 1 of 40' for what the Atlas numbers stop 2; Atlas current stop shows no number
- Lesson stage is a mostly empty sky with a 24px icon (desk-23)
- Business: 'What your share is worth ₹0' and 'Sell 10% for ₹0' while owner equity shows ₹1,500
- Market Game: 'Its price over the last 0 years', 'Revenue grew 0.0%' in year 1
- Market Cup copy: 'On money alone Boring Bella finished top' when Bella also won on cup score
- Change Rush freezes permanently after a catch with other coins on screen (arcade.js:931-934 splices a cleared array, rAF loop throws)
- Test-out quiz and other overlays have no visible close button — only backdrop tap or Escape
- Closing a lesson unanswered skips it: Continue moves to the next stop and never returns
- Main Street could not be finished in 60s of Enter/Y/N (stuck at lap 1 on a two-option chance card needing 1/2)

## 5. Not in this chat

Entitlements (T1), pricing in the product (T2), free-vs-paid copy (T4) and marketing pages (T8) come with the shared family server and billing, which is built once for every app. Do not build app-local paywalls. Until then, "family plan" is a flag the grown-ups' tester mode can set. **Narration:** none new for now (owner's decision). Keep the existing clips.

## 6. Definition of done

- [ ] Every Fix-first item is shipped and tested.
- [ ] Every key element in §3 is at **≥ 4**, each with its Done-when check in the test suite.
- [ ] `validate(avatars)` returns `[]`: 96 avatars in 12 × 8, tiers 2/3/2/1, every Legendary has a milestone, real people with an about line.
- [ ] At least six worlds meet §7 (painted, three ambient layers, a designed night, music), screenshotted in light and dark at 390 px and 1280 px.
- [ ] The mascot and app icon ship per §2 (the owner's pick).
- [ ] Top bar, ☰, tabs and Settings match §3–§5.
- [ ] The browser check (§22) passes on desktop and phone.
- [ ] Deployed per the repo's CLAUDE.md. Reply with the commit and a re-score of every row you changed.
