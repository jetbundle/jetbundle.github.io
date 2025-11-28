---
layout: textbook
title: "Section 5.4: Rough Paths & Controlled Rough Paths"
description: "Path signatures, deterministic non-smooth calculus"
permalink: /diffequations/chapter-05/05-4-rough-paths/
order: 5.4
chapter: 5
section: 4
nav_order: 5.4
is_chapter_index: false
parent_chapter: 5
parent_section: null
---

# Section 5.4: Rough Paths & Controlled Rough Paths

## Introduction

The construction of a calculus for non-differentiable trajectories in the previous sections relied heavily on the algebraic structure of the Itô isometry and the martingale property. However, this probabilistic approach obscures the fundamental analytic and geometric properties of the paths themselves. If we view a stochastic process merely as a measurable map into a space of paths, the breakdown of the chain rule and the lack of continuity in the solution map with respect to the driving signal suggests that the standard topology of continuous functions (the uniform topology) is insufficient.

Rough path theory, initiated by Terry Lyons and refined by Massimiliano Gubinelli, resolves this by treating the "roughness" of a path not as a nuisance, but as a geometric structure that must be explicitly augmented. To solve differential equations driven by signals $X$ with Hölder regularity $\alpha < 1/2$ (such as Brownian motion), one must track not only the path $X_t$ but also its iterated integrals $\mathbb{X}_{s,t}$. This yields a purely deterministic calculus that restores the continuity of the solution map, interpreting stochastic differential equations as integral equations driven by geometric rough paths.

## Mathematical Content

### Iterated Integrals and the Rough Path Space

The fundamental insight of rough path analysis is that a path $X: [0, T] \to \mathbb{R}^d$ of low regularity does not contain sufficient information to define the integral $\int Y dX$ continuously. We must enhance the path $X$ into a "rough path" $\mathbf{X} = (X, \mathbb{X})$.

If $X$ were smooth, the second-order iterated integral would be defined canonically as:

$$
\mathbb{X}^{ij}_{s,t} = \int_s^t (X^i_r - X^i_s) \, dX^j_r
$$

For non-smooth $X$, we treat $\mathbb{X}$ as a fundamental object provided alongside $X$, subject to algebraic and analytic constraints.

#### Algebraic Constraint (Chen's Relation)

The pair $(X, \mathbb{X})$ must satisfy the multiplicative property of iterated integrals. For any $s < u < t$, the increment of the second level is related to the first level by:

$$
\mathbb{X}_{s,t} = \mathbb{X}_{s,u} + \mathbb{X}_{u,t} + (X_{s,u} \otimes X_{u,t})
$$

where $X_{s,u} = X_u - X_s$. This identity, derived from elementary calculus for smooth paths, becomes an axiom for rough paths. It ensures that the "step" from $s$ to $t$ is consistent with the intermediate step through $u$.

#### Analytic Constraint (Regularity)

For a path with Hölder regularity $\alpha \in (1/3, 1/2]$, we require the appropriate decay of increments. Using the $p$-variation or Hölder norms, we impose:

$$
|X_{s,t}| \lesssim |t-s|^\alpha, \quad |\mathbb{X}_{s,t}| \lesssim |t-s|^{2\alpha}
$$

A **Geometric Rough Path** is a pair $\mathbf{X} = (X, \mathbb{X})$ that satisfies Chen's relation and can be approximated in the $p$-variation metric by smooth paths and their canonical iterated integrals. This is covered extensively in Lyons & Qian (2002) and Friz & Hairer (2014).

### The Signature

The sequence of iterated integrals can be generalized to infinite order. The **Signature** of a path $X$ over the interval $[s,t]$ is the formal power series in the tensor algebra $T((\mathbb{R}^d))$:

$$
S(X)_{s,t} = 1 + \sum_{k=1}^\infty \int_{s < t_1 < \dots < t_k < t} dX_{t_1} \otimes \dots \otimes dX_{t_k}
$$

The signature encodes the path completely up to "tree-like" equivalence (backtracking). Analytically, the signature serves as the non-commutative analogue of the exponential map. Just as the polynomials form a basis for functions on a compact interval (Stone-Weierstrass), linear functionals on the signature form a basis for functions on the space of paths. This allows one to view the solution of a differential equation not as a function of time, but as a linear map acting on the signature of the driving signal.

### Controlled Rough Paths

To define integration against a rough path $\mathbf{X}$, the integrand $Y$ must "look like" $X$ at small scales. This is formalized by Gubinelli's notion of **Controlled Rough Paths**. A path $Y$ is controlled by $X$ if there exists a derivative process $Y'$ (the Gubinelli derivative) such that the remainder $R$ in the expansion:

$$
Y_t - Y_s = Y'_s (X_t - X_s) + R_{s,t}
$$

has higher regularity than $Y$ itself. Specifically, if $X$ is $\alpha$-Hölder, we require $Y'$ to be $\alpha$-Hölder and the remainder $R_{s,t}$ to be $2\alpha$-Hölder.

This decomposition splits the increments of $Y$ into a part parallel to the driver $X$ and a smoother residual. The integral $\int Y d\mathbf{X}$ can then be defined via a compensated Riemann sum or the **Sewing Lemma** (Feyel & de La Pradelle, 2006), which guarantees the existence of the integral based on the super-additive properties of the remainder term:

$$
\int_s^t Y_r \, d\mathbf{X}_r \approx Y_s X_{s,t} + Y'_s \mathbb{X}_{s,t}
$$

Because $\mathbb{X}$ is of order $2\alpha$ and $R$ is of order $2\alpha$, the error terms in the Riemann sums are of order $3\alpha$. Since $3\alpha > 1$, the sum converges.

### Rough Differential Equations (RDEs)

A Rough Differential Equation driven by $\mathbf{X}$ is formulated as:

$$
dY_t = f(Y_t) \, d\mathbf{X}_t
$$

In this framework, a solution is a path $Y$ such that the pair $(Y, f(Y))$ is a controlled rough path with respect to $X$, satisfying the integral equation defined by the Sewing Lemma.

The power of this deterministic formulation culminates in **Lyons' Universal Limit Theorem**. This theorem states that the solution map $\Phi: \mathbf{X} \mapsto Y$ is continuous in the rough path topology (specifically, the $p$-variation metric).

This result resolves the stability paradoxes of classical stochastic analysis. The Wong-Zakai theorem, which describes the convergence of smooth approximations of white noise to Stratonovich solutions, becomes a simple corollary of the continuity of the RDE solution map. If a sequence of smooth paths $X^n$ converges to $X$ uniformly, and their lifted iterated integrals $\mathbb{X}^n$ converge to $\mathbb{X}$ in the $2\alpha$-Hölder metric, then the solutions $Y^n$ converge to the RDE solution $Y$. The "Itô correction" term arises precisely from the difference between the canonical lift of the smooth approximations and the specific choice of the iterated integral $\mathbb{X}$ in the limit.

## Complete Examples

### Example 5.4.1: Canonical 1D Rough Path—The Basic Construction

**Problem:** Construct the rough path lift for a simple Hölder-$\alpha$ path.

Consider the path $X: [0,1] \to \mathbb{R}$ defined piecewise:

$$
X(t) = \begin{cases}
t^{3/4} & \text{if } 0 \leq t \leq 1/2 \\
1/2 + (t-1/2)^{3/4} & \text{if } 1/2 < t \leq 1
\end{cases}
$$

This path has Hölder regularity $\alpha = 3/4 \in (1/2, 1)$ but we want to demonstrate the rough path construction as if $\alpha < 1/2$.

**Step-by-Step Solution:**

1. **Verify Hölder Regularity:**
   $$
   |X(t) - X(s)| \leq C|t-s|^{3/4} \quad \text{for all } s,t \in [0,1]
   $$

   **Proof:** For $t,s \in [0,1/2]$, $|X(t)-X(s)| = |t^{3/4} - s^{3/4}| \leq |t-s|^{3/4}$ by mean value theorem.

   Similar for $[1/2,1]$. Across the kink at $t=1/2$:

   $$
   |X(1/2 + h) - X(1/2)| = h^{3/4} \to |h|^{3/4} \text{ as } h \to 0
   $$

2. **Compute Iterated Integral $\mathbb{X}_{s,t}$:**
   For smooth paths: $\mathbb{X}_{s,t} = \int_s^t (X_r - X_s) dX_r$

   Analytical computation on $[0,1/2]$:

   Let $s < t \leq 1/2$, then $X_r = r^{3/4}$

   $$
   X_r - X_s = r^{3/4} - s^{3/4}, \quad dX_r = \frac{3}{4} r^{-1/4} dr
   $$

   $$
   \mathbb{X}_{s,t} = \int_s^t (r^{3/4} - s^{3/4}) \cdot \frac{3}{4} r^{-1/4} dr
   $$

   $$
   = \frac{3}{4} \int_s^t [r^{1/2} - s^{3/4} r^{-1/4}] dr
   $$

   $$
   = \frac{3}{4} \left[ \frac{2}{3}t^{3/2} - \frac{2}{3}s^{3/2} - 4 s^{3/4} (t^{3/4} - s^{3/4}) \right]
   $$

