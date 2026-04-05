# Noncommutative physics strategy — Landau volumes 3–4 spine (outline for a future live index)

This document is the **master plan** for a long-form page (or bounded set of pages) that continues the **classical** unified index ([classical/index.html](classical/index.html)) into **quantum theory** and **relativistic QED**, using **Landau & Lifshitz, *Quantum Mechanics* (Vol. 3)** and ***Relativistic Quantum Theory* / QED (Vol. 4)** as the **physical backbone**. It mirrors the **structural discipline** of [CLASSICAL_PHYSICS_AND_MATHEMATICS_UNIFIED.md](CLASSICAL_PHYSICS_AND_MATHEMATICS_UNIFIED.md) and the **documentation style** of [CLASSICAL_PHYSICS_LIVE_PAGE_SYNTHESIS.md](CLASSICAL_PHYSICS_LIVE_PAGE_SYNTHESIS.md).

**Goal:** When you implement `physics/noncommutative/index.html` (name TBD), this file is the **checklist, dependency map, and writing contract**: same single-scroll discipline, same “Landau equation first → then minimal algebraic repair” rhythm, same cross-links back to classical anchors.

---

## 0. Prerequisites from the classical index (assumed mastered)

The reader is assumed to have worked through the classical spine through at least:

| Classical concept | Where it lives (anchors on [classical/index.html](classical/index.html)) |
|-------------------|--------------------------------------------------------------------------|
| Phase space $T^*Q$, canonical coordinates $(q^i,p_i)$ | `#b-symplectic`, `#e-legendre-hamilton` |
| Symplectic form $\omega$, Hamiltonian vector fields, Poisson bracket $\{f,g\}$ | `#b-symplectic`, `#e-legendre-hamilton` |
| Variational action, Euler–Lagrange, symmetry / Noether picture | `#symmetry-variation`, `#e-action-manifold`, `#e-noether` |
| Lie groups, angular momentum as generator of rotations (classical) | `#a-algebraic-structure`, `#c-so3` |
| Minkowski space, four-vectors, Lorentz structure | `#b-minkowski`, `#flat-spacetime-ed` |
| Gauge potential $A$, field strength $F$, gauge class, cohomological reading | `#f-gauge-f`, `#cohomology-topology` |
| Levi–Civita connection, curvature, stress–energy (classical field GR template) | `#gravity-geometry` |
| Ehresmann / bundle viewpoint (optional unifier) | `#bonus-ehresmann-prelude` |

**Single thesis of the noncommutative extension:** keep the **variational and symplectic origin** of dynamics; replace the **commutative Poisson algebra** $C^\infty(T^*Q)$ (or appropriate classical observable algebra) by a **noncommutative $\ast$-algebra of operators** so that, in a precise functor-of-algebras sense,

$$
\{f,g\} \;\longmapsto\; \frac{1}{i\hbar}\,[\hat f,\hat g]
$$

(Domain of $f,g$: start with polynomials in $q,p$; extend carefully.) **Physical forcing:** simultaneous sharp values for noncommuting observables fail (double slit, discrete spectra, Stern–Gerlach); classical phase-space points are not sufficient statistics for measurement.

---

## 1. Conventions (proposed; align with Landau and with classical index)

| Choice | Convention |
|--------|------------|
| Lorentz signature | **Mostly minus**, $\eta=\mathrm{diag}(-1,1,1,1)$, $x^0=ct$ (same as classical page). |
| $\hbar$ | Explicit in commutators; classical limit as controlled limit $\hbar\to 0$ (WKB / Hamilton–Jacobi recovery). |
| Operator adjoints | Observables as **self-adjoint** (or essentially self-adjoint) operators on a separable Hilbert space; domain issues flagged honestly. |
| Field theory | Canonical **equal-time** commutators / anticommutators stated in Heaviside–Lorentz style if matching Vol. 4. |
| Site headings | Plain-language `<h2>` / `<h3>` (no LaTeX in titles), KaTeX in body: **same rule as classical index**. |

---

## 2. Narrative contract (how every section should read)

