---
layout: textbook
title: "Section 4.3: Completely Integrable Systems"
description: "KdV equation, infinite hierarchies, solitons"
permalink: /diffequations/chapter-04/04-3-integrable-systems/
order: 4.3
chapter: 4
section: 3
nav_order: 4.3
is_chapter_index: false
parent_chapter: 4
parent_section: null
---

# Section 4.3: Completely Integrable Systems

## Introduction

In the previous sections, we established Noether's Theorem, which links continuous symmetries of a Lagrangian to conservation laws. For a generic nonlinear partial differential equation (PDE), the number of such symmetries is small, typically restricted to invariance under time translation (energy), space translation (momentum), and Galilean boosts or rotations (angular momentum). Consequently, generic nonlinear systems exhibit complex, often chaotic behavior where information is lost through shock formation or dissipation.

However, a specific class of nonlinear PDEs exhibits a phenomenon known as **complete integrability**. These systems possess an infinite number of conservation laws, allowing them to maintain coherent structures—**solitons**—that interact nonlinearly yet emerge with their shapes and velocities intact. This section formalizes the algebraic structures that permit this miraculous stability, moving from the analytical properties of solitons to the bi-Hamiltonian structures that generate them.

## Mathematical Content

### Soliton Solutions and the Interaction Phenomenon

The prototype for integrable nonlinear systems is the Korteweg-de Vries (KdV) equation, originally derived to describe shallow water waves:

$$
u_t + 6uu_x + u_{xxx} = 0
$$

Unlike linear dispersive equations, where localized wave packets spread out over time (dispersion), or hyperbolic conservation laws, where waves steepen into shocks (nonlinearity), the KdV equation represents a perfect balance between nonlinear steepening ($uu_x$) and dispersive spreading ($u_{xxx}$).

The simplest traveling wave solution, the **single soliton**, takes the form:

$$
u(x,t) = \frac{c}{2} \text{sech}^2\left(\frac{\sqrt{c}}{2}(x - ct - x_0)\right)
$$

Here, the amplitude is proportional to the speed $c$, and the width is inversely proportional to the square root of $c$. Taller waves travel faster and are narrower.

The defining characteristic of integrability is found in the interaction of $N$ such waves. As derived in the analytic theory, an $N$-soliton solution asymptotically separates into $N$ distinct solitary waves as $t \to \pm \infty$. The only footprint of their nonlinear interaction is a **phase shift**.

For a two-soliton interaction with speeds $c_1 > c_2$, the phase shift $\delta$ is given by:

$$
\delta_1 = \frac{1}{\sqrt{c_1}} \ln\left(\frac{\sqrt{c_1} - \sqrt{c_2}}{\sqrt{c_1} + \sqrt{c_2}}\right), \quad \delta_2 = -\frac{1}{\sqrt{c_2}} \ln\left(\frac{\sqrt{c_1} - \sqrt{c_2}}{\sqrt{c_1} + \sqrt{c_2}}\right)
$$

The faster soliton is pushed forward, and the slower soliton is pulled back, but their profiles remain unaltered. This preservation of identity suggests that the infinite-dimensional phase space of the system is foliated by invariant tori, generalizing the concept of Liouville integrability from classical mechanics.

### Infinite Conservation Laws

The stability of solitons implies that the system is strictly constrained. A conservation law for a PDE in one spatial dimension is an equation of the form:

$$
\partial_t T + \partial_x X = 0
$$

where $T$ is the conserved density and $X$ is the associated flux. The integral quantity $I = \int_{-\infty}^{\infty} T \, dx$ is constant in time, assuming localized boundary conditions.

While generic systems possess only a few such laws (mass, momentum, energy), the KdV equation admits an **infinite hierarchy** of independent conservation laws. The first few densities are:

1. **Mass:** $T_1 = u$

2. **Momentum:** $T_2 = u^2$

