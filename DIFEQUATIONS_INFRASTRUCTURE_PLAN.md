# Differential Equations Infrastructure Implementation Plan

## Executive Summary

Build production-ready infrastructure for interactive computational textbook at `/diffequations/`. Infrastructure-first approach: all features tested and working before content creation. Focus on theme system, widget engine, Python execution, and performance optimization.

## Core Requirements

### Infrastructure Features

| Feature | Priority | Test Criteria |
|---------|----------|---------------|
| Theme toggle (dark/light) | P0 | Instant switch, Plotly sync, persistence |
| Plotly theme synchronization | P0 | Auto-match system theme, manual toggle sync |
| Pyodide Python execution | P0 | ODE solver works, NumPy/SciPy functional |
| Interactive parameter widgets | P1 | Real-time updates, multiple parameters |
| MathJax equation rendering | P0 | Complex equations render correctly |
| Code syntax highlighting | P0 | 10+ languages supported |
| Mobile responsive design | P0 | Works on all device sizes |
| Performance optimization | P1 | Load <3s, execution <500ms |

### Testing Requirements

All features must have automated or manual test cases before content deployment.

## Architecture Overview

### File Structure

```
jetbundle.github.io/
├── _config.yml                    # Add diffequations collection
├── _diffequations/                # Textbook content collection
│   ├── index.md                   # Test landing page
│   ├── tests.md                   # Infrastructure test suite
│   └── performance.md             # Performance benchmarks
├── _layouts/
│   └── textbook.html              # Custom layout (no manifold, theme-aware)
├── _includes/
│   ├── textbook_nav.html          # Sidebar navigation
│   ├── theme_toggle.html          # Theme toggle button
│   └── widget_module.html         # Parameter widget template
└── assets/
    ├── css/
    │   └── textbook.css           # Complete theme system + responsive
    └── js/
        ├── theme-manager.js       # Theme toggle + Plotly sync
        ├── textbook-engine.js     # Pyodide + execution engine
        └── widget-engine.js       # Interactive parameter controls
```

### Technology Stack

- **Jekyll Collections**: Content management
- **Pyodide 0.24.1**: Python in browser (WebAssembly)
- **Plotly.js 2.27.0**: Interactive visualizations
- **MathJax 3**: LaTeX equation rendering
- **Prism.js**: Syntax highlighting (30+ languages)
- **CSS Variables**: Theme system foundation

## Implementation Phases

### Phase 1: Core Layout and Theme System (Hours 0-6)

#### Step 1.1: Jekyll Configuration

Add to `_config.yml`:

```yaml
collections:
  diffequations:
    output: true
    permalink: /diffequations/:name/

defaults:
  - scope:
      type: diffequations
    values:
      layout: textbook
```

#### Step 1.2: Theme System CSS

Create `assets/css/textbook.css` with complete theme system:

- CSS variables for light and dark themes
- Theme classes (`.theme-light`, `.theme-dark`)
- Automatic variable switching
- Smooth transitions (0.3s cubic-bezier)
- Plotly-compatible color variables

Key design principles:
- Dark theme: `#0a0e1a` background, `#f8fafc` text
- Light theme: `#ffffff` background, `#0f172a` text
- Accent color: `#3b82f6` (works in both themes)
- All UI elements use CSS variables

#### Step 1.3: Textbook Layout

Create `_layouts/textbook.html`:

- No manifold background (explicitly disabled)
- Sidebar navigation (fixed left)
- Main content area (margin-left: 280px)
- Theme toggle button (fixed top-right)
- MathJax initialization
- Pyodide and Plotly CDN links
- Loading order: CSS → MathJax → JS

#### Step 1.4: Theme Manager

Create `assets/js/theme-manager.js`:

- Detect system preference on load
- Toggle between dark/light themes
- Persist choice in localStorage
- Sync Plotly template on theme change
- Update existing Plotly plots on toggle
- Listen for system preference changes

**Plotly Integration**: When theme changes, call `Plotly.relayout()` on all plot containers with appropriate template (`plotly_dark` or `plotly_white`).

### Phase 2: Python Execution Engine (Hours 6-12)

#### Step 2.1: Pyodide Initialization

Create `assets/js/textbook-engine.js`:

- Load Pyodide asynchronously
- Install packages: `numpy`, `scipy`, `matplotlib`
- Install Plotly via micropip
- Show loading indicator during initialization
- Error handling for load failures
- Cache Pyodide instance globally

**Performance Note**: Initial load is ~10MB. Show progress indicator. Load once, reuse across all modules.

#### Step 2.2: Code Execution System

