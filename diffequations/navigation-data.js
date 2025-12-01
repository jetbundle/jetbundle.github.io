// Navigation data for all chapters and sections
const DIFFEQUATIONS_NAV = {
  chapters: [
    {
      num: 1,
      title: "Classical Explicit & Quasi-Explicit Arsenal",
      subtitle: "The Rise and Fall of the Specific Solution",
      path: "/diffequations/chapter-01/",
      sections: [
        { num: "1.1", title: "Exact Methods for Ordinary Differential Equations", path: "/diffequations/chapter-01/01-1-exact-methods/" },
        { num: "1.2", title: "Special Functions of Mathematical Physics", path: "/diffequations/chapter-01/01-2-special-functions/" },
        { num: "1.3", title: "Integral Transforms", path: "/diffequations/chapter-01/01-3-integral-transforms/" },
        { num: "1.4", title: "Classical Linear Partial Differential Equations", path: "/diffequations/chapter-01/01-4-linear-pde/" },
        { num: "1.5", title: "Asymptotic Analysis", path: "/diffequations/chapter-01/01-5-asymptotic-analysis/" },
        { num: "1.6", title: "Classical Perturbation Theory", path: "/diffequations/chapter-01/01-6-perturbation-theory/" },
        { num: "1.7", title: "Classical Renormalization & Non-Perturbative Methods", path: "/diffequations/chapter-01/01-7-renormalization/" }
      ]
    },
    {
      num: 2,
      title: "Functional Analysis, Distributions & Weak Solutions",
      subtitle: "The Geometry of Infinite Dimensions",
      path: "/diffequations/chapter-02/",
      sections: [
        { num: "2.1", title: "Distributions & Test Functions", path: "/diffequations/chapter-02/02-1-distributions/" },
        { num: "2.2", title: "Sobolev Spaces & Weak Derivatives", path: "/diffequations/chapter-02/02-2-sobolev-spaces/" },
        { num: "2.3", title: "Hilbert Space Theory & Spectral Theorem", path: "/diffequations/chapter-02/02-3-hilbert-spaces/" },
        { num: "2.4", title: "Unbounded Operators, Resolvents & Semigroups", path: "/diffequations/chapter-02/02-4-unbounded-operators/" },
        { num: "2.5", title: "Variational Methods & Lax-Milgram", path: "/diffequations/chapter-02/02-5-variational-methods/" },
        { num: "2.6", title: "Galerkin Methods & Finite Elements", path: "/diffequations/chapter-02/02-6-galerkin-methods/" },
        { num: "2.7", title: "Fredholm Theory & Index", path: "/diffequations/chapter-02/02-7-fredholm-theory/" }
      ]
    },
    {
      num: 3,
      title: "Tensor Fields, Conservation Laws & Geometric Formulation",
      subtitle: "Physics is Invariant; Coordinates are Artifacts",
      path: "/diffequations/chapter-03/",
      sections: [
        { num: "3.1", title: "Manifolds, Tensors & Covariant Derivatives", path: "/diffequations/chapter-03/03-1-manifolds-tensors/" },
        { num: "3.2", title: "Systems of Conservation Laws & Hyperbolicity", path: "/diffequations/chapter-03/03-2-conservation-laws/" },
        { num: "3.3", title: "Entropy Solutions & Shock Theory", path: "/diffequations/chapter-03/03-3-entropy-solutions/" },
        { num: "3.4", title: "Exterior Calculus & Hodge Decomposition", path: "/diffequations/chapter-03/03-4-exterior-calculus/" },
        { num: "3.5", title: "Continuum Mechanics & Elasticity", path: "/diffequations/chapter-03/03-5-continuum-mechanics/" },
        { num: "3.6", title: "Geometric Optics, Rays & Caustics", path: "/diffequations/chapter-03/03-6-geometric-optics/" }
      ]
    },
    {
      num: 4,
      title: "Symmetry, Lie Theory & Classical Integrability",
      subtitle: "Solvability is Symmetry",
      path: "/diffequations/chapter-04/",
      sections: [
        { num: "4.1", title: "Lie Symmetries & Prolongation", path: "/diffequations/chapter-04/04-1-lie-symmetries/" },
        { num: "4.2", title: "Noether's Theorem & Invariant Reduction", path: "/diffequations/chapter-04/04-2-noether-theorem/" },
        { num: "4.3", title: "Completely Integrable Systems", path: "/diffequations/chapter-04/04-3-integrable-systems/" },
        { num: "4.4", title: "Lax Pairs & Zero-Curvature Representations", path: "/diffequations/chapter-04/04-4-lax-pairs/" },
        { num: "4.5", title: "Riemann-Hilbert & Inverse Scattering", path: "/diffequations/chapter-04/04-5-riemann-hilbert/" },
        { num: "4.6", title: "Recursion Operators & Hirota Bilinearization", path: "/diffequations/chapter-04/04-6-recursion-operators/" },
        { num: "4.7", title: "Supersymmetric Quantum Mechanics", path: "/diffequations/chapter-04/04-7-susy-qm/" },
        { num: "4.8", title: "Nonlocal Symmetries & Potential Systems", path: "/diffequations/chapter-04/04-8-nonlocal-symmetries/" }
      ]
    },
    {
      num: 5,
      title: "Stochastic, Rough, Fractional & Nonlocal Dynamics",
      subtitle: "Regularity is an Exception; Roughness is a Rule",
      path: "/diffequations/chapter-05/",
      sections: [
        { num: "5.1", title: "Stochastic Calculus Foundations", path: "/diffequations/chapter-05/05-1-stochastic-calculus/" },
        { num: "5.2", title: "SDEs & Diffusion Processes", path: "/diffequations/chapter-05/05-2-sdes/" },
        { num: "5.3", title: "Geometric Stochastic Analysis", path: "/diffequations/chapter-05/05-3-geometric-stochastic/" },
        { num: "5.4", title: "Rough Paths & Controlled Rough Paths", path: "/diffequations/chapter-05/05-4-rough-paths/" },
        { num: "5.5", title: "Fractional Calculus & Nonlocal Operators", path: "/diffequations/chapter-05/05-5-fractional-calculus/" },
        { num: "5.6", title: "SPDEs & Regularity Structures", path: "/diffequations/chapter-05/05-6-spdes/" },
        { num: "5.7", title: "Kinetic Theory & Mean-Field Games", path: "/diffequations/chapter-05/05-7-kinetic-theory/" },
        { num: "5.8", title: "Fractal Geometry & Dirichlet Forms", path: "/diffequations/chapter-05/05-8-fractal-geometry/" },
        { num: "5.9", title: "Supersymmetric Theory of Stochastics", path: "/diffequations/chapter-05/05-9-susy-stochastics/" }
      ]
    },
    {
      num: 6,
      title: "Jet Bundles, Exterior Differential Systems & Intrinsic Geometric PDEs",
      subtitle: "The PDE *is* the Manifold",
      path: "/diffequations/chapter-06/",
      sections: [
        { num: "6.1", title: "Jet Bundles & Prolongation", path: "/diffequations/chapter-06/06-1-jet-bundles/" },
        { num: "6.2", title: "Formal Integrability & Spencer Cohomology", path: "/diffequations/chapter-06/06-2-formal-integrability/" },
        { num: "6.3", title: "Exterior Differential Systems & Cartan-Kähler", path: "/diffequations/chapter-06/06-3-exterior-systems/" },
        { num: "6.4", title: "The Space of Riemannian Metrics", path: "/diffequations/chapter-06/06-4-metric-space/" },
        { num: "6.5", title: "Geometric Evolution Equations", path: "/diffequations/chapter-06/06-5-geometric-evolution/" },
        { num: "6.6", title: "Gauge Theories & Instanton Moduli", path: "/diffequations/chapter-06/06-6-gauge-theories/" },
        { num: "6.7", title: "Fully Nonlinear & Overdetermined Systems", path: "/diffequations/chapter-06/06-7-nonlinear-systems/" }
      ]
    },
    {
      num: 7,
      title: "Microlocal Analysis, D-Modules & Categorical Resolution",
      subtitle: "The Phase Space is the Reality",
      path: "/diffequations/chapter-07/",
      sections: [
        { num: "7.1", title: "D-Modules & Holonomic Systems", path: "/diffequations/chapter-07/07-1-d-modules/" },
        { num: "7.2", title: "Microlocal Analysis & Wave Front Sets", path: "/diffequations/chapter-07/07-2-microlocal-analysis/" },
        { num: "7.3", title: "Riemann-Hilbert Correspondence", path: "/diffequations/chapter-07/07-3-riemann-hilbert/" },
        { num: "7.4", title: "Fourier Integral Operators", path: "/diffequations/chapter-07/07-4-fourier-integral/" },
        { num: "7.5", title: "Resurgence, Borel Summation & Alien Calculus", path: "/diffequations/chapter-07/07-5-resurgence/" },
        { num: "7.6", title: "Index Theorems & K-Theory", path: "/diffequations/chapter-07/07-6-index-theorems/" },
        { num: "7.7", title: "Noncommutative Geometry", path: "/diffequations/chapter-07/07-7-noncommutative/" },
        { num: "7.8", title: "Higher Categories, Derived Stacks & TQFT", path: "/diffequations/chapter-07/07-8-higher-categories/" }
      ]
    }
  ],
  epilogue: {
    title: "Epilogue: The Eternal Structure",
    path: "/diffequations/epilogue/"
  }
};

