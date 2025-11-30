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


The nonlinear evolution equation in physical space maps to a system of decoupled linear oscillators in scattering space, transforming the solution problem into a linear spectral analysis.

## Introduction

The establishment of the Lax pair formalism reveals that nonlinear evolution equations can be viewed as isospectral flows of linear operators. However, the Lax pair alone does not explicitly construct the solution $u(x,t)$. To recover the potential from the spectral data, we require a method analogous to the Fourier transform, one that maps the nonlinear problem into a space where the evolution is linear and trivial, and then provides a rigorous mechanism for inversion. This method is the Inverse Scattering Transform (IST). The inversion process is naturally formulated as a Riemann-Hilbert problem, a boundary value problem in the complex plane that connects the analytic properties of the scattering data to the algebraic structure of the solution space.

## Direct Scattering and Analyticity

We begin by considering the spatial component of the Lax pair. For the Korteweg-de Vries (KdV) equation, the associated spectral problem is the time-independent Schrödinger equation with the potential $u(x,t)$ acting as a scattering potential:

$$
- \psi_{xx} + u(x,t)\psi = k^2 \psi
$$

Here, $k$ is the spectral parameter. We assume the potential $u(x,t)$ decays sufficiently rapidly as $\vert x \vert \to \infty$, specifically satisfying the Faddeev condition $\int_{-\infty}^{\infty} (1+\vert x \vert)\vert u(x) \vert dx < \infty$. This allows us to define solutions via their asymptotic behavior. We define the Jost functions, $\phi(x,k)$ and $\psi(x,k)$, as the unique solutions satisfying the boundary conditions:

$$
\phi(x,k) \sim e^{-ikx} \quad \text{as } x \to -\infty, \quad \psi(x,k) \sim e^{ikx} \quad \text{as } x \to +\infty
$$

Since $\phi(x,k)$ and $\phi(x,-k)$ form a fundamental set of solutions, $\psi(x,k)$ can be expressed as a linear combination of them. This linear dependence is encoded in the scattering relation:

$$
\psi(x,k) = a(k)\phi(x,-k) + b(k)\phi(x,k)
$$

where $a(k)$ and $b(k)$ are the scattering coefficients. Specifically, $1/a(k)$ represents the transmission coefficient and $b(k)/a(k)$ the reflection coefficient.

The analytic properties of these coefficients are central to the inversion method. By analyzing the Volterra integral equations governing the Jost functions, one can demonstrate that $a(k)$ admits an analytic extension into the upper half of the complex $k$-plane ($\text{Im } k > 0$), while $b(k)$ is generally defined only on the real axis. The zeros of $a(k)$ in the upper half-plane, denoted by $k_j = i\kappa_j$ with $\kappa_j > 0$, correspond to bound states (square-integrable eigenfunctions) of the Schrödinger operator. These discrete eigenvalues are the spectral manifestation of solitons.

**1-Soliton Solution via Pure Discrete Spectrum**

Find the 1-soliton solution to KdV using IST with zero reflection coefficient.

For scattering data with discrete eigenvalue $k_1 = i\kappa_1$ where $\kappa_1 = 1/2$ and reflection coefficient $r(k) = 0$, the Jost solutions are $\phi(x,k_1) = e^{-ik_1 x} \psi_1(x)$ where $\psi_1(x) = \text{sech}(x - x_0)$ is the bound state eigenfunction.

The scattering coefficients are $a(k) = \prod_j \frac{k - k_j}{k + \bar{k}_j} = \frac{k - i\kappa_1}{k + i\kappa_1}$ and $b(k) = 0$.

The GLM kernel is constructed as $F(x) = \sum_j \vert \phi(x,k_j) \vert^2 e^{2i k_j x} = \vert \psi_1(x) \vert^2$. For a single soliton, $F(x) = \text{sech}^2(x)$.

Solving the GLM equation $K(x,y) + \text{sech}^2(x+y) + \int_x^{\infty} K(x,z) \text{sech}^2(z+y) dz = 0$ with ansatz $K(x,y) = A(x) \text{sech}(x+y)$: substituting gives $A(x) + 1 + \int_x^{\infty} A(x) \text{sech}^2(z+y) \text{sech}(x+y) dz = 0$. The integral evaluates to $\tanh(x+y) - \tanh(x)$, so $A(x) [1 + \tanh(x+y) - \tanh(x)] + 1 = 0$. At $y = x$: $A(x) [1 + 0] + 1 = 0$, so $A(x) = -1$.

