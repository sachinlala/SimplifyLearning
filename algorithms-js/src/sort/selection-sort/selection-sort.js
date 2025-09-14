/**
 * Selection Sort - Visualization and Step-by-Step Implementation
 * 
 * This file contains the visualization functions for Selection Sort algorithm.
 * The core algorithm logic is in selection-sort-core.js.
 * 
 * @author SimplifyLearning
 * @see https://github.com/sachinlala/SimplifyLearning
 */

// Core algorithm functions are loaded from selection-sort-core.js via script tag
// In browser environment, these functions are available in the global scope via window.SelectionSortCore

// For compatibility, create references to core functions if they exist
let selectionSort, selectionSortSimple;

if (typeof window !== 'undefined' && window.SelectionSortCore) {
    ({ selectionSort, selectionSortSimple } = window.SelectionSortCore);
}

/**
 * Selection sort with step-by-step tracking for visualization
 * @param {number[]} arr - Array to be sorted
 * @returns {Object} Result with sorted array, steps, and metrics
 */
export function selectionSortWithSteps(arr) {
    if (!arr || arr.length <= 1) {
        return {
            sortedArray: arr || [],
            steps: [],
            metrics: { comparisons: 0, swaps: 0, passes: 0 }
        };
    }

    const sortedArray = [...arr];
    const n = sortedArray.length;
    const steps = [];
    let comparisons = 0;
    let swaps = 0;

    // Initial state
    steps.push({
        type: 'start',
        array: [...sortedArray],
        message: 'Starting Selection Sort - finding minimum elements one by one',
        currentPass: 0,
        comparisons,
        swaps,
        sortedUpTo: 0,
        highlightIndices: []
    });

    // Selection sort with step tracking
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        steps.push({
            type: 'pass-start',
            array: [...sortedArray],
            message: `Pass ${i + 1}: Finding minimum element in unsorted portion [${i}...${n-1}]`,
            currentPass: i + 1,
            comparisons,
            swaps,
            sortedUpTo: i,
            currentPosition: i,
            minIndex: minIndex,
            highlightIndices: [i],
            unsortedRange: [i, n - 1]
        });

        // Find minimum element in remaining unsorted array
        for (let j = i + 1; j < n; j++) {
            comparisons++;
            
            steps.push({
                type: 'compare',
                array: [...sortedArray],
                message: `Comparing ${sortedArray[j]} with current minimum ${sortedArray[minIndex]} at position ${minIndex}`,
                currentPass: i + 1,
                comparisons,
                swaps,
                sortedUpTo: i,
                currentPosition: i,
                compareIndices: [j, minIndex],
                minIndex: minIndex,
                highlightIndices: [j, minIndex]
            });
            
            if (sortedArray[j] < sortedArray[minIndex]) {
                minIndex = j;
                
                steps.push({
                    type: 'new-minimum',
                    array: [...sortedArray],
                    message: `New minimum found: ${sortedArray[j]} at position ${j}`,
                    currentPass: i + 1,
                    comparisons,
                    swaps,
                    sortedUpTo: i,
                    currentPosition: i,
                    oldMinIndex: steps[steps.length - 1].minIndex,
                    minIndex: minIndex,
                    highlightIndices: [minIndex]
                });
            }
        }
        
        // Show the minimum found for this pass
        steps.push({
            type: 'minimum-found',
            array: [...sortedArray],
            message: `Minimum element ${sortedArray[minIndex]} found at position ${minIndex}`,
            currentPass: i + 1,
            comparisons,
            swaps,
            sortedUpTo: i,
            currentPosition: i,
            minIndex: minIndex,
            highlightIndices: [i, minIndex]
        });
        
        // Swap the found minimum element with the first element (if needed)
        if (minIndex !== i) {
            const temp = sortedArray[i];
            [sortedArray[i], sortedArray[minIndex]] = [sortedArray[minIndex], sortedArray[i]];
            swaps++;
            
            steps.push({
                type: 'swap',
                array: [...sortedArray],
                message: `Swapped ${sortedArray[i]} (minimum) with ${temp} at position ${i}`,
                currentPass: i + 1,
                comparisons,
                swaps,
                sortedUpTo: i + 1,
                swapIndices: [i, minIndex],
                highlightIndices: [i]
            });
        } else {
            steps.push({
                type: 'no-swap',
                array: [...sortedArray],
                message: `Minimum element ${sortedArray[i]} is already in correct position ${i}`,
                currentPass: i + 1,
                comparisons,
                swaps,
                sortedUpTo: i + 1,
                currentPosition: i,
                highlightIndices: [i]
            });
        }

        steps.push({
            type: 'pass-end',
            array: [...sortedArray],
            message: `Pass ${i + 1} complete. Element ${sortedArray[i]} is now in its final sorted position.`,
            currentPass: i + 1,
            comparisons,
            swaps,
            sortedUpTo: i + 1,
            highlightIndices: [i]
        });
    }

    // Final step
    steps.push({
        type: 'complete',
        array: [...sortedArray],
        message: `Selection Sort complete! Made ${comparisons} comparisons and ${swaps} swaps in ${n - 1} passes.`,
        comparisons,
        swaps,
        passes: n - 1,
        sortedUpTo: n,
        highlightIndices: []
    });

    return {
        sortedArray,
        steps,
        metrics: { comparisons, swaps, passes: n - 1 }
    };
}

// Browser compatibility - expose visualization functions to global scope
if (typeof window !== 'undefined') {
    window.SelectionSortVisualization = {
        selectionSortWithSteps
    };
    // Expose commonly used functions in global scope for demo configs
    window.selectionSortWithSteps = selectionSortWithSteps;
}
