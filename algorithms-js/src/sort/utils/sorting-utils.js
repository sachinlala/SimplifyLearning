/**
 * Sorting Utilities - Reusable Functions
 * 
 * Central repository for common functions used across sorting algorithms.
 * Follows DRY principle to avoid code duplication.
 * 
 * @see https://github.com/sachinlala/SimplifyLearning
 */

// ========================================
// VALIDATION FUNCTIONS
// ========================================

/**
 * Validates that array contains only non-negative integers
 * @param {Array} arr - Array to validate
 * @returns {Object} Validation result
 */
function validateNonNegativeIntegers(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (!Number.isInteger(arr[i]) || arr[i] < 0) {
            return {
                valid: false,
                message: `Algorithm requires non-negative integers. Found: ${arr[i]} at index ${i}`
            };
        }
    }
    return { valid: true };
}

/**
 * Validates that array contains only integers (positive, negative, or zero)
 * @param {Array} arr - Array to validate
 * @returns {Object} Validation result
 */
function validateIntegers(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (!Number.isInteger(arr[i])) {
            return {
                valid: false,
                message: `Algorithm requires integers. Found: ${arr[i]} at index ${i}`
            };
        }
    }
    return { valid: true };
}

/**
 * Validates array and returns basic info
 * @param {Array} arr - Array to validate
 * @param {Object} constraints - Validation constraints
 * @returns {Object} Validation result with array info
 */
function validateArrayWithConstraints(arr, constraints = {}) {
    if (!Array.isArray(arr)) {
        return { valid: false, message: 'Input must be an array' };
    }

    if (arr.length === 0 && constraints.minSize > 0) {
        return { valid: false, message: 'Array cannot be empty' };
    }

    if (constraints.minSize && arr.length < constraints.minSize) {
        return { valid: false, message: `Array must have at least ${constraints.minSize} elements` };
    }

    if (constraints.maxSize && arr.length > constraints.maxSize) {
        return { valid: false, message: `Array cannot have more than ${constraints.maxSize} elements` };
    }

    // Check value constraints
    for (let i = 0; i < arr.length; i++) {
        const val = arr[i];
        
        if (constraints.allowNegative === false && val < 0) {
            return { valid: false, message: `Negative values not allowed. Found: ${val} at index ${i}` };
        }
        
        if (constraints.minValue !== undefined && val < constraints.minValue) {
            return { valid: false, message: `Value ${val} at index ${i} is below minimum ${constraints.minValue}` };
        }
        
        if (constraints.maxValue !== undefined && val > constraints.maxValue) {
            return { valid: false, message: `Value ${val} at index ${i} exceeds maximum ${constraints.maxValue}` };
        }
    }

    return { valid: true };
}

// ========================================
// ARRAY UTILITY FUNCTIONS
// ========================================

/**
 * Safely copies an array
 * @param {Array} arr - Array to copy
 * @returns {Array} Deep copy of array
 */
function copyArray(arr) {
    return arr ? [...arr] : [];
}

/**
 * Swaps two elements in an array
 * @param {Array} arr - Array to modify
 * @param {number} i - First index
 * @param {number} j - Second index
 */
function swap(arr, i, j) {
    if (i !== j && i >= 0 && j >= 0 && i < arr.length && j < arr.length) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        return true;
    }
    return false;
}

/**
 * Finds maximum value in array
 * @param {Array} arr - Array of numbers
 * @returns {number} Maximum value
 */
function findMax(arr) {
    if (!arr || arr.length === 0) return 0;
    return Math.max(...arr);
}

/**
 * Finds minimum value in array
 * @param {Array} arr - Array of numbers
 * @returns {number} Minimum value
 */
function findMin(arr) {
    if (!arr || arr.length === 0) return 0;
    return Math.min(...arr);
}

/**
 * Generates a random array for testing
 * @param {number} size - Array size
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {Array} Random array
 */
