---
layout: textbook
title: "Section 4.5: Riemann-Hilbert & Inverse Scattering"
description: "Nonlinear Fourier transform, scattering data"
permalink: /diffequations/chapter-04/04-5-riemann-hilbert/
order: 4.5
chapter: 4
section: 5
nav_order: 4.5
is_chapter_index: false
parent_chapter: 4
parent_section: null
---

# Section 4.5: Riemann-Hilbert & Inverse Scattering

## Introduction

The establishment of the Lax pair formalism reveals that nonlinear evolution equations can be viewed as isospectral flows of linear operators. However, the Lax pair alone does not explicitly construct the solution $u(x,t)$. To recover the potential from the spectral data, we require a method analogous to the Fourier transform, one that maps the nonlinear problem into a space where the evolution is linear and trivial, and then provides a rigorous mechanism for inversion. This method is the Inverse Scattering Transform (IST). The inversion process is naturally formulated as a Riemann-Hilbert problem, a boundary value problem in the complex plane that connects the analytic properties of the scattering data to the algebraic structure of the solution space. This framework is covered extensively in Ablowitz and Segur (1981) and Newell (1985).

## Mathematical Content

### Direct Scattering and Analyticity

We begin by considering the spatial component of the Lax pair. For the Korteweg-de Vries (KdV) equation, the associated spectral problem is the time-independent Schrödinger equation with the potential $u(x,t)$ acting as a scattering potential:

$$
- \psi_{xx} + u(x,t)\psi = k^2 \psi
$$

Here, $k$ is the spectral parameter. We assume the potential $u(x,t)$ decays sufficiently rapidly as $|x| \to \infty$, specifically satisfying the Faddeev condition $\int_{-\infty}^{\infty} (1+|x|)|u(x)| dx < \infty$. This allows us to define solutions via their asymptotic behavior. We define the Jost functions, $\phi(x,k)$ and $\psi(x,k)$, as the unique solutions satisfying the boundary conditions:

$$
\phi(x,k) \sim e^{-ikx} \quad \text{as } x \to -\infty, \quad \psi(x,k) \sim e^{ikx} \quad \text{as } x \to +\infty
$$

Since $\phi(x,k)$ and $\phi(x,-k)$ form a fundamental set of solutions, $\psi(x,k)$ can be expressed as a linear combination of them. This linear dependence is encoded in the scattering relation:

$$
\psi(x,k) = a(k)\phi(x,-k) + b(k)\phi(x,k)
$$

where $a(k)$ and $b(k)$ are the scattering coefficients. Specifically, $1/a(k)$ represents the transmission coefficient and $b(k)/a(k)$ the reflection coefficient.

The analytic properties of these coefficients are central to the inversion method. By analyzing the Volterra integral equations governing the Jost functions, one can demonstrate that $a(k)$ admits an analytic extension into the upper half of the complex $k$-plane ($\text{Im } k > 0$), while $b(k)$ is generally defined only on the real axis. The zeros of $a(k)$ in the upper half-plane, denoted by $k_j = i\kappa_j$ with $\kappa_j > 0$, correspond to bound states (square-integrable eigenfunctions) of the Schrödinger operator. These discrete eigenvalues are the spectral manifestation of solitons.

### Linear Evolution of Spectral Data

The power of the IST lies in the time evolution of the scattering data. Since the flow is isospectral (as established in Section 4.4), the discrete eigenvalues $\kappa_j$ remain constant. For the continuous spectrum ($k \in \mathbb{R}$), the evolution of the scattering coefficients is determined by the asymptotic behavior of the temporal operator $M$ in the Lax pair. For the KdV equation, the dispersion relation implies that the scattering data evolves linearly:

$$
a(k,t) = a(k,0), \quad b(k,t) = b(k,0)e^{8ik^3t}
$$

The reflection coefficient $r(k,t) = b(k,t)/a(k,t)$ therefore evolves as $r(k,0)e^{8ik^3t}$. This result confirms that the nonlinear KdV equation in physical space maps to a system of decoupled linear oscillators in scattering space, perfectly analogous to how the Fourier transform diagonalizes linear PDEs.

### The Riemann-Hilbert Problem and Inversion

The reconstruction of the potential $u(x,t)$ from the scattering data constitutes the inverse problem. This is rigorously formulated as a matrix Riemann-Hilbert problem. We seek a matrix-valued function $M(x,k)$ that is analytic in the upper and lower half-planes and satisfies a jump condition across the real axis (the continuous spectrum).

Defining the sectionally meromorphic functions suitably normalized by the Jost solutions, the relationship between the boundary values on the real axis is given by:

$$
M_+(x,k) = M_-(x,k) V(x,k), \quad k \in \mathbb{R}
$$

where $M_\pm$ denotes the limit approaching the real axis from above and below, and $V(x,k)$ is the jump matrix constructed from the reflection coefficient and the exponential factors $e^{\pm 2ikx}$.

This factorization problem reduces to a linear integral equation, known as the Gelfand-Levitan-Marchenko (GLM) equation. Defining the Fourier transform of the reflection coefficient (incorporating the time dependence) as $F(x,t)$, the GLM equation for the transformation kernel $K(x,y;t)$ is:

$$
K(x,y;t) + F(x+y;t) + \int_x^{\infty} K(x,z;t)F(z+y;t) dz = 0 \quad \text{for } y > x
$$

Once the kernel $K(x,y;t)$ is found, the potential is recovered via the relation:

$$
u(x,t) = -2 \frac{d}{dx} K(x,x;t)
$$

### Solitons and Finite-Gap Integration

In the specific case where the reflection coefficient vanishes ($b(k) \equiv 0$), the potential is reflectionless. The integral kernel $F$ becomes a separable sum of exponentials corresponding solely to the discrete eigenvalues (bound states). The GLM equation then reduces to a system of linear algebraic equations. The solution $u(x,t)$ decomposes into a nonlinear superposition of $N \text{sech}^2$ profiles—the $N$-soliton solution. This algebraic reduction explains the "particle-like" elastic scattering of solitons: they are simply the poles of the scattering matrix moving through the complex plane.

While the discussion above assumes localized potentials on the infinite line, the theory extends to periodic boundary conditions, leading to finite-gap integration. In this setting, the continuous spectrum breaks into a finite number of bands (gaps). The Baker-Akhiezer function, an analog of the Jost solution, is defined not on the complex plane but on a hyperelliptic Riemann surface of genus $g$ associated with the spectral curve $y^2 = \prod (E - E_j)$. The solutions $u(x,t)$ are then expressed in terms of Riemann Theta functions, linking integrable systems directly to algebraic geometry (Novikov et al., 1984).

## Complete Examples

### Example 4.5.1: 1-Soliton Solution via Pure Discrete Spectrum

**Problem:** Find the 1-soliton solution to KdV using IST with zero reflection coefficient.

**Scattering Data:**
- Discrete eigenvalue: $k_1 = i\kappa_1$, $\kappa_1 = 1/2$
- Reflection coefficient: $r(k) = 0$

**Step-by-Step Solution:**

1. **Jost Functions for Reflectionless Potential:**
The Jost solutions are:

$$
\phi(x,k_1) = e^{-ik_1 x} \psi_1(x), \quad \psi_1(x) = \text{sech}(x - x_0)
$$

where $\psi_1$ is the bound state eigenfunction.

2. **Scattering Coefficients:**
$$
a(k) = \prod_j \frac{k - k_j}{k + \bar{k}_j} = \frac{k - i\kappa_1}{k + i\kappa_1}, \quad b(k) = 0
$$

3. **GLM Kernel Construction:**
$$
F(x) = \sum_j |\phi(x,k_j)|^2 e^{2i k_j x} = |\psi_1(x)|^2
$$

For single soliton: $F(x) = \text{sech}^2(x)$

4. **Solve GLM Equation:**
$$
K(x,y) + \text{sech}^2(x+y) + \int_x^{\infty} K(x,z) \text{sech}^2(z+y) dz = 0
$$

**Ansatz:** $K(x,y) = A(x) \text{sech}(x+y)$

Substitute $\to$ $A(x) + 1 + \int_x^{\infty} A(x) \text{sech}^2(z+y) \text{sech}(x+y) dz = 0$

The integral evaluates to: $\tanh(x+y) - \tanh(x)$

Thus: $A(x) [1 + \tanh(x+y) - \tanh(x)] + 1 = 0$

At $y = x$: $A(x) [1 + 0] + 1 = 0 \to A(x) = -1$

5. **Recover Potential:**
$$
u(x) = -2 \frac{\partial}{\partial x} K(x,x) = -2 \frac{\partial}{\partial x} [-\text{sech}(x)] = 2 \text{sech}^2(x)
$$

**Complete Solution:**
$$
u(x,t) = 2 \text{sech}^2(x - 4\kappa_1^2 t) = 2 \text{sech}^2(x - t)
$$

### Example 4.5.2: 2-Soliton Scattering Data

**Problem:** Construct 2-soliton solution from scattering data.

**Scattering Data:**
- $k_1 = i/2$, $k_2 = i$
- $r(k) = 0$

