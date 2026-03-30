# jetspace (site) · jetbundle.github.io (host)

Public name: **jetspace**.  
Still hosted at `https://jetbundle.github.io` until you point a custom domain.

Minimal Jekyll site: black background, purple terminal accent, almost no copy on the home page.

## Why an old icon might still show

Browsers cache favicons aggressively. This repo now ships **`assets/img/favicon.svg`** (purple prompt mark). After deploy, use a hard refresh or clear site data for the Pages URL if you still see an old glyph.

## Edit the home screen

- File: `index.md`
- Prompt line shows `jetspace:~$` plus cursor.

## Add a page (Markdown)

1. Create `_pages/slug.md`
2. Front matter:

```yaml
---
layout: default
title: slug
permalink: /slug/
---
```

3. URL: `https://jetbundle.github.io/slug/` (same host, **jetspace** title in the tab when `title` is empty on home).

Example: `_pages/example.md` → `/example/`

## Theme

- `assets/css/site.css` — `#000` background, violet accents (`#a78bfa`, `#c4b5fd`)
- `_includes/katex-math-renderer.html` — KaTeX on content pages

## Publish

Push to `main` → GitHub Actions → GitHub Pages.

```bash
bundle install
bundle exec jekyll serve
```
