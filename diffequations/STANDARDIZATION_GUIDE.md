# Standardization Guide: Transforming to Canonical Template

## Executive Summary

This guide outlines the comprehensive plan to transform all 61 HTML pages from their current structure to the new canonical template. The transformation will create a unified, narratively-driven experience where every section follows the same structural rhythm: Hook → Narrative → Crisis → Victory → Challenges → Cliffhanger → References → Navigation.

**Status**: Analysis complete. Ready for manual transformation.

**Estimated Scope**: 63 HTML files need structural transformation:
- 61 Section pages (1.1 through 7.8)
- 1 Main Index page (`/diffequations/index.html`)
- 7 Chapter Index pages (`/diffequations/chapter-XX/index.html`)
- 1 Epilogue page (`/diffequations/epilogue/index.html`)

---

## Current State Analysis

### What We Have Now

**Current Structure (Sample from 01-1-exact-methods/index.html):**
- ✅ KaTeX loading (correct format)
- ✅ Basic hook structure (header.hook exists)
- ✅ Description line present
- ✅ Content in `<article>` tags
- ✅ Some sections have challenges (52/61 pages)
- ❌ No semantic blocks (.theorem, .definition, .example)
- ❌ No final cliffhanger div
- ❌ No widget classification (crisis/victory/bridge)
- ❌ Inconsistent navigation structure
- ❌ Missing narrative-intro sections
- ❌ Math formatting inconsistent (uses `|` instead of `\vert`)

**Current CSS:**
- ✅ Dark theme variables defined
- ✅ Basic widget-module styles exist
- ❌ Missing hook styles (gradient background)
- ❌ Missing semantic block styles (.theorem, .definition, .example)
- ❌ Missing cliffhanger styles
- ❌ Missing widget type styles (crisis-widget, victory-widget, bridge-widget)

**Current Widget Status:**
- 0 pages currently have widgets
- Widget infrastructure exists but not implemented

---

## Target State: Canonical Template

### Global Head (Identical on Every Page)

**Every single page must use this exact head structure:**

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exact Title of This Page</title>
  <meta name="description" content="One devastating sentence for SEO">
  
  <!-- KaTeX – simplified, identical everywhere -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"
    onload="renderMathInElement(document.body, {delimiters: [{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}], throwOnError:false});">
  </script>
  
  <link rel="stylesheet" href="/diffequations/styles.css">
  <script src="/diffequations/navigation-data.js"></script>
  <script src="/diffequations/navigation.js"></script>
  
  <!-- Only the main index keeps the animated background -->
  <!-- <script src="/diffequations/manifold-background.js" defer></script> -->
</head>
```

**Key Points:**
- KaTeX loading is simplified (no complex inline scripts)
- Navigation scripts in head (not body)
- Manifold background ONLY on main index (commented out elsewhere)

### Page Type Hierarchy

Different page types have different required elements:

| Page Type | Hook | Description | Narrative Intro | Challenges | Final Cliffhanger | References | Navigation |
|-----------|------|------------|-----------------|------------|-------------------|------------|------------|
| **Main Index** | Yes | Yes | No | No | No | No | No |
| **Chapter Index** | Yes | Yes | Yes (3 paras) | No | Yes | Yes | Yes |
| **Normal Section** (1.1–7.8) | Yes | Yes | Yes (2-4 paras) | Yes | Yes | Yes | Yes |
| **Epilogue** | Yes | Yes | Yes (3 paras) | Optional | Yes (huge) | Yes | Yes |

### Mandatory Structure (Section Pages: 1.1–7.8)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- KaTeX (simplified, identical everywhere) -->
  <!-- styles.css -->
</head>
<body>
<main>
  <!-- 1. HOOK (mandatory) -->
  <header class="hook">
    <h1>Chapter X.Y: Title</h1>
    <p class="hook-text">≤22 words, devastating sentence</p>
    <p class="hook-subtitle">≤15 words, question preferred (optional)</p>
  </header>

  <!-- 2. DESCRIPTION (mandatory) -->
  <p class="description">SEO-friendly description</p>

  <article>
    <!-- 3. NARRATIVE INTRO (2-4 paragraphs) -->
    <section class="narrative-intro">...</section>

    <!-- 4. CORE CONTENT (sections with rhythm) -->
    <section>
      <h2>First Core Idea</h2>
      <div class="theorem">...</div>
      <div class="example">...</div>
      <div class="cliffhanger">But this works only when...</div>
    </section>

    <!-- 5. MASTERY CHALLENGES (mandatory, 2-3 minimum) -->
    <section class="challenges">
      <h2>Mastery Challenges</h2>
      <details>
        <summary>Challenge 1 [★★☆] Title</summary>
        <p>Statement...</p>
        <details><summary>Solution</summary>...</details>
      </details>
    </section>

    <!-- 6. FINAL CLIFFHANGER (mandatory, single paragraph) -->
    <div class="cliffhanger final">
      <p>We have exhausted every classical trick...</p>
    </div>

    <!-- 7. KEY REFERENCES (mandatory) -->
    <section class="references">
      <h2>Key References</h2>
      <ul>...</ul>
    </section>

    <!-- 8. NAVIGATION (mandatory, at very end) -->
    <nav class="navigation">
      <hr>
      <ul>
        <li>Next → <a href="...">X.Y+1 Next Section</a></li>
        <li><a href="../">Chapter X Contents</a></li>
        <li><a href="/diffequations/">Full Table of Contents</a></li>
      </ul>
    </nav>
  </article>
</main>
</body>
</html>
```

### Main Index Template (`/diffequations/index.html`)

**Structure:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Use global head template above -->
  <!-- UNCOMMENT manifold-background.js for main index only -->
  <script src="/diffequations/manifold-background.js" defer></script>
