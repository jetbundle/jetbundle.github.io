---
layout: textbook
title: "Section 5.6: SPDEs & Regularity Structures"
description: "Hairer's regularity structures, renormalization"
permalink: /diffequations/chapter-05/05-6-spdes/
order: 5.6
chapter: 5
section: 6
nav_order: 5.6
is_chapter_index: false
parent_chapter: 5
parent_section: null
---

# Section 5.6: SPDEs & Regularity Structures

> Regularity structures replace classical Taylor expansions with expansions in "noise monomials," transforming the analytic impossibility of singular products into a geometric study of decorated trees and structure groups.

## Introduction

We now address the most profound analytical crisis in modern probability theory: the ill-posedness of nonlinear stochastic partial differential equations (SPDEs). In the previous sections, we established that stochastic trajectories are inherently rough, requiring the machinery of rough paths to define integration. However, when noise depends on both space and time—spacetime white noise—the singularity of the driving signal exceeds the capacity of classical distribution theory.

Standard analytical methods fail because the solution $u$ to a stochastic PDE is expected to have the same regularity as the driving noise $\xi$. If $\xi$ is a distribution rather than a function, the nonlinear term (such as $u \cdot \xi$ or $u^2$) requires the multiplication of distributions. As shown by Schwartz, there is no associative multiplication of distributions that extends the product of continuous functions. Consequently, equations such as the Kardar-Parisi-Zhang (KPZ) equation or the Parabolic Anderson Model are not merely hard to solve; they are mathematically meaningless without a renormalization procedure that subtracts infinite counterterms.

This section constructs the Theory of Regularity Structures, a framework that replaces the classical Taylor expansion with an expansion in terms of "noise monomials." This resolves the renormalization problem algebraically, transforming the analytic impossibility of singular products into a geometric study of decorated trees and structure groups.

## Mathematical Content

### The Parabolic Anderson Model and the Product Problem

We motivate the discussion with the Parabolic Anderson Model (PAM), which describes the evolution of a field $u(t,x)$ subject to diffusion and multiplicative growth proportional to a random potential $\xi$:

$$\partial_t u = \Delta u + u \xi, \quad u(0,x) = u_0(x)$$

where $\xi$ is spacetime white noise on the torus $\mathbb{T}^d$. The covariance of the noise is given by $\mathbb{E}[\xi(t,x)\xi(s,y)] = \delta(t-s)\delta(x-y)$. In the language of microlocal analysis (see Chapter 7.2), the noise $\xi$ has negative regularity. Specifically, in $d$ spatial dimensions, the realization of $\xi$ almost surely belongs to the Hölder-Besov space $\mathcal{C}^\alpha$ for any $\alpha < -d/2 - 1$.

For the parabolic operator $(\partial_t - \Delta)$, Schauder estimates suggest that the solution $u$ should have regularity two degrees higher than the noise. Thus, $u \in \mathcal{C}^{\alpha+2}$. To define the product $u \cdot \xi$ in the distributional sense, the sum of regularities must be positive: $(\alpha+2) + \alpha > 0$. This implies $\alpha > -1$.

This condition holds in one spatial dimension ($d=1$) only if the noise is extremely regularized, but fails for true white noise where $\alpha \approx -3/2$. In dimensions $d \ge 2$, the divergence is catastrophic. The product $u\xi$ contains "resonant" terms where the high frequencies of $u$ and $\xi$ reinforce each other to produce infinite averages.

To resolve this, we first examine the **Wick Renormalization** in the Gaussian context. If we approximate the noise by a smooth function $\xi_\varepsilon$ (via convolution with a mollifier), the solution $u_\varepsilon$ diverges as $\varepsilon \to 0$. However, the renormalized product $:u\xi:$ is defined by subtracting the mean value of the interaction, which corresponds to an infinite energy shift. This topic is covered extensively in Da Prato & Debussche (2003) and serves as the precursor to the general algebraic theory.

### Regularity Structures: The Algebraic Foundation

Martin Hairer's Theory of Regularity Structures generalizes the concept of a Taylor expansion. In classical calculus, a function $f$ is approximated near a point $x$ by a polynomial $P(y) = \sum a_n (y-x)^n$. The basis vectors $\{1, (y-x), (y-x)^2 \dots\}$ allow us to abstract "regularity" as coefficients in a vector space.

