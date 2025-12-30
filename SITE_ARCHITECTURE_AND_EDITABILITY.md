# JetBundle Website - Architecture, Structure & Editability Guide

**Generated:** 2025-01-09
**Purpose:** Complete technical documentation of the website architecture, how everything works, how to edit it, and the new structure for the "Neo-Alexandria" pivot.

---

## Executive Summary: The Pivot

**Old Vision:** Textbook hosting site with differential equations content
**New Vision:** Digital manifesto and operational base - "The Neo-Alexandria"

The website is now a **filter** that signals to visitors whether they belong here. It is a minimalist portal that:
1. Declares the Doctrine (philosophy of "Mathematics Ex Nihilo" and Trinity Rules)
2. Houses the Library (Initial Conditions curriculum: Books + YouTube)
3. Signals the Nexus (Discord, X, GitHub)

**Design Aesthetic:** Dark mode (terminal/void style), high contrast, serif fonts for headers, no marketing fluff.

---

## Current Site Architecture

### Technology Stack

- **Static Site Generator:** Jekyll (GitHub Pages compatible)
- **Theme:** `jekyll-theme-potato-hacker` (remote theme from luxedo)
- **Base Theme:** Dark mode
- **Math Rendering:** KaTeX (client-side, works on GitHub Pages)
- **Markdown Processor:** Kramdown with GFM input
- **Deployment:** GitHub Pages (automatic on push to `main`)

### File Structure

```
jetbundle.github.io/
├── _config.yml              # Site configuration (Jekyll settings)
├── index.md                 # Landing page (Home / Event Horizon)
├── Gemfile                  # Ruby dependencies
├── LICENSE                  # MIT License with non-commercial restriction
│
├── _pages/                  # Main content pages (Jekyll collection)
│   ├── about.md            # ⚠️ TO BE REPLACED → doctrine.md
│   ├── resources.md        # ⚠️ TO BE REPLACED → library.md
│   ├── blog.md             # ⚠️ TO BE REPLACED → transmissions.md
│   ├── community.md        # ⚠️ TO BE REPLACED → nexus.md
│   ├── disclaimer.md        # Legal disclaimers (keep)
│   └── license.md          # License info (keep)
│
├── _layouts/               # Page templates
│   └── default.html        # Main layout (includes header, footer, background)
│
├── _includes/              # Reusable HTML components
│   ├── header.html         # Navigation bar (⚠️ NEEDS UPDATE for new pages)
│   ├── footer.html         # Footer component
│   ├── head.html           # HTML head (meta tags, CSS, JS)
│   └── ...                 # Other includes
│
├── _posts/                 # Blog posts (Jekyll posts collection)
│   └── (empty)             # ⚠️ TO BE CLEANED
│
├── assets/                 # Static assets (CSS, JS, images)
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   ├── img/               # Images
│   └── pdfs/              # PDF files
│
├── diffequations/          # ⚠️ TO BE DELETED (moving out of website)
│   └── (61 HTML files)    # Static HTML textbook content
│
└── .github/                # GitHub Actions workflows (if any)
```

---

## How Jekyll Works

### Page Rendering Process

1. **Jekyll reads `_config.yml`** to understand site settings, collections, and plugins
2. **Processes Markdown files** in `_pages/` collection (converts `.md` → HTML)
3. **Applies layouts** from `_layouts/` (wraps content in HTML structure)
4. **Includes components** from `_includes/` (header, footer, etc.)
5. **Generates static HTML** files in `_site/` directory
6. **GitHub Pages serves** the `_site/` directory (or root if configured)

### Collections System

**Current Collection: `pages`**
- **Location:** `_pages/` directory
- **Output:** `true` (generates pages)
- **Permalink:** `/:name/` (e.g., `about.md` → `/about/`)
- **Layout:** Specified in front matter (default: `page`)

**How to Add a New Page:**
1. Create a `.md` file in `_pages/`
2. Add front matter:
```yaml
---
layout: page
title: Page Title
description: Page description
permalink: /custom-url/
---
```
3. Write content in Markdown
4. Jekyll automatically generates the page at the permalink

