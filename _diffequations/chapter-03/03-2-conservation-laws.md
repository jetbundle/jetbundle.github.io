---
layout: textbook
title: "Section 3.2: Systems of Conservation Laws & Hyperbolicity"
description: "Finite propagation, characteristics, shock formation"
permalink: /diffequations/chapter-03/03-2-conservation-laws/
order: 3.2
chapter: 3
section: 2
nav_order: 3.2
is_chapter_index: false
parent_chapter: 3
parent_section: null
---

> Nonlinear hyperbolic systems enforce finite propagation speeds, but this causality comes at a price: smooth solutions inevitably develop discontinuities in finite time.

## Introduction

Chapter 3.1 supplied the coordinate-free language of manifolds, making it possible to write PDEs intrinsically. We now impose the physically indispensable constraint of **finite propagation speed** by studying hyperbolic conservation laws. Unlike the elliptic and parabolic models of Chapter 2, which transmit disturbances instantaneously, hyperbolic systems carry information along characteristic curves with finite slopes, preserving causality in fluid dynamics, electromagnetism, and traffic flow. We begin with integral conservation statements, derive their differential forms, and analyze how nonlinear fluxes force shocks to develop from smooth data.

## Conservation Form and Differential Equations

For a conserved quantity with density $u(x,t)$ and flux $F(u)$, the balance law on a fixed region $\Omega \subset \mathbb{R}^{n}$ is

$$
\frac{d}{dt} \int_{\Omega} u(x,t) \, dx = - \int_{\partial \Omega} F(u) \cdot \nu \, dS,
$$

a statement of mass, momentum, or energy conservation. Assuming sufficient smoothness, the divergence theorem converts the surface flux into a volume integral. Because $\Omega$ is arbitrary, the integrand must vanish, yielding the **differential form**

$$
\partial_{t} u + \nabla \cdot F(u) = 0.
$$

When $u:\mathbb{R}^{n} \times [0,\infty)\to \mathbb{R}^{m}$, we obtain a **system of conservation laws**. The nonlinear dependence of $F$ on $u$ distinguishes these equations sharply from the linear theories of Chapter 2.

The integral form is the fundamental physical statement: the rate of change of a conserved quantity within a region equals the flux through its boundary. The differential form is valid only when the solution is smooth, a condition that will fail in finite time for nonlinear systems.

## Hyperbolicity and Characteristic Speeds

In one space dimension the divergence reduces to a derivative, producing the **quasilinear form**

$$
\partial_{t} u + A(u) \, \partial_{x} u = 0, \qquad A(u)=DF(u).
$$

The system is **hyperbolic** if $A(u)$ is diagonalizable with real eigenvalues for every relevant state $u$. It is **strictly hyperbolic** if the eigenvalues satisfy $\lambda_{1}(u) < \cdots < \lambda_{m}(u)$. The eigenvalues represent characteristic speeds; the associated left eigenvectors $l_{i}(u)$ decouple the system into scalar equations

$$
l_{i}(u) \cdot \big( \partial_{t} u + \lambda_{i}(u) \partial_{x} u \big) = 0,
$$

revealing **Riemann invariants** that propagate along characteristic curves. Hyperbolicity therefore enforces finite signal speeds and prevents the instantaneous communication inherent to elliptic/parabolic flows.

**Linear Acoustics System**

Diagonalize the linear system $\partial_{t}\rho + \partial_{x}u = 0$, $\partial_{t}u + c^{2}\partial_{x}\rho = 0$.

The Jacobian $A = \begin{pmatrix} 0 & 1 \\ c^{2} & 0 \end{pmatrix}$ has eigenvalues $\lambda_{\pm} = \pm c$ with eigenvectors $r_{\pm} = (1, \pm c)^{T}$. Defining Riemann invariants $w_{\pm} = u \pm c\rho$ yields advection equations $\partial_{t} w_{\pm} \pm c \, \partial_{x} w_{\pm} = 0$, so $w_{\pm}(x,t)=w_{\pm}(x \mp ct,0)$. The solution is recovered via $u = (w_{+}+w_{-})/2$ and $\rho = (w_{+}-w_{-})/(2c)$, demonstrating strict hyperbolicity and finite propagation at speeds $\pm c$.

