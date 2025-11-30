---
layout: textbook
title: "Section 3.3: Entropy Solutions & Shock Theory"
description: "Rankine-Hugoniot, entropy inequalities, TVD schemes"
permalink: /diffequations/chapter-03/03-3-entropy-solutions/
order: 3.3
chapter: 3
section: 3
nav_order: 3.3
is_chapter_index: false
parent_chapter: 3
parent_section: null
---

> Weak solutions restore conservation across discontinuities, but physical irreversibility requires entropy conditions to select the unique physically admissible solution.

## Introduction

Characteristics show that nonlinear hyperbolic flows convert smooth data into vertical gradients in finite time. The differential form $\partial_{t}u + \nabla \cdot f(u) = 0$ ceases to make classical sense at the breaking time, yet the integral balance law remains valid. By enlarging the solution space to distributions we retain conservation, but weak solutions are non-unique. Physical irreversibility must be reintroduced analytically via **entropy conditions**. This section derives the Rankine–Hugoniot jump relation, explains why weak formulations alone fail, and presents Lax's entropy admissibility, entropy–entropy flux pairs, Kruzhkov's $L^{1}$-contraction theory, and constructive schemes such as Glimm's method.

## Weak Solutions and the Rankine–Hugoniot Condition

A function $u(x,t)$ is a **weak solution** of $\partial_t u + \partial_x F(u) = 0$ if for every smooth test function $\phi(x,t)$ with compact support,

$$
\int_0^{\infty} \int_{-\infty}^{\infty} [u \phi_t + F(u) \phi_x] \, dx \, dt + \int_{-\infty}^{\infty} u(x,0) \phi(x,0) \, dx = 0.
$$

This formulation makes sense even when $u$ is discontinuous. If $u$ has a jump discontinuity along a curve $x = s(t)$, integration by parts shows that the jump must satisfy the **Rankine–Hugoniot condition**:

$$
s'(t) [u] = [F(u)],
$$

where $[u] = u_R - u_L$ and $[F(u)] = F(u_R) - F(u_L)$ denote the jumps across the discontinuity, and $s'(t)$ is the shock speed.

The Rankine–Hugoniot condition ensures that the integral conservation law is satisfied across the discontinuity. However, it does not determine which side of the discontinuity is physically correct: a shock moving to the right and a rarefaction moving to the left can both satisfy this condition for the same initial data.

**Rankine–Hugoniot for Burgers Equation**

Determine the shock speed for Burgers equation $\partial_t u + \partial_x(u^2/2) = 0$ with a jump from $u_L$ to $u_R$.

The flux is $F(u) = u^2/2$, so the Rankine–Hugoniot condition gives $s'(t) (u_R - u_L) = (u_R^2 - u_L^2)/2$. Factoring the right-hand side: $s'(t) = (u_R + u_L)/2$. The shock speed is the average of the left and right states.

For $u_L = 1$ and $u_R = 0$, we get $s = 1/2$. This shock moves slower than the characteristic speed on the left ($F'(1) = 1$) but faster than the characteristic speed on the right ($F'(0) = 0$), satisfying the Lax entropy condition that characteristics must enter the shock from both sides.

This example illustrates that the Rankine–Hugoniot condition determines the shock speed but not its direction or admissibility. The additional requirement that characteristics enter the shock from both sides is the Lax entropy condition, which we derive next.

## Lax Entropy Condition

For a scalar conservation law, a shock with left state $u_L$ and right state $u_R$ is **admissible** (satisfies the Lax entropy condition) if

$$
F'(u_L) > s > F'(u_R),
$$

where $s$ is the shock speed. This condition ensures that characteristics from both sides enter the shock, making the shock a "sink" for information rather than a source.

For systems, the Lax condition generalizes: for a $k$-shock (a discontinuity in the $k$-th characteristic family), we require

$$
\lambda_k(u_L) > s > \lambda_k(u_R), \qquad \lambda_{k-1}(u_L) < s < \lambda_{k+1}(u_R),
$$

ensuring that exactly $k$ characteristics enter the shock from the left and $m-k$ from the right.

**Lax Condition for Euler System**

For the isentropic Euler system, verify that a 1-shock (discontinuity in the first characteristic family) satisfies the Lax condition.

The eigenvalues are $\lambda_{\pm} = u \pm c$ with $c^2 = \gamma K \rho^{\gamma-1}$. For a 1-shock, we need $\lambda_+(u_L) > s > \lambda_+(u_R)$ and $\lambda_-(u_L) < s < \lambda_-(u_R)$.

Since $\lambda_+ > \lambda_-$ always, the second condition is automatically satisfied if the first holds. The condition $\lambda_+(u_L) > s > \lambda_+(u_R)$ means $u_L + c_L > s > u_R + c_R$, which physically means the shock is supersonic relative to the left state and subsonic relative to the right state.

