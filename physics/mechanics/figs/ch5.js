/* Ch.5 dynamical systems — nonlinear saddle, van der Pol Poincaré, Morse height on S². */
(function () {
  'use strict';
  var F = window.JBFig;
  if (!F) return;
  var C = F.C;
  var MU = 0.35;

  function wireSaddle() {
    var el = document.getElementById('fig5-saddle-plot');
    if (!el) return;
    var play = true;
    var seeds = [
      [0.55, 0.45],
      [-0.45, 0.8],
      [0.35, -0.55],
      [-0.7, -0.25],
      [0.95, 0.15],
      [-0.2, 1.1]
    ];
    var orbits = seeds.map(function (s) {
      return { x: [s[0]], y: [s[1]] };
    });
    F.bindButton('fig5-saddle-play', function (btn) {
      play = !play;
      btn.textContent = play ? 'pause' : 'play';
    });

    function f(t, u) {
      return [u[0], -u[1] + MU * u[0] * u[0]];
    }

    function integrateFrom(x0, y0, T, sign) {
      var steps = Math.ceil(Math.abs(T) / 0.02);
      var dt = (sign * Math.abs(T)) / steps;
      var xs = [x0];
      var ys = [y0];
      var u = [x0, y0];
      for (var k = 0; k < steps; k++) {
        u = F.rk4step(f, 0, u, dt);
        if (Math.abs(u[0]) > 2.45 || Math.abs(u[1]) > 2.45) break;
        xs.push(u[0]);
        ys.push(u[1]);
      }
      return { x: xs, y: ys };
    }

    var man = {
      eu: integrateFrom(1e-4, 0, 2.8, 1),
      euNeg: integrateFrom(-1e-4, 0, 2.8, 1),
      es: integrateFrom(0, 1e-4, 2.8, -1),
      esNeg: integrateFrom(0, -1e-4, 2.8, -1),
      Wu: integrateFrom(1e-3, 0, 2.7, 1),
      WuN: integrateFrom(-1e-3, 0, 2.7, 1),
      Ws: integrateFrom(0.015, 1e-3, 3.4, -1),
      WsN: integrateFrom(0.015, -1e-3, 3.4, -1)
    };
    /* field + manifolds are static — build once */
    var staticHead = [
      F.quiver(
        function (x, y) {
          return [x, -y + MU * x * x];
        },
        [-2.15, 2.15],
        [-2.15, 2.15],
        11,
        11,
        { color: C.softV, scale: 0.08, name: 'vector field' }
      )
    ];
    var staticTail = [
      F.line(man.eu.x, man.eu.y, { color: C.softG, width: 2, dash: 'dot', name: 'Eᵘ' }),
      F.line(man.euNeg.x, man.euNeg.y, { color: C.softG, width: 2, dash: 'dot', showlegend: false }),
      F.line(man.es.x, man.es.y, { color: C.softG, width: 2, dash: 'dot', name: 'Eˢ' }),
      F.line(man.esNeg.x, man.esNeg.y, { color: C.softG, width: 2, dash: 'dot', showlegend: false }),
      F.line(man.Wu.x, man.Wu.y, { color: C.gold, width: 3, name: 'Wᵘ' }),
      F.line(man.WuN.x, man.WuN.y, { color: C.gold, width: 3, showlegend: false }),
      F.line(man.Ws.x, man.Ws.y, { color: C.violet, width: 3, name: 'Wˢ' }),
      F.line(man.WsN.x, man.WsN.y, { color: C.violet, width: 3, showlegend: false }),
      F.markers([0], [0], { color: C.fg, size: 10, name: 'saddle', symbol: 'x' })
    ];
    var layout = {
      height: 430,
      showlegend: true,
      title: 'saddle · eigenspaces vs manifolds',
      xaxis: { title: 'x', range: [-2.2, 2.2], scaleanchor: 'y', scaleratio: 1 },
      yaxis: { title: 'y', range: [-2.2, 2.2] }
    };

    function draw() {
      if (play) {
        for (var i = 0; i < orbits.length; i++) {
          var o = orbits[i];
          var last = [o.x[o.x.length - 1], o.y[o.y.length - 1]];
          var u = F.rk4step(f, 0, last, 0.035);
          if (Math.abs(u[0]) > 2.4 || Math.abs(u[1]) > 2.4 || o.x.length > 160) {
            o.x = [seeds[i][0]];
            o.y = [seeds[i][1]];
          } else {
            o.x.push(u[0]);
            o.y.push(u[1]);
          }
        }
      }
      var traces = staticHead.slice();
      for (i = 0; i < orbits.length; i++) {
        traces.push(
          F.line(orbits[i].x, orbits[i].y, {
            color: C.dim,
            width: 1.5,
            name: i === 0 ? 'orbits' : undefined,
            showlegend: i === 0
          })
        );
      }
      traces = traces.concat(staticTail);
      return F.plot(el, traces, layout);
    }
    F.setReadout(
      'fig5-saddle-readout',
      'μ=' +
        MU +
        ' · ẋ=x, ẏ=−y+μx² · Df(0)=diag(1,−1) · dotted Eˢ/Eᵘ vs solid Wˢ/Wᵘ · Hartman–Grobman: local topology matches linear saddle; global geometry bends with μ x²'
    );
    draw();
    F.rafLoop(draw, 16, el);
  }

  function wirePoincare() {
    var el = document.getElementById('fig5-poincare-plot');
    if (!el) return;
    var play = true;
    var hits = [];
    var state = { x: 1.2, y: 0 };
    var t = 0;
    var trail = { x: [1.2], y: [0] };
    F.bindButton('fig5-poincare-play', function (btn) {
      play = !play;
      btn.textContent = play ? 'pause' : 'play';
    });

    function vf(mu, x, y) {
      return [y, mu * (1 - x * x) * y - x];
    }

    function draw() {
      var mu = parseFloat((document.getElementById('fig5-poincare-mu') || {}).value || 0.85, 10);
      if (play) {
        for (var k = 0; k < 10; k++) {
          var xOld = state.x;
          var yOld = state.y;
          var u = F.rk4step(
            function (s, v) {
              return vf(mu, v[0], v[1]);
            },
            t,
            [state.x, state.y],
            0.03
          );
          t += 0.03;
          state.x = u[0];
          state.y = u[1];
          trail.x.push(state.x);
          trail.y.push(state.y);
          F.capTrail(trail.x, 220, 150);
          F.capTrail(trail.y, 220, 150);
          if (xOld < 0 && state.x >= 0 && state.y > 0) {
            var a = -xOld / (state.x - xOld + 1e-16);
            var yh = yOld + a * (state.y - yOld);
            hits.push(yh);
            if (hits.length > 36) hits.shift();
          }
        }
      }
      var mult = '—';
      if (hits.length >= 4) {
        var h1 = hits[hits.length - 1];
        var h2 = hits[hits.length - 2];
        var h3 = hits[hits.length - 3];
        if (Math.abs(h2 - h3) > 1e-8) mult = F.fmt(Math.abs((h1 - h2) / (h2 - h3)), 3);
      }
      var yMin = hits.length ? Math.min.apply(null, hits.concat([0.2])) - 0.25 : -0.2;
      var yMax = hits.length ? Math.max.apply(null, hits.concat([1.5])) + 0.25 : 2.2;
      var sigmaY = F.linspace(-2.5, 2.5, 12);

      /* quiver only on first frame (cached on el) */
      if (!el.__jbField || el.__jbFieldMu !== mu) {
        el.__jbFieldMu = mu;
        el.__jbField = F.quiver(
          function (x, y) {
            return vf(mu, x, y);
          },
          [-2.5, 2.5],
          [-2.5, 2.5],
          9,
          9,
          { color: C.softV, scale: 0.07, name: 'van der Pol' }
        );
      }

      var traces = [
        el.__jbField,
        F.line(trail.x, trail.y, { color: C.gold, width: 2.2, name: 'orbit' }),
        F.line(
          sigmaY.map(function () {
            return 0;
          }),
          sigmaY,
          { color: C.fg, width: 2, dash: 'dash', name: 'Σ: x=0' }
        ),
        F.markers(
          hits.map(function () {
            return 0;
          }),
          hits,
          { color: C.violet, size: 8, name: 'hits yₙ', symbol: 'diamond' }
        ),
        {
          type: 'scatter',
          mode: 'lines+markers',
          x: hits.slice(0, -1),
          y: hits.slice(1),
          xaxis: 'x2',
          yaxis: 'y2',
          name: 'P: yₙ↦yₙ₊₁',
          line: { color: C.gold, width: 1.5 },
          marker: { size: 6, color: C.violet }
        },
        {
          type: 'scatter',
          mode: 'lines',
          x: [yMin, yMax],
          y: [yMin, yMax],
          xaxis: 'x2',
          yaxis: 'y2',
          name: 'diagonal',
          line: { color: C.dim, width: 1, dash: 'dot' }
        }
      ];
      var plotP = F.plot(el, traces, {
        height: 430,
        showlegend: true,
        grid: { rows: 1, columns: 2, pattern: 'independent' },
        title: 'van der Pol · section Σ and return map P',
        xaxis: { title: 'x', domain: [0, 0.48], range: [-2.6, 2.6], scaleanchor: 'y', scaleratio: 1 },
        yaxis: { title: 'y', range: [-2.6, 2.6] },
        xaxis2: { title: 'yₙ', domain: [0.58, 1], range: [yMin, yMax] },
        yaxis2: { title: 'yₙ₊₁', range: [yMin, yMax], anchor: 'x2', scaleanchor: 'x2', scaleratio: 1 }
      });
      F.setReadout(
        'fig5-poincare-readout',
        'μ=' +
          F.fmt(mu, 2) +
          ' · Σ={x=0, ẏ>0} · P:yₙ↦yₙ₊₁ · hits=' +
          hits.length +
          ' · |P′|≈' +
          mult +
          ' · attracting cycle ⇔ |P′|<1 fixed point on the diagonal'
      );
      return plotP;
    }
    F.bindRange('fig5-poincare-mu', function () {
      hits = [];
      state = { x: 1.2, y: 0 };
      trail = { x: [1.2], y: [0] };
      t = 0;
      el.__jbField = null;
    });
    draw();
    F.rafLoop(draw, 16, el);
  }

  function wireMorse() {
    var el = document.getElementById('fig5-morse-plot');
    if (!el) return;
    var play = true;
    var particles = [];
    for (var i = 0; i < 28; i++) {
      particles.push({
        th: Math.PI * (0.12 + 0.75 * Math.random()),
        ph: 2 * Math.PI * Math.random()
      });
    }
    F.bindButton('fig5-morse-play', function (btn) {
      play = !play;
      btn.textContent = play ? 'pause' : 'play';
    });

    function sph(th, ph) {
      return [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)];
    }

    /* static sphere / levels / flow built once */
    var uu = F.linspace(0, 2 * Math.PI, 28);
    var vv = F.linspace(0, Math.PI, 16);
    var Xs = [];
    var Ys = [];
    var Zs = [];
    for (i = 0; i < vv.length; i++) {
      var xr = [];
      var yr = [];
      var zr = [];
      for (var j = 0; j < uu.length; j++) {
        var p = sph(vv[i], uu[j]);
        xr.push(p[0]);
        yr.push(p[1]);
        zr.push(p[2]);
      }
      Xs.push(xr);
      Ys.push(yr);
      Zs.push(zr);
    }
    var levelTh = [0.4, Math.PI / 2, Math.PI - 0.4];
    var levels = levelTh.map(function (th, li) {
      return {
        type: 'scatter3d',
        mode: 'lines',
        x: uu.map(function (ph) {
          return sph(th, ph)[0];
        }),
        y: uu.map(function (ph) {
          return sph(th, ph)[1];
        }),
        z: uu.map(function (ph) {
          return sph(th, ph)[2];
        }),
        line: { color: li === 1 ? C.softG : C.softV, width: 3 },
        name: li === 0 ? 'level sets' : undefined,
        showlegend: li === 0
      };
    });
    var flowLines = [];
    for (var m = 0; m < 8; m++) {
      var ph0 = (m * Math.PI) / 4;
      var ths = F.linspace(0.06, Math.PI - 0.06, 32);
      flowLines.push({
        type: 'scatter3d',
        mode: 'lines',
        x: ths.map(function (t) {
          return sph(t, ph0)[0];
        }),
        y: ths.map(function (t) {
          return sph(t, ph0)[1];
        }),
        z: ths.map(function (t) {
          return sph(t, ph0)[2];
        }),
        line: { color: C.violet, width: 2.5 },
        showlegend: m === 0,
        name: m === 0 ? '−∇h flow' : undefined
      });
    }
    var static3d = [
      {
        type: 'surface',
        x: Xs,
        y: Ys,
        z: Zs,
        opacity: 0.28,
        surfacecolor: Zs,
        colorscale: [
          [0, '#1a1a1a'],
          [0.5, C.violet],
          [1, C.gold]
        ],
        showscale: false,
        hoverinfo: 'skip',
        name: 'S²'
      }
    ]
      .concat(levels)
      .concat(flowLines)
      .concat([
        {
          type: 'scatter3d',
          mode: 'markers+text',
          x: [0, 0],
          y: [0, 0],
          z: [1.08, -1.08],
          text: ['max · idx 2', 'min · idx 0'],
          textposition: 'middle right',
          textfont: { color: C.gold, size: 11 },
          marker: { size: 8, color: C.gold },
          name: 'crit pts'
        }
      ]);

    function draw() {
      if (play) {
        for (var i = 0; i < particles.length; i++) {
          var p = particles[i];
          p.th += 0.04 * Math.sin(p.th);
          if (p.th > Math.PI - 0.04) {
            p.th = 0.12 + 0.25 * Math.random();
            p.ph = 2 * Math.PI * Math.random();
          }
        }
      }
      var px = [];
      var py = [];
      var pz = [];
      for (i = 0; i < particles.length; i++) {
        var q = sph(particles[i].th, particles[i].ph);
        px.push(q[0]);
        py.push(q[1]);
        pz.push(q[2]);
      }
      var traces = static3d.concat([
        {
          type: 'scatter3d',
          mode: 'markers',
          x: px,
          y: py,
          z: pz,
          marker: { size: 3.5, color: C.fg },
          name: 'samples'
        }
      ]);
      return F.plot(el, traces, {
        height: 480,
        showlegend: true,
        title: 'Morse height h=z on S²',
        scene: {
          xTitle: 'x',
          yTitle: 'y',
          zTitle: 'z',
          aspectmode: 'cube',
          camera: el.__jbCam || { eye: { x: 1.45, y: 1.25, z: 0.95 } }
        },
        margin: { l: 0, r: 0, t: 42, b: 0 }
      });
    }
    F.setReadout(
      'fig5-morse-readout',
      'h=z on unit sphere · nondegenerate crits at poles only · indices: S min(0), N max(2) · −∇h runs N→S · Morse ≥ Poincaré polynomial 1+t² · Euler χ=2'
    );
    draw();
    F.rafLoop(draw, 14, el);
  }

  F.onReady(function () {
    wireSaddle();
    wirePoincare();
    wireMorse();
  });
})();
