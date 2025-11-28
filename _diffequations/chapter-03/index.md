---
layout: textbook
title: "Chapter 3: Tensor Fields, Conservation Laws & Geometric Formulation"
description: "Physics is Invariant; Coordinates are Artifacts"
permalink: /diffequations/chapter-03/
order: 3
chapter: 3
nav_order: 3.0
is_chapter_index: true
parent_chapter: null
---

# Chapter 3: Tensor Fields, Conservation Laws & Geometric Formulation

## Introduction

Chapter 2 built a rigorous analytical framework, but it rested on the flat ground of $\mathbb{R}^n$. Physics, however, lives on curved manifolds where global vector addition is meaningless. This chapter detaches differential equations from coordinate systems and formulates them intrinsically on manifolds. We develop the geometric language of tensors, covariant derivatives, and differential forms, enabling us to write equations that are invariant under coordinate transformations.

**Theme:** Physics is Invariant; Coordinates are Artifacts.

**Narrative Goal:** To detach differential equations from coordinate systems and formulate them intrinsically on manifolds.

## Chapter Overview

This chapter addresses the geometric formulation of differential equations on manifolds. We will explore:

1. **Manifolds, Tensors & Covariant Derivatives**: Localizing linearity on manifolds, defining tensors as multilinear geometric objects, and introducing the covariant derivative for parallel transport.

2. **Systems of Conservation Laws & Hyperbolicity**: Expressing conservation laws as divergence of flux, defining hyperbolicity, and demonstrating shock formation from smooth initial data.

3. **Entropy Solutions & Shock Theory**: Introducing physical selection principles (Rankine-Hugoniot, Lax entropy condition) for unique weak solutions to shock problems.

4. **Exterior Calculus & Hodge Decomposition**: Enabling coordinate-free integration via differential forms, unifying gradient, curl, and divergence through the exterior derivative.

5. **Continuum Mechanics & Elasticity**: Applying the geometric framework to matter, defining stress tensors and formulating PDEs based on frame indifference and hyperelasticity.

6. **Geometric Optics, Rays & Caustics**: Examining the high-frequency limit of wave equations, with the eikonal equation governing wave fronts and caustics as singularities.

## Chapter Sections

- [3.1 Manifolds, Tensors & Covariant Derivatives]({{ '/diffequations/chapter-03/03-1-manifolds-tensors/' | relative_url }})
- [3.2 Systems of Conservation Laws & Hyperbolicity]({{ '/diffequations/chapter-03/03-2-conservation-laws/' | relative_url }})
- [3.3 Entropy Solutions & Shock Theory]({{ '/diffequations/chapter-03/03-3-entropy-solutions/' | relative_url }})
- [3.4 Exterior Calculus & Hodge Decomposition]({{ '/diffequations/chapter-03/03-4-exterior-calculus/' | relative_url }})
- [3.5 Continuum Mechanics & Elasticity]({{ '/diffequations/chapter-03/03-5-continuum-mechanics/' | relative_url }})
- [3.6 Geometric Optics, Rays & Caustics]({{ '/diffequations/chapter-03/03-6-geometric-optics/' | relative_url }})

## Navigation

{% include page_navigation.html %}

---

## Chapter Themes

This chapter reformulates differential equations in geometric language. We replace $\mathbb{R}^n$ with manifolds, define vectors in local tangent spaces, and introduce tensors as coordinate-independent geometric objects. The covariant derivative enables us to write PDEs using $\nabla$, rendering them invariant under coordinate transformations.

We demonstrate that even smooth initial data can evolve into singularities (shocks) in finite time for nonlinear hyperbolic systems, proving that the smoothness recovered in Chapter 2 is not generic. We develop entropy conditions to select physically meaningful solutions and show how exterior calculus unifies vector calculus operations in a coordinate-free manner.

**The Cliffhanger:** We can write invariant equations, but we generally cannot solve the nonlinear ones. Yet, certain specific nonlinear systems (like KdV) exhibit miraculous behavior—solitons that pass through one another unchanged. Why? This question motivates Chapter 4, where we reveal that solvability is symmetry.

## Prerequisites

This chapter assumes familiarity with:
- Differential geometry (manifolds, tangent spaces)
- Linear algebra (multilinear maps, tensor products)
- Chapter 2 material (Sobolev spaces, weak solutions)
- Basic topology (manifolds, charts)

## Notation

- $TM$: tangent bundle
- $T^*M$: cotangent bundle
- $\nabla$: covariant derivative
- $d$: exterior derivative
- $\delta$: codifferential
- $\Delta$: Hodge Laplacian
- $g_{ij}$: metric tensor components

---

**Previous Chapter:** [Chapter 2: Functional Analysis, Distributions & Weak Solutions]({{ '/diffequations/chapter-02/' | relative_url }})  
**Next Chapter:** [Chapter 4: Symmetry, Lie Theory & Classical Integrability]({{ '/diffequations/chapter-04/' | relative_url }})