1. **Landau first:** open with a **concrete equation, phenomenon, or paradox** from Vol. 3 or 4 (not abstract philosophy first).
2. **Classical bridge:** one paragraph tying to **Poisson / symplectic / action** language from the classical index.
3. **Minimal algebraic repair:** introduce **only** the structure forced next (commutator, representation, Hilbert space, etc.).
4. **Uniqueness where it exists:** cite **Stone–von Neumann**, **Stone’s theorem on one-parameter unitary groups**, irreducibility, etc., so the reader feels “chosen by math,” not “chosen by notation.”
5. **Classical limit:** at each arc, **at least one** explicit recovery route (WKB → HJ, $\hbar\to 0$ of commutators → Poisson, eikonal, etc.).
6. **Geometry on demand:** bundles, connections, polarizations, Riemann surfaces enter **when canonical flat quantization breaks or global consistency requires them**—not as decoration.
7. **Residual failures last:** UV divergences, measurement interpretation debates, full rigorous QFT: **pointers only** in the closing arc.

**Tone:** sparse, necessity-driven, impressionistic in prose; **standard** in formulas (same ethos as classical page).

---

## 3. Logical spine — eight major arcs (future `<h2>` sections)

Each arc below is decomposed into **chapters** (future `<h3>` units). Dependencies flow **downward**: do not use Fock space before canonical quantization; do not use Dirac fields before KG motivation; etc.

---

### Arc 1 — Deformation rule: Poisson algebra meets experiment

**Landau anchors (Vol. 3):** uncertainty, operator correspondence, statistical interpretation of measurement.

| Ch. | Title | Content (minimal) | Classical hook |
|-----|--------|-------------------|----------------|
| 1.1 | Sharp values and joint spectra | Simultaneous eigenstates $\Leftrightarrow$ commuting self-adjoint operators; failure for conjugate pairs. | Poisson: $\{q,p\}=1$ classically; no obstruction to sharp $(q,p)$. |
| 1.2 | Double slit, interference, and “path” | Which-path information destroys interference; no classical joint probability for noncommuting sharp values. | Classical trajectory in phase space; superposition has no classical analogue in $T^*Q$ alone. |
| 1.3 | Dirac quantization map | $\{f,g\}\mapsto \frac{1}{i\hbar}[\hat f,\hat g]$ (domain: polynomials → Weyl ordering issues flagged). | Poisson bracket as classical limit; functoriality only partial—**ordering ambiguity** as foreshadowing. |
| 1.4 | Heisenberg uncertainty from commutators | Robertson–Schrödinger inequality; saturated states (Gaussians). | Classical $\Delta q\,\Delta p$ can be zero; quantum cannot. |
| 1.5 | Dynamics in the deformed algebra | Heisenberg equation $\mathrm{d}\hat A/\mathrm{d}t=\frac{i}{\hbar}[\hat H,\hat A]$ vs Schrödinger picture (preview). | Hamilton equations / Poisson flow $\mathrm{d}f/\mathrm{d}t=\{H,f\}$. |

**Deliverable:** Reader accepts **one** algebraic change (noncommutative product + self-adjointness) as the **minimal** price for empirical composition laws of measurements.

---

### Arc 2 — Canonical quantization: Heisenberg algebra to Schrödinger equation

**Landau anchors (Vol. 3):** wave equation, operators, stationary states, completeness.

| Ch. | Title | Content (minimal) | Classical hook |
|-----|--------|-------------------|----------------|
| 2.1 | Heisenberg Lie algebra | $[\hat q_i,\hat p_j]=i\hbar\,\delta_{ij}$ (on a common dense domain); central extension. | Canonical Poisson brackets. |
| 2.2 | Stone–von Neumann | Unique irreducible unitary representation of Weyl relations (finite DOF); technical hypotheses stated. | Darboux / canonical coordinates unique up to symplectomorphism classically; quantum rigidity stronger. |
| 2.3 | Hilbert space and domains | $L^2(\mathbb{R}^n,\mathrm{d}^nq)$; Schwartz space core; essentially self-adjoint extensions (harmonic oscillator, free particle). | $T^*Q$ with $Q=\mathbb{R}^n$; measure from “polarization” choice. |
| 2.4 | States, observables, Born rule | Pure vs mixed (density matrix $\rho$); expectation $\mathrm{Tr}(\rho\hat A)$; spectral measure. | Phase-space probability density $\rho(q,p)$ classical analogue—**not** always nonnegative in Wigner form (preview optional). |
| 2.5 | Schrödinger equation as dynamics | $\mathrm{i}\hbar\,\partial_t\psi=\hat H\psi$; unitary evolution $U(t)=\exp(-\mathrm{i}t\hat H/\hbar)$. | Hamiltonian flow; generating function / HJ as classical limit. |
| 2.6 | Variational principle (deformed) | Stationary action for $\psi$ with appropriate Lagrangian density (complex field); equivalence to Schrödinger where valid. | Classical Hamilton’s principle → quantum stationary phase in path integral (optional pointer). |
| 2.7 | WKB and classical recovery | WKB ansatz $\psi\sim \mathrm{e}^{\mathrm{i}S/\hbar}$; HJ equation for $S$; connection to classical trajectories. | Hamilton–Jacobi arc on classical index `#e-hj-integrable`. |

