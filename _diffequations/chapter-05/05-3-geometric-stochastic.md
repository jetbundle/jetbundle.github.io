---
layout: textbook
title: "Section 5.3: Geometric Stochastic Analysis"
description: "Stochastic parallel transport, Malliavin calculus"
permalink: /diffequations/chapter-05/05-3-geometric-stochastic/
order: 5.3
chapter: 5
section: 3
nav_order: 5.3
is_chapter_index: false
parent_chapter: 5
parent_section: null
---

# Section 5.3: Geometric Stochastic Analysis

> The Stratonovich integral's coordinate invariance makes it the natural language for stochastic processes on manifolds, while Malliavin calculus reveals that the geometry of probability space itself determines the regularity of solutions.

## Introduction

Standard stochastic calculus, as developed in the previous modules, relies heavily on the linear vector space structure of $\mathbb{R}^n$. The ability to define increments $\Delta B_t = B_{t+\Delta t} - B_t$ implies the existence of a global coordinate system where vector addition is meaningful. However, physical configuration spaces—such as the configuration space of a rigid body or the phase space of a Hamiltonian system—are often curved manifolds where no such global linearity exists.

This module lifts the theory of stochastic differential equations from flat space to differentiable manifolds. We discover that the geometric nature of the Stratonovich integral makes it the natural choice for coordinate invariance. Furthermore, we introduce the Malliavin calculus, an infinite-dimensional differential calculus on the Wiener space itself, which provides the rigorous link between the algebraic structure of vector fields (Lie brackets) and the analytic regularity of solution densities (Hörmander's theorem).

## Mathematical Content

### Stochastic Differential Geometry

To formulate a stochastic differential equation on a smooth manifold $M$ of dimension $d$, we must address the transformation properties of stochastic integrals. Recall from Section 5.1 that the Itô chain rule involves a second-order term involving the Hessian. On a manifold, the Hessian is not a tensorial object unless one specifies a connection (e.g., the Levi-Civita connection). Consequently, Itô equations are not invariant under coordinate transformations unless the stochastic term is coupled intrinsically to the geometry.

Conversely, the Stratonovich chain rule satisfies the classical Leibniz rule of ordinary calculus:

$$
d(f(X_t)) = f'(X_t) \circ dX_t
$$

This invariance suggests that stochastic differential geometry is best formulated using Stratonovich integration. We consider an SDE on $M$ driven by an $m$-dimensional Brownian motion $B_t = (B^1_t, \dots, B^m_t)$ in $\mathbb{R}^m$. Let $V_0$ be a vector field representing the drift, and let $V_1, \dots, V_m$ be vector fields representing the diffusion coefficients. In local coordinates, the intrinsic equation is written as:

$$
dX_t = V_0(X_t) dt + \sum_{k=1}^m V_k(X_t) \circ dB^k_t
$$

This formulation ensures that the solution $X_t$ is independent of the chart used to describe it.

> **Brownian Motion on the Circle**

> Consider Brownian motion on the circle $S^1 = \mathbb{R}/2\pi\mathbb{Z}$ driven by a single Brownian motion: $d\theta_t = \sigma \circ dB_t$. In local coordinates $\theta \in [-\pi, \pi)$, the Stratonovich SDE is $d\theta_t = \sigma dB_t$ (Stratonovich). To verify coordinate invariance, consider the coordinate change $\phi = 2\theta$. Then $d\phi_t = 2 d\theta_t = 2\sigma dB_t$.

> The generator in $\theta$-coordinates is:

> $$
> \mathcal{L}_\theta = \frac{\sigma^2}{2} \frac{\partial^2}{\partial \theta^2}
> $$

> In $\phi$-coordinates:

> $$
> \mathcal{L}_\phi = \frac{(2\sigma)^2}{2} \frac{\partial^2}{\partial \phi^2} = 2\sigma^2 \frac{\partial^2}{\partial \phi^2}
> $$

> Using the chain rule $\frac{\partial}{\partial \phi} = \frac{1}{2} \frac{\partial}{\partial \theta}$:

> $$
> \mathcal{L}_\phi = 2\sigma^2 \left(\frac{1}{2}\right)^2 \frac{\partial^2}{\partial \theta^2} = \frac{\sigma^2}{2} \frac{\partial^2}{\partial \theta^2}
> $$

> The generator transforms correctly, confirming coordinate invariance. For the stochastic development on the frame bundle $OS^1$, the frame bundle at point $\theta$ consists of orthonormal bases $\{e_1(\theta)\}$. The horizontal lift is $de_1(\theta_t) = H_1(e_1) \circ dB_t$ where $H_1$ is the horizontal vector field. For $S^1$ with metric $ds^2 = d\theta^2$, we have $H_1 = \frac{\partial}{\partial \theta}$. The parallel transport satisfies $\nabla_{\frac{\partial}{\partial \theta}} e_1 = 0$, implying $e_1(\theta_t) = e_1(0)$. This demonstrates that parallel transport on $S^1$ is path-independent due to the flat connection.

> The transition density (heat kernel) on $S^1$ is:

> $$
> p_t(\theta, \phi) = \frac{1}{2\pi} + \frac{1}{\pi} \sum_{k=1}^\infty \cos(k(\theta-\phi)) e^{-k^2 \sigma^2 t/2}
> $$

> This periodic structure reflects the compact topology of the circle, with the constant term representing the uniform stationary distribution and the Fourier modes capturing the transient behavior.

#### Stochastic Parallel Transport and Development

To analyze these processes without relying on local charts, we utilize the frame bundle $OM$ (the bundle of orthonormal bases of the tangent spaces). We lift the Brownian motion from the flat tangent space $T_{x_0}M \cong \mathbb{R}^d$ to a path on the manifold via the **Eells-Elworthy-Malliavin construction**.

This is conceptualized as "rolling without slipping." We define the **stochastic development** map, which transforms a Brownian motion in $\mathbb{R}^d$ into a diffusion on $M$. Let $u_t \in O_{X_t}M$ be an orthonormal frame at $X_t$. The horizontal lift of the process is defined by solving a differential equation on the frame bundle using the canonical horizontal vector fields $H_i$:

$$
du_t = \sum_{i=1}^d H_i(u_t) \circ dB^i_t
$$

The projection $\pi(u_t) = X_t$ defines Brownian motion on the manifold (specifically, the diffusion generated by the Laplace-Beltrami operator $\Delta_M$). Simultaneously, $u_t$ defines **stochastic parallel transport** along the rough path $X_t$. This construction allows us to compare tangent vectors at different times $t$ and $s$ along a non-differentiable trajectory, extending the Levi-Civita connection to the stochastic setting.

> **Foucault Pendulum on the Sphere**

> Model the stochastic Foucault pendulum on $S^2$ with coordinates $(\theta, \phi)$ where $\theta \in [0,\pi]$ (colatitude) and $\phi \in [0, 2\pi)$ (longitude). The SDE on $S^2$ is:

> $$
> \begin{cases}
> d\theta_t = \sigma_1 \circ dB^1_t \\
> d\phi_t = \sin^{-1}(\theta_t) \sigma_2 \circ dB^2_t
> \end{cases}
> $$

> The Riemannian metric is $ds^2 = d\theta^2 + \sin^2\theta d\phi^2$ with volume form $dV = \sin\theta d\theta d\phi$. The diffusion vector fields are $V_1 = \frac{\partial}{\partial \theta}$ and $V_2 = \sin^{-1}(\theta) \frac{\partial}{\partial \phi}$. The generator is:

> $$
> \mathcal{L} = \frac{1}{2} \left( V_1^2 + V_2^2 \right) = \frac{1}{2} \frac{\partial^2}{\partial \theta^2} + \frac{1}{2} \frac{\partial^2}{\partial \phi^2}
> $$

> Remarkably, the generator is exactly the Laplace-Beltrami operator $\Delta_{S^2}$.

> For the Malliavin derivative computation, consider $F = \cos\theta_T$. Then:

> $$
> D_t \cos\theta_T = -\sin\theta_T \cdot D_t \theta_T
> $$

> The process $Y_t = D_t \theta_s$ for $s \geq t$ satisfies $dY_u = 0$ with $Y_t = 1$, so $Y_u = 1$ for $u \geq t$. Thus:

> $$
> D_t F = -\sin\theta_T \cdot \mathbf{1}_{[0,T]}(t)
> $$

> The Malliavin covariance matrix is:

> $$
> \sigma_F = \int_0^T \mid D_t F \mid_H^2 dt = \int_0^T \sin^2\theta_T dt = T \sin^2\theta_T
> $$

> The density exists since $\mathbb{E}[\sigma_F^{-1}] < \infty$ almost surely. Physically, the noise in $\phi$ is state-dependent (proportional to $1/\sin\theta$), vanishing at the poles. Yet Hörmander's condition holds: $[V_1, V_2] = \frac{\partial}{\partial \phi} \cos\theta$. The Lie brackets span $T_p S^2$ everywhere except the poles, ensuring smooth densities despite the singular behavior of the noise at the poles.

### Malliavin Calculus: Variations on Wiener Space

While stochastic geometry handles the curvature of the state space, Malliavin calculus addresses the geometry of the probability space itself. It can be viewed as an infinite-dimensional calculus of variations where the "variable" is the Brownian path $\omega \in \Omega = C_0([0,T]; \mathbb{R}^m)$.

#### The Malliavin Derivative

We seek to differentiate a random variable $F(\omega)$ with respect to variations in the path $\omega$. Let $H = L^2([0,T]; \mathbb{R}^m)$ be the Cameron-Martin space. For a "cylindrical" functional of the form $F = f(B(t_1), \dots, B(t_n))$ with $f \in C_p^\infty(\mathbb{R}^{n \times m})$, the Malliavin derivative $DF$ is the $H$-valued random variable defined by:

$$
D_t F = \sum_{i=1}^n \partial_i f(B(t_1), \dots, B(t_n)) \mathbf{1}_{[0, t_i]}(t)
$$

Here, $D_t F$ represents the gradient of the functional in the direction of the noise at time $t$. We define the Sobolev space $\mathbb{D}^{1,p}$ as the completion of cylindrical functionals under the norm:

$$
\mid\mid F \mid\mid_{1,p} = \left( \mathbb{E}[\mid F \mid^p] + \mathbb{E}[\mid\mid DF \mid\mid_H^p] \right)^{1/p}
$$

#### Integration by Parts and the Skorokhod Integral

The operator $D: \mathbb{D}^{1,2} \to L^2(\Omega; H)$ is unbounded but closable. Its adjoint, denoted by $\delta$, is called the divergence operator or the **Skorokhod integral**. It generalizes the Itô integral to integrands that are not adapted to the filtration. The fundamental integration by parts formula on Wiener space relates these operators:

$$
\mathbb{E}[\langle DF, u \rangle_H] = \mathbb{E}[F \delta(u)]
$$

for any $F \in \mathbb{D}^{1,2}$ and any process $u$ in the domain of $\delta$. This formula is the stochastic analog of the divergence theorem and is the engine driving the regularity results of the theory.

#### The Clark-Ocone Formula

A pivotal result in this calculus is the explicit representation of the martingale in the Itô representation theorem. For any $F \in \mathbb{D}^{1,2}$, we have:

$$
F = \mathbb{E}[F] + \int_0^T \mathbb{E}[D_t F \mid \mathcal{F}_t] dB_t
$$

This links the derivative of a functional to the integrand required to replicate it, a result with profound implications for hedging in mathematical finance.

> **Clark-Ocone Formula Verification**

> To verify the Clark-Ocone formula for $F = B_T^2$ where $B_t$ is 1D Brownian motion, compute the Malliavin derivative:

> $$
> D_t F = D_t (B_T^2) = 2 B_T D_t B_T = 2 B_T \mathbf{1}_{[0,T]}(t)
> $$

> The conditional expectation is:

> $$
> \mathbb{E}[D_t F \mid \mathcal{F}_t] = 2 \mathbb{E}[B_T \mid \mathcal{F}_t] = 2 B_t
> $$

> The Clark-Ocone formula gives:

> $$
> F = \mathbb{E}[F] + \int_0^T \mathbb{E}[D_t F \mid \mathcal{F}_t] dB_t
> $$

> Since $\mathbb{E}[B_T^2] = T$:

> $$
> B_T^2 = T + \int_0^T 2 B_t dB_t
> $$

> Verification via Itô's formula: $d(B_t^2) = 2 B_t dB_t + dt$. Integrating: $B_T^2 = B_0^2 + \int_0^T 2 B_t dB_t + T = T + \int_0^T 2 B_t dB_t$. The results match exactly, demonstrating that the Clark-Ocone formula provides the explicit martingale representation required for hedging strategies.

> **Asian Option Pricing**

> For an Asian call option $F = \max\left(\frac{1}{T} \int_0^T S_t dt - K, 0\right)$ where $dS_t = \mu S_t dt + \sigma S_t dB_t$ with $S_0 = S$, the average process is $A_t = \frac{1}{t} \int_0^t S_u du$ with $dA_t = \frac{S_t - A_t}{t} dt$.

> The Malliavin derivative is:

> $$
> D_s A_T = \frac{1}{T} D_s \int_0^T S_u du = \frac{1}{T} \int_s^T D_s S_u du
> $$

> The process $Y_u = D_s S_u$ satisfies $dY_u = \mu Y_u du + \sigma Y_u dB_u$ with $Y_s = S_s$, so $Y_u = S_u$ for $u \geq s$.

> The Clark-Ocone representation is:

> $$
> F = \mathbb{E}[F] + \int_0^T \mathbb{E}[D_t F \mid \mathcal{F}_t] dB_t
> $$

> The hedging strategy is $\pi_t = \mathbb{E}[D_t F \mid \mathcal{F}_t]$, providing the exact portfolio allocation needed to replicate the Asian option payoff. This demonstrates how Malliavin calculus directly computes hedging strategies for path-dependent derivatives.

### Hörmander's Theorem and Hypoellipticity

The crowning achievement of geometric stochastic analysis is the probabilistic proof of Hörmander's theorem. Consider the SDE on $\mathbb{R}^d$ (or a manifold):

$$
dX_t = V_0(X_t) dt + \sum_{k=1}^m V_k(X_t) \circ dB^k_t
$$

The generator of this diffusion is the second-order partial differential operator $\mathcal{L} = V_0 + \frac{1}{2}\sum_{k=1}^m V_k^2$. If the diffusion coefficients are non-degenerate (elliptic case), classical theory ensures the transition density $p_t(x, y)$ is smooth. However, if the noise acts only on a subspace, ellipticity fails.

#### The Lie Algebra Condition

The operator $\mathcal{L}$ is **hypoelliptic** if the vector fields $\{V_0, V_1, \dots, V_m\}$ and their iterated Lie brackets $[V_i, V_j], [V_i, [V_j, V_k]], \dots$ span the tangent space $\mathbb{R}^d$ at every point. Geometrically, this means that while the noise does not push in every direction directly, it can reach any direction through the non-commutativity of the flows.

#### The Malliavin Covariance Matrix

To prove that the law of $X_t$ admits a smooth density, we analyze the Malliavin covariance matrix $\sigma_{X_t} \in \mathbb{R}^{d \times d}$, defined by:

$$
\sigma_{X_t}^{ij} = \langle D X_t^i, D X_t^j \rangle_H
$$

The non-degeneracy of this matrix implies the smoothness of the density. Using the integration by parts formula on Wiener space, one can show that if the Lie algebra condition holds, the matrix $\sigma_{X_t}$ is invertible almost surely, and the inverse has finite moments of all orders. This guarantees that $X_t$ has a density $p_t(x, \cdot) \in C^\infty$, bridging the algebraic geometry of vector fields with the functional analysis of partial differential equations.

> **Hypoellipticity on the Heisenberg Group**

> Consider the Heisenberg group $\mathbb{H}^3 = \mathbb{R}^3$ with group law:

> $$
> (x,y,z) \cdot (x',y',z') = \left(x+x', y+y', z+z' + \frac{1}{2}(xy'-x'y')\right)
> $$

> The left-invariant vector fields are:

> $$
> X = \frac{\partial}{\partial x} - \frac{y}{2} \frac{\partial}{\partial z}, \quad Y = \frac{\partial}{\partial y} + \frac{x}{2} \frac{\partial}{\partial z}, \quad Z = \frac{\partial}{\partial z}
> $$

> For the SDE $dX_t = X(X_t) \circ dB^1_t + Y(X_t) \circ dB^2_t$, the Lie bracket computation yields $[X, Y] = Z$ and $[X, Z] = [Y, Z] = 0$. The Hörmander condition is satisfied: $\{X, Y, [X,Y]\} = \{X, Y, Z\}$ spans $\mathbb{R}^3$.

> For the Malliavin derivative system, let $X_t = (x_t, y_t, z_t)$. The Malliavin derivatives $J_t = D_t X_s$ satisfy:

> $$
> \begin{cases}
> dJ^x_u = 0, & J^x_t = 1 \\
> dJ^y_u = 0, & J^y_t = 0 \\
> dJ^z_u = -\frac{y_u}{2} dJ^x_u + \frac{x_u}{2} dJ^y_u, & J^z_t = 0
> \end{cases}
> $$

> The solution is $J^x_u = 1$, $J^y_u = 0$, $J^z_u = \int_t^u \left(\frac{x_r}{2}\right)' dr = 0$.

> The Malliavin covariance matrix at time $T$ is:

> $$
> \sigma_T = \int_0^T J_t J_t^T dt = \begin{pmatrix}
> T & 0 & 0 \\
> 0 & T & 0 \\
> 0 & 0 & \int_0^T \int_t^T [X_r, Y_r] dr dt
> \end{pmatrix}
> $$

> Computing the $(3,3)$ entry:

> $$
> \int_0^T \int_t^T \langle [X_r, Y_r], Z \rangle dr dt = \int_0^T \int_t^T 1 \, dr \, dt = \frac{T^2}{2}
> $$

> The determinant is:

> $$
> \det \sigma_T = T \cdot T \cdot \frac{T^2}{2} = \frac{T^4}{2} > 0
> $$

> The matrix is invertible for all $T > 0$, proving hypoellipticity. The small-time asymptotic for the heat kernel is:

> $$
> p_t(x,y,z) \sim (4\pi t)^{-3/2} \exp\left(-\frac{x^2 + y^2}{4t} - \frac{\mid z - \frac{xy}{2} \mid^2}{t^3}\right)
> $$

> The non-Gaussian $z$-component reflects the non-commutativity of the Heisenberg group, demonstrating how Lie bracket structure determines the scaling behavior of the transition density.

> **Hörmander's Theorem with Explicit Lie Brackets**

> For the SDE $dX_t = Y(X_t) dt + X(X_t) \circ dB_t$ where $X = \frac{\partial}{\partial x}$ and $Y = -y \frac{\partial}{\partial x} + \frac{\partial}{\partial y}$, the Lie brackets are:

> $$
> [Y, X] = \frac{\partial}{\partial x} + y \frac{\partial}{\partial x} = (1+y) \frac{\partial}{\partial x}
> $$

> The span is $\{(1+y)\partial_x, \partial_y\}$, which is non-degenerate except at $y = -1$. The Malliavin matrix is:

> $$
> J_t = \begin{pmatrix} D_t x_s & D_t y_s \\ 0 & 1 \end{pmatrix}
> $$

> With $D_t x_s = \int_t^s -y_r dr$ and $D_t y_s = 1$:

> $$
> \sigma_T = \int_0^T \begin{pmatrix} \left(\int_t^T -y_r dr\right)^2 & \int_t^T -y_r dr \\ \int_t^T -y_r dr & T \end{pmatrix} dt
> $$

> This demonstrates how the Lie bracket structure determines the non-degeneracy of the Malliavin covariance matrix, ensuring smooth densities when the Hörmander condition is satisfied.

> **Stochastic Rigid Body**

> For angular velocity $\omega \in \mathbb{R}^3$ with $d\omega_t = \omega_t \times I\omega_t dt + \sum_{i=1}^3 e_i \circ dB^i_t$, the vector fields are $V_0 = \omega \times I\omega$ and $V_i = e_i$. The Lie algebra $\mathfrak{so}(3)$ satisfies $[V_i, V_j] = e_i \times e_j$. The Lie algebra generated is all of $\mathbb{R}^3$, ensuring hypoellipticity. This demonstrates that even when noise acts only along coordinate axes, the non-commutativity of rotations ensures that all directions are accessible, guaranteeing smooth transition densities for the rigid body dynamics.

> **Failure Case: Sub-Riemannian Geometry**

> For sub-Riemannian geometry where noise acts only on the first coordinate: $dX_t = Y(X_t) dt + \frac{\partial}{\partial x_1}(X_t) \circ dB_t$, if $[Y, \partial_{x_1}] = 0$, then the span is only 1-dimensional. The density is singular along characteristics, demonstrating that when the Hörmander condition fails, the transition density may not exist or may be singular. This highlights the necessity of the Lie bracket spanning condition for hypoellipticity.

> **Integration by Parts on Manifolds**

> For $F = f(X_T)$ where $X_t$ solves an SDE on manifold $M$, the local coordinate formula for integration by parts is:

> $$
> \mathbb{E}[\langle DF, u \rangle_H] = \mathbb{E}[F \delta(u)]
> $$

> for $f \in C^\infty_p(M)$. The global extension lifts to the frame bundle $OM$, defining $DF$ using horizontal vector fields $H_i$:

> $$
> D_t f(X_s) = \sum_{i=1}^d \langle H_i(f), u_t \rangle \mathbf{1}_{[0,s]}(t)
> $$

> The Skorokhod integral $\delta(u)$ satisfies:

> $$
> \mathbb{E}[f(X_T) \delta(u)] = \mathbb{E}\left[\int_M f(x) \operatorname{div}_M(u_T(x)) d\mu(x)\right]
> $$

> This extends the integration by parts formula to manifolds, providing the foundation for proving regularity results for SDEs on curved spaces.

## References

* Elworthy, K. D. (1982). *Stochastic Differential Equations on Manifolds*. Cambridge University Press.
* Hörmander, L. (1967). "Hypoelliptic second order differential equations". *Acta Mathematica*.
* Hsu, E. P. (2002). *Stochastic Analysis on Manifolds*. American Mathematical Society.
* Ikeda, N., & Watanabe, S. (1989). *Stochastic Differential Equations and Diffusion Processes*. North-Holland.
* Nualart, D. (2006). *The Malliavin Calculus and Related Topics*. Springer.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 5.2 SDEs & Diffusion Processes]({{ '/diffequations/chapter-05/05-2-sdes/' | relative_url }})
- [Next Section: 5.4 Rough Paths & Controlled Rough Paths]({{ '/diffequations/chapter-05/05-4-rough-paths/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-05/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
