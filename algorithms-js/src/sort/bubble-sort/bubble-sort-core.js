/**
 * Bubble Sort - Core Algorithm Implementation
 * 
 * Bubble Sort is a simple sorting algorithm that repeatedly steps through the list,
 * compares adjacent elements and swaps them if they are in the wrong order.
 * The pass through the list is repeated until the list is sorted.
 * 
 * Time Complexity: O(n²) in worst and average case, O(n) in best case
 * Space Complexity: O(1)
 * 
 * @author SimplifyLearning
 * @see https://github.com/sachinlala/SimplifyLearning
 */

/**
 * Core bubble sort algorithm
 * @param {number[]} arr - Array to be sorted
 * @param {Object} options - Options for sorting behavior
 * @returns {Object} Sorted array and metrics
 */
export function bubbleSort(arr, options = {}) {
    if (!arr || arr.length <= 1) {
        return {
            sortedArray: arr || [],
            metrics: { comparisons: 0, swaps: 0, passes: 0 }
        };
    }

    // Create a copy to avoid modifying the original array
    const sortedArray = [...arr];
    const n = sortedArray.length;
    let comparisons = 0;
    let swaps = 0;
    let passes = 0;

    // Bubble sort implementation
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        passes++;
        
        for (let j = 0; j < n - i - 1; j++) {
            comparisons++;
            
            if (sortedArray[j] > sortedArray[j + 1]) {
                // Swap elements
                [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
                swaps++;
                swapped = true;
            }
        }
        
        // Early termination if no swaps were made
        if (!swapped) {
            break;
        }
    }

    return {
        sortedArray,
        metrics: { comparisons, swaps, passes }
    };
}

/**
 * Bubble sort with step-by-step tracking for visualization
 * @param {number[]} arr - Array to be sorted
 * @returns {Object} Result with sorted array, steps, and metrics
 */
export function bubbleSortWithSteps(arr) {
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
    let passes = 0;

    // Initial state
    steps.push({
        type: 'start',
        array: [...sortedArray],
        message: 'Starting Bubble Sort',
        currentPass: 0,
        comparisons,
        swaps,
        highlightIndices: []
    });

    // Bubble sort with step tracking
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        passes++;
        
        steps.push({
            type: 'pass-start',
            array: [...sortedArray],
            message: `Pass ${i + 1}: Finding the ${getOrdinal(n - i)} largest element`,
            currentPass: i + 1,
            comparisons,
            swaps,
            sortedUpTo: n - i,
            highlightIndices: []
        });

        for (let j = 0; j < n - i - 1; j++) {
            comparisons++;
            
            // Comparison step
            steps.push({
                type: 'compare',
                array: [...sortedArray],
                message: `Comparing ${sortedArray[j]} and ${sortedArray[j + 1]}`,
                currentPass: i + 1,
                comparisons,
                swaps,
                compareIndices: [j, j + 1],
                highlightIndices: [j, j + 1]
            });

            if (sortedArray[j] > sortedArray[j + 1]) {
                // Swap elements
                [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
                swaps++;
                swapped = true;

                // Swap step
                steps.push({
                    type: 'swap',
                    array: [...sortedArray],
                    message: `Swapped ${sortedArray[j + 1]} and ${sortedArray[j]} (now in positions ${j + 1} and ${j})`,
                    currentPass: i + 1,
                    comparisons,
                    swaps,
                    swapIndices: [j, j + 1],
                    highlightIndices: [j, j + 1]
                });
            } else {
                // No swap step
                steps.push({
                    type: 'no-swap',
                    array: [...sortedArray],
                    message: `No swap needed - ${sortedArray[j]} ≤ ${sortedArray[j + 1]}`,
                    currentPass: i + 1,
                    comparisons,
                    swaps,
                    compareIndices: [j, j + 1],
                    highlightIndices: []
                });
            }
        }

        // Pass end step
        steps.push({
            type: 'pass-end',
            array: [...sortedArray],
            message: swapped 
                ? `Pass ${i + 1} complete. Element ${sortedArray[n - i - 1]} is in its final position.`
                : `Pass ${i + 1} complete. No swaps made - array is sorted!`,
            currentPass: i + 1,
            comparisons,
            swaps,
            sortedUpTo: n - i - 1,
            highlightIndices: [n - i - 1]
        });

        // Early termination if no swaps were made
        if (!swapped) {
            steps.push({
                type: 'early-termination',
                array: [...sortedArray],
                message: 'Array is already sorted. Terminating early.',
                currentPass: i + 1,
                comparisons,
                swaps,
                highlightIndices: []
            });
            break;
        }
    }

    // Final step
    steps.push({
        type: 'complete',
        array: [...sortedArray],
        message: `Bubble Sort complete! Made ${comparisons} comparisons and ${swaps} swaps in ${passes} passes.`,
        currentPass: passes,
        comparisons,
        swaps,
        highlightIndices: []
    });

    return {
        sortedArray,
        steps,
        metrics: { comparisons, swaps, passes }
    };
}

/**
 * Convert number to ordinal (1st, 2nd, 3rd, etc.)
 * @param {number} num - Number to convert
 * @returns {string} Ordinal string
 */
function getOrdinal(num) {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = num % 100;
    return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}

/**
 * Simple bubble sort function (backward compatibility)
 * @param {number[]} arr - Array to sort
 * @returns {number[]} Sorted array
 */
export function bubbleSortSimple(arr) {
    const result = bubbleSort(arr);
    return result.sortedArray;
}

// Browser compatibility
if (typeof window !== 'undefined') {
    window.BubbleSortCore = {
        bubbleSort,
        bubbleSortWithSteps,
        bubbleSortSimple
    };
    // Expose commonly used functions in global scope for demo configs
    window.bubbleSortWithSteps = bubbleSortWithSteps;
    // Backward compatibility
    window.bubbleSort = bubbleSortSimple;
}