</head>
<body>
<main>
  <header class="hook">
    <h1>A Survey of Differential Equations<br>and their Algebraic Geometry</h1>
    <p class="hook-text">
      We begin believing every differential equation has an explicit formula.
      By the end we realize the formula was never the point — the invariant was.
    </p>
    <p class="hook-subtitle">This is the story of how mathematics kills its own children to grow stronger.</p>
  </header>
  
  <p class="description">J. Saucedo • 2025 • An ascent from explicit solutions to categorical resolution</p>
  
  <article class="toc-article">
    <h2>The Seven Ascents</h2>
    <ol class="seven-ascents">
      <li>Chapter 1 – Classical Explicit & Quasi-Explicit Arsenal</li>
      <li>Chapter 2 – Functional Analysis, Distributions & Weak Solutions</li>
      <li>Chapter 3 – Tensor Fields, Conservation Laws & Geometric Formulation</li>
      <li>Chapter 4 – Symmetry, Lie Theory & Classical Integrability</li>
      <li>Chapter 5 – Stochastic, Rough, Fractional & Nonlocal Dynamics</li>
      <li>Chapter 6 – Jet Bundles, Exterior Differential Systems & Intrinsic PDEs</li>
      <li>Chapter 7 – Microlocal Analysis, D-Modules & Categorical Resolution</li>
    </ol>
    
    <h2>Complete Table of Contents</h2>
    <div class="toc-grid">
      <section class="toc-chapter">
        <h3>Chapter 1 Classical Explicit & Quasi-Explicit Arsenal</h3>
        <p class="chapter-tagline">The Rise and Fall of the Specific Solution</p>
        <ul>
          <li><a href="/diffequations/chapter-01/">Chapter 1 Introduction</a></li>
          <li><a href="/diffequations/chapter-01/01-1-exact-methods/">1.1 Exact Methods</a></li>
          <!-- ... all other sections ... -->
        </ul>
      </section>
      <!-- Repeat for Chapters 2–7 -->
    </div>
    
    <h3>Epilogue</h3>
    <ul>
      <li><a href="/diffequations/epilogue/">The Eternal Structure</a></li>
    </ul>
  </article>
</main>
<script defer src="/diffequations/js/textbook-engine.js"></script>
<script defer src="/diffequations/js/widget-engine.js"></script>
<script src="/diffequations/manifold-background.js" defer></script>
</body>
</html>
```

**Key Differences from Section Pages:**
- No narrative intro
- No challenges
- No final cliffhanger
- No references
- No navigation block
- Has "Seven Ascents" list
- Has TOC grid with chapter sections
- Manifold background script is active (not commented)

### Chapter Index Template (`/diffequations/chapter-XX/index.html`)

**Structure:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Use global head template (manifold-background.js commented) -->
</head>
<body>
<main>
  <header class="hook">
    <h1>Chapter X: Chapter Title</h1>
    <p class="hook-text">
      Explicit formulas are the dream of classical physics — but they die the moment the vector field refuses to flatten.
    </p>
    <p class="hook-subtitle">This chapter is their funeral.</p>
  </header>
  
  <p class="description">The Rise and Fall of the Specific Solution</p>
  
  <article>
    <section class="narrative-intro">
      <p>We begin with the most optimistic assumption in all of mathematics: that every differential equation has an explicit, closed-form solution we can write down with pen and paper.</p>
      <p>Over the next seven sections we will watch this dream shatter — beautifully, irreversibly, and with perfect logical necessity.</p>
      <p>Each method will be born, celebrated, pushed to its absolute limit, and then murdered by a single counterexample that forces us to the next paradigm.</p>
    </section>
    
    <h2>Chapter Contents</h2>
    <ol class="chapter-contents">
      <li><a href="/diffequations/chapter-XX/XX-Y-section/">X.Y Section Title</a></li>
      <!-- ... all sections in chapter ... -->
    </ol>
    
    <div class="cliffhanger final">
      <p>
        When this chapter ends, the explicit solution will be dead.
        What rises from its grave is the true subject of this book:
        the eternal, coordinate-independent, cohomological structure that survives when formulas fail.
      </p>
    </div>
    
    <section class="references">
      <h2>Key References for Chapter X</h2>
      <ul>
        <li>Author – <em>Title</em></li>
        <!-- ... more references ... -->
      </ul>
    </section>
    
    <nav class="navigation">
      <hr>
      <ul>
        <li>Start the journey → <a href="/diffequations/chapter-XX/XX-1-first-section/">Section X.1: First Section</a></li>
        <li><a href="/diffequations/">Full Table of Contents</a></li>
      </ul>
    </nav>
  </article>
</main>
<script defer src="/diffequations/js/textbook-engine.js"></script>
<script defer src="/diffequations/js/widget-engine.js"></script>
</body>
</html>
```

**Key Differences from Section Pages:**
- Has narrative intro (3 paragraphs)
- No challenges section
- Has final cliffhanger (chapter-level conclusion)
- Has references (chapter-level)
- Has navigation (links to first section + TOC)
- Uses `<ol class="chapter-contents">` for section list

### Epilogue Template (`/diffequations/epilogue/index.html`)

**Structure:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Use global head template (manifold-background.js commented) -->
</head>
<body>
<main>
  <header class="hook">
    <h1>Epilogue: The Eternal Structure</h1>
    <p class="hook-text">
      We began chasing formulas. We end staring directly into the face of topology.
    </p>
    <p class="hook-subtitle">The ladder has been kicked away — and we are still standing.</p>
  </header>
  
  <p class="description">From explicit solutions to categorical invariants — the ascent is complete</p>
  
  <article>
    <section class="narrative-intro">
      <p>Seven chapters ago we believed a differential equation was solved when we could write $y(x) = \ldots$.</p>
      <p>Today we know the true solution is often an integer (an index), a cohomology class, or the simple statement "this system is holonomic."</p>
      <p>The formula was never the destination. It was only the first rung of an infinite ladder.</p>
    </section>
    
    <!-- Full epilogue text – keep existing content, wrap in <p> tags -->
    <!-- No extra headings needed, just flowing prose -->
    
    <div class="cliffhanger final" style="font-size:1.3rem; padding:3rem;">
      <p>
        The differential equation was never about finding functions.<br>
        It was the universe teaching us — in its own austere language —<br>
        that reality is algebraic geometry wearing the mask of calculus.
      </p>
    </div>
    
    <section class="references">
      <h2>References for the Entire Journey</h2>
      <ul>
        <li>Arnold – Mathematical Methods of Classical Mechanics</li>
        <li>Kashiwara – Algebraic Study of Systems of Partial Differential Equations</li>
        <!-- ... comprehensive references ... -->
      </ul>
    </section>
    
    <nav class="navigation">
      <hr>
      <ul>
        <li><a href="/diffequations/">Return to Table of Contents</a></li>
        <li><a href="/diffequations/chapter-07/07-8-higher-categories/">Revisit the Summit – Section 7.8</a></li>
      </ul>
    </nav>
  </article>
