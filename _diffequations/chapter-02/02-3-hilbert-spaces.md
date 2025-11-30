---
layout: textbook
title: "Section 2.3: Hilbert Space Theory & Spectral Theorem"
description: "Infinite-dimensional geometry, spectral theorem"
permalink: /diffequations/chapter-02/02-3-hilbert-spaces/
order: 2.3
chapter: 2
section: 3
nav_order: 2.3
is_chapter_index: false
parent_chapter: 2
parent_section: null
---

Infinite-dimensional Euclidean geometry: functions become vectors, orthogonality becomes Fourier analysis, and compact operators diagonalize into eigenfunction expansions that rigorously justify separation of variables.

## Introduction

We visualize functions as vectors in an infinite-dimensional Euclidean space. We develop the geometry of **Hilbert Space** (orthogonality, projection). The central result is the **Spectral Theorem for Compact Self-Adjoint Operators**, which provides the rigorous justification for the "separation of variables" and series expansions employed heuristically in Chapter 1.4.

## Hilbert Space Geometry

A Hilbert space $H$ is a complete inner-product space. The inner product induces the norm $\|u\|=\sqrt{\langle u,u\rangle}$ and the notion of orthogonality. The canonical example is $L^{2}(\Omega)$ with $\langle f,g\rangle = \int_{\Omega} f \overline{g}\,dx$.

The **Riesz Representation Theorem** states that every continuous linear functional $\phi\in H^{*}$ is uniquely represented by an element $f\in H$ such that $\phi(u)=\langle u,f\rangle$ for all $u\in H$. This self-duality underpins variational methods.

**Riesz Representation on $L^{2}[0,2\pi]$**

Find the representing vector for $\phi(u)=\int_{0}^{2\pi} u(x)\sin x\,dx$.

In $L^{2}[0,2\pi]$ with inner product $\langle f,g\rangle=\frac{1}{2\pi}\int f\overline{g}$, the Riesz theorem gives $f(x)=\sin x$, since $\phi(u)=\langle u,\sin x\rangle$.

The Riesz representation theorem establishes the duality between functionals and vectors: every bounded linear functional on a Hilbert space corresponds to taking an inner product with a unique vector. This self-duality is fundamental to variational formulations, where functionals naturally arise from taking inner products with test functions.

An **orthonormal basis** $\{e_{n}\}$ satisfies $\langle e_{n},e_{m}\rangle=\delta_{nm}$ and spans $H$ densely. Every $f\in H$ admits the Fourier expansion $f=\sum \langle f,e_{n}\rangle e_{n}$, and **Parseval's identity** preserves the norm: $\|f\|^{2}=\sum \vert \langle f,e_{n}\rangle \vert^{2}$.

**Parseval's Identity for a Square Wave**

Verify Parseval for $f(x)=\operatorname{sgn}(\sin x)$ on $[0,2\pi]$.

Fourier coefficients: $b_{n}=\frac{4}{\pi n}$ for odd $n$, zero otherwise. Then $\|f\|^{2}=1$ and $\sum \vert b_{n} \vert^{2}=\frac{16}{\pi^{2}}\sum_{k=0}^{\infty}\frac{1}{(2k+1)^{2}}=\frac{16}{\pi^{2}}\cdot\frac{\pi^{2}}{8}=1$, confirming Parseval.

Parseval's identity shows that Fourier coefficients encode the complete energy content of a function: the sum of squared coefficients equals the square of the norm. This identity is fundamental to understanding convergence: while Fourier series may not converge pointwise, they always converge in the $L^{2}$ norm, and Parseval quantifies this convergence precisely.

## Compact Operators

A bounded operator $K:H\to H$ is **compact** if it maps bounded sets to relatively compact sets. Equivalently, for any bounded sequence $\{u_{n}\}$, the sequence $\{Ku_{n}\}$ has a convergent subsequence. Integral operators with square-integrable kernels (Hilbert-Schmidt operators) are compact; they model Green's operators that smooth data.

**Hilbert-Schmidt Operator**

Consider $K:L^{2}[0,1]\to L^{2}[0,1]$ with kernel $K(x,y)=\min(x,y)$. Compute

