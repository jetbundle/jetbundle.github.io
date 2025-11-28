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

The rigorous functional analysis developed in Chapter 2 provided a robust framework for solving differential equations within Hilbert spaces. That framework, however, relied on the global vector space structure of domains such as $\mathbb{R}^{n}$. Physical theories on curved spaces violate this assumption: vector addition is only local, and partial derivatives must be replaced by coordinate-free constructions. We therefore introduce **smooth manifolds** to capture local Euclidean behavior, and we replace ordinary derivatives with **covariant derivatives** that compare vectors in different tangent spaces. These geometric tools, following Lee (2012) and Spivak (1979), allow us to formulate PDEs invariantly and connect local analysis to global topology.

## Mathematical Content

### Smooth Manifolds and Tangent Spaces

A topological space $M$ is an $n$-dimensional smooth manifold if it is Hausdorff, second-countable, and admits an atlas $\{(U_{lpha},\phi_{lpha})\}$ such that the transition maps $\phi_{eta}\circ\phi_{lpha}^{-1}$ are $C^{\infty}$. The loss of global linear structure necessitates an intrinsic definition of tangent vectors. At $p\in M$, a tangent vector is a derivation $v:C^{\infty}(M)	o\mathbb{R}$ satisfying the Leibniz rule $v(fg)=f(p)v(g)+g(p)v(f)$. The collection $T_{p}M$ is an $n$-dimensional vector space, and the disjoint union $TM=igsqcup_{p\in M}T_{p}M$ inherits a smooth structure of dimension $2n$. Smooth sections $X\in\Gamma(TM)$ are vector fields.

### Tensor Fields and Transformation Laws

A $(k,\ell)$-tensor at $p$ is a multilinear map $T:(T_{p}^{st}M)^{\otimes k}	imes (T_{p}M)^{\otimes \ell}	o\mathbb{R}$. In overlapping charts $(x^{1},\dots,x^{n})$ and $(y^{1},\dots,y^{n})$ the components transform via

$$
T'^{i_{1}\dots i_{k}}_{j_{1}\dots j_{\ell}}=
rac{\partial y^{i_{1}}}{\partial x^{a_{1}}}\cdots rac{\partial y^{i_{k}}}{\partial x^{a_{k}}}
rac{\partial x^{b_{1}}}{\partial y^{j_{1}}}\cdots rac{\partial x^{b_{\ell}}}{\partial y^{j_{\ell}}}
T^{a_{1}\dots a_{k}}_{b_{1}\dots b_{\ell}}.
$$

Tensor equations are therefore coordinate-invariant. Algebraic operations include tensor products $S\otimes T$ and contractions, which lower the total rank by pairing a covariant and contravariant index.

### Covariant Derivatives and Geodesics

Tangent spaces at distinct points are unrelated vector spaces, so partial derivatives cannot compare vectors. An affine connection is a map $
abla:\Gamma(TM)	imes\Gamma(TM)	o\Gamma(TM)$ such that

1. $
abla_{fX}Y=f
abla_{X}Y$ for $f\in C^{\infty}(M)$.
2. $
abla_{X}(Y+Z)=
abla_{X}Y+
abla_{X}Z$ and $
abla_{X}(fY)=(Xf)Y+f
abla_{X}Y$.

The expression $
abla_{X}Y$ measures the change of $Y$ in the direction $X$. A curve $\gamma$ is a **geodesic** if its velocity vector is parallel transported along itself: $
abla_{\dot{\gamma}}\dot{\gamma}=0$.

### Metric Compatibility and Levi-Civita Connection

On a Riemannian manifold $(M,g)$ the metric defines inner products $\langle\cdot,\cdotangle_{p}$ on each $T_{p}M$. A connection is metric-compatible if $X\langle Y,Zangle=\langle
abla_{X}Y,Zangle+\langle Y,
abla_{X}Zangle$, and it is torsion-free if $
abla_{X}Y-
abla_{Y}X=[X,Y]$. The Fundamental Theorem of Riemannian Geometry (do Carmo, 1992) states that there exists a unique connection satisfying both properties: the **Levi-Civita connection**.

### Christoffel Symbols and Laplace-Beltrami Operator

In local coordinates $\{x^{i}\}$ the connection is encoded by Christoffel symbols $\Gamma^{k}_{ij}$ defined by $
abla_{\partial_{i}}\partial_{j}=\Gamma^{k}_{ij}\partial_{k}$. For the Levi-Civita connection,

$$
\Gamma^{k}_{ij}=rac{1}{2}g^{k\ell}\left(\partial_{i}g_{j\ell}+\partial_{j}g_{i\ell}-\partial_{\ell}g_{ij}ight).
$$

The geodesic equation becomes the second-order system

$$
rac{d^{2}x^{k}}{dt^{2}}+\Gamma^{k}_{ij}rac{dx^{i}}{dt}rac{dx^{j}}{dt}=0,
$$

