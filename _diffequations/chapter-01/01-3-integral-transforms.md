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
We trade differential complexity for algebraic simplicity: integral transforms diagonalize differentiation, converting calculus into algebra.

## Introduction

We trade differential complexity for algebraic simplicity. The **Laplace** and **Fourier Transforms** are presented as diagonalizing operators. We construct **Green's Functions** to solve inhomogeneous linear problems, introducing the Dirac delta as a heuristic tool. The limitation exposed here is convergence: for general initial data, the inverse transform integrals may not converge in any classical sense, hinting at the need for a generalized calculus.

## The Laplace Transform

For initial value problems constrained by causality ($f(t)=0$ for $t<0$) the Laplace transform maps real time to complex frequency:

$$
\mathcal{L}\{f\}(s)=F(s)=\int_{0}^{\infty}f(t)e^{-st}\,dt.
$$

If $f$ is locally integrable on $[0,\infty)$ and satisfies $\vert f(t) \vert \leq M e^{\sigma t}$, then $F$ is analytic for $\operatorname{Re}(s)>\sigma$. Integration by parts algebraizes differentiation:

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

**Laplace Transform of a Damped Oscillator**

Solve $y''+4y'+5y=0$ with $y(0)=1$ and $y'(0)=0$.

Taking Laplace transforms produces

