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
if (typeof module !== 'undefined' && module.exports) {
    // Node.js exports
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
} else if (typeof window !== 'undefined') {
    // Browser exports
    window.WiggleSort = WiggleSort;
    
    window.WiggleSortCore = {
        wiggleSortI,
        wiggleSortII,
        wiggleSortWithSteps,
        wiggleSortSimple,
        isWiggleSorted,
        getWigglePattern
    };
    
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
                if (window.WiggleSortCore && window.WiggleSortCore.wiggleSortII) {
                    result = window.WiggleSortCore.wiggleSortII(arrayToSort);
                    sortedArray = result.sortedArray || result || arrayToSort;
                } else if (wiggleSortII) {
                    result = wiggleSortII(arrayToSort);
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
                if (window.WiggleSortCore && window.WiggleSortCore.wiggleSortI) {
                    result = window.WiggleSortCore.wiggleSortI(arrayToSort);
                    sortedArray = result.sortedArray || result || arrayToSort;
                } else if (wiggleSortI) {
                    result = wiggleSortI(arrayToSort);
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
            const pattern = WiggleSortConfigUtils ? 
                WiggleSortConfigUtils.analyzeWigglePattern(sortedArray) :
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
