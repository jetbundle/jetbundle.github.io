# Classical physics page — synthesis, scope, and methodology

This document describes **what the live classical physics page is**, **how it was assembled**, **how it relates to Landau–Lifshitz volumes 1–2**, and **why the unified approach is effective**. It is a high-level companion to the HTML itself, not a line-by-line transcript of equations.

**Live page:** [`physics/classical/index.html`](classical/index.html) (published as the site’s classical physics entry from [`physics/index.html`](index.html)).

**Related checklist (older anchor map):** [`CLASSICAL_PHYSICS_AND_MATHEMATICS_UNIFIED.md`](CLASSICAL_PHYSICS_AND_MATHEMATICS_UNIFIED.md) — itemized P/M pairing; the classical page is the **filled-in** realization of that spine in one document.

---

## 1. What was built

A **single, long-form HTML document** that presents classical theoretical physics as **one continuous progression**: from algebraic symmetry and variational principles through multilinear structure, smooth manifolds and bundles, cohomology, geometric mechanics, flat spacetime electrodynamics, and dynamical Lorentzian geometry, plus an optional **bonus** coda on Ehresmann connections as a unifying lens.

**Form:**

- One outline (table of contents with internal anchors), one article body, consistent sectioning (`h2` major arcs, `h3` units).
- **KaTeX** for inline and display mathematics (`$...$`, `$$...$$`).
- **Conventions** stated up front: mostly-minus Lorentzian signature and $x^0 = ct$ where relevant.

**Extent (rough):**

- **Seven main arcs**, each split into **several `h3` units** (on the order of thirty substantive subsection headings total).
- **Bonus section** (easter-egg style in the outline): prelude tying symplectic, Riemannian, Einsteinian, and gauge-bundle viewpoints to **Ehresmann geometry** (horizontal/vertical split, parallel transport, curvature as obstruction).

**What it is not:**

- Not a PDF textbook, not a problem book, not a formal theorem–proof monograph.
- Not a substitute for working exercises or for specialized references in symplectic geometry, GR, or gauge theory.

---

## 2. Pedagogical approach: Landau 1–2 × explicit mathematical structure

### 2.1 Landau–Lifshitz as the physical backbone

**Mechanics (L&L 1)** emphasizes: least action, Lagrangian and Hamiltonian formulations, symmetries and conservation, small oscillations and stability, rigid-body and rotational structure, and the drive toward a **principled** (not ad hoc) formulation of dynamics.

**Classical theory of fields (L&L 2)** extends the same spirit to **relativistic** particles and fields, special relativity, electromagnetic field as a relativistic object, variational principles for fields, and the conceptual path toward **geometric** gravitation (equivalence, metric, geodesics, curved spacetime).

The classical page **does not** reproduce Landau paragraph-for-paragraph. It **dwells** with the same *order of ideas* while **naming and using** the mathematical objects that Landau often leaves implicit or compresses: groups and actions, tangent and cotangent bundles, differential forms, cohomology classes, symplectic forms, connections and curvature, and the Maxwell and Einstein equations in explicit tensor/form language.

### 2.2 Why interleave “physics story” and “mathematical spine”

Traditional splits cause two failures:

1. **Physics-only narrative** — correct intuitions but fragile under change of coordinates or global topology (when is a potential global? why does a monopole need a string? why is gauge not “just notation”?).
2. **Mathematics-only treatment** — clean definitions but weak attachment to what physical law is *forcing* each structure.

The classical page is built so that **each major arc answers operational questions** (what transforms how, what is conserved, what is obstructed globally, what a field equation enforces) **using** the minimal structural language that makes those answers **coordinate-independent and globally consistent**.

---

## 3. Arc-by-arc summary and Landau mapping

| Arc on the page | Mathematical core (high level) | Landau 1–2 resonance |
|-----------------|----------------------------------|----------------------|
| **Symmetry, composition, variation** | Monoids/groups, actions, action principle, Euler–Lagrange, linearization and spectra, categorical bookkeeping | L&L 1: principles of least action, symmetry, EL equations, small oscillations; language for “same system, different description” |
| **Multilinear pairings** | Bilinear forms, frames, Hermitian structure, Minkowski pairing, symplectic pairing, tensors and exterior algebra | L&L 1–2: kinetic energy as quadratic form; SR causal structure; phase space geometry; fields as multilinear objects |
| **Manifolds, bundles, constraints** | Manifolds, $TQ$, $T^*Q$, partitions of unity, exterior derivative, Frobenius vs nonholonomic constraints, $SO(3)$ rigid body | L&L 1: configuration space beyond $\mathbb{R}^n$, constraints, rigid body; preparation for field theory on spacetime manifolds |
| **Cohomology, global topology** | de Rham cohomology, periods, Dirac monopole / flux, Mayer–Vietoris, Čech–de Rham outlook, duality and Euler-type obstructions | L&L 2: Maxwell, potentials, **global** issues (monopoles, strings, topological sectors); “closed vs exact” as physical content |
| **Geometric mechanics** | Action on $TQ$, Noether data, Legendre, Hamiltonian flow, Poisson structure, Hamilton–Jacobi / action–angle, $\pi_1$ and path sectors | L&L 1: Hamiltonian picture, integrable structure, reduction; bridges to quantum phase and semiclassics in spirit |
| **Flat spacetime: SR and ED** | Minkowski metric, four-momentum, gauge potential and field strength, Maxwell, stress–energy, causality and radiation | L&L 2: SR, relativistic particle, electrodynamics, energy–momentum of fields |
| **Dynamical Lorentzian geometry** | Levi–Civita connection, geodesics, Riemann/Ricci/Einstein, Bianchi, geodesic deviation, Cartan/vierbein, Einstein–Hilbert, Schwarzschild and orbital tests | L&L 2: GR as geometric theory; classical tests; tidal interpretation of curvature |
| **Bonus: Ehresmann prelude** | Fiber bundles, horizontal distribution, parallel transport, holonomy; symplectic vs metric vs gauge vs frame-bundle views | Meta-synthesis: one geometric idea (connection / horizontal lift) behind several chapters |