function generateRandomArray(size, min = 0, max = 100) {
    return Array.from({ length: size }, () => 
        Math.floor(Math.random() * (max - min + 1)) + min
    );
}

/**
 * Checks if array is sorted
 * @param {Array} arr - Array to check
 * @param {boolean} ascending - True for ascending, false for descending
 * @returns {boolean} True if sorted
 */
function isSorted(arr, ascending = true) {
    for (let i = 1; i < arr.length; i++) {
        if (ascending ? arr[i] < arr[i-1] : arr[i] > arr[i-1]) {
            return false;
        }
    }
    return true;
}

// ========================================
// INPUT PREPROCESSING FUNCTIONS
// ========================================

/**
 * Standard input preprocessor for integer arrays
 * @param {*} input - Input to process (string, array, etc.)
 * @param {Object} options - Processing options
 * @returns {Array} Processed array
 */
function preprocessIntegerArray(input, options = {}) {
    let processed = [];
    
    if (typeof input === 'string') {
        // Parse comma-separated string
        processed = input.split(',')
            .map(s => s.trim())
            .filter(s => s.length > 0)
            .map(s => parseFloat(s))
            .filter(n => !isNaN(n));
    } else if (Array.isArray(input)) {
        processed = input.map(x => Number(x)).filter(n => !isNaN(n));
    } else {
        processed = [Number(input)].filter(n => !isNaN(n));
    }
    
    // Apply transformations
    if (options.integers) {
        processed = processed.map(x => Math.floor(x));
    }
    
    if (options.nonNegative) {
        processed = processed.map(x => Math.max(0, x));
    }
    
    if (options.maxValue !== undefined) {
        processed = processed.map(x => Math.min(x, options.maxValue));
    }
    
    if (options.minValue !== undefined) {
        processed = processed.map(x => Math.max(x, options.minValue));
    }
    
    return processed;
}

// ========================================
// PERFORMANCE MEASUREMENT
// ========================================

/**
 * Basic performance metrics tracker
 */
class PerformanceTracker {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.comparisons = 0;
        this.swaps = 0;
        this.assignments = 0;
        this.startTime = null;
        this.endTime = null;
    }
    
    start() {
        this.startTime = performance.now();
    }
    
    end() {
        this.endTime = performance.now();
    }
    
    getMetrics() {
        return {
            comparisons: this.comparisons,
            swaps: this.swaps,
            assignments: this.assignments,
            timeMs: this.endTime && this.startTime ? this.endTime - this.startTime : 0
        };
    }
    
    incrementComparisons(count = 1) {
        this.comparisons += count;
    }
    
    incrementSwaps(count = 1) {
        this.swaps += count;
    }
    
    incrementAssignments(count = 1) {
        this.assignments += count;
    }
}

// ========================================
// COMMON STEP GENERATORS
// ========================================

/**
 * Creates a standard initialization step
 * @param {Array} array - Current array state
 * @param {string} algorithmName - Name of algorithm
 * @returns {Object} Step object
 */
function createInitStep(array, algorithmName) {
    return {
        type: 'start',
        array: copyArray(array),
        message: `Starting ${algorithmName}`,
        phase: 'initialization',
        highlightIndices: []
    };
}

/**
 * Creates a completion step
 * @param {Array} array - Final sorted array
 * @param {Object} metrics - Algorithm metrics
 * @param {string} algorithmName - Name of algorithm
 * @returns {Object} Step object
 */
function createCompletionStep(array, metrics, algorithmName) {
    return {
        type: 'complete',
        array: copyArray(array),
        message: `${algorithmName} completed! Array is now sorted.`,
        phase: 'complete',
        highlightIndices: [],
        metrics
    };
}

/**
 * Creates a comparison step
 * @param {Array} array - Current array state
 * @param {number} i - First index being compared
 * @param {number} j - Second index being compared
 * @param {boolean} result - Comparison result
 * @param {string} message - Custom message
 * @returns {Object} Step object
 */