For SPDEs, the polynomial basis is insufficient because the solution locally looks like the noise and its iterated convolutions, not like a line or parabola. We therefore replace the polynomial ring with a **Model Space** $T$, a graded vector space spanned by **decorated trees**.

A **Regularity Structure** is a triple $\mathscr{T} = (A, T, G)$ consisting of:

**An Index Set** $A \subset \mathbb{R}$: A set of homogeneities (degrees) bounded from below, describing the scaling behavior of the basis elements.

**The Model Space** $T = \bigoplus_{\alpha \in A} T_\alpha$: A Banach space containing the abstract symbols representing the noise and its integrals. For the PAM, $T$ contains symbols $\Xi$ (representing $\xi$), $\mathcal{I}(\Xi)$ (representing the convolution with the heat kernel), and higher-order trees like $\Xi \mathcal{I}(\Xi)$.

**The Structure Group** $G$: A group of linear transformations acting on $T$, which encodes the "re-centering" of expansions. This generalizes the translation of Taylor polynomials from one base point to another.

This algebraic framework is covered extensively in Hairer (2014).

### The Model and the Reconstruction Theorem

The connection between the abstract algebra of trees and the analytic reality of distributions is established via the **Model**, denoted by $(\Pi, \Gamma)$.

The map $\Pi_x: T \to \mathcal{D}'(\mathbb{R}^{d+1})$ assigns to each abstract tree $\tau \in T$ a concrete distribution $\Pi_x \tau$ centered at spacetime point $x$. For example, if $\mathbf{1}$ is the unit element of the algebra, $\Pi_x \mathbf{1}$ is the constant function 1. If $\Xi$ is the noise symbol, $\Pi_x \Xi$ is the realization of the white noise itself.

Crucially, the Model must satisfy analytical bounds analogous to Hölder conditions. For a basis vector $\tau \in T_\alpha$, the concrete distribution $\Pi_x \tau$ must satisfy:

$$\mid (\Pi_x \tau)(\varphi_x^\lambda) \mid \lesssim \lambda^\alpha$$

where $\varphi_x^\lambda$ is a test function scaled by $\lambda$ and centered at $x$. This formalizes the idea that the "degree" $\alpha$ represents the local roughness of the fluctuation.

The **Reconstruction Theorem** is the fundamental result of the theory. It states that given a coherent family of local expansions satisfying the proper analytical bounds, there exists a unique global distribution $U$ that matches these local descriptions "to the order of the expansion." This generalizes the Whitney Extension Theorem to the setting of distributions and allows us to glue local noise approximations into a global solution.

$$\mid (U - \Pi_x U(x))(\varphi_x^\lambda) \mid \lesssim \lambda^\gamma$$

where $\gamma$ is the order of the expansion. This theorem allows us to define the "solution" map $\mathcal{S}$ which takes a Model and produces the solution to the fixed-point equation.

### Renormalization Group and Fixed Point Problems

The physical content of the theory appears in the renormalization group flow. The construction of the canonical Model $(\Pi, \Gamma)$ based on the raw noise $\xi$ is often ill-defined because the product of distributions $\Pi_x(\tau_1) \cdot \Pi_x(\tau_2)$ may not exist.

We introduce a **Renormalization Group** $\mathcal{R}$ acting on the space of Models. The operation $M \mapsto M^R$ transforms the model by subtracting polynomial parts from the singular trees. This algebraic subtraction corresponds exactly to the infinite counterterms required in the Lagrangian formulation of quantum field theory (Chapter 1.7).

The solution to the singular SPDE is then found via a fixed-point argument in the space of "modeled distributions" $\mathcal{D}^\gamma$, spaces of functions that look locally like elements of the Model $T$. The abstract fixed point equation is:

$$U = \mathcal{K}_\gamma (\Xi + U \Xi) + P$$

where $\mathcal{K}_\gamma$ is the lift of the heat kernel to the regularity structure and $P$ represents polynomial initial data.

By proving that the renormalization group flow possesses a fixed point (or a coherent limit), we establish the existence of solutions to the original SPDE. For the KPZ equation, this explains the "universality" of the scaling limits: the equation is the fixed point of the renormalization flow under the scaling transformation.

The development of this theory demonstrates that the divergences encountered in Chapter 1 are not analytical failures, but rather indications that we were working in the wrong vector space. The solution lives not in a space of functions, but in a space of distributions modeled on a specific Hopf algebra of trees. This prepares us for the final ascent in Chapter 7, where we will see that these "trees" and "counterterms" are manifestations of the alien calculus of resurgence.

