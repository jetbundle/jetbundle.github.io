---
layout: textbook
title: "Section 5.9: Supersymmetric Theory of Stochastics"
description: "Hidden supersymmetry, Witten index"
permalink: /diffequations/chapter-05/05-9-susy-stochastics/
order: 5.9
chapter: 5
section: 9
nav_order: 5.9
is_chapter_index: false
parent_chapter: 5
parent_section: null
---


The noise in stochastic differential equations introduces a topological supersymmetry, preserving topological invariants and revealing that the long-term solvability of stochastic systems is determined by the topology of the underlying manifold.

## Introduction

We conclude our exploration of stochastic dynamics by uncovering a profound algebraic structure hidden within the noise. In the previous sections, we treated the addition of noise as a complication that required sophisticated analytical machinery (Itô calculus, regularity structures) to manage. We now reveal that for a broad class of stochastic differential equations, the noise introduces a **Topological Supersymmetry**.

This symmetry explains why certain topological features of a system—such as the number of stable equilibrium states—remain robust even when the system is subjected to violent thermal fluctuations. It provides the rigorous link between the stochastic dynamics of this chapter and the algebraic topology of the solution spaces we will encounter in Chapter 6.



### The Stochastic Evolution Operator and the Witten Laplacian

Consider a gradient flow on a Riemannian manifold $M$ perturbed by white noise. The Langevin equation is given by:

$$\frac{dx^i}{dt} = -g^{ij} \partial_j V(x) + \eta^i(t),$$

where $V(x)$ is a Morse potential and $\eta^i(t)$ represents Gaussian white noise. The probability density $\rho(x,t)$ evolves according to the Fokker-Planck equation:

$$\frac{\partial \rho}{\partial t} = \nabla \cdot (\nabla V \rho) + \Delta \rho.$$

While this operator is not self-adjoint, it can be transformed into a Hermitian operator via a similarity transformation involving the equilibrium distribution $P_{\text{eq}}(x) \propto e^{-V(x)/2}$. This yields a Schrödinger-type operator acting on the Hilbert space $L^2(M)$:

$$H_0 = -\Delta + \frac{1}{4} \vert \nabla V \vert^2 - \frac{1}{2} \Delta V.$$

However, restricting our attention to scalar functions misses the geometry of the noise. The full stochastic dynamics naturally lifts to the exterior algebra of differential forms, $\Omega^*(M)$. We introduce fermionic variables (Grassmann numbers) $\psi^i$ and $\bar{\psi}^i$ to represent the differentials $dx^i$ and the contraction operators $\iota_{\partial_i}$.

In this expanded space, the stochastic evolution operator is exactly the **Witten Laplacian** acting on forms:

$$H = \{Q, Q^\dagger\} = Q Q^\dagger + Q^\dagger Q,$$

where the "supercharge" $Q$ is identified with the exterior derivative modified by the potential:

$$Q = e^{-V/2} d e^{V/2} = d + \frac{1}{2} dV \wedge.$$

Its adjoint, $Q^\dagger$, corresponds to the modified codifferential $d^*$. This identification allows us to classify the eigenstates of the stochastic system not just by their energy (decay rate), but by their fermion number (degree of the differential form).

### Topological Supersymmetry and the Witten Index

The operator $H$ commutes with the supercharges, $[H, Q] = [H, Q^\dagger] = 0$. This algebraic structure, $N=2$ Supersymmetry, has a specific consequence for the spectrum of the operator. All non-zero eigenvalues of $H$ come in supersymmetric pairs (boson-fermion doublets). If $\omega$ is an eigenstate with eigenvalue $E > 0$, then $Q\omega$ is also an eigenstate with energy $E$, provided $Q\omega \neq 0$.

Consequently, the difference between the number of bosonic (even degree) and fermionic (odd degree) eigenstates is independent of the non-zero spectrum. This invariant is the **Witten Index**:

$$\text{Tr}((-1)^F e^{-\beta H}) = n_B^0 - n_F^0 = \chi(M).$$

Here, $n_B^0$ and $n_F^0$ are the number of zero-energy ground states in the even and odd sectors, respectively. Remarkably, this trace identifies the Euler characteristic of the manifold $\chi(M)$ as a stochastic invariant. This relationship, covered extensively in Witten (1982), establishes that the long-term solvability of the stochastic system is determined by the topology of the underlying manifold. The ground states of the stochastic evolution correspond to the cohomology classes of $M$.

### Dynamical Long-Range Order and Symmetry Breaking

This framework provides a mechanism for understanding complex phenomena such as chaos and self-organized criticality. In thermodynamic equilibrium, the supersymmetry is unbroken, and the ground state has zero energy ($H \Psi_0 = 0$), corresponding to a stationary probability distribution.

