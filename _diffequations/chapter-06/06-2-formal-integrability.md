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

## Introduction

Having established in the previous section that a system of partial differential equations corresponds to a submanifold $\mathcal{E}_k$ of the jet bundle $J^k(E)$, we now address the fundamental question of existence. Geometric consistency requires that we determine whether there exists a section of the bundle whose $k$-jet graph lies entirely within $\mathcal{E}_k$.

Unlike ordinary differential equations, where the existence of solutions is guaranteed by continuity conditions (Peano), partial differential equations often conceal hidden algebraic obstructions. A system may appear consistent in its original variables yet imply contradictory constraints when differentiated. This section develops the algebraic machinery required to uncover these hidden constraints, moving from the geometry of jet bundles to the homological algebra of the symbol.

## Mathematical Content

### Symbol and Principal Part

To analyze the solvability of a system, we linearize the highest-order terms. Let $\pi: E \to M$ be a fiber bundle, and let the PDE be defined by a submanifold $\mathcal{R}_k \subset J^k(E)$. Locally, this is described by the vanishing of functions $F^\mu(x^i, u^\alpha, p^\alpha_I) = 0$ for $|I| \le k$.

The *principal symbol* of the system at a point $q \in \mathcal{R}_k$ encodes the algebraic relations imposed on the highest derivatives. We define the geometric symbol $\sigma_q(\mathcal{R}_k)$ as a subspace of the symmetric tensor product of the cotangent space with the vertical tangent space. Specifically, considering the vertical projection $V_\pi E = \ker d\pi$, the symbol is the kernel of the linearized map restricted to the highest order jet components:

$$
g_k = \ker \left( dF: S^k T^*_x M \otimes V_u E \to \mathbb{R}^s \right)
$$

where $S^k$ denotes the $k$-th symmetric power. In coordinates, if the system is quasilinear, the symbol is defined by the matrix of coefficients of the highest order derivatives:

$$
\sigma_k(F)(\xi) = \sum_{|\alpha|=k} a^\alpha_\beta(x,u) \xi_\alpha
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

* $H^{0,k}$ relates to the symbol itself.

* $H^{1,k}$ relates to the obstructions to lifting a solution from order $k$ to $k+1$ (surjectivity of prolongation).

* $H^{2,k}$ relates to the curvature-like obstructions to integrability (torsion).

A symbol $g_k$ is called *involutive* if these cohomology groups vanish for sufficiently high degrees. The Poincaré-δ lemma ensures that for the full unconstrained jet bundle, the cohomology vanishes. For a specific PDE, non-vanishing cohomology indicates an obstruction.

This cohomological perspective (Spencer, 1969) is the definitive link between the geometry of the equation and its solvability. It provides the rigorous criterion for the Cartan-Kähler theorem: if a system is analytic and its symbol is involutive (meaning the Spencer cohomology vanishes in the relevant degrees), then the system is locally solvable. This result replaces the ad-hoc manipulation of derivatives with a precise homological test, marking the transition from classical analysis to the algebraic geometry of differential equations.

## Complete Examples

### Example 6.2.1: Canonical Example—Heat Equation

**System:** $u_t = u_{xx}$ in $\mathbb{R}^2_{t,x}$

**Step-by-Step Solution:**

1. **Jet Bundle:** $J^1(\mathbb{R}^2,\mathbb{R})$ with coordinates $(t,x,u,u_t,u_x,u_{xx},u_{tx},u_{tt})$

2. **PDE:** $F(t,x,u,u_t,u_x,u_{xx},u_{tx},u_{tt}) = u_t - u_{xx} = 0$

3. **Principal Symbol Calculation:**
   The highest order terms are order 1 in $t$ and order 2 in $x$:

   $$
   \sigma_1(F)(\xi_t, \xi_x) = \xi_t \cdot 1 - \xi_x^2 \cdot 1 = \xi_t - \xi_x^2
   $$

4. **Symbol Module:**
   $$
   g_1 = \ker\begin{pmatrix} \xi_t - \xi_x^2 \end{pmatrix} = \left\{ (\xi_t, \xi_x) \in S^1 T^*M \otimes V_uE \;\middle|\; \xi_t = \xi_x^2 \right\}
   $$

