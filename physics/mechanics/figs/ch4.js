/* Ch.4 algebraic methods — Jordan exp, Fredholm geometry, Newton basins. */
(function () {
  'use strict';
  var F = window.JBFig;
  if (!F) return;
  var C = F.C;

  function matExp(A, t) {
    var n = 14;
    var B = [
      [A[0][0] * t, A[0][1] * t],
      [A[1][0] * t, A[1][1] * t]
    ];
    var R = [
      [1, 0],
      [0, 1]
    ];
    var P = [
      [1, 0],
      [0, 1]
    ];
    for (var k = 1; k <= n; k++) {
      P = [
        [(P[0][0] * B[0][0] + P[0][1] * B[1][0]) / k, (P[0][0] * B[0][1] + P[0][1] * B[1][1]) / k],
        [(P[1][0] * B[0][0] + P[1][1] * B[1][0]) / k, (P[1][0] * B[0][1] + P[1][1] * B[1][1]) / k]
      ];
      R = [
        [R[0][0] + P[0][0], R[0][1] + P[0][1]],
        [R[1][0] + P[1][0], R[1][1] + P[1][1]]
      ];
    }
    return R;
  }

  function mul(A, v) {
    return [A[0][0] * v[0] + A[0][1] * v[1], A[1][0] * v[0] + A[1][1] * v[1]];
  }

  function wireJordan() {
    var el = document.getElementById('fig4-jordan-plot');
    if (!el) return;
    var play = true;
    F.bindButton('fig4-jordan-play', function (btn) {
      play = !play;
      btn.textContent = play ? 'pause' : 'play';
    });
    var basis = [
      [1.15, 0.15],
      [0.25, 1.05],
      [-1.0, 0.75],
      [0.65, -0.95]
    ];
    var unitAng = F.linspace(0, 2 * Math.PI, 72);
    var circ0x = unitAng.map(function (u) {
      return Math.cos(u);
    });
    var circ0y = unitAng.map(function (u) {
      return Math.sin(u);
    });
    var unitCircle = F.line(circ0x, circ0y, {
      name: 'unit circle',
      color: C.dim,
      width: 1.2,
      dash: 'dot'
    });

    function Aof(type) {
      if (type === 'diag')
        return {
          A: [
            [-0.55, 0],
            [0, -1.15]
          ],
          note: 'diagonalizable · two independent eigendirections decay at rates λ₁,λ₂'
        };
      if (type === 'nilp')
        return {
          A: [
            [0, 1],
            [0, 0]
          ],
          note: 'nilpotent Jordan block · e^{tN}=I+tN · linear-in-t shear, no pure exponential decay'
        };
      return {
        A: [
          [-0.35, 1],
          [0, -0.35]
        ],
        note: 'defective / shear · repeated eigenvalue with a length-2 Jordan chain'
      };
    }

    function orbitThrough(A, v0, tMax, n) {
      var xs = new Array(n);
      var ys = new Array(n);
      for (var i = 0; i < n; i++) {
        var s = (tMax * i) / Math.max(1, n - 1);
        var w = mul(matExp(A, s), v0);
        xs[i] = w[0];
        ys[i] = w[1];
      }
      return { x: xs, y: ys };
    }

    function draw() {
      var tEl = document.getElementById('fig4-jordan-t');
      if (play && tEl) {
        var tv = parseFloat(tEl.value, 10) + 0.018;
        if (tv > 4) tv = 0;
        tEl.value = String(tv);
      }
      var type = (document.getElementById('fig4-jordan-type') || {}).value || 'shear';
      var t = parseFloat((tEl || {}).value || 1, 10);
      var pack = Aof(type);
      var A = pack.A;
      var eAt = matExp(A, t);
      var f = function (x, y) {
        return [A[0][0] * x + A[0][1] * y, A[1][0] * x + A[1][1] * y];
      };

      if (!el.__jbJordanField || el.__jbJordanType !== type) {
        el.__jbJordanType = type;
        el.__jbJordanField = F.quiver(f, [-2.1, 2.1], [-2.1, 2.1], 9, 9, {
          color: C.softV,
          scale: 0.15,
          name: 'Ax'
        });
      }

      /* fixed trace count for restyle: always two e-lines (second hidden for shear/nilp) */
      var e1 = F.line([-2, 2], [0, 0], {
        name: type === 'diag' ? 'E_{λ₁}' : 'ker / eigendirection',
        color: C.violet,
        width: 1.5,
        dash: 'dash'
      });
      var e2 =
        type === 'diag'
          ? F.line([0, 0], [-2, 2], { name: 'E_{λ₂}', color: C.softG, width: 1.5, dash: 'dash' })
          : F.line([0], [0], { name: 'E_{λ₂}', color: C.softG, width: 1.5, dash: 'dash', showlegend: false });

      var circTx = new Array(circ0x.length);
      var circTy = new Array(circ0x.length);
      for (var i = 0; i < circ0x.length; i++) {
        var w = mul(eAt, [circ0x[i], circ0y[i]]);
        circTx[i] = w[0];
        circTy[i] = w[1];
      }

      var traces = [
        el.__jbJordanField,
        unitCircle,
        F.line(circTx, circTy, {
          name: 'e^{tA}(circle)',
          color: C.gold,
          width: 2.4,
          fill: 'toself',
          fillcolor: 'rgba(231,181,151,0.08)'
        }),
        e1,
        e2
      ];

      for (i = 0; i < basis.length; i++) {
        var trj = orbitThrough(A, basis[i], Math.max(t, 0.05), 36);
        traces.push(
          F.line(trj.x, trj.y, {
            color: i % 2 ? C.gold : C.violet,
            width: 1.7,
            name: i === 0 ? 'orbits of Ax' : undefined,
            showlegend: i === 0
          })
        );
        var w2 = mul(eAt, basis[i]);
        traces.push(F.markers([basis[i][0]], [basis[i][1]], { color: C.dim, size: 6, showlegend: false }));
        traces.push(F.markers([w2[0]], [w2[1]], { color: C.gold, size: 7, showlegend: false }));
        traces.push(
          F.line([basis[i][0], w2[0]], [basis[i][1], w2[1]], {
            color: C.softG,
            width: 1,
            dash: 'dot',
            showlegend: false
          })
        );
      }

      var det = eAt[0][0] * eAt[1][1] - eAt[0][1] * eAt[1][0];
      var trA = A[0][0] + A[1][1];
      var detTheory = Math.exp(t * trA);

      var p = F.plot(el, traces, {
        height: 420,
        showlegend: true,
        title: 'exp(tA) as a linear diffeomorphism',
        xaxis: { title: 'x', range: [-2.2, 2.2], scaleanchor: 'y', scaleratio: 1 },
        yaxis: { title: 'y', range: [-2.2, 2.2] }
      });
      F.setReadout(
        'fig4-jordan-readout',
        't=' +
          F.fmt(t, 2) +
          ' · ' +
          type +
          ' · ' +
          pack.note +
          ' · det e^{tA} = e^{t tr A} = ' +
          F.fmt(detTheory, 5) +
          ' (comp. ' +
          F.fmt(det, 5) +
          ') · unit circle → parallelogram image shows volume scaling |det|'
      );
      return p;
    }
    F.bindSelect('fig4-jordan-type', function () {
      el.__jbJordanField = null;
      draw();
    });
    F.bindRange('fig4-jordan-t', draw);
    F.rafLoop(draw, 16, el);
  }

  function wireFredholm() {
    var el = document.getElementById('fig4-fred-plot');
    if (!el) return;
    /* rank-1 A projects to e1: A = [[1, 0.3],[0, 0]] slightly tilted im */
    var A = [
      [1, 0.35],
      [0, 0]
    ];
    /* A* = [[1,0],[0.35,0]] · ker A* = span{(0,1)} still for this A? A* w =0 ⇒ w1 +0=0 so w1=0; second row 0.35*w1=0. so ker A*=span e2 */
    /* im A = span{(1,0)} still */

    function draw() {
      var b1 = parseFloat(document.getElementById('fig4-fred-b1').value, 10);
      var b2 = parseFloat(document.getElementById('fig4-fred-b2').value, 10);
      var b = [b1, b2];
      var wKer = [0, 1];
      var ip = b[0] * wKer[0] + b[1] * wKer[1];
      var solvable = Math.abs(ip) < 1e-10;
      /* least-squares solution always: min ||Ax-b|| on im A = horizontal */
      var proj = [b1, 0]; /* orthogonal proj to im A = x-axis for this A */
      var residual = [b1 - proj[0], b2 - proj[1]];
      var xPart = solvable ? [(b1 - 0.35 * 0), 0] : null;
      /* particular: A (x,y)= (x+0.35y, 0)=b ⇒ need b2=0, x+0.35y=b1 */
      if (solvable) xPart = [b1, 0];

      var traces = [
        F.line([-2.3, 2.3], [0, 0], { name: 'im A = span{e₁}', color: C.violet, width: 3.2 }),
        F.line([0, 0], [-2.3, 2.3], { name: 'ker A* = span{e₂}', color: C.gold, width: 2, dash: 'dash' }),
        /* angle: solvability ⇔ b lies in im A */
        F.markers([b1], [b2], {
          name: 'b',
          color: solvable ? C.gold : C.warn,
          size: 13
        }),
        F.markers([proj[0]], [proj[1]], { name: 'proj_{im A} b', color: C.fg, size: 9, symbol: 'diamond' }),
        F.line([b1, proj[0]], [b2, proj[1]], {
          name: 'residual b−P b ∥ ker A*',
          color: C.warn,
          width: 2,
          dash: 'dot'
        })
      ];
      if (solvable && xPart) {
        traces.push(
          F.line([0, xPart[0]], [0, 0], {
            name: 'particular solution x_*',
            color: C.softG,
            width: 2.5
          })
        );
        /* affine solution set x_* + ker A = x_* + span{(−0.35,1)}? ker A: x+0.35y=0 */
        var kdir = [-0.35, 1];
        var kn = Math.hypot(kdir[0], kdir[1]);
        kdir = [kdir[0] / kn, kdir[1] / kn];
        traces.push(
          F.line(
            [xPart[0] - 1.6 * kdir[0], xPart[0] + 1.6 * kdir[0]],
            [xPart[1] - 1.6 * kdir[1], xPart[1] + 1.6 * kdir[1]],
            { name: 'x_* + ker A (solution set)', color: C.softG, width: 2, dash: 'dash' }
          )
        );
      }

      /* right: bar of <b,w> vs 0 */
      traces.push({
        type: 'bar',
        x: ['⟨b,w⟩', '‖res‖'],
        y: [ip, Math.hypot(residual[0], residual[1])],
        xaxis: 'x2',
        yaxis: 'y2',
        marker: { color: [Math.abs(ip) < 1e-10 ? C.gold : C.warn, C.violet] },
        name: 'tests',
        showlegend: false
      });

      F.plot(el, traces, {
        height: 400,
        showlegend: true,
        grid: { rows: 1, columns: 2, pattern: 'independent' },
        title: 'Fredholm · Ax=b solvability geometry',
        xaxis: { title: 'e₁', domain: [0, 0.55], range: [-2.2, 2.2], scaleanchor: 'y', scaleratio: 1 },
        yaxis: { title: 'e₂', range: [-2.2, 2.2] },
        xaxis2: { title: '', domain: [0.66, 1] },
        yaxis2: { title: 'value', anchor: 'x2' }
      });
      F.setReadout(
        'fig4-fred-readout',
        '⟨b,ker A*⟩ = ' +
          F.fmt(ip, 4) +
          (solvable
            ? ' = 0 ⇒ solvable · general solution is affine line x_*+ker A drawn in green'
            : ' ≠ 0 ⇒ inconsistent · residual is exactly the ker A* component of b') +
          ' · this is the finite-dim Fredholm alternative geometrically'
      );
    }
    F.bindRange('fig4-fred-b1', draw);
    F.bindRange('fig4-fred-b2', draw);
    draw();
  }

  function wireNewton() {
    var el = document.getElementById('fig4-newton-plot');
    if (!el) return;

    function g(x) {
      return x * x - 2;
    }
    function gp(x) {
      return 2 * x;
    }

    function draw() {
      var x0 = parseFloat(document.getElementById('fig4-newton-x0').value, 10);
      var n = parseInt(document.getElementById('fig4-newton-steps').value, 10);
      var xs = [x0];
      var x = x0;
      for (var k = 0; k < n; k++) {
        if (Math.abs(gp(x)) < 1e-14) break;
        x = x - g(x) / gp(x);
        xs.push(x);
      }
      var xx = F.linspace(-0.4, 3.2, 220);
      var traces = [
        F.line(xx, xx.map(g), { name: 'F(x)=x²−2', color: C.violet, width: 2.5 }),
        F.line(xx, xx.map(function () { return 0; }), {
          color: C.dim,
          width: 1,
          dash: 'dot',
          showlegend: false
        }),
        F.markers([Math.SQRT2, -Math.SQRT2], [0, 0], {
          name: '±√2',
          color: C.fg,
          size: 9,
          symbol: 'diamond'
        })
      ];
      for (k = 0; k < xs.length - 1; k++) {
        var xk = xs[k];
        var yk = g(xk);
        var slope = gp(xk);
        var xTouch = xk - yk / slope;
        traces.push(
          F.line([xk - 0.15, xk + 0.9], [yk - 0.15 * slope, yk + 0.9 * slope], {
            color: C.softG,
            width: 1,
            showlegend: k === 0,
            name: k === 0 ? 'tangent' : undefined
          })
        );
        traces.push(
          F.line([xk, xTouch], [yk, 0], {
            color: C.gold,
            width: 2,
            name: k === 0 ? 'Newton step' : undefined,
            showlegend: k === 0
          })
        );
        traces.push(F.markers([xk], [yk], { color: C.gold, size: 7, showlegend: false }));
      }
      traces.push(F.markers([xs[xs.length - 1]], [g(xs[xs.length - 1])], { color: C.gold, size: 9 }));

      /* attraction basins for x²−2 on an interval: sign of attractor for random starts */
      var starts = F.linspace(-2.5, 2.5, 80);
      var basins = starts.map(function (s) {
        var z = s;
        for (var it = 0; it < 20; it++) {
          if (Math.abs(gp(z)) < 1e-12) return 0;
          z = z - g(z) / gp(z);
        }
        return z > 0 ? 1 : -1;
      });
      traces.push({
        type: 'scatter',
        mode: 'markers',
        x: starts,
        y: starts.map(function () {
          return -2.2;
        }),
        marker: {
          color: basins.map(function (b) {
            return b > 0 ? C.gold : C.violet;
          }),
          size: 6,
          symbol: 'line-ns'
        },
        name: 'basins (gold→+√2, violet→−√2)',
        showlegend: true
      });

      var errs = xs.map(function (v) {
        return Math.abs(v - Math.SQRT2);
      });
      traces.push({
        type: 'scatter',
        mode: 'lines+markers',
        x: errs.map(function (_, i) {
          return i;
        }),
        y: errs.map(function (e) {
          return e + 1e-18;
        }),
        xaxis: 'x2',
        yaxis: 'y2',
        name: '|x_k−√2|',
        line: { color: C.gold, width: 2 },
        marker: { size: 8, color: C.gold }
      });
      /* quadratic reference slope on last errors */
      if (errs.length > 2) {
        var eRef = errs[Math.max(0, errs.length - 3)];
        var i0 = Math.max(0, errs.length - 3);
        var qx = [i0, i0 + 1, i0 + 2];
        var qy = [eRef, eRef * eRef * 0.5, Math.pow(eRef, 4) * 0.25];
        traces.push({
          type: 'scatter',
          mode: 'lines',
          x: qx,
          y: qy.map(function (v) {
            return Math.max(v, 1e-18);
          }),
          xaxis: 'x2',
          yaxis: 'y2',
          line: { color: C.dim, width: 1, dash: 'dot' },
          name: 'quad. trend',
          showlegend: true
        });
      }

      F.plot(el, traces, {
        height: 420,
        showlegend: true,
        grid: { rows: 1, columns: 2, pattern: 'independent' },
        title: 'Newton for a simple root · local quadratic convergence',
        xaxis: { title: 'x', domain: [0, 0.52], range: [-0.5, 3.2] },
        yaxis: { title: 'F', range: [-2.5, 6] },
        xaxis2: { title: 'iterate k', domain: [0.62, 1] },
        yaxis2: { title: 'error', type: 'log', anchor: 'x2' }
      });
      F.setReadout(
        'fig4-newton-readout',
        'x₀=' +
          F.fmt(x0, 3) +
          ' · steps ' +
          (xs.length - 1) +
          ' · errors ' +
          errs
            .map(function (e) {
              return e.toExponential(1);
            })
            .join(', ') +
          ' · F′(√2)=2√2≠0 ⇒ local quadratic rate · strip marks Newton basins of ±√2'
      );
    }
    F.bindRange('fig4-newton-x0', draw);
    F.bindRange('fig4-newton-steps', draw);
    draw();
  }

  F.onReady(function () {
    wireJordan();
    wireFredholm();
    wireNewton();
  });
})();
