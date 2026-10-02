# Bizzing India — fix brief v2 (family audit, 2 Oct 2026)

Paste this into the Bizzing India chat, or point that chat at this file. It replaces the v1 brief. It is the work to bring Bizzing India to **at least 4 on every key element** and in line with the **[Bizzing family standard v2](https://github.com/aayuvis/Bizzing_Schedule/blob/claude/amazing-knuth-4aemgz/docs/family/FAMILY-STANDARD.md)**. Read the standard first.

- **Repo:** aayuvis/bizzingindia.com — app in `app/`. Follow the repo's own CLAUDE.md for branch, tests and deploy.
- **Audited:** detached HEAD @ b3317c34 (FIX-INDIA batch 6 + gate fix, 2026-10-02).
- **Today:** average **3.59** across 152 elements; **35 of 97 key elements below 4**.
- **Verdict:** Bizzing India is the richest content app in the family: 344 recorded, painted stories, two serialized epics, a living map with a 5,000-year timeline, nine Indic languages on an SRS path and ten courses, all private and ad-free. The FIX-INDIA batches landed well — one Continue, Back stays in, PIN, family wallet, medals, no streaks, 0 console errors and 0 third-party requests. What holds it back is breadth over finish: 7 tabs and no search across a huge corpus, half-built Family Shelf/Invite with visible template bugs, Paathshala Learn stops that only redirect, script charts falling back to system fonts, and an avatar style that clashes with the painted plates. Commercially it is not ready: no pricing, client-side pass codes, no certificates or share cards.
- **Strengths to keep:** 344 painted, professionally narrated stories in English and Hindi, plus two serialized epics. · Map lights as stories finish; timeline redraws India across 14 eras with sourced moments. · Learning-only economy: printed prices, daily cap, no streaks, no randomness, no pot. · Privacy real: 0 external requests, minimal child data, PIN-guarded grown-ups, backups, households.

## How to work this brief

1. Do **§1 Fix first** in one commit, deploy and confirm it.
2. Do **§2 Harmonise**: every app is making these changes at the same time, so do them as written. Copy the shared files from the Bizzing_Schedule repo: `integration/bizzing-activity.js`, `bizzing-wallet.js`, `bizzing-avatars.js` and `bizzing-avatars.css`.
3. Work the **§3 key elements** table top to bottom, batching related rows into one commit each.
4. For every row, add the **Done when** check to the app's tests, and **prove it by breaking it once**.
5. Finish with **§6 Definition of done**, and report back the commit and the new scores.

## 1. Fix first (trust)

- **"[object Object]" on the Family Shelf** and **"{child}" on the Invite page**. The Invite page also promises a family account that does not exist: cut the claim or the page. Add the browser check for these strings (§16).
- **Hard-coded pass codes** `PARIVAAR` / `NANI2026` in client code (R7). Remove them, and gate on the server pass when it exists.
- **Rangoli Rush says "8 of 6 dots placed".** Pallanguzhi and Gutte tiles are star placeholders. Festival Frenzy is missing from the Mela grid.
- **Set script charts in their own faces.** The Urdu chart uses Naskh, not Nastaliq, and other charts fall back to Hanken Grotesk. The Indic type rule is binding.
- **Sacred figures and real people leave the avatar collection** (§8.1). Real people stay as learning cards, met by reading their story, never priced. Refund coins paid for them with `refund()`.
- **Repeated Back from Home lands on #/neeti.** Back must stay on Home.

## 2. Harmonise with the family (standard v2)

- **Mascot and icon (§2):** keep the peacock and the companion. Put the peacock on the logo and on the empty and error states.
- **Avatars (§8):** 80 are offered today, with tiers of 10/18/26/24 and real-people cards at 40 coins. Rebuild to 12 packs × 8 with the 2/3/2/1 shape from the eligible faces, then your own archive of 62, then generate the rest. No sacred figure and no real person may be an avatar. Pair packs to worlds and adopt `bizzing-avatars.js`.
- **Worlds (§7):** unchanged; India is the night model. Worlds 1–2 are free and the rest open with the plan or for 240 coins (today a world costs 240 — keep that). 10 of the 15 worlds are not offered; offer them or retire them.
- **Tabs (§4):** cut the 7 desktop tabs to 5 — Home · India · Paathshala · Bhasha · Play. Nani-Nana and Moral Science become Paathshala courses or ☰ entries. Replace phone "More" with ☰. Use one name for Play (not Khel or Mela on the tab).
- **Music (§11):** none today. Add a loop per world (the folk-instrument palette suits it) with the volume slider. Keep the recorded narration as it is.
- **Search (C4)** across stories, states, eras and words. Today there is none.
- **Shop and wallet history:** buying lives on the Me page. Move it to a Shop (Avatars · Worlds · Extras) and show the history.
- **Settings (§5):** reorder into the five sections. Age band and time controls go behind the PIN.
- **First load:** ~1.2 MB of woff2 loads up front. Lazy-load the per-script faces.
- **Top bar and ☰ (§3):** `[⬡ Hive] [☰] [mascot + Bizzing …] … [search] [coin chip] [theme] [🔒] [avatar ▾]`, 56 px. The ☰ drawer lists My page · Shop · Collection · Medals · *(up to 4 app areas)* · Settings · Grown-ups 🔒 · Help · Privacy · Back to the Hive.
- **Settings (§5):** Bee's sheet, with the sections in this order: Me · Sound & music · Look · Comfort · Grown-ups 🔒.
- **Glossary (§21):** Bizzing coins · World · Stop · Continue · Collection · Shop · Medals · Grown-ups · Family plan.
- **Hive (§19):** activity and milestones written, coins through the wallet, avatars through the engine, `#/continue` and `?from=hive` accepted.

## 3. Key elements below 4

| Id | Element | Now | What the audit saw | Change | Done when | Effort |
|---|---|---|---|---|---|---|
| C1 | Tab model | **2** | Desktop has 7 tabs (Home, Paathshala, Nani-Nana, India, Bhasha, Moral Science, Play); phone 5+More. Names mix Hindi/English; Play also called Khel/Mela. | Merge to 5: Home, Stories, India, Bhasha, Play; fold Paathshala/Moral Science. | 4–5 tabs in the §4 style and placement; no "More" tab; ☰ holds the rest. | M |
| C3 | Sibling switching | **3** | Grown-ups: "Children in this household", + Add a child; kid menu "Who is playing" in top bar. Switching reloads. | Show siblings' avatars directly in the kid menu. | Avatar ▾ in the top bar lists every child; switching tested with two children, no data mixed. | S |
| C4 | Search | **1** | No search anywhere (grep: no search UI); 344 stories, 507-word kosh, 38 festivals only browsable. | Add one search over stories, states, words, festivals, people. | Search pill/icon finds any lesson, stop, story, word or place; check searches three known items. | M |
| C5 | Dead ends & broken links found in the walkthrough | **3** | No dead routes, but Family Shelf shows "[object Object]", Invite shows "{child}" placeholder; Paathshala "Learn" stop is just a link to Bhasha + Finish. | Fix the two template bugs; give each Learn stop its own teaching. | Walkthrough finds no dead end; check visits every route and asserts a heading and a way back. | S |
| D4 | World art consistency | **3** | Story plates consistent folk-painterly, but chibi kawaii avatars pasted on them clash; mela tiles flat vectors; 2 game tiles are star placeholders. | One art direction for avatars and plates; no stickers over scenes. | One art direction across all worlds. | L |
| D8 | World progression visible | **3** | Map 0/36 lit, timeline; Paathshala parts 0/5 with "you are here"; locks say how to open. | Show lit vs unlit legend clearer; map unlit states hard to tell from lit. | Map shows done / current / locked, and each lock says how it opens. | S |
| D10 | World ambient life | **3** | World friezes have tiny walkers/rickshaws; Sabhyata has animated map; little ambient sound. | Add soft ambient loops per world, muted by default. | Three ambient layers per world, paused when hidden, frozen under reduced motion (check). | M |
| E3 | Teaching the why | **3** | Bhasha introduces each word with audio and sentence before asking (c-lesson-00). Paathshala Learn stop "Why the line on top" has no teaching, just "Open Bhasha". | Write real worked teaching into each Learn stop. | Worked example or interactive "why" before practice on every stop. | L |
| E6 | Hints & scaffolding | **3** | "Hear it" replay, Gyanpati lifelines (Aadha-Aadha, Poochho Nani), story Q "no wrong answer". No graded hints in Bhasha. | Add a first-letter/sound hint after one miss. | A hint on the exact wrong item, never revealing the answer. | M |
| F3 | Mistake review | **2** | SRS re-serves missed words, but no visible "my mistakes" deck in Bhasha or quizzes. | Add a "words that slipped" review card. | A mistakes deck that brings missed items back after a gap. | M |
| F4 | Session end summary | **3** | Story end: moral, three words, +5 toast, medal; games "What you practised"; lesson end summary weak. | Show a lesson end card: 4 words, right x/y. | Finish screen names what was practised and what is next. | S |
| G2 | Average game quality | **3** | Most are polished MCQ or faithful board games with keyboard; several (Ludo, Carrom, Kancha, Gutte, Pallanguzhi) teach culture only. | Tie board games to questions (answer to roll). | Every game meets §14; average game score ≥ 4 on the next audit. | M |
| G4 | Learning IS the mechanic | **3** | State Hunt, Shabd, Jataka, Festival, Gyanpati are learning; Ludo/Saap-Sidi/Carrom/Kancha are pure play (pay nothing). | Make Saap-Sidi squares virtues with questions as the original Gyan Chaupar. | The learning is the mechanic in every game; a toll-gate game is cut. | M |
| G5 | Game art | **3** | Carrom wood board, Pallanguzhi carved board, Sabhyata painted; State Hunt flat silhouette; Pallanguzhi/Gutte tiles are star placeholders. | Paint the two placeholder tiles and State Hunt cards. | Every game has painted art in its world's style. | M |
| G6 | Game animation & juice | **3** | Frame flashes gf-yes/gf-no, toasts, folding title card; physics in carrom/kancha. Modest juice. | Add particle bursts on wins. | Motion on every answer; combo or progress feedback. | M |
| G7 | Game sound | **3** | sfx.js: five Web Audio tones (right, wrong, win…); no recorded game audio or music. | Add a few recorded cues per game. | Effects and a music loop in every game. | M |
| I4 | Mascot quality & presence across the app | **3** | Companion on Home, onboarding elephant, Mithu parrot in Sabhyata, Gattu opponent — several guides, no single mascot. | Pick one India mascot and use it in games and feedback. | One mascot (§2) on icon, logo, home, worlds, finishes, empty and error states — six poses. | M |
| J2 | Avatar art quality | **3** | Chibi kawaii portraits, consistent among themselves; clash with painterly plates. | Painterly avatar variants. | All 96 in the family sticker style, 512px WebP, looked at before shipping. | L |
| J6 | Avatar shown across the app | **3** | Avatar in top bar, Home greeting, story-end; not on map or game results. | Put the avatar on the map pin and quiz results. | The chosen avatar in top bar, greeting, finish screens, map and the Hive. | S |
| K3 | A shop exists | **3** | No shop screen; buying lives on Me page (meet cards, packs, worlds). | A dedicated Bazaar screen. | A Shop from ☰ and the coin chip: Avatars · Worlds · Extras. | M |
| K4 | Shop variety | **3** | Sinks: people cards 40, packs 60-160, worlds 240. No outfits, stickers, board skins. | Add carrom/ludo board skins and frames. | At least three kinds of thing to buy (avatars, worlds, one cosmetic line). | M |
| K9 | Wallet & coin history visible to the child | **2** | Ledger exists in localStorage but child sees only the 🪙 total; no history screen. | Show "where my coins came from" list on Me. | Coin chip opens the wallet history (§1.1). | S |
| K10 | Economy balance | **3** | Cap 100/day vs card 40, world 240 — fine pacing; but gods/epic casts free so the shelf fills quickly. | Add a long-term goal (Legendary 500) on Home. | A free child has something worth saving for in week 4 (Legendary, world 3). | S |
| M3 | Sound effects | **3** | sfx.js five synthesized sounds under one mute. | Richer recorded effects. | Right · wrong · finish · medal · coin · unlock effects. | M |
| M4 | Music | **1** | No music anywhere (grep music/bgm: none). | Add optional soft tanpura/flute loops per world. | Music per world, home and games per §11, with CREDITS.md. | M |
| M5 | Mute/volume controls | **3** | One Sound on/off (kid menu, grown-ups) and reading speed Slower/Slow/Normal; no volume. | Separate narration vs effects toggles. | Effects, music and one volume slider in Settings §5; mute one tap from ☰. | S |
| N2 | Art-direction consistency across all screens | **3** | Strong per screen; avatar chibis vs painterly plates vs flat mela tiles vs star placeholders. | Unify avatar and game-tile art. | One art direction on every screen and control. | L |
| N12 | Visual bugs found | **2** | "[object Object]" on Family Shelf; "{child}" in Invite; Rangoli "8 of 6 dots placed"; TN duplicate Meenakshi Temple; landing wires cross heading. | Fix the template bugs and counter. | No visual bug from this brief's list remains (each has a check). | S |
| P3 | Touch target sizes | **3** | 4-39 elements under 44px per phone screen (kosh 39, map 21 state dots). | Enlarge map hit areas and pills. | Every target ≥ 44 px (check samples). | S |
| P5 | Keyboard navigation & visible focus | **3** | Tab moves through buttons; focus shows only browser default outline (auto 1px) on Home. | Use the .navtab-style accent focus ring everywhere. | Every control reachable by keyboard with a visible focus ring; Esc closes sheets and ☰. | S |
| Q4 | Controls | **3** | Sound, night, reading speed, downloads, pass code; no age-band edit or time limits seen. | Add age band and daily-time controls. | Age band, daily targets, sound, read-aloud and world controls behind the PIN. | S |
| R2 | First-load weight | **2** | Phone landing pulled 6.37 MB raw (6.0 MB JS incl. warm-up of 3.5 MB passages file) in 4s; claim 329 KB gz shell. | Do not warm the 3.5 MB passages file until Bhasha opens. | First screen ≤ 1.5 MB on a phone; initial JS ≤ 400 KB gzipped. | M |
| R7 | Security | **2** | Pass redeem codes "PARIVAAR" and "NANI2026" hard-coded in entitlements.js client; no secrets otherwise. | Move redeem to server before launch. | No seeded accounts or pass codes in client code. | M |
| S3 | Privacy page accurate | **3** | Landing privacy claim accurate; Family Shelf says recordings "live in your family's account" which does not exist yet. | Fix the shelf copy. | Privacy page true, updated first when anything changes. | S |
| T9 | Shareability | **2** | navigator.share for invite text only; no certificates or share cards. | Course certificates and avatar share cards. | Certificates per §13, shared from the grown-ups area. | M |

Already at 4 or 5 (keep them there): A1 Landing/welcome clarity, A3 Time to first learning, A4 Profile setup minimal & fast, A5 Demo / try-before-signup, A8 First-session "aha", B1 Home layout & hierarchy, B2 Exactly one primary Continue, B3 Progress visible on home, B5 Mascot / greeting personality, B7 Phone home: Continue above the fold, B10 Returning-child state, C2 Back button & hash routing, D1 Number of worlds/lands/levels, D3 World art quality, D5 World variety, E5 Answer feedback, E9 Mastery from evidence, E10 Content accuracy & sourcing, E11 Question testing & answer-leak protection, F1 Short daily session, G10 Keyboard AND touch in every game, G11 Filler/useless games, J1 Avatar count, J4 Rare/collectible tiers present, J5 Unlock path stated on every avatar, J7 Showcase / trading-card / profile page, K1 Currency present, K2 Earned only for learning, K5 Rare avatars obtainable with coins and/or milestones, K7 Prices visible and fixed, K8 No random rewards / gacha / pay-to-win, L1 Medals/badges from evidence, L3 Celebration moments, L5 No streak pressure, L6 Positive tone on mistakes, N1 Overall visual polish, N4 Iconography system: SVG vs emoji vs raster, N5 Icon quality & legibility, N6 Font quality: faces used, self-hosted, display/body pairing, weights loaded, O3 Night/dark mode present, O4 Night mode quality, P1 Phone layout: no overflow at 390 px, P2 Thumb reach & bottom tab bar, P4 Contrast in light and dark, P6 Screen-reader labels & reduced motion, Q1 Grown-ups area behind a PIN, Q2 Report card quality, Q3 Reports learning, not just usage, Q5 Data export / erase, Q6 Multiple children managed, Q7 Tester/dev controls hidden from the child, R1 Offline / PWA installable, R4 Console errors during the walkthrough, R5 Automated tests & browser checks, R6 Storage seam & versioned migrations, S1 Child data minimal, S2 No third-party requests, S4 Sensitive content handled, T3 Paywall never on the child's screen, T5 Bizzing Hive feed written, T6 Deep links accepted, T7 Family top bar / brand layer.

### 3a. Draw inspiration from

For each row above, copy the in-family model first, then the outside benchmark (standard §23).

| Id | Copy from (Bizzing) | What exactly | Outside benchmark | Don't borrow |
|---|---|---|---|---|
| C1 | **Bizzing Bee** (4) | Five tabs: Home · Word Atlas · Practice · Library · Play, bottom bar on phone. 'Practice' vs 'Atlas' vs Library concepts overlap. | Apple HIG tab bars · Khan Academy Kids profiles: ≤ 5 tabs, back always stays inside the app, one-tap child profiles, a search that finds any lesson | Hamburger menus hiding main areas |
| C3 | **Bizzing Maths** (4) | Avatar ▾ sheet lists both children, one tap to switch, add a child, sound and dark toggles (d-62). | Apple HIG tab bars · Khan Academy Kids profiles: ≤ 5 tabs, back always stays inside the app, one-tap child profiles, a search that finds any lesson | Hamburger menus hiding main areas |
| C4 | **Bizzing Bee** (4) | Header 'Search any word…' gives live dictionary matches (rhythm, latin) and 'See all matches'; Word Finder searches 40k/128k. Search does… | Apple HIG tab bars · Khan Academy Kids profiles: ≤ 5 tabs, back always stays inside the app, one-tap child profiles, a search that finds any lesson | Hamburger menus hiding main areas |
| C5 | **Bizzing Maths** (4) | No dead ends in walkthrough; quibbles: Library/Vedic stones and Times-table stops stay locked in tester mode; overlays (sudoku) hide nav. | Apple HIG tab bars · Khan Academy Kids profiles: ≤ 5 tabs, back always stays inside the app, one-tap child profiles, a search that finds any lesson | Hamburger menus hiding main areas |
| D4 | **Bizzing Maths** (5) | All plates share one warm painterly storybook style, matching home hero, atlas maps, game plates and medals. | Prodigy (world map) · Toca Boca (world feel) · Monument Valley (art direction): Each world a distinct, alive place with its own palette and sound; the map shows where you are and what is next | Worlds that are only a background behind the same quiz |
| D8 | **Bizzing Maths** (4) | Stars per stop, locks with level badges (🔒 L5), station counts 1/16, level chips 1–10 with locks (d-66, d-70). | Prodigy (world map) · Toca Boca (world feel) · Monument Valley (art direction): Each world a distinct, alive place with its own palette and sound; the map shows where you are and what is next | Worlds that are only a background behind the same quiz |
| D10 | — (no app at 4 yet) | — | Prodigy (world map) · Toca Boca (world feel) · Monument Valley (art direction): Each world a distinct, alive place with its own palette and sound; the map shows where you are and what is next | Worlds that are only a background behind the same quiz |
| E3 | **Bizzing Maths** (5) | Learn tab: trick as numbered steps revealed one by one, 'Why it works' prose with figure, algebra in details (d-14). Your turn makes the… | Brilliant · DragonBox · Khan Academy: Interactive why before practice; varied item types; hints on the exact wrong item; mastery that is re-checked | Multiple-choice only; self-marked 'complete' |
| E6 | **Bizzing Maths** (4) | Guided 'Your turn' shows a step after two misses; 'Show me' in Make the Target; sudoku hints; tip to do Your turn first. | Brilliant · DragonBox · Khan Academy: Interactive why before practice; varied item types; hints on the exact wrong item; mastery that is re-checked | Multiple-choice only; self-marked 'complete' |
| F3 | **Bizzing Bee** (4) | Misses 'Saved for revision', Revision pile, My traps radar, 'My missed words' list, Tricky review. | Duolingo lessons · Anki: 3–5 minute sessions with a clean finish screen; a mistakes deck that comes back later | Daily-goal pressure and streak reminders |
| F4 | **Bizzing Maths** (4) | Run end: stars, '8 of 10 right', station count, missed items, next-station button (d-18); games list what was practised. | Duolingo lessons · Anki: 3–5 minute sessions with a clean finish screen; a mistakes deck that comes back later | Daily-goal pressure and streak reminders |
| G2 | **Bizzing Maths** (4) | Each game has title card + how-to, painted plate, pop/wobble, combo meter, music loop, finish screen naming facts practised (d-31..41). | DragonBox · Prodigy (polish) · Toca Boca (feel): The learning is the mechanic; every action has motion and sound; levels and personal bests | Battles where learning is a toll gate; luck-based scoring |
| G4 | **Bizzing Maths** (5) | Rush feeds the child's own facts and records them; Line is estimation; Target is arithmetic reasoning; Contest is fact/trick ladder. | DragonBox · Prodigy (polish) · Toca Boca (feel): The learning is the mechanic; every action has motion and sound; levels and personal bests | Battles where learning is a toll gate; luck-based scoring |
| G5 | **Bizzing Maths** (4) | Painted plates for Rush meadow, archery field, pier; bubbles are canvas gradients; Sudoku has no art (plain white overlay). | DragonBox · Prodigy (polish) · Toca Boca (feel): The learning is the mechanic; every action has motion and sound; levels and personal bests | Battles where learning is a toll gate; luck-based scoring |
| G6 | **Bizzing Bee** (4) | Combos (5x), stars, confetti, speed bonus, hearts, glitch effects. Quiz screens static. | DragonBox · Prodigy (polish) · Toca Boca (feel): The learning is the mechanic; every action has motion and sound; levels and personal bests | Battles where learning is a toll gate; luck-based scoring |
| G7 | — (no app at 4 yet) | — | DragonBox · Prodigy (polish) · Toca Boca (feel): The learning is the mechanic; every action has motion and sound; levels and personal bests | Battles where learning is a toll gate; luck-based scoring |
| I4 | **Bizzing Bee** (4) | Bizzy appears in logo, lessons, arcade, Bizzillionaire lifeline, home tip. Speaking only in explainers. | Epic · Khan Academy Kids characters: Illustrated, read-aloud stories; a cast that appears everywhere | Stories as walls of text |
| J2 | **Bizzing Bee** (4) | Chibi sticker art, consistent, readable at 44px (40-avatars-desk). Includes Hindu deities (Shiva, Krishna, Ganesha, Durga…) and real 1920s… | Pokémon-style collections done ethically · Apple Memoji (customisation): Rare tiers with the unlock printed on the card; outfits and frames; a showcase page | Gacha, packs, random drops, pay-for-a-chance |
| J6 | **Bizzing Maths** (4) | Avatar on Home greeting, top bar, contest field/podium, ceremony, report card; frame shows in top bar. | Pokémon-style collections done ethically · Apple Memoji (customisation): Rare tiers with the unlock printed on the card; outfits and frames; a showcase page | Gacha, packs, random drops, pay-for-a-chance |
| K3 | **Bizzing Geography** (4) | Map shop on Me page (crop-shop) with printed prices. | Khan Academy energy points · Club Penguin-style fixed-price shops: Coins earned only by learning, spent on fixed-price cosmetics, rare avatars, game skins and unlocks worth saving for | Coins sold for real money; loot boxes; content locked behind coins |
| K4 | — (no app at 4 yet) | — | Khan Academy energy points · Club Penguin-style fixed-price shops: Coins earned only by learning, spent on fixed-price cosmetics, rare avatars, game skins and unlocks worth saving for | Coins sold for real money; loot boxes; content locked behind coins |
| K9 | **Bizzing Finance** (4) | Wallet: every movement dated, printable statement; jars, bank vault, net worth on Progress. | Khan Academy energy points · Club Penguin-style fixed-price shops: Coins earned only by learning, spent on fixed-price cosmetics, rare avatars, game skins and unlocks worth saving for | Coins sold for real money; loot boxes; content locked behind coins |
| K10 | — (no app at 4 yet) | — | Khan Academy energy points · Club Penguin-style fixed-price shops: Coins earned only by learning, spent on fixed-price cosmetics, rare avatars, game skins and unlocks worth saving for | Coins sold for real money; loot boxes; content locked behind coins |
| M3 | — (no app at 4 yet) | — | Khan Academy Kids · Epic Read-to-me: Every instruction read aloud for pre-readers in a warm recorded voice; soft sounds and a mute | Robotic device speech; loud reward jingles |
| M4 | — (no app at 4 yet) | — | Khan Academy Kids · Epic Read-to-me: Every instruction read aloud for pre-readers in a warm recorded voice; soft sounds and a mute | Robotic device speech; loud reward jingles |
| M5 | — (no app at 4 yet) | — | Khan Academy Kids · Epic Read-to-me: Every instruction read aloud for pre-readers in a warm recorded voice; soft sounds and a mute | Robotic device speech; loud reward jingles |
| N2 | **Bizzing Maths** (4) | Painted storybook art throughout Atlas/Library/Arcade/medals; tools and grown-ups are plain UI. | Toca Boca · Khan Academy Kids · Duolingo (illustration system): One art direction everywhere; a real SVG icon set (not emoji); self-hosted display + body fonts; meaningful motion | Emoji as UI icons; mixed icon styles; system fonts |
| N12 | — (no app at 4 yet) | — | Toca Boca · Khan Academy Kids · Duolingo (illustration system): One art direction everywhere; a real SVG icon set (not emoji); self-hosted display + body fonts; meaningful motion | Emoji as UI icons; mixed icon styles; system fonts |
| P3 | — (no app at 4 yet) | — | Apple HIG · WCAG 2.2 AA: 44 pt targets, bottom tabs, contrast and focus as tested rules | Fixed desktop layouts squeezed onto phones |
| P5 | **Bizzing Maths** (4) | Skip link, Tab reaches tabs with visible 3px focus ring (box-shadow), keyboard everywhere incl. games. | Apple HIG · WCAG 2.2 AA: 44 pt targets, bottom tabs, contrast and focus as tested rules | Fixed desktop layouts squeezed onto phones |
| Q4 | **Bizzing Bee** (4) | Age band, three daily targets, bee-day milestone date, text size, contrast, reduce motion, sound, voice speed, read-aloud. | IXL Analytics · Apple Screen Time weekly report: Skill-level diagnosis and a short weekly digest behind a PIN | Minutes shown as achievement; dev buttons a child can reach |
| R2 | **Bizzing Finance** (4) | First load ~760KB raw: index.js 597KB (199KB gz), CSS 61KB, 2 fonts; lessons lazy chunks. | web.dev performance budgets · Google PWA checklist: A written budget enforced in the build; offline after first visit | Shipping every data file at boot |
| R7 | **Bizzing Maths** (4) | No secrets or accounts in client; PIN stored locally in plain text (documented as deterrent). | web.dev performance budgets · Google PWA checklist: A written budget enforced in the build; offline after first visit | Shipping every data file at boot |
| S3 | **Bizzing Maths** (5) | Privacy page matches behaviour: local storage, device voice, the two shared keys, ?demo in memory (d-64). | Apple Kids category · kidSAFE: No ads, no tracking, data minimal by design, a privacy page that is true | Third-party scripts on a child's screen |
| T9 | — (no app at 4 yet) | — | Apple Family Sharing · Google Workspace app switcher: One family account every app recognises; the same top bar in every app; share cards for milestones | Paywalls on the child's screen |

## 4. Games, worlds and features (from the walkthrough)

**Games to improve or cut** (each must meet standard §14):

| Game | Score | Verdict | Note |
|---|---|---|---|
| Rangoli Rush | 3 | improve | Memory pattern 100 levels; counter showed "8 of 6 dots placed". |
| Jataka Jump | 3 | improve | Fable then pick lesson; text-heavy MCQ. |
| Festival Frenzy | 3 | improve | Match festival to month/state/reason; not in Mela grid, only via Utsav. |
| Trivia Master | 3 | improve | Category picker + 60s sprint; overlaps Gyanpati. |
| Saap-Sidi | 3 | improve | Gyan Chaupar history; pure dice race, pays nothing. |
| Ludo | 3 | improve | Faithful Ludo vs Gattu; no learning. |
| Kancha | 3 | improve | Marble flick 3 rounds; keys work. |
| Pallanguzhi | 3 | improve | Carved board, kasi rule taught; tile art is a star placeholder. |
| Gutte | 2 | improve | Five-stones tap timing; placeholder tile, thin. |

**Absent, weak or useless features:**

- **Search** (absent): No way to find a story, state, word or festival across 344 stories and 507 words.
- **Mistake review deck** (absent): SRS re-serves misses silently; no "words that slipped" screen.
- **Coin history for the child** (absent): Wallet ledger exists in storage; child sees only a total.
- **Avatar outfits/frames** (absent): Portraits are fixed; nothing to customise or spend on beyond cards and worlds.
- **Music** (absent): No music in any world or game.
- **Certificates / share cards** (absent): Course completion produces no printable or shareable artefact.
- **Pricing in product** (absent): "Payments are still being built"; only demo pass codes.
- **Family Shelf / Invite** (weak): Needs a family account that does not exist; shows template bugs.
- **Paathshala Learn stops** (weak): Several Learn stops only link to Bhasha and offer Finish; no teaching of their own.
- **Trivia Master** (weak): Duplicates Gyanpati with a category picker; could be a Gyanpati mode.
- **Rank-up ceremony** (absent): Rank changes Shishya→Vidyarthi silently; only medals celebrate.
- **Ludo / Kancha / Gutte** (weak): Pure play with no learning hook; fine as culture, pay nothing.
- **10 of 15 worlds unoffered** (weak): Mumbai, Pujo, Dal Lake, Rajasthan etc. defined but not in the 5-world picker.

**Visual bugs and dead ends seen** (each gets a check):

- Family Shelf "[object Object]" (x-shelf.png)
- Invite "{child}" placeholder (x-invite.png)
- Rangoli Rush counter "8 of 6 dots placed" (g-rangoli-2-d)
- Pallanguzhi and Gutte mela tiles are generic star placeholders (x-mela.png)
- Script chart glyphs use Hanken Grotesk fallback; Urdu chart shows Naskh not Nastaliq (w-chart-ur)
- Chibi avatar sticker covers the centre of painted story plates (c-story-mid-d)
- Tamil Nadu page lists Meenakshi Temple twice (w-state-TN)
- Landing bunting wires run through the hero headline on phone (01-landing-p)
- Map base is very pale under the mist; lit vs unlit hard to tell
- Family Shelf (#/shelf) subtitle renders "[object Object]"
- Invite page (#/invite) headline "{child} would like to hear your voice." and says recordings live in a family account that does not exist
- Paathshala Learn stop "Why the line on top" has no teaching — only "Open Bhasha →" and "Finish →"
- Festival Frenzy game missing from the Mela grid; reachable only from Utsav
- Repeated Back from Home landed on #/neeti (Moral Science), not Home

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
