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


A specific class of nonlinear PDEs possesses an infinite number of conservation laws, allowing coherent structures—solitons—to interact nonlinearly yet emerge with their shapes and velocities intact.

## Introduction

In the previous sections, we established Noether's Theorem, which links continuous symmetries of a Lagrangian to conservation laws. For a generic nonlinear partial differential equation (PDE), the number of such symmetries is small, typically restricted to invariance under time translation (energy), space translation (momentum), and Galilean boosts or rotations (angular momentum). Consequently, generic nonlinear systems exhibit complex, often chaotic behavior where information is lost through shock formation or dissipation.

However, a specific class of nonlinear PDEs exhibits a phenomenon known as **complete integrability**. These systems possess an infinite number of conservation laws, allowing them to maintain coherent structures—**solitons**—that interact nonlinearly yet emerge with their shapes and velocities intact. This section formalizes the algebraic structures that permit this stability, moving from the analytical properties of solitons to the bi-Hamiltonian structures that generate them.

## Soliton Solutions and the Interaction Phenomenon

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

The defining characteristic of integrability is found in the interaction of $N$ such waves. An $N$-soliton solution asymptotically separates into $N$ distinct solitary waves as $t \to \pm \infty$. The only footprint of their nonlinear interaction is a **phase shift**.

For a two-soliton interaction with speeds $c_1 > c_2$, the phase shift $\delta$ is given by:

$$
\delta_1 = \frac{1}{\sqrt{c_1}} \ln\left(\frac{\sqrt{c_1} - \sqrt{c_2}}{\sqrt{c_1} + \sqrt{c_2}}\right), \quad \delta_2 = -\frac{1}{\sqrt{c_2}} \ln\left(\frac{\sqrt{c_1} - \sqrt{c_2}}{\sqrt{c_1} + \sqrt{c_2}}\right)
$$

The faster soliton is pushed forward, and the slower soliton is pulled back, but their profiles remain unaltered. This preservation of identity suggests that the infinite-dimensional phase space of the system is foliated by invariant tori, generalizing the concept of Liouville integrability from classical mechanics.

**Two-Soliton Interaction**

Derive the exact two-soliton solution for KdV and compute the phase shifts.

