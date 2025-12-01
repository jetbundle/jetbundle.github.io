// Subtle animated manifold background - Optimized and efficient
(function() {
  'use strict';

  let canvas;
  let ctx;
  let animationId;
  let time = 0;
  let isRunning = false;
  let lastFrameTime = 0;

  // Configuration for subtle effect
  const CONFIG = {
    opacity: 0.12,        // Very subtle
    lineWidth: 1.2,
    gridSize: 50,         // Grid spacing (larger = fewer lines = faster)
    waveSpeed: 0.5,       // Animation speed (pixels per frame)
    amplitude: 6,         // Small amplitude
    frequency: 0.015,     // Low frequency
    color: '#58a6ff',     // Match link color
    fadeAlpha: 0.08       // Fade effect for trailing
  };

  function initBackground() {
    // Check if canvas already exists
    if (document.getElementById('manifold-background')) {
      return;
    }

    // Create canvas element
    canvas = document.createElement('canvas');
    canvas.id = 'manifold-background';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = CONFIG.opacity.toString();

    ctx = canvas.getContext('2d');
    
    // Ensure body exists before appending
    if (document.body) {
      document.body.appendChild(canvas);
    } else {
      document.addEventListener('DOMContentLoaded', function() {
        document.body.appendChild(canvas);
      });
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    startAnimation();
  }

  function resizeCanvas() {
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }

  function drawManifold(currentTime) {
    if (!ctx || !canvas || !isRunning) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const gridSize = CONFIG.gridSize;
    
    // Delta time for smooth animation
    const deltaTime = currentTime - lastFrameTime;
    lastFrameTime = currentTime;
    time += deltaTime * 0.001; // Convert to seconds

    // Clear with fade for trailing effect
    ctx.fillStyle = `rgba(13, 17, 23, ${CONFIG.fadeAlpha})`;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = CONFIG.color;
    ctx.lineWidth = CONFIG.lineWidth;
    ctx.globalAlpha = 0.35;

    // Calculate grid dimensions
    const cols = Math.ceil(width / gridSize) + 2;
    const rows = Math.ceil(height / gridSize) + 2;

    // Pre-calculate time-dependent values
    const t1 = time * CONFIG.waveSpeed;
    const t2 = time * CONFIG.waveSpeed * 0.75;
    const t3 = time * CONFIG.waveSpeed * 0.5;

    // Draw vertical flowing lines (optimized)
    for (let i = -1; i < cols; i++) {
      const x = i * gridSize;
      ctx.beginPath();
      let firstPoint = true;

      for (let j = 0; j <= rows; j++) {
        const y = j * gridSize;
        // Optimized wave calculation
        const wave1 = Math.sin(y * CONFIG.frequency + t1) * CONFIG.amplitude;
        const wave2 = Math.sin(y * CONFIG.frequency * 1.3 + t2) * CONFIG.amplitude * 0.6;
        const offsetX = wave1 + wave2;
        const offsetY = Math.cos(x * CONFIG.frequency * 0.8 + t3) * CONFIG.amplitude * 0.4;

        const px = x + offsetX;
        const py = y + offsetY;

        if (firstPoint) {
          ctx.moveTo(px, py);
          firstPoint = false;
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.stroke();
    }

    // Draw horizontal flowing lines (optimized)
    ctx.globalAlpha = 0.3;
    for (let j = -1; j < rows; j++) {
      const y = j * gridSize;
      ctx.beginPath();
      let firstPoint = true;

      for (let i = 0; i <= cols; i++) {
        const x = i * gridSize;
        // Optimized wave calculation
        const wave1 = Math.sin(x * CONFIG.frequency + t1 * 1.1) * CONFIG.amplitude;
        const wave2 = Math.sin(x * CONFIG.frequency * 1.2 + t2) * CONFIG.amplitude * 0.7;
        const offsetX = Math.cos(x * CONFIG.frequency * 0.9 + t3) * CONFIG.amplitude * 0.5;
        const offsetY = wave1 + wave2;

        const px = x + offsetX;
        const py = y + offsetY;

        if (firstPoint) {
          ctx.moveTo(px, py);
          firstPoint = false;
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.stroke();
    }

    // Draw subtle flowing curves (reduced for performance)
    ctx.globalAlpha = 0.15;
    for (let k = 0; k < 2; k++) {
      const phase = t1 + k * Math.PI * 0.6;
      ctx.beginPath();
      const step = 3; // Larger step = fewer points = faster
      for (let i = 0; i < width; i += step) {
        const wave1 = Math.sin(i * CONFIG.frequency * 0.5 + phase) * CONFIG.amplitude * 2;
        const wave2 = Math.cos(i * CONFIG.frequency * 0.3 + phase * 0.7) * CONFIG.amplitude;
        const y = height * 0.3 + wave1 + wave2;
        
        if (i === 0) {
          ctx.moveTo(i, y);
        } else {
          ctx.lineTo(i, y);
        }
      }
      ctx.stroke();
    }
  }

  function animate(currentTime) {
    if (!isRunning) return;
    
    drawManifold(currentTime || performance.now());
    animationId = requestAnimationFrame(animate);
  }

  function startAnimation() {
    if (isRunning) return;
    isRunning = true;
    lastFrameTime = performance.now();
    animationId = requestAnimationFrame(animate);
  }

  function stopAnimation() {
    isRunning = false;
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }

  // Initialize when DOM is ready
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initBackground);
    } else {
      // Small delay to ensure body exists
      setTimeout(initBackground, 10);
    }
  }

  init();

  // Pause when page is hidden (save resources)
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      stopAnimation();
    } else {
      startAnimation();
    }
  }, { passive: true });

  // Cleanup on page unload
  window.addEventListener('beforeunload', function() {
    stopAnimation();
  }, { passive: true });
})();
