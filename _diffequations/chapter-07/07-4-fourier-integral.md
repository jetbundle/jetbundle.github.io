---
layout: textbook
title: "Section 7.4: Fourier Integral Operators"
description: "Quantization of canonical transformations"
permalink: /diffequations/chapter-07/07-4-fourier-integral/
order: 7.4
chapter: 7
section: 4
nav_order: 7.4
is_chapter_index: false
parent_chapter: 7
parent_section: null
---

# Section 7.4: Fourier Integral Operators

## Introduction

The analysis of differential equations has thus far relied primarily on local operators—differential operators that examine a function's behavior in the infinitesimal neighborhood of a point. However, the geometric perspective of Chapter 7.2 established that singularities propagate along bicharacteristic flows in the cotangent bundle. To describe operators that transport singularities from one region of phase space to another—such as the solution operators for hyperbolic equations—we must generalize the concept of the differential operator. We introduce Pseudodifferential Operators ($\Psi$DOs) to handle microlocal elliptic regularity and Fourier Integral Operators (FIOs) to quantize canonical transformations on the phase space.

## Mathematical Content

### Pseudodifferential Operators

We begin by extending the Fourier inversion formula. A linear differential operator $P(x, D) = \sum_{|\alpha| \le m} a_\alpha(x) D^\alpha$ acts on a function $u$ via its Fourier transform:

$$P(x, D)u(x) = (2\pi)^{-n} \int_{\mathbb{R}^n} e^{ix\cdot\xi} p(x, \xi) \hat{u}(\xi) \, d\xi$$

where $p(x, \xi) = \sum a_\alpha(x) \xi^\alpha$ is a polynomial in $\xi$. To define a $\Psi$DO, we replace the polynomial $p(x, \xi)$ with a more general symbol $a(x, \xi)$ belonging to a specific symbol class.

**Definition (Symbol Classes).** Let $m \in \mathbb{R}$. The symbol class $S^m_{1,0}(\mathbb{R}^n \times \mathbb{R}^n)$ consists of smooth functions $a(x, \xi)$ such that for all multi-indices $\alpha, \beta$, there exist constants $C_{\alpha\beta}$ satisfying:

$$|\partial_\xi^\alpha \partial_x^\beta a(x, \xi)| \le C_{\alpha\beta} (1 + |\xi|)^{m - |\alpha|}$$

The number $m$ is the order of the symbol. Operators defined by these symbols, denoted by $\Psi^m$, form an algebra closed under composition and adjoints. This calculus allows us to invert elliptic operators microlocally. If $a(x, \xi) \in S^m$ is elliptic (i.e., $|a(x,\xi)| \ge c|\xi|^m$ for large $|\xi|$), one can construct a parametrix $B \in \Psi^{-m}$ such that $P \circ B = I + R$, where $R$ is a smoothing operator (kernel in $C^\infty$). This establishes that $\text{WF}(Pu) = \text{WF}(u) \cap \text{char}(P)$, refining the singular support analysis of Chapter 2.

### Fourier Integral Operators

While $\Psi$DOs characterize singularities, they do not move them; the wavefront set is invariant under elliptic $\Psi$DO action. To solve hyperbolic equations (e.g., the wave equation), we require operators that propagate the wavefront set according to a Hamiltonian flow. This necessitates a generalization of the phase function $x \cdot \xi$.

**Definition (Phase Function).** Let $X \subset \mathbb{R}^n$ and $Y \subset \mathbb{R}^p$. A smooth function $\phi(x, y, \theta)$ defined on $X \times Y \times (\mathbb{R}^N \setminus \{0\})$ is a non-degenerate phase function if it is homogeneous of degree 1 in $\theta$ and satisfies the non-degeneracy condition:

$$d_{(x,y,\theta)} \frac{\partial \phi}{\partial \theta_j} \neq 0 \quad \text{for all } j=1,\dots,N$$

on the set $C_\phi = \{ (x,y,\theta) : \nabla_\theta \phi(x,y,\theta) = 0 \}$.

