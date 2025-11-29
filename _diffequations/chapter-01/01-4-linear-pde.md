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

> The geometry of the domain dictates the mathematics: separation of variables succeeds when symmetry allows simultaneous diagonalization of commuting operators.

## Introduction

We extend ODE methods to fields. **Separation of Variables** is framed as the simultaneous diagonalization of commuting operators. We demonstrate that the geometry of the domain (sphere, cylinder, box) dictates the choice of special functions. **Eigenfunction Expansions** are constructed, but we highlight the open question: in what metric space does an infinite series of functions converge to a discontinuous boundary condition?

## Classification and Canonical Forms

Consider the second-order linear PDE

$$
A u_{xx}+2B u_{xy}+C u_{yy}+D u_{x}+E u_{y}+F u=G,
$$

with discriminant $\Delta=B^{2}-AC$. The sign of $\Delta$ distinguishes physical regimes:

- **Elliptic ($\Delta<0$)** – e.g., Laplace's equation $\Delta u=0$, modeling equilibrium and instantaneous smoothing.
- **Parabolic ($\Delta=0$)** – e.g., Heat equation $u_{t}-\Delta u=0$, capturing diffusive dynamics with a causal time arrow.
- **Hyperbolic ($\Delta>0$)** – e.g., Wave equation $u_{tt}-c^{2}\Delta u=0$, describing finite-speed propagation along characteristics.

Characteristic curves satisfy $A(dy)^{2}-2B dx\,dy+C(dx)^{2}=0$. Transforming to characteristic coordinates $(\xi,\eta)$ diagonalizes the principal part, yielding canonical forms such as $u_{\xi\eta}=0$ in the hyperbolic case.

> **Discriminant Classification**

> Classify $3u_{xx}+4u_{xy}+5u_{yy}=0$.

> The discriminant $\Delta=4^{2}-3\cdot 5=1>0$, so the PDE is hyperbolic. Characteristics solve $3(dy)^{2}-4 dx\,dy+5(dx)^{2}=0$, yielding complex slopes $(2\pm i\sqrt{11})/3$. Real canonical coordinates $\xi=x$, $\eta=y-\tfrac{2}{3}x$ reduce the equation to $u_{\xi\xi}-u_{\eta\eta}=0$, revealing wave-like behavior.

> **Variable-Coefficient Classification**

> Determine the type of $x u_{xx}+2u_{xy}+y u_{yy}=0$.

> Here $\Delta(x,y)=4-xy$. The equation is elliptic where $xy<4$, parabolic on $xy=4$, and hyperbolic when $xy>4$. The curve $xy=4$ resembles the Tricomi equation, modeling mixed-type phenomena such as transonic flow.

Classification determines the fundamental character of the PDE: elliptic equations smooth data instantaneously, parabolic equations diffuse over time, and hyperbolic equations propagate along characteristics. However, variable coefficients can create mixed-type regions, revealing the limitations of this classification.

> **Canonical Hyperbolic Reduction**

> Reduce $u_{xx}-3u_{xy}+2u_{yy}=0$.

> The discriminant is $\Delta=(-3)^{2}-4\cdot 1\cdot 2=1>0$. Characteristics satisfy $dy/dx=r$ with $r_{1,2}=\{2,1\}$. Coordinates $\xi=y-2x$ and $\eta=y-x$ transform the PDE to $u_{\xi\eta}=0$, leading to $u(x,y)=f(y-2x)+g(y-x)$.

The general solution is a superposition of arbitrary functions of the characteristic coordinates. This d'Alembert representation is fundamental to understanding wave propagation.

## Separation of Variables and Spectral Theory

Symmetric domains admit separated solutions $u(x,t)=X(x)T(t)$. Substitution reduces the PDE to a spatial eigenvalue problem

$$
\mathcal{L}X=\lambda w(x)X,
$$

subject to homogeneous boundary conditions. The Rayleigh quotient

$$
\lambda_{1}=\min_{u\neq 0}\frac{\int_{\Omega}\mid \nabla u \mid^{2}dx}{\int_{\Omega}u^{2}dx}
$$

characterizes the principal eigenvalue. Maximum principles imply interior extrema occur on $\partial\Omega$, providing uniqueness and a priori bounds without explicit solutions.

