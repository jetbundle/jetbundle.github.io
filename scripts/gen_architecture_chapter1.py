#!/usr/bin/env python3
"""Emit physics/architecture-linearity/chapter-1/index.html (static lecture + widgets)."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "physics" / "architecture-linearity" / "chapter-1" / "index.html"

HTML = r"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>chapter 1 · inevitability of the linear object · JETBUNDLE</title>
  <meta name="robots" content="noindex,nofollow">
  <link rel="icon" href="data:,">
  <link rel="stylesheet" href="/styles.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" crossorigin="anonymous">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js" crossorigin="anonymous"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js" crossorigin="anonymous"></script>
  <script defer src="widgets.js"></script>
</head>
<body>
  <main class="doc">
    <nav class="subnav" aria-label="section">
      <a href="../index.html">book</a>
      <span class="subnav-sep" aria-hidden="true">·</span>
      <a href="/physics/">physics</a>
      <span class="subnav-sep" aria-hidden="true">·</span>
      <a href="/">../</a>
    </nav>

    <header class="doc-header">
      <h1>chapter 1 — the inevitability of the linear object</h1>
      <p class="doc-lead">lecture notes · part I · architecture of linearity &amp; geometric dynamics</p>
    </header>

    <hr class="doc-rule">

    <div class="doc-body">

      <section class="doc-section" id="s11">
        <h2>1.1 · why linearity is unavoidable</h2>
        <p>Any smooth natural process looks linear when examined in a sufficiently small neighborhood. A curve is
        approximately a straight line near any point. A surface is approximately a flat plane. In quantum mechanics,
        states combine by linear superposition: if $|\psi\rangle$ and $|\phi\rangle$ are possible states, then
        $a|\psi\rangle + b|\phi\rangle$ is also a possible state (with complex numbers $a$, $b$). This forces the
        mathematics to begin with linear spaces.</p>
        <p>We will develop the same object in three projections—computational (matrices), structural (morphisms), and
        geometric (tangent vectors)—and show they are inseparable.</p>
      </section>

      <section class="doc-section" id="s12">
        <h2>1.2 · linear spaces and bases (computational foundation)</h2>
        <p><strong>Definition.</strong> A linear (vector) space $V$ over a field $K$ (usually $\mathbb{R}$ or
        $\mathbb{C}$) is a set with two operations: addition $u+v\in V$ and scalar multiplication $\lambda u\in V$
        ($\lambda\in K$), satisfying the eight axioms (commutativity, associativity, zero vector, negatives,
        distributivity, etc.). These match physical superposition and scaling.</p>
        <p>A set of vectors $\{e_1,\ldots,e_n\}$ is a <strong>basis</strong> if: (1) they are linearly independent:
        $a_1 e_1+\cdots+a_n e_n=0$ implies all $a_i=0$; (2) they span $V$: every $v\in V$ can be written
        $v=x_1 e_1+\cdots+x_n e_n$. The numbers $(x_1,\ldots,x_n)$ are the <strong>components</strong> of $v$ in this
        basis. Different bases give different components, but the space itself is independent of choice.</p>

        <h3>problem 1 (core computational skill)</h3>
        <p>Solve the system $Ax=b$ and determine the dimension of the solution space. Let</p>
        $$A=\begin{pmatrix}1&2&3\\2&4&6\\3&6&9\end{pmatrix},\quad b=\begin{pmatrix}6\\12\\18\end{pmatrix}.$$
        <p><strong>Gaussian elimination.</strong> Augmented matrix:</p>
        $$\begin{pmatrix}1&2&3&6\\2&4&6&12\\3&6&9&18\end{pmatrix}$$
        <p>Row$_2\leftarrow$ Row$_2-2\cdot$Row$_1$ and Row$_3\leftarrow$ Row$_3-3\cdot$Row$_1$ give two zero rows.
        $\mathrm{rank}(A)=1$; the system is consistent. Free variables $x_2=s$, $x_3=t$; from the first row,
        $x_1+2s+3t=6$ hence $x_1=6-2s-3t$.</p>
        $$x=\begin{pmatrix}6\\0\\0\end{pmatrix}+s\begin{pmatrix}-2\\1\\0\end{pmatrix}+t\begin{pmatrix}-3\\0\\1\end{pmatrix}$$
        <p>The solution affine space has dimension $\mathrm{nullity}(A)=3-\mathrm{rank}(A)=2$.
        <strong>Rank + nullity = dimension of the ambient space</strong> (fundamental theorem). This holds in any basis.</p>
        <p><strong>Cramer's rule (when applicable).</strong> If $\det A\neq 0$ and $n$ equations, $x_i=\det(A_i)/\det(A)$
        where $A_i$ replaces column $i$ by $b$. Useful for small $n$ or theoretical insight.</p>

        <p class="dim" style="margin-top:1rem">Affine family in the $(x_1,x_2)$-projection of $\mathbb{R}^3$ (violet =
        one-parameter slice at fixed $t$; gold = your choice of $(s,t)$):</p>
        <div class="doc-widget" style="margin:0.75rem 0 0;border:1px solid #222;padding:0.75rem;">
          <canvas id="affine-canvas" width="520" height="220" style="display:block;width:100%;max-width:36rem;height:auto;"></canvas>
          <div style="margin-top:0.6rem;display:flex;flex-wrap:wrap;gap:1rem;font-size:0.9rem;color:var(--dim);">
            <label>$s$ <input type="range" id="affine-s" min="-2" max="3" step="0.02" value="0" style="width:12rem;accent-color:var(--link-hover);"></label>
            <label>$t$ <input type="range" id="affine-t" min="-2" max="3" step="0.02" value="0" style="width:12rem;accent-color:var(--link-hover);"></label>
          </div>
        </div>
      </section>

      <section class="doc-section" id="s13">
        <h2>1.3 · linear operators and matrices</h2>
        <p>A linear operator $T:V\to V$ satisfies $T(u+v)=T(u)+T(v)$ and $T(\lambda u)=\lambda T(u)$. Fix a basis
        $\{e_j\}$. Then $T(e_j)=\sum_i a_{ij} e_i$. The matrix $A=(a_{ij})$ represents $T$ in that basis.</p>

        <h3>problem 2 — basis transition</h3>
        <p>Let two bases be related by $e'_k=\sum_j c_{jk} e_j$. Let $C=(c_{jk})$ (columns are new basis vectors in old
        coordinates); $C$ is invertible. If $T$ has matrix $A$ in the old basis and $A'$ in the new basis, then</p>
        $$A' = C^{-1} A C.$$
        <p>This is the <strong>conjugation law</strong>. Eigenvalues, trace, determinant, and the characteristic polynomial
        are unchanged — true invariants of the operator.</p>
      </section>

      <section class="doc-section" id="s14">
        <h2>1.4 · dual space and evaluation pairing (structural view)</h2>
        <p><strong>Definition.</strong> The dual space $V^\ast$ is the set of all linear functionals $f:V\to K$. If
        $\{e_i\}$ is a basis of $V$, the <strong>dual basis</strong> $\{f^j\}$ satisfies $f^j(e_i)=\delta_i^j$.</p>
        <p>For $v=\sum x_i e_i$, we have $f(v)=\sum x_i f(e_i)$. The <strong>evaluation pairing</strong>
        $\langle f,v\rangle := f(v)$ is bilinear and non-degenerate. It is basis-independent and survives in quantum
        mechanics as $\langle\psi|\phi\rangle$ (probability amplitudes).</p>
        <p><strong>Structural abstraction.</strong> $T:V\to V$ induces $T^\ast:V^\ast\to V^\ast$ by
        $\langle T^\ast f,v\rangle=\langle f,Tv\rangle$. In dual bases, matrices of $T$ and $T^\ast$ are transposes.</p>
      </section>

      <section class="doc-section" id="s15">
        <h2>1.5 · geometric projection: tangent spaces and differentials</h2>
        <p>On a smooth manifold $M$, at each point $p$ we attach a <strong>tangent space</strong> $T_p M$ — the linear
        space approximating $M$ near $p$. A smooth map $F:M\to N$ has <strong>differential</strong> (pushforward)
        $dF_p:T_p M\to T_{F(p)}N$, the best linear approximation to $F$ at $p$.</p>

        <h3>problem 3 — Jacobian of a coordinate change on $\mathbb{R}^n$</h3>
        <p>Let old coordinates $x=(x^1,\ldots,x^n)$ and new coordinates $y=y(x)$. A tangent vector in old coordinates
        with components $(v^1,\ldots,v^n)$ represents $\sum_i v^i \partial/\partial x^i$. In new coordinates the same
        arrow has components</p>
        $$w^j = \sum_i \frac{\partial y^j}{\partial x^i}\, v^i.$$
        <p>Thus the Jacobian $J=(\partial y^j/\partial x^i)$ is the transition matrix. The differential $dF$ is
        represented by this Jacobian; under further coordinate changes it transforms compatibly with conjugation,
        preserving the linear character of the infinitesimal picture.</p>
      </section>

      <section class="doc-section" id="s16">
        <h2>1.6 · the full cycle — one object, three projections</h2>
        <ul class="toc-list" style="list-style:disc;">
          <li><strong>Computational:</strong> matrix $A$, components, Gaussian elimination.</li>
          <li><strong>Structural:</strong> morphism $T:V\to V$, dual pairing, functoriality under basis change.</li>
          <li><strong>Geometric:</strong> linear map $dF_p:T_p M\to T_q N$, tensorial transformation laws.</li>
        </ul>
        <p>Basis change shows the same reality in different coordinates: the matrix conjugates, the morphism is
        invariant, the differential is intrinsic when written tensorially.</p>

        <h3>summary table (invariant ledger for chapter 1)</h3>
        <table>
          <thead><tr><th>concept</th><th>computational</th><th>structural</th><th>geometric</th></tr></thead>
          <tbody>
            <tr><td>vector</td><td>column of numbers</td><td>element of $V$</td><td>tangent vector at $p$</td></tr>
            <tr><td>operator</td><td>matrix $A$</td><td>morphism $T:V\to V$</td><td>differential $dF_p$</td></tr>
            <tr><td>basis change</td><td>$A'=C^{-1}AC$</td><td>functorial bookkeeping</td><td>frame / Jacobian transport</td></tr>
            <tr><td>invariants</td><td>trace, det, eigenvalues</td><td>rank, spectrum</td><td>intrinsic operators on tensors</td></tr>
          </tbody>
        </table>

        <p class="dim" style="margin-top:1.25rem">Dissipative linear evolution on a periodic interval (bundled symplect
        IR: snapshots scrub time; same JSON as the jetbundle-yt fixture build):</p>
        <div class="doc-widget" style="margin:0.75rem 0 0;border:1px solid #222;padding:0.75rem;">
          <p id="heat-error" class="dim" style="margin:0 0 0.5rem;"></p>
          <canvas id="heat-canvas" width="640" height="240" style="display:block;width:100%;max-width:40rem;"></canvas>
          <div style="margin-top:0.5rem;display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;font-size:0.85rem;color:var(--dim);">
            <label>step <input type="range" id="heat-slider" min="0" max="12" value="12" style="width:14rem;accent-color:var(--link-hover);"></label>
            <span id="heat-meta"></span>
          </div>
        </div>
      </section>

      <section class="doc-section" id="problems">
        <h2>master problems for mastery (work in order)</h2>
        <ol>
          <li>Solve $Ax=b$ for a $4\times 4$ system of rank $2$; find nullity and the general solution.</li>
          <li>Given two bases related by $C$, compute the new matrix of a rotation operator; verify trace and $\det$ unchanged.</li>
          <li>Compute the Jacobian for polar $\leftrightarrow$ Cartesian coordinates; relate $|\det J|$ to the area element.</li>
          <li>Prove: $T$ invertible $\Leftrightarrow$ $\det A\neq 0$ in some (hence every) basis; relate $|\det|$ to volume scaling (foreshadow Chapter 2).</li>
        </ol>
        <p>This completes the foundational cycle. Every later concept (determinants, metrics, connections, curvature)
        will rotate through the same three projections. Linearity is the language; we now learn its grammar.</p>
      </section>

    </div>

    <footer class="doc-footer">
      <p>widgets: canvas + <code>heat-line.json</code> beside this file.</p>
    </footer>
  </main>
</body>
</html>
"""

def main() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(HTML, encoding="utf-8")
    print("wrote", OUT)


if __name__ == "__main__":
    main()
