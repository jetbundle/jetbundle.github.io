/**
 * JetBundle Manifold Background - Stochastic Exploration
 * 
 * Two points explore the manifold with stochastic motion:
 * - Random walk with drift toward center
 * - Color gradient based on direction of motion
 * - Memory-efficient trails that fade over time
 * - Perpetual exploration
 */

(function() {
  'use strict';

  // Optimized configuration
  const CONFIG = {
    // Two explorers
    numPoints: 2,
    
    // Motion parameters
    stepSize: 2.5,              // Base step size
    driftStrength: 0.02,        // Drift toward center (0-1)
    noiseScale: 0.8,            // Randomness (0-1)
    minSpeed: 0.5,              // Minimum speed
    maxSpeed: 3.0,              // Maximum speed
    
    // Trail parameters
    trailLength: 80,            // Number of trail points per explorer
    fadeRate: 0.96,             // Fade per frame (0-1)
    baseOpacity: 0.4,           // Starting opacity
    
    // Visual parameters
    pointRadius: 2.5,           // Current point radius
    trailWidth: 1.8,            // Trail line width
    
    // Color scheme (gauge theme)
    colors: {
      orange: { r: 255, g: 107, b: 53 },
      blue: { r: 14, g: 165, b: 233 },
      dark: { r: 11, g: 14, b: 23 }
    },
    
    // Performance
    updateEvery: 1,             // Update every N frames
    drawEvery: 1                // Draw every N frames
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
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
      
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

    // Update position with stochastic motion and drift
    update() {
      // Random walk component
      const randomAngle = Math.random() * Math.PI * 2;
      const randomMagnitude = CONFIG.noiseScale * CONFIG.stepSize * (0.5 + Math.random());
      
      const randomVx = Math.cos(randomAngle) * randomMagnitude;
      const randomVy = Math.sin(randomAngle) * randomMagnitude;
      
      // Drift toward center
      const dx = this.centerX - this.x;
      const dy = this.centerY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = Math.sqrt(this.width * this.width + this.height * this.height) * 0.5;
      const normalizedDistance = Math.min(distance / maxDistance, 1);
      
      // Stronger drift when further from center
      const driftFactor = CONFIG.driftStrength * (1 + normalizedDistance * 2);
      const driftVx = dx * driftFactor;
      const driftVy = dy * driftFactor;
      
      // Combine random walk and drift
      this.vx = randomVx + driftVx;
      this.vy = randomVy + driftVy;
      
      // Clamp velocity
      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (speed > CONFIG.maxSpeed) {
        this.vx = (this.vx / speed) * CONFIG.maxSpeed;
        this.vy = (this.vy / speed) * CONFIG.maxSpeed;
      } else if (speed < CONFIG.minSpeed && speed > 0) {
        this.vx = (this.vx / speed) * CONFIG.minSpeed;
        this.vy = (this.vy / speed) * CONFIG.minSpeed;
      }
      
      // Update position
      this.x += this.vx;
      this.y += this.vy;
      
      // Boundary conditions - wrap around (torus topology)
      if (this.x < 0) this.x += this.width;
      if (this.x > this.width) this.x -= this.width;
      if (this.y < 0) this.y += this.height;
      if (this.y > this.height) this.y -= this.height;
      
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

    // Get color based on direction (velocity vector)
    getColor(vx, vy) {
      // Normalize velocity to get direction
      const speed = Math.sqrt(vx * vx + vy * vy);
      if (speed < 0.01) {
        // No motion - use neutral color
        return {
          r: (CONFIG.colors.orange.r + CONFIG.colors.blue.r) / 2,
          g: (CONFIG.colors.orange.g + CONFIG.colors.blue.g) / 2,
          b: (CONFIG.colors.orange.b + CONFIG.colors.blue.b) / 2
        };
      }
      
      // Direction angle (0 to 2π)
      let angle = Math.atan2(vy, vx);
      if (angle < 0) angle += Math.PI * 2;
      
      // Map angle to color gradient
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
      
      this.frameCount = 0;
      this.animationId = null;
      this.isRunning = false;
      
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
        
        // Draw trail as connected lines
        this.ctx.beginPath();
        let firstPoint = true;
        
        // Draw trail in chronological order (wraps around if full)
        for (let i = 0; i < trailSize; i++) {
          const idx = explorer.trailFull 
            ? (explorer.trailIndex + i) % CONFIG.trailLength
            : i;
          
          const point = explorer.trail[idx];
          
          if (point.opacity < 0.01) continue;
          
          if (firstPoint) {
            this.ctx.moveTo(point.x, point.y);
            firstPoint = false;
          } else {
            this.ctx.lineTo(point.x, point.y);
          }
        }
        
        // Draw with gradient color based on direction
        if (!firstPoint) {
          // Get color from current velocity
          const color = explorer.getColor(explorer.vx, explorer.vy);
          const opacity = Math.min(CONFIG.baseOpacity, explorer.trail[explorer.trailIndex - 1]?.opacity || CONFIG.baseOpacity);
          
          this.ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
          this.ctx.lineWidth = CONFIG.trailWidth;
          this.ctx.lineCap = 'round';
          this.ctx.lineJoin = 'round';
          this.ctx.stroke();
        }
        
        // Draw current point
        const currentColor = explorer.getColor(explorer.vx, explorer.vy);
        this.ctx.fillStyle = `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, 0.8)`;
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
  }

  // Initialize when DOM is ready
  function init() {
    if (window.manifoldBackgroundInitialized) {
      return;
    }

    const tryInit = () => {
      if (!document.body) {
        console.log('Manifold: Waiting for body...');
        return;
      }

      try {
        if (document.getElementById('manifold-background')) {
          console.log('Manifold: Canvas already exists');
          return;
        }

        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.id = 'manifold-background';
        canvas.setAttribute('style', `
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          z-index: 0 !important;
          pointer-events: none !important;
          opacity: 0.7 !important;
          background: transparent !important;
          display: block !important;
          visibility: visible !important;
        `);

        // Insert canvas
        try {
          document.body.insertBefore(canvas, document.body.firstChild);
        } catch (e) {
          document.body.appendChild(canvas);
        }

        console.log('Manifold: Canvas created');

        // Initialize
        const manifold = new ManifoldBackground(canvas);
        
        setTimeout(() => {
          try {
            if (manifold && !manifold.isRunning) {
              manifold.start();
              window.manifoldBackgroundInitialized = true;
            }
          } catch (e) {
            console.error('Manifold: Error starting', e);
          }
        }, 100);

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

        window.manifoldBackground = manifold;
        
      } catch (error) {
        console.error('Manifold: Init error', error);
      }
    };

    const waitForBody = () => {
      if (document.body) {
        tryInit();
      } else {
        setTimeout(waitForBody, 50);
      }
    };

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      waitForBody();
    } else {
      document.addEventListener('DOMContentLoaded', waitForBody);
    }
    
    window.addEventListener('load', waitForBody);
    setTimeout(waitForBody, 1000);
  }

  init();
})();
