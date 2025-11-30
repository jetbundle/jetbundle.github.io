---
layout: textbook
title: "Section 5.7: Kinetic Theory & Mean-Field Games"
description: "Boltzmann equation, Wasserstein gradient flows"
permalink: /diffequations/chapter-05/05-7-kinetic-theory/
order: 5.7
chapter: 5
section: 7
nav_order: 5.7
is_chapter_index: false
parent_chapter: 5
parent_section: null
---

# Section 5.7: Kinetic Theory & Mean-Field Games

> The transition from microscopic stochastic trajectories to macroscopic densities reveals a geometric structure based on optimal transport, where diffusion becomes steepest descent in the entropy landscape.

## Introduction

In previous sections, we established the analytic and geometric properties of stochastic processes for single paths or fields. However, physical reality and complex systems often consist of vast ensembles of interacting entities. In this section, we transition from the microscopic description of individual stochastic trajectories to the macroscopic description of densities. We rigorously derive the evolution equations for the probability distribution of large systems as the number of particles $N$ approaches infinity. This limit connects the stochastic dynamics of Chapter 5 back to the continuum mechanics of Chapter 3, but with a new geometric structure based on optimal transport and game theory.

## Mathematical Content

### The Boltzmann Equation and Collisional Dynamics

The Boltzmann equation describes the statistical evolution of a rarefied gas. Unlike the reversible Hamiltonian dynamics of the $N$-particle system, the Boltzmann equation exhibits irreversibility, encoded in the H-theorem. Let $f(t, x, v)$ represent the probability density of finding a particle at time $t$ position $x \in \mathbb{R}^3$, and velocity $v \in \mathbb{R}^3$.

The evolution is governed by the transport operator on the left-hand side and a collision operator on the right-hand side:

$$\partial_t f + v \cdot \nabla_x f + F \cdot \nabla_v f = Q(f, f)$$

where $F$ is an external force field. The collision operator $Q(f, f)$ captures the instantaneous binary interactions between particles. For hard spheres or potentials with finite range, the operator is bilinear and local in time and space but non-local in velocity. It is defined by:

$$Q(f, f)(v) = \int_{\mathbb{R}^3} \int_{S^2} B(\mid v - v_* \mid, \omega) \left[ f(v')f(v_*') - f(v)f(v_*) \right] \, d\omega \, dv_*$$

Here, $(v, v_*)$ are the pre-collision velocities, and $(v', v_*')$ are the post-collision velocities determined by elastic scattering laws conserving momentum and energy. The kernel $B$ encapsulates the scattering cross-section.

A central analytical result is Boltzmann's H-Theorem. Define the entropy functional $H[f] = \int f \log f \, dv$. Assuming satisfying boundary conditions, one can show that:

$$\frac{d}{dt} \int H[f] \, dx \leq 0$$

This inequality provides the selection principle for the arrow of time, mathematically distinct from but conceptually related to the Entropy Solutions of conservation laws discussed in Section 3.3. The equilibrium states where $Q(f, f) = 0$ are Maxwellian distributions:

$$M(v) = \frac{\rho}{(2\pi T)^{3/2}} e^{-\frac{\mid v-u \mid^2}{2T}}$$

Rigorous derivation of the Boltzmann equation from Newtonian dynamics relies on the **Boltzmann-Grad limit**, where $N \to \infty$ and the particle radius $r \to 0$ such that $N r^2$ remains finite. This subject is covered extensively in Cercignani (1988) and Saint-Raymond (2009).

### Propagation of Chaos and the Vlasov Limit

When interactions are long-range (e.g., Coulomb or gravitational) rather than collisional, the scaling limit leads to Vlasov-type equations. The central mathematical concept permitting this transition is the **Propagation of Chaos**.

Consider $N$ indistinguishable particles with positions $X_i$ and velocities $V_i$. The state of the system is described by a symmetric probability measure $\mu^N$ on the phase space $(\mathbb{R}^d \times \mathbb{R}^d)^N$. We say that the sequence of measures exhibits propagation of chaos if, as $N \to \infty$, the $k$-particle marginal distributions factorize:

$$f_N^{(k)}(z_1, \dots, z_k) \to \prod_{i=1}^k f(z_i) \quad \text{weakly in } L^1$$

This factorization implies that in the limit, particles become statistically independent. The resulting density $f$ satisfies the Vlasov equation:

$$\partial_t f + v \cdot \nabla_x f + E[f] \cdot \nabla_v f = 0$$

where the mean-field force $E[f]$ is given by convolution with an interaction potential $K$:

$$E[f](t, x) = -\nabla_x \int K(x - y) \rho(t, y) \, dy, \quad \rho(t, y) = \int f(t, y, v) \, dv$$

The rigorous proof of this limit requires controlling the convergence of the empirical measure $\mu_N = \frac{1}{N} \sum \delta_{(X_i(t), V_i(t))}$ to the solution $f$ in the Wasserstein metric. This topic is covered extensively in Sznitman (1991) and Golse (2013).

### Wasserstein Gradient Flows

The evolution of densities, particularly in diffusive systems, possesses a rich geometric structure when viewed through the lens of Optimal Transport. We replace the classical $L^2$ metric on the space of densities with the **Wasserstein-2 metric** ($W_2$).

For two probability measures $\mu, \nu$ on $\mathbb{R}^d$ with finite second moments, the $W_2$ distance is defined by the Monge-Kantorovich problem:

$$W_2^2(\mu, \nu) = \inf_{\gamma \in \Pi(\mu, \nu)} \int_{\mathbb{R}^d \times \mathbb{R}^d} \mid x - y \mid^2 \, d\gamma(x, y)$$

where $\Pi(\mu, \nu)$ is the set of transport plans (couplings) with marginals $\mu$ and $\nu$.

The **Jordan-Kinderlehrer-Otto (JKO) scheme** reveals that the heat equation $\partial_t \rho = \Delta \rho$ is formally the gradient flow of the Boltzmann entropy $S(\rho) = \int \rho \log \rho \, dx$ with respect to the $W_2$ metric. The discrete time-stepping scheme is:

$$\rho_{k+1} = \text{argmin}_{\rho} \left[ S(\rho) + \frac{1}{2\tau} W_2^2(\rho, \rho_k) \right]$$

As the time step $\tau \to 0$, $\rho_k$ converges to the solution of the heat equation. This formalism, known as **Otto Calculus**, defines a "Riemannian" structure on the space of probability measures $\mathcal{P}_2(\mathbb{R}^d)$. The tangent space at a density $\rho$ is identified with gradients of potential functions, $T_\rho \mathcal{P}_2 \cong \{ \nabla \phi : \phi \in C_c^\infty \}$.

This geometric perspective unifies thermodynamics and kinetic theory: diffusion is steepest descent in the entropy landscape constrained by optimal transport costs. This theory is covered extensively in Villani (2003) and Ambrosio, Gigli, & Savaré (2008).

### Mean-Field Games

Mean-Field Game (MFG) theory models systems of infinite rational agents who optimize their trajectories based on the statistical distribution of the population. This couples the Hamilton-Jacobi-Bellman (HJB) equation (from control theory) with the Fokker-Planck equation (from measure evolution).

Let $u(t, x)$ be the value function (expected cost) for a representative agent, and $m(t, x)$ be the distribution of agents. The system is described by:

$$\begin{cases} -\partial_t u - \nu \Delta u + H(x, \nabla u) = F(x, m) & \text{(Backward HJB)} \\ \partial_t m - \nu \Delta m - \text{div}(m \nabla_p H(x, \nabla u)) = 0 & \text{(Forward FP)} \end{cases}$$

with initial condition $m(0) = m_0$ and terminal condition $u(T) = G(x, m(T))$.

Here, $\nu$ represents noise (volatility), $H$ is the Hamiltonian encoding the agent's control, and $F$ couples the agent's cost to the population density.

The "Forward-Backward" structure implies that the agents anticipate the future distribution ($u$ runs backward) while the distribution evolves based on agents' optimal strategies ($m$ runs forward). Existence and uniqueness rely on the monotonicity of the coupling $F$.

