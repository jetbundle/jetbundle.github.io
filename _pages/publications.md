---
layout: page
permalink: /publications/
title: Publications
nav: true
nav_order: 8
description: Publications and foundational works
---

## Applications

{% for pub in site.data.publications %}
  {% if pub.selected %}
- **{{ pub.title }}**

  {{ pub.authors }} — *{{ pub.venue }}*, {{ pub.year }}

  {% if pub.pdf %}
  {% include pdf_embed.html pdf=pub.pdf title=pub.title %}
  {% endif %}

  {% endif %}
{% endfor %}

## Foundational Works

{% for pub in site.data.publications %}
  {% if pub.tags contains 'origin' %}
- **{{ pub.title }}**

  {{ pub.authors }} — *{{ pub.venue }}*, {{ pub.year }}

  {% if pub.pdf %}
  {% include pdf_embed.html pdf=pub.pdf title=pub.title %}
  {% endif %}

  {% endif %}
{% endfor %}
