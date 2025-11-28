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
    this.initializeContinuousWidgets();
  }

  async initializeContinuousWidgets() {
    // Auto-execute continuous widgets on page load
    for (const [widgetId, widgetData] of this.widgets.entries()) {
      const isContinuous = widgetData.element.classList.contains('widget-continuous') ||
                           widgetData.element.dataset.updateMode === 'continuous';
      if (isContinuous) {
        // Wait a bit for Pyodide to potentially load
        setTimeout(() => {
          this.executeWidget(widgetData, true);
        }, 1000);
      }
    }
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
      // Check if this widget has continuous update mode
      const isContinuous = widgetData.element.classList.contains('widget-continuous') ||
                           widgetData.element.dataset.updateMode === 'continuous';
      
      // Throttle function for efficient continuous updates
      const throttleUpdate = this.throttle((e) => {
        const paramName = e.target.dataset.param;
        const paramValue = e.target.value;

        const valueDisplay = widgetData.element.querySelector(`.widget-value[data-param="${paramName}"]`);
        if (valueDisplay) {
          valueDisplay.textContent = parseFloat(paramValue).toFixed(2);
        }

        // Update plot if in continuous mode
        if (isContinuous) {
          this.executeWidget(widgetData, true); // true = skip button state changes
        }
      }, 150); // 150ms throttle for smooth but efficient updates

      widgetData.sliders.forEach(slider => {
        if (isContinuous) {
          slider.addEventListener('input', throttleUpdate);
        } else {
          slider.addEventListener('input', (e) => {
            const paramName = e.target.dataset.param;
            const paramValue = e.target.value;

            const valueDisplay = widgetData.element.querySelector(`.widget-value[data-param="${paramName}"]`);
            if (valueDisplay) {
              valueDisplay.textContent = parseFloat(paramValue).toFixed(2);
            }
          });
        }
      });

      if (widgetData.runButton && !isContinuous) {
        widgetData.runButton.addEventListener('click', () => {
          this.executeWidget(widgetData);
        });
      }
    });
  }

  throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
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

  async executeWidget(widgetData, skipButtonState = false) {
    const button = widgetData.runButton;
    const output = widgetData.output;

    if (!output) {
      return;
    }

    // Only update button state if not in continuous mode
    if (!skipButtonState && button) {
      button.disabled = true;
      const originalText = button.textContent;
      button.innerHTML = '<span class="loading"></span> Computing...';
    }
    
    // Show computing message only if output is empty or not already computing
    if (!output.innerHTML || !output.innerHTML.includes('Computing')) {
      output.innerHTML = '<div class="computing">Computing solution...</div>';
    }

    try {
      const params = {};
      widgetData.sliders.forEach(slider => {
        params[slider.dataset.param] = parseFloat(slider.value);
      });

      let code = widgetData.code;

      // Inject parameters - map widget param names to Python variable names
      const paramMapping = {
        'lambda': 'lambda_val',
        'y0': 'y0_val',
        't_max': 't_max_val'
      };

      const paramLines = Object.entries(params).map(([key, value]) => {
        // Map widget parameter names to Python variable names
        const paramName = paramMapping[key] || key;
        return `${paramName} = ${value}`;
      }).join('\n');

      // Remove any placeholder comment lines about parameters
      code = code.replace(/# Parameters from widgets.*?\n/g, '');
      code = code.replace(/# lambda_val, y0_val, t_max_val.*?\n/g, '');
      // Remove any existing parameter assignments (may have template syntax or placeholders)
      code = code.replace(/lambda_val\s*=.*?\n/g, '');
      code = code.replace(/y0_val\s*=.*?\n/g, '');
      code = code.replace(/t_max_val\s*=.*?\n/g, '');
      // Remove any Liquid template syntax that might remain
      code = code.replace(/\{\{.*?\}\}/g, '');

      // Insert parameter assignments after imports
      const importSection = code.match(/(^import .+?\n)+/m);
      if (importSection) {
        const importEnd = importSection[0].length;
        code = code.substring(0, importEnd) +
               '\n# Parameters from widgets\n' +
               paramLines + '\n' +
               code.substring(importEnd);
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

        Plotly.newPlot(output, plotData.data || [], plotData.layout || {}, plotConfig);
        
        // Trigger MathJax rendering if MathJax is available
        if (window.MathJax && window.MathJax.typesetPromise) {
          window.MathJax.typesetPromise([output]).catch((err) => {
            console.log('MathJax rendering issue:', err);
          });
        }
      } else {
        output.innerHTML = '<div class="computing">Execution complete (no plot output)</div>';
      }

      } catch (error) {
        console.error('Widget execution error:', error);
        output.innerHTML = `<div style="color: var(--error); padding: 1rem; background: rgba(239, 68, 68, 0.1); border: 1px solid var(--error); border-radius: 8px; margin: 1rem 0;"><strong>Error:</strong> ${error.message}</div>`;
      } finally {
        // Only restore button state if not in continuous mode
        if (!skipButtonState && button) {
          button.disabled = false;
          button.textContent = originalText;
        }
      }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.widgetEngine = new WidgetEngine();
});