Recovering the potential: $u(x) = -2 \frac{\partial}{\partial x} K(x,x) = -2 \frac{\partial}{\partial x} [-\text{sech}(x)] = 2 \text{sech}^2(x)$. The complete solution is $u(x,t) = 2 \text{sech}^2(x - 4\kappa_1^2 t) = 2 \text{sech}^2(x - t)$.

The GLM equation provides a direct method for reconstructing the potential from scattering data. For reflectionless potentials, the integral equation reduces to an algebraic system, making the solution construction explicit.

## Linear Evolution of Spectral Data

The power of the IST lies in the time evolution of the scattering data. Since the flow is isospectral (as established in Section 4.4), the discrete eigenvalues $\kappa_j$ remain constant. For the continuous spectrum ($k \in \mathbb{R}$), the evolution of the scattering coefficients is determined by the asymptotic behavior of the temporal operator $M$ in the Lax pair. For the KdV equation, the dispersion relation implies that the scattering data evolves linearly:

$$
a(k,t) = a(k,0), \quad b(k,t) = b(k,0)e^{8ik^3t}
$$

The reflection coefficient $r(k,t) = b(k,t)/a(k,t)$ therefore evolves as $r(k,0)e^{8ik^3t}$. This result confirms that the nonlinear KdV equation in physical space maps to a system of decoupled linear oscillators in scattering space, perfectly analogous to how the Fourier transform diagonalizes linear PDEs.

**2-Soliton Scattering Data**

Construct 2-soliton solution from scattering data with $k_1 = i/2$, $k_2 = i$, and $r(k) = 0$.

The GLM kernel is $F(x) = \vert \psi_1(x) \vert^2 + \vert \psi_2(x) \vert^2$ where $\psi_j(x) \propto \text{sech}(\kappa_j x)$.

The $2 \times 2$ system for $K(x,x_1)$, $K(x,x_2)$ yields $u(x,t) = 2 \frac{\partial^2}{\partial x^2} \log\vert \tau(x,t) \vert^2$ where:

$$
\tau(x,t) = 1 + e^{\eta_1} + e^{\eta_2} + A_{12} e^{\eta_1+\eta_2}
$$

with $\eta_j = 2i k_j x + 8 k_j^3 t + \eta_j^0$ and $A_{12} = \left(\frac{k_1 - k_2}{k_1 + k_2}\right)^2$.

The $\tau$-function formulation provides an elegant algebraic description of multi-soliton solutions. The interaction coefficients $A_{ij}$ encode the phase shifts that occur during soliton collisions.

## The Riemann-Hilbert Problem and Inversion

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

**Riemann-Hilbert Formulation**

Matrix RH problem for 1-soliton.

The jump matrix is $V(k) = \begin{pmatrix} 1 - \vert r(k) \vert^2 & -\bar{r}(k) e^{-2ikx} \\ r(k) e^{2ikx} & 1 \end{pmatrix}$. For pure soliton, $r(k) = 0$ except at poles.

The sectionally analytic functions are $M^+(x,k) = \begin{pmatrix} 1 & 0 \\ 0 & 1/a(k) \end{pmatrix}$ and $M^-(x,k) = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$.

The potential recovery formula is $q(x) = 2i \lim_{k \to 0} \frac{\partial}{\partial k} \log m_{12}(x,k)$. For KdV: $u(x) = -2 \frac{\partial}{\partial x} K(x,x)$.

The Riemann-Hilbert formulation provides a rigorous framework for the inverse problem. The jump condition across the real axis encodes all the scattering data, and solving the factorization problem reconstructs the potential.

## Solitons and Finite-Gap Integration

In the specific case where the reflection coefficient vanishes ($b(k) \equiv 0$), the potential is reflectionless. The integral kernel $F$ becomes a separable sum of exponentials corresponding solely to the discrete eigenvalues (bound states). The GLM equation then reduces to a system of linear algebraic equations. The solution $u(x,t)$ decomposes into a nonlinear superposition of $N \text{sech}^2$ profiles—the $N$-soliton solution. This algebraic reduction explains the "particle-like" elastic scattering of solitons: they are simply the poles of the scattering matrix moving through the complex plane.

While the discussion above assumes localized potentials on the infinite line, the theory extends to periodic boundary conditions, leading to finite-gap integration. In this setting, the continuous spectrum breaks into a finite number of bands (gaps). The Baker-Akhiezer function, an analog of the Jost solution, is defined not on the complex plane but on a hyperelliptic Riemann surface of genus $g$ associated with the spectral curve $y^2 = \prod (E - E_j)$. The solutions $u(x,t)$ are then expressed in terms of Riemann Theta functions, linking integrable systems directly to algebraic geometry (Novikov et al., 1984).

