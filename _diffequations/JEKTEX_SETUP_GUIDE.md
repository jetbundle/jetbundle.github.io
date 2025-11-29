# Jektex Setup Guide - Server-Side LaTeX Rendering

## Quick Start

This will solve ALL your LaTeX rendering issues by processing math during build time, just like your IDE preview!

## Installation

### Step 1: Install Jektex

```bash
cd /home/joelasaucedo/Development/jetbundle/jetbundle.github.io
bundle install
```

This installs the `jektex` gem (already added to Gemfile).

### Step 2: Enable Jektex

Edit `_config.yml`:

```yaml
plugins:
  - jektex  # Uncomment this line
```

And configure:

```yaml
jektex:
  cache_dir: ".jektex-cache"
  silent: false
```

### Step 3: Keep KaTeX CSS, Remove JS

**Keep in layouts:**
```html
<!-- Keep this for styling -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
```

**Remove/comment out:**
```html
<!-- Remove these - not needed with server-side rendering -->
<!-- <script src="...katex.min.js"></script> -->
<!-- <script src="...auto-render.min.js"></script> -->
```

### Step 4: Test

```bash
bundle exec jekyll build
bundle exec jekyll serve
```

Open `http://localhost:4000` and check if math renders correctly.

## How It Works

**Before (Client-Side):**
```
Markdown → Liquid → Kramdown → HTML → Browser → KaTeX/MathJax → Math
                                       ❌ Issues here
```

**After (Server-Side with Jektex):**
```
Markdown → Liquid → Kramdown → HTML → Jektex → Pre-rendered HTML → Browser
                                               ✅ Math already HTML!
```

## Verification

After enabling Jektex, check the built HTML in `_site/`:

**Should see:**
```html
<span class="katex">...</span>
```

**Not:**
```html
$\int_0^1 x dx$
```

## Expected Benefits

- ✅ **Works exactly like IDE** - Same output
- ✅ **No client-side issues** - Pre-rendered
- ✅ **Faster page loads** - No JS needed
- ✅ **Guaranteed rendering** - Static HTML
- ✅ **No JavaScript errors** - Pure HTML
- ✅ **SEO friendly** - Math is content

## Troubleshooting

### Build Errors

**Error: "jektex not found"**
```bash
bundle install  # Install gems
```

**Error: "Node.js required"**
```bash
# Jektex uses KaTeX Node.js package
npm install  # If package.json exists
# OR install Node.js: https://nodejs.org/
```

### Math Not Rendering

1. **Check cache:**
   ```bash
   rm -rf .jektex-cache
   bundle exec jekyll build
   ```

2. **Check HTML output:**
   ```bash
   cat _site/_diffequations/chapter-02/02-1-distributions.html | grep -A 5 "katex"
   ```

3. **Verify CSS loaded:**
   - Make sure KaTeX CSS is in `<head>`
   - Check browser dev tools for CSS errors

### GitHub Pages Compatibility

**Important:** GitHub Pages may not support custom Jekyll plugins like jektex.

**Solutions:**
1. **Use GitHub Actions** - Build locally and push `_site/` to `gh-pages` branch
2. **Use Netlify/Vercel** - They support custom plugins
3. **Pre-render locally** - Build with Jektex, commit HTML

## Alternative: Pre-Render Locally

If GitHub Pages doesn't support jektex:

```bash
# Build locally with Jektex
bundle exec jekyll build

# The _site/ directory has pre-rendered HTML
# Option 1: Push _site/ to gh-pages branch
# Option 2: Use GitHub Actions to build automatically
```

## Migration Checklist

- [ ] Install jektex: `bundle install`
- [ ] Enable in `_config.yml`: Uncomment `jektex` plugin
- [ ] Configure jektex settings
- [ ] Remove client-side math JS from layouts
- [ ] Keep KaTeX CSS for styling
- [ ] Test build: `bundle exec jekyll build`
- [ ] Verify math renders: Check `_site/` HTML
- [ ] Test locally: `bundle exec jekyll serve`
- [ ] Deploy to GitHub Pages (may need GitHub Actions)

## Rollback Plan

If issues occur:

1. **Disable jektex:**
   ```yaml
   plugins:
     # - jektex  # Comment out
   ```

2. **Re-enable client-side:**
   - Uncomment math JS in layouts
   - Rebuild

3. **Your markdown stays the same** - No content changes needed

## Next Steps

1. **Try Jektex first** - Best solution
2. **If GitHub Pages blocks it** - Use GitHub Actions or pre-render
3. **If still issues** - Consider Pandoc or full HTML conversion

## Questions?

- Check jektex GitHub: https://github.com/yagarea/jektex
- Verify Node.js installed: `node --version`
- Check Jekyll build logs for errors
