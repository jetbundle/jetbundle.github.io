---
layout: textbook
title: "Section 1.6: Classical Perturbation Theory"
description: "Regular and singular perturbation, Poincaré-Lindstedt"
permalink: /diffequations/chapter-01/01-6-perturbation-theory/
order: 1.6
chapter: 1
section: 6
nav_order: 1.6
is_chapter_index: false
parent_chapter: 1
parent_section: null
---
Perturbation theory trades exact solvability for approximate validity: we expand around what we can solve, but secular terms expose the fragility of this approach over long times.

## Introduction

We attempt to solve nonlinear problems by expanding around a linear limit. **Regular Perturbation** works for finite time, but **Secular Terms** (like $t \sin t$) destroy validity as $t \to \infty$. We introduce **Poincaré-Lindstedt** and **Multiple Scale Analysis** to remove these resonances. We encounter **Singular Perturbation** problems where the highest derivative is small, creating boundary layers that defy uniform convergence.

## Regular Perturbation

For $y'=f(x,y,\epsilon)$ with $y(0)=\alpha$, assume

$$
y(x;\epsilon)\sim \sum_{n=0}^{\infty}\epsilon^{n}y_{n}(x).
$$

Substituting and expanding $f$ about $\epsilon=0$ yields the unperturbed system $y_{0}'=f(x,y_{0},0)$ followed by linear inhomogeneous equations for $y_{n}$ driven by $y_{0},\dots,y_{n-1}$. Analyticity of $f$ in $y$ and $\epsilon$ guarantees convergence for $\vert \epsilon \vert <R$ on finite intervals. The series fails when $\epsilon$ multiplies the highest derivative or when secular terms accumulate over long times, motivating singular and multiscale techniques.

**Regular Perturbation of a Linear ODE**

Solve $y'+y=\epsilon\sin x$, $y(0)=1$ to $O(\epsilon)$.

Let $y=y_{0}+\epsilon y_{1}+\cdots$. The $O(1)$ equation $y_{0}'+y_{0}=0$ gives $y_{0}=e^{-x}$. At $O(\epsilon)$, $y_{1}'+y_{1}=\sin x$ with $y_{1}(0)=0$ yields

$$
y_{1}(x)=\frac{1}{2}(\sin x-\cos x+e^{-x}).
$$

Thus $y\approx e^{-x}+\frac{\epsilon}{2}(\sin x-\cos x+e^{-x})$, matching the Taylor expansion of the exact solution.

Regular perturbation works beautifully when the perturbation is truly small and the unperturbed solution is stable. However, this success is deceptive—the series may diverge even when the exact solution is perfectly well-behaved.

**Divergence in Regular Perturbation**

For $y'=-y+\epsilon y^{2}$, $y(0)=1$, find the perturbation series.

Solutions satisfy $y_{n}(x)=3^{-n}(n+1)^{-1}e^{-(n+1)x}$. The series

$$
y(x;\epsilon)\sim \sum_{n=0}^{\infty}\frac{\epsilon^{n}}{3^{n}(n+1)}e^{-(n+1)x}
$$

has radius $\vert \epsilon \vert <3$, yet the exact solution $y=e^{-x}/[1-\frac{\epsilon}{3}(1-e^{-x})]$ is singular at $\epsilon=3/(1-e^{-x})$. The nearest pole in the complex $\epsilon$-plane controls convergence, illustrating asymptotic (non-convergent) behavior.

The radius of convergence is controlled by the nearest singularity in the complex $\epsilon$-plane. Even when the exact solution exists for all time, the perturbation series may diverge, revealing that convergence is a delicate property.

## Singular Perturbations and Boundary Layers

When $\epsilon$ multiplies the highest derivative, e.g.

$$
\epsilon y''+a(x)y'+b(x)y=0,\qquad y(0)=A,\ y(1)=B,
$$

setting $\epsilon=0$ reduces the order and loses boundary conditions. The solution adjusts rapidly inside a boundary layer of thickness $\delta(\epsilon)$ near the affected boundary. Matched asymptotic expansions build an outer series (solving the reduced equation) and an inner series using a stretched coordinate $\tau=(x-x_{0})/\epsilon^{\alpha}$. Matching their overlap determines integration constants and produces a uniformly valid composite approximation.

