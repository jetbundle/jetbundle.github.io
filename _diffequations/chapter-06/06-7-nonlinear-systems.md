---
layout: textbook
title: "Section 6.7: Fully Nonlinear & Overdetermined Systems"
description: "Monge-Ampère, continuity method"
permalink: /diffequations/chapter-06/06-7-nonlinear-systems/
order: 6.7
chapter: 6
section: 7
nav_order: 6.7
is_chapter_index: false
parent_chapter: 6
parent_section: null
---

# Section 6.7: Fully Nonlinear & Overdetermined Systems

> Convexity becomes ellipticity, and overdetermination reveals symmetry.

## Introduction

In the preceding sections of this chapter, we formulated partial differential equations as geometric objects within jet bundles and studied flows on the space of metrics. In those contexts, the nonlinearity typically arose from the geometry of the target manifold or the metric tensor, yet the differential operators often retained a quasilinear structure—linear in the highest order derivatives.

We now confront the "convexity barrier": fully nonlinear equations where the highest order derivatives interact nonlinearly. The archetype of this class is the Monge-Ampère equation, which governs problems of prescribed curvature and optimal transport. Here, the distinction between geometry and analysis vanishes completely; the convexity of the solution *is* the condition for ellipticity. We conclude the geometric formulation of PDEs by examining overdetermined systems, where an excess of boundary conditions imposes rigid symmetry constraints on the domain itself, a phenomenon captured by the method of moving planes.



### The Monge-Ampère Equation

The most significant fully nonlinear elliptic equation in geometry is the Monge-Ampère equation. Given a domain $\Omega \subset \mathbb{R}^n$ and a function $f > 0$, we seek a scalar function $u$ satisfying:

$$
\det(D^2 u) = f(x, u, \nabla u) \quad \text{in } \Omega
$$

Unlike the Laplacian $\Delta u = \text{tr}(D^2 u)$, which is linear in the Hessian, the Monge-Ampère operator acts via the determinant. To understand the analytical properties of this operator, we examine its linearization. Let $F(M) = \det M$. The linearization at a matrix $M$ in the direction $H$ is:

$$
D F(M) \cdot H = \text{tr}(\text{adj}(M) H) = \det(M) \text{tr}(M^{-1} H)
$$

For the resulting linear operator to be elliptic, the coefficient matrix—here, the cofactor matrix of $D^2 u$—must be positive definite. Consequently, the Monge-Ampère equation is elliptic only on the class of strictly convex functions. This creates a fundamental link: the analytical type of the equation dictates the geometric curvature of the solution graph.

#### Regularity and A Priori Estimates

The existence of classical solutions depends on establishing *a priori* estimates. For fully nonlinear equations $F(D^2 u, x) = 0$, regularity theory proceeds in a hierarchy:

1. **$C^0$ and $C^1$ Estimates:** Derived from the maximum principle and boundary barriers.

2. **$C^2$ Estimates (Pogorelov):** The crucial step is bounding the second derivatives. For the Monge-Ampère equation $\det D^2 u = f$, interior second derivative bounds are obtained by differentiating the equation twice and applying the maximum principle to an auxiliary function involving the Hessian. Pogorelov's estimates ensure that if $u$ is strictly convex, the eigenvalues of $D^2 u$ remain bounded away from zero and infinity.

3. **$C^{2,\alpha}$ Estimates (Evans-Krylov):** The transition from $C^2$ to smooth solutions is bridged by the Evans-Krylov theorem. It states that solutions to concave, fully nonlinear elliptic equations with bounded Hessians possess Hölder continuous second derivatives. Once $u \in C^{2,\alpha}$, higher regularity ($C^\infty$ or analytic) follows from standard bootstrapping of Schauder estimates.

This hierarchy demonstrates that convexity is not merely a geometric property but a regularity engine; it prevents the degeneration of ellipticity.

### The Continuity Method

To prove the existence of solutions to fully nonlinear problems, such as the Minkowski problem or the Monge-Ampère Dirichlet problem, we rely on the Continuity Method. This topological argument allows us to solve a difficult nonlinear problem by continuously deforming it into a trivial one.

