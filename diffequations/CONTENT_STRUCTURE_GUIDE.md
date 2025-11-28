# Content Structure Guide: Section Formatting Standards

**Version:** 1.0  
**Last Updated:** 2025-01-XX  
**Purpose:** Defines the optimal structure and formatting standards for section content in the Differential Equations resource.

---

## Optimal Section Structure

Each section file must follow this exact order:

```
1. Front Matter (YAML)
2. Section Title (#)
3. Introduction (##)
4. Mathematical Content (##)
   - Subsections (###)
5. Connections to Chapter Narrative (##)
6. References (##)
7. Complete Examples (##)
   - Individual examples (###)
8. Navigation (##)
9. Related Sections (##)
```

### Why This Order?

1. **Introduction First**: Establishes context and narrative connection
2. **Mathematical Content**: Core theory before applications
3. **Connections**: Links to broader narrative before examples
4. **References**: Academic citations before worked problems
5. **Examples Last**: Allows readers to attempt problems before seeing solutions
6. **Navigation**: Always at the end for easy access

---

## Example Formatting Standards

### Structure

Each example must follow this structure:

```markdown
### Example N.M.K: [Descriptive Title]

**Problem:** [Problem statement in bold]

<details>
<summary>Click to reveal solution</summary>

[Narrative solution with complete workthrough]

</details>
```

### Formatting Rules

1. **Only "Problem:" is bold** - All other text uses normal formatting
2. **Solutions are collapsible** - Use HTML `<details>` and `<summary>` tags
3. **Narrative style** - Solutions should read as a story, not just steps
4. **LaTeX formatting** - All absolute values use `\|` not `|` in math mode
5. **No bold section headers** - Remove `**Step 1:**`, `**Solution:**`, etc.

### LaTeX Pipe Fix

In all LaTeX expressions, replace `|` with `\|` for absolute values:

- ❌ Wrong: `$|f(y_1) - f(y_2)|$`
- ✅ Correct: `$\|f(y_1) - f(y_2)\|$`

**Exception**: If already escaped (`\|`), leave as is.

---

## Content Processing Workflow

### Input Format (What You Will Receive)

The user will provide content in this format:

```
**CHAPTER N: [Chapter Title]**

**N.M [Section Title]**

[Mathematical content with LaTeX equations, definitions, theorems, narrative text]

**References**

[Formatted references]

**Examples**

[Complete worked examples with full solutions]
```

### Processing Steps

#### Step 1: Extract and Parse

1. **Identify sections:**
   - Main mathematical content (everything before "References")
   - References section
   - Examples section

2. **Parse mathematical content:**
   - Identify subsections (marked by headers)
   - Preserve LaTeX formatting
   - Maintain narrative flow

3. **Parse examples:**
   - Identify individual examples (numbered)
   - Extract problem statements
   - Extract solution content

#### Step 2: Format Mathematical Content

1. **Structure subsections:**
   - Use `###` for subsections within "Mathematical Content"
   - Maintain logical flow
   - Preserve all LaTeX

2. **Fix LaTeX pipes:**
   - Replace `|` with `\|` in all math expressions
   - Check both inline `$...$` and display `$$...$$`

3. **Format theorems/definitions:**
   - Use `**Theorem [X.Y.Z]** ([Name])` format
   - Keep statements clear and precise

#### Step 3: Format Examples

For each example:

1. **Extract problem:**
   - Keep only "Problem:" in bold
   - Remove any other bold formatting from problem statement

2. **Process solution:**
   - Remove all bold section headers (`**Step 1:**`, `**Solution:**`, etc.)
   - Convert to narrative style
   - Fix LaTeX pipes (`|` → `\|`)
   - Make it read as a continuous story

3. **Wrap in collapsible:**
   - Use `<details>` and `<summary>` HTML
   - Summary text: "Click to reveal solution"

4. **Example structure:**
```markdown
### Example 1.1.1: Picard-Lindelöf Theorem — Canonical Picard Iteration

**Problem:** Solve $y' = y$, $y(0) = 1$ on $[-1,1]$.

<details>
<summary>Click to reveal solution</summary>

We begin by verifying the Lipschitz condition. For $f(y) = y$, we have $\|f(y_1) - f(y_2)\| = \|y_1 - y_2\| \leq 1 \cdot \|y_1 - y_2\|$, establishing a Lipschitz constant $K = 1$.

The Picard iteration process starts with the initial guess $y_0(t) = 1$. The first iterate is computed as $y_1(t) = 1 + \int_0^t y_0(s) \, ds = 1 + t$. Continuing this process, we find $y_2(t) = 1 + t + \frac{t^2}{2}$, and $y_3(t) = 1 + t + \frac{t^2}{2} + \frac{t^3}{6}$. The pattern becomes clear: $y_n(t) = \sum_{k=0}^n \frac{t^k}{k!}$.

For convergence analysis, we apply the error estimate $|y(t) - y_n(t)| \leq \frac{M K^n |t|^{n+1}}{(n+1)! (1 - K|t|)}$ where $M = \max|f(y)|$ on the complete rectangle. For $|t| \leq 1/2$, we have $K|t| = 1/2 < 1$, yielding $|y(t) - y_3(t)| \leq \frac{3 \cdot (1/2)^4}{4!} = \frac{3}{384} \approx 0.0078$.

The exact solution emerges as $y(t) = e^t = \lim_{n \to \infty} y_n(t)$, revealing that the exponential series arises naturally from the fixed-point iteration process.

</details>
```

