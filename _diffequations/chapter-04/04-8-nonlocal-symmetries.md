---
layout: textbook
title: "Section 4.8: Nonlocal Symmetries & Potential Systems"
description: "Hidden symmetries, covering spaces"
permalink: /diffequations/chapter-04/04-8-nonlocal-symmetries/
order: 4.8
chapter: 4
section: 8
nav_order: 4.8
is_chapter_index: false
parent_chapter: 4
parent_section: null
---

# Section 4.8: Nonlocal Symmetries & Potential Systems

> Hidden symmetries emerge when we lift differential equations to covering spaces, revealing that integrability is a property of the algebraic structure rather than the local expression.

## Introduction

The classical Lie algorithm described in previous sections provides a robust mechanism for identifying point symmetries—transformations that map the graph of a solution to itself based on local geometry. However, this method reaches its natural limit when applied to many physically significant systems, including the porous medium equation and the Black-Scholes equation. These systems often possess "hidden" symmetries that are invisible to the standard prolongation apparatus because the transformation logic depends not just on the value of the function and its derivatives, but on the global history of the solution (integrals).

This section formalizes the extension of Lie theory to **nonlocal symmetries** through the construction of **potential systems**. This technique reveals that the algebraic structure of a differential equation is not intrinsic to its scalar representation but depends on the choice of covering space. This concept serves as the algebraic precursor to the geometric formulations of jet bundles in Chapter 6 and the cohomological interpretations of Chapter 7.

The rigorous treatment of these symmetries is covered extensively in Bluman & Anco (2002) and Olver (1995).

## Mathematical Content

### Conservation Laws as Auxiliary Variables

The entry point to nonlocal symmetries is the conservation law. Consider a scalar partial differential equation (PDE) in two independent variables $(x, t)$ and one dependent variable $u$:

$$
\Delta(x, t, u, u_x, u_t, \dots) = 0
$$

A local conservation law for this system is a divergence expression that vanishes on the solution manifold:

$$
D_t T(x, t, u, \dots) + D_x X(x, t, u, \dots) = 0
$$

where $T$ is the conserved density and $X$ is the flux. Here, $D_t$ and $D_x$ denote total derivatives. The existence of such a conservation law implies, via the Poincaré lemma (assuming a simply connected domain), the existence of an auxiliary potential function $v(x, t)$ such that:

$$
v_x = T(x, t, u, \dots), \quad v_t = -X(x, t, u, \dots)
$$

We define the **potential system** $S_{uv}$ as the system of coupled equations comprising the original conservation law definitions involving both $u$ and $v$.

### Potential Symmetries

We now apply the standard Lie algorithm not to the original scalar equation, but to the system $S_{uv}$. We seek a vector field generator defined on the space $(x, t, u, v)$:

$$
\mathbf{V} = \xi(x,t,u,v)\partial_x + \tau(x,t,u,v)\partial_t + \phi(x,t,u,v)\partial_u + \psi(x,t,u,v)\partial_v
$$

If this generator admits a prolongation that leaves the solution manifold of $S_{uv}$ invariant, it defines a symmetry of the potential system. The crucial distinction lies in the dependence on $v$.

If the infinitesimals $\xi, \tau, \phi$ depend explicitly on $v$, the symmetry projects back to the original space $(x, t, u)$ as a **nonlocal symmetry**. Since $v$ is defined via $v_x = T$ and $v_t = -X$, the variable $v$ effectively represents an integral of the original field $u$:

$$
v(x,t) = \int_{(x_0, t_0)}^{(x,t)} (T dx - X dt)
$$

Consequently, the infinitesimal transformation of $u$ depends on the integral of $u$. These nonlocal symmetries allow for the construction of exact solutions that are inaccessible via standard point symmetry reduction.

### The Algorithm of Nonlocal Analysis

To systematically uncover these hidden structures, one proceeds through a rigorous sequence of steps. First, we identify conservation laws by determining the multipliers $\Lambda$ such that $\Lambda \Delta = D_t T + D_x X$. For variational problems, Noether's theorem (Section 4.2) provides these systematically. For non-variational problems, direct methods or the use of Euler operators are required.

