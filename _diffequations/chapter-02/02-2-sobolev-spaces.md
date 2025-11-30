---
layout: textbook
title: "Section 2.2: Sobolev Spaces & Weak Derivatives"
description: "Energy-based function spaces, embedding theorems"
permalink: /diffequations/chapter-02/02-2-sobolev-spaces/
order: 2.2
chapter: 2
section: 2
nav_order: 2.2
is_chapter_index: false
parent_chapter: 2
parent_section: null
---

Energy control implies regularity: functions with square-integrable weak derivatives gain classical smoothness through Sobolev embeddings, providing the bridge between distributional and physical solutions.

## Introduction

Distributions are too rough for physics (they lack energy concepts). We define **Sobolev Spaces** $H^k$ based on the $L^2$ integrability of weak derivatives. The **Sobolev Embedding Theorems** provide the crucial bridge: sufficient "weak" energy implies classical continuity. We rigorously construct **Trace Operators** to handle boundary conditions, resolving the convergence issues of eigenfunction expansions.

## Weak Derivatives

For $u,v \in L^1_{\text{loc}}(\Omega)$ and multi-index $\alpha$, we define $D^{\alpha}u = v$ in the **weak sense** if

$$
\int_{\Omega} u(x) D^{\alpha}\phi(x)\,dx = (-1)^{\vert \alpha \vert} \int_{\Omega} v(x)\phi(x)\,dx
$$

for all $\phi \in C_{c}^{\infty}(\Omega)$. If the classical derivative exists, it coincides with the weak derivative; conversely, functions such as $\vert x \vert$ have weak derivatives despite lacking classical differentiability everywhere. Weak derivatives are linear, satisfy Leibniz rules when multiplying by smooth functions, but the classical chain rule can fail when composing with non-smooth maps.

**Weak Derivatives of $\vert x \vert$**

Compute weak derivatives of $u(x)=\vert x \vert$.

Integrating by parts shows

$$
u'(x)=\operatorname{sgn}(x),\qquad u''(x)=2\delta(x),
$$

demonstrating how kinks generate Dirac deltas.

The absolute value function illustrates the power of weak differentiation: a function with a corner at the origin admits a weak derivative that is a step function, and the second derivative reveals the singularity as a delta function. This example shows that weak derivatives capture the essential structure of functions with discontinuities: the kink creates a jump in the first derivative, and this jump manifests as a point mass in the second derivative. Functions that are not classically differentiable can still have well-defined weak derivatives, expanding the class of objects we can differentiate.

**Membership in $H^{1}(0,1)$**

Is $u(x)=\vert x-\tfrac{1}{2} \vert$ in $H^{1}(0,1)$?

$u\in L^{2}(0,1)$ and $u'(x)=\operatorname{sgn}(x-\tfrac{1}{2})\in L^{2}(0,1)$, so $u\in H^{1}(0,1)$ with $\|u\|_{H^{1}}^{2}=\frac{13}{12}$.

This example shows that functions with a single corner can belong to $H^{1}$: the weak derivative exists and is square-integrable. However, the presence of the corner prevents membership in $H^{2}$, as the second derivative contains a delta function that is not square-integrable. The distinction between $H^{1}$ and $H^{2}$ reflects the degree of singularity: functions in $H^{1}$ can have kinks, while functions in $H^{2}$ must be smoother.

**Failure of $H^{2}$ Membership**

The second derivative $u''=2\delta(x-\tfrac{1}{2})$ is not in $L^{2}$, so $u\notin H^{2}(0,1)$. Hence $H^{2}\subsetneq H^{1}$.

The hierarchy of Sobolev spaces captures increasing degrees of smoothness: each additional derivative that must be square-integrable imposes stricter regularity requirements. The failure of $H^{2}$ membership for functions with corners shows that weak differentiability is more permissive than classical differentiability, but still imposes constraints that become stronger as we demand more derivatives.

**Chain Rule Failure**

Let $f(t)=t^{2}$ and $u(x)=\vert x \vert$. Compute $(f\circ u)'$ weakly.

Direct computation yields

$$
(f\circ u)' = -4\vert x \vert + 2\delta(x),
$$