## Complete Examples

### Example 5.6.1: The Parabolic Anderson Model—Wick Renormalization

**Problem:** Consider the 1D Parabolic Anderson Model on the torus $\mathbb{T} = [0,2\pi]$:

$$\partial_t u = \partial_{xx} u + u \xi, \quad u(0,x) = 1$$

where $\xi(t,x)$ is spacetime white noise with $\mathbb{E}[\xi(t,x)\xi(s,y)] = \delta(t-s)\delta(x-y)$.

**Solution:**

Approximate $\xi$ by mollified noise $\xi_\varepsilon(t,x) = \xi * \rho_\varepsilon$, where $\rho_\varepsilon(z) = \varepsilon^{-2} \rho(z/\varepsilon)$ and $\int \rho = 1$. The mild solution satisfies the fixed-point equation:

$$
u_\varepsilon(t,x) = 1 + \int_0^t \int_{\mathbb{T}} p_{t-s}(x-y) u_\varepsilon(s,y) \xi_\varepsilon(s,y) \, dy \, ds
$$

where $p_t(x) = \frac{1}{\sqrt{4\pi t}} e^{-x^2/(4t)}$ is the heat kernel.

Picard iteration begins with $u_\varepsilon^{(0)}(t,x) = 1$:

$$
u_\varepsilon^{(1)}(t,x) = 1 + \int_0^t \int p_{t-s}(x-y) \xi_\varepsilon(s,y) \, dy \, ds
$$

$$
u_\varepsilon^{(2)}(t,x) = 1 + \int_0^t \int p_{t-s}(x-y) u_\varepsilon^{(1)}(s,y) \xi_\varepsilon(s,y) \, dy \, ds
$$

The first iterate (linear response) is:

$$
u_\varepsilon^{(1)}(t,x) = 1 + \mathcal{I}(\xi_\varepsilon)(t,x)
$$

where $\mathcal{I}(f)(t,x) = \int_0^t \int p_{t-s}(x-y) f(s,y) \, dy \, ds$. The second iterate is:

$$
u_\varepsilon^{(2)}(t,x) = 1 + \mathcal{I}(\xi_\varepsilon) + \mathcal{I}(\xi_\varepsilon \cdot \mathcal{I}(\xi_\varepsilon))
$$

Computing the variance $\mathbb{E}[u_\varepsilon^{(2)}(t,x)^2]$:

$$
\mathbb{E}[u_\varepsilon^{(2)}]^2 = 1 + 2\mathbb{E}[\mathcal{I}(\xi_\varepsilon)] + \mathbb{E}[\mathcal{I}(\xi_\varepsilon)^2] + 2\mathbb{E}[\mathcal{I}(\xi_\varepsilon \cdot \mathcal{I}(\xi_\varepsilon))] + \mathbb{E}[\mathcal{I}(\xi_\varepsilon \cdot \mathcal{I}(\xi_\varepsilon))^2]
$$

The critical term is $\mathbb{E}[\mathcal{I}(\xi_\varepsilon)^2]$:

$$
\mathbb{E}[\mathcal{I}(\xi_\varepsilon)^2] = \mathbb{E}\left[\int_0^t \int_0^t \int_{\mathbb{T}^2} p_{t-s}(x-y) p_{t-r}(x-z) \xi_\varepsilon(s,y) \xi_\varepsilon(r,z) \, dy \, dz \, ds \, dr\right]
$$

Using the white noise covariance:

$$
\mathbb{E}[\mathcal{I}(\xi_\varepsilon)^2] = \int_0^t \int_{\mathbb{T}} p_{t-s}(x-y)^2 * \rho_\varepsilon * \rho_\varepsilon(0) \, dy \, ds
$$

As $\varepsilon \to 0$, $\rho_\varepsilon * \rho_\varepsilon(0) \sim \varepsilon^{-2}$, yielding:

$$
\mathbb{E}[\mathcal{I}(\xi_\varepsilon)^2] \sim \frac{C}{\varepsilon}
$$

The variance diverges as $\varepsilon^{-1}$, revealing the fundamental singularity that requires renormalization.

Wick renormalization defines the renormalized noise:

$$
\xi_\varepsilon^\text{ren}(t,x) = \xi_\varepsilon(t,x) - \mathbb{E}[\xi_\varepsilon(t,x)^2] = \xi_\varepsilon(t,x) - \frac{C}{\varepsilon}
$$

