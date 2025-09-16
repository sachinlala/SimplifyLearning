/**
 * Radix Sort - Main Module Export
 * 
 * Entry point for the Radix Sort algorithm implementation,
 * providing both the core algorithm and demo configuration.
 * 
 * @author SimplifyLearning
 * @see https://github.com/sachinlala/SimplifyLearning
 */

// Import core implementation
const {
    radixSort,
    radixSortWithSteps,
    radixSortSimple
} = require('./radix-sort-core.js');

// Import configuration
const RadixSortConfig = require('./radix-sort-config.js');

// Main export object
const RadixSortModule = {
    // Core algorithm functions
    radixSort,
    radixSortWithSteps,
    radixSortSimple,
    
    // Configuration for demos and visualization
    config: RadixSortConfig,
    
    // Convenience methods
    sort: radixSortSimple,  // Simple sort function
    sortWithSteps: radixSortWithSteps,  // For visualization
    
    // Algorithm information
    info: {
        name: 'Radix Sort',
        type: 'Distribution Sort',
        timeComplexity: {
            best: 'O((n + k) × d)',
            average: 'O((n + k) × d)',
            worst: 'O((n + k) × d)',
            space: 'O(n + k)'
        },
        stable: true,
        inPlace: false,
        description: RadixSortConfig.description
    },
    
    // Quick demo function
    demo: function(arr) {
        if (!arr) {
            arr = RadixSortConfig.testCases[0].input;
        }
        
        console.log('\n🔢 Radix Sort Demo');
        console.log('==================');
        console.log('Input:', arr);
        
        const result = radixSortWithSteps(arr);
        
        console.log('Output:', result.sortedArray);
        console.log('Steps:', result.steps.length);
        console.log('Metrics:', result.metrics);
        console.log(`Time Complexity: O((n + 10) × d) where n = ${result.sortedArray.length}, d = ${result.metrics.digits}`);
        console.log(`Required ${result.metrics.countingSorts} counting sort passes for ${result.metrics.digits} digit positions`);
        
        return result;
    },
    
    // Validation helper
    validate: function(arr) {
        return RadixSortConfig.input.validation.customValidator(arr);
    },
    
    // Performance comparison
    compare: function(arr, otherSortFn, otherName = 'Other Sort') {
        const startTime1 = performance.now();
        const result1 = radixSort(arr);
        const endTime1 = performance.now();
        
        const startTime2 = performance.now();
        const result2 = otherSortFn([...arr]);
        const endTime2 = performance.now();
        
        return {
            radixSort: {
                result: result1.sortedArray,
                time: endTime1 - startTime1,
                comparisons: result1.metrics.comparisons,
                countingSorts: result1.metrics.countingSorts,
                digits: result1.metrics.digits,
                passes: result1.metrics.countingSorts
            },
            [otherName]: {
                result: result2,
                time: endTime2 - startTime2,
                comparisons: 'N/A',
                countingSorts: 'N/A',
                digits: 'N/A',
                passes: 1
            }
        };
    },
    
    // Analyze input to predict performance
    analyze: function(arr) {
        if (!arr || arr.length === 0) {
            return {
                elements: 0,
                maxValue: 0,
                digits: 0,
                predictedPasses: 0,
                timeComplexity: 'O(1)'
            };
        }
        
        const maxValue = Math.max(...arr);
        const digits = maxValue === 0 ? 1 : Math.floor(Math.log10(maxValue)) + 1;
        
        return {
            elements: arr.length,
            maxValue,
            digits,
            predictedPasses: digits,
            timeComplexity: `O((${arr.length} + 10) × ${digits}) = O(${(arr.length + 10) * digits})`,
            recommendation: digits <= 4 ? 'Excellent choice for radix sort' : 
                           digits <= 6 ? 'Good choice for radix sort' : 
                           'Consider comparison-based sorts for large digit counts'
        };
    }
};

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RadixSortModule;
}

// Export for browser
if (typeof window !== 'undefined') {
    window.RadixSortModule = RadixSortModule;
    
    // Also export individual components for flexibility
    window.RadixSortCore = {
        radixSort,
        radixSortWithSteps,
        radixSortSimple
    };
    window.RadixSortConfig = RadixSortConfig;
}