whereas the classical chain rule would predict $2\vert x \vert \operatorname{sgn}(x)$. The discrepancy arises from the singularity at $x=0$.

The failure of the chain rule for weak derivatives reveals that composition with non-smooth functions can create singularities that are not captured by the classical formula. The delta function contribution arises from the interaction between the square function and the absolute value at the origin: composing a smooth function with a non-smooth one can generate distributional terms. This example shows that weak differentiation requires careful handling of compositions, as the classical rules need not apply.

## Sobolev Spaces

For integer $k\ge 0$, the **Sobolev space** $H^{k}(\Omega)=W^{k,2}(\Omega)$ consists of functions $u\in L^{2}(\Omega)$ whose weak derivatives $D^{\alpha}u$ belong to $L^{2}(\Omega)$ for all $\vert \alpha \vert \le k$. The inner product

$$
\langle u,v\rangle_{H^{k}}=\sum_{\vert \alpha \vert \le k}\int_{\Omega} D^{\alpha}u(x)\,\overline{D^{\alpha}v(x)}\,dx
$$

induces the norm $\|u\|_{H^{k}}=\langle u,u\rangle_{H^{k}}^{1/2}$. Equipped with this norm, $H^{k}(\Omega)$ is a Hilbert space. The **Meyers–Serrin theorem** states $C^{\infty}(\Omega)\cap H^{k}(\Omega)$ is dense in $H^{k}(\Omega)$, enabling approximation of Sobolev functions by smooth functions.

**Meyers–Serrin Approximation**

Let $u(x)=\vert x-\tfrac{1}{2} \vert$ and $\rho_{\epsilon}$ be a mollifier. Then $u_{\epsilon}=u*\rho_{\epsilon}\in C^{\infty}$ and $\|u-u_{\epsilon}\|_{H^{1}}\to 0$, illustrating density of smooth functions.

The Meyers–Serrin theorem provides a crucial approximation tool: any Sobolev function can be approximated arbitrarily well by smooth functions in the Sobolev norm. This result bridges the gap between classical and weak analysis, allowing us to extend techniques from smooth functions to Sobolev spaces. Mollification demonstrates the constructive aspect: convolution with a smooth approximate identity regularizes the function while preserving its Sobolev norm in the limit.

## Sobolev Embeddings

Sobolev spaces control classical regularity through embeddings. If $k> n/2$, then $H^{k}(\Omega)$ embeds continuously into $C^{0}(\bar{\Omega})$; more generally, for $k - \ell > n/2$, $H^{k}(\Omega)\hookrightarrow C^{\ell}(\bar{\Omega})$. In the scale $H^{1}$, Gagliardo–Nirenberg–Sobolev inequalities provide $H^{1}(\mathbb{R}^{n})\hookrightarrow L^{p}(\mathbb{R}^{n})$ for $2\le p \le 2n/(n-2)$ when $n\ge 3$. These embeddings quantify when finite energy implies continuity or boundedness.

**Sobolev Embedding in 1D**

Prove $\|u\|_{L^{\infty}(0,1)}\le \sqrt{2}\|u\|_{H^{1}(0,1)}$ for $u(0)=0$.

Using Cauchy–Schwarz,

$$
\vert u(x) \vert =\vert \int_{0}^{x}u'(t)\,dt\vert \le \sqrt{x}\|u'\|_{L^{2}}\le \|u'\|_{L^{2}}.
$$

Together with Poincaré's inequality $\|u\|_{L^{2}}\le \|u'\|_{L^{2}}$, we obtain the stated bound.

In one dimension, $H^{1}$ functions are automatically continuous: the fundamental theorem of calculus, combined with the square-integrability of the derivative, ensures boundedness. This embedding is sharp in the sense that $H^{1}$ functions can have discontinuities in higher dimensions, where the condition $k > n/2$ is more restrictive. The proof reveals the mechanism: control of the derivative provides pointwise control through integration, but only when there are enough derivatives relative to the dimension.

**Critical Embedding Failure**

Let $u_{\epsilon}(x)=\vert \log x \vert^{1/4}\chi_{(0,\epsilon)}(x)$. Then $\|u_{\epsilon}\|_{H^{1}}\to C<\infty$ as $\epsilon\to 0$, but $\|u_{\epsilon}\|_{L^{4}}\to\infty$. Hence no embedding $H^{1}\hookrightarrow L^{p}$ exists at the critical exponent.

