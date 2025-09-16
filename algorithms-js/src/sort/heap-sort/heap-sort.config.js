/**
 * Configuration for HeapSort Algorithm Demo
 */

const config = {
    name: "Heap Sort",
    title: "Heap Sort Demo",
    category: "sort",
    problem: "Sort an array using the heap-based sorting algorithm with guaranteed O(n log n) time complexity and in-place operation.",
    algorithmFunction: "runHeapSortDemo",
    hasVisualization: true,
    hasStepsFile: true,
    
    // Multi-language source code paths  
    sourceCode: {
        javascript: "https://github.com/sachinlala/SimplifyLearning/blob/master/algorithms-js/src/sort/heap-sort/heap-sort-core.js",
        java: "https://github.com/sachinlala/SimplifyLearning/blob/master/algorithms-java/src/main/java/com/sl/algorithms/sort/generalpurpose/heap/HeapSort.java"
    },
    
    inputs: [
        {
            id: "unsorted-array",
            type: "text",
            label: "Unsorted Array (max 12 elements for visualization)",
            defaultValue: "16, 4, 10, 14, 7, 9, 3, 2, 8, 1",
            width: "320px"
        },
        {
            id: "heap-type",
            type: "select",
            label: "Heap Type",
            options: [
                { value: "max", text: "Max-Heap (Ascending Sort)" },
                { value: "min", text: "Min-Heap (Descending Sort)" }
            ],
            defaultValue: "max",
            width: "200px"
        }
    ],
    
    explanation: {
        description: "Heap Sort is an in-place, comparison-based sorting algorithm that uses a binary heap data structure. It works in two phases: first building a heap from the input data, then repeatedly extracting the maximum (or minimum) element from the heap and rebuilding the heap until it's empty. Despite being slower in practice than QuickSort, it guarantees O(n log n) performance.",
        steps: [
            "Build Phase: Convert the input array into a binary heap (max-heap for ascending sort)",
            "Extract Phase: Repeatedly move the root (largest element) to the end of the array", 
            "Heapify: After each extraction, restore the heap property for the remaining elements",
            "Repeat: Continue until all elements are in their correct sorted positions"
        ]
    },
    
    complexityAnalysis: {
        time: {
            best: "O(n log n) - Even for already sorted arrays",
            average: "O(n log n) - Consistent performance",
            worst: "O(n log n) - Guaranteed upper bound"
        },
        space: "O(1) - In-place sorting with constant extra space",
        stability: false,
        inPlace: true,
        adaptive: false
    },
    
    characteristics: [
        "In-place sorting algorithm (requires only O(1) extra space)",
        "Not stable (relative order of equal elements may change)",
        "Guaranteed O(n log n) time complexity in all cases",
        "Based on binary heap data structure",
        "Memory efficient compared to merge sort",
        "Not adaptive (doesn't take advantage of existing order)",
        "Good for systems with memory constraints"
    ],

    // Data size recommendations - simplified
    dataSizeRecommendations: {
        excellent: {
            range: "1,000+ elements",
            description: "Best for large datasets with memory constraints - guaranteed O(n log n) in-place sorting",
            reasons: ["In-place sorting", "Guaranteed performance", "Memory efficient"]
        },
        good: {
            range: "100 - 1,000 elements",
            description: "Good for medium datasets when memory is limited",
            reasons: ["Predictable performance", "No stack overflow risk"]
        },
        fair: {
            range: "50 - 100 elements",
            description: "Reasonable but less cache-friendly than alternatives",
            reasons: ["Consider QuickSort or MergeSort for better performance"]
        },
        poor: {
            range: "1 - 50 elements",
            description: "Use simpler algorithms for small datasets",
            reasons: ["Heap construction overhead not worth it"],
            alternatives: ["Insertion Sort", "Selection Sort"]
        }
    },

    // Comparison with other algorithms
    algorithmComparison: [
        {
            algorithm: "Quick Sort",
            comparison: "QuickSort is faster on average but has O(n²) worst-case. HeapSort guarantees O(n log n) but uses more memory bandwidth.",
            whenToUse: "Use HeapSort when you need guaranteed performance and memory is constrained"
        },
        {
            algorithm: "Merge Sort",
            comparison: "MergeSort is stable and has the same time complexity, but HeapSort is in-place while MergeSort needs O(n) extra space",
            whenToUse: "Use HeapSort for memory-constrained environments, MergeSort when stability matters"
        },
        {
            algorithm: "Selection Sort",
            comparison: "Both are in-place and unstable, but HeapSort is much faster: O(n log n) vs O(n²)",
            whenToUse: "Use HeapSort for better performance, Selection Sort only for educational purposes"
        }
    ],

    // Practical applications
    practicalApplications: [
        "Priority queue implementation (the heap data structure)",
        "Finding the k largest or smallest elements efficiently",
        "Embedded systems with limited memory",
        "Real-time systems requiring guaranteed performance bounds",
        "Operating system schedulers and task management",
        "Memory-constrained environments where in-place sorting is crucial"
    ],

    customDemoFunction: `
        function runDemo() {
            runHeapSortDemo();
        }
    `
};

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} else if (typeof window !== 'undefined') {
    window.heapSortConfig = config;
}