**Water Wave Solitons**

Shallow water waves with surface elevation $\eta(x,t)$ satisfy $\eta_t + c \eta_x + \frac{3c}{2h}(\eta^2)_x + \frac{c h^2}{6} \eta_{xxx} = 0$.

With connection to KdV: let $u = -3\eta/c$, then $u$ satisfies standard KdV.

For scattering analysis: measure initial wave profile $\eta(x,0)$, then compute scattering data by solving $-\psi'' + [-6\eta(x,0)/h] \psi = k^2 \psi$ to extract $a(k,0)$, $b(k,0)$, and $\{k_j\}$.

Time evolution gives each soliton $j$: $\eta_j(x,t) = A_j \text{sech}^2\left[\sqrt{A_j/3}(x - x_j - 4A_j t)\right]$. Superposition is achieved via the $\tau$-function.

Quantitative example: initial condition $\eta(x,0) = \text{sech}^2(x/2)$ gives a single soliton with amplitude $A_1 = 1$, speed $4A_1 = 4$, scattering data $k_1 = i/2$, $r(k) = 0$, with exact solution preserved for all $t$.

Physical applications demonstrate that the IST is not merely a mathematical technique but provides quantitative predictions that match experimental observations. The soliton solutions describe actual water wave behavior with remarkable accuracy.

**Nonlinear Optics (NLS Equation)**

The Nonlinear Schrödinger equation $i q_t + q_{xx} + 2 \vert q \vert^2 q = 0$ governs optical pulse propagation.

The AKNS scattering problem is $v_1' = -i k v_1 + q v_2$, $v_2' = -\bar{q} v_1 + i k v_2$.

Scattering data evolution: $a(k,t) = a(k,0)$, $b(k,t) = b(k,0) e^{-4i k^3 t}$.

The soliton solution is $q(x,t) = 2\kappa e^{i(\theta + 2\kappa^2 t)} \text{sech}[\kappa(x - x_0 - 4\kappa^2 t)]$.

The NLS equation demonstrates that the IST framework extends beyond the KdV equation to a wide class of integrable systems. The same spectral methods apply, with appropriate modifications for the different scattering problem.

**Reflectionless vs Non-Reflectionless**

Compare two initial conditions: pure soliton $u(x,0) = 2 \text{sech}^2(x)$ with scattering data $k_1 = i/2$, $r(k)=0$ gives stable soliton behavior. Perturbed case $u(x,0) = 2 \text{sech}^2(x) + 0.1 \text{sech}^4(x)$ with $k_1 \approx i/2$, $r(k) \neq 0$ gives dispersive radiation.

For the perturbed case, compute scattering coefficients by solving Volterra equations numerically: $\phi(x,k) = e^{-ikx} + \int_{-\infty}^x G(x,y;k) u(y) \phi(y,k) dy$ where $G(x,y;k) = \frac{i}{2k} [e^{-ik(x-y)} - e^{ik(x+y)}]$.

The reflection coefficient is $r(k) = \frac{b(k)}{a(k)} \approx 0.05 e^{-k^2/4}$ (small but nonzero). Time evolution gives $r(k,t) = r(k,0) e^{8i k^3 t}$. The oscillatory phase causes dispersive waves.

The GLM solution is $F(x,t) = \frac{1}{2\pi} \int r(k,0) e^{8i k^3 t + 2i k x} dk + \sum e^{2i k_j x - 8 \kappa_j^3 t}$. The integral term produces radiation that disperses. Even small radiation destroys perfect soliton stability.

The presence of a nonzero reflection coefficient introduces dispersive radiation that destroys the perfect soliton structure. This demonstrates the fragility of integrable systems: small perturbations can break the reflectionless property, leading to energy loss through radiation.

**N-Soliton Phase Shifts**

Complete 2-soliton calculation with $k_1 = i\kappa_1 = i/2$ and $k_2 = i\kappa_2 = i$.

The $\tau$-function is $\tau(x,t) = 1 + e^{\eta_1} + e^{\eta_2} + \Gamma_{12} e^{\eta_1+\eta_2}$ where $\eta_1 = i x - 4 t + \eta_1^0$, $\eta_2 = 2i x - 32 t + \eta_2^0$, and $\Gamma_{12} = \left\vert \frac{k_1 - k_2}{k_1 + k_2} \right\vert^2 = \left\vert \frac{i/2 - i}{i/2 + i} \right\vert^2 = (1/3)^2 = 1/9$.

The potential is $u(x,t) = 2 \frac{\partial^2}{\partial x^2} \log \tau = 2 \frac{\tau_{xx} \tau - \tau_x^2}{\tau^2}$.

