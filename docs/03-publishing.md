# Publishing

**Live:** <https://aayuvis.github.io/Bizzing_Schedule/>
**Sample family:** <https://aayuvis.github.io/Bizzing_Schedule/?demo> (grown-ups PIN `1234`)

```bash
cd app && ./deploy.sh        # test → build → browser check → publish to this repo's gh-pages
```

Served by GitHub Pages from the `gh-pages` branch of `aayuvis/Bizzing_Schedule` (Settings →
Pages → Deploy from a branch → `gh-pages` / root). The build is path-agnostic (`base: './'`) and
the browser check serves it at `/Bizzing_Schedule/` so a relative-path slip fails here first.

## Why its own site

It first lived in Bizzing India's gh-pages under `schedule/`. India's deploy rebuilds that
whole branch from India's `app/` folder, so every India deploy removed Schedule. Separate repos
publish separately; neither can break the other.

It still shares the `aayuvis.github.io` origin with every Bizzing app, which is what lets it read
their minutes (docs/02). A move to a custom domain would break that — at that point the feed
moves to a server.
