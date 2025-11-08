# JetBundle Customization Guide

## Theme: jekyll-theme-potato-hacker

This guide explains how to customize the theme to fit JetBundle's subject-centered academic resource requirements.

## Current Structure

### What We Have

```
jetbundle.github.io/
├── _config.yml              # Theme configuration
├── Gemfile                  # Dependencies
├── index.md                 # Homepage
├── blog.md                  # Blog index
├── _dropdown/               # Navigation menu items
│   ├── about.md
│   ├── publications.md
│   └── topics.md
├── topics/                  # Topic pages
│   ├── physics.md
│   ├── mathematics.md
│   ├── computation.md
│   └── finance.md
├── _items/                  # Empty (for portfolio items)
├── _posts/                  # Empty (for blog posts)
└── assets/img/              # Images directory
```

## How the Theme Works

### 1. Navigation System

The theme uses a **dropdown-based navigation** system:

- **Home**: Always visible (home icon)
- **Blog**: Visible if `blog: on` in `_config.yml`
- **Dropdowns**: Created from files in `_dropdown/` collection
- **Items**: Direct links from `_items/` collection

**Dropdown Logic**:
- Files in `_dropdown/` with same `dropdown:` value are grouped
- `priority:` controls order (higher = first)
- `toolbar_priority:` in `_config.yml` controls overall menu order

### 2. Page Rendering

- **Layout: page** - Standard pages (homepage, topic pages)
- **Layout: blog-index** - Blog listing page
- **Layout: post** - Individual blog posts (automatic for `_posts/`)

### 3. Theme Features

- **Dark/Light Mode**: Toggleable via `theme_switch: on`
- **Avatar**: Displayed if `avatar: on` and image exists
- **Social Links**: GitHub, Facebook, Twitter, LinkedIn
- **Syntax Highlighting**: Multiple themes (monokai, github, etc.)
- **MathJax**: Already configured for LaTeX

## Customization Options

### Option 1: Reorganize Navigation with Dropdowns

**Current**: Topics is a single dropdown item
**Better**: Make each topic a dropdown item under "Topics"

**Implementation**:
```yaml
# _dropdown/topics-physics.md
---
layout: page
title: Physics
dropdown: Topics
priority: 1
permalink: /topics/physics/
---

# _dropdown/topics-mathematics.md
---
layout: page
title: Mathematics
dropdown: Topics
priority: 2
permalink: /topics/mathematics/
---
```

**Result**: "Topics" dropdown with Physics, Mathematics, Computation, Finance

### Option 2: Use Items for Special Pages

**For**: Military-Complex report, CV, other standalone pages

**Implementation**:
```yaml
# _items/military-complex.md
---
layout: page
title: Military-Academic Complex
permalink: /military-complex/
---

# Report content
```

**Result**: Direct link in navigation bar

### Option 3: Create Custom Layouts

**For**: Pages with PDF embeds, special formatting

**Implementation**:
```liquid
# _layouts/pdf-page.html
---
layout: default
---
<article>
  {{ content }}
  {% if page.pdf %}
    {% include pdf_embed.html pdf=page.pdf title=page.title %}
  {% endif %}
</article>
```

**Usage**:
```yaml
---
layout: pdf-page
title: Report Title
pdf: /assets/pdf/report.pdf
---
```

### Option 4: Data-Driven Content

**For**: Publications, topics, structured data

**Implementation**:
```yaml
# _data/publications.yml
- title: "Paper Title"
  authors: "Author Name"
  year: 2025
  pdf: "/assets/pdf/paper.pdf"
  selected: true
```

**Usage in page**:
```liquid
{% for pub in site.data.publications %}
  {% if pub.selected %}
    <h3>{{ pub.title }}</h3>
    <p>{{ pub.authors }}, {{ pub.year }}</p>
    {% include pdf_embed.html pdf=pub.pdf %}
  {% endif %}
{% endfor %}
```

### Option 5: Custom Includes

**For**: Reusable components (PDF embeds, topic cards, etc.)