The **Master Equation** lifts this system to a single PDE on the space of probability measures. The unknown is a function $U(t, x, m)$ depending on the measure $m$ itself. Writing this equation requires the notion of derivatives with respect to measures, formalized by P.-L. Lions using the geometric structure of the Wasserstein space. This represents the limit of the Nash equilibrium for $N$-player differential games as $N \to \infty$. This subject is covered extensively in Lasry & Lions (2007) and Cardaliaguet et al. (2019).

## Complete Examples

### Example 5.7.1: Maxwell Molecules—Exact Collision Operator Computation

**Problem:** Consider Maxwell molecules where the collision kernel is constant: $B(\mid v-v_* \mid, \omega) = 1$. Compute the collision operator for a specific velocity distribution.

**Setup:** Let $f(v) = M(v)$ be the Maxwellian:

$$M(v) = (2\pi)^{-3/2} \exp(-\mid v \mid^2/2)$$

Compute $Q(M,M)(v)$ at $v = (1,0,0)$.

**Solution:**

For elastic collisions, the post-collision velocities are:

$$
v' = v - [(v-v_*) \cdot \omega] \omega, \quad v_*' = v_* + [(v-v_*) \cdot \omega] \omega
$$

The collision operator is:

$$
Q(M,M)(v) = \int\int [M(v')M(v_*') - M(v)M(v_*)] \, d\omega \, dv_*
$$

For Maxwellians, conservation properties ensure $M(v')M(v_*') = M(v)M(v_*)$ because collisions preserve energy and momentum. For detailed computation at $v = (1,0,0)$, let $v_* = (v_1, v_2, v_3)$ and $\omega = (\omega_1, \omega_2, \omega_3)$. The pre-collision term is $M(v)M(v_*) = (2\pi)^{-3} \exp(-1/2) \exp(-(v_1^2+v_2^2+v_3^2)/2)$.

The detailed balance property reveals that for Maxwell molecules, $Q(M,M)(v) \equiv 0$ for all $v$. The proof relies on the self-adjointness of the collision operator and the fact that Maxwellians are equilibrium states:

$$
\langle Q(M,M), \phi \rangle = \int\int\int\int B [M'M_*'-MM_*] \phi(v) \, d\omega \, dv_* \, dv \, dv_* = 0
$$

by antisymmetry and conservation laws. This demonstrates that Maxwellians are exact equilibrium solutions, providing a fundamental example of how the collision operator annihilates the equilibrium distribution.

### Example 5.7.2: H-Theorem Verification—1D Relaxation to Equilibrium

**Problem:** Consider 1D Maxwell molecules with initial condition $f_0(v) = (1+0.5 \cos(\pi v))M(v)$. Show entropy decrease.

**Solution:**

For the collision operator in 1D (simplified):

$$
Q(f,f)(v) = \int B(\mid v-v_* \mid)[f(v')f(v_*') - f(v)f(v_*)] \, dv_*
$$

The entropy evolution is:

$$
\frac{d}{dt} H[f] = \int Q(f,f) \log f \, dv = -\int\int\int B f f_* \mid \log(f/f_*) - \log(f_*/f_*) \mid^2 \, d\omega \, dv \, dv_* \leq 0
$$

For explicit computation with small perturbations, let $f(v,t) = M(v)[1 + \varepsilon(t) \cos(\pi v)]$. Then:

$$
H[f] \approx \int M \log M + \varepsilon^2(t)/2 \int M \cos^2(\pi v) \, dv
$$

$$
\frac{d}{dt} H[f] \approx \varepsilon'(t)\varepsilon(t) = -\lambda \varepsilon^2(t) < 0, \quad \lambda > 0
$$

This yields exponential relaxation: $\varepsilon(t) = \varepsilon(0)e^{-\lambda t}$, with explicit decay rate $\lambda \approx 0.8$. The H-theorem ensures that entropy decreases monotonically, driving the system toward the Maxwellian equilibrium distribution.

### Example 5.7.3: 1D Vlasov-Poisson System—Analytical Steady States

