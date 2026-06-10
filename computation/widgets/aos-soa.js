(function () {
  "use strict";

  var PARTICLES = 8;
  var LINE = 8;
  var CELL = 16;

  function aosLayout() {
    var cells = [];
    for (var p = 0; p < PARTICLES; p++) {
      cells.push({ label: "x" + p, kind: "x" });
      cells.push({ label: "y" + p, kind: "y" });
      cells.push({ label: "z" + p, kind: "z" });
    }
    return cells;
  }

  function soaLayout() {
    var cells = [];
    for (var p = 0; p < PARTICLES; p++) cells.push({ label: "x" + p, kind: "x" });
    for (p = 0; p < PARTICLES; p++) cells.push({ label: "y" + p, kind: "y" });
    for (p = 0; p < PARTICLES; p++) cells.push({ label: "z" + p, kind: "z" });
    return cells;
  }

  function xIndices(cells) {
    var idx = [];
    cells.forEach(function (c, i) {
      if (c.kind === "x") idx.push(i);
    });
    return idx;
  }

  function countMisses(indices) {
    var loaded = {};
    var misses = 0;
    indices.forEach(function (i) {
      var line = Math.floor(i / LINE);
      if (!loaded[line]) {
        loaded[line] = true;
        misses += 1;
      }
    });
    return { misses: misses, touched: indices };
  }

  function initAoSSoA(root) {
    var canvas = root.querySelector(".aos-canvas");
    var modeBtns = root.querySelectorAll("[data-aos-mode]");
    var runBtn = root.querySelector(".aos-run-btn");
    var missEl = root.querySelector(".aos-miss-count");
    var noteEl = root.querySelector(".aos-note");
    if (!canvas) return;

    var ctx = canvas.getContext("2d");
    var mode = "aos";

    function draw(cells, accessSet) {
      var cols = LINE;
      var rows = Math.ceil(cells.length / cols);
      canvas.width = cols * CELL;
      canvas.height = rows * CELL;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      cells.forEach(function (cell, i) {
        var col = i % cols;
        var row = Math.floor(i / cols);
        var x = col * CELL;
        var y = row * CELL;
        var hit = accessSet[i];
        ctx.fillStyle = hit
          ? (cell.kind === "x" ? "#AE93EC" : "#333")
          : "#0A0A0A";
        ctx.fillRect(x + 1, y + 1, CELL - 2, CELL - 2);
        ctx.strokeStyle = "#222";
        ctx.strokeRect(x, y, CELL, CELL);
        ctx.fillStyle = hit ? "#E7B597" : "#6A6A6A";
        ctx.font = "9px monospace";
        ctx.fillText(cell.label, x + 2, y + 11);
      });

      for (var line = 0; line < rows; line++) {
        ctx.strokeStyle = "#C24A3A";
        ctx.lineWidth = 1;
        ctx.strokeRect(0, line * CELL, cols * CELL, CELL);
      }
    }

    function simulate() {
      var cells = mode === "aos" ? aosLayout() : soaLayout();
      var indices = xIndices(cells);
      var result = countMisses(indices);
      var accessSet = {};
      result.touched.forEach(function (i) { accessSet[i] = true; });
      draw(cells, accessSet);
      missEl.textContent = String(result.misses);
      if (noteEl) {
        noteEl.textContent = mode === "aos"
          ? "AoS: each xᵢ sits inside struct i — x indices straddle cache lines."
          : "SoA: all xᵢ contiguous — fewer cache lines loaded to sum x.";
      }
    }

    modeBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        mode = btn.getAttribute("data-aos-mode");
        modeBtns.forEach(function (b) { b.classList.remove("widget-btn--active"); });
        btn.classList.add("widget-btn--active");
        simulate();
      });
    });
    if (runBtn) runBtn.addEventListener("click", simulate);

    modeBtns[0].classList.add("widget-btn--active");
    simulate();
  }

  function boot() {
    document.querySelectorAll(".aos-soa").forEach(initAoSSoA);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
