---
layout: textbook
title: "Math Formatting Guide: Using \mid Instead of |"
description: "Guidelines for writing LaTeX math expressions in markdown"
permalink: /diffequations/math-formatting-guide/
order: 0.5
chapter: 0
nav_order: 0.5
is_chapter_index: false
parent_chapter: null
---

# Math Formatting Guide: Using `\mid` Instead of `|`

## Critical Rule: Use `\mid` for Mathematical Separators

**IMPORTANT:** When writing mathematical expressions in markdown, **always use `\mid` instead of `|`** for mathematical separators (such as "such that", set notation, conditional probability, etc.).

### Why?

The pipe character `|` is used by markdown processors (like kramdown with GFM) to create tables. When `|` appears inside `$...$` math blocks, it can be incorrectly interpreted as a table delimiter, causing:

- Math expressions to be rendered as HTML tables
- LaTeX parsing errors
- Missing or broken mathematical notation

### Examples

#### ❌ **WRONG** - Using `|`:
```markdown
The set $\{x | x^2 \in \mathbb{Z}\}$ is countable.
```

#### ✅ **CORRECT** - Using `\mid`:
```markdown
The set $\{x \mid x^2 \in \mathbb{Z}\}$ is countable.
```

### When to Use `\mid`

Use `\mid` for:
- **Set notation**: $\{x \mid x > 0\}$ (the set of x such that x > 0)
- **Conditional probability**: $P(A \mid B)$
- **"Such that" in definitions**: $f: X \to Y \mid f(x) = x^2$
- **General mathematical separators**: Any context where you mean "such that" or a logical separator

### When to Use `|` (with `\left` and `\right`)

**Still use `|`** when it's part of **delimiter pairs** with `\left` and `\right`:

```markdown
The absolute value: $\left| x \right|$
The norm: $\left\| \mathbf{v} \right\|$
```

These are **delimiters**, not separators, and MathJax handles them correctly.

### Quick Reference

| Context | Use | Example |
|---------|-----|---------|
| Set notation ("such that") | `\mid` | $\{x \mid x > 0\}$ |
| Conditional probability | `\mid` | $P(A \mid B)$ |
| Absolute value (delimiter) | `\left\| \right\|` | $\left\| x \right\|$ |
| Norm (delimiter) | `\left\| \right\|` | $\left\| \mathbf{v} \right\|$ |
| Divides (relation) | `\mid` | $a \mid b$ (a divides b) |
| Does not divide | `\nmid` | $a \nmid b$ |

### Common Patterns

#### Set Builder Notation
```markdown
$\{x \in \mathbb{R} \mid x^2 < 1\}$
```

#### Conditional Expressions
```markdown
$P(X = x \mid Y = y) = \frac{P(X=x, Y=y)}{P(Y=y)}$
```

#### Definitions
```markdown
A function $f: \mathbb{R} \to \mathbb{R} \mid f(x) = x^2$ is continuous.
```

### Migration Guide

If you have existing content using `|` in math expressions, replace:

1. **Find**: `\{([^}]+)\|([^}]+)\}` (set notation with pipe)
2. **Replace**: `\{$1\mid$2\}`

Or manually:
- `\{x | x > 0\}` → `\{x \mid x > 0\}`
- `P(A | B)` → `P(A \mid B)`
- `\{x \in X | f(x) = 0\}` → `\{x \in X \mid f(x) = 0\}`

### Technical Details

- `\mid` is a **relation symbol** in LaTeX (like `=`, `<`, `>`)
- It provides proper spacing around the separator
- It's semantically correct for "such that" and conditional contexts
- It avoids conflicts with markdown table syntax

### Summary

**Remember:**
- **Separators** (such that, conditional) → Use `\mid`
- **Delimiters** (absolute value, norm) → Use `\left|` and `\right|`

This simple rule will prevent all table parsing issues and make your mathematical notation more professional and semantically correct.
