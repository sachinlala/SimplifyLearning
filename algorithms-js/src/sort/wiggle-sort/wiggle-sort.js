/**
 * Wiggle Sort - Main Module
 * 
 * Entry point for Wiggle Sort algorithm implementation.
 * Exports all core functions, configuration, and utilities.
 * 
 * @author SimplifyLearning
 * @see https://github.com/sachinlala/SimplifyLearning
 */

// Import core algorithm functions
const {
    wiggleSortI,
    wiggleSortII,
    wiggleSortWithSteps,
    wiggleSortSimple,
    isWiggleSorted,
    getWigglePattern
} = require('./wiggle-sort-core.js');

// Import configuration and utilities
const {
    WIGGLE_SORT_CONFIG,
    WiggleSortConfigUtils
} = require('./wiggle-sort-config.js');

// Main export object
const WiggleSort = {
    // Core algorithm functions
    sortI: wiggleSortI,
    sortII: wiggleSortII,
    sortWithSteps: wiggleSortWithSteps,
    sortSimple: wiggleSortSimple,
    
    // Utility functions
    isWiggleSorted,
    getWigglePattern,
    
    // Configuration and utilities
    config: WIGGLE_SORT_CONFIG,
    utils: WiggleSortConfigUtils,
    
    // Algorithm metadata
    metadata: {
        name: 'Wiggle Sort',
        category: 'Specialized',
        timeComplexityI: 'O(n)',
        timeComplexityII: 'O(n log n)',
        spaceComplexityI: 'O(1)',
        spaceComplexityII: 'O(n)',
        stable: false,
        inPlace: true, // For variant I
        variants: ['Wiggle Sort I', 'Wiggle Sort II']
    }
};

// Export for different module systems
module.exports = WiggleSort;

// Additional named exports for convenience
module.exports.wiggleSortI = wiggleSortI;
module.exports.wiggleSortII = wiggleSortII;
module.exports.wiggleSortWithSteps = wiggleSortWithSteps;
module.exports.wiggleSortSimple = wiggleSortSimple;
module.exports.isWiggleSorted = isWiggleSorted;
module.exports.getWigglePattern = getWigglePattern;
module.exports.WIGGLE_SORT_CONFIG = WIGGLE_SORT_CONFIG;
module.exports.WiggleSortConfigUtils = WiggleSortConfigUtils;