$$
\|K\|_{HS}^{2}=\int_{0}^{1}\int_{0}^{1} \min(x,y)^{2}\,dx\,dy=\frac{1}{3}<\infty,
$$

so $K$ is Hilbert-Schmidt and hence compact.

The Hilbert-Schmidt norm provides a concrete criterion for compactness: integral operators with square-integrable kernels are automatically compact. This result connects abstract operator theory to concrete integral equations: Green's operators, which smooth data by convolution with a kernel, are compact precisely when the kernel is square-integrable.

## Spectral Theorem for Compact Self-Adjoint Operators

If $T:H\to H$ is compact and self-adjoint ($T=T^{*}$), then: the spectrum $\sigma(T)$ consists of real eigenvalues $\{\lambda_{n}\}$ with $\lambda_{n}\to 0$; nonzero eigenvalues have finite multiplicity and accumulate only at $0$; there exists an orthonormal basis $\{\phi_{n}\}$ of eigenvectors; and $Tu=\sum \lambda_{n} \langle u,\phi_{n}\rangle \phi_{n}$.

This diagonalization extends finite-dimensional intuition to infinite dimensions and yields the Fredholm alternative for $(I-\lambda K)u=f$.

**Mercer's theorem** specializes to positive integral kernels: if $K(x,y)$ is continuous, symmetric, and positive-definite, then

$$
K(x,y)=\sum_{n=1}^{\infty}\lambda_{n}\phi_{n}(x)\overline{\phi_{n}(y)}
$$

uniformly on $\Omega\times \Omega$.

**Spectral Decomposition of $K$**

Solve $Ku=\lambda u$ where $K(x,y)=\min(x,y)$.

Differentiating the integral equation yields $-u''=\lambda^{-1}u$ with $u(0)=u(1)=0$, giving eigenfunctions $\phi_{n}(x)=\sqrt{2}\sin(n\pi x)$ and eigenvalues $\lambda_{n}=\frac{1}{(n\pi)^{2}}$. The kernel admits the Mercer expansion

$$
K(x,y)=2\sum_{n=1}^{\infty}\frac{\sin(n\pi x)\sin(n\pi y)}{(n\pi)^{2}}.
$$

The spectral decomposition of a compact self-adjoint operator reveals its structure: the operator acts by scaling along eigenfunctions, with the scaling factors given by eigenvalues. Mercer's theorem shows that for integral operators, this decomposition can be expressed explicitly in terms of the kernel: the kernel itself is a sum of products of eigenfunctions, weighted by eigenvalues. This provides a rigorous foundation for the separation of variables method: the eigenfunctions form a complete orthonormal basis, and solutions expand naturally in terms of these eigenfunctions.

## Applications to PDEs

For elliptic operators such as $-\Delta$ with homogeneous Dirichlet boundary conditions, the inverse (solution operator) $S:f\mapsto u$ is compact from $L^{2}(\Omega)$ to $H^{1}_{0}(\Omega)$ (Rellich-Kondrachov). Hence $S$ is compact self-adjoint, and the spectral theorem provides: a discrete sequence of eigenvalues $0<\lambda_{1}\le\lambda_{2}\le\dots\to\infty$; an orthonormal basis of eigenfunctions in $L^{2}(\Omega)$; and rigorous justification for eigenfunction expansions used in separation of variables.

Weyl's law describes the asymptotic distribution of eigenvalues, connecting spectrum to geometry: $N(\lambda)\sim \frac{\omega_{n}}{(2\pi)^{n}}\operatorname{vol}(\Omega)\lambda^{n/2}$.

**Sturm–Liouville Problem**

For $-(1-x^{2})u''-2xu'=\lambda u$ on $[-1,1]$, solutions are Legendre polynomials $P_{n}(x)$ with $\lambda=n(n+1)$. Their orthogonality $\int_{-1}^{1}P_{n}P_{m}\,dx=0$ ($n\ne m$) and completeness justify polynomial expansions in Chapter 1.

The Sturm-Liouville theory shows that eigenfunctions of self-adjoint differential operators form complete orthonormal bases. For the Legendre equation, the eigenfunctions are polynomials that are orthogonal with respect to the standard inner product. This completeness justifies the use of Legendre polynomials in series expansions, providing the rigorous foundation for the special function techniques developed in Chapter 1.2.

