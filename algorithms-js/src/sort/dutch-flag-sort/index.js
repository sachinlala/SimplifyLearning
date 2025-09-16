/**
 * Dutch National Flag Sort - Main Module
 * 
 * Entry point for Dutch National Flag Sort algorithm implementation.
 * Exports all core functions, configuration, and utilities.
 * 
 * @author SimplifyLearning
 * @see https://github.com/sachinlala/SimplifyLearning
 */

// Import core algorithm functions
const {
    dutchFlagSort,
    dutchFlagSort3Way,
    dutchFlagSort2Way,
    dutchFlagSortWithSteps,
    dutchFlagSortSimple,
    sortColors,
    sort012
} = require('./dutch-flag-sort-core.js');

// Import configuration and utilities
const {
    DUTCH_FLAG_SORT_CONFIG,
    DutchFlagSortConfigUtils
} = require('./dutch-flag-sort-config.js');

// Main export object
const DutchFlagSort = {
    // Core algorithm functions
    sort: dutchFlagSort,
    sort3Way: dutchFlagSort3Way,
    sort2Way: dutchFlagSort2Way,
    sortWithSteps: dutchFlagSortWithSteps,
    sortSimple: dutchFlagSortSimple,
    
    // Convenience functions
    sortColors,
    sort012,
    
    // Configuration and utilities
    config: DUTCH_FLAG_SORT_CONFIG,
    utils: DutchFlagSortConfigUtils,
    
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

// Export for different module systems
module.exports = DutchFlagSort;

// Additional named exports for convenience
module.exports.dutchFlagSort = dutchFlagSort;
module.exports.dutchFlagSort3Way = dutchFlagSort3Way;
module.exports.dutchFlagSort2Way = dutchFlagSort2Way;
module.exports.dutchFlagSortWithSteps = dutchFlagSortWithSteps;
module.exports.dutchFlagSortSimple = dutchFlagSortSimple;
module.exports.sortColors = sortColors;
module.exports.sort012 = sort012;
module.exports.DUTCH_FLAG_SORT_CONFIG = DUTCH_FLAG_SORT_CONFIG;
module.exports.DutchFlagSortConfigUtils = DutchFlagSortConfigUtils;