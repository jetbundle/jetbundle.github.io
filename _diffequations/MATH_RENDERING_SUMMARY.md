# Math Rendering Setup Summary

## Quick Reference

### LaTeX Format Standards
- **Inline math:** `$...$` or `\(...\)`
- **Display math:** `$$...$$` or `\[...\]`
- **Use `\mid` instead of `|`** to avoid markdown table conflicts

### Rendering Engine
- **MathJax 3** (latest stable) - client-side rendering
- Loaded in both `head.html` (general pages) and `textbook.html` (textbook pages)
- Configuration: Supports `$`, `$$`, `\(`, `\[` delimiters

### Processing Pipeline

1. **Jekyll/Kramdown** processes markdown → converts to HTML
2. **MathJax 3** (client-side) renders LaTeX → converts to formatted equations
3. **Pipe character protection:** Using `\mid` prevents markdown from parsing math as tables

## Files Involved

### Configuration
- `_config.yml` - Kramdown settings (for reference, not actively used for math)
- `_includes/head.html` - MathJax 3 config for general pages
- `_layouts/textbook.html` - MathJax 3 config for textbook pages

### Processing
- Kramdown handles markdown → HTML conversion
- MathJax 3 handles LaTeX → rendered equations

## Best Practices

✅ **DO:**
- Use `$...$` for inline math
- Use `$$...$$` for display math (on separate lines)
- Use `\mid` for mathematical separators
- Place math delimiters on separate lines for display math

❌ **DON'T:**
- Use `|` in math expressions (causes table parsing issues)
- Mix delimiters within same expression
- Put code blocks inside math (they won't render as math)

## Testing

After any changes, verify:
1. Inline math renders: `$x^2$`
2. Display math renders: `$$\int_0^1 x dx$$`
3. Pipes work: `$\{x \mid x > 0\}$`
4. Complex equations work
5. Math doesn't render in code blocks
