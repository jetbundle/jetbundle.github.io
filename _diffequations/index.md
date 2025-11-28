---
layout: textbook
title: "Differential Equations Laboratory"
description: "Production-ready computational infrastructure"
permalink: /diffequations/
order: 0
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
    <button class="run-button">Run Python Code</button>
  </div>
  
  <div class="code-block">
    <pre><code class="language-python">import numpy as np
import plotly.graph_objects as go
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

# Create Plotly figure
fig = go.Figure()
fig.add_trace(go.Scatter(
    x=t, y=sol.flatten(), 
    mode='lines',
    name='y(t) = e^(-2t)',
    line=dict(color='#3b82f6', width=3)
))

# Analytical solution for comparison
fig.add_trace(go.Scatter(
    x=t, y=np.exp(-2*t),
    mode='lines',
    name='Analytical: e^(-2t)',
    line=dict(color='#10b981', width=2, dash='dash')
))

fig.update_layout(
    title="First-Order Linear ODE Solution",
    xaxis_title="Time t",
    yaxis_title="y(t)",
    template="plotly_dark",
    height=400
)

# Convert to JSON for rendering (handled by engine)</code></pre>
  </div>
  
  <div class="plotly-container" id="ode-demo-plot"></div>
</div>

## Widget System Test

### Interactive ODE Explorer

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
    <button class="run-button widget-run">Update Plot</button>
  </div>

  <div class="code-block">
    <pre><code class="language-python">import numpy as np
import plotly.graph_objects as go
from scipy.integrate import odeint

# Parameters from widgets
lambda_val = {{ lambda }}
y0_val = {{ y0 }}
t_max_val = {{ t_max }}

def dydt(y, t, lambda_param):
    return -lambda_param * y

t = np.linspace(0, t_max_val, 200)
sol = odeint(dydt, y0_val, t, args=(lambda_val,))

fig = go.Figure()
fig.add_trace(go.Scatter(
    x=t, y=sol.flatten(), 
    mode='lines',
    name=f'y(t) = {y0_val} * exp(-{lambda_val}t)',
    line=dict(width=3)
))

fig.update_layout(
    title=f"ODE Solution: dy/dt = -{lambda_val}*y",
    xaxis_title="Time t",
    yaxis_title="y(t)",
    template="plotly_dark",
    height=400
)

# Convert to JSON for rendering (handled by engine)</code></pre>
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

