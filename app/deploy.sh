#!/usr/bin/env bash
# deploy.sh — publish Bizzing Schedule at aayuvis.github.io/bizzingindia.com/schedule/
#
# The site is Bizzing India's GitHub Pages, so this writes into THAT repo's gh-pages
# branch — and only into its schedule/ folder. It is careful about three things:
#
#   * It is ADDITIVE. It starts from whatever gh-pages is live right now and swaps the
#     schedule/ subtree, so it can never roll back a Bizzing India deploy made from
#     another branch. (India's own tools/deploy.sh replaces gh-pages wholesale from
#     HEAD:app; a deploy of India from a branch without app/schedule/ removes this app.
#     Re-running this script restores it in seconds. See docs/03-publishing.md.)
#   * It publishes a COMMITTED build: tests, build and the browser check all pass first,
#     and the source must be committed, so what is live is always reachable by a sha.
#   * It never checks anything out in the India working tree: plumbing only, the same
#     way India's deploy does, so a busy checkout next door is never disturbed.
#
#   INDIA_DIR   path to a clone of aayuvis/bizzingindia.com (default ../../bizzingindia.com)
set -euo pipefail
cd "$(dirname "$0")"
APP=$(pwd)
INDIA=${INDIA_DIR:-$APP/../../bizzingindia.com}
[ -d "$INDIA/.git" ] || { echo "no Bizzing India clone at $INDIA (set INDIA_DIR)" >&2; exit 1; }

if [ -n "$(git status --porcelain -- . ../integration ../tools)" ]; then
  echo "refusing: commit the source first — a deploy must be reachable by a sha" >&2; exit 1
fi
SRC=$(git rev-parse --short HEAD)

npm test
npm run build
npm run check

cd "$INDIA"
ok=0
for i in 1 2 3 4; do git fetch -q origin gh-pages && ok=1 && break; sleep $((2 ** i)); done
[ "$ok" = 1 ] || { echo "could not fetch gh-pages" >&2; exit 1; }
BASE=$(git rev-parse origin/gh-pages)

SCRATCH=$(mktemp -u); trap 'rm -f "$SCRATCH"' EXIT
export GIT_INDEX_FILE="$SCRATCH"
git read-tree "$BASE"
git rm -r -q --cached --ignore-unmatch schedule >/dev/null
( cd "$APP/build" && find . -type f | sed 's|^\./||' | sort ) | while read -r f; do
  printf '100644 %s\tschedule/%s\n' "$(git hash-object -w "$APP/build/$f")" "$f"
done | git update-index --index-info
WANT=$(cd "$APP/build" && find . -type f | wc -l)
GOT=$(git ls-files -- schedule | wc -l)
[ "$WANT" = "$GOT" ] || { echo "refusing: staged $GOT files under schedule/, build has $WANT" >&2; exit 1; }
OUTSIDE_BEFORE=$(git ls-tree -r "$BASE" | grep -v $'\tschedule/' | sha1sum)
TREE=$(git write-tree)
unset GIT_INDEX_FILE
OUTSIDE_AFTER=$(git ls-tree -r "$TREE" | grep -v $'\tschedule/' | sha1sum)
[ "$OUTSIDE_BEFORE" = "$OUTSIDE_AFTER" ] || { echo "refusing: something outside schedule/ would change" >&2; exit 1; }

if [ "$(git rev-parse "$BASE^{tree}")" = "$TREE" ]; then echo "schedule/ already live at this build — nothing to deploy"; exit 0; fi
COMMIT=$(git commit-tree "$TREE" -p "$BASE" -m "Deploy Bizzing Schedule $SRC to schedule/")
for i in 1 2 3 4 5; do
  if git push -q origin "$COMMIT":gh-pages; then echo "deployed Bizzing Schedule $SRC → gh-pages ${COMMIT:0:9} (schedule/, $WANT files)"; exit 0; fi
  sleep $((2 ** i))
done
echo "DEPLOY FAILED: push rejected (someone may have deployed India in between — just run again)" >&2; exit 1
