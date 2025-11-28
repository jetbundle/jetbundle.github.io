---
layout: textbook
title: "Section 3.1: Manifolds, Tensors & Covariant Derivatives"
description: "Intrinsic geometry, parallel transport"
permalink: /diffequations/chapter-03/03-1-manifolds-tensors/
order: 3.1
chapter: 3
section: 1
nav_order: 3.1
is_chapter_index: false
parent_chapter: 3
parent_section: null
---

# Section 3.1: Manifolds, Tensors & Covariant Derivatives

## Introduction

The rigorous functional analysis developed in Chapter 2 provided a robust framework for solving differential equations on Hilbert spaces. That framework relied implicitly on a global affine structure: in $\mathbb{R}^{n}$ we can subtract points, define global derivatives, and integrate along straight lines. Physical theories on curved spaces—general relativity, fluid flow on spheres, gauge theories—violate this assumption. Their configuration spaces possess only local linear structure, so derivatives must be defined via coordinate-free comparisons of nearby tangent spaces. In this section we introduce **smooth manifolds**, **tensors**, and **covariant derivatives**, establishing the geometric toolkit required to write PDEs invariantly. The presentation follows Lee (2012) and Spivak (1979).

## Mathematical Content

### Smooth Manifolds and Tangent Bundles

A topological space $M$ is an $n$-dimensional smooth manifold if it is Hausdorff, second-countable, and covered by charts $\{(U_{\alpha},\phi_{\alpha})\}$ whose transition maps $\phi_{\beta}\circ\phi_{\alpha}^{-1}$ are $C^{\infty}$. The atlas endows $M$ with local Euclidean structure but does not supply a global vector space. Tangent vectors are therefore defined intrinsically: a vector $v\in T_{p}M$ is a derivation $v:C^{\infty}(M)\to \mathbb{R}$ satisfying $v(fg)=f(p)v(g)+g(p)v(f)$. The vector space $T_{p}M$ has dimension $n$, and the disjoint union $TM=\bigsqcup_{p\in M}T_{p}M$ carries a smooth structure of dimension $2n$. Smooth sections $X\in\Gamma(TM)$ are vector fields.

### Tensor Fields and Transformation Laws

A $(k,\ell)$-tensor at $p$ is a multilinear map $T:(T_{p}^{\ast}M)^{\otimes k}\times (T_{p}M)^{\otimes \ell}\to \mathbb{R}$. If $(x^{i})$ and $(y^{i})$ are overlapping charts, tensor components transform via

$$
T'^{i_{1}\dots i_{k}}_{j_{1}\dots j_{\ell}}=
\frac{\partial y^{i_{1}}}{\partial x^{a_{1}}}\cdots \frac{\partial y^{i_{k}}}{\partial x^{a_{k}}}
\frac{\partial x^{b_{1}}}{\partial y^{j_{1}}}\cdots \frac{\partial x^{b_{\ell}}}{\partial y^{j_{\ell}}}
T^{a_{1}\dots a_{k}}_{b_{1}\dots b_{\ell}}.
$$

This Jacobian law ensures coordinate invariance: tensor equations valid in one chart hold in all others. Algebraic operations include tensor products and contractions that raise or lower the total rank.

### Covariant Derivatives and Geodesics

Because $T_{p}M$ and $T_{q}M$ are unrelated for $p\neq q$, partial derivatives cannot compare vectors at different points. An affine connection $\nabla:\Gamma(TM)\times\Gamma(TM)\to\Gamma(TM)$ assigns to $(X,Y)$ the derivative $\nabla_{X}Y$ and satisfies tensorial linearity in $X$, $\mathbb{R}$-linearity in $Y$, and the Leibniz rule $\nabla_{X}(fY)=(Xf)Y+f\nabla_{X}Y$. A curve $\gamma$ is a **geodesic** if its velocity is parallel transported along itself: $\nabla_{\dot{\gamma}}\dot{\gamma}=0$. The exponential map $\exp_{p}:T_{p}M\to M$ sends $v$ to $\gamma(1)$, where $\gamma$ is the unique geodesic with $\gamma(0)=p$ and $\dot{\gamma}(0)=v$.

### Metric Compatibility and the Levi-Civita Connection

On a Riemannian manifold $(M,g)$ the metric provides inner products $\langle\cdot,\cdot\rangle_{p}$ on each $T_{p}M$. A connection is **metric compatible** if $X\langle Y,Z\rangle=\langle\nabla_{X}Y,Z\rangle+\langle Y,\nabla_{X}Z\rangle$, and it is **torsion-free** if $\nabla_{X}Y-\nabla_{Y}X=[X,Y]$. The Fundamental Theorem of Riemannian Geometry (do Carmo, 1992) states that there exists a unique torsion-free, metric-compatible connection: the **Levi-Civita connection**.

### Christoffel Symbols and Laplace–Beltrami Operator