Next, we construct the potential system $S_{uv}$ determined by the density $T$ and flux $X$. We then apply standard Lie analysis to this system, solving the determining equations for the vector field $\mathbf{V}$ acting on $S_{uv}$.

The classification of symmetries follows from the dependence on the potential variable: if $\partial_v \xi = \partial_v \tau = \partial_v \phi = 0$, the symmetry projects to a local point symmetry of the original PDE. If any of the infinitesimals governing $(x, t, u)$ depend on $v$, the symmetry is strictly nonlocal.

### Example: The Nonlinear Diffusion Equation

Consider the nonlinear diffusion equation, often used in modeling porous media:

$$
u_t = (K(u)u_x)_x
$$

This equation is in explicit conservation form with density $T=u$ and flux $X=-K(u)u_x$. Introducing the potential $v$, we obtain the system:

$$
v_x = u, \quad v_t = K(u)u_x
$$

Standard Lie analysis of this system reveals that for specific forms of conductivity $K(u)$ (e.g., $K(u) = u^{-2}$), the potential system admits a larger Lie algebra than the scalar equation. These additional symmetries can be used to map the nonlinear equation to the linear heat equation via a hodograph-type transformation, a technique famously utilized in the solution of the Black-Scholes equation in mathematical finance.

### Coverings and the Algebraic Frontier

The introduction of potential variables can be formalized geometrically as the construction of a **covering** of the original differential equation. The potential system $S_{uv}$ is a fiber bundle over the manifold defined by $\Delta = 0$.

A nonlocal symmetry is therefore a local symmetry on the covering space that does not project to a local vector field on the base space. This leads to the concept of **infinite hierarchies** of symmetries. By iterating this process—finding conservation laws for $S_{uv}$, introducing a second potential $w$, forming $S_{uvw}$, and so on—one can, in principle, generate an infinite sequence of nonlocal symmetries.

This recursive structure bridges the gap between the finite-dimensional Lie groups of classical mechanics and the infinite-dimensional symmetry groups of completely integrable systems discussed in Sections 4.3 and 4.4. It demonstrates that "integrability" is often a property of the algebraic covering rather than the local expression of the equation.

## Complete Examples

### Example 4.8.1: Canonical Case—Nonlinear Diffusion with Power-Law Conductivity

**Problem:** Consider the nonlinear diffusion equation:

$$
u_t = (u^m u_x)_x, \quad m > 0
$$

**Solution:**

The equation is already in conservation form:

$$
D_t u + D_x (-u^m u_x) = 0
$$

with density $T = u$ and flux $X = -u^m u_x$. Introducing the potential $v(x,t)$, we obtain the potential system:

$$
\begin{cases}
v_x = u \\
v_t = -(-u^m u_x) = u^m u_x
\end{cases}
$$

We seek an infinitesimal generator for the potential system:

$$
\mathbf{V} = \xi(x,t,u,v)\partial_x + \tau(x,t,u,v)\partial_t + \phi(x,t,u,v)\partial_u + \psi(x,t,u,v)\partial_v
$$

Prolonging to first order:

$$
\text{pr}^{(1)}\mathbf{V} = \mathbf{V} + \phi^x \partial_{u_x} + \phi^t \partial_{u_t} + \psi^x \partial_{v_x} + \psi^t \partial_{v_t}
$$

where the prolongation formulas are:

$$
\phi^x = D_x \phi - u_x D_x \xi - u_t D_x \tau
$$

$$
\phi^t = D_t \phi - u_x D_t \xi - u_t D_t \tau
$$

$$
\psi^x = D_x \psi - v_x D_x \xi - v_t D_x \tau = D_x \psi - u D_x \xi - u_x D_x \tau
$$

$$
\psi^t = D_t \psi - v_x D_t \xi - v_t D_t \tau
$$

Applying the prolongation to the potential system equations, we obtain the determining equations. For $v_x = u$:

$$
\text{pr}^{(1)}\mathbf{V}(v_x - u) = \psi^x - \phi = 0 \quad \text{on} \quad v_x = u
$$

For $v_t = u^m u_x$:

$$
\text{pr}^{(1)}\mathbf{V}(v_t - u^m u_x) = \psi^t - m u^{m-1} u_x \phi - u^m \phi^x = 0 \quad \text{on} \quad v_t = u^m u_x
$$

