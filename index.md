---
layout: page
title: jetbundle
description: Engineering principles of physics, finance, and computation
class: landing-page
---

# jetbundle

**Mapping the hidden geometry of modern science.**

## The Mission

This project is an audit. It maps the hidden geometry of modern science.

The premise of `jetbundle` is that mathematics, physics, computer science, and finance are not independent disciplines. They are components of a single, unified structure—a **fiber bundle**—whose geometry is dictated by patronage.

We trace the "memo-to-lemma" pipeline: from classified military requirements to academic abstraction to modern engineering practice.

[Learn more about the thesis →](/about/)

---

## The Three Pillars

### [Computation →](/computation_stack/01_intro/)

**Command, Control, Communications & Intelligence**

- Operating Systems: From Project MAC to Azure IL5
- Artificial Intelligence: From ALVINN to Palantir
- Graph Theory: From Turán to SKYNET to Palantir Gotham

The Computation Stack traces the lineage from military command and control requirements to modern surveillance and artificial intelligence systems.

[Explore the Computation Stack →](/computation_stack/01_intro/)

---

### [Physics →](/physics_stack/01_intro/)

**Naval Warfare & Missile Guidance**

- Complex Analysis: From *Nautilus* hulls to aircraft wings
- PDEs: From H-bomb shock-waves to hypersonic vehicles
- Scientific Computing: From Los Alamos to stockpile simulations

The Physics Stack traces defense-driven innovation in naval warfare, missile guidance, and scientific computing.

[Explore the Physics Stack →](/physics_stack/01_intro/)

---

### [Finance →](/finance_stack/01_intro/)

**The Great Handover: Wall Street Outbids the Pentagon**

- Kalman Filter: From missile guidance to time-series analysis
- Pontryagin's Principle: From ballistic trajectories to options pricing
- High-Frequency Trading: From radar signal processing to microwave networks

The Finance Stack traces the migration of defense technologies to quantitative finance and high-frequency trading.

[Explore the Finance Stack →](/finance_stack/01_intro/)

---

## Recent Activity

{% if site.posts.size > 0 %}
{% for post in site.posts limit:5 %}
- [{{ post.title }}]({{ post.url }}) - {{ post.date | date: "%B %d, %Y" }}
{% endfor %}
{% else %}
Blog posts coming soon. Check back for new audits and builds.
{% endif %}

[View all posts →](/blog/)

---

## The Project

This site serves as the primer, the audit trail, and the central hub for the `jetbundle` project.

- **The Archive** ([Resources →](/resources/)) contains declassified memos, booklists, and primary sources.
- **The Audits** ([The Stacks →](/)) apply this forensic methodology to new fields.
- **The Simulations** provide open-source code to explore the "lemmas" (Kalman filters, Turán graphs, Byzantine consensus).

The goal is to remove the redactions. The audit trail is the curriculum.

[Get involved →](/community/)
