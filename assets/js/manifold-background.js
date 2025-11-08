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

  // Optimized configuration for regular laptops
  const CONFIG = {
    // Reduced fiber system parameters
    numBasePoints: 8,         // Reduced from 12
    fibersPerPoint: 2,        // Reduced from 3
    maxFiberLength: 120,      // Reduced from 150
    fiberStepSize: 1.2,       // Increased (fewer points)
    fiberThickness: 0.7,      // Slightly thinner
    
    // Slower animation for performance
    animationSpeed: 0.002,    // Reduced from 0.003
    noiseScale: 0.015,        // Reduced from 0.02
    noiseSpeed: 0.0003,       // Reduced from 0.0005
    
    // Visual parameters
    opacityDecay: 0.97,       // Faster decay (shorter trails)
    baseOpacity: 0.12,        // Lower base opacity
    gradientStops: 3,         // Reduced from 5
    
    // Color scheme (gauge theme)
    colors: {
      orange: { r: 255, g: 107, b: 53 },
      blue: { r: 14, g: 165, b: 233 },
      dark: { r: 11, g: 14, b: 23 },
      dark2: { r: 10, g: 13, b: 20 }
    },
    
    // Performance tuning - more aggressive
    maxFibers: 30,            // Reduced from 50
    updateInterval: 3,        // Update every 3 frames (was 2)
    fadeOutSpeed: 0.985,      // Faster fade
    maxPointsPerFiber: 80     // Reduced from 200
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

    isVisible(width, height, margin = 100) {
      // Quick bounding box check
      for (let i = 0; i < this.points.length; i += 5) { // Check every 5th point
        const p = this.points[i];
        if (p.x >= -margin && p.x <= width + margin &&
            p.y >= -margin && p.y <= height + margin) {
          return true;
        }
      }
      return false;
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

    isVisible(width, height, margin = 100) {
      return this.jets.some(jet => 
        jet.points.some((p, i) => i % 3 === 0 && // Check every 3rd point
          p.x >= -margin && p.x <= width + margin &&
          p.y >= -margin && p.y <= height + margin)
      );
    }
  }

  // Optimized ManifoldBackground class
  class ManifoldBackground {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d', { alpha: false }); // Disable alpha for performance
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
      const now = performance.now();
      
      // Throttle updates for performance
      if (now - this.lastUpdateTime < 16) { // ~60fps max
        this.animationId = requestAnimationFrame(() => this.animate());
        return;
      }
      this.lastUpdateTime = now;

      this.time += CONFIG.animationSpeed;

      // Update less frequently for performance
      if (this.frameCount % CONFIG.updateInterval === 0) {
        // Update all visible fibers (smaller count now, so it's fine)
        const visibleFibers = this.fibers.filter(f => 
          f.isVisible(this.width, this.height)
        );
        for (const fiber of visibleFibers) {
          fiber.update(this.time);
        }

        // Update jet bundles even less frequently
        if (this.frameCount % (CONFIG.updateInterval * 3) === 0) {
          const visibleJets = this.jetBundles.filter(j => 
            j.isVisible(this.width, this.height)
          );
          for (const jetBundle of visibleJets) {
            jetBundle.update(this.time);
          }
        }
      }

      // Clear with fade
      this.ctx.fillStyle = `rgba(11, 14, 23, ${1 - CONFIG.fadeOutSpeed})`;
      this.ctx.fillRect(0, 0, this.width, this.height);

      // Draw only visible fibers
      const visibleFibers = this.fibers.filter(f => 
        f.isVisible(this.width, this.height)
      );
      
      for (const fiber of visibleFibers) {
        this.drawFiber(fiber);
      }

      // Draw jet bundles
      const visibleJets = this.jetBundles.filter(j => 
        j.isVisible(this.width, this.height)
      );
      
      for (const jetBundle of visibleJets) {
        this.drawJetBundle(jetBundle);
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

  // Initialize when DOM is ready - robust initialization with multiple strategies
  function init() {
    // Prevent multiple initializations
    if (window.manifoldBackgroundInitialized) {
      return;
    }

    const tryInit = () => {
      try {
        // Check if canvas already exists
        if (document.getElementById('manifold-background')) {
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

        // Try multiple insertion strategies
        let inserted = false;
        const backgroundDiv = document.getElementById('background-div');
        if (backgroundDiv && backgroundDiv.parentNode) {
          backgroundDiv.parentNode.insertBefore(canvas, backgroundDiv.nextSibling);
          inserted = true;
        }
        if (!inserted && document.body) {
          if (document.body.firstChild) {
            document.body.insertBefore(canvas, document.body.firstChild);
          } else {
            document.body.appendChild(canvas);
          }
          inserted = true;
        }

        if (!inserted) {
          console.warn('Could not insert manifold background canvas');
          return;
        }

        // Initialize manifold background
        const manifold = new ManifoldBackground(canvas);
        
        // Start animation after brief delay
        setTimeout(() => {
          try {
            manifold.start();
            window.manifoldBackgroundInitialized = true;
          } catch (e) {
            console.error('Error starting manifold:', e);
          }
        }, 150);

        // Handle resize
        let resizeTimer;
        window.addEventListener('resize', () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            try {
              manifold.resize();
              manifold.initializeBaseSpace();
              manifold.generateFibers();
            } catch (e) {
              console.error('Resize error:', e);
            }
          }, 300);
        }, { passive: true });

        // Pause when tab hidden
        document.addEventListener('visibilitychange', () => {
          try {
            if (document.hidden) {
              manifold.stop();
            } else {
              manifold.start();
            }
          } catch (e) {
            console.error('Visibility change error:', e);
          }
        }, { passive: true });

        // Expose for debugging
        window.manifoldBackground = manifold;
        
      } catch (error) {
        console.error('Manifold background init error:', error);
      }
    };

    // Try immediate if ready
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      tryInit();
    } else {
      // Wait for DOM
      document.addEventListener('DOMContentLoaded', tryInit);
    }
    
    // Also try on load event
    window.addEventListener('load', tryInit);
    
    // Fallback after delay
    setTimeout(tryInit, 800);
  }

  // Initialize immediately
  init();
})();
