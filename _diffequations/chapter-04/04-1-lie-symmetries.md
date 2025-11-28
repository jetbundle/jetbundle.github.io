---
layout: textbook
title: "Section 4.1: Lie Symmetries & Prolongation"
description: "Continuous groups, jet spaces, symmetry reduction"
permalink: /diffequations/chapter-04/04-1-lie-symmetries/
order: 4.1
chapter: 4
section: 1
nav_order: 4.1
is_chapter_index: false
parent_chapter: 4
parent_section: null
---

# Section 4.1: Lie Symmetries & Prolongation

## Introduction

The geometric formulation of Chapter 3 allowed us to state physical laws invariantly on manifolds, yet it offered no general algorithm for solving the resulting nonlinear equations. We now turn from the geometry of the domain to the algebraic structure of the solution space itself.

In the late 19th century, Sophus Lie realized that the disparate "tricks" of integration—separation of variables, integrating factors, and homogeneous substitutions—were all manifestations of a single, unifying principle: **invariance under continuous groups of transformations**. Just as a circle is defined by its invariance under rotation, a differential equation is characterized by the group of transformations that map its solution set to itself.

This section establishes the algorithmic foundation of Lie theory. We replace the difficult task of finding finite global symmetries with the linear problem of finding infinitesimal vector fields. To do so, we must extend—or **prolong**—the action of these fields from the base manifold to the jet space of derivatives.

## Mathematical Content

### Lie Groups and Lie Algebras

A symmetry of a system is a transformation that leaves the equations of motion invariant. While discrete symmetries (such as reflection or time-reversal) provide qualitative insight, **continuous symmetries** provide the mechanism for constructive integration.

We define a **Lie group** $G$ as a smooth manifold endowed with a group structure where the multiplication and inversion maps are smooth. For differential equations, we are primarily concerned with the action of $G$ on a manifold $M$ (representing independent and dependent variables).

The computational power of Lie theory stems from **linearization**. Rather than working with the nonlinear manifold $G$, we work with its tangent space at the identity, the **Lie algebra** $\mathfrak{g}$.

An element of the Lie algebra corresponds to a **vector field** on $M$. If $\Phi_\epsilon: M \to M$ is a one-parameter subgroup of transformations parameterized by $\epsilon$, the infinitesimal generator $\mathbf{v}$ is defined as:

$$
\mathbf{v}|_z = \frac{d}{d\epsilon}\bigg|_{\epsilon=0} \Phi_\epsilon(z)
$$

For a system with independent variables $x = (x^1, \dots, x^n)$ and dependent variables $u = (u^1, \dots, u^m)$, the vector field takes the local form:

$$
\mathbf{v} = \sum_{i=1}^n \xi^i(x,u) \frac{\partial}{\partial x^i} + \sum_{\alpha=1}^m \phi^\alpha(x,u) \frac{\partial}{\partial u^\alpha}
$$

The functions $\xi^i$ and $\phi^\alpha$ are the infinitesimals of the transformation. As established in Olver (1995), the global group action can be recovered from this vector field via the **exponential map**, which amounts to solving the autonomous system of ODEs:

$$
\frac{d\tilde{z}}{d\epsilon} = \mathbf{v}(\tilde{z}), \quad \tilde{z}(0) = z
$$

### Prolongation to Jet Space

A differential equation imposes constraints not just on the variables $(x,u)$, but on the derivatives of $u$. Therefore, to check if a vector field $\mathbf{v}$ generates a symmetry, we must determine how $\mathbf{v}$ transforms derivatives. This process is called **prolongation**.

Geometrically, we act on the **Jet Space** $J^k$, the manifold coordinatized by independent variables, dependent variables, and all partial derivatives up to order $k$. A point in $J^k$ is denoted $(x, u, u^{(k)})$.

The $n$-th prolongation of $\mathbf{v}$, denoted $\text{pr}^{(n)}\mathbf{v}$, is a vector field on $J^n$ that preserves the contact structure—ensuring that if a surface is the graph of a function $u=f(x)$, its transformed surface remains the graph of a function.

The general formula for the first prolongation is given by:

$$
\text{pr}^{(1)}\mathbf{v} = \mathbf{v} + \sum_{\alpha, i} \phi^\alpha_i \frac{\partial}{\partial u^\alpha_i}
$$

where the coefficient $\phi^\alpha_i$ represents the infinitesimal change in the first derivative $u^\alpha_i = \partial u^\alpha / \partial x^i$.

Crucially, $\phi^\alpha_i$ is not arbitrary; it is determined entirely by $\xi$ and $\phi$. The explicit formula is derived via the **Total Derivative** operator $D_i$:

$$
D_i = \frac{\partial}{\partial x^i} + \sum_\alpha u^\alpha_i \frac{\partial}{\partial u^\alpha} + \sum_{\alpha,j} u^\alpha_{ij} \frac{\partial}{\partial u^\alpha_j} + \dots
$$

The prolongation formula is:

$$
\phi^\alpha_i = D_i(\phi^\alpha) - \sum_{j=1}^n u^\alpha_j D_i(\xi^j)
$$

For higher derivatives, this implies a recursive structure. As detailed in Bluman & Anco (2002), the coefficient for a multi-index $J = (j_1, \dots, j_k)$ is:

$$
\phi^\alpha_J = D_J(\phi^\alpha - \sum_i \xi^i u^\alpha_i) + \sum_i \xi^i u^\alpha_{J,i}
$$

This recursive algebraic structure ensures that the geometry of the derivative is preserved under the transformation.

### The Determining Equations

This formalism leads to the fundamental algorithm for calculating symmetries. Let a system of differential equations be defined by the vanishing of a function on jet space:

$$
\Delta_\nu(x, u, u^{(n)}) = 0, \quad \nu = 1, \dots, l
$$

The infinitesimal criterion for invariance requires that the prolonged vector field vanishes on the solution manifold:

$$
\text{pr}^{(n)}\mathbf{v} [\Delta_\nu] \bigg|_{\Delta=0} = 0
$$

When we expand this condition, we obtain an expression involving $x$, $u$, and derivatives $u^{(n)}$. However, the coefficients $\xi$ and $\phi$ depend *only* on $x$ and $u$. Since the condition must hold for *all* solutions, the terms involving independent derivatives must vanish separately.

This allows us to split the invariance condition into a system of linear, overdetermined partial differential equations for $\xi$ and $\phi$, known as the **determining equations**.

**Example: The Heat Equation**

Consider the linear heat equation $u_t = u_{xx}$. We seek a generator $\mathbf{v} = \xi \partial_x + \tau \partial_t + \phi \partial_u$.

The invariance condition is:

$$
\phi^{t} - \phi^{xx} = 0
$$

Substituting the prolongation formulae for $\phi^t$ and $\phi^{xx}$ and separating monomials in $u_x, u_{xx}$, etc., yields the defining relations for the symmetry group. For the heat equation, this reveals not only the obvious time and space translations but also the **Galilean boost**:

$$
\mathbf{v} = 2t \partial_x - x u \partial_u
$$

and the projective transformation, recovering the fundamental solution derived in Chapter 1.3.

### Symmetry Reduction and Canonical Coordinates

Once a symmetry generator $\mathbf{v}$ is found, it can be used to reduce the order of the differential equation. The geometric insight is that we can choose a coordinate system in which the flow of $\mathbf{v}$ is "straightened out."

We seek **canonical coordinates** $(r, s)$ such that the vector field becomes a pure translation:

$$
\mathbf{v} = \frac{\partial}{\partial s}
$$

The remaining variables $r$ (the **invariants**) are the coordinates of the quotient manifold $M/G$. In these coordinates, the differential equation cannot depend on $s$.

1. **For ODEs:** This reduces the order by one. If an $n$-th order ODE admits an $n$-dimensional solvable Lie algebra of symmetries, it can be reduced to quadrature (Ibragimov, 1989).

2. **For PDEs:** This reduces the number of independent variables by one. A PDE in two variables $(x,t)$ reduces to an ODE in the similarity variable $z(x,t)$.

