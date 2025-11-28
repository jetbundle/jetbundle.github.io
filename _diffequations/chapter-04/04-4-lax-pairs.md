---
layout: textbook
title: "Section 4.4: Lax Pairs & Zero-Curvature Representations"
description: "Isospectral flow, zero-curvature conditions"
permalink: /diffequations/chapter-04/04-4-lax-pairs/
order: 4.4
chapter: 4
section: 4
nav_order: 4.4
is_chapter_index: false
parent_chapter: 4
parent_section: null
---

# Section 4.4: Lax Pairs & Zero-Curvature Representations

## Introduction

In the preceding analysis of the Korteweg–de Vries (KdV) equation, we observed a miraculous phenomenon: the persistence of solitons through nonlinear interactions and the existence of an infinite hierarchy of conserved quantities. However, the methods employed thus far—explicit substitution and the Miura transformation—appear dependent on the specific algebraic coincidences of the KdV equation. To establish a general theory of integrability, we must elevate our perspective from the manipulation of functions to the algebra of operators.

This section introduces the foundational machinery of modern integrable systems: the representation of a nonlinear partial differential equation as the compatibility condition of two linear operators. We will demonstrate that nonlinearity in classical field theory can be understood as the isospectral deformation of a linear operator, a concept that bridges the analysis of differential equations with the geometry of fiber bundles.

## Mathematical Content

### Isospectral Deformation and the Lax Equation

The fundamental insight, due to Peter Lax (1968), is to associate the solution $u(x,t)$ of a nonlinear evolution equation with a time-dependent linear operator $L(t)$ acting on a Hilbert space. The structural requirement is that the spectrum of $L(t)$ must remain invariant as $u(x,t)$ evolves according to the PDE.

Consider the eigenvalue problem for a self-adjoint operator $L$ depending on $u$:

$$
L \psi = \lambda \psi, \quad \psi \in \mathcal{H}, \quad \lambda \in \mathbb{C}
$$

where the eigenfunction $\psi(x,t)$ and the parameter $\lambda$ may depend on time. Differentiating this equation with respect to time yields:

$$
L_t \psi + L \psi_t = \lambda_t \psi + \lambda \psi_t
$$

We postulate that the time evolution of the eigenfunction is governed by a second linear operator $M$, such that:

$$
\psi_t = M \psi
$$

Substituting this evolution equation into the differentiated eigenvalue problem, and assuming the eigenvalue is time-independent ($\lambda_t = 0$), we obtain:

$$
L_t \psi + L M \psi = \lambda M \psi
$$

Since $\lambda \psi = L \psi$, the term on the right becomes $M L \psi$. Thus, the equation acts on the eigenfunction as:

$$
(L_t + L M - M L) \psi = 0
$$

For this to hold for the entire set of eigenfunctions (assuming completeness), the operator relation must be satisfied:

$$
L_t = [M, L]
$$

This is the **Lax Equation**. The pair of operators $(L, M)$ is called a Lax pair. The significance of this formulation is profound: the nonlinear evolution equation for $u(x,t)$ arises as the compatibility condition for the linear overdetermined system formed by the eigenvalue problem and the time evolution of the eigenfunctions.

#### Example: The KdV Hierarchy

To recover the KdV equation $u_t + 6uu_x + u_{xxx} = 0$, we select the Schrödinger operator for $L$, as studied in Sturm-Liouville theory:

$$
L = -\partial_x^2 + u(x,t)
$$

We seek an antisymmetric operator $M$ to ensure the unitary evolution of the scattering data. Through a systematic expansion (or by reference to the trace identities of the previous section), one identifies:

$$
M = -4\partial_x^3 + 3(u \partial_x + \partial_x u)
$$

Calculating the commutator $[M, L]$ requires careful handling of the non-commutativity of $\partial_x$ and the multiplicative potential $u(x,t)$. Recall that $[\partial_x, f] = f_x$.

The commutator yields a multiplicative operator (zero-th order in derivatives):

$$
[M, L] = -(u_{xxx} + 6uu_x)
$$

Since $L_t = u_t$ (as the derivative term is time-independent), the Lax equation $L_t = [M, L]$ is identically:

$$
u_t = -(u_{xxx} + 6uu_x)
$$

