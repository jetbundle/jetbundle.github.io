/**
 * Code Toggle - Show/hide code blocks in interactive modules
 */

class CodeToggle {
  constructor() {
    this.init();
  }

  init() {
    // Add toggle buttons to all code blocks in interactive modules
    document.querySelectorAll('.interactive-module .code-block, .widget-module .code-block').forEach(codeBlock => {
      if (!codeBlock.querySelector('.code-toggle-btn')) {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'code-toggle-btn';
        // Check if code block starts hidden
        const startsHidden = codeBlock.classList.contains('hidden');
        toggleBtn.textContent = startsHidden ? 'Show Code' : 'Hide Code';
        toggleBtn.setAttribute('aria-label', 'Toggle code visibility');

        toggleBtn.addEventListener('click', () => {
          const isHidden = codeBlock.classList.contains('hidden');
          if (isHidden) {
            codeBlock.classList.remove('hidden');
            toggleBtn.textContent = 'Hide Code';
          } else {
            codeBlock.classList.add('hidden');
            toggleBtn.textContent = 'Show Code';
          }
        });

        codeBlock.style.position = 'relative';
        codeBlock.appendChild(toggleBtn);
      }
    });

    // Also watch for dynamically added code blocks
    const observer = new MutationObserver(() => {
      document.querySelectorAll('.interactive-module .code-block, .widget-module .code-block').forEach(codeBlock => {
        if (!codeBlock.querySelector('.code-toggle-btn')) {
          const toggleBtn = document.createElement('button');
          toggleBtn.className = 'code-toggle-btn';
          // Check if code block starts hidden
          const startsHidden = codeBlock.classList.contains('hidden');
          toggleBtn.textContent = startsHidden ? 'Show Code' : 'Hide Code';
          toggleBtn.setAttribute('aria-label', 'Toggle code visibility');

          toggleBtn.addEventListener('click', () => {
            const isHidden = codeBlock.classList.contains('hidden');
            if (isHidden) {
              codeBlock.classList.remove('hidden');
              toggleBtn.textContent = 'Hide Code';
            } else {
              codeBlock.classList.add('hidden');
              toggleBtn.textContent = 'Show Code';
            }
          });

          codeBlock.style.position = 'relative';
          codeBlock.appendChild(toggleBtn);
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.codeToggle = new CodeToggle();
});
