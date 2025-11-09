/**
 * JetBundle Manifold Background Animation - Optimized
 *
 * Visualizes fiber bundles and jet bundles with high performance:
 * - Reduced fiber count for better performance
 * - Optimized rendering pipeline
 * - Lower update frequency
 * - Simplified noise calculations
 */

(function () {
    'use strict';

    // Configuration for large, perpetual, single-point manifold
    const CONFIG = {
        // Single point manifold - center of screen
        numBasePoints: 1,         // Single point at center
        fibersPerPoint: 24,       // Many fibers radiating from center
        maxFiberLength: 3000,     // Long fibers to cover entire screen
        fiberStepSize: 2.0,       // Step size for smooth curves
        fiberThickness: 1.0,      // Slightly thicker for visibility

        // Smooth, perpetual animation - EXTREMELY SLOW TEMPO
        animationSpeed: 0.00005,  // Extremely slow animation speed (6x slower than before)
        noiseScale: 0.008,        // Fine-scale noise for smooth curves
        noiseSpeed: 0.000008,     // Extremely slow evolution (6x slower than before)

        // Visual parameters - perpetual trails - EXTREMELY SLOW FADE
        opacityDecay: 0.999,      // Nearly imperceptible decay for extremely long trails
        baseOpacity: 0.25,        // Good visibility
        gradientStops: 2,         // Minimal stops

        // Color scheme (gauge theme)
        colors: {
            orange: { r: 255, g: 107, b: 53 },
            blue: { r: 14, g: 165, b: 233 },
            dark: { r: 11, g: 14, b: 23 },
            dark2: { r: 10, g: 13, b: 20 }
        },

        // Performance tuning - balanced for large coverage (unchanged for performance)
        maxFibers: 24,            // Match fibersPerPoint
        updateInterval: 2,        // Update every 2 frames for smooth animation (unchanged)
        fadeOutSpeed: 0.999,      // Nearly imperceptible fade for extremely long perpetual trails
        maxPointsPerFiber: 1500   // Support long fibers
        
        // Off-screen base point configuration
        basePointOffsetX: -500,   // Base point off-screen to the left
        basePointOffsetY: -500,   // Base point off-screen to the top
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

                // Perpetual noise calculation - creates smooth, evolving curves
                // Slower evolution through reduced noiseSpeed multiplier
                const noiseValue = this.noiseGen.noise(
                    x * CONFIG.noiseScale + this.time * CONFIG.noiseSpeed * 500,
                    y * CONFIG.noiseScale + this.time * CONFIG.noiseSpeed * 500
                );

                // Smooth angle variation for elegant curves
                angle += (noiseValue - 0.5) * Math.PI * 0.15;

                const stepSize = CONFIG.fiberStepSize;
                x += Math.cos(angle) * stepSize;
                y += Math.sin(angle) * stepSize;
                length += stepSize;

                // Very slow opacity decay for perpetual trails
                this.opacity *= CONFIG.opacityDecay;

                // Only stop if opacity is extremely low (almost invisible)
                if (this.opacity < 0.005) break;
            }

            this.length = length;
        }

        update(time) {
            this.time = time;
            this.opacity = CONFIG.baseOpacity;
            this.generatePoints();
        }

        isVisible(width, height, margin = 500) {
            // Large margin for long fibers - check if any part of fiber is visible on screen
            // Base point is off-screen, so we only care about fiber points that are on-screen
            if (this.points.length === 0) return false;
            
            // Don't check base point (it's intentionally off-screen)
            // Only check if any part of the fiber extends onto the visible screen
            
            // Check first point (closest to off-screen base)
            const first = this.points[0];
            if (first.x >= -margin && first.x <= width + margin && 
                first.y >= -margin && first.y <= height + margin) {
                return true;
            }
            
            // Check last point (furthest from base)
            const last = this.points[this.points.length - 1];
            if (last.x >= -margin && last.x <= width + margin && 
                last.y >= -margin && last.y <= height + margin) {
                return true;
            }
            
            // Check middle points (sample every 10th point for performance)
            // This ensures we catch fibers that curve through the screen
            for (let i = 10; i < this.points.length; i += 10) {
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
            // Use window dimensions directly for reliable sizing - full screen coverage
            this.width = window.innerWidth;
            this.height = window.innerHeight;

            // Set canvas size (this is separate from CSS size)
            this.canvas.width = this.width;
            this.canvas.height = this.height;

            // Ensure CSS size matches - full screen coverage
            this.canvas.style.width = '100%';
            this.canvas.style.height = '100%';

            // Reinitialize base space (center point) and regenerate fibers for new screen size
            this.initializeBaseSpace();
            this.generateFibers();

            console.log('Manifold: Resized to', this.width + 'x' + this.height, '- Full screen coverage');
        }

        initializeBaseSpace() {
            this.basePoints = [];
            // Single point OFF-SCREEN (top-left corner, outside viewport)
            // This creates an effect where only the fibers that extend onto the screen are visible
            const baseX = CONFIG.basePointOffsetX;  // Off-screen to the left
            const baseY = CONFIG.basePointOffsetY;  // Off-screen to the top
            
            this.basePoints.push({ 
                x: baseX, 
                y: baseY, 
                id: 0 
            });
            
            console.log('Manifold: Single base point OFF-SCREEN', { 
                x: baseX, 
                y: baseY, 
                width: this.width, 
                height: this.height,
                note: 'Only fibers extending onto screen will be visible'
            });
        }

        generateFibers() {
            this.fibers = [];
            this.jetBundles = [];

            for (const basePoint of this.basePoints) {
                // Generate many fibers radiating from center in all directions
                for (let i = 0; i < CONFIG.fibersPerPoint; i++) {
                    // Evenly distribute angles around the circle
                    const angle = (Math.PI * 2 * i) / CONFIG.fibersPerPoint;
                    // Add slight random variation for organic feel
                    const angleVariation = (Math.random() - 0.5) * 0.1;
                    const fiber = new Fiber(basePoint, angle + angleVariation, this.noiseGen, this.time);
                    this.fibers.push(fiber);
                }

                // Add jet bundles for more complexity
                if (Math.random() > 0.5) {
                    const jetBundle = new JetBundle(basePoint, this.noiseGen, this.time);
                    this.jetBundles.push(jetBundle);
                }
            }

            console.log('Manifold: Generated', this.fibers.length, 'fibers from center point');
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

            // Gradient opacity along fiber for smooth, perpetual appearance
            const startOpacity = Math.max(0.2, fiber.opacity);
            const endOpacity = Math.max(0.05, fiber.opacity * Math.pow(CONFIG.opacityDecay, points.length));

            // Use gradient for smooth color transition along fiber
            if (points.length > 2) {
                const gradient = ctx.createLinearGradient(
                    points[0].x, points[0].y,
                    points[points.length - 1].x, points[points.length - 1].y
                );
                gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${startOpacity})`);
                gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, ${endOpacity})`);
                ctx.strokeStyle = gradient;
            } else {
                ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${startOpacity})`;
            }

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

            // Perpetual trail effect - very slow fade for continuous animation
            // Clear with very subtle fade to create perpetual trails
            this.ctx.fillStyle = `rgba(11, 14, 23, ${1 - CONFIG.fadeOutSpeed})`;
            this.ctx.fillRect(0, 0, this.width, this.height);

            // Initial background fill on first frame
            if (this.frameCount === 1) {
                this.ctx.fillStyle = 'rgba(11, 14, 23, 0.99)';
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
            let drawnCount = 0;
            for (const fiber of this.fibers) {
                if (fiber.isVisible(this.width, this.height) && fiber.points.length > 1) {
                    this.drawFiber(fiber);
                    drawnCount++;
                }
            }

            // Draw jet bundles
            let jetCount = 0;
            for (const jetBundle of this.jetBundles) {
                if (jetBundle.isVisible(this.width, this.height)) {
                    this.drawJetBundle(jetBundle);
                    jetCount++;
                }
            }

            // Debug log every 60 frames
            if (this.frameCount % 60 === 0) {
                console.log('Manifold: Drawing', {
                    frame: this.frameCount,
                    fibersDrawn: drawnCount,
                    jetsDrawn: jetCount,
                    canvasSize: this.width + 'x' + this.height,
                    time: this.time.toFixed(2)
                });
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
                        fibers: manifold.fibers.length,
                        jets: manifold.jetBundles.length,
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