#### Step 4: Assemble Final Structure

1. **Order sections:**
   - Introduction
   - Mathematical Content
   - Connections to Chapter Narrative
   - References
   - Complete Examples
   - Navigation
   - Related Sections

2. **Verify:**
   - All LaTeX pipes fixed
   - Only "Problem:" bold in examples
   - All solutions collapsible
   - Narrative flow maintained

---

## CSS Requirements

Add the following to `assets/css/textbook.css`:

```css
/* Collapsible Example Solutions */
details {
  margin: 1.5rem 0;
  padding: 1rem;
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: 8px;
}

details summary {
  cursor: pointer;
  font-weight: 600;
  color: var(--accent);
  padding: 0.5rem;
  user-select: none;
}

details summary:hover {
  color: var(--accent-hover);
}

details[open] summary {
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.5rem;
}

details .solution-content {
  padding-top: 1rem;
}
```

---

## Quality Checklist

Before finalizing each section:

- [ ] Examples moved after References
- [ ] Only "Problem:" is bold in examples
- [ ] All solutions are collapsible (`<details>`)
- [ ] All LaTeX pipes fixed (`|` → `\|`)
- [ ] Solutions written in narrative style
- [ ] No bold section headers in solutions
- [ ] Structure follows optimal order
- [ ] All LaTeX renders correctly
- [ ] Navigation includes present
- [ ] Related sections links correct

---

## High-Level Processing Strategy

### For Future Sections

When processing new content:

1. **Parse input** into three sections: content, references, examples
2. **Format content** with proper subsections and LaTeX fixes
3. **Process examples** individually:
   - Extract problem (keep bold)
   - Convert solution to narrative
   - Fix LaTeX pipes
   - Wrap in collapsible
4. **Assemble** in optimal order
5. **Verify** against checklist

### Key Principles

- **Narrative over steps**: Solutions should read as explanations, not just procedures
- **Pedagogy first**: Collapsible solutions encourage active learning
- **Consistency**: Same structure and formatting across all sections
- **Accessibility**: Clear problem statements, hidden solutions

---

## Example Transformation

### Before (Input Format)

```
**Example 1.1.1: Picard-Lindelöf Theorem**

**Problem:** Solve $y' = y$, $y(0) = 1$

**Step-by-Step Analysis:**

**Lipschitz Verification:**

$f(y) = y, |f(y_1) - f(y_2)| = |y_1 - y_2| \leq 1 \cdot |y_1 - y_2|$

Lipschitz constant $K = 1$.

**Picard Iterates:**

- $y_0(t) = 1$
- $y_1(t) = 1 + t$
...

**Solution:** $y(t) = e^t$
```

### After (Output Format)

```markdown
### Example 1.1.1: Picard-Lindelöf Theorem — Canonical Picard Iteration

**Problem:** Solve $y' = y$, $y(0) = 1$ on $[-1,1]$.

<details>
<summary>Click to reveal solution</summary>

We begin by verifying the Lipschitz condition. For $f(y) = y$, we have $\|f(y_1) - f(y_2)\| = \|y_1 - y_2\| \leq 1 \cdot \|y_1 - y_2\|$, establishing a Lipschitz constant $K = 1$.

The Picard iteration process starts with the initial guess $y_0(t) = 1$. The first iterate is computed as $y_1(t) = 1 + \int_0^t y_0(s) \, ds = 1 + t$. Continuing this process, we find $y_2(t) = 1 + t + \frac{t^2}{2}$, and $y_3(t) = 1 + t + \frac{t^2}{2} + \frac{t^3}{6}$. The pattern becomes clear: $y_n(t) = \sum_{k=0}^n \frac{t^k}{k!}$.

For convergence analysis, we apply the error estimate $\|y(t) - y_n(t)\| \leq \frac{M K^n \|t\|^{n+1}}{(n+1)! (1 - K\|t\|)}$ where $M = \max\|f(y)\|$ on the complete rectangle. For $\|t\| \leq 1/2$, we have $K\|t\| = 1/2 < 1$, yielding $\|y(t) - y_3(t)\| \leq \frac{3 \cdot (1/2)^4}{4!} = \frac{3}{384} \approx 0.0078$.

The exact solution emerges as $y(t) = e^t = \lim_{n \to \infty} y_n(t)$, revealing that the exponential series arises naturally from the fixed-point iteration process.

</details>
```

---

## Notes

- This structure optimizes learning by encouraging problem-solving before solution viewing
- Collapsible solutions reduce visual clutter while maintaining accessibility
- Narrative style makes solutions more engaging and easier to follow
- Consistent formatting ensures professional appearance across all sections

---

**Document Status:** Active Reference  
**Maintained By:** Content Processing System  
**Related Documents:** `IMPLEMENTATION_PLAN.md`, `PHASE_1_2_EXECUTION_PLAN.md`

