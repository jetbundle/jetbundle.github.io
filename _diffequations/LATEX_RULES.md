# LaTeX Compilation Rules - Quick Reference

## ✅ REQUIRED SYNTAX

### Inline Math
- **USE:** `\(...\)` 
- **NEVER:** `$...$` (conflicts with markdown tables)

### Display Math
- **USE:** `\[...\]`
- **ACCEPTABLE:** `$$...$$` (but `\[...\]` is preferred)

### Absolute Values
- **USE:** `\left|...\right|`
- **NEVER:** Bare `|` (gets parsed as table delimiter)

## Examples

### ✅ CORRECT
```markdown
The function \(f(x) = x^2\) is quadratic.

The condition \(\left|f(x,y_1) - f(x,y_2)\right| \leq K \left|y_1-y_2\right|\).

\[
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
\]
```

### ❌ INCORRECT
```markdown
The function $f(x) = x^2$ is quadratic.  <!-- Can break -->

The condition \(|f(x,y_1) - f(x,y_2)| \leq K |y_1-y_2|\).  <!-- Table parsing -->

$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$
<!-- Less standard -->
```

## Migration Checklist

When updating existing content:

- [ ] Replace all `$...$` with `\(...\)`
- [ ] Replace all bare `|` in math with `\left|...\right|`
- [ ] Ensure all `\left` have matching `\right`
- [ ] Test rendering in browser
- [ ] Verify no table parsing issues

## Why These Rules?

1. **`\(...\)` vs `$...$`**: Kramdown (Jekyll's markdown processor) interprets `|` as table delimiters. Using `\(...\)` avoids this conflict entirely.

2. **`\left|...\right|` vs `|`**: Bare pipes in math expressions get parsed as table delimiters by kramdown before MathJax can process them.

3. **Standards Compliance**: `\(...\)` and `\[...\]` are the standard LaTeX delimiters recommended by MathJax and LaTeX documentation.

## Configuration

The MathJax configuration in `_layouts/textbook.html` is set to:
- Use `\(...\)` and `\[...\]` as primary delimiters
- Support `$...$` for backward compatibility (auto-converted by JavaScript)
- Properly handle `\left|` and `\right|` delimiters

## Testing

Visit `/diffequations/latex-style-guide/` to see live test cases and verify your syntax.

