#!/usr/bin/env python3
"""
Global fix for common KaTeX parsing issues in Markdown files.

This script identifies and fixes common LaTeX parsing problems that occur
with KaTeX/MathJax renderers, especially in inline math mode.
"""

import re
import os
from pathlib import Path
from typing import List, Tuple, Dict

# Common problematic patterns
PATTERNS = {
    'leading_subscript': (
        r'\$\{[_^]\d+[A-Za-z]',  # ${}_2F, ${}^3H, etc.
        'Leading subscript/superscript in inline math'
    ),
    'very_long_inline': (
        r'\$([^$]{80,})\$',  # Very long inline expressions
        'Very long inline math expression (should be display)'
    ),
    'nested_fractions': (
        r'\$[^$]*\\frac\{[^}]*\\frac',  # Nested fractions
        'Nested fractions in inline math'
    ),
    'complex_sums_inline': (
        r'\$[^$]*(\\sum|\\int|\\prod)[^$]*\{[^}]*\{[^}]*\}[^$]*\$(?!\$)',
        'Complex large operators in inline math'
    ),
    'alignment_inline': (
        r'\$[^$]*\\begin\{(align|aligned|cases|matrix|pmatrix|bmatrix|vmatrix)',
        'Alignment environment in inline math (must be display)'
    ),
    'multiple_nested': (
        r'\$[^$]*\{[^}]*\{[^}]*\{[^}]*\{',  # 4+ levels of nesting
        'Excessively nested expression in inline math'
    ),
}

def find_inline_math_issues(content: str, filepath: str) -> List[Dict]:
    """Find all problematic inline math expressions."""
    issues = []
    lines = content.split('\n')

    for line_num, line in enumerate(lines, 1):
        # Find all inline math expressions
        inline_math_pattern = r'\$([^$]+)\$'
        matches = list(re.finditer(inline_math_pattern, line))

        for match in matches:
            math_expr = match.group(1)
            start_pos = match.start()

            # Check each pattern
            for pattern_name, (pattern, description) in PATTERNS.items():
                if pattern_name == 'very_long_inline':
                    # Special handling for length check
                    if len(math_expr) >= 80:
                        issues.append({
                            'file': filepath,
                            'line': line_num,
                            'column': start_pos + 1,
                            'pattern': pattern_name,
                            'description': description,
                            'expression': math_expr[:100] + '...' if len(math_expr) > 100 else math_expr,
                            'full_line': line,
                            'match': match.group(0)
                        })
                elif pattern_name == 'leading_subscript':
                    # Check if starts with {}_ or {}^
                    if re.match(r'\{[_^]\d+', math_expr):
                        issues.append({
                            'file': filepath,
                            'line': line_num,
                            'column': start_pos + 1,
                            'pattern': pattern_name,
                            'description': description,
                            'expression': math_expr[:100] + '...' if len(math_expr) > 100 else math_expr,
                            'full_line': line,
                            'match': match.group(0)
                        })
                else:
                    # Check if pattern matches
                    if re.search(pattern, match.group(0)):
                        issues.append({
                            'file': filepath,
                            'line': line_num,
                            'column': start_pos + 1,
                            'pattern': pattern_name,
                            'description': description,
                            'expression': math_expr[:100] + '...' if len(math_expr) > 100 else math_expr,
                            'full_line': line,
                            'match': match.group(0)
                        })

    return issues

def fix_leading_subscript(content: str) -> Tuple[str, int]:
    """Fix leading subscript issues by converting to display math."""
    fixes = 0

    # Pattern: ${}_n... or ${}^n... in inline math
    pattern = r'\$\{([_^]\d+)([A-Za-z][^$]*)\$'

    def replace_func(match):
        nonlocal fixes
        fixes += 1
        subscript = match.group(1)
        rest = match.group(2)
        # Convert to display math
        return f'$$\\{{{subscript}{rest}$$'

    content = re.sub(pattern, replace_func, content)

    # Also handle cases where {}_n appears in the middle but causes issues
    # Pattern: $...{}_nF...$ where it's a hypergeometric function
    pattern2 = r'\$([^$]*)\{\}([_^]\d+)(F_\d+[^$]*)\$'

    def replace_func2(match):
        nonlocal fixes
        # Check if it's a hypergeometric function (common case)
        if 'F_' in match.group(3):
            fixes += 1
            before = match.group(1)
            sub = match.group(2)
            after = match.group(3)
            # If the expression is long or complex, convert to display
            if len(before + after) > 40:
                return f'$${before}\\{{{sub}{after}$$'
        return match.group(0)

    content = re.sub(pattern2, replace_func2, content)

    return content, fixes

