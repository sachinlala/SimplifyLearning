/**
 * Selection Sort - Core Algorithm Implementation
 * 
 * Selection Sort is an in-place quadratic-complexity sort algorithm that finds 
 * the minimum element from the unsorted part and puts it at the beginning.
 * 
 * Algorithm: Given a list, take the current element and exchange it with the 
 * smallest element on the right.
 * 
 * Time Complexity: O(n²) in all cases
 * Space Complexity: O(1)
 * 
 * Usage: Small data-sets or when 'write' operations are expensive
 * 
 * @author SimplifyLearning
 * @see https://github.com/sachinlala/SimplifyLearning
 */

/**
 * Core selection sort algorithm
 * @param {number[]} arr - Array to be sorted
 * @param {Object} options - Options for sorting behavior
 * @returns {Object} Sorted array and metrics
 */
function selectionSort(arr, options = {}) {
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

    // Selection sort implementation
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        // Find the minimum element in the remaining unsorted array
        for (let j = i + 1; j < n; j++) {
            comparisons++;
            if (sortedArray[j] < sortedArray[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap the found minimum element with the first element
        if (minIndex !== i) {
            [sortedArray[i], sortedArray[minIndex]] = [sortedArray[minIndex], sortedArray[i]];
            swaps++;
        }
    }

    return {
        sortedArray,
        metrics: { comparisons, swaps, passes: n - 1 }
    };
}

/**
 * Simple selection sort function (backward compatibility)
 * @param {number[]} arr - Array to sort
 * @returns {number[]} Sorted array
 */
function selectionSortSimple(arr) {
    const result = selectionSort(arr);
    return result.sortedArray;
}

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        selectionSort,
        selectionSortSimple
    };
} else if (typeof window !== 'undefined') {
    window.SelectionSortCore = {
        selectionSort,
        selectionSortSimple
    };
    // Global function for backward compatibility
    window.selectionSort = selectionSortSimple;
}
