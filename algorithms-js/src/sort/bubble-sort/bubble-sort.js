/**
 * Bubble Sort Algorithm Implementation
 * 
 * Bubble Sort is a simple sorting algorithm that repeatedly steps through the list,
 * compares adjacent elements and swaps them if they are in the wrong order.
 * The pass through the list is repeated until the list is sorted.
 * 
 * Time Complexity: O(n²) in worst and average case, O(n) in best case
 * Space Complexity: O(1)
 * 
 * @author SimplifyLearning
 * @see https://github.com/SimplifyLearning/algorithms-java
 */

class BubbleSort {
    constructor() {
        this.steps = [];
        this.comparisons = 0;
        this.swaps = 0;
    }

    /**
     * Sorts an array using bubble sort algorithm
     * @param {number[]} arr - Array to be sorted
     * @param {boolean} trackSteps - Whether to track steps for visualization
     * @returns {number[]} Sorted array
     */
    sort(arr, trackSteps = false) {
        if (!arr || arr.length <= 1) {
            return arr;
        }

        // Create a copy to avoid modifying the original array
        const sortedArray = [...arr];
        const n = sortedArray.length;
        
        this.reset();
        
        if (trackSteps) {
            this.addStep({
                type: 'start',
                array: [...sortedArray],
                message: 'Starting Bubble Sort',
                comparisons: this.comparisons,
                swaps: this.swaps
            });
        }

        // Bubble sort implementation
        for (let i = 0; i < n - 1; i++) {
            let swapped = false;
            
            if (trackSteps) {
                this.addStep({
                    type: 'pass-start',
                    array: [...sortedArray],
                    message: `Pass ${i + 1}: Looking for the ${this.getOrdinal(n - i)} largest element`,
                    currentPass: i + 1,
                    comparisons: this.comparisons,
                    swaps: this.swaps,
                    sortedUpTo: n - i
                });
            }

            for (let j = 0; j < n - i - 1; j++) {
                this.comparisons++;
                
                if (trackSteps) {
                    this.addStep({
                        type: 'compare',
                        array: [...sortedArray],
                        message: `Comparing ${sortedArray[j]} and ${sortedArray[j + 1]}`,
                        compareIndices: [j, j + 1],
                        comparisons: this.comparisons,
                        swaps: this.swaps
                    });
                }

                if (sortedArray[j] > sortedArray[j + 1]) {
                    // Swap elements
                    [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
                    this.swaps++;
                    swapped = true;

                    if (trackSteps) {
                        this.addStep({
                            type: 'swap',
                            array: [...sortedArray],
                            message: `Swapped ${sortedArray[j + 1]} and ${sortedArray[j]}`,
                            swapIndices: [j, j + 1],
                            comparisons: this.comparisons,
                            swaps: this.swaps
                        });
                    }
                } else if (trackSteps) {
                    this.addStep({
                        type: 'no-swap',
                        array: [...sortedArray],
                        message: `No swap needed - ${sortedArray[j]} ≤ ${sortedArray[j + 1]}`,
                        compareIndices: [j, j + 1],
                        comparisons: this.comparisons,
                        swaps: this.swaps
                    });
                }
            }

            if (trackSteps) {
                this.addStep({
                    type: 'pass-end',
                    array: [...sortedArray],
                    message: swapped 
                        ? `Pass ${i + 1} complete. Element ${sortedArray[n - i - 1]} is in its final position.`
                        : `Pass ${i + 1} complete. No swaps made - array is sorted!`,
                    currentPass: i + 1,
                    comparisons: this.comparisons,
                    swaps: this.swaps,
                    sortedUpTo: n - i - 1
                });
            }

            // Early termination if no swaps were made
            if (!swapped) {
                if (trackSteps) {
                    this.addStep({
                        type: 'early-termination',
                        array: [...sortedArray],
                        message: 'Array is already sorted. Terminating early.',
                        comparisons: this.comparisons,
                        swaps: this.swaps
                    });
                }
                break;
            }
        }

        if (trackSteps) {
            this.addStep({
                type: 'complete',
                array: [...sortedArray],
                message: `Bubble Sort complete! Made ${this.comparisons} comparisons and ${this.swaps} swaps.`,
                comparisons: this.comparisons,
                swaps: this.swaps
            });
        }

        return sortedArray;
    }

    /**
     * Reset tracking variables
     */
    reset() {
        this.steps = [];
        this.comparisons = 0;
        this.swaps = 0;
    }

    /**
     * Add a step to the tracking array
     * @param {Object} step - Step information
     */
    addStep(step) {
        this.steps.push({
            ...step,
            stepNumber: this.steps.length + 1,
            timestamp: Date.now()
        });
    }

    /**
     * Get all tracking steps
     * @returns {Array} Array of steps
     */
    getSteps() {
        return this.steps;
    }

    /**
     * Get performance metrics
     * @returns {Object} Performance metrics
     */
    getMetrics() {
        return {
            comparisons: this.comparisons,
            swaps: this.swaps,
            totalSteps: this.steps.length
        };
    }

    /**
     * Convert number to ordinal (1st, 2nd, 3rd, etc.)
     * @param {number} num - Number to convert
     * @returns {string} Ordinal string
     */
    getOrdinal(num) {
        const suffixes = ['th', 'st', 'nd', 'rd'];
        const v = num % 100;
        return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
    }
}

/**
 * Simple bubble sort function for demos
 * @param {number[]} arr - Array to sort
 * @returns {number[]} Sorted array
 */
function bubbleSort(arr) {
    if (!arr || arr.length <= 1) {
        return arr || [];
    }
    
    const result = [...arr];
    const n = result.length;
    
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if (result[j] > result[j + 1]) {
                // Swap elements
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
                swapped = true;
            }
        }
        
        // If no swapping occurred, array is sorted
        if (!swapped) {
            break;
        }
    }
    
    return result;
}

// Make functions available globally for browser use
if (typeof window !== 'undefined') {
    window.BubbleSort = BubbleSort;
    window.bubbleSort = bubbleSort;
}

// Export for CommonJS compatibility
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BubbleSort, bubbleSort };
}
