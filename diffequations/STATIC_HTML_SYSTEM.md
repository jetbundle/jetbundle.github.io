# Static HTML System Documentation

## Overview

This document describes the complete static HTML system for the differential equations textbook. The system converts Markdown source files to fully self-contained HTML pages with integrated Python/Plotly widgets, dark theme, and interactive navigation.

## Architecture

### Core Components

1. **Source Files**: Markdown files in `_diffequations/` directory
2. **Conversion Script**: `convert_to_html.py` - Converts Markdown to HTML
3. **Output**: Static HTML files in `diffequations/` directory
4. **JavaScript Engines**: Widget and Python execution engines
5. **Styling**: Dark theme CSS with responsive design

### Technology Stack

- **Markdown Processing**: Python `markdown` library
- **Math Rendering**: KaTeX (client-side, reliable)
- **Python Execution**: Pyodide 0.24.1 (WebAssembly)
- **Plotting**: Plotly.js 2.27.0
- **Navigation**: Custom JavaScript with dropdown menus
- **Theme**: Dark theme by default

## File Structure

```
jetbundle.github.io/
├── diffequations/               # Static HTML files (source of truth)
│   ├── index.html               # Main index
│   ├── epilogue/
│   │   └── index.html
│   ├── chapter-*/               # Chapter directories
│   │   ├── index.html           # Chapter index
│   │   └── */                   # Section directories
│   │       └── index.html
│   ├── styles.css               # Dark theme stylesheet
│   ├── navigation.js            # Navigation bar logic
│   ├── navigation-data.js        # Navigation structure
│   ├── manifold-background.js   # Animated background
│   └── js/                      # JavaScript engines
│       ├── textbook-engine.js   # Pyodide/Python execution
│       └── widget-engine.js     # Widget system
│
└── convert_to_html.py           # Conversion script
```

## Content Management

### Direct HTML Editing

All content is now managed directly in HTML files. The system uses static HTML files as the source of truth.

**HTML File Structure:**

Each HTML file includes:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Meta tags -->
  <!-- KaTeX CSS and scripts -->
  <!-- styles.css -->
  <!-- navigation-data.js -->
  <!-- manifold-background.js (index only) -->
</head>
<body>
  <main>
    <header>
      <h1>Page Title</h1>
    </header>
    <article>
      <!-- Converted Markdown content -->
    </article>
  </main>
  <!-- navigation.js -->
  <!-- Plotly.js (lazy-loaded) -->
  <!-- textbook-engine.js -->
  <!-- widget-engine.js -->
</body>
</html>
```

## JavaScript Architecture

### 1. Navigation System

**Files:**
- `navigation-data.js`: Defines chapter/section structure
- `navigation.js`: Renders navigation bar with dropdowns

**Features:**
- Dynamic dropdown menus for chapters
- Active link highlighting
- Responsive mobile design
- Auto-generated from navigation data

### 2. Python Execution Engine

**File:** `diffequations/js/textbook-engine.js`

**Class:** `TextbookEngine`

**Responsibilities:**
- Lazy-loads Pyodide on-demand
- Executes Python code from widgets
- Defines `create_plot()` helper function
- Renders Plotly plots with dark theme
- Handles errors gracefully

**Key Methods:**
- `init()`: Loads Pyodide and NumPy/SciPy packages
- `waitForLoad()`: Ensures Pyodide is ready
- `runModule()`: Executes Python code and renders plots

**Dark Theme Default:**
```javascript
// Defaults to dark theme if themeManager not available
const isDark = !window.themeManager ||
               (window.themeManager && window.themeManager.currentTheme === 'dark');
const plotlyTemplate = isDark ? 'plotly_dark' : 'plotly_white';
```

### 3. Widget Engine

**File:** `diffequations/js/widget-engine.js`

**Class:** `WidgetEngine`

**Responsibilities:**
- Discovers widgets on page
- Manages slider/dropdown controls
- Injects parameters into Python code
- Handles code selection via dropdowns
- Executes widgets and renders plots

**Widget Structure:**
```html
<div class="widget-module" id="my-widget">
  <div class="module-header">
    <h3>Widget Title</h3>
    <div class="widget-controls">
      <!-- Sliders and dropdowns -->
    </div>
    <button class="run-button widget-run">Run</button>
  </div>
  <div class="code-block hidden">
    <pre><code class="language-python"># Python code</code></pre>
  </div>
  <div class="plotly-container widget-output"></div>
