/* Chapter 1 canvas panels — palette matches /styles.css (:root --link, --link-hover, --bg, --fg, --dim) */
(function () {
  'use strict';

  var GRID = '#222';
  var VIOLET = '#ae93ec';
  var GOLD = '#e7b597';
  var DIM = '#6a6a6a';
  var FG = '#c4c4c4';
  var BG = '#000';
  var MUTED_GRID = 'rgba(174,147,236,0.12)';

  function clamp(x, lo, hi) {
    return Math.max(lo, Math.min(hi, x));
  }

  function setupHiDPI(canvas, cssW, cssH) {
    var dpr = window.devicePixelRatio || 1;
    canvas.style.width = cssW + 'px';
    canvas.style.height = cssH + 'px';
    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
    var ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return ctx;
  }

  /* ---------- §1.2 affine row projection ---------- */
  function x1(s, t) {
    return 6 - 2 * s - 3 * t;
  }
  function x2(s) {
    return s;
  }

  function wireAffine() {
    var canvas = document.getElementById('affine-canvas');
    var sEl = document.getElementById('affine-s');
    var tEl = document.getElementById('affine-t');
    if (!canvas || !sEl || !tEl) return;

    var cssW = 520;
    var cssH = 220;

    function draw() {
      var s = parseFloat(sEl.value, 10);
      var t = parseFloat(tEl.value, 10);
      var ctx = setupHiDPI(canvas, cssW, cssH);
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, cssW, cssH);
      var cx = cssW * 0.45;
      var cy = cssH * 0.55;
      var scale = (cssW / 520) * 18;
      ctx.strokeStyle = GRID;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(cssW, cy);
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, cssH);
      ctx.stroke();
      ctx.strokeStyle = VIOLET;
      ctx.globalAlpha = 0.42;
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      for (var u = -3; u <= 4; u += 0.02) {
        var xx = x1(u, t);
        var yy = x2(u);
        var px = cx + xx * scale;
        var py = cy - yy * scale;
        if (u <= -2.99) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
      var xx0 = x1(s, t);
      var yy0 = x2(s);
      ctx.fillStyle = GOLD;
      ctx.beginPath();
      ctx.arc(cx + xx0 * scale, cy - yy0 * scale, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = DIM;
      ctx.font = '11px ui-monospace, Menlo, monospace';
      ctx.fillText(
        's=' +
          s.toFixed(2) +
          '  t=' +
          t.toFixed(2) +
          '  →  (x₁,x₂)=(' +
          xx0.toFixed(2) +
          ', ' +
          yy0.toFixed(2) +
          ')',
        10,
        cssH - 8
      );
    }

    sEl.addEventListener('input', draw);
    tEl.addEventListener('input', draw);
    draw();
  }

  /* ---------- §1.2 basis span ---------- */
  function wireBasisSpan() {
    var canvas = document.getElementById('basis-canvas');
    if (!canvas) return;
    var u1 = document.getElementById('basis-u1');
    var u2 = document.getElementById('basis-u2');
    var v1 = document.getElementById('basis-v1');
    var v2 = document.getElementById('basis-v2');
    if (!u1 || !u2 || !v1 || !v2) return;

    var cssW = 520;
    var cssH = 220;

    function draw() {
      var U1 = parseFloat(u1.value, 10);
      var U2 = parseFloat(u2.value, 10);
      var V1 = parseFloat(v1.value, 10);
      var V2 = parseFloat(v2.value, 10);
      var ctx = setupHiDPI(canvas, cssW, cssH);
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, cssW, cssH);
      var cx = cssW * 0.5;
      var cy = cssH * 0.52;
      var sc = 38;
      function X(x, y) {
        return cx + x * sc;
      }
      function Y(x, y) {
        return cy - y * sc;
      }
      ctx.strokeStyle = GRID;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, Y(0, 0));
      ctx.lineTo(cssW, Y(0, 0));
      ctx.moveTo(X(0, 0), 0);
      ctx.lineTo(X(0, 0), cssH);
      ctx.stroke();
      var ox = 0,
        oy = 0;
      var p1x = U1,
        p1y = U2;
      var p2x = V1,
        p2y = V2;
      var p3x = U1 + V1,
        p3y = U2 + V2;
      ctx.fillStyle = MUTED_GRID;
      ctx.beginPath();
      ctx.moveTo(X(ox, oy), Y(ox, oy));
      ctx.lineTo(X(p1x, p1y), Y(p1x, p1y));
      ctx.lineTo(X(p3x, p3y), Y(p3x, p3y));
      ctx.lineTo(X(p2x, p2y), Y(p2x, p2y));
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = VIOLET;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      function arrow(x0, y0, x1, y1, col) {
        ctx.strokeStyle = col;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(X(x0, y0), Y(x0, y0));
        ctx.lineTo(X(x1, y1), Y(x1, y1));
        ctx.stroke();
        var dx = x1 - x0,
          dy = y1 - y0;
        var len = Math.sqrt(dx * dx + dy * dy) || 1;
        var ux = dx / len,
          uy = dy / len;
        var ah = 10;
        var bx = x1 - ux * ah,
          by = y1 - uy * ah;
        var px = -uy * 4,
          py = ux * 4;
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.moveTo(X(x1, y1), Y(x1, y1));
        ctx.lineTo(X(bx + px, by + py), Y(bx + px, by + py));
        ctx.lineTo(X(bx - px, by - py), Y(bx - px, by - py));
        ctx.closePath();
        ctx.fill();
      }
      arrow(0, 0, U1, U2, GOLD);
      arrow(0, 0, V1, V2, VIOLET);
      var area = Math.abs(U1 * V2 - U2 * V1);
      ctx.fillStyle = DIM;
      ctx.font = '11px ui-monospace, Menlo, monospace';
      ctx.fillText('parallelogram area = |det[u  v]| = ' + area.toFixed(3), 10, cssH - 8);
    }

    [u1, u2, v1, v2].forEach(function (el) {
      el.addEventListener('input', draw);
    });
    draw();
  }

  /* ---------- §1.3 linear map R² ---------- */
  function mul(M, x, y) {
    return [M[0] * x + M[1] * y, M[2] * x + M[3] * y];
  }

  function wireLinearMap2d() {
    var canvas = document.getElementById('map2d-canvas');
    if (!canvas) return;
    var ids = ['map-a11', 'map-a12', 'map-a21', 'map-a22'];
    var els = ids.map(function (id) {
      return document.getElementById(id);
    });
    if (els.some(function (e) {
      return !e;
    }))
      return;

    var cssW = 520;
    var cssH = 260;

    function draw() {
      var a = parseFloat(els[0].value, 10);
      var b = parseFloat(els[1].value, 10);
      var c = parseFloat(els[2].value, 10);
      var d = parseFloat(els[3].value, 10);
      var M = [a, b, c, d];
      var det = a * d - b * c;
      var tr = a + d;
      var ctx = setupHiDPI(canvas, cssW, cssH);
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, cssW, cssH);
      var cx = cssW * 0.48;
      var cy = cssH * 0.52;
      var sc = 42;

      function Gx(x, y) {
        return cx + x * sc;
      }
      function Gy(x, y) {
        return cy - y * sc;
      }

      ctx.strokeStyle = MUTED_GRID;
      ctx.lineWidth = 1;
      for (var k = -3; k <= 3; k++) {
        ctx.beginPath();
        for (var t = -3; t <= 3; t += 0.08) {
          var px = Gx(t, k),
            py = Gy(t, k);
          if (t <= -2.99) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
        ctx.beginPath();
        for (t = -3; t <= 3; t += 0.08) {
          px = Gx(k, t);
          py = Gy(k, t);
          if (t <= -2.99) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      ctx.strokeStyle = 'rgba(174,147,236,0.35)';
      ctx.lineWidth = 1;
      for (k = -3; k <= 3; k++) {
        ctx.beginPath();
        for (t = -3; t <= 3; t += 0.06) {
          var q = mul(M, t, k);
          px = cx + q[0] * sc;
          py = cy - q[1] * sc;
          if (t <= -2.99) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
        ctx.beginPath();
        for (t = -3; t <= 3; t += 0.06) {
          q = mul(M, k, t);
          px = cx + q[0] * sc;
          py = cy - q[1] * sc;
          if (t <= -2.99) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      ctx.strokeStyle = GOLD;
      ctx.lineWidth = 2.2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      var N = 160;
      for (var i = 0; i <= N; i++) {
        var ang = (i / N) * Math.PI * 2;
        var x = Math.cos(ang),
          y = Math.sin(ang);
        q = mul(M, x, y);
        px = cx + q[0] * sc;
        py = cy - q[1] * sc;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();

      ctx.strokeStyle = GRID;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(cssW, cy);
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, cssH);
      ctx.stroke();

      ctx.fillStyle = DIM;
      ctx.font = '11px ui-monospace, Menlo, monospace';
      ctx.fillText('det = ' + det.toFixed(3) + '   tr = ' + tr.toFixed(3), 10, cssH - 8);
    }

    els.forEach(function (el) {
      el.addEventListener('input', draw);
    });
    draw();
  }

  /* ---------- §1.4 linear functional ---------- */
  function wireFunctional() {
    var canvas = document.getElementById('fun-canvas');
    if (!canvas) return;
    var fa = document.getElementById('fun-a');
    var fb = document.getElementById('fun-b');
    var fx = document.getElementById('fun-x');
    var fy = document.getElementById('fun-y');
    var out = document.getElementById('fun-value');
    if (!fa || !fb || !fx || !fy) return;

    var cssW = 520;
    var cssH = 240;

    function draw() {
      var a = parseFloat(fa.value, 10);
      var b = parseFloat(fb.value, 10);
      var px = parseFloat(fx.value, 10);
      var py = parseFloat(fy.value, 10);
      var val = a * px + b * py;
      if (out) out.textContent = 'ℓ(x) = a x₁ + b x₂ = ' + val.toFixed(3);

      var ctx = setupHiDPI(canvas, cssW, cssH);
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, cssW, cssH);
      var cx = cssW * 0.5;
      var cy = cssH * 0.52;
      var sc = 36;

      function SX(x, y) {
        return cx + x * sc;
      }
      function SY(x, y) {
        return cy - y * sc;
      }

      ctx.strokeStyle = GRID;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, SY(0, 0));
      ctx.lineTo(cssW, SY(0, 0));
      ctx.moveTo(SX(0, 0), 0);
      ctx.lineTo(SX(0, 0), cssH);
      ctx.stroke();

      var nm = Math.sqrt(a * a + b * b) || 1e-9;
      ctx.strokeStyle = MUTED_GRID;
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      for (var t = -5; t <= 5; t += 0.04) {
        var x = -b * t,
          y = a * t;
        var pxx = SX(x, y),
          pyy = SY(x, y);
        if (t <= -4.99) ctx.moveTo(pxx, pyy);
        else ctx.lineTo(pxx, pyy);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      if (Math.abs(nm) > 1e-9) {
        ctx.strokeStyle = 'rgba(174,147,236,0.35)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 6]);
        ctx.beginPath();
        for (t = -5; t <= 5; t += 0.04) {
          x = -b * t + (a * val) / (nm * nm);
          y = a * t + (b * val) / (nm * nm);
          pxx = SX(x, y);
          pyy = SY(x, y);
          if (t <= -4.99) ctx.moveTo(pxx, pyy);
          else ctx.lineTo(pxx, pyy);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      ctx.strokeStyle = VIOLET;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(SX(0, 0), SY(0, 0));
      ctx.lineTo(SX(a * 1.8, b * 1.8), SY(a * 1.8, b * 1.8));
      ctx.stroke();

      ctx.fillStyle = GOLD;
      ctx.beginPath();
      ctx.arc(SX(px, py), SY(px, py), 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = DIM;
      ctx.font = '11px ui-monospace, Menlo, monospace';
      ctx.fillText('violet: normal direction (a, b)  ·  gold: x', 10, cssH - 8);
    }

    [fa, fb, fx, fy].forEach(function (el) {
      el.addEventListener('input', draw);
    });
    draw();
  }

  /* ---------- §1.5 polar area element ---------- */
  function wirePolarCell() {
    var canvas = document.getElementById('polar-canvas');
    if (!canvas) return;
    var rEl = document.getElementById('polar-r');
    var thEl = document.getElementById('polar-theta');
    var drEl = document.getElementById('polar-dr');
    var dthEl = document.getElementById('polar-dth');
    var out = document.getElementById('polar-area');
    if (!rEl || !thEl || !drEl || !dthEl) return;

    var cssW = 520;
    var cssH = 260;

    function draw() {
      var r = parseFloat(rEl.value, 10);
      var th = (parseFloat(thEl.value, 10) * Math.PI) / 180;
      var dr = parseFloat(drEl.value, 10);
      var dth = (parseFloat(dthEl.value, 10) * Math.PI) / 180;

      var p00x = r * Math.cos(th),
        p00y = r * Math.sin(th);
      var p10x = (r + dr) * Math.cos(th),
        p10y = (r + dr) * Math.sin(th);
      var p11x = (r + dr) * Math.cos(th + dth),
        p11y = (r + dr) * Math.sin(th + dth);
      var p01x = r * Math.cos(th + dth),
        p01y = r * Math.sin(th + dth);

      function polyArea(x0, y0, x1, y1, x2, y2, x3, y3) {
        return 0.5 * Math.abs(x0 * y1 - y0 * x1 + x1 * y2 - y1 * x2 + x2 * y3 - y2 * x3 + x3 * y0 - y3 * x0);
      }
      var Atrue = polyArea(p00x, p00y, p10x, p10y, p11x, p11y, p01x, p01y);
      var Aapprox = r * dr * dth;
      if (out) {
        out.textContent =
          'true quad area ≈ ' +
          Atrue.toFixed(4) +
          '   model r Δr Δθ = ' +
          Aapprox.toFixed(4) +
          '   ratio ' +
          (Aapprox > 1e-9 ? (Atrue / Aapprox).toFixed(3) : '—');
      }

      var ctx = setupHiDPI(canvas, cssW, cssH);
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, cssW, cssH);
      var cx = cssW * 0.48;
      var cy = cssH * 0.52;
      var sc = 48;

      function SX(x, y) {
        return cx + x * sc;
      }
      function SY(x, y) {
        return cy - y * sc;
      }

      ctx.strokeStyle = GRID;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, SY(0, 0));
      ctx.lineTo(cssW, SY(0, 0));
      ctx.moveTo(SX(0, 0), 0);
      ctx.lineTo(SX(0, 0), cssH);
      ctx.stroke();

      ctx.strokeStyle = MUTED_GRID;
      for (var ri = 1; ri <= 4; ri++) {
        ctx.beginPath();
        for (var i = 0; i <= 120; i++) {
          var ang = (i / 120) * Math.PI * 2;
          var x = ri * Math.cos(ang),
            y = ri * Math.sin(ang);
          var px = SX(x, y),
            py = SY(x, y);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      }

      ctx.fillStyle = 'rgba(231,181,151,0.14)';
      ctx.strokeStyle = GOLD;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(SX(p00x, p00y), SY(p00x, p00y));
      ctx.lineTo(SX(p10x, p10y), SY(p10x, p10y));
      ctx.lineTo(SX(p11x, p11y), SY(p11x, p11y));
      ctx.lineTo(SX(p01x, p01y), SY(p01x, p01y));
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = DIM;
      ctx.font = '11px ui-monospace, Menlo, monospace';
      ctx.fillText('curved patch in Cartesian plane from (r, θ) → (r cos θ, r sin θ)', 10, cssH - 8);
    }

    [rEl, thEl, drEl, dthEl].forEach(function (el) {
      el.addEventListener('input', draw);
    });
    draw();
  }

  function boot() {
    wireAffine();
    wireBasisSpan();
    wireLinearMap2d();
    wireFunctional();
    wirePolarCell();
    if (typeof renderMathInElement === 'function') {
      renderMathInElement(document.body, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ],
        throwOnError: false
      });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
