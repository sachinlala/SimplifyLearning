/**
 * Wiggle Sort - Manual Test Runner
 * 
 * Simple test to verify the Wiggle Sort implementation works correctly.
 * 
 * @see https://github.com/sachinlala/SimplifyLearning
 */

// Import the algorithm
const {
    wiggleSortI,
    wiggleSortII,
    wiggleSortWithSteps,
    isWiggleSorted,
    getWigglePattern
} = require('./wiggle-sort-core.js');

const {
    WIGGLE_SORT_CONFIG,
    WiggleSortConfigUtils
} = require('./wiggle-sort-config.js');

// Test utilities
function validateWigglePattern(arr, variant = "I") {
    if (!arr || arr.length <= 1) return true;
    
    for (let i = 0; i < arr.length - 1; i++) {
        const isEven = i % 2 === 0;
        
        if (isEven && arr[i] >= arr[i + 1]) {
            return false; // Valley should be < peak
        }
        
        if (!isEven && arr[i] <= arr[i + 1]) {
            return false; // Peak should be > valley
        }

        // For Wiggle Sort II, no adjacent duplicates
        if (variant === "II" && arr[i] === arr[i + 1]) {
            return false;
        }
    }
    return true;
}

// Test cases
console.log('🌊 Running Wiggle Sort Manual Tests...\n');

let passedTests = 0;
let totalTests = 0;

function runTest(testName, testFunction) {
    totalTests++;
    try {
        testFunction();
        console.log(`✅ ${testName}`);
        passedTests++;
    } catch (error) {
        console.log(`❌ ${testName}: ${error.message}`);
    }
}

// Test 1: Basic Wiggle Sort I
runTest('Basic Wiggle Sort I', () => {
    const input = [3, 5, 2, 1, 6, 4];
    const result = wiggleSortI(input);
    
    if (!validateWigglePattern(result.sortedArray, "I")) {
        throw new Error('Invalid wiggle pattern');
    }
    if (result.metrics.comparisons === 0) {
        throw new Error('No comparisons recorded');
    }
    
    console.log(`   Input: [${input.join(', ')}]`);
    console.log(`   Output: [${result.sortedArray.join(', ')}]`);
    console.log(`   Pattern: ${getWigglePattern(result.sortedArray)}`);
    console.log(`   Metrics: ${result.metrics.comparisons} comparisons, ${result.metrics.swaps} swaps`);
});

// Test 2: Wiggle Sort II with duplicates
runTest('Wiggle Sort II (No Duplicates)', () => {
    const input = [1, 5, 1, 1, 6, 4];
    const result = wiggleSortII(input);
    
    if (!validateWigglePattern(result.sortedArray, "II")) {
        throw new Error('Invalid wiggle pattern for Sort II');
    }
    
    // Check no adjacent duplicates
    for (let i = 0; i < result.sortedArray.length - 1; i++) {
        if (result.sortedArray[i] === result.sortedArray[i + 1]) {
            throw new Error('Adjacent duplicates found in Sort II');
        }
    }
    
    console.log(`   Input: [${input.join(', ')}]`);
    console.log(`   Output: [${result.sortedArray.join(', ')}]`);
    console.log(`   Pattern: ${getWigglePattern(result.sortedArray)}`);
});

// Test 3: Already wiggling pattern
runTest('Already wiggling array', () => {
    const input = [1, 3, 2, 5, 4, 6];
    const result = wiggleSortI(input);
    
    if (!validateWigglePattern(result.sortedArray, "I")) {
        throw new Error('Failed to maintain valid wiggle pattern');
    }
    
    console.log(`   Input: [${input.join(', ')}] (already wiggling)`);
    console.log(`   Output: [${result.sortedArray.join(', ')}]`);
    console.log(`   Swaps needed: ${result.metrics.swaps}`);
});

// Test 4: Edge case - empty array
runTest('Edge case - empty array', () => {
    const result = wiggleSortI([]);
    
    if (result.sortedArray.length !== 0) {
        throw new Error('Empty array should remain empty');
    }
    if (result.metrics.comparisons !== 0 || result.metrics.swaps !== 0) {
        throw new Error('Empty array should have zero operations');
    }
    
    console.log(`   Empty array handled correctly`);
});

// Test 5: Edge case - single element
runTest('Edge case - single element', () => {
    const input = [42];
    const result = wiggleSortI(input);
    
    if (result.sortedArray.length !== 1 || result.sortedArray[0] !== 42) {
        throw new Error('Single element not preserved');
    }
    
    console.log(`   Single element handled correctly`);
});

