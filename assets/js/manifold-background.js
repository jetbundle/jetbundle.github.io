/**
 * JetBundle Manifold Background Animation - Optimized
 *
 * Visualizes fiber bundles and jet bundles with high performance:
 * - Reduced fiber count for better performance
 * - Optimized rendering pipeline
 * - Lower update frequency
 * - Simplified noise calculations
 */

(function() {
  'use strict';

  // Highly optimized configuration for regular laptops
  const CONFIG = {
    // Minimal fiber system for best performance
    numBasePoints: 6,         // Further reduced for performance
    fibersPerPoint: 2,        // Keep at 2
    maxFiberLength: 100,      // Further reduced
    fiberStepSize: 1.5,       // Larger steps (fewer points)
    fiberThickness: 0.6,      // Thinner for performance
    
    // Slower animation for performance
    animationSpeed: 0.0015,   // Slower
    noiseScale: 0.012,        // Smaller scale
    noiseSpeed: 0.0002,       // Slower
    
    // Visual parameters
    opacityDecay: 0.98,       // Slower decay
    baseOpacity: 0.10,        // Lower opacity
    gradientStops: 2,         // Minimal stops
    
    // Color scheme (gauge theme)
    colors: {
      orange: { r: 255, g: 107, b: 53 },
      blue: { r: 14, g: 165, b: 233 },
      dark: { r: 11, g: 14, b: 23 },
      dark2: { r: 10, g: 13, b: 20 }
    },
    
    // Performance tuning - very aggressive
    maxFibers: 20,            // Further reduced
    updateInterval: 4,        // Update every 4 frames
    fadeOutSpeed: 0.99,       // Slower fade (less redraw)
    maxPointsPerFiber: 60     // Further reduced
  };

  // Simplified noise generator (more efficient)
  class NoiseGenerator {
    constructor(seed) {
      this.seed = seed || Math.random() * 10000;
      this.permutation = this.generatePermutation();
    }

    generatePermutation() {
      const p = Array.from({ length: 128 }, (_, i) => i); // Reduced from 256
      for (let i = p.length - 1; i > 0; i--) {
        const j = Math.floor((this.seed + i) * 0.618033988749) % (i + 1);
        [p[i], p[j]] = [p[j], p[i]];
      }
      return p.concat(p);
    }

    fade(t) {
      return t * t * (3 - 2 * t); // Simpler fade function
    }

    lerp(a, b, t) {
      return a + t * (b - a);
    }

    grad(hash, x) {
      return (hash & 1) === 0 ? x : -x; // Simplified grad
    }

    noise(x, y) {
      const X = Math.floor(x) & 127; // Use 127 instead of 255
      const Y = Math.floor(y) & 127;
      x -= Math.floor(x);
      y -= Math.floor(y);
      const u = this.fade(x);
      const v = this.fade(y);
      const A = this.permutation[X] + Y;
      const AA = this.permutation[A & 255];
      const AB = this.permutation[(A + 1) & 255];
      const B = this.permutation[(X + 1) & 127] + Y;
      const BA = this.permutation[B & 255];
      const BB = this.permutation[(B + 1) & 255];
      return this.lerp(
        this.lerp(this.grad(this.permutation[AA], x),
                  this.grad(this.permutation[BA], x - 1), u),
        this.lerp(this.grad(this.permutation[AB], x),
                  this.grad(this.permutation[BB], x - 1), u),
        v
      ) * 0.5 + 0.5;
    }
  }

  // Simplified Fiber class
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
      this.maxLength = CONFIG.maxFiberLength * (0.8 + Math.random() * 0.4);
      this.generatePoints();
    }

    determineColor() {
      const colorChoice = (this.basePoint.x + this.basePoint.y) % 2;
      return colorChoice === 0 ? CONFIG.colors.orange : CONFIG.colors.blue;
    }

    generatePoints() {
      this.points = [];
      let x = this.basePoint.x;
      let y = this.basePoint.y;
      let angle = this.direction;
      let length = 0;
      const maxPoints = CONFIG.maxPointsPerFiber;

      while (length < this.maxLength && this.points.length < maxPoints) {
        this.points.push({ x, y, opacity: this.opacity });

        // Simplified noise calculation
        const noiseValue = this.noiseGen.noise(
          x * CONFIG.noiseScale + this.time,
          y * CONFIG.noiseScale + this.time
        );

        angle += (noiseValue - 0.5) * Math.PI * 0.25; // Reduced variation

        const stepSize = CONFIG.fiberStepSize;
        x += Math.cos(angle) * stepSize;
        y += Math.sin(angle) * stepSize;
        length += stepSize;

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

    isVisible(width, height, margin = 150) {
      // Very quick check - just first and last point
      if (this.points.length === 0) return false;
      const first = this.points[0];
      const last = this.points[this.points.length - 1];
      return (first.x >= -margin && first.x <= width + margin && first.y >= -margin && first.y <= height + margin) ||
             (last.x >= -margin && last.x <= width + margin && last.y >= -margin && last.y <= height + margin) ||
             (this.basePoint.x >= -margin && this.basePoint.x <= width + margin && this.basePoint.y >= -margin && this.basePoint.y <= height + margin);
    }
  }

  // Simplified JetBundle class
  class JetBundle {
    constructor(basePoint, noiseGen, time) {
      this.basePoint = basePoint;
      this.noiseGen = noiseGen;
      this.time = time;
      this.jets = [];
      this.generateJets();
    }

    generateJets() {
      const numJets = 2; // Fixed at 2 for performance
      for (let i = 0; i < numJets; i++) {
        const angle = (Math.PI * 2 * i) / numJets + Math.random() * 0.3;
        const jet = {
          points: [],
          color: i % 2 === 0 ? CONFIG.colors.orange : CONFIG.colors.blue,
          opacity: CONFIG.baseOpacity * 0.5,
          length: CONFIG.maxFiberLength * 0.3
        };

        let x = this.basePoint.x;
        let y = this.basePoint.y;
        let currentAngle = angle;
        let length = 0;
        const maxPoints = 40; // Reduced

        while (length < jet.length && jet.points.length < maxPoints) {
          jet.points.push({ x, y, opacity: jet.opacity });

          const noiseValue = this.noiseGen.noise(
            x * CONFIG.noiseScale * 1.5 + this.time,
            y * CONFIG.noiseScale * 1.5 + this.time
          );
          currentAngle += (noiseValue - 0.5) * Math.PI * 0.4;

          const stepSize = CONFIG.fiberStepSize * 0.7;
          x += Math.cos(currentAngle) * stepSize;
          y += Math.sin(currentAngle) * stepSize;
          length += stepSize;
          jet.opacity *= 0.94;

          if (jet.opacity < 0.01) break;
        }

        this.jets.push(jet);
      }
    }

    update(time) {
      this.time = time;
      this.generateJets();
    }

    isVisible(width, height, margin = 150) {
      // Quick check - just base point and first jet point
      if (this.jets.length === 0) return false;
      const baseVisible = this.basePoint.x >= -margin && this.basePoint.x <= width + margin &&
                          this.basePoint.y >= -margin && this.basePoint.y <= height + margin;
      if (baseVisible) return true;
      return this.jets.some(jet => 
        jet.points.length > 0 && 
        jet.points[0].x >= -margin && jet.points[0].x <= width + margin &&
        jet.points[0].y >= -margin && jet.points[0].y <= height + margin
      );
    }
  }

  // Optimized ManifoldBackground class
  class ManifoldBackground {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d'); // Keep alpha for fade effects
      this.width = 0;
      this.height = 0;
      this.time = 0;
      this.frameCount = 0;
      this.animationId = null;
      this.isRunning = false;

      // Generate unique seed
      this.seed = Date.now() + Math.random() * 10000;
      this.noiseGen = new NoiseGenerator(this.seed);

      // Initialize
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
      this.basePoints = [];
      const cols = Math.ceil(Math.sqrt(CONFIG.numBasePoints));
      const rows = Math.ceil(CONFIG.numBasePoints / cols);
      const spacingX = this.width / (cols + 1);
      const spacingY = this.height / (rows + 1);

      for (let i = 0; i < CONFIG.numBasePoints; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const baseX = spacingX * (col + 1) + (Math.random() - 0.5) * spacingX * 0.2;
        const baseY = spacingY * (row + 1) + (Math.random() - 0.5) * spacingY * 0.2;

        this.basePoints.push({ x: baseX, y: baseY, id: i });
      }
    }

    generateFibers() {
      this.fibers = [];
      this.jetBundles = [];

      for (const basePoint of this.basePoints) {
        for (let i = 0; i < CONFIG.fibersPerPoint; i++) {
          const angle = (Math.PI * 2 * i) / CONFIG.fibersPerPoint + Math.random() * 0.2;
          const fiber = new Fiber(basePoint, angle, this.noiseGen, this.time);
          this.fibers.push(fiber);
        }

        if (Math.random() > 0.4) { // Fewer jet bundles
          const jetBundle = new JetBundle(basePoint, this.noiseGen, this.time);
          this.jetBundles.push(jetBundle);
        }
      }

      if (this.fibers.length > CONFIG.maxFibers) {
        this.fibers = this.fibers.slice(0, CONFIG.maxFibers);
      }
    }

    drawFiber(fiber) {
      if (fiber.points.length < 2) return;

      const ctx = this.ctx;
      const color = fiber.color;
      const points = fiber.points;

      // Simplified drawing - use lineTo instead of quadratic curves
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }

      // Single color with opacity gradient
      const startOpacity = fiber.opacity;
      const endOpacity = fiber.opacity * Math.pow(CONFIG.opacityDecay, points.length);

      ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${startOpacity * 0.5 + endOpacity * 0.5})`;
      ctx.lineWidth = CONFIG.fiberThickness;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }

    drawJetBundle(jetBundle) {
      for (const jet of jetBundle.jets) {
        if (jet.points.length < 2) continue;

        const ctx = this.ctx;
        const color = jet.color;
        const points = jet.points;

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }

        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${jet.opacity * 0.4})`;
        ctx.lineWidth = CONFIG.fiberThickness * 0.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }
    }

    animate() {
      if (!this.isRunning) return;

      this.frameCount++;
      this.time += CONFIG.animationSpeed;

      // Clear with fade (trail effect) - only if needed
      if (this.frameCount % 2 === 0) { // Clear every other frame
        this.ctx.fillStyle = `rgba(11, 14, 23, ${1 - CONFIG.fadeOutSpeed})`;
        this.ctx.fillRect(0, 0, this.width, this.height);
      }

      // Update fibers less frequently
      if (this.frameCount % CONFIG.updateInterval === 0) {
        for (const fiber of this.fibers) {
          if (fiber.isVisible(this.width, this.height)) {
            fiber.update(this.time);
          }
        }
      }

      // Update jet bundles much less frequently
      if (this.frameCount % (CONFIG.updateInterval * 4) === 0) {
        for (const jetBundle of this.jetBundles) {
          if (jetBundle.isVisible(this.width, this.height)) {
            jetBundle.update(this.time);
          }
        }
      }

      // Draw all fibers (small count, so it's fine)
      for (const fiber of this.fibers) {
        if (fiber.isVisible(this.width, this.height) && fiber.points.length > 1) {
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

  // Initialize when DOM is ready - very robust initialization
  function init() {
    // Prevent multiple initializations
    if (window.manifoldBackgroundInitialized) {
      return;
    }

    const tryInit = () => {
      // Must have body
      if (!document.body) {
        console.log('Manifold: Waiting for body...');
        return;
      }

      try {
        // Check if canvas already exists
        if (document.getElementById('manifold-background')) {
          console.log('Manifold: Canvas already exists');
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
          opacity: 0.35;
          background: transparent;
        `;

        // Insert canvas - prefer body prepend
        let inserted = false;
        try {
          document.body.insertBefore(canvas, document.body.firstChild);
          inserted = true;
        } catch (e) {
          try {
            document.body.appendChild(canvas);
            inserted = true;
          } catch (e2) {
            console.error('Manifold: Failed to insert canvas', e2);
          }
        }

        if (!inserted) {
          console.warn('Manifold: Could not insert canvas');
          return;
        }

        console.log('Manifold: Canvas created and inserted');

        // Initialize manifold background
        let manifold;
        try {
          manifold = new ManifoldBackground(canvas);
          console.log('Manifold: Initialized', {
            fibers: manifold.fibers.length,
            jets: manifold.jetBundles.length,
            width: manifold.width,
            height: manifold.height,
            canvas: canvas.width + 'x' + canvas.height
          });
        } catch (e) {
          console.error('Manifold: Error creating', e);
          return;
        }

        // Start animation after brief delay
        setTimeout(() => {
          try {
            if (manifold && !manifold.isRunning) {
              manifold.start();
              window.manifoldBackgroundInitialized = true;
              console.log('Manifold: Started successfully');
            }
          } catch (e) {
            console.error('Manifold: Error starting', e);
          }
        }, 200);

        // Handle resize
        let resizeTimer;
        const handleResize = () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            try {
              if (manifold) {
                manifold.resize();
                manifold.initializeBaseSpace();
                manifold.generateFibers();
              }
            } catch (e) {
              console.error('Manifold: Resize error', e);
            }
          }, 300);
        };
        window.addEventListener('resize', handleResize, { passive: true });

        // Pause when tab hidden
        document.addEventListener('visibilitychange', () => {
          try {
            if (manifold) {
              if (document.hidden) {
                manifold.stop();
              } else {
                manifold.start();
              }
            }
          } catch (e) {
            console.error('Manifold: Visibility error', e);
          }
        }, { passive: true });

        // Expose for debugging
        window.manifoldBackground = manifold;
        
      } catch (error) {
        console.error('Manifold: Init error', error);
      }
    };

    // Wait for body to exist
    const waitForBody = () => {
      if (document.body) {
        tryInit();
      } else {
        setTimeout(waitForBody, 50);
      }
    };

    // Initialize based on ready state
    if (document.readyState === 'complete') {
      waitForBody();
    } else if (document.readyState === 'interactive') {
      waitForBody();
    } else {
      document.addEventListener('DOMContentLoaded', waitForBody);
    }
    
    // Also try on load
    window.addEventListener('load', waitForBody);
    
    // Final fallback
    setTimeout(waitForBody, 1000);
  }

  // Start initialization
  init();
})();