---

## 4. Inventory of mathematical structures (compressed)

The page is designed so the reader repeatedly encounters the same **types** of object:

- **Algebraic:** composition laws, group actions, homomorphisms, quotients, exact-sequence thinking (preview and full use in cohomology).
- **Linear/multilinear:** inner products, quadratic forms, spectral data, complex Hermitian structure, indefinite Minkowski form, symplectic form, tensor and wedge calculus.
- **Smooth geometric:** charts, tangent and cotangent bundles, vector fields, differential forms, exterior derivative, distributions and Frobenius integrability.
- **Global:** cohomology classes, periods, obstruction to global primitives, patching arguments (Mayer–Vietoris / Čech outlook).
- **Dynamical geometric:** symplectic/Hamiltonian flows, Legendre transform, constraints and reductions.
- **Field-theoretic (flat):** Lorentz tensors, gauge symmetry, Maxwell equations, stress–energy, causal structure.
- **Field-theoretic (curved):** metric compatibility, curvature tensors, Einstein equations, Cartan formulation, vacuum solutions and phenomenology.

---

## 5. Why this approach is effective

1. **Single spine.** One scroll (or one file) removes context-switching between “story” and “structure”; the reader sees *one* ordered narrative.

2. **Operational focus.** Sections are organized around what you can **say** and **compute**: variations, modes, parallel transport, periods, conserved quantities, field equations.

3. **Global literacy early.** Cohomology and gauge are not postponed to a vague “advanced appendix”; they appear where Maxwell and topology force them, matching how modern field theory is actually read.

4. **Capstone coherence.** Special relativity and electrodynamics on Minkowski space, then Lorentzian geometry and Einstein gravity, read as **one upgrade path** from fixed metric to dynamical metric.

5. **Explicit conventions.** Signature and units are fixed once, reducing silent inconsistency when comparing SR, ED, and GR blocks.

6. **Optional synthesis layer.** The Ehresmann bonus makes explicit that **connections and horizontal lifts** are the repeated metaphor behind several otherwise disparate chapters — useful for readers who already walked the full arc once.

---

## 6. How it was done (process, at a high level)

- **Merged intent** of earlier split drafts (narrative “basics” and structural “math physics”) into **one** classical page, so definitions and phenomenology stay **co-located**.
- **Expanded** each arc with **self-contained** prose and displayed mathematics (EL derivations, normal modes, manifold definitions, de Rham and monopole story, symplectic and Hamiltonian layer, Maxwell and stress tensor, connection/curvature through Schwarzschild).
- **Normalized** presentation details: heading text without LaTeX where readability on small screens matters; global CSS for emphasis; removal of syllabus-style “item codes” from visible intros in favor of continuous prose (the older `.md` checklist remains for authors who want A1/B2-style parity checks).
- **Added** a **bonus** section and a **subtle** outline link so advanced readers get an explicit “four geometries, one connection idea” map without bloating the main outline.

---

## 7. Suggested use

- **First pass:** follow the outline top to bottom; skim proofs, focus on definitions and boxed equations.
- **Second pass:** pick a physical thread (e.g. “gauge”) and trace it through multilinear → forms → cohomology → ED → (optional) Ehresmann bonus.
- **Landau parallel:** read a L&L chapter, then jump to the matching arc on the classical page for the **structural** closure.

---

## 8. Maintenance note

When the HTML page grows, update this synthesis **only** if the **scope or intent** of the project changes (new arcs, moved capstones, changed conventions). Detailed equation-level parity belongs in the page itself or in `CLASSICAL_PHYSICS_AND_MATHEMATICS_UNIFIED.md`, not in this overview.

---

*Last aligned with the repository state that includes: seven main arcs, bonus Ehresmann prelude, physics hub pointing to classical only, and the conventions stated in the classical page header.*
