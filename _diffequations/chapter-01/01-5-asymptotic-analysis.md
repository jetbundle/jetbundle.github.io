---
layout: textbook
title: "Section 1.5: Asymptotic Analysis"
description: "Laplace's method, stationary phase, WKB approximation"
permalink: /diffequations/chapter-01/01-5-asymptotic-analysis/
order: 1.5
chapter: 1
section: 5
nav_order: 1.5
is_chapter_index: false
parent_chapter: 1
parent_section: null
---

# Section 1.5: Asymptotic Analysis

## Introduction

Acknowledging that exact solutions are rare, we turn to approximation in limits. **Laplace's Method** and **Stationary Phase** reveal that integrals are dominated by critical points. The **WKB Approximation** connects wave mechanics to classical ray trajectories. This module emphasizes "local truth"—accurate behavior at $\infty$ or $0$—while exposing the lack of global connection formulas, necessitating a topological understanding of the Stokes phenomenon.
## Mathematical Content

### Laplace’s Method: Dominance of Critical Points

For integrals with a large parameter,

$$
I(M)=\int_{a}^{b}g(x)e^{M h(x)}\,dx,\qquad M\to\infty,
$$

the main contribution arises near the global maximum of $h$. If $h$ has a unique interior maximum at $x_{0}$ with $h''(x_{0})<0$, Taylor expansion gives

$$
I(M)\sim g(x_{0})e^{M h(x_{0})}\sqrt{\frac{2\pi}{M\left|h''(x_{0})\right|}}.
$$

When the maximum occurs at an endpoint with $h'(a)\neq 0$, the scaling changes to $I(M)\sim g(a)e^{M h(a)}/(M\lvert h'(a)\rvert)$, illustrating the discontinuous dependence on critical-point geometry (Whittaker & Watson, 1927).

### Method of Stationary Phase

For oscillatory integrals

$$
I(M)=\int_{-\infty}^{\infty}g(x)e^{i M h(x)}\,dx,
$$

rapid oscillations cancel except near stationary points where $h'(x_{0})=0$. Expanding $h$ quadratically yields

$$
I(M)\sim g(x_{0})e^{i M h(x_{0})}\sqrt{\frac{2\pi}{M\left|h''(x_{0})\right|}}e^{i\frac{\pi}{4}\operatorname{sgn}(h''(x_{0}))},
$$

introducing the Maslov phase shift $\pi/4$ that later reappears in semiclassical quantization (Stein & Shakarchi, 2003).

### WKB Approximation

For $\epsilon^{2}y''+Q(x)y=0$ with $\epsilon\to 0$, seek $y=\exp\left(\epsilon^{-1}\sum_{n=0}^{\infty}\epsilon^{n}S_{n}(x)\right)$. The leading terms satisfy