**Fredholm Alternative**

Solve $(I-\lambda K)u=f$ with $K$ having kernel $\min(x,y)$.

If $\lambda\neq 1/\lambda_{n}$, the solution is unique. At resonance ($\lambda=1/\lambda_{n}$), solvability requires $f$ orthogonal to the corresponding eigenfunction. Explicit computation shows failure when $\lambda=\pi^{2}/4$ unless $f\perp \sin(\pi x/2)$.

The Fredholm alternative provides a complete characterization of solvability for integral equations: either the homogeneous equation has only the trivial solution (in which case the inhomogeneous equation is uniquely solvable), or the homogeneous equation has nontrivial solutions (in which case the inhomogeneous equation is solvable if and only if the right-hand side is orthogonal to all solutions of the adjoint homogeneous equation). This alternative is a direct consequence of the spectral theorem: at eigenvalues, the operator fails to be invertible, and solvability requires orthogonality to the eigenfunctions.

**Weyl's Law on a Square**

For $-\Delta$ on $[0,\pi]^{2}$ with Dirichlet boundary, eigenvalues are $\lambda_{mn}=m^{2}+n^{2}$. Counting eigenvalues up to $\lambda$ approximates the number of lattice points in a quarter circle, yielding $N(\lambda)\sim \lambda/4$, in agreement with Weyl's law.

Weyl's law connects spectral geometry to classical geometry: the asymptotic distribution of eigenvalues depends only on the volume and dimension of the domain, not on its detailed shape. For the square, the eigenvalues correspond to lattice points in the plane, and counting these points asymptotically gives the volume of a quarter circle. This result shows that "one can hear the volume of a drum": the high-frequency spectrum encodes geometric information about the domain.

**Heat Equation Convergence**

For $u_{t}=u_{xx}$ on $(0,\pi)$ with Dirichlet data, the solution $u(x,t)=\sum c_{n}e^{-n^{2}t}\sin(nx)$ converges in $L^{2}$. Error estimates show $\|u-u_{N}\|\le C N^{-3}e^{-N^{2}t}$ for smooth initial data, illustrating spectral convergence.

The spectral decomposition of the heat equation reveals exponential convergence: each mode decays at a rate determined by its eigenvalue. For smooth initial data, the high-frequency modes decay extremely rapidly, producing spectral convergence where the error decreases faster than any power of $N$. This exponential convergence is a hallmark of spectral methods and distinguishes them from finite difference methods, which typically exhibit only algebraic convergence.

**Semiclassical Asymptotics**

For the harmonic oscillator $-h^{2}u''+x^{2}u=Eu$, eigenvalues satisfy $E_{n}=n+\tfrac{1}{2}$ exactly. Weyl's law predicts $N(E)\sim E/h$, matching the exact distribution and connecting spectral theory to semiclassical analysis.

The harmonic oscillator provides a bridge between quantum and classical mechanics: the eigenvalues correspond exactly to the classical action variables, with the zero-point energy $1/2$ arising from quantum fluctuations. Weyl's law reproduces the exact eigenvalue count, showing that the asymptotic formula captures the essential physics. This connection to semiclassical analysis reveals that spectral theory provides a rigorous framework for quantization: classical phase space volumes translate directly into quantum eigenvalue counts.

## Challenge Problems

The following problems synthesize concepts from Hilbert space geometry, compact operators, spectral theory, and their applications to PDEs.

### Challenge 1: Spectral Decomposition and Completeness

For the operator $K:L^{2}[0,1]\to L^{2}[0,1]$ defined by $(Ku)(x)=\int_{0}^{1}\min(x,y)u(y)\,dy$, show that the eigenfunctions form a complete orthonormal basis for $L^{2}[0,1]$. Use this to prove that every function in $L^{2}[0,1]$ can be expanded in a Fourier sine series, providing a rigorous justification for the completeness of $\{\sin(n\pi x)\}$.

*(Hint: Show that $K$ is compact and self-adjoint, then apply the spectral theorem. The completeness of eigenfunctions follows from the fact that they form an orthonormal basis.)*

<details>
<summary><strong>Expand Solution</strong></summary>

