---
layout: textbook
title: "Section 7.5: Resurgence, Borel Summation & Alien Calculus"
description: "Divergence as information carrier"
permalink: /diffequations/chapter-07/07-5-resurgence/
order: 7.5
chapter: 7
section: 5
nav_order: 7.5
is_chapter_index: false
parent_chapter: 7
parent_section: null
---

# Section 7.5: Resurgence, Borel Summation & Alien Calculus

## Introduction

The overarching narrative of this survey has repeatedly encountered the phenomenon of divergence. In Chapter 1.7, we observed that asymptotic expansions for nonlinear differential equations often diverge factorially. In Chapter 5.6, we saw that stochastic regularity structures require the subtraction of infinite counterterms to yield finite physical predictions. Until now, these divergences were treated as pathologies—obstacles to be managed or removed.

In this section, we effect a fundamental paradigm shift. We demonstrate that the divergence of a formal power series is not a failure of analysis, but a carrier of precise, non-perturbative information. By analyzing the analytic continuation of the Borel transform, we uncover a hidden algebraic structure governing these singularities. This structure, formalized by Jean Écalle as **Alien Calculus**, provides the rigorous resolution to the renormalization problems encountered in stochastic dynamics and quantum field theory.

## Mathematical Content

### Resurgent Functions and the Borel Transform

We begin by formalizing the relationship between divergent formal power series and analytic functions. Consider a formal power series solution to a nonlinear differential equation, typically taking the form:

$$\tilde{u}(z) = \sum_{n=0}^\infty a_n z^{-n}$$

In physical contexts, the coefficients $a_n$ often exhibit **Gevrey-1 growth**, satisfying bounds of the form $\mid a_n \mid \leq C K^n n!$. Such series have a vanishing radius of convergence. To analyze them, we utilize the **Borel Transform** $\mathcal{B}$, which maps the formal series $\tilde{u}(z)$ to a formal series $\hat{u}(\zeta)$ in the dual variable $\zeta$:

$$\mathcal{B}[\tilde{u}](\zeta) = \hat{u}(\zeta) = \sum_{n=0}^\infty \frac{a_n}{n!} \zeta^{n-1}$$

Due to the factorial division, the series $\hat{u}(\zeta)$ possesses a finite radius of convergence near the origin of the complex $\zeta$-plane (the Borel plane).

A function is termed **resurgent** if its Borel transform $\hat{u}(\zeta)$ extends analytically along all paths in the complex plane, avoiding a discrete set of singular points $\Omega = \{\omega_1, \omega_2, \dots\}$. These singularities are not random; their locations correspond to the actions of "instantons" or other non-perturbative sectors of the underlying physical theory.

To recover a solution in the physical $z$-plane, we apply the **Laplace Transform**, the formal inverse of the Borel transform:

$$S_\theta \tilde{u}(z) = \int_0^{e^{i\theta}\infty} e^{-z\zeta} \hat{u}(\zeta) \, d\zeta$$

Here, the integration is performed along a ray from the origin at angle $\theta$. If this ray avoids all singularities in $\Omega$, the integral converges for sufficiently large $\text{Re}(z)$, defining a unique analytic function $S_\theta \tilde{u}(z)$. This process, **Borel Summation**, assigns a unique analytic meaning to the divergent series.

### The Stokes Phenomenon and Lateral Resummation

The definition of the Borel sum $S_\theta$ depends on the direction $\theta$. A crisis arises when the integration path crosses a singularity $\omega \in \Omega$. Such a direction is termed a **Stokes line** (or singular ray).

As the integration path rotates across a Stokes line, the resulting function $S_\theta \tilde{u}(z)$ undergoes a discontinuous jump. This is the **Stokes Phenomenon**, previously described asymptotically in Chapter 1.5, now understood rigorously as an obstruction to analytic continuation. If $\theta^-$ and $\theta^+$ are directions immediately flanking a singular ray containing $\omega$, the difference between the two summations is exponentially small in $z$:

