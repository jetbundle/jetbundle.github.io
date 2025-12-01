#!/usr/bin/env python3
"""
Fix canonical structure - clean up messy transformations and properly organize content.
This script:
1. Removes duplicate empty comment blocks
2. Merges existing challenges/references into canonical structure
3. Removes old navigation/heading structures
4. Preserves actual content properly
5. Handles chapter index pages differently
"""

import re
from pathlib import Path
from typing import Tuple, Optional

def is_chapter_index(html_path: Path) -> bool:
    """Check if this is a chapter index page."""
    return html_path.name == 'index.html' and 'chapter-' in str(html_path.parent)

def extract_existing_challenges(html: str) -> str:
    """Extract existing challenge problems section."""
    # Look for "Challenge Problems" or "Mastery Challenges" sections
    challenge_patterns = [
        r'<h2>Challenge Problems</h2>.*?(?=<h2>|<section|</article>)',
        r'<h2>Mastery Challenges</h2>.*?(?=<h2>|<section|</article>)',
        r'<section class="challenges">.*?</section>',
    ]
    
    for pattern in challenge_patterns:
        match = re.search(pattern, html, re.DOTALL | re.IGNORECASE)
        if match:
            content = match.group(0)
            # Remove the heading if it's a duplicate
            content = re.sub(r'<h2>.*?Challenges?.*?</h2>', '', content, count=1, flags=re.IGNORECASE)
            return content.strip()
    
    return ""

def extract_existing_references(html: str) -> str:
    """Extract existing references section."""
    # Look for "References" or "Key References" sections
    ref_patterns = [
        r'<h2>Key References</h2>.*?(?=<h2>|<section|</article>|<nav)',
        r'<h2>References</h2>.*?(?=<h2>|<section|</article>|<nav)',
        r'<section class="references">.*?</section>',
    ]
    
    for pattern in ref_patterns:
        match = re.search(pattern, html, re.DOTALL | re.IGNORECASE)
        if match:
            content = match.group(0)
            # Remove the heading if it's a duplicate
            content = re.sub(r'<h2>.*?References?.*?</h2>', '', content, count=1, flags=re.IGNORECASE)
            return content.strip()
    
    return ""

def extract_existing_navigation(html: str) -> str:
    """Extract existing navigation links."""
    nav_patterns = [
        r'<h2>Navigation</h2>.*?(?=<h2>|<section|</article>)',
        r'<h2>Related Sections</h2>.*?(?=<h2>|<section|</article>)',
        r'<nav class="navigation">.*?</nav>',
    ]
    
    for pattern in nav_patterns:
        match = re.search(pattern, html, re.DOTALL | re.IGNORECASE)
        if match:
            content = match.group(0)
            # Extract just the links
            links = re.findall(r'<a href="[^"]*">.*?</a>', content)
            if links:
                nav_html = '<nav class="navigation">\n      <hr>\n      <ul>\n'
                for link in links:
                    nav_html += f'        <li>{link}</li>\n'
                nav_html += '      </ul>\n    </nav>'
                return nav_html
    
    return ""

