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
|\nabla S(x)|^2 = n^2(x)
$$

This is a fully nonlinear, first-order partial differential equation for the phase function $S(x)$. Geometrically, $S(x)$ represents the wavefronts of the propagating disturbance. The next term in the expansion, of order $O(k)$, yields the **Transport Equation**:

$$
2\nabla S \cdot \nabla a + (\Delta S)a = 0
$$

This linear hyperbolic equation governs the evolution of the amplitude $a(x)$ along the flow determined by $\nabla S$. As discussed in Evans (2010), this equation implies the conservation of energy flux along the rays. Specifically, the quantity $a^2 |\nabla S|$ is conserved along the characteristics of the Eikonal equation.

### Hamilton-Jacobi Theory

To solve the Eikonal equation $|\nabla S|^2 = n^2(x)$, we employ the method of characteristics, framing the problem within Hamilton-Jacobi mechanics. We define the Hamiltonian $H(x,p)$ on the cotangent bundle $T^*\Omega$ (phase space):

$$
H(x,p) = \frac{1}{2} \left( |p|^2 - n^2(x) \right)
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
\lim_{x \to \text{caustic}} |u(x)| = \infty
$$

This divergence indicates the failure of the ansatz $u \sim a e^{ikS}$. The ray theory predicts infinite energy density, a physical impossibility. To resolve the field behavior near a caustic, one must abandon the single-ray ansatz and employ uniform asymptotic methods involving Airy functions (for simple fold caustics) or more complex special functions classified by catastrophe theory (Arnold, 1989). This connects directly back to the Stokes phenomenon discussed in Section 1.5.

### Viscosity Solutions

Since classical smooth solutions to the Eikonal equation generally cease to exist after the formation of caustics, a notion of weak solution is required. However, like the shock solutions in Section 3.3, weak solutions to Hamilton-Jacobi equations are not unique. We require a selection principle consistent with the physics of wave propagation (irreversibility) and the vanishing viscosity limit.

Crandall and Lions introduced the concept of **viscosity solutions** to resolve this. We consider the Eikonal equation as the limit $\epsilon \to 0$ of a viscous regularization:

$$
-\epsilon \Delta u^\epsilon + |\nabla u^\epsilon| = n(x)
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

## Complete Examples

### Example 3.6.1: Canonical WKB Analysis—Stratified Medium

**Problem:** Consider the Helmholtz equation in a stratified medium:

$$
\Delta u + k^2 n^2(z) u = 0, \quad n(z) = 1 + \frac{1}{2}z^2
$$

**Step-by-Step Solution:**

1. **WKB Ansatz:**
$$
u(x,z) \sim a(x,z) e^{ik S(x,z)}
$$

2. **Eikonal Equation ($O(k^2)$):**
$$
|\nabla S|^2 = n^2(z) = \left(1 + \frac{1}{2}z^2\right)^2
$$

$$
S_z^2 + S_x^2 = 1 + z^2 + \frac{1}{4}z^4
$$

Assume plane wave in $x$: $S(x,z) = x + T(z)$

$$
T'(z)^2 = 1 + z^2 + \frac{1}{4}z^4 - 1 = z^2 + \frac{1}{4}z^4
$$

$$
T'(z) = z \sqrt{1 + \frac{1}{4}z^2}
$$

3. **Exact Integration:**
Let $w = 1 + \frac{1}{4}t^2$, $dw = \frac{1}{2}t dt$:

$$
T(z) = 4\int_1^{1 + \frac{1}{4}z^2} \sqrt{w} \, dw = \frac{8}{3} \left[ \left(1 + \frac{z^2}{4}\right)^{3/2} - 1 \right]
$$

4. **Transport Equation ($O(k)$):**
$$
2\nabla S \cdot \nabla a + (\Delta S)a = 0
$$

