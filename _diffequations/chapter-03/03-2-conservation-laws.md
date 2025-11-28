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

# Section 3.2: Systems of Conservation Laws & Hyperbolicity

## Introduction

Chapter 3.1 supplied the coordinate-free language of manifolds, making it possible to write PDEs intrinsically. We now impose the physically indispensable constraint of **finite propagation speed** by studying hyperbolic conservation laws. Unlike the elliptic and parabolic models of Chapter 2, which transmit disturbances instantaneously, hyperbolic systems carry information along characteristic curves with finite slopes, preserving causality in fluid dynamics, electromagnetism, and traffic flow. We begin with integral conservation statements, derive their differential forms, and analyze how nonlinear fluxes force shocks to develop from smooth data.

## Mathematical Content

### Conservation Form and Differential Equations

For a conserved quantity with density $u(x,t)$ and flux $F(u)$, the balance law on a fixed region $\Omega \subset \mathbb{R}^{n}$ is

$$
\frac{d}{dt} \int_{\Omega} u(x,t) \, dx = - \int_{\partial \Omega} F(u) \cdot \nu \, dS,
$$

a statement of mass, momentum, or energy conservation. Assuming sufficient smoothness, the divergence theorem converts the surface flux into a volume integral. Because $\Omega$ is arbitrary, the integrand must vanish, yielding the **differential form**

$$
\partial_{t} u + \nabla \cdot F(u) = 0.
$$

When $u:\mathbb{R}^{n} \times [0,\infty)\to \mathbb{R}^{m}$, we obtain a **system of conservation laws**. The nonlinear dependence of $F$ on $u$ distinguishes these equations sharply from the linear theories of Chapter 2.

### Hyperbolicity and Characteristic Speeds

In one space dimension the divergence reduces to a derivative, producing the **quasilinear form**

$$
\partial_{t} u + A(u) \, \partial_{x} u = 0, \qquad A(u)=DF(u).
$$

The system is **hyperbolic** if $A(u)$ is diagonalizable with real eigenvalues for every relevant state $u$. It is **strictly hyperbolic** if the eigenvalues satisfy $\lambda_{1}(u) < \cdots < \lambda_{m}(u)$. The eigenvalues represent characteristic speeds; the associated left eigenvectors $l_{i}(u)$ decouple the system into scalar equations

$$
l_{i}(u) \cdot \big( \partial_{t} u + \lambda_{i}(u) \partial_{x} u \big) = 0,
$$

revealing **Riemann invariants** that propagate along characteristic curves. Hyperbolicity therefore enforces finite signal speeds and prevents the instantaneous communication inherent to elliptic/parabolic flows.

### Method of Characteristics for Scalar Equations

When $m=1$, the conservation law $\partial_{t} u + \partial_{x} F(u) = 0$ has characteristics $x(t)$ solving

$$
\frac{dx}{dt} = F'(u(x,t)) = \lambda(u),
$$

and along these curves

$$
\frac{d}{dt} u(x(t),t) = \partial_{t} u + \frac{dx}{dt} \partial_{x} u = \partial_{t} u + F'(u) \partial_{x} u = 0.
$$

Hence $u$ remains constant along characteristics, producing the implicit solution formula $u(x,t)=g(\xi)$ with $\xi = x - F'(g(\xi))t$ determined by the initial profile $u(x,0)=g(x)$. The slope of each characteristic depends on the solution itself, unlike linear transport where all characteristics are parallel. This dependence causes neighboring characteristics to converge or diverge depending on $g'(x)$.

### Shock Formation and Finite-Time Breakdown

Nonlinear flux inevitably leads to intersecting characteristics. In the inviscid Burgers equation $\partial_{t} u + u \partial_{x} u = 0$, large values of $u$ travel faster than small ones. For smooth initial data with $g'(x)<0$, characteristics originating from larger amplitudes overtake those from smaller amplitudes. Differentiating the implicit solution yields

$$
\partial_{x} u(x,t) = \frac{g'(\xi)}{1 + t \, g'(\xi)}.
$$

Whenever $g'(\xi)<0$, the denominator vanishes at $t=-1/g'(\xi)$, and the gradient blows up. The earliest such time

