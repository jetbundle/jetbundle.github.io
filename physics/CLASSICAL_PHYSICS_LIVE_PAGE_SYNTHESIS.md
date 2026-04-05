# Classical physics live index — synthesis and documentation

This document **transcribes and explains** what the consolidated page [classical/index.html](classical/index.html) (`physics/classical/index.html` on the site) **is**, **how far it goes**, **why it is structured as it is**, and **how the mathematics supports a Landau–Lifshitz-style arc** (Mechanics and The Classical Theory of Fields, i.e. “Landau 1–2” in common shorthand). It is **not** a line-by-line copy of the HTML; it is a **high-level mathematical map** of the same content, plus **principles** for building analogous long-form pages.

For a **checklist-style spine** with chapter codes (A1–G4) and parity with older “basics / math-physics” drafts, see [CLASSICAL_PHYSICS_AND_MATHEMATICS_UNIFIED.md](CLASSICAL_PHYSICS_AND_MATHEMATICS_UNIFIED.md). The present file focuses on the **live unified index** as the canonical in-repo presentation.

---

## 1. What this artifact is

| Aspect | Description |
|--------|-------------|
| **Medium** | Single scrolling HTML document: personal narrative header, numbered outline (TOC), one `<article>` with major `<section>` arcs, KaTeX for inline and display math, site-wide `styles.css` for long-form “doc” pages. |
| **Audience assumption** | Reader tolerates dense definitions; wants **operational** statements (what to compute, what is conserved, what obstructs globality) alongside **coordinate-free language** where it pays off. |
| **Scope** | **Classical** field and particle theory through **geometric gravity** in vacuum (Schwarzschild template), **flat** Minkowski electrodynamics, and **global** topological tools (de Rham, monopole / periods, Mayer–Vietoris, duality outlook). **Not** full QFT, quantum mechanics, or standard-model gauge theory in depth. |
| **Voice** | Deliberately informal, first-person, “Landau-adjacent” motivation in prose; **mathematical claims** in the technical blocks are still meant to be **standard** (definitions, boxed equations, Bianchi identities, etc.). |

**Extent:** The page is **self-contained** in intent: it does not require navigating separate “basics” or “math-physics” URLs to follow the spine (those drafts may still exist in the repo but are not the hub of the classical road).

---

## 2. Landau 1–2 and the mathematical spine

**Landau & Lifshitz, *Mechanics* (Vol. 1)** emphasizes: variational principle, Lagrangian formulation, conservation from symmetry, integrable structure (Hamilton–Jacobi, adiabatic invariants where discussed), rigid body and rotation, and the logical primacy of **principle of least action** over Newtonian force-first thinking.

**Landau & Lifshitz, *The Classical Theory of Fields* (Vol. 2)** emphasizes: special relativity, four-tensors, point charge in external fields, **electromagnetic field** as tensor $F_{\mu\nu}$, Maxwell equations, energy–momentum tensor, radiation; then **general relativity** as pseudo-Riemannian geometry, geodesic hypothesis, curvature, and weak-field / Schwarzschild-style phenomenology.

The **live classical index** interleaves the **minimal mathematics** that makes those narratives **globally coherent**:

- **Vol. 1** needs: groups and actions (symmetry), calculus of variations (EL), linear algebra and spectra (stability), phase space and symplectic structure (Hamiltonian picture), and once constraints and coordinates become serious: **manifolds**, $TQ$, $T^*Q$, and later **topology of configuration space** ($\pi_1$, path sectors).
- **Vol. 2** needs: **Minkowski** linear algebra (indefinite signature), **gauge** structure for $A$ and $F$, **Maxwell** as geometric field equations, then **Lorentzian manifolds**, **connections**, **curvature**, **Einstein equations**, and a **Schwarzschild** worked template.

**Synthesis:** The page is “Landau 1–2” not in page order of the books, but in **dependency order for a modern reader**: multilinear and symplectic geometry **before** you insist fields live on manifolds; **de Rham cohomology** before you claim monopoles and gauge classes are “just notation”; **principal-bundle thinking** (made explicit in the bonus Ehresmann section) **after** you have seen $A$, $F$, and Cartan on the frame bundle in GR.

---

## 3. Conventions (match the live page)

