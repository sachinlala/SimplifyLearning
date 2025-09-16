/**
 * Bucket Sort - Core Algorithm Implementation
 * 
 * A distribution sorting algorithm that works by distributing elements into buckets,
 * sorting each bucket individually, then concatenating the sorted buckets.
 * 
 * Time Complexity: O(n + k) average case, O(n²) worst case
 * Space Complexity: O(n + k) for buckets
 * 
 * Works best when data is uniformly distributed across the input range.
 * 
 * @author SimplifyLearning
 * @see https://github.com/sachinlala/SimplifyLearning
 */

// Import utilities for reusable functions
const SortingUtils = (typeof require !== 'undefined') ? 
    require('../utils/sorting-utils.js') : window.SortingUtils;

/**
 * Core bucket sort algorithm for floating-point numbers in range [0, 1)
 * @param {number[]} arr - Array of numbers to be sorted
 * @param {Object} options - Options for sorting behavior
 * @returns {Object} Sorted array and metrics
 */
function bucketSort(arr, options = {}) {
    if (!arr || arr.length === 0) {
        return {
            sortedArray: arr || [],
            metrics: { comparisons: 0, swaps: 0, buckets: 0, bucketSorts: 0 }
        };
    }

    // Validate input - should be numbers
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] !== 'number' || isNaN(arr[i])) {
            throw new Error(`Bucket sort requires numbers. Found: ${arr[i]} at index ${i}`);
        }
    }

    const sortedArray = [...arr];
    const n = sortedArray.length;
    let comparisons = 0;
    let swaps = 0;
    let bucketSorts = 0;

    // Determine range of data
    const min = Math.min(...sortedArray);
    const max = Math.max(...sortedArray);
    const range = max - min;
    
    // Handle edge case where all elements are the same
    if (range === 0) {
        return {
            sortedArray,
            metrics: { comparisons, swaps, buckets: 1, bucketSorts: 0 }
        };
    }

    // Create buckets - using square root of n as number of buckets for good performance
    const bucketCount = Math.max(1, Math.floor(Math.sqrt(n)));
    const buckets = Array.from({ length: bucketCount }, () => []);
    
    // Distribute elements into buckets
    for (let i = 0; i < n; i++) {
        const bucketIndex = Math.min(
            bucketCount - 1, 
            Math.floor(((sortedArray[i] - min) / range) * bucketCount)
        );
        buckets[bucketIndex].push(sortedArray[i]);
    }
    
    // Sort each bucket and collect results
    let index = 0;
    for (let i = 0; i < bucketCount; i++) {
        if (buckets[i].length > 0) {
            bucketSorts++;
            // Sort bucket using insertion sort (good for small arrays)
            const sortResult = insertionSortForBucket(buckets[i]);
            comparisons += sortResult.comparisons;
            swaps += sortResult.swaps;
            
            // Copy sorted bucket back to main array
            for (let j = 0; j < buckets[i].length; j++) {
                sortedArray[index++] = buckets[i][j];
            }
        }
    }

    return {
        sortedArray,
        metrics: { 
            comparisons, 
            swaps, 
            buckets: bucketCount,
            bucketSorts,
            range: { min, max, span: range }
        }
    };
}

/**
 * Insertion sort optimized for bucket sorting
 * @param {number[]} arr - Small array to sort
 * @returns {Object} Metrics from sorting
 */
function insertionSortForBucket(arr) {
    let comparisons = 0;
    let swaps = 0;
    
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        let j = i - 1;
        
        while (j >= 0) {
            comparisons++;
            if (arr[j] > key) {
                arr[j + 1] = arr[j];
                swaps++;
                j--;
            } else {
                break;
            }
        }
        arr[j + 1] = key;
    }
    
    return { comparisons, swaps };
}

/**
 * Bucket sort with step-by-step tracking for visualization
 * @param {number[]} arr - Array of numbers to be sorted
 * @returns {Object} Result with sorted array, steps, and metrics
 */