The critical exponent $p = 2n/(n-2)$ marks the boundary of Sobolev embeddings: functions in $H^{1}$ need not belong to $L^{p}$ when $p$ equals the critical exponent. This failure occurs because the borderline case allows functions with logarithmic singularities that are square-integrable but fail to be in the critical Lebesgue space. The counterexample shows that Sobolev embeddings are sharp: the inequalities hold for subcritical exponents but fail exactly at the critical exponent.

**Sobolev Embedding in $\mathbb{R}^{2}$**

For $u(r)=\log(1/r)$ in the unit disk, $\nabla u=1/r$ is not square-integrable. However, its regularizations $u_{\epsilon}(r)=\log((1+\epsilon)/r)$ belong to $H^{1}$ and illustrate the borderline nature of $H^{1}(\mathbb{R}^{2})$ embeddings.

In two dimensions, the critical embedding is borderline: the logarithmic fundamental solution of the Laplacian barely fails to belong to $H^{1}$ due to the $1/r$ singularity in its gradient. Regularizations of this function show how close we can get: functions that are almost in $H^{1}$ can still exhibit singular behavior. This example illustrates the dimensional dependence of Sobolev embeddings: as dimension increases, more derivatives are needed to guarantee continuity, and the critical exponents shift accordingly.

## Poincaré Inequalities

Poincaré inequalities provide control of functions by their derivatives when boundary conditions are imposed. They are fundamental to establishing coercivity in variational problems.

**Poincaré–Friedrichs Inequality**

For $u\in H^{1}_{0}(0,1)$,

$$
\|u\|_{L^{2}(0,1)}^{2}\le \int_{0}^{1}\int_{0}^{1}\vert u'(t) \vert^{2}\,dt\,dx = \|u'\|_{L^{2}}^{2}.
$$

This inequality quantifies control of $u$ by its gradient.

The Poincaré inequality shows that for functions vanishing on the boundary, the $L^{2}$ norm is controlled by the $L^{2}$ norm of the derivative. This result is essential for establishing coercivity in variational formulations: it ensures that the energy functional is bounded below by a multiple of the $H^{1}$ norm, guaranteeing that minimizers exist. The proof uses the fundamental theorem of calculus and the boundary condition to bound the function in terms of its derivative.

## Trace Theory

To impose boundary conditions on $H^{1}$ functions, one defines the **trace operator** $\gamma:C^{\infty}(\bar{\Omega})\to C^{\infty}(\partial\Omega)$ by $\gamma u = u\vert_{\partial \Omega}$. Using Sobolev estimates, $\gamma$ extends uniquely to a bounded map $\gamma:H^{1}(\Omega)\to H^{1/2}(\partial \Omega)$ with $\|\gamma u\|_{L^{2}(\partial \Omega)} \le C\|u\|_{H^{1}(\Omega)}$. The subspace $\ker(\gamma)=H^{1}_{0}(\Omega)$ provides the correct setting for homogeneous Dirichlet problems.

**Trace of $\sqrt{x}$**

For $u(x)=\sqrt{x}$ on $(0,1)$, the trace at $x=0$ satisfies

$$
\gamma u(0)=\lim_{\epsilon\to 0^+}\frac{1}{2\epsilon}\int_{-\epsilon}^{\epsilon}\sqrt{\vert x \vert}\,dx=0,
$$

while $\gamma u(1)=1$. Thus $u$ admits well-defined boundary values in the trace sense.

The trace theorem resolves a fundamental difficulty: functions in $H^{1}$ need not be continuous, so their boundary values cannot be defined pointwise. However, the trace operator provides a well-defined notion of boundary values that is compatible with the Sobolev structure. The example of $\sqrt{x}$ shows that functions can approach zero at a boundary point in the trace sense even though they may not be continuous there: the averaging process in the trace definition smooths out pointwise irregularities.

**Trace Space $H^{1/2}$**

The function $g(t)=t^{-1/4}$ lies in $L^{2}(0,1)$ but not in $H^{1/2}(0,1)$, since

