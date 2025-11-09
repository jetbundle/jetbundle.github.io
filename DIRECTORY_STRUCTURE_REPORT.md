# Directory Structure Report & Cleanup Plan

**Generated:** 2025-01-09
**Goal:** Consolidate site structure to fit within four main categories: About, Resources, Blog, Community

---

## Current Structure Analysis

### ✅ **Core Navigation Pages** (Keep)
- `_pages/principal.md` → **About** (`/principal`)
- `_pages/resources.md` → **Resources** (`/resources`)
- `_pages/blog.md` → **Blog** (`/blog`)
- `_pages/community.md` → **Community** (`/community`)

### ✅ **Essential Pages** (Keep)
- `_pages/disclaimer.md` → Legal disclaimers (linked from principal)
- `_pages/license.md` → License information (linked from principal)
- `index.md` → Landing page

### ⚠️ **Pages to Consolidate** (Move/Remove)
- `_pages/stacks.md` → **MOVE** content to `resources.md` (stacks are resources)
- `_pages/cartography.md` → **MOVE** content to `principal.md` (cartography is part of the base space concept)
- `_pages/booklist.md` → **KEEP** but ensure it's linked from `resources.md`
- `_pages/archive.md` → **KEEP** but ensure it's linked from `resources.md`

### ✅ **Collections** (Keep - These are the "Fibers")
- `_c3i_stack/` → C3I & Surveillance Stack (4 files)
  - `01_intro.md`
  - `ai-audit.md`
  - `graph-theory.md`
  - `os-audit.md`
- `_physics_stack/` → Ballistics & Hydrodynamics Stack (3 files)
  - `01_intro.md`
  - `celestial-mechanics.md`
  - `hydrodynamics.md`
- `_finance_stack/` → Military-Financial Stack (3 files)
  - `01_intro.md`
  - `hft-audit.md`
  - `qf-audit.md`

### ⚠️ **Navigation Files** (Simplify)
- `_dropdown/about.md` → **REMOVE** (just navigation item, no content needed)
- `_dropdown/resources.md` → **REMOVE** (just navigation item, no content needed)
- `_dropdown/blog.md` → **REMOVE** (just navigation item, no content needed)
- `_dropdown/community.md` → **REMOVE** (just navigation item, no content needed)

**Note:** The `_dropdown` collection was used for theme navigation, but we now use custom header. These files are no longer needed.

### ✅ **Empty/Unused Directories** (Keep for future use)
- `_posts/` → Empty, but keep for future blog posts
- `_data/` → Empty, but keep for future data files
- `_sass/` → Theme files (keep, managed by theme)

---

## Recommended Structure

### **Navigation Structure:**
```
About (/principal)
├── Main content: principal.md
├── Includes: cartography.md content (merged)
├── Links to: disclaimer.md, license.md

Resources (/resources)
├── Main content: resources.md
├── The Stacks section (links to collections)
│   ├── C3I Stack → /c3i_stack/01_intro/
│   ├── Physics Stack → /physics_stack/01_intro/
│   └── Finance Stack → /finance_stack/01_intro/
├── Booklist → /booklist/
└── Primary Sources → /archive/

Blog (/blog)
├── Main content: blog.md
└── Future posts: _posts/ (empty for now)

Community (/community)
└── Main content: community.md
```

### **File Organization:**
```
jetbundle.github.io/
├── _pages/                    # Main pages
│   ├── principal.md          # About page (merge cartography content here)
│   ├── resources.md          # Resources page (merge stacks content here)
│   ├── blog.md               # Blog page
│   ├── community.md          # Community page
│   ├── booklist.md           # Booklist (linked from resources)
│   ├── archive.md            # Archive (linked from resources)
│   ├── disclaimer.md         # Legal (linked from principal)
│   └── license.md            # License (linked from principal)
│
├── _c3i_stack/               # C3I Stack collection (keep)
├── _physics_stack/           # Physics Stack collection (keep)
├── _finance_stack/           # Finance Stack collection (keep)
│
├── _dropdown/                # REMOVE - no longer needed
├── _posts/                   # Keep empty for future blog posts
├── _data/                    # Keep empty for future data
│
├── index.md                  # Landing page
├── _config.yml               # Site configuration
└── assets/                   # CSS, JS, images
```

---

## Cleanup Actions Required

### **1. Consolidate Pages**

#### **Merge `cartography.md` into `principal.md`**
- Cartography content (Base Space) is part of the principal/about page concept
- Move cartography content to principal.md as a new section
- Remove `_pages/cartography.md`

