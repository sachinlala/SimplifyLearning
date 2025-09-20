/**
 * Configuration for Bucket Sort Interactive Demo
 * 
 * This configuration defines the demo properties and test cases for
 * Bucket Sort algorithm visualization and interaction.
 */

const BucketSortConfig = {
    // Top-level properties for dynamic template compatibility
    name: 'Bucket Sort',
    category: 'sort',
    hasStepsFile: true,
    hasVisualization: true,
    problem: 'Sort an array of floating-point numbers by distributing them into buckets, sorting each bucket individually, then concatenating the results. Most efficient with uniformly distributed data.',
    
    // Inputs for the demo interface
    inputs: [
        {
            id: 'array-input',
            type: 'text',
            label: 'Array Elements (integers or decimals)',
            defaultValue: '0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12',
            width: '280px'
        },
        {
            id: 'bucket-count',
            type: 'number',
            label: 'Number of Buckets',
            defaultValue: 5,
            min: 2,
            max: 10,
            width: '100px'
        }
    ],
    
    explanation: {
        description: 'Bucket Sort is a distribution sorting algorithm that works by dividing elements into a finite number of buckets. Each bucket is then sorted individually, either using a different sorting algorithm or by recursively applying bucket sort. Finally, the buckets are concatenated to produce the sorted array. It works best when input is uniformly distributed over a range.'
    },
    
    // Multi-language source code paths
    sourceCode: {
        javascript: "https://github.com/sachinlala/SimplifyLearning/blob/master/algorithms-js/src/sort/bucket-sort/bucket-sort-core.js",
        java: "https://github.com/sachinlala/SimplifyLearning/tree/master/algorithms-java/src/main/java/com/sl/algorithms/sort/finitegroups/bucketsort",
        python: "", // Coming soon
        go: "" // Coming soon
    },
    
    // Demo identification and display
    id: 'bucket-sort',
    description: 'A distribution sorting algorithm that divides elements into buckets, sorts each bucket individually, then concatenates them. Works best with uniformly distributed data.',
    
    // Algorithm properties
    timeComplexity: {
        best: 'O(n + k)',
        average: 'O(n + k)',
        worst: 'O(n²)',
        space: 'O(n + k)',
        description: 'where n = elements, k = buckets. Worst case occurs when all elements go to one bucket'
    },
    
    // Algorithm characteristics
    properties: {
        stable: false,
        inPlace: false,
        adaptive: false,
        online: false,
        comparison: true, // Uses comparison in bucket sorting step
        distribution: true,
        integerOnly: false,
        notes: [
            'Works best with uniformly distributed data',
            'Performance degrades with skewed data distribution',
            'Uses insertion sort for individual bucket sorting',
            'Number of buckets affects performance',
            'Can work with floating-point numbers'
        ]
    },
    
    // Input constraints and validation
    input: {
        type: 'array',
        elementType: 'number',
        constraints: {
            minSize: 1,
            maxSize: 15,
            minValue: 0.0,
            maxValue: 1.0,
            allowDuplicates: true,
            allowNegative: false
        },
        validation: {
            required: true,
            customValidator: function(arr) {
                // Check if all elements are numbers
                for (let i = 0; i < arr.length; i++) {
                    if (typeof arr[i] !== 'number' || isNaN(arr[i])) {
                        return {
                            valid: false,
                            message: `Bucket sort requires numbers. Found: ${arr[i]} at index ${i}`
                        };
                    }
                }
                
                // Warn for non-uniform distribution
                if (arr.length > 5) {
                    const min = Math.min(...arr);
                    const max = Math.max(...arr);
                    const range = max - min;
                    
                    if (range === 0) {
                        return {
                            valid: true,
                            warning: 'All elements are equal - bucket sort will be trivial.'
                        };
                    }
                    
                    // Simple uniformity check - count elements in each quartile
                    const quartileSize = range / 4;
                    const quartileCounts = [0, 0, 0, 0];
                    
                    arr.forEach(x => {
                        const quartile = Math.min(3, Math.floor((x - min) / quartileSize));
                        quartileCounts[quartile]++;
                    });
                    
                    const maxCount = Math.max(...quartileCounts);
                    const minCount = Math.min(...quartileCounts.filter(c => c > 0));
                    
                    if (maxCount > minCount * 3) {
                        return {
                            valid: true,
                            warning: 'Data appears skewed - bucket sort performance may be suboptimal.'
                        };
                    }
                }
                
                return { valid: true };
            }
        }
    },
    
    // Visualization settings
    visualization: {
        showComparisons: true,   // Show comparisons within buckets
        showSwaps: true,         // Show swaps within buckets
        showBuckets: true,       // Show bucket distribution
        showDistribution: true,  // Show distribution process
        animationSpeed: {
            slow: 2500,
            medium: 1500,
            fast: 700
        },
        colors: {
            default: '#e3f2fd',      // Light blue for default elements
            highlight: '#2196f3',     // Blue for current element
            bucket0: '#ffebee',      // Light red
            bucket1: '#f3e5f5',      // Light purple
            bucket2: '#e8f5e8',      // Light green
            bucket3: '#fff3e0',      // Light orange
            bucket4: '#e0f2f1',      // Light teal
            bucket5: '#fce4ec',      // Light pink
            sorting: '#ff9800',      // Orange for bucket being sorted
            complete: '#8bc34a'      // Light green for completed
        },
        phases: {
            'analyze': {
                name: 'Analyze Range',
                description: 'Determining data range and bucket count',
                color: '#f44336'
            },
            'distribute': {
                name: 'Distribute Elements',
                description: 'Placing elements into appropriate buckets',
                color: '#2196f3'
            },
            'sort-buckets': {
                name: 'Sort Buckets',
                description: 'Sorting individual buckets using insertion sort',
                color: '#ff9800'
            },
            'concatenate': {
                name: 'Concatenate',
                description: 'Combining sorted buckets into final result',
                color: '#4caf50'
            },
            'complete': {
                name: 'Complete',
                description: 'Array is now sorted',
                color: '#8bc34a'
            }
        }
    },
    
    // Test cases for the demo
    testCases: [
        {
            name: 'Uniform Distribution',
            input: [0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12, 0.23, 0.68],
            description: 'Well-distributed floating-point numbers',
            expected: [0.12, 0.17, 0.21, 0.23, 0.26, 0.39, 0.68, 0.72, 0.78, 0.94],
            difficulty: 'easy'
        },
        {
            name: 'Simple Example',
            input: [0.42, 0.32, 0.33, 0.52, 0.37, 0.47, 0.51],
            description: 'Basic bucket sort example',
            expected: [0.32, 0.33, 0.37, 0.42, 0.47, 0.51, 0.52],
            difficulty: 'easy'
        },
        {
            name: 'Small Range',
            input: [0.2, 0.3, 0.1, 0.4, 0.25, 0.35],
            description: 'Numbers in a smaller range',
            expected: [0.1, 0.2, 0.25, 0.3, 0.35, 0.4],
            difficulty: 'easy'
        },
        {
            name: 'Already Sorted',
            input: [0.1, 0.2, 0.3, 0.4, 0.5],
            description: 'Already sorted data',
            expected: [0.1, 0.2, 0.3, 0.4, 0.5],
            difficulty: 'easy'
        },
        {
            name: 'Reverse Sorted',
            input: [0.9, 0.7, 0.5, 0.3, 0.1],
            description: 'Reverse sorted data',
            expected: [0.1, 0.3, 0.5, 0.7, 0.9],
            difficulty: 'medium'
        },
        {
            name: 'With Duplicates',
            input: [0.5, 0.2, 0.8, 0.2, 0.5, 0.8, 0.3],
            description: 'Array with duplicate values',
            expected: [0.2, 0.2, 0.3, 0.5, 0.5, 0.8, 0.8],
            difficulty: 'medium'
        },
        {
            name: 'Skewed Distribution',
            input: [0.01, 0.02, 0.03, 0.04, 0.05, 0.95, 0.96, 0.97],
            description: 'Data clustered at extremes - tests worst-case performance',
            expected: [0.01, 0.02, 0.03, 0.04, 0.05, 0.95, 0.96, 0.97],
            difficulty: 'hard'
        },
        {
            name: 'Single Bucket Case',
            input: [0.1, 0.11, 0.12, 0.13, 0.14, 0.15],
            description: 'Very close values - most will go to same bucket',
            expected: [0.1, 0.11, 0.12, 0.13, 0.14, 0.15],
            difficulty: 'hard'
        },
        {
            name: 'Integer Array',
            input: [64, 34, 25, 12, 22, 11, 90],
            description: 'Integer array - will be normalized for bucket sort',
            expected: [11, 12, 22, 25, 34, 64, 90],
            difficulty: 'easy'
        },
        {
            name: 'Small Integers',
            input: [5, 2, 8, 1, 9, 3],
            description: 'Small integer values',
            expected: [1, 2, 3, 5, 8, 9],
            difficulty: 'easy'
        },
        {
            name: 'Large Range Integers',
            input: [100, 50, 200, 10, 150, 75],
            description: 'Integers with large range - tests normalization',
            expected: [10, 50, 75, 100, 150, 200],
            difficulty: 'medium'
        }
    ],
    
    // Performance comparison data
    performance: {
        description: 'Bucket Sort vs Other Algorithms',
        scenarios: [
            {
                size: 10,
                bucketSort: { time: 'O(n + k)', buckets: '~3', bucketSorts: '~3' },
                quickSort: { time: 'O(n log n)', buckets: 'N/A', bucketSorts: 'N/A' },
                radixSort: { time: 'O((n+k)×d)', buckets: 'N/A', bucketSorts: 'N/A' }
            },
            {
                size: 100,
                bucketSort: { time: 'O(n + k)', buckets: '~10', bucketSorts: '~10' },
                quickSort: { time: 'O(n log n)', buckets: 'N/A', bucketSorts: 'N/A' },
                radixSort: { time: 'O((n+k)×d)', buckets: 'N/A', bucketSorts: 'N/A' }
            },
            {
                size: 1000,
                bucketSort: { time: 'O(n + k)', buckets: '~32', bucketSorts: '~32' },
                quickSort: { time: 'O(n log n)', buckets: 'N/A', bucketSorts: 'N/A' },
                radixSort: { time: 'O((n+k)×d)', buckets: 'N/A', bucketSorts: 'N/A' }
            }
        ],
        notes: [
            'Bucket sort uses sqrt(n) buckets for optimal performance',
            'Each bucket is sorted using insertion sort',
            'Performance heavily depends on data distribution',
            'Best case when data is uniformly distributed'
        ]
    },
    
    // Educational content
    concepts: {
        keyIdeas: [
            'Distribution-based sorting algorithm',
            'Divides elements into buckets based on value ranges',
            'Sorts each bucket individually',
            'Concatenates sorted buckets for final result',
            'Performance depends on data distribution'
        ],
        whenToUse: [
            'Data is uniformly distributed over a range',
            'Working with floating-point numbers',
            'When linear average-case time is needed',
            'Input range is known and reasonable'
        ],
        limitations: [
            'Performance degrades with skewed data',
            'Requires knowledge of input range',
            'Not stable (equal elements may be reordered)',
            'Worst case is O(n²) when all elements go to one bucket',
            'Uses extra space for buckets'
        ]
    },
    
    // Code implementation details
    implementation: {
        coreFunction: 'bucketSortWithSteps',
        inputPreprocessor: function(input) {
            // Ensure input is an array of numbers in [0,1] range
            if (typeof input === 'string') {
                input = input.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
            }
            
            if (Array.isArray(input)) {
                input = input.map(x => Number(x)).filter(n => !isNaN(n));
            } else {
                input = [Number(input)].filter(n => !isNaN(n));
            }
            
            // Normalize to [0,1] range for demo
            if (input.length > 0) {
                const min = Math.min(...input);
                const max = Math.max(...input);
                const range = max - min;
                
                if (range > 0) {
                    input = input.map(x => (x - min) / range);
                }
            }
            
            return input;
        },
        resultProcessor: function(result) {
            return {
                sortedArray: result.sortedArray,
                steps: result.steps,
                metrics: result.metrics,
                summary: {
                    algorithm: 'Bucket Sort',
                    elements: result.sortedArray.length,
                    buckets: result.metrics.buckets,
                    bucketSorts: result.metrics.bucketSorts,
                    comparisons: result.metrics.comparisons,
                    swaps: result.metrics.swaps,
                    timeComplexity: 'O(n + k) where n=' + result.sortedArray.length + ', k=' + (result.metrics.buckets || 'unknown')
                }
            };
        }
    },
    
    // Help and documentation
    help: {
        algorithm: 'Bucket Sort divides elements into buckets based on their values, sorts each bucket individually using insertion sort, then concatenates the sorted buckets.',
        steps: [
            '1. Analyze the data range to determine minimum and maximum values',
            '2. Create k buckets (typically √n buckets for optimal performance)',
            '3. Distribute elements into buckets based on their relative position in the range',
            '4. Sort each non-empty bucket using insertion sort',
            '5. Concatenate all sorted buckets to produce the final sorted array'
        ],
        tips: [
            'Works best when input is uniformly distributed',
            'Performance degrades significantly with skewed data',
            'Number of buckets affects performance - too few or too many can be suboptimal',
            'Each bucket is sorted using insertion sort (efficient for small arrays)',
            'Not stable - equal elements may appear in different order'
        ],
        examples: [
            {
                title: 'Example: [0.78, 0.17, 0.39, 0.26, 0.72]',
                explanation: 'Using 3 buckets for range [0.17, 0.78]',
                steps: [
                    'Bucket 0 [0.17-0.37]: [0.17, 0.26] → sorted: [0.17, 0.26]',
                    'Bucket 1 [0.37-0.57]: [0.39] → sorted: [0.39]',
                    'Bucket 2 [0.57-0.78]: [0.78, 0.72] → sorted: [0.72, 0.78]',
                    'Concatenate: [0.17, 0.26, 0.39, 0.72, 0.78]'
                ]
            }
        ]
    },
    
    customDemoFunction: `
        function runDemo() {
            const arrayInputStr = document.getElementById('array-input').value;
            const bucketCountStr = document.getElementById('bucket-count').value;
            const resultContainer = document.getElementById('result');
            const errorContainer = document.getElementById('error-message');
            const visualizationSection = document.getElementById('visualization-section');

            // Clear previous error and result
            errorContainer.innerHTML = '';
            errorContainer.style.display = 'none';
            resultContainer.innerHTML = '';
            visualizationSection.style.display = 'none';

            // Parse input array
            let arrayInput;
            try {
                arrayInput = arrayInputStr.split(',').map(item => {
                    const trimmed = item.trim();
                    const asNumber = parseFloat(trimmed);
                    if (isNaN(asNumber)) {
                        throw new Error('All elements must be numbers');
                    }
                    return asNumber;
                });
            } catch (e) {
                showError('Invalid array format. Please use comma-separated numbers.');
                return;
            }

            // Validate input
            if (arrayInput.length === 0) {
                showError('Array cannot be empty');
                return;
            }
            
            if (arrayInput.length > 15) {
                showError('Array size limited to 15 elements for demo purposes');
                return;
            }
            
            // Auto-normalize the array if it's not in 0.0-1.0 range
            const min = Math.min(...arrayInput);
            const max = Math.max(...arrayInput);
            const range = max - min;
            
            let normalizedArray = [...arrayInput];
            let isNormalized = false;
            
            // Check if normalization is needed
            if (min < 0 || max > 1 || range > 1) {
                if (range === 0) {
                    // All elements are the same
                    normalizedArray = arrayInput.map(() => 0.5);
                } else {
                    // Normalize to [0,1] range
                    normalizedArray = arrayInput.map(x => (x - min) / range);
                    isNormalized = true;
                }
            }
            
            // Update arrayInput to the normalized version for processing
            const originalArray = [...arrayInput];
            arrayInput = normalizedArray;
            
            // Parse bucket count
            const bucketCount = parseInt(bucketCountStr);
            if (isNaN(bucketCount) || bucketCount < 2 || bucketCount > 10) {
                showError('Bucket count must be between 2 and 10');
                return;
            }

            try {
                const startTime = performance.now();
                
                // Execute bucket sort using steps function for animation
                let result;
                if (window.BucketSortSteps) {
                    result = window.BucketSortSteps.bucketSortWithSteps(arrayInput, bucketCount);
                } else if (window.bucketSortWithSteps) {
                    result = window.bucketSortWithSteps(arrayInput, bucketCount);
                } else if (window.BucketSortCore) {
                    const coreResult = window.BucketSortCore.bucketSort(arrayInput);
                    result = { ...coreResult, steps: [] };
                } else {
                    result = { sortedArray: [...arrayInput].sort((a, b) => a - b), metrics: { comparisons: 0, swaps: 0, bucketOperations: 0 }, steps: [] };
                }
                
                const endTime = performance.now();
                const executionTime = (endTime - startTime).toFixed(4);
                
                // Show result
                let resultHTML = 
                    '<strong>Original Array:</strong> [' + originalArray.join(', ') + ']<br>';
                
                if (isNormalized) {
                    resultHTML += 
                        '<strong>Normalized for Processing:</strong> [' + arrayInput.map(x => x.toFixed(3)).join(', ') + ']<br>' +
                        '<em>Note: Array was normalized to [0,1] range for optimal bucket sort performance</em><br>';
                }
                
                // Map normalized result back to original scale for display
                let displaySortedArray;
                if (isNormalized && range > 0) {
                    displaySortedArray = result.sortedArray.map(x => (x * range + min));
                } else {
                    displaySortedArray = result.sortedArray;
                }
                
                resultHTML += 
                    '<strong>Sorted Array:</strong> [' + displaySortedArray.map(x => typeof x === 'number' ? x.toFixed(3) : x).join(', ') + ']<br>' +
                    '<strong>Buckets Used:</strong> ' + bucketCount + '<br>' +
                    '<strong>Bucket Operations:</strong> ' + (result.metrics.bucketOperations || 0) + '<br>' +
                    '<strong>Total Comparisons:</strong> ' + (result.metrics.comparisons || 0) + '<br>' +
                    '<strong>Total Insertions:</strong> ' + (result.metrics.insertions || 0) + '<br>' +
                    '<strong>Execution Time:</strong> ' + executionTime + ' ms';
                
                resultContainer.innerHTML = resultHTML;
                
                // Show the visualization section with bucket sort animation
                if (result.steps && result.steps.length > 0) {
                    showBucketSortVisualization(originalArray, result.steps, bucketCount, isNormalized, min, range);
                    visualizationSection.style.display = 'block';
                }
                
            } catch (error) {
                showError(error.message);
            }
        }
        
        function showBucketSortVisualization(originalArray, steps, bucketCount, isNormalized = false, minVal = 0, rangeVal = 1) {
            const arrayViz = document.getElementById('array-visualization');
            const stepsContainer = document.getElementById('steps-container');
            
            // Define bucket colors - shared between legend and animation
            const bucketColors = [
                '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', 
                '#f0932b', '#eb4d4b', '#6c5ce7', '#74b9ff',
                '#00b894', '#fdcb6e'
            ];
            
            // Clear previous visualization
            arrayViz.innerHTML = '';
            stepsContainer.innerHTML = '';
            
            // Create array visualization
            const arrayDiv = document.createElement('div');
            arrayDiv.className = 'array-visualization';
            arrayDiv.id = 'bucket-array-display';
            
            originalArray.forEach((value, index) => {
                const cell = document.createElement('div');
                cell.textContent = value;
                cell.className = 'viz-cell';
                cell.setAttribute('data-index', index);
                cell.setAttribute('data-value', value);
                arrayDiv.appendChild(cell);
            });
            
            arrayViz.appendChild(arrayDiv);
            
            // Create bucket info display (color legend only)
            const bucketInfoDiv = document.createElement('div');
            bucketInfoDiv.className = 'bucket-info';
            bucketInfoDiv.id = 'bucket-info';
            
            let bucketColorsHTML = '';
            for (let i = 0; i < bucketCount; i++) {
                const color = bucketColors[i % bucketColors.length];
                bucketColorsHTML += '<span class="bucket-color bucket-' + i + '" style="background-color: ' + color + ' !important; color: white; padding: 6px 10px; margin: 3px 5px; border-radius: 6px; display: inline-block; font-weight: bold; text-shadow: 0 1px 2px rgba(0,0,0,0.7); border: 2px solid rgba(255,255,255,0.3); box-shadow: 0 2px 4px rgba(0,0,0,0.2);">B' + i + '</span> ';
            }
            bucketInfoDiv.innerHTML = '<div class="bucket-legend"><strong>Bucket Color Guide:</strong><br>' + bucketColorsHTML + '</div>';
            arrayViz.appendChild(bucketInfoDiv);
            
            // Add controls with legend
            const controlsDiv = document.createElement('div');
            controlsDiv.className = 'viz-controls';
            controlsDiv.innerHTML = 
                '<h4>Bucket Sort Visualization (' + bucketCount + ' buckets)</h4>' +
                '<button id="start-bucket-animation" class="viz-button start">Start Animation</button>' +
                '<button id="pause-bucket-animation" class="viz-button pause" disabled>Pause</button>' +
                '<button id="reset-bucket-animation" class="viz-button reset">Reset</button>' +
                '<div class="viz-legend" id="bucketsort-legend">' +
                    '<span class="viz-legend-desktop">Color by Bucket | Sort Each Color Group | Collect Results | Complete</span>' +
                    '<div class="viz-legend-mobile" style="display: none;">' +
                        '<div class="viz-legend-item">Elements get colored by bucket</div>' +
                        '<div class="viz-legend-item">Sort each color group individually</div>' +
                        '<div class="viz-legend-item">Collect sorted groups in order</div>' +
                        '<div class="viz-legend-item">Final sorted array</div>' +
                    '</div>' +
                '</div>';
            arrayViz.appendChild(controlsDiv);
            
            // Status display
            const statusDiv = document.createElement('div');
            statusDiv.id = 'bucket-status';
            statusDiv.className = 'viz-status';
            statusDiv.textContent = 'Ready to start bucket sort animation...';
            arrayViz.appendChild(statusDiv);
            
            // Animation variables
            let currentStepIndex = 0;
            let animationRunning = false;
            let animationInterval;
            
            function updateBucketVisualization(step) {
                const cells = arrayDiv.querySelectorAll('.viz-cell');
                const statusDiv = document.getElementById('bucket-status');
                
                // Reset all cell classes
                cells.forEach(cell => {
                    cell.className = 'viz-cell';
                });
                
                // Update array values if changed
                if (step.array) {
                    step.array.forEach((value, index) => {
                        if (cells[index] && value !== null && value !== undefined) {
                            cells[index].textContent = value;
                        }
                    });
                }
                
                // Apply bucket color coding based on step type and phase
                if (step.type === 'distribute' && step.targetBucket !== undefined) {
                    // Show current element being distributed with preview of target bucket color
                    if (step.currentElementIndex !== undefined && cells[step.currentElementIndex]) {
                        cells[step.currentElementIndex].classList.add('distributing');
                        const targetColor = bucketColors[step.targetBucket % bucketColors.length];
                        cells[step.currentElementIndex].style.backgroundColor = targetColor + '60'; // 38% opacity preview
                        cells[step.currentElementIndex].style.borderColor = targetColor;
                        cells[step.currentElementIndex].style.color = '#ffffff';
                        cells[step.currentElementIndex].style.fontWeight = 'bold';
                        cells[step.currentElementIndex].setAttribute('data-bucket', step.targetBucket);
                    }
                } else if (step.phase === 'distribution-complete' || step.phase === 'bucket-sorting' || step.phase === 'collection') {
                    // Color all elements by their bucket assignment
                    if (step.buckets) {
                        step.buckets.forEach((bucket, bucketIndex) => {
                            bucket.forEach(value => {
                                // Find the cell with this value and color it
                                const matchingCells = Array.from(cells).filter(cell => 
                                    parseFloat(cell.textContent) === value || cell.textContent === value.toString()
                                );
                                matchingCells.forEach(cell => {
                                    cell.style.backgroundColor = bucketColors[bucketIndex % bucketColors.length] + '80'; // 50% opacity for better visibility
                                    cell.style.borderColor = bucketColors[bucketIndex % bucketColors.length];
                                    cell.style.color = '#ffffff'; // White text for better contrast
                                    cell.style.fontWeight = 'bold';
                                    cell.setAttribute('data-bucket', bucketIndex);
                                });
                            });
                        });
                    }
                }
                
                // Highlight current bucket being sorted
                if (step.currentBucket !== undefined && step.phase === 'bucket-sorting') {
                    cells.forEach(cell => {
                        if (cell.getAttribute('data-bucket') === step.currentBucket.toString()) {
                            cell.classList.add('bucket-sorting');
                        }
                    });
                }
                
                // Show collection phase
                if (step.type === 'collect') {
                    cells.forEach((cell, index) => {
                        if (index <= step.collectedTo) {
                            cell.classList.add('collected');
                        }
                    });
                }
                
                // Final completion state
                if (step.type === 'complete') {
                    cells.forEach(cell => {
                        cell.classList.add('complete');
                        // Reset to default text styling
                        cell.style.color = '';
                        cell.style.fontWeight = '';
                    });
                }
                
                // Update status
                statusDiv.textContent = step.message;
                
                // Show step info in container
                const stepInfo = document.createElement('div');
                stepInfo.className = step.type === 'complete' ? 'viz-step-info complete' : 'viz-step-info';
                
                let stepTypeColor = '#007acc';
                if (step.type === 'complete') stepTypeColor = '#28a745';
                else if (step.type === 'distribute') stepTypeColor = '#2196f3';
                else if (step.phase === 'bucket-sorting') stepTypeColor = '#ff9800';
                else if (step.type === 'collect') stepTypeColor = '#4caf50';
                
                stepInfo.style.borderLeftColor = stepTypeColor;
                
                let phaseEmoji = '*';
                if (step.type === 'distribute') phaseEmoji = '+';
                else if (step.phase === 'bucket-sorting') phaseEmoji = '~';
                else if (step.type === 'collect') phaseEmoji = '-';
                else if (step.type === 'complete') phaseEmoji = '!';
                else if (step.type === 'initialize') phaseEmoji = '?';
                
                stepInfo.innerHTML = 
                    '<strong>' + phaseEmoji + ' Step ' + (currentStepIndex + 1) + ':</strong> ' + step.message + '<br>' +
                    '<small>' +
                        'Phase: ' + (step.phase || 'processing') + ' | ' +
                        'Comparisons: ' + (step.metrics.comparisons || 0) + ' | ' +
                        'Operations: ' + (step.metrics.bucketOperations || 0) +
                    '</small>';
                
                if (stepsContainer.children.length > 8) {
                    stepsContainer.removeChild(stepsContainer.firstChild);
                }
                stepsContainer.appendChild(stepInfo);
            }
            
            function startBucketAnimation() {
                if (animationRunning || currentStepIndex >= steps.length) return;
                
                animationRunning = true;
                document.getElementById('start-bucket-animation').disabled = true;
                document.getElementById('pause-bucket-animation').disabled = false;
                
                animationInterval = setInterval(() => {
                    if (currentStepIndex >= steps.length) {
                        clearInterval(animationInterval);
                        animationRunning = false;
                        document.getElementById('start-bucket-animation').disabled = false;
                        document.getElementById('pause-bucket-animation').disabled = true;
                        return;
                    }
                    
                    updateBucketVisualization(steps[currentStepIndex]);
                    currentStepIndex++;
                }, 1500); // 1.5 second delay between steps
            }
            
            function pauseBucketAnimation() {
                clearInterval(animationInterval);
                animationRunning = false;
                document.getElementById('start-bucket-animation').disabled = false;
                document.getElementById('pause-bucket-animation').disabled = true;
            }
            
            function resetBucketAnimation() {
                clearInterval(animationInterval);
                animationRunning = false;
                currentStepIndex = 0;
                document.getElementById('start-bucket-animation').disabled = false;
                document.getElementById('pause-bucket-animation').disabled = true;
                stepsContainer.innerHTML = '';
                
                // Reset all cells to default state
                const cells = arrayDiv.querySelectorAll('.viz-cell');
                cells.forEach(cell => {
                    cell.className = 'viz-cell';
                    cell.style.backgroundColor = '';
                    cell.style.borderColor = '';
                    cell.style.color = '';
                    cell.style.fontWeight = '';
                    cell.removeAttribute('data-bucket');
                });
                
                // Reset visualization to initial state
                if (steps.length > 0) {
                    updateBucketVisualization(steps[0]);
                }
                document.getElementById('bucket-status').textContent = 'Ready to start bucket sort animation...';
            }
            
            // Bind control events
            document.getElementById('start-bucket-animation').addEventListener('click', startBucketAnimation);
            document.getElementById('pause-bucket-animation').addEventListener('click', pauseBucketAnimation);
            document.getElementById('reset-bucket-animation').addEventListener('click', resetBucketAnimation);
            
            // Show initial state
            if (steps.length > 0) {
                updateBucketVisualization(steps[0]);
            }
        }
    `
};

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        BUCKET_SORT_CONFIG: BucketSortConfig,
        BucketSortConfig
    };
} else if (typeof window !== 'undefined') {
    // Primary exports
    window.BUCKET_SORT_CONFIG = BucketSortConfig;
    window.BucketSortConfig = BucketSortConfig;
    
    // Universal loader compatibility - these are the names the loader looks for
    window.bucketsortConfig = BucketSortConfig;     // algorithmName.replace(/-/g, '') + 'Config'
    window.bucketsortconfig = BucketSortConfig;     // algorithmName.replace(/-/g, '').toLowerCase() + 'Config'  
    window.bucketSortConfig = BucketSortConfig;     // toCamelCase(algorithmName) + 'Config'
}
