(function () {
  "use strict";

  function init(root) {
    var canvas = root.querySelector(".amdahl-canvas");
    var pSlider = root.querySelector(".amdahl-p");
    var nSlider = root.querySelector(".amdahl-n");
    var speedEl = root.querySelector(".amdahl-speedup");
    if (!canvas) return;

    var ctx = canvas.getContext("2d");

    function draw() {
      var p = parseFloat(pSlider.value) / 100;
      var n = parseInt(nSlider.value, 10);
      var speedup = 1 / ((1 - p) + p / n);
      root.querySelector(".amdahl-p-label").textContent = (p * 100).toFixed(0) + "%";
      root.querySelector(".amdahl-n-label").textContent = String(n);
      if (speedEl) speedEl.textContent = speedup.toFixed(2) + "×";

      var w = canvas.width, h = canvas.height;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "#AE93EC";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (var i = 1; i <= 64; i++) {
        var sp = 1 / ((1 - p) + p / i);
        var px = 4 + (i / 64) * (w - 8);
        var py = h - 4 - (sp / (1 / (1 - p) + 0.01)) * (h - 12) * 0.85;
        if (i === 1) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      var px = 4 + (n / 64) * (w - 8);
      var py = h - 4 - (speedup / (1 / (1 - p) + 0.01)) * (h - 12) * 0.85;
      ctx.fillStyle = "#E7B597";
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    pSlider.addEventListener("input", draw);
    nSlider.addEventListener("input", draw);
    draw();
  }

  document.querySelectorAll(".amdahl-viz").forEach(init);
})();
