---
layout: textbook
title: "Section 3.4: Exterior Calculus & Hodge Decomposition"
description: "Differential forms, coordinate-free integration"
permalink: /diffequations/chapter-03/03-4-exterior-calculus/
order: 3.4
chapter: 3
section: 4
nav_order: 3.4
is_chapter_index: false
parent_chapter: 3
parent_section: null
---

# Section 3.4: Exterior Calculus & Hodge Decomposition

## Introduction

Section 3.1 introduced manifolds and covariant derivatives, but classical vector calculus still relied on the Euclidean structure of $\mathbb{R}^{3}$. To formulate PDEs intrinsically we need a calculus that performs integration and differentiation without coordinates. **Exterior Calculus** provides precisely this machinery: differential forms are the natural objects of integration, the **exterior derivative** $d$ unifies gradient, curl, and divergence, and the **Hodge star** reintroduces the metric to build the Laplace–Beltrami operator. The resulting **Hodge decomposition** generalizes the Helmholtz decomposition of fluid mechanics to arbitrary geometries, giving solvability criteria for elliptic PDEs. References include Lee (2012), Spivak (1979), Nakahara (2003), and Frankel (2011).

## Mathematical Content

### Differential Forms and the Wedge Product

A $k$-form is a smooth section of the bundle $\Lambda^{k} T^{*}M$. At each point $p$, a $k$-form $\omega_{p}$ is an alternating $k$-linear map $T_{p}M^{\times k}\to \mathbb{R}$. Locally we write

$$
\omega = \sum_{I} f_{I}(x)\, dx^{i_{1}} \wedge \cdots \wedge dx^{i_{k}},
$$

where $I=(i_{1}<\cdots<i_{k})$ is a multi-index. The wedge product equips forms with a graded-commutative algebra:

$$
\alpha \wedge \beta = (-1)^{kl}\, \beta \wedge \alpha, \qquad \alpha\in \Omega^{k}, \beta\in \Omega^{\ell}.
$$

Given a smooth map $\phi:M\to N$, the pullback $\phi^{*}:\Omega^{k}(N)\to \Omega^{k}(M)$ satisfies $\phi^{*}(\alpha\wedge\beta)=\phi^{*}\alpha\wedge\phi^{*}\beta$ and allows change of variables in integrals.

### Exterior Derivative and De Rham Cohomology

The exterior derivative $d: \Omega^{k}(M)\to \Omega^{k+1}(M)$ is defined locally by

$$
 d\left( \sum_{I} f_{I} dx^{I} \right) = \sum_{I,j} \partial_{x^{j}} f_{I}\, dx^{j} \wedge dx^{I},
$$

and is characterized by linearity, the graded Leibniz rule, and $d^{2}=0$. Forms with $d\omega=0$ are **closed**; those with $\omega=d\eta$ are **exact**. Because $d^{2}=0$, every exact form is closed and the quotient $H^{k}_{\mathrm{dR}}(M)=\ker d / \operatorname{im} d$ measures the topological obstruction to solving $d\eta=\omega$. The generalized Stokes theorem states

$$
\int_{M} d\omega = \int_{\partial M} \omega,
$$

unifying the classical integral theorems.

### Hodge Star and Codifferential

A Riemannian metric $g$ induces an inner product on forms via the **Hodge star** $*: \Omega^{k}(M)\to \Omega^{n-k}(M)$ defined through

$$
\alpha \wedge *\beta = \langle \alpha,\beta \rangle_{g}\, \operatorname{vol}_{g}.
$$

With this inner product we define the global $L^{2}$ pairing $(\alpha,\beta)=\int_{M} \alpha\wedge *\beta$ and the **codifferential** $\delta = (-1)^{nk+n+1} * d *$, the formal adjoint of $d$. The operator $\delta$ generalizes divergence, lowering degree by one.

### Laplace–Beltrami Operator and Hodge Decomposition

Combining $d$ and $\delta$ yields the Hodge Laplacian

$$
\Delta = d\,\delta + \delta\, d : \Omega^{k}(M) \to \Omega^{k}(M).
$$

On functions $f$, $\Delta f = \delta df$ corresponds to the negative divergence of the gradient. A form is **harmonic** if $\Delta \omega=0$; on compact manifolds this is equivalent to $d\omega=0$ and $\delta\omega=0$. The Hodge Decomposition Theorem states that for compact $M$,

$$
\Omega^{k}(M) = \mathcal{H}^{k} \oplus d\Omega^{k-1}(M) \oplus \delta\Omega^{k+1}(M),
$$

where $\mathcal{H}^{k}$ is the finite-dimensional space of harmonic $k$-forms, canonically isomorphic to $H^{k}_{\mathrm{dR}}(M)$. Consequently $\Delta \eta = \omega$ is solvable iff $\omega$ is orthogonal to $\mathcal{H}^{k}$, generalizing the Helmholtz decomposition of vector fields into gradient, curl, and harmonic components.

## Complete Examples

### Example 3.4.1: Wedge Products and Pullbacks on $\mathbb{R}^{2}$

**Problem:** Let $\alpha = x \, dy$ and $\beta = y \, dx + (x^{2}+y^{2}) dy$ on $\mathbb{R}^{2}$. Compute $\alpha\wedge\beta$ and the pullback under $\phi(u,v)=(u^{2}-v^{2},2uv)$.

Expanding,

$$
\alpha\wedge\beta = x \, dy \wedge (y \, dx + (x^{2}+y^{2})dy) = -xy \, dx \wedge dy.
$$

