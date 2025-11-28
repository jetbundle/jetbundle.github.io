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

## Introduction

We trade differential complexity for algebraic simplicity. The **Laplace** and **Fourier Transforms** are presented as diagonalizing operators. We construct **Green's Functions** to solve inhomogeneous linear problems, introducing the Dirac delta as a heuristic tool. The limitation exposed here is convergence: for general initial data, the inverse transform integrals may not converge in any classical sense, hinting at the need for a generalized calculus.

## Mathematical Content

### The Laplace Transform

For initial value problems constrained by causality ($f(t)=0$ for $t<0$) the Laplace transform maps real time to complex frequency:

$$
\mathcal{L}\{f\}(s)=F(s)=\int_{0}^{\infty}f(t)e^{-st}\,dt.
$$

If $f$ is locally integrable on $[0,\infty)$ and satisfies $\left|f(t)\right|\leq M e^{\sigma t}$, then $F$ is analytic for $\operatorname{Re}(s)>\sigma$. Integration by parts algebraizes differentiation:

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

### The Fourier Transform

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
\|f\|_{L^{2}}^{2}=\int_{-\infty}^{\infty}\left|f(x)\right|^{2}\,dx=\int_{-\infty}^{\infty}\left|\hat{f}(\xi)\right|^{2}\,d\xi=\|\hat{f}\|_{L^{2}}^{2}.
$$

Differentiation becomes multiplication,