### Front Matter

Every page needs YAML front matter at the top:
```yaml
---
layout: page          # Which layout template to use
title: Page Title     # Page title (shown in browser tab and header)
description: Meta description for SEO
permalink: /url/      # Custom URL (optional, defaults to /:name/)
class: custom-class   # Optional CSS class for styling
---
```

---

## Navigation System

### Current Navigation

**File:** `_includes/header.html`

**Current Links:**
- Home (`/`) → `index.md`
- About (`/about/`) → `_pages/about.md`
- Resources (`/resources/`) → `_pages/resources.md`
- Blog (`/blog/`) → `_pages/blog.md`
- Community (`/community/`) → `_pages/community.md`

### How Navigation Works

1. **Header HTML** is included in every page via `_layouts/default.html`
2. **Links are hardcoded** in `_includes/header.html`
3. **Styling** comes from theme CSS + custom CSS in `assets/css/`

**To Update Navigation:**
1. Edit `_includes/header.html`
2. Change link text and URLs
3. Navigation updates site-wide automatically

---

## Current Pages (Before Pivot)

### 1. Landing Page (`index.md`)
- **URL:** `/`
- **Layout:** `page` with `landing-page` class
- **Content:** Simple hero section with title, subtitle, "Learn more" button
- **Status:** ⚠️ **NEEDS COMPLETE REWRITE** → "The Event Horizon"

### 2. About Page (`_pages/about.md`)
- **URL:** `/about/`
- **Content:** Personal laboratory philosophy
- **Status:** ⚠️ **TO BE REPLACED** → `doctrine.md`

### 3. Resources Page (`_pages/resources.md`)
- **URL:** `/resources/`
- **Content:** Links to differential equations textbook
- **Status:** ⚠️ **TO BE REPLACED** → `library.md`
- **⚠️ CONTAINS LINK TO `/diffequations/`** (line 16) - **MUST BE REMOVED**

### 4. Blog Page (`_pages/blog.md`)
- **URL:** `/blog/`
- **Content:** Placeholder text
- **Status:** ⚠️ **TO BE REPLACED** → `transmissions.md`

### 5. Community Page (`_pages/community.md`)
- **URL:** `/community/`
- **Content:** Placeholder text
- **Status:** ⚠️ **TO BE REPLACED** → `nexus.md`

### 6. Disclaimer Page (`_pages/disclaimer.md`)
- **URL:** `/disclaimer/`
- **Status:** ✅ **KEEP** (legal requirements)

### 7. License Page (`_pages/license.md`)
- **URL:** `/license/`
- **Status:** ✅ **KEEP** (legal requirements)

---

## Links to Remove (Differential Equations References)

### ⚠️ CRITICAL: All References to `/diffequations/` Must Be Removed

**Found References:**

1. **`_pages/resources.md` (Line 16)**
   ```markdown
   **Recommendation**: Start with [A Survey of Differential Equations and their Algebraic Geometry](/diffequations/) (Infrastructure in development)
   ```
   **Action:** Remove entire "Start Here: Differential Equations" section

2. **`_pages/resources.md` (Line 70)**
   ```markdown
   1. **Start with Differential Equations**
   ```
   **Action:** Remove or rewrite this section

3. **Navigation links** (if any exist in header/footer)
   - Check `_includes/header.html` ✅ (no diffequations links found)
   - Check `_includes/footer.html` (verify)

4. **Any other internal links** in markdown files
   - Search for `/diffequations/` in all `.md` files

---

## New Site Structure: The 5 Core Pages

### 1. Home / The Event Horizon (`index.md`)

**Goal:** Immediate immersion. No "Hello, I am a student." Straight into the fire.

**Structure:**
- **Hero Section:** Welcome to the jetspace statement
- **The Hook:** Brief statement on "Maximum Density" vs. "Zero-Order Information"
- **Call to Actions:**
  - [ENTER THE LIBRARY] (Primary Button → `/library/`)
  - [JOIN THE DISCORD] (Secondary Button → Discord invite)