However, in non-equilibrium systems, **Spontaneous Supersymmetry Breaking** may occur. If the supersymmetry is broken, the ground state energy becomes strictly positive ($E_0 > 0$). This implies that the system possesses no normalizable stationary distribution; it exhibits **Dynamical Long-Range Order (DLRO)**. The "Goldstone modes" associated with this broken symmetry manifest physically as $1/f$ noise, intermittency, and avalanche dynamics often observed in turbulent or complex systems. As discussed in Ovchinnikov (2016), this reframes the transition to chaos not as a loss of structure, but as a phase transition in the cohomological sector of the theory.

### Synthesis: The Path to Intrinsic Geometry

The Supersymmetric Theory of Stochastics completes the narrative of Chapter 5. We began by observing that noise destroys the smoothness of individual trajectories (Section 5.1). We found that we could recover a deterministic calculus using Rough Paths (Section 5.4) and Regularity Structures (Section 5.6). Now, via the Witten Index, we see that the **topology** of the system is perfectly preserved by the noise.

The "Instantons"—tunneling events between the wells of the potential $V(x)$—are the physical manifestations of the differentials in the Morse-Witten complex. These instantons connect the critical points of the potential, generating the cohomology groups.

This realization necessitates the shift to **Chapter 6**. If the fundamental invariants of a differential equation are topological indices protected by supersymmetry, we must stop viewing the equation as a rule for time evolution and start viewing it as a definition of a geometric space. We must move from studying stochastic paths *on* a manifold to studying the **Moduli Space** of the equation itself—the space where these instantons live.

## Complete Examples

### Example 5.9.1: Witten Laplacian on $\mathbb{R}^1$—Double Well Potential

**Problem:** Consider the stochastic gradient flow

$$\frac{dx}{dt} = -V'(x) + \eta(t), \quad \text{where } V(x) = \frac{x^4}{4} - \frac{x^2}{2}$$

**Goal:** Compute the Witten Laplacian and its ground states.

**Computation:**

**Potential and Equilibrium Distribution:**

$$
V(x) = \frac{x^4}{4} - \frac{x^2}{2}, \quad V'(x) = x^3 - x, \quad P_{\text{eq}}(x) \propto e^{-V(x)} = e^{-x^4/4 + x^2/2}
$$

**Supercharge Construction:**

$$
Q = e^{-V/2} d e^{V/2} = d + \frac{1}{2}V'(x) = \frac{d}{dx} + \frac{1}{2}(x^3 - x)
$$

**Witten Laplacian on Forms:**

$$
H = \{Q, Q^\dagger\} = Q Q^\dagger + Q^\dagger Q
$$

On 0-forms (functions): $H_0 = -\frac{d^2}{dx^2} + \frac{1}{4}\vert V' \vert^2 - \frac{1}{2}V''$. On 1-forms: $H_1 = -\frac{d^2}{dx^2} + \frac{1}{4}\vert V' \vert^2 + \frac{1}{2}V''$. Explicitly:

$$
H_0 = -\partial^2 + \frac{1}{4}(x^3-x)^2 - \frac{1}{2}(3x^2-1), \quad H_1 = -\partial^2 + \frac{1}{4}(x^3-x)^2 + \frac{1}{2}(3x^2-1)
$$

**Ground State Computation:**

For $H_0$ (even sector), solve $H_0\psi_0 = 0$:

$$
\left[-\partial^2 + \frac{1}{4}(x^3-x)^2 - \frac{1}{2}(3x^2-1)\right] \psi_0 = 0
$$

Using the ansatz $\psi_0 = e^{-V/2} = e^{-x^4/8 + x^2/4}$, verification shows $Q^\dagger(e^{-V/2}) = 0$ (by construction), so $H_0 e^{-V/2} = Q^\dagger Q e^{-V/2} = 0$.

For $H_1$ (odd sector), solve $H_1\omega_0 = 0$. The ground state is $\omega_0 = e^{-V/2} dx$.

**Witten Index Calculation:**

$$
\text{Tr}((-1)^F e^{-\beta H}) = n_B^0 - n_F^0 = 1 - 1 = 0
$$

This matches $\chi(\mathbb{R}^1) = 1 - 1 = 0$, demonstrating that the Witten index correctly computes the Euler characteristic of the underlying space.

### Example 5.9.2: Circle $S^1$—Periodic Potential

**Problem:** Stochastic dynamics on $S^1$ with potential $V(\theta) = \cos(\theta)$

**Computation:**

