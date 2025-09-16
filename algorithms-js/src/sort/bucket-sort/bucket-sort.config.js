/**
 * Configuration for Bucket Sort Interactive Demo
 * 
 * This configuration defines the demo properties and test cases for
 * Bucket Sort algorithm visualization and interaction.
 */

const BucketSortConfig = {
    // Top-level properties for dynamic template compatibility
    name: 'Bucket Sort',
    category: 'sort',
    problem: 'Sort an array of floating-point numbers by distributing them into buckets, sorting each bucket individually, then concatenating the results. Most efficient with uniformly distributed data.',
    
    // Inputs for the demo interface
    inputs: [
        {
            id: 'array-input',
            type: 'text',
            label: 'Array Elements (decimals 0.0-1.0)',
            defaultValue: '0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12',
            width: '400px'
        },
        {
            id: 'bucket-count',
            type: 'number',
            label: 'Number of Buckets',
            defaultValue: 5,
            min: 2,
            max: 10,
            width: '100px'
        }
    ],
    
    explanation: {
        description: 'Bucket Sort is a distribution sorting algorithm that works by dividing elements into a finite number of buckets. Each bucket is then sorted individually, either using a different sorting algorithm or by recursively applying bucket sort. Finally, the buckets are concatenated to produce the sorted array. It works best when input is uniformly distributed over a range.'
    },
    
    // Multi-language source code paths
    sourceCode: {
        javascript: "https://github.com/sachinlala/SimplifyLearning/blob/master/algorithms-js/src/sort/bucket-sort/bucket-sort-core.js",
        java: "https://github.com/sachinlala/SimplifyLearning/tree/master/algorithms-java/src/main/java/com/sl/algorithms/sort/finitegroups/bucketsort",
        python: "", // Coming soon
        go: "" // Coming soon
    },
    
    // Demo identification and display
    id: 'bucket-sort',
    description: 'A distribution sorting algorithm that divides elements into buckets, sorts each bucket individually, then concatenates them. Works best with uniformly distributed data.',
    
    // Algorithm properties
    timeComplexity: {
        best: 'O(n + k)',
        average: 'O(n + k)',
        worst: 'O(n²)',
        space: 'O(n + k)',
        description: 'where n = elements, k = buckets. Worst case occurs when all elements go to one bucket'
    },
    
    // Algorithm characteristics
    properties: {
        stable: false,
        inPlace: false,
        adaptive: false,
        online: false,
        comparison: true, // Uses comparison in bucket sorting step
        distribution: true,
        integerOnly: false,
        notes: [
            'Works best with uniformly distributed data',
            'Performance degrades with skewed data distribution',
            'Uses insertion sort for individual bucket sorting',
            'Number of buckets affects performance',
            'Can work with floating-point numbers'
        ]
    },
    
    // Input constraints and validation
    input: {
        type: 'array',
        elementType: 'number',
        constraints: {
            minSize: 1,
            maxSize: 15,
            minValue: 0.0,
            maxValue: 1.0,
            allowDuplicates: true,
            allowNegative: false
        },
        validation: {
            required: true,
            customValidator: function(arr) {
                // Check if all elements are numbers
                for (let i = 0; i < arr.length; i++) {
                    if (typeof arr[i] !== 'number' || isNaN(arr[i])) {
                        return {
                            valid: false,
                            message: `Bucket sort requires numbers. Found: ${arr[i]} at index ${i}`
                        };
                    }
                }
                
                // Warn for non-uniform distribution
                if (arr.length > 5) {
                    const min = Math.min(...arr);
                    const max = Math.max(...arr);
                    const range = max - min;
                    
                    if (range === 0) {
                        return {
                            valid: true,
                            warning: 'All elements are equal - bucket sort will be trivial.'
                        };
                    }
                    
                    // Simple uniformity check - count elements in each quartile
                    const quartileSize = range / 4;
                    const quartileCounts = [0, 0, 0, 0];
                    
                    arr.forEach(x => {
                        const quartile = Math.min(3, Math.floor((x - min) / quartileSize));
                        quartileCounts[quartile]++;
                    });
                    
                    const maxCount = Math.max(...quartileCounts);
                    const minCount = Math.min(...quartileCounts.filter(c => c > 0));
                    
                    if (maxCount > minCount * 3) {
                        return {
                            valid: true,
                            warning: 'Data appears skewed - bucket sort performance may be suboptimal.'
                        };
                    }
                }
                
                return { valid: true };
            }
        }
    },
    
    // Visualization settings
    visualization: {
        showComparisons: true,   // Show comparisons within buckets
        showSwaps: true,         // Show swaps within buckets
        showBuckets: true,       // Show bucket distribution
        showDistribution: true,  // Show distribution process
        animationSpeed: {
            slow: 2500,
            medium: 1500,
            fast: 700
        },
        colors: {
            default: '#e3f2fd',      // Light blue for default elements
            highlight: '#2196f3',     // Blue for current element
            bucket0: '#ffebee',      // Light red
            bucket1: '#f3e5f5',      // Light purple
            bucket2: '#e8f5e8',      // Light green
            bucket3: '#fff3e0',      // Light orange
            bucket4: '#e0f2f1',      // Light teal
            bucket5: '#fce4ec',      // Light pink
            sorting: '#ff9800',      // Orange for bucket being sorted
            complete: '#8bc34a'      // Light green for completed
        },
        phases: {
            'analyze': {
                name: 'Analyze Range',
                description: 'Determining data range and bucket count',
                color: '#f44336'
            },
            'distribute': {
                name: 'Distribute Elements',
                description: 'Placing elements into appropriate buckets',
                color: '#2196f3'
            },
            'sort-buckets': {
                name: 'Sort Buckets',
                description: 'Sorting individual buckets using insertion sort',
                color: '#ff9800'
            },
            'concatenate': {
                name: 'Concatenate',
                description: 'Combining sorted buckets into final result',
                color: '#4caf50'
            },
            'complete': {
                name: 'Complete',
                description: 'Array is now sorted',
                color: '#8bc34a'
            }
        }
    },
    
    // Test cases for the demo
    testCases: [
        {
            name: 'Uniform Distribution',
            input: [0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12, 0.23, 0.68],
            description: 'Well-distributed floating-point numbers',
            expected: [0.12, 0.17, 0.21, 0.23, 0.26, 0.39, 0.68, 0.72, 0.78, 0.94],
            difficulty: 'easy'
        },
        {
            name: 'Simple Example',
            input: [0.42, 0.32, 0.33, 0.52, 0.37, 0.47, 0.51],
            description: 'Basic bucket sort example',
            expected: [0.32, 0.33, 0.37, 0.42, 0.47, 0.51, 0.52],
            difficulty: 'easy'
        },
        {
            name: 'Small Range',
            input: [0.2, 0.3, 0.1, 0.4, 0.25, 0.35],
            description: 'Numbers in a smaller range',
            expected: [0.1, 0.2, 0.25, 0.3, 0.35, 0.4],
            difficulty: 'easy'
        },
        {
            name: 'Already Sorted',
            input: [0.1, 0.2, 0.3, 0.4, 0.5],
            description: 'Already sorted data',
            expected: [0.1, 0.2, 0.3, 0.4, 0.5],
            difficulty: 'easy'
        },
        {
            name: 'Reverse Sorted',
            input: [0.9, 0.7, 0.5, 0.3, 0.1],
            description: 'Reverse sorted data',
            expected: [0.1, 0.3, 0.5, 0.7, 0.9],
            difficulty: 'medium'
        },
        {
            name: 'With Duplicates',
            input: [0.5, 0.2, 0.8, 0.2, 0.5, 0.8, 0.3],
            description: 'Array with duplicate values',
            expected: [0.2, 0.2, 0.3, 0.5, 0.5, 0.8, 0.8],
            difficulty: 'medium'
        },
        {
            name: 'Skewed Distribution',
            input: [0.01, 0.02, 0.03, 0.04, 0.05, 0.95, 0.96, 0.97],
            description: 'Data clustered at extremes - tests worst-case performance',
            expected: [0.01, 0.02, 0.03, 0.04, 0.05, 0.95, 0.96, 0.97],
            difficulty: 'hard'
        },
        {
            name: 'Single Bucket Case',
            input: [0.1, 0.11, 0.12, 0.13, 0.14, 0.15],
            description: 'Very close values - most will go to same bucket',
            expected: [0.1, 0.11, 0.12, 0.13, 0.14, 0.15],
            difficulty: 'hard'
        }
    ],
    
    // Performance comparison data
    performance: {
        description: 'Bucket Sort vs Other Algorithms',
        scenarios: [
            {
                size: 10,
                bucketSort: { time: 'O(n + k)', buckets: '~3', bucketSorts: '~3' },
                quickSort: { time: 'O(n log n)', buckets: 'N/A', bucketSorts: 'N/A' },
                radixSort: { time: 'O((n+k)×d)', buckets: 'N/A', bucketSorts: 'N/A' }
            },
            {
                size: 100,
                bucketSort: { time: 'O(n + k)', buckets: '~10', bucketSorts: '~10' },
                quickSort: { time: 'O(n log n)', buckets: 'N/A', bucketSorts: 'N/A' },
                radixSort: { time: 'O((n+k)×d)', buckets: 'N/A', bucketSorts: 'N/A' }
            },
            {
                size: 1000,
                bucketSort: { time: 'O(n + k)', buckets: '~32', bucketSorts: '~32' },
                quickSort: { time: 'O(n log n)', buckets: 'N/A', bucketSorts: 'N/A' },
                radixSort: { time: 'O((n+k)×d)', buckets: 'N/A', bucketSorts: 'N/A' }
            }
        ],
        notes: [
            'Bucket sort uses sqrt(n) buckets for optimal performance',
            'Each bucket is sorted using insertion sort',
            'Performance heavily depends on data distribution',
            'Best case when data is uniformly distributed'
        ]
    },
    
    // Educational content
    concepts: {
        keyIdeas: [
            'Distribution-based sorting algorithm',
            'Divides elements into buckets based on value ranges',
            'Sorts each bucket individually',
            'Concatenates sorted buckets for final result',
            'Performance depends on data distribution'
        ],
        whenToUse: [
            'Data is uniformly distributed over a range',
            'Working with floating-point numbers',
            'When linear average-case time is needed',
            'Input range is known and reasonable'
        ],
        limitations: [
            'Performance degrades with skewed data',
            'Requires knowledge of input range',
            'Not stable (equal elements may be reordered)',
            'Worst case is O(n²) when all elements go to one bucket',
            'Uses extra space for buckets'
        ]
    },
    
    // Code implementation details
    implementation: {
        coreFunction: 'bucketSortWithSteps',
        inputPreprocessor: function(input) {
            // Ensure input is an array of numbers in [0,1] range
            if (typeof input === 'string') {
                input = input.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
            }
            
            if (Array.isArray(input)) {
                input = input.map(x => Number(x)).filter(n => !isNaN(n));
            } else {
                input = [Number(input)].filter(n => !isNaN(n));
            }
            
            // Normalize to [0,1] range for demo
            if (input.length > 0) {
                const min = Math.min(...input);
                const max = Math.max(...input);
                const range = max - min;
                
                if (range > 0) {
                    input = input.map(x => (x - min) / range);
                }
            }
            
            return input;
        },
        resultProcessor: function(result) {
            return {
                sortedArray: result.sortedArray,
                steps: result.steps,
                metrics: result.metrics,
                summary: {
                    algorithm: 'Bucket Sort',
                    elements: result.sortedArray.length,
                    buckets: result.metrics.buckets,
                    bucketSorts: result.metrics.bucketSorts,
                    comparisons: result.metrics.comparisons,
                    swaps: result.metrics.swaps,
                    timeComplexity: `O(n + k) where n=${result.sortedArray.length}, k=${result.metrics.buckets}`
                }
            };
        }
    },
    
    // Help and documentation
    help: {
        algorithm: 'Bucket Sort divides elements into buckets based on their values, sorts each bucket individually using insertion sort, then concatenates the sorted buckets.',
        steps: [
            '1. Analyze the data range to determine minimum and maximum values',
            '2. Create k buckets (typically √n buckets for optimal performance)',
            '3. Distribute elements into buckets based on their relative position in the range',
            '4. Sort each non-empty bucket using insertion sort',
            '5. Concatenate all sorted buckets to produce the final sorted array'
        ],
        tips: [
            'Works best when input is uniformly distributed',
            'Performance degrades significantly with skewed data',
            'Number of buckets affects performance - too few or too many can be suboptimal',
            'Each bucket is sorted using insertion sort (efficient for small arrays)',
            'Not stable - equal elements may appear in different order'
        ],
        examples: [
            {
                title: 'Example: [0.78, 0.17, 0.39, 0.26, 0.72]',
                explanation: 'Using 3 buckets for range [0.17, 0.78]',
                steps: [
                    'Bucket 0 [0.17-0.37]: [0.17, 0.26] → sorted: [0.17, 0.26]',
                    'Bucket 1 [0.37-0.57]: [0.39] → sorted: [0.39]',
                    'Bucket 2 [0.57-0.78]: [0.78, 0.72] → sorted: [0.72, 0.78]',
                    'Concatenate: [0.17, 0.26, 0.39, 0.72, 0.78]'
                ]
            }
        ]
    }
};

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BucketSortConfig;
} else if (typeof window !== 'undefined') {
    window.BucketSortConfig = BucketSortConfig;
    
    // Additional exports for universal loader compatibility
    window.BUCKET_SORT_CONFIG = BucketSortConfig;
    window.bucketsortConfig = BucketSortConfig;
    window.bucketsortconfig = BucketSortConfig;
}