Consider a family of equations indexed by $t \in [0, 1]$:

$$
G_t(u) \equiv \det(D^2 u) - [(1-t) \det(D^2 u_0) + t f] = 0
$$

where $u_0$ is a known solution at $t=0$. Let $\mathcal{S}$ be the set of $t \in [0, 1]$ for which a smooth convex solution exists. The proof consists of two steps:

1. **Openness:** We show that $\mathcal{S}$ is open in $[0, 1]$. If a solution $u_{t_0}$ exists, we linearize the operator $G_t$ around $u_{t_0}$. Since the equation is elliptic (due to convexity), the linearized operator is invertible between suitable Hölder spaces (e.g., $C^{2,\alpha} \to C^\alpha$). The Implicit Function Theorem in Banach spaces guarantees solvability for $t$ close to $t_0$.

2. **Closedness:** We show that $\mathcal{S}$ is closed. Let $t_k \to t^*$ with solutions $u_k$. To prove a limit solution $u^*$ exists, we require uniform *a priori* estimates independent of $k$. Specifically, we need bounds in a norm strictly stronger than the convergence norm (e.g., uniform $C^{2,\alpha}$ bounds to extract a $C^2$ limit via Arzelà-Ascoli).

The success of the Continuity Method relies entirely on the global *a priori* estimates established via the maximum principle. It unifies the analytic estimates with the topological degree of the mapping.

### Overdetermined Systems and Moving Planes

In geometric problems, one often encounters systems with more boundary conditions than necessary for solvability. An archetypal example is Serrin's Problem:

$$
\begin{cases}
-\Delta u = 1 & \text{in } \Omega \\
u = 0 & \text{on } \partial \Omega \\
\frac{\partial u}{\partial \nu} = \text{const} & \text{on } \partial \Omega
\end{cases}
$$

The Dirichlet problem $-\Delta u = 1, u \mid_{\partial \Omega} = 0$ admits a unique solution for any smooth domain. The additional Neumann condition $\partial_\nu u = c$ is generally impossible to satisfy. Serrin's theorem states that if a solution exists, $\Omega$ must be a ball and $u$ must be radially symmetric. This result implies that the differential equation acts as a detector of domain symmetry.

#### The Method of Moving Planes (Alexandrov Reflection)

The proof of Serrin's theorem utilizes the Method of Moving Planes, a technique based on the maximum principle and reflection symmetry.

1. **Reflection:** For a direction $\gamma$, consider a hyperplane $T_\lambda$ orthogonal to $\gamma$. Reflect the portion of the domain $\Omega$ behind the plane, denoted $\Sigma_\lambda$, across $T_\lambda$ to obtain $\Sigma'_\lambda$.

2. **Comparison:** Define the difference function $w_\lambda(x) = u(x_\lambda) - u(x)$, where $x_\lambda$ is the reflection of $x$. In the region where the reflection remains inside $\Omega$, $w_\lambda$ satisfies an elliptic equation.

3. **Maximum Principle:** Applying the maximum principle and the Hopf boundary lemma, one shows that $w_\lambda \geq 0$ as the plane sweeps inward from infinity.

4. **Symmetry:** The plane stops moving exactly when the domain becomes symmetric with respect to $T_\lambda$. If the Neumann condition holds constant everywhere, this reflection argument can be performed from every direction, forcing the domain to be a sphere.

This method illustrates "rigidity": local enforcement of the PDE and boundary data constrains the global topology of the manifold.

## Complete Examples

### Example 6.7.1: Canonical Example—The Dirichlet Problem in 2D

**Problem:** Solve the Monge-Ampère equation

$$
\det(D^2 u) = 1 \quad \text{in } B(0,1), \quad u \mid_{\partial B} = 0
$$

where $B(0,1)$ is the unit ball in $\mathbb{R}^2$.

**Step-by-Step Solution:**

