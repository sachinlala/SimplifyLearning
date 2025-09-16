/**
 * Configuration for Counting Sort Interactive Demo
 * 
 * This configuration defines the demo properties and test cases for
 * Counting Sort algorithm visualization and interaction.
 */

const CountingSortConfig = {
    // Top-level properties for dynamic template compatibility
    name: 'Counting Sort',
    category: 'sort',
    problem: 'Sort an array of non-negative integers efficiently using counting instead of comparisons. Ideal for integers within a small, known range.',
    
    // Inputs for the demo interface
    inputs: [
        {
            id: 'array-input',
            type: 'text',
            label: 'Array Elements (non-negative integers)',
            defaultValue: '4, 2, 2, 8, 3, 3, 1',
            width: '300px'
        }
    ],
    
    explanation: {
        description: 'Counting Sort is a non-comparison based sorting algorithm that works by counting occurrences of each element. It operates in O(n + k) time where n is the number of elements and k is the range of values. The algorithm uses a counting array to track frequencies and then reconstructs the sorted array by placing elements in their correct positions.'
    },
    
    // Multi-language source code paths
    sourceCode: {
        javascript: "https://github.com/sachinlala/SimplifyLearning/blob/master/algorithms-js/src/sort/counting-sort/counting-sort-core.js",
        java: "https://github.com/sachinlala/SimplifyLearning/blob/master/algorithms-java/src/main/java/com/sl/algorithms/sort/finitegroups/integersorting/CountingSort.java",
        python: "", // Coming soon
        go: "" // Coming soon
    },
    
    // Demo identification and display
    id: 'counting-sort',
    description: 'A stable, linear-time sorting algorithm that works by counting occurrences of each element. Efficient for sorting integers within a known, small range.',
    
    // Algorithm properties
    timeComplexity: {
        best: 'O(n + k)',
        average: 'O(n + k)',
        worst: 'O(n + k)',
        space: 'O(k)',
        description: 'where n is the number of elements and k is the range of input values (0 to k-1)'
    },
    
    // Algorithm characteristics
    properties: {
        stable: true,
        inPlace: false,
        adaptive: false,
        online: false,
        comparison: false,
        distribution: true,
        integerOnly: true,
        notes: [
            'Works only with non-negative integers',
            'Efficient when the range k is not significantly larger than n',
            'Uses counting array to track element frequencies',
            'Maintains stability by processing elements right-to-left'
        ]
    },
    
    // Input constraints and validation
    input: {
        type: 'array',
        elementType: 'integer',
        constraints: {
            minSize: 1,
            maxSize: 20,
            minValue: 0,
            maxValue: 50,
            allowDuplicates: true,
            allowNegative: false
        },
        validation: {
            required: true,
            customValidator: function(arr) {
                // Check if all elements are non-negative integers
                for (let i = 0; i < arr.length; i++) {
                    if (!Number.isInteger(arr[i]) || arr[i] < 0) {
                        return {
                            valid: false,
                            message: `Counting sort requires non-negative integers. Found: ${arr[i]} at index ${i}`
                        };
                    }
                }
                
                // Check range efficiency
                const max = Math.max(...arr);
                if (max > arr.length * 3) {
                    return {
                        valid: true,
                        warning: `Large range detected (max=${max}, n=${arr.length}). Counting sort may be inefficient.`
                    };
                }
                
                return { valid: true };
            }
        }
    },
    
    // Visualization settings
    visualization: {
        showComparisons: false, // Counting sort doesn't use comparisons
        showSwaps: false,       // No swaps in counting sort
        showCounting: true,     // Show counting array
        showOutput: true,       // Show output array construction
        animationSpeed: {
            slow: 2000,
            medium: 1000,
            fast: 500
        },
        colors: {
            default: '#e3f2fd',     // Light blue for default elements
            highlight: '#2196f3',    // Blue for current element
            counting: '#4caf50',     // Green for counting array
            placed: '#ff9800',       // Orange for placed elements
            complete: '#8bc34a'      // Light green for completed
        },
        phases: {
            'find-max': {
                name: 'Find Maximum',
                description: 'Finding the maximum value to determine counting array size',
                color: '#f44336'
            },
            'count': {
                name: 'Count Elements',
                description: 'Counting occurrences of each element value',
                color: '#4caf50'
            },
            'cumulative': {
                name: 'Cumulative Sum',
                description: 'Converting counts to starting positions',
                color: '#ff9800'
            },
            'place': {
                name: 'Place Elements',
                description: 'Placing elements in their sorted positions',
                color: '#2196f3'
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
            name: 'Simple Example',
            input: [4, 2, 2, 8, 3, 3, 1],
            description: 'Basic counting sort with duplicates',
            expected: [1, 2, 2, 3, 3, 4, 8],
            difficulty: 'easy'
        },
        {
            name: 'Single Element',
            input: [5],
            description: 'Edge case with single element',
            expected: [5],
            difficulty: 'easy'
        },
        {
            name: 'Already Sorted',
            input: [1, 2, 3, 4, 5],
            description: 'Already sorted array',
            expected: [1, 2, 3, 4, 5],
            difficulty: 'easy'
        },
        {
            name: 'Reverse Sorted',
            input: [5, 4, 3, 2, 1],
            description: 'Reverse sorted array',
            expected: [1, 2, 3, 4, 5],
            difficulty: 'easy'
        },
        {
            name: 'With Zeros',
            input: [0, 3, 0, 1, 2, 0],
            description: 'Array containing zeros',
            expected: [0, 0, 0, 1, 2, 3],
            difficulty: 'medium'
        },
        {
            name: 'Many Duplicates',
            input: [3, 3, 3, 1, 1, 2, 2, 2],
            description: 'Array with many duplicate values',
            expected: [1, 1, 2, 2, 2, 3, 3, 3],
            difficulty: 'medium'
        },
        {
            name: 'Large Range',
            input: [10, 1, 15, 3, 20, 8],
            description: 'Array with larger value range',
            expected: [1, 3, 8, 10, 15, 20],
            difficulty: 'medium'
        },
        {
            name: 'Maximum Size',
            input: [7, 3, 15, 8, 2, 11, 1, 9, 4, 12, 6, 14, 5, 10, 13, 16, 18, 17, 19, 20],
            description: 'Maximum allowed array size for demo',
            expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            difficulty: 'hard'
        }
    ],
    
    // Performance comparison data
    performance: {
        description: 'Counting Sort vs Other O(n log n) Algorithms',
        scenarios: [
            {
                size: 10,
                countingSort: { time: 'O(n + k)', comparisons: 0 },
                quickSort: { time: 'O(n log n)', comparisons: '~23' },
                mergeSort: { time: 'O(n log n)', comparisons: '~24' }
            },
            {
                size: 100,
                countingSort: { time: 'O(n + k)', comparisons: 0 },
                quickSort: { time: 'O(n log n)', comparisons: '~664' },
                mergeSort: { time: 'O(n log n)', comparisons: '~644' }
            },
            {
                size: 1000,
                countingSort: { time: 'O(n + k)', comparisons: 0 },
                quickSort: { time: 'O(n log n)', comparisons: '~9966' },
                mergeSort: { time: 'O(n log n)', comparisons: '~9976' }
            }
        ],
        notes: [
            'Counting sort has no comparisons - it uses counting instead',
            'Time complexity depends on both n (elements) and k (range)',
            'Most efficient when k ≤ n or k is small',
            'Space complexity is O(k) for the counting array'
        ]
    },
    
    // Educational content
    concepts: {
        keyIdeas: [
            'Non-comparison based sorting algorithm',
            'Linear time complexity O(n + k)',
            'Stable sorting algorithm',
            'Efficient for small integer ranges',
            'Uses auxiliary counting array'
        ],
        whenToUse: [
            'Sorting integers within known, small range',
            'When stability is required',
            'When linear time is needed',
            'Input elements are non-negative integers'
        ],
        limitations: [
            'Only works with integers (typically non-negative)',
            'Requires knowledge of value range',
            'Space complexity depends on range, not input size',
            'Inefficient when range >> input size'
        ]
    },
    
    // Code implementation details
    implementation: {
        coreFunction: 'countingSortWithSteps',
        inputPreprocessor: function(input) {
            // Ensure input is an array of integers
            if (typeof input === 'string') {
                input = input.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
            }
            return input.map(x => Math.max(0, Math.floor(Number(x))));
        },
        resultProcessor: function(result) {
            return {
                sortedArray: result.sortedArray,
                steps: result.steps,
                metrics: result.metrics,
                summary: {
                    algorithm: 'Counting Sort',
                    elements: result.metrics?.elements,
                    range: result.metrics?.range,
                    counts: result.metrics?.counts,
                    timeComplexity: (result.metrics && result.metrics.elements !== undefined && result.metrics.range !== undefined)
                        ? `O(${result.metrics.elements} + ${result.metrics.range})`
                        : 'O(n + k)'
                }
            };
        }
    },
    
    // Help and documentation
    help: {
        algorithm: 'Counting Sort works by counting the number of occurrences of each distinct element, then using this information to place elements directly into their correct position.',
        steps: [
            '1. Find the maximum value to determine counting array size',
            '2. Create counting array and count occurrences of each element',
            '3. Convert counts to cumulative sums (starting positions)',
            '4. Place each element at its correct position (right-to-left for stability)',
            '5. Result is a sorted array'
        ],
        tips: [
            'Works best when the range of values is small compared to number of elements',
            'Always stable - maintains relative order of equal elements',
            'No comparisons needed - faster than comparison-based sorts for suitable inputs',
            'Process elements right-to-left in final step to maintain stability'
        ]
    }
};

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CountingSortConfig;
} else if (typeof window !== 'undefined') {
    window.CountingSortConfig = CountingSortConfig;
    
    // Additional exports for universal loader compatibility
    window.COUNTING_SORT_CONFIG = CountingSortConfig;
    window.countingsortConfig = CountingSortConfig;
    window.countingsortconfig = CountingSortConfig;
    window.countingSortConfig = CountingSortConfig;  // camelCase for universal loader
}