**Linear Boundary Layer**

Solve $\epsilon y''+2y'+y=0$ with $y(0)=0$, $y(1)=1$.

The outer solution $y_{0}=C e^{-x/2}$ fails to satisfy both boundaries. Introducing $\tau=(1-x)/\epsilon$, the inner equation becomes $Y''-2Y'=0$ with $Y=A+B e^{2\tau}$. Matching and applying $y(1)=1$ yield the composite approximation

$$
y(x;\epsilon)\approx e^{-x/2}+(1-e^{-1/2})e^{-2(1-x)/\epsilon},
$$

capturing the boundary layer near $x=1$.

Boundary layers arise when the highest derivative is small but cannot be ignored near boundaries. The solution transitions rapidly in a thin region to satisfy the boundary condition that would otherwise be lost in the reduced equation.

**Nonlinear Boundary Layer**

Solve $\epsilon y''=y^{2}-1$, $y(0)=0$, $y(1)=2$.

The outer solution is $y_{0}=1$. Near $x=0$, $\tau=x/\sqrt{\epsilon}$ leads to $Y''=Y^{2}-1$ with heteroclinic solution $Y(\tau)=\tanh(\tau/\sqrt{2})$. Matching with $y_{0}$ produces the composite $y\approx \tanh(x/\sqrt{2\epsilon})$, which coincides with the exact solution.

Nonlinear boundary layers can be solved exactly in some cases, providing exact solutions that exhibit the characteristic rapid transition. The boundary layer thickness $\delta(\epsilon) = \sqrt{\epsilon}$ reflects the nonlinear structure of the equation.

## Poincaré–Lindstedt Method

For weakly nonlinear oscillators, naïve perturbation introduces resonant forcing that generates secular terms (e.g., $t\sin t$). The Poincaré–Lindstedt method rescales time by $\tau=\omega t$, expanding $\omega=1+\epsilon\omega_{1}+\epsilon^{2}\omega_{2}+\cdots$ and $y(\tau)=\sum \epsilon^{n}y_{n}(\tau)$. Choosing $\omega_{n}$ to cancel resonant terms at each order yields uniformly periodic approximations and exposes frequency shifts induced by nonlinearity.

**Duffing Oscillator via Poincaré–Lindstedt**

Solve $y''+y+\epsilon y^{3}=0$, $y(0)=1$, $y'(0)=0$.

With $\tau=\omega t$, $\omega=1+\epsilon\omega_{1}+\epsilon^{2}\omega_{2}+\cdots$, and $y=\cos\tau+\epsilon y_{1}+\cdots$, the $O(\epsilon)$ equation produces resonance unless $\omega_{1}=3/8$. At $O(\epsilon^{2})$, eliminating resonance gives $\omega_{2}=-21/256$. Thus

$$
\omega=1+\frac{3}{8}\epsilon-\frac{21}{256}\epsilon^{2}+O(\epsilon^{3}),
$$

ensuring bounded periodic motion without secular growth.

The Poincaré–Lindstedt method reveals that nonlinearity shifts the frequency—the oscillator is no longer exactly periodic at the linear frequency. This frequency shift is a fundamental characteristic of nonlinear oscillators, observable in many physical systems.

## Method of Multiple Scales

Systems with slow modulation require independent times $t_{0}=t$, $t_{1}=\epsilon t$, etc., with $y(t;\epsilon)=Y(t_{0},t_{1},\dots;\epsilon)$. The derivative transforms as $d/dt=\partial_{t_{0}}+\epsilon\partial_{t_{1}}+\cdots$. At $O(1)$, $Y_{0}$ depends on $t_{1}$ only parametrically. The $O(\epsilon)$ equation introduces terms resonant with the homogeneous solution; enforcing solvability (orthogonality to the adjoint nullspace) yields amplitude equations governing slow evolution. This captures damping, detuning, and envelope dynamics missed by single-scale perturbation.

**Multiple Scales for a Damped Nonlinear Oscillator**

Solve $y''+y+\epsilon y^{3}+\epsilon y'=0$.

Introduce $t_{0}=t$, $t_{1}=\epsilon t$, and expand $y=Y_{0}(t_{0},t_{1})+\epsilon Y_{1}+\cdots$. The $O(1)$ solution is $Y_{0}=A(t_{1})e^{i t_{0}}+\bar{A}(t_{1})e^{-i t_{0}}$. The $O(\epsilon)$ equation yields the solvability condition

