/**
 * Centralized Path Configuration System
 * 
 * This file serves as the single source of truth for all file paths and URLs
 * throughout the SimplifyLearning algorithms-js project.
 * 
 * PRINCIPLE: DRY (Don't Repeat Yourself) - All paths defined once, used everywhere
 */

class PathConfig {
    constructor() {
        // Auto-detect environment and base path
        this.basePath = this.detectBasePath();
        this.isProduction = this.detectEnvironment();
    }

    /**
     * Detect the base path dynamically
     */
    detectBasePath() {
        if (typeof window === 'undefined') return ''; // Node.js environment
        
        const currentPath = window.location.pathname;
        const pathParts = currentPath.split('/');
        
        // Look for algorithms-js in path
        const algorithmsIndex = pathParts.findIndex(part => part === 'algorithms-js');
        if (algorithmsIndex !== -1) {
            return pathParts.slice(0, algorithmsIndex + 1).join('/');
        }
        
        // Production deployment patterns
        const algorithmsLegacyIndex = pathParts.findIndex(part => part === 'algorithms');
        if (algorithmsLegacyIndex !== -1) {
            return pathParts.slice(0, algorithmsLegacyIndex + 1).join('/');
        }
        
        // Default to root for local development
        return '';
    }

    /**
     * Detect if we're in production environment
     */
    detectEnvironment() {
        if (typeof window === 'undefined') return false;
        return !window.location.hostname.includes('localhost') && 
               !window.location.hostname.includes('127.0.0.1');
    }

    /**
     * Build a complete path from a relative path
     */
    buildPath(relativePath) {
        if (!this.basePath || this.basePath === '') {
            return relativePath;
        }
        const cleanRelativePath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
        const cleanBasePath = this.basePath.endsWith('/') ? this.basePath.slice(0, -1) : this.basePath;
        return `${cleanBasePath}/${cleanRelativePath}`;
    }

    // ===================================================================
    // CORE PAGE PATHS - Single source of truth for all major pages
    // ===================================================================
    
    get pages() {
        return {
            // Main pages
            HOME: this.buildPath('index.html'),
            DEMO: this.buildPath('demo.html'),
            
            // Documentation pages
            SORTING_ALGORITHMS_SUMMARY: this.buildPath('docs/sorting-algorithms.html'),
            // Add future docs pages here:
            // SEARCH_ALGORITHMS_SUMMARY: this.buildPath('docs/search-algorithms.html'),
            // GRAPH_ALGORITHMS_SUMMARY: this.buildPath('docs/graph-algorithms.html'),
        };
    }

    // ===================================================================
    // ASSET PATHS - JavaScript, CSS, Images
    // ===================================================================
    
    get assets() {
        return {
            // JavaScript files
            js: {
                UNIVERSAL_LOADER: this.buildPath('assets/js/universal-loader.js'),
                DYNAMIC_TEMPLATE: this.buildPath('assets/js/dynamic-template.js'),
                SIDEBAR: this.buildPath('assets/js/sidebar.js'),
                THEME_MANAGER: this.buildPath('assets/js/unified-theme-manager.js'),
                UTILS: this.buildPath('assets/js/utils.js'),
                COMPONENTS: this.buildPath('assets/js/components.js'),
            },
            
            // CSS files
            css: {
                MAIN_STYLES: this.buildPath('assets/css/styles.css'),
            },
            
            // Images and icons
            images: {
                LOGO: this.buildPath('assets/images/sl-logo.svg'),
                FAVICON_ICO: this.buildPath('assets/favicon/favicon.ico'),
                FAVICON_16: this.buildPath('assets/favicon/favicon-16x16.png'),
                FAVICON_32: this.buildPath('assets/favicon/favicon-32x32.png'),
                FAVICON_48: this.buildPath('assets/favicon/favicon-48x48.png'),
            },
            
            // Vendor libraries
            vendor: {
                PRISM_JS: this.buildPath('assets/vendor/prism.js'),
                PRISM_JS_LANG: this.buildPath('assets/vendor/prism-javascript.js'),
                PRISM_CSS_LANG: this.buildPath('assets/vendor/prism-css.js'),
                PRISM_JSON_LANG: this.buildPath('assets/vendor/prism-json.js'),
            }
        };
    }

    // ===================================================================
    // ALGORITHM DEMO URLS - Generate dynamic demo URLs
    // ===================================================================
    
    get algorithms() {
        return {
            // Sorting algorithms
            sort: {
                BUBBLE_SORT: this.buildPath('demo.html?algo=sort/bubble-sort'),
                SELECTION_SORT: this.buildPath('demo.html?algo=sort/selection-sort'),
                INSERTION_SORT: this.buildPath('demo.html?algo=sort/insertion-sort'),
                MERGE_SORT: this.buildPath('demo.html?algo=sort/merge-sort'),
                QUICK_SORT: this.buildPath('demo.html?algo=sort/quick-sort'),
                HEAP_SORT: this.buildPath('demo.html?algo=sort/heap-sort'),
                COUNTING_SORT: this.buildPath('demo.html?algo=sort/counting-sort'),
                RADIX_SORT: this.buildPath('demo.html?algo=sort/radix-sort'),
                BUCKET_SORT: this.buildPath('demo.html?algo=sort/bucket-sort'),
                DUTCH_FLAG_SORT: this.buildPath('demo.html?algo=sort/dutch-flag-sort'),
                WIGGLE_SORT: this.buildPath('demo.html?algo=sort/wiggle-sort'),
            },
            
            // Search algorithms
            search: {
                BINARY_SEARCH: this.buildPath('demo.html?algo=search/binary-search'),
            },
            
            // Pattern algorithms
            patterns: {
                COUNT_AND_SAY: this.buildPath('demo.html?algo=patterns/count-and-say'),
            }
        };
    }