For the pullback,

$$
\phi^{*}\alpha = (u^{2}-v^{2}) d(2uv) = 2v(u^{2}-v^{2}) du + 2u(u^{2}-v^{2}) dv,
$$

and similarly $\phi^{*}\beta$; direct computation shows $\phi^{*}(\alpha\wedge\beta)=\phi^{*}\alpha\wedge\phi^{*}\beta$, illustrating functoriality.

### Example 3.4.2: Maxwell’s Equations via Differential Forms

**Problem:** Express the vacuum Maxwell equations on Minkowski space using the electromagnetic 2-form $F$.

Setting

$$
F = E_{i} \, dx^{0} \wedge dx^{i} + \tfrac{1}{2} \epsilon_{ijk} B^{k} \, dx^{i} \wedge dx^{j},
$$

the equations $dF=0$ encode $\nabla\cdot B=0$ and $\partial_{t}B+\nabla\times E=0$, while $\delta F=0$ (with respect to the Minkowski metric) yields $\nabla\cdot E=0$ and $\nabla\times B - \partial_{t}E=0$. Thus the four Maxwell equations collapse into $dF=0$, $\delta F=0$.

### Example 3.4.3: de Rham Cohomology of the Torus

**Problem:** Compute $H^{1}(T^{3})$ using explicit closed forms.

On $T^{3}=S^{1}_{\theta_{1}}\times S^{1}_{\theta_{2}}\times S^{1}_{\theta_{3}}$, the 1-forms $d\theta_{i}$ are closed. If $d\theta_{1}=d f$, periodicity forces $f$ to be globally defined with derivative 1 along $\theta_{1}$—impossible—so $d\theta_{i}$ are non-exact. Therefore $H^{1}(T^{3})\cong \mathbb{R}^{3}$ with basis $[d\theta_{1}], [d\theta_{2}], [d\theta_{3}]$.

### Example 3.4.4: Exterior Derivative Recovers Curl and Divergence

**Problem:** Show that $d$ reproduces the classical operators on $\mathbb{R}^{3}$.

For a function $f$, $df = \nabla f^{\flat}$. For a 1-form $\alpha = V^{i} dx^{i}$,

$$
d\alpha = (\partial_{2}V^{3}-\partial_{3}V^{2}) dy\wedge dz + \cdots,
$$

the coefficients of which are the components of $\nabla \times V$. For a 2-form $\beta = P dy\wedge dz + Q dz\wedge dx + R dx\wedge dy$, $d\beta = (\partial_{x}P+\partial_{y}Q+\partial_{z}R) dx\wedge dy\wedge dz$, i.e. the divergence of the vector field $(P,Q,R)$.

### Example 3.4.5: Hodge Star on $\mathbb{R}^{3}$

**Problem:** Compute $*\alpha$ for the standard basis.

With $\operatorname{vol}=dx\wedge dy\wedge dz$, $*dx = dy\wedge dz$, $*dy = dz\wedge dx$, $*dz = dx\wedge dy$, and $*(dx\wedge dy) = dz$. These relations verify $\alpha\wedge *\beta = \langle \alpha, \beta \rangle \, \operatorname{vol}$.

### Example 3.4.6: Potential Flow on the Torus

**Problem:** Analyze the 1-form $\alpha = -\sin(2\pi x) dy + \cos(2\pi y) dx$ on $T^{2}$.

Compute $d\alpha = 0$, so $\alpha$ is closed. Integrating $\alpha$ along the fundamental cycles shows nonzero circulation, hence $\alpha$ is not exact and represents a nontrivial cohomology class. Physically, this is an incompressible flow with topological circulation.

### Example 3.4.7: Hodge Decomposition on $T^{2}$

**Problem:** Decompose $\omega = (\sin 2\pi x + \cos 2\pi y) dx + (\cos 2\pi x - \sin 2\pi y) dy$.

On $T^{2}$, harmonic 1-forms are constant multiples of $dx$ and $dy$. Because $\omega$ has zero average, its harmonic part vanishes. Solving $d\alpha = d\omega$ determines the exact part; computing $\delta\beta = \delta\omega$ yields the co-exact part. Thus $\omega = d\alpha + \delta\beta$ is purely analytic, illustrating the Hodge decomposition algorithmically.

### Example 3.4.8: Laplace–Beltrami on $S^{2}$

**Problem:** Determine the harmonic 0-forms on the sphere.

On $S^{2}$ with Laplacian $\Delta f = \delta df$, separation of variables gives eigenfunctions $Y_{\ell}^{m}$ with eigenvalues $\ell(\ell+1)$. Only $\ell=0$ (constant functions) satisfy $\Delta f=0$, in agreement with the fact that $H^{0}(S^{2}) \cong \mathbb{R}$. Higher-degree harmonics correspond to exact/co-exact components of forms.

## References

* Frankel, T. (2011). *The Geometry of Physics*. Cambridge University Press.
* Lee, J. M. (2012). *Introduction to Smooth Manifolds*. Springer.
* Nakahara, M. (2003). *Geometry, Topology and Physics*. CRC Press.
* Spivak, M. (1979). *A Comprehensive Introduction to Differential Geometry*. Publish or Perish.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 3.3 Entropy Solutions & Shock Theory]({{ '/diffequations/chapter-03/03-3-entropy-solutions/' | relative_url }})
- [Next Section: 3.5 Continuum Mechanics & Elasticity]({{ '/diffequations/chapter-03/03-5-continuum-mechanics/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-03/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