- Lorentzian metric: **mostly minus**, $\eta = \mathrm{diag}(-1,1,1,1)$, often $x^0 = ct$.
- Electrodynamics: **Heaviside–Lorentz**-style rationalized expressions where stated (no explicit $4\pi$ in vacuum Maxwell in the form used on the page).
- Headings on the site: **plain language** in `<h2>` / `<h3>` (no LaTeX in titles); math stays in paragraphs and `$$` blocks.

---

## 4. Arc-by-arc mathematical content (high level, expanded)

Below, each **arc** matches a major `<h2>` on the live page. Sub-bullets match the **subsection order** roughly as implemented.

### 4.1 Symmetry, composition, variation

**Mathematical core:** Algebraic structures recording **redundancy** (symmetry), **selection** of trajectories (stationary action), **local linear analysis** (spectra, stability), and **functorial bookkeeping** (same physics, different descriptions).

- **Monoids and groups:** Composition of allowed transformations; inverses when every symmetry should be reversible on the state space. Homomorphisms encode “change of coordinates / units” preserving structure.
- **Group actions on configuration space:** Orbits, stabilizers, quotients $Q/G$ when observables are constant on orbits (smooth free proper actions $\Rightarrow$ smooth quotient).
- **Euler–Lagrange:** Action $S[q] = \int L(q,\dot q,t)\,\mathrm{d}t$; first variation with fixed endpoints; fundamental lemma $\Rightarrow$ EL. Chain rule yields **covariance** of EL expressions once $Q$ is a manifold (previewed here; made intrinsic in the geometric mechanics arc).
- **Linearization:** Equilibrium $\Rightarrow$ Jacobian / Hessian structure; normal modes from **symmetric** operators in many mechanical problems; **Jordan form** when diagonalization fails (secular terms, defective dynamics).
- **Categorical language (light):** Products, equalizers, natural transformations as **templates** for “same object, different chart” and for exact-sequence thinking later (cohomology).

**Why here first:** Landau’s “symmetry $\Rightarrow$ conservation” story is **empty** without a compositional model; variational calculus is **empty** without a clear domain for $q$ and $\dot q$ (resolved when $Q$ becomes a manifold).

---

### 4.2 Multilinear pairings

**Mathematical core:** **Quadratic** and **bilinear** invariants (kinetic energy, metrics), **unitary/Hermitian** structure (oscillations, polarization), **indefinite** inner products (causality), **symplectic** pairings (dynamics without a Riemannian metric on phase space), **tensor and exterior** products (multicomponent fields, oriented integration).

- **Bilinear forms:** Gram matrix, polarization identity, change of basis = congruence $g \mapsto P^{\mathsf T} g P$.
- **Diagonalization / frames:** Principal axes; orthogonal group as symmetry of a chosen Euclidean metric.
- **Hermitian structure:** Complex amplitudes; unitary changes of basis preserve probability-type norms.
- **Minkowski pairing:** Timelike / null / spacelike; Lorentz group as linear symmetries of $\eta$; physical law stated as **tensor** equations on $(\mathbb{R}^4,\eta)$.
- **Symplectic form on $T^*Q$:** Canonical $\omega = \mathrm{d}p_i \wedge \mathrm{d}q^i$ in Darboux coordinates; **nondegenerate** antisymmetric pairing vs **symmetric positive-definite** metric on $TQ$.
- **Exterior algebra:** $k$-forms as multilinear antisymmetric maps; wedge product; de Rham operator $\mathrm{d}$ foreshadowed; “flux / work as pairing with cycles” preview.

**Landau bridge:** Vol. 1 kinetic energy as quadratic form in velocities; Vol. 2 four-vectors and $F_{\mu\nu}$ as tensors built from multilinear structure.

---

### 4.3 Manifolds, bundles, constraints

**Mathematical core:** Configuration space as **smooth manifold** $Q$; **tangent and cotangent bundles**; **partitions of unity** for global existence (metrics, bump functions, glueing arguments); **differential forms** and $\mathrm{d}^2=0$; **Frobenius theorem** (integrable distributions $\Leftrightarrow$ submanifolds vs **nonholonomic** constraints); **$SO(3)$** as orientation-preserving rotations (rigid body, double covers, charts via Euler angles / quaternions).