$$
\mathcal{F}\{f'\}(\xi)=2\pi i\xi \hat{f}(\xi),
$$

so smooth signals decay rapidly in frequency, while compact spatial support forces entire transforms with prescribed growth. The Heisenberg uncertainty relation states

$$
\Delta x\,\Delta \xi \geq \frac{1}{4\pi},
$$

where the variances are defined using $\left|f\right|^{2}$ and $\left|\hat{f}\right|^{2}$. The Paley–Wiener theorem refines this by linking compact support to entire functions of exponential type.

### Green's Functions and Resolvent Kernels

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

### Mellin, Hankel, and Additional Transforms

Symmetries beyond translation require different kernels. The Mellin transform,

$$
\mathcal{M}\{f\}(s)=\int_{0}^{\infty}x^{s-1}f(x)\,dx,
$$

diagonalizes dilation operators by mapping $x\dfrac{d}{dx}$ to $-s$. Euler–Cauchy equations and asymptotic scaling analyses thus become algebraic problems in $s$. Radial geometries prefer Hankel transforms with Bessel kernels; for order zero

$$
\mathcal{H}\{u\}(\kappa)=\int_{0}^{\infty}r J_{0}(\kappa r)u(r)\,dr,
$$

which diagonalizes the radial Laplacian and produces exact solutions for cylindrically symmetric PDEs.

### Limits of Explicit Transforms

Transform methods require integrability or growth control: the Laplace transform presumes exponential order, the Fourier transform requires at least $L^{1}$ or $L^{2}$ regularity, and Green's functions lean on distributions such as the Dirac delta. Products like $\delta^{2}$ are meaningless in classical spaces, underscoring why Chapter 2 introduces distributions, Sobolev spaces, and spectral theory to extend these heuristics rigorously.

## Connections to Chapter Narrative

Integral transforms mark the first encounter with spectral representations. By trading differentiation for multiplication they hint at the functional analytic machinery developed in Chapter 2, where operators on Hilbert and Banach spaces are diagonalized abstractly, distribution theory legitimizes the Dirac delta, and semigroup theory formalizes the Laplace-domain stability criteria encountered here.

## References

* **Folland, G. B. (1999).** *Real Analysis: Modern Techniques and Their Applications*. Wiley.
* **Reed, M., & Simon, B. (1972).** *Methods of Modern Mathematical Physics, Vol. I: Functional Analysis*. Academic Press.
* **Rudin, W. (1987).** *Real and Complex Analysis*. McGraw–Hill.
* **Stein, E. M., & Shakarchi, R. (2003).** *Fourier Analysis: An Introduction*. Princeton University Press.
* **Whittaker, E. T., & Watson, G. N. (1927).** *A Course of Modern Analysis*. Cambridge University Press.

## Complete Examples

### Example 1.3.1: Laplace Transform of a Damped Oscillator

**Problem:** Solve $y''+4y'+5y=0$ with $y(0)=1$ and $y'(0)=0$.

Taking Laplace transforms produces

$$
\mathcal{L}\{y''\}+4\mathcal{L}\{y'\}+5\mathcal{L}\{y\}=0,
$$

and the differentiation rules insert the initial data:

$$
\left[s^{2}Y(s)-sy(0)-y'(0)\right]+4\left[sY(s)-y(0)\right]+5Y(s)=0.
$$

Substituting $y(0)=1$ and $y'(0)=0$ yields $(s^{2}+4s+5)Y(s)=s+4$, so

$$
Y(s)=\frac{s+4}{(s+2)^{2}+1}=\frac{s+2}{(s+2)^{2}+1}+\frac{2}{(s+2)^{2}+1}.
$$

Inverting term by term gives $y(t)=e^{-2t}\cos t+2e^{-2t}\sin t$. Evaluating at $t=0$ reproduces $y(0)=1$ and $y'(0)=0$, so the transformed solution matches the initial data.

### Example 1.3.2: Convolution Solution of an Inhomogeneous Oscillator

**Problem:** Solve $y''+y=\sin(2t)$ with $y(0)=0$ and $y'(0)=1$.

Laplace transforming leads to

$$
(s^{2}+1)Y(s)-s y(0)-y'(0)=\frac{2}{s^{2}+4},
$$

so $Y(s)=\dfrac{s+1}{s^{2}+1}+\dfrac{2}{(s^{2}+1)(s^{2}+4)}$. The first term inverts to the homogeneous response $\cos t$, while the second term becomes a convolution:

$$
y_{p}(t)=\int_{0}^{t}\sin(\tau)\sin\bigl(2(t-\tau)\bigr)\,d\tau.
$$

Using $\sin A \sin B=\tfrac{1}{2}\left[\cos(A-B)-\cos(A+B)\right]$ reduces the integral to elementary sines, giving $y_{p}(t)=\tfrac{2}{3}\sin t$. The complete solution

$$
y(t)=\cos t+\frac{2}{3}\sin t
$$

satisfies both the differential equation and the initial conditions.

### Example 1.3.3: Bromwich Inversion by Residues

**Problem:** Invert $Y(s)=\dfrac{e^{-3s}}{s^{2}+2s+5}$.

The quadratic denominator has poles at $s=-1\pm 2i$. Choose a Bromwich line $\operatorname{Re}(s)=\gamma>0$ and close the contour in the left half-plane for $t>3$, where the exponential factor enforces a unit-step delay. The residues are

$$
\operatorname{Res}_{-1\pm 2i}\left(Y(s)e^{st}\right)=\frac{e^{-3(-1\pm 2i)}e^{t(-1\pm 2i)}}{4i}.
$$

Summing the residues yields

$$
f(t)=e^{3-t}\sin\bigl(2(t-3)\bigr)H(t-3),
$$

where $H$ is the Heaviside step function. The solution activates exactly three time units after $t=0$, mirroring the exponential shift $e^{-3s}$ in the Laplace domain.

### Example 1.3.4: Gaussian Fourier Transform and Plancherel

**Problem:** Compute $\mathcal{F}\{e^{-\pi x^{2}}\}(\xi)$.

Completing the square in the exponent,

$$
-\pi x^{2}-2\pi i x\xi=-\pi\left[(x+i\xi)^{2}+\xi^{2}\right],
$$

so

$$
\hat{f}(\xi)=e^{-\pi \xi^{2}}\int_{-\infty}^{\infty}e^{-\pi (x+i\xi)^{2}}\,dx=e^{-\pi \xi^{2}}.
$$

The Gaussian is self-reciprocal under the Fourier transform. Moreover,

$$
\int_{-\infty}^{\infty}\left|e^{-\pi x^{2}}\right|^{2}\,dx=\int_{-\infty}^{\infty}\left|e^{-\pi \xi^{2}}\right|^{2}\,d\xi=\frac{1}{\sqrt{2}},
$$

confirming Plancherel’s theorem for this prototype.

### Example 1.3.5: Rectangular Pulse and the Uncertainty Principle

**Problem:** Let $f(x)=\mathbf{1}_{[-1,1]}(x)$. Compute its Fourier transform and verify the uncertainty inequality.

Integrating directly gives

$$
\hat{f}(\xi)=\int_{-1}^{1}e^{-2\pi i x\xi}\,dx=\frac{\sin(2\pi \xi)}{\pi \xi}=\operatorname{sinc}(2\xi).
$$

The spatial variance equals $\Delta x^{2}=\int_{-1}^{1}x^{2}\,dx=\tfrac{2}{3}$, so $\Delta x=\sqrt{1/3}$. Parseval’s identity evaluates $\Delta \xi$ numerically via $\int \xi^{2}\left|\hat{f}(\xi)\right|^{2}\,d\xi$, producing $\Delta \xi\approx 0.882$. The product $\Delta x\,\Delta \xi\approx 0.509$ exceeds $\tfrac{1}{4\pi}$, illustrating that hard spatial localization forces spectral spread.

### Example 1.3.6: Heat Equation via Fourier Transform

**Problem:** Solve $u_{t}=u_{xx}$ with $u(x,0)=e^{-x^{2}/4}$.

Fourier transforming in $x$ provides $\partial_{t}\hat{u}(\xi,t)=-4\pi^{2}\xi^{2}\hat{u}(\xi,t)$ and the initial data $\hat{u}(\xi,0)=2\sqrt{\pi}e^{-4\pi^{2}\xi^{2}}$. The transformed ODE integrates to

$$
\hat{u}(\xi,t)=2\sqrt{\pi}e^{-4\pi^{2}\xi^{2}(1+t)}.
$$

Inverting the transform yields

$$
u(x,t)=\sqrt{\frac{4\pi}{1+4t}}\exp\left(-\frac{x^{2}}{1+4t}\right),
$$

showing Gaussian spreading with conserved total mass.

### Example 1.3.7: Sturm–Liouville Green's Function

**Problem:** Construct the Green's function for $-y''+x^{2}y=f(x)$ on $[-1,1]$ with $y(\pm 1)=0$.

Let $\phi_{1}(x)=\int_{-1}^{x}e^{-t^{3}/3}\,dt$ enforce the left boundary and $\phi_{2}(x)=\int_{x}^{1}e^{t^{3}/3}\,dt$ enforce the right boundary. Their Wronskian is one, so

$$
G(x,\xi)=
\begin{cases}
\phi_{1}(x)\phi_{2}(\xi), & x<\xi,\\
\phi_{1}(\xi)\phi_{2}(x), & x>\xi,
\end{cases}
$$

satisfies the boundary conditions and reproduces the delta source through the jump in $\partial_{x}G$. The solution becomes $u(x)=\int_{-1}^{1}G(x,\xi)f(\xi)\,d\xi$.

### Example 1.3.8: Method of Images for Dirichlet Data

**Problem:** Solve $\Delta u=0$ in the unit disk with $u(1,\theta)=\cos(3\theta)$.

The Poisson kernel

$$
P(r,\theta-\phi)=\frac{1-r^{2}}{1-2r\cos(\theta-\phi)+r^{2}}
$$

expands boundary data into harmonic modes. Since $\cos(3\theta)$ selects the $n=3$ Fourier mode, the interior solution is $u(r,\theta)=r^{3}\cos(3\theta)$. This matches the method-of-images viewpoint: the image charges outside the disk cancel the boundary data, and the resulting harmonic function satisfies both the Laplace equation and the boundary values.

### Example 1.3.9: Neumann Series for an Integral Equation

**Problem:** Solve $u(x)=f(x)+\lambda\int_{0}^{1}xye^{-xy}u(y)\,dy$ with $\lambda=0.1$ and $f(x)=1$.

Writing $u=(I-\lambda K)^{-1}f$ with $(Ku)(x)=\int_{0}^{1}xye^{-xy}u(y)\,dy$, the Neumann series converges because $\lambda\|K\|<1$. The first iterate gives

$$
u_{1}(x)=1+\lambda\int_{0}^{1}xye^{-xy}\,dy=1+0.1\bigl(1-e^{-x}\bigr),
$$

already capturing the primary correction. Spectral radius estimates show convergence for $\left|\lambda\right|<1/e$, so summing the series delivers the full solution.

### Example 1.3.10: Mellin Transform of an Euler–Cauchy Equation

**Problem:** Solve $x^{2}y''+3xy'-3y=0$ using the Mellin transform.

Applying $\mathcal{M}$ gives

$$
s(s-1)Y(s)+3sY(s)-3Y(s)=0,
$$

so $(s^{2}+2s-3)Y(s)=0$ with roots $s=1$ and $s=-3$. Inverting via residues on vertical lines produces

$$
y(x)=Ax+Bx^{-3},
$$

which indeed satisfies the differential equation, showcasing how Mellin transforms diagonalize dilation operators.

### Example 1.3.11: Radial Helmholtz Equation via Hankel Transform

**Problem:** Solve $\Delta u+k^{2}u=0$ in $\mathbb{R}^{2}$ under radial symmetry.

The order-zero Hankel transform

$$
\tilde{u}(\kappa)=\int_{0}^{\infty}r J_{0}(\kappa r)u(r)\,dr
$$

maps the radial Laplacian to multiplication by $-\kappa^{2}$, so the transformed equation is $(-\kappa^{2}+k^{2})\tilde{u}(\kappa)=0$. The only distributional solutions are multiples of $\delta(\kappa-k)$, hence

$$
u(r)=A k J_{0}(kr),
$$

which represents a cylindrical wave satisfying the Helmholtz equation.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 1.2 Special Functions of Mathematical Physics]({{ '/diffequations/chapter-01/01-2-special-functions/' | relative_url }})
- [Next Section: 1.4 Classical Linear Partial Differential Equations]({{ '/diffequations/chapter-01/01-4-linear-pde/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-01/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