The renormalized solution is:

$$
u_\varepsilon^\text{ren}(t,x) = 1 + \int_0^t \int p_{t-s}(x-y) u_\varepsilon^\text{ren}(s,y) \xi_\varepsilon^\text{ren}(s,y) \, dy \, ds
$$

This yields $\mathbb{E}[u_\varepsilon^\text{ren}(t,x)] \to 1$ and $\text{Var}(u_\varepsilon^\text{ren}) \to \text{finite limit}$, demonstrating that subtracting the divergent mean restores well-posedness.

### Example 5.6.2: Regularity Structure for PAM—Tree Construction

**Goal:** Construct the regularity structure for PAM and solve the fixed-point equation symbolically.

**Solution:**

Define the index set and generators. The index set is $A = \{0, -1/2 - \kappa, 1/2 - \kappa\} \cup \{\mid \tau \mid : \tau \in T\}$ where $\kappa > 0$ is small.

   Abstract symbols: $\mathbf{1} \in T_0$ (constant function), $\Xi \in T_{-1/2-\kappa}$ (white noise), and $\mathcal{I}(\tau) \in T_{\mid \tau \mid + 2}$ (integration against heat kernel).

   Generate trees up to order 3. Level 1: $\Xi \in T_{-1/2-\kappa}$. Level 2: $\mathcal{I}(\Xi) \in T_{3/2-\kappa}$. Level 3: $\mathcal{I}(\Xi \cdot \mathcal{I}(\Xi)) \in T_{5/2-2\kappa}$ and $\mathcal{I}(\Xi)^2 \in T_{3-\kappa}$. Level 4 (relevant for nonlinearity): $\mathcal{I}(\Xi \cdot \mathcal{I}(\Xi \cdot \mathcal{I}(\Xi))) \in T_{7/2-3\kappa}$.

   The structure group $G$ acts by "re-centering." For a tree $\tau$, the action is $(\Pi_x \tau)(z) = \Pi_x \tau(z-x) + \text{polynomial correction}$. Explicit computation for $\mathcal{I}(\Xi)$: $[\Gamma_x \mathcal{I}(\Xi)]_z = \Pi_z \mathcal{I}(\Xi) - \Pi_x \mathcal{I}(\Xi)$.

   The fixed-point equation in the regularity structure is $U = \mathcal{I}(\Xi U) + \mathbf{1}$. Expanding in the regularity structure:

   $$
   U = u_{-1/2-\kappa} \Xi + u_{3/2-\kappa} \mathcal{I}(\Xi) + u_{5/2-2\kappa} \mathcal{I}(\Xi \cdot \mathcal{I}(\Xi)) + \cdots
   $$

   Substituting and collecting terms: at order $-1/2-\kappa$, $u_{-1/2-\kappa} = 0$ (no noise in solution); at order $3/2-\kappa$, $u_{3/2-\kappa} \mathcal{I}(\Xi) = \mathcal{I}(\Xi)$; at order $5/2-2\kappa$, $u_{5/2-2\kappa} \mathcal{I}(\Xi \cdot \mathcal{I}(\Xi)) = \mathcal{I}(\Xi \cdot \mathcal{I}(\Xi))$. Remarkably, $u_\alpha = 1$ for all trees appearing in the expansion, demonstrating the universality of the tree structure.

   For the renormalization of the quadratic term, the problematic term $\Xi \cdot \mathcal{I}(\Xi)$ has regularity $\mid \Xi \cdot \mathcal{I}(\Xi) \mid = -1/2-\kappa + 3/2-\kappa = 1-2\kappa > 0$. However, $\mathbb{E}[\Xi \cdot \mathcal{I}(\Xi)] = \infty$. Define the renormalized version:

   $$
   \Xi \cdot \mathcal{I}(\Xi) \mapsto \Xi \cdot \mathcal{I}(\Xi) - C
   $$

   where $C = \lim_{\varepsilon \to 0} \mathbb{E}[\Xi_\varepsilon \cdot \mathcal{I}(\Xi_\varepsilon)]$. This subtraction removes the infinite mean, making the product well-defined in the limit.

### Example 5.6.3: KPZ Equation—Universality and Subcriticality

**Problem:** Solve the KPZ equation in 1D:

$$\partial_t h = \frac{1}{2} \partial_{xx} h + \frac{1}{2} (\partial_x h)^2 + \xi$$

