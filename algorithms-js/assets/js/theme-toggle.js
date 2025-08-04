/**
 * Global Theme Toggle System
 * 
 * Provides dark/light mode toggle functionality with localStorage persistence
 * Works across all pages in the SimplifyLearning project
 */

class ThemeManager {
    constructor() {
        this.storageKey = 'simplifylearning-theme';
        this.body = document.body;
        this.init();
    }

    init() {
        // First, ensure body starts clean without dark-mode class
        this.body.classList.remove('dark-mode');
        
        // Load saved theme
        const savedTheme = localStorage.getItem(this.storageKey);
        
        // Apply saved theme, defaulting to light mode if no preference is saved
        if (savedTheme === 'dark') {
            this.enableDarkMode();
        } else {
            // Explicitly set light mode as default
            localStorage.setItem(this.storageKey, 'light');
            this.enableLightMode();
        }

        // Setup toggle button listeners
        this.setupToggleButtons();
    }

    setupToggleButtons() {
        // Home page global toggle
        const globalToggle = document.getElementById('global-theme-toggle');
        if (globalToggle) {
            globalToggle.addEventListener('click', () => this.toggle());
        }

        // Algorithm page toggles
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggle());
        }

        // Update icons on initial load
        this.updateIcon(this.body.classList.contains('dark-mode'));
    }

    toggle() {
        if (this.body.classList.contains('dark-mode')) {
            this.enableLightMode();
        } else {
            this.enableDarkMode();
        }
        // Update icons after toggling
        this.updateIcon(this.body.classList.contains('dark-mode'));
    }

    enableDarkMode() {
        this.body.classList.add('dark-mode');
        localStorage.setItem(this.storageKey, 'dark');
        this.updateIcon(true);
        this.updateStyling();
    }

    enableLightMode() {
        this.body.classList.remove('dark-mode');
        localStorage.setItem(this.storageKey, 'light');
        this.updateIcon(false);
        this.updateStyling();
    }

    updateIcon(isDark) {
        const btn = document.getElementById('global-theme-toggle');
        if (btn) {
            // Show what the next action will be - if dark mode, show sun (switch to light)
            btn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
        }
        
        // Also update algorithm page toggle button if it exists
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            // Show what the next action will be - if dark mode, show sun (switch to light)
            themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
        }
    }

    updateStyling() {
        const isDark = this.body.classList.contains('dark-mode');
        
        // Update global toggle button styling
        const globalToggle = document.getElementById('global-theme-toggle');
        if (globalToggle) {
            // Apply dynamic styling based on theme
            if (isDark) {
                globalToggle.style.background = 'rgba(0, 0, 0, 0.3)';
                globalToggle.style.color = '#d7dadc';
                globalToggle.style.borderColor = 'rgba(215, 218, 220, 0.3)';
            } else {
                globalToggle.style.background = 'rgba(255, 255, 255, 0.2)';
                globalToggle.style.color = '#333';
                globalToggle.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }
        }
    }

    getCurrentTheme() {
        return this.body.classList.contains('dark-mode') ? 'dark' : 'light';
    }
}

// Initialize theme manager when DOM is loaded or immediately if already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.themeManager = new ThemeManager();
    });
} else {
    window.themeManager = new ThemeManager();
}

// Export for module environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
}
