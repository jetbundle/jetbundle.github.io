---
layout: textbook
title: "Section 2.1: Distributions & Test Functions"
description: "Redefining differentiation via duality"
permalink: /diffequations/chapter-02/02-1-distributions/
order: 2.1
chapter: 2
section: 1
nav_order: 2.1
is_chapter_index: false
parent_chapter: 2
parent_section: null
---

# Section 2.1: Distributions & Test Functions

> Differentiation becomes infinitely extensible when we test against smooth functions: every locally integrable function gains derivatives in the distributional sense, providing a rigorous foundation for Green's functions, delta functions, and the formal manipulations of Chapter 1.

## Introduction

We resolve the ambiguity of the delta function by redefining differentiation. By testing functions against smooth, compact "instruments" (Test Functions), we define **Distributions**. Differentiation becomes a duality operation, making every locally integrable function infinitely differentiable. This creates a rigorous home for the Green's functions and impulses of Chapter 1.3.

## Test Functions

Let $\Omega \subset \mathbb{R}^{n}$ be open. The **test-function space** $\mathcal{D}(\Omega)=C_{c}^{\infty}(\Omega)$ consists of smooth functions with compact support. Its topology is the strict inductive limit of Fréchet spaces: choose compact exhaustion $K_{1}\subset K_{2}\subset \cdots \subset \Omega$, define seminorms

$$
p_{N,K}(\phi)=\max_{\mid \alpha \mid \le N}\sup_{x\in K} \mid D^{\alpha}\phi(x) \mid,
$$

and equip $\mathcal{D}_{K}(\Omega)$ with all $p_{N,K}$. A sequence $\phi_{j}\to 0$ in $\mathcal{D}(\Omega)$ if and only if there exists a fixed compact $K$ containing every $\operatorname{supp}\phi_{j}$ and $D^{\alpha}\phi_{j}\to 0$ uniformly on $K$ for all multi-indices $\alpha$. Differentiation is continuous in this topology.

This topology ensures that convergence of test functions captures both smoothness and localization: sequences that converge must eventually be supported in a fixed compact set and converge uniformly along with all their derivatives. This property will be crucial when we define continuity of distributions.

## Distributions

A **distribution** is a continuous linear functional $T:\mathcal{D}(\Omega)\to\mathbb{C}$. Continuity means: for each compact $K\subset \Omega$, there exist $C>0$ and integer $N\ge 0$ such that for all $\phi\in \mathcal{D}_{K}(\Omega)$,

$$
\mid \langle T,\phi\rangle \mid \le C \sum_{\mid \alpha \mid \le N}\sup_{x\in K}\mid D^{\alpha}\phi(x) \mid.
$$

The smallest such $N$ is the **order** of $T$. The Dirac mass $\delta_{a}$ defined by $\langle \delta_{a},\phi\rangle=\phi(a)$ satisfies $\mid \phi(a) \mid \le \sup \mid \phi \mid$, so $\delta_{a}$ has order $0$.

> **Dirac Delta and Its Derivatives**

> Show $\delta_{a}$ has order $0$ and compute its derivatives.

> For $\phi\in\mathcal{D}$, $\mid \langle \delta_{a},\phi\rangle \mid =\mid \phi(a) \mid \le \sup\mid \phi \mid =p_{0}(\phi)$, so order $0$. Differentiating,

> $$
> \langle \delta_{a}',\phi\rangle=-\langle \delta_{a},\phi'\rangle=-\phi'(a),\qquad
> \langle \delta_{a}^{(n)},\phi\rangle=(-1)^{n}\phi^{(n)}(a),
> $$

> and each derivative has order $n$.

The Dirac delta demonstrates the power of distributional differentiation: a point mass that is not a function in the classical sense becomes infinitely differentiable in the distributional sense. Each derivative extracts higher-order information from test functions, with the order increasing precisely to capture the required smoothness. This example shows that distributions generalize both functions and measures, providing a unified framework for objects that appear singular from a classical viewpoint.

The dual space $\mathcal{D}'(\Omega)$ carries the **weak-$\ast$ topology**: $T_{j}\to T$ if $\langle T_{j},\phi\rangle\to \langle T,\phi\rangle$ for every $\phi\in\mathcal{D}(\Omega)$. Fourier series, Green's functions, and impulse responses converge naturally in this topology, resolving the pointwise convergence failures encountered in Chapter 1.

> **Fourier Series Convergence in $\mathcal{D}'$**

