/**
 * Bucket Sort - Main Module Export
 * 
 * Entry point for the Bucket Sort algorithm implementation,
 * providing both the core algorithm and demo configuration.
 * 
 * @author SimplifyLearning
 * @see https://github.com/sachinlala/SimplifyLearning
 */

// Import core implementation
const {
    bucketSort,
    bucketSortWithSteps,
    bucketSortSimple,
    bucketSortIntegers
} = require('./bucket-sort-core.js');

// Import configuration
const BucketSortConfig = require('./bucket-sort-config.js');

// Main export object
const BucketSortModule = {
    // Core algorithm functions
    bucketSort,
    bucketSortWithSteps,
    bucketSortSimple,
    bucketSortIntegers,
    
    // Configuration for demos and visualization
    config: BucketSortConfig,
    
    // Convenience methods
    sort: bucketSortSimple,  // Simple sort function
    sortWithSteps: bucketSortWithSteps,  // For visualization
    sortIntegers: bucketSortIntegers,  // For integer arrays
    
    // Algorithm information
    info: {
        name: 'Bucket Sort',
        type: 'Distribution Sort',
        timeComplexity: {
            best: 'O(n + k)',
            average: 'O(n + k)',
            worst: 'O(n²)',
            space: 'O(n + k)'
        },
        stable: false,
        inPlace: false,
        description: BucketSortConfig.description
    },
    
    // Quick demo function
    demo: function(arr) {
        if (!arr) {
            arr = BucketSortConfig.testCases[0].input;
        }
        
        console.log('\n🪣 Bucket Sort Demo');
        console.log('===================');
        console.log('Input:', arr);
        
        const result = bucketSortWithSteps(arr);
        
        console.log('Output:', result.sortedArray);
        console.log('Steps:', result.steps.length);
        console.log('Metrics:', result.metrics);
        console.log(`Used ${result.metrics.buckets} buckets with ${result.metrics.bucketSorts} bucket sorts`);
        console.log(`Comparisons: ${result.metrics.comparisons}, Swaps: ${result.metrics.swaps}`);
        
        return result;
    },
    
    // Validation helper
    validate: function(arr) {
        return BucketSortConfig.input.validation.customValidator(arr);
    },
    
    // Performance comparison
    compare: function(arr, otherSortFn, otherName = 'Other Sort') {
        const startTime1 = performance.now();
        const result1 = bucketSort(arr);
        const endTime1 = performance.now();
        
        const startTime2 = performance.now();
        const result2 = otherSortFn([...arr]);
        const endTime2 = performance.now();
        
        return {
            bucketSort: {
                result: result1.sortedArray,
                time: endTime1 - startTime1,
                buckets: result1.metrics.buckets,
                bucketSorts: result1.metrics.bucketSorts,
                comparisons: result1.metrics.comparisons,
                swaps: result1.metrics.swaps
            },
            [otherName]: {
                result: result2,
                time: endTime2 - startTime2,
                buckets: 'N/A',
                bucketSorts: 'N/A',
                comparisons: 'N/A',
                swaps: 'N/A'
            }
        };
    },
    
    // Analyze input distribution for bucket sort effectiveness
    analyze: function(arr) {
        if (!arr || arr.length === 0) {
            return {
                elements: 0,
                range: 0,
                uniformity: 'unknown',
                recommendation: 'No data to analyze'
            };
        }
        
        const min = Math.min(...arr);
        const max = Math.max(...arr);
        const range = max - min;
        const buckets = Math.max(1, Math.floor(Math.sqrt(arr.length)));
        
        // Simple uniformity analysis
        let uniformityScore = 'unknown';
        let recommendation = 'Analyze distribution';
        
        if (range === 0) {
            uniformityScore = 'identical';
            recommendation = 'All elements equal - bucket sort will be trivial';
        } else if (arr.length > 4) {
            // Count elements in quartiles
            const quartileSize = range / 4;
            const quartiles = [0, 0, 0, 0];
            
            arr.forEach(x => {
                const quartile = Math.min(3, Math.floor((x - min) / quartileSize));
                quartiles[quartile]++;
            });
            
            const maxQuartile = Math.max(...quartiles);
            const minQuartile = Math.min(...quartiles.filter(q => q > 0));
            const skewRatio = maxQuartile / minQuartile;
            
            if (skewRatio <= 2) {
                uniformityScore = 'good';
                recommendation = 'Excellent choice for bucket sort';
            } else if (skewRatio <= 4) {
                uniformityScore = 'fair';
                recommendation = 'Good choice for bucket sort';
            } else {
                uniformityScore = 'poor';
                recommendation = 'Consider other sorting algorithms - data is skewed';
            }
        }
        
        return {
            elements: arr.length,
            range: { min, max, span: range },
            predictedBuckets: buckets,
            uniformity: uniformityScore,
            timeComplexity: uniformityScore === 'good' ? 'O(n + k)' : 'O(n²) worst case',
            spaceComplexity: `O(n + ${buckets})`,
            recommendation
        };
    },
    
    // Distribution visualization helper
    visualizeDistribution: function(arr, bucketCount = null) {
        if (!arr || arr.length === 0) {
            console.log('No data to visualize');
            return;
        }
        
        const min = Math.min(...arr);
        const max = Math.max(...arr);
        const range = max - min;
        
        if (range === 0) {
            console.log('All elements are equal:', min);
            return;
        }
        
        bucketCount = bucketCount || Math.max(1, Math.floor(Math.sqrt(arr.length)));
        const buckets = Array.from({ length: bucketCount }, () => []);
        
        // Distribute elements
        arr.forEach(x => {
            const bucketIndex = Math.min(
                bucketCount - 1, 
                Math.floor(((x - min) / range) * bucketCount)
            );
            buckets[bucketIndex].push(x);
        });
        
        console.log('\n📊 Bucket Distribution:');
        console.log(`Range: [${min.toFixed(3)}, ${max.toFixed(3)}]`);
        console.log(`${bucketCount} buckets:\n`);
        
        buckets.forEach((bucket, i) => {
            const start = min + (i * range / bucketCount);
            const end = min + ((i + 1) * range / bucketCount);
            const bar = '█'.repeat(Math.max(1, bucket.length));
            
            console.log(`Bucket ${i} [${start.toFixed(3)}-${end.toFixed(3)}): ${bar} (${bucket.length} elements)`);
            if (bucket.length > 0 && bucket.length <= 8) {
                console.log(`  → [${bucket.map(x => x.toFixed(3)).join(', ')}]`);
            }
        });
    }
};

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BucketSortModule;
}

// Export for browser
if (typeof window !== 'undefined') {
    window.BucketSortModule = BucketSortModule;
    
    // Also export individual components for flexibility
    window.BucketSortCore = {
        bucketSort,
        bucketSortWithSteps,
        bucketSortSimple,
        bucketSortIntegers
    };
    window.BucketSortConfig = BucketSortConfig;
}