**Deliverable:** Finite-dimensional QM of structureless particle(s) in Euclidean space is **closed** as a story: algebra → representation → dynamics → measurement → classical limit.

---

### Arc 3 — Symmetries, angular momentum, spin

**Landau anchors (Vol. 3):** angular momentum algebra, addition of momenta, spin $1/2$, Stern–Gerlach.

| Ch. | Title | Content (minimal) | Classical hook |
|-----|--------|-------------------|----------------|
| 3.1 | Symmetries as unitaries | Wigner theorem (brief); projective vs linear reps; conserved quantities and self-adjoint generators. | Noether / momentum maps on $T^*Q$. |
| 3.2 | Stone’s theorem | Strongly continuous one-parameter unitary groups $\Leftrightarrow$ self-adjoint generator. | Hamiltonian flow as $\mathbb{R}$-action on phase space. |
| 3.3 | $\mathfrak{so}(3)$ and ladder operators | $[J_i,J_j]=\mathrm{i}\hbar\,\epsilon_{ijk}J_k$; spectrum of $J^2,J_z$. | Classical $\mathbf{L}=\mathbf{r}\times\mathbf{p}$ Poisson algebra. |
| 3.4 | $SU(2)$ vs $SO(3)$ | Universal cover; half-integer spin; spinors as projective reps of spatial rotations. | Double cover of $SO(3)$ already in rigid body / topology on classical index. |
| 3.5 | Pauli matrices and two-level systems | Bloch sphere; Stern–Gerlach as noncommutative measurement. | Classical dipole in field (commuting components fail quantumly). |
| 3.6 | Many-body composition (atoms, molecules) | Tensor products; identical particles preview (statistics deferred to Arc 5). | Classical multiparticle $T^*(Q_1\times Q_2)$. |

**Deliverable:** **Spin** is not bolted on: it is **representation theory** forced by the same rotation symmetry that classically generated angular momentum.

---

### Arc 4 — Relativistic extension: Klein–Gordon and Dirac

**Landau anchors (Vol. 4):** relativistic wave equations, spinors, Lorentz covariance.

| Ch. | Title | Content (minimal) | Classical hook |
|-----|--------|-------------------|----------------|
| 4.1 | From mass shell to KG | $p_\mu p^\mu=m^2c^2$ → $(\Box+m^2)\phi=0$; issues (negative-energy solutions, scalar density). | Minkowski four-momentum on classical index. |
| 4.2 | Clifford algebra and Dirac equation | $\gamma^\mu$ anticommutation; Dirac operator; spinor reps of $\mathrm{Spin}(1,3)$. | $\gamma$-matrices as deformation of tensor square root of mass shell. |
| 4.3 | Lorentz covariance and minimal coupling | $p_\mu\to p_\mu-qA_\mu$; gauge invariance; Pauli–Fierz / nonrelativistic reduction to Pauli equation. | Minimal coupling already on classical ED section. |
| 4.4 | Physical interpretation | Particle / antiparticle; charge conjugation (overview); “fall to center” and relativistic regularities (Landau-level sketch). | Classical Coulomb collapse vs quantum pair creation (pointer). |

**Deliverable:** **Relativity** is not a separate book: it is the **same deformation rule** applied to **Poincaré-invariant** observable algebra.

---

### Arc 5 — Field quantization: from finite DOF to Fock space and QED skeleton

**Landau anchors (Vol. 4):** quantization of free fields, photons, electrons, perturbation theory overview.