// Test 6: Two elements
runTest('Two element array', () => {
    const input = [5, 2];
    const result = wiggleSortI(input);
    
    if (!validateWigglePattern(result.sortedArray, "I")) {
        throw new Error('Two element wiggle pattern invalid');
    }
    
    console.log(`   Input: [${input.join(', ')}]`);
    console.log(`   Output: [${result.sortedArray.join(', ')}]`);
    console.log(`   Pattern: ${getWigglePattern(result.sortedArray)}`);
});

// Test 7: Identical elements
runTest('Identical elements', () => {
    const input = [7, 7, 7, 7];
    const result = wiggleSortI(input);
    
    if (!result.sortedArray.every(x => x === 7)) {
        throw new Error('Identical elements not preserved');
    }
    
    console.log(`   Input: [${input.join(', ')}]`);
    console.log(`   Output: [${result.sortedArray.join(', ')}]`);
    console.log(`   Pattern: ${getWigglePattern(result.sortedArray)} (expected equals)`);
});

// Test 8: Step-by-step visualization
runTest('Step-by-step algorithm tracking', () => {
    const input = [3, 1, 4, 2];
    const result = wiggleSortWithSteps(input, "I");
    
    if (result.steps.length === 0) {
        throw new Error('No steps recorded');
    }
    if (result.steps[0].type !== 'start') {
        throw new Error('First step should be "start"');
    }
    if (result.steps[result.steps.length - 1].type !== 'complete') {
        throw new Error('Last step should be "complete"');
    }
    if (!validateWigglePattern(result.sortedArray, "I")) {
        throw new Error('Invalid wiggle pattern in step-by-step result');
    }
    
    console.log(`   Generated ${result.steps.length} steps for visualization`);
    console.log(`   Final pattern: ${getWigglePattern(result.sortedArray)}`);
});

// Test 9: Pattern validation
runTest('Pattern validation functions', () => {
    const validWiggle = [1, 3, 2, 5, 4];
    const invalidWiggle = [3, 1, 4, 2, 5];
    
    const valid = isWiggleSorted(validWiggle, "I");
    const invalid = isWiggleSorted(invalidWiggle, "I");
    
    if (!valid.valid) {
        throw new Error('Valid wiggle pattern reported as invalid');
    }
    if (invalid.valid) {
        throw new Error('Invalid wiggle pattern reported as valid');
    }
    
    console.log(`   Pattern validation working correctly`);
});

// Test 10: Configuration presets
runTest('Configuration presets validation', () => {
    const basicPreset = WiggleSortConfigUtils.getPresetByName('Basic Wiggle Sort I');
    
    if (!basicPreset) {
        throw new Error('Basic preset not found');
    }
    if (basicPreset.variant !== 'I') {
        throw new Error('Basic preset variant incorrect');
    }
    
    const result = wiggleSortI(basicPreset.array);
    if (!validateWigglePattern(result.sortedArray, "I")) {
        throw new Error('Basic preset failed to sort correctly');
    }
    
    console.log(`   Basic preset validated successfully`);
});

// Test 11: Negative numbers
runTest('Negative numbers handling', () => {
    const input = [-1, 3, -2, 5, -3, 7];
    const result = wiggleSortI(input);
    
    if (!validateWigglePattern(result.sortedArray, "I")) {
        throw new Error('Negative numbers wiggle pattern invalid');
    }
    
    console.log(`   Input: [${input.join(', ')}]`);
    console.log(`   Output: [${result.sortedArray.join(', ')}]`);
    console.log(`   Pattern: ${getWigglePattern(result.sortedArray)}`);
});

// Test 12: Performance test with larger array
runTest('Performance test with 100 elements', () => {
    const largeArray = WiggleSortConfigUtils.generateRandomWiggleArray(100);
    
    const startTime = process.hrtime.bigint();
    const result = wiggleSortI(largeArray);
    const endTime = process.hrtime.bigint();
    
    const duration = Number(endTime - startTime) / 1000000; // Convert to milliseconds
    
    if (!validateWigglePattern(result.sortedArray, "I")) {
        throw new Error('Large array not wiggle sorted correctly');
    }
    
    if (duration > 50) { // Should be very fast
        throw new Error(`Performance too slow: ${duration}ms`);
    }
    
    console.log(`   Sorted 100 elements in ${duration.toFixed(2)}ms`);
});

// Summary
console.log(`\n📊 Test Results:`);
console.log(`✅ Passed: ${passedTests}/${totalTests} tests`);

if (passedTests === totalTests) {
    console.log('🎉 All tests passed! Wiggle Sort implementation is working correctly.');
} else {
    console.log(`❌ ${totalTests - passedTests} tests failed. Please review the implementation.`);
    process.exit(1);
}