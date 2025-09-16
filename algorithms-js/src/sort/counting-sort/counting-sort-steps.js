/**
 * Counting Sort - Step Tracking for Visualization
 * 
 * This file contains step-by-step tracking logic for Counting Sort visualization.
 * The pure algorithm logic is in counting-sort-core.js.
 * 
 * @see https://github.com/sachinlala/SimplifyLearning
 */

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

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        countingSortWithSteps
    };
} else if (typeof window !== 'undefined') {
    window.CountingSortSteps = {
        countingSortWithSteps
    };
    // Expose commonly used functions in global scope for demo configs
    window.countingSortWithSteps = countingSortWithSteps;
}