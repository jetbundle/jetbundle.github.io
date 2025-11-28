---
layout: textbook
title: "Section 1.4: Classical Linear Partial Differential Equations"
description: "Separation of variables, eigenfunction expansions"
permalink: /diffequations/chapter-01/01-4-linear-pde/
order: 1.4
chapter: 1
section: 4
nav_order: 1.4
is_chapter_index: false
parent_chapter: 1
parent_section: null
---

# Section 1.4: Classical Linear Partial Differential Equations

## Introduction

We extend ODE methods to fields. **Separation of Variables** is framed as the simultaneous diagonalization of commuting operators. We demonstrate that the geometry of the domain (sphere, cylinder, box) dictates the choice of special functions. **Eigenfunction Expansions** are constructed, but we highlight the open question: in what metric space does an infinite series of functions converge to a discontinuous boundary condition?

## Mathematical Content

### Classification and Canonical Forms

Consider the second-order linear PDE

$$
A u_{xx}+2B u_{xy}+C u_{yy}+D u_{x}+E u_{y}+F u=G,
$$

with discriminant $\Delta=B^{2}-AC$. The sign of $\Delta$ distinguishes physical regimes (John, 1982):

- **Elliptic ($\Delta<0$)** – e.g., Laplace’s equation $\Delta u=0$, modeling equilibrium and instantaneous smoothing.
- **Parabolic ($\Delta=0$)** – e.g., Heat equation $u_{t}-\Delta u=0$, capturing diffusive dynamics with a causal time arrow.
- **Hyperbolic ($\Delta>0$)** – e.g., Wave equation $u_{tt}-c^{2}\Delta u=0$, describing finite-speed propagation along characteristics.

Characteristic curves satisfy $A(dy)^{2}-2B dx\,dy+C(dx)^{2}=0$. Transforming to characteristic coordinates $(\xi,\eta)$ diagonalizes the principal part, yielding canonical forms such as $u_{\xi\eta}=0$ in the hyperbolic case (Evans, 2010).

### Separation of Variables and Spectral Theory

Symmetric domains admit separated solutions $u(x,t)=X(x)T(t)$. Substitution reduces the PDE to a spatial eigenvalue problem

$$
\mathcal{L}X=\lambda w(x)X,
$$

subject to homogeneous boundary conditions. The Rayleigh quotient

$$
\lambda_{1}=\min_{u\neq 0}\frac{\int_{\Omega}\left|\nabla u\right|^{2}dx}{\int_{\Omega}u^{2}dx}
$$

characterizes the principal eigenvalue (Gilbarg & Trudinger, 2001). Maximum principles imply interior extrema occur on $\partial\Omega$, providing uniqueness and a priori bounds without explicit solutions.

### Fourier Series and Eigenfunction Expansions

Eigenfunctions $\{\phi_{n}\}$ yield superpositions $u(x,t)=\sum_{n}a_{n}(t)\phi_{n}(x)$. Convergence issues arise when reconstructing initial data $f(x)$ from the series $\sum c_{n}\phi_{n}(x)$:

- **Dirichlet’s theorem** gives pointwise convergence for piecewise $C^{1}$ data to $\tfrac{1}{2}(f(x^{+})+f(x^{-}))$.
- **Divergence examples** show continuous functions whose Fourier series diverge at points (Stein & Shakarchi, 2003).
- **Gibbs phenomenon** exhibits persistent overshoot near jumps.

Cesàro summation via the Fejér kernel $F_{N}$ restores uniform convergence for continuous data, foreshadowing mollification and Sobolev-space regularization.

### Method of Characteristics

First-order hyperbolic equations propagate data along characteristic curves. For

$$
u_{t}+a(x,t,u)u_{x}=0,
$$

characteristics satisfy $\frac{dx}{dt}=a$ and $\frac{du}{dt}=0$, yielding $u(x,t)=u_{0}(x-at)$ for constant $a$. Nonlinear velocities $a(u)$ cause characteristic intersection, signaling shock formation and motivating weak/entropy solutions in Chapter 3.

### Spherical Harmonics and Special Coordinates

Solving $\Delta u=0$ in curvilinear coordinates separates the Laplacian into orthogonal pieces:

- In spherical coordinates, the angular part produces spherical harmonics $Y_{\ell}^{m}(\theta,\phi)$ and radial Euler equations with solutions $r^{\ell}$ and $r^{-(\ell+1)}$.
- The addition theorem

  $$
  P_{\ell}(\cos\gamma)=\frac{4\pi}{2\ell+1}\sum_{m=-\ell}^{\ell}Y_{\ell}^{m}(\Omega_{1})\overline{Y_{\ell}^{m}(\Omega_{2})}
  $$

  enables expansions of rotationally invariant potentials (Andrews, Askey, & Roy, 1999).