5. **Geometric Interpretation:**
   The symbol describes a parabolic cone in cotangent space. This is involutive (no obstructions).

   **Key Insight:** The symbol's structure immediately reveals the parabolic character without solving the PDE.

### Example 6.2.2: Illustrative Application—Cauchy-Riemann System

**System:** Cauchy-Riemann equations $u_x = v_y$, $u_y = -v_x$

**Step-by-Step Solution:**

1. **Jet Bundle:** $J^1(\mathbb{R}^2,\mathbb{R}^2)$ with coordinates $(x,y,u,v,u_x,u_y,v_x,v_y)$

2. **PDE System:**
   $$
   \begin{cases}
   F^1 = u_x - v_y = 0 \\
   F^2 = u_y + v_x = 0
   \end{cases}
   $$

3. **Principal Symbol:**
   $$
   \sigma_1(F^1)(\xi_x, \xi_y) = \xi_x \cdot 1 + \xi_y \cdot (-1) = \xi_x - \xi_y
   $$

   $$
   \sigma_1(F^2)(\xi_x, \xi_y) = \xi_x \cdot 1 + \xi_y \cdot 1 = \xi_x + \xi_y
   $$

4. **Symbol Matrix:**
   $$
   \sigma_1(F) = \begin{pmatrix} \xi_x - \xi_y & 0 \\ 0 & \xi_x + \xi_y \end{pmatrix}
   $$

5. **Symbol Module:**
   $$
   g_1 = \ker \sigma_1(F) = \left\{ (\eta^u, \eta^v) \;\middle|\; (\xi_x - \xi_y)\eta^u = 0, \; (\xi_x + \xi_y)\eta^v = 0 \right\}
   $$

6. **Analysis:**
   When $\xi_x \neq \xi_y$ and $\xi_x \neq -\xi_y$: $g_1 = 0$ (elliptic)

   On characteristics $\xi_x = \xi_y$ or $\xi_x = -\xi_y$: $g_1 \neq 0$

   **Physical Interpretation:** The symbol vanishes generically, confirming analyticity of holomorphic functions (connects to Chapter 7.1 D-modules).

### Example 6.2.3: Canonical Example—Overdetermined Laplace System

**Problem:** Original System (order 1):

$$
\begin{cases}
F^1: u_x = 0 \\
F^2: u_y = 0
\end{cases}
$$

**Step-by-Step Solution:**

1. **First Prolongation:**
   Compute total derivatives:

   $$
   D_x(F^1) = D_x(u_x) = u_{xx} = 0
   $$

   $$
   D_y(F^1) = D_y(u_x) = u_{xy} = 0
   $$

   $$
   D_x(F^2) = D_x(u_y) = u_{yx} = 0
   $$

   $$
   D_y(F^2) = D_y(u_y) = u_{yy} = 0
   $$

2. **Compatibility Check:**
   $D_y(D_x(F^1)) = D_x(D_y(F^1))$ gives $u_{xxy} = u_{xyx}$ (always true by equality of mixed partials).

3. **Prolonged System (order 2):**
   $$
   \mathcal{R}_2 = \left\{ u_x = 0, u_y = 0, u_{xx} = 0, u_{xy} = 0, u_{yx} = 0, u_{yy} = 0 \right\}
   $$

4. **Symbol Evolution:**
   $$
   g_1 = \ker\begin{pmatrix} \xi_x & 0 \\ 0 & \xi_y \end{pmatrix} = \{0\}
   $$

   $$
   g_2 = \ker\begin{pmatrix} \xi_x^2 & 0 & 0 \\ \xi_x\xi_y & 0 & 0 \\ 0 & \xi_x\xi_y & 0 \\ 0 & 0 & \xi_y^2 \end{pmatrix} = \{0\}
   $$

5. **Conclusion:**
   Formally integrable $\to$ solutions exist: $u =$ constant.

### Example 6.2.4: Failure of Prolongation—Incompatible System

