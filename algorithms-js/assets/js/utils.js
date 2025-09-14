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

// Utility function to get maximum value from an array
function getMax(arr) {
    if (!arr || !arr.length) return undefined;
    return Math.max(...arr);
}

// Utility function to get minimum value from an array
function getMin(arr) {
    if (!arr || !arr.length) return undefined;
    return Math.min(...arr);
}

// Utility function to get maximum value (wrapper for Math.max)
function getMaxValue(...args) {
    return Math.max(...args);
}

// Utility function to round a number (wrapper for Math.round)
function roundNumber(num) {
    return Math.round(num);
}

// Utility function to calculate the height of a bar given its value and max height
function calculateBarHeight(value, minValue, maxValue, minHeight = 40, maxHeight = 200) {
    if (maxValue === minValue) return minHeight;
    const normalizedValue = (value - minValue) / (maxValue - minValue);
    return minHeight + (normalizedValue * (maxHeight - minHeight));
}

// Utility function to generate style for a bar based on its height
function generateBarStyle(height, color = '#4ecdc4', width = 30) {
    return `height: ${height}px; background-color: ${color}; margin: 2px; display: inline-block; width: ${width}px; transition: all 0.3s ease; text-align: center; line-height: ${height}px; color: white; font-weight: bold; border-radius: 4px;`;
}

// UI and rendering-related utilities

/**
 * Wrap long text with line breaks
 */
function wrapLongText(text, maxLength = 50) {
    if (!text || text.length <= maxLength) return text;

    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
        if ((currentLine + word).length <= maxLength) {
            currentLine += (currentLine ? ' ' : '') + word;
        } else {
            if (currentLine) lines.push(currentLine);
            currentLine = word;
        }
    }

    if (currentLine) lines.push(currentLine);
    return lines.join('<br>');
}

/**
 * Format numbers with proper separators
 */
function formatNumber(num) {
    if (typeof num !== 'number') return num;
    return num.toLocaleString();
}

/**
 * Create a debounced version of a function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Copy text to clipboard
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            return true;
        } catch (fallbackErr) {
            return false;
        } finally {
            document.body.removeChild(textArea);
        }
    }
}

// Export for Node.js if available
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        parseArray,
        isSorted,
        measureTime,
        generateRandomArray,
        generateRandomSortedArray,
        getMax,
        getMin,
        getMaxValue,
        roundNumber,
        calculateBarHeight,
        generateBarStyle,
        wrapLongText,
        formatNumber,
        debounce,
        copyToClipboard
    };
}

// Export to global window object for browser compatibility
if (typeof window !== 'undefined') {
    // Attach all utility functions to the global window object
    window.parseArray = parseArray;
    window.isSorted = isSorted;
    window.measureTime = measureTime;
    window.generateRandomArray = generateRandomArray;
    window.generateRandomSortedArray = generateRandomSortedArray;
    window.getMax = getMax;
    window.getMin = getMin;
    window.getMaxValue = getMaxValue;
    window.roundNumber = roundNumber;
    window.calculateBarHeight = calculateBarHeight;
    window.generateBarStyle = generateBarStyle;
    window.wrapLongText = wrapLongText;
    window.formatNumber = formatNumber;
    window.debounce = debounce;
    window.copyToClipboard = copyToClipboard;
}