$$
 t_{\mathrm{b}} = \frac{-1}{\min_{x} g'(x)}
$$

marks the **breaking time**, beyond which the classical solution ceases to exist. The multi-valued profile must be replaced by a weak (distributional) solution satisfying the integral conservation law together with additional admissibility criteria—entropy conditions—that select the physically correct shock. This necessity motivates Section 3.3.

## Connections to Chapter Narrative

Section 3.1 provided the manifold setting for PDEs. Here we build the dynamical component: hyperbolic conservation laws that respect finite propagation speed. The impending shock formation shows that even smooth geometric formulations inevitably require weak solutions, setting the stage for entropy inequalities, Rankine–Hugoniot jump conditions, and geometric shock surfaces in later sections.

## References

* Evans, L. C. (2010). *Partial Differential Equations* (2nd ed.). American Mathematical Society.
* John, F. (1982). *Partial Differential Equations*. Springer.
* Taylor, M. E. (2011). *Partial Differential Equations I: Basic Theory*. Springer.

## Complete Examples

### Example 3.2.1: Burgers Equation Before Breaking

**Problem:** Solve $\partial_{t}u + u \partial_{x}u = 0$ with

$$
u(x,0) = \begin{cases} 1 - \frac{|x|}{2}, & |x| \le 2, \\ 0, & |x| > 2. \end{cases}
$$

Characteristics through $(\xi,0)$ satisfy $x(t)=\xi+u(\xi,0)t$, yielding $u(x,t)=u(\xi,0)$ with $\xi = x - u(\xi,0)t$. For $|\xi|>2$, $u \equiv 0$ and $x=\xi$. For $|\xi|<2$ we solve $\xi = x - (1-|\xi|/2)t$, leading to three regions: (i) $|x|>2+t$ with $u=0$, (ii) $|x|<2-t$ with $u=1-|x|/2$, and (iii) an intermediate region where $\xi$ solves a quadratic. The gradient evolves as

$$
\partial_{x}u = \frac{-1/2}{1 - t/2} = \frac{-1}{2 - t},
$$

blowing up at $t_{\mathrm{b}}=2$. Thus the explicit piecewise solution is valid only for $0<t<2$, after which characteristics intersect and shocks must form.

### Example 3.2.2: Traffic Flow Rarefaction

**Problem:** Model traffic density $\rho$ using $\partial_{t}\rho + \partial_{x}(\rho v(\rho)) = 0$ with $v(\rho)=1-\rho$ and initial data $\rho(x,0)=0.8$ for $x<0$, $0.2$ for $x>0$.

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

### Example 3.2.3: Simultaneous Shock Formation

**Problem:** For Burgers’ equation with

$$
u(x,0) = \begin{cases} 1, & x < 0, \\ 1 - x, & 0 \le x \le 1, \\ 0, & x > 1, \end{cases}
$$

compute the breaking time.

Characteristics emanating from $\xi \in (0,1)$ have slopes $1-\xi$ and gradients $\partial_{x}u = \frac{-1}{1+t}$, so all compression points experience infinite slope at $t=1$. The solution before breaking is

$$
\nu(x,t)=
\begin{cases}
1, & x < t, \\
\frac{x}{t}, & t < x < 1, \\
1 - x, & 1 < x < 2 - t, \\
0, & x > 2 - t,
\end{cases}
$$

with gradients $\partial_{x}u = 1/t$ in the expanding fan and $-1/(1+t)$ in the compression region. At $t=1$ all compression characteristics collide simultaneously, producing an instantaneous shock—a vivid illustration of how nonlinear hyperbolic equations destroy smoothness.

### Example 3.2.4: Linear Acoustics System

**Problem:** Diagonalize the linear system $\partial_{t}\rho + \partial_{x}u = 0$, $\partial_{t}u + c^{2}\partial_{x}\rho = 0$.

The Jacobian $A = \begin{pmatrix} 0 & 1 \\ c^{2} & 0 \end{pmatrix}$ has eigenvalues $\lambda_{\pm} = \pm c$ with eigenvectors $r_{\pm} = (1, \pm c)^{T}$. Defining Riemann invariants $w_{\pm} = u \pm c\rho$ yields advection equations $\partial_{t} w_{\pm} \pm c \, \partial_{x} w_{\pm} = 0$, so $w_{\pm}(x,t)=w_{\pm}(x \mp ct,0)$. The solution is recovered via $u = (w_{+}+w_{-})/2$ and $\rho = (w_{+}-w_{-})/(2c)$, demonstrating strict hyperbolicity and finite propagation at speeds $\pm c$.

### Example 3.2.5: Isentropic Euler Eigenstructure

**Problem:** For the isentropic Euler system

$$
\partial_{t} \begin{pmatrix} \rho \\ \rho u \end{pmatrix} + \partial_{x} \begin{pmatrix} \rho u \\ \rho u^{2} + p(\rho) \end{pmatrix} = 0, \quad p(\rho)=K\rho^{\gamma},
$$

find eigenvalues and Riemann invariants.

The Jacobian is $A(U)=\begin{pmatrix} u & \rho \\ c^{2}/\rho & u \end{pmatrix}$ with $c^{2}=\gamma K \rho^{\gamma-1}$. Eigenvalues are $\lambda_{\pm}=u\pm c$. Left eigenvectors $l_{\pm} \propto (\mp c/\rho, 1)$ yield invariants $w_{\pm}=u \pm \frac{2c}{\gamma-1}$. These invariants propagate along $dx/dt = u \pm c$, generalizing the acoustic case to nonlinear gas dynamics and revealing the characteristic families used in Riemann problems.

### Example 3.2.6: Riemann Problem Wave Pattern Selection

**Problem:** Solve the Riemann problem for the isentropic Euler system with left state $U_{L}=(1,0)$ and right state $U_{R}=(0.125,0)$ when $\gamma=1.4$.

Evaluating the Hugoniot and rarefaction curves shows that a 1-shock followed by a 2-rarefaction satisfies both Rankine–Hugoniot and entropy conditions. Solving the matching equations yields middle velocity $u^{\ast}\approx 0.92757$, shock speed $s\approx 1.75279$, and a rarefaction fan connecting $U^{\ast}$ to $U_{R}$ along $x/t = u^{\ast} + c^{\ast}$. Any other wave pattern violates the Lax entropy inequalities, highlighting how hyperbolicity guides the admissible combination of shocks and rarefactions.

### Example 3.2.7: Shallow-Water (p-System) Characteristics

**Problem:** Analyze the shallow-water system

$$
\partial_{t} h + \partial_{x}(h u) = 0, \qquad \partial_{t}(h u) + \partial_{x}\left(h u^{2} + \tfrac{1}{2} g h^{2}\right) = 0.
$$

Quasilinearization gives $A(U)=\begin{pmatrix} u & h \\ g & u \end{pmatrix}$ with eigenvalues $u \pm \sqrt{gh}$. The Riemann invariants $r_{\pm}=u \pm 2\sqrt{gh}$ remain constant along characteristics $dx/dt = u \pm \sqrt{gh}$. Because $\nabla \lambda_{\pm} \cdot r_{\pm} \neq 0$, both characteristic fields are genuinely nonlinear, implying that shocks generically form from smooth initial perturbations—exactly as in the scalar Burgers setting.

### Example 3.2.8: Genuine Nonlinearity Test

**Problem:** Verify genuine nonlinearity for the $+$ characteristic field of the Euler system.

With $\lambda_{+}=u+c$, $r_{+}=(1, u+c)^{T}$, and $\nabla \lambda_{+}=(1, c/\rho)$, the dot product is

$$
\nabla \lambda_{+} \cdot r_{+} = 1 + \frac{c}{\rho}(u+c) > 0
$$

for all physically relevant states. Thus the $+$ field is genuinely nonlinear, ensuring that compression waves steepen into shocks unless moderated by dispersion or viscosity. This computation also confirms that entropy conditions will later be required to select admissible discontinuities.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 3.1 Manifolds, Tensors & Covariant Derivatives]({{ '/diffequations/chapter-03/03-1-manifolds-tensors/' | relative_url }})
- [Next Section: 3.3 Entropy Conditions & Rankine–Hugoniot]({{ '/diffequations/chapter-03/03-3-entropy-solutions/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-03/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
