#!/usr/bin/env python3
"""Style pass: intros, footer, em/en dashes for physics/classical/index.html."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "physics" / "classical" / "index.html"
t = path.read_text()

HEADER_OLD = """        <header class=\"doc-header\">
            <h1>classical physics</h1>
            <p class=\"doc-lead\"><em>unified presentation</em></p>
            <p class=\"doc-intro\">a single progression from symmetry and variational principles through differential
                geometry, cohomology, geometric mechanics, flat spacetime field theory, and dynamical lorentzian
                geometry. each major block below is written to stand on its own.</p>
            <p class=\"doc-intro\"><strong>convention:</strong> lorentzian signature is mostly minus
                $\\eta=\\mathrm{diag}(-1,1,1,1)$ and $x^0=ct$ unless noted otherwise.</p>
        </header>"""

HEADER_NEW = """        <header class=\"doc-header\">
            <h1>classical physics</h1>
            <p class=\"doc-lead\"><em>one long revenge arc against doing classical mechanics in the wrong order</em></p>
            <p class=\"doc-intro\">i have leapt into axioms before breakfast, nursed crushes on symmetry groups that
                never texted back, and embarrassed myself often enough to know the fix is not humility but writing the
                spine down with teeth. this page is the same material i once scattered across half finished narrative and
                structural drafts, now forced into one continuous walk: action and symmetry, multilinear bookkeeping,
                manifolds when coordinates lie, cohomology when topology sulks, symplectic life on $T^*Q$, minkowski and
                maxwell while spacetime is still flat, and lorentzian curvature when even light needs geometry to lean on.
                landau is the ghost in the room; the jokes are mine.</p>
            <p class=\"doc-intro\">treat it like a night drive. skim the outline, pick a fight with a definition, compute
                something petty but exact, wander into a lemma because the emotional beat demands it. the mathematics below
                is the same operational kit those older drafts were groping toward: what transforms how, what is conserved,
                what global obstruction hides in a period integral, what a field equation actually forces.</p>
            <p class=\"doc-intro\"><strong>convention:</strong> lorentzian signature is mostly minus
                $\\eta=\\mathrm{diag}(-1,1,1,1)$ and $x^0=ct$ unless noted otherwise.</p>
        </header>"""

FOOT_OLD = """        <footer class=\"doc-footer\">
            <p><a href=\"../\">physics</a> · headings: <span style=\"color:var(--link)\">purple</span> ($h2$) = major arc,
                <span style=\"color:var(--link-hover)\">orange</span> ($h3$) = unit.</p>
        </footer>"""

FOOT_NEW = """        <footer class=\"doc-footer\">
            <p><a href=\"../\">physics</a> · $h2$ headings tint <span style=\"color:var(--link)\">purple</span>, $h3$ units
                tint <span style=\"color:var(--link-hover)\">orange</span>. if you expected a corporate accessibility
                statement, try a different universe.</p>
        </footer>"""

S1_OLD = """                <p>this block is <strong>self-contained</strong>. it develops symmetry–composition–variation (items A1–A4): algebraic composition laws for redundancies,
                    stationary action and euler–lagrange equations, linearized dynamics and spectral data, then categorical
                    bookkeeping for changes of description.</p>
                <p>the motivating tension is plain: experiments can be translated, rotated, or time-shifted without
                    changing outcome laws, yet a <em>single</em> trajectory is realized. classical mechanics resolves
                    this by (i) encoding redundancies as a compositional algebra acting on configuration data, (ii)
                    selecting motion by a scalar functional whose first variation vanishes, (iii) analyzing small
                    departures from equilibrium by linear operators whose spectral invariants carry stability, and (iv)
                    requiring that re-coordinatizations and reductions be morphisms—or functors—not ad hoc renamings.</p>"""

S1_NEW = """                <p>nobody agrees how much group theory you deserve before dinner. here the bargain is blunt:
                    redundancies compose, actual paths are picked by a scalar functional whose first variation vanishes,
                    small wobbles are diagnosed by spectra that do not care about your feelings, and when you change
                    description you use morphisms that preserve the structure you pretended was obvious.</p>
                <p>the laboratory joke stays fresh: translate the table, rotate the room, shift midnight on the clock, and
                    the laws had better rhyme. a <em>single</em> trajectory still happens, so classical mechanics lets a
                    compositional algebra eat configuration data, lets action select the realized path, linearizes so
                    springs confess their moods, and refuses to let coordinate renamings pose as physical insight.</p>"""

S2_OLD = """                <p>this block is <strong>self-contained</strong>. the multilinear pairings arc (items B1–B6) runs as follows: euclidean kinetic energy as a symmetric bilinear pairing, orthonormal frames
                    and spectral diagonalization, complex hermitian structure for amplitudes, indefinite minkowski pairing
                    and the lorentz group, symplectic (not metric) geometry of phase space, then tensor and exterior
                    products for multicomponent and antisymmetric objects. no links below point to other site pages.</p>
                <p>physically, different “geometries” coexist: a positive-definite quadratic form measures kinetic cost
                    in velocity space at fixed configuration; a lorentzian form classifies causal order in flat
                    spacetime; a symplectic form pairs positions and momenta without choosing a riemannian distance on
                    phase space. tensors and wedges unify how multilinear measurements transform under linear changes of
                    components.</p>"""

S2_NEW = """                <p>kinetic energy was never mysterious; it was always a symmetric bilinear form pretending to
                    be a vibe. this block stacks the geometries you actually use: diagonalize like you mean it, let
                    hermitian structure govern amplitudes, let minkowski pick fights about causality, let symplectic form
                    remind you phase space is not a riemannian cosplay, then let tensors and wedges package how multilinear
                    measurements twist when you change linear coordinates.</p>
                <p>physically these coexist without apology. a positive definite quadratic form tolls velocity at fixed
                    configuration; a lorentzian form sorts events into timelike, spacelike, and null gossip; a symplectic
                    form pairs positions and momenta without forcing a metric on phase space; tensor and exterior algebra
                    track multicomponent and antisymmetric data the way a good ex keeps track of receipts.</p>"""

S3_OLD = """                <p>this block is <strong>self-contained</strong> and covers manifolds–bundles–constraints (items C1–C6):
                    smooth models of configuration space, tangent and cotangent bundles carrying velocity and momentum,
                    partitions of unity for global constructions, exterior calculus and $\\mathrm{d}^2=0$, frobenius
                    integrability versus nonholonomic constraints, and $SO(3)$ as the concrete orientation manifold for
                    rigid motion.</p>
                <p>the recurring theme is that <em>coordinates are local choices</em>; physical laws are statements about
                    intrinsic objects (tangent vectors, covectors, differential forms, distributions) whose transformation
                    laws are fixed by smooth structure. constraints are then either integrable submanifolds in $Q$ or
                    genuinely nonholonomic restrictions detected by frobenius.</p>"""

S3_NEW = """                <p>configuration space is rarely $\\mathbb{R}^n$ and pretending otherwise is how people break
                    ankles on stairs. here $Q$ becomes a manifold, $TQ$ and $T^*Q$ carry velocity and momentum as intrinsic
                    objects, partitions of unity let you glue local honesty into global theorems, $\\mathrm{d}^2=0$ is the
                    algebraic spine, frobenius tells integrable constraints from cruel nonholonomic ones, and $SO(3)$
                    is the concrete theater where finite rotations stop commuting.</p>
                <p>coordinates are local gossip; laws are about tangent vectors, covectors, forms, and distributions whose
                    transformation rules smooth structure dictates. constraints either carve true submanifolds or fail
                    frobenius and haunt you with quasivelocities forever.</p>"""

S4_OLD = """                <p>this block is <strong>self-contained</strong> and covers cohomology and global topology (items D1–D5):
                    de rham cohomology as obstruction to global primitives, periods and fluxes (dirac monopole),
                    computing cohomology from patches (mayer–vietoris, čech–de rham), poincaré duality and euler-type
                    obstructions, and a short outlook on spectral sequences.</p>
                <p>the conceptual line is that <em>local</em> differential identities ($\\mathrm{d}\\omega=0$) do not decide
                    whether $\\omega=\\mathrm{d}\\alpha$ <em>globally</em>; cohomology classes record that gap. flux
                    integrals and holonomies are <strong>periods</strong> pairing closed forms with cycles, detecting
                    nontrivial classes.</p>"""

S4_NEW = """                <p>local exactness lies; global exactness swears in court. de rham classes are the gap between
                    $\\mathrm{d}\\omega=0$ and $\\omega=\\mathrm{d}\\alpha$ on all of $M$. dirac strings and flux
                    quanta are not party tricks; they are periods. mayer-vietoris and čech-de rham let you compute from
                    patches when intuition fails, poincaré duality and euler classes turn duality and obstructions into
                    calculable bruises, and spectral sequences appear as the polite warning that fibrations rarely tensor
                    their cohomology for free.</p>
                <p>flux integrals and holonomies are <strong>periods</strong>, pairings of closed forms with cycles. they
                    detect nontrivial classes the way an ex detects when you have not actually moved on.</p>"""

S5_OLD = """                <p>this block is <strong>self-contained</strong> and covers geometric mechanics (items E1–E5):
                    variational principles on $TQ$, symmetries and noether data, legendre passage to $(T^*Q,\\omega)$,
                    hamilton–jacobi and integrable tori, and fundamental-group bookkeeping for path sectors, using manifold, symplectic, and cohomological language developed earlier in the document.</p>
                <p>the organizing idea is that <em>lagrangian</em> data live naturally on velocity space $TQ$ while
                    <em>hamiltonian</em> data live on $T^*Q$ with canonical symplectic form; legendre transform is the
                    fiberwise dictionary when convexity permits. conserved quantities arise from group actions; global
                    topology of $Q$ splits the space of paths into sectors detected by $\\pi_1$.</p>"""

S5_NEW = """                <p>lagrangians live on $TQ$ like melodrama lives on a balcony; hamiltonians live on $T^*Q$
                    with the canonical symplectic form like someone finally bought decent lighting. noether charges come
                    from symmetries that survive the story, legendre is the fiberwise dictionary when convexity allows,
                    hamilton-jacobi and action-angle coordinates are the integrable fantasy episode, and $\\pi_1$ cuts path
                    space into sectors the way family holidays cut peace into episodes.</p>
                <p>the serious spine underneath the soap opera: variational principles on $TQ$, lifted group actions,
                    legendre to $(T^*Q,\\omega)$, integrable structure when you are lucky, and covering-space bookkeeping
                    when you are not.</p>"""

S6_OLD = """                <p>this block is <strong>self-contained</strong> and covers flat spacetime: SR and ED (items F1–F3):
                    minkowski kinematics and four-momentum, the potential one-form $A$ and field strength $F$ with gauge
                    and cohomological content, then maxwell’s equations, the stress tensor, and causal propagation of
                    fields. conventions match the rest of this page: <strong>mostly minus</strong>
                    $\\eta_{\\mu\\nu}=\\mathrm{diag}(-1,1,1,1)$ and $x^0=ct$.</p>
                <p>the conceptual spine is that <em>lorentz invariance</em> is the statement that physical laws are
                    built from tensors on $(\\mathbb{R}^4,\\eta)$; <em>gauge invariance</em> is the affine symmetry
                    $A\\mapsto A+\\mathrm{d}\\chi$ leaving $F=\\mathrm{d}A$ fixed; <em>maxwell</em> ties closed $F$ to
                    sources and forces conservation of charge and stress-energy in consistent units.</p>"""

S6_NEW = """                <p>flat spacetime is not boring; it is where you learn the etiquette before curvature crashes
                    the party. minkowski kinematics and four-momentum, the one-form potential $A$ and curvature $F$ with
                    gauge freedom and cohomological side-eye, then maxwell, stress-energy, and causal propagation. same
                    conventions as everywhere else here: <strong>mostly minus</strong>
                    $\\eta_{\\mu\\nu}=\\mathrm{diag}(-1,1,1,1)$ and $x^0=ct$.</p>
                <p>lorentz invariance means laws are tensor statements on $(\\mathbb{R}^4,\\eta)$. gauge symmetry shifts
                    $A$ by exact pieces while $F=\\mathrm{d}A$ stays honest. maxwell closes the loop: closed $F$ meets
                    sources, charge conservation and stress-energy conservation stop being wishes and become identities.</p>"""

S7_OLD = """                <p>this block is <strong>self-contained</strong>. the dynamical lorentzian geometry arc (items G1–G4)
                    treats the levi–civita connection and geodesics as inertial motion, curvature and tidal deviation,
                    cartan’s frame formulation and the einstein–hilbert variational principle, and the schwarzschild
                    vacuum as the spherical template for orbital phenomenology.</p>
                <p>the equivalence principle is encoded geometrically: gravitation is not modeled as a force field in
                    fixed minkowski space, but as lorentzian curvature; freely falling bodies follow timelike (or null)
                    geodesics of the spacetime metric.</p>"""

S7_NEW = """                <p>you flirted with minkowski, then learned gravity is not a vector field bolted onto it.
                    here are the levi-civita connection and geodesics as honest inertial motion, riemann curvature and
                    geodesic deviation as tidal gossip, cartan’s frames and einstein-hilbert as the variational mic drop,
                    and schwarzschild as the spherical workhorse that still pays rent in solar system tests and accretion
                    disk nightmares.</p>
                <p>equivalence principle in plain dress: freely falling bodies ride timelike or null geodesics of a
                    lorentzian metric. curvature is not decoration; it is how nearby geodesics accelerate relative to each
                    other while everyone locally thinks they are inertial.</p>"""

REPLACEMENTS = [
    (HEADER_OLD, HEADER_NEW),
    (FOOT_OLD, FOOT_NEW),
    (S1_OLD, S1_NEW),
    (S2_OLD, S2_NEW),
    (S3_OLD, S3_NEW),
    (S4_OLD, S4_NEW),
    (S5_OLD, S5_NEW),
    (S6_OLD, S6_NEW),
    (S7_OLD, S7_NEW),
]
for old, new in REPLACEMENTS:
    if old not in t:
        raise SystemExit(f"block not found (first 80 chars): {old[:80]!r}")
    t = t.replace(old, new, 1)

EM = [
    ("morphisms—or functors—not ad hoc", "morphisms or functors, not ad hoc"),
    ("$(q,\\dot q)$—often induced by an action on $Q$—such", "$(q,\\dot q)$, often induced by an action on $Q$, such"),
    ("vary—then bookkeeping", "vary; then bookkeeping"),
    ("components—coefficients change", "components. coefficients change"),
    ("$A$-inner product—this reappears", "$A$-inner product. this reappears"),
    ("linear basis—canonical $(q^i,p_i)$—in which", "linear basis with canonical $(q^i,p_i)$, in which"),
    ("spacetime—developed fully", "spacetime, developed fully"),
    (
        "over oriented $k$-cells\u201d\u2014wedges",
        "over oriented $k$-cells\u201d; wedges",
    ),
    ("$1$-manifold—the idea", "$1$-manifold. the idea"),
    ("motion—chart-independent", "motion, chart-independent"),
    ("localization—this is", "localization: this is"),
    ("of $q$ only—the distribution", "of $q$ only. the distribution"),
    ("$\\theta=\\pi$—hence double", "$\\theta=\\pi$, hence double"),
    (
        "depends on order\u201d\u2014the",
        "depends on order\u201d, the",
    ),
    ("loops—precisely the holonomy", "loops, precisely the holonomy"),
    ("nonzero—cohomology of", "nonzero; cohomology of"),
    ("on all cycles—a", "on all cycles; a"),
    ("glued—mayer–vietoris", "glued; mayer-vietoris"),
    ("cover—this is the", "cover. this is the"),
    ("fibers—the <em>thom", "fibers, the <em>thom"),
    ("$(E)$—whose pullback", "$(E)$, whose pullback"),
    ("$\\Phi\\in H^r_{\\mathrm{cv}}(E)$—whose pullback", "$\\Phi\\in H^r_{\\mathrm{cv}}(E)$, whose pullback"),
    ("cohomology—organizing contributions", "cohomology, organizing contributions"),
    ("only the map—global invariants", "only the map (global invariants"),
    ("from filtered local data—is fixed", "from filtered local data) is fixed"),
    ("cohomology—here pairing", "cohomology; here pairing"),
    ("two points—global actions", "two points. global actions"),
    ("$\\tilde Q$—quantum interference", "$\\tilde Q$, quantum interference"),
    (
        "\u201coptional notation\u201d\u2014it is",
        "\u201coptional notation\u201d: it is",
    ),
    (
        "holds on patches—this\n                    is",
        "holds on patches. this\n                    is",
    ),
    ("present—the lorentz", "present, the lorentz"),
    ("of $y$—matching", "of $y$, matching"),
    ("identically—a consistency", "identically. a consistency"),
    ("trajectories—tidal", "trajectories: tidal"),
    (
        "$r_{\\mathrm{ISCO}}=6GM/c^2=3r_s$—central",
        "$r_{\\mathrm{ISCO}}=6GM/c^2=3r_s$, central",
    ),
    ("$e$)—the classic", "$e$). the classic"),
    (
        "$4GM/(c^2 b)$—twice",
        "$4GM/(c^2 b)$, twice",
    ),
]
for a, b in EM:
    t = t.replace(a, b)

if "—" in t:
    i = t.index("—")
    raise SystemExit(f"remaining em dash near: {t[i-40:i+40]!r}")

t = t.replace("–", "-")

t = t.replace(
    "<title>classical physics · unified index · JETBUNDLE</title>",
    "<title>classical physics · JETBUNDLE</title>",
    1,
)

path.write_text(t)
print("ok:", path)
