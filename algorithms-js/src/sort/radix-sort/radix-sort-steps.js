/**
 * Radix Sort - Step Tracking Functions
 * 
 * This file contains step tracking functions for radix sort visualization.
 * Separated from core algorithm logic for better maintainability.
 * 
 * @see https://github.com/sachinlala/SimplifyLearning
 */

/**
 * Radix sort with detailed step tracking for visualization
 * @param {number[]} arr - Array to be sorted
 * @param {number} base - Base for radix sort (default 10)
 * @returns {Object} Result with sorted array, steps, and metrics
 */
function radixSortWithSteps(arr, base = 10) {
    if (!arr || arr.length <= 1) {
        return {
            sortedArray: arr || [],
            steps: [],
            metrics: { comparisons: 0, passes: 0, bucketOperations: 0, maxDigits: 0 }
        };
    }

    const steps = [];
    const metrics = { comparisons: 0, passes: 0, bucketOperations: 0, maxDigits: 0 };
    const workingArray = [...arr];
    const n = workingArray.length;
    
    // Find the maximum number to determine number of digits
    let max = Math.max(...workingArray);
    metrics.maxDigits = max.toString(base).length;
    
    steps.push({
        type: 'initialize',
        array: [...workingArray],
        phase: 'initialization',
        base: base,
        maxValue: max,
        maxDigits: metrics.maxDigits,
        message: `Starting Radix Sort with base ${base}. Max value: ${max}, Max digits: ${metrics.maxDigits}`,
        metrics: { ...metrics }
    });
    
    // Process each digit position
    for (let digitPos = 0; digitPos < metrics.maxDigits; digitPos++) {
        const power = Math.pow(base, digitPos);
        metrics.passes++;
        
        // Initialize buckets for current digit position
        const buckets = Array(base).fill().map(() => []);
        
        steps.push({
            type: 'pass-start',
            array: [...workingArray],
            phase: 'digit-processing',
            digitPosition: digitPos,
            power: power,
            currentDigit: `${digitPos + 1}${digitPos === 0 ? 'st' : digitPos === 1 ? 'nd' : digitPos === 2 ? 'rd' : 'th'}`,
            buckets: buckets.map(bucket => [...bucket]),
            message: `Pass ${metrics.passes}: Processing ${digitPos + 1}${digitPos === 0 ? 'st' : digitPos === 1 ? 'nd' : digitPos === 2 ? 'rd' : 'th'} digit (place value ${power})`,
            metrics: { ...metrics }
        });
        
        // Distribute elements into buckets based on current digit
        for (let i = 0; i < n; i++) {
            const digit = Math.floor(workingArray[i] / power) % base;
            buckets[digit].push(workingArray[i]);
            metrics.bucketOperations++;
            
            steps.push({
                type: 'distribute',
                array: [...workingArray],
                phase: 'distribution',
                digitPosition: digitPos,
                power: power,
                currentElement: workingArray[i],
                currentElementIndex: i,
                extractedDigit: digit,
                targetBucket: digit,
                buckets: buckets.map(bucket => [...bucket]),
                message: `Element ${workingArray[i]}: digit at position ${digitPos + 1} is ${digit}, placed in bucket ${digit}`,
                metrics: { ...metrics }
            });
        }
        
        steps.push({
            type: 'distribution-complete',
            array: [...workingArray],
            phase: 'distribution-complete',
            digitPosition: digitPos,
            buckets: buckets.map(bucket => [...bucket]),
            message: `All elements distributed based on digit position ${digitPos + 1}`,
            metrics: { ...metrics }
        });
        
        // Collect elements back from buckets in order
        let index = 0;
        for (let bucketIndex = 0; bucketIndex < base; bucketIndex++) {
            const bucket = buckets[bucketIndex];
            
            if (bucket.length > 0) {
                steps.push({
                    type: 'collect-bucket-start',
                    array: [...workingArray],
                    phase: 'collection',
                    digitPosition: digitPos,
                    buckets: buckets.map(bucket => [...bucket]),
                    currentBucket: bucketIndex,
                    bucketSize: bucket.length,
                    message: `Collecting ${bucket.length} elements from bucket ${bucketIndex}: [${bucket.join(', ')}]`,
                    metrics: { ...metrics }
                });
            }
            
            for (let j = 0; j < bucket.length; j++) {
                workingArray[index] = bucket[j];
                
                steps.push({
                    type: 'collect',
                    array: [...workingArray],
                    phase: 'collection',
                    digitPosition: digitPos,
                    buckets: buckets.map(bucket => [...bucket]),
                    collectedElement: bucket[j],
                    collectedFrom: { bucket: bucketIndex, position: j },
                    collectedTo: index,
                    message: `Collected ${bucket[j]} from bucket ${bucketIndex} to position ${index}`,
                    metrics: { ...metrics }
                });
                
                index++;
            }
        }
        
        steps.push({
            type: 'pass-complete',
            array: [...workingArray],
            phase: 'pass-complete',
            digitPosition: digitPos,
            passNumber: metrics.passes,
            message: `Pass ${metrics.passes} completed. Array after processing digit position ${digitPos + 1}: [${workingArray.join(', ')}]`,
            metrics: { ...metrics }
        });
    }
    
    steps.push({
        type: 'complete',
        array: [...workingArray],
        phase: 'complete',
        totalPasses: metrics.passes,
        message: `Radix sort completed! Sorted array with ${metrics.passes} passes using base ${base}.`,
        metrics: { ...metrics }
    });
    
    return {
        sortedArray: workingArray,
        steps: steps,
        metrics: metrics
    };
}

/**
 * Get digit at specified position for a number
 * @param {number} num - The number
 * @param {number} position - Digit position (0 = rightmost)
 * @param {number} base - Number base
 * @returns {number} The digit at the specified position
 */
function getDigit(num, position, base = 10) {
    return Math.floor(num / Math.pow(base, position)) % base;
}

/**
 * Get number of digits in the maximum number
 * @param {number[]} arr - Array of numbers
 * @param {number} base - Number base
 * @returns {number} Number of digits in max number
 */
function getMaxDigits(arr, base = 10) {
    const max = Math.max(...arr);
    return max.toString(base).length;
}

// Browser compatibility
if (typeof window !== 'undefined') {
    window.RadixSortSteps = {
        radixSortWithSteps,
        getDigit,
        getMaxDigits
    };
}

// Export for CommonJS compatibility
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        radixSortWithSteps,
        getDigit,
        getMaxDigits
    };
}