In local coordinates $\{x^{i}\}$, the connection is encoded by Christoffel symbols $\Gamma^{k}_{ij}$ defined through $\nabla_{\partial_{i}}\partial_{j}=\Gamma^{k}_{ij}\partial_{k}$. For the Levi-Civita connection,

$$
\Gamma^{k}_{ij}=\frac{1}{2}g^{k\ell}\left(\partial_{i}g_{j\ell}+\partial_{j}g_{i\ell}-\partial_{\ell}g_{ij}\right).
$$

Substituting these expressions into $\nabla_{\dot{\gamma}}\dot{\gamma}=0$ yields the coordinate geodesic equations

$$
\frac{d^{2}x^{k}}{dt^{2}}+\Gamma^{k}_{ij}\frac{dx^{i}}{dt}\frac{dx^{j}}{dt}=0,
$$

linking geometry to the nonlinear ODE theory of Chapter 1. The metric also determines the Laplace–Beltrami operator on functions,

$$
\Delta f=\frac{1}{\sqrt{|g|}}\partial_{i}\big(\sqrt{|g|}\,g^{ij}\partial_{j}f\big),
$$

which reduces to the Euclidean Laplacian when $g_{ij}=\delta_{ij}$ and encodes curvature corrections otherwise.

## Connections to Chapter Narrative

Chapter 2 analyzed PDEs on linear spaces using spectral theory and variational methods. Chapter 3 replaces the global vector space with local charts, demanding intrinsic differential operators. Manifolds and covariant derivatives let us rewrite conservation laws (Section 3.2), Hodge decompositions (Section 3.4), and gauge theories (Chapter 6) in invariant language. Christoffel symbols and the Laplace–Beltrami operator connect the new geometric formalism back to the operator-theoretic tools already developed, ensuring continuity of the narrative.

## References

* do Carmo, M. P. (1992). *Riemannian Geometry*. Birkhäuser.
* Lee, J. M. (1997). *Riemannian Manifolds: An Introduction to Curvature*. Springer.
* Lee, J. M. (2012). *Introduction to Smooth Manifolds* (2nd ed.). Springer.
* Spivak, M. (1979). *A Comprehensive Introduction to Differential Geometry* (Vol. 1). Publish or Perish.

## Complete Examples

### Example 3.1.1: Atlas Compatibility on $S^{2}$

**Problem:** Verify that the standard northern and southern stereographic charts on $S^{2}$ define a smooth atlas.

Let $U_{N}=\{z>0\}$ with $\phi_{N}(x,y,z)=(x/(1+z),y/(1+z))$ and $U_{S}=\{z<0\}$ with $\phi_{S}(x,y,z)=(x/(1-z),y/(1-z))$. On $U_{N}\cap U_{S}$ a point $p$ has coordinates $(u,v)=\phi_{N}(p)$. Solving for $(x,y,z)$ gives $x=2u/(1+u^{2}+v^{2})$, $y=2v/(1+u^{2}+v^{2})$, and $z=(1-u^{2}-v^{2})/(1+u^{2}+v^{2})$. Substituting into $\phi_{S}$ yields $\phi_{S}\circ\phi_{N}^{-1}(u,v)=(u,v)$, a $C^{\infty}$ transition map, proving compatibility.

### Example 3.1.2: Tangent Space via Derivations

**Problem:** Construct a basis of derivations for $T_{(0,0,1)}S^{2}$ and verify the Leibniz rule.

Using spherical coordinates $(\theta,\varphi)$, define $X_{\theta}=\partial/\partial \theta$ and $X_{\varphi}=\partial/\partial \varphi$. At the north pole, $X_{\theta}=(0,1,0)$ and $X_{\varphi}=(-1,0,0)$ when viewed in $\mathbb{R}^{3}$. For $f,g\in C^{\infty}(S^{2})$, the product rule in $\mathbb{R}^{3}$ implies $X_{\theta}(fg)=fX_{\theta}(g)+gX_{\theta}(f)$, so $\{X_{\theta},X_{\varphi}\}$ forms a derivation basis for $T_{(0,0,1)}S^{2}$.

### Example 3.1.3: Metric Components on $S^{2}$

**Problem:** Compute the metric matrix, its determinant, and its inverse for the round metric $ds^{2}=d\theta^{2}+\sin^{2}\theta\,d\varphi^{2}$.

In $(\theta,\varphi)$ coordinates the non-zero components are $g_{\theta\theta}=1$ and $g_{\varphi\varphi}=\sin^{2}\theta$. Thus

$$
g=\begin{pmatrix}1&0\\0&\sin^{2}\theta\end{pmatrix},\qquad g^{-1}=\begin{pmatrix}1&0\\0&\csc^{2}\theta\end{pmatrix},\qquad |g|=\sin^{2}\theta.
$$

These ingredients feed directly into the Laplace–Beltrami formula and into the computation of Christoffel symbols.

### Example 3.1.4: Levi-Civita Symbols on the Sphere

**Problem:** Compute the non-zero Christoffel symbols of the Levi-Civita connection for the round metric on $S^{2}$ and verify metric compatibility.

