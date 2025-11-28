---
layout: textbook
title: "Section 1.7: Classical Renormalization & Non-Perturbative Methods"
description: "Borel summation, renormalization group, instantons"
permalink: /diffequations/chapter-01/01-7-renormalization/
order: 1.7
chapter: 1
section: 7
nav_order: 1.7
is_chapter_index: false
parent_chapter: 1
parent_section: null
---

# Section 1.7: Classical Renormalization & Non-Perturbative Methods

## Introduction

The chapter concludes with a crisis: perturbation series often diverge factorially ($\sum n! x^n$). We introduce **Renormalization Group (RG)** techniques for ODEs to resum secular terms and **Borel Summation** to assign meaning to divergent series. We touch upon **Non-perturbative effects** (Instantons) that are invisible to power series.
## Mathematical Content

### Divergent Series and Gevrey Classes

Formal perturbation series for differential equations typically diverge. An asymptotic expansion $f(x)\sim \sum a_{n}x^{n}$ (Poincaré sense) satisfies $\left|f(x)-\sum_{n=0}^{N}a_{n}x^{n}\right|=O(x^{N+1})$ as $x\to 0$. The coefficients often obey Gevrey-1 bounds $\lvert a_{n}\rvert\le C K^{n} n!$, implying factorial divergence. The optimal truncation index is $N_{\text{opt}}\approx 1/(K|x|)$, producing an exponentially small remainder $\sim \exp\left(-1/(K|x|)\right)$ that encodes non-perturbative effects invisible to any Taylor series.

### Borel Summation

Given $A(x)=\sum_{n=0}^{\infty}a_{n}x^{n}$ with Gevrey-1 growth, define the Borel transform

$$
\mathcal{B}A(t)=\sum_{n=0}^{\infty}\frac{a_{n}}{n!}t^{n},
$$

which converges near $t=0$. If $\mathcal{B}A$ admits analytic continuation along $[0,\infty)$ with suitable growth, the Laplace integral

$$
\mathcal{S}A(x)=\frac{1}{x}\int_{0}^{\infty}\mathcal{B}A(t)e^{-t/x}\,dt
$$

defines the Borel sum, recovering the original divergent series as an asymptotic expansion. Singularities of $\mathcal{B}A$ along the integration path lead to different lateral sums $\mathcal{S}^{\pm}$ (contours above/below the pole). Their difference is exponentially small, producing the Stokes phenomenon observed in Section 1.5.

### Renormalization Group for ODEs

Secular terms in perturbation theory reflect sensitivity to the initial time. Introducing an arbitrary renormalization scale $\tau$ and allowing integration constants to depend on $\tau$ yields $y(t,\tau)$ with the requirement $\partial y/\partial \tau=0$. This Renormalization Group (RG) equation produces flow equations for amplitudes and phases, summing secular terms to all orders and recovering multiple-scales envelopes without ad hoc assumptions (Olver, 1995).

### Instantons and Non-Perturbative Effects

Exponentially small effects such as $e^{-S/\epsilon}$ arise from classical trajectories (instantons) connecting distinct minima. Flat functions like $e^{-1/x^{2}}$ have zero Taylor coefficients yet dominate the optimal truncation error. Large-order perturbative coefficients are governed by the closest singularity in the Borel plane, equating divergence rates with instanton actions. Thus, asymptotic divergence encodes the missing non-perturbative physics.

## Complete Examples

### Example 1.7.1: Gevrey-1 Series and Optimal Truncation

**Problem:** Analyze $\sum_{n=0}^{\infty}(-1)^{n}n!x^{n}$.

The ratio $\lvert a_{n+1}x^{n+1}/(a_{n}x^{n})\rvert=(n+1)\lvert x\rvert$ implies the least term occurs near $N_{\text{opt}}\approx 1/|x|$. Truncating at this index yields an error $O(e^{-1/|x|})$, the same order as the non-perturbative contribution absent from the series.

### Example 1.7.2: Asymptotic Expansion of $\operatorname{erfc}(x)$

Using repeated integration by parts,

$$
\operatorname{erfc}(x)\sim \frac{e^{-x^{2}}}{x\sqrt{\pi}}\left(1-\frac{1}{2x^{2}}+\frac{3}{4x^{4}}-\frac{15}{8x^{6}}+\cdots\right),\qquad x\to\infty.
$$

