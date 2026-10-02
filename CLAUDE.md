# CLAUDE.md — Bizzing Schedule

Read this first, then [CONCEPT.md](CONCEPT.md), then [app/README.md](app/README.md).

## What this is

**Bizzing Schedule** — a day planner, task board and goal tracker for busy, high-performing kids
6–14, with a grown-ups' page that gives peace of mind without making the parent the scheduler.
Fifth app in the Bizzing family (Bee, India, Finance, Maths).

**Live:** <https://aayuvis.github.io/Bizzing_Schedule/> — its own
GitHub Pages site, published from this repo's `gh-pages` branch ([docs/03-publishing.md](docs/03-publishing.md)).

## Working style (the user's pace)

Inherited from the family, and it holds here:

- **Work autonomously.** Stop only for a real fork, a destructive or outward-facing action, or
  missing information you genuinely can't infer.
- **Multitask.** Background long jobs; make independent edits and searches in parallel.
- **Bias to action, then verify.** `npm test` and `npm run check` rather than asking.
- **Batch and ship.** Group related edits into one commit with a clear message.

## Hard rules

### Schedule (the ones specific to this app)

1. **One tap, never an essay.** Nothing a child does here should take more than a tap unless they
   chose to type. If a feature needs the child to report, ask first whether an app, an anchor or
   the plan itself could know instead.
2. **Adherence is measured from evidence** (`src/model.js` `status`): the child's tap, a Bizzing
   app's report, or a grown-up's "counts itself" anchor — and the screen says which. Time spent
   in *this* app counts for nothing.
3. **A block that has not ended is never a miss.** A routine added today is not a miss yesterday
   (`from`); a routine retired keeps its history (`until`), and changing a routine's time after it
   has history retires and replaces it. Never rewrite last week's numbers.
4. **Bizzing minutes come only from the Bizzing apps.** Self-reported time can never add to them
   (`test/model.mjs`). Schedule **reads** `bizzing.activity` and **never writes** it (`test/ui.mjs`).
   The demo keeps its sample feed inside the demo household.
5. **No streaks, no shame, no loot.** Count good days in a window, never a run. The mascot never
   mentions a skip. Praise names the effort, never the child, never a comparison. Medals are
   computed from evidence (`src/badges.js`) and celebrated once. No currency.
6. **Grown-ups set anchors; children arrange the rest.** A 🔒 fixed time can be checked in by the
   child but not moved or deleted. Do not add parental controls beyond that without asking — the
   product promise is peace of mind *without* control.
7. **Nudges are gentle by construction.** Five minutes before a plan (never school), one evening
   wrap-up, nothing 21:30–06:00, never "you missed".

### Product & code (inherited from the family, non-negotiable)

- **Every interaction works by keyboard AND touch.** Board cards: drag, tap arrows, ← →.
- **Child data is minimal by construction**: first name, age band, avatar. Never a birthdate,
  surname, school, photo or location. Nothing is transmitted — no accounts, analytics, ads or
  third-party requests (fonts are bundled; `test/ui.mjs` fails on any third-party request).
- **All storage behind the `Store` seam** (`src/store.js`), versioned — add a `vN_to_vN+1` step,
  never edit an old one.
- **State is a household**, not a child. A second child never inherits the first's anything.
- **Offline-first.** `sw.js`: hashed assets cache-first, everything else network-first.
- **The PIN is a deterrent, not security**, and the screen says so.
- **Never** put a real model identifier in commits, PRs, code, or any pushed artefact.

### Look

- **Three themes, as pills in the top bar** — 🍯 Honey, 🌊 Ocean, 🌙 Night. A device preference
  (`Store.saveDevice('theme')`), never household data. Colours are tokens on `:root`; a new surface
  uses `var(--card)`/`var(--bg)`, never a literal white, or Night breaks. `npm run check` audits the
  contrast of every word on Today at night.
- **Icons are emoji from `src/icons.js`.** Typing a title suggests one; the picker overrides it and
  then typing stops changing it. Match whole words or word starts only (never substrings), and
  generic words ("homework", "practice") count for less than the subject.

### Art

- `tools/art/gen.py` paints places and medallions only — **no lettering, no digits, no people**.
  Everything structural (timeline, comb, rings, numbers) is drawn by the app.
- The Gemini key lives at `/root/.gkey` (mode 600, `GKEY_FILE` overrides). Never in the repo.
- Raw paintings go to `tools/art/raw/` (gitignored); **look at them**, then `tools/art/process.py`.
- Avatars are the family's (the Bee's set, as Maths uses them).

## Verify

```bash
cd app && npm install
npm test                         # engine: parser, adherence, goals, medals, household
npm run build && npm run check   # the BUILT app in Chromium at its real sub-path, desktop + phone
```

**Prove an assertion by breaking it.** The overflow check was blind on phones until it was
broken on purpose (Chromium widens `innerWidth` to fit overflow under mobile emulation). An
assertion that has never failed has not been shown to work.

## Ship

Commit first, then `cd app && ./deploy.sh`. It publishes `app/build` to this repo's `gh-pages`
and touches no other repo. (It briefly lived in Bizzing India's gh-pages under `schedule/`; India's
deploy rebuilds its site wholesale from its own `app/`, so it was wiped on every India deploy.
Separate repos, separate sites.)

## Where to pick up

1. **Wire the shared layer into the siblings** — `integration/bizzing-activity.js`, `bizzing-wallet.js`
   and `bizzing-avatars.js`/`.css` (one engine: 96 avatars, tiers, worlds, night glow), per
   docs/family/FAMILY-STANDARD.md v2 and the five FIX briefs. The apps' own chats do the work.
2. **Watch real children use it** before tuning any wording (CONCEPT §8).
3. **Capacitor iPhone build** with local notifications (docs/01).

## Branch

Development happens on `claude/amazing-knuth-4aemgz` unless told otherwise.

## Commit trailer

```
Co-Authored-By: Claude <noreply@anthropic.com>
```
