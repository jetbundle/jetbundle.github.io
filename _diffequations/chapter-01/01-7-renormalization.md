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

> Divergent series encode non-perturbative physics; Borel summation and renormalization reveal the hidden structure obscured by perturbation theory's failures.

## Introduction

The chapter concludes with a crisis: perturbation series often diverge factorially ($\sum n! x^n$). We introduce **Renormalization Group (RG)** techniques for ODEs to resum secular terms and **Borel Summation** to assign meaning to divergent series. We touch upon **Non-perturbative effects** (Instantons) that are invisible to power series.

## Divergent Series and Gevrey Classes

Formal perturbation series for differential equations typically diverge. An asymptotic expansion $f(x)\sim \sum a_{n}x^{n}$ (Poincaré sense) satisfies $\mid f(x)-\sum_{n=0}^{N}a_{n}x^{n}\mid=O(x^{N+1})$ as $x\to 0$. The coefficients often obey Gevrey-1 bounds $\mid a_{n}\mid\le C K^{n} n!$, implying factorial divergence. The optimal truncation index is $N_{\text{opt}}\approx 1/(K\mid x\mid)$, producing an exponentially small remainder $\sim \exp\left(-1/(K\mid x\mid)\right)$ that encodes non-perturbative effects invisible to any Taylor series.

> **Gevrey-1 Series and Optimal Truncation**

> Analyze $\sum_{n=0}^{\infty}(-1)^{n}n!x^{n}$.

> The ratio $\mid a_{n+1}x^{n+1}/(a_{n}x^{n})\mid=(n+1)\mid x\mid$ implies the least term occurs near $N_{\text{opt}}\approx 1/\mid x\mid$. Truncating at this index yields an error $O(e^{-1/\mid x\mid})$, the same order as the non-perturbative contribution absent from the series.

Optimal truncation of divergent series produces exponentially small errors, revealing that the best approximation is not obtained by summing all terms but by stopping at the term of minimum magnitude. This exponentially small remainder is precisely the scale of non-perturbative effects.

> **Asymptotic Expansion of $\operatorname{erfc}(x)$**

> Using repeated integration by parts,

> $$
> \operatorname{erfc}(x)\sim \frac{e^{-x^{2}}}{x\sqrt{\pi}}\left(1-\frac{1}{2x^{2}}+\frac{3}{4x^{4}}-\frac{15}{8x^{6}}+\cdots\right),\qquad x\to\infty.
> $$

> Coefficients grow factorially, $a_{n}\sim (-1)^{n}(2n)!/(2^{2n}n!)$, exhibiting Gevrey-1 behavior and necessitating optimal truncation at $n\approx 2x^{2}$.

The complementary error function's asymptotic expansion demonstrates typical factorial growth. Even though the series diverges for all $x$, optimal truncation provides excellent approximations for large $x$, with the error exponentially small in $x$.

> **WKB Divergence**

> For $\epsilon^{2}y''+Q(x)y=0$, the WKB series $y\sim Q^{-1/4}\exp\left(\pm \epsilon^{-1}\int\sqrt{Q}\right)\sum_{n\ge 0}\epsilon^{n}S_{n}(x)$ has $S_{n}\sim n!$, driven by repeated differentiation. Optimal truncation yields errors $\sim e^{-1/\epsilon}$ corresponding to Stokes transitions (Section 1.5).

WKB expansions are also divergent, with the divergence driven by the proliferation of terms from repeated differentiation. The optimal truncation error is exponentially small, matching the scale of Stokes transitions and non-perturbative effects.

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

> showing that a divergent series can be resummed to an elementary function.

Borel summation converts a divergent series into a convergent integral representation. Even though the original series diverges for all $x$, the Borel sum provides an analytic function that has the series as its asymptotic expansion.

> **Airy Function and Stokes Jump**

