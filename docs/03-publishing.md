# Publishing

**Live:** <https://aayuvis.github.io/bizzingindia.com/schedule/>
**Sample family:** <https://aayuvis.github.io/bizzingindia.com/schedule/?demo> (grown-ups PIN `1234`)

The app is served from **Bizzing India's** GitHub Pages site, in a `schedule/` folder, so that it
shares an origin with the other Bizzing apps (which is what lets it read their minutes — see
docs/02).

```bash
cd app && ./deploy.sh        # test → build → browser check → publish schedule/ only
```

`deploy.sh` builds a gh-pages commit on top of whatever is live, replacing only `schedule/`, and
refuses if anything outside `schedule/` would change or if the staged file count differs from
the build.

## The one hazard

Bizzing India's own `tools/deploy.sh` rebuilds gh-pages **wholesale** from `HEAD:app`. A deploy
of India from a branch that does not contain `app/schedule/` will therefore remove this app from
the site. It does not damage anything — run `./deploy.sh` here again and it is back in seconds.

The permanent fix, for whoever next touches India's deploy script: carry the previous
gh-pages `schedule/` subtree forward when `app/schedule/` does not exist (read it from
`origin/gh-pages:schedule` into the scratch index before `write-tree`).
