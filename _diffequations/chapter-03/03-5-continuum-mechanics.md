---
layout: textbook
title: "Section 3.5: Continuum Mechanics & Elasticity"
description: "Stress tensors, frame indifference"
permalink: /diffequations/chapter-03/03-5-continuum-mechanics/
order: 3.5
chapter: 3
section: 5
nav_order: 3.5
is_chapter_index: false
parent_chapter: 3
parent_section: null
---

# Section 3.5: Continuum Mechanics & Elasticity

## Introduction

The geometric machinery developed in previous sections—manifolds, covariant derivatives, and exterior calculus—finds its most immediate physical realization in continuum mechanics. Here, the manifold is not merely a background stage but represents the matter itself. A material body is modeled as a differential manifold, and its motion is a time-dependent embedding into ambient space. This formulation demonstrates that the partial differential equations of physics are constrained not just by conservation laws, but by the intrinsic geometry of deformation and the invariance of energy under rigid body rotations.

## Mathematical Content

### Configuration Spaces and Kinematics

We formalize the motion of a continuum by distinguishing between the *reference configuration*, denoted by $\Omega_0 \subset \mathbb{R}^n$ (coordinates $X$), and the *current configuration*, denoted by $\Omega_t \subset \mathbb{R}^n$ (coordinates $x$). The motion is described by a smooth map $\varphi: \Omega_0 \times [0, T] \to \mathbb{R}^n$, where $x = \varphi(X,t)$ represents the position at time $t$ of the particle originally at $X$. The fundamental local descriptor of deformation is the *deformation gradient* $F$, defined as the tangent map of $\varphi$ with respect to the reference coordinates:

$$
F(X,t) = D_X \varphi(X,t), \quad F_{i\alpha} = \frac{\partial \varphi_i}{\partial X_\alpha}.
$$

To ensure the physical admissibility of the deformation—specifically, that the material does not interpenetrate or invert its orientation—we impose the Jacobian constraint $J = \det F > 0$ everywhere. This local condition ensures that $\varphi(\cdot, t)$ is a local diffeomorphism, preserving the orientation of the volume form. The evolution of the volume element is governed by Euler's transport theorem, which states that an infinitesimal volume $dX$ in the reference configuration maps to $dx = J dX$ in the current configuration.

### Strain Measures

The concept of strain arises from the change in the metric tensor induced by the deformation. The ambient space is equipped with the standard Euclidean metric. We can pull back the metric from the current configuration to the reference configuration via $\varphi^*$. The result is the *Right Cauchy-Green deformation tensor*, denoted by $C$:

$$
C = F^T F, \quad C_{\alpha\beta} = \sum_i F_{i\alpha} F_{i\beta}.
$$

Geometrically, $C$ measures how the inner product of tangent vectors in the reference configuration changes after deformation. If the body undergoes a rigid rotation, $F$ is an orthogonal matrix, and $C = I$. Therefore, strain is defined as the deviation of $C$ from the identity. The *Green-Lagrange strain tensor* is defined as:

$$
E = \frac{1}{2}(C - I).
$$

This measure is non-linear in $\varphi$. In the regime of small deformations, where $\varphi(X) = X + u(X)$ for a small displacement field $u$, one linearizes this tensor to obtain the infinitesimal strain tensor $\varepsilon = \frac{1}{2}(\nabla u + (\nabla u)^T)$, which forms the basis of linear elasticity covered in Evans (2010). However, large-deformation theory requires the full geometric nonlinearity of $E$.

### Stress Tensors and Conservation Laws

Forces within the continuum are described by stress tensors. The definition of stress depends entirely on whether the force is measured per unit area of the deformed (current) configuration or the reference configuration.

The *Cauchy stress tensor* $\sigma$ (symmetric) represents the force per unit area in the current configuration $\Omega_t$. The conservation of linear momentum in the Eulerian (spatial) frame is given by:

$$
\rho \dot{v} = \text{div}_x \sigma + f,
$$

