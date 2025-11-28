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
      // Handle {{ param }} and {{ param | default: x }} patterns
      const patterns = [
        new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g'),
        new RegExp(`\\{\\{\\s*${key}\\s*\\|\\s*[^}]*\\}\\}`, 'g'),
      ];
      patterns.forEach(regex => {
        modifiedCode = modifiedCode.replace(regex, String(value));
      });
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
      
      // Inject parameters at the start of the code
      const paramLines = Object.entries(params).map(([key, value]) => {
        // Handle special case for 'lambda' (Python keyword)
        const paramName = key === 'lambda' ? 'lambda_val' : key;
        return `${paramName} = ${value}`;
      }).join('\n');
      
      // Remove any placeholder parameter lines and inject real values
      code = code.replace(/# Parameters from widgets.*?\n/g, '');
      code = code.replace(/lambda_val = .*?\n/g, '');
      code = code.replace(/y0_val = .*?\n/g, '');
      code = code.replace(/t_max_val = .*?\n/g, '');
      
      // Insert parameter assignments at the beginning after imports
      const importEnd = code.indexOf('\n\n');
      if (importEnd > 0) {
        code = code.substring(0, importEnd + 2) + 
               '# Parameters from widgets\n' + 
               paramLines + '\n' + 
               code.substring(importEnd + 2);
      } else {
        code = '# Parameters from widgets\n' + paramLines + '\n\n' + code;
      }

      if (!window.textbookEngine || !(await window.textbookEngine.waitForLoad())) {
        throw new Error('Pyodide not loaded');
      }

      // Reset plot data and inject helper function
      await window.textbookEngine.pyodide.runPythonAsync(`plot_data = None`);

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

      await window.textbookEngine.pyodide.runPythonAsync(plotHelperCode);

      const modifiedCode = code + `
# Store plot data if create_plot was called
if 'plot_data' in globals() and plot_data is not None:
    pass  # plot_data already set
      `;

      await window.textbookEngine.pyodide.runPythonAsync(modifiedCode);

      // Check for plot data
      const hasPlotData = window.textbookEngine.pyodide.runPython(`plot_data is not None`);

      if (hasPlotData) {
        const plotJson = window.textbookEngine.pyodide.runPython(`json.dumps(plot_data)`);
        const plotData = JSON.parse(plotJson);
        const plotlyTemplate = window.themeManager && window.themeManager.currentTheme === 'dark' ? 'plotly_dark' : 'plotly_white';

        Plotly.newPlot(output, plotData.data || [], plotData.layout || {}, {
          template: plotlyTemplate,
          responsive: true
        });
      } else {
        output.innerHTML = '<div class="computing">Execution complete (no plot output)</div>';
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
