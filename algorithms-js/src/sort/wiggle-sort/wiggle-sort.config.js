/**
 * Wiggle Sort - Configuration and Demo Presets
 * 
 * Configuration for Wiggle Sort algorithm demonstrations,
 * including preset test cases and visualization settings.
 * 
 * @see https://github.com/sachinlala/SimplifyLearning
 */

const WIGGLE_SORT_CONFIG = {
    // Top-level properties for dynamic template compatibility
    name: "Wiggle Sort",
    category: "sort",
    hasStepsFile: true,
    problem: "Arrange array elements in a wiggling pattern where arr[0] < arr[1] > arr[2] < arr[3] > arr[4]... Elements alternate between peaks and valleys.",
    
    // Inputs for the demo interface
    inputs: [
        {
            id: 'array-input',
            type: 'text',
            label: 'Array Elements',
            defaultValue: '3, 5, 2, 1, 6, 4',
            width: '300px'
        },
        {
            id: 'variant',
            type: 'select',
            label: 'Wiggle Sort Variant',
            defaultValue: 'I',
            width: '150px',
            options: [
                { value: 'I', text: 'Wiggle Sort I (Simple)' },
                { value: 'II', text: 'Wiggle Sort II (No Adjacent Duplicates)' }
            ]
        }
    ],
    
    explanation: {
        description: 'Wiggle Sort rearranges an array so that elements alternate between being smaller and larger than their neighbors, creating a "wiggling" pattern. Wiggle Sort I achieves this in O(n) time by making local adjustments, while Wiggle Sort II handles duplicates more carefully to avoid adjacent identical elements.'
    },
    
    algorithm: {
        name: "Wiggle Sort",
        shortName: "Wiggle",
        description: "Arranges array elements in a wiggling pattern: arr[0] < arr[1] > arr[2] < arr[3]...",
        timeComplexity: {
            best: "O(n)", // For Wiggle Sort I
            average: "O(n log n)", // For Wiggle Sort II
            worst: "O(n log n)"
        },
        spaceComplexity: "O(1) for Wiggle Sort I, O(n) for Wiggle Sort II",
        stable: false,
        inPlace: true, // For Wiggle Sort I
        adaptive: false,
        category: "Specialized Sorting"
    },

    visualization: {
        animationSpeed: 1000,
        highlightDuration: 1500,
        colors: {
            valley: "#3498db",      // Blue for valleys (even positions)
            peak: "#e74c3c",        // Red for peaks (odd positions)
            comparing: "#f39c12",   // Orange for comparison
            swapping: "#9b59b6",    // Purple for swapping
            sorted: "#27ae60",      // Green for sorted
            default: "#ecf0f1"      // Light gray default
        },
        showPattern: true,
        showIndices: true,
        showMetrics: true
    },

    presets: [
        {
            name: "Basic Wiggle Sort I",
            description: "Simple example demonstrating wiggling pattern",
            array: [3, 5, 2, 1, 6, 4],
            variant: "I",
            category: "Basic",
            expectedPattern: "<><><"
        },
        {
            name: "Wiggle Sort II (No Duplicates)",
            description: "Variant that avoids adjacent duplicates",
            array: [1, 5, 1, 1, 6, 4],
            variant: "II", 
            category: "Advanced",
            expectedPattern: "<><><"
        },
        {
            name: "Already Wiggling",
            description: "Array already in wiggle pattern",
            array: [1, 3, 2, 5, 4, 6],
            variant: "I",
            category: "Best Case",
            expectedPattern: "<><><"
        },
        {
            name: "Reverse Wiggle",
            description: "Array in reverse wiggle pattern",
            array: [6, 4, 5, 2, 3, 1],
            variant: "I",
            category: "Worst Case",
            expectedPattern: "><><>"
        },
        {
            name: "Small Array",
            description: "Testing with minimal elements",
            array: [2, 1, 3],
            variant: "I",
            category: "Edge Case",
            expectedPattern: "<>"
        },
        {
            name: "Single Element",
            description: "Edge case with one element",
            array: [42],
            variant: "I",
            category: "Edge Case",
            expectedPattern: "single element"
        },
        {
            name: "Two Elements",
            description: "Minimal wiggle with two elements",
            array: [5, 2],
            variant: "I",
            category: "Edge Case",
            expectedPattern: ">"
        },
        {
            name: "Identical Elements",
            description: "Array with all same values",
            array: [7, 7, 7, 7],
            variant: "I",
            category: "Edge Case",
            expectedPattern: "==="
        },
        {
            name: "Large Array",
            description: "Testing with more elements",
            array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            variant: "I",
            category: "Stress Test",
            expectedPattern: "<><><><><"
        },
        {
            name: "Duplicates Test (Sort II)",
            description: "Many duplicates for Wiggle Sort II",
            array: [1, 1, 2, 2, 3, 3, 4, 4],
            variant: "II",
            category: "Advanced",
            expectedPattern: "<><><><"
        },
        {
            name: "Random Sequence",
            description: "Random numbers for general testing",
            array: [64, 34, 25, 12, 22, 11, 90],
            variant: "I",
            category: "General",
            expectedPattern: "<><><><"
        },
        {
            name: "Negative Numbers",
            description: "Testing with negative values",
            array: [-1, 3, -2, 5, -3, 7],
            variant: "I",
            category: "General",
            expectedPattern: "<><><"
        }
    ],

    testCases: [
        {
            name: "Basic functionality",
            tests: [
                {
                    input: [3, 5, 2, 1, 6, 4],
                    variant: "I",
                    description: "Should create wiggling pattern for basic array"
                },
                {
                    input: [1, 5, 1, 1, 6, 4],
                    variant: "II",
                    description: "Should handle duplicates without adjacent placement"
                }
            ]
        },
        {
            name: "Edge cases",
            tests: [
                {
                    input: [],
                    variant: "I",
                    description: "Should handle empty array"
                },
                {
                    input: [42],
                    variant: "I", 
                    description: "Should handle single element"
                },
                {
                    input: [7, 7, 7, 7],
                    variant: "I",
                    description: "Should handle identical elements"
                }
            ]
        },
        {
            name: "Pattern validation",
            tests: [
                {
                    input: [1, 3, 2, 5, 4],
                    variant: "I",
                    expectedPattern: "<><>",
                    description: "Should produce correct wiggle pattern"
                }
            ]
        }
    ],

    performance: {
        expectedComparisons: (n, variant) => variant === "I" ? n - 1 : n * Math.log(n),
        expectedSwaps: (n, variant) => variant === "I" ? Math.floor(n / 2) : n,
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
            variantSelector: true // For choosing between Wiggle Sort I and II
        },
        display: {
            showArray: true,
            showSteps: true,
            showMetrics: true,
            showPattern: true,
            showIndices: true,
            showVariant: true
        }
    },

    educational: {
        concepts: [
            "Peak and valley patterns",
            "In-place algorithms",
            "Pattern-based sorting",
            "Adjacent element comparison",
            "Two-pass vs single-pass algorithms"
        ],
        applications: [
            "Data visualization patterns",
            "Wave pattern generation",
            "UI element arrangement",
            "Stock price patterns",
            "Game level design"
        ],
        relatedAlgorithms: [
            "Bubble Sort",
            "Selection Sort", 
            "Quick Sort partitioning",
            "Dutch National Flag Sort"
        ],
        variants: {
            "Wiggle Sort I": {
                description: "Simple in-place O(n) algorithm",
                advantages: ["Linear time", "Constant space", "In-place"],
                disadvantages: ["Allows adjacent duplicates", "Not stable"]
            },
            "Wiggle Sort II": {
                description: "No adjacent duplicates, requires sorting",
                advantages: ["No adjacent duplicates", "Predictable pattern"],
                disadvantages: ["O(n log n) time", "Extra space needed"]
            }
        }
    }
};

