# jekyll-theme-potato-hacker Theme Analysis

## Theme Overview

**Theme**: jekyll-theme-potato-hacker
**Repository**: https://github.com/luxedo/jekyll-theme-potato-hacker
**Author**: luxedo
**License**: GPL v3
**Demo**: https://luxedo.github.io/

## Theme Structure

### Core Components

1. **Layouts** (from theme):
   - `page` - Standard page layout
   - `blog-index` - Blog listing page
   - `post` - Individual blog post layout
   - `default` - Base layout

2. **Collections**:
   - `_dropdown/` - Dropdown menu items (navigation)
   - `_items/` - Item pages (portfolio-like items)
   - `_posts/` - Blog posts

3. **Key Features**:
   - Dark/light theme toggle
   - Dropdown navigation menus
   - Blog functionality
   - Avatar display
   - Social media links
   - Syntax highlighting (multiple themes)

## Current Setup

### Files in Repository

```
jetbundle.github.io/
├── _config.yml          # Theme configuration
├── Gemfile              # Dependencies
├── index.md             # Homepage
├── blog.md              # Blog index page
├── _dropdown/           # Navigation menu items
│   ├── about.md
│   ├── publications.md
│   └── topics.md
├── topics/              # Topic pages
│   ├── physics.md
│   ├── mathematics.md
│   ├── computation.md
│   └── finance.md
├── _items/              # Empty (for portfolio items)
├── _posts/              # Empty (for blog posts)
└── assets/img/          # Images directory
```

### Configuration (_config.yml)

```yaml
# Theme Settings
remote_theme: luxedo/jekyll-theme-potato-hacker
theme_base: "dark"              # dark or light
theme_switch: "on"              # Enable theme switcher
blog: "on"                      # Enable blog
avatar: "on"                    # Show avatar
highlighter_theme: monokai      # Code syntax highlighting

# Navigation
toolbar_priority:
  - Topics
  - About
  - Publications

# Collections
collections:
  dropdown:
    output: true
  items:
    output: true
```

## How It Works

### 1. Navigation System

The theme uses **dropdown menus** generated from files in `_dropdown/`:

- Each file in `_dropdown/` becomes a menu item
- `dropdown:` front matter specifies which dropdown it belongs to
- `priority:` controls ordering (higher = first)
- Multiple dropdowns can be created

**Example**:
```yaml
---
layout: page
title: About
dropdown: About
priority: 1
---
```

### 2. Page Types

**Main Page** (`index.md`):
- Uses `layout: page`
- Homepage content

**Blog** (`blog.md`):
- Uses `layout: blog-index`
- Lists all posts from `_posts/`

**Blog Posts** (`_posts/YYYY-MM-DD-title.md`):
- Uses `layout: post` (automatic)
- Standard Jekyll post format

**Items** (`_items/item-name.md`):
- Portfolio-like items
- Custom layout from theme

**Regular Pages**:
- Use `layout: page`
- Can be anywhere in repository

### 3. Theme Customization

**Theme Base**:
- `theme_base: "dark"` or `"light"` - Default theme
- `theme_switch: "on"` - Allow users to toggle

**Avatar**:
- `avatar: "on"` - Show/hide avatar
- `avatar_image: "assets/img/avatar.jpg"` - Avatar image path
- `avatar_description: "Description"` - Text below avatar

**Toolbar Priority**:
- Controls order of navigation items
- Items with higher priority appear first
- Blog and Home are automatically included

### 4. Syntax Highlighting

**Available Themes**:
- base16
- colorful
- github
- gruvbox
- molokai
- monokai (current)
- pastie
- thankful_eyes
- tulip

**Configuration**:
```yaml
highlighter_theme: monokai
```

## Customization Options

### 1. Override Theme Layouts

Create files in `_layouts/` to override theme layouts:

```
_layouts/
├── page.html          # Override page layout
├── post.html          # Override blog post layout
└── blog-index.html    # Override blog index
```

### 2. Override Theme Includes

Create files in `_includes/` to override theme includes:

```
_includes/
├── head.html          # Custom head section
├── header.html        # Custom header
└── footer.html        # Custom footer
```

### 3. Custom CSS

Create `assets/css/custom.css`:

```css
/* Custom styles */
.custom-class {
  /* Your styles */
}
```

