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

> The geometry of the domain selects the coordinate system, and the coordinate system selects the special functions—explicit solutions exist only when symmetries align.

## Introduction

We extend ODE methods to fields. **Separation of Variables** is framed as the simultaneous diagonalization of commuting operators. We demonstrate that the geometry of the domain (sphere, cylinder, box) dictates the choice of special functions. **Eigenfunction Expansions** are constructed, but we highlight the open question: in what metric space does an infinite series of functions converge to a discontinuous boundary condition?

## Classification and Canonical Forms

Consider the second-order linear PDE

$$
A u_{xx}+2B u_{xy}+C u_{yy}+D u_{x}+E u_{y}+F u=G,
$$

with discriminant $\Delta=B^{2}-AC$. The sign of $\Delta$ distinguishes physical regimes (John, 1982):

- **Elliptic ($\Delta<0$)** – e.g., Laplace's equation $\Delta u=0$, modeling equilibrium and instantaneous smoothing.
- **Parabolic ($\Delta=0$)** – e.g., Heat equation $u_{t}-\Delta u=0$, capturing diffusive dynamics with a causal time arrow.
- **Hyperbolic ($\Delta>0$)** – e.g., Wave equation $u_{tt}-c^{2}\Delta u=0$, describing finite-speed propagation along characteristics.

Characteristic curves satisfy $A(dy)^{2}-2B dx\,dy+C(dx)^{2}=0$. Transforming to characteristic coordinates $(\xi,\eta)$ diagonalizes the principal part, yielding canonical forms such as $u_{\xi\eta}=0$ in the hyperbolic case (Evans, 2010).

> **Discriminant Classification**

> Classify $3u_{xx}+4u_{xy}+5u_{yy}=0$.

> The discriminant $\Delta=4^{2}-3\cdot 5=1>0$, so the PDE is hyperbolic. Characteristics solve $3(dy)^{2}-4 dx\,dy+5(dx)^{2}=0$, yielding complex slopes $(2\pm i\sqrt{11})/3$. Real canonical coordinates $\xi=x$, $\eta=y-\tfrac{2}{3}x$ reduce the equation to $u_{\xi\xi}-u_{\eta\eta}=0$, revealing wave-like behavior.

This classification is fundamental: it determines the nature of the initial-value problem, the domain of dependence, and the appropriate solution methods. Hyperbolic equations propagate information along characteristics, while elliptic equations spread information instantaneously.

> **Variable-Coefficient Classification**

> Determine the type of $x u_{xx}+2u_{xy}+y u_{yy}=0$.

> Here $\Delta(x,y)=4-xy$. The equation is elliptic where $xy<4$, parabolic on $xy=4$, and hyperbolic when $xy>4$. The curve $xy=4$ resembles the Tricomi equation, modeling mixed-type phenomena such as transonic flow.

When coefficients are not constant, the equation type can vary across the domain. This mixed-type behavior appears in applications like transonic flow, where the equation changes from elliptic to hyperbolic depending on the Mach number.

> **Canonical Hyperbolic Reduction**

> Reduce $u_{xx}-3u_{xy}+2u_{yy}=0$.

> The discriminant is $\Delta=(-3)^{2}-4\cdot 1\cdot 2=1>0$. Characteristics satisfy $dy/dx=r$ with $r_{1,2}=\{2,1\}$. Coordinates $\xi=y-2x$ and $\eta=y-x$ transform the PDE to $u_{\xi\eta}=0$, leading to $u(x,y)=f(y-2x)+g(y-x)$.

The general solution of $u_{\xi\eta}=0$ is $u(\xi,\eta)=f(\xi)+g(\eta)$, representing the superposition of two waves propagating along the characteristic directions. This form reveals the wave-like nature of hyperbolic equations.

## Separation of Variables and Spectral Theory

Symmetric domains admit separated solutions $u(x,t)=X(x)T(t)$. Substitution reduces the PDE to a spatial eigenvalue problem

