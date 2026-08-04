/* Ch.3 Lie theory — SO(2) geometry, brackets of order ε², contact structure. */
(function () {
  'use strict';
  var F = window.JBFig;
  if (!F) return;
  var C = F.C;

  function wireAction() {
    var el = document.getElementById('fig3-action-plot');
    if (!el) return;
    var play = true;
    F.bindButton('fig3-action-play', function (btn) {
      play = !play;
      btn.textContent = play ? 'pause' : 'play';
    });
    var seeds = [
      [1.2, 0.25],
      [0.75, 0.95],
      [-0.55, 1.05],
      [0.4, -0.85],
      [-1.0, -0.35]
    ];
    var orbitCircles = seeds.map(function (p, i) {
      var r = Math.hypot(p[0], p[1]);
      var t = F.linspace(0, 2 * Math.PI, 100);
      return F.line(
        t.map(function (u) {
          return r * Math.cos(u);
        }),
        t.map(function (u) {
          return r * Math.sin(u);
        }),
        {
          color: C.softV,
          width: 1.3,
          name: i === 0 ? 'orbits' : undefined,
          showlegend: i === 0
        }
      );
    });
    var field = F.quiver(
      function (x, y) {
        return [-y, x];
      },
      [-1.55, 1.55],
      [-1.55, 1.55],
      10,
      10,
      { name: 'ξ_M', scale: 0.14, color: C.softG }
    );
    var thr = 1e-4;
    var p0 = seeds[0];
    var Rchk = [
      Math.cos(thr) * p0[0] - Math.sin(thr) * p0[1],
      Math.sin(thr) * p0[0] + Math.cos(thr) * p0[1]
    ];
    var dApprox = [(Rchk[0] - p0[0]) / thr, (Rchk[1] - p0[1]) / thr];
    var dExact = [-p0[1], p0[0]];
    var err = Math.hypot(dApprox[0] - dExact[0], dApprox[1] - dExact[1]);

    function draw() {
      var angEl = document.getElementById('fig3-action-angle');
      if (play && angEl) angEl.value = String((parseFloat(angEl.value, 10) + 0.55) % 360);
      var deg = parseFloat((angEl || {}).value || 40, 10);
      var th = (deg * Math.PI) / 180;
      var c = Math.cos(th);
      var s = Math.sin(th);
      var traces = orbitCircles.slice();

      seeds.forEach(function (p, i) {
        var r = Math.hypot(p[0], p[1]);
        var t0 = Math.atan2(p[1], p[0]);
        var nArc = 28;
        var arcX = new Array(nArc);
        var arcY = new Array(nArc);
        for (var k = 0; k < nArc; k++) {
          var u = t0 + (th * k) / (nArc - 1);
          arcX[k] = r * Math.cos(u);
          arcY[k] = r * Math.sin(u);
        }
        traces.push(F.line(arcX, arcY, { color: C.gold, width: 2, showlegend: false }));
        var qx = c * p[0] - s * p[1];
        var qy = s * p[0] + c * p[1];
        traces.push(F.markers([p[0]], [p[1]], { color: C.dim, size: 7, showlegend: false }));
        traces.push(
          F.markers([qx], [qy], {
            color: C.gold,
            size: 9,
            name: i === 0 ? 'R_θ q' : undefined,
            showlegend: i === 0
          })
        );
      });
      traces.push(field);

      var p = F.plot(el, traces, {
        height: 410,
        showlegend: true,
        title: 'SO(2) ↷ ℝ² · orbits and generator ξ_M',
        xaxis: { title: 'q₁', range: [-1.65, 1.65], scaleanchor: 'y', scaleratio: 1 },
        yaxis: { title: 'q₂', range: [-1.65, 1.65] }
      });
      F.setReadout(
        'fig3-action-readout',
        'θ=' +
          deg.toFixed(1) +
          '° · gold arcs = one-parameter motion along the group orbit · green = fundamental field ξ_M · ||(R_εq−q)/ε − ξ_M|| = ' +
          err.toExponential(2) +
          ' · stabiliser at 0 is SO(2); elsewhere trivial · Φ_t of ξ_M is R_t'
      );
      return p;
    }
    F.bindRange('fig3-action-angle', function () {});
    F.rafLoop(draw, 16, el);
  }

  function wireBracket() {
    var el = document.getElementById('fig3-bracket-plot');
    if (!el) return;

    function flowX(p, s) {
      return [p[0] + s, p[1]];
    }
    function flowY(p, s) {
      return [p[0], p[1] + s * p[0]];
    }

    function draw() {
      var eps = parseFloat((document.getElementById('fig3-bracket-eps') || {}).value || 0.55, 10);
      var p0 = [0.55, 0.15];
      var p1 = flowY(p0, eps);
      var p2 = flowX(p1, eps);
      var p3 = flowY(p2, -eps);
      var p4 = flowX(p3, -eps);
      var delta = [p4[0] - p0[0], p4[1] - p0[1]];
      /* Φ^{-ε}_X ∘ Φ^{-ε}_Y ∘ Φ^ε_X ∘ Φ^ε_Y ≈ −ε²[X,Y] with [X,Y]=∂_y */
      var theory = [0, -eps * eps];
      var err = Math.hypot(delta[0] - theory[0], delta[1] - theory[1]);
      var box = [p0, p1, p2, p3, p4];

      /* scaling law: Δy / ε² → −1 */
      var es = F.linspace(0.2, 1.0, 14);
      var ratios = es.map(function (e) {
        var q = flowX(flowY(flowX(flowY(p0, e), e), -e), -e);
        return (q[1] - p0[1]) / (e * e);
      });

      F.plot(
        el,
        [
          F.quiver(
            function (x, y) {
              return [1, 0];
            },
            [0, 2.4],
            [-0.3, 2.2],
            9,
            7,
            { color: C.softV, scale: 0.13, name: 'X=∂_x' }
          ),
          F.quiver(
            function (x, y) {
              return [0, x];
            },
            [0, 2.4],
            [-0.3, 2.2],
            9,
            7,
            { color: C.softG, scale: 0.13, name: 'Y=x ∂_y' }
          ),
          F.line(
            box.map(function (p) {
              return p[0];
            }),
            box.map(function (p) {
              return p[1];
            }),
            { name: 'commutator path', color: C.gold, width: 2.8, mode: 'lines+markers' }
          ),
          F.markers([p0[0]], [p0[1]], { name: 'start', color: C.fg, size: 10 }),
          F.markers([p4[0]], [p4[1]], { name: 'end', color: C.gold, size: 10, symbol: 'diamond' }),
          F.line([p0[0], p0[0] + theory[0]], [p0[1], p0[1] + theory[1]], {
            name: '−ε²[X,Y]',
            color: C.violet,
            width: 2.5,
            dash: 'dash'
          }),
          {
            type: 'scatter',
            mode: 'lines+markers',
            x: es,
            y: ratios,
            xaxis: 'x2',
            yaxis: 'y2',
            name: 'Δy/ε²',
            line: { color: C.gold, width: 2 },
            marker: { size: 7, color: C.gold }
          },
          {
            type: 'scatter',
            mode: 'lines',
            x: es,
            y: es.map(function () {
              return -1;
            }),
            xaxis: 'x2',
            yaxis: 'y2',
            name: 'limit −1',
            line: { color: C.violet, width: 1.5, dash: 'dot' }
          }
        ],
        {
          height: 410,
          showlegend: true,
          grid: { rows: 1, columns: 2, pattern: 'independent' },
          title: 'Lie bracket from flow commutator',
          xaxis: { title: 'x', domain: [0, 0.5], range: [0, 2.5] },
          yaxis: { title: 'y', range: [-1.2, 2.3] },
          xaxis2: { title: 'ε', domain: [0.6, 1] },
          yaxis2: { title: 'Δy/ε² → −1', range: [-1.4, -0.6], anchor: 'x2' }
        }
      );
      F.setReadout(
        'fig3-bracket-readout',
        'ε=' +
          F.fmt(eps, 3) +
          ' · Δ=(' +
          F.fmt(delta[0], 4) +
          ', ' +
          F.fmt(delta[1], 4) +
          ') · −ε²[X,Y]=(0,' +
          F.fmt(theory[1], 4) +
          ') · ||err||=' +
          err.toExponential(2) +
          ' · right: Δy/ε² → −1 as ε↓, measuring [X,Y]=∂_y at order 2'
      );
    }
    F.bindRange('fig3-bracket-eps', draw);
    draw();
  }

  function wireContact() {
    var el = document.getElementById('fig3-contact-plot');
    if (!el) return;

    function draw() {
      var z0 = parseFloat((document.getElementById('fig3-contact-z') || {}).value || 0, 10);
      var xs = [];
      var ys = [];
      var zs = [];
      var grid = F.linspace(-1.15, 1.15, 6);
      grid.forEach(function (x) {
        grid.forEach(function (p) {
          var o = [x, z0, p];
          var v1 = [0.2, 0.2 * p, 0];
          var v2 = [0, 0, 0.2];
          var corners = [o, F.add(o, v1), F.add(F.add(o, v1), v2), F.add(o, v2), o];
          xs.push.apply(
            xs,
            corners
              .map(function (c) {
                return c[0];
              })
              .concat([null])
          );
          ys.push.apply(
            ys,
            corners
              .map(function (c) {
                return c[1];
              })
              .concat([null])
          );
          zs.push.apply(
            zs,
            corners
              .map(function (c) {
                return c[2];
              })
              .concat([null])
          );
        });
      });
      var xt = F.linspace(-1.2, 1.2, 90);
      var f = function (x) {
        return 0.4 * Math.sin(1.4 * x) + z0;
      };
      var fp = function (x) {
        return 0.4 * 1.4 * Math.cos(1.4 * x);
      };
      var Lx = xt;
      var Lz = xt.map(f);
      var Lp = xt.map(fp);
      var res = 0;
      for (var i = 1; i < xt.length; i++) {
        var dx = xt[i] - xt[i - 1];
        var dz = Lz[i] - Lz[i - 1];
        var pmid = 0.5 * (Lp[i] + Lp[i - 1]);
        res += Math.abs(dz - pmid * dx);
      }
      /* non-Legendrian comparison curve: z=f but p wrong */
      var badP = xt.map(function () {
        return 0.8;
      });
      var resBad = 0;
      for (i = 1; i < xt.length; i++) {
        dx = xt[i] - xt[i - 1];
        dz = Lz[i] - Lz[i - 1];
        resBad += Math.abs(dz - 0.8 * dx);
      }

      F.plot(
        el,
        [
          {
            type: 'scatter3d',
            mode: 'lines',
            x: xs,
            y: ys,
            z: zs,
            line: { color: C.softV, width: 2 },
            name: 'ker α planes',
            hoverinfo: 'skip'
          },
          {
            type: 'scatter3d',
            mode: 'lines',
            x: Lx,
            y: Lz,
            z: Lp,
            line: { color: C.gold, width: 7 },
            name: 'Legendrian j¹f'
          },
          {
            type: 'scatter3d',
            mode: 'lines',
            x: Lx,
            y: Lz,
            z: badP,
            line: { color: C.warn, width: 4, dash: 'dash' },
            name: 'non-Legendrian'
          }
        ],
        {
          height: 450,
          showlegend: true,
          title: 'contact planes · Legendrian jet',
          scene: {
            xTitle: 'x',
            yTitle: 'z',
            zTitle: 'p',
            aspectmode: 'cube',
            camera: { eye: { x: 1.5, y: 1.3, z: 1.15 } }
          },
          margin: { l: 0, r: 0, t: 40, b: 0 }
        }
      );
      F.setReadout(
        'fig3-contact-readout',
        '∑|dz−p dx| on jet = ' +
          res.toExponential(2) +
          ' (machine-zero for true p=f′) · same curve with wrong p: residual ' +
          resBad.toExponential(2) +
          ' · dα=−dp∧dx ≢ 0 mod α ⇒ not Frobenius-integrable · Legendrians are 1-dim integral manifolds'
      );
    }
    F.bindRange('fig3-contact-z', draw);
    draw();
  }

  F.onReady(function () {
    wireAction();
    wireBracket();
    wireContact();
  });
})();
