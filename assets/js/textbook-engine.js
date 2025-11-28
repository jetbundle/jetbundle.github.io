/**
 * Textbook Engine - Pyodide Python execution and Plotly integration
 */

class TextbookEngine {
  constructor() {
    this.pyodide = null;
    this.isLoaded = false;
    this.isLoading = false;
    this.init();
  }

  async init() {
    if (this.isLoading || this.isLoaded) {
      return;
    }

    this.isLoading = true;

    try {
      console.log('Loading Pyodide...');

      this.pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
      });

      await this.pyodide.loadPackage([
        "numpy",
        "scipy"
      ]);

      // Initialize global variable for plot data
      await this.pyodide.runPythonAsync(`
        import json
        plot_data = None
      `);

      this.isLoaded = true;
      this.isLoading = false;
      console.log('Pyodide loaded successfully');

      this.attachEventListeners();
    } catch (error) {
      console.error('Pyodide initialization failed:', error);
      this.isLoading = false;
    }
  }

  ensureEventListeners() {
    // Ensure listeners are attached even if Pyodide hasn't loaded yet
    this.attachEventListeners();
  }

  async waitForLoad() {
    if (this.isLoaded) {
      return true;
    }

    if (!this.isLoading) {
      await this.init();
    }

    while (this.isLoading) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return this.isLoaded;
  }

  attachEventListeners() {
    // Attach to existing buttons
    document.querySelectorAll('.run-button:not(.widget-run)').forEach(button => {
      if (!button.dataset.attached) {
        button.addEventListener('click', (e) => this.runModule(e));
        button.dataset.attached = 'true';
      }
    });

    // Also listen for dynamically added buttons
    const observer = new MutationObserver(() => {
      document.querySelectorAll('.run-button:not(.widget-run)').forEach(button => {
        if (!button.dataset.attached) {
          button.addEventListener('click', (e) => this.runModule(e));
          button.dataset.attached = 'true';
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  async runModule(event) {
    const button = event.target;
    const module = button.closest('.interactive-module');

    if (!module) {
      return;
    }

    const codeBlock = module.querySelector('pre code');
    const outputContainer = module.querySelector('.plotly-container') || module.querySelector('.output-container');

    if (!codeBlock || !outputContainer) {
      return;
    }

    const code = codeBlock.textContent;

    button.disabled = true;
    const originalText = button.textContent;
    button.innerHTML = '<span class="loading"></span> Running...';

    if (!(await this.waitForLoad())) {
      button.disabled = false;
      button.textContent = originalText;
      outputContainer.innerHTML = '<div style="color: var(--error); padding: 1rem;">Error: Pyodide failed to load</div>';
      return;
    }

    try {
      // Reset plot data
      await this.pyodide.runPythonAsync(`plot_data = None`);

      // Inject helper function for creating plots
      const plotHelperCode = `
import json

def create_plot(traces, layout=None):
    """Helper function to create plot data for Plotly.js"""
    global plot_data
    if layout is None:
        layout = {}

    # Convert numpy arrays to lists
    plot_traces = []
    for trace in traces:
        trace_dict = {}
        for key, value in trace.items():
            if hasattr(value, 'tolist'):
                trace_dict[key] = value.tolist()
            else:
                trace_dict[key] = value
        plot_traces.append(trace_dict)

    plot_data = {
        'data': plot_traces,
        'layout': layout
    }
    return plot_data
      `;

      await this.pyodide.runPythonAsync(plotHelperCode);

      // Execute user code
      const modifiedCode = code + `
# Store plot data if create_plot was called
if 'plot_data' in globals() and plot_data is not None:
    pass  # plot_data already set
      `;

      await this.pyodide.runPythonAsync(modifiedCode);

      // Check for plot data
      const hasPlotData = this.pyodide.runPython(`plot_data is not None`);

      if (hasPlotData) {
        const plotJson = this.pyodide.runPython(`json.dumps(plot_data)`);
        const plotData = JSON.parse(plotJson);

        // Ensure dark theme for Plotly
        const isDark = window.themeManager && window.themeManager.currentTheme === 'dark';
        const plotlyTemplate = isDark ? 'plotly_dark' : 'plotly_white';

        // Enable LaTeX rendering in Plotly
        if (plotData.layout) {
          plotData.layout.font = plotData.layout.font || {};
          if (isDark) {
            plotData.layout.font.color = '#f8fafc';
            plotData.layout.plot_bgcolor = '#0a0e1a';
            plotData.layout.paper_bgcolor = '#111827';
          }
        }

        // Configure Plotly for LaTeX rendering
        const plotConfig = {
          template: plotlyTemplate,
          responsive: true,
          toImageButtonOptions: {
            format: 'png',
            filename: 'plot',
            height: plotData.layout?.height || 400,
            width: 1200,
            scale: 1
          }
        };

        // Clear output and destroy any existing Plotly plot
        if (outputContainer.data && Plotly && typeof Plotly.purge === 'function') {
          Plotly.purge(outputContainer);
        }
        outputContainer.innerHTML = '';

        Plotly.newPlot(outputContainer, plotData.data || [], plotData.layout || {}, plotConfig).then(() => {
          // Trigger MathJax rendering after plot is rendered
          if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise([outputContainer]).catch((err) => {
              console.log('MathJax rendering issue:', err);
            });
          }
        });
      } else {
        outputContainer.innerHTML = '<div class="computing">Execution complete (no plot output generated)</div>';
      }
    } catch (error) {
      console.error('Execution error:', error);
      outputContainer.innerHTML = `<div style="color: var(--error); padding: 1rem; background: rgba(239, 68, 68, 0.1); border: 1px solid var(--error); border-radius: 8px;">Error: ${error.message}</div>`;
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  }
}

/**
 * Fix incorrectly parsed math tables
 * Kramdown sometimes interprets $...$ with pipes as tables
 * This function detects and fixes these cases
 */
function fixMathTables() {
  const content = document.querySelector('.textbook-content');
  if (!content) return;

  // Find tables that look like they should be math
  const tables = content.querySelectorAll('table');
  tables.forEach(table => {
    const rows = table.querySelectorAll('tr');
    if (rows.length === 1) {
      // Single row table - might be incorrectly parsed math
      const cells = rows[0].querySelectorAll('td, th');
      if (cells.length > 0) {
        const cellText = Array.from(cells).map(cell => cell.textContent.trim()).join(' ');
        // Check if it looks like math (contains $ or math symbols)
        if (cellText.includes('$') || 
            /[\\{}^_]/.test(cellText) || 
            cellText.match(/\$\$?[^$]+\$\$?/)) {
          // This is likely a math expression, not a table
          // Convert back to inline math
          const mathMatch = cellText.match(/\$([^$]+)\$/);
          if (mathMatch) {
            const mathContent = mathMatch[1].replace(/\s+/g, ' ');
            const mathSpan = document.createElement('span');
            mathSpan.className = 'math';
            mathSpan.textContent = `$${mathContent}$`;
            table.parentNode.replaceChild(mathSpan, table);
          }
        }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  window.textbookEngine = new TextbookEngine();
  // Also attach listeners immediately on DOM ready
  setTimeout(() => {
    if (window.textbookEngine) {
      window.textbookEngine.ensureEventListeners();
    }
  }, 100);
  
  // Fix incorrectly parsed math tables
  fixMathTables();
  
  // Also run after MathJax processes (if available)
  if (window.MathJax && window.MathJax.startup) {
    window.MathJax.startup.promise.then(() => {
      fixMathTables();
    });
  }
});