$$
\iint_{(0,1)^{2}}\frac{\vert g(t)-g(s) \vert^{2}}{\vert t-s \vert^{2}}\,ds\,dt=\infty.
$$

Thus $H^{1/2}(\partial\Omega)\subsetneq L^{2}(\partial\Omega)$.

The trace space $H^{1/2}$ has a fractional smoothness index: it consists of functions that are "half a derivative" smoother than $L^{2}$. The characterization through difference quotients shows that $H^{1/2}$ functions must have controlled oscillation: the integral of squared differences divided by squared distances must be finite. This fractional smoothness arises naturally from the trace theorem: the boundary of an $n$-dimensional domain has dimension $n-1$, so the smoothness requirement is reduced by $1/2$ derivative when restricting to the boundary.

**Extension Operator**

Define $\tilde{u}(x)=u(x)$ for $x\in(0,1)$, extend odd into $(-1,0)$, and set $\tilde{u}=0$ outside $(-1,1)$. Then $\tilde{u}\in H^{1}(\mathbb{R})$ and coincides with $u$ on $(0,1)$, demonstrating existence of bounded extension operators for Lipschitz domains.

Extension operators allow us to extend Sobolev functions from a domain to a larger set while preserving the Sobolev norm (up to a constant). The construction for intervals uses reflection: extending a function as odd across a boundary point preserves $H^{1}$ membership because the jump in the function is compensated by continuity of the derivative. This result is crucial for applying results on $\mathbb{R}^{n}$ to bounded domains: we can extend functions, apply theorems, and restrict back to the original domain.

## Challenge Problems

The following problems synthesize concepts from weak derivatives, Sobolev spaces, embeddings, and trace theory.

### Challenge 1: Weak Derivative and Chain Rule

Consider the function $u(x) = x^2 \vert x \vert$ on $\mathbb{R}$. Compute the weak first and second derivatives of $u$. Then show that if $f \in C^1(\mathbb{R})$ and $u \in H^1(\Omega)$, the weak derivative of $f \circ u$ satisfies $(f \circ u)' = f'(u) \cdot u'$ provided that $f'$ is bounded. Determine what conditions are needed for this chain rule to hold.

*(Hint: Test against $\phi \in C_c^{\infty}(\mathbb{R})$ and use integration by parts. Consider the case $f(t) = t^2$ explicitly.)*

<details>
<summary><strong>Expand Solution</strong></summary>

For $u(x) = x^2 \vert x \vert$, we have $u(x) = x^2 \cdot x = x^3$ for $x \ge 0$ and $u(x) = x^2 \cdot (-x) = -x^3$ for $x < 0$, so $u(x) = x^2 \vert x \vert = \operatorname{sgn}(x) x^3$.

For $x \neq 0$, the classical derivative is $u'(x) = 3x^2 \operatorname{sgn}(x) = 3x \vert x \vert$. Testing against $\phi \in C_c^{\infty}(\mathbb{R})$:

$$
\langle u', \phi \rangle = -\langle u, \phi' \rangle = -\int_{-\infty}^{\infty} x^2 \vert x \vert \phi'(x) \, dx.
$$

Integrating by parts on $(-\infty, 0)$ and $(0, \infty)$ separately:

$$
= -\int_{-\infty}^{0} -x^3 \phi'(x) \, dx - \int_{0}^{\infty} x^3 \phi'(x) \, dx = \int_{-\infty}^{0} 3x^2 \phi(x) \, dx - \int_{0}^{\infty} 3x^2 \phi(x) \, dx = \int_{-\infty}^{\infty} 3x \vert x \vert \phi(x) \, dx.
$$

So $u'(x) = 3x \vert x \vert$ weakly. For the second derivative, $u''(x) = 6 \vert x \vert$ classically for $x \neq 0$. Testing:

$$
\langle u'', \phi \rangle = -\langle u', \phi' \rangle = -\int_{-\infty}^{\infty} 3x \vert x \vert \phi'(x) \, dx.
$$

Integrating by parts gives $u''(x) = 6 \vert x \vert$ weakly.

For the chain rule with $f \in C^1$ and bounded $f'$, we test $(f \circ u)'$:

$$
\langle (f \circ u)', \phi \rangle = -\int f(u(x)) \phi'(x) \, dx.
$$

If $f'$ is bounded and $u \in H^1$, then $f \circ u \in H^1$ and integration by parts gives:

$$
\langle (f \circ u)', \phi \rangle = \int f'(u(x)) u'(x) \phi(x) \, dx = \langle f'(u) \cdot u', \phi \rangle.
$$

The boundedness of $f'$ ensures that $f'(u) u' \in L^2$, making the chain rule valid. Without boundedness, $f'(u) u'$ may not be square-integrable, and the chain rule can fail.

This demonstrates that weak derivatives preserve the chain rule when the composition is sufficiently regular, but the conditions are more restrictive than in the classical case. The boundedness requirement ensures that the product $f'(u) u'$ remains in $L^2$, which is necessary for the weak derivative to be well-defined.

</details>

### Challenge 2: Critical Sobolev Embedding

For $n \ge 3$, show that $H^1(\mathbb{R}^n) \hookrightarrow L^{2n/(n-2)}(\mathbb{R}^n)$ but that this embedding fails for the critical exponent in the sense that there exist functions in $H^1(\mathbb{R}^n)$ that are not in $L^{2n/(n-2)}(\mathbb{R}^n)$. Construct an explicit example using functions of the form $u(x) = \vert x \vert^{-\alpha} \chi(\vert x \vert)$ for appropriate $\alpha$ and cutoff function $\chi$.

*(Hint: Compute $\|u\|_{H^1}$ and $\|u\|_{L^p}$ for $p = 2n/(n-2)$ using spherical coordinates. The borderline case occurs when the integrals diverge logarithmically.)*

<details>
<summary><strong>Expand Solution</strong></summary>

For $u(x) = \vert x \vert^{-\alpha} \chi(\vert x \vert)$ with $\chi$ a smooth cutoff function supported in the unit ball, we compute norms using spherical coordinates.

For $\vert x \vert^{-\alpha}$ to be in $L^2$ near the origin, we need $\int_0^1 r^{n-1} r^{-2\alpha} \, dr < \infty$, which requires $\alpha < n/2$.

For $\vert \nabla u \vert = \alpha \vert x \vert^{-\alpha-1}$ to be in $L^2$, we need $\int_0^1 r^{n-1} r^{-2(\alpha+1)} \, dr < \infty$, which requires $\alpha < (n-2)/2$.

So $u \in H^1$ requires $\alpha < (n-2)/2$.

For $u \in L^p$ with $p = 2n/(n-2)$, we need $\int_0^1 r^{n-1} r^{-\alpha p} \, dr < \infty$, i.e., $\alpha < n/p = (n-2)/2$.

At the critical exponent, when $\alpha = (n-2)/2$, we have:

$$
\int_0^1 r^{n-1} r^{-(n-2)} \, dr = \int_0^1 \frac{1}{r} \, dr = \infty,
$$

so $u \notin L^{2n/(n-2)}$.

However, to show $u \in H^1$ even at the borderline, we need a more refined construction. Take $u(x) = \vert x \vert^{-(n-2)/2} (-\log \vert x \vert)^{-1/2} \chi(\vert x \vert)$ for $\vert x \vert < 1/2$, and $u(x) = 0$ otherwise.

Then $\vert \nabla u \vert^2 \sim \vert x \vert^{-n} (-\log \vert x \vert)^{-1}$ near the origin, and

$$
\int_0^{1/2} r^{n-1} r^{-n} (-\log r)^{-1} \, dr = \int_0^{1/2} \frac{1}{r(-\log r)} \, dr < \infty
$$

by the substitution $t = -\log r$. So $u \in H^1$.

But $\vert u \vert^p \sim \vert x \vert^{-n} (-\log \vert x \vert)^{-n/(n-2)}$, and

$$
\int_0^{1/2} r^{n-1} r^{-n} (-\log r)^{-n/(n-2)} \, dr = \int_0^{1/2} \frac{1}{r(-\log r)^{n/(n-2)}} \, dr = \infty
$$

