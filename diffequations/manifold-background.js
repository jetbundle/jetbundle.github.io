// Subtle animated manifold background - Fixed and optimized
(function () {
    'use strict';

    let canvas = null;
    let ctx = null;
    let animationId = null;
    let time = 0;
    let isRunning = false;
    let lastFrameTime = 0;
    let initialized = false;

    // Configuration for subtle effect
    const CONFIG = {
        opacity: 0.12,        // Very subtle
        lineWidth: 1.2,
        gridSize: 50,         // Grid spacing
        waveSpeed: 0.3,       // Animation speed multiplier
        amplitude: 6,         // Small amplitude
        frequency: 0.015,     // Low frequency
        color: '#58a6ff',     // Match link color
        fadeAlpha: 0.08       // Fade effect for trailing
    };

    function createCanvas() {
        if (canvas) return canvas;

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

        return canvas;
    }

    function initBackground() {
        // Prevent multiple initializations
        if (initialized) return;

        // Check if canvas already exists
        const existing = document.getElementById('manifold-background');
        if (existing) {
            canvas = existing;
            ctx = canvas.getContext('2d');
            initialized = true;
            resizeCanvas();
            startAnimation();
            return;
        }

        // Ensure body exists
        if (!document.body) {
            setTimeout(initBackground, 50);
            return;
        }

        try {
            // Create and append canvas
            createCanvas();
            ctx = canvas.getContext('2d');

            if (!ctx) {
                console.warn('Canvas 2D context not available');
                return;
            }

            document.body.appendChild(canvas);
            initialized = true;

            // Initial resize
            resizeCanvas();

            // Add resize listener
            window.addEventListener('resize', resizeCanvas, { passive: true });

            // Start animation
            startAnimation();
        } catch (error) {
            console.error('Error initializing manifold background:', error);
        }
    }

    function resizeCanvas() {
        if (!canvas || !ctx) return;

        try {
            const dpr = window.devicePixelRatio || 1;
            const width = window.innerWidth;
            const height = window.innerHeight;

            // Save current transform
            ctx.save();

            // Reset transform
            ctx.setTransform(1, 0, 0, 1, 0, 0);

            // Set canvas size
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';

            // Scale context for high DPI
            ctx.scale(dpr, dpr);

            // Restore transform
            ctx.restore();
        } catch (error) {
            console.error('Error resizing canvas:', error);
        }
    }

    function drawManifold(currentTime) {
        if (!ctx || !canvas || !isRunning) return;

        try {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const gridSize = CONFIG.gridSize;

            // Initialize lastFrameTime if needed
            if (lastFrameTime === 0) {
                lastFrameTime = currentTime;
            }

            // Delta time for smooth animation
            const deltaTime = Math.min(currentTime - lastFrameTime, 100); // Cap at 100ms
            lastFrameTime = currentTime;
            time += deltaTime * 0.001 * CONFIG.waveSpeed; // Convert to seconds and apply speed

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
            const t1 = time;
            const t2 = time * 0.75;
            const t3 = time * 0.5;

            // Draw vertical flowing lines
            for (let i = -1; i < cols; i++) {
                const x = i * gridSize;
                ctx.beginPath();
                let firstPoint = true;

                for (let j = 0; j <= rows; j++) {
                    const y = j * gridSize;
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

            // Draw horizontal flowing lines
            ctx.globalAlpha = 0.3;
            for (let j = -1; j < rows; j++) {
                const y = j * gridSize;
                ctx.beginPath();
                let firstPoint = true;

                for (let i = 0; i <= cols; i++) {
                    const x = i * gridSize;
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

            // Draw subtle flowing curves
            ctx.globalAlpha = 0.15;
            for (let k = 0; k < 2; k++) {
                const phase = t1 + k * Math.PI * 0.6;
                ctx.beginPath();
                const step = 3;
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
        } catch (error) {
            console.error('Error drawing manifold:', error);
            stopAnimation();
        }
    }

    function animate(currentTime) {
        if (!isRunning || !ctx || !canvas) {
            return;
        }

        drawManifold(currentTime || performance.now());
        animationId = requestAnimationFrame(animate);
    }

    function startAnimation() {
        if (isRunning || !canvas || !ctx) return;

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
        // Try immediate initialization if body exists
        if (document.body) {
            initBackground();
        } else if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initBackground);
        } else {
            // Fallback: wait a bit for body
            setTimeout(initBackground, 100);
        }
    }

    // Start initialization
    init();

    // Also try when window loads (fallback)
    window.addEventListener('load', function () {
        if (!initialized) {
            setTimeout(initBackground, 50);
        }
    }, { once: true });

    // Pause when page is hidden (save resources)
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            stopAnimation();
        } else if (initialized) {
            startAnimation();
        }
    }, { passive: true });

    // Cleanup on page unload
    window.addEventListener('beforeunload', function () {
        stopAnimation();
    }, { passive: true });
})();
