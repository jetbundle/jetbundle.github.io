# Run Manifold Background Locally

## Quick Start

### Option 1: Python HTTP Server
```bash
cd art
python3 -m http.server 8000
```
Then open: http://localhost:8000/test-manifold.html

### Option 2: Node.js http-server
```bash
cd art
npx http-server -p 8000
```
Then open: http://localhost:8000/test-manifold.html

### Option 3: Direct File Open
Simply open `test-manifold.html` in your browser (some browsers may block this due to CORS).

## What You'll See

- **2 Moving Base Points**: Explore the canvas with Brownian motion
- **Orange & Blue Fibers**: Curves attached to base points
- **Jet Bundles**: Higher-order structures (shorter, more curved)
- **Perpetual Animation**: Runs indefinitely with bounded memory
- **Statistics Panel**: Real-time stats (frame count, fiber count, positions)

## Controls

- **Pause/Resume**: Toggle animation
- **Reset**: Reset to initial state
- **Toggle Stats**: Show/hide statistics

## Features

✅ Stochastic exploration (Brownian motion)
✅ Improved mathematical accuracy
✅ Memory efficient (automatic cleanup)
✅ Perpetual running (bounded memory)
✅ Minimized computational cost

## Troubleshooting

If animation doesn't start:
1. Check browser console (F12) for errors
2. Verify `manifold-background-improved.js` is in the same directory
3. Try using a local server (Option 1 or 2)

## Performance

Expected:
- 60 FPS smooth animation
- Low CPU usage (~5-10%)
- Bounded memory (~50-100 MB)
- Can run indefinitely

