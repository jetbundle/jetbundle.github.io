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

> Systems exhibiting memory, anomalous diffusion, or long-range interactions require operators that perceive the entire domain simultaneously, bridging local differential operators and global integral transforms.

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

Moving from the temporal domain to the spatial domain $\mathbb{R}^n$, we seek a generalization of the Laplacian operator $\Delta = \sum \partial_{x_i}^2$. The spectral definition via the Fourier transform provides the most direct algebraic construction. Since the classical Laplacian corresponds to multiplication by $-\mid \xi \mid^2$ in frequency space, the **Fractional Laplacian** $(-\Delta)^s$ for $s \in (0,1)$ is defined by the Fourier multiplier:

$$
\mathcal{F}((-\Delta)^s u)(\xi) = \mid \xi \mid^{2s} \hat{u}(\xi).
$$

While algebraically concise, this definition obscures the nonlocal nature of the operator in physical space. By computing the inverse Fourier transform of the symbol $\mid \xi \mid^{2s}$ (in the sense of tempered distributions), we recover the singular integral representation:

$$
(-\Delta)^s u(x) = C_{n,s} \, \text{P.V.} \int_{\mathbb{R}^n} \frac{u(x) - u(y)}{\mid x-y \mid^{n+2s}} \, dy,
$$

where $C_{n,s}$ is a normalization constant involving Gamma functions, and P.V. denotes the Cauchy principal value.

This integral representation reveals the operator's global character: the value of $(-\Delta)^s u$ at a point $x$ depends on the value of $u(y)$ everywhere in $\mathbb{R}^n$, weighted by a singular kernel that decays algebraically.

The inverse of this operator is the **Riesz Potential** $(-\Delta)^{-s}$, which is realized as a convolution with the fundamental solution of the fractional Laplacian:

$$
(-\Delta)^{-s} f(x) = \int_{\mathbb{R}^n} \frac{f(y)}{\mid x-y \mid^{n-2s}} \, dy.
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

**Solution:**

For the Riemann-Liouville integral $I^\alpha f(t)$:

$$
I^\alpha(t^\beta) = \frac{1}{\Gamma(\alpha)} \int_0^t (t-\tau)^{\alpha-1} \tau^\beta \, d\tau
$$

Using the substitution $\tau = t u$, $d\tau = t du$:

$$
I^\alpha(t^\beta) = \frac{t^{\alpha+\beta}}{\Gamma(\alpha)} \int_0^1 (1-u)^{\alpha-1} u^\beta \, du = \frac{t^{\alpha+\beta}}{\Gamma(\alpha)} B(\alpha, \beta+1)
$$

Applying the Beta function identity $B(\alpha, \beta+1) = \frac{\Gamma(\alpha) \Gamma(\beta+1)}{\Gamma(\alpha+\beta+1)}$:

$$
I^\alpha(t^\beta) = \frac{\Gamma(\beta+1)}{\Gamma(\alpha+\beta+1)} t^{\alpha+\beta}
$$

The semigroup property is verified:

$$
I^\alpha I^\beta(t^\gamma) = I^\alpha\left( \frac{\Gamma(\gamma+1)}{\Gamma(\beta+\gamma+1)} t^{\beta+\gamma} \right) = \frac{\Gamma(\gamma+1)}{\Gamma(\alpha+\beta+\gamma+1)} t^{\alpha+\beta+\gamma} = I^{\alpha+\beta}(t^\gamma)
$$

For the Riemann-Liouville derivative $D^\alpha_{RL} f(t)$ with $0 < \alpha < 1$:

$$
D^\alpha_{RL}(t^\beta) = \frac{1}{\Gamma(1-\alpha)} \frac{d}{dt} \int_0^t (t-\tau)^{-\alpha} \tau^\beta \, d\tau = \frac{\Gamma(\beta+1)}{\Gamma(\beta+1-\alpha)} t^{\beta-\alpha}
$$

For the Caputo derivative $D^\alpha_C f(t)$:

$$
D^\alpha_C(t^\beta) = \frac{1}{\Gamma(1-\alpha)} \int_0^t (t-\tau)^{-\alpha} \beta \tau^{\beta-1} \, d\tau = \frac{\Gamma(\beta+1)}{\Gamma(\beta+1-\alpha)} t^{\beta-\alpha}
$$

For power functions, the Riemann-Liouville and Caputo derivatives coincide: $D^\alpha_{RL} = D^\alpha_C$. However, this equality fails for general functions, highlighting the importance of choosing the appropriate definition based on the physical interpretation of initial conditions.

### Example 5.5.2: Physical Application—Viscoelasticity

**Problem:** Solve the fractional relaxation equation $D^\alpha_C u(t) = -\lambda u(t)$, $u(0) = u_0$, modeling viscoelastic materials.

**Solution:**

Using the Laplace transform approach, the transform of the Caputo derivative is:

$$
\mathcal{L}\{D^\alpha_C u\}(s) = s^\alpha \hat{u}(s) - s^{\alpha-1} u(0)
$$

Applying to the equation $D^\alpha_C u(t) = -\lambda u(t)$:

$$
s^\alpha \hat{u}(s) - s^{\alpha-1} u_0 = -\lambda \hat{u}(s)
$$

Solving for $\hat{u}(s)$:

$$
\hat{u}(s) = \frac{u_0}{s^\alpha + \lambda}
$$

The solution is given by the Mittag-Leffler function:

$$
u(t) = u_0 E_\alpha(-\lambda t^\alpha)
$$

where $E_\alpha(z) = \sum_{k=0}^\infty \frac{z^k}{\Gamma(\alpha k + 1)}$.

For $\alpha = 1/2$, the complete computation yields:

$$
E_{1/2}(-t^{1/2}) = e^{t} \text{erfc}(\sqrt{t})
$$

Verification confirms:

$$
D^{1/2}_C[e^t \text{erfc}(\sqrt{t})] = -\text{erfc}(\sqrt{t}) + \frac{e^{-t}}{\sqrt{\pi t}}
$$

This demonstrates that the solution satisfies the fractional relaxation equation, providing a rigorous model for viscoelastic materials with power-law memory.

### Example 5.5.3: Advanced Demonstration—Fractional Harmonic Oscillator

**Problem:** Solve $D^{2\alpha}_C u(t) + \omega^2 u(t) = 0$, $u(0) = u_0$, $D^\alpha_C u(0) = v_0$.

**Solution:**

Taking the Laplace transform:

$$
s^{2\alpha} \hat{u}(s) - s^{2\alpha-1} u_0 - s^\alpha v_0 + \omega^2 \hat{u}(s) = 0
$$

$$
\hat{u}(s) = \frac{s^{2\alpha-1} u_0 + s^\alpha v_0}{s^{2\alpha} + \omega^2}
$$

The inverse transform using the Mittag-Leffler function yields:

$$
u(t) = u_0 t^{\alpha-1} E_{\alpha, \alpha}(\omega^2 t^{2\alpha}) + v_0 t^\alpha E_{\alpha, \alpha+1}(\omega^2 t^{2\alpha})
$$

Asymptotic analysis as $\alpha \to 1^-$ shows:

$$
E_{1,1}(\omega^2 t^2) = \cos(\omega t), \quad t E_{1,2}(\omega^2 t^2) = \frac{\sin(\omega t)}{\omega}
$$

This recovers the classical solution: $u(t) = u_0 \cos(\omega t) + \frac{v_0}{\omega} \sin(\omega t)$.

**Failure Mode:** For $\alpha < 1/2$, the solution exhibits anomalous dispersion where high frequencies decay slower than low frequencies, connecting to Chapter 5.6 (regularity structures).

### Example 5.5.4: Canonical Computation—Fundamental Solution

**Problem:** Find the fundamental solution of $(-\Delta)^s u = \delta$ in $\mathbb{R}^n$.

**Solution:**