**Solution:**

The Cole-Hopf transformation sets $Z = e^h$. Then:

$$
\partial_t Z = \frac{1}{2} \partial_{xx} Z + Z \xi
$$

This is exactly the PAM equation. The solution is $h(t,x) = \log Z(t,x)$.

For the regularity structure construction, KPZ has parabolic scaling $[t] = 2$, $[x] = 1$, $[\xi] = -3/2-\kappa$, $[h] = -1/2-\kappa$. The trees are: $\Xi \in T_{-3/2-\kappa}$, $\mathcal{I}(\Xi) \in T_{1/2-\kappa}$, $\mathcal{I}(\Xi^2) \in T_{2-2\kappa}$, and $\mathcal{I}(\partial_x \mathcal{I}(\Xi) \cdot \partial_x \mathcal{I}(\Xi)) \in T_{1/2-2\kappa}$.

For the subcriticality check, consider the fixed-point equation $H = \mathcal{I}(\Xi + \frac{1}{2} (\partial_x H)^2)$:

| Term | Regularity | Subcritical? |
|------|------------|--------------|
| $\Xi$ | $-3/2-\kappa$ | Base case |
| $\partial_x H$ | $-3/2-\kappa$ | Derivative |
| $(\partial_x H)^2$ | $-3-\kappa$ | Quadratic |
| $\mathcal{I}((\partial_x H)^2)$ | $1-\kappa$ | Integration |

Since $1-\kappa > -3/2-\kappa$, each iteration improves regularity, ensuring convergence of the fixed-point iteration.

Renormalization constants are computed from divergent expectations:

$$
\mathbb{E}[\Xi^2] = \infty \quad \Rightarrow \quad \Xi^2 \mapsto \Xi^2 - C_0
$$

$$
\mathbb{E}[\partial_x \mathcal{I}(\Xi) \cdot \partial_x \mathcal{I}(\Xi)] = \infty \quad \Rightarrow \quad \text{requires } C_1
$$

For universality, consider the Edwards-Wilkinson equation with nonlinearities:

$$
\partial_t h^\lambda = \Delta h^\lambda + \lambda \mathcal{N}(h^\lambda) + \xi
$$

For $\mathcal{N}(h) = (\partial_x h)^2$, the scaling limit as mesh $\to 0$ converges to KPZ. The proof sketch: rescale $h^\lambda(t,x) = \varepsilon^{-1/2} h(\varepsilon^{-2}t, \varepsilon^{-1}x)$; the nonlinear term scales as $\varepsilon^{-1/2}$; the regularity structure absorbs all $\lambda$-dependence into renormalization constants; the fixed point is universal. This demonstrates that KPZ emerges as the universal scaling limit of a wide class of stochastic growth models, independent of the specific nonlinearity chosen.

### Example 5.6.4: Explicit Tree Expansion—2D PAM Failure and Rescue

**Problem:** Why does 2D PAM require more sophisticated renormalization?

**Solution:**

For regularity computation in 2D, the scaling is $[t] = 2$, $[x] = 1$, $\xi \in C^{-2-\kappa}$. The critical product is:

$$
\mid \Xi \cdot \mathcal{I}(\Xi) \mid = -2-\kappa + 2-\kappa = -2\kappa \approx 0
$$

The product is at the regularity threshold, making the situation critical.

For explicit divergence computation, the mollified expectation is:

$$
\mathbb{E}[\Xi_\varepsilon \cdot \mathcal{I}(\Xi_\varepsilon)(0,0)] = \int_0^T \int_{\mathbb{T}^2} p_t(y)^2 \rho_\varepsilon * \rho_\varepsilon(0) \, dy \, dt
$$

where $p_t(y) = \frac{1}{4\pi t} e^{-\mid y \mid^2/(4t)}$. The asymptotic is:

$$
\int_{\mathbb{T}^2} p_t(y)^2 \, dy \sim \frac{1}{4\pi t}
$$

Thus:

$$
\mathbb{E}[\Xi_\varepsilon \cdot \mathcal{I}(\Xi_\varepsilon)] \sim \frac{\log(1/\varepsilon)}{4\pi}
$$

The divergence is logarithmic, not a power law, reflecting the marginal nature of the 2D case.

The regularity structure rescue introduces auxiliary trees:

$$
\tau_1 = \Xi, \quad \tau_2 = \mathcal{I}(\tau_1), \quad \tau_3 = \mathcal{I}(\tau_1 \tau_2)
$$

