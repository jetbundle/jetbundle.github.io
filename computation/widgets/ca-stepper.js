(function () {
  "use strict";

  var COLS = 64;
  var ROWS = 32;

  function rule110(left, center, right) {
    var n = (left << 2) | (center << 1) | right;
    return [0, 1, 1, 1, 0, 1, 1, 0][n];
  }

  function initCA(root) {
    var canvas = root.querySelector(".ca-canvas");
    var stepBtn = root.querySelector(".ca-step-btn");
    var runBtn = root.querySelector(".ca-run-btn");
    var resetBtn = root.querySelector(".ca-reset-btn");
    var genEl = root.querySelector(".ca-generation");
    if (!canvas || !stepBtn) return;

    var ctx = canvas.getContext("2d");
    var grid = new Uint8Array(COLS * ROWS);
    var generation = 0;
    var timer = null;

    grid[Math.floor(COLS / 2)] = 1;

    function draw() {
      var w = canvas.width;
      var h = canvas.height;
      var cw = w / COLS;
      var ch = h / ROWS;
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);
      for (var y = 0; y < ROWS; y++) {
        for (var x = 0; x < COLS; x++) {
          if (!grid[y * COLS + x]) continue;
          ctx.fillStyle = "#AE93EC";
          ctx.fillRect(x * cw, y * ch, cw + 0.5, ch + 0.5);
        }
      }
      if (genEl) genEl.textContent = "t = " + generation;
    }

    function step() {
      if (generation >= ROWS - 1) return;
      var nextY = generation + 1;
      for (var x = 0; x < COLS; x++) {
        var left = x > 0 ? grid[generation * COLS + x - 1] : 0;
        var center = grid[generation * COLS + x];
        var right = x < COLS - 1 ? grid[generation * COLS + x + 1] : 0;
        grid[nextY * COLS + x] = rule110(left, center, right);
      }
      generation = nextY;
      draw();
      stepBtn.disabled = generation >= ROWS - 1;
    }

    function reset() {
      if (timer) {
        clearInterval(timer);
        timer = null;
        runBtn.textContent = "run";
      }
      grid.fill(0);
      grid[Math.floor(COLS / 2)] = 1;
      generation = 0;
      stepBtn.disabled = false;
      draw();
    }

    stepBtn.addEventListener("click", step);
    resetBtn.addEventListener("click", reset);
    runBtn.addEventListener("click", function () {
      if (timer) {
        clearInterval(timer);
        timer = null;
        runBtn.textContent = "run";
        return;
      }
      runBtn.textContent = "pause";
      timer = setInterval(function () {
        if (generation >= ROWS - 1) {
          clearInterval(timer);
          timer = null;
          runBtn.textContent = "run";
          return;
        }
        step();
      }, 120);
    });

    draw();
  }

  function boot() {
    document.querySelectorAll(".ca-stepper").forEach(initCA);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
