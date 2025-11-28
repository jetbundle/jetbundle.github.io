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
        "scipy",
        "matplotlib"
      ]);
      
      await this.pyodide.runPythonAsync(`
        import micropip
        await micropip.install('plotly')
        import plotly.graph_objects as go
        plotly_divs = []
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
      await this.pyodide.runPythonAsync(`
        try:
          plotly_divs
        except NameError:
          plotly_divs = []
        plotly_divs.clear()
      `);
      
      const modifiedCode = code + `
# Capture plotly figure data
import json
if 'fig' in locals() and hasattr(fig, 'to_dict'):
    fig_dict = fig.to_dict()
    plotly_json = json.dumps(fig_dict)
      `;
      
      await this.pyodide.runPythonAsync(modifiedCode);
      
      try {
        const plotlyJson = this.pyodide.runPython(`
          plotly_json if 'plotly_json' in locals() else '{}'
        `);
        
        if (plotlyJson && plotlyJson !== '{}') {
          const plotData = JSON.parse(plotlyJson);
          const plotlyTemplate = window.themeManager && window.themeManager.currentTheme === 'dark' ? 'plotly_dark' : 'plotly_white';
          
          Plotly.newPlot(outputContainer, plotData.data || [], plotData.layout || {}, { 
            template: plotlyTemplate,
            responsive: true
          });
        } else {
          outputContainer.innerHTML = '<div class="computing">Execution complete (no plot output generated)</div>';
        }
      } catch (plotError) {
        console.log('No plotly output, checking for other output');
        outputContainer.innerHTML = '<div class="computing">Execution complete</div>';
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

