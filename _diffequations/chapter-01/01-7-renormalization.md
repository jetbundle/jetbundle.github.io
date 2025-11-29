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

> Divergent perturbation series encode non-perturbative physics in their Borel singularities—the factorial growth of coefficients is not a failure but a signal pointing to exponentially small effects invisible to power series.

## Introduction

The chapter concludes with a crisis: perturbation series often diverge factorially ($\sum n! x^n$). We introduce **Renormalization Group (RG)** techniques for ODEs to resum secular terms and **Borel Summation** to assign meaning to divergent series. We touch upon **Non-perturbative effects** (Instantons) that are invisible to power series.

## Divergent Series and Gevrey Classes

Formal perturbation series for differential equations typically diverge. An asymptotic expansion $f(x)\sim \sum a_{n}x^{n}$ (Poincaré sense) satisfies $\mid f(x)-\sum_{n=0}^{N}a_{n}x^{n}\mid =O(x^{N+1})$ as $x\to 0$. The coefficients often obey Gevrey-1 bounds $\mid a_{n}\mid \le C K^{n} n!$, implying factorial divergence. The optimal truncation index is $N_{\text{opt}}\approx 1/(K\mid x\mid)$, producing an exponentially small remainder $\sim \exp\left(-1/(K\mid x\mid)\right)$ that encodes non-perturbative effects invisible to any Taylor series.

> **Gevrey-1 Series and Optimal Truncation**

> Analyze $\sum_{n=0}^{\infty}(-1)^{n}n!x^{n}$.

> The ratio $\mid a_{n+1}x^{n+1}/(a_{n}x^{n})\mid =(n+1)\mid x\mid$ implies the least term occurs near $N_{\text{opt}}\approx 1/\mid x\mid$. Truncating at this index yields an error $O(e^{-1/\mid x\mid})$, the same order as the non-perturbative contribution absent from the series. The optimal truncation captures the best possible approximation from a divergent series.

Optimal truncation provides a systematic way to extract useful information from divergent series. The truncation error is exponentially small, matching the scale of non-perturbative effects.

> **Asymptotic Expansion of $\operatorname{erfc}(x)$**

> Using repeated integration by parts,

> $$
> \operatorname{erfc}(x)\sim \frac{e^{-x^{2}}}{x\sqrt{\pi}}\left(1-\frac{1}{2x^{2}}+\frac{3}{4x^{4}}-\frac{15}{8x^{6}}+\cdots\right),\qquad x\to\infty.
> $$

> Coefficients grow factorially, $a_{n}\sim (-1)^{n}(2n)!/(2^{2n}n!)$, exhibiting Gevrey-1 behavior and necessitating optimal truncation at $n\approx 2x^{2}$. The series diverges for any fixed $x$, but optimal truncation provides an excellent approximation.

Even simple functions produce divergent asymptotic series. The factorial growth is generic for asymptotic expansions, reflecting the essential singularity structure in the complex plane.

> **WKB Divergence**

> For $\epsilon^{2}y''+Q(x)y=0$, the WKB series $y\sim Q^{-1/4}\exp\left(\pm \epsilon^{-1}\int\sqrt{Q}\right)\sum_{n\ge 0}\epsilon^{n}S_{n}(x)$ has $S_{n}\sim n!$, driven by repeated differentiation. Optimal truncation yields errors $\sim e^{-1/\epsilon}$ corresponding to Stokes transitions. The divergence reflects the breakdown of the asymptotic expansion at turning points.

The WKB expansion diverges because it cannot capture the transition behavior near turning points. The exponentially small error matches the scale of tunneling effects that connect different regions.

## Borel Summation

Given $A(x)=\sum_{n=0}^{\infty}a_{n}x^{n}$ with Gevrey-1 growth, define the Borel transform

$$
\mathcal{B}A(t)=\sum_{n=0}^{\infty}\frac{a_{n}}{n!}t^{n},
$$

which converges near $t=0$. If $\mathcal{B}A$ admits analytic continuation along $[0,\infty)$ with suitable growth, the Laplace integral