since $n/(n-2) \le 2$ for $n \ge 3$. Thus $u \in H^1$ but $u \notin L^{2n/(n-2)}$, showing that the embedding fails at the critical exponent.

This construction reveals that the critical Sobolev embedding is sharp: functions can belong to $H^1$ while failing to be in the critical Lebesgue space. The logarithmic factor provides just enough regularity to keep the function in $H^1$ while allowing it to be too singular for the critical $L^p$ space. The borderline behavior reflects the dimensional scaling that makes $2n/(n-2)$ critical: at this exponent, the scaling of the $L^p$ norm matches the scaling of the $H^1$ norm, making the embedding borderline.

</details>

### Challenge 3: Trace Operator and Extension

Let $\Omega = \{(x,y) \in \mathbb{R}^2 : x^2 + y^2 < 1\}$ be the unit disk. Show that the trace operator $\gamma: H^1(\Omega) \to H^{1/2}(\partial \Omega)$ is surjective. Construct an explicit right inverse (extension operator) that maps $H^{1/2}(\partial \Omega)$ into $H^1(\Omega)$.

*(Hint: Use polar coordinates and Fourier series on the circle. For a function $g(\theta)$ on $\partial \Omega$, define its extension by $u(r,\theta) = \sum_{n \in \mathbb{Z}} c_n r^{\vert n \vert} e^{in\theta}$ where $c_n$ are the Fourier coefficients of $g$.)*

<details>
<summary><strong>Expand Solution</strong></summary>

For a function $g(\theta) = \sum_{n \in \mathbb{Z}} c_n e^{in\theta}$ on $\partial \Omega$, define the extension:

$$
u(r,\theta) = \sum_{n \in \mathbb{Z}} c_n r^{\vert n \vert} e^{in\theta}.
$$

This function is harmonic in $\Omega$ (since each term $r^{\vert n \vert} e^{in\theta}$ is harmonic) and satisfies $u(1,\theta) = g(\theta)$.

To show $u \in H^1(\Omega)$, compute:

$$
\|u\|_{H^1(\Omega)}^2 = \int_0^1 \int_0^{2\pi} \left( \vert u \vert^2 + \vert \partial_r u \vert^2 + \frac{1}{r^2} \vert \partial_\theta u \vert^2 \right) r \, dr \, d\theta.
$$

Using the orthogonality of $e^{in\theta}$:

$$
\|u\|_{H^1(\Omega)}^2 = 2\pi \sum_{n \in \mathbb{Z}} \vert c_n \vert^2 \int_0^1 \left( r^{2\vert n \vert + 1} + \vert n \vert^2 r^{2\vert n \vert - 1} + n^2 r^{2\vert n \vert - 1} \right) dr.
$$

For $n = 0$: $\int_0^1 r \, dr = 1/2$.

For $n \neq 0$: $\int_0^1 r^{2\vert n \vert + 1} \, dr = 1/(2\vert n \vert + 2)$, and $\int_0^1 \vert n \vert^2 r^{2\vert n \vert - 1} \, dr = \vert n \vert / 2$.

So:

$$
\|u\|_{H^1(\Omega)}^2 = 2\pi \left( \vert c_0 \vert^2 \cdot \frac{1}{2} + \sum_{n \neq 0} \vert c_n \vert^2 \left( \frac{1}{2\vert n \vert + 2} + \vert n \vert \right) \right) \le C \sum_{n \in \mathbb{Z}} (1 + \vert n \vert) \vert c_n \vert^2.
$$

The trace norm is:

$$
\|g\|_{H^{1/2}(\partial \Omega)}^2 = \sum_{n \in \mathbb{Z}} (1 + \vert n \vert) \vert c_n \vert^2,
$$

so $\|u\|_{H^1(\Omega)} \le C \|g\|_{H^{1/2}(\partial \Omega)}$, showing the extension operator is bounded.

Surjectivity follows because every $g \in H^{1/2}(\partial \Omega)$ has a Fourier expansion with coefficients satisfying $\sum (1 + \vert n \vert) \vert c_n \vert^2 < \infty$, and the extension $u$ defined above belongs to $H^1(\Omega)$ with $\gamma u = g$.

