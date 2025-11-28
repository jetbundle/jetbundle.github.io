---
layout: textbook
title: "Section 2.7: Fredholm Theory & Index"
description: "Almost invertible operators, index stability"
permalink: /diffequations/chapter-02/02-7-fredholm-theory/
order: 2.7
chapter: 2
section: 7
nav_order: 2.7
is_chapter_index: false
parent_chapter: 2
parent_section: null
---

# Section 2.7: Fredholm Theory & Index

## Introduction

We confront the failure of uniqueness. **Fredholm Theory** classifies operators that are "almost" invertible, introducing the **Index** (dimension of kernel minus dimension of cokernel). We prove the stability of the Index under compact perturbations.
## Mathematical Content

### Fredholm Operators and the Alternative

Let $F:H_{1}\to H_{2}$ be bounded between Hilbert spaces. The operator is **Fredholm** if $\ker F$ and the cokernel $H_{2}/\operatorname{ran}F$ are finite dimensional and $\operatorname{ran}F$ is closed. When $K:H\to H$ is compact, the perturbation $I+K$ is Fredholm. The **Fredholm Alternative** for $(I+K)u=f$ states:

1. Either $\ker(I+K)=\{0\}$, so $(I+K)$ is invertible and every $f\in H$ admits a unique solution.
2. Or $\ker(I+K)$ is a non-trivial finite-dimensional space, in which case $(I+K)u=f$ is solvable only when $f\in (\ker(I+K)^{\ast})^{\perp}$.

This dichotomy quantifies the precise obstruction to solvability and explains resonance phenomena in boundary-value and integral equations.

### Analytical Index and Stability

For a Fredholm operator $F$, the **index** is

$$
\operatorname{ind}(F)=\dim \ker F-\dim \operatorname{coker} F.
$$

In self-adjoint settings the index often vanishes, but for general maps it may be non-zero. The index is stable under compact perturbations: if $K$ is compact, then $F+K$ is Fredholm with $\operatorname{ind}(F+K)=\operatorname{ind}(F)$. More generally, any norm-continuous family $F(t)$ of Fredholm operators has constant index. Hence the index is a homotopy invariant—an inherently topological datum attached to the operator rather than to local coefficients.

### Elliptic PDEs and Topological Data

Elliptic boundary value problems naturally produce Fredholm operators. If $L$ is uniformly elliptic of order $2m$ on a bounded domain $\Omega$, then $L:H^{s+2m}(\Omega)\to H^{s}(\Omega)$ is Fredholm: the kernel (harmonic functions) is finite dimensional, and $Lu=f$ is solvable precisely when $f$ is orthogonal to the adjoint kernel. On compact manifolds the index of elliptic complexes links analysis to topology; for instance, the Euler characteristic $\chi(M)$ equals the index of $d+d^{\ast}$ acting on differential forms. Fredholm theory therefore shows how global topology dictates solution counts even when local Sobolev analysis governs regularity.

## Connections to Chapter Narrative

Sections 2.5–2.6 relied on coercivity to ensure uniqueness and convergence. Fredholm theory now addresses the non-coercive regime, where compactness yields only finite-dimensional deviations from invertibility. The resulting index invariant ties back to the spectral structure of Sections 2.3–2.4 and prepares the transition to Chapter 3’s manifold-based perspective and the full index theorems of Chapter 7.

## References

* Brezis, H. (2011). *Functional Analysis, Sobolev Spaces and Partial Differential Equations*. Springer.
* Evans, L. C. (2010). *Partial Differential Equations* (2nd ed.). American Mathematical Society.
* Gilbarg, D., & Trudinger, N. S. (2001). *Elliptic Partial Differential Equations of Second Order* (3rd ed.). Springer.
* Reed, M., & Simon, B. (1980). *Methods of Modern Mathematical Physics I: Functional Analysis*. Academic Press.

## Complete Examples

### Example 2.7.1: Integral Equation and the Fredholm Alternative

**Problem:** Solve $(I+\lambda K)u=f$ on $L^{2}[0,1]$ with $(Ku)(x)=\int_{0}^{1}\min(x,y)u(y)\,dy$, and determine when solutions fail to exist.

The kernel $K(x,y)=\min(x,y)$ is square integrable, so $K$ is Hilbert–Schmidt with $\left\|K\right\|_{HS}^{2}=\tfrac{1}{4}$ and hence compact. Differentiating the homogeneous equation $(I+\lambda K)u=0$ twice yields $u''(x)=-\lambda^{-1}u(x)$ together with $u(0)=u(1)=0$, producing eigenpairs $\lambda_{n}=-1/(n\pi)^{2}$ with $u_{n}(x)=\sin(n\pi x)$. If $\lambda\neq \lambda_{n}$ for all $n$, then

$$
\begin{aligned}
 u(x)&=\sum_{n=1}^{\infty}\frac{\langle f,\phi_{n}\rangle}{1+\lambda\lambda_{n}}\phi_{n}(x),\\
 \phi_{n}(x)&=\sqrt{2}\sin(n\pi x).
\end{aligned}
$$