    // ===================================================================
    // EXTERNAL URLS - GitHub, documentation links
    // ===================================================================
    
    get external() {
        return {
            GITHUB_REPO: 'https://github.com/sachinlala/SimplifyLearning',
            GITHUB_ALGORITHMS_JS: 'https://github.com/sachinlala/SimplifyLearning/tree/master/algorithms-js',
            GITHUB_ALGORITHMS_JAVA: 'https://github.com/sachinlala/SimplifyLearning/tree/master/algorithms-java',
            LICENSE: 'https://github.com/sachinlala/SimplifyLearning/blob/master/LICENSE',
        };
    }

    // ===================================================================
    // UTILITY METHODS - Helper functions for path manipulation
    // ===================================================================
    
    /**
     * Generate algorithm demo URL dynamically
     */
    getAlgorithmDemoUrl(category, algorithmName) {
        return this.buildPath(`demo.html?algo=${category}/${algorithmName}`);
    }

    /**
     * Generate source code GitHub URL for an algorithm
     */
    getSourceCodeUrl(category, algorithmName, language = 'javascript') {
        const baseGitHub = 'https://github.com/sachinlala/SimplifyLearning/blob/master';
        
        switch (language) {
            case 'javascript':
                return `${baseGitHub}/algorithms-js/src/${category}/${algorithmName}/${algorithmName}-core.js`;
            case 'java':
                // Java paths are more complex, implement specific logic as needed
                return `${baseGitHub}/algorithms-java/src/main/java/com/sl/algorithms/${category}`;
            default:
                return `${baseGitHub}/algorithms-js/src/${category}/${algorithmName}`;
        }
    }

    /**
     * Validate that a path exists (client-side check)
     */
    async validatePath(path) {
        try {
            const response = await fetch(path, { method: 'HEAD' });
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    // ===================================================================
    // CONFIGURATION VALIDATION - Development helper
    // ===================================================================
    
    /**
     * Validate all configured paths (useful for development/testing)
     */
    async validateAllPaths() {
        const results = {
            valid: [],
            invalid: [],
            errors: []
        };

        const pathSections = [
            { name: 'pages', paths: this.pages },
            { name: 'assets.js', paths: this.assets.js },
            { name: 'assets.css', paths: this.assets.css },
            { name: 'assets.images', paths: this.assets.images }
        ];

        for (const section of pathSections) {
            for (const [key, path] of Object.entries(section.paths)) {
                try {
                    const isValid = await this.validatePath(path);
                    const result = { section: section.name, key, path, isValid };
                    
                    if (isValid) {
                        results.valid.push(result);
                    } else {
                        results.invalid.push(result);
                    }
                } catch (error) {
                    results.errors.push({ section: section.name, key, path, error: error.message });
                }
            }
        }

        return results;
    }

    /**
     * Log path validation results to console (development helper)
     */
    async debugPaths() {
        console.log('🔍 Validating all configured paths...');
        const results = await this.validateAllPaths();
        
        console.log(`✅ Valid paths: ${results.valid.length}`);
        console.log(`❌ Invalid paths: ${results.invalid.length}`);
        console.log(`⚠️ Errors: ${results.errors.length}`);
        
        if (results.invalid.length > 0) {
            console.group('❌ Invalid Paths:');
            results.invalid.forEach(r => console.log(`${r.section}.${r.key}: ${r.path}`));
            console.groupEnd();
        }
        
        if (results.errors.length > 0) {
            console.group('⚠️ Path Errors:');
            results.errors.forEach(r => console.log(`${r.section}.${r.key}: ${r.error}`));
            console.groupEnd();
        }
        
        return results;
    }
}

// ===================================================================
// SINGLETON INSTANCE - Global access point
// ===================================================================

// Create singleton instance
const pathConfig = new PathConfig();

// Export for different environments
if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    module.exports = { PathConfig, pathConfig };
} else if (typeof window !== 'undefined') {
    // Browser environment
    window.PathConfig = PathConfig;
    window.pathConfig = pathConfig;
    
    // Development helper - expose debug function globally
    window.debugPaths = () => pathConfig.debugPaths();
}

// ===================================================================
// USAGE EXAMPLES:
// ===================================================================
/*

// Basic usage:
const demoUrl = pathConfig.algorithms.sort.BUBBLE_SORT;
const homePage = pathConfig.pages.HOME;
const themeManager = pathConfig.assets.js.THEME_MANAGER;

// Dynamic generation:
const customAlgoUrl = pathConfig.getAlgorithmDemoUrl('sort', 'custom-sort');
const sourceCodeUrl = pathConfig.getSourceCodeUrl('sort', 'bubble-sort', 'javascript');

// Path validation:
const isValid = await pathConfig.validatePath(pathConfig.pages.HOME);

// Development debugging:
await pathConfig.debugPaths(); // Run in browser console

// Environment detection:
console.log('Base path:', pathConfig.basePath);
console.log('Is production:', pathConfig.isProduction);

*/