**Implementation**:
```html
# _includes/pdf_embed.html
<div class="pdf-embed">
  <iframe src="{{ include.pdf }}"
          width="100%"
          height="900px"
          title="{{ include.title | default: 'Document' }}">
  </iframe>
  <a href="{{ include.pdf }}" target="_blank">Open in New Tab</a>
</div>
```

**Usage**:
```liquid
{% include pdf_embed.html pdf="/assets/pdf/document.pdf" title="Document Title" %}
```

### Option 6: Custom CSS

**For**: Styling PDF embeds, custom layouts

**Implementation**:
```css
# assets/css/custom.css
.pdf-embed {
  margin: 2rem 0;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.pdf-embed iframe {
  width: 100%;
  height: 900px;
  border: none;
}
```

**Include in layout**:
```html
<link rel="stylesheet" href="{{ '/assets/css/custom.css' | relative_url }}">
```

## Recommended Customization Plan

### Step 1: Create PDF Embed Include

**File**: `_includes/pdf_embed.html`
```html
<div class="pdf-embed" style="margin: 2rem 0; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
  <iframe
    src="{{ include.pdf }}#toolbar=1&navpanes=0&scrollbar=1&view=FitH"
    width="100%"
    height="{{ site.pdf_height | default: '900px' }}"
    style="border: none;"
    title="{{ include.title | default: 'Document' }}"
    loading="lazy">
  </iframe>
  <div style="padding: 0.75rem 1rem; background: #f8f9fa; font-size: 0.9rem; text-align: right; border-top: 1px solid #e0e0e0;">
    <a href="{{ include.pdf }}" target="_blank" style="color: #1a73e8; text-decoration: none; font-weight: 500;">
      Open in New Tab
    </a>
  </div>
</div>
```

### Step 2: Reorganize Navigation

**Move topics to dropdown**:
- Delete `_dropdown/topics.md`
- Create `_dropdown/topics-physics.md`, etc.
- Each topic becomes a dropdown item

### Step 3: Add Military-Complex Section

**Option A: As Item** (direct link):
```yaml
# _items/military-complex.md
---
layout: page
title: Military-Academic Complex
permalink: /military-complex/
---
```

**Option B: As Dropdown** (with subsections):
```yaml
# _dropdown/military-complex.md
---
layout: page
title: Overview
dropdown: Report
priority: 1
permalink: /military-complex/
---
```

### Step 4: Create Publications System

**Data file**:
```yaml
# _data/publications.yml
applications:
  - title: "Kalman Filtering in Finance"
    authors: "Jet Bundle"
    year: 2025
    pdf: "/assets/pdf/kalman-finance.pdf"
    selected: true

foundational:
  - title: "Intergalactic Computer Network"
    authors: "J.C.R. Licklider"
    year: 1963
    pdf: "/assets/pdf/licklider-1963.pdf"
```

**Publications page**:
```liquid
## Applications
{% for pub in site.data.publications.applications %}
  {% if pub.selected %}
    <h3>{{ pub.title }}</h3>
    <p>{{ pub.authors }}, {{ pub.year }}</p>
    {% include pdf_embed.html pdf=pub.pdf title=pub.title %}
  {% endif %}
{% endfor %}
```

### Step 5: Customize Homepage

**Enhance index.md**:
- Add featured report section with PDF embed
- Create topic preview cards
- Add recent blog posts section
- Include navigation to all sections

### Step 6: Add Custom CSS

**File**: `assets/css/custom.css`
```css
/* PDF Embed Styling */
.pdf-embed {
  margin: 2rem 0;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* Topic Cards */
.topic-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1rem 0;
}

.topic-card h3 {
  margin-top: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .pdf-embed iframe {
    height: 600px;
  }
}
```

**Include in layout override** or add to `_config.yml` if theme supports it.

## Advanced Customizations

### Custom Layout for PDF Pages

**File**: `_layouts/pdf-page.html`
```liquid
---
layout: default
---
<article class="pdf-page">
  <header>
    <h1>{{ page.title }}</h1>
    {% if page.description %}
      <p class="description">{{ page.description }}</p>
    {% endif %}
  </header>

  <div class="content">
    {{ content }}
  </div>

  {% if page.pdf %}
    <div class="pdf-section">
      {% include pdf_embed.html pdf=page.pdf title=page.title %}
    </div>
  {% endif %}
</article>
```