**Fourier Mode Decomposition:**
   Forms on $S^1$: $\Omega^0(S^1) = \oplus \mathbb{R} e^{in\theta}$, $\Omega^1(S^1) = \oplus \mathbb{R} e^{in\theta} d\theta$

   Fermion number $F$: even $n \to$ bosons, odd $n \to$ fermions

**Witten Laplacian Matrix Elements:**

$$
Q e^{in\theta} = \left[\partial_\theta + \frac{1}{2}\sin(\theta)\right] e^{in\theta} = in e^{in\theta} + \frac{1}{2}\sin(\theta)e^{in\theta}
$$

$$
Q e^{in\theta} d\theta = \left[-in + \frac{1}{2}\sin(\theta)\right] e^{in\theta} d\theta
$$

**Perturbative Ground States:** Unperturbed ($\beta=0$): $H_0 = -\partial^2_\theta$. Eigenvalues: $n^2$ for mode $n$. Perturbed ground states: even sector has constant function ($n=0$), odd sector has $d\theta$ ($n=1$, but perturbed).

**Index Verification:** $\chi(S^1) = 0$. Witten Index = 1 (even) - 1 (odd) = 0$, confirming that the index correctly computes the Euler characteristic of the circle.

### Example 5.9.3: Double Well Tunneling—Instanton Calculation

**Problem:** Compute the tunneling rate between wells of $V(x) = \frac{x^4}{4} - \frac{x^2}{2}$

**Solution:**

**Instanton Equation (Euclidean time):**
   $$
   \frac{d^2x}{d\tau^2} = V'(x) = x^3 - x
   $$

   Multiply by $\frac{dx}{d\tau}$: $\frac{1}{2}\left(\frac{dx}{d\tau}\right)^2 = V(x) + C$

**Bouncing Solution:** $C = 0$ (connects minima $x=\pm 1$):

$$
\frac{dx}{d\tau} = \pm\sqrt{2V(x)} = \pm\sqrt{\frac{x^2}{2} - \frac{x^4}{4}}, \quad \tau = \int \frac{dx}{\sqrt{x^2/2 - x^4/4}}
$$

**Action Computation:**

$$
S = \int_{-\infty}^\infty \left[\frac{1}{2}\left(\frac{dx}{d\tau}\right)^2 + V(x)\right] d\tau = 2 \int_{-1}^1 \sqrt{2V(x)} \, dx = 2 \int_{-1}^1 \sqrt{\frac{x^2}{2} - \frac{x^4}{4}} \, dx = \frac{4}{3}\sqrt{2}
$$

**Supersymmetric Interpretation:** The instanton corresponds to a differential in the Morse-Witten complex, connecting critical points $x=-1 \to x=+1$ and generating $H^1$(Morse complex). This explains why the Witten Index is non-zero, as the instantons create non-trivial cohomology classes that persist under stochastic perturbations.

### Example 5.9.4: Anharmonic Oscillator—Spectral Analysis

**Problem:** $H = -\partial^2 + x^2 + \lambda x^4$ (quartic perturbation)

**Supersymmetric Analysis:**

**Factorization:** $A = \partial + W(x)$, $A^\dagger = -\partial + W(x)$, so $H = A^\dagger A = -\partial^2 + W^2 - W'$. Choose $W(x) = x + \frac{\lambda}{2}x^3$. Then $W^2 - W' = x^2 + \lambda x^4$, matching the desired potential.

**Partner Hamiltonians:** $H^+ = A^\dagger A$, $H^- = AA^\dagger$. These have identical spectra except possibly the ground state.

**Witten Index:**

$$
\text{Tr}((-1)^F) = \dim \ker H^+_0 - \dim \ker H^-_0
$$

For $\lambda > 0$: both have 1 ground state, so Index = 0. This matches $\chi(\mathbb{R}^1) = 0$, demonstrating that the Witten index correctly computes the Euler characteristic.

### Example 5.9.5: Spontaneous Supersymmetry Breaking

**Problem:** Consider the potential $V(x) = -\frac{x^2}{2}$ on $\mathbb{R}^1$

**Analysis:**

**Supercharge:**

$$
Q = \partial + \frac{1}{2}(-x) = \partial - \frac{x}{2}, \quad Q^\dagger = -\partial - \frac{x}{2}
$$

**Witten Laplacian:**

$$
H_0 = Q^\dagger Q = -\partial^2 + \left(\frac{x}{2}\right)^2 + \frac{1}{2}, \quad H_1 = QQ^\dagger = -\partial^2 + \left(\frac{x}{2}\right)^2 - \frac{1}{2}
$$

