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

# Section 3.3: Entropy Solutions & Shock Theory

## Introduction

Characteristics show that nonlinear hyperbolic flows convert smooth data into vertical gradients in finite time. The differential form $\partial_{t}u + \nabla \cdot f(u) = 0$ ceases to make classical sense at the breaking time, yet the integral balance law remains valid. By enlarging the solution space to distributions we retain conservation, but weak solutions are non-unique. Physical irreversibility must be reintroduced analytically via **entropy conditions**. This section derives the Rankine–Hugoniot jump relation, explains why weak formulations alone fail, and presents Lax’s entropy admissibility, entropy–entropy flux pairs, Kruzhkov’s $L^{1}$-contraction theory, and constructive schemes such as Glimm’s method.

## Mathematical Content

### Rankine–Hugoniot Jump Condition

For a one-dimensional conservation law $\partial_{t}u + \partial_{x}f(u) = 0$, suppose $u$ has a discontinuity along $x=s(t)$ with limits $u_{L}$ and $u_{R}$. Integrating over a shrinking space–time control volume and applying the divergence theorem yields the **Rankine–Hugoniot condition**

$$
\sigma [u] = [f(u)], \qquad \sigma = \frac{f(u_{R}) - f(u_{L})}{u_{R}-u_{L}},
$$

where $[v]=v_{R}-v_{L}$. This algebraic relation completely determines the shock speed once the states are known. In multiple dimensions the jump law reads $\sigma [u] = [f(u)\cdot n]$, with $n$ the unit normal to the shock surface (Evans, 2010; Lax, 1973).

### Non-Uniqueness of Weak Solutions

Rankine–Hugoniot is necessary but not sufficient. For Burgers’ flux $f(u)=u^{2}/2$ and Riemann data $u_{L}=-1$, $u_{R}=1$, the stationary discontinuity $u(x,t)=-\operatorname{sgn}(x)$ satisfies the jump law with $\sigma=0$. The rarefaction fan

$$
u(x,t)=\begin{cases}-1,&x<-t,\\ x/t,&-t\le x\le t,\\ 1,&x>t,\end{cases}
$$

also satisfies the integral conservation law. Thus weak solutions are not unique and extra admissibility is required to exclude shocks that emit characteristics.

### Lax Entropy Condition

Physical shocks destroy information: characteristics must enter the discontinuity. For a scalar law with convex flux $f''>0$, Lax’s condition demands

$$
f'(u_{L}) > \sigma > f'(u_{R}).
$$

In Burgers with $u_{L}=-1$, $u_{R}=1$, this inequality would require $-1>0>1$, which is false; hence the stationary shock is rejected and the rarefaction is selected. For systems with eigenvalues $\lambda_{1}<\dots<\lambda_{m}$, a $k$-shock with speed $\sigma$ is admissible if $\lambda_{k}(u_{L})>\sigma>\lambda_{k}(u_{R})$ and $\sigma$ lies strictly between the neighboring characteristic families (Lax, 1973).

### Entropy–Entropy Flux Pairs

To encode admissibility in distributional form, choose a strictly convex entropy $\eta(u)$ and define an associated flux $q(u)$ via $q'(u)=\eta'(u)f'(u)$. Smooth solutions satisfy $\partial_{t}\eta(u)+\partial_{x}q(u)=0$. Across shocks, convexity produces an inequality, leading to the definition: a weak solution is an **entropy solution** if for every entropy pair $(\eta,q)$,

$$
\partial_{t}\eta(u)+\partial_{x}q(u) \le 0
$$

in distributions. This ensures that the total entropy $\int \eta(u)dx$ is non-increasing and that discontinuities only dissipate information.

### Kruzhkov’s $L^{1}$ Contraction Theorem

Kruzhkov (1970) introduced a complete entropy family $\eta_{k}(u)=|u-k|$ with fluxes $q_{k}(u)=\operatorname{sgn}(u-k)\big(f(u)-f(k)\big)$. He proved that if $u$ and $v$ are entropy solutions with initial data $u_{0}$ and $v_{0}$, then for all $t>0$,

