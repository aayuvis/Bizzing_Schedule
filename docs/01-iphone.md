# From web app to iPhone app

## Now: an installable PWA

`aayuvis.github.io/bizzingindia.com/schedule/` → Share → **Add to Home Screen**. It runs
full-screen, works offline (service worker), and shows nudges **while it is open**. Web push on
iOS (16.4+) needs a push server; there isn't one, and a child's planner should not need one.

## Next: the same code in a native shell

| step | what | why |
|---|---|---|
| 1 | Wrap `app/build` with **Capacitor** (iOS target) | one codebase; the web app stays the product |
| 2 | `@capacitor/local-notifications` — schedule the day's nudges when the plan changes | nudges fire with the app closed; no server; nothing leaves the device |
| 3 | A **WidgetKit** widget: *Now / Next* and today's honey cells | the planner is glanceable without opening anything |
| 4 | `Store` backed by `@capacitor/preferences` + iCloud key-value for a family's devices | the seam was built for exactly this swap |
| 5 | **Screen Time API** (FamilyControls + DeviceActivity, with Family Sharing) | TV/tablet time becomes *measured*, not self-reported — the only reason to go deeper than a wrapper |
| 6 | App Store: Kids category, Made for Kids, no third-party analytics or ads | the same rules the web app already keeps |

### Notification rules (carry over unchanged)

- Five minutes before a plan, never for school; one evening wrap-up if something is unchecked.
- Nothing between 21:30 and 06:00. Never a streak warning, never "you missed…".
- The child turns them on; a grown-up can see that they are on.

### What must not change on the way

The adherence model, the medals and the no-streak rule live in `src/model.js` and `src/badges.js`,
which have no DOM and no platform code. They move to the native app as they are, with their tests.
