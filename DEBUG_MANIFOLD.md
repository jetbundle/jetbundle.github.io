# Manifold Background Debugging Guide

## Quick Debug Steps

1. **Open browser console** (F12)
2. **Check for errors** - Look for red error messages
3. **Check script loading**:
   ```javascript
   // Should return the script element
   document.querySelector('script[src*="manifold-background"]')
   ```

4. **Check if canvas exists**:
   ```javascript
   // Should return the canvas element
   document.getElementById('manifold-background')
   ```

5. **Check if manifold is initialized**:
   ```javascript
   // Should return the ManifoldBackground instance
   window.manifoldBackground
   ```

6. **Manually start if needed**:
   ```javascript
   if (window.manifoldBackground) {
     window.manifoldBackground.start();
   }
   ```

## Common Issues

### Issue: Canvas not rendering
- **Check**: Is canvas element in DOM?
- **Fix**: Check console for initialization errors

### Issue: Animation not starting
- **Check**: `window.manifoldBackground.isRunning`
- **Fix**: Call `window.manifoldBackground.start()`

### Issue: Performance lag
- **Check**: Fiber count and update frequency
- **Fix**: Reduce `CONFIG.numBasePoints` or `CONFIG.updateInterval`

## Performance Tuning

If the site is still laggy, reduce these values in `manifold-background.js`:

```javascript
numBasePoints: 6,        // Reduce from 8
fibersPerPoint: 1,       // Reduce from 2
updateInterval: 5,       // Increase from 3 (update less frequently)
maxFibers: 20,           // Reduce from 30
```

## Expected Behavior

- Canvas should appear behind content (z-index: -1)
- Orange and blue fibers should animate smoothly
- Animation should pause when tab is hidden
- Each page load should have different fiber patterns (unique seed)