</main>
<script defer src="/diffequations/js/textbook-engine.js"></script>
<script defer src="/diffequations/js/widget-engine.js"></script>
</body>
</html>
```

**Key Differences from Section Pages:**
- Has narrative intro (3 paragraphs)
- Challenges optional (may have 1-2, but not required)
- Final cliffhanger is HUGE (larger font, more padding)
- References are comprehensive (entire journey)
- Navigation links back to TOC and to 7.8 (summit)

### Widget Placement Rules

**Three Widget Types:**
1. **Crisis Widget** (`crisis-widget` class): After showing a method fails
2. **Victory Widget** (`victory-widget` class): After presenting a working technique
3. **Bridge Widget** (`bridge-widget` class): Optional, before final cliffhanger

**Rules:**
- Maximum 3 widgets per section (most have 2: Crisis + Victory)
- Widgets must serve narrative arc
- Place immediately after relevant content paragraph
- **Note:** Widgets are for SECTION pages only, not index pages or epilogue

---

## Transformation Plan

### Phase 1: CSS Foundation (Do Once)

**File:** `diffequations/styles.css`

**Add these styles at the end of the file:**

```css
/* ============================================
   CANONICAL TEMPLATE STYLES
   ============================================ */

/* Hook Section */
.hook {
  text-align: center;
  padding: 3rem 1rem;
  background: linear-gradient(135deg, #0d47a1, #42a5f5);
  color: white;
  margin-bottom: 2rem;
  border-radius: 8px;
}

.hook-text {
  font-size: 1.6rem;
  font-weight: 600;
  margin: 1rem 0;
  line-height: 1.4;
}

.hook-subtitle {
  font-size: 1.25rem;
  font-weight: 400;
  font-style: italic;
  opacity: 0.9;
  margin-top: 0.5rem;
}

/* Description Line */
.description {
  text-align: center;
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  font-style: italic;
}

/* Narrative Introduction */
.narrative-intro {
  margin: 2rem 0;
  padding: 1.5rem;
  background: var(--bg-secondary);
  border-left: 4px solid var(--link-color);
  border-radius: 4px;
}

.narrative-intro p {
  margin: 1rem 0;
  line-height: 1.8;
}

/* Semantic Blocks */
.theorem {
  background: rgba(76, 175, 80, 0.1);
  border-left: 4px solid #4caf50;
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  border-radius: 4px;
}

.theorem::before {
  content: "Theorem: ";
  font-weight: 700;
  color: #4caf50;
}

.definition {
  background: rgba(33, 150, 243, 0.1);
  border-left: 4px solid #2196f3;
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  border-radius: 4px;
}

.definition::before {
  content: "Definition: ";
  font-weight: 700;
  color: #2196f3;
}

.example {
  background: rgba(255, 193, 7, 0.1);
  border-left: 4px solid #ffc107;
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  border-radius: 4px;
}

.example::before {
  content: "Example: ";
  font-weight: 700;
  color: #ffc107;
}

.proof {
  background: rgba(156, 39, 176, 0.1);
  border-left: 4px solid #9c27b0;
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  border-radius: 4px;
}

.proof::before {
  content: "Proof: ";
  font-weight: 700;
  color: #9c27b0;
}

/* Cliffhanger Blocks */
.cliffhanger {
  background: rgba(244, 67, 54, 0.15);
  padding: 1.5rem;
  border-left: 6px solid #f44336;
  font-weight: 600;
  margin: 2.5rem 0;
  border-radius: 4px;
  font-style: italic;
}

.cliffhanger.final {
  background: rgba(244, 67, 54, 0.25);
  font-size: 1.15rem;
  padding: 2rem;
  margin: 3rem 0;
  text-align: center;
}

.cliffhanger.final p {
  margin: 0;
  line-height: 1.8;
}

/* Challenges Section */
.challenges {
  margin: 3rem 0;
  padding: 2rem;
  background: var(--bg-secondary);
  border-radius: 8px;
}

.challenges h2 {
  margin-top: 0;
  color: var(--link-color);
  border-bottom: 2px solid var(--link-color);
  padding-bottom: 0.5rem;
}

.challenges details {
  margin: 1.5rem 0;
  padding: 1rem;
  background: var(--bg-primary);
  border-radius: 4px;
  border: 1px solid var(--border-color);
}

.challenges details summary {
  cursor: pointer;
  font-weight: 600;
  color: var(--link-color);
  font-size: 1.1rem;
  padding: 0.5rem;
  user-select: none;
}

.challenges details summary:hover {
  color: var(--link-hover);
}

.challenges details[open] {
  background: var(--bg-secondary);
  padding: 1.5rem;
}

.challenges details details {
  margin-top: 1rem;
  border: none;
  background: var(--bg-primary);
}

.challenges details details summary {
  font-size: 1rem;
  color: var(--text-secondary);
}

/* References Section */
.references {
  margin: 2rem 0;
  padding: 1.5rem;
  background: var(--bg-secondary);
  border-radius: 4px;
}

.references h2 {
  margin-top: 0;
  color: var(--link-color);
}

.references ul {
  list-style: none;
  padding-left: 0;
}

.references li {
  margin: 0.75rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.references li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: var(--link-color);
}

/* Navigation Block */
.navigation {
  margin: 3rem 0 2rem 0;
  padding-top: 2rem;
  border-top: 2px solid var(--border-color);
}

.navigation hr {
  display: none; /* Hidden, spacing handled by margin */
}

.navigation ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

.navigation li {
  margin: 0;
}

.navigation a {
  color: var(--link-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.navigation a:hover {
  color: var(--link-hover);
  text-decoration: underline;
}

/* Widget Type Styles */
.crisis-widget {
  border-left: 6px solid #f44336 !important;
}

.victory-widget {
  border-left: 6px solid #4caf50 !important;
}

.bridge-widget {
  border-left: 6px solid #ff9800 !important;
}

/* Enhanced Widget Module Styles */
.widget-module {
  background: var(--bg-secondary);
  border: 1px solid var(--bg-tertiary);
  border-radius: 16px;
  margin: 2.5rem 0;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  transition: transform 0.2s;
}

.widget-module:hover {
  transform: translateY(-4px);
}

.module-header {
  padding: 1.2rem 1.5rem;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.module-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #ffffff;
}

.widget-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.widget-control {
  display: flex;
  flex-direction: column;
  min-width: 220px;
}

.widget-control label {
  font-size: 0.9rem;
  color: #58a6ff;
  margin-bottom: 0.4rem;
}

.widget-slider {
  -webkit-appearance: none;
  height: 8px;
  border-radius: 4px;
  background: #333;
  outline: none;
  accent-color: #58a6ff;
}

.widget-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #58a6ff;
  cursor: pointer;
}

.run-button {
  align-self: flex-start;
  padding: 0.6rem 1.4rem;
  background: #58a6ff;
  color: black;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.run-button:hover {
  background: #79c0ff;
}

.plotly-container {
  background: #0d1117;
  padding: 1rem;
  min-height: 400px;
}

/* Table of Contents Enhancements (Main Index) */
.toc-article h2 {
  text-align: center;
  margin: 3rem 0 2rem;
  color: var(--link-color);
}

.seven-ascents {
  font-size: 1.3rem;
  text-align: center;
  line-height: 2.2;
  list-style: none;
  padding-left: 0;
  margin: 2rem 0;
}

.seven-ascents li {
  margin: 1rem 0;
  font-weight: 500;
}

.toc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.toc-chapter {
  background: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.toc-chapter h3 {
  margin: 0 0 0.5rem 0;
  color: var(--link-color);
  font-size: 1.2rem;
}

.chapter-tagline {
  font-style: italic;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.toc-chapter ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.toc-chapter li {
  margin: 0.5rem 0;
}

.toc-chapter a {
  color: var(--link-color);
  text-decoration: none;
  transition: color 0.2s;
}

.toc-chapter a:hover {
  color: var(--link-hover);
  text-decoration: underline;
}

/* Chapter Index List */
.chapter-contents {
  font-size: 1.2rem;
  line-height: 2.1;
  list-style: decimal;
  padding-left: 2rem;
  margin: 2rem 0;
}

.chapter-contents li {
  margin: 0.75rem 0;
}

.chapter-contents a {
  color: var(--link-color);
  text-decoration: none;
  transition: color 0.2s;
}

.chapter-contents a:hover {
  color: var(--link-hover);
  text-decoration: underline;
}
```

---

### Phase 2: KaTeX Simplification (All Pages)

**Current Issue:** Complex inline script loading
**Target:** Simple, identical KaTeX loading on every page

**Replace this (current):**
```html
<script>
  (function() {
    var katexScript = document.createElement('script');
    // ... complex loading logic ...
  })();
</script>
```

**With this (canonical):**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"
  onload="renderMathInElement(document.body, {delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}], throwOnError: false});">
</script>
```

**Action:** Replace in all 61 HTML files.

---

### Phase 3: Structural Transformation (Per Page)

### Page Type Identification

Before transformation, identify the page type:

1. **Main Index** (`/diffequations/index.html`) - 1 page
2. **Chapter Index** (`/diffequations/chapter-XX/index.html`) - 7 pages
3. **Section Page** (`/diffequations/chapter-XX/XX-Y-section/index.html`) - 61 pages
4. **Epilogue** (`/diffequations/epilogue/index.html`) - 1 page

**Total: 70 pages** (not 61 - we also have indexes and epilogue)

### Transformation Checklists by Page Type

#### Checklist A: Main Index (`/diffequations/index.html`)

- [ ] Update head to global head template
- [ ] Uncomment manifold-background.js (only page with it active)
- [ ] Create/update hook section with main title
- [ ] Add "Seven Ascents" ordered list
- [ ] Transform TOC into `.toc-grid` with `.toc-chapter` sections
- [ ] Add chapter taglines
- [ ] Remove any narrative intro, challenges, cliffhanger, references, navigation
- [ ] Ensure scripts load correctly

#### Checklist B: Chapter Index (`/diffequations/chapter-XX/index.html`)

- [ ] Update head to global head template
- [ ] Ensure manifold-background.js is commented/absent
- [ ] Create/update hook section (chapter-level hook)
- [ ] Add description line (chapter tagline)
- [ ] Create narrative intro section (3 paragraphs about chapter's arc)
- [ ] Transform section list to `<ol class="chapter-contents">`
- [ ] Add final cliffhanger (chapter-level conclusion)
- [ ] Add references section (chapter-level references)
- [ ] Add navigation (link to first section + TOC)
- [ ] Remove any challenges section

#### Checklist C: Section Pages (1.1–7.8)

For each of the 61 HTML files, follow this checklist:

#### Step 1: Verify/Create Hook Section
- [ ] Check if `<header class="hook">` exists
- [ ] Ensure `<h1>` has format "Chapter X.Y: Title"
- [ ] Add/verify `<p class="hook-text">` (≤22 words, devastating sentence)
- [ ] Add/verify `<p class="hook-subtitle">` (≤15 words, question preferred, optional)

#### Step 2: Verify Description Line
- [ ] Ensure `<p class="description">` exists immediately after hook
- [ ] Should be SEO-friendly, appears in search previews

#### Step 3: Add Narrative Introduction
- [ ] Create `<section class="narrative-intro">` after description
- [ ] Write 2-4 short paragraphs setting up the section
- [ ] Should establish the "optimistic assumption" that will be challenged

#### Step 4: Transform Content Sections
For each major content section:
- [ ] Wrap theorems in `<div class="theorem">...</div>`
- [ ] Wrap definitions in `<div class="definition">...</div>`
- [ ] Wrap examples in `<div class="example">...</div>`
- [ ] Wrap proofs in `<div class="proof">...</div>`
- [ ] Add intermediate cliffhangers: `<div class="cliffhanger">But this works only when...</div>`

#### Step 5: Add/Verify Mastery Challenges
- [ ] Ensure `<section class="challenges">` exists
- [ ] Minimum 2-3 challenges required
- [ ] Format: `<details><summary>Challenge X [★★☆] Title</summary>...<details><summary>Solution</summary>...</details></details>`
- [ ] Use difficulty ratings: [★☆☆] Easy, [★★☆] Medium, [★★★] Hard

#### Step 6: Add Final Cliffhanger
- [ ] Create `<div class="cliffhanger final">` before references
- [ ] Single paragraph, devastating conclusion
- [ ] Should hurl reader forward to next section
- [ ] Must be the single most important paragraph

#### Step 7: Verify Key References
- [ ] Ensure `<section class="references">` exists
- [ ] Immediately after final cliffhanger
- [ ] Format: `<ul><li>Author (Year). <em>Title</em>.</li></ul>`

#### Step 8: Standardize Navigation
- [ ] Create `<nav class="navigation">` at very end
- [ ] Format:
  ```html
  <nav class="navigation">
    <hr>
    <ul>
      <li>Next → <a href="...">X.Y+1 Next Section Title</a></li>
      <li><a href="../">Chapter X Contents</a></li>
      <li><a href="/diffequations/">Full Table of Contents</a></li>
    </ul>
  </nav>
  ```

#### Step 9: Math Formatting Cleanup
- [ ] Replace all `|...|` with `\vert ... \vert` (for absolute values, set membership)
- [ ] Replace all `||...||` with `\lVert ... \rVert` (for norms)
- [ ] Keep `\|` only for norms (alternative to `\lVert`)
- [ ] Ensure all math uses only `$...$` (inline) and `$$...$$` (display)

#### Step 10: Widget Integration (Where Applicable)
For sections that need widgets:
- [ ] Identify crisis point (method fails) → add `crisis-widget`
- [ ] Identify victory point (method works) → add `victory-widget`
- [ ] Optional: Add `bridge-widget` before final cliffhanger
- [ ] Use exact widget HTML template from canonical spec
- [ ] Maximum 3 widgets per section

---

## Mathematical Rigor and Content Quality Checks

### Mandatory Mathematical Verification

During transformation, **every mathematical statement must be verified**:

#### 1. Theorem Statements
- [ ] All theorems are correctly stated
- [ ] Hypotheses are complete and necessary
- [ ] Conclusions are precise
- [ ] No missing conditions or assumptions
- [ ] Check against authoritative sources

#### 2. Proofs and Derivations
- [ ] All steps are logically sound
- [ ] No gaps in reasoning
- [ ] All limits, integrals, derivatives are well-defined
- [ ] Convergence conditions are stated
- [ ] Edge cases are addressed

#### 3. Examples and Computations
- [ ] All calculations are correct
- [ ] Numerical values are accurate
- [ ] Asymptotic expansions are valid
- [ ] Special cases are handled correctly
- [ ] Verify against known results

#### 4. Definitions
- [ ] Definitions are standard and consistent
- [ ] Notation matches throughout
- [ ] No circular definitions
- [ ] Edge cases are covered

#### 5. Cross-References
- [ ] References to other sections are accurate
- [ ] Chapter numbers match
- [ ] Theorem numbers (if used) are correct
- [ ] Links work and point to correct content

### Content Quality Red Flags

**Watch for these common issues:**

1. **Random Corrections**
   - Look for inconsistent notation within same section
   - Check for hastily added corrections that break flow
   - Verify that "fixes" don't introduce new errors

2. **Questionable Mathematics**
   - Statements that seem too strong or too weak
   - Missing hypotheses in theorems
   - Computations that don't match stated results
   - Definitions that don't match standard usage

3. **Inconsistencies**
   - Same concept defined differently in different places
   - Notation changes mid-section
   - Terminology switches (e.g., "function" vs "map")
   - Units or scaling factors that don't match

4. **Missing Rigor**
   - Claims without justification
   - "It is easy to see" without explanation
   - Hand-waving over difficult steps
   - Unstated assumptions

5. **Formatting Errors**
   - Math that doesn't render correctly
   - Broken LaTeX syntax
   - Missing delimiters
   - Incorrect equation numbering

### Verification Protocol

**For Each Page:**

1. **Mathematical Content Review**
   - Read every theorem statement carefully
   - Verify all computations manually
   - Check definitions against standard references
   - Ensure proofs are complete

2. **Notation Consistency Check**
   - Scan for all uses of each symbol
   - Ensure same symbol means same thing
   - Check that notation matches conventions
   - Verify Greek letters are used consistently

3. **Cross-Reference Verification**
   - Click every internal link
   - Verify section numbers are correct
   - Check that referenced content exists
   - Ensure external references are accurate

4. **Content Flow Review**
   - Read the entire page as narrative
   - Check that ideas build logically
   - Verify cliffhangers make sense
   - Ensure transitions are smooth

5. **Final Accuracy Pass**
   - Double-check all numbers
   - Verify all formulas
   - Check all citations
   - Ensure no typos in technical terms

### Common Mathematical Errors to Catch

1. **Dimensional Analysis**
   - Check units match in equations
   - Verify scaling factors are correct
   - Ensure dimensionless quantities are properly normalized

2. **Limits and Convergence**
   - Verify limit conditions are stated
   - Check convergence criteria
   - Ensure asymptotic expansions are valid
   - Verify radius of convergence

3. **Index Notation**
   - Check summation indices match
   - Verify Einstein summation (if used)
   - Ensure indices are not reused incorrectly

4. **Operator Notation**
   - Verify operator composition is correct
   - Check domain/codomain match
   - Ensure adjoints are properly defined

5. **Geometric Quantities**
   - Verify curvature formulas
   - Check metric tensor components
   - Ensure coordinate transformations are correct

### Content Error Detection Checklist

**Before marking page complete:**

- [ ] No mathematical errors found
- [ ] All notation is consistent
- [ ] All cross-references verified
- [ ] All computations double-checked
- [ ] No "random corrections" that break flow
- [ ] No questionable statements
- [ ] All definitions are standard
- [ ] All theorems are correctly stated
- [ ] All examples work correctly
- [ ] Content reads as finalized, polished work

---

## Page-by-Page Transformation Checklist

### Special Pages (Do First)

#### Main Index (`/diffequations/index.html`)
- [ ] Apply Main Index Template
- [ ] Verify "Seven Ascents" list is correct
- [ ] Check all TOC links work
- [ ] Ensure manifold background is active
- [ ] Verify no narrative intro, challenges, or cliffhanger

#### Chapter Indexes (7 pages: `/diffequations/chapter-01/index.html` through `chapter-07/index.html`)
- [ ] Apply Chapter Index Template
- [ ] Write chapter-specific hook (≤22 words + ≤15 subtitle)
- [ ] Write 3-paragraph narrative intro
- [ ] Create `<ol class="chapter-contents">` with all sections
- [ ] Write chapter-level final cliffhanger
- [ ] Add chapter-level references
- [ ] Add navigation (first section + TOC)
- [ ] Verify no challenges section

#### Epilogue (`/diffequations/epilogue/index.html`)
- [ ] Apply Epilogue Template
- [ ] Write epilogue-specific hook
- [ ] Write 3-paragraph narrative intro
- [ ] Keep existing epilogue content (wrap in `<p>` tags)
- [ ] Create huge final cliffhanger (larger font, more padding)
- [ ] Add comprehensive references (entire journey)
- [ ] Add navigation (TOC + link to 7.8)
- [ ] Challenges optional (may have 1-2, not required)

### Chapter 1: Classical Explicit & Quasi-Explicit Arsenal

#### 1.1 Exact Methods (`chapter-01/01-1-exact-methods/index.html`)
- [ ] Hook: Rewrite to focus on collapse of explicit solvability
- [ ] Narrative intro: Add 2-4 paragraphs about determinism assumption
- [ ] Semantic blocks: Wrap all theorems/definitions/examples
- [ ] Crisis widget: Non-uniqueness of $y' = \sqrt{|y|}$ (after failure paragraph)
- [ ] Victory widget: Exact equation solver (after exactness section)
- [ ] Challenges: Verify/expand to 2-3 minimum
- [ ] Final cliffhanger: Rewrite to emphasize collapse
- [ ] Math: Fix all `|` to `\vert`, norms to `\lVert`

#### 1.2 Special Functions (`chapter-01/01-2-special-functions/index.html`)
- [ ] Hook: Rewrite for special functions narrative
- [ ] Narrative intro: Add about hypergeometric master equation
- [ ] Crisis widget: Airy equation has no elementary solution
- [ ] Victory widget: Interactive Gamma function explorer
- [ ] Bridge widget: Bessel functions → necessary for cylinders
- [ ] Challenges: Verify/expand
- [ ] Final cliffhanger: Rewrite
- [ ] Math: Fix formatting

#### 1.3 Integral Transforms
- [ ] Follow same pattern
- [ ] Identify crisis/victory points
- [ ] Add widgets as needed

#### 1.4 Linear PDE
- [ ] Follow same pattern
- [ ] Identify crisis/victory points
- [ ] Add widgets as needed

#### 1.5 Asymptotic Analysis
- [ ] Follow same pattern
- [ ] Identify crisis/victory points
- [ ] Add widgets as needed

#### 1.6 Perturbation Theory
- [ ] Follow same pattern
- [ ] Identify crisis/victory points
- [ ] Add widgets as needed

#### 1.7 Renormalization
- [ ] Follow same pattern
- [ ] Identify crisis/victory points
- [ ] Add widgets as needed

### Chapter 2-7: Follow Same Pattern

For each section in chapters 2-7:
1. Apply same 10-step checklist
2. Identify narrative arc (crisis → victory → bridge)
3. Add appropriate widgets
4. Ensure all mandatory elements present

### Epilogue
- [ ] Apply same structure
- [ ] Final cliffhanger should be the ultimate conclusion
- [ ] No "next section" in navigation (only TOC links)

---

## Widget Implementation Guide

### When to Add Widgets

**Crisis Widget:**
- Place immediately after paragraph showing method failure
- Example: "The Lipschitz condition fails → multiple solutions"
- Widget demonstrates the failure interactively

**Victory Widget:**
- Place immediately after presenting working technique
- Example: "When curl vanishes, we can integrate by quadrature"
- Widget lets reader explore the solution space

**Bridge Widget:**
- Place just before final cliffhanger
- Shows how current paradigm breaks in higher dimensions
- Primes reader for next section's crisis

### Widget HTML Template

```html
<!-- CRISIS / VICTORY / BRIDGE – choose one class -->
<div class="widget-module crisis-widget" id="unique-id">
  <div class="module-header">
    <h3>Interactive: Descriptive Title with Math $y' = f(x,y)$</h3>
    <div class="widget-controls">
      <div class="widget-control">
        <label>Parameter Name</label>
        <input type="range" class="widget-slider" data-param="param_name"
               min="0" max="10" step="0.01" value="1">
        <span class="widget-value" data-param="param_name">1.00</span>
      </div>
    </div>
    <button class="run-button widget-run">Run Simulation</button>
  </div>
  <div class="plotly-container widget-output"></div>
  <div class="code-block hidden">
    <pre><code class="language-python"># Parameters injected: param_name_val
import numpy as np
# ... Python code ...
create_plot(traces, layout)</code></pre>
  </div>
</div>
```

### Widget Placement Examples

**Example 1: Crisis Widget (Section 1.1)**
```html
<h2>Failure of Determinism: Non-Uniqueness</h2>
<p>The Lipschitz condition fails → multiple solutions through the same point.</p>

<!-- CRISIS WIDGET – reader feels the catastrophe -->
<div class="widget-module crisis-widget" id="nonuniq-1">
  <!-- Widget content -->
</div>

<div class="cliffhanger">
  A particle at the origin can wait arbitrarily long before moving.
  Classical determinism is dead.
</div>
```

**Example 2: Victory Widget (Section 1.1)**
```html
<h2>Exactness Saves the Day (Sometimes)</h2>
<p>When curl vanishes, we can integrate by quadrature.</p>

<!-- VICTORY WIDGET – reader experiences salvation -->
<div class="widget-module victory-widget" id="exact-demo">
  <!-- Widget content -->
</div>
```

**Example 3: Bridge Widget (Section 1.2)**
```html
<!-- Just before final cliffhanger -->
<div class="widget-module bridge-widget" id="chaos-preview">
  <div class="module-header">
    <h3>Preview: The Lorenz Attractor</h3>
  </div>
  <!-- Widget content -->
</div>

<div class="cliffhanger final">
  <p>We have exhausted every classical trick...</p>
</div>
```

---

## Math Formatting Standards

### Mandatory Rules

1. **Absolute Values / Set Membership:**
   - ❌ Wrong: `|x|`, `|y|`, `|f(x)|`
   - ✅ Correct: `\vert x \vert`, `\vert y \vert`, `\vert f(x) \vert`

2. **Norms:**
   - ❌ Wrong: `||u||`, `||f||_{L^2}`
   - ✅ Correct: `\lVert u \rVert`, `\lVert f \rVert_{L^2}`
   - ✅ Alternative: `\|u\|` (acceptable for norms only)

3. **Delimiters:**
   - ✅ Inline: `$...$` only
   - ✅ Display: `$$...$$` only
   - ❌ Never use: `\[...\]`, `\(...\)`

4. **Vertical Bars in Math:**
   - Use `\vert` for absolute values
   - Use `\mid` for "such that" or set separators
   - Use `\lvert` and `\rvert` for asymmetric cases

### Search and Replace Patterns

**Pattern 1: Absolute Values**
- Find: `|([^|]+)|` (context-dependent)
- Replace: `\vert $1 \vert`
- **Caution:** Must check context to avoid replacing norms

**Pattern 2: Norms**
- Find: `\|\|([^|]+)\|\|`
- Replace: `\lVert $1 \rVert`

**Pattern 3: Inline Math Delimiters**
- Find: `\\\[` and `\\\]`
- Replace: `$$` (display math)
- Find: `\\(` and `\\)`
- Replace: `$` (inline math)

---

## Quality Assurance Checklist

Before marking a page as complete:

### Structural Elements
- [ ] Hook section present and properly formatted
- [ ] Description line present
- [ ] Narrative intro section exists (2-4 paragraphs)
- [ ] All theorems wrapped in `.theorem` divs
- [ ] All definitions wrapped in `.definition` divs
- [ ] All examples wrapped in `.example` divs
- [ ] All proofs wrapped in `.proof` divs
- [ ] Intermediate cliffhangers present between major ideas
- [ ] Mastery Challenges section present (minimum 2-3)
- [ ] Final cliffhanger present (single paragraph, `.cliffhanger.final`)
- [ ] Key References section present
- [ ] Navigation block present at very end

### Widget Elements (if applicable)
- [ ] Maximum 3 widgets per page
- [ ] Crisis widget placed after failure demonstration
- [ ] Victory widget placed after success demonstration
- [ ] Bridge widget (if present) placed before final cliffhanger
- [ ] Widget IDs are unique
- [ ] Widget classes match type (crisis-widget, victory-widget, bridge-widget)

### Math Formatting
- [ ] No `|` used for absolute values (use `\vert`)
- [ ] No `||` used for norms (use `\lVert \rVert`)
- [ ] Only `$...$` and `$$...$$` delimiters used
- [ ] All math renders correctly in browser

### Content Quality
- [ ] Hook text is ≤22 words, devastating
- [ ] Hook subtitle is ≤15 words, question preferred
- [ ] Narrative intro sets up the section's arc
- [ ] Final cliffhanger is the most important paragraph
- [ ] Challenges have difficulty ratings
- [ ] References are properly formatted

### Technical
- [ ] KaTeX loads correctly (simplified format)
- [ ] All scripts load (navigation, widget engines)
- [ ] CSS classes render correctly
- [ ] Page validates (no broken HTML)
- [ ] Links work correctly
- [ ] Responsive design maintained

---

## Transformation Workflow

### Recommended Order

1. **Start with CSS** (Phase 1)
   - Add all canonical styles to `styles.css`
   - Test on one page to verify rendering
   - Commit CSS changes

2. **Transform Chapter 1 First** (Pilot)
   - Complete 1.1 as the template
   - Use it as reference for others
   - Refine process based on learnings

3. **Batch by Chapter**
   - Complete all of Chapter 1
   - Then Chapter 2, etc.
   - Maintain consistency within chapters

4. **Final Pass: Math Formatting**
   - Go through all pages
   - Fix math delimiters systematically
   - Verify rendering

### Efficiency Tips

1. **Create a Template File**
   - Save one fully transformed page as `TEMPLATE.html`
   - Copy structure, adapt content
   - Faster than building from scratch

2. **Batch Similar Changes**
   - Do all KaTeX replacements in one pass
   - Do all navigation blocks in one pass
   - Do all math formatting in one pass

3. **Use Find/Replace Carefully**
   - Test on one page first
   - Verify results before batch applying
   - Math formatting requires context awareness

4. **Validate Frequently**
   - Open pages in browser after each transformation
   - Check math rendering
   - Verify widget functionality (if added)

---

## Common Pitfalls to Avoid

### Structural Pitfalls

1. **Don't skip the narrative intro**
   - Every page needs 2-4 paragraphs setting up the section
   - This is crucial for narrative flow

2. **Don't forget intermediate cliffhangers**
   - Between major ideas, add `<div class="cliffhanger">`
   - Maintains narrative tension

3. **Don't put navigation before references**
   - Order must be: content → challenges → final cliffhanger → references → navigation

4. **Don't use generic hook text**
   - Each section needs a unique, devastating hook
   - Copy-pasting hooks breaks the narrative

### Widget Pitfalls

1. **Don't add widgets "because they're cool"**
   - Every widget must serve the narrative arc
   - Crisis widget must come after failure
   - Victory widget must come after success

2. **Don't exceed 3 widgets per page**
   - Most pages should have exactly 2 (Crisis + Victory)
   - Bridge widget is optional

3. **Don't forget widget type classes**
   - `crisis-widget`, `victory-widget`, `bridge-widget`
   - These control visual styling

### Math Formatting Pitfalls

1. **Don't use `|` for absolute values**
   - Always use `\vert` or `\lvert \rvert`
   - Context matters: check if it's a norm or absolute value

2. **Don't mix delimiter styles**
   - Stick to `$...$` and `$$...$$` only
   - Remove any `\[...\]` or `\(...\)`

3. **Don't forget to test rendering**
   - Math formatting errors may not be obvious
   - Always check in browser

---

## Success Metrics

After transformation, every page should:

1. **Visual Consistency**
   - Hook section with gradient background
   - Semantic blocks with colored borders
   - Cliffhangers with red accent
   - Challenges in collapsible format

2. **Narrative Flow**
   - Hook grabs attention
   - Narrative intro sets context
   - Content builds tension
   - Final cliffhanger propels forward

3. **Interactive Elements**
   - Widgets placed strategically
   - Widgets serve narrative purpose
   - Widgets function correctly

4. **Technical Quality**
   - All math renders correctly
   - All links work
   - Page loads quickly
   - Responsive design maintained

---

## Timeline Estimate

**Per Page Transformation Time:**
- Simple page (no widgets): 30-45 minutes
- Medium page (2 widgets): 45-60 minutes
- Complex page (3 widgets + extensive content): 60-90 minutes

**Total Pages:** 70 (61 sections + 1 main index + 7 chapter indexes + 1 epilogue)
**Estimated Total Time:** 35-70 hours

**Breakdown:**
- Main Index: 1-2 hours
- Chapter Indexes (7): 2-3 hours each = 14-21 hours
- Section Pages (61): 30-60 minutes each = 30-60 hours
- Epilogue: 2-3 hours

**Recommended Approach:**
- Transform 2-3 pages per day
- Complete one chapter at a time
- Take breaks to maintain quality
- Review transformed pages before moving on

---

## Next Steps

1. **Review this guide** - Ensure understanding of all requirements
2. **Add CSS styles** - Complete Phase 1 (one-time)
3. **Create template page** - Transform 1.1 as the canonical example
4. **Begin systematic transformation** - Follow checklist for each page
5. **Validate frequently** - Check rendering and functionality
6. **Maintain consistency** - Use transformed pages as reference

---

## Mathematical Rigor Verification Workflow

### Step-by-Step Verification Process

**For Each Page During Transformation:**

1. **Initial Read-Through**
   - Read entire page as narrative
   - Note any statements that seem off
   - Flag unclear or ambiguous passages
   - Identify potential errors

2. **Mathematical Statement Verification**
   - For each theorem: verify statement is correct
   - For each definition: check against standard sources
   - For each example: verify computation is correct
   - For each proof: check logical flow

3. **Notation Audit**
   - List all mathematical symbols used
   - Verify each symbol is used consistently
   - Check that notation matches conventions
   - Ensure no conflicts or ambiguities

4. **Cross-Reference Check**
   - Verify all internal links work
   - Check section numbers are correct
   - Ensure referenced content exists
   - Verify external citations are accurate

5. **Content Quality Review**
   - Check for "random corrections" that break flow
   - Look for hastily added fixes
   - Verify no contradictory statements
   - Ensure narrative coherence

6. **Final Accuracy Pass**
   - Double-check all numbers and formulas
   - Verify all citations
   - Check spelling of technical terms
   - Ensure page reads as finalized work

### Red Flags: What to Question

**Immediate Red Flags:**
- Statements that seem too good to be true
- Computations that give "nice" numbers without explanation
- Theorems without complete hypotheses
- Proofs with gaps marked "obvious" or "easy to see"
- Notation that changes mid-section
- References to sections that don't exist
- Formulas that don't match dimensions

**Content Quality Red Flags:**
- Abrupt changes in tone or style
- Sections that seem hastily added
- Corrections that don't fit the narrative
- Inconsistent terminology
- Missing explanations for key steps

### Verification Tools

**Manual Checks:**
- Read page aloud to catch awkward phrasing
- Work through examples manually
- Verify computations with calculator/computer
- Check definitions against authoritative sources

**Consistency Checks:**
- Search for all uses of each symbol
- Verify notation matches across pages
- Check that terminology is consistent
- Ensure cross-references are accurate

---

## Questions to Resolve

Before beginning transformation, clarify:

1. **Widget Content:** Should we create widget Python code now, or add placeholders?
2. **Challenge Difficulty:** Who assigns difficulty ratings [★☆☆]?
3. **Hook Writing:** Should hooks be written fresh or adapted from existing content?
4. **References:** Should we expand reference lists or keep current?
5. **Navigation:** Should we add "Previous Section" links, or only "Next"?
6. **Mathematical Verification:** Who performs final mathematical accuracy review?

---

## Conclusion

This guide provides the complete roadmap for transforming all 70 HTML pages (61 sections + 1 main index + 7 chapter indexes + 1 epilogue) to the canonical template. The transformation will create a unified, narratively-driven experience that guides readers through the mathematical ascent from explicit solutions to categorical resolution.

**Key Principles:**
- **Consistency:** Every page follows the same structure (with page-type variations)
- **Narrative:** Every element serves the story arc
- **Quality:** Every detail matters, especially mathematical accuracy
- **Rigor:** Every mathematical statement must be verified
- **Efficiency:** Systematic approach minimizes errors

**Critical Reminders:**
- This is a manual transformation - take time to ensure each page is perfect
- Mathematical accuracy is non-negotiable - verify everything
- Watch for random corrections that break flow
- Ensure content reads as finalized, polished work
- The result will be a textbook that reads like a single, unstoppable intellectual journey

**Page Type Summary:**
- **Main Index:** Hook + TOC only (no narrative, challenges, or cliffhanger)
- **Chapter Indexes:** Hook + Narrative Intro + Section List + Final Cliffhanger + References + Navigation
- **Section Pages:** Full structure with challenges and widgets
- **Epilogue:** Hook + Narrative Intro + Content + Huge Final Cliffhanger + Comprehensive References + Navigation

Good luck with the transformation!
