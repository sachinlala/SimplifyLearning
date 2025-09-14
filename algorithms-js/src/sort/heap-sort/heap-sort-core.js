/**
 * Heap Sort - Core Implementation
 * 
 * An in-place, unstable sorting algorithm with guaranteed O(n log n) time complexity.
 * Uses a binary heap data structure to efficiently sort elements.
 * 
 * @author SimplifyLearning
 * @see https://en.wikipedia.org/wiki/Heapsort
 */

/**
 * Main heap sort function with step tracking for visualization
 * @param {Array} arr - Array to sort
 * @param {string} heapType - 'max' for max-heap (ascending sort) or 'min' for min-heap (descending sort)
 * @returns {Object} - Result object with sorted array, steps, and metrics
 */
function heapSortWithSteps(arr, heapType = 'max') {
    if (!arr || arr.length <= 1) {
        return {
            sortedArray: [...(arr || [])],
            steps: [],
            metrics: { comparisons: 0, swaps: 0, heapOperations: 0 }
        };
    }

    const steps = [];
    const metrics = { comparisons: 0, swaps: 0, heapOperations: 0 };
    const workingArray = [...arr];
    let heapSize = arr.length;

    // Add initial state
    steps.push({
        type: 'start',
        array: [...workingArray],
        message: `Let's start sorting! First, we'll organize the data into a special structure.`,
        heapSize: heapSize,
        phase: 'build-heap',
        metrics: { ...metrics }
    });

    // Phase 1: Build heap
    buildHeap(workingArray, heapSize, heapType, steps, metrics);

    // Phase 2: Extract elements from heap
    for (let i = arr.length - 1; i > 0; i--) {
        // Move current root to end
        swap(workingArray, 0, i, steps, metrics, 'extract-max', 
             `Moving ${workingArray[0]} to its final sorted position`);
        
        heapSize--;
        
        // Add step showing extraction
        steps.push({
            type: 'extract',
            array: [...workingArray],
            message: `${workingArray[i]} is now in its correct position! `,
            heapSize: heapSize,
            extractedIndex: i,
            extractedValue: workingArray[i],
            phase: 'extract',
            metrics: { ...metrics }
        });

        // Restore heap property
        heapify(workingArray, heapSize, 0, heapType, steps, metrics, 'restore-heap');
    }

    // Add final state
    steps.push({
        type: 'complete',
        array: [...workingArray],
        message: `Perfect! All elements are now sorted! 🎉`,
        heapSize: 0,
        phase: 'complete',
        metrics: { ...metrics }
    });

    return {
        sortedArray: workingArray,
        steps: steps,
        metrics: metrics
    };
}

/**
 * Build a heap from an unsorted array
 */
function buildHeap(arr, heapSize, heapType, steps, metrics) {
    // Start from the last non-leaf node and heapify each node
    for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
        steps.push({
            type: 'build-heap-step',
            array: [...arr],
            message: `Organizing elements to find the largest value`,
            heapSize: heapSize,
            currentNode: i,
            phase: 'build-heap',
            metrics: { ...metrics }
        });

        heapify(arr, heapSize, i, heapType, steps, metrics, 'build-heap');
    }

    steps.push({
        type: 'heap-built',
        array: [...arr],
        message: `Great! Now ${arr[0]} is at the top - it's the ${heapType === 'max' ? 'largest' : 'smallest'} value.`,
        heapSize: heapSize,
        phase: 'heap-built',
        metrics: { ...metrics }
    });
}

/**
 * Maintain heap property for a subtree rooted at index i
 */
function heapify(arr, heapSize, i, heapType, steps, metrics, phase) {
    let target = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    // Find the target index based on heap type
    if (heapType === 'max') {
        // For max-heap, find the largest among root, left, and right
        if (left < heapSize) {
            metrics.comparisons++;
            if (arr[left] > arr[target]) {
                target = left;
            }
        }
        if (right < heapSize) {
            metrics.comparisons++;
            if (arr[right] > arr[target]) {
                target = right;
            }
        }
    } else {
        // For min-heap, find the smallest among root, left, and right
        if (left < heapSize) {
            metrics.comparisons++;
            if (arr[left] < arr[target]) {
                target = left;
            }
        }
        if (right < heapSize) {
            metrics.comparisons++;
            if (arr[right] < arr[target]) {
                target = right;
            }
        }
    }

    // Add visualization step for heapify operation
    steps.push({
        type: 'heapify',
        array: [...arr],
        message: `Comparing values to maintain the sorted structure`,
        heapSize: heapSize,
        currentNode: i,
        leftChild: left < heapSize ? left : null,
        rightChild: right < heapSize ? right : null,
        targetNode: target,
        phase: phase,
        metrics: { ...metrics }
    });

    // If target is not the original root, swap and continue heapifying
    if (target !== i) {
        swap(arr, i, target, steps, metrics, 'heapify-swap', 
             `Swapping ${arr[i]} and ${arr[target]} to keep everything organized`);
        
        // Recursively heapify the affected subtree
        heapify(arr, heapSize, target, heapType, steps, metrics, phase);
    }

    metrics.heapOperations++;
}

/**
 * Swap two elements in the array and add visualization step
 */
function swap(arr, i, j, steps, metrics, swapType, message) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;

    metrics.swaps++;

    steps.push({
        type: 'swap',
        array: [...arr],
        message: message || `Swapped elements at indices ${i} and ${j}`,
        swapIndices: [i, j],
        swapValues: [arr[j], arr[i]], // Note: values are swapped now
        swapType: swapType,
        metrics: { ...metrics }
    });
}

/**
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
        heapSortWithSteps,
        heapSort
    };
} else if (typeof window !== 'undefined') {
    window.heapSortWithSteps = heapSortWithSteps;
    window.heapSort = heapSort;
}