$$
\mathcal{S}A(x)=\frac{1}{x}\int_{0}^{\infty}\mathcal{B}A(t)e^{-t/x}\,dt
$$

defines the Borel sum, recovering the original divergent series as an asymptotic expansion. Singularities of $\mathcal{B}A$ along the integration path lead to different lateral sums $\mathcal{S}^{\pm}$ (contours above/below the pole). Their difference is exponentially small, producing the Stokes phenomenon observed in Section 1.5.

> **Borel Sum of $\sum (-1)^{n}n! x^{n}$**

> The Borel transform $\mathcal{B}(t)=\sum(-t)^{n}/(n!)^{2}=I_{0}(2\sqrt{t})$ leads to

> $$
> \mathcal{S}(x)=\frac{1}{x}\int_{0}^{\infty}I_{0}(2\sqrt{t})e^{-t/x}\,dt=e,
> $$

> showing that a divergent series can be resummed to an elementary function. Borel summation assigns a unique value to the series, recovering the function it was trying to represent.

Borel summation provides a rigorous interpretation of divergent series. The Borel transform has better convergence properties, and its Laplace transform recovers the original function.

> **Airy Function and Stokes Jump**

> The Airy asymptotic series has a Borel transform with singularities on the positive axis. Lateral Borel sums differ by $\Delta \operatorname{Ai}(x)=\frac{i}{2\sqrt{\pi}x^{1/4}}e^{+\zeta}$, precisely the subdominant exponential that turns on across $\arg x=2\pi/3$, matching the Stokes phenomenon described in Section 1.5.

The Stokes jumps are encoded in the Borel plane singularities. Different lateral sums (integrating above or below the branch cut) produce different asymptotic representations, corresponding to different sectors in the complex plane.

## Renormalization Group for ODEs

Secular terms in perturbation theory reflect sensitivity to the initial time. Introducing an arbitrary renormalization scale $\tau$ and allowing integration constants to depend on $\tau$ yields $y(t,\tau)$ with the requirement $\partial y/\partial \tau=0$. This Renormalization Group (RG) equation produces flow equations for amplitudes and phases, summing secular terms to all orders and recovering multiple-scales envelopes without ad hoc assumptions.

> **RG Treatment of the Rayleigh Oscillator**