This example illustrates the fundamental structure of hyperbolic systems: information propagates along characteristic curves at finite speeds determined by the eigenvalues. The Riemann invariants $w_{\pm}$ are quantities that remain constant along their respective characteristics, providing a complete description of the solution.

**Isentropic Euler Eigenstructure**

For the isentropic Euler system

$$
\partial_{t} \begin{pmatrix} \rho \\ \rho u \end{pmatrix} + \partial_{x} \begin{pmatrix} \rho u \\ \rho u^{2} + p(\rho) \end{pmatrix} = 0, \quad p(\rho)=K\rho^{\gamma},
$$

find eigenvalues and Riemann invariants.

The Jacobian is $A(U)=\begin{pmatrix} u & \rho \\ c^{2}/\rho & u \end{pmatrix}$ with $c^{2}=\gamma K \rho^{\gamma-1}$. Eigenvalues are $\lambda_{\pm}=u\pm c$. Left eigenvectors $l_{\pm} \propto (\mp c/\rho, 1)$ yield invariants $w_{\pm}=u \pm \frac{2c}{\gamma-1}$. These invariants propagate along $dx/dt = u \pm c$, generalizing the acoustic case to nonlinear gas dynamics and revealing the characteristic families used in Riemann problems.

The nonlinear Euler system exhibits the same characteristic structure as the linear acoustic system, but with speeds that depend on the solution itself. This dependence is the source of the nonlinear effects that lead to shock formation: regions of higher density move faster, causing compression and eventual intersection of characteristics.

## Method of Characteristics for Scalar Equations

When $m=1$, the conservation law $\partial_{t} u + \partial_{x} F(u) = 0$ has characteristics $x(t)$ solving

$$
\frac{dx}{dt} = F'(u(x,t)) = \lambda(u),
$$

and along these curves

$$
\frac{d}{dt} u(x(t),t) = \partial_{t} u + \frac{dx}{dt} \partial_{x} u = \partial_{t} u + F'(u) \partial_{x} u = 0.
$$

Hence $u$ remains constant along characteristics, producing the implicit solution formula $u(x,t)=g(\xi)$ with $\xi = x - F'(g(\xi))t$ determined by the initial profile $u(x,0)=g(x)$. The slope of each characteristic depends on the solution itself, unlike linear transport where all characteristics are parallel. This dependence causes neighboring characteristics to converge or diverge depending on $g'(x)$.

**Burgers Equation Before Breaking**

Solve $\partial_{t}u + u \partial_{x}u = 0$ with

$$
u(x,0) = \begin{cases} 1 - \frac{\vert x \vert}{2}, & \vert x \vert \le 2, \\ 0, & \vert x \vert > 2. \end{cases}
$$

Characteristics through $(\xi,0)$ satisfy $x(t)=\xi+u(\xi,0)t$, yielding $u(x,t)=u(\xi,0)$ with $\xi = x - u(\xi,0)t$. For $\vert \xi \vert >2$, $u \equiv 0$ and $x=\xi$. For $\vert \xi \vert <2$ we solve $\xi = x - (1-\vert \xi \vert /2)t$, leading to three regions: (i) $\vert x \vert >2+t$ with $u=0$, (ii) $\vert x \vert <2-t$ with $u=1-\vert x \vert /2$, and (iii) an intermediate region where $\xi$ solves a quadratic. The gradient evolves as

$$
\partial_{x}u = \frac{-1/2}{1 - t/2} = \frac{-1}{2 - t},
$$

blowing up at $t_{\mathrm{b}}=2$. Thus the explicit piecewise solution is valid only for $0<t<2$, after which characteristics intersect and shocks must form.