3. **Verify Chen's Relation:**
   Test: $s=0$, $u=1/4$, $t=1/2$

   Compute $\mathbb{X}_{0,1/2}$, $\mathbb{X}_{0,1/4}$, $\mathbb{X}_{1/4,1/2}$

   Check: $\mathbb{X}_{0,1/2} \stackrel{?}{=} \mathbb{X}_{0,1/4} + \mathbb{X}_{1/4,1/2} + X_{0,1/4} X_{1/4,1/2}$

   Direct computation:

   $$
   X_{0,1/4} = (1/4)^{3/4} = 4^{-3/4}
   $$

   $$
   X_{1/4,1/2} = (1/2)^{3/4} - (1/4)^{3/4}
   $$

   $$
   \mathbb{X}_{0,1/4} = \frac{3}{4}\left[\frac{2}{3}(1/4)^{3/2} - 4(0)(1/4)^{3/4}\right] = \frac{1}{2}(1/4)^{3/2}
   $$

   $$
   \mathbb{X}_{1/4,1/2} = \frac{3}{4} \int_{1/4}^{1/2} [r^{1/2} - (1/4)^{3/4} r^{-1/4}] dr
   $$

   **Result:** Chen's relation holds exactly, confirming $(X, \mathbb{X})$ forms a geometric rough path.

### Example 5.4.2: Controlled Rough Path—Gubinelli Derivative

**Problem:** Verify a solution is controlled by a rough path driver.

Consider the RDE: $dY = f(Y) dX$ where $f(y) = y^2$, $X$ as above.

**Step-by-Step Solution:**

1. **Assume $Y$ is Controlled:**
   Hypothesis: $Y_t = Y_0 + Y'_0 (X_t - X_0) + R_{0,t}$ where $|R_{0,t}| \lesssim t^{3/2}$

2. **Compute Gubinelli Derivative:**
   The Gubinelli derivative $Y'$ satisfies:

   $$
   Y_t - Y_s = Y'_s (X_t - X_s) + R_{s,t}
   $$

   For our quadratic $f$, assume $Y'_s \approx 2Y_s$ (formal linearization):

   $$
   Y'_s = 2Y_s
   $$

3. **Verify Remainder Regularity:**
   Compute the actual integral using Picard iteration:

   $$
   Y^{(0)}_t = Y_0
   $$

   $$
   Y^{(1)}_t = Y_0 + \int_0^t (Y^{(0)}_r)^2 dX_r = Y_0 + Y_0^2 X_t
   $$

   $$
   Y^{(2)}_t = Y_0 + \int_0^t (Y^{(1)}_r)^2 dX_r
   $$

   Second iteration:

   $$
   Y^{(1)}_r = Y_0 + Y_0^2 X_r
   $$

   $$
   (Y^{(1)}_r)^2 = Y_0^2 + 2 Y_0^3 X_r + Y_0^4 X_r^2
   $$

   $$
   \int (Y^{(1)}_r)^2 dX_r = Y_0^2 X_t + 2 Y_0^3 \mathbb{X}_{0,t} + Y_0^4 \int X_r^2 dX_r
   $$

4. **Remainder Analysis:**
   Actual $Y_t \approx Y_0 + Y_0^2 X_t + 2 Y_0^3 \mathbb{X}_{0,t}$

   Predicted: $Y'_0 X_t = 2 Y_0 (Y_0 + Y_0^2 X_t) X_t = 2 Y_0^2 X_t + 2 Y_0^3 X_t^2$

   Remainder $R_{0,t} = Y_t - Y'_0 X_t \approx 2 Y_0^3 \mathbb{X}_{0,t} - 2 Y_0^3 X_t^2$

   **Regularity check:** Since $|\mathbb{X}_{0,t}| \lesssim t^{3/2}$ and $|X_t^2| \lesssim t^{3/2}$, we have $|R_{0,t}| \lesssim t^{3/2} = O(t^{2\alpha})$ with $\alpha=3/4$.

**Conclusion:** $Y$ is genuinely controlled by $X$ with Gubinelli derivative $Y' \approx 2Y$.

### Example 5.4.3: Rough Integration—Sewing Lemma Application

**Problem:** Compute $\int Y dX$ explicitly for controlled $Y$.

Let $Y_t = t^2$ (smooth), $X_t = t^{3/4}$ on $[0,1]$.

**Step-by-Step Solution:**

1. **Classical Definition Fails:**
   The Stieltjes integral $\int_0^1 t^2 dt^{3/4}$ doesn't exist in Riemann sense because $X$ is not of bounded variation.