- **Footer:** "LLM assistance used for organization. Verify reality in the Discord."

**File to Edit:** `index.md`

---

### 2. The Doctrine (`_pages/doctrine.md`)

**Replaces:** `_pages/about.md`
**URL:** `/doctrine/`
**Goal:** The philosophical bedrock.

**Structure:**
- **Section 1: The Trinity Rules**
  1. Seek truth with rigor and humility.
  2. Create stuff that is useful and/or beautiful.
  3. No other rules (save TOS).
- **Section 2: Mathematics Ex Nihilo**
  - Text about building math from physics/metaphysics, not Platonic discovery
- **Section 3: The Operator**
  - Brief, humble footer about you (Jetbundle)
  - Links to X and GitHub

**File to Create:** `_pages/doctrine.md` (new file)
**File to Delete:** `_pages/about.md` (after creating doctrine.md)

---

### 3. The Library (`_pages/library.md`)

**Replaces:** `_pages/resources.md`
**URL:** `/library/`
**Goal:** The curriculum. Not just a list of links, but a *path*.

**Structure:**
- **Head:** "The Initial Conditions." (Quote: "Strong foundation takes priority over any applied field.")
- **YouTube Playlist Embed:** "The Initial Conditions" playlist at top
- **5 Accordions/Cards** (based on Discord channels):
  1. **Philosophical Mathematics:** (Schmidt, Lawvere)
  2. **Continuum Analysis:** (Abbott, Ahlfors, Kolmogorov, Williams)
  3. **Invariance Algebra:** (Shilov, Hall, Lang)
  4. **Geometry & Representation:** (Brown, Sternberg, Kostrikin, etc.)
  5. **Mathematical Physics:** (Arnold, Nomizu, Atiyah, Costello)
- **Integration:** Next to book titles, add badges/links to relevant **GitHub Repos**

**File to Create:** `_pages/library.md` (new file)
**File to Delete:** `_pages/resources.md` (after creating library.md)

---

### 4. Transmissions (`_pages/transmissions.md`)

**Replaces:** `_pages/blog.md`
**URL:** `/transmissions/`
**Goal:** A feed of *output*, not "blog posts."

**Structure:**
- **Concept:** Auto-embeds latest **YouTube videos**
- **Displays cards** for major **GitHub releases** (e.g., "v1.0 of Physics Engine released")
- **Why:** Acts as the broadcast station for the Jetspace

**Implementation:**
- For now: Hardcode top 3 YouTube videos using HTML iframes
- Later: Script to fetch automatically

**File to Create:** `_pages/transmissions.md` (new file)
**File to Delete:** `_pages/blog.md` (after creating transmissions.md)

---

### 5. The Nexus (`_pages/nexus.md`)

**Replaces:** `_pages/community.md`
**URL:** `/nexus/`
**Goal:** The live wire.

**Structure:**
- **Discord:** Large, stylized invite card. "The main work is done here."
- **X (Twitter):** Embed feed to show real-time thought streams
- **GitHub:** "Fork our Logic." Link to organization/repo list

**File to Create:** `_pages/nexus.md` (new file)
**File to Delete:** `_pages/community.md` (after creating nexus.md)

---

## How to Edit the Site

### Editing Content Pages

**Location:** `_pages/*.md` files

**Process:**
1. Open the `.md` file in your editor
2. Edit the Markdown content
3. Save and commit to Git
4. Push to GitHub
5. GitHub Pages automatically rebuilds and deploys (takes ~1-2 minutes)

**Markdown Syntax:**
- Headers: `# H1`, `## H2`, `### H3`
- Links: `[text](url)`
- Bold: `**text**`
- Italic: `*text*`
- Lists: `- item` or `1. item`
- Code: `` `code` `` or ` ```language code block ``` `

### Editing Navigation

**Location:** `_includes/header.html`

**Current Structure:**
```html
<nav class="navbar site-navbar">
  <div class="navbar-container">
    <a href="/" class="navbar-brand">jetbundle</a>
    <div class="navbar-menu">
      <a href="/about/" class="navbar-link">About</a>
      <a href="/resources/" class="navbar-link">Resources</a>
      <a href="/blog/" class="navbar-link">Blog</a>
      <a href="/community/" class="navbar-link">Community</a>
    </div>
  </div>
</nav>
```

