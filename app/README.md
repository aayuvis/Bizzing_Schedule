# Bizzing Schedule — the app

Vanilla ES modules + Vite, `state → render()` + `data-act` dispatch (the family idiom), offline PWA.

```bash
npm install
npm run dev                      # http://localhost:8090  (add ?demo for the sample family)
npm test                         # engine
npm run build && npm run check   # the built app in Chromium, desktop + phone, at /bizzingindia.com/schedule/
./deploy.sh                      # publish (see ../docs/03-publishing.md)
```

`?now=2026-09-23T17:10` pins the clock — for tests, screenshots and demos at a chosen hour.

## Module map

| file | owns |
|---|---|
| `src/store.js` | **The seam.** The only module that touches storage. Versioned migrations. |
| `src/model.js` | Household, routines, day blocks, `status` (how we know a block was kept), `dayScore`, `weekStats`, `catMinutes`, history, breathing room, clashes, find-a-time, tasks, goals & KRs, kudos, focus, Bizzy's lines. **Views never compute; they call this.** |
| `src/badges.js` | Twelve medals, each computed from evidence; `award` records and returns new ones once. |
| `src/activity.js` | Reads the Bizzing apps' shared minutes feed (`bizzing.activity`). Never writes it. |
| `src/parse.js` | Quick-add in plain words → routine / one-off / task. |
| `src/time.js` · `src/cats.js` | Dates as `YYYY-MM-DD`, minutes after midnight, Mon = 0. The nine kinds of time and their colours. |
| `src/demo.js` | The sample family (fixed seed) and the starter week for a real child. |
| `src/ui.js` | Pure markup helpers: rings, hexes, donut, sparkline, icons. |
| `src/views/*.js` | One screen each: `today`, `board`, `week`, `goals`, `hive`, `grown`, and `modals` (every sheet, plus onboarding). |
| `src/main.js` | State, render, the one click/submit dispatcher, board drag, keyboard, focus timer, nudges. |
| `sw.js` | Offline: hashed assets cache-first, everything else network-first. |

## Known gaps

- **Sync between devices** needs a server (the family's launch blocker). The Store seam is ready.
- **Nudges fire only while the app is open** on the web; the iPhone build fixes that (docs/01).
- **Sibling apps don't write the feed yet** — until they do, Bizzing minutes show only in the demo.
- **No dark mode** yet; tokens are in `:root` so it is one block of CSS.
