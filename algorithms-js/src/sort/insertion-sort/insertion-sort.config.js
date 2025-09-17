/**
 * Configuration for Insertion Sort Algorithm Demo
 */

const config = {
    name: "Insertion Sort",
    title: "Insertion Sort Demo",
    category: "sort",
    problem: "Sort an array by building the final sorted array one element at a time, inserting each element at its correct position in the already sorted portion.",
    algorithmFunction: "insertionSortWithSteps",
    hasVisualization: true,
    hasStepsFile: true,
    
    // Multi-language source code paths  
    sourceCode: {
        javascript: "https://github.com/sachinlala/SimplifyLearning/blob/master/algorithms-js/src/sort/insertion-sort/insertion-sort-core.js",
        java: "https://github.com/sachinlala/SimplifyLearning/blob/master/algorithms-java/src/main/java/com/sl/algorithms/sort/generalpurpose/smalldata/InsertionSort.java"
    },
    
    inputs: [
        {
            id: "unsorted-array",
            type: "text",
            label: "Unsorted Array (max 10 elements)",
            defaultValue: "5, 2, 4, 6, 1, 3",
            width: "250px"
        },
        {
            id: "sort-variant",
            type: "select", 
            label: "Algorithm Variant",
            options: [
                { value: "standard", text: "Standard" },
                { value: "binary", text: "Binary" }
            ],
            defaultValue: "standard",
            width: "180px"
        }
    ],
    
    explanation: {
        description: "Insertion Sort builds the sorted array incrementally by taking one element at a time from the unsorted portion and inserting it at the correct position in the sorted portion. It works similarly to how most people sort playing cards in their hands.",
        steps: [
            "Start with the second element (index 1) as the first element is trivially sorted",
            "Compare the current element (key) with elements in the sorted portion",
            "Shift all elements greater than the key one position to the right",
            "Insert the key at its correct position",
            "Repeat for all remaining elements"
        ]
    },
    
    complexityAnalysis: {
        time: {
            best: "O(n) - Array already sorted",
            average: "O(n²)", 
            worst: "O(n²) - Array sorted in reverse"
        },
        space: "O(1) - In-place algorithm",
        stability: true,
        inPlace: true,
        adaptive: true
    },
    
    characteristics: [
        "In-place sorting algorithm (O(1) extra space)",
        "Stable (maintains relative order of equal elements)",
        "Online (can sort a list as it receives it)",
        "Adaptive (efficient for data sets that are already substantially sorted)",
        "Simple implementation",
        "Efficient for small datasets",
        "Often used as subroutine in hybrid algorithms"
    ],
    
    advantages: [
        "Simple and intuitive implementation",
        "Efficient for small datasets (n < 50)",
        "More efficient than other O(n²) algorithms for small arrays", 
        "Adaptive - performs well on nearly sorted arrays",
        "Stable - doesn't change relative order of equal elements",
        "In-place - only requires O(1) additional memory",
        "Online - can sort array as elements are received"
    ],
    
    customDemoFunction: `
        function runDemo() {
            const arrayInputStr = document.getElementById('unsorted-array').value;
            const sortVariant = document.getElementById('sort-variant').value;
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
                    const asNumber = Number(trimmed);
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
            
            if (arrayInput.length > 10) {
                showError('Array size limited to 10 elements for demo purposes');
                return;
            }

            try {
                const startTime = performance.now();
                
                // Execute insertion sort based on variant
                let result;
                if (sortVariant === 'binary') {
                    result = binaryInsertionSortWithSteps(arrayInput);
                    result.variant = 'Binary Insertion Sort';
                } else {
                    result = insertionSortWithSteps(arrayInput);
                    result.variant = 'Standard Insertion Sort';
                }
                
                const endTime = performance.now();
                const executionTime = (endTime - startTime).toFixed(4);
                
                // Show result
                let resultHTML = \`
                    <strong>Algorithm:</strong> \${result.variant || 'Standard Insertion Sort'}<br>
                    <strong>Original Array:</strong> [\${arrayInput.join(', ')}]<br>
                    <strong>Sorted Array:</strong> [\${result.sortedArray.join(', ')}]<br>
                    <strong>Total Comparisons:</strong> \${result.metrics.comparisons}<br>
                    <strong>Total Shifts:</strong> \${result.metrics.shifts}<br>
                    <strong>Passes:</strong> \${result.metrics.passes}<br>
                    <strong>Execution Time:</strong> \${executionTime} ms
                \`;
                
                resultContainer.innerHTML = resultHTML;

                // Show visualization if steps are available (both variants now supported)
                if (result.steps && result.steps.length > 0) {
                    if (sortVariant === 'binary') {
                        showBinaryInsertionSortVisualization(arrayInput, result.steps);
                    } else {
                        showInsertionSortVisualization(arrayInput, result.steps);
                    }
                    visualizationSection.style.display = 'block';
                }
                
            } catch (error) {
                showError(error.message);
            }
        }

        function showInsertionSortVisualization(originalArray, steps) {
            const arrayViz = document.getElementById('array-visualization');
            const stepsContainer = document.getElementById('steps-container');
            
            // Clear previous visualization
            arrayViz.innerHTML = '';
            stepsContainer.innerHTML = '';
            
            // Create array visualization
            const arrayDiv = document.createElement('div');
            arrayDiv.className = 'array-visualization';
            arrayDiv.id = 'sort-array-display';
            
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
            controlsDiv.innerHTML = \`
                <h4>Insertion Sort Visualization</h4>
                <button id="start-sort-animation" class="viz-button start">Start Animation</button>
                <button id="pause-sort-animation" class="viz-button pause" disabled>Pause</button>
                <button id="reset-sort-animation" class="viz-button reset">Reset</button>
                <div class="viz-legend" id="insertionsort-legend">
                    <span class="viz-legend-desktop">🟢 Sorted | 🟡 Current Key | 🟣 Just Inserted</span>
                    <div class="viz-legend-mobile" style="display: none;">
                        <div class="viz-legend-item">🟢 Sorted</div>
                        <div class="viz-legend-item">🟡 Current Key</div>
                        <div class="viz-legend-item">🟣 Just Inserted</div>
                    </div>
                </div>
            \`;
            arrayViz.appendChild(controlsDiv);
            
            // Toggle legend display based on screen size
            function updateLegendDisplay() {
                const isMobile = window.innerWidth <= 768;
                const desktopLegend = document.querySelector('#insertionsort-legend .viz-legend-desktop');
                const mobileLegend = document.querySelector('#insertionsort-legend .viz-legend-mobile');
                
                if (desktopLegend && mobileLegend) {
                    if (isMobile) {
                        desktopLegend.style.display = 'none';
                        mobileLegend.style.display = 'flex';
                    } else {
                        desktopLegend.style.display = 'inline';
                        mobileLegend.style.display = 'none';
                    }
                }
            }
            
            updateLegendDisplay();
            window.addEventListener('resize', updateLegendDisplay);
            
            // Status display
            const statusDiv = document.createElement('div');
            statusDiv.id = 'sort-status';
            statusDiv.className = 'viz-status';
            statusDiv.textContent = 'Ready to start insertion sort animation...';
            arrayViz.appendChild(statusDiv);
            
            // Animation variables
            let currentStepIndex = 0;
            let animationRunning = false;
            let animationInterval;
            
            function updateVisualization(step) {
                const cells = arrayDiv.querySelectorAll('.viz-cell');
                const statusDiv = document.getElementById('sort-status');
                
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
                
                // Apply sorted portion first (green)
                if (step.sortedUpTo !== undefined && step.sortedUpTo > 0) {
                    for (let i = 0; i < step.sortedUpTo; i++) {
                        if (cells[i]) {
                            cells[i].className = 'viz-cell sorted';
                        }
                    }
                }
                
                // Apply step-specific highlighting (these override sorted)
                if (step.type === 'compare') {
                    // Highlight current element (yellow)
                    if (step.currentIndex !== undefined && cells[step.currentIndex]) {
                        cells[step.currentIndex].className = 'viz-cell current';
                    }
                    // Highlight comparison element (blue)
                    if (step.comparePosition !== undefined && cells[step.comparePosition]) {
                        cells[step.comparePosition].className = 'viz-cell comparing';
                    }
                } else if (step.type === 'insert') {
                    // Highlight just inserted element (purple)
                    if (step.insertPosition !== undefined && cells[step.insertPosition]) {
                        cells[step.insertPosition].className = 'viz-cell just-inserted';
                    }
                } else {
                    // Default: highlight current element (yellow)
                    if (step.currentIndex !== undefined && cells[step.currentIndex]) {
                        cells[step.currentIndex].className = 'viz-cell current';
                    }
                }
                // Update status
                statusDiv.textContent = step.message;
                
                // Show step info in container
                const stepInfo = document.createElement('div');
                stepInfo.className = step.type === 'complete' ? 'viz-step-info complete' : 'viz-step-info';
                
                stepInfo.innerHTML = \`
                    <strong>Step \${currentStepIndex + 1}:</strong> \${step.message}<br>
                    <small>Comparisons: \${step.comparisons || 0}, Shifts: \${step.shifts || 0}</small>
                \`;
                
                if (stepsContainer.children.length > 6) {
                    stepsContainer.removeChild(stepsContainer.firstChild);
                }
                stepsContainer.appendChild(stepInfo);
            }
            
            function startAnimation() {
                if (animationRunning || currentStepIndex >= steps.length) return;
                
                animationRunning = true;
                document.getElementById('start-sort-animation').disabled = true;
                document.getElementById('pause-sort-animation').disabled = false;
                
                animationInterval = setInterval(() => {
                    if (currentStepIndex >= steps.length) {
                        clearInterval(animationInterval);
                        animationRunning = false;
                        document.getElementById('start-sort-animation').disabled = false;
                        document.getElementById('pause-sort-animation').disabled = true;
                        return;
                    }
                    
                    updateVisualization(steps[currentStepIndex]);
                    currentStepIndex++;
                }, 2500); // 2.5 second delay between steps (slower for better visibility)
            }
            
            function pauseAnimation() {
                clearInterval(animationInterval);
                animationRunning = false;
                document.getElementById('start-sort-animation').disabled = false;
                document.getElementById('pause-sort-animation').disabled = true;
            }
            
            function resetAnimation() {
                clearInterval(animationInterval);
                animationRunning = false;
                currentStepIndex = 0;
                document.getElementById('start-sort-animation').disabled = false;
                document.getElementById('pause-sort-animation').disabled = true;
                stepsContainer.innerHTML = '';
                
                // Reset visualization
                if (steps.length > 0) {
                    updateVisualization(steps[0]);
                }
                document.getElementById('sort-status').textContent = 'Ready to start insertion sort animation...';
            }
            
            // Bind control events
            document.getElementById('start-sort-animation').addEventListener('click', startAnimation);
            document.getElementById('pause-sort-animation').addEventListener('click', pauseAnimation);
            document.getElementById('reset-sort-animation').addEventListener('click', resetAnimation);
            
            // Show initial state
            if (steps.length > 0) {
                updateVisualization(steps[0]);
            }
        }
        
        function showBinaryInsertionSortVisualization(originalArray, steps) {
            const arrayViz = document.getElementById('array-visualization');
            const stepsContainer = document.getElementById('steps-container');
            
            // Clear previous visualization
            arrayViz.innerHTML = '';
            stepsContainer.innerHTML = '';
            
            // Create array visualization
            const arrayDiv = document.createElement('div');
            arrayDiv.className = 'array-visualization';
            arrayDiv.id = 'binary-sort-array-display';
            
            originalArray.forEach((value, index) => {
                const cell = document.createElement('div');
                cell.textContent = value;
                cell.className = 'viz-cell';
                cell.setAttribute('data-index', index);
                cell.setAttribute('data-value', value);
                arrayDiv.appendChild(cell);
            });
            
            arrayViz.appendChild(arrayDiv);
            
            // Add controls
            const controlsDiv = document.createElement('div');
            controlsDiv.style.cssText = 'text-align: center; margin-bottom: 20px;';
            controlsDiv.innerHTML = \`
<h4>Binary Insertion Sort Visualization</h4>
                <button id="start-binary-sort-animation" class="viz-button start">Start Animation</button>
                <button id="pause-binary-sort-animation" class="viz-button pause" disabled>Pause</button>
                <button id="reset-binary-sort-animation" class="viz-button reset">Reset</button>
                <div class="viz-legend" id="binaryinsertionsort-legend">
                    <span class="viz-legend-desktop">🟢 Sorted | 🟠 Current | 🟣 Search Range | 🔵 Mid | 🔴 Shifting</span>
                    <div class="viz-legend-mobile" style="display: none;">
                        <div class="viz-legend-item">🟢 Sorted</div>
                        <div class="viz-legend-item">🟠 Current</div>
                        <div class="viz-legend-item">🟣 Search Range</div>
                        <div class="viz-legend-item">🔵 Mid</div>
                        <div class="viz-legend-item">🔴 Shifting</div>
                    </div>
                </div>
            \`;
            arrayViz.appendChild(controlsDiv);
            
            // Toggle legend display based on screen size
            function updateBinaryLegendDisplay() {
                const isMobile = window.innerWidth <= 768;
                const desktopLegend = document.querySelector('#binaryinsertionsort-legend .viz-legend-desktop');
                const mobileLegend = document.querySelector('#binaryinsertionsort-legend .viz-legend-mobile');
                
                if (desktopLegend && mobileLegend) {
                    if (isMobile) {
                        desktopLegend.style.display = 'none';
                        mobileLegend.style.display = 'flex';
                    } else {
                        desktopLegend.style.display = 'inline';
                        mobileLegend.style.display = 'none';
                    }
                }
            }
            
            updateBinaryLegendDisplay();
            window.addEventListener('resize', updateBinaryLegendDisplay);
            
            // Status display
            const statusDiv = document.createElement('div');
            statusDiv.id = 'binary-sort-status';
            statusDiv.style.cssText = 'text-align: center; margin-bottom: 20px; font-size: 1.1em; font-weight: bold; min-height: 25px;';
            statusDiv.textContent = 'Ready to start binary insertion sort animation...';
            arrayViz.appendChild(statusDiv);
            
            // Animation variables
            let currentStepIndex = 0;
            let animationRunning = false;
            let animationInterval;
            
            function updateBinaryVisualization(step) {
                const cells = arrayDiv.querySelectorAll('.viz-cell');
                const statusDiv = document.getElementById('binary-sort-status');
                
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
                
                // Highlight sorted portion (green)
                if (step.sortedUpTo) {
                    for (let i = 0; i < step.sortedUpTo; i++) {
                        if (cells[i]) {
                            cells[i].className = 'viz-cell sorted';
                        }
                    }
                }
                
                // Highlight current element being processed (orange)
                if (step.currentIndex !== undefined && cells[step.currentIndex]) {
                    cells[step.currentIndex].className = 'viz-cell current';
                }
                
                // Highlight binary search range (purple) 🟣
                if (step.searchRange && step.type.includes('binary-search')) {
                    for (let i = step.searchRange[0]; i <= step.searchRange[1]; i++) {
                        if (cells[i] && i !== step.currentIndex && i !== step.mid) {
                            cells[i].className = 'viz-cell swapping'; // Purple/magenta - rgba(156, 39, 176, 0.8)
                        }
                    }
                }
                
                // Highlight mid element in binary search (blue) 🔵 - override other classes
                if (step.mid !== undefined && cells[step.mid]) {
                    cells[step.mid].className = 'viz-cell current-range'; // Blue - rgba(33, 150, 243, 0.6)
                }
                
                // Highlight insertion position - use distinct green
                if (step.insertPosition !== undefined && cells[step.insertPosition] && step.type === 'position-found') {
                    cells[step.insertPosition].className = 'viz-cell just-inserted'; // Bright purple for insertion
                }
                
                // Highlight shifting range (red) 🔴
                if (step.shiftRange && (step.type === 'shift-start' || step.type === 'shift-complete')) {
                    for (let i = step.shiftRange[0]; i <= step.shiftRange[1]; i++) {
                        if (cells[i] && i !== step.currentIndex) {
                            cells[i].className = 'viz-cell pivot'; // Red - rgba(244, 67, 54, 0.85)
                        }
                    }
                }
                
                // Update status
                statusDiv.textContent = step.message;
                
                // Show step info in container
                const stepInfo = document.createElement('div');
                
                // Use CSS classes that adapt to theme instead of hardcoded colors
                if (step.type.includes('binary-search')) {
                    stepInfo.className = 'viz-step-info binary-search';
                } else if (step.type === 'insert') {
                    stepInfo.className = 'viz-step-info insert';
                } else if (step.type.includes('shift')) {
                    stepInfo.className = 'viz-step-info shift';
                } else if (step.type === 'complete') {
                    stepInfo.className = 'viz-step-info complete';
                } else {
                    stepInfo.className = 'viz-step-info';
                }
                
                stepInfo.innerHTML = \`
                    <strong>Step \${currentStepIndex + 1}:</strong> \${step.message}<br>
                    <small>Comparisons: \${step.comparisons || 0}, Shifts: \${step.shifts || 0}</small>
                \`;
                
                if (stepsContainer.children.length > 8) {
                    stepsContainer.removeChild(stepsContainer.firstChild);
                }
                stepsContainer.appendChild(stepInfo);
            }
            
            function startBinaryAnimation() {
                if (animationRunning || currentStepIndex >= steps.length) return;
                
                animationRunning = true;
                document.getElementById('start-binary-sort-animation').disabled = true;
                document.getElementById('pause-binary-sort-animation').disabled = false;
                
                animationInterval = setInterval(() => {
                    if (currentStepIndex >= steps.length) {
                        clearInterval(animationInterval);
                        animationRunning = false;
                        document.getElementById('start-binary-sort-animation').disabled = false;
                        document.getElementById('pause-binary-sort-animation').disabled = true;
                        return;
                    }
                    
                    updateBinaryVisualization(steps[currentStepIndex]);
                    currentStepIndex++;
                }, 1500); // 1.5 second delay between steps (slightly faster than standard)
            }
            
            function pauseBinaryAnimation() {
                clearInterval(animationInterval);
                animationRunning = false;
                document.getElementById('start-binary-sort-animation').disabled = false;
                document.getElementById('pause-binary-sort-animation').disabled = true;
            }
            
            function resetBinaryAnimation() {
                clearInterval(animationInterval);
                animationRunning = false;
                currentStepIndex = 0;
                document.getElementById('start-binary-sort-animation').disabled = false;
                document.getElementById('pause-binary-sort-animation').disabled = true;
                stepsContainer.innerHTML = '';
                
                // Reset visualization
                if (steps.length > 0) {
                    updateBinaryVisualization(steps[0]);
                }
                document.getElementById('binary-sort-status').textContent = 'Ready to start binary insertion sort animation...';
            }
            
            // Bind control events
            document.getElementById('start-binary-sort-animation').addEventListener('click', startBinaryAnimation);
            document.getElementById('pause-binary-sort-animation').addEventListener('click', pauseBinaryAnimation);
            document.getElementById('reset-binary-sort-animation').addEventListener('click', resetBinaryAnimation);
            
            // Show initial state
            if (steps.length > 0) {
                updateBinaryVisualization(steps[0]);
            }
        }`
};

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} else if (typeof window !== 'undefined') {
    window.insertionSortConfig = config;
}