> Show the Fourier series of $f(x)=\mid x \mid$ on $(-\pi,\pi)$ converges to $f$ in $\mathcal{D}'$.

> Partial sums satisfy $\langle S_{N},\phi\rangle=\int_{-\pi}^{\pi}S_{N}(x)\phi(x)\,dx\to \int_{-\pi}^{\pi}\mid x \mid \phi(x)\,dx$ as $N\to\infty$, because $\phi$ decays near the endpoints. Thus $S_{N}\to f$ distributionally, even though Gibbs oscillations persist pointwise.

Distributional convergence provides a natural resolution to the convergence problems of Chapter 1.4: while Fourier series may fail to converge pointwise, they always converge in the distributional sense. The test function $\phi$ smooths out the Gibbs oscillations, making the convergence manifest. This example illustrates that distribution theory provides a robust framework where formal manipulations become rigorous.

> **Periodic Delta Comb**

> Express $\sum_{k\in\mathbb{Z}}\delta(x-2\pi k)$ via Fourier series.

> Pairing with $e^{-inx}$ gives coefficients $c_{n}=\frac{1}{2\pi}$. Hence

> $$
> \sum_{k\in\mathbb{Z}}\delta(x-2\pi k)=\frac{1}{2\pi}\sum_{n\in\mathbb{Z}}e^{inx},
> $$

> the Poisson summation formula in $\mathcal{D}'$.

The periodic delta comb reveals the deep connection between discrete and continuous structures: a sum of point masses becomes a Fourier series, and the Poisson summation formula emerges naturally in the distributional framework. This example shows that distributions allow us to work with objects that are neither functions nor measures in the classical sense, yet they admit meaningful Fourier analysis.

## Calculus of Distributions

Integration by parts motivates the definition of derivatives: for multi-index $\alpha$,

$$
\langle \partial^{\alpha} T,\phi\rangle := (-1)^{\mid \alpha \mid}\langle T,\partial^{\alpha}\phi\rangle.
$$

Since $\phi\mapsto \partial^{\alpha}\phi$ is continuous on $\mathcal{D}$, $\partial^{\alpha}T$ is a distribution. Thus every distribution is infinitely differentiable. Multiplication by smooth functions is defined via $\langle fT,\phi\rangle=\langle T,f\phi\rangle$ for $f\in C^{\infty}(\Omega)$. Convolution with test functions produces smooth functions, and convolution of two distributions is defined when at least one has compact support.

> **Heaviside Function**

> Compute $H'$ distributionally for $H(x)=1$ if $x\ge 0$, $0$ otherwise.

> For $\phi\in\mathcal{D}(\mathbb{R})$,

> $$
> \langle H',\phi\rangle=-\langle H,\phi'\rangle=-\int_{0}^{\infty}\phi'(x)\,dx=\phi(0)=\langle \delta,\phi\rangle.
> $$

> Therefore $H'=\delta$. Differentiating again yields $H''=\delta'$.

The Heaviside function demonstrates that functions with jump discontinuities have derivatives in the distributional sense: the derivative is not a function but a distribution (the delta function) concentrated at the discontinuity. This result resolves the ambiguity of differentiating discontinuous functions: the jump creates a point mass in the derivative, and the size of the jump determines the magnitude of the delta function. Distributional differentiation thus provides a rigorous framework for handling functions that are not classically differentiable.

> **Order of $\delta^{(n)}$**

> Prove $\delta^{(n)}$ has order exactly $n$.

> We have $\mid \langle \delta^{(n)},\phi\rangle \mid \le p_{n}(\phi)$. To show order $\ge n$, choose $\phi_{\epsilon}(x)=\epsilon^{n+1}\psi(x/\epsilon)$ with $\psi^{(n)}(0)=1$. Then $\mid \langle \delta^{(n)},\phi_{\epsilon}\rangle \mid =\epsilon$, while $p_{k}(\phi_{\epsilon})=O(\epsilon^{n+1-k})$. For $k<n$, $\mid \langle \delta^{(n)},\phi_{\epsilon}\rangle \mid /p_{k}(\phi_{\epsilon})\to \infty$, so no lower order bound exists.

The order of a distribution quantifies how much smoothness it requires from test functions. Higher-order distributions like $\delta^{(n)}$ require more derivatives to be controlled, reflecting the fact that they probe higher-order behavior of test functions. This example shows that the order is a fundamental invariant: it cannot be reduced by reparameterization and determines the minimal regularity required to evaluate the distribution.

## Green's Functions as Distributions

