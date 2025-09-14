/**
 * Insertion Sort - Core Algorithm Implementation
 * 
 * Insertion Sort is an in-place, stable, and online quadratic-complexity sort algorithm 
 * that builds the final sorted array one element at a time. It is efficient for small 
 * data sets and is often used as a subroutine in hybrid algorithms.
 * 
 * Algorithm: Take each element from the unsorted portion and insert it at the 
 * appropriate position in the sorted portion, similar to sorting playing cards in hand.
 * 
 * Time Complexity: O(n²) worst/average case, O(n) best case (already sorted)
 * Space Complexity: O(1)
 * 
 * Properties: In-place, stable, online, adaptive
 * Usage: Small datasets, nearly sorted data, as subroutine in quicksort/mergesort
 * 
 * @author SimplifyLearning
 * @see https://github.com/sachinlala/SimplifyLearning
 */

/**
 * Core insertion sort algorithm
 * @param {number[]} arr - Array to be sorted
 * @param {Object} options - Options for sorting behavior
 * @returns {Object} Sorted array and metrics
 */
export function insertionSort(arr, options = {}) {
    if (!arr || arr.length <= 1) {
        return {
            sortedArray: arr || [],
            metrics: { comparisons: 0, shifts: 0, passes: 0 }
        };
    }

    // Create a copy to avoid modifying the original array
    const sortedArray = [...arr];
    const n = sortedArray.length;
    let comparisons = 0;
    let shifts = 0;

    // Insertion sort implementation
    for (let i = 1; i < n; i++) {
        const key = sortedArray[i];
        let j = i - 1;
        
        // Move elements that are greater than key one position ahead
        while (j >= 0) {
            comparisons++;
            if (sortedArray[j] > key) {
                sortedArray[j + 1] = sortedArray[j];
                shifts++;
                j--;
            } else {
                break;
            }
        }
        
        // Place key at its correct position
        sortedArray[j + 1] = key;
    }

    return {
        sortedArray,
        metrics: { comparisons, shifts, passes: n - 1 }
    };
}

/**
 * Insertion sort with step-by-step tracking for visualization
 * @param {number[]} arr - Array to be sorted
 * @returns {Object} Result with sorted array, steps, and metrics
 */
export function insertionSortWithSteps(arr) {
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

/**
 * Binary insertion sort - uses binary search to find insertion position
 * More efficient for comparison-heavy scenarios
 * @param {number[]} arr - Array to be sorted
 * @returns {Object} Sorted array and metrics
 */
export function binaryInsertionSort(arr) {
    if (!arr || arr.length <= 1) {
        return {
            sortedArray: arr || [],
            metrics: { comparisons: 0, shifts: 0, passes: 0 }
        };
    }

    const sortedArray = [...arr];
    const n = sortedArray.length;
    let comparisons = 0;
    let shifts = 0;

    for (let i = 1; i < n; i++) {
        const key = sortedArray[i];
        
        // Binary search for insertion position
        let left = 0;
        let right = i;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            comparisons++;
            
            if (sortedArray[mid] > key) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        
        // Shift elements and insert
        for (let j = i; j > left; j--) {
            sortedArray[j] = sortedArray[j - 1];
            shifts++;
        }
        
        sortedArray[left] = key;
    }

    return {
        sortedArray,
        metrics: { comparisons, shifts, passes: n - 1 }
    };
}

/**
 * Simple insertion sort function (backward compatibility)
 * @param {number[]} arr - Array to sort
 * @returns {number[]} Sorted array
 */
export function insertionSortSimple(arr) {
    const result = insertionSort(arr);
    return result.sortedArray;
}

// Browser compatibility
if (typeof window !== 'undefined') {
    window.InsertionSortCore = {
        insertionSort,
        insertionSortWithSteps,
        binaryInsertionSort,
        insertionSortSimple
    };
    // Global function for backward compatibility
    window.insertionSort = insertionSortSimple;
}