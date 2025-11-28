---
layout: textbook
title: "Section 2.3: Hilbert Space Theory & Spectral Theorem"
description: "Infinite-dimensional geometry, spectral theorem"
permalink: /diffequations/chapter-02/02-3-hilbert-spaces/
order: 2.3
chapter: 2
section: 3
nav_order: 2.3
is_chapter_index: false
parent_chapter: 2
parent_section: null
---

# Section 2.3: Hilbert Space Theory & Spectral Theorem

## Introduction

We visualize functions as vectors in an infinite-dimensional Euclidean space. We develop the geometry of **Hilbert Space** (orthogonality, projection). The central result is the **Spectral Theorem for Compact Self-Adjoint Operators**, which provides the rigorous justification for the "separation of variables" and series expansions employed heuristically in Chapter 1.4.
## Mathematical Content

### Hilbert Space Geometry

A Hilbert space $H$ is a complete inner-product space. The inner product induces the norm $\|u\|=\sqrt{\langle u,u\rangle}$ and the notion of orthogonality. The canonical example is $L^{2}(\Omega)$ with $\langle f,g\rangle = \int_{\Omega} f \overline{g}\,dx$.

The **Riesz Representation Theorem** states that every continuous linear functional $\phi\in H^{*}$ is uniquely represented by an element $f\in H$ such that $\phi(u)=\langle u,f\rangle$ for all $u\in H$. This self-duality underpins variational methods.

An **orthonormal basis** $\{e_{n}\}$ satisfies $\langle e_{n},e_{m}\rangle=\delta_{nm}$ and spans $H$ densely. Every $f\in H$ admits the Fourier expansion $f=\sum \langle f,e_{n}\rangle e_{n}$, and **Parseval’s identity** preserves the norm: $\|f\|^{2}=\sum |\langle f,e_{n}\rangle|^{2}$.

### Compact Operators

A bounded operator $K:H\to H$ is **compact** if it maps bounded sets to relatively compact sets. Equivalently, for any bounded sequence $\{u_{n}\}$, the sequence $\{Ku_{n}\}$ has a convergent subsequence. Integral operators with square-integrable kernels (Hilbert-Schmidt operators) are compact; they model Green’s operators that smooth data.

### Spectral Theorem for Compact Self-Adjoint Operators

If $T:H\to H$ is compact and self-adjoint ($T=T^{*}$), then:

1. The spectrum $\sigma(T)$ consists of real eigenvalues $\{\lambda_{n}\}$ with $\lambda_{n}\to 0$.
2. Nonzero eigenvalues have finite multiplicity and accumulate only at $0$.
3. There exists an orthonormal basis $\{\phi_{n}\}$ of eigenvectors.
4. $Tu=\sum \lambda_{n} \langle u,\phi_{n}\rangle \phi_{n}$.

This diagonalization extends finite-dimensional intuition to infinite dimensions and yields the Fredholm alternative for $(I-\lambda K)u=f$.

**Mercer’s theorem** specializes to positive integral kernels: if $K(x,y)$ is continuous, symmetric, and positive-definite, then
$$
K(x,y)=\sum_{n=1}^{\infty}\lambda_{n}\phi_{n}(x)\overline{\phi_{n}(y)}
$$
uniformly on $\Omega\times \Omega$.

### Applications to PDEs

For elliptic operators such as $-\Delta$ with homogeneous Dirichlet boundary conditions, the inverse (solution operator) $S:f\mapsto u$ is compact from $L^{2}(\Omega)$ to $H^{1}_{0}(\Omega)$ (Rellich-Kondrachov). Hence $S$ is compact self-adjoint, and the spectral theorem provides:

1. A discrete sequence of eigenvalues $0<\lambda_{1}\le\lambda_{2}\le\dots\to\infty$.
2. An orthonormal basis of eigenfunctions in $L^{2}(\Omega)$.
3. Rigorous justification for eigenfunction expansions used in separation of variables.

Weyl’s law describes the asymptotic distribution of eigenvalues, connecting spectrum to geometry: $N(\lambda)\sim \frac{\omega_{n}}{(2\pi)^{n}}\operatorname{vol}(\Omega)\lambda^{n/2}$.

## Complete Examples

### Example 2.3.1: Riesz Representation on $L^{2}[0,2\pi]$

**Problem:** Find the representing vector for $\phi(u)=\int_{0}^{2\pi} u(x)\sin x\,dx$.

In $L^{2}[0,2\pi]$ with inner product $\langle f,g\rangle=\frac{1}{2\pi}\int f\overline{g}$, the Riesz theorem gives $f(x)=\sin x$, since $\phi(u)=\langle u,\sin x\rangle$.