Phase shift calculation: soliton 1 alone has $\eta_1 = i(x - 4t)$, soliton 2 alone has $\eta_2 = 2i(x - 32t)$. During collision, effective positions are shifted: $\Delta x_1 = \frac{1}{2i} \log(1 + \Gamma_{12} e^{\eta_2}) \approx \frac{1}{2i} \log(1 + 1/9) = 0.105$ and $\Delta x_2 = \frac{1}{2i} \log(1 + e^{\eta_1}/\Gamma_{12}) \approx 0.525$.

Verification: exact phase shifts match interaction coefficient: $\Delta x_1^2 = \log\left\vert \frac{k_1 + k_2}{k_1 - k_2} \right\vert^2 = \log 9 = 2.197$.

The phase shift calculations demonstrate that soliton interactions are completely determined by the spectral data. The interaction coefficients $\Gamma_{ij}$ encode all the information about how solitons affect each other's trajectories.

**Finite-Gap Integration**

For periodic potential $u(x) = 2 \omega^2 \text{sn}^2(\omega x, k)$ (Jacobi elliptic), the spectral curve is $y^2 = (E - E_1)(E - E_2)(E - E_3)(E - E_4)$ with genus $g = 1$ (hyperelliptic torus).

The Baker-Akhiezer function is $\psi(x,P) = e^{i k x} [1 + O(e^{-\vert \text{Im } z \vert})]$ where $P = (E(k), y(k)) \in$ Riemann surface.

The theta function representation is $u(x,t) = 2 \frac{\partial^2}{\partial x^2} \log \theta[U(x,t) \vert \Omega]$ where $U(x,t) = x \Omega_1 + t \Omega_2 + U_0$ and $\theta$ is the Jacobi theta function on the Jacobian.

Verification for Lamé potential: when $k \to 1$, elliptic $\to$ $\text{sech}^2$ (soliton limit); when $k \to 0$, constant potential.

Finite-gap integration extends the IST to periodic boundary conditions, revealing deep connections between integrable systems and algebraic geometry. The solutions are expressed in terms of theta functions on Riemann surfaces, providing a complete description of quasi-periodic solutions.

## Challenge Problems

The following problems synthesize the concepts of direct scattering, inverse scattering, and the Riemann-Hilbert formulation.

### Challenge 1: Analyticity of Scattering Coefficients

Prove that the scattering coefficient $a(k)$ admits an analytic extension into the upper half-plane $\text{Im } k > 0$ by analyzing the Volterra integral equation for the Jost function $\phi(x,k)$.

Show that the zeros of $a(k)$ in the upper half-plane correspond to bound states, and derive the relationship between the number of zeros and the number of solitons.

*(Hint: Use the Volterra integral equation $\phi(x,k) = e^{-ikx} + \int_{-\infty}^x G(x,y;k) u(y) \phi(y,k) dy$ and show that the kernel $G$ is analytic in $k$ for $\text{Im } k > 0$.)*

<details>
<summary><strong>Expand Solution</strong></summary>

The Volterra integral equation for the Jost function is:

$$
\phi(x,k) = e^{-ikx} + \int_{-\infty}^x G(x,y;k) u(y) \phi(y,k) dy
$$

where $G(x,y;k) = \frac{i}{2k} [e^{-ik(x-y)} - e^{ik(x+y)}]$ is the Green's function. For $\text{Im } k > 0$, the exponential $e^{-ikx}$ decays as $x \to -\infty$, ensuring the integral converges.

The kernel $G(x,y;k)$ is analytic in $k$ for $\text{Im } k > 0$ (away from $k=0$). By the theory of Volterra integral equations, the solution $\phi(x,k)$ inherits this analyticity. The scattering coefficient $a(k)$ is constructed from $\phi(x,k)$ and its Wronskian with $\phi(x,-k)$, so $a(k)$ is also analytic in the upper half-plane.

The zeros of $a(k)$ occur when $\phi(x,k)$ and $\phi(x,-k)$ are linearly dependent, which happens precisely when $k = i\kappa$ with $\kappa > 0$ corresponds to a bound state. The number of zeros equals the number of discrete eigenvalues, which equals the number of solitons in the reflectionless case.

This analyticity is crucial for the inverse problem: it allows us to use Cauchy's theorem and the theory of Riemann-Hilbert problems to reconstruct the potential from the scattering data.

</details>

### Challenge 2: GLM Equation Derivation

