/**
 * Wiggle Sort - Configuration and Demo Presets
 * 
 * Configuration for Wiggle Sort algorithm demonstrations,
 * including preset test cases and visualization settings.
 * 
 * @see https://github.com/sachinlala/SimplifyLearning
 */

const WIGGLE_SORT_CONFIG = {
    // Top-level properties for dynamic template compatibility
    name: "Wiggle Sort",
    category: "sort",
    hasStepsFile: true,
    hasVisualization: true,
    problem: "Arrange array elements in a wiggling pattern where arr[0] < arr[1] > arr[2] < arr[3] > arr[4]... Elements alternate between peaks and valleys.",
    
    // Inputs for the demo interface
    inputs: [
        {
            id: 'array-input',
            type: 'text',
            label: 'Array Elements',
            defaultValue: '3, 5, 2, 1, 6, 4',
            width: '300px'
        },
        {
            id: 'variant',
            type: 'select',
            label: 'Wiggle Sort Variant',
            defaultValue: 'I',
            width: '150px',
            options: [
                { value: 'I', text: 'Wiggle Sort I (Simple)' },
                { value: 'II', text: 'Wiggle Sort II (No Adjacent Duplicates)' }
            ]
        }
    ],
    
    // Multi-language source code paths
    sourceCode: {
        javascript: "https://github.com/sachinlala/SimplifyLearning/blob/master/algorithms-js/src/sort/wiggle-sort/wiggle-sort-core.js",
        java: "https://github.com/sachinlala/SimplifyLearning/tree/master/algorithms-java/src/main/java/com/sl/algorithms/sort/wiggle",
        python: "", // Coming soon
        go: "" // Coming soon
    },
    
    explanation: {
        description: 'Wiggle Sort rearranges an array so that elements alternate between being smaller and larger than their neighbors, creating a "wiggling" pattern. Wiggle Sort I achieves this in O(n) time by making local adjustments, while Wiggle Sort II handles duplicates more carefully to avoid adjacent identical elements.'
    },
    
    algorithm: {
        name: "Wiggle Sort",
        shortName: "Wiggle",
        description: "Arranges array elements in a wiggling pattern: arr[0] < arr[1] > arr[2] < arr[3]...",
        timeComplexity: {
            best: "O(n)", // For Wiggle Sort I
            average: "O(n log n)", // For Wiggle Sort II
            worst: "O(n log n)"
        },
        spaceComplexity: "O(1) for Wiggle Sort I, O(n) for Wiggle Sort II",
        stable: false,
        inPlace: true, // For Wiggle Sort I
        adaptive: false,
        category: "Specialized Sorting"
    },

    visualization: {
        animationSpeed: 1000,
        highlightDuration: 1500,
        colors: {
            valley: "#3498db",      // Blue for valleys (even positions)
            peak: "#e74c3c",        // Red for peaks (odd positions)
            comparing: "#f39c12",   // Orange for comparison
            swapping: "#9b59b6",    // Purple for swapping
            sorted: "#27ae60",      // Green for sorted
            default: "#ecf0f1"      // Light gray default
        },
        showPattern: true,
        showIndices: true,
        showMetrics: true
    },

    presets: [
        {
            name: "Basic Wiggle Sort I",
            description: "Simple example demonstrating wiggling pattern",
            array: [3, 5, 2, 1, 6, 4],
            variant: "I",
            category: "Basic",
            expectedPattern: "<><><"
        },
        {
            name: "Wiggle Sort II (No Duplicates)",
            description: "Variant that avoids adjacent duplicates",
            array: [1, 5, 1, 1, 6, 4],
            variant: "II", 
            category: "Advanced",
            expectedPattern: "<><><"
        },
        {
            name: "Already Wiggling",
            description: "Array already in wiggle pattern",
            array: [1, 3, 2, 5, 4, 6],
            variant: "I",
            category: "Best Case",
            expectedPattern: "<><><"
        },
        {
            name: "Reverse Wiggle",
            description: "Array in reverse wiggle pattern",
            array: [6, 4, 5, 2, 3, 1],
            variant: "I",
            category: "Worst Case",
            expectedPattern: "><><>"
        },
        {
            name: "Small Array",
            description: "Testing with minimal elements",
            array: [2, 1, 3],
            variant: "I",
            category: "Edge Case",
            expectedPattern: "<>"
        },
        {
            name: "Single Element",
            description: "Edge case with one element",
            array: [42],
            variant: "I",
            category: "Edge Case",
            expectedPattern: "single element"
        },
        {
            name: "Two Elements",
            description: "Minimal wiggle with two elements",
            array: [5, 2],
            variant: "I",
            category: "Edge Case",
            expectedPattern: ">"
        },
        {
            name: "Identical Elements",
            description: "Array with all same values",
            array: [7, 7, 7, 7],
            variant: "I",
            category: "Edge Case",
            expectedPattern: "==="
        },
        {
            name: "Large Array",
            description: "Testing with more elements",
            array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            variant: "I",
            category: "Stress Test",
            expectedPattern: "<><><><><"
        },
        {
            name: "Duplicates Test (Sort II)",
            description: "Many duplicates for Wiggle Sort II",
            array: [1, 1, 2, 2, 3, 3, 4, 4],
            variant: "II",
            category: "Advanced",
            expectedPattern: "<><><><"
        },
        {
            name: "Random Sequence",
            description: "Random numbers for general testing",
            array: [64, 34, 25, 12, 22, 11, 90],
            variant: "I",
            category: "General",
            expectedPattern: "<><><><"
        },
        {
            name: "Negative Numbers",
            description: "Testing with negative values",
            array: [-1, 3, -2, 5, -3, 7],
            variant: "I",
            category: "General",
            expectedPattern: "<><><"
        }
    ],

    testCases: [
        {
            name: "Basic functionality",
            tests: [
                {
                    input: [3, 5, 2, 1, 6, 4],
                    variant: "I",
                    description: "Should create wiggling pattern for basic array"
                },
                {
                    input: [1, 5, 1, 1, 6, 4],
                    variant: "II",
                    description: "Should handle duplicates without adjacent placement"
                }
            ]
        },
        {
            name: "Edge cases",
            tests: [
                {
                    input: [],
                    variant: "I",
                    description: "Should handle empty array"
                },
                {
                    input: [42],
                    variant: "I", 
                    description: "Should handle single element"
                },
                {
                    input: [7, 7, 7, 7],
                    variant: "I",
                    description: "Should handle identical elements"
                }
            ]
        },
        {
            name: "Pattern validation",
            tests: [
                {
                    input: [1, 3, 2, 5, 4],
                    variant: "I",
                    expectedPattern: "<><>",
                    description: "Should produce correct wiggle pattern"
                }
            ]
        }
    ],

    performance: {
        expectedComparisons: (n, variant) => variant === "I" ? n - 1 : n * Math.log(n),
        expectedSwaps: (n, variant) => variant === "I" ? Math.floor(n / 2) : n,
        benchmarkSizes: [10, 50, 100, 500, 1000],
        timeoutMs: 5000
    },

    ui: {
        controls: {
            speedControl: true,
            stepControl: true,
            resetControl: true,
            presetSelector: true,
            customInput: true,
            variantSelector: true // For choosing between Wiggle Sort I and II
        },
        display: {
            showArray: true,
            showSteps: true,
            showMetrics: true,
            showPattern: true,
            showIndices: true,
            showVariant: true
        }
    },

    educational: {
        concepts: [
            "Peak and valley patterns",
            "In-place algorithms",
            "Pattern-based sorting",
            "Adjacent element comparison",
            "Two-pass vs single-pass algorithms"
        ],
        applications: [
            "Data visualization patterns",
            "Wave pattern generation",
            "UI element arrangement",
            "Stock price patterns",
            "Game level design"
        ],
        relatedAlgorithms: [
            "Bubble Sort",
            "Selection Sort", 
            "Quick Sort partitioning",
            "Dutch National Flag Sort"
        ],
        variants: {
            "Wiggle Sort I": {
                description: "Simple in-place O(n) algorithm",
                advantages: ["Linear time", "Constant space", "In-place"],
                disadvantages: ["Allows adjacent duplicates", "Not stable"]
            },
            "Wiggle Sort II": {
                description: "No adjacent duplicates, requires sorting",
                advantages: ["No adjacent duplicates", "Predictable pattern"],
                disadvantages: ["O(n log n) time", "Extra space needed"]
            }
        }
    },
    
    customDemoFunction: `
        function runDemo() {
            const arrayInputStr = document.getElementById('array-input').value;
            const variant = document.getElementById('variant').value;
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
                    if (isNaN(asNumber)) {
                        throw new Error('All elements must be integers');
                    }
                    return asNumber;
                });
            } catch (e) {
                showError('Invalid array format. Please use comma-separated integers.');
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
                
                // Execute wiggle sort using steps function for animation
                let result;
                if (window.WiggleSortSteps) {
                    if (variant === 'II') {
                        result = window.WiggleSortSteps.wiggleSortIIWithSteps(arrayInput);
                    } else {
                        result = window.WiggleSortSteps.wiggleSortIWithSteps(arrayInput);
                    }
                } else if (window.wiggleSortWithSteps) {
                    result = window.wiggleSortWithSteps(arrayInput, variant);
                } else if (window.WiggleSortCore) {
                    // Fallback to core functions without steps
                    if (variant === 'II') {
                        const coreResult = window.WiggleSortCore.wiggleSortII(arrayInput);
                        result = { ...coreResult, steps: [] };
                    } else {
                        const coreResult = window.WiggleSortCore.wiggleSortI(arrayInput);
                        result = { ...coreResult, steps: [] };
                    }
                } else {
                    // Fallback if nothing loaded
                    result = { sortedArray: [...arrayInput].sort((a, b) => a - b), metrics: { comparisons: 0, swaps: 0 }, steps: [] };
                }
                
                const endTime = performance.now();
                const executionTime = (endTime - startTime).toFixed(4);
                
                // Analyze the pattern of the result
                const patternAnalysis = window.WiggleSortConfigUtils ? 
                    window.WiggleSortConfigUtils.analyzeWigglePattern(result.sortedArray) : 
                    { pattern: 'N/A', isValid: 'Unknown' };
                
                // Show result
                let resultHTML = 
                    '<strong>Original Array:</strong> [' + arrayInput.join(', ') + ']<br>' +
                    '<strong>Wiggle Sorted Array:</strong> [' + result.sortedArray.join(', ') + ']<br>' +
                    '<strong>Variant:</strong> Wiggle Sort ' + variant + '<br>' +
                    '<strong>Pattern:</strong> ' + patternAnalysis.pattern + '<br>' +
                    '<strong>Valid Wiggle:</strong> ' + (patternAnalysis.isValid ? 'Yes' : 'No') + '<br>' +
                    '<strong>Comparisons:</strong> ' + (result.metrics.comparisons || 0) + '<br>' +
                    '<strong>Swaps:</strong> ' + (result.metrics.swaps || 0) + '<br>' +
                    '<strong>Time Complexity:</strong> ' + (variant === 'II' ? 'O(n log n)' : 'O(n)') + '<br>' +
                    '<strong>Space Complexity:</strong> ' + (variant === 'II' ? 'O(n)' : 'O(1)') + '<br>' +
                    '<strong>Execution Time:</strong> ' + executionTime + ' ms';
                
                resultContainer.innerHTML = resultHTML;
                
                // Show the visualization section with wiggle sort animation
                if (result.steps && result.steps.length > 0) {
                    showWiggleSortVisualization(arrayInput, result.steps, variant);
                    visualizationSection.style.display = 'block';
                }
                
            } catch (error) {
                showError(error.message);
            }
        }
        
        function showWiggleSortVisualization(originalArray, steps, variant) {
            const arrayViz = document.getElementById('array-visualization');
            const stepsContainer = document.getElementById('steps-container');
            
            // Clear previous visualization
            arrayViz.innerHTML = '';
            stepsContainer.innerHTML = '';
            
            // Create array visualization
            const arrayDiv = document.createElement('div');
            arrayDiv.className = 'array-visualization';
            arrayDiv.id = 'wiggle-array-display';
            
            originalArray.forEach((value, index) => {
                const cell = document.createElement('div');
                cell.textContent = value;
                cell.className = 'viz-cell';
                cell.setAttribute('data-index', index);
                cell.setAttribute('data-value', value);
                arrayDiv.appendChild(cell);
            });
            
            arrayViz.appendChild(arrayDiv);
            
            // Add controls with legend
            const controlsDiv = document.createElement('div');
            controlsDiv.className = 'viz-controls';
            controlsDiv.innerHTML = 
                '<h4>Wiggle Sort ' + variant + ' Visualization</h4>' +
                '<button id="start-wiggle-animation" class="viz-button start">Start Animation</button>' +
                '<button id="pause-wiggle-animation" class="viz-button pause" disabled>Pause</button>' +
                '<button id="reset-wiggle-animation" class="viz-button reset">Reset</button>' +
                '<div class="viz-legend" id="wigglesort-legend">' +
                    '<span class="viz-legend-desktop">🔵 Valley (Even) | 🔴 Peak (Odd) | 🟡 Comparing | 🟢 Swapping | ✅ Complete</span>' +
                    '<div class="viz-legend-mobile" style="display: none;">' +
                        '<div class="viz-legend-item">🔵 Valley (Even)</div>' +
                        '<div class="viz-legend-item">🔴 Peak (Odd)</div>' +
                        '<div class="viz-legend-item">🟡 Comparing</div>' +
                        '<div class="viz-legend-item">🟢 Swapping</div>' +
                        '<div class="viz-legend-item">✅ Complete</div>' +
                    '</div>' +
                '</div>';
            arrayViz.appendChild(controlsDiv);
            
            // Status display
            const statusDiv = document.createElement('div');
            statusDiv.id = 'wiggle-status';
            statusDiv.className = 'viz-status';
            statusDiv.textContent = 'Ready to start wiggle sort animation...';
            arrayViz.appendChild(statusDiv);
            
            // Animation variables
            let currentStepIndex = 0;
            let animationRunning = false;
            let animationInterval;
            
            function updateWiggleVisualization(step) {
                const cells = arrayDiv.querySelectorAll('.viz-cell');
                const statusDiv = document.getElementById('wiggle-status');
                
                // Reset all cell classes
                cells.forEach(cell => {
                    cell.className = 'viz-cell';
                });
                
                // Update array values
                step.array.forEach((value, index) => {
                    if (cells[index]) {
                        cells[index].textContent = value;
                    }
                });
                
                // Color cells based on their position (valley or peak pattern)
                step.array.forEach((value, index) => {
                    if (cells[index]) {
                        if (index % 2 === 0) {
                            cells[index].classList.add('valley'); // Even positions = valleys
                        } else {
                            cells[index].classList.add('peak');   // Odd positions = peaks
                        }
                    }
                });
                
                // Highlight current indices being processed
                if (step.highlightIndices) {
                    step.highlightIndices.forEach(index => {
                        if (cells[index]) {
                            cells[index].classList.add('comparing');
                        }
                    });
                }
                
                // Highlight swapped indices
                if (step.swappedIndices) {
                    step.swappedIndices.forEach(index => {
                        if (cells[index]) {
                            cells[index].classList.add('swapping');
                        }
                    });
                }
                
                // Update status
                statusDiv.textContent = step.message;
                
                // Show step info in container
                const stepInfo = document.createElement('div');
                stepInfo.className = step.type === 'complete' ? 'viz-step-info complete' : 'viz-step-info';
                
                let stepTypeColor = '#007acc';
                if (step.type === 'complete') stepTypeColor = '#28a745';
                else if (step.type === 'swap') stepTypeColor = '#dc3545';
                else if (step.type === 'compare') stepTypeColor = '#ffc107';
                
                stepInfo.style.borderLeftColor = stepTypeColor;
                
                stepInfo.innerHTML = 
                    '<strong>Step ' + (currentStepIndex + 1) + ':</strong> ' + step.message + '<br>' +
                    '<small>' +
                        'Phase: ' + (step.phase) + ' | ' +
                        'Comparisons: ' + (step.comparisons || 0) + ' | ' +
                        'Swaps: ' + (step.swaps || 0) + ' | ' +
                        'Pattern: ' + (step.patternFixed || step.expectedPattern || 'N/A') +
                    '</small>';
                
                if (stepsContainer.children.length > 8) {
                    stepsContainer.removeChild(stepsContainer.firstChild);
                }
                stepsContainer.appendChild(stepInfo);
            }
            
            function startWiggleAnimation() {
                if (animationRunning || currentStepIndex >= steps.length) return;
                
                animationRunning = true;
                document.getElementById('start-wiggle-animation').disabled = true;
                document.getElementById('pause-wiggle-animation').disabled = false;
                
                animationInterval = setInterval(() => {
                    if (currentStepIndex >= steps.length) {
                        clearInterval(animationInterval);
                        animationRunning = false;
                        document.getElementById('start-wiggle-animation').disabled = false;
                        document.getElementById('pause-wiggle-animation').disabled = true;
                        return;
                    }
                    
                    updateWiggleVisualization(steps[currentStepIndex]);
                    currentStepIndex++;
                }, 1500); // 1.5 second delay between steps
            }
            
            function pauseWiggleAnimation() {
                clearInterval(animationInterval);
                animationRunning = false;
                document.getElementById('start-wiggle-animation').disabled = false;
                document.getElementById('pause-wiggle-animation').disabled = true;
            }
            
            function resetWiggleAnimation() {
                clearInterval(animationInterval);
                animationRunning = false;
                currentStepIndex = 0;
                document.getElementById('start-wiggle-animation').disabled = false;
                document.getElementById('pause-wiggle-animation').disabled = true;
                stepsContainer.innerHTML = '';
                
                // Reset visualization
                if (steps.length > 0) {
                    updateWiggleVisualization(steps[0]);
                }
                document.getElementById('wiggle-status').textContent = 'Ready to start wiggle sort animation...';
            }
            
            // Bind control events
            document.getElementById('start-wiggle-animation').addEventListener('click', startWiggleAnimation);
            document.getElementById('pause-wiggle-animation').addEventListener('click', pauseWiggleAnimation);
            document.getElementById('reset-wiggle-animation').addEventListener('click', resetWiggleAnimation);
            
            // Show initial state
            if (steps.length > 0) {
                updateWiggleVisualization(steps[0]);
            }
        }
    `
};

