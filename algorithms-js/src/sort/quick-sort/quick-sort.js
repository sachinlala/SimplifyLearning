/**
 * Quick Sort - Core Algorithm Implementation
 * 
 * Quick Sort is a highly efficient divide-and-conquer sorting algorithm that works by 
 * selecting a 'pivot' element and partitioning the array around it, then recursively 
 * sorting the sub-arrays.
 * 
 * Algorithm: Choose a pivot, partition array so elements < pivot are on left, 
 * elements > pivot are on right, then recursively sort both sides.
 * 
 * Time Complexity: O(n log n) average, O(n²) worst case
 * Space Complexity: O(log n) average (recursion stack), O(n) worst case
 * 
 * Properties: In-place, not stable, divide-and-conquer
 * Inventor: Tony Hoare (1960)
 * 
 * @author SimplifyLearning
 * @see https://github.com/sachinlala/SimplifyLearning
 */

/**
 * Core quick sort algorithm with configurable pivot selection
 * @param {number[]} arr - Array to be sorted
 * @param {Object} options - Options for sorting behavior
 * @returns {Object} Sorted array and metrics
 */
export function quickSort(arr, options = {}) {
    if (!arr || arr.length <= 1) {
        return {
            sortedArray: arr || [],
            metrics: { comparisons: 0, swaps: 0, recursiveDepth: 0, partitions: 0 }
        };
    }

    // Create a copy to avoid modifying the original array
    const sortedArray = [...arr];
    const metrics = { comparisons: 0, swaps: 0, recursiveDepth: 0, partitions: 0 };
    const pivotStrategy = options.pivotStrategy || 'median-of-three';

    /**
     * Partition function - core of QuickSort
     * Places pivot in correct position and returns its index
     */
    function partition(array, low, high) {
        metrics.partitions++;
        
        // Choose pivot based on strategy
        let pivotIndex;
        switch (pivotStrategy) {
            case 'first':
                pivotIndex = low;
                break;
            case 'last':
                pivotIndex = high;
                break;
            case 'random':
                pivotIndex = Math.floor(Math.random() * (high - low + 1)) + low;
                break;
            case 'median-of-three':
            default:
                pivotIndex = medianOfThree(array, low, high);
                break;
        }
        
        // Move pivot to end for partitioning
        if (pivotIndex !== high) {
            [array[pivotIndex], array[high]] = [array[high], array[pivotIndex]];
            metrics.swaps++;
        }
        
        const pivot = array[high];
        let i = low - 1; // Index of smaller element
        
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
        
        // Place pivot in correct position
        if (i + 1 !== high) {
            [array[i + 1], array[high]] = [array[high], array[i + 1]];
            metrics.swaps++;
        }
        
        return i + 1;
    }
    
    /**
     * Median-of-three pivot selection
     */
    function medianOfThree(array, low, high) {
        const mid = Math.floor((low + high) / 2);
        
        metrics.comparisons += 3;
        
        if (array[mid] < array[low]) {
            [array[low], array[mid]] = [array[mid], array[low]];
            metrics.swaps++;
        }
        if (array[high] < array[low]) {
            [array[low], array[high]] = [array[high], array[low]];
            metrics.swaps++;
        }
        if (array[high] < array[mid]) {
            [array[mid], array[high]] = [array[high], array[mid]];
            metrics.swaps++;
        }
        
        return mid;
    }
    
    /**
     * Recursive QuickSort function
     */
    function quickSortRecursive(array, low, high, depth = 0) {
        metrics.recursiveDepth = Math.max(metrics.recursiveDepth, depth);
        
        if (low < high) {
            const pivotIndex = partition(array, low, high);
            
            // Recursively sort elements before and after partition
            quickSortRecursive(array, low, pivotIndex - 1, depth + 1);
            quickSortRecursive(array, pivotIndex + 1, high, depth + 1);
        }
    }
    
    // Start the recursive sorting
    quickSortRecursive(sortedArray, 0, sortedArray.length - 1);
    
    return {
        sortedArray,
        metrics,
        pivotStrategy
    };
}

