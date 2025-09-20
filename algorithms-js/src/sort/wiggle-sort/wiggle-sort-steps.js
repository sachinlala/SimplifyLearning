/**
 * Wiggle Sort - Step Tracking for Visualization
 * 
 * This file contains step-by-step tracking logic for Wiggle Sort visualization.
 * Implements detailed step tracking for both Wiggle Sort I and II variants.
 * 
 * @see https://github.com/sachinlala/SimplifyLearning
 */

/**
 * Wiggle Sort I with step-by-step tracking for visualization
 * In-place O(n) algorithm that creates wiggling pattern
 * @param {number[]} arr - Array to be sorted
 * @returns {Object} Result with sorted array, steps, and metrics
 */
function wiggleSortIWithSteps(arr) {
    if (!arr || arr.length <= 1) {
        return {
            sortedArray: arr || [],
            steps: [],
            metrics: { comparisons: 0, swaps: 0, wiggleOperations: 0 }
        };
    }

    const sortedArray = [...arr];
    const n = sortedArray.length;
    const steps = [];
    let comparisons = 0;
    let swaps = 0;
    let wiggleOperations = 0;

    // Initial state
    steps.push({
        type: 'start',
        array: [...sortedArray],
        message: 'Starting Wiggle Sort I - creating wiggling pattern in-place',
        phase: 'initialization',
        variant: 'I',
        comparisons,
        swaps,
        wiggleOperations,
        highlightIndices: []
    });

    // Pattern explanation
    steps.push({
        type: 'pattern-explanation',
        array: [...sortedArray],
        message: 'Target pattern: arr[0] < arr[1] > arr[2] < arr[3] > arr[4]... (valley-peak-valley-peak)',
        phase: 'explanation',
        variant: 'I',
        comparisons,
        swaps,
        wiggleOperations,
        highlightIndices: []
    });

    // Process each adjacent pair
    for (let i = 0; i < n - 1; i++) {
        comparisons++;
        wiggleOperations++;
        
        const isEvenIndex = i % 2 === 0;
        const expectedRelation = isEvenIndex ? 'valley (<=)' : 'peak (>=)';
        const currentValue = sortedArray[i];
        const nextValue = sortedArray[i + 1];
        
        // Show what we're checking
        steps.push({
            type: 'check-position',
            array: [...sortedArray],
            message: `Position ${i} should be ${expectedRelation} relative to position ${i + 1}`,
            phase: 'checking',
            variant: 'I',
            currentIndex: i,
            nextIndex: i + 1,
            expectedPattern: isEvenIndex ? 'valley' : 'peak',
            comparisons,
            swaps,
            wiggleOperations,
            highlightIndices: [i, i + 1]
        });
        
        // Compare values
        steps.push({
            type: 'compare',
            array: [...sortedArray],
            message: `Comparing: ${currentValue} and ${nextValue}`,
            phase: 'comparison',
            variant: 'I',
            currentIndex: i,
            nextIndex: i + 1,
            currentValue,
            nextValue,
            expectedPattern: isEvenIndex ? 'valley' : 'peak',
            comparisons,
            swaps,
            wiggleOperations,
            highlightIndices: [i, i + 1]
        });
        
        let needsSwap = false;
        if (isEvenIndex) {
            // Even index: should be valley (less than or equal to next)
            needsSwap = currentValue > nextValue;
        } else {
            // Odd index: should be peak (greater than or equal to next)
            needsSwap = currentValue < nextValue;
        }
        
        if (needsSwap) {
            // Swap needed
            [sortedArray[i], sortedArray[i + 1]] = [sortedArray[i + 1], sortedArray[i]];
            swaps++;
            
            steps.push({
                type: 'swap',
                array: [...sortedArray],
                message: `Swapped ${currentValue} and ${nextValue} to fix ${isEvenIndex ? 'valley' : 'peak'} pattern`,
                phase: 'swapping',
                variant: 'I',
                swappedIndices: [i, i + 1],
                swappedValues: [currentValue, nextValue],
                patternFixed: isEvenIndex ? 'valley' : 'peak',
                comparisons,
                swaps,
                wiggleOperations,
                highlightIndices: [i, i + 1]
            });
        } else {
            // No swap needed
            steps.push({
                type: 'no-swap',
                array: [...sortedArray],
                message: `Pattern already correct: ${currentValue} ${isEvenIndex ? '≤' : '≥'} ${nextValue}`,
                phase: 'validation',
                variant: 'I',
                currentIndex: i,
                nextIndex: i + 1,
                patternCorrect: isEvenIndex ? 'valley' : 'peak',
                comparisons,
                swaps,
                wiggleOperations,
                highlightIndices: [i, i + 1]
            });
        }
    }

    // Final validation
    steps.push({
        type: 'validation',
        array: [...sortedArray],
        message: 'Validating final wiggle pattern...',
        phase: 'validation',
        variant: 'I',
        comparisons,
        swaps,
        wiggleOperations,
        highlightIndices: []
    });

    // Check final pattern
    const patternAnalysis = analyzeWigglePattern(sortedArray);
    
    steps.push({
        type: 'complete',
        array: [...sortedArray],
        message: `Wiggle Sort I complete! Made ${comparisons} comparisons and ${swaps} swaps. Pattern is ${patternAnalysis.isValid ? 'valid' : 'invalid'}.`,
        phase: 'complete',
        variant: 'I',
        patternAnalysis,
        comparisons,
        swaps,
        wiggleOperations,
        highlightIndices: []
    });

    return {
        sortedArray,
        steps,
        metrics: { comparisons, swaps, wiggleOperations, variant: 'I' }
    };
}

