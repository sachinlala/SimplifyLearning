/**
 * Test Suite for Bucket Sort Implementation
 * 
 * Verifies the correctness of the Bucket Sort algorithm
 * and its step-by-step visualization functionality.
 */

// Load the implementation (for Node.js environment)
const { bucketSort, bucketSortWithSteps, bucketSortSimple, bucketSortIntegers } = require('./bucket-sort-core.js');
const BucketSortConfig = require('./bucket-sort-config.js');

/**
 * Simple test runner
 */
function runTests() {
    console.log('🧪 Running Bucket Sort Tests...\n');
    
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
    
    function assertArraysSorted(actual, message = '') {
        for (let i = 1; i < actual.length; i++) {
            if (actual[i] < actual[i-1]) {
                throw new Error(`Array not sorted at indices ${i-1}, ${i}: ${actual[i-1]} > ${actual[i]}. ${message}`);
            }
        }
    }
    
    // Test basic functionality
    test('Basic bucket sort - uniform distribution', () => {
        const result = bucketSort([0.78, 0.17, 0.39, 0.26, 0.72]);
        assertArraysSorted(result.sortedArray);
        assertTrue(result.metrics.buckets > 0);
        assertTrue(result.metrics.bucketSorts >= 0);
    });
    
    test('Simple example', () => {
        const result = bucketSort([0.42, 0.32, 0.33, 0.52, 0.37]);
        const expected = [0.32, 0.33, 0.37, 0.42, 0.52];
        assertEqual(result.sortedArray, expected);
        assertTrue(result.metrics.buckets > 0);
    });
    
    test('Small range values', () => {
        const result = bucketSort([0.2, 0.3, 0.1, 0.4, 0.25, 0.35]);
        const expected = [0.1, 0.2, 0.25, 0.3, 0.35, 0.4];
        assertEqual(result.sortedArray, expected);
    });
    
    test('Single element array', () => {
        const result = bucketSort([0.5]);
        assertEqual(result.sortedArray, [0.5]);
        assertEqual(result.metrics.buckets, 1);
    });
    
    test('Empty array', () => {
        const result = bucketSort([]);
        assertEqual(result.sortedArray, []);
        assertEqual(result.metrics.buckets, 0);
    });
    
    test('All elements equal', () => {
        const result = bucketSort([0.5, 0.5, 0.5, 0.5]);
        assertEqual(result.sortedArray, [0.5, 0.5, 0.5, 0.5]);
        assertEqual(result.metrics.buckets, 1);
        assertEqual(result.metrics.bucketSorts, 0); // No sorting needed
    });
    
    test('Already sorted array', () => {
        const result = bucketSort([0.1, 0.2, 0.3, 0.4, 0.5]);
        assertEqual(result.sortedArray, [0.1, 0.2, 0.3, 0.4, 0.5]);
        assertArraysSorted(result.sortedArray);
    });
    
    test('Reverse sorted array', () => {
        const result = bucketSort([0.9, 0.7, 0.5, 0.3, 0.1]);
        assertEqual(result.sortedArray, [0.1, 0.3, 0.5, 0.7, 0.9]);
    });
    
    test('Array with duplicates', () => {
        const result = bucketSort([0.5, 0.2, 0.8, 0.2, 0.5, 0.8]);
        const expected = [0.2, 0.2, 0.5, 0.5, 0.8, 0.8];
        assertEqual(result.sortedArray, expected);
    });
    
    // Test input validation
    test('Non-numeric input rejection', () => {
        try {
            bucketSort([1, 'abc', 3]);
            throw new Error('Should have thrown an error for non-numeric input');
        } catch (error) {
            assertTrue(error.message.includes('requires numbers'));
        }
    });
    
    test('NaN input rejection', () => {
        try {
            bucketSort([1, NaN, 3]);
            throw new Error('Should have thrown an error for NaN input');
        } catch (error) {
            assertTrue(error.message.includes('requires numbers'));
        }
    });
    
    // Test with steps functionality
    test('Bucket sort with steps', () => {
        const result = bucketSortWithSteps([0.42, 0.32, 0.33, 0.52, 0.37]);
        assertEqual(result.sortedArray, [0.32, 0.33, 0.37, 0.42, 0.52]);
        assertTrue(result.steps.length > 0);
        assertTrue(result.steps[0].type === 'start');
        assertTrue(result.steps[result.steps.length - 1].type === 'complete');
        assertTrue(result.metrics.buckets > 0);
    });
    
    test('Simple function wrapper', () => {
        const result = bucketSortSimple([0.78, 0.17, 0.39, 0.26, 0.72]);
        assertArraysSorted(result);
        assertTrue(result.length === 5);
    });
    
    // Test integer version
    test('Bucket sort integers', () => {
        const result = bucketSortIntegers([7, 3, 1, 9, 2, 5], 10);
        assertEqual(result.sortedArray, [1, 2, 3, 5, 7, 9]);
    });
    
    test('Bucket sort integers auto-max', () => {
        const result = bucketSortIntegers([15, 3, 8, 1, 12]);
        assertArraysSorted(result.sortedArray);
        assertEqual(result.sortedArray.length, 5);
    });
    
    // Test all configuration test cases
    BucketSortConfig.testCases.forEach(testCase => {
        test(`Config test: ${testCase.name}`, () => {
            const result = bucketSort(testCase.input);
            // Allow for floating-point precision differences
            const tolerance = 0.0001;
            assertEqual(result.sortedArray.length, testCase.expected.length);
            
            for (let i = 0; i < result.sortedArray.length; i++) {
                const diff = Math.abs(result.sortedArray[i] - testCase.expected[i]);
                assertTrue(diff < tolerance, 
                    `Element ${i}: expected ${testCase.expected[i]}, got ${result.sortedArray[i]}, diff=${diff}`);
            }
        });
    });
    
    // Test configuration validation
    test('Config validation function', () => {
        const validator = BucketSortConfig.input.validation.customValidator;
        
        // Valid input
        const validResult = validator([0.1, 0.5, 0.9]);
        assertTrue(validResult.valid);
        
        // Invalid input (non-number)
        const invalidResult = validator([1, 'abc', 3]);
        assertTrue(!invalidResult.valid);
        assertTrue(invalidResult.message.includes('requires numbers'));
        
        // Warning for equal elements
        const warningResult = validator([0.5, 0.5, 0.5, 0.5, 0.5, 0.5]);
        assertTrue(warningResult.valid);
        assertTrue(warningResult.warning && warningResult.warning.includes('trivial'));
    });
    
    // Test input preprocessing
    test('Input preprocessing', () => {
        const preprocess = BucketSortConfig.implementation.inputPreprocessor;
        
        // String input
        const processed1 = preprocess('0.1,0.5,0.9');
        assertEqual(processed1.length, 3);
        assertTrue(processed1[0] >= 0 && processed1[0] <= 1);
        assertTrue(processed1[1] >= 0 && processed1[1] <= 1);
        assertTrue(processed1[2] >= 0 && processed1[2] <= 1);
        
        // Array input (will be normalized to [0,1])
        const processed2 = preprocess([10, 50, 90]);
        assertEqual(processed2.length, 3);
        assertEqual(processed2[0], 0);   // min normalized to 0
        assertEqual(processed2[2], 1);   // max normalized to 1
    });
    
    // Test result processing
    test('Result processing', () => {
        const processor = BucketSortConfig.implementation.resultProcessor;
        const result = bucketSort([0.42, 0.32, 0.33, 0.52, 0.37]);
        const processed = processor(result);
        
        assertTrue(processed.summary.algorithm === 'Bucket Sort');
        assertTrue(processed.summary.elements === 5);
        assertTrue(processed.summary.buckets > 0);
        assertTrue(processed.summary.timeComplexity.includes('O('));
    });
    
    // Edge cases
    test('Single bucket scenario', () => {
        // Very close values that likely go to same bucket
        const result = bucketSort([0.1001, 0.1002, 0.1003, 0.1004, 0.1005]);
        assertArraysSorted(result.sortedArray);
        assertTrue(result.metrics.buckets >= 1);
    });
    
    test('Extreme skewness', () => {
        // Most values at extremes
        const result = bucketSort([0.01, 0.02, 0.03, 0.97, 0.98, 0.99]);
        assertArraysSorted(result.sortedArray);
        assertEqual(result.sortedArray[0], 0.01);
        assertEqual(result.sortedArray[result.sortedArray.length - 1], 0.99);
    });
    
    test('Large uniform distribution', () => {
        // Generate uniform random data
        const input = [];
        for (let i = 0; i < 20; i++) {
            input.push(Math.random());
        }
        
        const result = bucketSort(input);
        assertArraysSorted(result.sortedArray);
        assertEqual(result.sortedArray.length, 20);
        assertTrue(result.metrics.buckets > 1);
        assertTrue(result.metrics.bucketSorts > 0);
    });
    
    // Performance test
    test('Performance test (50 elements)', () => {
        const input = Array.from({length: 50}, () => Math.random());
        const startTime = Date.now();
        const result = bucketSort(input);
        const endTime = Date.now();
        
        assertArraysSorted(result.sortedArray);
        assertEqual(result.sortedArray.length, 50);
        
        console.log(`   - Sorted 50 elements in ${endTime - startTime}ms`);
        console.log(`   - Used ${result.metrics.buckets} buckets, ${result.metrics.bucketSorts} bucket sorts`);
        console.log(`   - Comparisons: ${result.metrics.comparisons}, Swaps: ${result.metrics.swaps}`);
    });
    
    // Test step tracking completeness
    test('Step tracking completeness', () => {
        const result = bucketSortWithSteps([0.8, 0.2, 0.6, 0.1, 0.9]);
        
        // Check that we have all required step types
        const stepTypes = new Set(result.steps.map(s => s.type));
        assertTrue(stepTypes.has('start'));
        assertTrue(stepTypes.has('complete'));
        assertTrue(stepTypes.has('range-analysis'));
        assertTrue(stepTypes.has('create-buckets'));
        assertTrue(stepTypes.has('distribute-element'));
        
        // Verify step progression makes sense
        let startFound = false;
        let completeFound = false;
        
        result.steps.forEach(step => {
            if (step.type === 'start') startFound = true;
            if (step.type === 'complete') {
                assertTrue(startFound, 'Start step should come before complete');
                completeFound = true;
            }
        });
        
        assertTrue(completeFound, 'Should have completion step');
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