tightly coupling geometry with ODEs. The **Laplace–Beltrami operator** is defined by $\Delta f=\operatorname{div}(\operatorname{grad} f)$, taking the coordinate form

$$
\Delta f=rac{1}{\sqrt{|g|}}\partial_{i}\left(\sqrt{|g|}g^{ij}\partial_{j}fight),
$$

which reduces to the Euclidean Laplacian when $g_{ij}=\delta_{ij}$.

## Connections to Chapter Narrative

Chapter 2 described PDEs through functional-analytic lenses on linear spaces. The manifold formalism introduced here replaces that global linearity with local charts, making derivatives coordinate-free and preparing the groundwork for conservation laws (Section 3.2), Hodge theory (Section 3.4), and gauge-theoretic constructions in later chapters. Christoffel symbols and the Laplace–Beltrami operator connect the geometric language back to the operator-theoretic tools developed earlier, ensuring continuity of the narrative.

## References

* do Carmo, M. P. (1992). *Riemannian Geometry*. Birkhäuser.
* Lee, J. M. (1997). *Riemannian Manifolds: An Introduction to Curvature*. Springer.
* Lee, J. M. (2012). *Introduction to Smooth Manifolds* (2nd ed.). Springer.
* Spivak, M. (1979). *A Comprehensive Introduction to Differential Geometry* (Vol. 1). Publish or Perish.

## Complete Examples

### Example 3.1.1: Atlas Compatibility on the 2-Sphere

**Problem:** Verify that the standard northern and southern stereographic charts on $S^{2}$ define a compatible smooth atlas.

Define $U_{N}=\{(x,y,z)\in S^{2}:z>0\}$ with $\phi_{N}(x,y,z)=(x/(1+z),y/(1+z))$ and $U_{S}=\{z<0\}$ with $\phi_{S}(x,y,z)=(x/(1-z),y/(1-z))$. On the overlap $U_{N}\cap U_{S}$, let $(u,v)=\phi_{N}(p)$. Solving for $(x,y,z)$ yields $x=	frac{2u}{1+u^{2}+v^{2}}$, $y=	frac{2v}{1+u^{2}+v^{2}}$, $z=	frac{1-u^{2}-v^{2}}{1+u^{2}+v^{2}}$. Substituting into $\phi_{S}$ gives $\phi_{S}\circ\phi_{N}^{-1}(u,v)=(u,v)$, which is $C^{\infty}$. Thus the transition maps are smooth, establishing atlas compatibility.

### Example 3.1.2: Tangent Space at the North Pole

**Problem:** Construct a basis for $T_{(0,0,1)}S^{2}$ via derivations and verify the Leibniz rule.

Using spherical coordinates $(	heta,arphi)$, the derivations $X_{	heta}=\partial/\partial	heta$ and $X_{arphi}=\partial/\partialarphi$ evaluated at $(0,0)$ act on smooth functions via directional derivatives. In ambient coordinates these vectors are $X_{	heta}|_{(0,0)}=(0,0,1)	imes(1,0,0)=(0,1,0)$ and $X_{arphi}|_{(0,0)}=(-1,0,0)$. For any $f,g\in C^{\infty}(S^{2})$, $X_{	heta}(fg)=fX_{	heta}(g)+gX_{	heta}(f)$ follows from the product rule in $\mathbb{R}^{3}$, confirming that derivations satisfy the Leibniz identity and span the tangent space.

### Example 3.1.3: Christoffel Symbols on $S^{2}$

**Problem:** Compute the Levi-Civita Christoffel symbols for the round metric $ds^{2}=d	heta^{2}+\sin^{2}	heta\,darphi^{2}$ and verify metric compatibility.

The non-zero metric components are $g_{	heta	heta}=1$ and $g_{arphiarphi}=\sin^{2}	heta$. Applying $\Gamma^{k}_{ij}=	frac{1}{2}g^{k\ell}(\partial_{i}g_{j\ell}+\partial_{j}g_{i\ell}-\partial_{\ell}g_{ij})$ gives $\Gamma^{	heta}_{arphiarphi}=-\sin	heta\cos	heta$ and $\Gamma^{arphi}_{	hetaarphi}=\Gamma^{arphi}_{arphi	heta}=\cot	heta$, with all others zero. The metric-compatibility condition $\partial_{	heta}g_{arphiarphi}=2\langle
abla_{\partial_{	heta}}\partial_{arphi},\partial_{arphi}angle$ is satisfied because $
abla_{\partial_{	heta}}\partial_{arphi}=\cot	heta\,\partial_{arphi}$ and $2\cot	heta g_{arphiarphi}=2\sin	heta\cos	heta$.

### Example 3.1.4: Geodesics on the Sphere

**Problem:** Derive the geodesic equations on $S^{2}$ and show that great circles solve them.

