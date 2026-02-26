/**
 * Retro Black and White Display Mode
 * Toggles between normal color display and retro black and white mode
 */

(function() {
  'use strict';

  const RETRO_KEY = 'testdemo-retro-mode';

  /**
   * Get the current retro mode state from localStorage
   */
  function getRetroMode() {
    return localStorage.getItem(RETRO_KEY) === 'true';
  }

  /**
   * Apply retro mode styling to the document
   */
  function applyRetroMode(enabled) {
    if (enabled) {
      document.documentElement.classList.add('retro-mode');
    } else {
      document.documentElement.classList.remove('retro-mode');
    }

    localStorage.setItem(RETRO_KEY, enabled.toString());

    // Update toggle button appearance and accessibility label
    const toggleButton = document.querySelector('.retro-toggle');
    if (toggleButton) {
      const icon = toggleButton.querySelector('.retro-icon');
      const label = enabled ? 'Disable retro mode' : 'Enable retro mode';

      toggleButton.setAttribute('aria-label', label);
      toggleButton.setAttribute('title', label);
      toggleButton.classList.toggle('active', enabled);

      if (icon) {
        icon.textContent = enabled ? '📺' : '🎨';
      }
    }
  }

  /**
   * Toggle retro mode on/off
   */
  function toggleRetroMode() {
    const currentMode = getRetroMode();
    const newMode = !currentMode;
    applyRetroMode(newMode);

    // Dispatch custom event for other scripts to listen to
    window.dispatchEvent(new CustomEvent('retromodechange', {
      detail: { enabled: newMode }
    }));
  }

  /**
   * Initialize retro mode on page load
   */
  function initRetroMode() {
    const enabled = getRetroMode();
    applyRetroMode(enabled);

    // Add event listener to toggle button
    const toggleButton = document.querySelector('.retro-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', toggleRetroMode);
    }
  }

  // Initialize retro mode as early as possible to prevent flash
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRetroMode);
  } else {
    initRetroMode();
  }

  // Expose toggleRetroMode globally for manual triggers
  window.toggleRetroMode = toggleRetroMode;
})();