Green's functions, which appeared as formal solutions in Chapter 1.3, become rigorous when interpreted as distributions. The fundamental solution of the Laplacian provides a canonical example.

> **Green's Function in $\mathbb{R}^{2}$**

> Verify $-\Delta \Phi=\delta$ with $\Phi(x)=-\frac{1}{2\pi}\log\mid x \mid$.

> For $\phi\in\mathcal{D}(\mathbb{R}^{2})$,

> $$
> \langle -\Delta \Phi,\phi\rangle=\langle \Phi,-\Delta \phi\rangle
>  = -\frac{1}{2\pi}\int_{\mathbb{R}^{2}}\log\mid x \mid \Delta\phi(x)\,dx.
> $$

> Integration by parts (boundary terms vanish due to compact support) shows this equals $\phi(0)$, so $-\Delta\Phi=\delta$.

This example demonstrates that the formal manipulation $-\Delta G=\delta$ becomes rigorous in distribution theory. The logarithmic singularity at the origin does not prevent the Laplacian from being well-defined distributionally: the test function $\phi$ is smooth enough to cancel the singularity through integration by parts. This result provides the rigorous foundation for the Green's function method introduced heuristically in Chapter 1.3.

> **Homogeneous Distributions**

> Show $\mid x \mid^{\lambda-n}$ is homogeneous of degree $\lambda$.

> For $t>0$,

> $$
> \left\langle \mid x \mid^{\lambda-n},\phi(x/t)\right\rangle
>  = t^{\lambda}\langle \mid x \mid^{\lambda-n},\phi\rangle
> $$