function createComparisonStep(array, i, j, result, message) {
    return {
        type: 'compare',
        array: copyArray(array),
        message: message || `Comparing elements at indices ${i} and ${j}: ${array[i]} ${result ? '>' : '≤'} ${array[j]}`,
        phase: 'comparison',
        highlightIndices: [i, j],
        comparisonResult: result
    };
}

/**
 * Creates a swap step
 * @param {Array} array - Array state after swap
 * @param {number} i - First index swapped
 * @param {number} j - Second index swapped
 * @param {string} message - Custom message
 * @returns {Object} Step object
 */
function createSwapStep(array, i, j, message) {
    return {
        type: 'swap',
        array: copyArray(array),
        message: message || `Swapped elements at indices ${i} and ${j}`,
        phase: 'swap',
        highlightIndices: [i, j],
        swappedIndices: [i, j]
    };
}

// ========================================
// TIME COMPLEXITY HELPERS
// ========================================

/**
 * Gets complexity class information
 * @param {string} complexity - Time complexity (e.g., 'O(n log n)')
 * @returns {Object} Complexity information
 */
function getComplexityInfo(complexity) {
    const complexityMap = {
        'O(1)': { class: 'constant', efficiency: 'excellent', color: '#2ecc71' },
        'O(log n)': { class: 'logarithmic', efficiency: 'excellent', color: '#27ae60' },
        'O(n)': { class: 'linear', efficiency: 'good', color: '#f39c12' },
        'O(n log n)': { class: 'linearithmic', efficiency: 'good', color: '#e67e22' },
        'O(n²)': { class: 'quadratic', efficiency: 'poor', color: '#e74c3c' },
        'O(2^n)': { class: 'exponential', efficiency: 'terrible', color: '#c0392b' }
    };
    
    return complexityMap[complexity] || { class: 'unknown', efficiency: 'unknown', color: '#95a5a6' };
}

// ========================================
// COMMON CONFIGURATIONS
// ========================================

/**
 * Standard visualization colors
 */
const VISUALIZATION_COLORS = {
    default: '#e3f2fd',      // Light blue
    highlight: '#2196f3',     // Blue
    compare: '#ff9800',       // Orange
    swap: '#f44336',          // Red
    sorted: '#4caf50',        // Green
    pivot: '#9c27b0',         // Purple
    merge: '#00bcd4',         // Cyan
    complete: '#8bc34a'       // Light green
};

/**
 * Standard animation speeds (in milliseconds)
 */
const ANIMATION_SPEEDS = {
    verySlow: 3000,
    slow: 2000,
    medium: 1000,
    fast: 500,
    veryFast: 200
};

/**
 * Common constraint sets for algorithms
 */
const COMMON_CONSTRAINTS = {
    small: { minSize: 1, maxSize: 20, minValue: 0, maxValue: 100 },
    medium: { minSize: 1, maxSize: 50, minValue: 0, maxValue: 500 },
    large: { minSize: 1, maxSize: 100, minValue: 0, maxValue: 1000 },
    integers: { allowNegative: true },
    positiveIntegers: { allowNegative: false, minValue: 0 }
};

// ========================================
// EXPORTS
// ========================================

// Export for both Node.js and browser environments
const SortingUtils = {
    // Validation functions
    validateNonNegativeIntegers,
    validateIntegers,
    validateArrayWithConstraints,
    
    // Array utilities
    copyArray,
    swap,
    findMax,
    findMin,
    generateRandomArray,
    isSorted,
    
    // Input processing
    preprocessIntegerArray,
    
    // Performance tracking
    PerformanceTracker,
    
    // Step generators
    createInitStep,
    createCompletionStep,
    createComparisonStep,
    createSwapStep,
    
    // Complexity helpers
    getComplexityInfo,
    
    // Constants
    VISUALIZATION_COLORS,
    ANIMATION_SPEEDS,
    COMMON_CONSTRAINTS
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SortingUtils;
} else if (typeof window !== 'undefined') {
    window.SortingUtils = SortingUtils;
}