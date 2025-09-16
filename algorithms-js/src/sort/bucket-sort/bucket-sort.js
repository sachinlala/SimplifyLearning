/**
 * Bucket Sort - Main Module Export
 * 
 * Entry point for the Bucket Sort algorithm implementation,
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
        const core = require('./bucket-sort-core.js');
        config = require('./bucket-sort-config.js');
        
        coreFunctions = {
            bucketSort: core.bucketSort,
            bucketSortWithSteps: core.bucketSortWithSteps,
            bucketSortSimple: core.bucketSortSimple,
            bucketSortIntegers: core.bucketSortIntegers
        };
    } else if (isWindow) {
        // Browser environment - use globals set by previously loaded scripts
        const core = window.BucketSortCore || {};
        coreFunctions = {
            bucketSort: core.bucketSort || window.bucketSort,
            bucketSortWithSteps: core.bucketSortWithSteps || window.bucketSortWithSteps,
            bucketSortSimple: core.bucketSortSimple || window.bucketSortSimple,
            bucketSortIntegers: core.bucketSortIntegers || window.bucketSortIntegers
        };
        
        config = window.BucketSortConfig;
    }

    // Utility functions for bucket sort operations
    class BucketSort {
        constructor() {
            this.buckets = [];
            this.bucketCount = 0;
        }
        
        // Main bucket sort implementation with customizable bucket strategy
        sort(array, bucketSize = 5, useCustomBuckets = false) {
            if (!Array.isArray(array) || array.length <= 1) {
                return array;
            }
            
            if (useCustomBuckets && coreFunctions.bucketSortWithSteps) {
                return coreFunctions.bucketSortWithSteps(array, bucketSize);
            } else if (coreFunctions.bucketSort) {
                return coreFunctions.bucketSort(array, bucketSize);
            } else {
                return this.fallbackBucketSort(array, bucketSize);
            }
        }
        
        // Simple bucket sort for beginners
        sortSimple(array) {
            return coreFunctions.bucketSortSimple ? 
                coreFunctions.bucketSortSimple(array) : 
                this.fallbackBucketSort(array);
        }
        
        // Specialized bucket sort for integers
        sortIntegers(array) {
            return coreFunctions.bucketSortIntegers ? 
                coreFunctions.bucketSortIntegers(array) : 
                this.fallbackBucketSort(array);
        }
        
        // Fallback implementation when core functions are not available
        fallbackBucketSort(array, bucketSize = 5) {
            if (!Array.isArray(array) || array.length <= 1) {
                return array.slice();
            }
            
            const min = Math.min(...array);
            const max = Math.max(...array);
            const bucketCount = Math.floor((max - min) / bucketSize) + 1;
            const buckets = Array.from({ length: bucketCount }, () => []);
            
            // Distribute elements into buckets
            for (const element of array) {
                const bucketIndex = Math.floor((element - min) / bucketSize);
                buckets[bucketIndex].push(element);
            }
            
            // Sort each bucket and concatenate
            const result = [];
            for (const bucket of buckets) {
                bucket.sort((a, b) => a - b);
                result.push(...bucket);
            }
            
            return result;
        }
    }
    
    // Run algorithm function for demo page
    function runAlgorithm(input) {
        try {
            // Parse input - expecting comma-separated numbers or array format
            let array;
            if (typeof input === 'string') {
                input = input.trim();
                if (input.startsWith('[') && input.endsWith(']')) {
                    // Array format like "[3,1,4,1,5,9]"
                    array = JSON.parse(input);
                } else {
                    // Comma-separated format like "3,1,4,1,5,9"
                    array = input.split(',').map(str => {
                        const num = parseFloat(str.trim());
                        if (isNaN(num)) {
                            throw new Error(`Invalid number: ${str.trim()}`);
                        }
                        return num;
                    });
                }
            } else if (Array.isArray(input)) {
                array = input.slice();
            } else {
                throw new Error('Input must be a string or array');
            }
            
            if (array.length === 0) {
                throw new Error('Array cannot be empty');
            }
            
            // Validate all elements are numbers
            if (!array.every(num => typeof num === 'number' && !isNaN(num))) {
                throw new Error('All elements must be valid numbers');
            }
            
            // Record start time
            const startTime = performance.now();
            const originalArray = array.slice();
            
            // Run the algorithm
            let sortedArray;
            const bucketSorter = new BucketSort();
            
            if (coreFunctions.bucketSort) {
                const result = coreFunctions.bucketSort(array);
                sortedArray = result.sortedArray || result;
            } else {
                sortedArray = bucketSorter.fallbackBucketSort(array);
            }
            
            const endTime = performance.now();
            const executionTime = endTime - startTime;
            
            // Format output with performance metrics
            const output = `
                <div class="algorithm-result">
                    <h3>Bucket Sort Results</h3>
                    <div class="result-section">
                        <h4>Input Array:</h4>
                        <div class="array-display">[${originalArray.join(', ')}]</div>
                    </div>
                    <div class="result-section">
                        <h4>Sorted Array:</h4>
                        <div class="array-display">[${sortedArray.join(', ')}]</div>
                    </div>
                    <div class="result-section">
                        <h4>Performance Metrics:</h4>
                        <p><strong>Execution Time:</strong> ${executionTime.toFixed(4)} ms</p>
                        <p><strong>Array Length:</strong> ${array.length}</p>
                        <p><strong>Algorithm:</strong> Bucket Sort</p>
                        <p><strong>Time Complexity:</strong> O(n + k) average, O(n²) worst case</p>
                        <p><strong>Space Complexity:</strong> O(n + k)</p>
                    </div>
                </div>
            `;
            
            return output;
        } catch (error) {
            return `
                <div class="algorithm-result error">
                    <h3>Error</h3>
                    <p><strong>Error:</strong> ${error.message}</p>
                    <p><strong>Input Format:</strong> Please provide comma-separated numbers (e.g., "3,1,4,1,5,9") or array format (e.g., "[3,1,4,1,5,9]").</p>
                </div>
            `;
        }
    }
    
    // Main export object
    const BucketSortModule = {
        // Core algorithm functions
        bucketSort: coreFunctions.bucketSort,
        bucketSortWithSteps: coreFunctions.bucketSortWithSteps,
        bucketSortSimple: coreFunctions.bucketSortSimple,
        bucketSortIntegers: coreFunctions.bucketSortIntegers,
        
        // Configuration for demos and visualization
        config: config,
        
        // Convenience methods
        sort: coreFunctions.bucketSortSimple || (new BucketSort()).fallbackBucketSort,
        sortWithSteps: coreFunctions.bucketSortWithSteps,
        sortIntegers: coreFunctions.bucketSortIntegers,
        
        // Algorithm information
        info: {
            name: 'Bucket Sort',
            type: 'Distribution Sort',
            timeComplexity: {
                best: 'O(n + k)',
                average: 'O(n + k)',
                worst: 'O(n²)',
                space: 'O(n + k)'
            },
            stable: false,
            inPlace: false,
            description: config && config.description ? config.description : 'Bucket sort algorithm'
        },
        
        // Run algorithm for demos
        runAlgorithm: runAlgorithm,
        
        // Utility class
        BucketSort: BucketSort
    };
    
    // Export based on environment
    if (isNode) {
        module.exports = BucketSortModule;
        module.exports.BucketSort = BucketSort;
        module.exports.bucketSort = coreFunctions.bucketSort;
        module.exports.bucketSortWithSteps = coreFunctions.bucketSortWithSteps;
        module.exports.bucketSortSimple = coreFunctions.bucketSortSimple;
        module.exports.bucketSortIntegers = coreFunctions.bucketSortIntegers;
        module.exports.BucketSortConfig = config;
        module.exports.runAlgorithm = runAlgorithm;
    } else if (isWindow) {
        // Set window globals for browser access
        window.BucketSortModule = BucketSortModule;
        window.BucketSort = BucketSort;
        if (coreFunctions.bucketSort) window.bucketSort = coreFunctions.bucketSort;
        if (coreFunctions.bucketSortWithSteps) window.bucketSortWithSteps = coreFunctions.bucketSortWithSteps;
        if (coreFunctions.bucketSortSimple) window.bucketSortSimple = coreFunctions.bucketSortSimple;
        if (coreFunctions.bucketSortIntegers) window.bucketSortIntegers = coreFunctions.bucketSortIntegers;
        if (config) window.BucketSortConfig = config;
        window.runAlgorithm = runAlgorithm;
        
        // Also export individual components for flexibility
        window.BucketSortCore = coreFunctions;
    }
})();
