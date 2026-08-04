/* Ch.7 control — Chow, Kalman reachable sets, PMP geometry, bang-bang, unicycle. */
(function () {
  'use strict';
  var F = window.JBFig;
  if (!F) return;
  var C = F.C;

  function wireChow() {
    var el = document.getElementById('fig7-chow-plot');
    if (!el) return;
    var play = true;
    F.bindButton('fig7-chow-play', function (btn) {
      play = !play;
      btn.textContent = play ? 'pause' : 'play';
    });
    function flow1(p, s) {
      return [p[0] + s, p[1], p[2] + s * p[1]];
    }
    function flow2(p, s) {
      return [p[0], p[1] + s, p[2] - s * p[0]];
    }
    var phase = 0;
    function draw() {
      var eps = parseFloat((document.getElementById('fig7-chow-eps') || {}).value || 0.55, 10);
      if (play) phase = (phase + 0.025) % 1;
      var e = eps * Math.min(1, 0.2 + phase);
      var p0 = [0, 0, 0];
      var p1 = flow1(p0, e);
      var p2 = flow2(p1, e);
      var p3 = flow1(p2, -e);
      var p4 = flow2(p3, -e);
      var delta = [p4[0] - p0[0], p4[1] - p0[1], p4[2] - p0[2]];
      var theoryZ = -2 * e * e;
      var path = [p0, p1, p2, p3, p4];
      /* also draw f1, f2 vector fields samples on xy plane z=0 */
      var vline = [];
      var xs = F.linspace(-0.8, 0.8, 5);
      xs.forEach(function (x) {
        xs.forEach(function (y) {
          /* f1=(1,0,y), f2=(0,1,-x) short arrows in 3d */
          vline.push({
            type: 'scatter3d',
            mode: 'lines',
            x: [x, x + 0.2],
            y: [y, y],
            z: [0, 0.2 * y],
            line: { color: C.softV, width: 3 },
            showlegend: false,
            hoverinfo: 'skip'
          });
          vline.push({
            type: 'scatter3d',
            mode: 'lines',
            x: [x, x],
            y: [y, y + 0.2],
            z: [0, -0.2 * x],
            line: { color: C.softG, width: 3 },
            showlegend: false,
            hoverinfo: 'skip'
          });
        });
      });
      /* order check scatter for several ε */
      var es = F.linspace(0.15, 0.9, 12);
      var zs = es.map(function (ee) {
        var q = flow2(flow1(flow2(flow1([0, 0, 0], ee), ee), -ee), -ee);
        return q[2];
      });
      var theory = es.map(function (ee) {
        return -2 * ee * ee;
      });

      F.plot(
        el,
        vline
          .concat([
            {
              type: 'scatter3d',
              mode: 'lines+markers',
              x: path.map(function (p) {
                return p[0];
              }),
              y: path.map(function (p) {
                return p[1];
              }),
              z: path.map(function (p) {
                return p[2];
              }),
              line: { color: C.gold, width: 7 },
              marker: { size: 3, color: C.fg },
              name: 'Φ-commutator loop'
            },
            {
              type: 'scatter3d',
              mode: 'lines',
              x: [0, 0],
              y: [0, 0],
              z: [0, theoryZ],
              line: { color: C.violet, width: 6 },
              name: 'ε²[f₁,f₂] · (−2ε²∂z)'
            }
          ]),
        {
          height: 430,
          showlegend: true,
          title: 'Heisenberg distribution · bracket fills the missing direction',
          scene: {
            xTitle: 'x',
            yTitle: 'y',
            zTitle: 'z',
            aspectmode: 'cube',
            camera: { eye: { x: 1.6, y: 1.4, z: 1.1 } }
          },
          margin: { l: 0, r: 0, t: 40, b: 0 }
        }
      );
      F.setReadout(
        'fig7-chow-readout',
        'ε=' +
          F.fmt(e, 3) +
          ' · Δz=' +
          F.fmt(delta[2], 4) +
          ' · −2ε²=' +
          F.fmt(theoryZ, 4) +
          ' · |error|=' +
          F.fmt(Math.abs(delta[2] - theoryZ), 2) +
          ' · violet/green micro-arrows = f₁,f₂ · LARC span{f₁,f₂,[f₁,f₂]}=ℝ³ ⇒ accessible'
      );
    }
    F.bindRange('fig7-chow-eps', draw);
    F.rafLoop(draw, 16, el);
  }

  function wireKalman() {
    var el = document.getElementById('fig7-kalman-plot');
    if (!el) return;

    function draw() {
      var a = parseFloat(document.getElementById('fig7-kalman-a').value, 10);
      var T = parseFloat(document.getElementById('fig7-kalman-t').value, 10);
      var A = [
        [0, 1],
        [0, a]
      ];
      var B = [0, 1];
      var AB = [A[0][0] * B[0] + A[0][1] * B[1], A[1][0] * B[0] + A[1][1] * B[1]];
      var detK = B[0] * AB[1] - B[1] * AB[0];

      /* reachable set approx: integrate ẋ=Ax+Bu for many bang sequences (Euler) */
      var pts = [];
      var N = 28;
      for (var i = 0; i < N; i++) {
        var switches = (i + 1) / N;
        var x = [0, 0];
        var steps = 80;
        var dt = T / steps;
        for (var s = 0; s < steps; s++) {
          var u = s / steps < switches ? 1 : -1;
          /* alternate pattern */
          if (i % 3 === 1) u = Math.sin((s + 1) * Math.PI * (i + 1) / steps) >= 0 ? 1 : -1;
          if (i % 3 === 2) u = s < steps / 2 ? -1 : 1;
          var f0 = A[0][0] * x[0] + A[0][1] * x[1] + B[0] * u;
          var f1 = A[1][0] * x[0] + A[1][1] * x[1] + B[1] * u;
          x = [x[0] + dt * f0, x[1] + dt * f1];
        }
        pts.push(x);
      }
      /* also continuous family of constant-u */
      [-1, -0.5, 0, 0.5, 1].forEach(function (u) {
        var x = [0, 0];
        var steps = 80;
        var dt = T / steps;
        var pathx = [0];
        var pathy = [0];
        for (var s = 0; s < steps; s++) {
          var f0 = A[0][0] * x[0] + A[0][1] * x[1] + B[0] * u;
          var f1 = A[1][0] * x[0] + A[1][1] * x[1] + B[1] * u;
          x = [x[0] + dt * f0, x[1] + dt * f1];
          pathx.push(x[0]);
          pathy.push(x[1]);
        }
        pts.push(x);
      });

      var traces = [
        F.line(
          [0, B[0] * 0.9],
          [0, B[1] * 0.9],
          { name: 'B', color: C.gold, width: 3 }
        ),
        F.line(
          [0, AB[0] * 0.5],
          [0, AB[1] * 0.5],
          { name: 'AB', color: C.violet, width: 3 }
        ),
        {
          type: 'scatter',
          mode: 'markers',
          x: pts.map(function (p) {
            return p[0];
          }),
          y: pts.map(function (p) {
            return p[1];
          }),
          marker: { color: C.softG, size: 8 },
          name: 'x(T) samples (reachable cloud)'
        },
        F.markers([0], [0], { name: '0', color: C.fg, size: 9 })
      ];
      /* demo trajectory from bang sin */
      var t = F.linspace(0, T, 200);
      var x = [0, 0];
      var xs = [0];
      var ys = [0];
      var dt = t[1] - t[0];
      for (var j = 1; j < t.length; j++) {
        var u2 = Math.sin((2 * Math.PI * t[j]) / Math.max(T, 1e-6)) >= 0 ? 1 : -1;
        var ff0 = A[0][0] * x[0] + A[0][1] * x[1] + B[0] * u2;
        var ff1 = A[1][0] * x[0] + A[1][1] * x[1] + B[1] * u2;
        x = [x[0] + dt * ff0, x[1] + dt * ff1];
        xs.push(x[0]);
        ys.push(x[1]);
      }
      traces.push(F.line(xs, ys, { name: 'sample control orbit', color: C.gold, width: 2.2 }));

      F.plot(el, traces, {
        height: 400,
        showlegend: true,
        title: 'LTI controllability · Kalman span{B,AB} = reachable directions',
        xaxis: { title: 'x₁', scaleanchor: 'y', scaleratio: 1 },
        yaxis: { title: 'x₂' }
      });
      F.setReadout(
        'fig7-kalman-readout',
        'a=' +
          F.fmt(a, 2) +
          ' · T=' +
          F.fmt(T, 2) +
          ' · det[B AB]=' +
          F.fmt(detK, 4) +
          (Math.abs(detK) > 1e-10
            ? ' ≠0 full rank · green cloud ≈ slice of reachable set from 0 in time T with |u|≤1'
            : ' singular · not controllable') +
          ' · B, AB are the Lie algebra generators in the LTI case'
      );
    }
    F.bindRange('fig7-kalman-a', draw);
    F.bindRange('fig7-kalman-t', draw);
    draw();
  }

  function wirePMP() {
    var el = document.getElementById('fig7-pmp-plot');
    if (!el) return;

    function draw() {
      var lam = parseFloat(document.getElementById('fig7-pmp-lam').value, 10);
      var mode = (document.getElementById('fig7-pmp-mode') || {}).value || 'bang';
      var uu = F.linspace(-1.25, 1.25, 220);
      var H =
        mode === 'singular'
          ? uu.map(function (u) {
              return lam * u - 0.5 * u * u;
            })
          : uu.map(function (u) {
              return lam * u;
            });
      var uStar = mode === 'singular' ? F.clamp(lam, -1, 1) : lam >= 0 ? 1 : -1;
      var Hstar =
        mode === 'singular' ? lam * uStar - 0.5 * uStar * uStar : lam * uStar;
      /* switching function σ=λ for bang; drawn on secondary as constant with threshold */
      var tt = F.linspace(0, 2, 80);
      var sigma = tt.map(function (t) {
        return lam - 0.65 * t; /* illustrative drifting costate crossing 0 */
      });

      F.plot(
        el,
        [
          F.line(uu, H, { name: 'H(·,u)', color: C.violet, width: 2.6 }),
          F.line([-1, -1], [-2.5, 2.5], { name: '∂U', color: C.dim, width: 1, dash: 'dot' }),
          F.line([1, 1], [-2.5, 2.5], { color: C.dim, width: 1, dash: 'dot', showlegend: false }),
          F.markers([uStar], [Hstar], { name: 'u*(maximiser)', color: C.gold, size: 13 }),
          /* shade admissible U */
          {
            type: 'scatter',
            mode: 'lines',
            x: [-1, 1, 1, -1, -1],
            y: [-2.5, -2.5, 2.5, 2.5, -2.5],
            fill: 'toself',
            fillcolor: 'rgba(174,147,236,0.06)',
            line: { width: 0 },
            name: 'admissible U',
            showlegend: true
          },
          F.line(tt, sigma, {
            name: 'σ(t) switching fn',
            color: C.gold,
            width: 2,
            xaxis: 'x2',
            yaxis: 'y2'
          }),
          F.line(tt, tt.map(function () { return 0; }), {
            color: C.dim,
            width: 1,
            dash: 'dot',
            xaxis: 'x2',
            yaxis: 'y2',
            showlegend: false
          }),
          F.line(
            tt,
            tt.map(function (t, i) {
              return sigma[i] >= 0 ? 1 : -1;
            }),
            {
              name: 'u=sign σ',
              color: C.violet,
              width: 2,
              xaxis: 'x2',
              yaxis: 'y2'
            }
          )
        ],
        {
          height: 400,
          showlegend: true,
          grid: { rows: 1, columns: 2, pattern: 'independent' },
          title: 'PMP: maximise H over U · bang from zero-crossing of σ',
          xaxis: { title: 'control u', domain: [0, 0.46], range: [-1.3, 1.3] },
          yaxis: { title: 'H', range: [-2.4, 2.4] },
          xaxis2: { title: 't', domain: [0.56, 1] },
          yaxis2: { title: 'σ, u', anchor: 'x2' }
        }
      );
      F.setReadout(
        'fig7-pmp-readout',
        'λ=' +
          F.fmt(lam, 2) +
          ' · ' +
          mode +
          ' · u*=' +
          F.fmt(uStar, 3) +
          ' · H*=' +
          F.fmt(Hstar, 3) +
          ' · left: pointwise maximality on U=[-1,1] · right: illustration that u=sign σ except on singular arcs (σ≡0)'
      );
    }
    F.bindRange('fig7-pmp-lam', draw);
    F.bindSelect('fig7-pmp-mode', draw);
    draw();
  }

  function wireBang() {
    var el = document.getElementById('fig7-bang-plot');
    if (!el) return;
    var play = true;
    var t = 0;
    F.bindButton('fig7-bang-play', function (btn) {
      play = !play;
      btn.textContent = play ? 'pause' : 'play';
    });

    function buildCurves(tsw) {
      var T = Math.max(2.8, tsw + 1.4);
      var tt = F.linspace(0, T, 140);
      var x = [];
      var v = [];
      var sig = [];
      var xx = 0;
      var vv = 0;
      var phaseX = [];
      var phaseV = [];
      for (var i = 0; i < tt.length; i++) {
        var ti = tt[i];
        var u = ti < tsw ? 1 : -1;
        if (i > 0) {
          var dt = tt[i] - tt[i - 1];
          xx += vv * dt + 0.5 * u * dt * dt;
          vv += u * dt;
        }
        x.push(xx);
        v.push(vv);
        sig.push(tsw - ti);
        phaseX.push(xx);
        phaseV.push(vv);
      }
      return { T: T, tt: tt, x: x, v: v, sig: sig, phaseX: phaseX, phaseV: phaseV };
    }

    function draw() {
      if (play) t += 0.03;
      var tsw = parseFloat((document.getElementById('fig7-bang-tsw') || {}).value || 1, 10);
      if (!el.__jbBang || el.__jbBangTsw !== tsw) {
        el.__jbBangTsw = tsw;
        el.__jbBang = buildCurves(tsw);
      }
      var cur = el.__jbBang;
      var tMark = Math.min(t % (cur.T + 0.5), cur.T);
      var idx = Math.min(cur.tt.length - 1, Math.floor((tMark / cur.T) * (cur.tt.length - 1)));

      var plotP = F.plot(
        el,
        [
          F.line(cur.phaseX, cur.phaseV, {
            name: 'phase curve (x,v)',
            color: C.violet,
            width: 2.4
          }),
          F.markers([cur.phaseX[idx]], [cur.phaseV[idx]], { name: 'state', color: C.gold, size: 10 }),
          F.line(cur.tt, cur.x, {
            name: 'x(t)',
            color: C.violet,
            width: 1.8,
            xaxis: 'x2',
            yaxis: 'y2'
          }),
          F.line(cur.tt, cur.v, {
            name: 'v(t)',
            color: C.gold,
            width: 1.8,
            xaxis: 'x2',
            yaxis: 'y2'
          }),
          F.line(cur.tt, cur.sig, {
            name: 'σ(t)',
            color: C.fg,
            width: 1.4,
            dash: 'dash',
            xaxis: 'x2',
            yaxis: 'y2'
          }),
          F.line([tsw, tsw], [-2.5, 3.5], {
            name: 'switch',
            color: C.dim,
            width: 1,
            dash: 'dot',
            xaxis: 'x2',
            yaxis: 'y2'
          })
        ],
        {
          height: 400,
          showlegend: true,
          grid: { rows: 1, columns: 2, pattern: 'independent' },
          title: 'double integrator bang-bang · phase portrait + time history',
          xaxis: { title: 'x', domain: [0, 0.44], scaleanchor: 'y', scaleratio: 1 },
          yaxis: { title: 'v' },
          xaxis2: { title: 't', domain: [0.54, 1] },
          yaxis2: { title: 'x, v, σ', anchor: 'x2' }
        }
      );
      F.setReadout(
        'fig7-bang-readout',
        't=' +
          F.fmt(tMark, 2) +
          ' · t_s=' +
          F.fmt(tsw, 2) +
          ' · u=' +
          (tMark < tsw ? '+1' : '−1') +
          ' · phase portrait shows the classic parabolic bang arcs; σ zero-crossing forces the switch (PMP)'
      );
      return plotP;
    }
    F.bindRange('fig7-bang-tsw', function () {
      el.__jbBang = null;
      draw();
    });
    F.rafLoop(draw, 16, el);
  }

  function wireUnicycle() {
    var el = document.getElementById('fig7-unicycle-plot');
    if (!el) return;
    var play = true;
    var s = { x: 0, y: 0, th: 0 };
    var trail = { x: [0], y: [0] };
    var park = []; /* parallel-parking style sequence of controls */
    var mode = 0;
    var modeT = 0;
    F.bindButton('fig7-unicycle-play', function (btn) {
      play = !play;
      btn.textContent = play ? 'pause' : 'play';
    });

    function draw() {
      var v = parseFloat((document.getElementById('fig7-unicycle-v') || {}).value || 0.7, 10);
      var om = parseFloat((document.getElementById('fig7-unicycle-om') || {}).value || 0.6, 10);
      var maxRes = 0;
      if (play) {
        for (var k = 0; k < 5; k++) {
          var dt = 0.018;
          /* show that only rolling-compatible (v,ω) keep residual 0; sideward velocity is forbidden */
          var dx = v * Math.cos(s.th);
          var dy = v * Math.sin(s.th);
          maxRes = Math.max(maxRes, Math.abs(Math.sin(s.th) * dx - Math.cos(s.th) * dy));
          s.x += dt * dx;
          s.y += dt * dy;
          s.th += dt * om;
          trail.x.push(s.x);
          trail.y.push(s.y);
          F.capTrail(trail.x, 260, 180);
          F.capTrail(trail.y, 260, 180);
          if (Math.hypot(s.x, s.y) > 3.2) {
            s = { x: 0, y: 0, th: 0 };
            trail = { x: [0], y: [0] };
          }
        }
      }
      /* forbidden direction arrow (wheel axle) */
      var ax = s.x - 0.35 * Math.sin(s.th);
      var ay = s.y + 0.35 * Math.cos(s.th);
      var hx = s.x + 0.35 * Math.cos(s.th);
      var hy = s.y + 0.35 * Math.sin(s.th);

      var plotP = F.plot(
        el,
        [
          F.line(trail.x, trail.y, { name: 'trajectory', color: C.violet, width: 2.2 }),
          F.markers([s.x], [s.y], { name: 'body', color: C.gold, size: 11 }),
          F.line([s.x, hx], [s.y, hy], { name: 'allowed direction', color: C.gold, width: 2.5 }),
          F.line([s.x, ax], [s.y, ay], {
            name: 'forbidden lateral',
            color: C.warn,
            width: 2,
            dash: 'dash'
          }),
          /* unit circle of velocities at origin for legend of D */
        ],
        {
          height: 400,
          showlegend: true,
          title: 'unicycle distribution D ⊂ Tℝ²  (non-integrable)',
          xaxis: { title: 'x', range: [-2.6, 2.6], scaleanchor: 'y', scaleratio: 1 },
          yaxis: { title: 'y', range: [-2.6, 2.6] }
        }
      );
      F.setReadout(
        'fig7-unicycle-readout',
        'v=' +
          F.fmt(v, 2) +
          ' ω=' +
          F.fmt(om, 2) +
          ' θ=' +
          F.fmt(s.th, 2) +
          ' · residual |sinθ ẋ−cosθ ẏ|=' +
          F.fmt(maxRes, 2) +
          ' · gold = allowed velocity in D · red dashed = side-slip (not in D) · parallel parking needs brackets in SE(2)'
      );
      return plotP;
    }
    F.bindRange('fig7-unicycle-v', draw);
    F.bindRange('fig7-unicycle-om', draw);
    F.rafLoop(draw, 16, el);
  }

  F.onReady(function () {
    wireChow();
    wireKalman();
    wirePMP();
    wireBang();
    wireUnicycle();
  });
})();
