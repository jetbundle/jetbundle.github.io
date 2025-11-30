---
layout: textbook
title: "Section 5.2: SDEs & Diffusion Processes"
description: "Feynman-Kac formula, Girsanov theorem"
permalink: /diffequations/chapter-05/05-2-sdes/
order: 5.2
chapter: 5
section: 2
nav_order: 5.2
is_chapter_index: false
parent_chapter: 5
parent_section: null
---

# Section 5.2: SDEs & Diffusion Processes

> Stochastic differential equations redefine dynamics as the evolution of probability measures on path space, connecting deterministic trajectories to the geometry of diffusion processes.

## Introduction

Having established the definition of the stochastic integral in the previous section, we now address the inverse problem: the construction of stochastic processes that satisfy differential constraints. In the classical setting of Chapter 1, a differential equation $x'(t) = f(x(t))$ defines a trajectory tangent to a vector field. In the stochastic regime, the non-differentiability of Brownian motion forces us to interpret such equations in integral form.

A Stochastic Differential Equation (SDE) is not merely an equation with a noise term added; it is a fundamental redefinition of dynamics. We move from deterministic evolution to the evolution of probability measures on path space. The solution to an SDE is a diffusion process—a continuous strong Markov process whose local dynamics are characterized by a drift vector and a diffusion tensor. This section establishes the rigorous existence and uniqueness theory for these processes, connects them to the partial differential equations of Chapter 2 via the Feynman-Kac formula, and explores the geometry of probability measures through the Girsanov theorem.

## Mathematical Content

### Existence & Uniqueness Theory

The general form of an Itô SDE in $\mathbb{R}^n$ driven by an $m$-dimensional Brownian motion $B_t$ is formally written as:

$$
dX_t = b(t, X_t) dt + \sigma(t, X_t) dB_t
$$

where $b: [0, T] \times \mathbb{R}^n \to \mathbb{R}^n$ is the drift coefficient and $\sigma: [0, T] \times \mathbb{R}^n \to \mathbb{R}^{n \times m}$ is the diffusion coefficient. This notation is shorthand for the integral equation:

$$
X_t = X_0 + \int_0^t b(s, X_s) ds + \int_0^t \sigma(s, X_s) dB_s
$$

#### Lipschitz and Growth Conditions

The classical Picard-Lindelöf theorem requires Lipschitz continuity of the vector field. The stochastic analogue imposes similar constraints to control the variance of the Itô integral. We require two main conditions for the existence of a unique solution.

**Lipschitz Condition:** There exists a constant $K$ such that for all $x, y \in \mathbb{R}^n$ and $t \in [0, T]$:

$$
\mid b(t, x) - b(t, y) \mid + \mid \sigma(t, x) - \sigma(t, y) \mid \leq K \mid x - y \mid
$$

**Linear Growth Condition:** To prevent the solution from exploding to infinity in finite time:

$$
\mid b(t, x) \mid + \mid \sigma(t, x) \mid \leq K(1 + \mid x \mid)
$$

#### Picard Iteration in $L^2$

Under these conditions, we construct the solution iteratively. We define a sequence of processes $X^{(k)}_t$ in the Banach space of square-integrable adapted processes equipped with the norm $\mid\mid X \mid\mid = \mathbb{E}[\sup_{0 \leq t \leq T} \mid X_t \mid^2]^{1/2}$.

Let $X^{(0)}_t = X_0$. The recurrence is defined by:

$$
X^{(k+1)}_t = X_0 + \int_0^t b(s, X^{(k)}_s) ds + \int_0^t \sigma(s, X^{(k)}_s) dB_s
$$

Using the Itô isometry and the Lipschitz bounds, one demonstrates that the sequence is Cauchy in $L^2$. The limit $X_t$ is the unique strong solution.

> **Geometric Brownian Motion**

> To solve the SDE $dX_t = \mu X_t dt + \sigma X_t dB_t$ with $X_0 = x_0 > 0$, we first verify the Lipschitz conditions. For the drift $b(t,x) = \mu x$, we have $\mid b(t,x) - b(t,y) \mid = \mid \mu \mid \mid x-y \mid$. For the diffusion $\sigma(t,x) = \sigma x$, we have $\mid \sigma(t,x) - \sigma(t,y) \mid = \mid \sigma \mid \mid x-y \mid$. The linear growth condition is satisfied: $\mid b(t,x) \mid + \mid \sigma(t,x) \mid = (\mid \mu \mid + \mid \sigma \mid) \mid x \mid \leq K(1+\mid x \mid)$ with $K = \max(\mid \mu \mid, \mid \sigma \mid)$.

