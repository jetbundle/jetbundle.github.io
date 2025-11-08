# JetBundle

**Mapping the hidden geometry of modern science.**

## Overview

JetBundle is an open-source, subject-focused resource that traces the materialist origins of modern science. The project maps the hidden geometry of mathematics, physics, computer science, and finance through the lens of the "fiber bundle" metaphor.

## Architecture

The site is built using:
- **Jekyll** static site generator
- **minimal-mistakes** theme (customized with gauge-themed dark/orange/blue palette)
- **GitHub Pages** for hosting
- **GitHub Actions** for deployment

## Structure

### Collections (The "Fibers")

- **`_c3i_stack/`** - Command, Control, Communications & Intelligence
- **`_physics_stack/`** - Ballistics & Hydrodynamics
- **`_finance_stack/`** - Military-Financial Stack

### Pages

- **`index.md`** - The Primer (homepage)
- **`_pages/cartography.md`** - Master Cartography Table
- **`_pages/archive.md`** - Declassified documents and sources
- **`_pages/principal.md`** - Principal information

## Local Development

```bash
bundle install
bundle exec jekyll serve
```

Open http://localhost:4000 in your browser.

## Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the `main` branch.

## License

This project is open source. See LICENSE file for details.

## Contributing

Contributions are welcome! Please see the Archive page for information on contributing documents and audits.

---

**Site**: https://jetbundle.github.io  
**Repository**: https://github.com/jetbundle/jetbundle.github.io
