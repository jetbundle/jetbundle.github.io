---
layout: textbook
title: "Differential Equations Laboratory"
description: "Production-ready computational infrastructure"
permalink: /diffequations/
order: 0
chapter: 0
---

# Differential Equations Laboratory

**Production Infrastructure Test - All Features Working**

## Infrastructure Status

| Feature | Status | Demo |
|---------|--------|------|
| Custom Layout | Active | This page |
| Sidebar Navigation | Working | Left panel |
| MathJax | Active | Inline: $x^2 + y^2 = r^2$ |
| Syntax Highlighting | Active | Code blocks below |
| Pyodide Python | Loading | Interactive module |
| Plotly Graphics | Working | Interactive module |
| Theme Toggle | Working | Top-right button |
| Responsive Design | Mobile-ready | Resize browser |

## Interactive Demonstration

### ODE Solver Demo

<div class="interactive-module">
  <div class="module-header">
    <h3>First-Order Linear ODE</h3>
    <button class="run-button">Run</button>
  </div>

  <div class="code-block hidden">
    <pre><code class="language-python">import numpy as np
from scipy.integrate import odeint

# Define ODE: dy/dt = -2y
def dydt(y, t):
    return -2 * y

# Time points
t = np.linspace(0, 3, 100)

# Initial condition
y0 = 1.0

# Solve ODE
sol = odeint(dydt, y0, t)

# Create plot data for Plotly.js
trace1 = {
    'x': t.tolist(),
    'y': sol.flatten().tolist(),
    'mode': 'lines',
    'name': 'y(t) = e^(-2t)',
    'line': {'color': '#3b82f6', 'width': 3}
}

# Analytical solution for comparison
trace2 = {
    'x': t.tolist(),
    'y': np.exp(-2*t).tolist(),
    'mode': 'lines',
    'name': 'Analytical: e^(-2t)',
    'line': {'color': '#10b981', 'width': 2, 'dash': 'dash'}
}

layout = {
    'title': 'First-Order Linear ODE Solution',
    'xaxis': {'title': 'Time t'},
    'yaxis': {'title': 'y(t)'},
    'height': 400
}

# Store plot data for rendering
create_plot([trace1, trace2], layout)</code></pre>
  </div>

  <div class="plotly-container" id="ode-demo-plot"></div>
</div>

## Widget System Test

### Interactive ODE Explorer (Manual Update)

<div class="widget-module" id="ode-widget">
  <div class="module-header">
    <h3>Interactive ODE Explorer</h3>
    <div class="widget-controls">
      <div class="widget-control">
        <label>λ (Decay Rate)</label>
        <input type="range" class="widget-slider" data-param="lambda" min="0.1" max="3" step="0.1" value="1">
        <span class="widget-value" data-param="lambda">1.0</span>
      </div>

      <div class="widget-control">
        <label>y₀ (Initial)</label>
        <input type="range" class="widget-slider" data-param="y0" min="-2" max="2" step="0.1" value="1">
        <span class="widget-value" data-param="y0">1.0</span>
      </div>

      <div class="widget-control">
        <label>Time Span</label>
        <input type="range" class="widget-slider" data-param="t_max" min="1" max="10" step="0.5" value="5">
        <span class="widget-value" data-param="t_max">5.0</span>
      </div>
    </div>
    <button class="run-button widget-run">Run</button>
  </div>

  <div class="code-block hidden">
    <pre><code class="language-python">import numpy as np
from scipy.integrate import odeint

# Parameters from widgets (injected by widget engine)
# lambda_val, y0_val, t_max_val are set by widget sliders

def dydt(y, t, lambda_param):
    return -lambda_param * y

t = np.linspace(0, t_max_val, 200)
sol = odeint(dydt, y0_val, t, args=(lambda_val,))

trace = {
    'x': t.tolist(),
    'y': sol.flatten().tolist(),
    'mode': 'lines',
    'name': f'y(t) = {y0_val} * exp(-{lambda_val}t)',
    'line': {'width': 3, 'color': '#3b82f6'}
}

layout = {
    'title': f'ODE Solution: dy/dt = -{lambda_val}*y',
    'xaxis': {'title': 'Time t'},
    'yaxis': {'title': 'y(t)'},
    'height': 400
}

# Store plot data for rendering
create_plot([trace], layout)</code></pre>
  </div>

  <div class="plotly-container widget-output"></div>
</div>

### Interactive ODE Explorer with Mode Selection

<div class="widget-module" id="ode-widget-mode">
  <div class="module-header">
    <h3>Interactive ODE Explorer</h3>
    <div class="widget-controls">
      <div class="widget-control">
        <label>ODE Type</label>
        <select class="widget-dropdown" data-param="ode_type" data-code-selector="true">
          <option value="exponential">Exponential Decay: dy/dt = -λy</option>
          <option value="oscillatory">Oscillatory: dy/dt = -ω²y</option>
          <option value="logistic">Logistic Growth: dy/dt = ry(1 - y/K)</option>
        </select>
      </div>

      <div class="widget-control">
        <label>λ (Decay Rate)</label>
        <input type="range" class="widget-slider" data-param="lambda" min="0.1" max="3" step="0.1" value="1">
        <span class="widget-value" data-param="lambda">1.0</span>
      </div>

      <div class="widget-control">
        <label>y₀ (Initial)</label>
        <input type="range" class="widget-slider" data-param="y0" min="-2" max="2" step="0.1" value="1">
        <span class="widget-value" data-param="y0">1.0</span>
      </div>

      <div class="widget-control">
        <label>Time Span</label>
        <input type="range" class="widget-slider" data-param="t_max" min="1" max="10" step="0.5" value="5">
        <span class="widget-value" data-param="t_max">5.0</span>
      </div>
    </div>
    <button class="run-button widget-run">Run</button>
  </div>

  <!-- Code block for Exponential Decay -->
  <div class="code-block hidden" data-code-type="exponential">
    <pre><code class="language-python">import numpy as np
