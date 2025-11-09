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
        fibersPerPoint: 12,       // Fewer fibers for cleaner look
        maxFiberLength: 3000,     // Long fibers to cover entire screen
        fiberStepSize: 2.0,       // Step size for smooth curves
        fiberThickness: 1.0,      // Slightly thicker for visibility

        // Smooth, perpetual animation - EXTREMELY SLOW TEMPO
        animationSpeed: 0.00005,  // Much slower animation speed (60x slower than original)
        noiseScale: 0.008,        // Fine-scale noise for smooth curves
        noiseSpeed: 0.000005,     // Much slower evolution (100x slower than original)

        // Visual parameters - quick fade but continuous
        opacityDecay: 0.992,      // Quicker fade for fibers (but still continuous)
        baseOpacity: 0.25,        // Good visibility
        gradientStops: 2,         // Minimal stops
        
        // Mouse interaction
        mouseInfluenceRadius: 150,  // Radius of mouse influence
        mouseForceStrength: 0.15,   // Strength of mouse perturbation (subtle)
        mouseCurlingStrength: 0.08,  // Strength of curling effect around mouse

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
        fadeOutSpeed: 0.999,      // Extremely slow fade for very long perpetual trails
        maxPointsPerFiber: 1500,  // Support long fibers

        // Center point offset - move off-screen (closer to edge but still hidden)
        // Negative values = off-screen left/top, positive beyond width/height = off-screen right/bottom
        centerOffsetX: -250,      // Center point 250px off-screen to the left (closer to edge)
        centerOffsetY: -250       // Center point 250px off-screen to the top (closer to edge)
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
            // Fibers will use gradient from blue to orange, so we can use either as base
            // The gradient will be applied during drawing
            return CONFIG.colors.blue; // Base color, gradient applied in drawFiber
        }

        generatePoints(mouseX = null, mouseY = null) {
            this.points = [];
            let x = this.basePoint.x;
            let y = this.basePoint.y;
            let angle = this.direction;
            let length = 0;
            const maxPoints = CONFIG.maxPointsPerFiber;

            while (length < this.maxLength && this.points.length < maxPoints) {
                this.points.push({ x, y, opacity: this.opacity });

                // Perpetual noise calculation - creates smooth, evolving curves
                // Extremely slow evolution through reduced noiseSpeed multiplier
                const noiseValue = this.noiseGen.noise(
                    x * CONFIG.noiseScale + this.time * CONFIG.noiseSpeed * 200,
                    y * CONFIG.noiseScale + this.time * CONFIG.noiseSpeed * 200
                );

                // Smooth angle variation for elegant curves
                angle += (noiseValue - 0.5) * Math.PI * 0.15;
                
                // Mouse interaction - subtle perturbation
                if (mouseX !== null && mouseY !== null) {
                    const dx = x - mouseX;
                    const dy = y - mouseY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < CONFIG.mouseInfluenceRadius && dist > 0) {
                        // Calculate force direction (perpendicular for curling effect)
                        const forceAngle = Math.atan2(dy, dx) + Math.PI / 2; // Perpendicular
                        const influence = 1 - (dist / CONFIG.mouseInfluenceRadius); // 1 at center, 0 at edge
                        
                        // Apply subtle curling force
                        const curlForce = CONFIG.mouseCurlingStrength * influence;
                        angle += curlForce * (1 / dist); // Stronger when closer, curling effect
                        
                        // Apply subtle repulsion/push
                        const pushForce = CONFIG.mouseForceStrength * influence;
                        const pushAngle = Math.atan2(dy, dx);
                        x += Math.cos(pushAngle) * pushForce;
                        y += Math.sin(pushAngle) * pushForce;
                    }
                }

                const stepSize = CONFIG.fiberStepSize;
                x += Math.cos(angle) * stepSize;
                y += Math.sin(angle) * stepSize;
                length += stepSize;

                // Quicker opacity decay for faster fade (but still continuous)
                this.opacity *= CONFIG.opacityDecay;
                
                // Stop if opacity is very low (fades quickly)
                if (this.opacity < 0.01) break;
            }

            this.length = length;
        }

        update(time, mouseX = null, mouseY = null) {
            this.time = time;
            this.opacity = CONFIG.baseOpacity;
            this.generatePoints(mouseX, mouseY);
        }

        isVisible(width, height, margin = 500) {
            // Large margin for long fibers - check if any part of fiber is visible ON SCREEN
            // Base point is off-screen, so we only check if fiber points enter the viewport
            if (this.points.length === 0) return false;

            // Don't check base point - it's intentionally off-screen
            // Only check if fiber points extend into the visible area

            // Check first point (closest to base, might be off-screen)
            const first = this.points[0];
            if (first.x >= -margin && first.x <= width + margin &&
                first.y >= -margin && first.y <= height + margin) {
                return true;
            }

            // Check last point (furthest from base, most likely to be on-screen)
            const last = this.points[this.points.length - 1];
            if (last.x >= -margin && last.x <= width + margin &&
                last.y >= -margin && last.y <= height + margin) {
                return true;
            }

            // Check middle points (sample every 10th point for performance)
            // This catches fibers that curve into the viewport
            for (let i = 10; i < this.points.length; i += 10) {
                const p = this.points[i];
                if (p.x >= -margin && p.x <= width + margin &&
                    p.y >= -margin && p.y <= height + margin) {
                    return true;
                }
            }

            // Also check some points near the end (more likely to be on-screen)
            const checkPoints = Math.min(5, Math.floor(this.points.length / 4));
            for (let i = this.points.length - checkPoints; i < this.points.length; i++) {
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

                    // Use extremely slow noise evolution for jets too
                    const noiseValue = this.noiseGen.noise(
                        x * CONFIG.noiseScale * 1.5 + this.time * CONFIG.noiseSpeed * 200,
                        y * CONFIG.noiseScale * 1.5 + this.time * CONFIG.noiseSpeed * 200
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

        isVisible(width, height, margin = 500) {
            // Check if any jet extends into the visible viewport
            // Base point is off-screen, so we only check jet points
            if (this.jets.length === 0) return false;

            // Check if any jet has points in the visible area
            for (const jet of this.jets) {
                if (jet.points.length === 0) continue;

                // Check first point
                const first = jet.points[0];
                if (first.x >= -margin && first.x <= width + margin &&
                    first.y >= -margin && first.y <= height + margin) {
                    return true;
                }

                // Check last point (more likely to be on-screen)
                const last = jet.points[jet.points.length - 1];
                if (last.x >= -margin && last.x <= width + margin &&
                    last.y >= -margin && last.y <= height + margin) {
                    return true;
                }

                // Check middle points
                for (let i = 5; i < jet.points.length; i += 5) {
                    const p = jet.points[i];
                    if (p.x >= -margin && p.x <= width + margin &&
                        p.y >= -margin && p.y <= height + margin) {
                        return true;
                    }
                }
            }

            return false;
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
            // Single point OFF-SCREEN (top-left corner, 250px outside viewport - closer to edge)
            // This ensures only the fibers/bundles that extend INTO the screen are visible
            const centerX = CONFIG.centerOffsetX;  // -250px (off-screen left, closer to edge)
            const centerY = CONFIG.centerOffsetY;  // -250px (off-screen top, closer to edge)

            this.basePoints.push({
                x: centerX,
                y: centerY,
                id: 0
            });

            // Verify point is off-screen
            const isOffScreen = centerX < 0 || centerX > this.width || centerY < 0 || centerY > this.height;
            console.log('Manifold: Base point OFF-SCREEN', {
                x: centerX,
                y: centerY,
                width: this.width,
                height: this.height,
                isOffScreen: isOffScreen,
                verify: `Point at (${centerX}, ${centerY}) is ${isOffScreen ? 'OFF-SCREEN ✓' : 'ON-SCREEN ✗'}`
            });

            if (!isOffScreen) {
                console.warn('Manifold: WARNING - Base point is on-screen! Moving further off-screen...');
                // Force off-screen if somehow on-screen
                this.basePoints[0].x = -1000;
                this.basePoints[0].y = -1000;
            }
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

            // Create subtle gradient from blue to orange along the fiber
            const blueColor = CONFIG.colors.blue;
            const orangeColor = CONFIG.colors.orange;
            
            // More subtle gradient - blend colors more gradually
            // Start with mostly blue, transition to a subtle orange tint
            const blueWeight = 0.7;  // Start with 70% blue
            const orangeWeight = 0.3; // End with 30% orange (subtle)
            
            if (points.length > 2) {
                // Linear gradient from start (mostly blue) to end (subtle orange tint)
                const gradient = ctx.createLinearGradient(
                    points[0].x, points[0].y,
                    points[points.length - 1].x, points[points.length - 1].y
                );
                
                // Start with mostly blue (subtle)
                const startR = Math.round(blueColor.r * blueWeight + orangeColor.r * (1 - blueWeight));
                const startG = Math.round(blueColor.g * blueWeight + orangeColor.g * (1 - blueWeight));
                const startB = Math.round(blueColor.b * blueWeight + orangeColor.b * (1 - blueWeight));
                gradient.addColorStop(0, `rgba(${startR}, ${startG}, ${startB}, ${startOpacity})`);
                
                // Middle transition point (subtle blend)
                const midR = Math.round(blueColor.r * 0.5 + orangeColor.r * 0.5);
                const midG = Math.round(blueColor.g * 0.5 + orangeColor.g * 0.5);
                const midB = Math.round(blueColor.b * 0.5 + orangeColor.b * 0.5);
                gradient.addColorStop(0.7, `rgba(${midR}, ${midG}, ${midB}, ${(startOpacity + endOpacity) / 2})`);
                
                // End with subtle orange tint (not full orange)
                const endR = Math.round(blueColor.r * (1 - orangeWeight) + orangeColor.r * orangeWeight);
                const endG = Math.round(blueColor.g * (1 - orangeWeight) + orangeColor.g * orangeWeight);
                const endB = Math.round(blueColor.b * (1 - orangeWeight) + orangeColor.b * orangeWeight);
                gradient.addColorStop(1, `rgba(${endR}, ${endG}, ${endB}, ${endOpacity})`);
                
                ctx.strokeStyle = gradient;
            } else {
                // Fallback for short fibers - use subtle blue-orange blend
                const blendR = Math.round(blueColor.r * 0.6 + orangeColor.r * 0.4);
                const blendG = Math.round(blueColor.g * 0.6 + orangeColor.g * 0.4);
                const blendB = Math.round(blueColor.b * 0.6 + orangeColor.b * 0.4);
                ctx.strokeStyle = `rgba(${blendR}, ${blendG}, ${blendB}, ${startOpacity})`;
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
                this.ctx.fillStyle = 'rgba(11, 14, 23, 0.995)';
                this.ctx.fillRect(0, 0, this.width, this.height);
            }

            // Update fibers less frequently (with mouse interaction)
            if (this.frameCount % CONFIG.updateInterval === 0) {
                for (const fiber of this.fibers) {
                    if (fiber.isVisible(this.width, this.height)) {
                        fiber.update(this.time, this.mouseX, this.mouseY);
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
