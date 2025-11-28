---
layout: textbook
title: "Section 2.1: Distributions & Test Functions"
description: "Redefining differentiation via duality"
permalink: /diffequations/chapter-02/02-1-distributions/
order: 2.1
chapter: 2
section: 1
nav_order: 2.1
is_chapter_index: false
parent_chapter: 2
parent_section: null
---

# Section 2.1: Distributions & Test Functions

## Introduction

We resolve the ambiguity of the delta function by redefining differentiation. By testing functions against smooth, compact "instruments" (Test Functions), we define **Distributions**. Differentiation becomes a duality operation, making every locally integrable function infinitely differentiable. This creates a rigorous home for the Green's functions and impulses of Chapter 1.3.
## Mathematical Content

### Test Functions

Let $\Omega \subset \mathbb{R}^{n}$ be open. The test-function space $\mathcal{D}(\Omega)=C_{c}^{\infty}(\Omega)$ consists of smooth functions with compact support. Its topology is the strict inductive limit of Fréchet spaces: choose compact exhaustion $K_{1}\subset K_{2}\subset \cdots \subset \Omega$, define seminorms

$$
p_{N,K}(\phi)=\max_{|\alpha|\le N}\sup_{x\in K} |D^{\alpha}\phi(x)|,
$$

and equip $\mathcal{D}_{K}(\Omega)$ with all $p_{N,K}$. A sequence $\phi_{j}\to 0$ in $\mathcal{D}(\Omega)$ iff there exists a fixed compact $K$ containing every $\operatorname{supp}\phi_{j}$ and $D^{\alpha}\phi_{j}\to 0$ uniformly on $K$ for all multi-indices $\alpha$. Differentiation is continuous in this topology.

### Distributions

A **distribution** is a continuous linear functional $T:\mathcal{D}(\Omega)\to\mathbb{C}$. Continuity means: for each compact $K\subset \Omega$, there exist $C>0$ and integer $N\ge 0$ such that for all $\phi\in \mathcal{D}_{K}(\Omega)$,

$$
\big|\langle T,\phi\rangle\big|\le C \sum_{|\alpha|\le N}\sup_{x\in K}\big|D^{\alpha}\phi(x)\big|.
$$

The smallest such $N$ is the **order** of $T$. The Dirac mass $\delta_{a}$ defined by $\langle \delta_{a},\phi\rangle=\phi(a)$ satisfies $|\phi(a)|\le \sup |\phi|$, so $\delta_{a}$ has order $0$.

The dual space $\mathcal{D}'(\Omega)$ carries the weak-$\ast$ topology: $T_{j}\to T$ if $\langle T_{j},\phi\rangle\to \langle T,\phi\rangle$ for every $\phi\in\mathcal{D}(\Omega)$. Fourier series, Green’s functions, and impulse responses converge naturally in this topology.

### Calculus of Distributions

Integration by parts motivates the definition of derivatives: for multi-index $\alpha$,

$$
\langle \partial^{\alpha} T,\phi\rangle := (-1)^{|\alpha|}\langle T,\partial^{\alpha}\phi\rangle.
$$

Since $\phi\mapsto \partial^{\alpha}\phi$ is continuous on $\mathcal{D}$, $\partial^{\alpha}T$ is a distribution. Thus every distribution is infinitely differentiable. Multiplication by smooth functions is defined via $\langle fT,\phi\rangle=\langle T,f\phi\rangle$ for $f\in C^{\infty}(\Omega)$. Convolution with test functions produces smooth functions, and convolution of two distributions is defined when at least one has compact support.

### Regular Distributions

Every locally integrable function $f\in L^{1}_{\text{loc}}(\Omega)$ defines a **regular distribution** $T_{f}$ via $\langle T_{f},\phi\rangle = \int_{\Omega} f(x)\phi(x)\,dx$. This embedding identifies $L^{1}_{\text{loc}}(\Omega)$ with a subspace of $\mathcal{D}'(\Omega)$. Singular objects (point masses, principal values) coexist with regular ones, providing a unified framework. However, $\mathcal{D}'$ is too broad for energy estimates; Sobolev spaces refine regularity notions, motivating Section 2.2.

## Complete Examples

### Example 2.1.1: Dirac Delta and Its Derivatives

**Problem:** Show $\delta_{a}$ has order $0$ and compute its derivatives.

For $\phi\in\mathcal{D}$, $|\langle \delta_{a},\phi\rangle|=|\phi(a)|\le \sup|\phi|=p_{0}(\phi)$, so order $0$. Differentiating,

$$
\langle \delta_{a}',\phi\rangle=-\langle \delta_{a},\phi'\rangle=-\phi'(a),\qquad
\langle \delta_{a}^{(n)},\phi\rangle=(-1)^{n}\phi^{(n)}(a),
$$

and each derivative has order $n$.

### Example 2.1.2: Heaviside Function

**Problem:** Compute $H'$ distributionally for $H(x)=1$ if $x\ge 0$, $0$ otherwise.

For $\phi\in\mathcal{D}(\mathbb{R})$,