$$
2A'(t_{1})+(4\vert A \vert^{2}+1)A=0,
$$

showing slow amplitude decay due to damping and nonlinearity. This envelope equation captures modulation absent from naïve perturbation.

Multiple scales reveal that the amplitude and phase evolve on a slow timescale, separate from the rapid oscillations. The solvability condition (removing resonant terms) produces evolution equations for these slow variables, capturing phenomena like amplitude decay and frequency modulation that single-scale perturbation cannot see.

## Challenge Problems

The following problems synthesize concepts from regular perturbation, singular perturbations, Poincaré–Lindstedt method, and multiple scales.

### Challenge 1: Secular Terms and Poincaré–Lindstedt

Consider the weakly nonlinear oscillator $y'' + y + \epsilon y^2 = 0$ with $y(0) = 1$, $y'(0) = 0$. Show that naïve perturbation produces secular terms, then use the Poincaré–Lindstedt method to remove them. Compute the frequency shift to $O(\epsilon^2)$ and explain why the quadratic nonlinearity creates different behavior than the cubic nonlinearity in the Duffing oscillator.

*(Hint: The quadratic term creates a non-zero average forcing that shifts the equilibrium position. Use $\tau = \omega t$ with $\omega = 1 + \epsilon \omega_1 + \epsilon^2 \omega_2 + \cdots$ and expand $y(\tau) = y_0(\tau) + \epsilon y_1(\tau) + \cdots$.)*

<details>
<summary><strong>Expand Solution</strong></summary>

Naïve perturbation with $y(t) = y_0(t) + \epsilon y_1(t) + \cdots$ gives:

- $O(1)$: $y_0'' + y_0 = 0$ with $y_0(0) = 1$, $y_0'(0) = 0$, so $y_0(t) = \cos t$.
- $O(\epsilon)$: $y_1'' + y_1 = -y_0^2 = -\cos^2 t = -\frac{1}{2}(1 + \cos 2t)$.

The particular solution contains a constant term $-\frac{1}{2}$ (shifting the equilibrium) and a resonant term proportional to $t \sin t$ (secular growth).

Using Poincaré–Lindstedt with $\tau = \omega t$, $\omega = 1 + \epsilon \omega_1 + \cdots$, we have:

- $O(1)$: $y_0'' + y_0 = 0$, so $y_0(\tau) = \cos \tau$.
- $O(\epsilon)$: $y_1'' + y_1 = -y_0^2 + 2\omega_1 y_0'' = -\frac{1}{2}(1 + \cos 2\tau) - 2\omega_1 \cos \tau$.

To remove secular terms, we set the coefficient of $\cos \tau$ to zero: $-2\omega_1 = 0$, so $\omega_1 = 0$.

Continuing to $O(\epsilon^2)$ reveals that $\omega_2 \neq 0$, so the frequency shift appears at second order. The quadratic nonlinearity creates a DC shift but no first-order frequency shift, unlike cubic nonlinearity which shifts frequency at first order. This asymmetry reflects a fundamental difference: quadratic nonlinearities shift equilibrium positions but don't affect frequency at first order, while the symmetry of cubic nonlinearities allows them to modify the frequency directly. Secular terms must be removed systematically at each order of the expansion, with the frequency correction chosen precisely to cancel resonant forcing terms. The order at which frequency shifts appear depends critically on the symmetry of the nonlinearity, revealing how the algebraic structure of the perturbation determines the nature of the response.

</details>

### Challenge 2: Matched Asymptotic Expansions

Solve the singular perturbation problem $\epsilon y'' + (1 + x) y' + y = 0$ on $[0,1]$ with $y(0) = 0$ and $y(1) = 1$ using matched asymptotic expansions. Identify the boundary layer location, determine its thickness, construct both the outer and inner solutions, and match them to obtain a uniformly valid composite solution.

