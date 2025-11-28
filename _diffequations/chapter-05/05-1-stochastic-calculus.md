---
layout: textbook
title: "Section 5.1: Stochastic Calculus Foundations"
description: "Itô integration, quadratic variation"
permalink: /diffequations/chapter-05/05-1-stochastic-calculus/
order: 5.1
chapter: 5
section: 1
nav_order: 5.1
is_chapter_index: false
parent_chapter: 5
parent_section: null
---

# Section 5.1: Stochastic Calculus Foundations

## Introduction

The progression of the previous chapters relied on the implicit assumption of smoothness. In the classical theory of differential equations, we assume that trajectories are differentiable manifolds and that functions admit Taylor expansions. However, physical reality often defies this assumption. Thermal fluctuations, quantum uncertainty, and complex feedback loops introduce a fundamental roughness to dynamics. This chapter abandons the comfort of $C^\infty$ regularity to construct a calculus for trajectories that are continuous but nowhere differentiable. We begin with the foundational theory of stochastic integration, specifically focusing on the breakdown of the classical chain rule and the emergence of the quadratic variation as a non-negligible geometric quantity.

## Mathematical Content

### Brownian Motion and the Failure of Classical Calculus

The fundamental object of study is the Brownian motion (or Wiener process), denoted $B_t$. Rigorously constructed as a limit of random walks or via the Kolmogorov continuity theorem, $B_t$ is characterized by independent, stationary Gaussian increments. Specifically, for any $0 \leq s < t$, the increment $B_t - B_s$ follows a normal distribution $\mathcal{N}(0, t-s)$.

While $B_t$ is almost surely continuous, its analytic properties are pathological compared to classical functions. As covered extensively in Karatzas & Shreve (1991), Brownian paths are nowhere differentiable. More precisely, the paths are locally Hölder continuous with exponent $\alpha$ for any $\alpha < 1/2$, but fail to be Hölder continuous for $\alpha \geq 1/2$. Consequently, the total variation of a Brownian path over any finite interval $[0, T]$ is infinite almost surely:

$$
\lim_{\|\Pi\| \to 0} \sum_{i} |B_{t_{i+1}} - B_{t_i}| = \infty,
$$

where $\Pi$ is a partition of the interval.

The infinite total variation renders the classical Lebesgue-Stieltjes integral $\int f(t) dB_t$ ill-defined. However, while the first variation diverges, the **quadratic variation** converges to a deterministic limit. For a sequence of partitions with mesh size going to zero, we have:

$$
[B]_t = \lim_{\|\Pi\| \to 0} \sum_{i} (B_{t_{i+1}} - B_{t_i})^2 = t \quad \text{a.s.}
$$

