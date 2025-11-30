# Mathematical Notation Standards

## Overview
This document establishes the universal formatting rules for all mathematical notation in the differential equations textbook. These standards ensure consistent rendering and maintainability across all sections.

## Core Rules

### 1. Vertical Bars in Mathematics
- **All vertical bars `|` in math expressions MUST be replaced with `\mid`**
- This applies to:
  - Absolute values: `|x|` → `\mid x \mid`
  - Set notation: `|x| < 1` → `\mid x \mid < 1`
  - Conditional expressions: `|f(x)|` → `\mid f(x) \mid`
  - Norms: `|u|` → `\mid u \mid`

### 2. Left/Right Absolute Value Delimiters
- **NEVER use `\left|` and `\right|`**
- **ALWAYS use `\mid` for all vertical bars, even in absolute values**
- Examples:
  - ❌ `\left| x \right|`
  - ✅ `\mid x \mid`
  - ❌ `\left| \int f(x) dx \right|`
  - ✅ `\mid \int f(x) dx \mid`

### 3. LaTeX Environment Restrictions
- **ONLY use these LaTeX environments:**
  - Inline math: `$...$`
  - Display math: `$$...$$`
- **NEVER use:**
  - `\[ ... \]` (must be `$$...$$`)
  - `\( ... \)` (must be `$...$`)
  - `\begin{equation}...\end{equation}` (must be `$$...$$`)
  - `\begin{align}...\end{align}` (must be `$$...$$` with manual alignment)

### 4. Numbered Steps in Examples
- **Remove all numbered steps from examples**
- Examples:
  - ❌ "1. First step..."
  - ❌ "2. Second step..."
  - ✅ Use bullet points or unnumbered lists
  - ✅ Use narrative flow without explicit numbering

### 5. Verification Checklist
Before committing any file, verify:
- [ ] All `|` characters in math are replaced with `\mid`
- [ ] No `\left|` or `\right|` remain
- [ ] Only `$...$` and `$$...$$` are used for math
- [ ] No numbered steps in examples
- [ ] All math expressions render correctly

## Examples

### Correct Formatting
```latex
For $\mid x \mid < 1$, we have $\mid f(x) \mid \le C$.

The norm satisfies $\mid u \mid_{H^1} = \sqrt{\int \mid \nabla u \mid^2}$.

The solution is:
$$\mid u(x) \mid \le e^{-\mid x \mid}$$
```

### Incorrect Formatting
```latex
For |x| < 1, we have |f(x)| ≤ C.  ❌

The norm satisfies \left| u \right|_{H^1} = ...  ❌

\[
|u(x)| \le e^{-|x|}
\]  ❌
```

## Implementation Notes

### Search Patterns
When reviewing files, search for:
- `|` (should not appear in math contexts)
- `\left|` (should not exist)
- `\right|` (should not exist)
- `\[` (should be `$$`)
- `\(` (should be `$`)
- `\begin{equation}` (should be `$$`)

### Automated Checks
Consider using regex patterns:
- Find: `([^\\])\|([^\\])` → Replace with `$1\mid$2` (in math contexts)
- Find: `\\left\|` → Replace with `\mid`
- Find: `\\right\|` → Replace with `\mid`
- Find: `\\\[` → Replace with `$$`
- Find: `\\\(` → Replace with `$`

## Maintenance
- Review all files when updating this standard
- Apply these rules to new content immediately
- Document any exceptions with justification
- Update this document if standards evolve
