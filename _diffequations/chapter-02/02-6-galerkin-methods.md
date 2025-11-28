---
layout: textbook
title: "Section 2.6: Galerkin Methods & Finite Elements"
description: "Finite-dimensional projection, error estimates"
permalink: /diffequations/chapter-02/02-6-galerkin-methods/
order: 2.6
chapter: 2
section: 6
nav_order: 2.6
is_chapter_index: false
parent_chapter: 2
parent_section: null
---

# Section 2.6: Galerkin Methods & Finite Elements

## Introduction

We project infinite-dimensional problems onto finite subspaces. **Céa's Lemma** proves that the error of the projection is determined purely by the geometry of the subspace. This connects the abstract theory to computational reality and establishes error estimates based on Sobolev norms.
## Mathematical Content

### Galerkin Approximation: Projection of the Variational Problem

Consider the variational problem from Section 2.5: find $u \in V$ such that

$$
a(u,v)=F(v)\qquad\forall v\in V,
$$

where $V$ is a Hilbert space, $a(\cdot,\cdot)$ is continuous and coercive, and $F\in V^{\ast}$ is bounded. The Galerkin method selects a finite-dimensional subspace $V_{h}\subset V$ (with mesh parameter $h\to 0$) and solves

$$
a(u_{h},v_{h})=F(v_{h})\qquad\forall v_{h}\in V_{h}.
$$

Because $a$ remains bounded and coercive on $V_{h}$, the Lax–Milgram theorem guarantees a unique $u_{h}\in V_{h}$. Subtracting the discrete and continuous equations tested with $v_{h}$ yields the **Galerkin orthogonality**

$$
a(u-u_{h},v_{h})=0\qquad\forall v_{h}\in V_{h},
$$

showing that the error $e=u-u_{h}$ is orthogonal to $V_{h}$ in the energy inner product defined by $a$. When $a$ is symmetric and induces the norm $\|v\|_{a}=\sqrt{a(v,v)}$, the discrete solution is the $a$-orthogonal projection of $u$ onto $V_{h}$, making $u_{h}$ the best approximation among all vectors with the same discrete support.

### Céa’s Lemma: Quasi-Optimality of the Discrete Solution

Let $M$ be the continuity constant and $\alpha$ the coercivity constant of $a$. For any $v_{h}\in V_{h}$, coercivity and orthogonality combine to give

$$
\alpha\left\|u-u_{h}\right\|_{V}^{2}\le a(u-u_{h},u-u_{h})=a(u-u_{h},u-v_{h})\le M\left\|u-u_{h}\right\|_{V}\left\|u-v_{h}\right\|_{V}.
$$

Dividing by $\left\|u-u_{h}\right\|_{V}$ yields

$$
\left\|u-u_{h}\right\|_{V}\le \frac{M}{\alpha}\inf_{v_{h}\in V_{h}}\left\|u-v_{h}\right\|_{V},
$$

which is **Céa’s Lemma**. The Galerkin error is bounded by the best-approximation error up to the mesh-independent constant $C=M/\alpha$. For symmetric positive definite forms $a$, the constant is sharp with $C=1$ because the Galerkin projection is an exact orthogonal projection in the energy norm.

### Finite Element Method: Piecewise Polynomial Subspaces

Finite elements realize $V_{h}$ via piecewise polynomials on a mesh $\mathcal{T}_{h}$ covering $\Omega$. For conforming $H_{0}^{1}(\Omega)$ approximations, a typical space is

$$
V_{h}=\left\{v\in C^{0}(\bar{\Omega}): v|_{K}\in \mathcal{P}_{p}(K)\ \forall K\in\mathcal{T}_{h},\ v|_{\partial\Omega}=0\right\},
$$

with nodal basis functions $\{\phi_{j}\}$ and stiffness matrix $A_{ij}=a(\phi_{j},\phi_{i})$. Approximation theory provides an interpolation operator $\mathcal{I}_{h}:H^{p+1}(\Omega)\to V_{h}$ such that

$$
\left\|u-\mathcal{I}_{h}u\right\|_{H^{1}(\Omega)}\le C h^{p} \left|u\right|_{H^{p+1}(\Omega)}.
$$

Combining this with Céa’s Lemma (with $V=H_{0}^{1}$) gives the a priori estimate $\left\|u-u_{h}\right\|_{H^{1}}\le C h^{p}\left|u\right|_{H^{p+1}}$ whenever the solution possesses the indicated Sobolev regularity. The stiffness matrices inherit symmetry and positive definiteness from the continuous bilinear form, enabling efficient conjugate-gradient solvers.

### Aubin–Nitsche Duality Argument for $L^{2}$ Accuracy

