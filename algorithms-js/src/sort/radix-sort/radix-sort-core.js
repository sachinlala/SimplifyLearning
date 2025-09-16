/**
 * Radix Sort - Core Algorithm Implementation
 * 
 * A stable, non-comparison based integer sorting algorithm that works by processing
 * individual digits. Uses counting sort as a subroutine to sort the digits.
 * 
 * Time Complexity: O((n + k) * d) where n = elements, k = range (radix), d = digits
 * Space Complexity: O(n + k) for the counting and output arrays
 * 
 * Based on Counting Sort but processes each digit position separately from least
 * significant digit (LSD) to most significant digit (MSD).
 * 
 * @author SimplifyLearning
 * @see https://github.com/sachinlala/SimplifyLearning
 */

// Constants
const DECIMAL_RADIX = 10;

/**
 * Core radix sort algorithm
 * @param {number[]} arr - Array of non-negative integers to be sorted
 * @param {Object} options - Options for sorting behavior
 * @returns {Object} Sorted array and metrics
 */
function radixSort(arr, options = {}) {
    if (!arr || arr.length === 0) {
        return {
            sortedArray: arr || [],
            metrics: { comparisons: 0, countingSorts: 0, digits: 0, maxValue: 0 }
        };
    }

    // Validate input - must be non-negative integers
    for (let i = 0; i < arr.length; i++) {
        if (!Number.isInteger(arr[i]) || arr[i] < 0) {
            throw new Error(`Radix sort requires non-negative integers. Found: ${arr[i]} at index ${i}`);
        }
    }

    // Create a copy to avoid modifying the original array
    const sortedArray = [...arr];
    const n = sortedArray.length;
    let comparisons = 0;
    let countingSorts = 0;

    // Find the maximum value to determine number of digits
    let maxValue = sortedArray[0];
    for (let i = 1; i < n; i++) {
        comparisons++;
        if (sortedArray[i] > maxValue) {
            maxValue = sortedArray[i];
        }
    }

    // Count digits in maximum value  
    const digits = maxValue === 0 ? 1 : Math.floor(Math.log10(maxValue)) + 1;
    const originalMaxValue = maxValue;

    // Perform counting sort for each digit position
    for (let digitPlace = 1; maxValue > 0; digitPlace *= DECIMAL_RADIX, maxValue = Math.floor(maxValue / DECIMAL_RADIX)) {
        countingSort(sortedArray, digitPlace);
        countingSorts++;
    }
    
    // Handle edge case where maxValue is 0 (array of zeros) - still need one pass
    if (originalMaxValue === 0) {
        countingSort(sortedArray, 1);
        countingSorts = 1;
    }

    return {
        sortedArray,
        metrics: { 
            comparisons, 
            countingSorts, 
            digits,
            maxValue: originalMaxValue
        }
    };
}

/**
 * Counting sort subroutine for radix sort
 * @param {number[]} arr - Array to sort by specific digit
 * @param {number} digitPlace - Current digit position (1, 10, 100, etc.)
 */
function countingSort(arr, digitPlace) {
    const n = arr.length;
    const output = new Array(n);
    const count = new Array(DECIMAL_RADIX).fill(0);

    // Count occurrences of each digit (0-9)
    for (let i = 0; i < n; i++) {
        const digit = Math.floor(arr[i] / digitPlace) % DECIMAL_RADIX;
        count[digit]++;
    }

    // Transform count array to position array
    for (let i = 1; i < DECIMAL_RADIX; i++) {
        count[i] += count[i - 1];
    }

    // Build output array in reverse order to maintain stability
    for (let i = n - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / digitPlace) % DECIMAL_RADIX;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }

    // Copy output array back to original array
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}

/**
 * Radix sort with step-by-step tracking for visualization
 * @param {number[]} arr - Array of non-negative integers to be sorted
 * @returns {Object} Result with sorted array, steps, and metrics
 */
