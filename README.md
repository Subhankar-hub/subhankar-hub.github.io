# subhankar-hub.github.io

Personal site for [GitHub Pages](https://subhankar-hub.github.io).

## Build `dist/`

```bash
bash scripts/build.sh
```

That copies the static pages, `assets/`, `LICENSE`, and `.nojekyll` into `dist/`. GitHub Pages should publish **that folder**, not the repo root.

## GitHub Pages

This repo is a user site (`username.github.io`). GitHub cannot serve `/dist` as the site root from a branch folder, so deploy uses **GitHub Actions** (`.github/workflows/pages.yml`).

1. Push `main`.
2. Repo **Settings → Pages → Source → GitHub Actions**.
3. The workflow builds `dist/` and publishes it to `https://subhankar-hub.github.io`.
