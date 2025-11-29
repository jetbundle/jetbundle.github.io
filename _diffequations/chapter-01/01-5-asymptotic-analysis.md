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

> Asymptotic analysis reveals that integrals and differential equations are dominated by critical points—local geometry determines global behavior in the limit.

## Introduction

Acknowledging that exact solutions are rare, we turn to approximation in limits. **Laplace's Method** and **Stationary Phase** reveal that integrals are dominated by critical points. The **WKB Approximation** connects wave mechanics to classical ray trajectories. This module emphasizes "local truth"—accurate behavior at $\infty$ or $0$—while exposing the lack of global connection formulas, necessitating a topological understanding of the Stokes phenomenon.

## Laplace's Method: Dominance of Critical Points

For integrals with a large parameter,

$$
I(M)=\int_{a}^{b}g(x)e^{M h(x)}\,dx,\qquad M\to\infty,
$$

the main contribution arises near the global maximum of $h$. If $h$ has a unique interior maximum at $x_{0}$ with $h''(x_{0})<0$, Taylor expansion gives

$$
I(M)\sim g(x_{0})e^{M h(x_{0})}\sqrt{\frac{2\pi}{M\mid h''(x_{0}) \mid}}.
$$

When the maximum occurs at an endpoint with $h'(a)\neq 0$, the scaling changes to $I(M)\sim g(a)e^{M h(a)}/(M\mid h'(a) \mid)$, illustrating the discontinuous dependence on critical-point geometry.

> **Endpoint Laplace Method**

> Estimate $I(M)=\int_{0}^{1}e^{M(\ln x - x)}\,dx$ as $M\to\infty$.

> The phase $h(x)=\ln x - x$ attains its maximum at $x=1$, an endpoint with $h'(1)=0$ and $h''(1)=-1$. Setting $x=1-t$ yields $h(1-t)\approx -t-\tfrac{t^{2}}{2}$, so

> $$
> I(M)\approx \int_{0}^{\infty}e^{-M t-M t^{2}/2}\,dt\sim \frac{1}{M}.
> $$

> This matches the asymptotic of the exponential integral $E_{1}(M)$.

Endpoint maxima create different scaling laws than interior maxima, reflecting the geometric constraint that the integration domain terminates at the critical point.

> **Partition Function via Laplace Method**

> Evaluate $Z(\beta)=\int_{-\infty}^{\infty}e^{-\beta (x^{4}-2x^{2})}\,dx$ for $\beta\to\infty$.

> The potential $V(x)=x^{4}-2x^{2}$ has minima at $x=\pm 1$ with $V''(\pm 1)=8$. Each contributes

> $$
> Z(\beta)\sim 2 e^{\beta}\sqrt{\frac{2\pi}{\beta \cdot 8}}=e^{\beta}\sqrt{\frac{\pi}{2\beta}}.
> $$

> The free energy $F=-(1/\beta)\ln Z$ approaches $-1+\tfrac{1}{2\beta}\ln(\pi/2\beta)$, revealing the ground-state energy plus thermal corrections.

Multiple critical points contribute independently in the limit, with each creating its own Gaussian peak. The partition function becomes a sum over these localized contributions, revealing the connection between statistical mechanics and critical-point analysis.

> **Multiple Critical Points**

> Analyze $I(M)=\int_{0}^{2\pi}e^{M\cos^{3}\theta}\,d\theta$.

> Critical points at $\theta=0,\pi$ give quadratic contributions $\sim e^{M}\sqrt{2\pi/(3M)}$ and $e^{-M}\sqrt{2\pi/(3M)}$ (negligible). Degenerate points at $\theta=\pi/2,3\pi/2$ produce cubic scaling $\sim 0.838\,M^{-1/3}$. Thus

> $$
> I(M)\sim e^{M}\sqrt{\frac{2\pi}{3M}}+0.838\,M^{-1/3}+\cdots,
> $$

> illustrating how different critical-point types set distinct powers of $M$.

Degenerate critical points (where $h''(x_0) = 0$) produce different asymptotic scaling than non-degenerate ones. The geometry of the phase function near the critical point determines the power law in the asymptotic expansion.

## Method of Stationary Phase

For oscillatory integrals

$$
I(M)=\int_{-\infty}^{\infty}g(x)e^{i M h(x)}\,dx,
$$

rapid oscillations cancel except near stationary points where $h'(x_{0})=0$. Expanding $h$ quadratically yields

$$
I(M)\sim g(x_{0})e^{i M h(x_{0})}\sqrt{\frac{2\pi}{M\mid h''(x_{0}) \mid}}e^{i\frac{\pi}{4}\operatorname{sgn}(h''(x_{0}))},
$$

