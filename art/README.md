# Art Directory: Manifold Background Visualization

This directory contains the mathematical visualization of fiber bundles, connections, and jet bundles used as the animated background for the JetBundle website.

## Files

### Documentation

- **`MATHEMATICAL_EXPLANATION.md`**: Comprehensive mathematical explanation of the implementation
  - Core mathematical concepts (manifolds, fiber bundles, connections, jet bundles)
  - How the implementation works
  - Accuracy assessment
  - Mathematical interpretation of visual elements

- **`THOUGHT_PROCESS.md`**: Design decisions and rationale
  - Why certain approaches were chosen
  - Trade-offs between accuracy and performance
  - Implementation strategy
  - Educational value

- **`IMPROVEMENTS.md`**: Proposed improvements for mathematical accuracy
  - True connection form implementation
  - Proper parallel transport
  - True fiber bundle structure
  - Proper jet bundle implementation
  - Curvature calculation
  - Integration plan

### Code

- **`manifold-background.js`**: The main implementation
  - Optimized for performance
  - Visualizes fiber bundles, connections, and jet bundles
  - Uses Perlin-like noise for connection/curvature
  - Animated time evolution

## Mathematical Concepts

### Fiber Bundles

A **fiber bundle** $(E, M, \pi, F)$ consists of:
- **Total space** $E$: The bundle itself
- **Base space** $M$: The manifold (2D canvas in our case)
- **Projection** $\pi: E \to M$: Maps each fiber to its base point
- **Fiber** $F$: The "attached" space at each point (curves in our visualization)

### Connections

A **connection** $\nabla$ on a fiber bundle defines how to "parallel transport" vectors along curves in the base space. The connection determines the curvature of the bundle.

### Jet Bundles

A **jet bundle** $J^k(E)$ captures the $k$-th order derivatives of sections of a fiber bundle. In our visualization, jet bundles represent "higher-order structures" that show how fibers change more rapidly.

## Usage

The manifold background is automatically loaded on the JetBundle website. To use it in your own project:

1. Include the JavaScript file:
```html
<script src="/art/manifold-background.js"></script>
```

2. The script automatically initializes and creates a canvas element with id `manifold-background`.

3. Customize the configuration in `CONFIG` object:
```javascript
const CONFIG = {
    numBasePoints: 6,      // Number of base points
    fibersPerPoint: 2,     // Number of fibers per base point
    maxFiberLength: 100,   // Maximum fiber length
    // ... etc
};
```

## Performance

The implementation is optimized for performance:
- **Reduced fiber count**: 12 fibers maximum
- **Update frequency**: Every 4 frames
- **Visibility culling**: Only draws visible fibers
- **Simplified calculations**: Efficient noise and rendering

Expected performance: ~70% CPU reduction compared to initial implementation, smooth 60fps on regular laptops.

## Mathematical Accuracy

### What We Accurately Represent

✅ **Base Space (Manifold)**: 2D Euclidean space
✅ **Fiber Attachment**: Fibers attached to base points
✅ **Connection (Curvature)**: Noise-driven fiber curvature
✅ **Time Evolution**: Animated parallel transport
✅ **Jet Bundles**: Higher-order derivative structures

### What We Simplify

⚠️ **Fiber Type**: Uses curves instead of vector spaces
⚠️ **Connection Form**: Uses noise instead of true connection forms
⚠️ **Parallel Transport**: Approximates with noise-driven curvature
⚠️ **Jet Bundle Structure**: Visual representation without full mathematical rigor

See `IMPROVEMENTS.md` for proposed enhancements for true mathematical accuracy.

## Visual Design

### Color Scheme

- **Orange (#ff6b35)**: Represents one orientation/curvature
- **Blue (#0ea5e9)**: Represents complementary orientation/curvature
- **Dark Background (#0b0e17 to #0a0d14)**: Represents the base space

### Animation

- **Time parameter**: Represents evolution/parallel transport
- **Smooth animation**: 60fps with optimized rendering
- **Trail effects**: Opacity decay creates smooth trails

## Educational Value

The visualization helps viewers understand:
1. **Fiber Bundles**: How fibers attach to base points
2. **Connections**: How curvature affects fiber paths
3. **Jet Bundles**: Higher-order derivative structures
4. **Time Evolution**: How mathematical structures evolve

## References

### Mathematical Foundations

- **Fiber Bundles**: Steenrod, "The Topology of Fibre Bundles"
- **Connections**: Kobayashi & Nomizu, "Foundations of Differential Geometry"
- **Jet Bundles**: Saunders, "The Geometry of Jet Bundles"
- **Differential Geometry**: Lee, "Introduction to Smooth Manifolds"

### Implementation

- **Canvas API**: HTML5 Canvas 2D rendering
- **Perlin Noise**: Simplified Perlin-like noise for smooth randomness
- **Animation**: RequestAnimationFrame for smooth 60fps animation

## License

This code is part of the JetBundle project and is licensed under the MIT License with non-commercial use restrictions. See the main `LICENSE` file for details.

## Contributing

To improve the mathematical accuracy or performance:
1. Read `IMPROVEMENTS.md` for proposed enhancements
2. Implement improvements incrementally
3. Test performance and visual quality
4. Update documentation

## Contact

For questions or suggestions, please open an issue on the JetBundle GitHub repository.