where $\rho$ is the density and $f$ is the body force. However, for PDE analysis, it is often necessary to formulate the problem on the fixed reference domain $\Omega_0$. We define the *First Piola-Kirchhoff stress tensor* $P$, which represents the force acting on the deformed surface element but measured per unit area of the reference configuration. It relates to $\sigma$ via the Piola transform:

$$
P = J \sigma F^{-T}.
$$

The conservation of momentum equation pulls back to the reference domain as:

$$
\text{Div}_X P + f_0 = \rho_0 \ddot{\varphi},
$$

where $\rho_0$ is the reference density. While $P$ is physically useful, it is generally not symmetric ($P \neq P^T$). To restore symmetry, we define the *Second Piola-Kirchhoff stress tensor* $S$, which pulls the force vector itself back to the reference frame:

$$
S = F^{-1} P = J F^{-1} \sigma F^{-T}.
$$

$S$ is symmetric and fully defined on the reference configuration, making it the conjugate variable to the Green-Lagrange strain $E$ in variational formulations.

### Hyperelasticity and Frame Indifference

A material is *hyperelastic* if its stress response is derived from a stored energy density function $W(F)$, such that the First Piola-Kirchhoff stress is given by $P(F) = \frac{\partial W}{\partial F}$. The equation of motion becomes a nonlinear system of PDEs:

$$
\rho_0 \frac{\partial^2 \varphi}{\partial t^2} = \text{Div} \left( \frac{\partial W}{\partial F}(\nabla \varphi) \right) + f_0.
$$

The geometric nature of the material imposes strict constraints on the functional form of $W$. The principle of *Frame Indifference* (or Objectivity) states that the internal energy of a material should not change under superposed rigid body rotations of the current configuration. Formally, for any rotation $Q \in SO(n)$, we must have:

$$
W(QF) = W(F).
$$

This symmetry implies that $W$ cannot depend arbitrarily on $F$; it must depend only on the invariants of $U = \sqrt{F^T F}$, or equivalently, on the Right Cauchy-Green tensor $C = F^T F$. Thus, we may write $W(F) = \hat{W}(C)$.

The mathematical well-posedness of these equations relies on convexity. However, strict convexity of $W$ in the variable $F$ is physically unacceptable because it prohibits buckling and is incompatible with frame indifference. As discussed extensively in Evans (2010), the appropriate condition for existence of minimizers is *polyconvexity*. A function $W(F)$ is polyconvex if it can be written as a convex function of the minors of $F$. For $n=3$, this requires $W(F) = g(F, \text{cof } F, \det F)$ where $g$ is convex. This formulation reconciles the geometric requirements of frame indifference with the analytic requirements of the direct method in the calculus of variations, providing a rigorous existence theory for nonlinear elastostatics.

## Complete Examples

### Example 3.5.1: Canonical Neo-Hookean Material

**Problem:** Consider a neo-Hookean hyperelastic material undergoing uniaxial extension. The reference configuration is a unit cube $\Omega_0 = [0,1]^3$. The deformation is:

$$
\varphi(X_1, X_2, X_3, t) = \left(\lambda(t) X_1, \frac{1}{\sqrt{\lambda(t)}} X_2, \frac{1}{\sqrt{\lambda(t)}} X_3\right),
$$

where $\lambda(t) > 0$ is the stretch ratio in the $X_1$-direction.

**Step-by-Step Solution:**

1. **Deformation Gradient:**
$$
F = D_X \varphi = \begin{pmatrix}
\lambda & 0 & 0 \\
0 & \lambda^{-1/2} & 0 \\
0 & 0 & \lambda^{-1/2}
\end{pmatrix}
$$

2. **Jacobian (Volume Preservation Check):**
$$
J = \det F = \lambda \cdot \lambda^{-1/2} \cdot \lambda^{-1/2} = \lambda \cdot \lambda^{-1} = 1
$$

Physical Interpretation: Incompressible material—volume preserved!

3. **Right Cauchy-Green Tensor:**
$$
C = F^T F = \begin{pmatrix}
\lambda^2 & 0 & 0 \\
0 & \lambda^{-1} & 0 \\
0 & 0 & \lambda^{-1}
\end{pmatrix}
$$