> The exact solution is obtained via Itô's formula. Consider $Y_t = \log X_t$. Applying Itô's formula:

> $$
> dY_t = \frac{1}{X_t} dX_t - \frac{1}{2} \frac{1}{X_t^2} d\langle X \rangle_t
> $$

> Since $d\langle X \rangle_t = (\sigma X_t)^2 dt = \sigma^2 X_t^2 dt$:

> $$
> dY_t = \frac{\mu X_t dt + \sigma X_t dB_t}{X_t} - \frac{1}{2X_t^2} \cdot \sigma^2 X_t^2 dt = \left(\mu - \frac{\sigma^2}{2}\right) dt + \sigma dB_t
> $$

> Integrating:

> $$
> Y_t = Y_0 + \left(\mu - \frac{\sigma^2}{2}\right) t + \sigma B_t
> $$

> $$
> \log X_t = \log x_0 + \left(\mu - \frac{\sigma^2}{2}\right) t + \sigma B_t
> $$

> Exponentiating:

> $$
> X_t = x_0 \exp\left[\left(\mu - \frac{\sigma^2}{2}\right) t + \sigma B_t\right]
> $$

> The moments are:

> $$
> \mathbb{E}[X_t] = x_0 e^{\mu t}, \quad \text{Var}(X_t) = x_0^2 e^{2\mu t} (e^{\sigma^2 t} - 1)
> $$

> This explicit solution confirms that the Picard iteration converges to this lognormal distribution. The geometric structure ensures that the process remains positive, making it a natural model for stock prices and other positive-valued quantities.

#### Strong vs. Weak Solutions

A critical distinction in stochastic analysis, absent in deterministic theory, is the nature of the solution space.

* **Strong Solution:** Given a specific probability space $(\Omega, \mathcal{F}, \mathbb{P})$ and a specific Brownian motion $B_t$, a strong solution is a process $X_t$ adapted to the filtration generated by $B_t$ that satisfies the integral equation. This corresponds to "pathwise" construction.

* **Weak Solution:** A weak solution is a tuple $(\Omega, \mathcal{F}, \mathbb{P}, B_t, X_t)$ such that the equation holds. Here, we are free to construct the probability space and the Brownian motion to fit the solution. Weak solutions are essential when the drift or diffusion coefficients are discontinuous, precluding pathwise construction.

#### The Yamada-Watanabe Theorem

This theorem provides the fundamental link between these concepts. It states that if pathwise uniqueness holds (i.e., any two strong solutions starting at the same point are indistinguishable), then weak existence implies strong existence. Furthermore, pathwise uniqueness implies uniqueness in law.

> **Square Root Process and Non-Lipschitz Diffusion**

> Consider the Cox-Ingersoll-Ross model $dX_t = \mu X_t dt + \sigma \sqrt{X_t} dB_t$. The diffusion coefficient fails the Lipschitz condition:

> $$
> \mid \sigma(t,x) - \sigma(t,y) \mid = \sigma \mid \sqrt{x} - \sqrt{y} \mid \not\leq K \mid x-y \mid
> $$

> However, pathwise uniqueness can be established via Tanaka's lemma and local time arguments. Weak existence follows from truncation and tightness arguments. The Yamada-Watanabe theorem then implies that despite the non-Lipschitz diffusion, a unique strong solution exists for $\mu, \sigma > 0$. This demonstrates that Lipschitz conditions are sufficient but not necessary for well-posedness.

### The Feynman-Kac Formula

The Feynman-Kac formula acts as a bridge between the parabolic partial differential equations of Chapter 2 and the diffusion processes of this chapter. It provides a stochastic representation for the solution of the linear heat equation with potential.

Consider the Cauchy problem for a backward parabolic equation on $[0, T] \times \mathbb{R}^n$:

$$
\frac{\partial u}{\partial t} + \mathcal{L}u - V(x)u = 0, \quad u(T, x) = \psi(x)
$$

Here, $\mathcal{L}$ is the infinitesimal generator of the Itô diffusion $dX_t = b(x)dt + \sigma(x)dB_t$:

$$
\mathcal{L}f(x) = \sum_{i} b_i(x) \frac{\partial f}{\partial x_i} + \frac{1}{2} \sum_{i,j} (\sigma\sigma^T)_{ij}(x) \frac{\partial^2 f}{\partial x_i \partial x_j}
$$

#### Probabilistic Representation

The Feynman-Kac theorem asserts that if $V$ is lower bounded and the coefficients are sufficiently regular, the solution admits the representation:

$$
u(t, x) = \mathbb{E}^{t,x} \left[ \exp\left( -\int_t^T V(X_s) ds \right) \psi(X_T) \right]
$$

where $\mathbb{E}^{t,x}$ denotes the expectation conditioned on $X_t = x$.

#### Derivation via Martingales

The proof relies on applying Itô's formula to the process $M_s = u(s, X_s) \exp(-\int_t^s V(X_r) dr)$. Assuming $u$ solves the PDE, the drift term in the Itô expansion vanishes identically, rendering $M_s$ a local martingale. By applying bounds to ensure it is a true martingale, we equate $M_t = u(t, x)$ and $\mathbb{E}[M_T]$, yielding the formula.

This result interprets the solution $u(t, x)$ as an average over all possible future paths of the particle, weighted by the decay potential $V$. This validates the intuition that diffusion PDEs describe the macroscopic statistics of microscopic stochastic motion.

> **Heat Equation via Feynman-Kac**

> For the heat equation $\partial_t u = \frac{1}{2} \partial_{xx} u$ with terminal condition $u(T,x) = \psi(x)$, the Feynman-Kac representation is:

> $$
> u(t,x) = \mathbb{E}^{t,x}[\psi(B_T)] = \int_{\mathbb{R}} \psi(y) \cdot \frac{1}{\sqrt{2\pi(T-t)}} \exp\left(-\frac{(y-x)^2}{2(T-t)}\right) dy
> $$

> Verification via Itô's formula: let $M_s = u(s, B_s)$. Then:

> $$
> dM_s = \partial_t u ds + \partial_x u dB_s + \frac{1}{2} \partial_{xx} u ds = 0
> $$

> Since $M_s$ is a martingale:

> $$
> M_t = u(t,x) = \mathbb{E}[M_T] = \mathbb{E}[\psi(B_T)]
> $$

> This demonstrates that the solution to the heat equation is the expected value of the terminal condition evaluated along Brownian paths, providing a probabilistic interpretation of diffusion.

> **Black-Scholes PDE**

> For a European call option $V(t,S)$ satisfying:

> $$
> \partial_t V + rS \partial_S V + \frac{1}{2} \sigma^2 S^2 \partial_{SS} V - rV = 0, \quad V(T,S) = \max(S-K, 0)
> $$

> the stochastic representation is:

> $$
> V(t,S) = e^{-r(T-t)} \mathbb{E}^{t,S} \left[ \max(S_T - K, 0) \right]
> $$

> where $dS_u = r S_u du + \sigma S_u d\tilde{B}_u$ under the risk-neutral measure. The analytical solution is:

> $$
> V(t,S) = S N(d_1) - K e^{-r(T-t)} N(d_2)
> $$

> where:

> $$
> d_1 = \frac{\log(S/K) + (r + \sigma^2/2)(T-t)}{\sigma \sqrt{T-t}}, \quad d_2 = d_1 - \sigma \sqrt{T-t}
> $$

> Under the risk-neutral measure, $S_T = S \exp[(r - \sigma^2/2)(T-t) + \sigma \tilde{B}_{T-t}]$. The probabilities are $\mathbb{P}(S_T > K) = N(d_2)$ and $\mathbb{E}[S_T 1_{S_T>K}] = S e^{r(T-t)} N(d_1)$. Discounting yields the Black-Scholes formula, demonstrating how the Feynman-Kac formula connects stochastic processes to option pricing.

### The Girsanov Theorem

