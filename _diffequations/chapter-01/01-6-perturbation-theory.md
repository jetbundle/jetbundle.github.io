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

# Section 1.6: Classical Perturbation Theory

## Introduction

We attempt to solve nonlinear problems by expanding around a linear limit. **Regular Perturbation** works for finite time, but **Secular Terms** (like $t \sin t$) destroy validity as $t \to \infty$. We introduce **Poincaré-Lindstedt** and **Multiple Scale Analysis** to remove these resonances. We encounter **Singular Perturbation** problems where the highest derivative is small, creating boundary layers that defy uniform convergence.
## Mathematical Content

### Regular Perturbation

For $y'=f(x,y,\epsilon)$ with $y(0)=\alpha$, assume

$$
y(x;\epsilon)\sim \sum_{n=0}^{\infty}\epsilon^{n}y_{n}(x).
$$

Substituting and expanding $f$ about $\epsilon=0$ yields the unperturbed system $y_{0}'=f(x,y_{0},0)$ followed by linear inhomogeneous equations for $y_{n}$ driven by $y_{0},\dots,y_{n-1}$. Analyticity of $f$ in $y$ and $\epsilon$ guarantees convergence for $\lvert\epsilon\rvert<R$ on finite intervals (Coddington & Levinson, 1955). The series fails when $\epsilon$ multiplies the highest derivative or when secular terms accumulate over long times, motivating singular and multiscale techniques.

### Singular Perturbations and Boundary Layers

When $\epsilon$ multiplies the highest derivative, e.g.

$$
\epsilon y''+a(x)y'+b(x)y=0,\qquad y(0)=A,\ y(1)=B,
$$

setting $\epsilon=0$ reduces the order and loses boundary conditions. The solution adjusts rapidly inside a boundary layer of thickness $\delta(\epsilon)$ near the affected boundary. Matched asymptotic expansions build an outer series (solving the reduced equation) and an inner series using a stretched coordinate $\tau=(x-x_{0})/\epsilon^{\alpha}$. Matching their overlap (Van Dyke, 1964) determines integration constants and produces a uniformly valid composite approximation (Bender & Orszag, 1978).

### Poincaré–Lindstedt Method

For weakly nonlinear oscillators, naïve perturbation introduces resonant forcing that generates secular terms (e.g., $t\sin t$). The Poincaré–Lindstedt method rescales time by $\tau=\omega t$, expanding $\omega=1+\epsilon\omega_{1}+\epsilon^{2}\omega_{2}+\cdots$ and $y(\tau)=\sum \epsilon^{n}y_{n}(\tau)$. Choosing $\omega_{n}$ to cancel resonant terms at each order yields uniformly periodic approximations and exposes frequency shifts induced by nonlinearity (Nayfeh, 1973).

### Method of Multiple Scales

Systems with slow modulation require independent times $t_{0}=t$, $t_{1}=\epsilon t$, etc., with $y(t;\epsilon)=Y(t_{0},t_{1},\dots;\epsilon)$. The derivative transforms as $d/dt=\partial_{t_{0}}+\epsilon\partial_{t_{1}}+\cdots$. At $O(1)$, $Y_{0}$ depends on $t_{1}$ only parametrically. The $O(\epsilon)$ equation introduces terms resonant with the homogeneous solution; enforcing solvability (orthogonality to the adjoint nullspace) yields amplitude equations governing slow evolution. This captures damping, detuning, and envelope dynamics missed by single-scale perturbation (Kevorkian & Cole, 1981).

## Complete Examples

### Example 1.6.1: Regular Perturbation of a Linear ODE

**Problem:** Solve $y'+y=\epsilon\sin x$, $y(0)=1$ to $O(\epsilon)$.

Let $y=y_{0}+\epsilon y_{1}+\cdots$. The $O(1)$ equation $y_{0}'+y_{0}=0$ gives $y_{0}=e^{-x}$. At $O(\epsilon)$, $y_{1}'+y_{1}=\sin x$ with $y_{1}(0)=0$ yields

$$
y_{1}(x)=\frac{1}{2}(\sin x-\cos x+e^{-x}).
$$

Thus $y\approx e^{-x}+\frac{\epsilon}{2}(\sin x-\cos x+e^{-x})$, matching the Taylor expansion of the exact solution.

### Example 1.6.2: Divergence in Regular Perturbation

**Problem:** For $y'=-y+\epsilon y^{2}$, $y(0)=1$, find the perturbation series.

