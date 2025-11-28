/**
 * Theme Manager - Handles dark/light theme toggle and Plotly synchronization
 */

class ThemeManager {
  constructor() {
    // Default to dark theme
    this.currentTheme = localStorage.getItem('theme') || 'dark';
    this.systemPreference = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.setupEventListeners();
  }

  applyTheme(theme) {
    document.documentElement.className = `theme-${theme}`;
    document.body.className = `textbook-body theme-${theme}`;

    const sunIcon = document.querySelector('.theme-icon-sun');
    const moonIcon = document.querySelector('.theme-icon-moon');

    if (sunIcon && moonIcon) {
      if (theme === 'dark') {
        sunIcon.style.opacity = '1';
        moonIcon.style.opacity = '0';
      } else {
        sunIcon.style.opacity = '0';
        moonIcon.style.opacity = '1';
      }
    }

    localStorage.setItem('theme', theme);
    this.currentTheme = theme;

    this.syncPlotlyTheme();
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
  }

  syncPlotlyTheme() {
    if (typeof Plotly === 'undefined') {
      return;
    }

    const plotlyTemplate = this.currentTheme === 'dark' ? 'plotly_dark' : 'plotly_white';
    const plotContainers = document.querySelectorAll('.plotly-container');

    plotContainers.forEach(container => {
      if (container.data && container.layout) {
        Plotly.relayout(container, { template: plotlyTemplate });
      }
    });
  }

  setupEventListeners() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggleTheme());
    }

    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.applyTheme(e.matches ? 'light' : 'dark');
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.themeManager = new ThemeManager();
});