In classical ODEs, changing the drift term $b(x)$ fundamentally alters the trajectory. In SDEs, we can interpret a change in drift as a change in the *probability measure* of the path space. The Girsanov theorem allows us to remove drift from an SDE, transforming it into a martingale under a new measure.

#### Change of Measure

Let $B_t$ be a Brownian motion under measure $\mathbb{P}$. We wish to construct a measure $\mathbb{Q}$ such that the process $\tilde{B}_t = B_t + \int_0^t \theta_s ds$ is a Brownian motion under $\mathbb{Q}$.

We define the Radon-Nikodym derivative (likelihood ratio) process $Z_t$:

$$
Z_t = \frac{d\mathbb{Q}}{d\mathbb{P}}\bigg\mid_{\mathcal{F}_t} = \exp\left( -\int_0^t \theta_s dB_s - \frac{1}{2} \int_0^t \mid \theta_s \mid^2 ds \right)
$$

#### The Novikov Condition

For $\mathbb{Q}$ to be a valid probability measure, we require $\mathbb{E}^\mathbb{P}[Z_T] = 1$, which implies $Z_t$ must be a true martingale, not just a local one. The Novikov condition provides a sufficient criterion:

$$
\mathbb{E}^\mathbb{P} \left[ \exp\left( \frac{1}{2} \int_0^T \mid \theta_s \mid^2 ds \right) \right] < \infty
$$

#### Application to Drift Removal

Consider the SDE $dX_t = b(X_t)dt + dB_t$. By choosing $\theta_t = -b(X_t)$, Girsanov's theorem implies that under the measure $\mathbb{Q}$ defined by $Z_T$, the process satisfies $dX_t = d\tilde{B}_t$. Thus, a diffusion with drift can be viewed as a Brownian motion viewed through a distorted probabilistic lens. This technique is central to the pricing of financial derivatives (risk-neutral pricing) and the study of weak solutions.

> **Drift Removal via Girsanov**

> To transform $dX_t = \mu dt + dB_t$ into standard Brownian motion, set $\theta_t = -\mu$ (constant). The Radon-Nikodym derivative is:

> $$
> Z_t = \exp\left( -\int_0^t (-\mu) dB_s - \frac{1}{2} \int_0^t \mu^2 ds \right) = \exp\left( \mu B_t - \frac{\mu^2 t}{2} \right)
> $$

> The Novikov condition is satisfied: $\mathbb{E}[\exp(\frac{1}{2} \mu^2 T)] < \infty$. Under $\mathbb{Q}$ defined by $Z_T$, $\tilde{B}_t = B_t - \mu t$ is Brownian motion. Thus $X_t = \tilde{B}_t + \mu t$ becomes $X_t = \tilde{B}_t$ under $\mathbb{Q}$.

> Verification:

> $$
> \mathbb{E}^\mathbb{Q}[X_t] = \mathbb{E}^\mathbb{P}[X_t Z_t] = \mathbb{E}^\mathbb{P}[(B_t + \mu t) \exp(\mu B_t - \frac{\mu^2 t}{2})] = 0
> $$

> The exponential martingale property yields $\mathbb{E}^\mathbb{Q}[X_t] = 0$, confirming that the drift has been removed under the new measure.

> **Risk-Neutral Pricing**

> For a stock price $S_t$ with $dS_t = \mu S_t dt + \sigma S_t dB_t^\mathbb{P}$ under the physical measure, we transform to the risk-neutral measure. The risk-neutral drift is $r$ (risk-free rate). The Girsanov transformation uses:

> $$
> \theta_t = \frac{\mu - r}{\sigma}
> $$

> $$
> \frac{d\mathbb{Q}}{d\mathbb{P}} = \exp\left( -\frac{\mu-r}{\sigma} B_T - \frac{(\mu-r)^2 T}{2\sigma^2} \right)
> $$

> Under $\mathbb{Q}$:

> $$
> dS_t = r S_t dt + \sigma S_t d\tilde{B}_t
> $$

> The option price is:

> $$
> V_0 = e^{-rT} \mathbb{E}^\mathbb{Q}[\max(S_T - K, 0)]
> $$

> This transformation removes the market risk premium from the drift, allowing option pricing based solely on the risk-free rate and volatility.

### Kolmogorov Equations