**To Update for New Structure:**
```html
<div class="navbar-menu">
  <a href="/doctrine/" class="navbar-link">Doctrine</a>
  <a href="/library/" class="navbar-link">Library</a>
  <a href="/transmissions/" class="navbar-link">Transmissions</a>
  <a href="/nexus/" class="navbar-link">Nexus</a>
</div>
```

### Editing Styling

**Location:** `assets/css/` or theme CSS

**Process:**
1. Check if theme has CSS variables in `_sass/`
2. Override in `assets/css/custom.css` (if exists)
3. Or create new CSS file and link in `_includes/head.html`

**New Color Palette:**
- Background: `#0a0a0a` (Near Black)
- Text: `#e5e5e5` (Off-white)
- Accent: `#ff4500` (Jet Orange - use sparingly for links and buttons)

### Editing Layout

**Location:** `_layouts/default.html`

**Structure:**
- Includes `head.html` (meta, CSS, JS)
- Includes `header.html` (navigation)
- Renders page content (`{{ content }}`)
- Includes `footer.html`
- Custom footer with copyright

**To Modify:**
- Edit `_layouts/default.html` directly
- Changes apply to all pages using `layout: page`

### Editing Site Configuration

**Location:** `_config.yml`

**Key Settings:**
- `title`: Site title
- `description`: Site description
- `url`: Base URL
- `collections`: Defines `pages` collection
- `plugins`: Jekyll plugins enabled
- `exclude`: Files/directories to exclude from build

**To Add New Collection:**
```yaml
collections:
  pages:
    output: true
    permalink: /:name/
  new_collection:
    output: true
    permalink: /new/:name/
```

---

## Migration Plan: Old → New Structure

### Phase 1: Content Creation

1. ✅ **Create `_pages/doctrine.md`**
   - Write Trinity Rules
   - Write Mathematics Ex Nihilo section
   - Add Operator section with links

2. ✅ **Create `_pages/library.md`**
   - Add YouTube playlist embed
   - Create 5 accordions/cards for Discord channels
   - Add book lists with GitHub repo links

3. ✅ **Create `_pages/transmissions.md`**
   - Add YouTube video embeds (hardcoded for now)
   - Add GitHub release cards

4. ✅ **Create `_pages/nexus.md`**
   - Add Discord invite card
   - Add X/Twitter feed embed
   - Add GitHub organization links

5. ✅ **Rewrite `index.md`**
   - New hero section
   - Add call-to-action buttons
   - Update footer message

### Phase 2: Navigation Update

1. ✅ **Update `_includes/header.html`**
   - Change "About" → "Doctrine"
   - Change "Resources" → "Library"
   - Change "Blog" → "Transmissions"
   - Change "Community" → "Nexus"
   - Update URLs to match new permalinks

2. ✅ **Update `index.md`**
   - Change "Learn more" button link from `/about` → `/doctrine`
   - Update "ENTER THE LIBRARY" button to `/library/`

### Phase 3: Cleanup

1. ✅ **Delete old pages:**
   - `_pages/about.md` (replaced by `doctrine.md`)
   - `_pages/resources.md` (replaced by `library.md`)
   - `_pages/blog.md` (replaced by `transmissions.md`)
   - `_pages/community.md` (replaced by `nexus.md`)

2. ✅ **Remove diffequations references:**
   - Remove `/diffequations/` link from `resources.md` (before deletion)
   - Search all `.md` files for `/diffequations/` references
   - Remove any navigation links to diffequations

3. ✅ **Delete `diffequations/` directory:**
   - **⚠️ BACKUP FIRST** (copy to local storage)
   - Delete entire `diffequations/` folder from repository
   - Update `_config.yml` to exclude it (if not already)

4. ✅ **Clean `_posts/` directory:**
   - Remove any placeholder posts
   - Keep directory structure (Jekyll may need it)

