---
layout: page
title: JetBundle
permalink: /
nav: false
---

## JetBundle

**Physics • Mathematics • Computation • Finance**

*Origins, Applications, Engineering Principles*

> A technical resource tracing defense-driven innovation to modern engineering practice.

---

### Core Disciplines

{% for topic in site.data.topics %}

- **[{{ topic.name }}](/topics/{{ topic.slug }}/)**

  {{ topic.summary }}

{% endfor %}

---

### Featured Report

**The Military-Academic Complex**

*Archival verification of U.S. defense patronage*

{% include pdf_embed.html pdf="/assets/pdf/military-academic-complex.pdf" title="Military-Academic Complex Report" %}

[Read Report →](/military-complex/){:.btn .btn--primary}

---

### About

This is a **subject-focused resource**. Personal details are in [About](/about/) and [CV](/cv/).

[All Publications →](/publications/)
