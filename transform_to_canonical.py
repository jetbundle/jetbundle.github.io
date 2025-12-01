#!/usr/bin/env python3
"""
Efficiently transform all HTML files to canonical template structure.
Uses regex and string manipulation for speed and reliability.
"""

import re
from pathlib import Path
from typing import Tuple, Optional

# New KaTeX head (simplified)
NEW_KATEX_HEAD = """  <!-- KaTeX (identical on every page) -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"
    onload="renderMathInElement(document.body, {delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}], throwOnError: false});">
  </script>"""

def extract_title(html: str) -> str:
    """Extract title from HTML."""
    match = re.search(r'<title>(.*?)</title>', html, re.DOTALL)
    return match.group(1).strip() if match else "Untitled Section"

def extract_description(html: str) -> str:
    """Extract description from meta tag."""
    match = re.search(r'<meta name="description" content="(.*?)"', html)
    return match.group(1).strip() if match else "Mathematical exploration of differential equations"

def extract_h1_title(html: str) -> str:
    """Extract h1 title from header."""
    # Try to find h1 in hook first
    hook_match = re.search(r'<header[^>]*class="hook"[^>]*>.*?<h1>(.*?)</h1>', html, re.DOTALL)
    if hook_match:
        return hook_match.group(1).strip()
    
    # Try regular header
    match = re.search(r'<h1>(.*?)</h1>', html)
    return match.group(1).strip() if match else extract_title(html)

def generate_hook_text(title: str) -> Tuple[str, Optional[str]]:
    """Generate hook text based on title."""
    # Default compelling hook
    hook = "The explicit solution is the dream of classical physics — but it collapses the moment the system refuses to be linear."
    subtitle = "What survives when every coordinate change fails?"
    return hook, subtitle

def extract_article_content(html: str) -> str:
    """Extract content from article tag, preserving structure."""
    # Find article tag
    article_match = re.search(r'<article>(.*?)</article>', html, re.DOTALL)
    if not article_match:
        return ""
    
    content = article_match.group(1)
    
    # Remove existing hook header if present
    content = re.sub(r'<header[^>]*class="hook"[^>]*>.*?</header>', '', content, flags=re.DOTALL)
    
    # Remove description paragraph if at start
    content = re.sub(r'<p class="description">.*?</p>', '', content, count=1, flags=re.DOTALL)
    
    # Remove existing navigation if present
    content = re.sub(r'<nav class="navigation">.*?</nav>', '', content, flags=re.DOTALL)
    
    # Remove existing references if present
    content = re.sub(r'<section class="references">.*?</section>', '', content, flags=re.DOTALL)
    
    # Remove existing challenges if present
    content = re.sub(r'<section class="challenges">.*?</section>', '', content, flags=re.DOTALL)
    
    # Remove existing final cliffhanger if present
    content = re.sub(r'<div class="cliffhanger final">.*?</div>', '', content, flags=re.DOTALL)
    
    # Clean up multiple blank lines
    content = re.sub(r'\n\s*\n\s*\n+', '\n\n', content)
    
    return content.strip()

def extract_scripts(html: str) -> list:
    """Extract all important scripts, avoiding duplicates and old KaTeX."""
    scripts = []
    seen = set()
    
    # Split HTML to get body section only
    body_match = re.search(r'</main>(.*?)</body>', html, re.DOTALL)
    if not body_match:
        return scripts
    
    body_html = body_match.group(1)
    
    # Navigation script (only once, from body)
    nav_match = re.search(r'<script[^>]*src="[^"]*navigation\.js[^"]*"[^>]*></script>', body_html)
    if nav_match and 'navigation.js' not in seen:
        scripts.append(nav_match.group(0))
        seen.add('navigation.js')
    
    # Widget engine scripts (from body, not head)
    for script_type in ['textbook-engine', 'widget-engine']:
        match = re.search(r'<script[^>]*src="[^"]*' + script_type + r'[^"]*"[^>]*></script>', body_html)
        if match and script_type not in seen:
            scripts.append(match.group(0))
            seen.add(script_type)
    
    # Plotly loading script (inline, exclude KaTeX)
    plotly_match = re.search(r'<script>.*?plotly.*?</script>', body_html, re.DOTALL | re.IGNORECASE)
    if plotly_match and 'plotly' not in seen and 'katex' not in plotly_match.group(0).lower():
        scripts.append(plotly_match.group(0))
        seen.add('plotly')
    
    return scripts

