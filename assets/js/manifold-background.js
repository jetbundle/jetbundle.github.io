/**
 * JetBundle Manifold Background - Two Points with Direction-Based Gradients
 * 
 * Two points explore the manifold with smooth incremental movement:
 * - Smooth incremental movement with drift toward center
 * - Orange/blue gradient based on direction of motion (represents jet bundles)
 * - Memory-efficient trails that fade over time
 * - Larger, more visible trails for better visibility
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    // Two explorers (points on the manifold)
    numPoints: 2,

    // Motion parameters - smooth incremental movement
    stepSize: 4.0,              // Base step size (increased for bigger movement)
    driftStrength: 0.02,        // Drift toward center (0-1)
    noiseScale: 0.5,            // Randomness (0-1)
    minSpeed: 1.2,              // Minimum speed (increased)
    maxSpeed: 5.0,              // Maximum speed (increased)

    // Trail parameters (bigger, more visible)
    trailLength: 120,           // Number of trail points per explorer (increased)
    fadeRate: 0.975,            // Fade per frame (slower fade = longer trails)
    baseOpacity: 0.6,           // Starting opacity (increased for visibility)
    
    // Visual parameters (bigger)
    pointRadius: 4.5,           // Current point radius (increased)
    trailWidth: 3.0,            // Trail line width (increased)
    
    // Color scheme (gauge theme)
    colors: {
      orange: { r: 255, g: 107, b: 53 },
      blue: { r: 14, g: 165, b: 233 },
      dark: { r: 11, g: 14, b: 23 }
    },

    // Performance
    updateEvery: 1,             // Update every frame
    drawEvery: 1                // Draw every frame
  };

  // Explorer class - a single point exploring the manifold
  class Explorer {
    constructor(id, centerX, centerY, width, height) {
      this.id = id;
      this.centerX = centerX;
      this.centerY = centerY;
      this.width = width;
      this.height = height;

      // Start at random position
      this.x = centerX + (Math.random() - 0.5) * width * 0.6;
      this.y = centerY + (Math.random() - 0.5) * height * 0.6;

      // Velocity (for direction-based coloring)
      this.vx = (Math.random() - 0.5) * 4;
      this.vy = (Math.random() - 0.5) * 4;

      // Trail - circular buffer for memory efficiency
      this.trail = [];
      this.trailIndex = 0;
      this.trailFull = false;

      // Initialize trail with current position
      for (let i = 0; i < CONFIG.trailLength; i++) {
        this.trail.push({
          x: this.x,
          y: this.y,
          opacity: 0,
          vx: this.vx,
          vy: this.vy
        });
      }
    }

    // Update position with smooth incremental stochastic motion
    update() {
      // Random walk component - smooth incremental
      const randomAngle = Math.random() * Math.PI * 2;
      const randomMagnitude = CONFIG.noiseScale * CONFIG.stepSize * (0.5 + Math.random() * 0.5);

      const randomVx = Math.cos(randomAngle) * randomMagnitude;
      const randomVy = Math.sin(randomAngle) * randomMagnitude;

      // Drift toward center - creates smooth curves
      const dx = this.centerX - this.x;
      const dy = this.centerY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = Math.sqrt(this.width * this.width + this.height * this.height) * 0.5;
      const normalizedDistance = Math.min(distance / maxDistance, 1);

      // Stronger drift when further from center
      const driftFactor = CONFIG.driftStrength * (1 + normalizedDistance * 2);
      const driftVx = dx * driftFactor;
      const driftVy = dy * driftFactor;

      // Combine random walk and drift - smooth incremental change
      this.vx = this.vx * 0.7 + (randomVx + driftVx) * 0.3; // Smooth velocity transition
      this.vy = this.vy * 0.7 + (randomVy + driftVy) * 0.3;

      // Clamp velocity
      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (speed > CONFIG.maxSpeed) {
        this.vx = (this.vx / speed) * CONFIG.maxSpeed;
        this.vy = (this.vy / speed) * CONFIG.maxSpeed;
      } else if (speed < CONFIG.minSpeed && speed > 0) {
        this.vx = (this.vx / speed) * CONFIG.minSpeed;
        this.vy = (this.vy / speed) * CONFIG.minSpeed;
      }

      // Update position - smooth incremental movement
      this.x += this.vx;
      this.y += this.vy;

      // Boundary conditions - wrap around (torus topology)
      this.x = ((this.x % this.width) + this.width) % this.width;
      this.y = ((this.y % this.height) + this.height) % this.height;

      // Add current position to trail (circular buffer)
      const trailPoint = {
        x: this.x,
        y: this.y,
        opacity: CONFIG.baseOpacity,
        vx: this.vx,
        vy: this.vy
      };

      if (this.trailFull) {
        // Overwrite oldest point
        this.trail[this.trailIndex] = trailPoint;
        this.trailIndex = (this.trailIndex + 1) % CONFIG.trailLength;
      } else {
        // Add new point
        this.trail[this.trailIndex] = trailPoint;
        this.trailIndex++;
        if (this.trailIndex >= CONFIG.trailLength) {
          this.trailFull = true;
          this.trailIndex = 0;
        }
      }
    }

    // Fade trail points
    fadeTrail() {
      for (let i = 0; i < (this.trailFull ? CONFIG.trailLength : this.trailIndex); i++) {
        if (this.trail[i].opacity > 0.01) {
          this.trail[i].opacity *= CONFIG.fadeRate;
        } else {
          this.trail[i].opacity = 0;
        }
      }
    }

    // Get color based on direction (velocity vector) - Orange/Blue gradient
    // This represents the jet bundle - the direction of the fiber
    getColor(vx, vy) {
      // Normalize velocity to get direction
      const speed = Math.sqrt(vx * vx + vy * vy);
      if (speed < 0.01) {
        // No motion - use neutral color (mix of orange and blue)
        return {
          r: Math.round((CONFIG.colors.orange.r + CONFIG.colors.blue.r) / 2),
          g: Math.round((CONFIG.colors.orange.g + CONFIG.colors.blue.g) / 2),
          b: Math.round((CONFIG.colors.orange.b + CONFIG.colors.blue.b) / 2)
        };
      }

      // Direction angle (0 to 2π)
      let angle = Math.atan2(vy, vx);
      if (angle < 0) angle += Math.PI * 2;

      // Map angle to orange/blue gradient
      // 0 to π: orange to blue
      // π to 2π: blue to orange
      const normalizedAngle = angle / (Math.PI * 2);

      let t;
      if (normalizedAngle < 0.5) {
        // First half: orange to blue
        t = normalizedAngle * 2;
      } else {
        // Second half: blue to orange
        t = 1 - (normalizedAngle - 0.5) * 2;
      }

      // Interpolate between orange and blue
      const r = Math.round(CONFIG.colors.orange.r * (1 - t) + CONFIG.colors.blue.r * t);
      const g = Math.round(CONFIG.colors.orange.g * (1 - t) + CONFIG.colors.blue.g * t);
      const b = Math.round(CONFIG.colors.orange.b * (1 - t) + CONFIG.colors.blue.b * t);

      return { r, g, b };
    }

    // Resize when window resizes
    resize(centerX, centerY, width, height) {
      // Scale positions proportionally
      const scaleX = width / this.width;
      const scaleY = height / this.height;

      this.x = centerX + (this.x - this.centerX) * scaleX;
      this.y = centerY + (this.y - this.centerY) * scaleY;

      // Scale trail
      for (let i = 0; i < (this.trailFull ? CONFIG.trailLength : this.trailIndex); i++) {
        this.trail[i].x = centerX + (this.trail[i].x - this.centerX) * scaleX;
        this.trail[i].y = centerY + (this.trail[i].y - this.centerY) * scaleY;
      }

      this.centerX = centerX;
      this.centerY = centerY;
      this.width = width;
      this.height = height;
    }
  }

  // Main manifold background class
  class ManifoldBackground {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.centerX = this.width / 2;
      this.centerY = this.height / 2;

      this.canvas.width = this.width;
      this.canvas.height = this.height;

      // Create two explorers
      this.explorers = [];
      for (let i = 0; i < CONFIG.numPoints; i++) {
        this.explorers.push(new Explorer(i, this.centerX, this.centerY, this.width, this.height));
      }

      console.log('Manifold: Initialized with', this.explorers.length, 'explorers');
    }

    resize() {
      const oldWidth = this.width;
      const oldHeight = this.height;

      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.centerX = this.width / 2;
      this.centerY = this.height / 2;

      this.canvas.width = this.width;
      this.canvas.height = this.height;

      // Resize explorers
      for (const explorer of this.explorers) {
        explorer.resize(this.centerX, this.centerY, this.width, this.height);
      }

      console.log('Manifold: Resized to', this.width + 'x' + this.height);
    }

    update() {
      // Update explorers
      for (const explorer of this.explorers) {
        explorer.update();
        explorer.fadeTrail();
      }
    }

    draw() {
      // Clear with fade (trail effect)
      this.ctx.fillStyle = `rgba(11, 14, 23, ${1 - CONFIG.fadeRate})`;
      this.ctx.fillRect(0, 0, this.width, this.height);

      // Draw trails and current points
      for (const explorer of this.explorers) {
        const trailSize = explorer.trailFull ? CONFIG.trailLength : explorer.trailIndex;

        if (trailSize < 2) continue;

        // Build array of visible points for gradient drawing
        const visiblePoints = [];
        for (let i = 0; i < trailSize; i++) {
          const idx = explorer.trailFull
            ? (explorer.trailIndex + i) % CONFIG.trailLength
            : i;

          const point = explorer.trail[idx];

          if (point && point.opacity >= 0.01) {
            visiblePoints.push(point);
          }
        }

        // Draw trail with gradient based on direction (jet bundle representation)
        if (visiblePoints.length > 1) {
          // Draw segments with color based on direction at each point
          for (let i = 0; i < visiblePoints.length - 1; i++) {
            const p1 = visiblePoints[i];
            const p2 = visiblePoints[i + 1];
            
            // Get color based on direction at this segment
            const color = explorer.getColor(p1.vx, p1.vy);
            const opacity = Math.min(CONFIG.baseOpacity, p1.opacity || CONFIG.baseOpacity);

            this.ctx.beginPath();
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);

            this.ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
            this.ctx.lineWidth = CONFIG.trailWidth;
            this.ctx.lineCap = 'round';
            this.ctx.lineJoin = 'round';
            this.ctx.stroke();
          }
        }

        // Draw current point (larger, more visible)
        const currentColor = explorer.getColor(explorer.vx, explorer.vy);
        this.ctx.fillStyle = `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, 0.9)`;
        this.ctx.beginPath();
        this.ctx.arc(explorer.x, explorer.y, CONFIG.pointRadius, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }

    animate() {
      if (!this.isRunning) return;

      this.frameCount++;

      // Update
      if (this.frameCount % CONFIG.updateEvery === 0) {
        this.update();
      }

      // Draw
      if (this.frameCount % CONFIG.drawEvery === 0) {
        this.draw();
      }

      this.animationId = requestAnimationFrame(() => this.animate());
    }

    start() {
      if (this.isRunning) return;
      this.isRunning = true;
      this.frameCount = 0;
      this.animate();
      console.log('Manifold: Started');
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
        // Set inline styles with !important to override any theme CSS
        canvas.setAttribute('style', `
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          z-index: 0 !important;
          pointer-events: none !important;
          opacity: 0.6 !important;
          background: transparent !important;
          display: block !important;
          visibility: visible !important;
        `);

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
        console.log('Manifold: Canvas computed style', window.getComputedStyle(canvas));
        console.log('Manifold: Canvas position', canvas.getBoundingClientRect());

        // Initialize manifold background
        let manifold;
        try {
          manifold = new ManifoldBackground(canvas);
          console.log('Manifold: Initialized', {
            explorers: manifold.explorers.length,
            width: manifold.width,
            height: manifold.height,
            canvas: canvas.width + 'x' + canvas.height,
            canvasStyle: canvas.style.cssText
          });
          
          // Test draw to verify canvas is working
          const testCtx = canvas.getContext('2d');
          testCtx.fillStyle = 'rgba(255, 0, 0, 0.1)';
          testCtx.fillRect(0, 0, 100, 100);
          console.log('Manifold: Test draw completed (red square in top-left)');
        } catch (e) {
          console.error('Manifold: Error creating', e);
          console.error('Manifold: Stack trace', e.stack);
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
        window.addEventListener('resize', () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            try {
              if (manifold) {
                manifold.resize();
              }
            } catch (e) {
              console.error('Manifold: Resize error', e);
            }
          }, 300);
        }, { passive: true });

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