def clean_article_content(html: str) -> str:
    """Clean article content - remove duplicates, old structures."""
    # Find article tag
    article_match = re.search(r'<article>(.*?)</article>', html, re.DOTALL)
    if not article_match:
        return ""
    
    content = article_match.group(1)
    
    # Remove duplicate h1 if present (should only be in hook)
    content = re.sub(r'<h1>.*?</h1>', '', content, count=1)
    
    # Remove old hook header if present
    content = re.sub(r'<header[^>]*class="hook"[^>]*>.*?</header>', '', content, flags=re.DOTALL)
    
    # Remove description paragraph if at start
    content = re.sub(r'<p class="description">.*?</p>', '', content, count=1, flags=re.DOTALL)
    
    # Remove all duplicate empty comment blocks
    content = re.sub(r'<!--\s*5\.\s*Mastery Challenges.*?-->', '', content, flags=re.DOTALL | re.IGNORECASE)
    content = re.sub(r'<!--\s*6\.\s*The Cliffhanger.*?-->', '', content, flags=re.DOTALL | re.IGNORECASE)
    content = re.sub(r'<!--\s*7\.\s*Key References.*?-->', '', content, flags=re.DOTALL | re.IGNORECASE)
    content = re.sub(r'<!--\s*8\.\s*Navigation.*?-->', '', content, flags=re.DOTALL | re.IGNORECASE)
    
    # Remove old "Challenge Problems" section entirely (heading + content until next section)
    content = re.sub(r'<h2>Challenge Problems</h2>.*?(?=<h2>|<section|</article>)', '', content, flags=re.DOTALL)
    
    # Remove old "References" section entirely (heading + content until next section)
    # But preserve if it's part of a list (like in chapter index)
    content = re.sub(r'<h2>References</h2>.*?(?=<h2>|<section|</article>|<nav|<!--|</ul>)', '', content, flags=re.DOTALL)
    
    # Remove old "Navigation" heading and related sections
    content = re.sub(r'<h2>Navigation</h2>.*?(?=<h2>|<section|</article>|<nav|<!--)', '', content, flags=re.DOTALL)
    content = re.sub(r'<h2>Related Sections</h2>.*?(?=<h2>|<section|</article>|<nav|<!--)', '', content, flags=re.DOTALL)
    
    # Remove standalone navigation lists (ul with links, not inside nav tag)
    # But preserve if they're part of challenge details
    content = re.sub(r'(?<!<details>)(?<!</summary>)\s*<ul>\s*<li><a href="[^"]*">.*?</a></li>\s*</ul>\s*(?!</details>)', '', content, flags=re.DOTALL)
    
    # Remove old nav blocks
    content = re.sub(r'<nav class="navigation">.*?</nav>', '', content, flags=re.DOTALL)
    
    # Remove old references blocks
    content = re.sub(r'<section class="references">.*?</section>', '', content, flags=re.DOTALL)
    
    # Remove old challenges blocks (we'll add proper one)
    content = re.sub(r'<section class="challenges">.*?</section>', '', content, flags=re.DOTALL)
    
    # Remove old final cliffhanger (we'll add proper one)
    content = re.sub(r'<div class="cliffhanger final">.*?</div>', '', content, flags=re.DOTALL)
    
    # Remove all orphaned closing tags (not preceded by opening tag)
    # Remove standalone </section> tags
    content = re.sub(r'^\s*</section>\s*$', '', content, flags=re.MULTILINE)
    content = re.sub(r'\n\s*</section>\s*\n(?=\s*<!--|\s*</article>|\s*<section|\s*<nav|\s*$)', '\n', content, flags=re.DOTALL)
    content = re.sub(r'\n\s*</nav>\s*\n(?=\s*<!--|\s*</article>|\s*<nav|\s*$)', '\n', content, flags=re.DOTALL)
    
    # Remove duplicate navigation comments
    while re.search(r'<!--\s*8\.\s*Navigation\s*-->\s*<!--\s*8\.\s*Navigation\s*-->', content, re.IGNORECASE):
        content = re.sub(r'<!--\s*8\.\s*Navigation\s*-->\s*(?=<!--\s*8\.\s*Navigation\s*-->)', '', content, flags=re.IGNORECASE)
    
    # Clean up multiple blank lines
    content = re.sub(r'\n\s*\n\s*\n+', '\n\n', content)
    
    return content.strip()

