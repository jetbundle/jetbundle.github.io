# Classical physics and mathematics — unified progression

*A single reading spine that interleaves the narrative of [classical physics · basics](basics/index.html) with the structural tools of [mathematical physics](math-physics/index.html). This file is **not** published on the site; it is a map and syllabus. Last aligned with the repository state that includes: expanded math-physics sections (algebra through GR), reflective closings on math-physics, and the physics hub copy on [physics/index.html](index.html).*

---

## 1. What the two indexes are (and why unify them)

| Source | Role |
|--------|------|
| **Basics** | Phenomenological and variational *story*: least action, reduction, stability, Hamiltonian picture, SR, waves, GR, Maxwell/forms — in the spirit of Landau–Lifshitz, with ontological emphasis. |
| **Math physics** | *Definitions and theorems* that make that story coordinate-free and globally consistent: groups, categories, multilinear algebra, manifolds, cohomology, symplectic geometry, Lorentzian structure, connections and curvature. |

**Problem:** Reading only basics leaves the “silent” mathematics unnamed; reading only math physics leaves applications abstract. **This document** orders topics so that each physical idea is accompanied by the minimal mathematical language it actually uses, and each mathematical object is tied to a place in the classical narrative *without* requiring constant tab-switching.

**Conventions (match the current site):** Lorentzian signature is **mostly minus** $\eta=\mathrm{diag}(-1,1,1,1)$ with $x^0=ct$ where relevant; Maxwell/heaviside–lorentz-style field equations appear as on the math-physics page.

---

## 2. Coverage checklist — nothing missed from either index

### From **basics** (eight `h2` sections)

- [x] Variational calculus, Euler–Lagrange, symmetries, Noether-style conservation, Galilean kinetic energy  
- [x] Reduction, effective potentials, center-of-mass / internal splits, symmetry quotienting  
- [x] Linearization, normal modes, stability, small oscillations  
- [x] Phase space, Legendre transform, Hamilton equations, Poisson brackets, Hamilton–Jacobi  
- [x] Special relativity, four-vectors, proper time, free relativistic particle, energy–momentum  
- [x] Waves, radiation, Poynting, retarded potentials, physical meaning of integrals  
- [x] General relativity (equivalence, geodesics, Schwarzschild sketch, light deflection / precession themes)  
- [x] Maxwell as forms, gauge, potentials, monopoles / Dirac string, global topological closure  

### From **math physics** (seven `h2` sections)

- [x] Monoids → groups; homomorphisms; normal subgroups & quotients; categories, functors, exactness, universal properties  
- [x] Vector space axioms; linear maps; characteristic polynomial; Jordan form; spectral vs defective dynamics; inertia tensor vs Jordan (symmetric case)  
- [x] Lie groups/algebras; exp and bracket; smooth quotients $G/H$  
- [x] Bilinear forms; Gram, independence; Hermitian/complex inner products; Minkowski causal type; symplectic Darboux; tensor products; exterior algebra  
- [x] Topological & smooth manifolds; atlases & transitions; $TM$, $T^*M$, frames; partitions of unity; differential forms; $\mathrm{d}$; Cartan / Lie derivative; Frobenius; $SO(3)$ example  
- [x] de Rham cohomology; Dirac monopole class; Mayer–Vietoris; Čech–de Rham / de Rham theorem; Poincaré duality; Thom/Euler; spectral sequences / Serre sketch  
- [x] Classical mechanics on manifolds: $Q$, $TQ$, action, EL, Legendre, $T^*Q$, symplectic form, Poisson axioms, H–J, action–angle, $\pi_1$ / path groupoid  
- [x] Relativistic spacetime & electrodynamics: Minkowski, Lorentz group, particle actions, minimal coupling, $F_{\mu\nu}$, gauge, Maxwell, stress tensor, Liénard–Wiechert schematic  
- [x] Geometric gravity: connection, Levi–Civita, Riemann/Ricci/Einstein, Cartan structure equations, Einstein–Hilbert, Schwarzschild, geodesic deviation  

---

## 3. Unified progression — parts, chapters, and synthesis

Below, **P** = physics (Landau-style narrative), **M** = mathematics (structural). Each chapter states what you should be able to *say* and *compute* after reading the paired site material (expanded with this outline).

---

### Part A — Symmetry, composition, and the variational seed

#### Chapter A1 — *Why “closed system” wants algebraic structure* (P+M)

- **P:** Symmetry of space and time motivates least action; conservation appears from invariance.  
- **M:** Monoid → group as minimal “reversible composition”; morphisms as structure-preserving maps.  
- **Synthesis:** A symmetry of a model is an element of a group acting on states or fields; composing experiments or coordinate changes is group multiplication in disguise.

#### Chapter A2 — *Action, variation, Euler–Lagrange* (P+M)

