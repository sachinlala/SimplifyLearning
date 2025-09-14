/**
 * Quick Sort - Core Algorithm Implementation
 * 
 * Quick Sort is a highly efficient divide-and-conquer sorting algorithm that works 
 * by selecting a 'pivot' element from the array and partitioning the other elements 
 * into two sub-arrays according to whether they are less than or greater than the pivot.
 * 
 * Algorithm: Choose pivot, partition around it, recursively sort sub-arrays
 * 
 * Time Complexity: O(n²) worst case, O(n log n) average/best case
 * Space Complexity: O(log n) average, O(n) worst case for recursion stack
 * 
 * Properties: In-place, not stable, divide-and-conquer
 * Usage: General purpose, excellent average case performance
 * 
 * @author SimplifyLearning
 * @see https://github.com/sachinlala/SimplifyLearning
 */

/**
 * Swap elements at two positions in array
 */
function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

/**
 * Choose pivot using different strategies
 */
function choosePivot(arr, low, high, strategy = 'last') {
    switch (strategy) {
        case 'first':
            return low;
        case 'random':
            return Math.floor(Math.random() * (high - low + 1)) + low;
        case 'median-of-three':
            const mid = Math.floor((low + high) / 2);
            const first = arr[low];
            const middle = arr[mid];
            const last = arr[high];
            
            if ((first >= middle && first <= last) || (first >= last && first <= middle)) {
                return low;
            } else if ((middle >= first && middle <= last) || (middle >= last && middle <= first)) {
                return mid;
            } else {
                return high;
            }
        case 'last':
        default:
            return high;
    }
}

/**
 * Partition function - Lomuto scheme
 */
function partition(arr, low, high, metrics, strategy = 'last') {
    const pivotIndex = choosePivot(arr, low, high, strategy);
    
    // Move pivot to end if not already there
    if (pivotIndex !== high) {
        swap(arr, pivotIndex, high);
        metrics.swaps++;
    }
    
    const pivot = arr[high];
    let i = low - 1; // Index of smaller element
    
    for (let j = low; j < high; j++) {
        metrics.comparisons++;
        if (arr[j] <= pivot) {
            i++;
            if (i !== j) {
                swap(arr, i, j);
                metrics.swaps++;
            }
        }
    }
    
    // Place pivot in correct position
    if (i + 1 !== high) {
        swap(arr, i + 1, high);
        metrics.swaps++;
    }
    
    metrics.partitions++;
    return i + 1; // Return pivot position
}

/**
 * Core quicksort algorithm
 * @param {number[]} arr - Array to be sorted
 * @param {Object} options - Options for sorting behavior
 * @returns {Object} Sorted array and metrics
 */
function quickSort(arr, options = {}) {
    if (!arr || arr.length <= 1) {
        return {
            sortedArray: arr || [],
            metrics: { comparisons: 0, swaps: 0, partitions: 0, recursiveDepth: 0 }
        };
    }

    const sortedArray = [...arr];
    const metrics = { comparisons: 0, swaps: 0, partitions: 0, recursiveDepth: 0 };
    const { pivotStrategy = 'last' } = options;
    
    function quickSortRecursive(low, high, depth = 0) {
        metrics.recursiveDepth = Math.max(metrics.recursiveDepth, depth);
        
        if (low < high) {
            const pi = partition(sortedArray, low, high, metrics, pivotStrategy);
            
            // Recursively sort elements before and after partition
            quickSortRecursive(low, pi - 1, depth + 1);
            quickSortRecursive(pi + 1, high, depth + 1);
        }
    }
    
    quickSortRecursive(0, sortedArray.length - 1);
    
    return {
        sortedArray,
        metrics,
        pivotStrategy
    };
}

/**
 * Iterative QuickSort implementation (avoids recursion stack overflow)
 * @param {number[]} arr - Array to be sorted
 * @returns {Object} Sorted array and metrics
 */
function quickSortIterative(arr) {
    if (!arr || arr.length <= 1) {
        return {
            sortedArray: arr || [],
            metrics: { comparisons: 0, swaps: 0, stackSize: 0, partitions: 0 }
        };
    }

    const sortedArray = [...arr];
    const metrics = { comparisons: 0, swaps: 0, stackSize: 0, partitions: 0 };
    const stack = [];
    
    // Push initial range
    stack.push({ low: 0, high: sortedArray.length - 1 });
    metrics.stackSize = Math.max(metrics.stackSize, stack.length);
    
    while (stack.length > 0) {
        const { low, high } = stack.pop();
        
        if (low < high) {
            const pivotIndex = partitionSimple(sortedArray, low, high, metrics);
            
            // Push sub-arrays to stack (smaller first for better performance)
            if (pivotIndex - 1 - low < high - (pivotIndex + 1)) {
                if (pivotIndex + 1 < high) {
                    stack.push({ low: pivotIndex + 1, high });
                }
                if (low < pivotIndex - 1) {
                    stack.push({ low, high: pivotIndex - 1 });
                }
            } else {
                if (low < pivotIndex - 1) {
                    stack.push({ low, high: pivotIndex - 1 });
                }
                if (pivotIndex + 1 < high) {
                    stack.push({ low: pivotIndex + 1, high });
                }
            }
            
            metrics.stackSize = Math.max(metrics.stackSize, stack.length);
        }
    }
    
    return {
        sortedArray,
        metrics
    };
}

/**
 * Simple partition function for iterative version
 */
function partitionSimple(array, low, high, metrics) {
    metrics.partitions++;
    const pivot = array[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        metrics.comparisons++;
        if (array[j] <= pivot) {
            i++;
            if (i !== j) {
                [array[i], array[j]] = [array[j], array[i]];
                metrics.swaps++;
            }
        }
    }
    
    if (i + 1 !== high) {
        [array[i + 1], array[high]] = [array[high], array[i + 1]];
        metrics.swaps++;
    }
    
    return i + 1;
}

/**
 * Simple quick sort function (backward compatibility)
 * @param {number[]} arr - Array to sort
 * @returns {number[]} Sorted array
 */
function quickSortSimple(arr) {
    const result = quickSort(arr);
    return result.sortedArray;
}

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        quickSort,
        quickSortIterative,
        quickSortSimple
    };
} else if (typeof window !== 'undefined') {
    window.QuickSortCore = {
        quickSort,
        quickSortIterative,
        quickSortSimple
    };
    // Expose commonly used functions for configs
    window.quickSortIterative = quickSortIterative;
    // Global function for backward compatibility
    window.quickSort = quickSortSimple;
}