Include in `_config.yml` or in layout overrides.

### 4. Custom JavaScript

Create `assets/js/custom.js`:

```javascript
// Custom JavaScript
```

Include in layout overrides.

### 5. Custom Data Files

Use `_data/` for structured data:

```
_data/
├── topics.yml         # Topic data
├── publications.yml   # Publication data
└── navigation.yml     # Navigation data
```

### 6. PDF Embedding

Create `_includes/pdf_embed.html`:

```html
<div class="pdf-embed">
  <iframe src="{{ include.pdf }}" width="100%" height="900px"></iframe>
</div>
```

Use in markdown:
```liquid
{% include pdf_embed.html pdf="/assets/pdf/document.pdf" %}
```

### 7. MathJax Support

Already configured in `_config.yml`:
```yaml
kramdown:
  math_engine: mathjax
```

Use in markdown:
- Inline: `$E = mc^2$`
- Display: `$$E = mc^2$$`

## Customization for JetBundle

### Recommended Customizations

1. **Create PDF Embed Include**:
   - File: `_includes/pdf_embed.html`
   - Professional PDF viewer with "Open in New Tab" link

2. **Add Military-Complex Section**:
   - Create `_dropdown/military-complex.md` for navigation
   - Create `military-complex/` directory with report pages

3. **Customize Homepage**:
   - Update `index.md` with subject-centered content
   - Add featured report section
   - Link to topics

4. **Add Publications Data**:
   - Create `_data/publications.yml`
   - Use in publications page

5. **Customize Avatar**:
   - Add avatar image to `assets/img/avatar.jpg`
   - Update avatar description

6. **Add Blog Posts**:
   - Create posts in `_posts/`
   - Use for research updates, findings

7. **Custom CSS for PDF Embedding**:
   - Style PDF embeds professionally
   - Ensure responsive design

8. **Navigation Structure**:
   - Topics dropdown with subtopics
   - About page
   - Publications page
   - Military-Complex report

## Theme Limitations

1. **No Built-in PDF Embedding**:
   - Need to create custom include
   - Theme doesn't provide PDF viewer

2. **No Publication Management**:
   - Need to create custom publications system
   - No built-in bibliography support

3. **Limited Academic Features**:
   - No citation support
   - No publication badges
   - No CV layout

4. **Navigation Structure**:
   - Dropdown-based (good for organization)
   - May need customization for complex navigation

## Advantages

1. **Simple and Clean**:
   - Minimal design
   - Fast loading
   - Easy to customize

2. **Dark/Light Theme**:
   - Built-in theme switcher
   - User preference support

3. **Blog Support**:
   - Built-in blog functionality
   - Post listing and pagination

4. **Flexible Navigation**:
   - Dropdown menus
   - Priority-based ordering
   - Easy to add/remove items

5. **Code Highlighting**:
   - Multiple theme options
   - Good for technical content

## Detailed Theme Structure

### Layouts Available

1. **default.html** (Base Layout):
   - Wraps all other layouts
   - Includes head, header, footer
   - Handles theme switching (dark/light)
   - Includes MathJax for math rendering
   - Syntax highlighting support

2. **page.html**:
   - Simple wrapper: `layout: default` then `{{ content }}`
   - Used for standard pages
   - Content is rendered as markdown

3. **blog-index.html**:
   - Lists all blog posts from `_posts/`
   - Shows post title, date, excerpt
   - Provides "continue reading" link if excerpt separator exists
   - Simple, clean blog listing

4. **post.html**:
   - Individual blog post layout
   - Shows post title, date, content
   - Includes navigation between posts

### Includes Available

1. **head.html**:
   - Meta tags, CSS includes
   - Theme CSS (dark/light)
   - MathJax configuration
   - Syntax highlighter CSS

2. **header.html**:
   - Navigation bar
   - Dropdown menu generation
   - Home and Blog links
   - Priority-based menu ordering
   - Responsive mobile menu

3. **footer.html**:
   - Footer content
   - Social media links
   - Theme switcher
   - Copyright information

4. **links.html**:
   - Social media link generation
   - GitHub, Facebook, Twitter, LinkedIn

### Navigation System Deep Dive