/**
 * Wiggle Sort II with step-by-step tracking for visualization
 * Sort-based algorithm that avoids adjacent duplicates
 * @param {number[]} arr - Array to be sorted
 * @returns {Object} Result with sorted array, steps, and metrics
 */
function wiggleSortIIWithSteps(arr) {
    if (!arr || arr.length <= 1) {
        return {
            sortedArray: arr || [],
            steps: [],
            metrics: { comparisons: 0, swaps: 0, wiggleOperations: 0 }
        };
    }

    const n = arr.length;
    const steps = [];
    let comparisons = 0;
    let swaps = 0;
    let wiggleOperations = 0;

    // Initial state
    steps.push({
        type: 'start',
        array: [...arr],
        message: 'Starting Wiggle Sort II - sort first, then rearrange to avoid adjacent duplicates',
        phase: 'initialization',
        variant: 'II',
        comparisons,
        swaps,
        wiggleOperations,
        highlightIndices: []
    });

    // Step 1: Sort the array
    const sortedArray = [...arr];
    steps.push({
        type: 'sort-phase',
        array: [...sortedArray],
        message: 'Step 1: Sorting array to prepare for rearrangement',
        phase: 'sorting',
        variant: 'II',
        comparisons,
        swaps,
        wiggleOperations,
        highlightIndices: []
    });

    sortedArray.sort((a, b) => {
        comparisons++;
        return a - b;
    });

    steps.push({
        type: 'sort-complete',
        array: [...sortedArray],
        message: `Array sorted: [${sortedArray.join(', ')}]`,
        phase: 'sorting',
        variant: 'II',
        comparisons,
        swaps,
        wiggleOperations,
        highlightIndices: []
    });

    // Step 2: Split into two halves
    const mid = Math.floor((n + 1) / 2);
    const smallerHalf = sortedArray.slice(0, mid);
    const largerHalf = sortedArray.slice(mid);

    steps.push({
        type: 'split-halves',
        array: [...sortedArray],
        message: `Split into smaller half [${smallerHalf.join(', ')}] and larger half [${largerHalf.join(', ')}]`,
        phase: 'splitting',
        variant: 'II',
        smallerHalf: [...smallerHalf],
        largerHalf: [...largerHalf],
        mid,
        comparisons,
        swaps,
        wiggleOperations,
        highlightIndices: []
    });

    // Step 3: Rearrange in wiggle pattern
    const result = new Array(n);
    let left = mid - 1;  // End of smaller half
    let right = n - 1;   // End of larger half

    steps.push({
        type: 'rearrange-start',
        array: [...sortedArray],
        message: 'Step 2: Rearranging - valleys (even positions) get smaller elements, peaks (odd positions) get larger elements',
        phase: 'rearranging',
        variant: 'II',
        result: [...result],
        leftPointer: left,
        rightPointer: right,
        comparisons,
        swaps,
        wiggleOperations,
        highlightIndices: []
    });

    // Fill result array alternately
    for (let i = 0; i < n; i++) {
        wiggleOperations++;
        
        if (i % 2 === 0) {
            // Even positions get smaller elements (valleys)
            result[i] = sortedArray[left];
            steps.push({
                type: 'place-valley',
                array: [...sortedArray],
                message: `Position ${i} (valley): placing ${sortedArray[left]} from smaller half`,
                phase: 'rearranging',
                variant: 'II',
                result: [...result],
                currentPosition: i,
                placedValue: sortedArray[left],
                sourceIndex: left,
                patternType: 'valley',
                leftPointer: left,
                rightPointer: right,
                comparisons,
                swaps: swaps + 1, // Count placements as swaps
                wiggleOperations,
                highlightIndices: [i]
            });
            left--;
        } else {
            // Odd positions get larger elements (peaks)
            result[i] = sortedArray[right];
            steps.push({
                type: 'place-peak',
                array: [...sortedArray],
                message: `Position ${i} (peak): placing ${sortedArray[right]} from larger half`,
                phase: 'rearranging',
                variant: 'II',
                result: [...result],
                currentPosition: i,
                placedValue: sortedArray[right],
                sourceIndex: right,
                patternType: 'peak',
                leftPointer: left,
                rightPointer: right,
                comparisons,
                swaps: swaps + 1, // Count placements as swaps
                wiggleOperations,
                highlightIndices: [i]
            });
            right--;
        }
        swaps++; // Count placement operations
    }

    // Final validation
    steps.push({
        type: 'validation',
        array: [...result],
        message: 'Validating final wiggle pattern and checking for adjacent duplicates...',
        phase: 'validation',
        variant: 'II',
        comparisons,
        swaps,
        wiggleOperations,
        highlightIndices: []
    });

    const patternAnalysis = analyzeWigglePattern(result);
    const hasAdjacentDuplicates = checkAdjacentDuplicates(result);
    
    steps.push({
        type: 'complete',
        array: [...result],
        message: `Wiggle Sort II complete! Made ${comparisons} comparisons and ${swaps} placements. Pattern is ${patternAnalysis.isValid ? 'valid' : 'invalid'}, adjacent duplicates: ${hasAdjacentDuplicates ? 'present' : 'avoided'}.`,
        phase: 'complete',
        variant: 'II',
        patternAnalysis,
        hasAdjacentDuplicates,
        comparisons,
        swaps,
        wiggleOperations,
        highlightIndices: []
    });

    return {
        sortedArray: result,
        steps,
        metrics: { comparisons, swaps, wiggleOperations, variant: 'II' }
    };
}