$$
(S_{0}')^{2}+Q(x)=0,\qquad 2S_{0}'S_{1}'+S_{0}''=0,
$$

giving

$$
y(x)\sim \frac{A}{Q(x)^{1/4}}\exp\left(\pm\frac{i}{\epsilon}\int^{x}\sqrt{Q(t)}\,dt\right).
$$

Oscillatory behavior occurs where $Q>0$, exponential where $Q<0$. Near turning points $Q(x_{0})=0$, WKB fails and must be matched to Airy-function solutions to obtain connection formulas (Olver, 2010).

### Stokes Phenomenon

Asymptotic expansions like

$$
y(z)\sim e^{\lambda z}\sum_{n=0}^{\infty}\frac{a_{n}}{z^{n}}
$$

are sectorial: they hold only within wedges bounded by Stokes lines where $\Re(\lambda z)$ is constant. Crossing a Stokes line activates subdominant exponentials with discontinuous multipliers (often $\pm i$). Borel summation interprets the divergent series in each sector and glues them using these jumps, foreshadowing resurgence theory.

## Connections to Chapter Narrative

Asymptotics converts intractable integrals and differential equations into local expansions controlled by critical points and turning points. The resulting sectorial truths and Stokes jumps expose the topological constraints governing analytic continuation, anticipating the microlocal and resurgent frameworks of later chapters.

## Complete Examples

### Example 1.5.1: Endpoint Laplace Method

**Problem:** Estimate $I(M)=\int_{0}^{1}e^{M(\ln x - x)}\,dx$ as $M\to\infty$.

The phase $h(x)=\ln x - x$ attains its maximum at $x=1$, an endpoint with $h'(1)=0$ and $h''(1)=-1$. Setting $x=1-t$ yields $h(1-t)\approx -t-\tfrac{t^{2}}{2}$, so

$$
I(M)\approx \int_{0}^{\infty}e^{-M t-M t^{2}/2}\,dt\sim \frac{1}{M}.
$$

This matches the asymptotic of the exponential integral $E_{1}(M)$.

### Example 1.5.2: Partition Function via Laplace Method

**Problem:** Evaluate $Z(\beta)=\int_{-\infty}^{\infty}e^{-\beta (x^{4}-2x^{2})}\,dx$ for $\beta\to\infty$.

The potential $V(x)=x^{4}-2x^{2}$ has minima at $x=\pm 1$ with $V''(\pm 1)=8$. Each contributes

$$
Z(\beta)\sim 2 e^{\beta}\sqrt{\frac{2\pi}{\beta \cdot 8}}=e^{\beta}\sqrt{\frac{\pi}{2\beta}}.
$$

The free energy $F=-(1/\beta)\ln Z$ approaches $-1+\tfrac{1}{2\beta}\ln(\pi/2\beta)$, revealing the ground-state energy plus thermal corrections.

### Example 1.5.3: Multiple Critical Points

**Problem:** Analyze $I(M)=\int_{0}^{2\pi}e^{M\cos^{3}\theta}\,d\theta$.

Critical points at $\theta=0,\pi$ give quadratic contributions $\sim e^{M}\sqrt{2\pi/(3M)}$ and $e^{-M}\sqrt{2\pi/(3M)}$ (negligible). Degenerate points at $\theta=\pi/2,3\pi/2$ produce cubic scaling $\sim 0.838\,M^{-1/3}$. Thus

$$
I(M)\sim e^{M}\sqrt{\frac{2\pi}{3M}}+0.838\,M^{-1/3}+\cdots,
$$

illustrating how different critical-point types set distinct powers of $M$.

### Example 1.5.4: Stationary Phase Fresnel Integral

**Problem:** Estimate $I(M)=\int_{0}^{\infty}e^{i M x^{2}}\,dx$.

The stationary point at $x=0$ (an endpoint) yields

$$
I(M)\sim \tfrac{1}{2}\sqrt{\frac{\pi}{M}}e^{i\pi/4},
$$

matching the exact Fresnel integral and exhibiting the $\pi/4$ phase.

### Example 1.5.5: Wave Diffraction

**Problem:** In Kirchhoff diffraction, $U(P)=\frac{1}{i\lambda}\iint_{S}\frac{e^{ik r}}{r}\cos\theta\,dS$ with $k\to\infty$.

Stationary phase at the specular point $(r=r_{0})$ gives $U(P)\sim \frac{A}{\sqrt{k}}e^{ik r_{0}}e^{i\pi/4}$, explaining the $k^{-1/2}$ decay and phase shift of Fresnel diffraction fringes.

### Example 1.5.6: Coherent vs. Incoherent Stationary Points

**Problem:** Evaluate $I(M)=\int_{0}^{2\pi}e^{iM(\cos\theta +0.1\sin 2\theta)}\,d\theta$.

Two stationary points contribute amplitudes $I_{1,2}\sim (2\pi/M)^{1/2}e^{iM h(\theta_{1,2})\pm i\pi/4}$. The relative phase $\Delta\phi=M(h(\theta_{1})-h(\theta_{2}))$ determines interference: if $\Delta\phi\ll 2\pi$, the contributions add coherently; if $\Delta\phi\gg 2\pi$, intensities add incoherently.

### Example 1.5.7: WKB for the Harmonic Oscillator

**Problem:** Solve $\epsilon^{2}y''+(1-x^{2})y=0$ via WKB.

The action integral $\int_{-1}^{1}\sqrt{1-x^{2}}\,dx=\pi/2$ leads to the Bohr–Sommerfeld rule $(n+\tfrac{1}{2})\pi\epsilon=\pi/2$, giving energy levels $E_{n}=(n+\tfrac{1}{2})\epsilon$. The WKB wavefunction in $|x|<1$ is

$$
y(x)\sim \frac{1}{(1-x^{2})^{1/4}}\cos\left(\frac{1}{\epsilon}\int^{x}\sqrt{1-t^{2}}\,dt - \frac{\pi}{4}\right).
$$

### Example 1.5.8: Quantum Tunneling via WKB

**Problem:** Estimate tunneling in $V(x)=x^{4}-2x^{2}$.

In the forbidden region $|x|>1$, the WKB solution is $y\sim |Q|^{-1/4}\exp\left(-\epsilon^{-1}\int_{1}^{x}\sqrt{|Q|}\,dt\right)$. The splitting of nearly degenerate states is $\Delta E\sim e^{-2S/\epsilon}$ where $S=\int_{1}^{\infty}\sqrt{x^{4}-2x^{2}-1}\,dx\approx 1.44$.

### Example 1.5.9: Airy Turning-Point Matching

**Problem:** For $Q(x)=x$, match WKB solutions across $x=0$.

The Airy equation $y''-xy=0$ has asymptotics

$$
\operatorname{Ai}(x)\sim \frac{1}{2\sqrt{\pi}x^{1/4}}e^{-\frac{2}{3}x^{3/2}},\quad x\to+\infty,
$$

and

$$
\operatorname{Ai}(x)\sim \frac{1}{\sqrt{\pi}|x|^{1/4}}\sin\left(\frac{2}{3}|x|^{3/2}+\frac{\pi}{4}\right),\quad x\to -\infty.
$$

Matching these yields the $\pi/4$ phase shift in the oscillatory region.

### Example 1.5.10: Stokes Lines for Airy Function

**Problem:** Track $\operatorname{Ai}(z)$ across the complex plane.

Stokes lines occur at $\arg z=\pm\pi/3,\pi$. On $0<\arg z<2\pi/3$, only $e^{-\zeta}$ appears; crossing $\arg z=2\pi/3$ activates the subdominant $e^{+\zeta}$ with multiplier $i$. This discontinuity encodes the global analytic structure.

### Example 1.5.11: Quantum Barrier Penetration and Stokes Jumps

**Problem:** In alpha decay, analytic continuation around a turning point causes the transmission coefficient to jump discretely.

WKB solutions in the complex $r$-plane pick up Stokes multipliers when circling the barrier, quantizing decay rates and connecting asymptotic analysis to observable half-lives.

### Example 1.5.12: Borel Summation of a Divergent Series

**Problem:** Sum $y(z)\sim e^{\lambda z}\sum_{n=0}^{\infty}\frac{(-1)^{n}n!}{z^{n}}$.

The Borel transform $B(t)=\sum (-1)^{n}t^{n}/(n!)^{2}=I_{0}(2\sqrt{t})$. The Laplace integral

$$
S(z)=\int_{0}^{\infty}e^{-t}I_{0}(2\sqrt{t})e^{\lambda t/z}\,dt
$$

defines analytic continuations in different sectors. Choosing integration contours above or below the positive axis reproduces the Stokes jumps.

## References

* Olver, F. W. J., Lozier, D. W., Boisvert, R. F., & Clark, C. W. (2010). *NIST Handbook of Mathematical Functions*. Cambridge University Press.
* Stein, E. M., & Shakarchi, R. (2003). *Fourier Analysis: An Introduction*. Princeton University Press.
* Whittaker, E. T., & Watson, G. N. (1927). *A Course of Modern Analysis*. Cambridge University Press.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 1.4 Classical Linear Partial Differential Equations]({{ '/diffequations/chapter-01/01-4-linear-pde/' | relative_url }})
- [Next Section: 1.6 Classical Perturbation Theory]({{ '/diffequations/chapter-01/01-6-perturbation-theory/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-01/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