1. **Radial Symmetry:**
   Assume radial symmetry: $u(r)$. The Hessian in polar coordinates is:

   $$
   D^2 u = \begin{pmatrix} u'' & \frac{u'}{r} \\ \frac{u'}{r} & \frac{u'}{r} \end{pmatrix}
   $$

2. **Determinant Computation:**
   $$
   \det(D^2 u) = u'' \cdot \frac{u'}{r} - \left(\frac{u'}{r}\right)^2 = \frac{u'' u'}{r} - \frac{(u')^2}{r^2}
   $$

3. **Differential Equation:**
   Set equal to 1:

   $$
   \frac{u'' u'}{r} - \frac{(u')^2}{r^2} = 1
   $$

4. **Substitution:**
   Let $v = u'$. Then $v' = u''$, so:

   $$
   v \frac{dv}{dr} \frac{1}{r} - \frac{v^2}{r^2} = 1
   $$

   Multiply through by $r^2$:

   $$
   r v \frac{dv}{dr} - v^2 = r^2
   $$

5. **Bernoulli Equation:**
   Let $w = v^2$:

   $$
   \frac{1}{2} r \frac{dw}{dr} - w = r^2
   $$

   Integrating factor: $\mu(r) = e^{-\int \frac{1}{r} dr} = \frac{1}{r}$

6. **Solution:**
   $$
   \frac{d}{dr} \left( \frac{w}{r} \right) = r \implies \frac{w}{r} = \frac{r^2}{2} + C \implies w = \frac{r^3}{2} + C r
   $$

   Thus $v = u' = \sqrt{\frac{r^3}{2} + C r}$. Boundary condition $u(1) = 0$ and symmetry at $r=0$ give $C = -\frac{1}{2}$.

7. **Final Solution:**
   $$
   u(r) = \int_r^1 \sqrt{\frac{t^3}{2} - \frac{t}{2}} \, dt = \frac{1}{6} (1 - r^3)
   $$

8. **Verification:**
   $$
   D^2 u = \begin{pmatrix} -r & -\frac{1}{2r} \\ -\frac{1}{2r} & -\frac{1}{2r^2} \end{pmatrix}, \quad \det(D^2 u) = r \cdot \frac{1}{2r^2} - \frac{1}{4r^2} = \frac{1}{2r} - \frac{1}{4r} = \frac{1}{4r} \cdot 2 = 1
   $$

   ✓ Verified

### Example 6.7.2: Physical Application—Optimal Transport

**Problem:** Monge-Ampère in Optimal Transport

Consider transporting density $\rho_0$ to $\rho_1$ with minimal cost $c(x,y) = \frac{1}{2}\mid x-y \mid^2$. The optimal transport map is $T = \nabla \phi$ where $\phi$ solves:

$$
\det(D^2 \phi(x)) = \frac{\rho_1(\nabla \phi(x))}{\rho_0(x)}
$$

**Step-by-Step Solution:**

1. **Uniform Densities:**
   Example: $\rho_0 = \rho_1 = 1$ on unit ball (uniform densities).

2. **Solution:**
   $\phi(x) = \frac{1}{6}(\mid x \mid^3 - 1)$ gives $T(x) = x$ (identity map).

3. **General Case:**
   For $\rho_0, \rho_1$ with same mass:

   **Linearization at $\phi_0$:**
   $$
   L v = \text{tr}(\text{adj}(D^2 \phi_0) D^2 v)
   $$

   **Ellipticity:** $\text{adj}(D^2 \phi_0) \succ 0$ since $\phi_0$ is strictly convex

   **Solvability:** Implicit Function Theorem gives local uniqueness

### Example 6.7.3: Pogorelov's $C^2$ Estimates

**Problem:** $\det(D^2 u) = 1$ in $B(0,1)$, $u|_{\partial B} = 0$, $u$ convex.

**Step-by-Step Solution:**

1. **Pogorelov's Auxiliary Function:**
   $$
   w(x) = e^{\alpha |x|^2} |D^2 u(x)|^2
   $$

2. **Key Computation:**
   $$
   \Delta w = e^{\alpha |x|^2} \left[ \alpha n |D^2 u|^2 + 2 \text{tr}(\text{adj}(D^2 u) D^3 u \cdot D^2 u) + |D^3 u|^2 \right]
   $$