When $\lambda=\lambda_{k}$, solvability requires $\langle f,\phi_{k}\rangle=0$. For $\lambda=-1/\pi^{2}$ the datum $f(x)=x(1-x)$ violates this condition and no solution exists, whereas $f(x)=\sin(2\pi x)$ satisfies it and yields $u(x)=c\sin(\pi x)+u_{p}(x)$ with $u_{p}\perp \sin(\pi x)$.

### Example 2.7.2: Annulus Transmission Problem and Index Zero

**Problem:** Show that the Laplace transmission problem on the annulus $\{1<r<2\}$ with $u|_{r=1}=0$ and $\partial_{r}u|_{r=2}=g$ defines a Fredholm operator of index $0$ and remains so under compact perturbations.

Expanding $u(r,\theta)=\sum_{n=0}^{\infty}(A_{n}r^{n}+B_{n}r^{-n})\cos(n\theta)$ enforces $A_{n}+B_{n}=0$ at $r=1$ and $n(2^{n-1}A_{n}-2^{-n-1}B_{n})=g_{n}$ at $r=2$. The matrix

$$
\begin{pmatrix}
1 & 1\\
n2^{\,n-1} & -n2^{-n-1}
\end{pmatrix}
$$

has determinant $n2^{-n-1}(2^{2n}+1)\neq 0$, so each Fourier mode is uniquely determined. Thus $T:H^{2}(\Omega)\to H^{1/2}(\partial\Omega_{r=2})$ is bijective, giving $\operatorname{ind}(T)=0$. Adding a compact perturbation $(Ku)(x)=\epsilon\int_{\Omega}G(x,y)u(y)\,dy$ shifts eigenvalues continuously but leaves the index unchanged, so $\operatorname{ind}(T+K)=0$.

### Example 2.7.3: Dolbeault Operator on a Riemann Surface

**Problem:** Compute the index of $\bar{\partial}:\Omega^{0,0}(M)\to\Omega^{0,1}(M)$ on a compact Riemann surface $M$ of genus $g$ and show that it remains constant under deformations.

Ellipticity furnishes a Fredholm map $\bar{\partial}:L^{2}_{0,0}\to L^{2}_{0,1}$. Hodge theory identifies $\ker \bar{\partial}$ with harmonic $(0,0)$-forms, so $\dim \ker \bar{\partial}=1$. The cokernel equals $H^{0,1}(M)$ with dimension $g$, giving $\operatorname{ind}(\bar{\partial})=1-g$. For a family of complex structures $J_{t}$, harmonic representatives vary smoothly, so both kernel and cokernel dimensions remain fixed and the index stays $1-g$. On the torus ($g=1$) the index vanishes, whereas for higher genus the negative index counts the obstructions to solving $\bar{\partial}u=\eta$ for arbitrary $\eta$.

### Example 2.7.4: Periodic Schrödinger Operator and Band Crossings

**Problem:** Analyze $H=-\Delta+V(x)$ on $L^{2}(\mathbb{T}^{n})$ with smooth periodic $V$ and relate band crossings to index stability.

Floquet–Bloch theory decomposes states into $u_{k,j}(x)=e^{ik\cdot x}w_{k,j}(x)$ with $w_{k,j}$ periodic. For each quasimomentum $k$, the shifted operator $H_{k}=(-i\nabla+k)^{2}+V$ has compact resolvent, so $H_{k}-z$ is Fredholm whenever $\operatorname{Im}z\neq 0$. At degeneracies where $E_{j}(k_{0})=E_{j+1}(k_{0})$, the kernel dimension becomes $2$, but self-adjointness ensures the cokernel also has dimension $2$, yielding $\operatorname{ind}(H_{k_{0}}-E)=0$. Gap labels given by Chern numbers

$$
C_{n}=\frac{1}{2\pi i}\int_{\text{BZ}}F_{n}(k)\,dk,\qquad F_{n}(k)=\nabla_{k}\times A_{n}(k),
$$

remain invariant under continuous deformations of $V$, illustrating topological protection of the spectrum.

### Example 2.7.5: Robin Boundary Conditions and Index Jumps

**Problem:** Consider $\Delta_{g}u=0$ on a compact manifold $(M,\partial M)$ with Robin boundary conditions $\partial_{\nu}u+\alpha u=0$ on $\partial M$, and track how the index behaves as $\alpha$ varies.

For $\alpha>0$, the maximum principle forces $u=0$, so $\ker(\Delta_{g,\alpha})=\{0\}$ and $\operatorname{ind}(\Delta_{g,\alpha})=0$. At $\alpha=0$ (Neumann case) constants lie in both kernel and cokernel, keeping the index zero. When $\alpha<0$, eigenvalues of the Dirichlet-to-Neumann map cross zero; on the disk the critical values occur at $\alpha=-j_{0,n}^{2}$ where $j_{0,n}$ are Bessel zeros. Each crossing simultaneously creates kernel and cokernel vectors of equal multiplicity, so the index remains constant even though solvability now requires additional orthogonality conditions. This demonstrates how boundary parameter changes trigger resonance without altering the topological invariant.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 2.6 Galerkin Methods & Finite Elements]({{ '/diffequations/chapter-02/02-6-galerkin-methods/' | relative_url }})
- [Next Section: 3.1 Manifolds, Tensors & Covariant Derivatives]({{ '/diffequations/chapter-03/03-1-manifolds-tensors/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-02/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