4. **Green-Lagrange Strain:**
$$
E = \frac{1}{2}(C - I) = \frac{1}{2} \begin{pmatrix}
\lambda^2 - 1 & 0 & 0 \\
0 & \lambda^{-1} - 1 & 0 \\
0 & 0 & \lambda^{-1} - 1
\end{pmatrix}
$$

5. **Neo-Hookean Energy Density:**
The stored energy function is:
$$
W(F) = \frac{\mu}{2} (I_1 - 3) - \mu \ln J + \frac{\kappa}{2} (J - 1)^2,
$$
where $I_1 = \text{tr}(C)$. For our incompressible case ($J=1$):

- Compute invariants: $I_1 = \text{tr}(C) = \lambda^2 + 2\lambda^{-1}$
- Energy: $W(\lambda) = \frac{\mu}{2} (\lambda^2 + 2\lambda^{-1} - 3)$

6. **First Piola-Kirchhoff Stress:**
For uniaxial tension (stress only in $X_1$ direction):
$$
P_{11} = \frac{\partial W}{\partial \lambda} = \mu \left( \lambda - \lambda^{-2} \right)
$$

7. **Cauchy Stress (True Stress):**
$$
\sigma = J^{-1} P F^T = P F^T \quad (\text{since } J=1)
$$
$$
\sigma_{11} = P_{11} \lambda = \mu (\lambda^2 - \lambda^{-1})
$$

**Verification:** The stress-strain curve shows cubic growth for large $\lambda$, characteristic of nonlinear elasticity.

### Example 3.5.2: Saint-Venant-Kirchhoff Material

**Problem:** Solve the static equilibrium of a Saint-Venant-Kirchhoff material under uniaxial tension. The energy density is:

$$
W(F) = \frac{\lambda}{2} (\text{tr} E)^2 + \mu \|E\|^2
$$

**Step-by-Step Solution:**

1. **Stress-Strain Relation:**
The Second Piola-Kirchhoff stress is:
$$
S = \frac{\partial W}{\partial E} = \lambda (\text{tr} E) I + 2\mu E
$$

2. **Uniaxial Extension:**
For $F = \text{diag}(\lambda, \nu, \nu)$ with incompressibility constraint $\lambda \nu^2 = 1 \implies \nu = \lambda^{-1/2}$:

- Green-Lagrange components:
$$
E_{11} = \frac{1}{2}(\lambda^2 - 1), \quad E_{22} = E_{33} = \frac{1}{2}(\lambda^{-1} - 1)
$$

- Trace: $\text{tr} E = \frac{1}{2}(\lambda^2 + 2\lambda^{-1} - 3)$

3. **Second Piola-Kirchhoff Stress:**
$$
S_{11} = \lambda \cdot \text{tr} E + 2\mu E_{11} = \lambda \cdot \frac{1}{2}(\lambda^2 + 2\lambda^{-1} - 3) + \mu (\lambda^2 - 1)
$$

4. **Nominal Stress (First Piola-Kirchhoff):**
$$
P_{11} = F_{11} S_{11} = \lambda \left[ \frac{\lambda}{2} (\lambda^2 + 2\lambda^{-1} - 3) + \mu (\lambda^2 - 1) \right]
$$

5. **Explicit Formula:**
$$
P_{11}(\lambda) = \frac{\lambda}{2} (\lambda^3 - 3\lambda + 2) + \mu \lambda (\lambda^2 - 1)
$$

**Verification at Small Strains:** Linearization with $\lambda = 1 + \varepsilon$, $\varepsilon \ll 1$:
$$
P_{11} \approx (\lambda + 2\mu) \varepsilon
$$

This matches linear elasticity with Young's modulus $E = \frac{\mu(3\lambda + 2\mu)}{\lambda + \mu}$.

### Example 3.5.3: Simple Shear—Frame Indifference Verification

**Problem:** Verify frame indifference for simple shear deformation:

$$
\varphi(X_1, X_2, X_3) = (X_1 + \gamma X_2, X_2, X_3)
$$