While the Feynman-Kac formula relates functional expectations to PDEs, the Kolmogorov equations describe the evolution of the probability density itself. These are the "Forward" and "Backward" equations, dual to one another via the $L^2$ inner product.

#### The Backward Equation

Let $u(t, x) = \mathbb{E}[f(X_T) \mid X_t = x]$. This function represents an observable of the system evolving backward from a final condition. It satisfies:

$$
\frac{\partial u}{\partial t} + \mathcal{L}u = 0, \quad t < T
$$

$$
u(T, x) = f(x)
$$

This is a parabolic PDE where the operator $\mathcal{L}$ acts on the spatial variable $x$. It describes how the expected value depends on the starting position.

#### The Forward Equation (Fokker-Planck)

Let $p(t, x)$ be the probability density function of the process $X_t$, assuming $X_0$ is distributed according to $p_0(x)$. The density evolves according to the adjoint operator $\mathcal{L}^*$:

$$
\frac{\partial p}{\partial t} = \mathcal{L}^* p = -\sum_{i} \frac{\partial}{\partial x_i} (b_i(x)p) + \frac{1}{2} \sum_{i,j} \frac{\partial^2}{\partial x_i \partial x_j} ((\sigma\sigma^T)_{ij} p)
$$

This equation conserves total probability ($\int p dx = 1$). The first term represents advection by the drift $b$, while the second represents diffusion by $\sigma$.

> **Ornstein-Uhlenbeck Process**

> For the SDE $dX_t = -\gamma X_t dt + \sigma dB_t$ with $X_0 = x_0$, the Lipschitz conditions are satisfied globally since $b(t,x) = -\gamma x$ and $\sigma(t,x) = \sigma$ is constant. Using variation of parameters, the homogeneous solution is $e^{-\gamma t}$. Setting $X_t = e^{-\gamma t} Y_t$:

> $$
> dX_t = -\gamma e^{-\gamma t} Y_t dt + e^{-\gamma t} dY_t
> $$

> Equating coefficients:

> $$
> e^{-\gamma t} dY_t = \sigma dB_t \implies dY_t = \sigma e^{\gamma t} dB_t
> $$

> Integrating:

> $$
> Y_t = Y_0 + \sigma \int_0^t e^{\gamma s} dB_s
> $$

> $$
> X_t = e^{-\gamma t} x_0 + \sigma e^{-\gamma t} \int_0^t e^{\gamma s} dB_s
> $$

> The covariance is:

> $$
> \text{Cov}(X_t, X_s) = \frac{\sigma^2}{2\gamma} e^{-\gamma \mid t-s \mid}
> $$

> As $t \to \infty$, $X_t \xrightarrow{d} \mathcal{N}\left(0, \frac{\sigma^2}{2\gamma}\right)$, demonstrating convergence to a stationary Gaussian distribution. This mean-reverting process models systems that return to equilibrium, such as interest rates or particle velocities in a heat bath.

> **Fokker-Planck Equation for Ornstein-Uhlenbeck**

> The probability density $p(t,x)$ for $dX_t = -\gamma X_t dt + \sigma dB_t$ satisfies:

> $$
> \partial_t p = \gamma \partial_x (x p) + \frac{\sigma^2}{2} \partial_{xx} p
> $$

> The exact solution is:

> $$
> p(t,x) = \frac{1}{\sqrt{2\pi v(t)}} \exp\left( -\frac{(x - m(t))^2}{2v(t)} \right)
> $$

> where $m(t) = x_0 e^{-\gamma t}$ and $v(t) = \frac{\sigma^2}{2\gamma} (1 - e^{-2\gamma t})$. Verification shows that all terms balance to yield $\partial_t p$, confirming that the density evolves as a Gaussian with time-dependent mean and variance converging to the stationary distribution.

#### Stationary Distributions

A stationary distribution $\pi(x)$ is an invariant measure for the process, satisfying $\mathcal{L}^* \pi = 0$. The existence of such a distribution is linked to the recurrence properties of the diffusion and the stability of the zero solution. In the context of Chapter 2, finding the stationary distribution is equivalent to finding the null space of the adjoint elliptic operator.

> **Stationary Distributions for Various Diffusions**