- **P:** Action $S=\int L\,\mathrm{d}t$, fixed endpoints, first variation, EL equations.  
- **M:** Smooth functions on path space (informal); tangent directions as variations $\delta q$; chain rule and integration by parts as the only calculus lemmas.  
- **Synthesis:** EL is the “projection” of stationarity onto coordinate directions; general coordinates require covariance — preview: only tensorial combinations survive arbitrary reparametrization of $q$ (made precise once $Q$ is a manifold).

#### Chapter A3 — *Linear superposition and spectral stability* (P+M)

- **P:** Small oscillations, normal modes, stability of equilibrium.  
- **M:** Vector space axioms; linear operators; characteristic polynomial; diagonalization vs Jordan blocks; secular terms $t^k e^{\lambda t}$.  
- **Synthesis:** Symmetric operators (e.g. inertia tensor) give orthogonal modes; generic linearization may be defective — Jordan form is the *correct* normal form for non-orthogonal evolution.

#### Chapter A4 — *Bookkeeping across descriptions* (M, light P)

- **M:** Categories, functors, natural transformations (as needed); universal properties (product, coproduct); exact sequences (preview for cohomology).  
- **P:** Same physical system in different coordinates or reduced variables.  
- **Synthesis:** A change of description should be a functorial translation, not an ad hoc rewrite.

---

### Part B — Multilinear measurement: metric, causality, symplectic pairing

#### Chapter B1 — *Bilinear forms and kinetic energy* (P+M)

- **M:** Symmetric bilinear forms; Gram matrix; nondegeneracy; polarization.  
- **P:** Quadratic kinetic energy; generalized coordinates.  
- **Synthesis:** Kinetic energy is a positive-definite quadratic form on velocity vectors at each configuration.

#### Chapter B2 — *Orthogonality, frames, and diagonalization* (P+M)

- **M:** Gram–Schmidt; orthonormal frames; principal axes.  
- **P:** Principal axes of inertia; decoupled modes when quadratic forms commute with symmetry.  
- **Synthesis:** Diagonalization is the choice of coordinates in which bilinear invariants look simplest.

#### Chapter B3 — *Complex amplitudes* (P+M)

- **M:** Sesquilinear/Hermitian inner products; unitary structure.  
- **P:** Oscillations and interference (when basics invoke complex notation in waves).  
- **Synthesis:** “Probability amplitude” magnitude lives in Hermitian geometry, not Euclidean alone.

#### Chapter B4 — *Causal geometry in flat spacetime* (P+M)

- **M:** Indefinite (Minkowski) inner product; timelike / null / spacelike; Lorentz group $O(1,3)$, $SO^+(1,3)$.  
- **P:** Light cones; relativity of simultaneity; four-vectors.  
- **Synthesis:** Causality is the sign of $\eta(v,v)$, not a separate postulate bolted onto Galilean space.

#### Chapter B5 — *Phase space without a Riemannian metric* (P+M)

- **M:** Symplectic form; Darboux coordinates; nondegenerate pairing of positions and momenta.  
- **P:** Hamiltonian mechanics as flow; canonical pairs.  
- **Synthesis:** Symplectic geometry is the natural geometry of *dynamics* in conservative mechanics; metric geometry is optional on $T^*Q$.

#### Chapter B6 — *Tensors and antisymmetry* (P+M)

- **M:** Tensor product; symmetrization / alternation; wedge product; graded commutativity.  
- **P:** Multicomponent fields; oriented area/volume elements; work and flux as “pairings.”  
- **Synthesis:** Exterior algebra is the algebraic home of *oriented* integration and of electromagnetic two-forms.

---

### Part C — Smooth structure: manifolds, bundles, constraints

#### Chapter C1 — *Configuration space as manifold* (P+M)

- **M:** Topological manifold; Hausdorff, second-countable; smooth atlas; transition maps.  
- **P:** Generalized coordinates; constraints; global topology of configuration space (e.g. rotations).  
- **Synthesis:** A chart is a honest local coordinate choice; physics must be independent of chart — EL equations are tensorial/covectorial along the trajectory.

#### Chapter C2 — *Tangent and cotangent bundles* (P+M)

- **M:** $T_pQ$, derivations vs curves; $TQ$, $T^*Q$; vector fields; one-forms.  
- **P:** Velocities vs momenta; Legendre map preview.  
- **Synthesis:** Lagrangian lives naturally on $TQ$ (or jet extensions in time); Hamiltonian on $T^*Q$.

#### Chapter C3 — *Gluing local to global* (M)

- **M:** Partitions of unity; bump functions; global metrics and integrals.  
- **P:** Defining total energy, total charge, global fields on nontrivial spaces.  
- **Synthesis:** Partitions of unity are the analytic reason “patch locally, think globally” is legitimate.

#### Chapter C4 — *Exterior calculus on manifolds* (P+M)

