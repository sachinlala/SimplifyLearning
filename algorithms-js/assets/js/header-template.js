/**
 * Standardized Header Template Component
 * 
 * This ensures consistent header layout across all pages:
 * Ham Menu -> GitHub Icon -> SL Logo (desktop)
 * SL Logo (mobile center)
 * Home/Summary Links + Theme Toggle (right)
 */

class HeaderTemplate {
    constructor() {
        this.basePath = this.detectBasePath();
    }

    /**
     * Detect base path for assets and links
     */
    detectBasePath() {
        const currentPath = window.location.pathname;
        const pathParts = currentPath.split('/');
        
        // Check for production deployment patterns
        const algorithmsIndex = pathParts.findIndex(part => part === 'algorithms');
        if (algorithmsIndex !== -1) {
            return pathParts.slice(0, algorithmsIndex + 1).join('/');
        }
        
        // Local development fallback
        return '';
    }

    /**
     * Generate standardized header HTML
     */
    generateHeader(config = {}) {
        const homeUrl = this.basePath ? `${this.basePath}/` : 'index.html';
        const assetsPath = this.basePath ? `${this.basePath}/assets` : 'assets';
        
        return `
    <header>
        <div class="header-left">
            <!-- Ham Menu (always first) -->
            <button id="hamburger-menu" class="hamburger-btn">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <!-- GitHub Icon (always second) -->
            <a href="https://github.com/sachinlala/SimplifyLearning" target="_blank" class="github-link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
            </a>
            <!-- SL Logo (always third, desktop only) -->
            <a href="${homeUrl}" class="home-link desktop-adjacent">
                <img src="${assetsPath}/images/sl-logo.svg" alt="SimplifyLearning" style="width: 32px; height: 32px;">
            </a>
        </div>
        <div class="header-center mobile-only">
            <!-- SL Logo (mobile center) -->
            <a href="${homeUrl}" class="home-link">
                <img src="${assetsPath}/images/sl-logo.svg" alt="SimplifyLearning" style="width: 32px; height: 32px;">
            </a>
        </div>
        <div class="header-right">
            <!-- Home Link -->
            <a href="${homeUrl}" class="back-to-home desktop-only">🏠 Home</a>
            <!-- Sorting Algorithms Link (if applicable) -->
            ${config.isSortingAlgorithm ? `<a href="${this.basePath ? `${this.basePath}/sorting-algorithms.html` : 'sorting-algorithms.html'}" class="back-to-summary desktop-only" style="padding: 8px 16px; background: rgba(255,255,255,0.2); color: #333; text-decoration: none; border-radius: 4px; transition: all 0.3s ease; margin-right: 10px;">📊 Sorting Algorithms</a>` : ''}
            <!-- Theme Toggle -->
            <div class="theme-slider-container">
                <label class="theme-slider" for="global-theme-toggle">
                    <input type="checkbox" id="global-theme-toggle" class="theme-toggle-input">
                    <span class="slider">
                        <span class="slider-icon sun">☀️</span>
                        <span class="slider-icon moon">🌙</span>
                        <span class="slider-thumb"></span>
                    </span>
                </label>
            </div>
        </div>
    </header>`;
    }

    /**
     * Generate standardized sidebar HTML
     */
    generateSidebar(config = {}) {
        const homeUrl = this.basePath ? `${this.basePath}/` : 'index.html';
        
        return `
    <!-- Hamburger Menu Sidebar -->
    <div id="sidebar-overlay" class="sidebar-overlay">
        <div id="sidebar" class="sidebar">
            <div class="sidebar-header">
                <h3>Algorithms</h3>
                <button id="close-sidebar" class="close-btn">&times;</button>
            </div>
            <div class="sidebar-content">
                <!-- Mobile navigation controls -->
                <div class="mobile-nav-controls" style="padding: 15px; border-bottom: 1px solid #eee; margin-bottom: 10px;">
                    <a href="${homeUrl}" class="mobile-back-home" style="display: block; padding: 12px; background: #007acc; color: white; text-decoration: none; border-radius: 6px; margin-bottom: 10px; text-align: center; font-weight: 500;">🏠 Back to Home</a>
                    ${config.isSortingAlgorithm ? `<a href="${this.basePath ? `${this.basePath}/sorting-algorithms.html` : 'sorting-algorithms.html'}" class="mobile-back-summary" style="display: block; padding: 12px; background: #28a745; color: white; text-decoration: none; border-radius: 6px; margin-bottom: 10px; text-align: center; font-weight: 500;">📊 Sorting Algorithms</a>` : ''}
                    <button id="mobile-theme-toggle" class="mobile-theme-btn" style="width: 100%; padding: 12px; background: #f8f9fa; color: #333; border: 1px solid #ddd; border-radius: 6px; cursor: pointer; font-weight: 500; margin-bottom: 10px;">🌙 Toggle Theme</button>
                </div>
                <!-- Algorithm list will be populated by JavaScript -->
            </div>
        </div>
    </div>`;
    }
}

// Export for use in other scripts
window.HeaderTemplate = HeaderTemplate;