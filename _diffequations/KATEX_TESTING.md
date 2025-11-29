# KaTeX Testing & Comparison

## Current Setup

**Math Engine:** KaTeX (0.16.9) - Currently Active  
**Configuration:** Set in `_config.yml` as `math_engine_client: 'katex'`

## Switching Between Engines

To switch back to MathJax, change in `_config.yml`:
```yaml
math_engine_client: 'mathjax'  # or 'katex'
```

## KaTeX vs MathJax Comparison

### Performance
- **KaTeX:** 10-100x faster rendering
- **Bundle Size:** ~50KB (KaTeX) vs ~60KB (MathJax 3)
- **Initial Load:** KaTeX loads faster, renders immediately
- **Dynamic Content:** KaTeX re-renders faster when content changes

### LaTeX Feature Support

| Feature | KaTeX | MathJax 3 |
|---------|-------|-----------|
| Basic math | ✅ Excellent | ✅ Excellent |
| Fractions, roots | ✅ Yes | ✅ Yes |
| `\mid` separator | ✅ Yes | ✅ Yes |
| `\left|` `\right|` | ✅ Yes | ✅ Yes |
| `\tag{}` | ❌ No | ✅ Yes |
| `\label{}` `\ref{}` | ❌ No | ✅ Yes |
| Complex environments | ⚠️ Limited | ✅ Excellent |
| Custom macros | ⚠️ Limited | ✅ Extensive |

### Compatibility with Your Content

**Currently Using (All Supported by KaTeX):**
- `$...$` inline math ✅
- `$$...$$` display math ✅
- `\mid` for separators ✅
- `\left|` and `\right|` ✅
- Fractions, integrals, sums ✅
- Greek letters ✅
- Superscripts/subscripts ✅

**Potentially Missing (Check if used):**
- `\tag{}` for numbered equations
- `\label{}` and `\ref{}` for cross-references
- Some advanced AMS environments

## Testing Checklist

### Basic Functionality
- [ ] Inline math: `$x^2 + y^2 = r^2$`
- [ ] Display math: `$$\int_0^1 x dx = \frac{1}{2}$$`
- [ ] Math with pipes: `$\{x \mid x > 0\}$`
- [ ] Math with `\left|` and `\right|`
- [ ] Fractions: `$\frac{a}{b}$`
- [ ] Integrals, sums, products
- [ ] Greek letters: `$\alpha, \beta, \gamma$`

### Advanced Features
- [ ] Complex multi-line equations
- [ ] Matrices
- [ ] Aligned equations
- [ ] Math in code examples (should NOT render)
- [ ] Math in tables (should render correctly)

### Performance
- [ ] Page load speed
- [ ] Rendering speed on pages with many equations
- [ ] Re-rendering when content dynamically changes

### Known Issues to Watch For

1. **Missing `\tag{}` support**
   - If equations use `\tag{}`, they won't render
   - Workaround: Use manual numbering or switch to MathJax

2. **Limited environment support**
   - Some AMS environments may not work
   - Check if your content uses unsupported environments

3. **Plotly integration**
   - Plotly has built-in MathJax support
   - With KaTeX, LaTeX in Plotly plots may not render
   - This is handled gracefully (plots work, just no LaTeX labels)

## Performance Benchmarks

### Expected Improvements
- **Initial render:** 50-90% faster
- **Re-render:** 70-95% faster
- **Bundle size:** ~17% smaller
- **Memory usage:** Lower

## If You Need to Switch Back

1. Edit `_config.yml`:
   ```yaml
   math_engine_client: 'mathjax'
   ```

2. Commit and push:
   ```bash
   git add _config.yml
   git commit -m "Switch back to MathJax"
   git push
   ```

3. All changes are automatic - no other files need modification

## Reporting Issues

If you encounter rendering issues with KaTeX:

1. Check browser console for errors
2. Verify the LaTeX syntax is valid
3. Check if the feature is supported: https://katex.org/docs/supported.html
4. If unsupported, note the feature and consider switching to MathJax

## Recommendations

**Use KaTeX if:**
- ✅ You prioritize performance
- ✅ You don't need `\tag{}` or `\label{}`
- ✅ You don't use advanced AMS environments
- ✅ Your content uses standard LaTeX features

**Use MathJax if:**
- ✅ You need maximum LaTeX compatibility
- ✅ You use `\tag{}` for numbered equations
- ✅ You use advanced environments
- ✅ You need Plotly LaTeX integration

## Current Status

**Active:** KaTeX (for testing)  
**Fallback:** Easy switch to MathJax available  
**Compatibility:** All current content should work with KaTeX

