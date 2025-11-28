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
      // Check if toggle button already exists (as sibling)
      const parent = codeBlock.parentElement;
      if (parent && parent.querySelector('.code-toggle-wrapper')) {
        return; // Already has toggle button
      }

      // Create wrapper to position button outside code block
      const wrapper = document.createElement('div');
      wrapper.className = 'code-toggle-wrapper';
      wrapper.style.position = 'relative';
      wrapper.style.margin = '2rem 0';

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

      // Insert wrapper before code block, move code block into wrapper, add button
      codeBlock.parentElement.insertBefore(wrapper, codeBlock);
      wrapper.appendChild(codeBlock);
      wrapper.appendChild(toggleBtn);
    });

    // Also watch for dynamically added code blocks
    const observer = new MutationObserver(() => {
      document.querySelectorAll('.interactive-module .code-block, .widget-module .code-block').forEach(codeBlock => {
        // Skip if already wrapped or if parent is already a wrapper
        const parent = codeBlock.parentElement;
        if (parent && (parent.classList.contains('code-toggle-wrapper') || parent.querySelector('.code-toggle-wrapper'))) {
          return;
        }

        // Create wrapper to position button outside code block
        const wrapper = document.createElement('div');
        wrapper.className = 'code-toggle-wrapper';
        wrapper.style.position = 'relative';
        wrapper.style.margin = '2rem 0';

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

        // Insert wrapper before code block, move code block into wrapper, add button
        codeBlock.parentElement.insertBefore(wrapper, codeBlock);
        wrapper.appendChild(codeBlock);
        wrapper.appendChild(toggleBtn);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.codeToggle = new CodeToggle();
});