**Problem:** Original System:

$$
\begin{cases}
F^1: u_x = v \\
F^2: u_y = w \\
F^3: v_x + w_y = 1
\end{cases}
$$

**Step-by-Step Solution:**

1. **First Prolongation:**
   $$
   D_x(F^1): u_{xx} = v_x
   $$

   $$
   D_y(F^1): u_{xy} = v_y
   $$

   $$
   D_x(F^2): u_{yx} = w_x
   $$

   $$
   D_y(F^2): u_{yy} = w_y
   $$

   $$
   D_x(F^3): v_{xx} + w_{xy} = 0
   $$

   $$
   D_y(F^3): v_{xy} + w_{yy} = 0
   $$

2. **Compatibility Obstruction:**
   Compute mixed derivatives:

   $$
   D_y(D_x(F^1)) = D_x(D_y(F^1)) \implies u_{xxy} = u_{xyx}
   $$

   But substitute using original equations:

   $$
   D_y(v_x) = D_x(w_y) \implies v_{xy} = w_{xy}
   $$

   From $D_x(F^3)$: $w_{xy} = -v_{xx}$

   From $D_y(F^3)$: $v_{xy} = -w_{yy}$

3. **Obstruction:**
   $v_{xy} = w_{xy} \implies -w_{yy} = -v_{xx} \implies v_{xx} = w_{yy}$

   **New Constraint:** $v_{xx} - w_{yy} = 0$

4. **Conclusion:**
   The prolonged system introduces a new independent equation, indicating failure of formal integrability.

### Example 6.2.5: Canonical Computation—Constant Coefficient System

**Problem:** $u_{xx} + u_{yy} = 0$ (Laplace equation)

**Step-by-Step Solution:**

1. **Symbol:**
   $$
   \sigma_2(\xi) = \xi_x^2 + \xi_y^2
   $$

   $$
   g_2 = \ker(\xi_x^2 + \xi_y^2) = \{0\} \quad \text{(elliptic)}
   $$

2. **Spencer Complex (at generic point):**
   $$
   0 \to g_2 \xrightarrow{\delta} T^*M \otimes g_1 \xrightarrow{\delta} \Lambda^2 T^*M \otimes g_0 \to 0
   $$

   Since $g_2 = \{0\}$, the complex is:

   $$
   0 \to 0 \to T^*M \otimes V_uE \xrightarrow{\delta} \Lambda^2 T^*M \otimes \mathbb{R} \to 0
   $$

3. **Spencer Operator:**
   $$
   \delta: T^*M \otimes V_uE \to \Lambda^2 T^*M \otimes \mathbb{R}
   $$

   $$
   \delta(\xi_x \partial_x \otimes \eta^u + \xi_y \partial_y \otimes \eta^u) = (\xi_x d\xi_y - \xi_y d\xi_x) \eta^u
   $$

4. **Cohomology Computation:**
   $H^{0,2} = g_2 = 0$

   $\ker \delta = 0$ (since $\xi_x d\xi_y - \xi_y d\xi_x \neq 0$ generically)

   $H^{1,1} = 0$

   $H^{2,0} = \mathbb{R}/\text{im } \delta = 0$ (surjective)

5. **Conclusion:**
   Involutive $\to$ Cartan-Kähler guarantees solutions.

### Example 6.2.6: Nontrivial Cohomology—Curvature Constraint

**Problem:** Compatibility for metric $ds^2 = E(x,y)dx^2 + 2F(x,y)dxdy + G(x,y)dy^2$

**PDE System (Christoffel symbols compatibility):**

$$
\begin{cases}
F^1: \Gamma^x_{xx} = \partial_x \log\sqrt{E} \\
F^2: \Gamma^y_{xy} = \partial_y \log\sqrt{E} \\
F^3: R^x_{yxy} = 0
\end{cases}
$$

**Step-by-Step Solution:**

1. **Symbol Analysis (simplified):**
   $g_1 \subset S^1 T^*M \otimes V_{\Gamma}E$