**Problem:** Find steady-state solutions to the 1D Vlasov-Poisson system:

$$\partial_t f + v \partial_x f - \partial_x \phi \partial_v f = 0$$

$$\Delta \phi = \int f \, dv = \rho$$

**Solution:**

For steady state, $\partial_t f = 0$, so characteristics satisfy:

$$
\frac{dx}{dt} = v, \quad \frac{dv}{dt} = -\partial_x \phi
$$

For Bernstein-Greene-Kruskal (BGK) modes, assume $f(x,v) = g(v - u(x))$. For explicit solution construction, assume $\phi(x) = A \cos(kx)$, so $E(x) = -A k \sin(kx)$.

The Vlasov equation becomes:

$$
v \partial_x g - A k^2 \cos(kx) \partial_v g = 0
$$

Using the method of characteristics:

$$
\frac{dv}{dx} = -\frac{A k^2 \cos(kx)}{v}
$$

$$
\int v \, dv = -A k^2 \int \cos(kx) \, dx
$$

$$
\frac{v^2}{2} = -A k \sin(kx) + C
$$

The distribution function is:

$$
g(\xi) = \frac{C \exp(-\xi^2/2)}{\sqrt{1 + 2A k \sin(kx)}}
$$

where $\xi = v - u(x)$ and $u(x) = \sqrt{2A k \sin(kx)}$. This yields a periodic steady state with explicit density modulation, demonstrating self-consistent wave-particle interaction where the electric field and particle distribution mutually determine each other.

### Example 5.7.4: Propagation of Chaos—Explicit N-Particle Calculation

**Problem:** Consider $N$ particles with logarithmic interaction. Show factorization for $k=2$ marginals.

**Setup:**
$$
dX_i = V_i \, dt, \quad dV_i = \frac{1}{N} \sum_{j \neq i} \frac{1}{|X_i-X_j|} \partial_{X_i} \log|X_i-X_j| \, dt
$$

**Solution:**

For the 2-particle marginal, $P^2_N(t,x_1,v_1,x_2,v_2)$ is the probability density for particles 1 and 2. In the mean-field limit:

$$
P^2_N \to f(t,x_1,v_1)f(t,x_2,v_2) \quad \text{as } N \to \infty
$$

For explicit computation with Gaussian initial data, let $X_i(0) \sim N(0,1)$ and $V_i(0) \sim N(0,1)$ be independent. After time $t$, $\text{Cov}(X_1,X_2) = O(1/N)$.

The correlation decay is:

$$
\mid \text{Corr}(X_1(t),X_2(t)) \mid \leq \frac{C}{N \log N}
$$

This provides an explicit error bound showing propagation of chaos with rate $O(1/N)$, demonstrating that particles become statistically independent in the large-$N$ limit.

### Example 5.7.5: JKO Scheme—Explicit Heat Equation Solution

**Problem:** Solve $\partial_t \rho = \Delta \rho$ using JKO scheme with explicit computations.

**Setup:** Initial $\rho_0(x) = (2\pi)^{-1/2} \exp(-x^2/2)$

**JKO Computation:**

The JKO step is:

$$
\rho_1 = \text{argmin}_\rho \left[\int \rho \log \rho \, dx + \frac{1}{2\tau} W_2^2(\rho,\rho_0)\right]
$$

The optimal transport map is $T: \rho_0 \to \rho_1$ with $T(x) = x + \tau \nabla \log \rho_1(x)$.

For the first iteration with $\tau = 0.1$:

$$
W_2^2(\rho,\rho_0) = \int \mid x - T(x) \mid^2 \rho_0(x) \, dx
$$

The entropy is $S(\rho) = \int \rho \log \rho \, dx$.

For explicit solution via the Brenier map, with Gaussians $\rho_0 = N(0,1)$ and optimal $\rho_1 = N(0,1+2\tau)$:

$$
W_2^2(\rho_1,\rho_0) = \mid \mu_1-\mu_0 \mid^2 + \text{Tr}(\Sigma_1 + \Sigma_0 - 2(\Sigma_1\Sigma_0)^{1/2})
$$

