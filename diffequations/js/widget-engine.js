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

      // Find dropdowns that can change code blocks
      const codeSelector = widget.querySelector('.widget-dropdown[data-code-selector="true"]');

      // Collect all code blocks (for dropdown-based code selection)
      const codeBlocks = Array.from(widget.querySelectorAll('.code-block[data-code-type]'));
      const codeMap = new Map();
      codeBlocks.forEach(block => {
        const codeType = block.dataset.codeType;
        const code = block.querySelector('pre code')?.textContent || '';
        if (codeType && code) {
          codeMap.set(codeType, code);
        }
      });

      // If no code blocks with data-code-type, use the default code block
      let defaultCode = '';
      if (codeMap.size === 0) {
        defaultCode = widget.querySelector('pre code')?.textContent || '';
      }

      this.widgets.set(widgetId, {
        element: widget,
        sliders: Array.from(widget.querySelectorAll('.widget-slider')),
        dropdowns: Array.from(widget.querySelectorAll('.widget-dropdown')),
        codeSelector: codeSelector,  // Dropdown that selects which code to run
        codeMap: codeMap,  // Map of code-type -> code content
        runButton: widget.querySelector('.widget-run'),
        output: output,
        code: defaultCode,  // Default code (used when no dropdown selection)
        executing: false,  // Track execution state to prevent duplicates
        isContinuous: isContinuous,
        continuousActivated: false,  // Track if continuous mode has been activated (after first Run click)
        hasPlot: false,  // Track if plot has been created (for Plotly.react vs newPlot)
        plotDataVar: null,  // Store consistent plot data variable name
        plotHelperDefined: false  // Track if create_plot helper has been defined
      });
    });
  }

  attachWidgetListeners() {
    this.widgets.forEach((widgetData, widgetId) => {
      // Check if this widget has continuous update mode
      const isContinuous = widgetData.isContinuous;

      // Create throttled update function for continuous widgets (created once, used later)
      const throttleUpdate = this.throttle(() => {
        // Check state at execution time, not closure time
        if (widgetData.continuousActivated && !widgetData.executing) {
          console.log('Continuous update triggered for widget:', widgetId);
          this.executeWidget(widgetData, true).catch(err => {
            console.error('Error in continuous update:', err);
          });
        }
      }, 150); // 150ms throttle for smooth but efficient updates

      // Store the throttle function on widgetData for later use
      widgetData.throttleUpdate = throttleUpdate;

      // For all widgets: sliders update display values immediately
      widgetData.sliders.forEach(slider => {
        // Always allow slider value display updates
        const displayUpdateHandler = (e) => {
          const paramName = e.target.dataset.param;
          const paramValue = e.target.value;

          const valueDisplay = widgetData.element.querySelector(`.widget-value[data-param="${paramName}"]`);
          if (valueDisplay) {
            valueDisplay.textContent = parseFloat(paramValue).toFixed(2);
          }

          // If continuous widget is activated, also trigger plot update
          if (isContinuous && widgetData.continuousActivated) {
            throttleUpdate();
          }
        };

        slider.addEventListener('input', displayUpdateHandler);
        // Store handler for potential removal (though we don't need to remove it)
        slider._displayUpdateHandler = displayUpdateHandler;
      });

      // Handle dropdowns (including code selector dropdowns)
      widgetData.dropdowns.forEach(dropdown => {
        dropdown.addEventListener('change', (e) => {
          // If this is a code selector dropdown, update the active code block
          if (dropdown.dataset.codeSelector === 'true' && widgetData.codeMap.size > 0) {
            const selectedType = e.target.value;
            console.log('Code type changed to:', selectedType);

            // Update which code block is visible but preserve toggle state
            const codeBlocks = widgetData.element.querySelectorAll('.code-block[data-code-type]');
            codeBlocks.forEach(block => {
              if (block.dataset.codeType === selectedType) {
                // This is the selected code block - show it but respect its hidden class
                // The hidden class state is managed by the code toggle button
                // We just need to ensure it's visible in the DOM (not display:none)
                block.style.display = '';
              } else {
                // Hide other code blocks with display:none (but keep hidden class state)
                block.style.display = 'none';
              }
            });
          }
        });
      });

      // Handle Run button click
      if (widgetData.runButton) {
        widgetData.runButton.addEventListener('click', () => {
          if (isContinuous && !widgetData.continuousActivated) {
            // First Run click: execute and activate continuous mode
            console.log('Activating continuous mode for widget:', widgetId);

            this.executeWidget(widgetData, true).then(() => {
              // After successful execution, activate continuous mode
              widgetData.continuousActivated = true;

              // Hide button
              if (widgetData.runButton) {
                widgetData.runButton.style.display = 'none';
              }

              console.log('Continuous mode activated for widget:', widgetId);
              console.log('Now sliders will trigger continuous updates');
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
    let output = widgetData.output;

    // Re-find output container in case DOM changed
    if (!output) {
      output = widgetData.element.querySelector('.widget-output');
      if (!output) {
        output = widgetData.element.querySelector('.plotly-container.widget-output');
      }
      if (!output) {
        output = widgetData.element.querySelector('.plotly-container');
      }
      if (output) {
        widgetData.output = output; // Update reference
      }
    }

    if (!output) {
      console.error('No output container found for widget:', widgetData.element.id || 'unknown');
      console.error('Widget element:', widgetData.element);
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
      // Get current slider values
      const params = {};
      widgetData.sliders.forEach(slider => {
        params[slider.dataset.param] = parseFloat(slider.value);
      });

      console.log(`Widget ${widgetData.element.id || 'unknown'} execution with params:`, params);

      // Get code based on dropdown selection if code selector exists
      let code = widgetData.code;
      if (widgetData.codeSelector && widgetData.codeMap.size > 0) {
        const selectedType = widgetData.codeSelector.value;
        if (widgetData.codeMap.has(selectedType)) {
          code = widgetData.codeMap.get(selectedType);
          console.log('Using code for type:', selectedType);
        } else {
          console.warn('Selected code type not found:', selectedType, 'using default');
        }
      }

      // Also collect dropdown values and text inputs for parameters
      widgetData.dropdowns.forEach(dropdown => {
        if (!dropdown.dataset.codeSelector) {  // Don't include code selector as a param
          const paramName = dropdown.dataset.param;
          if (paramName) {
            params[paramName] = dropdown.value;
          }
        }
      });

      // Collect text input values for parameters
      widgetData.element.querySelectorAll('.widget-text').forEach(textInput => {
        const paramName = textInput.dataset.param;
        if (paramName) {
          params[paramName] = textInput.value;
        }
      });

      // Inject parameters - map widget param names to Python variable names
      const paramMapping = {
        'lambda': 'lambda_val',
        'y0': 'y0_val',
        't_max': 't_max_val'
      };

      const paramLines = Object.entries(params).map(([key, value]) => {
        // Check if this is a text input (ends with _expr, _text, or is M/N for exact solver)
        // Text inputs should be treated as strings
        const isTextInput = key.endsWith('_expr') || key.endsWith('_text') ||
                           key === 'M' || key === 'N' ||
                           (typeof value === 'string' && (value.includes('*') || value.includes('+') || value.includes('-')));

        if (isTextInput) {
          // For text inputs, use the key name with _expr suffix
          const pythonVarName = key === 'M' ? 'M_expr' : (key === 'N' ? 'N_expr' : key);
          // Escape quotes and wrap in quotes
          const escapedValue = value.replace(/"/g, '\\"').replace(/\n/g, ' ');
          return `${pythonVarName} = "${escapedValue}"`;
        } else {
          // For numeric inputs, use the key name with _val suffix
          const pythonVarName = (paramMapping[key] || key) + '_val';
          return `${pythonVarName} = ${value}`;
        }
      }).join('\n');

      // Remove any placeholder comment lines about parameters
      code = code.replace(/# Parameters from widgets.*?\n/g, '');
      code = code.replace(/# Parameters from widgets \(injected automatically\).*?\n/g, '');
      code = code.replace(/# Parameters injected automatically.*?\n/g, '');
      code = code.replace(/# lambda_val, y0_val, t_max_val.*?\n/g, '');
      // Remove any existing parameter assignments (may have template syntax or placeholders)
      // Remove common parameter names with both _val and _expr suffixes
      const paramNames = Object.keys(params).concat(Object.values(paramMapping));
      paramNames.forEach(param => {
        const baseName = paramMapping[param] || param;
        // Remove assignments for this parameter with various suffixes
        // Also remove the base name without suffix (e.g., M =, N =)
        code = code.replace(new RegExp(`${baseName}(_val|_expr)?\\s*=.*?\\n`, 'g'), '');
        // For M and N, also remove direct assignments
        if (param === 'M' || param === 'N') {
          code = code.replace(new RegExp(`^${param}\\s*=.*?\\n`, 'gm'), '');
        }
      });
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

      // Ensure Plotly.js is loaded before execution
      if (typeof Plotly === 'undefined') {
        // Wait for Plotly.js to load (it may already be loading)
        let plotlyRetries = 0;
        while (typeof Plotly === 'undefined' && plotlyRetries < 50) {
          await new Promise(resolve => setTimeout(resolve, 100));
          plotlyRetries++;
        }

        // If still not loaded, try to load it
        if (typeof Plotly === 'undefined') {
          await new Promise((resolve, reject) => {
            var plotlyScript = document.createElement('script');
            plotlyScript.src = 'https://cdn.plot.ly/plotly-2.27.0.min.js';
            plotlyScript.charset = 'utf-8';
            plotlyScript.async = true;
            plotlyScript.onload = () => {
              console.log('Plotly.js loaded for widget');
              resolve();
            };
            plotlyScript.onerror = () => {
              reject(new Error('Failed to load Plotly.js'));
            };
            document.head.appendChild(plotlyScript);
          });
        }
      }

      if (!window.textbookEngine || !(await window.textbookEngine.waitForLoad())) {
        throw new Error('Pyodide not loaded');
      }

      // Use consistent widget ID
      const widgetId = widgetData.element.id || `widget_${this.widgets.size}`;
      widgetData.element.id = widgetId; // Ensure ID is set

      // Use consistent plot data variable per widget
      if (!widgetData.plotDataVar) {
        widgetData.plotDataVar = `plot_data_${widgetId.replace(/[^a-zA-Z0-9_]/g, '_')}`;
      }
      const plotDataVar = widgetData.plotDataVar;

      await window.textbookEngine.pyodide.runPythonAsync(`${plotDataVar} = None`);

      // Define create_plot helper if not already defined for this widget
      if (!widgetData.plotHelperDefined) {
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
            elif isinstance(value, (list, tuple)):
                trace_dict[key] = list(value)
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
        widgetData.plotHelperDefined = true;
        console.log('create_plot helper defined for widget:', widgetId);
      }

      // Log the code that will be executed for debugging
      console.log('Executing Python code with parameters:', params);
      console.log('Plot data variable name:', plotDataVar);

      const modifiedCode = code + `
# Store plot data if create_plot was called
if '${plotDataVar}' in globals() and ${plotDataVar} is not None:
    pass  # ${plotDataVar} already set
else:
    print(f"Warning: ${plotDataVar} is None or not in globals after code execution")
      `;

      await window.textbookEngine.pyodide.runPythonAsync(modifiedCode);

      // Check Python stdout for any print statements
      const stdout = window.textbookEngine.pyodide.runPython('import sys; sys.stdout.getvalue() if hasattr(sys.stdout, "getvalue") else ""');
      if (stdout) {
        console.log('Python stdout:', stdout);
      }

      // Check for plot data using widget-specific variable
      const hasPlotData = window.textbookEngine.pyodide.runPython(`${plotDataVar} is not None`);

      console.log(`Widget ${widgetData.element.id || 'unknown'} hasPlotData:`, hasPlotData);
      console.log(`Widget ${widgetData.element.id || 'unknown'} plotDataVar:`, plotDataVar);

      if (hasPlotData) {
        const plotJson = window.textbookEngine.pyodide.runPython(`json.dumps(${plotDataVar})`);
        const plotData = JSON.parse(plotJson);

        console.log(`Widget ${widgetData.element.id || 'unknown'} plot data received:`, {
          traceCount: plotData.data?.length || 0,
          hasLayout: !!plotData.layout,
          title: plotData.layout?.title || 'No title'
        });

        // Default to dark theme for Plotly (static HTML pages use dark theme)
        const isDark = !window.themeManager || (window.themeManager && window.themeManager.currentTheme === 'dark');
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
        // Remove mathjax config if MathJax isn't fully loaded to avoid errors
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

        // Only add mathjax config if MathJax is fully loaded
        if (window.MathJax && window.MathJax.startup && window.MathJax.startup.document && window.MathJax.typesetPromise) {
          plotConfig.mathjax = 'cdn';
        } else {
          console.log('MathJax not fully loaded, skipping LaTeX rendering in Plotly');
          // Convert LaTeX in titles to plain text for now
          if (plotData.layout && plotData.layout.title && typeof plotData.layout.title === 'string') {
            plotData.layout.title = plotData.layout.title
              .replace(/\$.*?\$/g, '') // Remove $...$
              .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)') // Convert frac to readable
              .replace(/\\/g, ''); // Remove remaining backslashes
          }
        }

        // Check if we should use Plotly.react for continuous updates
        // Use react if: continuous widget, plot already exists (hasPlot=true), and output has data
        const shouldUseReact = widgetData.isContinuous && widgetData.hasPlot && output.data && output.data.length > 0;

        if (shouldUseReact) {
          // Use Plotly.react for efficient updates (doesn't recreate the plot DOM)
          console.log('Using Plotly.react for continuous update');

          // Don't clear innerHTML for react - just update the data
          Plotly.react(output, plotData.data || [], plotData.layout || {}, plotConfig).then(() => {
            widgetData.hasPlot = true; // Ensure flag is set
            console.log('Plot updated successfully with Plotly.react');
            // Trigger MathJax rendering after plot update
            if (window.MathJax && window.MathJax.typesetPromise) {
              window.MathJax.typesetPromise([output]).catch((err) => {
                console.log('MathJax rendering issue:', err);
              });
            }
          }).catch(err => {
            console.error('Plotly.react error, falling back to newPlot:', err);
            // Fallback to newPlot if react fails
            output.innerHTML = '';
            Plotly.newPlot(output, plotData.data || [], plotData.layout || {}, plotConfig).then(() => {
              widgetData.hasPlot = true;
              if (window.MathJax && window.MathJax.typesetPromise) {
                window.MathJax.typesetPromise([output]).catch((err) => {
                  console.log('MathJax rendering issue:', err);
                });
              }
            });
          });
        } else {
          // Clear output completely before rendering (first time or manual widget)
          output.innerHTML = '';
          console.log('Using Plotly.newPlot for initial render');
          console.log('Plot data:', {
            dataLength: plotData.data?.length || 0,
            layout: plotData.layout,
            outputElement: output,
            outputId: output.id || 'no-id',
            outputClasses: output.className
          });

          // Verify Plotly is available
          if (typeof Plotly === 'undefined') {
            console.error('Plotly is not loaded!');
            output.innerHTML = '<div style="color: red; padding: 1rem;">Error: Plotly library not loaded</div>';
            return;
          }

          // Use Plotly.newPlot for initial render
          try {
            console.log('Rendering plot with Plotly.newPlot, data:', plotData.data);
            Plotly.newPlot(output, plotData.data || [], plotData.layout || {}, plotConfig).then(() => {
              widgetData.hasPlot = true;
              console.log('Plot rendered successfully with Plotly.newPlot, hasPlot set to true');
              // Verify plot was created
              if (output.data && output.data.length > 0) {
                console.log('Plot verified - output.data exists');
              } else {
                console.warn('Plot may not have rendered - output.data is empty');
              }
              // Don't trigger MathJax rendering - let Plotly handle it if mathjax config is set
              // MathJax in Plotly plots is handled internally by Plotly
            }).catch(err => {
              console.error('Plotly.newPlot error:', err);
              // Check if error is MathJax related and retry without mathjax
              if (err.message && err.message.includes('MathJax')) {
                console.log('Retrying plot without MathJax configuration');
                const configWithoutMathJax = { ...plotConfig };
                delete configWithoutMathJax.mathjax;
                Plotly.newPlot(output, plotData.data || [], plotData.layout || {}, configWithoutMathJax).then(() => {
                  widgetData.hasPlot = true;
                  console.log('Plot rendered successfully without MathJax');
                }).catch(retryErr => {
                  console.error('Plot rendering failed even without MathJax:', retryErr);
                  output.innerHTML = `<div style="color: red; padding: 1rem;">Error rendering plot: ${retryErr.message}</div>`;
                  widgetData.hasPlot = false;
                });
              } else {
                output.innerHTML = `<div style="color: red; padding: 1rem;">Error rendering plot: ${err.message}</div>`;
                widgetData.hasPlot = false; // Reset flag on error
              }
            });
          } catch (err) {
            console.error('Error calling Plotly.newPlot:', err);
            output.innerHTML = `<div style="color: red; padding: 1rem;">Error: ${err.message}</div>`;
            widgetData.hasPlot = false; // Reset flag on error
          }
        }
      } else {
        console.warn(`Widget ${widgetData.element.id || 'unknown'} execution completed but no plot data was generated`);
        console.log('Checking if create_plot was called...');
        // Try to check if create_plot exists and was called
        const createPlotExists = window.textbookEngine.pyodide.runPython(`'create_plot' in globals()`);
        console.log('create_plot exists:', createPlotExists);
        output.innerHTML = '<div class="computing">Execution complete (no plot output). Check console for details.</div>';
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
