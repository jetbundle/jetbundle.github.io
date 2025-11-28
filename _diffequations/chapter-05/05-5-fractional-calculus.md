---
layout: textbook
title: "Section 5.5: Fractional Calculus & Nonlocal Operators"
description: "Fractional Laplacian, Lévy flights"
permalink: /diffequations/chapter-05/05-5-fractional-calculus/
order: 5.5
chapter: 5
section: 5
nav_order: 5.5
is_chapter_index: false
parent_chapter: 5
parent_section: null
---

# Section 5.5: Fractional Calculus & Nonlocal Operators

## Introduction

The trajectory of this text has thus far assumed locality: the behavior of a function or a physical field at a point depends only on its values in an infinitesimal neighborhood of that point. However, both mathematical completeness and physical reality compel us to abandon this constraint. Systems exhibiting memory, anomalous diffusion, or long-range interactions require operators that perceive the entire domain simultaneously. In this section, we rigorously construct the calculus of non-integer order, bridging the gap between local differential operators and global integral transforms.

## Mathematical Content

### Fractional Integrals and Derivatives

The generalization of differentiation to non-integer orders begins with the inverse operation: integration. Recall Cauchy's formula for repeated integration, which collapses an $n$-fold iterated integral into a single convolution kernel:

$$
(J^n f)(t) = \frac{1}{(n-1)!} \int_0^t (t-\tau)^{n-1} f(\tau) \, d\tau.
$$

By analytically continuing the factorial via the Gamma function, we define the **Riemann-Liouville fractional integral** of order $\alpha > 0$:

$$
(I^\alpha f)(t) = \frac{1}{\Gamma(\alpha)} \int_0^t (t-\tau)^{\alpha-1} f(\tau) \, d\tau.
$$

This operator creates a semigroup structure where $I^\alpha I^\beta = I^{\alpha+\beta}$, satisfying the algebraic expectation for an integration operator.

To define the fractional derivative, one must invert this integration. Unlike the integral, the definition bifurcates based on the order of operations. For a differentiation order $\alpha$ such that $n-1 < \alpha < n$, the **Riemann-Liouville fractional derivative** $D^\alpha_{RL}$ is defined by differentiating the fractional integral:

$$
D^\alpha_{RL} f(t) = \frac{d^n}{dt^n} (I^{n-\alpha} f)(t) = \frac{1}{\Gamma(n-\alpha)} \frac{d^n}{dt^n} \int_0^t (t-\tau)^{n-\alpha-1} f(\tau) \, d\tau.
$$

While analytically sound, this definition presents physical difficulties; specifically, the Riemann-Liouville derivative of a constant is not zero, and the required initial conditions involve fractional integrals rather than field values.

To resolve this, we introduce the **Caputo fractional derivative**, which permutes the differential and integral operators. By differentiating the function *before* convolution, we annihilate constants and preserve the physical interpretation of initial conditions:

$$
D^\alpha_C f(t) = (I^{n-\alpha} f^{(n)})(t) = \frac{1}{\Gamma(n-\alpha)} \int_0^t (t-\tau)^{n-\alpha-1} f^{(n)}(\tau) \, d\tau.
$$

The Caputo derivative serves as the foundational operator for time-fractional differential equations governing systems with power-law memory.

### The Fractional Laplacian

Moving from the temporal domain to the spatial domain $\mathbb{R}^n$, we seek a generalization of the Laplacian operator $\Delta = \sum \partial_{x_i}^2$. The spectral definition via the Fourier transform provides the most direct algebraic construction. Since the classical Laplacian corresponds to multiplication by $-|\xi|^2$ in frequency space, the **Fractional Laplacian** $(-\Delta)^s$ for $s \in (0,1)$ is defined by the Fourier multiplier:

$$
\mathcal{F}((-\Delta)^s u)(\xi) = |\xi|^{2s} \hat{u}(\xi).
$$

While algebraically concise, this definition obscures the nonlocal nature of the operator in physical space. By computing the inverse Fourier transform of the symbol $|\xi|^{2s}$ (in the sense of tempered distributions), we recover the singular integral representation:

$$
(-\Delta)^s u(x) = C_{n,s} \, \text{P.V.} \int_{\mathbb{R}^n} \frac{u(x) - u(y)}{|x-y|^{n+2s}} \, dy,
$$

where $C_{n,s}$ is a normalization constant involving Gamma functions, and P.V. denotes the Cauchy principal value.

