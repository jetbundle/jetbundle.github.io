(function () {
  "use strict";

  var ROWS = {
    memory: {
      eq: "M : \\mathcal{A} \\to \\mathcal{V}",
      note: "address map · mutation at M(a) ← v"
    },
    pdes: {
      eq: "u_{n+1} = u_n + \\Delta t\\, \\mathcal{L}(u_n)",
      note: "field on grid · timestep stencil"
    },
    star: {
      eq: "K \\, u = f \\quad \\text{(sparse stiffness)}",
      note: "discrete geometry · certified solve"
    },
    alpha: {
      eq: "S_{t+1} = F(S_t, \\xi_t)",
      note: "stochastic state · feature memory update"
    }
  };

  function init(root) {
    var eqEl = root.querySelector(".arch-eq");
    var noteEl = root.querySelector(".arch-note");
    root.querySelectorAll("[data-arch]").forEach(function (row) {
      row.style.cursor = "pointer";
      row.addEventListener("click", function () {
        root.querySelectorAll("[data-arch]").forEach(function (r) {
          r.classList.remove("arch-row--active");
        });
        row.classList.add("arch-row--active");
        var key = row.getAttribute("data-arch");
        var data = ROWS[key];
        if (!data) return;
        if (eqEl) {
          eqEl.innerHTML = "\\[" + data.eq + "\\]";
          if (typeof renderMathInElement !== "undefined") {
            renderMathInElement(eqEl, {
              delimiters: [{ left: "\\[", right: "\\]", display: true }],
              throwOnError: false
            });
          }
        }
        if (noteEl) noteEl.textContent = data.note;
        if (typeof renderMathInElement !== "undefined") {
          renderMathInElement(eqEl, {
            delimiters: [{ left: "$$", right: "$$", display: true }],
            throwOnError: false
          });
        }
      });
    });
    var first = root.querySelector("[data-arch]");
    if (first) first.click();
  }

  document.querySelectorAll(".architecture-explorer").forEach(init);
})();
