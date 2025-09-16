/**
 * Test Suite for Radix Sort Implementation
 * 
 * Verifies the correctness of the Radix Sort algorithm
 * and its step-by-step visualization functionality.
 */

// Load the implementation (for Node.js environment)
const { radixSort, radixSortWithSteps, radixSortSimple } = require('./radix-sort-core.js');
const RadixSortConfig = require('./radix-sort-config.js');

/**
 * Simple test runner
 */
function runTests() {
    console.log('🧪 Running Radix Sort Tests...\n');
    
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
    test('Basic radix sort', () => {
        const result = radixSort([170, 45, 75, 90, 2, 802, 24, 66]);
        assertEqual(result.sortedArray, [2, 24, 45, 66, 75, 90, 170, 802]);
        assertTrue(result.metrics.comparisons >= 0);
        assertTrue(result.metrics.countingSorts > 0);
        assertTrue(result.metrics.digits > 0);
        assertEqual(result.metrics.maxValue, 802);
    });
    
    test('Single digit numbers', () => {
        const result = radixSort([4, 2, 7, 1, 9, 5, 3, 6]);
        assertEqual(result.sortedArray, [1, 2, 3, 4, 5, 6, 7, 9]);
        assertEqual(result.metrics.digits, 1);
        assertEqual(result.metrics.countingSorts, 1);
    });
    
    test('Single element array', () => {
        const result = radixSort([42]);
        assertEqual(result.sortedArray, [42]);
        assertEqual(result.metrics.comparisons, 0);
        assertEqual(result.metrics.countingSorts, 2); // 42 has 2 digits, so 2 passes
        assertEqual(result.metrics.digits, 2);
    });
    
    test('Empty array', () => {
        const result = radixSort([]);
        assertEqual(result.sortedArray, []);
        assertEqual(result.metrics.comparisons, 0);
        assertEqual(result.metrics.countingSorts, 0);
    });
    
    test('Array with zeros', () => {
        const result = radixSort([305, 50, 5, 205, 105]);
        assertEqual(result.sortedArray, [5, 50, 105, 205, 305]);
        assertEqual(result.metrics.digits, 3);
        assertEqual(result.metrics.countingSorts, 3);
    });
    
    test('Already sorted array', () => {
        const result = radixSort([11, 22, 33, 44, 55]);
        assertEqual(result.sortedArray, [11, 22, 33, 44, 55]);
        assertEqual(result.metrics.digits, 2);
    });
    
    test('Reverse sorted array', () => {
        const result = radixSort([987, 654, 321, 123]);
        assertEqual(result.sortedArray, [123, 321, 654, 987]);
        assertEqual(result.metrics.digits, 3);
        assertEqual(result.metrics.countingSorts, 3);
    });
    
    test('Same digits different order (stability)', () => {
        const result = radixSort([123, 321, 231, 132, 312, 213]);
        assertEqual(result.sortedArray, [123, 132, 213, 231, 312, 321]);
        assertEqual(result.metrics.digits, 3);
    });
    
    test('Four digit numbers', () => {
        const result = radixSort([3251, 987, 4562, 1234, 9876, 100, 5555]);
        assertEqual(result.sortedArray, [100, 987, 1234, 3251, 4562, 5555, 9876]);
        assertEqual(result.metrics.digits, 4);
        assertEqual(result.metrics.countingSorts, 4);
    });
    
    // Test input validation
    test('Negative number rejection', () => {
        try {
            radixSort([1, -1, 3]);
            throw new Error('Should have thrown an error for negative numbers');
        } catch (error) {
            assertTrue(error.message.includes('non-negative integers'));
        }
    });
    
    test('Non-integer rejection', () => {
        try {
            radixSort([1, 2.5, 3]);
            throw new Error('Should have thrown an error for non-integers');
        } catch (error) {
            assertTrue(error.message.includes('non-negative integers'));
        }
    });
    
    // Test with steps functionality
    test('Radix sort with steps', () => {
        const result = radixSortWithSteps([170, 45, 75, 90, 2, 802, 24, 66]);
        assertEqual(result.sortedArray, [2, 24, 45, 66, 75, 90, 170, 802]);
        assertTrue(result.steps.length > 0);
        assertTrue(result.steps[0].type === 'start');
        assertTrue(result.steps[result.steps.length - 1].type === 'complete');
        assertTrue(result.metrics.comparisons >= 0);
        assertTrue(result.metrics.countingSorts > 0);
        assertEqual(result.metrics.digits, 3);
    });
    
    test('Simple function wrapper', () => {
        const result = radixSortSimple([170, 45, 75, 90, 2, 802, 24, 66]);
        assertEqual(result, [2, 24, 45, 66, 75, 90, 170, 802]);
    });
    
    // Test all configuration test cases
    RadixSortConfig.testCases.forEach(testCase => {
        test(`Config test: ${testCase.name}`, () => {
            const result = radixSort(testCase.input);
            assertEqual(result.sortedArray, testCase.expected);
        });
    });
    
    // Test configuration validation
    test('Config validation function', () => {
        const validator = RadixSortConfig.input.validation.customValidator;
        
        // Valid input
        const validResult = validator([123, 456, 789]);
        assertTrue(validResult.valid);
        
        // Invalid input (negative)
        const invalidResult = validator([1, -2, 3]);
        assertTrue(!invalidResult.valid);
        assertTrue(invalidResult.message.includes('non-negative integers'));
        
        // Warning for large numbers
        const warningResult = validator([12345, 67890]);
        assertTrue(warningResult.valid);
        assertTrue(warningResult.warning && warningResult.warning.includes('Large numbers'));
    });
    
    // Test input preprocessing
    test('Input preprocessing', () => {
        const preprocess = RadixSortConfig.implementation.inputPreprocessor;
        
        // String input
        assertEqual(preprocess('170,45,75,90'), [170, 45, 75, 90]);
        
        // Array input with negatives (should be clamped to 0)
        assertEqual(preprocess([-1, 2, 3]), [0, 2, 3]);
        
        // Array with decimals (should be floored)
        assertEqual(preprocess([1.7, 2.3, 3.9]), [1, 2, 3]);
    });
    
    // Test result processing
    test('Result processing', () => {
        const processor = RadixSortConfig.implementation.resultProcessor;
        const result = radixSort([170, 45, 75, 90, 2, 802, 24, 66]);
        const processed = processor(result);
        
        assertTrue(processed.summary.algorithm === 'Radix Sort');
        assertTrue(processed.summary.elements === 8);
        assertTrue(processed.summary.digits === 3);
        assertTrue(processed.summary.countingSortPasses === 3);
        assertTrue(processed.summary.maxValue === 802);
        assertTrue(processed.summary.timeComplexity.includes('O('));
    });
    
    // Test edge cases
    test('Zero only array', () => {
        const result = radixSort([0, 0, 0]);
        assertEqual(result.sortedArray, [0, 0, 0]);
        assertEqual(result.metrics.digits, 1);
        assertEqual(result.metrics.countingSorts, 1);
    });
    
    test('Large single digit', () => {
        const result = radixSort([9]);
        assertEqual(result.sortedArray, [9]);
        assertEqual(result.metrics.digits, 1);
        assertEqual(result.metrics.countingSorts, 1);
    });
    
    test('Powers of 10', () => {
        const result = radixSort([1000, 100, 10, 1]);
        assertEqual(result.sortedArray, [1, 10, 100, 1000]);
        assertEqual(result.metrics.digits, 4);
        assertEqual(result.metrics.countingSorts, 4);
    });
    
    // Performance test with larger array
    test('Performance test (100 elements)', () => {
        const largeArray = Array.from({length: 100}, () => Math.floor(Math.random() * 1000));
        const startTime = Date.now();
        const result = radixSort(largeArray);
        const endTime = Date.now();
        
        // Verify it's sorted
        for (let i = 1; i < result.sortedArray.length; i++) {
            assertTrue(result.sortedArray[i] >= result.sortedArray[i-1], 'Array should be sorted');
        }
        
        console.log(`   - Sorted 100 elements in ${endTime - startTime}ms`);
        console.log(`   - Comparisons: ${result.metrics.comparisons}, Counting sorts: ${result.metrics.countingSorts}`);
        console.log(`   - Digits: ${result.metrics.digits}, Max value: ${result.metrics.maxValue}`);
    });
    
    // Test stability
    test('Stability verification', () => {
        // Create array where stability matters - elements with same digit patterns
        const result = radixSortWithSteps([21, 31, 41, 22, 32, 42]);
        assertEqual(result.sortedArray, [21, 22, 31, 32, 41, 42]);
        
        // Check that the relative order within same tens digit is preserved
        const twenties = result.sortedArray.filter(x => Math.floor(x/10) === 2);
        const thirties = result.sortedArray.filter(x => Math.floor(x/10) === 3);
        const fourties = result.sortedArray.filter(x => Math.floor(x/10) === 4);
        
        assertEqual(twenties, [21, 22]);
        assertEqual(thirties, [31, 32]);
        assertEqual(fourties, [41, 42]);
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