# KaTeX Parsing Issues and Global Fixes

## Common KaTeX/MathJax Parsing Problems

### 1. Leading Subscripts/Superscripts
**Problem:** Expressions starting with `{}_n` or `{}^n` in inline math can fail to parse.

**Example:**
```latex
${}_2F_{1}(a,b;c;x)$  ❌ May fail
$${}_2F_{1}(a,b;c;x)$$  ✅ Works
```

**Fix:** Convert to display math or use `\prescript{}{n}{F}` notation.

### 2. Very Long Inline Expressions
**Problem:** Inline math expressions longer than ~80 characters can cause rendering issues or look bad.

**Example:**
```latex
$y_{1}(x)=x^{1/2}\sum_{n=0}^{\infty}\frac{(-1)^{n}}{n!\Gamma(n+3/2)}(\frac{x}{2})^{2n}$  ❌ Too long
```

**Fix:** Convert to display math.

### 3. Complex Fractions in Inline Math
**Problem:** Nested fractions or very tall fractions in inline mode can cause vertical spacing issues.

**Example:**
```latex
$\frac{\frac{a}{b}}{\frac{c}{d}}$  ❌ Can cause issues
```

**Fix:** Use `\frac{a}{b}/\frac{c}{d}` or convert to display math.

### 4. Large Operators with Complex Limits
**Problem:** `\sum`, `\int`, `\prod` with complex limits/subscripts in inline mode can be problematic.

**Example:**
```latex
$\sum_{n=0}^{\infty}\frac{(-1)^{n}}{n!\Gamma(n+3/2)}(\frac{x}{2})^{2n}$  ❌ Complex
```

**Fix:** Convert to display math for complex cases.

### 5. Multiple Nested Structures
**Problem:** Deeply nested expressions (fractions, subscripts, superscripts) can fail to parse.

**Example:**
```latex
$f(x)=\sum_{i=0}^{n}\frac{\prod_{j=0}^{i}a_{j}}{\sum_{k=0}^{i}b_{k}}$  ❌ Too nested
```

**Fix:** Convert to display math.

### 6. Empty Braces at Start
**Problem:** `{}_n` pattern specifically causes issues in some renderers.

**Example:**
```latex
${}_2F_{1}$  ❌ May fail
$\prescript{}{2}{F}_{1}$  ✅ Better alternative
```

**Fix:** Use `\prescript` or convert to display math.

### 7. Special Characters Without Escaping
**Problem:** `%`, `&`, `#`, `_`, `^` outside math mode or improperly escaped.

**Fix:** Always escape or use in proper math context.

### 8. Alignment Environments in Inline
**Problem:** `align`, `aligned`, `cases`, `matrix` environments don't work in inline math.

**Example:**
```latex
$\begin{cases} a & b \\ c & d \end{cases}$  ❌ Won't work
```

**Fix:** Must use display math for these.

### 9. Very Tall Expressions
**Problem:** Expressions with multiple stacked fractions or large operators can break layout.

**Fix:** Convert to display math.

### 10. Unicode Characters in Math
**Problem:** Some Unicode characters may not render properly in KaTeX.

**Fix:** Use LaTeX commands instead (e.g., `\alpha` not `α`).

## Detection Patterns

### Pattern 1: Leading Subscripts
```regex
\$\{[_^]\d+[A-Za-z]
```

### Pattern 2: Long Inline Expressions
```regex
\$[^$]{80,}\$
```

### Pattern 3: Complex Fractions
```regex
\$[^$]*\\frac\{[^}]*\\frac
```

### Pattern 4: Large Operators with Complex Limits
```regex
\$\$[^$]*(\\sum|\\int|\\prod)[^$]*\{[^}]*\{[^}]*\}[^$]*\$
```

### Pattern 5: Alignment Environments
```regex
\$[^$]*\\begin\{(align|aligned|cases|matrix|pmatrix|bmatrix)
```

## Global Fix Strategy

1. **Scan all markdown files** for problematic patterns
2. **Detect issues** using regex patterns
3. **Suggest fixes** or automatically convert to display math
4. **Preserve context** - don't break surrounding text
5. **Test compilation** after fixes

Also in general, you need to ensure that mostly simple small things like explaining veriablesor quickexpressions are done in $...$ exclusively, and most functions and equations etc are done with $$...$$ primarily. expressions $...$ and reasoning etc but equations nad longer things done exclusively with $$ $$ thank you. Ensure that this is all properly cleanred up. thank you.

## Implementation

See `fix_katex_parsing.py` for automated fix script.