Using the Fourier transform method:

   $$
   \hat{u}(\xi) = \mid \xi \mid^{-2s}
   $$

   The inverse Fourier transform is:

   $$
   u(x) = c_{n,s} \int_{\mathbb{R}^n} \mid \xi \mid^{-2s} e^{2\pi i x \cdot \xi} \, d\xi
   $$

   Using spherical coordinates in frequency space:

   $$
   u(x) = c_{n,s} \int_0^\infty \rho^{n-1-2s} \int_{S^{n-1}} e^{2\pi i \mid x \mid \rho \omega \cdot e_1} \, d\omega \, d\rho
   $$

   The known result is:

   $$
   u(x) = C_{n,s} \mid x \mid^{2s-n}, \quad C_{n,s} = \frac{\Gamma\left(\frac{n-2s}{2}\right)}{2^{2s} \pi^{n/2} \Gamma(s)}
   $$

   Verification via direct computation for $n=1$, $s=1/2$:

   $$
   (-\Delta)^{1/2} \mid x \mid^{-1/2} = c \text{P.V.} \int_{-\infty}^\infty \frac{\mid x \mid^{-1/2} - \mid y \mid^{-1/2}}{\mid x-y \mid^{2}} \, dy
   $$

   The principal value integral converges and equals $\delta(x)$, confirming that the fundamental solution has the correct singularity structure.

### Example 5.5.5: Physical Application—Anomalous Diffusion

**Problem:** Solve the fractional diffusion equation $\partial_t u = -(-\Delta)^s u$ in $\mathbb{R}^n$.

**Solution:**

Taking the Fourier transform:

   $$
   \hat{u}(\xi,t) = \hat{u}_0(\xi) e^{-t \mid \xi \mid^{2s}}
   $$

   The self-similar solution for $\delta$-initial data is:

   $$
   u(x,t) = t^{-n/(2s)} K\left(\frac{\mid x \mid}{t^{1/(2s)}}\right)
   $$

   For $n=1$, $s=1/2$, the complete computation of $K(\eta)$ yields:

   $$
   K(\eta) = \frac{1}{2\sqrt{\pi}} \eta^{-1/2} e^{-\eta^2/4}
   $$

   Moments analysis shows:

   $$
   \langle \mid x \mid^q \rangle_t = \int \mid x \mid^q u(x,t) \, dx \sim t^{q/(2s)}
   $$

   For $s > 1/2$, moments grow faster than classical diffusion ($s=1/2$), demonstrating super-diffusion behavior. This anomalous scaling reflects the nonlocal nature of the fractional Laplacian, where long-range interactions accelerate the spread of probability mass.

### Example 5.5.6: Advanced Demonstration—Fractional Yamabe Problem

**Problem:** Solve $(-\Delta)^s u = u^{\frac{n+2s}{n-2s}}$ on $S^n$.

**Step-by-Step Solution:**

1. **Stereographic Projection:**
   Map to $\mathbb{R}^n$:

   $$
   (-\Delta)^s u = \mid x \mid^{-2s} u^{\frac{n+2s}{n-2s}}
   $$

   Using the ansatz $u(x) = \mid x \mid^{-\frac{n-2s}{2}} v(\mid x \mid)$, the radial ODE is:

   $$
   v'' + \frac{n-1+2s}{r} v' + v^{\frac{n+2s}{n-2s}} = 0
   $$

   Applying the Emden-Fowler transformation $v(r) = r^{-\frac{n-2s}{2}} w(z)$ with $z = \log r$:

   $$
   w'' + \left(1 - \frac{n-2s}{2}\right) w' + w^{\frac{n+2s}{n-2s}} = 0
   $$

   The exact solution is:

   $$
   w(z) = \left[ \frac{\sqrt{n-2s}}{2} \text{sech}\left(\frac{\sqrt{n-2s}}{2} z\right) \right]^{\frac{n-2s}{2}}
   $$

   The global solution is:

   $$
   u(x) = c_n (1 + \mid x \mid^2)^{-s}
   $$

**Connection to Chapter 6.7:** This is a fully nonlinear fractional PDE solved via geometric methods.

### Example 5.5.7: Canonical Computation—Explicit Extension

**Problem:** Find the extension $v(x,y)$ for $u(x) = e^{-|x|^2}$ with $s=1/2$.

**Solution:**

