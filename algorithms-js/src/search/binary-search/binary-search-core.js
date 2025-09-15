/**
 * Binary Search - Core Algorithm Implementation
 * 
 * Binary Search is an efficient algorithm for finding a target element in a sorted array.
 * It operates by repeatedly dividing the search space in half, comparing the target value
 * to the middle element and eliminating half of the remaining possibilities.
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1) for iterative, O(log n) for recursive
 * 
 * Requirements: The input array must be sorted in ascending order.
 * 
 * @see https://github.com/sachinlala/SimplifyLearning
 */

/**
 * Iterative binary search implementation
 * @param {number[]} sortedArray - The sorted array to search in
 * @param {number} target - The target element to find
 * @returns {number} Index of the target element, or -1 if not found
 */
function binarySearchIterative(sortedArray, target) {
    if (!Array.isArray(sortedArray) || sortedArray.length === 0) {
        throw new Error('Input must be a non-empty array');
    }

    let start = 0;
    let end = sortedArray.length - 1;

    while (start <= end) {
        const mid = Math.floor((start + end) / 2);
        const midValue = sortedArray[mid];

        if (midValue === target) {
            return mid; // Found the target
        } else if (target < midValue) {
            end = mid - 1; // Search left half
        } else {
            start = mid + 1; // Search right half
        }
    }

    return -1; // Target not found
}

/**
 * Recursive binary search implementation
 * @param {number[]} sortedArray - The sorted array to search in
 * @param {number} target - The target element to find
 * @param {number} start - Start index (default: 0)
 * @param {number} end - End index (default: array.length - 1)
 * @returns {number} Index of the target element, or -1 if not found
 */
function binarySearchRecursive(sortedArray, target, start = 0, end = sortedArray.length - 1) {
    if (!Array.isArray(sortedArray) || sortedArray.length === 0) {
        throw new Error('Input must be a non-empty array');
    }

    if (start > end) {
        return -1; // Base case: target not found
    }

    const mid = Math.floor((start + end) / 2);
    const midValue = sortedArray[mid];

    if (midValue === target) {
        return mid; // Found the target
    } else if (target < midValue) {
        return binarySearchRecursive(sortedArray, target, start, mid - 1); // Search left half
    } else {
        return binarySearchRecursive(sortedArray, target, mid + 1, end); // Search right half
    }
}

/**
 * Binary search with detailed metrics tracking
 * @param {number[]} sortedArray - The sorted array to search in
 * @param {number} target - The target element to find
 * @returns {Object} Result with index, found status, and metrics
 */
function binarySearch(sortedArray, target) {
    if (!Array.isArray(sortedArray) || sortedArray.length === 0) {
        return {
            index: -1,
            found: false,
            comparisons: 0,
            error: 'Input must be a non-empty array'
        };
    }

    let start = 0;
    let end = sortedArray.length - 1;
    let comparisons = 0;

    while (start <= end) {
        const mid = Math.floor((start + end) / 2);
        const midValue = sortedArray[mid];
        comparisons++;

        if (midValue === target) {
            return {
                index: mid,
                found: true,
                comparisons,
                iterations: comparisons
            };
        } else if (target < midValue) {
            end = mid - 1;
        } else {
            start = mid + 1;
        }
    }

    return {
        index: -1,
        found: false,
        comparisons,
        iterations: comparisons
    };
}

/**
 * Simple binary search function for backward compatibility
 * @param {number[]} sortedArray - The sorted array to search in
 * @param {number} target - The target element to find
 * @returns {number} Index of the target element, or -1 if not found
 */
function binarySearchSimple(sortedArray, target) {
    const result = binarySearch(sortedArray, target);
    return result.index;
}

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        binarySearch,
        binarySearchIterative,
        binarySearchRecursive,
        binarySearchSimple
    };
} else if (typeof window !== 'undefined') {
    window.BinarySearchCore = {
        binarySearch,
        binarySearchIterative,
        binarySearchRecursive,
        binarySearchSimple
    };
    // Expose commonly used functions for configs
    window.binarySearchIterative = binarySearchIterative;
    window.binarySearchRecursive = binarySearchRecursive;
    // Global function for backward compatibility
    window.binarySearch = binarySearchSimple;
}