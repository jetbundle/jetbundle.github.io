---
layout: textbook
title: "Chapter 6: Jet Bundles, Exterior Differential Systems & Intrinsic Geometric PDEs"
description: "The PDE is the Manifold"
permalink: /diffequations/chapter-06/
order: 6
chapter: 6
nav_order: 6.0
is_chapter_index: true
parent_chapter: null
---

# Chapter 6: Jet Bundles, Exterior Differential Systems & Intrinsic Geometric PDEs

The PDE *is* the Manifold.

## Introduction

Chapter 5 showed that noise dissolves background geometry, and we are still solving equations *on* a space. This chapter reformulates PDEs as submanifolds of jet space, viewing the equation itself as the fundamental geometric object. We erase the distinction between dependent and independent variables, study the geometry of solution spaces (moduli spaces), and develop geometric evolution equations like Ricci flow.

Now the goal is to reformulate PDEs as submanifolds of Jet Space and study the geometry of the solution space itself.

## Chapter Overview

This chapter addresses the intrinsic geometric formulation of PDEs. We will explore:

1. **Jet Bundles & Prolongation**: Erasing the distinction between dependent and independent variables, constructing jet bundles and contact structures, and defining PDEs as closed submanifolds.

2. **Formal Integrability & Spencer Cohomology**: Defining the symbol of a PDE as a geometric object, introducing Spencer cohomology to measure formal obstructions, and defining involution.

3. **Exterior Differential Systems & Cartan-Kähler**: Treating PDEs as differential ideals in exterior algebra, with Cartan-Kähler theorem guaranteeing analytic solutions for involutive systems.

4. **The Space of Riemannian Metrics**: Constructing the moduli space of all possible geometries, with Ebin slice theorem handling diffeomorphism gauge symmetry.

5. **Geometric Evolution Equations**: Defining dynamics on the space of metrics, with Ricci flow as gradient flow of Einstein-Hilbert action, and singularity formation as topological surgery.

6. **Gauge Theories & Instanton Moduli**: Studying geometry of fiber bundles, defining instantons (self-dual connections) and their moduli spaces, identifying them as supersymmetric vacua.

7. **Fully Nonlinear & Overdetermined Systems**: Returning to scalar equations with maximal geometric nonlinearity (Monge-Ampère), with continuity method and a priori estimates solving the convexity barrier.

## Chapter Sections

- [6.1 Jet Bundles & Prolongation]({{ '/diffequations/chapter-06/06-1-jet-bundles/' | relative_url }})
- [6.2 Formal Integrability & Spencer Cohomology]({{ '/diffequations/chapter-06/06-2-formal-integrability/' | relative_url }})
- [6.3 Exterior Differential Systems & Cartan-Kähler]({{ '/diffequations/chapter-06/06-3-exterior-systems/' | relative_url }})
- [6.4 The Space of Riemannian Metrics]({{ '/diffequations/chapter-06/06-4-metric-space/' | relative_url }})
- [6.5 Geometric Evolution Equations]({{ '/diffequations/chapter-06/06-5-geometric-evolution/' | relative_url }})
- [6.6 Gauge Theories & Instanton Moduli]({{ '/diffequations/chapter-06/06-6-gauge-theories/' | relative_url }})
- [6.7 Fully Nonlinear & Overdetermined Systems]({{ '/diffequations/chapter-06/06-7-nonlinear-systems/' | relative_url }})

## Navigation

{% include page_navigation.html %}

---

## Chapter Themes

This chapter geometrizes PDEs completely. We erase the artificial distinction between dependent and independent variables by working in jet space, where a PDE is a submanifold. The symbol of a PDE becomes a geometric object, and Spencer cohomology measures formal obstructions to solving the equation. Cartan-Kähler theorem converts analysis into the algebraic problem of constructing integral elements.

We zoom out to study the space of all possible geometries—the moduli space of metrics. Geometric evolution equations like Ricci flow define dynamics on this infinite-dimensional space. Singularity formation becomes topological surgery, and instantons emerge as supersymmetric vacua connecting to Chapter 5.

**We have geometrized everything, but the moduli spaces (solution spaces) are often singular or non-compact. We cannot do simple calculus on them**  We need a tool that is robust against these singularities. This motivates Chapter 7, where we resolve singularities using the algebraic tools of the cotangent bundle and category theory.

## Prerequisites

This chapter assumes familiarity with:
- Differential geometry (fiber bundles, connections)
- Algebraic geometry (schemes, moduli spaces)
- Chapter 3 material (manifolds, tensors)
- Chapter 4 material (symmetries, for gauge theories)
- Chapter 5 material (supersymmetry, for instantons)

## Notation

- $J^k$: $k$-th jet bundle
- $\theta^\alpha$: contact forms
- $g_k$: symbol module
- $H^{p,q}$: Spencer cohomology
- $\text{Met}(M)$: space of Riemannian metrics
- $F_A$: curvature of connection $A$

---

**Previous Chapter:** [Chapter 5: Stochastic, Rough, Fractional & Nonlocal Dynamics]({{ '/diffequations/chapter-05/' | relative_url }})
**Next Chapter:** [Chapter 7: Microlocal Analysis, D-Modules & Categorical Resolution]({{ '/diffequations/chapter-07/' | relative_url }})