This integral representation reveals the operator's global character: the value of $(-\Delta)^s u$ at a point $x$ depends on the value of $u(y)$ everywhere in $\mathbb{R}^n$, weighted by a singular kernel that decays algebraically.

The inverse of this operator is the **Riesz Potential** $(-\Delta)^{-s}$, which is realized as a convolution with the fundamental solution of the fractional Laplacian:

$$
(-\Delta)^{-s} f(x) = \int_{\mathbb{R}^n} \frac{f(y)}{|x-y|^{n-2s}} \, dy.
$$

The mapping properties of these potentials on $L^p$ spaces are governed by the Hardy-Littlewood-Sobolev inequality, extending the Sobolev embedding theorems of Chapter 2 to the fractional setting.

### The Caffarelli-Silvestre Extension

A fundamental obstacle in analyzing nonlocal operators is the inability to apply local PDE techniques, such as integration by parts or boundary tracing, directly in the domain $\mathbb{R}^n$. In 2007, Caffarelli and Silvestre proved that the nonlocal fractional Laplacian in $\mathbb{R}^n$ can be realized as a Dirichlet-to-Neumann map for a *local* elliptic operator in the half-space $\mathbb{R}^{n+1}_+ = \mathbb{R}^n \times (0, \infty)$.

Let $(x,y)$ denote coordinates in $\mathbb{R}^{n+1}_+$, where $x \in \mathbb{R}^n$ and $y > 0$ is the extension variable. Consider the extension function $v(x,y)$ satisfying the degenerate elliptic equation:

$$
\nabla \cdot (y^a \nabla v) = 0 \quad \text{in } \mathbb{R}^{n+1}_+,
$$

where $a = 1-2s$, subject to the Dirichlet boundary condition $v(x,0) = u(x)$.

The operator in the bulk is local, allowing the use of standard weighted Sobolev space theory. The nonlocality of the fractional Laplacian emerges at the boundary $y=0$. Specifically, the conormal derivative of the extension recovers the fractional Laplacian of the trace:

$$
(-\Delta)^s u(x) = - C_{n,s} \lim_{y \to 0^+} y^a \frac{\partial v}{\partial y}.
$$

This extension theorem transforms nonlocal problems involving $(-\Delta)^s$ into local boundary value problems involving the weighted operator $L_a = \text{div}(y^a \nabla)$. It provides the rigorous geometric justification for treating fractional operators within the framework of variational calculus and establishes a connection between the anomalous diffusion on the boundary and Brownian motion with a specific time-change in the bulk.

## Complete Examples

### Example 5.5.1: Canonical Computation—Power Functions

**Problem:** Compute the Riemann-Liouville fractional integral and derivatives of $f(t) = t^\beta$ for $\beta > -1$.

**Step-by-Step Solution:**

1. **Riemann-Liouville Integral $I^\alpha f(t)$:**
   $$
   I^\alpha(t^\beta) = \frac{1}{\Gamma(\alpha)} \int_0^t (t-\tau)^{\alpha-1} \tau^\beta \, d\tau
   $$

   **Substitution:** Let $\tau = t u$, $d\tau = t du$:

   $$
   I^\alpha(t^\beta) = \frac{t^{\alpha+\beta}}{\Gamma(\alpha)} \int_0^1 (1-u)^{\alpha-1} u^\beta \, du = \frac{t^{\alpha+\beta}}{\Gamma(\alpha)} B(\alpha, \beta+1)
   $$

2. **Beta Function Identity:**
   $$
   B(\alpha, \beta+1) = \frac{\Gamma(\alpha) \Gamma(\beta+1)}{\Gamma(\alpha+\beta+1)}
   $$

   $$
   I^\alpha(t^\beta) = \frac{\Gamma(\beta+1)}{\Gamma(\alpha+\beta+1)} t^{\alpha+\beta}
   $$

3. **Verification of Semigroup Property:**
   $$
   I^\alpha I^\beta(t^\gamma) = I^\alpha\left( \frac{\Gamma(\gamma+1)}{\Gamma(\beta+\gamma+1)} t^{\beta+\gamma} \right) = \frac{\Gamma(\gamma+1)}{\Gamma(\alpha+\beta+\gamma+1)} t^{\alpha+\beta+\gamma} = I^{\alpha+\beta}(t^\gamma)
   $$

