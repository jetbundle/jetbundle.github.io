# LaTeX Rendering Issues - Root Cause & Solutions

## Why IDE Works But Website Doesn't

### IDE Markdown Preview
```
Markdown → Simple Parser → HTML → Math Renderer
```
- ✅ No Liquid processing
- ✅ No Kramdown quirks
- ✅ Clean LaTeX preserved
- ✅ Works perfectly

### Jekyll Website (Current)
```
Markdown → Liquid → Kramdown → HTML → Client Math JS
```
- ❌ Liquid strips `\{` `\}`
- ❌ Kramdown processes `_` `|` `{` `}`
- ❌ Special chars HTML-encoded
- ❌ Client JS sees corrupted LaTeX

## The Real Problem

**IDE:** Math renderer sees clean LaTeX from simple markdown
**Website:** Math renderer sees corrupted LaTeX after Liquid + Kramdown

## Solution: Server-Side Rendering

**Process LaTeX during Jekyll build** → Output pre-rendered HTML

### How It Works
```
Markdown with LaTeX → Jekyll Build → Jektex Processes → Pre-rendered HTML
```

Result: Website receives **already-rendered math HTML**, just like IDE preview!

## Comparison of Solutions

| Solution | Pros | Cons | Best For |
|----------|------|------|----------|
| **Jektex (Server-Side)** | ✅ No client issues<br>✅ Fast<br>✅ Same as IDE<br>✅ Still use markdown | ⚠️ Requires gem install | **RECOMMENDED** |
| **Full HTML** | ✅ Zero issues<br>✅ Full control | ❌ Lose markdown<br>❌ Hard to edit<br>❌ No markdown features | Last resort |
| **Pandoc Preprocess** | ✅ Maximum LaTeX support | ❌ Extra build step<br>❌ More complex | Complex docs |
| **Current (Client)** | ✅ Easy setup | ❌ Many issues<br>❌ Slow<br>❌ Inconsistent | ❌ Not working |

## Recommended: Jektex Implementation

### Why Jektex?
- ✅ **Server-side rendering** - LaTeX converted during build
- ✅ **No client-side issues** - Pre-rendered HTML
- ✅ **Keep markdown** - Still write `.md` files
- ✅ **Works like IDE** - Same output
- ✅ **Fast** - No JavaScript needed
- ✅ **Reliable** - Guaranteed rendering

### Installation Steps

1. **Add to Gemfile:**
```ruby
group :jekyll_plugins do
  gem "jektex"
end
```

2. **Update _config.yml:**
```yaml
plugins:
  - jektex

jektex:
  cache_dir: ".jektex-cache"
  silent: false
```

3. **Keep KaTeX CSS** (for styling rendered math)

4. **Remove client-side math JS** (not needed!)

5. **Rebuild:**
```bash
bundle install
bundle exec jekyll build
```

### Result

Your markdown:
```markdown
The integral $\int_0^1 x dx = \frac{1}{2}$.
```

Jektex converts during build to:
```html
The integral <span class="katex">...</span>.
```

**No client-side processing needed!**

## Alternative: Pandoc Integration

If Jektex doesn't work, use Pandoc:

1. **Install Pandoc:**
```bash
sudo apt install pandoc  # or brew install pandoc
```

2. **Use jekyll-pandoc plugin:**
```ruby
gem "jekyll-pandoc"
```

3. **Configure:**
```yaml
markdown: Pandoc
pandoc:
  extensions:
    - mathjax
    - smart
```

## Why Not Full HTML?

**Full HTML would work**, but:
- ❌ Lose markdown convenience
- ❌ Harder to maintain
- ❌ No markdown tables, lists, etc.
- ❌ More verbose

**Jektex gives you HTML benefits while keeping markdown!**

## Implementation Plan

### Phase 1: Test Jektex (5 minutes)
1. Add gem to Gemfile
2. Configure in _config.yml
3. Test with one page
4. Compare output with IDE

### Phase 2: Full Migration (if successful)
1. Remove client-side math JS
2. Keep KaTeX CSS only
3. Rebuild all pages
4. Verify all math renders

### Phase 3: Optimization
1. Add custom macros
2. Configure caching
3. Optimize build

## Expected Outcome

After Jektex:
- ✅ LaTeX renders **exactly like IDE**
- ✅ No client-side issues
- ✅ Faster page loads
- ✅ Works everywhere
- ✅ No JavaScript needed
- ✅ Your markdown stays the same

## Next Steps

1. **Try Jektex first** - Best balance
2. **If issues persist** - Try Pandoc
3. **If still issues** - Consider full HTML
4. **Monitor build times** - Should be fast

The key insight: **Server-side rendering eliminates ALL client-side issues** because the math is already HTML when it reaches the browser!