Spherical and cylindrical coordinates align with domain symmetries, dictating the special functions encountered in separation of variables.

## Connections to Chapter Narrative

Classical PDE methods expose the dependence of explicit solutions on domain geometry and spectral data. Their limitations—convergence failures, shocks, and irregular boundaries—motivate the functional analysis, distribution theory, and geometric frameworks introduced in Chapter 2 and beyond.

## Complete Examples

### Example 1.4.1: Discriminant Classification

**Problem:** Classify $3u_{xx}+4u_{xy}+5u_{yy}=0$.

The discriminant $\Delta=4^{2}-3\cdot 5=1>0$, so the PDE is hyperbolic. Characteristics solve $3(dy)^{2}-4 dx\,dy+5(dx)^{2}=0$, yielding complex slopes $(2\pm i\sqrt{11})/3$. Real canonical coordinates $\xi=x$, $\eta=y-\tfrac{2}{3}x$ reduce the equation to $u_{\xi\xi}-u_{\eta\eta}=0$, revealing wave-like behavior.

### Example 1.4.2: Variable-Coefficient Classification

**Problem:** Determine the type of $x u_{xx}+2u_{xy}+y u_{yy}=0$.

Here $\Delta(x,y)=4-xy$. The equation is elliptic where $xy<4$, parabolic on $xy=4$, and hyperbolic when $xy>4$. The curve $xy=4$ resembles the Tricomi equation, modeling mixed-type phenomena such as transonic flow.

### Example 1.4.3: Canonical Hyperbolic Reduction

**Problem:** Reduce $u_{xx}-3u_{xy}+2u_{yy}=0$.

The discriminant is $\Delta=(-3)^{2}-4\cdot 1\cdot 2=1>0$. Characteristics satisfy $dy/dx=r$ with $r_{1,2}=\{2,1\}$. Coordinates $\xi=y-2x$ and $\eta=y-x$ transform the PDE to $u_{\xi\eta}=0$, leading to $u(x,y)=f(y-2x)+g(y-x)$.

### Example 1.4.4: Heat Equation with Dirichlet Data

**Problem:** Solve $u_{t}=u_{xx}$ on $0<x<\pi$ with $u(0,t)=u(\pi,t)=0$, $u(x,0)=\sin(3x)$.

Separation $u=XT$ gives $X''+\lambda X=0$ with eigenvalues $\lambda_{n}=n^{2}$ and eigenfunctions $\sin(nx)$. The temporal factors are $T_{n}=e^{-n^{2}t}$. Expanding the initial data reveals only $n=3$ is present, so $u(x,t)=e^{-9t}\sin(3x)$.

### Example 1.4.5: Rayleigh Quotient Verification

**Problem:** Verify $\lambda_{1}=1$ for $-u''=\lambda u$ with $u(0)=u(\pi)=0$.

The Rayleigh quotient

