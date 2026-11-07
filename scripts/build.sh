#!/usr/bin/env bash
# Copy the portfolio and its supporting pages into dist/ for GitHub Pages.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST="$ROOT/dist"

rm -rf "$DIST"
mkdir -p "$DIST/assets/css" "$DIST/assets/js" "$DIST/assets/data" "$DIST/assets/images" "$DIST/assets/dotfiles"
mkdir -p "$DIST/privacy-policy" "$DIST/terms-of-service" "$DIST/cancellation" "$DIST/support"
cp "$ROOT/index.html" "$ROOT/vim-tmux.html" "$ROOT/dotfiles.html" "$DIST/"
cp "$ROOT/privacy-policy/index.html" "$DIST/privacy-policy/"
cp "$ROOT/terms-of-service/index.html" "$DIST/terms-of-service/"
cp "$ROOT/cancellation/index.html" "$DIST/cancellation/"
cp "$ROOT/support/index.html" "$DIST/support/"
cp "$ROOT/assets/css/style.css" "$DIST/assets/css/"
cp "$ROOT/assets/js/main.js" "$DIST/assets/js/"
cp "$ROOT/assets/data/Subhankar_Roy_Resume.pdf" "$DIST/assets/data/"
cp "$ROOT/assets/images/profile.webp" "$DIST/assets/images/"
cp "$ROOT/assets/dotfiles/vimrc" "$ROOT/assets/dotfiles/tmux.conf" "$DIST/assets/dotfiles/"
cp "$ROOT/LICENSE" "$DIST/"
touch "$DIST/.nojekyll"

echo "Wrote $DIST"
find "$DIST" -type f | sort
