/* Ch.6 symplectic — Stokes, Liouville, action-angle, optics. */
(function () {
  'use strict';
  var F = window.JBFig;
  if (!F) return;
  var C = F.C;

  function wireStokes() {
    var el = document.getElementById('fig6-stokes-plot');
    if (!el) return;

    function draw() {
      var a = parseFloat(document.getElementById('fig6-stokes-a').value, 10);
      var b = parseFloat(document.getElementById('fig6-stokes-b').value, 10);
      /* α = −y dx  ⇒ dα = dx∧dy  (area form). ∫_D dα = area(D), ∫_∂D α = ∮ −y dx */
      var t = F.linspace(0, 2 * Math.PI, 400);
      var x = t.map(function (u) {
        return a * Math.cos(u);
      });
      var y = t.map(function (u) {
        return b * Math.sin(u);
      });
      var bInt = 0;
      for (var i = 1; i < t.length; i++) {
        var dx = x[i] - x[i - 1];
        var ymid = 0.5 * (y[i] + y[i - 1]);
        bInt += -ymid * dx;
      }
      var area = Math.PI * a * b;
      var err = Math.abs(bInt - area);

      /* dual vector field of α (musical isomorphism with euclidean metric): α^♯ = (−y, 0) */
      /* arrow stubs of the 1-form along ∂D: magnitude |α(τ)| with τ unit tangent */
      var stubsX = [];
      var stubsY = [];
      for (i = 0; i < t.length; i += 18) {
        var tx = -a * Math.sin(t[i]);
        var ty = b * Math.cos(t[i]);
        var tl = Math.hypot(tx, ty) || 1;
        tx /= tl;
        ty /= tl;
        var alphaOnTau = -y[i] * tx; /* α(τ) = −y τ_x */
        var sx = x[i];
        var sy = y[i];
        var nx = -ty;
        var ny = tx;
        stubsX.push(sx, sx + 0.35 * alphaOnTau * nx, null);
        stubsY.push(sy, sy + 0.35 * alphaOnTau * ny, null);
      }
      /* interior sample for dα “density” = 1 (constant 2-form) */
      var grid = [];
      var gx = F.linspace(-a * 0.85, a * 0.85, 5);
      var gy = F.linspace(-b * 0.85, b * 0.85, 4);
      gx.forEach(function (xx) {
        gy.forEach(function (yy) {
          if ((xx * xx) / (a * a) + (yy * yy) / (b * b) < 0.92) {
            grid.push(xx, yy);
          }
        });
      });

      F.plot(
        el,
        [
          F.quiver(
            function (xx, yy) {
              return [-yy, 0];
            },
            [-2.1, 2.1],
            [-1.7, 1.7],
            11,
            9,
            { color: C.softV, scale: 0.12, name: 'α♯ = (−y, 0)' }
          ),
          F.line(x, y, {
            name: '∂D',
            color: C.gold,
            width: 2.7,
            fill: 'toself',
            fillcolor: 'rgba(174,147,236,0.15)'
          }),
          {
            type: 'scatter',
            mode: 'lines',
            x: stubsX,
            y: stubsY,
            line: { color: C.violet, width: 2 },
            name: 'α(τ)',
            hoverinfo: 'skip'
          },
          F.markers(
            grid.filter(function (_, k) {
              return k % 2 === 0;
            }),
            grid.filter(function (_, k) {
              return k % 2 === 1;
            }),
            { color: C.softG, size: 5, name: 'dα density', symbol: 'square-open' }
          ),
          F.markers([0], [0], { name: 'origin', color: C.dim, size: 6, symbol: 'x' })
        ],
        {
          height: 400,
          showlegend: true,
          title: 'Stokes · α=−y dx, dα=dx∧dy',
          xaxis: { title: 'x', range: [-2.2, 2.2], scaleanchor: 'y', scaleratio: 1 },
          yaxis: { title: 'y', range: [-1.85, 1.85] }
        }
      );
      F.setReadout(
        'fig6-stokes-readout',
        'a=' +
          F.fmt(a, 2) +
          ', b=' +
          F.fmt(b, 2) +
          ' · area πab = ' +
          F.fmt(area, 6) +
          ' · ∮_∂D α = ' +
          F.fmt(bInt, 6) +
          ' · |∫dα−∮α| = ' +
          err.toExponential(2) +
          ' · α^♯ shows the metric dual; violet stubs are signed flux α(τ) on ∂D; interior sampling marks constant 2-form density 1'
      );
    }
    F.bindRange('fig6-stokes-a', draw);
    F.bindRange('fig6-stokes-b', draw);
    draw();
  }

  function wireLiouville() {
    var el = document.getElementById('fig6-liouville-plot');
    if (!el) return;
    var play = true;
    var t = 0;
    F.bindButton('fig6-liouville-play', function (btn) {
      play = !play;
      btn.textContent = play ? 'pause' : 'play';
    });
    var field = F.quiver(
      function (q, p) {
        return [p, -q];
      },
      [-2, 2],
      [-2, 2],
      8,
      8,
      { color: C.softV, scale: 0.14, name: 'X_H' }
    );

    function draw() {
      if (play) t += 0.03;
      var E = parseFloat((document.getElementById('fig6-liouville-e') || {}).value || 0.8, 10);
      var R = Math.sqrt(2 * E);
      /* harmonic H=(q²+p²)/2 · circle of radius R; material patch of 4 points */
      var amp = 0.22;
      var base = [
        [R * 0.7, R * 0.1],
        [R * 0.7 + amp, R * 0.1],
        [R * 0.7 + amp, R * 0.1 + amp],
        [R * 0.7, R * 0.1 + amp]
      ];
      function flow(q, p, tt) {
        return [q * Math.cos(tt) + p * Math.sin(tt), -q * Math.sin(tt) + p * Math.cos(tt)];
      }
      var patch0 = base.map(function (v) {
        return flow(v[0], v[1], 0);
      });
      var patcht = base.map(function (v) {
        return flow(v[0], v[1], t);
      });
      var A0 = F.polygonArea(
        patch0.map(function (v) {
          return v[0];
        }),
        patch0.map(function (v) {
          return v[1];
        })
      );
      var At = F.polygonArea(
        patcht.map(function (v) {
          return v[0];
        }),
        patcht.map(function (v) {
          return v[1];
        })
      );
      if (!el.__jbHE || el.__jbHE !== E) {
        el.__jbHE = E;
        var th = F.linspace(0, 2 * Math.PI, 120);
        el.__jbHcircle = F.line(
          th.map(function (u) {
            return R * Math.cos(u);
          }),
          th.map(function (u) {
            return R * Math.sin(u);
          }),
          { name: 'H=E', color: C.violet, width: 2 }
        );
      }
      var traces = [
        el.__jbHcircle,
        F.line(
          patch0
            .concat([patch0[0]])
            .map(function (v) {
              return v[0];
            }),
          patch0
            .concat([patch0[0]])
            .map(function (v) {
              return v[1];
            }),
          { name: 'patch t=0', color: C.dim, width: 1.5, dash: 'dot' }
        ),
        F.line(
          patcht
            .concat([patcht[0]])
            .map(function (v) {
              return v[0];
            }),
          patcht
            .concat([patcht[0]])
            .map(function (v) {
              return v[1];
            }),
          {
            name: 'patch t',
            color: C.gold,
            width: 2.5,
            fill: 'toself',
            fillcolor: 'rgba(231,181,151,0.18)'
          }
        ),
        field
      ];
      var plotP = F.plot(el, traces, {
        height: 400,
        showlegend: true,
        title: 'Liouville · area-preserving Hamiltonian flow',
        xaxis: { title: 'q', range: [-2.1, 2.1], scaleanchor: 'y', scaleratio: 1 },
        yaxis: { title: 'p', range: [-2.1, 2.1] }
      });
      F.setReadout(
        'fig6-liouville-readout',
        'E = ' +
          F.fmt(E, 3) +
          ' · t = ' +
          F.fmt(t, 2) +
          ' · area₀ = ' +
          F.fmt(A0, 6) +
          ' · area_t = ' +
          F.fmt(At, 6) +
          ' · |ΔA|/A₀ = ' +
          F.fmt(Math.abs(At - A0) / (A0 || 1), 2) +
          ' · φ_t^* ω = ω for ω=dp∧dq'
      );
      return plotP;
    }
    F.bindRange('fig6-liouville-e', function () {
      el.__jbHcircle = null;
      draw();
    });
    F.rafLoop(draw, 16, el);
  }

  function wireAA() {
    var el = document.getElementById('fig6-aa-plot');
    if (!el) return;
    var play = true;
    var t = 0;
    F.bindButton('fig6-aa-play', function (btn) {
      play = !play;
      btn.textContent = play ? 'pause' : 'play';
    });

    function draw() {
      if (play) t += 0.04;
      var alpha = parseFloat((document.getElementById('fig6-aa-alpha') || {}).value || 0.618, 10);
      var eps = parseFloat((document.getElementById('fig6-aa-eps') || {}).value || 0, 10);
      var w1 = 1;
      var w2 = alpha;
      var trailN = 600;
      var th1 = [];
      var th2 = [];
      for (var i = 0; i < trailN; i++) {
        var ti = t - i * 0.05;
        if (ti < 0) break;
        var a1 = (w1 * ti) % (2 * Math.PI);
        var a2 = (w2 * ti + eps * Math.sin(w1 * ti)) % (2 * Math.PI);
        if (a1 < 0) a1 += 2 * Math.PI;
        if (a2 < 0) a2 += 2 * Math.PI;
        th1.push(a1);
        th2.push(a2);
      }
      /* embed T² in R³ */
      function emb(u, v) {
        var R = 1.2;
        var r = 0.45;
        return [(R + r * Math.cos(v)) * Math.cos(u), (R + r * Math.cos(v)) * Math.sin(u), r * Math.sin(v)];
      }
      var ex = th1.map(function (u, i) {
        return emb(u, th2[i])[0];
      });
      var ey = th1.map(function (u, i) {
        return emb(u, th2[i])[1];
      });
      var ez = th1.map(function (u, i) {
        return emb(u, th2[i])[2];
      });
      /* torus mesh */
      var U = F.linspace(0, 2 * Math.PI, 36);
      var V = F.linspace(0, 2 * Math.PI, 20);
      var Xs = [];
      var Ys = [];
      var Zs = [];
      for (i = 0; i < V.length; i++) {
        var xr = [];
        var yr = [];
        var zr = [];
        for (var j = 0; j < U.length; j++) {
          var p = emb(U[j], V[i]);
          xr.push(p[0]);
          yr.push(p[1]);
          zr.push(p[2]);
        }
        Xs.push(xr);
        Ys.push(yr);
        Zs.push(zr);
      }
      var rational = Math.abs(alpha - Math.round(alpha * 12) / 12) < 0.02;

      F.plot(
        el,
        [
          {
            type: 'surface',
            x: Xs,
            y: Ys,
            z: Zs,
            opacity: 0.2,
            colorscale: [
              [0, '#111'],
              [1, C.violet]
            ],
            showscale: false,
            hoverinfo: 'skip'
          },
          {
            type: 'scatter3d',
            mode: 'lines',
            x: ex,
            y: ey,
            z: ez,
            line: { color: C.gold, width: 5 },
            name: 'orbit'
          }
        ],
        {
          height: 430,
          showlegend: true,
          title: 'action–angle flow on T²',
          scene: { aspectmode: 'data' },
          margin: { l: 0, r: 0, t: 40, b: 0 }
        }
      );
      F.setReadout(
        'fig6-aa-readout',
        'α = ' +
          F.fmt(alpha, 4) +
          ' · ε = ' +
          F.fmt(eps, 2) +
          (rational
            ? ' · near-resonant: orbit closes (periodic on torus)'
            : ' · irrational: dense winding on T² (Kronecker)') +
          ' · Liouville–Arnold integrable linear flow'
      );
    }
    F.bindRange('fig6-aa-alpha', draw);
    F.bindRange('fig6-aa-eps', draw);
    F.rafLoop(draw, 16, el);
  }

  function wireOptics() {
    var el = document.getElementById('fig6-optics-plot');
    if (!el) return;

    function draw() {
      var f = parseFloat(document.getElementById('fig6-optics-f').value, 10);
      var L = parseFloat(document.getElementById('fig6-optics-L').value, 10);
      var q0 = parseFloat(document.getElementById('fig6-optics-q0').value, 10);
      /* free flight [[1,L],[0,1]] · thin lens [[1,0],[-1/f,1]] · free L */
      function mul(A, B) {
        return [
          [A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]],
          [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]]
        ];
      }
      var Flt = [
        [1, L],
        [0, 1]
      ];
      var Lens = [
        [1, 0],
        [-1 / f, 1]
      ];
      var M = mul(Flt, mul(Lens, Flt));
      var det = M[0][0] * M[1][1] - M[0][1] * M[1][0];
      /* ray fan */
      var ps = F.linspace(-0.5, 0.5, 9);
      var traces = [];
      var z1 = L;
      var z2 = 2 * L;
      ps.forEach(function (p0, i) {
        var q1 = q0 + L * p0;
        var p1 = p0; /* after free */
        /* lens */
        p1 = p1 - q1 / f;
        var q2 = q1 + L * p1;
        traces.push(
          F.line([0, z1, z2], [q0, q1, q2], {
            color: C.violet,
            width: 1.5,
            name: i === 0 ? 'rays (q,p)' : undefined,
            showlegend: i === 0
          })
        );
      });
      traces.push(F.line([z1, z1], [-1.4, 1.4], { name: 'lens', color: C.gold, width: 3 }));
      /* phase map arrows single */
      var p0s = F.linspace(-0.8, 0.8, 6);
      var q0s = F.linspace(-0.8, 0.8, 6);
      var vx = [];
      var vy = [];
      var vx2 = [];
      var vy2 = [];
      q0s.forEach(function (q) {
        p0s.forEach(function (p) {
          var qn = M[0][0] * q + M[0][1] * p;
          var pn = M[1][0] * q + M[1][1] * p;
          vx.push(q);
          vy.push(p);
          vx2.push(qn);
          vy2.push(pn);
        });
      });
      traces.push({
        type: 'scatter',
        mode: 'markers',
        x: vx,
        y: vy,
        xaxis: 'x2',
        yaxis: 'y2',
        marker: { color: C.dim, size: 6 },
        name: '(q,p)',
        showlegend: true
      });
      traces.push({
        type: 'scatter',
        mode: 'markers',
        x: vx2,
        y: vy2,
        xaxis: 'x2',
        yaxis: 'y2',
        marker: { color: C.gold, size: 6 },
        name: 'M(q,p)'
      });

      F.plot(el, traces, {
        height: 400,
        showlegend: true,
        grid: { rows: 1, columns: 2, pattern: 'independent' },
        title: 'paraxial ABCD · M ∈ Sp(2,ℝ)',
        xaxis: { title: 'optical axis z', domain: [0, 0.48] },
        yaxis: { title: 'q', range: [-1.5, 1.5] },
        xaxis2: { title: 'q', domain: [0.58, 1], range: [-1.6, 1.6], scaleanchor: 'y2', scaleratio: 1 },
        yaxis2: { title: 'p', range: [-1.6, 1.6], anchor: 'x2' }
      });
      F.setReadout(
        'fig6-optics-readout',
        'M = [[' +
          F.fmt(M[0][0], 3) +
          ', ' +
          F.fmt(M[0][1], 3) +
          '], [' +
          F.fmt(M[1][0], 3) +
          ', ' +
          F.fmt(M[1][1], 3) +
          ']] · det M = ' +
          F.fmt(det, 8) +
          ' · free–lens–free composition · linear optics = Sp(2)'
      );
    }
    F.bindRange('fig6-optics-f', draw);
    F.bindRange('fig6-optics-L', draw);
    F.bindRange('fig6-optics-q0', draw);
    draw();
  }

  F.onReady(function () {
    wireStokes();
    wireLiouville();
    wireAA();
    wireOptics();
  });
})();
