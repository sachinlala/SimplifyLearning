/**
 * Insertion Sort - Visualization and Step-by-Step Implementation
 * 
 * This file contains the visualization functions for Insertion Sort algorithm.
 * The core algorithm logic is in insertion-sort-core.js.
 * 
 * @author SimplifyLearning
 * @see https://github.com/sachinlala/SimplifyLearning
 */

// Core algorithm functions are loaded from insertion-sort-core.js via script tag
// In browser environment, these functions are available in the global scope via window.InsertionSortCore

// For compatibility, create references to core functions (loaded dynamically)
// Note: Core functions are available globally via window.InsertionSortCore

// Safe dependency loading - check for core functions when needed
function ensureCoreFunctions() {
    // Core functions are available via window.InsertionSortCore when needed
    // No local variables needed since we're not using them in this file
}

/**
 * Insertion sort with step-by-step tracking for visualization
 * @param {number[]} arr - Array to be sorted
 * @returns {Object} Result with sorted array, steps, and metrics
 */
function insertionSortWithSteps(arr) {
    // Ensure core functions are available (safe late binding)
    ensureCoreFunctions();
    
    if (!arr || arr.length <= 1) {
        return {
            sortedArray: arr || [],
            steps: [],
            metrics: { comparisons: 0, shifts: 0, passes: 0 }
        };
    }

    const sortedArray = [...arr];
    const n = sortedArray.length;
    const steps = [];
    let comparisons = 0;
    let shifts = 0;

    // Initial state
    steps.push({
        type: 'start',
        array: [...sortedArray],
        message: 'Starting Insertion Sort - building sorted array one element at a time',
        currentIndex: 1,
        sortedUpTo: 1,
        comparisons,
        shifts,
        highlightIndices: [0]
    });

    // Insertion sort with step tracking
    for (let i = 1; i < n; i++) {
        const key = sortedArray[i];
        let j = i - 1;
        
        steps.push({
            type: 'pick-element',
            array: [...sortedArray],
            message: `Pass ${i}: Picking element ${key} at position ${i} to insert into sorted portion`,
            currentIndex: i,
            key: key,
            sortedUpTo: i,
            comparisons,
            shifts,
            highlightIndices: [i],
            sortedPortion: [0, i - 1]
        });

        // Track the insertion process
        let insertionComplete = false;
        
        while (j >= 0 && !insertionComplete) {
            comparisons++;
            
            steps.push({
                type: 'compare',
                array: [...sortedArray],
                message: `Comparing key ${key} with ${sortedArray[j]} at position ${j}`,
                currentIndex: i,
                key: key,
                comparePosition: j,
                sortedUpTo: i,
                comparisons,
                shifts,
                highlightIndices: [j, i],
                sortedPortion: [0, i - 1]
            });

            if (sortedArray[j] > key) {
                // Shift element to the right
                sortedArray[j + 1] = sortedArray[j];
                shifts++;
                
                steps.push({
                    type: 'shift',
                    array: [...sortedArray],
                    message: `${sortedArray[j + 1]} > ${key}, shifting ${sortedArray[j + 1]} right to position ${j + 1}`,
                    currentIndex: i,
                    key: key,
                    shiftFrom: j,
                    shiftTo: j + 1,
                    sortedUpTo: i,
                    comparisons,
                    shifts,
                    highlightIndices: [j + 1],
                    sortedPortion: [0, i - 1]
                });
                
                j--;
            } else {
                steps.push({
                    type: 'position-found',
                    array: [...sortedArray],
                    message: `${sortedArray[j]} ≤ ${key}, correct position found at ${j + 1}`,
                    currentIndex: i,
                    key: key,
                    insertPosition: j + 1,
                    sortedUpTo: i,
                    comparisons,
                    shifts,
                    highlightIndices: [j + 1],
                    sortedPortion: [0, i - 1]
                });
                insertionComplete = true;
            }
        }
        
        // Handle case where key is smallest element
        if (j < 0) {
            steps.push({
                type: 'position-found',
                array: [...sortedArray],
                message: `${key} is smaller than all elements, inserting at position 0`,
                currentIndex: i,
                key: key,
                insertPosition: 0,
                sortedUpTo: i,
                comparisons,
                shifts,
                highlightIndices: [0],
                sortedPortion: [0, i - 1]
            });
        }
        
        // Place key at its correct position
        sortedArray[j + 1] = key;
        
        steps.push({
            type: 'insert',
            array: [...sortedArray],
            message: `Inserted ${key} at position ${j + 1}. Sorted portion now: [${sortedArray.slice(0, i + 1).join(', ')}]`,
            currentIndex: i,
            key: key,
            insertPosition: j + 1,
            sortedUpTo: i + 1,
            comparisons,
            shifts,
            highlightIndices: [j + 1],
            sortedPortion: [0, i]
        });

        steps.push({
            type: 'pass-end',
            array: [...sortedArray],
            message: `Pass ${i} complete. Element ${key} is now in its correct position.`,
            currentPass: i,
            sortedUpTo: i + 1,
            comparisons,
            shifts,
            highlightIndices: [],
            sortedPortion: [0, i]
        });
    }

    // Final step
    steps.push({
        type: 'complete',
        array: [...sortedArray],
        message: `Insertion Sort complete! Made ${comparisons} comparisons and ${shifts} shifts in ${n - 1} passes.`,
        comparisons,
        shifts,
        passes: n - 1,
        sortedUpTo: n,
        highlightIndices: []
    });

    return {
        sortedArray,
        steps,
        metrics: { comparisons, shifts, passes: n - 1 }
    };
}

// Browser compatibility - expose visualization functions to global scope
if (typeof window !== 'undefined') {
    window.InsertionSortVisualization = {
        insertionSortWithSteps
    };
    // Expose commonly used functions in global scope for demo configs
    window.insertionSortWithSteps = insertionSortWithSteps;
}
