(function () {
  "use strict";

  function initEuler(root) {
    var canvas = root.querySelector(".euler-canvas");
    var dtSlider = root.querySelector(".euler-dt");
    var dtLabel = root.querySelector(".euler-dt-label");
    var statusEl = root.querySelector(".euler-status");
    if (!canvas || !dtSlider) return;

    var ctx = canvas.getContext("2d");
    var lambda = 2.0;

    function exact(t) {
      return Math.exp(-lambda * t);
    }

    function euler(dt, steps) {
      var y = 1;
      var pts = [{ t: 0, y: y }];
      for (var n = 0; n < steps; n++) {
        y = y + dt * (-lambda * y);
        pts.push({ t: (n + 1) * dt, y: y });
      }
      return pts;
    }

    function draw() {
      var dt = parseFloat(dtSlider.value);
      dtLabel.textContent = dt.toFixed(2);
      var w = canvas.width;
      var h = canvas.height;
      var tMax = 4;
      var steps = Math.floor(tMax / dt);

      var stable = dt <= 2 / lambda;
      statusEl.textContent = stable
        ? "stable (|1 − λΔt| < 1)"
        : "unstable — Euler diverges for λΔt > 2";
      statusEl.className = stable ? "euler-status euler-status--ok" : "euler-status euler-status--bad";

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "#333";
      ctx.beginPath();
      ctx.moveTo(0, h - 1);
      ctx.lineTo(w, h - 1);
      ctx.stroke();

      function yScale(y) {
        var ymax = 1.2;
        var ymin = stable ? -0.1 : Math.min(-0.5, -dt * 2);
        return h - ((y - ymin) / (ymax - ymin)) * (h - 8) - 4;
      }
      function tScale(t) {
        return (t / tMax) * (w - 8) + 4;
      }

      ctx.strokeStyle = "#6A6A6A";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (var i = 0; i <= 200; i++) {
        var t = (i / 200) * tMax;
        var y = exact(t);
        var px = tScale(t);
        var py = yScale(y);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      var pts = euler(dt, steps);
      ctx.strokeStyle = "#AE93EC";
      ctx.lineWidth = 2;
      ctx.beginPath();
      pts.forEach(function (p, idx) {
        var px = tScale(p.t);
        var py = yScale(p.y);
        if (idx === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();

      pts.forEach(function (p) {
        ctx.fillStyle = "#E7B597";
        ctx.beginPath();
        ctx.arc(tScale(p.t), yScale(p.y), 3, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    dtSlider.addEventListener("input", draw);
    draw();
  }

  function boot() {
    document.querySelectorAll(".euler-stability").forEach(initEuler);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