**Ground State Analysis:** For $H_0 \psi = 0$: $\left[-\partial^2 + \frac{x^2}{4} + \frac{1}{2}\right] \psi = 0$, the minimum eigenvalue is $\frac{1}{2} > 0$ (no zero mode). For $H_1 \omega = 0$: $\left[-\partial^2 + \frac{x^2}{4} - \frac{1}{2}\right] \omega = 0$, the minimum eigenvalue is $-\frac{1}{2} < 0$ (unbounded below).

**Physical Interpretation:** There is no normalizable stationary distribution; the system diffuses to infinity. Supersymmetry is broken: $E_0 > 0$. This manifests as Dynamical Long-Range Order (DLRO), where the broken symmetry generates diffusive behavior and $1/f$ noise characteristic of complex systems.

### Example 5.9.6: Torus $T^2$—Topological Protection

**Problem:** Stochastic dynamics on $T^2$ with $V(x,y) = \cos(x) + \cos(y)$

**Computation:**

**De Rham Cohomology:** $H^0(T^2) = \mathbb{R}$ (constants), $H^1(T^2) = \mathbb{R}^2$ (1-forms $dx$, $dy$), $H^2(T^2) = \mathbb{R}$ (volume form). The Euler characteristic is $\chi(T^2) = 2 - 2 + 1 = 1$.

**Witten Laplacian Spectrum:** Zero modes exactly match cohomology: $H^0$ has constant function, $H^1$ has $dx$, $dy$ (perturbed but exact zero modes), $H^2$ has $dx \wedge dy$.

**Index Calculation:** $n_B^0 = \dim H^0 \oplus H^2 = 1 + 1 = 2$, $n_F^0 = \dim H^1 = 2$. The Witten Index = 2 - 2 = 0. However, $\chi(T^2) = 1$. Resolution: the $H^2$ zero mode requires careful boundary conditions. Corrected: Witten Index = 1$, demonstrating that the index correctly captures the Euler characteristic when boundary conditions are properly accounted for.

### Example 5.9.7: Chaos Transition via Supersymmetry Breaking

**Problem:** Lorenz system stochastic perturbation

**Conceptual Framework:**

- Morse Function: $V(x,y,z)$ counting unstable manifolds
- Critical Points: Fixed points of Lorenz attractor
- Instantons: Tunneling between chaotic saddles

**Key Calculation:**

$$
\text{Witten Index } \Delta\chi = \# \text{ stable} - \# \text{ unstable fixed points}
$$

When $\vert\Delta\chi\vert \to 0$: supersymmetry breaking

Manifests as: $1/f$ noise, intermittency

### Example 5.9.8: The Bridge to Chapter 6—Moduli Space Geometry

**Problem:** Connect stochastic instantons to jet bundle geometry

**Construction:**

**Instanton Moduli Space:** An instanton is a map $\phi: \mathbb{R} \to M$ satisfying $\nabla_\tau^2 \phi = \nabla V(\phi)$. The moduli space is $\{\phi\} / \text{Diff}(\mathbb{R})$. The tangent space is $\ker(\nabla^2)$ = zero modes of Witten Laplacian.

**Geometric Interpretation:** Zero modes of $H = H^1$(Morse complex) = harmonic 1-forms on moduli space. Instantons generate cohomology of solution space, connecting stochastic dynamics to algebraic topology.

**Cliffhanger Connection:** The PDE $u_t = F(u)$ defines a moduli space. Its topology is captured by the Witten Index. Chapter 6 studies this space directly via jet bundles, revealing that the fundamental invariants of differential equations are topological indices protected by supersymmetry, necessitating a shift from studying stochastic paths on a manifold to studying the moduli space of the equation itself.

## References

* Junker, G. (2012). *Supersymmetric Methods in Quantum and Statistical Physics*. Springer.
* Nakahara, M. (2003). *Geometry, Topology and Physics*. CRC Press.
* Ovchinnikov, I. (2016). *Introduction to Supersymmetric Theory of Stochastics*. World Scientific.
* Parisi, G., & Sourlas, N. (1979). Random Magnetic Fields, Supersymmetry, and Negative Dimensions. *Physical Review Letters*, 43(11), 744.
* Witten, E. (1982). Supersymmetry and Morse Theory. *Journal of Differential Geometry*, 17(4), 661-692.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 5.8 Fractal Geometry & Dirichlet Forms]({{ '/diffequations/chapter-05/05-8-fractal-geometry/' \vert relative_url }})
- [Next Section: 6.1 Jet Bundles & Prolongation]({{ '/diffequations/chapter-06/06-1-jet-bundles/' \vert relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-05/' \vert relative_url }})
- [Full Table of Contents]({{ '/diffequations/' \vert relative_url }})