The Lax condition is a geometric criterion: it ensures that the shock is the unique continuation of the smooth solution, with information flowing into the discontinuity from both sides. Shocks that violate this condition (expansion shocks) are unphysical and must be replaced by rarefaction waves.

## Entropy–Entropy Flux Pairs

A more systematic approach to selecting admissible shocks uses **entropy–entropy flux pairs**. A function $\eta(u)$ is an **entropy** for the conservation law if there exists an **entropy flux** $\psi(u)$ such that

$$
\eta'(u) F'(u) = \psi'(u).
$$

An entropy solution satisfies the entropy inequality

$$
\partial_t \eta(u) + \partial_x \psi(u) \leq 0
$$

in the sense of distributions. For smooth solutions, this holds with equality (by the chain rule), but across shocks it provides an additional constraint.

The physical entropy $S = -\rho \ln \rho$ for the Euler system is the canonical example. The entropy inequality encodes the second law of thermodynamics: entropy can only increase, selecting the irreversible shock over the reversible rarefaction.

**Entropy for Burgers Equation**

Find an entropy–entropy flux pair for Burgers equation $\partial_t u + \partial_x(u^2/2) = 0$.

We seek $\eta(u)$ and $\psi(u)$ such that $\eta'(u) u = \psi'(u)$. A natural choice is $\eta(u) = u^2/2$, which gives $\psi'(u) = u^2$, so $\psi(u) = u^3/3$.

The entropy inequality becomes $\partial_t(u^2/2) + \partial_x(u^3/3) \leq 0$. For a shock from $u_L$ to $u_R$, this requires $s[\eta(u)] \geq [\psi(u)]$, or $s(u_R^2 - u_L^2)/2 \geq (u_R^3 - u_L^3)/3$.

Using $s = (u_L + u_R)/2$ from Rankine–Hugoniot, this simplifies to $(u_L + u_R)(u_R^2 - u_L^2)/4 \geq (u_R^3 - u_L^3)/3$. After algebraic manipulation, this reduces to $u_L > u_R$, which is exactly the Lax condition for a compressive shock.

This example shows that entropy conditions generalize the Lax condition: they provide a systematic way to select admissible shocks that is not limited to strictly hyperbolic systems or scalar equations.

## Kruzhkov's $L^1$-Contraction Theory

Kruzhkov's fundamental result establishes uniqueness and stability of entropy solutions. For scalar conservation laws, if $u$ and $v$ are entropy solutions with initial data $u_0$ and $v_0$, then

$$
\| u(\cdot, t) - v(\cdot, t) \|_{L^1} \leq \| u_0 - v_0 \|_{L^1}
$$

for all $t > 0$. This $L^1$-contraction property ensures that entropy solutions are unique and depend continuously on initial data.

The proof uses a clever doubling-of-variables technique: consider $u(x,t)$ and $v(y,s)$ as functions of four variables, and integrate the entropy inequality over the doubled space. The resulting estimates show that the $L^1$ distance cannot increase, establishing both uniqueness and stability.

**$L^1$-Contraction for Burgers Equation**

Verify the $L^1$-contraction property for two entropy solutions of Burgers equation.

Consider $u(x,t)$ and $v(x,t)$ with initial data $u_0$ and $v_0$. The $L^1$ distance at time $t$ is $\int \vert u(x,t) - v(x,t) \vert dx$.

For smooth solutions, we can differentiate: $\frac{d}{dt} \int \vert u - v \vert dx = \int \text{sgn}(u-v) (\partial_t u - \partial_t v) dx = -\int \text{sgn}(u-v) (\partial_x F(u) - \partial_x F(v)) dx$.

Integration by parts gives $\int \partial_x(\text{sgn}(u-v)) (F(u) - F(v)) dx$. Since $\text{sgn}(u-v)$ is constant on intervals where $u \neq v$, and $F$ is monotone, this is non-positive, showing that the $L^1$ distance decreases.

For weak solutions with shocks, the same argument applies using the entropy inequality, establishing the contraction property in full generality.

The $L^1$-contraction property is fundamental: it shows that entropy solutions form a well-posed class, with unique, stable solutions that depend continuously on initial data. This is the mathematical foundation for numerical methods and physical modeling.

## Constructive Methods: Glimm's Scheme

Glimm's method provides a constructive proof of existence for entropy solutions of systems of conservation laws. The scheme approximates the solution by solving a sequence of Riemann problems at discrete times, with random sampling to avoid resonance.

At each time step $t_n$, the solution is approximated by a piecewise constant function. At time $t_{n+1} = t_n + \Delta t$, we solve the Riemann problem at each discontinuity. The random sampling ensures that the scheme converges to an entropy solution as the mesh is refined.

