---
layout: textbook
title: "LaTeX Style Guide & Test Page"
description: "Standards-compliant LaTeX syntax rules and test cases"
permalink: /diffequations/latex-style-guide/
order: 98
chapter: 98
nav_order: 98
is_chapter_index: false
parent_chapter: null
---

# LaTeX Style Guide & Test Page

This document establishes the **standards-compliant LaTeX syntax rules** for the Differential Equations textbook. All mathematical expressions must follow these conventions to ensure proper rendering with MathJax 3.

## Core Principles

1. **Use `\(` and `\)` for inline math** - Avoids conflicts with markdown tables
2. **Use `\[` and `\]` for display math** - Standard LaTeX delimiters
3. **Escape special characters properly** - Follow LaTeX escaping rules
4. **Use proper delimiter pairs** - `\left` and `\right` must be matched

## Syntax Rules

### Rule 1: Inline Math Delimiters

**✅ CORRECT:**
```
The function \(f(x) = x^2\) is quadratic.
The equation \(y' = f(x,y)\) with \(y(x_0) = y_0\).
```

**❌ INCORRECT:**
```
The function $f(x) = x^2$ is quadratic.  <!-- Can conflict with tables -->
```

### Rule 2: Display Math Delimiters

**✅ CORRECT:**
```
\[
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
\]
```

**❌ INCORRECT:**
```
$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$
<!-- Less standard, though still works -->
```

### Rule 3: Absolute Value and Delimiters

**✅ CORRECT:**
```
The condition \(\left|f(x,y_1) - f(x,y_2)\right| \leq K \left|y_1-y_2\right|\).
```

**Key Points:**
- Always use `\left|` and `\right|` as a matched pair
- Never use bare `|` in math expressions that could be parsed as tables
- The `\left` and `\right` commands ensure proper sizing

**❌ INCORRECT:**
```
The condition \(|f(x,y_1) - f(x,y_2)| \leq K |y_1-y_2|\).
<!-- Bare | can be interpreted as table delimiters by kramdown -->
```

### Rule 4: Escaping Special Characters

**✅ CORRECT:**
```
The set \(\mathbb{R}\) of real numbers.
The function \(f\colon X \to Y\).
The probability \(P(A \mid B)\).
```

**Special Characters to Escape:**
- `%` → `\%`
- `&` → `\&`
- `#` → `\#`
- `$` → `\$` (if using $ delimiters, but we use \( \) instead)
- `_` → `\_` (outside subscripts)
- `^` → `\^` (outside superscripts)
- `{` → `\{`
- `}` → `\}`

### Rule 5: Matched Delimiters

**✅ CORRECT:**
```
\[
\left( \frac{a}{b} \right), \quad
\left[ x \right], \quad
\left\{ y \right\}, \quad
\left| z \right|
\]
```

**❌ INCORRECT:**
```
\[
\left( \frac{a}{b} \right], \quad  <!-- Mismatched delimiters -->
\left| x  <!-- Missing \right| -->
\]
```

### Rule 6: Avoiding Table Conflicts

**Problem:** Kramdown interprets `|` as table delimiters.

**Solution:** Always use `\left|` and `\right|` for absolute values.

**✅ CORRECT:**
```
The norm \(\left\|x\right\|\) and absolute value \(\left|y\right|\).
```

**❌ INCORRECT:**
```
The norm \(\|x\|\) and absolute value \(|y|\).
<!-- Can be parsed as a table -->
```

## Live Test Cases

The following examples demonstrate proper LaTeX syntax and should render correctly:

### Test 1: Basic Inline Math

**Input:**
```
The derivative \(f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}\).
```

**Rendered Output:**
The derivative \(f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}\).

**Status:** ✅ Should render as inline math with proper formatting.

### Test 2: Display Math with Integrals

**Input:**
```
\[
\int_a^b f(x) \, dx = F(b) - F(a)
\]
```

**Rendered Output:**
\[
\int_a^b f(x) \, dx = F(b) - F(a)
\]

**Status:** ✅ Should render as centered display equation.

### Test 3: Absolute Values (Critical Test)

**Input:**
```
The Lipschitz condition: \(\left|f(x,y_1) - f(x,y_2)\right| \leq K \left|y_1-y_2\right|\).
```

**Rendered Output:**
The Lipschitz condition: \(\left|f(x,y_1) - f(x,y_2)\right| \leq K \left|y_1-y_2\right|\).

**Status:** ✅ Should render correctly without table parsing issues. This is the critical test case that previously failed.

### Test 4: Complex Expressions

**Input:**
```
\[
\ln \left|\frac{y}{K - y}\right| = rt + C
\]
```

**Rendered Output:**
\[
\ln \left|\frac{y}{K - y}\right| = rt + C
\]

**Status:** ✅ Should render with proper delimiter sizing.

### Test 5: Multiple Delimiters

**Input:**
```
\[
\left\{ x \in \mathbb{R} \mid \left|x\right| < 1 \right\}
\]
```

**Rendered Output:**
\[
\left\{ x \in \mathbb{R} \mid \left|x\right| < 1 \right\}
\]

**Status:** ✅ Should render with nested delimiters properly sized.

