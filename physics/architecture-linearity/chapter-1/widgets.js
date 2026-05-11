/* Affine explorer + heat trace — site palette matches /styles.css */
(function () {
  'use strict';

  var GRID = '#222';
  var VIOLET = '#ae93ec';
  var GOLD = '#e7b597';
  var DIM = '#6a6a6a';
  var BG = '#000';

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

    function draw() {
      var s = parseFloat(sEl.value, 10);
      var t = parseFloat(tEl.value, 10);
      var ctx = canvas.getContext('2d');
      var W = canvas.width;
      var H = canvas.height;
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);
      var cx = W * 0.45;
      var cy = H * 0.55;
      var scale = (W / 520) * 18;
      ctx.strokeStyle = GRID;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(W, cy);
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, H);
      ctx.stroke();
      ctx.strokeStyle = VIOLET;
      ctx.globalAlpha = 0.38;
      ctx.lineWidth = 3;
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
        H - 8
      );
    }

    sEl.addEventListener('input', draw);
    tEl.addEventListener('input', draw);
    draw();
  }

  function wireHeat() {
    var canvas = document.getElementById('heat-canvas');
    var slider = document.getElementById('heat-slider');
    var meta = document.getElementById('heat-meta');
    if (!canvas || !slider) return;

    var jsonUrl = new URL('heat-line.json', window.location.href).href;
    fetch(jsonUrl)
      .then(function (r) {
        if (!r.ok) throw new Error('heat-line.json ' + r.status);
        return r.json();
      })
      .then(function (data) {
        var snaps = data.frontend && data.frontend.snapshots;
        if (!snaps || !snaps.phi || !snaps.phi.length) throw new Error('no snapshots');
        var n = snaps.n;
        slider.max = String(n - 1);
        slider.value = String(n - 1);

        var integrator = data.integrator || {};

        function drawHeat() {
          var idx = parseInt(slider.value, 10) || 0;
          var ys = snaps.phi[idx];
          var ctx = canvas.getContext('2d');
          var dpr = window.devicePixelRatio || 1;
          var W = canvas.clientWidth || 640;
          var H = 240;
          canvas.width = W * dpr;
          canvas.height = H * dpr;
          canvas.style.height = H + 'px';
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          ctx.fillStyle = BG;
          ctx.fillRect(0, 0, W, H);
          var pad = 24;
          var inner = { x: pad + 8, y: pad + 8, w: W - 2 * pad - 16, h: H - 2 * pad - 16 };
          var yMin = Math.min.apply(null, ys);
          var yMax = Math.max.apply(null, ys);
          var p = (yMax - yMin) * 0.1 || 0.1;
          yMin -= p;
          yMax += p;
          ctx.strokeStyle = GRID;
          ctx.lineWidth = 1;
          var y0 = inner.y + inner.h * (yMax / (yMax - yMin));
          ctx.beginPath();
          ctx.moveTo(inner.x, y0);
          ctx.lineTo(inner.x + inner.w, y0);
          ctx.stroke();
          ctx.strokeStyle = VIOLET;
          ctx.lineWidth = 2;
          ctx.beginPath();
          for (var i = 0; i < ys.length; i++) {
            var x = inner.x + (i / (ys.length - 1)) * inner.w;
            var y = inner.y + ((yMax - ys[i]) / (yMax - yMin)) * inner.h;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
          ctx.fillStyle = DIM;
          ctx.font = '11px ui-monospace, Menlo, monospace';
          ctx.fillText('φ(x) — snapshot ' + idx + '/' + (n - 1), pad + 4, pad + 12);
          if (meta) {
            meta.textContent =
              (integrator.name || '') +
              (integrator.dt != null ? ' · dt=' + integrator.dt : '');
          }
        }

        slider.addEventListener('input', drawHeat);
        window.addEventListener('resize', drawHeat);
        drawHeat();
      })
      .catch(function (e) {
        var el = document.getElementById('heat-error');
        if (el) el.textContent = String(e.message || e);
      });
  }

  function boot() {
    wireAffine();
    wireHeat();
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