**GLM Kernel:**
$$
F(x) = |\psi_1(x)|^2 + |\psi_2(x)|^2
$$

where $\psi_j(x) \propto \text{sech}(\kappa_j x)$

**Algebraic Solution:**
The $2 \times 2$ system for $K(x,x_1)$, $K(x,x_2)$ yields:

$$
u(x,t) = 2 \frac{\partial^2}{\partial x^2} \log|\tau(x,t)|^2
$$

where:
$$
\tau(x,t) = 1 + e^{\eta_1} + e^{\eta_2} + A_{12} e^{\eta_1+\eta_2}
$$

$$
\eta_j = 2i k_j x + 8 k_j^3 t + \eta_j^0, \quad A_{12} = \left(\frac{k_1 - k_2}{k_1 + k_2}\right)^2
$$

### Example 4.5.3: Physical Application—Water Wave Solitons

**Problem:** Shallow water waves with surface elevation $\eta(x,t)$.

**Physical Context:**
$$
\eta_t + c \eta_x + \frac{3c}{2h}(\eta^2)_x + \frac{c h^2}{6} \eta_{xxx} = 0
$$

**Connection to KdV:**
Let $u = -3\eta/c$, then $u$ satisfies standard KdV.

**Scattering Analysis:**
1. Measure initial wave profile: $\eta(x,0)$
2. Compute scattering data:
   Solve: $-\psi'' + [-6\eta(x,0)/h] \psi = k^2 \psi$
   Extract: $a(k,0)$, $b(k,0)$, $\{k_j\}$

3. **Time evolution:**
Each soliton $j$: $\eta_j(x,t) = A_j \text{sech}^2\left[\sqrt{A_j/3}(x - x_j - 4A_j t)\right]$

4. **Superposition via $\tau$-function**

**Quantitative Example:**
Initial condition: $\eta(x,0) = \text{sech}^2(x/2)$

- Single soliton with amplitude $A_1 = 1$, speed $4A_1 = 4$
- Scattering data: $k_1 = i/2$, $r(k) = 0$
- Exact solution preserved for all $t$

### Example 4.5.4: Nonlinear Optics (NLS Equation)

**Problem:** Nonlinear Schrödinger equation for optical pulse propagation.

**Physical Context:**
$$
i q_t + q_{xx} + 2 |q|^2 q = 0
$$

**AKNS Scattering Problem:**
$$
v_1' = -i k v_1 + q v_2, \quad v_2' = -\bar{q} v_1 + i k v_2
$$

**Scattering Data Evolution:**
$$
a(k,t) = a(k,0), \quad b(k,t) = b(k,0) e^{-4i k^3 t}
$$

**Soliton Solution:**
$$
q(x,t) = 2\kappa e^{i(\theta + 2\kappa^2 t)} \text{sech}[\kappa(x - x_0 - 4\kappa^2 t)]
$$

### Example 4.5.5: Reflectionless vs Non-Reflectionless

**Problem:** Compare two initial conditions.

**Comparison Table:**

| Case | Initial $u(x,0)$ | Scattering Data | Long-time Behavior |
|------|------------------|----------------|-------------------|
| Pure Soliton | $2 \text{sech}^2(x)$ | $k_1 = i/2$, $r(k)=0$ | Stable soliton |
| Perturbed | $2 \text{sech}^2(x) + 0.1 \text{sech}^4(x)$ | $k_1 \approx i/2$, $r(k) \neq 0$ | Dispersive radiation |

**Detailed Calculation for Perturbed Case:**

1. **Compute Scattering Coefficients:**
Solve Volterra equations numerically:

$$
\phi(x,k) = e^{-ikx} + \int_{-\infty}^x G(x,y;k) u(y) \phi(y,k) dy
$$

where $G(x,y;k) = \frac{i}{2k} [e^{-ik(x-y)} - e^{ik(x+y)}]$

2. **Reflection Coefficient:**
$$
r(k) = \frac{b(k)}{a(k)} \approx 0.05 e^{-k^2/4} \quad \text{(small but nonzero)}
$$

3. **Time Evolution:**
$$
r(k,t) = r(k,0) e^{8i k^3 t}
$$

The oscillatory phase causes dispersive waves.

4. **GLM Solution:**
$$
F(x,t) = \frac{1}{2\pi} \int r(k,0) e^{8i k^3 t + 2i k x} dk + \sum e^{2i k_j x - 8 \kappa_j^3 t}
$$

The integral term $\to$ radiation that disperses.

**Key Insight:** Even small radiation destroys perfect soliton stability.

### Example 4.5.6: N-Soliton Phase Shifts

**Problem:** Complete 2-soliton calculation.