- **Charts and atlases:** Transition maps; tangent vectors as derivations or curve classes; cotangent vectors as differentials of functions.
- **Vector fields, flows:** Lie bracket; link to integrability of constraint distributions.
- **Forms:** Exterior derivative; Cartan magic formula (as used on page); closed vs exact **locally** vs **globally** (feeds cohomology arc).

**Landau bridge:** “Generalized coordinates” $\Rightarrow$ chart-dependent description of **intrinsic** objects; constraints in mechanics (rolling, sliding) $\Rightarrow$ **nonholonomic** vs **holonomic** geometry.

---

### 4.4 Cohomology, global topology

**Mathematical core:** **de Rham cohomology** $H^\bullet_{\mathrm{dR}}(M)$ as obstruction from closed forms to global primitives; **periods** (integrals over cycles); **Dirac monopole** as motivating singular connection / nontrivial class; **Mayer–Vietoris** and **Čech–de Rham** as computational tools from patches; **Poincaré duality** and **Euler/Thom** classes as dual pairing and obstruction to nowhere-vanishing sections; **spectral sequences** as optional outlook for fibrations.

- **Closed vs exact:** $Z^p$ vs $B^p$; $H^p = Z^p/B^p$.
- **Physical reading:** Magnetic flux as period; Aharonov–Bohm as flat connection with nontrivial holonomy; gauge patching as Čech 1-cocycle.

**Landau bridge:** Vol. 2 themes “Maxwell + monopole + gauge” and “fields as connections” become **honest global statements** only after cohomology language exists.

---

### 4.5 Geometric mechanics

**Mathematical core:** Action on **velocity manifold** $TQ$; **intrinsic Euler–Lagrange** (fiber derivative); **Noether** theorem via lifted group actions and momentum maps; **Legendre transform** $\Rightarrow$ Hamiltonian on $T^*Q$ with canonical **symplectic** structure; **Poisson brackets**; **Hamilton–Jacobi** as generating-function / canonical transformation method; **integrable** systems and **action–angle** coordinates (Liouville–Arnold sketch); **$\pi_1(Q)$** and **path sectors** for multivalued actions / quantum-style interference preview.

**Landau bridge:** This is the **geometric completion** of Vol. 1’s analytical mechanics: same physics, but $Q$ arbitrary manifold, symmetries handled intrinsically, topology of $Q$ affecting path-space structure.

---

### 4.6 Flat spacetime: SR and ED

**Mathematical core:** Minkowski line element and proper time; four-velocity and four-momentum; **minimal coupling** $-q A_\mu \mathrm{d}x^\mu$; field strength $F = \mathrm{d}A$ (two-form); gauge $A \mapsto A + \mathrm{d}\chi$; **Maxwell** $\mathrm{d}F=0$, $\mathrm{d}*F = *J$ (or equivalent tensor form); **stress–energy tensor**; **causal** propagation / Green’s functions; **Liénard–Wiechert** schematic.

**Landau bridge:** Directly Vol. 2 flat-spacetime field theory, with **cohomological** reading of gauge class $[A]$ and $[F]$ tied back to prior arc.

---

### 4.7 Dynamical Lorentzian geometry (GR template)

**Mathematical core:** Levi–Civita connection (metric-compatible, torsion-free); **geodesic** equation; **normal coordinates** and equivalence principle; **Riemann** curvature; **Ricci**, **scalar**, **Einstein tensor**; **contracted Bianchi** $\nabla_\mu G^{\mu\nu}=0$; **geodesic deviation** (tidal equation); **Cartan** vierbein and **structure equations**; **Einstein–Hilbert** action and **Einstein field equations**; **Schwarzschild** metric; conserved quantities along geodesics; **ISCO**, perihelion precession, light deflection scalings.

**Landau bridge:** Vol. 2 GR chapters in **geometric** form: gravity as **dynamics of metric**, not as fixed-background force.

---

### 4.8 Bonus: Ehresmann geometry (easter egg)

