(function () {
  "use strict";

  function init(root) {
    var canvas = root.querySelector(".op-canvas");
    var applyBtn = root.querySelector(".op-apply-btn");
    var resetBtn = root.querySelector(".op-reset-btn");
    var nEl = root.querySelector(".op-n");
    var xEl = root.querySelector(".op-x");
    if (!canvas) return;

    var ctx = canvas.getContext("2d");
    var x = 0.31, n = 0, r = 3.9;

    function f(val) { return r * val * (1 - val); }

    function draw() {
      var w = canvas.width, h = canvas.height;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "#333";
      ctx.beginPath();
      ctx.moveTo(0, h - 1); ctx.lineTo(w, h - 1);
      ctx.moveTo(1, 0); ctx.lineTo(1, h);
      ctx.stroke();

      ctx.strokeStyle = "#6A6A6A";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (var i = 0; i <= w; i++) {
        var t = i / w;
        var y = f(t);
        var py = h - y * (h - 8) - 4;
        if (i === 0) ctx.moveTo(i + 4, py);
        else ctx.lineTo(i + 4, py);
      }
      ctx.stroke();

      var px = 4 + x * (w - 8);
      var py = h - f(x) * (h - 8) - 4;
      ctx.strokeStyle = "#E7B597";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(px, h - 4);
      ctx.lineTo(px, py);
      ctx.lineTo(4, py);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#AE93EC";
      ctx.beginPath();
      ctx.arc(px, h - f(x) * (h - 8) - 4, 5, 0, Math.PI * 2);
      ctx.fill();

      if (nEl) nEl.textContent = String(n);
      if (xEl) xEl.textContent = x.toFixed(6);
    }

    applyBtn.addEventListener("click", function () {
      x = f(x);
      n += 1;
      draw();
    });
    resetBtn.addEventListener("click", function () {
      x = 0.31; n = 0;
      draw();
    });
    draw();
  }

  document.querySelectorAll(".operator-iterate").forEach(init);
})();