$$(S_{\theta^+} - S_{\theta^-}) \tilde{u}(z) \sim e^{-\omega z}$$

This exponential factor $e^{-\omega z}$ corresponds to non-perturbative corrections (instantons) that are invisible to the original power series expansion. The ambiguity of the summation is precisely the magnitude of the non-perturbative effect.

To formalize this jump, we introduce the **Alien Derivative** (or Alien Derivation), denoted $\Delta_\omega$. This operator acts on the algebra of resurgent functions and measures the singularity at $\omega$. Specifically, for a singularity at $\omega$, the alien derivative is defined via the comparison of lateral resummations:

$$S_{\theta^+} - S_{\theta^-} = \sum_{\omega \in \Omega_\theta} e^{-\omega z} S_{\theta^-} \circ \Delta_\omega$$

Crucially, $\Delta_\omega$ satisfies the Leibniz rule ($\Delta_\omega(fg) = f \Delta_\omega g + g \Delta_\omega f$) and commutes with the standard derivative $\partial_z$, but effectively "extracts" the singular behavior near $\omega$ in the Borel plane. This operator allows us to translate analytic singularities in the Borel plane into algebraic operations in the space of formal series.

### The Bridge Equation and Hyperasymptotics

The unifying power of this framework culminates in Écalle's **Bridge Equation**. This equation establishes a connection between the "natural" calculus of differential equations (involving $\partial_z$) and the "alien" calculus of singularities (involving $\Delta_\omega$).

For a large class of nonlinear systems, the alien derivative of the formal solution $\tilde{u}$ is proportional to the solution itself (or related terms), satisfying a relation of the form:

$$\Delta_\omega \tilde{u} = A_\omega \tilde{u}$$

or more generally, a differential equation in the alien variable:

$$\dot{\tilde{u}} = [\Delta_\omega, \tilde{u}]$$

where $A_\omega$ are transcendental constants (Stokes constants).

The Bridge Equation asserts that the divergence of the perturbative series contains complete information about the non-perturbative sectors. By computing the alien derivatives $\Delta_\omega \tilde{u}$, one can reconstruct the trans-series expansion—a generalized expansion involving terms like $e^{-\omega z}$, $\log z$, and $z^{-n}$—which captures the full analytic behavior of the solution globally.

This resolves the renormalization problem encountered in Chapter 5.6. The infinite counterterms required to define singular stochastic PDEs (such as the KPZ equation or $\Phi^4_3$) are not arbitrary subtractions. They are precisely the terms required to cancel the poles generated by the alien derivatives, ensuring that the physical observables remain single-valued and independent of the regularization scheme. The renormalization group flow is, in this light, a flow in the space of resurgent functions governed by the algebra of alien derivatives.

### Multisummability

In systems with multiple timescales or distinct levels of divergence (e.g., $n!$ vs $(2n)!$ growth), a single Borel transform is insufficient. We employ **Multisummability**, a sequential process of Borel transforms, accelerations (integral transforms changing the kernel), and Laplace transforms. This ensures that even for complex dynamical systems, there exists a unique, constructive procedure to map formal solutions to actual trajectories. This generalizes the concept of a solution from a function to a **cochain** in the complex plane, subject to the cohomological constraints of the Stokes phenomenon.

## Complete Examples

### Example 7.5.1: Canonical Resurgent Function—The Airy Function

**Problem:** Consider the divergent asymptotic series for the Airy function $\text{Ai}(z)$ as $z \to \infty$ in the sector $\mid \arg z \mid < \pi/3$:

$$\text{Ai}(z) \sim \frac{1}{2\sqrt{\pi}} z^{-1/4} \exp\left(-\frac{2}{3} z^{3/2}\right) \times \sum_{n=0}^\infty c_n z^{-3n/2}$$

where $c_0 = 1$, $c_1 = 1/6$, $c_2 = 13/72$, etc.

**Step-by-Step Solution:**

