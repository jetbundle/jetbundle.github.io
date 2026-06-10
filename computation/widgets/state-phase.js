(function () {
  "use strict";

  function init(root) {
    var canvas = root.querySelector(".phase-canvas");
    var stepBtn = root.querySelector(".phase-step-btn");
    var playBtn = root.querySelector(".phase-play-btn");
    var resetBtn = root.querySelector(".phase-reset-btn");
    var xvEl = root.querySelector(".phase-xv");
    if (!canvas) return;

    var ctx = canvas.getContext("2d");
    var x = 0.8, v = 0.0, dt = 0.04, steps = 0;
    var trail = [];
    var omega = 1.2, gamma = 0.08;
    var timer = null;

    function step() {
      var a = -omega * omega * x - 2 * gamma * v;
      v += dt * a;
      x += dt * v;
      steps += 1;
      trail.push({ x: x, v: v });
      if (trail.length > 180) trail.shift();
      draw();
      if (xvEl) xvEl.textContent = "x = " + x.toFixed(3) + ", v = " + v.toFixed(3);
    }

    function draw() {
      var w = canvas.width, h = canvas.height;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "#222";
      ctx.beginPath();
      ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h);
      ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2);
      ctx.stroke();

      function px(X) { return w / 2 + X * (w * 0.38); }
      function py(V) { return h / 2 - V * (h * 0.38); }

      if (trail.length > 1) {
        ctx.strokeStyle = "#6A6A6A";
        ctx.lineWidth = 1;
        ctx.beginPath();
        trail.forEach(function (p, i) {
          if (i === 0) ctx.moveTo(px(p.x), py(p.v));
          else ctx.lineTo(px(p.x), py(p.v));
        });
        ctx.stroke();
      }
      ctx.fillStyle = "#AE93EC";
      ctx.beginPath();
      ctx.arc(px(x), py(v), 5, 0, Math.PI * 2);
      ctx.fill();
    }

    function stopPlay() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      if (playBtn) playBtn.textContent = "run";
    }

    stepBtn.addEventListener("click", step);
    if (playBtn) {
      playBtn.addEventListener("click", function () {
        if (timer) {
          stopPlay();
          return;
        }
        playBtn.textContent = "pause";
        timer = setInterval(step, 50);
      });
    }
    resetBtn.addEventListener("click", function () {
      stopPlay();
      x = 0.8; v = 0; steps = 0; trail = [];
      draw();
      if (xvEl) xvEl.textContent = "x = 0.800, v = 0.000";
    });
    draw();
  }

  document.querySelectorAll(".state-phase").forEach(init);
})();
