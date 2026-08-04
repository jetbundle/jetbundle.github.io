/* Ch.8 bifurcation — SN, pitchfork, Hopf, BT organising sketch. */
(function () {
  'use strict';
  var F = window.JBFig;
  if (!F) return;
  var C = F.C;

  function wireSN() {
    var el = document.getElementById('fig8-sn-plot');
    if (!el) return;

    function draw() {
      var mu = parseFloat(document.getElementById('fig8-sn-mu').value, 10);
      var x = F.linspace(-1.6, 1.6, 300);
      var f = x.map(function (xi) {
        return mu - xi * xi;
      });
      var eqs = [];
      if (mu > 0) {
        eqs.push(Math.sqrt(mu));
        eqs.push(-Math.sqrt(mu));
      } else if (Math.abs(mu) < 1e-12) eqs.push(0);
      var traces = [
        F.line(x, f, { name: 'f(x)=μ−x²', color: C.violet, width: 2.5 }),
        F.line(x, x.map(function () { return 0; }), {
          name: '0',
          color: C.dim,
          width: 1,
          dash: 'dot',
          showlegend: false
        })
      ];
      eqs.forEach(function (xe, i) {
        var stable = -2 * xe < 0; /* f' = -2x */
        traces.push(
          F.markers([xe], [0], {
            name: i === 0 ? 'equilibria' : undefined,
            color: stable ? C.gold : C.warn,
            size: 11,
            symbol: stable ? 'circle' : 'circle-open',
            showlegend: i === 0
          })
        );
      });
      /* bifurcation diagram (μ,x) */
      var mus = F.linspace(-0.4, 1.2, 120);
      var xu = [];
      var xs = [];
      var mm = [];
      mus.forEach(function (m) {
        if (m >= 0) {
          mm.push(m);
          xs.push(Math.sqrt(m));
          xu.push(-Math.sqrt(m));
        }
      });
      traces.push({
        type: 'scatter',
        mode: 'lines',
        x: mm,
        y: xs,
        xaxis: 'x2',
        yaxis: 'y2',
        line: { color: C.gold, width: 2 },
        name: 'stable'
      });
      traces.push({
        type: 'scatter',
        mode: 'lines',
        x: mm,
        y: xu,
        xaxis: 'x2',
        yaxis: 'y2',
        line: { color: C.warn, width: 2, dash: 'dash' },
        name: 'unstable'
      });
      traces.push({
        type: 'scatter',
        mode: 'markers',
        x: [mu],
        y: eqs.length ? eqs : [null],
        xaxis: 'x2',
        yaxis: 'y2',
        marker: { color: C.fg, size: 10 },
        name: 'μ now',
        showlegend: false
      });

      F.plot(el, traces, {
        height: 400,
        showlegend: true,
        grid: { rows: 1, columns: 2, pattern: 'independent' },
        title: 'saddle–node · ẋ = μ − x²',
        xaxis: { title: 'x', domain: [0, 0.48] },
        yaxis: { title: 'f(x)' },
        xaxis2: { title: 'μ', domain: [0.58, 1] },
        yaxis2: { title: 'x_*', anchor: 'x2' }
      });
      F.setReadout(
        'fig8-sn-readout',
        'μ = ' +
          F.fmt(mu, 3) +
          (mu > 0
            ? ' · two eq ±√μ · stability by f′=−2x'
            : mu < 0
              ? ' · no real equilibria (annihilated)'
              : ' · birth/death at fold') +
          ' · normal form codimension-1'
      );
    }
    F.bindRange('fig8-sn-mu', draw);
    draw();
  }

  function wirePitch() {
    var el = document.getElementById('fig8-pitch-plot');
    if (!el) return;

    function draw() {
      var mu = parseFloat(document.getElementById('fig8-pitch-mu').value, 10);
      var kind = (document.getElementById('fig8-pitch-sign') || {}).value || 'super';
      var sign = kind === 'super' ? 1 : -1;
      /* ẋ = μ x − s x³  (s=+1 super, s=−1 sub) */
      var x = F.linspace(-1.8, 1.8, 300);
      var f = x.map(function (xi) {
        return mu * xi - sign * xi * xi * xi;
      });
      var eqs = [0];
      if (sign * mu > 0) {
        eqs.push(Math.sqrt(mu / sign));
        eqs.push(-Math.sqrt(mu / sign));
      }
      var traces = [
        F.line(x, f, { name: 'f(x)=μx∓x³', color: C.violet, width: 2.5 }),
        F.line(x, x.map(function () { return 0; }), { color: C.dim, width: 1, dash: 'dot', showlegend: false })
      ];
      /* flow arrows on the x-line: sign of f indicates direction */
      var flowX = [];
      var flowY = [];
      F.linspace(-1.6, 1.6, 17).forEach(function (xi) {
        var fi = mu * xi - sign * xi * xi * xi;
        if (Math.abs(fi) < 1e-4) return;
        var dir = fi > 0 ? 1 : -1;
        flowX.push(xi - 0.08 * dir, xi + 0.08 * dir, null);
        flowY.push(0.12 * Math.sign(fi), 0.12 * Math.sign(fi), null);
      });
      traces.push({
        type: 'scatter',
        mode: 'lines',
        x: flowX,
        y: flowY,
        line: { color: C.softG, width: 2 },
        name: 'flow',
        hoverinfo: 'skip'
      });
      eqs.forEach(function (xe, i) {
        var fp = mu - 3 * sign * xe * xe;
        traces.push(
          F.markers([xe], [0], {
            name: i === 0 ? (fp < 0 ? 'stable eq' : 'unstable eq') : undefined,
            color: fp < 0 ? C.gold : C.warn,
            size: 11,
            symbol: fp < 0 ? 'circle' : 'circle-open',
            showlegend: i === 0
          })
        );
      });
      /* bifurcation diagram with stability encoding */
      var mGrid = F.linspace(-1, 1, 160);
      var zeroStableX = [];
      var zeroStableY = [];
      var zeroUnstX = [];
      var zeroUnstY = [];
      var branchStableX = [];
      var branchStableY = [];
      var branchUnstX = [];
      var branchUnstY = [];
      mGrid.forEach(function (m) {
        /* x=0: f'=μ; stable when μ<0 for both super and sub? 
           super (s=1): f'=μ at 0, stable μ<0. sub (s=-1): f'=μ−0, same */
        if (m < 0) {
          zeroStableX.push(m);
          zeroStableY.push(0);
        } else if (m > 0) {
          zeroUnstX.push(m);
          zeroUnstY.push(0);
        }
        if (sign === 1 && m > 0) {
          var r = Math.sqrt(m);
          branchStableX.push(m, m);
          branchStableY.push(r, -r);
        }
        if (sign === -1 && m < 0) {
          r = Math.sqrt(-m);
          /* sub: ± branches exist for μ<0 but are unstable */
          branchUnstX.push(m, m);
          branchUnstY.push(r, -r);
        }
      });
      /* x=0 at μ=0 is the bif point */
      traces.push({
        type: 'scatter',
        mode: 'lines',
        x: zeroStableX,
        y: zeroStableY,
        xaxis: 'x2',
        yaxis: 'y2',
        line: { color: C.gold, width: 3 },
        name: 'stable x=0'
      });
      traces.push({
        type: 'scatter',
        mode: 'lines',
        x: zeroUnstX,
        y: zeroUnstY,
        xaxis: 'x2',
        yaxis: 'y2',
        line: { color: C.warn, width: 3, dash: 'dash' },
        name: 'unstable x=0'
      });
      if (branchStableX.length) {
        traces.push({
          type: 'scatter',
          mode: 'markers',
          x: branchStableX,
          y: branchStableY,
          xaxis: 'x2',
          yaxis: 'y2',
          marker: { color: C.gold, size: 3 },
          name: '±√μ stable'
        });
      }
      if (branchUnstX.length) {
        traces.push({
          type: 'scatter',
          mode: 'markers',
          x: branchUnstX,
          y: branchUnstY,
          xaxis: 'x2',
          yaxis: 'y2',
          marker: { color: C.warn, size: 3, symbol: 'circle-open' },
          name: '±√|μ| unstable'
        });
      }
      traces.push({
        type: 'scatter',
        mode: 'markers',
        x: [mu],
        y: eqs,
        xaxis: 'x2',
        yaxis: 'y2',
        marker: { color: C.fg, size: 9 },
        name: 'μ now',
        showlegend: false
      });

      F.plot(el, traces, {
        height: 420,
        showlegend: true,
        grid: { rows: 1, columns: 2, pattern: 'independent' },
        title: (kind === 'super' ? 'super' : 'sub') + 'critical pitchfork',
        xaxis: { title: 'x', domain: [0, 0.48] },
        yaxis: { title: 'f(x)' },
        xaxis2: { title: 'μ', domain: [0.58, 1], range: [-1.05, 1.05] },
        yaxis2: { title: 'x_*', anchor: 'x2', range: [-1.5, 1.5] }
      });
      F.setReadout(
        'fig8-pitch-readout',
        'μ=' +
          F.fmt(mu, 3) +
          ' · ' +
          kind +
          'critical · f(−x)=−f(x) forces odd normal form · gold=stable, red=unstable · ' +
          (sign === 1
            ? 'super: supercritical pitchfork, ±√μ born stable as μ crosses 0'
            : 'sub: subcritical, ±√|μ| unstable for μ<0; jump when 0 loses stability') +
          ' · pure SN of x=0 forbidden by ℤ₂'
      );
    }
    F.bindRange('fig8-pitch-mu', draw);
    F.bindSelect('fig8-pitch-sign', draw);
    draw();
  }

  function wireHopf() {
    var el = document.getElementById('fig8-hopf-plot');
    if (!el) return;
    var play = true;
    var state = { x: 0.3, y: 0 };
    var trail = { x: [0.3], y: [0] };
    F.bindButton('fig8-hopf-play', function (btn) {
      play = !play;
      btn.textContent = play ? 'pause' : 'play';
    });
    var th = F.linspace(0, 2 * Math.PI, 80);
    var rr = F.linspace(0, 1.55, 60);

    function draw() {
      var mu = parseFloat((document.getElementById('fig8-hopf-mu') || {}).value || 0.4, 10);
      /* ẋ = μx − y − x(x²+y²), ẏ = x + μy − y(x²+y²)  supercritical Hopf */
      var f = function (x, y) {
        var r2 = x * x + y * y;
        return [mu * x - y - x * r2, x + mu * y - y * r2];
      };
      if (play) {
        for (var k = 0; k < 3; k++) {
          var u = F.rk4step(
            function (tt, v) {
              return f(v[0], v[1]);
            },
            0,
            [state.x, state.y],
            0.05
          );
          state.x = u[0];
          state.y = u[1];
          trail.x.push(state.x);
          trail.y.push(state.y);
          F.capTrail(trail.x, 180, 120);
          F.capTrail(trail.y, 180, 120);
        }
      }
      var R = mu > 0 ? Math.sqrt(mu) : 0;
      if (!el.__jbHopfField || el.__jbHopfMu !== mu) {
        el.__jbHopfMu = mu;
        el.__jbHopfField = F.quiver(f, [-1.6, 1.6], [-1.6, 1.6], 8, 8, {
          color: C.softV,
          scale: 0.14,
          name: 'field'
        });
        var rdot = rr.map(function (ri) {
          return mu * ri - ri * ri * ri;
        });
        el.__jbHopfRdot = {
          type: 'scatter',
          mode: 'lines',
          x: rr,
          y: rdot,
          xaxis: 'x2',
          yaxis: 'y2',
          name: 'ṙ(r)',
          line: { color: C.violet, width: 2.4 }
        };
        el.__jbHopfZero = {
          type: 'scatter',
          mode: 'lines',
          x: rr,
          y: rr.map(function () {
            return 0;
          }),
          xaxis: 'x2',
          yaxis: 'y2',
          showlegend: false,
          line: { color: C.dim, width: 1, dash: 'dot' }
        };
      }
      /* fixed-length trace list so restyle stays on the fast path */
      var cycleX =
        R > 0
          ? th.map(function (u) {
              return R * Math.cos(u);
            })
          : [0];
      var cycleY =
        R > 0
          ? th.map(function (u) {
              return R * Math.sin(u);
            })
          : [0];
      var r = Math.hypot(state.x, state.y);
      var traces = [
        el.__jbHopfField,
        F.line(trail.x, trail.y, { name: 'orbit', color: C.violet, width: 2 }),
        F.line(cycleX, cycleY, {
          name: 'cycle r=√μ',
          color: C.gold,
          width: R > 0 ? 2.5 : 0,
          dash: 'dash'
        }),
        F.markers([0], [0], { name: '0', color: mu < 0 ? C.gold : C.warn, size: 10 }),
        F.markers([state.x], [state.y], { name: 'state', color: C.fg, size: 8 }),
        el.__jbHopfRdot,
        el.__jbHopfZero,
        {
          type: 'scatter',
          mode: 'markers',
          x: [R > 0 ? R : 0],
          y: [0],
          xaxis: 'x2',
          yaxis: 'y2',
          marker: { color: C.gold, size: R > 0 ? 10 : 0 },
          name: 'ṙ=0',
          showlegend: R > 0
        },
        {
          type: 'scatter',
          mode: 'markers',
          x: [r],
          y: [mu * r - r * r * r],
          xaxis: 'x2',
          yaxis: 'y2',
          marker: { color: C.fg, size: 8, symbol: 'x' },
          name: 'current r',
          showlegend: false
        }
      ];

      F.setReadout(
        'fig8-hopf-readout',
        'μ=' +
          F.fmt(mu, 3) +
          ' · λ=μ±i · polar: ṙ=μr−r³, θ̇=1 · ' +
          (mu > 0
            ? 'stable cycle r=√μ=' + F.fmt(R, 4) + ' · |r−√μ|=' + F.fmt(Math.abs(r - R), 3)
            : 'focus at 0 asymptotically stable · no real cycle') +
          ' · Hopf: transverse imag-axis crossing births the cycle'
      );
      return F.plot(el, traces, {
        height: 430,
        showlegend: true,
        grid: { rows: 1, columns: 2, pattern: 'independent' },
        title: 'supercritical Hopf · polar ṙ = μr − r³',
        xaxis: { title: 'x', domain: [0, 0.48], range: [-1.7, 1.7], scaleanchor: 'y', scaleratio: 1 },
        yaxis: { title: 'y', range: [-1.7, 1.7] },
        xaxis2: { title: 'r', domain: [0.58, 1], range: [0, 1.6] },
        yaxis2: { title: 'ṙ', range: [-1.2, 0.8], anchor: 'x2' }
      });
    }
    F.bindRange('fig8-hopf-mu', function () {
      state = { x: 0.3, y: 0 };
      trail = { x: [0.3], y: [0] };
      el.__jbHopfField = null;
    });
    draw();
    F.rafLoop(draw, 16, el);
  }

  function wireBT() {
    var el = document.getElementById('fig8-bt-plot');
    if (!el) return;
    var play = true;
    var state = { x: 0.2, y: 0.1 };
    var trail = { x: [0.2], y: [0.1] };
    F.bindButton('fig8-bt-play', function (btn) {
      play = !play;
      btn.textContent = play ? 'pause' : 'play';
    });
    var bs = F.linspace(-1.5, 1.5, 60);
    var b1sn = bs.map(function (b) {
      return (b * b) / 4;
    });
    var snCurve = {
      type: 'scatter',
      mode: 'lines',
      x: b1sn,
      y: bs,
      xaxis: 'x2',
      yaxis: 'y2',
      line: { color: C.gold, width: 2 },
      name: 'SN: Δ=0'
    };

    function draw() {
      var b1 = parseFloat(document.getElementById('fig8-bt-b1').value, 10);
      var b2 = parseFloat(document.getElementById('fig8-bt-b2').value, 10);
      /* BT: ẋ=y, ẏ=β1+β2 x + x² + x y  (truncated) */
      var f = function (x, y) {
        return [y, b1 + b2 * x + x * x + x * y];
      };
      if (play) {
        for (var k = 0; k < 3; k++) {
          var u = F.rk4step(
            function (tt, v) {
              return f(v[0], v[1]);
            },
            0,
            [state.x, state.y],
            0.05
          );
          state.x = u[0];
          state.y = u[1];
          trail.x.push(state.x);
          trail.y.push(state.y);
          F.capTrail(trail.x, 220, 150);
          F.capTrail(trail.y, 220, 150);
          if (Math.abs(state.x) > 3 || Math.abs(state.y) > 3) {
            state = { x: 0.15, y: 0.05 };
            trail = { x: [state.x], y: [state.y] };
          }
        }
      }
      /* equilibria: y=0, x² + β2 x + β1 = 0 */
      var disc = b2 * b2 - 4 * b1;
      var e1 = null;
      var e2 = null;
      if (disc >= 0) {
        e1 = (-b2 + Math.sqrt(disc)) / 2;
        e2 = (-b2 - Math.sqrt(disc)) / 2;
      }
      var key = b1 + ',' + b2;
      if (!el.__jbBTField || el.__jbBTKey !== key) {
        el.__jbBTKey = key;
        el.__jbBTField = F.quiver(f, [-2, 2], [-2, 2], 9, 9, {
          color: C.softV,
          scale: 0.14,
          name: 'field'
        });
      }
      var traces = [
        el.__jbBTField,
        F.line(trail.x, trail.y, { name: 'orbit', color: C.violet, width: 2 }),
        F.markers([e1 != null ? e1 : 0], [0], {
          name: 'eq',
          color: C.gold,
          size: e1 != null ? 10 : 0
        }),
        F.markers([e2 != null ? e2 : 0], [0], {
          name: 'eq2',
          color: C.gold,
          size: e2 != null ? 10 : 0,
          showlegend: false
        }),
        snCurve,
        {
          type: 'scatter',
          mode: 'markers',
          x: [b1],
          y: [b2],
          xaxis: 'x2',
          yaxis: 'y2',
          marker: { color: C.fg, size: 11 },
          name: 'params'
        }
      ];

      var plotP = F.plot(el, traces, {
        height: 420,
        showlegend: true,
        grid: { rows: 1, columns: 2, pattern: 'independent' },
        title: 'Bogdanov–Takens unfolding',
        xaxis: { title: 'x', domain: [0, 0.5], range: [-2.2, 2.2], scaleanchor: 'y', scaleratio: 1 },
        yaxis: { title: 'y', range: [-2.2, 2.2] },
        xaxis2: { title: 'β₁', domain: [0.6, 1], range: [-0.8, 1.2] },
        yaxis2: { title: 'β₂', range: [-1.5, 1.5], anchor: 'x2' }
      });
      F.setReadout(
        'fig8-bt-readout',
        'β₁=' +
          F.fmt(b1, 3) +
          ', β₂=' +
          F.fmt(b2, 3) +
          ' · Δ=β₂²−4β₁ = ' +
          F.fmt(disc, 4) +
          (disc > 0 ? ' · two equilibria' : disc === 0 ? ' · SN coalescence' : ' · none') +
          ' · BT organises SN / Hopf / homoclinic loci in the (β₁,β₂) plane'
      );
      return plotP;
    }
    F.bindRange('fig8-bt-b1', function () {
      state = { x: 0.2, y: 0.1 };
      trail = { x: [0.2], y: [0.1] };
      el.__jbBTField = null;
    });
    F.bindRange('fig8-bt-b2', function () {
      state = { x: 0.2, y: 0.1 };
      trail = { x: [0.2], y: [0.1] };
      el.__jbBTField = null;
    });
    draw();
    F.rafLoop(draw, 16, el);
  }

  F.onReady(function () {
    wireSN();
    wirePitch();
    wireHopf();
    wireBT();
  });
})();
