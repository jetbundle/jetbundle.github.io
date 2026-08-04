/* Ch.2 ODEs — phase geometry, linear taxonomy, energy, Picard. */
(function () {
  'use strict';
  var F = window.JBFig;
  if (!F) return;
  var C = F.C;

  function matrixFor(type) {
    /* return {A, label, f} */
    if (type === 'sink')
      return {
        A: [
          [-1.2, 0.25],
          [0.15, -0.8]
        ],
        label: 'stable node'
      };
    if (type === 'source')
      return {
        A: [
          [0.7, 0.1],
          [0.05, 0.9]
        ],
        label: 'unstable node'
      };
    if (type === 'center')
      return {
        A: [
          [0, -1],
          [1, 0]
        ],
        label: 'center'
      };
    if (type === 'spiral')
      return {
        A: [
          [-0.3, -1],
          [1, -0.3]
        ],
        label: 'spiral sink'
      };
    return {
      A: [
        [1, 0.2],
        [0.3, -0.8]
      ],
      label: 'saddle'
    };
  }

  function trDet(A) {
    var tr = A[0][0] + A[1][1];
    var det = A[0][0] * A[1][1] - A[0][1] * A[1][0];
    return { tr: tr, det: det, disc: tr * tr - 4 * det };
  }

  function wireLinear() {
    var el = document.getElementById('fig2-linear-plot');
    if (!el) return;

    function draw() {
      var type = (document.getElementById('fig2-linear-type') || {}).value || 'saddle';
      var M = matrixFor(type);
      var A = M.A;
      var td = trDet(A);
      var f = function (x, y) {
        return [A[0][0] * x + A[0][1] * y, A[1][0] * x + A[1][1] * y];
      };
      var traces = [F.quiver(f, [-2.2, 2.2], [-2.2, 2.2], 12, 12, { name: 'Ax field', scale: 0.18 })];
      var seeds = [
        [1.4, 0.2],
        [-1.2, 0.6],
        [0.3, -1.4],
        [-0.7, -0.5],
        [0.8, -0.9],
        [-0.4, 1.2]
      ];
      seeds.forEach(function (s, i) {
        var fwd = F.integrate2d(f, s[0], s[1], 4.5, { atol: 1e-8, rtol: 1e-7, recordEvery: 2, hMax: 0.08 });
        var bwd = F.integrate2d(
          function (x, y) {
            var v = f(x, y);
            return [-v[0], -v[1]];
          },
          s[0],
          s[1],
          4.5,
          { atol: 1e-8, rtol: 1e-7, recordEvery: 2, hMax: 0.08 }
        );
        var xs = bwd.x
          .slice()
          .reverse()
          .concat(fwd.x.slice(1));
        var ys = bwd.y
          .slice()
          .reverse()
          .concat(fwd.y.slice(1));
        /* clip large */
        var cx = [];
        var cy = [];
        for (var k = 0; k < xs.length; k++) {
          if (Math.abs(xs[k]) < 2.5 && Math.abs(ys[k]) < 2.5) {
            cx.push(xs[k]);
            cy.push(ys[k]);
          } else {
            cx.push(null);
            cy.push(null);
          }
        }
        traces.push(
          F.line(cx, cy, {
            color: i % 2 ? C.gold : C.violet,
            width: 1.8,
            name: i === 0 ? 'orbits' : undefined,
            showlegend: i === 0
          })
        );
      });
      traces.push(F.markers([0], [0], { color: C.fg, size: 9, name: '0' }));

      /* (tr,det) classification inset via secondary axes */
      var trs = F.linspace(-3, 3, 80);
      var parabola = trs.map(function (t) {
        return (t * t) / 4;
      });
      traces.push({
        type: 'scatter',
        mode: 'lines',
        x: trs,
        y: parabola,
        name: 'Δ=0',
        xaxis: 'x2',
        yaxis: 'y2',
        line: { color: C.dim, width: 1, dash: 'dot' }
      });
      traces.push({
        type: 'scatter',
        mode: 'lines',
        x: [-3, 3],
        y: [0, 0],
        xaxis: 'x2',
        yaxis: 'y2',
        line: { color: C.axis, width: 1 },
        showlegend: false,
        hoverinfo: 'skip'
      });
      traces.push({
        type: 'scatter',
        mode: 'lines',
        x: [0, 0],
        y: [-2, 3],
        xaxis: 'x2',
        yaxis: 'y2',
        line: { color: C.axis, width: 1 },
        showlegend: false,
        hoverinfo: 'skip'
      });
      traces.push({
        type: 'scatter',
        mode: 'markers',
        x: [td.tr],
        y: [td.det],
        xaxis: 'x2',
        yaxis: 'y2',
        marker: { color: C.gold, size: 11 },
        name: '(tr, det)'
      });

      F.plot(el, traces, {
        height: 420,
        showlegend: true,
        grid: { rows: 1, columns: 2, pattern: 'independent' },
        title: 'ẋ = A x · type = ' + M.label,
        xaxis: { title: 'x', domain: [0, 0.58], range: [-2.3, 2.3], scaleanchor: 'y', scaleratio: 1 },
        yaxis: { title: 'y', range: [-2.3, 2.3] },
        xaxis2: { title: 'tr A', domain: [0.66, 1], range: [-3, 3] },
        yaxis2: { title: 'det A', range: [-2, 3], anchor: 'x2' }
      });
      F.setReadout(
        'fig2-linear-readout',
        'tr A = ' +
          F.fmt(td.tr, 3) +
          ' · det A = ' +
          F.fmt(td.det, 3) +
          ' · Δ = tr²−4det = ' +
          F.fmt(td.disc, 3) +
          ' · orbits = integral curves of RK45 · hyperbolic ⇔ det≠0 and no pure imaginary spectrum'
      );
    }
    F.bindSelect('fig2-linear-type', draw);
    draw();
  }

  function wireEnergy() {
    var el = document.getElementById('fig2-energy-plot');
    if (!el) return;

    function V(q) {
      return 0.25 * q * q * q * q - 0.5 * q * q;
    }
    function dV(q) {
      return q * q * q - q;
    }

    function draw() {
      var E = parseFloat((document.getElementById('fig2-energy-e') || {}).value || -0.1, 10);
      var q = F.linspace(-2.3, 2.3, 500);
      var Vq = q.map(V);
      var traces = [
        F.line(q, Vq, { name: 'V(q)=¼q⁴−½q²', color: C.violet, width: 2.5 }),
        F.line(
          q,
          q.map(function () {
            return E;
          }),
          { name: 'E', color: C.gold, width: 1.5, dash: 'dash' }
        ),
        F.markers([-1, 1, 0], [V(-1), V(1), V(0)], {
          name: 'crit. pts',
          color: [C.gold, C.gold, C.violet],
          size: 9
        })
      ];

      var f = function (x, y) {
        return [y, -dV(x)];
      };
      /* phase curves at energy E: seed turning points */
      var seeds = [];
      for (var i = 1; i < q.length; i++) {
        if ((Vq[i - 1] - E) * (Vq[i] - E) <= 0) {
          var qt = q[i - 1] + ((E - Vq[i - 1]) / (Vq[i] - Vq[i - 1] || 1e-14)) * (q[i] - q[i - 1]);
          seeds.push([qt, 0.0]);
        }
      }
      if (!seeds.length && E > V(-1)) {
        seeds.push([0, Math.sqrt(Math.max(0, 2 * (E - V(0))))]);
      }
      seeds.slice(0, 4).forEach(function (s, idx) {
        var kin0 = 2 * (E - V(s[0]));
        if (kin0 < 0) return;
        var p0 = Math.sqrt(kin0);
        [[s[0], p0], [s[0], -p0]].forEach(function (st, j) {
          var trj = F.integrate2d(f, st[0], st[1], 12, {
            atol: 1e-9,
            rtol: 1e-8,
            hMax: 0.05,
            recordEvery: 2,
            maxSteps: 40000
          });
          /* energy residual */
          var Hmax = 0;
          for (var k = 0; k < trj.x.length; k += 5) {
            var Hk = 0.5 * trj.y[k] * trj.y[k] + V(trj.x[k]);
            Hmax = Math.max(Hmax, Math.abs(Hk - E));
          }
          traces.push(
            F.line(trj.x, trj.y, {
              color: C.gold,
              width: 2,
              name: idx === 0 && j === 0 ? 'H=E (max|ΔH|=' + F.fmt(Hmax, 2) + ')' : undefined,
              showlegend: idx === 0 && j === 0,
              xaxis: 'x2',
              yaxis: 'y2'
            })
          );
        });
      });
      traces.push({
        type: 'scatter',
        mode: 'markers',
        x: [-1, 1, 0],
        y: [0, 0, 0],
        xaxis: 'x2',
        yaxis: 'y2',
        marker: { color: [C.gold, C.gold, C.violet], size: 9 },
        name: 'eq',
        showlegend: false
      });

      F.plot(el, traces, {
        height: 420,
        showlegend: true,
        grid: { rows: 1, columns: 2, pattern: 'independent' },
        title: '1DOF conservative · H = p²/2 + V(q) · E first integral',
        xaxis: { title: 'q', domain: [0, 0.46] },
        yaxis: { title: 'V, E', range: [-0.45, 1.2] },
        xaxis2: { title: 'q', domain: [0.54, 1], range: [-2.3, 2.3], scaleanchor: 'y2', scaleratio: 1 },
        yaxis2: { title: 'p', range: [-1.8, 1.8], anchor: 'x2' }
      });
      var regime =
        E < -0.25
          ? 'E below wells: no real motion'
          : E < 0
            ? 'two wells separated (bounded in each basin)'
            : E === 0
              ? 'separatrix figure-eight (homoclinic to saddle)'
              : 'single connected unbounded/large well region';
      F.setReadout(
        'fig2-energy-readout',
        'E = ' +
          F.fmt(E, 3) +
          ' · V(±1)=−1/4 wells · V(0)=0 saddle · ' +
          regime +
          ' · phase curves = H⁻¹(E) via adaptive integration'
      );
    }
    F.bindRange('fig2-energy-e', draw);
    draw();
  }

  function wirePicard() {
    var el = document.getElementById('fig2-picard-plot');
    if (!el) return;

    function draw() {
      var n = parseInt((document.getElementById('fig2-picard-n') || {}).value || 5, 10);
      var t = F.linspace(0, 2.5, 320);
      var trueSol = t.map(function (x) {
        return Math.exp(-x);
      });
      /* Picard for ẋ=-x, x(0)=1: x_{k+1}(t)=1+∫_0^t −x_k */
      var xk = t.map(function () {
        return 1;
      });
      var iterates = [xk.slice()];
      for (var k = 0; k < n; k++) {
        var next = new Array(t.length);
        next[0] = 1;
        var acc = 0;
        for (var i = 1; i < t.length; i++) {
          acc += 0.5 * (t[i] - t[i - 1]) * (-xk[i] - xk[i - 1]);
          next[i] = 1 + acc;
        }
        xk = next;
        iterates.push(xk.slice());
      }
      var traces = [F.line(t, trueSol, { name: 'exact e^{−t}', color: C.fg, width: 2.6, dash: 'dot' })];
      var palette = [C.dim, C.softV, C.muteV || C.softV, C.violet, C.gold, C.gold, C.gold, C.gold, C.gold];
      iterates.forEach(function (it, i) {
        traces.push(
          F.line(t, it, {
            name: 'x^{(' + i + ')}',
            color: palette[Math.min(i, palette.length - 1)],
            width: i === iterates.length - 1 ? 2.4 : 1.4
          })
        );
      });
      /* L∞ error vs n */
      var ns = [];
      var errs = [];
      var xx = t.map(function () {
        return 1;
      });
      for (var m = 0; m <= Math.max(n, 8); m++) {
        var emax = 0;
        for (var j = 0; j < t.length; j++) emax = Math.max(emax, Math.abs(xx[j] - trueSol[j]));
        ns.push(m);
        errs.push(emax);
        if (m === n) break;
        if (m < Math.max(n, 8) && m < n) {
          /* already built */
        }
        var nxt = [1];
        var ac = 0;
        for (j = 1; j < t.length; j++) {
          ac += 0.5 * (t[j] - t[j - 1]) * (-xx[j] - xx[j - 1]);
          nxt.push(1 + ac);
        }
        xx = nxt;
      }
      /* recompute full error curve cleanly */
      xx = t.map(function () {
        return 1;
      });
      ns = [];
      errs = [];
      for (m = 0; m <= 10; m++) {
        emax = 0;
        for (j = 0; j < t.length; j++) emax = Math.max(emax, Math.abs(xx[j] - trueSol[j]));
        ns.push(m);
        errs.push(emax + 1e-16);
        var nx2 = [1];
        ac = 0;
        for (j = 1; j < t.length; j++) {
          ac += 0.5 * (t[j] - t[j - 1]) * (-xx[j] - xx[j - 1]);
          nx2.push(1 + ac);
        }
        xx = nx2;
      }
      traces.push({
        type: 'scatter',
        mode: 'lines+markers',
        x: ns,
        y: errs,
        name: '||x^{(m)}−e^{−t}||_∞',
        xaxis: 'x2',
        yaxis: 'y2',
        line: { color: C.gold, width: 2 },
        marker: { size: 7, color: C.gold }
      });

      F.plot(el, traces, {
        height: 400,
        showlegend: true,
        grid: { rows: 1, columns: 2, pattern: 'independent' },
        title: 'Picard map for ẋ=−x, x(0)=1 · contraction ⇒ uniqueness',
        xaxis: { title: 't', domain: [0, 0.52] },
        yaxis: { title: 'x', range: [-0.05, 1.15] },
        xaxis2: { title: 'iterate m', domain: [0.62, 1], range: [-0.2, 10.2] },
        yaxis2: { title: 'L∞ error', type: 'log', anchor: 'x2' }
      });
      var errN = errs[Math.min(n, errs.length - 1)];
      F.setReadout(
        'fig2-picard-readout',
        'n = ' +
          n +
          ' · ||x^{(n)} − e^{−t}||_∞ ≈ ' +
          errN.toExponential(2) +
          ' · each step is Banach contraction on C([0,T]) for T small · geometric convergence'
      );
    }
    F.bindRange('fig2-picard-n', draw);
    draw();
  }

  F.onReady(function () {
    wireLinear();
    wireEnergy();
    wirePicard();
  });
})();
