/**
 * Merge Sort - Core Implementation
 * 
 * A stable, divide-and-conquer sorting algorithm with guaranteed O(n log n) time complexity.
 * Uses O(n) extra space for auxiliary arrays during the merge process.
 * 
 * Invented by John von Neumann in 1945.
 * 
 * @see https://en.wikipedia.org/wiki/Merge_sort
 */

/**
 * Simple merge sort without step tracking (for performance)
 * @param {Array} arr - Array to sort
 * @returns {Object} - Result with sorted array and metrics
 */
function mergeSort(arr) {
    if (!arr || arr.length <= 1) {
        return {
            sortedArray: [...(arr || [])],
            metrics: { comparisons: 0, merges: 0, recursiveDepth: 0 }
        };
    }

    const metrics = { comparisons: 0, merges: 0, recursiveDepth: 0 };
    const workingArray = [...arr];
    const aux = new Array(arr.length);

    topDownMergeSortSimple(workingArray, 0, arr.length, aux, metrics, 0);

    return {
        sortedArray: workingArray,
        metrics: metrics
    };
}

/**
 * Simple top-down merge sort without visualization steps
 */
function topDownMergeSortSimple(arr, start, end, aux, metrics, depth) {
    if (end - start < 2) {
        return;
    }

    metrics.recursiveDepth = Math.max(metrics.recursiveDepth, depth);
    const mid = Math.floor((start + end) / 2);

    topDownMergeSortSimple(arr, start, mid, aux, metrics, depth + 1);
    topDownMergeSortSimple(arr, mid, end, aux, metrics, depth + 1);

    mergeSimple(arr, start, mid, end, aux, metrics);
}

/**
 * Simple merge without visualization steps
 */
function mergeSimple(arr, start, mid, end, aux, metrics) {
    for (let k = start; k < end; k++) {
        aux[k] = arr[k];
    }

    let i = start;
    let j = mid;

    for (let k = start; k < end; k++) {
        if (i < mid && (j >= end || aux[i] <= aux[j])) {
            arr[k] = aux[i];
            i++;
        } else {
            arr[k] = aux[j];
            j++;
        }
        
        if (i < mid && j < end) {
            metrics.comparisons++;
        }
    }

    metrics.merges++;
}

// Export functions for both Node.js and browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        
        mergeSort
    };
} else if (typeof window !== 'undefined') {
    
    window.mergeSort = mergeSort;
}