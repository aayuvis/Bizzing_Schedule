# The Bizzing family standard — v2 (2 Oct 2026)

This standard says what all five Bizzing apps — **Bee, Maths, Geography, India and Finance** — must do the same way, so they feel like one family with the Bizzing Hive at the centre. Each app keeps its own subject, its own world and its own art. This is the shared layer on top.

v2 replaces v1. It is built on the deep audit of 152 elements per app, and on the owner's decisions of 2 Oct 2026.

**Who wins a disagreement:**
- Where an app's own CLAUDE.md is stricter than this standard, the stricter rule wins.
- Where this standard and an app disagree, change the app, or raise it with the owner. Never quietly diverge.

**The bar.** Every app scores **at least 4 (strong)** on each key element listed at the end.

**The shared code.** These files live in the Bizzing_Schedule repo (the Hive). Copy them into each app; never re-implement them.

| File | What it does |
|---|---|
| `integration/bizzing-activity.js` | Writes the Hive feed (minutes and milestones). |
| `integration/bizzing-wallet.js` | Earns, spends and refunds coins. |
| `integration/bizzing-avatars.js` + `.css` | Avatar tiers, prices, unlocks, worlds and the night glow. |

## 0. What changed in v2 (owner's decisions)

| # | Decision |
|---|---|
| 1 | **Tabs:** names and number may differ between apps. Style and placement may not. Harmonise names where it is natural, but never force-fit them. |
| 2 | **Every app has a ☰ hamburger** (Bee's pattern), and the navigation is harmonised. |
| 3 | **Settings look the same in every app** (§5). |
| 4 | **No load screens for now.** |
| 5 | **Every app has the same number of avatars: 96, in 12 packs of 8.** Bee's surplus packs are redistributed, and the rest are generated. Rarity, the night glow and the buying engine are identical everywhere (§8). |
| 6 | **No sacred figures and no real people as collectibles.** |
| 7 | **Themes are low priority.** Do not fret over them. |
| 8 | **Every app has at least six worlds** that are very dynamic and excellent in the dark. Bee's and India's worlds are the model, and they stay as they are. The other three apps enhance or create theirs (§7). |
| 9 | **Maths, Geography and Finance each get a clear, likeable mascot and app icon.** Bee and India keep theirs (§2). |
| 10 | **Music in every app.** No new narration yet (§11). |
| 11 | **Approved as proposed:** logo, the SVG icon set, Bee's home, currency and shop, the Hive plug-in, the type system, components, feedback, grown-ups, onboarding, glossary, app icons and install names, and empty/error states with certificates. |

---

## 1. One currency: Bizzing coins

One wallet per child, shared by every app. Coins are earned for learning and spent on fixed-price things, and Bizzing Finance teaches them as money.

| Rule | Detail |
|---|---|
| **One wallet** | `bizzing.wallet`, through `bizzing-wallet.js`. Each app's old currency converts 1:1 with `migrateFrom()` and is then retired. |
| **Earned only for learning** | Right answer **1** · stop, lesson or story finished **5** · contest or mock **10** · level, world or band mastered **20**. Capped at 100 per app per child per day. **Never** for time, logins, streaks, dice or luck. A "mastery" coin fires on mastery evidence, never on an XP level-up. |
| **What coins buy** | Avatars, worlds 3–6 (§7, §8) and cosmetics: outfits, frames, board skins, stickers and bonus game *modes*. Every price is fixed and printed. **Never lessons, stops or a core game.** |
| **What coins never are** | Random, a pack drawn blind, a sale, doubling, betting or trading. Never bought with real money. The paid plan opens worlds; it never sells coins. |
| **The shop** | Every app has a **Shop** that opens from ☰ and from the coin chip. It uses the same layout in every app: tabs **Avatars · Worlds · Extras**, then the wallet history (§1.1). |
| **Refunds** | When something is withdrawn (for example a sacred figure), `refund(app, who, item)` gives back exactly what the ledger shows was paid, once. |
| **Finance teaches it** | Bizzing Finance shows the same wallet as the child's income. Finance's own town money stays its curriculum. **Owner decision:** Finance still adopts the family avatar engine priced in family coins. This overrides docs/11's refusal of rarity, so Finance's CLAUDE.md must be updated to say so. |
| **The Hive pays nothing** | The Hive shows medals and the comb, never coins. |

### 1.1 Wallet history

The coin chip in the top bar opens a sheet with three parts:
- the balance;
- the last 30 ledger lines, written as words: "+5 · finished *The Meadow, stop 3* · Bee";
- one line saying what coins are for.

Coins earned in sibling apps appear here too, marked with that app's mascot head.

## 2. Brand: logo, mascot, app icon

**Logo** (top bar, left, after ☰):
- the mascot's head at 28px, then the wordmark;
- **"Bizzing"** set in Fraunces 800 in family plum `#3A2A5C`, followed by the app name in Fraunces 800 in the app's accent colour (`Bizzing Maths`);
- tapping the logo goes Home;
- the trademark mark appears only where legal says so.

**One mascot per app.** It appears in every one of these places:
- the app icon;
- the top-bar logo;
- the home greeting card, with a speech bubble about what the child did last;
- world entrances;
- the celebration on every finish screen;
- every empty state and error state (§16).

Each mascot is drawn once as a model sheet with **six poses**: wave, cheer, think, point, sleep (night and empty states) and oops (errors). The sprites are WebP, with no lettering.

| App | Mascot | Status |
|---|---|---|
| Bee | **Bizzy** the bee | The model. Keep it. |
| India | The **peacock** (app icon) and the child's chosen companion | Keep both. Use the peacock in the logo and on empty and error states. |
| Maths | **Octo** the octopus, with eight arms for counting (recommended) · Nova the koi · Tally the hedgehog | **Owner picks.** Concepts in `docs/family/mascots/`. |
| Geography | **Shelly** the sea turtle, whose shell is a globe (recommended) · Kip the explorer owl · Roam the fennec fox | **Owner picks.** |
| Finance | **Pip** the squirrel with the golden acorn, already in the app (recommended) · Penny the pangolin, whose scales are coins · Bo the beaver | **Owner picks.** |

**App icon:**
- The mascot sits large on the app's brand tile, over a tone-on-tone family pattern:
  - Bee: honeycomb on purple;
  - Maths: graph grid on cobalt;
  - Geography: map contours on teal;
  - Finance: acorns on emerald;
  - India: keeps its icon.
- No text and no currency symbols (currency is a setting).
- Master at 1024px; maskable with an 80% safe zone; files at 192, 512, maskable-512 and apple-touch-180.

**Install name:** "Bizzing Maths"; short name "Maths". The manifest `theme_color` is the brand tile colour.

## 3. The family top bar and the ☰ menu

Bee's top bar is the template: the same 56px height and the same order in every app.

`[⬡ Hive] [☰] [mascot + Bizzing App] ……… [search] [coin chip] [theme] [🔒] [avatar ▾]`

| Part | Behaviour |
|---|---|
| **⬡ Hive** | Opens `https://aayuvis.github.io/Bizzing_Schedule/`. Hidden only inside a running drill or game. |
| **☰ menu** | Left drawer, 300px, over a scrim. Closes with Esc, the scrim or ×; focus is trapped; same order in every app: **My page · Shop · Collection · Medals** · *(up to four app-specific secondary areas)* · **Settings · Grown-ups 🔒 · Help · Privacy · Back to the Hive**. Anything that is not a main tab lives here. A "More" tab is not allowed. |
| **Search** | A pill on desktop and an icon on phone. It searches every lesson, stop, story, word or place in the app. Required (C4). |
| **Coin chip** | An SVG coin and the balance. Opens the wallet history (§1.1). |
| **Theme** | One button: sun or moon for light/dark. Long-press, or the ☰ → Settings route, opens the world picker. |
| **🔒** | Opens the grown-ups area behind the PIN. |
| **Avatar ▾** | Child switcher: every child in the household, plus "Add a child" (grown-ups only). Switching never mixes data. |

On phones the bar keeps ⬡ ☰ logo … coin · avatar. Search, theme and 🔒 move into ☰.

## 4. Tabs

**Style and placement are identical in every app. Names and number may differ.**

**Desktop (≥ 900px)**
- A tab row directly under the top bar, holding 4–5 equal-width tabs.
- Each tab is a 24px SVG icon plus a label in Fraunces 700.
- The active tab is a filled pill in the app's accent, with white text. This is Bee's row exactly.

**Phone (< 900px)**
- A bottom bar, 64px plus the safe area.
- Icon above label, with a 44px minimum target.
- The active tab gets a filled icon and an accent pill behind it.

**Rules**
- **Home is always first**, and the app's map is always second.
- At most 5 tabs, at least 4.
- No "More" tab: secondary areas go in ☰.
- Back always stays in the app, through hash routes.

| App | Tabs (proposed; the app chat may refine, keeping the rules) |
|---|---|
| Bee | Home · Word Atlas · Practice · Library · Play *(unchanged)* |
| Maths | Home · Atlas · Library · Puzzles · **Play** *(Arcade → Play)* |
| Geography | Home · Atlas · Expeditions · Library · **Play** *(games gathered from Library and Expeditions; or stay at four tabs)* |
| India | Home · **India** (map and Itihaas) · Paathshala · Bhasha · Play. Nani-Nana stories and Moral Science move into Paathshala as courses, or into ☰. The 7 tabs become 5. |
| Finance | Home · **Town** (the money map) · Learn · Money · Play. "More" goes into ☰: Store → Shop, Progress → My page, Collection, Grown-ups. |

**Harmonised names:**
- "Play" for games.
- "Library" for tools and reference.
- "Atlas" (or the app's own map name) for the map.
- Hindi names stay where they are the point (Paathshala, Bhasha).

## 5. Settings — one layout everywhere

Settings opens from **☰ → Settings** as Bee's centred sheet: max 720px wide, header `[‹ Back] [⚙ Settings] [×]`, sections as cards. On a phone it is a full-screen sheet. The sections come in this order, using the same controls:

| # | Section | Controls (component) |
|---|---|---|
| 1 | **Me** | Display name (text) · avatar (opens Collection) · switch child |
| 2 | **Sound & music** | Sound effects (switch) · Music (switch) · Volume (one master slider) · Read aloud (switch, where the app has narration) · Reading speed (segmented: Slower · Normal) |
| 3 | **Look** | World (painted thumbnails of the six or more worlds; locked ones show "Opens with…") · Light · Dark · Match device (segmented) · Text size (segmented: S · M · L) |
| 4 | **Comfort** | Reduce motion (switch) · Calm mode (switch: music off, softer effects, no confetti) |
| 5 | **Grown-ups 🔒** | One row that opens the PIN. Behind it: age band, daily targets, plan, backup/restore/erase, tester mode. **Plan and subscription never appear above the PIN.** |
| — | Footer | Privacy · About · version |

Switches, segmented pills and sliders are the family components (§10). Every setting is remembered: device settings go to the device, and child settings go to the child.

## 6. Home — Bee's home is the template

Every app builds its home in Bee's look: a pattern backdrop in the app's motif, white 20px-radius cards with the small hexagon pin, and painted journey cards. Each app uses its own mascot, art and words. The cards come in this order:

1. **Greeting card**: mascot and a speech bubble that is specific to the last session ("19 of 20 right yesterday — the 7s are nearly yours").
2. **Daily ring**: the daily goal, in the Bee/Hive ring format.
3. **"… of the hour"** card: word, number, place or story.
4. **ONE Continue card**: the painted "Next on your journey" card. It carries the only filled primary button on the screen and a progress bar. A second painted journey card may sit beside it with an *outline* button.
5. **Today's three**: small cards (tip, quote, 5-minute practice). Optional; nothing is lost for skipping them.

**Placement:**
- On a phone, Continue is above the fold at 390×844.
- A returning child lands on Continue pointing exactly where they left off.
- A new child sees one welcome card with a single "Start" button.
- **No load screens** for now.

## 7. Worlds — at least six per app, alive by day and by night

A **world** is a complete dress for the app, in Bee's and India's sense (Bee: Galaxy, Dojo, Lab, Dino Era…; India: Delhi 6, Madhubani, Diwali Nights…). Each world is a painted place with:
- its palette and display face;
- its own ambient life;
- its music loop;
- **two avatar packs**;
- a designed night.

**Bee and India are the model, and they are not changed.** Maths, Geography and Finance each reach at least six worlds that meet this bar:

| Requirement | Detail |
|---|---|
| **Painted** | A painted backdrop or frieze (the home pattern and the hero) in the family storybook style, with no lettering, no digits and no people. |
| **Dynamic** | At least **three layers of ambient life**: parallax depth (two planes), place-specific particles (steam, petals, fireflies, snow, sparks), and at least one idle character or vehicle loop. CSS/Canvas, paused when the tab is hidden, frozen to the still under reduced motion. |
| **Excellent in the dark** | A **separately painted night variant**: lamps lit, windows glowing, stars. Failing that, India's designed treatment (dimmed frieze, warm glow, `mix-blend-mode: screen` lights). **Never a daylight plate on a dark page.** All text passes AA on the night plate. |
| **Sound** | A music loop (§11) and an entry sting. |
| **Packs** | Two avatar packs belong to each world (§8). |
| **Opening** | Worlds 1–2 are open to everyone. Worlds 3–6 open with the family plan, or one at a time for **240 coins**. Worlds beyond six (Bee 8, India 15) follow the same rule. |
| **Checked** | A browser check screenshots every world in light and dark at 390px and 1280px. It asserts AA on text over each plate, and that the animation pauses when the page is hidden. |

| App | Worlds now | To do |
|---|---|---|
| Bee | 8 world themes. God's Abode is withdrawn (§8), leaving 7. | No change beyond the withdrawal. |
| India | 15 world themes, each with a designed night | None. India is the night model. |
| Maths | 6 themes (Graph Paper, Chalkboard, Blueprint, Orbit, Rangoli, Arcade): flat, plates not dimmed | Repaint as 6 dynamic worlds with night variants. The painted place plates (the bakery, the observatory…) can feed them. |
| Geography | 6 living themes (Old Atlas, Ocean Deep, Rainforest, Desert Dunes, Polar Aurora, Satellite), 44–101 props each | Paint the night variants, and add the idle loop and music. Closest to the bar already. |
| Finance | 2 (Light/Dark) | **Create 6 worlds**, for example Market Row Morning, Old Harbour, Clocktower Square, Exchange Quarter, The Works, and Festival Night. |

## 8. Avatars — 96 per app, one engine

**The shape.** Every app has exactly **96 avatars in 12 packs of 8**. Every pack has the same make-up:

| Tier | Per pack | Per app | Price | How it is unlocked |
|---|---|---|---|---|
| **Common** | 2 | 24 | free | Every child, every plan, from day one |
| **Rare** | 3 | 36 | 120 coins | Its world is open, then coins |
| **Epic** | 2 | 24 | 250 coins | Its world is open, then coins |
| **Legendary** | 1 | 12 | 500 coins | Its world is open, **and** its named learning milestone ("Finish the Deep Mine"), then coins |

**One engine.** Use `integration/bizzing-avatars.js`. Never re-implement it.
- `validate(catalogue)` belongs in each app's test suite and must return `[]`.
- `stateOf()` decides what each card says.
- `buy()` and `buyWorld()` charge through the wallet.

The engine enforces:
- the 12 × 8 shape;
- the tier prices;
- a milestone on every Legendary;
- no randomness, duplicates or trading;
- refusal of any avatar flagged `sacred` or `real`.

**Every card states its path** in plain words: "Free for everyone", "120 coins · 40 more to go", "First: finish the Deep Mine" or "Opens with its world". A card never shows real money and never links to a payment form.

**One look, one glow.** Use `integration/bizzing-avatars.css`.
- Each tier has its own border colour: Common grey `#7B8794`, Rare blue `#3D7DF0`, Epic purple `#B14FC4`, Legendary gold `#F0B429`.
- **In the dark, the tier glows.** Rare and Epic get a soft halo, and Legendary gets a slow gold shimmer (static under reduced motion).
- Locked cards are greyed and do not glow.
- Every app sets `data-bz-dark` on `<html>` when dark.

**Where avatars appear:** the top bar, the home greeting, results and finish screens, the map, the Hive, and a **Collection** page that shows all 96 by pack, with owned and locked faces and the path to each.

**Art.** Each pack is generated in the family sticker style (Bee's contact sheet and the mascots in `docs/family/mascots/`). That means a squircle-friendly chubby character, a thick plum outline, cel shading, no lettering, at 512px WebP. Every avatar is looked at before it ships.

**No face appears in two apps' 96.** Packs move between apps; they are never copied. For example, the koi now duplicated in Maths, Geography and Finance stays only in Maths.

### 8.1 Redistribution — to 96 each

| App | Collectible today | Keep | From a sibling | Withdraw (refund) | Generate | = |
|---|---|---|---|---|---|---|
| **Bee** | 142 in 18 packs | 12 packs: Hive, Critter, Cosmos, Vibe, Dojo, Origami, Lab, Elements, Reptilian, Enchanted, Legends, Villains = 96 | — | **European Gods, Indian Gods** (sacred), **World Changers, Spelling Champions** (real people) | 1 (Naga, a sacred serpent, replaced in Reptilian); re-tier every pack to 2/3/2/1 | **96** |
| **Maths** | 30, no tiers | 30, regrouped by family | **Bee's Turbo pack** (8 racers → Number Rush) | — | 58 (7¼ packs) | **96** |
| **Geography** | 40, no tiers | 40 (5 packs) | **Bee's Big Beasts pack** (8 prehistoric and ocean giants; Vasuki, a sacred serpent, replaced) | — | 48 (6 packs, one per theme: ocean, rainforest, desert, polar, mountains, sky) | **96** |
| **India** | 80 offered (+62 archived); tiers 10/18/26/24 | The non-sacred, non-real faces among the 80 | Its own archive of 62, where eligible | **Sacred figures and the real-people cards** leave the collection. Real people stay as *learning* cards, met by reading their story, never priced. Coins paid for them are refunded. | The rest, to 96 | **96** |
| **Finance** | 21, no tiers (refused in docs/11, now overridden) | Faces not shared with a sibling | — | — | ~75 to 96, two packs per world (townsfolk, market animals, harbour, clockwork, builders, festival) | **96** |

Bee pairs its 12 packs with its worlds (the `world` field on each avatar; Turbo moving out of Race Zone is Bee's call). Every other app pairs packs 1–12 with worlds 1–6, two each.

## 9. Icons and type

**Icons are SVG, never emoji.** UI icons come from one family set: Bee's `ds-src` line set, extended. That covers tabs, buttons, section headers, world and stop glyphs, filters and the coin.
- 24px grid, 2px rounded stroke, `currentColor`, with an optional duotone fill.
- Emoji are allowed only as *content*: a word's picture, a flag, a sticker the child chose. Never as a control or a label icon.
- The browser check counts emoji inside `button, [role=tab], nav, h1–h3, .chip`, and the count must be 0.

**Type.** The family chrome uses one type system in every app:

| Role | Face |
|---|---|
| Body and UI | **Hanken Grotesk** |
| Chrome headings (tabs, settings, shop, grown-ups) | **Fraunces** |
| Numbers and words-as-objects | **Sono** |

- A world may add one display face for its hero and headings.
- At most 4 faces per screen, all self-hosted woff2.
- **≤ 250 KB of fonts before first paint**; world faces load with their world.
- Indic scripts follow Bizzing India's rule: a real face, an unbroken shirorekha, never letter-spaced, and every script chart set in its own face (never a fallback).

## 10. Look: components, colour, motion

**Components shared in every app:** card (20px radius, hexagon pin) · primary button (filled accent, one per screen region) · outline button · switch · segmented pills · slider · chip · sheet/modal (Bee's) · toast · progress bar · ring.

**Colour and themes**
- Colours are tokens on `:root`. Every surface uses `var(--card)` and `var(--bg)`, never a literal white.
- WCAG AA in light and dark, measured by the browser check.

**Motion**
- 150–250 ms ease-out on transitions.
- Every answer moves something.
- Reduced motion is respected.

**Feedback, the same everywhere**
- A right answer gives a green tick, a soft chime and auto-advance.
- A wrong answer holds with "Not this time", shows the working on the child's own item, and waits for a tap.
- Celebrations name what was done ("12 words in a row"). They never compare children.

## 11. Audio — music in every app, no new narration

| Rule | Detail |
|---|---|
| **Music** | One calm loop per world, one for home, and one per game family. 60–90 s seamless loops, ≤ 600 KB each (OGG with an MP3 fallback), lazy-loaded with the world and never in the first load. Default volume 40%. Ducks under any read-aloud and sound effect. Pauses when the tab is hidden. Off in Calm mode. |
| **Source** | Composed for Bizzing, or royalty-free with the licence recorded in `music/CREDITS.md`. The source and licence of every track are named. |
| **Effects** | Right · wrong · finish · medal · coin · unlock, soft and short. |
| **Controls** | Settings §5: effects, music and one volume slider. A mute is reachable from ☰ in one tap. |
| **Narration** | **None new for now (owner's decision).** Bee and India keep theirs. Where narration exists, clips use the family narrator (`en-IN-Chirp3-HD-Laomedeia` 1.02, `hi-IN-Neural2-A` 0.88) and are measured on build (reject < −20 dB or < 0.35 s). |

## 12. Learning and feedback

- A right answer advances. A wrong answer holds and explains on the exact item.
- Rank and level move only with right answers or mastery, never with time, chance or coins.
- Mastery is evidence-based and spaced, re-checked after a gap. A miss drops one step and is reported, never hidden.
- Every question is generated and tested: one right answer, not leaked by the text, even answer slots.
- Facts carry `sources[]` or are derived from data. Nothing from memory.
- A **mistakes deck** comes back later, in every app (F3).

## 13. Motivation, medals, certificates

- **No streaks**, no "you'll lose…". Count good days in a window.
- **Medals are earned from evidence**, shown on a shelf with what earned them, and celebrated once, in the family medallion style.
- **Certificates.**
  - What triggers one: a world or level finished.
  - What it shows: the child's first name, avatar, mascot and what was mastered.
  - How it is shared: as a PNG made on the device, through the grown-ups area only.

## 14. Games

Every game has:
- a title card;
- a 3-second how-to;
- painted art in its world's style;
- motion and sound on every answer;
- music (§11);
- a finish screen showing what was practised and the child's best;
- keyboard **and** touch;
- a score built on the *learning decision*, never luck.

A game that teaches nothing is cut, not polished.

## 15. Grown-ups

- Behind a 4-digit PIN. The screen calls it a deterrent, not security. The PIN is stored hashed and re-asked after a reload.
- **Report card** in three measures (**Time · Progress · Mastery**) per child, plus "what to help with next". It uses the same format everywhere, so the Hive can merge them.
- **Pronoun-neutral**: the report uses the child's name, or "they".
- Controls: age band, daily targets, sound, read-aloud and world. Backup, restore and erase. Tester mode, which opens gates and never rewrites the child; no developer tabs visible to a child.
- No hard-coded pass codes in client code.

## 16. Onboarding, empty and error states

- **Onboarding**:
  1. the mascot says hello;
  2. first name, age band and avatar (a Common);
  3. the first question within 5 taps.
  - A "Try it first" sample comes before any profile is made.
- **Empty states** use the mascot (sleep pose), one sentence and one button. Never a blank panel.
- **Error states** use the mascot (oops pose), plain words and a retry. Never a stack trace, "[object Object]" or a `{placeholder}`. The browser check fails on any of those strings.

## 17. Profiles and privacy

- A household of children: first name, age band and avatar only.
- All storage goes behind the app's versioned `Store` seam.
- Nothing is transmitted except what the privacy page names. No analytics, no third-party scripts, no ads.

## 18. Performance and offline

- First screen ≤ **1.5 MB** transferred on a phone; initial JS ≤ **400 KB** gzipped.
- Art and data load per route; art is never inlined into JS. Music and world art are lazy.
- PWA: a service worker (hashed assets cache-first, pages network-first), a manifest with the §2 icons, and offline after the first visit.

## 19. Bizzing Hive integration

- Write `bizzing.activity` with `trackActivity(app, () => activeChild()?.name)`.
- Write `trackMilestone(app, who, ev, label)` on band, world, stop and mastery events.
- App ids: `bee`, `maths`, `geography`, `india`, `finance`.
- Coins go only through `bizzing-wallet.js`. Avatars and worlds go only through `bizzing-avatars.js`.
- Accept `#/continue` (opens the Continue target) and `?from=hive` (shows a "← back to my day" chip).
- The grown-ups page links to the Hive's grown-ups page.

## 20. Demo

`?demo` opens a labelled sample child with weeks of believable progress. It never touches a real household or the shared feeds.

## 21. Family glossary — the same words everywhere

| Say | Not |
|---|---|
| **Bizzing coins** | sikke, shells, gems, points (as currency) |
| **World** (a painted place and look) / **Atlas** (the map) | skin, realm |
| **Stop** (one step on a journey) / **Journey** | node, station (except inside a story) |
| **Continue** | Resume, Go |
| **Collection** (your avatars) / **Shop** | Hive (that is the scheduler), store, market |
| **Common · Rare · Epic · Legendary** | Starter, Mythic |
| **Medals** | badges, trophies |
| **Grown-ups** | Parents, Admin |
| **Family plan** | Pro, Premium, subscription (on any child-facing screen) |

## 22. Tests every app keeps

At minimum, the browser check asserts each of the following:
- back stays in the app;
- one primary button on home;
- ☰ opens and closes by keyboard;
- Settings sections are in the §5 order;
- the grown-ups area needs the PIN;
- no third-party requests;
- no overflow at 390px, measured against the device width;
- AA contrast in light and dark on every world;
- zero emoji in controls;
- no `[object Object]` or `{placeholder}`;
- the activity feed is written;
- coins are earned only from standard events;
- `validate(avatars)` returns `[]`.

**Prove each assertion by breaking it once.**

## 23. Benchmarks — copy the family first, then look outside

For every key element, **copy the in-family model first**: it already follows these rules, and the code is next door. Then look at the outside benchmark for polish. Where a famous product does something these rules forbid, it is listed under *Don't borrow*. "—" means no app reaches 4 yet; the outside benchmark leads.

| Id | Element | Copy from (Bizzing) | What exactly | Outside benchmark | Don't borrow |
|---|---|---|---|---|---|
| A1 | Landing/welcome clarity | **Bizzing Maths** (4) | Landing (01-landing-desk): koi mascot, headline 'Fast and fearless… why the trick works', 165/18/10/9 stats, privacy promises. Says 'ages 6… | Duolingo · Khan Academy Kids: A first lesson before sign-up; placement that starts as questions; one friendly character and one big button | Long sign-up forms; asking for a child's email or birthday |
| A3 | Time to first learning | **Bizzing Maths** (4) | Fresh child: Start, name+Next, band, face, theme, 'Start at Level 1', 'Start here' = 7 taps to the first stop; a seeded child reaches a… | Duolingo · Khan Academy Kids: A first lesson before sign-up; placement that starts as questions; one friendly character and one big button | Long sign-up forms; asking for a child's email or birthday |
| A4 | Profile setup minimal & fast | **Bizzing Maths** (4) | 4 one-question screens with Nova guide (02–05-ob-*): first name only, band 6–7/8–10/11–14, 5 starter faces, 2 themes. Fast, minimal data. | Duolingo · Khan Academy Kids: A first lesson before sign-up; placement that starts as questions; one friendly character and one big button | Long sign-up forms; asking for a child's email or birthday |
| A5 | Demo / try-before-signup | **Bizzing Maths** (4) | ?demo shows labelled sample child 'Asha' with three weeks of play; ?demo=try opens Column addition with 'nothing here is saved';… | Duolingo · Khan Academy Kids: A first lesson before sign-up; placement that starts as questions; one friendly character and one big button | Long sign-up forms; asking for a child's email or birthday |
| A8 | First-session "aha" | **Bizzing Maths** (4) | First stop: story beats, worked steps, 'Your turn' typed steps, 10-q drill; first pass triggers 'First star' medal ceremony with confetti… | Duolingo · Khan Academy Kids: A first lesson before sign-up; placement that starts as questions; one friendly character and one big button | Long sign-up forms; asking for a child's email or birthday |
| B1 | Home layout & hierarchy | **Bizzing Bee** (4) | Home (10-home-desk-light): greeting+avatar, daily goal rings, level, word of the hour, Continue card with painted plate, journey card, bee… | Duolingo (the path) · Bizzing Bee's own home (owner's template): One obvious next step everything else supports; a home that picks up exactly where the child left off | Hearts, gems, leagues and the streak flame on home |
| B2 | Exactly one primary Continue | **Bizzing Maths** (5) | Exactly one filled primary on Home: 'Continue →' (homePrimary=['Continue →']); goes straight to the next journey stop. | Duolingo (the path) · Bizzing Bee's own home (owner's template): One obvious next step everything else supports; a home that picks up exactly where the child left off | Hearts, gems, leagues and the streak flame on home |
| B3 | Progress visible on home | **Bizzing Maths** (4) | Today's ring (right answers 20/20, stops 1/1, puzzle 0/1), 'Station 2 of 16', progress tiles (goals, Atlas stars, tower). | Duolingo (the path) · Bizzing Bee's own home (owner's template): One obvious next step everything else supports; a home that picks up exactly where the child left off | Hearts, gems, leagues and the streak flame on home |
| B5 | Mascot / greeting personality | **Bizzing Maths** (4) | Child's own avatar greets with a contextual line ('Last time: twenty facts, 19 of 20 right'), Nova on onboarding, Aryabhata in ceremonies. | Duolingo (the path) · Bizzing Bee's own home (owner's template): One obvious next step everything else supports; a home that picks up exactly where the child left off | Hearts, gems, leagues and the streak flame on home |
| B7 | Phone home: Continue above the fold | **Bizzing Maths** (5) | Phone 390×844: Continue at ~470px, well above fold; bottom tab bar (plight-home). | Duolingo (the path) · Bizzing Bee's own home (owner's template): One obvious next step everything else supports; a home that picks up exactly where the child left off | Hearts, gems, leagues and the streak flame on home |
| B10 | Returning-child state | **Bizzing Maths** (4) | Returning Home names last activity ('You cleared floor 1 of the Puzzle Tower last time') and Continue goes to station 2 (d-20, d-62). | Duolingo (the path) · Bizzing Bee's own home (owner's template): One obvious next step everything else supports; a home that picks up exactly where the child left off | Hearts, gems, leagues and the streak flame on home |
| C1 | Tab model | **Bizzing Bee** (4) | Five tabs: Home · Word Atlas · Practice · Library · Play, bottom bar on phone. 'Practice' vs 'Atlas' vs Library concepts overlap. | Apple HIG tab bars · Khan Academy Kids profiles: ≤ 5 tabs, back always stays inside the app, one-tap child profiles, a search that finds any lesson | Hamburger menus hiding main areas |
| C2 | Back button & hash routing | **Bizzing Maths** (4) | Hash routing #/stop/place-value; back from arcade→library→home stays in app (w2). Bad hash #/nonsense falls back to landing-like page… | Apple HIG tab bars · Khan Academy Kids profiles: ≤ 5 tabs, back always stays inside the app, one-tap child profiles, a search that finds any lesson | Hamburger menus hiding main areas |
| C3 | Sibling switching | **Bizzing Maths** (4) | Avatar ▾ sheet lists both children, one tap to switch, add a child, sound and dark toggles (d-62). | Apple HIG tab bars · Khan Academy Kids profiles: ≤ 5 tabs, back always stays inside the app, one-tap child profiles, a search that finds any lesson | Hamburger menus hiding main areas |
| C4 | Search | **Bizzing Bee** (4) | Header 'Search any word…' gives live dictionary matches (rhythm, latin) and 'See all matches'; Word Finder searches 40k/128k. Search does… | Apple HIG tab bars · Khan Academy Kids profiles: ≤ 5 tabs, back always stays inside the app, one-tap child profiles, a search that finds any lesson | Hamburger menus hiding main areas |
| C5 | Dead ends & broken links found in the walkthrough | **Bizzing Maths** (4) | No dead ends in walkthrough; quibbles: Library/Vedic stones and Times-table stops stay locked in tester mode; overlays (sudoku) hide nav. | Apple HIG tab bars · Khan Academy Kids profiles: ≤ 5 tabs, back always stays inside the app, one-tap child profiles, a search that finds any lesson | Hamburger menus hiding main areas |
| D1 | Number of worlds/lands/levels | **Bizzing Maths** (5) | 18 painted worlds (165 stops) on 3 island maps, plus a 10-level Journey of 59 lands/236 steps, plus Puzzle Tower 12 floors and… | Prodigy (world map) · Toca Boca (world feel) · Monument Valley (art direction): Each world a distinct, alive place with its own palette and sound; the map shows where you are and what is next | Worlds that are only a background behind the same quiz |
| D3 | World art quality | **Bizzing Maths** (5) | 18 w-*.webp plates 1920×815 (z-world-plates): bakery, carnival, mine cross-section, observatory at night, Set Island Venn ponds — rich… | Prodigy (world map) · Toca Boca (world feel) · Monument Valley (art direction): Each world a distinct, alive place with its own palette and sound; the map shows where you are and what is next | Worlds that are only a background behind the same quiz |
| D4 | World art consistency | **Bizzing Maths** (5) | All plates share one warm painterly storybook style, matching home hero, atlas maps, game plates and medals. | Prodigy (world map) · Toca Boca (world feel) · Monument Valley (art direction): Each world a distinct, alive place with its own palette and sound; the map shows where you are and what is next | Worlds that are only a background behind the same quiz |
| D5 | World variety | **Bizzing Maths** (5) | Distinct identities: Deep Mine (negatives below ground), Set Island (Venn lagoons), Square Palace (tiles), Decimal Dock, Sutra Observatory. | Prodigy (world map) · Toca Boca (world feel) · Monument Valley (art direction): Each world a distinct, alive place with its own palette and sound; the map shows where you are and what is next | Worlds that are only a background behind the same quiz |
| D8 | World progression visible | **Bizzing Maths** (4) | Stars per stop, locks with level badges (🔒 L5), station counts 1/16, level chips 1–10 with locks (d-66, d-70). | Prodigy (world map) · Toca Boca (world feel) · Monument Valley (art direction): Each world a distinct, alive place with its own palette and sound; the map shows where you are and what is next | Worlds that are only a background behind the same quiz |
| D10 | World ambient life | — | — | Prodigy (world map) · Toca Boca (world feel) · Monument Valley (art direction): Each world a distinct, alive place with its own palette and sound; the map shows where you are and what is next | Worlds that are only a background behind the same quiz |
| E3 | Teaching the why | **Bizzing Maths** (5) | Learn tab: trick as numbered steps revealed one by one, 'Why it works' prose with figure, algebra in details (d-14). Your turn makes the… | Brilliant · DragonBox · Khan Academy: Interactive why before practice; varied item types; hints on the exact wrong item; mastery that is re-checked | Multiple-choice only; self-marked 'complete' |
| E5 | Answer feedback | **Bizzing Maths** (5) | Right auto-advances on the keystroke; wrong holds with 'Not this time. It is 20' + reason chip or the trick worked on that exact question… | Brilliant · DragonBox · Khan Academy: Interactive why before practice; varied item types; hints on the exact wrong item; mastery that is re-checked | Multiple-choice only; self-marked 'complete' |
| E6 | Hints & scaffolding | **Bizzing Maths** (4) | Guided 'Your turn' shows a step after two misses; 'Show me' in Make the Target; sudoku hints; tip to do Your turn first. | Brilliant · DragonBox · Khan Academy: Interactive why before practice; varied item types; hints on the exact wrong item; mastery that is re-checked | Multiple-choice only; self-marked 'complete' |
| E9 | Mastery from evidence | **Bizzing Maths** (4) | Stars from drill accuracy/pace; 32 goals measured from evidence; fluent decays; 'Slipped since fluent' in report. Stops never decay. | Brilliant · DragonBox · Khan Academy: Interactive why before practice; varied item types; hints on the exact wrong item; mastery that is re-checked | Multiple-choice only; self-marked 'complete' |
| E10 | Content accuracy & sourcing | **Bizzing Maths** (5) | Observatory intro cites Bharati Krishna Tirtha 1965 and Dani; journeys carry sources + needsReview; story notepad sums machine-checked. | Brilliant · DragonBox · Khan Academy: Interactive why before practice; varied item types; hints on the exact wrong item; mastery that is re-checked | Multiple-choice only; self-marked 'complete' |
| E11 | Question testing & answer-leak protection | **Bizzing Maths** (5) | npm test passes: ~57k trick questions ×3 routes, 4720 level questions, 5179 voice lines, puzzles proven unique; leak tests. | Brilliant · DragonBox · Khan Academy: Interactive why before practice; varied item types; hints on the exact wrong item; mastery that is re-checked | Multiple-choice only; self-marked 'complete' |
| F1 | Short daily session | **Bizzing Maths** (4) | Twenty facts '5 minutes' session ends with summary and 'Twenty more'; a stop drill is 10 questions. | Duolingo lessons · Anki: 3–5 minute sessions with a clean finish screen; a mistakes deck that comes back later | Daily-goal pressure and streak reminders |
| F3 | Mistake review | **Bizzing Bee** (4) | Misses 'Saved for revision', Revision pile, My traps radar, 'My missed words' list, Tricky review. | Duolingo lessons · Anki: 3–5 minute sessions with a clean finish screen; a mistakes deck that comes back later | Daily-goal pressure and streak reminders |
| F4 | Session end summary | **Bizzing Maths** (4) | Run end: stars, '8 of 10 right', station count, missed items, next-station button (d-18); games list what was practised. | Duolingo lessons · Anki: 3–5 minute sessions with a clean finish screen; a mistakes deck that comes back later | Daily-goal pressure and streak reminders |
| G2 | Average game quality | **Bizzing Maths** (4) | Each game has title card + how-to, painted plate, pop/wobble, combo meter, music loop, finish screen naming facts practised (d-31..41). | DragonBox · Prodigy (polish) · Toca Boca (feel): The learning is the mechanic; every action has motion and sound; levels and personal bests | Battles where learning is a toll gate; luck-based scoring |
| G4 | Learning IS the mechanic | **Bizzing Maths** (5) | Rush feeds the child's own facts and records them; Line is estimation; Target is arithmetic reasoning; Contest is fact/trick ladder. | DragonBox · Prodigy (polish) · Toca Boca (feel): The learning is the mechanic; every action has motion and sound; levels and personal bests | Battles where learning is a toll gate; luck-based scoring |
| G5 | Game art | **Bizzing Maths** (4) | Painted plates for Rush meadow, archery field, pier; bubbles are canvas gradients; Sudoku has no art (plain white overlay). | DragonBox · Prodigy (polish) · Toca Boca (feel): The learning is the mechanic; every action has motion and sound; levels and personal bests | Battles where learning is a toll gate; luck-based scoring |
| G6 | Game animation & juice | **Bizzing Bee** (4) | Combos (5x), stars, confetti, speed bonus, hearts, glitch effects. Quiz screens static. | DragonBox · Prodigy (polish) · Toca Boca (feel): The learning is the mechanic; every action has motion and sound; levels and personal bests | Battles where learning is a toll gate; luck-based scoring |
| G7 | Game sound | — | — | DragonBox · Prodigy (polish) · Toca Boca (feel): The learning is the mechanic; every action has motion and sound; levels and personal bests | Battles where learning is a toll gate; luck-based scoring |
| G10 | Keyboard AND touch in every game | **Bizzing Maths** (5) | Rush played by keyboard (desktop) and tapping on-screen pad (phone); Line by click/tap/arrows; Target by keys 1–4 and +−×÷ or taps. | DragonBox · Prodigy (polish) · Toca Boca (feel): The learning is the mechanic; every action has motion and sound; levels and personal bests | Battles where learning is a toll gate; luck-based scoring |
| G11 | Filler/useless games | **Bizzing Maths** (5) | No filler: every game practises a named skill and records evidence. | DragonBox · Prodigy (polish) · Toca Boca (feel): The learning is the mechanic; every action has motion and sound; levels and personal bests | Battles where learning is a toll gate; luck-based scoring |
| I4 | Mascot quality & presence across the app | **Bizzing Bee** (4) | Bizzy appears in logo, lessons, arcade, Bizzillionaire lifeline, home tip. Speaking only in explainers. | Epic · Khan Academy Kids characters: Illustrated, read-aloud stories; a cast that appears everywhere | Stories as walls of text |
| J1 | Avatar count | **Bizzing Bee** (4) | 142 in the Hive collection (18 packs ×8 plus champions), 20 starters; 150 defined in avatars.js. | Pokémon-style collections done ethically · Apple Memoji (customisation): Rare tiers with the unlock printed on the card; outfits and frames; a showcase page | Gacha, packs, random drops, pay-for-a-chance |
| J2 | Avatar art quality | **Bizzing Bee** (4) | Chibi sticker art, consistent, readable at 44px (40-avatars-desk). Includes Hindu deities (Shiva, Krishna, Ganesha, Durga…) and real 1920s… | Pokémon-style collections done ethically · Apple Memoji (customisation): Rare tiers with the unlock printed on the card; outfits and frames; a showcase page | Gacha, packs, random drops, pay-for-a-chance |
| J4 | Rare/collectible tiers present | **Bizzing India** (4) | IND_RARITY: Starter/Rare/Epic/Legendary (10/18/26/24); sacred figures flat, real people 40 coins. | Pokémon-style collections done ethically · Apple Memoji (customisation): Rare tiers with the unlock printed on the card; outfits and frames; a showcase page | Gacha, packs, random drops, pay-for-a-chance |
| J5 | Unlock path stated on every avatar | **Bizzing India** (4) | Card prices (🪙40) shown; gods free; "How meeting someone works" explains price and that rare cards name the learning. | Pokémon-style collections done ethically · Apple Memoji (customisation): Rare tiers with the unlock printed on the card; outfits and frames; a showcase page | Gacha, packs, random drops, pay-for-a-chance |
| J6 | Avatar shown across the app | **Bizzing Maths** (4) | Avatar on Home greeting, top bar, contest field/podium, ceremony, report card; frame shows in top bar. | Pokémon-style collections done ethically · Apple Memoji (customisation): Rare tiers with the unlock printed on the card; outfits and frames; a showcase page | Gacha, packs, random drops, pay-for-a-chance |
| J7 | Showcase / trading-card / profile page | **Bizzing India** (4) | avcard pages: lore, ITIHAAS evidence, quote with source (w-avcard-gandhi); Me page shelf. | Pokémon-style collections done ethically · Apple Memoji (customisation): Rare tiers with the unlock printed on the card; outfits and frames; a showcase page | Gacha, packs, random drops, pay-for-a-chance |
| K1 | Currency present | **Bizzing Maths** (4) | Bizzing coins 🪙 via family wallet: 1 per practice answer, 5 per stop (ledger in bizzing.wallet). | Khan Academy energy points · Club Penguin-style fixed-price shops: Coins earned only by learning, spent on fixed-price cosmetics, rare avatars, game skins and unlocks worth saving for | Coins sold for real money; loot boxes; content locked behind coins |
| K2 | Earned only for learning | **Bizzing Maths** (5) | Coins only for right answers/passed stops/tests; daily cap in wallet; never touch xp. | Khan Academy energy points · Club Penguin-style fixed-price shops: Coins earned only by learning, spent on fixed-price cosmetics, rare avatars, game skins and unlocks worth saving for | Coins sold for real money; loot boxes; content locked behind coins |
| K3 | A shop exists | **Bizzing Geography** (4) | Map shop on Me page (crop-shop) with printed prices. | Khan Academy energy points · Club Penguin-style fixed-price shops: Coins earned only by learning, spent on fixed-price cosmetics, rare avatars, game skins and unlocks worth saving for | Coins sold for real money; loot boxes; content locked behind coins |
| K4 | Shop variety | — | — | Khan Academy energy points · Club Penguin-style fixed-price shops: Coins earned only by learning, spent on fixed-price cosmetics, rare avatars, game skins and unlocks worth saving for | Coins sold for real money; loot boxes; content locked behind coins |
| K5 | Rare avatars obtainable with coins and/or milestones | **Bizzing India** (4) | Real-people cards bought with coins; rarity prices 120/250/500; mastery chips "MASTERED" on Akbar's Darbar. | Khan Academy energy points · Club Penguin-style fixed-price shops: Coins earned only by learning, spent on fixed-price cosmetics, rare avatars, game skins and unlocks worth saving for | Coins sold for real money; loot boxes; content locked behind coins |
| K7 | Prices visible and fixed | **Bizzing Maths** (5) | Fixed printed prices 20–120; bought Graph paper for 20, balance 31→11. | Khan Academy energy points · Club Penguin-style fixed-price shops: Coins earned only by learning, spent on fixed-price cosmetics, rare avatars, game skins and unlocks worth saving for | Coins sold for real money; loot boxes; content locked behind coins |
| K8 | No random rewards / gacha / pay-to-win | **Bizzing Maths** (5) | No randomness, packs or pay-to-win; shop.js states it. | Khan Academy energy points · Club Penguin-style fixed-price shops: Coins earned only by learning, spent on fixed-price cosmetics, rare avatars, game skins and unlocks worth saving for | Coins sold for real money; loot boxes; content locked behind coins |
| K9 | Wallet & coin history visible to the child | **Bizzing Finance** (4) | Wallet: every movement dated, printable statement; jars, bank vault, net worth on Progress. | Khan Academy energy points · Club Penguin-style fixed-price shops: Coins earned only by learning, spent on fixed-price cosmetics, rare avatars, game skins and unlocks worth saving for | Coins sold for real money; loot boxes; content locked behind coins |
| K10 | Economy balance | — | — | Khan Academy energy points · Club Penguin-style fixed-price shops: Coins earned only by learning, spent on fixed-price cosmetics, rare avatars, game skins and unlocks worth saving for | Coins sold for real money; loot boxes; content locked behind coins |
| L1 | Medals/badges from evidence | **Bizzing Maths** (4) | 12 medals computed from evidence with progress bars (Fourth floor 1 of 4, Puzzler 6 of 30) (d-61). | Khan Academy badges · Apple Fitness awards: Evidence badges with beautiful art, a level-up ceremony, certificates to share with family | Streak badges; leaderboards comparing children |
| L3 | Celebration moments | **Bizzing Maths** (4) | Medal ceremony with child's face, Aryabhata, confetti, sound (d-18); confetti on stop passes; game finish cards. | Khan Academy badges · Apple Fitness awards: Evidence badges with beautiful art, a level-up ceremony, certificates to share with family | Streak badges; leaderboards comparing children |
| L5 | No streak pressure | **Bizzing Maths** (5) | 'Nothing expires. A day off costs nothing.' on Home; no streaks. | Khan Academy badges · Apple Fitness awards: Evidence badges with beautiful art, a level-up ceremony, certificates to share with family | Streak badges; leaderboards comparing children |
| L6 | Positive tone on mistakes | **Bizzing Maths** (5) | 'Not this time. It is 20.' with the reason; 'The bubbles won that one'; lapses called normal. | Khan Academy badges · Apple Fitness awards: Evidence badges with beautiful art, a level-up ceremony, certificates to share with family | Streak badges; leaderboards comparing children |
| M3 | Sound effects | — | — | Khan Academy Kids · Epic Read-to-me: Every instruction read aloud for pre-readers in a warm recorded voice; soft sounds and a mute | Robotic device speech; loud reward jingles |
| M4 | Music | — | — | Khan Academy Kids · Epic Read-to-me: Every instruction read aloud for pre-readers in a warm recorded voice; soft sounds and a mute | Robotic device speech; loud reward jingles |
| M5 | Mute/volume controls | — | — | Khan Academy Kids · Epic Read-to-me: Every instruction read aloud for pre-readers in a warm recorded voice; soft sounds and a mute | Robotic device speech; loud reward jingles |
| N1 | Overall visual polish | **Bizzing Maths** (4) | Consistent cards, painted art, clean typography across 160+ screenshots; small blemishes. | Toca Boca · Khan Academy Kids · Duolingo (illustration system): One art direction everywhere; a real SVG icon set (not emoji); self-hosted display + body fonts; meaningful motion | Emoji as UI icons; mixed icon styles; system fonts |
| N2 | Art-direction consistency across all screens | **Bizzing Maths** (4) | Painted storybook art throughout Atlas/Library/Arcade/medals; tools and grown-ups are plain UI. | Toca Boca · Khan Academy Kids · Duolingo (illustration system): One art direction everywhere; a real SVG icon set (not emoji); self-hosted display + body fonts; meaningful motion | Emoji as UI icons; mixed icon styles; system fonts |
| N4 | Iconography system: SVG vs emoji vs raster | **Bizzing India** (4) | Nav/UI icons inline SVG (12-24 per screen); emoji mainly as content (🪙, 🙏 Greetings, 🗺⛰ map toggle, 🪔 badges). Raster only for art. | Toca Boca · Khan Academy Kids · Duolingo (illustration system): One art direction everywhere; a real SVG icon set (not emoji); self-hosted display + body fonts; meaningful motion | Emoji as UI icons; mixed icon styles; system fonts |
| N5 | Icon quality & legibility | **Bizzing Bee** (4) | SVG icon set consistent stroke weight (nav, top bar); iconSVG grid-fallback trap documented; emoji vary by platform. | Toca Boca · Khan Academy Kids · Duolingo (illustration system): One art direction everywhere; a real SVG icon set (not emoji); self-hosted display + body fonts; meaningful motion | Emoji as UI icons; mixed icon styles; system fonts |
| N6 | Font quality: faces used, self-hosted, display/body pairing, weights loaded | **Bizzing Bee** (5) | document.fonts: Fraunces 400–900 display, Hanken Grotesk 100–900 body, Sono mono; all self-hosted woff2 in fonts/. | Toca Boca · Khan Academy Kids · Duolingo (illustration system): One art direction everywhere; a real SVG icon set (not emoji); self-hosted display + body fonts; meaningful motion | Emoji as UI icons; mixed icon styles; system fonts |
| N12 | Visual bugs found | — | — | Toca Boca · Khan Academy Kids · Duolingo (illustration system): One art direction everywhere; a real SVG icon set (not emoji); self-hosted display + body fonts; meaningful motion | Emoji as UI icons; mixed icon styles; system fonts |
| O3 | Night/dark mode present | **Bizzing Maths** (5) | Dark mode follows system, toggle in sheet; all screens checked (pdark-*). | Apple's dark-mode guidance · Duolingo night: Each theme designed, not recoloured; art dimmed for night; follows the device setting | White flashes; pastel cards with light text at night |
| O4 | Night mode quality | **Bizzing India** (4) | Night dims frieze, warm dark cards, accent buttons with dark text (n-home-d, n-game-gyanpati-d). Night map dark and low contrast. | Apple's dark-mode guidance · Duolingo night: Each theme designed, not recoloured; art dimmed for night; follows the device setting | White flashes; pastel cards with light text at night |
| P1 | Phone layout: no overflow at 390 px | **Bizzing Bee** (5) | scrollWidth = 390 on every phone screen swept (11 screens). | Apple HIG · WCAG 2.2 AA: 44 pt targets, bottom tabs, contrast and focus as tested rules | Fixed desktop layouts squeezed onto phones |
| P2 | Thumb reach & bottom tab bar | **Bizzing Maths** (4) | Bottom tab bar on phone, Continue mid-screen, keypad at bottom of runs. | Apple HIG · WCAG 2.2 AA: 44 pt targets, bottom tabs, contrast and focus as tested rules | Fixed desktop layouts squeezed onto phones |
| P3 | Touch target sizes | — | — | Apple HIG · WCAG 2.2 AA: 44 pt targets, bottom tabs, contrast and focus as tested rules | Fixed desktop layouts squeezed onto phones |
| P4 | Contrast in light and dark | **Bizzing Maths** (5) | test/themes: 108 pairs pass AA across 6 themes × 2 modes. | Apple HIG · WCAG 2.2 AA: 44 pt targets, bottom tabs, contrast and focus as tested rules | Fixed desktop layouts squeezed onto phones |
| P5 | Keyboard navigation & visible focus | **Bizzing Maths** (4) | Skip link, Tab reaches tabs with visible 3px focus ring (box-shadow), keyboard everywhere incl. games. | Apple HIG · WCAG 2.2 AA: 44 pt targets, bottom tabs, contrast and focus as tested rules | Fixed desktop layouts squeezed onto phones |
| P6 | Screen-reader labels & reduced motion | **Bizzing Maths** (4) | No unnamed buttons or alt-less images; aria-live on answers; reduced motion stops motif (animation none) and calms game pops. | Apple HIG · WCAG 2.2 AA: 44 pt targets, bottom tabs, contrast and focus as tested rules | Fixed desktop layouts squeezed onto phones |
| Q1 | Grown-ups area behind a PIN | **Bizzing Maths** (4) | PIN keypad gate, labelled 'a deterrent, not a lock' (d-50). | IXL Analytics · Apple Screen Time weekly report: Skill-level diagnosis and a short weekly digest behind a PIN | Minutes shown as achievement; dev buttons a child can reach |
| Q2 | Report card quality | **Bizzing Maths** (4) | Per child: Time/Progress/Mastery with 6-week bars, strand bars, tricks mastered, traps, lapses, 32 goals (d-51). | IXL Analytics · Apple Screen Time weekly report: Skill-level diagnosis and a short weekly digest behind a PIN | Minutes shown as achievement; dev buttons a child can reach |
| Q3 | Reports learning, not just usage | **Bizzing Maths** (5) | Reports fluent facts, stops mastered, goals by strand, traps and lapses — learning, not usage. | IXL Analytics · Apple Screen Time weekly report: Skill-level diagnosis and a short weekly digest behind a PIN | Minutes shown as achievement; dev buttons a child can reach |
| Q4 | Controls | **Bizzing Bee** (4) | Age band, three daily targets, bee-day milestone date, text size, contrast, reduce motion, sound, voice speed, read-aloud. | IXL Analytics · Apple Screen Time weekly report: Skill-level diagnosis and a short weekly digest behind a PIN | Minutes shown as achievement; dev buttons a child can reach |
| Q5 | Data export / erase | **Bizzing Bee** (5) | Parent zone: Download a backup, Restore from a file, Erase everything — each re-asks the PIN. | IXL Analytics · Apple Screen Time weekly report: Skill-level diagnosis and a short weekly digest behind a PIN | Minutes shown as achievement; dev buttons a child can reach |
| Q6 | Multiple children managed | **Bizzing Maths** (4) | Two children in report and sheet, switch, add, delete; per-child data separate. | IXL Analytics · Apple Screen Time weekly report: Skill-level diagnosis and a short weekly digest behind a PIN | Minutes shown as achievement; dev buttons a child can reach |
| Q7 | Tester/dev controls hidden from the child | **Bizzing Maths** (4) | Tester mode only inside PIN area; red banner 'TESTER MODE' with Turn off visible to child once on. | IXL Analytics · Apple Screen Time weekly report: Skill-level diagnosis and a short weekly digest behind a PIN | Minutes shown as achievement; dev buttons a child can reach |
| R1 | Offline / PWA installable | **Bizzing Bee** (5) | manifest.json + sw.js registered (navigator.serviceWorker registration found); offline-pwa test. | web.dev performance budgets · Google PWA checklist: A written budget enforced in the build; offline after first visit | Shipping every data file at boot |
| R2 | First-load weight | **Bizzing Finance** (4) | First load ~760KB raw: index.js 597KB (199KB gz), CSS 61KB, 2 fonts; lessons lazy chunks. | web.dev performance budgets · Google PWA checklist: A written budget enforced in the build; offline after first visit | Shipping every data file at boot |
| R4 | Console errors during the walkthrough | **Bizzing Maths** (5) | 0 page errors, 0 console errors across all walks. | web.dev performance budgets · Google PWA checklist: A written budget enforced in the build; offline after first visit | Shipping every data file at boot |
| R5 | Automated tests & browser checks | **Bizzing Maths** (5) | 19 test files: tricks, facts, contest, games, model, stories, puzzles, objectives, library, levels, journey, themes, family, voice + 3… | web.dev performance budgets · Google PWA checklist: A written budget enforced in the build; offline after first visit | Shipping every data file at boot |
| R6 | Storage seam & versioned migrations | **Bizzing Maths** (5) | store.js versioned migrate (v6), only storage module, Family wrapper for shared keys. | web.dev performance budgets · Google PWA checklist: A written budget enforced in the build; offline after first visit | Shipping every data file at boot |
| R7 | Security | **Bizzing Maths** (4) | No secrets or accounts in client; PIN stored locally in plain text (documented as deterrent). | web.dev performance budgets · Google PWA checklist: A written budget enforced in the build; offline after first visit | Shipping every data file at boot |
| S1 | Child data minimal | **Bizzing Maths** (5) | First name, age band, avatar only; wallet/activity keyed by first name. | Apple Kids category · kidSAFE: No ads, no tracking, data minimal by design, a privacy page that is true | Third-party scripts on a child's screen |
| S2 | No third-party requests | **Bizzing Maths** (5) | 0 external requests recorded across all walks; fonts self-hosted. | Apple Kids category · kidSAFE: No ads, no tracking, data minimal by design, a privacy page that is true | Third-party scripts on a child's screen |
| S3 | Privacy page accurate | **Bizzing Maths** (5) | Privacy page matches behaviour: local storage, device voice, the two shared keys, ?demo in memory (d-64). | Apple Kids category · kidSAFE: No ads, no tracking, data minimal by design, a privacy page that is true | Third-party scripts on a child's screen |
| S4 | Sensitive content handled | **Bizzing Maths** (5) | Vedic origin told honestly with sources; Aryabhata and Brahmagupta facts dated; money stops neutral. | Apple Kids category · kidSAFE: No ads, no tracking, data minimal by design, a privacy page that is true | Third-party scripts on a child's screen |
| T3 | Paywall never on the child's screen | **Bizzing Maths** (5) | No paywall anywhere; nothing on child screens. | Apple Family Sharing · Google Workspace app switcher: One family account every app recognises; the same top bar in every app; share cards for milestones | Paywalls on the child's screen |
| T5 | Bizzing Hive feed written | **Bizzing Maths** (4) | bizzing.wallet written (ledger seen); bizzing.activity writer wired (minute-based) with milestones; family tests pass. | Apple Family Sharing · Google Workspace app switcher: One family account every app recognises; the same top bar in every app; share cards for milestones | Paywalls on the child's screen |
| T6 | Deep links accepted | **Bizzing Maths** (4) | #/continue routes to Continue target; ?from=hive shows 'back to my day' (code + family-ui test). | Apple Family Sharing · Google Workspace app switcher: One family account every app recognises; the same top bar in every app; share cards for milestones | Paywalls on the child's screen |
| T7 | Family top bar / brand layer | **Bizzing Bee** (4) | 56px family top bar: ⬡ Hive · ☰ · logo · search · coins · theme · 🔒 · avatar ▾. | Apple Family Sharing · Google Workspace app switcher: One family account every app recognises; the same top bar in every app; share cards for milestones | Paywalls on the child's screen |
| T9 | Shareability | — | — | Apple Family Sharing · Google Workspace app switcher: One family account every app recognises; the same top bar in every app; share cards for milestones | Paywalls on the child's screen |

## The key elements (minimum 4 each, where the element applies to the app)

| Area | Elements |
|---|---|
| First impression | A1 Landing/welcome clarity · A3 Time to first learning · A4 Profile setup minimal & fast · A5 Demo / try-before-signup · A8 First-session "aha" |
| Home | B1 Home layout & hierarchy · B2 Exactly one primary Continue · B3 Progress visible on home · B5 Mascot / greeting personality · B7 Phone home: Continue above the fold · B10 Returning-child state |
| Navigation | C1 Tab model · C2 Back button & hash routing · C3 Sibling switching · C4 Search · C5 Dead ends & broken links found in the walkthrough |
| Worlds | D1 Number of worlds/lands/levels · D3 World art quality · D4 World art consistency · D5 World variety · D8 World progression visible · D10 World ambient life |
| Learning | E3 Teaching the why · E5 Answer feedback · E6 Hints & scaffolding · E9 Mastery from evidence · E10 Content accuracy & sourcing · E11 Question testing & answer-leak protection |
| Practice | F1 Short daily session · F3 Mistake review · F4 Session end summary |
| Games | G2 Average game quality · G4 Learning IS the mechanic · G5 Game art · G6 Game animation & juice · G7 Game sound · G10 Keyboard AND touch in every game · G11 Filler/useless games |
| Mascot | I4 Mascot quality & presence across the app |
| Avatars | J1 Avatar count · J2 Avatar art quality · J4 Rare/collectible tiers present · J5 Unlock path stated on every avatar · J6 Avatar shown across the app · J7 Showcase / trading-card / profile page |
| Economy | K1 Currency present · K2 Earned only for learning · K3 A shop exists · K4 Shop variety · K5 Rare avatars obtainable with coins and/or milestones · K7 Prices visible and fixed · K8 No random rewards / gacha / pay-to-win · K9 Wallet & coin history visible to the child · K10 Economy balance |
| Rewards | L1 Medals/badges from evidence · L3 Celebration moments · L5 No streak pressure · L6 Positive tone on mistakes |
| Audio | M3 Sound effects · M4 Music · M5 Mute/volume controls |
| Look | N1 Overall visual polish · N2 Art-direction consistency across all screens · N4 Iconography system: SVG vs emoji vs raster · N5 Icon quality & legibility · N6 Font quality: faces used, self-hosted, display/body pairing, weights loaded · N12 Visual bugs found |
| Night | O3 Night/dark mode present · O4 Night mode quality |
| Phone & access | P1 Phone layout: no overflow at 390 px · P2 Thumb reach & bottom tab bar · P3 Touch target sizes · P4 Contrast in light and dark · P5 Keyboard navigation & visible focus · P6 Screen-reader labels & reduced motion |
| Grown-ups | Q1 Grown-ups area behind a PIN · Q2 Report card quality · Q3 Reports learning, not just usage · Q4 Controls · Q5 Data export / erase · Q6 Multiple children managed · Q7 Tester/dev controls hidden from the child |
| Platform | R1 Offline / PWA installable · R2 First-load weight · R4 Console errors during the walkthrough · R5 Automated tests & browser checks · R6 Storage seam & versioned migrations · R7 Security |
| Privacy | S1 Child data minimal · S2 No third-party requests · S3 Privacy page accurate · S4 Sensitive content handled |
| Family | T3 Paywall never on the child's screen · T5 Bizzing Hive feed written · T6 Deep links accepted · T7 Family top bar / brand layer · T9 Shareability |

These are not in an app's own chat: **T1 entitlements, T2 pricing in product, T4 free vs paid clarity, T8 marketing pages**. They come with the shared family server and billing, which is built once. Narration (M1, M2, M6) is paused by the owner's decision; Bee and India keep what they have.

### Scores today on the key elements (v2 audit)

| App | Average (152) | Key elements below 4 |
|---|---|---|
| Bizzing Bee | 3.52 | 35 of 97 |
| Bizzing Maths | 3.74 | 27 of 97 |
| Bizzing Geography | 3.36 | 33 of 97 |
| Bizzing India | 3.59 | 35 of 97 |
| Bizzing Finance | 3.27 | 41 of 97 |