// Utility functions for config
const WiggleSortConfigUtils = {
    getPresetByName(name) {
        return WIGGLE_SORT_CONFIG.presets.find(preset => preset.name === name);
    },

    getPresetsByCategory(category) {
        return WIGGLE_SORT_CONFIG.presets.filter(preset => preset.category === category);
    },

    getPresetsByVariant(variant) {
        return WIGGLE_SORT_CONFIG.presets.filter(preset => preset.variant === variant);
    },

    generateRandomWiggleArray(size, min = 1, max = 20) {
        const array = [];
        for (let i = 0; i < size; i++) {
            array.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return array;
    },

    generateWorstCaseArray(size) {
        // Descending order is worst case for Wiggle Sort I
        const array = [];
        for (let i = size; i >= 1; i--) {
            array.push(i);
        }
        return array;
    },

    generateBestCaseArray(size) {
        // Already wiggling pattern
        const array = [];
        for (let i = 0; i < size; i++) {
            if (i % 2 === 0) {
                array.push(i + 1); // Valleys: 1, 3, 5...
            } else {
                array.push(size - i + 1); // Peaks: larger values
            }
        }
        return array;
    },

    validateWigglePattern(array, variant = "I") {
        if (!array || array.length <= 1) return { valid: true };

        for (let i = 0; i < array.length - 1; i++) {
            const isEven = i % 2 === 0;
            
            if (isEven && array[i] >= array[i + 1]) {
                return { 
                    valid: false, 
                    error: `Valley violation at index ${i}` 
                };
            }
            
            if (!isEven && array[i] <= array[i + 1]) {
                return { 
                    valid: false, 
                    error: `Peak violation at index ${i}` 
                };
            }

            // Check for adjacent duplicates in Wiggle Sort II
            if (variant === "II" && array[i] === array[i + 1]) {
                return {
                    valid: false,
                    error: `Adjacent duplicates at indices ${i} and ${i + 1}`
                };
            }
        }

        return { valid: true };
    },

    analyzeWigglePattern(array) {
        if (!array || array.length <= 1) return "No pattern";
        
        let pattern = "";
        let valleys = 0;
        let peaks = 0;
        let violations = 0;

        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] < array[i + 1]) {
                pattern += "<";
                if (i % 2 === 0) valleys++;
                else violations++;
            } else if (array[i] > array[i + 1]) {
                pattern += ">";
                if (i % 2 === 1) peaks++;
                else violations++;
            } else {
                pattern += "=";
                violations++;
            }
        }

        return {
            pattern,
            valleys,
            peaks,
            violations,
            isValid: violations === 0
        };
    }
};

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        WIGGLE_SORT_CONFIG,
        WiggleSortConfigUtils
    };
} else if (typeof window !== 'undefined') {
    window.WIGGLE_SORT_CONFIG = WIGGLE_SORT_CONFIG;
    window.WiggleSortConfigUtils = WiggleSortConfigUtils;
    
    // Additional exports for universal loader compatibility
    window.WiggleSortConfig = WIGGLE_SORT_CONFIG;
    window.wigglesortConfig = WIGGLE_SORT_CONFIG;
    window.wigglesortconfig = WIGGLE_SORT_CONFIG;
}
