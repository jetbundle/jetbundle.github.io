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

**Copyright © 2025 Joel Saucedo. All rights reserved.**

This project is licensed under the MIT License with a non-commercial use restriction.

- **Open source** for non-commercial use
- **Commercial use prohibited** without explicit written permission
- **Intellectual property** rights reserved by the author

See the [LICENSE](LICENSE) file for full terms and the [Disclaimer](_pages/disclaimer.md) page for research purposes and legal disclaimers.

---

**Site**: https://jetbundle.github.io
**Repository**: https://github.com/jetbundle/jetbundle.github.io
