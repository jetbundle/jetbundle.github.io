/**
 * JetBundle Manifold Background Animation - Improved Mathematical Accuracy
 *
 * Features:
 * - 2 moving base points with stochastic (Brownian) motion on the manifold
 * - Improved mathematical accuracy (better connection, parallel transport)
 * - Memory efficient (perpetual running, cleanup off-screen elements)
 * - Perpetual exploration of the space
 * - Minimized computational cost
 */

(function() {
    'use strict';

    // Optimized configuration with improved accuracy
    const CONFIG = {
        // Two moving base points
        numBasePoints: 2,
        fibersPerPoint: 1,        // One fiber per base point
        maxFiberLength: 400,      // Longer fibers for better exploration
        fiberStepSize: 2.5,       // Larger steps for straighter, more exploratory paths
        fiberThickness: 2.5,      // Much thicker fibers
        basePointSize: 10,        // Larger base points (radius)
        curvatureStrength: 0.08,  // Reduced curvature for less warping (was 0.15)

        // Stochastic motion parameters
        brownianScale: 0.8,       // Scale of Brownian motion
        brownianSpeed: 0.15,      // Speed of exploration
        boundaryReflection: 0.95, // Boundary reflection coefficient

        // Animation parameters
        animationSpeed: 0.002,
        noiseScale: 0.015,

        // Visual parameters
        opacityDecay: 0.997,      // Very slow decay for longer fibers
        baseOpacity: 0.35,        // Higher opacity for better visibility
        minOpacity: 0.10,         // Minimum opacity before stopping
        centerOpacity: 1.0,       // Full opacity at center (base point)

        // Color scheme (gauge theme)
        colors: {
            orange: { r: 255, g: 107, b: 53 },
            blue: { r: 14, g: 165, b: 233 },
            dark: { r: 11, g: 14, b: 23 },
            dark2: { r: 10, g: 13, b: 20 }
        },

        // Performance and memory
        maxFibers: 10,            // Reduced since only 1 fiber per point
        updateInterval: 2,        // More frequent updates for smoother motion
        fadeOutSpeed: 0.99,       // Slower fade for longer trails
        maxPointsPerFiber: 300,   // More points for bidirectional fibers
        cleanupInterval: 400,     // Less frequent cleanup
        maxFiberAge: 800,         // Longer age before cleanup
        viewportMargin: 400       // Larger margin for longer exploration
    };

    // Improved noise generator with better mathematical properties
    class ImprovedNoiseGenerator {
        constructor(seed) {
            this.seed = seed || Math.random() * 10000;
            this.permutation = this.generatePermutation();
            this.cache = new Map(); // Cache for performance
            this.cacheSize = 1000;
        }

        generatePermutation() {
            const p = Array.from({ length: 256 }, (_, i) => i);
            for (let i = p.length - 1; i > 0; i--) {
                const j = Math.floor((this.seed + i) * 0.618033988749) % (i + 1);
                [p[i], p[j]] = [p[j], p[i]];
            }
            return p.concat(p);
        }

        fade(t) {
            // Smoothstep function (C² continuous)
            return t * t * t * (t * (t * 6 - 15) + 10);
        }

        lerp(a, b, t) {
            return a + t * (b - a);
        }

        grad(hash, x, y) {
            const h = hash & 15;
            const u = h < 8 ? x : y;
            const v = h < 4 ? y : h === 12 || h === 14 ? x : 0;
            return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
        }

        noise(x, y) {
            // Check cache first
            const key = `${Math.floor(x * 10)},${Math.floor(y * 10)}`;
            if (this.cache.has(key)) {
                return this.cache.get(key);
            }

            const X = Math.floor(x) & 255;
            const Y = Math.floor(y) & 255;
            x -= Math.floor(x);
            y -= Math.floor(y);
            const u = this.fade(x);
            const v = this.fade(y);
            const A = this.permutation[X] + Y;
            const AA = this.permutation[A];
            const AB = this.permutation[A + 1];
            const B = this.permutation[X + 1] + Y;
            const BA = this.permutation[B];
            const BB = this.permutation[B + 1];

            const result = this.lerp(
                this.lerp(this.grad(this.permutation[AA], x, y),
                    this.grad(this.permutation[BA], x - 1, y), u),
                this.lerp(this.grad(this.permutation[AB], x, y - 1),
                    this.grad(this.permutation[BB], x - 1, y - 1), u),
                v
            ) * 0.5 + 0.5;

            // Cache result (with size limit)
            if (this.cache.size < this.cacheSize) {
                this.cache.set(key, result);
            }

            return result;
        }

        // Clear cache periodically
        clearCache() {
            if (this.cache.size > this.cacheSize * 0.8) {
                this.cache.clear();
            }
        }
    }

    // Brownian motion on 2D manifold
    class BrownianMotion {
        constructor(width, height, scale = 1.0, speed = 0.1) {
            this.width = width;
            this.height = height;
            this.scale = scale;
            this.speed = speed;
            this.velocity = { x: 0, y: 0 };
        }

        // Generate Brownian step (Wiener process)
        step(position, dt = 1.0) {
            // Generate random step (Gaussian noise)
            const randomAngle = Math.random() * Math.PI * 2;
            const randomMagnitude = Math.sqrt(-2 * Math.log(Math.random())) * this.scale;

            // Update velocity (drift term)
            this.velocity.x += (Math.random() - 0.5) * this.speed;
            this.velocity.y += (Math.random() - 0.5) * this.speed;

            // Damping to prevent divergence
            this.velocity.x *= 0.98;
            this.velocity.y *= 0.98;

            // Brownian step
            const dx = Math.cos(randomAngle) * randomMagnitude * this.speed + this.velocity.x * dt;
            const dy = Math.sin(randomAngle) * randomMagnitude * this.speed + this.velocity.y * dt;

            // Update position
            let newX = position.x + dx;
            let newY = position.y + dy;

            // Boundary reflection (manifold with boundaries)
            if (newX < 0) {
                newX = -newX * CONFIG.boundaryReflection;
                this.velocity.x *= -CONFIG.boundaryReflection;
            } else if (newX > this.width) {
                newX = this.width - (newX - this.width) * CONFIG.boundaryReflection;
                this.velocity.x *= -CONFIG.boundaryReflection;
            }

            if (newY < 0) {
                newY = -newY * CONFIG.boundaryReflection;
                this.velocity.y *= -CONFIG.boundaryReflection;
            } else if (newY > this.height) {
                newY = this.height - (newY - this.height) * CONFIG.boundaryReflection;
                this.velocity.y *= -CONFIG.boundaryReflection;
            }

            return { x: newX, y: newY };
        }
    }

    // Improved Fiber class with better mathematical accuracy
    class ImprovedFiber {
        constructor(basePoint, direction, noiseGen, time, id, basePointIndex) {
            this.basePoint = { x: basePoint.x, y: basePoint.y }; // Copy base point
            this.basePointIndex = basePointIndex; // Track which base point this belongs to
            this.direction = direction;
            this.noiseGen = noiseGen;
            this.time = time;
            this.id = id;
            this.points = [];
            this.opacity = CONFIG.baseOpacity;
            this.color = this.determineColor();
            this.length = 0;
            this.maxLength = CONFIG.maxFiberLength * (0.8 + Math.random() * 0.4);
            this.age = 0; // Track age for cleanup
            this.generatePoints();
        }

        determineColor() {
            // Color will be determined dynamically based on curvature
            // Return neutral color initially, will be set during generation
            return CONFIG.colors.orange; // Default, will be updated
        }

        generatePoints() {
            this.points = [];
            const centerX = this.basePoint.x;
            const centerY = this.basePoint.y;
            const maxLength = this.maxLength / 2; // Half length in each direction
            const maxPoints = CONFIG.maxPointsPerFiber;

            // Track curvature for color gradient
            let totalCurvature = 0;
            let curvatureSamples = 0;
            let currentCurvature = 0;

            // Generate points in both directions from center (base point)
            // First: generate forward direction (from center outward)
            const forwardPoints = [];
            let x = centerX;
            let y = centerY;
            let angle = this.direction; // Main direction
            let length = 0;
            let forwardOpacity = CONFIG.centerOpacity;

            while (length < maxLength && forwardPoints.length < maxPoints / 2) {
                // Connection form: ω = A_x(x,y,t) dx + A_y(x,y,t) dy
                const noiseX = this.noiseGen.noise(
                    x * CONFIG.noiseScale + this.time,
                    y * CONFIG.noiseScale + this.time
                );
                const noiseY = this.noiseGen.noise(
                    x * CONFIG.noiseScale + this.time + 100,
                    y * CONFIG.noiseScale + this.time + 100
                );
                
                // Connection coefficients (normalized to [-1, 1])
                const A_x = (noiseX - 0.5) * 2;
                const A_y = (noiseY - 0.5) * 2;

                // Curvature (positive or negative) - reduced strength for less warping
                currentCurvature = (A_x + A_y) * 0.5;
                totalCurvature += currentCurvature;
                curvatureSamples++;

                // Store point with curvature
                forwardPoints.push({ 
                    x, y, 
                    opacity: forwardOpacity, 
                    angle,
                    curvature: currentCurvature,
                    distance: length
                });
                
                // Reduced curvature effect for straighter paths
                angle += currentCurvature * Math.PI * CONFIG.curvatureStrength;

                // Step along fiber (geodesic path)
                const stepSize = CONFIG.fiberStepSize;
                x += Math.cos(angle) * stepSize;
                y += Math.sin(angle) * stepSize;
                length += stepSize;

                // Opacity decay from center outward
                forwardOpacity *= CONFIG.opacityDecay;
                if (forwardOpacity < CONFIG.minOpacity) break;
            }

            // Second: generate backward direction (from center outward in opposite direction)
            const backwardPoints = [];
            x = centerX;
            y = centerY;
            angle = this.direction + Math.PI; // Opposite direction
            length = 0;
            let backwardOpacity = CONFIG.centerOpacity;

            while (length < maxLength && backwardPoints.length < maxPoints / 2) {
                const noiseX = this.noiseGen.noise(
                    x * CONFIG.noiseScale + this.time,
                    y * CONFIG.noiseScale + this.time
                );
                const noiseY = this.noiseGen.noise(
                    x * CONFIG.noiseScale + this.time + 100,
                    y * CONFIG.noiseScale + this.time + 100
                );
                
                const A_x = (noiseX - 0.5) * 2;
                const A_y = (noiseY - 0.5) * 2;
                currentCurvature = (A_x + A_y) * 0.5;
                totalCurvature += currentCurvature;
                curvatureSamples++;

                backwardPoints.push({ 
                    x, y, 
                    opacity: backwardOpacity, 
                    angle,
                    curvature: currentCurvature,
                    distance: length
                });
                
                angle += currentCurvature * Math.PI * CONFIG.curvatureStrength;

                const stepSize = CONFIG.fiberStepSize;
                x += Math.cos(angle) * stepSize;
                y += Math.sin(angle) * stepSize;
                length += stepSize;

                backwardOpacity *= CONFIG.opacityDecay;
                if (backwardOpacity < CONFIG.minOpacity) break;
            }

            // Combine points: backward (reversed) + center + forward
            // Reverse backward points so they go from outer to center
            backwardPoints.reverse();
            
            // Add center point with full opacity
            this.points.push({
                x: centerX,
                y: centerY,
                opacity: CONFIG.centerOpacity,
                angle: this.direction,
                curvature: 0,
                distance: 0
            });

            // Combine all points (backward + center + forward)
            this.points = [...backwardPoints, ...this.points, ...forwardPoints];

            // Determine overall fiber color based on average curvature
            const avgCurvature = curvatureSamples > 0 ? totalCurvature / curvatureSamples : 0;
            this.avgCurvature = avgCurvature;
            this.length = length * 2; // Total length is sum of both directions
        }

        update(time, basePoint) {
            this.time = time;
            // Update base point position (for moving points)
            if (basePoint) {
                this.basePoint.x = basePoint.x;
                this.basePoint.y = basePoint.y;
            }
            this.opacity = CONFIG.baseOpacity;
            this.age++;
            this.generatePoints();
        }

        isVisible(width, height, margin = CONFIG.viewportMargin) {
            if (this.points.length === 0) return false;

            // Check if base point or any fiber point is visible
            const baseVisible = this.basePoint.x >= -margin && this.basePoint.x <= width + margin &&
                              this.basePoint.y >= -margin && this.basePoint.y <= height + margin;
            if (baseVisible) return true;

            // Check first and last points
            const first = this.points[0];
            const last = this.points[this.points.length - 1];
            return (first.x >= -margin && first.x <= width + margin && first.y >= -margin && first.y <= height + margin) ||
                   (last.x >= -margin && last.x <= width + margin && last.y >= -margin && last.y <= height + margin);
        }

        isOld() {
            return this.age > CONFIG.maxFiberAge;
        }
    }

    // Improved JetBundle class
    class ImprovedJetBundle {
        constructor(basePoint, noiseGen, time, id, basePointIndex) {
            this.basePoint = { x: basePoint.x, y: basePoint.y }; // Copy base point
            this.basePointIndex = basePointIndex; // Track which base point this belongs to
            this.noiseGen = noiseGen;
            this.time = time;
            this.id = id;
            this.jets = [];
            this.age = 0;
            this.generateJets();
        }

        generateJets() {
            const numJets = 2;
            let totalCurvature = 0;
            let curvatureSamples = 0;

            for (let i = 0; i < numJets; i++) {
                const angle = (Math.PI * 2 * i) / numJets + Math.random() * 0.3;
                const jet = {
                    points: [],
                    opacity: CONFIG.baseOpacity * 0.4,
                    length: CONFIG.maxFiberLength * 0.4
                };

                let x = this.basePoint.x;
                let y = this.basePoint.y;
                let currentAngle = angle;
                let length = 0;
                const maxPoints = 80; // More points for longer jets

                // Higher-order jet (more curvature)
                while (length < jet.length && jet.points.length < maxPoints) {
                    // Higher curvature for jets (represents derivatives)
                    const noiseValue1 = this.noiseGen.noise(
                        x * CONFIG.noiseScale * 2 + this.time,
                        y * CONFIG.noiseScale * 2 + this.time
                    );
                    const noiseValue2 = this.noiseGen.noise(
                        x * CONFIG.noiseScale * 2 + this.time + 50,
                        y * CONFIG.noiseScale * 2 + this.time + 50
                    );
                    const curvature = (noiseValue1 + noiseValue2 - 1);
                    totalCurvature += curvature;
                    curvatureSamples++;

                    jet.points.push({ x, y, opacity: jet.opacity, curvature });
                    currentAngle += curvature * Math.PI * 0.4;

                    const stepSize = CONFIG.fiberStepSize * 0.7;
                    x += Math.cos(currentAngle) * stepSize;
                    y += Math.sin(currentAngle) * stepSize;
                    length += stepSize;
                    jet.opacity *= 0.96;

                    if (jet.opacity < CONFIG.minOpacity) break;
                }

                this.jets.push(jet);
            }

            // Store average curvature for color determination
            this.avgCurvature = curvatureSamples > 0 ? totalCurvature / curvatureSamples : 0;
        }

        update(time, basePoint) {
            this.time = time;
            // Update base point position (for moving points)
            if (basePoint) {
                this.basePoint.x = basePoint.x;
                this.basePoint.y = basePoint.y;
            }
            this.age++;
            this.generateJets();
        }

        isVisible(width, height, margin = CONFIG.viewportMargin) {
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

        isOld() {
            return this.age > CONFIG.maxFiberAge;
        }
    }

    // Improved ManifoldBackground with moving base points
    class ImprovedManifoldBackground {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.width = 0;
            this.height = 0;
            this.time = 0;
            this.frameCount = 0;
            this.animationId = null;
            this.isRunning = false;

            // Generate unique seed
            this.seed = Date.now() + Math.random() * 10000;
            this.noiseGen = new ImprovedNoiseGenerator(this.seed);

            // Initialize base points (2 moving points)
            this.basePoints = [];
            this.brownianMotions = [];
            this.fibers = [];
            this.jetBundles = [];
            this.fiberIdCounter = 0;
            this.jetIdCounter = 0;

            this.resize();
            this.initializeBaseSpace();
        }

        resize() {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.canvas.style.width = this.width + 'px';
            this.canvas.style.height = this.height + 'px';

            // Update Brownian motion bounds
            this.brownianMotions.forEach(bm => {
                bm.width = this.width;
                bm.height = this.height;
            });
        }

        initializeBaseSpace() {
            this.basePoints = [];
            this.brownianMotions = [];

            // Initialize 2 base points at different locations
            const positions = [
                { x: this.width * 0.3, y: this.height * 0.4 },
                { x: this.width * 0.7, y: this.height * 0.6 }
            ];

            for (let i = 0; i < CONFIG.numBasePoints; i++) {
                const pos = positions[i] || {
                    x: Math.random() * this.width,
                    y: Math.random() * this.height
                };
                this.basePoints.push({ x: pos.x, y: pos.y, id: i });

                // Create Brownian motion for this point
                this.brownianMotions.push(new BrownianMotion(
                    this.width,
                    this.height,
                    CONFIG.brownianScale,
                    CONFIG.brownianSpeed
                ));
            }

            // Generate initial fibers
            this.generateFibers();
        }

        generateFibers() {
            // Generate fibers for each base point
            this.fibers = [];
            this.jetBundles = [];
            this.fiberIdCounter = 0;
            this.jetIdCounter = 0;

            for (let i = 0; i < this.basePoints.length; i++) {
                const basePoint = this.basePoints[i];

                for (let j = 0; j < CONFIG.fibersPerPoint; j++) {
                    const angle = (Math.PI * 2 * j) / CONFIG.fibersPerPoint + Math.random() * 0.3;
                    const fiber = new ImprovedFiber(
                        basePoint,
                        angle,
                        this.noiseGen,
                        this.time,
                        this.fiberIdCounter++,
                        i // Track base point index
                    );
                    this.fibers.push(fiber);
                }

                // Generate jet bundle for each base point
                const jetBundle = new ImprovedJetBundle(
                    basePoint,
                    this.noiseGen,
                    this.time,
                    this.jetIdCounter++,
                    i // Track base point index
                );
                this.jetBundles.push(jetBundle);
            }

            // Limit total fibers (shouldn't be needed with 2 base points, but safety check)
            if (this.fibers.length > CONFIG.maxFibers) {
                this.fibers = this.fibers.slice(-CONFIG.maxFibers);
            }
        }

        updateBasePoints() {
            // Update base points with Brownian motion
            for (let i = 0; i < this.basePoints.length; i++) {
                const bm = this.brownianMotions[i];
                this.basePoints[i] = bm.step(this.basePoints[i]);
            }
        }

        cleanup() {
            // Remove old fibers and jets that are off-screen or too old
            this.fibers = this.fibers.filter(fiber => {
                if (fiber.isOld() || !fiber.isVisible(this.width, this.height)) {
                    return false;
                }
                return true;
            });

            this.jetBundles = this.jetBundles.filter(jetBundle => {
                if (jetBundle.isOld() || !jetBundle.isVisible(this.width, this.height)) {
                    return false;
                }
                return true;
            });

            // Clear noise cache periodically
            if (this.frameCount % (CONFIG.cleanupInterval * 2) === 0) {
                this.noiseGen.clearCache();
            }
        }

        drawFiber(fiber) {
            if (fiber.points.length < 2) return;

            const ctx = this.ctx;
            const points = fiber.points;

            // Draw fiber with gradient based on curvature (positivity/negativity)
            // Use gradient that transitions between orange (positive) and blue (negative)
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);

            // Create gradient along fiber based on curvature
            // Find bounding box for gradient
            let minX = Infinity, maxX = -Infinity;
            let minY = Infinity, maxY = -Infinity;
            for (const p of points) {
                minX = Math.min(minX, p.x);
                maxX = Math.max(maxX, p.x);
                minY = Math.min(minY, p.y);
                maxY = Math.max(maxY, p.y);
            }

            // Create linear gradient along fiber direction (from start to end)
            const gradient = ctx.createLinearGradient(minX, minY, maxX, maxY);
            
            // Find center point index (base point should be near middle)
            const centerIdx = Math.floor(points.length / 2);
            const maxDist = points.length / 2;

            // Add color stops based on curvature at each point
            const numStops = Math.min(40, points.length); // More stops for smoother gradient
            for (let i = 0; i <= numStops; i++) {
                const idx = Math.floor((i / numStops) * (points.length - 1));
                const point = points[idx];
                const t = i / numStops;

                // Distance from center affects opacity (brightest at center, fades at ends)
                const distFromCenter = Math.abs(idx - centerIdx);
                const centerFactor = Math.max(0.6, 1.0 - (distFromCenter / maxDist) * 0.4);

                // Curvature determines color: positive = orange, negative = blue
                const curvatureNorm = Math.max(-1, Math.min(1, point.curvature || 0));
                const orangeWeight = (curvatureNorm + 1) / 2; // 0 to 1
                const blueWeight = 1 - orangeWeight;

                // Mix orange and blue based on curvature
                const r = Math.floor(CONFIG.colors.orange.r * orangeWeight + CONFIG.colors.blue.r * blueWeight);
                const g = Math.floor(CONFIG.colors.orange.g * orangeWeight + CONFIG.colors.blue.g * blueWeight);
                const b = Math.floor(CONFIG.colors.orange.b * orangeWeight + CONFIG.colors.blue.b * blueWeight);

                // Opacity: enhanced at center (base point), uses point's stored opacity
                const baseOpacity = point.opacity || CONFIG.baseOpacity;
                const opacity = Math.max(CONFIG.minOpacity, Math.min(1.0, baseOpacity * centerFactor));

                gradient.addColorStop(t, `rgba(${r}, ${g}, ${b}, ${opacity})`);
            }

            // Draw the path
            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }

            ctx.strokeStyle = gradient;
            ctx.lineWidth = CONFIG.fiberThickness;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();
        }

        drawBasePoint(basePoint) {
            const ctx = this.ctx;
            const size = CONFIG.basePointSize;
            
            // Draw larger base point with stronger visibility
            ctx.beginPath();
            ctx.arc(basePoint.x, basePoint.y, size, 0, Math.PI * 2);
            
            // Gradient fill: orange to blue
            const gradient = ctx.createRadialGradient(
                basePoint.x, basePoint.y, 0,
                basePoint.x, basePoint.y, size
            );
            gradient.addColorStop(0, `rgba(255, 107, 53, 0.9)`); // Bright orange center
            gradient.addColorStop(0.5, `rgba(255, 107, 53, 0.6)`); // Orange mid
            gradient.addColorStop(1, `rgba(14, 165, 233, 0.5)`); // Blue edge
            
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // Outer glow - stronger for better visibility
            ctx.strokeStyle = `rgba(255, 107, 53, 0.5)`;
            ctx.lineWidth = 3;
            ctx.stroke();
            
            // Inner highlight
            ctx.beginPath();
            ctx.arc(basePoint.x, basePoint.y, size * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, 0.3)`;
            ctx.fill();
        }

        drawJetBundle(jetBundle) {
            for (const jet of jetBundle.jets) {
                if (jet.points.length < 2) continue;

                const ctx = this.ctx;
                const points = jet.points;

                // Draw jets with curvature-based gradient (similar to fibers)
                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);

                // Simple gradient for jets (orange to blue)
                const gradient = ctx.createLinearGradient(
                    points[0].x, points[0].y,
                    points[points.length - 1].x, points[points.length - 1].y
                );

                // Use average curvature for jet color
                const avgCurvature = jetBundle.avgCurvature || 0;
                const orangeWeight = (avgCurvature + 1) / 2;
                const blueWeight = 1 - orangeWeight;

                const r = Math.floor(CONFIG.colors.orange.r * orangeWeight + CONFIG.colors.blue.r * blueWeight);
                const g = Math.floor(CONFIG.colors.orange.g * orangeWeight + CONFIG.colors.blue.g * blueWeight);
                const b = Math.floor(CONFIG.colors.orange.b * orangeWeight + CONFIG.colors.blue.b * blueWeight);

                gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${jet.opacity * 0.5})`);
                gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${jet.opacity * 0.2})`);

                for (let i = 1; i < points.length; i++) {
                    ctx.lineTo(points[i].x, points[i].y);
                }

                ctx.strokeStyle = gradient;
                ctx.lineWidth = CONFIG.fiberThickness * 0.6;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.stroke();
            }
        }

        animate() {
            if (!this.isRunning) return;

            this.frameCount++;
            this.time += CONFIG.animationSpeed;

            // Update base points with Brownian motion
            this.updateBasePoints();

            // Clear with fade
            if (this.frameCount % 2 === 0) {
                this.ctx.fillStyle = `rgba(11, 14, 23, ${1 - CONFIG.fadeOutSpeed})`;
                this.ctx.fillRect(0, 0, this.width, this.height);
            } else {
                if (this.frameCount === 1) {
                    this.ctx.fillStyle = 'rgba(11, 14, 23, 0.95)';
                    this.ctx.fillRect(0, 0, this.width, this.height);
                }
            }

            // Update fibers
            if (this.frameCount % CONFIG.updateInterval === 0) {
                for (let i = 0; i < this.fibers.length; i++) {
                    const fiber = this.fibers[i];
                    // Find corresponding base point
                    const basePointIndex = Math.floor(i / CONFIG.fibersPerPoint);
                    if (basePointIndex < this.basePoints.length) {
                        fiber.update(this.time, this.basePoints[basePointIndex]);
                    }
                }

                // Update jet bundles
                if (this.frameCount % (CONFIG.updateInterval * 3) === 0) {
                    for (let i = 0; i < this.jetBundles.length; i++) {
                        const jetBundle = this.jetBundles[i];
                        const basePointIndex = i % this.basePoints.length;
                        if (basePointIndex < this.basePoints.length) {
                            jetBundle.update(this.time, this.basePoints[basePointIndex]);
                        }
                    }
                }

                // Generate new fibers periodically (perpetual exploration)
                if (this.frameCount % (CONFIG.updateInterval * 5) === 0) {
                    // Remove some old fibers and add new ones
                    this.cleanup();
                    // Add new fibers if we're below max
                    if (this.fibers.length < CONFIG.maxFibers) {
                        this.generateFibers();
                    }
                }
            }

            // Cleanup periodically
            if (this.frameCount % CONFIG.cleanupInterval === 0) {
                this.cleanup();
            }

            // Draw base points AFTER fibers so they appear on top (at intersection)
            // This will be done at the end

            // Draw fibers
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

            // Draw base points LAST so they appear on top at fiber intersections
            for (const basePoint of this.basePoints) {
                this.drawBasePoint(basePoint);
            }

            // Debug log occasionally
            if (this.frameCount % 180 === 0) {
                console.log('Manifold: Stats', {
                    frame: this.frameCount,
                    fibers: this.fibers.length,
                    jets: this.jetBundles.length,
                    basePoints: this.basePoints.map(p => ({ x: p.x.toFixed(1), y: p.y.toFixed(1) })),
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

    // Initialize
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

                const canvas = document.createElement('canvas');
                canvas.id = 'manifold-background';
                canvas.setAttribute('style', `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 0;
                    pointer-events: none;
                    opacity: 0.6;
                    background: transparent;
                    display: block;
                    visibility: visible;
                `);

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

                console.log('Manifold: Canvas created');

                const manifold = new ImprovedManifoldBackground(canvas);
                console.log('Manifold: Initialized with', {
                    basePoints: manifold.basePoints.length,
                    initialFibers: manifold.fibers.length,
                    width: manifold.width,
                    height: manifold.height
                });

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
