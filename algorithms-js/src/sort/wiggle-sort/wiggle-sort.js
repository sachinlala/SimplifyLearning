/**
 * Wiggle Sort - Main Module
 * 
 * Entry point for Wiggle Sort algorithm implementation.
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
        const core = require('./wiggle-sort-core.js');
        const configModule = require('./wiggle-sort-config.js');
        
        coreFunctions = {
            wiggleSortI: core.wiggleSortI,
            wiggleSortII: core.wiggleSortII,
            wiggleSortWithSteps: core.wiggleSortWithSteps,
            wiggleSortSimple: core.wiggleSortSimple,
            isWiggleSorted: core.isWiggleSorted,
            getWigglePattern: core.getWigglePattern
        };
        
        config = configModule.WIGGLE_SORT_CONFIG;
        utils = configModule.WiggleSortConfigUtils;
    } else if (isWindow) {
        // Browser environment - use globals set by previously loaded scripts
        const core = window.WiggleSortCore || {};
        coreFunctions = {
            wiggleSortI: core.wiggleSortI || window.wiggleSortI,
            wiggleSortII: core.wiggleSortII || window.wiggleSortII,
            wiggleSortWithSteps: core.wiggleSortWithSteps || window.wiggleSortWithSteps,
            wiggleSortSimple: core.wiggleSortSimple || window.wiggleSortSimple,
            isWiggleSorted: core.isWiggleSorted || window.isWiggleSorted,
            getWigglePattern: core.getWigglePattern || window.getWigglePattern
        };
        
        config = window.WIGGLE_SORT_CONFIG;
        utils = window.WiggleSortConfigUtils;
    }

    // Main export object
    const WiggleSort = {
        // Core algorithm functions
        sortI: coreFunctions?.wiggleSortI,
        sortII: coreFunctions?.wiggleSortII,
        sortWithSteps: coreFunctions?.wiggleSortWithSteps,
        sortSimple: coreFunctions?.wiggleSortSimple,
        
        // Utility functions
        isWiggleSorted: coreFunctions?.isWiggleSorted,
        getWigglePattern: coreFunctions?.getWigglePattern,
        
        // Configuration and utilities
        config: config,
        utils: utils,
        
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

    // Export for different environments
    if (isNode) {
        // Node.js exports
        module.exports = WiggleSort;
        
        // Additional named exports for convenience
        Object.assign(module.exports, {
            wiggleSortI: coreFunctions.wiggleSortI,
            wiggleSortII: coreFunctions.wiggleSortII,
            wiggleSortWithSteps: coreFunctions.wiggleSortWithSteps,
            wiggleSortSimple: coreFunctions.wiggleSortSimple,
            isWiggleSorted: coreFunctions.isWiggleSorted,
            getWigglePattern: coreFunctions.getWigglePattern,
            WIGGLE_SORT_CONFIG: config,
            WiggleSortConfigUtils: utils
        });
    } else if (isWindow) {
        // Browser globals
        window.WiggleSort = WiggleSort;
        
        // Demo interface function for dynamic template
        window.runAlgorithm = function(array_input, variant) {
            console.log('🔍 runAlgorithm called with:', { array_input, variant });
            
            try {
                // Parse the array input
                let array;
                if (typeof array_input === 'string') {
                    const trimmed = array_input.trim();
                    if (trimmed === '') {
                        array = [];
                    } else {
                        array = trimmed.split(',').map(item => {
                            const cleaned = item.trim();
                            const num = Number(cleaned);
                            if (!isNaN(num) && isFinite(num)) {
                                return num;
                            }
                            return 0; // Default to 0 for invalid values
                        });
                    }
                } else {
                    array = Array.isArray(array_input) ? array_input.map(Number) : [Number(array_input)];
                }
                
                console.log('🔍 Parsed array:', array);
                console.log('🔍 Variant:', variant);
                
                // Validate array
                if (array.length === 0) {
                    return '<strong>Result:</strong> Empty array - nothing to wiggle sort.';
                }
                
                // Make a copy to avoid mutating original
                const arrayToSort = [...array];
                const useVariantII = variant === 'II';
                
                let result;
                let sortedArray;
                
                // Call the appropriate wiggle sort function
                if (useVariantII) {
                    if (coreFunctions?.wiggleSortII) {
                        result = coreFunctions.wiggleSortII(arrayToSort);
                        sortedArray = result.sortedArray || result || arrayToSort;
                    } else {
                        // Fallback implementation for Wiggle Sort II
                        sortedArray = [...arrayToSort].sort((a, b) => a - b);
                        // Simple wiggle rearrangement
                        for (let i = 1; i < sortedArray.length; i += 2) {
                            if (i + 1 < sortedArray.length) {
                                [sortedArray[i], sortedArray[i + 1]] = [sortedArray[i + 1], sortedArray[i]];
                            }
                        }
                        result = { sortedArray };
                    }
                } else {
                    // Wiggle Sort I
                    if (coreFunctions?.wiggleSortI) {
                        result = coreFunctions.wiggleSortI(arrayToSort);
                        sortedArray = result.sortedArray || result || arrayToSort;
                    } else {
                        // Fallback implementation for Wiggle Sort I
                        sortedArray = [...arrayToSort];
                        for (let i = 0; i < sortedArray.length - 1; i++) {
                            const shouldBeSmaller = i % 2 === 0;
                            if ((shouldBeSmaller && sortedArray[i] > sortedArray[i + 1]) ||
                                (!shouldBeSmaller && sortedArray[i] < sortedArray[i + 1])) {
                                [sortedArray[i], sortedArray[i + 1]] = [sortedArray[i + 1], sortedArray[i]];
                            }
                        }
                        result = { sortedArray };
                    }
                }
                
                console.log('🔍 Sort result:', result);
                
                // Analyze wiggle pattern
                const pattern = utils ? 
                    utils.analyzeWigglePattern(sortedArray) :
                    { pattern: 'N/A', isValid: 'Unknown' };
                
                // Format the output
                const originalStr = '[' + array.join(', ') + ']';
                const sortedStr = '[' + sortedArray.join(', ') + ']';
                
                let output = `<strong>Original array:</strong> ${originalStr}<br><br>`;
                output += `<strong>Wiggle sorted array:</strong> ${sortedStr}<br><br>`;
                output += `<strong>Variant:</strong> Wiggle Sort ${variant || 'I'}<br>`;
                
                if (pattern.pattern) {
                    output += `<strong>Pattern:</strong> ${pattern.pattern}<br>`;
                    output += `<strong>Valid wiggle:</strong> ${pattern.isValid ? 'Yes' : 'No'}<br>`;
                }
                
                output += `<strong>Time complexity:</strong> ${useVariantII ? 'O(n log n)' : 'O(n)'}<br>`;
                output += `<strong>Space complexity:</strong> ${useVariantII ? 'O(n)' : 'O(1)'}<br>`;
                
                return output;
                
            } catch (error) {
                console.error('❌ Error in runAlgorithm:', error);
                throw new Error(`Wiggle Sort error: ${error.message}`);
            }
        };
    }
})();