### Custom Blog Post Layout

**File**: `_layouts/post.html`
```liquid
---
layout: default
---
<article class="post">
  <header>
    <h1>{{ page.title }}</h1>
    <time datetime="{{ page.date | date: '%Y-%m-%d' }}">
      {{ page.date | date: '%B %d, %Y' }}
    </time>
  </header>

  <div class="content">
    {{ content }}
  </div>

  {% if page.pdf %}
    {% include pdf_embed.html pdf=page.pdf title=page.title %}
  {% endif %}
</article>
```

### Topic Preview Cards

**Include**: `_includes/topic_card.html`
```html
<div class="topic-card">
  <h3><a href="{{ include.url }}">{{ include.title }}</a></h3>
  <p>{{ include.description }}</p>
  <a href="{{ include.url }}" class="btn">Learn More →</a>
</div>
```

**Usage**:
```liquid
{% include topic_card.html
   title="Physics"
   description="From radar to guidance systems"
   url="/topics/physics/" %}
```

## Configuration Options

### Theme Settings

```yaml
# _config.yml
theme_base: "dark"              # dark or light
theme_switch: "on"              # Enable theme switcher
blog: "on"                      # Enable blog
avatar: "on"                    # Show avatar
avatar_image: "assets/img/avatar.jpg"
avatar_description: "Description text"
highlighter_theme: monokai      # Code highlighting theme
```

### Navigation Priority

```yaml
toolbar_priority:
  - Topics          # First in menu
  - About           # Second
  - Publications    # Third
  - Report          # Fourth (if added)
```

### Social Links

```yaml
github_username: "jetbundle"
facebook_username: ""
twitter_username: ""
linkedin_id: ""
```

## Testing Customizations

### Local Testing

```bash
# Install dependencies
bundle install

# Serve locally
bundle exec jekyll serve

# Open browser
# http://localhost:4000
```

### Deployment Testing

1. Commit changes
2. Push to main branch
3. Check GitHub Actions workflow
4. Verify deployment to gh-pages
5. Check live site

## Best Practices

1. **Override, Don't Modify Theme Files**:
   - Create files in `_layouts/` to override theme layouts
   - Create files in `_includes/` to override theme includes
   - Never modify theme files directly

2. **Use Data Files for Structured Content**:
   - Publications, topics, navigation
   - Easier to maintain and update
   - Can be used across multiple pages

3. **Keep Customizations Minimal**:
   - Only override what's necessary
   - Preserve theme updates compatibility
   - Document customizations

4. **Test Locally First**:
   - Always test changes locally
   - Check different screen sizes
   - Verify PDF embeds work
   - Test theme switching

5. **Maintain Consistency**:
   - Use consistent styling
   - Follow existing patterns
   - Keep navigation logical
   - Maintain professional tone

## Troubleshooting

### PDFs Not Embedding

- Check file path is correct
- Verify PDF exists in `assets/pdf/`
- Check include syntax
- Verify iframe is not blocked

### Navigation Not Working

- Check `dropdown:` front matter matches
- Verify `priority:` values
- Check `toolbar_priority:` in `_config.yml`
- Clear browser cache

### Theme Not Loading

- Verify `remote_theme:` in `_config.yml`
- Check `jekyll-remote-theme` plugin is installed
- Verify GitHub Pages supports remote themes
- Check workflow is building correctly

### Math Not Rendering

- Verify `math_engine: mathjax` in `_config.yml`
- Check MathJax is loaded in theme
- Verify syntax: `$inline$` and `$$display$$`
- Check browser console for errors

## Resources

- **Theme Repository**: https://github.com/luxedo/jekyll-theme-potato-hacker
- **Theme Demo**: https://luxedo.github.io/jekyll-theme-potato-hacker/
- **Jekyll Docs**: https://jekyllrb.com/docs/
- **Liquid Template**: https://shopify.github.io/liquid/
