/**
 * Counting Sort - Main Module Export
 * 
 * Entry point for the Counting Sort algorithm implementation,
 * providing both the core algorithm and demo configuration.
 * 
 * @author SimplifyLearning
 * @see https://github.com/sachinlala/SimplifyLearning
 */

// Import core implementation
const {
    countingSort,
    countingSortWithSteps,
    countingSortSimple
} = require('./counting-sort-core.js');

// Import configuration
const CountingSortConfig = require('./counting-sort-config.js');

// Main export object
const CountingSortModule = {
    // Core algorithm functions
    countingSort,
    countingSortWithSteps,
    countingSortSimple,
    
    // Configuration for demos and visualization
    config: CountingSortConfig,
    
    // Convenience methods
    sort: countingSortSimple,  // Simple sort function
    sortWithSteps: countingSortWithSteps,  // For visualization
    
    // Algorithm information
    info: {
        name: 'Counting Sort',
        type: 'Distribution Sort',
        timeComplexity: {
            best: 'O(n + k)',
            average: 'O(n + k)',
            worst: 'O(n + k)',
            space: 'O(k)'
        },
        stable: true,
        inPlace: false,
        description: CountingSortConfig.description
    },
    
    // Quick demo function
    demo: function(arr) {
        if (!arr) {
            arr = CountingSortConfig.testCases[0].input;
        }
        
        console.log('\n🔢 Counting Sort Demo');
        console.log('====================');
        console.log('Input:', arr);
        
        const result = countingSortWithSteps(arr);
        
        console.log('Output:', result.sortedArray);
        console.log('Steps:', result.steps.length);
        console.log('Metrics:', result.metrics);
        console.log('Time Complexity: O(n + k) where n =', result.metrics.elements, ', k =', result.metrics.range);
        
        return result;
    },
    
    // Validation helper
    validate: function(arr) {
        return CountingSortConfig.input.validation.customValidator(arr);
    },
    
    // Performance comparison
    compare: function(arr, otherSortFn, otherName = 'Other Sort') {
        const startTime1 = performance.now();
        const result1 = countingSort(arr);
        const endTime1 = performance.now();
        
        const startTime2 = performance.now();
        const result2 = otherSortFn([...arr]);
        const endTime2 = performance.now();
        
        return {
            countingSort: {
                result: result1.sortedArray,
                time: endTime1 - startTime1,
                comparisons: result1.metrics.comparisons,
                counts: result1.metrics.counts
            },
            [otherName]: {
                result: result2,
                time: endTime2 - startTime2,
                comparisons: 'N/A',
                counts: 'N/A'
            }
        };
    }
};

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CountingSortModule;
}

// Export for browser
if (typeof window !== 'undefined') {
    window.CountingSortModule = CountingSortModule;
    
    // Also export individual components for flexibility
    window.CountingSortCore = {
        countingSort,
        countingSortWithSteps,
        countingSortSimple
    };
    window.CountingSortConfig = CountingSortConfig;
    
    // Demo interface function for dynamic template
    window.runAlgorithm = function(array_input) {
        console.log('🔍 runAlgorithm called with:', { array_input });
        
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
                        const num = Number(cleaned);
                        if (!isNaN(num) && isFinite(num)) {
                            return Math.max(0, Math.floor(num)); // Ensure non-negative integers
                        }
                        return 0; // Default to 0 for invalid values
                    });
                }
            } else {
                array = Array.isArray(array_input) ? array_input.map(x => Math.max(0, Math.floor(Number(x)))) : [Math.max(0, Math.floor(Number(array_input)))];
            }
            
            console.log('🔍 Parsed array:', array);
            
            // Validate array
            if (array.length === 0) {
                return '<strong>Result:</strong> Empty array - nothing to sort.';
            }
            
            // Call counting sort
            let result;
            if (window.CountingSortCore && window.CountingSortCore.countingSort) {
                result = window.CountingSortCore.countingSort(array);
            } else if (countingSort) {
                result = countingSort(array);
            } else {
                // Fallback: basic JavaScript sort
                const sortedArray = [...array].sort((a, b) => a - b);
                result = { 
                    sortedArray, 
                    metrics: { 
                        elements: array.length, 
                        range: Math.max(...array) + 1, 
                        counts: new Array(Math.max(...array) + 1).fill(0)
                    } 
                };
            }
            
            console.log('🔍 Sort result:', result);
            
            // Format the output
            const originalStr = '[' + array.join(', ') + ']';
            const sortedStr = '[' + result.sortedArray.join(', ') + ']';
            
            let output = `<strong>Original array:</strong> ${originalStr}<br><br>`;
            output += `<strong>Sorted array:</strong> ${sortedStr}<br><br>`;
            
            if (result.metrics) {
                if (result.metrics.elements !== undefined) {
                    output += `<strong>Number of elements (n):</strong> ${result.metrics.elements}<br>`;
                }
                if (result.metrics.range !== undefined) {
                    output += `<strong>Value range (k):</strong> ${result.metrics.range}<br>`;
                }
                output += `<strong>Time complexity:</strong> O(n + k)<br>`;
                output += `<strong>Space complexity:</strong> O(k)<br>`;
            }
            
            return output;
            
        } catch (error) {
            console.error('❌ Error in runAlgorithm:', error);
            throw new Error(`Counting Sort error: ${error.message}`);
        }
    };
}
