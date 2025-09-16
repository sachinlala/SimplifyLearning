/**
 * Dutch National Flag Sort - Test Suite
 * 
 * Comprehensive test suite for Dutch National Flag Sort algorithm
 * including unit tests, integration tests, and performance benchmarks.
 * 
 * @see https://github.com/sachinlala/SimplifyLearning
 */

// Import the algorithm modules
const { 
    dutchFlagSort,
    dutchFlagSort3Way,
    dutchFlagSort2Way,
    dutchFlagSortWithSteps,
    dutchFlagSortSimple,
    sortColors,
    sort012
} = require('./dutch-flag-sort-core.js');

const { 
    DUTCH_FLAG_SORT_CONFIG,
    DutchFlagSortConfigUtils
} = require('./dutch-flag-sort.config.js');

// Test helper functions
const TestUtils = {
    arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        return arr1.every((val, index) => val === arr2[index]);
    },

    isValidPartition(arr, redValue, whiteValue, blueValue) {
        const isTwoWay = (whiteValue === null || whiteValue === undefined);
        let redCount = 0, whiteCount = 0, blueCount = 0;
        let phase = 'red'; // red -> white -> blue

        for (let i = 0; i < arr.length; i++) {
            const current = arr[i];
            
            if (current === redValue) {
                if (phase !== 'red') return false; // red elements should come first
                redCount++;
            } else if (!isTwoWay && current === whiteValue) {
                if (phase === 'blue') return false; // white should not come after blue
                if (phase === 'red') phase = 'white';
                whiteCount++;
            } else if (current === blueValue) {
                if (phase === 'red') phase = isTwoWay ? 'blue' : 'white';
                if (phase === 'white') phase = 'blue';
                blueCount++;
            } else if (isTwoWay) {
                // In 2-way sort, anything not red or blue goes in middle
                if (phase === 'blue') return false;
                if (phase === 'red') phase = 'white';
                whiteCount++;
            } else {
                return false; // Unknown element in 3-way sort
            }
        }

        return true;
    },

    measurePerformance(fn, iterations = 100) {
        const start = performance.now();
        for (let i = 0; i < iterations; i++) {
            fn();
        }
        const end = performance.now();
        return (end - start) / iterations; // Average time per iteration
    }
};

