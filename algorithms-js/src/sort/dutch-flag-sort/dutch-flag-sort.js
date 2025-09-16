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
        const core = window.DutchFlagSortCore || {};
        coreFunctions = {
            dutchFlagSort: core.dutchFlagSort || window.dutchFlagSort,
            dutchFlagSort3Way: core.dutchFlagSort3Way,
            dutchFlagSort2Way: core.dutchFlagSort2Way,
            dutchFlagSortWithSteps: core.dutchFlagSortWithSteps || window.dutchFlagSortWithSteps,
            dutchFlagSortSimple: core.dutchFlagSortSimple,
            sortColors: core.sortColors,
            sort012: core.sort012
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
        
        // Demo interface function for dynamic template
        window.runAlgorithm = function(array_input, red_value, white_value, blue_value) {
            try {
                // Parse the array input
                let array;
                if (typeof array_input === 'string') {
                    // Handle comma-separated values
                    const trimmed = array_input.trim();
                    if (trimmed === '') {
                        array = [];
                    } else {
                        array = trimmed.split(',').map(item => {
                            const cleaned = item.trim();
                            // Try to parse as number first
                            const num = Number(cleaned);
                            if (!isNaN(num) && isFinite(num)) {
                                return num;
                            }
                            // Try to parse as boolean
                            if (cleaned.toLowerCase() === 'true') return true;
                            if (cleaned.toLowerCase() === 'false') return false;
                            // Return as string
                            return cleaned;
                        });
                    }
                } else {
                    array = Array.isArray(array_input) ? array_input : [array_input];
                }
                
                // Parse the values (red, white, blue)
                const parseValue = (val) => {
                    if (val === '' || val === null || val === undefined) return null;
                    const trimmed = val.trim();
                    if (trimmed === '' || trimmed.toLowerCase() === 'null') return null;
                    
                    // Try to parse as number
                    const num = Number(trimmed);
                    if (!isNaN(num) && isFinite(num)) return num;
                    
                    // Try to parse as boolean
                    if (trimmed.toLowerCase() === 'true') return true;
                    if (trimmed.toLowerCase() === 'false') return false;
                    
                    // Return as string
                    return trimmed;
                };
                
                const redVal = parseValue(red_value);
                const whiteVal = parseValue(white_value);
                const blueVal = parseValue(blue_value);
                
                // Make a copy of the array to avoid mutating the original
                const arrayToSort = [...array];
                
                // Determine if this is 2-way or 3-way partitioning
                const is3Way = whiteVal !== null && whiteVal !== undefined;
                
                let result;
                let sortedArray;
                
                if (is3Way) {
                    // 3-way partitioning
                    if (coreFunctions?.dutchFlagSort3Way) {
                        result = coreFunctions.dutchFlagSort3Way(arrayToSort, redVal, whiteVal, blueVal);
                        sortedArray = result.sortedArray || arrayToSort;
                    } else {
                        throw new Error('3-way Dutch Flag Sort function not available');
                    }
                } else {
                    // 2-way partitioning
                    if (coreFunctions?.dutchFlagSort2Way) {
                        result = coreFunctions.dutchFlagSort2Way(arrayToSort, redVal, blueVal);
                        sortedArray = result.sortedArray || arrayToSort;
                    } else {
                        throw new Error('2-way Dutch Flag Sort function not available');
                    }
                }
                
                // Format the output
                const originalStr = '[' + array.map(val => JSON.stringify(val)).join(', ') + ']';
                const sortedStr = '[' + sortedArray.map(val => JSON.stringify(val)).join(', ') + ']';
                
                let output = `<strong>Original array:</strong> ${originalStr}<br><br>`;
                output += `<strong>Sorted array:</strong> ${sortedStr}<br><br>`;
                
                if (result && result.metrics && result.metrics.swaps !== undefined) {
                    output += `<strong>Number of swaps:</strong> ${result.metrics.swaps}<br>`;
                }
                if (result && result.metrics && result.metrics.comparisons !== undefined) {
                    output += `<strong>Number of comparisons:</strong> ${result.metrics.comparisons}<br>`;
                }
                
                // Add partitioning information
                if (is3Way) {
                    output += `<br><strong>Partitioning:</strong> ${JSON.stringify(redVal)} | ${JSON.stringify(whiteVal)} | ${JSON.stringify(blueVal)}`;
                } else {
                    output += `<br><strong>Partitioning:</strong> ${JSON.stringify(redVal)} | ${JSON.stringify(blueVal)}`;
                }
                
                return output;
                
            } catch (error) {
                throw new Error(`Dutch Flag Sort error: ${error.message}`);
            }
        };
    }
})();