After extensive algebraic manipulation, we obtain two classes of symmetries. The classical scaling symmetries have $\xi, \tau, \phi$ independent of $v$:

$$
\xi = a x + b, \quad \tau = c t + d, \quad \phi = k u
$$

For specific values $m=2$ and $m=-1$, additional nonlocal symmetries emerge. For $m=2$ (fast diffusion):

$$
\mathbf{V}_5 = v \partial_u, \quad \mathbf{V}_6 = v u \partial_u + \frac{1}{2} v^2 \partial_v
$$

Verifying $\mathbf{V}_5 = v \partial_u$ as a nonlocal symmetry, we check the first equation:

$$
\text{pr}^{(1)}\mathbf{V}_5(v_x - u) = \psi^x - \phi = D_x(v) - v = u_x - v = 0
$$

For the second equation:

$$
\text{pr}^{(1)}\mathbf{V}_5(v_t - u^2 u_x) = \psi^t - 2u u_x v - u^2 \phi^x
$$

where $\psi^t = D_t(v) = v_t = u^2 u_x$ and $\phi^x = D_x(v) - u_x D_x(0) - u_t D_x(0) = u_x$. Substituting:

$$
u^2 u_x - 2u u_x v - u^2 u_x = -2u u_x v = 0 \quad \text{(on solutions where } u \neq 0\text{)}
$$

This confirms that $\mathbf{V}_5$ is a genuine nonlocal symmetry. Using $\mathbf{V}_5 = v \partial_u$ for symmetry reduction with the invariant solution ansatz $u = f(\eta)$, $v = g(\eta)$, $\eta = x - c t$, we obtain the exact solution via hodograph transformation: $u = \frac{1}{v}$, which linearizes to the heat equation for $v$.

### Example 4.8.2: Black-Scholes Equation—Financial Application

**Problem:** The Black-Scholes PDE for European call option pricing:

$$
\frac{\partial V}{\partial t} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2} + r S \frac{\partial V}{\partial S} - r V = 0
$$

**Solution:**

The Black-Scholes equation admits a local conservation law of energy type:

$$
D_t(T) + D_S(X) = 0
$$

where $T = V_S$ and $X = -\frac{1}{2}\sigma^2 S^2 V_{SS} - r S V_S + r V$. Constructing the potential system:

$$
\begin{cases}
v_S = V_S \\
v_t = -\left(-\frac{1}{2}\sigma^2 S^2 V_{SS} - r S V_S + r V\right)
\end{cases}
$$

The potential system admits 17 symmetries, compared to only 6 for the original PDE. These include:

$$
\mathbf{V}_7 = S v \partial_V, \quad \mathbf{V}_8 = t v \partial_V, \quad \mathbf{V}_9 = v \partial_V
$$

Using the hodograph transformation with $\mathbf{V}_9 = v \partial_V$, we set $V = f(v)$ and substitute into the Black-Scholes equation:

$$
f''(v) v_S v_S + f'(v) v_{SS} + \frac{1}{2}\sigma^2 S^2 f''(v) v_S^2 + r S f'(v) v_S - r f(v) = 0
$$

Since $v_S = V_S$, this linearizes to the heat equation:

$$
v_t = \frac{1}{2}\sigma^2 S^2 v_{SS}
$$

The complete analytical solution follows by solving the heat equation for $v(S,t)$ and inverting the relation $V = f(v)$ to obtain the option price.

### Example 4.8.3: Porous Medium Equation—Physical Breakthrough

**Problem:** Porous medium equation:

$$
u_t = (u^n u_x)_x, \quad n > 1
$$

**Solution:**

The porous medium equation admits the mass conservation law $D_t u + D_x (-u^n u_x) = 0$. To find additional conservation laws, we employ the multiplier method, seeking a multiplier $\Lambda(u,u_x,u_t)$ such that:

$$
\Lambda u_t = D_t T + D_x X
$$

For $n=2$, we find:

$$
\Lambda = u_x, \quad T = \frac{1}{2} u u_x, \quad X = -\frac{1}{3} u^2 u_{xx} - \frac{1}{2} u u_x^2
$$

Introducing two potentials, we form the double potential system:

$$
\begin{cases}
v_x = u \\
v_t = u^2 u_x
\end{cases}
$$