$$
\langle H',\phi\rangle=-\langle H,\phi'\rangle=-\int_{0}^{\infty}\phi'(x)\,dx=\phi(0)=\langle \delta,\phi\rangle.
$$

Therefore $H'=\delta$. Differentiating again yields $H''=\delta'$.

### Example 2.1.3: Green’s Function in $\mathbb{R}^{2}$

**Problem:** Verify $-\Delta \Phi=\delta$ with $\Phi(x)=-\frac{1}{2\pi}\log|x|$.

For $\phi\in\mathcal{D}(\mathbb{R}^{2})$,

$$
\langle -\Delta \Phi,\phi\rangle=\langle \Phi,-\Delta \phi\rangle
 = -\frac{1}{2\pi}\int_{\mathbb{R}^{2}}\log|x|\Delta\phi(x)\,dx.
$$

Integration by parts (boundary terms vanish due to compact support) shows this equals $\phi(0)$, so $-\Delta\Phi=\delta$.

### Example 2.1.4: Fourier Series Convergence in $\mathcal{D}'$

**Problem:** Show the Fourier series of $f(x)=|x|$ on $(-\pi,\pi)$ converges to $f$ in $\mathcal{D}'$.

Partial sums satisfy $\langle S_{N},\phi\rangle=\int_{-\pi}^{\pi}S_{N}(x)\phi(x)\,dx\to \int_{-\pi}^{\pi}|x|\phi(x)\,dx$ as $N\to\infty$, because $\phi$ decays near the endpoints. Thus $S_{N}\to f$ distributionally, even though Gibbs oscillations persist pointwise.

### Example 2.1.5: Periodic Delta Comb

**Problem:** Express $\sum_{k\in\mathbb{Z}}\delta(x-2\pi k)$ via Fourier series.

Pairing with $e^{-inx}$ gives coefficients $c_{n}=\frac{1}{2\pi}$. Hence

$$
\sum_{k\in\mathbb{Z}}\delta(x-2\pi k)=\frac{1}{2\pi}\sum_{n\in\mathbb{Z}}e^{inx},
$$

the Poisson summation formula in $\mathcal{D}'$.

### Example 2.1.6: Homogeneous Distributions

**Problem:** Show $|x|^{\lambda-n}$ is homogeneous of degree $\lambda$.

For $t>0$,

$$
\left\langle |x|^{\lambda-n},\phi(x/t)\right\rangle
 = t^{\lambda}\langle |x|^{\lambda-n},\phi\rangle
$$

after the change $y=x/t$. Special cases include $\delta$ (degree $-n$) and $|x|^{2-n}$ (Green’s function in $\mathbb{R}^{n}$, degree $2-n$).

### Example 2.1.7: Wave Equation Fundamental Solution

**Problem:** Solve $\partial_{tt}u-\partial_{xx}u=\delta(x)\delta(t)$ with $u=0$ for $t<0$.

The distribution $E(x,t)=H(t-|x|)$ satisfies $\partial_{tt}E-\partial_{xx}E=\delta(x)\delta(t)$. Verification follows by testing against $\phi$ and integrating by parts; $E$ describes the light cone in $1+1$ dimensions.

### Example 2.1.8: Order of $\delta^{(n)}$

**Problem:** Prove $\delta^{(n)}$ has order exactly $n$.

We have $|\langle \delta^{(n)},\phi\rangle|\le p_{n}(\phi)$. To show order $\ge n$, choose $\phi_{\epsilon}(x)=\epsilon^{n+1}\psi(x/\epsilon)$ with $\psi^{(n)}(0)=1$. Then $|\langle \delta^{(n)},\phi_{\epsilon}\rangle|=\epsilon$, while $p_{k}(\phi_{\epsilon})=O(\epsilon^{n+1-k})$. For $k<n$, $|\langle \delta^{(n)},\phi_{\epsilon}\rangle|/p_{k}(\phi_{\epsilon})\to \infty$, so no lower order bound exists.

### Example 2.1.9: Mollification

**Problem:** Show $T*\rho_{\epsilon}\in C^{\infty}$ when $T$ has compact support.

Define $(T*\rho_{\epsilon})(x)=\langle T_{y},\rho_{\epsilon}(x-y)\rangle$. Differentiating under the pairing gives $\partial_{x}^{\alpha}(T*\rho_{\epsilon})=\langle T_{y},\partial_{x}^{\alpha}\rho_{\epsilon}(x-y)\rangle$, smooth in $x$. Thus mollification approximates distributions by smooth functions.

## References

* Brezis, H. (2011). *Functional Analysis, Sobolev Spaces and Partial Differential Equations*. Springer.
* Hörmander, L. (1983). *The Analysis of Linear Partial Differential Operators I*. Springer.
* Rudin, W. (1991). *Functional Analysis*. McGraw–Hill.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 1.7 Classical Renormalization & Non-Perturbative Methods]({{ '/diffequations/chapter-01/01-7-renormalization/' | relative_url }})
- [Next Section: 2.2 Sobolev Spaces & Weak Derivatives]({{ '/diffequations/chapter-02/02-2-sobolev-spaces/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-02/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
