/**
 * Wiggle Sort - Core Algorithm Implementation
 * 
 * Wiggle Sort arranges array elements such that arr[0] < arr[1] > arr[2] < arr[3]...
 * Creates a "wiggling" pattern where elements alternate between peaks and valleys.
 * 
 * Two main variants:
 * 1. Wiggle Sort I: Elements in wiggling order (allows duplicates adjacent)
 * 2. Wiggle Sort II: No adjacent duplicates in wiggling order
 * 
 * Time Complexity: O(n log n) for sort-based, O(n) for in-place
 * Space Complexity: O(1) for in-place variant
 * 
 * @author SimplifyLearning
 * @see https://github.com/sachinlala/SimplifyLearning
 */

// Import utilities for reusable functions
const SortingUtils = (typeof require !== 'undefined') ? 
    require('../utils/sorting-utils.js') : window.SortingUtils;

/**
 * Wiggle Sort I - In-place O(n) algorithm
 * Ensures arr[0] < arr[1] > arr[2] < arr[3]... pattern
 * @param {number[]} arr - Array to wiggle sort
 * @param {Object} options - Options for sorting behavior
 * @returns {Object} Sorted array and metrics
 */
function wiggleSortI(arr, options = {}) {
    if (!arr || arr.length <= 1) {
        return {
            sortedArray: arr || [],
            metrics: { comparisons: 0, swaps: 0 }
        };
    }

    const sortedArray = [...arr];
    const n = sortedArray.length;
    let comparisons = 0;
    let swaps = 0;

    // In-place wiggle sort algorithm
    for (let i = 0; i < n - 1; i++) {
        comparisons++;
        
        if (i % 2 === 0) {
            // Even index: should be less than next (valley)
            if (sortedArray[i] > sortedArray[i + 1]) {
                SortingUtils.swap(sortedArray, i, i + 1);
                swaps++;
            }
        } else {
            // Odd index: should be greater than next (peak)
            if (sortedArray[i] < sortedArray[i + 1]) {
                SortingUtils.swap(sortedArray, i, i + 1);
                swaps++;
            }
        }
    }

    return {
        sortedArray,
        metrics: { comparisons, swaps }
    };
}

/**
 * Wiggle Sort II - No adjacent duplicates
 * Uses sorting and rearrangement to ensure no adjacent duplicates
 * @param {number[]} arr - Array to wiggle sort
 * @param {Object} options - Options for sorting behavior
 * @returns {Object} Sorted array and metrics
 */
function wiggleSortII(arr, options = {}) {
    if (!arr || arr.length <= 1) {
        return {
            sortedArray: arr || [],
            metrics: { comparisons: 0, swaps: 0 }
        };
    }

    const sortedArray = [...arr];
    const n = sortedArray.length;
    let comparisons = n - 1; // For initial sort
    let swaps = 0;

    // Step 1: Sort the array
    sortedArray.sort((a, b) => {
        comparisons++;
        return a - b;
    });

    // Step 2: Create result array with wiggle pattern
    const result = new Array(n);
    const mid = Math.floor((n + 1) / 2);
    
    let left = mid - 1;  // End of smaller half
    let right = n - 1;   // End of larger half

    // Fill result array alternately
    for (let i = 0; i < n; i++) {
        if (i % 2 === 0) {
            // Even positions get smaller elements (valleys)
            result[i] = sortedArray[left--];
        } else {
            // Odd positions get larger elements (peaks)
            result[i] = sortedArray[right--];
        }
        swaps++; // Count as placement operations
    }

    return {
        sortedArray: result,
        metrics: { comparisons, swaps }
    };
}

/**
 * Wiggle Sort with step-by-step tracking for visualization
 * @param {number[]} arr - Array to be sorted
 * @param {string} variant - "I" for wiggle sort I, "II" for wiggle sort II
 * @returns {Object} Result with sorted array, steps, and metrics
 */