introducing the Maslov phase shift $\pi/4$ that later reappears in semiclassical quantization.

> **Stationary Phase Fresnel Integral**

> Estimate $I(M)=\int_{0}^{\infty}e^{i M x^{2}}\,dx$.

> The stationary point at $x=0$ (an endpoint) yields

> $$
> I(M)\sim \tfrac{1}{2}\sqrt{\frac{\pi}{M}}e^{i\pi/4},
> $$

> matching the exact Fresnel integral and exhibiting the $\pi/4$ phase.

The $\pi/4$ phase shift is fundamental to semiclassical mechanics, appearing whenever a classical trajectory passes through a turning point. This geometric phase encodes topological information about the path in phase space.

> **Wave Diffraction**

> In Kirchhoff diffraction, $U(P)=\frac{1}{i\lambda}\iint_{S}\frac{e^{ik r}}{r}\cos\theta\,dS$ with $k\to\infty$.

> Stationary phase at the specular point $(r=r_{0})$ gives $U(P)\sim \frac{A}{\sqrt{k}}e^{ik r_{0}}e^{i\pi/4}$, explaining the $k^{-1/2}$ decay and phase shift of Fresnel diffraction fringes.

Stationary phase provides the foundation for geometric optics: only rays from stationary points contribute in the high-frequency limit. The $k^{-1/2}$ decay reflects the two-dimensional nature of the diffraction surface.

> **Coherent vs. Incoherent Stationary Points**

> Evaluate $I(M)=\int_{0}^{2\pi}e^{iM(\cos\theta +0.1\sin 2\theta)}\,d\theta$.

> Two stationary points contribute amplitudes $I_{1,2}\sim (2\pi/M)^{1/2}e^{iM h(\theta_{1,2})\pm i\pi/4}$. The relative phase $\Delta\phi=M(h(\theta_{1})-h(\theta_{2}))$ determines interference: if $\Delta\phi\ll 2\pi$, the contributions add coherently; if $\Delta\phi\gg 2\pi$, intensities add incoherently.

When multiple stationary points contribute, interference effects depend on the phase relationships. Coherent addition occurs when phases are correlated; incoherent addition (intensity superposition) occurs when phases decorrelate through the large parameter $M$.

## WKB Approximation

For $\epsilon^{2}y''+Q(x)y=0$ with $\epsilon\to 0$, seek $y=\exp\left(\epsilon^{-1}\sum_{n=0}^{\infty}\epsilon^{n}S_{n}(x)\right)$. The leading terms satisfy

