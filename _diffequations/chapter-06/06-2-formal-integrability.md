---
layout: textbook
title: "Section 6.2: Formal Integrability & Spencer Cohomology"
description: "Symbol modules, compatibility conditions"
permalink: /diffequations/chapter-06/06-2-formal-integrability/
order: 6.2
chapter: 6
section: 2
nav_order: 6.2
is_chapter_index: false
parent_chapter: 6
parent_section: null
---

# Section 6.2: Formal Integrability & Spencer Cohomology

> Hidden algebraic obstructions determine whether a differential equation admits solutions before we attempt to construct them.

## Introduction

Having established in the previous section that a system of partial differential equations corresponds to a submanifold $\mathcal{E}_k$ of the jet bundle $J^k(E)$, we now address the fundamental question of existence. Geometric consistency requires that we determine whether there exists a section of the bundle whose $k$-jet graph lies entirely within $\mathcal{E}_k$.

Unlike ordinary differential equations, where the existence of solutions is guaranteed by continuity conditions (Peano), partial differential equations often conceal hidden algebraic obstructions. A system may appear consistent in its original variables yet imply contradictory constraints when differentiated. This section develops the algebraic machinery required to uncover these hidden constraints, moving from the geometry of jet bundles to the homological algebra of the symbol.



### Symbol and Principal Part

To analyze the solvability of a system, we linearize the highest-order terms. Let $\pi: E \to M$ be a fiber bundle, and let the PDE be defined by a submanifold $\mathcal{R}_k \subset J^k(E)$. Locally, this is described by the vanishing of functions $F^\mu(x^i, u^\alpha, p^\alpha_I) = 0$ for $\mid I \mid \le k$.

The *principal symbol* of the system at a point $q \in \mathcal{R}_k$ encodes the algebraic relations imposed on the highest derivatives. We define the geometric symbol $\sigma_q(\mathcal{R}_k)$ as a subspace of the symmetric tensor product of the cotangent space with the vertical tangent space. Specifically, considering the vertical projection $V_\pi E = \ker d\pi$, the symbol is the kernel of the linearized map restricted to the highest order jet components:

$$
g_k = \ker \left( dF: S^k T^*_x M \otimes V_u E \to \mathbb{R}^s \right)
$$

where $S^k$ denotes the $k$-th symmetric power. In coordinates, if the system is quasilinear, the symbol is defined by the matrix of coefficients of the highest order derivatives:

$$
\sigma_k(F)(\xi) = \sum_{\mid \alpha \mid =k} a^\alpha_\beta(x,u) \xi_\alpha
$$

Here, the symbol $g_k$ is viewed as a module over the ring of polynomials on the cotangent bundle.

The algebraic structure of $g_k$ determines the "strength" of the system. If $g_k = 0$, the system is determined or overdetermined to the point of potentially fixing the derivatives at a point. If $g_k$ is non-zero, it describes the freedom available in choosing the Taylor coefficients of a potential solution. This algebraic formulation is covered extensively in Bryant et al. (1991), emphasizing that the classification of the symbol (e.g., elliptic, hyperbolic) is strictly a property of this submodule.

### Prolongation of Systems

Defining the PDE as a manifold $\mathcal{R}_k$ is insufficient because the derivatives of the equations $D_i F^\mu = 0$ must also hold. Geometrically, this corresponds to *prolongation*. The first prolongation $\mathcal{R}_{k+1} \subset J^{k+1}(E)$ is the set of $(k+1)$-jets such that the jet maps into $\mathcal{R}_k$ and its tangent planes are tangent to the contact distribution of $\mathcal{R}_k$.

Algebraically, we obtain the prolongation of the symbol, denoted $g_{k+1}$, by differentiating the relations defining $g_k$. This constructs a subspace:

$$
g_{k+1} \subset S^{k+1} T^*M \otimes VE
$$

The system is said to be *formally integrable* if we can continue this process indefinitely, constructing a tower of manifolds:

$$
\dots \to \mathcal{R}_{k+1} \to \mathcal{R}_k \to \dots
$$

such that each projection $\pi_{k+l}^{k+l+1}: \mathcal{R}_{k+l+1} \to \mathcal{R}_{k+l}$ is a surjective submersion.

If this surjectivity fails at step $l$, it indicates that differentiating the equations generated new algebraic constraints on lower-order jets—constraints that were not visible in the original system. These are *integrability conditions*. A classic example is the incompatibility of cross-derivatives in an overdetermined system, or the curvature constraints in geometric problems. Formal integrability ensures that no such hidden obstructions exist, and that one can construct a formal power series solution order by order (Goldschmidt, 1967).

### Spencer Cohomology

To determine if a system is formally integrable without checking infinitely many prolongations, we utilize the homological machinery introduced by Donald Spencer. The *Spencer complex* arises by treating the symbol module $g_k$ as the core object. We construct a sequence of vector bundles relating the symmetric algebra (derivatives) to the exterior algebra (differential forms).

The Spencer operator $\delta$ maps an element of the prolongation to a 1-form with values in the previous symbol:

$$
\delta: \Lambda^j T^*M \otimes g_{k+1} \to \Lambda^{j+1} T^*M \otimes g_k
$$

This creates a chain complex (the Spencer complex) at each point $x \in M$:

$$
0 \to g_m \xrightarrow{\delta} T^*M \otimes g_{m-1} \xrightarrow{\delta} \Lambda^2 T^*M \otimes g_{m-2} \xrightarrow{\delta} \dots \xrightarrow{\delta} \Lambda^n T^*M \otimes g_{m-n} \to 0
$$

The cohomology groups of this complex, denoted $H^{p,q}(g)$, measure the intrinsic algebraic obstructions to solving the PDE.

The cohomology group $H^{0,k}$ relates to the symbol itself. The group $H^{1,k}$ relates to the obstructions to lifting a solution from order $k$ to $k+1$ (surjectivity of prolongation). The group $H^{2,k}$ relates to the curvature-like obstructions to integrability (torsion).

A symbol $g_k$ is called *involutive* if these cohomology groups vanish for sufficiently high degrees. The Poincaré-δ lemma ensures that for the full unconstrained jet bundle, the cohomology vanishes. For a specific PDE, non-vanishing cohomology indicates an obstruction.

This cohomological perspective (Spencer, 1969) is the definitive link between the geometry of the equation and its solvability. It provides the rigorous criterion for the Cartan-Kähler theorem: if a system is analytic and its symbol is involutive (meaning the Spencer cohomology vanishes in the relevant degrees), then the system is locally solvable. This result replaces the ad-hoc manipulation of derivatives with a precise homological test, marking the transition from classical analysis to the algebraic geometry of differential equations.

> **Heat Equation Symbol Analysis**

> For the heat equation $u_t = u_{xx}$ in $\mathbb{R}^2_{t,x}$, the jet bundle $J^1(\mathbb{R}^2,\mathbb{R})$ has coordinates $(t,x,u,u_t,u_x,u_{xx},u_{tx},u_{tt})$. The PDE is $F(t,x,u,u_t,u_x,u_{xx},u_{tx},u_{tt}) = u_t - u_{xx} = 0$.

> The highest order terms are order 1 in $t$ and order 2 in $x$, so the principal symbol is $\sigma_1(F)(\xi_t, \xi_x) = \xi_t \cdot 1 - \xi_x^2 \cdot 1 = \xi_t - \xi_x^2$. The symbol module is $g_1 = \ker\begin{pmatrix} \xi_t - \xi_x^2 \end{pmatrix} = \left\{ (\xi_t, \xi_x) \in S^1 T^*M \otimes V_uE \;\middle\mid\; \xi_t = \xi_x^2 \right\}$.

> The symbol describes a parabolic cone in cotangent space. This is involutive (no obstructions), and the symbol's structure immediately reveals the parabolic character without solving the PDE. The geometric structure of the symbol encodes the fundamental properties of the differential operator.

