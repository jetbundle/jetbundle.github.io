---
layout: textbook
title: "Section 2.4: Unbounded Operators, Resolvents & Semigroups"
description: "Physical operators, Stone's theorem"
permalink: /diffequations/chapter-02/02-4-unbounded-operators/
order: 2.4
chapter: 2
section: 4
nav_order: 2.4
is_chapter_index: false
parent_chapter: 2
parent_section: null
---

# Section 2.4: Unbounded Operators, Resolvents & Semigroups

## Introduction

Physical operators like the Laplacian are unbounded (differentiation roughens functions). We introduce the domain subtleties of **Self-Adjointness** versus Symmetricity. We construct the **Resolvent Operator** and use **Stone's Theorem** to define time evolution ($e^{itH}$) as a unitary group, providing a rigorous foundation for Quantum Mechanics without relying on convergent power series.
## Mathematical Content

### Unbounded Operators and Domains

An operator $A$ on a Hilbert space $H$ is a linear map $A:D(A)\to H$ defined on a subspace $D(A)\subset H$. It is **densely defined** if $\overline{D(A)}=H$, a prerequisite for defining the adjoint $A^{*}$. The graph $\Gamma(A)=\{(x,Ax):x\in D(A)\}$ is a subspace of $H\times H$. The operator $A$ is **closed** if $\Gamma(A)$ is closed; this ensures that convergence $x_{n}\to x$ and $Ax_{n}\to y$ implies $x\in D(A)$ and $Ax=y$. A closable operator admits a smallest closed extension $\bar{A}$.

For a densely defined $A$, the adjoint $A^{*}$ has domain
$$
D(A^{*})=\{ y\in H : x\mapsto \langle Ax,y\rangle \text{ is continuous on } D(A) \},
$$
and satisfies $\langle Ax,y\rangle = \langle x,A^{*}y\rangle$ for all $x\in D(A)$.

### Symmetric vs. Self-Adjoint

An operator $A$ is **symmetric** if $\langle Ax,y\rangle=\langle x,Ay\rangle$ for all $x,y\in D(A)$; equivalently $A\subseteq A^{*}$. It is **self-adjoint** if $A=A^{*}$, i.e., $D(A)=D(A^{*})$ and $A$ agrees with $A^{*}$ on this domain. Symmetric operators have real expectation values, but only self-adjoint operators generate unitary dynamics. Deficiency indices $n_{\pm}=\dim\ker(A^{*}\mp iI)$ classify self-adjoint extensions: $A$ admits extensions iff $n_{+}=n_{-}$.

The spectral theorem extends to self-adjoint (possibly unbounded) operators: there exists a projection-valued measure $E(\lambda)$ such that
$$
A=\int_{-\infty}^{\infty} \lambda\, dE(\lambda),
$$
allowing functional calculus for measurable functions $f$ via $f(A)=\int f(\lambda)\,dE(\lambda)$.

### Resolvents and Spectrum

The **resolvent set** $\rho(A)$ consists of $\lambda\in\mathbb{C}$ for which $(A-\lambda I):D(A)\to H$ is bijective with bounded inverse $R(\lambda,A)=(A-\lambda I)^{-1}$. The spectrum $\sigma(A)$ is its complement. For self-adjoint $A$, $\sigma(A)\subset\mathbb{R}$ and $\|R(\lambda,A)\|\le 1/\text{dist}(\lambda,\sigma(A))$.

The spectrum decomposes into point spectrum (eigenvalues), continuous spectrum, and residual spectrum; in unbounded settings continuous spectrum often dominates (e.g., Laplacian on $\mathbb{R}^{n}$).

### Strongly Continuous Semigroups

For the abstract Cauchy problem $u'(t)=Au(t)$ with $u(0)=u_{0}$, we seek a strongly continuous semigroup $\{T(t)\}_{t\ge 0}$ such that $T(0)=I$, $T(t+s)=T(t)T(s)$, and $\lim_{t\to 0^{+}}\|T(t)u-u\|=0$. The generator $A$ is defined on
$$
D(A)=\left\{ u\in H : \lim_{t\to 0^{+}}\frac{T(t)u-u}{t} \text{ exists} \right\},\quad Au=\lim_{t\to 0^{+}}\frac{T(t)u-u}{t}.
$$

The **Hille–Yosida theorem** characterizes generators of contraction semigroups: a densely defined closed operator $A$ generates a $C_{0}$-contraction semigroup iff $(0,\infty)\subset\rho(A)$ and $\|R(\lambda,A)\|\le 1/\lambda$ for all $\lambda>0$.

## Complete Examples

### Example 2.4.1: Differentiation Operator on $L^{2}(0,1)$

**Problem:** Analyze $A=\frac{d}{dx}$ with $D(A)=H^{1}_{0}(0,1)$.

