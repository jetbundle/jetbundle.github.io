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

# Section 2.2: Sobolev Spaces & Weak Derivatives

## Introduction

Distributions are too rough for physics (they lack energy concepts). We define **Sobolev Spaces** $H^k$ based on the $L^2$ integrability of weak derivatives. The **Sobolev Embedding Theorems** provide the crucial bridge: sufficient "weak" energy implies classical continuity. We rigorously construct **Trace Operators** to handle boundary conditions, resolving the convergence issues of eigenfunction expansions.
## Mathematical Content

### Weak Derivatives

For $u,v \in L^1_{\text{loc}}(\Omega)$ and multi-index $\alpha$, we define $D^{\alpha}u = v$ in the **weak sense** if

$$
\int_{\Omega} u(x) D^{\alpha}\phi(x)\,dx = (-1)^{|\alpha|} \int_{\Omega} v(x)\phi(x)\,dx
$$

for all $\phi \in C_{c}^{\infty}(\Omega)$. If the classical derivative exists, it coincides with the weak derivative; conversely, functions such as $|x|$ have weak derivatives despite lacking classical differentiability everywhere. Weak derivatives are linear, satisfy Leibniz rules when multiplying by smooth functions, but the classical chain rule can fail when composing with non-smooth maps.

### Sobolev Spaces

For integer $k\ge 0$, the Sobolev space $H^{k}(\Omega)=W^{k,2}(\Omega)$ consists of functions $u\in L^{2}(\Omega)$ whose weak derivatives $D^{\alpha}u$ belong to $L^{2}(\Omega)$ for all $|\alpha|\le k$. The inner product

$$
\langle u,v\rangle_{H^{k}}=\sum_{|\alpha|\le k}\int_{\Omega} D^{\alpha}u(x)\,\overline{D^{\alpha}v(x)}\,dx
$$

induces the norm $\|u\|_{H^{k}}=\langle u,u\rangle_{H^{k}}^{1/2}$. Equipped with this norm, $H^{k}(\Omega)$ is a Hilbert space. The Meyers–Serrin theorem states $C^{\infty}(\Omega)\cap H^{k}(\Omega)$ is dense in $H^{k}(\Omega)$, enabling approximation of Sobolev functions by smooth functions.

### Sobolev Embedding

Sobolev spaces control classical regularity through embeddings. If $k> n/2$, then $H^{k}(\Omega)$ embeds continuously into $C^{0}(\bar{\Omega})$; more generally, for $k - \ell > n/2$, $H^{k}(\Omega)\hookrightarrow C^{\ell}(\bar{\Omega})$. In the scale $H^{1}$, Gagliardo–Nirenberg–Sobolev inequalities provide $H^{1}(\mathbb{R}^{n})\hookrightarrow L^{p}(\mathbb{R}^{n})$ for $2\le p \le 2n/(n-2)$ when $n\ge 3$. These embeddings quantify when finite energy implies continuity or boundedness.

### Trace Theorem

To impose boundary conditions on $H^{1}$ functions, one defines the trace operator $\gamma:C^{\infty}(\bar{\Omega})\to C^{\infty}(\partial\Omega)$ by $\gamma u = u|_{\partial \Omega}$. Using Sobolev estimates, $\gamma$ extends uniquely to a bounded map $\gamma:H^{1}(\Omega)\to H^{1/2}(\partial \Omega)$ with $\|\gamma u\|_{L^{2}(\partial \Omega)} \le C\|u\|_{H^{1}(\Omega)}$. The subspace $\ker(\gamma)=H^{1}_{0}(\Omega)$ provides the correct setting for homogeneous Dirichlet problems.

## Complete Examples

### Example 2.2.1: Weak Derivative of the Heaviside Function

**Problem:** Show $H'(x)=\delta(x)$ weakly.

For $\phi\in C_{c}^{\infty}(\mathbb{R})$,

$$
\int_{\mathbb{R}} H(x) \phi'(x)\,dx = \int_{0}^{\infty}\phi'(x)\,dx = -\phi(0) = -\int_{\mathbb{R}}\delta(x)\phi(x)\,dx.
$$

Thus $H'=\delta$ in $\mathcal{D}'$.

### Example 2.2.2: Weak Derivatives of $|x|$

**Problem:** Compute weak derivatives of $u(x)=|x|$.

Integrating by parts shows

$$
u'(x)=\operatorname{sgn}(x),\qquad u''(x)=2\delta(x),
$$

demonstrating how kinks generate Dirac deltas.

### Example 2.2.3: Chain Rule Failure

**Problem:** Let $f(t)=t^{2}$ and $u(x)=|x|$. Compute $(f\circ u)'$ weakly.

Direct computation yields

$$
(f\circ u)' = -4|x| + 2\delta(x),
$$

whereas the classical chain rule would predict $2|x|\operatorname{sgn}(x)$. The discrepancy arises from the singularity at $x=0$.

### Example 2.2.4: Membership in $H^{1}(0,1)$

