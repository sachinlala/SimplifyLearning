/**
 * Configuration for Selection Sort Algorithm Demo
 */

const config = {
    name: "Selection Sort",
    title: "Selection Sort Demo",
    category: "sort",
    problem: "Sort an array by repeatedly finding the minimum element from the unsorted part and putting it at the beginning.",
    algorithmFunction: "selectionSortWithSteps",
    hasVisualization: true,
    
    // Multi-language source code paths  
    sourceCode: {
        javascript: "https://github.com/sachinlala/SimplifyLearning/blob/master/algorithms-js/src/sort/selection-sort/selection-sort-core.js",
        java: "https://github.com/sachinlala/SimplifyLearning/blob/master/algorithms-java/src/main/java/com/sl/algorithms/sort/generalpurpose/smalldata/SelectionSort.java"
    },
    
    inputs: [
        {
            id: "unsorted-array",
            type: "text",
            label: "Unsorted Array (max 12 elements)",
            defaultValue: "64, 34, 25, 12, 22, 11, 90",
            width: "300px"
        }
    ],
    
    explanation: {
        description: "Selection Sort works by dividing the array into sorted and unsorted portions. It repeatedly finds the minimum element from the unsorted portion and swaps it with the first element of the unsorted portion.",
        steps: [
            "Find the minimum element in the entire array",
            "Swap it with the first element",
            "Find the minimum in the remaining (n-1) elements", 
            "Swap it with the second element",
            "Continue until the entire array is sorted"
        ]
    },
    
    complexityAnalysis: {
        time: {
            best: "O(n²)",
            average: "O(n²)", 
            worst: "O(n²)"
        },
        space: "O(1)",
        stability: false,
        inPlace: true
    },
    
    characteristics: [
        "In-place sorting algorithm",
        "Not stable (equal elements may be reordered)",
        "Makes minimum number of swaps (n-1 maximum)",
        "Good when write operations are expensive",
        "Simple implementation"
    ],
    
    customDemoFunction: `
        function runDemo() {
            const arrayInputStr = document.getElementById('unsorted-array').value;
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
            
            if (arrayInput.length > 12) {
                showError('Array size limited to 12 elements for demo purposes');
                return;
            }

            try {
                const startTime = performance.now();
                
                // Execute selection sort with steps (ascending order)
                const result = selectionSortWithSteps(arrayInput);
                
                const endTime = performance.now();
                const executionTime = (endTime - startTime).toFixed(4);
                
                // Show result
                let resultHTML = \`
                    <strong>Original Array:</strong> [\${arrayInput.join(', ')}]<br>
                    <strong>Sorted Array:</strong> [\${result.sortedArray.join(', ')}]<br>
                    <strong>Total Comparisons:</strong> \${result.metrics.comparisons}<br>
                    <strong>Total Swaps:</strong> \${result.metrics.swaps}<br>
                    <strong>Passes:</strong> \${result.metrics.passes}<br>
                    <strong>Execution Time:</strong> \${executionTime} ms
                \`;
                
                resultContainer.innerHTML = resultHTML;

                // Show visualization if steps are available
                if (result.steps && result.steps.length > 0) {
                    showSelectionSortVisualization(arrayInput, result.steps);
                    visualizationSection.style.display = 'block';
                }
                
            } catch (error) {
                showError(error.message);
            }
        }

        function showSelectionSortVisualization(originalArray, steps) {
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
                <h4>Selection Sort Visualization</h4>
                <button id="start-sort-animation" class="viz-button start">Start Animation</button>
                <button id="pause-sort-animation" class="viz-button pause" disabled>Pause</button>
                <button id="reset-sort-animation" class="viz-button reset">Reset</button>
                <div class="viz-legend" id="selectionsort-legend">
                    <span class="viz-legend-desktop">🔵 Unsorted | 🟡 Current Min | 🟠 Searching | 🟢 Sorted</span>
                    <div class="viz-legend-mobile" style="display: none;">
                        <div class="viz-legend-item">🔵 Unsorted</div>
                        <div class="viz-legend-item">🟡 Current Min</div>
                        <div class="viz-legend-item">🟠 Searching</div>
                        <div class="viz-legend-item">🟢 Sorted</div>
                    </div>
                </div>
            \`;
            arrayViz.appendChild(controlsDiv);
            
            // Toggle legend display based on screen size
            function updateLegendDisplay() {
                const isMobile = window.innerWidth <= 768;
                const desktopLegend = document.querySelector('#selectionsort-legend .viz-legend-desktop');
                const mobileLegend = document.querySelector('#selectionsort-legend .viz-legend-mobile');
                
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
            statusDiv.textContent = 'Ready to start selection sort animation...';
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
                
                // Highlight unsorted region (blue)
                if (step.sortedUpTo !== undefined) {
                    for (let i = step.sortedUpTo; i < step.array.length; i++) {
                        if (cells[i]) {
                            cells[i].className = 'viz-cell unsorted';
                        }
                    }
                }
                
                // Highlight sorted portion (green)
                if (step.sortedUpTo) {
                    for (let i = 0; i < step.sortedUpTo; i++) {
                        if (cells[i]) {
                            cells[i].className = 'viz-cell sorted';
                        }
                    }
                }
                
                // Highlight current elements being searched (orange)
                if (step.highlightIndices) {
                    step.highlightIndices.forEach(index => {
                        if (cells[index]) {
                            cells[index].className = 'viz-cell comparing';
                        }
                    });
                }
                
                // Special highlighting for current minimum element (yellow)
                if (step.minIndex !== undefined && cells[step.minIndex]) {
                    cells[step.minIndex].className = 'viz-cell current';
                }
                
                // Update status
                statusDiv.textContent = step.message;
                
                // Show step info in container
                const stepInfo = document.createElement('div');
                stepInfo.className = step.type === 'complete' ? 'viz-step-info complete' : 'viz-step-info';
                stepInfo.innerHTML = \`
                    <strong>Step \${currentStepIndex + 1}:</strong> \${step.message}
                \`;
                
                if (stepsContainer.children.length > 8) {
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
                }, 1200); // 1.2 second delay between steps
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
                updateVisualization(steps[0]);
                document.getElementById('sort-status').textContent = 'Ready to start selection sort animation...';
            }
            
            // Bind control events
            document.getElementById('start-sort-animation').addEventListener('click', startAnimation);
            document.getElementById('pause-sort-animation').addEventListener('click', pauseAnimation);
            document.getElementById('reset-sort-animation').addEventListener('click', resetAnimation);
            
            // Show initial state
            if (steps.length > 0) {
                updateVisualization(steps[0]);
            }
        }`
};

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} else if (typeof window !== 'undefined') {
    window.selectionSortConfig = config;
}