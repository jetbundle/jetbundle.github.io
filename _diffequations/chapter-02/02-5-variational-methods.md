---
layout: textbook
title: "Section 2.5: Variational Methods & Lax-Milgram"
description: "Energy minimization, existence machine"
permalink: /diffequations/chapter-02/02-5-variational-methods/
order: 2.5
chapter: 2
section: 5
nav_order: 2.5
is_chapter_index: false
parent_chapter: 2
parent_section: null
---

# Section 2.5: Variational Methods & Lax-Milgram

## Introduction

We reframe PDE solving as energy minimization. The **Lax-Milgram Theorem** provides a robust "existence machine" for solving $Lu=f$ by proving the coercivity of the associated bilinear form. We prove **Weyl's Lemma**, showing that abstract weak solutions to elliptic problems are actually smooth classical solutions.
## Mathematical Content

### Variational Formulation

For the Poisson problem
$$
\begin{cases}
-\Delta u = f & \text{in }\Omega,\\
u=0 & \text{on }\partial\Omega,
\end{cases}
$$
multiply by a test function $v\in C_{c}^{\infty}(\Omega)$ and integrate:
$$
\int_{\Omega} \nabla u\cdot \nabla v\,dx = \int_{\Omega} f v\,dx.
$$
This identity extends to $u,v\in H_{0}^{1}(\Omega)$. Define
$$
a(u,v)=\int_{\Omega}\nabla u\cdot \nabla v\,dx,\qquad F(v)=\int_{\Omega} f v\,dx.
$$
The variational problem seeks $u\in H_{0}^{1}(\Omega)$ such that $a(u,v)=F(v)$ for all $v\in H_{0}^{1}(\Omega)$. When $a$ is symmetric, $u$ minimizes the energy functional $J(u)=\frac{1}{2}a(u,u)-F(u)$.

### Lax–Milgram Theorem

Let $H$ be a Hilbert space, $a:H\times H\to \mathbb{R}$ bilinear, and $F:H\to \mathbb{R}$ linear continuous. If $a$ is bounded ($|a(u,v)|\le \beta\|u\|_{H}\|v\|_{H}$) and coercive ($a(u,u)\ge \alpha \|u\|_{H}^{2}$) for some $\alpha,\beta>0$, then there exists a unique $u\in H$ with $a(u,v)=F(v)$ for all $v\in H$. This theorem converts PDE solvability into verifying continuity and coercivity of the associated form.

In the Poisson case, boundedness follows from Cauchy–Schwarz, and coercivity from Poincaré’s inequality on $H_{0}^{1}(\Omega)$, ensuring a unique weak solution.

### Regularity and Weyl’s Lemma

Weak solutions gain additional smoothness under elliptic regularity. Weyl’s lemma states that if $\Delta u=0$ in distributions, then $u$ is smooth. More generally, if $-\Delta u=f$ with $f\in L^{2}(\Omega)$, then $u\in H^{2}(\Omega)$. Difference quotient methods show $u''$ exists in $L^{2}$; iterating yields $u\in H^{k+2}$ whenever $f\in H^{k}$, and Sobolev embeddings translate $H^{k}$ regularity to classical $C^{m}$ regularity for $k>n/2+m$.

### Applications

1. **Linear elasticity:** The displacement $\mathbf{u}$ minimizes elastic energy. The bilinear form involves the strain tensor $\varepsilon(\mathbf{u})$; Korn’s inequality provides coercivity.
2. **Reaction-diffusion:** Bilinear forms of the type $\int (\nabla u\cdot \nabla v + c uv)$ remain coercive if $c\ge 0$; negative lower-order terms require spectral analysis.
3. **Eigenvalue problems:** Minimizing the Rayleigh quotient $\dfrac{\int |\nabla u|^{2}}{\int |u|^{2}}$ yields eigenpairs of $-\Delta$.

These examples illustrate how variational methods provide existence, uniqueness, and qualitative properties of solutions.

## Complete Examples

### Example 2.5.1: Poisson Equation on $(0,1)$

**Problem:** Solve $-u''=2$ with $u(0)=u(1)=0$.

Weak formulation: find $u\in H_{0}^{1}(0,1)$ such that $\int_{0}^{1} u'v'=\int_{0}^{1} 2v$ for all $v$. Poincaré inequality ensures coercivity. The classical solution $u(x)=x^{2}-x$ satisfies the weak form and minimizes $J(u)=\frac{1}{2}\int |u'|^{2}-\int 2u$.

### Example 2.5.2: Galerkin Approximation

