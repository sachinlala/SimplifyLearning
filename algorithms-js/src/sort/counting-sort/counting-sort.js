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
}