Since $K$ is a Hilbert-Schmidt operator (the kernel $\min(x,y)$ is square-integrable), it is compact. The kernel is symmetric, so $K$ is self-adjoint. By the spectral theorem for compact self-adjoint operators, there exists an orthonormal basis $\{\phi_{n}\}$ of eigenvectors.

From the example, we found that the eigenfunctions are $\phi_{n}(x)=\sqrt{2}\sin(n\pi x)$ with eigenvalues $\lambda_{n}=\frac{1}{(n\pi)^{2}}$. Since $K$ is compact and self-adjoint, and the eigenfunctions span the range of $K$, which is dense in $L^{2}[0,1]$ (because $K$ is injective for functions vanishing at the boundary), the eigenfunctions form a complete orthonormal basis.

For any $f\in L^{2}[0,1]$, we can write $f=\sum_{n=1}^{\infty}\langle f,\phi_{n}\rangle\phi_{n}$, which is exactly the Fourier sine series expansion. Parseval's identity gives $\|f\|^{2}=\sum_{n=1}^{\infty}\vert \langle f,\phi_{n}\rangle \vert^{2}$.

This demonstrates that the spectral theorem provides a rigorous foundation for Fourier series: the completeness of trigonometric functions is not an isolated fact but a consequence of the spectral decomposition of a specific compact self-adjoint operator. The connection between integral operators and differential operators reveals the deep structure underlying classical Fourier analysis.

</details>

### Challenge 2: Weyl's Law and Geometric Asymptotics

Prove Weyl's law for the Laplacian on a bounded domain $\Omega\subset\mathbb{R}^{n}$ with Dirichlet boundary conditions: $N(\lambda)\sim \frac{\omega_{n}}{(2\pi)^{n}}\operatorname{vol}(\Omega)\lambda^{n/2}$ as $\lambda\to\infty$, where $N(\lambda)$ is the number of eigenvalues less than $\lambda$ and $\omega_{n}$ is the volume of the unit ball in $\mathbb{R}^{n}$.

*(Hint: Use the min-max principle and compare with the spectrum on a cube. The key is that high-frequency eigenfunctions behave locally like plane waves, so the eigenvalue count approximates the volume of phase space.)*

<details>
<summary><strong>Expand Solution</strong></summary>

Weyl's law follows from the min-max principle and a comparison argument. The min-max principle states that

$$
\lambda_{k}=\inf_{\dim V=k}\sup_{u\in V,\|u\|=1}\int_{\Omega}\vert \nabla u \vert^{2}dx,
$$

where the infimum is over all $k$-dimensional subspaces $V$ of $H_{0}^{1}(\Omega)$.

For high frequencies, eigenfunctions oscillate rapidly and behave locally like plane waves. The number of eigenvalues up to $\lambda$ corresponds approximately to the number of wave vectors $k$ such that $\vert k \vert^{2}\le\lambda$. In phase space (position-momentum space), this corresponds to the volume of the set $\{(x,k):x\in\Omega,\vert k \vert^{2}\le\lambda\}$.

The volume of this set is $\operatorname{vol}(\Omega)\times \operatorname{vol}(\{k:\vert k \vert^{2}\le\lambda\})$. The volume of the ball of radius $\sqrt{\lambda}$ in $k$-space is $\omega_{n}(\sqrt{\lambda})^{n}=\omega_{n}\lambda^{n/2}$. However, we need to account for the factor $(2\pi)^{-n}$ from the Fourier transform normalization.

Using a Tauberian theorem or direct comparison with the cube case (where the eigenvalues are explicitly known as $\lambda_{m_{1},\ldots,m_{n}}=\pi^{2}(m_{1}^{2}+\cdots+m_{n}^{2})$), we obtain

$$
N(\lambda)\sim \frac{\omega_{n}}{(2\pi)^{n}}\operatorname{vol}(\Omega)\lambda^{n/2}.
$$

Weyl's law reveals a fundamental connection between analysis and geometry: the asymptotic distribution of eigenvalues depends only on the volume and dimension of the domain, not on its detailed shape or smoothness. This universality shows that high-frequency eigenfunctions "see" only the gross geometric properties of the domain, losing information about fine-scale structure. The connection to phase space volume reflects the correspondence between quantum and classical mechanics: the number of quantum states equals (asymptotically) the classical phase space volume divided by Planck's constant, here manifested through the $(2\pi)^{n}$ normalization factor.