function bucketSortWithSteps(arr) {
    if (!arr || arr.length === 0) {
        return {
            sortedArray: arr || [],
            steps: [],
            metrics: { comparisons: 0, swaps: 0, buckets: 0, bucketSorts: 0 }
        };
    }

    // Validate input
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] !== 'number' || isNaN(arr[i])) {
            throw new Error(`Bucket sort requires numbers. Found: ${arr[i]} at index ${i}`);
        }
    }

    const sortedArray = [...arr];
    const n = sortedArray.length;
    const steps = [];
    let comparisons = 0;
    let swaps = 0;
    let bucketSorts = 0;

    // Initial state
    steps.push({
        type: 'start',
        array: [...sortedArray],
        message: 'Starting Bucket Sort - analyzing data range',
        phase: 'analyze',
        comparisons,
        swaps,
        highlightIndices: []
    });

    // Find min and max
    const min = Math.min(...sortedArray);
    const max = Math.max(...sortedArray);
    const range = max - min;
    
    steps.push({
        type: 'range-analysis',
        array: [...sortedArray],
        message: `Data range: [${min.toFixed(3)}, ${max.toFixed(3)}], span = ${range.toFixed(3)}`,
        phase: 'analyze',
        comparisons,
        swaps,
        highlightIndices: [],
        min, max, range
    });

    // Handle edge case
    if (range === 0) {
        steps.push({
            type: 'complete',
            array: [...sortedArray],
            message: 'All elements are equal - array is already sorted',
            phase: 'complete',
            comparisons,
            swaps,
            highlightIndices: []
        });
        return {
            sortedArray,
            steps,
            metrics: { comparisons, swaps, buckets: 1, bucketSorts: 0 }
        };
    }

    // Create buckets
    const bucketCount = Math.max(1, Math.floor(Math.sqrt(n)));
    const buckets = Array.from({ length: bucketCount }, () => []);
    
    steps.push({
        type: 'create-buckets',
        array: [...sortedArray],
        message: `Created ${bucketCount} buckets for ${n} elements`,
        phase: 'distribute',
        comparisons,
        swaps,
        highlightIndices: [],
        buckets: buckets.map(b => [...b]),
        bucketCount
    });

    // Distribute elements into buckets
    for (let i = 0; i < n; i++) {
        const bucketIndex = Math.min(
            bucketCount - 1, 
            Math.floor(((sortedArray[i] - min) / range) * bucketCount)
        );
        buckets[bucketIndex].push(sortedArray[i]);
        
        steps.push({
            type: 'distribute-element',
            array: [...sortedArray],
            message: `Element ${sortedArray[i].toFixed(3)} → Bucket ${bucketIndex}`,
            phase: 'distribute',
            comparisons,
            swaps,
            highlightIndices: [i],
            buckets: buckets.map(b => [...b]),
            bucketIndex,
            element: sortedArray[i]
        });
    }

    steps.push({
        type: 'distribution-complete',
        array: [...sortedArray],
        message: 'Distribution complete. Now sorting each bucket...',
        phase: 'sort-buckets',
        comparisons,
        swaps,
        highlightIndices: [],
        buckets: buckets.map(b => [...b])
    });

    // Sort each bucket and collect results
    let index = 0;
    for (let i = 0; i < bucketCount; i++) {
        if (buckets[i].length > 0) {
            bucketSorts++;
            const bucketBefore = [...buckets[i]];
            
            steps.push({
                type: 'sort-bucket-start',
                array: [...sortedArray],
                message: `Sorting bucket ${i} with ${buckets[i].length} elements: [${buckets[i].map(x => x.toFixed(3)).join(', ')}]`,
                phase: 'sort-buckets',
                comparisons,
                swaps,
                highlightIndices: [],
                buckets: buckets.map(b => [...b]),
                currentBucket: i,
                bucketBefore
            });
            
            // Sort bucket using insertion sort
            const sortResult = insertionSortForBucketWithSteps(buckets[i], steps, comparisons, swaps, i);
            comparisons = sortResult.comparisons;
            swaps = sortResult.swaps;
            
            steps.push({
                type: 'sort-bucket-complete',
                array: [...sortedArray],
                message: `Bucket ${i} sorted: [${buckets[i].map(x => x.toFixed(3)).join(', ')}]`,
                phase: 'sort-buckets',
                comparisons,
                swaps,
                highlightIndices: [],
                buckets: buckets.map(b => [...b]),
                currentBucket: i,
                bucketAfter: [...buckets[i]]
            });
        }
    }

    steps.push({
        type: 'concatenate-start',
        array: [...sortedArray],
        message: 'Concatenating sorted buckets...',
        phase: 'concatenate',
        comparisons,
        swaps,
        highlightIndices: [],
        buckets: buckets.map(b => [...b])
    });

    // Concatenate buckets
    index = 0;
    for (let i = 0; i < bucketCount; i++) {
        if (buckets[i].length > 0) {
            for (let j = 0; j < buckets[i].length; j++) {
                sortedArray[index] = buckets[i][j];
                
                steps.push({
                    type: 'concatenate-element',
                    array: [...sortedArray],
                    message: `Copying ${buckets[i][j].toFixed(3)} from bucket ${i} to position ${index}`,
                    phase: 'concatenate',
                    comparisons,
                    swaps,
                    highlightIndices: [index],
                    buckets: buckets.map(b => [...b]),
                    sourceBucket: i,
                    targetIndex: index
                });
                
                index++;
            }
        }
    }

    // Final step
    steps.push({
        type: 'complete',
        array: [...sortedArray],
        message: `Bucket Sort complete! Sorted ${n} elements using ${bucketCount} buckets with ${bucketSorts} bucket sorts`,
        phase: 'complete',
        comparisons,
        swaps,
        highlightIndices: [],
        buckets: buckets.map(b => [...b])
    });

    return {
        sortedArray,
        steps,
        metrics: { 
            comparisons, 
            swaps, 
            buckets: bucketCount,
            bucketSorts,
            range: { min, max, span: range }
        }
    };
}

