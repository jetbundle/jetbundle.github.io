#!/usr/bin/env python3
"""
Convert all _diffequations markdown files to standalone HTML files.
Preserves LaTeX math delimiters and converts Liquid templates to plain HTML.
"""

import os
import re
import yaml
from pathlib import Path
from typing import Dict, Optional, Tuple
import sys

try:
    import markdown
    MARKDOWN_AVAILABLE = True
except ImportError:
    MARKDOWN_AVAILABLE = False
    print("WARNING: markdown library not available. Install with: pip install markdown")

# KaTeX renderer HTML (inline version)
KATEX_RENDERER = """<!-- KaTeX Math Renderer - Reliable Client-Side Rendering -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV" crossorigin="anonymous">
<script>
(function() {
  var katexScript = document.createElement('script');
  katexScript.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js';
  katexScript.integrity = 'sha384-XjKyOOlGwcjNTAIQHIpgOno0Hl1YQqzUOEleOLALmuqehneUG+vnGctmUb0ZY0l8';
  katexScript.crossOrigin = 'anonymous';
  katexScript.async = false;
  katexScript.onload = function() {
    var renderScript = document.createElement('script');
    renderScript.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js';
    renderScript.integrity = 'sha384-+VBxd3r6XgURycqtZ117nYw44OOcIax56Z4dCRWbxyPt0Koah1uHoK0o4+/RRE05';
    renderScript.crossOrigin = 'anonymous';
    renderScript.async = false;
    renderScript.onload = function() {
      function renderMath() {
        if (typeof renderMathInElement === 'undefined') return;
        try {
          renderMathInElement(document.body, {
            delimiters: [
              {left: '$$', right: '$$', display: true},
              {left: '$', right: '$', display: false},
              {left: '\\\\[', right: '\\\\]', display: true},
              {left: '\\\\(', right: '\\\\)', display: false}
            ],
            throwOnError: false,
            strict: false,
            trust: true,
            ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
            ignoredClasses: ['no-math']
          });
        } catch (error) {
          console.error('KaTeX rendering error:', error);
        }
      }
      if (document.body) {
        renderMath();
      } else {
        document.addEventListener('DOMContentLoaded', renderMath);
      }
      window.addEventListener('load', function() {
        setTimeout(renderMath, 100);
      });
    };
    document.head.appendChild(renderScript);
  };
  document.head.appendChild(katexScript);
})();
</script>"""


def extract_front_matter(content: str) -> Tuple[Optional[Dict], str]:
    """Extract YAML front matter from markdown content."""
    if not content.startswith('---'):
        return None, content

    parts = content.split('---', 2)
    if len(parts) < 3:
        return None, content

    try:
        front_matter = yaml.safe_load(parts[1])
        body = parts[2].lstrip('\n')
        return front_matter, body
    except yaml.YAMLError:
        return None, content


def convert_liquid_to_html(content: str) -> str:
    """Convert Liquid template syntax to plain HTML/URLs."""
    # Convert {{ '/path' | relative_url }} to /path
    content = re.sub(
        r"\{\{\s*['\"]([^'\"]+)['\"]\s*\|\s*relative_url\s*\}\}",
        r'\1',
        content
    )

    # Remove {% include page_navigation.html %} - we'll add simple nav
    content = re.sub(
        r'\{%\s*include\s+page_navigation\.html\s*%\}',
        '',
        content
    )

    # Remove other Liquid includes (keep content)
    content = re.sub(
        r'\{%\s*include\s+[^%]+\s*%\}',
        '',
        content
    )

    return content


def convert_markdown_to_html(markdown_content: str) -> str:
    """Convert markdown to HTML using Python markdown library, preserving math delimiters."""
    if not MARKDOWN_AVAILABLE:
        print("ERROR: markdown library is required. Install with: pip install markdown")
        sys.exit(1)

    # Protect math delimiters before markdown processing
    # Use a more unique placeholder that won't be processed by markdown
    math_patterns = []
    math_counter = 0

    def replace_math(match):
        nonlocal math_counter
        math_counter += 1
        # Use HTML comment as placeholder - markdown won't touch it
        placeholder = f"<!--MATH{math_counter}-->"
        math_patterns.append((placeholder, match.group(0)))
        return placeholder

    # Protect display math $$...$$ first (longer pattern)
    protected_content = re.sub(r'\$\$([^$]+?)\$\$', replace_math, markdown_content, flags=re.DOTALL)
    # Protect inline math $...$ (but not $$)
    protected_content = re.sub(r'(?<!\$)\$(?!\$)([^$\n]+?)\$(?!\$)', replace_math, protected_content)

    # Convert markdown to HTML
    md = markdown.Markdown(extensions=[
        'codehilite',
        'tables',
        'fenced_code',
        'nl2br',
        'sane_lists'
    ])

    html_content = md.convert(protected_content)

    # Restore math delimiters (in reverse order to avoid conflicts)
    for placeholder, original_math in reversed(math_patterns):
        html_content = html_content.replace(placeholder, original_math)

    return html_content


