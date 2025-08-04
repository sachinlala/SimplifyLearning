// JavaScript implementation of the Count and Say Algorithm

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
 * Generate multiple rows of Count and Say sequence for visualization
 * @param {number} startingNumber - The starting number
 * @param {number} maxRows - Maximum number of rows to generate
 * @returns {Array<string>} Array of sequences
 */
function generateMultipleRows(startingNumber, maxRows) {
    const results = [];
    let current = startingNumber.toString();
    results.push(`Row 0: ${current}`);
    
    for (let i = 1; i < maxRows; i++) {
        current = getNext(current);
        results.push(`Row ${i}: ${current}`);
    }
    
    return results;
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