$$
(S_{0}')^{2}+Q(x)=0,\qquad 2S_{0}'S_{1}'+S_{0}''=0,
$$

giving

$$
y(x)\sim \frac{A}{Q(x)^{1/4}}\exp\left(\pm\frac{i}{\epsilon}\int^{x}\sqrt{Q(t)}\,dt\right).
$$

Oscillatory behavior occurs where $Q>0$, exponential where $Q<0$. Near turning points $Q(x_{0})=0$, WKB fails and must be matched to Airy-function solutions to obtain connection formulas.

> **WKB for the Harmonic Oscillator**

> Solve $\epsilon^{2}y''+(1-x^{2})y=0$ via WKB.

> The action integral $\int_{-1}^{1}\sqrt{1-x^{2}}\,dx=\pi/2$ leads to the Bohr–Sommerfeld rule $(n+\tfrac{1}{2})\pi\epsilon=\pi/2$, giving energy levels $E_{n}=(n+\tfrac{1}{2})\epsilon$. The WKB wavefunction in $\mid x \mid <1$ is

> $$
> y(x)\sim \frac{1}{(1-x^{2})^{1/4}}\cos\left(\frac{1}{\epsilon}\int^{x}\sqrt{1-t^{2}}\,dt - \frac{\pi}{4}\right).
> $$

> **Quantum Tunneling via WKB**

> Estimate tunneling in $V(x)=x^{4}-2x^{2}$.

> In the forbidden region $\mid x \mid >1$, the WKB solution is $y\sim \mid Q \mid^{-1/4}\exp\left(-\epsilon^{-1}\int_{1}^{x}\sqrt{\mid Q \mid}\,dt\right)$. The splitting of nearly degenerate states is $\Delta E\sim e^{-2S/\epsilon}$ where $S=\int_{1}^{\infty}\sqrt{x^{4}-2x^{2}-1}\,dx\approx 1.44$.

WKB connects quantum mechanics to classical mechanics: the phase $\int \sqrt{Q} \, dx$ is the classical action, and the amplitude $Q^{-1/4}$ reflects the classical density of trajectories. Tunneling probabilities are exponentially suppressed by the action barrier.

> **Airy Turning-Point Matching**

> For $Q(x)=x$, match WKB solutions across $x=0$.

> The Airy equation $y''-xy=0$ has asymptotics

> $$
> \operatorname{Ai}(x)\sim \frac{1}{2\sqrt{\pi}x^{1/4}}e^{-\frac{2}{3}x^{3/2}},\quad x\to+\infty,
> $$

> and

> $$
> \operatorname{Ai}(x)\sim \frac{1}{\sqrt{\pi}\mid x \mid^{1/4}}\sin\left(\frac{2}{3}\mid x \mid^{3/2}+\frac{\pi}{4}\right),\quad x\to -\infty.
> $$

> Matching these yields the $\pi/4$ phase shift in the oscillatory region.

Turning points are where WKB breaks down: the classical trajectory reverses direction, creating a caustic. Matching to Airy functions provides connection formulas that link the exponential and oscillatory regions, introducing the $\pi/4$ phase shift characteristic of such transitions.

## Stokes Phenomenon

Asymptotic expansions like

$$
y(z)\sim e^{\lambda z}\sum_{n=0}^{\infty}\frac{a_{n}}{z^{n}}
$$

are sectorial: they hold only within wedges bounded by Stokes lines where $\Re(\lambda z)$ is constant. Crossing a Stokes line activates subdominant exponentials with discontinuous multipliers (often $\pm i$). Borel summation interprets the divergent series in each sector and glues them using these jumps, foreshadowing resurgence theory.

> **Stokes Lines for Airy Function**

> Track $\operatorname{Ai}(z)$ across the complex plane.

> Stokes lines occur at $\arg z=\pm\pi/3,\pi$. On $0<\arg z<2\pi/3$, only $e^{-\zeta}$ appears; crossing $\arg z=2\pi/3$ activates the subdominant $e^{+\zeta}$ with multiplier $i$. This discontinuity encodes the global analytic structure.

The Stokes phenomenon reveals that asymptotic expansions are not global: the form of the expansion jumps discontinuously across certain rays in the complex plane. These jumps encode topological information about the Riemann surface structure that cannot be captured by local series expansions.

> **Quantum Barrier Penetration and Stokes Jumps**

> In alpha decay, analytic continuation around a turning point causes the transmission coefficient to jump discretely.

> WKB solutions in the complex $r$-plane pick up Stokes multipliers when circling the barrier, quantizing decay rates and connecting asymptotic analysis to observable half-lives.

The Stokes phenomenon is not merely a mathematical curiosity—it has physical consequences. Quantum tunneling rates depend on these discontinuous jumps, connecting the abstract geometry of asymptotic analysis to measurable decay processes.

## Challenge Problems

The following problems synthesize concepts from Laplace's method, stationary phase, WKB approximation, and the Stokes phenomenon.

### Challenge 1: Steepest Descent Method

For the integral $I(\lambda) = \int_{-\infty}^{\infty} e^{-\lambda(x^4 - x^2)} \, dx$ with $\lambda \to \infty$, use the method of steepest descent to find the asymptotic expansion. Identify the critical points, determine the steepest descent paths through each, and compute the leading-order contributions. Compare with Laplace's method.

*(Hint: The critical points are at $x = 0, \pm 1/\sqrt{2}$. Deform the contour to pass through these points along paths of steepest descent where $\Im(h(z))$ is constant.)*

<details>
<summary><strong>Expand Solution</strong></summary>

The phase function is $h(x) = -(x^4 - x^2)$. Critical points occur where $h'(x) = -4x^3 + 2x = 0$, giving $x = 0$ and $x = \pm 1/\sqrt{2}$.

At $x = 0$: $h''(0) = 2 > 0$, so this is a minimum of $-h(x)$, meaning a maximum of $h(x)$ for the integrand. The steepest descent path through the origin is along the real axis.

At $x = \pm 1/\sqrt{2}$: $h''(\pm 1/\sqrt{2}) = -4 < 0$, so these are maxima of $-h(x)$, meaning minima of $h(x)$ for the integrand. The steepest descent paths are at angles of $\pm \pi/4$ from the real axis.

The dominant contribution comes from the saddle points at $x = \pm 1/\sqrt{2}$. Each contributes

$$
I(\lambda) \sim 2 \cdot e^{\lambda/4} \sqrt{\frac{2\pi}{\lambda \cdot 4}} = e^{\lambda/4} \sqrt{\frac{\pi}{\lambda}}.
$$

The contribution from $x = 0$ is subdominant by a factor of $e^{-\lambda/4}$.

The method of steepest descent generalizes Laplace's method to complex integrals, allowing one to handle oscillatory integrands by deforming the integration contour through saddle points. Contour deformation is essential for capturing all relevant contributions: by choosing paths along which the phase varies slowly (steepest descent paths), one can extract the dominant asymptotic behavior while suppressing oscillatory contributions. The leading contribution comes from the global minima of the phase function, with each such minimum producing its own asymptotic contribution, and subdominant contributions being exponentially suppressed relative to the dominant ones.

</details>

### Challenge 2: WKB Connection Formulas

For the equation $\epsilon^2 y'' + (x - 1)^2 y = 0$ with a turning point at $x = 1$, construct the WKB solutions on both sides of the turning point and use Airy function matching to derive the connection formulas. Show that the phase shift of $\pi/4$ appears in the connection between the exponential and oscillatory regions.

*(Hint: Near $x = 1$, expand $Q(x) = (x-1)^2$ to linear order and match to the Airy equation. The connection formulas link the exponentially decaying solution for $x > 1$ to the oscillatory solution for $x < 1$.)*

<details>
<summary><strong>Expand Solution</strong></summary>

For $x < 1$, we have $Q(x) > 0$, so the WKB solution is oscillatory:

$$
y(x) \sim \frac{A}{(1-x)^{1/2}} \cos\left(\frac{1}{\epsilon} \int_x^1 (1-t) \, dt - \frac{\pi}{4}\right) = \frac{A}{(1-x)^{1/2}} \cos\left(\frac{(1-x)^2}{2\epsilon} - \frac{\pi}{4}\right).
$$

For $x > 1$, we have $Q(x) > 0$ as well, but we need to match through the turning point. Near $x = 1$, we linearize: $Q(x) \approx (x-1)^2$. Setting $z = (x-1)/\epsilon^{2/3}$, the equation becomes approximately $d^2y/dz^2 - z^2 y = 0$, which matches the Airy equation after appropriate scaling.

Using the Airy function asymptotics:

- For $z \to +\infty$: $\operatorname{Ai}(z) \sim (2\sqrt{\pi} z^{1/4})^{-1} e^{-2z^{3/2}/3}$
- For $z \to -\infty$: $\operatorname{Ai}(z) \sim (\sqrt{\pi} \mid z \mid^{1/4})^{-1} \sin(2\mid z \mid^{3/2}/3 + \pi/4)$

Matching through the turning point introduces the $\pi/4$ phase shift, connecting the oscillatory solution on one side to the appropriate linear combination on the other. Turning points require local analysis beyond WKB because the WKB ansatz breaks down where $Q(x) = 0$, necessitating a separate treatment of the transition region. Airy functions provide the universal transition functions near simple turning points: when $Q(x)$ has a simple zero, the local behavior is always described by Airy's equation after appropriate scaling. The $\pi/4$ phase shift is a topological invariant of the turning point structure, appearing universally whenever one connects oscillatory and exponential regions through a simple turning point, reflecting the geometric structure of the solution space near these critical points.

</details>

### Challenge 3: Stationary Phase with Degenerate Points

Consider the integral $I(\lambda) = \int_0^{2\pi} e^{i\lambda \cos^3 \theta} \, d\theta$. Identify all stationary points and classify their degeneracy. Show that degenerate stationary points (where $h''(\theta_0) = 0$) produce different asymptotic scaling than non-degenerate ones. Compute the leading-order asymptotic for each type.

*(Hint: Stationary points satisfy $\sin \theta \cos^2 \theta = 0$. Degenerate points occur where $h''(\theta_0) = 0$, requiring examination of higher derivatives.)*

<details>
<summary><strong>Expand Solution</strong></summary>

Stationary points satisfy $h'(\theta) = -3\sin \theta \cos^2 \theta = 0$, giving:
- $\theta = 0, \pi$ (non-degenerate): $h''(0) = -3$, $h''(\pi) = 3$
- $\theta = \pi/2, 3\pi/2$ (degenerate): $h''(\pi/2) = 0$

At non-degenerate points, we get the standard stationary phase result:

$$
I(\lambda) \sim \sqrt{\frac{2\pi}{\lambda \mid h''(\theta_0) \mid}} e^{i\lambda h(\theta_0) \pm i\pi/4}.
$$

At degenerate points, we must examine higher derivatives. At $\theta = \pi/2$, we have $h'''(\pi/2) = 0$ but $h^{(4)}(\pi/2) \neq 0$. Expanding to quartic order:

$$
h(\pi/2 + \delta) \approx h(\pi/2) + \frac{1}{24} h^{(4)}(\pi/2) \delta^4.
$$

This gives scaling $I(\lambda) \sim \lambda^{-1/4}$ instead of $\lambda^{-1/2}$, with the constant determined by the quartic coefficient. Degenerate stationary points produce different power-law scalings because the quadratic approximation fails, requiring expansion to higher order. The asymptotic order depends on the first non-vanishing derivative: if $h''(\theta_0) = 0$ but $h^{(k)}(\theta_0) \neq 0$ for some $k > 2$, the scaling becomes $\lambda^{-1/k}$ rather than $\lambda^{-1/2}$. Multiple degenerate points may contribute at the same order, requiring careful analysis to combine their contributions correctly, as the relative phases determine whether they interfere constructively or destructively.

</details>

### Challenge 4: Borel Summation and Stokes Jumps

For the divergent series $y(z) \sim e^z \sum_{n=0}^{\infty} \frac{(-1)^n n!}{z^{n+1}}$ as $z \to \infty$ in $\arg z = 0$, construct the Borel transform and show that it has a singularity on the positive real axis. Demonstrate that the lateral Borel sums $\mathcal{S}^{\pm}$ differ by an exponentially small amount that matches the Stokes jump. Calculate the Stokes multiplier explicitly.

*(Hint: The Borel transform is $\mathcal{B}(t) = \sum_{n=0}^{\infty} \frac{(-1)^n t^n}{n!} = e^{-t}$. The singularity at $t = 1$ corresponds to the integration path obstruction. Lateral sums differ by the residue contribution.)*

<details>
<summary><strong>Expand Solution</strong></summary>

The Borel transform is:

$$
\mathcal{B}(t) = \sum_{n=0}^{\infty} \frac{(-1)^n t^n}{n!} = e^{-t}.
$$

The Borel sum is:

$$
\mathcal{S}(z) = \frac{1}{z} \int_0^{\infty} e^{-t} e^{-t/z} \, dt = \frac{1}{z} \int_0^{\infty} e^{-t(1 + 1/z)} \, dt = \frac{1}{z + 1}.
$$

However, this is only valid for $\Re(z) > 0$. For $\arg z = 0^+$ and $\arg z = 0^-$, we must choose integration contours above or below any singularities.

The difference between lateral sums is:

$$
\mathcal{S}^+(z) - \mathcal{S}^-(z) = \frac{2\pi i}{z} \operatorname{Res}_{t=1} \left( \mathcal{B}(t) e^{-t/z} \right) = \frac{2\pi i e^{-1}}{z} e^{-1/z}.
$$

This exponentially small difference is the Stokes jump. The Stokes multiplier is $2\pi i e^{-1}$, encoding how the subdominant exponential is activated when crossing the Stokes line. Borel summation provides a rigorous interpretation of divergent series by transforming factorial divergence into a convergent integral representation, making sense of series that fail to converge in the traditional sense. Stokes jumps are encoded in the analytic continuation of the Borel transform: when the integration contour must pass above or below a singularity, the two choices produce different results that differ by exponentially small amounts. The multiplier is determined by the singularity structure in the Borel plane, with each singularity corresponding to a non-perturbative effect and its position determining the magnitude of the associated Stokes jump.

</details>

Asymptotics converts intractable integrals and differential equations into local expansions controlled by critical points and turning points. The resulting sectorial truths and Stokes jumps expose the topological constraints governing analytic continuation, anticipating the microlocal and resurgent frameworks of later chapters.

However, these methods have fundamental limitations: they provide only local information (valid in sectors, not globally), they fail at degenerate critical points (requiring more sophisticated techniques), and the Stokes phenomenon reveals that asymptotic expansions cannot be globally valid. These restrictions motivate the resurgent analysis, microlocal analysis, and topological methods of later chapters, which provide frameworks for understanding the global structure of asymptotic solutions.

## References

* **Olver, F. W. J., Lozier, D. W., Boisvert, R. F., & Clark, C. W. (2010).** *NIST Handbook of Mathematical Functions*. Cambridge University Press.
* **Stein, E. M., & Shakarchi, R. (2003).** *Fourier Analysis: An Introduction*. Princeton University Press.
* **Whittaker, E. T., & Watson, G. N. (1927).** *A Course of Modern Analysis*. Cambridge University Press.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 1.4 Classical Linear Partial Differential Equations]({{ '/diffequations/chapter-01/01-4-linear-pde/' | relative_url }})
- [Next Section: 1.6 Classical Perturbation Theory]({{ '/diffequations/chapter-01/01-6-perturbation-theory/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-01/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
