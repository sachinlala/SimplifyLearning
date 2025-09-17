/**
 * Insertion Sort - Core Algorithm Implementation
 * 
 * Insertion Sort is an in-place, stable, and online quadratic-complexity sort algorithm 
 * that builds the final sorted array one element at a time. It is efficient for small 
 * data sets and is often used as a subroutine in hybrid algorithms.
 * 
 * Algorithm: Take each element from the unsorted portion and insert it at the 
 * appropriate position in the sorted portion, similar to sorting playing cards in hand.
 * 
 * Time Complexity: O(n²) worst/average case, O(n) best case (already sorted)
 * Space Complexity: O(1)
 * 
 * Properties: In-place, stable, online, adaptive
 * Usage: Small datasets, nearly sorted data, as subroutine in quicksort/mergesort
 * 
 * @see https://github.com/sachinlala/SimplifyLearning
 */

/**
 * Core insertion sort algorithm
 * @param {number[]} arr - Array to be sorted
 * @returns {Object} Sorted array and metrics
 */
function insertionSort(arr) {
    if (!arr || arr.length <= 1) {
        return {
            sortedArray: arr || [],
            metrics: { comparisons: 0, shifts: 0, passes: 0 }
        };
    }

    // Create a copy to avoid modifying the original array
    const sortedArray = [...arr];
    const n = sortedArray.length;
    let comparisons = 0;
    let shifts = 0;

    // Insertion sort implementation
    for (let i = 1; i < n; i++) {
        const key = sortedArray[i];
        let j = i - 1;
        
        // Move elements that are greater than key one position ahead
        while (j >= 0) {
            comparisons++;
            if (sortedArray[j] > key) {
                sortedArray[j + 1] = sortedArray[j];
                shifts++;
                j--;
            } else {
                break;
            }
        }
        
        // Place key at its correct position
        sortedArray[j + 1] = key;
    }

    return {
        sortedArray,
        metrics: { comparisons, shifts, passes: n - 1 }
    };
}

/**
 * Binary insertion sort - uses binary search to find insertion position
 * More efficient for comparison-heavy scenarios
 * @param {number[]} arr - Array to be sorted
 * @returns {Object} Sorted array and metrics
 */
function binaryInsertionSort(arr) {
    if (!arr || arr.length <= 1) {
        return {
            sortedArray: arr || [],
            metrics: { comparisons: 0, shifts: 0, passes: 0 }
        };
    }

    const sortedArray = [...arr];
    const n = sortedArray.length;
    let comparisons = 0;
    let shifts = 0;

    for (let i = 1; i < n; i++) {
        const key = sortedArray[i];
        
        // Binary search for insertion position
        let left = 0;
        let right = i;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            comparisons++;
            
            if (sortedArray[mid] > key) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        
        // Shift elements and insert
        for (let j = i; j > left; j--) {
            sortedArray[j] = sortedArray[j - 1];
            shifts++;
        }
        
        sortedArray[left] = key;
    }

    return {
        sortedArray,
        metrics: { comparisons, shifts, passes: n - 1 }
    };
}

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        insertionSort,
        binaryInsertionSort
    };
} else if (typeof window !== 'undefined') {
    window.InsertionSortCore = {
        insertionSort,
        binaryInsertionSort
    };
    // Expose commonly used functions for configs
    window.binaryInsertionSort = binaryInsertionSort;
    // Global function for backward compatibility
    window.insertionSort = arr => insertionSort(arr).sortedArray;
}
