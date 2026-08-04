/* Ch.1 basic mechanics — high-fidelity geometric figures. */
(function () {
  'use strict';
  var F = window.JBFig;
  if (!F) return;
  var C = F.C;

  /* —— central force: m=1, V=-1/r; Lz and E conservation audits —— */
  function wireCentral() {
    var el = document.getElementById('fig1-central-plot');
    if (!el) return;
    var ang = F.bindRange('fig1-central-angle', function () {});
    var spd = F.bindRange('fig1-central-speed', function () {});
    var playing = true;
    var state = null;
    var trail = { x: [], y: [] };
    var L0 = 0;
    var E0 = 0;
    var maxLzErr = 0;
    var maxEErr = 0;

    F.bindButton('fig1-central-play', function (btn) {
      playing = !playing;
      btn.textContent = playing ? 'pause' : 'play';
    });

    function energy(s) {
      var r = Math.hypot(s.x, s.y) || 1e-14;
      return 0.5 * (s.vx * s.vx + s.vy * s.vy) - 1 / r;
    }
    function Lz(s) {
      return s.x * s.vy - s.y * s.vx;
    }

    function reset() {
      var a = (((ang && ang.get()) || 90) * Math.PI) / 180;
      var s = (spd && spd.get()) || 0.9;
      state = { x: 1.4, y: 0, vx: s * Math.cos(a), vy: s * Math.sin(a) };
      trail = { x: [state.x], y: [state.y] };
      L0 = Lz(state);
      E0 = energy(state);
      maxLzErr = 0;
      maxEErr = 0;
    }

    /* symplectic-ish leapfrog for central force (velocity Verlet) */
    function step(dt) {
      var r = Math.hypot(state.x, state.y) || 1e-14;
      var ax = -state.x / (r * r * r);
      var ay = -state.y / (r * r * r);
      state.vx += 0.5 * dt * ax;
      state.vy += 0.5 * dt * ay;
      state.x += dt * state.vx;
      state.y += dt * state.vy;
      r = Math.hypot(state.x, state.y) || 1e-14;
      ax = -state.x / (r * r * r);
      ay = -state.y / (r * r * r);
      state.vx += 0.5 * dt * ax;
      state.vy += 0.5 * dt * ay;
      trail.x.push(state.x);
      trail.y.push(state.y);
      F.capTrail(trail.x, 480, 320);
      F.capTrail(trail.y, 480, 320);
      maxLzErr = Math.max(maxLzErr, Math.abs(Lz(state) - L0));
      maxEErr = Math.max(maxEErr, Math.abs(energy(state) - E0));
    }

    function draw() {
      if (!state) reset();
      if (playing) {
        for (var k = 0; k < 5; k++) step(0.01);
        if (Math.hypot(state.x, state.y) > 5 || Math.hypot(state.x, state.y) < 0.05) reset();
      }
      var p = F.plot(
        el,
        [
          F.line(trail.x, trail.y, {
            name: 'orbit',
            color: C.violet,
            width: 2,
            hovertemplate: 'q=(%{x:.3f},%{y:.3f})<extra>orbit</extra>'
          }),
          F.markers([0], [0], { name: 'force center', color: C.dim, size: 9, symbol: 'x' }),
          F.markers([state.x], [state.y], { name: 'particle', color: C.gold, size: 10 }),
          F.line([state.x, state.x + 0.4 * state.vx], [state.y, state.y + 0.4 * state.vy], {
            name: 'velocity',
            color: C.gold,
            width: 1.5,
            dash: 'dot',
            showlegend: true
          })
        ],
        {
          height: 400,
          showlegend: true,
          title: 'V = −1/r · unit mass · radial force (central)',
          xaxis: { title: 'q₁', range: [-2.6, 2.6], scaleanchor: 'y', scaleratio: 1 },
          yaxis: { title: 'q₂', range: [-2.6, 2.6] }
        }
      );
      F.setReadout(
        'fig1-central-readout',
        'L_z = ' +
          F.fmt(Lz(state), 6) +
          ' (L₀ = ' +
          F.fmt(L0, 6) +
          ') · max|ΔL_z| = ' +
          F.fmt(maxLzErr, 2) +
          ' · E = ' +
          F.fmt(energy(state), 5) +
          ' · max|ΔE| = ' +
          F.fmt(maxEErr, 2) +
          ' · torque q×F = 0 identically → planar motion'
      );
      return p;
    }

    if (ang) ang.el.addEventListener('input', reset);
    if (spd) spd.el.addEventListener('input', reset);
    reset();
    F.rafLoop(draw, 16, el);
  }

  /* —— effective potential + Kepler radial phase —— */
  function wireVeff() {
    var el = document.getElementById('fig1-veff-plot');
    if (!el) return;

    function draw() {
      var ell = parseFloat(document.getElementById('fig1-veff-ell').value, 10);
      var E = parseFloat(document.getElementById('fig1-veff-e').value, 10);
      var r = F.linspace(0.12, 4.5, 500);
      var veff = r.map(function (ri) {
        return -1 / ri + (ell * ell) / (2 * ri * ri);
      });
      var turns = [];
      for (var i = 1; i < r.length; i++) {
        if ((veff[i - 1] - E) * (veff[i] - E) <= 0) {
          var t = r[i - 1] + ((E - veff[i - 1]) / (veff[i] - veff[i - 1] || 1e-14)) * (r[i] - r[i - 1]);
          turns.push(t);
        }
      }
      var rmin = 0;
      for (i = 1; i < veff.length; i++) if (veff[i] < veff[rmin]) rmin = i;

      /* circular orbit energy / r_circ: V_eff' = 0 ⇒ 1/r² − ℓ²/r³ = 0 ⇒ r=ℓ² */
      var rCirc = ell * ell;
      var Ecirc = rCirc > 0.12 && rCirc < 4.5 ? -1 / rCirc + (ell * ell) / (2 * rCirc * rCirc) : NaN;

      /* eccentricity for unit mass, k=1: e = sqrt(1 + 2 E ℓ²) */
      var eK = Math.sqrt(Math.max(0, 1 + 2 * E * ell * ell));
      var bound = E < 0 && turns.length >= 2;

      var traces = [
        F.line(r, veff, {
          name: 'V_eff(r)',
          color: C.violet,
          width: 2.5,
          hovertemplate: 'r=%{x:.3f}<br>V_eff=%{y:.4f}<extra></extra>'
        }),
        F.line(r, r.map(function () { return E; }), { name: 'E', color: C.gold, width: 1.6, dash: 'dash' }),
        F.markers([r[rmin]], [veff[rmin]], { name: 'min V_eff', color: C.gold, size: 9 })
      ];
      if (isFinite(Ecirc) && rCirc < 4.5) {
        traces.push(F.markers([rCirc], [Ecirc], { name: 'circular', color: C.fg, size: 8, symbol: 'diamond' }));
      }
      turns.forEach(function (rt, k) {
        traces.push(
          F.markers([rt], [E], {
            name: k === 0 ? 'turning pts' : undefined,
            color: C.fg,
            size: 8,
            symbol: 'diamond',
            showlegend: k === 0
          })
        );
      });

      /* right panel: radial phase q=r, p=ṙ from energy */
      var qr = [];
      var pr = [];
      var ql = [];
      var pl = [];
      r.forEach(function (ri) {
        var kin = 2 * (E - (-1 / ri + (ell * ell) / (2 * ri * ri)));
        if (kin >= 0) {
          var p = Math.sqrt(kin);
          qr.push(ri);
          pr.push(p);
          ql.push(ri);
          pl.push(-p);
        } else {
          qr.push(null);
          pr.push(null);
          ql.push(null);
          pl.push(null);
        }
      });
      traces.push({
        type: 'scatter',
        mode: 'lines',
        x: qr.concat([null]).concat(ql),
        y: pr.concat([null]).concat(pl),
        name: 'radial phase',
        xaxis: 'x2',
        yaxis: 'y2',
        line: { color: C.gold, width: 2 }
      });

      F.plot(el, traces, {
        height: 400,
        showlegend: true,
        grid: { rows: 1, columns: 2, pattern: 'independent' },
        title: 'V_eff = −1/r + ℓ²/(2r²) · radial reduction of Kepler (k=m=1)',
        xaxis: { title: 'r', domain: [0, 0.46], range: [0, 4.5] },
        yaxis: { title: 'energy', range: [-1.8, 1.4] },
        xaxis2: { title: 'r', domain: [0.54, 1], range: [0, 4.5] },
        yaxis2: { title: 'ṙ', range: [-1.8, 1.8], anchor: 'x2' }
      });

      F.setReadout(
        'fig1-veff-readout',
        'ℓ = ' +
          F.fmt(ell, 3) +
          ' · E = ' +
          F.fmt(E, 3) +
          ' · e = √(1+2Eℓ²) = ' +
          F.fmt(eK, 4) +
          (bound
            ? ' · bound radial oscillation between r ∈ [' + F.fmt(turns[0], 3) + ', ' + F.fmt(turns[turns.length - 1], 3) + ']'
            : E >= 0
              ? ' · unbound (E ≥ 0)'
              : ' · E below well or single turning point') +
          (isFinite(Ecirc) ? ' · circular E_circ = ' + F.fmt(Ecirc, 4) + ' at r = ℓ²' : '')
      );
    }
    F.bindRange('fig1-veff-ell', draw);
    F.bindRange('fig1-veff-e', draw);
    draw();
  }

  /* —— Noether: isotropic HO, rotations → Lz —— */
  function wireNoether() {
    var el = document.getElementById('fig1-noether-plot');
    if (!el) return;
    var play = true;
    var t = 0;
    /* unit mass, ω=1: q(t) = (A cos t, B cos(t+φ)) */
    var A = 1.1;
    var B = 0.75;
    var phi = 0.6;
    F.bindButton('fig1-noether-play', function (btn) {
      play = !play;
      btn.textContent = play ? 'pause' : 'play';
    });

    function stateAt(tt) {
      var q1 = A * Math.cos(tt);
      var q2 = B * Math.cos(tt + phi);
      var p1 = -A * Math.sin(tt);
      var p2 = -B * Math.sin(tt + phi);
      return { q1: q1, q2: q2, p1: p1, p2: p2, L: q1 * p2 - q2 * p1 };
    }

    /* static: orbit and L_z history never change */
    var tt = F.linspace(0, 2 * Math.PI, 180);
    var ox = tt.map(function (u) {
      return A * Math.cos(u);
    });
    var oy = tt.map(function (u) {
      return B * Math.cos(u + phi);
    });
    var tScan = F.linspace(0, 4 * Math.PI, 120);
    var Lhist = tScan.map(function (u) {
      return stateAt(u).L;
    });
    var Lmean =
      Lhist.reduce(function (a, b) {
        return a + b;
      }, 0) / Lhist.length;
    var Lvar = Math.sqrt(
      Lhist.reduce(function (a, b) {
        return a + (b - Lmean) * (b - Lmean);
      }, 0) / Lhist.length
    );
    var Ltrace = F.line(tScan, Lhist, {
      name: 'I(t)=L_z',
      color: C.gold,
      width: 2,
      xaxis: 'x2',
      yaxis: 'y2'
    });
    var orbitTrace = F.line(ox, oy, { name: 'orbit in Q', color: C.violet, width: 2 });

    function draw() {
      if (play) t += 0.04;
      var deg = parseFloat((document.getElementById('fig1-noether-ang') || {}).value || 0, 10);
      var th = (deg * Math.PI) / 180;
      var c = Math.cos(th);
      var s = Math.sin(th);
      var st = stateAt(t);
      var L = st.L;

      var rx = new Array(ox.length);
      var ry = new Array(ox.length);
      for (var i = 0; i < ox.length; i++) {
        rx[i] = c * ox[i] - s * oy[i];
        ry[i] = s * ox[i] + c * oy[i];
      }

      var p = F.plot(
        el,
        [
          orbitTrace,
          F.line(rx, ry, { name: 'Φ_θ·orbit', color: C.softG, width: 1.5, dash: 'dot' }),
          F.markers([st.q1], [st.q2], { name: 'state', color: C.gold, size: 10 }),
          F.markers([c * st.q1 - s * st.q2], [s * st.q1 + c * st.q2], {
            name: 'rotated frame',
            color: C.fg,
            size: 8,
            symbol: 'diamond'
          }),
          Ltrace
        ],
        {
          height: 400,
          showlegend: true,
          grid: { rows: 1, columns: 2, pattern: 'independent' },
          title: 'L = ½(q̇₁²+q̇₂²) − ½(q₁²+q₂²) · SO(2) symmetry ⇒ I = q₁p₂ − q₂p₁',
          xaxis: { title: 'q₁', domain: [0, 0.46], range: [-1.5, 1.5], scaleanchor: 'y', scaleratio: 1 },
          yaxis: { title: 'q₂', range: [-1.5, 1.5] },
          xaxis2: { title: 't', domain: [0.54, 1] },
          yaxis2: { title: 'L_z', anchor: 'x2' }
        }
      );
      F.setReadout(
        'fig1-noether-readout',
        'Noether charge L_z = ' +
          F.fmt(L, 6) +
          ' · rms variation over 2 periods = ' +
          F.fmt(Lvar, 2) +
          ' (exact for linear HO) · frame angle θ = ' +
          deg.toFixed(0) +
          '° · I is first integral of EL'
      );
      return p;
    }
    F.bindRange('fig1-noether-ang', function () {});
    F.rafLoop(draw, 16, el);
  }

  /* —— free rigid body: Euler eqs + energy / |L| invariants —— */
  function wireRigid() {
    var el = document.getElementById('fig1-rigid-plot');
    if (!el) return;
    var play = true;
    var om = [0.8, 0.5, 0.3];
    var trail = { x: [], y: [], z: [] };
    var E0 = 0;
    var L20 = 0;
    var maxE = 0;
    var maxL = 0;

    F.bindButton('fig1-rigid-play', function (btn) {
      play = !play;
      btn.textContent = play ? 'pause' : 'play';
    });

    function I() {
      return [
        parseFloat(document.getElementById('fig1-rigid-i1').value, 10),
        parseFloat(document.getElementById('fig1-rigid-i2').value, 10),
        parseFloat(document.getElementById('fig1-rigid-i3').value, 10)
      ];
    }
    function Eof(w, II) {
      return 0.5 * (II[0] * w[0] * w[0] + II[1] * w[1] * w[1] + II[2] * w[2] * w[2]);
    }
    function L2of(w, II) {
      var L = [II[0] * w[0], II[1] * w[1], II[2] * w[2]];
      return L[0] * L[0] + L[1] * L[1] + L[2] * L[2];
    }

    function resetTrail() {
      trail = { x: [om[0]], y: [om[1]], z: [om[2]] };
      var II = I();
      E0 = Eof(om, II);
      L20 = L2of(om, II);
      maxE = 0;
      maxL = 0;
      el.__jbRigidSurf = null;
    }

    function fEul(t, w) {
      var II = I();
      /*  I ω̇ + ω × (I ω) = 0 */
      var L = [II[0] * w[0], II[1] * w[1], II[2] * w[2]];
      var cross = [
        w[1] * L[2] - w[2] * L[1],
        w[2] * L[0] - w[0] * L[2],
        w[0] * L[1] - w[1] * L[0]
      ];
      return [-cross[0] / II[0], -cross[1] / II[1], -cross[2] / II[2]];
    }

    function step(dt) {
      om = F.rk4step(fEul, 0, om, dt);
      trail.x.push(om[0]);
      trail.y.push(om[1]);
      trail.z.push(om[2]);
      F.capTrail(trail.x, 500, 320);
      F.capTrail(trail.y, 500, 320);
      F.capTrail(trail.z, 500, 320);
      var II = I();
      maxE = Math.max(maxE, Math.abs(Eof(om, II) - E0));
      maxL = Math.max(maxL, Math.abs(L2of(om, II) - L20));
    }

    /* energy ellipsoid mesh + |L| ellipsoid — build once per IC/inertia */
    function surfaces() {
      if (el.__jbRigidSurf) return el.__jbRigidSurf;
      var II = I();
      var E = E0 || Eof(om, II);
      var L2 = L20 || L2of(om, II);
      var u = F.linspace(0, 2 * Math.PI, 28);
      var v = F.linspace(0, Math.PI, 16);
      var Xe = [];
      var Ye = [];
      var Ze = [];
      var Xs = [];
      var Ys = [];
      var Zs = [];
      for (var i = 0; i < v.length; i++) {
        var xr = [];
        var yr = [];
        var zr = [];
        var xr2 = [];
        var yr2 = [];
        var zr2 = [];
        for (var j = 0; j < u.length; j++) {
          var a = Math.sqrt((2 * E) / II[0]) * Math.sin(v[i]) * Math.cos(u[j]);
          var b = Math.sqrt((2 * E) / II[1]) * Math.sin(v[i]) * Math.sin(u[j]);
          var c = Math.sqrt((2 * E) / II[2]) * Math.cos(v[i]);
          xr.push(a);
          yr.push(b);
          zr.push(c);
          xr2.push((Math.sqrt(L2) / II[0]) * Math.sin(v[i]) * Math.cos(u[j]));
          yr2.push((Math.sqrt(L2) / II[1]) * Math.sin(v[i]) * Math.sin(u[j]));
          zr2.push((Math.sqrt(L2) / II[2]) * Math.cos(v[i]));
        }
        Xe.push(xr);
        Ye.push(yr);
        Ze.push(zr);
        Xs.push(xr2);
        Ys.push(yr2);
        Zs.push(zr2);
      }
      el.__jbRigidSurf = {
        ellipsoid: {
          type: 'surface',
          x: Xe,
          y: Ye,
          z: Ze,
          opacity: 0.28,
          colorscale: [
            [0, C.violet],
            [1, C.violet]
          ],
          showscale: false,
          name: 'energy ellipsoid',
          hoverinfo: 'skip'
        },
        Lell: {
          type: 'surface',
          x: Xs,
          y: Ys,
          z: Zs,
          opacity: 0.18,
          colorscale: [
            [0, C.gold],
            [1, C.gold]
          ],
          showscale: false,
          name: '|L| ellipsoid',
          hoverinfo: 'skip'
        }
      };
      return el.__jbRigidSurf;
    }

    function draw() {
      if (play) {
        for (var k = 0; k < 3; k++) step(0.025);
      }
      var surf = surfaces();
      var II = I();

      var p = F.plot(
        el,
        [
          surf.ellipsoid,
          surf.Lell,
          {
            type: 'scatter3d',
            mode: 'lines',
            x: trail.x,
            y: trail.y,
            z: trail.z,
            line: { color: C.gold, width: 5 },
            name: 'polhode Ω(t)'
          },
          {
            type: 'scatter3d',
            mode: 'markers',
            x: [om[0]],
            y: [om[1]],
            z: [om[2]],
            marker: { color: C.fg, size: 4 },
            name: 'Ω'
          }
        ],
        {
          height: 440,
          showlegend: true,
          title: 'Euler: IΩ̇ + Ω×(IΩ)=0 · polhode = energy ∩ |L| ellipsoids',
          scene: {
            xTitle: 'Ω₁',
            yTitle: 'Ω₂',
            zTitle: 'Ω₃',
            aspectmode: 'data'
          },
          margin: { l: 0, r: 0, t: 40, b: 0 }
        }
      );
      F.setReadout(
        'fig1-rigid-readout',
        'E = ' +
          F.fmt(Eof(om, II), 5) +
          ' · |L|² = ' +
          F.fmt(L2of(om, II), 5) +
          ' · max|ΔE| = ' +
          F.fmt(maxE, 2) +
          ' · max|Δ|L|²| = ' +
          F.fmt(maxL, 2) +
          ' · Poinsot construction: body frame Ω rides the intersection'
      );
      return p;
    }

    ['fig1-rigid-i1', 'fig1-rigid-i2', 'fig1-rigid-i3'].forEach(function (id) {
      var node = document.getElementById(id);
      if (node)
        node.addEventListener('input', function () {
          resetTrail();
        });
    });
    resetTrail();
    F.rafLoop(draw, 16, el);
  }

  F.onReady(function () {
    wireCentral();
    wireVeff();
    wireNoether();
    wireRigid();
  });
})();
