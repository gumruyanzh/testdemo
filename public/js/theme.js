/**
 * Theme Management System
 * Handles dark/light mode toggling with localStorage persistence
 */

(function() {
  'use strict';

  const THEME_KEY = 'testdemo-theme';
  const THEME_LIGHT = 'light';
  const THEME_DARK = 'dark';

  /**
   * Get the current theme from localStorage or system preference
   */
  function getCurrentTheme() {
    // Check localStorage first
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      return savedTheme;
    }

    // Fall back to system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEME_DARK;
    }

    return THEME_LIGHT;
  }

  /**
   * Apply theme to the document
   */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    // Update aria-label for accessibility
    const toggleButton = document.querySelector('.theme-toggle');
    if (toggleButton) {
      const label = theme === THEME_DARK ? 'Switch to light mode' : 'Switch to dark mode';
      toggleButton.setAttribute('aria-label', label);
      toggleButton.setAttribute('title', label);
    }
  }

  /**
   * Toggle between light and dark themes
   */
  function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
    applyTheme(newTheme);

    // Dispatch custom event for other scripts to listen to
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: newTheme } }));
  }

  /**
   * Initialize theme on page load
   */
  function initTheme() {
    const theme = getCurrentTheme();
    applyTheme(theme);

    // Add event listener to toggle button
    const toggleButton = document.querySelector('.theme-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', toggleTheme);
    }

    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        if (!localStorage.getItem(THEME_KEY)) {
          applyTheme(e.matches ? THEME_DARK : THEME_LIGHT);
        }
      });
    }
  }

  // Initialize theme as early as possible to prevent flash
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }

  // Expose toggleTheme globally for manual triggers
  window.toggleTheme = toggleTheme;
})();