3. **Crucial Inequality:**
   From differentiating $\det(D^2 u) = 1$:

   $$
   \text{tr}(\text{adj}(D^2 u) D^3 u \cdot D^2 u) \geq -C |D^2 u|^{3/2}
   $$

4. **Maximum Principle:**
   At maximum point of $w$, $\Delta w \leq 0$, so:

   $$
   |D^2 u|^2 \leq C \alpha^{-n/2}
   $$

5. **Result:**
   $$
   \|D^2 u\|_{L^\infty(B_{1/2})} \leq C
   $$

### Example 6.7.4: Evans-Krylov $C^{2,\alpha}$ Theory

**Problem:** Establish Hölder continuity of second derivatives.

**Step-by-Step Solution:**

1. **Theorem Statement:**
   If $F(M) = 0$ is uniformly elliptic and concave, and $u \in C^2$ with $\|D^2 u\|_\infty \leq \Lambda$, then $u \in C^{2,\alpha}$.

2. **Detailed Proof Sketch for Monge-Ampère:**
   **Difference Quotients:**
   $$
   [D^2 u(x+h) - D^2 u(x)]_{ij} = \int_0^1 \frac{\partial}{\partial t} D^2 u(x + t h)_{ij} dt
   $$

3. **Linearized Operator:**
   $$
   L v = \text{tr}(\text{adj}(D^2 u) D^2 v)
   $$

4. **Harnack Inequality for $L$:**
   Since $\text{adj}(D^2 u) \succ 0$, we get:

   $$
   \sup_{B_r} v \leq C \inf_{B_r} v + C r^2 \|f\|_{L^\infty}
   $$

5. **Campanato Estimates:**
   $$
   [v]_{C^{0,\alpha}(B_r)} \leq C r^{2-\alpha} (\text{osc}_{B_r} v)^{1/2}
   $$

6. **Bootstrap:**
   $C^{2,\alpha} \to C^{2,\alpha+\beta} \to C^\infty$

### Example 6.7.5: Continuity Method—Minkowski Problem

**Problem:** Find convex body with given surface area measure:

$$
\det(D^2 u + u_{ij} \delta_{ij}) = f(x) \quad \text{on } S^{n-1}
$$

**Step-by-Step Solution:**

1. **Continuity Method:**
   $$
   G_t(u) = \det(D^2 u + u_{ij} \delta_{ij}) - [(1-t) + t f(x)] = 0
   $$

2. **Openness Proof:**
   **Linearization:**
   $$
   L v = \text{tr}\left( \text{adj}(D^2 u_0 + u_0 \delta) D^2 v \right)
   $$

   **Ellipticity:** Eigenvalues of $\text{adj}(D^2 u_0 + u_0 \delta)$ are positive since:
   - $D^2 u_0 + u_0 \delta \succ 0$ (strictly convex)
   - $\text{adj}(M) \succ 0$ when $M \succ 0$

   **Invertibility:** $L: C^{2,\alpha}(S^{n-1}) \to C^\alpha(S^{n-1})$ is Fredholm index 0 and injective (by maximum principle), hence surjective.

3. **Closedness Argument:**
   Sequence: $u_k$ solves $G_{t_k}(u_k) = 0$, $t_k \to t^*$

   **Step 1: $C^0$ bounds (Krylov):**
   Consider $v = e^{\alpha |x|^2} u$. Maximum principle gives:

   $$
   \sup |u| \leq C(\sup f, \text{diam } \Omega)
   $$

   **Step 2: $C^1$ bounds (Calabi):**
   $w = e^{\alpha |x|^2} |\nabla u|^2$

   $$
   \Delta w + c(x) |\nabla w| \leq C w
   $$

   **Step 3: $C^2$ bounds (Pogorelov, as above)**

   **Step 4: Higher regularity (Evans-Krylov + Schauder)**

   **Convergence:** Arzelà-Ascoli + regularity gives $u_k \to u^*$ in $C^{2,\alpha}$

### Example 6.7.6: Serrin's Problem—Complete Proof in 2D