$$
R[u]=\frac{\int_{0}^{\pi}(u')^{2}dx}{\int_{0}^{\pi}u^{2}dx}
$$

is minimized by $u=\sin x$, giving $R[\sin x]=1$. Alternative test functions yield $R[u]>1$, confirming the principal eigenvalue.

### Example 1.4.6: Wave Equation with Mixed Boundaries

**Problem:** Solve $u_{tt}=u_{xx}$ on $0<x<\pi$, with $u(0,t)=0$ and $u_{x}(\pi,t)=0$.

Separation imposes $X(0)=0$ and $X'(\pi)=0$, leading to eigenfunctions $\sin\big((2n-1)x/2\big)$ with $\lambda_{n}=\tfrac{(2n-1)^{2}}{4}$. The solution is

$$
u(x,t)=\sum_{n=1}^{\infty}\left(a_{n}\cos\frac{(2n-1)t}{2}+b_{n}\sin\frac{(2n-1)t}{2}\right)\sin\frac{(2n-1)x}{2},
$$

with coefficients fixed by initial data.

### Example 1.4.7: Fourier Series and Gibbs Phenomenon

**Problem:** Expand $f(x)=\operatorname{sgn}(x)$ on $(-\pi,\pi)$.

Only sine terms appear: $f(x)\sim \frac{4}{\pi}\sum_{k=1,3,5,\dots}\frac{\sin(kx)}{k}$. Partial sums overshoot near $x=0$ by approximately $0.08949$ (17.9% of the jump) regardless of how many terms are added—the Gibbs phenomenon—illustrating the limitations of pointwise convergence.

### Example 1.4.8: Cesàro Summability via Fejér Kernel

**Problem:** Show Fejér means converge uniformly for continuous $f$.

Define $\sigma_{N}(f)=\frac{1}{N+1}\sum_{k=0}^{N}S_{k}(f)=f*F_{N}$, where $F_{N}$ is the Fejér kernel. Since $F_{N}\ge 0$, $\int F_{N}=2\pi$, and $F_{N}$ concentrates at $0$, convolution with $F_{N}$ approximates $f$ uniformly by continuity, demonstrating a summability method that bypasses Gibbs oscillations.

### Example 1.4.9: Transport Equation

**Problem:** Solve $u_{t}+3u_{x}=0$ with $u(x,0)=\sin x$.

Characteristics satisfy $x=x_{0}+3t$. Along each, $u$ is constant, so $u(x,t)=\sin(x-3t)$, confirming the transport of initial data without distortion.

### Example 1.4.10: Variable-Coefficient Transport

**Problem:** Solve $u_{t}+(x+t)u_{x}=0$ with $u(x,0)=e^{x}$.

Characteristics solve $\frac{dx}{dt}=x+t$, giving $x+t=Ce^{t}$ and $C=x_{0}$. Along the curve, $u$ remains $e^{x_{0}}$, yielding $u(x,t)=\exp(x e^{-t}+t e^{-t})$ after eliminating $x_{0}$.

### Example 1.4.11: Burgers’ Equation Shock

**Problem:** For $u_{t}+u u_{x}=0$ with $u(x,0)=1-x$, find shock time.

Characteristics satisfy $dx/dt=u=1-x_{0}$, so $x=x_{0}+(1-x_{0})t$. Inverting gives $x_{0}=(x-t)/(1+t)$ and $u=(1+x)/(1+t)$. Since $\partial x/\partial x_{0}=1-(1)t=1-t$ vanishes at $t=1$, characteristics intersect and a shock forms for $t>1$.

### Example 1.4.12: Spherical Harmonics for Laplace’s Equation

**Problem:** Solve $\Delta u=0$ in the unit ball with $u(1,\theta,\phi)=\cos\theta$.

Separation yields radial factors $r^{\ell}$ and angular spherical harmonics $Y_{\ell}^{m}$. The boundary data correspond to $\ell=1$, $m=0$, so $u(r,\theta,\phi)=r Y_{1}^{0}(\theta,\phi)=r\cos\theta$.

### Example 1.4.13: Addition Theorem Check

**Problem:** Verify the addition theorem for $\ell=1$.

Using explicit forms of $Y_{1}^{m}$, one obtains

$$
\cos\gamma=\frac{4\pi}{3}\sum_{m=-1}^{1}Y_{1}^{m}(\Omega_{1})\overline{Y_{1}^{m}(\Omega_{2})},
$$

where $\gamma$ is the angle between $\Omega_{1}$ and $\Omega_{2}$. This identity underpins expansions of rotationally symmetric kernels.

### Example 1.4.14: Exterior Harmonic Potential via Spherical Harmonics

**Problem:** Solve $\Delta u=0$ for $r>1$ with $u(1,\theta,\phi)=\cos^{3}\theta$.

Using $\cos^{3}\theta=\tfrac{3}{4}\cos\theta+\tfrac{1}{4}\cos 3\theta$ and expanding in $Y_{\ell}^{0}$, the exterior solution becomes

$$
u(r,\theta,\phi)=\frac{1}{3}r^{-2}Y_{1}^{0}(\theta,\phi)+\frac{1}{15}r^{-4}Y_{3}^{0}(\theta,\phi),
$$

illustrating how spherical harmonics encode boundary data.

## References

* Andrews, G. E., Askey, R., & Roy, R. (1999). *Special Functions*. Cambridge University Press.
* Evans, L. C. (2010). *Partial Differential Equations*. American Mathematical Society.
* Gilbarg, D., & Trudinger, N. S. (2001). *Elliptic Partial Differential Equations of Second Order*. Springer.
* John, F. (1982). *Partial Differential Equations*. Springer-Verlag.
* Stein, E. M., & Shakarchi, R. (2003). *Fourier Analysis: An Introduction*. Princeton University Press.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 1.3 Integral Transforms]({{ '/diffequations/chapter-01/01-3-integral-transforms/' | relative_url }})
- [Next Section: 1.5 Asymptotic Analysis]({{ '/diffequations/chapter-01/01-5-asymptotic-analysis/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-01/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