</details>

### Challenge 3: Fredholm Alternative and Resonance

Consider the integral equation $(I-\lambda K)u=f$ where $K$ is a compact self-adjoint operator on a Hilbert space $H$. Prove the Fredholm alternative: either the equation has a unique solution for all $f\in H$ (when $\lambda$ is not an eigenvalue), or the homogeneous equation $(I-\lambda K)u=0$ has nontrivial solutions and the inhomogeneous equation is solvable if and only if $f$ is orthogonal to all solutions of the adjoint homogeneous equation.

*(Hint: Use the spectral decomposition of $K$. At eigenvalues, the operator $I-\lambda K$ has a nontrivial kernel, and its range is the orthogonal complement of the kernel.)*

<details>
<summary><strong>Expand Solution</strong></summary>

By the spectral theorem, we can write $K=\sum_{n=1}^{\infty}\lambda_{n}\langle \cdot,\phi_{n}\rangle\phi_{n}$ where $\{\phi_{n}\}$ is an orthonormal basis of eigenvectors and $\{\lambda_{n}\}$ are the eigenvalues.

If $\lambda\neq 1/\lambda_{n}$ for all $n$, then $I-\lambda K$ is invertible with

$$
(I-\lambda K)^{-1}=\sum_{n=1}^{\infty}\frac{1}{1-\lambda\lambda_{n}}\langle \cdot,\phi_{n}\rangle\phi_{n},
$$

and the equation $(I-\lambda K)u=f$ has the unique solution

$$
u=\sum_{n=1}^{\infty}\frac{\langle f,\phi_{n}\rangle}{1-\lambda\lambda_{n}}\phi_{n}.
$$

If $\lambda=1/\lambda_{m}$ for some $m$ (i.e., we are at resonance), then $\ker(I-\lambda K)$ is spanned by those $\phi_{n}$ for which $\lambda\lambda_{n}=1$. Since $K$ is self-adjoint, the adjoint equation is the same: $(I-\lambda K)^{*}=I-\lambda K^{*}=I-\lambda K$.

The range of $I-\lambda K$ is the orthogonal complement of its kernel. For $u\in\ker(I-\lambda K)$, we have $(I-\lambda K)u=0$, so $u=\lambda Ku$. For $f$ in the range, there exists $v$ such that $f=(I-\lambda K)v$. Then

$$
\langle f,u\rangle=\langle (I-\lambda K)v,u\rangle=\langle v,(I-\lambda K)u\rangle=\langle v,0\rangle=0,
$$

so $f$ is orthogonal to all $u\in\ker(I-\lambda K)$.

Conversely, if $f$ is orthogonal to $\ker(I-\lambda K)$, then we can solve $(I-\lambda K)u=f$ by setting

$$
u=\sum_{\lambda\lambda_{n}\neq 1}\frac{\langle f,\phi_{n}\rangle}{1-\lambda\lambda_{n}}\phi_{n}+v,
$$

where $v$ is any element of $\ker(I-\lambda K)$.

The Fredholm alternative provides a complete characterization of solvability for compact operator equations: either the operator is invertible (off resonance), or it has a kernel and solvability requires orthogonality to the kernel (on resonance). This alternative is fundamental to perturbation theory and bifurcation analysis: when parameters cross eigenvalues, the nature of solutions changes qualitatively, with new solution branches emerging from the kernel. The connection to the spectral theorem shows that this phenomenon is universal for compact operators: it arises from the discrete nature of the spectrum and the finite-dimensionality of eigenspaces.

</details>

### Challenge 4: Mercer's Theorem and Kernel Approximation

Prove Mercer's theorem: if $K(x,y)$ is a continuous, symmetric, positive-definite kernel on a compact set $\Omega$, then $K(x,y)=\sum_{n=1}^{\infty}\lambda_{n}\phi_{n}(x)\overline{\phi_{n}(y)}$ converges absolutely and uniformly on $\Omega\times\Omega$, where $\{\lambda_{n}\}$ and $\{\phi_{n}\}$ are the eigenvalues and eigenfunctions of the associated integral operator.

