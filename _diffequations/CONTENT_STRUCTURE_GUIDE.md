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

[Narrative solution with complete workthrough — no collapsible toggle]
```

### Formatting Rules

1. **Only "Problem:" is bold** - All other text uses normal formatting
2. **Narrative style** - Solutions should read as a story, not just steps
3. **Display math for primary equations** - Any equation involving equality, fractions, or absolute values must use `$$ ... $$`
4. **LaTeX formatting** - All absolute values use `\left|` and `\right|`
5. **No bold section headers** - Remove `**Step 1:**`, `**Solution:**`, etc.

### LaTeX Absolute Value Formatting

In all LaTeX expressions, replace `|` with `\left|` and `\right|` for absolute values:

- ❌ Wrong: `$|f(y_1) - f(y_2)|$`
- ❌ Also Wrong: `$\|f(y_1) - f(y_2)\|$`
- ✅ Correct: `$\left|f(y_1) - f(y_2)\right|$`

**Rules:**
- Always use `\left|` to open and `\right|` to close
- This ensures proper scaling of absolute value bars
- For single absolute values: `$\left|x\right|$`
- For expressions: `$\left|\frac{a}{b}\right|$`

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

2. **Fix LaTeX absolute values:**
   - Replace `|` with `\left|` and `\right|` in all math expressions
   - Check both inline `$...$` and display `$$...$$`
   - Ensure proper pairing: every `\left|` has a matching `\right|`

3. **Format theorems/definitions:**
   - Use `**Theorem [X.Y.Z]** ([Name])` format
   - Keep statements clear and precise

#### Step 3: Format Examples

For each example:

1. **Extract problem:**
   - Keep only "Problem:" in bold
   - Remove any other bold formatting from the problem statement

2. **Process solution:**
   - Remove all bold section headers (`**Step 1:**`, `**Solution:**`, etc.)
   - Convert to narrative style
   - Fix LaTeX absolute values (`|` → `\left|` and `\right|`)
   - Make it read as a continuous story

3. **Promote primary equations to display math:**
   - Use `$$ ... $$` for any equation involving equality, fractions, or absolute values
   - Keep short symbolic references inline only when they truly function as part of the sentence

4. **Compose the solution narrative:**
   - Present the solution immediately after the problem statement
   - Do not hide content behind collapsible toggles
   - Reference display equations in the surrounding prose

Example structure:
```markdown
### Example 1.1.1: Picard-Lindelöf Theorem — Canonical Picard Iteration

**Problem:** Solve $y' = y$, $y(0) = 1$ on $[-1,1]$.

We begin by verifying the Lipschitz condition. For $f(y) = y$, we have

$$
\left|f(y_1) - f(y_2)\right| = \left|y_1 - y_2\right| \leq 1 \cdot \left|y_1 - y_2\right|.
$$

This establishes a Lipschitz constant $K = 1$. The Picard iteration process starts with the initial guess $y_0(t) = 1$. The first iterate is computed as $y_1(t) = 1 + \int_0^t y_0(s) \, ds = 1 + t$. Continuing this process, we find $y_2(t) = 1 + t + \frac{t^2}{2}$, and $y_3(t) = 1 + t + \frac{t^2}{2} + \frac{t^3}{6}$. The pattern becomes clear: $y_n(t) = \sum_{k=0}^n \frac{t^k}{k!}$.

For convergence analysis, we apply the error estimate

$$
\left|y(t) - y_n(t)\right| \leq \frac{M K^n \left|t\right|^{n+1}}{(n+1)! \left(1 - K\left|t\right|\right)}.
$$

Here $M = \max\left|f(y)\right|$ on the complete rectangle. For $\left|t\right| \leq 1/2$, we have $K\left|t\right| = 1/2 < 1$, yielding

$$
\left|y(t) - y_3(t)\right| \leq \frac{3 \cdot (1/2)^4}{4!} = \frac{3}{384} \approx 0.0078.
$$

The exact solution emerges as

$$
y(t) = e^t = \lim_{n \to \infty} y_n(t),
$$

revealing that the exponential series arises naturally from the fixed-point iteration process.
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
   - All LaTeX absolute values use `\left|` and `\right|`
   - Only "Problem:" bold in examples
   - Primary equations use display math `$$ ... $$`
   - Solutions are presented inline (no collapsible toggles)
   - Narrative flow maintained

---

## Quality Checklist

Before finalizing each section:

- [ ] Examples moved after References
- [ ] Only "Problem:" is bold in examples
- [ ] Solutions are presented inline (no collapsible toggles)
- [ ] All LaTeX absolute values use `\left|` and `\right|`
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
   - Fix LaTeX absolute values (`|` → `\left|` and `\right|`)
   - Promote primary equations to display math (`$$ ... $$`)
4. **Assemble** in optimal order
5. **Verify** against checklist
6. **Deploy**: Commit and push to `main` to trigger GitHub Actions (GitHub Pages deployment)

### Key Principles

- **Narrative over steps**: Solutions should read as explanations, not just procedures
- **Pedagogy first**: Keep solutions fully visible to encourage active learning
- **Consistency**: Same structure and formatting across all sections
- **Accessibility**: Use clear problem statements and visible solutions (no hidden content)

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

We begin by verifying the Lipschitz condition. For $f(y) = y$, we have

$$
\left|f(y_1) - f(y_2)\right| = \left|y_1 - y_2\right| \leq 1 \cdot \left|y_1 - y_2\right|.
$$

This establishes a Lipschitz constant $K = 1$. The Picard iteration process starts with the initial guess $y_0(t) = 1$. The first iterate is computed as $y_1(t) = 1 + \int_0^t y_0(s) \, ds = 1 + t$. Continuing this process, we find $y_2(t) = 1 + t + \frac{t^2}{2}$, and $y_3(t) = 1 + t + \frac{t^2}{2} + \frac{t^3}{6}$. The pattern becomes clear: $y_n(t) = \sum_{k=0}^n \frac{t^k}{k!}$.

For convergence analysis, we apply the error estimate

$$
\left|y(t) - y_n(t)\right| \leq \frac{M K^n \left|t\right|^{n+1}}{(n+1)! \left(1 - K\left|t\right|\right)}.
$$

Here $M = \max\left|f(y)\right|$ on the complete rectangle. For $\left|t\right| \leq 1/2$, we have $K\left|t\right| = 1/2 < 1$, yielding

$$
\left|y(t) - y_3(t)\right| \leq \frac{3 \cdot (1/2)^4}{4!} = \frac{3}{384} \approx 0.0078.
$$

The exact solution emerges as

$$
y(t) = e^t = \lim_{n \to \infty} y_n(t),
$$

revealing that the exponential series arises naturally from the fixed-point iteration process.

```

---

## Notes

- This structure optimizes learning by encouraging problem-solving before solution viewing
- Clear, visible solutions reduce cognitive overhead while maintaining accessibility
- Narrative style makes solutions more engaging and easier to follow
- Consistent formatting ensures professional appearance across all sections

---

**Document Status:** Active Reference
**Maintained By:** Content Processing System
**Related Documents:** `IMPLEMENTATION_PLAN.md`, `PHASE_1_2_EXECUTION_PLAN.md`