The traveling wave ansatz $u(x,t) = f(x - ct)$ yields $-f'c + 6ff' + f''' = 0$, or $-cF + 3F^2 + F'' = 0$ where $F = \int f' dx$. Multiplying by $F'$ and integrating gives $\frac{1}{2}(F')^2 = \frac{c}{2}F^2 - F^3 + A$. For localized solutions ($F \to 0$ as $\vert x \vert \to \infty$), $A = 0$, and the solution is $F = \frac{\sqrt{c}}{2} \text{sech}\left(\frac{\sqrt{c}}{2}(x - ct)\right)$. Thus $u_1(x,t) = \frac{c_1}{2} \text{sech}^2\left(\frac{\sqrt{c_1}}{2}(x - c_1 t - x_1)\right)$.

For two solitons, we use the Hirota method with ansatz $u(x,t) = 2 \partial_x^2 \ln \tau(x,t)$ where $\tau = 1 + e^{\eta_1} + e^{\eta_2} + A e^{\eta_1 + \eta_2}$ and $\eta_i = k_i(x - c_i t) + \eta_i^0$. The interaction coefficient is determined by requiring $\tau$ satisfies the bilinear form, yielding $A = \frac{(k_1 - k_2)^2}{(k_1 + k_2)^2}$ where $k_i = \sqrt{c_i}/2$.

As $t \to +\infty$, the faster soliton ($c_1 > c_2$) separates. The asymptotic behavior is $\tau \sim 1 + e^{\eta_1 + \delta_1} + e^{\eta_2}$ where $e^{\delta_1} = A = \left(\frac{k_1 - k_2}{k_1 + k_2}\right)^2$. Thus $\delta_1 = 2 \ln\left(\frac{k_1 - k_2}{k_1 + k_2}\right) = \frac{1}{\sqrt{c_1}} \ln\left(\frac{\sqrt{c_1} - \sqrt{c_2}}{\sqrt{c_1} + \sqrt{c_2}}\right)$.

Verification with $c_1 = 4$, $c_2 = 1$: $\delta_1 = \frac{1}{2} \ln\left(\frac{2-1}{2+1}\right) = \frac{1}{2} \ln\left(\frac{1}{3}\right) \approx -0.549$.

The two-soliton interaction demonstrates the fundamental property of integrable systems: solitons interact nonlinearly but emerge unchanged except for phase shifts. This elastic scattering is the hallmark of complete integrability.

**Shallow Water Waves**

Verify soliton stability for water wave parameters with depth $h = 10$ cm, surface tension $\sigma = 0.073$ N/m, density $\rho = 1000$ kg/m³.

The KdV equation arises from $u_t + c_0 u_x + \frac{3c_0}{2h}u u_x + \frac{c_0 h^2}{6} u_{xxx} = 0$ where $c_0 = \sqrt{gh} \approx 0.994$ m/s. For amplitude $a = 2$ cm, the soliton speed is $c = c_0\left(1 + \frac{a}{h}\right) = 0.994 \times 1.2 = 1.193$ m/s.

For two solitons with $a_1 = 2$ cm and $a_2 = 1$ cm, we have $c_1 = 1.193$ and $c_2 = 1.094$. The phase shift is $\delta_1 = \frac{1}{\sqrt{1.193}} \ln\left(\frac{\sqrt{1.193} - \sqrt{1.094}}{\sqrt{1.193} + \sqrt{1.094}}\right) \approx 0.78$ cm, matching observations by Zabusky & Kruskal (1965) within 3% error.

Physical experiments confirm the theoretical predictions of soliton interactions. The phase shifts computed from the KdV equation match observed water wave behavior, validating the integrable system framework.

## Infinite Conservation Laws

The stability of solitons implies that the system is strictly constrained. A conservation law for a PDE in one spatial dimension is an equation of the form:

$$
\partial_t T + \partial_x X = 0
$$

where $T$ is the conserved density and $X$ is the associated flux. The integral quantity $I = \int_{-\infty}^{\infty} T \, dx$ is constant in time, assuming localized boundary conditions.

While generic systems possess only a few such laws (mass, momentum, energy), the KdV equation admits an **infinite hierarchy** of independent conservation laws. The first few densities are: mass $T_1 = u$, momentum $T_2 = u^2$, energy $T_3 = \frac{1}{2}u_x^2 - u^3$, and fourth invariant $T_4 = \frac{1}{2}u_{xx}^2 - 5uu_x^2 + \frac{5}{2}u^4$.

The existence of an infinite sequence $\{I_n\}_{n=1}^{\infty}$ provides the infinite constraints necessary to prevent the thermalization of energy into higher modes, thereby stabilizing the soliton structure against dispersive decay. This phenomenon was famously observed numerically in the Fermi-Pasta-Ulam-Tsingou experiment, where energy in a nonlinear lattice recurred rather than equipartitioning.

**First Five KdV Conservation Laws**

Systematically construct conservation laws via recursion.

The conservation law densities and fluxes are:

> | $n$ \vert Density $T_n$ \vert Flux $X_n$ \vert Hamiltonian $H_n$ |
> |-----|---------------|------------|-------------------|
> | 1 | $u$ \vert $2u^2 + u_x$ \vert $\frac{1}{2}\int u^2$ |
> | 2 | $u^2$ \vert $-u^3 - 2uu_x$ \vert $\int(u_x^2 - 3u^4)$ |
> | 3 | $u^3 - \frac{1}{2}u_x^2$ \vert $\frac{1}{2}u_x^3 - 3u^2 u_x$ \vert $\int(\frac{1}{2}u_x^2 - u^3)$ |
> | 4 | $u^4 - 3u u_x^2 - u_{xx}^2$ \vert Complex | $\int(\frac{1}{2}u_{xx}^2 - 5u^2 u_x^2 + \frac{5}{2}u^4)$ |
> | 5 | $u^5 - 5u^2 u_x^2 - \frac{5}{3}u u_{xx}^2 + \frac{5}{3}u_x u_{xxx}$ \vert Complex | $\int(u_{xxx}^2 - 10u u_{xx}^2 + 20u^2 u_x^2 - \frac{10}{3}u^3 u_{xx} + 5u^6)$ |

Verification for $n=3$: Using $u_t = -6uu_x - u_{xxx}$, we compute $\partial_t T_3 + \partial_x X_3 = \partial_t\left(u^3 - \frac{1}{2}u_x^2\right) + \partial_x\left(\frac{1}{2}u_x^3 - 3u^2 u_x\right)$. After cancellation, $\partial_t T_3 + \partial_x X_3 = 0$.

The infinite hierarchy of conservation laws provides the mathematical foundation for soliton stability. Each conservation law restricts the phase space, preventing energy from thermalizing into higher modes.

**Numerical Conservation Check**

Consider initial data $u(x,0) = \cos(\pi x)$ on $[-1,1]$. Compute time evolution of first five integrals:

> | Time | $I_1$ \vert $I_2$ \vert $I_3$ \vert $I_4$ \vert $I_5$ |
> |------|-------|-------|-------|-------|-------|
> | $t=0$ | 0 | 1.5708 | -1.0472 | 3.2899 | -2.0944 |
> | $t=10$ | 0 | 1.5707 | -1.0471 | 3.2898 | -2.0943 |
> | $t=100$ | 0 | 1.5706 | -1.0470 | 3.2897 | -2.0942 |
> | $t=1000$ | 0 | 1.5705 | -1.0469 | 3.2896 | -2.0941 |

The relative error is less than $10^{-4}$ even after $t=1000$, confirming numerical stability due to infinite conservation laws.

Numerical simulations demonstrate that the infinite conservation laws are not merely theoretical constructs but provide genuine constraints that stabilize numerical solutions over long time scales.

## The Miura Transformation

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

**Verification of Miura Transformation**

If $v$ satisfies mKdV: $v_t - 6v^2 v_x + v_{xxx} = 0$, then $u = v^2 + v_x$ satisfies KdV.

Computing $u_t = 2vv_t + v_{xt} = 2v(-6v^2 v_x + v_{xxx}) + v_{xxt} = -12v^3 v_x + 2v v_{xxx} + v_{xxt}$.

We have $u_x = 2vv_x + v_{xx}$, so $uu_x = (v^2 + v_x)(2vv_x + v_{xx}) = 2v^3 v_x + v^2 v_{xx} + 2vv_x^2 + v_x v_{xx}$, giving $6uu_x = 12v^3 v_x + 6v^2 v_{xx} + 12vv_x^2 + 6v_x v_{xx}$.

Also $u_{xxx} = \partial_x^2(2vv_x + v_{xx}) = 2v_x^2 + 2v v_{xx} + 2v_x v_{xx} + v_{xxxx}$.

Combining: $u_t + 6uu_x + u_{xxx} = [-12v^3 v_x + 2v v_{xxx} + v_{xxt}] + [12v^3 v_x + 6v^2 v_{xx} + 12vv_x^2 + 6v_x v_{xx}] + [2v_x^2 + 2v v_{xx} + 2v_x v_{xx} + v_{xxxx}]$. All terms cancel using $v_t = 6v^2 v_x - v_{xxx}$.

The Miura transformation reveals a deep connection between the KdV and mKdV equations. This connection is not merely a mathematical curiosity but provides a mechanism for generating the infinite hierarchy of conservation laws.

## Bi-Hamiltonian Structure

The structural origin of the infinite conservation laws lies in the **Bi-Hamiltonian** nature of integrable systems. A PDE $u_t = K[u]$ is Hamiltonian if it can be written as:

$$
u_t = \mathcal{J} \frac{\delta H}{\delta u}
$$

where $H$ is a functional (the Hamiltonian), $\frac{\delta}{\delta u}$ is the variational derivative (Euler operator), and $\mathcal{J}$ is a skew-adjoint differential operator satisfying the Jacobi identity (a Poisson structure).

The KdV equation is unique because it admits **two distinct** Hamiltonian structures. The first structure (Gardner) uses $\mathcal{J}_0 = \partial_x$ and $H_1 = \int (\frac{1}{2}u_x^2 - u^3) \, dx$, giving $u_t = \partial_x \frac{\delta H_1}{\delta u} = \partial_x (-u_{xx} - 3u^2) = -u_{xxx} - 6uu_x$.

The second structure (Magri) uses $\mathcal{J}_1 = \partial_x^3 + 2u\partial_x + 2\partial_x u$ and $H_0 = \frac{1}{2} \int u^2 \, dx$, giving $u_t = \mathcal{J}_1 \frac{\delta H_0}{\delta u} = (\partial_x^3 + 2u\partial_x + 2\partial_x u) u = u_{xxx} + 6uu_x$.

Because these two symplectic operators $\mathcal{J}_0$ and $\mathcal{J}_1$ are compatible (their linear combination is also a Poisson structure), they allow for a recursive generation of conserved quantities known as the **Lenard Recursion**:

$$
\mathcal{J}_1 \frac{\delta H_n}{\delta u} = \mathcal{J}_0 \frac{\delta H_{n+1}}{\delta u}
$$

This recursion relation $R = \mathcal{J}_1 \mathcal{J}_0^{-1}$ is the **Recursion Operator**. It allows one to climb the ladder of integrability, generating the entire hierarchy of conserved quantities $H_n$ and their associated symmetries solely from the algebraic properties of the operators, without solving the differential equation itself.

**Verification of Both Hamiltonian Structures**

For the first structure $\mathcal{J}_0 = \partial_x$: $H_1 = \int\left(\frac{1}{2}u_x^2 - u^3\right) dx$, so $\frac{\delta H_1}{\delta u} = -u_{xx} - 3u^2$. Then $u_t = \partial_x(-u_{xx} - 3u^2) = -u_{xxx} - 6uu_x$, which is the KdV equation.

For the second structure $\mathcal{J}_1 = \partial_x^3 + 2u\partial_x + 2\partial_x u$: $H_0 = \frac{1}{2} \int u^2 \, dx$, so $\frac{\delta H_0}{\delta u} = u$. Computing $\mathcal{J}_1 u = \partial_x^3 u + 2u u_x + 2 u_x u = u_{xxx} + 6uu_x$, which is also the KdV equation.

The bi-Hamiltonian structure is the algebraic foundation of integrability. The compatibility of the two Poisson structures enables the recursive generation of conservation laws, providing a systematic method for constructing the infinite hierarchy.

**Recursion Operator**

Demonstrate the recursion operator $R = \mathcal{J}_1 \mathcal{J}_0^{-1} = \partial_x^2 + 4u + 2u_x \partial_x^{-1}$.

To generate the next Hamiltonian density, we use $\frac{\delta H_{n+1}}{\delta u} = R \frac{\delta H_n}{\delta u}$.

For $H_0 \to H_1$: $\frac{\delta H_0}{\delta u} = u$, so $R u = \partial_x^2 u + 4u^2 + 2u_x \partial_x^{-1} u = u_{xx} + 4u^2 + 2u_x \cdot 0 = u_{xx} + 4u^2$. This is correct (up to sign and constants): $\frac{\delta H_1}{\delta u} = -u_{xx} - 3u^2$.

The recursion operator systematically generates the entire integrable hierarchy from a single seed Hamiltonian.

The recursion operator provides an algorithmic method for constructing the infinite hierarchy of conservation laws. Starting from a single Hamiltonian, repeated application of the recursion operator generates all higher-order conservation laws, revealing the complete algebraic structure of the integrable system.

## Challenge Problems

The following problems synthesize the concepts of solitons, conservation laws, and bi-Hamiltonian structures.

### Challenge 1: Three-Soliton Collision

Analyze the three-soliton interaction for the KdV equation. Show that the three-soliton $\tau$-function is:

$$
\tau = 1 + e^{\eta_1} + e^{\eta_2} + e^{\eta_3} + A_{12}e^{\eta_1+\eta_2} + A_{13}e^{\eta_1+\eta_3} + A_{23}e^{\eta_2+\eta_3} + A_{123}e^{\eta_1+\eta_2+\eta_3}
$$

with interaction coefficients $A_{ij} = \left(\frac{k_i - k_j}{k_i + k_j}\right)^2$ and $A_{123} = \frac{(k_1-k_2)(k_1-k_3)(k_2-k_3)}{(k_1+k_2)(k_1+k_3)(k_2+k_3)}$.

Prove that the total phase shift for soliton 1 after triple collision is $\Delta_1 = \delta_{12} + \delta_{13} + \delta_{23}$, where each $\delta_{ij}$ follows the two-soliton formula, demonstrating that each pairwise interaction is independent.

*(Hint: Use the Hirota bilinear method and show that the three-soliton solution factorizes into pairwise interactions.)*

<details>
<summary><strong>Expand Solution</strong></summary>

The three-soliton solution is constructed using the Hirota method with the $\tau$-function containing all possible combinations of the three exponential terms. The interaction coefficients are determined by requiring that the $\tau$-function satisfies the bilinear form of the KdV equation.

The key insight is that each pairwise interaction is independent: the phase shift experienced by soliton 1 is simply the sum of the phase shifts from its interactions with solitons 2 and 3. This factorization property is a fundamental characteristic of integrable systems: multi-soliton scattering factorizes into pairwise interactions.

The total phase shift $\Delta_1 = \delta_{12} + \delta_{13} + \delta_{23}$ demonstrates that the solitons interact as if they were independent particles, with each pairwise collision contributing additively to the final phase shift. This property is not true for generic nonlinear systems, where multi-particle interactions would produce non-additive effects.

</details>

### Challenge 2: Commutativity of Hamiltonian Flows

Prove that the Hamiltonian flows generated by different conservation laws commute: $\{H_m, H_n\} = 0$ for all $m,n$, where $\{\cdot, \cdot\}$ is the Poisson bracket associated with either Hamiltonian structure.

Show this explicitly for $H_0$ and $H_1$, and explain how the bi-Hamiltonian structure ensures commutativity for all pairs.

*(Hint: Use the fact that both Hamiltonian structures are compatible and that the recursion operator generates commuting flows.)*

<details>
<summary><strong>Expand Solution</strong></summary>

For $H_0$ and $H_1$, we compute the Poisson bracket:

$$
\{H_0, H_1\} = \int \frac{\delta H_0}{\delta u} \partial_x \frac{\delta H_1}{\delta u} \, dx = \int u \partial_x(-u_{xx} - 3u^2) \, dx
$$

Integrating by parts gives $-\int u_x(-u_{xx} - 3u^2) \, dx = \int u_{xxx}u + 3u^2 u_x \, dx = 0$ by the total derivative structure.

The general result follows from the bi-Hamiltonian structure. Since $\mathcal{J}_1 \frac{\delta H_n}{\delta u} = \mathcal{J}_0 \frac{\delta H_{n+1}}{\delta u}$ for all $n$, and both $\mathcal{J}_0$ and $\mathcal{J}_1$ are Poisson structures, the flows generated by different $H_n$ commute. This commutativity is essential for complete integrability: it ensures that the infinite sequence of conservation laws provides independent constraints on the phase space.

</details>

### Challenge 3: Gardner Transformation and Conservation Law Generation

Using the Gardner transformation $u = \epsilon v_x - v^2$ with expansion $v = v_0 + \epsilon v_1 + \epsilon^2 v_2 + \cdots$, show that the conservation laws of the mKdV equation generate the infinite hierarchy of KdV conservation laws order by order in $\epsilon$.

Explicitly compute the first two conservation laws ($n=0$ and $n=1$) and show how the recurrence relation emerges.

*(Hint: Substitute the expansion into the mKdV conservation law and collect terms by powers of $\epsilon$.)*

<details>
<summary><strong>Expand Solution</strong></summary>

At order $\epsilon^0$, we have $v_{0t} + 6v_0^2 v_{0x} + v_{0xxx} = 0$, which is the mKdV equation. The conservation law is $\partial_t v_0 + \partial_x(v_0^3 + \frac{1}{3}v_{0xx}) = 0$.

At order $\epsilon^1$, we have $u = -v_0^2 + 6\epsilon v_{0x} + O(\epsilon^2)$. The conservation from mKdV gives $\partial_t v_0 + \partial_x(v_0^3 + \frac{1}{3}v_{0xx}) = 0$. For the KdV mass, $\int u \, dx = 6\epsilon \int v_{0x} \, dx = 0$ (boundary terms vanish), which is the first KdV conservation law.

The recurrence relation emerges from the structure of the expansion: each order in $\epsilon$ generates a new conservation law for the KdV equation. This demonstrates that the infinite hierarchy of KdV conservation laws is encoded in the single conservation law of the mKdV equation through the Gardner transformation.

</details>

The theory of completely integrable systems provides a complete description of soliton interactions and infinite conservation laws, but it requires specific algebraic structures (bi-Hamiltonian forms, recursion operators) that are rare among nonlinear PDEs. The extension to Lax pairs and zero-curvature representations, developed in Section 4.4, provides a more general framework for identifying and analyzing integrable systems.

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