#### **Merge `stacks.md` into `resources.md`**
- Stacks are resources, so they belong in resources.md
- Move stacks content to resources.md
- Update `resources.md` to include:
  - The Stacks (C3I, Physics, Finance)
  - Booklist
  - Primary Sources (Archive)
- Remove `_pages/stacks.md`

### **2. Remove Unused Navigation Files**

#### **Remove `_dropdown/` collection files**
- `_dropdown/about.md` → Remove (navigation handled by header.html)
- `_dropdown/resources.md` → Remove
- `_dropdown/blog.md` → Remove
- `_dropdown/community.md` → Remove

**Note:** Keep `dropdown` collection in `_config.yml` if theme requires it, but files can be empty/minimal.

### **3. Update `_config.yml`**

#### **Collections to keep:**
```yaml
collections:
  c3i_stack:
    output: true
  physics_stack:
    output: true
  finance_stack:
    output: true
  dropdown:
    output: true  # Keep if theme requires it, but files can be minimal
  items:
    output: true  # Remove if not used
```

#### **Remove unused collections:**
- `items` collection (if not used)

### **4. Update Navigation Links**

#### **Ensure all pages are accessible:**
- About → `/principal`
- Resources → `/resources` (with links to stacks, booklist, archive)
- Blog → `/blog`
- Community → `/community`

#### **Internal linking:**
- `principal.md` should link to disclaimer.md and license.md
- `resources.md` should link to:
  - `/c3i_stack/01_intro/`
  - `/physics_stack/01_intro/`
  - `/finance_stack/01_intro/`
  - `/booklist/`
  - `/archive/`

---

## Implementation Plan

### **Phase 1: Content Consolidation**
1. ✅ Merge `cartography.md` content into `principal.md`
2. ✅ Merge `stacks.md` content into `resources.md`
3. ✅ Update `resources.md` to include all resource sections
4. ✅ Remove `cartography.md` and `stacks.md`

### **Phase 2: Navigation Cleanup**
1. ✅ Remove `_dropdown/*.md` files (or make them minimal)
2. ✅ Update `_config.yml` to remove unused collections
3. ✅ Verify navigation links in header.html

### **Phase 3: Verification**
1. ✅ Test all navigation links
2. ✅ Verify all pages are accessible
3. ✅ Check internal linking
4. ✅ Ensure footer is at bottom (already fixed)

---

## Final Structure Summary

### **Four Main Categories:**

1. **About** (`/principal`)
   - Main content: principal.md
   - Includes: cartography content (merged)
   - Links: disclaimer.md, license.md

2. **Resources** (`/resources`)
   - Main content: resources.md
   - Includes: stacks content (merged)
   - Links:
     - C3I Stack (`/c3i_stack/01_intro/`)
     - Physics Stack (`/physics_stack/01_intro/`)
     - Finance Stack (`/finance_stack/01_intro/`)
     - Booklist (`/booklist/`)
     - Archive (`/archive/`)

3. **Blog** (`/blog`)
   - Main content: blog.md
   - Future posts: `_posts/` (empty for now)

4. **Community** (`/community`)
   - Main content: community.md

### **Supporting Pages:**
- `disclaimer.md` (linked from principal)
- `license.md` (linked from principal)
- `booklist.md` (linked from resources)
- `archive.md` (linked from resources)

### **Collections (The "Fibers"):**
- `_c3i_stack/` (4 files)
- `_physics_stack/` (3 files)
- `_finance_stack/` (3 files)

---

## Files to Remove

1. `_pages/cartography.md` → Content merged into `principal.md`
2. `_pages/stacks.md` → Content merged into `resources.md`
3. `_dropdown/about.md` → No longer needed
4. `_dropdown/resources.md` → No longer needed
5. `_dropdown/blog.md` → No longer needed
6. `_dropdown/community.md` → No longer needed

---

## Next Steps

1. ✅ Fix footer to be at bottom (completed)
2. ⏳ Merge cartography.md into principal.md
3. ⏳ Merge stacks.md into resources.md
4. ⏳ Remove unused _dropdown files
5. ⏳ Update _config.yml
6. ⏳ Test all links
7. ⏳ Deploy changes

---

## Notes

- **Collections are the "Fibers"**: The three stack collections (`_c3i_stack`, `_physics_stack`, `_finance_stack`) represent the applied stacks and should remain as collections.
- **Navigation is custom**: We use `_includes/header.html` for navigation, so `_dropdown` files are no longer needed.
- **Future expansion**: `_posts/` and `_data/` directories are kept empty for future use (blog posts, data files).
- **Theme compatibility**: Keep theme structure intact (SVG layers, background divs, etc.) while customizing content organization.