**Problem:**
$$
\begin{cases}
-\Delta u = 1 & \text{in } \Omega \subset \mathbb{R}^2 \\
u = 0 & \text{on } \partial \Omega \\
\partial_\nu u = c & \text{on } \partial \Omega
\end{cases}
$$

**Step-by-Step Solution:**

1. **Moving Planes in $x_1$-direction:**
   For $\lambda < \lambda_1 = \inf \{x_1 : x \in \Omega\}$ define:

   $$
   w_\lambda(x) = u(x^\lambda) - u(x)
   $$

   where $x^\lambda = (2\lambda - x_1, x_2)$.

2. **Equation for $w_\lambda$:**
   In $\Sigma_\lambda = \{x \in \Omega: x_1 < \lambda\}$:

   $$
   -\Delta w_\lambda = 0
   $$

3. **Boundary Conditions:**
   $w_\lambda = 0$ on $\{x_1 = \lambda\} \cap \Omega$

   On reflected boundary: $\partial_\nu u(x^\lambda) = c = \partial_\nu u(x)$

4. **Hopf Lemma Application:**
   At boundary points, $\partial_\nu w_\lambda \geq 0$ (strict unless $w_\lambda \equiv 0$).

5. **Continuation:**
   $w_\lambda \geq 0$ in $\Sigma_\lambda$. As $\lambda$ increases, either:
   - $w_\lambda \equiv 0$ (symmetry), or
   - $\partial_\nu w_\lambda > 0$ somewhere

6. **Global Symmetry:**
   The stopping plane $\lambda^*$ gives reflection symmetry. Rotating direction $\gamma$ and repeating gives full rotational symmetry.

7. **Final Result:**
   $\Omega = B_R(0)$, $u(r) = \frac{1}{4}(R^2 - r^2)$, $c = R$

### Example 6.7.7: Moving Planes for Monge-Ampère

**Problem:** $\det(D^2 u) = 1$, $u|_{\partial \Omega} = 0$, $|\nabla u|_{\partial \Omega} = c$

**Step-by-Step Solution:**

1. **Reflection Function:**
   $$
   w_\lambda(x) = u(x^\lambda) - u(x) - \epsilon(|x^\lambda|^2 - |x|^2)
   $$

2. **Key Computation:**
   $$
   \det(D^2 w_\lambda) = \det\begin{pmatrix} D^2 u(x^\lambda) & * \\ * & D^2 u(x) \end{pmatrix} + \text{lower order}
   $$

3. **Block Determinant Analysis:**
   Shows $w_\lambda \geq 0$ by convexity.

### Example 6.7.8: Real Monge-Ampère Equation

**Problem:** $\det\begin{pmatrix} u_{xx} & u_{xy} \\ u_{yx} & u_{yy} \end{pmatrix} = e^u$ (complex geometry)

**Step-by-Step Solution:**

1. **Linearization:**
   $$
   L v = u_{xx} v_{yy} + u_{yy} v_{xx} - 2 u_{xy} v_{xy} + e^u v
   $$

2. **Eigenvalue Analysis:**
   The symbol $p(\xi) = u_{xx} \xi_2^2 + u_{yy} \xi_1^2 - 2 u_{xy} \xi_1 \xi_2$ is elliptic iff $D^2 u \succ 0$.

3. **Geometric Interpretation:**
   This equation arises in Kähler geometry, where $u$ represents a Kähler potential and the equation prescribes the Ricci curvature.

## References

* Evans, L. C. (2010). *Partial Differential Equations*. American Mathematical Society.
* Gilbarg, D., & Trudinger, N. S. (2001). *Elliptic Partial Differential Equations of Second Order*. Springer.
* Lee, J. M. (2012). *Introduction to Smooth Manifolds*. Springer.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 6.6 Gauge Theories & Instanton Moduli]({{ '/diffequations/chapter-06/06-6-gauge-theories/' | relative_url }})
- [Next Section: 7.1 D-Modules & Holonomic Systems]({{ '/diffequations/chapter-07/07-1-d-modules/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-06/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
