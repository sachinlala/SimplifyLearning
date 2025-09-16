/**
 * Dutch National Flag Sort - Manual Test Runner
 * 
 * Simple test to verify the Dutch National Flag Sort implementation works correctly.
 * 
 * @author SimplifyLearning
 * @see https://github.com/sachinlala/SimplifyLearning
 */

// Import the algorithm
const {
    dutchFlagSort,
    dutchFlagSort2Way,
    dutchFlagSortWithSteps,
    sortColors,
    sort012
} = require('./dutch-flag-sort-core.js');

const {
    DUTCH_FLAG_SORT_CONFIG,
    DutchFlagSortConfigUtils
} = require('./dutch-flag-sort-config.js');

// Test utilities
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((val, index) => val === arr2[index]);
}

function isValidPartition(arr, redValue, whiteValue, blueValue) {
    const isTwoWay = (whiteValue === null || whiteValue === undefined);
    let phase = 'red'; // red -> white -> blue

    for (let i = 0; i < arr.length; i++) {
        const current = arr[i];
        
        if (current === redValue) {
            if (phase !== 'red') return false;
        } else if (!isTwoWay && current === whiteValue) {
            if (phase === 'blue') return false;
            if (phase === 'red') phase = 'white';
        } else if (current === blueValue) {
            if (phase === 'red') phase = isTwoWay ? 'blue' : 'white';
            if (phase === 'white') phase = 'blue';
        } else if (isTwoWay) {
            if (phase === 'blue') return false;
            if (phase === 'red') phase = 'white';
        } else {
            return false;
        }
    }
    return true;
}

// Test cases
console.log('🧪 Running Dutch National Flag Sort Manual Tests...\n');

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

// Test 1: Basic 3-way partitioning
runTest('Basic 3-way partitioning (0,1,2)', () => {
    const input = [2, 0, 1, 2, 1, 0];
    const result = dutchFlagSort(input, 0, 1, 2);
    
    if (!isValidPartition(result.sortedArray, 0, 1, 2)) {
        throw new Error('Invalid partition');
    }
    if (result.metrics.comparisons === 0) {
        throw new Error('No comparisons recorded');
    }
    
    console.log(`   Input: [${input.join(', ')}]`);
    console.log(`   Output: [${result.sortedArray.join(', ')}]`);
    console.log(`   Metrics: ${result.metrics.comparisons} comparisons, ${result.metrics.swaps} swaps`);
});

// Test 2: Color sorting
runTest('Color sorting (red, white, blue)', () => {
    const input = ['red', 'blue', 'white', 'red', 'white', 'blue'];
    const result = sortColors(input);
    
    if (!isValidPartition(result.sortedArray, 'red', 'white', 'blue')) {
        throw new Error('Invalid color partition');
    }
    
    console.log(`   Input: [${input.join(', ')}]`);
    console.log(`   Output: [${result.sortedArray.join(', ')}]`);
});

// Test 3: Binary sorting
runTest('Binary sorting (0s and 1s)', () => {
    const input = [1, 0, 1, 0, 0, 1];
    const result = dutchFlagSort2Way(input, 0, 1);
    
    if (!isValidPartition(result.sortedArray, 0, null, 1)) {
        throw new Error('Invalid binary partition');
    }
    
    console.log(`   Input: [${input.join(', ')}]`);
    console.log(`   Output: [${result.sortedArray.join(', ')}]`);
});

// Test 4: Edge case - empty array
runTest('Edge case - empty array', () => {
    const result = dutchFlagSort([], 0, 1, 2);
    
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
    const input = [1];
    const result = dutchFlagSort(input, 0, 1, 2);
    
    if (!arraysEqual(result.sortedArray, [1])) {
        throw new Error('Single element array not preserved');
    }
    
    console.log(`   Single element handled correctly`);
});

