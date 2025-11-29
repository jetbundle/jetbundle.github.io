# GitHub Actions Workflow Debugging Guide

## Quick Check

If the workflow is still failing, please share:

1. **The exact error message** from the GitHub Actions log
2. **Which step fails** (Install dependencies, Build Jekyll site, etc.)
3. **The full error output** (copy-paste from the Actions tab)

## Common Issues and Fixes

### Issue 1: Jekyll Version Compatibility
**Error**: `bundler: failed to load command: jekyll` or version conflicts
**Fix**: The workflow uses Ruby 3.1 and Jekyll 4.3. If this fails, we may need to:
- Downgrade to Jekyll 3.x
- Or upgrade Ruby version

### Issue 2: Remote Theme Not Found
**Error**: `remote theme could not be found`
**Fix**: The theme `luxedo/jekyll-theme-potato-hacker` must be accessible

### Issue 3: Missing Include File
**Error**: `Could not locate the included file 'katex-math-renderer.html'`
**Fix**: File exists at `_includes/katex-math-renderer.html` - verify it's committed

### Issue 4: Plugin Issues
**Error**: Plugin errors
**Fix**: All plugins in `_config.yml` are GitHub Pages compatible

## Next Steps

Once you share the error:
1. I'll identify the specific issue
2. Apply the appropriate fix
3. Test and verify

## Current Configuration

- **Ruby**: 3.1
- **Jekyll**: ~> 4.3
- **Plugins**: jekyll-feed, jekyll-seo-tag, jekyll-remote-theme
- **Theme**: luxedo/jekyll-theme-potato-hacker
- **Math**: KaTeX (client-side)