def fix_very_long_inline(content: str, threshold: int = 80) -> Tuple[str, int]:
    """Convert very long inline math expressions to display math."""
    fixes = 0

    def replace_long_inline(match):
        nonlocal fixes
        math_expr = match.group(1)
        if len(math_expr) >= threshold:
            fixes += 1
            return f'$${math_expr}$$'
        return match.group(0)

    pattern = r'\$([^$]+)\$'
    content = re.sub(pattern, replace_long_inline, content)

    return content, fixes

def fix_alignment_inline(content: str) -> Tuple[str, int]:
    """Fix alignment environments in inline math."""
    fixes = 0

    # Find inline math containing begin{align} etc.
    pattern = r'\$([^$]*\\begin\{(align|aligned|cases|matrix|pmatrix|bmatrix|vmatrix)[^$]*)\$'

    def replace_func(match):
        nonlocal fixes
        fixes += 1
        math_expr = match.group(1)
        return f'$${math_expr}$$'

    content = re.sub(pattern, replace_func, content)

    return content, fixes

def apply_fixes(content: str, auto_fix: bool = False) -> Tuple[str, Dict[str, int]]:
    """Apply all fixes to content."""
    fix_counts = {}

    if auto_fix:
        content, count = fix_leading_subscript(content)
        fix_counts['leading_subscript'] = count

        content, count = fix_very_long_inline(content)
        fix_counts['very_long_inline'] = count

        content, count = fix_alignment_inline(content)
        fix_counts['alignment_inline'] = count

    return content, fix_counts

def scan_directory(directory: Path, auto_fix: bool = False) -> Dict:
    """Scan directory for KaTeX parsing issues."""
    all_issues = []
    fix_summary = {}

    for md_file in directory.rglob('*.md'):
        if md_file.name.startswith('_') or 'node_modules' in str(md_file):
            continue

        try:
            content = md_file.read_text(encoding='utf-8')
            issues = find_inline_math_issues(content, str(md_file.relative_to(directory)))

            if issues:
                all_issues.extend(issues)

            if auto_fix:
                fixed_content, fix_counts = apply_fixes(content, auto_fix=True)
                if any(fix_counts.values()):
                    md_file.write_text(fixed_content, encoding='utf-8')
                    fix_summary[str(md_file.relative_to(directory))] = fix_counts
                    print(f"Fixed {sum(fix_counts.values())} issues in {md_file.name}")

        except Exception as e:
            print(f"Error processing {md_file}: {e}")

    return {
        'issues': all_issues,
        'fixes': fix_summary
    }

def main():
    """Main function."""
    import argparse

    parser = argparse.ArgumentParser(description='Fix KaTeX parsing issues in Markdown files')
    parser.add_argument('directory', nargs='?', default='.', help='Directory to scan')
    parser.add_argument('--fix', action='store_true', help='Automatically fix issues')
    parser.add_argument('--report', action='store_true', help='Generate report only')

    args = parser.parse_args()

    directory = Path(args.directory)
    if not directory.exists():
        print(f"Error: Directory {directory} does not exist")
        return

    print(f"Scanning {directory} for KaTeX parsing issues...")
    results = scan_directory(directory, auto_fix=args.fix)

    if args.report or not args.fix:
        print(f"\nFound {len(results['issues'])} potential issues:\n")

        # Group by pattern
        by_pattern = {}
        for issue in results['issues']:
            pattern = issue['pattern']
            if pattern not in by_pattern:
                by_pattern[pattern] = []
            by_pattern[pattern].append(issue)

        for pattern, issues in sorted(by_pattern.items()):
            print(f"\n{pattern}: {len(issues)} issues")
            for issue in issues[:5]:  # Show first 5
                print(f"  {issue['file']}:{issue['line']} - {issue['description']}")
                print(f"    Expression: {issue['expression']}")
            if len(issues) > 5:
                print(f"  ... and {len(issues) - 5} more")

    if args.fix and results['fixes']:
        print(f"\n\nFixed issues in {len(results['fixes'])} files:")
        for file, counts in results['fixes'].items():
            total = sum(counts.values())
            print(f"  {file}: {total} fixes")
            for pattern, count in counts.items():
                if count > 0:
                    print(f"    - {pattern}: {count}")

if __name__ == '__main__':
    main()