$$
\mathcal{L}\{y''\}+4\mathcal{L}\{y'\}+5\mathcal{L}\{y\}=0,
$$

and the differentiation rules insert the initial data:

$$
[s^{2}Y(s)-sy(0)-y'(0)]+4[sY(s)-y(0)]+5Y(s)=0.
$$

Substituting $y(0)=1$ and $y'(0)=0$ yields $(s^{2}+4s+5)Y(s)=s+4$, so

$$
Y(s)=\frac{s+4}{(s+2)^{2}+1}=\frac{s+2}{(s+2)^{2}+1}+\frac{2}{(s+2)^{2}+1}.
$$

Inverting term by term gives $y(t)=e^{-2t}\cos t+2e^{-2t}\sin t$. Evaluating at $t=0$ reproduces $y(0)=1$ and $y'(0)=0$, so the transformed solution matches the initial data.

The Laplace transform automatically incorporates initial conditions into the algebraic problem, eliminating the need for separate constant determination. The pole locations at $s=-2\pm i$ directly encode the frequency and damping rate of the oscillator.

**Convolution Solution of an Inhomogeneous Oscillator**

Solve $y''+y=\sin(2t)$ with $y(0)=0$ and $y'(0)=1$.

Laplace transforming leads to

$$
(s^{2}+1)Y(s)-s y(0)-y'(0)=\frac{2}{s^{2}+4},
$$

so $Y(s)=\dfrac{s+1}{s^{2}+1}+\dfrac{2}{(s^{2}+1)(s^{2}+4)}$. The first term inverts to the homogeneous response $\cos t$, while the second term becomes a convolution:

$$
y_{p}(t)=\int_{0}^{t}\sin(\tau)\sin(2(t-\tau))\,d\tau.
$$

Using $\sin A \sin B=\tfrac{1}{2}[\cos(A-B)-\cos(A+B)]$ reduces the integral to elementary sines, giving $y_{p}(t)=\tfrac{2}{3}\sin t$. The complete solution

$$
y(t)=\cos t+\frac{2}{3}\sin t
$$

satisfies both the differential equation and the initial conditions.

Convolution represents the system's response to external forcing. The Laplace transform converts this integral into a simple product, making the solution structure transparent.

**Bromwich Inversion by Residues**

Invert $Y(s)=\dfrac{e^{-3s}}{s^{2}+2s+5}$.

The quadratic denominator has poles at $s=-1\pm 2i$. Choose a Bromwich line $\operatorname{Re}(s)=\gamma>0$ and close the contour in the left half-plane for $t>3$, where the exponential factor enforces a unit-step delay. The residues are

$$
\operatorname{Res}_{-1\pm 2i}(Y(s)e^{st})=\frac{e^{-3(-1\pm 2i)}e^{t(-1\pm 2i)}}{4i}.
$$

Summing the residues yields

$$
f(t)=e^{3-t}\sin(2(t-3))H(t-3),
$$

where $H$ is the Heaviside step function. The solution activates exactly three time units after $t=0$, mirroring the exponential shift $e^{-3s}$ in the Laplace domain.

The Bromwich integral reveals that inversion is fundamentally a contour integration problem. The exponential shift $e^{-3s}$ produces a time delay, demonstrating how Laplace transforms encode causality.

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
\|f\|_{L^{2}}^{2}=\int_{-\infty}^{\infty}\vert f(x) \vert^{2}\,dx=\int_{-\infty}^{\infty}\vert \hat{f}(\xi) \vert^{2}\,d\xi=\|\hat{f}\|_{L^{2}}^{2}.
$$

Differentiation becomes multiplication,

$$
\mathcal{F}\{f'\}(\xi)=2\pi i\xi \hat{f}(\xi),
$$

so smooth signals decay rapidly in frequency, while compact spatial support forces entire transforms with prescribed growth. The Heisenberg uncertainty relation states

$$
\Delta x\,\Delta \xi \geq \frac{1}{4\pi},
$$

where the variances are defined using $\vert f \vert^{2}$ and $\vert \hat{f} \vert^{2}$. The Paley–Wiener theorem refines this by linking compact support to entire functions of exponential type.

**Gaussian Fourier Transform and Plancherel**

Compute $\mathcal{F}\{e^{-\pi x^{2}}\}(\xi)$.

Completing the square in the exponent,

$$
-\pi x^{2}-2\pi i x\xi=-\pi[(x+i\xi)^{2}+\xi^{2}],
$$

so

$$
\hat{f}(\xi)=e^{-\pi \xi^{2}}\int_{-\infty}^{\infty}e^{-\pi (x+i\xi)^{2}}\,dx=e^{-\pi \xi^{2}}.
$$

The Gaussian is self-reciprocal under the Fourier transform. Moreover,

$$
\int_{-\infty}^{\infty}\vert e^{-\pi x^{2}} \vert^{2}\,dx=\int_{-\infty}^{\infty}\vert e^{-\pi \xi^{2}} \vert^{2}\,d\xi=\frac{1}{\sqrt{2}},
$$

confirming Plancherel's theorem for this prototype.

The Gaussian is the fixed point of the Fourier transform, representing perfect balance between localization in space and frequency. This property makes it fundamental in both quantum mechanics and signal processing.

**Rectangular Pulse and the Uncertainty Principle**

Let $f(x)=\mathbf{1}_{[-1,1]}(x)$. Compute its Fourier transform and verify the uncertainty inequality.

Integrating directly gives

$$
\hat{f}(\xi)=\int_{-1}^{1}e^{-2\pi i x\xi}\,dx=\frac{\sin(2\pi \xi)}{\pi \xi}=\operatorname{sinc}(2\xi).
$$

The spatial variance equals $\Delta x^{2}=\int_{-1}^{1}x^{2}\,dx=\tfrac{2}{3}$, so $\Delta x=\sqrt{1/3}$. Parseval's identity evaluates $\Delta \xi$ numerically via $\int \xi^{2}\vert \hat{f}(\xi) \vert^{2}\,d\xi$, producing $\Delta \xi\approx 0.882$. The product $\Delta x\,\Delta \xi\approx 0.509$ exceeds $\tfrac{1}{4\pi}$, illustrating that hard spatial localization forces spectral spread.

The uncertainty principle is not merely a quantum mechanical curiosity—it reflects the fundamental trade-off between localization in space and frequency. Compact support necessarily creates slow decay in the frequency domain.

**Heat Equation via Fourier Transform**

Solve $u_{t}=u_{xx}$ with $u(x,0)=e^{-x^{2}/4}$.

Fourier transforming in $x$ provides $\partial_{t}\hat{u}(\xi,t)=-4\pi^{2}\xi^{2}\hat{u}(\xi,t)$ and the initial data $\hat{u}(\xi,0)=2\sqrt{\pi}e^{-4\pi^{2}\xi^{2}}$. The transformed ODE integrates to

$$
\hat{u}(\xi,t)=2\sqrt{\pi}e^{-4\pi^{2}\xi^{2}(1+t)}.
$$

Inverting the transform yields

$$
u(x,t)=\sqrt{\frac{4\pi}{1+4t}}\exp(-\frac{x^{2}}{1+4t}),
$$

showing Gaussian spreading with conserved total mass.

The Fourier transform diagonalizes the Laplacian, converting the heat equation into a family of decoupled ODEs. Each frequency mode decays independently, with higher frequencies decaying faster—the physical basis of diffusion.

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

**Sturm–Liouville Green's Function**

Construct the Green's function for $-y''+x^{2}y=f(x)$ on $[-1,1]$ with $y(\pm 1)=0$.

Let $\phi_{1}(x)=\int_{-1}^{x}e^{-t^{3}/3}\,dt$ enforce the left boundary and $\phi_{2}(x)=\int_{x}^{1}e^{t^{3}/3}\,dt$ enforce the right boundary. Their Wronskian is one, so

$$
G(x,\xi)=
\begin{cases}
\phi_{1}(x)\phi_{2}(\xi), & x<\xi,\\
\phi_{1}(\xi)\phi_{2}(x), & x>\xi,
\end{cases}
$$

satisfies the boundary conditions and reproduces the delta source through the jump in $\partial_{x}G$. The solution becomes $u(x)=\int_{-1}^{1}G(x,\xi)f(\xi)\,d\xi$.

Green's functions encode both the differential operator and the boundary conditions into a single kernel. The discontinuity in the derivative at $x=\xi$ creates the delta function source, while the boundary conditions are built into the construction of $\phi_1$ and $\phi_2$.

**Method of Images for Dirichlet Data**

Solve $\Delta u=0$ in the unit disk with $u(1,\theta)=\cos(3\theta)$.

The Poisson kernel

$$
P(r,\theta-\phi)=\frac{1-r^{2}}{1-2r\cos(\theta-\phi)+r^{2}}
$$

expands boundary data into harmonic modes. Since $\cos(3\theta)$ selects the $n=3$ Fourier mode, the interior solution is $u(r,\theta)=r^{3}\cos(3\theta)$. This matches the method-of-images viewpoint: the image charges outside the disk cancel the boundary data, and the resulting harmonic function satisfies both the Laplace equation and the boundary values.

The method of images provides a geometric interpretation of Green's functions: boundary data is replaced by equivalent sources outside the domain. This elegant technique works only for symmetric domains, limiting its applicability.

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

**Mellin Transform of an Euler–Cauchy Equation**

Solve $x^{2}y''+3xy'-3y=0$ using the Mellin transform.

Applying $\mathcal{M}$ gives

$$
s(s-1)Y(s)+3sY(s)-3Y(s)=0,
$$

so $(s^{2}+2s-3)Y(s)=0$ with roots $s=1$ and $s=-3$. Inverting via residues on vertical lines produces

$$
y(x)=Ax+Bx^{-3},
$$

which indeed satisfies the differential equation, showcasing how Mellin transforms diagonalize dilation operators.

**Radial Helmholtz Equation via Hankel Transform**

Solve $\Delta u+k^{2}u=0$ in $\mathbb{R}^{2}$ under radial symmetry.

The order-zero Hankel transform

$$
\tilde{u}(\kappa)=\int_{0}^{\infty}r J_{0}(\kappa r)u(r)\,dr
$$

maps the radial Laplacian to multiplication by $-\kappa^{2}$, so the transformed equation is $(-\kappa^{2}+k^{2})\tilde{u}(\kappa)=0$. The only distributional solutions are multiples of $\delta(\kappa-k)$, hence

$$
u(r)=A k J_{0}(kr),
$$

which represents a cylindrical wave satisfying the Helmholtz equation.

Each transform is tailored to a specific symmetry: Fourier for translations, Mellin for dilations, Hankel for radial symmetry. The choice of transform reflects the underlying geometric structure of the problem.

## Challenge Problems

The following problems synthesize concepts from Laplace and Fourier transforms, Green's functions, and specialized transforms.

### Challenge 1: Convolution and System Response

Consider a system described by the differential equation $y'' + 2y' + 2y = f(t)$ with zero initial conditions. Using the Laplace transform, derive the impulse response function $h(t)$ and show that the solution for arbitrary forcing $f(t)$ can be written as a convolution $y(t) = (h * f)(t)$. Then compute the response to $f(t) = e^{-t} \sin t$ using both the convolution integral and direct Laplace inversion.

*(Hint: The impulse response is the solution when $f(t) = \delta(t)$. Use the convolution theorem and compare methods.)*

<details>
<summary><strong>Expand Solution</strong></summary>

Taking the Laplace transform of $y'' + 2y' + 2y = f(t)$ with zero initial conditions gives $(s^2 + 2s + 2)Y(s) = F(s)$, so the transfer function is

$$
H(s) = \frac{1}{s^2 + 2s + 2} = \frac{1}{(s+1)^2 + 1}.
$$

The impulse response is the inverse Laplace transform of $H(s)$:

$$
h(t) = \mathcal{L}^{-1}\{H(s)\} = e^{-t} \sin t \cdot H(t),
$$

where $H(t)$ is the Heaviside step function.

By the convolution theorem, the solution for arbitrary forcing is

$$
y(t) = (h * f)(t) = \int_0^t h(\tau) f(t-\tau) \, d\tau = \int_0^t e^{-\tau} \sin \tau \cdot f(t-\tau) \, d\tau.
$$

For $f(t) = e^{-t} \sin t$, we compute the convolution:

$$
y(t) = \int_0^t e^{-\tau} \sin \tau \cdot e^{-(t-\tau)} \sin(t-\tau) \, d\tau = e^{-t} \int_0^t \sin \tau \sin(t-\tau) \, d\tau.
$$

Using the identity $\sin A \sin B = \frac{1}{2}[\cos(A-B) - \cos(A+B)]$, we get

$$
y(t) = \frac{e^{-t}}{2} \int_0^t [\cos(2\tau - t) - \cos t] \, d\tau = \frac{e^{-t}}{2} [ \frac{\sin(2\tau - t)}{2} - \tau \cos t ]_0^t = \frac{e^{-t}}{4} [\sin t - 2t \cos t].
$$

Alternatively, taking the Laplace transform directly: $F(s) = \frac{1}{(s+1)^2 + 1}$, so

$$
Y(s) = \frac{1}{[(s+1)^2 + 1]^2}.
$$

Using partial fractions or convolution, we recover the same result.

The convolution representation elegantly separates the system dynamics—encoded in the impulse response $h(t)$—from the specific input $f(t)$. This form is fundamental to linear system theory and signal processing, where the response to any input can be constructed by convolving with the system's characteristic impulse response. The convolution theorem provides an efficient computational method by converting the convolution operation into simple multiplication in the Laplace domain, demonstrating the power of integral transforms for solving linear systems.

</details>

### Challenge 2: Uncertainty Principle and Wave Packets

Prove the Heisenberg uncertainty principle $\Delta x \cdot \Delta \xi \geq \frac{1}{4\pi}$ for any function $f \in L^2(\mathbb{R})$ with $\|f\|_{L^2} = 1$, where

$$
(\Delta x)^2 = \int_{-\infty}^{\infty} (x - \bar{x})^2 \vert f(x) \vert^2 \, dx, \quad \bar{x} = \int_{-\infty}^{\infty} x \vert f(x) \vert^2 \, dx,
$$

and similarly for $\Delta \xi$. Show that equality holds if and only if $f$ is a Gaussian. Use this to construct the optimal wave packet minimizing the uncertainty product.

*(Hint: Use the Cauchy–Schwarz inequality and the fact that differentiation in space corresponds to multiplication in frequency. Consider the function $g(x) = (x - \bar{x})f(x)$ and its Fourier transform.)*

<details>
<summary><strong>Expand Solution</strong></summary>

Without loss of generality, assume $\bar{x} = 0$ and $\bar{\xi} = 0$ by translation. We have

$$
(\Delta x)^2 = \int_{-\infty}^{\infty} x^2 \vert f(x) \vert^2 \, dx, \quad (\Delta \xi)^2 = \int_{-\infty}^{\infty} \xi^2 \vert \hat{f}(\xi) \vert^2 \, d\xi.
$$

By Plancherel's theorem, $\xi \hat{f}(\xi)$ is the Fourier transform of $\frac{1}{2\pi i} f'(x)$. The Cauchy–Schwarz inequality gives

$$
\vert \int_{-\infty}^{\infty} x \overline{f(x)} f'(x) \, dx \vert^2 \leq \int_{-\infty}^{\infty} x^2 \vert f(x) \vert^2 \, dx \cdot \int_{-\infty}^{\infty} \vert f'(x) \vert^2 \, dx.
$$

Integration by parts (with boundary terms vanishing for $f \in L^2$) yields

$$
\int_{-\infty}^{\infty} x \overline{f(x)} f'(x) \, dx = -\int_{-\infty}^{\infty} \overline{f'(x)} f(x) \, dx - \int_{-\infty}^{\infty} \vert f(x) \vert^2 \, dx = -\frac{1}{2} - \int_{-\infty}^{\infty} \vert f(x) \vert^2 \, dx,
$$

where we used $\int x (\overline{f} f')' = 0$. This gives

$$
\vert \int_{-\infty}^{\infty} x \overline{f(x)} f'(x) \, dx \vert = \frac{1}{2}.
$$

By Plancherel, $\int \vert f'(x) \vert^2 \, dx = 4\pi^2 \int \xi^2 \vert \hat{f}(\xi) \vert^2 \, d\xi = 4\pi^2 (\Delta \xi)^2$. Therefore,

$$
\frac{1}{4} \leq (\Delta x)^2 \cdot 4\pi^2 (\Delta \xi)^2,
$$

so $\Delta x \cdot \Delta \xi \geq \frac{1}{4\pi}$.

Equality holds when $xf(x)$ is proportional to $f'(x)$, leading to $f(x) = Ce^{-\alpha x^2}$ for some $\alpha > 0$, a Gaussian.

The optimal wave packet is the normalized Gaussian

$$
f(x) = (\frac{2\alpha}{\pi})^{1/4} e^{-\alpha x^2},
$$

with Fourier transform $\hat{f}(\xi) = (\frac{\pi}{2\alpha})^{1/4} e^{-\pi^2 \xi^2 / \alpha}$. The uncertainty product is exactly $\frac{1}{4\pi}$.

The uncertainty principle establishes a fundamental limitation on simultaneous localization in space and frequency: one cannot make both $\Delta x$ and $\Delta \xi$ arbitrarily small simultaneously. Gaussians achieve the optimal balance, minimizing the uncertainty product and saturating the inequality. This principle underlies both quantum mechanics, where it manifests as the Heisenberg uncertainty relation between position and momentum, and information theory, where it constrains the simultaneous localization of signals in time and frequency domains.

</details>

### Challenge 3: Green's Function for the Heat Equation

Construct the Green's function (fundamental solution) for the one-dimensional heat equation $u_t = u_{xx}$ on $\mathbb{R} \times (0,\infty)$ with initial condition $u(x,0) = \delta(x)$. Use both the Fourier transform method and the method of images. Then show that the solution for arbitrary initial data $u(x,0) = f(x)$ is given by convolution with this Green's function.

*(Hint: The Fourier transform in space converts the PDE to an ODE. The fundamental solution should satisfy the heat equation and approach $\delta(x)$ as $t \to 0^+$.)*

<details>
<summary><strong>Expand Solution</strong></summary>

Taking the Fourier transform in $x$ of $u_t = u_{xx}$ with $u(x,0) = \delta(x)$ gives

$$
\partial_t \hat{u}(\xi, t) = -4\pi^2 \xi^2 \hat{u}(\xi, t), \quad \hat{u}(\xi, 0) = 1.
$$

Solving this ODE yields

$$
\hat{u}(\xi, t) = e^{-4\pi^2 \xi^2 t}.
$$

Inverting the Fourier transform:

$$
G(x, t) = \int_{-\infty}^{\infty} e^{-4\pi^2 \xi^2 t} e^{2\pi i x \xi} \, d\xi = \frac{1}{\sqrt{4\pi t}} e^{-x^2/(4t)},
$$

for $t > 0$, and $G(x, t) = 0$ for $t < 0$.

This is the fundamental solution (heat kernel). It satisfies: $G_t = G_{xx}$ for $t > 0$; $\lim_{t \to 0^+} G(x, t) = \delta(x)$ (in the sense of distributions); and $\int_{-\infty}^{\infty} G(x, t) \, dx = 1$ for all $t > 0$.

For arbitrary initial data $u(x,0) = f(x)$, the solution is

$$
u(x, t) = \int_{-\infty}^{\infty} G(x - y, t) f(y) \, dy = \frac{1}{\sqrt{4\pi t}} \int_{-\infty}^{\infty} e^{-(x-y)^2/(4t)} f(y) \, dy.
$$

This convolution represents the superposition of fundamental solutions, each corresponding to an initial point source. The heat kernel $G(x, t)$ serves as the Green's function for the initial-value problem, providing the fundamental building block from which all solutions can be constructed. The convolution formula is a manifestation of both linearity and translation invariance of the heat equation: the response to an arbitrary initial distribution is simply the superposition of responses to point sources. The Gaussian form of the kernel reflects the diffusive nature of the heat equation, with the width growing as $\sqrt{t}$ as information spreads from the initial location.

</details>

### Challenge 4: Neumann Series and Volterra Equations

Consider the Volterra integral equation

$$
u(x) = f(x) + \lambda \int_0^x K(x, y) u(y) \, dy,
$$

where $K(x, y) = e^{x-y}$ and $f(x) = x$. Show that the Neumann series converges for all $\lambda \in \mathbb{C}$ and compute the first three terms explicitly. Then derive the resolvent kernel $R(x, y; \lambda)$ such that $u(x) = f(x) + \lambda \int_0^x R(x, y; \lambda) f(y) \, dy$ for the full solution.

*(Hint: The Volterra structure ensures convergence. Compute iterates $u_n(x) = f(x) + \lambda \int_0^x K(x, y) u_{n-1}(y) \, dy$ and identify the pattern. The resolvent satisfies a similar Volterra equation.)*

<details>
<summary><strong>Expand Solution</strong></summary>

Starting with $u_0(x) = f(x) = x$, we compute iterates:

$$
u_1(x) = x + \lambda \int_0^x e^{x-y} \cdot y \, dy = x + \lambda e^x \int_0^x y e^{-y} \, dy = x + \lambda e^x [1 - (1+x)e^{-x}] = x + \lambda(e^x - 1 - x).
$$

Continuing:

$$
u_2(x) = x + \lambda \int_0^x e^{x-y} u_1(y) \, dy = x + \lambda \int_0^x e^{x-y} [y + \lambda(e^y - 1 - y)] \, dy.
$$

Expanding and integrating, we find the pattern involves powers of $\lambda$ and exponential terms.

The resolvent kernel $R(x, y; \lambda)$ satisfies

$$
R(x, y; \lambda) = K(x, y) + \lambda \int_y^x K(x, z) R(z, y; \lambda) \, dz.
$$

For $K(x, y) = e^{x-y}$, we can solve this explicitly. Substituting $R(x, y; \lambda) = e^{x-y} \rho(x-y; \lambda)$ with $\rho$ depending only on the difference, we get

$$
\rho(s; \lambda) = 1 + \lambda \int_0^s \rho(\sigma; \lambda) \, d\sigma.
$$

This gives $\rho(s; \lambda) = e^{\lambda s}$, so

$$
R(x, y; \lambda) = e^{x-y} e^{\lambda(x-y)} = e^{(1+\lambda)(x-y)}.
$$

The full solution is

$$
u(x) = x + \lambda \int_0^x e^{(1+\lambda)(x-y)} \cdot y \, dy = x + \lambda e^{(1+\lambda)x} \int_0^x y e^{-(1+\lambda)y} \, dy.
$$

Evaluating the integral yields the explicit solution in terms of elementary functions.

Volterra equations always have convergent Neumann series due to their causal structure: the integration range $[0,x]$ prevents the accumulation of divergences that plague Fredholm equations. The resolvent kernel provides a closed-form representation of the solution, encoding all orders of the perturbation series in a single kernel function. This method extends naturally to systems and higher-dimensional problems, where the resolvent kernel generalizes to matrix-valued kernels or kernels depending on multiple variables, maintaining the same convergent structure provided the causal ordering is preserved.

</details>

Integral transforms mark the first encounter with spectral representations. By trading differentiation for multiplication they hint at the functional analytic machinery developed in Chapter 2, where operators on Hilbert and Banach spaces are diagonalized abstractly, distribution theory legitimizes the Dirac delta, and semigroup theory formalizes the Laplace-domain stability criteria encountered here.

However, the limitations are severe: transform methods require integrability or growth control (Laplace transform presumes exponential order, Fourier transform requires $L^1$ or $L^2$ regularity), Green's functions rely on distributions like the Dirac delta that are not functions in the classical sense, and products like $\delta^2$ are meaningless in classical spaces. These restrictions motivate the distributional framework, Sobolev spaces, and rigorous spectral theory of Chapter 2, which provides the mathematical foundation for these powerful but formally manipulated techniques.

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
