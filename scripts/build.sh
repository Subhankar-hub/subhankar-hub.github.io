#!/usr/bin/env bash
# Copy the static site into dist/ for GitHub Pages.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST="$ROOT/dist"

rm -rf "$DIST"
mkdir -p "$DIST/assets"

cp "$ROOT/index.html" "$ROOT/vim-tmux.html" "$ROOT/dotfiles.html" "$ROOT/404.html" "$DIST/"
mkdir -p "$DIST/support" "$DIST/terms-of-service" "$DIST/privacy-policy" "$DIST/cancellation"
cp "$ROOT/support/index.html" "$DIST/support/"
cp "$ROOT/terms-of-service/index.html" "$DIST/terms-of-service/"
cp "$ROOT/privacy-policy/index.html" "$DIST/privacy-policy/"
cp "$ROOT/cancellation/index.html" "$DIST/cancellation/"
cp "$ROOT/LICENSE" "$DIST/"
cp -a "$ROOT/assets/." "$DIST/assets/"

# Stop Jekyll from skipping files such as assets/dotfiles/vimrc
touch "$DIST/.nojekyll"

# Prefer the clean resume filename; keep a copy if the spaced name is linked elsewhere
if [[ -f "$DIST/assets/data/Subhankar_Roy_Resume.pdf" ]]; then
  rm -f "$DIST/assets/data/Subhankar_Roy_0-1 years.pdf"
fi

echo "Wrote $DIST"
find "$DIST" -type f | sort