**Mathematical core (synthesis, not a full course):** For $\pi:E\to M$, **vertical bundle** $V=\ker \mathrm{d}\pi$; **Ehresmann connection** as horizontal complement $H \subset TE$; **parallel transport** and **holonomy**; **curvature** as obstruction to integrability of horizontal distribution. Relates **symplectic** (no split until extra data), **Riemannian** (LC on $TM$), **Einstein–Cartan** (frame bundle), and **gauge** (principal bundle connection, $A$, $F$, cohomology) as **one family of pictures**.

**Purpose on the site:** Answer “why did we keep seeing connections, curvature, and obstructions?” without duplicating full bundle-theory courses.

---

## 5. Why this approach is effective (for this project)

1. **Single dependency chain:** Each arc uses objects **defined earlier** (e.g. forms before Maxwell as forms; cohomology before gauge obstructions; manifolds before intrinsic EL).
2. **Dual encoding:** **Prose motivation** (Landau spirit) + **boxed equations** (exam-ready) reduces the gap between “story” and “structure.”
3. **Global honesty:** Stating **closed $\neq$ exact** on $M$ and **nontrivial holonomy** prevents the reader from thinking gauges and monopoles are purely algebraic tricks.
4. **One scroll, one convention block:** Minimizes context switching; signature and units are fixed once at the top.
5. **Optional coda:** The Ehresmann bonus gives **intellectual closure** without bloating the main syllabus.

---

## 6. Principles for building similar long-form pages

Use this as a **template** for other topics (e.g. statistical mechanics, QFT prep, differential geometry deep dive).

1. **Declare the artifact:** One page or one bounded set of pages? Primary math convention block at the top (signature, units, common abbreviations).
2. **Choose a spine, not a textbook clone:** Order by **logical dependency** and **your** narrative, not by historical publication order of a single book.
3. **Major arcs = chapters:** Each arc should have: (i) **motivation paragraph**, (ii) **definitions with axioms** where useful, (iii) **one or two flagship computations** or boxed identities, (iv) **one sentence** linking forward to the next arc.
4. **Mathematics first when physics is ambiguous:** If a physical phrase (“vector potential,” “gauge,” “coordinate transformation”) has two meanings, **name the object** (bundle, connection, diffeomorphism) before using it in a law.
5. **Separate “outline” from “body”:** TOC with stable `id` anchors; headings without fragile math rendering in titles (accessibility and consistent typography).
6. **Box sparingly:** Reserve boxes for **definitions you will reuse** or **identities that are easy to misremember** (Bianchi, EL, geodesic deviation, Einstein equations).
7. **Know your extent:** State what you **omit** (e.g. no quantum, no proof of full de Rham theorem) to set expectations.
8. **Optional advanced coda:** After the main spine, a **short synthesis** (like Ehresmann) can unify themes without derailing beginners.
9. **Version the prose separately from the math:** Personal voice can change; **symbol conventions** and **definition text** should change only deliberately; keep a short **changelog** in git commits.
10. **Mirror in markdown:** Maintain a `.md` **synthesis** (like this file) when the HTML grows long, so collaborators (and future you) see the **map** without parsing 1500+ lines of HTML.

---

## 7. File and site map (quick reference)

| Resource | Role |
|----------|------|
| [classical/index.html](classical/index.html) | **Live** unified classical physics + mathematics document. |
| [CLASSICAL_PHYSICS_AND_MATHEMATICS_UNIFIED.md](CLASSICAL_PHYSICS_AND_MATHEMATICS_UNIFIED.md) | Checklist spine, A1–G4 style parity, links to legacy drafts. |
| **This file** | **Documentation + mathematical synthesis** of the live index; **meta-principles** for similar pages. |
| [NONCOMMUTATIVE_PHYSICS_LANDAU_3_4_OUTLINE.md](NONCOMMUTATIVE_PHYSICS_LANDAU_3_4_OUTLINE.md) | **Planned** continuation (Landau 3–4): eight-arc outline, chapter units, classical anchor cross-links; contract for a future `noncommutative/` index. |
| [physics/index.html](index.html) | Hub; primary public entry to `classical/`. |

---

## 8. Changelog (suggested maintenance)

When you materially extend the classical index, append a line here or in git only:

- *Example:* “Added subsection on …” / “Extended spectral sequence outlook …”

*Initial version:* written to match the classical index structure including the **Ehresmann bonus** section and plain-text **h2/h3** headings.
