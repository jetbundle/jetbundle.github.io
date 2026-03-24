# jetbundle.github.io (Reset Baseline)

Minimal landing-only Jekyll site.

## What remains

- Landing page: `index.md`
- Layout shell: `_layouts/default.html`
- Core includes: `_includes/head.html`, `_includes/header.html`, `_includes/katex-math-renderer.html`
- Purple theme stylesheet: `assets/css/site.css`
- Social/preview image: `assets/img/og-image.svg`
- Publish workflow: `.github/workflows/build-and-deploy.yml`

## General ideas

- Keep the public site intentionally small and direct.
- Build from one strong landing page first.
- Add pages only when needed, not by default.
- Preserve KaTeX compatibility for future mathematical writing.
- Keep the palette stable:
  - background: `#0f0b1f`
  - surface: `#181033`
  - accent: `#8b5cf6`
  - accent light: `#a78bfa`
  - text: `#f5f3ff`

## Publish flow

1. Edit `index.md`, `_includes/head.html`, or `assets/css/site.css`
2. Commit changes to `main`
3. GitHub Actions builds Jekyll and deploys to GitHub Pages

## Local preview

```bash
bundle install
bundle exec jekyll serve
```

Open `http://localhost:4000`.