Derive the Gelfand-Levitan-Marchenko (GLM) equation from the Riemann-Hilbert formulation. Show that the jump condition $M_+(x,k) = M_-(x,k) V(x,k)$ on the real axis leads to the integral equation:

$$
K(x,y;t) + F(x+y;t) + \int_x^{\infty} K(x,z;t)F(z+y;t) dz = 0 \quad \text{for } y > x
$$

where $F(x,t)$ is the Fourier transform of the reflection coefficient.

*(Hint: Use the Plemelj formula to convert the jump condition into an integral equation, and show how the transformation kernel $K(x,y;t)$ relates to the matrix $M(x,k)$.)*

<details>
<summary><strong>Expand Solution</strong></summary>

The Riemann-Hilbert problem seeks a matrix $M(x,k)$ analytic in the upper and lower half-planes with jump condition $M_+(x,k) = M_-(x,k) V(x,k)$ on the real axis.

Using the Plemelj formula, we can represent $M(x,k)$ as a Cauchy integral:

$$
M(x,k) = I + \frac{1}{2\pi i} \int_{-\infty}^{\infty} \frac{M_-(x,\zeta)[V(x,\zeta) - I]}{\zeta - k} d\zeta
$$

where $I$ is the identity matrix. The jump matrix $V(x,k)$ is constructed from the reflection coefficient $r(k,t)$ and exponential factors $e^{\pm 2ikx}$.

The transformation kernel $K(x,y;t)$ is related to $M(x,k)$ through an integral transform. Specifically, if we write $M(x,k) = I + \int_x^{\infty} K(x,y;t) e^{ik(y-x)} dy$, then the jump condition leads to:

$$
K(x,y;t) + F(x+y;t) + \int_x^{\infty} K(x,z;t)F(z+y;t) dz = 0
$$

where $F(x,t) = \frac{1}{2\pi} \int_{-\infty}^{\infty} r(k,t) e^{ikx} dk$ is the Fourier transform of the reflection coefficient.

This derivation shows that the GLM equation is the concrete realization of the abstract Riemann-Hilbert problem. Solving the GLM equation (a linear integral equation) is equivalent to solving the Riemann-Hilbert factorization problem.

</details>

### Challenge 3: Finite-Gap Integration and Theta Functions

For a periodic potential with spectral curve $y^2 = \prod_{j=1}^{2g+1} (E - E_j)$ of genus $g$, show that the solution can be expressed as:

$$
u(x,t) = 2 \frac{\partial^2}{\partial x^2} \log \theta[U(x,t) \vert \Omega]
$$

where $\theta$ is the Riemann theta function, $U(x,t) = x \Omega_1 + t \Omega_2 + U_0$ is a linear flow on the Jacobian, and $\Omega$ is the period matrix.

Explain how this connects integrable systems to algebraic geometry, and show that in the limit $g \to \infty$, this reduces to the soliton solutions on the infinite line.

*(Hint: Use the Baker-Akhiezer function defined on the Riemann surface, and show that its logarithmic derivative gives the potential. The theta function representation follows from the periodicity conditions.)*

<details>
<summary><strong>Expand Solution</strong></summary>

The Baker-Akhiezer function $\psi(x,t,P)$ is defined on the Riemann surface associated with the spectral curve. It satisfies the Schrödinger equation $(-\partial_x^2 + u)\psi = E \psi$ where $E$ is the coordinate on the spectral curve, and has specified asymptotic behavior near the points at infinity.

The key property is that $\psi$ has essential singularities at the points at infinity, with behavior $\psi \sim e^{ikx}$ where $k$ is a local coordinate. The potential is recovered from the logarithmic derivative:

$$
u(x,t) = -2 \frac{\partial^2}{\partial x^2} \log \psi(x,t,P_0)
$$

where $P_0$ is a base point on the Riemann surface.

The periodicity conditions on the Riemann surface require that $\psi$ be quasi-periodic, leading to the theta function representation. The linear flow $U(x,t) = x \Omega_1 + t \Omega_2 + U_0$ on the Jacobian (the $g$-dimensional complex torus) encodes the quasi-periodicity.

In the limit $g \to \infty$, the continuous spectrum on the infinite line is recovered, and the theta function representation reduces to the $\tau$-function for soliton solutions. This demonstrates that solitons and finite-gap solutions are different limits of the same algebraic-geometric structure.

</details>

The Inverse Scattering Transform provides a complete solution method for integrable systems, but it requires the system to possess a Lax pair and suitable decay conditions on the potential. The extension to recursion operators and Hirota bilinearization, developed in Section 4.6, provides alternative algebraic methods for constructing solutions that do not rely on spectral analysis.

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