**Glimm Scheme for Burgers Equation**

Apply Glimm's scheme to Burgers equation with initial data $u_0(x) = 1$ for $x < 0$ and $u_0(x) = 0$ for $x > 0$.

At $t = 0$, we have a single discontinuity at $x = 0$. The Riemann problem has solution: a shock from $u_L = 1$ to $u_R = 0$ with speed $s = 1/2$.

At time $t_1 = \Delta t$, the shock is at $x = \Delta t/2$. We sample a random point $\theta_1 \in (0,1)$ and evaluate the solution there. If $\theta_1 < 1/2$, we're to the left of the shock and $u = 1$; otherwise $u = 0$.

This random sampling prevents the formation of spurious oscillations that would occur with deterministic sampling at grid points. As $\Delta t \to 0$, the scheme converges to the entropy solution: a single shock moving with speed $1/2$.

Glimm's method is more than a numerical scheme: it provides a constructive proof of existence for entropy solutions, showing that the entropy condition is not merely a selection principle but a fundamental property of physically meaningful solutions.

## Challenge Problems

The following problems synthesize the concepts of weak solutions, entropy conditions, and uniqueness.

### Challenge 1: Non-Uniqueness of Weak Solutions

Show that the Rankine–Hugoniot condition alone does not determine a unique weak solution. Construct two different weak solutions of Burgers equation $\partial_t u + \partial_x(u^2/2) = 0$ with the same initial data $u_0(x) = 1$ for $x < 0$ and $u_0(x) = 0$ for $x > 0$, both satisfying Rankine–Hugoniot.

Demonstrate that only one of these solutions satisfies the Lax entropy condition, and show that the other violates the entropy inequality.

*(Hint: Consider both a shock and an expansion shock, and verify which one has characteristics entering from both sides.)*

<details>
<summary><strong>Expand Solution</strong></summary>

The Riemann problem with $u_L = 1$ and $u_R = 0$ admits two weak solutions satisfying Rankine–Hugoniot:

**Solution 1 (Shock):** A single shock from $u_L = 1$ to $u_R = 0$ with speed $s = (1 + 0)/2 = 1/2$. The characteristic speeds are $F'(1) = 1$ on the left and $F'(0) = 0$ on the right. Since $1 > 1/2 > 0$, characteristics enter the shock from both sides, satisfying the Lax condition.

**Solution 2 (Expansion Shock):** The same shock but with the interpretation that it's an "expansion" from $u_R = 0$ to $u_L = 1$. However, this violates the Lax condition: we would need $F'(0) > s > F'(1)$, or $0 > 1/2 > 1$, which is impossible.

To show that Solution 2 violates the entropy inequality, consider the entropy $\eta(u) = u^2/2$ with flux $\psi(u) = u^3/3$. For a shock from $u_L$ to $u_R$, the entropy inequality requires $s[\eta] \geq [\psi]$, or $s(u_R^2 - u_L^2)/2 \geq (u_R^3 - u_L^3)/3$.

For Solution 1 ($u_L = 1$, $u_R = 0$, $s = 1/2$): $1/2 \cdot (-1/2) \geq -1/3$, or $-1/4 \geq -1/3$, which is true.

For Solution 2 (reversed): we would need the inequality to hold with $u_L = 0$, $u_R = 1$, but then $1/2 \cdot (1/2) \geq 1/3$, or $1/4 \geq 1/3$, which is false.

This demonstrates that the entropy condition is necessary and sufficient to select the unique physically admissible solution. The expansion shock, while mathematically a weak solution, violates the second law of thermodynamics and is therefore unphysical.

</details>

### Challenge 2: Entropy Condition for Systems

For a system of conservation laws, the Lax condition requires that exactly $k$ characteristics enter a $k$-shock from the left and $m-k$ from the right. Show that this condition is equivalent to requiring that the shock satisfy all entropy inequalities for convex entropies.

Prove that for the isentropic Euler system, a 1-shock is admissible if and only if it satisfies the entropy inequality with the physical entropy $S = -\rho \ln \rho$.

*(Hint: Use the fact that the entropy condition can be written as a jump condition across the shock, and relate this to the characteristic speeds.)*

<details>
<summary><strong>Expand Solution</strong></summary>

For a system $\partial_t u + \partial_x F(u) = 0$, an entropy–entropy flux pair $(\eta, \psi)$ satisfies $\nabla \eta \cdot \nabla F = \nabla \psi$. The entropy inequality across a shock with speed $s$ is:

$$s[\eta(u)] \geq [\psi(u)]$$

Using the chain rule and the definition of the entropy flux, this becomes:

$$s \nabla \eta \cdot [u] \geq \nabla \eta \cdot [F(u)]$$

For a $k$-shock, the Rankine–Hugoniot condition gives $s[u] = [F(u)]$. Substituting:

$$s \nabla \eta \cdot [u] \geq s \nabla \eta \cdot [u]$$

This holds with equality for smooth solutions, but for shocks we need strict inequality to select the correct branch.

The Lax condition for a $k$-shock requires $\lambda_k(u_L) > s > \lambda_k(u_R)$ and $\lambda_{k-1}(u_L) < s < \lambda_{k+1}(u_R)$. This ensures that the $k$-th characteristic family is compressive (characteristics converge) while others are not.

For the isentropic Euler system with entropy $S = -\rho \ln \rho$, the entropy flux is $\psi = -(\rho u) \ln \rho$. A 1-shock satisfies the entropy inequality if and only if $\lambda_+(u_L) > s > \lambda_+(u_R)$, which is exactly the Lax condition for a 1-shock.

The equivalence follows from the fact that convex entropies have level sets that are transverse to the shock curve, and the entropy inequality selects the branch where characteristics enter the shock, which is precisely what the Lax condition requires.

</details>

### Challenge 3: Vanishing Viscosity and Entropy Solutions

The vanishing viscosity method regularizes a conservation law by adding a small diffusion term: $\partial_t u + \partial_x F(u) = \epsilon \partial_{xx} u$. As $\epsilon \to 0$, the regularized solutions converge to an entropy solution of the original equation.

Show that for Burgers equation, the vanishing viscosity limit selects the same solution as the Lax entropy condition. Compute the explicit solution of the regularized equation for the Riemann problem and show that it converges to the shock solution as $\epsilon \to 0$.

*(Hint: Use a traveling wave ansatz $u(x,t) = U((x-st)/\epsilon)$ and solve the resulting ODE to find the shock profile.)*

<details>
<summary><strong>Expand Solution</strong></summary>

For Burgers equation with vanishing viscosity: $\partial_t u + u \partial_x u = \epsilon \partial_{xx} u$, we seek a traveling wave solution connecting $u_L$ to $u_R$ with speed $s$.

Let $\xi = (x - st)/\epsilon$ and $u(x,t) = U(\xi)$. Substituting into the equation:

$$-s U' + U U' = U''$$

Integrating once: $-s U + U^2/2 = U' + C$. For a shock profile, we require $U(-\infty) = u_L$, $U(\infty) = u_R$, and $U'(\pm\infty) = 0$.

At $\xi = \pm\infty$, we get $-s u_L + u_L^2/2 = C$ and $-s u_R + u_R^2/2 = C$. Equating: $-s u_L + u_L^2/2 = -s u_R + u_R^2/2$, which gives $s = (u_L + u_R)/2$, the Rankine–Hugoniot speed.

The profile equation becomes $U' = -s U + U^2/2 + s u_L - u_L^2/2 = (U - u_L)(U - u_R)/2$. For $u_L > u_R$ (compressive shock), this has a monotone solution connecting $u_L$ to $u_R$.

As $\epsilon \to 0$, the profile becomes steeper, converging to a step function (the shock) in the limit. The direction of the connection (from $u_L$ to $u_R$ rather than $u_R$ to $u_L$) is determined by the requirement that $U' < 0$ for a decreasing profile, which requires $u_L > u_R$.

This demonstrates that vanishing viscosity automatically selects the Lax-admissible shock: the regularized equation has a unique smooth solution that converges to the entropy solution as the regularization is removed. The viscosity term breaks the time-reversal symmetry, selecting the irreversible shock over the reversible expansion.

</details>

The theory of entropy solutions provides a complete framework for hyperbolic conservation laws: weak solutions restore conservation across discontinuities, while entropy conditions select the unique physically admissible solution. However, this theory is limited to one space dimension and scalar equations or special systems. The extension to multi-dimensional systems and the construction of global solutions remain active areas of research, connecting to the geometric methods of Section 3.4 and the numerical schemes developed in later chapters.

## References

* Evans, L. C. (2010). *Partial Differential Equations* (2nd ed.). American Mathematical Society.
* Lax, P. D. (1973). *Hyperbolic Systems of Conservation Laws and the Mathematical Theory of Shock Waves*. SIAM.
* Kruzhkov, S. N. (1970). First order quasilinear equations with several independent variables. *Matematicheskii Sbornik*, 123(165), 228-255.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 3.2 Systems of Conservation Laws & Hyperbolicity]({{ '/diffequations/chapter-03/03-2-conservation-laws/' | relative_url }})
- [Next Section: 3.4 Exterior Calculus & Hodge Decomposition]({{ '/diffequations/chapter-03/03-4-exterior-calculus/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-03/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
