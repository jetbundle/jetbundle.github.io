---
layout: textbook
title: "Section 4.7: Supersymmetric Quantum Mechanics"
description: "Factorization, shape invariance"
permalink: /diffequations/chapter-04/04-7-susy-qm/
order: 4.7
chapter: 4
section: 7
nav_order: 4.7
is_chapter_index: false
parent_chapter: 4
parent_section: null
---

# Section 4.7: Supersymmetric Quantum Mechanics

> The solvability of quantum mechanical potentials is not accidental—it emerges from a hidden algebraic structure that pairs Hamiltonians and transforms spectral problems into algebraic ones.

## Introduction

In the preceding sections of this chapter, we explored how the solvability of nonlinear partial differential equations—such as the Korteweg-de Vries equation—relies on the existence of infinite symmetries and the ability to map nonlinear evolution onto linear isospectral flows (Lax pairs). We now turn our attention to the Schrödinger equation, the fundamental linear differential equation of quantum mechanics. While this equation is linear, exact analytical solutions are historically rare, restricted to a specific "zoo" of potentials (harmonic oscillator, Coulomb, Pöschl-Teller) that yield the special functions discussed in Chapter 1.2.

This section reveals that the solvability of these specific potentials is not accidental. It is the consequence of a hidden algebraic structure known as Supersymmetric Quantum Mechanics (SUSY QM). By generalizing the classical factorization method of Schrödinger, Infeld, and Hull, we demonstrate that exactly solvable Hamiltonians naturally occur in pairs. This pairing allows us to determine eigenvalues algebraically—bypassing the need to solve second-order differential equations directly—and provides a constructive mechanism, the Darboux transformation, for generating new solutions from existing ones. This framework forms the quantum mechanical analog to the Bäcklund transformations of soliton theory.

## Mathematical Content

### The Factorization Method

Consider the time-independent Schrödinger operator in one dimension (setting $\hbar = 2m = 1$):

$$
H = -\frac{d^2}{dx^2} + V(x).
$$

The classical approach to finding eigenvalues $E$ and eigenfunctions $\psi(x)$ involves solving the boundary value problem $H\psi = E\psi$. The factorization method seeks to decompose this second-order differential operator into the product of two first-order operators. We introduce the operators $A$ and its adjoint $A^\dagger$:

$$
A = \frac{d}{dx} + W(x), \quad A^\dagger = -\frac{d}{dx} + W(x).
$$

Here, $W(x)$ is a real-valued function known as the **superpotential**. Computing the product $H_1 = A^\dagger A$, we obtain:

$$
H_1 = \left(-\frac{d}{dx} + W(x)\right)\left(\frac{d}{dx} + W(x)\right) = -\frac{d^2}{dx^2} + W^2(x) - W'(x).
$$

By identifying $H_1$ with a Hamiltonian $H - E_0$ (where $E_0$ is the ground state energy), we arrive at the **Riccati equation** relating the potential $V(x)$ to the superpotential:

$$
V(x) = W^2(x) - W'(x) + E_0.
$$

If such a superpotential exists, the ground state wavefunction $\psi_0(x)$ of $H_1$ must satisfy $A \psi_0 = 0$, which is a first-order linear equation yielding:

$$
\psi_0(x) = N \exp\left(-\int^x W(y) \, dy\right).
$$

The power of this formalism arises when we reverse the order of the operators. We define the **partner Hamiltonian** $H_2$:

$$
H_2 = A A^\dagger = -\frac{d^2}{dx^2} + W^2(x) + W'(x).
$$

The partner potential is $\tilde{V}(x) = W^2(x) + W'(x) + E_0$. While $H_1$ and $H_2$ describe different physical systems, their spectra are intimately related by an **intertwining relation**:

$$
H_2 A = (A A^\dagger) A = A (A^\dagger A) = A H_1.
$$

Applying this to an eigenstate $\psi_n^{(1)}$ of $H_1$ with eigenvalue $E_n^{(1)}$, we find:

$$
H_2 (A \psi_n^{(1)}) = A H_1 \psi_n^{(1)} = E_n^{(1)} (A \psi_n^{(1)}).
$$

This implies that if $E_n^{(1)}$ is an eigenvalue of $H_1$ (with $E_n^{(1)} > 0$), it is also an eigenvalue of $H_2$, and the corresponding eigenfunction is proportional to $A \psi_n^{(1)}$. Conversely, applying $A^\dagger$ maps eigenstates of $H_2$ to $H_1$.

The spectra of the two Hamiltonians are identical, with one exception: the ground state of $H_1$ (where $E_0^{(1)} = 0$) is annihilated by $A$ and has no counterpart in the spectrum of $H_2$. We have effectively removed the ground state to create a new Hamiltonian with the same excited spectrum.

### Supersymmetry Algebra

This structure represents the simplest realization of a supersymmetry algebra. We can form a matrix Hamiltonian $\mathcal{H}$ acting on a two-component spinor space:

$$
\mathcal{H} = \begin{pmatrix} H_1 & 0 \\ 0 & H_2 \end{pmatrix} = \begin{pmatrix} A^\dagger A & 0 \\ 0 & A A^\dagger \end{pmatrix}.
$$

We define the supercharges $Q$ and $Q^\dagger$:

$$
Q = \begin{pmatrix} 0 & 0 \\ A & 0 \end{pmatrix}, \quad Q^\dagger = \begin{pmatrix} 0 & A^\dagger \\ 0 & 0 \end{pmatrix}.
$$

These operators satisfy the graded Lie algebra characteristic of supersymmetry:

$$
\{Q, Q^\dagger\} = \mathcal{H}, \quad Q^2 = (Q^\dagger)^2 = 0, \quad [Q, \mathcal{H}] = [Q^\dagger, \mathcal{H}] = 0.
$$

The vanishing of the commutator $[Q, \mathcal{H}]$ confirms that the supercharges generate a symmetry of the Hamiltonian, transforming bosonic states (upper component) into fermionic states (lower component) while preserving energy.

### Shape Invariance and Exact Solvability

The factorization method links two Hamiltonians, but it does not inherently solve the spectral problem. The condition for exact solvability is **shape invariance**. A potential is shape invariant if the partner potential $\tilde{V}(x; a_1)$ (where $a_1$ is a set of parameters) has the same functional form as the original potential $V(x; a_2)$ with shifted parameters, up to an additive constant $R(a_1)$:

$$
\tilde{V}(x; a_1) = V(x; a_2) + R(a_1), \quad \text{where } a_2 = f(a_1).
$$

Under this condition, the entire sequence of partner Hamiltonians $H_1, H_2, H_3, \dots$ maintains the same "shape." This allows us to determine the eigenvalues algebraically without solving differential equations. The $n$-th eigenvalue is simply the sum of the remainder terms accumulated through the parameter shifts:

$$
E_n = \sum_{k=1}^n R(a_k) + E_0(a_n).
$$

For example, the Harmonic Oscillator possesses a linear superpotential $W(x) = \frac{1}{2} \omega x$. The partner potential corresponds to the same oscillator shifted by a constant, leading immediately to the linear spectrum $E_n = n\omega$. Similarly, the Coulomb, Morse, Pöschl-Teller, and Rosen-Morse potentials are all shape invariant. This concept unifies the special functions of Chapter 1.2; Hermite, Laguerre, and Legendre polynomials are the wavefunctions of shape-invariant potentials derived from this algebraic hierarchy.

### Darboux Transformations

The intertwining operators $A$ and $A^\dagger$ provide a method to construct new solutions from old ones, known as the **Darboux transformation**. If we possess a general solution $\phi(x)$ to the Schrödinger equation with energy $\lambda$ (not necessarily an eigenvalue):

$$
-\phi'' + V\phi = \lambda \phi,
$$

