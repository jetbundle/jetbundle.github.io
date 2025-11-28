/**
 * Widget Engine - Interactive parameter controls for computational modules
 */

class WidgetEngine {
  constructor() {
    this.widgets = new Map();
    this.init();
  }

  init() {
    this.discoverWidgets();
    this.attachWidgetListeners();
  }

  discoverWidgets() {
    document.querySelectorAll('.widget-module').forEach((widget, index) => {
      const widgetId = widget.id || `widget-${index}`;
      widget.id = widgetId;
      
      this.widgets.set(widgetId, {
        element: widget,
        sliders: Array.from(widget.querySelectorAll('.widget-slider')),
        runButton: widget.querySelector('.widget-run'),
        output: widget.querySelector('.widget-output') || widget.querySelector('.plotly-container'),
        code: widget.querySelector('pre code')?.textContent || ''
      });
    });
  }

  attachWidgetListeners() {
    this.widgets.forEach((widgetData, widgetId) => {
      widgetData.sliders.forEach(slider => {
        slider.addEventListener('input', (e) => {
          const paramName = e.target.dataset.param;
          const paramValue = e.target.value;
          
          const valueDisplay = widgetData.element.querySelector(`.widget-value[data-param="${paramName}"]`);
          if (valueDisplay) {
            valueDisplay.textContent = parseFloat(paramValue).toFixed(2);
          }
        });
      });

      if (widgetData.runButton) {
        widgetData.runButton.addEventListener('click', () => {
          this.executeWidget(widgetData);
        });
      }
    });
  }

  injectParameters(code, params) {
    let modifiedCode = code;
    Object.entries(params).forEach(([key, value]) => {
      const regex = new RegExp(`\\{\\{\\s*${key}[^}]*\\}\\}`, 'g');
      modifiedCode = modifiedCode.replace(regex, String(value));
    });
    return modifiedCode;
  }

  async executeWidget(widgetData) {
    const button = widgetData.runButton;
    const output = widgetData.output;
    
    if (!output) {
      return;
    }

    button.disabled = true;
    const originalText = button.textContent;
    button.innerHTML = '<span class="loading"></span> Computing...';
    output.innerHTML = '<div class="computing">Computing solution...</div>';

    try {
      const params = {};
      widgetData.sliders.forEach(slider => {
        params[slider.dataset.param] = parseFloat(slider.value);
      });

      let code = widgetData.code;
      code = this.injectParameters(code, params);

      if (!window.textbookEngine || !(await window.textbookEngine.waitForLoad())) {
        throw new Error('Pyodide not loaded');
      }

      const modifiedCode = code + `
# Capture plotly figure data
import json
if 'fig' in locals() and hasattr(fig, 'to_dict'):
    fig_dict = fig.to_dict()
    plotly_json = json.dumps(fig_dict)
      `;

      await window.textbookEngine.pyodide.runPythonAsync(`
        try:
          plotly_divs
        except NameError:
          plotly_divs = []
        plotly_divs.clear()
      `);

      await window.textbookEngine.pyodide.runPythonAsync(modifiedCode);

      try {
        const plotlyJson = window.textbookEngine.pyodide.runPython(`
          plotly_json if 'plotly_json' in locals() else '{}'
        `);
        
        if (plotlyJson && plotlyJson !== '{}') {
          const plotData = JSON.parse(plotlyJson);
          const plotlyTemplate = window.themeManager && window.themeManager.currentTheme === 'dark' ? 'plotly_dark' : 'plotly_white';
          
          Plotly.newPlot(output, plotData.data || [], plotData.layout || {}, {
            template: plotlyTemplate,
            responsive: true
          });
        } else {
          output.innerHTML = '<div class="computing">Execution complete (no plot output)</div>';
        }
      } catch (plotError) {
        output.innerHTML = '<div class="computing">Execution complete</div>';
      }

    } catch (error) {
      console.error('Widget execution error:', error);
      output.innerHTML = `<div style="color: var(--error); padding: 1rem; background: rgba(239, 68, 68, 0.1); border: 1px solid var(--error); border-radius: 8px; margin: 1rem 0;"><strong>Error:</strong> ${error.message}</div>`;
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.widgetEngine = new WidgetEngine();
});

