/**
 * Binary Search - Visualization and Step-by-Step Implementation
 * 
 * This file contains the visualization functions for Binary Search algorithm.
 * The core algorithm logic is in binary-search-core.js.
 * 
 * @author SimplifyLearning
 * @see https://github.com/sachinlala/SimplifyLearning
 */

// Core algorithm functions are loaded from binary-search-core.js via script tag
// In browser environment, these functions are available in the global scope via window.BinarySearchCore

// For compatibility, create references to core functions (loaded dynamically)
// Note: Core functions are available globally via window.BinarySearchCore when needed

// Safe dependency loading - check for core functions when needed
function ensureCoreFunctions() {
    // Core functions are available via window.BinarySearchCore when needed
    // No local variables needed since we're not using them in this file
}

/**
 * Binary search with step-by-step visualization data
 * @param {number[]} sortedArray - The sorted array to search in
 * @param {number} target - The target element to find
 * @returns {Object} Result with index and step-by-step data
 */
function binarySearchWithSteps(sortedArray, target) {
    if (!Array.isArray(sortedArray) || sortedArray.length === 0) {
        throw new Error('Input must be a non-empty array');
    }

    const steps = [];
    let start = 0;
    let end = sortedArray.length - 1;
    let stepCount = 0;

    while (start <= end) {
        stepCount++;
        const mid = Math.floor((start + end) / 2);
        const midValue = sortedArray[mid];

        steps.push({
            step: stepCount,
            start,
            end,
            mid,
            midValue,
            target,
            comparison: target === midValue ? 'equal' : target < midValue ? 'less' : 'greater',
            found: target === midValue
        });

        if (midValue === target) {
            return {
                index: mid,
                found: true,
                steps,
                totalComparisons: stepCount
            };
        } else if (target < midValue) {
            end = mid - 1;
        } else {
            start = mid + 1;
        }
    }

    return {
        index: -1,
        found: false,
        steps,
        totalComparisons: stepCount
    };
}

// Browser compatibility - expose visualization functions to global scope
if (typeof window !== 'undefined') {
    window.BinarySearchVisualization = {
        binarySearchWithSteps
    };
    // Expose commonly used functions in global scope for demo configs
    window.binarySearchWithSteps = binarySearchWithSteps;
    
    // Also expose core functions for backward compatibility
    window.binarySearchIterative = window.binarySearchIterative || function(arr, target) {
        if (window.BinarySearchCore) {
            return window.BinarySearchCore.binarySearchIterative(arr, target);
        }
        throw new Error('BinarySearchCore not loaded');
    };
    
    window.binarySearchRecursive = window.binarySearchRecursive || function(arr, target, start, end) {
        if (window.BinarySearchCore) {
            return window.BinarySearchCore.binarySearchRecursive(arr, target, start, end);
        }
        throw new Error('BinarySearchCore not loaded');
    };
}