The renormalized structure is:

$$
\tau_3 \mapsto \mathcal{I}(\tau_1 \tau_2 - C \log(1/\varepsilon) \mathbf{1})
$$

For fixed-point iteration with renormalization: $U^{(1)} = \mathcal{I}(\Xi)$, $U^{(2)} = \mathcal{I}(\Xi U^{(1)}) = \mathcal{I}(\Xi \cdot \mathcal{I}(\Xi))$, and $U^{(3)} = \mathcal{I}(\Xi U^{(2)}) = \mathcal{I}(\Xi \cdot \mathcal{I}(\Xi \cdot \mathcal{I}(\Xi)))$. The renormalized version is:

$$
U^{(3)\text{ren}} = \mathcal{I}\Big(\Xi \cdot \big(\mathcal{I}(\Xi \cdot \mathcal{I}(\Xi)) - C_1 \log(1/\varepsilon)\big)\Big)
$$

For the convergence proof in the modeled distribution space $\mathcal{D}^\gamma$ with $\gamma = -1/2-\kappa$:

| Iteration | Regularity Gain | Renormalized Term |
|-----------|----------------|-------------------|
| $U^{(1)}$ | $1/2-\kappa$ | None |
| $U^{(2)}$ | $3/2-2\kappa$ | $C_0$ |
| $U^{(3)}$ | $5/2-3\kappa$ | $C_1 \log(1/\varepsilon)$ |

Each iteration improves regularity by $2$, while renormalization subtracts exactly the divergent part, ensuring convergence via a contraction mapping argument.

### Example 5.6.5: Structure Group Computation—Explicit Model Construction

**Goal:** Construct the explicit model $(\Pi, \Gamma)$ for PAM.

**Solution:**

Define the realization $\Pi$ for a fixed noise realization $\xi$:

$$
\Pi(\mathbf{1}) = 1, \quad \Pi(\Xi) = \xi, \quad \Pi(\mathcal{I}(\tau))(t,x) = \int_0^t \int p_{t-s}(x-y) \Pi(\tau)(s,y) \, dy \, ds
$$

For the structure group element, translation by $z = (t_0,x_0)$:

$$
\Gamma_z \tau = \sum_{\sigma \preceq \tau} \Pi_z(\sigma) \cdot R_{z,\tau/\sigma}
$$

where $R_{z,\tau}$ is the "remainder" term. Explicit computation for $\mathcal{I}(\Xi)$:

$$
\Gamma_{(t_0,x_0)} \mathcal{I}(\Xi) = \Pi_{(t_0,x_0)}(\mathcal{I}(\Xi)) - \Pi_{(0,0)}(\mathcal{I}(\Xi))
$$

The model property requires $\Pi_z \Gamma_z \tau = \Pi_z \tau$ for all $z$. Verification for $\mathcal{I}(\Xi^2)$: compute $\Pi_z(\mathcal{I}(\Xi^2))$, apply $\Gamma_z$ subtracting local expectations, and verify translation invariance.

For the reconstruction theorem application, given local expansions:

$$
U(z) = \sum_{\mid \tau \mid < \gamma} \langle U \rangle_z(\tau) \Pi_z(\tau) + R_z
$$

The theorem states that there exists a unique $U \in \mathcal{D}'$ such that:

$$
\mid U(\phi_z^\lambda) - \sum_{\mid \tau \mid < \gamma} \langle U \rangle_z(\tau) \Pi_z(\tau)(\phi_z^\lambda) \mid \lesssim \lambda^\gamma
$$

The proof sketch involves local Whitney-type estimates, gluing via partition of unity, and consistency via structure group action. This theorem provides the rigorous foundation for reconstructing global distributions from local tree expansions.

## References

* Da Prato, G., & Debussche, A. (2003). *Strong solutions to the stochastic quantization equations*. Annals of Probability.
* Friz, P. K., & Hairer, M. (2014). *A Course on Rough Paths*. Springer.
* Hairer, M. (2014). *A Theory of Regularity Structures*. Inventiones mathematicae.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 5.5 Fractional Calculus & Nonlocal Operators]({{ '/diffequations/chapter-05/05-5-fractional-calculus/' | relative_url }})
- [Next Section: 5.7 Kinetic Theory & Mean-Field Games]({{ '/diffequations/chapter-05/05-7-kinetic-theory/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-05/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
