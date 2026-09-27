# The Bizzing activity contract

How Bizzing Schedule knows a child spent 18 minutes on Bizzing Bee **without asking them**.

## Why it works at all

Every Bizzing app is published under one origin — `aayuvis.github.io` — so they share
`localStorage`. One app writes; Schedule reads. No server, no account, no network call.

| app | live at |
|---|---|
| Bizzing Schedule | `aayuvis.github.io/Bizzing_Schedule/` |
| Bizzing India | `aayuvis.github.io/bizzingindia.com/` |
| Bizzing Maths | `aayuvis.github.io/Bizzing-Maths/` |
| Bizzing Finance | `aayuvis.github.io/bizzingfinance/` |
| Bizzing Bee | wherever it is published under `aayuvis.github.io` |

If any app moves to its own domain, this stops working for that app. That is the moment to
move the feed to the server that Finance and India already list as a launch blocker.

## The record

```js
localStorage['bizzing.activity'] = {
  v: 1,
  s: [ { a: 'bee', d: '2026-09-27', t: 1020, m: 18, who: 'Anaya' } ]
}
```

| field | meaning |
|---|---|
| `a` | app id: `bee` · `maths` · `india` · `finance` |
| `d` | local date the session started, `YYYY-MM-DD` |
| `t` | start, minutes after local midnight |
| `m` | **active** minutes (tab visible *and* touched in the last two minutes) |
| `who` | the child's first name as that app knows it — optional |

Rules the writer keeps (`integration/bizzing-activity.js`):

- **Active, not open.** A tab left open beside the TV is not practice.
- **Whole minutes only**, appended to the current session; a new session after 5 idle minutes.
- **Trimmed** to 120 days and 4,000 entries.
- **Never transmitted.** There is no network code in the file, and review should keep it so.

## How Schedule uses it

- A routine can be **counted by an app** (`routine.app = 'bee'`). It turns *done* at 60% of its
  planned minutes, *partly* if there were some minutes, and the child is never asked.
- The Bizzing slice of every balance chart is **only** the apps' own report. Self-reported
  "also did" time can never add Bizzing minutes (`test/model.mjs` checks it).
- A goal's measure can be "minutes in Bizzing Bee per week" — progress moves by itself.
- **Attribution by first name**, case-insensitive. A record without `who` belongs to the only
  child if there is one, and to nobody otherwise — the grown-ups' page shows it as unassigned
  rather than guessing.
- Schedule **never writes** this key (`test/ui.mjs` checks it); the demo family keeps its own
  sample feed inside the demo household.

## Wiring a sibling app (not yet done)

One import and one call, once the app knows who is playing:

```js
import { trackActivity } from './bizzing-activity.js';
trackActivity('maths', () => activeChild()?.name);
```

Copy the file rather than importing across repos — the same way each app vendors its own
`store.js` — and keep the contract version (`v: 1`) in step. Then add a line to that app's
privacy page: *"Minutes played are kept on this device so Bizzing Schedule can show them."*
