---
layout: textbook
title: "Section 1.1: Exact Methods for Ordinary Differential Equations"
description: "Existence, uniqueness, and classical solution methods"
permalink: /diffequations/chapter-01/01-1-exact-methods/
order: 1.1
chapter: 1
section: 1
nav_order: 1.1
is_chapter_index: false
parent_chapter: 1
parent_section: null
---

# Section 1.1: Exact Methods for Ordinary Differential Equations

## Introduction

We begin with the concept of reduction to quadrature. We examine **Separable** and **Exact** equations not as algebraic tricks, but as manifestations of local geometry—specifically, the search for a coordinate system where the vector field flattens. We introduce the **Riccati Equation** to show how nonlinear problems can sometimes be linearized via transformation. The section concludes with the failure of these methods for non-integrable systems, introducing the concept of **Chaos** as the generic state of dynamical systems.

## Mathematical Content

### Existence and Uniqueness

We model first-order equations as $y' = f(x,y)$ with $y(x_{0}) = y_{0}$. The Picard–Lindelöf theorem guarantees local solvability: if $f$ is continuous on a rectangle containing $(x_{0}, y_{0})$ and satisfies $\left|f(x,y_{1}) - f(x,y_{2})\right| \leq K \left|y_{1}-y_{2}\right|$, then the operator

$$
(\mathcal{T}y)(x) = y_{0} + \int_{x_{0}}^{x} f(t, y(t))\,dt
$$

is a contraction on a sufficiently small interval. Banach’s fixed-point theorem furnishes a unique fixed point, and loss of the Lipschitz condition explains non-uniqueness phenomena.

### Separation of Variables and Exact Forms

When the field factors as $y' = P(x)/Q(y)$ we obtain

$$
Q(y)\,dy = P(x)\,dx, \qquad \int Q(y)\,dy = \int P(x)\,dx,
$$

reducing the problem to quadrature. Writing $M(x,y)\,dx + N(x,y)\,dy = 0$ reveals structure: if

$$
\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x},
$$

then the form is exact and $d\psi = M\,dx + N\,dy$, so $\psi(x,y) = c$ describes solutions. Integrating factors $\mu(x,y)$ enforce exactness via $\partial(\mu M)/\partial y = \partial(\mu N)/\partial x$, often guided by symmetry.

### Linear First-Order Equations

The linear equation $y' + P(x) y = Q(x)$ uses the integrating factor

$$
\mu(x) = \exp\left(\int P(x)\,dx\right), \qquad (\mu y)' = \mu Q.
$$

This is a special case of variation of parameters: given a homogeneous solution $y_{h}$, set $y = v(x) y_{h}(x)$ and derive a separable equation for $v$. Bernoulli equations $y' + P(x) y = Q(x) y^{n}$ reduce to linear form once we substitute $v = y^{1-n}$.

### The Riccati Equation and Linearization

Riccati equations

$$
y' = P(x) + Q(x) y + R(x) y^{2}
$$

bridge linear and nonlinear dynamics. If $y_{1}$ is a particular solution, substituting $y = y_{1} + 1/v$ produces a linear first-order equation for $v$. Alternatively, $y = -u'/(R u)$ converts the Riccati equation into