### Phase 4: Visual Identity

1. ✅ **Update CSS color palette:**
   - Background: `#0a0a0a`
   - Text: `#e5e5e5`
   - Accent: `#ff4500`

2. ✅ **Update typography:**
   - Serif fonts for headers
   - High contrast text

3. ✅ **Remove marketing fluff:**
   - Simplify language
   - Remove unnecessary explanations
   - Focus on density

---

## Technical Execution Checklist

### Immediate Actions

- [ ] **Remove diffequations link from `_pages/resources.md`** (line 16)
- [ ] **Create `_pages/doctrine.md`** with new content
- [ ] **Create `_pages/library.md`** with YouTube embed and book lists
- [ ] **Create `_pages/transmissions.md`** with YouTube embeds
- [ ] **Create `_pages/nexus.md`** with Discord, X, GitHub links
- [ ] **Rewrite `index.md`** with new Event Horizon content
- [ ] **Update `_includes/header.html`** with new navigation
- [ ] **Delete old pages:** `about.md`, `resources.md`, `blog.md`, `community.md`
- [ ] **Delete `diffequations/` directory** (after backup)
- [ ] **Update CSS** with new color palette
- [ ] **Test all links** work correctly
- [ ] **Verify no broken links** to diffequations

### Files to Create

1. `_pages/doctrine.md`
2. `_pages/library.md`
3. `_pages/transmissions.md`
4. `_pages/nexus.md`

### Files to Edit

1. `index.md` (complete rewrite)
2. `_includes/header.html` (update navigation)
3. `assets/css/` (update colors, typography)
4. `_config.yml` (verify no diffequations references)

### Files to Delete

1. `_pages/about.md`
2. `_pages/resources.md`
3. `_pages/blog.md`
4. `_pages/community.md`
5. `diffequations/` (entire directory - **BACKUP FIRST**)

---

## Site Editability Summary

### What You Can Edit Easily

✅ **Content Pages** (`_pages/*.md`)
- Just edit Markdown files
- Changes appear after Git push

✅ **Navigation** (`_includes/header.html`)
- Edit HTML directly
- Updates site-wide

✅ **Styling** (`assets/css/`)
- Override theme CSS
- Or modify theme variables

✅ **Landing Page** (`index.md`)
- Edit Markdown or HTML
- Simple structure

### What Requires More Care

⚠️ **Layouts** (`_layouts/default.html`)
- Affects all pages
- Test thoroughly before deploying

⚠️ **Configuration** (`_config.yml`)
- Can break site if misconfigured
- Test locally first

⚠️ **Theme Updates**
- Remote theme may update
- Custom CSS may need adjustment

### Best Practices

1. **Test Locally First:**
   ```bash
   bundle install
   bundle exec jekyll serve
   ```
   Visit `http://localhost:4000` to preview

2. **Commit Frequently:**
   - Small, focused commits
   - Clear commit messages

3. **Check Links:**
   - Verify all internal links work
   - Test navigation

4. **Validate Markdown:**
   - Use a Markdown linter
   - Check for broken syntax

---

## Current Site Status

### ✅ Working

- Jekyll site structure
- GitHub Pages deployment
- Theme integration
- Navigation system
- Math rendering (KaTeX)
- Basic pages rendering

### ⚠️ Needs Update

- All 5 main pages (content outdated)
- Navigation links (point to old pages)
- Styling (needs new color palette)
- Links to diffequations (must be removed)

### 🚫 To Be Removed

- `diffequations/` directory (entire folder)
- Old page files (`about.md`, `resources.md`, `blog.md`, `community.md`)
- Any references to `/diffequations/` in content

---

## Next Steps

1. **Review this document** to understand the architecture
2. **Create new page files** with the Neo-Alexandria content
3. **Update navigation** to point to new pages
4. **Remove all diffequations references**
5. **Delete old files** and `diffequations/` directory
6. **Test locally** before pushing to GitHub
7. **Deploy** and verify live site

---

**Last Updated:** 2025-01-09
**Status:** Ready for massive edits - Neo-Alexandria pivot