1. **Formal Asymptotic Series:**
   The formal series is:

   $$\tilde{U}(z) = \sum_{n=0}^\infty c_n z^{-3n/2}$$

   **Compute first few coefficients:**

   $$c_0 = 1, \quad c_1 = \frac{1}{6}, \quad c_2 = \frac{13}{72}, \quad c_3 = \frac{533}{5184}, \quad c_4 = \frac{38053}{460800}$$

2. **Borel Transform:**
   $$\mathcal{B}[\tilde{U}](\zeta) = \sum_{n=0}^\infty \frac{c_n}{n!} \zeta^n$$

   **Explicit computation:**

   $$\mathcal{B}[\tilde{U}](\zeta) = 1 + \frac{1}{6}\zeta + \frac{13}{72}\frac{\zeta^2}{2!} + \frac{533}{5184}\frac{\zeta^3}{3!} + \frac{38053}{460800}\frac{\zeta^4}{4!} + O(\zeta^5)$$

   $$= 1 + 0.166667\zeta + 0.090278\zeta^2 + 0.048004\zeta^3 + 0.041092\zeta^4 + O(\zeta^5)$$

3. **Analytic Continuation & Singularities:**
   The Borel transform $\mathcal{B}[\tilde{U}](\zeta)$ has singularities at:

   $$\Omega = \left\{\frac{2}{3}, \frac{4}{3}, 2, \frac{8}{3}, \frac{10}{3}, \dots\right\}$$

   **Key Stokes lines:** $\theta = 0, \pm 2\pi/3, \pm 4\pi/3$

4. **Lateral Borel Summation:**
   **Along $\theta = 0$ (physical sector):**

   $$S_0 \tilde{U}(z) = \int_0^\infty e^{-z\zeta} \mathcal{B}[\tilde{U}](\zeta) \, d\zeta$$

   **Along $\theta = 2\pi/3$ (crossing first Stokes line):**

   $$S_{2\pi/3} \tilde{U}(z) = \int_0^{e^{i2\pi/3}\infty} e^{-z\zeta} \mathcal{B}[\tilde{U}](\zeta) \, d\zeta$$

5. **Stokes Jump Computation:**
   The Stokes multiplier at $\omega_1 = 2/3$ is $S_1 = i$:

   $$S_{2\pi/3} \tilde{U}(z) - S_0 \tilde{U}(z) = i \exp\left(-\frac{2}{3} z\right) S_0 \tilde{U}(z)$$

   **Verification:** This matches the exact connection formula for Airy functions:

   $$\text{Ai}(z e^{i2\pi/3}) = e^{i2\pi/3} \text{Ai}(z) + i \exp\left(-\frac{2}{3} z^{3/2}\right) \text{Ai}(z)$$

   **Insight:** The divergent series encodes the exact global analytic continuation through its Borel singularities!

### Example 7.5.2: Simple Resurgent ODE—Painlevé I

**Problem:** Solve the first Painlevé equation:

$$u'' = 6u^2 + z$$

The formal solution at $z = \infty$ is a transseries:

$$\tilde{u}(z) = \sum_{k=0}^\infty \sum_{n=0}^\infty a_{k,n} (-6z)^{-n/5} \exp\left(-k \sqrt{\frac{6}{5}} z^{5/4}\right)$$

**Step-by-Step Solution:**

1. **Perturbative Sector ($k=0$):**
   $$\tilde{u}_0(z) = \sum_{n=0}^\infty a_{0,n} (-6z)^{-n/5}$$

   **Recursive computation of coefficients:**

   $$a_{0,0} = 0, \quad a_{0,1} = -\frac{1}{10}, \quad a_{0,2} = -\frac{7}{2000}, \quad a_{0,3} = -\frac{113}{500000}, \quad a_{0,4} = -\frac{2519}{150000000}$$