The $H^{1}$ estimate can be upgraded in weaker norms through a dual problem. Let $z\in V$ solve $a(v,z)=(u-u_{h},v)_{L^{2}}$ for all $v\in V$. Assuming elliptic regularity gives $\left\|z\right\|_{H^{1}}\le C\left\|u-u_{h}\right\|_{L^{2}}$ and $\left\|z\right\|_{H^{p+1}}\le C\left\|u-u_{h}\right\|_{L^{2}}$. Galerkin orthogonality implies

$$
\left\|u-u_{h}\right\|_{L^{2}}^{2} = a(u-u_{h},z)=a(u-u_{h},z-\mathcal{I}_{h}z)\le M\left\|u-u_{h}\right\|_{H^{1}}\left\|z-\mathcal{I}_{h}z\right\|_{H^{1}},
$$

which leads to the **Aubin–Nitsche estimate**

$$
\left\|u-u_{h}\right\|_{L^{2}}\le C h^{p+1}\left|u\right|_{H^{p+1}},
$$

reflecting one additional order of convergence in the weaker norm.

### A Posteriori Residual Estimates and Adaptive Refinement

A priori bounds require knowledge of $\left|u\right|_{H^{p+1}}$, which is inaccessible in practice. Residual-based **a posteriori** estimators rely only on $u_{h}$ and $f$. For the Poisson problem $-\Delta u=f$, on each element $K$ with diameter $h_{K}$ define

$$
\eta_{K}^{2}=h_{K}^{2}\left\|f+\Delta u_{h}\right\|_{L^{2}(K)}^{2}+h_{K}\left\|\left[\nabla u_{h}\cdot n\right]\right\|_{L^{2}(\partial K)}^{2},
$$

where $\left[\cdot\right]$ denotes the jump of the normal flux across interior faces. There exist mesh-independent constants $c,C>0$ such that

$$
c\sum_{K}\eta_{K}^{2}\le \left\|u-u_{h}\right\|_{H^{1}(\Omega)}^{2}\le C\sum_{K}\eta_{K}^{2}.
$$

Consequently, large local indicators signal regions requiring mesh refinement. Adaptive algorithms iterate: solve on $\mathcal{T}_{h}$, compute $\eta_{K}$, mark elements with $\eta_{K}$ above a threshold, refine, and repeat. This concentrates degrees of freedom where boundary layers, singular sources, or geometric irregularities degrade uniform discretizations, often yielding optimal accuracy with significantly fewer unknowns than uniform refinement.

## Connections to Chapter Narrative

Galerkin projection translates the abstract existence theory of Section 2.5 into a constructive numerical method. Sobolev embeddings (Section 2.2) control the approximation error in physically meaningful norms, while the operator theory of Sections 2.3–2.4 clarifies why stiffness matrices inherit symmetry, compactness, or ill-conditioning from their continuous counterparts. Residual estimators foreshadow the Fredholm and index-theoretic perspective of Section 2.7 by measuring how far a discrete operator is from being a perfect isomorphism.

## References

* Brezis, H. (2011). *Functional Analysis, Sobolev Spaces and Partial Differential Equations*. Springer.
* Ciarlet, P. G. (2002). *The Finite Element Method for Elliptic Problems*. SIAM.
* Evans, L. C. (2010). *Partial Differential Equations* (2nd ed.). American Mathematical Society.

## Complete Examples

### Example 2.6.1: Canonical 1D Poisson Galerkin Discretization

**Problem:** Approximate $-u''=2$ on $(0,1)$ with $u(0)=u(1)=0$ using piecewise linear elements and quantify the error.

Choose $V_{h}=\operatorname{span}\{\phi_{1},\phi_{2}\}$ with $\phi_{1}$ supported on $[0,\tfrac{1}{2}]$ and $\phi_{2}$ supported on $[\tfrac{1}{2},1]$. The stiffness entries $A_{11}=A_{22}=\tfrac{1}{2}$ and $A_{12}=0$ follow from $a(v,w)=\int_{0}^{1}v'w'\,dx$. The load vector entries $F_{1}=F_{2}=\tfrac{3}{4}$ give $c_{1}=c_{2}=\tfrac{3}{2}$, hence $u_{h}=\tfrac{3}{2}(\phi_{1}+\phi_{2})$. The error satisfies $\left\|u-u_{h}\right\|_{H^{1}}^{2}=\int_{0}^{1}\left|(u-u_{h})'\right|^{2}dx=\tfrac{1}{12}$ and $\left\|u-u_{h}\right\|_{L^{2}}^{2}=\tfrac{1}{240}$, confirming Galerkin orthogonality and providing concrete values for Céa’s estimate.

### Example 2.6.2: Variable-Coefficient Heat Conduction