function radixSortWithSteps(arr) {
    if (!arr || arr.length === 0) {
        return {
            sortedArray: arr || [],
            steps: [],
            metrics: { comparisons: 0, countingSorts: 0, digits: 0, maxValue: 0 }
        };
    }

    // Validate input - must be non-negative integers
    for (let i = 0; i < arr.length; i++) {
        if (!Number.isInteger(arr[i]) || arr[i] < 0) {
            throw new Error(`Radix sort requires non-negative integers. Found: ${arr[i]} at index ${i}`);
        }
    }

    const sortedArray = [...arr];
    const n = sortedArray.length;
    const steps = [];
    let comparisons = 0;
    let countingSorts = 0;

    // Initial state
    steps.push({
        type: 'start',
        array: [...sortedArray],
        message: 'Starting Radix Sort - finding maximum value to determine number of digits',
        phase: 'find-max',
        digitPlace: 0,
        comparisons,
        countingSorts,
        highlightIndices: []
    });

    // Find maximum value
    let maxValue = sortedArray[0];
    steps.push({
        type: 'find-max',
        array: [...sortedArray],
        message: `Checking maximum value: current max = ${maxValue}`,
        phase: 'find-max',
        digitPlace: 0,
        comparisons,
        countingSorts,
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
                digitPlace: 0,
                comparisons,
                countingSorts,
                highlightIndices: [i],
                maxValue
            });
        } else {
            steps.push({
                type: 'max-check',
                array: [...sortedArray],
                message: `${sortedArray[i]} ≤ ${maxValue} (no update needed)`,
                phase: 'find-max',
                digitPlace: 0,
                comparisons,
                countingSorts,
                highlightIndices: [i],
                maxValue
            });
        }
    }

    const digits = maxValue === 0 ? 1 : Math.floor(Math.log10(maxValue)) + 1;
    steps.push({
        type: 'digits-calculated',
        array: [...sortedArray],
        message: `Maximum value is ${maxValue}, so we need to process ${digits} digit(s)`,
        phase: 'digit-processing',
        digitPlace: 0,
        comparisons,
        countingSorts,
        highlightIndices: [],
        maxValue,
        digits
    });

    // Process each digit position
    let digitPosition = 1;
    let tempMaxValue = maxValue;
    let digitNumber = 1;
    
    while (tempMaxValue > 0) {
        steps.push({
            type: 'digit-start',
            array: [...sortedArray],
            message: `Processing digit ${digitNumber} (place value ${digitPosition}) - ${getDigitName(digitNumber)}`,
            phase: 'digit-processing',
            digitPlace: digitPosition,
            comparisons,
            countingSorts,
            highlightIndices: [],
            maxValue,
            digits,
            currentDigit: digitNumber
        });

        // Perform counting sort for this digit with steps
        const beforeSort = [...sortedArray];
        countingSortWithSteps(sortedArray, digitPosition, steps, comparisons, countingSorts, digitNumber);
        countingSorts++;

        steps.push({
            type: 'digit-complete',
            array: [...sortedArray],
            message: `Completed sorting by digit ${digitNumber}. Array after ${getDigitName(digitNumber)} sort.`,
            phase: 'digit-processing',
            digitPlace: digitPosition,
            comparisons,
            countingSorts,
            highlightIndices: [],
            maxValue,
            digits,
            currentDigit: digitNumber,
            beforeSort,
            afterSort: [...sortedArray]
        });

        digitPosition *= DECIMAL_RADIX;
        tempMaxValue = Math.floor(tempMaxValue / DECIMAL_RADIX);
        digitNumber++;
    }

    // Final step
    steps.push({
        type: 'complete',
        array: [...sortedArray],
        message: `Radix Sort complete! Sorted ${n} elements using ${countingSorts} counting sort passes for ${digits} digit(s)`,
        phase: 'complete',
        digitPlace: 0,
        comparisons,
        countingSorts,
        highlightIndices: [],
        maxValue,
        digits
    });

    return {
        sortedArray,
        steps,
        metrics: { 
            comparisons, 
            countingSorts, 
            digits,
            maxValue: arr.length > 0 ? Math.max(...arr) : 0
        }
    };
}

/**
 * Counting sort with step tracking for radix sort visualization
 * @param {number[]} arr - Array to sort
 * @param {number} digitPlace - Current digit position
 * @param {Array} steps - Steps array to append to
 * @param {number} comparisons - Current comparison count
 * @param {number} countingSorts - Current counting sort count
 * @param {number} digitNumber - Which digit we're processing (1st, 2nd, etc.)
 */
