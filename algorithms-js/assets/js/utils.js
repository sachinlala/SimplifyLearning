/**
 * Utility functions for algorithm demonstrations
 */

// Utility function for parsing input arrays from string
function parseArray(input) {
    try {
        // Remove whitespace and split by comma or space
        return input.trim()
            .split(/[,\s]+/)
            .filter(item => item !== '')
            .map(item => {
                // Try to parse as number first
                const num = parseFloat(item);
                return isNaN(num) ? item.trim() : num;
            });
    } catch (error) {
        throw new Error('Invalid array format');
    }
}

// Utility function for validating sorted arrays
function isSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] > arr[i]) {
            return false;
        }
    }
    return true;
}

// Utility function for timing execution
function measureTime(fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    return {
        result: result,
        time: (end - start).toFixed(4)
    };
}

// Utility function for generating random arrays
function generateRandomArray(size, min = 1, max = 100) {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return arr;
}

// Utility function for generating random sorted arrays
function generateRandomSortedArray(size, min = 1, max = 100) {
    const arr = generateRandomArray(size, min, max);
    return arr.sort((a, b) => a - b);
}

// Export for Node.js if available
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        parseArray,
        isSorted,
        measureTime,
        generateRandomArray,
        generateRandomSortedArray
    };
}