Using the symbols from Example 3.1.3, the geodesic equations become

$$
	heta''-\sin	heta\cos	heta (arphi')^{2}=0,\qquad
arphi''+2\cot	heta\,	heta'arphi'=0.
$$

Equation two implies $rac{d}{dt}(\sin^{2}	heta\,arphi')=0$, so $\sin^{2}	heta\,arphi'=L$ is constant. Substituting into the first equation yields $	heta''-rac{L^{2}\cos	heta}{\sin^{3}	heta}=0$, whose solutions with $	heta(0)=	heta_{0}$ and $	heta'(0)=0$ are great circles satisfying $\sin	heta(t)=\sin	heta_{0}/\cos(t/L)$. These correspond to the intersections of $S^{2}$ with planes through the origin.

### Example 3.1.5: Spherical Pendulum

**Problem:** Model a pendulum constrained to $S^{2}$ of radius $L$ using spherical coordinates and derive the equations of motion.

The Lagrangian is $\mathcal{L}=	frac{1}{2}mL^{2}(	heta'^{2}+\sin^{2}	heta\,arphi'^{2})+mgL\cos	heta$. Euler–Lagrange equations yield $mL^{2}	heta''=mL^{2}\sin	heta\cos	heta\,arphi'^{2}-mgL\sin	heta$ and $rac{d}{dt}(mL^{2}\sin^{2}	heta\,arphi')=0$. These coincide with the geodesic equations plus a potential term $-(g/L)\sin	heta$, showing how curvature and gravity jointly determine the motion.

### Example 3.1.6: Laplace–Beltrami Invariance

**Problem:** Verify that the Laplace–Beltrami operator on $S^{2}$ yields the same eigenvalue for $f(	heta,arphi)=\cos	heta$ in both spherical and stereographic coordinates.

In spherical coordinates, $\Delta f=rac{1}{\sin	heta}\partial_{	heta}(\sin	heta\,\partial_{	heta}\cos	heta)=-2\cos	heta$. In stereographic coordinates $(r,arphi)$ with metric $ds^{2}=rac{4}{(1+r^{2})^{2}}(dr^{2}+r^{2}darphi^{2})$, the operator becomes $\Delta f=	frac{(1+r^{2})^{2}}{4}(\partial_{rr}f+	frac{1}{r}\partial_{r}f+	frac{1}{r^{2}}\partial_{arphiarphi}f)$. Expressing $f=(1-r^{2})/(1+r^{2})$ and differentiating gives the same value $\Delta f=-2\cos	heta$, confirming coordinate invariance.

### Example 3.1.7: Tensor Transformations in Electromagnetism

**Problem:** Show how the electromagnetic field tensor transforms under a Lorentz boost in the $x$-direction.

In Minkowski coordinates, $F_{\mu
u}$ has components encoding electric and magnetic fields. Under a boost with velocity $v$, the Lorentz matrix is $\Lambda^{\mu}_{\,
u}=egin{pmatrix}\gamma & -\gamma v & 0 & 0\ -\gamma v & \gamma & 0 & 0\ 0 & 0 & 1 & 0\ 0 & 0 & 0 & 1\end{pmatrix}$ with $\gamma=(1-v^{2})^{-1/2}$. The transformed tensor satisfies $F'_{lphaeta}=\Lambda^{\mu}_{\,lpha}\Lambda^{
u}_{\,eta}F_{\mu
u}$. Evaluating $F'_{01}$ yields $\gamma^{2}(1+v^{2})E_{x}+\gamma^{2}v(B_{z}-B_{y})$, reproducing the standard electric-field transformation and demonstrating tensorial covariance.

### Example 3.1.8: Holonomy on the Sphere

**Problem:** Compute the parallel transport of a tangent vector around a spherical triangle with vertices at the north pole and two points on the latitude $	heta=\pi/3$ separated by $2\pi/3$ in longitude.

Transporting a vector $v$ along a meridian keeps $v$ fixed because $
abla_{\partial_{	heta}}\partial_{arphi}=0$ at the pole. Along the latitude segment, $
abla_{\partial_{arphi}}\partial_{arphi}=-\sin	heta\cos	heta\,\partial_{	heta}$ induces a rotation toward $-\partial_{	heta}$. Completing the loop yields $v_{	ext{final}}=\cos(2\pi/3)v+\sin(2\pi/3)w$ for some perpendicular $w$, showing the vector rotated by $2\pi/3$, equal to the enclosed solid angle. This holonomy calculation highlights how curvature obstructs global parallelism.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 2.7 Fredholm Theory & Index]({{ '/diffequations/chapter-02/02-7-fredholm-theory/' | relative_url }})
- [Next Section: 3.2 Systems of Conservation Laws & Hyperbolicity]({{ '/diffequations/chapter-03/03-2-conservation-laws/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-03/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