The symbol analysis provides a geometric classification of differential equations. The parabolic structure of the heat equation is encoded in the symbol, revealing the equation's fundamental properties before any solution is constructed.

> **Cauchy-Riemann System**

> For the Cauchy-Riemann equations $u_x = v_y$ and $u_y = -v_x$, the jet bundle $J^1(\mathbb{R}^2,\mathbb{R}^2)$ has coordinates $(x,y,u,v,u_x,u_y,v_x,v_y)$. The PDE system is $F^1 = u_x - v_y = 0$ and $F^2 = u_y + v_x = 0$.

> The principal symbols are $\sigma_1(F^1)(\xi_x, \xi_y) = \xi_x - \xi_y$ and $\sigma_1(F^2)(\xi_x, \xi_y) = \xi_x + \xi_y$, giving the symbol matrix $\sigma_1(F) = \begin{pmatrix} \xi_x - \xi_y & 0 \\ 0 & \xi_x + \xi_y \end{pmatrix}$. The symbol module is $g_1 = \ker \sigma_1(F) = \left\{ (\eta^u, \eta^v) \;\middle\mid\; (\xi_x - \xi_y)\eta^u = 0, \; (\xi_x + \xi_y)\eta^v = 0 \right\}$.

> When $\xi_x \neq \xi_y$ and $\xi_x \neq -\xi_y$, we have $g_1 = 0$ (elliptic). On characteristics $\xi_x = \xi_y$ or $\xi_x = -\xi_y$, the symbol module is non-zero. The symbol vanishes generically, confirming the analyticity of holomorphic functions and connecting to the D-module theory of Chapter 7.1.

The Cauchy-Riemann system demonstrates how the symbol analysis reveals the elliptic nature of the system. The generic vanishing of the symbol ensures that solutions are analytic, a fundamental property of holomorphic functions.

> **Overdetermined Laplace System**

> For the system $u_x = 0$ and $u_y = 0$, the first prolongation computes total derivatives: $D_x(F^1) = u_{xx} = 0$, $D_y(F^1) = u_{xy} = 0$, $D_x(F^2) = u_{yx} = 0$, and $D_y(F^2) = u_{yy} = 0$. The compatibility check $D_y(D_x(F^1)) = D_x(D_y(F^1))$ gives $u_{xxy} = u_{xyx}$, which is always true by equality of mixed partials.

> The prolonged system at order 2 is $\mathcal{R}_2 = \left\{ u_x = 0, u_y = 0, u_{xx} = 0, u_{xy} = 0, u_{yx} = 0, u_{yy} = 0 \right\}$. The symbol evolution shows $g_1 = \ker\begin{pmatrix} \xi_x & 0 \\ 0 & \xi_y \end{pmatrix} = \{0\}$ and $g_2 = \ker\begin{pmatrix} \xi_x^2 & 0 & 0 \\ \xi_x\xi_y & 0 & 0 \\ 0 & \xi_x\xi_y & 0 \\ 0 & 0 & \xi_y^2 \end{pmatrix} = \{0\}$. The system is formally integrable, so solutions exist: $u =$ constant.

This example demonstrates how the prolongation process systematically checks compatibility. When the symbol remains zero through prolongation, the system is formally integrable and admits solutions.

> **Incompatible System**

> Consider the system $u_x = v$, $u_y = w$, and $v_x + w_y = 1$. The first prolongation gives $D_x(F^1): u_{xx} = v_x$, $D_y(F^1): u_{xy} = v_y$, $D_x(F^2): u_{yx} = w_x$, $D_y(F^2): u_{yy} = w_y$, $D_x(F^3): v_{xx} + w_{xy} = 0$, and $D_y(F^3): v_{xy} + w_{yy} = 0$.

