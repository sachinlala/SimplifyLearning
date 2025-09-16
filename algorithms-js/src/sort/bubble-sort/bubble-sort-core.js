/**
 * Bubble Sort - Core Algorithm Implementation
 * 
 * Bubble Sort is a simple sorting algorithm that repeatedly steps through the list,
 * compares adjacent elements and swaps them if they are in the wrong order.
 * The pass through the list is repeated until the list is sorted.
 * 
 * Time Complexity: O(n²) in worst and average case, O(n) in best case
 * Space Complexity: O(1)
 * 
 * @see https://github.com/sachinlala/SimplifyLearning
 */

/**
 * Core bubble sort algorithm
 * @param {number[]} arr - Array to be sorted
 * @param {Object} options - Options for sorting behavior
 * @returns {Object} Sorted array and metrics
 */
function bubbleSort(arr, options = {}) {
    if (!arr || arr.length <= 1) {
        return {
            sortedArray: arr || [],
            metrics: { comparisons: 0, swaps: 0, passes: 0 }
        };
    }

    // Create a copy to avoid modifying the original array
    const sortedArray = [...arr];
    const n = sortedArray.length;
    let comparisons = 0;
    let swaps = 0;
    let passes = 0;

    // Bubble sort implementation
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        passes++;
        
        for (let j = 0; j < n - i - 1; j++) {
            comparisons++;
            
            if (sortedArray[j] > sortedArray[j + 1]) {
                // Swap elements
                [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
                swaps++;
                swapped = true;
            }
        }
        
        // Early termination if no swaps were made
        if (!swapped) {
            break;
        }
    }

    return {
        sortedArray,
        metrics: { comparisons, swaps, passes }
    };
}


/**
 * Simple bubble sort function (backward compatibility)
 * @param {number[]} arr - Array to sort
 * @returns {number[]} Sorted array
 */
function bubbleSortSimple(arr) {
    const result = bubbleSort(arr);
    return result.sortedArray;
}

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        bubbleSort,
        bubbleSortSimple
    };
} else if (typeof window !== 'undefined') {
    window.BubbleSortCore = {
        bubbleSort,
        bubbleSortSimple
    };
    // Global function for backward compatibility
    window.bubbleSort = bubbleSortSimple;
}
