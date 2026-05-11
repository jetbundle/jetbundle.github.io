# BOOK_BUILD_PROTOCOL — static KaTeX + jetbundle-yt + symplect

This document is the **reproducible contract** for extending *The Architecture of Linearity and Geometric Dynamics* on `jetbundle.github.io`. The former `physics/lab/` cluster was removed so the book route stays **isolated** under `physics/architecture-linearity/`.

---

## 1. narrative rules (enforced)

- **chapter anatomy:** open with an inevitability / motivation paragraph; then cycle **computational → structural → geometric → dynamical** as the outline prescribes; end with a **compressed ledger** (table or short dictionary).
- **master problems:** appear **only** in a final section at the bottom of each chapter HTML file — not as numbered “problem” callouts inside the expository flow. worked demonstrations may appear inline, but they must read as prose, not as a problem set.
- **fidelity:** when drafting from the master outline, keep the four projections explicit; cross-link forward to the chapter where a deferred tool (e.g. exterior algebra, connections) becomes central.

---

## 2. repository layout (canonical)

| path | role |
| --- | --- |
| `physics/architecture-linearity/index.html` | landing (book manifest + tone) |
| `physics/architecture-linearity/chapter-NN.html` | static KaTeX chapters |
| `physics/architecture-linearity/BOOK_BUILD_PROTOCOL.md` | this file |
| `physics/architecture-linearity/fixtures/jetbundle-yt/` | **published output** of `jetbundle-yt` (nested SvelteKit static build) |
| `physics/architecture-linearity/fixtures/symplect-canvas/` | vanilla canvas page that `fetch`es the same JSON the fixture uses |
| `jetbundle-yt/` (sibling repo) | source for interactive surfaces, symplect fixture generation scripts |

---

## 3. static HTML + KaTeX (spine)

**template contract**

1. `<link rel="stylesheet" href="/styles.css">` — site monospace + `:root` palette (`--bg`, `--fg`, `--link`, `--link-hover`, `--dim`).
2. KaTeX: `katex.min.css` + deferred `katex.min.js` + `contrib/auto-render.min.js` with the same delimiter block used in `physics/classical/index.html` (`$...$`, `$$...$$`, `\(...\)`, `\[...\]`).
3. wrap prose in `<main class="doc">` with `<header class="doc-header">`, `<article class="doc-body">`, `<footer class="doc-footer">`.
4. optional: reuse `.spine-map` tables from `styles.css` for invariant ledgers.

**reproducibility:** no build step for chapters — if it renders locally with `npx serve` or `python -m http.server`, it will render on GitHub Pages.

---

## 4. jetbundle-yt (interactive fixture)

**ideas to import**

- **deck-kit:** each “topic” is a directory under `apps/jetbundle-yt-web/src/decks/<slug>/` with `deck.config.ts` and `slides/*.svelte`.
- **widgets:** `Equation` (KaTeX strings), `PyodideCell`, `SymplectViewer`, `PlotShowcase`, `MathLikeAnim-rs` bridges — use these for high-density visuals instead of bespoke canvas per slide.
- **collab:** Yjs-backed session is optional (`npm run collab`); static publish path ignores websocket when offline.

**publish (nested base path)**

```bash
cd jetbundle-yt
bash scripts/publish_jetbundle_github_io.sh
```

defaults:

- `JBYT_BASE=/physics/architecture-linearity/fixtures/jetbundle-yt`
- copies build → `../jetbundle.github.io/physics/architecture-linearity/fixtures/jetbundle-yt/`

override only when mirroring to another consumer:

```bash
JBYT_BASE=/custom/base/path JETBUNDLE_IO=/path/to/io bash scripts/publish_jetbundle_github_io.sh
```

**GitHub Pages:** site root must contain `.nojekyll` so `_app/` is not stripped.

---

## 5. symplect (typed models + integrators + JSON)

**ideas to import**

- models are declared in symplect’s IR; **SAV**-type integrators preserve structure for showcase runs.
- `scripts/build_symplect_fixtures.py --slug <deck>` emits JSON into `apps/jetbundle-yt-web/static/decks/<slug>/`.
- the static site consumes the same file in two ways: **SymplectViewer** (inside Svelte) and **fixtures/symplect-canvas** (vanilla `fetch` + 2D draw).

**reproducibility checklist**

1. edit or add model / script in `symplect/` (consumer repo) as upstream dictates.
2. regenerate fixture JSON in `jetbundle-yt`.
3. `npm run build --workspace apps/jetbundle-yt-web` (or publish script) so `decks/<slug>/*.json` lands in the copied tree.
4. open `fixtures/symplect-canvas/index.html` — if the curve loads, the JSON path and CORS story are correct.

---

## 6. three-surface pattern (reference)

1. **spine** — KaTeX chapter (`chapter-NN.html`).
2. **fixture** — `fixtures/jetbundle-yt/deck/<slug>/index.html` (explicit `index.html` on Pages).
3. **canvas** — `fixtures/symplect-canvas/index.html` reading the same `sav-state.json` (or successor fixture).

cross-links in slides should use **absolute** paths rooted at `jetbundle.github.io` (e.g. `/physics/architecture-linearity/...`) so nested `base` inside Svelte does not break navigation to the static spine.

---

## 7. quality bar for visualizations

- **palette:** derive strokes and fills from `styles.css` `:root` tokens (see canvas reference implementation).
- **motion:** prefer `MathAnim` + small canvas scenes over heavy video; cap simultaneous WebGL contexts.
- **math:** keep TeX in `Equation` props as script-escaped strings (`\\` doubling rules in Svelte).
- **performance:** prerender static pages; lazy-load Pyodide only on slides that declare cells.

---

## 8. outline anchor (book spine)

**part I — architecture of linearity:** ch.1 linear object; ch.2 exterior algebra & Stokes; ch.3 metrics & signatures; ch.4 dynamics & spectra; ch.5 affine / projective / G-structures; ch.6 infinite dimensions; ch.7 synthesis.

**part II — geometric dynamics:** ch.8 bridge; ch.9 mechanics; ch.10 connections & gauge; ch.11 GR; ch.12 global topology; ch.13 synthesis.

each chapter in the outline lists **key problems**; on the site those become the **master problem** block at chapter end, optionally expanded into a dedicated “neo-theoretical minimum” appendix page later.

---

## 9. change log discipline

when adding a chapter or deck:

- bump any version badge in `jetbundle-yt` layout if palette tokens change.
- run `bash scripts/publish_jetbundle_github_io.sh` and commit both repos (`jetbundle-yt` source + `jetbundle.github.io` static tree).

---

*end of protocol — keep this file next to the landing page so editors always see it first.*
