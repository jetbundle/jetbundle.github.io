# LaTeX Math Troubleshooting Guide

## Quick Diagnostic: Why Math Works in IDE But Fails on Website

### The Problem
**IDE Markdown Preview:** Simple markdown → HTML → math renderer (works!)
**Jekyll Website:** Markdown → **Liquid** → **Kramdown** → HTML → math renderer (fails!)

### Common Failure Points

## 1. Curly Braces `{` and `}` Disappearing

**Symptom:** `$\{x \mid x > 0\}$` renders as `$x \mid x > 0$` (braces missing)

**Why:** Liquid templating or Kramdown strips backslashes

**Quick Fix:**
```markdown
# Double escape
$\\{x \\mid x > 0\\}$

# OR use \left\{ and \right\}
$\left\{x \mid x > 0\right\}$

# OR wrap in raw tag
{% raw %}$\{x \mid x > 0\}${% endraw %}
```

## 2. Underscores `_` Becoming Italic

**Symptom:** `$a_{n}$` renders as "a" in italic + "{n}" instead of subscript

**Why:** Kramdown processes `_` as emphasis before math renderer sees it

**Quick Fix:**
```markdown
# Use nomarkdown extension
{::nomarkdown}$a_{n}${:/nomarkdown}

# OR escape (may work)
$a\__{n}$
```

## 3. Pipes `|` Creating Tables

**Symptom:** Math expression becomes an HTML table

**Why:** GFM table parser processes pipes

**Solution:** ✅ **Already using `\mid`** - this should be fixed!

## 4. Dollar Signs in Text Treated as Math

**Symptom:** "The price is $50" renders "$50" as math

**Why:** Math renderer sees `$` and thinks it's a delimiter

**Quick Fix:**
```markdown
# Escape
The price is \$50

# OR use HTML entity
The price is $&nbsp;50
```

## 5. Special Characters Being HTML-Encoded

**Symptom:** `<`, `>`, `&` in math become `&lt;`, `&gt;`, `&amp;`

**Why:** Jekyll HTML-encodes special characters

**Quick Fix:**
```markdown
# Use LaTeX equivalents
$\lt x \gt$  # instead of $<x>$
$\land$      # instead of $\&$
```

## Testing Your Specific Issues

### Step 1: Identify the Failing Equation

Look at your markdown source and find equations that don't render correctly on the website.

### Step 2: Check the HTML Source

1. View page source on website
2. Find the problematic equation
3. Check:
   - Are curly braces `{` and `}` present?
   - Are backslashes `\` present?
   - Is there HTML like `<em>` or `<table>` where math should be?
   - Is the math delimited correctly with `$` or `$$`?

### Step 3: Apply Targeted Fix

Based on what's missing or changed, apply the appropriate fix above.

## Most Likely Issues for Your Content

Given your content uses:
- `\mid` for separators ✅ (should be fine)
- Curly braces in sets: `$\{x \mid x > 0\}$` ⚠️ (might fail)
- Subscripts with underscores: `$a_{n}$` ⚠️ (might fail)
- Angle brackets: `$\langle \cdot \rangle$` ✅ (should be fine)

### Recommended Fixes

1. **For sets with curly braces:**
   ```markdown
   # Change this:
   $\{x \mid x > 0\}$

   # To this:
   $\left\{x \mid x > 0\right\}$
   ```

2. **For subscripts (if failing):**
   ```markdown
   # Change this:
   $a_{n}$

   # To this:
   {::nomarkdown}$a_{n}${:/nomarkdown}
   ```

3. **For complex equations:**
   ```markdown
   # Wrap entire block:
   {% raw %}
   {::nomarkdown}
   $$\int_0^1 \frac{x}{1+x} dx$$
   {:/nomarkdown}
   {% endraw %}
   ```

## Automatic Solution: Enable Math Protection Plugin

If you have many issues, enable the math protection plugin:

1. **Uncomment in `_config.yml`:**
   ```yaml
   plugins:
     - math_protection  # Uncomment this
   ```

2. **Rebuild Jekyll:**
   ```bash
   bundle exec jekyll build
   ```

This automatically wraps all math in `{::nomarkdown}` tags before Kramdown processes them.

**Note:** This plugin is currently disabled by default. Enable it if you continue to have issues.

## Minimal Test Cases

Test these specific cases on your website:

```markdown
# Test 1: Curly braces
$\{x\}$

# Test 2: Subscripts
$a_{n}$

# Test 3: Superscripts
$x^{2}$

# Test 4: Sets with pipes
$\{x \mid x > 0\}$

# Test 5: Display math
$$\int_0^1 x dx = \frac{1}{2}$$

# Test 6: Complex equation
$$\left\langle T,\phi\right\rangle = \int_{\Omega} T(x)\phi(x)dx$$
```

If any of these fail, note which ones and apply the appropriate fix.

## Performance Optimization

### Current Setup (Good)
- ✅ Using `\mid` instead of `|`
- ✅ Client-side rendering (fast)
- ✅ KaTeX for speed

### Additional Optimizations

1. **Enable math protection plugin** (only if needed)
2. **Preprocess math blocks** before Kramdown (plugin does this)
3. **Use raw tags sparingly** (only for problematic equations)

## When to Use Each Solution

| Problem | Solution | When to Use |
|---------|----------|-------------|
| Curly braces disappear | Double escape OR `\left\{` | Single occurrences |
| Underscores italicized | `{::nomarkdown}` | Subscripts/superscripts |
| Pipes create tables | Use `\mid` | ✅ Already done |
| Dollar signs in text | Escape `\$` | Regular text with `$` |
| Many issues | Enable plugin | Multiple problems |

## Quick Reference: Escaping Guide

```markdown
# In Math:
\{      →  \\{ or \left\{
\}      →  \\} or \right\}
_       →  \_ or {::nomarkdown}...{:/nomarkdown}
$       →  \$ (only in regular text)

# Around Math:
{% raw %}...{% endraw %}           # Prevents Liquid processing
{::nomarkdown}...{:/nomarkdown}   # Prevents Kramdown processing
```

## Next Steps

1. **Identify specific failing equations** on your website
2. **Check HTML source** to see what changed
3. **Apply targeted fixes** using this guide
4. **If many issues**, enable the math protection plugin
5. **Test thoroughly** after changes
