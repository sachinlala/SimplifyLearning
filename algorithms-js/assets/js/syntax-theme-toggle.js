/**
 * Syntax Highlighting Theme Toggle
 * Manages switching between light and dark themes for Prism.js syntax highlighting
 */

class SyntaxThemeToggle {
    constructor() {
        this.lightThemeId = 'prism-light-theme';
        this.darkThemeId = 'prism-dark-theme';
        this.currentTheme = 'light';
        
        this.init();
    }
    
    init() {
        // Load initial themes
        this.loadThemes();
        
        // Set initial theme based on body class
        this.setInitialTheme();
        
        // Listen for theme changes
        this.setupThemeObserver();
    }
    
    loadThemes() {
        // Load light theme
        if (!document.getElementById(this.lightThemeId)) {
            const lightTheme = document.createElement('link');
            lightTheme.id = this.lightThemeId;
            lightTheme.rel = 'stylesheet';
            lightTheme.href = 'assets/vendor/prism/prism-github-light.css';
            document.head.appendChild(lightTheme);
        }
        
        // Load dark theme
        if (!document.getElementById(this.darkThemeId)) {
            const darkTheme = document.createElement('link');
            darkTheme.id = this.darkThemeId;
            darkTheme.rel = 'stylesheet';
            darkTheme.href = 'assets/vendor/prism/prism-dracula.css';
            darkTheme.disabled = true; // Start with dark theme disabled
            document.head.appendChild(darkTheme);
        }
    }
    
    setInitialTheme() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        this.switchTheme(isDarkMode ? 'dark' : 'light');
    }
    
    setupThemeObserver() {
        // Create a MutationObserver to watch for class changes on body
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const isDarkMode = document.body.classList.contains('dark-mode');
                    const newTheme = isDarkMode ? 'dark' : 'light';
                    
                    if (newTheme !== this.currentTheme) {
                        this.switchTheme(newTheme);
                    }
                }
            });
        });
        
        // Start observing the body element for class changes
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
    
    switchTheme(theme) {
        const lightThemeLink = document.getElementById(this.lightThemeId);
        const darkThemeLink = document.getElementById(this.darkThemeId);
        
        if (!lightThemeLink || !darkThemeLink) {
            console.warn('Syntax highlighting themes not loaded');
            return;
        }
        
        if (theme === 'dark') {
            lightThemeLink.disabled = true;
            darkThemeLink.disabled = false;
            this.currentTheme = 'dark';
        } else {
            lightThemeLink.disabled = false;
            darkThemeLink.disabled = true;
            this.currentTheme = 'light';
        }
        
        // Re-highlight all code blocks with new theme
        this.rehighlightCode();
    }
    
    rehighlightCode() {
        // Only rehighlight if Prism is available
        if (typeof Prism !== 'undefined' && Prism.highlightAll) {
            // Small delay to ensure theme CSS is applied
            setTimeout(() => {
                Prism.highlightAll();
            }, 10);
        }
    }
    
    getCurrentTheme() {
        return this.currentTheme;
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.syntaxThemeToggle = new SyntaxThemeToggle();
    });
} else {
    window.syntaxThemeToggle = new SyntaxThemeToggle();
}