> **Heat Equation with Dirichlet Data**

> Solve $u_{t}=u_{xx}$ on $0<x<\pi$ with $u(0,t)=u(\pi,t)=0$, $u(x,0)=\sin(3x)$.

> Separation $u=XT$ gives $X''+\lambda X=0$ with eigenvalues $\lambda_{n}=n^{2}$ and eigenfunctions $\sin(nx)$. The temporal factors are $T_{n}=e^{-n^{2}t}$. Expanding the initial data reveals only $n=3$ is present, so $u(x,t)=e^{-9t}\sin(3x)$.

> **Rayleigh Quotient Verification**

> Verify $\lambda_{1}=1$ for $-u''=\lambda u$ with $u(0)=u(\pi)=0$.

> The Rayleigh quotient

> $$
> R[u]=\frac{\int_{0}^{\pi}(u')^{2}dx}{\int_{0}^{\pi}u^{2}dx}
> $$

> is minimized by $u=\sin x$, giving $R[\sin x]=1$. Alternative test functions yield $R[u]>1$, confirming the principal eigenvalue.

Separation of variables reduces the PDE to an eigenvalue problem, with each eigenmode evolving independently. The Rayleigh quotient provides a variational characterization of eigenvalues without solving the differential equation explicitly.

> **Wave Equation with Mixed Boundaries**

> Solve $u_{tt}=u_{xx}$ on $0<x<\pi$, with $u(0,t)=0$ and $u_{x}(\pi,t)=0$.

> Separation imposes $X(0)=0$ and $X'(\pi)=0$, leading to eigenfunctions $\sin\left((2n-1)x/2\right)$ with $\lambda_{n}=\tfrac{(2n-1)^{2}}{4}$. The solution is

> $$
> u(x,t)=\sum_{n=1}^{\infty}\left(a_{n}\cos\frac{(2n-1)t}{2}+b_{n}\sin\frac{(2n-1)t}{2}\right)\sin\frac{(2n-1)x}{2},
> $$

> with coefficients fixed by initial data.

Mixed boundary conditions produce different eigenfunctions and eigenvalues. The solution is a superposition of standing waves, each oscillating at its characteristic frequency.

## Fourier Series and Eigenfunction Expansions

Eigenfunctions $\{\phi_{n}\}$ yield superpositions $u(x,t)=\sum_{n}a_{n}(t)\phi_{n}(x)$. Convergence issues arise when reconstructing initial data $f(x)$ from the series $\sum c_{n}\phi_{n}(x)$:

- **Dirichlet's theorem** gives pointwise convergence for piecewise $C^{1}$ data to $\tfrac{1}{2}(f(x^{+})+f(x^{-}))$.
- **Divergence examples** show continuous functions whose Fourier series diverge at points.
- **Gibbs phenomenon** exhibits persistent overshoot near jumps.

Cesàro summation via the Fejér kernel $F_{N}$ restores uniform convergence for continuous data, foreshadowing mollification and Sobolev-space regularization.

> **Fourier Series and Gibbs Phenomenon**

> Expand $f(x)=\operatorname{sgn}(x)$ on $(-\pi,\pi)$.

> Only sine terms appear: $f(x)\sim \frac{4}{\pi}\sum_{k=1,3,5,\dots}\frac{\sin(kx)}{k}$. Partial sums overshoot near $x=0$ by approximately $0.08949$ (17.9% of the jump) regardless of how many terms are added—the Gibbs phenomenon—illustrating the limitations of pointwise convergence.

> **Cesàro Summability via Fejér Kernel**

> Show Fejér means converge uniformly for continuous $f$.

> Define $\sigma_{N}(f)=\frac{1}{N+1}\sum_{k=0}^{N}S_{k}(f)=f*F_{N}$, where $F_{N}$ is the Fejér kernel. Since $F_{N}\ge 0$, $\int F_{N}=2\pi$, and $F_{N}$ concentrates at $0$, convolution with $F_{N}$ approximates $f$ uniformly by continuity, demonstrating a summability method that bypasses Gibbs oscillations.

Pointwise convergence is fragile: even continuous functions can have divergent Fourier series. Cesàro summation provides a more robust convergence method, but it requires modifying the partial sums, revealing that the standard Fourier expansion is fundamentally a limit in $L^2$, not pointwise.

## Method of Characteristics

First-order hyperbolic equations propagate data along characteristic curves. For

$$
u_{t}+a(x,t,u)u_{x}=0,
$$

characteristics satisfy $\frac{dx}{dt}=a$ and $\frac{du}{dt}=0$, yielding $u(x,t)=u_{0}(x-at)$ for constant $a$. Nonlinear velocities $a(u)$ cause characteristic intersection, signaling shock formation and motivating weak/entropy solutions in Chapter 3.

> **Transport Equation**

> Solve $u_{t}+3u_{x}=0$ with $u(x,0)=\sin x$.

> Characteristics satisfy $x=x_{0}+3t$. Along each, $u$ is constant, so $u(x,t)=\sin(x-3t)$, confirming the transport of initial data without distortion.

> **Variable-Coefficient Transport**

> Solve $u_{t}+(x+t)u_{x}=0$ with $u(x,0)=e^{x}$.

> Characteristics solve $\frac{dx}{dt}=x+t$, giving $x+t=Ce^{t}$ and $C=x_{0}$. Along the curve, $u$ remains $e^{x_{0}}$, yielding $u(x,t)=\exp(x e^{-t}+t e^{-t})$ after eliminating $x_{0}$.

Characteristics represent paths along which information propagates. For constant coefficients, the solution is simply the initial data translated. Variable coefficients create more complex trajectories, but the solution remains constant along each characteristic curve.

> **Burgers' Equation Shock**

> For $u_{t}+u u_{x}=0$ with $u(x,0)=1-x$, find shock time.

> Characteristics satisfy $dx/dt=u=1-x_{0}$, so $x=x_{0}+(1-x_{0})t$. Inverting gives $x_{0}=(x-t)/(1+t)$ and $u=(1+x)/(1+t)$. Since $\partial x/\partial x_{0}=1-t$ vanishes at $t=1$, characteristics intersect and a shock forms for $t>1$.

Nonlinearity causes characteristics to intersect, creating shocks where the classical solution breaks down. This fundamental limitation motivates the weak solution framework of Chapter 3.

## Spherical Harmonics and Special Coordinates

Solving $\Delta u=0$ in curvilinear coordinates separates the Laplacian into orthogonal pieces:

- In spherical coordinates, the angular part produces spherical harmonics $Y_{\ell}^{m}(\theta,\phi)$ and radial Euler equations with solutions $r^{\ell}$ and $r^{-(\ell+1)}$.
- The addition theorem

  $$
  P_{\ell}(\cos\gamma)=\frac{4\pi}{2\ell+1}\sum_{m=-\ell}^{\ell}Y_{\ell}^{m}(\Omega_{1})\overline{Y_{\ell}^{m}(\Omega_{2})}
  $$

  enables expansions of rotationally invariant potentials.

Spherical and cylindrical coordinates align with domain symmetries, dictating the special functions encountered in separation of variables.

> **Spherical Harmonics for Laplace's Equation**

> Solve $\Delta u=0$ in the unit ball with $u(1,\theta,\phi)=\cos\theta$.

> Separation yields radial factors $r^{\ell}$ and angular spherical harmonics $Y_{\ell}^{m}$. The boundary data correspond to $\ell=1$, $m=0$, so $u(r,\theta,\phi)=r Y_{1}^{0}(\theta,\phi)=r\cos\theta$.

> **Addition Theorem Check**

> Verify the addition theorem for $\ell=1$.

> Using explicit forms of $Y_{1}^{m}$, one obtains

> $$
> \cos\gamma=\frac{4\pi}{3}\sum_{m=-1}^{1}Y_{1}^{m}(\Omega_{1})\overline{Y_{1}^{m}(\Omega_{2})},
> $$

> where $\gamma$ is the angle between $\Omega_{1}$ and $\Omega_{2}$. This identity underpins expansions of rotationally symmetric kernels.

> **Exterior Harmonic Potential via Spherical Harmonics**

> Solve $\Delta u=0$ for $r>1$ with $u(1,\theta,\phi)=\cos^{3}\theta$.

> Using $\cos^{3}\theta=\tfrac{3}{4}\cos\theta+\tfrac{1}{4}\cos 3\theta$ and expanding in $Y_{\ell}^{0}$, the exterior solution becomes

> $$
> u(r,\theta,\phi)=\frac{1}{3}r^{-2}Y_{1}^{0}(\theta,\phi)+\frac{1}{15}r^{-4}Y_{3}^{0}(\theta,\phi),
> $$

> illustrating how spherical harmonics encode boundary data.

Spherical harmonics provide a complete basis for functions on the sphere, just as Fourier series do for functions on the circle. The addition theorem reveals the deep connection between spherical harmonics and Legendre polynomials, enabling efficient computation of rotationally symmetric potentials.

## Challenge Problems

The following problems synthesize concepts from classification, separation of variables, characteristics, and special coordinate systems.

### Challenge 1: Mixed-Type PDE and Transonic Flow

Consider the Tricomi equation $y u_{xx} + u_{yy} = 0$ on the domain $\Omega = \{(x,y) : y > 0\}$. Classify the equation and show that it is elliptic for $y > 0$ but becomes parabolic on the boundary $y = 0$. Construct a solution using separation of variables in the elliptic region and analyze the behavior as $y \to 0^+$.

*(Hint: Use the substitution $u(x,y) = X(x)Y(y)$ and consider power series solutions. The boundary $y=0$ is a characteristic line.)*

<details>
<summary><strong>Expand Solution</strong></summary>

For $y > 0$, the discriminant is $\Delta = -4y < 0$, so the equation is elliptic. Separating variables with $u(x,y) = X(x)Y(y)$ gives

$$
y X'' Y + X Y'' = 0 \implies \frac{X''}{X} = -\frac{Y''}{y Y} = -\lambda.
$$

The $X$ equation $X'' + \lambda X = 0$ has solutions $X(x) = A \cos(\sqrt{\lambda} x) + B \sin(\sqrt{\lambda} x)$ for $\lambda > 0$.

The $Y$ equation becomes $Y'' - \lambda y Y = 0$. Making the substitution $\eta = (4\lambda/9)^{1/3} y$, this becomes Airy's equation, with solutions $Y(y) = C \operatorname{Ai}(\eta) + D \operatorname{Bi}(\eta)$.

As $y \to 0^+$, the elliptic character degenerates and the equation becomes parabolic. The solution develops singular behavior, reflecting the physical fact that transonic flows exhibit fundamentally different dynamics in subsonic (elliptic) and supersonic (hyperbolic) regions. Mixed-type equations model physical transitions between different regimes, where the governing PDE changes type depending on the local flow conditions. The classification changes continuously with the coefficients, creating regions of different character that require piecewise solution construction. Solutions must therefore be built separately in regions of constant type, with matching conditions at the boundaries where the type changes, revealing the intricate structure of mixed-type problems.

</details>

### Challenge 2: Completeness of Eigenfunction Expansions

For the Sturm–Liouville problem $-u'' = \lambda u$ on $[0,\pi]$ with boundary conditions $u(0) = u'(\pi) = 0$, show that the eigenfunctions form a complete orthonormal basis for $L^2[0,\pi]$. Use this to expand the function $f(x) = x$ and analyze the convergence properties of the series. Compare the rate of convergence to that of the standard Fourier sine series.

*(Hint: Use the orthogonality relation and Parseval's identity. The eigenfunctions are $\phi_n(x) = \sin((2n-1)x/2)$ with eigenvalues $\lambda_n = ((2n-1)/2)^2$.)*

<details>
<summary><strong>Expand Solution</strong></summary>

The eigenfunctions are $\phi_n(x) = \sqrt{2/\pi} \sin((2n-1)x/2)$ with eigenvalues $\lambda_n = ((2n-1)/2)^2$ for $n = 1, 2, 3, \ldots$. Orthogonality follows from integration:

$$
\int_0^{\pi} \phi_m(x) \phi_n(x) \, dx = \delta_{mn}.
$$

Completeness in $L^2[0,\pi]$ follows from the general theory of Sturm–Liouville operators on compact intervals. For $f(x) = x$, the expansion coefficients are

$$
c_n = \int_0^{\pi} x \phi_n(x) \, dx = \sqrt{\frac{2}{\pi}} \int_0^{\pi} x \sin\left(\frac{(2n-1)x}{2}\right) \, dx = \sqrt{\frac{2}{\pi}} \frac{8(-1)^{n+1}}{(2n-1)^2}.
$$

The series converges pointwise to $f(x)$ on $(0,\pi)$ by Dirichlet's theorem, and uniformly on any compact subset. The rate of convergence is $O(n^{-2})$, slower than the $O(n^{-1})$ rate for the standard Fourier sine series because the boundary condition mismatch creates slower decay.

Parseval's identity gives

$$
\int_0^{\pi} x^2 \, dx = \frac{\pi^3}{3} = \sum_{n=1}^{\infty} \frac{128}{\pi(2n-1)^4},
$$

which can be verified numerically.

This analysis reveals that completeness is fundamentally an $L^2$ property rather than a pointwise convergence result: the series converges in the $L^2$ norm even when pointwise convergence fails. The boundary conditions significantly affect the rate of convergence: the mixed boundary condition $u'(\pi) = 0$ creates a mismatch that slows the decay of coefficients to $O(n^{-2})$ compared to the $O(n^{-1})$ rate for standard Fourier series. Parseval's identity provides a convergence test independent of pointwise behavior, allowing one to verify completeness and compute norms using only the spectral coefficients, demonstrating the power of Hilbert-space methods for understanding eigenfunction expansions.

</details>

### Challenge 3: Riemann Problem for the Wave Equation

Solve the one-dimensional wave equation $u_{tt} - c^2 u_{xx} = 0$ on $\mathbb{R} \times (0,\infty)$ with initial data

$$
u(x,0) = \begin{cases} 1 & \text{if } \mid x \mid < a, \\ 0 & \text{if } \mid x \mid > a, \end{cases} \qquad u_t(x,0) = 0.
$$

Use d'Alembert's formula to construct the solution and identify the regions in the $(x,t)$ plane where the solution takes different forms. Analyze the behavior at the wave fronts $x \pm ct = \pm a$.

*(Hint: d'Alembert's formula is $u(x,t) = \frac{1}{2}[f(x+ct) + f(x-ct)] + \frac{1}{2c} \int_{x-ct}^{x+ct} g(s) \, ds$ for initial data $u(x,0) = f(x)$, $u_t(x,0) = g(x)$.)*

<details>
<summary><strong>Expand Solution</strong></summary>

Using d'Alembert's formula with $f(x)$ as given and $g(x) = 0$:

$$
u(x,t) = \frac{1}{2}[f(x+ct) + f(x-ct)].
$$

The solution depends on which characteristics $x \pm ct = \pm a$ intersect the point $(x,t)$:

- **Region I:** $x + ct < -a$ or $x - ct > a$: Both $f(x \pm ct) = 0$, so $u(x,t) = 0$ (undisturbed region).

- **Region II:** $-a < x - ct < a$ and $x + ct > a$: Only $f(x-ct) = 1$, so $u(x,t) = 1/2$ (half-amplitude region).

- **Region III:** $-a < x + ct < a$ and $x - ct < -a$: Only $f(x+ct) = 1$, so $u(x,t) = 1/2$.

- **Region IV:** $-a < x - ct < a$ and $-a < x + ct < a$: Both $f(x \pm ct) = 1$, so $u(x,t) = 1$ (fully excited region).

At the wave fronts $x \pm ct = \pm a$, the solution is discontinuous, reflecting the discontinuous initial data. The solution propagates along characteristics at speed $c$, with the disturbance spreading in both directions and creating distinct regions separated by the characteristic lines. This demonstrates a fundamental property of the wave equation: discontinuous initial data produce discontinuous solutions that travel along characteristics, in contrast to parabolic equations which smooth singularities. The wave equation preserves the structure of the initial data as it propagates, with each point of discontinuity traveling along its characteristic curves and maintaining its amplitude until it encounters boundaries or other waves.

</details>

### Challenge 4: Heat Kernel and Regularization

Show that the heat kernel $G(x,t) = (4\pi t)^{-1/2} e^{-x^2/(4t)}$ for $t > 0$ (and $0$ for $t < 0$) provides a regularization of the Dirac delta: $\lim_{t \to 0^+} G(x,t) = \delta(x)$ in the sense of distributions. Use this to solve the heat equation $u_t = u_{xx}$ on $\mathbb{R} \times (0,\infty)$ with initial data $u(x,0) = \delta(x - x_0)$ and show that the solution is $u(x,t) = G(x - x_0, t)$.

*(Hint: Show that $\int_{-\infty}^{\infty} G(x,t) \, dx = 1$ for all $t > 0$, and that for any smooth test function $\phi$, $\lim_{t \to 0^+} \int G(x,t) \phi(x) \, dx = \phi(0)$.)*

<details>
<summary><strong>Expand Solution</strong></summary>

The heat kernel is $G(x,t) = (4\pi t)^{-1/2} e^{-x^2/(4t)}$ for $t > 0$. Direct integration shows

$$
\int_{-\infty}^{\infty} G(x,t) \, dx = \frac{1}{\sqrt{4\pi t}} \int_{-\infty}^{\infty} e^{-x^2/(4t)} \, dx = 1.
$$

For any smooth test function $\phi$ with compact support, making the substitution $y = x/\sqrt{4t}$:

$$
\int_{-\infty}^{\infty} G(x,t) \phi(x) \, dx = \frac{1}{\sqrt{\pi}} \int_{-\infty}^{\infty} e^{-y^2} \phi(\sqrt{4t} y) \, dy.
$$

As $t \to 0^+$, $\phi(\sqrt{4t} y) \to \phi(0)$ uniformly on compact sets, so

$$
\lim_{t \to 0^+} \int_{-\infty}^{\infty} G(x,t) \phi(x) \, dx = \frac{\phi(0)}{\sqrt{\pi}} \int_{-\infty}^{\infty} e^{-y^2} \, dy = \phi(0).
$$

This shows that $G(x,t) \to \delta(x)$ as $t \to 0^+$ in the sense of distributions.

For initial data $u(x,0) = \delta(x - x_0)$, the solution is $u(x,t) = G(x - x_0, t)$ by translation invariance. This satisfies the heat equation (verified by direct differentiation) and approaches $\delta(x - x_0)$ as $t \to 0^+$. The heat kernel provides a smooth approximation to the delta function, with the width of the Gaussian growing as $\sqrt{t}$ and the amplitude decreasing to maintain unit mass. This smoothing property of the heat equation regularizes singular initial data: even when starting from a distribution like the delta function, the solution immediately becomes smooth for $t > 0$. This construction extends to arbitrary initial data via convolution, demonstrating that the heat kernel serves as the fundamental solution from which all solutions can be constructed, showcasing the regularization power of parabolic equations.

</details>

Classical PDE methods expose the dependence of explicit solutions on domain geometry and spectral data. Their limitations—convergence failures, shocks, and irregular boundaries—motivate the functional analysis, distribution theory, and geometric frameworks introduced in Chapter 2 and beyond.

However, these methods fail catastrophically when: (1) boundaries are irregular (no separation of variables), (2) coefficients are discontinuous (no smooth eigenfunctions), (3) initial data are singular (no pointwise convergence), and (4) nonlinearities create shocks (classical solutions break down). These fundamental limitations necessitate the weak solution framework, distribution theory, and functional-analytic machinery of subsequent chapters, which provide rigorous foundations for problems that classical methods cannot handle.

## References

* **Andrews, G. E., Askey, R., & Roy, R. (1999).** *Special Functions*. Cambridge University Press.
* **Evans, L. C. (2010).** *Partial Differential Equations*. American Mathematical Society.
* **Gilbarg, D., & Trudinger, N. S. (2001).** *Elliptic Partial Differential Equations of Second Order*. Springer.
* **John, F. (1982).** *Partial Differential Equations*. Springer-Verlag.
* **Stein, E. M., & Shakarchi, R. (2003).** *Fourier Analysis: An Introduction*. Princeton University Press.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 1.3 Integral Transforms]({{ '/diffequations/chapter-01/01-3-integral-transforms/' | relative_url }})
- [Next Section: 1.5 Asymptotic Analysis]({{ '/diffequations/chapter-01/01-5-asymptotic-analysis/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-01/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