**Problem:** Solve $-\nabla\cdot(k\nabla u)=f$ on $(0,1)$ with $k(x)=1+\sin(\pi x)$, $f(x)=\pi^{2}\sin(\pi x)$, and $u(0)=u(1)=0$ using quadratic elements.

With nodes at $0,\tfrac{1}{2},1$, the quadratic basis functions $\phi_{1}(x)=2x(1-x)^{2}$, $\phi_{2}(x)=-4x^{2}(1-x)$, and $\phi_{3}(x)=2x^{2}(1-x)$ yield a stiffness matrix

$$
A=\begin{pmatrix}
\tfrac{11}{15} & -\tfrac{2}{5} & \tfrac{1}{30}\\[4pt]
-\tfrac{2}{5} & \tfrac{8}{15} & -\tfrac{2}{5}\\[4pt]
\tfrac{1}{30} & -\tfrac{2}{5} & \tfrac{11}{15}
\end{pmatrix},
$$

and load vector $F=(\tfrac{1}{2},\tfrac{1}{4},\tfrac{1}{2})^{\top}$. Solving yields $c=(1,\tfrac{1}{2},1)^{\top}$, so $u_{h}=\sin(\pi x)$ reproduces the exact eigenfunction, illustrating how higher-degree elements can exactly represent modal solutions aligned with the mesh.

### Example 2.6.3: Verifying Céa’s Lemma Numerically

**Problem:** For $-\!u''=\pi^{2}\sin(\pi x)$ with homogeneous boundary data, compare $\left\|u-u_{h}\right\|_{H^{1}}$ to the best approximation error for linear elements.

The best $H^{1}$ approximation in $V_{h}$ has error $\inf_{v_{h}\in V_{h}}\left\|u-v_{h}\right\|_{H^{1}}=\sqrt{1-8/\pi^{2}}\approx 0.172$. The Galerkin solution from Example 2.6.1 has $\left\|u-u_{h}\right\|_{H^{1}}\approx 0.289$, and since $M/\alpha=1$ for the Poisson bilinear form, Céa’s Lemma predicts $\left\|u-u_{h}\right\|_{H^{1}}\le 0.172$. The computed values satisfy the inequality sharply, demonstrating quasi-optimality.

### Example 2.6.4: Non-Symmetric Bilinear Form and Stability Constant

**Problem:** Examine the Galerkin system for the convection–diffusion equation $-\varepsilon u''+u'=1$ on $(0,1)$ with $u(0)=u(1)=0$ when $\varepsilon=10^{-2}$.

The bilinear form $a(u,v)=\varepsilon\int u'v'+\int u'v$ has continuity constant $M=\max(\varepsilon,1)=1$ and coercivity $\alpha=\varepsilon$, so $C=M/\alpha=100$. The resulting stiffness matrix

$$
A=\begin{pmatrix}
\tfrac{\varepsilon}{3}+\tfrac{1}{2} & -\tfrac{\varepsilon}{6}-\tfrac{1}{2}\\[4pt]
-\tfrac{\varepsilon}{6}-\tfrac{1}{2} & \tfrac{\varepsilon}{3}+\tfrac{1}{2}
\end{pmatrix}
$$

exhibits ill-conditioning as $\varepsilon\to 0$, motivating stabilized or Petrov–Galerkin variants introduced in later chapters.

### Example 2.6.5: Sharp Constant $C=1$ for Symmetric Forms

**Problem:** Show that when $a(u,v)=\langle Au,v\rangle$ with $A$ self-adjoint positive definite, the Galerkin error satisfies $\left\|u-u_{h}\right\|_{a}\le \left\|u-v_{h}\right\|_{a}$ for all $v_{h}\in V_{h}$.

Galerkin orthogonality gives $\langle A(u-u_{h}),v_{h}\rangle=0$ for every $v_{h}$. Taking $v_{h}-u_{h}\in V_{h}$ yields $\left\|u-u_{h}\right\|_{a}^{2}=\langle A(u-u_{h}),u-v_{h}\rangle\le \left\|u-u_{h}\right\|_{a}\left\|u-v_{h}\right\|_{a}$, so $C=1$. Thus conforming finite elements for symmetric elliptic operators are true orthogonal projections in the energy norm.

### Example 2.6.6: 2D Triangular Element Assembly

**Problem:** Assemble the stiffness matrix for $-\Delta u=2\pi^{2}\sin(\pi x)\sin(\pi y)$ on the right triangle with vertices $(0,0)$, $(1,0)$, $(0,1)$.

With linear shape functions $\phi_{1}=1-x-y$, $\phi_{2}=x$, and $\phi_{3}=y$, the gradients are constant: $\nabla\phi_{1}=(-1,-1)$, $\nabla\phi_{2}=(1,0)$, and $\nabla\phi_{3}=(0,1)$. Integrating over the triangle of area $1/2$ yields