The method of characteristics provides an explicit solution formula, but only until characteristics intersect. The gradient blowup at $t=2$ signals the breakdown of the classical solution, necessitating the introduction of weak solutions in Section 3.3.

**Traffic Flow Rarefaction**

Model traffic density $\rho$ using $\partial_{t}\rho + \partial_{x}(\rho v(\rho)) = 0$ with $v(\rho)=1-\rho$ and initial data $\rho(x,0)=0.8$ for $x<0$, $0.2$ for $x>0$.

The flux $F(\rho)=\rho(1-\rho)$ has derivative $F'(\rho)=1-2\rho$. Left/right characteristic speeds are $-0.6$ and $0.6$, so the Riemann problem generates a centered rarefaction. The self-similar solution $\rho(x,t)=\frac{1 - x/t}{2}$ for $-0.6t < x < 0.6t$, matched to constant states outside, gives

$$
\rho(x,t)=
\begin{cases}
0.8, & x < -0.6t, \\
\frac{1 - x/t}{2}, & -0.6t < x < 0.6t, \\
0.2, & x > 0.6t.
\end{cases}
$$

Fluxes on both sides equal $0.16$, so no shock is required; the rarefaction satisfies the Rankine–Hugoniot condition automatically.

Rarefaction waves occur when characteristics diverge, creating a smooth transition between different constant states. Unlike shocks, rarefactions preserve smoothness and can be described by the method of characteristics throughout their evolution.

## Shock Formation and Finite-Time Breakdown

Nonlinear flux inevitably leads to intersecting characteristics. In the inviscid Burgers equation $\partial_{t} u + u \partial_{x} u = 0$, large values of $u$ travel faster than small ones. For smooth initial data with $g'(x)<0$, characteristics originating from larger amplitudes overtake those from smaller amplitudes. Differentiating the implicit solution yields

$$
\partial_{x} u(x,t) = \frac{g'(\xi)}{1 + t \, g'(\xi)}.
$$

Whenever $g'(\xi)<0$, the denominator vanishes at $t=-1/g'(\xi)$, and the gradient blows up. The earliest such time