</div>
```

**Parameter Injection:**
- Slider `data-param="lambda"` → Python variable `lambda_val`
- Dropdown `data-param="method"` → Python variable `method_val`
- Parameters injected after imports in Python code

**Code Selection:**
- Dropdown with `data-code-selector="true"` selects code blocks
- Code blocks with `data-code-type="mode1"` match dropdown values
- Only selected code block is executed

### 4. Animated Background

**File:** `manifold-background.js`

**Features:**
- Subtle animated manifold visualization
- 12% opacity for non-intrusive effect
- Computationally efficient (delta time, optimized drawing)
- Pauses when tab is hidden
- Only on main index page

## CSS Architecture

### Dark Theme System

**File:** `diffequations/styles.css`

**CSS Variables:**
```css
:root {
    --bg-primary: #0d1117;
    --bg-secondary: #161b22;
    --bg-tertiary: #1c2128;
    --text-primary: #e6edf3;
    --text-secondary: #8b949e;
    --link-color: #58a6ff;
    --link-hover: #79c0ff;
    /* ... more variables ... */
}
```

**Default Theme:**
- Dark theme is the default (no theme switching)
- All colors optimized for dark backgrounds
- High contrast for readability

### Widget Styles

**Key Classes:**
- `.widget-module`: Container for interactive widgets
- `.widget-slider`: Range input controls
- `.widget-dropdown`: Select controls
- `.widget-output`: Plotly container
- `.run-button`: Execute button
- `.code-block`: Python code container (hidden by default)

**Responsive Design:**
- Mobile-friendly layouts
- Flexible widget controls
- Adaptive navigation

## Python Interface

### Writing Widget Code

**Template:**
```python
import numpy as np
from scipy.integrate import odeint

# Parameters from widgets (injected automatically)
# lambda_val, y0_val, t_max_val are set by sliders

def dydt(y, t, lambda_param):
    return -lambda_param * y

t = np.linspace(0, t_max_val, 100)
sol = odeint(dydt, y0_val, t, args=(lambda_val,))

trace = {
    'x': t.tolist(),
    'y': sol.flatten().tolist(),
    'mode': 'lines',
    'name': f'y(t) with λ={lambda_val}',
    'line': {'width': 3, 'color': '#58a6ff'}
}

layout = {
    'title': f'ODE Solution: dy/dt = -{lambda_val}*y',
    'xaxis': {'title': 'Time t'},
    'yaxis': {'title': 'y(t)'},
    'height': 400
}

create_plot([trace], layout)
```

### Available Libraries

- **NumPy**: Full NumPy support
- **SciPy**: Including `scipy.integrate` for ODE solving
- **Standard Python**: All standard library modules

### Plot Creation

**Function:** `create_plot(traces, layout)`

**Parameters:**
- `traces`: List of trace dictionaries (Plotly format)
- `layout`: Layout dictionary (Plotly format)

**Trace Dictionary:**
```python
{
    'x': [1, 2, 3],           # X data (list)
    'y': [4, 5, 6],           # Y data (list)
    'mode': 'lines',          # 'lines', 'markers', 'lines+markers'
    'name': 'Trace Name',      # Legend label
    'line': {                 # Line styling
        'width': 3,
        'color': '#58a6ff'
    }
}
```

**Layout Dictionary:**
```python
{
    'title': 'Plot Title',
    'xaxis': {'title': 'X Axis Label'},
    'yaxis': {'title': 'Y Axis Label'},
    'height': 400
}
```

**Dark Theme:**
- Automatically applies `plotly_dark` template
- Sets font colors and backgrounds for dark theme
- No manual configuration needed

## Customization Guide

### Adding New Widgets

1. **Add HTML to Markdown:**
```html
<div class="widget-module" id="unique-widget-id">
  <!-- Widget structure -->
</div>
```

2. **Define Controls:**
```html
<div class="widget-control">
  <label>Parameter Name</label>
  <input type="range" class="widget-slider"
         data-param="param_name"
         min="0" max="10" step="0.1" value="1">
  <span class="widget-value" data-param="param_name">1.0</span>