// Test 6: All same elements
runTest('All same elements', () => {
    const input = [1, 1, 1, 1];
    const result = dutchFlagSort(input, 0, 1, 2);
    
    if (!arraysEqual(result.sortedArray, [1, 1, 1, 1])) {
        throw new Error('Identical elements not preserved');
    }
    if (result.metrics.partitions.white !== 4) {
        throw new Error('Incorrect partition count for white elements');
    }
    
    console.log(`   All same elements handled correctly`);
});

// Test 7: Step-by-step visualization
runTest('Step-by-step algorithm tracking', () => {
    const input = [2, 0, 1];
    const result = dutchFlagSortWithSteps(input, 0, 1, 2);
    
    if (result.steps.length === 0) {
        throw new Error('No steps recorded');
    }
    if (result.steps[0].type !== 'start') {
        throw new Error('First step should be "start"');
    }
    if (result.steps[result.steps.length - 1].type !== 'complete') {
        throw new Error('Last step should be "complete"');
    }
    if (!isValidPartition(result.sortedArray, 0, 1, 2)) {
        throw new Error('Invalid partition in step-by-step result');
    }
    
    console.log(`   Generated ${result.steps.length} steps for visualization`);
});

// Test 8: Configuration presets
runTest('Configuration presets validation', () => {
    const classicPreset = DutchFlagSortConfigUtils.getPresetByName('Classic Dutch Flag');
    
    if (!classicPreset) {
        throw new Error('Classic Dutch Flag preset not found');
    }
    if (classicPreset.redValue !== 'red') {
        throw new Error('Classic preset red value incorrect');
    }
    
    const result = dutchFlagSort(
        classicPreset.array,
        classicPreset.redValue,
        classicPreset.whiteValue,
        classicPreset.blueValue
    );
    
    if (!isValidPartition(result.sortedArray, 'red', 'white', 'blue')) {
        throw new Error('Classic preset failed to sort correctly');
    }
    
    console.log(`   Classic preset validated successfully`);
});

// Test 9: Random array generation
runTest('Random array generation utilities', () => {
    const ternaryArray = DutchFlagSortConfigUtils.generateRandomTernaryArray(10);
    const binaryArray = DutchFlagSortConfigUtils.generateRandomBinaryArray(8);
    
    if (ternaryArray.length !== 10) {
        throw new Error('Ternary array wrong length');
    }
    if (!ternaryArray.every(val => [0, 1, 2].includes(val))) {
        throw new Error('Ternary array contains invalid values');
    }
    
    if (binaryArray.length !== 8) {
        throw new Error('Binary array wrong length');
    }
    if (!binaryArray.every(val => [0, 1].includes(val))) {
        throw new Error('Binary array contains invalid values');
    }
    
    console.log(`   Generated valid random arrays`);
});

// Test 10: Performance test with larger array
runTest('Performance test with 1000 elements', () => {
    const largeArray = DutchFlagSortConfigUtils.generateRandomTernaryArray(1000);
    
    const startTime = process.hrtime.bigint();
    const result = dutchFlagSort(largeArray, 0, 1, 2);
    const endTime = process.hrtime.bigint();
    
    const duration = Number(endTime - startTime) / 1000000; // Convert to milliseconds
    
    if (!isValidPartition(result.sortedArray, 0, 1, 2)) {
        throw new Error('Large array not partitioned correctly');
    }
    
    if (duration > 50) { // Should be much faster, but allowing some leeway
        throw new Error(`Performance too slow: ${duration}ms`);
    }
    
    console.log(`   Sorted 1000 elements in ${duration.toFixed(2)}ms`);
});

// Summary
console.log(`\n📊 Test Results:`);
console.log(`✅ Passed: ${passedTests}/${totalTests} tests`);

if (passedTests === totalTests) {
    console.log('🎉 All tests passed! Dutch National Flag Sort implementation is working correctly.');
} else {
    console.log(`❌ ${totalTests - passedTests} tests failed. Please review the implementation.`);
    process.exit(1);
}