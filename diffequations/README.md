# Differential Equations Textbook - Implementation Guide

This document provides a comprehensive guide to understanding, using, and customizing the interactive differential equations textbook infrastructure.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Directory Structure](#directory-structure)
3. [Creating Content Pages](#creating-content-pages)
4. [Widget System](#widget-system)
5. [Adding Interactive Widgets](#adding-interactive-widgets)
6. [Code Execution System](#code-execution-system)
7. [CI/CD and Deployment](#cicd-and-deployment)
8. [Python Code Debugging and Validation](#python-code-debugging-and-validation)
9. [Customization Guide](#customization-guide)
10. [Advanced Features](#advanced-features)
11. [Troubleshooting](#troubleshooting)

---
## Technical Specifications

### Core Technologies

- Layout: Jekyll Collections + Custom Liquid Templates
- Mathematics: MathJax 3 (LaTeX to HTML)
- Python: Pyodide 0.24.1 (WebAssembly)
- Scientific: NumPy, SciPy, Matplotlib
- Visualization: Plotly.js 2.27.0
- Syntax: Prism.js (30+ languages)
- Styling: Custom CSS with theme variables

### Performance Targets

- Initial Load: 2-3 seconds (excluding Pyodide)
- Pyodide Initialization: <5 seconds
- ODE Solve (1000 steps): <100ms
- Widget Update: <50ms
- Plotly Render: <200ms

## Architecture Overview

The textbook is built on **Jekyll** (static site generator) with **GitHub Pages** hosting. The interactive computational features are powered by:

- **Pyodide**: Python in the browser via WebAssembly
- **Plotly.js**: Interactive plotting library
- **MathJax**: LaTeX rendering
- **Prism.js**: Code syntax highlighting

### Core Components

1. **Jekyll Layout** (`_layouts/textbook.html`): Main page template
2. **Widget Engine** (`assets/js/widget-engine.js`): Manages interactive controls
3. **Textbook Engine** (`assets/js/textbook-engine.js`): Handles Python code execution
4. **Theme Manager** (`assets/js/theme-manager.js`): Dark/light theme switching
5. **Code Toggle** (`assets/js/code-toggle.js`): Show/hide code blocks

---

## Directory Structure

```
jetbundle.github.io/
├── _diffequations/          # Textbook content (Jekyll collection)
│   ├── 00_index.md          # Main landing page
│   ├── 01_intro.md          # Example: Introduction chapter
│   └── README.md            # This file
├── _layouts/
│   └── textbook.html        # Layout template for textbook pages
├── _includes/
│   ├── theme_toggle.html    # Theme toggle button
│   └── textbook_nav.html    # Sidebar navigation
├── assets/
│   ├── css/
│   │   └── textbook.css     # Stylesheet
│   └── js/
│       ├── widget-engine.js     # Widget system
│       ├── textbook-engine.js   # Python execution
│       ├── theme-manager.js     # Theme switching
│       └── code-toggle.js       # Code visibility toggle
└── _config.yml              # Jekyll configuration
```

---

## Creating Content Pages

### Basic Page Structure

Create a new Markdown file in `_diffequations/` with the following front matter:

```markdown
---
layout: textbook
title: "Chapter Title"
description: "Chapter description"
permalink: /diffequations/chapter-name/
order: 1
chapter: 1
---

# Chapter Title

Your content here...

## Section

More content...
```

### Front Matter Fields

- `layout: textbook` - Required, uses the textbook layout
- `title` - Page title (displayed in header and sidebar)
- `description` - Meta description
- `permalink` - URL path (must start with `/diffequations/`)
- `order` - Numeric order for sidebar navigation (optional)
- `chapter` - Chapter number (optional)

### Adding Math

**Inline math**: `$E = mc^2$` renders as $E = mc^2$

**Display math**:
```
$$
\frac{d^2y}{dt^2} + \omega^2 y = 0
$$
```

---

## Widget System

The widget system allows you to create interactive computational modules with sliders, dropdowns, and code execution.

### Basic Widget Structure

```html
<div class="widget-module" id="my-widget">
  <div class="module-header">
    <h3>Widget Title</h3>
    <div class="widget-controls">
      <!-- Controls go here -->
    </div>
    <button class="run-button widget-run">Run</button>
  </div>

  <div class="code-block hidden">
    <pre><code class="language-python"># Your Python code here</code></pre>
  </div>

  <div class="plotly-container widget-output"></div>
</div>
```

### Widget Components

1. **`.widget-module`**: Container div (required)
2. **`.module-header`**: Header section with title and controls
3. **`.widget-controls`**: Container for sliders/dropdowns
4. **`.code-block`**: Python code (hidden by default with `hidden` class)
5. **`.widget-output`**: Container where plots render (required)
6. **`.widget-run`**: Run button (required)

---

## Adding Interactive Widgets

### Simple Widget with Sliders

```html
<div class="widget-module" id="simple-widget">
  <div class="module-header">
    <h3>Simple ODE Solver</h3>
    <div class="widget-controls">
      <div class="widget-control">
        <label>Parameter λ</label>
        <input type="range" class="widget-slider"
               data-param="lambda"
               min="0.1" max="5" step="0.1" value="1">
        <span class="widget-value" data-param="lambda">1.0</span>
      </div>
    </div>
    <button class="run-button widget-run">Run</button>
  </div>

  <div class="code-block hidden">
    <pre><code class="language-python">import numpy as np
from scipy.integrate import odeint

# Parameters from widgets (injected by widget engine)
# lambda_val is set by the slider

def dydt(y, t, lambda_param):
    return -lambda_param * y

t = np.linspace(0, 5, 100)
sol = odeint(dydt, 1.0, t, args=(lambda_val,))

trace = {
    'x': t.tolist(),
    'y': sol.flatten().tolist(),
    'mode': 'lines',
    'name': f'y(t) with λ={lambda_val}',
    'line': {'width': 3, 'color': '#3b82f6'}
}

layout = {
    'title': f'ODE Solution: dy/dt = -{lambda_val}*y',
    'xaxis': {'title': 'Time t'},
    'yaxis': {'title': 'y(t)'},
    'height': 400
}

# Store plot data for rendering
create_plot([trace], layout)</code></pre>
  </div>

  <div class="plotly-container widget-output"></div>
</div>
```

### Widget with Dropdown Code Selection

```html
<div class="widget-module" id="multi-mode-widget">
  <div class="module-header">
    <h3>Multi-Mode ODE Explorer</h3>
    <div class="widget-controls">
      <!-- Code selector dropdown -->
      <div class="widget-control">
        <label>ODE Type</label>
        <select class="widget-dropdown"
                data-param="ode_type"
                data-code-selector="true">
          <option value="mode1">Mode 1: Exponential</option>
          <option value="mode2">Mode 2: Oscillatory</option>
          <option value="mode3">Mode 3: Logistic</option>
        </select>
      </div>

      <!-- Regular sliders -->
      <div class="widget-control">
        <label>Parameter</label>
        <input type="range" class="widget-slider"
               data-param="param1" min="0" max="10" step="0.1" value="1">
        <span class="widget-value" data-param="param1">1.0</span>
      </div>
    </div>
    <button class="run-button widget-run">Run</button>
  </div>

  <!-- Code block for Mode 1 -->
  <div class="code-block hidden" data-code-type="mode1">
    <pre><code class="language-python"># Code for mode 1
import numpy as np
# ... your code here
create_plot([trace], layout)</code></pre>
  </div>

  <!-- Code block for Mode 2 -->
  <div class="code-block hidden" data-code-type="mode2">
    <pre><code class="language-python"># Code for mode 2
import numpy as np
# ... your code here
create_plot([trace], layout)</code></pre>
  </div>

  <!-- Code block for Mode 3 -->
  <div class="code-block hidden" data-code-type="mode3">
    <pre><code class="language-python"># Code for mode 3
import numpy as np
# ... your code here
create_plot([trace], layout)</code></pre>
  </div>

  <div class="plotly-container widget-output"></div>
</div>
```

### Slider Attributes

- `class="widget-slider"` - Required
- `data-param="name"` - Parameter name (must match Python variable)
- `min`, `max`, `step`, `value` - Standard HTML5 range attributes
- `.widget-value` span - Shows current value (requires matching `data-param`)

### Dropdown Attributes

**Regular dropdown** (for parameters):
- `class="widget-dropdown"`
- `data-param="name"` - Parameter name

**Code selector dropdown**:
- `class="widget-dropdown"`
- `data-param="ode_type"` - Parameter name (not used as code selector)
- `data-code-selector="true"` - **Required** to enable code selection
- Options must have `value` matching `data-code-type` of code blocks

---

## Code Execution System

### Python Code Requirements

1. **Imports**: Standard NumPy/SciPy imports
2. **Parameters**: Use `{param_name}_val` convention
   - Slider `data-param="lambda"` → Python variable `lambda_val`
   - Slider `data-param="y0"` → Python variable `y0_val`
   - Slider `data-param="t_max"` → Python variable `t_max_val`
3. **Plot Creation**: Must call `create_plot()` function

### Parameter Injection

The widget engine automatically injects parameters into your code:

```python
# In your code block, you can reference:
lambda_val  # From slider with data-param="lambda"
y0_val      # From slider with data-param="y0"
t_max_val   # From slider with data-param="t_max"
```

**Important**: The widget engine inserts these variables **after** your imports, so you can use them directly in your code.

### Creating Plots

Use the `create_plot()` helper function:

```python
trace = {
    'x': t.tolist(),           # X data (must be list)
    'y': y.tolist(),           # Y data (must be list)
    'mode': 'lines',           # Plot mode
    'name': 'Trace name',      # Legend name
    'line': {'width': 3, 'color': '#3b82f6'}  # Line styling
}

layout = {
    'title': 'Plot Title',
    'xaxis': {'title': 'X Axis'},
    'yaxis': {'title': 'Y Axis'},
    'height': 400
}

# This renders the plot
create_plot([trace], layout)
```

### Plot Data Structure

**Trace dictionary**:
- `x`, `y`: Data arrays (will be converted to lists automatically)
- `mode`: `'lines'`, `'markers'`, `'lines+markers'`
- `name`: Legend label
- `line`: Styling dictionary (`width`, `color`, `dash`, etc.)
- Any other Plotly trace attributes

**Layout dictionary**:
- `title`: Plot title
- `xaxis`, `yaxis`: Axis configuration dictionaries
- `height`: Plot height in pixels
- Any other Plotly layout attributes

### Available Python Libraries

- `numpy` (as `np`)
- `scipy` (including `scipy.integrate`)
- Standard Python libraries

**Note**: Plotly Python is **not** available. Use `create_plot()` helper instead.

---

## Customization Guide

### Styling Widgets

Edit `assets/css/textbook.css`:

```css
/* Widget module container */
.widget-module {
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 2rem 0;
}

/* Slider styling */
.widget-slider {
  accent-color: var(--accent);
  /* Custom styling */
}

/* Dropdown styling */
.widget-dropdown {
  padding: 0.5rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--bg-primary);
  color: var(--text-primary);
}
```

### Theme Customization

The theme system uses CSS variables:

```css
:root {
  --bg-primary-dark: #0a0e1a;
  --bg-secondary-dark: #111827;
  --text-primary-dark: #f8fafc;
  --accent: #3b82f6;
  /* ... */
}
```

Edit these in `assets/css/textbook.css` to customize colors.

### Adding New Widget Types

1. **Add HTML structure** in your Markdown file
2. **Ensure proper classes**: `.widget-module`, `.widget-run`, `.widget-output`
3. **Add parameter controls**: Sliders or dropdowns with `data-param` attributes
4. **Write Python code** in `.code-block` with `create_plot()` call

The widget engine automatically discovers and initializes widgets.

---

## Advanced Features

### Code Visibility Toggle

Code blocks automatically get a "Show Code" / "Hide Code" button. The toggle state is preserved when switching between code blocks via dropdown.

- Code blocks start with `class="code-block hidden"` to hide by default
- Toggle button is automatically added by `code-toggle.js`
- State persists across dropdown selections

### Multiple Traces

Create plots with multiple traces:

```python
trace1 = {
    'x': t.tolist(),
    'y': y1.tolist(),
    'mode': 'lines',
    'name': 'Solution 1',
    'line': {'color': '#3b82f6'}
}

trace2 = {
    'x': t.tolist(),
    'y': y2.tolist(),
    'mode': 'lines',
    'name': 'Solution 2',
    'line': {'color': '#10b981'}
}

create_plot([trace1, trace2], layout)
```

### LaTeX in Plot Titles

Plot titles can include LaTeX, but MathJax must be loaded:

```python
layout = {
    'title': r'$\frac{dy}{dt} = -\lambda y$',  # Raw string for LaTeX
    # ... rest of layout
}
```

**Note**: LaTeX rendering may not work if MathJax isn't fully loaded. The system will fall back to plain text.

### Sidebar Navigation

Navigation is automatically generated from files in `_diffequations/`:

- Files are sorted by `order` front matter (if present)
- Chapter titles come from `title` front matter
- Links use `permalink` from front matter

To customize navigation, edit `_includes/textbook_nav.html`.

---

## Troubleshooting

### Widget Not Executing

1. **Check console** (F12) for JavaScript errors
2. **Verify structure**: Ensure `.widget-module`, `.widget-run`, `.widget-output` classes exist
3. **Check Pyodide**: Wait for "Pyodide is ready" message in console
4. **Verify code**: Ensure Python code calls `create_plot()`

### Plot Not Rendering

1. **Check plot data**: Verify `create_plot()` is called with correct arguments
2. **Check output container**: Ensure `.widget-output` div exists
3. **Check MathJax errors**: If using LaTeX, may need to wait for MathJax to load
4. **Check console**: Look for Plotly rendering errors

### Parameter Not Working

1. **Check naming**: Slider `data-param="lambda"` → Python `lambda_val`
2. **Verify injection**: Check console logs for "execution with params"
3. **Check code**: Ensure parameter is used in Python code

### Dropdown Not Changing Code

1. **Verify attributes**: Dropdown must have `data-code-selector="true"`
2. **Check code blocks**: Each code block needs `data-code-type` matching dropdown option values
3. **Verify value attribute**: Dropdown option `value` must match `data-code-type`

### Code Toggle Not Working

1. **Check classes**: Code block must have `.code-block` class
2. **Verify wrapper**: Toggle button is added automatically by `code-toggle.js`
3. **Check initialization**: Ensure `code-toggle.js` is loaded in layout

---

## Best Practices

### Code Organization

1. **One widget per concept**: Keep widgets focused on a single concept
2. **Clear parameter names**: Use descriptive `data-param` names
3. **Document parameters**: Comment which parameters come from widgets
4. **Error handling**: Python code should handle edge cases

### Performance

1. **Limit data points**: Use 100-200 points for fast rendering
2. **Avoid heavy computation**: Keep Python code efficient
3. **Cache results**: Consider caching if same computation runs multiple times

### User Experience

1. **Default values**: Set sensible defaults for sliders
2. **Clear labels**: Use descriptive labels for controls
3. **Code visibility**: Start with code hidden (`hidden` class)
4. **Responsive design**: Test on mobile devices

---

## File Structure Reference

### Key Files

- **`_diffequations/00_index.md`**: Main textbook landing page
- **`_layouts/textbook.html`**: Page template
- **`assets/js/widget-engine.js`**: Widget system (575 lines)
- **`assets/js/textbook-engine.js`**: Python execution (233 lines)
- **`assets/css/textbook.css`**: Stylesheet (535 lines)

### JavaScript Classes

1. **`WidgetEngine`**: Manages all widgets
   - Discovers widgets on page
   - Handles slider/dropdown events
   - Executes Python code
   - Manages plot rendering

2. **`TextbookEngine`**: Python execution
   - Loads Pyodide
   - Defines `create_plot()` helper
   - Executes Python code
   - Renders Plotly plots

3. **`ThemeManager`**: Theme switching
   - Toggles dark/light theme
   - Persists preference in localStorage

4. **`CodeToggle`**: Code visibility
   - Adds toggle buttons
   - Manages show/hide state

---

## Examples

### Example 1: Simple Parameter Sweep

```html
<div class="widget-module" id="param-sweep">
  <div class="module-header">
    <h3>Parameter Sweep</h3>
    <div class="widget-controls">
      <div class="widget-control">
        <label>λ</label>
        <input type="range" class="widget-slider"
               data-param="lambda" min="0.1" max="3" step="0.1" value="1">
        <span class="widget-value" data-param="lambda">1.0</span>
      </div>
    </div>
    <button class="run-button widget-run">Run</button>
  </div>
  <div class="code-block hidden">
    <pre><code class="language-python"># Your code here using lambda_val
create_plot([trace], layout)</code></pre>
  </div>
  <div class="plotly-container widget-output"></div>
</div>
```

### Example 2: Multi-Parameter Widget

```html
<div class="widget-module" id="multi-param">
  <!-- ... header ... -->
  <div class="widget-controls">
    <div class="widget-control">
      <label>Initial Value</label>
      <input type="range" class="widget-slider"
             data-param="y0" min="0" max="5" step="0.1" value="1">
      <span class="widget-value" data-param="y0">1.0</span>
    </div>
    <div class="widget-control">
      <label>Time Span</label>
      <input type="range" class="widget-slider"
             data-param="t_max" min="1" max="10" step="0.5" value="5">
      <span class="widget-value" data-param="t_max">5.0</span>
    </div>
  </div>
  <!-- ... code block using y0_val and t_max_val ... -->
</div>
```

---

## CI/CD and Deployment

### GitHub Actions Workflow

The project uses **GitHub Actions** for automated building and deployment to GitHub Pages.

### Workflow Overview

When you push code to the `main` branch:

1. **Trigger**: Push to `main` branch automatically triggers deployment
2. **Build**: Jekyll builds the static site
3. **Deploy**: Built site is deployed to GitHub Pages
4. **Verify**: Check deployment status in GitHub Actions tab

### Deployment Process

**Step 1: Commit Changes**
```bash
cd jetbundle.github.io
git add -A
git commit -m "Description of changes"
git push origin main
```

**Step 2: Verify Push**
```bash
# Check git status
git status
# Should show: "Your branch is up to date with 'origin/main'"
# Should show: "nothing to commit, working tree clean"

# Verify latest commit
git log --oneline -1
```

**Step 3: Check Deployment Status**

1. Go to GitHub repository: `https://github.com/jetbundle/jetbundle.github.io`
2. Click **"Actions"** tab
3. View the latest workflow run:
   - Status should be: `completed`
   - Conclusion should be: `success`
   - Workflow name: `Deploy site`

**Step 4: Verify Deployment**

```bash
# Check deployment status via CLI (if gh CLI is installed)
gh run list --limit 1 --json status,conclusion,name --jq '.[] | "Status: \(.status) | Conclusion: \(.conclusion)"'
```

**Expected output**: `Status: completed | Conclusion: success`

### Deployment Workflow File

The workflow is defined in `.github/workflows/deploy.yml`:

```yaml
name: Deploy site

on:
  push:
    branches:
      - main
  workflow_dispatch:  # Allows manual triggering

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: "3.3"
          bundler-cache: true

      - name: Install dependencies
        run: bundle install

      - name: Build site
        run: bundle exec jekyll build
        env:
          JEKYLL_ENV: production

      - name: Deploy to GitHub Pages
        if: github.event_name != 'pull_request'
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./_site
          cname: jetbundle.github.io
```

**Workflow Steps Explained**:

1. **Checkout**: Downloads repository code to runner
2. **Setup Ruby**: Installs Ruby 3.3 and Jekyll dependencies
3. **Install dependencies**: Runs `bundle install` to get gems
4. **Build site**: Runs `jekyll build` to generate static HTML in `_site/`
5. **Deploy**: Pushes `_site/` directory to GitHub Pages branch

**Build Process**:
- Jekyll processes all Markdown files
- Applies layouts and includes
- Generates static HTML, CSS, JS
- Output goes to `_site/` directory
- This directory is deployed to GitHub Pages

**Deployment Verification**:
- Workflow status shows in GitHub Actions tab
- Successful deployment updates the live site within 2-5 minutes
- Failed builds show error messages in Actions logs

### Pre-Deployment Checklist

Before pushing changes, ensure:

1. ✅ **All files are saved**
2. ✅ **Working tree is clean** (`git status` shows no uncommitted changes)
3. ✅ **Code syntax is correct** (no JavaScript/Python syntax errors)
4. ✅ **Widget HTML structure is valid** (proper closing tags, correct classes)
5. ✅ **Python code is tested** (see Python Debugging section below)
6. ✅ **Links are correct** (absolute paths for internal links)
7. ✅ **No console errors** (test in browser DevTools)

### Post-Deployment Verification

After deployment completes:

1. **Wait 2-5 minutes** for GitHub Pages to update
2. **Visit the site**: `https://jetbundle.github.io/diffequations/`
3. **Test interactive widgets**:
   - Click "Run" buttons
   - Adjust sliders
   - Select dropdown options
   - Verify plots render correctly
4. **Check browser console** (F12) for JavaScript errors
5. **Test on different browsers** (Chrome, Firefox, Safari)

### Troubleshooting Failed Deployments

If deployment fails:

1. **Check GitHub Actions logs**:
   - Go to Actions tab
   - Click on failed workflow
   - Review error messages

2. **Common issues**:
   - **Jekyll build errors**: Invalid front matter, syntax errors in Markdown
   - **Missing files**: Referenced files don't exist
   - **Collection errors**: Incorrect `_config.yml` collection settings

3. **Fix and redeploy**:
   ```bash
   # Fix the issue
   # Commit the fix
   git add -A
   git commit -m "fix: description of fix"
   git push origin main
   # Wait for new deployment
   ```

### Manual Deployment Verification

To ensure deployment works correctly:

```bash
# 1. Verify all changes are committed
git status
# Should show: "nothing to commit, working tree clean"

# 2. Verify remote is up to date
git log --oneline -1
# Note the commit hash

# 3. Push changes
git push origin main

# 4. Verify push was successful
git fetch origin
git log origin/main --oneline -1
# Should match your local commit

# 5. Check deployment status (if gh CLI is available)
gh run list --limit 1 --json status,conclusion --jq '.[] | "Status: \(.status) | Conclusion: \(.conclusion)"'
# Expected: "Status: completed | Conclusion: success"

# 6. Wait 2-5 minutes for GitHub Pages to update
# 7. Test the live site at https://jetbundle.github.io/diffequations/
```

### Double-Checking Mechanism

**Before Every Push**:

1. ✅ **Check git status**: `git status` (should be clean)
2. ✅ **Review changes**: `git diff` (verify what's being committed)
3. ✅ **Test locally** (if Jekyll installed): `bundle exec jekyll serve`
4. ✅ **Verify syntax**: Check for JavaScript/Python syntax errors
5. ✅ **Check links**: Verify all internal links use absolute paths
6. ✅ **Test widgets**: Ensure widget HTML structure is correct

**After Every Push**:

1. ✅ **Wait for deployment**: 2-5 minutes
2. ✅ **Check Actions**: Verify workflow completes successfully
3. ✅ **Test live site**: Visit and test widgets
4. ✅ **Check console**: Look for JavaScript errors in browser DevTools
5. ✅ **Verify functionality**: Test all interactive features

**Continuous Monitoring**:

- Monitor GitHub Actions tab for failed builds
- Check browser console for runtime errors
- Test widgets after each deployment
- Verify plots render correctly

---

## Python Code Debugging and Validation

### Writing Robust Python Code for Widgets

When writing Python code for widgets, follow these guidelines to ensure correctness and avoid errors.

### 1. Parameter Validation

Always validate that parameters are within expected ranges:

```python
import numpy as np
from scipy.integrate import odeint

# Parameters from widgets (injected by widget engine)
# lambda_val, y0_val, t_max_val are set by widget sliders

# Validate parameters
if lambda_val <= 0:
    raise ValueError("Decay rate lambda must be positive")
if t_max_val <= 0:
    raise ValueError("Time span must be positive")
if not (-10 <= y0_val <= 10):
    raise ValueError("Initial value out of reasonable range")

def dydt(y, t, lambda_param):
    return -lambda_param * y

# Ensure time array is reasonable
t = np.linspace(0, t_max_val, min(200, int(t_max_val * 20)))
# Limit points for performance, ensure at least 10 points
if len(t) < 10:
    t = np.linspace(0, t_max_val, 10)

sol = odeint(dydt, y0_val, t, args=(lambda_val,))

# Validate solution
if np.any(np.isnan(sol)) or np.any(np.isinf(sol)):
    raise ValueError("Solution contains NaN or Inf values")

# Create plot
trace = {
    'x': t.tolist(),
    'y': sol.flatten().tolist(),
    'mode': 'lines',
    'name': f'y(t) = {y0_val} * exp(-{lambda_val}t)',
    'line': {'width': 3, 'color': '#3b82f6'}
}

layout = {
    'title': f'ODE Solution: dy/dt = -{lambda_val}*y',
    'xaxis': {'title': 'Time t'},
    'yaxis': {'title': 'y(t)'},
    'height': 400
}

# Store plot data for rendering
create_plot([trace], layout)
```

### 2. Error Handling

Use try-except blocks for robustness:

```python
import numpy as np
from scipy.integrate import odeint

try:
    # Parameters from widgets
    # lambda_val, y0_val, t_max_val are set by widget sliders

    # Validate inputs
    if lambda_val <= 0:
        raise ValueError("Lambda must be positive")

    def dydt(y, t, lambda_param):
        return -lambda_param * y

    t = np.linspace(0, t_max_val, 200)
    sol = odeint(dydt, y0_val, t, args=(lambda_val,))

    # Check for numerical issues
    if np.any(np.isnan(sol)) or np.any(np.isinf(sol)):
        raise ValueError("Numerical solution failed - try different parameters")

    trace = {
        'x': t.tolist(),
        'y': sol.flatten().tolist(),
        'mode': 'lines',
        'name': f'y(t) with λ={lambda_val}',
        'line': {'width': 3, 'color': '#3b82f6'}
    }

    layout = {
        'title': f'Solution: dy/dt = -{lambda_val}*y',
        'xaxis': {'title': 'Time t'},
        'yaxis': {'title': 'y(t)'},
        'height': 400
    }

    create_plot([trace], layout)

except Exception as e:
    # Error will be caught and displayed in the widget output
    # The error message will be shown to the user
    raise
```

### 3. Numerical Stability Checks

For numerical computations, check for:

- **NaN values**: `np.isnan(array)`
- **Infinity values**: `np.isinf(array)`
- **Extreme values**: Very large or very small numbers
- **Array dimensions**: Ensure arrays have correct shapes

```python
# After computing solution
sol = odeint(dydt, y0_val, t, args=(lambda_val,))

# Check for numerical issues
if np.any(np.isnan(sol)):
    raise ValueError("Solution contains NaN - check parameters")
if np.any(np.isinf(sol)):
    raise ValueError("Solution contains Inf - parameters may be too extreme")

# Check for reasonable values
max_val = np.max(np.abs(sol))
if max_val > 1e10:
    print(f"Warning: Very large values in solution (max={max_val:.2e})")
    # Optionally clip values or warn user
```

### 4. Testing Python Code Locally

**Before deploying**, test your Python code locally:

**Method 1: Use Python REPL**

```python
# Copy your widget code into a Python script
# Replace parameter variables with test values
lambda_val = 1.0
y0_val = 1.0
t_max_val = 5.0

# Run the code
import numpy as np
from scipy.integrate import odeint

def dydt(y, t, lambda_param):
    return -lambda_param * y

t = np.linspace(0, t_max_val, 200)
sol = odeint(dydt, y0_val, t, args=(lambda_val,))

# Verify output
print(f"Solution shape: {sol.shape}")
print(f"Solution range: [{np.min(sol):.4f}, {np.max(sol):.4f}]")
print(f"Has NaN: {np.any(np.isnan(sol))}")
print(f"Has Inf: {np.any(np.isinf(sol))}")

# Test create_plot structure (simulate)
trace = {
    'x': t.tolist()[:5],  # Test with small array
    'y': sol.flatten().tolist()[:5],
    'mode': 'lines',
    'name': 'test'
}
print(f"Trace keys: {trace.keys()}")
print(f"Trace x length: {len(trace['x'])}")
```

**Method 2: Test in Browser Console**

1. Open the deployed site
2. Open browser console (F12)
3. Click "Run" on your widget
4. Check console for:
   - Parameter values being used
   - Python execution errors
   - Plot data structure

**Method 3: Parameter Edge Cases**

Test your code with extreme parameter values:

```python
# Test cases to verify
test_cases = [
    {'lambda': 0.1, 'y0': 1.0, 't_max': 1.0},    # Small lambda, short time
    {'lambda': 3.0, 'y0': 1.0, 't_max': 10.0},   # Large lambda, long time
    {'lambda': 1.0, 'y0': -2.0, 't_max': 5.0},   # Negative initial value
    {'lambda': 1.0, 'y0': 0.0, 't_max': 5.0},    # Zero initial value
    {'lambda': 0.01, 'y0': 1.0, 't_max': 100.0}, # Very long time span
]
```

### 5. Debugging Python Code in Widgets

**Use print statements** (will appear in browser console):

```python
import numpy as np

# Parameters from widgets
# lambda_val, y0_val, t_max_val are set by widget sliders

# Debug: Print parameter values
print(f"Debug: lambda_val = {lambda_val}")
print(f"Debug: y0_val = {y0_val}")
print(f"Debug: t_max_val = {t_max_val}")

def dydt(y, t, lambda_param):
    return -lambda_param * y

t = np.linspace(0, t_max_val, 200)
print(f"Debug: Time array shape = {t.shape}, range = [{t.min()}, {t.max()}]")

sol = odeint(dydt, y0_val, t, args=(lambda_val,))
print(f"Debug: Solution shape = {sol.shape}")
print(f"Debug: Solution range = [{sol.min():.4f}, {sol.max():.4f}]")

# Rest of code...
```

**Check console output** in browser DevTools (F12 → Console tab) to see print statements.

### 6. Verifying Plot Data Structure

Before calling `create_plot()`, verify your data structure:

```python
# Before create_plot(), verify structure
trace = {
    'x': t.tolist(),
    'y': sol.flatten().tolist(),
    'mode': 'lines',
    'name': f'y(t)',
    'line': {'width': 3, 'color': '#3b82f6'}
}

# Debug: Verify trace structure
print(f"Debug: Trace keys = {list(trace.keys())}")
print(f"Debug: x length = {len(trace['x'])}")
print(f"Debug: y length = {len(trace['y'])}")
print(f"Debug: x and y match length = {len(trace['x']) == len(trace['y'])}")

layout = {
    'title': 'Plot Title',
    'xaxis': {'title': 'X Axis'},
    'yaxis': {'title': 'Y Axis'},
    'height': 400
}

# Verify layout
print(f"Debug: Layout keys = {list(layout.keys())}")

# Now create plot
create_plot([trace], layout)
```

### 7. Common Python Errors and Fixes

**Error: `NameError: name 'lambda_val' is not defined`**
- **Cause**: Parameter name mismatch between slider and Python code
- **Fix**: Ensure slider `data-param="lambda"` → Python variable `lambda_val`
- **Check**: Verify parameter injection in browser console logs

**Error: `ValueError: array must not contain infs or NaNs`**
- **Cause**: Numerical instability or invalid parameters
- **Fix**: Add parameter validation, check for extreme values
- **Prevention**: Validate inputs before computation

**Error: `TypeError: 'float' object cannot be interpreted as an integer`**
- **Cause**: Using float where integer expected (e.g., array size)
- **Fix**: Convert to int: `n_points = int(t_max_val * 10)`

**Error: Plot not rendering**
- **Cause**: `create_plot()` not called, or incorrect data structure
- **Fix**: Verify `create_plot([trace], layout)` is called
- **Check**: Verify plot data in console logs

**Error: `IndexError: list index out of range`**
- **Cause**: Accessing array elements that don't exist
- **Fix**: Check array dimensions before indexing
- **Prevention**: Use `len(array)` to verify size

### 8. Code Quality Checklist

Before deploying Python code in widgets, verify:

- [ ] **All parameters are validated** (range checks, type checks)
- [ ] **Numerical stability is checked** (NaN, Inf detection)
- [ ] **Error handling is present** (try-except blocks)
- [ ] **Array shapes are correct** (verify dimensions)
- [ ] **Plot data structure is valid** (correct keys, list conversion)
- [ ] **`create_plot()` is called** (required for rendering)
- [ ] **Code tested with edge cases** (extreme parameter values)
- [ ] **No hardcoded values** (all from widgets or clearly documented)
- [ ] **Comments explain complex logic** (especially numerical methods)

### 9. Debugging Workflow

**Step 1: Test Locally (Python)**
```bash
# Create test script
python test_widget_code.py
# Verify no errors, check output values
```

**Step 2: Test in Browser**
1. Deploy code
2. Open site in browser
3. Open DevTools console (F12)
4. Click "Run" on widget
5. Check console for:
   - Parameter values
   - Print statements
   - Error messages
   - Plot data structure

**Step 3: Verify Plot Renders**
- Check if plot appears in output container
- Verify plot data matches expectations
- Check for JavaScript errors

**Step 4: Test Edge Cases**
- Test with minimum parameter values
- Test with maximum parameter values
- Test with boundary conditions

**Step 5: Verify Correctness**
- Compare with known analytical solutions
- Verify numerical stability
- Check plot makes physical/mathematical sense

### 10. Example: Complete Debugging Session

```python
# Widget code with comprehensive debugging and validation
import numpy as np
from scipy.integrate import odeint

# Parameters from widgets (injected by widget engine)
# lambda_val, y0_val, t_max_val are set by widget sliders

# STEP 1: Validate inputs
print(f"=== Widget Execution Started ===")
print(f"Parameters: λ={lambda_val}, y₀={y0_val}, t_max={t_max_val}")

if lambda_val <= 0:
    raise ValueError(f"Lambda ({lambda_val}) must be positive")

if t_max_val <= 0:
    raise ValueError(f"Time span ({t_max_val}) must be positive")

# STEP 2: Define ODE
def dydt(y, t, lambda_param):
    result = -lambda_param * y
    if np.isnan(result) or np.isinf(result):
        raise ValueError(f"ODE evaluation failed: result = {result}")
    return result

# STEP 3: Create time array
n_points = min(200, max(10, int(t_max_val * 20)))
t = np.linspace(0, t_max_val, n_points)
print(f"Time array: {n_points} points, range [{t[0]:.2f}, {t[-1]:.2f}]")

# STEP 4: Solve ODE
try:
    sol = odeint(dydt, y0_val, t, args=(lambda_val,))
    print(f"Solution computed: shape={sol.shape}")
except Exception as e:
    raise ValueError(f"ODE solve failed: {e}")

# STEP 5: Validate solution
if np.any(np.isnan(sol)):
    raise ValueError("Solution contains NaN values")
if np.any(np.isinf(sol)):
    raise ValueError("Solution contains Inf values")

sol_flat = sol.flatten()
print(f"Solution range: [{np.min(sol_flat):.4f}, {np.max(sol_flat):.4f}]")

# STEP 6: Create plot data
trace = {
    'x': t.tolist(),
    'y': sol_flat.tolist(),
    'mode': 'lines',
    'name': f'y(t) = {y0_val:.2f} * exp(-{lambda_val:.2f}t)',
    'line': {'width': 3, 'color': '#3b82f6'}
}

# Verify trace
assert len(trace['x']) == len(trace['y']), "x and y must have same length"
assert len(trace['x']) > 0, "Data arrays cannot be empty"

layout = {
    'title': f'ODE Solution: dy/dt = -{lambda_val:.2f}*y',
    'xaxis': {'title': 'Time t'},
    'yaxis': {'title': 'y(t)'},
    'height': 400
}

print(f"Plot data created: {len(trace['x'])} points")
print(f"=== Widget Execution Complete ===")

# STEP 7: Render plot
create_plot([trace], layout)
```

This comprehensive debugging output helps identify exactly where issues occur.

### 11. Ensuring Correct Calculations

**Mathematical Verification**:

1. **Compare with Analytical Solutions**:
   ```python
   # For exponential decay: dy/dt = -λy
   # Analytical solution: y(t) = y₀ * exp(-λt)

   # Numerical solution
   sol_numerical = odeint(dydt, y0_val, t, args=(lambda_val,))

   # Analytical solution (for verification)
   sol_analytical = y0_val * np.exp(-lambda_val * t)

   # Compare (should be very close)
   error = np.abs(sol_numerical.flatten() - sol_analytical)
   max_error = np.max(error)
   print(f"Maximum error: {max_error:.2e}")

   # If error is too large, there's a problem
   if max_error > 1e-6:
       print("Warning: Large numerical error detected")
   ```

2. **Dimensional Analysis**:
   - Verify units make sense
   - Check parameter ranges are physically reasonable
   - Ensure time scales are appropriate

3. **Symmetry Checks**:
   - Test with symmetric initial conditions
   - Verify expected symmetries are preserved

4. **Conservation Laws**:
   - If applicable, verify conserved quantities (energy, momentum, etc.)

### 12. Preventing Website Errors

**JavaScript Errors**:
- Check browser console (F12) for errors
- Verify all required scripts are loaded
- Ensure widget structure matches expected format

**Python Execution Errors**:
- Validate all parameters before use
- Check for undefined variables
- Verify function signatures match calls

**Plot Rendering Errors**:
- Ensure `create_plot()` is called
- Verify plot data structure is correct
- Check that output container exists

### 13. Pre-Deployment Testing Workflow

**Complete Testing Checklist**:

```bash
# 1. Syntax Check
# - Validate HTML structure
# - Check JavaScript syntax
# - Verify Python code syntax

# 2. Local Testing (if Jekyll installed)
bundle exec jekyll serve
# Visit http://localhost:4000/diffequations/
# Test all widgets manually

# 3. Git Verification
git status                    # Should be clean
git diff                      # Review all changes
git log --oneline -1          # Verify commit message

# 4. Push and Monitor
git push origin main
# Wait for GitHub Actions
# Check Actions tab for success

# 5. Live Site Testing
# Visit https://jetbundle.github.io/diffequations/
# Test each widget:
#   - Click "Run" buttons
#   - Adjust sliders
#   - Select dropdown options
#   - Verify plots render
#   - Check browser console for errors
```

### 14. Common Calculation Errors

**Off-by-One Errors**:
- Verify array indexing (0-based in Python)
- Check loop ranges
- Ensure array lengths match

**Unit Conversion Errors**:
- Verify time units are consistent
- Check parameter scales
- Ensure all values use same units

**Numerical Precision**:
- Use appropriate data types (float64 for calculations)
- Avoid float32 unless performance-critical
- Check for precision loss in calculations

**Boundary Conditions**:
- Verify initial conditions are correct
- Check boundary handling in ODE solvers
- Ensure solution satisfies all constraints

---

## Further Customization

### Extending the Widget Engine

To add new control types, edit `assets/js/widget-engine.js`:

1. Add discovery logic in `discoverWidgets()`
2. Add event handlers in `attachWidgetListeners()`
3. Add parameter extraction in `executeWidget()`

### Adding New Python Libraries

Pyodide supports many packages. To add more:

1. Edit `assets/js/textbook-engine.js`
2. In the `init()` method, add:
   ```javascript
   await this.pyodide.loadPackage(['package-name']);
   ```

### Custom Plot Styling

Modify plot appearance in `widget-engine.js` in the `executeWidget()` method:

```javascript
if (isDark) {
  plotData.layout.font.color = '#f8fafc';
  plotData.layout.plot_bgcolor = '#0a0e1a';
  plotData.layout.paper_bgcolor = '#111827';
}
```

---

## Support

For issues or questions:

1. Check browser console (F12) for errors
2. Review this guide
3. Check GitHub repository issues
4. Review code comments in JavaScript files

---

**Last Updated**: 2025-01-XX

**Version**: 1.0
