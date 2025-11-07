# JetBundle

**Physics • Mathematics • Computation • Finance — Origins, Applications & Engineering**

A subject-centered academic resource tracing defense-driven innovation to modern engineering practice.

## Overview

JetBundle is a technical resource website that explores the historical origins, post-academic applications, and engineering principles of core applied disciplines. The site documents how strategic national investment in research and development shaped modern technical fields and how these principles continue to inform contemporary engineering practice.

## Site Structure

### Core Topics

- **[Physics](/topics/physics/)** — From radar to guidance systems: how military physics became engineering simulation
- **[Mathematics](/topics/mathematics/)** — Linear programming, control theory: invented to solve national-scale problems
- **[Computation](/topics/computation/)** — ENIAC, ARPANET: deliberate construction of interactive computing
- **[Finance](/topics/finance/)** — Option pricing, risk models: stochastic control in markets

### Featured Report

**[The Military-Academic Complex](/military-complex/)** — Archival verification of U.S. defense patronage in applied mathematics and computer science.

### Additional Pages

- **[Publications](/publications/)** — Selected works and foundational papers
- **[About](/about/)** — Site purpose and focus
- **[CV](/cv/)** — Curriculum Vitae

## Technology Stack

- **Static Site Generator**: [Jekyll](https://jekyllrb.com/)
- **Theme**: [al-folio](https://github.com/alshedivat/al-folio)
- **Hosting**: [GitHub Pages](https://pages.github.com/)
- **Math Rendering**: [MathJax](https://www.mathjax.org/)
- **PDF Embedding**: HTML5 iframe with accessibility features

## Features

- **Subject-First Structure** — Organized by discipline rather than chronology
- **PDF Embedding** — Interactive PDF viewing with "Open in New Tab" functionality
- **LaTeX Support** — MathJax rendering for mathematical formulations
- **Responsive Design** — Mobile-ready layout via al-folio theme
- **Professional Tone** — Scientific, technical documentation style
- **Auto-Deployment** — GitHub Actions for continuous deployment

## Local Development

### Using Docker (Recommended)

```bash
# Pull and run
docker compose pull
docker compose up

# Open http://localhost:8080
```

### Using Jekyll Directly

```bash
# Install dependencies
bundle install

# Serve locally
bundle exec jekyll serve

# Open http://localhost:4000
```

## Project Structure

```
jetbundle.github.io/
├── index.md                    # Homepage
├── topics/                     # Core discipline pages
│   ├── physics.md
│   ├── mathematics.md
│   ├── computation.md
│   └── finance.md
├── military-complex/           # Featured report
│   ├── index.md
│   ├── part0.md
│   ├── part1-onr.md
│   ├── part2-afosr.md
│   ├── part3-arpa.md
│   ├── part4-conclusion.md
│   └── appendix.md
├── _pages/                     # Standard pages
│   ├── about.md
│   ├── cv.md
│   └── publications.md
├── _data/                      # YAML data files
│   ├── topics.yml
│   └── publications.yml
├── _includes/                  # Reusable components
│   └── pdf_embed.html
├── assets/
│   ├── pdf/                    # PDF documents
│   └── img/                    # Images
└── _config.yml                 # Jekyll configuration
```

## Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the `main` branch.

### Manual Deployment

1. Ensure GitHub Pages is enabled in repository settings
2. Source: Deploy from a branch
3. Branch: `gh-pages` → `/(root)`
4. GitHub Actions workflow will build and deploy automatically

## Adding Content

### Adding a New Topic

1. Create a new markdown file in `topics/`
2. Add entry to `_data/topics.yml`
3. Update navigation if needed

### Adding PDFs

1. Place PDF files in `assets/pdf/`
2. Reference in markdown using:
   ```liquid
   {% include pdf_embed.html pdf="/assets/pdf/your-file.pdf" title="Document Title" %}
   ```

### Adding Publications

1. Add entries to `_data/publications.yml`
2. Use `selected: true` for featured publications
3. Use `tags: [origin]` for foundational works

## Configuration

Key settings in `_config.yml`:

- `title`: Site title
- `url`: Site URL (https://jetbundle.github.io)
- `pdf_height`: PDF viewer height (default: 900px)
- `enable_math`: MathJax rendering (enabled)
- Collections: `topics`, `reports` for organized content

## License

See [LICENSE](LICENSE) file for details.

## Acknowledgments

Built with the [al-folio](https://github.com/alshedivat/al-folio) Jekyll theme for academic websites.