Applying $\Gamma^{k}_{ij}=\tfrac{1}{2}g^{k\ell}(\partial_{i}g_{j\ell}+\partial_{j}g_{i\ell}-\partial_{\ell}g_{ij})$ yields $\Gamma^{\theta}_{\varphi\varphi}=-\sin\theta\cos\theta$ and $\Gamma^{\varphi}_{\theta\varphi}=\Gamma^{\varphi}_{\varphi\theta}=\cot\theta$. Metric compatibility demands $\partial_{\theta}g_{\varphi\varphi}=2\langle\nabla_{\partial_{\theta}}\partial_{\varphi},\partial_{\varphi}\rangle$, which holds because $\nabla_{\partial_{\theta}}\partial_{\varphi}=\cot\theta\,\partial_{\varphi}$ and $2\cot\theta\,g_{\varphi\varphi}=2\sin\theta\cos\theta$.

### Example 3.1.5: Great-Circle Geodesics

**Problem:** Derive the geodesic equations on $S^{2}$ and show that great circles solve them.

Using the symbols from Example 3.1.4, the equations become

$$
\theta''-\sin\theta\cos\theta\,(\varphi')^{2}=0,\qquad
\varphi''+2\cot\theta\,\theta'\varphi'=0.
$$

Equation two integrates to $\sin^{2}\theta\,\varphi'=L$ (conservation of angular momentum). Substituting into the first equation yields $\theta''-L^{2}\cos\theta/\sin^{3}\theta=0$. Solutions with $\theta'(0)=0$ and $\varphi'(0)\neq 0$ satisfy $\sin\theta(t)=\sin\theta_{0}/\cos(t/L)$, describing the intersections of $S^{2}$ with planes through the origin—great circles.

### Example 3.1.6: Spherical Pendulum Dynamics

**Problem:** Model a pendulum constrained to $S^{2}$ of radius $L$ using spherical coordinates and derive the equations of motion.

The Lagrangian is $\mathcal{L}=\tfrac{1}{2}mL^{2}(\theta'^{2}+\sin^{2}\theta\,\varphi'^{2})+mgL\cos\theta$. Euler–Lagrange equations give $mL^{2}\theta''=mL^{2}\sin\theta\cos\theta\,\varphi'^{2}-mgL\sin\theta$ and $\tfrac{d}{dt}(mL^{2}\sin^{2}\theta\,\varphi')=0$. These coincide with the geodesic equations perturbed by the gravitational term $-(g/L)\sin\theta$, illustrating how curvature and external forces combine in mechanical systems.

### Example 3.1.7: Laplace–Beltrami Invariance

**Problem:** Verify that $f(\theta,\varphi)=\cos\theta$ is an eigenfunction of the Laplace–Beltrami operator on $S^{2}$ in both spherical and stereographic coordinates.

In spherical coordinates, $\Delta f=\tfrac{1}{\sin\theta}\partial_{\theta}(\sin\theta\,\partial_{\theta}\cos\theta)=-2\cos\theta$. In stereographic coordinates $(r,\varphi)$ where $ds^{2}=\tfrac{4}{(1+r^{2})^{2}}(dr^{2}+r^{2}d\varphi^{2})$, the operator becomes $\Delta f=\tfrac{(1+r^{2})^{2}}{4}(\partial_{rr}f+\tfrac{1}{r}\partial_{r}f+\tfrac{1}{r^{2}}\partial_{\varphi\varphi}f)$. Writing $f=(1-r^{2})/(1+r^{2})$ leads to the same value $\Delta f=-2\cos\theta$, confirming coordinate invariance.

### Example 3.1.8: Holonomy on the Sphere

**Problem:** Compute the parallel transport of a tangent vector around a spherical triangle with vertices at the north pole and two points on the latitude $\theta=\pi/3$ separated by $2\pi/3$ in longitude.

Start with $v=\partial_{\varphi}$ at the pole. Transport along a meridian leaves $v$ unchanged because $\nabla_{\partial_{\theta}}\partial_{\varphi}=0$ there. Along the latitude segment, $\nabla_{\partial_{\varphi}}\partial_{\varphi}=-\sin\theta\cos\theta\,\partial_{\theta}$ rotates $v$ toward $-\partial_{\theta}$. Completing the loop produces $v_{\text{final}}=\cos(2\pi/3)\,\partial_{\varphi}+\sin(2\pi/3)\,\partial_{\theta}$, evidencing a $2\pi/3$ rotation equal to the enclosed solid angle. This holonomy calculation shows how curvature obstructs global parallelism and motivates the curvature tensors studied later.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 2.7 Fredholm Theory & Index]({{ '/diffequations/chapter-02/02-7-fredholm-theory/' | relative_url }})
- [Next Section: 3.2 Systems of Conservation Laws & Hyperbolicity]({{ '/diffequations/chapter-03/03-2-conservation-laws/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-03/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