*(Hint: Use the spectral theorem and the positivity of the kernel. The uniform convergence follows from Dini's theorem applied to the partial sums.)*

<details>
<summary><strong>Expand Solution</strong></summary>

Since $K$ is continuous and symmetric, the associated operator $T$ defined by $(Tf)(x)=\int_{\Omega}K(x,y)f(y)\,dy$ is compact and self-adjoint. By the spectral theorem, $T$ has an orthonormal basis of eigenvectors $\{\phi_{n}\}$ with eigenvalues $\{\lambda_{n}\}$, and we can write

$$
Tf=\sum_{n=1}^{\infty}\lambda_{n}\langle f,\phi_{n}\rangle\phi_{n}.
$$

Since $K$ is positive-definite, all eigenvalues are positive: for any $f$, we have

$$
\langle Tf,f\rangle=\int_{\Omega}\int_{\Omega}K(x,y)f(x)\overline{f(y)}\,dx\,dy\ge 0,
$$

so if $T\phi=\lambda\phi$, then $\lambda\|\phi\|^{2}=\langle T\phi,\phi\rangle\ge 0$, hence $\lambda\ge 0$.

Now, for fixed $y$, consider the function $K(\cdot,y)$. Since $K$ is continuous, $K(\cdot,y)\in L^{2}(\Omega)$, so we can expand it:

$$
K(x,y)=\sum_{n=1}^{\infty}\langle K(\cdot,y),\phi_{n}\rangle\phi_{n}(x).
$$

But $\langle K(\cdot,y),\phi_{n}\rangle=\int_{\Omega}K(x,y)\overline{\phi_{n}(x)}\,dx=(T\overline{\phi_{n}})(y)=\lambda_{n}\overline{\phi_{n}(y)}$, so

$$
K(x,y)=\sum_{n=1}^{\infty}\lambda_{n}\phi_{n}(x)\overline{\phi_{n}(y)}.
$$

To prove uniform convergence, note that the partial sums $S_{N}(x,y)=\sum_{n=1}^{N}\lambda_{n}\phi_{n}(x)\overline{\phi_{n}(y)}$ form a monotone sequence (since $\lambda_{n}\ge 0$) that converges pointwise to $K(x,y)$. By Dini's theorem, since $\Omega\times\Omega$ is compact and $K$ is continuous, the convergence is uniform.

Mercer's theorem provides an explicit spectral decomposition of positive-definite kernels: the kernel itself can be written as a sum of products of eigenfunctions, with coefficients given by eigenvalues. This representation is fundamental to kernel methods in machine learning and the theory of reproducing kernel Hilbert spaces: it shows that any positive-definite kernel generates a Hilbert space whose elements are functions that can be expressed in terms of the eigenfunctions. The uniform convergence ensures that this representation is not just formal but converges in the strongest possible sense, making it useful for approximations and numerical methods.

</details>

The spectral theorem provides rigorous justification for the eigenfunction expansions used throughout Chapter 1: separation of variables, Fourier series, and special function expansions all emerge naturally from the spectral decomposition of compact self-adjoint operators. However, this framework is limited to compact operators: unbounded operators like the Laplacian on unbounded domains require more sophisticated spectral theory. The connection between compactness and smoothing reveals why elliptic operators on bounded domains have discrete spectra: the inverse operator is compact, so its spectrum consists of isolated eigenvalues. Unbounded operators, which do not smooth, may have continuous spectra, necessitating the more general spectral theory developed in the next section.

## References

* **Brezis, H. (2011).** *Functional Analysis, Sobolev Spaces and Partial Differential Equations*. Springer.
* **Reed, M., & Simon, B. (1972).** *Methods of Modern Mathematical Physics I: Functional Analysis*. Academic Press.
* **Rudin, W. (1987).** *Real and Complex Analysis*. McGraw-Hill.
* **Evans, L. C. (2010).** *Partial Differential Equations*. American Mathematical Society.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 2.2 Sobolev Spaces & Weak Derivatives]({{ '/diffequations/chapter-02/02-2-sobolev-spaces/' | relative_url }})
- [Next Section: 2.4 Unbounded Operators, Resolvents & Semigroups]({{ '/diffequations/chapter-02/02-4-unbounded-operators/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-02/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
