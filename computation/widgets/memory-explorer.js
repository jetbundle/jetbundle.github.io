(function () {
  "use strict";

  var ADDR_X = 1000;
  var ADDR_P = 1004;

  var STEPS = [
    { code: "// step 0: empty machine state", rows: [] },
    {
      code: "int x = 5;        // physical write at address " + ADDR_X,
      rows: [{ addr: ADDR_X, value: 5, interp: "int x" }]
    },
    {
      code: "int *p = &x;      // p stores address of x",
      rows: [
        { addr: ADDR_X, value: 5, interp: "int x" },
        { addr: ADDR_P, value: ADDR_X, interp: "int *p → &x" }
      ]
    },
    {
      code: "*p = 10;          // mutate M(p) without naming x",
      rows: [
        { addr: ADDR_X, value: 10, interp: "int x  (via *p)", highlight: true },
        { addr: ADDR_P, value: ADDR_X, interp: "int *p → &x" }
      ]
    }
  ];

  function renderTable(tbody, rows) {
    tbody.innerHTML = "";
    if (!rows.length) {
      tbody.innerHTML = '<tr><td colspan="3" class="dim">— no allocations —</td></tr>';
      return;
    }
    rows.forEach(function (row) {
      var tr = document.createElement("tr");
      if (row.highlight) tr.className = "memory-row--flash";
      tr.innerHTML =
        "<td><code>" + row.addr + "</code></td>" +
        "<td><code>" + row.value + "</code></td>" +
        "<td>" + row.interp + "</td>";
      tbody.appendChild(tr);
    });
  }

  function initExplorer(root) {
    var stepIndex = 0;
    var codeEl = root.querySelector(".memory-code-step");
    var tbody = root.querySelector(".memory-table-body");
    var stepBtn = root.querySelector(".memory-step-btn");
    var resetBtn = root.querySelector(".memory-reset-btn");
    if (!codeEl || !tbody || !stepBtn || !resetBtn) return;

    function applyStep(i) {
      var step = STEPS[i];
      codeEl.textContent = step.code;
      renderTable(tbody, step.rows);
      stepBtn.disabled = i >= STEPS.length - 1;
      stepBtn.textContent = i >= STEPS.length - 1 ? "complete" : "next step";
    }

    stepBtn.addEventListener("click", function () {
      if (stepIndex < STEPS.length - 1) {
        stepIndex += 1;
        applyStep(stepIndex);
      }
    });
    resetBtn.addEventListener("click", function () {
      stepIndex = 0;
      applyStep(0);
    });
    applyStep(0);
  }

  function boot() {
    document.querySelectorAll(".memory-explorer").forEach(initExplorer);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
