---
layout: textbook
title: "Chapter 5: Stochastic, Rough, Fractional & Nonlocal Dynamics"
description: "Regularity is an Exception; Roughness is the Rule"
permalink: /diffequations/chapter-05/
order: 5
chapter: 5
nav_order: 5.0
is_chapter_index: true
parent_chapter: null
---

# Chapter 5: Stochastic, Rough, Fractional & Nonlocal Dynamics

## Introduction

Chapter 4 revealed that integrability relies on precise algebraic cancellation, which is destroyed by noise and roughness in real-world systems. This chapter rebuilds calculus for trajectories that are nowhere differentiable and possess memory. We confront the non-differentiable nature of physical trajectories, developing stochastic calculus, rough path theory, fractional calculus, and the supersymmetric theory that unifies these approaches.

**Theme:** Regularity is an Exception; Roughness is the Rule.

**Narrative Goal:** To rebuild calculus for trajectories that are nowhere differentiable and possess memory.

## Chapter Overview

This chapter addresses analysis in noisy, rough, and nonlocal settings. We will explore:

1. **Stochastic Calculus Foundations**: Demonstrating failure of classical calculus for Brownian paths, introducing Itô integration and the modified chain rule with quadratic variation.

2. **SDEs & Diffusion Processes**: Connecting stochastic differential equations to parabolic PDEs via Feynman-Kac formula, and using Girsanov theorem for measure changes.

3. **Geometric Stochastic Analysis**: Lifting stochastic processes to manifolds, defining stochastic parallel transport and Malliavin calculus, with Hörmander's theorem linking Lie algebra structure to regularity.

4. **Rough Paths & Controlled Rough Paths**: Decoupling roughness from probability, introducing path signatures and Terry Lyons' rough path theory for deterministic non-smooth calculus.

5. **Fractional Calculus & Nonlocal Operators**: Abandoning locality with fractional Laplacians and Lévy flights, showing non-locality in $n$ dimensions as locality in $n+1$ dimensions.

6. **SPDEs & Regularity Structures**: Tackling multiplication of distributions (noise × solution) via Hairer's regularity structures, with renormalization as rigorous algebraic requirement.

7. **Kinetic Theory & Mean-Field Games**: Connecting microscopic to macroscopic via Boltzmann equation and mean-field games, with Wasserstein gradient flows viewing diffusion as geometry on probability measures.

8. **Fractal Geometry & Dirichlet Forms**: Doing analysis on spaces without tangent vectors, defining Laplacians on fractals via Dirichlet forms.

9. **Supersymmetric Theory of Stochastics**: Revealing that all SDEs possess hidden topological supersymmetry, with dynamical long-range order as symmetry breaking and Witten index as robust topological invariant.

## Chapter Sections

- [5.1 Stochastic Calculus Foundations]({{ '/diffequations/chapter-05/05-1-stochastic-calculus/' | relative_url }})
- [5.2 SDEs & Diffusion Processes]({{ '/diffequations/chapter-05/05-2-sdes/' | relative_url }})
- [5.3 Geometric Stochastic Analysis]({{ '/diffequations/chapter-05/05-3-geometric-stochastic/' | relative_url }})
- [5.4 Rough Paths & Controlled Rough Paths]({{ '/diffequations/chapter-05/05-4-rough-paths/' | relative_url }})
- [5.5 Fractional Calculus & Nonlocal Operators]({{ '/diffequations/chapter-05/05-5-fractional-calculus/' | relative_url }})
- [5.6 SPDEs & Regularity Structures]({{ '/diffequations/chapter-05/05-6-spdes/' | relative_url }})
- [5.7 Kinetic Theory & Mean-Field Games]({{ '/diffequations/chapter-05/05-7-kinetic-theory/' | relative_url }})
- [5.8 Fractal Geometry & Dirichlet Forms]({{ '/diffequations/chapter-05/05-8-fractal-geometry/' | relative_url }})
- [5.9 Supersymmetric Theory of Stochastics]({{ '/diffequations/chapter-05/05-9-susy-stochastics/' | relative_url }})

## Navigation

{% include page_navigation.html %}

---

## Chapter Themes

This chapter confronts the reality that most physical trajectories are not smooth. Brownian motion is nowhere differentiable, requiring a modified chain rule (Itô's formula) with quadratic variation terms. We develop stochastic calculus on manifolds, showing how Lie algebra structure (from Chapter 4) determines analytic regularity via Hörmander's theorem.

Rough path theory provides a deterministic framework for non-smooth calculus, decoupling roughness from probability. Fractional calculus abandons locality, modeling systems with long-range correlations and memory. Regularity structures generalize Taylor expansions to "noisy" bases, requiring algebraic renormalization to define products of distributions.

The chapter culminates in the supersymmetric theory of stochastics, revealing that all SDEs possess hidden topological supersymmetry. Chaos and turbulence emerge as spontaneous symmetry breaking, with the Witten index providing a robust topological invariant.

**The Cliffhanger:** Noise dissolves the background geometry. We are still solving equations *on* a space. We need a framework where the PDE defines the geometry *intrinsically*. This motivates Chapter 6, where we view the equation itself as the fundamental geometric object.

## Prerequisites

This chapter assumes familiarity with:
- Probability theory (measure theory, random variables)
- Chapter 2 material (distributions, Sobolev spaces)
- Chapter 3 material (manifolds, geometric formulation)
- Chapter 4 material (Lie algebras, for Hörmander's theorem)

## Notation

- $B_t$: Brownian motion
- $dX_t$: stochastic differential
- $[X]_t$: quadratic variation
- $(-\Delta)^s$: fractional Laplacian
- $W_2$: Wasserstein distance
- $Q$, $Q^\dagger$: supersymmetry generators

---

**Previous Chapter:** [Chapter 4: Symmetry, Lie Theory & Classical Integrability]({{ '/diffequations/chapter-04/' | relative_url }})  
**Next Chapter:** [Chapter 6: Jet Bundles, Exterior Differential Systems & Intrinsic Geometric PDEs]({{ '/diffequations/chapter-06/' | relative_url }})

