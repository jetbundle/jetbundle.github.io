---
layout: textbook
title: "Section 3.6: Geometric Optics, Rays & Caustics"
description: "Eikonal equation, wave fronts, caustics"
permalink: /diffequations/chapter-03/03-6-geometric-optics/
order: 3.6
chapter: 3
section: 6
nav_order: 3.6
is_chapter_index: false
parent_chapter: 3
parent_section: null
---

# Section 3.6: Geometric Optics, Rays & Caustics

> High-frequency waves reduce to ray geometry, but caustics—where rays focus—reveal the breakdown of geometric optics and the necessity of wave corrections.

## Introduction

The study of hyperbolic systems in Section 3.2 revealed that nonlinear transport equations spontaneously generate singularities, or shocks. We now turn to a parallel phenomenon in the study of wave propagation. When the wavelength of a disturbance is negligible compared to the scale of the domain (the high-frequency limit), the partial differential equation governing the wave reduces to a nonlinear first-order equation governing its phase. This reduction maps the physics of waves onto the geometry of rays. However, just as characteristics cross in hyperbolic conservation laws, rays focus and intersect in geometric optics. These intersections create caustics—geometric singularities where the classical approximation breaks down, predicting infinite energy and necessitating the non-smooth analysis of viscosity solutions.

## Mathematical Content

### High-Frequency Asymptotics

We examine the scalar wave equation or, upon temporal Fourier transform, the Helmholtz equation in a medium with a variable index of refraction $n(x)$. Let $\Omega \subset \mathbb{R}^d$ be a domain and consider the limit of large wavenumber $k$:

$$
\Delta u(x) + k^2 n^2(x) u(x) = 0
$$

We seek an asymptotic solution in the form of the WKB (Wentzel–Kramers–Brillouin) ansatz, separating the rapidly oscillating phase from the slowly varying amplitude:

$$
u(x) \sim a(x) e^{ik S(x)}
$$

Substituting this ansatz into the Helmholtz equation and organizing terms by powers of $k$ yields a hierarchy of equations. The dominant term, of order $O(k^2)$, provides the **Eikonal Equation**:

$$
\mid \nabla S(x) \mid^2 = n^2(x)
$$

This is a fully nonlinear, first-order partial differential equation for the phase function $S(x)$. Geometrically, $S(x)$ represents the wavefronts of the propagating disturbance. The next term in the expansion, of order $O(k)$, yields the **Transport Equation**:

$$
2\nabla S \cdot \nabla a + (\Delta S)a = 0
$$

This linear hyperbolic equation governs the evolution of the amplitude $a(x)$ along the flow determined by $\nabla S$. As discussed in Evans (2010), this equation implies the conservation of energy flux along the rays. Specifically, the quantity $a^2 \mid \nabla S \mid$ is conserved along the characteristics of the Eikonal equation.

### Hamilton-Jacobi Theory

To solve the Eikonal equation $\mid \nabla S \mid^2 = n^2(x)$, we employ the method of characteristics, framing the problem within Hamilton-Jacobi mechanics. We define the Hamiltonian $H(x,p)$ on the cotangent bundle $T^*\Omega$ (phase space):

$$
H(x,p) = \frac{1}{2} \left( \mid p \mid^2 - n^2(x) \right)
$$

The Eikonal equation is equivalent to the level set condition $H(x, \nabla S) = 0$. The characteristics of this PDE are the integral curves of the Hamiltonian vector field $X_H$. In canonical coordinates $(x, p)$, Hamilton's equations are:

$$
\dot{x} = \nabla_p H = p
$$

$$
\dot{p} = -\nabla_x H = \frac{1}{2} \nabla (n^2(x)) = n(x) \nabla n(x)
$$

Identifying the momentum $p$ with the gradient of the phase $\nabla S$, the first equation indicates that the trajectory $x(t)$ is parallel to the gradient of the wavefront. These trajectories are called **light rays**. As detailed in Arnold (1989), if $n(x)$ represents a Riemannian metric structure, these rays are precisely the geodesics of the manifold.

