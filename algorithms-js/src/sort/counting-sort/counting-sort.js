/**
 * Counting Sort - Main Module Export
 * 
 * Entry point for the Counting Sort algorithm implementation,
 * providing both the core algorithm and demo configuration.
 * 
 * @see https://github.com/sachinlala/SimplifyLearning
 */

// Browser-compatible module that works with globally loaded dependencies

(function() {
    // Check if we're in Node.js or browser environment
    const isNode = typeof module !== 'undefined' && module.exports;
    const isWindow = typeof window !== 'undefined';
    
    // Get dependencies from appropriate environment
    let coreFunctions, config;
    
    if (isNode) {
        // Node.js environment - use require
        const core = require('./counting-sort-core.js');
        config = require('./counting-sort-config.js');
        
        coreFunctions = {
            countingSort: core.countingSort,
            countingSortWithSteps: core.countingSortWithSteps,
            countingSortSimple: core.countingSortSimple
        };
    } else if (isWindow) {
        // Browser environment - use globals set by previously loaded scripts
        const core = window.CountingSortCore || {};
        coreFunctions = {
            countingSort: core.countingSort || window.countingSort,
            countingSortWithSteps: core.countingSortWithSteps || window.countingSortWithSteps,
            countingSortSimple: core.countingSortSimple || window.countingSortSimple
        };
        
        config = window.CountingSortConfig;
    }

    // Main export object
    const CountingSortModule = {
        // Core algorithm functions
        countingSort: coreFunctions?.countingSort,
        countingSortWithSteps: coreFunctions?.countingSortWithSteps,
        countingSortSimple: coreFunctions?.countingSortSimple,
        
        // Configuration for demos and visualization
        config: config,
        
        // Convenience methods
        sort: coreFunctions?.countingSortSimple,  // Simple sort function
        sortWithSteps: coreFunctions?.countingSortWithSteps,  // For visualization
        
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
            description: config?.description
        },
        
        // Quick demo function
        demo: function(arr) {
            if (!arr && config?.testCases) {
                arr = config.testCases[0].input;
            }
            
            console.log('\n🔢 Counting Sort Demo');
            console.log('====================');
            console.log('Input:', arr);
            
            const result = coreFunctions?.countingSortWithSteps ? 
                coreFunctions.countingSortWithSteps(arr) : 
                { sortedArray: [...arr].sort((a, b) => a - b), steps: [], metrics: {} };
            
            console.log('Output:', result.sortedArray);
            console.log('Steps:', result.steps?.length || 0);
            console.log('Metrics:', result.metrics);
            if (result.metrics?.elements && result.metrics?.range) {
                console.log('Time Complexity: O(n + k) where n =', result.metrics.elements, ', k =', result.metrics.range);
            }
            
            return result;
        },
        
        // Validation helper
        validate: function(arr) {
            return config?.input?.validation?.customValidator ? 
                config.input.validation.customValidator(arr) : 
                { valid: true };
        },
        
        // Performance comparison
        compare: function(arr, otherSortFn, otherName = 'Other Sort') {
            const startTime1 = performance.now();
            const result1 = coreFunctions?.countingSort ? 
                coreFunctions.countingSort(arr) : 
                { sortedArray: [...arr].sort((a, b) => a - b), metrics: {} };
            const endTime1 = performance.now();
            
            const startTime2 = performance.now();
            const result2 = otherSortFn([...arr]);
            const endTime2 = performance.now();
            
            return {
                countingSort: {
                    result: result1.sortedArray,
                    time: endTime1 - startTime1,
                    comparisons: result1.metrics?.comparisons || 0,
                    counts: result1.metrics?.counts || []
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

    // Export for different environments
    if (isNode) {
        // Node.js exports
        module.exports = CountingSortModule;
    } else if (isWindow) {
        // Browser globals
        window.CountingSortModule = CountingSortModule;
        
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
                if (coreFunctions?.countingSort) {
                    result = coreFunctions.countingSort(array);
                } else {
                    // Fallback: basic JavaScript sort
                    const sortedArray = [...array].sort((a, b) => a - b);
                    result = { 
                        sortedArray, 
                        metrics: { 
                            elements: array.length, 
                            range: array.length > 0 ? Math.max(...array) + 1 : 0, 
                            counts: array.length > 0 ? new Array(Math.max(...array) + 1).fill(0) : []
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
})();
