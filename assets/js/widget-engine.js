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
    // Don't auto-execute continuous widgets - they require user to click "Run" first
    // This method is kept for future use but currently does nothing
  }

  discoverWidgets() {
    document.querySelectorAll('.widget-module').forEach((widget, index) => {
      const widgetId = widget.id || `widget-${index}`;
      widget.id = widgetId;

      // Find the output container - prioritize widget-output, then plotly-container
      // Make sure it's within this widget module
      let output = widget.querySelector('.widget-output');
      if (!output) {
        output = widget.querySelector('.plotly-container.widget-output');
      }
      if (!output) {
        output = widget.querySelector('.plotly-container');
      }

      const isContinuous = widget.classList.contains('widget-continuous') ||
                           widget.dataset.updateMode === 'continuous';

      this.widgets.set(widgetId, {
        element: widget,
        sliders: Array.from(widget.querySelectorAll('.widget-slider')),
        runButton: widget.querySelector('.widget-run'),
        output: output,
        code: widget.querySelector('pre code')?.textContent || '',
        executing: false,  // Track execution state to prevent duplicates
        isContinuous: isContinuous,
        continuousActivated: false  // Track if continuous mode has been activated (after first Run click)
      });
    });
  }

  attachWidgetListeners() {
    this.widgets.forEach((widgetData, widgetId) => {
      // Check if this widget has continuous update mode
      const isContinuous = widgetData.isContinuous;

      // For continuous widgets: initially sliders only update display values
      // After clicking Run, continuous updates will be enabled
      widgetData.sliders.forEach(slider => {
        // Always allow slider value display updates
        slider.addEventListener('input', (e) => {
          const paramName = e.target.dataset.param;
          const paramValue = e.target.value;

          const valueDisplay = widgetData.element.querySelector(`.widget-value[data-param="${paramName}"]`);
          if (valueDisplay) {
            valueDisplay.textContent = parseFloat(paramValue).toFixed(2);
          }
        });
      });

      // Throttle function for efficient continuous updates (used after Run is clicked)
      const throttleUpdate = this.throttle((e) => {
        if (widgetData.continuousActivated) {
          this.executeWidget(widgetData, true); // true = skip button state changes
        }
      }, 150); // 150ms throttle for smooth but efficient updates

      // Handle Run button click
      if (widgetData.runButton) {
        widgetData.runButton.addEventListener('click', () => {
          if (isContinuous && !widgetData.continuousActivated) {
            // First Run click: execute and activate continuous mode
            // Mark as activated immediately to prevent button restoration
            widgetData.continuousActivated = true;
            
            this.executeWidget(widgetData, true).then(() => {
              // After successful execution, hide button and enable continuous updates
              if (widgetData.runButton) {
                widgetData.runButton.style.display = 'none';
              }
              
              // Attach continuous update listeners to sliders
              widgetData.sliders.forEach(slider => {
                slider.addEventListener('input', throttleUpdate);
              });
            }).catch(err => {
              console.error('Error activating continuous mode:', err);
              // Reset if execution failed
              widgetData.continuousActivated = false;
              if (widgetData.runButton) {
                widgetData.runButton.style.display = '';
              }
            });
          } else {
            // Manual widget or already activated continuous widget
            this.executeWidget(widgetData, false);
          }
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
    // Prevent duplicate executions
    if (widgetData.executing) {
      console.log('Widget already executing, skipping...');
      return;
    }

    const button = widgetData.runButton;
    const output = widgetData.output;

    if (!output) {
      console.error('No output container found for widget');
      return;
    }

    widgetData.executing = true;

    // Only update button state if not in continuous mode
    let originalText = '';
    if (!skipButtonState && button) {
      button.disabled = true;
      originalText = button.textContent;
      button.innerHTML = '<span class="loading"></span> Computing...';
    }

    // Clear any previous error messages or plots - destroy Plotly plot if exists
    if (output.data && Plotly && typeof Plotly.purge === 'function') {
      Plotly.purge(output);
    }
    output.innerHTML = '<div class="computing">Computing solution...</div>';

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

      // Reset plot data for this execution (use unique variable per widget to prevent conflicts)
      const widgetId = widgetData.element.id || `widget_${Date.now()}`;
      const plotDataVar = `plot_data_${widgetId.replace(/[^a-zA-Z0-9_]/g, '_')}`;
      await window.textbookEngine.pyodide.runPythonAsync(`${plotDataVar} = None`);

      // Construct Python code with widget-specific variable name
      const plotHelperCode = `import json

def create_plot(traces, layout=None):
    """Helper function to create plot data for Plotly.js"""
    global ${plotDataVar}
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

    ${plotDataVar} = {
        'data': plot_traces,
        'layout': layout
    }
    return ${plotDataVar}
      `;

      await window.textbookEngine.pyodide.runPythonAsync(plotHelperCode);

      const modifiedCode = code + `
# Store plot data if create_plot was called
if '${plotDataVar}' in globals() and ${plotDataVar} is not None:
    pass  # ${plotDataVar} already set
      `;

      await window.textbookEngine.pyodide.runPythonAsync(modifiedCode);

      // Check for plot data using widget-specific variable
      const hasPlotData = window.textbookEngine.pyodide.runPython(`${plotDataVar} is not None`);

      if (hasPlotData) {
        const plotJson = window.textbookEngine.pyodide.runPython(`json.dumps(${plotDataVar})`);
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

        // Clear output completely before rendering
        output.innerHTML = '';

        // Use Plotly.newPlot which automatically replaces any existing plot
        Plotly.newPlot(output, plotData.data || [], plotData.layout || {}, plotConfig).then(() => {
          // Trigger MathJax rendering after plot is rendered
          if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise([output]).catch((err) => {
              console.log('MathJax rendering issue:', err);
            });
          }
        });
      } else {
        output.innerHTML = '<div class="computing">Execution complete (no plot output)</div>';
      }

      } catch (error) {
        console.error('Widget execution error:', error);
        output.innerHTML = `<div style="color: var(--error); padding: 1rem; background: rgba(239, 68, 68, 0.1); border: 1px solid var(--error); border-radius: 8px; margin: 1rem 0;"><strong>Error:</strong> ${error.message}</div>`;
      } finally {
        widgetData.executing = false;

        // Only restore button state if not in continuous mode
        // For continuous widgets, button is hidden after first Run, so don't restore it
        if (!skipButtonState && button && !widgetData.continuousActivated) {
          button.disabled = false;
          button.textContent = originalText || 'Run';
        }
      }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.widgetEngine = new WidgetEngine();
});