$$
\mathcal{L}X=\lambda w(x)X,
$$

subject to homogeneous boundary conditions. The Rayleigh quotient

$$
\lambda_{1}=\min_{u\neq 0}\frac{\int_{\Omega}\mid \nabla u\mid^{2}dx}{\int_{\Omega}u^{2}dx}
$$

characterizes the principal eigenvalue (Gilbarg & Trudinger, 2001). Maximum principles imply interior extrema occur on $\partial\Omega$, providing uniqueness and a priori bounds without explicit solutions.

> **Heat Equation with Dirichlet Data**

> Solve $u_{t}=u_{xx}$ on $0<x<\pi$ with $u(0,t)=u(\pi,t)=0$, $u(x,0)=\sin(3x)$.

> Separation $u=XT$ gives $X''+\lambda X=0$ with eigenvalues $\lambda_{n}=n^{2}$ and eigenfunctions $\sin(nx)$. The temporal factors are $T_{n}=e^{-n^{2}t}$. Expanding the initial data reveals only $n=3$ is present, so $u(x,t)=e^{-9t}\sin(3x)$.

Separation of variables succeeds when the domain and boundary conditions match the symmetry of the eigenfunctions. Here, the sinusoidal initial data is already an eigenfunction, so no expansion is needed.

> **Rayleigh Quotient Verification**

> Verify $\lambda_{1}=1$ for $-u''=\lambda u$ with $u(0)=u(\pi)=0$.

> The Rayleigh quotient

