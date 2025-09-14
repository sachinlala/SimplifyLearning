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
        java: "https://github.com/sachinlala/SimplifyLearning/tree/master/algorithms-java/src/main/java/com/sl/algorithms/sort/generalpurpose/smalldata/selectionsort"
    },
    
    inputs: [
        {
            id: "unsorted-array",
            type: "text",
            label: "Unsorted Array (max 12 elements)",
            defaultValue: "64, 34, 25, 12, 22, 11, 90",
            width: "300px"
        },
        {
            id: "sort-order",
            type: "select", 
            label: "Sort Order",
            options: [
                { value: "ascending", text: "Ascending" },
                { value: "descending", text: "Descending" }
            ],
            defaultValue: "ascending",
            width: "120px"
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
            const sortOrder = document.getElementById('sort-order').value;
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
                
                // Execute selection sort with steps
                const result = selectionSortWithSteps(arrayInput);
                
                // Handle descending order
                if (sortOrder === 'descending') {
                    result.sortedArray.reverse();
                    // Note: Steps would need to be recalculated for descending order
                }
                
                const endTime = performance.now();
                const executionTime = (endTime - startTime).toFixed(4);
                
                // Show result
                let resultHTML = \`
                    <strong>Original Array:</strong> [\${arrayInput.join(', ')}]<br>
                    <strong>Sorted Array (\${sortOrder}):</strong> [\${result.sortedArray.join(', ')}]<br>
                    <strong>Total Comparisons:</strong> \${result.metrics.comparisons}<br>
                    <strong>Total Swaps:</strong> \${result.metrics.swaps}<br>
                    <strong>Passes:</strong> \${result.metrics.passes}<br>
                    <strong>Execution Time:</strong> \${executionTime} ms
                \`;
                
                resultContainer.innerHTML = resultHTML;

                // Show visualization if steps are available
                if (result.steps && result.steps.length > 0 && sortOrder === 'ascending') {
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
            arrayDiv.style.cssText = 'display: flex; gap: 3px; justify-content: center; margin-bottom: 20px; flex-wrap: wrap;';
            arrayDiv.id = 'sort-array-display';
            
            originalArray.forEach((value, index) => {
                const cell = document.createElement('div');
                cell.textContent = value;
                cell.style.cssText = \`
                    width: 50px; height: 50px; display: flex; align-items: center; justify-content: center;
                    border: 2px solid #ddd; background: #f8f9fa; font-weight: bold;
                    border-radius: 4px; margin: 2px; transition: all 0.5s ease;
                    font-size: 14px;
                \`;
                cell.setAttribute('data-index', index);
                cell.setAttribute('data-value', value);
                arrayDiv.appendChild(cell);
            });
            
            arrayViz.appendChild(arrayDiv);
            
            // Add controls
            const controlsDiv = document.createElement('div');
            controlsDiv.style.cssText = 'text-align: center; margin-bottom: 20px;';
            controlsDiv.innerHTML = \`
                <div style="margin-bottom: 15px;"><strong>Selection Sort Visualization</strong></div>
                <button id="start-sort-animation" style="padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 5px;">Start Animation</button>
                <button id="pause-sort-animation" style="padding: 8px 16px; background: #ffc107; color: black; border: none; border-radius: 4px; cursor: pointer; margin: 0 5px;" disabled>Pause</button>
                <button id="reset-sort-animation" style="padding: 8px 16px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 5px;">Reset</button>
            \`;
            arrayViz.appendChild(controlsDiv);
            
            // Status display
            const statusDiv = document.createElement('div');
            statusDiv.id = 'sort-status';
            statusDiv.style.cssText = 'text-align: center; margin-bottom: 20px; font-size: 1.1em; font-weight: bold; min-height: 25px;';
            statusDiv.textContent = 'Ready to start selection sort animation...';
            arrayViz.appendChild(statusDiv);
            
            // Animation variables
            let currentStepIndex = 0;
            let animationRunning = false;
            let animationInterval;
            
            function updateVisualization(step) {
                const cells = arrayDiv.querySelectorAll('div');
                const statusDiv = document.getElementById('sort-status');
                
                // Reset all cell colors
                cells.forEach(cell => {
                    cell.style.background = '#f8f9fa';
                    cell.style.borderColor = '#ddd';
                    cell.style.transform = 'scale(1)';
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
                            cells[i].style.background = '#c8e6c9';
                            cells[i].style.borderColor = '#4caf50';
                        }
                    }
                }
                
                // Highlight current elements being compared/processed
                if (step.highlightIndices) {
                    step.highlightIndices.forEach(index => {
                        if (cells[index]) {
                            cells[index].style.background = '#fff3e0';
                            cells[index].style.borderColor = '#ff9800';
                            cells[index].style.transform = 'scale(1.1)';
                        }
                    });
                }
                
                // Special highlighting for minimum element
                if (step.minIndex !== undefined && cells[step.minIndex]) {
                    cells[step.minIndex].style.background = '#e1f5fe';
                    cells[step.minIndex].style.borderColor = '#2196f3';
                    cells[step.minIndex].style.transform = 'scale(1.1)';
                }
                
                // Update status
                statusDiv.textContent = step.message;
                
                // Show step info in container
                const stepInfo = document.createElement('div');
                stepInfo.style.cssText = 'background: #f8f9fa; padding: 10px; margin: 5px 0; border-radius: 4px; font-size: 0.9em; border-left: 4px solid #007acc;';
                stepInfo.innerHTML = \`
                    <strong>Step \${currentStepIndex + 1}:</strong> \${step.message}
                \`;
                
                if (step.type === 'complete') {
                    stepInfo.style.borderLeftColor = '#28a745';
                    stepInfo.style.background = '#d4edda';
                }
                
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