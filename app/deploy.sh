#!/usr/bin/env bash
# deploy.sh — publish Bizzing Schedule at aayuvis.github.io/Bizzing_Schedule/
#
# Schedule is its own repo, so it is its own site: this lays app/build at the root of
# THIS repo's gh-pages branch and touches no other repo. Careful about three things,
# all inherited from the family's deploys:
#
#   * It publishes a COMMITTED build: tests, build and the browser check pass first,
#     and the source must be committed, so what is live is reachable by a sha.
#   * It never checks gh-pages out: plumbing only (hash the build into the object
#     store, write a tree, commit it onto gh-pages), so the working tree is untouched.
#   * It refuses if the staged file count differs from the build — a deploy that
#     quietly publishes half a folder is worse than one that fails.
set -euo pipefail
cd "$(dirname "$0")"
APP=$(pwd)

if [ -n "$(git status --porcelain -- . ../integration ../tools)" ]; then
  echo "refusing: commit the source first — a deploy must be reachable by a sha" >&2; exit 1
fi
SRC=$(git rev-parse --short HEAD)

npm test
npm run build
npm run check

git fetch -q origin gh-pages 2>/dev/null || true
PARENT=$(git rev-parse -q --verify origin/gh-pages || true)

SCRATCH=$(mktemp -u); trap 'rm -f "$SCRATCH"' EXIT
export GIT_INDEX_FILE="$SCRATCH"
git read-tree --empty
( cd "$APP/build" && find . -type f | sed 's|^\./||' | sort ) | while read -r f; do
  printf '100644 %s\t%s\n' "$(git hash-object -w "$APP/build/$f")" "$f"
done | git update-index --index-info
# GitHub Pages hides files starting with "_" unless Jekyll is off
git update-index --add --cacheinfo 100644,"$(printf '' | git hash-object -w --stdin)",.nojekyll
WANT=$(( $(cd "$APP/build" && find . -type f | wc -l) + 1 ))
GOT=$(git ls-files | wc -l)
[ "$WANT" = "$GOT" ] || { echo "refusing: staged $GOT files, build has $WANT" >&2; exit 1; }
TREE=$(git write-tree)
unset GIT_INDEX_FILE

if [ -n "$PARENT" ] && [ "$(git rev-parse "$PARENT^{tree}")" = "$TREE" ]; then echo "gh-pages already matches this build"; exit 0; fi
COMMIT=$(git commit-tree "$TREE" ${PARENT:+-p "$PARENT"} -m "Deploy $SRC")
for i in 1 2 3 4 5; do
  if git push -q origin "$COMMIT":refs/heads/gh-pages; then echo "deployed $SRC → gh-pages ${COMMIT:0:9} ($WANT files)"; exit 0; fi
  sleep $((2 ** i))
done
echo "DEPLOY FAILED: could not push gh-pages" >&2; exit 1