2. **First Prolongation generates Gaussian curvature constraint:**
   $$
   K = \frac{1}{E} \left( \partial_{xx} \log E + \partial_{yy} \log E - \partial_{xy} \log EG \right) = 0
   $$

3. **Spencer Complex:**
   $$
   0 \to g_2 \xrightarrow{\delta} T^*M \otimes g_1 \xrightarrow{\delta} \Lambda^2 T^*M \otimes g_0
   $$

4. **Key Computation:**
   The curvature $K$ appears as a cocycle in $H^{2,0}$:

   $$
   [K] \in Z^2(g_\bullet) = \ker(d: \Lambda^2 T^*M \otimes g_0 \to \Lambda^3 T^*M \otimes g_{-1})
   $$

5. **Non-vanishing Cohomology:**
   $H^{2,0}(g_\bullet) \neq 0$

6. **Physical Interpretation:**
   The Gaussian curvature is the obstruction to flatness. Solutions exist if and only if $K = 0$ (connect to Chapter 6.5 Ricci flow).

### Example 6.2.7: Advanced Demonstration—Monge-Ampère Equation

**Problem:** $\det D^2u = 1$

**Step-by-Step Solution:**

1. **Jet Bundle:** $J^2(\mathbb{R}^2,\mathbb{R})$

2. **PDE:** $F(u_{xx},u_{xy},u_{yy}) = u_{xx}u_{yy} - u_{xy}^2 - 1 = 0$

3. **Principal Symbol:**
   $$
   \sigma_2(\xi) = \xi_x^2 \eta_{yy} - 2\xi_x\xi_y \eta_{xy} + \xi_y^2 \eta_{xx}
   $$

   where $\eta = (D^2u)$ represents the Hessian.

4. **Symbol Module:**
   $$
   g_2 = \left\{ \eta \in S^2 T^*M \otimes V_uE \;\middle|\; \det\eta = 1 \right\}
   $$

5. **Prolongation:**
   The first prolongation involves differentiating the determinant constraint, generating complex compatibility conditions involving third derivatives.

6. **Spencer Cohomology Computation:**
   $H^{1,2}(g_\bullet) \neq 0$

7. **Obstruction:**
   The system is not formally integrable in the classical sense, but admits viscosity solutions (connects to Chapter 6.7).

   **Key Insight:** Non-vanishing $H^{1,2}$ explains why Monge-Ampère requires special methods (continuity method, a priori estimates).

### Example 6.2.8: Complete Integrability Test—KdV Hierarchy

**Problem:** $u_{txx} = 6u_x u_{xx} + u_x u_{xxx}$ (KdV hierarchy)

**Step-by-Step Solution:**

1. **Order 3 PDE:**
   $F(t,x,u,u_x,u_{xx},u_{txx},u_{xxx}) = u_{txx} - 6u_x u_{xx} - u_x u_{xxx} = 0$

2. **Principal Symbol:**
   $$
   \sigma_3(F)(\xi_t, \xi_x) = \xi_t \cdot 1 - \xi_x^3 \cdot 1 = \xi_t - \xi_x^3
   $$

   $$
   g_3 = \ker(\xi_t - \xi_x^3) = \left\{ (\xi_t, \xi_x) \;\middle|\; \xi_t = \xi_x^3 \right\}
   $$

3. **First Prolongation:**
   Compute total derivatives $D_t F = 0$, $D_x F = 0$:

   $D_t F$:

   $$
   D_t(u_{txx}) = 6 D_t(u_x u_{xx}) + D_t(u_x u_{xxx})
   $$

   This generates higher-order compatibility conditions.

4. **Key Result:**
   After tedious computation (standard in integrability theory), all prolongations remain consistent.

5. **Spencer Cohomology:**
   The symbol $g_3$ is involutive:

   $$
   H^{p,q}(g_\bullet) = 0 \quad \forall p \geq 1, q \geq 0
   $$

6. **Verification:**
   The infinite hierarchy of symmetries (Chapter 4) guarantees vanishing cohomology.

7. **Conclusion:**
   Formally integrable $\to$ Connects to Lax pair formulation and inverse scattering.

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