/**
 * Insertion sort with step tracking for bucket visualization
 * @param {number[]} arr - Bucket to sort
 * @param {Array} steps - Steps array to append to
 * @param {number} comparisons - Current comparison count
 * @param {number} swaps - Current swap count
 * @param {number} bucketIndex - Which bucket is being sorted
 * @returns {Object} Updated metrics
 */
function insertionSortForBucketWithSteps(arr, steps, comparisons, swaps, bucketIndex) {
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        let j = i - 1;
        
        while (j >= 0) {
            comparisons++;
            if (arr[j] > key) {
                arr[j + 1] = arr[j];
                swaps++;
                
                steps.push({
                    type: 'bucket-sort-step',
                    array: [],
                    message: `Bucket ${bucketIndex}: Moving ${arr[j].toFixed(3)} right, inserting ${key.toFixed(3)}`,
                    phase: 'sort-buckets',
                    comparisons,
                    swaps,
                    highlightIndices: [],
                    bucketIndex,
                    bucketArray: [...arr],
                    insertingElement: key
                });
                
                j--;
            } else {
                break;
            }
        }
        arr[j + 1] = key;
    }
    
    return { comparisons, swaps };
}

/**
 * Simple bucket sort function (backward compatibility)
 * @param {number[]} arr - Array of numbers to sort
 * @returns {number[]} Sorted array
 */
function bucketSortSimple(arr) {
    const result = bucketSort(arr);
    return result.sortedArray;
}

/**
 * Bucket sort for integers in a specific range
 * @param {number[]} arr - Array of integers to sort
 * @param {number} maxValue - Maximum value in the array
 * @returns {Object} Sorted array and metrics
 */
function bucketSortIntegers(arr, maxValue = null) {
    if (!arr || arr.length === 0) {
        return {
            sortedArray: arr || [],
            metrics: { comparisons: 0, swaps: 0, buckets: 0, bucketSorts: 0 }
        };
    }

    // Find max value if not provided
    if (maxValue === null) {
        maxValue = Math.max(...arr);
    }
    
    // Normalize to [0, 1) range for bucket sort
    const normalized = arr.map(x => x / (maxValue + 1));
    
    // Apply bucket sort
    const result = bucketSort(normalized);
    
    // Denormalize back to original range
    result.sortedArray = result.sortedArray.map(x => Math.floor(x * (maxValue + 1)));
    
    return result;
}

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        bucketSort,
        bucketSortWithSteps,
        bucketSortSimple,
        bucketSortIntegers
    };
} else if (typeof window !== 'undefined') {
    window.BucketSortCore = {
        bucketSort,
        bucketSortWithSteps,
        bucketSortSimple,
        bucketSortIntegers
    };
    // Expose commonly used functions in global scope for demo configs
    window.bucketSortWithSteps = bucketSortWithSteps;
    // Backward compatibility
    window.bucketSort = bucketSortSimple;
}