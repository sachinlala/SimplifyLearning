// Math-specific utilities

/**
 * Find the maximum value in an array
 */
function getMax(arr) {
    if (!arr || arr.length === 0) return null;
    return Math.max(...arr);
}

/**
 * Find the minimum value in an array
 */
function getMin(arr) {
    if (!arr || arr.length === 0) return null;
    return Math.min(...arr);
}

// Continue with other computation functions from utils.js