def create_html_page(front_matter: Optional[Dict], html_body: str, permalink: str) -> str:
    """Create a complete HTML page with KaTeX support, dark theme, and navigation."""
    title = front_matter.get('title', 'Differential Equations') if front_matter else 'Differential Equations'
    description = front_matter.get('description', '') if front_matter else ''

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content="{description}">
  {KATEX_RENDERER}
  <link rel="stylesheet" href="/diffequations/styles.css">
  <script src="/diffequations/navigation-data.js"></script>
  <script src="/diffequations/manifold-background.js" defer></script>
</head>
<body>
  <main>
    <header>
      <h1>{title}</h1>
      {f'<p class="description">{description}</p>' if description else ''}
    </header>
    <article>
{html_body}
    </article>
  </main>
  <script src="/diffequations/navigation.js"></script>

  <!-- Python/Plotly Widget System - Load after content -->
  <script>
    // Lazy load Plotly.js after page is fully loaded
    window.addEventListener('load', function() {{
      var plotlyScript = document.createElement('script');
      plotlyScript.src = 'https://cdn.plot.ly/plotly-2.27.0.min.js';
      plotlyScript.charset = 'utf-8';
      plotlyScript.async = true;
      document.body.appendChild(plotlyScript);
    }});
  </script>

  <!-- Widget Engine Scripts - Load with defer to not block rendering -->
  <script defer src="/diffequations/js/textbook-engine.js"></script>
  <script defer src="/diffequations/js/widget-engine.js"></script>
</body>
</html>"""

    return html


def process_file(md_path: Path, output_base: Path) -> None:
    """Process a single markdown file and convert it to HTML."""
    print(f"Processing: {md_path}")

    # Read markdown file
    content = md_path.read_text(encoding='utf-8')

    # Extract front matter
    front_matter, markdown_body = extract_front_matter(content)

    if not front_matter:
        print(f"  WARNING: No front matter found, skipping: {md_path}")
        return

    # Get permalink
    permalink = front_matter.get('permalink', '')
    if not permalink:
        print(f"  WARNING: No permalink found, skipping: {md_path}")
        return

    # Convert Liquid templates to plain HTML
    markdown_body = convert_liquid_to_html(markdown_body)

    # Convert markdown to HTML
    html_body = convert_markdown_to_html(markdown_body)

    # Create complete HTML page
    html_page = create_html_page(front_matter, html_body, permalink)

    # Determine output path from permalink
    # permalink is like: /diffequations/chapter-01/01-1-exact-methods/
    # We want: diffequations/chapter-01/01-1-exact-methods/index.html
    permalink_path = permalink.strip('/')
    if permalink_path.startswith('diffequations/'):
        permalink_path = permalink_path[len('diffequations/'):]

    # Create directory structure
    output_dir = output_base / permalink_path
    output_dir.mkdir(parents=True, exist_ok=True)

    # Write HTML file
    output_file = output_dir / 'index.html'
    output_file.write_text(html_page, encoding='utf-8')
    print(f"  Created: {output_file}")


def main():
    """Main conversion function."""
    repo_root = Path(__file__).parent
    source_dir = repo_root / '_diffequations'
    output_dir = repo_root / 'diffequations'

    if not source_dir.exists():
        print(f"ERROR: Source directory not found: {source_dir}")
        sys.exit(1)

    # Create output directory
    output_dir.mkdir(exist_ok=True)

    # Find all markdown files
    md_files = list(source_dir.rglob('*.md'))

    if not md_files:
        print(f"ERROR: No markdown files found in {source_dir}")
        sys.exit(1)

    print(f"Found {len(md_files)} markdown files to convert")
    print()

    # Process each file
    for md_file in sorted(md_files):
        # Skip documentation files
        if any(skip in md_file.name for skip in ['README', 'GUIDE', 'PLAN', 'ISSUES', 'TESTING', 'ANALYSIS', 'SUMMARY', 'TROUBLESHOOTING', 'SETUP', 'ALTERNATIVE', 'SOLUTION', 'OPTIMIZATION', 'PIPELINE', 'NOTATION', 'STANDARDS', 'RENDERING', 'FIXES', 'STRUCTURE', 'IMPLEMENTATION', 'PHASE', 'JEKTEX', 'LATEX', 'LOADING', 'MARKDOWN', 'MATH', 'SERVE', 'FULL', 'CONTENT', 'transformation']):
            continue

        try:
            process_file(md_file, output_dir)
        except Exception as e:
            print(f"  ERROR processing {md_file}: {e}")
            continue

    print()
    print(f"Conversion complete! HTML files written to: {output_dir}")


if __name__ == '__main__':
    main()
