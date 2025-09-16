/**
 * Dutch National Flag Sort - Main Module
 * 
 * Entry point for Dutch National Flag Sort algorithm implementation.
 * Exports all core functions, configuration, and utilities.
 * 
 * @author SimplifyLearning
 * @see https://github.com/sachinlala/SimplifyLearning
 */

// Browser-compatible module that works with globally loaded dependencies

(function() {
    // Check if we're in Node.js or browser environment
    const isNode = typeof module !== 'undefined' && module.exports;
    const isWindow = typeof window !== 'undefined';
    
    // Get dependencies from appropriate environment
    let coreFunctions, config, utils;
    
    if (isNode) {
        // Node.js environment - use require
        const core = require('./dutch-flag-sort-core.js');
        const configModule = require('./dutch-flag-sort.config.js');
        
        coreFunctions = {
            dutchFlagSort: core.dutchFlagSort,
            dutchFlagSort3Way: core.dutchFlagSort3Way,
            dutchFlagSort2Way: core.dutchFlagSort2Way,
            dutchFlagSortWithSteps: core.dutchFlagSortWithSteps,
            dutchFlagSortSimple: core.dutchFlagSortSimple,
            sortColors: core.sortColors,
            sort012: core.sort012
        };
        
        config = configModule.DUTCH_FLAG_SORT_CONFIG;
        utils = configModule.DutchFlagSortConfigUtils;
    } else if (isWindow) {
        // Browser environment - use globals set by previously loaded scripts
        coreFunctions = {
            dutchFlagSort: window.dutchFlagSort,
            dutchFlagSort3Way: window.dutchFlagSort3Way,
            dutchFlagSort2Way: window.dutchFlagSort2Way,
            dutchFlagSortWithSteps: window.dutchFlagSortWithSteps,
            dutchFlagSortSimple: window.dutchFlagSortSimple,
            sortColors: window.sortColors,
            sort012: window.sort012
        };
        
        config = window.DUTCH_FLAG_SORT_CONFIG;
        utils = window.DutchFlagSortConfigUtils;
    }
    
    // Main export object
    const DutchFlagSort = {
        // Core algorithm functions
        sort: coreFunctions?.dutchFlagSort,
        sort3Way: coreFunctions?.dutchFlagSort3Way,
        sort2Way: coreFunctions?.dutchFlagSort2Way,
        sortWithSteps: coreFunctions?.dutchFlagSortWithSteps,
        sortSimple: coreFunctions?.dutchFlagSortSimple,
        
        // Convenience functions
        sortColors: coreFunctions?.sortColors,
        sort012: coreFunctions?.sort012,
        
        // Configuration and utilities
        config: config,
        utils: utils,
        
        // Algorithm metadata
        metadata: {
            name: 'Dutch National Flag Sort',
            category: 'Partitioning',
            timeComplexity: 'O(n)',
            spaceComplexity: 'O(1)',
            stable: false,
            inPlace: true,
            inventor: 'Edsger Dijkstra',
            year: 1976
        }
    };
    
    // Export for different environments
    if (isNode) {
        // Node.js exports
        module.exports = DutchFlagSort;
        
        // Additional named exports for convenience
        Object.assign(module.exports, {
            dutchFlagSort: coreFunctions.dutchFlagSort,
            dutchFlagSort3Way: coreFunctions.dutchFlagSort3Way,
            dutchFlagSort2Way: coreFunctions.dutchFlagSort2Way,
            dutchFlagSortWithSteps: coreFunctions.dutchFlagSortWithSteps,
            dutchFlagSortSimple: coreFunctions.dutchFlagSortSimple,
            sortColors: coreFunctions.sortColors,
            sort012: coreFunctions.sort012,
            DUTCH_FLAG_SORT_CONFIG: config,
            DutchFlagSortConfigUtils: utils
        });
    } else if (isWindow) {
        // Browser globals
        window.DutchFlagSort = DutchFlagSort;
    }
})();