A Fourier Integral Operator $A$ associated with the phase $\phi$ acts on test functions $u \in C_c^\infty(Y)$ as:

$$Au(x) = \int_Y \int_{\mathbb{R}^N} e^{i\phi(x,y,\theta)} a(x,y,\theta) u(y) \, d\theta \, dy$$

where $a(x,y,\theta)$ is a symbol in $S^m$. The critical geometric object associated with this operator is the canonical relation defined by the phase.

### Canonical Relations and Lagrangian Manifolds

The phase function $\phi$ defines a Lagrangian submanifold $\Lambda_\phi$ in the twisted product of cotangent bundles $T^*X \times T^*Y$ equipped with the symplectic form $\omega_X - \omega_Y$. The set $C_\phi$ where the phase is stationary with respect to $\theta$ maps to $\Lambda_\phi$ via:

$$\Lambda_\phi = \left\{ \left(x, \nabla_x \phi(x,y,\theta); y, -\nabla_y \phi(x,y,\theta)\right) : (x,y,\theta) \in C_\phi \right\}$$

This manifold $\Lambda_\phi$ describes the correspondence between classical trajectories. If $\Lambda_\phi$ is the graph of a symplectomorphism $\chi: T^*Y \to T^*X$, the FIO $A$ quantizes this canonical transformation. The composition of two FIOs corresponds geometrically to the composition of their canonical relations, provided the intersection is clean (transversal in the appropriate stratification).

Globalizing this definition requires the Maslov index. Since a single phase function typically cannot parametrize a global Lagrangian manifold, one must patch together local descriptions. The Maslov index is a cohomological class in $H^1(\Lambda, \mathbb{Z})$ that accounts for phase shifts (factors of $i$) occurring when transitioning between charts, specifically at caustics where the projection to the base manifold becomes singular.

### Egorov's Theorem

The fundamental link between the quantum dynamics (operators) and classical dynamics (symplectic geometry) is Egorov's Theorem. It states that conjugation by an FIO transforms a pseudodifferential operator into another $\Psi$DO whose principal symbol is the pullback of the original symbol via the underlying canonical transformation.

**Theorem (Egorov).** Let $F$ be an FIO associated with a canonical graph of a symplectomorphism $\chi: T^*X \to T^*Y$, and let $P \in \Psi^m(X)$ be a pseudodifferential operator with principal symbol $p(x, \xi)$. If $F$ is invertible (elliptic), then $Q = F^{-1} P F$ is a pseudodifferential operator in $\Psi^m(Y)$ with principal symbol:

$$\sigma(Q)(y, \eta) = (p \circ \chi)(y, \eta)$$

This theorem allows us to transform complex differential operators into simple normal forms (e.g., transforming a strictly hyperbolic operator into the wave operator $\partial_t^2 - \partial_{x_1}^2$) by solving the Hamilton-Jacobi equations for the canonical transformation.

### Application: The Wave Equation and Parametrix Construction

We apply this machinery to the Cauchy problem for the wave equation $(\partial_t^2 - \Delta)u = 0$ with initial data $u(0) = 0, u_t(0) = f$. The solution can be written as the sum of two FIOs:

$$u(t, x) = \frac{1}{2i\sqrt{-\Delta}} \left( e^{it\sqrt{-\Delta}} - e^{-it\sqrt{-\Delta}} \right) f(x)$$

The operators $U(t) = e^{\pm it\sqrt{-\Delta}}$ are FIOs associated with the canonical relation generated by the geodesic flow on the cosphere bundle $S^*M$. The phase function satisfies the eikonal equation discussed in Chapter 3.6. Specifically, the wavefront set of the solution satisfies:

$$\text{WF}(u(t)) \subset \chi_t(\text{WF}(f)) \cup \chi_{-t}(\text{WF}(f))$$