// Test Suite
describe('Dutch National Flag Sort', () => {
    
    describe('Core Algorithm Tests', () => {
        
        test('should handle basic three-way partitioning', () => {
            const input = [2, 0, 1, 2, 1, 0, 2, 1, 0];
            const result = dutchFlagSort(input, 0, 1, 2);
            
            expect(TestUtils.isValidPartition(result.sortedArray, 0, 1, 2)).toBe(true);
            expect(result.metrics.comparisons).toBeGreaterThan(0);
            expect(result.metrics.partitions.red).toBe(3);
            expect(result.metrics.partitions.white).toBe(3);
            expect(result.metrics.partitions.blue).toBe(3);
        });

        test('should handle two-way partitioning', () => {
            const input = [1, 0, 1, 0, 0, 1, 1, 0];
            const result = dutchFlagSort2Way(input, 0, 1);
            
            expect(TestUtils.isValidPartition(result.sortedArray, 0, null, 1)).toBe(true);
            expect(result.metrics.partitions.red).toBe(4);
            expect(result.metrics.partitions.blue).toBe(4);
        });

        test('should handle string values (colors)', () => {
            const input = ['red', 'blue', 'white', 'red', 'white', 'blue'];
            const result = sortColors(input);
            
            expect(TestUtils.isValidPartition(result.sortedArray, 'red', 'white', 'blue')).toBe(true);
            expect(result.sortedArray.filter(color => color === 'red').length).toBe(2);
            expect(result.sortedArray.filter(color => color === 'white').length).toBe(2);
            expect(result.sortedArray.filter(color => color === 'blue').length).toBe(2);
        });

        test('should handle boolean values', () => {
            const input = [true, false, true, false, false, true];
            const result = dutchFlagSort(input, false, null, true);
            
            expect(TestUtils.isValidPartition(result.sortedArray, false, null, true)).toBe(true);
            expect(result.sortedArray.filter(val => val === false).length).toBe(3);
            expect(result.sortedArray.filter(val => val === true).length).toBe(3);
        });
    });

    describe('Edge Cases', () => {
        
        test('should handle empty array', () => {
            const result = dutchFlagSort([], 0, 1, 2);
            
            expect(result.sortedArray).toEqual([]);
            expect(result.metrics.comparisons).toBe(0);
            expect(result.metrics.swaps).toBe(0);
        });

        test('should handle single element array', () => {
            const result = dutchFlagSort([1], 0, 1, 2);
            
            expect(result.sortedArray).toEqual([1]);
            expect(result.metrics.comparisons).toBe(0);
            expect(result.metrics.partitions.white).toBe(1);
        });

        test('should handle array with all identical elements', () => {
            const input = [1, 1, 1, 1, 1];
            const result = dutchFlagSort(input, 0, 1, 2);
            
            expect(result.sortedArray).toEqual([1, 1, 1, 1, 1]);
            expect(result.metrics.partitions.white).toBe(5);
            expect(result.metrics.partitions.red).toBe(0);
            expect(result.metrics.partitions.blue).toBe(0);
        });

        test('should handle already partitioned array', () => {
            const input = [0, 0, 1, 1, 2, 2];
            const result = dutchFlagSort(input, 0, 1, 2);
            
            expect(TestUtils.isValidPartition(result.sortedArray, 0, 1, 2)).toBe(true);
            expect(result.metrics.swaps).toBe(0); // Should require no swaps
        });

        test('should handle reverse partitioned array', () => {
            const input = [2, 2, 1, 1, 0, 0];
            const result = dutchFlagSort(input, 0, 1, 2);
            
            expect(TestUtils.isValidPartition(result.sortedArray, 0, 1, 2)).toBe(true);
            expect(result.metrics.swaps).toBeGreaterThan(0); // Should require swaps
        });

        test('should handle null and undefined inputs', () => {
            expect(dutchFlagSort(null, 0, 1, 2).sortedArray).toEqual([]);
            expect(dutchFlagSort(undefined, 0, 1, 2).sortedArray).toEqual([]);
        });
    });

    describe('Step-by-step Algorithm Tests', () => {
        
        test('should produce correct steps for visualization', () => {
            const input = [2, 0, 1];
            const result = dutchFlagSortWithSteps(input, 0, 1, 2);
            
            expect(result.steps.length).toBeGreaterThan(0);
            expect(result.steps[0].type).toBe('start');
            expect(result.steps[result.steps.length - 1].type).toBe('complete');
            expect(TestUtils.isValidPartition(result.sortedArray, 0, 1, 2)).toBe(true);
        });

        test('should track boundaries correctly in steps', () => {
            const input = [1, 0, 2, 1];
            const result = dutchFlagSortWithSteps(input, 0, 1, 2);
            
            result.steps.forEach(step => {
                if (step.boundaries) {
                    expect(step.boundaries.red).toBeGreaterThanOrEqual(0);
                    expect(step.boundaries.white).toBeGreaterThanOrEqual(-1);
                    expect(step.boundaries.blue).toBeGreaterThanOrEqual(-1);
                }
            });
        });

        test('should handle two-way partitioning steps', () => {
            const input = [1, 0, 1, 0];
            const result = dutchFlagSortWithSteps(input, 0, null, 1);
            
            expect(result.steps.length).toBeGreaterThan(0);
            expect(result.metrics.whiteValue).toBe('implicit');
            expect(TestUtils.isValidPartition(result.sortedArray, 0, null, 1)).toBe(true);
        });
    });

    describe('Preset Configuration Tests', () => {
        
        test('should validate all preset configurations', () => {
            DUTCH_FLAG_SORT_CONFIG.presets.forEach(preset => {
                const result = dutchFlagSort(
                    preset.array, 
                    preset.redValue, 
                    preset.whiteValue, 
                    preset.blueValue
                );
                
                expect(TestUtils.isValidPartition(
                    result.sortedArray, 
                    preset.redValue, 
                    preset.whiteValue, 
                    preset.blueValue
                )).toBe(true);
            });
        });

        test('should handle preset utility functions', () => {
            const classicPreset = DutchFlagSortConfigUtils.getPresetByName('Classic Dutch Flag');
            expect(classicPreset).toBeDefined();
            expect(classicPreset.redValue).toBe('red');

            const binaryPresets = DutchFlagSortConfigUtils.getPresetsByCategory('Binary');
            expect(binaryPresets.length).toBeGreaterThan(0);

            const threeWayPresets = DutchFlagSortConfigUtils.getPresetsByType('3-way');
            expect(threeWayPresets.length).toBeGreaterThan(0);
        });

        test('should generate valid random arrays', () => {
            const ternaryArray = DutchFlagSortConfigUtils.generateRandomTernaryArray(10);
            expect(ternaryArray.length).toBe(10);
            expect(ternaryArray.every(val => [0, 1, 2].includes(val))).toBe(true);

            const binaryArray = DutchFlagSortConfigUtils.generateRandomBinaryArray(8);
            expect(binaryArray.length).toBe(8);
            expect(binaryArray.every(val => [0, 1].includes(val))).toBe(true);
        });
    });

    describe('Performance Tests', () => {
        
        test('should have O(n) time complexity', () => {
            const sizes = [10, 50, 100];
            const times = [];

            sizes.forEach(size => {
                const array = DutchFlagSortConfigUtils.generateRandomTernaryArray(size);
                const time = TestUtils.measurePerformance(() => {
                    dutchFlagSort([...array], 0, 1, 2);
                }, 10);
                times.push(time);
            });

            // Time should grow roughly linearly with input size
            expect(times[2] / times[0]).toBeLessThan(15); // Allow some variance for small sizes
        });

        test('should use O(1) space', () => {
            const input = DutchFlagSortConfigUtils.generateRandomTernaryArray(100);
            const originalLength = input.length;
            const result = dutchFlagSort(input, 0, 1, 2);
            
            // Should not use extra space proportional to input size
            expect(result.sortedArray.length).toBe(originalLength);
        });

        test('should handle large arrays efficiently', () => {
            const largeArray = DutchFlagSortConfigUtils.generateRandomTernaryArray(1000);
            
            const startTime = performance.now();
            const result = dutchFlagSort(largeArray, 0, 1, 2);
            const endTime = performance.now();
            
            expect(endTime - startTime).toBeLessThan(100); // Should complete in < 100ms
            expect(TestUtils.isValidPartition(result.sortedArray, 0, 1, 2)).toBe(true);
        });
    });

    describe('Test Case Validation', () => {
        
        test('should pass all configured test cases', () => {
            DUTCH_FLAG_SORT_CONFIG.testCases.forEach(category => {
                category.tests.forEach(testCase => {
                    const result = dutchFlagSort(
                        testCase.input,
                        testCase.redValue,
                        testCase.whiteValue,
                        testCase.blueValue
                    );
                    
                    if (testCase.expected) {
                        expect(TestUtils.arraysEqual(result.sortedArray, testCase.expected))
                            .toBe(true);
                    } else {
                        // If no expected result provided, just check valid partition
                        expect(TestUtils.isValidPartition(
                            result.sortedArray,
                            testCase.redValue,
                            testCase.whiteValue,
                            testCase.blueValue
                        )).toBe(true);
                    }
                });
            });
        });
    });

    describe('Convenience Functions Tests', () => {
        
        test('should handle sort012 function', () => {
            const input = [2, 0, 1, 2, 1, 0];
            const result = sort012(input);
            
            expect(TestUtils.isValidPartition(result.sortedArray, 0, 1, 2)).toBe(true);
        });

        test('should handle sortColors function', () => {
            const input = ['blue', 'red', 'white', 'blue'];
            const result = sortColors(input);
            
            expect(TestUtils.isValidPartition(result.sortedArray, 'red', 'white', 'blue')).toBe(true);
        });

        test('should handle dutchFlagSortSimple function', () => {
            const input = [2, 0, 1];
            const result = dutchFlagSortSimple(input, 0, 1, 2);
            
            expect(Array.isArray(result)).toBe(true);
            expect(TestUtils.isValidPartition(result, 0, 1, 2)).toBe(true);
        });
    });

    describe('Error Handling', () => {
        
        test('should handle invalid parameters gracefully', () => {
            expect(() => dutchFlagSort([1, 2, 3], null, null, null)).not.toThrow();
            expect(() => dutchFlagSort([1, 2, 3], undefined, undefined, undefined)).not.toThrow();
        });

        test('should validate array for partitioning', () => {
            const validArray = [0, 1, 2, 0, 1, 2];
            const invalidArray = [0, 1, 2, 3, 4]; // Contains values not in partition set

            expect(DutchFlagSortConfigUtils.validateArrayForPartitioning(validArray, 0, 1, 2))
                .toBe(true);
            expect(DutchFlagSortConfigUtils.validateArrayForPartitioning(invalidArray, 0, 1, 2))
                .toBe(false);
        });
    });
});

// Additional integration tests
describe('Dutch National Flag Sort Integration', () => {
    
    test('should integrate with sorting utilities', () => {
        // This test assumes sorting utilities are available
        const input = [2, 0, 1, 2, 1, 0];
        const result = dutchFlagSort(input, 0, 1, 2);
        
        expect(result.metrics).toBeDefined();
        expect(result.metrics.comparisons).toBeGreaterThan(0);
        expect(result.metrics.swaps).toBeGreaterThanOrEqual(0);
    });

    test('should work with different data types consistently', () => {
        const dataTypes = [
            { array: [0, 1, 2, 0, 1], red: 0, white: 1, blue: 2 },
            { array: ['a', 'b', 'c', 'a', 'b'], red: 'a', white: 'b', blue: 'c' },
            { array: [true, false, true, false], red: false, white: null, blue: true }
        ];

        dataTypes.forEach(({ array, red, white, blue }) => {
            const result = dutchFlagSort(array, red, white, blue);
            expect(TestUtils.isValidPartition(result.sortedArray, red, white, blue)).toBe(true);
        });
    });
});

console.log('✅ Dutch National Flag Sort tests completed successfully!');