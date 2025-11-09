# Testing the Improved Manifold Background

## Quick Start

### Method 1: Direct File Open
1. Open `test-manifold.html` directly in your browser
2. The animation should start automatically
3. Check the browser console (F12) for any errors

### Method 2: Local Server (Recommended)
```bash
# From the art directory
cd art
python3 -m http.server 8000

# Then open in browser:
# http://localhost:8000/test-manifold.html
```

### Method 3: Using Node.js http-server
```bash
# Install http-server globally (if not already installed)
npm install -g http-server

# Run server
cd art
http-server -p 8000

# Then open in browser:
# http://localhost:8000/test-manifold.html
```

## What to Expect

### Visual Elements
- **2 Moving Base Points**: Two points that move stochastically across the canvas
- **Fibers**: Curves (orange and blue) emanating from base points
- **Jet Bundles**: Shorter, more curved paths (higher-order structures)
- **Continuous Animation**: Smooth 60fps animation
- **Perpetual Exploration**: Base points explore the entire space

### Statistics Panel
- **Frame Count**: Current animation frame
- **Fiber Count**: Number of active fibers
- **Jet Count**: Number of active jet bundles
- **Base Point Positions**: Current (x, y) coordinates of base points
- **Time**: Animation time value

### Controls
- **Pause/Resume**: Toggle animation
- **Reset**: Reset animation to initial state
- **Toggle Stats**: Show/hide statistics panel

## Features to Observe

### 1. Stochastic Motion
- Base points move randomly (Brownian motion)
- They explore the entire canvas
- Boundary reflection keeps them on screen

### 2. Perpetual Exploration
- New fibers are generated as old ones are removed
- Memory stays bounded (automatic cleanup)
- Animation can run indefinitely

### 3. Mathematical Accuracy
- Two-component connection form
- Improved parallel transport
- Better curvature representation

### 4. Performance
- Smooth 60fps animation
- Low CPU usage
- Bounded memory usage

## Troubleshooting

### Animation Not Starting
1. Check browser console for errors (F12)
2. Verify `manifold-background-improved.js` is in the same directory
3. Check that JavaScript is enabled in your browser

### Performance Issues
1. Reduce `maxFibers` in the config
2. Increase `updateInterval`
3. Reduce `maxPointsPerFiber`

### Memory Issues
1. Check that cleanup is working (fiber count should be bounded)
2. Verify `cleanupInterval` is set correctly
3. Check browser memory usage in DevTools

## Configuration

Edit `manifold-background-improved.js` to adjust:

```javascript
const CONFIG = {
    numBasePoints: 2,           // Number of base points (should be 2)
    fibersPerPoint: 3,          // Fibers per base point
    brownianScale: 0.8,         // Brownian motion scale
    brownianSpeed: 0.15,        // Exploration speed
    maxFibers: 30,              // Maximum fibers
    updateInterval: 3,          // Update frequency
    cleanupInterval: 300,       // Cleanup frequency
    maxFiberAge: 600,           // Max age before cleanup
    // ... etc
};
```

## Expected Behavior

### Initial State
- 2 base points at different locations
- ~6 fibers total (3 per base point)
- Smooth animation starts automatically

### After Running
- Base points move stochastically
- Fibers follow base points
- Old fibers are cleaned up
- New fibers are generated
- Memory usage stays bounded
- Animation continues indefinitely

## Performance Metrics

### Expected Performance
- **Frame Rate**: 60 FPS
- **CPU Usage**: Low (~5-10% on regular laptop)
- **Memory Usage**: Bounded (~50-100 MB)
- **Fiber Count**: Bounded by `maxFibers` (30)

### Optimization Tips
- Reduce `maxFibers` for lower CPU usage
- Increase `updateInterval` for better performance
- Reduce `maxPointsPerFiber` for faster rendering
- Adjust `cleanupInterval` for memory management

## Debugging

### Console Commands
```javascript
// Access the manifold object
window.manifoldBackground

// Check if running
window.manifoldBackground.isRunning

// Get statistics
{
    frameCount: window.manifoldBackground.frameCount,
    fibers: window.manifoldBackground.fibers.length,
    jets: window.manifoldBackground.jetBundles.length,
    basePoints: window.manifoldBackground.basePoints
}

// Pause/resume
window.manifoldBackground.stop()
window.manifoldBackground.start()
```

### Common Issues

**Issue**: Animation is laggy
- **Solution**: Reduce `maxFibers` or increase `updateInterval`

**Issue**: Memory usage increasing
- **Solution**: Check that `cleanup()` is being called, reduce `maxFiberAge`

**Issue**: Base points not moving
- **Solution**: Check that `updateBasePoints()` is being called in `animate()`

**Issue**: Fibers not visible
- **Solution**: Check canvas z-index, opacity, and visibility settings

## Next Steps

1. **Test the animation**: Run `test-manifold.html` and observe the behavior
2. **Adjust configuration**: Modify `CONFIG` to suit your needs
3. **Integrate**: Replace the original `manifold-background.js` with the improved version
4. **Monitor performance**: Use browser DevTools to monitor CPU and memory

## Integration

To use the improved version on the website:

1. Replace `assets/js/manifold-background.js` with `art/manifold-background-improved.js`
2. Or update the existing file with the improved code
3. Test on the live site
4. Monitor performance and adjust as needed

## Support

For issues or questions:
1. Check browser console for errors
2. Review `IMPROVEMENTS_NOTES.md` for implementation details
3. Check `MATHEMATICAL_EXPLANATION.md` for mathematical background
4. Review code comments in `manifold-background-improved.js`