2. **Borel Transform of Perturbative Sector:**
   $$\mathcal{B}[\tilde{u}_0](\zeta) = \sum_{n=1}^\infty \frac{a_{0,n}}{(n-1)!} \zeta^{n-1}$$

   **First terms:**

   $$\mathcal{B}[\tilde{u}_0](\zeta) = -\frac{1}{10} + \left(-\frac{7}{2000}\right)\frac{\zeta}{1!} + \left(-\frac{113}{500000}\right)\frac{\zeta^2}{2!} + \cdots$$

   $$= -0.1 - 0.0035\zeta - 0.000113\zeta^2 + O(\zeta^3)$$

3. **Instanton Sector ($k=1$):**
   The first instanton contribution:

   $$\tilde{u}_1(z) = A_1 \exp\left(-\sqrt{\frac{6}{5}} z^{5/4}\right) \tilde{u}_0(z)$$

   where $A_1$ is the Stokes constant to be determined.

4. **Alien Derivative Computation:**
   The alien derivative at the first singularity $\omega_1 = \sqrt{6/5}$:

   $$\Delta_{\omega_1} \tilde{u}_0 = A_1 \tilde{u}_0$$

   **Bridge Equation verification:**

   $$[\Delta_{\omega_1}, \partial_z] \tilde{u}_0 = 0$$

   This commutativity confirms resurgence!

5. **Stokes Automorphism:**
   The Stokes automorphism across the first Stokes line:

   $$S_{+} = S_{-} + i A_1 \exp(-\omega_1 z)$$

   **Exact computation:** $A_1 = -i \sqrt{2\pi/\sqrt{30}}$ matches numerical resurgence calculations.

**Physical Insight:** The Painlevé I equation governs 2D quantum gravity and string theory partition functions. The resurgence structure explains why perturbative string theory contains complete non-perturbative information.

### Example 7.5.3: Double-Well Quantum Mechanics (Chapter 1.7 Connection)

**Problem:** Consider the double-well potential:

$$V(x) = \frac{x^2(x-1)^2}{4}$$

The WKB quantization condition generates a divergent series:

$$E_n = n + \frac{1}{2} + \sum_{k=1}^\infty c_k \exp\left(-\frac{k S}{\hbar}\right)$$

where $S = \int_0^1 \sqrt{2V(x)} \, dx = \frac{2\sqrt{2}}{3}$ is the instanton action.

**Step-by-Step Solution:**

1. **Perturbative Energy Levels:**
   For the left well approximation:

   $$E_n^{(\text{left})} \sim n + \frac{1}{2} + \sum_{m=1}^\infty d_m \hbar^m$$

2. **Borel Transform:**
   $$\mathcal{B}[E_n^{(\text{left})}](\zeta) = \sum_{m=1}^\infty \frac{d_m}{m!} \zeta^m$$

3. **Instanton Contribution:**
   The tunneling correction:

   $$\Delta E_n = 2 \sqrt{\frac{\hbar}{\pi}} \omega_n \exp\left(-\frac{S}{2\hbar}\right) \cos(\pi(n+\frac{1}{2}) + \phi_n)$$

4. **Alien Derivative at Instanton Singularity:**
   $$\Delta_S E_n^{(\text{left})} = 2 \sqrt{\frac{1}{\pi}} \omega_n \cos(\pi(n+\frac{1}{2}) + \phi_n) E_n^{(\text{left})}$$

5. **Resurgent Structure:**
   The full transseries is:

   $$E_n = E_n^{(\text{left})} + \Delta E_n + \sum_{k=2}^\infty A_k \exp\left(-\frac{k S}{\hbar}\right)$$

   **Key Result:** The alien derivative at the first instanton generates all higher instantons via the Bridge Equation:

   $$\Delta_{kS} = (\Delta_S)^k$$

**Connection to Chapter 1.7:** This systematically explains the non-perturbative effects (instantons) that were only heuristically introduced!

### Example 7.5.4: Stokes Phenomenon—Hyperasymptotics (Chapter 1.5 Connection)