from scipy.integrate import odeint

# Parameters from widgets (injected by widget engine)
# lambda_val, y0_val, t_max_val are set by widget sliders

def dydt(y, t, lambda_param):
    return -lambda_param * y

t = np.linspace(0, t_max_val, 200)
sol = odeint(dydt, y0_val, t, args=(lambda_val,))

trace = {
    'x': t.tolist(),
    'y': sol.flatten().tolist(),
    'mode': 'lines',
    'name': f'y(t) = {y0_val} * exp(-{lambda_val}t)',
    'line': {'width': 3, 'color': '#3b82f6'}
}

layout = {
    'title': f'Exponential Decay: dy/dt = -{lambda_val}*y',
    'xaxis': {'title': 'Time t'},
    'yaxis': {'title': 'y(t)'},
    'height': 400
}

# Store plot data for rendering
create_plot([trace], layout)</code></pre>
  </div>

  <!-- Code block for Oscillatory -->
  <div class="code-block hidden" data-code-type="oscillatory">
    <pre><code class="language-python">import numpy as np
from scipy.integrate import odeint

# Parameters from widgets (injected by widget engine)
# lambda_val (used as ω²), y0_val, t_max_val are set by widget sliders
omega_squared = lambda_val  # Using lambda slider as ω²

def dydt(y, t, omega2):
    # Oscillatory: d²y/dt² = -ω²y, written as first-order system
    # y[0] = y, y[1] = dy/dt
    return [y[1], -omega2 * y[0]]

t = np.linspace(0, t_max_val, 200)
# Initial conditions: [y(0), dy/dt(0)] = [y0_val, 0]
y0_system = [y0_val, 0]
sol = odeint(dydt, y0_system, t, args=(omega_squared,))

trace = {
    'x': t.tolist(),
    'y': sol[:, 0].tolist(),  # Extract y(t) from system solution
    'mode': 'lines',
    'name': f'Oscillatory: y(t) with ω² = {omega_squared}',
    'line': {'width': 3, 'color': '#10b981'}
}

layout = {
    'title': f'Oscillatory ODE: d²y/dt² = -{omega_squared}*y',
    'xaxis': {'title': 'Time t'},
    'yaxis': {'title': 'y(t)'},
    'height': 400
}

# Store plot data for rendering
create_plot([trace], layout)</code></pre>
  </div>

  <!-- Code block for Logistic Growth -->
  <div class="code-block hidden" data-code-type="logistic">
    <pre><code class="language-python">import numpy as np
from scipy.integrate import odeint

# Parameters from widgets (injected by widget engine)
# lambda_val (used as r), y0_val, t_max_val are set by widget sliders
r = lambda_val  # Growth rate
K = 2.0  # Carrying capacity (fixed for now)

def dydt(y, t, r_param, K_param):
    return r_param * y * (1 - y / K_param)

t = np.linspace(0, t_max_val, 200)
sol = odeint(dydt, y0_val, t, args=(r, K))

trace = {
    'x': t.tolist(),
    'y': sol.flatten().tolist(),
    'mode': 'lines',
    'name': f'Logistic Growth: r={r}, K={K}',
    'line': {'width': 3, 'color': '#f59e0b'}
}

layout = {
    'title': f'Logistic Growth: dy/dt = {r}*y*(1 - y/{K})',
    'xaxis': {'title': 'Time t'},
    'yaxis': {'title': 'y(t)'},
    'height': 400
}

# Store plot data for rendering
create_plot([trace], layout)</code></pre>
  </div>

  <div class="plotly-container widget-output"></div>
</div>

## Mathematics Test

Display equations using MathJax:

Inline equation: $E = mc^2$

Display equation:

$$
\frac{d^2y}{dt^2} + 4\frac{dy}{dt} + 4y = 0
$$

System of equations:

$$
\begin{cases}
\frac{dx}{dt} = -y - x^3 \\
\frac{dy}{dt} = x - y^3
\end{cases}
$$

## Technical Specifications

### Core Technologies

- Layout: Jekyll Collections + Custom Liquid Templates
- Mathematics: MathJax 3 (LaTeX to HTML)
- Python: Pyodide 0.24.1 (WebAssembly)
- Scientific: NumPy, SciPy, Matplotlib
- Visualization: Plotly.js 2.27.0
- Syntax: Prism.js (30+ languages)
- Styling: Custom CSS with theme variables

### Performance Targets

- Initial Load: 2-3 seconds (excluding Pyodide)
- Pyodide Initialization: <5 seconds
- ODE Solve (1000 steps): <100ms
- Widget Update: <50ms
- Plotly Render: <200ms

## Production Readiness

**Infrastructure Status: PRODUCTION READY**

**Next Steps:**
1. All features implemented and tested
2. Performance optimized
3. Cross-browser compatible
4. Ready for content development

---

**Infrastructure Complete. Ready for textbook content deployment.**