</div>
```

3. **Write Python Code:**
```python
# Use param_name_val in your code
result = compute(param_name_val)
create_plot([trace], layout)
```

### Modifying Styles

**Edit:** `diffequations/styles.css`

**Change Colors:**
```css
:root {
    --link-color: #your-color;
    --bg-primary: #your-bg;
    /* ... */
}
```

**Modify Widget Appearance:**
```css
.widget-module {
    border-radius: 16px;  /* More rounded */
    padding: 2rem;         /* More spacing */
}
```

### Adding Navigation Items

**Edit:** `diffequations/navigation-data.js`

```javascript
const navigationData = {
    1: {
        title: "Chapter 1: Title",
        sections: {
            "01-1-section": "Section 1.1: Name",
            // Add new sections here
        }
    }
};
```

### Customizing Math Rendering

**KaTeX Configuration:**
- Located in `convert_to_html.py` (KATEX_RENDERER constant)
- Supports `$...$` (inline) and `$$...$$` (display)
- Auto-renders on page load

**To Change Renderer:**
1. Modify `KATEX_RENDERER` in `convert_to_html.py`
2. Regenerate HTML files

## Workflow for Content Updates

### Adding New Content

1. **Create HTML File:**
   - Create new directory: `diffequations/chapter-XX/XX-Y-section/`
   - Add `index.html` file
   - Use existing HTML files as templates
   - Include proper structure with KaTeX, CSS, and scripts

2. **Add Widget (Optional):**
   - Insert widget HTML block
   - Write Python code in code block
   - Define slider/dropdown controls

3. **Update Navigation:**
   - Edit `diffequations/navigation-data.js`
   - Add new section to appropriate chapter

4. **Commit and Push:**
   ```bash
   git add diffequations/
   git commit -m "Add new section"
   git push
   ```

### Modifying Existing Content

1. **Edit HTML Directly:**
   - Modify files in `diffequations/`
   - Edit content, widgets, or math directly in HTML
   - LaTeX math uses `$...$` (inline) and `$$...$$` (display)

2. **Test Locally:**
   - Open HTML files in browser
   - Test widgets and navigation

3. **Deploy:**
   ```bash
   git add -A
   git commit -m "Update content"
   git push
   ```

## Performance Optimizations

### Lazy Loading

- **Pyodide**: Loads only when widget is executed (saves ~10MB initial load)
- **Plotly.js**: Loads after page is fully rendered
- **JavaScript Engines**: Load with `defer` attribute

### Efficient Rendering

- **Delta Time**: Animated background uses delta time for frame-rate independence
- **Throttling**: Widget updates throttled to 150ms for smooth performance
- **Plotly.react**: Uses efficient updates for continuous widgets

### Caching

- **Navigation Data**: Loaded once per page
- **CSS**: Single stylesheet, cached by browser
- **JavaScript**: Deferred loading, cached after first load

## Browser Compatibility

### Supported Browsers

- **Chrome/Edge**: Full support (recommended)
- **Firefox**: Full support
- **Safari**: Full support (iOS 12+)
- **Opera**: Full support

### Required Features

- **WebAssembly**: For Pyodide (all modern browsers)
- **ES6 JavaScript**: For widget engine
- **CSS Variables**: For theming
- **Canvas API**: For animated background

## Troubleshooting

### Widget Not Executing

1. **Check Console:**
   - Open browser DevTools (F12)
   - Look for JavaScript errors
   - Check Pyodide loading messages

2. **Verify Structure:**
   - Ensure `.widget-module` class exists
   - Check for `.widget-run` button
   - Verify `.widget-output` container

3. **Check Parameters:**
   - Slider `data-param` must match Python variable name + `_val`
   - Example: `data-param="lambda"` → `lambda_val` in Python

### Plot Not Rendering

1. **Verify `create_plot()` Call:**
   - Must call `create_plot([trace], layout)`
   - Trace and layout must be dictionaries

2. **Check Data Format:**
   - Arrays must be converted to lists: `.tolist()`
   - All values must be JSON-serializable

3. **Check Console:**
   - Look for Plotly errors
   - Verify plot data structure

### Math Not Rendering

1. **Check Delimiters:**
   - Use `$...$` for inline math
   - Use `$$...$$` for display math
   - Avoid `|` in math (use `\vert` or `\mid`)

2. **Verify KaTeX Loaded:**
   - Check console for KaTeX errors
   - Ensure scripts are loaded

### Navigation Not Working

1. **Check Navigation Data:**
   - Verify `navigation-data.js` structure
   - Ensure permalinks match file paths

2. **Check JavaScript:**
   - Verify `navigation.js` is loaded
   - Check for console errors

## Best Practices

### Code Organization

1. **One Widget Per Concept**: Keep widgets focused
2. **Clear Parameter Names**: Use descriptive `data-param` values
3. **Document Parameters**: Comment which parameters come from widgets
4. **Error Handling**: Validate inputs in Python code

### Performance

1. **Limit Data Points**: Use 100-200 points for fast rendering
2. **Avoid Heavy Computation**: Keep Python code efficient
3. **Use Throttling**: For continuous widgets

### User Experience

1. **Default Values**: Set sensible defaults for sliders
2. **Clear Labels**: Use descriptive labels for controls
3. **Code Visibility**: Start with code hidden (`hidden` class)
4. **Responsive Design**: Test on mobile devices

## Migration from Jekyll

### What Changed

- **No Jekyll Processing**: Static HTML files instead
- **No Liquid Templates**: Plain HTML in output
- **No Server-Side Rendering**: All rendering is client-side
- **Simplified Deployment**: Just static files on GitHub Pages

### What Stayed the Same

- **Source Format**: Markdown files with front matter
- **Widget API**: Same HTML structure and Python interface
- **Navigation**: Same structure and behavior
- **Styling**: Same dark theme and appearance

### Benefits

- **Faster Loading**: No server-side processing
- **More Reliable**: No Jekyll build issues
- **Easier Deployment**: Just push HTML files
- **Better Performance**: Optimized static assets

## Future Enhancements

### Potential Additions

1. **Code Syntax Highlighting**: Add Prism.js for code blocks
2. **Search Functionality**: Client-side search index
3. **Print Styles**: Enhanced print CSS
4. **Offline Support**: Service worker for offline access
5. **Export Features**: PDF generation, code export

### Extensibility

The system is designed to be easily extensible:

- **New Widget Types**: Add to `widget-engine.js`
- **New Python Libraries**: Add to Pyodide package list
- **New Themes**: Modify CSS variables
- **New Features**: Add JavaScript modules

## Conclusion

This static HTML system provides a robust, performant, and maintainable solution for interactive educational content. It combines the simplicity of static files with the power of client-side computation, creating an optimal experience for both authors and readers.

For questions or issues, refer to the troubleshooting section or examine the source code in the `diffequations/` directory.