Coefficients grow factorially, $a_{n}\sim (-1)^{n}(2n)!/(2^{2n}n!)$, exhibiting Gevrey-1 behavior and necessitating optimal truncation at $n\approx 2x^{2}$.

### Example 1.7.3: WKB Divergence

For $\epsilon^{2}y''+Q(x)y=0$, the WKB series $y\sim Q^{-1/4}\exp\left(\pm \epsilon^{-1}\int\sqrt{Q}\right)\sum_{n\ge 0}\epsilon^{n}S_{n}(x)$ has $S_{n}\sim n!$, driven by repeated differentiation. Optimal truncation yields errors $\sim e^{-1/\epsilon}$ corresponding to Stokes transitions (Section 1.5).

### Example 1.7.4: Borel Sum of $\sum (-1)^{n}n! x^{n}$

The Borel transform $\mathcal{B}(t)=\sum(-t)^{n}/(n!)^{2}=I_{0}(2\sqrt{t})$ leads to

$$
\mathcal{S}(x)=\frac{1}{x}\int_{0}^{\infty}I_{0}(2\sqrt{t})e^{-t/x}\,dt=e,
$$

showing that a divergent series can be resummed to an elementary function.

### Example 1.7.5: Airy Function and Stokes Jump

The Airy asymptotic series has a Borel transform with singularities on the positive axis. Lateral Borel sums differ by $\Delta \operatorname{Ai}(x)=\frac{i}{2\sqrt{\pi}x^{1/4}}e^{+\zeta}$, precisely the subdominant exponential that turns on across $\arg x=2\pi/3$, matching the Stokes phenomenon described in Section 1.5.

### Example 1.7.6: RG Treatment of the Rayleigh Oscillator

For $y''+\epsilon \left(\frac{y'^2}{3}-1\right)y'+y=0$, naïve perturbation produces secular terms. Introducing a renormalization time $\tau$ and demanding $\partial y/\partial \tau=0$ yields amplitude and phase flows $dA/d\tau=-A^{2}/8$, $d\phi/d\tau=1/8$. Solving gives $A(t)=8/(t+8/A_{0})$, identical to the amplitude envelope obtained via multiple scales.

### Example 1.7.7: Van der Pol Oscillator via RG

Applying RG to $y''-\epsilon(1-y^{2})y'+y=0$ produces $dA/dt=\tfrac{\epsilon}{2}(1-A^{2}/4)A$, showing convergence to the limit-cycle amplitude $A\to 2$ without assuming slow times a priori.

### Example 1.7.8: Instanton in a Double-Well Potential

For $H=-\epsilon^{2}d^{2}/dx^{2}+(x^{2}-1)^{2}$, expanding about $x=-1$ yields a divergent series for the ground-state energy. The instanton trajectory $x(\tau)=\tanh(2\tau)$ has action $S=8\sqrt{2}/3$, producing a level splitting $\Delta E\sim e^{-S/\epsilon}$. Large-order perturbative coefficients grow as $(-1)^{n}n! (6)^{n/2}$, consistent with a Borel singularity at $t=S$.

### Example 1.7.9: Flat Function

The function $f(x)=e^{-1/x^{2}}$ for $x>0$ (and $0$ otherwise) has all derivatives zero at $x=0$, yet $f(x)$ is nonzero for $x>0$. No power series captures $f$; it represents a purely non-perturbative contribution comparable to instanton effects.

## References

* Hardy, G. H. (1949). *Divergent Series*. Oxford University Press.
* Olver, F. W. J., et al. (2010). *NIST Handbook of Mathematical Functions*. Cambridge University Press.
* Olver, P. J. (1995). *Equivalence, Invariants, and Symmetry*. Cambridge University Press.
* Whittaker, E. T., & Watson, G. N. (1927). *A Course of Modern Analysis*. Cambridge University Press.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 1.6 Classical Perturbation Theory]({{ '/diffequations/chapter-01/01-6-perturbation-theory/' | relative_url }})
- [Next Section: 2.1 Distributions & Test Functions]({{ '/diffequations/chapter-02/02-1-distributions/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-01/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
