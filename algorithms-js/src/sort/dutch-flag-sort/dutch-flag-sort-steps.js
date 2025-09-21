/**
 * Dutch Flag Sort - Step Tracking for Visualization
 * 
 * This file contains step-by-step tracking logic for Dutch Flag Sort visualization.
 * Implements detailed step tracking for both 2-way and 3-way partitioning.
 * 
 * @see https://github.com/sachinlala/SimplifyLearning
 */

/**
 * Dutch Flag Sort with step-by-step tracking for visualization
 * @param {any[]} arr - Array to be sorted
 * @param {any} redValue - Red group value
 * @param {any} whiteValue - White group value (null for 2-way partitioning)
 * @param {any} blueValue - Blue group value
 * @returns {Object} Result with sorted array, steps, and metrics
 */
function dutchFlagSortWithSteps(arr, redValue, whiteValue, blueValue) {
    if (!arr || arr.length <= 1) {
        return {
            sortedArray: arr || [],
            steps: [],
            metrics: { comparisons: 0, swaps: 0, partitions: { red: 0, white: 0, blue: 0 } }
        };
    }

    const sortedArray = [...arr];
    const n = sortedArray.length;
    const steps = [];
    let comparisons = 0;
    let swaps = 0;

    // Handle two-value case (Polish flag) - whiteValue is implicit
    const isTwoValueSort = (whiteValue === undefined || whiteValue === null);
    const partitionType = isTwoValueSort ? '2-way' : '3-way';
    
    let redCount = 0;
    let whiteCount = 0;
    let blueCount = 0;

    // Initial state
    steps.push({
        type: 'start',
        array: [...sortedArray],
        message: `Starting Dutch Flag Sort (${partitionType} partitioning)`,
        phase: 'initialization',
        partitionType,
        redValue,
        whiteValue: isTwoValueSort ? 'implicit' : whiteValue,
        blueValue,
        comparisons,
        swaps,
        partitions: { red: redCount, white: whiteCount, blue: blueCount },
        highlightIndices: []
    });

    // Explain the algorithm
    if (isTwoValueSort) {
        steps.push({
            type: 'explanation',
            array: [...sortedArray],
            message: `Two-way partitioning: ${JSON.stringify(redValue)} | everything else | ${JSON.stringify(blueValue)}`,
            phase: 'explanation',
            partitionType,
            redValue,
            whiteValue: 'implicit',
            blueValue,
            comparisons,
            swaps,
            partitions: { red: redCount, white: whiteCount, blue: blueCount },
            highlightIndices: []
        });
    } else {
        steps.push({
            type: 'explanation',
            array: [...sortedArray],
            message: `Three-way partitioning: ${JSON.stringify(redValue)} | ${JSON.stringify(whiteValue)} | ${JSON.stringify(blueValue)}`,
            phase: 'explanation',
            partitionType,
            redValue,
            whiteValue,
            blueValue,
            comparisons,
            swaps,
            partitions: { red: redCount, white: whiteCount, blue: blueCount },
            highlightIndices: []
        });
    }

    // Initialize pointers
    let red = 0;      // boundary for red section (left)
    let white = n - 1; // current element being processed (from right)
    let blue = n - 1;  // boundary for blue section (right)

    steps.push({
        type: 'initialize-pointers',
        array: [...sortedArray],
        message: 'Initialize pointers: red=0, white=n-1, blue=n-1. Processing from right to left.',
        phase: 'initialization',
        partitionType,
        pointers: { red, white, blue },
        redValue,
        whiteValue: isTwoValueSort ? 'implicit' : whiteValue,
        blueValue,
        comparisons,
        swaps,
        partitions: { red: redCount, white: whiteCount, blue: blueCount },
        highlightIndices: [red, white, blue]
    });

    // Main partitioning loop
    while (white >= red) {
        const current = sortedArray[white];
        comparisons++;

        steps.push({
            type: 'examine-element',
            array: [...sortedArray],
            message: `Examining element ${JSON.stringify(current)} at position ${white}`,
            phase: 'partitioning',
            partitionType,
            currentElement: current,
            currentIndex: white,
            pointers: { red, white, blue },
            redValue,
            whiteValue: isTwoValueSort ? 'implicit' : whiteValue,
            blueValue,
            comparisons,
            swaps,
            partitions: { red: redCount, white: whiteCount, blue: blueCount },
            highlightIndices: [white]
        });

        if (current === redValue) {
            // Element belongs in red section
            steps.push({
                type: 'identify-red',
                array: [...sortedArray],
                message: `${JSON.stringify(current)} belongs in red section`,
                phase: 'partitioning',
                partitionType,
                currentElement: current,
                targetSection: 'red',
                pointers: { red, white, blue },
                redValue,
                whiteValue: isTwoValueSort ? 'implicit' : whiteValue,
                blueValue,
                comparisons,
                swaps,
                partitions: { red: redCount, white: whiteCount, blue: blueCount },
                highlightIndices: [red, white]
            });

            // Swap with red boundary if needed
            if (red !== white) {
                const redElement = sortedArray[red];
                [sortedArray[red], sortedArray[white]] = [sortedArray[white], sortedArray[red]];
                swaps++;
                
                steps.push({
                    type: 'swap-to-red',
                    array: [...sortedArray],
                    message: `Swapped ${JSON.stringify(current)} with ${JSON.stringify(redElement)} to expand red section`,
                    phase: 'partitioning',
                    partitionType,
                    swappedElements: [current, redElement],
                    swappedIndices: [red, white],
                    targetSection: 'red',
                    pointers: { red, white, blue },
                    redValue,
                    whiteValue: isTwoValueSort ? 'implicit' : whiteValue,
                    blueValue,
                    comparisons,
                    swaps,
                    partitions: { red: redCount, white: whiteCount, blue: blueCount },
                    highlightIndices: [red, white]
                });
            } else {
                steps.push({
                    type: 'no-swap-red',
                    array: [...sortedArray],
                    message: `${JSON.stringify(current)} is already in position for red section`,
                    phase: 'partitioning',
                    partitionType,
                    currentElement: current,
                    targetSection: 'red',
                    pointers: { red, white, blue },
                    redValue,
                    whiteValue: isTwoValueSort ? 'implicit' : whiteValue,
                    blueValue,
                    comparisons,
                    swaps,
                    partitions: { red: redCount, white: whiteCount, blue: blueCount },
                    highlightIndices: [red]
                });
            }
            
            redCount++;
            red++; // Expand red section
            
        } else if (current === blueValue) {
            // Element belongs in blue section
            steps.push({
                type: 'identify-blue',
                array: [...sortedArray],
                message: `${JSON.stringify(current)} belongs in blue section`,
                phase: 'partitioning',
                partitionType,
                currentElement: current,
                targetSection: 'blue',
                pointers: { red, white, blue },
                redValue,
                whiteValue: isTwoValueSort ? 'implicit' : whiteValue,
                blueValue,
                comparisons,
                swaps,
                partitions: { red: redCount, white: whiteCount, blue: blueCount },
                highlightIndices: [white, blue]
            });

            // Swap with blue boundary if needed
            if (white !== blue) {
                const blueElement = sortedArray[blue];
                [sortedArray[white], sortedArray[blue]] = [sortedArray[blue], sortedArray[white]];
                swaps++;
                
                steps.push({
                    type: 'swap-to-blue',
                    array: [...sortedArray],
                    message: `Swapped ${JSON.stringify(current)} with ${JSON.stringify(blueElement)} to expand blue section`,
                    phase: 'partitioning',
                    partitionType,
                    swappedElements: [current, blueElement],
                    swappedIndices: [white, blue],
                    targetSection: 'blue',
                    pointers: { red, white, blue },
                    redValue,
                    whiteValue: isTwoValueSort ? 'implicit' : whiteValue,
                    blueValue,
                    comparisons,
                    swaps,
                    partitions: { red: redCount, white: whiteCount, blue: blueCount },
                    highlightIndices: [white, blue]
                });
            } else {
                steps.push({
                    type: 'no-swap-blue',
                    array: [...sortedArray],
                    message: `${JSON.stringify(current)} is already in position for blue section`,
                    phase: 'partitioning',
                    partitionType,
                    currentElement: current,
                    targetSection: 'blue',
                    pointers: { red, white, blue },
                    redValue,
                    whiteValue: isTwoValueSort ? 'implicit' : whiteValue,
                    blueValue,
                    comparisons,
                    swaps,
                    partitions: { red: redCount, white: whiteCount, blue: blueCount },
                    highlightIndices: [blue]
                });
            }
            
            blueCount++;
            blue--; // Shrink blue boundary
            white--; // Move back to check the swapped element
            
        } else {
            // Element belongs in white section (middle) or is unknown
            const isWhiteElement = (isTwoValueSort || current === whiteValue);
            
            steps.push({
                type: 'identify-white',
                array: [...sortedArray],
                message: isWhiteElement ? 
                    `${JSON.stringify(current)} belongs in ${isTwoValueSort ? 'middle' : 'white'} section` :
                    `${JSON.stringify(current)} is unknown, treating as ${isTwoValueSort ? 'middle' : 'white'} element`,
                phase: 'partitioning',
                partitionType,
                currentElement: current,
                targetSection: 'white',
                isUnknownElement: !isWhiteElement,
                pointers: { red, white, blue },
                redValue,
                whiteValue: isTwoValueSort ? 'implicit' : whiteValue,
                blueValue,
                comparisons,
                swaps,
                partitions: { red: redCount, white: whiteCount, blue: blueCount },
                highlightIndices: [white]
            });
            
            whiteCount++;
            white--; // Element stays in place, move to next
        }

        // Show updated boundaries after each operation
        if (steps.length > 0) {
            const lastStep = steps[steps.length - 1];
            if (lastStep.type !== 'update-boundaries') {
                steps.push({
                    type: 'update-boundaries',
                    array: [...sortedArray],
                    message: `Updated boundaries: red=[0,${red-1}], white=[${red},${blue}], blue=[${blue+1},${n-1}]`,
                    phase: 'partitioning',
                    partitionType,
                    pointers: { red, white, blue },
                    sections: {
                        red: { start: 0, end: red - 1, count: redCount },
                        white: { start: red, end: blue, count: whiteCount },
                        blue: { start: blue + 1, end: n - 1, count: blueCount }
                    },
                    redValue,
                    whiteValue: isTwoValueSort ? 'implicit' : whiteValue,
                    blueValue,
                    comparisons,
                    swaps,
                    partitions: { red: redCount, white: whiteCount, blue: blueCount },
                    highlightIndices: []
                });
            }
        }
    }

    // Final validation and summary
    steps.push({
        type: 'complete',
        array: [...sortedArray],
        message: `Dutch Flag Sort complete! Partitioned into ${redCount} red, ${whiteCount} ${isTwoValueSort ? 'middle' : 'white'}, and ${blueCount} blue elements in ${swaps} swaps.`,
        phase: 'complete',
        partitionType,
        finalSections: {
            red: { count: redCount, values: sortedArray.slice(0, red) },
            white: { count: whiteCount, values: sortedArray.slice(red, blue + 1) },
            blue: { count: blueCount, values: sortedArray.slice(blue + 1) }
        },
        redValue,
        whiteValue: isTwoValueSort ? 'implicit' : whiteValue,
        blueValue,
        comparisons,
        swaps,
        partitions: { red: redCount, white: whiteCount, blue: blueCount },
        highlightIndices: []
    });

    return {
        sortedArray,
        steps,
        metrics: {
            comparisons,
            swaps,
            partitions: { red: redCount, white: whiteCount, blue: blueCount },
            redValue,
            whiteValue: isTwoValueSort ? 'implicit' : whiteValue,
            blueValue
        }
    };
}

