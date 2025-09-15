/**
 * Count and Say - Core Algorithm Implementation
 * 
 * The Count and Say sequence is a sequence of digit strings defined by the recurrence relation:
 * - countAndSay(1) = "1"
 * - countAndSay(n) is the way you would "say" the digit string from countAndSay(n-1)
 * 
 * For example:
 * - countAndSay(1) = "1"
 * - countAndSay(2) = say "1" = one 1 = "11" 
 * - countAndSay(3) = say "11" = two 1's = "21"
 * - countAndSay(4) = say "21" = one 2 + one 1 = "1211"
 * 
 * Time Complexity: O(n * m) where n is the term number and m is the length of the string
 * Space Complexity: O(m) where m is the length of the current string
 * 
 * @see https://github.com/sachinlala/SimplifyLearning
 */

/**
 * Generate Count and Say sequence starting from a given number
 * @param {number} startingNumber - The starting number for the sequence
 * @param {number} rowNumber - The row number to generate (0-based)
 * @returns {string} The Count and Say sequence for the given row
 */
function generateCountAndSay(startingNumber, rowNumber) {
    // Input validation
    if (startingNumber <= 0 || rowNumber < 0) {
        throw new Error('Invalid input: startingNumber must be positive, rowNumber must be non-negative');
    }
    
    // Upper bound check to prevent memory issues
    if (rowNumber > 40) {
        throw new Error('Row number too large (max 40): may cause out-of-memory error');
    }
    
    // Base case: row 0 is the starting number itself
    if (rowNumber === 0) {
        return startingNumber.toString();
    }
    
    let current = startingNumber.toString();
    
    // Generate sequence up to the requested row
    for (let i = 1; i <= rowNumber; i++) {
        current = getNext(current);
    }
    
    return current;
}

/**
 * Generate the next sequence in Count and Say
 * @param {string} sequence - Current sequence as string
 * @returns {string} Next sequence
 */
function getNext(sequence) {
    let result = '';
    let count = 1;
    let currentChar = sequence[0];
    
    for (let i = 1; i < sequence.length; i++) {
        if (sequence[i] === currentChar) {
            count++;
        } else {
            result += count + currentChar;
            currentChar = sequence[i];
            count = 1;
        }
    }
    
    // Add the last group
    result += count + currentChar;
    
    return result;
}

/**
 * Generate multiple rows of Count and Say sequence
 * @param {number} startingNumber - The starting number
 * @param {number} maxRows - Maximum number of rows to generate
 * @returns {Array<Object>} Array of row objects with row number and sequence
 */
function generateMultipleRows(startingNumber, maxRows) {
    const results = [];
    let current = startingNumber.toString();
    
    results.push({
        row: 0,
        sequence: current,
        length: current.length
    });
    
    for (let i = 1; i < maxRows; i++) {
        current = getNext(current);
        results.push({
            row: i,
            sequence: current,
            length: current.length
        });
    }
    
    return results;
}

/**
 * Count and Say with detailed metrics
 * @param {number} startingNumber - The starting number
 * @param {number} rowNumber - The row number to generate
 * @returns {Object} Result with sequence, metrics, and process details
 */
function countAndSay(startingNumber, rowNumber) {
    if (startingNumber <= 0 || rowNumber < 0) {
        return {
            sequence: '',
            error: 'Invalid input: startingNumber must be positive, rowNumber must be non-negative',
            iterations: 0,
            finalLength: 0
        };
    }
    
    if (rowNumber > 40) {
        return {
            sequence: '',
            error: 'Row number too large (max 40): may cause out-of-memory error',
            iterations: 0,
            finalLength: 0
        };
    }
    
    let current = startingNumber.toString();
    let iterations = 0;
    const processHistory = [{
        row: 0,
        sequence: current,
        length: current.length,
        description: `Starting with: ${current}`
    }];
    
    for (let i = 1; i <= rowNumber; i++) {
        const previous = current;
        current = getNext(current);
        iterations++;
        
        processHistory.push({
            row: i,
            sequence: current,
            length: current.length,
            description: `Row ${i}: Reading "${previous}" → "${current}"`
        });
    }
    
    return {
        sequence: current,
        iterations,
        finalLength: current.length,
        processHistory,
        totalGrowth: current.length / startingNumber.toString().length
    };
}

/**
 * Simple count and say function for backward compatibility
 * @param {number} startingNumber - The starting number
 * @param {number} rowNumber - The row number to generate
 * @returns {string} The Count and Say sequence for the given row
 */
function countAndSaySimple(startingNumber, rowNumber) {
    const result = generateCountAndSay(startingNumber, rowNumber);
    return result;
}

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateCountAndSay,
        getNext,
        generateMultipleRows,
        countAndSay,
        countAndSaySimple
    };
} else if (typeof window !== 'undefined') {
    window.CountAndSayCore = {
        generateCountAndSay,
        getNext,
        generateMultipleRows,
        countAndSay,
        countAndSaySimple
    };
    // Expose commonly used functions for configs
    window.generateCountAndSay = generateCountAndSay;
    window.getNext = getNext;
    // Global function for backward compatibility
    window.countAndSay = countAndSaySimple;
}