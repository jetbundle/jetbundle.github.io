# physics / lab — isolated deploy tests

Pages under `physics/lab/` are **not linked** from `physics/index.html` or other public nav by design. They form their own link graph for drafts.

| URL | role |
| --- | --- |
| [`/physics/lab/`](https://jetbundle.github.io/physics/lab/) | small hub listing clusters |
| [`/physics/lab/emergent-invariance/`](https://jetbundle.github.io/physics/lab/emergent-invariance/) | static KaTeX chapter spine |
| [`/physics/lab/jetbundle-yt/`](https://jetbundle.github.io/physics/lab/jetbundle-yt/) | **jetbundle-yt** SvelteKit build (`JBYT_BASE=/physics/lab/jetbundle-yt`; sync via `jetbundle-yt/scripts/publish_jetbundle_github_io.sh`) |
| [`/physics/lab/symplect-canvas/`](https://jetbundle.github.io/physics/lab/symplect-canvas/) | vanilla canvas over the same symplect JSON fixture (parity / “did fetch break?”) |

**GitHub Pages:** the repo root has **`.nojekyll`** so Jekyll does not strip the SvelteKit **`_app/`** directory (without it, jetbundle-yt loads HTML then every JS asset 404s → white screen).
