(function () {
  "use strict";

  function shannonBits(str) {
    if (!str.length) return 0;
    var counts = {};
    for (var i = 0; i < str.length; i++) {
      var c = str[i];
      counts[c] = (counts[c] || 0) + 1;
    }
    var n = str.length;
    var h = 0;
    Object.keys(counts).forEach(function (k) {
      var p = counts[k] / n;
      h -= p * (Math.log(p) / Math.LN2);
    });
    return h;
  }

  function maxEntropyBits(str) {
    return str.length ? Math.log2(Math.min(256, new Set(str.split("")).size)) : 0;
  }

  function initEntropy(root) {
    var input = root.querySelector(".entropy-input");
    var bitsEl = root.querySelector(".entropy-bits");
    var maxEl = root.querySelector(".entropy-max");
    var bar = root.querySelector(".entropy-bar-fill");
    var presetBtns = root.querySelectorAll("[data-entropy-preset]");

    function update() {
      var text = input.value;
      var h = shannonBits(text);
      var hMax = text.length ? Math.log2(new Set(text.split("")).size) : 0;
      var perChar = text.length ? h : 0;
      bitsEl.textContent = perChar.toFixed(2) + " bits/char";
      maxEl.textContent = text.length
        ? "(" + (h * text.length).toFixed(1) + " bits total · " + text.length + " chars)"
        : "";
      var frac = hMax > 0 ? h / hMax : 0;
      bar.style.width = Math.min(100, frac * 100) + "%";
      bar.style.background = frac < 0.3 ? "#AE93EC" : frac < 0.7 ? "#E7B597" : "#C24A3A";
    }

    input.addEventListener("input", update);
    presetBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        input.value = btn.getAttribute("data-entropy-preset") || "";
        update();
      });
    });
    update();
  }

  function boot() {
    document.querySelectorAll(".entropy-viz").forEach(initEntropy);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