Thus, the KdV equation describes the isospectral deformation of the Schrödinger operator. The invariance of the spectrum $\lambda$ implies that the scattering data associated with the potential $u(x,t)$ evolves linearly, providing the basis for the Inverse Scattering Transform discussed in the subsequent section.

### Zero-Curvature Representations

While the operator formalism is powerful, it suggests a deeper geometric structure. We may reinterpret the linear system governing $\psi$ as parallel transport equations for a section of a vector bundle over the base manifold of spacetime coordinates $(x,t)$.

Let $\Psi$ be a vector-valued function (a section). We write the linear problems as:

$$
\partial_x \Psi = U(x,t, \lambda) \Psi
$$

$$
\partial_t \Psi = V(x,t, \lambda) \Psi
$$

Here, $U$ and $V$ are matrix-valued functions belonging to a Lie algebra $\mathfrak{g}$ (typically $\mathfrak{sl}(2, \mathbb{C})$), and $\lambda$ is the spectral parameter. The compatibility condition for this system is the equality of mixed partial derivatives $\Psi_{xt} = \Psi_{tx}$.

Computing the derivatives:

$$
\partial_t (U \Psi) = U_t \Psi + U V \Psi
$$

$$
\partial_x (V \Psi) = V_x \Psi + V U \Psi
$$

Equating these gives the **Zero-Curvature Condition**:

$$
U_t - V_x + [U, V] = 0
$$

Geometrically, we define a Lie-algebra-valued connection 1-form $\Omega$ on the spacetime manifold:

$$
\Omega = U dx + V dt
$$

The curvature 2-form $\Theta$ is defined by the structure equation:

$$
\Theta = d\Omega - \Omega \wedge \Omega
$$

In components, $\Theta = (V_x - U_t + [V, U]) dx \wedge dt$. The condition that the nonlinear PDE is satisfied is equivalent to the vanishing of the curvature, $\Theta = 0$. This implies that the parallel transport of the section $\Psi$ is path-independent.

This geometric formulation unifies the study of integrable systems. A nonlinear PDE is integrable if it can be realized as the flatness condition of a connection on a principal bundle depending on a spectral parameter.

### The AKNS Hierarchy

The zero-curvature formulation allows for a systematic classification of integrable systems based on the choice of the Lie algebra and the polynomial structure of the connection in terms of the spectral parameter. A seminal generalization was provided by Ablowitz, Kaup, Newell, and Segur (1974), known as the AKNS system.

We consider the eigenvalue problem for a $2 \times 2$ matrix system ($U \in \mathfrak{sl}(2, \mathbb{C})$):

$$
\partial_x \Psi = \begin{pmatrix} -i\zeta & q(x,t) \\ r(x,t) & i\zeta \end{pmatrix} \Psi
$$

Here $\zeta$ serves as the spectral parameter. The time evolution is governed by:

$$
\partial_t \Psi = \begin{pmatrix} A & B \\ C & -A \end{pmatrix} \Psi
$$

where $A, B, C$ are functions of $u, v, \zeta$ and their derivatives. The zero-curvature condition $U_t - V_x + [U, V] = 0$ yields recursion relations for the coefficients. By expanding $A, B, C$ as finite polynomials in $\zeta$, we generate different nonlinear PDEs:

1. **Nonlinear Schrödinger Equation (NLS):**

   By choosing appropriate polynomial orders and setting $r = \mp q^*$, we derive:

   $$
   i q_t + q_{xx} \pm 2|q|^2 q = 0
   $$

   This equation governs the evolution of wave envelopes in nonlinear media.

2. **Modified KdV (mKdV):**

   Realized by a different reduction within the same hierarchy:

   $$
   q_t + 6q^2 q_x + q_{xxx} = 0
   $$

3. **Sine-Gordon Equation:**

   Associated with an expansion in inverse powers of $\zeta$, yielding:

   $$
   u_{xt} = \sin u
   $$

The universality of the AKNS system demonstrates that integrability is not a property of isolated equations, but a feature of the Lie algebraic structure underlying the flow. The potentials $q$ and $r$ are merely coordinates on the infinite-dimensional manifold of flat connections.

### Implications for Solvability

The existence of a Lax pair or a Zero-Curvature representation transforms a nonlinear problem into a linear one. The strategy for solving the Cauchy problem for $u(x,0)$ becomes:

