/**
 * Base Path Utilities
 * 
 * Provides dynamic base path detection to avoid hard-coding domain/site paths.
 * Works for both local development and production deployments.
 */

class BasePathUtils {
    /**
     * Detect the base path for the algorithms section
     * @returns {string} The base path for algorithms (e.g., '/algorithms', '', etc.)
     */
    static detectAlgorithmsBasePath() {
        const currentPath = window.location.pathname;
        const hostname = window.location.hostname;
        const pathParts = currentPath.split('/').filter(part => part);
        
        // Local development detection
        if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.')) {
            // Check if we're in algorithms-js directory structure
            const algorithmsJsIndex = pathParts.findIndex(part => part === 'algorithms-js');
            if (algorithmsJsIndex !== -1) {
                // We're in local development with algorithms-js structure
                const baseParts = pathParts.slice(0, algorithmsJsIndex + 1);
                return '/' + baseParts.join('/');
            } else {
                // Assume algorithms-js content is served from root in local dev
                return '';
            }
        }
        
        // Production deployment detection
        // Check for 'algorithms' folder in the path (like designforlife.co.in/algorithms/)
        const algorithmsIndex = pathParts.findIndex(part => part === 'algorithms');
        if (algorithmsIndex !== -1) {
            // We're in a production deployment with /algorithms/ path
            const baseParts = pathParts.slice(0, algorithmsIndex + 1);
            return '/' + baseParts.join('/');
        }
        
        // Check if algorithms-js content is served from domain root
        // Look for indicators like demo.html, index.html with algorithm content
        if (currentPath.includes('demo.html') || 
            document.querySelector('script[src*="components.js"]') || 
            document.querySelector('.algorithms-grid')) {
            return '';
        }
        
        // Fallback: try to detect from current directory structure
        if (pathParts.length > 0) {
            // If we're in a subdirectory, assume algorithms content is one level up
            return '/' + pathParts.slice(0, -1).join('/');
        }
        
        // Default fallback
        return '';
    }
    
    /**
     * Get the home link URL for the algorithms section
     * @returns {string} The URL to link back to the algorithms home page
     */
    static getAlgorithmsHomeUrl() {
        const basePath = this.detectAlgorithmsBasePath();
        
        // If we have a base path, use it
        if (basePath) {
            return basePath + '/';
        }
        
        // For local development or root-served content
        const currentPath = window.location.pathname;
        if (currentPath.includes('demo.html') || currentPath.includes('/src/')) {
            // We're in a demo page or algorithm subdirectory, go back to index
            return './index.html';
        }
        
        // Default to current directory
        return './';
    }
    
    /**
     * Get the relative path for going back to algorithms home from current location
     * @returns {string} The relative path to algorithms home
     */
    static getRelativeAlgorithmsHomePath() {
        const currentPath = window.location.pathname;
        const pathParts = currentPath.split('/').filter(part => part);
        
        // Count how deep we are in the directory structure
        let depth = 0;
        
        // If we're in a demo page via URL parameter, we're at the root level
        if (currentPath.includes('demo.html')) {
            return 'index.html';
        }
        
        // Look for src/ or algorithm directories to determine depth
        const srcIndex = pathParts.findIndex(part => part === 'src');
        if (srcIndex !== -1) {
            // We're in src/category/algorithm structure
            depth = pathParts.length - srcIndex - 1; // Don't count 'src' itself
        } else {
            // Check for algorithms-js structure
            const algorithmsJsIndex = pathParts.findIndex(part => part === 'algorithms-js');
            if (algorithmsJsIndex !== -1) {
                depth = pathParts.length - algorithmsJsIndex - 1; // Don't count 'algorithms-js' itself
            }
        }
        
        // Generate relative path
        if (depth <= 0) {
            return 'index.html';
        } else {
            const relativePath = '../'.repeat(depth);
            return relativePath + 'index.html';
        }
    }
}

// Export for use in other modules
window.BasePathUtils = BasePathUtils;
