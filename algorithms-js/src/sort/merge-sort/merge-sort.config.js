/**
 * Configuration for MergeSort Algorithm Demo
 */

const config = {
    name: "Merge Sort",
    title: "Merge Sort Demo",
    category: "sort", 
    problem: "Sort an array using the stable divide-and-conquer merge sort algorithm with guaranteed O(n log n) time complexity.",
    algorithmFunction: "runMergeSortDemo",
    hasVisualization: true,
    
    // Multi-language source code paths  
    sourceCode: {
        javascript: "https://github.com/sachinlala/SimplifyLearning/blob/master/algorithms-js/src/sort/merge-sort/merge-sort.js",
        java: "https://github.com/sachinlala/SimplifyLearning/tree/master/algorithms-java/src/main/java/com/sl/algorithms/sort/generalpurpose/merge"
    },
    
    inputs: [
        {
            id: "unsorted-array",
            type: "text",
            label: "Unsorted Array (max 16 elements for visualization)",
            defaultValue: "38, 27, 43, 3, 9, 82, 10, 1",
            width: "320px"
        },
        {
            id: "show-steps",
            type: "checkbox",
            label: "Show Step-by-Step Visualization",
            defaultValue: true,
            width: "auto"
        }
    ],
    
    explanation: {
        description: "Merge Sort is a stable, divide-and-conquer sorting algorithm invented by John von Neumann in 1945. It consistently performs in O(n log n) time complexity, making it one of the most predictable sorting algorithms. The algorithm works by recursively dividing the array into smaller sub-arrays, sorting them, and then merging them back together in the correct order.",
        steps: [
            "Divide: Split the array into two halves until each sub-array has at most one element",
            "Conquer: Recursively sort the left and right sub-arrays (base case: single elements are already sorted)",
            "Combine: Merge the two sorted sub-arrays back into one sorted array",
            "Repeat the merge process up the recursion tree until the entire array is sorted"
        ]
    },
    
    complexityAnalysis: {
        time: {
            best: "O(n log n) - Even for already sorted arrays",
            average: "O(n log n) - Consistent performance",
            worst: "O(n log n) - Guaranteed upper bound"
        },
        space: "O(n) - Requires auxiliary arrays for merging",
        stability: true,
        inPlace: false,
        adaptive: false
    },
    
    characteristics: [
        "Stable sorting algorithm (preserves relative order of equal elements)",
        "Divide-and-conquer approach with guaranteed O(n log n) performance",
        "Not in-place (requires O(n) additional space)",
        "Highly parallelizable due to independent sub-problems", 
        "Performs consistently regardless of input distribution",
        "Excellent for large datasets and external sorting",
        "Cache-friendly memory access patterns"
    ],

    // Data size recommendations - This addresses your nice-to-have requirement!
    dataSizeRecommendations: {
        excellent: {
            range: "1,000 - 10,000,000+ elements",
            description: "Merge sort excels with large datasets due to its guaranteed O(n log n) performance and predictable behavior",
            reasons: [
                "Consistent performance regardless of input order",
                "Excellent for external sorting (data larger than memory)",
                "Highly parallelizable for multi-threaded environments",
                "Stable sorting preserves original order of equal elements"
            ]
        },
        good: {
            range: "100 - 1,000 elements", 
            description: "Good choice for medium-sized datasets, especially when stability is required",
            reasons: [
                "Guaranteed O(n log n) performance",
                "Stable sorting when order preservation matters",
                "Predictable memory usage patterns"
            ]
        },
        fair: {
            range: "50 - 100 elements",
            description: "Reasonable choice but may have overhead compared to simpler algorithms",
            reasons: [
                "Still efficient but overhead from recursion and auxiliary arrays",
                "Consider QuickSort for better cache performance"
            ]
        },
        poor: {
            range: "1 - 50 elements",
            description: "Not recommended for small datasets due to overhead",
            reasons: [
                "Insertion sort is typically faster for small arrays",
                "Overhead from recursion and auxiliary array allocation",
                "Simple algorithms like insertion sort have better cache locality"
            ],
            alternatives: ["Insertion Sort", "Selection Sort", "Bubble Sort"]
        }
    },

    // Comparison with other algorithms
    algorithmComparison: [
        {
            algorithm: "Quick Sort",
            comparison: "QuickSort is faster on average but has O(n²) worst-case. MergeSort guarantees O(n log n) and is stable.",
            whenToUse: "Use MergeSort when you need guaranteed performance and stability"
        },
        {
            algorithm: "Heap Sort", 
            comparison: "Both are O(n log n) guaranteed, but MergeSort is stable while HeapSort is in-place",
            whenToUse: "Use MergeSort for stability, HeapSort for space constraints"
        },
        {
            algorithm: "Insertion Sort",
            comparison: "Insertion sort is faster for small arrays (< 50 elements) and is adaptive",
            whenToUse: "Use MergeSort for large datasets, Insertion sort for small ones"
        }
    ],

    // Practical applications
    practicalApplications: [
        "External sorting for datasets larger than available memory",
        "Sorting linked lists (doesn't require random access)",
        "Stable sorting when preserving original order of equal elements matters",
        "Multi-threaded parallel sorting algorithms",
        "Database management systems for large table sorting",
        "Sorting objects where comparison is expensive"
    ],

    customDemoFunction: `
        function runDemo() {
            runMergeSortDemo();
        }
    `
};

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} else if (typeof window !== 'undefined') {
    window.mergeSortConfig = config;
}