*(Hint: The reduced equation $(1+x)y' + y = 0$ loses one boundary condition. Determine which boundary cannot be satisfied by the outer solution, indicating where the boundary layer forms. Use a stretched coordinate to resolve the layer.)*

<details>
<summary><strong>Expand Solution</strong></summary>

The outer solution solves $(1+x)y' + y = 0$, giving $y_0(x) = C/(1+x)$. Applying $y(1) = 1$ gives $C = 2$, so $y_0(x) = 2/(1+x)$. This satisfies the right boundary but gives $y_0(0) = 2 \neq 0$, so a boundary layer forms at $x = 0$.

Using the stretched coordinate $\tau = x/\epsilon$, the inner equation becomes:

$$
Y'' + (1 + \epsilon \tau) Y' + \epsilon Y = 0.
$$

To leading order: $Y'' + Y' = 0$, with solution $Y(\tau) = A + B e^{-\tau}$. Applying $Y(0) = 0$ gives $A + B = 0$, so $Y(\tau) = A(1 - e^{-\tau})$.

Matching: as $\tau \to \infty$, $Y(\tau) \to A$. As $x \to 0$, $y_0(x) \to 2$. Therefore $A = 2$, and the inner solution is $Y(\tau) = 2(1 - e^{-\tau})$.

The composite solution is:

$$
y(x) = y_0(x) + Y(x/\epsilon) - (\text{matching limit}) = \frac{2}{1+x} + 2(1 - e^{-x/\epsilon}) - 2 = \frac{2}{1+x} - 2e^{-x/\epsilon}.
$$

This satisfies both boundary conditions and is uniformly valid. Boundary layers form precisely where the outer solution cannot satisfy boundary conditions: in this case, the reduced equation loses the boundary condition at $x=0$, forcing the solution to adjust rapidly in a thin region near that boundary. Matching connects the outer and inner solutions in their overlap region, where both expansions are valid and must agree. The composite solution is constructed by subtracting the common limit to avoid double-counting: the outer and inner solutions both approach the same value in the matching region, so we add them together and subtract this common value once to obtain a uniformly valid approximation that correctly represents the solution in both regions.

</details>

### Challenge 3: Multiple Scales for Van der Pol Oscillator

Apply the method of multiple scales to the Van der Pol oscillator $y'' - \epsilon(1 - y^2) y' + y = 0$ with initial conditions $y(0) = 1$, $y'(0) = 0$. Derive the slow-time evolution equation for the amplitude and show that the system evolves to a limit cycle. Compute the limit cycle amplitude and compare with the exact value $A = 2$.

*(Hint: Use $t_0 = t$, $t_1 = \epsilon t$ and expand $y = Y_0(t_0, t_1) + \epsilon Y_1 + \cdots$. The solvability condition at $O(\epsilon)$ gives the amplitude equation. Look for fixed points where $A' = 0$.)*

<details>
<summary><strong>Expand Solution</strong></summary>

Using multiple scales with $y(t) = Y_0(t_0, t_1) + \epsilon Y_1(t_0, t_1) + \cdots$ and $d/dt = \partial_{t_0} + \epsilon \partial_{t_1}$:

- $O(1)$: $\partial_{t_0}^2 Y_0 + Y_0 = 0$, so $Y_0 = A(t_1) e^{i t_0} + \bar{A}(t_1) e^{-i t_0}$.
- $O(\epsilon)$: $\partial_{t_0}^2 Y_1 + Y_1 = (1 - Y_0^2) \partial_{t_0} Y_0 - 2 \partial_{t_0} \partial_{t_1} Y_0$.

Substituting $Y_0$ and removing secular terms (coefficients of $e^{\pm i t_0}$) gives:

$$
2 A'(t_1) = A(t_1) (1 - \vert A(t_1) \vert^2).
$$

Writing $A(t_1) = \frac{1}{2} a(t_1) e^{i \phi(t_1)}$, the amplitude equation is:

$$
a' = \frac{a}{2} (1 - \frac{a^2}{4}).
$$

Fixed points occur at $a = 0$ (unstable) and $a = 2$ (stable). The limit cycle amplitude is $A = 2$, matching the exact result. Multiple scales reveal the slow evolution of the amplitude envelope: while the system oscillates rapidly at frequency $\omega \approx 1$, the amplitude evolves on the slow timescale $\epsilon t$, gradually approaching its asymptotic value. Limit cycles correspond to stable fixed points of the amplitude equation, where the slow-time derivative vanishes and the system settles into periodic motion. The method captures the transition from initial conditions to the attractor, showing how the system evolves from an arbitrary starting point toward the limit cycle, with the amplitude equation describing this transient behavior that single-scale perturbation cannot capture.

</details>

### Challenge 4: WKB as Singular Perturbation

Show that the WKB approximation for $\epsilon^2 y'' + Q(x) y = 0$ can be viewed as a singular perturbation problem. Identify the turning points (where $Q(x) = 0$) as locations where the perturbation becomes singular. Use matched asymptotic expansions near a turning point to recover the Airy function connection formulas.

*(Hint: Near a turning point $x_0$ where $Q(x_0) = 0$, expand $Q(x) \approx Q'(x_0)(x - x_0)$. Use the stretched coordinate $\xi = (x - x_0)/\epsilon^{2/3}$ to obtain the Airy equation. Match WKB solutions on both sides to the Airy solution.)*

<details>
<summary><strong>Expand Solution</strong></summary>

The WKB ansatz $y = A(x) \exp(i S(x)/\epsilon)$ with $S' = \pm \sqrt{Q(x)}$ breaks down where $Q(x) = 0$ (turning points), making this a singular perturbation problem.

Near a turning point at $x_0$ with $Q'(x_0) > 0$, expand $Q(x) \approx Q'(x_0)(x - x_0)$. Using the stretched coordinate $\xi = (x - x_0)/\epsilon^{2/3}$, the equation becomes:

$$
\frac{d^2 y}{d\xi^2} - Q'(x_0) \xi y = 0,
$$

which is the Airy equation (after rescaling).

The Airy function $\operatorname{Ai}(\xi)$ has the asymptotics:
- For $\xi \to +\infty$: $\operatorname{Ai}(\xi) \sim (2\sqrt{\pi} \xi^{1/4})^{-1} \exp(-2\xi^{3/2}/3)$ (exponentially decaying)
- For $\xi \to -\infty$: $\operatorname{Ai}(\xi) \sim (\sqrt{\pi} \vert \xi \vert^{1/4})^{-1} \sin(2\vert \xi \vert^{3/2}/3 + \pi/4)$ (oscillatory)

Matching these to the WKB solutions on either side provides the connection formulas, including the $\pi/4$ phase shift. Turning points are where the WKB approximation becomes singular: at these locations, $Q(x) = 0$ causes the phase integral $\int \sqrt{Q} \, dx$ to become undefined, breaking down the WKB ansatz. Local analysis near turning points reveals the global connection formulas: by solving the equation exactly in a small neighborhood and matching to WKB solutions on both sides, one obtains relations that connect solutions across the turning point, determining how oscillatory and exponential behaviors are linked. The method of matched asymptotic expansions unifies WKB and singular perturbation theory: both rely on constructing separate approximations in different regions and connecting them through matching, with the turning point serving as the boundary between regions where different asymptotic forms are valid.

</details>

Perturbation theory extends the explicit arsenal by allowing systematic expansion around solvable limits. However, its limitations are profound: regular perturbation diverges due to secular terms or finite convergence radii, singular perturbations require sophisticated matching techniques that break down for complex geometries, and multiple scales methods become intractable for systems with many interacting timescales. These restrictions motivate the renormalization group methods, Borel summation, and non-perturbative techniques of the next section, which provide frameworks for resumming divergent series and capturing exponentially small effects invisible to power series.

## References

* **Bender, C. M., & Orszag, S. A. (1978).** *Advanced Mathematical Methods for Scientists and Engineers*. McGraw–Hill.
* **Coddington, E. A., & Levinson, N. (1955).** *Theory of Ordinary Differential Equations*. McGraw–Hill.
* **Kevorkian, J., & Cole, J. D. (1981).** *Perturbation Methods in Applied Mathematics*. Springer.
* **Nayfeh, A. H. (1973).** *Perturbation Methods*. Wiley.
* **Van Dyke, M. (1964).** *Perturbation Methods in Fluid Mechanics*. Academic Press.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 1.5 Asymptotic Analysis]({{ '/diffequations/chapter-01/01-5-asymptotic-analysis/' | relative_url }})
- [Next Section: 1.7 Classical Renormalization & Non-Perturbative Methods]({{ '/diffequations/chapter-01/01-7-renormalization/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-01/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