- **M:** Differential forms; exterior derivative $\mathrm{d}$; $\mathrm{d}^2=0$; Lie derivative; Cartan formula; contraction.  
- **P:** Work 1-forms; field strength 2-forms; identities of Maxwell type.  
- **Synthesis:** $\mathrm{d}^2=0$ packages integrable constraints (mixed partials) and is the algebraic root of conserved / cohomological content.

#### Chapter C5 — *Integrable vs nonintegrable constraints* (P+M)

- **M:** Frobenius theorem; distributions; involutivity.  
- **P:** Holonomic vs nonholonomic constraints; rolling.  
- **Synthesis:** Whether constraints integrate to surfaces in $Q$ is exactly a Frobenius integrability question.

#### Chapter C6 — *Example: rigid body and $SO(3)$* (P+M)

- **M:** Lie group as manifold; left-invariant fields; bracket.  
- **P:** Angular velocity; noncommutativity of finite rotations.  
- **Synthesis:** The “space of orientations” is where abstract Lie theory meets everyday mechanics.

---

### Part D — Global topology and cohomology

#### Chapter D1 — *Closed vs exact* (P+M)

- **M:** de Rham complex; closed and exact forms; $H^k_{\mathrm{dR}}$; functorial pullback.  
- **P:** When local potentials fail globally; multivalued phases.  
- **Synthesis:** Cohomology measures obstructions to globalizing primitives.

#### Chapter D2 — *Dirac monopole and flux quantization* (P+M)

- **M:** Nontrivial $[F]\in H^2(\mathbb{R}^3\setminus\{0\})$; period argument.  
- **P:** Strings; consistency of charged matter with monopoles.  
- **Synthesis:** A flux integral is a *period* detecting cohomology class.

#### Chapter D3 — *Computing cohomology* (M)

- **M:** Mayer–Vietoris; double complex; Čech–de Rham; de Rham theorem.  
- **P:** Building global invariants from patches (conceptually).  
- **Synthesis:** Same invariant computed analytically (forms) or combinatorially (covers).

#### Chapter D4 — *Duality and obstructions* (M + P)

- **M:** Poincaré duality; Thom/Euler classes; hairy-ball as obstruction.  
- **P:** Dual pictures of flux and source; topological charges.  
- **Synthesis:** “Dual degrees” pair fields and sources; Euler class answers existence of nowhere-vanishing sections.

#### Chapter D5 — *Spectral sequences (outlook)* (M)

- **M:** Filtered complexes; Serre SS for fibrations.  
- **P:** Field theory / reduced models built over nontrivial base spaces (conceptual).  
- **Synthesis:** Organizes “base ⊗ fiber” topology contributing to totals.

---

### Part E — Classical mechanics in geometric form

#### Chapter E1 — *Action on manifolds and EL* (P+M)

- **M:** $L:TQ\times\mathbb{R}\to\mathbb{R}$; invariant action; EL as intrinsic covector equation.  
- **P:** Covariant formulation of known systems.  
- **Synthesis:** Same variational argument, now independent of coordinate naming on $Q$.

#### Chapter E2 — *Symmetry and Noether charges* (P+M)

- **M:** Lie group actions lifted to $TQ$; momentum maps (informal).  
- **P:** Energy, momentum, angular momentum from invariances.  
- **Synthesis:** Conserved quantity = generator of symmetry in canonical/hamiltonian picture.

#### Chapter E3 — *Legendre transform and Hamiltonian flow* (P+M)

- **M:** Fiber derivative; hyperregularity; Hessian; symplectic manifold $(T^*Q,\omega)$; Hamiltonian vector fields; Poisson algebra axioms.  
- **P:** Equivalent dynamics; canonical transformations.  
- **Synthesis:** Legendre is a dictionary; symplectic structure is the invariant record of canonical pairing.

#### Chapter E4 — *Hamilton–Jacobi and integrability* (P+M)

- **M:** Generating functions; complete integrals; Liouville tori; action–angle variables; periods $\oint p\,\mathrm{d}q$.  
- **P:** Integrable systems; adiabatic invariance (conceptual).  
- **Synthesis:** Period integrals connect mechanics to cohomological “period” thinking.

#### Chapter E5 — *Topological sectors in mechanics* (M + P)

- **M:** $\pi_1(Q)$; path groupoid; composition of paths.  
- **P:** Winding; indistinguishable particles in 2D; monodromy in integrable systems.  
- **Synthesis:** Global content of configuration space enters quantum/statistical stories; classically, path sectors matter for actions.

---

### Part F — Relativity and electrodynamics (flat spacetime)

#### Chapter F1 — *Minkowski space and particle dynamics* (P+M)

- **M:** Interval; proper time; Lorentz transformations; four-velocity; mass shell (mostly-minus).  
- **P:** Free relativistic particle; energy–momentum conservation.  
- **Synthesis:** Invariant norm of four-momentum replaces separate mass/energy rules.

