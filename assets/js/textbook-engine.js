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
    document.querySelectorAll('.run-button:not(.widget-run)').forEach(button => {
      if (!button.dataset.attached) {
        button.addEventListener('click', (e) => this.runModule(e));
        button.dataset.attached = 'true';
      }
    });
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
        const plotlyTemplate = window.themeManager && window.themeManager.currentTheme === 'dark' ? 'plotly_dark' : 'plotly_white';
        
        Plotly.newPlot(outputContainer, plotData.data || [], plotData.layout || {}, { 
          template: plotlyTemplate,
          responsive: true
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

document.addEventListener('DOMContentLoaded', () => {
  window.textbookEngine = new TextbookEngine();
});