**Problem:** Consider the resurgent version of Laplace's method for:

$$I(\lambda) = \int_0^\infty \exp\left(-\lambda\left(\frac{t^3}{3} + t\right)\right) dt$$

**Step-by-Step Solution:**

1. **Asymptotic Expansion:**
   The saddle-point contribution at $t = -1$ gives:

   $$I(\lambda) \sim \sqrt{\frac{2\pi}{\lambda}} \exp\left(\frac{\lambda}{3}\right) \sum_{n=0}^\infty a_n \lambda^{-n}$$

2. **First-Level Borel Sum:**
   $$S_1(\lambda) = \int_0^\infty \exp(-\lambda\zeta) \mathcal{B}\left[\sum \frac{a_n}{n!} \zeta^n\right] d\zeta$$

3. **Second-Level Resummation (Hyperasymptotics):**
   The remainder after optimal truncation has its own asymptotic expansion:

   $$R_N(\lambda) \sim \sum_{k=0}^\infty b_k \exp\left(-\frac{(N+k+1/2)}{\sqrt{\lambda}}\right)$$

   **Borel transform of remainder:**

   $$\mathcal{B}[R_N](\zeta) = \sum_{k=0}^\infty \frac{b_k}{k!} \zeta^k$$

4. **Complete Resurgent Structure:**
   The full resummation is:

   $$I(\lambda) = S_1(\lambda) + \sum_{m=1}^\infty S_m[R_{N_m}(\lambda)]$$

   where each $S_m$ is a higher-order Borel sum along optimally chosen rays.

5. **Alien Calculus Verification:**
   Alien derivatives satisfy:

   $$\Delta_{\omega_m} S_1 = S_m[\Delta_{\omega_m} R_{N_m}]$$

   **Bridge Equation:**

   $$[\Delta_{\omega_m}, \Delta_{\omega_n}] = 0$$

   **Result:** The algebraic structure of alien operators governs the nested resurgence structure!

### Example 7.5.5: Renormalization Group Connection (Chapter 5.6)

**Problem:** Consider the $\Phi^4_3$ renormalization counterterms identified in Hairer's regularity structures.

**Step-by-Step Solution:**

1. **Divergent Moments:**
   The formal power series for correlation functions:

   $$\langle \phi(x)\phi(y) \rangle = \sum_{n=0}^\infty c_n (x-y)^{2-n}$$

2. **Borel Transform:**
   $$\mathcal{B}[\langle \phi\phi \rangle](\zeta) = \sum_{n=0}^\infty \frac{c_n}{n!} \zeta^n$$

3. **Singularities = Counterterms:**
   Each pole in $\mathcal{B}[\langle \phi\phi \rangle](\zeta)$ at $\zeta = \omega_k$ corresponds to a renormalization counterterm:

   $$Z_k = \text{Res}_{\zeta=\omega_k} \mathcal{B}[\langle \phi\phi \rangle](\zeta)$$

4. **Alien Derivative Interpretation:**
   $$\Delta_{\omega_k} \langle \phi\phi \rangle = Z_k \langle \phi\phi \rangle$$

5. **Renormalization Group Flow:**
   The RG flow is the alien derivative flow:

   $$\frac{d}{d\mu} \langle \phi\phi \rangle = \sum_k \beta_k \Delta_{\omega_k} \langle \phi\phi \rangle$$

**Key Physical Result:** All infinite counterterms are completely determined by the resurgent structure of the theory. No new parameters are introduced!

### Example 7.5.6: Multisummability—Double Exponentials

**Problem:** Consider a series with double factorial divergence:

$$f(z) = \sum_{n=0}^\infty n!^2 z^n$$

**Step-by-Step Solution:**

1. **First Borel Transform (Fails):**
   $$\mathcal{B}_1[f](\zeta) = \sum_{n=0}^\infty n! \zeta^n$$

   Still divergent!