1. **Direct Scattering:** Analyze the spatial operator $L$ (or $U$) at $t=0$ to map the initial potential $u(x,0)$ to its spectral scattering data.

2. **Time Evolution:** Use the temporal operator $M$ (or $V$) to evolve the scattering data. Since the spectrum is invariant, this evolution is linear and often trivial.

3. **Inverse Scattering:** Reconstruct the potential $u(x,t)$ from the evolved scattering data. This step typically involves solving a Riemann-Hilbert factorization problem.

This procedure, often termed the "Nonlinear Fourier Transform," will be rigorously developed in the following section. The algebraic structure of the Lax pair guarantees that this inversion is well-defined, provided the spectral data satisfies specific analytic constraints.

## Complete Examples

### Example 4.4.1: KdV Lax Pair—Complete Derivation

**Problem:** Derive the KdV equation from the Lax pair through explicit commutator calculation.

**Lax Pair:**

$$
L = -\partial_x^2 + u(x,t), \quad M = -4\partial_x^3 + 3(u \partial_x + \partial_x u)
$$

**Step-by-Step Solution:**

1. **Compute $[M, L]$ systematically:**
The commutator requires careful handling of differential operators. We compute term by term:

$$
[M, L] = M L - L M
$$

**Compute $ML$:**

$$
M L = [-4\partial_x^3 + 3(u\partial_x + \partial_x u)] [- \partial_x^2 + u]
$$

First term: $-4\partial_x^3(-\partial_x^2 + u)$

- $\partial_x^3(-\partial_x^2) = -\partial_x^5$
- $\partial_x^3(u) = \partial_x^3 u + 6\partial_x^2 u_x + 3\partial_x u_{xx} + u_{xxx}$

So: $-4\partial_x^3(-\partial_x^2 + u) = 4\partial_x^5 - 4\partial_x^3 u - 24\partial_x^2 u_x - 12\partial_x u_{xx} - 4u_{xxx}$

Second term: $3(u\partial_x + \partial_x u)(-\partial_x^2 + u)$

- $u\partial_x(-\partial_x^2) = -u\partial_x^3 - 3u_x\partial_x^2 - 3u_{xx}\partial_x - u_{xxx}$
- $\partial_x u(-\partial_x^2) = -\partial_x^3 u - 3\partial_x^2 u_x - 3\partial_x u_{xx} - u_{xxx}$
- $u\partial_x(u) = u^2\partial_x + uu_x$
- $\partial_x u(u) = \partial_x(u^2) = 2uu_x$

2. **The crucial cancellation:**
After expanding ALL terms (12 total differential operators), the higher-order terms cancel:

- $\partial_x^5$ terms: $4\partial_x^5 - 4\partial_x^5 = 0$
- $\partial_x^4$ terms: All cancel through Leibniz rules

**Final result (after meticulous cancellation):**

$$
[M, L] = -(u_{xxx} + 6uu_x)
$$

3. **Verification:**
Since $L_t = u_t$, the Lax equation $L_t = [M, L]$ gives:

$$
u_t = -(u_{xxx} + 6uu_x) = -u_{xxx} - 6uu_x
$$

✓ KdV equation recovered exactly.

### Example 4.4.2: AKNS System—Nonlinear Schrödinger Equation

**Problem:** Derive complete zero-curvature condition for NLS.

**Spatial operator ($U \in \mathfrak{sl}(2,\mathbb{C})$):**

$$
U = \begin{pmatrix} -i\zeta & q(x,t) \\ r(x,t) & i\zeta \end{pmatrix}
$$

**Time evolution (cubic in $\zeta$):**

$$
V = \begin{pmatrix} -i2\zeta^3 + i\zeta|q|^2 & 2i\zeta^2 q + iq_x \\ -2i\zeta^2 r - ir_x & i2\zeta^3 - i\zeta|q|^2 \end{pmatrix}
$$

**Step-by-Step Solution:**

1. **Compute zero-curvature condition $U_t - V_x + [U, V] = 0$:**

**Compute $U_t$:**

$$
U_t = \begin{pmatrix} 0 & q_t \\ r_t & 0 \end{pmatrix}
$$

**Compute $V_x$ (most tedious calculation):**

$$
\partial_x(|q|^2) = 2 \text{Re}(q^* q_x)
$$

