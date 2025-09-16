/**
 * Bubble Sort - Visualization and Step-by-Step Implementation
 * 
 * This file contains the visualization functions for Bubble Sort algorithm.
 * The core algorithm logic is in bubble-sort-core.js.
 * 
 * @see https://github.com/sachinlala/SimplifyLearning
 */

// Core algorithm functions are loaded from bubble-sort-core.js via script tag
// In browser environment, these functions are available in the global scope via window.BubbleSortCore

// For compatibility, create references to core functions (loaded dynamically)
// Note: Core functions are available globally via window.BubbleSortCore

// Safe dependency loading - check for core functions when needed
function ensureCoreFunctions() {
    // Core functions are available via window.BubbleSortCore when needed
    // No local variables needed since we're not using them in this file
}

/**
 * Legacy BubbleSort class for backward compatibility
 * This wraps the core functions and adds visualization capabilities
 */
class BubbleSort {
    constructor() {
        this.steps = [];
        this.comparisons = 0;
        this.swaps = 0;
    }

    /**
     * Sorts an array using bubble sort algorithm with step tracking
     * @param {number[]} arr - Array to be sorted
     * @param {boolean} trackSteps - Whether to track steps for visualization
     * @returns {number[]} Sorted array
     */
    sort(arr, trackSteps = false) {
        if (!arr || arr.length <= 1) {
            return arr;
        }

        if (trackSteps) {
            const result = bubbleSortWithSteps(arr);
            this.steps = result.steps;
            this.comparisons = result.metrics.comparisons;
            this.swaps = result.metrics.swaps;
            return result.sortedArray;
        } else {
            // Use core function
            if (window.BubbleSortCore && window.BubbleSortCore.bubbleSort) {
                const result = window.BubbleSortCore.bubbleSort(arr);
                return result.sortedArray;
            }
            // Fallback - should not happen in normal operation
            throw new Error('BubbleSortCore not loaded');
        }
    }

    /**
     * Reset tracking variables
     */
    reset() {
        this.steps = [];
        this.comparisons = 0;
        this.swaps = 0;
    }

    /**
     * Add a step to the tracking array
     * @param {Object} step - Step information
     */
    addStep(step) {
        this.steps.push({
            ...step,
            stepNumber: this.steps.length + 1,
            timestamp: Date.now()
        });
    }

    /**
     * Get all tracking steps
     * @returns {Array} Array of steps
     */
    getSteps() {
        return this.steps;
    }

    /**
     * Get performance metrics
     * @returns {Object} Performance metrics
     */
    getMetrics() {
        return {
            comparisons: this.comparisons,
            swaps: this.swaps,
            totalSteps: this.steps.length
        };
    }

    /**
     * Convert number to ordinal (1st, 2nd, 3rd, etc.)
     * @param {number} num - Number to convert
     * @returns {string} Ordinal string
     */
    getOrdinal(num) {
        const suffixes = ['th', 'st', 'nd', 'rd'];
        const v = num % 100;
        return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
    }
}

/**
 * Bubble sort with step-by-step visualization data
 * This uses the step tracking from bubble-sort-steps.js
 * @param {number[]} arr - Array to be sorted
 * @returns {Object} Result with sorted array, steps, and metrics
 */
function bubbleSortWithSteps(arr) {
    // Ensure step tracking functions are available
    if (window.BubbleSortSteps && window.BubbleSortSteps.bubbleSortWithSteps) {
        return window.BubbleSortSteps.bubbleSortWithSteps(arr);
    }
    
    // Fallback - should not happen in normal operation
    throw new Error('BubbleSortSteps not loaded');
}

/**
 * Simple bubble sort function wrapper for backward compatibility
 * @param {number[]} arr - Array to sort
 * @returns {number[]} Sorted array
 */
function bubbleSort(arr) {
    // Ensure core functions are available
    ensureCoreFunctions();
    
    if (window.BubbleSortCore && window.BubbleSortCore.bubbleSort) {
        const result = window.BubbleSortCore.bubbleSort(arr);
        return result.sortedArray;
    }
    
    // Fallback - should not happen in normal operation
    throw new Error('BubbleSortCore not loaded');
}

// Browser compatibility - expose visualization functions to global scope
if (typeof window !== 'undefined') {
    window.BubbleSortVisualization = {
        bubbleSortWithSteps,
        BubbleSort
    };
    // Expose commonly used functions in global scope for demo configs
    window.bubbleSortWithSteps = bubbleSortWithSteps;
    window.bubbleSort = bubbleSort;
    window.BubbleSort = BubbleSort;
    
    // Also expose core functions for backward compatibility
    window.bubbleSortSimple = window.bubbleSortSimple || function(arr) {
        if (window.BubbleSortCore) {
            const result = window.BubbleSortCore.bubbleSort(arr);
            return result.sortedArray;
        }
        throw new Error('BubbleSortCore not loaded');
    };
}

// Export for CommonJS compatibility
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        bubbleSortWithSteps,
        BubbleSort, 
        bubbleSort 
    };
}
