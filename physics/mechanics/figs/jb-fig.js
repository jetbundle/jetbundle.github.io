/* Jetbundle research-grade figure core: theme, adaptive RK, Plotly helpers. */
(function (global) {
  'use strict';

  var C = {
    bg: '#000000',
    paper: '#000000',
    fg: '#c4c4c4',
    dim: '#6a6a6a',
    grid: '#1e1e1e',
    axis: '#333333',
    violet: '#ae93ec',
    gold: '#e7b597',
    warn: '#c24a3a',
    softV: 'rgba(174,147,236,0.40)',
    softG: 'rgba(231,181,151,0.40)',
    soft: 'rgba(196,196,196,0.22)'
  };

  var FONT = {
    family: 'ui-monospace, Cascadia Code, SF Mono, Menlo, Consolas, monospace',
    size: 11,
    color: C.fg
  };

  /* Convert pseudo-LaTeX / ASCII math into clean Unicode for Plotly (no MathJax needed). */
  function prettyMath(s) {
    if (s == null) return s;
    if (typeof s !== 'string') return s;
    var t = s;
    t = t.replace(/\$\$([^$]+)\$\$/g, '$1');
    t = t.replace(/\$([^$]+)\$/g, '$1');
    t = t.replace(/\\mathrm\{([^}]*)\}/g, '$1');
    t = t.replace(/\\operatorname\{([^}]*)\}/g, '$1');
    t = t.replace(/\\text\{([^}]*)\}/g, '$1');
    t = t.replace(/\\mathbf\{([^}]*)\}/g, '$1');
    t = t.replace(/\\mathbb\{R\}/g, 'ℝ');
    t = t.replace(/\\mathbb\{C\}/g, 'ℂ');
    t = t.replace(/\\mathbb\{Z\}/g, 'ℤ');
    t = t.replace(/\\mathbb\{T\}/g, '𝕋');
    t = t.replace(/\\mathbb\{S\}/g, '𝕊');
    t = t.replace(/\\partial/g, '∂');
    t = t.replace(/\\nabla/g, '∇');
    t = t.replace(/\\infty/g, '∞');
    t = t.replace(/\\cdot/g, '·');
    t = t.replace(/\\times/g, '×');
    t = t.replace(/\\circ/g, '∘');
    t = t.replace(/\\oplus/g, '⊕');
    t = t.replace(/\\otimes/g, '⊗');
    t = t.replace(/\\wedge/g, '∧');
    t = t.replace(/\\vee/g, '∨');
    t = t.replace(/\\cap/g, '∩');
    t = t.replace(/\\cup/g, '∪');
    t = t.replace(/\\subset/g, '⊂');
    t = t.replace(/\\in\b/g, '∈');
    t = t.replace(/\\notin/g, '∉');
    t = t.replace(/\\perp/g, '⊥');
    t = t.replace(/\\parallel/g, '∥');
    t = t.replace(/\\approx/g, '≈');
    t = t.replace(/\\equiv/g, '≡');
    t = t.replace(/\\neq/g, '≠');
    t = t.replace(/\\leq/g, '≤');
    t = t.replace(/\\geq/g, '≥');
    t = t.replace(/\\ll/g, '≪');
    t = t.replace(/\\gg/g, '≫');
    t = t.replace(/\\to\b/g, '→');
    t = t.replace(/\\mapsto/g, '↦');
    t = t.replace(/\\rightarrow/g, '→');
    t = t.replace(/\\leftarrow/g, '←');
    t = t.replace(/\\Leftrightarrow/g, '⇔');
    t = t.replace(/\\iff/g, '⇔');
    t = t.replace(/\\Rightarrow/g, '⇒');
    t = t.replace(/\\sum/g, '∑');
    t = t.replace(/\\prod/g, '∏');
    t = t.replace(/\\int/g, '∫');
    t = t.replace(/\\oint/g, '∮');
    t = t.replace(/\\sqrt\{([^}]*)\}/g, '√($1)');
    t = t.replace(/\\sqrt/g, '√');
    t = t.replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, '($1)/($2)');
    t = t.replace(/\\left/g, '');
    t = t.replace(/\\right/g, '');
    t = t.replace(/\\,/g, ' ');
    t = t.replace(/\\;/g, ' ');
    t = t.replace(/\\!/g, '');
    t = t.replace(/\\quad/g, '  ');
    t = t.replace(/\\alpha/g, 'α');
    t = t.replace(/\\beta/g, 'β');
    t = t.replace(/\\gamma/g, 'γ');
    t = t.replace(/\\delta/g, 'δ');
    t = t.replace(/\\epsilon/g, 'ε');
    t = t.replace(/\\varepsilon/g, 'ε');
    t = t.replace(/\\zeta/g, 'ζ');
    t = t.replace(/\\eta/g, 'η');
    t = t.replace(/\\theta/g, 'θ');
    t = t.replace(/\\vartheta/g, 'ϑ');
    t = t.replace(/\\iota/g, 'ι');
    t = t.replace(/\\kappa/g, 'κ');
    t = t.replace(/\\lambda/g, 'λ');
    t = t.replace(/\\mu/g, 'μ');
    t = t.replace(/\\nu/g, 'ν');
    t = t.replace(/\\xi/g, 'ξ');
    t = t.replace(/\\pi/g, 'π');
    t = t.replace(/\\rho/g, 'ρ');
    t = t.replace(/\\sigma/g, 'σ');
    t = t.replace(/\\tau/g, 'τ');
    t = t.replace(/\\phi/g, 'φ');
    t = t.replace(/\\varphi/g, 'φ');
    t = t.replace(/\\chi/g, 'χ');
    t = t.replace(/\\psi/g, 'ψ');
    t = t.replace(/\\omega/g, 'ω');
    t = t.replace(/\\Gamma/g, 'Γ');
    t = t.replace(/\\Delta/g, 'Δ');
    t = t.replace(/\\Theta/g, 'Θ');
    t = t.replace(/\\Lambda/g, 'Λ');
    t = t.replace(/\\Xi/g, 'Ξ');
    t = t.replace(/\\Pi/g, 'Π');
    t = t.replace(/\\Sigma/g, 'Σ');
    t = t.replace(/\\Phi/g, 'Φ');
    t = t.replace(/\\Psi/g, 'Ψ');
    t = t.replace(/\\Omega/g, 'Ω');
    /* combined manifold / eigenspace labels */
    t = t.replace(/E\^\{\s*s\s*[,/]\s*u\s*\}/g, 'Eˢᐟᵘ');
    t = t.replace(/W\^\{\s*s\s*[,/]\s*u\s*\}/g, 'Wˢᐟᵘ');
    t = t.replace(/E\^s,u/g, 'Eˢᐟᵘ');
    t = t.replace(/W\^s,u/g, 'Wˢᐟᵘ');
    t = t.replace(/e\^\{tA\}/g, 'exp(tA)');
    t = t.replace(/e\^\{t N\}/g, 'exp(tN)');
    t = t.replace(/W\^\{?u\}?/g, 'Wᵘ');
    t = t.replace(/W\^\{?s\}?/g, 'Wˢ');
    t = t.replace(/E\^\{?u\}?/g, 'Eᵘ');
    t = t.replace(/E\^\{?s\}?/g, 'Eˢ');
    t = t.replace(/([A-Za-zα-ωΑ-Ω])\^\{?2\}?/g, '$1²');
    t = t.replace(/([A-Za-zα-ωΑ-Ω])\^\{?3\}?/g, '$1³');
    t = t.replace(/([A-Za-zα-ωΑ-Ω])\^\{?4\}?/g, '$1⁴');
    t = t.replace(/\^\{?([0-9])\}?/g, function (_, d) {
      return '⁰¹²³⁴⁵⁶⁷⁸⁹'[+d];
    });
    t = t.replace(/_\{?([0-9])\}?/g, function (_, d) {
      return '₀₁₂₃₄₅₆₇₈₉'[+d];
    });
    t = t.replace(/_\{\*\}/g, '∗');
    t = t.replace(/_\*/g, '∗');
    t = t.replace(/_\{([a-z])\}/g, function (_, c) {
      var map = {
        i: 'ᵢ',
        j: 'ⱼ',
        k: 'ₖ',
        n: 'ₙ',
        m: 'ₘ',
        r: 'ᵣ',
        s: 'ₛ',
        t: 'ₜ',
        x: 'ₓ',
        y: 'ᵧ',
        p: 'ₚ',
        q: 'ₚ'
      };
      return map[c] || '_' + c;
    });
    /* only brace-wrapped letter superscripts to avoid eating prose */
    t = t.replace(/\^\{([a-z])\}/gi, function (_, c) {
      var map = {
        a: 'ᵃ',
        b: 'ᵇ',
        c: 'ᶜ',
        d: 'ᵈ',
        e: 'ᵉ',
        f: 'ᶠ',
        g: 'ᵍ',
        h: 'ʰ',
        i: 'ⁱ',
        j: 'ʲ',
        k: 'ᵏ',
        l: 'ˡ',
        m: 'ᵐ',
        n: 'ⁿ',
        o: 'ᵒ',
        p: 'ᵖ',
        r: 'ʳ',
        s: 'ˢ',
        t: 'ᵗ',
        u: 'ᵘ',
        v: 'ᵛ',
        w: 'ʷ',
        x: 'ˣ',
        y: 'ʸ',
        z: 'ᶻ'
      };
      return map[c.toLowerCase()] || '^' + c;
    });
    t = t.replace(/\\dot\{([A-Za-zα-ω])\}/g, '$1̇');
    t = t.replace(/\\ddot\{([A-Za-zα-ω])\}/g, '$1̈');
    t = t.replace(/\\hat\{([A-Za-zα-ω])\}/g, '$1̂');
    t = t.replace(/\\bar\{([A-Za-zα-ω])\}/g, '$1̄');
    t = t.replace(/\\tilde\{([A-Za-zα-ω])\}/g, '$1̃');
    /* ascii fallbacks already used in our figures */
    t = t.replace(/ẋ/g, 'ẋ');
    t = t.replace(/ẏ/g, 'ẏ');
    t = t.replace(/ṙ/g, 'ṙ');
    t = t.replace(/\{/g, '');
    t = t.replace(/\}/g, '');
    t = t.replace(/\\\\/g, '');
    t = t.replace(/\s+/g, ' ').trim();
    return t;
  }

  function scrub(obj) {
    if (obj == null || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(scrub);
    var out = {};
    Object.keys(obj).forEach(function (k) {
      var v = obj[k];
      if (v === undefined) return;
      out[k] = typeof v === 'object' && v !== null && !Array.isArray(v) ? scrub(v) : v;
    });
    return out;
  }

  function axis(extra) {
    extra = extra || {};
    var ax = {
      color: C.fg,
      gridcolor: C.grid,
      zerolinecolor: C.axis,
      zerolinewidth: 1,
      linecolor: C.axis,
      tickfont: { size: 10, color: C.dim },
      showgrid: extra.showgrid !== false,
      mirror: false,
      ticks: 'outside',
      ticklen: 4,
      showline: true,
      automargin: extra.automargin != null ? extra.automargin : true,
      /* keep ticks/titles inside plot paper, never spill into sibling axes */
      constrain: extra.constrain || 'domain',
      layer: 'below traces'
    };
    Object.keys(extra).forEach(function (k) {
      if (k === 'title' || k === 'showgrid' || k === 'automargin') return;
      if (extra[k] !== undefined) ax[k] = extra[k];
    });
    if (extra.title) {
      var tt = typeof extra.title === 'string' ? extra.title : extra.title.text || '';
      ax.title = {
        text: prettyMath(tt),
        font: { size: 11, color: C.dim, family: FONT.family },
        standoff: 10
      };
    }
    return ax;
  }

  /**
   * Dual-panel layout hygiene: enforce a gap so left y-axis ticks never bleed into panel 2.
   * Drops scaleanchor chains that force one panel to collapse.
   */
  function separatePanels(opts) {
    if (!opts || (!opts.xaxis2 && !opts.grid)) return opts;
    var o = Object.assign({}, opts);
    o.xaxis = Object.assign({}, opts.xaxis || {});
    o.yaxis = Object.assign({}, opts.yaxis || {});
    o.xaxis2 = Object.assign({}, opts.xaxis2 || {});
    o.yaxis2 = Object.assign({}, opts.yaxis2 || {});

    var gap = 0.09;
    var d1 = o.xaxis.domain ? o.xaxis.domain.slice() : [0, 0.45];
    var d2 = o.xaxis2.domain ? o.xaxis2.domain.slice() : [0.55, 1];
    if (d2[0] - d1[1] < gap) {
      var spanLeft = d1[1] - d1[0];
      var spanRight = d2[1] - d2[0];
      var total = spanLeft + spanRight + gap;
      if (total > 1) {
        var scale = (1 - gap) / (spanLeft + spanRight);
        spanLeft *= scale;
        spanRight *= scale;
      }
      d1 = [0, spanLeft];
      d2 = [spanLeft + gap, Math.min(1, spanLeft + gap + spanRight)];
      if (d2[1] < 0.98) d2[1] = 1;
    }
    o.xaxis.domain = d1;
    o.xaxis2.domain = d2;
    o.xaxis.automargin = true;
    o.xaxis2.automargin = true;
    o.yaxis.automargin = true;
    o.yaxis2.automargin = true;
    o.yaxis.anchor = o.yaxis.anchor || 'x';
    o.yaxis2.anchor = 'x2';
    o.xaxis2.anchor = o.xaxis2.anchor || 'y2';
    /* prevent pan-cross bleeding: independent ranges only */
    o.xaxis.matches = undefined;
    o.yaxis.matches = undefined;
    /* don't let panel-1 scaleanchor force both columns tiny */
    if (o.xaxis.scaleanchor === 'y2' || o.xaxis.scaleanchor === 'x2') {
      delete o.xaxis.scaleanchor;
      delete o.xaxis.scaleratio;
    }
    if (o.yaxis.scaleanchor === 'y2' || o.yaxis.scaleanchor === 'x2') {
      delete o.yaxis.scaleanchor;
      delete o.yaxis.scaleratio;
    }
    if (o.yaxis2.scaleanchor === 'y' || o.yaxis2.scaleanchor === 'x') {
      delete o.yaxis2.scaleanchor;
      delete o.yaxis2.scaleratio;
    }
    /* in-panel equal aspect stays (x↔y within same panel) */
    return o;
  }

  /**
   * Legend policy (no overflow):
   *  - default "bottom": horizontal strip inside reserved bottom margin
   *  - "inside": compact card top-left
   *  - "right": vertical strip with right margin
   *  - "none": hide
   */
  function legendBlock(opts) {
    var place = opts.legendPlace || 'bottom';
    if (place === 'none' || opts.showlegend === false) {
      return {
        showlegend: false,
        legend: {},
        margin: opts.margin || { l: 56, r: 22, t: 32, b: 48 }
      };
    }

    var baseMargin = opts.margin || {};
    if (place === 'inside') {
      return {
        showlegend: true,
        legend: {
          orientation: 'v',
          x: 0.012,
          y: 0.988,
          xanchor: 'left',
          yanchor: 'top',
          bgcolor: 'rgba(0,0,0,0.82)',
          bordercolor: C.axis,
          borderwidth: 1,
          font: { size: 10, color: C.fg, family: FONT.family },
          itemsizing: 'constant',
          itemwidth: 30,
          tracegroupgap: 2,
          entrywidth: 0.36,
          entrywidthmode: 'fraction'
        },
        margin: {
          l: baseMargin.l != null ? baseMargin.l : 52,
          r: baseMargin.r != null ? baseMargin.r : 18,
          t: baseMargin.t != null ? baseMargin.t : 30,
          b: baseMargin.b != null ? baseMargin.b : 48
        }
      };
    }

    if (place === 'right') {
      return {
        showlegend: true,
        legend: {
          orientation: 'v',
          x: 1.02,
          y: 1,
          xanchor: 'left',
          yanchor: 'top',
          bgcolor: 'rgba(0,0,0,0)',
          borderwidth: 0,
          font: { size: 10, color: C.dim, family: FONT.family },
          itemsizing: 'constant',
          itemwidth: 30,
          tracegroupgap: 2
        },
        margin: {
          l: baseMargin.l != null ? baseMargin.l : 52,
          r: baseMargin.r != null ? baseMargin.r : 120,
          t: baseMargin.t != null ? baseMargin.t : 30,
          b: baseMargin.b != null ? baseMargin.b : 48
        }
      };
    }

    /* bottom: multi-row horizontal strip under the axes */
    return {
      showlegend: true,
      legend: {
        orientation: 'h',
        x: 0,
        y: -0.12,
        xanchor: 'left',
        yanchor: 'top',
        bgcolor: 'rgba(0,0,0,0)',
        borderwidth: 0,
        font: { size: 10, color: C.dim, family: FONT.family },
        itemsizing: 'constant',
        itemwidth: 30,
        tracegroupgap: 4,
        entrywidth: 0.15,
        entrywidthmode: 'fraction',
        valign: 'top'
      },
      margin: {
        l: baseMargin.l != null ? baseMargin.l : 58,
        r: baseMargin.r != null ? baseMargin.r : 22,
        t: baseMargin.t != null ? baseMargin.t : 30,
        b: baseMargin.b != null ? baseMargin.b : 96
      }
    };
  }

  function layout(opts) {
    opts = separatePanels(opts || {});
    var leg = legendBlock(opts);
    /* 3D: legend inside, tight margins */
    if (opts.scene) {
      leg = legendBlock(
        Object.assign({}, opts, {
          legendPlace: opts.legendPlace || 'inside',
          margin: opts.margin || { l: 0, r: 0, t: 32, b: 0 }
        })
      );
    }
    if (opts.legendY != null && leg.legend) {
      leg.legend.y = opts.legendY;
    }
    if (opts.legendOrientation && leg.legend) {
      leg.legend.orientation = opts.legendOrientation;
    }

    var L = {
      paper_bgcolor: C.paper,
      plot_bgcolor: C.bg,
      font: FONT,
      margin: leg.margin,
      height: opts.height || 420,
      autosize: true,
      hovermode: opts.hovermode != null ? opts.hovermode : 'closest',
      showlegend: leg.showlegend,
      legend: leg.legend,
      xaxis: axis(opts.xaxis || {}),
      yaxis: axis(opts.yaxis || {}),
      separators: '.,',
      uirevision: opts.uirevision || true
    };

    if (opts.title) {
      L.title = {
        text: prettyMath(String(opts.title)),
        font: { size: 11, color: C.dim, family: FONT.family },
        x: 0,
        xanchor: 'left',
        y: 1,
        yanchor: 'bottom',
        pad: { t: 2, b: 8 }
      };
      L.margin.t = Math.max(L.margin.t || 0, 38);
    }

    if (opts.xaxis2) L.xaxis2 = axis(opts.xaxis2);
    if (opts.yaxis2) L.yaxis2 = axis(opts.yaxis2);
    if (opts.scene) L.scene = sceneLayout(opts.scene);
    if (opts.grid) L.grid = opts.grid;
    if (opts.annotations) {
      L.annotations = opts.annotations.map(function (a) {
        var b = Object.assign({}, a);
        if (b.text) b.text = prettyMath(String(b.text));
        if (!b.font) b.font = { size: 10, color: C.dim, family: FONT.family };
        return b;
      });
    }
    if (opts.shapes) L.shapes = opts.shapes;
    return scrub(L);
  }

  function sceneLayout(s) {
    s = s || {};
    var ax = function (t) {
      return {
        title: { text: prettyMath(t || ''), font: { size: 10, color: C.dim } },
        color: C.fg,
        gridcolor: C.grid,
        zerolinecolor: C.axis,
        backgroundcolor: C.bg,
        showbackground: true,
        tickfont: { size: 9, color: C.dim }
      };
    };
    var out = {
      bgcolor: C.bg,
      aspectmode: s.aspectmode || 'cube',
      camera: s.camera || { eye: { x: 1.45, y: 1.35, z: 1.15 } },
      xaxis: Object.assign(ax(s.xTitle || 'x'), s.xaxis || {}),
      yaxis: Object.assign(ax(s.yTitle || 'y'), s.yaxis || {}),
      zaxis: Object.assign(ax(s.zTitle || 'z'), s.zaxis || {})
    };
    Object.keys(s).forEach(function (k) {
      if (k === 'xTitle' || k === 'yTitle' || k === 'zTitle' || k === 'xaxis' || k === 'yaxis' || k === 'zaxis') return;
      out[k] = s[k];
    });
    return out;
  }

  var CONFIG = {
    responsive: true,
    displaylogo: false,
    displayModeBar: true,
    doubleClick: 'reset',
    modeBarButtonsToRemove: [
      'lasso2d',
      'select2d',
      'autoScale2d',
      'hoverClosestCartesian',
      'hoverCompareCartesian',
      'toggleSpikelines'
    ],
    toImageButtonOptions: { format: 'png', filename: 'jetbundle-figure', height: 900, width: 1200, scale: 2 }
  };

  /* keep legend count tight so the bottom strip never wraps out of the widget */
  function pruneLegend(traces, maxItems) {
    maxItems = maxItems != null ? maxItems : 6;
    var count = 0;
    return (traces || []).map(function (t) {
      var tr = Object.assign({}, t);
      if (tr.name) tr.name = prettyMath(String(tr.name));
      var show = tr.showlegend !== false && !!tr.name;
      if (show) {
        count += 1;
        if (count > maxItems) tr.showlegend = false;
      }
      return tr;
    });
  }

  function tracesCompatible(prev, next) {
    if (!prev || !next || prev.length !== next.length) return false;
    for (var i = 0; i < next.length; i++) {
      var a = prev[i] || {};
      var b = next[i] || {};
      var ta = a.type || 'scatter';
      var tb = b.type || 'scatter';
      if (ta !== tb) return false;
      if ((a.xaxis || 'x') !== (b.xaxis || 'x')) return false;
      if ((a.yaxis || 'y') !== (b.yaxis || 'y')) return false;
    }
    return true;
  }

  function restyleFrame(el, clean) {
    var n = clean.length;
    var xs = new Array(n);
    var ys = new Array(n);
    var zs = new Array(n);
    var hasZ = false;
    var markerColor = new Array(n);
    var hasMarkerColor = false;
    var markerSize = new Array(n);
    var hasMarkerSize = false;
    var surfacecolor = new Array(n);
    var hasSurf = false;
    for (var i = 0; i < n; i++) {
      var t = clean[i] || {};
      xs[i] = t.x;
      ys[i] = t.y;
      if (t.z != null) {
        zs[i] = t.z;
        hasZ = true;
      } else {
        zs[i] = null;
      }
      if (t.surfacecolor != null) {
        surfacecolor[i] = t.surfacecolor;
        hasSurf = true;
      } else {
        surfacecolor[i] = null;
      }
      if (t.marker && t.marker.color != null) {
        markerColor[i] = t.marker.color;
        hasMarkerColor = true;
      } else {
        markerColor[i] = null;
      }
      if (t.marker && t.marker.size != null) {
        markerSize[i] = t.marker.size;
        hasMarkerSize = true;
      } else {
        markerSize[i] = null;
      }
    }
    var update = { x: xs, y: ys };
    if (hasZ) update.z = zs;
    if (hasSurf) update.surfacecolor = surfacecolor;
    if (hasMarkerColor) update['marker.color'] = markerColor;
    if (hasMarkerSize) update['marker.size'] = markerSize;
    return Plotly.restyle(el, update);
  }

  function plot(el, traces, layoutOpts) {
    if (typeof el === 'string') el = document.getElementById(el);
    if (!el || typeof Plotly === 'undefined') return null;
    var opts = layoutOpts || {};

    /* fit container; bottom legend needs height */
    var h = el.clientHeight || opts.height || 440;
    if (h < 300) h = Math.max(opts.height || 440, 380);
    var w = el.clientWidth || undefined;

    var is3d = !!(opts.scene || (traces || []).some(function (t) {
      return t && (t.type === 'scatter3d' || t.type === 'surface' || t.type === 'mesh3d');
    }));
    if (is3d && !opts.scene) {
      opts = Object.assign({}, opts, { legendPlace: opts.legendPlace || 'inside' });
    }

    var dual = !!(opts.xaxis2 || opts.grid);
    if (dual && !opts.legendPlace) {
      opts = Object.assign({}, opts, {
        legendPlace: 'bottom',
        margin: Object.assign(
          { l: 60, r: 28, t: opts.title ? 40 : 28, b: 104 },
          opts.margin || {}
        ),
        maxLegend: opts.maxLegend != null ? opts.maxLegend : 7
      });
    }

    /* stable uirevision prevents full axis rebuilds between animation frames */
    if (opts.uirevision == null) opts.uirevision = el.id || 'jb-fig';

    var clean = pruneLegend(traces, opts.maxLegend != null ? opts.maxLegend : dual ? 7 : 6);

    /* fast path: same structure → restyle data only (no legend/axis rebuild) */
    var now = performance.now();
    /* throttle frame updates once a plot exists (~22 fps) */
    /* ~28 fps max data updates once painted (restyle is cheap; thrashing is not) */
    var minGap = opts.minFrameMs != null ? opts.minFrameMs : el.__jbHasPlot ? 36 : 0;
    if (el.__jbHasPlot && !opts.forceFull && tracesCompatible(el.data, clean)) {
      if (minGap > 0 && el.__jbLastFrame && now - el.__jbLastFrame < minGap) {
        el.__jbQueuedClean = clean;
        el.__jbQueuedOpts = opts;
        return el.__jbInFlight || null;
      }
      if (el.__jbInFlight) {
        el.__jbQueuedClean = clean;
        el.__jbQueuedOpts = opts;
        return el.__jbInFlight;
      }
      el.__jbLastFrame = now;
      try {
        var pRestyle = restyleFrame(el, clean);
        el.__jbInFlight = Promise.resolve(pRestyle).then(function (v) {
          el.__jbInFlight = null;
          if (el.__jbQueuedClean) {
            var qc = el.__jbQueuedClean;
            var qo = el.__jbQueuedOpts;
            el.__jbQueuedClean = null;
            el.__jbQueuedOpts = null;
            plot(el, qc, Object.assign({}, qo, { forceFull: false, minFrameMs: 0 }));
          }
          return v;
        });
        return el.__jbInFlight;
      } catch (e1) {
        console.warn('JBFig restyle fallback', e1);
        /* fall through to full react */
      }
    }

    var L = layout(
      Object.assign({}, opts, {
        height: h
      })
    );
    if (w) L.width = w;

    try {
      el.__jbLastFrame = now;
      var p = Plotly.react(el, clean, L, CONFIG);
      el.__jbHasPlot = true;
      el.__jbInFlight = Promise.resolve(p).then(function (v) {
        el.__jbInFlight = null;
        return v;
      });
      if (!el.__jbResizeBound) {
        el.__jbResizeBound = true;
        var schedule = null;
        var doResize = function () {
          if (!el || !el.offsetParent || !Plotly.Plots) return;
          var nh = el.clientHeight || h;
          var nw = el.clientWidth;
          if (nw < 40) return;
          Plotly.relayout(el, { width: nw, height: nh });
        };
        var ro =
          typeof ResizeObserver !== 'undefined'
            ? new ResizeObserver(function () {
                if (schedule) cancelAnimationFrame(schedule);
                schedule = requestAnimationFrame(doResize);
              })
            : null;
        if (ro) ro.observe(el);
        window.addEventListener('resize', function () {
          if (schedule) cancelAnimationFrame(schedule);
          schedule = requestAnimationFrame(doResize);
        });
      }
      return el.__jbInFlight;
    } catch (e) {
      console.error('JBFig.plot', e);
      return null;
    }
  }

  /**
   * Lightweight animation loop.
   * - default ~18 fps (smooth, not thrashing)
   * - pauses when tab hidden
   * - pauses when root element is off-screen (pass plot el as 3rd arg)
   * - skips a frame if the previous one is still painting
   */
  function rafLoop(fn, fps, elOrOpts) {
    fps = fps != null ? fps : 18;
    var opts = {};
    if (typeof elOrOpts === 'string' || (elOrOpts && elOrOpts.nodeType === 1)) {
      opts.el = elOrOpts;
    } else if (elOrOpts && typeof elOrOpts === 'object') {
      opts = elOrOpts;
    }
    var minDt = 1000 / Math.max(4, Math.min(fps, 30));
    var last = 0;
    var alive = true;
    var inFlight = false;
    var inView = true;
    var watch =
      typeof opts.el === 'string' ? document.getElementById(opts.el) : opts.el || null;

    if (watch && typeof IntersectionObserver !== 'undefined') {
      var io = new IntersectionObserver(
        function (entries) {
          for (var i = 0; i < entries.length; i++) {
            if (entries[i].target === watch) inView = entries[i].isIntersecting;
          }
        },
        { root: null, rootMargin: '120px 0px', threshold: 0.02 }
      );
      io.observe(watch);
    }

    function tick(now) {
      if (!alive) return;
      requestAnimationFrame(tick);
      if (document.hidden || !inView) return;
      if (inFlight) return;
      if (now - last < minDt) return;
      last = now;
      inFlight = true;
      var ret;
      try {
        ret = fn(now);
      } catch (err) {
        inFlight = false;
        console.error('JBFig.rafLoop', err);
        return;
      }
      if (ret && typeof ret.then === 'function') {
        ret.then(
          function () {
            inFlight = false;
          },
          function () {
            inFlight = false;
          }
        );
      } else {
        /* allow the browser to paint before accepting another frame */
        requestAnimationFrame(function () {
          inFlight = false;
        });
      }
    }
    requestAnimationFrame(tick);
    return function () {
      alive = false;
    };
  }

  function linspace(a, b, n) {
    var out = new Array(n);
    if (n === 1) {
      out[0] = a;
      return out;
    }
    var h = (b - a) / (n - 1);
    for (var i = 0; i < n; i++) out[i] = a + i * h;
    return out;
  }

  /** Drop oldest samples in O(k) when longer than max (avoids per-frame array.shift). */
  function capTrail(series, max, keep) {
    if (!series || series.length <= max) return series;
    var nKeep = keep != null ? keep : Math.floor(max * 0.7);
    if (nKeep < 1) nKeep = Math.floor(max * 0.5);
    series.splice(0, series.length - nKeep);
    return series;
  }

  function clamp(x, lo, hi) {
    return Math.max(lo, Math.min(hi, x));
  }

  /* Dormand–Prince 5(4) adaptive RK for autonomous ẋ = f(x) */
  function rk45(f, x0, t0, t1, opts) {
    opts = opts || {};
    var atol = opts.atol != null ? opts.atol : 1e-9;
    var rtol = opts.rtol != null ? opts.rtol : 1e-8;
    var hMax = opts.hMax != null ? opts.hMax : Math.abs(t1 - t0) / 20;
    var hMin = opts.hMin != null ? opts.hMin : 1e-12;
    var maxSteps = opts.maxSteps || 80000;
    var dense = !!opts.dense;
    var record = opts.recordEvery != null ? opts.recordEvery : 1;

    var a = [
      [],
      [1 / 5],
      [3 / 40, 9 / 40],
      [44 / 45, -56 / 15, 32 / 9],
      [19372 / 6561, -25360 / 2187, 64448 / 6561, -212 / 729],
      [9017 / 3168, -355 / 33, 46732 / 5247, 49 / 176, -5103 / 18656],
      [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84]
    ];
    var b5 = [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84, 0];
    var b4 = [5179 / 57600, 0, 7571 / 16695, 393 / 640, -92097 / 339200, 187 / 2100, 1 / 40];
    var c = [0, 1 / 5, 3 / 10, 4 / 5, 8 / 9, 1, 1];

    var dim = x0.length;
    var t = t0;
    var x = x0.slice();
    var direction = t1 >= t0 ? 1 : -1;
    var h = direction * Math.min(hMax, Math.abs(t1 - t0) / 50 || 1e-3);
    var ts = [t];
    var xs = [x.slice()];
    var steps = 0;
    var accepted = 0;

    function scaleErr(err, y, ynew) {
      var s = 0;
      for (var i = 0; i < dim; i++) {
        var sci = atol + rtol * Math.max(Math.abs(y[i]), Math.abs(ynew[i]));
        var r = err[i] / sci;
        s += r * r;
      }
      return Math.sqrt(s / dim);
    }

    while (direction * (t - t1) < 0 && steps < maxSteps) {
      if (direction * (t + h - t1) > 0) h = t1 - t;
      if (Math.abs(h) < hMin) break;

      var k = new Array(7);
      k[0] = f(t, x);
      for (var stage = 1; stage < 7; stage++) {
        var ytmp = new Array(dim);
        for (var i = 0; i < dim; i++) {
          var sum = 0;
          for (var j = 0; j < stage; j++) sum += a[stage][j] * k[j][i];
          ytmp[i] = x[i] + h * sum;
        }
        k[stage] = f(t + c[stage] * h, ytmp);
      }

      var y5 = new Array(dim);
      var y4 = new Array(dim);
      var err = new Array(dim);
      for (i = 0; i < dim; i++) {
        var s5 = 0;
        var s4 = 0;
        for (j = 0; j < 7; j++) {
          s5 += b5[j] * k[j][i];
          s4 += b4[j] * k[j][i];
        }
        y5[i] = x[i] + h * s5;
        y4[i] = x[i] + h * s4;
        err[i] = y5[i] - y4[i];
      }

      var e = scaleErr(err, x, y5);
      var fac = 0.9 * Math.pow(1 / Math.max(e, 1e-16), 0.2);
      fac = clamp(fac, 0.2, 5);

      if (e <= 1 || Math.abs(h) <= hMin * 1.01) {
        t += h;
        x = y5;
        accepted++;
        if (dense || accepted % record === 0 || direction * (t - t1) >= 0) {
          ts.push(t);
          xs.push(x.slice());
        }
        h = direction * Math.min(hMax, Math.abs(h) * fac);
      } else {
        h = direction * Math.max(hMin, Math.abs(h) * fac);
      }
      steps++;
    }

    return { t: ts, x: xs, steps: steps, accepted: accepted, success: direction * (t - t1) >= -1e-14 };
  }

  function integrate2d(fxy, x0, y0, tMax, opts) {
    opts = opts || {};
    var res = rk45(
      function (t, u) {
        var v = fxy(u[0], u[1], t);
        return [v[0], v[1]];
      },
      [x0, y0],
      0,
      tMax,
      opts
    );
    return {
      t: res.t,
      x: res.x.map(function (u) {
        return u[0];
      }),
      y: res.x.map(function (u) {
        return u[1];
      }),
      steps: res.steps,
      success: res.success
    };
  }

  function rk4step(f, t, x, h) {
    var k1 = f(t, x);
    var k2 = f(t + 0.5 * h, add(x, scale(k1, 0.5 * h)));
    var k3 = f(t + 0.5 * h, add(x, scale(k2, 0.5 * h)));
    var k4 = f(t + h, add(x, scale(k3, h)));
    return add(x, scale(add(add(k1, scale(k2, 2)), add(scale(k3, 2), k4)), h / 6));
  }

  function add(a, b) {
    var o = new Array(a.length);
    for (var i = 0; i < a.length; i++) o[i] = a[i] + b[i];
    return o;
  }
  function scale(a, s) {
    var o = new Array(a.length);
    for (var i = 0; i < a.length; i++) o[i] = a[i] * s;
    return o;
  }
  function hypot(a) {
    var s = 0;
    for (var i = 0; i < a.length; i++) s += a[i] * a[i];
    return Math.sqrt(s);
  }

  function line(x, y, opts) {
    opts = opts || {};
    var tr = {
      type: 'scatter',
      mode: opts.mode || 'lines',
      x: x,
      y: y,
      showlegend: opts.showlegend != null ? opts.showlegend : !!opts.name,
      line: {
        color: opts.color || C.violet,
        width: opts.width != null ? opts.width : 2
      }
    };
    if (opts.name) tr.name = prettyMath(opts.name);
    if (opts.dash) tr.line.dash = opts.dash;
    if (opts.hovertemplate) tr.hovertemplate = opts.hovertemplate;
    if (opts.fill) tr.fill = opts.fill;
    if (opts.fillcolor) tr.fillcolor = opts.fillcolor;
    if (opts.xaxis) tr.xaxis = opts.xaxis;
    if (opts.yaxis) tr.yaxis = opts.yaxis;
    if (opts.z != null) {
      tr.type = 'scatter3d';
      tr.z = opts.z;
      tr.mode = opts.mode || 'lines';
    }
    return tr;
  }

  function markers(x, y, opts) {
    opts = opts || {};
    var tr = {
      type: 'scatter',
      mode: 'markers',
      x: Array.isArray(x) ? x : [x],
      y: Array.isArray(y) ? y : [y],
      showlegend: opts.showlegend != null ? opts.showlegend : !!opts.name,
      marker: {
        color: opts.color || C.gold,
        size: opts.size || 9,
        symbol: opts.symbol || 'circle',
        line: { color: opts.lineColor || C.bg, width: 1 }
      },
      hovertemplate: opts.hovertemplate || '(%{x:.4f}, %{y:.4f})<extra>' + (opts.name ? prettyMath(opts.name) : '') + '</extra>'
    };
    if (opts.name) tr.name = prettyMath(opts.name);
    if (opts.xaxis) tr.xaxis = opts.xaxis;
    if (opts.yaxis) tr.yaxis = opts.yaxis;
    if (opts.z != null) {
      tr.type = 'scatter3d';
      tr.z = Array.isArray(opts.z) ? opts.z : [opts.z];
    }
    return tr;
  }

  function quiver(fxy, xRange, yRange, nx, ny, opts) {
    opts = opts || {};
    var scale = opts.scale != null ? opts.scale : 0.16;
    var xs = [];
    var ys = [];
    for (var i = 0; i < nx; i++) {
      for (var j = 0; j < ny; j++) {
        var x = xRange[0] + ((i + 0.5) / nx) * (xRange[1] - xRange[0]);
        var y = yRange[0] + ((j + 0.5) / ny) * (yRange[1] - yRange[0]);
        var v = fxy(x, y);
        var n = Math.hypot(v[0], v[1]);
        if (n < 1e-14) continue;
        var len = scale * Math.min((xRange[1] - xRange[0]) / nx, (yRange[1] - yRange[0]) / ny) * 2.1;
        var ux = v[0] / n;
        var uy = v[1] / n;
        var hx = x + len * ux;
        var hy = y + len * uy;
        xs.push(x, hx, null, hx, hx - 0.28 * len * ux + 0.12 * len * -uy, null, hx, hx - 0.28 * len * ux - 0.12 * len * -uy, null);
        ys.push(y, hy, null, hy, hy - 0.28 * len * uy + 0.12 * len * ux, null, hy, hy - 0.28 * len * uy - 0.12 * len * ux, null);
      }
    }
    return {
      type: 'scatter',
      mode: 'lines',
      x: xs,
      y: ys,
      line: { color: opts.color || C.softV, width: opts.width || 1 },
      hoverinfo: 'skip',
      showlegend: !!opts.name,
      name: opts.name ? prettyMath(opts.name) : 'field'
    };
  }

  /**
   * Readout: if text includes $...$ and KaTeX is loaded, typeset those segments.
   * Otherwise upgrade ASCII/pseudo-LaTeX to readable Unicode (same as plot labels).
   */
  function setReadout(id, text) {
    var el = typeof id === 'string' ? document.getElementById(id) : id;
    if (!el) return;
    var src = text == null ? '' : String(text);
    /* avoid thrashing DOM every animation frame */
    if (el.__jbReadout === src) return;
    el.__jbReadout = src;
    var hasDollar = src.indexOf('$') >= 0;
    var hasKatex = typeof window.katex !== 'undefined' || typeof window.renderMathInElement === 'function';
    if (hasDollar && hasKatex) {
      el.innerHTML = escapeHtml(src)
        .replace(/\$\$([\s\S]+?)\$\$/g, function (_, m) {
          return renderInlineOrDisplay(m, true);
        })
        .replace(/\$([^$\n]+?)\$/g, function (_, m) {
          return renderInlineOrDisplay(m, false);
        });
      if (typeof window.renderMathInElement === 'function') {
        try {
          window.renderMathInElement(el, {
            delimiters: [
              { left: '$$', right: '$$', display: true },
              { left: '$', right: '$', display: false }
            ],
            throwOnError: false
          });
        } catch (e) {
          /* keep rendered / escaped text */
        }
      }
    } else {
      el.textContent = prettyMath(src);
    }
  }

  function escapeHtml(s) {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderInlineOrDisplay(tex, display) {
    if (typeof window.katex === 'undefined' || !window.katex.renderToString) {
      return escapeHtml(prettyMath(tex));
    }
    try {
      return window.katex.renderToString(tex, {
        throwOnError: false,
        displayMode: !!display,
        output: 'html'
      });
    } catch (e) {
      return escapeHtml(prettyMath(tex));
    }
  }

  function bindRange(id, onChange) {
    var el = document.getElementById(id);
    if (!el) return null;
    var h = function () {
      onChange(parseFloat(el.value, 10), el);
    };
    el.addEventListener('input', h);
    return { el: el, get: function () { return parseFloat(el.value, 10); }, fire: h };
  }

  function bindSelect(id, onChange) {
    var el = document.getElementById(id);
    if (!el) return null;
    var h = function () {
      onChange(el.value, el);
    };
    el.addEventListener('change', h);
    return { el: el, get: function () { return el.value; }, fire: h };
  }

  function bindButton(id, onClick) {
    var el = document.getElementById(id);
    if (!el) return null;
    el.addEventListener('click', function (ev) {
      onClick(el, ev);
    });
    return el;
  }

  function onReady(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  function fmt(x, d) {
    if (!isFinite(x)) return '—';
    d = d != null ? d : 4;
    var a = Math.abs(x);
    if (a !== 0 && (a < 1e-3 || a >= 1e4)) return x.toExponential(2);
    return x.toFixed(d);
  }

  function residualBadge(name, val, tol) {
    tol = tol != null ? tol : 1e-8;
    var ok = Math.abs(val) <= tol;
    return name + ' = ' + fmt(val, 2) + (ok ? ' ✓' : ' (drift)');
  }

  function polygonArea(xs, ys) {
    var a = 0;
    var n = xs.length;
    for (var i = 0; i < n; i++) {
      var j = (i + 1) % n;
      a += xs[i] * ys[j] - xs[j] * ys[i];
    }
    return 0.5 * Math.abs(a);
  }

  global.JBFig = {
    C: C,
    FONT: FONT,
    CONFIG: CONFIG,
    layout: layout,
    plot: plot,
    prettyMath: prettyMath,
    linspace: linspace,
    capTrail: capTrail,
    clamp: clamp,
    rk45: rk45,
    integrate2d: integrate2d,
    rk4step: rk4step,
    add: add,
    scale: scale,
    hypot: hypot,
    line: line,
    markers: markers,
    quiver: quiver,
    setReadout: setReadout,
    bindRange: bindRange,
    bindSelect: bindSelect,
    bindButton: bindButton,
    onReady: onReady,
    rafLoop: rafLoop,
    fmt: fmt,
    residualBadge: residualBadge,
    polygonArea: polygonArea,
    scrub: scrub
  };
})(typeof window !== 'undefined' ? window : globalThis);