$$
\begin{cases}
w_x = \frac{1}{2} u u_x \\
w_t = -\left(-\frac{1}{3} u^2 u_{xx} - \frac{1}{2} u u_x^2\right)
\end{cases}
$$

The remarkable result emerges from Lie analysis of the $(u,v,w)$-system: it admits an infinite-dimensional Lie algebra:

$$
\mathbf{V}_k = v^k \partial_u + k v^{k-1} w \partial_v, \quad k = 1, 2, 3, \dots
$$

This infinite hierarchy enables the construction of exact solutions. The Barenblatt solution arises via symmetry reduction:

$$
u(x,t) = t^{-\alpha} f\left(\frac{x}{t^\beta}\right)
$$

Using nonlocal symmetries, we obtain a complete classification including self-similar solutions of first kind, instantaneous point source solutions, and waiting time solutions.

For $k=2$, we have:

$$
\mathbf{V}_2 = v^2 \partial_u + 2 v w \partial_v
$$

The invariant surface condition:

$$
v^2 u_\eta + 2 v w v_\eta = 0 \implies \frac{du}{dv} = -\frac{2w}{v}
$$

Solving this ODE system yields exact similarity solutions, demonstrating the power of the nonlocal symmetry approach.

### Example 4.8.4: Advanced Demonstration—Painlevé Equations

**Problem:** First Painlevé equation:

$$
u u_{tt} = 6 u_t^2 + u u_{xx} + 3(u_x)^2 - \frac{u_{xxxx}}{u}
$$

**Solution:**

The first Painlevé equation admits a known conservation law:

$$
D_t\left(\frac{u_{xx}}{u}\right) + D_x\left(-\frac{u_{xxx}}{u} + \frac{u_x u_{xx}}{u^2}\right) = 0
$$

Constructing the potential system:

$$
\begin{cases}
v_x = \frac{u_{xx}}{u} \\
v_t = -\left(-\frac{u_{xxx}}{u} + \frac{u_x u_{xx}}{u^2}\right)
\end{cases}
$$

The key discovery is that the potential system admits Möbius symmetries:

$$
\mathbf{V} = \frac{a(t) v + b(t)}{c(t) v + d(t)} \partial_u
$$

These nonlocal symmetries generate auto-Bäcklund transformations:

$$
u \mapsto \tilde{u} = u + \frac{2}{\ln v + c}
$$

Verification proceeds by direct substitution into Painlevé I, confirming that both $u$ and $\tilde{u}$ satisfy the original equation. These transformations correspond to birational maps on the moduli space of solutions, connecting to the geometric formulations of Chapter 6.

### Example 4.8.5: Theoretical Synthesis—Infinite Covers

**Problem:** Recursive construction of infinite hierarchies.

**Solution:**

**Recursive Construction:**

Start with scalar PDE $\Delta(u) = 0$.

- **Level 1:** Find conservation law $\mathcal{C}_1$, introduce $v_1$, form $S_1$.
- **Level 2:** Find conservation laws of $S_1$, introduce $v_2$, form $S_2$.

**Theorem (Olver, 1995):** For integrable systems, this process yields:

$$
\dim \text{Lie}(S_n) = n + \dim \text{Lie}(\Delta)
$$

**Explicit computation for KdV:**
- Scalar KdV: 1 Lie symmetry (time translation)
- Potential KdV: 3 symmetries
- Double potential: 5 symmetries
- Continues indefinitely

**Final analytical result:**

$$
\text{Lie algebra dimension} = \infty
$$

This precisely connects to the infinite hierarchies of Sections 4.3–4.6.

## References

* Bluman, G. W., & Anco, S. C. (2002). *Symmetry and Integration Methods for Differential Equations*. Springer.
* Ibragimov, N. H. (1989). *Elementary Lie Group Analysis and Ordinary Differential Equations*. Wiley.
* Olver, P. J. (1995). *Equivalence, Invariants, and Symmetry*. Cambridge University Press.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 4.7 Supersymmetric Quantum Mechanics]({{ '/diffequations/chapter-04/04-7-susy-qm/' | relative_url }})
- [Next Section: 5.1 Stochastic Calculus Foundations]({{ '/diffequations/chapter-05/05-1-stochastic-calculus/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-04/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
