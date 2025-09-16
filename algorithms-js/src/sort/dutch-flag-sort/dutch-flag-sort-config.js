/**
 * Dutch National Flag Sort - Configuration and Demo Presets
 * 
 * Configuration for Dutch National Flag Sort algorithm demonstrations,
 * including preset test cases and visualization settings.
 * 
 * @author SimplifyLearning
 * @see https://github.com/sachinlala/SimplifyLearning
 */

const DUTCH_FLAG_SORT_CONFIG = {
    algorithm: {
        name: "Dutch National Flag Sort",
        shortName: "Dutch Flag",
        description: "Efficiently partitions an array into 2-3 groups in O(n) time with O(1) space",
        timeComplexity: {
            best: "O(n)",
            average: "O(n)", 
            worst: "O(n)"
        },
        spaceComplexity: "O(1)",
        stable: false,
        inPlace: true,
        adaptive: false,
        inventor: "Edsger Dijkstra",
        year: "1976",
        category: "Partitioning Algorithm"
    },

    visualization: {
        animationSpeed: 800,
        highlightDuration: 1200,
        colors: {
            red: "#ff4444",
            white: "#ffffff", 
            blue: "#4444ff",
            redSection: "#ffcccc",
            whiteSection: "#f8f8f8",
            blueSection: "#ccccff",
            comparing: "#ffaa00",
            swapping: "#ff6600",
            boundary: "#888888"
        },
        showBoundaries: true,
        showCounts: true,
        showMetrics: true
    },

    presets: [
        {
            name: "Classic Dutch Flag",
            description: "Colors of the Dutch flag: red, white, blue",
            array: ["red", "blue", "white", "red", "white", "blue", "red", "blue", "white"],
            redValue: "red",
            whiteValue: "white", 
            blueValue: "blue",
            type: "3-way",
            category: "Classic"
        },
        {
            name: "Binary Sort (0s and 1s)",
            description: "Sort array containing only 0s and 1s",
            array: [1, 0, 1, 0, 0, 1, 1, 0, 1],
            redValue: 0,
            whiteValue: null,
            blueValue: 1,
            type: "2-way",
            category: "Binary"
        },
        {
            name: "Ternary Sort (0, 1, 2)",
            description: "Common interview problem: sort 0s, 1s, and 2s",
            array: [2, 0, 1, 2, 1, 0, 2, 1, 0],
            redValue: 0,
            whiteValue: 1,
            blueValue: 2,
            type: "3-way",
            category: "Numbers"
        },
        {
            name: "Large Ternary Array",
            description: "Larger array with three distinct values",
            array: [1, 2, 0, 1, 0, 2, 1, 0, 2, 1, 2, 0, 1, 0, 2],
            redValue: 0,
            whiteValue: 1,
            blueValue: 2,
            type: "3-way",
            category: "Numbers"
        },
        {
            name: "Character Sort (A, B, C)",
            description: "Partition characters into three groups",
            array: ["B", "A", "C", "B", "A", "C", "A", "B", "C"],
            redValue: "A",
            whiteValue: "B",
            blueValue: "C",
            type: "3-way",
            category: "Characters"
        },
        {
            name: "Boolean-like Sort",
            description: "Sort true/false values (2-way partition)",
            array: [true, false, true, false, false, true, true, false],
            redValue: false,
            whiteValue: null,
            blueValue: true,
            type: "2-way",
            category: "Boolean"
        },
        {
            name: "Priority Levels",
            description: "Sort by priority: high, medium, low",
            array: ["medium", "low", "high", "medium", "high", "low", "medium", "high"],
            redValue: "high",
            whiteValue: "medium",
            blueValue: "low",
            type: "3-way",
            category: "Priority"
        },
        {
            name: "Single Element",
            description: "Edge case: array with one element",
            array: ["red"],
            redValue: "red",
            whiteValue: "white",
            blueValue: "blue",
            type: "3-way",
            category: "Edge Case"
        },
        {
            name: "Empty Array",
            description: "Edge case: empty array",
            array: [],
            redValue: 0,
            whiteValue: 1,
            blueValue: 2,
            type: "3-way",
            category: "Edge Case"
        },
        {
            name: "All Same Elements",
            description: "Array with identical elements",
            array: ["white", "white", "white", "white", "white"],
            redValue: "red",
            whiteValue: "white",
            blueValue: "blue",
            type: "3-way",
            category: "Edge Case"
        },
        {
            name: "Already Partitioned",
            description: "Array already in correct order",
            array: ["red", "red", "white", "white", "blue", "blue"],
            redValue: "red",
            whiteValue: "white",
            blueValue: "blue",
            type: "3-way",
            category: "Best Case"
        },
        {
            name: "Reverse Partitioned",
            description: "Array in completely reverse order",
            array: ["blue", "blue", "white", "white", "red", "red"],
            redValue: "red",
            whiteValue: "white",
            blueValue: "blue",
            type: "3-way",
            category: "Worst Case"
        }
    ],

    testCases: [
        {
            name: "Basic functionality",
            tests: [
                {
                    input: [2, 0, 1, 2, 1, 0],
                    redValue: 0,
                    whiteValue: 1,
                    blueValue: 2,
                    expected: [0, 0, 1, 1, 2, 2],
                    description: "Should partition 0s, 1s, 2s correctly"
                },
                {
                    input: ["red", "blue", "white", "red"],
                    redValue: "red",
                    whiteValue: "white",
                    blueValue: "blue",
                    expected: ["red", "red", "white", "blue"],
                    description: "Should handle string colors"
                }
            ]
        },
        {
            name: "Edge cases",
            tests: [
                {
                    input: [],
                    redValue: 0,
                    whiteValue: 1,
                    blueValue: 2,
                    expected: [],
                    description: "Should handle empty array"
                },
                {
                    input: [1],
                    redValue: 0,
                    whiteValue: 1,
                    blueValue: 2,
                    expected: [1],
                    description: "Should handle single element"
                },
                {
                    input: [1, 1, 1],
                    redValue: 0,
                    whiteValue: 1,
                    blueValue: 2,
                    expected: [1, 1, 1],
                    description: "Should handle identical elements"
                }
            ]
        },
        {
            name: "Two-way partitioning",
            tests: [
                {
                    input: [1, 0, 1, 0, 0, 1],
                    redValue: 0,
                    whiteValue: null,
                    blueValue: 1,
                    expected: [0, 0, 0, 1, 1, 1],
                    description: "Should handle binary partitioning"
                },
                {
                    input: [true, false, true, false],
                    redValue: false,
                    whiteValue: null,
                    blueValue: true,
                    expected: [false, false, true, true],
                    description: "Should handle boolean values"
                }
            ]
        }
    ],

    performance: {
        expectedComparisons: (n) => n, // O(n) comparisons
        expectedSwaps: (n) => Math.floor(n / 3), // Approximately n/3 swaps in average case
        benchmarkSizes: [10, 50, 100, 500, 1000],
        timeoutMs: 5000
    },

    ui: {
        controls: {
            speedControl: true,
            stepControl: true,
            resetControl: true,
            presetSelector: true,
            customInput: true,
            valueSelector: true // For choosing red/white/blue values
        },
        display: {
            showArray: true,
            showSteps: true,
            showMetrics: true,
            showPartitions: true,
            showBoundaries: true,
            showCounts: true
        }
    },

    educational: {
        concepts: [
            "Three-way partitioning",
            "Two-way partitioning", 
            "In-place algorithm",
            "Linear time complexity",
            "Constant space complexity",
            "Dijkstra's algorithm variants"
        ],
        applications: [
            "Quicksort partitioning",
            "Color sorting",
            "Priority-based sorting",
            "Data preprocessing",
            "Binary classification",
            "Multi-class classification"
        ],
        relatedAlgorithms: [
            "Quicksort",
            "Counting Sort",
            "Radix Sort",
            "Three-way quicksort"
        ]
    }
};

