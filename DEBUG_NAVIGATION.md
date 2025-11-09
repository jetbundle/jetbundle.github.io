# Navigation Debugging Guide

## Current Configuration

### Toolbar Priority (in _config.yml):
- Computation
- Physics
- Finance
- Resources
- Blog
- Community

### Dropdown Files (_dropdown/):
- computation.md → /computation/
- physics.md → /physics/
- finance.md → /finance/
- resources.md → /resources/
- blog.md → /blog/
- community.md → /community/

### Page Files (_pages/):
- computation.md → /computation/
- physics.md → /physics/
- finance.md → /finance/
- resources.md → /resources/
- blog.md → /blog/
- community.md → /community/

## Verification Steps

1. **Check GitHub Actions**: https://github.com/jetbundle/jetbundle.github.io/actions
   - Latest workflow should show "success"
   - Check build logs for any errors

2. **Clear Browser Cache**:
   - Chrome/Edge: Ctrl+Shift+Delete
   - Firefox: Ctrl+Shift+Delete
   - Or use Incognito/Private mode

3. **Check Browser Console** (F12):
   - Look for JavaScript errors
   - Check Network tab for failed resources
   - Verify CSS files are loading

4. **Verify Navigation**:
   - Check if navigation bar appears at top
   - Verify all 6 links are visible
   - Test each link to see if pages load

5. **Check Theme Rendering**:
   - Verify theme is loading (potato-hacker)
   - Check if CSS is applied correctly
   - Verify layout matches expectations

## Common Issues

### Navigation Not Appearing
- Theme might not be reading dropdown collection correctly
- May need custom header override
- Check if theme expects different file structure

### Pages Not Loading
- Verify permalinks match dropdown URLs
- Check if pages have correct front matter
- Verify Jekyll is building pages correctly

### Styling Not Applied
- Check if CSS files are loading
- Verify CSS specificity isn't being overridden
- Check browser console for CSS errors

## Next Steps

If navigation still doesn't work:
1. Create custom header override
2. Use _data/navigation.yml instead of dropdown collection
3. Check theme documentation for correct structure