def fix_html_file(html_path: Path) -> None:
    """Fix a single HTML file."""
    print(f"Fixing: {html_path.name}")
    
    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Extract metadata
    title_match = re.search(r'<title>(.*?)</title>', html, re.DOTALL)
    title = title_match.group(1).strip() if title_match else "Untitled"
    
    desc_match = re.search(r'<meta name="description" content="(.*?)"', html)
    description = desc_match.group(1).strip() if desc_match else ""
    
    h1_match = re.search(r'<header class="hook">.*?<h1>(.*?)</h1>', html, re.DOTALL)
    h1_title = h1_match.group(1).strip() if h1_match else title
    
    hook_text_match = re.search(r'<p class="hook-text">\s*(.*?)\s*</p>', html, re.DOTALL)
    hook_text = hook_text_match.group(1).strip() if hook_text_match else "The explicit solution is the dream of classical physics — but it collapses the moment the system refuses to be linear."
    
    hook_subtitle_match = re.search(r'<p class="hook-subtitle">\s*(.*?)\s*</p>', html, re.DOTALL)
    hook_subtitle = hook_subtitle_match.group(1).strip() if hook_subtitle_match else "What survives when every coordinate change fails?"
    
    # Clean article content
    article_content = clean_article_content(html)
    
    # Extract existing sections
    existing_challenges = extract_existing_challenges(html)
    existing_refs = extract_existing_references(html)
    existing_nav = extract_existing_navigation(html)
    
    # Extract scripts
    scripts = []
    body_match = re.search(r'</main>(.*?)</body>', html, re.DOTALL)
    if body_match:
        body_html = body_match.group(1)
        nav_script = re.search(r'<script[^>]*src="[^"]*navigation\.js[^"]*"[^>]*></script>', body_html)
        if nav_script:
            scripts.append(nav_script.group(0))
        for script_type in ['textbook-engine', 'widget-engine']:
            match = re.search(r'<script[^>]*src="[^"]*' + script_type + r'[^"]*"[^>]*></script>', body_html)
            if match:
                scripts.append(match.group(0))
        plotly_match = re.search(r'<script>.*?plotly.*?</script>', body_html, re.DOTALL | re.IGNORECASE)
        if plotly_match and 'katex' not in plotly_match.group(0).lower():
            scripts.append(plotly_match.group(0))
    
    # Build new HTML
    is_index = is_chapter_index(html_path)
    
    new_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content="{description}">
  <!-- KaTeX (identical on every page) -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"
    onload="renderMathInElement(document.body, {{delimiters: [{{left: '$$', right: '$$', display: true}}, {{left: '$', right: '$', display: false}}], throwOnError: false}});">
  </script>
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
    {article_content}"""
    
    # Add challenges section (skip for chapter index)
    if not is_index:
        if existing_challenges and '<details>' in existing_challenges:
            # Use existing challenges
            new_html += f"""
    
    <!-- 5. Mastery Challenges (always present, accordion) -->
    <section class="challenges">
      <h2>Mastery Challenges</h2>
{existing_challenges}
    </section>"""
        else:
            # Default challenges
            new_html += """
    
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
    </section>"""
    
    # Add final cliffhanger (skip for chapter index)
    if not is_index:
        new_html += """
    
    <!-- 6. The Cliffhanger – the single most important paragraph of the entire section -->
    <div class="cliffhanger final">
      <p>
        We have exhausted every classical trick. The explicit solution is dead. To go further we must abandon the very notion of "formula" and invent new mathematical objects — special functions, infinite-dimensional spaces, and eventually the geometry of the equation itself.
      </p>
    </div>"""
    
    # Add references section
    if existing_refs and '<ul>' in existing_refs:
        # Use existing references
        new_html += f"""
    
    <!-- 7. Key References (immediately after the cliffhanger) -->
    <section class="references">
      <h2>Key References</h2>
{existing_refs}
    </section>"""
    else:
        # Default references
        new_html += """
    
    <!-- 7. Key References (immediately after the cliffhanger) -->
    <section class="references">
      <h2>Key References</h2>
      <ul>
        <li>Arnold, V. I. (1983). <em>Ordinary Differential Equations</em>.</li>
        <li>Hartman, P. (1964). <em>Ordinary Differential Equations</em>.</li>
      </ul>
    </section>"""
    
    # Add navigation
    if existing_nav:
        new_html += f"""
    
    <!-- 8. Navigation -->
    {existing_nav}"""
    else:
        new_html += """
    
    <!-- 8. Navigation -->
    <nav class="navigation">
      <hr>
      <ul>
        <li><a href="/diffequations/">Full Table of Contents</a></li>
      </ul>
    </nav>"""
    
    new_html += """
  </article>
</main>"""
    
    # Add scripts
    for script in scripts:
        new_html += f"  {script}\n"
    
    new_html += """</body>
</html>"""
    
    # Write back
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(new_html)
    
    print(f"  ✓ Fixed")

def main():
    """Fix all HTML files in chapter-01."""
    base_dir = Path('diffequations/chapter-01')
    
    html_files = list(base_dir.rglob('index.html'))
    print(f"Found {len(html_files)} HTML files to fix\n")
    
    for html_file in sorted(html_files):
        try:
            fix_html_file(html_file)
        except Exception as e:
            print(f"  ✗ Error: {e}")
            import traceback
            traceback.print_exc()
    
    print(f"\n✓ Fix complete! {len(html_files)} files processed.")

if __name__ == '__main__':
    main()