### Example 2.3.2: Parseval’s Identity for a Square Wave

**Problem:** Verify Parseval for $f(x)=\operatorname{sgn}(\sin x)$ on $[0,2\pi]$.

Fourier coefficients: $b_{n}=\frac{4}{\pi n}$ for odd $n$, zero otherwise. Then $\|f\|^{2}=1$ and $\sum |b_{n}|^{2}=\frac{16}{\pi^{2}}\sum_{k=0}^{\infty}\frac{1}{(2k+1)^{2}}=\frac{16}{\pi^{2}}\cdot\frac{\pi^{2}}{8}=1$, confirming Parseval.

### Example 2.3.3: Hilbert-Schmidt Operator

Consider $K:L^{2}[0,1]\to L^{2}[0,1]$ with kernel $K(x,y)=\min(x,y)$. Compute

$$
\|K\|_{HS}^{2}=\int_{0}^{1}\int_{0}^{1} \min(x,y)^{2}\,dx\,dy=\frac{1}{3}<\infty,
$$

so $K$ is Hilbert-Schmidt and hence compact.

### Example 2.3.4: Spectral Decomposition of $K$

Solve $Ku=\lambda u$. Differentiating the integral equation yields $-u''=\lambda^{-1}u$ with $u(0)=u(1)=0$, giving eigenfunctions $\phi_{n}(x)=\sqrt{2}\sin(n\pi x)$ and eigenvalues $\lambda_{n}=\frac{1}{(n\pi)^{2}}$. The kernel admits the Mercer expansion

$$
K(x,y)=2\sum_{n=1}^{\infty}\frac{\sin(n\pi x)\sin(n\pi y)}{(n\pi)^{2}}.
$$

### Example 2.3.5: Sturm–Liouville Problem

For $-(1-x^{2})u''-2xu'=\lambda u$ on $[-1,1]$, solutions are Legendre polynomials $P_{n}(x)$ with $\lambda=n(n+1)$. Their orthogonality $\int_{-1}^{1}P_{n}P_{m}\,dx=0$ ($n\ne m$) and completeness justify polynomial expansions in Chapter 1.

### Example 2.3.6: Fredholm Alternative

Solve $(I-\lambda K)u=f$ with $K$ above. If $\lambda\neq 1/\lambda_{n}$, the solution is unique. At resonance ($\lambda=1/\lambda_{n}$), solvability requires $f$ orthogonal to the corresponding eigenfunction. Explicit computation shows failure when $\lambda=\pi^{2}/4$ unless $f\perp \sin(\pi x/2)$.

### Example 2.3.7: Weyl’s Law on a Square

For $-\Delta$ on $[0,\pi]^{2}$ with Dirichlet boundary, eigenvalues are $\lambda_{mn}=m^{2}+n^{2}$. Counting eigenvalues up to $\lambda$ approximates the number of lattice points in a quarter circle, yielding $N(\lambda)\sim \lambda/4$, in agreement with Weyl’s law.

### Example 2.3.8: Heat Equation Convergence

For $u_{t}=u_{xx}$ on $(0,\pi)$ with Dirichlet data, the solution $u(x,t)=\sum c_{n}e^{-n^{2}t}\sin(nx)$ converges in $L^{2}$. Error estimates show $\|u-u_{N}\|\le C N^{-3}e^{-N^{2}t}$ for smooth initial data, illustrating spectral convergence.

### Example 2.3.9: Semiclassical Asymptotics

For the harmonic oscillator $-h^{2}u''+x^{2}u=Eu$, eigenvalues satisfy $E_{n}=n+\tfrac{1}{2}$ exactly. Weyl’s law predicts $N(E)\sim E/h$, matching the exact distribution and connecting spectral theory to semiclassical analysis.

## References

* Brezis, H. (2011). *Functional Analysis, Sobolev Spaces and Partial Differential Equations*. Springer.
* Reed, M., & Simon, B. (1972). *Methods of Modern Mathematical Physics I: Functional Analysis*. Academic Press.
* Rudin, W. (1987). *Real and Complex Analysis*. McGraw-Hill.
* Evans, L. C. (2010). *Partial Differential Equations*. American Mathematical Society.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 2.2 Sobolev Spaces & Weak Derivatives]({{ '/diffequations/chapter-02/02-2-sobolev-spaces/' | relative_url }})
- [Next Section: 2.4 Unbounded Operators, Resolvents & Semigroups]({{ '/diffequations/chapter-02/02-4-unbounded-operators/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-02/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
