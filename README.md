# jetbundle.github.io

Extremely minimal Jekyll site: black terminal aesthetic, almost no visible copy on the home page.

## Edit the home screen

- File: `index.md`
- The only visible line is a shell-style prompt + cursor (no favicon, no social preview image).

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

3. Write Markdown below the `---`
4. URL will be `https://jetbundle.github.io/slug/`

Example: `_pages/example.md` → `/example/`

## Theme

- CSS: `assets/css/site.css` (pure black `#000`, green terminal text, `IBM Plex Mono`)
- KaTeX: `_includes/katex-math-renderer.html` (for math on content pages)

## Publish

Push to `main` → GitHub Actions → GitHub Pages.

Local:

```bash
bundle install
bundle exec jekyll serve
```