> For $y''+\epsilon \left(\frac{y'^2}{3}-1\right)y'+y=0$, naïve perturbation produces secular terms. Introducing a renormalization time $\tau$ and demanding $\partial y/\partial \tau=0$ yields amplitude and phase flows $dA/d\tau=-A^{2}/8$, $d\phi/d\tau=1/8$. Solving gives $A(t)=8/(t+8/A_{0})$, identical to the amplitude envelope obtained via multiple scales. The RG method automatically sums all secular terms.

The RG method provides a systematic way to remove secular terms by renormalizing the integration constants. The flow equations capture the slow evolution of amplitudes and phases.

> **Van der Pol Oscillator via RG**

> Applying RG to $y''-\epsilon(1-y^{2})y'+y=0$ produces $dA/dt=\tfrac{\epsilon}{2}(1-A^{2}/4)A$, showing convergence to the limit-cycle amplitude $A\to 2$ without assuming slow times a priori. The RG equations automatically capture the long-time attractor.

The RG flow equations reveal the asymptotic behavior: the limit cycle emerges as a fixed point of the amplitude flow. This provides a natural explanation for the approach to periodic motion.

## Instantons and Non-Perturbative Effects

Exponentially small effects such as $e^{-S/\epsilon}$ arise from classical trajectories (instantons) connecting distinct minima. Flat functions like $e^{-1/x^{2}}$ have zero Taylor coefficients yet dominate the optimal truncation error. Large-order perturbative coefficients are governed by the closest singularity in the Borel plane, equating divergence rates with instanton actions. Thus, asymptotic divergence encodes the missing non-perturbative physics.

> **Instanton in a Double-Well Potential**

> For $H=-\epsilon^{2}d^{2}/dx^{2}+(x^{2}-1)^{2}$, expanding about $x=-1$ yields a divergent series for the ground-state energy. The instanton trajectory $x(\tau)=\tanh(2\tau)$ has action $S=8\sqrt{2}/3$, producing a level splitting $\Delta E\sim e^{-S/\epsilon}$. Large-order perturbative coefficients grow as $(-1)^{n}n! (6)^{n/2}$, consistent with a Borel singularity at $t=S$. The instanton action determines the divergence rate.

Instantons are classical solutions in imaginary time that connect different vacua. Their action determines exponentially small effects like level splitting, which are invisible to perturbation theory.

> **Flat Function**

> The function $f(x)=e^{-1/x^{2}}$ for $x>0$ (and $0$ otherwise) has all derivatives zero at $x=0$, yet $f(x)$ is nonzero for $x>0$. No power series captures $f$; it represents a purely non-perturbative contribution comparable to instanton effects. This function is "invisible" to Taylor series but dominates asymptotically.

Flat functions demonstrate that non-perturbative effects can be completely invisible to power series. They represent a fundamental limitation of perturbative methods.

## Challenge Problems

The following problems synthesize concepts of Borel summation, renormalization group, and non-perturbative effects.

### Challenge 1: Borel Summation and Stokes Phenomenon

For the divergent series $A(x)=\sum_{n=0}^{\infty}(-1)^{n}n!x^{n}$, compute the Borel transform and show it has a pole at $t=1$. Demonstrate that the lateral Borel sums (integrating above and below the pole) differ by an exponentially small amount. Interpret this difference as a Stokes jump and relate it to the non-perturbative contribution.

*(Hint: The Borel transform is $\mathcal{B}(t)=1/(1+t)$, which has a pole at $t=-1$ when analytically continued. For $x>0$, the integration path passes through this pole.)*

<details>
<summary><strong>Expand Solution</strong></summary>

Actually, for $A(x)=\sum(-1)^{n}n!x^{n}$, the Borel transform is:

$$\mathcal{B}(t)=\sum_{n=0}^{\infty}\frac{(-1)^{n}n!}{n!}t^{n}=\sum_{n=0}^{\infty}(-t)^{n}=\frac{1}{1+t},$$

which has a pole at $t=-1$. For $x>0$, we integrate along the positive real axis, so we don't encounter this pole directly. However, when analytically continuing, the pole structure determines the different lateral sums.

The lateral sums differ by the residue contribution when the integration contour is deformed around the pole. This difference is exponentially small (of order $e^{-1/x}$) and represents the Stokes jump.

**Key Insights:**
- Borel singularities encode non-perturbative effects.
- Lateral sums differ by exponentially small amounts.
- The difference is the Stokes jump connecting different sectors.

</details>

### Challenge 2: RG Flow and Fixed Points

For a general weakly nonlinear oscillator $y''+y+\epsilon f(y,y')=0$, derive the RG equations for the amplitude and phase. Show that fixed points of the amplitude flow correspond to limit cycles, and analyze their stability. Apply this to the Van der Pol oscillator and recover the limit cycle amplitude.

<details>
<summary><strong>Expand Solution</strong></summary>

The unperturbed solution is $y=A\cos(t+\phi)$. Introducing a renormalization time and requiring $\partial y/\partial\tau=0$ produces flow equations:

$$\frac{dA}{d\tau}=F(A), \quad \frac{d\phi}{d\tau}=G(A),$$

where $F$ and $G$ are determined by the nonlinearity $f$. Fixed points of the amplitude flow ($F(A^{*})=0$) correspond to limit cycles.

For Van der Pol, $F(A)=\frac{\epsilon}{2}(1-A^{2}/4)A$, so fixed points are $A=0$ (unstable) and $A=2$ (stable). The limit cycle has amplitude 2, as found by other methods.

**Key Insights:**
- RG flow equations capture slow amplitude evolution.
- Fixed points correspond to attractors (limit cycles).
- Stability is determined by linearization around fixed points.

</details>

### Challenge 3: Instanton Calculus and Level Splitting

For the double-well potential $V(x)=(x^{2}-1)^{2}$, compute the instanton trajectory connecting $x=-1$ to $x=1$. Show that the instanton action is $S=\int_{-1}^{1}\sqrt{2V(x)}\,dx$, and demonstrate that the level splitting is $\Delta E\sim e^{-S/\epsilon}$. Compute the prefactor using the instanton determinant.

<details>
<summary><strong>Expand Solution</strong></summary>

The instanton satisfies the Euclidean equation of motion: $\epsilon^{2}\frac{d^{2}x}{d\tau^{2}}=V'(x)$. The solution connecting $x=-1$ to $x=1$ is $x(\tau)=\tanh(\tau/\sqrt{2})$ (up to scaling).

The action is:

$$S=\int_{-\infty}^{\infty}\left[\frac{1}{2}\left(\frac{dx}{d\tau}\right)^{2}+V(x)\right]d\tau=\int_{-1}^{1}\sqrt{2V(x)}\,dx=\frac{8\sqrt{2}}{3}.$$

The level splitting is determined by instanton effects: $\Delta E\sim e^{-S/\epsilon}$. Computing the prefactor requires evaluating the determinant of fluctuations around the instanton, which gives an additional factor of $\epsilon^{-1/2}$.

**Key Insights:**
- Instantons connect distinct classical minima.
- Their action determines exponentially small effects.
- The prefactor requires computation of fluctuation determinants.

</details>

### Challenge 4: Optimal Truncation and Beyond-All-Orders Effects

For the asymptotic series $\sum_{n=0}^{\infty}(-1)^{n}n!x^{n}$, show that optimal truncation at $N\approx 1/x$ gives an error of order $e^{-1/x}$. Demonstrate that this error is the same order as a non-perturbative contribution of the form $Ce^{-1/x}$ that is invisible to the power series. Compute the constant $C$ using Borel summation.

<details>
<summary><strong>Expand Solution</strong></summary>

Truncating at $N=\lfloor 1/x\rfloor$, the remainder is dominated by the next term, which is approximately $N!x^{N}\sim (1/x)!x^{1/x}$. Using Stirling's formula and optimizing gives an error $\sim e^{-1/x}$.

This error matches a non-perturbative contribution that is invisible to power series. Using Borel summation, we can compute the full function and extract this contribution. For the series $\sum(-1)^{n}n!x^{n}$, Borel summation gives a result that differs from the truncated series by an exponentially small amount, which is the non-perturbative contribution.

**Key Insights:**
- Optimal truncation error matches non-perturbative effects.
- Borel summation reveals the full function structure.
- Exponentially small effects are encoded in the divergence.

</details>

The chapter concludes by confronting the fundamental limitations of perturbation theory: series diverge factorially, secular terms accumulate over long times, and exponentially small effects are invisible to all orders. However, these "failures" are not bugs but features—they encode non-perturbative physics in their divergence structure. Borel summation and renormalization group methods provide systematic ways to extract this information, but they require understanding the analytic structure in the complex plane.

The divergence of perturbation series and the existence of non-perturbative effects demonstrate that nonlinear problems cannot be solved by power series alone. To understand the full structure of solutions, we must turn to topological methods (instanton calculus), analytic continuation (Borel summation), and the functional-analytic framework of Chapter 2, which provides the rigorous foundations for these heuristic techniques.

## References

* **Hardy, G. H. (1949).** *Divergent Series*. Oxford University Press.
* **Olver, F. W. J., Lozier, D. W., Boisvert, R. F., & Clark, C. W. (2010).** *NIST Handbook of Mathematical Functions*. Cambridge University Press.
* **Olver, P. J. (1995).** *Equivalence, Invariants, and Symmetry*. Cambridge University Press.
* **Whittaker, E. T., & Watson, G. N. (1927).** *A Course of Modern Analysis*. Cambridge University Press.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 1.6 Classical Perturbation Theory]({{ '/diffequations/chapter-01/01-6-perturbation-theory/' | relative_url }})
- [Next Section: 2.1 Distributions & Test Functions]({{ '/diffequations/chapter-02/02-1-distributions/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-01/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})