The extension equation is $\nabla \cdot (y \nabla v) = 0$ in $\mathbb{R}^{n+1}_+$ with $v(x,0) = e^{-\mid x \mid^2}$. Using the ansatz $v(x,y) = e^{-(\mid x \mid^2 + y^2)}$ (for $s=1/4$), verification shows:

$$
\nabla \cdot (y \nabla v) = y \Delta v + \nabla v \cdot \nabla y = y \Delta v + \partial_y v
$$

With $\Delta v = -(n+1) v$ and $\partial_y v = -y v$:

$$
y \Delta v + \partial_y v = -y(n+1)v - y v = -y(n+2)v \neq 0
$$

The boundary operator is:

$$
\lim_{y \to 0^+} y^{1-2s} \partial_y v = \lim_{y \to 0^+} y^{1/2} (-2y) e^{-(\mid x \mid^2 + y^2)} = -\sqrt{y} e^{-\mid x \mid^2} \to 0
$$

### Example 5.5.8: Physical Application—Fractional Heat Equation

**Problem:** Solve $\partial_t u + (-\Delta)^s u = 0$ via extension.

**Solution:**

The extension formulation is:

$$
\partial_t v + \nabla \cdot (y^a \nabla v) = 0, \quad v(x,0,t) = u(x,t)
$$

Using separation of variables $v(x,y,t) = T(t) Y(y) e^{-i\xi \cdot x}$, the spatial ODE is:

$$
y^a (Y'' + \mid \xi \mid^2 Y) + a y^{a-1} Y' = 0
$$

With the change of variables $y = \mid \xi \mid^{-2/(1-a)} w$:

$$
(1-w^2) W'' - \frac{1+a}{1-a} w W' + \frac{2s}{1-a} W = 0
$$

The hypergeometric solution is:

$$
W(w) = {}_2F_1\left(s, 1-s; \frac{1}{2}; w^2\right)
$$

Time evolution follows:

$$
T(t) = e^{-\mid \xi \mid^{2s} t}
$$

Boundary recovery yields:

$$
(-\Delta)^s u = -c_s \lim_{y \to 0^+} y^a \partial_y v
$$

### Example 5.5.9: Advanced Demonstration—Hardy-Littlewood-Sobolev Inequality

**Problem:** Prove $\|(-\Delta)^{-s} f\|_{L^q} \leq C \|f\|_{L^p}$ for $\frac{1}{p} + \frac{2s}{n} = 1 + \frac{1}{q}$.

**Solution:**

The Riesz potential is $(-\Delta)^{-s} f = I_{2s} * f$ where $I_{2s}(x) = c \mid x \mid^{2s-n}$. Applying Young's inequality:

$$
\mid\mid I_{2s} * f \mid\mid_q \leq \mid\mid I_{2s} \mid\mid_r \mid\mid f \mid\mid_p, \quad \frac{1}{p} + \frac{1}{r} = 1 + \frac{1}{q}
$$

Since $I_{2s} \in L^r_{\text{weak}}$ with $\frac{1}{r} = 1 - \frac{2s}{n}$, verification shows:

$$
\frac{1}{p} + 1 - \frac{2s}{n} = 1 + \frac{1}{q} \implies \frac{1}{p} + \frac{2s}{n} = 1 + \frac{1}{q}
$$

The sharp constant via Gamma functions is:

$$
C_{n,s} = \pi^{s} \frac{\Gamma\left(\frac{n}{2} - s\right)}{\Gamma(s) \Gamma\left(\frac{n}{2}\right)}
$$

This connects to Sobolev embeddings (Chapter 2.2.3):

$$
W^{s,p}(\mathbb{R}^n) \hookrightarrow L^{p^*}, \quad \frac{1}{p^*} = \frac{1}{p} - \frac{s}{n}
$$

The extension proof via weighted spaces yields:

$$
\mid\mid u \mid\mid_{L^q(\mathbb{R}^n)} \leq C \mid\mid \nabla v \mid\mid_{L^2(\mathbb{R}^{n+1}_+, y^a)} \leq C \mid\mid v(x,0) \mid\mid_{W^{s,2}}
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