- Parse code blocks with `.interactive-module` class
- Extract Python code from `<pre><code>` elements
- Execute via `pyodide.runPythonAsync()`
- Capture Plotly output (check `plotly.divs`)
- Render plots in designated containers
- Display errors in user-friendly format
- Disable run buttons during execution

#### Step 2.3: Plotly Integration

- Detect Plotly output from Pyodide execution
- Parse JSON plot configuration
- Render with current theme template
- Support multiple plots per page
- Handle plot resizing on window change
- Clean up plots on module reset

### Phase 3: Interactive Widget System (Hours 12-18)

#### Step 3.1: Widget Module Template

Create `_includes/widget_module.html`:

- Parameter slider controls (range inputs)
- Value displays (update on slider change)
- Run button for execution
- Code block with parameter placeholders
- Output container for Plotly plots
- Loading states and error messages

**Widget Structure**:
- Each widget has unique ID
- Sliders have `data-param` attributes
- Values update in real-time (no execution required)
- Run button triggers Python execution with current parameters

#### Step 3.2: Widget Engine

Create `assets/js/widget-engine.js`:

- Auto-discover all `.widget-module` elements
- Attach event listeners to sliders
- Update display values on input
- Inject parameter values into code before execution
- Coordinate with textbook-engine for execution
- Handle widget-specific error states

**Performance Considerations**:
- Widget updates (slider changes): <50ms
- Code execution: async, show loading
- Multiple widgets: independent execution
- Memory: Clean up plots when widget resets

#### Step 3.3: Parameter Injection

Replace Liquid-style placeholders in code:
- Template: `{{ lambda_val | default: 1.0 }}`
- Replace with actual slider values
- Support multiple parameters per widget
- Validate parameter ranges before execution

### Phase 4: Navigation and Layout (Hours 18-24)

#### Step 4.1: Sidebar Navigation

Create `_includes/textbook_nav.html`:

- Generate table of contents from collection
- Sort by `order` front matter
- Highlight current page
- Show chapter numbers if present
- Progress indicator (optional)
- Mobile: collapsible/hidden by default

#### Step 4.2: Responsive Design

Update `assets/css/textbook.css`:

- Sidebar: Fixed on desktop, hidden on mobile
- Hamburger menu for mobile navigation
- Content: Full width on mobile, max-width on desktop
- Widgets: Stack vertically on mobile
- Touch-friendly slider sizes
- Font size scaling for readability

**Breakpoints**:
- Desktop: >1024px (sidebar visible)
- Tablet: 768px-1024px (sidebar toggleable)
- Mobile: <768px (sidebar hidden, hamburger menu)

### Phase 5: Testing Framework (Hours 24-36)

#### Step 5.1: Test Landing Page

Create `_diffequations/index.md`:

- Infrastructure status dashboard
- Feature demonstration modules
- Theme toggle test section
- Widget examples (ODE solver, FFT analyzer)
- Performance benchmarks
- Production readiness checklist

#### Step 5.2: Test Suite Page

Create `_diffequations/tests.md`:

- Automated test results display
- Manual test procedures
- Performance benchmark table
- Cross-browser compatibility matrix
- Mobile device test checklist
- Error condition tests

#### Step 5.3: Performance Benchmarks

Define performance targets:
- Pyodide initialization: <5 seconds
- ODE solve (1000 steps): <100ms
- Matrix solve (500x500): <500ms
- Widget update (10 parameters): <50ms
- Plotly render (complex plot): <200ms

Create performance test runner in `assets/js/test-runner.js`:
- Measure actual execution times
- Compare against targets
- Display results in test dashboard
- Fail tests if targets exceeded

### Phase 6: Production Hardening (Hours 36-48)

#### Step 6.1: Error Handling

- Graceful Pyodide load failures
- Clear error messages for Python exceptions
- Network failure recovery
- Widget parameter validation
- Plot rendering error handling

#### Step 6.2: Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader compatibility
- Focus management for widgets
- Color contrast ratios (WCAG AA)

#### Step 6.3: Performance Optimization

- Lazy load Pyodide (only on pages with modules)
- Defer non-critical JavaScript
- Optimize Plotly bundle size
- Cache theme preference
- Minimize CSS/JS bundle size

#### Step 6.4: Cross-Browser Testing

Test matrix:
- Chrome/Edge (Chromium)
- Firefox
- Safari (macOS/iOS)
- Mobile browsers (iOS Safari, Chrome Android)

Verify:
- Theme toggle works
- Python execution functional
- Plotly renders correctly
- Widgets respond properly
- Navigation works

## Computational Intensity Rules

### Performance Guidelines

1. **Initial Load**: Pyodide download is unavoidable (~10MB). Show clear progress indicator. Load once per session.