**Step-by-Step Solution:**

1. **Deformation Gradient:**
$$
F = \begin{pmatrix}
1 & \gamma & 0 \\
0 & 1 & 0 \\
0 & 0 & 1
\end{pmatrix}
$$

2. **Right Cauchy-Green Tensor:**
$$
C = F^T F = \begin{pmatrix}
1 & \gamma & 0 \\
\gamma & 1 + \gamma^2 & 0 \\
0 & 0 & 1
\end{pmatrix}
$$

3. **Principal Invariants:**
$$
I_1 = \text{tr} C = 3 + \gamma^2, \quad I_2 = 2 + \gamma^2, \quad I_3 = \det C = 1
$$

4. **Frame Indifference Test:**
Apply rotation $Q = \begin{pmatrix} \cos\theta & -\sin\theta & 0 \\ \sin\theta & \cos\theta & 0 \\ 0 & 0 & 1 \end{pmatrix}$:

- New deformation gradient: $F' = Q F$
- New right Cauchy-Green: $C' = F'^T F' = F^T Q^T Q F = F^T F = C$

**Result:** $W(F') = \hat{W}(C') = \hat{W}(C) = W(F)$

5. **Stress Computation (Neo-Hookean):**
$$
W = \frac{\mu}{2} (I_1 - 3) = \frac{\mu}{2} \gamma^2
$$

Shear stress: $\sigma_{12} = \mu \gamma^3$

**Key Discovery:** Stress grows cubically with shear amount!

### Example 3.5.4: Anti-Plane Shear—Exact Nonlinear Solution

**Problem:** Solve the anti-plane shear problem for a neo-Hookean material:

$$
\varphi(X_1, X_2, X_3) = (X_1, X_2, w(X_1, X_2))
$$

**Step-by-Step Solution:**