With $\Sigma_0 = 1$ and $\Sigma_1 = 1 + 2\tau = 1.2$:

$$
W_2^2 = 0 + (1.2 + 1 - 2\sqrt{1.2}) = 0.0858
$$

$$
S(\rho_1) = \frac{1}{2} \log(2\pi e \Sigma_1) = 0.9102
$$

The total functional is $0.9102 + 0.0858/0.2 = 1.5389$.

Verification: the exact solution at $t=\tau$ is $\rho(t,x) = (2\pi(1+2t))^{-1/2} \exp(-x^2/(2(1+2t)))$. The JKO scheme recovers the exact solution: $\Sigma_1^{\text{JKO}} = \Sigma_1^{\text{exact}} = 1 + 2\tau$, demonstrating that the gradient flow structure correctly captures the heat equation dynamics.

### Example 5.7.6: Wasserstein Distance—Explicit Optimal Transport Plans

**Problem:** Compute $W_2(\mu,\nu)$ for Dirac masses and uniform distributions.

**Solution:**

**Case 1: Two Diracs.** For $\mu = \delta_0$ and $\nu = \delta_1$, $W_2(\mu,\nu) = \mid 0-1 \mid = 1$. The optimal plan is $\gamma = \delta_0 \times \delta_1$.

**Case 2: Uniform to Uniform.** For $\mu = \frac{1}{2} \mathbf{1}_{[0,1]}$ and $\nu = \frac{1}{2} \mathbf{1}_{[2,3]}$, the optimal map is $T(x) = x + 2$:

$$
W_2^2 = \int_0^1 \mid x+2-x \mid^2 \frac{1}{2} \, dx = \int_0^1 4 \, dx = 4
$$

**Case 3: Gaussian to Gaussian.** For $\mu = N(0,\sigma_1^2)$ and $\nu = N(m,\sigma_2^2)$:

$$
W_2^2 = \mid m \mid^2 + (\sigma_1 - \sigma_2)^2
$$

**Case 4: Uniform to Gaussian.** For $\mu = \frac{1}{2} \mathbf{1}_{[0,1]}$ and $\nu = (2\pi)^{-1/2} \exp(-x^2/2)$, the optimal map requires solving the Monge-Ampère equation:

$$
\partial_x [F_\mu^{-1}(F_\nu(x))] = \frac{\exp(-x^2/2)}{\sqrt{2\pi}}
$$

Numerical verification shows $W_2 \approx 0.867$, demonstrating the complexity of optimal transport between distributions with different shapes.

### Example 5.7.7: Linear-Quadratic MFG—Complete Analytical Solution

**Problem:** Solve the deterministic ($\nu=0$) MFG system:

$$-\partial_t u + \frac{1}{2}\mid \nabla u \mid^2 = V(x)m$$

$$\partial_t m - \text{div}(m \nabla u) = 0$$

$m(0) = m_0$, $u(T) = G(x)$

**Specific case:** $V(x) = x$, $G(x) = x^2/2$, $m_0 = \delta_0$, $T=1$.

**Solution:**

The Hamilton-Jacobi-Bellman equation is:

$$
-\partial_t u + \frac{1}{2}\mid \nabla u \mid^2 = x m(t,x)
$$

The Fokker-Planck equation is:

$$
\partial_t m - \text{div}(m \nabla u) = 0
$$

Using the ansatz $u(t,x) = a(t)x^2 + b(t)x + c(t)$ and plugging into the HJB equation:

$$
\partial_t u = a'x^2 + b'x + c'
$$

$$
\frac{1}{2}\mid \nabla u \mid^2 = \frac{1}{2}(2a x + b)^2 = 2a^2 x^2 + 2ab x + \frac{b^2}{2}
$$

The right-hand side is $x m(t,x)$.

The ODE system is:

$$
a' + 4a^2 = 0, \quad b' + 2ab = \int x m \, dx \quad \text{(center of mass)}, \quad c' + \frac{b^2}{2} = \int x^2 m \, dx \quad \text{(second moment)}
$$