The phase $S(x)$ can be reconstructed by integrating the Lagrangian along these rays. For a ray $\gamma(t)$ connecting $x_0$ to $x$, the phase is given by the action integral:

$$
S(x) = S(x_0) + \int_{0}^{t} n^2(\gamma(\tau)) \, d\tau
$$

This formulation reduces the solution of the nonlinear PDE to the solution of a system of ODEs, valid as long as the rays do not intersect.

### Caustics & Conjugate Points

The geometric optics approximation is local. Since the Eikonal equation is nonlinear, the characteristics (rays) may eventually intersect. To analyze this, we utilize the exponential map from Riemannian geometry (do Carmo, 1992). Let rays emanate from a source point $x_0$. We define the ray family by $\gamma(t, v) = \text{Exp}_{x_0}(tv)$, where $v \in T_{x_0}\Omega$ is the initial direction.

A **conjugate point** along a ray is a point $p = \gamma(t_c, v)$ where the differential of the exponential map, $d(\text{Exp}_{x_0})_{t_c v}$, is singular. At such points, the mapping from initial directions to physical space ceases to be a local diffeomorphism.

The locus of these critical values is called the **caustic**. Geometrically, the caustic is the envelope of the family of rays. Physically, the consequences are severe. Recall the Transport Equation from 3.6.1, which implies $a^2$ is inversely proportional to the expansion of the ray tube (the Jacobian determinant of the exponential map). As the rays focus at a caustic, the Jacobian vanishes, and the amplitude $a(x)$ tends toward infinity:

$$
\lim_{x \to \text{caustic}} \mid u(x) \mid = \infty
$$

This divergence indicates the failure of the ansatz $u \sim a e^{ikS}$. The ray theory predicts infinite energy density, a physical impossibility. To resolve the field behavior near a caustic, one must abandon the single-ray ansatz and employ uniform asymptotic methods involving Airy functions (for simple fold caustics) or more complex special functions classified by catastrophe theory (Arnold, 1989). This connects directly back to the Stokes phenomenon discussed in Section 1.5.

### Viscosity Solutions

Since classical smooth solutions to the Eikonal equation generally cease to exist after the formation of caustics, a notion of weak solution is required. However, like the shock solutions in Section 3.3, weak solutions to Hamilton-Jacobi equations are not unique. We require a selection principle consistent with the physics of wave propagation (irreversibility) and the vanishing viscosity limit.

Crandall and Lions introduced the concept of **viscosity solutions** to resolve this. We consider the Eikonal equation as the limit $\epsilon \to 0$ of a viscous regularization:

$$
-\epsilon \Delta u^\epsilon + \mid \nabla u^\epsilon \mid = n(x)
$$

A continuous function $u$ is a viscosity subsolution of $H(x, \nabla u) = 0$ if for every test function $\phi \in C^\infty(\Omega)$ such that $u - \phi$ has a local maximum at $x_0$:

$$
H(x_0, \nabla \phi(x_0)) \le 0
$$

Conversely, $u$ is a viscosity supersolution if for every test function $\psi$ such that $u - \psi$ has a local minimum at $x_0$:

$$
H(x_0, \nabla \psi(x_0)) \ge 0
$$

As proven in Evans (2010), the viscosity solution is unique and corresponds physically to the distance function defined by the minimal optical path length. This framework allows us to define the "wavefront" globally, even after rays have crossed and the classical function $S(x)$ has become multi-valued. The viscosity solution automatically selects the "first arrival" branch of the wavefront, discarding the self-intersecting characteristic tails that lack physical meaning in the zero-wavelength limit.

> **Canonical WKB Analysis—Stratified Medium**

**Problem:** Consider the Helmholtz equation in a stratified medium:

$$
\Delta u + k^2 n^2(z) u = 0, \quad n(z) = 1 + \frac{1}{2}z^2
$$

Consider the Helmholtz equation in a stratified medium:
$$
u(x,z) \sim a(x,z) e^{ik S(x,z)}
$$

The Eikonal equation gives $\mid \nabla S \mid^2 = n^2(z) = (1 + \frac{1}{2}z^2)^2$, so $S_z^2 + S_x^2 = 1 + z^2 + \frac{1}{4}z^4$. Assuming a plane wave in $x$: $S(x,z) = x + T(z)$, we get $T'(z)^2 = z^2 + \frac{1}{4}z^4$, so $T'(z) = z\sqrt{1 + \frac{1}{4}z^2}$.

Integrating with the substitution $w = 1 + \frac{1}{4}t^2$ gives $T(z) = \frac{8}{3}[(1 + \frac{z^2}{4})^{3/2} - 1]$. The transport equation $2\nabla S \cdot \nabla a + (\Delta S)a = 0$ with $a(x,z) = A(z)$ yields $A(z) = C \exp(-\frac{1}{2}\int_0^z \frac{T''(t)}{T'(t)} dt)$.

The complete solution is $u(x,z) \sim C \exp(-\frac{1}{2}\int_0^z \frac{T''(t)}{T'(t)} dt) \exp(ik[x + \frac{8}{3}((1 + \frac{z^2}{4})^{3/2} - 1)])$.

This example demonstrates the WKB method: the Eikonal equation determines the phase, while the transport equation determines the amplitude. The amplitude correction accounts for the geometric spreading of rays.

> **Atmospheric Wave Propagation**

> For radio wave propagation in Earth's ionosphere with $n(z) = \sqrt{1 - \frac{z^2}{h^2}}$, the Eikonal equation is $\mid \nabla S \mid^2 = 1 - \frac{z^2}{h^2}$.

> The turning point occurs at $z = h$ where $\nabla S = 0$. Ray paths are circular arcs reflecting at the turning point.

> The phase is $S(x,z) = \int_0^z \sqrt{1 - \frac{t^2}{h^2}} dt = \frac{h}{2}[z\sqrt{1 - \frac{z^2}{h^2}} + \arcsin(\frac{z}{h})]$.

> Waves are trapped between $z=0$ and $z=h$, creating a waveguide effect that channels radio signals around the Earth's curvature.

> **Explicit Ray Computation—Parabolic Index**

> For $n(x,y) = \sqrt{1 - x^2}$, compute ray trajectories from $(0,0)$.

> The Hamiltonian is $H(x,y,p_x,p_y) = \frac{1}{2}(p_x^2 + p_y^2 - (1 - x^2))$. Hamilton's equations give $\dot{x} = p_x$, $\dot{p}_x = x$, $\dot{y} = p_y$, and $\dot{p}_y = 0$.

> The $y$-motion is uniform: $p_y(t) = \text{constant}$ and $y(t) = y_0 + p_y t$. The $x$-motion is a harmonic oscillator: $\ddot{x} + x = 0$, with solution $x(t) = A\cos t + B\sin t$ and $p_x(t) = -A\sin t + B\cos t$.

> With initial conditions $x(0)=0$ and $p_x(0)=p_0$, we get $x(t) = p_0 \sin t$ and $p_x(t) = p_0 \cos t$. The complete ray is $(x(t),y(t)) = (p_0 \sin t, p_y t)$, which describes cycloids in the $(x,y)$-plane, periodic in the $x$-direction.

### Example 3.6.4: Phase Reconstruction

**Problem:** Reconstruct phase for ray $(p_0 \sin t, p_y t)$.

**Solution:**

$$
S(x,y) = \int_0^{t(x,y)} n^2(\gamma(\tau)) \, d\tau
$$

Compute:

$$
n^2(\gamma(t)) = 1 - x^2(t) = 1 - p_0^2 \sin^2 t
$$

$$
S(x,y) = \int_0^t (1 - p_0^2 \sin^2 \tau) \, d\tau = t - p_0^2 \left(\frac{t}{2} - \frac{\sin 2t}{4}\right)
$$

Inverse: $t = \arcsin(x/p_0)$, substitute to get explicit $S(x,y)$.

### Example 3.6.5: Explicit Caustic Computation—Elliptic

**Problem:** Rays from focus of ellipse with $n=1$ (straight lines).

**Setup:** Ellipse $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$, focus at $(c,0)$, $c = \sqrt{a^2 - b^2}$.

**Solution:**

1. **Ray Family:** Lines from $(c,0)$ with slope $m$:
$$
y = m(x - c)
$$

2. **Envelope Computation (Caustic):**
Family: $F(x,y,m) = y - m(x - c) = 0$

Envelope condition: $\frac{\partial F}{\partial m} = 0$:
$$
-(x - c) = 0 \implies x = c
$$

Substitute: $y = m(0) = 0$

**Result:** All rays intersect at other focus $(-c,0)$!

3. **Amplitude Analysis:**
- Before focus: Jacobian $J(t) \propto t$
- At focus: $J(t) = 0$
- Amplitude: $a(x) \propto J^{-1/2} \to \infty$

### Example 3.6.6: Parabolic Mirror Caustic

**Problem:** Parabolic mirror $y = \frac{x^2}{4f}$, rays parallel to $y$-axis.

**Solution:**

1. **Ray Family:** $x = x_0$, $y = t$ (vertical rays)

2. **Reflection Law:**
Incident $\vec{i} = (0,1)$, normal $\vec{n} = \frac{(-x,2f)}{\sqrt{x^2 + 4f^2}}$

Reflected ray:
$$
\vec{r} = \vec{i} - 2(\vec{i} \cdot \vec{n})\vec{n}
$$

At $x=x_0$: $\vec{r} = \left(\frac{x_0}{f}, -1\right)$

3. **Parametric Equation:**
$$
x(t) = x_0 + \frac{x_0}{f}t, \quad y(t) = f - t
$$

4. **Caustic (Envelope):**
Family: $F(x,y,x_0) = y + t - f = 0$, $x = x_0(1 + t/f)$

$\frac{\partial F}{\partial x_0} = 0$: $1 + t/f = 0 \implies t = -f$

Substitute: $x = x_0(0) = 0$, $y = f - f = 0$

**Caustic Curve:** All rays focus at focal point $(0,f)$!

### Example 3.6.7: General Conjugate Point Analysis

**Problem:** Analyze conjugate points using exponential map.

**Solution:**

1. **Exponential Map:** $\gamma(t,v) = \text{Exp}_0(tv)$

2. **Jacobi Field:** $J(t) = \frac{d}{ds}\gamma(t,su)\mid_{s=0}$

3. **Conjugate Condition:**
$$
\det\left(\frac{\partial(x_1,...,x_n)}{\partial(v_1,...,v_n)}\right) = 0
$$

4. **For Harmonic Oscillator** ($n(x) = \sqrt{1-x^2}$):
Ray: $x(t) = A\sin t$

Jacobi: $J'' + J = 0$, $J(0)=1$, $J'(0)=0$

Solution: $J(t) = \cos t$

Conjugate: $\cos t_c = 0 \implies t_c = \pi/2$

**First Conjugate Point:** $x(\pi/2) = A$, exactly one period along $x$-axis.

> **Explicit Viscosity Solution—Distance Function**

> For $\mid \nabla u \mid = 1$ in the unit disk with $u=0$ on the boundary, the classical method of characteristics gives straight lines from the boundary that intersect at the center, making the solution multi-valued.

> The viscosity solution is $u(x) = \min_{y\in\partial B} \mid x-y \mid = 1 - \mid x \mid$. This satisfies the viscosity conditions: for any test function $\phi$ touching from above, $\mid \nabla\phi(x_0) \mid \leq 1$, and for any $\psi$ touching from below, $\mid \nabla\psi(x_0) \mid \geq 1$.

> The viscous approximation $-\epsilon\Delta u^\epsilon + \mid \nabla u^\epsilon \mid = 1$ converges uniformly to $u^\epsilon \to 1-\mid x \mid$ as $\epsilon \to 0$.

The viscosity solution automatically selects the "first arrival" branch, discarding the unphysical multi-valued parts. This is the geometric optics analog of the entropy condition for conservation laws.

> **Refractive Index with Caustic**

> For $\mid \nabla u \mid = n(x)$ where $n(x,y) = \sqrt{1-x^2}$, the rays are cycloids $(p_0\sin t, p_y t)$.

> The first arrival time is $T(x,y) = \inf\{t: \exists p_0, p_y \text{ s.t. }(x,y) = (p_0\sin t, p_y t)\}$ with constraint $p_0^2 + p_y^2 = 1$.

> The solution $u(x,y) = \min\{T(x,y)\}$ is the single-valued envelope of cycloids, automatically selecting the physically relevant branch that minimizes travel time.

This demonstrates how viscosity solutions resolve the multi-valuedness that arises when rays intersect, providing a global definition of the wavefront even after caustics form.

> **Uniform Asymptotics Near Caustic**

> For a simple fold caustic, before the caustic there is a single ray $u \sim a_1 e^{ikS_1}$, while after the caustic there are two rays $u \sim a_2 e^{ikS_2} + a_3 e^{ikS_3}$.

> The uniform ansatz is $u \sim \text{Ai}(k^{2/3}\xi) e^{ik\phi_0}$ where $\xi = (S_1 - S_2)/k^{1/3}$ is the caustic coordinate and $\phi_0$ is the common phase.

> As $\xi \to -\infty$, $\text{Ai}(\xi) \sim \frac{1}{\sqrt{\pi}(-\xi)^{1/4}} \cos(\frac{2}{3}(-\xi)^{3/2} - \frac{\pi}{4})$, matching the oscillatory behavior before the caustic. As $\xi \to +\infty$, $\text{Ai}(\xi) \sim \frac{1}{2\sqrt{\pi}\xi^{1/4}} e^{-\frac{2}{3}\xi^{3/2}}$, matching the exponential decay after the caustic.

> This provides a smooth transition through the caustic with finite amplitude, resolving the divergence predicted by geometric optics.

Uniform asymptotic methods extend geometric optics beyond its breakdown at caustics, providing a complete description of wave fields that smoothly transitions between the geometric and wave regimes.

## Challenge Problems

The following problems synthesize the concepts of geometric optics, caustics, and viscosity solutions.

### Challenge 1: The Eikonal Equation and Fermat's Principle

Show that the Eikonal equation $\mid \nabla S \mid^2 = n^2(x)$ is equivalent to Fermat's principle of least time: light rays follow paths that minimize the optical path length $\int n(x) ds$.

Use this to derive Snell's law of refraction at an interface between two media with different indices of refraction.

*(Hint: Use the calculus of variations to find extremal paths for the functional $\int n(x) \sqrt{1 + (dy/dx)^2} dx$, and show that these satisfy the Eikonal equation.)*

<details>
<summary><strong>Expand Solution</strong></summary>

Fermat's principle states that light rays follow paths $\gamma(t)$ that minimize the optical path length $L[\gamma] = \int_{\gamma} n(x) ds = \int_{t_0}^{t_1} n(\gamma(t)) \mid \dot{\gamma}(t) \mid dt$.

Using the calculus of variations, the Euler-Lagrange equations for this functional give:

$$\frac{d}{dt}\left(\frac{n(\gamma) \dot{\gamma}}{\mid \dot{\gamma} \mid}\right) = \nabla n(\gamma) \mid \dot{\gamma} \mid$$

For a path parameterized by arc length ($\mid \dot{\gamma} \mid = 1$), this becomes:

$$\frac{d}{ds}(n \dot{\gamma}) = \nabla n$$

which is exactly the ray equation derived from Hamilton's equations with the Eikonal equation.

The phase $S(x)$ is the optical path length from a source point, so $\nabla S$ points in the direction of the ray, and $\mid \nabla S \mid = n$ is the Eikonal equation.

For Snell's law, consider a ray crossing an interface at $x = 0$ between media with indices $n_1$ (for $x < 0$) and $n_2$ (for $x > 0$). Fermat's principle requires that the path minimizes the total optical path length. For a ray from $(x_1, y_1)$ to $(x_2, y_2)$ crossing at $(0, y)$, the total path length is $n_1 \sqrt{x_1^2 + (y - y_1)^2} + n_2 \sqrt{x_2^2 + (y_2 - y)^2}$.

Minimizing with respect to $y$ gives $n_1 \frac{y - y_1}{\sqrt{x_1^2 + (y - y_1)^2}} = n_2 \frac{y_2 - y}{\sqrt{x_2^2 + (y_2 - y)^2}}$, which is Snell's law: $n_1 \sin \theta_1 = n_2 \sin \theta_2$.

</details>

### Challenge 2: Caustic Formation and Catastrophe Theory

Caustics are classified by catastrophe theory according to their local structure. The simplest caustic is a fold, where two rays merge into one.

Show that for a generic one-parameter family of rays $\gamma(t, \alpha)$ where $\alpha$ parameterizes the family, a fold caustic occurs when $\frac{\partial \gamma}{\partial \alpha} = 0$ and $\frac{\partial^2 \gamma}{\partial \alpha^2} \neq 0$.

Compute the amplitude divergence near a fold caustic and show that it scales as $a \sim \mid x - x_c \mid^{-1/6}$ where $x_c$ is the caustic point.

*(Hint: Use the fact that near a fold, the exponential map has a square-root singularity, and the amplitude is inversely proportional to the square root of the Jacobian.)*

<details>
<summary><strong>Expand Solution</strong></summary>

For a one-parameter family of rays $\gamma(t, \alpha)$, the exponential map sends initial conditions $(t, \alpha)$ to physical space $\gamma(t, \alpha)$. A caustic occurs where this map is singular, i.e., where the Jacobian $J = \det(\frac{\partial \gamma}{\partial t}, \frac{\partial \gamma}{\partial \alpha}) = 0$.

For a fold caustic, we have $\frac{\partial \gamma}{\partial \alpha} = 0$ at the caustic point, and the second derivative $\frac{\partial^2 \gamma}{\partial \alpha^2} \neq 0$ is non-zero, ensuring that the singularity is of the simplest type.

Near the caustic, we can expand $\gamma(t, \alpha) = \gamma_c + \frac{\partial \gamma}{\partial t}\mid_c (t - t_c) + \frac{1}{2}\frac{\partial^2 \gamma}{\partial \alpha^2}\mid_c (\alpha - \alpha_c)^2 + \cdots$ where the subscript $c$ denotes evaluation at the caustic.

The Jacobian near the caustic is $J \sim \mid \alpha - \alpha_c \mid$ (since the first-order term in $\alpha$ vanishes). The distance from the caustic is $\mid x - x_c \mid \sim (\alpha - \alpha_c)^2$, so $J \sim \mid x - x_c \mid^{1/2}$.

The amplitude satisfies $a^2 \mid \nabla S \mid J = \text{constant}$ (conservation of energy flux), so $a \sim J^{-1/2} \sim \mid x - x_c \mid^{-1/4}$.

However, this is the divergence in the geometric optics approximation. The actual field near a fold caustic is described by the Airy function, which gives $a \sim \mid x - x_c \mid^{-1/6}$ after proper uniform asymptotics, showing that the geometric optics prediction overestimates the divergence.

</details>

### Challenge 3: Viscosity Solutions and the Hopf-Lax Formula

For the Eikonal equation $\mid \nabla u \mid = n(x)$ with boundary condition $u = 0$ on $\partial \Omega$, the viscosity solution can be expressed using the Hopf-Lax formula:

$$u(x) = \inf_{y \in \partial \Omega} \left\{ \int_0^1 n(\gamma(s)) \mid \dot{\gamma}(s) \mid ds : \gamma(0) = y, \gamma(1) = x \right\}$$

Show that this formula gives the minimal optical path length from the boundary to $x$, and verify that it satisfies the viscosity solution conditions.

Use this to solve $\mid \nabla u \mid = 1$ in the unit disk with $u = 0$ on the boundary, and show that $u(x) = 1 - \mid x \mid$.

*(Hint: Use the fact that straight lines minimize path length in a uniform medium, and verify the viscosity conditions by checking that any smooth test function touching the solution from above or below satisfies the appropriate inequality.)*

<details>
<summary><strong>Expand Solution</strong></summary>

The Hopf-Lax formula expresses the viscosity solution as the infimum of path integrals over all curves connecting the boundary to the point $x$. This is exactly Fermat's principle: the solution is the minimal optical path length.

For $\mid \nabla u \mid = 1$ in the unit disk with $u = 0$ on the boundary, in a uniform medium ($n = 1$), the minimal path is a straight line. The distance from a point $x$ to the boundary is $1 - \mid x \mid$ (the distance to the nearest boundary point), so $u(x) = 1 - \mid x \mid$.

To verify the viscosity conditions, consider a test function $\phi$ such that $u - \phi$ has a local maximum at $x_0$. Since $u(x) = 1 - \mid x \mid$, we have $\phi(x) \geq 1 - \mid x \mid$ near $x_0$ with equality at $x_0$.

At $x_0 \neq 0$, $u$ is smooth and $\mid \nabla u \mid = 1$, so if $\phi$ touches from above, we must have $\mid \nabla \phi(x_0) \mid \leq 1$ (otherwise $\phi$ would decrease faster than $u$, violating the maximum condition).

At $x_0 = 0$, $u$ has a corner. For any test function $\phi$ touching from above, the gradient condition $\mid \nabla \phi(0) \mid \leq 1$ must hold in all directions, which is satisfied since $u$ is the distance function.

For a test function $\psi$ touching from below, we need $\mid \nabla \psi(x_0) \mid \geq 1$, which is also satisfied. Therefore, $u(x) = 1 - \mid x \mid$ is the unique viscosity solution.

This demonstrates that viscosity solutions provide a global, single-valued definition of the wavefront even when the classical solution becomes multi-valued, automatically selecting the physically relevant "first arrival" branch.

</details>

The theory of geometric optics provides a powerful asymptotic description of high-frequency waves, reducing wave equations to ray geometry. However, the breakdown at caustics reveals the limitations of this approximation and the necessity of wave corrections. The viscosity solution framework extends geometric optics globally, but the complete resolution of caustics requires uniform asymptotic methods that bridge the geometric and wave regimes, connecting to the special functions and asymptotic analysis developed in Chapter 1.

## References

* Arnold, V. I. (1989). *Mathematical Methods of Classical Mechanics*. Springer.
* do Carmo, M. P. (1992). *Riemannian Geometry*. Birkhäuser.
* Evans, L. C. (2010). *Partial Differential Equations*. American Mathematical Society.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 3.5 Continuum Mechanics & Elasticity]({{ '/diffequations/chapter-03/03-5-continuum-mechanics/' | relative_url }})
- [Next Section: 4.1 Lie Symmetries & Prolongation]({{ '/diffequations/chapter-04/04-1-lie-symmetries/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-03/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
