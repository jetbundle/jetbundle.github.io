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

The disparate "tricks" of integration—separation of variables, integrating factors, homogeneous substitutions—are all manifestations of a single unifying principle: invariance under continuous groups of transformations.

## Introduction

The geometric formulation of Chapter 3 allowed us to state physical laws invariantly on manifolds, yet it offered no general algorithm for solving the resulting nonlinear equations. We now turn from the geometry of the domain to the algebraic structure of the solution space itself.

In the late 19th century, Sophus Lie realized that the disparate "tricks" of integration—separation of variables, integrating factors, and homogeneous substitutions—were all manifestations of a single, unifying principle: **invariance under continuous groups of transformations**. Just as a circle is defined by its invariance under rotation, a differential equation is characterized by the group of transformations that map its solution set to itself.

This section establishes the algorithmic foundation of Lie theory. We replace the difficult task of finding finite global symmetries with the linear problem of finding infinitesimal vector fields. To do so, we must extend—or **prolong**—the action of these fields from the base manifold to the jet space of derivatives.

## Lie Groups and Lie Algebras

A symmetry of a system is a transformation that leaves the equations of motion invariant. While discrete symmetries (such as reflection or time-reversal) provide qualitative insight, **continuous symmetries** provide the mechanism for constructive integration.

We define a **Lie group** $G$ as a smooth manifold endowed with a group structure where the multiplication and inversion maps are smooth. For differential equations, we are primarily concerned with the action of $G$ on a manifold $M$ (representing independent and dependent variables).

The computational power of Lie theory stems from **linearization**. Rather than working with the nonlinear manifold $G$, we work with its tangent space at the identity, the **Lie algebra** $\mathfrak{g}$.

An element of the Lie algebra corresponds to a **vector field** on $M$. If $\Phi_\epsilon: M \to M$ is a one-parameter subgroup of transformations parameterized by $\epsilon$, the infinitesimal generator $\mathbf{v}$ is defined as:

$$
\mathbf{v}\vert_z = \frac{d}{d\epsilon}\vert_{\epsilon=0} \Phi_\epsilon(z)
$$

For a system with independent variables $x = (x^1, \dots, x^n)$ and dependent variables $u = (u^1, \dots, u^m)$, the vector field takes the local form:

$$
\mathbf{v} = \sum_{i=1}^n \xi^i(x,u) \frac{\partial}{\partial x^i} + \sum_{\alpha=1}^m \phi^\alpha(x,u) \frac{\partial}{\partial u^\alpha}
$$

The functions $\xi^i$ and $\phi^\alpha$ are the infinitesimals of the transformation. As established in Olver (1995), the global group action can be recovered from this vector field via the **exponential map**, which amounts to solving the autonomous system of ODEs:

$$
\frac{d\tilde{z}}{d\epsilon} = \mathbf{v}(\tilde{z}), \quad \tilde{z}(0) = z
$$

## Prolongation to Jet Space

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

## The Determining Equations

This formalism leads to the fundamental algorithm for calculating symmetries. Let a system of differential equations be defined by the vanishing of a function on jet space:

$$
\Delta_\nu(x, u, u^{(n)}) = 0, \quad \nu = 1, \dots, l
$$

The infinitesimal criterion for invariance requires that the prolonged vector field vanishes on the solution manifold:

$$
\text{pr}^{(n)}\mathbf{v} [\Delta_\nu] \vert_{\Delta=0} = 0
$$

When we expand this condition, we obtain an expression involving $x$, $u$, and derivatives $u^{(n)}$. However, the coefficients $\xi$ and $\phi$ depend *only* on $x$ and $u$. Since the condition must hold for *all* solutions, the terms involving independent derivatives must vanish separately.

This allows us to split the invariance condition into a system of linear, overdetermined partial differential equations for $\xi$ and $\phi$, known as the **determining equations**.

**The Heat Equation**

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

The determining equations transform the nonlinear problem of finding symmetries into a linear system of partial differential equations. This linearization is the key algorithmic advantage of Lie's method: we can systematically compute all symmetries by solving an overdetermined system, rather than guessing transformations.

**First-Order ODE Symmetries**

Find all Lie point symmetries of the ODE $y' = \frac{y}{x}$.