**Problem:** Is $u(x)=|x-\tfrac{1}{2}|$ in $H^{1}(0,1)$?

$u\in L^{2}(0,1)$ and $u'(x)=\operatorname{sgn}(x-\tfrac{1}{2})\in L^{2}(0,1)$, so $u\in H^{1}(0,1)$ with $\|u\|_{H^{1}}^{2}=\frac{13}{12}$.

### Example 2.2.5: Failure of $H^{2}$ Membership

The second derivative $u''=2\delta(x-\tfrac{1}{2})$ is not in $L^{2}$, so $u\notin H^{2}(0,1)$. Hence $H^{2}\subsetneq H^{1}$.

### Example 2.2.6: Sobolev Embedding in 1D

**Problem:** Prove $\|u\|_{L^{\infty}(0,1)}\le \sqrt{2}\|u\|_{H^{1}(0,1)}$ for $u(0)=0$.

Using Cauchy–Schwarz,

$$
|u(x)|=\left|\int_{0}^{x}u'(t)\,dt\right|\le \sqrt{x}\|u'\|_{L^{2}}\le \|u'\|_{L^{2}}.
$$

Together with Poincaré’s inequality $\|u\|_{L^{2}}\le \|u'\|_{L^{2}}$, we obtain the stated bound.

### Example 2.2.7: Critical Embedding Failure

Let $u_{\epsilon}(x)=|\log x|^{1/4}\chi_{(0,\epsilon)}(x)$. Then $\|u_{\epsilon}\|_{H^{1}}\to C<\infty$ as $\epsilon\to 0$, but $\|u_{\epsilon}\|_{L^{4}}\to\infty$. Hence no embedding $H^{1}\hookrightarrow L^{p}$ exists at the critical exponent.

### Example 2.2.8: Sobolev Embedding in $\mathbb{R}^{2}$

For $u(r)=\log(1/r)$ in the unit disk, $\nabla u=1/r$ is not square-integrable. However, its regularizations $u_{\epsilon}(r)=\log((1+\epsilon)/r)$ belong to $H^{1}$ and illustrate the borderline nature of $H^{1}(\mathbb{R}^{2})$ embeddings.

### Example 2.2.9: Trace of $\sqrt{x}$

For $u(x)=\sqrt{x}$ on $(0,1)$, the trace at $x=0$ satisfies

$$
\gamma u(0)=\lim_{\epsilon\to 0^+}\frac{1}{2\epsilon}\int_{-\epsilon}^{\epsilon}\sqrt{|x|}\,dx=0,
$$

while $\gamma u(1)=1$. Thus $u$ admits well-defined boundary values in the trace sense.

### Example 2.2.10: Poincaré–Friedrichs Inequality

For $u\in H^{1}_{0}(0,1)$,

$$
\|u\|_{L^{2}(0,1)}^{2}\le \int_{0}^{1}\int_{0}^{1}|u'(t)|^{2}\,dt\,dx = \|u'\|_{L^{2}}^{2}.
$$

This inequality quantifies control of $u$ by its gradient.

### Example 2.2.11: Meyers–Serrin Approximation

Let $u(x)=|x-\tfrac{1}{2}|$ and $\rho_{\epsilon}$ be a mollifier. Then $u_{\epsilon}=u*\rho_{\epsilon}\in C^{\infty}$ and $\|u-u_{\epsilon}\|_{H^{1}}\to 0$, illustrating density of smooth functions.

### Example 2.2.12: Trace Space $H^{1/2}$

The function $g(t)=t^{-1/4}$ lies in $L^{2}(0,1)$ but not in $H^{1/2}(0,1)$, since

$$
\iint_{(0,1)^{2}}\frac{|g(t)-g(s)|^{2}}{|t-s|^{2}}\,ds\,dt=\infty.
$$

Thus $H^{1/2}(\partial\Omega)\subsetneq L^{2}(\partial\Omega)$.

### Example 2.2.13: Extension Operator

Define $\tilde{u}(x)=u(x)$ for $x\in(0,1)$, extend odd into $(-1,0)$, and set $\tilde{u}=0$ outside $(-1,1)$. Then $\tilde{u}\in H^{1}(\mathbb{R})$ and coincides with $u$ on $(0,1)$, demonstrating existence of bounded extension operators for Lipschitz domains.

## References

* Adams, R. A., & Fournier, J. J. F. (2003). *Sobolev Spaces*. Academic Press.
* Brezis, H. (2011). *Functional Analysis, Sobolev Spaces and Partial Differential Equations*. Springer.
* Evans, L. C. (2010). *Partial Differential Equations*. American Mathematical Society.
* Folland, G. B. (1999). *Real Analysis: Modern Techniques and Their Applications*. Wiley.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 2.1 Distributions & Test Functions]({{ '/diffequations/chapter-02/02-1-distributions/' | relative_url }})
- [Next Section: 2.3 Hilbert Space Theory & Spectral Theorem]({{ '/diffequations/chapter-02/02-3-hilbert-spaces/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-02/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