where $\chi_t$ is the time-$t$ map of the Hamiltonian flow of the symbol $|\xi|$. This serves as the rigorous proof of Huygens' principle and the propagation of singularities along light cones. The construction of the Hadamard parametrix for variable coefficient operators is achieved by solving transport equations for the amplitude $a(x,y,\theta)$ along these bicharacteristics, providing a complete microlocal description of the solution modulo $C^\infty$.

## Complete Examples

### Example 7.4.1: Canonical Example—Classical $\Psi$DO (The Laplacian Parametrix)

**Problem:** Construct the principal symbol of the parametrix for the Laplacian $\Delta$ on $\mathbb{R}^2$.

**Step-by-Step Solution:**

1. **Operator:**
   $$\Delta = \frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2}$$

2. **Symbol:**
   $$p(x, \xi) = |\xi|^2 = \xi_1^2 + \xi_2^2$$

3. **Parametrix Symbol:**
   $$q(x, \xi) = \frac{1}{|\xi|^2}$$ for $|\xi| \geq 1$

4. **Symbol Class Verification:**
   For $q(x, \xi) = |\xi|^{-2} \in S^{-2}_{1,0}$:

   $$|\partial_\xi^\alpha q| \leq C_\alpha |\xi|^{-2-|\alpha|}$$

5. **Microlocal Elliptic Regularity:**
   If $\text{WF}(u) \cap \{\xi_1 = \xi_2 = 0\} = \emptyset$, then $\Delta u \in C^\infty \Rightarrow u \in C^\infty$.

   **Proof:** $p(x, \xi) \neq 0$ on $\text{WF}(u) \Rightarrow q(x, \xi) \in S^{-2}$ is elliptic.

6. **Explicit Computation:**
   $$P = \Delta, \quad Q = \frac{1}{4\pi} \log(|x|^2) * \text{(fundamental solution)}$$

   $$\sigma(Q) = \int e^{ix\cdot\xi} \frac{1}{|\xi|^2} \frac{d\xi}{(2\pi)^2} = |\xi|^{-2}$$

   $$\Delta Q = \delta_0 + R, \quad R \in C^\infty \text{ (smoothing operator)}$$

### Example 7.4.2: Canonical Example—Wave Operator FIO (1D Wave Equation)

**Problem:** Construct the FIO for the 1D wave equation solution operator.

**Step-by-Step Solution:**

1. **Phase Function:**
   $$\phi(t, x, y, \theta) = \theta(t - (x - y))$$

2. **Canonical Relation:**
   $$\Lambda_\phi = \{(t, x, \tau, \xi); (0, y, 0, \eta) : \tau = 1, \xi = \eta, x = y \pm t\}$$

3. **Eikonal Equation:**
   $$|\nabla_x \phi| = 1$$

   $$\nabla_x \phi = -\theta = \xi \Rightarrow |\xi| = 1$$

4. **Transport Equation:**
   $$2\nabla_x \phi \cdot \nabla_\theta a + \Delta_x \phi \cdot a = 0$$

   $$-2\theta \nabla_\theta a - a = 0 \Rightarrow a(t, x, y, \theta) = c(\theta)$$

5. **FIO Representation:**
   $$U(t)f(x) = \int\int e^{i\theta(t - |x-y|)} a(t, x, y, \theta) f(y) \, d\theta \, dy$$

6. **Stationary Phase:**
   $\theta = \text{sign}(x-y)$

   $$U(t)f(x) = \int \frac{[f(x-t) + f(x+t)]}{2} \, dy$$

7. **Wavefront Propagation:**
   $$\text{WF}(U(t)f) = \chi_t(\text{WF}(f)) = \{(x, \xi) : (x-t\xi, \xi) \in \text{WF}(f)\} \cup \{(x, \xi) : (x+t\xi, \xi) \in \text{WF}(f)\}$$

### Example 7.4.3: Physical Application—Variable Coefficient Wave Equation

**Problem:** Solve $\Box_g u = 0$ where $g = dx^2 + (1 + x^2)dy^2$ (optical metric).

**Step-by-Step Solution:**