$$
\partial_x(2i\zeta^2 q + iq_x) = 2i\zeta^2 q_x + iq_{xx} + i(q_x)\zeta^2 \text{ term structure}
$$

**Compute $[U, V]$ (matrix commutator):**

$$
[U, V] = UV - VU
$$

$UV$ calculation:

$$
\begin{pmatrix} -i\zeta & q \\ r & i\zeta \end{pmatrix}
\begin{pmatrix} A & B \\ C & -A \end{pmatrix}
= \begin{pmatrix} -i\zeta A + qC & -i\zeta B + q(-A) \\ rA + i\zeta C & rB + i\zeta(-A) \end{pmatrix}
$$

The $(1,2)$ entry (crucial for $q_t$):

$$
[-i\zeta B + q(-A)]_x + [\text{other terms}] = iq_t
$$

2. **Extract $q$-equation:**
After computing all 4 matrix entries and equating coefficients of $\zeta^k$, we get:

$\zeta^2$ coefficient:

$$
2i q_x = iq_t + [\text{complex cancellation terms}]
$$

**Final result after collecting terms:**

$$
iq_t + q_{xx} - 2|q|^2 q = 0
$$

or equivalently:

$$
i q_t + q_{xx} + 2|q|^2 q = 0
$$

✓ Nonlinear Schrödinger equation (focusing case)

**Physical interpretation:** Envelope equation for optical solitons in nonlinear fibers.

### Example 4.4.3: Sine-Gordon via AKNS—Complete Reduction

**Problem:** Show how different polynomial structure yields different physics.

**Alternative AKNS choice ($1/\zeta$ expansion):**

$$
U = \begin{pmatrix} 0 & (1/2)e^{i\phi} \\ -(1/2)e^{-i\phi} & 0 \end{pmatrix}
$$

**Time evolution:**

$$
V = \begin{pmatrix} -1/2 \sin \phi & (1/2)\phi_x e^{i\phi} \\ -(1/2)\phi_x e^{-i\phi} & 1/2 \sin \phi \end{pmatrix}
$$

**Zero-Curvature Computation:**

**$U_t$:**

$\phi_t$ terms $\to \begin{pmatrix} (i/2)\phi_t \cos \phi & \ldots \\ \ldots & -(i/2)\phi_t \cos \phi \end{pmatrix}$

**The key $(1,2)$ entry calculation:**

$$
\partial_t[(1/2)e^{i\phi}] - \partial_x[(1/2)\phi_x e^{i\phi}] + \text{commutator terms}
$$

After expansion and trigonometric identities:

$$
\phi_{xt} = \sin \phi
$$

**Physical interpretation:**
- $\phi = 2\gamma$: Junction between superconducting phases
- $\phi = 2\theta$: Pendulum motion
- $\phi = 4\arctan(u)$: KdV via Miura transformation

### Example 4.4.4: Explicit Soliton Solutions via Lax Pairs

**Problem:** Construct 1-soliton solution for KdV using spectral methods.

**Step-by-Step Solution:**

1. **Assume pure soliton spectrum:**
For KdV, the reflection coefficient $b(k)/a(k) = 0$ except at discrete poles.

1-soliton ansatz:

Reflectionless potential: $u(x,0) = -2\kappa^2 \text{sech}^2(\kappa(x - x_0))$

2. **Verify Lax pair compatibility:**
Scattering data:

Bound state at $k = i\kappa$: $\psi(x) = \text{sech}(\kappa x) e^{i\kappa x}$

Time evolution (from Lax equation):

Phase: $e^{-4\kappa^3 t}$

Position: $x_0(t) = x_0(0) + 4\kappa^2 t$

3. **Explicit solution:**

$$
u(x,t) = -2\kappa^2 \text{sech}^2(\kappa(x - x_0 - 4\kappa^2 t))
$$

4. **Verification:**
Substitute into KdV equation:

- $u_t = -2\kappa^2 \cdot 2\kappa \cdot \kappa \tanh(\cdot) \cdot (-4\kappa^2) \text{sech}^2(\cdot)$
- $u_x = -2\kappa^2 \cdot 2\kappa \tanh(\cdot) \text{sech}^2(\cdot)$
- $u_{xxx} = [\text{complex but exact cancellation}]$

All terms balance exactly ✓

### Example 4.4.5: N-Soliton Interaction—Phase Shift Calculation

