# Standardization Guide: Transforming to Canonical Template

## Executive Summary

This guide outlines the comprehensive plan to transform all 61 HTML pages from their current structure to the new canonical template. The transformation will create a unified, narratively-driven experience where every section follows the same structural rhythm: Hook → Narrative → Crisis → Victory → Challenges → Cliffhanger → References → Navigation.

**Status**: Analysis complete. Ready for manual transformation.

**Estimated Scope**: 61 HTML files need structural transformation.

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

### Mandatory Structure (Every Page Must Have)

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

### Widget Placement Rules

**Three Widget Types:**
1. **Crisis Widget** (`crisis-widget` class): After showing a method fails
2. **Victory Widget** (`victory-widget` class): After presenting a working technique
3. **Bridge Widget** (`bridge-widget` class): Optional, before final cliffhanger

**Rules:**
- Maximum 3 widgets per section (most have 2: Crisis + Victory)
- Widgets must serve narrative arc
- Place immediately after relevant content paragraph

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

## Page-by-Page Transformation Checklist

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

**Total Pages:** 61
**Estimated Total Time:** 30-60 hours

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

## Questions to Resolve

Before beginning transformation, clarify:

1. **Widget Content:** Should we create widget Python code now, or add placeholders?
2. **Challenge Difficulty:** Who assigns difficulty ratings [★☆☆]?
3. **Hook Writing:** Should hooks be written fresh or adapted from existing content?
4. **References:** Should we expand reference lists or keep current?
5. **Navigation:** Should we add "Previous Section" links, or only "Next"?

---

## Conclusion

This guide provides the complete roadmap for transforming all 61 HTML pages to the canonical template. The transformation will create a unified, narratively-driven experience that guides readers through the mathematical ascent from explicit solutions to categorical resolution.

**Key Principles:**
- Consistency: Every page follows the same structure
- Narrative: Every element serves the story arc
- Quality: Every detail matters
- Efficiency: Systematic approach minimizes errors

**Remember:** This is a manual transformation. Take time to ensure each page is perfect. The result will be a textbook that reads like a single, unstoppable intellectual journey.

Good luck with the transformation!