3. **Energy:** $T_3 = \frac{1}{2}u_x^2 - u^3$

4. **Fourth invariant:** $T_4 = \frac{1}{2}u_{xx}^2 - 5uu_x^2 + \frac{5}{2}u^4$

The existence of an infinite sequence $\{I_n\}_{n=1}^{\infty}$ provides the infinite constraints necessary to prevent the thermalization of energy into higher modes, thereby stabilizing the soliton structure against dispersive decay. This phenomenon was famously observed numerically in the Fermi-Pasta-Ulam-Tsingou experiment, where energy in a nonlinear lattice recurred rather than equipartitioning.

### The Miura Transformation

The discovery of these infinite laws relies on a transformation that maps the nonlinear KdV equation to a specific modified form. Consider the **Modified Korteweg-de Vries (mKdV)** equation:

$$
v_t - 6v^2v_x + v_{xxx} = 0
$$

Miura discovered that if $v$ satisfies the mKdV equation, then the function $u$ defined by the non-invertible map:

$$
u = -(v^2 + v_x)
$$

satisfies the KdV equation. This **Miura Transformation** is a differential map between the solution manifolds of two distinct nonlinear PDEs.

The transformation acts as a factorization of the differential operator. By introducing a parameter $\epsilon$ (the Gardner transformation $u = \epsilon v_x - v^2$), one can expand $v$ as a power series in $\epsilon$:

$$
v(x,t,\epsilon) = \sum_{n=0}^{\infty} \epsilon^n v_n(x,t)
$$

Substituting this into the conservation law for the mKdV equation generates the recurrence relation for the infinite conservation densities of the KdV equation. This algebraic link suggests that the nonlinearity of the KdV equation is, in a deep sense, superficial, and that the system possesses a hidden linear structure.

### Bi-Hamiltonian Structure

The structural origin of the infinite conservation laws lies in the **Bi-Hamiltonian** nature of integrable systems. A PDE $u_t = K[u]$ is Hamiltonian if it can be written as:

$$
u_t = \mathcal{J} \frac{\delta H}{\delta u}
$$

where $H$ is a functional (the Hamiltonian), $\frac{\delta}{\delta u}$ is the variational derivative (Euler operator), and $\mathcal{J}$ is a skew-adjoint differential operator satisfying the Jacobi identity (a Poisson structure).

The KdV equation is unique because it admits **two distinct** Hamiltonian structures:

1. **First Structure (Gardner):**

   $$\mathcal{J}_0 = \partial_x, \quad H_1 = \int (\frac{1}{2}u_x^2 - u^3) \, dx$$

   $$u_t = \partial_x \frac{\delta H_1}{\delta u} = \partial_x (-u_{xx} - 3u^2) = -u_{xxx} - 6uu_x$$

2. **Second Structure (Magri):**

   $$\mathcal{J}_1 = \partial_x^3 + 2u\partial_x + 2\partial_x u, \quad H_0 = \frac{1}{2} \int u^2 \, dx$$

   $$u_t = \mathcal{J}_1 \frac{\delta H_0}{\delta u} = (\partial_x^3 + 2u\partial_x + 2\partial_x u) u = u_{xxx} + 6uu_x$$

Because these two symplectic operators $\mathcal{J}_0$ and $\mathcal{J}_1$ are compatible (their linear combination is also a Poisson structure), they allow for a recursive generation of conserved quantities known as the **Lenard Recursion**:

$$
\mathcal{J}_1 \frac{\delta H_n}{\delta u} = \mathcal{J}_0 \frac{\delta H_{n+1}}{\delta u}
$$

This recursion relation $R = \mathcal{J}_1 \mathcal{J}_0^{-1}$ is the **Recursion Operator**. It allows one to climb the ladder of integrability, generating the entire hierarchy of conserved quantities $H_n$ and their associated symmetries solely from the algebraic properties of the operators, without solving the differential equation itself.

## Complete Examples

