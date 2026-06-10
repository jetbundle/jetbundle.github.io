(function () {
  "use strict";

  var K = 1.380649e-23;

  function init(root) {
    var temp = root.querySelector(".landauer-temp");
    var bits = root.querySelector(".landauer-bits");
    var out = root.querySelector(".landauer-out");
    if (!temp || !bits || !out) return;

    function update() {
      var T = parseFloat(temp.value);
      var b = parseInt(bits.value, 10);
      var e = b * K * T * Math.LN2;
      out.textContent = e >= 1e-18
        ? (e * 1e21).toFixed(3) + " × 10⁻²¹ J"
        : e.toExponential(3) + " J";
      root.querySelector(".landauer-temp-label").textContent = T + " K";
      root.querySelector(".landauer-bits-label").textContent = String(b);
    }

    temp.addEventListener("input", update);
    bits.addEventListener("input", update);
    update();
  }

  document.querySelectorAll(".landauer-calc").forEach(init);
})();