> $$
> R[u]=\frac{\int_{0}^{\pi}(u')^{2}dx}{\int_{0}^{\pi}u^{2}dx}
> $$

> is minimized by $u=\sin x$, giving $R[\sin x]=1$. Alternative test functions yield $R[u]>1$, confirming the principal eigenvalue.

The Rayleigh quotient provides a variational characterization of eigenvalues without explicitly solving the eigenvalue problem. This principle underlies many numerical methods and theoretical estimates.

> **Wave Equation with Mixed Boundaries**

> Solve $u_{tt}=u_{xx}$ on $0<x<\pi$, with $u(0,t)=0$ and $u_{x}(\pi,t)=0$.

> Separation imposes $X(0)=0$ and $X'(\pi)=0$, leading to eigenfunctions $\sin\big((2n-1)x/2\big)$ with $\lambda_{n}=\tfrac{(2n-1)^{2}}{4}$. The solution is

> $$
> u(x,t)=\sum_{n=1}^{\infty}\left(a_{n}\cos\frac{(2n-1)t}{2}+b_{n}\sin\frac{(2n-1)t}{2}\right)\sin\frac{(2n-1)x}{2},
> $$

> with coefficients fixed by initial data.

Mixed boundary conditions (Dirichlet on one side, Neumann on the other) produce eigenfunctions with different frequencies than the pure Dirichlet case. The solution still decomposes into eigenmodes, each oscillating at its characteristic frequency.

## Fourier Series and Eigenfunction Expansions

Eigenfunctions $\{\phi_{n}\}$ yield superpositions $u(x,t)=\sum_{n}a_{n}(t)\phi_{n}(x)$. Convergence issues arise when reconstructing initial data $f(x)$ from the series $\sum c_{n}\phi_{n}(x)$:

- **Dirichlet's theorem** gives pointwise convergence for piecewise $C^{1}$ data to $\tfrac{1}{2}(f(x^{+})+f(x^{-}))$.
- **Divergence examples** show continuous functions whose Fourier series diverge at points (Stein & Shakarchi, 2003).
- **Gibbs phenomenon** exhibits persistent overshoot near jumps.

Cesàro summation via the Fejér kernel $F_{N}$ restores uniform convergence for continuous data, foreshadowing mollification and Sobolev-space regularization.

> **Fourier Series and Gibbs Phenomenon**

> Expand $f(x)=\operatorname{sgn}(x)$ on $(-\pi,\pi)$.

> Only sine terms appear: $f(x)\sim \frac{4}{\pi}\sum_{k=1,3,5,\dots}\frac{\sin(kx)}{k}$. Partial sums overshoot near $x=0$ by approximately $0.08949$ (17.9% of the jump) regardless of how many terms are added—the Gibbs phenomenon—illustrating the limitations of pointwise convergence.

The Gibbs phenomenon reveals that Fourier series cannot uniformly approximate discontinuous functions. The overshoot persists even as more terms are added, demonstrating that pointwise convergence and uniform convergence are distinct concepts.

> **Cesàro Summability via Fejér Kernel**

> Show Fejér means converge uniformly for continuous $f$.

> Define $\sigma_{N}(f)=\frac{1}{N+1}\sum_{k=0}^{N}S_{k}(f)=f*F_{N}$, where $F_{N}$ is the Fejér kernel. Since $F_{N}\ge 0$, $\int F_{N}=2\pi$, and $F_{N}$ concentrates at $0$, convolution with $F_{N}$ approximates $f$ uniformly by continuity, demonstrating a summability method that bypasses Gibbs oscillations.

Cesàro summation averages the partial sums, effectively smoothing out the oscillations. This demonstrates that different summation methods can recover convergence where the original series fails, foreshadowing the need for generalized convergence concepts in functional analysis.

## Method of Characteristics

First-order hyperbolic equations propagate data along characteristic curves. For

$$
u_{t}+a(x,t,u)u_{x}=0,
$$

characteristics satisfy $\frac{dx}{dt}=a$ and $\frac{du}{dt}=0$, yielding $u(x,t)=u_{0}(x-at)$ for constant $a$. Nonlinear velocities $a(u)$ cause characteristic intersection, signaling shock formation and motivating weak/entropy solutions in Chapter 3.

> **Transport Equation**

> Solve $u_{t}+3u_{x}=0$ with $u(x,0)=\sin x$.

> Characteristics satisfy $x=x_{0}+3t$. Along each, $u$ is constant, so $u(x,t)=\sin(x-3t)$, confirming the transport of initial data without distortion.

The method of characteristics reduces a PDE to ODEs along curves. For linear transport, the solution simply translates the initial data along the characteristic direction.

> **Variable-Coefficient Transport**

> Solve $u_{t}+(x+t)u_{x}=0$ with $u(x,0)=e^{x}$.

> Characteristics solve $\frac{dx}{dt}=x+t$, giving $x+t=Ce^{t}$ and $C=x_{0}$. Along the curve, $u$ remains $e^{x_{0}}$, yielding $u(x,t)=\exp(x e^{-t}+t e^{-t})$ after eliminating $x_{0}$.

When the velocity depends on both space and time, characteristics are curved rather than straight lines. The solution remains constant along these curves, but the deformation of the characteristics causes the solution to evolve.

> **Burgers' Equation Shock**

> For $u_{t}+u u_{x}=0$ with $u(x,0)=1-x$, find shock time.

> Characteristics satisfy $dx/dt=u=1-x_{0}$, so $x=x_{0}+(1-x_{0})t$. Inverting gives $x_{0}=(x-t)/(1+t)$ and $u=(1+x)/(1+t)$. Since $\partial x/\partial x_{0}=1-(1)t=1-t$ vanishes at $t=1$, characteristics intersect and a shock forms for $t>1$.

Nonlinear transport equations exhibit characteristic intersection, where the solution becomes multivalued. This signals the breakdown of classical solutions and the need for weak solutions, entropy conditions, and shock waves—topics developed in Chapter 3.

## Spherical Harmonics and Special Coordinates

Solving $\Delta u=0$ in curvilinear coordinates separates the Laplacian into orthogonal pieces:

- In spherical coordinates, the angular part produces spherical harmonics $Y_{\ell}^{m}(\theta,\phi)$ and radial Euler equations with solutions $r^{\ell}$ and $r^{-(\ell+1)}$.
- The addition theorem

  $$
  P_{\ell}(\cos\gamma)=\frac{4\pi}{2\ell+1}\sum_{m=-\ell}^{\ell}Y_{\ell}^{m}(\Omega_{1})\overline{Y_{\ell}^{m}(\Omega_{2})}
  $$

  enables expansions of rotationally invariant potentials (Andrews, Askey, & Roy, 1999).

Spherical and cylindrical coordinates align with domain symmetries, dictating the special functions encountered in separation of variables.

> **Spherical Harmonics for Laplace's Equation**

> Solve $\Delta u=0$ in the unit ball with $u(1,\theta,\phi)=\cos\theta$.

> Separation yields radial factors $r^{\ell}$ and angular spherical harmonics $Y_{\ell}^{m}$. The boundary data correspond to $\ell=1$, $m=0$, so $u(r,\theta,\phi)=r Y_{1}^{0}(\theta,\phi)=r\cos\theta$.

Spherical harmonics arise naturally when solving Laplace's equation in spherical coordinates. The boundary data selects the appropriate harmonic modes, with the radial dependence determined by whether we solve in the interior or exterior.

> **Addition Theorem Check**

> Verify the addition theorem for $\ell=1$.

> Using explicit forms of $Y_{1}^{m}$, one obtains

> $$
> \cos\gamma=\frac{4\pi}{3}\sum_{m=-1}^{1}Y_{1}^{m}(\Omega_{1})\overline{Y_{\ell}^{m}(\Omega_{2})},
> $$

> where $\gamma$ is the angle between $\Omega_{1}$ and $\Omega_{2}$. This identity underpins expansions of rotationally symmetric kernels.

The addition theorem allows us to expand rotationally symmetric functions in terms of spherical harmonics. This is crucial for problems with rotational symmetry, such as the expansion of the Green's function for Laplace's equation.

> **Exterior Harmonic Potential via Spherical Harmonics**

> Solve $\Delta u=0$ for $r>1$ with $u(1,\theta,\phi)=\cos^{3}\theta$.

> Using $\cos^{3}\theta=\tfrac{3}{4}\cos\theta+\tfrac{1}{4}\cos 3\theta$ and expanding in $Y_{\ell}^{0}$, the exterior solution becomes

> $$
> u(r,\theta,\phi)=\frac{1}{3}r^{-2}Y_{1}^{0}(\theta,\phi)+\frac{1}{15}r^{-4}Y_{3}^{0}(\theta,\phi),
> $$

> illustrating how spherical harmonics encode boundary data.

For exterior problems, the radial dependence is $r^{-(\ell+1)}$ to ensure decay at infinity. The boundary data determines the coefficients through an expansion in spherical harmonics, demonstrating how special functions provide a natural basis for problems with geometric symmetry.

## Challenge Problems

The following problems synthesize concepts from PDE classification, separation of variables, eigenfunction expansions, characteristics, and special coordinates.

### Challenge 1: Classification and Canonical Forms for Variable-Coefficient Equations

For the equation

$$
x u_{xx} + 2u_{xy} + y u_{yy} + u_x + u_y = 0,
$$

determine the regions where it is elliptic, parabolic, and hyperbolic. Find the canonical forms in each region and construct a coordinate transformation that reduces the equation to its canonical form in the hyperbolic region.

Show that the curve separating different types (the parabolic set) is given by $xy=1$, and explain how this relates to the Tricomi equation for transonic flow.

<details>
<summary><strong>Expand Solution</strong></summary>

The discriminant is $\Delta(x,y) = 4 - xy$. The equation type depends on the sign:
- Elliptic: $xy > 4$
- Parabolic: $xy = 4$
- Hyperbolic: $xy < 4$

For the hyperbolic region, we need to find characteristic coordinates. The characteristic equation is:

$$
x(dy)^2 - 2dx\,dy + y(dx)^2 = 0.
$$

Dividing by $(dx)^2$ (assuming $dx \neq 0$):

$$
x\left(\frac{dy}{dx}\right)^2 - 2\frac{dy}{dx} + y = 0.
$$

Solving for $\frac{dy}{dx}$:

$$
\frac{dy}{dx} = \frac{2 \pm \sqrt{4-4xy}}{2x} = \frac{1 \pm \sqrt{1-xy}}{x}.
$$

The characteristic curves satisfy these ODEs. In the hyperbolic region where $xy < 4$ (and in particular $xy < 1$ for real characteristics), we can integrate to find:

$$
\xi = y - \frac{x}{1+\sqrt{1-xy}}, \quad \eta = y - \frac{x}{1-\sqrt{1-xy}}.
$$

In these coordinates, the principal part reduces to $u_{\xi\eta}$ plus lower-order terms.

The parabolic curve $xy=4$ is where the discriminant vanishes. This is analogous to the Tricomi equation $y u_{xx} + u_{yy} = 0$, where the type changes across the line $y=0$. In transonic flow, the equation is elliptic in the subsonic region and hyperbolic in the supersonic region, with the transition occurring at the sonic line.

**Key Insights:**
- Variable-coefficient equations can change type across the domain.
- The parabolic set (where $\Delta=0$) is where characteristics merge.
- Transonic flow is a physical example where mixed-type equations appear naturally.

</details>

### Challenge 2: Separation of Variables and the Completeness of Eigenfunctions

For the Sturm–Liouville problem

$$
-u'' = \lambda u, \quad u(0) = 0, \quad u'(\pi) + u(\pi) = 0,
$$

find all eigenvalues and eigenfunctions. Prove that these eigenfunctions form a complete orthogonal set in $L^2([0,\pi])$, and use this to solve the heat equation

$$
u_t = u_{xx}, \quad u(0,t) = 0, \quad u_x(\pi,t) + u(\pi,t) = 0, \quad u(x,0) = f(x).
$$

*(Hint: The boundary condition at $x=\pi$ is a Robin condition. The eigenvalues satisfy a transcendental equation.)*

<details>
<summary><strong>Expand Solution</strong></summary>

The general solution of $-u'' = \lambda u$ is:

$$
u(x) = A \sin(\sqrt{\lambda} x) + B \cos(\sqrt{\lambda} x).
$$

Applying $u(0) = 0$ gives $B = 0$, so $u(x) = A \sin(\sqrt{\lambda} x)$.

The boundary condition at $x=\pi$ gives:

$$
u'(\pi) + u(\pi) = A\sqrt{\lambda} \cos(\sqrt{\lambda}\pi) + A \sin(\sqrt{\lambda}\pi) = 0.
$$

This implies:

$$
\sqrt{\lambda} \cos(\sqrt{\lambda}\pi) + \sin(\sqrt{\lambda}\pi) = 0, \quad \text{or} \quad \tan(\sqrt{\lambda}\pi) = -\sqrt{\lambda}.
$$

This transcendental equation determines the eigenvalues. For $\lambda > 0$, there are infinitely many positive solutions $\lambda_n$ with $\lambda_n \sim (n-1/2)^2$ as $n \to \infty$.

For the heat equation, we expand the initial data in the eigenfunctions:

$$
f(x) = \sum_{n=1}^{\infty} c_n \sin(\sqrt{\lambda_n} x),
$$

where

$$
c_n = \frac{\int_0^{\pi} f(x) \sin(\sqrt{\lambda_n} x) \, dx}{\int_0^{\pi} \sin^2(\sqrt{\lambda_n} x) \, dx}.
$$

The solution is:

$$
u(x,t) = \sum_{n=1}^{\infty} c_n e^{-\lambda_n t} \sin(\sqrt{\lambda_n} x).
$$

Completeness follows from the general theory of Sturm–Liouville problems. The eigenfunctions are orthogonal because they are eigenfunctions of a self-adjoint operator, and completeness is guaranteed by the spectral theorem for Sturm–Liouville operators.

**Key Insights:**
- Robin boundary conditions lead to transcendental equations for eigenvalues.
- The eigenfunctions remain orthogonal and complete even with mixed boundary conditions.
- Separation of variables works whenever we have a complete set of eigenfunctions.

</details>

### Challenge 3: Method of Characteristics and Shock Formation

Consider the nonlinear wave equation

$$
u_t + u u_x = 0, \quad u(x,0) = \begin{cases} 1 & x < 0 \\ 1-x & 0 \leq x \leq 1 \\ 0 & x > 1 \end{cases}.
$$

Find the time and location of shock formation. Construct the weak solution using the Rankine–Hugoniot condition, and verify that it satisfies the entropy condition.

<details>
<summary><strong>Expand Solution</strong></summary>

Characteristics satisfy $dx/dt = u(x_0)$, where $x_0$ is the point where the characteristic originates. Along each characteristic, $u$ remains constant:

$$
u(x,t) = u_0(x_0), \quad x = x_0 + u_0(x_0) t.
$$

For the given initial data:
- For $x_0 < 0$: $u = 1$, so $x = x_0 + t$
- For $0 \leq x_0 \leq 1$: $u = 1-x_0$, so $x = x_0 + (1-x_0)t = x_0(1-t) + t$
- For $x_0 > 1$: $u = 0$, so $x = x_0$

The characteristics from the region $0 \leq x_0 \leq 1$ will intersect. The condition for intersection is $\partial x/\partial x_0 = 0$, which gives $1-t = 0$, so $t = 1$.

At $t = 1$, characteristics from different regions intersect. For $t > 1$, a shock forms. The shock speed $s$ is given by the Rankine–Hugoniot condition:

$$
s = \frac{[u^2/2]}{[u]} = \frac{u_l^2/2 - u_r^2/2}{u_l - u_r} = \frac{u_l + u_r}{2},
$$

where $u_l$ and $u_r$ are the values on the left and right of the shock.

For $t > 1$, the shock connects $u = 1$ (from $x_0 < 0$) to $u = 0$ (from $x_0 > 1$), so $s = 1/2$. The shock path is $x = t/2$ for $t \geq 1$.

The entropy condition requires that characteristics enter the shock from both sides, which is satisfied here. The weak solution is:

$$
u(x,t) = \begin{cases}
1 & x < t/2, \, t \geq 1 \\
0 & x > t/2, \, t \geq 1
\end{cases}
$$

**Key Insights:**
- Characteristics intersect when $\partial x/\partial x_0 = 0$, signaling shock formation.
- The Rankine–Hugoniot condition determines shock speed from conservation laws.
- The entropy condition selects the physically correct weak solution.

</details>

### Challenge 4: Spherical Harmonics and the Poisson Kernel

Prove that the Poisson kernel for the unit ball in $\mathbb{R}^3$ is

$$
P(\mathbf{x}, \boldsymbol{\xi}) = \frac{1 - |\mathbf{x}|^2}{|\mathbf{x} - \boldsymbol{\xi}|^3}, \quad |\boldsymbol{\xi}| = 1.
$$

Show that this kernel reproduces harmonic functions: if $u$ is harmonic in the ball and continuous on the boundary, then

$$
u(\mathbf{x}) = \int_{|\boldsymbol{\xi}|=1} P(\mathbf{x}, \boldsymbol{\xi}) u(\boldsymbol{\xi}) \, dS(\boldsymbol{\xi}).
$$

Use the addition theorem for spherical harmonics to expand the Poisson kernel and connect it to the eigenfunction expansion method.

<details>
<summary><strong>Expand Solution</strong></summary>

The Poisson kernel can be derived using the method of images. For the unit ball, the Green's function is:

$$
G(\mathbf{x}, \boldsymbol{\xi}) = \frac{1}{4\pi|\mathbf{x} - \boldsymbol{\xi}|} - \frac{1}{4\pi|\mathbf{x} - \boldsymbol{\xi}^*|},
$$

where $\boldsymbol{\xi}^* = \boldsymbol{\xi}/|\boldsymbol{\xi}|^2$ is the reflection of $\boldsymbol{\xi}$ across the unit sphere. The Poisson kernel is:

$$
P(\mathbf{x}, \boldsymbol{\xi}) = \frac{\partial G}{\partial n}(\mathbf{x}, \boldsymbol{\xi}), \quad |\boldsymbol{\xi}| = 1.
$$

A direct calculation yields:

$$
P(\mathbf{x}, \boldsymbol{\xi}) = \frac{1 - |\mathbf{x}|^2}{|\mathbf{x} - \boldsymbol{\xi}|^3}.
$$

To show that it reproduces harmonic functions, we use Green's identity. If $u$ is harmonic in the ball and $v$ is the fundamental solution, then:

$$
u(\mathbf{x}) = \int_{\partial B} \left[u(\boldsymbol{\xi}) \frac{\partial G}{\partial n}(\mathbf{x}, \boldsymbol{\xi}) - G(\mathbf{x}, \boldsymbol{\xi}) \frac{\partial u}{\partial n}(\boldsymbol{\xi})\right] dS(\boldsymbol{\xi}).
$$

For the Dirichlet problem, we want $G = 0$ on the boundary, which our Green's function satisfies. This gives the Poisson integral formula.

To expand the Poisson kernel in spherical harmonics, we use the addition theorem. Setting $|\mathbf{x}| = r$ and $|\boldsymbol{\xi}| = 1$:

$$
\frac{1}{|\mathbf{x} - \boldsymbol{\xi}|} = \sum_{\ell=0}^{\infty} \frac{4\pi}{2\ell+1} \frac{r^{\ell}}{r_>^{\ell+1}} \sum_{m=-\ell}^{\ell} Y_\ell^m(\hat{\mathbf{x}}) \overline{Y_\ell^m(\hat{\boldsymbol{\xi}})},
$$

where $r_> = \max(r, 1)$. For $r < 1$:

$$
\frac{1 - r^2}{|\mathbf{x} - \boldsymbol{\xi}|^3} = \sum_{\ell=0}^{\infty} (2\ell+1) r^{\ell} \sum_{m=-\ell}^{\ell} Y_\ell^m(\hat{\mathbf{x}}) \overline{Y_\ell^m(\hat{\boldsymbol{\xi}})}.
$$

This expansion connects the Poisson kernel to the eigenfunction method: the interior harmonic function is expanded in powers of $r$, with coefficients determined by the boundary data through the spherical harmonic expansion.

**Key Insights:**
- The Poisson kernel provides an explicit formula for harmonic functions in terms of boundary values.
- The expansion in spherical harmonics connects the Poisson kernel to separation of variables.
- This demonstrates the equivalence of different solution methods for the Dirichlet problem.

</details>

Classical PDE methods expose the dependence of explicit solutions on domain geometry and spectral data. Their limitations—convergence failures, shocks, and irregular boundaries—motivate the functional analysis, distribution theory, and geometric frameworks introduced in Chapter 2 and beyond.

The explicit methods developed here—separation of variables, eigenfunction expansions, and the method of characteristics—succeed only when the domain has sufficient symmetry and the boundary conditions are regular. When characteristics intersect (shocks), when boundaries are irregular, or when the domain lacks symmetry, these methods fail. This fragility necessitates the weak solution theory, distribution methods, and geometric frameworks that provide existence and uniqueness for general problems, developed in Chapters 2 and 3.

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