function wiggleSortWithSteps(arr, variant = "I") {
    if (!arr || arr.length <= 1) {
        return {
            sortedArray: arr || [],
            steps: [],
            metrics: { comparisons: 0, swaps: 0 }
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
        message: `Starting Wiggle Sort ${variant} - creating ${variant === "I" ? "wiggling pattern" : "wiggling pattern without adjacent duplicates"}`,
        phase: 'initialize',
        comparisons,
        swaps,
        highlightIndices: [],
        variant
    });

    if (variant === "I") {
        // Wiggle Sort I implementation with steps
        for (let i = 0; i < n - 1; i++) {
            steps.push({
                type: 'examine',
                array: [...sortedArray],
                message: `Examining position ${i} (${i % 2 === 0 ? 'valley' : 'peak'})`,
                phase: 'compare',
                comparisons,
                swaps,
                highlightIndices: [i, i + 1],
                currentPosition: i
            });

            comparisons++;
            const shouldSwap = (i % 2 === 0) ? 
                sortedArray[i] > sortedArray[i + 1] : 
                sortedArray[i] < sortedArray[i + 1];

            if (shouldSwap) {
                SortingUtils.swap(sortedArray, i, i + 1);
                swaps++;
                
                steps.push({
                    type: 'swap',
                    array: [...sortedArray],
                    message: `Swapped ${sortedArray[i + 1]} and ${sortedArray[i]} to create ${i % 2 === 0 ? 'valley' : 'peak'}`,
                    phase: 'swap',
                    comparisons,
                    swaps,
                    highlightIndices: [i, i + 1],
                    swappedElements: [sortedArray[i + 1], sortedArray[i]]
                });
            } else {
                steps.push({
                    type: 'no-swap',
                    array: [...sortedArray],
                    message: `No swap needed - correct ${i % 2 === 0 ? 'valley' : 'peak'} pattern`,
                    phase: 'compare',
                    comparisons,
                    swaps,
                    highlightIndices: [i, i + 1]
                });
            }
        }
    } else {
        // Wiggle Sort II implementation with steps
        steps.push({
            type: 'sorting',
            array: [...sortedArray],
            message: 'First, sorting the array to group similar elements',
            phase: 'sort',
            comparisons,
            swaps,
            highlightIndices: []
        });

        sortedArray.sort((a, b) => {
            comparisons++;
            return a - b;
        });

        steps.push({
            type: 'sorted',
            array: [...sortedArray],
            message: 'Array sorted - now rearranging to create wiggle pattern without adjacent duplicates',
            phase: 'sort',
            comparisons,
            swaps,
            highlightIndices: []
        });

        const result = new Array(n);
        const mid = Math.floor((n + 1) / 2);
        let left = mid - 1;
        let right = n - 1;

        for (let i = 0; i < n; i++) {
            if (i % 2 === 0) {
                result[i] = sortedArray[left];
                steps.push({
                    type: 'place',
                    array: [...result],
                    message: `Placed ${sortedArray[left]} at position ${i} (valley) from smaller half`,
                    phase: 'rearrange',
                    comparisons,
                    swaps,
                    highlightIndices: [i],
                    sourceIndex: left,
                    targetIndex: i
                });
                left--;
            } else {
                result[i] = sortedArray[right];
                steps.push({
                    type: 'place',
                    array: [...result],
                    message: `Placed ${sortedArray[right]} at position ${i} (peak) from larger half`,
                    phase: 'rearrange',
                    comparisons,
                    swaps,
                    highlightIndices: [i],
                    sourceIndex: right,
                    targetIndex: i
                });
                right--;
            }
            swaps++;
        }

        // Update the final array
        sortedArray.splice(0, n, ...result);
    }

    // Final step
    steps.push({
        type: 'complete',
        array: [...sortedArray],
        message: `Wiggle Sort ${variant} complete! Array now follows ${getWigglePattern(sortedArray)} pattern`,
        phase: 'complete',
        comparisons,
        swaps,
        highlightIndices: [],
        finalPattern: getWigglePattern(sortedArray)
    });

    return {
        sortedArray,
        steps,
        metrics: { comparisons, swaps, variant }
    };
}

/**
 * Analyzes the wiggle pattern in an array
 * @param {number[]} arr - Array to analyze
 * @returns {string} Pattern description
 */
function getWigglePattern(arr) {
    if (arr.length <= 1) return "single element";
    
    let pattern = "";
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < arr[i + 1]) {
            pattern += "<";
        } else if (arr[i] > arr[i + 1]) {
            pattern += ">";
        } else {
            pattern += "=";
        }
    }
    return pattern;
}

/**
 * Validates if array follows wiggle sort pattern
 * @param {number[]} arr - Array to validate
 * @param {string} variant - "I" or "II"
 * @returns {Object} Validation result
 */
function isWiggleSorted(arr, variant = "I") {
    if (!arr || arr.length <= 1) return { valid: true, message: "Array is valid" };

    for (let i = 0; i < arr.length - 1; i++) {
        const isEven = i % 2 === 0;
        
        if (isEven) {
            // Even index should be less than next (valley)
            if (arr[i] >= arr[i + 1]) {
                return { 
                    valid: false, 
                    message: `Valley violation at index ${i}: ${arr[i]} should be < ${arr[i + 1]}` 
                };
            }
        } else {
            // Odd index should be greater than next (peak)
            if (arr[i] <= arr[i + 1]) {
                return { 
                    valid: false, 
                    message: `Peak violation at index ${i}: ${arr[i]} should be > ${arr[i + 1]}` 
                };
            }
        }

        // For Wiggle Sort II, check no adjacent duplicates
        if (variant === "II" && arr[i] === arr[i + 1]) {
            return {
                valid: false,
                message: `Adjacent duplicates at indices ${i} and ${i + 1}: both are ${arr[i]}`
            };
        }
    }

    return { valid: true, message: `Valid Wiggle Sort ${variant} pattern` };
}

/**
 * Simple wiggle sort function (backward compatibility)
 * @param {number[]} arr - Array to sort
 * @param {string} variant - "I" or "II"
 * @returns {number[]} Wiggle sorted array
 */
function wiggleSortSimple(arr, variant = "I") {
    const result = variant === "I" ? wiggleSortI(arr) : wiggleSortII(arr);
    return result.sortedArray;
}

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        wiggleSortI,
        wiggleSortII,
        wiggleSortWithSteps,
        wiggleSortSimple,
        isWiggleSorted,
        getWigglePattern
    };
} else if (typeof window !== 'undefined') {
    window.WiggleSortCore = {
        wiggleSortI,
        wiggleSortII,
        wiggleSortWithSteps,
        wiggleSortSimple,
        isWiggleSorted,
        getWigglePattern
    };
    // Expose commonly used functions in global scope for demo configs
    window.wiggleSortWithSteps = wiggleSortWithSteps;
    // Backward compatibility
    window.wiggleSort = wiggleSortSimple;
}