We set up the generator $\mathbf{v} = \xi(x,y) \frac{\partial}{\partial x} + \phi(x,y) \frac{\partial}{\partial y}$. The first prolongation coefficient is $\phi^x = D_x(\phi) - y_x D_x(\xi)$ where $D_x = \partial_x + y' \partial_y = \partial_x + \frac{y}{x} \partial_y$.

Computing $D_x(\phi) = \phi_x + \frac{y}{x} \phi_y$ and $D_x(\xi) = \xi_x + \frac{y}{x} \xi_y$, we obtain:

$$
\phi^x = \phi_x + \frac{y}{x} \phi_y - \frac{y}{x} \left( \xi_x + \frac{y}{x} \xi_y \right)
$$

The action on $\frac{y}{x}$ gives $\text{pr}^{(1)}\mathbf{v}\left[\frac{y}{x}\right] = \frac{\phi}{x} - \frac{y \xi}{x^2}$. The invariance condition $\text{pr}^{(1)}\mathbf{v}[F] \vert_{F=0} = 0$ for $F(x,y,y') = y' - \frac{y}{x} = 0$ becomes:

$$
\phi_x + \frac{y}{x} \phi_y - \frac{y}{x} \left( \xi_x + \frac{y}{x} \xi_y \right) - \frac{\phi}{x} + \frac{y \xi}{x^2} = 0
$$

Collecting terms by powers of $y$: $y^0$ terms give $\phi_x - \frac{\phi}{x} = 0$, $y^1$ terms give $\frac{1}{x} \phi_y - \frac{1}{x} \xi_x = 0$, and $y^2$ terms give $-\frac{1}{x^2} \xi_y = 0$. From the $y^2$ condition, $\xi_y = 0$ implies $\xi = \xi(x)$. From $y^1$, $\phi_y = \xi_x$, and from $y^0$, $\phi_x = \frac{\phi}{x}$. Solving this system yields $\xi = c_1$ (constant) and $\phi = c_2 x$.

The complete symmetry algebra is $\mathbf{v} = c_1 \frac{\partial}{\partial x} + c_2 x \frac{\partial}{\partial y}$, where $c_1$ generates translation $x \to x + \epsilon$ and $c_2$ generates scaling $x \to e^\epsilon x$, $y \to e^\epsilon y$. Using the invariants $z = \frac{y}{x}$, we reduce the equation to $z' = 0$, so $y = kx$.

This example demonstrates the systematic nature of the determining equations: by separating coefficients of independent monomials, we obtain a finite system of linear PDEs that can be solved exactly. The resulting symmetries immediately provide a reduction method.

## Symmetry Reduction and Canonical Coordinates

Once a symmetry generator $\mathbf{v}$ is found, it can be used to reduce the order of the differential equation. The geometric insight is that we can choose a coordinate system in which the flow of $\mathbf{v}$ is "straightened out."

We seek **canonical coordinates** $(r, s)$ such that the vector field becomes a pure translation:

$$
\mathbf{v} = \frac{\partial}{\partial s}
$$

The remaining variables $r$ (the **invariants**) are the coordinates of the quotient manifold $M/G$. In these coordinates, the differential equation cannot depend on $s$.

For ODEs, this reduces the order by one. If an $n$-th order ODE admits an $n$-dimensional solvable Lie algebra of symmetries, it can be reduced to quadrature (Ibragimov, 1989). For PDEs, this reduces the number of independent variables by one. A PDE in two variables $(x,t)$ reduces to an ODE in the similarity variable $z(x,t)$.

This systematic reduction explains the success of the ansatz methods in Chapter 1. The "similarity variable" $x/\sqrt{t}$ used to solve the heat equation is not a guess; it is an invariant of the scaling symmetry group.

**Heat Equation Similarity Solutions**

Derive the fundamental solution using Lie symmetries.

The heat equation admits core generators $V_1 = \partial_t$, $V_2 = \partial_x$, $V_3 = 2t \partial_x - x u \partial_u$, and $V_4 = t \partial_t + \frac{x}{2} \partial_x - \frac{u}{2} \partial_u$. To find distinct similarity solutions, we compute the optimal system. The Lie algebra is 6-dimensional with specific commutation relations.

Considering the two-dimensional subalgebra generated by $V_4 + V_3$:

$$
\mathbf{v} = t \partial_t + \frac{x}{2} \partial_x + \left( -\frac{1}{2} - 2t \right) u \partial_u
$$

We solve $\mathbf{v}[r] = 0$ and $\mathbf{v}[s] = 1$ to find canonical coordinates $r = \frac{x}{\sqrt{t}}$ and $s = \log t$. In $(r,s)$ coordinates, the heat equation becomes an ODE in $r$:

$$
u_{ss} + \frac{1}{2} r u_{sr} - \frac{1}{4} u_{rr} - \frac{1}{2r} u_r - \frac{1}{2} u = 0
$$

Using the ansatz $u = t^{-\frac{1}{2}} f(r)$ yields:

$$
f'' + \frac{1}{r} f' + \frac{1}{4} r^2 f = 0
$$

This is the parabolic cylinder equation. The fundamental solution is:

$$
u(x,t) = \frac{1}{\sqrt{4\pi t}} \exp\left( -\frac{x^2}{4t} \right)
$$

This precisely matches the Green's function from Chapter 1.3.

The reduction to canonical coordinates transforms the PDE into an ODE, making the solution accessible through standard methods. The similarity variable $r = x/\sqrt{t}$ emerges naturally from the symmetry structure, not from ad-hoc guessing.

**Emden-Fowler Equation**

Find symmetries of the Emden-Fowler equation $y'' + \frac{2}{x} y' + x^\alpha y^\beta = 0$, which models polytropic stars in astrophysics. We compute for the critical case $\alpha = -2$, $\beta = 5$.

The second prolongation is required: $\text{pr}^{(2)}\mathbf{v} = \mathbf{v} + \phi^x \partial_{y'} + \phi^{xx} \partial_{y''}$ with $\phi^x = D_x(\phi) - y' D_x(\xi)$ and $\phi^{xx} = D_x(\phi^x) - y'' D_x(\xi)$.

For $F = y'' + \frac{2}{x} y' + x^{-2} y^5 = 0$, the invariance condition is:

$$
\text{pr}^{(2)}\mathbf{v}[F] = \phi^{xx} + \frac{2}{x} \phi^x - \frac{2}{x^2} y' \xi - \frac{5}{x^2} y^4 \phi = 0
$$

After extensive algebraic manipulation, the determining equations yield three types of symmetries: translation $\xi = c_1$, $\phi = 0$; scaling $\xi = c_2 x$, $\phi = -\frac{1}{3} c_2 y$; and a special symmetry $\xi = c_3 x^3$, $\phi = -c_3 x^2 y$.

The scaling symmetry explains self-similar collapse in stellar dynamics. The special symmetry $x^3 \partial_x - x^2 y \partial_y$ gives exact solutions. The Lie algebra structure is $[V_1,V_2] = V_2$, $[V_2,V_3] = 2V_3$.

Using canonical coordinates for $V_3$: $r = \frac{1}{x^2}$ and $s = \frac{y}{x}$, the reduced equation becomes first-order in $(r, s')$, revealing exact solutions matching numerical simulations of stellar collapse.

Physical applications demonstrate that symmetries are not merely mathematical curiosities but reflect deep physical principles. The self-similar collapse of polytropic stars is encoded in the scaling symmetry of the Emden-Fowler equation.

**Burgers' Equation Symmetry Analysis**

Complete symmetry analysis of the inviscid Burgers' equation $u_t + u u_x = 0$.

The generator is $\mathbf{v} = \xi(x,t,u) \partial_x + \tau(x,t,u) \partial_t + \phi(x,t,u) \partial_u$ with first prolongation:

$$
\phi^t = D_t(\phi) - u_t D_t(\tau) - u_x D_t(\xi), \quad \phi^x = D_x(\phi) - u_x D_x(\tau) - u_x D_x(\xi)
$$

For $F = u_t + u u_x = 0$, the invariance condition is $\text{pr}^{(1)}\mathbf{v}[F] = \phi^t + u \phi^x + u_x \phi = 0$.

After collecting 27 independent monomials in derivatives, we obtain the determining equations: $\phi_{uu} = 0$ (from $u_{tt}$, $u_{tx}$, $u_{xx}$ terms), $\phi_u = 2\tau_t + \xi_x$ (from $u_t$ term), $\phi_u = \tau_x + \xi_t$ (from $u_x$ term), and $\phi_t + u \phi_x = 0$ (constant term).

From $\phi_{uu} = 0$, we have $\phi = A(x,t) u + B(x,t)$. Consistency requires $\tau_x + \xi_t = 2\tau_t + \xi_x$, and from the constant term $A_t + u A_x = 0$, which implies $A = c_1$ (constant).

The complete solution yields translations $\partial_t$, $\partial_x$; Galilean boost $t \partial_x$; scaling $2t \partial_t + x \partial_x$; projective transformation $t^2 \partial_t + t x \partial_x - t u \partial_u$; and an infinite-dimensional symmetry $\phi = f(t-x) \partial_u$.

The Lie algebra structure includes $[\partial_x, t \partial_x] = \partial_x$ and $[2t \partial_t + x \partial_x, t^2 \partial_t + t x \partial_x] = 2(t^2 \partial_t + t x \partial_x)$.

Using the Galilean boost $V = t \partial_x$ with canonical coordinates $r = x - u t$ and $s = t$, the reduced equation is $u_r = 0$, so $u = f(x - ut)$, explaining shock formation via the method of characteristics.

The infinite-dimensional symmetry of Burgers' equation reveals its connection to completely integrable systems. The presence of such rich symmetry structure is a hallmark of equations that admit exact solutions through transformation methods.

## Challenge Problems

The following problems synthesize the concepts of Lie symmetries, prolongation, and symmetry reduction.

### Challenge 1: Symmetry Classification of First-Order ODEs

Classify all first-order ODEs admitting a 3-dimensional symmetry algebra. Show that an ODE $F(x,y,y') = 0$ admits a 3-dimensional Lie algebra if and only if it is equivalent to one of: a linear equation $y' = f(x)y + g(x)$, or a homogeneous equation $y' = f\left(\frac{y}{x}\right)$.

*(Hint: Consider the possible non-isomorphic 3D Lie algebras: Heisenberg $A_{3,1}$, Euclidean $A_{3,2}$, Lorentz $A_{3,3}$, and $\mathfrak{sl}(2,\mathbb{R})$ $A_{3,4}$. Test which equations admit each algebra structure.)*

<details>
<summary><strong>Expand Solution</strong></summary>

Consider the Riccati equation $y' = P(x) + Q(x)y + R(x)y^2$. Suppose $\dim \mathfrak{g} = 3$. The possible non-isomorphic 3D Lie algebras are $A_{3,1}$ (Heisenberg), $A_{3,2}$ (Euclidean), $A_{3,3}$ (Lorentz), and $A_{3,4}$ ($\mathfrak{sl}(2,\mathbb{R})$).

Testing $A_{3,4}$ with basis $\{V_1, V_2, V_3\}$ satisfying $[V_1,V_2] = V_2$, $[V_1,V_3] = 2V_3$, $[V_2,V_3] = V_3$ requires solving 27 coupled PDEs for each generator simultaneously. The result is that only linear equations $y' = a(x)y + b(x)$ admit $\mathfrak{sl}(2,\mathbb{R})$ symmetry.

For the explicit case $y' = k y$, we have $V_1 = \partial_x$, $V_2 = x \partial_x + y \partial_y$, and $V_3 = x^2 \partial_x + x y \partial_y$. Each satisfies the prolongation condition independently. Using $V_1$ for reduction, we set $y = z(x)$, reducing to $z' = k z$. Using $V_2$ with $z = y/x$, we get $z' = k z$. Complete integration yields $y = C x^k$.

This classification reveals that the symmetry structure of a differential equation determines its solvability. Equations with higher-dimensional symmetry algebras can be reduced to quadrature, while those with lower-dimensional algebras require more sophisticated methods.

</details>

### Challenge 2: Prolongation Formula Derivation

Derive the general prolongation formula for the coefficient $\phi^\alpha_J$ corresponding to a multi-index $J = (j_1, \dots, j_k)$ representing the $k$-th order derivative $u^\alpha_J = \partial^k u^\alpha / \partial x^{j_1} \cdots \partial x^{j_k}$.

Show that the recursive structure $\phi^\alpha_J = D_J(\phi^\alpha - \sum_i \xi^i u^\alpha_i) + \sum_i \xi^i u^\alpha_{J,i}$ preserves the contact structure of jet space.

*(Hint: Use the total derivative operator $D_J$ and the fact that prolongation must preserve the contact conditions $du^\alpha - \sum_i u^\alpha_i dx^i = 0$.)*

<details>
<summary><strong>Expand Solution</strong></summary>

The prolongation must preserve the contact structure: if a surface is the graph of a function $u = f(x)$, its transformed surface must also be the graph of a function. This means the contact forms $du^\alpha - \sum_i u^\alpha_i dx^i = 0$ must be preserved.

For the first prolongation, we require that the transformed derivative $u^\alpha_i$ satisfies the same contact condition. The infinitesimal change in $u^\alpha_i$ is given by $\phi^\alpha_i = D_i(\phi^\alpha) - \sum_j u^\alpha_j D_i(\xi^j)$.

For higher-order derivatives, we proceed recursively. The multi-index $J = (j_1, \dots, j_k)$ represents the derivative $\partial^k u^\alpha / \partial x^{j_1} \cdots \partial x^{j_k}$. The prolongation coefficient is:

$$
\phi^\alpha_J = D_J(\phi^\alpha - \sum_i \xi^i u^\alpha_i) + \sum_i \xi^i u^\alpha_{J,i}
$$

where $D_J = D_{j_1} \cdots D_{j_k}$ is the composition of total derivative operators, and $u^\alpha_{J,i}$ denotes the derivative with index $J$ followed by $i$.

This formula ensures that the contact structure is preserved: the transformed derivatives satisfy the same algebraic relations as the original derivatives. The recursive nature of the formula reflects the hierarchical structure of jet space, where higher-order derivatives are built from lower-order ones.

The preservation of contact structure is essential for the geometric interpretation of symmetries: a symmetry transformation maps solutions to solutions, and this mapping must respect the differential structure encoded in the jet space.

</details>

### Challenge 3: Optimal System of Subalgebras

For a given Lie algebra $\mathfrak{g}$ of symmetries, the optimal system of subalgebras provides a classification of all distinct symmetry reductions. Construct the optimal system for the 6-dimensional Lie algebra of the heat equation, and show how each subalgebra leads to a distinct similarity solution.

*(Hint: Use the adjoint representation to identify equivalent subalgebras, then construct canonical coordinates for each representative subalgebra.)*

<details>
<summary><strong>Expand Solution</strong></summary>

The heat equation admits a 6-dimensional Lie algebra with generators: $V_1 = \partial_t$ (time translation), $V_2 = \partial_x$ (space translation), $V_3 = 2t \partial_x - x u \partial_u$ (Galilean boost), $V_4 = t \partial_t + \frac{x}{2} \partial_x - \frac{u}{2} \partial_u$ (scaling), $V_5 = x \partial_x + 2t \partial_t$ (another scaling), and $V_6 = t^2 \partial_t + t x \partial_x - \frac{1}{4}(x^2 + 2t) u \partial_u$ (projective).

To construct the optimal system, we use the adjoint representation. Two subalgebras are equivalent if they are related by an adjoint transformation. For 1-dimensional subalgebras, we find representatives: $\langle V_1 \rangle$, $\langle V_2 \rangle$, $\langle V_3 \rangle$, $\langle V_4 \rangle$, $\langle V_1 + V_2 \rangle$, $\langle V_4 + V_3 \rangle$.

For the subalgebra $\langle V_4 + V_3 \rangle$, we construct canonical coordinates by solving $\mathbf{v}[r] = 0$ and $\mathbf{v}[s] = 1$ where $\mathbf{v} = V_4 + V_3$. This yields $r = \frac{x}{\sqrt{t}}$ and $s = \log t$, leading to the fundamental solution.

Each subalgebra in the optimal system corresponds to a distinct physical scenario: time translation gives steady-state solutions, space translation gives traveling waves, scaling gives self-similar solutions, and combinations give more complex patterns.

The optimal system provides a complete classification of all possible symmetry reductions, ensuring that no distinct similarity solutions are missed. This systematic approach replaces ad-hoc ansatz methods with a rigorous classification scheme.

</details>

The algorithmic determination of Lie symmetries provides a systematic method for reducing differential equations, but it requires solving overdetermined systems of determining equations. For many physically significant systems, these equations admit only trivial solutions, revealing the limitations of point symmetries. The extension to nonlocal symmetries through potential systems, developed in Section 4.8, overcomes these limitations by considering transformations that depend on integrals of the solution.

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
