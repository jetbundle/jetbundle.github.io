---
layout: page
title: Computation Stack Toolkit
description: How to master the Computation Stack - Resources and learning path
permalink: /computation_stack/toolkit/
---

# Computation Stack Toolkit

**How to master the Computation Stack: Resources for achieving engineering excellence.**

This toolkit provides a curated list of FOSS resources for mastering the Computation Stack. It answers: "How do I master this? What do I build?"

---

## Core Concepts

To master the Computation Stack, you must understand:

1. **Formal Verification**: Proving correctness of systems
2. **Asynchronous Systems**: Distributed systems without global clocks
3. **Graph Theory**: Networks, algorithms, and optimization
4. **Operating Systems**: Process management, memory, concurrency
5. **Artificial Intelligence**: Machine learning, neural networks, decision-making

---

## Canonical Booklist

### Foundations

- **Sipser, *Introduction to the Theory of Computation*** (3rd ed.)
  - Computability, complexity, automata theory
  - Essential for understanding what computation *is*

- **Lamport, *Time, Clocks, and the Ordering of Events in a Distributed System***
  - The foundational paper on distributed systems
  - Required reading for asynchronous systems

- **Tanenbaum & Bos, *Modern Operating Systems*** (5th ed.)
  - Process management, memory, file systems
  - The OS textbook

### Distributed Systems

- **Lamport, *Distributed Systems: Concepts and Design***
  - Byzantine Generals Problem
  - Consensus algorithms
  - Fault tolerance

- **Coulouris et al., *Distributed Systems: Concepts and Design*** (5th ed.)
  - Comprehensive coverage of distributed systems
  - Network protocols, security, middleware

### Graph Theory

- **Diestel, *Graph Theory*** (5th ed.)
  - Comprehensive mathematical treatment
  - Algorithms and applications

- **Newman, *Networks: An Introduction***
  - Network science perspective
  - Social networks, biological networks

### Artificial Intelligence

- **Russell & Norvig, *Artificial Intelligence: A Modern Approach*** (4th ed.)
  - Comprehensive AI textbook
  - Search, planning, machine learning

- **Goodfellow et al., *Deep Learning***
  - Neural networks and deep learning
  - Modern AI techniques

---

## Public Repos & Simulations

### jetbundle/simulations

- **Byzantine Generals Problem**: [Implementation](https://github.com/jetbundle/simulations/tree/main/byzantine_generals)
  - Python simulation of Lamport's 1978 problem
  - Demonstrates consensus in distributed systems

- **Turan Graphs**: [Visualization](https://github.com/jetbundle/simulations/tree/main/turan_graphs)
  - NetworkX implementation of the "brick factory" problem
  - Graph theory applications

- **Operating Systems Concepts**: [Examples](https://github.com/jetbundle/simulations/tree/main/os_concepts)
  - Process scheduling simulations
  - Memory management examples

### Recommended Open-Source Projects

- **Linux Kernel**: [github.com/torvalds/linux](https://github.com/torvalds/linux)
  - Study operating systems at the source

- **Redis**: [github.com/redis/redis](https://github.com/redis/redis)
  - Distributed systems in practice

- **TensorFlow**: [github.com/tensorflow/tensorflow](https://github.com/tensorflow/tensorflow)
  - Machine learning framework

---

## Learning Path

### Beginner (Months 1-3)

1. **Read Sipser**: Understand computability and complexity
2. **Study Lamport's Papers**: Time, clocks, Byzantine Generals
3. **Build Simple OS**: Follow OS development tutorials
4. **Implement Basic Graph Algorithms**: BFS, DFS, shortest paths

### Intermediate (Months 4-6)

1. **Distributed Systems**: Study consensus algorithms (Raft, PBFT)
2. **Graph Theory**: Advanced algorithms, network analysis
3. **Machine Learning**: Implement neural networks from scratch
4. **Contribute to Open Source**: Find a project and contribute

### Advanced (Months 7-12)

1. **Formal Verification**: Learn TLA+, Coq, or similar
2. **Research**: Read recent papers in distributed systems, AI
3. **Build Complex Systems**: Design and implement your own
4. **Teach**: Write tutorials, give talks, mentor others

---

## Tools & Libraries

### Python

- **NetworkX**: Graph analysis and visualization
- **NumPy/SciPy**: Numerical computing
- **TensorFlow/PyTorch**: Machine learning
- **asyncio**: Asynchronous programming

### Systems Programming

- **Rust**: Memory-safe systems programming
- **Go**: Concurrent systems programming
- **C/C++**: Low-level systems programming

### Verification

- **TLA+**: Temporal Logic of Actions (Lamport)
- **Coq**: Proof assistant
- **Alloy**: Software modeling

---

## Projects to Build

1. **Distributed Key-Value Store**: Implement Raft consensus
2. **Graph Visualization Tool**: Interactive network explorer
3. **Neural Network Framework**: From scratch implementation
4. **Operating System**: Minimal kernel with process management
5. **Byzantine Fault Tolerant System**: Practical consensus implementation

---

## Next Steps

1. **Choose a Focus**: Pick one area (OS, distributed systems, AI, graph theory)
2. **Read the Canonical Books**: Start with the foundational texts
3. **Build Something**: Start with a simple project
4. **Join the Community**: [GitHub Discussions](https://github.com/jetbundle/jetbundle.github.io/discussions)
5. **Contribute**: Share your implementations and learnings

---

[Back to Computation Stack →](/computation_stack/)