$$
\|u(\cdot,t)-v(\cdot,t)\|_{L^{1}} \le \|u_{0}-v_{0}\|_{L^{1}}.
$$

Consequences include uniqueness, continuous dependence on initial data, and a non-expansive semigroup in $L^{1}$. Thus $L^{1}$ emerges as the natural topology for scalar hyperbolic evolution, contrasting with the $L^{2}$ framework of elliptic problems in Chapter 2.

### Glimm Scheme and TVD Bounds

Existence for general systems with small total variation follows from Glimm’s random choice method (Glimm, 1965). The scheme approximates data by piecewise constants, solves exact Riemann problems at each interface, and randomly samples states to prevent wave overlap. Glimm’s interaction functional shows that the total variation remains bounded (TVD), and the sequence converges (along subsequences) to an entropy solution. This constructive argument underlies modern high-resolution shock-capturing algorithms and links analytical entropy theory to numerical practice.

### Conclusion

Entropy conditions reconcile conservation with irreversibility: shocks satisfy Rankine–Hugoniot but must also dissipate entropy. Lax’s geometric criterion and Kruzhkov’s functional inequalities filter out unphysical weak solutions, while Glimm’s scheme guarantees existence under small total variation. The result is a robust, thermodynamically consistent theory of hyperbolic evolution, preparing us for the coordinate-free integration theory of Section 3.4.

## References

* Evans, L. C. (2010). *Partial Differential Equations* (2nd ed.). American Mathematical Society.
* Glimm, J. (1965). Solutions in the large for nonlinear hyperbolic systems of equations. *Communications on Pure and Applied Mathematics*, 18, 697–715.
* Kruzhkov, S. N. (1970). First order quasilinear equations in several independent variables. *Mathematics of the USSR-Sbornik*, 10(2), 217–243.
* Lax, P. D. (1973). *Hyperbolic Systems of Conservation Laws and the Mathematical Theory of Shock Waves*. SIAM.
* Smoller, J. (1983). *Shock Waves and Reaction–Diffusion Equations*. Springer.

## Complete Examples

### Example 3.3.1: Rankine–Hugoniot Shock for Burgers

**Problem:** Solve $\partial_{t}u + \partial_{x}(u^{2}/2)=0$ with $u(x,0)=1$ for $x<0$ and $u(x,0)=0$ for $x\ge 0$.

Characteristics from $x_{0}<0$ travel with slope $1$; those from $x_{0}\ge 0$ remain stationary. They intersect at $t=1$, so a shock forms. Rankine–Hugoniot gives $\sigma = \frac{0^{2}/2 - 1^{2}/2}{0-1}=1/2$, hence $s(t)=t/2$ and

$$
u(x,t)=\begin{cases}1,&x<t/2,\\0,&x>t/2.\end{cases}
$$

Plugging this piecewise function into the weak formulation confirms that it solves the PDE in distributions.

### Example 3.3.2: Entropy Violation and Rarefaction

**Problem:** For Burgers with $u(x,0)=-1$ for $x<0$ and $u(x,0)=1$ for $x>0$, compare the stationary shock with the rarefaction fan.

The jump law yields $\sigma=0$, producing $u(x,t)=-\operatorname{sgn}(x)$, but Lax’s condition would require $-1>0>1$, which fails. Instead, the admissible solution is the rarefaction

$$
u(x,t)=\begin{cases}-1,&x<-t,\\ x/t,&-t\le x\le t,\\ 1,&x>t,\end{cases}
$$

which preserves causality by allowing characteristics to spread rather than emerge from the discontinuity.

### Example 3.3.3: Entropy Inequality Verification

**Problem:** Verify that the rarefaction in Example 3.3.2 satisfies the entropy inequality for $(\eta, q)=(u^{2}, u^{3}/3)$.

