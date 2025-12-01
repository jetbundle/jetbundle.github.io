// Subtle animated manifold background
(function() {
  'use strict';

  let canvas;
  let ctx;
  let animationId;
  let time = 0;
  let isRunning = false;

  // Configuration for subtle effect
  const CONFIG = {
    opacity: 0.15,        // Very subtle
    lineWidth: 1.5,
    gridSize: 40,         // Grid spacing
    waveSpeed: 0.0003,   // Slow evolution
    amplitude: 8,         // Small amplitude
    frequency: 0.02,      // Low frequency
    color: '#58a6ff'      // Match link color
  };

  function initBackground() {
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
    document.body.appendChild(canvas);

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    startAnimation();
  }

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function drawManifold() {
    if (!ctx || !canvas) return;

    const width = canvas.width;
    const height = canvas.height;
    const gridSize = CONFIG.gridSize;
    const t = time;

    // Clear with slight fade for trailing effect
    ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = CONFIG.color;
    ctx.lineWidth = CONFIG.lineWidth;
    ctx.globalAlpha = 0.4;

    // Draw flowing grid lines (manifold-like structure)
    const cols = Math.ceil(width / gridSize) + 2;
    const rows = Math.ceil(height / gridSize) + 2;

    // Vertical flowing lines
    for (let i = -1; i < cols; i++) {
      const x = i * gridSize;
      ctx.beginPath();
      let firstPoint = true;

      for (let j = 0; j <= rows; j++) {
        const y = j * gridSize;
        // Create smooth wave using sine functions
        const offsetX = Math.sin(y * CONFIG.frequency + t * 2) * CONFIG.amplitude +
                       Math.sin(y * CONFIG.frequency * 1.3 + t * 1.5) * CONFIG.amplitude * 0.6;
        const offsetY = Math.cos(x * CONFIG.frequency * 0.8 + t * 1.8) * CONFIG.amplitude * 0.4;

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

    // Horizontal flowing lines
    for (let j = -1; j < rows; j++) {
      const y = j * gridSize;
      ctx.beginPath();
      let firstPoint = true;

      for (let i = 0; i <= cols; i++) {
        const x = i * gridSize;
        // Create smooth wave using cosine functions
        const offsetX = Math.cos(x * CONFIG.frequency * 0.9 + t * 1.6) * CONFIG.amplitude * 0.5;
        const offsetY = Math.sin(x * CONFIG.frequency + t * 2.2) * CONFIG.amplitude +
                       Math.sin(x * CONFIG.frequency * 1.2 + t * 1.7) * CONFIG.amplitude * 0.7;

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

    // Draw subtle flowing curves (manifold paths)
    ctx.globalAlpha = 0.2;
    for (let k = 0; k < 3; k++) {
      const phase = t + k * Math.PI * 0.6;
      ctx.beginPath();
      for (let i = 0; i < width; i += 2) {
        const x = i;
        const y = height * 0.3 + 
                  Math.sin(i * CONFIG.frequency * 0.5 + phase) * CONFIG.amplitude * 2 +
                  Math.cos(i * CONFIG.frequency * 0.3 + phase * 0.7) * CONFIG.amplitude;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    }
  }

  function animate() {
    if (!isRunning) return;
    
    time += CONFIG.waveSpeed;
    drawManifold();
    animationId = requestAnimationFrame(animate);
  }

  function startAnimation() {
    if (isRunning) return;
    isRunning = true;
    animate();
  }

  function stopAnimation() {
    isRunning = false;
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBackground);
  } else {
    initBackground();
  }

  // Pause when page is hidden (save resources)
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      stopAnimation();
    } else {
      startAnimation();
    }
  });
})();

