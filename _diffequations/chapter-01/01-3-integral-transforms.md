---
layout: textbook
title: "Section 1.3: Integral Transforms"
description: "Laplace and Fourier transforms, Green's functions"
permalink: /diffequations/chapter-01/01-3-integral-transforms/
order: 1.3
chapter: 1
section: 3
nav_order: 1.3
is_chapter_index: false
parent_chapter: 1
parent_section: null
---

# Section 1.3: Integral Transforms

> Differentiation becomes multiplication when we view functions through the correct spectral lens; integral transforms are the coordinate systems that diagonalize differential operators.

## Introduction

We trade differential complexity for algebraic simplicity. The **Laplace** and **Fourier Transforms** are presented as diagonalizing operators. We construct **Green's Functions** to solve inhomogeneous linear problems, introducing the Dirac delta as a heuristic tool. The limitation exposed here is convergence: for general initial data, the inverse transform integrals may not converge in any classical sense, hinting at the need for a generalized calculus.

## The Laplace Transform

For initial value problems constrained by causality ($f(t)=0$ for $t<0$) the Laplace transform maps real time to complex frequency:

$$
\mathcal{L}\{f\}(s)=F(s)=\int_{0}^{\infty}f(t)e^{-st}\,dt.
$$

If $f$ is locally integrable on $[0,\infty)$ and satisfies $\mid f(t)\mid\leq M e^{\sigma t}$, then $F$ is analytic for $\operatorname{Re}(s)>\sigma$. Integration by parts algebraizes differentiation:

