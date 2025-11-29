# Server-Side LaTeX Rendering Solution

## The Core Problem

**IDE Markdown Preview:** Simple markdown → HTML → Math ✅ (Works perfectly)  
**Jekyll Website:** Markdown → Liquid → Kramdown → HTML → Client Math ❌ (Fails)

**Why IDE Works:**
- No Liquid processing
- No Kramdown quirks
- Simple markdown parser
- Math renders directly from clean HTML

**Why Website Fails:**
- Liquid strips backslashes
- Kramdown processes `_`, `|`, `{`, `}`
- Special characters get HTML-encoded
- Client-side renderer sees corrupted LaTeX

## Solution: Server-Side Rendering

**Convert LaTeX to HTML during Jekyll build** → No client-side processing needed!

### Benefits
- ✅ **Works exactly like IDE** - LaTeX is already rendered HTML
- ✅ **No client-side issues** - No JavaScript needed for math
- ✅ **Faster page loads** - Pre-rendered equations
- ✅ **No conflicts** - Markdown never sees LaTeX
- ✅ **Guaranteed consistency** - Same output every time

## Option 1: Jektex (Recommended)

### How It Works

```
Markdown with LaTeX → Jekyll Build → Jektex Processes LaTeX → HTML Output
```

Jektex runs **during Jekyll build** and converts all LaTeX to pre-rendered HTML.

### Installation

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
  macros:
    - ["\\RR", "\\mathbb{R}"]
    - ["\\NN", "\\mathbb{N}"]
```

3. **Install:**
```bash
bundle install
```

4. **Remove client-side math scripts** (not needed anymore!)

### How You Write Content

**Markdown stays the same:**
```markdown
The integral $\int_0^1 x dx = \frac{1}{2}$ is fundamental.
```

**Jektex converts it during build:**
```html
The integral <span class="katex">...</span> is fundamental.
```

**Result:** Pre-rendered HTML, no client-side processing!

### Advantages

- ✅ **Zero client-side issues** - Everything pre-rendered
- ✅ **Fast loading** - No JavaScript needed
- ✅ **Works offline** - No CDN dependencies
- ✅ **SEO friendly** - Math is actual HTML content
- ✅ **Your markdown stays the same** - No changes needed

## Option 2: Pandoc Preprocessing

### How It Works

1. Preprocess markdown files with Pandoc
2. Pandoc converts LaTeX to HTML
3. Jekyll processes the result

### Setup

```bash
# Install Pandoc
sudo apt install pandoc  # Linux
brew install pandoc      # macOS

# Preprocess files
pandoc input.md -o output.html --mathml
```

### Advantages

- ✅ **Maximum LaTeX support** - Pandoc handles everything
- ✅ **Flexible** - Can output MathML, HTML, or SVG

### Disadvantages

- ❌ **Extra build step** - Need to preprocess
- ❌ **Workflow complexity** - Two-step process

## Option 3: Pre-Render to HTML Files

### How It Works

1. Convert `.md` files to `.html` manually
2. Jekyll processes HTML directly
3. Bypass markdown processing entirely

### When to Use

- If you have persistent issues
- If you want full control
- If markdown benefits don't outweigh issues

### Trade-offs

- ✅ **Zero markdown issues** - Pure HTML
- ❌ **Lose markdown convenience** - Harder to edit
- ❌ **No markdown features** - Tables, lists, etc.

## Recommended Approach: Jektex

**Best balance of:**
- ✅ Maintainability (still write markdown)
- ✅ Reliability (server-side rendering)
- ✅ Performance (no client-side processing)
- ✅ Compatibility (works like IDE)

## Implementation Plan

### Phase 1: Install Jektex (Quick Test)

1. Add jektex to Gemfile
2. Configure in _config.yml
3. Test with one page
4. Verify LaTeX renders correctly

### Phase 2: Full Migration

1. Remove client-side math scripts
2. Keep KaTeX CSS (for styling)
3. Remove MathJax/KaTeX JS
4. Update all pages
5. Test thoroughly

### Phase 3: Optimization

1. Configure macros for common notation
2. Set up caching
3. Optimize build times

## Comparison: Current vs Server-Side

| Aspect | Current (Client) | Jektex (Server) |
|--------|-----------------|-----------------|
| Rendering | Browser JavaScript | Build-time Ruby |
| Issues | Many (Liquid, Kramdown) | None (pre-rendered) |
| Speed | Slower (client processing) | Faster (pre-rendered) |
| Reliability | Depends on JS loading | Guaranteed (static HTML) |
| Edit workflow | Markdown | Markdown (same!) |
| Browser support | Needs JS | Works everywhere |

## Migration Path

1. **Keep both working** (dual mode)
   - Add Jektex alongside client-side
   - Test thoroughly
   - Compare results

2. **Switch gradually**
   - Enable Jektex for new content
   - Migrate existing content
   - Remove client-side when confident

3. **Full switch**
   - Remove all client-side math
   - Jektex only
   - Cleaner, faster site

## Code Changes Needed

### Minimal Changes

1. **Gemfile:** Add jektex gem
2. **_config.yml:** Add jektex plugin and config
3. **Layouts:** Remove/comment out math JS (keep CSS)
4. **Content:** No changes needed! ✅

### That's It!

Your markdown files stay exactly the same. Jektex handles everything during build.

## Testing Strategy

1. **Install Jektex locally**
2. **Build one page** with `jekyll build`
3. **Check output HTML** - should have rendered math
4. **Compare with IDE preview** - should match exactly
5. **Test complex equations** - verify all work
6. **If successful, deploy**

## Expected Results

After implementing Jektex:

- ✅ LaTeX renders exactly like IDE preview
- ✅ No client-side errors
- ✅ Faster page loads
- ✅ Works in all browsers
- ✅ No JavaScript needed
- ✅ SEO-friendly (math is HTML)

## If Jektex Doesn't Work

**Fallback Options:**

1. **Pandoc preprocessing** - More control
2. **Direct HTML** - Full control, lose markdown
3. **Different Jekyll plugin** - Other server-side options

## Next Steps

1. **Try Jektex first** - Easiest, most compatible
2. **Test with sample content** - Verify it works
3. **If issues persist** - Consider Pandoc or HTML
4. **Deploy when confident** - Full migration

## Conclusion

**Server-side rendering solves all your issues:**
- No Liquid interference ✅
- No Kramdown quirks ✅
- No client-side problems ✅
- Works exactly like IDE ✅

**Jektex is the recommended solution** - it's the closest to "full HTML" while keeping markdown editing workflow.