$$
 t_{\mathrm{b}} = \frac{-1}{\min_{x} g'(x)}
$$

marks the **breaking time**, beyond which the classical solution ceases to exist. The multi-valued profile must be replaced by a weak (distributional) solution satisfying the integral conservation law together with additional admissibility criteria—entropy conditions—that select the physically correct shock. This necessity motivates Section 3.3.

**Simultaneous Shock Formation**

For Burgers' equation with

$$
u(x,0) = \begin{cases} 1, & x < 0, \\ 1 - x, & 0 \le x \le 1, \\ 0, & x > 1, \end{cases}
$$

compute the breaking time.

Characteristics emanating from $\xi \in (0,1)$ have slopes $1-\xi$ and gradients $\partial_{x}u = \frac{-1}{1+t}$, so all compression points experience infinite slope at $t=1$. The solution before breaking is

$$
u(x,t)=
\begin{cases}
1, & x < t, \\
\frac{x}{t}, & t < x < 1, \\
1 - x, & 1 < x < 2 - t, \\
0, & x > 2 - t,
\end{cases}
$$

with gradients $\partial_{x}u = 1/t$ in the expanding fan and $-1/(1+t)$ in the compression region. At $t=1$ all compression characteristics collide simultaneously, producing an instantaneous shock—a vivid illustration of how nonlinear hyperbolic equations destroy smoothness.

This example demonstrates that shock formation is not merely a mathematical curiosity but a generic feature of nonlinear hyperbolic systems. The simultaneous collision of characteristics at $t=1$ shows how the geometric structure of the characteristic field determines the breakdown of smooth solutions.

**Shallow-Water (p-System) Characteristics**

Analyze the shallow-water system

$$
\partial_{t} h + \partial_{x}(h u) = 0, \qquad \partial_{t}(h u) + \partial_{x}\left(h u^{2} + \tfrac{1}{2} g h^{2}\right) = 0.
$$

Quasilinearization gives $A(U)=\begin{pmatrix} u & h \\ g & u \end{pmatrix}$ with eigenvalues $u \pm \sqrt{gh}$. The Riemann invariants $r_{\pm}=u \pm 2\sqrt{gh}$ remain constant along characteristics $dx/dt = u \pm \sqrt{gh}$. Because $\nabla \lambda_{\pm} \cdot r_{\pm} \neq 0$, both characteristic fields are genuinely nonlinear, implying that shocks generically form from smooth initial perturbations—exactly as in the scalar Burgers setting.

The shallow-water system exhibits the same generic shock formation mechanism as scalar equations: genuine nonlinearity ensures that compression waves steepen into shocks. This universality reflects the fundamental structure of hyperbolic conservation laws.

**Genuine Nonlinearity Test**

Verify genuine nonlinearity for the $+$ characteristic field of the Euler system.

With $\lambda_{+}=u+c$, $r_{+}=(1, u+c)^{T}$, and $\nabla \lambda_{+}=(1, c/\rho)$, the dot product is

$$
\nabla \lambda_{+} \cdot r_{+} = 1 + \frac{c}{\rho}(u+c) > 0
$$

for all physically relevant states. Thus the $+$ field is genuinely nonlinear, ensuring that compression waves steepen into shocks unless moderated by dispersion or viscosity. This computation also confirms that entropy conditions will later be required to select admissible discontinuities.

Genuine nonlinearity is the mathematical condition that ensures shock formation is generic, not exceptional. When this condition holds, almost any smooth initial data will develop shocks in finite time, making weak solutions and entropy conditions essential for a complete theory.

**Riemann Problem Wave Pattern Selection**

Solve the Riemann problem for the isentropic Euler system with left state $U_{L}=(1,0)$ and right state $U_{R}=(0.125,0)$ when $\gamma=1.4$.

Evaluating the Hugoniot and rarefaction curves shows that a 1-shock followed by a 2-rarefaction satisfies both Rankine–Hugoniot and entropy conditions. Solving the matching equations yields middle velocity $u^{\ast}\approx 0.92757$, shock speed $s\approx 1.75279$, and a rarefaction fan connecting $U^{\ast}$ to $U_{R}$ along $x/t = u^{\ast} + c^{\ast}$. Any other wave pattern violates the Lax entropy inequalities, highlighting how hyperbolicity guides the admissible combination of shocks and rarefactions.

The Riemann problem—the solution of a conservation law with piecewise constant initial data—is fundamental to understanding hyperbolic systems. The admissible wave patterns are determined by the characteristic structure and entropy conditions, providing a complete description of how discontinuities interact.

## Challenge Problems

The following problems synthesize the concepts of hyperbolicity, characteristics, and shock formation.

### Challenge 1: The Breaking Time Formula

For the scalar conservation law $\partial_t u + \partial_x F(u) = 0$ with smooth initial data $u(x,0) = g(x)$, we derived the breaking time $t_b = -1/\min_x g'(x)$ under the assumption that $F''(u) > 0$ and $g'(x) < 0$ where the minimum occurs.

Generalize this formula to the case where $F''(u)$ may change sign and $g'(x)$ may be positive. Show that the breaking time is given by

$$
t_b = \min \left\{ -\frac{1}{F''(g(\xi)) g'(\xi)} : F''(g(\xi)) g'(\xi) < 0 \right\}
$$

and interpret this condition geometrically in terms of the characteristic field.

*(Hint: Consider the evolution of $\partial_x u$ along characteristics and identify when the denominator in the implicit solution formula vanishes.)*

<details>
<summary><strong>Expand Solution</strong></summary>

Along a characteristic $x(t)$ with $x(0) = \xi$, we have $u(x(t), t) = g(\xi)$ and $x(t) = \xi + F'(g(\xi)) t$. Differentiating the implicit relation $u(x,t) = g(x - F'(g(\xi)) t)$ with respect to $x$:

$$\partial_x u(x,t) = \frac{g'(\xi)}{1 + F''(g(\xi)) g'(\xi) t}$$

The gradient blows up when the denominator vanishes: $1 + F''(g(\xi)) g'(\xi) t = 0$, or $t = -1/(F''(g(\xi)) g'(\xi))$.