/**
 * Quick sort with step-by-step tracking for visualization
 * @param {number[]} arr - Array to be sorted
 * @param {Object} options - Options including pivot strategy
 * @returns {Object} Result with sorted array, steps, and metrics
 */
export function quickSortWithSteps(arr, options = {}) {
    if (!arr || arr.length <= 1) {
        return {
            sortedArray: arr || [],
            steps: [],
            metrics: { comparisons: 0, swaps: 0, recursiveDepth: 0, partitions: 0 }
        };
    }

    const sortedArray = [...arr];
    const steps = [];
    const metrics = { comparisons: 0, swaps: 0, recursiveDepth: 0, partitions: 0 };
    const pivotStrategy = options.pivotStrategy || 'median-of-three';
    
    // Initial state
    steps.push({
        type: 'start',
        array: [...sortedArray],
        message: `Starting QuickSort with ${pivotStrategy} pivot selection`,
        range: [0, sortedArray.length - 1],
        depth: 0,
        metrics: {...metrics}
    });
    
    /**
     * Partition with step tracking
     */
    function partitionWithSteps(array, low, high, depth) {
        metrics.partitions++;
        
        steps.push({
            type: 'partition-start',
            array: [...array],
            message: `Partitioning range [${low}...${high}]`,
            range: [low, high],
            depth,
            metrics: {...metrics}
        });
        
        // Choose and highlight pivot
        let pivotIndex;
        switch (pivotStrategy) {
            case 'first':
                pivotIndex = low;
                break;
            case 'last':
                pivotIndex = high;
                break;
            case 'random':
                pivotIndex = Math.floor(Math.random() * (high - low + 1)) + low;
                break;
            case 'median-of-three':
            default:
                pivotIndex = medianOfThreeWithSteps(array, low, high, depth);
                break;
        }
        
        // Move pivot to end
        if (pivotIndex !== high) {
            [array[pivotIndex], array[high]] = [array[high], array[pivotIndex]];
            metrics.swaps++;
            
            steps.push({
                type: 'pivot-move',
                array: [...array],
                message: `Moving pivot ${array[high]} from position ${pivotIndex} to end (${high})`,
                range: [low, high],
                pivotIndex: high,
                swapIndices: [pivotIndex, high],
                depth,
                metrics: {...metrics}
            });
        }
        
        const pivot = array[high];
        let i = low - 1;
        
        steps.push({
            type: 'pivot-selected',
            array: [...array],
            message: `Pivot selected: ${pivot} at position ${high}. Partitioning...`,
            range: [low, high],
            pivotIndex: high,
            pivotValue: pivot,
            depth,
            metrics: {...metrics}
        });
        
        // Partition process
        for (let j = low; j < high; j++) {
            metrics.comparisons++;
            
            steps.push({
                type: 'compare',
                array: [...array],
                message: `Comparing ${array[j]} with pivot ${pivot}`,
                range: [low, high],
                compareIndices: [j, high],
                pivotIndex: high,
                currentJ: j,
                currentI: i,
                depth,
                metrics: {...metrics}
            });
            
            if (array[j] <= pivot) {
                i++;
                if (i !== j) {
                    [array[i], array[j]] = [array[j], array[i]];
                    metrics.swaps++;
                    
                    steps.push({
                        type: 'swap',
                        array: [...array],
                        message: `${array[i]} ≤ ${pivot}, swapping positions ${i} and ${j}`,
                        range: [low, high],
                        swapIndices: [i, j],
                        pivotIndex: high,
                        currentI: i,
                        depth,
                        metrics: {...metrics}
                    });
                } else {
                    steps.push({
                        type: 'no-swap',
                        array: [...array],
                        message: `${array[j]} ≤ ${pivot}, already in correct relative position`,
                        range: [low, high],
                        pivotIndex: high,
                        currentI: i,
                        depth,
                        metrics: {...metrics}
                    });
                }
            }
        }
        
        // Place pivot in correct position
        const finalPivotPos = i + 1;
        if (finalPivotPos !== high) {
            [array[finalPivotPos], array[high]] = [array[high], array[finalPivotPos]];
            metrics.swaps++;
        }
        
        steps.push({
            type: 'pivot-final',
            array: [...array],
            message: `Pivot ${pivot} placed at final position ${finalPivotPos}`,
            range: [low, high],
            pivotFinalIndex: finalPivotPos,
            leftPartition: [low, finalPivotPos - 1],
            rightPartition: [finalPivotPos + 1, high],
            depth,
            metrics: {...metrics}
        });
        
        return finalPivotPos;
    }
    
    function medianOfThreeWithSteps(array, low, high, depth) {
        const mid = Math.floor((low + high) / 2);
        
        steps.push({
            type: 'median-of-three',
            array: [...array],
            message: `Finding median of three: positions ${low}, ${mid}, ${high}`,
            range: [low, high],
            medianIndices: [low, mid, high],
            depth,
            metrics: {...metrics}
        });
        
        metrics.comparisons += 3;
        
        if (array[mid] < array[low]) {
            [array[low], array[mid]] = [array[mid], array[low]];
            metrics.swaps++;
        }
        if (array[high] < array[low]) {
            [array[low], array[high]] = [array[high], array[low]];
            metrics.swaps++;
        }
        if (array[high] < array[mid]) {
            [array[mid], array[high]] = [array[high], array[mid]];
            metrics.swaps++;
        }
        
        steps.push({
            type: 'median-selected',
            array: [...array],
            message: `Median of three selected: ${array[mid]} at position ${mid}`,
            range: [low, high],
            pivotIndex: mid,
            depth,
            metrics: {...metrics}
        });
        
        return mid;
    }
    
    /**
     * Recursive QuickSort with step tracking
     */
    function quickSortRecursiveWithSteps(array, low, high, depth = 0) {
        metrics.recursiveDepth = Math.max(metrics.recursiveDepth, depth);
        
        if (low < high) {
            steps.push({
                type: 'recursive-call',
                array: [...array],
                message: `Recursive call: sorting range [${low}...${high}] at depth ${depth}`,
                range: [low, high],
                depth,
                metrics: {...metrics}
            });
            
            const pivotIndex = partitionWithSteps(array, low, high, depth);
            
            // Recursively sort both sides
            if (low < pivotIndex - 1) {
                quickSortRecursiveWithSteps(array, low, pivotIndex - 1, depth + 1);
            }
            if (pivotIndex + 1 < high) {
                quickSortRecursiveWithSteps(array, pivotIndex + 1, high, depth + 1);
            }
            
            steps.push({
                type: 'range-complete',
                array: [...array],
                message: `Range [${low}...${high}] is now sorted`,
                range: [low, high],
                depth,
                metrics: {...metrics}
            });
        }
    }
    
    // Start the recursive sorting with step tracking
    quickSortRecursiveWithSteps(sortedArray, 0, sortedArray.length - 1);
    
    // Final step
    steps.push({
        type: 'complete',
        array: [...sortedArray],
        message: `QuickSort complete! Made ${metrics.comparisons} comparisons, ${metrics.swaps} swaps, ${metrics.partitions} partitions. Max recursion depth: ${metrics.recursiveDepth}`,
        metrics: {...metrics}
    });

    return {
        sortedArray,
        steps,
        metrics,
        pivotStrategy
    };
}

/**
 * Iterative QuickSort implementation (avoids recursion stack overflow)
 * @param {number[]} arr - Array to be sorted
 * @returns {Object} Sorted array and metrics
 */
export function quickSortIterative(arr) {
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
export function quickSortSimple(arr) {
    const result = quickSort(arr);
    return result.sortedArray;
}

// Browser compatibility
if (typeof window !== 'undefined') {
    window.QuickSortCore = {
        quickSort,
        quickSortWithSteps,
        quickSortIterative,
        quickSortSimple
    };
    // Global function for backward compatibility
    window.quickSort = quickSortSimple;
}