> Computing mixed derivatives, the compatibility condition $D_y(D_x(F^1)) = D_x(D_y(F^1))$ gives $u_{xxy} = u_{xyx}$. Substituting using the original equations, we find $D_y(v_x) = D_x(w_y)$, so $v_{xy} = w_{xy}$. From $D_x(F^3)$ we have $w_{xy} = -v_{xx}$, and from $D_y(F^3)$ we have $v_{xy} = -w_{yy}$. Combining these gives $v_{xy} = w_{xy} \implies -w_{yy} = -v_{xx} \implies v_{xx} = w_{yy}$, producing the new constraint $v_{xx} - w_{yy} = 0$.

> The prolonged system introduces a new independent equation that was not present in the original system, indicating failure of formal integrability. This obstruction prevents the construction of solutions, revealing an algebraic inconsistency that was hidden in the original formulation.

The failure of formal integrability manifests as new constraints appearing during prolongation. These constraints reveal algebraic inconsistencies that prevent the system from admitting solutions, demonstrating how the symbol analysis systematically uncovers hidden obstructions.

> **Laplace Equation and Spencer Cohomology**

> For the Laplace equation $u_{xx} + u_{yy} = 0$, the symbol is $\sigma_2(\xi) = \xi_x^2 + \xi_y^2$, giving $g_2 = \ker(\xi_x^2 + \xi_y^2) = \{0\}$ (elliptic).

> The Spencer complex at a generic point is $0 \to g_2 \xrightarrow{\delta} T^*M \otimes g_1 \xrightarrow{\delta} \Lambda^2 T^*M \otimes g_0 \to 0$. Since $g_2 = \{0\}$, the complex simplifies to $0 \to 0 \to T^*M \otimes V_uE \xrightarrow{\delta} \Lambda^2 T^*M \otimes \mathbb{R} \to 0$. The Spencer operator $\delta: T^*M \otimes V_uE \to \Lambda^2 T^*M \otimes \mathbb{R}$ acts as $\delta(\xi_x \partial_x \otimes \eta^u + \xi_y \partial_y \otimes \eta^u) = (\xi_x d\xi_y - \xi_y d\xi_x) \eta^u$.

> Computing the cohomology, we find $H^{0,2} = g_2 = 0$, $\ker \delta = 0$ (since $\xi_x d\xi_y - \xi_y d\xi_x \neq 0$ generically), $H^{1,1} = 0$, and $H^{2,0} = \mathbb{R}/\text{im } \delta = 0$ (surjective). The symbol is involutive, so the Cartan-Kähler theorem guarantees the existence of solutions.

The Spencer cohomology provides a homological test for formal integrability. When all relevant cohomology groups vanish, the system is involutive and admits solutions by the Cartan-Kähler theorem.

> **Curvature Constraint and Non-Vanishing Cohomology**

> For a metric $ds^2 = E(x,y)dx^2 + 2F(x,y)dxdy + G(x,y)dy^2$, consider the compatibility system for Christoffel symbols: $\Gamma^x_{xx} = \partial_x \log\sqrt{E}$, $\Gamma^y_{xy} = \partial_y \log\sqrt{E}$, and $R^x_{yxy} = 0$. The symbol analysis gives $g_1 \subset S^1 T^*M \otimes V_{\Gamma}E$.

> The first prolongation generates the Gaussian curvature constraint $K = \frac{1}{E} \left( \partial_{xx} \log E + \partial_{yy} \log E - \partial_{xy} \log EG \right) = 0$. In the Spencer complex $0 \to g_2 \xrightarrow{\delta} T^*M \otimes g_1 \xrightarrow{\delta} \Lambda^2 T^*M \otimes g_0$, the curvature $K$ appears as a cocycle in $H^{2,0}$: $[K] \in Z^2(g_\bullet) = \ker(d: \Lambda^2 T^*M \otimes g_0 \to \Lambda^3 T^*M \otimes g_{-1})$.

> The cohomology is non-vanishing: $H^{2,0}(g_\bullet) \neq 0$. The Gaussian curvature is the obstruction to flatness. Solutions exist if and only if $K = 0$, connecting to the Ricci flow theory of Chapter 6.5.

