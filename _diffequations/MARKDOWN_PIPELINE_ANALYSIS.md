# Markdown → Jekyll → HTML → Math Rendering Pipeline Analysis

## The Complete Pipeline

### Stage 1: Source Markdown (IDE Preview)
```
.md file → Markdown Preview (IDE) → HTML → Math Renderer
```
**Why it works:** IDE markdown previews are simple - they don't do Liquid processing, advanced Kramdown parsing, or server-side preprocessing.

### Stage 2: Jekyll Build Process (Your Website)
```
.md file → Liquid Processing → Kramdown → HTML → Browser → Math Renderer (KaTeX/MathJax)
```

**This is where failures occur!** Let's break down each stage:

## Stage-by-Stage Failure Points

### Stage 1: Liquid Template Processing

**What happens:**
- Jekyll processes `{{ }}` as Liquid variables
- `{% %}` are processed as Liquid tags
- Escapes backslashes in some contexts

**Failure Points:**

1. **Curly Braces in Math**
   ```markdown
   $\{x \mid x > 0\}$  ❌ May fail
   ```
   **Problem:** `\{` and `\}` might get processed by Liquid
   
   **Solution:** Use `{% raw %}` tags OR double escape:
   ```markdown
   {% raw %}$\{x \mid x > 0\}${% endraw %}
   ```
   OR
   ```markdown
   $\\{x \mid x > 0\\}$
   ```

2. **Dollar Signs in Code Blocks**
   ```markdown
   ```bash
   $ echo "test"
   ```
   ```
   **Problem:** `$` might be interpreted as math delimiter
   
   **Solution:** Jekyll should handle this, but sometimes needs explicit wrapping:
   ```markdown
   {% raw %}
   ```bash
   $ echo "test"
   ```
   {% endraw %}
   ```

### Stage 2: Kramdown Markdown Processing

**What happens:**
- Converts Markdown syntax to HTML
- Processes tables, emphasis, links, etc.
- May interpret LaTeX syntax as Markdown

**Failure Points:**

1. **Underscores in Math → Emphasis**
   ```markdown
   $a_{n}$  ❌ May become italic "a" followed by "{n}"
   ```
   **Problem:** Kramdown sees `_` as emphasis marker
   
   **Solution:** Use `{::nomarkdown}` OR escape:
   ```markdown
   {::nomarkdown}$a_{n}${:/nomarkdown}
   ```
   OR
   ```markdown
   $a\_{n}$
   ```

2. **Pipes in Math → Tables** (You already fixed this!)
   ```markdown
   $\{x | x > 0\}$  ❌ May become a table
   ```
   **Solution:** ✅ Using `\mid` instead of `|`

3. **Asterisks in Math → Bold/Italic**
   ```markdown
   $x*y$  ❌ May become bold/italic
   ```
   **Solution:** Usually works if inside `$...$`, but can fail if not properly delimited

4. **Backslashes Being Stripped**
   ```markdown
   $\{x\}$  ❌ Backslash might be removed
   ```
   **Problem:** Jekyll/Kramdown removes single backslashes before special chars
   
   **Solution:** Double escape OR use `{% raw %}`:
   ```markdown
   $\\{x\\}$
   ```

5. **Dollar Signs in Text**
   ```markdown
   The price is $50.  ❌ "$50" might be treated as inline math
   ```
   **Problem:** Kramdown sees `$` and thinks it's math
   
   **Solution:** Escape: `\$50` OR use `{::nomarkdown}`

### Stage 3: HTML Generation

**What happens:**
- Kramdown outputs HTML
- Special characters might be HTML-encoded
- Whitespace might be normalized

**Failure Points:**

1. **Whitespace Normalization**
   ```markdown
   $$
   \int_0^1 x dx
   $$
   ```
   **Problem:** Multiple spaces might collapse
   
   **Solution:** Usually fine, but can cause issues with spacing-sensitive LaTeX

2. **HTML Entity Encoding**
   ```markdown
   $< x >$  ❌ `<` and `>` become `&lt;` and `&gt;`
   ```
   **Solution:** Use `\lt` and `\gt` in LaTeX OR `{::nomarkdown}`

### Stage 4: Browser + Math Renderer

**What happens:**
- Browser loads HTML
- KaTeX/MathJax scans for math delimiters
- Renders math to formatted equations

**Failure Points:**

1. **Math Already Processed as HTML**
   ```html
   <p>$a_{n}$</p>  ❌ Underscore already converted to HTML
   ```
   **Problem:** By the time math renderer sees it, markdown has already processed it
   
   **Solution:** Prevent markdown processing with `{::nomarkdown}`

2. **Conflicting Delimiters**
   ```markdown
   The price is $50 for this item.  ❌ "$50" treated as math
   ```
   **Solution:** Be careful with dollar signs, use escaping

3. **Code Blocks Not Excluded**
   ```markdown
   ```python
   def func():
       return "$value"  ❌ Might try to render as math
   ```
   ```
   **Solution:** Should be handled automatically, but verify `ignoredTags` in math renderer

## Common Issues & Solutions

### Issue 1: Curly Braces Disappearing

**Symptom:** `$\{x\}$` renders as `$x$` on website but works in IDE

**Root Cause:** Liquid/Jekyll stripping backslashes

