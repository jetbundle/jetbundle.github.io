(function () {
  "use strict";

  var LEVELS = [
    { name: "register", latency: "0.3 ns", bw: "~" },
    { name: "L1", latency: "1 ns", bw: "~1 TB/s" },
    { name: "L3", latency: "10 ns", bw: "~200 GB/s" },
    { name: "DRAM", latency: "80 ns", bw: "~50 GB/s" },
    { name: "SSD", latency: "100 µs", bw: "~3 GB/s" }
  ];

  function init(root) {
    var list = root.querySelector(".latency-list");
    var latEl = root.querySelector(".latency-value");
    var bwEl = root.querySelector(".latency-bw");
    if (!list) return;

    LEVELS.forEach(function (lv, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "widget-btn" + (i === 0 ? " widget-btn--active" : "");
      btn.textContent = lv.name;
      btn.addEventListener("click", function () {
        list.querySelectorAll(".widget-btn").forEach(function (b) {
          b.classList.remove("widget-btn--active");
        });
        btn.classList.add("widget-btn--active");
        if (latEl) latEl.textContent = lv.latency;
        if (bwEl) bwEl.textContent = lv.bw;
      });
      list.appendChild(btn);
    });
    if (latEl) latEl.textContent = LEVELS[0].latency;
    if (bwEl) bwEl.textContent = LEVELS[0].bw;
  }

  document.querySelectorAll(".memory-latency").forEach(init);
})();
