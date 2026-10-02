# Bizzing Maths — fix brief v2 (family audit, 2 Oct 2026)

Paste this into the Bizzing Maths chat, or point that chat at this file. It replaces the v1 brief. It is the work to bring Bizzing Maths to **at least 4 on every key element** and in line with the **[Bizzing family standard v2](https://github.com/aayuvis/Bizzing_Schedule/blob/claude/amazing-knuth-4aemgz/docs/family/FAMILY-STANDARD.md)**. Read the standard first.

- **Repo:** aayuvis/Bizzing-Maths — app in `app/`. Follow the repo's own CLAUDE.md for branch, tests and deploy.
- **Audited:** claude/magical-ptolemy-a97qe0 @ 5d1d28c.
- **Today:** average **3.74** across 152 elements; **27 of 97 key elements below 4**.
- **Verdict:** Bizzing Maths is the family's strongest learning product: 165 stops across 18 painted worlds and a 10-level journey, each teaching the trick, why it works and making the child type the working, all machine-checked. The FIX-MATHS rows mostly landed — demo mode, one-Continue Home, top-bar switcher, Hive feed, coins, medals, report card and polished Arcade — with zero console errors and no third-party requests. Weak spots are the economy (six frames, no rare avatars, no coin history), device-only narration after recorded clips were removed, emoji-as-icons, and a grown-ups report that overflows on phones. Commercial plumbing (pricing, entitlements, certificates, marketing) is absent by design.
- **Strengths to keep:** Best teaching in the family: story, stepwise trick, why-it-works, your-turn typing, exact-question feedback. · 18 worlds of consistent, distinct painted storybook art plus a 10-level journey road. · Massive machine-checked content: 165 stops, 57k trick questions, proven puzzles, honest Vedic sourcing. · Privacy, no streaks, no random rewards; zero console errors and zero third-party requests.

## How to work this brief

1. Do **§1 Fix first** in one commit, deploy and confirm it.
2. Do **§2 Harmonise**: every app is making these changes at the same time, so do them as written. Copy the shared files from the Bizzing_Schedule repo: `integration/bizzing-activity.js`, `bizzing-wallet.js`, `bizzing-avatars.js` and `bizzing-avatars.css`.
3. Work the **§3 key elements** table top to bottom, batching related rows into one commit each.
4. For every row, add the **Done when** check to the app's tests, and **prove it by breaking it once**.
5. Finish with **§6 Definition of done**, and report back the commit and the new scores.

## 1. Fix first (trust)

- **The grown-ups report overflows to 670 px on a 390 px phone.** Goal lines are clipped on the page parents judge the app by (P1, Q2).
- **Unknown hashes** (`#/nonsense`, `#/stop/bad`) show the welcome hero. They should land on Home.
- **Tester mode** leaves locks showing on the library stones and world pins. Locked journey stations render as blank white circles.
- **Keep the ⬡ Hive button in the top bar during runs.** Keep it hidden only inside a timed drill (§3).

## 2. Harmonise with the family (standard v2)

- **Mascot (§2):** the owner picks from Octo / Nova / Tally (concepts in `docs/family/mascots/`). Then generate the six poses and put the mascot on the icon, logo, home greeting, worlds, finish screens, and empty and error states. Aryabhata stays as the ceremony elder.
- **App icon:** the mascot on cobalt with the graph grid. Replace `icon.svg` and add the 192/512/maskable/apple-touch PNGs.
- **Avatars (§8):** 30 today, no tiers. Regroup the 30 into packs, add **Bee's Turbo pack** (Number Rush racers), and generate 58 more for 96. Pair two packs to each of the six worlds and give every Legendary a Maths milestone ("Finish the Deep Mine"). The six frames become Extras in the Shop.
- **Worlds (§7):** turn the six themes (Graph Paper, Chalkboard, Blueprint, Orbit, Rangoli, Arcade) into six painted, dynamic worlds with painted night variants. The bakery, observatory and mine plates are the art direction. Today the plates glare on navy.
- **Tabs:** Arcade becomes **Play**. Add ☰ (§3) and move Me, Shop, Medals, Settings and Grown-ups into it.
- **Icons (§9):** up to 45 emoji per screen today (Atlas 37, Grown-ups 45). Replace them all with the SVG set.
- **Type (§9):** 18 faces / 845 KB. Move the chrome to Hanken Grotesk, Fraunces and Sono, give each world one display face, and keep ≤ 250 KB before first paint.
- **Music (§11):** extend the synth game loop to a loop per world and for home, and add the volume slider. No narration: the owner removed it (08b39e0), and it stays removed.
- **Shop and wallet history:** the Shop gets Avatars · Worlds · Extras; the coin history is stored but never shown, so show it (§1.1).
- **Search** across stops, tricks and stories (C4).
- **Top bar and ☰ (§3):** `[⬡ Hive] [☰] [mascot + Bizzing …] … [search] [coin chip] [theme] [🔒] [avatar ▾]`, 56 px. The ☰ drawer lists My page · Shop · Collection · Medals · *(up to 4 app areas)* · Settings · Grown-ups 🔒 · Help · Privacy · Back to the Hive.
- **Settings (§5):** Bee's sheet, with the sections in this order: Me · Sound & music · Look · Comfort · Grown-ups 🔒.
- **Glossary (§21):** Bizzing coins · World · Stop · Continue · Collection · Shop · Medals · Grown-ups · Family plan.
- **Hive (§19):** activity and milestones written, coins through the wallet, avatars through the engine, `#/continue` and `?from=hive` accepted.

## 3. Key elements below 4

| Id | Element | Now | What the audit saw | Change | Done when | Effort |
|---|---|---|---|---|---|---|
| B1 | Home layout & hierarchy | **3** | Desktop Home (d-10) is still long: greeting, Continue, ring, Today's three, 4 tiles, then number of day, trick of day, 4 progress stat cards — ~12 cards. | Cut below-the-fold cards to one row; move number/trick of the day into the Library. | Home in Bee's template, cards in the §6 order; check asserts the order. | S |
| C4 | Search | **2** | Only the Maths Dictionary has search (249 words). No global search for stops/tricks/stories across 165 stops. | Add a search box on Atlas/Library over stops, dictionary, formulas, stories. | Search pill/icon finds any lesson, stop, story, word or place; check searches three known items. | M |
| D10 | World ambient life | **2** | Worlds are static paintings; background graph-paper motif animates; no ambient sound, no idle character motion on boards. | Add light ambient loops per world and idle animation on the child's avatar marker. | Three ambient layers per world, paused when hidden, frozen under reduced motion (check). | M |
| F3 | Mistake review | **3** | 'Worth another look' lists misses at end of a run; traps deck ('1 to fix' on Home); no persistent mistake notebook across sessions. | Add a Mistakes shelf collecting every missed item with its worked trick, re-drillable. | A mistakes deck that brings missed items back after a gap. | M |
| G6 | Game animation & juice | **3** | Pop particles, wobble on wrong, combo dots, confetti at 2 stars (rushJuice=5 for 5 answers). Fairly modest. | Add bubble burst animation, number fly-to-score and screen-edge glow on combos. | Motion on every answer; combo or progress feedback. | M |
| G7 | Game sound | **3** | WebAudio synthesized sfx (pop, combo step, fanfare) and a synthesised music loop per game; no recorded sound. | Commission a small recorded SFX pack and music stems. | Effects and a music loop in every game. | M |
| I4 | Mascot quality & presence across the app | **3** | Nova (koi) in onboarding, Aryabhata in ceremonies/trick of day, child's avatar on Home; no single mascot that reacts in lessons. | Pick one guide who appears in feedback and runs with small reactions. | One mascot (§2) on icon, logo, home, worlds, finishes, empty and error states — six poses. | M |
| J1 | Avatar count | **3** | 30 child-pickable avatars in 5 families (d-61); 45 files incl. rivals and Aryabhata. | Add earnable avatars beyond the 30. | 96 avatars in 12 packs of 8; `validate()` returns [] in the test suite. | M |
| J4 | Rare/collectible tiers present | **1** | No Common/Rare/Epic/Legendary tiers; all 30 avatars free (grep finds no rarity). | Tier avatars; make Rare/Epic/Legendary unlocked by medals or coins at fixed prices. | Common · Rare · Epic · Legendary on every card, via bizzing-avatars.js. | M |
| J5 | Unlock path stated on every avatar | **1** | Avatars show no unlock path — all are open; frames show prices only. | Label every avatar with its tier and how it is earned. | Every card states its path in plain words (`stateOf().say`). | S |
| J7 | Showcase / trading-card / profile page | **2** | Me page has face, medal shelf, shop, themes, rank ladder — a dashboard, not a showcase card. | Add a trading-card style profile with avatar, frame, rank and top medals. | Collection page: all 96 by pack, owned and locked, with paths; the night glow. | M |
| K3 | A shop exists | **3** | Shop card on Me page with 6 frames (d-60). | Give the shop its own screen reachable from the sheet. | A Shop from ☰ and the coin chip: Avatars · Worlds · Extras. | S |
| K4 | Shop variety | **2** | Frames only. No outfits, themes for sale, board skins or stickers. | Add board/marker skins, stickers and earnable avatars. | At least three kinds of thing to buy (avatars, worlds, one cosmetic line). | M |
| K5 | Rare avatars obtainable with coins and/or milestones | **1** | No rare avatars at all. | Make tiered avatars purchasable or milestone-earned. | Rare avatars by coins (and Legendaries by milestone + coins). | M |
| K9 | Wallet & coin history visible to the child | **2** | Balance shown on Me and sheet ('My page · 🪙 11'); ledger exists in storage but no history view. | Show a coin history list (earned for…, spent on…). | Coin chip opens the wallet history (§1.1). | S |
| K10 | Economy balance | **2** | ~20 coins per 20-fact session buys every frame within a few days; nothing worth saving for long term. | Add higher-value goals (legendary avatar 500) and coin flow to Finance. | A free child has something worth saving for in week 4 (Legendary, world 3). | M |
| M3 | Sound effects | **3** | Synthesised WebAudio sfx: good/bad, pop, combo, fanfare, coin, level. | Replace synthesised beeps with a designed sample pack. | Right · wrong · finish · medal · coin · unlock effects. | M |
| M4 | Music | **2** | Synth music loop only inside games; none elsewhere. | Add a gentle optional menu/world theme. | Music per world, home and games per §11, with CREDITS.md. | M |
| M5 | Mute/volume controls | **3** | Sound toggle in sheet, ♪ music toggle and M key in games; no volume slider. | Add separate volume for voice/sfx/music. | Effects, music and one volume slider in Settings §5; mute one tap from ☰. | S |
| N4 | Iconography system: SVG vs emoji vs raster | **2** | Per screen: 9 SVG (top bar/tabs only), emoji heavy as UI icons (Atlas 37, Grown-ups 45, Me 25, world 31), raster avatars/plates. | Replace emoji glyphs (worlds, strands, tabs, secrets) with an SVG icon set. | Zero emoji in controls (check counts); SVG family set everywhere. | M |
| N5 | Icon quality & legibility | **3** | Emoji legible but inconsistent across OS; SVG top-bar icons crisp. | Same as N4. | Icons legible at 24px in light and dark. | M |
| N12 | Visual bugs found | **2** | Grown-ups report overflows to 670px on phone (goal lines clipped, page scrolls sideways); tower floor pins overlap on phone; Hive ⬡ vanishes during runs; Learn heading… | Wrap .rg-* goal spans; space tower pins; keep top bar consistent. | No visual bug from this brief's list remains (each has a check). | S |
| P1 | Phone layout: no overflow at 390 px | **3** | All main screens scrollWidth 390 except Grown-ups = 670 at 390px (w7). | Fix report goal lines wrap; add grown-ups to the overflow test. | No overflow at 390 px measured against the device width, every route. | S |
| P3 | Touch target sizes | **3** | Many targets <44px: Home 12/27, Puzzles 41/47, Goals 40/45, Facts 161/168 on phone (grid cells, chips). | Enlarge chips and fact grid cells to 44px tap targets. | Every target ≥ 44 px (check samples). | S |
| Q4 | Controls | **3** | Age band, read aloud, tester mode per child; no time limits, no session length, no difficulty or content controls. | Add optional daily-time target and quiet hours. | Age band, daily targets, sound, read-aloud and world controls behind the PIN. | S |
| R2 | First-load weight | **3** | Phone first screen 1.41 MB raw (main JS 817 KB raw/282 KB gz, CSS 138 KB, w-library 193 KB). | Split chapters out of main chunk; lazy-load stories. | First screen ≤ 1.5 MB on a phone; initial JS ≤ 400 KB gzipped. | M |
| T9 | Shareability | **1** | No certificates or share cards. | Add level certificates and a share card for a contest win (no PII). | Certificates per §13, shared from the grown-ups area. | M |

Already at 4 or 5 (keep them there): A1 Landing/welcome clarity, A3 Time to first learning, A4 Profile setup minimal & fast, A5 Demo / try-before-signup, A8 First-session "aha", B2 Exactly one primary Continue, B3 Progress visible on home, B5 Mascot / greeting personality, B7 Phone home: Continue above the fold, B10 Returning-child state, C1 Tab model, C2 Back button & hash routing, C3 Sibling switching, C5 Dead ends & broken links found in the walkthrough, D1 Number of worlds/lands/levels, D3 World art quality, D4 World art consistency, D5 World variety, D8 World progression visible, E3 Teaching the why, E5 Answer feedback, E6 Hints & scaffolding, E9 Mastery from evidence, E10 Content accuracy & sourcing, E11 Question testing & answer-leak protection, F1 Short daily session, F4 Session end summary, G2 Average game quality, G4 Learning IS the mechanic, G5 Game art, G10 Keyboard AND touch in every game, G11 Filler/useless games, J2 Avatar art quality, J6 Avatar shown across the app, K1 Currency present, K2 Earned only for learning, K7 Prices visible and fixed, K8 No random rewards / gacha / pay-to-win, L1 Medals/badges from evidence, L3 Celebration moments, L5 No streak pressure, L6 Positive tone on mistakes, N1 Overall visual polish, N2 Art-direction consistency across all screens, N6 Font quality: faces used, self-hosted, display/body pairing, weights loaded, O3 Night/dark mode present, O4 Night mode quality, P2 Thumb reach & bottom tab bar, P4 Contrast in light and dark, P5 Keyboard navigation & visible focus, P6 Screen-reader labels & reduced motion, Q1 Grown-ups area behind a PIN, Q2 Report card quality, Q3 Reports learning, not just usage, Q5 Data export / erase, Q6 Multiple children managed, Q7 Tester/dev controls hidden from the child, R1 Offline / PWA installable, R4 Console errors during the walkthrough, R5 Automated tests & browser checks, R6 Storage seam & versioned migrations, R7 Security, S1 Child data minimal, S2 No third-party requests, S3 Privacy page accurate, S4 Sensitive content handled, T3 Paywall never on the child's screen, T5 Bizzing Hive feed written, T6 Deep links accepted, T7 Family top bar / brand layer.

### 3a. Draw inspiration from

For each row above, copy the in-family model first, then the outside benchmark (standard §23).

| Id | Copy from (Bizzing) | What exactly | Outside benchmark | Don't borrow |
|---|---|---|---|---|
| B1 | **Bizzing Bee** (4) | Home (10-home-desk-light): greeting+avatar, daily goal rings, level, word of the hour, Continue card with painted plate, journey card, bee… | Duolingo (the path) · Bizzing Bee's own home (owner's template): One obvious next step everything else supports; a home that picks up exactly where the child left off | Hearts, gems, leagues and the streak flame on home |
| C4 | **Bizzing Bee** (4) | Header 'Search any word…' gives live dictionary matches (rhythm, latin) and 'See all matches'; Word Finder searches 40k/128k. Search does… | Apple HIG tab bars · Khan Academy Kids profiles: ≤ 5 tabs, back always stays inside the app, one-tap child profiles, a search that finds any lesson | Hamburger menus hiding main areas |
| D10 | — (no app at 4 yet) | — | Prodigy (world map) · Toca Boca (world feel) · Monument Valley (art direction): Each world a distinct, alive place with its own palette and sound; the map shows where you are and what is next | Worlds that are only a background behind the same quiz |
| F3 | **Bizzing Bee** (4) | Misses 'Saved for revision', Revision pile, My traps radar, 'My missed words' list, Tricky review. | Duolingo lessons · Anki: 3–5 minute sessions with a clean finish screen; a mistakes deck that comes back later | Daily-goal pressure and streak reminders |
| G6 | **Bizzing Bee** (4) | Combos (5x), stars, confetti, speed bonus, hearts, glitch effects. Quiz screens static. | DragonBox · Prodigy (polish) · Toca Boca (feel): The learning is the mechanic; every action has motion and sound; levels and personal bests | Battles where learning is a toll gate; luck-based scoring |
| G7 | — (no app at 4 yet) | — | DragonBox · Prodigy (polish) · Toca Boca (feel): The learning is the mechanic; every action has motion and sound; levels and personal bests | Battles where learning is a toll gate; luck-based scoring |
| I4 | **Bizzing Bee** (4) | Bizzy appears in logo, lessons, arcade, Bizzillionaire lifeline, home tip. Speaking only in explainers. | Epic · Khan Academy Kids characters: Illustrated, read-aloud stories; a cast that appears everywhere | Stories as walls of text |
| J1 | **Bizzing Bee** (4) | 142 in the Hive collection (18 packs ×8 plus champions), 20 starters; 150 defined in avatars.js. | Pokémon-style collections done ethically · Apple Memoji (customisation): Rare tiers with the unlock printed on the card; outfits and frames; a showcase page | Gacha, packs, random drops, pay-for-a-chance |
| J4 | **Bizzing India** (4) | IND_RARITY: Starter/Rare/Epic/Legendary (10/18/26/24); sacred figures flat, real people 40 coins. | Pokémon-style collections done ethically · Apple Memoji (customisation): Rare tiers with the unlock printed on the card; outfits and frames; a showcase page | Gacha, packs, random drops, pay-for-a-chance |
| J5 | **Bizzing India** (4) | Card prices (🪙40) shown; gods free; "How meeting someone works" explains price and that rare cards name the learning. | Pokémon-style collections done ethically · Apple Memoji (customisation): Rare tiers with the unlock printed on the card; outfits and frames; a showcase page | Gacha, packs, random drops, pay-for-a-chance |
| J7 | **Bizzing India** (4) | avcard pages: lore, ITIHAAS evidence, quote with source (w-avcard-gandhi); Me page shelf. | Pokémon-style collections done ethically · Apple Memoji (customisation): Rare tiers with the unlock printed on the card; outfits and frames; a showcase page | Gacha, packs, random drops, pay-for-a-chance |
| K3 | **Bizzing Geography** (4) | Map shop on Me page (crop-shop) with printed prices. | Khan Academy energy points · Club Penguin-style fixed-price shops: Coins earned only by learning, spent on fixed-price cosmetics, rare avatars, game skins and unlocks worth saving for | Coins sold for real money; loot boxes; content locked behind coins |
| K4 | — (no app at 4 yet) | — | Khan Academy energy points · Club Penguin-style fixed-price shops: Coins earned only by learning, spent on fixed-price cosmetics, rare avatars, game skins and unlocks worth saving for | Coins sold for real money; loot boxes; content locked behind coins |
| K5 | **Bizzing India** (4) | Real-people cards bought with coins; rarity prices 120/250/500; mastery chips "MASTERED" on Akbar's Darbar. | Khan Academy energy points · Club Penguin-style fixed-price shops: Coins earned only by learning, spent on fixed-price cosmetics, rare avatars, game skins and unlocks worth saving for | Coins sold for real money; loot boxes; content locked behind coins |
| K9 | **Bizzing Finance** (4) | Wallet: every movement dated, printable statement; jars, bank vault, net worth on Progress. | Khan Academy energy points · Club Penguin-style fixed-price shops: Coins earned only by learning, spent on fixed-price cosmetics, rare avatars, game skins and unlocks worth saving for | Coins sold for real money; loot boxes; content locked behind coins |
| K10 | — (no app at 4 yet) | — | Khan Academy energy points · Club Penguin-style fixed-price shops: Coins earned only by learning, spent on fixed-price cosmetics, rare avatars, game skins and unlocks worth saving for | Coins sold for real money; loot boxes; content locked behind coins |
| M3 | — (no app at 4 yet) | — | Khan Academy Kids · Epic Read-to-me: Every instruction read aloud for pre-readers in a warm recorded voice; soft sounds and a mute | Robotic device speech; loud reward jingles |
| M4 | — (no app at 4 yet) | — | Khan Academy Kids · Epic Read-to-me: Every instruction read aloud for pre-readers in a warm recorded voice; soft sounds and a mute | Robotic device speech; loud reward jingles |
| M5 | — (no app at 4 yet) | — | Khan Academy Kids · Epic Read-to-me: Every instruction read aloud for pre-readers in a warm recorded voice; soft sounds and a mute | Robotic device speech; loud reward jingles |
| N4 | **Bizzing India** (4) | Nav/UI icons inline SVG (12-24 per screen); emoji mainly as content (🪙, 🙏 Greetings, 🗺⛰ map toggle, 🪔 badges). Raster only for art. | Toca Boca · Khan Academy Kids · Duolingo (illustration system): One art direction everywhere; a real SVG icon set (not emoji); self-hosted display + body fonts; meaningful motion | Emoji as UI icons; mixed icon styles; system fonts |
| N5 | **Bizzing Bee** (4) | SVG icon set consistent stroke weight (nav, top bar); iconSVG grid-fallback trap documented; emoji vary by platform. | Toca Boca · Khan Academy Kids · Duolingo (illustration system): One art direction everywhere; a real SVG icon set (not emoji); self-hosted display + body fonts; meaningful motion | Emoji as UI icons; mixed icon styles; system fonts |
| N12 | — (no app at 4 yet) | — | Toca Boca · Khan Academy Kids · Duolingo (illustration system): One art direction everywhere; a real SVG icon set (not emoji); self-hosted display + body fonts; meaningful motion | Emoji as UI icons; mixed icon styles; system fonts |
| P1 | **Bizzing Bee** (5) | scrollWidth = 390 on every phone screen swept (11 screens). | Apple HIG · WCAG 2.2 AA: 44 pt targets, bottom tabs, contrast and focus as tested rules | Fixed desktop layouts squeezed onto phones |
| P3 | — (no app at 4 yet) | — | Apple HIG · WCAG 2.2 AA: 44 pt targets, bottom tabs, contrast and focus as tested rules | Fixed desktop layouts squeezed onto phones |
| Q4 | **Bizzing Bee** (4) | Age band, three daily targets, bee-day milestone date, text size, contrast, reduce motion, sound, voice speed, read-aloud. | IXL Analytics · Apple Screen Time weekly report: Skill-level diagnosis and a short weekly digest behind a PIN | Minutes shown as achievement; dev buttons a child can reach |
| R2 | **Bizzing Finance** (4) | First load ~760KB raw: index.js 597KB (199KB gz), CSS 61KB, 2 fonts; lessons lazy chunks. | web.dev performance budgets · Google PWA checklist: A written budget enforced in the build; offline after first visit | Shipping every data file at boot |
| T9 | — (no app at 4 yet) | — | Apple Family Sharing · Google Workspace app switcher: One family account every app recognises; the same top bar in every app; share cards for milestones | Paywalls on the child's screen |