function countingSortWithSteps(arr, digitPlace, steps, comparisons, countingSorts, digitNumber) {
    const n = arr.length;
    const count = new Array(DECIMAL_RADIX).fill(0);

    // Count occurrences of each digit
    steps.push({
        type: 'counting-start',
        array: [...arr],
        message: `Counting occurrences of each digit (0-9) at position ${digitNumber}`,
        phase: 'digit-processing',
        digitPlace,
        comparisons,
        countingSorts,
        highlightIndices: [],
        countArray: [...count],
        currentDigit: digitNumber
    });

    for (let i = 0; i < n; i++) {
        const digit = Math.floor(arr[i] / digitPlace) % DECIMAL_RADIX;
        count[digit]++;
        
        steps.push({
            type: 'count-digit',
            array: [...arr],
            message: `Element ${arr[i]} has digit ${digit} at position ${digitNumber}. Count[${digit}] = ${count[digit]}`,
            phase: 'digit-processing',
            digitPlace,
            comparisons,
            countingSorts,
            highlightIndices: [i],
            countArray: [...count],
            currentDigit: digitNumber,
            processingElement: arr[i],
            extractedDigit: digit
        });
    }

    // Show final count array
    steps.push({
        type: 'counting-complete',
        array: [...arr],
        message: `Digit counting complete. Converting counts to positions...`,
        phase: 'digit-processing',
        digitPlace,
        comparisons,
        countingSorts,
        highlightIndices: [],
        countArray: [...count],
        currentDigit: digitNumber
    });

    // Transform count array to position array
    for (let i = 1; i < DECIMAL_RADIX; i++) {
        const oldValue = count[i];
        count[i] += count[i - 1];
        steps.push({
            type: 'cumulative-count',
            array: [...arr],
            message: `Position[${i}] = ${oldValue} + ${count[i - 1]} = ${count[i]}`,
            phase: 'digit-processing',
            digitPlace,
            comparisons,
            countingSorts,
            highlightIndices: [],
            countArray: [...count],
            currentDigit: digitNumber,
            cumulativeIndex: i
        });
    }

    // Build output array
    const output = new Array(n);
    steps.push({
        type: 'placement-start',
        array: [...arr],
        message: 'Placing elements in sorted order based on current digit (right-to-left for stability)',
        phase: 'digit-processing',
        digitPlace,
        comparisons,
        countingSorts,
        highlightIndices: [],
        countArray: [...count],
        output: [...output],
        currentDigit: digitNumber
    });

    for (let i = n - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / digitPlace) % DECIMAL_RADIX;
        const position = count[digit] - 1;
        output[position] = arr[i];
        count[digit]--;

        steps.push({
            type: 'place-element',
            array: [...arr],
            message: `Placing ${arr[i]} (digit ${digit}) at position ${position}`,
            phase: 'digit-processing',
            digitPlace,
            comparisons,
            countingSorts,
            highlightIndices: [i],
            countArray: [...count],
            output: [...output],
            currentDigit: digitNumber,
            processingElement: arr[i],
            extractedDigit: digit,
            placementPosition: position
        });
    }

    // Copy output back to original array
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}

/**
 * Get human-readable name for digit position
 * @param {number} digitNum - The digit position (1, 2, 3, etc.)
 * @returns {string} Human-readable name
 */
function getDigitName(digitNum) {
    switch (digitNum) {
        case 1: return 'ones';
        case 2: return 'tens';
        case 3: return 'hundreds';
        case 4: return 'thousands';
        default: return `10^${digitNum - 1}s`;
    }
}

/**
 * Simple radix sort function (backward compatibility)
 * @param {number[]} arr - Array of non-negative integers to sort
 * @returns {number[]} Sorted array
 */
function radixSortSimple(arr) {
    const result = radixSort(arr);
    return result.sortedArray;
}

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        radixSort,
        radixSortWithSteps,
        radixSortSimple
    };
} else if (typeof window !== 'undefined') {
    window.RadixSortCore = {
        radixSort,
        radixSortWithSteps,
        radixSortSimple
    };
    // Expose commonly used functions in global scope for demo configs
    window.radixSortWithSteps = radixSortWithSteps;
    // Backward compatibility
    window.radixSort = radixSortSimple;
}