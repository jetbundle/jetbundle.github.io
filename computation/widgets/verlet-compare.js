(function () {
  "use strict";

  function init(root) {
    var canvas = root.querySelector(".verlet-canvas");
    var toggle = root.querySelector(".verlet-toggle");
    if (!canvas) return;

    var ctx = canvas.getContext("2d");
    var useVerlet = false;
    var x = 1, v = 0, dt = 0.08, t = 0, omega = 1;
    var pathE = [], pathV = [];

    function euler() {
      v += -omega * omega * x * dt;
      x += v * dt;
    }
    function verlet() {
      var a = -omega * omega * x;
      x += v * dt + 0.5 * a * dt * dt;
      var a2 = -omega * omega * x;
      v += 0.5 * (a + a2) * dt;
    }

    function exact(tt) { return Math.cos(omega * tt); }

    function step() {
      if (useVerlet) verlet();
      else euler();
      t += dt;
      pathE.push(exact(t));
      pathV.push(x);
      if (pathE.length > 120) { pathE.shift(); pathV.shift(); }
      draw();
    }

    function draw() {
      var w = canvas.width, h = canvas.height;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);
      function plot(arr, color) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        arr.forEach(function (y, i) {
          var px = (i / 120) * (w - 8) + 4;
          var py = h / 2 - y * (h * 0.4);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();
      }
      plot(pathE, "#6A6A6A");
      plot(pathV, useVerlet ? "#E7B597" : "#AE93EC");
    }

    var timer = setInterval(step, 80);
    toggle.addEventListener("click", function () {
      useVerlet = !useVerlet;
      toggle.textContent = useVerlet ? "Verlet" : "Euler";
      x = 1; v = 0; t = 0; pathE = []; pathV = [];
    });
    draw();
    root.addEventListener("destroy", function () { clearInterval(timer); });
  }

  document.querySelectorAll(".verlet-compare").forEach(init);
})();
