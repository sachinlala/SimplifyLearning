/**
 * Bucket Sort - Core Algorithm Implementation
 * 
 * A distribution sorting algorithm that works by distributing elements into buckets,
 * sorting each bucket individually, then concatenating the sorted buckets.
 * 
 * Time Complexity: O(n + k) average case, O(n²) worst case
 * Space Complexity: O(n + k) for buckets
 * 
 * Works best when data is uniformly distributed across the input range.
 * 
 * @see https://github.com/sachinlala/SimplifyLearning
 */

// Import utilities for reusable functions
// Note: SortingUtils is available globally via window.SortingUtils when loaded by universal loader
if (typeof require !== 'undefined') {
    // Node.js environment
    const SortingUtils = require('../utils/sorting-utils.js');
}
// In browser environment, SortingUtils is available via window.SortingUtils

/**
 * Core bucket sort algorithm for floating-point numbers in range [0, 1)
 * @param {number[]} arr - Array of numbers to be sorted
 * @param {Object} options - Options for sorting behavior
 * @returns {Object} Sorted array and metrics
 */
function bucketSort(arr, options = {}) {
    if (!arr || arr.length === 0) {
        return {
            sortedArray: arr || [],
            metrics: { comparisons: 0, swaps: 0, buckets: 0, bucketSorts: 0 }
        };
    }

    // Validate input - should be numbers
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] !== 'number' || isNaN(arr[i])) {
            throw new Error(`Bucket sort requires numbers. Found: ${arr[i]} at index ${i}`);
        }
    }

    const sortedArray = [...arr];
    const n = sortedArray.length;
    let comparisons = 0;
    let swaps = 0;
    let bucketSorts = 0;

    // Determine range of data
    const min = Math.min(...sortedArray);
    const max = Math.max(...sortedArray);
    const range = max - min;
    
    // Handle edge case where all elements are the same
    if (range === 0) {
        return {
            sortedArray,
            metrics: { comparisons, swaps, buckets: 1, bucketSorts: 0 }
        };
    }

    // Create buckets - using square root of n as number of buckets for good performance
    const bucketCount = Math.max(1, Math.floor(Math.sqrt(n)));
    const buckets = Array.from({ length: bucketCount }, () => []);
    
    // Distribute elements into buckets
    for (let i = 0; i < n; i++) {
        const bucketIndex = Math.min(
            bucketCount - 1, 
            Math.floor(((sortedArray[i] - min) / range) * bucketCount)
        );
        buckets[bucketIndex].push(sortedArray[i]);
    }
    
    // Sort each bucket and collect results
    let index = 0;
    for (let i = 0; i < bucketCount; i++) {
        if (buckets[i].length > 0) {
            bucketSorts++;
            // Sort bucket using insertion sort (good for small arrays)
            const sortResult = insertionSortForBucket(buckets[i]);
            comparisons += sortResult.comparisons;
            swaps += sortResult.swaps;
            
            // Copy sorted bucket back to main array
            for (let j = 0; j < buckets[i].length; j++) {
                sortedArray[index++] = buckets[i][j];
            }
        }
    }

    return {
        sortedArray,
        metrics: { 
            comparisons, 
            swaps, 
            buckets: bucketCount,
            bucketSorts,
            range: { min, max, span: range }
        }
    };
}

/**
 * Insertion sort optimized for bucket sorting
 * @param {number[]} arr - Small array to sort
 * @returns {Object} Metrics from sorting
 */
function insertionSortForBucket(arr) {
    let comparisons = 0;
    let swaps = 0;
    
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        let j = i - 1;
        
        while (j >= 0) {
            comparisons++;
            if (arr[j] > key) {
                arr[j + 1] = arr[j];
                swaps++;
                j--;
            } else {
                break;
            }
        }
        arr[j + 1] = key;
    }
    
    return { comparisons, swaps };
}


/**
 * Simple bucket sort function (backward compatibility)
 * @param {number[]} arr - Array of numbers to sort
 * @returns {number[]} Sorted array
 */
function bucketSortSimple(arr) {
    const result = bucketSort(arr);
    return result.sortedArray;
}

/**
 * Bucket sort for integers in a specific range
 * @param {number[]} arr - Array of integers to sort
 * @param {number} maxValue - Maximum value in the array
 * @returns {Object} Sorted array and metrics
 */
function bucketSortIntegers(arr, maxValue = null) {
    if (!arr || arr.length === 0) {
        return {
            sortedArray: arr || [],
            metrics: { comparisons: 0, swaps: 0, buckets: 0, bucketSorts: 0 }
        };
    }

    // Find max value if not provided
    if (maxValue === null) {
        maxValue = Math.max(...arr);
    }
    
    // Normalize to [0, 1) range for bucket sort
    const normalized = arr.map(x => x / (maxValue + 1));
    
    // Apply bucket sort
    const result = bucketSort(normalized);
    
    // Denormalize back to original range
    result.sortedArray = result.sortedArray.map(x => Math.floor(x * (maxValue + 1)));
    
    return result;
}

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        bucketSort,
        bucketSortSimple,
        bucketSortIntegers,
        insertionSortForBucket
    };
} else if (typeof window !== 'undefined') {
    window.BucketSortCore = {
        bucketSort,
        bucketSortSimple,
        bucketSortIntegers,
        insertionSortForBucket
    };
    // Global function for backward compatibility
    window.bucketSort = bucketSortSimple;
}