The harmonic extension provides a canonical way to extend boundary data: by solving Laplace's equation, we obtain a function whose boundary values match the given data. The Fourier series representation makes the $H^1$ and $H^{1/2}$ norms computable, revealing that the extension operator is bounded and surjective. This construction shows that the trace operator has a bounded right inverse, making it a quotient map from $H^1(\Omega)$ onto $H^{1/2}(\partial \Omega)$.

</details>

### Challenge 4: Sobolev Spaces and Regularity

Show that if $u \in H^k(\Omega)$ for all $k \ge 0$, then $u \in C^{\infty}(\Omega)$. Conversely, construct a function $u \in C^{\infty}(\Omega) \cap L^2(\Omega)$ such that $u \notin H^1(\Omega)$ (hint: consider functions with unbounded derivatives).

*(Hint: Use Sobolev embeddings iteratively. For the converse, consider $u(x) = x^{-1/4}$ on $(0,1)$ extended smoothly.)*

<details>
<summary><strong>Expand Solution</strong></summary>

If $u \in H^k(\Omega)$ for all $k$, then for any fixed $k > n/2$, the Sobolev embedding gives $u \in C^0(\bar{\Omega})$. Since $u \in H^{k+1}$, we have $\partial_i u \in H^k$ for each $i$, so $\partial_i u \in C^0$ as well (for $k > n/2$). Iterating, all derivatives of $u$ are continuous, so $u \in C^{\infty}(\Omega)$.

More precisely, if $u \in \bigcap_{k=0}^{\infty} H^k(\Omega)$, then for any multi-index $\alpha$, we have $D^{\alpha} u \in H^k$ for all $k$. Taking $k > n/2 + \vert \alpha \vert$, the Sobolev embedding gives $D^{\alpha} u \in C^0$, so $u \in C^{\infty}$.

For the converse, consider $u(x) = x^{-1/4}$ on $(0,1)$ and extend it to a smooth function on $\mathbb{R}$ that vanishes outside $(0,2)$. Then $u \in C^{\infty}(\mathbb{R} \setminus \{0\})$, and near $0$, $u$ is smooth except at the origin.

We have $\int_0^1 x^{-1/2} \, dx = 2 < \infty$, so $u \in L^2(0,1)$.

However, $u'(x) = -\frac{1}{4} x^{-5/4}$ for $x > 0$, and $\int_0^1 x^{-5/2} \, dx = \infty$, so $u' \notin L^2(0,1)$, hence $u \notin H^1(0,1)$.

This shows that membership in all Sobolev spaces is strictly stronger than smoothness: a function can be smooth and square-integrable yet fail to have square-integrable derivatives. The condition $u \in H^k$ for all $k$ requires that not only is $u$ smooth, but all its derivatives must be square-integrable, which is a much stronger requirement. This distinction is crucial: Sobolev spaces measure not just smoothness but also the decay of derivatives, ensuring that functions and their derivatives are controlled in an $L^2$ sense.

</details>

Sobolev spaces provide the energy framework needed for variational methods: functions with square-integrable weak derivatives form Hilbert spaces that are naturally suited for minimization problems. The embedding theorems connect weak and classical regularity, showing that sufficient energy implies smoothness. Trace theory enables the imposition of boundary conditions, making Sobolev spaces the natural setting for boundary-value problems. However, Sobolev spaces alone do not guarantee existence of solutions: we need compactness results and coercivity estimates, which will be provided by the Lax-Milgram theorem and the spectral theory developed in subsequent sections.

## References

* **Adams, R. A., & Fournier, J. J. F. (2003).** *Sobolev Spaces*. Academic Press.
* **Brezis, H. (2011).** *Functional Analysis, Sobolev Spaces and Partial Differential Equations*. Springer.
* **Evans, L. C. (2010).** *Partial Differential Equations*. American Mathematical Society.
* **Folland, G. B. (1999).** *Real Analysis: Modern Techniques and Their Applications*. Wiley.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 2.1 Distributions & Test Functions]({{ '/diffequations/chapter-02/02-1-distributions/' | relative_url }})
- [Next Section: 2.3 Hilbert Space Theory & Spectral Theorem]({{ '/diffequations/chapter-02/02-3-hilbert-spaces/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-02/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