/**
 * Main wiggle sort with steps function - delegates to appropriate variant
 * @param {number[]} arr - Array to be sorted
 * @param {string} variant - 'I' or 'II'
 * @returns {Object} Result with sorted array, steps, and metrics
 */
function wiggleSortWithSteps(arr, variant = 'I') {
    if (variant === 'II') {
        return wiggleSortIIWithSteps(arr);
    } else {
        return wiggleSortIWithSteps(arr);
    }
}

/**
 * Analyze wiggle pattern of an array
 * @param {number[]} arr - Array to analyze
 * @returns {Object} Pattern analysis
 */
function analyzeWigglePattern(arr) {
    if (!arr || arr.length <= 1) {
        return { pattern: '', isValid: true, violations: 0 };
    }
    
    let pattern = '';
    let violations = 0;
    
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < arr[i + 1]) {
            pattern += '<';
            // Check if this matches expected pattern
            if (i % 2 !== 0) violations++; // Odd indices should be >=
        } else if (arr[i] > arr[i + 1]) {
            pattern += '>';
            // Check if this matches expected pattern
            if (i % 2 === 0) violations++; // Even indices should be <=
        } else {
            pattern += '=';
            // Equal is okay for both patterns in wiggle sort I
        }
    }
    
    return {
        pattern,
        isValid: violations === 0,
        violations
    };
}

/**
 * Check for adjacent duplicates in array
 * @param {number[]} arr - Array to check
 * @returns {boolean} True if adjacent duplicates exist
 */
function checkAdjacentDuplicates(arr) {
    if (!arr || arr.length <= 1) return false;
    
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === arr[i + 1]) {
            return true;
        }
    }
    return false;
}

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        wiggleSortWithSteps,
        wiggleSortIWithSteps,
        wiggleSortIIWithSteps,
        analyzeWigglePattern,
        checkAdjacentDuplicates
    };
} else if (typeof window !== 'undefined') {
    window.WiggleSortSteps = {
        wiggleSortWithSteps,
        wiggleSortIWithSteps,
        wiggleSortIIWithSteps,
        analyzeWigglePattern,
        checkAdjacentDuplicates
    };
    // Expose commonly used functions in global scope for demo configs
    window.wiggleSortWithSteps = wiggleSortWithSteps;
    window.wiggleSortIWithSteps = wiggleSortIWithSteps;
    window.wiggleSortIIWithSteps = wiggleSortIIWithSteps;
}