Approximate $u$ using hat functions $\{\phi_{j}\}_{j=1}^{N-1}$ with $\phi_{j}(x_{i})=\delta_{ij}$, $x_{j}=j/N$. Solve $A\mathbf{c}=\mathbf{b}$ where $A_{ij}=\int \phi_{i}'\phi_{j}'$, $b_{j}=\int 2\phi_{j}$. For $N=2$, $A=(4)$, $b=(1/2)$, giving $c_{1}=1/8$. The approximation $u_{2}$ converges in $H^{1}$ as $N\to\infty$.

### Example 2.5.3: Lax–Milgram on the Unit Disk

For $-\Delta u=1$ in $B_{1}(0)$ with $u=0$ on $\partial B_{1}$, $a(u,v)=\int \nabla u\cdot\nabla v$ is bounded and coercive on $H_{0}^{1}(B_{1})$. $F(v)=\int v$ is continuous. Lax–Milgram yields a unique weak solution, which by symmetry is $u(r)=(1-r^{2})/4$.

### Example 2.5.4: Reaction–Diffusion

Consider $-\Delta u+c(x)u=f$ with $c\ge 0$. Then $a(u,u)=\int |\nabla u|^{2}+c|u|^{2}\ge \int |\nabla u|^{2}$, ensuring coercivity. If $c(x)=-\pi^{2}$, coercivity fails; solutions exist only when $f$ is orthogonal to $\sin(\pi x)$, illustrating the Fredholm alternative.

### Example 2.5.5: Weyl’s Lemma via Difference Quotients

Let $u\in H^{1}_{\text{loc}}(\mathbb{R}^{n})$ satisfy $-\Delta u=f\in L^{2}_{\text{loc}}$. Using difference quotients $\tau_{h}u(x)=\frac{u(x+h)-u(x)}{h}$ as test functions shows $\tau_{h}u'$ is bounded in $L^{2}$, implying $u\in H^{2}_{\text{loc}}$. Repeating yields higher regularity when $f$ is smoother.

### Example 2.5.6: Linear Elasticity

For $\mathbf{u}\in [H_{0}^{1}(\Omega)]^{2}$, the Lamé system has variational form
$$
a(\mathbf{u},\mathbf{v})=\int_{\Omega}\left(2\mu\,\varepsilon(\mathbf{u}):\varepsilon(\mathbf{v})+\lambda (\nabla\cdot\mathbf{u})(\nabla\cdot\mathbf{v})\right)dx.
$$
Korn’s inequality provides $a(\mathbf{u},\mathbf{u})\ge C\|\mathbf{u}\|_{H^{1}}^{2}$, leading to existence and uniqueness.

### Example 2.5.7: Eigenvalue Problem

Minimize $R[u]=\dfrac{\int |\nabla u|^{2}}{\int |u|^{2}}$ over $H_{0}^{1}(0,1)$ to find eigenpairs of $-\frac{d^{2}}{dx^{2}}$. The minimizer is $u(x)=\sin(\pi x)$ with eigenvalue $\lambda_{1}=\pi^{2}$. Higher modes $\sin(n\pi x)$ yield $\lambda_{n}=n^{2}\pi^{2}$.

### Example 2.5.8: Mixed Boundary Problem

For $-\Delta u=1$ on $(0,1)^{2}$ with Dirichlet conditions on $y=0,1$ and Neumann on $x=0,1$, set $V=\{u\in H^{1} : u(x,0)=u(x,1)=0\}$. The bilinear form $a(u,v)=\int \nabla u\cdot \nabla v$ is coercive on $V$. Expanding in $\sin(m\pi y)\cos(nx)$ bases satisfies the mixed boundary conditions and converges to the exact solution.

## References

* Brezis, H. (2011). *Functional Analysis, Sobolev Spaces and Partial Differential Equations*. Springer.
* Ciarlet, P. G. (1988). *Mathematical Elasticity, Vol. 1: Three-Dimensional Elasticity*. North-Holland.
* Evans, L. C. (2010). *Partial Differential Equations*. American Mathematical Society.
* Gilbarg, D., & Trudinger, N. S. (2001). *Elliptic Partial Differential Equations of Second Order*. Springer.
* Monk, P. (2003). *Finite Element Methods for Maxwell's Equations*. Oxford University Press.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 2.4 Unbounded Operators, Resolvents & Semigroups]({{ '/diffequations/chapter-02/02-4-unbounded-operators/' | relative_url }})
- [Next Section: 2.6 Galerkin Methods & Finite Elements]({{ '/diffequations/chapter-02/02-6-galerkin-methods/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-02/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