In each smooth region $\partial_{t}\eta + \partial_{x}q = 0$. Across the self-similar fan $u=x/t$, one computes $\partial_{t}(x^{2}/t^{2}) = -2x^{2}/t^{3}$ and $\partial_{x}(x^{3}/(3t^{3})) = x^{2}/t^{3}$, summing to zero. At $x=\pm t$, the jump terms vanish because the boundaries move with the characteristic speed, so the distributional inequality holds.

### Example 3.3.4: Explicit $L^{1}$ Contraction

**Problem:** Let $u_{0}=\chi_{(-1,1)}$ and $v_{0}=\chi_{(-1.1,1.1)}$ for Burgers. Show that $\|u(\cdot,t)-v(\cdot,t)\|_{L^{1}}$ remains constant.

Both solutions consist of rectangular pulses transported by shocks at speed $1/2$. The overlap region keeps measure $2$, while the mismatched boundary intervals each have measure $0.1$, so $\|u_{0}-v_{0}\|_{L^{1}}=0.2$ and the same holds for all $t$. Kruzhkov’s general proof integrates $\partial_{t}|u-v| + \partial_{x}\operatorname{sgn}(u-v)(f(u)-f(v)) \le 0$ to obtain $L^{1}$ contraction.

### Example 3.3.5: Three Steps of the Glimm Scheme

**Problem:** Apply Glimm’s random choice method to Burgers with $u_{0}(x)=\sin(2\pi x)$, grid size $\Delta x=0.1$, and $\Delta t=0.02$.

1. **Initialization:** Set $u_{j}^{0}=\sin(2\pi j\Delta x)$. Each cell interface defines a local Riemann problem.
2. **Riemann solves:** At, say, $j=5$, the left/right states are $-0.587$ and $0$, producing a shock with $\sigma\approx 0.172$.
3. **Random sampling:** Choose a point $\xi_{j}^{1}\in[j\Delta x,(j+1)\Delta x]$; set $u_{j}^{1}$ to the Riemann solution evaluated at $(\xi_{j}^{1},\Delta t)$. Repeat each step to march forward. Glimm’s interaction functional shows that the total variation $\mathrm{TV}(u^{n})$ decreases, ensuring convergence of the sequence to an entropy solution.

### Example 3.3.6: Two-Dimensional Rankine–Hugoniot

**Problem:** Solve $\partial_{t}u + \partial_{x}(u^{2}/2) + \partial_{y}u = 0$ with quadrant data $u=1$ for $x>0,y>0$, $u=0$ in the upper-left and lower-left quadrants, and $u=-1$ for $x>0,y<0$.

Across $y=0$ the normal $n=(0,1)$ yields $\sigma = \frac{g(-1)-g(0)}{-1-0}=1$. Across $x=0$, $n=(1,0)$ gives $\sigma=\frac{f(1)-f(0)}{1-0}=1/2$. At the origin the shocks interact; solving the coupled jump conditions with an entropy inequality determines the admissible wedge structure. This example illustrates how the multidimensional Rankine–Hugoniot condition constrains shock geometry.

### Example 3.3.7: Non-Convex Flux and Compound Waves

**Problem:** Consider $f(u)=u^{3}-u$ with $u_{L}=-1$, $u_{R}=1$.

The naive stationary shock has $\sigma=0$, but because $f''(u)=6u^{2}-2$ changes sign, the entropy condition is subtler. Liu’s criterion requires $\sigma(u_{L},u_{R}) \ge \sigma(u,u_{R})$ for all $u\in(u_{L},u_{R})$. The admissible solution consists of a shock from $-1$ to $u_{m}=-1/\sqrt{3}$ followed by a rarefaction from $u_{m}$ to $1$. This **compound wave** demonstrates how non-convex fluxes produce mixed shock–rarefaction structures and necessitate generalized entropy conditions.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 3.2 Systems of Conservation Laws & Hyperbolicity]({{ '/diffequations/chapter-03/03-2-conservation-laws/' | relative_url }})
- [Next Section: 3.4 Exterior Calculus & Hodge Decomposition]({{ '/diffequations/chapter-03/03-4-exterior-calculus/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-03/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
