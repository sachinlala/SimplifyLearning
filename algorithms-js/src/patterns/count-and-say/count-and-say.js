/**
 * Count and Say - Visualization and Step-by-Step Implementation
 * 
 * This file contains the visualization functions for Count and Say algorithm.
 * The core algorithm logic is in count-and-say-core.js.
 * 
 * @see https://github.com/sachinlala/SimplifyLearning
 */

// Core algorithm functions are loaded from count-and-say-core.js via script tag
// In browser environment, these functions are available in the global scope via window.CountAndSayCore

// For compatibility, create references to core functions (loaded dynamically)
// Note: Core functions are available globally via window.CountAndSayCore when needed

// Safe dependency loading - check for core functions when needed
function ensureCoreFunctions() {
    // Core functions are available via window.CountAndSayCore when needed
    // No local variables needed since we're not using them in this file
}

/**
 * Generate Count and Say sequence with step-by-step visualization data
 * @param {number} startingNumber - The starting number
 * @param {number} rowNumber - The row number to generate
 * @returns {Array<Object>} Array of step objects for visualization
 */
function generateCountAndSayWithSteps(startingNumber, rowNumber) {
    // Ensure core functions are available (safe late binding)
    ensureCoreFunctions();
    
    if (startingNumber <= 0 || rowNumber < 0) {
        throw new Error('Invalid input: startingNumber must be positive, rowNumber must be non-negative');
    }
    
    if (rowNumber > 12) {
        throw new Error('Row number limited to 12 for demo purposes');
    }
    
    const steps = [];
    let current = startingNumber.toString();
    
    steps.push({
        row: 0,
        sequence: current,
        description: `Starting with: ${current}`,
        process: []
    });
    
    for (let row = 1; row <= rowNumber; row++) {
        const processSteps = [];
        let result = '';
        let i = 0;
        
        while (i < current.length) {
            let count = 1;
            const digit = current[i];
            
            // Count consecutive identical digits
            while (i + count < current.length && current[i + count] === digit) {
                count++;
            }
            
            processSteps.push({
                startIndex: i,
                endIndex: i + count - 1,
                digit: digit,
                count: count,
                saying: `${count} ${digit}${count > 1 ? 's' : ''}`
            });
            
            result += count.toString() + digit;
            i += count;
        }
        
        steps.push({
            row: row,
            sequence: result,
            previous: current,
            description: `Row ${row}: Reading "${current}" → "${result}"`,
            process: processSteps
        });
        
        current = result;
    }
    
    return steps;
}

// Export for module environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateCountAndSay, getNext };
}

// Make available globally for browser use
if (typeof window !== 'undefined') {
    window.generateCountAndSay = generateCountAndSay;
    window.getNext = getNext;
}

// Example usage:
// generateCountAndSay(4, 5);  // Output: ["1", "11", "21", "1211"]

