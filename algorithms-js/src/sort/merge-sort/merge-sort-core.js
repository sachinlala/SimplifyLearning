/**
 * Merge Sort - Core Implementation
 * 
 * A stable, divide-and-conquer sorting algorithm with guaranteed O(n log n) time complexity.
 * Uses O(n) extra space for auxiliary arrays during the merge process.
 * 
 * Invented by John von Neumann in 1945.
 * 
 * @author SimplifyLearning
 * @see https://en.wikipedia.org/wiki/Merge_sort
 */

/**
 * Main merge sort function with step tracking for visualization
 * @param {Array} arr - Array to sort
 * @returns {Object} - Result object with sorted array, steps, and metrics
 */
function mergeSortWithSteps(arr) {
    if (!arr || arr.length <= 1) {
        return {
            sortedArray: [...(arr || [])],
            steps: [],
            metrics: { comparisons: 0, merges: 0, recursiveDepth: 0 }
        };
    }

    const steps = [];
    const metrics = { comparisons: 0, merges: 0, recursiveDepth: 0 };
    const originalArray = [...arr];
    const workingArray = [...arr];
    const aux = new Array(arr.length);

    // Add initial state
    steps.push({
        type: 'start',
        array: [...workingArray],
        message: `Starting merge sort with array of ${arr.length} elements`,
        subArrays: [],
        depth: 0,
        metrics: { ...metrics }
    });

    topDownMergeSort(workingArray, 0, arr.length, aux, steps, metrics, 0);

    // Add final state
    steps.push({
        type: 'complete',
        array: [...workingArray],
        message: `Merge sort completed! Total comparisons: ${metrics.comparisons}, Total merges: ${metrics.merges}`,
        subArrays: [],
        depth: 0,
        metrics: { ...metrics }
    });

    return {
        sortedArray: workingArray,
        steps: steps,
        metrics: metrics
    };
}

/**
 * Top-down merge sort implementation (recursive)
 * @param {Array} arr - Array to sort
 * @param {number} start - Start index (inclusive)
 * @param {number} end - End index (exclusive)
 * @param {Array} aux - Auxiliary array
 * @param {Array} steps - Steps array for visualization
 * @param {Object} metrics - Metrics object
 * @param {number} depth - Current recursion depth
 */
function topDownMergeSort(arr, start, end, aux, steps, metrics, depth) {
    if (end - start < 2) {
        return; // Base case: single element or empty
    }

    metrics.recursiveDepth = Math.max(metrics.recursiveDepth, depth);
    const mid = Math.floor((start + end) / 2);

    // Add step showing the divide phase
    steps.push({
        type: 'divide',
        array: [...arr],
        message: `Dividing array[${start}...${end-1}] into left[${start}...${mid-1}] and right[${mid}...${end-1}]`,
        subArrays: [
            { start, end: mid, type: 'left', color: 'blue' },
            { start: mid, end, type: 'right', color: 'green' }
        ],
        divideRange: [start, end-1],
        depth: depth,
        metrics: { ...metrics }
    });

    // Recursively sort left and right halves
    topDownMergeSort(arr, start, mid, aux, steps, metrics, depth + 1);
    topDownMergeSort(arr, mid, end, aux, steps, metrics, depth + 1);

    // Merge the two sorted halves
    merge(arr, start, mid, end, aux, steps, metrics, depth);
}

/**
 * Merge two sorted sub-arrays
 * @param {Array} arr - Main array
 * @param {number} start - Start of first sub-array
 * @param {number} mid - Start of second sub-array
 * @param {number} end - End of second sub-array (exclusive)
 * @param {Array} aux - Auxiliary array
 * @param {Array} steps - Steps array for visualization
 * @param {Object} metrics - Metrics object
 * @param {number} depth - Current depth
 */
function merge(arr, start, mid, end, aux, steps, metrics, depth) {
    // Copy to auxiliary array
    for (let k = start; k < end; k++) {
        aux[k] = arr[k];
    }

    let i = start;  // Left sub-array pointer
    let j = mid;    // Right sub-array pointer
    
    // Add step showing merge start
    steps.push({
        type: 'merge-start',
        array: [...arr],
        message: `Merging left[${start}...${mid-1}] and right[${mid}...${end-1}]`,
        subArrays: [
            { start, end: mid, type: 'left', color: 'blue' },
            { start: mid, end, type: 'right', color: 'green' }
        ],
        mergeRange: [start, end-1],
        pointers: { left: i, right: j },
        depth: depth,
        metrics: { ...metrics }
    });

    // Merge process
    for (let k = start; k < end; k++) {
        if (i < mid && (j >= end || aux[i] <= aux[j])) {
            // Take from left sub-array
            arr[k] = aux[i];
            
            steps.push({
                type: 'merge-step',
                array: [...arr],
                message: `Comparing ${aux[i]} (left) ≤ ${j >= end ? 'end' : aux[j]} (right): taking ${aux[i]}`,
                subArrays: [
                    { start, end: mid, type: 'left', color: 'blue' },
                    { start: mid, end, type: 'right', color: 'green' }
                ],
                mergeRange: [start, end-1],
                pointers: { left: i, right: j },
                takenFrom: 'left',
                takenValue: aux[i],
                targetIndex: k,
                depth: depth,
                metrics: { ...metrics }
            });
            
            i++;
        } else {
            // Take from right sub-array
            arr[k] = aux[j];
            
            steps.push({
                type: 'merge-step',
                array: [...arr],
                message: `Comparing ${i >= mid ? 'end' : aux[i]} (left) > ${aux[j]} (right): taking ${aux[j]}`,
                subArrays: [
                    { start, end: mid, type: 'left', color: 'blue' },
                    { start: mid, end, type: 'right', color: 'green' }
                ],
                mergeRange: [start, end-1],
                pointers: { left: i, right: j },
                takenFrom: 'right',
                takenValue: aux[j],
                targetIndex: k,
                depth: depth,
                metrics: { ...metrics }
            });
            
            j++;
        }
        
        if (i < mid && j < end) {
            metrics.comparisons++;
        }
    }

    metrics.merges++;
    
    // Add step showing merge completion
    steps.push({
        type: 'merge-complete',
        array: [...arr],
        message: `Merge complete for range[${start}...${end-1}]. Result: [${arr.slice(start, end).join(', ')}]`,
        subArrays: [
            { start, end, type: 'merged', color: 'purple' }
        ],
        mergeRange: [start, end-1],
        depth: depth,
        metrics: { ...metrics }
    });
}

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
        mergeSortWithSteps,
        mergeSort
    };
} else if (typeof window !== 'undefined') {
    window.mergeSortWithSteps = mergeSortWithSteps;
    window.mergeSort = mergeSort;
}