Since $C_{c}^{\infty}(0,1)\subset D(A)$ densely, $A$ is densely defined. The graph $\Gamma(A)=\{(u,u') : u\in H^{1}_{0}\}$ is closed: if $u_{n}\to u$ and $u'_{n}\to v$ in $L^{2}$, then $u\in H^{1}_{0}$ and $u'=v$ by definition of weak derivatives. $A$ is unbounded because $\|Au_{n}\|/\|u_{n}\|=n\pi\to\infty$ for $u_{n}(x)=\sin(n\pi x)$.

### Example 2.4.2: Momentum Operator on $\mathbb{R}$

**Problem:** Consider $A=-i\frac{d}{dx}$ on $D(A)=H^{1}(\mathbb{R})$.

Via Fourier transform, $D(A)=\{u\in L^{2} : \int |\xi|^{2}|\hat{u}(\xi)|^{2}<\infty\}$. Gaussian functions $u(x)=e^{-x^{2}/2}$ lie in $D(A)$ with $Au=ixe^{-x^{2}/2}$. Approximating constants with $u_{\epsilon}(x)=e^{-|x|/\epsilon}/\sqrt{2\epsilon}$ shows the necessity of decay for membership in $D(A)$: $u_{\epsilon}\to \frac{1}{\sqrt{2}}$ in $L^{2}$ but $Au_{\epsilon}$ fails to converge.

### Example 2.4.3: Non-Closed Domain

**Problem:** Let $A=\frac{d}{dx}$ with $D(A)=C^{1}[0,1]\cap L^{2}$. This domain is not maximal. The closure $\bar{A}$ has domain $H^{1}_{0}(0,1)$, illustrating the need to work with closed extensions.

### Example 2.4.4: Symmetric vs. Self-Adjoint Laplacian

**Problem:** For $A=-\frac{d^{2}}{dx^{2}}$ on $L^{2}(0,\pi)$, compare domains.

With $D_{1}=\{u\in H^{2}:u(0)=u(\pi)=0\}$, $A$ is self-adjoint and has spectrum $\{n^{2}\}_{n\in\mathbb{N}}$. With $D_{3}=\{u\in H^{2}:u(0)=u'(\pi)=0\}$, $A$ is symmetric but not self-adjoint; deficiency indices $(1,1)$ yield a one-parameter family of self-adjoint extensions corresponding to different boundary conditions.

### Example 2.4.5: Momentum vs. Position Operators

On $L^{2}(\mathbb{R})$, the position operator $X$ (multiplication by $x$) and momentum operator $P=-i\frac{d}{dx}$ are self-adjoint on domains $D(X)=\{u : xu\in L^{2}\}$ and $D(P)=H^{1}(\mathbb{R})$. They satisfy the canonical commutation relation $[P,X]=-iI$, but $PX$ and $XP$ require careful domain intersections, highlighting the role of unbounded operator algebra.

### Example 2.4.6: Resolvent of the Laplacian

**Problem:** Compute $(A-\lambda I)^{-1}$ for $A=-\Delta$ on $\mathbb{R}^{3}$.

Fourier transform yields $\widehat{R(\lambda,A)u}(\xi)=\frac{\hat{u}(\xi)}{|\xi|^{2}-\lambda}$. For $\text{Re}(\lambda)<0$, the kernel is $G_{\lambda}(x,y)=\frac{e^{-\sqrt{-\lambda}|x-y|}}{4\pi |x-y|}$, exhibiting the exponential decay of the resolvent.

### Example 2.4.7: Resolvent Estimate

For $A=-\frac{d^{2}}{dx^{2}}$ on $(0,\pi)$ with Dirichlet conditions, the resolvent satisfies
$$
R(\lambda,A)f=\sum_{n=1}^{\infty}\frac{\langle f,\sin(n\pi x)\rangle}{n^{2}\pi^{2}-\lambda}\sin(n\pi x),\quad \|R(\lambda,A)\|\le \frac{1}{\text{dist}(\lambda,\{n^{2}\pi^{2}\})}.
$$

### Example 2.4.8: Heat Semigroup via Hille–Yosida

**Problem:** Show $A=\frac{d^{2}}{dx^{2}}$ with $D(A)=H^{2}\cap H^{1}_{0}$ generates the heat semigroup.

The resolvent satisfies $\|R(\lambda,A)\|\le 1/\lambda$ for $\lambda>0$, and $(0,\infty)\subset \rho(A)$. Hence $A$ generates a contraction semigroup $T(t)=e^{tA}$, the heat kernel, smoothing initial data.

### Example 2.4.9: Semigroup Failure

Let $A=\frac{d}{dx}$ on $L^{2}(0,1)$ with domain $H^{1}(0,1)$ (no boundary conditions). The resolvent estimate fails and $\rho(A)=\emptyset$, so $A$ does not generate a $C_{0}$-semigroup. This illustrates the need for proper domain choices to ensure well-posed evolution.

## References

* Brezis, H. (2011). *Functional Analysis, Sobolev Spaces and Partial Differential Equations*. Springer.
* Reed, M., & Simon, B. (1972). *Methods of Modern Mathematical Physics I: Functional Analysis*. Academic Press.
* Reed, M., & Simon, B. (1975). *Methods of Modern Mathematical Physics II: Fourier Analysis, Self-Adjointness*. Academic Press.
* Rudin, W. (1991). *Functional Analysis*. McGraw-Hill.
* Yosida, K. (1980). *Functional Analysis*. Springer.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 2.3 Hilbert Space Theory & Spectral Theorem]({{ '/diffequations/chapter-02/02-3-hilbert-spaces/' | relative_url }})
- [Next Section: 2.5 Variational Methods & Lax-Milgram]({{ '/diffequations/chapter-02/02-5-variational-methods/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-02/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
