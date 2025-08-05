/**
 * Binary Search Algorithm Implementation
 * 
 * Searches for a target element in a sorted array using the divide-and-conquer approach.
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
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
 * Binary search with step-by-step visualization data
 * @param {number[]} sortedArray - The sorted array to search in
 * @param {number} target - The target element to find
 * @returns {Object} Result with index and step-by-step data
 */
function binarySearchWithSteps(sortedArray, target) {
    if (!Array.isArray(sortedArray) || sortedArray.length === 0) {
        throw new Error('Input must be a non-empty array');
    }

    const steps = [];
    let start = 0;
    let end = sortedArray.length - 1;
    let stepCount = 0;

    while (start <= end) {
        stepCount++;
        const mid = Math.floor((start + end) / 2);
        const midValue = sortedArray[mid];

        steps.push({
            step: stepCount,
            start,
            end,
            mid,
            midValue,
            target,
            comparison: target === midValue ? 'equal' : target < midValue ? 'less' : 'greater',
            found: target === midValue
        });

        if (midValue === target) {
            return {
                index: mid,
                found: true,
                steps,
                totalComparisons: stepCount
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
        steps,
        totalComparisons: stepCount
    };
}

// Export for module environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        binarySearchIterative,
        binarySearchRecursive,
        binarySearchWithSteps
    };
}

// Make available globally for browser use
if (typeof window !== 'undefined') {
    window.binarySearchIterative = binarySearchIterative;
    window.binarySearchRecursive = binarySearchRecursive;
    window.binarySearchWithSteps = binarySearchWithSteps;
}
