/**
 * Bucket Sort - Step Tracking Functions
 * 
 * This file contains step tracking functions for bucket sort visualization.
 * Separated from core algorithm logic for better maintainability.
 * 
 * @see https://github.com/sachinlala/SimplifyLearning
 */

/**
 * Bucket sort with detailed step tracking for visualization
 * @param {number[]} arr - Array to be sorted
 * @param {number} bucketCount - Number of buckets (optional)
 * @returns {Object} Result with sorted array, steps, and metrics
 */
function bucketSortWithSteps(arr, bucketCount = null) {
    if (!arr || arr.length <= 1) {
        return {
            sortedArray: arr || [],
            steps: [],
            metrics: { comparisons: 0, swaps: 0, bucketOperations: 0, insertions: 0 }
        };
    }

    const steps = [];
    const metrics = { comparisons: 0, swaps: 0, bucketOperations: 0, insertions: 0 };
    const workingArray = [...arr];
    const n = workingArray.length;
    
    // Determine bucket count if not provided
    if (!bucketCount) {
        bucketCount = Math.floor(Math.sqrt(n));
    }
    
    // Find min and max values for range calculation
    let min = workingArray[0];
    let max = workingArray[0];
    
    for (let i = 1; i < n; i++) {
        metrics.comparisons += 2;
        if (workingArray[i] < min) min = workingArray[i];
        if (workingArray[i] > max) max = workingArray[i];
    }
    
    const range = max - min + 1;
    const bucketSize = range / bucketCount;
    
    // Initialize buckets
    const buckets = Array(bucketCount).fill().map(() => []);
    
    steps.push({
        type: 'initialize',
        array: [...workingArray],
        phase: 'initialization',
        buckets: buckets.map(bucket => [...bucket]),
        bucketCount: bucketCount,
        range: { min, max, bucketSize },
        message: `Initialized ${bucketCount} buckets. Range: [${min}, ${max}], Bucket size: ${bucketSize.toFixed(2)}`,
        metrics: { ...metrics }
    });
    
    // Distribute elements into buckets
    for (let i = 0; i < n; i++) {
        const bucketIndex = Math.min(Math.floor((workingArray[i] - min) / bucketSize), bucketCount - 1);
        buckets[bucketIndex].push(workingArray[i]);
        metrics.bucketOperations++;
        
        steps.push({
            type: 'distribute',
            array: [...workingArray],
            phase: 'distribution',
            buckets: buckets.map(bucket => [...bucket]),
            currentElement: workingArray[i],
            currentElementIndex: i,
            targetBucket: bucketIndex,
            message: `Element ${workingArray[i]} placed in bucket ${bucketIndex}`,
            metrics: { ...metrics }
        });
    }
    
    steps.push({
        type: 'distribution-complete',
        array: [...workingArray],
        phase: 'distribution-complete',
        buckets: buckets.map(bucket => [...bucket]),
        message: 'All elements distributed to buckets',
        metrics: { ...metrics }
    });
    
    // Sort individual buckets and collect elements
    let sortedIndex = 0;
    const finalArray = new Array(n);
    
    for (let i = 0; i < bucketCount; i++) {
        if (buckets[i].length === 0) continue;
        
        // Sort current bucket (using insertion sort)
        const bucket = [...buckets[i]];
        
        steps.push({
            type: 'sort-bucket-start',
            array: [...workingArray],
            phase: 'bucket-sorting',
            buckets: buckets.map(bucket => [...bucket]),
            currentBucket: i,
            bucketBeforeSort: [...bucket],
            message: `Sorting bucket ${i} with ${bucket.length} elements`,
            metrics: { ...metrics }
        });
        
        // Insertion sort on current bucket
        for (let j = 1; j < bucket.length; j++) {
            const key = bucket[j];
            let k = j - 1;
            
            while (k >= 0 && bucket[k] > key) {
                metrics.comparisons++;
                bucket[k + 1] = bucket[k];
                metrics.insertions++;
                k--;
            }
            if (k >= 0) metrics.comparisons++; // Count the failed comparison
            
            bucket[k + 1] = key;
            
            if (k !== j - 1) { // Only add step if there was movement
                steps.push({
                    type: 'sort-bucket-step',
                    array: [...workingArray],
                    phase: 'bucket-sorting',
                    buckets: buckets.map((b, idx) => idx === i ? [...bucket] : [...b]),
                    currentBucket: i,
                    sortedElement: key,
                    sortedPosition: k + 1,
                    message: `In bucket ${i}: Inserted ${key} at position ${k + 1}`,
                    metrics: { ...metrics }
                });
            }
        }
        
        // Update the bucket in our buckets array
        buckets[i] = [...bucket];
        
        steps.push({
            type: 'sort-bucket-complete',
            array: [...workingArray],
            phase: 'bucket-sorting',
            buckets: buckets.map(bucket => [...bucket]),
            currentBucket: i,
            bucketAfterSort: [...bucket],
            message: `Bucket ${i} sorted: [${bucket.join(', ')}]`,
            metrics: { ...metrics }
        });
        
        // Collect elements from sorted bucket
        for (let j = 0; j < bucket.length; j++) {
            finalArray[sortedIndex] = bucket[j];
            
            steps.push({
                type: 'collect',
                array: [...finalArray],
                phase: 'collection',
                buckets: buckets.map(bucket => [...bucket]),
                collectedElement: bucket[j],
                collectedFrom: { bucket: i, position: j },
                collectedTo: sortedIndex,
                message: `Collected ${bucket[j]} from bucket ${i} to position ${sortedIndex}`,
                metrics: { ...metrics }
            });
            
            sortedIndex++;
        }
    }
    
    steps.push({
        type: 'complete',
        array: [...finalArray],
        phase: 'complete',
        buckets: buckets.map(bucket => [...bucket]),
        message: `Bucket sort completed! Array sorted with ${bucketCount} buckets.`,
        metrics: { ...metrics }
    });
    
    return {
        sortedArray: finalArray,
        steps: steps,
        metrics: metrics
    };
}

// Browser compatibility
if (typeof window !== 'undefined') {
    window.BucketSortSteps = {
        bucketSortWithSteps
    };
}

// Export for CommonJS compatibility
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        bucketSortWithSteps 
    };
}