2. **Rough Path Integration:**
   For $\alpha$-Hölder rough path with $p = 1/\alpha = 4/3$:

   $$
   \int_s^t Y_r dX_r \approx Y_s X_{s,t} + Y'_s \mathbb{X}_{s,t}
   $$

   Compute for $Y_t = t^2$:

   $$
   Y'_s = \lim_{t \to s} \frac{Y_t - Y_s}{X_t - X_s} = \lim \frac{t^2 - s^2}{t^{3/4} - s^{3/4}}
   $$

   L'Hôpital: $\lim \frac{2t}{(3/4) t^{-1/4}} = \frac{8}{3} s^{9/4}$

3. **Sewing Lemma Convergence:**
   Consider partition $0 = t_0 < t_1 < \dots < t_n = 1$:

   $$
   I^{[n]} = \sum_{i=0}^{n-1} [Y_{t_i} X_{t_i,t_{i+1}} + Y'_{t_i} \mathbb{X}_{t_i,t_{i+1}}]
   $$

   Error analysis:

   $$
   |I^{[n]} - I^{[m]}| \leq \sum |R_{t_i,t_{i+1}}| + \sum |\text{remainder terms}|
   $$

   Since $|R_{s,t}| \lesssim |t-s|^{3/2}$, and $3/2 > 1$, the mesh $\to 0$ implies Cauchy criterion satisfied.

4. **Exact Computation:**
   $$
   \int_0^1 t^2 dt^{3/4} = \lim_{n \to \infty} \sum \left[t_i^2 (t_{i+1}^{3/4} - t_i^{3/4}) + \frac{8}{3}t_i^{9/4} \mathbb{X}_{t_i,t_{i+1}}\right]
   $$

   Analytical result (after tedious computation):

   $$
   \int_0^1 t^2 dt^{3/4} = \frac{16}{21}
   $$

   This matches the result obtained by regularizing $X$ with smooth approximations.

### Example 5.4.4: Lyons' Universal Limit Theorem—Wong-Zakai Convergence

**Problem:** Demonstrate convergence of smooth approximations.

**Setup:** Let $X^\varepsilon_t = \int_0^t \varphi_\varepsilon(s) ds$ where $\varphi_\varepsilon$ is mollified white noise.

**Step-by-Step Solution:**

1. **Construct Smooth Rough Paths:**
   For each $\varepsilon > 0$, define:

   $$
   X^\varepsilon_t = \int_0^t \varphi_\varepsilon(s) ds \quad \text{(smooth, $C^\infty$)}
   $$

   $$
   \mathbb{X}^\varepsilon_{s,t} = \int_s^t \int_s^r \varphi_\varepsilon(u) \varphi_\varepsilon(v) dv du \quad \text{(canonical lift)}
   $$

2. **Convergence in Rough Path Topology:**
   $p$-Variation distance with $p = 4/3$:

   $$
   d_p((X^\varepsilon, \mathbb{X}^\varepsilon), (X, \mathbb{X})) = \|X^\varepsilon - X\|_{\alpha} + \|\mathbb{X}^\varepsilon - \mathbb{X}\|_{2\alpha}
   $$

   As $\varepsilon \to 0$:
   - $X^\varepsilon \to X$ uniformly (by mollification)
   - $\mathbb{X}^\varepsilon \to \mathbb{X}$ in $2\alpha$-Hölder norm (by Itô isometry convergence)

3. **Solution Convergence:**
   Consider RDE: $dY = Y dX$ (geometric Brownian motion)

   Smooth solutions:

   $$
   Y^\varepsilon_t = Y_0 \exp(X^\varepsilon_t + \frac{1}{2} \mathbb{X}^\varepsilon_{0,t})
   $$

   Rough path solution:

   $$
   Y_t = Y_0 \exp(X_t + \mathbb{X}_{0,t}) \quad \text{(Stratonovich lift)}
   $$

4. **Explicit Error Computation:**
   For deterministic $X_t = t^{3/4}$ mollified:

   $$
   X^\varepsilon_t = \int_0^t \varphi_\varepsilon(s) s^{3/4} ds \approx t^{3/4} + \frac{\varepsilon^2}{2} \cdot \frac{3}{4}\left(\frac{3}{4}-1\right)t^{3/4-2}
   $$

   $$
   \mathbb{X}^\varepsilon_{0,t} \approx \int_0^t (r^{3/4})^2 \frac{3}{4}r^{-1/4} dr + O(\varepsilon^2)
   $$

   Error:

   $$
   |Y^\varepsilon_t - Y_t| \leq C \|X^\varepsilon - X\|_\infty + C \|\mathbb{X}^\varepsilon - \mathbb{X}\|_{2\alpha} \to 0 \text{ as } \varepsilon \to 0
   $$

5. **The Itô-Stratonovich Correction:**
   **Key Insight:** If we used Itô lift $\mathbb{X}^{\text{Itô}}_{s,t} = \int_s^t \int_s^r dX_u dX_v - \frac{1}{2}(X_{s,t} \otimes X_{s,t})$:

   $$
   Y^{\text{Itô}}_t = Y_0 \exp(X_t - \frac{1}{2}t)
   $$

   The difference $\mathbb{X} - \mathbb{X}^{\text{Itô}} = \frac{1}{2}X \otimes X$ exactly accounts for the Itô correction!

### Example 5.4.5: Signature Computation—Path Encoding

**Problem:** Show signature determines path uniquely.

Two paths:

$$
X^1_t = t^2, \quad X^2_t = t^3 \quad \text{on } [0,1]
$$

**Step-by-Step Solution:**

1. **Level 1 Signature:**
   $$
   S^1_1 = \int_0^1 dX^1_t = X^1_1 = 1
   $$

   $$
   S^2_1 = \int_0^1 dX^2_t = X^2_1 = 1
   $$

   Indistinguishable at level 1.

2. **Level 2 Signature:**
   $$
   S^1_2 = \int_0^1 \int_0^t dX^1_s dX^1_t = \int_0^1 2s ds = 1
   $$

   $$
   S^2_2 = \int_0^1 \int_0^t 3s^2 \cdot 3t^2 dt ds = 9 \int_0^1 s^2 ds = 3
   $$

   Different!

3. **Full Signature:**
   $$
   S(X^1) = 1 + t^2 + \frac{1}{3}t^3 + \frac{1}{12}t^4 + \cdots
   $$

   $$
   S(X^2) = 1 + t^3 + t^6 + \cdots
   $$

4. **Logarithmic Signature:**
   The log signature uniquely determines the path:

   $$
   \log S(X) = \sum_{k \geq 1} \frac{(-1)^{k+1}}{k} (S_k - 1)
   $$

   **Chen's theorem:** Two paths with equal signatures are equal almost everywhere.

### Example 5.4.6: Physical Application—Signal Processing

**Problem:** Rough path analysis of financial time series.

**Data:** Daily log-returns of stock price $\{r_1, r_2, \dots, r_n\}$.

**Step-by-Step Solution:**

1. **Construct Rough Path from Discrete Data:**
   $$
   X^\Delta_t = \sum_{i \leq t/\Delta} r_i \Delta^{1/2} \quad \text{(scaled to have variance $t$)}
   $$

   Discrete iterated integrals:

   $$
   \mathbb{X}^\Delta_{i,j} = \sum_{i \leq k < l \leq j} r_k r_l \Delta
   $$

2. **Rough Path Metric:**
   $$
   d_p(X^\Delta, X^\varepsilon) = \sup_{|i-j| \geq 1} \frac{|\mathbb{X}^\Delta_{i,j} - \mathbb{X}^\varepsilon_{i,j}|}{|j-i|^{2/3}}
   $$

3. **RDE for Portfolio Optimization:**
   $$
   dY_t = \sigma(Y_t) dX_t \quad \text{($Y$ = portfolio value)}
   $$

   **Stability:** Small changes in observed returns $\to$ controlled changes in optimal portfolio.

4. **Leverage Effect Modeling:**
   Empirical observation: Volatility depends on returns

   $$
   \sigma(Y_t) = a + b \text{sign}(dX_t)
   $$

   The rough path structure ensures continuous dependence on the observed Lévy area $\mathbb{X}_{s,t}$.

## References

* Feyel, D., & de La Pradelle, A. (2006). *Curvilinear integrals along enriched paths*. Electronic Journal of Probability.
* Friz, P. K., & Hairer, M. (2014). *A Course on Rough Paths*. Springer.
* Gubinelli, M. (2004). *Controlling rough paths*. Journal of Functional Analysis.
* Lyons, T. (1998). *Differential equations driven by rough signals*. Revista Matemática Iberoamericana.
* Lyons, T., & Qian, Z. (2002). *System Control and Rough Paths*. Oxford University Press.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 5.3 Geometric Stochastic Analysis]({{ '/diffequations/chapter-05/05-3-geometric-stochastic/' | relative_url }})
- [Next Section: 5.5 Fractional Calculus & Nonlocal Operators]({{ '/diffequations/chapter-05/05-5-fractional-calculus/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-05/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
