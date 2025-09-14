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
    
    // Multi-language source code paths  
    sourceCode: {
        javascript: "https://github.com/sachinlala/SimplifyLearning/blob/master/algorithms-js/src/sort/insertion-sort/insertion-sort.js",
        java: "https://github.com/sachinlala/SimplifyLearning/tree/master/algorithms-java/src/main/java/com/sl/algorithms/sort/generalpurpose/smalldata/insertionsort"
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
                { value: "standard", text: "Standard Insertion Sort" },
                { value: "binary", text: "Binary Insertion Sort" }
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
                    result = binaryInsertionSort(arrayInput);
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

                // Show visualization if steps are available (standard variant only)
                if (result.steps && result.steps.length > 0 && sortVariant === 'standard') {
                    showInsertionSortVisualization(arrayInput, result.steps);
                    visualizationSection.style.display = 'block';
                } else if (sortVariant === 'binary') {
                    // For binary insertion sort, show summary without step-by-step animation
                    const summaryDiv = document.createElement('div');
                    summaryDiv.style.cssText = 'background: #f8f9fa; padding: 15px; border-radius: 4px; margin-top: 15px;';
                    summaryDiv.innerHTML = \`
                        <strong>Binary Insertion Sort Summary:</strong><br>
                        Uses binary search to find insertion position, reducing comparisons from O(n) to O(log n) per element.<br>
                        However, shifting elements still requires O(n) time, so overall complexity remains O(n²).
                    \`;
                    resultContainer.appendChild(summaryDiv);
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
            arrayDiv.style.cssText = 'display: flex; gap: 3px; justify-content: center; margin-bottom: 20px; flex-wrap: wrap;';
            arrayDiv.id = 'sort-array-display';
            
            originalArray.forEach((value, index) => {
                const cell = document.createElement('div');
                cell.textContent = value;
                cell.style.cssText = \`
                    width: 50px; height: 50px; display: flex; align-items: center; justify-content: center;
                    border: 2px solid #ddd; background: #f8f9fa; font-weight: bold;
                    border-radius: 4px; margin: 2px; transition: all 0.6s ease;
                    font-size: 14px; position: relative;
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
                <div style="margin-bottom: 15px;"><strong>Insertion Sort Visualization</strong></div>
                <button id="start-sort-animation" style="padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 5px;">Start Animation</button>
                <button id="pause-sort-animation" style="padding: 8px 16px; background: #ffc107; color: black; border: none; border-radius: 4px; cursor: pointer; margin: 0 5px;" disabled>Pause</button>
                <button id="reset-sort-animation" style="padding: 8px 16px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 5px;">Reset</button>
                <div style="margin-top: 10px; font-size: 0.9em; color: #666;">
                    Green: Sorted portion | Orange: Current element | Blue: Comparing/Inserting
                </div>
            \`;
            arrayViz.appendChild(controlsDiv);
            
            // Status display
            const statusDiv = document.createElement('div');
            statusDiv.id = 'sort-status';
            statusDiv.style.cssText = 'text-align: center; margin-bottom: 20px; font-size: 1.1em; font-weight: bold; min-height: 25px;';
            statusDiv.textContent = 'Ready to start insertion sort animation...';
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
                    cell.style.zIndex = '1';
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
                
                // Highlight current element being processed (orange)
                if (step.currentIndex !== undefined && cells[step.currentIndex]) {
                    cells[step.currentIndex].style.background = '#fff3e0';
                    cells[step.currentIndex].style.borderColor = '#ff9800';
                    cells[step.currentIndex].style.transform = 'scale(1.1)';
                    cells[step.currentIndex].style.zIndex = '10';
                }
                
                // Highlight elements being compared (blue)
                if (step.highlightIndices) {
                    step.highlightIndices.forEach(index => {
                        if (cells[index] && index !== step.currentIndex) {
                            cells[index].style.background = '#e3f2fd';
                            cells[index].style.borderColor = '#2196f3';
                            cells[index].style.transform = 'scale(1.05)';
                        }
                    });
                }
                
                // Special highlighting for key element during insertion
                if (step.key !== undefined && step.type === 'insert' && step.insertPosition !== undefined) {
                    if (cells[step.insertPosition]) {
                        cells[step.insertPosition].style.background = '#e8f5e8';
                        cells[step.insertPosition].style.borderColor = '#4caf50';
                        cells[step.insertPosition].style.transform = 'scale(1.15)';
                        cells[step.insertPosition].style.boxShadow = '0 0 10px rgba(76, 175, 80, 0.5)';
                    }
                }
                
                // Update status
                statusDiv.textContent = step.message;
                
                // Show step info in container
                const stepInfo = document.createElement('div');
                stepInfo.style.cssText = 'background: #f8f9fa; padding: 10px; margin: 5px 0; border-radius: 4px; font-size: 0.9em; border-left: 4px solid #007acc;';
                
                let stepTypeColor = '#007acc';
                if (step.type === 'complete') stepTypeColor = '#28a745';
                else if (step.type === 'insert') stepTypeColor = '#4caf50';
                else if (step.type === 'shift') stepTypeColor = '#ff9800';
                
                stepInfo.style.borderLeftColor = stepTypeColor;
                
                stepInfo.innerHTML = \`
                    <strong>Step \${currentStepIndex + 1}:</strong> \${step.message}<br>
                    <small style="color: #666;">Comparisons: \${step.comparisons || 0}, Shifts: \${step.shifts || 0}</small>
                \`;
                
                if (step.type === 'complete') {
                    stepInfo.style.background = '#d4edda';
                }
                
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
                }, 1500); // 1.5 second delay between steps
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
        }`
};

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} else if (typeof window !== 'undefined') {
    window.insertionSortConfig = config;
}