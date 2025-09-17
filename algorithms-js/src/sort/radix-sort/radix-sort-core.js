/**
 * Radix Sort - Core Algorithm Implementation
 * 
 * A stable, non-comparison based integer sorting algorithm that works by processing
 * individual digits. Uses counting sort as a subroutine to sort the digits.
 * 
 * Time Complexity: O((n + k) * d) where n = elements, k = range (radix), d = digits
 * Space Complexity: O(n + k) for the counting and output arrays
 * 
 * Based on Counting Sort but processes each digit position separately from least
 * significant digit (LSD) to most significant digit (MSD).
 * 
 * @see https://github.com/sachinlala/SimplifyLearning
 */

// Constants
const DECIMAL_RADIX = 10;

/**
 * Core radix sort algorithm
 * @param {number[]} arr - Array of non-negative integers to be sorted
 * @returns {Object} Sorted array and metrics
 */
function radixSort(arr) {
    if (!arr || arr.length === 0) {
        return {
            sortedArray: arr || [],
            metrics: { comparisons: 0, countingSorts: 0, digits: 0, maxValue: 0 }
        };
    }

    // Validate input - must be non-negative integers
    for (let i = 0; i < arr.length; i++) {
        if (!Number.isInteger(arr[i]) || arr[i] < 0) {
            throw new Error(`Radix sort requires non-negative integers. Found: ${arr[i]} at index ${i}`);
        }
    }

    // Create a copy to avoid modifying the original array
    const sortedArray = [...arr];
    const n = sortedArray.length;
    let comparisons = 0;
    let countingSorts = 0;

    // Find the maximum value to determine number of digits
    let maxValue = sortedArray[0];
    for (let i = 1; i < n; i++) {
        comparisons++;
        if (sortedArray[i] > maxValue) {
            maxValue = sortedArray[i];
        }
    }

    // Count digits in maximum value  
    const digits = maxValue === 0 ? 1 : Math.floor(Math.log10(maxValue)) + 1;
    const originalMaxValue = maxValue;

    // Perform counting sort for each digit position
    for (let digitPlace = 1; maxValue > 0; digitPlace *= DECIMAL_RADIX, maxValue = Math.floor(maxValue / DECIMAL_RADIX)) {
        countingSort(sortedArray, digitPlace);
        countingSorts++;
    }
    
    // Handle edge case where maxValue is 0 (array of zeros) - still need one pass
    if (originalMaxValue === 0) {
        countingSort(sortedArray, 1);
        countingSorts = 1;
    }

    return {
        sortedArray,
        metrics: { 
            comparisons, 
            countingSorts, 
            digits,
            maxValue: originalMaxValue
        }
    };
}

/**
 * Counting sort subroutine for radix sort
 * @param {number[]} arr - Array to sort by specific digit
 * @param {number} digitPlace - Current digit position (1, 10, 100, etc.)
 */
function countingSort(arr, digitPlace) {
    const n = arr.length;
    const output = new Array(n);
    const count = new Array(DECIMAL_RADIX).fill(0);

    // Count occurrences of each digit (0-9)
    for (let i = 0; i < n; i++) {
        const digit = Math.floor(arr[i] / digitPlace) % DECIMAL_RADIX;
        count[digit]++;
    }

    // Transform count array to position array
    for (let i = 1; i < DECIMAL_RADIX; i++) {
        count[i] += count[i - 1];
    }

    // Build output array in reverse order to maintain stability
    for (let i = n - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / digitPlace) % DECIMAL_RADIX;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }

    // Copy output array back to original array
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        radixSort,
        countingSort
    };
} else if (typeof window !== 'undefined') {
    window.RadixSortCore = {
        radixSort,
        countingSort
    };
    // Global function for backward compatibility
    window.radixSort = arr => radixSort(arr).sortedArray;
}