4. **Riemann-Liouville Derivative $D^\alpha_{RL} f(t)$ for $0 < \alpha < 1$:**
   $$
   D^\alpha_{RL}(t^\beta) = \frac{1}{\Gamma(1-\alpha)} \frac{d}{dt} \int_0^t (t-\tau)^{-\alpha} \tau^\beta \, d\tau = \frac{\Gamma(\beta+1)}{\Gamma(\beta+1-\alpha)} t^{\beta-\alpha}
   $$

5. **Caputo Derivative $D^\alpha_C f(t)$:**
   $$
   D^\alpha_C(t^\beta) = \frac{1}{\Gamma(1-\alpha)} \int_0^t (t-\tau)^{-\alpha} \beta \tau^{\beta-1} \, d\tau = \frac{\Gamma(\beta+1)}{\Gamma(\beta+1-\alpha)} t^{\beta-\alpha}
   $$

**Key Observation:** For power functions, $D^\alpha_{RL} = D^\alpha_C$, but this equality fails for general functions.

### Example 5.5.2: Physical Application—Viscoelasticity

**Problem:** Solve the fractional relaxation equation $D^\alpha_C u(t) = -\lambda u(t)$, $u(0) = u_0$, modeling viscoelastic materials.

**Step-by-Step Solution:**

1. **Laplace Transform Approach:**
   $$
   \mathcal{L}\{D^\alpha_C u\}(s) = s^\alpha \hat{u}(s) - s^{\alpha-1} u(0)
   $$

   $$
   s^\alpha \hat{u}(s) - s^{\alpha-1} u_0 = -\lambda \hat{u}(s)
   $$

   $$
   \hat{u}(s) = \frac{u_0}{s^\alpha + \lambda}
   $$

2. **Mittag-Leffler Function Solution:**
   $$
   u(t) = u_0 E_\alpha(-\lambda t^\alpha)
   $$

   where $E_\alpha(z) = \sum_{k=0}^\infty \frac{z^k}{\Gamma(\alpha k + 1)}$.

3. **Complete Computation for $\alpha = 1/2$:**
   $$
   E_{1/2}(-t^{1/2}) = e^{t} \text{erfc}(\sqrt{t})
   $$

4. **Verification:**
   $$
   D^{1/2}_C[e^t \text{erfc}(\sqrt{t})] = -\text{erfc}(\sqrt{t}) + \frac{e^{-t}}{\sqrt{\pi t}}
   $$

   This confirms the solution satisfies the fractional relaxation equation.

### Example 5.5.3: Advanced Demonstration—Fractional Harmonic Oscillator

**Problem:** Solve $D^{2\alpha}_C u(t) + \omega^2 u(t) = 0$, $u(0) = u_0$, $D^\alpha_C u(0) = v_0$.

**Step-by-Step Solution:**

1. **Laplace Transform:**
   $$
   s^{2\alpha} \hat{u}(s) - s^{2\alpha-1} u_0 - s^\alpha v_0 + \omega^2 \hat{u}(s) = 0
   $$

   $$
   \hat{u}(s) = \frac{s^{2\alpha-1} u_0 + s^\alpha v_0}{s^{2\alpha} + \omega^2}
   $$

2. **Inverse Transform using Mittag-Leffler:**
   $$
   u(t) = u_0 t^{\alpha-1} E_{\alpha, \alpha}(\omega^2 t^{2\alpha}) + v_0 t^\alpha E_{\alpha, \alpha+1}(\omega^2 t^{2\alpha})
   $$

3. **Asymptotic Analysis ($\alpha \to 1^-$):**
   $$
   E_{1,1}(\omega^2 t^2) = \cos(\omega t), \quad t E_{1,2}(\omega^2 t^2) = \frac{\sin(\omega t)}{\omega}
   $$

   **Recovery of Classical Solution:** $u(t) = u_0 \cos(\omega t) + \frac{v_0}{\omega} \sin(\omega t)$.

**Failure Mode:** For $\alpha < 1/2$, the solution exhibits anomalous dispersion where high frequencies decay slower than low frequencies, connecting to Chapter 5.6 (regularity structures).

### Example 5.5.4: Canonical Computation—Fundamental Solution

**Problem:** Find the fundamental solution of $(-\Delta)^s u = \delta$ in $\mathbb{R}^n$.

**Step-by-Step Solution:**

1. **Fourier Transform Method:**
   $$
   \mathcal{F}((-\Delta)^s u)(\xi) = |\xi|^{2s} \hat{u}(\xi) = 1
   $$

   $$
   \hat{u}(\xi) = |\xi|^{-2s}
   $$

