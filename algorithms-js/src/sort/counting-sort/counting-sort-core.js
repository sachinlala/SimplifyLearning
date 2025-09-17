/**
 * Counting Sort - Core Algorithm Implementation
 * 
 * A stable, special-purpose integer sorting algorithm with linear time and space 
 * complexity O(n + k), where k is the range of input values (0 to k-1).
 * 
 * Inventor: Harold H. Seward
 * 
 * Time Complexity: O(n + k) where n is number of elements, k is range of input
 * Space Complexity: O(k) for the counting array
 * 
 * Note: This algorithm is efficient only when k is not significantly larger than n.
 * Works best for integers within a known, limited range.
 * 
 * @see https://github.com/sachinlala/SimplifyLearning
 */

/**
 * Core counting sort algorithm
 * @param {number[]} arr - Array of non-negative integers to be sorted
 * @returns {Object} Sorted array and metrics
 */
function countingSort(arr) {
    if (!arr || arr.length <= 1) {
        return {
            sortedArray: arr || [],
            metrics: { comparisons: 0, counts: 0, range: 0 }
        };
    }

    // Validate input - must be non-negative integers
    for (let i = 0; i < arr.length; i++) {
        if (!Number.isInteger(arr[i]) || arr[i] < 0) {
            throw new Error(`Counting sort requires non-negative integers. Found: ${arr[i]} at index ${i}`);
        }
    }

    // Create a copy to avoid modifying the original array
    const sortedArray = [...arr];
    const n = sortedArray.length;
    let comparisons = 0;
    let counts = 0;

    // Find the maximum value to determine range
    let maxValue = sortedArray[0];
    for (let i = 1; i < n; i++) {
        comparisons++;
        if (sortedArray[i] > maxValue) {
            maxValue = sortedArray[i];
        }
    }

    // Create counting array
    const countArray = new Array(maxValue + 1).fill(0);
    
    // Count occurrences of each value
    for (let i = 0; i < n; i++) {
        countArray[sortedArray[i]]++;
        counts++;
    }

    // Transform counts to starting positions (cumulative sum)
    for (let i = 1; i <= maxValue; i++) {
        countArray[i] += countArray[i - 1];
    }

    // Create output array
    const output = new Array(n);
    
    // Build the sorted array (stable sort - process from right to left)
    for (let i = n - 1; i >= 0; i--) {
        const value = sortedArray[i];
        output[countArray[value] - 1] = value;
        countArray[value]--;
    }

    // Copy back to sortedArray
    for (let i = 0; i < n; i++) {
        sortedArray[i] = output[i];
    }

    return {
        sortedArray,
        metrics: { 
            comparisons, 
            counts, 
            range: maxValue + 1,
            elements: n
        }
    };
}


// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { countingSort };
} else if (typeof window !== 'undefined') {
    window.CountingSortCore = { countingSort };
    // Global function for backward compatibility
    window.countingSort = arr => countingSort(arr).sortedArray;
}