### Test 6: Fractions and Subscripts

**Input:**
```
The solution \(y(x) = \left(y_0 - \frac{P}{k}\right) e^{-kx} + \frac{P}{k}\).
```

**Rendered Output:**
The solution \(y(x) = \left(y_0 - \frac{P}{k}\right) e^{-kx} + \frac{P}{k}\).

**Status:** ✅ Should render with proper fraction sizing.

### Test 7: Matrices and Arrays

**Input:**
```
\[
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
\]
```

**Rendered Output:**
\[
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
\]

**Status:** ✅ Should render as a 2×2 matrix.

### Test 8: Aligned Equations

**Input:**
```
\[
\begin{aligned}
y' &= f(x,y) \\
y(x_0) &= y_0
\end{aligned}
\]
```

**Rendered Output:**
\[
\begin{aligned}
y' &= f(x,y) \\
y(x_0) &= y_0
\end{aligned}
\]

**Status:** ✅ Should render as aligned equations.

### Test 9: Real-World Example from Chapter 1.1

**Input:**
```
We model first-order equations as \(y' = f(x,y)\) with \(y(x_0) = y_0\). The Picard–Lindelöf theorem guarantees local solvability: if \(f\) is continuous on a rectangle containing \((x_0, y_0)\) and satisfies \(\left|f(x,y_1) - f(x,y_2)\right| \leq K \left|y_1-y_2\right|\), then the operator
```

**Rendered Output:**
We model first-order equations as \(y' = f(x,y)\) with \(y(x_0) = y_0\). The Picard–Lindelöf theorem guarantees local solvability: if \(f\) is continuous on a rectangle containing \((x_0, y_0)\) and satisfies \(\left|f(x,y_1) - f(x,y_2)\right| \leq K \left|y_1-y_2\right|\), then the operator

**Status:** ✅ This is the exact problematic text from Chapter 1.1, now using proper syntax.

## Common Patterns

### Pattern 1: Absolute Value in Conditions

```latex
\(\left|f(x)\right| < \epsilon\)
```

### Pattern 2: Norms

```latex
\(\left\|x\right\|_2 = \sqrt{\sum_{i=1}^n x_i^2}\)
```

### Pattern 3: Set Notation

```latex
\(\{x \in \mathbb{R} \mid \left|x\right| < 1\}\)
```

### Pattern 4: Piecewise Functions

```latex
\[
f(x) = \begin{cases}
x^2 & \text{if } x \geq 0 \\
-x^2 & \text{if } x < 0
\end{cases}
\]
```

## Migration Guide

### Converting from `$...$` to `\(...\)`

**Before:**
```markdown
The function $f(x) = x^2$ is quadratic.
```

**After:**
```markdown
The function \(f(x) = x^2\) is quadratic.
```

### Converting Bare `|` to `\left|` and `\right|`

**Before:**
```markdown
The condition \(|f(x)| \leq M\).
```

**After:**
```markdown
The condition \(\left|f(x)\right| \leq M\).
```

## Best Practices

1. **Always use `\(` and `\)` for inline math** - Prevents table parsing conflicts
2. **Always use `\left|` and `\right|` for absolute values** - Never use bare `|`
3. **Match all delimiters** - Every `\left` must have a corresponding `\right`
4. **Use proper spacing** - Use `\,`, `\;`, `\quad`, `\qquad` for spacing
5. **Escape special characters** - Follow LaTeX escaping rules
6. **Test complex expressions** - Verify rendering before committing

## Troubleshooting

### Issue: Math not rendering

**Check:**
- Are delimiters properly matched? (`\(` with `\)`, `\[` with `\]`)
- Are special characters escaped?
- Is MathJax loaded? (Check browser console)

### Issue: "Missing or unrecognized delimiter"

**Cause:** Mismatched `\left` and `\right` delimiters.

**Fix:** Ensure every `\left|` has a corresponding `\right|`.

### Issue: Content rendered as table

**Cause:** Bare `|` characters in math expressions.

**Fix:** Use `\left|` and `\right|` instead of bare `|`.

## References

- [MathJax Documentation](https://docs.mathjax.org/)
- [LaTeX Mathematical Symbols](https://www.overleaf.com/learn/latex/Mathematical_expressions)
- [Kramdown Math Syntax](https://kramdown.gettalong.org/syntax.html#math-blocks)

---

## Quick Reference Card

| Purpose | Syntax | Example |
|---------|--------|---------|
| Inline math | `\(...\)` | `\(x^2\)` |
| Display math | `\[...\]` | `\[\int f(x)dx\]` |
| Absolute value | `\left\|...\right\|` | `\left\|x\right\|` |
| Parentheses | `\left(...\right)` | `\left(\frac{a}{b}\right)` |
| Brackets | `\left[...\right]` | `\left[x\right]` |
| Braces | `\left\{...\right\}` | `\left\{x\right\}` |
| Fraction | `\frac{a}{b}` | `\frac{1}{2}` |
| Subscript | `x_i` | `x_1` |
| Superscript | `x^2` | `x^2` |

**Remember:** Always use `\(` and `\)` for inline math, and `\left|`/`\right|` for absolute values!