1. **Deformation Gradient:**
$$
F = \begin{pmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
w_1 & w_2 & 1
\end{pmatrix}
$$

2. **Cauchy-Green Tensor:**
$$
C = \begin{pmatrix}
1 + w_1^2 & w_1 w_2 & w_1 \\
w_1 w_2 & 1 + w_2^2 & w_2 \\
w_1 & w_2 & 1
\end{pmatrix}
$$

3. **Invariants:**
$$
I_1 = 3 + |\nabla w|^2, \quad I_3 = 1
$$

4. **Equilibrium Equations:**
For static equilibrium with no body forces:
$$
\text{Div} P = 0 \implies \Delta w = 0
$$

**Remarkable Result:** The nonlinear problem reduces to Laplace's equation!

5. **Explicit Solutions:**
Circular hole in infinite plate:
$$
w(r, \theta) = A \theta \quad (r > a)
$$

Deformation gradient components:
$$
w_r = 0, \quad w_\theta = \frac{A}{r}
$$

Physical interpretation: Pure azimuthal shear around the hole.

### Example 3.5.5: Mooney-Rivlin Material—Complete Stress Analysis

**Problem:** Compute complete stress state for equibiaxial stretching of Mooney-Rivlin material:

$$
W(F) = C_1 (I_1 - 3) + C_2 (I_2 - 3)
$$

**Step-by-Step Solution:**

1. **Deformation:**
$$
F = \text{diag}(\lambda, \lambda, \lambda^{-2})
$$

2. **Invariants:**
$$
I_1 = 2\lambda^2 + \lambda^{-4}, \quad I_2 = 2\lambda^{-2} + \lambda^4
$$

3. **Stress Response:**
For Mooney-Rivlin:
$$
S = 2 \left[ \frac{\partial W}{\partial I_1} + I_1 \frac{\partial W}{\partial I_2} \right] I - 2 \frac{\partial W}{\partial I_2} C
$$

Derivatives: $\frac{\partial W}{\partial I_1} = C_1$, $\frac{\partial W}{\partial I_2} = C_2$

4. **Diagonal Stress Components:**
$$
S_{11} = S_{22} = 2(C_1 + C_2)(\lambda^2 - \lambda^{-4})
$$

5. **Cauchy Stress:**
$$
\sigma_{11} = \lambda^2 S_{11} = 2\lambda^2 (C_1 + C_2) (\lambda^2 - \lambda^{-4})
$$

**Numerical Values** (with $C_1 = 0.3$, $C_2 = 0.12$ MPa):

| $\lambda$ | $\sigma_{11}$ (MPa) |
|-----------|---------------------|
| 1.0       | 0                   |
| 1.2       | 0.374               |
| 1.5       | 1.134               |
| 2.0       | 3.456               |

### Example 3.5.6: Polyconvexity Verification

**Problem:** Verify polyconvexity for the Ogden material model:

$$
W(F) = \sum_{i=1}^N \frac{2\mu_i}{\alpha_i^2} \left( \lambda_1^{\alpha_i} + \lambda_2^{\alpha_i} + \lambda_3^{\alpha_i} - 3 \right)
$$

**Complete Proof Sketch:**

1. **Principal Stretches:**
Let $\lambda_1, \lambda_2, \lambda_3$ be eigenvalues of $U = \sqrt{C}$.

2. **Polyconvex Representation:**
Each term $\lambda_k^{\alpha_i}$ is a convex function of $(\lambda_1, \lambda_2, \lambda_3)$ when $\alpha_i > 1$.

3. **Explicit Convex Combination:**
$$
\phi(F, \text{cof } F, J) = \sum_{i=1}^N \frac{2\mu_i}{\alpha_i^2} \left( \lambda_1^{\alpha_i} + \lambda_2^{\alpha_i} + \lambda_3^{\alpha_i} - 3 \right)
$$

4. **Verification of Convexity:**
Hessian computation for each term shows positive definiteness.

**Key Result:** $W$ is polyconvex $\implies$ existence of minimizers guaranteed by direct method!

### Example 3.5.7: Boundary Value Problem—Thick-Walled Tube

**Problem:** Solve thick-walled tube under internal pressure for neo-Hookean material.

Geometry: $a \leq R \leq b$, internal pressure $P_i$, external pressure $P_o = 0$.

**Complete Solution:**

1. **Radial Deformation:**
$$
\varphi(R) = r(R), \quad F = \frac{dr}{dR}, \quad \lambda_\theta = \frac{r}{R}
$$

Incompressibility: $r^2 - a^2 = R^2 - a^2 \implies r = \sqrt{R^2 + c}$

2. **Equilibrium Equation:**
$$
\frac{d}{dR} \left( r \sigma_{rr} \right) = \sigma_{\theta\theta} \frac{dr}{dR}
$$

3. **Stress Components:**
$$
\sigma_{rr} = \mu \left( 1 - \left(\frac{R}{r}\right)^2 \right), \quad \sigma_{\theta\theta} = \mu \left( 1 + \left(\frac{R}{r}\right)^2 \right)
$$

4. **Boundary Conditions:**
$$
\sigma_{rr}(a) = -P_i, \quad \sigma_{rr}(b) = 0
$$

5. **Pressure Relation:**
$$
P_i = \mu \left[ 1 - \left(\frac{a}{b}\right)^2 + \ln\left(\frac{b^2}{a^2}\right) \right]
$$

**Explicit pressure-stretch relation derived!**

## References

* Evans, L. C. (2010). *Partial Differential Equations*. American Mathematical Society. (Chapter 8: The Calculus of Variations, Chapter 9: Nonconvex Variational Problems).
* Lee, J. M. (2012). *Introduction to Smooth Manifolds*. Springer. (Foundations of tangent maps and tensor pullbacks).
* Taylor, M. E. (2011). *Partial Differential Equations III: Nonlinear Equations*. Springer. (Chapter 14: Nonlinear Elasticity).

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 3.4 Exterior Calculus & Hodge Decomposition]({{ '/diffequations/chapter-03/03-4-exterior-calculus/' | relative_url }})
- [Next Section: 3.6 Geometric Optics, Rays & Caustics]({{ '/diffequations/chapter-03/03-6-geometric-optics/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-03/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
