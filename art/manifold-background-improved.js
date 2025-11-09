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
        fibersPerPoint: 3,        // More fibers for better visualization
        maxFiberLength: 120,
        fiberStepSize: 1.2,
        fiberThickness: 0.7,
        
        // Stochastic motion parameters
        brownianScale: 0.8,       // Scale of Brownian motion
        brownianSpeed: 0.15,      // Speed of exploration
        boundaryReflection: 0.95, // Boundary reflection coefficient
        
        // Animation parameters
        animationSpeed: 0.002,
        noiseScale: 0.015,
        
        // Visual parameters
        opacityDecay: 0.97,
        baseOpacity: 0.18,
        
        // Color scheme (gauge theme)
        colors: {
            orange: { r: 255, g: 107, b: 53 },
            blue: { r: 14, g: 165, b: 233 },
            dark: { r: 11, g: 14, b: 23 },
            dark2: { r: 10, g: 13, b: 20 }
        },
        
        // Performance and memory
        maxFibers: 30,
        updateInterval: 3,
        fadeOutSpeed: 0.985,
        maxPointsPerFiber: 70,
        cleanupInterval: 300,     // Cleanup every N frames
        maxFiberAge: 600,         // Max age in frames before cleanup
        viewportMargin: 200       // Margin for visibility check
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
            const colorChoice = this.id % 2;
            return colorChoice === 0 ? CONFIG.colors.orange : CONFIG.colors.blue;
        }

        generatePoints() {
            this.points = [];
            let x = this.basePoint.x;
            let y = this.basePoint.y;
            let angle = this.direction;
            let length = 0;
            const maxPoints = CONFIG.maxPointsPerFiber;

            // Improved parallel transport simulation
            while (length < this.maxLength && this.points.length < maxPoints) {
                this.points.push({ x, y, opacity: this.opacity, angle });

                // Improved connection form (more accurate)
                // Connection coefficient from noise (simulates ω = A dx + B dy)
                const connectionX = (this.noiseGen.noise(
                    x * CONFIG.noiseScale + this.time,
                    y * CONFIG.noiseScale + this.time
                ) - 0.5) * 2;
                
                const connectionY = (this.noiseGen.noise(
                    x * CONFIG.noiseScale + this.time + 100,
                    y * CONFIG.noiseScale + this.time + 100
                ) - 0.5) * 2;

                // Parallel transport equation: dθ/dt = -Γ(θ, v)
                // Simplified: angle change based on connection
                const curvature = (connectionX + connectionY) * 0.5;
                angle += curvature * Math.PI * 0.2;

                // Step along fiber (geodesic)
                const stepSize = CONFIG.fiberStepSize;
                x += Math.cos(angle) * stepSize;
                y += Math.sin(angle) * stepSize;
                length += stepSize;

                // Opacity decay
                this.opacity *= CONFIG.opacityDecay;
                if (this.opacity < 0.01) break;
            }

            this.length = length;
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
            for (let i = 0; i < numJets; i++) {
                const angle = (Math.PI * 2 * i) / numJets + Math.random() * 0.3;
                const jet = {
                    points: [],
                    color: i % 2 === 0 ? CONFIG.colors.orange : CONFIG.colors.blue,
                    opacity: CONFIG.baseOpacity * 0.5,
                    length: CONFIG.maxFiberLength * 0.35
                };

                let x = this.basePoint.x;
                let y = this.basePoint.y;
                let currentAngle = angle;
                let length = 0;
                const maxPoints = 45;

                // Higher-order jet (more curvature)
                while (length < jet.length && jet.points.length < maxPoints) {
                    jet.points.push({ x, y, opacity: jet.opacity });

                    // Higher curvature for jets (represents derivatives)
                    const noiseValue1 = this.noiseGen.noise(
                        x * CONFIG.noiseScale * 2 + this.time,
                        y * CONFIG.noiseScale * 2 + this.time
                    );
                    const noiseValue2 = this.noiseGen.noise(
                        x * CONFIG.noiseScale * 2 + this.time + 50,
                        y * CONFIG.noiseScale * 2 + this.time + 50
                    );
                    const curvature = (noiseValue1 + noiseValue2 - 1) * Math.PI * 0.5;
                    currentAngle += curvature;

                    const stepSize = CONFIG.fiberStepSize * 0.65;
                    x += Math.cos(currentAngle) * stepSize;
                    y += Math.sin(currentAngle) * stepSize;
                    length += stepSize;
                    jet.opacity *= 0.93;

                    if (jet.opacity < 0.01) break;
                }

                this.jets.push(jet);
            }
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
            const color = fiber.color;
            const points = fiber.points;

            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);

            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }

            const startOpacity = fiber.opacity;
            const endOpacity = fiber.opacity * Math.pow(CONFIG.opacityDecay, points.length);
            const avgOpacity = Math.max(0.12, (startOpacity + endOpacity) / 2);

            ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${avgOpacity})`;
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

