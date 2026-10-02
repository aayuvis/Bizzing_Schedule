# Bizzing Bee — fix brief v2 (family audit, 2 Oct 2026)

Paste this into the Bizzing Bee chat, or point that chat at this file. It replaces the v1 brief. It is the work to bring Bizzing Bee to **at least 4 on every key element** and in line with the **[Bizzing family standard v2](https://github.com/aayuvis/Bizzing_Schedule/blob/claude/amazing-knuth-4aemgz/docs/family/FAMILY-STANDARD.md)**. Read the standard first.

- **Repo:** aayuvis/Bizzing-Bee — app in `spellbound-app/`. Follow the repo's own CLAUDE.md for branch, tests and deploy.
- **Audited:** claude/bizzing-bee-publication-ncxwdf @ 145bedd0e.
- **Today:** average **3.52** across 152 elements; **35 of 97 key elements below 4**.
- **Verdict:** Bizzing Bee is the family's richest app: a beautifully painted Word Atlas, real recorded audio for 130k words, a genuine Scripps-style mock bee and polished arcade engines, now wrapped in the family shell (one Continue, PIN, hash routes, Hive feed, tests). The FIX-BEE work landed and its guards pass. Its weak spots are trust and economy: Hindu and European deities are ranked Legendary collectibles, raw WordNet definitions and proper nouns reach children, and a free child earns coins with nothing to buy while 122 avatars say 'ask a grown-up'. Fix those and the scattered small bugs and it is close to best-in-class.
- **Strengths to keep:** Painted Atlas of 9 regions and 102 stops, each region teaching one word family. · Mock Spelling Bee in true Scripps format with ten characterful rivals. · Every word has a recorded voice; misses hold with letter diff and memory hook. · Family plumbing done: one Continue, hash routes, PIN, backup/erase, Hive feed, 74 tests.

## How to work this brief

1. Do **§1 Fix first** in one commit, deploy and confirm it.
2. Do **§2 Harmonise**: every app is making these changes at the same time, so do them as written. Copy the shared files from the Bizzing_Schedule repo: `integration/bizzing-activity.js`, `bizzing-wallet.js`, `bizzing-avatars.js` and `bizzing-avatars.css`.
3. Work the **§3 key elements** table top to bottom, batching related rows into one commit each.
4. For every row, add the **Done when** check to the app's tests, and **prove it by breaking it once**.
5. Finish with **§6 Definition of done**, and report back the commit and the new scores.

## 1. Fix first (trust)

- **Withdraw the sacred and the real from the collection.** Remove the Indian Gods and European Gods packs, World Changers (Newton, Gandhi, Buddha…) and Spelling Champions from the store, the packs and the drops. Retire the **God's Abode** world. Refund every coin paid for them with `refund()`. Replace Naga (Reptilian) and Vasuki (Big Beasts) with non-sacred creatures.
- **Settings must ask for the PIN.** Today it opens without one, though its own copy says it asks. "Manage plan" and the Advanced Pack sales page must never appear on a child's screen (T3).
- **Remove the developer "BUG?" side tab and the beta banner** from the child's screens (Q7).
- **Stop promising unpaid coins.** Magic Squares advertises line bonuses it never pays. Either pay them through `earn()` at a standard event, or delete the copy.
- **Mastery coins fire on XP level-up.** Move them to real mastery evidence (a list mastered after a gap).
- **Fix the Islamism definition, and remove proper nouns from the spelling lists.** Have the definitions read by a second person.
- **Free children can buy nothing.** Every rare says "Comes with the plan". The v2 engine (§8) fixes this: Commons are free, and worlds 1–2 can be bought into with coins.
- **Escape must close the drawer and the Settings sheet.** Spell Scene's "Back to map" goes nowhere, and its "4 OF 4 SPELLED" shows 0 stars.

## 2. Harmonise with the family (standard v2)

- **Avatars (§8):** keep 12 packs (Hive, Critter, Cosmos, Vibe, Dojo, Origami, Lab, Elements, Reptilian, Enchanted, Legends, Villains). Re-tier each to 2 Common · 3 Rare · 2 Epic · 1 Legendary, and give every Legendary a named milestone. Rename "Starter" to "Common". **Send the Turbo pack to Maths and the Big Beasts pack to Geography** (art and names; remove them from Bee once they ship there). Adopt `bizzing-avatars.js` and `.css`; `validate()` goes in the tests.
- **Worlds (§7):** unchanged, as the model, except that God's Abode is withdrawn. Pair the 12 packs to the 7 remaining worlds with the `world` field. Worlds 1–2 are free; worlds 3+ open with the plan or for 240 coins.
- **Shop:** a real Shop screen (Avatars · Worlds · Extras) from ☰ and the coin chip. Outfits and frames are the first extras.
- **Wallet history** behind the coin chip (§1.1).
- **Music (§11):** extend the Atlas loop to Home, every world and the games, with one volume slider in Settings. No new narration is needed; keep the clips.
- **Icons (§9):** replace the ~100 emoji in Trivia, Quotes, the coins and section labels with the SVG set.
- **Settings (§5):** reorder into the five family sections. Plan and subscription go behind the PIN.
- **Tabs and ☰:** Bee is the template; keep them. Move secondary areas (Quotes, Concepts, Evolution…) into ☰ per §3.
- **First load:** 1,730 KB, to ≤ 1.5 MB (§18).
- **Top bar and ☰ (§3):** `[⬡ Hive] [☰] [mascot + Bizzing …] … [search] [coin chip] [theme] [🔒] [avatar ▾]`, 56 px. The ☰ drawer lists My page · Shop · Collection · Medals · *(up to 4 app areas)* · Settings · Grown-ups 🔒 · Help · Privacy · Back to the Hive.
- **Settings (§5):** Bee's sheet, with the sections in this order: Me · Sound & music · Look · Comfort · Grown-ups 🔒.
- **Glossary (§21):** Bizzing coins · World · Stop · Continue · Collection · Shop · Medals · Grown-ups · Family plan.
- **Hive (§19):** activity and milestones written, coins through the wallet, avatars through the engine, `#/continue` and `?from=hive` accepted.

## 3. Key elements below 4

| Id | Element | Now | What the audit saw | Change | Done when | Effort |
|---|---|---|---|---|---|---|
| A8 | First-session "aha" | **3** | First thing is a 7-card lesson 'The Champion's Routine' with a play button — reading, not spelling. First spelled word comes several taps later. | Open on one spoken word the child spells right in the first 30 seconds, then the lesson. | A new child gets a right answer and a celebration inside two minutes (scripted in the check). | M |
| B3 | Progress visible on home | **3** | Strip beside Continue: 'Act I · The Meadow' bar + 'Level 2 · Egg'; goal rings; Stage 1 of 20. Bars are thin and unlabelled. | Show stops cleared this week and words mastered next to the bar. | Progress bar and position ("stop 3 of 12") on the Continue card. | S |
| B5 | Mascot / greeting personality | **3** | Avatar with a speech bubble 'Breathe, Ahana. Still mind…' plus time-of-day greeting. Static, same line across visits, no voice. | Rotate greetings by progress ('2 words due today'); let the bee speak it once. | Mascot greeting with a line built from the last session, never the same line twice in a row. | S |
| C5 | Dead ends & broken links found in the walkthrough | **3** | Found: locked-book PIN modal persisted across Themes/Concepts/IPA screens; IPA page prints stray '→ x/button>'; Magic Squares promises unpaid coins; Spell Scene 'Back to… | Fix the four dead ends listed; add a route-change overlay reset. | Walkthrough finds no dead end; check visits every route and asserts a heading and a way back. | S |
| D10 | World ambient life | **3** | Region plates carry floating butterflies/bees, guides (Barnaby, Sage), random 'moth of the Unspelling' ambush (22% Math.random) that interrupts entry. | Make the ambush deterministic or opt-in; add ambient sound per region. | Three ambient layers per world, paused when hidden, frozen under reduced motion (check). | S |
| E5 | Answer feedback | **3** | Miss holds with letter diff + concept + hook (33-stop-quiz-miss). But 'giant' miss was explained as 'Suffix endings — -able/-ible': wrong concept family. | Validate the concept tag per word; fall back to the hook when no family matches. | Right advances; wrong holds, explains on the exact item, waits for a tap (check). | M |
| E6 | Hints & scaffolding | **3** | Hint chip, Slow audio, Hear again, definition shown, Zib's hint in Unscramble, 50:50/Ask Bizzy lifelines. | Graduated hints (first letter, syllables) in spell items. | A hint on the exact wrong item, never revealing the answer. | M |
| E10 | Content accuracy & sourcing | **2** | Raw WordNet definitions: 'Islamic: supporting Islamism', 'philip: husband of Elizabeth II', 'latinos: a native of Latin America'; ~5,000 quotes unsourced (ratchet). | Curate definitions for the 40k core; review religion/nationality words; source or cut quotes. | Every fact has sources[] or is derived from data. | L |
| F1 | Short daily session | **3** | 10-Word Warm-Up untimed, ends with summary; daily goal rings 5/10/15 words. Not one fixed 'today's 7 minutes' session. | One Home 'Today's session' mixing due reviews + next stop. | A 5–10 minute session that ends on a finish screen. | M |
| G2 | Average game quality | **3** | Played all arcade engines: polished menus, painted fields, result cards with word chips. Quiz games plain. | Raise the five quiz-style games to arcade polish. | Every game meets §14; average game score ≥ 4 on the next audit. | M |
| G4 | Learning IS the mechanic | **3** | Type Blaster, Spell Scene, Beat, Mock Bee: spelling is the action. Keep Flying, Honeycomb Run, Grand Prix: dexterity game with spelling gates. | Make each gate spelling decide the race more than steering. | The learning is the mechanic in every game; a toll-gate game is cut. | M |
| G7 | Game sound | **3** | sfx() and per-world stings exist (10 mp3s), word clips per word; mock bee announcer clips 404 (draw-0, roundIn-1, callBot-0/1). Not audible in headless run. | Record the missing announcer clips; add music beds. | Effects and a music loop in every game. | M |
| G11 | Filler/useless games | **3** | Bizzillionaire asks general trivia ('What number comes right after 9?') in a spelling app; Daily Buzz is a Wordle clone; Keep Flying is Flappy with gates. | Re-theme Bizzillionaire to word questions; fold Keep Flying into Grand Prix. | No filler game left; the cut list in this brief is done. | M |
| J4 | Rare/collectible tiers present | **3** | Starter/Rare/Epic/Legendary tiers with colour badges and OVR numbers. Deities ranked by OVR (Krishna 95, Shiva 94) — rarity applied to sacred figures. | Keep tiers; take sacred figures and real people out of rarity ladders. | Common · Rare · Epic · Legendary on every card, via bizzing-avatars.js. | S |
| J5 | Unlock path stated on every avatar | **2** | Every one of 122 non-starters reads 'Comes with the plan — ask a grown-up' for a free child; the header promises milestones and coin prices that never appear. | Give free children at least one earnable pack with milestone labels. | Every card states its path in plain words (`stateOf().say`). | M |
| J7 | Showcase / trading-card / profile page | **3** | Trading card with OVR, Stamina/Wisdom/Speed/Coolness bars, 'Inspired by' fact, Print my cards (41-avatar-card). Stats are meaningless; locked card hides the art. | Replace stats with the child's own evidence for that avatar. | Collection page: all 96 by pack, owned and locked, with paths; the night glow. | M |
| K3 | A shop exists | **2** | No shop screen: openShop → My Hive. Buying is a button on an avatar card, only for Rares in plan-unlocked packs. | Give coins a visible place to spend for every plan. | A Shop from ☰ and the coin chip: Avatars · Worlds · Extras. | M |
| K4 | Shop variety | **1** | Only Rare avatars are buyable; worlds open at a Level, content never sold; no outfits, stickers or board skins. | Add cosmetic sinks: frames, Atlas trail skins, sticker sheets. | At least three kinds of thing to buy (avatars, worlds, one cosmetic line). | M |
| K5 | Rare avatars obtainable with coins and/or milestones | **2** | avRule: rares are milestone/120 coins only when the pack is open; free plan avatarPacks:0, so a free child can obtain no rare at all. | Open one or two packs to the free plan by milestone. | Rare avatars by coins (and Legendaries by milestone + coins). | S |
| K7 | Prices visible and fixed | **2** | 'No price is ever shown to a child' — prices hidden behind PIN; landing says 'buy a Rare at its printed price'. | Show the fixed coin price on rare cards for the child. | Every price printed and fixed (family table). | S |
| K9 | Wallet & coin history visible to the child | **2** | Balance pill only; the wallet keeps a ledger but no screen shows it. | Add a 'Where my coins came from' list in My Hive. | Coin chip opens the wallet history (§1.1). | S |
| K10 | Economy balance | **1** | A free child earns ~1/word (+20 level-ups) with nothing to spend on; Magic Squares advertises line bonuses that pay 0. | Give coins a sink or stop showing them; fix the Magic Squares copy. | A free child has something worth saving for in week 4 (Legendary, world 3). | M |
| M3 | Sound effects | **3** | sfx() for right/level/win/lose, 10 world stings (blade-shing, dino-roar). Not audible headless; judged from code. | — | Right · wrong · finish · medal · coin · unlock effects. | S |
| M4 | Music | **2** | Atlas music toggle (🎵) per region; no music in Home, games or menus seen. | Add a light music bed with its own toggle. | Music per world, home and games per §11, with CREDITS.md. | M |
| M5 | Mute/volume controls | **3** | Settings: Sound effects On/Off, Voice speed, Read cards aloud, Calm mode. No volume slider, no music volume. | Separate music/SFX/voice volumes. | Effects, music and one volume slider in Settings §5; mute one tap from ☰. | S |
| N4 | Iconography system: SVG vs emoji vs raster | **3** | 14 main screens: ~504 small SVG icons, ~100 emoji, ~90 raster. Nav/top bar are SVG; Trivia themes (48 emoji), Quotes (35), coins 🪙 and many section labels are emoji. | Replace emoji UI icons in Trivia, Quotes, Typing and labels with the SVG set. | Zero emoji in controls (check counts); SVG family set everywhere. | M |
| N12 | Visual bugs found | **2** | Phone Atlas labels overlap ('Subject Sprints' over 'V 0/18', avatar pin over Roman Forum); avatar 'Comes with the plan…' crushed into 6-line circles; IPA '→ x/button>'… | Fix the four; add an overlap check to the phone test. | No visual bug from this brief's list remains (each has a check). | S |
| P3 | Touch target sizes | **3** | ~73 of 372 visible controls under 44×44 across 14 screens (pills, chips, Hint, '→' arrows). | Raise chips and small arrows to 44px hit areas. | Every target ≥ 44 px (check samples). | S |
| P5 | Keyboard navigation & visible focus | **3** | Visible 2.75px purple focus ring on buttons; games keyboard-playable; Escape does not close drawer/Settings. | Escape closes overlays; focus trap in modals. | Every control reachable by keyboard with a visible focus ring; Esc closes sheets and ☰. | S |
| P6 | Screen-reader labels & reduced motion | **3** | aria-labels on top bar (e.g. 'Ahana — switch child'), role=progressbar, Reduce motion toggle; canvas games largely unlabelled. | Label game regions and announce results via aria-live. | aria-labels on icon buttons; reduced motion respected. | M |
| R2 | First-load weight | **2** | Repo first-load test: 1,730 KB first screen, 1,238 KB gzipped JS vs family budget 1,536 KB / 400 KB. Raw source tree: 5.97 MB, 4.95 MB JS. | Split app3.js (1.3 MB source) and shrink the boot word shard. | First screen ≤ 1.5 MB on a phone; initial JS ≤ 400 KB gzipped. | L |
| S3 | Privacy page accurate | **3** | privacy.html accurate about optional backup; Parent zone says 'no accounts… Nothing is sent anywhere'; landing FAQ says progress is 'backed up to your account'. | Make the three statements say the same thing. | Privacy page true, updated first when anything changes. | S |
| S4 | Sensitive content handled | **1** | Indian Gods pack (Shiva, Krishna, Ganesha, Durga, Saraswati…) as Epic/Legendary collectibles with OVR scores; 'God's Abode' world; 'Islamic: supporting Islamism' as word… | Remove deity avatars and the gods world; review religion/nationality definitions with a named reviewer. | No sacred figure or real person as a collectible; sensitive content reviewed. | M |
| T3 | Paywall never on the child's screen | **2** | Child screens carry 'Comes with the plan — ask a grown-up' on 122 avatars, plan-locked book shelf and a full Advanced Mode sales page reachable from the Atlas. | Show locked plan items as quiet silhouettes with no 'ask a grown-up' nudge. | No price, plan button or sales page on any child screen (check). | M |
| T9 | Shareability | **2** | Daily Buzz share grid (navigator.share/clipboard), Print my cards, printable weekly report. No certificate or share card. | Printable stage/region certificates. | Certificates per §13, shared from the grown-ups area. | M |

Already at 4 or 5 (keep them there): A1 Landing/welcome clarity, A3 Time to first learning, A4 Profile setup minimal & fast, A5 Demo / try-before-signup, B1 Home layout & hierarchy, B2 Exactly one primary Continue, B7 Phone home: Continue above the fold, B10 Returning-child state, C1 Tab model, C2 Back button & hash routing, C3 Sibling switching, C4 Search, D1 Number of worlds/lands/levels, D3 World art quality, D4 World art consistency, D5 World variety, D8 World progression visible, E3 Teaching the why, E9 Mastery from evidence, E11 Question testing & answer-leak protection, F3 Mistake review, F4 Session end summary, G5 Game art, G6 Game animation & juice, G10 Keyboard AND touch in every game, I4 Mascot quality & presence across the app, J1 Avatar count, J2 Avatar art quality, J6 Avatar shown across the app, K1 Currency present, K2 Earned only for learning, K8 No random rewards / gacha / pay-to-win, L1 Medals/badges from evidence, L3 Celebration moments, L5 No streak pressure, L6 Positive tone on mistakes, N1 Overall visual polish, N2 Art-direction consistency across all screens, N5 Icon quality & legibility, N6 Font quality: faces used, self-hosted, display/body pairing, weights loaded, O3 Night/dark mode present, O4 Night mode quality, P1 Phone layout: no overflow at 390 px, P2 Thumb reach & bottom tab bar, P4 Contrast in light and dark, Q1 Grown-ups area behind a PIN, Q2 Report card quality, Q3 Reports learning, not just usage, Q4 Controls, Q5 Data export / erase, Q6 Multiple children managed, Q7 Tester/dev controls hidden from the child, R1 Offline / PWA installable, R4 Console errors during the walkthrough, R5 Automated tests & browser checks, R6 Storage seam & versioned migrations, R7 Security, S1 Child data minimal, S2 No third-party requests, T5 Bizzing Hive feed written, T6 Deep links accepted, T7 Family top bar / brand layer.

### 3a. Draw inspiration from

For each row above, copy the in-family model first, then the outside benchmark (standard §23).

| Id | Copy from (Bizzing) | What exactly | Outside benchmark | Don't borrow |
|---|---|---|---|---|
| A8 | **Bizzing Maths** (4) | First stop: story beats, worked steps, 'Your turn' typed steps, 10-q drill; first pass triggers 'First star' medal ceremony with confetti… | Duolingo · Khan Academy Kids: A first lesson before sign-up; placement that starts as questions; one friendly character and one big button | Long sign-up forms; asking for a child's email or birthday |
| B3 | **Bizzing Maths** (4) | Today's ring (right answers 20/20, stops 1/1, puzzle 0/1), 'Station 2 of 16', progress tiles (goals, Atlas stars, tower). | Duolingo (the path) · Bizzing Bee's own home (owner's template): One obvious next step everything else supports; a home that picks up exactly where the child left off | Hearts, gems, leagues and the streak flame on home |
| B5 | **Bizzing Maths** (4) | Child's own avatar greets with a contextual line ('Last time: twenty facts, 19 of 20 right'), Nova on onboarding, Aryabhata in ceremonies. | Duolingo (the path) · Bizzing Bee's own home (owner's template): One obvious next step everything else supports; a home that picks up exactly where the child left off | Hearts, gems, leagues and the streak flame on home |
| C5 | **Bizzing Maths** (4) | No dead ends in walkthrough; quibbles: Library/Vedic stones and Times-table stops stay locked in tester mode; overlays (sudoku) hide nav. | Apple HIG tab bars · Khan Academy Kids profiles: ≤ 5 tabs, back always stays inside the app, one-tap child profiles, a search that finds any lesson | Hamburger menus hiding main areas |
| D10 | — (no app at 4 yet) | — | Prodigy (world map) · Toca Boca (world feel) · Monument Valley (art direction): Each world a distinct, alive place with its own palette and sound; the map shows where you are and what is next | Worlds that are only a background behind the same quiz |
| E5 | **Bizzing Maths** (5) | Right auto-advances on the keystroke; wrong holds with 'Not this time. It is 20' + reason chip or the trick worked on that exact question… | Brilliant · DragonBox · Khan Academy: Interactive why before practice; varied item types; hints on the exact wrong item; mastery that is re-checked | Multiple-choice only; self-marked 'complete' |
| E6 | **Bizzing Maths** (4) | Guided 'Your turn' shows a step after two misses; 'Show me' in Make the Target; sudoku hints; tip to do Your turn first. | Brilliant · DragonBox · Khan Academy: Interactive why before practice; varied item types; hints on the exact wrong item; mastery that is re-checked | Multiple-choice only; self-marked 'complete' |
| E10 | **Bizzing Maths** (5) | Observatory intro cites Bharati Krishna Tirtha 1965 and Dani; journeys carry sources + needsReview; story notepad sums machine-checked. | Brilliant · DragonBox · Khan Academy: Interactive why before practice; varied item types; hints on the exact wrong item; mastery that is re-checked | Multiple-choice only; self-marked 'complete' |
| F1 | **Bizzing Maths** (4) | Twenty facts '5 minutes' session ends with summary and 'Twenty more'; a stop drill is 10 questions. | Duolingo lessons · Anki: 3–5 minute sessions with a clean finish screen; a mistakes deck that comes back later | Daily-goal pressure and streak reminders |
| G2 | **Bizzing Maths** (4) | Each game has title card + how-to, painted plate, pop/wobble, combo meter, music loop, finish screen naming facts practised (d-31..41). | DragonBox · Prodigy (polish) · Toca Boca (feel): The learning is the mechanic; every action has motion and sound; levels and personal bests | Battles where learning is a toll gate; luck-based scoring |
| G4 | **Bizzing Maths** (5) | Rush feeds the child's own facts and records them; Line is estimation; Target is arithmetic reasoning; Contest is fact/trick ladder. | DragonBox · Prodigy (polish) · Toca Boca (feel): The learning is the mechanic; every action has motion and sound; levels and personal bests | Battles where learning is a toll gate; luck-based scoring |
| G7 | — (no app at 4 yet) | — | DragonBox · Prodigy (polish) · Toca Boca (feel): The learning is the mechanic; every action has motion and sound; levels and personal bests | Battles where learning is a toll gate; luck-based scoring |
| G11 | **Bizzing Maths** (5) | No filler: every game practises a named skill and records evidence. | DragonBox · Prodigy (polish) · Toca Boca (feel): The learning is the mechanic; every action has motion and sound; levels and personal bests | Battles where learning is a toll gate; luck-based scoring |
| J4 | **Bizzing India** (4) | IND_RARITY: Starter/Rare/Epic/Legendary (10/18/26/24); sacred figures flat, real people 40 coins. | Pokémon-style collections done ethically · Apple Memoji (customisation): Rare tiers with the unlock printed on the card; outfits and frames; a showcase page | Gacha, packs, random drops, pay-for-a-chance |
| J5 | **Bizzing India** (4) | Card prices (🪙40) shown; gods free; "How meeting someone works" explains price and that rare cards name the learning. | Pokémon-style collections done ethically · Apple Memoji (customisation): Rare tiers with the unlock printed on the card; outfits and frames; a showcase page | Gacha, packs, random drops, pay-for-a-chance |
| J7 | **Bizzing India** (4) | avcard pages: lore, ITIHAAS evidence, quote with source (w-avcard-gandhi); Me page shelf. | Pokémon-style collections done ethically · Apple Memoji (customisation): Rare tiers with the unlock printed on the card; outfits and frames; a showcase page | Gacha, packs, random drops, pay-for-a-chance |
| K3 | **Bizzing Geography** (4) | Map shop on Me page (crop-shop) with printed prices. | Khan Academy energy points · Club Penguin-style fixed-price shops: Coins earned only by learning, spent on fixed-price cosmetics, rare avatars, game skins and unlocks worth saving for | Coins sold for real money; loot boxes; content locked behind coins |
| K4 | — (no app at 4 yet) | — | Khan Academy energy points · Club Penguin-style fixed-price shops: Coins earned only by learning, spent on fixed-price cosmetics, rare avatars, game skins and unlocks worth saving for | Coins sold for real money; loot boxes; content locked behind coins |
| K5 | **Bizzing India** (4) | Real-people cards bought with coins; rarity prices 120/250/500; mastery chips "MASTERED" on Akbar's Darbar. | Khan Academy energy points · Club Penguin-style fixed-price shops: Coins earned only by learning, spent on fixed-price cosmetics, rare avatars, game skins and unlocks worth saving for | Coins sold for real money; loot boxes; content locked behind coins |
| K7 | **Bizzing Maths** (5) | Fixed printed prices 20–120; bought Graph paper for 20, balance 31→11. | Khan Academy energy points · Club Penguin-style fixed-price shops: Coins earned only by learning, spent on fixed-price cosmetics, rare avatars, game skins and unlocks worth saving for | Coins sold for real money; loot boxes; content locked behind coins |
| K9 | **Bizzing Finance** (4) | Wallet: every movement dated, printable statement; jars, bank vault, net worth on Progress. | Khan Academy energy points · Club Penguin-style fixed-price shops: Coins earned only by learning, spent on fixed-price cosmetics, rare avatars, game skins and unlocks worth saving for | Coins sold for real money; loot boxes; content locked behind coins |
| K10 | — (no app at 4 yet) | — | Khan Academy energy points · Club Penguin-style fixed-price shops: Coins earned only by learning, spent on fixed-price cosmetics, rare avatars, game skins and unlocks worth saving for | Coins sold for real money; loot boxes; content locked behind coins |
| M3 | — (no app at 4 yet) | — | Khan Academy Kids · Epic Read-to-me: Every instruction read aloud for pre-readers in a warm recorded voice; soft sounds and a mute | Robotic device speech; loud reward jingles |
| M4 | — (no app at 4 yet) | — | Khan Academy Kids · Epic Read-to-me: Every instruction read aloud for pre-readers in a warm recorded voice; soft sounds and a mute | Robotic device speech; loud reward jingles |
| M5 | — (no app at 4 yet) | — | Khan Academy Kids · Epic Read-to-me: Every instruction read aloud for pre-readers in a warm recorded voice; soft sounds and a mute | Robotic device speech; loud reward jingles |
| N4 | **Bizzing India** (4) | Nav/UI icons inline SVG (12-24 per screen); emoji mainly as content (🪙, 🙏 Greetings, 🗺⛰ map toggle, 🪔 badges). Raster only for art. | Toca Boca · Khan Academy Kids · Duolingo (illustration system): One art direction everywhere; a real SVG icon set (not emoji); self-hosted display + body fonts; meaningful motion | Emoji as UI icons; mixed icon styles; system fonts |
| N12 | — (no app at 4 yet) | — | Toca Boca · Khan Academy Kids · Duolingo (illustration system): One art direction everywhere; a real SVG icon set (not emoji); self-hosted display + body fonts; meaningful motion | Emoji as UI icons; mixed icon styles; system fonts |
| P3 | — (no app at 4 yet) | — | Apple HIG · WCAG 2.2 AA: 44 pt targets, bottom tabs, contrast and focus as tested rules | Fixed desktop layouts squeezed onto phones |
| P5 | **Bizzing Maths** (4) | Skip link, Tab reaches tabs with visible 3px focus ring (box-shadow), keyboard everywhere incl. games. | Apple HIG · WCAG 2.2 AA: 44 pt targets, bottom tabs, contrast and focus as tested rules | Fixed desktop layouts squeezed onto phones |
| P6 | **Bizzing Maths** (4) | No unnamed buttons or alt-less images; aria-live on answers; reduced motion stops motif (animation none) and calms game pops. | Apple HIG · WCAG 2.2 AA: 44 pt targets, bottom tabs, contrast and focus as tested rules | Fixed desktop layouts squeezed onto phones |
| R2 | **Bizzing Finance** (4) | First load ~760KB raw: index.js 597KB (199KB gz), CSS 61KB, 2 fonts; lessons lazy chunks. | web.dev performance budgets · Google PWA checklist: A written budget enforced in the build; offline after first visit | Shipping every data file at boot |
| S3 | **Bizzing Maths** (5) | Privacy page matches behaviour: local storage, device voice, the two shared keys, ?demo in memory (d-64). | Apple Kids category · kidSAFE: No ads, no tracking, data minimal by design, a privacy page that is true | Third-party scripts on a child's screen |
| S4 | **Bizzing Maths** (5) | Vedic origin told honestly with sources; Aryabhata and Brahmagupta facts dated; money stops neutral. | Apple Kids category · kidSAFE: No ads, no tracking, data minimal by design, a privacy page that is true | Third-party scripts on a child's screen |
| T3 | **Bizzing Maths** (5) | No paywall anywhere; nothing on child screens. | Apple Family Sharing · Google Workspace app switcher: One family account every app recognises; the same top bar in every app; share cards for milestones | Paywalls on the child's screen |
| T9 | — (no app at 4 yet) | — | Apple Family Sharing · Google Workspace app switcher: One family account every app recognises; the same top bar in every app; share cards for milestones | Paywalls on the child's screen |

## 4. Games, worlds and features (from the walkthrough)

**Games to improve or cut** (each must meet standard §14):

| Game | Score | Verdict | Note |
|---|---|---|---|
| Who Wants to Be a Bizzillionaire | 2 | improve | General trivia ('What comes after 9?') for a 9-year-old; plain navy quiz-show skin. |
| Daily Buzz | 3 | improve | Wordle clone with share grid; guesses don't teach spelling patterns. |
| Honeycomb Run | 3 | improve | Pac-Man maze; spelling only opens gates. Dexterity dominates. |
| Keep Flying | 3 | improve | Flappy-style flight with spelling gates; spelling is a toll. |
| Spell Scene | 3 | improve | Finish the scene; result showed '4 of 4 spelled' yet 0 stars 'The colour fades'. |
| Bee Trivia | 3 | improve | Big emoji-tiled general trivia; defaulted to Rookie (6–7) for age 9. |
| Magic Squares | 3 | improve | Bingo board of themes; promises row/column coin bonuses that pay nothing. |

**Absent, weak or useless features:**

- **Coin shop / sinks for free children** (absent): Free plan opens 0 avatar packs; coins earned have nothing to buy.
- **Avatar customisation (outfits, frames)** (absent): Removed deliberately; no cosmetic layer at all.
- **Coin history screen** (absent): Wallet ledger exists in storage but no child-facing view.
- **Certificates / share cards** (absent): No printable stage or region certificate.
- **Server entitlements** (absent): Plans read from localStorage; anyone can flip them.
- **Magic Squares line bonuses** (useless): Copy promises +10/+15/+40 coins; code pays nothing for lines.
- **Indian/European Gods avatar packs** (useless): Sacred figures ranked by OVR as Legendaries; harms trust with families.
- **Avatar card stats (Stamina, Coolness…)** (useless): Invented numbers unrelated to the child's learning.
- **Quotes of the hour / Quotes library** (weak): Unsourced, misattributed ('Anonymous'), off-topic for spelling.
- **Bizzillionaire general trivia** (weak): Number and general-knowledge questions in a spelling app.
- **BUG? side tab and beta banner** (useless): Developer widgets on every child screen.
- **'Get a nicer device voice' tip** (useless): Contradicts the recorded voice the app already ships.
- **Word-of-the-hour picker** (weak): Served 'Islamic — supporting Islamism' and 'eldritch' to a 9-year-old.

**Visual bugs and dead ends seen** (each gets a check):

- Phone Atlas: region labels overlap ('Subject Sprints' over 'V 0/18 stops'; avatar pin over Roman Forum count)
- IPA page shows stray text '→ x/button>' (app3.js:5416)
- Avatar tiles squeeze 'Comes with the plan — ask a grown-up' into a 6-line circle
- Locked avatar card's plan button nearly invisible (white on purple scrim)
- Spell Scene result: '4 OF 4 SPELLED' with 0 stars and 'The colour fades'
- Phone landing header wraps 'Start free' onto its own line
- Landing full-page capture shows blank screenshot frames and empty avatar tiles (lazy images)
- Rival 'Suki' wears the child's own panda avatar in Mock Bee line-up
- Locked book shelf opens a PIN modal that stays over Themes, Concepts and IPA screens after navigating
- Spell Scene result offers 'Back to map' with no map in the arcade
- Advanced Atlas regions open a full Advanced Pack sales page on the child's screen
- Settings opens without the PIN though its own copy says Settings asks for it
- Escape does not close the drawer or the Settings sheet

## 5. Not in this chat

Entitlements (T1), pricing in the product (T2), free-vs-paid copy (T4) and marketing pages (T8) come with the shared family server and billing, which is built once for every app. Do not build app-local paywalls. Until then, "family plan" is a flag the grown-ups' tester mode can set. **Narration:** none new for now (owner's decision). Keep the existing clips.

## 6. Definition of done

- [ ] Every Fix-first item is shipped and tested.
- [ ] Every key element in §3 is at **≥ 4**, each with its Done-when check in the test suite.
- [ ] `validate(avatars)` returns `[]`: 96 avatars in 12 × 8, tiers 2/3/2/1, every Legendary has a milestone, nothing sacred or real.
- [ ] At least six worlds meet §7 (painted, three ambient layers, a designed night, music), screenshotted in light and dark at 390 px and 1280 px.
- [ ] The mascot and app icon ship per §2 (the owner's pick).
- [ ] Top bar, ☰, tabs and Settings match §3–§5.
- [ ] The browser check (§22) passes on desktop and phone.
- [ ] Deployed per the repo's CLAUDE.md. Reply with the commit and a re-score of every row you changed.