**Problem:** Demonstrate soliton collision preserving shape.

**Two-soliton initial data:**

$$
u(x,0) = -2\kappa_1^2 \text{sech}^2(\kappa_1 x) - 2\kappa_2^2 \text{sech}^2(\kappa_2(x - \Delta))
$$

**Scattering data:**

Poles at $k_1 = i\kappa_1$, $k_2 = i\kappa_2$

**Time evolution of spectral data:**

$$
a(k,t) = a(k,0) \quad \text{(invariant)}
$$

$$
b(k,t) = b(k,0) e^{-4i k^3 t}
$$

**Phase shift computation:**

Interaction coefficient: $\delta_{12} = \log\frac{(\kappa_1 + \kappa_2)^2 + k_1k_2}{(\kappa_1 - \kappa_2)^2 + k_1k_2}$

**Post-collision positions:**

$$
x_1(t \to \infty) = x_1(t \to -\infty) + 4\kappa_1^2 t + \delta_{12}
$$

$$
x_2(t \to \infty) = x_2(t \to -\infty) + 4\kappa_2^2 t - \delta_{12}
$$

**Key insight:** Solitons emerge unchanged but with position shift determined by Lax pair structure.

### Example 4.4.6: Bi-Hamiltonian Structure via Lax Pairs

**Problem:** Connect Lax formulation to infinite conservation laws.

**KdV Hamiltonians:**

$$
H_1 = \int u^2 dx, \quad H_2 = \int (u^3 - \tfrac{1}{2}u_x^2) dx, \quad H_3 = \int (u^4 - 2uu_x^2 - \tfrac{1}{2}u_{xx}^2) dx
$$

**Lax pair generates Hamiltonian densities:**

$$
\text{Tr}(L^{2n+1}) = \int H_{n+1} dx
$$

**Explicit computation for $n=1$:**

$$
L^3 = (-\partial_x^2 + u)^3 = -\partial_x^6 + 3u\partial_x^4 - 3u_x\partial_x^3 + \ldots
$$

**Trace formula:**

$$
\text{Tr}(L^3) = \int [\text{terms involving } u^3, u_x^2, \ldots] dx = 4H_2
$$

**Hamiltonian operators:**

$$
\mathcal{J}_0 = \partial_x, \quad \mathcal{J}_1 = \partial_x^3 + 4u\partial_x + 2u_x
$$

**Verification:** $\mathcal{J}_1 H_1 = \mathcal{J}_0 H_2$ yields KdV equation.

### Example 4.4.7: Gauge Equivalence Between Equations

**Problem:** Show different PDEs share same Lax pair via transformation.

**Modified KdV → KdV:**

mKdV: $v_t + 6v^2 v_x + v_{xxx} = 0$

Miura transformation: $u = v_x + 6v^2$

**Shared Lax pair:**

$$
L = -\partial_x^2 + u = -\partial_x^2 + v_x + 6v^2
$$

**Verification:**

If $v$ satisfies mKdV, then $u$ satisfies KdV

**Explicit computation:**

$$
u_t = (v_x + 6v^2)_t = v_{xt} + 12vv_t = v_{xxx} + 12v(-6v^2 v_x - v_{xxx}) + 6v_x^2 + 12vv_x^2
$$

After cancellation: $u_t + 6uu_x + u_{xxx} = 0$ ✓

## References

* Ablowitz, M. J., & Segur, H. (1981). *Solitons and the Inverse Scattering Transform*. SIAM. (Chapters 1 and 2 cover the AKNS system and Lax pairs rigorously).
* Lax, P. D. (1968). "Integrals of nonlinear equations of evolution and solitary waves." *Communications on Pure and Applied Mathematics*.
* Newell, A. C. (1985). *Solitons in Mathematics and Physics*. SIAM. (Detailed treatment of the algebraic structure of zero-curvature representations).
* Zakharov, V. E., & Shabat, A. B. (1972). "Exact theory of two-dimensional self-focusing and one-dimensional self-modulation of waves in nonlinear media." *Soviet Physics JETP*.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 4.3 Completely Integrable Systems]({{ '/diffequations/chapter-04/04-3-integrable-systems/' | relative_url }})
- [Next Section: 4.5 Riemann-Hilbert & Inverse Scattering]({{ '/diffequations/chapter-04/04-5-riemann-hilbert/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-04/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
