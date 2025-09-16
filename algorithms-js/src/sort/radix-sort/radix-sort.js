/**
 * Radix Sort - Main Module Export
 * 
 * Entry point for the Radix Sort algorithm implementation,
 * providing both the core algorithm and demo configuration.
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
    let coreFunctions, config;
    
    if (isNode) {
        // Node.js environment - use require
        const core = require('./radix-sort-core.js');
        config = require('./radix-sort-config.js');
        
        coreFunctions = {
            radixSort: core.radixSort,
            radixSortWithSteps: core.radixSortWithSteps,
            radixSortSimple: core.radixSortSimple
        };
    } else if (isWindow) {
        // Browser environment - use globals set by previously loaded scripts
        const core = window.RadixSortCore || {};
        coreFunctions = {
            radixSort: core.radixSort || window.radixSort,
            radixSortWithSteps: core.radixSortWithSteps || window.radixSortWithSteps,
            radixSortSimple: core.radixSortSimple || window.radixSortSimple
        };
        
        config = window.RadixSortConfig;
    }

    // Main export object
    const RadixSortModule = {
        // Core algorithm functions
        radixSort: coreFunctions?.radixSort,
        radixSortWithSteps: coreFunctions?.radixSortWithSteps,
        radixSortSimple: coreFunctions?.radixSortSimple,
        
        // Configuration for demos and visualization
        config: config,
        
        // Convenience methods
        sort: coreFunctions?.radixSortSimple,  // Simple sort function
        sortWithSteps: coreFunctions?.radixSortWithSteps,  // For visualization
        
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
            description: config?.description
        },
        
        // Quick demo function
        demo: function(arr) {
            if (!arr && config?.testCases) {
                arr = config.testCases[0].input;
            }
            
            console.log('\n🔢 Radix Sort Demo');
            console.log('==================');
            console.log('Input:', arr);
            
            const result = coreFunctions?.radixSortWithSteps ? 
                coreFunctions.radixSortWithSteps(arr) : 
                { sortedArray: [...arr].sort((a, b) => a - b), steps: [], metrics: {} };
            
            console.log('Output:', result.sortedArray);
            console.log('Steps:', result.steps?.length || 0);
            console.log('Metrics:', result.metrics);
            if (result.metrics?.digits && result.sortedArray) {
                console.log(`Time Complexity: O((n + 10) × d) where n = ${result.sortedArray.length}, d = ${result.metrics.digits}`);
                console.log(`Required ${result.metrics.countingSorts || result.metrics.digits} counting sort passes for ${result.metrics.digits} digit positions`);
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
            const result1 = coreFunctions?.radixSort ? 
                coreFunctions.radixSort(arr) : 
                { sortedArray: [...arr].sort((a, b) => a - b), metrics: {} };
            const endTime1 = performance.now();
            
            const startTime2 = performance.now();
            const result2 = otherSortFn([...arr]);
            const endTime2 = performance.now();
            
            return {
                radixSort: {
                    result: result1.sortedArray,
                    time: endTime1 - startTime1,
                    comparisons: result1.metrics?.comparisons || 0,
                    countingSorts: result1.metrics?.countingSorts || 0,
                    digits: result1.metrics?.digits || 0,
                    passes: result1.metrics?.countingSorts || 0
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

    // Export for different environments
    if (isNode) {
        // Node.js exports
        module.exports = RadixSortModule;
    } else if (isWindow) {
        // Browser globals
        window.RadixSortModule = RadixSortModule;
        
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
                
                // Analyze input
                const analysis = RadixSortModule.analyze(array);
                
                // Call radix sort
                let result;
                if (coreFunctions?.radixSort) {
                    result = coreFunctions.radixSort(array);
                } else {
                    // Fallback: basic JavaScript sort
                    const sortedArray = [...array].sort((a, b) => a - b);
                    const maxValue = array.length > 0 ? Math.max(...array) : 0;
                    const digits = maxValue === 0 ? 1 : Math.floor(Math.log10(maxValue)) + 1;
                    result = { 
                        sortedArray, 
                        metrics: { 
                            elements: array.length, 
                            maxValue: maxValue,
                            digits: digits,
                            countingSorts: digits
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
                    if (result.metrics.maxValue !== undefined) {
                        output += `<strong>Maximum value:</strong> ${result.metrics.maxValue}<br>`;
                    }
                    if (result.metrics.digits !== undefined) {
                        output += `<strong>Number of digits (d):</strong> ${result.metrics.digits}<br>`;
                    }
                    if (result.metrics.countingSorts !== undefined) {
                        output += `<strong>Counting sort passes:</strong> ${result.metrics.countingSorts}<br>`;
                    }
                    output += `<strong>Time complexity:</strong> O((n + 10) × d)<br>`;
                    output += `<strong>Space complexity:</strong> O(n + 10)<br>`;
                }
                
                if (analysis.recommendation) {
                    output += `<br><strong>Recommendation:</strong> ${analysis.recommendation}`;
                }
                
                return output;
                
            } catch (error) {
                console.error('❌ Error in runAlgorithm:', error);
                throw new Error(`Radix Sort error: ${error.message}`);
            }
        };
    }
})();
