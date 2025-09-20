/**
 * Configuration for Radix Sort Interactive Demo
 * 
 * This configuration defines the demo properties and test cases for
 * Radix Sort algorithm visualization and interaction.
 */

const RadixSortConfig = {
    // Top-level properties for dynamic template compatibility
    name: 'Radix Sort',
    category: 'sort',
    hasStepsFile: true,
    hasVisualization: true,
    problem: 'Sort an array of non-negative integers efficiently by processing digits from least significant to most significant, using counting sort as a stable subroutine for each digit position.',
    
    // Inputs for the demo interface
    inputs: [
        {
            id: 'array-input',
            type: 'text',
            label: 'Array Elements (non-negative integers)',
            defaultValue: '170, 45, 75, 90, 2, 802, 24, 66',
            width: '280px'
        }
    ],
    
    explanation: {
        description: 'Radix Sort is a non-comparison based sorting algorithm that works by processing individual digits of numbers. It operates in O((n + k) × d) time where n is the number of elements, k is the radix (base, typically 10), and d is the number of digits. The algorithm uses counting sort as a stable subroutine to sort elements by each digit position, starting from the least significant digit.'
    },
    
    // Multi-language source code paths
    sourceCode: {
        javascript: "https://github.com/sachinlala/SimplifyLearning/blob/master/algorithms-js/src/sort/radix-sort/radix-sort-core.js",
        java: "https://github.com/sachinlala/SimplifyLearning/blob/master/algorithms-java/src/main/java/com/sl/algorithms/sort/finitegroups/integersorting/RadixSort.java",
        python: "", // Coming soon
        go: "" // Coming soon
    },
    
    // Demo identification and display
    id: 'radix-sort',
    description: 'A stable, non-comparison based sorting algorithm that processes individual digits. Uses counting sort as a subroutine to sort digits from least significant to most significant.',
    
    // Algorithm properties
    timeComplexity: {
        best: 'O((n + k) × d)',
        average: 'O((n + k) × d)',
        worst: 'O((n + k) × d)',
        space: 'O(n + k)',
        description: 'where n = elements, k = radix (base, typically 10), d = number of digits'
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
            'Processes digits from least significant (LSD) to most significant (MSD)',
            'Uses counting sort as subroutine for each digit position',
            'Efficient when number of digits is small relative to number of elements',
            'Maintains stability through consistent processing order'
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
            maxValue: 9999,
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
                            message: `Radix sort requires non-negative integers. Found: ${arr[i]} at index ${i}`
                        };
                    }
                }
                
                // Check maximum value for efficiency
                const max = Math.max(...arr);
                const digits = max === 0 ? 1 : Math.floor(Math.log10(max)) + 1;
                if (digits > 4) {
                    return {
                        valid: true,
                        warning: `Large numbers detected (max=${max}, ${digits} digits). Consider smaller values for better visualization.`
                    };
                }
                
                return { valid: true };
            }
        }
    },
    
    // Visualization settings
    visualization: {
        showComparisons: false, // Radix sort doesn't use comparisons
        showSwaps: false,       // No direct swaps in radix sort
        showCounting: true,     // Show counting array for each digit
        showDigits: true,       // Show digit extraction process
        showPasses: true,       // Show multiple counting sort passes
        animationSpeed: {
            slow: 2500,
            medium: 1500,
            fast: 800
        },
        colors: {
            default: '#e3f2fd',     // Light blue for default elements
            highlight: '#2196f3',    // Blue for current element
            counting: '#4caf50',     // Green for counting array
            digit: '#ff9800',        // Orange for extracted digit
            placed: '#9c27b0',       // Purple for placed elements
            complete: '#8bc34a'      // Light green for completed
        },
        phases: {
            'find-max': {
                name: 'Find Maximum',
                description: 'Finding the maximum value to determine number of digits',
                color: '#f44336'
            },
            'digit-processing': {
                name: 'Process Digits',
                description: 'Sorting by each digit position using counting sort',
                color: '#2196f3'
            },
            'complete': {
                name: 'Complete',
                description: 'All digits processed, array is now sorted',
                color: '#8bc34a'
            }
        }
    },
    
    // Test cases for the demo
    testCases: [
        {
            name: 'Simple Example',
            input: [170, 45, 75, 90, 2, 802, 24, 66],
            description: 'Basic radix sort with mixed digit lengths',
            expected: [2, 24, 45, 66, 75, 90, 170, 802],
            difficulty: 'easy'
        },
        {
            name: 'Single Digit Numbers',
            input: [4, 2, 7, 1, 9, 5, 3, 6],
            description: 'All single-digit numbers (1 pass required)',
            expected: [1, 2, 3, 4, 5, 6, 7, 9],
            difficulty: 'easy'
        },
        {
            name: 'Single Element',
            input: [42],
            description: 'Edge case with single element',
            expected: [42],
            difficulty: 'easy'
        },
        {
            name: 'Already Sorted',
            input: [11, 22, 33, 44, 55],
            description: 'Already sorted two-digit numbers',
            expected: [11, 22, 33, 44, 55],
            difficulty: 'easy'
        },
        {
            name: 'Reverse Sorted',
            input: [987, 654, 321, 123],
            description: 'Reverse sorted three-digit numbers',
            expected: [123, 321, 654, 987],
            difficulty: 'medium'
        },
        {
            name: 'With Zeros',
            input: [305, 50, 5, 205, 105],
            description: 'Numbers with zeros in different positions',
            expected: [5, 50, 105, 205, 305],
            difficulty: 'medium'
        },
        {
            name: 'Same Digits Different Order',
            input: [123, 321, 231, 132, 312, 213],
            description: 'Same digits in different arrangements (tests stability)',
            expected: [123, 132, 213, 231, 312, 321],
            difficulty: 'medium'
        },
        {
            name: 'Four Digit Numbers',
            input: [3251, 987, 4562, 1234, 9876, 100, 5555],
            description: 'Mix of different digit lengths up to 4 digits',
            expected: [100, 987, 1234, 3251, 4562, 5555, 9876],
            difficulty: 'hard'
        },
        {
            name: 'Large Dataset',
            input: [4321, 1234, 9876, 5432, 6789, 2468, 1357, 9753, 8642, 7531, 3698, 2580],
            description: 'Larger dataset with 4-digit numbers',
            expected: [1234, 1357, 2468, 2580, 3698, 4321, 5432, 6789, 7531, 8642, 9753, 9876],
            difficulty: 'hard'
        }
    ],
    
    // Performance comparison data
    performance: {
        description: 'Radix Sort vs Other Sorting Algorithms',
        scenarios: [
            {
                size: 10,
                radixSort: { time: 'O((n + k) × d)', passes: 'varies by digits', comparisons: 0 },
                quickSort: { time: 'O(n log n)', passes: 1, comparisons: '~23' },
                countingSort: { time: 'O(n + k)', passes: 1, comparisons: 0 }
            },
            {
                size: 100,
                radixSort: { time: 'O((n + k) × d)', passes: 'varies by digits', comparisons: 0 },
                quickSort: { time: 'O(n log n)', passes: 1, comparisons: '~664' },
                countingSort: { time: 'O(n + k)', passes: 1, comparisons: 0 }
            },
            {
                size: 1000,
                radixSort: { time: 'O((n + k) × d)', passes: 'varies by digits', comparisons: 0 },
                quickSort: { time: 'O(n log n)', passes: 1, comparisons: '~9966' },
                countingSort: { time: 'O(n + k)', passes: 1, comparisons: 0 }
            }
        ],
        notes: [
            'Radix sort has no comparisons - it uses digit-based distribution',
            'Time complexity depends on n (elements), k (radix=10), and d (digits)',
            'More efficient than comparison sorts for integers with few digits',
            'Each pass is a complete counting sort on one digit position'
        ]
    },
    
    // Educational content
    concepts: {
        keyIdeas: [
            'Non-comparison based sorting algorithm',
            'Processes digits from least significant to most significant',
            'Uses counting sort as a stable subroutine',
            'Linear time relative to number of digits',
            'Maintains stability through consistent processing'
        ],
        whenToUse: [
            'Sorting integers with known, reasonable digit count',
            'When stability is required',
            'When linear time relative to digits is beneficial',
            'Input elements are non-negative integers',
            'Alternative to comparison-based sorts for integer data'
        ],
        limitations: [
            'Only works with integers (typically non-negative)',
            'Performance depends on number of digits',
            'Space complexity proportional to radix (10 for decimal)',
            'Not suitable for arbitrary precision numbers',
            'Requires multiple passes through the data'
        ]
    },
    
    // Code implementation details
    implementation: {
        coreFunction: 'radixSortWithSteps',
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
                    algorithm: 'Radix Sort',
                    elements: result.metrics.maxValue > 0 ? result.sortedArray.length : 0,
                    digits: result.metrics.digits,
                    countingSortPasses: result.metrics.countingSorts,
                    maxValue: result.metrics.maxValue,
                    timeComplexity: `O((n + 10) × ${result.metrics.digits}) = O(${result.sortedArray.length} + 10) × ${result.metrics.digits})`
                }
            };
        }
    },
    
    // Help and documentation
    help: {
        algorithm: 'Radix Sort processes integers digit by digit, from least significant to most significant digit. It uses counting sort as a subroutine to sort elements based on each digit position.',
        steps: [
            '1. Find the maximum value to determine number of digits to process',
            '2. For each digit position (ones, tens, hundreds, etc.):',
            '   a. Extract the digit at current position for each element',
            '   b. Use counting sort to sort elements by this digit',
            '   c. Maintain stability by processing elements consistently',
            '3. After processing all digit positions, array is sorted'
        ],
        tips: [
            'Processes least significant digit first (rightmost)',
            'Each pass uses counting sort which is stable',
            'Number of passes equals the number of digits in maximum value',
            'Works well when digit count is small relative to data size',
            'Maintains relative order of equal elements (stable sort)'
        ],
        examples: [
            {
                title: 'Example: [170, 45, 75, 90, 2, 802, 24, 66]',
                explanation: 'Maximum = 802 (3 digits), so 3 passes needed',
                passes: [
                    'Pass 1 (ones): Sort by rightmost digit → [170, 90, 2, 802, 24, 45, 75, 66]',
                    'Pass 2 (tens): Sort by middle digit → [2, 802, 24, 45, 66, 170, 75, 90]', 
                    'Pass 3 (hundreds): Sort by leftmost digit → [2, 24, 45, 66, 75, 90, 170, 802]'
                ]
            }
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
            
            if (arrayInput.length > 15) {
                showError('Array size limited to 15 elements for demo purposes');
                return;
            }

            try {
                const startTime = performance.now();
                
                // Execute radix sort using steps function for animation
                let result;
                if (window.RadixSortSteps) {
                    result = window.RadixSortSteps.radixSortWithSteps(arrayInput);
                } else if (window.radixSortWithSteps) {
                    result = window.radixSortWithSteps(arrayInput);
                } else if (window.RadixSortCore) {
                    const coreResult = window.RadixSortCore.radixSort(arrayInput);
                    result = { ...coreResult, steps: [] };
                } else {
                    result = { sortedArray: [...arrayInput].sort((a, b) => a - b), metrics: { passes: 0, bucketOperations: 0, maxDigits: 0 }, steps: [] };
                }
                
                const endTime = performance.now();
                const executionTime = (endTime - startTime).toFixed(4);
                
                // Show result
                let resultHTML = 
                    '<strong>Original Array:</strong> [' + arrayInput.join(', ') + ']<br>' +
                    '<strong>Sorted Array:</strong> [' + result.sortedArray.join(', ') + ']<br>' +
                    '<strong>Max Digits (d):</strong> ' + (result.metrics.maxDigits || 0) + '<br>' +
                    '<strong>Passes:</strong> ' + (result.metrics.passes || 0) + '<br>' +
                    '<strong>Bucket Operations:</strong> ' + (result.metrics.bucketOperations || 0) + '<br>' +
                    '<strong>Execution Time:</strong> ' + executionTime + ' ms';
                
                resultContainer.innerHTML = resultHTML;
                
                // Show the visualization section with radix sort animation
                if (result.steps && result.steps.length > 0) {
                    showRadixSortVisualization(arrayInput, result.steps);
                    visualizationSection.style.display = 'block';
                }
                
            } catch (error) {
                showError(error.message);
            }
        }
        
        function showRadixSortVisualization(originalArray, steps) {
            const arrayViz = document.getElementById('array-visualization');
            const stepsContainer = document.getElementById('steps-container');
            
            // Clear previous visualization
            arrayViz.innerHTML = '';
            stepsContainer.innerHTML = '';
            
            // Define digit bucket colors (10 distinct colors for digits 0-9)
            const digitColors = [
                '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
                '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'
            ];
            
            // Create array visualization
            const arrayDiv = document.createElement('div');
            arrayDiv.className = 'array-visualization';
            arrayDiv.id = 'radix-array-display';
            
            originalArray.forEach((value, index) => {
                const cell = document.createElement('div');
                cell.textContent = value;
                cell.className = 'viz-cell radix-cell';
                cell.setAttribute('data-index', index);
                cell.setAttribute('data-value', value);
                
                // Add digit display container
                const digitDisplay = document.createElement('div');
                digitDisplay.className = 'digit-display';
                digitDisplay.textContent = '';
                cell.appendChild(digitDisplay);
                
                arrayDiv.appendChild(cell);
            });
            
            arrayViz.appendChild(arrayDiv);
            
            // Create digit position display
            const digitInfoDiv = document.createElement('div');
            digitInfoDiv.className = 'digit-info';
            digitInfoDiv.id = 'digit-info';
            digitInfoDiv.innerHTML = '<div class="digit-legend"><strong>Current Digit Position:</strong> <span id="current-digit-pos">Ready to start...</span></div>';
            arrayViz.appendChild(digitInfoDiv);
            
            // Create color legend for digit assignments
            const colorGuide = document.createElement('div');
            colorGuide.className = 'radix-color-guide';
            colorGuide.innerHTML = '<h4>Digit Color Guide:</h4>';
            
            const colorGrid = document.createElement('div');
            colorGrid.className = 'radix-color-grid';
            
            for (let digit = 0; digit <= 9; digit++) {
                const colorItem = document.createElement('div');
                colorItem.className = 'radix-color-item';
                
                // Create color box with guaranteed styling
                const colorBox = document.createElement('span');
                colorBox.className = 'radix-color-box digit-' + digit;
                colorBox.style.backgroundColor = digitColors[digit];
                colorBox.style.border = '1px solid rgba(0,0,0,0.3)';
                colorBox.style.display = 'inline-block';
                colorBox.style.width = '16px';
                colorBox.style.height = '16px';
                colorBox.style.borderRadius = '3px';
                colorBox.style.marginRight = '6px';
                colorBox.style.flexShrink = '0';
                
                // Create label
                const colorLabel = document.createElement('span');
                colorLabel.className = 'radix-digit-label';
                colorLabel.textContent = 'Digit ' + digit;
                
                colorItem.appendChild(colorBox);
                colorItem.appendChild(colorLabel);
                colorGrid.appendChild(colorItem);
            }
            
            colorGuide.appendChild(colorGrid);
            arrayViz.appendChild(colorGuide);
            
            // Add controls with legend
            const controlsDiv = document.createElement('div');
            controlsDiv.className = 'viz-controls';
            controlsDiv.innerHTML = 
                '<h4>Radix Sort Visualization</h4>' +
                '<button id="start-radix-animation" class="viz-button start">Start Animation</button>' +
                '<button id="pause-radix-animation" class="viz-button pause" disabled>Pause</button>' +
                '<button id="reset-radix-animation" class="viz-button reset">Reset</button>' +
                '<div class="viz-legend" id="radixsort-legend">' +
                    '<span class="viz-legend-desktop">✋ Extract | 🎨 Color by Digit | 📦 Distribute | 🔄 Collect | ✅ Complete</span>' +
                    '<div class="viz-legend-mobile" style="display: none;">' +
                        '<div class="viz-legend-item">✋ Extract digit from number</div>' +
                        '<div class="viz-legend-item">🎨 Color elements by their digit</div>' +
                        '<div class="viz-legend-item">📦 Distribute to digit groups</div>' +
                        '<div class="viz-legend-item">🔄 Collect back in digit order</div>' +
                        '<div class="viz-legend-item">✅ Pass completed</div>' +
                    '</div>' +
                '</div>';
            arrayViz.appendChild(controlsDiv);
            
            // Status display
            const statusDiv = document.createElement('div');
            statusDiv.id = 'radix-status';
            statusDiv.className = 'viz-status';
            statusDiv.textContent = 'Ready to start radix sort animation...';
            arrayViz.appendChild(statusDiv);
            
            // Animation variables
            let currentStepIndex = 0;
            let animationRunning = false;
            let animationInterval;
            
            function updateRadixVisualization(step) {
                const cells = arrayDiv.querySelectorAll('.viz-cell');
                const statusDiv = document.getElementById('radix-status');
                const digitPosSpan = document.getElementById('current-digit-pos');
                
                // Reset all cell classes and styles
                cells.forEach(cell => {
                    cell.className = 'viz-cell radix-cell';
                    cell.style.backgroundColor = '';
                    cell.style.color = '';
                    cell.style.borderColor = '';
                    const digitDisplay = cell.querySelector('.digit-display');
                    if (digitDisplay) {
                        digitDisplay.textContent = '';
                        digitDisplay.classList.remove('digit-highlight');
                    }
                });
                
                // Update array values if changed
                if (step.array) {
                    step.array.forEach((value, index) => {
                        if (cells[index]) {
                            cells[index].textContent = value;
                            cells[index].setAttribute('data-value', value);
                        }
                    });
                }
                
                // Update digit position display
                if (step.digitPosition !== undefined) {
                    const positionName = ['Ones', 'Tens', 'Hundreds', 'Thousands'][step.digitPosition] || 'Position ' + (step.digitPosition + 1);
                    digitPosSpan.textContent = positionName + ' (' + (step.digitPosition + 1) + ')'; 
                }
                
                // Handle different step types with color coding
                if (step.type === 'distribute') {
                    // Highlight current element being distributed
                    if (step.currentElementIndex !== undefined && cells[step.currentElementIndex]) {
                        cells[step.currentElementIndex].classList.add('distributing');
                        
                        // Show extracted digit
                        const digitDisplay = cells[step.currentElementIndex].querySelector('.digit-display');
                        if (digitDisplay && step.extractedDigit !== undefined) {
                            digitDisplay.textContent = step.extractedDigit;
                            digitDisplay.classList.add('digit-highlight');
                        }
                        
                        // Apply color based on extracted digit
                        if (step.extractedDigit !== undefined) {
                            const digitColor = digitColors[step.extractedDigit];
                            cells[step.currentElementIndex].style.backgroundColor = digitColor;
                            cells[step.currentElementIndex].style.color = 'white';
                            cells[step.currentElementIndex].style.borderColor = digitColor;
                        }
                    }
                } else if (step.type === 'collect') {
                    // Highlight element being collected
                    if (step.collectedTo !== undefined && cells[step.collectedTo]) {
                        cells[step.collectedTo].classList.add('collecting');
                    }
                } else if (step.type === 'distribution-complete') {
                    // Color all elements by their current digit
                    step.array.forEach((value, index) => {
                        if (cells[index] && step.digitPosition !== undefined) {
                            const digit = Math.floor(value / Math.pow(10, step.digitPosition)) % 10;
                            const digitColor = digitColors[digit];
                            cells[index].style.backgroundColor = digitColor;
                            cells[index].style.color = 'white';
                            cells[index].style.borderColor = digitColor;
                            cells[index].classList.add('digit-colored');
                        }
                    });
                } else if (step.type === 'pass-complete') {
                    // Show completion of pass with gentle pulse
                    cells.forEach(cell => {
                        cell.classList.add('pass-complete');
                    });
                }
                
                // Final completion state
                if (step.type === 'complete') {
                    cells.forEach(cell => {
                        cell.className = 'viz-cell radix-cell complete';
                        cell.style.backgroundColor = '';
                        cell.style.color = '';
                        cell.style.borderColor = '';
                        const digitDisplay = cell.querySelector('.digit-display');
                        if (digitDisplay) {
                            digitDisplay.textContent = '';
                            digitDisplay.classList.remove('digit-highlight');
                        }
                    });
                    digitPosSpan.textContent = 'Sorting Complete!';
                }
                
                // Update status
                statusDiv.textContent = step.message;
                
                // Show step info in container
                const stepInfo = document.createElement('div');
                stepInfo.className = step.type === 'complete' ? 'viz-step-info complete' : 'viz-step-info';
                
                let stepTypeColor = '#007acc';
                if (step.type === 'complete') stepTypeColor = '#28a745';
                else if (step.type === 'distribute') stepTypeColor = '#ff9800';
                else if (step.type === 'collect') stepTypeColor = '#4caf50';
                else if (step.phase === 'digit-processing') stepTypeColor = '#2196f3';
                
                stepInfo.style.borderLeftColor = stepTypeColor;
                
                let phaseEmoji = '*';
                if (step.type === 'distribute') phaseEmoji = '+';
                else if (step.type === 'collect') phaseEmoji = '-';
                else if (step.type === 'complete') phaseEmoji = '!';
                else if (step.type === 'pass-start') phaseEmoji = '>';
                
                stepInfo.innerHTML = 
                    '<strong>' + phaseEmoji + ' Step ' + (currentStepIndex + 1) + ':</strong> ' + step.message + '<br>' +
                    '<small>' +
                        'Phase: ' + (step.phase || 'processing') + ' | ' +
                        'Pass: ' + (step.passNumber || 'N/A') + ' | ' +
                        'Operations: ' + (step.metrics.bucketOperations || 0) +
                    '</small>';
                
                if (stepsContainer.children.length > 8) {
                    stepsContainer.removeChild(stepsContainer.firstChild);
                }
                stepsContainer.appendChild(stepInfo);
            }
            
            function startRadixAnimation() {
                if (animationRunning || currentStepIndex >= steps.length) return;
                
                animationRunning = true;
                document.getElementById('start-radix-animation').disabled = true;
                document.getElementById('pause-radix-animation').disabled = false;
                
                animationInterval = setInterval(() => {
                    if (currentStepIndex >= steps.length) {
                        clearInterval(animationInterval);
                        animationRunning = false;
                        document.getElementById('start-radix-animation').disabled = false;
                        document.getElementById('pause-radix-animation').disabled = true;
                        return;
                    }
                    
                    updateRadixVisualization(steps[currentStepIndex]);
                    currentStepIndex++;
                }, 1200); // 1.2 second delay between steps
            }
            
            function pauseRadixAnimation() {
                clearInterval(animationInterval);
                animationRunning = false;
                document.getElementById('start-radix-animation').disabled = false;
                document.getElementById('pause-radix-animation').disabled = true;
            }
            
            function resetRadixAnimation() {
                clearInterval(animationInterval);
                animationRunning = false;
                currentStepIndex = 0;
                document.getElementById('start-radix-animation').disabled = false;
                document.getElementById('pause-radix-animation').disabled = true;
                stepsContainer.innerHTML = '';
                
                // Reset visualization
                document.getElementById('current-digit-pos').textContent = 'Ready to start...';
                
                // Reset all cells to default state
                const cells = arrayDiv.querySelectorAll('.viz-cell');
                cells.forEach(cell => {
                    cell.className = 'viz-cell radix-cell';
                    cell.style.backgroundColor = '';
                    cell.style.color = '';
                    cell.style.borderColor = '';
                    const digitDisplay = cell.querySelector('.digit-display');
                    if (digitDisplay) {
                        digitDisplay.textContent = '';
                        digitDisplay.classList.remove('digit-highlight');
                    }
                });
                
                if (steps.length > 0) {
                    updateRadixVisualization(steps[0]);
                }
                document.getElementById('radix-status').textContent = 'Ready to start radix sort animation...';
            }
            
            // Bind control events
            document.getElementById('start-radix-animation').addEventListener('click', startRadixAnimation);
            document.getElementById('pause-radix-animation').addEventListener('click', pauseRadixAnimation);
            document.getElementById('reset-radix-animation').addEventListener('click', resetRadixAnimation);
            
            // Show initial state
            if (steps.length > 0) {
                updateRadixVisualization(steps[0]);
            }
        }
    `
};

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RadixSortConfig;
} else if (typeof window !== 'undefined') {
    window.RadixSortConfig = RadixSortConfig;
    
    // Additional exports for universal loader compatibility
    window.RADIX_SORT_CONFIG = RadixSortConfig;
    window.radixsortConfig = RadixSortConfig;
    window.radixsortconfig = RadixSortConfig;
}
