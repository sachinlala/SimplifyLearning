/**
 * Quick Sort - Visualization and Step-by-Step Implementation
 * 
 * This file contains the visualization functions for Quick Sort algorithm.
 * The core algorithm logic is in quick-sort-core.js.
 * 
 * @author SimplifyLearning
 * @see https://github.com/sachinlala/SimplifyLearning
 */

// Core algorithm functions are loaded from quick-sort-core.js via script tag
// In browser environment, these functions are available in the global scope via window.QuickSortCore

// For compatibility, create references to core functions (loaded dynamically)
// Note: Core functions are available globally via window.QuickSortCore

// Safe dependency loading - check for core functions when needed
function ensureCoreFunctions() {
    // Core functions are available via window.QuickSortCore when needed
    // No local variables needed since we're not using them in this file
}

/**
 * Quick sort with step-by-step tracking for visualization
 * @param {number[]} arr - Array to be sorted
 * @param {Object} options - Options including pivot strategy
 * @returns {Object} Result with sorted array, steps, and metrics
 */
function quickSortWithSteps(arr, options = {}) {
    // Ensure core functions are available (safe late binding)
    ensureCoreFunctions();
    
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

// Browser compatibility - expose visualization functions to global scope
if (typeof window !== 'undefined') {
    window.QuickSortVisualization = {
        quickSortWithSteps
    };
    // Expose commonly used functions in global scope for demo configs
    window.quickSortWithSteps = quickSortWithSteps;
}