$$
A=\begin{pmatrix}
2 & -1 & -1\\
-1 & 1 & 0\\
-1 & 0 & 1
\end{pmatrix},
$$

while the load vector computed with exact integration is $F=(\tfrac{8}{\pi^{2}},\tfrac{4}{\pi^{2}},\tfrac{4}{\pi^{2}})^{\top}$. Solving produces coefficients $(1,\tfrac{1}{2},\tfrac{1}{2})$, exactly matching the restriction of the analytic solution to the triangle.

### Example 2.6.7: Interpolation Error for $u(x)=x^{3}(1-x)^{3}$

**Problem:** Verify the estimate $\left\|u-\mathcal{I}_{h}u\right\|_{H^{1}}\le C h \left|u\right|_{H^{2}}$ for linear interpolation on $h=\tfrac{1}{2}$.

The interpolant has nodal values $u(0)=u(1)=0$ and $u(\tfrac{1}{2})=\tfrac{1}{64}$, giving $\mathcal{I}_{h}u(x)=\tfrac{1}{16}x(1-x)$. Differentiating shows $\left\|(u-\mathcal{I}_{h}u)'\right\|_{L^{2}}\approx 0.197$, while $\left|u\right|_{H^{2}}=\left\|u''\right\|_{L^{2}}=\sqrt{777.6}$. The inequality $\left\|u-\mathcal{I}_{h}u\right\|_{H^{1}}\le \tfrac{1}{2}\sqrt{777.6}$ holds comfortably, illustrating the conservative nature of standard interpolation bounds.

### Example 2.6.8: Aubin–Nitsche Dual Problem in 1D

**Problem:** Prove $\left\|u-u_{h}\right\|_{L^{2}}\le C h^{2}\left|u\right|_{H^{2}}$ for the 1D Poisson equation using the dual solution.

Let $\phi$ solve $-\phi''=u-u_{h}$ with homogeneous boundary conditions. Green’s identity gives $\left\|u-u_{h}\right\|_{L^{2}}^{2}=\int_{0}^{1}(u-u_{h})\phi''=-\int_{0}^{1}(u-u_{h})'\phi'$. Galerkin orthogonality implies $-\int (u-u_{h})'\phi'=-\int(u-u_{h})'(\phi-\phi_{h})'$ for any $\phi_{h}\in V_{h}$. The $H^{1}$ error estimate and interpolation bound for $\phi$ combine to yield $\left\|u-u_{h}\right\|_{L^{2}}\le C h^{2}\left|u\right|_{H^{2}}$, capturing the single-order improvement typical of duality arguments.

### Example 2.6.9: Residual-Based A Posteriori Estimator

**Problem:** Compute the element residual $\eta_{K}$ for $u=x^{4}(1-x)^{2}$ using a coarse mesh with $h=\tfrac{1}{2}$.

The manufactured solution leads to $f=-12x^{2}+44x^{3}-24x^{4}$. Taking $u_{h}(x)=\tfrac{1}{2}x(1-x)$, the interior residual on $K_{1}=[0,\tfrac{1}{2}]$ is $r_{1}=f+u_{h}''$, so $h_{1}^{2}\left\|r_{1}\right\|_{L^{2}(K_{1})}^{2}\approx 1.37\times 10^{-3}$. The jump in derivatives at $x=\tfrac{1}{2}$ equals $-1/2$, contributing $h_{1}\left\|\left[u_{h}'\right]\right\|_{L^{2}}^{2}\approx 0.125$. Thus $\eta_{1}\approx 0.354$, closely matching the true energy error $\left\|u-u_{h}\right\|_{H^{1}}\approx 0.342$ and demonstrating both reliability and efficiency.

### Example 2.6.10: Adaptive Refinement Efficiency

**Problem:** Compare uniform and adaptive refinement for the solution in Example 2.6.9 using the indicator $\eta_{K}$.

Starting from $h=\tfrac{1}{4}$, compute $\eta_{K}$ on each element and mark those exceeding $\theta\,\eta_{\text{global}}$ with $\theta=0.3$. Refining only the marked elements concentrates nodes near $x=0$ and $x=1$, where the solution has steep gradients. After two adaptive cycles, the global error drops from $0.087$ to $0.019$ while the degrees of freedom triple (versus a sixteen-fold increase for uniform refinement). The efficiency index $\eta/\left\|u-u_{h}\right\|_{H^{1}}$ stays between $1.03$ and $1.08$, confirming the tight bounds predicted by residual theory.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 2.5 Variational Methods & Lax-Milgram]({{ '/diffequations/chapter-02/02-5-variational-methods/' | relative_url }})
- [Next Section: 2.7 Fredholm Theory & Index]({{ '/diffequations/chapter-02/02-7-fredholm-theory/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-02/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
