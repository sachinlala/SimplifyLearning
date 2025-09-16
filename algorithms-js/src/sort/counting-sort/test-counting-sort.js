/**
 * Test Suite for Counting Sort Implementation
 * 
 * Verifies the correctness of the Counting Sort algorithm
 * and its step-by-step visualization functionality.
 */

// Load the implementation (for Node.js environment)
const { countingSort, countingSortWithSteps, countingSortSimple } = require('./counting-sort-core.js');
const CountingSortConfig = require('./counting-sort-config.js');

/**
 * Simple test runner
 */
function runTests() {
    console.log('🧪 Running Counting Sort Tests...\n');
    
    let passed = 0;
    let total = 0;
    
    function test(name, testFn) {
        total++;
        try {
            testFn();
            console.log(`✅ ${name}`);
            passed++;
        } catch (error) {
            console.log(`❌ ${name}: ${error.message}`);
        }
    }
    
    function assertEqual(actual, expected, message = '') {
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
            throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}. ${message}`);
        }
    }
    
    function assertTrue(condition, message = '') {
        if (!condition) {
            throw new Error(`Expected true, got ${condition}. ${message}`);
        }
    }
    
    // Test basic functionality
    test('Basic counting sort', () => {
        const result = countingSort([4, 2, 2, 8, 3, 3, 1]);
        assertEqual(result.sortedArray, [1, 2, 2, 3, 3, 4, 8]);
        assertTrue(result.metrics.comparisons >= 0);
        assertTrue(result.metrics.counts > 0);
        assertTrue(result.metrics.range > 0);
    });
    
    test('Single element array', () => {
        const result = countingSort([5]);
        assertEqual(result.sortedArray, [5]);
        assertEqual(result.metrics.comparisons, 0);
    });
    
    test('Empty array', () => {
        const result = countingSort([]);
        assertEqual(result.sortedArray, []);
        assertEqual(result.metrics.comparisons, 0);
    });
    
    test('Array with zeros', () => {
        const result = countingSort([0, 3, 0, 1, 2, 0]);
        assertEqual(result.sortedArray, [0, 0, 0, 1, 2, 3]);
    });
    
    test('Already sorted array', () => {
        const result = countingSort([1, 2, 3, 4, 5]);
        assertEqual(result.sortedArray, [1, 2, 3, 4, 5]);
    });
    
    test('Reverse sorted array', () => {
        const result = countingSort([5, 4, 3, 2, 1]);
        assertEqual(result.sortedArray, [1, 2, 3, 4, 5]);
    });
    
    test('Array with duplicates', () => {
        const result = countingSort([3, 3, 3, 1, 1, 2, 2, 2]);
        assertEqual(result.sortedArray, [1, 1, 2, 2, 2, 3, 3, 3]);
    });
    
    // Test stability (relative order of equal elements preserved)
    test('Stability test', () => {
        const result = countingSortWithSteps([2, 1, 2, 1]);
        assertEqual(result.sortedArray, [1, 1, 2, 2]);
        assertTrue(result.steps.length > 0);
    });
    
    // Test input validation
    test('Negative number rejection', () => {
        try {
            countingSort([1, -1, 3]);
            throw new Error('Should have thrown an error for negative numbers');
        } catch (error) {
            assertTrue(error.message.includes('non-negative integers'));
        }
    });
    
    test('Non-integer rejection', () => {
        try {
            countingSort([1, 2.5, 3]);
            throw new Error('Should have thrown an error for non-integers');
        } catch (error) {
            assertTrue(error.message.includes('non-negative integers'));
        }
    });
    
    // Test with steps functionality
    test('Counting sort with steps', () => {
        const result = countingSortWithSteps([4, 2, 2, 8, 3, 3, 1]);
        assertEqual(result.sortedArray, [1, 2, 2, 3, 3, 4, 8]);
        assertTrue(result.steps.length > 0);
        assertTrue(result.steps[0].type === 'start');
        assertTrue(result.steps[result.steps.length - 1].type === 'complete');
        assertTrue(result.metrics.comparisons >= 0);
        assertTrue(result.metrics.counts > 0);
    });
    
    test('Simple function wrapper', () => {
        const result = countingSortSimple([4, 2, 2, 8, 3, 3, 1]);
        assertEqual(result, [1, 2, 2, 3, 3, 4, 8]);
    });
    
    // Test all configuration test cases
    CountingSortConfig.testCases.forEach(testCase => {
        test(`Config test: ${testCase.name}`, () => {
            const result = countingSort(testCase.input);
            assertEqual(result.sortedArray, testCase.expected);
        });
    });
    
    // Test configuration validation
    test('Config validation function', () => {
        const validator = CountingSortConfig.input.validation.customValidator;
        
        // Valid input
        const validResult = validator([1, 2, 3]);
        assertTrue(validResult.valid);
        
        // Invalid input (negative)
        const invalidResult = validator([1, -2, 3]);
        assertTrue(!invalidResult.valid);
        assertTrue(invalidResult.message.includes('non-negative integers'));
        
        // Warning for large range
        const warningResult = validator([1, 100]);
        assertTrue(warningResult.valid);
        assertTrue(warningResult.warning && warningResult.warning.includes('Large range'));
    });
    
    // Test input preprocessing
    test('Input preprocessing', () => {
        const preprocess = CountingSortConfig.implementation.inputPreprocessor;
        
        // String input
        assertEqual(preprocess('4,2,2,8'), [4, 2, 2, 8]);
        
        // Array input with negatives (should be clamped to 0)
        assertEqual(preprocess([-1, 2, 3]), [0, 2, 3]);
        
        // Array with decimals (should be floored)
        assertEqual(preprocess([1.7, 2.3, 3.9]), [1, 2, 3]);
    });
    
    // Performance test with larger array
    test('Performance test (100 elements)', () => {
        const largeArray = Array.from({length: 100}, () => Math.floor(Math.random() * 20));
        const startTime = Date.now();
        const result = countingSort(largeArray);
        const endTime = Date.now();
        
        // Verify it's sorted
        for (let i = 1; i < result.sortedArray.length; i++) {
            assertTrue(result.sortedArray[i] >= result.sortedArray[i-1], 'Array should be sorted');
        }
        
        console.log(`   - Sorted 100 elements in ${endTime - startTime}ms`);
        console.log(`   - Comparisons: ${result.metrics.comparisons}, Counts: ${result.metrics.counts}`);
    });
    
    console.log(`\n📊 Test Results: ${passed}/${total} passed`);
    
    if (passed === total) {
        console.log('🎉 All tests passed!');
        return true;
    } else {
        console.log('💥 Some tests failed!');
        return false;
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    const success = runTests();
    process.exit(success ? 0 : 1);
}

module.exports = { runTests };