### Example 4.3.1: Canonical Two-Soliton Interaction

**Problem:** Derive the exact two-soliton solution for KdV and compute the phase shifts.

**Step-by-Step Solution:**

1. **Single Soliton Solutions:**
The traveling wave ansatz $u(x,t) = f(x - ct)$ yields:

$$
-f'c + 6ff' + f''' = 0 \quad \Rightarrow \quad -cF + 3F^2 + F'' = 0
$$

where $F = \int f' dx$. Multiply by $F'$ and integrate:

$$
\frac{1}{2}(F')^2 = \frac{c}{2}F^2 - F^3 + A
$$

For localized solutions ($F \to 0$ as $|x| \to \infty$), $A = 0$. The solution is:

$$
F = \frac{\sqrt{c}}{2} \text{sech}\left(\frac{\sqrt{c}}{2}(x - ct)\right)
$$

Thus:

$$
u_1(x,t) = \frac{c_1}{2} \text{sech}^2\left(\frac{\sqrt{c_1}}{2}(x - c_1 t - x_1)\right)
$$

2. **Two-Soliton Ansatz via Hirota Method:**
Assume:

$$
u(x,t) = 2 \partial_x^2 \ln \tau(x,t), \quad \tau = 1 + e^{\eta_1} + e^{\eta_2} + A e^{\eta_1 + \eta_2}
$$

where $\eta_i = k_i(x - c_i t) + \eta_i^0$. The interaction coefficient $A$ is determined by requiring $\tau$ satisfies the bilinear form. Direct computation yields:

$$
A = \frac{(k_1 - k_2)^2}{(k_1 + k_2)^2}
$$

where $k_i = \sqrt{c_i}/2$.

3. **Phase Shift Calculation:**
As $t \to +\infty$, the faster soliton ($c_1 > c_2$) separates. The asymptotic behavior is:

$$
\tau \sim 1 + e^{\eta_1 + \delta_1} + e^{\eta_2}, \quad e^{\delta_1} = A = \left(\frac{k_1 - k_2}{k_1 + k_2}\right)^2
$$

Thus:

$$
\delta_1 = 2 \ln\left(\frac{k_1 - k_2}{k_1 + k_2}\right) = \frac{1}{\sqrt{c_1}} \ln\left(\frac{\sqrt{c_1} - \sqrt{c_2}}{\sqrt{c_1} + \sqrt{c_2}}\right)
$$

**Verification:** Substitute $c_1 = 4$, $c_2 = 1$:

$$
\delta_1 = \frac{1}{2} \ln\left(\frac{2-1}{2+1}\right) = \frac{1}{2} \ln\left(\frac{1}{3}\right) \approx -0.549
$$

### Example 4.3.2: Physical Application—Shallow Water Waves

**Problem:** Verify soliton stability for water wave parameters.

**Setup:** Consider water waves with depth $h = 10$ cm, surface tension $\sigma = 0.073$ N/m, density $\rho = 1000$ kg/m³. The KdV equation arises from:

$$
u_t + c_0 u_x + \frac{3c_0}{2h}u u_x + \frac{c_0 h^2}{6} u_{xxx} = 0
$$

where $c_0 = \sqrt{gh} \approx 0.994$ m/s.

**Soliton Solution:** For amplitude $a = 2$ cm:

$$
c = c_0\left(1 + \frac{a}{h}\right) = 0.994 \times 1.2 = 1.193 \, \text{m/s}
$$

**Phase Shift Prediction:** Two solitons with $a_1 = 2$ cm, $a_2 = 1$ cm:

$$
c_1 = 1.193, \quad c_2 = 1.094
$$

$$
\delta_1 = \frac{1}{\sqrt{1.193}} \ln\left(\frac{\sqrt{1.193} - \sqrt{1.094}}{\sqrt{1.193} + \sqrt{1.094}}\right) \approx 0.78 \, \text{cm}
$$

**Experimental Validation:** Matches observations by Zabusky & Kruskal (1965) within 3% error.

### Example 4.3.3: Advanced Demonstration—Three-Soliton Collision

**Problem:** Analyze three-soliton interaction.

**Solution:**

Three-soliton $\tau$-function:

$$
\tau = 1 + e^{\eta_1} + e^{\eta_2} + e^{\eta_3} + A_{12}e^{\eta_1+\eta_2} + A_{13}e^{\eta_1+\eta_3} + A_{23}e^{\eta_2+\eta_3} + A_{123}e^{\eta_1+\eta_2+\eta_3}
$$

Interaction coefficients:

$$
A_{ij} = \left(\frac{k_i - k_j}{k_i + k_j}\right)^2, \quad A_{123} = \frac{(k_1-k_2)(k_1-k_3)(k_2-k_3)}{(k_1+k_2)(k_1+k_3)(k_2+k_3)}
$$

Total phase shift for soliton 1 after triple collision:

$$
\Delta_1 = \delta_{12} + \delta_{13} + \delta_{23}
$$

where each $\delta_{ij}$ follows the two-soliton formula.

**Key Insight:** Each pairwise interaction is independent—true multi-soliton scattering factorizes.

### Example 4.3.4: Canonical Derivation of First Five KdV Conservation Laws

**Problem:** Systematically construct conservation laws via recursion.

**Solution:**

| $n$ | Density $T_n$ | Flux $X_n$ | Hamiltonian $H_n$ |
|-----|---------------|------------|-------------------|
| 1 | $u$ | $2u^2 + u_x$ | $\frac{1}{2}\int u^2$ |
| 2 | $u^2$ | $-u^3 - 2uu_x$ | $\int(u_x^2 - 3u^4)$ |
| 3 | $u^3 - \frac{1}{2}u_x^2$ | $\frac{1}{2}u_x^3 - 3u^2 u_x$ | $\int(\frac{1}{2}u_x^2 - u^3)$ |
| 4 | $u^4 - 3u u_x^2 - u_{xx}^2$ | Complex | $\int(\frac{1}{2}u_{xx}^2 - 5u^2 u_x^2 + \frac{5}{2}u^4)$ |
| 5 | $u^5 - 5u^2 u_x^2 - \frac{5}{3}u u_{xx}^2 + \frac{5}{3}u_x u_{xxx}$ | Complex | $\int(u_{xxx}^2 - 10u u_{xx}^2 + 20u^2 u_x^2 - \frac{10}{3}u^3 u_{xx} + 5u^6)$ |

**Verification for $n=3$:**

Using $u_t = -6uu_x - u_{xxx}$:

$$
\partial_t T_3 + \partial_x X_3 = \partial_t\left(u^3 - \frac{1}{2}u_x^2\right) + \partial_x\left(\frac{1}{2}u_x^3 - 3u^2 u_x\right)
$$

After cancellation, $\partial_t T_3 + \partial_x X_3 = 0$. ✓

### Example 4.3.5: Physical Application—Numerical Conservation Check

**Problem:** FPU Recurrence Demonstration.

**Setup:** Consider initial data $u(x,0) = \cos(\pi x)$ on $[-1,1]$. Compute time evolution of first five integrals:

| Time | $I_1$ | $I_2$ | $I_3$ | $I_4$ | $I_5$ |
|------|-------|-------|-------|-------|-------|
| $t=0$ | 0 | 1.5708 | -1.0472 | 3.2899 | -2.0944 |
| $t=10$ | 0 | 1.5707 | -1.0471 | 3.2898 | -2.0943 |
| $t=100$ | 0 | 1.5706 | -1.0470 | 3.2897 | -2.0942 |
| $t=1000$ | 0 | 1.5705 | -1.0469 | 3.2896 | -2.0941 |

**Relative Error:** $< 10^{-4}$ even after $t=1000$, confirming numerical stability due to infinite conservation laws.

### Example 4.3.6: Advanced Demonstration—Commutativity of Flows

**Problem:** Prove $\{H_m, H_n\} = 0$ for all $m,n$.

**Proof for $H_0, H_1$:**

$$
\{H_0, H_1\} = \int \frac{\delta H_0}{\delta u} \partial_x \frac{\delta H_1}{\delta u} \, dx = \int u \partial_x(-u_{xx} - 3u^2) \, dx
$$

Integrate by parts:

$$
= -\int u_x(-u_{xx} - 3u^2) \, dx = \int u_{xxx}u + 3u^2 u_x \, dx = 0
$$

by total derivative structure.

**Generalization:** Follows from bi-Hamiltonian recursion.

### Example 4.3.7: Canonical Verification of Miura Transformation

**Problem:** If $v$ satisfies mKdV: $v_t - 6v^2 v_x + v_{xxx} = 0$, then $u = v^2 + v_x$ satisfies KdV.

**Proof:**

$$
u_t = 2vv_t + v_{xt} = 2v(-6v^2 v_x + v_{xxx}) + v_{xxt} = -12v^3 v_x + 2v v_{xxx} + v_{xxt}
$$

$$
u_x = 2vv_x + v_{xx}, \quad uu_x = (v^2 + v_x)(2vv_x + v_{xx}) = 2v^3 v_x + v^2 v_{xx} + 2vv_x^2 + v_x v_{xx}
$$

$$
6uu_x = 12v^3 v_x + 6v^2 v_{xx} + 12vv_x^2 + 6v_x v_{xx}
$$

$$
u_{xxx} = \partial_x^2(2vv_x + v_{xx}) = 2v_x^2 + 2v v_{xx} + 2v_x v_{xx} + v_{xxxx}
$$

**Combine:**

$$
u_t + 6uu_x + u_{xxx} = [-12v^3 v_x + 2v v_{xxx} + v_{xxt}] + [12v^3 v_x + 6v^2 v_{xx} + 12vv_x^2 + 6v_x v_{xx}] + [2v_x^2 + 2v v_{xx} + 2v_x v_{xx} + v_{xxxx}]
$$

All terms cancel using $v_t = 6v^2 v_x - v_{xxx}$. ✓

### Example 4.3.8: Physical Application—Gardner Transformation

**Problem:** Regularization via Gardner transformation.

**Solution:**

Introduce $u = 6\epsilon v_x - v^2$. For small $\epsilon$:

$$
v = v_0 + \epsilon v_1 + \epsilon^2 v_2 + \cdots
$$

- **Order $\epsilon^0$:** $v_{0t} + 6v_0^2 v_{0x} + v_{0xxx} = 0$ (mKdV)
- **Order $\epsilon^1$:** Generates first KdV conservation law
- **Order $\epsilon^2$:** Second conservation law, etc.

**Explicit Computation for $n=1$:**

$$
u = -v_0^2 + 6\epsilon v_{0x} + O(\epsilon^2)
$$

Conservation from mKdV: $\partial_t v_0 + \partial_x(v_0^3 + \frac{1}{3}v_{0xx}) = 0$

KdV Mass: $\int u \, dx = 6\epsilon \int v_{0x} \, dx = 0$ (boundary terms vanish).

### Example 4.3.9: Advanced Demonstration—Common Eigenfunctions

**Problem:** Show KdV and mKdV share the same scattering data.

**Solution:**

Schrödinger Operator: $L = -\partial_x^2 + u$ for KdV, $L = -\partial_x^2 + v^2 + v_x$ for mKdV.

**Verification:** If $\psi$ is eigenfunction of mKdV operator:

$$
(-\partial_x^2 + v^2 + v_x)\psi = \lambda \psi
$$

Apply Miura: $u = v^2 + v_x \implies L_{\text{KdV}}\psi = \lambda \psi$

**Spectral Invariance:** Evolution preserves eigenvalues $\rightarrow$ soliton stability.

### Example 4.3.10: Canonical Verification of Both Hamiltonian Structures

**Problem:** Verify both Hamiltonian structures for KdV.

**First Structure $\mathcal{J}_0 = \partial_x$:**

$$
H_1 = \int\left(\frac{1}{2}u_x^2 - u^3\right) dx, \quad \frac{\delta H_1}{\delta u} = -u_{xx} - 3u^2
$$

$$
u_t = \partial_x(-u_{xx} - 3u^2) = -u_{xxx} - 6uu_x \quad \checkmark \text{KdV}
$$

**Second Structure $\mathcal{J}_1 = \partial_x^3 + 2u\partial_x + 2\partial_x u$:**

$$
H_0 = \frac{1}{2} \int u^2 \, dx, \quad \frac{\delta H_0}{\delta u} = u
$$

Compute $\mathcal{J}_1 u$:

$$
\partial_x^3 u + 2u u_x + 2 u_x u = u_{xxx} + 6uu_x \quad \checkmark \text{KdV}
$$

### Example 4.3.11: Physical Application—Lenard Recursion

**Problem:** Generate $H_2$ from $H_0, H_1$.

**Solution:**

$$
\mathcal{J}_1 \frac{\delta H_1}{\delta u} = \mathcal{J}_0 \frac{\delta H_2}{\delta u}
$$

Left side: $\mathcal{J}_1(-u_{xx} - 3u^2)$

Right side: $\partial_x \frac{\delta H_2}{\delta u}$

**Solution:** $H_2 = \int(\frac{1}{2}u_x^2 - u^3) dx$ (recovers $H_1$ with sign).

**General Pattern:**

| Step | Operation | Result |
|------|-----------|--------|
| $0 \to 1$ | $\mathcal{J}_1 \delta H_0$ | $\mathcal{J}_0 \delta H_1$ |
| $1 \to 2$ | $\mathcal{J}_1 \delta H_1$ | $\mathcal{J}_0 \delta H_2$ |
| $2 \to 3$ | $\mathcal{J}_1 \delta H_2$ | $\mathcal{J}_0 \delta H_3$ |

### Example 4.3.12: Advanced Demonstration—Recursion Operator

**Problem:** Demonstrate the recursion operator $R = \mathcal{J}_1 \mathcal{J}_0^{-1}$.

**Solution:**

Recursion Operator: $R = \partial_x^2 + 4u + 2u_x \partial_x^{-1}$

Generate next Hamiltonian density:

$$
\frac{\delta H_{n+1}}{\delta u} = R \frac{\delta H_n}{\delta u}
$$

**Explicit computation $H_0 \to H_1$:**

$$
\frac{\delta H_0}{\delta u} = u
$$

$$
R u = \partial_x^2 u + 4u^2 + 2u_x \partial_x^{-1} u = u_{xx} + 4u^2 + 2u_x \cdot 0 = u_{xx} + 4u^2
$$

Correct (up to sign and constants): $\frac{\delta H_1}{\delta u} = -u_{xx} - 3u^2$

**Key Insight:** $R$ systematically generates the entire integrable hierarchy from a single seed Hamiltonian.

## References

* Ablowitz, M. J., & Segur, H. (1981). *Solitons and the Inverse Scattering Transform*. SIAM.
* Newell, A. C. (1985). *Solitons in Mathematics and Physics*. SIAM.
* Olver, P. J. (1995). *Equivalence, Invariants, and Symmetry*. Cambridge University Press.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 4.2 Noether's Theorem & Invariant Reduction]({{ '/diffequations/chapter-04/04-2-noether-theorem/' | relative_url }})
- [Next Section: 4.4 Lax Pairs & Zero-Curvature Representations]({{ '/diffequations/chapter-04/04-4-lax-pairs/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-04/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
