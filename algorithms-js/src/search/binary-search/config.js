/**
 * Configuration for Binary Search Algorithm Demo
 */

const config = {
    name: "Binary Search",
    title: "Binary Search Demo",
    category: "search",
    problem: "Given a sorted array, find the index of a target value in O(log n) time.",
    algorithmFunction: "binarySearchWithSteps",
    hasVisualization: true,
    
    inputs: [
        {
            id: "sorted-array",
            type: "text",
            label: "Sorted Array (comma-separated, max 15 elements)",
            defaultValue: "1, 3, 5, 7, 9, 10, 11, 12, 13, 15, 56, 99",
            width: "300px"
        },
        {
            id: "target-element",
            type: "text",
            label: "Target Element",
            defaultValue: "12",
            width: "80px"
        },
        {
            id: "search-method",
            type: "select",
            label: "Search Method",
            options: [
                { value: "iterative", text: "Iterative" },
                { value: "recursive", text: "Recursive" },
                { value: "withSteps", text: "With Visualization" }
            ],
            defaultValue: "withSteps",
            width: "150px"
        }
    ],
    
    explanation: {
        description: "Binary Search algorithm is an efficient way to find a target element in a sorted array. It operates by comparing the target value to the middle element of the array:",
        steps: [
            "If the target value equals the middle element, the search is complete.",
            "If the target value is less than the middle element, search the left half.",
            "If the target value is greater, search the right half."
        ]
    },
    
    customDemoFunction: `
        function runDemo() {
            const arrayInputStr = document.getElementById('sorted-array').value;
            const targetElementStr = document.getElementById('target-element').value.trim();
            const searchMethod = document.getElementById('search-method').value;
            const resultContainer = document.getElementById('result');
            const errorContainer = document.getElementById('error-message');
            const visualizationSection = document.getElementById('visualization-section');

            // Clear previous error and result
            errorContainer.innerHTML = '';
            errorContainer.style.display = 'none';
            resultContainer.innerHTML = '';
            visualizationSection.style.display = 'none';

            // Parse input array - support both numbers and strings
            let arrayInput;
            try {
                arrayInput = arrayInputStr.split(',').map(item => {
                    const trimmed = item.trim();
                    // Try to parse as number first, if it fails keep as string
                    const asNumber = Number(trimmed);
                    return isNaN(asNumber) ? trimmed : asNumber;
                });
            } catch (e) {
                showError('Invalid array format. Please use comma-separated values.');
                return;
            }

            // Parse target element
            let targetElement = targetElementStr;
            const targetAsNumber = Number(targetElementStr);
            if (!isNaN(targetAsNumber)) {
                targetElement = targetAsNumber;
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

            // Check if array is sorted
            const isSorted = arrayInput.every((val, i, arr) => 
                i === 0 || arr[i - 1] <= val
            );
            
            if (!isSorted) {
                showError('⚠️ Binary search requires a sorted array! Please sort your input array first.\\nExample: [1, 3, 5, 7, 9] ✓   vs   [1, 3, 7, 5, 9] ✗');
                return;
            }

            try {
                const startTime = performance.now();
                let result;
                
                // Execute based on selected method
                switch (searchMethod) {
                    case 'iterative':
                        const iterativeIndex = binarySearchIterative(arrayInput, targetElement);
                        result = {
                            index: iterativeIndex,
                            found: iterativeIndex !== -1,
                            method: 'Iterative',
                            steps: [] // No steps for iterative
                        };
                        break;
                    case 'recursive':
                        const recursiveIndex = binarySearchRecursive(arrayInput, targetElement);
                        result = {
                            index: recursiveIndex,
                            found: recursiveIndex !== -1,
                            method: 'Recursive',
                            steps: [] // No steps for recursive
                        };
                        break;
                    default: // 'withSteps'
                        const stepResult = binarySearchWithSteps(arrayInput, targetElement);
                        result = {
                            ...stepResult,
                            method: 'With Visualization'
                        };
                        break;
                }
                
                const endTime = performance.now();
                const executionTime = (endTime - startTime).toFixed(4);
                
                // Show result
                let resultHTML = '';
                if (result.found) {
                    resultHTML = \`
                        \u003cstrong\u003eElement found at index:\u003c/strong\u003e \${result.index}\u003cbr\u003e
                        \u003cstrong\u003eMethod:\u003c/strong\u003e \${result.method}\u003cbr\u003e
                        \u003cstrong\u003eExecution Time:\u003c/strong\u003e \${executionTime} ms\u003cbr\u003e
                    \`;
                    if (result.totalComparisons) {
                        resultHTML += \`\u003cstrong\u003eTotal Comparisons:\u003c/strong\u003e \${result.totalComparisons}\`;
                    }
                } else {
                    resultHTML = \`
                        \u003cstrong\u003eElement not found\u003c/strong\u003e\u003cbr\u003e
                        \u003cstrong\u003eMethod:\u003c/strong\u003e \${result.method}\u003cbr\u003e
                        \u003cstrong\u003eExecution Time:\u003c/strong\u003e \${executionTime} ms\u003cbr\u003e
                    \`;
                    if (result.totalComparisons) {
                        resultHTML += \`\u003cstrong\u003eTotal Comparisons:\u003c/strong\u003e \${result.totalComparisons}\`;
                    }
                }
                
                resultContainer.innerHTML = resultHTML;

                // Show visualization if steps are available
                if (result.steps && result.steps.length > 0) {
                    showAnimatedVisualization(arrayInput, targetElement, result.steps);
                    visualizationSection.style.display = 'block';
                }
                
            } catch (error) {
                showError(error.message);
            }
        }

        function showAnimatedVisualization(array, target, steps) {
            const arrayViz = document.getElementById('array-visualization');
            const stepsContainer = document.getElementById('steps-container');
            
            // Clear previous visualization
            arrayViz.innerHTML = '';
            stepsContainer.innerHTML = '';
            
            // Create array visualization
            const arrayDiv = document.createElement('div');
            arrayDiv.style.cssText = 'display: flex; gap: 3px; justify-content: center; margin-bottom: 20px; flex-wrap: wrap;';
            arrayDiv.id = 'search-array-display';
            
            array.forEach((value, index) => {
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
            
            // Add target info and controls
            const controlsDiv = document.createElement('div');
            controlsDiv.style.cssText = 'text-align: center; margin-bottom: 20px;';
            controlsDiv.innerHTML = \`
                \u003cdiv style="margin-bottom: 15px;"\u003e\u003cstrong\u003eTarget: \${target}\u003c/strong\u003e\u003c/div\u003e
                \u003cbutton id="start-search-animation" style="padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 5px;"\u003eStart Animation\u003c/button\u003e
                \u003cbutton id="pause-search-animation" style="padding: 8px 16px; background: #ffc107; color: black; border: none; border-radius: 4px; cursor: pointer; margin: 0 5px;" disabled\u003ePause\u003c/button\u003e
                \u003cbutton id="reset-search-animation" style="padding: 8px 16px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 5px;"\u003eReset\u003c/button\u003e
            \`;
            arrayViz.appendChild(controlsDiv);
            
            // Status display
            const statusDiv = document.createElement('div');
            statusDiv.id = 'search-status';
            statusDiv.style.cssText = 'text-align: center; margin-bottom: 20px; font-size: 1.1em; font-weight: bold; min-height: 25px;';
            statusDiv.textContent = 'Ready to start binary search animation...';
            arrayViz.appendChild(statusDiv);
            
            // Animation variables
            let currentStepIndex = 0;
            let animationRunning = false;
            let animationInterval;
            
            function updateSearchVisualization(step) {
                const cells = arrayDiv.querySelectorAll('div');
                const statusDiv = document.getElementById('search-status');
                
                // Reset all cell colors
                cells.forEach(cell => {
                    cell.style.background = '#f8f9fa';
                    cell.style.borderColor = '#ddd';
                    cell.style.transform = 'scale(1)';
                });
                
                // Highlight current search range
                for (let i = step.start; i <= step.end; i++) {
                    if (cells[i]) {
                        cells[i].style.background = '#e3f2fd';
                        cells[i].style.borderColor = '#2196f3';
                    }
                }
                
                // Highlight middle element
                if (cells[step.mid]) {
                    cells[step.mid].style.background = step.found ? '#c8e6c9' : '#fff3e0';
                    cells[step.mid].style.borderColor = step.found ? '#4caf50' : '#ff9800';
                    cells[step.mid].style.transform = 'scale(1.1)';
                }
                
                // Update status
                let statusText = \`Step \${step.step}: Checking middle element at index \${step.mid} (value: \${step.midValue})\`;
                if (step.found) {
                    statusText += ' - Target found! 🎉';
                } else {
                    statusText += \` - Target \${step.comparison === 'less' ? 'is smaller, search left' : 'is larger, search right'}\`;
                }
                statusDiv.textContent = statusText;
                
                // Show step info in container
                const stepInfo = document.createElement('div');
                stepInfo.style.cssText = 'background: #f8f9fa; padding: 10px; margin: 5px 0; border-radius: 4px; font-size: 0.9em; border-left: 4px solid #007acc;';
                stepInfo.innerHTML = \`
                    \u003cstrong\u003eStep \${step.step}:\u003c/strong\u003e Range [\${step.start}, \${step.end}], Mid: \${step.mid} (\${step.midValue})\u003cbr\u003e
                    \u003csmall\u003eComparison: \${target} \${step.comparison === 'equal' ? '==' : step.comparison === 'less' ? '\u003c' : '\u003e'} \${step.midValue}\u003c/small\u003e
                \`;
                
                if (step.found) {
                    stepInfo.style.borderLeftColor = '#28a745';
                    stepInfo.style.background = '#d4edda';
                }
                
                if (stepsContainer.children.length > 8) {
                    stepsContainer.removeChild(stepsContainer.firstChild);
                }
                stepsContainer.appendChild(stepInfo);
            }
            
            function startSearchAnimation() {
                if (animationRunning || currentStepIndex >= steps.length) return;
                
                animationRunning = true;
                document.getElementById('start-search-animation').disabled = true;
                document.getElementById('pause-search-animation').disabled = false;
                
                animationInterval = setInterval(() => {
                    if (currentStepIndex >= steps.length) {
                        clearInterval(animationInterval);
                        animationRunning = false;
                        document.getElementById('start-search-animation').disabled = false;
                        document.getElementById('pause-search-animation').disabled = true;
                        document.getElementById('search-status').textContent = 'Search complete!';
                        return;
                    }
                    
                    updateSearchVisualization(steps[currentStepIndex]);
                    currentStepIndex++;
                }, 1500); // 1.5 second delay between steps
            }
            
            function pauseSearchAnimation() {
                clearInterval(animationInterval);
                animationRunning = false;
                document.getElementById('start-search-animation').disabled = false;
                document.getElementById('pause-search-animation').disabled = true;
            }
            
            function resetSearchAnimation() {
                clearInterval(animationInterval);
                animationRunning = false;
                currentStepIndex = 0;
                document.getElementById('start-search-animation').disabled = false;
                document.getElementById('pause-search-animation').disabled = true;
                stepsContainer.innerHTML = '';
                
                // Reset visualization
                const cells = arrayDiv.querySelectorAll('div');
                cells.forEach(cell => {
                    cell.style.background = '#f8f9fa';
                    cell.style.borderColor = '#ddd';
                    cell.style.transform = 'scale(1)';
                });
                
                document.getElementById('search-status').textContent = 'Ready to start animation...';
            }
            
            // Bind control events
            document.getElementById('start-search-animation').addEventListener('click', startSearchAnimation);
            document.getElementById('pause-search-animation').addEventListener('click', pauseSearchAnimation);
            document.getElementById('reset-search-animation').addEventListener('click', resetSearchAnimation);
        }`
};

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} else if (typeof window !== 'undefined') {
    window.binarySearchConfig = config;
}