1. **Principal Symbol:**
   $$p(t, x, \tau, \xi) = \tau^2 - \xi_1^2 - \frac{\xi_2^2}{1 + x^2}$$

2. **Hamiltonian Flow:**
   $$\dot{x}_1 = 2\tau, \quad \dot{x}_2 = \frac{2\xi_2}{1 + x^2}$$

   $$\dot{\xi}_1 = 0, \quad \dot{\xi}_2 = -\frac{4x \xi_2^2}{(1 + x^2)^2}$$

3. **Canonical Transformation:**
   $$\chi_t: (x_1, x_2, \xi_1, \xi_2) \mapsto \left(x_1 + 2t\tau, x_2 + \int_0^t \frac{2\xi_2(s)}{1 + x_2(s)^2} ds, \xi_1, \xi_2(t)\right)$$

4. **FIO Construction:**
   $$\phi(t, x_1, x_2, y_1, y_2, \theta_1, \theta_2) = \theta_1(t - (x_1 - y_1)/2) + \theta_2 \psi(x_2, y_2, t)$$

   where $\psi$ solves the Hamilton-Jacobi equation:

   $$\partial_t \psi + \sqrt{1 + \frac{(\partial_{x_2} \psi)^2}{1 + x_2^2}} = 0$$

5. **Physical Interpretation:**
   Light rays bend according to Fermat's principle, with singularities propagating along curved geodesics.

### Example 7.4.4: Physical Application—Schrödinger Propagator

**Problem:** Construct FIO for $i\partial_t u + \Delta u = 0$.

**Step-by-Step Solution:**

1. **Phase Function:**
   $$\phi(t, x, y, \theta) = (x - y)\cdot\theta - t|\theta|^2$$

2. **Stationary Phase Conditions:**
   $$\nabla_\theta \phi = x - y - 2t\theta = 0 \Rightarrow \theta = \frac{x - y}{2t}$$

   $$\nabla_x \phi = \theta = \xi, \quad \nabla_y \phi = -\theta = \eta$$

3. **Amplitude:**
   $$a(t, x, y, \theta) = (2\pi it)^{-n/2} e^{i\pi/4 \text{ sign}}$$

4. **Canonical Relation:**
   $$\Lambda_\phi = \left\{\left(x, \frac{x-y}{2t}\right); \left(y, \frac{y-x}{2t}\right) : |x-y| = 2\sqrt{t}\right\}$$

5. **Egorov's Theorem Verification:**
   $$P = -i\partial_t - \Delta, \quad Q = U(-t) P U(t)$$

   $$\sigma(Q)(y, \eta) = |\eta|^2 = \sigma(P)(\chi_t(y, \eta))$$

### Example 7.4.5: Advanced Demonstration—Egorov's Theorem (Full Computation)

**Problem:** Verify Egorov's theorem for the harmonic oscillator.

**Setup:**
- **Classical flow:** $H = (p^2 + x^2)/2$
- **Quantum operator:** $P = -\partial_x^2 + x^2$
- **FIO:** $U(t) = e^{-itP}$

**Step-by-Step Solution:**

1. **Canonical Transformation:**
   $$\chi_t: (x, p) \mapsto (x \cos t + p \sin t, -x \sin t + p \cos t)$$

2. **Composition Computation:**
   **Symbol transport:**
   $$\sigma(U(-t) P U(t))(x, p) = \sigma(P)(\chi_t(x, p)) = p^2 + x^2$$

3. **Operator Verification:**
   $$U(-t) P U(t) = P$$

   (time-independent due to symmetry)

4. **Microlocal Verification:**
   $$\text{WF}(U(t)f) = \chi_t(\text{WF}(f))$$

5. **Complete Proof:**
   Let $A \in \Psi^m$, $\sigma(A) = a(x, \xi)$.

   Then $\sigma(U(-t) A U(t))(y, \eta) = a(\chi_t(y, \eta)) + O(t^{-1})$.

### Example 7.4.6: Advanced Demonstration—Clean Intersection and Composition