> after the change $y=x/t$. Special cases include $\delta$ (degree $-n$) and $\mid x \mid^{2-n}$ (Green's function in $\mathbb{R}^{n}$, degree $2-n$).

Homogeneity is a geometric property that extends naturally to distributions. The scaling behavior of Green's functions reflects the scaling invariance of the Laplacian: if we scale space by $t$, solutions scale by a corresponding power. This example shows that distribution theory preserves the geometric structure of classical analysis while extending it to singular objects.

> **Wave Equation Fundamental Solution**

> Solve $\partial_{tt}u-\partial_{xx}u=\delta(x)\delta(t)$ with $u=0$ for $t<0$.

> The distribution $E(x,t)=H(t-\mid x \mid)$ satisfies $\partial_{tt}E-\partial_{xx}E=\delta(x)\delta(t)$. Verification follows by testing against $\phi$ and integrating by parts; $E$ describes the light cone in $1+1$ dimensions.

The wave equation fundamental solution illustrates how distributions handle propagation along characteristics: the support of $E$ is exactly the light cone $\mid x \mid \le t$, reflecting the finite speed of propagation. The discontinuity at $\mid x \mid =t$ is handled distributionally: the test function smooths the jump, making the calculation rigorous. This example connects distribution theory to the geometric structure of hyperbolic equations, showing how singular supports encode physical causality.

## Regular Distributions

Every locally integrable function $f\in L^{1}_{\text{loc}}(\Omega)$ defines a **regular distribution** $T_{f}$ via $\langle T_{f},\phi\rangle = \int_{\Omega} f(x)\phi(x)\,dx$. This embedding identifies $L^{1}_{\text{loc}}(\Omega)$ with a subspace of $\mathcal{D}'(\Omega)$. Singular objects (point masses, principal values) coexist with regular ones, providing a unified framework.

However, $\mathcal{D}'$ is too broad for energy estimates: distributions can be arbitrarily singular and need not admit any integrability properties. Sobolev spaces refine regularity notions by requiring that distributions have weak derivatives that are square-integrable, providing the energy framework needed for variational methods.

> **Mollification**

> Show $T*\rho_{\epsilon}\in C^{\infty}$ when $T$ has compact support.

> Define $(T*\rho_{\epsilon})(x)=\langle T_{y},\rho_{\epsilon}(x-y)\rangle$. Differentiating under the pairing gives $\partial_{x}^{\alpha}(T*\rho_{\epsilon})=\langle T_{y},\partial_{x}^{\alpha}\rho_{\epsilon}(x-y)\rangle$, smooth in $x$. Thus mollification approximates distributions by smooth functions.

Mollification provides a systematic method for approximating distributions by smooth functions: convolution with a smooth approximate identity regularizes any distribution. This technique will be fundamental in Sobolev space theory, where we need to approximate weakly differentiable functions by smooth ones. The construction shows that distributions are limits of smooth functions in an appropriate topology, providing a bridge between classical and distributional analysis.

## Challenge Problems

The following problems synthesize the concepts of distributions, differentiation, convergence, and Green's functions.

### Challenge 1: Distributional Derivative of a Singular Function

Consider the function $f(x) = \mid x \mid^{1/2}$ on $\mathbb{R}$. Show that $f$ defines a regular distribution, compute its first distributional derivative, and determine whether this derivative is itself a regular distribution. If not, characterize its singular structure.

*(Hint: Test against $\phi\in\mathcal{D}(\mathbb{R})$ and use integration by parts. The singularity at $x=0$ will require careful analysis.)*

<details>
<summary><strong>Expand Solution</strong></summary>

Since $\mid x \mid^{1/2}$ is locally integrable, it defines a regular distribution $T_f$ via $\langle T_f, \phi \rangle = \int_{-\infty}^{\infty} \mid x \mid^{1/2} \phi(x) \, dx$.

For the derivative, we have

$$
\langle T_f', \phi \rangle = -\langle T_f, \phi' \rangle = -\int_{-\infty}^{\infty} \mid x \mid^{1/2} \phi'(x) \, dx.
$$

Splitting the integral at $x=0$ and integrating by parts:

$$
-\int_{-\infty}^{0} (-x)^{1/2} \phi'(x) \, dx - \int_{0}^{\infty} x^{1/2} \phi'(x) \, dx = \int_{-\infty}^{0} \frac{1}{2}(-x)^{-1/2} \phi(x) \, dx - \int_{0}^{\infty} \frac{1}{2}x^{-1/2} \phi(x) \, dx.
$$

The derivative is $T_{f'}$ where $f'(x) = \frac{1}{2}\operatorname{sgn}(x)\mid x \mid^{-1/2}$ for $x \neq 0$. However, $\mid x \mid^{-1/2}$ is not locally integrable near $0$ (the integral $\int_0^{\epsilon} x^{-1/2} \, dx$ diverges), so $f'$ does not define a regular distribution.

The distributional derivative must be interpreted as a principal value or as a limit of regularizations. The singular structure at $x=0$ reflects the fact that $\mid x \mid^{1/2}$ has infinite slope at the origin: the classical derivative does not exist, and the distributional derivative reveals this singularity through non-integrability.

This demonstrates that distributional differentiation can produce distributions that are more singular than the original: while $f$ is a regular distribution, its derivative is singular. The order of the distribution increases when differentiation reveals hidden singularities that were smoothed out by integration in the original object.

</details>

### Challenge 2: Convergence of Approximating Sequences

Let $f_n(x) = n \chi_{[0,1/n]}(x)$ be a sequence of functions that converges to the delta function. Show that $f_n \to \delta$ in $\mathcal{D}'(\mathbb{R})$, but not in $L^1(\mathbb{R})$ or pointwise. Then construct a sequence $g_n$ of smooth functions that also converges to $\delta$ in $\mathcal{D}'(\mathbb{R})$.

*(Hint: For the first part, test against $\phi\in\mathcal{D}(\mathbb{R})$ and use the mean value theorem. For the second part, use mollification of the step functions $f_n$.)*

<details>
<summary><strong>Expand Solution</strong></summary>

For any $\phi\in\mathcal{D}(\mathbb{R})$, we have

$$
\langle f_n, \phi \rangle = \int_0^{1/n} n \phi(x) \, dx = n \cdot \frac{1}{n} \phi(\xi_n) = \phi(\xi_n)
$$

for some $\xi_n \in [0, 1/n]$ by the mean value theorem. As $n \to \infty$, $\xi_n \to 0$, and by continuity of $\phi$, we have $\phi(\xi_n) \to \phi(0)$. Therefore $\langle f_n, \phi \rangle \to \phi(0) = \langle \delta, \phi \rangle$, so $f_n \to \delta$ in $\mathcal{D}'(\mathbb{R})$.

However, $\|f_n\|_{L^1} = 1$ for all $n$, so $f_n$ does not converge to $\delta$ in $L^1$ (since $\delta$ is not an $L^1$ function). Pointwise, $f_n(x) \to 0$ for $x \neq 0$, but $f_n(0) = n \to \infty$, so there is no pointwise limit.

To construct smooth approximants, take $g_n = f_n * \rho_{\epsilon_n}$ where $\rho_{\epsilon}$ is a standard mollifier and $\epsilon_n \to 0$ sufficiently slowly (e.g., $\epsilon_n = 1/n^2$). Then $g_n \in C^{\infty}$ and by continuity of convolution, $g_n \to \delta$ in $\mathcal{D}'(\mathbb{R})$ as well.

This example illustrates that distributional convergence is weaker than $L^1$ or pointwise convergence: sequences that concentrate mass can converge distributionally even when they fail to converge in stronger topologies. The ability to approximate singular distributions by smooth functions is fundamental to regularization techniques and shows that the space of distributions is the closure of smooth functions in the weak-$\ast$ topology.

</details>

### Challenge 3: Product of Distributions

Show that the product of two distributions is not well-defined in general by demonstrating that $\delta \cdot \delta$ cannot be given a consistent meaning. However, show that if $f \in C^{\infty}(\Omega)$ and $T \in \mathcal{D}'(\Omega)$, then $fT$ defined by $\langle fT, \phi \rangle = \langle T, f\phi \rangle$ is a well-defined distribution.

*(Hint: For the first part, consider that $\delta$ should act as the identity under multiplication if products existed. For the second part, verify continuity of the map $\phi \mapsto f\phi$ on $\mathcal{D}(\Omega)$.)*

<details>
<summary><strong>Expand Solution</strong></summary>

Suppose $\delta \cdot \delta$ were well-defined. Since $\delta$ should act as a multiplicative identity (heuristically, $\delta(x)$ is "infinite" at $x=0$ and zero elsewhere), we might expect $(\delta \cdot \delta)(\phi) = \delta(\phi) = \phi(0)$. However, this leads to contradictions.

Consider the sequence $\phi_n(x) = n \rho(nx)$ where $\rho$ is a standard mollifier. Then $\phi_n(0) = n \rho(0) \to \infty$, so $\delta(\phi_n) \to \infty$. If $\delta \cdot \delta$ existed and satisfied any reasonable continuity property, we would need $(\delta \cdot \delta)(\phi_n) \to \infty$ as well. But this is inconsistent with treating $\delta \cdot \delta$ as a distribution, since distributions must be continuous linear functionals.

More formally, if we attempt to define $(\delta \cdot \delta)(\phi)$ by any limiting process involving approximations $\delta_n \to \delta$, we find that the limit depends on the choice of approximating sequence and is not well-defined.

For the second part, if $f \in C^{\infty}(\Omega)$ and $T \in \mathcal{D}'(\Omega)$, then for any compact $K \subset \Omega$, the map $\phi \mapsto f\phi$ sends $\mathcal{D}_K(\Omega)$ to itself and is continuous (since multiplication by $f$ preserves smoothness and support). Therefore, $\phi \mapsto \langle T, f\phi \rangle$ is continuous, so $fT$ is well-defined as a distribution.

The impossibility of multiplying arbitrary distributions reflects the fact that distributions are defined by their action on test functions, and there is no natural way to compose such actions. However, multiplication by smooth functions works because it preserves the test function structure: smooth functions map $\mathcal{D}(\Omega)$ to itself continuously, allowing the composition to be well-defined.

</details>

### Challenge 4: Fundamental Solutions in Higher Dimensions

For $n \ge 3$, the fundamental solution of $-\Delta$ in $\mathbb{R}^n$ is $\Phi(x) = C_n \mid x \mid^{2-n}$ where $C_n$ is a dimensional constant. Verify that $-\Delta \Phi = \delta$ in $\mathcal{D}'(\mathbb{R}^n)$ and compute $C_n$ explicitly. Then show that the case $n=2$ (logarithmic fundamental solution) can be recovered as a limiting case.

*(Hint: Use the divergence theorem and integration by parts. For the limit, consider $n = 2 + \epsilon$ and take $\epsilon \to 0$.)*

<details>
<summary><strong>Expand Solution</strong></summary>

For $n \ge 3$, we have $\Phi(x) = C_n \mid x \mid^{2-n}$. Computing the Laplacian away from the origin:

$$
\Delta \Phi(x) = C_n \Delta(\mid x \mid^{2-n}) = C_n (2-n) \nabla \cdot (x \mid x \mid^{-n}) = C_n (2-n)[n \mid x \mid^{-n} - n x \cdot x \mid x \mid^{-n-2}] = 0
$$

for $x \neq 0$, since $x \cdot x = \mid x \mid^2$.

To verify $-\Delta \Phi = \delta$, test against $\phi \in \mathcal{D}(\mathbb{R}^n)$:

$$
\langle -\Delta \Phi, \phi \rangle = \langle \Phi, -\Delta \phi \rangle = -C_n \int_{\mathbb{R}^n} \mid x \mid^{2-n} \Delta \phi(x) \, dx.
$$

Using integration by parts and the divergence theorem:

$$
-C_n \int_{\mathbb{R}^n} \mid x \mid^{2-n} \Delta \phi(x) \, dx = -C_n \lim_{\epsilon \to 0} \int_{\mid x \mid \ge \epsilon} \mid x \mid^{2-n} \Delta \phi(x) \, dx.
$$

Applying Green's identity:

$$
= -C_n \lim_{\epsilon \to 0} \left[ \int_{\mid x \mid \ge \epsilon} \Delta(\mid x \mid^{2-n}) \phi(x) \, dx + \oint_{\mid x \mid = \epsilon} \left( \mid x \mid^{2-n} \frac{\partial \phi}{\partial n} - \phi \frac{\partial}{\partial n}(\mid x \mid^{2-n}) \right) \, dS \right].
$$

Since $\Delta(\mid x \mid^{2-n}) = 0$ for $x \neq 0$, the volume integral vanishes. On the sphere $\mid x \mid = \epsilon$, we have $\frac{\partial}{\partial n}(\mid x \mid^{2-n}) = (2-n)\epsilon^{1-n}$. The boundary integral becomes:

$$
-C_n \lim_{\epsilon \to 0} \oint_{\mid x \mid = \epsilon} \left[ \mid x \mid^{2-n} \frac{\partial \phi}{\partial n} - \phi (2-n)\epsilon^{1-n} \right] \, dS.
$$

As $\epsilon \to 0$, the first term vanishes (since $\mid x \mid^{2-n} = \epsilon^{2-n}$ and the surface area is $O(\epsilon^{n-1})$), and the second term gives:

$$
C_n (2-n) \lim_{\epsilon \to 0} \epsilon^{1-n} \oint_{\mid x \mid = \epsilon} \phi(x) \, dS = C_n (2-n) \lim_{\epsilon \to 0} \epsilon^{1-n} \cdot \text{Area}(S^{n-1}) \cdot \epsilon^{n-1} \cdot \phi(0) = C_n (2-n) \text{Area}(S^{n-1}) \phi(0).
$$

For this to equal $\phi(0)$, we need $C_n (2-n) \text{Area}(S^{n-1}) = 1$. Since $\text{Area}(S^{n-1}) = \frac{2\pi^{n/2}}{\Gamma(n/2)}$, we obtain:

$$
C_n = \frac{1}{(n-2) \cdot \frac{2\pi^{n/2}}{\Gamma(n/2)}} = \frac{\Gamma(n/2)}{2(n-2)\pi^{n/2}}.
$$

For the $n=2$ case, we cannot use $\mid x \mid^{2-n}$ directly since it becomes $\mid x \mid^0 = 1$ (a constant). However, taking the limit $n \to 2$ in the expression for $C_n \mid x \mid^{2-n}$ and using the asymptotic expansion of the Gamma function, we recover the logarithmic fundamental solution $\Phi(x) = -\frac{1}{2\pi} \log \mid x \mid$.

This calculation demonstrates how fundamental solutions depend on dimension: in higher dimensions, the fundamental solution decays algebraically, while in two dimensions it grows logarithmically. The dimensional constant $C_n$ ensures that the Laplacian produces exactly a unit point mass, providing the rigorous foundation for the method of images and other Green's function techniques used in Chapter 1.4.

</details>

Distribution theory provides a rigorous foundation for the formal manipulations of Chapter 1: Green's functions, delta functions, and impulse responses become well-defined mathematical objects. However, the space of distributions is too broad for energy methods: we cannot measure the "size" of a distribution in a way that captures physical energy. This limitation motivates Sobolev spaces, which refine distribution theory by requiring that distributions and their derivatives be square-integrable, providing the energy framework needed for variational methods and existence theorems.

## References

* **Brezis, H. (2011).** *Functional Analysis, Sobolev Spaces and Partial Differential Equations*. Springer.
* **Hörmander, L. (1983).** *The Analysis of Linear Partial Differential Operators I*. Springer.
* **Rudin, W. (1991).** *Functional Analysis*. McGraw–Hill.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 1.7 Classical Renormalization & Non-Perturbative Methods]({{ '/diffequations/chapter-01/01-7-renormalization/' | relative_url }})
- [Next Section: 2.2 Sobolev Spaces & Weak Derivatives]({{ '/diffequations/chapter-02/02-2-sobolev-spaces/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-02/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