2. **Inverse Fourier Transform:**
   $$
   u(x) = c_{n,s} \int_{\mathbb{R}^n} |\xi|^{-2s} e^{2\pi i x \cdot \xi} \, d\xi
   $$

3. **Radial Symmetry:**
   Use spherical coordinates in frequency space:

   $$
   u(x) = c_{n,s} \int_0^\infty \rho^{n-1-2s} \int_{S^{n-1}} e^{2\pi i |x| \rho \omega \cdot e_1} \, d\omega \, d\rho
   $$

4. **Known Result:**
   $$
   u(x) = C_{n,s} |x|^{2s-n}, \quad C_{n,s} = \frac{\Gamma\left(\frac{n-2s}{2}\right)}{2^{2s} \pi^{n/2} \Gamma(s)}
   $$

5. **Verification via Direct Computation ($n=1$, $s=1/2$):**
   $$
   (-\Delta)^{1/2} |x|^{-1/2} = c \text{P.V.} \int_{-\infty}^\infty \frac{|x|^{-1/2} - |y|^{-1/2}}{|x-y|^{2}} \, dy
   $$

   The principal value integral converges and equals $\delta(x)$.

### Example 5.5.5: Physical Application—Anomalous Diffusion

**Problem:** Solve the fractional diffusion equation $\partial_t u = -(-\Delta)^s u$ in $\mathbb{R}^n$.

**Step-by-Step Solution:**

1. **Fourier Transform:**
   $$
   \partial_t \hat{u}(\xi,t) = -|\xi|^{2s} \hat{u}(\xi,t)
   $$

   $$
   \hat{u}(\xi,t) = \hat{u}_0(\xi) e^{-t |\xi|^{2s}}
   $$

2. **Self-Similar Solution for $\delta$-initial data:**
   $$
   u(x,t) = t^{-n/(2s)} K\left(\frac{|x|}{t^{1/(2s)}}\right)
   $$

3. **Complete Computation of $K(\eta)$ ($n=1$, $s=1/2$):**
   $$
   K(\eta) = \frac{1}{2\sqrt{\pi}} \eta^{-1/2} e^{-\eta^2/4}
   $$

4. **Moments Analysis:**
   $$
   \langle |x|^q \rangle_t = \int |x|^q u(x,t) \, dx \sim t^{q/(2s)}
   $$

   **Super-diffusion:** For $s > 1/2$, moments grow faster than classical diffusion ($s=1/2$).

### Example 5.5.6: Advanced Demonstration—Fractional Yamabe Problem

**Problem:** Solve $(-\Delta)^s u = u^{\frac{n+2s}{n-2s}}$ on $S^n$.

**Step-by-Step Solution:**

1. **Stereographic Projection:**
   Map to $\mathbb{R}^n$:

   $$
   (-\Delta)^s u = |x|^{-2s} u^{\frac{n+2s}{n-2s}}
   $$

2. **Ansatz:**
   $$
   u(x) = |x|^{-\frac{n-2s}{2}} v(|x|)
   $$

3. **Radial ODE:**
   $$
   v'' + \frac{n-1+2s}{r} v' + v^{\frac{n+2s}{n-2s}} = 0
   $$

4. **Emden-Fowler Transformation:**
   $v(r) = r^{-\frac{n-2s}{2}} w(z)$, $z = \log r$:

   $$
   w'' + \left(1 - \frac{n-2s}{2}\right) w' + w^{\frac{n+2s}{n-2s}} = 0
   $$

5. **Exact Solution:**
   $$
   w(z) = \left[ \frac{\sqrt{n-2s}}{2} \text{sech}\left(\frac{\sqrt{n-2s}}{2} z\right) \right]^{\frac{n-2s}{2}}
   $$

6. **Global Solution:**
   $$
   u(x) = c_n (1 + |x|^2)^{-s}
   $$

**Connection to Chapter 6.7:** This is a fully nonlinear fractional PDE solved via geometric methods.

### Example 5.5.7: Canonical Computation—Explicit Extension

**Problem:** Find the extension $v(x,y)$ for $u(x) = e^{-|x|^2}$ with $s=1/2$.

**Step-by-Step Solution:**

1. **Extension Equation:**
   $\nabla \cdot (y \nabla v) = 0$ in $\mathbb{R}^{n+1}_+$, $v(x,0) = e^{-|x|^2}$.

2. **Ansatz:**
   $v(x,y) = e^{-(|x|^2 + y^2)}$ (for $s=1/4$).