// Utility functions for config
const DutchFlagSortConfigUtils = {
    getPresetByName(name) {
        return DUTCH_FLAG_SORT_CONFIG.presets.find(preset => preset.name === name);
    },

    getPresetsByCategory(category) {
        return DUTCH_FLAG_SORT_CONFIG.presets.filter(preset => preset.category === category);
    },

    getPresetsByType(type) {
        return DUTCH_FLAG_SORT_CONFIG.presets.filter(preset => preset.type === type);
    },

    generateRandomTernaryArray(size, values = [0, 1, 2]) {
        const array = [];
        for (let i = 0; i < size; i++) {
            array.push(values[Math.floor(Math.random() * values.length)]);
        }
        return array;
    },

    generateRandomBinaryArray(size, values = [0, 1]) {
        const array = [];
        for (let i = 0; i < size; i++) {
            array.push(values[Math.floor(Math.random() * values.length)]);
        }
        return array;
    },

    validateArrayForPartitioning(array, redValue, whiteValue, blueValue) {
        const allowedValues = [redValue, blueValue];
        if (whiteValue !== null && whiteValue !== undefined) {
            allowedValues.push(whiteValue);
        }
        
        return array.every(element => allowedValues.includes(element));
    }
};

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DUTCH_FLAG_SORT_CONFIG,
        DutchFlagSortConfigUtils
    };
} else if (typeof window !== 'undefined') {
    window.DUTCH_FLAG_SORT_CONFIG = DUTCH_FLAG_SORT_CONFIG;
    window.DutchFlagSortConfigUtils = DutchFlagSortConfigUtils;
}