**Problem:** Compute $\text{FIO}_2 \circ \text{FIO}_1$ where canonical relations intersect cleanly.

**Setup:**
- **FIO$_1$:** $\phi_1(x, y, \theta) = (x - y)\cdot\theta$
- **FIO$_2$:** $\phi_2(z, x, \eta) = (z - x)\cdot\eta$

**Step-by-Step Solution:**

1. **Canonical Relations:**
   $$\Lambda_1 = \{(x, \xi); (y, -\xi) : \xi = \nabla_\theta \phi_1\}$$

   $$\Lambda_2 = \{(z, \zeta); (x, -\zeta) : \zeta = \nabla_\eta \phi_2\}$$

2. **Composition Geometry:**
   $$\Lambda_2 \circ \Lambda_1 = \{(z, \zeta); (y, -\xi) : \exists x, \xi = \zeta, z = x + t\zeta, x = y + s\xi\}$$

3. **Clean Intersection Condition:**
   $$T_{(z,x; y,x)}(\Lambda_2 \times \Lambda_1) \cap T^*\{(z,x; y,x)\} = T^*\{(z; y)\}$$

4. **Resulting Phase Function:**
   $$\phi_{2\circ 1}(z, y, \theta, \eta) = \phi_2(z, x(z, y, \theta, \eta), \eta) + \phi_1(x(z, y, \theta, \eta), y, \theta)$$

5. **Stationary Phase:**
   $$\nabla_{(\theta,\eta)} \phi_{2\circ 1} = 0 \Rightarrow (z - y)\cdot(\theta + \eta) = 0, \quad \theta = \eta$$

   $$\phi_{2\circ 1} = (z - y)\cdot\theta$$

6. **Composition:**
   $\text{FIO}_2 \circ \text{FIO}_1$ corresponds to translation by fixed distance.

### Example 7.4.7: Advanced Demonstration—Maslov Index Computation

**Problem:** Compute Maslov index for circle in $\mathbb{R}^2$.

**Setup:** Lagrangian submanifold $S^1 \times S^1 \subset T^*\mathbb{R}^2$.

**Step-by-Step Solution:**

1. **Local Trivializations:**
   **Chart 1:** $\theta \in [0, \pi]$, $\phi_1(x, y, \theta) = x \cos \theta + y \sin \theta$

   **Chart 2:** $\theta \in [\pi, 2\pi]$, $\phi_2(x, y, \theta) = x \cos \theta + y \sin \theta$

2. **Transition Function:**
   On overlap $[\pi - \varepsilon, \pi + \varepsilon]$:

   $$\phi_2 = \phi_1 + \pi(x^2 + y^2)^{1/2}$$

3. **Maslov Correction:**
   $$\det(\text{Hess}_\theta \phi_1) = -1, \quad \det(\text{Hess}_\theta \phi_2) = -1$$

   **Transition:** $e^{i\pi/2} = i$ (phase shift)

4. **Global Maslov Index:**
   $$m(S^1 \times S^1) = 2 \text{ (Euler characteristic)}$$

### Example 7.4.8: Theoretical Extensions—Hadamard Parametrix Construction

**Problem:** Construct parametrix for wave equation on sphere $S^2$.

**Step-by-Step Solution:**

1. **Geodesic Distance:**
   $$d(x, y) = \arccos(x\cdot y)$$

2. **Phase Function:**
   $$\phi(t, x, y, \theta) = \theta(t^2 - d(x, y)^2)$$

3. **Eikonal Verification:**
   $$|\nabla_x \phi|^2 = 4\theta^2 = \tau^2 \text{ (principal symbol)}$$

4. **Transport Equation (order 0 amplitude):**
   $$2\nabla_x \phi \cdot \nabla_\theta a_0 + (\Delta_x \phi)a_0 = 0$$

5. **Amplitude Solution:**
   $$a_0(t, x, y, \theta) = (2\pi t)^{-1} \delta(\theta - 1/2)$$