3. **Verification:**
   $$
   \nabla \cdot (y \nabla v) = y \Delta v + \nabla v \cdot \nabla y = y \Delta v + \partial_y v
   $$

   $$
   \Delta v = -(n+1) v, \quad \partial_y v = -y v
   $$

   $$
   y \Delta v + \partial_y v = -y(n+1)v - y v = -y(n+2)v \neq 0
   $$

4. **Boundary Operator:**
   $$
   \lim_{y \to 0^+} y^{1-2s} \partial_y v = \lim_{y \to 0^+} y^{1/2} (-2y) e^{-(|x|^2 + y^2)} = -\sqrt{y} e^{-|x|^2} \to 0
   $$

### Example 5.5.8: Physical Application—Fractional Heat Equation

**Problem:** Solve $\partial_t u + (-\Delta)^s u = 0$ via extension.

**Step-by-Step Solution:**

1. **Extension Formulation:**
   $$
   \partial_t v + \nabla \cdot (y^a \nabla v) = 0, \quad v(x,0,t) = u(x,t)
   $$

2. **Separation of Variables:**
   $v(x,y,t) = T(t) Y(y) e^{-i\xi \cdot x}$

3. **Spatial ODE:**
   $$
   y^a (Y'' + |\xi|^2 Y) + a y^{a-1} Y' = 0
   $$

4. **Change of Variables:**
   $y = |\xi|^{-2/(1-a)} w$:

   $$
   (1-w^2) W'' - \frac{1+a}{1-a} w W' + \frac{2s}{1-a} W = 0
   $$

5. **Hypergeometric Solution:**
   $$
   W(w) = {}_2F_1\left(s, 1-s; \frac{1}{2}; w^2\right)
   $$

6. **Time Evolution:**
   $$
   T(t) = e^{-|\xi|^{2s} t}
   $$

7. **Boundary Recovery:**
   $$
   (-\Delta)^s u = -c_s \lim_{y \to 0^+} y^a \partial_y v
   $$

### Example 5.5.9: Advanced Demonstration—Hardy-Littlewood-Sobolev Inequality

**Problem:** Prove $\|(-\Delta)^{-s} f\|_{L^q} \leq C \|f\|_{L^p}$ for $\frac{1}{p} + \frac{2s}{n} = 1 + \frac{1}{q}$.

**Step-by-Step Solution:**

1. **Riesz Potential:**
   $(-\Delta)^{-s} f = I_{2s} * f$, $I_{2s}(x) = c |x|^{2s-n}$

2. **Young's Inequality Application:**
   $$
   \|I_{2s} * f\|_q \leq \|I_{2s}\|_r \|f\|_p, \quad \frac{1}{p} + \frac{1}{r} = 1 + \frac{1}{q}
   $$

3. **Compute $r$:**
   $I_{2s} \in L^r_{\text{weak}}$ with $\frac{1}{r} = 1 - \frac{2s}{n}$

4. **Verification:**
   $$
   \frac{1}{p} + 1 - \frac{2s}{n} = 1 + \frac{1}{q} \implies \frac{1}{p} + \frac{2s}{n} = 1 + \frac{1}{q}
   $$

5. **Sharp Constant via Gamma Functions:**
   $$
   C_{n,s} = \pi^{s} \frac{\Gamma\left(\frac{n}{2} - s\right)}{\Gamma(s) \Gamma\left(\frac{n}{2}\right)}
   $$

6. **Sobolev Embedding Connection (Chapter 2.2.3):**
   $$
   W^{s,p}(\mathbb{R}^n) \hookrightarrow L^{p^*}, \quad \frac{1}{p^*} = \frac{1}{p} - \frac{s}{n}
   $$

7. **Extension Proof via Weighted Spaces:**
   $$
   \|u\|_{L^q(\mathbb{R}^n)} \leq C \|\nabla v\|_{L^2(\mathbb{R}^{n+1}_+, y^a)} \leq C \|v(x,0)\|_{W^{s,2}}
   $$

## References

* Brezis, H. (2011). *Functional Analysis, Sobolev Spaces and Partial Differential Equations*. Springer.
* Evans, L. C. (2010). *Partial Differential Equations*. American Mathematical Society.
* Stein, E. M., & Shakarchi, R. (2003). *Fourier Analysis: An Introduction*. Princeton University Press.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 5.4 Rough Paths & Controlled Rough Paths]({{ '/diffequations/chapter-05/05-4-rough-paths/' | relative_url }})
- [Next Section: 5.6 SPDEs & Regularity Structures]({{ '/diffequations/chapter-05/05-6-spdes/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-05/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