This systematic reduction explains the success of the ansatz methods in Chapter 1. The "similarity variable" $x/\sqrt{t}$ used to solve the heat equation is not a guess; it is an invariant of the scaling symmetry group.

## Complete Examples

### Example 4.1.1: Canonical Example—First-Order ODE

**Problem:** Find all Lie point symmetries of the ODE $y' = \frac{y}{x}$.

**Step-by-Step Solution:**

1. **Setup the Generator:**
$$
\mathbf{v} = \xi(x,y) \frac{\partial}{\partial x} + \phi(x,y) \frac{\partial}{\partial y}
$$

2. **First Prolongation:**
The first prolongation coefficient is:
$$
\phi^x = D_x(\phi) - y_x D_x(\xi)
$$
where $D_x = \partial_x + y' \partial_y = \partial_x + \frac{y}{x} \partial_y$.

3. **Invariance Condition:**
The ODE is $F(x,y,y') = y' - \frac{y}{x} = 0$. The invariance condition requires:
$$
\text{pr}^{(1)}\mathbf{v}[F] \bigg|_{F=0} = 0
$$

4. **Detailed Prolongation Computation:**
$$
D_x(\phi) = \phi_x + \frac{y}{x} \phi_y, \quad D_x(\xi) = \xi_x + \frac{y}{x} \xi_y
$$

$$
\phi^x = \phi_x + \frac{y}{x} \phi_y - \frac{y}{x} \left( \xi_x + \frac{y}{x} \xi_y \right)
$$

Now compute the action on $\frac{y}{x}$:
$$
\text{pr}^{(1)}\mathbf{v}\left[\frac{y}{x}\right] = \frac{\phi}{x} - \frac{y \xi}{x^2}
$$

5. **Determining Equations:**
The invariance condition becomes:
$$
\phi_x + \frac{y}{x} \phi_y - \frac{y}{x} \left( \xi_x + \frac{y}{x} \xi_y \right) - \frac{\phi}{x} + \frac{y \xi}{x^2} = 0
$$

6. **Coefficient Separation:**
Collect terms by powers of $y$:
- $y^0$ terms: $\phi_x - \frac{\phi}{x} = 0$
- $y^1$ terms: $\frac{1}{x} \phi_y - \frac{1}{x} \xi_x = 0$
- $y^2$ terms: $-\frac{1}{x^2} \xi_y = 0$

7. **Solve the System:**
From $y^2$: $\xi_y = 0 \implies \xi = \xi(x)$

From $y^1$: $\phi_y = \xi_x$

From $y^0$: $\phi_x = \frac{\phi}{x}$

Solving: $\xi = c_1$ (constant), $\phi = c_2 x$

**Complete Symmetry Algebra:**
$$
\mathbf{v} = c_1 \frac{\partial}{\partial x} + c_2 x \frac{\partial}{\partial y}
$$

**Verification and Interpretation:**
- $c_1$: Translation $x \to x + \epsilon$
- $c_2$: Scaling $x \to e^\epsilon x$, $y \to e^\epsilon y$

**Reduction:** Use invariants $z = \frac{y}{x}$. Then $z' = 0$, so $y = kx$.

### Example 4.1.2: Physical Application—Emden-Fowler Equation

**Problem:** Find symmetries of the Emden-Fowler equation:
$$
y'' + \frac{2}{x} y' + x^\alpha y^\beta = 0
$$

This models polytropic stars in astrophysics. We compute for the critical case $\alpha = -2$, $\beta = 5$.

**Step-by-Step Solution:**

1. **Second Prolongation Required:**
$$
\mathbf{v} = \xi(x,y) \partial_x + \phi(x,y) \partial_y
$$

$$
\text{pr}^{(2)}\mathbf{v} = \mathbf{v} + \phi^x \partial_{y'} + \phi^{xx} \partial_{y''}
$$

2. **Prolongation Formulae:**
$$
\phi^x = D_x(\phi) - y' D_x(\xi), \quad \phi^{xx} = D_x(\phi^x) - y'' D_x(\xi)
$$

3. **Invariance Condition:**
For $F = y'' + \frac{2}{x} y' + x^{-2} y^5 = 0$:
$$
\text{pr}^{(2)}\mathbf{v}[F] = \phi^{xx} + \frac{2}{x} \phi^x - \frac{2}{x^2} y' \xi - \frac{5}{x^2} y^4 \phi = 0
$$

4. **Case Analysis:**
After extensive algebraic manipulation, the determining equations yield:
- **Translation:** $\xi = c_1$, $\phi = 0$
- **Scaling:** $\xi = c_2 x$, $\phi = -\frac{1}{3} c_2 y$
- **Special:** $\xi = c_3 x^3$, $\phi = -c_3 x^2 y$

5. **Physical Interpretation:**
- Scaling symmetry explains self-similar collapse
- Special symmetry $x^3 \partial_x - x^2 y \partial_y$ gives exact solutions
- Lie algebra structure: $[V_1,V_2] = V_2$, $[V_2,V_3] = 2V_3$

6. **Reduction Using Special Symmetry:**
Canonical coordinates for $V_3$:
$$
r = \frac{1}{x^2}, \quad s = \frac{y}{x}
$$

The reduced equation becomes first-order in $(r, s')$.

**Result:** Reveals exact solutions matching numerical simulations of stellar collapse.

### Example 4.1.3: Advanced Demonstration—Burgers' Equation

**Problem:** Complete symmetry analysis of the inviscid Burgers' equation $u_t + u u_x = 0$.

**Step-by-Step Solution:**

1. **Generator and Prolongations:**
$$
\mathbf{v} = \xi(x,t,u) \partial_x + \tau(x,t,u) \partial_t + \phi(x,t,u) \partial_u
$$

First Prolongation:
$$
\phi^t = D_t(\phi) - u_t D_t(\tau) - u_x D_t(\xi)
$$

$$
\phi^x = D_x(\phi) - u_x D_x(\tau) - u_x D_x(\xi)
$$

2. **Invariance Condition:**
For $F = u_t + u u_x = 0$:
$$
\text{pr}^{(1)}\mathbf{v}[F] = \phi^t + u \phi^x + u_x \phi = 0
$$

3. **Systematic Expansion:**
After collecting 27 independent monomials in derivatives, we get the determining equations:
- $\phi_{uu} = 0$ (from $u_{tt}$, $u_{tx}$, $u_{xx}$ terms)
- $\phi_u = 2\tau_t + \xi_x$ (from $u_t$ term)
- $\phi_u = \tau_x + \xi_t$ (from $u_x$ term)
- $\phi_t + u \phi_x = 0$ (constant term)

4. **Solve the Overdetermined System:**
From $\phi_{uu} = 0$: $\phi = A(x,t) u + B(x,t)$

From consistency: $\tau_x + \xi_t = 2\tau_t + \xi_x$

From constant term: $A_t + u A_x = 0 \implies A = c_1$ (constant)

5. **Complete Solution:**
- **Translations:** $\partial_t$, $\partial_x$
- **Galilean boost:** $t \partial_x$
- **Scaling:** $2t \partial_t + x \partial_x$
- **Projective:** $t^2 \partial_t + t x \partial_x - t u \partial_u$
- **Infinite-dimensional:** $\phi = f(t-x) \partial_u$

6. **Lie Algebra Structure:**
$$
[\partial_x, t \partial_x] = \partial_x
$$

$$
[2t \partial_t + x \partial_x, t^2 \partial_t + t x \partial_x] = 2(t^2 \partial_t + t x \partial_x)
$$

7. **Reduction Example:**
Use Galilean boost $V = t \partial_x$. Canonical coordinates:
$$
r = x - u t, \quad s = t
$$

Reduced equation: $u_r = 0 \implies u = f(x - ut)$

**Connection to Physics:** Explains shock formation via method of characteristics.

### Example 4.1.4: Theoretical Demonstration—Symmetry Classification

**Problem:** Classify all first-order ODEs admitting a 3-dimensional symmetry algebra.

**Theorem:** An ODE $F(x,y,y') = 0$ admits a 3-dimensional Lie algebra iff it is equivalent to one of:
- **Linear:** $y' = f(x)y + g(x)$
- **Homogeneous:** $y' = f\left(\frac{y}{x}\right)$

**Proof via Example:**

Consider $y' = P(x) + Q(x)y + R(x)y^2$.

1. **Assume Full Algebra:**
Suppose $\dim \mathfrak{g} = 3$. The possible non-isomorphic 3D Lie algebras are:
- $A_{3,1}$: Heisenberg
- $A_{3,2}$: Euclidean
- $A_{3,3}$: Lorentz
- $A_{3,4}$: $\mathfrak{sl}(2,\mathbb{R})$

2. **Test $A_{3,4}$ (most interesting):**
Basis $\{V_1, V_2, V_3\}$ with $[V_1,V_2] = V_2$, $[V_1,V_3] = 2V_3$, $[V_2,V_3] = V_3$

3. **Solve Determining Equations Simultaneously:**
This requires solving 27 coupled PDEs for each generator. The result: Only linear equations $y' = a(x)y + b(x)$ admit $\mathfrak{sl}(2,\mathbb{R})$ symmetry.

4. **Explicit Computation for $y' = k y$:**
$$
V_1 = \partial_x, \quad V_2 = x \partial_x + y \partial_y, \quad V_3 = x^2 \partial_x + x y \partial_y
$$

**Verification:** Each satisfies the prolongation condition independently.

5. **Reduction to Quadrature:**
$V_1$: $y = z(x)$, reduces to $z' = k z$

$V_2$: $z = y/x$, $z' = k z$

**Complete integration:** $y = C x^k$

### Example 4.1.5: Advanced Reduction—Heat Equation Similarity Solutions

**Problem:** Derive the fundamental solution using Lie symmetries.

**Step-by-Step Solution:**

1. **Heat Equation Symmetries:**
Core generators:
$$
V_1 = \partial_t, \quad V_2 = \partial_x, \quad V_3 = 2t \partial_x - x u \partial_u
$$

$$
V_4 = t \partial_t + \frac{x}{2} \partial_x - \frac{u}{2} \partial_u
$$

2. **Optimal System Analysis:**
To find distinct similarity solutions, compute the optimal system. The Lie algebra is 6-dimensional with specific commutation relations.

3. **Two-Dimensional Subalgebras:**
Consider $V_4 + V_3$:
$$
\mathbf{v} = t \partial_t + \frac{x}{2} \partial_x + \left( -\frac{1}{2} - 2t \right) u \partial_u
$$

4. **Canonical Coordinates:**
Solve $\mathbf{v}[r] = 0$, $\mathbf{v}[s] = 1$:
$$
r = \frac{x}{\sqrt{t}}, \quad s = \log t
$$

5. **Reduction:**
In $(r,s)$ coordinates, the heat equation becomes an ODE in $r$:
$$
u_{ss} + \frac{1}{2} r u_{sr} - \frac{1}{4} u_{rr} - \frac{1}{2r} u_r - \frac{1}{2} u = 0
$$

6. **Similarity Solution:**
Ansatz $u = t^{-\frac{1}{2}} f(r)$ yields:
$$
f'' + \frac{1}{r} f' + \frac{1}{4} r^2 f = 0
$$

7. **Exact Solution:**
This is the parabolic cylinder equation. The fundamental solution is:
$$
u(x,t) = \frac{1}{\sqrt{4\pi t}} \exp\left( -\frac{x^2}{4t} \right)
$$

**Connection:** Precisely matches the Green's function from Chapter 1.3!

## References

* Bluman, G. W., & Anco, S. C. (2002). *Symmetry and Integration Methods for Differential Equations*. Springer.
* Ibragimov, N. H. (1989). *Elementary Lie Group Analysis and Ordinary Differential Equations*. Wiley.
* Olver, P. J. (1995). *Equivalence, Invariants, and Symmetry*. Cambridge University Press.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 3.6 Geometric Optics, Rays & Caustics]({{ '/diffequations/chapter-03/03-6-geometric-optics/' | relative_url }})
- [Next Section: 4.2 Noether's Theorem & Invariant Reduction]({{ '/diffequations/chapter-04/04-2-noether-theorem/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-04/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
