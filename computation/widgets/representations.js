(function () {
  "use strict";

  var LANGS = {
    c: {
      name: "C",
      code: "double x = 1.0, dt = 0.1;\nfor (int n = 0; n < 40; n++)\n    x += dt * (-2.0 * x);  // operator"
    },
    cpp: {
      name: "C++",
      code: "double x = 1.0;\nconst double dt = 0.1, lam = 2.0;\nfor (int n = 0; n < 40; ++n)\n    x += dt * (-lam * x);  // same operator"
    },
    rust: {
      name: "Rust",
      code: "let mut x = 1.0_f64;\nlet dt = 0.1;\nlet lam = 2.0;\nfor _ in 0..40 {\n    x += dt * (-lam * x);  // ownership: x unique"
    },
    python: {
      name: "Python",
      code: "x = 1.0\ndt, lam = 0.1, 2.0\nfor _ in range(40):\n    x += dt * (-lam * x)  # interpreter → same bytes"
    },
    julia: {
      name: "Julia",
      code: "x = 1.0\ndt, λ = 0.1, 2.0\nfor _ in 1:40\n    x += dt * (-λ * x)  # multiple dispatch, same map"
    }
  };

  function initReps(root) {
    var tabs = root.querySelectorAll("[data-rep-lang]");
    var codeEl = root.querySelector(".rep-code");
    var nameEl = root.querySelector(".rep-lang-name");
    if (!codeEl) return;

    function show(lang) {
      var entry = LANGS[lang];
      if (!entry) return;
      codeEl.textContent = entry.code;
      if (nameEl) nameEl.textContent = entry.name;
      tabs.forEach(function (t) {
        t.classList.toggle("widget-btn--active", t.getAttribute("data-rep-lang") === lang);
      });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        show(tab.getAttribute("data-rep-lang"));
      });
    });
    show("c");
  }

  function boot() {
    document.querySelectorAll(".representations").forEach(initReps);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