**Scattering Data:**
$$
k_1 = i\kappa_1 = i/2, \quad k_2 = i\kappa_2 = i
$$

**$\tau$-Function:**
$$
\tau(x,t) = 1 + e^{\eta_1} + e^{\eta_2} + \Gamma_{12} e^{\eta_1+\eta_2}
$$

$$
\eta_1 = i x - 4 t + \eta_1^0, \quad \eta_2 = 2i x - 32 t + \eta_2^0
$$

$$
\Gamma_{12} = \left|\frac{k_1 - k_2}{k_1 + k_2}\right|^2 = \left|\frac{i/2 - i}{i/2 + i}\right|^2 = (1/3)^2 = 1/9
$$

**Potential:**
$$
u(x,t) = 2 \frac{\partial^2}{\partial x^2} \log \tau = 2 \frac{\tau_{xx} \tau - \tau_x^2}{\tau^2}
$$

**Phase Shift Calculation:**
- Soliton 1 alone: $\eta_1 = i(x - 4t)$
- Soliton 2 alone: $\eta_2 = 2i(x - 32t)$
- During collision: effective positions shifted

$$
\Delta x_1 = \frac{1}{2i} \log(1 + \Gamma_{12} e^{\eta_2}) \approx \frac{1}{2i} \log(1 + 1/9) = 0.105
$$

$$
\Delta x_2 = \frac{1}{2i} \log(1 + e^{\eta_1}/\Gamma_{12}) \approx 0.525
$$

**Verification:**
Exact phase shifts match interaction coefficient:

$$
\Delta x_1^2 = \log\left|\frac{k_1 + k_2}{k_1 - k_2}\right|^2 = \log 9 = 2.197
$$

$$
\Delta x_2^1 = \log\left|\frac{k_2 + k_1}{k_2 - k_1}\right|^2 = \text{same}
$$

### Example 4.5.7: Finite-Gap Integration (1-Gap)

**Problem:** Periodic potential analysis.

**Periodic Potential:** $u(x) = 2 \omega^2 \text{sn}^2(\omega x, k)$ (Jacobi elliptic)

**Spectral Curve:**
$$
y^2 = (E - E_1)(E - E_2)(E - E_3)(E - E_4)
$$

Genus $g = 1$ (hyperelliptic torus)

**Baker-Akhiezer Function:**
$$
\psi(x,P) = e^{i k x} [1 + O(e^{-|\text{Im } z|})]
$$

$P = (E(k), y(k)) \in$ Riemann surface

**Theta Function Representation:**
$$
u(x,t) = 2 \frac{\partial^2}{\partial x^2} \log \theta[U(x,t) | \Omega]
$$

$$
U(x,t) = x \Omega_1 + t \Omega_2 + U_0
$$

$\theta =$ Jacobi theta function on Jacobian

**Verification for Lamé Potential:**
- When $k \to 1$: elliptic $\to$ $\text{sech}^2$ (soliton limit)
- When $k \to 0$: constant potential

### Example 4.5.8: Riemann-Hilbert Formulation (Explicit)

**Problem:** Matrix RH problem for 1-soliton.

**Jump Matrix:**
$$
V(k) = \begin{pmatrix}
1 - |r(k)|^2 & -\bar{r}(k) e^{-2ikx} \\
r(k) e^{2ikx} & 1
\end{pmatrix}
$$

For pure soliton: $r(k) = 0$ except poles

**Sectionally Analytic Functions:**
$$
M^+(x,k) = \begin{pmatrix} 1 & 0 \\ 0 & 1/a(k) \end{pmatrix}, \quad M^-(x,k) = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}
$$

**Potential Recovery:**
$$
q(x) = 2i \lim_{k \to 0} \frac{\partial}{\partial k} \log m_{12}(x,k)
$$

For KdV: $u(x) = -2 \frac{\partial}{\partial x} K(x,x)$

## References

* Ablowitz, M. J., & Segur, H. (1981). *Solitons and the Inverse Scattering Transform*. SIAM.
* Newell, A. C. (1985). *Solitons in Mathematics and Physics*. SIAM.
* Novikov, S. P., Manakov, S. V., Pitaevskii, L. P., & Zakharov, V. E. (1984). *Theory of Solitons: The Inverse Scattering Method*. Consultants Bureau.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 4.4 Lax Pairs & Zero-Curvature Representations]({{ '/diffequations/chapter-04/04-4-lax-pairs/' | relative_url }})
- [Next Section: 4.6 Recursion Operators & Hirota Bilinearization]({{ '/diffequations/chapter-04/04-6-recursion-operators/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-04/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