With $\nabla S = (1, T'(z))$ and $\Delta S = T''(z)$, assuming $a(x,z) = A(z)$:

$$
2T'(z)A'(z) + T''(z)A(z) = 0
$$

$$
A(z) = C \exp\left(-\frac{1}{2}\int_0^z \frac{T''(t)}{T'(t)} \, dt\right)
$$

5. **Complete Solution:**
$$
u(x,z) \sim C \exp\left(-\frac{1}{2}\int_0^z \frac{T''(t)}{T'(t)} \, dt\right) \exp\left(ik\left[x + \frac{8}{3}\left(\left(1 + \frac{z^2}{4}\right)^{3/2} - 1\right)\right]\right)
$$

### Example 3.6.2: Physical Application—Atmospheric Wave Propagation

**Problem:** Radio wave propagation in Earth's ionosphere, $n(z) = \sqrt{1 - \frac{z^2}{h^2}}$. Boundary: Source at $z=0$, study turning points where $n(z)=0$.

**Analysis:**

1. **Eikonal:**
$$
|\nabla S|^2 = 1 - \frac{z^2}{h^2}
$$

2. **Turning Point:** $z = h$ where $\nabla S = 0$

3. **Ray Paths:** Circular arcs reflecting at turning point

4. **Phase Computation:**
$$
S(x,z) = \int_0^z \sqrt{1 - \frac{t^2}{h^2}} \, dt = \frac{h}{2}\left[z\sqrt{1 - \frac{z^2}{h^2}} + \arcsin\left(\frac{z}{h}\right)\right]
$$

**Physical Insight:** Waves are trapped between $z=0$ and $z=h$, creating waveguide effect.

### Example 3.6.3: Explicit Ray Computation—Parabolic Index

**Problem:** $n(x,y) = \sqrt{1 - x^2}$, compute ray trajectories from $(0,0)$.

**Solution:**

1. **Hamiltonian:**
$$
H(x,y,p_x,p_y) = \frac{1}{2}(p_x^2 + p_y^2 - (1 - x^2))
$$

2. **Hamilton's Equations:**
$$
\dot{x} = p_x, \quad \dot{p}_x = x
$$

$$
\dot{y} = p_y, \quad \dot{p}_y = 0
$$

3. **Solutions:**
- $y$-motion: $p_y(t) = \text{constant}$, $y(t) = y_0 + p_y t$
- $x$-motion: Harmonic oscillator $\ddot{x} + x = 0$

$$
x(t) = A\cos t + B\sin t, \quad p_x(t) = -A\sin t + B\cos t
$$

4. **Initial Conditions:** $x(0)=0$, $p_x(0)=p_0$:

$$
x(t) = p_0 \sin t, \quad p_x(t) = p_0 \cos t
$$

5. **Complete Ray:**
$$
(x(t),y(t)) = (p_0 \sin t, p_y t)
$$

**Geometric Interpretation:** Rays are cycloids in the $(x,y)$-plane, periodic in $x$-direction.

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

2. **Jacobi Field:** $J(t) = \frac{d}{ds}\gamma(t,su)|_{s=0}$

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

### Example 3.6.8: Explicit Viscosity Solution—Distance Function

**Problem:** $|\nabla u| = 1$ in unit disk, $u=0$ on boundary.

**Solution:**

1. **Classical Attempt:**
Characteristics: Straight lines from boundary
Multi-valued: Lines intersect at center
$S(x)$: Distance to boundary becomes negative after crossing

2. **Viscosity Solution:**
$$
u(x) = \min_{y\in\partial B} |x-y| = 1 - |x|
$$

3. **Verification:**
- **Subsolutions test** ($\phi$ touches from above): $|\nabla\phi(x_0)| \leq 1$ ✓
- **Supersolutions test** ($\psi$ touches from below): $|\nabla\psi(x_0)| \geq 1$ ✓

4. **Viscous Approximation:**
$$
-\epsilon\Delta u^\epsilon + |\nabla u^\epsilon| = 1
$$

Convergence: $u^\epsilon \to 1-|x|$ uniformly

### Example 3.6.9: Refractive Index with Caustic

**Problem:** $|\nabla u| = n(x)$ where $n(x,y) = \sqrt{1-x^2}$.

**Solution:**

1. **Rays:** Cycloids $(p_0\sin t, p_y t)$

2. **First Arrival Time:**
$$
T(x,y) = \inf\{t: \exists p_0, p_y \text{ s.t. }(x,y) = (p_0\sin t, p_y t)\}
$$

3. **Solution:** $u(x,y) = \min\{T(x,y)\}$

4. **Explicit Computation for Fixed $y$:**
Solve: $x = p_0\sin t$, $y = p_y t$

Constraint: $p_0^2 + p_y^2 = 1$ (unit speed)

Minimize: $t$ subject to constraints

**Result:** $u(x,y)$ is single-valued envelope of cycloids, automatically selecting physically relevant branch.

### Example 3.6.10: Shock Formation Analogy

**Problem:** Compare hyperbolic conservation laws and geometric optics.

**Comparison Table:**

| Hyperbolic Conservation | Geometric Optics | Viscosity Solution |
|------------------------|------------------|-------------------|
| $u_t + u u_x = 0$ | $|\nabla S|^2 = n^2$ | First arrival time |
| Characteristics cross | Rays focus | Distance function |
| Weak solution multi-valued | Phase multi-valued | Minimum principle |
| Lax entropy | Vanishing viscosity | Selection principle |

**Key Insight:** Both phenomena resolved by selection principle preserving causality.

### Example 3.6.11: Uniform Asymptotics Near Caustic

**Problem:** Simple fold caustic (generic case).

**Solution:**

1. **Ray Coordinates Near Caustic:**
- Before: Single ray, $u \sim a_1 e^{ikS_1}$
- After: Two rays, $u \sim a_2 e^{ikS_2} + a_3 e^{ikS_3}$

2. **Uniform Ansatz:**
$$
u \sim \text{Ai}\left(k^{2/3}\xi\right) e^{ik\phi_0}
$$

Where:
- $\xi = (S_1 - S_2)/k^{1/3}$ (caustic coordinate)
- $\phi_0$ = common phase
- $\text{Ai}(z)$ = Airy function

3. **Matching:**
- $\xi \to -\infty$: $\text{Ai}(\xi) \sim \frac{1}{\sqrt{\pi}(-\xi)^{1/4}} \cos\left(\frac{2}{3}(-\xi)^{3/2} - \frac{\pi}{4}\right)$
- $\xi \to +\infty$: $\text{Ai}(\xi) \sim \frac{1}{2\sqrt{\pi}\xi^{1/4}} e^{-\frac{2}{3}\xi^{3/2}}$

**Result:** Smooth transition through caustic, finite amplitude!

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
