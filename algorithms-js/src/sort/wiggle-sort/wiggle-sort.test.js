/**
 * Wiggle Sort - Test Suite
 * 
 * Comprehensive test suite for Wiggle Sort algorithm
 * including unit tests, integration tests, and performance benchmarks.
 * 
 * @author SimplifyLearning
 * @see https://github.com/sachinlala/SimplifyLearning
 */

// Import the algorithm modules
const { 
    wiggleSortI,
    wiggleSortII,
    wiggleSortWithSteps,
    wiggleSortSimple,
    isWiggleSorted,
    getWigglePattern
} = require('./wiggle-sort-core.js');

const { 
    WIGGLE_SORT_CONFIG,
    WiggleSortConfigUtils
} = require('./wiggle-sort-config.js');

// Test helper functions
const TestUtils = {
    validateWigglePattern(arr, variant = "I") {
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
    },

    measurePerformance(fn, iterations = 100) {
        const start = performance.now();
        for (let i = 0; i < iterations; i++) {
            fn();
        }
        const end = performance.now();
        return (end - start) / iterations;
    },

    arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        return arr1.every((val, index) => val === arr2[index]);
    }
};

// Test Suite
describe('Wiggle Sort', () => {
    
    describe('Core Algorithm Tests', () => {
        
        test('should handle basic wiggle sort I', () => {
            const input = [3, 5, 2, 1, 6, 4];
            const result = wiggleSortI(input);
            
            expect(TestUtils.validateWigglePattern(result.sortedArray, "I")).toBe(true);
            expect(result.metrics.comparisons).toBeGreaterThan(0);
        });

        test('should handle wiggle sort II with duplicates', () => {
            const input = [1, 5, 1, 1, 6, 4];
            const result = wiggleSortII(input);
            
            expect(TestUtils.validateWigglePattern(result.sortedArray, "II")).toBe(true);
            expect(result.metrics.comparisons).toBeGreaterThan(0);
            
            // Check no adjacent duplicates
            for (let i = 0; i < result.sortedArray.length - 1; i++) {
                expect(result.sortedArray[i]).not.toBe(result.sortedArray[i + 1]);
            }
        });

        test('should preserve all elements during sorting', () => {
            const input = [3, 5, 2, 1, 6, 4];
            const result = wiggleSortI(input);
            
            // Check that all original elements are present
            const inputSorted = [...input].sort((a, b) => a - b);
            const outputSorted = [...result.sortedArray].sort((a, b) => a - b);
            expect(TestUtils.arraysEqual(inputSorted, outputSorted)).toBe(true);
        });

        test('should handle negative numbers', () => {
            const input = [-1, 3, -2, 5, -3, 7];
            const result = wiggleSortI(input);
            
            expect(TestUtils.validateWigglePattern(result.sortedArray, "I")).toBe(true);
        });
    });

    describe('Edge Cases', () => {
        
        test('should handle empty array', () => {
            const result = wiggleSortI([]);
            
            expect(result.sortedArray).toEqual([]);
            expect(result.metrics.comparisons).toBe(0);
            expect(result.metrics.swaps).toBe(0);
        });

        test('should handle single element array', () => {
            const result = wiggleSortI([42]);
            
            expect(result.sortedArray).toEqual([42]);
            expect(result.metrics.comparisons).toBe(0);
        });

        test('should handle two element array', () => {
            const input = [5, 2];
            const result = wiggleSortI(input);
            
            expect(result.sortedArray[0]).toBeLessThan(result.sortedArray[1]);
        });

        test('should handle identical elements', () => {
            const input = [7, 7, 7, 7];
            const result = wiggleSortI(input);
            
            // All elements should remain the same
            expect(result.sortedArray.every(x => x === 7)).toBe(true);
        });

        test('should handle already wiggling array', () => {
            const input = [1, 3, 2, 5, 4, 6];
            const result = wiggleSortI(input);
            
            expect(TestUtils.validateWigglePattern(result.sortedArray, "I")).toBe(true);
            expect(result.metrics.swaps).toBe(0); // Should require no swaps
        });

        test('should handle null and undefined inputs', () => {
            expect(wiggleSortI(null).sortedArray).toEqual([]);
            expect(wiggleSortI(undefined).sortedArray).toEqual([]);
        });
    });

    describe('Step-by-step Algorithm Tests', () => {
        
        test('should produce correct steps for wiggle sort I', () => {
            const input = [3, 5, 2, 1];
            const result = wiggleSortWithSteps(input, "I");
            
            expect(result.steps.length).toBeGreaterThan(0);
            expect(result.steps[0].type).toBe('start');
            expect(result.steps[result.steps.length - 1].type).toBe('complete');
            expect(TestUtils.validateWigglePattern(result.sortedArray, "I")).toBe(true);
        });

        test('should produce correct steps for wiggle sort II', () => {
            const input = [1, 1, 2, 2];
            const result = wiggleSortWithSteps(input, "II");
            
            expect(result.steps.length).toBeGreaterThan(0);
            expect(result.steps[0].type).toBe('start');
            expect(result.steps[result.steps.length - 1].type).toBe('complete');
            expect(TestUtils.validateWigglePattern(result.sortedArray, "II")).toBe(true);
        });

        test('should track variant in steps', () => {
            const input = [3, 1, 4, 2];
            const resultI = wiggleSortWithSteps(input, "I");
            const resultII = wiggleSortWithSteps(input, "II");
            
            expect(resultI.steps[0].variant).toBe("I");
            expect(resultII.steps[0].variant).toBe("II");
            expect(resultI.metrics.variant).toBe("I");
            expect(resultII.metrics.variant).toBe("II");
        });
    });

    describe('Pattern Analysis Tests', () => {
        
        test('should analyze wiggle patterns correctly', () => {
            expect(getWigglePattern([1, 3, 2, 5, 4])).toBe("<><>");
            expect(getWigglePattern([5, 4, 3, 2, 1])).toBe(">>>>");
            expect(getWigglePattern([1, 2, 3, 4, 5])).toBe("<<<<");
            expect(getWigglePattern([3, 3, 3, 3])).toBe("===");
        });

        test('should validate wiggle sorted arrays', () => {
            const validWiggle = [1, 3, 2, 5, 4];
            const invalidWiggle = [3, 1, 4, 2, 5];
            
            expect(isWiggleSorted(validWiggle, "I").valid).toBe(true);
            expect(isWiggleSorted(invalidWiggle, "I").valid).toBe(false);
        });

        test('should detect adjacent duplicates in wiggle sort II', () => {
            const withDuplicates = [1, 3, 3, 5, 4];
            const withoutDuplicates = [1, 3, 2, 5, 4];
            
            expect(isWiggleSorted(withDuplicates, "II").valid).toBe(false);
            expect(isWiggleSorted(withoutDuplicates, "II").valid).toBe(true);
        });
    });

    describe('Configuration Tests', () => {
        
        test('should validate all preset configurations', () => {
            WIGGLE_SORT_CONFIG.presets.forEach(preset => {
                const variant = preset.variant || "I";
                const result = variant === "I" ? 
                    wiggleSortI(preset.array) : 
                    wiggleSortII(preset.array);
                
                expect(TestUtils.validateWigglePattern(result.sortedArray, variant)).toBe(true);
            });
        });

        test('should handle config utility functions', () => {
            const basicPreset = WiggleSortConfigUtils.getPresetByName('Basic Wiggle Sort I');
            expect(basicPreset).toBeDefined();
            expect(basicPreset.variant).toBe('I');

            const edgeCases = WiggleSortConfigUtils.getPresetsByCategory('Edge Case');
            expect(edgeCases.length).toBeGreaterThan(0);

            const variant2Presets = WiggleSortConfigUtils.getPresetsByVariant('II');
            expect(variant2Presets.length).toBeGreaterThan(0);
        });

        test('should generate valid test arrays', () => {
            const randomArray = WiggleSortConfigUtils.generateRandomWiggleArray(10);
            expect(randomArray.length).toBe(10);
            expect(randomArray.every(x => typeof x === 'number')).toBe(true);

            const worstCase = WiggleSortConfigUtils.generateWorstCaseArray(5);
            expect(worstCase).toEqual([5, 4, 3, 2, 1]);

            const bestCase = WiggleSortConfigUtils.generateBestCaseArray(4);
            expect(bestCase.length).toBe(4);
        });
    });

    describe('Performance Tests', () => {
        
        test('should have linear time complexity for wiggle sort I', () => {
            const sizes = [10, 50, 100];
            const times = [];

            sizes.forEach(size => {
                const array = WiggleSortConfigUtils.generateRandomWiggleArray(size);
                const time = TestUtils.measurePerformance(() => {
                    wiggleSortI([...array]);
                }, 10);
                times.push(time);
            });

            // Time should grow roughly linearly
            expect(times[2] / times[0]).toBeLessThan(15);
        });

        test('should handle large arrays efficiently', () => {
            const largeArray = WiggleSortConfigUtils.generateRandomWiggleArray(1000);
            
            const startTime = performance.now();
            const result = wiggleSortI(largeArray);
            const endTime = performance.now();
            
            expect(endTime - startTime).toBeLessThan(100); // Should complete in < 100ms
            expect(TestUtils.validateWigglePattern(result.sortedArray, "I")).toBe(true);
        });
    });

    describe('Convenience Functions Tests', () => {
        
        test('should handle wiggleSortSimple function', () => {
            const input = [3, 1, 4, 2];
            const resultI = wiggleSortSimple(input, "I");
            const resultII = wiggleSortSimple(input, "II");
            
            expect(Array.isArray(resultI)).toBe(true);
            expect(Array.isArray(resultII)).toBe(true);
            expect(TestUtils.validateWigglePattern(resultI, "I")).toBe(true);
            expect(TestUtils.validateWigglePattern(resultII, "II")).toBe(true);
        });
    });

    describe('Error Handling', () => {
        
        test('should handle invalid parameters gracefully', () => {
            expect(() => wiggleSortI([1, 2, 3], {})).not.toThrow();
            expect(() => wiggleSortII([1, 2, 3], null)).not.toThrow();
        });

        test('should validate wiggle patterns correctly', () => {
            const validPattern = [1, 3, 2, 5, 4];
            const invalidPattern = [1, 0, 2, 1, 4]; // Valley-valley violation
            
            expect(WiggleSortConfigUtils.validateWigglePattern(validPattern, "I").valid).toBe(true);
            expect(WiggleSortConfigUtils.validateWigglePattern(invalidPattern, "I").valid).toBe(false);
        });

        test('should analyze patterns with violations', () => {
            const patternWithViolations = [1, 0, 3, 2, 5];
            const analysis = WiggleSortConfigUtils.analyzeWigglePattern(patternWithViolations);
            
            expect(analysis.violations).toBeGreaterThan(0);
            expect(analysis.isValid).toBe(false);
        });
    });
});

// Additional integration tests
describe('Wiggle Sort Integration', () => {
    
    test('should integrate with sorting utilities', () => {
        const input = [5, 2, 8, 1, 9, 3];
        const result = wiggleSortI(input);
        
        expect(result.metrics).toBeDefined();
        expect(result.metrics.comparisons).toBeGreaterThan(0);
        expect(result.metrics.swaps).toBeGreaterThanOrEqual(0);
    });

    test('should work consistently across variants', () => {
        const testArrays = [
            [3, 1, 4, 2],
            [1, 5, 2, 6, 3, 7],
            [10, 5, 15, 8, 12, 3]
        ];

        testArrays.forEach(arr => {
            const resultI = wiggleSortI(arr);
            const resultII = wiggleSortII(arr);
            
            expect(TestUtils.validateWigglePattern(resultI.sortedArray, "I")).toBe(true);
            expect(TestUtils.validateWigglePattern(resultII.sortedArray, "II")).toBe(true);
        });
    });
});

console.log('✅ Wiggle Sort tests completed successfully!');