$$
u'' + \left(Q + \frac{R'}{R}\right)u' + PR\,u = 0,
$$

showing how nonlinearity can arise from projecting higher-dimensional linear flow.

### Second-Order Linear Homogeneous Equations

Equations like $y'' + p(x) y' + q(x) y = 0$ underpin classical physics. Constant coefficients yield the characteristic polynomial $r^{2} + pr + q = 0$ with exponential solutions. Cauchy–Euler equations $x^{2} y'' + a x y' + by = 0$ admit $y = x^{r}$. When one solution $y_{1}$ is known, reduction of order sets $y_{2} = v(x) y_{1}(x)$, giving

$$
y_{2}(x) = y_{1}(x) \int \frac{\exp\left(-\int p(s)\,ds\right)}{y_{1}(t)^{2}}\,dt.
$$

The Wronskian $W = y_{1} y_{2}' - y_{1}' y_{2}$ satisfies Abel’s identity $W' = -p(x) W$, so $W \neq 0$ at one point implies linear independence everywhere.

### Systems and Matrix Methods

Systems $\mathbf{y}' = A(x) \mathbf{y}$ inherit linear structure. Solutions form an $n$-dimensional vector space with fundamental matrix $\Phi$ satisfying $\Phi' = A\Phi$. The general solution is $\mathbf{y} = \Phi \mathbf{c}$. Abel’s formula extends via

$$
\det \Phi(x) = \det \Phi(x_{0}) \exp\left( \int_{x_{0}}^{x} \operatorname{tr} A(t)\,dt \right),
$$

tying phase-space volume change to $\operatorname{tr} A$.

### First Integrals and Level Sets

Autonomous systems often admit first integrals $H(x,y)$ with $dH/dt = 0$, so trajectories lie on $H = c$. In Hamiltonian form the Poisson bracket

$$
\{F, H\} = \nabla F \cdot J \nabla H
$$

encodes conservation: if $\{F, H\} = 0$, then $F$ is invariant. This foreshadows the symplectic viewpoint of later sections.

## Connections to Chapter Narrative

Exact methods comprise the opening tier of the “explicit arsenal.” They succeed when symmetry or coordinate choice flattens the vector field, but their fragility—non-Lipschitz behavior, elusive integrating factors, scarce Riccati solutions—necessitates the special functions, integral transforms, and spectral frameworks developed later in Chapter 1 and beyond.

## References

* **Arnold, V. I. (1983).** *Ordinary Differential Equations*. Springer.
* **Coddington, E. A., & Levinson, N. (1955).** *Theory of Ordinary Differential Equations*. McGraw–Hill.
* **Hartman, P. (1964).** *Ordinary Differential Equations*. Wiley.
* **Perko, L. (2013).** *Differential Equations and Dynamical Systems*. Springer.

## Complete Examples

### Example 1.1.1: Picard–Lindelöf Iteration and Well-Posedness

**Problem:** Solve $y' = y$ with $y(0) = 1$ and demonstrate convergence of Picard iteration.

The exact solution is $y = e^{x}$. Picard iteration starts with $y_{0} = 1$ and applies $y_{n+1}(x) = 1 + \int_{0}^{x} y_{n}(t)\,dt$, giving

$$
y_{1} = 1 + x, \quad y_{2} = 1 + x + \frac{x^{2}}{2}, \quad y_{3} = 1 + x + \frac{x^{2}}{2} + \frac{x^{3}}{6},
$$

so $y_{n}(x) = \sum_{k=0}^{n} x^{k}/k!$ converges uniformly on $\lvert x \rvert < 1$ to $e^{x}$. The Lipschitz constant is $K = 1$, and standard estimates bound the truncation error.

### Example 1.1.2: Radioactive Decay with Production

**Problem:** Solve $y' = -ky + P$ with $y(0) = y_{0}$ and verify Picard iteration.

The solution is

$$
y(x) = \left(y_{0} - \frac{P}{k}\right) e^{-kx} + \frac{P}{k}.
$$

Picard iterates converge because $f(y) = -ky + P$ is Lipschitz with constant $k$.

### Example 1.1.3: Failure without Lipschitz Continuity

**Problem:** Analyze $y' = \sqrt{\left|y\right|}$ with $y(0) = 0$.

Both $y = 0$ and $y = (x/2)^{2}$ satisfy the equation for $x \geq 0$. Since

$$
\frac{\left|\sqrt{\left|y_{1}\right|} - \sqrt{\left|y_{2}\right|}\right|}{\left|y_{1} - y_{2}\right|} \to \infty \quad \text{as } y_{1}, y_{2} \to 0,
$$

the Lipschitz condition fails and uniqueness is lost.

### Example 1.1.4: Separation of Variables

**Problem:** Solve $y' = xy$ with $y(0) = 1$.

We have $dy/y = x\,dx$, leading to $\ln \left|y\right| = x^{2}/2 + C$ and $y = e^{x^{2}/2}$.

### Example 1.1.5: Newton’s Law of Cooling

**Problem:** Solve $T' = -k(T - T_{a})$.

Separating gives $dT/(T - T_{a}) = -k\,dt$, hence $T(t) = T_{a} + (T_{0} - T_{a}) e^{-kt}$.

### Example 1.1.6: Logistic Growth

**Problem:** Solve $y' = ry(1 - y/K)$.

Integrating $dy/[y(1 - y/K)] = r\,dt$ yields $\ln \left|\frac{y}{K - y}\right| = rt + C$ and $y(t) = \frac{K}{1 + A e^{-rt}}$ with $A = (K - y_{0})/y_{0}$.

### Example 1.1.7: Exact Equation

**Problem:** Solve $(2xy + y^{2})\,dx + (x^{2} + 2xy)\,dy = 0$.

Since $\partial M/\partial y = \partial N/\partial x = 2x + 2y$, the equation is exact. Integrating $M$ with respect to $x$ yields $\psi = x^{2}y + xy^{2}$, so $\psi = C$ describes level sets.

### Example 1.1.8: Linear First-Order Equation

**Problem:** Solve $y' + 2xy = x$ with $y(0) = 0$.

Using $\mu = e^{x^{2}}$,

$$
\frac{d}{dx}\left(y e^{x^{2}}\right) = x e^{x^{2}}, \qquad y(x) = \frac{1}{2}\left(1 - e^{-x^{2}}\right).
$$

### Example 1.1.9: Bernoulli Equation

**Problem:** Solve $y' + y = x y^{3}$.

Set $v = y^{-2}$ to obtain $v' - 2v = -2x$. Multiplying by $e^{-2x}$ gives $d(v e^{-2x})/dx = -2x e^{-2x}$, so $v = x - \tfrac{1}{2} + C e^{2x}$ and $y = (x - \tfrac{1}{2} + C e^{2x})^{-1/2}$.

### Example 1.1.10: Riccati Equation

**Problem:** Solve $y' = y^{2} - 2xy + x^{2} + 1$.

The particular solution $y_{p} = x$ permits $y = x + 1/v$, leading to $v' = 0$ and $y = x + 1/C$. A single known solution collapses the Riccati equation to linear form.

### Example 1.1.11: Constant-Coefficient Second Order

**Problem:** Solve $y'' - 3y' + 2y = 0$.

The characteristic polynomial $(r - 1)(r - 2) = 0$ produces $y = C_{1} e^{x} + C_{2} e^{2x}$.

### Example 1.1.12: Cauchy–Euler Equation

**Problem:** Solve $x^{2} y'' - 3x y' + 4y = 0$.

Substituting $y = x^{r}$ yields $(r - 2)^{2} = 0$, so $y = C_{1} x^{2} + C_{2} x^{2} \ln x$.

### Example 1.1.13: Reduction of Order

**Problem:** Given $y_{1} = e^{x^{2}/2}$ solves $x y'' + y' - xy = 0$, find $y_{2}$.

Let $y_{2} = v y_{1}$. Substituting leads to $v'' + (2x + 1/x) v' = 0$. Setting $w = v'$ gives $w = C/(x e^{x^{2}})$, and integrating yields $y_{2} = -\operatorname{Ei}(-x^{2}) e^{x^{2}/2}$.

### Example 1.1.14: Linear System via Eigen-Decomposition

**Problem:** Solve $y_{1}' = y_{1} + y_{2}$, $y_{2}' = 4y_{1} + y_{2}$.

With $A = \begin{pmatrix} 1 & 1 \\ 4 & 1 \end{pmatrix}$, eigenvalues satisfy $\lambda^{2} - 2\lambda - 3 = 0$, giving $\lambda_{1} = 3$, $\lambda_{2} = -1$. Eigenvectors $(1,2)^{\top}$ and $(1,-2)^{\top}$ yield

$$
\mathbf{y}(x) = C_{1} e^{3x} \begin{pmatrix} 1 \\ 2 \end{pmatrix} + C_{2} e^{-x} \begin{pmatrix} 1 \\ -2 \end{pmatrix}.
$$

### Example 1.1.15: First Integrals of the Harmonic Oscillator

**Problem:** Show $H(x,y) = \tfrac{1}{2}(x^{2} + y^{2})$ is conserved for $x' = y$, $y' = -x$.

Compute $dH/dt = x y + y(-x) = 0$, so trajectories lie on circles $x^{2} + y^{2} = C$. The Poisson bracket with $H$ vanishes for any function of $x^{2} + y^{2}$, illustrating conserved quantities.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Next Section: 1.2 Special Functions of Mathematical Physics]({{ '/diffequations/chapter-01/01-2-special-functions/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-01/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