In the language of differentials, we write $(dB_t)^2 = dt$. This non-vanishing quadratic variation is the distinct geometric signature of stochastic processes, contrasting sharply with smooth functions where $(df)^2 = (f' dt)^2 = 0$ to first order in $dt$.

### Itô Integration

To define integration against Brownian motion, we must construct a new integral theory. Let $(\Omega, \mathcal{F}, P)$ be a probability space with a filtration $\mathcal{F}_t$. We consider the class of elementary (simple) processes $H_t$, which are piecewise constant on intervals $[t_i, t_{i+1})$ and adapted to the filtration $\mathcal{F}_{t_i}$ (meaning the value of $H$ on the interval depends only on information available at time $t_i$).

The **Itô integral** for such a simple process is defined as:

$$
I(H) = \int_0^T H_t dB_t = \sum_{i} H_{t_i} (B_{t_{i+1}} - B_{t_i}).
$$

Crucially, the integrand $H_{t_i}$ is evaluated at the *left* endpoint of the interval. This choice preserves the **martingale property**: the expectation of the increment, conditional on the present, is zero ($E[H_{t_i}(B_{t_{i+1}} - B_{t_i}) | \mathcal{F}_{t_i}] = H_{t_i} E[B_{t_{i+1}} - B_{t_i}] = 0$).

The construction is extended to general square-integrable adapted processes via the **Itô Isometry**, a central result in stochastic analysis discussed in Øksendal (2003). The isometry states that the $L^2$ norm of the integral is equal to the $L^2$ norm of the integrand over time:

$$
\mathbb{E}\left[ \left( \int_0^T H_t dB_t \right)^2 \right] = \mathbb{E}\left[ \int_0^T H_t^2 dt \right].
$$

This isometry allows us to define the Itô integral as an $L^2(\Omega)$-limit of integrals of elementary processes. Unlike the Riemann integral, which converges pointwise for smooth functions, the Itô integral converges in probability.

### The Itô Formula

The non-zero quadratic variation of Brownian motion forces a revision of the fundamental theorem of calculus. If we attempt to expand a smooth function $f(B_t)$ using a Taylor series, the second-order terms can no longer be discarded.

$$
f(B_{t+\Delta t}) - f(B_t) \approx f'(B_t)\Delta B_t + \frac{1}{2}f''(B_t)(\Delta B_t)^2.
$$

Since $(\Delta B_t)^2 \approx \Delta t$, the second derivative term contributes to the drift. The rigorous statement is **Itô's Lemma** (or the Itô Formula):

Let $X_t$ be an Itô process given by $dX_t = \mu_t dt + \sigma_t dB_t$, and let $f(t,x)$ be a function with continuous partial derivatives. Then:

$$
df(t, X_t) = \left( \frac{\partial f}{\partial t} + \mu_t \frac{\partial f}{\partial x} + \frac{1}{2} \sigma_t^2 \frac{\partial^2 f}{\partial x^2} \right) dt + \sigma_t \frac{\partial f}{\partial x} dB_t.
$$

The extra term $\frac{1}{2} \sigma_t^2 \frac{\partial^2 f}{\partial x^2} dt$ represents the convexity adjustment required due to the infinite variation of the path. In higher dimensions, for a vector of Itô processes $\mathbf{X}_t$, the formula generalizes involving the Hessian of $f$:

$$
df = \left( \nabla f \cdot d\mathbf{X}_t \right) + \frac{1}{2} \text{Tr}\left( \mathbf{H}_f d[\mathbf{X}, \mathbf{X}]_t \right),
$$

where $d[\mathbf{X}, \mathbf{X}]_t$ is the covariance matrix of the driving noise.

### Stratonovich Integration and the Wong-Zakai Theorem

While the Itô integral is essential for probabilistic estimates due to its martingale property, it fails to satisfy the classical chain rule of differential geometry. This poses a problem when defining stochastic processes on manifolds, where coordinate invariance is required.

To address this, we introduce the **Stratonovich integral**, denoted by $\circ dB_t$. It is defined by evaluating the integrand at the midpoint of the interval (or taking the limit of the trapezoidal rule):

$$
\int_0^T H_t \circ dB_t = \lim_{\|\Pi\| \to 0} \sum_{i} \frac{H_{t_{i+1}} + H_{t_i}}{2} (B_{t_{i+1}} - B_{t_i}).
$$

The Stratonovich integral satisfies the standard chain rule of calculus: $df(B_t) = f'(B_t) \circ dB_t$. However, Stratonovich integrals are generally not martingales; they contain a "look-ahead" bias.

The relationship between the two integrals is given by a specific conversion formula involving the quadratic covariation:

$$
\int_0^T H_t \circ dB_t = \int_0^T H_t dB_t + \frac{1}{2} [H, B]_T.
$$

If $H_t = \sigma(B_t)$, then $[H, B]_t = \int \sigma'(B_t) dt$, yielding the familiar correction term from Itô's formula.

The physical justification for the Stratonovich integral is provided by the **Wong-Zakai Theorem**, extensively covered in Revuz & Yor (2004). This theorem states that if we approximate white noise $dB_t$ by a smooth, colored noise $B_t^{(n)}$ (e.g., via piecewise linear interpolation) and solve the corresponding ODEs, the solutions converge to the Stratonovich solution of the SDE, not the Itô solution. Thus, the Stratonovich calculus is the natural limit of smooth dynamical systems with short correlation times, while Itô calculus is the natural language of martingales and intrinsic noise.

## Complete Examples

### Example 5.1.1: Canonical Case—Quadratic Variation of Brownian Motion

**Problem:** Compute the quadratic variation of Brownian motion $B_t$ over $[0, T]$ explicitly.

**Step-by-Step Solution:**

1. **Partition Setup:**
Consider a partition $\Pi_n = \{0 = t_0 < t_1 < \dots < t_n = T\}$ with mesh size $\|\Pi_n\| = \max_i (t_{i+1} - t_i) \to 0$.

2. **Quadratic Variation Sum:**
$$
Q_n = \sum_{i=0}^{n-1} (B_{t_{i+1}} - B_{t_i})^2
$$

3. **Expectation Calculation:**
$$
\mathbb{E}[Q_n] = \sum_{i=0}^{n-1} \mathbb{E}[(B_{t_{i+1}} - B_{t_i})^2] = \sum_{i=0}^{n-1} (t_{i+1} - t_i) = T
$$

4. **Variance Calculation:**
For independent increments:
$$
\text{Var}(Q_n) = \sum_{i=0}^{n-1} \text{Var}[(B_{t_{i+1}} - B_{t_i})^2]
$$

Since $(B_{t_{i+1}} - B_{t_i}) \sim \mathcal{N}(0, t_{i+1} - t_i)$:
$$
\text{Var}[(B_{t_{i+1}} - B_{t_i})^2] = 2(t_{i+1} - t_i)^2
$$

Therefore:
$$
\text{Var}(Q_n) = 2 \sum_{i=0}^{n-1} (t_{i+1} - t_i)^2 \leq 2 \|\Pi_n\| T \to 0
$$

5. **Convergence Result:**
By Chebyshev's inequality:
$$
P(|Q_n - T| > \epsilon) \leq \frac{\text{Var}(Q_n)}{\epsilon^2} \to 0
$$

**Final Result:**
$$
[B]_T = \lim_{\|\Pi_n\| \to 0} Q_n = T \quad \text{a.s.}
$$

**Key Insight:** The quadratic variation is deterministic, unlike the path itself!

### Example 5.1.2: Itô Integral—Elementary Process

**Problem:** Compute $\int_0^T B_t dB_t$ using the Itô definition.

**Step-by-Step Solution:**

1. **Approximation by Simple Process:**
For partition $\Pi_n = \{0 = t_0 < t_1 < \dots < t_n = T\}$, define:
$$
H_t^{(n)} = \sum_{i=0}^{n-1} B_{t_i} \mathbf{1}_{[t_i, t_{i+1})}(t)
$$

2. **Itô Integral for Simple Process:**
$$
I_n = \int_0^T H_t^{(n)} dB_t = \sum_{i=0}^{n-1} B_{t_i} (B_{t_{i+1}} - B_{t_i})
$$

3. **Algebraic Manipulation:**
Use the identity:
$$
B_{t_i}(B_{t_{i+1}} - B_{t_i}) = \frac{1}{2}[(B_{t_{i+1}})^2 - (B_{t_i})^2 - (B_{t_{i+1}} - B_{t_i})^2]
$$

4. **Telescoping Sum:**
$$
I_n = \sum_{i=0}^{n-1} B_{t_i}(B_{t_{i+1}} - B_{t_i}) = \frac{1}{2} \sum_{i=0}^{n-1} [(B_{t_{i+1}})^2 - (B_{t_i})^2] - \frac{1}{2} \sum_{i=0}^{n-1} (B_{t_{i+1}} - B_{t_i})^2
$$

$$
= \frac{1}{2} B_T^2 - \frac{1}{2} \sum_{i=0}^{n-1} (B_{t_{i+1}} - B_{t_i})^2
$$

5. **Limit as Partition Refines:**
$$
\lim_{\|\Pi_n\| \to 0} I_n = \frac{1}{2} B_T^2 - \frac{1}{2} [B]_T = \frac{1}{2} B_T^2 - \frac{1}{2} T
$$

**Final Result:**
$$
\int_0^T B_t dB_t = \frac{1}{2} B_T^2 - \frac{1}{2} T
$$

**Key Insight:** The extra term $-T/2$ is the Itô correction! Classical calculus would give $B_T^2/2$.

### Example 5.1.3: Itô's Formula—Geometric Brownian Motion

**Problem:** Apply Itô's formula to compute $d(e^{B_t})$.

**Step-by-Step Solution:**

1. **Setup:**
Let $f(x) = e^x$ and $X_t = B_t$ (so $\mu_t = 0$, $\sigma_t = 1$).

2. **Itô's Formula:**
$$
df(B_t) = \left( \frac{\partial f}{\partial t} + \mu_t \frac{\partial f}{\partial x} + \frac{1}{2} \sigma_t^2 \frac{\partial^2 f}{\partial x^2} \right) dt + \sigma_t \frac{\partial f}{\partial x} dB_t
$$

3. **Compute Derivatives:**
- $\frac{\partial f}{\partial t} = 0$
- $\frac{\partial f}{\partial x} = e^{B_t}$
- $\frac{\partial^2 f}{\partial x^2} = e^{B_t}$

4. **Substitute:**
$$
de^{B_t} = \left( 0 + 0 + \frac{1}{2} \cdot 1^2 \cdot e^{B_t} \right) dt + 1 \cdot e^{B_t} dB_t
$$

$$
= \frac{1}{2} e^{B_t} dt + e^{B_t} dB_t
$$

5. **Integral Form:**
$$
e^{B_t} = 1 + \int_0^t \frac{1}{2} e^{B_s} ds + \int_0^t e^{B_s} dB_s
$$

**Key Insight:** The drift term $\frac{1}{2} e^{B_t} dt$ is the convexity adjustment!

### Example 5.1.4: Physical Application—Geometric Brownian Motion for Stock Prices

**Problem:** Derive the Black-Scholes model using Itô's formula.

**Setup:** Stock price $S_t$ follows geometric Brownian motion:

$$
dS_t = \mu S_t dt + \sigma S_t dB_t
$$

**Step-by-Step Solution:**

1. **Apply Itô's Formula to $\ln S_t$:**
Let $f(x) = \ln x$, so $f'(x) = 1/x$, $f''(x) = -1/x^2$.

2. **Itô's Formula:**
$$
d(\ln S_t) = \left( 0 + \mu S_t \cdot \frac{1}{S_t} + \frac{1}{2} \sigma^2 S_t^2 \cdot \left(-\frac{1}{S_t^2}\right) \right) dt + \sigma S_t \cdot \frac{1}{S_t} dB_t
$$

$$
= \left( \mu - \frac{\sigma^2}{2} \right) dt + \sigma dB_t
$$

3. **Integrate:**
$$
\ln S_t = \ln S_0 + \left( \mu - \frac{\sigma^2}{2} \right) t + \sigma B_t
$$

4. **Exponentiate:**
$$
S_t = S_0 \exp\left( \left( \mu - \frac{\sigma^2}{2} \right) t + \sigma B_t \right)
$$

5. **Expected Value:**
$$
\mathbb{E}[S_t] = S_0 e^{\mu t}
$$

**Key Insight:** The drift correction $-\sigma^2/2$ ensures the expected return is $\mu$!

### Example 5.1.5: Stratonovich vs Itô—Explicit Comparison

**Problem:** Compute $\int_0^T B_t \circ dB_t$ (Stratonovich) and compare to Itô integral.

**Step-by-Step Solution:**

1. **Stratonovich Definition:**
$$
\int_0^T B_t \circ dB_t = \lim_{\|\Pi_n\| \to 0} \sum_{i=0}^{n-1} \frac{B_{t_{i+1}} + B_{t_i}}{2} (B_{t_{i+1}} - B_{t_i})
$$

2. **Algebraic Manipulation:**
$$
\frac{B_{t_{i+1}} + B_{t_i}}{2} (B_{t_{i+1}} - B_{t_i}) = \frac{1}{2}[(B_{t_{i+1}})^2 - (B_{t_i})^2]
$$

3. **Telescoping Sum:**
$$
\sum_{i=0}^{n-1} \frac{B_{t_{i+1}} + B_{t_i}}{2} (B_{t_{i+1}} - B_{t_i}) = \frac{1}{2} \sum_{i=0}^{n-1} [(B_{t_{i+1}})^2 - (B_{t_i})^2] = \frac{1}{2} B_T^2
$$

4. **Final Result:**
$$
\int_0^T B_t \circ dB_t = \frac{1}{2} B_T^2
$$

5. **Comparison:**
- **Itô:** $\int_0^T B_t dB_t = \frac{1}{2} B_T^2 - \frac{1}{2} T$
- **Stratonovich:** $\int_0^T B_t \circ dB_t = \frac{1}{2} B_T^2$

**Conversion Formula Verification:**
$$
\int_0^T B_t \circ dB_t = \int_0^T B_t dB_t + \frac{1}{2} [B, B]_T = \left(\frac{1}{2} B_T^2 - \frac{T}{2}\right) + \frac{1}{2} T = \frac{1}{2} B_T^2 \quad ✓
$$

**Key Insight:** Stratonovich satisfies the classical chain rule!

### Example 5.1.6: Advanced Demonstration—Itô's Formula in Higher Dimensions

**Problem:** Apply Itô's formula to $f(X_t, Y_t)$ where:

$$
dX_t = \mu_X dt + \sigma_X dB_t^{(1)}, \quad dY_t = \mu_Y dt + \sigma_Y dB_t^{(2)}
$$

with correlation $d[B^{(1)}, B^{(2)}]_t = \rho dt$.

**Step-by-Step Solution:**

1. **Itô's Formula (2D):**
$$
df(X_t, Y_t) = \frac{\partial f}{\partial x} dX_t + \frac{\partial f}{\partial y} dY_t + \frac{1}{2} \left[ \frac{\partial^2 f}{\partial x^2} (dX_t)^2 + 2 \frac{\partial^2 f}{\partial x \partial y} dX_t dY_t + \frac{\partial^2 f}{\partial y^2} (dY_t)^2 \right]
$$

2. **Quadratic Variations:**
- $(dX_t)^2 = \sigma_X^2 dt$
- $(dY_t)^2 = \sigma_Y^2 dt$
- $dX_t dY_t = \sigma_X \sigma_Y \rho dt$

3. **Substitute:**
$$
df = \frac{\partial f}{\partial x} (\mu_X dt + \sigma_X dB_t^{(1)}) + \frac{\partial f}{\partial y} (\mu_Y dt + \sigma_Y dB_t^{(2)})
$$

$$
+ \frac{1}{2} \left[ \frac{\partial^2 f}{\partial x^2} \sigma_X^2 + 2 \frac{\partial^2 f}{\partial x \partial y} \sigma_X \sigma_Y \rho + \frac{\partial^2 f}{\partial y^2} \sigma_Y^2 \right] dt
$$

4. **Example: $f(x,y) = xy$**
- $\frac{\partial f}{\partial x} = y$, $\frac{\partial f}{\partial y} = x$
- $\frac{\partial^2 f}{\partial x^2} = 0$, $\frac{\partial^2 f}{\partial x \partial y} = 1$, $\frac{\partial^2 f}{\partial y^2} = 0$

$$
d(X_t Y_t) = Y_t dX_t + X_t dY_t + \sigma_X \sigma_Y \rho dt
$$

**Key Insight:** The correlation term $\sigma_X \sigma_Y \rho dt$ is the cross-variation contribution!

### Example 5.1.7: Itô Isometry Verification

**Problem:** Verify the Itô isometry for $H_t = B_t$.

**Step-by-Step Solution:**

1. **Left Side:**
$$
\mathbb{E}\left[ \left( \int_0^T B_t dB_t \right)^2 \right] = \mathbb{E}\left[ \left( \frac{1}{2} B_T^2 - \frac{T}{2} \right)^2 \right]
$$

2. **Expand:**
$$
= \frac{1}{4} \mathbb{E}[B_T^4] - \frac{T}{2} \mathbb{E}[B_T^2] + \frac{T^2}{4}
$$

3. **Use Gaussian Moments:**
- $\mathbb{E}[B_T^2] = T$
- $\mathbb{E}[B_T^4] = 3T^2$ (since $B_T \sim \mathcal{N}(0, T)$)

4. **Compute:**
$$
= \frac{1}{4} \cdot 3T^2 - \frac{T}{2} \cdot T + \frac{T^2}{4} = \frac{3T^2}{4} - \frac{T^2}{2} + \frac{T^2}{4} = \frac{T^2}{2}
$$

5. **Right Side:**
$$
\mathbb{E}\left[ \int_0^T B_t^2 dt \right] = \int_0^T \mathbb{E}[B_t^2] dt = \int_0^T t dt = \frac{T^2}{2}
$$

**Verification:** Both sides equal $\frac{T^2}{2}$ ✓

### Example 5.1.8: Wong-Zakai Theorem—Smooth Approximation

**Problem:** Demonstrate that smooth approximations converge to Stratonovich integrals.

**Setup:** Approximate $dB_t$ by smooth process $B_t^{(n)}$ with piecewise linear interpolation.

**Step-by-Step Solution:**

1. **Smooth Approximation:**
For partition $\Pi_n$, define:
$$
B_t^{(n)} = B_{t_i} + \frac{t - t_i}{t_{i+1} - t_i} (B_{t_{i+1}} - B_{t_i}), \quad t \in [t_i, t_{i+1})
$$

2. **ODE Solution:**
Solve $dX_t^{(n)} = X_t^{(n)} dB_t^{(n)}$ (smooth ODE):

$$
X_t^{(n)} = X_0 \exp(B_t^{(n)})
$$

3. **Limit as $n \to \infty$:**
The Wong-Zakai theorem states:
$$
\lim_{n \to \infty} X_t^{(n)} = X_t^{\text{Stratonovich}}
$$

where $X_t^{\text{Stratonovich}}$ solves:
$$
dX_t = X_t \circ dB_t
$$

4. **Verification:**
Using Stratonovich chain rule:
$$
d(\ln X_t) = \frac{1}{X_t} \circ dX_t = \circ dB_t
$$

$$
\ln X_t = B_t \implies X_t = X_0 e^{B_t}
$$

**Key Insight:** Smooth approximations naturally select Stratonovich calculus!

## References

* Karatzas, I., & Shreve, S. E. (1991). *Brownian Motion and Stochastic Calculus*. Springer.
* Øksendal, B. (2003). *Stochastic Differential Equations: An Introduction with Applications*. Springer.
* Revuz, D., & Yor, M. (2004). *Continuous Martingales and Brownian Motion*. Springer.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 4.8 Nonlocal Symmetries & Potential Systems]({{ '/diffequations/chapter-04/04-8-nonlocal-symmetries/' | relative_url }})
- [Next Section: 5.2 SDEs & Diffusion Processes]({{ '/diffequations/chapter-05/05-2-sdes/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-05/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
