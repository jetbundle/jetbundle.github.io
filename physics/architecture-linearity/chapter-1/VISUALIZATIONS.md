# Chapter 1 canvas figures — how they are built

This document is the recipe for the static figures on the chapter page. Everything runs in **`widgets.js`** (vanilla ES5-style for broad compatibility): no bundler, no WebGL — only **`canvas.getContext('2d')`** and `<input type="range">` sliders.

## Design constraints (for impact)

1. **Palette** — Use the same tokens as [`/styles.css`](https://jetbundle.github.io/styles.css) on the main site so the chapter does not look like a different product:
   - background `#000`, axes/grid `#222`
   - accent curves `#ae93ec` (violet, maps to `--link`)
   - highlight / second accent `#e7b597` (gold, maps to `--link-hover`)
   - annotation text `#6a6a6a` (`--dim`), body math inherits `.doc` KaTeX colors.

2. **HiDPI** — For panels that resize with the window, use `devicePixelRatio`: set `canvas.width = cssW * dpr`, `canvas.height = cssH * dpr`, then `ctx.setTransform(dpr,0,0,dpr,0,0)` and draw in CSS pixel space. Lines stay sharp when the layout is wide.

3. **Pedagogy first** — Each figure answers one question only: span area, affine slice, image of linear map, value of a functional, polar area element. Short captions in the HTML; numeric readouts in the canvas footer.

4. **One file** — All wiring lives in `widgets.js`. On `DOMContentLoaded`, each `wire*()` binds sliders and calls `draw()`. KaTeX `renderMathInElement` runs once at the end so `$$` / `$` in the static HTML still render.

## Figure inventory

### 1. Basis span (`basis-canvas`)

- **Math:** Parallelogram spanned by vectors $u=(u_1,u_2)$ and $v=(v_1,v_2)$ from the origin. Area $= |u_1 v_2 - u_2 v_1|$.
- **Draw order:** Fill semi-transparent parallelogram, stroke outline in violet, draw arrows for $u$ (gold) and $v$ (violet) with small triangular heads.
- **Coordinates:** Origin at canvas center; $y$ axis up (`screenY = cy - y * scale`).

### 2. Affine row projection (`affine-canvas`)

- **Math:** Rank-one $Ax=b$ family from the text: $x_1 = 6-2s-3t$, $x_2=s$ with parameters $s,t$; plot $(x_1,x_2)$ when $s$ runs (violet), mark the point for the current $(s,t)$ in gold.
- **Draw order:** Axes, then thick polyline for the $s$-trajectory at fixed $t$, then gold dot + status string.

### 3. Linear map on $\mathbb{R}^2$ (`map2d-canvas`)

- **Math:** Matrix $M=\begin{pmatrix}a_{11}&a_{12}\\a_{21}&a_{22}\end{pmatrix}$. Draw the image of the Cartesian integer grid (faint) and the same grid under $M$ (violet). Unit circle → ellipse (gold stroke). Footer: $\det M$ and $\mathrm{tr}(M)$.
- **Implementation:** `mul(M,x,y)` for column vectors. Grid: for each integer $k$, map line segments $(t,k)$ and $(k,t)$ through $M$. Circle: sample $t\in[0,2\pi]$.

### 4. Linear functional (`fun-canvas`)

- **Math:** $\ell(x)=a x_1 + b x_2$. Zero set is the line through the origin perpendicular to $(a,b)$; parametrize as $t(-b,a)$. The level set through $x$ is the parallel line offset by vector $(a,b)\,\ell(x)/\| (a,b)\|^2$.
- **Draw:** Dashed $\ell=0$, paler dashed parallel for current $\ell(x)$, violet arrow along $(a,b)$, gold point at $(x_1,x_2)$, `#fun-value` shows the numeric $\ell(x)$.

### 5. Polar Jacobian patch (`polar-canvas`)

- **Math:** Map corners $(r,\theta)$, $(r+\Delta r,\theta)$, $(r+\Delta r,\theta+\Delta\theta)$, $(r,\theta+\Delta\theta)$ with $x=r\cos\theta$, $y=r\sin\theta$. Compare polygon area (shoelace) to $r\,\Delta r\,\Delta\theta$.
- **Draw:** Faint polar circles for context; fill and stroke the curved quadrilateral in gold tones; print both areas and their ratio in `#polar-area`.

## Authoring workflow

1. Edit prose and figure **placeholders** in **`scripts/gen_architecture_chapter1.py`** (the `HTML` string) so structure stays reviewable in git.
2. Implement or extend drawing logic in **`physics/architecture-linearity/chapter-1/widgets.js`** (`wireYourFigure()` + `boot()`).
3. Run **`python3 scripts/gen_architecture_chapter1.py`** from the `jetbundle.github.io` repo root to refresh `chapter-1/index.html`.
4. **`bash scripts/publish_jetbundle_github_io.sh`** in **jetbundle-yt** only regenerates that HTML (and no longer ships symplect JSON for this chapter).

## Reuse checklist for later chapters

- [ ] One clear question per canvas  
- [ ] Match `/styles.css` colors  
- [ ] Range sliders with step sizes that feel smooth (0.02 for floats)  
- [ ] Readout line at bottom (`11px` monospace)  
- [ ] Document new panels at the bottom of this file  