**How Dropdowns Work**:
1. Files in `_dropdown/` are processed as a collection
2. Each file's `dropdown:` front matter creates a dropdown group
3. Files with the same `dropdown:` value are grouped together
4. `priority:` determines order within the dropdown (higher = first)
5. `toolbar_priority:` in `_config.yml` controls overall menu order
6. JavaScript sorts and organizes dropdowns on page load

**Example Structure**:
```yaml
# _dropdown/about.md
---
layout: page
title: About
dropdown: About        # Creates "About" dropdown
priority: 1            # First item in dropdown
---

# _dropdown/cv.md
---
layout: page
title: CV
dropdown: About        # Same dropdown as About
priority: 2            # Second item in dropdown
---
```

This creates one dropdown menu "About" with two items: About (first), CV (second).

### Items Collection

The `_items/` collection is for portfolio-like items:
- Each file becomes a separate page
- Can be linked directly in navigation
- Useful for project showcases
- Not used for dropdown menus (those are in `_dropdown/`)

### Blog System

**Blog Posts** (`_posts/`):
- Standard Jekyll post format
- Filename: `YYYY-MM-DD-title.md`
- Front matter:
  ```yaml
  ---
  layout: post
  title: "Post Title"
  date: 2025-11-08
  ---
  ```
- Excerpt separator: `<!--more-->` or automatic first paragraph

**Blog Index** (`blog.md`):
- Must use `layout: blog-index`
- Lists all posts from `_posts/`
- Shows title, date, excerpt
- "Continue reading" link if excerpt exists

## Customization Strategies for JetBundle

### Strategy 1: Use Dropdowns for Topics

Create a "Topics" dropdown with all four disciplines:

```yaml
# _dropdown/physics.md
---
layout: page
title: Physics
dropdown: Topics
priority: 1
permalink: /topics/physics/
---

# _dropdown/mathematics.md
---
layout: page
title: Mathematics
dropdown: Topics
priority: 2
permalink: /topics/mathematics/
---
```

### Strategy 2: Use Items for Featured Content

Use `_items/` for featured reports or special pages:

```yaml
# _items/military-complex.md
---
layout: page
title: Military-Academic Complex
---

# Report content
```

### Strategy 3: Custom Layouts for PDF Pages

Create a custom layout for pages with PDF embeds:

```liquid
# _layouts/pdf-page.html
---
layout: default
---
<div class="content">
  {{ content }}
  {% if page.pdf %}
    {% include pdf_embed.html pdf=page.pdf %}
  {% endif %}
</div>
```

### Strategy 4: Data-Driven Content

Use `_data/` files for structured content:

```yaml
# _data/topics.yml
- name: Physics
  slug: physics
  description: "From radar to guidance systems"
  pdf: "/assets/pdf/physics-report.pdf"
```

Then in pages:
```liquid
{% for topic in site.data.topics %}
  <h2>{{ topic.name }}</h2>
  <p>{{ topic.description }}</p>
{% endfor %}
```

### Strategy 5: Custom Includes

Create reusable components:

```
_includes/
├── pdf_embed.html          # PDF viewer
├── topic_card.html         # Topic preview card
├── publication_item.html   # Publication listing
└── section_nav.html        # Navigation between sections
```

## Implementation Plan

### Phase 1: Basic Structure
1. ✅ Set up theme (done)
2. ✅ Create basic pages (done)
3. Create PDF embed include
4. Add military-complex section
5. Configure navigation

### Phase 2: Content Enhancement
1. Add publications data file
2. Create publication listing page
3. Add topic detail pages
4. Create blog posts for updates
5. Add avatar image

### Phase 3: Advanced Features
1. Custom CSS for PDF embeds
2. Custom layouts for special pages
3. Enhanced navigation
4. Search functionality (if needed)
5. Analytics (optional)

### Phase 4: Polish
1. Optimize images
2. Test all pages
3. Verify PDF embeds
4. Check mobile responsiveness
5. Final content review

## Next Steps for Customization

1. **Create PDF embed include** - Essential for your use case
2. **Reorganize navigation** - Use dropdowns effectively for topics
3. **Add military-complex section** - Create report structure
4. **Customize homepage** - Featured content, topic previews
5. **Add publications system** - Data file + listing page
6. **Create custom CSS** - Professional styling for PDFs
7. **Add avatar image** - Personalize the site
8. **Test and refine** - Ensure everything works together