// Utility functions for config
const WiggleSortConfigUtils = {
    getPresetByName(name) {
        return WIGGLE_SORT_CONFIG.presets.find(preset => preset.name === name);
    },

    getPresetsByCategory(category) {
        return WIGGLE_SORT_CONFIG.presets.filter(preset => preset.category === category);
    },

    getPresetsByVariant(variant) {
        return WIGGLE_SORT_CONFIG.presets.filter(preset => preset.variant === variant);
    },

    generateRandomWiggleArray(size, min = 1, max = 20) {
        const array = [];
        for (let i = 0; i < size; i++) {
            array.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return array;
    },

    generateWorstCaseArray(size) {
        // Descending order is worst case for Wiggle Sort I
        const array = [];
        for (let i = size; i >= 1; i--) {
            array.push(i);
        }
        return array;
    },

    generateBestCaseArray(size) {
        // Already wiggling pattern
        const array = [];
        for (let i = 0; i < size; i++) {
            if (i % 2 === 0) {
                array.push(i + 1); // Valleys: 1, 3, 5...
            } else {
                array.push(size - i + 1); // Peaks: larger values
            }
        }
        return array;
    },

    validateWigglePattern(array, variant = "I") {
        if (!array || array.length <= 1) return { valid: true };

        for (let i = 0; i < array.length - 1; i++) {
            const isEven = i % 2 === 0;
            
            if (isEven && array[i] >= array[i + 1]) {
                return { 
                    valid: false, 
                    error: `Valley violation at index ${i}` 
                };
            }
            
            if (!isEven && array[i] <= array[i + 1]) {
                return { 
                    valid: false, 
                    error: `Peak violation at index ${i}` 
                };
            }

            // Check for adjacent duplicates in Wiggle Sort II
            if (variant === "II" && array[i] === array[i + 1]) {
                return {
                    valid: false,
                    error: `Adjacent duplicates at indices ${i} and ${i + 1}`
                };
            }
        }

        return { valid: true };
    },

    analyzeWigglePattern(array) {
        if (!array || array.length <= 1) return "No pattern";
        
        let pattern = "";
        let valleys = 0;
        let peaks = 0;
        let violations = 0;

        for (let i = 0; i < array.length - 1; i++) {
            if (array[i] < array[i + 1]) {
                pattern += "<";
                if (i % 2 === 0) valleys++;
                else violations++;
            } else if (array[i] > array[i + 1]) {
                pattern += ">";
                if (i % 2 === 1) peaks++;
                else violations++;
            } else {
                pattern += "=";
                violations++;
            }
        }

        return {
            pattern,
            valleys,
            peaks,
            violations,
            isValid: violations === 0
        };
    }
};

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        WIGGLE_SORT_CONFIG,
        WiggleSortConfigUtils
    };
} else if (typeof window !== 'undefined') {
    // Primary exports
    window.WIGGLE_SORT_CONFIG = WIGGLE_SORT_CONFIG;
    window.WiggleSortConfigUtils = WiggleSortConfigUtils;
    
    // Universal loader compatibility - these are the names the loader looks for
    window.wigglesortConfig = WIGGLE_SORT_CONFIG;     // algorithmName.replace(/-/g, '') + 'Config'
    window.wigglesortconfig = WIGGLE_SORT_CONFIG;     // algorithmName.replace(/-/g, '').toLowerCase() + 'Config'  
    window.wiggleSortConfig = WIGGLE_SORT_CONFIG;     // toCamelCase(algorithmName) + 'Config'
    
    // Legacy compatibility
    window.WiggleSortConfig = WIGGLE_SORT_CONFIG;
}