| Ch. | Title | Content (minimal) | Classical hook |
|-----|--------|-------------------|----------------|
| 5.1 | Infinite DOF: CCR / CAR | Canonical commutation for bosons; anticommutation for fermions; Fock space construction. | Symplectic form on solution space of classical field equations (link classical free field). |
| 5.2 | Operator-valued distributions | Fields $\hat\phi(f)$ smeared with test functions; domains in Fock space. | Classical fields as smooth sections vs quantum distributional smearing. |
| 5.3 | Free photon / electron fields | Maxwell quantization sketch; Dirac field; vacuum and number basis. | Classical $A,F$ and Maxwell stress tensor. |
| 5.4 | Minimal coupling and gauge fixing | QED interaction term; necessity of gauge choice; ghost-free Abelian case simplified. | Classical gauge orbit; Ehresmann picture on classical bonus section. |
| 5.5 | Interaction picture and $S$-matrix | Dyson series (formal); unitarity as goal; IR/collinear as residual issues (pointer). | Classical scattering as symplectomorphism (informal). |
| 5.6 | Feynman rules (compressed) | Wick’s theorem → diagrams; sign rules for fermions; one-loop preview as **UV pointer**. | Classical perturbation theory analogy only. |

**Deliverable:** Reader sees **QED** as **canonical quantization of a classical field system** + **minimal coupling**, with **statistics** (Bose/Fermi) as **algebraic consistency** of many-body Hilbert space.

---

### Arc 6 — Global geometric quantization (when canonical rules break)

**Landau anchors:** mostly **structural** (consistency of semiclassical rules); tie to Bohr–Sommerfeld and angular momentum quantization in Vol. 3.

| Ch. | Title | Content (minimal) | Classical hook |
|-----|--------|-------------------|----------------|
| 6.1 | Limits of Schrödinger on $\mathbb{R}^n$ | Ordering ambiguity; lack of chart invariance for general $T^*Q$. | Darboux local vs global symplectic manifold. |
| 6.2 | Prequantum line bundle | Connection with curvature $\omega$; **integrality** $\frac{1}{2\pi\hbar}\int_\Sigma\omega\in\mathbb{Z}$. | Cohomology periods on classical index `#d-closed-exact`. |
| 6.3 | Polarizations | Real (position / momentum) vs Kähler; half-form / metaplectic correction (outline). | Lagrangian foliations; integrable distributions ↔ Frobenius on classical index. |
| 6.4 | Bohr–Sommerfeld revisited | Maslov index; EBK quantization as geometric condition. | Hamilton–Jacobi and action variables on classical index. |
| 6.5 | Constrained quantization (Dirac) | First-class constraints; gauge reduction; quantum BRST (pointer only). | Constrained classical mechanics on classical index. |

**Deliverable:** **Global** phase spaces and **topological** conditions are not optional add-ons; they explain **why** some spectra are discrete and **why** some quantizations are obstructed.

---

### Arc 7 — Complex structures, sigma models, and worldsheets

**Landau anchors (Vol. 4 / string-theory adjacent):** use only as **geometric completion** of deformed variational principles—keep scope disciplined.

| Ch. | Title | Content (minimal) | Classical hook |
|-----|--------|-------------------|----------------|
| 7.1 | Riemann surfaces as $1+1$ geometry | Complex charts; worldsheet action as harmonic map / Polyakov (skeleton). | Classical particle action as worldline; same variational DNA. |
| 7.2 | Conformal symmetry in 2D | Tracelessness of stress tensor classically; Virasoro algebra as quantum central extension. | No analogue in 4D QFT—dimension-dependent rigidity. |
| 7.3 | CFT data (minimal) | Primary fields, OPE, modular invariance on torus; Verlinde formula as **pointer**. | Operator algebra replacing Hamiltonian time evolution in 2D. |
| 7.4 | Sigma models | Target-space geometry pulled back to worldsheet; connection to geometric quantization of loop spaces (pointer). | Maps between manifolds generalize particle trajectories $q:I\to Q$. |

**Deliverable:** **Strings / CFT** appear as **the same deformation philosophy** applied to **maps** $ \Sigma \to X$, not as a separate religion.

---

### Arc 8 — Geometric interpretation, closure, residual failures

