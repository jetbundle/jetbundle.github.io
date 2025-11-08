/**
 * JetBundle Manifold Background Animation
 * 
 * Visualizes the mathematical concept of fiber bundles and jet bundles:
 * - Base Space: The underlying 2D manifold
 * - Fibers: Curves that attach to points on the base space
 * - Jet Bundles: Higher-order "shoots" representing derivatives
 * - Connection: How fibers vary smoothly over the base space
 * 
 * Performance optimized using:
 * - Canvas API for efficient rendering
 * - RequestAnimationFrame for smooth animation
 * - Efficient curve generation using mathematical functions
 * - Selective rendering (only visible fibers)
 * - Low particle count with high visual fidelity
 */

(function() {
  'use strict';

  // Configuration - tuned for performance and visual quality
  const CONFIG = {
    // Fiber system parameters
    numBasePoints: 12,        // Points on the base space
    fibersPerPoint: 3,        // Number of fibers per base point
    maxFiberLength: 150,      // Maximum fiber length in pixels
    fiberStepSize: 0.8,       // Step size for fiber generation
    fiberThickness: 0.8,      // Base thickness of fibers
    
    // Animation parameters
    animationSpeed: 0.003,    // Speed of fiber evolution
    noiseScale: 0.02,         // Scale for Perlin-like noise
    noiseSpeed: 0.0005,       // Speed of noise evolution
    
    // Visual parameters
    opacityDecay: 0.96,       // Opacity decay along fiber
    baseOpacity: 0.15,        // Base opacity of fibers
    gradientStops: 5,         // Number of gradient stops per fiber
    
    // Color scheme (gauge theme)
    colors: {
      orange: { r: 255, g: 107, b: 53 },      // #ff6b35
      blue: { r: 14, g: 165, b: 233 },        // #0ea5e9
      dark: { r: 11, g: 14, b: 23 },          // #0b0e17
      dark2: { r: 10, g: 13, b: 20 }          // #0a0d14
    },
    
    // Performance tuning
    maxFibers: 50,            // Maximum total fibers
    updateInterval: 2,        // Update every N frames
    fadeOutSpeed: 0.98        // Fade out speed for removed fibers
  };

  // Simple Perlin-like noise generator (efficient)
  class NoiseGenerator {
    constructor(seed) {
      this.seed = seed || Math.random() * 10000;
      this.permutation = this.generatePermutation();
    }

    generatePermutation() {
      const p = Array.from({ length: 256 }, (_, i) => i);
      for (let i = p.length - 1; i > 0; i--) {
        const j = Math.floor((this.seed + i) * 0.618033988749) % (i + 1);
        [p[i], p[j]] = [p[j], p[i]];
      }
      return p.concat(p);
    }

    fade(t) {
      return t * t * t * (t * (t * 6 - 15) + 10);
    }

    lerp(a, b, t) {
      return a + t * (b - a);
    }

    grad(hash, x, y) {
      const h = hash & 15;
      const u = h < 8 ? x : y;
      const v = h < 4 ? y : h === 12 || h === 14 ? x : 0;
      return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }

    noise(x, y) {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      x -= Math.floor(x);
      y -= Math.floor(y);
      const u = this.fade(x);
      const v = this.fade(y);
      const A = this.permutation[X] + Y;
      const AA = this.permutation[A];
      const AB = this.permutation[A + 1];
      const B = this.permutation[X + 1] + Y;
      const BA = this.permutation[B];
      const BB = this.permutation[B + 1];
      return this.lerp(
        this.lerp(this.grad(this.permutation[AA], x, y),
                  this.grad(this.permutation[BA], x - 1, y), u),
        this.lerp(this.grad(this.permutation[AB], x, y - 1),
                  this.grad(this.permutation[BB], x - 1, y - 1), u),
        v
      ) * 0.5 + 0.5;
    }
  }

  // Fiber class - represents a single fiber in the bundle
  class Fiber {
    constructor(basePoint, direction, noiseGen, time) {
      this.basePoint = basePoint;
      this.direction = direction;
      this.noiseGen = noiseGen;
      this.time = time;
      this.points = [];
      this.opacity = CONFIG.baseOpacity;
      this.color = this.determineColor();
      this.length = 0;
      this.maxLength = CONFIG.maxFiberLength * (0.7 + Math.random() * 0.6);
      this.generatePoints();
    }

    determineColor() {
      // Alternate between orange and blue based on base point
      const colorChoice = (this.basePoint.x + this.basePoint.y) % 2;
      return colorChoice === 0 ? CONFIG.colors.orange : CONFIG.colors.blue;
    }

    generatePoints() {
      this.points = [];
      let x = this.basePoint.x;
      let y = this.basePoint.y;
      let angle = this.direction;
      let length = 0;

      while (length < this.maxLength && this.points.length < 200) {
        this.points.push({ x, y, angle, opacity: this.opacity });

        // Use noise to create smooth, predictable but chaotic paths
        const noiseX = x * CONFIG.noiseScale + this.time;
        const noiseY = y * CONFIG.noiseScale + this.time;
        const noiseValue = this.noiseGen.noise(noiseX, noiseY);
        
        // Angle variation based on noise (represents connection/curvature)
        const angleVariation = (noiseValue - 0.5) * Math.PI * 0.3;
        angle += angleVariation * CONFIG.animationSpeed * 10;
        
        // Step along the fiber
        const stepSize = CONFIG.fiberStepSize * (0.8 + noiseValue * 0.4);
        x += Math.cos(angle) * stepSize;
        y += Math.sin(angle) * stepSize;
        length += stepSize;

        // Opacity decay along fiber
        this.opacity *= CONFIG.opacityDecay;
        if (this.opacity < 0.01) break;
      }

      this.length = length;
    }

    update(time) {
      this.time = time;
      this.opacity = CONFIG.baseOpacity;
      this.generatePoints();
    }

    // Check if fiber is visible on screen
    isVisible(width, height, margin = 50) {
      return this.points.some(p => 
        p.x >= -margin && p.x <= width + margin &&
        p.y >= -margin && p.y <= height + margin
      );
    }
  }

  // Jet bundle class - represents higher-order "shoots" from base points
  class JetBundle {
    constructor(basePoint, noiseGen, time) {
      this.basePoint = basePoint;
      this.noiseGen = noiseGen;
      this.time = time;
      this.jets = [];
      this.generateJets();
    }

    generateJets() {
      // Generate 2-3 jet "shoots" per base point
      const numJets = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < numJets; i++) {
        const angle = (Math.PI * 2 * i) / numJets + Math.random() * 0.5;
        const jet = {
          points: [],
          color: i % 2 === 0 ? CONFIG.colors.orange : CONFIG.colors.blue,
          opacity: CONFIG.baseOpacity * 0.6,
          length: CONFIG.maxFiberLength * 0.4
        };

        // Generate jet curve (shorter, more focused than fibers)
        let x = this.basePoint.x;
        let y = this.basePoint.y;
        let currentAngle = angle;
        let length = 0;

        while (length < jet.length && jet.points.length < 100) {
          jet.points.push({ x, y, opacity: jet.opacity });
          
          // Jet follows a more curved path (higher derivative)
          const noiseX = x * CONFIG.noiseScale * 2 + this.time;
          const noiseY = y * CONFIG.noiseScale * 2 + this.time;
          const noiseValue = this.noiseGen.noise(noiseX, noiseY);
          currentAngle += (noiseValue - 0.5) * Math.PI * 0.5;
          
          const stepSize = CONFIG.fiberStepSize * 0.6;
          x += Math.cos(currentAngle) * stepSize;
          y += Math.sin(currentAngle) * stepSize;
          length += stepSize;
          jet.opacity *= 0.95;
          
          if (jet.opacity < 0.01) break;
        }

        this.jets.push(jet);
      }
    }

    update(time) {
      this.time = time;
      this.generateJets();
    }

    isVisible(width, height, margin = 50) {
      return this.jets.some(jet => 
        jet.points.some(p => 
          p.x >= -margin && p.x <= width + margin &&
          p.y >= -margin && p.y <= height + margin
        )
      );
    }
  }

  // Main manifold background class
  class ManifoldBackground {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.width = 0;
      this.height = 0;
      this.time = 0;
      this.frameCount = 0;
      this.animationId = null;
      this.isRunning = false;

      // Generate unique seed for this session
      this.seed = Date.now() + Math.random() * 10000;
      this.noiseGen = new NoiseGenerator(this.seed);

      // Initialize base points (points on the base space/manifold)
      this.basePoints = [];
      this.fibers = [];
      this.jetBundles = [];

      this.resize();
      this.initializeBaseSpace();
      this.generateFibers();
    }

    resize() {
      const rect = this.canvas.getBoundingClientRect();
      this.width = rect.width || window.innerWidth;
      this.height = rect.height || window.innerHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.canvas.style.width = '100%';
      this.canvas.style.height = '100%';
    }

    initializeBaseSpace() {
      // Generate base points distributed across the canvas
      // These represent points on the underlying manifold
      this.basePoints = [];
      const cols = Math.ceil(Math.sqrt(CONFIG.numBasePoints));
      const rows = Math.ceil(CONFIG.numBasePoints / cols);
      const spacingX = this.width / (cols + 1);
      const spacingY = this.height / (rows + 1);

      for (let i = 0; i < CONFIG.numBasePoints; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const baseX = spacingX * (col + 1) + (Math.random() - 0.5) * spacingX * 0.3;
        const baseY = spacingY * (row + 1) + (Math.random() - 0.5) * spacingY * 0.3;
        
        this.basePoints.push({
          x: baseX,
          y: baseY,
          id: i
        });
      }
    }

    generateFibers() {
      this.fibers = [];
      this.jetBundles = [];

      // Generate fibers for each base point
      for (const basePoint of this.basePoints) {
        // Generate fibers (curves attached to base point)
        for (let i = 0; i < CONFIG.fibersPerPoint; i++) {
          const angle = (Math.PI * 2 * i) / CONFIG.fibersPerPoint + Math.random() * 0.3;
          const fiber = new Fiber(basePoint, angle, this.noiseGen, this.time);
          this.fibers.push(fiber);
        }

        // Generate jet bundle (higher-order structure)
        if (Math.random() > 0.3) {
          const jetBundle = new JetBundle(basePoint, this.noiseGen, this.time);
          this.jetBundles.push(jetBundle);
        }
      }

      // Limit total fibers for performance
      if (this.fibers.length > CONFIG.maxFibers) {
        this.fibers = this.fibers.slice(0, CONFIG.maxFibers);
      }
    }

    drawFiber(fiber) {
      if (fiber.points.length < 2) return;

      const ctx = this.ctx;
      ctx.beginPath();
      ctx.moveTo(fiber.points[0].x, fiber.points[0].y);

      // Draw smooth curve through points
      for (let i = 1; i < fiber.points.length; i++) {
        const p = fiber.points[i];
        const prevP = fiber.points[i - 1];
        
        // Use quadratic curves for smoothness
        if (i === 1) {
          ctx.lineTo(p.x, p.y);
        } else {
          const midX = (prevP.x + p.x) / 2;
          const midY = (prevP.y + p.y) / 2;
          ctx.quadraticCurveTo(prevP.x, prevP.y, midX, midY);
        }
      }

      // Draw with gradient opacity
      const gradient = ctx.createLinearGradient(
        fiber.points[0].x, fiber.points[0].y,
        fiber.points[fiber.points.length - 1].x,
        fiber.points[fiber.points.length - 1].y
      );

      const color = fiber.color;
      const stops = CONFIG.gradientStops;
      for (let i = 0; i <= stops; i++) {
        const t = i / stops;
        const opacity = fiber.opacity * Math.pow(CONFIG.opacityDecay, t * fiber.points.length);
        gradient.addColorStop(t, `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`);
      }

      ctx.strokeStyle = gradient;
      ctx.lineWidth = CONFIG.fiberThickness;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }

    drawJetBundle(jetBundle) {
      for (const jet of jetBundle.jets) {
        if (jet.points.length < 2) continue;

        const ctx = this.ctx;
        ctx.beginPath();
        ctx.moveTo(jet.points[0].x, jet.points[0].y);

        for (let i = 1; i < jet.points.length; i++) {
          const p = jet.points[i];
          const prevP = jet.points[i - 1];
          
          if (i === 1) {
            ctx.lineTo(p.x, p.y);
          } else {
            const midX = (prevP.x + p.x) / 2;
            const midY = (prevP.y + p.y) / 2;
            ctx.quadraticCurveTo(prevP.x, prevP.y, midX, midY);
          }
        }

        const gradient = ctx.createLinearGradient(
          jet.points[0].x, jet.points[0].y,
          jet.points[jet.points.length - 1].x,
          jet.points[jet.points.length - 1].y
        );

        const color = jet.color;
        const stops = 3;
        for (let i = 0; i <= stops; i++) {
          const t = i / stops;
          const opacity = jet.opacity * Math.pow(0.92, t * jet.points.length);
          gradient.addColorStop(t, `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`);
        }

        ctx.strokeStyle = gradient;
        ctx.lineWidth = CONFIG.fiberThickness * 0.6;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }
    }

    animate() {
      if (!this.isRunning) return;

      this.frameCount++;
      this.time += CONFIG.animationSpeed;

      // Update fibers and jets periodically (performance optimization)
      if (this.frameCount % CONFIG.updateInterval === 0) {
        // Update visible fibers only
        const visibleFibers = this.fibers.filter(f => 
          f.isVisible(this.width, this.height)
        );

        for (const fiber of visibleFibers) {
          fiber.update(this.time);
        }

        // Update jet bundles
        const visibleJets = this.jetBundles.filter(j => 
          j.isVisible(this.width, this.height)
        );

        for (const jetBundle of visibleJets) {
          jetBundle.update(this.time);
        }
      }

      // Clear canvas with fade effect
      this.ctx.fillStyle = `rgba(11, 14, 23, ${1 - CONFIG.fadeOutSpeed})`;
      this.ctx.fillRect(0, 0, this.width, this.height);

      // Draw fibers
      for (const fiber of this.fibers) {
        if (fiber.isVisible(this.width, this.height)) {
          this.drawFiber(fiber);
        }
      }

      // Draw jet bundles
      for (const jetBundle of this.jetBundles) {
        if (jetBundle.isVisible(this.width, this.height)) {
          this.drawJetBundle(jetBundle);
        }
      }

      this.animationId = requestAnimationFrame(() => this.animate());
    }

    start() {
      if (this.isRunning) return;
      this.isRunning = true;
      this.animate();
    }

    stop() {
      this.isRunning = false;
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
    }

    destroy() {
      this.stop();
      this.canvas = null;
      this.ctx = null;
    }
  }

  // Initialize when DOM is ready
  function init() {
    // Wait for page to be interactive
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'manifold-background';
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      pointer-events: none;
      opacity: 0.4;
    `;

    // Insert canvas after background-div but before content
    const backgroundDiv = document.getElementById('background-div');
    if (backgroundDiv && backgroundDiv.parentNode) {
      backgroundDiv.parentNode.insertBefore(canvas, backgroundDiv.nextSibling);
    } else {
      document.body.appendChild(canvas);
    }

    // Initialize manifold background
    const manifold = new ManifoldBackground(canvas);
    manifold.start();

    // Handle resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        manifold.resize();
        manifold.initializeBaseSpace();
        manifold.generateFibers();
      }, 250);
    });

    // Pause when tab is hidden (performance)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        manifold.stop();
      } else {
        manifold.start();
      }
    });
  }

  // Initialize
  init();
})();