we can use $\phi$ to construct a new potential $V[1] = V - 2\frac{d^2}{dx^2} \ln \phi$ that is strictly isospectral to $V$ (excluding the state corresponding to $\phi$ if it is square-integrable).

This technique is instrumental in soliton theory. Starting from the free particle Hamiltonian $H_0 = -d^2/dx^2$ (where $V=0$), repeated application of Darboux transformations generates the hierarchy of **reflectionless potentials** $V_N(x) = -N(N+1) \text{sech}^2(x)$. These are precisely the soliton solutions of the Korteweg-de Vries (KdV) equation discussed in Chapter 4.3.

The connection to the Lax pairs of Chapter 4.4 is direct: the spatial part of the Lax operator $L$ is often the Schrödinger operator. The Darboux transformation acting on the eigenfunctions of $L$ induces a transformation on the potential $u(x,t)$ that corresponds to the addition of a soliton to the system. Thus, Supersymmetric Quantum Mechanics is not merely a method for classifying spectra, but the linear algebraic engine generating the nonlinear dynamics of integrable systems.

## Complete Examples

### Example 4.7.1: Canonical Factorization—Harmonic Oscillator

**Problem:** Consider the quantum harmonic oscillator Hamiltonian:

$$
H = -\frac{d^2}{dx^2} + x^2
$$

Factorize using SUSY QM and derive the spectrum algebraically.

**Solution:**

We begin by assuming the ground state energy $E_0 = 1$ (corresponding to the first excited state of the standard oscillator). The ground state wavefunction takes the form:

$$
\psi_0(x) = e^{-x^2/2}
$$

Computing the superpotential from this wavefunction, we find:

$$
W(x) = -\frac{\psi_0'}{\psi_0} = -\frac{(-x e^{-x^2/2})}{e^{-x^2/2}} = x
$$

This superpotential allows us to construct the factorization operators:

$$
A = \frac{d}{dx} + x, \quad A^\dagger = -\frac{d}{dx} + x
$$

Verifying the factorization, we compute:

$$
H_1 = A^\dagger A = \left(-\frac{d}{dx} + x\right)\left(\frac{d}{dx} + x\right) = -\frac{d^2}{dx^2} + x^2 - 1
$$

This confirms that the original Hamiltonian satisfies $H = H_1 + 1 = -\frac{d^2}{dx^2} + x^2$. The partner Hamiltonian is constructed by reversing the operator order:

$$
H_2 = AA^\dagger = \left(\frac{d}{dx} + x\right)\left(-\frac{d}{dx} + x\right) = -\frac{d^2}{dx^2} + x^2 + 1
$$

The spectral mapping becomes evident when we apply $A$ to the first excited state $\psi_1(x) = x e^{-x^2/2}$:

$$
A\psi_1 = \left(\frac{d}{dx} + x\right)(x e^{-x^2/2}) = e^{-x^2/2} = \psi_0(x)
$$

This demonstrates a fundamental property of the intertwining operator: $A$ maps excited states of $H_1$ to the ground state of $H_2$. The algebraic structure reveals that $H_1$ has spectrum $\{1, 3, 5, 7, \dots\}$, while $H_2$ has spectrum $\{3, 5, 7, \dots\}$, missing the ground state that was annihilated by the factorization.

### Example 4.7.2: Shape Invariance—Pöschl-Teller Potential

**Problem:** Demonstrate shape invariance for exactly solvable potentials.

**Derivation:**

The Pöschl-Teller potential, parameterized by $\alpha$, provides a canonical example of shape invariance:

$$
V(x; \alpha) = \alpha(\alpha-1) \text{sech}^2(x)
$$

The superpotential takes the form:

$$
W(x; \alpha) = \alpha \tanh(x)
$$

Computing the partner potential reveals the shape invariance structure:

$$
\tilde{V}(x; \alpha) = W^2(x; \alpha) + W'(x; \alpha) = \alpha^2 \tanh^2(x) + \alpha \text{sech}^2(x) = \alpha(\alpha+1) \text{sech}^2(x)
$$

The shape invariance condition is satisfied:

$$
\tilde{V}(x; \alpha) = V(x; \alpha+1) + R(\alpha)
$$

where the remainder term is:

$$
R(\alpha) = 2\alpha
$$

This algebraic structure allows us to determine the energy levels without solving differential equations. The ground state energy vanishes:

$$
E_0^{(0)} = 0
$$

Subsequent levels are determined by accumulating the remainder terms:

$$
E_1^{(0)} = R(\alpha_0) = 2\alpha_0
$$

$$
E_2^{(0)} = R(\alpha_0) + R(\alpha_1) = 2\alpha_0 + 2(\alpha_0+1) = 4\alpha_0 + 2
$$

$$
E_3^{(0)} = 6\alpha_0 + 6
$$

The general formula emerges:

$$
E_n^{(0)} = n(n + 2\alpha_0 - 1)
$$

The wavefunctions follow directly from the factorization: the ground state is $\psi_0^{(0)}(x) = \text{sech}^{\alpha_0}(x)$, while the first excited state is proportional to $A \psi_0^{(1)}(x) = \left(\frac{d}{dx} + \alpha_0 \tanh(x)\right) \text{sech}^{\alpha_0+1}(x)$.

### Example 4.7.3: Darboux Transformation Chain

**Problem:** Generate reflectionless potentials from free particle using iterated Darboux transformations.

**Construction:**

Starting from the free particle Hamiltonian:

$$
H^{(0)} = -\frac{d^2}{dx^2}, \quad V^{(0)}(x) = 0
$$

we apply the first Darboux transformation using the scattering state $\phi_1(x) = e^{ikx}$ with $k=1$:

$$
V^{(1)}(x) = -2 \frac{d^2}{dx^2} \ln \phi_1(x) = -2 \text{sech}^2(x)
$$

For the second transformation, we choose $\phi_2(x)$ as a solution to $H^{(1)}\phi_2 = E_2\phi_2$ with $E_2 = 4$:

$$
\phi_2(x) = (\tanh(x) - 1) \text{sech}(x)
$$

This yields:

$$
V^{(2)}(x) = V^{(1)}(x) - 2 \frac{d^2}{dx^2} \ln \phi_2(x) = -6 \text{sech}^2(x)
$$

The pattern becomes clear: after $N$ transformations, we obtain:

$$
V^{(N)}(x) = -N(N+1) \text{sech}^2(x)
$$

All potentials $V^{(N)}$ share the same excited state spectrum $\{1^2, 2^2, 3^2, \dots, \infty\}$, demonstrating the isospectral nature of the Darboux transformation. For $N=3$, we verify:

$$
V^{(3)}(x) = -12 \text{sech}^2(x)
$$

with superpotential $W_3(x) = 3 \tanh(x)$ and Hamiltonian:

$$
H_3 = A_3^\dagger A_3 = -\frac{d^2}{dx^2} - 12 \text{sech}^2(x) + 3
$$

### Example 4.7.4: Connection to KdV Solitons

**Problem:** Show how SUSY QM generates KdV soliton solutions.

**Derivation:**

The Korteweg-de Vries equation:

$$
u_t + 6u u_x + u_{xxx} = 0
$$

admits a Lax pair formulation where the spatial operator is $L = -\partial_{xx} + u(x,t)$ and the time evolution satisfies $L_t = [L, M]$. The connection to supersymmetric quantum mechanics becomes apparent when we interpret the Darboux transformation acting on $L$:

$$
L^{(1)} = A^\dagger A = -\partial_{xx} + u^{(1)}(x)
$$

where $A = \partial_x + W(x)$ and $u^{(1)}(x) = u^{(0)}(x) - 2 W'(x)$.

Starting from the free particle background $u^{(0)}(x) = 0$, we choose the superpotential:

$$
W(x) = \tanh(x/2)
$$

This generates the one-soliton potential:

$$
u^{(1)}(x) = -2 \frac{\partial}{\partial x} \tanh(x/2) = \text{sech}^2(x/2)
$$

The time evolution of this solution yields the traveling wave:

$$
u(x,t) = 2 \frac{\partial^2}{\partial x^2} \ln(1 + e^{x - 4t}) = \text{sech}^2((x - 4t)/2)
$$

For the two-soliton solution, we apply a double Darboux transformation with:

$$
W_1(x) = \tanh(x/2), \quad W_2(x) = \tanh((x - x_0)/2)
$$

The resulting potential is $u^{(2)}(x) = 2 \frac{\partial}{\partial x} [\ln(\cosh(x/2)\cosh((x-x_0)/2))]$, demonstrating how the Darboux transformation generates multi-soliton solutions from the factorization structure.

### Example 4.7.5: Advanced Application—Scarf II Potential

**Problem:** Solve Scarf II potential using shape invariance with complex parameters.

**Solution:**

The Scarf II potential provides an example of shape invariance with complex parameter structure:

$$
V(x; \alpha) = [\alpha(\alpha-1) + 1/4] \text{sech}^2(x) - [\alpha(\alpha-1)] \text{sech}^2(x) \tanh^2(x)
$$

The superpotential takes the form:

$$
W(x; \alpha) = (\alpha - 1/2) \tanh(x)
$$

Computing the partner potential reveals the shape invariance:

$$
\tilde{V}(x; \alpha) = W^2 + W' = (\alpha + 1/2)(\alpha - 3/2) \text{sech}^2(x) = V(x; \alpha+1) + 2\alpha
$$

The energy levels follow algebraically:

$$
E_n = n(n + 2\alpha - 1), \quad n = 0,1,2,\dots
$$

The wavefunctions are expressed in terms of Jacobi polynomials:

$$
\psi_n^{(\alpha)}(x) = (\text{sech } x)^\alpha P_n^{(\alpha-1/2,\alpha-1/2)}(i \tanh x)
$$

For $\alpha = 3/2$, we verify the spectrum:

$$
E_0 = 0, \quad E_1 = 3, \quad E_2 = 8, \quad E_3 = 15
$$

with wavefunctions given by associated Legendre functions, demonstrating the connection between shape invariance and special functions.

### Example 4.7.6: Broken Supersymmetry

**Problem:** Demonstrate when SUSY breaking occurs and its physical implications.

**Analysis:**

The potential:

$$
V(x) = x^4 - \frac{3}{2}x^2
$$

exhibits broken supersymmetry. Attempting factorization with a polynomial superpotential $W(x) = ax^3 + bx$ yields:

$$
V(x) = W^2 - W' = a^2x^6 + 2ab x^4 + b^2x^2 - 3a x^2 - b
$$

No real solution exists that matches the quartic form $x^4 - \frac{3}{2}x^2$, indicating that exact factorization is impossible.

Numerical solution of $H\psi = E\psi$ reveals that the ground state energy is $E_0 \approx 0.409 > 0$, and no state satisfies $A\psi_0 = 0$. Forcing factorization with this numerical ground state energy:

$$
W(x) = -\frac{\psi_0'}{\psi_0} \quad \text{(numerical $\psi_0$)}
$$

produces a partner Hamiltonian $H_2$ with a different ground state energy, breaking the spectral symmetry. The Witten index:

$$
\text{Index} = n_b^{(0)} - n_f^{(0)} = 1 - 1 = 0
$$

vanishes, confirming that supersymmetry is spontaneously broken. This demonstrates that not all potentials admit exact factorization, and the condition for unbroken supersymmetry—a normalizable ground state with zero energy—is non-trivial.

### Example 4.7.7: Infinite Shape Invariance Chain

**Problem:** Construct infinite hierarchy connecting all shape-invariant potentials.

**Complete Classification Table:**

| Potential | Superpotential | Remainder | Energies | Wavefunctions |
|-----------|----------------|-----------|----------|---------------|
| Harmonic | $W = \omega x/2$ | $R = \omega$ | $E_n = n\omega$ | Hermite |
| Coulomb | $W = l/r + k/r$ | $R = 2k$ | $E_n = -k^2/(n+k)^2$ | Laguerre |
| Pöschl-Teller I | $W = \alpha \tanh x$ | $R = 2\alpha$ | $E_n = n(n+2\alpha-1)$ | Jacobi |
| Pöschl-Teller II | $W = \alpha/\sinh x$ | $R = 2\alpha$ | $E_n = -\alpha^2 + n(n+2\alpha)$ | Jacobi |
| Morse | $W = \alpha - \beta e^{-x}$ | $R = 2\sqrt{\beta}$ | $E_n = (n+1/2)^2\beta$ | Laguerre |
| Scarf I | $W = (\alpha-1/2) \tan x$ | $R = 2\alpha$ | $E_n = n(n+2\alpha-1)$ | Jacobi |
| Scarf II | $W = (\alpha-1/2) \tanh x$ | $R = 2\alpha$ | $E_n = n(n+2\alpha-1)$ | Jacobi |
| Rosen-Morse | $W = \alpha \tanh x + \beta \text{sech } x$ | $R = 2\alpha$ | $E_n = n(n+2\alpha-1)$ | Jacobi |
| Eckart | $W = \alpha \coth x + \beta \tanh x$ | $R = 2\alpha$ | $E_n = n(n+2\alpha-1)$ | Jacobi |

### Example 4.7.8: SUSY QM and Special Functions Unification

**Problem:** Show how Chapter 1.2 special functions emerge from SUSY QM.

**Derivation: Hermite → Laguerre**

The harmonic oscillator Hamiltonian:

$$
H = -\frac{d^2}{dx^2} + x^2
$$

with superpotential $W_0(x) = x$ yields wavefunctions:

$$
\psi_n^H(x) = H_n(x) e^{-x^2/2}
$$

in terms of Hermite polynomials. The connection to Laguerre polynomials emerges through dimensional reduction. The three-dimensional oscillator reduces to the radial equation:

$$
R'' + \frac{2}{r}R' + \left[2E - \frac{l(l+1)}{r^2} - r^2\right]R = 0
$$

Applying the SUSY transformation with radial superpotential:

$$
W_r(r) = \frac{l}{r} + r
$$

produces the potential:

$$
V_r(r) = \frac{(l+1)(l+2)}{r^2} + r^2 - 2
$$

The shape invariance condition:

$$
\tilde{V}_r(r; l) = V_r(r; l+1) + 2
$$

yields the energy spectrum:

$$
E_n^l = 2n + l + \frac{3}{2}
$$

with wavefunctions:

$$
\psi_n^l(r) = r^l e^{-r^2/2} L_n^l(r^2)
$$

expressed in terms of Laguerre polynomials. This demonstrates how the supersymmetric structure unifies the special functions: Laguerre polynomials emerge from Hermite polynomials through the SUSY transformation, revealing the underlying algebraic hierarchy connecting these classical orthogonal polynomials.

## References

* Cooper, F., Khare, A., & Sukhatme, U. (1995). *Supersymmetry and Quantum Mechanics*. Physics Reports, 251.
* Infeld, L., & Hull, T. E. (1951). *The Factorization Method*. Reviews of Modern Physics.
* Matveev, V. B., & Salle, M. A. (1991). *Darboux Transformations and Solitons*. Springer.
* Witten, E. (1981). *Dynamical Breaking of Supersymmetry*. Nuclear Physics B.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 4.6 Recursion Operators & Hirota Bilinearization]({{ '/diffequations/chapter-04/04-6-recursion-operators/' | relative_url }})
- [Next Section: 4.8 Nonlocal Symmetries & Potential Systems]({{ '/diffequations/chapter-04/04-8-nonlocal-symmetries/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-04/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