For this to be positive (forward time), we need $F''(g(\xi)) g'(\xi) < 0$. The breaking time is the minimum of these positive times:

$$t_b = \min \left\{ -\frac{1}{F''(g(\xi)) g'(\xi)} : F''(g(\xi)) g'(\xi) < 0 \right\}$$

Geometrically, this condition means that characteristics are converging: $F''(g(\xi)) > 0$ with $g'(\xi) < 0$ (compression from the right), or $F''(g(\xi)) < 0$ with $g'(\xi) > 0$ (compression from the left). In either case, the characteristic speed $F'(u)$ increases in the direction of decreasing $u$, causing faster characteristics to overtake slower ones.

This general formula reduces to the special case $t_b = -1/\min_x g'(x)$ when $F''(u) = 1$ (Burgers equation) and $g'(x) < 0$ everywhere, showing how the breaking time depends on both the flux nonlinearity and the initial data gradient.

</details>

### Challenge 2: Hyperbolicity and Well-Posedness

A system $\partial_t u + A(u) \partial_x u = 0$ is hyperbolic if $A(u)$ has real eigenvalues for all relevant states $u$. However, hyperbolicity alone does not guarantee well-posedness of the initial value problem.

Show that strict hyperbolicity (distinct eigenvalues) is necessary but not sufficient for well-posedness. Construct an example of a strictly hyperbolic system that is ill-posed, and identify the additional condition (related to the eigenvectors) that ensures well-posedness.

*(Hint: Consider systems where the eigenvectors become nearly parallel, causing the decoupling transformation to become singular.)*

<details>
<summary><strong>Expand Solution</strong></summary>

Strict hyperbolicity ensures that $A(u)$ is diagonalizable: there exists a matrix $R(u)$ whose columns are right eigenvectors such that $R^{-1} A R = \Lambda$, where $\Lambda$ is diagonal with eigenvalues $\lambda_i(u)$.

However, if the eigenvectors become nearly parallel, the matrix $R(u)$ becomes nearly singular, and the transformation $v = R^{-1}(u) u$ becomes ill-conditioned. This can cause the decoupled system $\partial_t v + \Lambda \partial_x v = 0$ to have solutions that grow arbitrarily fast, even though each component satisfies a well-posed scalar equation.

An explicit example is the system

$$\partial_t \begin{pmatrix} u_1 \\ u_2 \end{pmatrix} + \begin{pmatrix} 1 & \epsilon \\ 0 & 2 \end{pmatrix} \partial_x \begin{pmatrix} u_1 \\ u_2 \end{pmatrix} = 0$$

with $\epsilon \ll 1$. The eigenvalues are $1$ and $2$ (strictly hyperbolic), but the eigenvectors are $(1, 0)^T$ and $(1, \epsilon)^T$, which become nearly parallel as $\epsilon \to 0$. The transformation matrix $R = \begin{pmatrix} 1 & 1 \\ 0 & \epsilon \end{pmatrix}$ has condition number $\sim 1/\epsilon$, causing numerical instability.

The additional condition for well-posedness is that the eigenvectors must be uniformly linearly independent: there exists a constant $C > 0$ such that $\vert \det R(u) \vert \geq C$ for all relevant states $u$. This ensures that the decoupling transformation remains bounded, preventing the growth of high-frequency modes.

This condition is automatically satisfied for systems with smooth, strictly hyperbolic flux functions on compact state spaces, but becomes critical for systems with large state variations or near-sonic conditions.

</details>

### Challenge 3: Rarefaction Waves and Self-Similarity

For a scalar conservation law $\partial_t u + \partial_x F(u) = 0$, a rarefaction wave is a smooth solution connecting two constant states $u_L$ and $u_R$ with $u_L < u_R$ and $F'(u_L) < F'(u_R)$.

Show that rarefaction waves must be self-similar: $u(x,t) = u(x/t)$. Derive the explicit formula for the rarefaction wave connecting $u_L$ to $u_R$, and show that it satisfies the Rankine–Hugoniot condition automatically (unlike shocks, which require an additional entropy condition).

*(Hint: Use the method of characteristics and the fact that $u$ is constant along characteristics with speed $F'(u)$.)*

<details>
<summary><strong>Expand Solution</strong></summary>

For a rarefaction wave, characteristics must diverge: $F'(u_L) < F'(u_R)$ ensures that characteristics from the left move slower than those from the right, creating a smooth transition region.

Since $u$ is constant along characteristics with speed $F'(u)$, and the characteristics fill the region between $x = F'(u_L) t$ and $x = F'(u_R) t$, we must have $x/t = F'(u(x,t))$ in the rarefaction region. This immediately implies self-similarity: if $u(x,t)$ and $u(\lambda x, \lambda t)$ both satisfy the equation, then by scaling $x \to \lambda x$, $t \to \lambda t$, we get $u(\lambda x, \lambda t) = u(x,t)$, so $u$ depends only on $x/t$.

The explicit formula is obtained by inverting $x/t = F'(u)$:

$$u(x,t) = \begin{cases}
u_L, & x/t \leq F'(u_L) \\
(F')^{-1}(x/t), & F'(u_L) < x/t < F'(u_R) \\
u_R, & x/t \geq F'(u_R)
\end{cases}$$

To verify the Rankine–Hugoniot condition, consider the flux difference across the rarefaction. At the left edge $x = F'(u_L) t$, we have $u = u_L$ and the characteristic speed is $F'(u_L)$, so the flux is $F(u_L)$. Similarly, at the right edge, the flux is $F(u_R)$. The Rankine–Hugoniot condition would require $F(u_R) - F(u_L) = s(u_R - u_L)$ for some shock speed $s$.

However, by the fundamental theorem of calculus:

$$F(u_R) - F(u_L) = \int_{u_L}^{u_R} F'(u) \, du = \int_{F'(u_L)}^{F'(u_R)} u \, dF'(u)$$

Since $u = (F')^{-1}(\xi)$ and $dF'(u) = F''(u) du$, and using $x/t = F'(u)$ in the rarefaction, this integral equals the area under the curve $u(x/t)$ times $t$, which is exactly $t$ times the average of $u$ weighted by the characteristic speed. The Rankine–Hugoniot condition is automatically satisfied because the rarefaction provides a continuous transition, not a jump.

This demonstrates that rarefaction waves are the natural smooth solutions to Riemann problems, while shocks represent the discontinuous alternatives that become necessary when characteristics converge.

</details>

The theory of hyperbolic conservation laws provides a complete description of wave propagation with finite speeds, but the inevitable formation of shocks reveals the limitations of classical solutions. The integral conservation law remains valid across discontinuities, but it does not uniquely determine the solution. The entropy conditions of Section 3.3 provide the additional physical principle needed to select the physically correct weak solution, completing the theory of hyperbolic conservation laws.

## References

* Evans, L. C. (2010). *Partial Differential Equations* (2nd ed.). American Mathematical Society.
* John, F. (1982). *Partial Differential Equations*. Springer.
* Taylor, M. E. (2011). *Partial Differential Equations I: Basic Theory*. Springer.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 3.1 Manifolds, Tensors & Covariant Derivatives]({{ '/diffequations/chapter-03/03-1-manifolds-tensors/' | relative_url }})
- [Next Section: 3.3 Entropy Conditions & Rankine–Hugoniot]({{ '/diffequations/chapter-03/03-3-entropy-solutions/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-03/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
