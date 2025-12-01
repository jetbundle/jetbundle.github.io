// Navigation component for differential equations pages
(function() {
  'use strict';

  function createNavigation(currentChapter, currentSection) {
    const nav = document.createElement('nav');
    nav.className = 'diffeq-nav';
    nav.innerHTML = `
      <div class="nav-container">
        <div class="nav-brand">
          <a href="/diffequations/" class="nav-logo">Differential Equations</a>
        </div>
        <div class="nav-menu">
          <div class="nav-dropdown">
            <button class="nav-dropdown-btn" aria-expanded="false" aria-haspopup="true">
              Chapters <span class="dropdown-arrow">▼</span>
            </button>
            <div class="nav-dropdown-content">
              ${DIFFEQUATIONS_NAV.chapters.map(ch => `
                <div class="nav-dropdown-item">
                  <a href="${ch.path}" class="nav-chapter-link ${currentChapter === ch.num ? 'active' : ''}">
                    Chapter ${ch.num}: ${ch.title}
                  </a>
                  <div class="nav-submenu">
                    ${ch.sections.map(sec => `
                      <a href="${sec.path}" class="nav-section-link ${currentSection === sec.num ? 'active' : ''}">
                        ${sec.num} ${sec.title}
                      </a>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          <a href="/diffequations/epilogue/" class="nav-link ${currentSection === 'epilogue' ? 'active' : ''}">Epilogue</a>
          <a href="/" class="nav-link">← Home</a>
        </div>
      </div>
    `;

    // Add click handlers for dropdown
    const dropdownBtn = nav.querySelector('.nav-dropdown-btn');
    const dropdownContent = nav.querySelector('.nav-dropdown-content');

    dropdownBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      const isExpanded = dropdownBtn.getAttribute('aria-expanded') === 'true';
      dropdownBtn.setAttribute('aria-expanded', !isExpanded);
      dropdownContent.classList.toggle('show', !isExpanded);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target)) {
        dropdownBtn.setAttribute('aria-expanded', 'false');
        dropdownContent.classList.remove('show');
      }
    });

    // Close dropdown on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        dropdownBtn.setAttribute('aria-expanded', 'false');
        dropdownContent.classList.remove('show');
      }
    });

    return nav;
  }

  // Auto-detect current chapter and section from URL
  function detectCurrentPage() {
    const path = window.location.pathname;
    let currentChapter = null;
    let currentSection = null;

    if (path.includes('/epilogue/')) {
      currentSection = 'epilogue';
    } else {
      const chapterMatch = path.match(/chapter-0?(\d+)/);
      if (chapterMatch) {
        currentChapter = parseInt(chapterMatch[1], 10);
        const sectionMatch = path.match(/\d+-(\d+)-/);
        if (sectionMatch) {
          currentSection = `${currentChapter}.${sectionMatch[1]}`;
        }
      }
    }

    return { currentChapter, currentSection };
  }

  // Initialize navigation when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }

  function initNav() {
    const { currentChapter, currentSection } = detectCurrentPage();
    const nav = createNavigation(currentChapter, currentSection);
    document.body.insertBefore(nav, document.body.firstChild);
  }
})();
