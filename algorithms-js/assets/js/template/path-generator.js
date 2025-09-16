/**
 * Path Generator - URL and Path Generation Utilities
 * 
 * Handles all path and URL generation logic for the dynamic template system.
 * Separated from the main template class for better maintainability.
 * 
 * @see https://github.com/sachinlala/SimplifyLearning
 */

class PathGenerator {
    /**
     * Build asset path based on basePath from config
     */
    static buildAssetPath(config, relativePath) {
        if (config.basePath) {
            return `${config.basePath}/${relativePath}`;
        }
        return relativePath;
    }

    /**
     * Auto-generate GitHub path based on algorithm info
     * Prefers *-core.js files for better source code focus
     */
    static generateGithubPath(config) {
        // Prefer *-core.js files for better source code focus on algorithm logic
        const algorithmSlug = config.name.toLowerCase().replace(/\s+/g, '-');
        const coreFileName = `${algorithmSlug}-core.js`;
        const fileName = config.jsPath || coreFileName;
        
        // Use the first category for the GitHub path
        const primaryCategory = Array.isArray(config.category) ? config.category[0] : config.category;
        return `https://github.com/sachinlala/SimplifyLearning/blob/master/algorithms-js/src/${primaryCategory}/${algorithmSlug}/${fileName}`;
    }

    /**
     * Generate Java source path based on algorithm info
     */
    static generateJavaPath(config) {
        // Use the first category for the Java path
        const primaryCategory = Array.isArray(config.category) ? config.category[0] : config.category;
        const algorithmName = config.name.toLowerCase().replace(/\s+/g, '');
        return `https://github.com/sachinlala/SimplifyLearning/tree/master/algorithms-java/src/main/java/com/sl/algorithms/${primaryCategory}/${algorithmName}`;
    }

    /**
     * Generate dynamic algorithms home URL based on config and current environment
     */
    static generateDynamicAlgorithmsHomeUrl(config) {
        // If basePath is provided in config, use it to determine the home URL
        if (config.basePath) {
            return config.basePath + '/';
        }
        
        // For development/relative paths, go back to algorithms index.html
        return '../../../index.html';
    }
    
    /**
     * Generate algorithms home URL for navigation (always points to algorithms home, not site root)
     */
    static generateAlgorithmsHomeUrl(config) {
        // Always point to the algorithms index, never to site root
        if (config.basePath) {
            return `${config.basePath}/index.html`;
        }
        return '../../../index.html';
    }

    /**
     * Generate favicon path
     */
    static generateFaviconPath(config, size = '') {
        const basePath = config.basePath || '../../../';
        const sizeStr = size ? `-${size}` : '';
        const extension = size ? '.png' : '.ico';
        return `${basePath}/assets/favicon/favicon${sizeStr}${extension}`;
    }

    /**
     * Generate CSS path
     */
    static generateCSSPath(config) {
        return config.basePath ? `${config.basePath}/assets/css/styles.css` : config.cssPath;
    }

    /**
     * Generate vendor script path
     */
    static generateVendorPath(config, script = '') {
        const basePath = config.basePath || '../../../';
        const scriptPath = script ? `/${script}` : '';
        return `${basePath}/assets/vendor/prism${scriptPath}`;
    }

    /**
     * Generate asset paths for scripts
     */
    static generateScriptPaths(config) {
        const basePath = config.basePath || '../../../';
        return {
            unifiedThemeManager: `${basePath}/assets/js/unified-theme-manager.js`,
            sidebar: `${basePath}/assets/js/sidebar.js`,
            components: config.componentsPath || `${basePath}/assets/js/components.js`,
            utils: `${basePath}/assets/js/utils.js`
        };
    }

    /**
     * Check if algorithm is a sorting algorithm (supports both string and array categories)
     */
    static isSortingAlgorithm(category) {
        if (typeof category === 'string') {
            return category === 'sort';
        }
        if (Array.isArray(category)) {
            return category.includes('sort');
        }
        return false;
    }

    /**
     * Generate algorithm-specific paths based on category and name
     */
    static generateAlgorithmPaths(config) {
        const algorithmSlug = config.name.toLowerCase().replace(/\s+/g, '-');
        const primaryCategory = Array.isArray(config.category) ? config.category[0] : config.category;
        
        return {
            algorithmSlug,
            primaryCategory,
            basePath: `src/${primaryCategory}/${algorithmSlug}`,
            coreFile: `${algorithmSlug}-core.js`,
            stepsFile: `${algorithmSlug}-steps.js`,
            configFile: `${algorithmSlug}.config.js`,
            mainFile: `${algorithmSlug}.js`
        };
    }

    /**
     * Generate logo path
     */
    static generateLogoPath(config) {
        const basePath = config.basePath || '../../../';
        return `${basePath}/assets/images/sl-logo.svg`;
    }
}

// Export for both environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PathGenerator;
} else if (typeof window !== 'undefined') {
    window.PathGenerator = PathGenerator;
}