> The Airy asymptotic series has a Borel transform with singularities on the positive axis. Lateral Borel sums differ by $\Delta \operatorname{Ai}(x)=\frac{i}{2\sqrt{\pi}x^{1/4}}e^{+\zeta}$, precisely the subdominant exponential that turns on across $\arg x=2\pi/3$, matching the Stokes phenomenon described in Section 1.5.

The Stokes phenomenon has a natural interpretation in the Borel plane: singularities of the Borel transform correspond to Stokes lines. The lateral Borel sums differ by exponentially small amounts, precisely the subdominant exponentials that switch on across Stokes lines.

## Renormalization Group for ODEs

Secular terms in perturbation theory reflect sensitivity to the initial time. Introducing an arbitrary renormalization scale $\tau$ and allowing integration constants to depend on $\tau$ yields $y(t,\tau)$ with the requirement $\partial y/\partial \tau=0$. This Renormalization Group (RG) equation produces flow equations for amplitudes and phases, summing secular terms to all orders and recovering multiple-scales envelopes without ad hoc assumptions (Olver, 1995).

> **RG Treatment of the Rayleigh Oscillator**

> For $y''+\epsilon \left(\frac{y'^2}{3}-1\right)y'+y=0$, naïve perturbation produces secular terms. Introducing a renormalization time $\tau$ and demanding $\partial y/\partial \tau=0$ yields amplitude and phase flows $dA/d\tau=-A^{2}/8$, $d\phi/d\tau=1/8$. Solving gives $A(t)=8/(t+8/A_{0})$, identical to the amplitude envelope obtained via multiple scales.

The renormalization group method eliminates secular terms by recognizing that the solution should be independent of the arbitrary renormalization scale. This produces flow equations for the slow variables (amplitude, phase) that automatically resum the secular terms.

> **Van der Pol Oscillator via RG**

> Applying RG to $y''-\epsilon(1-y^{2})y'+y=0$ produces $dA/dt=\tfrac{\epsilon}{2}(1-A^{2}/4)A$, showing convergence to the limit-cycle amplitude $A\to 2$ without assuming slow times a priori.

The RG method naturally produces the amplitude equation governing the slow evolution toward the limit cycle. Unlike multiple scales, no ad hoc separation of time scales is needed; it emerges from the RG condition.

## Instantons and Non-Perturbative Effects

Exponentially small effects such as $e^{-S/\epsilon}$ arise from classical trajectories (instantons) connecting distinct minima. Flat functions like $e^{-1/x^{2}}$ have zero Taylor coefficients yet dominate the optimal truncation error. Large-order perturbative coefficients are governed by the closest singularity in the Borel plane, equating divergence rates with instanton actions. Thus, asymptotic divergence encodes the missing non-perturbative physics.

> **Instanton in a Double-Well Potential**

> For $H=-\epsilon^{2}d^{2}/dx^{2}+(x^{2}-1)^{2}$, expanding about $x=-1$ yields a divergent series for the ground-state energy. The instanton trajectory $x(\tau)=\tanh(2\tau)$ has action $S=8\sqrt{2}/3$, producing a level splitting $\Delta E\sim e^{-S/\epsilon}$. Large-order perturbative coefficients grow as $(-1)^{n}n! (6)^{n/2}$, consistent with a Borel singularity at $t=S$.

Instantons are classical solutions in Euclidean time that connect different vacua. Their action determines the exponential suppression of tunneling effects. The large-order behavior of perturbation theory is controlled by the instanton action through the Borel plane singularity structure.

> **Flat Function**

> The function $f(x)=e^{-1/x^{2}}$ for $x>0$ (and $0$ otherwise) has all derivatives zero at $x=0$, yet $f(x)$ is nonzero for $x>0$. No power series captures $f$; it represents a purely non-perturbative contribution comparable to instanton effects.

Flat functions demonstrate that some effects are completely invisible to perturbation theory—their Taylor series vanish identically, yet the function is nonzero. Such functions are the extreme case of non-perturbative effects and highlight the limitations of power series expansions.

## Challenge Problems

The following problems synthesize concepts from divergent series, Borel summation, renormalization group methods, and instantons.

### Challenge 1: Borel Summation and Stokes Phenomenon

For the divergent series

$$
A(x) = \sum_{n=0}^{\infty} (-1)^n n! x^{n+1},
$$

show that the Borel transform converges to

$$
\mathcal{B}A(t) = \frac{t}{1+t}, \quad |t| < 1.
$$

The Borel sum is

$$
\mathcal{S}A(x) = \int_0^{\infty} \frac{t e^{-t/x}}{1+t} \, dt.
$$

Show that this integral defines different functions in different sectors of the complex $x$-plane, and compute the Stokes jump across the negative real axis. Relate this to the asymptotic behavior of the series.

<details>
<summary><strong>Expand Solution</strong></summary>

The Borel transform is:

$$
\mathcal{B}A(t) = \sum_{n=0}^{\infty} \frac{(-1)^n n!}{n!} t^n = \sum_{n=0}^{\infty} (-1)^n t^n = \frac{1}{1+t}, \quad |t| < 1.
$$

Wait, the series is $\sum (-1)^n n! x^{n+1}$, so:

$$
\mathcal{B}A(t) = \sum_{n=0}^{\infty} \frac{(-1)^n n!}{n!} \frac{t^{n+1}}{x} \cdot x = \sum_{n=0}^{\infty} (-1)^n t^{n+1} = \frac{t}{1+t}, \quad |t| < 1.
$$

The Borel sum is:

$$
\mathcal{S}A(x) = \frac{1}{x} \int_0^{\infty} \frac{t e^{-t/x}}{1+t} \, dt.
$$

For $\operatorname{Re}(x) > 0$, we can evaluate this directly. The integrand has a pole at $t = -1$, which is not on the positive real axis, so the integral is well-defined.

For $\operatorname{Re}(x) < 0$, the integration path may pass near or through the pole. The Stokes line is along the negative real axis $\arg x = \pi$.

To compute the Stokes jump, we need to compare the integrals above and below the pole. The difference is given by the residue:

$$
\Delta \mathcal{S}A(x) = \frac{2\pi i}{x} \operatorname{Res}_{t=-1} \left(\frac{t e^{-t/x}}{1+t}\right) = \frac{2\pi i}{x} (-1) e^{1/x} = -\frac{2\pi i}{x} e^{1/x}.
$$

This exponentially small jump (since $\operatorname{Re}(1/x) < 0$ for $\operatorname{Re}(x) < 0$) is the Stokes discontinuity.

**Key Insights:**
- Borel summation provides a rigorous way to sum divergent series.
- Stokes jumps arise from singularities of the Borel transform.
- The jump is exponentially small, matching the scale of non-perturbative effects.

</details>

### Challenge 2: Renormalization Group for the Duffing Oscillator

Apply the renormalization group method to the Duffing oscillator

$$
y'' + y + \epsilon y^3 = 0, \quad y(0) = 1, \quad y'(0) = 0.
$$

Introduce a renormalization time $\tau$ and allow the integration constants (amplitude and phase) to depend on $\tau$ such that $\partial y/\partial \tau = 0$. Derive the RG flow equations and show that they recover the frequency shift obtained via Poincaré–Lindstedt method.

<details>
<summary><strong>Expand Solution</strong></summary>

The naïve perturbation expansion gives:

$$
y(t) = \cos t + \epsilon y_1(t) + \epsilon^2 y_2(t) + \cdots,
$$

where $y_1$ contains secular terms like $t \sin t$.

The RG method introduces a renormalization time $\tau$ and writes the solution as:

$$
y(t, \tau) = A(\tau) \cos(t + \phi(\tau)) + \epsilon y_1(t, \tau) + \cdots,
$$

with the condition that the full solution $y(t) = y(t, t)$ (setting $\tau = t$) is independent of the arbitrary scale $\tau$:

$$
\frac{\partial y}{\partial \tau}\bigg|_{\tau=t} = 0.
$$

At $O(1)$, we have $y_0 = A(\tau) \cos(t + \phi(\tau))$.

At $O(\epsilon)$, the equation for $y_1$ is:

$$
y_1'' + y_1 = -y_0^3 = -A^3 \cos^3(t + \phi) = -\frac{A^3}{4}[3\cos(t+\phi) + \cos(3(t+\phi))].
$$

The resonant term $3\cos(t+\phi)$ produces secular growth. The RG condition requires that this secular term be canceled by the $\tau$-dependence of $A$ and $\phi$:

$$
\frac{\partial y_0}{\partial \tau} = A' \cos(t+\phi) - A\phi' \sin(t+\phi).
$$

Matching the secular terms gives:

$$
A' = -\frac{3\epsilon A^3}{8}, \quad \phi' = 0 \quad \text{(at this order)}.
$$

At $O(\epsilon^2)$, we get $\phi' \neq 0$, producing the frequency shift.

Setting $\tau = t$ and solving gives the amplitude evolution and frequency correction, matching the Poincaré–Lindstedt result.

**Key Insights:**
- The RG method automatically eliminates secular terms without ad hoc assumptions.
- The flow equations for $A$ and $\phi$ emerge from the RG condition.
- This recovers multiple scales results in a systematic way.

</details>

### Challenge 3: Instanton Action and Large-Order Behavior

For the anharmonic oscillator with Hamiltonian

$$
H = -\frac{\epsilon^2}{2} \frac{d^2}{dx^2} + \frac{1}{2}x^2 + \frac{\lambda}{4}x^4,
$$

show that the instanton solution connecting $x = 0$ to itself (a bounce) has action

$$
S = \frac{4\sqrt{2}}{3\lambda}.
$$

Prove that the large-order behavior of the perturbation series for the ground-state energy is

$$
E_n^{(0)} \sim -\frac{\Gamma(n+1/2)}{\pi} \left(\frac{6}{\lambda}\right)^n,
$$

and show that this is consistent with a Borel singularity at $t = S$.

<details>
<summary><strong>Expand Solution</strong></summary>

The instanton is a solution of the Euclidean equation of motion:

$$
\epsilon^2 \frac{d^2 x}{d\tau^2} = V'(x) = x + \lambda x^3.
$$

For a bounce solution that starts and ends at $x = 0$, we need to solve this with boundary conditions $x(\pm\infty) = 0$.

Multiplying by $dx/d\tau$ and integrating:

$$
\frac{\epsilon^2}{2}\left(\frac{dx}{d\tau}\right)^2 = V(x) = \frac{1}{2}x^2 + \frac{\lambda}{4}x^4.
$$

Solving for $dx/d\tau$:

$$
\frac{dx}{d\tau} = \pm \frac{\sqrt{2V(x)}}{\epsilon} = \pm \frac{x\sqrt{1 + \lambda x^2/2}}{\epsilon}.
$$

Integrating gives the instanton trajectory. The action is:

$$
S = \int_{-\infty}^{\infty} \left[\frac{\epsilon^2}{2}\left(\frac{dx}{d\tau}\right)^2 + V(x)\right] d\tau = 2\int_{-\infty}^{\infty} V(x) d\tau = 2\int_0^{x_{\max}} \sqrt{2V(x)} dx.
$$

Evaluating this integral gives $S = 4\sqrt{2}/(3\lambda)$.

The large-order behavior is determined by the closest singularity in the Borel plane, which is at $t = S$. Using Dingle's theory, the coefficients behave as:

$$
E_n^{(0)} \sim \frac{\Gamma(n+\beta)}{S^{n+\beta}} \times \text{(subdominant factors)}.
$$

For the quartic oscillator, detailed calculation gives the stated form, with the singularity location $S$ controlling the growth rate.

**Key Insights:**
- Instantons determine the large-order behavior of perturbation theory.
- The Borel singularity location equals the instanton action.
- This connects non-perturbative physics to the divergence of perturbation series.

</details>

### Challenge 4: Optimal Truncation and Transseries

For the series

$$
y(x) \sim \sum_{n=0}^{\infty} \frac{(-1)^n n!}{x^{n+1}}, \quad x \to \infty,
$$

show that the optimal truncation is at $N_{\text{opt}} \approx |x|$, and the error is $O(e^{-|x|})$.

Now consider the full transseries expansion:

$$
y(x) = \sum_{n=0}^{\infty} \frac{(-1)^n n!}{x^{n+1}} + C e^{-x} \sum_{n=0}^{\infty} \frac{b_n}{x^{n+1}},
$$

where the second series represents non-perturbative corrections. Show that the coefficient $C$ can be determined by matching the Stokes jump of the Borel-resummed perturbative series, and derive the connection between $C$ and the lateral Borel sums.

<details>
<summary><strong>Expand Solution</strong></summary>

The optimal truncation occurs when the terms are smallest. The $n$-th term is:

$$
a_n = \frac{(-1)^n n!}{x^{n+1}}.
$$

The ratio of successive terms is:

$$
\left|\frac{a_{n+1}}{a_n}\right| = \frac{(n+1)!}{|x|^{n+2}} \cdot \frac{|x|^{n+1}}{n!} = \frac{n+1}{|x|}.
$$

Terms decrease until $n+1 \approx |x|$, so $N_{\text{opt}} \approx |x|$. The error is approximately the first omitted term:

$$
\text{Error} \sim |a_{N_{\text{opt}}}| \sim \frac{|x|!}{|x|^{|x|+1}} \sim \sqrt{2\pi |x|} e^{-|x|},
$$

using Stirling's approximation.

The full transseries includes non-perturbative terms $e^{-x} \sum b_n/x^{n+1}$ that are invisible to the perturbative series but become important when $x$ is not extremely large.

The coefficient $C$ in the transseries is related to the Stokes constant. When crossing a Stokes line, the lateral Borel sums differ by an amount that must be matched by turning on the non-perturbative series. This determines $C$.

Specifically, if $\mathcal{S}^+$ and $\mathcal{S}^-$ are the lateral Borel sums above and below a Stokes line, then:

$$
\mathcal{S}^+ - \mathcal{S}^- = C e^{-x} \times \text{(series)}.
$$

This connection formula determines $C$ from the discontinuity of the Borel sum.

**Key Insights:**
- Optimal truncation gives exponentially small errors.
- Transseries include both perturbative and non-perturbative sectors.
- Stokes jumps determine the coefficients of non-perturbative terms.
- This provides a complete asymptotic description beyond perturbation theory.

</details>

The chapter concludes with a crisis: perturbation series often diverge factorially, and regular perturbation methods fail when secular terms appear or when no small parameter exists. Borel summation provides a rigorous way to sum divergent series, revealing that the divergence encodes non-perturbative information through the Borel plane structure. The renormalization group method eliminates secular terms systematically, while instantons reveal exponentially small effects invisible to perturbation theory.

However, even these advanced methods have limitations: Borel summation requires analytic continuation of the Borel transform, RG methods work best for problems with clear scale separation, and instanton calculations become intractable for complex potentials. When these classical methods fail, we must turn to the functional-analytic framework of distributions, Sobolev spaces, and spectral theory (Chapter 2), the geometric methods of manifolds and jet bundles (Chapters 3 and 6), and the algebraic structures of D-modules and resurgence theory (Chapter 7). These provide the rigorous foundations and computational tools needed to handle general nonlinear PDEs, irregular domains, and non-perturbative phenomena beyond the reach of classical asymptotic and perturbation methods.

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
