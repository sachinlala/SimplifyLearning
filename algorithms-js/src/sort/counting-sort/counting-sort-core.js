/**
 * Counting Sort - Core Algorithm Implementation
 * 
 * A stable, special-purpose integer sorting algorithm with linear time and space 
 * complexity O(n + k), where k is the range of input values (0 to k-1).
 * 
 * Inventor: Harold H. Seward
 * 
 * Time Complexity: O(n + k) where n is number of elements, k is range of input
 * Space Complexity: O(k) for the counting array
 * 
 * Note: This algorithm is efficient only when k is not significantly larger than n.
 * Works best for integers within a known, limited range.
 * 
 * @author SimplifyLearning
 * @see https://github.com/sachinlala/SimplifyLearning
 */

/**
 * Core counting sort algorithm
 * @param {number[]} arr - Array of non-negative integers to be sorted
 * @param {Object} options - Options for sorting behavior
 * @returns {Object} Sorted array and metrics
 */
function countingSort(arr, options = {}) {
    if (!arr || arr.length <= 1) {
        return {
            sortedArray: arr || [],
            metrics: { comparisons: 0, counts: 0, range: 0 }
        };
    }

    // Validate input - must be non-negative integers
    for (let i = 0; i < arr.length; i++) {
        if (!Number.isInteger(arr[i]) || arr[i] < 0) {
            throw new Error(`Counting sort requires non-negative integers. Found: ${arr[i]} at index ${i}`);
        }
    }

    // Create a copy to avoid modifying the original array
    const sortedArray = [...arr];
    const n = sortedArray.length;
    let comparisons = 0;
    let counts = 0;

    // Find the maximum value to determine range
    let maxValue = sortedArray[0];
    for (let i = 1; i < n; i++) {
        comparisons++;
        if (sortedArray[i] > maxValue) {
            maxValue = sortedArray[i];
        }
    }

    // Create counting array
    const countArray = new Array(maxValue + 1).fill(0);
    
    // Count occurrences of each value
    for (let i = 0; i < n; i++) {
        countArray[sortedArray[i]]++;
        counts++;
    }

    // Transform counts to starting positions (cumulative sum)
    for (let i = 1; i <= maxValue; i++) {
        countArray[i] += countArray[i - 1];
    }

    // Create output array
    const output = new Array(n);
    
    // Build the sorted array (stable sort - process from right to left)
    for (let i = n - 1; i >= 0; i--) {
        const value = sortedArray[i];
        output[countArray[value] - 1] = value;
        countArray[value]--;
    }

    // Copy back to sortedArray
    for (let i = 0; i < n; i++) {
        sortedArray[i] = output[i];
    }

    return {
        sortedArray,
        metrics: { 
            comparisons, 
            counts, 
            range: maxValue + 1,
            elements: n
        }
    };
}

/**
 * Counting sort with step-by-step tracking for visualization
 * @param {number[]} arr - Array of non-negative integers to be sorted
 * @returns {Object} Result with sorted array, steps, and metrics
 */