Solutions satisfy $y_{n}(x)=3^{-n}(n+1)^{-1}e^{-(n+1)x}$. The series

$$
y(x;\epsilon)\sim \sum_{n=0}^{\infty}\frac{\epsilon^{n}}{3^{n}(n+1)}e^{-(n+1)x}
$$

has radius $|\epsilon|<3$, yet the exact solution $y=e^{-x}/[1-\frac{\epsilon}{3}(1-e^{-x})]$ is singular at $\epsilon=3/(1-e^{-x})$. The nearest pole in the complex $\epsilon$-plane controls convergence, illustrating asymptotic (non-convergent) behavior.

### Example 1.6.3: Linear Boundary Layer

**Problem:** Solve $\epsilon y''+2y'+y=0$ with $y(0)=0$, $y(1)=1$.

The outer solution $y_{0}=C e^{-x/2}$ fails to satisfy both boundaries. Introducing $\tau=(1-x)/\epsilon$, the inner equation becomes $Y''-2Y'=0$ with $Y=A+B e^{2\tau}$. Matching and applying $y(1)=1$ yield the composite approximation

$$
y(x;\epsilon)\approx e^{-x/2}+(1-e^{-1/2})e^{-2(1-x)/\epsilon},
$$

capturing the boundary layer near $x=1$.

### Example 1.6.4: Nonlinear Boundary Layer

**Problem:** Solve $\epsilon y''=y^{2}-1$, $y(0)=0$, $y(1)=2$.

The outer solution is $y_{0}=1$. Near $x=0$, $\tau=x/\sqrt{\epsilon}$ leads to $Y''=Y^{2}-1$ with heteroclinic solution $Y(\tau)=\tanh(\tau/\sqrt{2})$. Matching with $y_{0}$ produces the composite $y\approx \tanh(x/\sqrt{2\epsilon})$, which coincides with the exact solution.

### Example 1.6.5: Duffing Oscillator via Poincaré–Lindstedt

**Problem:** Solve $y''+y+\epsilon y^{3}=0$, $y(0)=1$, $y'(0)=0$.

With $\tau=\omega t$, $\omega=1+\epsilon\omega_{1}+\epsilon^{2}\omega_{2}+\cdots$, and $y=\cos\tau+\epsilon y_{1}+\cdots$, the $O(\epsilon)$ equation produces resonance unless $\omega_{1}=3/8$. At $O(\epsilon^{2})$, eliminating resonance gives $\omega_{2}=-21/256$. Thus

$$
\omega=1+\frac{3}{8}\epsilon-\frac{21}{256}\epsilon^{2}+O(\epsilon^{3}),
$$

ensuring bounded periodic motion without secular growth.

### Example 1.6.6: Multiple Scales for a Damped Nonlinear Oscillator

**Problem:** Solve $y''+y+\epsilon y^{3}+\epsilon y'=0$.

Introduce $t_{0}=t$, $t_{1}=\epsilon t$, and expand $y=Y_{0}(t_{0},t_{1})+\epsilon Y_{1}+\cdots$. The $O(1)$ solution is $Y_{0}=A(t_{1})e^{i t_{0}}+\bar{A}(t_{1})e^{-i t_{0}}$. The $O(\epsilon)$ equation yields the solvability condition

$$
2A'(t_{1})+(4|A|^{2}+1)A=0,
$$

showing slow amplitude decay due to damping and nonlinearity. This envelope equation captures modulation absent from naïve perturbation.

## References

* Bender, C. M., & Orszag, S. A. (1978). *Advanced Mathematical Methods for Scientists and Engineers*. McGraw–Hill.
* Coddington, E. A., & Levinson, N. (1955). *Theory of Ordinary Differential Equations*. McGraw–Hill.
* Kevorkian, J., & Cole, J. D. (1981). *Perturbation Methods in Applied Mathematics*. Springer.
* Nayfeh, A. H. (1973). *Perturbation Methods*. Wiley.
* Van Dyke, M. (1964). *Perturbation Methods in Fluid Mechanics*. Academic Press.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 1.5 Asymptotic Analysis]({{ '/diffequations/chapter-01/01-5-asymptotic-analysis/' | relative_url }})
- [Next Section: 1.7 Classical Renormalization & Non-Perturbative Methods]({{ '/diffequations/chapter-01/01-7-renormalization/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-01/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