Non-vanishing cohomology groups reveal geometric obstructions to solvability. The Gaussian curvature constraint demonstrates how the Spencer cohomology encodes the fundamental geometric obstructions that determine whether a system admits solutions.

> **Monge-Ampère Equation**

> For the Monge-Ampère equation $\det D^2u = 1$, the jet bundle is $J^2(\mathbb{R}^2,\mathbb{R})$ and the PDE is $F(u_{xx},u_{xy},u_{yy}) = u_{xx}u_{yy} - u_{xy}^2 - 1 = 0$. The principal symbol is $\sigma_2(\xi) = \xi_x^2 \eta_{yy} - 2\xi_x\xi_y \eta_{xy} + \xi_y^2 \eta_{xx}$ where $\eta = (D^2u)$ represents the Hessian.

> The symbol module is $g_2 = \left\{ \eta \in S^2 T^*M \otimes V_uE \;\middle\mid\; \det\eta = 1 \right\}$. The first prolongation involves differentiating the determinant constraint, generating complex compatibility conditions involving third derivatives. The Spencer cohomology computation gives $H^{1,2}(g_\bullet) \neq 0$.

> The system is not formally integrable in the classical sense, but admits viscosity solutions (connecting to Chapter 6.7). The non-vanishing $H^{1,2}$ explains why Monge-Ampère requires special methods such as the continuity method and a priori estimates, rather than the standard formal integrability theory.

The Monge-Ampère equation demonstrates how non-vanishing Spencer cohomology reveals the need for specialized solution methods. The obstruction in $H^{1,2}$ indicates that the system cannot be solved using standard formal power series methods, necessitating the sophisticated techniques developed in Chapter 6.7.

> **KdV Hierarchy and Complete Integrability**

> For the KdV hierarchy equation $u_{txx} = 6u_x u_{xx} + u_x u_{xxx}$, the order 3 PDE is $F(t,x,u,u_x,u_{xx},u_{txx},u_{xxx}) = u_{txx} - 6u_x u_{xx} - u_x u_{xxx} = 0$. The principal symbol is $\sigma_3(F)(\xi_t, \xi_x) = \xi_t - \xi_x^3$, giving $g_3 = \ker(\xi_t - \xi_x^3) = \left\{ (\xi_t, \xi_x) \;\middle\mid\; \xi_t = \xi_x^3 \right\}$.

> Computing the first prolongation via total derivatives $D_t F = 0$ and $D_x F = 0$, we find $D_t(u_{txx}) = 6 D_t(u_x u_{xx}) + D_t(u_x u_{xxx})$, which generates higher-order compatibility conditions. After the standard computations in integrability theory, all prolongations remain consistent.

> The Spencer cohomology shows that the symbol $g_3$ is involutive: $H^{p,q}(g_\bullet) = 0$ for all $p \geq 1$ and $q \geq 0$. The infinite hierarchy of symmetries (Chapter 4) guarantees vanishing cohomology. The system is formally integrable, connecting to the Lax pair formulation and inverse scattering theory.

The KdV hierarchy demonstrates how complete integrability manifests in the Spencer cohomology. The vanishing of all relevant cohomology groups reflects the infinite hierarchy of symmetries, providing a homological characterization of integrability.

## References

* Bryant, R. L., Chern, S. S., Gardner, R. B., Goldschmidt, H. L., & Griffiths, P. A. (1991). *Exterior Differential Systems*. Springer-Verlag.
* Goldschmidt, H. (1967). Integrability criteria for systems of nonlinear partial differential equations. *Journal of Differential Geometry*, 1(3-4), 269-307.
* Spencer, D. C. (1969). Overdetermined systems of linear partial differential equations. *Bulletin of the American Mathematical Society*, 75(2), 179-239.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 6.1 Jet Bundles & Prolongation]({{ '/diffequations/chapter-06/06-1-jet-bundles/' | relative_url }})
- [Next Section: 6.3 Exterior Differential Systems & Cartan-Kähler]({{ '/diffequations/chapter-06/06-3-exterior-systems/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-06/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
