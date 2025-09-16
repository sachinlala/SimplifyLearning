/**
 * Heap Sort - Core Implementation
 * 
 * An in-place, unstable sorting algorithm with guaranteed O(n log n) time complexity.
 * Uses a binary heap data structure to efficiently sort elements.
 * 
 * @see https://en.wikipedia.org/wiki/Heapsort
 */

/**
 * Main heap sort function with step tracking for visualization
 * @param {Array} arr - Array to sort
 * @param {string} heapType - 'max' for max-heap (ascending sort) or 'min' for min-heap (descending sort)
 * @returns {Object} - Result object with sorted array, steps, and metrics
 */
 * Simple heap sort without step tracking (for performance)
 * @param {Array} arr - Array to sort
 * @param {string} heapType - 'max' for ascending, 'min' for descending
 * @returns {Object} - Result with sorted array and metrics
 */
function heapSort(arr, heapType = 'max') {
    if (!arr || arr.length <= 1) {
        return {
            sortedArray: [...(arr || [])],
            metrics: { comparisons: 0, swaps: 0, heapOperations: 0 }
        };
    }

    const metrics = { comparisons: 0, swaps: 0, heapOperations: 0 };
    const workingArray = [...arr];
    let heapSize = arr.length;

    // Build heap
    buildHeapSimple(workingArray, heapSize, heapType, metrics);

    // Extract elements
    for (let i = arr.length - 1; i > 0; i--) {
        swapSimple(workingArray, 0, i, metrics);
        heapSize--;
        heapifySimple(workingArray, heapSize, 0, heapType, metrics);
    }

    return {
        sortedArray: workingArray,
        metrics: metrics
    };
}

/**
 * Build heap without visualization steps
 */
function buildHeapSimple(arr, heapSize, heapType, metrics) {
    for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
        heapifySimple(arr, heapSize, i, heapType, metrics);
    }
}

/**
 * Heapify without visualization steps
 */
function heapifySimple(arr, heapSize, i, heapType, metrics) {
    let target = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (heapType === 'max') {
        if (left < heapSize) {
            metrics.comparisons++;
            if (arr[left] > arr[target]) target = left;
        }
        if (right < heapSize) {
            metrics.comparisons++;
            if (arr[right] > arr[target]) target = right;
        }
    } else {
        if (left < heapSize) {
            metrics.comparisons++;
            if (arr[left] < arr[target]) target = left;
        }
        if (right < heapSize) {
            metrics.comparisons++;
            if (arr[right] < arr[target]) target = right;
        }
    }

    if (target !== i) {
        swapSimple(arr, i, target, metrics);
        heapifySimple(arr, heapSize, target, heapType, metrics);
    }

    metrics.heapOperations++;
}

/**
 * Simple swap without visualization
 */
function swapSimple(arr, i, j, metrics) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    metrics.swaps++;
}

// Export functions for both Node.js and browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        
        heapSort
    };
} else if (typeof window !== 'undefined') {
    
    window.heapSort = heapSort;
}