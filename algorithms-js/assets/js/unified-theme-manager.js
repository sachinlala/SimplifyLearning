/**
 * Unified Theme Manager
 * 
 * Manages both UI dark/light mode and syntax highlighting themes
 * Provides a single source of truth for all theme-related functionality
 */

class UnifiedThemeManager {
    constructor() {
        this.storageKey = 'simplifylearning-theme';
        this.body = document.body;
        this.currentTheme = 'light';
        
        // Theme configuration
        this.themes = {
            light: {
                syntaxTheme: 'assets/vendor/prism/prism-github-light.css',
                name: 'Light Mode',
                icon: '🌙'
            },
            dark: {
                syntaxTheme: 'assets/vendor/prism/prism-dracula.css',
                name: 'Dark Mode',
                icon: '☀️'
            }
        };
        
        this.init();
    }

    init() {
        // Remove any existing theme classes
        this.body.classList.remove('dark-mode');
        
        // Load saved theme or default to light
        const savedTheme = localStorage.getItem(this.storageKey) || 'light';
        this.setTheme(savedTheme);
        
        // Setup UI event listeners
        this.setupToggleButtons();
        
        // Load syntax highlighting themes
        this.loadSyntaxThemes();
        
        // Setup theme observer for dynamic changes
        this.setupThemeObserver();
    }

    /**
     * Set theme (both UI and syntax highlighting)
     */
    setTheme(theme) {
        if (!this.themes[theme]) {
            console.warn(`Unknown theme: ${theme}. Defaulting to light.`);
            theme = 'light';
        }

        this.currentTheme = theme;
        
        // Update UI theme
        if (theme === 'dark') {
            this.body.classList.add('dark-mode');
        } else {
            this.body.classList.remove('dark-mode');
        }
        
        // Update syntax highlighting theme
        this.updateSyntaxTheme(theme);
        
        // Save theme preference
        localStorage.setItem(this.storageKey, theme);
        
        // Update toggle button appearance
        this.updateToggleButtons();
    }

    /**
     * Toggle between light and dark themes
     */
    toggle() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    /**
     * Setup toggle button event listeners
     */
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
    }

    /**
     * Update toggle button appearance and text
     */
    updateToggleButtons() {
        const isDark = this.currentTheme === 'dark';
        const buttonText = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
        
        // Update global toggle button
        const globalToggle = document.getElementById('global-theme-toggle');
        if (globalToggle) {
            globalToggle.textContent = buttonText;
            this.updateButtonStyling(globalToggle, isDark);
        }
        
        // Update algorithm page toggle button
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.textContent = buttonText;
            this.updateButtonStyling(themeToggle, isDark);
        }
    }

    /**
     * Update individual button styling
     */
    updateButtonStyling(button, isDark) {
        if (isDark) {
            button.style.background = 'rgba(0, 0, 0, 0.3)';
            button.style.color = '#d7dadc';
            button.style.borderColor = 'rgba(215, 218, 220, 0.3)';
        } else {
            button.style.background = 'rgba(255, 255, 255, 0.2)';
            button.style.color = '#333';
            button.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        }
    }

    /**
     * Load syntax highlighting theme stylesheets
     */
    loadSyntaxThemes() {
        Object.entries(this.themes).forEach(([themeName, config]) => {
            const themeId = `prism-${themeName}-theme`;
            
            if (!document.getElementById(themeId)) {
                const link = document.createElement('link');
                link.id = themeId;
                link.rel = 'stylesheet';
                link.href = config.syntaxTheme;
                link.disabled = (themeName !== this.currentTheme);
                document.head.appendChild(link);
            }
        });
    }

    /**
     * Update syntax highlighting theme
     */
    updateSyntaxTheme(theme) {
        Object.keys(this.themes).forEach(themeName => {
            const themeLink = document.getElementById(`prism-${themeName}-theme`);
            if (themeLink) {
                themeLink.disabled = (themeName !== theme);
            }
        });
        
        // Re-highlight code blocks with new theme
        this.rehighlightCode();
    }

    /**
     * Re-highlight all code blocks
     */
    rehighlightCode() {
        if (typeof Prism !== 'undefined' && Prism.highlightAll) {
            // Small delay to ensure theme CSS is applied
            setTimeout(() => {
                Prism.highlightAll();
            }, 10);
        }
    }

    /**
     * Setup observer to watch for external theme changes
     */
    setupThemeObserver() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const isDarkMode = this.body.classList.contains('dark-mode');
                    const expectedTheme = isDarkMode ? 'dark' : 'light';
                    
                    if (expectedTheme !== this.currentTheme) {
                        this.currentTheme = expectedTheme;
                        this.updateSyntaxTheme(expectedTheme);
                        this.updateToggleButtons();
                        localStorage.setItem(this.storageKey, expectedTheme);
                    }
                }
            });
        });
        
        observer.observe(this.body, {
            attributes: true,
            attributeFilter: ['class']
        });
    }

    /**
     * Get current theme
     */
    getCurrentTheme() {
        return this.currentTheme;
    }

    /**
     * Check if current theme is dark
     */
    isDarkMode() {
        return this.currentTheme === 'dark';
    }

    /**
     * Add a custom theme
     */
    addTheme(name, config) {
        if (!config.syntaxTheme || !config.name || !config.icon) {
            throw new Error('Theme config must include syntaxTheme, name, and icon');
        }
        
        this.themes[name] = config;
        
        // Load the new syntax theme
        const themeId = `prism-${name}-theme`;
        if (!document.getElementById(themeId)) {
            const link = document.createElement('link');
            link.id = themeId;
            link.rel = 'stylesheet';
            link.href = config.syntaxTheme;
            link.disabled = true;
            document.head.appendChild(link);
        }
    }
}

// Initialize theme manager when DOM is loaded or immediately if already loaded
let themeManagerInstance = null;

function initializeThemeManager() {
    if (!themeManagerInstance) {
        themeManagerInstance = new UnifiedThemeManager();
        window.themeManager = themeManagerInstance;
    }
    return themeManagerInstance;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeThemeManager);
} else {
    initializeThemeManager();
}

// Export for module environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UnifiedThemeManager;
}