## 4. Games, worlds and features (from the walkthrough)

**Games to improve or cut** (each must meet standard §14):

| Game | Score | Verdict | Note |
|---|---|---|---|
| Number Rush | 4 | improve | Child's own facts fall as bubbles; painted meadow, combo, finish lists facts. Painted backdrop bubbles compete with play bubbles. |
| Number Line | 4 | improve | Estimation 0–20/100/1000 by band, 8 rounds; needs decimals/fractions levels. |
| Sudoku | 3 | improve | Unique-solution 4×4–9×9 with hints; plain white overlay, no art. |

**Absent, weak or useless features:**

- **Rare avatar tiers** (absent): All 30 avatars free; no Common/Rare/Epic/Legendary the owner wants.
- **Shop variety** (weak): Only six avatar frames; nothing else to buy, so coins lose meaning within days.
- **Coin history** (absent): Ledger stored but never shown to the child.
- **Recorded narration** (weak): Device TTS only; recorded clips were built then removed.
- **Global search** (absent): Only the Dictionary searches; 165 stops, stories, formulas unsearchable.
- **Mistakes notebook** (weak): Misses shown at run end only; no persistent deck across sessions.
- **Certificates / sharing** (absent): No printable level certificate or share card.
- **Pricing & entitlements** (absent): Everything free, no plans or server.
- **Grown-ups phone layout** (weak): Report card overflows to 670px on a 390px phone.
- **Number/Trick of the day** (weak): Random daily cards below the fold; not tied to the child's road.
- **Ambient world life** (absent): Worlds are static plates; no ambient sound or idle animation.
- **Authored contest problems** (absent): Contest uses generated arithmetic only; no Kangaroo-style reasoning bank.

**Visual bugs and dead ends seen** (each gets a check):

- Grown-ups report overflows to 670px at 390px phone width; goal lines clipped
- Puzzle Tower floor pins overlap in a stack on phone
- Hive ⬡ disappears from the top bar during runs/drills
- Library shelf cards keep decorative yellow '+' badges that look tappable
- Journey level board stations render as blank white circles on locked levels; progress bars appear white/empty
- Number Rush painted backdrop bubbles visually compete with the playable bubbles
- Ceremony copy reads 'Pass your first stop — you did that.'
- Story nav shows a stray empty kbd box beside the back arrow
- Tester mode leaves Vedic/Chinese/Times-table library stones and world-board pins showing locks
- Unknown hash (#/nonsense, #/stop/bad) shows the welcome hero rather than Home
- A game overlay (sudoku) covers the app nav; leaving needs ✕/Escape

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
