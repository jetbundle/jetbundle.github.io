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
        fiberThickness: 0.8,      // Slightly thicker for visibility

        // Smooth, perpetual animation - MUCH SLOWER EVOLUTION
        animationSpeed: 0.000000002,    // Much slower evolution (5x slower)
        noiseScale: 0.0008,        // Fine-scale noise for smooth curves
        noiseSpeed: 0.0000002,       // Much slower evolution (5x slower)

        // Visual parameters - slower fade for better visibility
        opacityDecay: 0.998,      // Slower decay (was 0.992) - fibers stay visible longer
        baseOpacity: 0.7,         // Higher visibility (was 0.5)
        gradientStops: 2,         // Minimal stops

        // Mouse interaction parameters (subtle effects)
        mouseInfluenceRadius: 200,  // Radius of mouse influence on fibers
        mouseInfluenceStrength: 0.20, // Strength of mouse perturbation (subtle)
        mouseTrailDamping: 0.88,    // Damping for mouse trail (higher = more damped)
        mouseTrailOpacity: 0.20,    // Slightly more visible opacity for mouse trail
        mouseTrailLength: 60,      // Longer mouse trail fiber (was 60)
        mouseTrailThickness: 0.6,   // Smaller thickness for mouse trail
        mouseTrailEvolutionStrength: 0.2,  // Evolution strength for mouse trail (like regular fibers)

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
        fadeOutSpeed: 0.985,      // Faster fade for continuous process
        maxPointsPerFiber: 1500,  // Support long fibers

        // Center point offset - move off-screen (closer to edge but still hidden)
        // Negative values = off-screen left/top, positive beyond width/height = off-screen right/bottom
        centerOffsetX: -300,      // Center point 250px off-screen to the left (closer to edge)
        centerOffsetY: -5      // Center point 250px off-screen to the top (closer to edge)
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
            // generatePoints will be called with mouse parameters in update()
        }

        determineColor() {
            // Fibers will use gradient from blue to orange, so we can use either as base
            // The gradient will be applied during drawing
            return CONFIG.colors.blue; // Base color, gradient applied in drawFiber
        }

        generatePoints(mouseX, mouseY, mouseActive) {
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

                // Mouse perturbation - subtle warping around mouse
                if (mouseActive) {
                    const dx = mouseX - x;
                    const dy = mouseY - y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < CONFIG.mouseInfluenceRadius) {
                        // Calculate influence strength (stronger when closer)
                        const influence = CONFIG.mouseInfluenceStrength * (1 - dist / CONFIG.mouseInfluenceRadius);

                        // Perturb angle towards/around mouse (creates curl effect)
                        const angleToMouse = Math.atan2(dy, dx);
                        const angleDiff = angleToMouse - angle;
                        // Add subtle curl - fibers curve around mouse
                        angle += Math.sin(angleDiff) * influence * 0.3;

                        // Slight radial push/pull
                        const radialForce = influence * 0.05;
                        x += Math.cos(angleToMouse) * radialForce;
                        y += Math.sin(angleToMouse) * radialForce;
                    }
                }

                const stepSize = CONFIG.fiberStepSize;
                x += Math.cos(angle) * stepSize;
                y += Math.sin(angle) * stepSize;
                length += stepSize;

                // Slower opacity decay for better visibility
                this.opacity *= CONFIG.opacityDecay;

                // Stop if opacity is very low or fiber is very long
                // Don't stop too early - let fibers grow into screen
                if (this.opacity < 0.005 && length > 500) break;
            }

            this.length = length;
        }

        update(time, mouseX, mouseY, mouseActive) {
            this.time = time;
            this.opacity = CONFIG.baseOpacity;
            this.generatePoints(mouseX, mouseY, mouseActive);
        }

        isVisible(width, height, margin = 500) {
            // Large margin for long fibers - check if any part of fiber is visible ON SCREEN
            // Base point is off-screen, so we only check if fiber points enter the viewport
            if (this.points.length === 0) return true; // Always update if no points yet (needs initial generation)

            // Check if any point is within viewport (with margin)
            // Use larger margin for initial visibility check
            const viewMargin = margin;

            // Check every 5th point for performance (more thorough than before)
            for (let i = 0; i < this.points.length; i += Math.max(1, Math.floor(this.points.length / 20))) {
                const p = this.points[i];
                // Check if point could potentially be visible (within extended bounds)
                if (p.x >= -viewMargin && p.x <= width + viewMargin &&
                    p.y >= -viewMargin && p.y <= height + viewMargin) {
                    return true;
                }
            }

            // Also check last point (most likely to be on-screen)
            if (this.points.length > 0) {
                const last = this.points[this.points.length - 1];
                if (last.x >= -viewMargin && last.x <= width + viewMargin &&
                    last.y >= -viewMargin && last.y <= height + viewMargin) {
                    return true;
                }
            }

            // If fiber has points but none are in extended view, it might still curve in
            // Be more permissive - if fiber is long enough, assume it might be visible
            if (this.points.length > 50) {
                return true; // Long fibers might curve into view
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
            if (this.jets.length === 0) return true; // Always update if no jets yet

            // Check if any jet has points in the visible area
            for (const jet of this.jets) {
                if (jet.points.length === 0) continue;

                // Check every point (jets are short, so this is fine)
                for (let i = 0; i < jet.points.length; i++) {
                    const p = jet.points[i];
                    if (p.x >= -margin && p.x <= width + margin &&
                        p.y >= -margin && p.y <= height + margin) {
                        return true;
                    }
                }
            }

            // If jets exist but none are visible, still return true for long jets
            // (they might curve into view)
            return this.jets.some(jet => jet.points.length > 20);
        }
    }

    // Mouse trail fiber class (damped)
    class MouseTrailFiber {
        constructor(noiseGen) {
            this.noiseGen = noiseGen;
            this.points = [];
            this.targetX = 0;
            this.targetY = 0;
            this.currentX = 0;
            this.currentY = 0;
            this.velocityX = 0;
            this.velocityY = 0;
            this.time = 0;
            this.baseOpacity = CONFIG.mouseTrailOpacity;
            this.angle = 0; // Current direction angle for evolution
        }

        update(targetX, targetY, time) {
            this.time = time;
            this.targetX = targetX;
            this.targetY = targetY;

            // Damped motion - only moves when target changes
            const dx = this.targetX - this.currentX;
            const dy = this.targetY - this.currentY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Only update if mouse has moved (damped)
            if (dist > 0.5) {
                // Apply damping
                this.velocityX = this.velocityX * CONFIG.mouseTrailDamping + dx * (1 - CONFIG.mouseTrailDamping) * 0.12;
                this.velocityY = this.velocityY * CONFIG.mouseTrailDamping + dy * (1 - CONFIG.mouseTrailDamping) * 0.12;

                // Update position
                this.currentX += this.velocityX;
                this.currentY += this.velocityY;

                // Evolve like manifold fibers - use noise to create smooth curves
                // Use same noise calculation as regular fibers
                const noiseValue = this.noiseGen.noise(
                    this.currentX * CONFIG.noiseScale + this.time * CONFIG.noiseSpeed * 200,
                    this.currentY * CONFIG.noiseScale + this.time * CONFIG.noiseSpeed * 200
                );

                // Evolve angle exactly like regular fibers (same as regular fibers: 0.15)
                this.angle += (noiseValue - 0.5) * Math.PI * 0.15; // Same as regular fibers

                // Add evolution to position (like regular fibers, but damped)
                const evolutionStrength = CONFIG.mouseTrailEvolutionStrength; // Configurable evolution
                this.currentX += Math.cos(this.angle) * evolutionStrength;
                this.currentY += Math.sin(this.angle) * evolutionStrength;

                // Calculate opacity with decay (like manifold fibers)
                const opacity = this.baseOpacity;

                // Add point to trail
                this.points.push({
                    x: this.currentX,
                    y: this.currentY,
                    opacity: opacity
                });

                // Limit trail length
                if (this.points.length > CONFIG.mouseTrailLength) {
                    this.points.shift();
                }

                // Apply opacity decay to all points (like manifold) - MUCH FASTER DECAY
                this.points.forEach((p, i) => {
                    p.opacity *= 0.88; // Much faster decay (was CONFIG.opacityDecay ~0.998)
                });
            } else {
                // Much faster fade when mouse is still (damped, disappears quickly)
                this.points.forEach((p, i) => {
                    p.opacity *= 0.80; // Much faster fade when still (was 0.95)
                });
                // Remove invisible points
                this.points = this.points.filter(p => p.opacity > 0.01);
            }
        }

        draw(ctx) {
            if (this.points.length < 2) return;

            ctx.beginPath();
            ctx.moveTo(this.points[0].x, this.points[0].y);

            for (let i = 1; i < this.points.length; i++) {
                ctx.lineTo(this.points[i].x, this.points[i].y);
            }

            // Subtle gradient from blue to orange (like regular fibers)
            const blueColor = CONFIG.colors.blue;
            const orangeColor = CONFIG.colors.orange;

            // More subtle gradient - blend colors more gradually (like regular fibers)
            const subtleBlue = {
                r: Math.round(blueColor.r * 0.85 + orangeColor.r * 0.15),
                g: Math.round(blueColor.g * 0.85 + orangeColor.g * 0.15),
                b: Math.round(blueColor.b * 0.85 + orangeColor.b * 0.15)
            };
            const subtleOrange = {
                r: Math.round(blueColor.r * 0.15 + orangeColor.r * 0.85),
                g: Math.round(blueColor.g * 0.15 + orangeColor.g * 0.85),
                b: Math.round(blueColor.b * 0.15 + orangeColor.b * 0.85)
            };

            if (this.points.length > 2) {
                const gradient = ctx.createLinearGradient(
                    this.points[0].x, this.points[0].y,
                    this.points[this.points.length - 1].x, this.points[this.points.length - 1].y
                );

                // Start with subtle blue-tinted
                const startOpacity = Math.max(0.1, this.points[0].opacity);
                gradient.addColorStop(0, `rgba(${subtleBlue.r}, ${subtleBlue.g}, ${subtleBlue.b}, ${startOpacity})`);

                // Middle transition
                const midOpacity = Math.max(0.05, this.points[Math.floor(this.points.length / 2)].opacity);
                gradient.addColorStop(0.7, `rgba(${Math.round(subtleBlue.r * 0.7 + subtleOrange.r * 0.3)}, ${Math.round(subtleBlue.g * 0.7 + subtleOrange.g * 0.3)}, ${Math.round(subtleBlue.b * 0.7 + subtleOrange.b * 0.3)}, ${midOpacity})`);

                // End with subtle orange-tinted
                const endOpacity = Math.max(0.02, this.points[this.points.length - 1].opacity);
                gradient.addColorStop(1, `rgba(${subtleOrange.r}, ${subtleOrange.g}, ${subtleOrange.b}, ${endOpacity})`);

                ctx.strokeStyle = gradient;
            } else {
                const avgOpacity = this.points.reduce((sum, p) => sum + p.opacity, 0) / this.points.length;
                ctx.strokeStyle = `rgba(${Math.round((subtleBlue.r + subtleOrange.r) / 2)}, ${Math.round((subtleBlue.g + subtleOrange.g) / 2)}, ${Math.round((subtleBlue.b + subtleOrange.b) / 2)}, ${avgOpacity})`;
            }

            ctx.lineWidth = CONFIG.mouseTrailThickness; // Smaller thickness
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();
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
            this.mouseTrail = new MouseTrailFiber(this.noiseGen);

            // Mouse tracking
            this.mouseX = -1000;
            this.mouseY = -1000;
            this.mouseActive = false;

            this.resize();
            this.initializeBaseSpace();
            this.generateFibers();
            this.setupMouseTracking();
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

        setupMouseTracking() {
            // Track mouse position for fiber perturbation
            const handleMouseMove = (e) => {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
                this.mouseActive = true;

                // Update mouse trail
                this.mouseTrail.update(this.mouseX, this.mouseY, this.time);
            };

            const handleMouseLeave = () => {
                this.mouseActive = false;
            };

            // Use passive listeners for performance
            this.canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
            this.canvas.addEventListener('mouseleave', handleMouseLeave, { passive: true });

            // Also track on document for better coverage
            document.addEventListener('mousemove', handleMouseMove, { passive: true });
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
                // Generate many fibers radiating from center
                // CRITICAL: Base point is at (-100, -5) (off-screen top-left)
                // To enter screen (x >= 0, y >= 0), fibers MUST go RIGHT (0°) and DOWN (90°)
                // Math coordinates: 0° = right, 90° = down, 180° = left, 270° = up
                // We want angles between -30° and 120° to ensure screen entry
                // This is 150 degrees total, centered around 45° (down-right)

                const minAngle = -Math.PI / 6; // -30 degrees (slightly up-right)
                const maxAngle = Math.PI * 2 / 3; // 120 degrees (slightly down-left, but still enters screen)
                const angleRange = maxAngle - minAngle; // 150 degrees

                for (let i = 0; i < CONFIG.fibersPerPoint; i++) {
                    // Distribute angles evenly within the range that enters screen
                    const angle = minAngle + (angleRange * i) / CONFIG.fibersPerPoint;
                    // Add slight random variation (smaller to keep in valid range)
                    const angleVariation = (Math.random() - 0.5) * 0.1;
                    const finalAngle = angle + angleVariation;

                    const fiber = new Fiber(basePoint, finalAngle, this.noiseGen, this.time);

                    // CRITICAL: Generate initial points immediately so fibers are visible from start
                    fiber.generatePoints(this.mouseX, this.mouseY, this.mouseActive);

                    // Verify fiber will enter screen (debugging)
                    if (fiber.points.length > 10) {
                        const testPoint = fiber.points[Math.min(50, fiber.points.length - 1)];
                        const entersScreen = testPoint.x >= -50 && testPoint.y >= -50;
                        if (!entersScreen && i < 3) {
                            console.warn(`Manifold: Fiber ${i} may not enter screen. Angle: ${(finalAngle * 180 / Math.PI).toFixed(1)}°, test point: (${testPoint.x.toFixed(1)}, ${testPoint.y.toFixed(1)})`);
                        }
                    }

                    this.fibers.push(fiber);
                }

                // Add jet bundles for more complexity
                const jetBundle = new JetBundle(basePoint, this.noiseGen, this.time);
                this.jetBundles.push(jetBundle);
            }

            console.log('Manifold: Generated', this.fibers.length, 'fibers from center point at (',
                this.basePoints[0].x + ',', this.basePoints[0].y + ')');
            console.log('Manifold: Angle range: -30° to 120° (ensures screen entry)');
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

            // Gradient opacity along fiber - higher values for better visibility
            const startOpacity = Math.max(0.4, fiber.opacity * 0.8); // Higher starting opacity
            const endOpacity = Math.max(0.1, fiber.opacity * Math.pow(CONFIG.opacityDecay, Math.min(points.length, 200)) * 0.6); // Higher end opacity

            // Create subtle gradient from blue to orange along the fiber
            const blueColor = CONFIG.colors.blue;
            const orangeColor = CONFIG.colors.orange;

            // More subtle gradient - blend colors more gradually
            // Use a weighted mix that's closer to blue throughout
            const subtleBlue = {
                r: Math.round(blueColor.r * 0.85 + orangeColor.r * 0.15),
                g: Math.round(blueColor.g * 0.85 + orangeColor.g * 0.15),
                b: Math.round(blueColor.b * 0.85 + orangeColor.b * 0.15)
            };
            const subtleOrange = {
                r: Math.round(blueColor.r * 0.15 + orangeColor.r * 0.85),
                g: Math.round(blueColor.g * 0.15 + orangeColor.g * 0.85),
                b: Math.round(blueColor.b * 0.15 + orangeColor.b * 0.85)
            };

            if (points.length > 2) {
                // Linear gradient with more subtle color transition
                const gradient = ctx.createLinearGradient(
                    points[0].x, points[0].y,
                    points[points.length - 1].x, points[points.length - 1].y
                );

                // Start with subtle blue-tinted (higher opacity)
                gradient.addColorStop(0, `rgba(${subtleBlue.r}, ${subtleBlue.g}, ${subtleBlue.b}, ${startOpacity})`);

                // Very gradual transition - mostly blue throughout
                gradient.addColorStop(0.7, `rgba(${Math.round(subtleBlue.r * 0.7 + subtleOrange.r * 0.3)}, ${Math.round(subtleBlue.g * 0.7 + subtleOrange.g * 0.3)}, ${Math.round(subtleBlue.b * 0.7 + subtleOrange.b * 0.3)}, ${(startOpacity + endOpacity) / 2})`);

                // End with subtle orange-tinted (lower opacity)
                gradient.addColorStop(1, `rgba(${subtleOrange.r}, ${subtleOrange.g}, ${subtleOrange.b}, ${endOpacity})`);

                ctx.strokeStyle = gradient;
            } else {
                // Fallback for short fibers - use subtle blue-orange mix
                ctx.strokeStyle = `rgba(${Math.round((subtleBlue.r + subtleOrange.r) / 2)}, ${Math.round((subtleBlue.g + subtleOrange.g) / 2)}, ${Math.round((subtleBlue.b + subtleOrange.b) / 2)}, ${startOpacity})`;
            }

            ctx.lineWidth = CONFIG.fiberThickness * 1.5; // Slightly thicker for visibility
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
            // Use much slower fade to preserve fiber visibility
            const fadeAlpha = 1 - CONFIG.fadeOutSpeed; // Should be ~0.015
            // Reduce fade even more for better visibility
            this.ctx.fillStyle = `rgba(11, 14, 23, ${fadeAlpha * 0.3})`; // 3x slower fade
            this.ctx.fillRect(0, 0, this.width, this.height);

            // Initial background fill on first frame
            if (this.frameCount === 1) {
                this.ctx.fillStyle = 'rgba(11, 14, 23, 1.0)'; // Fully opaque on first frame
                this.ctx.fillRect(0, 0, this.width, this.height);

                // Draw all fibers immediately on first frame (they have initial points from generateFibers)
                console.log('Manifold: First frame - drawing', this.fibers.length, 'fibers with initial points');
                console.log('Manifold: Canvas size:', this.width + 'x' + this.height);
                console.log('Manifold: Base point:', this.basePoints[0].x + ',', this.basePoints[0].y);
            }

            // Update fibers less frequently
            // CRITICAL FIX: Always update fibers, then check visibility for drawing
            // This ensures fibers get initial points even if they start off-screen
            if (this.frameCount % CONFIG.updateInterval === 0) {
                for (const fiber of this.fibers) {
                    // Always update fibers - visibility check happens during drawing
                    fiber.update(this.time, this.mouseX, this.mouseY, this.mouseActive);
                }
            }

            // Update mouse trail (always, but it's damped so it won't move when mouse is still)
            this.mouseTrail.update(this.mouseX, this.mouseY, this.time);

            // Update jet bundles much less frequently
            // Always update jet bundles (like fibers)
            if (this.frameCount % (CONFIG.updateInterval * 4) === 0) {
                for (const jetBundle of this.jetBundles) {
                    jetBundle.update(this.time);
                }
            }

            // Draw all fibers (small count, so it's fine)
            // CRITICAL: Always try to draw fibers - visibility check is permissive
            let drawnCount = 0;
            let pointsCount = 0;
            for (const fiber of this.fibers) {
                pointsCount += fiber.points.length;
                // Draw if fiber has points - be very permissive
                if (fiber.points.length > 1) {
                    // Always draw fibers that have points (they should enter screen)
                    // Only skip if fiber is clearly going away from screen AND is very short
                    const lastPoint = fiber.points[fiber.points.length - 1];
                    const isGoingAway = lastPoint.x < -200 && lastPoint.y < -200 && fiber.points.length < 100;

                    if (!isGoingAway || this.frameCount < 20) { // Always draw in first 20 frames
                        this.drawFiber(fiber);
                        drawnCount++;
                    }
                }
            }

            // Debug logging
            if (this.frameCount % 120 === 0) { // Every 2 seconds at 60fps
                console.log('Manifold: Draw stats', {
                    frame: this.frameCount,
                    fibersDrawn: drawnCount,
                    totalPoints: pointsCount,
                    avgPointsPerFiber: pointsCount / this.fibers.length,
                    canvasSize: this.width + 'x' + this.height
                });
            }

            // Draw jet bundles
            let jetCount = 0;
            for (const jetBundle of this.jetBundles) {
                if (jetBundle.isVisible(this.width, this.height)) {
                    this.drawJetBundle(jetBundle);
                    jetCount++;
                }
            }

            // Draw mouse trail (subtle, in background)
            if (this.mouseTrail.points.length > 1) {
                this.mouseTrail.draw(this.ctx);
            }

            // Debug log every 60 frames
            if (this.frameCount % 60 === 0) {
                console.log('Manifold: Drawing', {
                    frame: this.frameCount,
                    fibersDrawn: drawnCount,
                    jetsDrawn: jetCount,
                    canvasSize: this.width + 'x' + this.height,
                    time: this.time.toFixed(2),
                    mouseActive: this.mouseActive
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
          opacity: 0.8 !important;
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
                    // Draw a bright test pattern to verify canvas is visible
                    testCtx.fillStyle = 'rgba(255, 0, 0, 0.3)'; // Bright red for visibility
                    testCtx.fillRect(0, 0, 100, 100);
                    testCtx.fillStyle = 'rgba(0, 255, 0, 0.3)'; // Bright green
                    testCtx.fillRect(canvas.width - 100, 0, 100, 100);
                    console.log('Manifold: Test draw completed (red square top-left, green square top-right)');
                    console.log('Manifold: If you see colored squares, canvas is working!');

                    // Remove test squares after 2 seconds
                    setTimeout(() => {
                        if (manifold && manifold.ctx) {
                            manifold.ctx.fillStyle = 'rgba(11, 14, 23, 1.0)';
                            manifold.ctx.fillRect(0, 0, 100, 100);
                            manifold.ctx.fillRect(canvas.width - 100, 0, 100, 100);
                            console.log('Manifold: Test squares removed');
                        }
                    }, 2000);
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
