/**
 * Dutch National Flag Sort - Core Algorithm Implementation
 * 
 * A specialized sorting algorithm for partitioning arrays into 3 groups.
 * Efficiently handles cases where data can be divided into 2-3 finite groups.
 * 
 * Time Complexity: O(n) - single pass through array
 * Space Complexity: O(1) - in-place sorting
 * 
 * Named after the Dutch flag (red, white, blue stripes) and invented by
 * Edsger Dijkstra as part of the quicksort partitioning strategy.
 * 
 * @see https://github.com/sachinlala/SimplifyLearning
 */

// Import utilities for reusable functions
// Import utilities for reusable functions
// Note: SortingUtils is available globally via window.SortingUtils when loaded by universal loader
if (typeof require !== 'undefined') {
    // Node.js environment
    const SortingUtils = require('../utils/sorting-utils.js');
}
// In browser environment, SortingUtils is available via window.SortingUtils

/**
 * Core Dutch National Flag sort algorithm
 * @param {any[]} arr - Array to be sorted into 3 groups
 * @param {any} redValue - Value for the first group (red)
 * @param {any} whiteValue - Value for the middle group (white) - optional
 * @param {any} blueValue - Value for the third group (blue)
 * @param {Object} options - Options for sorting behavior
 * @returns {Object} Sorted array and metrics
 */
function dutchFlagSort(arr, redValue, whiteValue, blueValue, options = {}) {
    if (!arr || arr.length <= 1) {
        return {
            sortedArray: arr || [],
            metrics: { comparisons: 0, swaps: 0, partitions: { red: 0, white: 0, blue: 0 } }
        };
    }

    const sortedArray = [...arr];
    const n = sortedArray.length;
    let comparisons = 0;
    let swaps = 0;

    // Handle two-value case (Polish flag) - whiteValue is implicit
    const isTwoValueSort = (whiteValue === undefined || whiteValue === null);
    
    let redCount = 0;
    let whiteCount = 0;
    let blueCount = 0;

    // Use the three-way partitioning algorithm
    let red = 0;      // boundary for red section
    let white = n - 1; // current element being processed
    let blue = n - 1;  // boundary for blue section

    while (white >= red) {
        const current = sortedArray[white];
        comparisons++;

        if (current === redValue) {
            // Swap with red boundary and expand red section
            if (red !== white) {
                SortingUtils.swap(sortedArray, red, white);
                swaps++;
            }
            redCount++;
            red++;
        } else if (current === blueValue) {
            // Swap with blue boundary and shrink blue section
            if (white !== blue) {
                SortingUtils.swap(sortedArray, white, blue);
                swaps++;
            }
            blueCount++;
            blue--;
            white--; // Move back to check the swapped element
        } else {
            // White element (middle group) or unknown element
            if (isTwoValueSort || current === whiteValue) {
                whiteCount++;
                white--;
            } else {
                // Unknown element - treat as white for now
                whiteCount++;
                white--;
            }
        }
    }

    return {
        sortedArray,
        metrics: { 
            comparisons, 
            swaps,
            partitions: { red: redCount, white: whiteCount, blue: blueCount },
            redValue,
            whiteValue: isTwoValueSort ? 'implicit' : whiteValue,
            blueValue
        }
    };
}

/**
 * Three-way partitioning (full Dutch flag)
 * @param {any[]} arr - Array to partition
 * @param {any} redValue - First group value
 * @param {any} whiteValue - Second group value
 * @param {any} blueValue - Third group value
 * @returns {Object} Sorted array and metrics
 */
function dutchFlagSort3Way(arr, redValue, whiteValue, blueValue) {
    return dutchFlagSort(arr, redValue, whiteValue, blueValue);
}

/**
 * Two-way partitioning (Polish flag variant)
 * @param {any[]} arr - Array to partition
 * @param {any} firstValue - First group value
 * @param {any} secondValue - Second group value (everything else is middle)
 * @returns {Object} Sorted array and metrics
 */
function dutchFlagSort2Way(arr, firstValue, secondValue) {
    return dutchFlagSort(arr, firstValue, null, secondValue);
}

/**
 * Dutch flag sort with step-by-step tracking for visualization
 * @param {any[]} arr - Array to be sorted
 * @param {any} redValue - Red group value
 * @param {any} whiteValue - White group value (optional)
 * @param {any} blueValue - Blue group value
 * @returns {Object} Result with sorted array, steps, and metrics
 */
 * Simple Dutch flag sort function (backward compatibility)
 * @param {any[]} arr - Array to sort
 * @param {any} redValue - Red value
 * @param {any} whiteValue - White value (optional)
 * @param {any} blueValue - Blue value
 * @returns {any[]} Sorted array
 */
function dutchFlagSortSimple(arr, redValue, whiteValue, blueValue) {
    const result = dutchFlagSort(arr, redValue, whiteValue, blueValue);
    return result.sortedArray;
}

/**
 * Sort colors (classic Dutch flag problem)
 * @param {string[]} arr - Array of color strings
 * @returns {Object} Sorted array and metrics
 */
function sortColors(arr) {
    return dutchFlagSort(arr, 'red', 'white', 'blue');
}

/**
 * Sort 0s, 1s, and 2s (common interview problem)
 * @param {number[]} arr - Array of 0s, 1s, and 2s
 * @returns {Object} Sorted array and metrics
 */
function sort012(arr) {
    return dutchFlagSort(arr, 0, 1, 2);
}

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        dutchFlagSort,
        dutchFlagSort3Way,
        dutchFlagSort2Way,
        
        dutchFlagSortSimple,
        sortColors,
        sort012
    };
} else if (typeof window !== 'undefined') {
    window.DutchFlagSortCore = {
        dutchFlagSort,
        dutchFlagSort3Way,
        dutchFlagSort2Way,
        
        dutchFlagSortSimple,
        sortColors,
        sort012
    };
    // Expose commonly used functions in global scope for demo configs
    
    // Backward compatibility
    window.dutchFlagSort = dutchFlagSortSimple;
}