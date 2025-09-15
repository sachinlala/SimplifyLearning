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

// Utility function to get maximum value from an array (supports mixed types)
function getMax(arr) {
    if (!arr || !arr.length) return undefined;
    // Handle mixed arrays (numbers and strings)
    const numericValues = arr.map(v => typeof v === 'number' ? v : v.toString().length);
    return Math.max(...numericValues);
}

// Utility function to get minimum value from an array (supports mixed types)
function getMin(arr) {
    if (!arr || !arr.length) return undefined;
    // Handle mixed arrays (numbers and strings)
    const numericValues = arr.map(v => typeof v === 'number' ? v : v.toString().length);
    return Math.min(...numericValues);
}

// Utility function to get maximum value (wrapper for Math.max)
function getMaxValue(...args) {
    return Math.max(...args);
}

// Utility function to round a number (wrapper for Math.round)
function roundNumber(num) {
    return Math.round(num);
}

// Utility function to calculate the height of a bar given its value and max height (supports mixed types)
function calculateBarHeight(value, minValue, maxValue, minHeight = 40, maxHeight = 200) {
    if (maxValue === minValue) return minHeight + ((maxHeight - minHeight) / 2); // Middle height for equal values
    
    // Handle mixed types (numbers and strings)
    const numericValue = typeof value === 'number' ? value : value.toString().length;
    const numericMin = typeof minValue === 'number' ? minValue : (typeof minValue === 'string' ? minValue.toString().length : minValue);
    const numericMax = typeof maxValue === 'number' ? maxValue : (typeof maxValue === 'string' ? maxValue.toString().length : maxValue);
    
    const normalizedValue = (numericValue - numericMin) / (numericMax - numericMin);
    return Math.round(minHeight + (normalizedValue * (maxHeight - minHeight)));
}

// Utility function to generate modern bar style with enhanced visuals and dark mode support
function generateBarStyle(height, color = 'rgba(78, 205, 196, 0.8)', width = 50, options = {}) {
    const defaults = {
        borderWidth: 2,
        borderRadius: 4,
        margin: 2,
        padding: 2,
        transition: 'all 0.3s ease',
        textColor: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        boxShadow: 'none'
    };
    
    const config = { ...defaults, ...options };
    
    // Auto-determine border color from main color
    const borderColor = color.includes('rgba') || color.includes('rgb') 
        ? color.replace(/[\d\.]+\)$/g, '1)').replace('rgba', 'rgb') 
        : color;
    
    return `
        height: ${Math.round(height)}px;
        width: ${width}px;
        background: ${color};
        border: ${config.borderWidth}px solid ${borderColor};
        border-radius: ${config.borderRadius}px;
        margin: ${config.margin}px;
        padding: ${config.padding}px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        transition: ${config.transition};
        color: ${config.textColor};
        font-size: ${config.fontSize}px;
        font-weight: ${config.fontWeight};
        position: relative;
        box-sizing: border-box;
        ${config.boxShadow !== 'none' ? `box-shadow: ${config.boxShadow};` : ''}
    `.trim().replace(/\s+/g, ' ');
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