/**
 * Three-way Dutch Flag Sort with step tracking
 * @param {any[]} arr - Array to partition
 * @param {any} redValue - First group value
 * @param {any} whiteValue - Second group value
 * @param {any} blueValue - Third group value
 * @returns {Object} Result with sorted array, steps, and metrics
 */
function dutchFlagSort3WayWithSteps(arr, redValue, whiteValue, blueValue) {
    return dutchFlagSortWithSteps(arr, redValue, whiteValue, blueValue);
}

/**
 * Two-way Dutch Flag Sort with step tracking
 * @param {any[]} arr - Array to partition
 * @param {any} firstValue - First group value
 * @param {any} secondValue - Second group value
 * @returns {Object} Result with sorted array, steps, and metrics
 */
function dutchFlagSort2WayWithSteps(arr, firstValue, secondValue) {
    return dutchFlagSortWithSteps(arr, firstValue, null, secondValue);
}

/**
 * Sort colors with step tracking (classic Dutch flag problem)
 * @param {string[]} arr - Array of color strings
 * @returns {Object} Result with sorted array, steps, and metrics
 */
function sortColorsWithSteps(arr) {
    return dutchFlagSortWithSteps(arr, 'red', 'white', 'blue');
}

/**
 * Sort 0s, 1s, and 2s with step tracking
 * @param {number[]} arr - Array of 0s, 1s, and 2s
 * @returns {Object} Result with sorted array, steps, and metrics
 */
function sort012WithSteps(arr) {
    return dutchFlagSortWithSteps(arr, 0, 1, 2);
}

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        dutchFlagSortWithSteps,
        dutchFlagSort3WayWithSteps,
        dutchFlagSort2WayWithSteps,
        sortColorsWithSteps,
        sort012WithSteps
    };
} else if (typeof window !== 'undefined') {
    window.DutchFlagSortSteps = {
        dutchFlagSortWithSteps,
        dutchFlagSort3WayWithSteps,
        dutchFlagSort2WayWithSteps,
        sortColorsWithSteps,
        sort012WithSteps
    };
    // Expose commonly used functions in global scope for demo configs
    window.dutchFlagSortWithSteps = dutchFlagSortWithSteps;
    window.dutchFlagSort3WayWithSteps = dutchFlagSort3WayWithSteps;
    window.dutchFlagSort2WayWithSteps = dutchFlagSort2WayWithSteps;
    window.sortColorsWithSteps = sortColorsWithSteps;
    window.sort012WithSteps = sort012WithSteps;
}
