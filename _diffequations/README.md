# Differential Equations Textbook - Implementation Guide

This document provides a comprehensive guide to understanding, using, and customizing the interactive differential equations textbook infrastructure.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Directory Structure](#directory-structure)
3. [Creating Content Pages](#creating-content-pages)
4. [Widget System](#widget-system)
5. [Adding Interactive Widgets](#adding-interactive-widgets)
6. [Code Execution System](#code-execution-system)
7. [Customization Guide](#customization-guide)
8. [Advanced Features](#advanced-features)
9. [Troubleshooting](#troubleshooting)

---

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

