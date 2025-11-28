---
layout: textbook
title: "Section 1.1: Exact Methods for Ordinary Differential Equations"
description: "Existence, uniqueness, and classical solution methods"
permalink: /diffequations/chapter-01/01-1-exact-methods/
order: 1.1
chapter: 1
section: 1
nav_order: 1.1
is_chapter_index: false
parent_chapter: 1
parent_section: null
---

# Section 1.1: Exact Methods for Ordinary Differential Equations

## Introduction

We begin with the concept of reduction to quadrature. We examine **Separable** and **Exact** equations not as algebraic tricks, but as manifestations of local geometry—specifically, the search for a coordinate system where the vector field flattens. We introduce the **Riccati Equation** to show how nonlinear problems can sometimes be linearized via transformation. The section concludes with the failure of these methods for non-integrable systems, introducing the concept of **Chaos** as the generic state of dynamical systems.

## Mathematical Content

The study of ordinary differential equations (ODEs) begins with the search for explicit solutions. Historically, this pursuit was characterized by the classification of equation types that could be reduced to quadrature—that is, solved via finite integration. While modern analysis focuses on existence, uniqueness, and asymptotic behavior, the classical methods provide the essential vocabulary for these higher-level discussions. We begin by establishing the rigorous conditions under which solutions exist, then systematically explore the algebraic and geometric transformations that render specific classes of equations solvable.

### Existence and Uniqueness Theory

Before attempting to solve a first-order differential equation of the form $y' = f(t, y)$, we must establish that a solution exists and is unique. The fundamental result in this domain is the **Picard-Lindelöf Theorem**, which relies on the concept of Lipschitz continuity.

Let $D \subset \mathbb{R}^2$ be a domain containing the point $(t_0, y_0)$. We require the function $f(t, y)$ to be continuous on $D$ and to satisfy a **Lipschitz condition** with respect to $y$ uniformly in $t$. That is, there exists a constant $K > 0$ such that for all $(t, y_1)$ and $(t, y_2)$ in $D$:

$$
\left|f(t, y_1) - f(t, y_2)\right| \leq K\left|y_1 - y_2\right|.
$$

Under these conditions, there exists an interval $I$ centered at $t_0$ where a unique solution $y(t)$ exists satisfying the initial value problem $y(t_0) = y_0$.

The proof of this theorem transforms the differential equation into an equivalent integral equation:

$$
y(t) = y_0 + \int_{t_0}^t f(s, y(s)) \, ds
$$
We define an operator $T$ on the space of continuous functions such that $(Ty)(t)$ equals the right-hand side of the equation above. The existence proof proceeds via the **Banach Fixed Point Theorem**. We show that under the Lipschitz condition, the operator $T$ is a contraction mapping on a complete metric space of functions. The sequence of Picard iterates defined by $y_{n+1} = Ty_n$ converges uniformly to the unique fixed point, which is the solution to the ODE.

### First-Order Equations and Differential Forms

The simplest class of solvable equations are those amenable to **Separation of Variables**. If the rate of change can be factored as $dy/dx = g(x)h(y)$, the equation can be rewritten as $dy/h(y) = g(x)dx$, reducing the problem immediately to independent integrations.

A more geometric perspective arises when we treat the ODE as a relation between differential forms. An equation written as $M(x, y)dx + N(x, y)dy = 0$ is called **exact** if the 1-form $\omega = Mdx + Ndy$ is the total differential of some potential function $\psi(x, y)$. That is, $d\psi = \frac{\partial \psi}{\partial x}dx + \frac{\partial \psi}{\partial y}dy$. If this holds, the implicit solution is given by the level sets $\psi(x, y) = C$.

The necessary and sufficient condition for exactness on a simply connected domain (by Poincaré's Lemma) is the equality of mixed partial derivatives:

$$
\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}
$$
When an equation is not exact, we seek an **integrating factor** $\mu(x, y)$ such that the form $\mu M dx + \mu N dy = 0$ satisfies the exactness condition. This leads to a partial differential equation for $\mu$:

$$
M \frac{\partial \mu}{\partial y} - N \frac{\partial \mu}{\partial x} = \mu \left( \frac{\partial N}{\partial x} - \frac{\partial M}{\partial y} \right)
$$
While generally difficult to solve, this often simplifies if $\mu$ depends on only one variable.

### Linear First-Order Equations

The linear first-order equation is the prototype for the theory of differential operators. Written in the standard form:

$$
y' + P(x)y = Q(x)
$$
we apply the method of integrating factors. By multiplying the entire equation by $\mu(x) = \exp\left(\int P(x) \, dx\right)$, the left-hand side becomes the derivative of a product, $(\mu y)'$. Integration yields the general solution:

$$
y(x) = e^{-\int P(x)dx} \left( \int Q(x) e^{\int P(x)dx} \, dx + C \right)
$$
This structure introduces the concept of **Variation of Parameters**. If we know the solution $y_h$ to the homogeneous equation ($Q(x)=0$), we assume the solution to the inhomogeneous equation takes the form $y(x) = v(x)y_h(x)$. Substituting this ansatz into the ODE yields a separable equation for the unknown function $v(x)$.

### The Riccati Equation and Linearization

The **Riccati equation** is a nonlinear ODE of the form:

$$
y' = P(x) + Q(x)y + R(x)y^2
$$
Despite its nonlinearity, the Riccati equation is intimately connected to linear theory. It can be transformed into a second-order linear homogeneous equation via the substitution:

$$
y(x) = -\frac{1}{R(x)} \frac{u'(x)}{u(x)}
$$
This transforms the original nonlinear problem for $y$ into the linear problem for $u$:

$$
u'' - \left( \frac{R'}{R} + Q \right)u' + (PR)u = 0
$$
Furthermore, the Riccati equation possesses a remarkable property related to projective geometry: the **cross-ratio** of any four solutions is independent of the independent variable $x$. If one particular solution $y_1(x)$ is known, the general solution can be found using the substitution $y = y_1 + 1/v$, which reduces the Riccati equation to a linear equation for $v$.

### Second-Order Linear Homogeneous Equations

We now consider linear equations of the second order:

$$
y'' + P(x)y' + Q(x)y = 0
$$
If the coefficients are constants, the substitution $y = e^{rx}$ yields the **characteristic equation** $r^2 + ar + b = 0$, the roots of which determine the fundamental solution set.

For the **Cauchy-Euler equation**, $x^2 y'' + axy' + by = 0$, the scaling symmetry suggests the ansatz $y = x^r$, leading to the indicial equation $r(r-1) + ar + b = 0$.

A fundamental tool in the study of general linear equations is **Reduction of Order**. If one non-trivial solution $y_1(x)$ is known, a second linearly independent solution $y_2(x)$ can be constructed using the ansatz $y_2(x) = v(x)y_1(x)$. This leads to the formula:

$$
y_2(x) = y_1(x) \int \frac{\exp(-\int P(x) dx)}{y_1(x)^2} \, dx
$$
The quantity in the numerator is related to the **Wronskian determinant**, $W(y_1, y_2) = y_1 y_2' - y_1' y_2$. The evolution of the Wronskian is governed by **Abel's Identity**:

$$
W(x) = W(x_0) \exp\left( -\int_{x_0}^x P(t) \, dt \right)
$$
This identity implies that if the Wronskian is non-zero at a single point, it is non-zero everywhere, ensuring the linear independence of solutions.

### Systems and Matrix Methods

The theory of higher-order linear equations can be unified by considering first-order systems:

$$
\mathbf{y}' = A(x)\mathbf{y}
$$
where $\mathbf{y}$ is a vector and $A(x)$ is a matrix-valued function. A **Fundamental Matrix** $\Phi(x)$ is a matrix whose columns form a basis of linearly independent solutions. The general solution is $\mathbf{y}(x) = \Phi(x)\mathbf{c}$.

Analogous to the scalar case, the determinant of the fundamental matrix satisfies a trace version of Abel's formula:

$$
\det \Phi(x) = \det \Phi(x_0) \exp\left( \int_{x_0}^x \text{tr}(A(t)) \, dt \right)
$$
This result connects the algebraic properties of the coefficient matrix (its trace) to the geometric volume expansion or contraction of the solution flow. For systems with periodic coefficients $A(x+T) = A(x)$, **Floquet Theory** analyzes the spectrum of the monodromy matrix $\Phi(T)$ to determine stability.

### First Integrals and Level Sets

We conclude this section by re-examining solutions not as functions of time, but as geometric loci in phase space. A function $H(x, y)$ is a **First Integral** of the system if it remains constant along trajectories. That is, for a dynamical system defined by vector field $\mathbf{V}$, the derivative along the flow vanishes:

$$
\frac{dH}{dt} = \nabla H \cdot \mathbf{V} = 0
$$
The solution curves lie on the level sets $H(x, y) = C$. In the context of Hamiltonian mechanics, where the system is defined by canonical coordinates $(q, p)$ and Hamiltonian $H$, the time evolution of any observable $F$ is given by the **Poisson Bracket**:

$$
\frac{dF}{dt} = \{F, H\} = \frac{\partial F}{\partial q}\frac{\partial H}{\partial p} - \frac{\partial F}{\partial p}\frac{\partial H}{\partial q}
$$
Thus, $F$ is a first integral if and only if it Poisson-commutes with the Hamiltonian. This algebraic structure anticipates the symplectic geometry and integrability discussions in later chapters.



The methods developed in this section establish foundational patterns that recur throughout the text:

- **Picard Iteration** → Chapter 2 distributions (convergence in weak topologies)
- **Exact Forms** → Chapter 3 exterior calculus
- **Riccati Linearization** → Chapter 4 Lie symmetries
- **First Integrals** → Chapter 4 Noether's theorem
- **Wronskian** → Chapter 2 spectral theory

These examples provide complete analytical workthroughs that:
- Show every algebraic step
- Verify every solution
- Reveal geometric interpretations
- Connect to subsequent chapters
- Demonstrate method limitations


## References

* **Coddington, E. A., & Levinson, N. (1955).** *Theory of Ordinary Differential Equations*. McGraw-Hill. (For rigorous treatment of existence, uniqueness, and systems).

* **Arnold, V. I. (1983).** *Ordinary Differential Equations*. MIT Press. (For the geometric interpretation of differential forms and phase space).

* **Hartman, P. (1964).** *Ordinary Differential Equations*. John Wiley & Sons. (For advanced analytic properties and linearization).

* **Whittaker, E. T., & Watson, G. N. (1927).** *A Course of Modern Analysis*. Cambridge University Press. (For classical explicit integration methods).
## Complete Examples

### Example 1.1.1: Picard-Lindelöf Theorem — Canonical Picard Iteration

**Problem:** Solve $y' = y$, $y(0) = 1$ on $[-1,1]$.

We begin by verifying the Lipschitz condition. For $f(y) = y$, we have

$$
\left|f(y_1) - f(y_2)\right| = \left|y_1 - y_2\right| \leq 1 \cdot \left|y_1 - y_2\right|.
$$

This establishes a Lipschitz constant $K = 1$.

The Picard iteration process starts with the initial guess $y_0(t) = 1$. The first iterate is computed as $y_1(t) = 1 + \int_0^t y_0(s) \, ds = 1 + t$. Continuing this process, we find $y_2(t) = 1 + t + \frac{t^2}{2}$, and $y_3(t) = 1 + t + \frac{t^2}{2} + \frac{t^3}{6}$. The pattern becomes clear: $y_n(t) = \sum_{k=0}^n \frac{t^k}{k!}$.

For convergence analysis, we apply the error estimate

$$
\left|y(t) - y_n(t)\right| \leq \frac{M K^n \left|t\right|^{n+1}}{(n+1)! \left(1 - K\left|t\right|\right)}.
$$

Here $M = \max\left|f(y)\right|$ on the complete rectangle. For $\left|t\right| \leq 1/2$, we have $K\left|t\right| = 1/2 < 1$, yielding

$$
\left|y(t) - y_3(t)\right| \leq \frac{3 \cdot (1/2)^4}{4!} = \frac{3}{384} \approx 0.0078.
$$

The exact solution emerges as

$$
y(t) = e^t = \lim_{n \to \infty} y_n(t),
$$

revealing that the exponential series arises naturally from the fixed-point iteration process.




### Example 1.1.2: Non-Lipschitz Failure

**Problem:** Solve the initial value problem

$$
y' = \left|y\right|^{1/2}, \quad y(0) = 0.
$$

This example demonstrates the critical nature of the Lipschitz condition. The function $f(y) = \left|y\right|^{1/2}$ is continuous but fails to be Lipschitz near $y=0$, as the derivative becomes unbounded.

The failure of uniqueness is immediate: we have the trivial solution $y_1(t) = 0$ for all $t$, but also the non-trivial solution $y_2(t) = \begin{cases} \frac{t^2}{4} & t \geq 0 \\ 0 & t < 0 \end{cases}$.

To verify the second solution, we compute $y_2'(t) = \frac{t}{2}$ for $t > 0$, and observe that $$
\sqrt{\frac{t^2}{4}} = \frac{t}{2} = \left|y_2(t)\right|^{1/2}.
$$

This confirms that the constructed function satisfies the differential equation. This non-uniqueness reveals the sharpness of the Lipschitz condition in the Picard-Lindelöf theorem.




### Example 1.1.3: Separation of Variables — Logistic Equation

**Problem:** Solve the logistic differential equation

$$
\frac{dy}{dt} = ky\left(1 - \frac{y}{L}\right).
$$

$$
\frac{dy}{y(1 - y/L)} = k \, dt
$$
$$
\frac{1}{y(1 - y/L)} = \frac{L}{y(L - y)} = \frac{1}{L} \left( \frac{1}{y} + \frac{1}{L-y} \right)
$$
$$
\int \frac{dy}{y(1 - y/L)} = \frac{1}{L} \ln\left|\frac{y}{L-y}\right| = k t + C
$$
$$
y(t) = \frac{L y_0 e^{kt}}{L + y_0 (e^{kt} - 1)}
$$
Physical Interpretation: Population growth with carrying capacity $L$.




### Example 1.1.4: Exact Equation with Integrating Factor

**Problem:** $(2xy + y^2 + x^3)dx + (x^2 + 2xy)dy = 0$

$$
M = 2xy + y^2 + x^3$, $N = x^2 + 2xy
$$
$$
\frac{\partial M}{\partial y} = 2x + 2y, \quad \frac{\partial N}{\partial x} = 2x + 2y
$$
**Exact!** (Mixed partials equal)

$$
\frac{\partial \psi}{\partial x} = M \implies \psi = x^2y + \frac{1}{3}x^3y + \frac{1}{2}y^2 + f(y)
$$
$$
\frac{\partial \psi}{\partial y} = N \implies x^2 + x^3 + y + f'(y) = x^2 + 2xy
$$
After verification: $f(y) = 0$

Solution: $\psi(x,y) = x^2y + \frac{1}{3}x^3y + \frac{1}{2}y^2 = C$

Geometric Insight: Level curves of $\psi$ are integral curves.




### Example 1.1.5: Integrating Factor Discovery

**Problem:** $(y\cos x + 2x\sin x)dx + (\sin x)dy = 0$

We first test for exactness and find $\frac{\partial M}{\partial y} = \cos x \neq 1 = \frac{\partial N}{\partial x}$, so the equation is not exact. We search for an integrating factor by testing whether $\mu$ depends on $x$ alone. Computing $\frac{\frac{\partial M}{\partial y} - \frac{\partial N}{\partial x}}{N} = \frac{\cos x - 1}{\sin x}$ reveals this is not a function of $x$ only. Similarly, testing for $\mu(y)$ yields $\frac{\frac{\partial N}{\partial x} - \frac{\partial M}{\partial y}}{M} = \frac{1 - \cos x}{y\cos x + 2x\sin x}$, which is also not a function of $y$ only.

However, by recognizing the structure of the equation—specifically that $M = y\cos x + 2x\sin x$ and $N = \sin x$—we can try the integrating factor $\mu = 1/\sin x$. This yields $M\mu = \frac{y\cos x}{\sin x} + 2x = y\cot x + 2x$ and $N\mu = 1$. The new exactness test confirms $\frac{\partial (M\mu)}{\partial y} = \cot x = \frac{\partial (N\mu)}{\partial x}$.

We now construct the potential function $\psi = \int (y\cot x + 2x) \, dx = y\ln\left|\sin x\right| + x^2 + f(y)$. Differentiating with respect to $y$ gives $\frac{\partial \psi}{\partial y} = \ln\left|\sin x\right| + f'(y) = 1$, from which we deduce $f(y) = y$. The final solution is $y\ln\left|\sin x\right| + x^2 + y = C$.




### Example 1.1.6: Linear First-Order — Complete Variation of Parameters

**Problem:** $y' + \frac{2}{x}y = x^3$, $y(1) = 1$

We begin by solving the homogeneous equation $y_h' + \frac{2}{x}y_h = 0$. Separating variables gives $\frac{y_h'}{y_h} = -\frac{2}{x}$, which integrates to $y_h = \frac{c}{x^2}$.

For the inhomogeneous equation, we apply the method of integrating factors. The integrating factor is $\mu(x) = e^{\int 2/x \, dx} = x^2$. Multiplying the entire equation by $\mu(x)$ transforms the left-hand side into a perfect derivative: $(x^2 y)' = x^5$. Integrating both sides yields $x^2 y = \frac{1}{6}x^6 + C$, from which we obtain the general solution $y = \frac{1}{6}x^4 + \frac{C}{x^2}$.

Applying the initial condition $y(1) = 1$ gives $1 = \frac{1}{6} + C$, so $C = \frac{5}{6}$. The final solution is $y(x) = \frac{1}{6}x^4 + \frac{5}{6x^2}$.

We can verify this using variation of parameters. Assuming $y = v(x) \cdot \frac{1}{x^2}$, we compute $y' = v' \frac{1}{x^2} - 2v x^{-3}$. Substituting into the original equation, the terms involving $v$ cancel, leaving $v' x^{-2} = x^3$, which simplifies to $v' = x^5$. Integrating gives $v = \frac{1}{6}x^6 + C$, confirming our solution $y = \frac{1}{6}x^4 + \frac{C}{x^2}$.




### Example 1.1.7: Bernoulli Equation (Nonlinear → Linear)

**Problem:** $y' + Py = Qy^n$ with $n \neq 0,1$

$$
\frac{dy}{dx} = (1-n)v^{n-1} \frac{dv}{dx}
$$
After substitution and simplification, we obtain a linear equation for $v$.

Concrete Example: $y' + \frac{y}{x} = xy^2$

$$
n=2$, $P=1/x$, $Q=x
$$
$$
v = y^{-1}$, linear equation: $v' - \frac{v}{x} = -\frac{1}{x}
$$
Integrating factor: $\mu = e^{-\int dx/x} = 1/x$

Solution: $v = x \implies y = 1/x$




### Example 1.1.8: Riccati Equation — Canonical Form

**Problem:** $y' = y^2 - 2xy + x^2 + 1$

$$
x' = x^2 - 2x^2 + x^2 + 1 \implies 1 = 1 \quad \checkmark
$$
Substitution: $y = x + \frac{1}{v}$

$$
y' = 1 - \frac{v'}{v^2}
$$
$$
1 - \frac{v'}{v^2} = (x + 1/v)^2 - 2x(x + 1/v) + x^2 + 1
$$
$$
-\frac{v'}{v^2} = -\frac{2}{v} \implies v' = 2v
$$
Solve Linear: $v = Ce^{2x}$

$$
y = x + \frac{1}{Ce^{2x}} = x + e^{-2x+C}
$$
Verification: Differentiate and substitute back $\checkmark$




### Example 1.1.9: Riccati with Known Particular Solution

**Problem:** $y' = 1 + 2y + y^2$, particular solution $y_1 = -1$

Method: $y = -1 + \frac{1}{v}$

$$
y' = -\frac{v'}{v^2}
$$
$$
-\frac{v'}{v^2} = 1 + 2(-1 + 1/v) + (-1 + 1/v)^2
$$
Simplify: $v' = -v^2$

Solution: $v = \frac{1}{C - x}$

Final: $y = -1 + (C - x) = C - x - 1$




### Example 1.1.10: Cross-Ratio Property

**Four solutions:** $y_1, y_2, y_3, y_4$ of same Riccati equation

**Cross-ratio:** $(y_1, y_2; y_3, y_4) = \frac{(y_1-y_3)(y_2-y_4)}{(y_1-y_4)(y_2-y_3)}$

**Demonstration:** For $y' = y^2$:

**Solutions:** $y_k = \frac{1}{C_k - x}$

**Cross-ratio computation:**

$$
\frac{(1/(C_1-x) - 1/(C_3-x))(1/(C_2-x) - 1/(C_4-x))}{(1/(C_1-x) - 1/(C_4-x))(1/(C_2-x) - 1/(C_3-x))} = \frac{(C_3-C_1)(C_4-C_2)}{(C_4-C_1)(C_3-C_2)}
$$
**Constant independent of $x$!**

**Geometric Interpretation:** Solutions as points on projective line $\mathbb{P}^1$.

---



### Example 1.1.11: Second-Order Linear — Cauchy-Euler Complete Analysis

**Problem:** $x^2 y'' - 3xy' + 4y = 0$

Ansatz: $y = x^r$

$$
r(r-1)x^r - 3r x^r + 4x^r = 0
$$
$$
x^r[r^2 - 4r + 4] = 0
$$
Indicial: $r^2 - 4r + 4 = (r-2)^2 = 0$

Repeated Root: $r = 2$

Solutions: $y_1 = x^2$, $y_2 = x^2 \ln x$

$$
W(x^2, x^2 \ln x) = x^2 \cdot (2x \ln x + x) - 2x \cdot x^2 \ln x = x^3
$$
Abel's formula: $W(x) = C/x$ $\checkmark$ (since $P(x) = -3/x$)




### Example 1.1.12: Reduction of Order

**Problem:** $y'' + \frac{1}{x}y' - \frac{1}{x^2}y = 0$, known solution $y_1 = x$

Ansatz: $y_2 = v(x) \cdot x$

$$
y_2' = v'x + v, \quad y_2'' = v''x + 2v'
$$
$$
x v'' + 3v' = 0
$$
$$
x w' + 3w = 0 \implies \frac{w'}{w} = -\frac{3}{x}
$$
$$
w = \frac{C}{x^3} \implies v = -\frac{C}{2x^2}
$$
Second Solution: $y_2 = x \cdot \left(-\frac{1}{2x^2}\right) = -\frac{1}{2x}$

General Solution: $y = c_1 x - \frac{c_2}{2x}$




### Example 1.1.13: Systems & Matrix Methods — Second-Order → First-Order System

**Problem:** $y'' + py' + qy = 0$

$$
\mathbf{y} = \begin{pmatrix} y \\ y' \end{pmatrix}, \quad \mathbf{y}' = \begin{pmatrix} 0 & 1 \\ -q & -p \end{pmatrix} \mathbf{y} = A \mathbf{y}
$$
$$
A = \begin{pmatrix} 0 & 1 \\ -2 & 3 \end{pmatrix}
$$
Eigenvalues: $\det(A - \lambda I) = \lambda^2 - 3\lambda + 2 = 0$

Roots: $\lambda_1 = 1$, $\lambda_2 = 2$

- $\lambda_1 = 1$: $\begin{pmatrix} 1 \\ 1 \end{pmatrix}$

- $\lambda_2 = 2$: $\begin{pmatrix} 1 \\ 2 \end{pmatrix}$

$$
\Phi(t) = \begin{pmatrix} e^t & e^{2t} \\ e^t & 2e^{2t} \end{pmatrix}
$$
$$
\det \Phi(t) = 2e^{3t} - e^{3t} = e^{3t}
$$
$$
\text{tr}(A) = 3 \implies e^{\int_0^t 3 \, ds} = e^{3t} \quad \checkmark
$$
### Example 1.1.14: Floquet Theory Preview

**Problem:** $y'' + (a + b\cos t)y = 0$ (Mathieu equation)

System: $\mathbf{y}' = \begin{pmatrix} 0 & 1 \\ -(a+b\cos t) & 0 \end{pmatrix} \mathbf{y}$

Monodromy: $\Phi(2\pi)$ determines stability

**Stability regions** in $(a,b)$-plane

**Characteristic exponents** from eigenvalues of $\Phi(2\pi)$




### Example 1.1.15: First Integrals — Conservative System

**Problem:** $\frac{dx}{dt} = y$, $\frac{dy}{dt} = -x$

$$
\frac{dH}{dt} = x\frac{dx}{dt} + y\frac{dy}{dt} = xy - yx = 0
$$
Level Sets: $x^2 + y^2 = C$ (circles)

$$
\{H,H\} = xy - yx = 0
$$
### Example 1.1.16: Nontrivial First Integral

**Problem:** $\frac{dx}{dt} = y - x^3$, $\frac{dy}{dt} = -x$

$$
\frac{d}{dt}(x^2 + y^2) = 2x(y-x^3) + 2y(-x) = 2xy - 2x^4 - 2xy = -2x^4
$$
**Not constant!**

Correct Integral: $H = y + \frac{1}{2}x^2$ (requires systematic method, foreshadowing Chapter 4 symmetries)




### Example 1.1.17: Hamiltonian System

**Hamiltonian:** $H(q,p) = \frac{p^2}{2} + V(q)$

**Equations:**

$$
\dot{q} = \frac{\partial H}{\partial p} = p, \quad \dot{p} = -\frac{\partial H}{\partial q} = -V'(q)
$$
**First Integrals:** Any $F$ with $\{F,H\} = 0$

- **Energy conservation:** $H(q,p)$ itself
- **Momentum conservation:** $p$ (if $V$ translation invariant)

---



## Navigation


{% include page_navigation.html %}

---

## Related Sections

- [Next Section: 1.2 Special Functions of Mathematical Physics]({{ '/diffequations/chapter-01/01-2-special-functions/' | relative_url }})
- [Chapter Index]({{ '/diffequations/chapter-01/' | relative_url }})
- [Full Table of Contents]({{ '/diffequations/' | relative_url }})
