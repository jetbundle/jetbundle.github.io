# JetBundle

**Mapping the hidden geometry of modern science.**

A subject-centered technical resource tracing defense-driven innovation to modern engineering practice through the lens of the "fiber bundle" metaphor.

## Architecture

The site is structured around **Collections** (the "Fibers"):

- **`_c3i_stack/`** - Command, Control, Communications & Intelligence
- **`_physics_stack/`** - Ballistics & Hydrodynamics  
- **`_finance_stack/`** - The Military-Financial Stack

## Theme

This site uses the [jekyll-theme-potato-hacker](https://github.com/luxedo/jekyll-theme-potato-hacker) theme with custom styling for a dark/orange/blue "gauge" aesthetic.

## Structure

```
jetbundle.github.io/
├── _config.yml          # Site configuration
├── _pages/              # Main pages (Cartography, Archive, Principal)
├── _c3i_stack/          # C3I & Surveillance Stack collection
├── _physics_stack/      # Ballistics & Hydrodynamics Stack collection
├── _finance_stack/      # Military-Financial Stack collection
├── _dropdown/           # Navigation dropdown items
├── _includes/           # Custom includes (PDF embed, custom head)
└── assets/css/          # Custom CSS (gauge theme)
```

## Local Development

```bash
bundle install
bundle exec jekyll serve
```

Open http://localhost:4000 in your browser.

## Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions on every push to the `main` branch.

## License

This project is open source. See LICENSE file for details.

---

**Site**: https://jetbundle.github.io  
**Repository**: https://github.com/jetbundle/jetbundle.github.io