6. **Full Parametrix:**
   $$U(t)f(x) = \int\int e^{i(t^2 - d(x,y)^2)/2} (2\pi t)^{-1} f(y) \, dy$$

7. **Singularity Propagation:**
   $$\text{WF}(U(t)f) = \{(x, \nabla_x d(x,y)); (y, -\nabla_y d(x,y)) : d(x,y) = t\}$$

### Example 7.4.9: Theoretical Extensions—Microlocal Elliptic Regularity

**Problem:** Prove $\text{WF}(\Delta u) \subset \text{WF}(u) \cup \text{char}(\Delta)$.

**Step-by-Step Solution:**

1. **Parametrix Construction:**
   $$Q \in \Psi^{-2}, \quad \Delta Q = I + R, \quad R \text{ smoothing}$$

2. **Wavefront Set Propagation:**
   $$\text{WF}(Q(\Delta u)) \subset \text{WF}(u) \cup \text{WF}(QR(u))$$

3. **Smoothing Property:**
   $$\text{WF}(QR(u)) = \emptyset \text{ (R smoothing)}$$

4. **Principal Symbol Calculation:**
   $$\sigma(\Delta Q) = |\xi|^2 \cdot |\xi|^{-2} = 1$$

5. **Elliptic Regularity:**
   $(x_0, \xi_0) \in \text{WF}(u) \setminus \text{char}(\Delta) \Rightarrow (x_0, \xi_0) \notin \text{WF}(\Delta u)$

6. **Complete Proof:**
   Let $(x_0, \xi_0) \in \text{WF}(\Delta u)$, $\xi_0 \neq 0$.

   Then $\exists$ cutoff $\psi$: $\text{supp } \hat{\psi} \subset \{\xi : |\xi - \xi_0| < \delta\}$

   $$\sigma(\psi\Delta\hat{\psi}) = \hat{\psi}(x_0) \hat{\psi}(\xi_0) |\xi_0|^2 \neq 0$$

   Thus $(x_0, \xi_0) \in \text{WF}(\Delta u)$ only if $\xi_0 \neq 0$.

### Example 7.4.10: Theoretical Extensions—FIO Invertibility and Ellipticity

**Problem:** Show FIO associated with identity canonical relation is elliptic.

**Step-by-Step Solution:**

1. **Phase Function:**
   $$\phi(x, y, \theta) = (x - y)\cdot\theta$$

2. **Canonical Relation:**
   $$\Lambda_\phi = \{(x, \xi); (y, -\xi) : x = y, \xi \text{ arbitrary}\}$$

3. **Ellipticity Condition:**
   FIO elliptic if $|a(x, y, \theta)| \geq c|\theta|^m$ on $C_\phi$.

4. **Amplitude Analysis:**
   $$C_\phi = \{(x, x, \theta) : \nabla_\theta \phi = 0\} = \{(x, x, 0)\}$$

   But $\theta \neq 0$, so check projection.

5. **Microlocal Ellipticity:**
   For each $(x_0, \xi_0) \in T^*X$, $\exists$ chart where

   $\Lambda_\phi$ projects cleanly onto neighborhood

   $|a(x, x, \theta)| \geq c|\theta|^m$ near $\theta = \xi_0$.

6. **Invertibility:**
   $F^{-1}$ has phase $\psi(y, x, \eta) = (y - x)\cdot\eta$

   $$F^{-1} F = \text{Id} + \text{smoothing}$$

## References

* Duistermaat, J. J., & Hörmander, L. (1972). *Fourier Integral Operators II*.

* Hörmander, L. (1985). *The Analysis of Linear Partial Differential Operators III & IV*.

* Treves, F. (1980). *Introduction to Pseudodifferential and Fourier Integral Operators*.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 7.3 Riemann-Hilbert Correspondence]({{ '/diffequations/chapter-07/07-3-riemann-hilbert/' | relative_url }})
- [Next Section: 7.5 Resurgence, Borel Summation & Alien Calculus]({{ '/diffequations/chapter-07/07-5-resurgence/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-07/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
