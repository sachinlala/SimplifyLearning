/**
 * Configuration for Counting Sort Interactive Demo
 * 
 * This configuration defines the demo properties and test cases for
 * Counting Sort algorithm visualization and interaction.
 */

const CountingSortConfig = {
    // Top-level properties for dynamic template compatibility
    name: 'Counting Sort',
    category: 'sort',
    hasStepsFile: true,
    hasVisualization: true,
    problem: 'Sort an array of non-negative integers efficiently using counting instead of comparisons. Ideal for integers within a small, known range.',
    
    // Inputs for the demo interface
    inputs: [
        {
            id: 'array-input',
            type: 'text',
            label: 'Array Elements (non-negative integers)',
            defaultValue: '4, 2, 2, 8, 3, 3, 1',
            width: '280px'
        }
    ],
    
    explanation: {
        description: 'Counting Sort is a non-comparison based sorting algorithm that works by counting occurrences of each element. It operates in O(n + k) time where n is the number of elements and k is the range of values. The algorithm uses a counting array to track frequencies and then reconstructs the sorted array by placing elements in their correct positions.'
    },
    
    // Multi-language source code paths
    sourceCode: {
        javascript: "https://github.com/sachinlala/SimplifyLearning/blob/master/algorithms-js/src/sort/counting-sort/counting-sort-core.js",
        java: "https://github.com/sachinlala/SimplifyLearning/blob/master/algorithms-java/src/main/java/com/sl/algorithms/sort/finitegroups/integersorting/CountingSort.java",
        python: "", // Coming soon
        go: "" // Coming soon
    },
    
    // Demo identification and display
    id: 'counting-sort',
    description: 'A stable, linear-time sorting algorithm that works by counting occurrences of each element. Efficient for sorting integers within a known, small range.',
    
    // Algorithm properties
    timeComplexity: {
        best: 'O(n + k)',
        average: 'O(n + k)',
        worst: 'O(n + k)',
        space: 'O(k)',
        description: 'where n is the number of elements and k is the range of input values (0 to k-1)'
    },
    
    // Algorithm characteristics
    properties: {
        stable: true,
        inPlace: false,
        adaptive: false,
        online: false,
        comparison: false,
        distribution: true,
        integerOnly: true,
        notes: [
            'Works only with non-negative integers',
            'Efficient when the range k is not significantly larger than n',
            'Uses counting array to track element frequencies',
            'Maintains stability by processing elements right-to-left'
        ]
    },
    
    // Input constraints and validation
    input: {
        type: 'array',
        elementType: 'integer',
        constraints: {
            minSize: 1,
            maxSize: 20,
            minValue: 0,
            maxValue: 50,
            allowDuplicates: true,
            allowNegative: false
        },
        validation: {
            required: true,
            customValidator: function(arr) {
                // Check if all elements are non-negative integers
                for (let i = 0; i < arr.length; i++) {
                    if (!Number.isInteger(arr[i]) || arr[i] < 0) {
                        return {
                            valid: false,
                            message: `Counting sort requires non-negative integers. Found: ${arr[i]} at index ${i}`
                        };
                    }
                }
                
                // Check range efficiency
                const max = Math.max(...arr);
                if (max > arr.length * 3) {
                    return {
                        valid: true,
                        warning: `Large range detected (max=${max}, n=${arr.length}). Counting sort may be inefficient.`
                    };
                }
                
                return { valid: true };
            }
        }
    },
    
    // Visualization settings
    visualization: {
        showComparisons: false, // Counting sort doesn't use comparisons
        showSwaps: false,       // No swaps in counting sort
        showCounting: true,     // Show counting array
        showOutput: true,       // Show output array construction
        animationSpeed: {
            slow: 2000,
            medium: 1000,
            fast: 500
        },
        colors: {
            default: '#e3f2fd',     // Light blue for default elements
            highlight: '#2196f3',    // Blue for current element
            counting: '#4caf50',     // Green for counting array
            placed: '#ff9800',       // Orange for placed elements
            complete: '#8bc34a'      // Light green for completed
        },
        phases: {
            'find-max': {
                name: 'Find Maximum',
                description: 'Finding the maximum value to determine counting array size',
                color: '#f44336'
            },
            'count': {
                name: 'Count Elements',
                description: 'Counting occurrences of each element value',
                color: '#4caf50'
            },
            'cumulative': {
                name: 'Cumulative Sum',
                description: 'Converting counts to starting positions',
                color: '#ff9800'
            },
            'place': {
                name: 'Place Elements',
                description: 'Placing elements in their sorted positions',
                color: '#2196f3'
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
            name: 'Simple Example',
            input: [4, 2, 2, 8, 3, 3, 1],
            description: 'Basic counting sort with duplicates',
            expected: [1, 2, 2, 3, 3, 4, 8],
            difficulty: 'easy'
        },
        {
            name: 'Single Element',
            input: [5],
            description: 'Edge case with single element',
            expected: [5],
            difficulty: 'easy'
        },
        {
            name: 'Already Sorted',
            input: [1, 2, 3, 4, 5],
            description: 'Already sorted array',
            expected: [1, 2, 3, 4, 5],
            difficulty: 'easy'
        },
        {
            name: 'Reverse Sorted',
            input: [5, 4, 3, 2, 1],
            description: 'Reverse sorted array',
            expected: [1, 2, 3, 4, 5],
            difficulty: 'easy'
        },
        {
            name: 'With Zeros',
            input: [0, 3, 0, 1, 2, 0],
            description: 'Array containing zeros',
            expected: [0, 0, 0, 1, 2, 3],
            difficulty: 'medium'
        },
        {
            name: 'Many Duplicates',
            input: [3, 3, 3, 1, 1, 2, 2, 2],
            description: 'Array with many duplicate values',
            expected: [1, 1, 2, 2, 2, 3, 3, 3],
            difficulty: 'medium'
        },
        {
            name: 'Large Range',
            input: [10, 1, 15, 3, 20, 8],
            description: 'Array with larger value range',
            expected: [1, 3, 8, 10, 15, 20],
            difficulty: 'medium'
        },
        {
            name: 'Maximum Size',
            input: [7, 3, 15, 8, 2, 11, 1, 9, 4, 12, 6, 14, 5, 10, 13, 16, 18, 17, 19, 20],
            description: 'Maximum allowed array size for demo',
            expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            difficulty: 'hard'
        }
    ],
    
    // Performance comparison data
    performance: {
        description: 'Counting Sort vs Other O(n log n) Algorithms',
        scenarios: [
            {
                size: 10,
                countingSort: { time: 'O(n + k)', comparisons: 0 },
                quickSort: { time: 'O(n log n)', comparisons: '~23' },
                mergeSort: { time: 'O(n log n)', comparisons: '~24' }
            },
            {
                size: 100,
                countingSort: { time: 'O(n + k)', comparisons: 0 },
                quickSort: { time: 'O(n log n)', comparisons: '~664' },
                mergeSort: { time: 'O(n log n)', comparisons: '~644' }
            },
            {
                size: 1000,
                countingSort: { time: 'O(n + k)', comparisons: 0 },
                quickSort: { time: 'O(n log n)', comparisons: '~9966' },
                mergeSort: { time: 'O(n log n)', comparisons: '~9976' }
            }
        ],
        notes: [
            'Counting sort has no comparisons - it uses counting instead',
            'Time complexity depends on both n (elements) and k (range)',
            'Most efficient when k ≤ n or k is small',
            'Space complexity is O(k) for the counting array'
        ]
    },
    
    // Educational content
    concepts: {
        keyIdeas: [
            'Non-comparison based sorting algorithm',
            'Linear time complexity O(n + k)',
            'Stable sorting algorithm',
            'Efficient for small integer ranges',
            'Uses auxiliary counting array'
        ],
        whenToUse: [
            'Sorting integers within known, small range',
            'When stability is required',
            'When linear time is needed',
            'Input elements are non-negative integers'
        ],
        limitations: [
            'Only works with integers (typically non-negative)',
            'Requires knowledge of value range',
            'Space complexity depends on range, not input size',
            'Inefficient when range >> input size'
        ]
    },
    
    // Code implementation details
    implementation: {
        coreFunction: 'countingSortWithSteps',
        inputPreprocessor: function(input) {
            // Ensure input is an array of integers
            if (typeof input === 'string') {
                input = input.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
            }
            return input.map(x => Math.max(0, Math.floor(Number(x))));
        },
        resultProcessor: function(result) {
            return {
                sortedArray: result.sortedArray,
                steps: result.steps,
                metrics: result.metrics,
                summary: {
                    algorithm: 'Counting Sort',
                    elements: result.metrics?.elements,
                    range: result.metrics?.range,
                    counts: result.metrics?.counts,
                    timeComplexity: (result.metrics && result.metrics.elements !== undefined && result.metrics.range !== undefined)
                        ? `O(${result.metrics.elements} + ${result.metrics.range})`
                        : 'O(n + k)'
                }
            };
        }
    },
    
    // Help and documentation
    help: {
        algorithm: 'Counting Sort works by counting the number of occurrences of each distinct element, then using this information to place elements directly into their correct position.',
        steps: [
            '1. Find the maximum value to determine counting array size',
            '2. Create counting array and count occurrences of each element',
            '3. Convert counts to cumulative sums (starting positions)',
            '4. Place each element at its correct position (right-to-left for stability)',
            '5. Result is a sorted array'
        ],
        tips: [
            'Works best when the range of values is small compared to number of elements',
            'Always stable - maintains relative order of equal elements',
            'No comparisons needed - faster than comparison-based sorts for suitable inputs',
            'Process elements right-to-left in final step to maintain stability'
        ]
    },
    
    customDemoFunction: `
        function runDemo() {
            const arrayInputStr = document.getElementById('array-input').value;
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
                    const asNumber = parseInt(trimmed);
                    if (isNaN(asNumber) || asNumber < 0) {
                        throw new Error('All elements must be non-negative integers');
                    }
                    return asNumber;
                });
            } catch (e) {
                showError('Invalid array format. Please use comma-separated non-negative integers.');
                return;
            }

            // Validate input
            if (arrayInput.length === 0) {
                showError('Array cannot be empty');
                return;
            }
            
            if (arrayInput.length > 20) {
                showError('Array size limited to 20 elements for demo purposes');
                return;
            }

            try {
                const startTime = performance.now();
                
                // Execute counting sort using steps function for animation
                let result;
                if (window.CountingSortSteps) {
                    result = window.CountingSortSteps.countingSortWithSteps(arrayInput);
                } else if (window.countingSortWithSteps) {
                    result = window.countingSortWithSteps(arrayInput);
                } else if (window.CountingSortCore) {
                    const coreResult = window.CountingSortCore.countingSort(arrayInput);
                    result = { ...coreResult, steps: [] };
                } else {
                    result = { sortedArray: [...arrayInput].sort((a, b) => a - b), metrics: { comparisons: 0, counts: 0, range: 0 }, steps: [] };
                }
                
                const endTime = performance.now();
                const executionTime = (endTime - startTime).toFixed(4);
                
                // Show result
                let resultHTML = 
                    '<strong>Original Array:</strong> [' + arrayInput.join(', ') + ']<br>' +
                    '<strong>Sorted Array:</strong> [' + result.sortedArray.join(', ') + ']<br>' +
                    '<strong>Range (k):</strong> ' + (result.metrics.range || 'N/A') + '<br>' +
                    '<strong>Comparisons:</strong> ' + (result.metrics.comparisons || 0) + '<br>' +
                    '<strong>Count Operations:</strong> ' + (result.metrics.counts || 0) + '<br>' +
                    '<strong>Execution Time:</strong> ' + executionTime + ' ms';
                
                resultContainer.innerHTML = resultHTML;
                
                // Show the visualization section with counting sort animation
                if (result.steps && result.steps.length > 0) {
                    showCountingSortVisualization(arrayInput, result.steps);
                    visualizationSection.style.display = 'block';
                }
                
            } catch (error) {
                showError(error.message);
            }
        }
        
        function showCountingSortVisualization(originalArray, steps) {
            const arrayViz = document.getElementById('array-visualization');
            const stepsContainer = document.getElementById('steps-container');
            
            // Clear previous visualization
            arrayViz.innerHTML = '';
            stepsContainer.innerHTML = '';
            
            // Create main containers
            const originalArrayDiv = document.createElement('div');
            originalArrayDiv.className = 'counting-sort-section';
            originalArrayDiv.innerHTML = '<h4>Original Array</h4>';
            
            const arrayDisplay = document.createElement('div');
            arrayDisplay.className = 'array-visualization';
            arrayDisplay.id = 'counting-original-array';
            
            originalArray.forEach((value, index) => {
                const cell = document.createElement('div');
                cell.textContent = value;
                cell.className = 'viz-cell counting-cell';
                cell.setAttribute('data-index', index);
                cell.setAttribute('data-value', value);
                arrayDisplay.appendChild(cell);
            });
            
            originalArrayDiv.appendChild(arrayDisplay);
            arrayViz.appendChild(originalArrayDiv);
            
            // Create counting array section
            const countingSection = document.createElement('div');
            countingSection.className = 'counting-sort-section';
            countingSection.innerHTML = '<h4>Counting Array</h4>';
            countingSection.id = 'counting-array-section';
            countingSection.style.display = 'none';
            
            const countingArrayDiv = document.createElement('div');
            countingArrayDiv.className = 'counting-array-display';
            countingArrayDiv.id = 'counting-array-display';
            countingSection.appendChild(countingArrayDiv);
            
            arrayViz.appendChild(countingSection);
            
            // Create output array section
            const outputSection = document.createElement('div');
            outputSection.className = 'counting-sort-section';
            outputSection.innerHTML = '<h4>Output Array (Building Result)</h4>';
            outputSection.id = 'output-array-section';
            outputSection.style.display = 'none';
            
            const outputArrayDiv = document.createElement('div');
            outputArrayDiv.className = 'array-visualization';
            outputArrayDiv.id = 'counting-output-array';
            outputSection.appendChild(outputArrayDiv);
            
            arrayViz.appendChild(outputSection);
            
            // Add controls with legend
            const controlsDiv = document.createElement('div');
            controlsDiv.className = 'viz-controls';
            controlsDiv.innerHTML = 
                '<h4>Counting Sort Visualization</h4>' +
                '<button id="start-counting-animation" class="viz-button start">Start Animation</button>' +
                '<button id="pause-counting-animation" class="viz-button pause" disabled>Pause</button>' +
                '<button id="reset-counting-animation" class="viz-button reset">Reset</button>' +
                '<div class="viz-legend" id="countingsort-legend">' +
                    '<span class="viz-legend-desktop">🔍 Find Max | 📊 Count Values | 🔢 Cumulative Sum | 📍 Place Elements | ✅ Complete</span>' +
                    '<div class="viz-legend-mobile" style="display: none;">' +
                        '<div class="viz-legend-item">🔍 Find the maximum value</div>' +
                        '<div class="viz-legend-item">📊 Count occurrences of each value</div>' +
                        '<div class="viz-legend-item">🔢 Convert counts to starting positions</div>' +
                        '<div class="viz-legend-item">📍 Place elements in sorted positions</div>' +
                        '<div class="viz-legend-item">✅ Sorting completed</div>' +
                    '</div>' +
                '</div>';
            arrayViz.appendChild(controlsDiv);
            
            // Status display
            const statusDiv = document.createElement('div');
            statusDiv.id = 'counting-status';
            statusDiv.className = 'viz-status';
            statusDiv.textContent = 'Ready to start counting sort animation...';
            arrayViz.appendChild(statusDiv);
            
            // Animation variables
            let currentStepIndex = 0;
            let animationRunning = false;
            let animationInterval;
            
            function updateCountingVisualization(step) {
                const originalCells = arrayDisplay.querySelectorAll('.viz-cell');
                const statusDiv = document.getElementById('counting-status');
                const countingSection = document.getElementById('counting-array-section');
                const outputSection = document.getElementById('output-array-section');
                const countingDisplay = document.getElementById('counting-array-display');
                const outputDisplay = document.getElementById('counting-output-array');
                
                // Reset all original array cell classes
                originalCells.forEach(cell => {
                    cell.className = 'viz-cell counting-cell';
                });
                
                // Handle different phases
                if (step.phase === 'find-max') {
                    step.highlightIndices.forEach(index => {
                        if (originalCells[index]) {
                            originalCells[index].classList.add('finding-max');
                        }
                    });
                } else if (step.phase === 'count') {
                    countingSection.style.display = 'block';
                    
                    // Create/update counting array display
                    if (step.countArray) {
                        countingDisplay.innerHTML = '';
                        step.countArray.forEach((count, value) => {
                            const countCell = document.createElement('div');
                            countCell.className = 'counting-cell-container';
                            
                            const valueLabel = document.createElement('div');
                            valueLabel.className = 'counting-value-label';
                            valueLabel.textContent = value;
                            
                            const countValue = document.createElement('div');
                            countValue.className = 'counting-count-value';
                            countValue.textContent = count;
                            countValue.setAttribute('data-count', count);
                            
                            if (step.countingValue === value) {
                                countValue.classList.add('counting-active');
                            }
                            
                            countCell.appendChild(valueLabel);
                            countCell.appendChild(countValue);
                            countingDisplay.appendChild(countCell);
                        });
                    }
                    
                    step.highlightIndices.forEach(index => {
                        if (originalCells[index]) {
                            originalCells[index].classList.add('being-counted');
                        }
                    });
                } else if (step.phase === 'cumulative') {
                    // Update counting array to show cumulative sums
                    if (step.countArray) {
                        const countCells = countingDisplay.querySelectorAll('.counting-count-value');
                        step.countArray.forEach((count, value) => {
                            if (countCells[value]) {
                                countCells[value].textContent = count;
                                countCells[value].setAttribute('data-count', count);
                                
                                if (step.cumulativeIndex === value) {
                                    countCells[value].classList.add('cumulative-active');
                                }
                            }
                        });
                    }
                } else if (step.phase === 'place') {
                    outputSection.style.display = 'block';
                    
                    // Create/update output array display
                    if (step.output) {
                        outputDisplay.innerHTML = '';
                        step.output.forEach((value, index) => {
                            const cell = document.createElement('div');
                            cell.className = 'viz-cell output-cell';
                            if (value !== undefined) {
                                cell.textContent = value;
                                cell.classList.add('placed');
                                
                                if (step.placingPosition === index) {
                                    cell.classList.add('just-placed');
                                }
                            }
                            outputDisplay.appendChild(cell);
                        });
                    }
                    
                    step.highlightIndices.forEach(index => {
                        if (originalCells[index]) {
                            originalCells[index].classList.add('being-placed');
                        }
                    });
                } else if (step.phase === 'complete') {
                    originalCells.forEach(cell => {
                        cell.classList.add('complete');
                    });
                    
                    const outputCells = outputDisplay.querySelectorAll('.viz-cell');
                    outputCells.forEach(cell => {
                        cell.classList.add('complete');
                    });
                }
                
                // Update status
                statusDiv.textContent = step.message;
                
                // Show step info in container
                const stepInfo = document.createElement('div');
                stepInfo.className = step.type === 'complete' ? 'viz-step-info complete' : 'viz-step-info';
                
                let stepTypeColor = '#007acc';
                if (step.phase === 'find-max') stepTypeColor = '#f44336';
                else if (step.phase === 'count') stepTypeColor = '#4caf50';
                else if (step.phase === 'cumulative') stepTypeColor = '#ff9800';
                else if (step.phase === 'place') stepTypeColor = '#2196f3';
                else if (step.phase === 'complete') stepTypeColor = '#8bc34a';
                
                stepInfo.style.borderLeftColor = stepTypeColor;
                
                let phaseEmoji = '🔄';
                if (step.phase === 'find-max') phaseEmoji = '🔍';
                else if (step.phase === 'count') phaseEmoji = '📊';
                else if (step.phase === 'cumulative') phaseEmoji = '🔢';
                else if (step.phase === 'place') phaseEmoji = '📍';
                else if (step.phase === 'complete') phaseEmoji = '✅';
                
                stepInfo.innerHTML = 
                    '<strong>' + phaseEmoji + ' Step ' + (currentStepIndex + 1) + ':</strong> ' + step.message + '<br>' +
                    '<small>' +
                        'Phase: ' + (step.phase || 'processing') + ' | ' +
                        'Comparisons: ' + (step.comparisons || 0) + ' | ' +
                        'Count Ops: ' + (step.counts || 0) +
                    '</small>';
                
                if (stepsContainer.children.length > 8) {
                    stepsContainer.removeChild(stepsContainer.firstChild);
                }
                stepsContainer.appendChild(stepInfo);
            }
            
            function startCountingAnimation() {
                if (animationRunning || currentStepIndex >= steps.length) return;
                
                animationRunning = true;
                document.getElementById('start-counting-animation').disabled = true;
                document.getElementById('pause-counting-animation').disabled = false;
                
                animationInterval = setInterval(() => {
                    if (currentStepIndex >= steps.length) {
                        clearInterval(animationInterval);
                        animationRunning = false;
                        document.getElementById('start-counting-animation').disabled = false;
                        document.getElementById('pause-counting-animation').disabled = true;
                        return;
                    }
                    
                    updateCountingVisualization(steps[currentStepIndex]);
                    currentStepIndex++;
                }, 1000); // 1 second delay between steps
            }
            
            function pauseCountingAnimation() {
                clearInterval(animationInterval);
                animationRunning = false;
                document.getElementById('start-counting-animation').disabled = false;
                document.getElementById('pause-counting-animation').disabled = true;
            }
            
            function resetCountingAnimation() {
                clearInterval(animationInterval);
                animationRunning = false;
                currentStepIndex = 0;
                document.getElementById('start-counting-animation').disabled = false;
                document.getElementById('pause-counting-animation').disabled = true;
                stepsContainer.innerHTML = '';
                
                // Reset visualization
                document.getElementById('counting-array-section').style.display = 'none';
                document.getElementById('output-array-section').style.display = 'none';
                
                if (steps.length > 0) {
                    updateCountingVisualization(steps[0]);
                }
                document.getElementById('counting-status').textContent = 'Ready to start counting sort animation...';
            }
            
            // Bind control events
            document.getElementById('start-counting-animation').addEventListener('click', startCountingAnimation);
            document.getElementById('pause-counting-animation').addEventListener('click', pauseCountingAnimation);
            document.getElementById('reset-counting-animation').addEventListener('click', resetCountingAnimation);
            
            // Show initial state
            if (steps.length > 0) {
                updateCountingVisualization(steps[0]);
            }
        }
    `
};

// Export for browser/Node.js environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CountingSortConfig;
} else if (typeof window !== 'undefined') {
    window.CountingSortConfig = CountingSortConfig;
    
    // Additional exports for universal loader compatibility
    window.COUNTING_SORT_CONFIG = CountingSortConfig;
    window.countingsortConfig = CountingSortConfig;
    window.countingsortconfig = CountingSortConfig;
    window.countingSortConfig = CountingSortConfig;  // camelCase for universal loader
}