function countingSortWithSteps(arr) {
    if (!arr || arr.length <= 1) {
        return {
            sortedArray: arr || [],
            steps: [],
            metrics: { comparisons: 0, counts: 0, range: 0 }
        };
    }

    // Validate input - must be non-negative integers
    for (let i = 0; i < arr.length; i++) {
        if (!Number.isInteger(arr[i]) || arr[i] < 0) {
            throw new Error(`Counting sort requires non-negative integers. Found: ${arr[i]} at index ${i}`);
        }
    }

    const sortedArray = [...arr];
    const n = sortedArray.length;
    const steps = [];
    let comparisons = 0;
    let counts = 0;

    // Initial state
    steps.push({
        type: 'start',
        array: [...sortedArray],
        message: 'Starting Counting Sort - finding maximum value',
        phase: 'find-max',
        comparisons,
        counts,
        highlightIndices: []
    });

    // Find maximum value
    let maxValue = sortedArray[0];
    steps.push({
        type: 'find-max',
        array: [...sortedArray],
        message: `Checking maximum value: current max = ${maxValue}`,
        phase: 'find-max',
        comparisons,
        counts,
        highlightIndices: [0],
        maxValue
    });

    for (let i = 1; i < n; i++) {
        comparisons++;
        if (sortedArray[i] > maxValue) {
            maxValue = sortedArray[i];
            steps.push({
                type: 'max-update',
                array: [...sortedArray],
                message: `New maximum found: ${maxValue}`,
                phase: 'find-max',
                comparisons,
                counts,
                highlightIndices: [i],
                maxValue
            });
        } else {
            steps.push({
                type: 'max-check',
                array: [...sortedArray],
                message: `${sortedArray[i]} ≤ ${maxValue} (no update needed)`,
                phase: 'find-max',
                comparisons,
                counts,
                highlightIndices: [i],
                maxValue
            });
        }
    }

    // Create counting array
    const countArray = new Array(maxValue + 1).fill(0);
    steps.push({
        type: 'create-count-array',
        array: [...sortedArray],
        message: `Created counting array of size ${maxValue + 1} (range: 0 to ${maxValue})`,
        phase: 'count',
        comparisons,
        counts,
        countArray: [...countArray],
        maxValue,
        highlightIndices: []
    });

    // Count occurrences
    for (let i = 0; i < n; i++) {
        const value = sortedArray[i];
        countArray[value]++;
        counts++;
        steps.push({
            type: 'count-occurrence',
            array: [...sortedArray],
            message: `Found ${value} at index ${i}. Count[${value}] = ${countArray[value]}`,
            phase: 'count',
            comparisons,
            counts,
            countArray: [...countArray],
            maxValue,
            highlightIndices: [i],
            countingValue: value
        });
    }

    // Show final count array
    steps.push({
        type: 'count-complete',
        array: [...sortedArray],
        message: 'Counting phase complete. Converting counts to starting positions...',
        phase: 'cumulative',
        comparisons,
        counts,
        countArray: [...countArray],
        maxValue,
        highlightIndices: []
    });

    // Transform to cumulative counts (starting positions)
    for (let i = 1; i <= maxValue; i++) {
        const oldValue = countArray[i];
        countArray[i] += countArray[i - 1];
        steps.push({
            type: 'cumulative-sum',
            array: [...sortedArray],
            message: `Position[${i}] = ${oldValue} + ${countArray[i - 1]} = ${countArray[i]}`,
            phase: 'cumulative',
            comparisons,
            counts,
            countArray: [...countArray],
            maxValue,
            highlightIndices: [],
            cumulativeIndex: i
        });
    }

    // Create output array
    const output = new Array(n);
    steps.push({
        type: 'create-output',
        array: [...sortedArray],
        message: 'Starting to place elements in their sorted positions (processing from right to left for stability)',
        phase: 'place',
        comparisons,
        counts,
        countArray: [...countArray],
        output: [...output],
        maxValue,
        highlightIndices: []
    });

    // Build the sorted array (stable sort - process from right to left)
    for (let i = n - 1; i >= 0; i--) {
        const value = sortedArray[i];
        const position = countArray[value] - 1;
        output[position] = value;
        countArray[value]--;
        
        steps.push({
            type: 'place-element',
            array: [...sortedArray],
            message: `Placing ${value} from index ${i} to position ${position} in output array`,
            phase: 'place',
            comparisons,
            counts,
            countArray: [...countArray],
            output: [...output],
            maxValue,
            highlightIndices: [i],
            placingValue: value,
            placingPosition: position
        });
    }

    // Copy back to sortedArray
    for (let i = 0; i < n; i++) {
        sortedArray[i] = output[i];
    }

    // Final step
    steps.push({
        type: 'complete',
        array: [...sortedArray],
        message: `Counting Sort complete! Sorted array in O(n + k) time where n=${n}, k=${maxValue + 1}`,
        phase: 'complete',
        comparisons,
        counts,
        countArray: [...countArray],
        output: [...output],
        maxValue,
        highlightIndices: []
    });

    return {
        sortedArray,
        steps,
        metrics: { 
            comparisons, 
            counts, 
            range: maxValue + 1,
            elements: n
        }
    };
}

/**
 * Simple counting sort function (backward compatibility)
 * @param {number[]} arr - Array of non-negative integers to sort
 * @returns {number[]} Sorted array
 */
function countingSortSimple(arr) {
    const result = countingSort(arr);
    return result.sortedArray;
}

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        countingSort,
        countingSortWithSteps,
        countingSortSimple
    };
} else if (typeof window !== 'undefined') {
    window.CountingSortCore = {
        countingSort,
        countingSortWithSteps,
        countingSortSimple
    };
    // Expose commonly used functions in global scope for demo configs
    window.countingSortWithSteps = countingSortWithSteps;
    // Backward compatibility
    window.countingSort = countingSortSimple;
}