$$
\mathcal{L}\{f'\}(s)=sF(s)-f(0), \qquad \mathcal{L}\{f^{(n)}\}(s)=s^{n}F(s)-\sum_{k=1}^{n}s^{n-k}f^{(k-1)}(0),
$$

so constant coefficient ODEs reduce to polynomial equations in $s$ with initial conditions inserted automatically. Convolution becomes multiplication:

$$
(f*g)(t)=\int_{0}^{t}f(\tau)g(t-\tau)\,d\tau, \qquad \mathcal{L}\{f*g\}(s)=F(s)G(s),
$$

providing the backbone for system identification. Inversion is encoded by the Bromwich integral

$$
f(t)=\frac{1}{2\pi i}\int_{\gamma-i\infty}^{\gamma+i\infty}F(s)e^{st}\,ds, \qquad \gamma>\sigma_{0},
$$

which ties the exponential growth of $f$ to the pole structure of $F$. Poles with $\operatorname{Re}(s)<0$ yield decaying modes, so stability is a spectral placement question.

> **Laplace Transform of a Damped Oscillator**

> Solve $y''+4y'+5y=0$ with $y(0)=1$ and $y'(0)=0$.

> Taking Laplace transforms produces

> $$
> \mathcal{L}\{y''\}+4\mathcal{L}\{y'\}+5\mathcal{L}\{y\}=0,
> $$

> and the differentiation rules insert the initial data:

> $$
> \left[s^{2}Y(s)-sy(0)-y'(0)\right]+4\left[sY(s)-y(0)\right]+5Y(s)=0.
> $$

> Substituting $y(0)=1$ and $y'(0)=0$ yields $(s^{2}+4s+5)Y(s)=s+4$, so

> $$
> Y(s)=\frac{s+4}{(s+2)^{2}+1}=\frac{s+2}{(s+2)^{2}+1}+\frac{2}{(s+2)^{2}+1}.
> $$

> Inverting term by term gives $y(t)=e^{-2t}\cos t+2e^{-2t}\sin t$. Evaluating at $t=0$ reproduces $y(0)=1$ and $y'(0)=0$, so the transformed solution matches the initial data.

This demonstrates the power of the Laplace transform: it converts a differential equation with initial conditions into a simple algebraic equation. The pole locations in the $s$-plane ($s=-2\pm i$) directly reveal the oscillatory and decaying behavior of the solution.

> **Convolution Solution of an Inhomogeneous Oscillator**

> Solve $y''+y=\sin(2t)$ with $y(0)=0$ and $y'(0)=1$.

> Laplace transforming leads to

> $$
> (s^{2}+1)Y(s)-s y(0)-y'(0)=\frac{2}{s^{2}+4},
> $$

> so $Y(s)=\dfrac{s+1}{s^{2}+1}+\dfrac{2}{(s^{2}+1)(s^{2}+4)}$. The first term inverts to the homogeneous response $\cos t$, while the second term becomes a convolution:

> $$
> y_{p}(t)=\int_{0}^{t}\sin(\tau)\sin\bigl(2(t-\tau)\bigr)\,d\tau.
> $$

> Using $\sin A \sin B=\tfrac{1}{2}\left[\cos(A-B)-\cos(A+B)\right]$ reduces the integral to elementary sines, giving $y_{p}(t)=\tfrac{2}{3}\sin t$. The complete solution

> $$
> y(t)=\cos t+\frac{2}{3}\sin t
> $$

> satisfies both the differential equation and the initial conditions.

The convolution property transforms multiplication in the frequency domain to convolution in the time domain. This algebraic structure allows us to solve inhomogeneous equations by decomposing the forcing into simpler components.

> **Bromwich Inversion by Residues**

> Invert $Y(s)=\dfrac{e^{-3s}}{s^{2}+2s+5}$.

> The quadratic denominator has poles at $s=-1\pm 2i$. Choose a Bromwich line $\operatorname{Re}(s)=\gamma>0$ and close the contour in the left half-plane for $t>3$, where the exponential factor enforces a unit-step delay. The residues are

> $$
> \operatorname{Res}_{-1\pm 2i}\left(Y(s)e^{st}\right)=\frac{e^{-3(-1\pm 2i)}e^{t(-1\pm 2i)}}{4i}.
> $$

> Summing the residues yields

> $$
> f(t)=e^{3-t}\sin\bigl(2(t-3)\bigr)H(t-3),
> $$

> where $H$ is the Heaviside step function. The solution activates exactly three time units after $t=0$, mirroring the exponential shift $e^{-3s}$ in the Laplace domain.

The Bromwich integral demonstrates that inverse Laplace transforms are computed via contour integration, with poles contributing residues that determine the time-domain behavior. The exponential shift $e^{-3s}$ creates a time delay, revealing the causal structure of the transform.

## The Fourier Transform

Global phenomena on $\mathbb{R}$ demand the Fourier transform

$$
\mathcal{F}\{f\}(\xi)=\hat{f}(\xi)=\int_{-\infty}^{\infty}f(x)e^{-2\pi i x\xi}\,dx,
$$

with inverse

$$
f(x)=\int_{-\infty}^{\infty}\hat{f}(\xi)e^{2\pi i x\xi}\,d\xi.
$$

**Theorem (Plancherel).** The transform extends to a unitary map on $L^{2}(\mathbb{R})$:

$$
\|f\|_{L^{2}}^{2}=\int_{-\infty}^{\infty}\mid f(x)\mid^{2}\,dx=\int_{-\infty}^{\infty}\mid \hat{f}(\xi)\mid^{2}\,d\xi=\|\hat{f}\|_{L^{2}}^{2}.
$$

Differentiation becomes multiplication,

$$
\mathcal{F}\{f'\}(\xi)=2\pi i\xi \hat{f}(\xi),
$$

so smooth signals decay rapidly in frequency, while compact spatial support forces entire transforms with prescribed growth. The Heisenberg uncertainty relation states

$$
\Delta x\,\Delta \xi \geq \frac{1}{4\pi},
$$

where the variances are defined using $\mid f\mid^{2}$ and $\mid \hat{f}\mid^{2}$. The Paley–Wiener theorem refines this by linking compact support to entire functions of exponential type.

> **Gaussian Fourier Transform and Plancherel**

> Compute $\mathcal{F}\{e^{-\pi x^{2}}\}(\xi)$.

> Completing the square in the exponent,

> $$
> -\pi x^{2}-2\pi i x\xi=-\pi\left[(x+i\xi)^{2}+\xi^{2}\right],
> $$

> so

> $$
> \hat{f}(\xi)=e^{-\pi \xi^{2}}\int_{-\infty}^{\infty}e^{-\pi (x+i\xi)^{2}}\,dx=e^{-\pi \xi^{2}}.
> $$

> The Gaussian is self-reciprocal under the Fourier transform. Moreover,

> $$
> \int_{-\infty}^{\infty}\mid e^{-\pi x^{2}}\mid^{2}\,dx=\int_{-\infty}^{\infty}\mid e^{-\pi \xi^{2}}\mid^{2}\,d\xi=\frac{1}{\sqrt{2}},
> $$

> confirming Plancherel's theorem for this prototype.

The Gaussian's self-reciprocity under the Fourier transform is not coincidental but reflects its role as a minimizer of the uncertainty principle. This property makes Gaussians fundamental in both classical and quantum physics.

> **Rectangular Pulse and the Uncertainty Principle**

> Let $f(x)=\mathbf{1}_{[-1,1]}(x)$. Compute its Fourier transform and verify the uncertainty inequality.

> Integrating directly gives

> $$
> \hat{f}(\xi)=\int_{-1}^{1}e^{-2\pi i x\xi}\,dx=\frac{\sin(2\pi \xi)}{\pi \xi}=\operatorname{sinc}(2\xi).
> $$

> The spatial variance equals $\Delta x^{2}=\int_{-1}^{1}x^{2}\,dx=\tfrac{2}{3}$, so $\Delta x=\sqrt{1/3}$. Parseval's identity evaluates $\Delta \xi$ numerically via $\int \xi^{2}\mid \hat{f}(\xi)\mid^{2}\,d\xi$, producing $\Delta \xi\approx 0.882$. The product $\Delta x\,\Delta \xi\approx 0.509$ exceeds $\tfrac{1}{4\pi}$, illustrating that hard spatial localization forces spectral spread.

This example demonstrates the fundamental trade-off encoded in the uncertainty principle: sharp localization in space requires broad support in frequency. The sinc function decays only as $1/\xi$, reflecting the discontinuous nature of the rectangular pulse.

> **Heat Equation via Fourier Transform**

> Solve $u_{t}=u_{xx}$ with $u(x,0)=e^{-x^{2}/4}$.

> Fourier transforming in $x$ provides $\partial_{t}\hat{u}(\xi,t)=-4\pi^{2}\xi^{2}\hat{u}(\xi,t)$ and the initial data $\hat{u}(\xi,0)=2\sqrt{\pi}e^{-4\pi^{2}\xi^{2}}$. The transformed ODE integrates to

> $$
> \hat{u}(\xi,t)=2\sqrt{\pi}e^{-4\pi^{2}\xi^{2}(1+t)}.
> $$

> Inverting the transform yields

> $$
> u(x,t)=\sqrt{\frac{4\pi}{1+4t}}\exp\left(-\frac{x^{2}}{1+4t}\right),
> $$

> showing Gaussian spreading with conserved total mass.

The Fourier transform converts the heat equation into an ODE in the frequency variable, with the diffusion term becoming a multiplication operator. This demonstrates how transforms diagonalize differential operators, making PDEs into algebraic equations.

## Green's Functions and Resolvent Kernels

Integral transforms naturally produce Green's functions—the distributional inverses of linear operators. For an operator $L$ the Green's function $G(x,\xi)$ solves

$$
L_{x}[G(x,\xi)]=\delta(x-\xi),
$$

and converts $Lu=f$ into the superposition

$$
u(x)=\int G(x,\xi)f(\xi)\,d\xi.
$$

Boundary conditions are enforced directly on $G$, with the method of images providing explicit constructions for symmetric domains. Writing $Lu=f$ as $u=f+\lambda Ku$ yields integral equations whose solutions follow from the Neumann series

$$
(I-\lambda K)^{-1}=\sum_{n=0}^{\infty}\lambda^{n}K^{n},
$$

mirroring geometric series convergence when the spectral radius of $\lambda K$ is below one.

> **Sturm–Liouville Green's Function**

> Construct the Green's function for $-y''+x^{2}y=f(x)$ on $[-1,1]$ with $y(\pm 1)=0$.

> Let $\phi_{1}(x)=\int_{-1}^{x}e^{-t^{3}/3}\,dt$ enforce the left boundary and $\phi_{2}(x)=\int_{x}^{1}e^{t^{3}/3}\,dt$ enforce the right boundary. Their Wronskian is one, so

> $$
> G(x,\xi)=
> \begin{cases}
> \phi_{1}(x)\phi_{2}(\xi), & x<\xi,\\
> \phi_{1}(\xi)\phi_{2}(x), & x>\xi,
> \end{cases}
> $$

> satisfies the boundary conditions and reproduces the delta source through the jump in $\partial_{x}G$. The solution becomes $u(x)=\int_{-1}^{1}G(x,\xi)f(\xi)\,d\xi$.

The Green's function encodes both the differential operator and the boundary conditions in a single kernel. The jump condition in the derivative ensures that $G$ reproduces the delta function source, making it a fundamental solution for the boundary-value problem.

> **Method of Images for Dirichlet Data**

> Solve $\Delta u=0$ in the unit disk with $u(1,\theta)=\cos(3\theta)$.

> The Poisson kernel

> $$
> P(r,\theta-\phi)=\frac{1-r^{2}}{1-2r\cos(\theta-\phi)+r^{2}}
> $$

> expands boundary data into harmonic modes. Since $\cos(3\theta)$ selects the $n=3$ Fourier mode, the interior solution is $u(r,\theta)=r^{3}\cos(3\theta)$. This matches the method-of-images viewpoint: the image charges outside the disk cancel the boundary data, and the resulting harmonic function satisfies both the Laplace equation and the boundary values.

The method of images provides a geometric interpretation of Green's functions for symmetric domains. For the unit disk, the Poisson kernel acts as a Green's function that automatically enforces the boundary conditions through the integral representation.

> **Neumann Series for an Integral Equation**

> Solve $u(x)=f(x)+\lambda\int_{0}^{1}xye^{-xy}u(y)\,dy$ with $\lambda=0.1$ and $f(x)=1$.

> Writing $u=(I-\lambda K)^{-1}f$ with $(Ku)(x)=\int_{0}^{1}xye^{-xy}u(y)\,dy$, the Neumann series converges because $\lambda\|K\|<1$. The first iterate gives

> $$
> u_{1}(x)=1+\lambda\int_{0}^{1}xye^{-xy}\,dy=1+0.1\bigl(1-e^{-x}\bigr),
> $$

> already capturing the primary correction. Spectral radius estimates show convergence for $\mid \lambda\mid<1/e$, so summing the series delivers the full solution.

The Neumann series provides a constructive method for solving integral equations when the operator norm is small enough. This mirrors the geometric series expansion for $(1-z)^{-1}$, with convergence guaranteed when the spectral radius is less than one.

## Mellin, Hankel, and Additional Transforms

Symmetries beyond translation require different kernels. The Mellin transform,

$$
\mathcal{M}\{f\}(s)=\int_{0}^{\infty}x^{s-1}f(x)\,dx,
$$

diagonalizes dilation operators by mapping $x\dfrac{d}{dx}$ to $-s$. Euler–Cauchy equations and asymptotic scaling analyses thus become algebraic problems in $s$. Radial geometries prefer Hankel transforms with Bessel kernels; for order zero

$$
\mathcal{H}\{u\}(\kappa)=\int_{0}^{\infty}r J_{0}(\kappa r)u(r)\,dr,
$$

which diagonalizes the radial Laplacian and produces exact solutions for cylindrically symmetric PDEs.

> **Mellin Transform of an Euler–Cauchy Equation**

> Solve $x^{2}y''+3xy'-3y=0$ using the Mellin transform.

> Applying $\mathcal{M}$ gives

> $$
> s(s-1)Y(s)+3sY(s)-3Y(s)=0,
> $$

> so $(s^{2}+2s-3)Y(s)=0$ with roots $s=1$ and $s=-3$. Inverting via residues on vertical lines produces

> $$
> y(x)=Ax+Bx^{-3},
> $$

> which indeed satisfies the differential equation, showcasing how Mellin transforms diagonalize dilation operators.

The Mellin transform is ideally suited for equations with scale-invariant structure, converting Euler–Cauchy equations into polynomial equations in the transform variable. This demonstrates how different transforms exploit different symmetries of the underlying problem.

> **Radial Helmholtz Equation via Hankel Transform**

> Solve $\Delta u+k^{2}u=0$ in $\mathbb{R}^{2}$ under radial symmetry.

> The order-zero Hankel transform

> $$
> \tilde{u}(\kappa)=\int_{0}^{\infty}r J_{0}(\kappa r)u(r)\,dr
> $$

> maps the radial Laplacian to multiplication by $-\kappa^{2}$, so the transformed equation is $(-\kappa^{2}+k^{2})\tilde{u}(\kappa)=0$. The only distributional solutions are multiples of $\delta(\kappa-k)$, hence

> $$
> u(r)=A k J_{0}(kr),
> $$

> which represents a cylindrical wave satisfying the Helmholtz equation.

The Hankel transform diagonalizes the radial Laplacian, just as the Fourier transform diagonalizes the full Laplacian. This demonstrates how geometric symmetries dictate the choice of transform, with cylindrical symmetry naturally leading to Bessel functions and Hankel transforms.

## Limits of Explicit Transforms

Transform methods require integrability or growth control: the Laplace transform presumes exponential order, the Fourier transform requires at least $L^{1}$ or $L^{2}$ regularity, and Green's functions lean on distributions such as the Dirac delta. Products like $\delta^{2}$ are meaningless in classical spaces, underscoring why Chapter 2 introduces distributions, Sobolev spaces, and spectral theory to extend these heuristics rigorously.

## Challenge Problems

The following problems synthesize concepts from Laplace and Fourier transforms, Green's functions, and the connection between transforms and differential operators.

### Challenge 1: Laplace Transform and Analytic Continuation

Show that if $f(t)$ has Laplace transform $F(s)$ converging for $\operatorname{Re}(s)>\sigma_{0}$, then $F(s)$ admits analytic continuation into the complex plane, with singularities (poles or branch points) that determine the asymptotic behavior of $f(t)$ as $t\to\infty$.

Prove that if all singularities of $F(s)$ satisfy $\operatorname{Re}(s)<0$, then $f(t)$ decays exponentially. Conversely, if $F(s)$ has a pole at $s=s_{0}$ with $\operatorname{Re}(s_{0})>0$, show that $f(t)$ grows at least as fast as $e^{\operatorname{Re}(s_{0})t}$.

*(Hint: Use the Bromwich integral and move the contour of integration. The asymptotic behavior is governed by the rightmost singularity.)*

<details>
<summary><strong>Expand Solution</strong></summary>

The Laplace transform $F(s)=\int_{0}^{\infty}f(t)e^{-st}\,dt$ converges absolutely for $\operatorname{Re}(s)>\sigma_{0}$, where $\sigma_{0}$ is the abscissa of convergence. By Morera's theorem, $F(s)$ is analytic in this half-plane.

To analytically continue $F(s)$, we can move the contour of integration in the inverse transform. The inverse is given by the Bromwich integral:

$$
f(t)=\frac{1}{2\pi i}\int_{\gamma-i\infty}^{\gamma+i\infty}F(s)e^{st}\,ds,
$$

where $\gamma>\sigma_{0}$. If we can deform this contour to the left, we may encounter singularities of $F(s)$. By the residue theorem, each pole contributes a term $e^{s_{0}t}$ times its residue.

If all singularities satisfy $\operatorname{Re}(s)<0$, then the contour can be moved arbitrarily far to the left, and the contribution from the vertical line at large negative $\operatorname{Re}(s)$ is exponentially small. The only contributions come from residues at poles with negative real part, all of which decay exponentially.

Conversely, if there is a pole at $s=s_{0}$ with $\operatorname{Re}(s_{0})>0$, then the contour cannot be moved past this pole without picking up its residue. The residue contributes a term growing as $e^{s_{0}t}$, establishing the growth rate.

**Key Insights:**
- The asymptotic behavior of $f(t)$ is determined by the rightmost singularity of $F(s)$.
- Poles represent exponential modes, while branch points can give algebraic or logarithmic behavior.
- This connection between singularities and asymptotics is fundamental to stability analysis.

</details>

### Challenge 2: Uncertainty Principle and the Paley–Wiener Theorem

Prove the Heisenberg uncertainty principle: for any $f\in L^{2}(\mathbb{R})$ with $\|f\|_{2}=1$,

$$
\Delta x\,\Delta \xi \geq \frac{1}{4\pi},
$$

where $\Delta x^{2}=\int x^{2}\mid f(x)\mid^{2}\,dx$ and $\Delta \xi^{2}=\int \xi^{2}\mid \hat{f}(\xi)\mid^{2}\,d\xi$.

Then show that equality holds if and only if $f$ is a Gaussian. Use this to prove a special case of the Paley–Wiener theorem: if $f$ has compact support on $[-R,R]$, then $\hat{f}(\xi)$ is an entire function of exponential type $2\pi R$.

<details>
<summary><strong>Expand Solution</strong></summary>

To prove the uncertainty principle, we use the Cauchy–Schwarz inequality and integration by parts. Define the variance operators:

$$
\Delta x^{2}=\int_{-\infty}^{\infty}(x-\bar{x})^{2}\mid f(x)\mid^{2}\,dx, \quad \Delta \xi^{2}=\int_{-\infty}^{\infty}(\xi-\bar{\xi})^{2}\mid \hat{f}(\xi)\mid^{2}\,d\xi,
$$

where $\bar{x}$ and $\bar{\xi}$ are the mean positions. Without loss of generality, we can translate $f$ so that $\bar{x}=\bar{\xi}=0$.

Using the fact that $\mathcal{F}\{xf(x)\}(\xi)=\frac{i}{2\pi}\hat{f}'(\xi)$ and $\mathcal{F}\{f'(x)\}(\xi)=2\pi i\xi\hat{f}(\xi)$, we have:

$$
\Delta x^{2}\Delta \xi^{2} = \int x^{2}\mid f\mid^{2}\,dx \int \xi^{2}\mid \hat{f}\mid^{2}\,d\xi = \frac{1}{(2\pi)^{2}}\int x^{2}\mid f\mid^{2}\,dx \int \mid \hat{f}'\mid^{2}\,d\xi.
$$

By Plancherel's theorem, $\int \mid \hat{f}'\mid^{2}\,d\xi = (2\pi)^{2}\int \mid f'\mid^{2}\,dx$. Applying the Cauchy–Schwarz inequality to $\int x^{2}\mid f\mid^{2}\,dx \int \mid f'\mid^{2}\,dx$ and using integration by parts yields the inequality, with equality when $f$ is proportional to a Gaussian.

For the Paley–Wiener theorem, if $f(x)=0$ for $\mid x\mid>R$, then:

$$
\hat{f}(\xi)=\int_{-R}^{R}f(x)e^{-2\pi i x\xi}\,dx.
$$

This integral defines an entire function because the integrand is entire in $\xi$. Moreover, $\mid \hat{f}(\xi)\mid \leq \|f\|_{1}e^{2\pi R\mid \operatorname{Im}(\xi)\mid}$, so $\hat{f}$ has exponential type $2\pi R$.

**Key Insights:**
- The uncertainty principle reflects a fundamental limitation on simultaneous localization.
- The Gaussian minimizes uncertainty, making it a natural choice for many applications.
- Compact support in space forces the Fourier transform to be entire, with growth controlled by the support size.

</details>

### Challenge 3: Green's Function and the Method of Images

For the half-space problem $-\Delta u=f$ in $\mathbb{R}^{n}_{+}=\{x_{n}>0\}$ with Dirichlet boundary condition $u=0$ on $\{x_{n}=0\}$, derive the Green's function using the method of images.

Show that the Green's function is

$$
G(\mathbf{x},\boldsymbol{\xi})=E(\mathbf{x}-\boldsymbol{\xi})-E(\mathbf{x}-\boldsymbol{\xi}^{*}),
$$

where $E(\mathbf{x})=\frac{1}{(n-2)\omega_{n}\mid \mathbf{x}\mid^{n-2}}$ is the fundamental solution of $-\Delta$ in $\mathbb{R}^{n}$ for $n>2$, and $\boldsymbol{\xi}^{*}$ is the reflection of $\boldsymbol{\xi}$ across the boundary.

Use this to solve the Dirichlet problem for Laplace's equation in the half-space.

<details>
<summary><strong>Expand Solution</strong></summary>

The fundamental solution $E(\mathbf{x})$ satisfies $-\Delta E=\delta(\mathbf{x})$ and is radially symmetric. For the half-space, we want $G(\mathbf{x},\boldsymbol{\xi})$ such that $-\Delta G=\delta(\mathbf{x}-\boldsymbol{\xi})$ and $G=0$ on $x_{n}=0$.

The method of images places an image "charge" at $\boldsymbol{\xi}^{*}=(\xi_{1},\ldots,\xi_{n-1},-\xi_{n})$, the reflection of $\boldsymbol{\xi}$ across the plane $x_{n}=0$. The candidate Green's function is:

$$
G(\mathbf{x},\boldsymbol{\xi})=E(\mathbf{x}-\boldsymbol{\xi})-E(\mathbf{x}-\boldsymbol{\xi}^{*}).
$$

By linearity, $-\Delta G=\delta(\mathbf{x}-\boldsymbol{\xi})-\delta(\mathbf{x}-\boldsymbol{\xi}^{*})$. The second delta is supported at $\boldsymbol{\xi}^{*}$, which is outside the domain $\mathbb{R}^{n}_{+}$ (since $\xi_{n}^{*}<0$). However, we must verify that the boundary condition is satisfied.

On the boundary $x_{n}=0$, we have:

$$
G((x_{1},\ldots,x_{n-1},0),\boldsymbol{\xi})=E((x_{1}-\xi_{1},\ldots,x_{n-1}-\xi_{n-1},-\xi_{n}))-E((x_{1}-\xi_{1},\ldots,x_{n-1}-\xi_{n-1},+\xi_{n})).
$$

Since $E$ depends only on $\mid \mathbf{x}\mid$ and both terms have the same distance from their respective source points, they cancel: $\mid (x_{1}-\xi_{1},\ldots,-\xi_{n})\mid = \mid (x_{1}-\xi_{1},\ldots,+\xi_{n})\mid$ when $x_{n}=0$. Thus $G=0$ on the boundary.

The solution to $-\Delta u=f$ with $u=0$ on the boundary is:

$$
u(\mathbf{x})=\int_{\mathbb{R}^{n}_{+}}G(\mathbf{x},\boldsymbol{\xi})f(\boldsymbol{\xi})\,d\boldsymbol{\xi}.
$$

**Key Insights:**
- The method of images constructs Green's functions by placing fictitious sources outside the domain.
- The image charge cancels the boundary values of the fundamental solution.
- This method works for symmetric domains (half-spaces, balls, etc.) but not for general geometries.

</details>

### Challenge 4: Neumann Series and Spectral Radius

Consider the integral equation $u(x)=f(x)+\lambda\int_{a}^{b}K(x,y)u(y)\,dy$ where $K(x,y)$ is a continuous kernel on $[a,b]\times[a,b]$.

Prove that the Neumann series $u=\sum_{n=0}^{\infty}\lambda^{n}K^{n}f$ converges in $L^{2}([a,b])$ provided $\mid \lambda\mid < 1/r(K)$, where $r(K)$ is the spectral radius of the integral operator $K$.

Show that $r(K) \leq \|K\|_{2}$ where $\|K\|_{2}$ is the $L^{2}$ operator norm, and derive a bound in terms of $\sup_{x,y}\mid K(x,y)\mid$ and the interval length.

<details>
<summary><strong>Expand Solution</strong></summary>

The integral operator $(Ku)(x)=\int_{a}^{b}K(x,y)u(y)\,dy$ is bounded on $L^{2}([a,b])$ if $K$ is continuous. The operator norm is:

$$
\|K\|_{2}=\sup_{\|u\|_{2}=1}\|Ku\|_{2}.
$$

By the Cauchy–Schwarz inequality:

$$
\|Ku\|_{2}^{2}=\int_{a}^{b}\left|\int_{a}^{b}K(x,y)u(y)\,dy\right|^{2}dx \leq \int_{a}^{b}\left(\int_{a}^{b}\mid K(x,y)\mid^{2}dy\right)\|u\|_{2}^{2}dx.
$$

Thus $\|K\|_{2} \leq (b-a)\sup_{x,y}\mid K(x,y)\mid$.

The spectral radius satisfies $r(K)=\lim_{n\to\infty}\|K^{n}\|_{2}^{1/n}$. Since $\|K^{n}\|_{2} \leq \|K\|_{2}^{n}$, we have $r(K) \leq \|K\|_{2}$.

For the Neumann series $u=\sum_{n=0}^{\infty}\lambda^{n}K^{n}f$, we need $\|\lambda K\|_{2}<1$ for convergence. A stronger condition is $\mid \lambda\mid < 1/r(K)$.

If $\mid \lambda\mid < 1/r(K)$, then for sufficiently large $n$, $\|\lambda^{n}K^{n}\|_{2}^{1/n} < 1$, so the series converges absolutely in $L^{2}$.

The bound on $r(K)$ gives a sufficient condition: if $\mid \lambda\mid < 1/[(b-a)\sup_{x,y}\mid K(x,y)\mid]$, the Neumann series converges.

**Key Insights:**
- The spectral radius controls the convergence of the Neumann series.
- The operator norm provides an upper bound but may overestimate the spectral radius.
- For continuous kernels, the Neumann series converges for small enough $\lambda$.

</details>

Integral transforms mark the first encounter with spectral representations. By trading differentiation for multiplication they hint at the functional analytic machinery developed in Chapter 2, where operators on Hilbert and Banach spaces are diagonalized abstractly, distribution theory legitimizes the Dirac delta, and semigroup theory formalizes the Laplace-domain stability criteria encountered here.

However, these transform methods are limited by convergence requirements: the Laplace transform needs exponential growth control, the Fourier transform requires $L^{1}$ or $L^{2}$ regularity, and Green's functions rely heuristically on the Dirac delta without rigorous distribution theory. The failure to handle general initial data, non-integrable functions, or products of distributions exposes the need for the generalized calculus of distributions, Sobolev spaces, and abstract spectral theory developed in Chapter 2 and beyond.

## References

* **Folland, G. B. (1999).** *Real Analysis: Modern Techniques and Their Applications*. Wiley.
* **Reed, M., & Simon, B. (1972).** *Methods of Modern Mathematical Physics, Vol. I: Functional Analysis*. Academic Press.
* **Rudin, W. (1987).** *Real and Complex Analysis*. McGraw–Hill.
* **Stein, E. M., & Shakarchi, R. (2003).** *Fourier Analysis: An Introduction*. Princeton University Press.
* **Whittaker, E. T., & Watson, G. N. (1927).** *A Course of Modern Analysis*. Cambridge University Press.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 1.2 Special Functions of Mathematical Physics]({{ '/diffequations/chapter-01/01-2-special-functions/' | relative_url }})
- [Next Section: 1.4 Classical Linear Partial Differential Equations]({{ '/diffequations/chapter-01/01-4-linear-pde/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-01/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
