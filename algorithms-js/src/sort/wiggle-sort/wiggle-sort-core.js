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
 * @see https://github.com/sachinlala/SimplifyLearning
 */

// Import utilities for reusable functions
// Import utilities for reusable functions
// Note: SortingUtils is available globally via window.SortingUtils when loaded by universal loader
if (typeof require !== 'undefined') {
    // Node.js environment
    const SortingUtils = require('../utils/sorting-utils.js');
}
// In browser environment, SortingUtils is available via window.SortingUtils

/**
 * Wiggle Sort I - In-place O(n) algorithm
 * Ensures arr[0] < arr[1] > arr[2] < arr[3]... pattern
 * @param {number[]} arr - Array to wiggle sort
 * @returns {Object} Sorted array and metrics
 */
function wiggleSortI(arr) {
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
 * @returns {Object} Sorted array and metrics
 */
function wiggleSortII(arr) {
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
 * Check if an array is in wiggle sorted order
 * @param {number[]} arr - Array to check
 * @returns {boolean} True if array is wiggle sorted
 */
function isWiggleSorted(arr) {
    if (!arr || arr.length <= 1) return true;
    
    for (let i = 0; i < arr.length - 1; i++) {
        if (i % 2 === 0) {
            // Even index: should be less than next (valley)
            if (arr[i] > arr[i + 1]) return false;
        } else {
            // Odd index: should be greater than next (peak)
            if (arr[i] < arr[i + 1]) return false;
        }
    }
    return true;
}

/**
 * Get wiggle pattern description for an array
 * @param {number[]} arr - Array to analyze
 * @returns {Object} Pattern information
 */
function getWigglePattern(arr) {
    if (!arr || arr.length === 0) {
        return { pattern: [], isWiggleSorted: true, violations: [] };
    }
    
    const pattern = [];
    const violations = [];
    
    for (let i = 0; i < arr.length - 1; i++) {
        const current = arr[i];
        const next = arr[i + 1];
        const expectedPattern = i % 2 === 0 ? 'valley' : 'peak';
        
        if (i % 2 === 0) {
            // Even index: should be valley (less than next)
            if (current <= next) {
                pattern.push({ index: i, type: 'valley', satisfied: true });
            } else {
                pattern.push({ index: i, type: 'valley', satisfied: false });
                violations.push({
                    index: i,
                    expected: 'valley (<=)',
                    actual: `${current} > ${next}`,
                    type: 'valley_violation'
                });
            }
        } else {
            // Odd index: should be peak (greater than next)
            if (current >= next) {
                pattern.push({ index: i, type: 'peak', satisfied: true });
            } else {
                pattern.push({ index: i, type: 'peak', satisfied: false });
                violations.push({
                    index: i,
                    expected: 'peak (>=)',
                    actual: `${current} < ${next}`,
                    type: 'peak_violation'
                });
            }
        }
    }
    
    return {
        pattern,
        isWiggleSorted: violations.length === 0,
        violations,
        summary: {
            valleys: pattern.filter(p => p.type === 'valley').length,
            peaks: pattern.filter(p => p.type === 'peak').length,
            violationsCount: violations.length
        }
    };
}

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        wiggleSortI,
        wiggleSortII,
        isWiggleSorted,
        getWigglePattern
    };
} else if (typeof window !== 'undefined') {
    window.WiggleSortCore = {
        wiggleSortI,
        wiggleSortII,
        isWiggleSorted,
        getWigglePattern
    };
    // Backward compatibility
    window.wiggleSort = (arr, variant = "I") => {
        const result = variant === "I" ? wiggleSortI(arr) : wiggleSortII(arr);
        return result.sortedArray;
    };
}
