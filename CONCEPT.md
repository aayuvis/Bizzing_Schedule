# Bizzing Schedule — concept

**Structure for them. Peace of mind for you.**

## 1. The problem

High-performing kids 6–14 run a week that would tire an adult: school, homework, two or three
lessons, a sport, contest prep (a spelling bee, Maths Kangaroo), the Bizzing apps, friends, TV,
family, sleep. Two failure modes follow, and every family we build for has one of them:

- **The parent becomes the scheduler.** Reminders, nagging, "did you practise?" — the parent
  owns the child's time and the child learns nothing about owning it.
- **The child is over-scheduled and nobody can see it.** Tuesday has no free minute between
  school and bed, and the first sign is a meltdown.

Existing tools miss both: calendars are for adults, chore apps are about compliance, screen-time
apps are about restriction. None of them treats the child as the one running the week.

## 2. The idea

A planner a child *wants* to open, that a parent can *trust without supervising*.

| who | owns | sees |
|---|---|---|
| **Grown-up** | the few **fixed times** (school, lessons, bedtime) — shown to the child with a 🔒 | the *shape* of the week: rhythm, free time, screen time vs plan, goals — in plain sentences |
| **Child** | everything else: arranging the week, the task board, their goals, checking in | their day, their Hive, their medals, kudos from family |

A ten-minute **Sunday huddle** replaces a week of reminders: celebrate, look ahead, the child
picks their top three.

## 3. Principles (binding)

1. **One tap, never an essay.** Checking a plan in is one tap. Bizzing apps count their own
   minutes. School and other fixed anchors count themselves. The evening wrap-up is one screen.
   Self-report exists only for what nothing else can know (TV, play outside), as `+15m` chips.
2. **Evidence, not hope.** Adherence, goals and medals are computed from the log — what the
   child marked, what an app reported, what an anchor guarantees. Time spent in *this* app
   counts for nothing.
3. **No streaks, no shame.** A day off costs nothing. The Hive counts *good days in a window*,
   never an unbroken run. A skipped plan is "information, not failure" and is never mentioned by
   the mascot. Praise names the effort, never the child's worth, and never compares children.
4. **A future block is never a miss.** A plan added today is not a miss yesterday; a plan retired
   keeps last week's numbers exactly as they were.
5. **Positive reinforcement is earned.** Twelve medals, each from evidence ("keep 10 sport
   blocks"), celebrated once. A honeycomb that fills as plans are kept. Kudos from family that
   arrive as a gift to open. No currency, no loot, no random rewards.
6. **Breathing room is a first-class number.** For every day: free minutes between school and
   bedtime. A parent sees "Tuesday has under 30 minutes free" before the child feels it.
7. **Private by construction.** First name and an age band. No birthday, surname, school, photo
   or location. Everything stays on the device; no account, no analytics, no ads, no third-party
   requests (even the fonts are bundled).
8. **Keyboard and touch, always** (the family rule). Every board move works by drag, by tap, and
   by ← →.

## 4. What is built (v0.1 — the front end)

| surface | what it does |
|---|---|
| **Today** | Time-of-day painted sky, Bizzy's specific encouragement, a live *Now/Next* card with one-tap Done, the day's timeline with one-tap check-ins (Partly / Skipped / 15 min later in a menu), to-dos, "also did" chips, today's Bizzing minutes (automatic), goal rings, focus sprint, kudos to open, evening wrap-up |
| **Board** | Trello-style Kanban (To do · Doing · Done) for Today / This week / Everything; drag with mouse or finger, ← → on a focused card, tap arrows on phones; category filters; subtasks; goal links; undo |
| **Week** | Calendar grid, colour per kind of time, status on every block (kept / partly / not checked in / coming up), clashes outlined, 🌿 free time after school per day, tap an empty slot to plan, "Find a free time" |
| **Goals** | OKR for kids: a goal, a *why*, measures that count themselves (minutes in a Bizzing app, kept minutes of a kind of time, times a routine was kept, tasks finished, focus minutes, or a manual count), milestone steps, 6-week sparklines, days to go, templates |
| **My Hive** | This week's honeycomb (one cell per plan) and honey jar, Rhythm vs last week, strong days, Bizzing time by app, focus time, balance donut with plan markers, 12-week heatmap, medals shelf, kudos wall |
| **Grown-ups** | PIN-gated (a deterrent, and it says so). Per child: rhythm, plain-language insights, the week's rhythm + free time + mood, goals. Fixed-times editor. Send kudos with stickers. Family & Bizzing app connections. Nudges, backup/restore, erase |
| **Everywhere** | ⌘K quick add in plain words ("piano mon wed 5pm 30m" → a routine), keyboard shortcuts, gentle nudges 5 min before a plan and one wrap-up reminder, focus sprints, confetti, offline PWA, sample family |

## 5. How adherence is scored

For each block on a date: `done` = 1, `partly` = ½, `skipped` or *not checked in* = 0 — but only
once the block has **ended** or been marked. Rhythm = kept ÷ due. A *strong day* keeps 8 in 10.

A block is marked in exactly one of three ways, and the screen says which:
**the child** (one tap), **the app** (a Bizzing app reported ≥ 60% of the planned minutes), or
**the anchor** (a grown-up's "counts itself" block like school, once it has ended).

## 6. The Bizzing apps

Every Bizzing app lives on `aayuvis.github.io`, so they share `localStorage`. Each writes its
active minutes into `bizzing.activity`; Schedule reads it. See
[docs/02-activity-contract.md](docs/02-activity-contract.md). The writer is built and tested
(`integration/bizzing-activity.js`); **wiring it into Bee, Maths, India and Finance is the next
step** and is one import per app.

## 7. The road to iPhone

See [docs/01-iphone.md](docs/01-iphone.md). In short: the web app is already an installable PWA;
the native app wraps the same code (Capacitor) to get **local notifications that fire when the
app is closed**, a home-screen widget for *Now/Next*, and — the reason to go native at all —
Apple's Screen Time API (FamilyControls / DeviceActivity) so TV-and-tablet time can be measured
instead of self-reported.

## 8. Open questions for a person

- **Tone check with real kids.** Bizzy's lines, medal names and the "no streaks" stance should be
  watched with three or four children of different ages before launch.
- **Who may edit what.** v0.1: fixed times are grown-up only; everything else is the child's. Some
  families will want grown-up approval for changes to lessons or screen time — a setting, not a
  default.
- **Sync.** Two devices (a parent's phone, a child's tablet) need the server every Bizzing app
  lists as a launch blocker. The `Store` seam is ready for it.
