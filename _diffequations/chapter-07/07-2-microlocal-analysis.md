---
layout: textbook
title: "Section 7.2: Microlocal Analysis & Wave Front Sets"
description: "Singularities in phase space"
permalink: /diffequations/chapter-07/07-2-microlocal-analysis/
order: 7.2
chapter: 7
section: 2
nav_order: 7.2
is_chapter_index: false
parent_chapter: 7
parent_section: null
---

## Introduction

In Chapter 2, we established the theory of distributions to handle singular solutions, identifying the **singular support** of a distribution $u$ as the set of points $x$ where $u$ is not smooth. However, this spatial localization is insufficient for hyperbolic dynamics. As observed in Chapter 3 via geometric optics, singularities do not simply exist at locations; they propagate along specific trajectories determined by momentum or frequency.

Microlocal analysis resolves this by lifting the analysis from the base manifold $X$ to the cotangent bundle $T^*X$. By localizing distributions not just in position space (via test functions) but simultaneously in frequency space (via the Fourier transform), we construct the **Wave Front Set**. This object refines the singular support, assigning to every singularity a specific direction of propagation. This development allows us to treat differential operators as algebraic objects—**pseudodifferential operators**—acting on the phase space, rigorously justifying the ray optics and bicharacteristic flows encountered in earlier chapters.

## Mathematical Content

### The Wave Front Set

The classical Fourier transform is global; it analyzes frequency content but destroys local spatial information. To analyze local regularity, we must localize the Fourier transform. A distribution $u \in \mathcal{D}'(X)$ is smooth at a point $x_0$ if, after multiplying by a smooth cutoff function $\phi \in C_c^\infty(X)$ with $\phi(x_0) \neq 0$, the Fourier transform $\widehat{\phi u}(\xi)$ decays rapidly in all directions as $\vert \xi \vert \to \infty$.

A singularity occurs when this rapid decay fails. The wave front set identifies precisely *in which directions* the decay fails.

**Definition 7.2.1 (Wave Front Set).** Let $X$ be a smooth manifold and $u \in \mathcal{D}'(X)$. A point $(x_0, \xi_0) \in T^*X \setminus \{0\}$ is **not** in the wave front set $WF(u)$ if there exists a neighborhood $U$ of $x_0$, a conic neighborhood $\Gamma$ of $\xi_0$, and a test function $\phi \in C_c^\infty(U)$ with $\phi(x_0) = 1$ such that for all $N \in \mathbb{N}$, there exists a constant $C_N$ satisfying:

$$\vert \widehat{\phi u}(\xi) \vert \leq C_N (1 + \vert \xi \vert)^{-N}$$

for all $\xi \in \Gamma$.

The wave front set $WF(u)$ is the complement of such points in $T^*X \setminus \{0\}$. It is a closed, conic subset of the cotangent bundle. The projection of $WF(u)$ onto the base manifold $X$ recovers the singular support:

$$\pi(WF(u)) = \text{sing supp}(u).$$

This definition provides the rigorous language to describe "directional singularities." For example, the Dirac delta function $\delta(x)$ is singular at $x=0$, but its Fourier transform is constant (no decay in any direction). Thus, $WF(\delta) = \{(0, \xi) : \xi \neq 0\}$, the entire fiber above the origin. Conversely, a plane wave distribution oscillating in direction $\xi_0$ has a wave front set concentrated solely at that direction.

In the algebraic framework of Kashiwara (1995), this concept generalizes to the **microsupport** of a sheaf, allowing these analytic techniques to extend to the combinatorial and topological settings of constructible sheaves discussed in Section 7.3.

### Pseudodifferential Operators

To manipulate wave front sets, we must generalize differential operators. A linear partial differential operator $P(x, D) = \sum a_\alpha(x) D^\alpha$ acts on the Fourier side as multiplication by a polynomial $P(x, \xi)$. If we relax the requirement that the symbol be a polynomial and allow general smooth functions $a(x, \xi)$ with specific growth conditions, we obtain **pseudodifferential operators** ($\Psi$DOs).

**Definition 7.2.2 (Symbol Classes).** The symbol class $S^m_{1,0}(X)$, denoted $S^m$, consists of smooth functions $a(x, \xi)$ on $T^*X$ satisfying the estimates:

$$\vert D_\xi^\alpha D_x^\beta a(x, \xi) \vert \leq C_{\alpha, \beta} (1 + \vert \xi \vert)^{m - \vert \alpha \vert}$$

for all multi-indices $\alpha, \beta$. The index $m$ is the order of the operator.

A pseudodifferential operator $A = \text{Op}(a)$ associated with a symbol $a \in S^m$ is defined by the oscillatory integral:

$$Au(x) = (2\pi)^{-n} \int_{\mathbb{R}^n} e^{i \langle x, \xi \rangle} a(x, \xi) \hat{u}(\xi) \, d\xi.$$

This class includes all differential operators, parametrices of elliptic operators, and singular integral operators.

The algebraic power of $\Psi$DOs lies in their closure under composition. If $A = \text{Op}(a)$ and $B = \text{Op}(b)$, their composition $A \circ B$ is a pseudodifferential operator with symbol $a \# b$. The **composition formula** provides an asymptotic expansion for this new symbol:

$$(a \# b)(x, \xi) \sim \sum_{\alpha} \frac{i^{-\vert \alpha \vert}}{\alpha!} \partial_\xi^\alpha a(x, \xi) \partial_x^\alpha b(x, \xi).$$

This non-commutative product on the algebra of symbols corresponds to the quantization of the phase space. The leading term is the pointwise product $a(x, \xi)b(x, \xi)$, implying that to leading order, operators commute. The lower-order terms encode the non-commutativity arising from the Heisenberg uncertainty principle ($[x, \xi] \neq 0$).

These operators are **microlocal**: they preserve the wave front set. Specifically, for any $A \in \Psi^m$ and $u \in \mathcal{D}'(X)$:

$$WF(Au) \subseteq WF(u) \cap \text{cone}(\text{supp}(a)).$$

This property allows us to construct operators that cut out specific parts of phase space, isolating singularities directionally.

### Propagation of Singularities

The central triumph of microlocal analysis is the rigorous description of how singularities move. In Chapter 3, we utilized the method of characteristics to solve hyperbolic equations. We now reframe this using the geometry of the cotangent bundle.

Let $P$ be a pseudodifferential operator of order $m$ with principal symbol $p_m(x, \xi)$. The **characteristic set** of $P$ is the zero set of the principal symbol:

$$\text{Char}(P) = \{ (x, \xi) \in T^*X \setminus \{0\} : p_m(x, \xi) = 0 \}.$$

For a differential operator, this is precisely the set where the operator fails to be elliptic.

On the characteristic set, the symbol $p_m$ defines a Hamiltonian vector field $H_{p_m}$:

$$H_{p_m} = \sum_{j=1}^n \left( \frac{\partial p_m}{\partial \xi_j} \frac{\partial}{\partial x_j} - \frac{\partial p_m}{\partial x_j} \frac{\partial}{\partial \xi_j} \right).$$

The integral curves of this vector field are called **bicharacteristics** (or null bicharacteristics). These are curves in phase space $(x(t), \xi(t))$ along which the principal symbol vanishes.

**Theorem 7.2.1 (Propagation of Singularities, Hörmander).** Let $P \in \Psi^m$ have a real principal symbol. If $Pu = f$ where $f \in C^\infty$, then $WF(u)$ is invariant under the bicharacteristic flow. That is, if $(x_0, \xi_0) \in WF(u)$, then the entire bicharacteristic strip passing through $(x_0, \xi_0)$ is contained in $WF(u)$.

This theorem provides the complete geometric picture of hyperbolic dynamics:

1. **Elliptic Regularity:** If $(x, \xi) \notin \text{Char}(P)$, then $p_m(x, \xi) \neq 0$. The operator is microlocally invertible, so no singularities can exist there. $WF(u) \subseteq \text{Char}(P)$.

2. **Hyperbolic Propagation:** Inside $\text{Char}(P)$, singularities cannot disappear or spontaneously appear; they must transport along the Hamiltonian flow lines.

This result rigorously validates the geometric optics of Chapter 3. The "rays" of optics are simply the spatial projections of the bicharacteristics in $T^*X$. The wave front set explains why shadows have sharp edges and why focusing (caustics) occurs when the projection of the Lagrangian manifold of bicharacteristics becomes singular. By lifting the analysis to phase space, we resolve the intersection of dynamics and singularities.

## Complete Examples

### Example 7.2.1: Canonical Example—Dirac Delta Function

**Problem:** Compute $WF(\delta)$ where $\delta(x) = \delta(x_1)$ in $\mathbb{R}^2$.

**Step-by-Step Solution:**

1. **Local Test:**
   Take $\phi(x_1,x_2) = \psi(x_1)\chi(x_2)$ with $\psi(0) = 1$, $\chi(0) = 1$.

2. **Fourier Transform:**
   $$\widehat{\phi \delta}(\xi_1,\xi_2) = \int \phi(x_1,x_2) \delta(x_1) e^{-i(x_1\xi_1 + x_2\xi_2)} dx = \psi(0)\chi(0) = 1$$

3. **Decay Analysis:**
   $\vert \widehat{\phi \delta}(\xi) \vert = 1$ for all $(\xi_1,\xi_2) \neq (0,0)$.

4. **Conclusion:**
   No conic neighborhood $\Gamma$ exists where rapid decay occurs.

5. **Wave Front Set:**
   $$WF(\delta) = \{(0,\xi_1,\xi_2) \in T^*\mathbb{R}^2 : (\xi_1,\xi_2) \neq (0,0)\}$$

The Dirac delta function exhibits a unique wave front structure: it is singular at the single point $x=0$, but this singularity manifests in all frequency directions simultaneously. Unlike smooth functions whose wave front sets are empty, or functions with directional singularities that have wave front sets concentrated along specific directions, the delta function's wave front set spans the entire cotangent fiber above the origin. This reflects the fact that the delta function contains all frequencies equally, as its Fourier transform is constant. The wave front set thus captures both the spatial location of the singularity (at $x=0$) and its complete lack of frequency localization (all $\xi \neq 0$).

### Example 7.2.2: Physical Application—Plane Wave

**Problem:** Compute $WF(u)$ where $u(x) = e^{i\xi_0 \cdot x}$.

**Step-by-Step Solution:**

1. **Local Test:**
   $\phi(x) = \phi_0(x)$ with $\phi_0(0) = 1$.

2. **Fourier Transform:**
   $$\widehat{\phi_0 u}(\xi) = \int \phi_0(x) e^{i(\xi_0 - \xi) \cdot x} dx = \widehat{\phi_0}(\xi - \xi_0)$$

3. **Decay Analysis:**
   **Around $\xi = \xi_0$:** $\vert \widehat{\phi_0 u}(\xi_0 + \eta) \vert = \vert \widehat{\phi_0}(\eta) \vert \leq C_N (1+\vert \eta \vert)^{-N}$.

   **Away from $\xi_0$:** $\vert \widehat{\phi_0 u}(\xi) \vert = \vert \widehat{\phi_0}(\xi - \xi_0) \vert$ decays rapidly.

4. **Wave Front Set:**
   $$WF(u) = \{(x_0, \xi_0) : x_0 \in \mathbb{R}^n\}$$

Plane waves demonstrate how oscillations in a specific direction create a wave front set that is distributed throughout space but concentrated in that single frequency direction. The function $e^{i\xi_0 \cdot x}$ oscillates with frequency $\xi_0$ at every point in space, making it singular in the sense that it does not decay in any direction. However, the singularity is highly directional: the wave front set consists of all points $(x, \xi_0)$ where $x$ is arbitrary but $\xi$ is fixed at $\xi_0$. This structure reflects the fact that plane waves are eigenfunctions of translation, with the wave front set encoding both the global nature of the oscillation (present everywhere) and its specific frequency content (only direction $\xi_0$). This example illustrates how the wave front set provides a refined description of singularities that distinguishes between spatial and frequency localization.

### Example 7.2.3: Advanced Demonstration—Characteristic Function

**Problem:** Compute $WF(u)$ where $u(x) = H(x_1)$ (Heaviside function).

**Step-by-Step Solution:**

1. **Singularity Location:**
   Jump at $x_1 = 0$.

2. **Fourier Analysis:**
   $$\widehat{H}(\xi_1) = \pi \delta(\xi_1) - i \text{P.V.} \frac{1}{\xi_1}$$

3. **Local Analysis near $(0,\xi_1,0)$:**
   Take $\phi(x_1,x_2) = \psi(x_1)\chi(x_2)$.

   $$\widehat{\phi H}(\xi_1,\xi_2) \sim \int_{-\infty}^0 \psi(x_1) e^{-ix_1\xi_1} dx_1$$

4. **Decay Analysis:**
   **For $\xi_1 > 0$ large:** Boundary term dominates, decay like $1/\vert \xi_1 \vert$.

   **For $\xi_1 < 0$ large:** Rapid decay.

5. **Wave Front Set:**
   $$WF(H) = \{(0,\xi_1,0) : \xi_1 > 0\}$$

The Heaviside function reveals a fundamental asymmetry in how jump discontinuities propagate: the wave front set is concentrated only on the forward-facing side of the discontinuity. When a function has a jump at a surface, the Fourier transform exhibits slow decay in directions normal to that surface. However, the direction matters: for the Heaviside function $H(x_1)$, the wave front set contains only points with $\xi_1 > 0$, corresponding to the direction in which the jump occurs (from 0 to 1 as $x_1$ increases). This directional selectivity reflects the causal structure of the discontinuity: information about the jump propagates forward along the normal direction, not backward. This phenomenon is fundamental to understanding how singularities in hyperbolic equations propagate along characteristics, with the wave front set encoding both the location of the discontinuity and its direction of propagation.

### Example 7.2.4: Canonical $\Psi$DO—Hilbert Transform

**Problem:** Verify that the Hilbert transform is a $\Psi$DO of order 0.

**Definition:** $H f(x) = \text{P.V.} \int \frac{f(y)}{x-y} dy$

**Step-by-Step Solution:**

1. **Fourier Symbol:**
   $$\widehat{Hf}(\xi) = -i \text{sgn}(\xi) \hat{f}(\xi)$$

2. **Symbol:**
   $$a(x,\xi) = -i \text{sgn}(\xi)$$

3. **Symbol Class Verification:**
   $$\vert D_\xi^\alpha a(x,\xi) \vert = \begin{cases} 0 & \text{if } \vert \alpha \vert \geq 1 \\ 1 & \text{if } \vert \alpha \vert = 0 \end{cases}$$

4. **Order:**
   $m = 0$ since $\vert a(x,\xi) \vert \leq C$.

5. **Microlocal Property:**
   $WF(Hf) \subseteq WF(f)$

The Hilbert transform exemplifies how pseudodifferential operators can modify singularities without eliminating them. As a $\Psi$DO of order 0, the Hilbert transform preserves the wave front set: $WF(Hf) \subseteq WF(f)$. However, the symbol $a(x,\xi) = -i \text{sgn}(\xi)$ introduces a phase rotation that depends on the sign of the frequency. This phase shift is crucial in signal processing, where the Hilbert transform is used to create analytic signals and extract instantaneous phase information. The microlocal property ensures that singularities are not smoothed away, but the phase rotation reflects the non-local nature of the operator: it acts differently on positive and negative frequencies, encoding the causal structure of the underlying physical system.

### Example 7.2.5: Composition Formula Demonstration

**Problem:** Compute the composition symbol for $A = \partial_x$, $B = x$.

**Step-by-Step Solution:**

1. **Symbols:**
   - $a(x,\xi) = i\xi$ (order 1)
   - $b(x,\xi) = x$ (order 0)

2. **Composition Formula:**
   $$(a \# b)(x,\xi) \sim \sum_{\alpha} \frac{i^{-\vert \alpha \vert}}{\alpha!} \partial_\xi^\alpha a \cdot \partial_x^\alpha b$$

3. **Compute Terms:**
   **$|\alpha| = 0$:** $ab = i\xi \cdot x$

   **$|\alpha| = 1$:** $\alpha = (1,0,\dots)$

   $$\frac{i^{-1}}{1!} \partial_\xi (i\xi) \cdot \partial_x (x) = (-i)(i) \cdot 1 = 1$$

   **$|\alpha| \geq 2$:** $\partial_\xi^\alpha (i\xi) = 0$

4. **Result:**
   $$(a \# b)(x,\xi) = i\xi x + 1$$

5. **Verification:**
   $A \circ B = \partial_x (x \cdot) = 1 + x \partial_x$

The composition formula reveals the fundamental non-commutativity of quantum mechanics encoded in the algebra of pseudodifferential operators. When composing $\partial_x$ with $x$, the leading term $i\xi \cdot x$ represents the classical (commutative) product, but the correction term $+1$ arises from the commutator $[x, \partial_x] = 1$. This Heisenberg correction is not a small perturbation but a fundamental feature of the operator algebra: the composition symbol $(a \# b)$ includes not just the pointwise product $ab$, but also terms involving derivatives of $a$ and $b$ that capture the non-commutative structure. The $+1$ term in this example is precisely the commutator, demonstrating how the composition formula systematically accounts for the quantum mechanical uncertainty principle in the symbol calculus.

### Example 7.2.6: Parametrix Construction

**Problem:** Construct a parametrix for $(-\Delta + 1)u = f$.

**Step-by-Step Solution:**

1. **Principal Symbol:**
   $$p(x,\xi) = \vert \xi \vert^2 + 1$$

2. **Parametrix Symbol:**
   $$a(x,\xi) = \frac{1}{\vert \xi \vert^2 + 1}$$

3. **Verify $\Psi$DO Class:**
   $$\vert D_\xi^\alpha a \vert \leq C_\alpha (1+\vert \xi \vert^2)^{-1 + \vert \alpha \vert/2} \in S^{-2}$$

4. **Regularity:**
   For $f \in H^s$, $u \in H^{s+2}$.

5. **Wave Front Set:**
   $$WF(u) \subseteq WF(f) \cup \text{Char}(-\Delta + 1) = WF(f)$$

Elliptic operators possess a remarkable microlocal smoothing property: they eliminate singularities everywhere except on their characteristic set, which is empty for strictly elliptic operators. The parametrix construction shows that if $P$ is elliptic, then $WF(u) \subseteq WF(Pu)$, meaning that singularities in the solution can only come from singularities in the forcing term. Since the characteristic set of an elliptic operator is empty (the principal symbol never vanishes), there are no directions in phase space where the operator fails to be invertible. This microlocal invertibility ensures that elliptic operators smooth all singularities, providing a rigorous foundation for the classical regularity theory that states elliptic equations have smooth solutions when given smooth data.

### Example 7.2.7: Canonical Propagation—Wave Equation

**Problem:** Solve $u_{tt} - u_{xx} = 0$ with $u(0,x) = H(x)$, $u_t(0,x) = 0$.

**Step-by-Step Solution:**

1. **Principal Symbol:**
   $$p(t,x;\tau,\xi) = \tau^2 - \xi^2$$

2. **Characteristic Set:**
   $\tau^2 = \xi^2$ or $\mid \tau \mid = \mid \xi \mid$.

3. **Initial Wave Front:**
   $$WF(u(0,\cdot)) = \{(0,\xi,0) : \xi > 0\}$$

4. **Bicharacteristic Flow:**
   $$H_p = \tau \partial_t + \xi \partial_x - \xi \partial_\tau - \tau \partial_\xi$$

   **Solutions:** $(t(s),x(s),\tau(s),\xi(s)) = (s,x_0 + s\xi_0/\tau_0,\tau_0,\xi_0)$

5. **Propagated WF:**
   $$WF(u(t,\cdot)) = \{(x,t\xi_0/\tau_0,\xi_0) : \xi_0 > 0\}$$

6. **Physical Interpretation:**
   Singularity propagates along light cone $x = t$.

The wave equation propagates singularities along light cones at the speed of light, as encoded in the bicharacteristic flow. When initial data contains a jump discontinuity, the wave front set evolves according to the Hamiltonian flow of the symbol $|\xi|$, which generates straight-line trajectories in phase space. The spatial projection of these bicharacteristics gives the light cone $x = x_0 \pm ct$, showing that the discontinuity travels at speed $c$ in both directions. This geometric description provides a rigorous foundation for Huygens' principle: singularities in the initial data propagate along characteristics, creating a wave front that expands at the speed of light. The wave front set thus encodes both the location of the singularity and its direction of propagation, providing a complete microlocal description of how discontinuities evolve under the wave equation.

### Example 7.2.8: Transport Equation

**Problem:** Solve $u_t + u_x = 0$ with $u(0,x) = H(x)$.

**Step-by-Step Solution:**

1. **Principal Symbol:**
   $$p(t,x;\tau,\xi) = \tau + \xi$$

2. **Characteristics:**
   $\tau = -\xi$.

3. **Hamiltonian Flow:**
   $$\dot{t} = 1, \quad \dot{x} = 1, \quad \dot{\tau} = 0, \quad \dot{\xi} = 0$$

4. **Bicharacteristics:**
   $(t,x_0 + t,\tau_0,-\tau_0)$

5. **Wave Front Evolution:**
   $$WF(u(t,\cdot)) = \{(x_0 + t,-\xi_0,\xi_0) : \xi_0 > 0\}$$

6. **Verification:**
   Solution $u(t,x) = H(x-t)$ has jump along $x = t$.

### Example 7.2.9: Advanced—Variable Coefficient Wave Equation

**Problem:** Solve $u_{tt} - c^2(x)u_{xx} = 0$ with $u(0,x) = H(x)$.

**Step-by-Step Solution:**

1. **Principal Symbol:**
   $$p = \tau^2 - c^2(x)\xi^2$$

2. **Hamiltonian:**
   $$H_p = 2\tau \partial_t + 2c^2\xi \partial_x - 2c c' \xi^2 \partial_\tau$$

3. **Bicharacteristic ODEs:**
   $$\dot{t} = 2\tau, \quad \dot{x} = 2c^2\xi, \quad \dot{\tau} = 2c c' \xi^2$$

4. **Ray Speed:**
   $$v = \frac{dx}{dt} = \frac{c^2\xi}{\tau} = c(x)$$

5. **Initial Condition:**
   At $t=0$, $(0,0,\tau_0,\xi_0)$ with $\tau_0 = c(0)\mid \xi_0 \mid$.

6. **Solution Path:**
   Rays follow optical paths $\frac{dx}{ds} = c(x)$.

The connection between geometric optics and microlocal analysis is complete: light rays in geometric optics are precisely the spatial projections of bicharacteristic curves in phase space. When the wave speed $c(x)$ varies with position, the bicharacteristics follow curved paths determined by the Hamiltonian flow of the symbol. The spatial projection of these phase space trajectories gives the optical ray paths, which satisfy Fermat's principle of least time. This correspondence reveals that geometric optics is not merely an approximation to wave optics, but rather the leading-order description of how the wave front set evolves: singularities (wave fronts) propagate along bicharacteristics, and their spatial projections are the rays of geometric optics. The variable coefficient case demonstrates that this geometric structure persists even when the medium is inhomogeneous, with the bicharacteristic flow encoding both the ray paths and the evolution of frequency along those paths.

### Example 7.2.10: Failure Mode—Elliptic Regularity

**Problem:** Solve $-\Delta u + u = H(x_1)$ in $\mathbb{R}^2$.

**Step-by-Step Solution:**

1. **Principal Symbol:**
   $$p = \vert \xi \vert^2 + 1 > 0$$ everywhere.

2. **Characteristic Set:**
   $\emptyset$.

3. **Parametrix:**
   $$E(x) = \frac{e^{-\vert x \vert}}{4\pi \vert x \vert}$$

4. **Solution:**
   $u = E * H(x_1)$.

5. **Wave Front Analysis:**
   - $WF(H(x_1)) = \{(0,\xi_1,0) : \xi_1 > 0\}$
   - $WF(E)$ has support only at $(0,0)$

6. **Result:**
   $WF(u) = \emptyset$ (u is smooth!)

Elliptic operators provide the ultimate smoothing mechanism: they eliminate all singularities, regardless of their structure. When an elliptic operator acts on a distribution with a non-empty wave front set, the resulting distribution has an empty wave front set, meaning it is smooth. This is a much stronger statement than mere regularity: it says that elliptic operators not only preserve smoothness but actively create it, removing all directional singularities. The fundamental solution $E(x) = e^{-|x|}/(4\pi |x|)$ for $-\Delta + 1$ is itself smooth away from the origin, and when convolved with the Heaviside function (which has wave front set $\{(0,\xi_1,0) : \xi_1 > 0\}$), the result has empty wave front set. This demonstrates the power of elliptic regularity: even when starting with discontinuous or singular data, elliptic equations produce smooth solutions, making them ideal for modeling equilibrium phenomena where all disturbances are instantaneously smoothed.

### Example 7.2.11: Comprehensive Demonstration—Schrödinger Evolution

**Problem:** Track $WF(u(t,\cdot))$ for $i u_t + \Delta u = 0$, $u(0,x) = e^{i k \cdot x} H(x_1)$.

**Complete Analysis:**

1. **Initial WF:**
   $$WF(u(0)) = \{(0,k_1,k_2) : k_1 > 0\}$$

2. **Principal Symbol:**
   $$p = \tau + \vert \xi \vert^2$$

3. **Bicharacteristic Flow:**
   $$H_p = \partial_t + 2\xi \cdot \nabla_x - 2\xi \cdot \nabla_\xi$$

4. **Flow Equations:**

   | Variable | ODE | Solution |
   |----------|-----|----------|
   | $t(s)$ | $\dot{t} = 1$ | $t = s$ |
   | $x(s)$ | $\dot{x} = 2\xi$ | $x = x_0 + 2 s \xi$ |
   | $\xi(s)$ | $\dot{\xi} = 0$ | $\xi = \text{constant}$ |
   | $\tau(s)$ | $\dot{\tau} = 0$ | $\tau = -\vert \xi \vert^2$ |

5. **Evolved WF:**
   $$WF(u(t)) = \{(x_0 + 2tk_1, k_1, k_2) : k_1 > 0\}$$

6. **Physical Interpretation:**
   - Singularity translates with group velocity $2k$
   - Frequency preserved (dispersionless in direction)
   - Plane wave packet moves ballistically

**Connection to Chapter 3:** This is exactly the WKB ray dynamics made rigorous!

### Example 7.2.12: Theoretical Extensions—Summary Table

**Summary Table: WF Evolution Examples**

| Equation | Initial WF | Bicharacteristic Flow | Physical Meaning |
|----------|------------|----------------------|------------------|
| Transport | $\{(0,\xi) : \xi > 0\}$ | $x(t) = x_0 + t$ | Advection at speed 1 |
| Wave | $\{(0,\xi) : \xi > 0\}$ | $x(t) = x_0 \pm t$ | Light cone propagation |
| Schrödinger | $\{(0,k)\}$ | $x(t) = x_0 + 2tk$ | Group velocity $2k$ |
| Variable Wave | $\{(0,\xi)\}$ | $\frac{dx}{dt} = c(x)$ | Optical ray paths |

**Narrative Connections:**
- **To Chapter 3.6:** Caustics occur when bicharacteristic projections have critical points
- **To Chapter 4:** Lax pairs preserve WF along isospectral flows
- **To Chapter 6:** Geometric flows have WF evolving along Ricci flow geodesics
- **To Chapter 7.3:** D-modules encode WF as characteristic varieties

**Cliffhanger:** WF sets are Lagrangian manifolds → need Fourier integral operators (7.4)

## References

* Hörmander, L. (1983). *The Analysis of Linear Partial Differential Operators I: Distribution Theory and Fourier Analysis*. Springer-Verlag.

* Duistermaat, J. J., & Hörmander, L. (1972). Fourier Integral Operators II. *Acta Mathematica*, 128, 183-269.

* Kashiwara, M. (1995). *D-Modules and Microlocal Calculus*. American Mathematical Society.

* Grigis, A., & Sjöstrand, J. (1994). *Microlocal Analysis for Differential Operators*. Cambridge University Press.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 7.1 D-Modules & Holonomic Systems]({{ '/diffequations/chapter-07/07-1-d-modules/' | relative_url }})
- [Next Section: 7.3 Riemann-Hilbert Correspondence]({{ '/diffequations/chapter-07/07-3-riemann-hilbert/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-07/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