| Ch. | Title | Content (minimal) |
|-----|--------|-------------------|
| 8.1 | One deformation, many faces | Table: classical Poisson → commutator; trajectory → state vector; Liouville → unitary; etc. |
| 8.2 | Operator algebras as operational core | $C^\ast$-algebra viewpoint (light); everything measurable lives in expectation values. |
| 8.3 | Microlocal and curved spacetime QFT (pointers) | Hadamard states, wavefront sets, renormalization of $\langle T_{\mu\nu}\rangle$; **no full treatment**. |
| 8.4 | Rigged Hilbert spaces (pointer) | Gelfand triple for continuous spectrum; spectral theorem extension. |
| 8.5 | Supersymmetry (pointer) | Graded algebras; supermanifolds; UV cancellations as **later** deformation. |
| 8.6 | What this page does **not** do | Full rigorous constructive QFT; full renormalization group; measurement problem philosophy; lattice QCD. |

**Deliverable:** Reader leaves with a **single narrative spine** and a **map of where the next books go**.

---

## 4. Coverage map — Landau Vol. 3 ↔ Vol. 4 ↔ arcs

| Rough Vol. 3–4 topic | Primary arc | Secondary arc |
|----------------------|-------------|----------------|
| Uncertainty, operators, Schrödinger | 1, 2 | — |
| Angular momentum, spin, addition | 3 | 2 |
| Perturbation theory, fine structure (NR) | 2, 3 | 5 (preview) |
| Identical particles, statistics | 5 | 3 |
| Relativistic wave equations | 4 | 5 |
| QED: free fields, interactions, diagrams | 5 | 4 |
| Radiative corrections, running coupling (outline) | 8 | 5 |
| Scattering, cross sections | 5 | 4 |
| Semiclassical / WKB | 2 | 6 |
| Adiabatic theorem, Berry (optional later) | 8 | 6 |

*(Adjust row granularity when you align to specific L&L section numbers in a future revision.)*

---

## 5. Cross-links to classical index (implementation note)

When building HTML, each major arc should open with a short **“classical recall”** paragraph linking to concrete anchors, e.g.:

- Arc 2 → `#e-legendre-hamilton`, `#b-symplectic`
- Arc 5 → `#f-gauge-f`, `#f-maxwell-matter`, `#bonus-ehresmann-prelude`
- Arc 6 → `#cohomology-topology`, `#e-hj-integrable`

This mirrors how the classical page internalizes prerequisites **without** requiring off-site reading.

---

## 6. How to build the live page (mirror classical index)

1. **One `index.html`** under e.g. `physics/noncommutative/` with the same `main.doc` / `doc-header` / `toc` / `article.doc-body` pattern as [classical/index.html](classical/index.html).
2. **Stable `id`s** on every `<h3>`; TOC mirrors headings; **no LaTeX in heading text**.
3. **Convention block** early: $\hbar$, signature, HL vs SI for fields (state explicitly).
4. **Boxes** for: canonical commutation, Heisenberg equation, Dirac equation, CCR/CAR, **one** Feynman rule example, integrality condition for prequantization.
5. **Optional bonus** (like Ehresmann): e.g. **Tomita–Takesaki** or **algebraic QFT** one-screen synthesis—only after Arc 5.
6. **Companion `.md`**: after the HTML stabilizes, add `NONCOMMUTATIVE_PHYSICS_LIVE_PAGE_SYNTHESIS.md` using the same pattern as the classical synthesis doc.

---

## 7. Suggested git / maintenance

- Track **Landau section numbers** in commit messages when you align chapters (“Arc 2 ↔ L&L §17–20”).
- When classical index changes anchor IDs, **grep this outline** for `#...` links and update.

---

## 8. Relation to the long “encyclopedic” draft material

The strategy text you provided (epistemological shift, $SU(2)$, geometric quantization, rigged Hilbert spaces, microlocal QFT on curved spacetime, Virasoro / modular invariance, supersymmetry) is **distributed** above: **core Landau-driven material** in Arcs 1–5; **global and infinite-dimensional rigor** as Arcs 6–8 and **pointers**; **2D CFT / strings** confined to Arc 7 to preserve **one spine**. Do **not** front-load CFT or microlocal analysis before the reader has **Heisenberg + Fock**.

---

*This outline is the construction contract for the next index. Implement when ready; revise chapter numbering as the HTML grows.*