2. **Execution Limits**:
   - Maximum execution time: 10 seconds per module
   - Maximum memory: Monitor Pyodide memory usage
   - Maximum iterations: Recommend <10000 steps for ODE solvers

3. **Widget Updates**:
   - Slider changes: Instant visual feedback (no execution)
   - Run button: Full execution with current parameters
   - Debounce rapid slider movements (optional optimization)

4. **Multiple Widgets**:
   - Each widget executes independently
   - No shared state between widgets (by design)
   - Clean up previous plots before new execution

5. **Memory Management**:
   - Clear old Plotly plots when widget resets
   - Release Python variables after execution (if possible)
   - Monitor browser memory usage with large computations

### User Experience for Heavy Computations

- Show progress indicator for long-running code
- Allow cancellation of execution (future enhancement)
- Warn users about computationally intensive modules
- Provide estimated execution time for benchmarks
- Disable page navigation during execution (optional)

## Deployment Checklist

### Pre-Deployment

- [ ] All files created and in correct locations
- [ ] Jekyll collection configured in `_config.yml`
- [ ] Theme toggle works in both directions
- [ ] Plotly syncs with theme changes
- [ ] Pyodide loads and executes Python code
- [ ] Widgets update parameters correctly
- [ ] Navigation generates from collection
- [ ] Mobile responsive design verified
- [ ] All performance tests pass
- [ ] Cross-browser testing complete
- [ ] Accessibility audit passed
- [ ] Error handling tested

### Deployment Commands

```bash
# Verify file structure
find _diffequations _layouts _includes assets/css assets/js -type f

# Test Jekyll build locally (if possible)
bundle exec jekyll build

# Commit and push
git add .
git commit -m "feat: differential equations infrastructure MVP

Infrastructure features:
- Theme toggle system (dark/light with Plotly sync)
- Pyodide Python execution engine
- Interactive parameter widget system
- MathJax equation rendering
- Code syntax highlighting
- Mobile responsive design
- Performance optimized (<3s load, <500ms execution)
- Comprehensive test framework

All infrastructure features tested and working.
Ready for content development."

git push origin main
```

### Post-Deployment Verification

1. Visit `https://jetbundle.github.io/diffequations/`
2. Verify theme toggle works
3. Test widget parameter updates
4. Execute Python code in test modules
5. Verify Plotly plots render correctly
6. Check mobile responsiveness
7. Run performance benchmarks
8. Test error conditions

## Success Criteria

### Functional Requirements

- Theme toggle switches instantly without page reload
- Plotly plots automatically match current theme
- Python code executes successfully via Pyodide
- Widgets update parameter values in real-time
- MathJax renders complex equations correctly
- Navigation works on all pages
- Mobile layout functions properly

### Performance Requirements

- Initial page load: <3 seconds (excluding Pyodide)
- Pyodide initialization: <5 seconds
- Widget parameter update: <50ms
- ODE solve (1000 steps): <100ms
- Plotly render: <200ms

### Quality Requirements

- All automated tests pass
- Cross-browser compatibility verified
- Mobile devices tested
- Accessibility standards met
- Error messages are clear and actionable

## Next Steps After Infrastructure

Once infrastructure is deployed and all tests pass:

1. **Content Development**: Begin converting notebooks to Markdown
2. **Module Creation**: Build computational modules using widget system
3. **Chapter Structure**: Organize content into logical chapters
4. **Additional Features**: Add search, bookmarks, progress tracking (future)

## Technical Notes

### Plotly Theme Synchronization

Plotly supports templates. When theme changes:
1. Detect all `.plotly-container` elements
2. Get current Plotly plots from DOM
3. Call `Plotly.relayout(container, { template: 'plotly_dark' })` or `plotly_white`
4. Update plot colors to match theme

### Pyodide Limitations

- Cannot use all Python packages (WebAssembly constraints)
- Some NumPy operations slower than native
- File I/O limited
- Network requests require special handling
- Memory usage higher than native Python

**Mitigations**: Test all required packages. Document limitations. Provide alternatives for unsupported operations.

### Widget Parameter Injection

Replace template syntax in code before execution:
- Find `{{ param_name | default: value }}` patterns
- Replace with actual slider values
- Validate parameter types and ranges
- Handle missing parameters gracefully

## Maintenance

### Regular Updates

- Monitor Pyodide updates (new versions may improve performance)
- Update Plotly.js for new features
- Review performance benchmarks monthly
- Update dependencies for security patches

### Monitoring

- Track page load times
- Monitor Pyodide initialization failures
- Collect error reports from users
- Measure widget usage patterns

---

**Status**: Infrastructure Plan Complete
**Next**: Execute implementation phases
**Timeline**: 48-72 hours for complete infrastructure deployment