#### Chapter F2 — *Potential one-form and field strength* (P+M)

- **M:** $A$ as 1-form; $F=\mathrm{d}A$; gauge $A\mapsto A+\mathrm{d}\chi$; $[F]$ cohomological.  
- **P:** Scalar/vector potentials; gauge freedom; fields $\mathbf{E}$, $\mathbf{B}$ from $F_{\mu\nu}$.  
- **Synthesis:** Gauge is not ambiguity — it is the affine space of primitives for a closed $F$.

#### Chapter F3 — *Coupled particle and field equations* (P+M)

- **M:** Minimal coupling; Lorentz force; Maxwell equations $\mathrm{d}F=0$, $\partial_\mu F^{\mu\nu}\propto J^\nu$; stress tensor; $\partial_\mu T^{\mu\nu}=0$.  
- **P:** Lorentz force law; energy and momentum in fields; wave equation / retarded Green’s; Liénard–Wiechert (schematic).  
- **Synthesis:** One variational principle for matter + field (when formulated); causality in Green’s functions matches light cones.

---

### Part G — Gravity as dynamical Lorentzian geometry

#### Chapter G1 — *Why partial derivatives fail; connection* (P+M)

- **M:** Affine connection; Christoffel (Levi–Civita); parallel transport; tensor covariant derivative.  
- **P:** Equivalence principle; freely falling frames as local inertial; geodesics.  
- **Synthesis:** “Inertial motion” = geodesic of metric-compatible, torsion-free connection.

#### Chapter G2 — *Curvature* (P+M)

- **M:** Riemann tensor from $[\nabla,\nabla]$; Ricci, scalar, Einstein tensor; Bianchi; $\nabla_\mu G^{\mu\nu}=0$.  
- **P:** Tidal forces; deviation of geodesics.  
- **Synthesis:** Riemann is the infinitesimal holonomy of parallel transport — gravity as geometry, not as force in flat space.

#### Chapter G3 — *Cartan and Einstein equations* (P+M)

- **M:** Frame, spin connection, curvature 2-forms; Einstein–Hilbert action; Einstein equations; (optional $\Lambda$).  
- **P:** Field equations couple geometry to $T_{\mu\nu}$; conservation consistent with Bianchi.  
- **Synthesis:** Same variational habit as mechanics/Maxwell; dynamical variable is now $g_{\mu\nu}$.

#### Chapter G4 — *Schwarzschild and orbital phenomenology* (P)

- **P:** Spherical vacuum solution; effective potential; precession, light deflection, ISCO themes.  
- **M:** Killing vectors and conserved quantities along geodesics.  
- **Synthesis:** Symmetry reduction of GR parallels Hamiltonian reduction in mechanics.

---

## 4. Suggested reading orders

**Order 1 — Follow unified parts A→G** (this document): best for *one narrative*, assuming you use basics + math-physics as expanded references when a chapter points there.

**Order 2 — Site as published:** basics linearly, then math-physics linearly: fastest if you already know one side well.

**Order 3 — Problem-driven:** pick a Part (e.g. D if stuck on monopoles/strings) and read the listed chapters in both pages.

---

## 5. Appendix — anchor map (quick lookup)

| Unified part (this doc) | Basics `section` id | Math physics `section` id |
|-------------------------|---------------------|---------------------------|
| A2 | `#variational-calculus-and-symmetries` | (prelim: vectors in `#algebraic-substrate-and-categorical-foundations`) |
| A3 | `#linearization-and-normal-modes` | `#algebraic-substrate-and-categorical-foundations` (Jordan, inertia) |
| B* | (throughout mechanics / SR) | `#metric-and-multilinear-structures` |
| C* | `#reduction-and-effective-potentials`, constraints in narrative | `#differentiable-manifolds-and-the-calculus-of-forms` |
| D* | `#global-and-topological-closure` | `#cohomological-invariants-and-spectral-topology` |
| E* | `#phase-space-and-canonical-structure`, `#variational-calculus-and-symmetries` | `#the-kinematics-and-dynamics-of-classical-mechanics` |
| F* | `#special-relativity-and-the-free-relativistic-particle`, `#waves-radiation-and-the-physical-meaning-of-integrals`, `#global-and-topological-closure` | `#relativistic-spacetime-and-electrodynamics` |
| G* | `#general-relativity-and-curved-spacetime` | `#geometric-gravity-connections-and-curvature` |

---

## 6. Hub page (`physics/index.html`) — intent

The hub stresses: master basics before skipping ahead; then use math physics to name the machinery (categories, manifolds, cohomology, symplectic/Riemannian backbones). This unified outline is the **deductive complement** to that advice: one ordered path instead of two parallel books.

---

*End of unified progression document.*