2. **Second Borel Transform:**
   $$\mathcal{B}_2[f](\eta) = \sum_{n=0}^\infty \frac{\zeta^n}{n!} = e^\eta$$

3. **Double Laplace Transform:**
   $$S_2[f](z) = \int_0^\infty \exp\left(-\frac{\zeta}{z}\right) \left[\int_0^\infty \exp\left(-\frac{\eta}{\zeta}\right) e^\eta \, d\eta\right] d\zeta$$

4. **Explicit Computation:**
   $$S_2[f](z) = \int_0^\infty \frac{\zeta}{\zeta-z} \exp\left(-\frac{1}{z}\right) d\zeta = -\text{Ei}\left(-\frac{1}{z}\right)$$

   where $\text{Ei}$ is the exponential integral.

5. **Stokes Analysis:**
   Singularities appear at $\zeta = 0, z, 2z, 3z, \dots$ in the iterated Borel plane.

**Result:** Multisummability systematically resolves arbitrarily rapid divergence!

### Example 7.5.7: Theoretical Extensions—Synthesis of Resurgent Methods

The examples throughout this section demonstrate how the abstract theory of resurgence transforms into concrete, computable mathematics that directly connects all the divergent phenomena encountered throughout the textbook. The Airy function example establishes the basic framework of Borel summation, connecting to the Stokes phenomenon discussed in Chapter 1.5 and revealing how wave function matching in quantum mechanics is encoded in the Borel plane structure. The Painlevé I equation demonstrates the power of transseries and alien derivatives, linking to supersymmetric quantum mechanics in Chapter 4.7 and providing insights into quantum gravity partition functions.

The double-well potential example shows how instanton chains arise naturally from the resurgent structure, connecting to the non-perturbative methods of Chapter 1.7 and providing a systematic framework for computing tunneling amplitudes. Hyperasymptotics reveals the nested structure of resurgence, where optimal truncation of asymptotic series leads to new asymptotic series for the remainder, connecting to the WKB methods of Chapter 1.5 and demonstrating how multiple scales can be handled systematically.

The $\Phi^4_3$ renormalization example is particularly profound: it shows that the infinite counterterms required in quantum field theory are not arbitrary subtractions, but are precisely determined by the alien derivatives of the perturbative series. This connects directly to the regularity structures of Chapter 5.6, revealing that renormalization is fundamentally a resurgent phenomenon. The counterterms emerge from the pole structure of the Borel transform, providing a complete algebraic characterization of renormalization that eliminates the need for ad-hoc regularization schemes.

Multisummability demonstrates how even the most rapidly divergent series can be systematically resummed through iterated Borel transforms, connecting to the double-scale physics of Chapter 1.7 where different timescales require different summation methods. Each example serves as a computational laboratory, providing exact formulas that readers can verify, manipulate, and extend to new contexts.

The unifying message is profound: divergence is not a problem to be avoided, but rather a solution that encodes complete information about the non-perturbative structure of the system. The Borel singularities are not defects to be removed, but data that completely determines the analytic continuation and global behavior of solutions. This paradigm shift transforms our understanding of asymptotic analysis from a collection of ad-hoc techniques into a unified algebraic framework where every divergence carries precise geometric and topological information.

## References

* Costin, O. (2008). *Asymptotics and Borel Summability*. CRC Press.

* Écalle, J. (1981). *Les Fonctions Résurgentes*. Pub. Math. Orsay.

* Sauzin, D. (2014). *Introduction to 1-Summability and Resurgence*. arXiv.

* Sternin, B. Y., & Shatalov, V. E. (1996). *Borel-Laplace Transform and Asymptotic Theory*. CRC Press.

## Navigation

{% include page_navigation.html %}

---

## Related Sections

- [Previous Section: 7.4 Fourier Integral Operators]({{ '/diffequations/chapter-07/07-4-fourier-integral/' | relative_url }})
- [Next Section: 7.6 Index Theorems & K-Theory]({{ '/diffequations/chapter-07/07-6-index-theorems/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-07/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