> For different SDEs, the stationary densities are:

> | SDE | Stationary Density | Verification |
> |-----|-------------------|--------------|
> | $dX_t = -X_t dt + dB_t$ | $\pi(x) = \sqrt{\frac{2}{\pi}} e^{-x^2}$ | $\mathcal{L}^*\pi = 0$ |
> | $dX_t = -X_t^3 dt + dB_t$ | $\pi(x) = C e^{-x^2/2}$ | Double-well potential |
> | $dX_t = \mu(\theta - X_t) dt + \sigma dB_t$ | $\pi(x) = \sqrt{\frac{2\mu}{\pi\sigma^2}} e^{-2\mu(x-\theta)^2/\sigma^2}$ | Mean-reverting |

> The general method for $dX_t = b(X_t) dt + \sigma(X_t) dB_t$ is to solve:

> $$
> -\partial_x (b(x)\pi(x)) + \frac{1}{2} \partial_{xx} (\sigma^2(x)\pi(x)) = 0
> $$

> These stationary distributions represent the long-term equilibrium states of the diffusion processes, providing insight into the asymptotic behavior of stochastic systems.

> **CIR Process Forward Equation**

> For the Cox-Ingersoll-Ross process $dX_t = \kappa(\theta - X_t) dt + \sigma \sqrt{X_t} dB_t$, the Fokker-Planck equation is:

> $$
> \partial_t p = \partial_x [(\kappa(\theta - x))p] + \frac{1}{2} \partial_{xx} (\sigma^2 x p)
> $$

> When $2\kappa\theta > \sigma^2$, the stationary distribution is:

> $$
> \pi(x) = C x^{\alpha-1} e^{-\beta x}, \quad \alpha = \frac{2\kappa\theta}{\sigma^2}, \quad \beta = \frac{2\kappa}{\sigma^2}
> $$

> Computing $\mathcal{L}^*\pi$ term by term verifies the stationary condition. The parameter conditions ensure positivity and integrability, connecting this distribution to the non-central chi-squared distribution. This process is fundamental in finance for modeling interest rates and volatility.

> **Non-Uniqueness Without Lipschitz Conditions**

> For the SDE $dX_t = \mid X_t \mid^\alpha dB_t$ with $\alpha \in (0,1)$, pathwise uniqueness fails. Multiple solutions exist from $X_0 = 0$: the trivial solution $X_t \equiv 0$ and the non-trivial solution $X_t = \left( \int_0^t \mid B_s \mid^{2\alpha/(1-\alpha)} ds \right)^{(1-\alpha)/2}$. Weak uniqueness holds, but strong solutions do not. This demonstrates that Lipschitz conditions are essential for pathwise uniqueness, as guaranteed by the Yamada-Watanabe theorem.

> **Explosion in Finite Time**

> For the SDE $dX_t = X_t^2 dt + dB_t$, the linear growth condition fails:

> $$
> \mid b(t,x) \mid = x^2 \not\leq K(1+\mid x \mid)
> $$

> The exact solution is:

> $$
> X_t = \frac{x_0 + B_t}{1 - x_0 t - \int_0^t B_s ds}
> $$

> The explosion time is:

> $$
> \tau = \frac{1}{x_0 + \sup_{s\leq t} B_s}
> $$

> The probability of explosion is $\mathbb{P}(\tau < T) > 0$ for any $T > 0$, demonstrating that solutions can reach infinity in finite time when the growth condition is violated. This highlights the importance of the linear growth condition in ensuring global existence of solutions.

## References

* Evans, L. C. (2010). *Partial Differential Equations*. American Mathematical Society.
* Karatzas, I., & Shreve, S. E. (1991). *Brownian Motion and Stochastic Calculus*. Springer.
* Øksendal, B. (2003). *Stochastic Differential Equations: An Introduction with Applications*. Springer.
* Revuz, D., & Yor, M. (2004). *Continuous Martingales and Brownian Motion*. Springer.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 5.1 Stochastic Calculus Foundations]({{ '/diffequations/chapter-05/05-1-stochastic-calculus/' | relative_url }})
- [Next Section: 5.3 Geometric Stochastic Analysis]({{ '/diffequations/chapter-05/05-3-geometric-stochastic/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-05/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