**Solutions:**
```markdown
# Option 1: Use raw tag
{% raw %}$\{x\}${% endraw %}

# Option 2: Double escape
$\\{x\\}$

# Option 3: Use \left\{ and \right\}
$\left\{x\right\}$
```

### Issue 2: Underscores Becoming Italic

**Symptom:** `$a_{n}$` renders as "a" in italic + "{n}" instead of subscript

**Root Cause:** Kramdown processes `_` as emphasis before math renderer sees it

**Solutions:**
```markdown
# Option 1: Use nomarkdown extension
{::nomarkdown}$a_{n}${:/nomarkdown}

# Option 2: Escape underscore (may not work in all cases)
$a\__{n}$

# Option 3: Use braces (often works)
$a_{n}$  # Works if inside $...$
```

### Issue 3: Tables Being Created from Math

**Symptom:** Math expressions with pipes become HTML tables

**Root Cause:** Kramdown GFM table parser processes pipes

**Solution:** ✅ **Already implemented** - Using `\mid` instead of `|`

### Issue 4: Dollar Signs in Regular Text

**Symptom:** `The price is $50` renders `$50` as math

**Root Cause:** Math renderer sees `$` and thinks it's math delimiter

**Solutions:**
```markdown
# Option 1: Escape
The price is \$50

# Option 2: Use non-breaking space
The price is $&nbsp;50

# Option 3: Use nomarkdown for that section
The price is {::nomarkdown}$50{:/nomarkdown}
```

## Optimization Strategies

### 1. **Prevent Kramdown Processing Math**

Use Kramdown's `nomarkdown` extension to skip markdown processing:

```markdown
{::nomarkdown}
$$\int_0^1 x dx = \frac{1}{2}$$
{:/nomarkdown}
```

**Pros:**
- Prevents all markdown conflicts
- Guaranteed to work

**Cons:**
- Verbose
- Hard to maintain

### 2. **Use Liquid `{% raw %}` Tags**

Wrap problematic sections:

```markdown
{% raw %}
$$
\int_0^1 x dx = \frac{1}{2}
$$
{% endraw %}
```

**Pros:**
- Prevents Liquid processing
- Still allows Kramdown to process markdown

**Cons:**
- Doesn't prevent Kramdown issues (underscores, etc.)

### 3. **Configure Kramdown Better**

Current config is good, but we can optimize:

```yaml
kramdown:
  input: GFM
  hard_wrap: false  # ✅ Already set
  gfm_quirks: []    # ✅ Already set
  # Add this to be more explicit:
  math_engine: null  # Disable server-side math processing
  auto_ids: true
  footnote_backlink: "&#8617;"
```

### 4. **Preprocess Math Blocks**

Create a Jekyll plugin to preprocess math before Kramdown:

```ruby
# _plugins/math_protection.rb
Jekyll::Hooks.register :posts, :pre_render do |post|
  # Escape or protect math blocks before Kramdown processes
end
```

### 5. **Use Alternative Markdown Processor**

Consider `markdown-it` with plugins (requires setup but better control):

```yaml
# Would require custom Jekyll plugin
markdown: markdown-it
```

## Recommended Configuration

### Current Setup Analysis

**✅ What's Working:**
- Using `\mid` instead of `|` ✅
- `hard_wrap: false` ✅
- `gfm_quirks: []` ✅
- Client-side rendering (KaTeX/MathJax) ✅

**⚠️ Potential Issues:**
- No explicit protection for curly braces
- Underscores might still be processed
- Liquid templating might interfere

### Recommended Improvements

1. **Add Math Protection Plugin** (if issues persist)
2. **Use `{::nomarkdown}` for problematic equations**
3. **Double-escape problematic characters** in source
4. **Consider server-side math preprocessing** for guaranteed results

## Diagnostic Checklist

When math fails on website but works in IDE:

- [ ] Check browser console for KaTeX/MathJax errors
- [ ] View page source - is math still in original form?
- [ ] Are curly braces present? `{` and `}`
- [ ] Are backslashes present? `\`
- [ ] Are underscores processed? Check HTML for `<em>` tags
- [ ] Are pipes creating tables? Check HTML for `<table>` tags
- [ ] Is Liquid processing interfering? Check for `{{ }}` patterns
- [ ] Is math inside code blocks? Should be ignored
- [ ] Are delimiters correct? `$...$` for inline, `$$...$$` for display

## Testing Strategy

1. **Create test page** with problematic equations
2. **Compare IDE preview** vs website
3. **Check HTML source** at each stage
4. **Use browser dev tools** to inspect rendered math
5. **Check console** for renderer errors

## Quick Fixes for Common Issues

```markdown
# Curly braces disappearing?
{% raw %}$\{x\}${% endraw %}

# Underscores becoming italic?
{::nomarkdown}$a_{n}${:/nomarkdown}

# Dollar signs in text?
The price is \$50

# Complex equation with issues?
{% raw %}
{::nomarkdown}
$$\int_0^1 \frac{x}{1+x} dx$$
{:/nomarkdown}
{% endraw %}
```

## Next Steps

1. **Identify specific failing equations** - check which ones fail
2. **Inspect HTML source** - see what Kramdown outputs
3. **Apply targeted fixes** - use appropriate solution for each issue
4. **Consider automated solution** - plugin to preprocess math blocks