def transform_html_file(html_path: Path) -> None:
    """Transform a single HTML file to canonical template."""
    print(f"Transforming: {html_path.name}")
    
    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Extract components
    title = extract_title(html)
    h1_title = extract_h1_title(html)
    description = extract_description(html)
    hook_text, hook_subtitle = generate_hook_text(title)
    article_content = extract_article_content(html)
    scripts = extract_scripts(html)
    
    # Build new HTML
    new_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content="{description}">
{NEW_KATEX_HEAD}
  <link rel="stylesheet" href="/diffequations/styles.css">
  <script src="/diffequations/navigation-data.js"></script>
  <script src="/diffequations/manifold-background.js" defer></script>
</head>
<body>
<main>
  <!-- 1. GLOBAL HOOK – mandatory, 1–2 sentences, appears at the very top -->
  <header class="hook">
    <h1>{h1_title}</h1>
    <p class="hook-text">
      {hook_text}
    </p>
    <p class="hook-subtitle">
      {hook_subtitle}
    </p>
  </header>
  
  <!-- 2. Description line (for navigation & SEO) -->
  <p class="description">{description}</p>
  
  <article>
    {article_content}
    
    <!-- 5. Mastery Challenges (always present, accordion) -->
    <section class="challenges">
      <h2>Mastery Challenges</h2>
      <details>
        <summary>Challenge 1 [★★☆] Apply the Method</summary>
        <p>Apply the techniques from this section to solve a specific problem.</p>
        <details><summary>Solution</summary><p>Solution will be added.</p></details>
      </details>
      <details>
        <summary>Challenge 2 [★★★] Extend the Theory</summary>
        <p>Extend the methods to a more general case.</p>
        <details><summary>Solution</summary><p>Solution will be added.</p></details>
      </details>
    </section>
    
    <!-- 6. The Cliffhanger – the single most important paragraph of the entire section -->
    <div class="cliffhanger final">
      <p>
        We have exhausted every classical trick. The explicit solution is dead. To go further we must abandon the very notion of "formula" and invent new mathematical objects — special functions, infinite-dimensional spaces, and eventually the geometry of the equation itself.
      </p>
    </div>
    
    <!-- 7. Key References (immediately after the cliffhanger) -->
    <section class="references">
      <h2>Key References</h2>
      <ul>
        <li>Arnold, V. I. (1983). <em>Ordinary Differential Equations</em>.</li>
        <li>Hartman, P. (1964). <em>Ordinary Differential Equations</em>.</li>
      </ul>
    </section>
    
    <!-- 8. Navigation -->
    <nav class="navigation">
      <hr>
      <ul>
        <li><a href="/diffequations/">Full Table of Contents</a></li>
      </ul>
    </nav>
  </article>
</main>
"""
    
    # Add scripts (only navigation.js and widget engines, others are in head)
    # Exclude any old KaTeX scripts
    for script in scripts:
        if 'katex' in script.lower() and 'defer' not in script.lower():
            continue  # Skip old inline KaTeX scripts
        if 'navigation.js' in script or 'textbook-engine' in script or 'widget-engine' in script or 'plotly' in script.lower():
            new_html += f"  {script}\n"
    
    new_html += """</body>
</html>"""
    
    # Write back
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(new_html)
    
    print(f"  ✓ Done")

def main():
    """Transform all HTML files."""
    base_dir = Path('diffequations')
    
    html_files = list(base_dir.rglob('index.html'))
    print(f"Found {len(html_files)} HTML files to transform\n")
    
    for html_file in sorted(html_files):
        try:
            transform_html_file(html_file)
        except Exception as e:
            print(f"  ✗ Error: {e}")
            import traceback
            traceback.print_exc()
    
    print(f"\n✓ Transformation complete! {len(html_files)} files processed.")

if __name__ == '__main__':
    main()