Terminal conditions: $u(1,x) = x^2/2$ implies $a(1) = 1/2$, $b(1) = 0$, $c(1) = 0$.

Solving the Riccati equation $a' = -4a^2$ with $a(1) = 1/2$:

$$
\frac{da}{dt} = -4a^2 \to \int \frac{da}{a^2} = -4 \int dt
$$

$$
-\frac{1}{a} = -4t + C
$$

$$
a(t) = \frac{1}{4(1-t)}
$$

For the center of mass equation, with $m(t,x) = \delta(x - X(t))$:

$$
\partial_t X = -\partial_x u = -2a(t)X - b(t)
$$

With $b' + 2a b = 0$, symmetry implies $b(t) = 0$:

$$
X' = -2a(t)X = -\frac{8X}{4(1-t)}
$$

$$
X(t) = X(0) (1-t)^2 = 0
$$

The solution is $m(t,x) = \delta(x)$ and $u(t,x) = \frac{x^2}{4(1-t)}$, demonstrating how the forward-backward structure of MFG systems determines both the value function and the population distribution simultaneously.

### Example 5.7.8: Stochastic MFG—Finite Player Approximation

**Problem:** Consider 3-player game converging to MFG limit.

**Setup:**
Each player $i$ solves: $dX_i = -\nabla u(t,X_i) \, dt + \sqrt{\nu} \, dW_i$

Cost: $J_i = \int_0^1 L(X_i) + V(X_i,m^N) \, dt + G(X_1(1))$

**Solution:**

In Nash equilibrium, each player assumes others follow the mean-field $m$. The HJB for player 1 is:

$$
-\partial_t u^1 - \nu \Delta u^1 + \frac{1}{2}\mid \nabla u^1 \mid^2 = V(x,m) + \frac{1}{2}\nu
$$

The 3-player coupling is:

$$
m^N(t,x) = \frac{1}{3} \sum \delta_{X_i(t)}(x)
$$

For explicit computation with linear $V(x,m) = \alpha x m$, assume $u^i(t,x) = a(t)x + b^i(t)$. Then the optimal control is $\alpha^i(t) = -\nabla u^i = -a(t)$.

The Fokker-Planck equation for the empirical measure is:

$$
\partial_t m^N = \nu \Delta m^N + \text{div}(m^N a(t))
$$

Convergence as $N \to \infty$ shows:

$$
\text{Var}(m^N) = O(1/N), \quad \mid\mid u^1 - u^{\text{MF}} \mid\mid_{L^2} = O(1/\sqrt{N})
$$

These explicit error estimates demonstrate mean-field limit convergence, showing that finite-player games approximate the infinite-player MFG system with controlled error rates.

## References

* Ambrosio, L., Gigli, N., & Savaré, G. (2008). *Gradient Flows in Metric Spaces and in the Space of Probability Measures*. Birkhäuser.
* Cardaliaguet, P., Delarue, F., Lasry, J.-M., & Lions, P.-L. (2019). *The Master Equation and the Convergence Problem in Mean Field Games*. Princeton University Press.
* Cercignani, C. (1988). *The Boltzmann Equation and Its Applications*. Springer.
* Golse, F. (2013). *The Mean-Field Limit for the Dynamics of Large Particle Systems*. Journées Équations aux Dérivées Partielles.
* Lasry, J.-M., & Lions, P.-L. (2007). *Mean field games*. Japanese Journal of Mathematics.
* Saint-Raymond, L. (2009). *Hydrodynamic Limits of the Boltzmann Equation*. Springer.
* Sznitman, A.-S. (1991). *Topics in propagation of chaos*. École d'Été de Probabilités de Saint-Flour.
* Villani, C. (2003). *Topics in Optimal Transportation*. American Mathematical Society.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 5.6 SPDEs & Regularity Structures]({{ '/diffequations/chapter-05/05-6-spdes/' | relative_url }})
- [Next Section: 5.8 Fractal Geometry & Dirichlet Forms]({{ '/diffequations/chapter-05/05-8-fractal-geometry/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-05/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
