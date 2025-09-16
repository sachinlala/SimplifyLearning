/**
 * Configuration for Binary Search Algorithm Demo
 */

const config = {
    name: "Binary Search",
    title: "Binary Search Demo",
    category: "search",
    problem: "Given a sorted array, find the index of a target value in O(log n) time.",
    algorithmFunction: "binarySearchIterativeWithSteps",
    hasVisualization: true,
    
    // Multi-language source code paths  
    sourceCode: {
        javascript: "https://github.com/sachinlala/SimplifyLearning/blob/master/algorithms-js/src/search/binary-search/binary-search-core.js",
        java: "https://github.com/sachinlala/SimplifyLearning/tree/master/algorithms-java/src/main/java/com/sl/algorithms/search/binarysearch"
    },
    
    // Data type configuration for input toggle
    inputDataTypes: {
        default: "numeric",
        options: [
            {
                value: "numeric",
                label: "Numeric",
                sampleData: {
                    "sorted-array": "1, 3, 5, 7, 9, 10, 11, 12, 13, 15, 56, 99",
                    "target-element": "12"
                }
            },
            {
                value: "alphanumeric",
                label: "Alphanumeric",
                sampleData: {
                    "sorted-array": "apple, banana, cherry, grape, kiwi, lemon, mango, orange, peach",
                    "target-element": "orange"
                }
            }
        ]
    },
    
    inputs: [
        {
            id: "sorted-array",
            type: "text",
            label: "Sorted Array (max 15 elements)",
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
                { value: "recursive", text: "Recursive" }
            ],
            defaultValue: "iterative",
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
                
                // Execute based on selected method - always with visualization
                switch (searchMethod) {
                    case 'iterative':
                        const iterativeResult = binarySearchIterativeWithSteps(arrayInput, targetElement);
                        result = {
                            ...iterativeResult,
                            method: 'Iterative'
                        };
                        break;
                    case 'recursive':
                        const recursiveResult = binarySearchRecursiveWithSteps(arrayInput, targetElement);
                        result = {
                            ...recursiveResult,
                            method: 'Recursive'
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

                // Always show visualization
                if (result.steps && result.steps.length > 0) {
                    showAnimatedVisualization(arrayInput, targetElement, result.steps);
                }
                visualizationSection.style.display = 'block';
                
            } catch (error) {
                showError(error.message);
            }
        }

        // Binary search iterative implementation with steps for visualization
        function binarySearchIterativeWithSteps(sortedArray, target) {
            if (!Array.isArray(sortedArray) || sortedArray.length === 0) {
                throw new Error('Input must be a non-empty array');
            }

            const steps = [];
            let start = 0;
            let end = sortedArray.length - 1;
            let stepCount = 0;

            while (start <= end) {
                stepCount++;
                const mid = Math.floor((start + end) / 2);
                const midValue = sortedArray[mid];

                steps.push({
                    step: stepCount,
                    start,
                    end,
                    mid,
                    midValue,
                    target,
                    comparison: target === midValue ? 'equal' : target < midValue ? 'less' : 'greater',
                    found: target === midValue
                });

                if (midValue === target) {
                    return {
                        index: mid,
                        found: true,
                        steps,
                        totalComparisons: stepCount
                    };
                } else if (target < midValue) {
                    end = mid - 1;
                } else {
                    start = mid + 1;
                }
            }

            return {
                index: -1,
                found: false,
                steps,
                totalComparisons: stepCount
            };
        }

        // Binary search recursive implementation with steps for visualization
        function binarySearchRecursiveWithSteps(sortedArray, target) {
            if (!Array.isArray(sortedArray) || sortedArray.length === 0) {
                throw new Error('Input must be a non-empty array');
            }

            const steps = [];
            let stepCount = 0;

            function recursiveSearch(start, end) {
                if (start > end) {
                    return -1;
                }

                stepCount++;
                const mid = Math.floor((start + end) / 2);
                const midValue = sortedArray[mid];

                steps.push({
                    step: stepCount,
                    start,
                    end,
                    mid,
                    midValue,
                    target,
                    comparison: target === midValue ? 'equal' : target < midValue ? 'less' : 'greater',
                    found: target === midValue
                });

                if (midValue === target) {
                    return mid;
                } else if (target < midValue) {
                    return recursiveSearch(start, mid - 1);
                } else {
                    return recursiveSearch(mid + 1, end);
                }
            }

            const resultIndex = recursiveSearch(0, sortedArray.length - 1);

            return {
                index: resultIndex,
                found: resultIndex !== -1,
                steps,
                totalComparisons: stepCount
            };
        }

        function showAnimatedVisualization(array, target, steps) {
            const arrayViz = document.getElementById('array-visualization');
            const stepsContainer = document.getElementById('steps-container');
            
            // Clear previous visualization
            arrayViz.innerHTML = '';
            stepsContainer.innerHTML = '';
            
            // Create array visualization
            const arrayDiv = document.createElement('div');
            arrayDiv.className = 'array-visualization';
            arrayDiv.id = 'search-array-display';
            
            array.forEach((value, index) => {
                const cell = document.createElement('div');
                cell.textContent = value;
                cell.className = 'viz-cell';
                cell.setAttribute('data-index', index);
                cell.setAttribute('data-value', value);
                arrayDiv.appendChild(cell);
            });
            
            arrayViz.appendChild(arrayDiv);
            
            // Add target info and controls with legend
            const controlsDiv = document.createElement('div');
            controlsDiv.className = 'viz-controls';
            controlsDiv.innerHTML = \`
                \u003ch4\u003eBinary Search Visualization\u003c/h4\u003e
                \u003cdiv style="margin-bottom: 15px;"\u003e\u003cstrong\u003eTarget: \${target}\u003c/strong\u003e\u003c/div\u003e
                \u003cbutton id="start-search-animation" class="viz-button start"\u003eStart Animation\u003c/button\u003e
                \u003cbutton id="pause-search-animation" class="viz-button pause" disabled\u003ePause\u003c/button\u003e
                \u003cbutton id="reset-search-animation" class="viz-button reset"\u003eReset\u003c/button\u003e
                \u003cdiv class="viz-legend" id="binarysearch-legend"\u003e
                    \u003cspan class="viz-legend-desktop"\u003e🔵 Search Range | 🟡 Checking (Mid) | 🟢 Found | ⚫ Excluded\u003c/span\u003e
                    \u003cdiv class="viz-legend-mobile" style="display: none;"\u003e
                        \u003cdiv class="viz-legend-item"\u003e🔵 Search Range\u003c/div\u003e
                        \u003cdiv class="viz-legend-item"\u003e🟡 Checking (Mid)\u003c/div\u003e
                        \u003cdiv class="viz-legend-item"\u003e🟢 Found\u003c/div\u003e
                        \u003cdiv class="viz-legend-item"\u003e⚫ Excluded\u003c/div\u003e
                    \u003c/div\u003e
                \u003c/div\u003e
            \`;
            arrayViz.appendChild(controlsDiv);
            
            // Toggle legend display based on screen size
            function updateLegendDisplay() {
                const isMobile = window.innerWidth <= 768;
                const desktopLegend = document.querySelector('#binarysearch-legend .viz-legend-desktop');
                const mobileLegend = document.querySelector('#binarysearch-legend .viz-legend-mobile');
                
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
            statusDiv.id = 'search-status';
            statusDiv.className = 'viz-status';
            statusDiv.textContent = 'Ready to start binary search animation...';
            arrayViz.appendChild(statusDiv);
            
            // Animation variables
            let currentStepIndex = 0;
            let animationRunning = false;
            let animationInterval;
            
            function updateSearchVisualization(step) {
                const cells = arrayDiv.querySelectorAll('.viz-cell');
                const statusDiv = document.getElementById('search-status');
                
                // Reset all cell classes
                cells.forEach(cell => {
                    cell.className = 'viz-cell';
                });
                
                // Color excluded regions (outside current search range)
                for (let i = 0; i < array.length; i++) {
                    if (cells[i] && (i < step.start || i > step.end)) {
                        cells[i].className = 'viz-cell excluded';
                    }
                }
                
                // Highlight current search range
                for (let i = step.start; i <= step.end; i++) {
                    if (cells[i] && i !== step.mid) {
                        cells[i].className = 'viz-cell current-range';
                    }
                }
                
                // Highlight middle element being checked
                if (cells[step.mid]) {
                    if (step.found) {
                        cells[step.mid].className = 'viz-cell sorted'; // Found - green
                    } else {
                        cells[step.mid].className = 'viz-cell current'; // Checking - yellow
                    }
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
                stepInfo.className = step.found ? 'viz-step-info complete' : 'viz-step-info';
                stepInfo.innerHTML = \`
                    \u003cstrong\u003eStep \${step.step}:\u003c/strong\u003e Range [\${step.start}, \${step.end}], Mid: \${step.mid} (\${step.midValue})\u003cbr\u003e
                    \u003csmall\u003eComparison: \${target} \${step.comparison === 'equal' ? '==' : step.comparison === 'less' ? '\u003c' : '\u003e'} \${step.midValue}\u003c/small\u003e
                \`;
                
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
                const cells = arrayDiv.querySelectorAll('.viz-cell');
                cells.forEach(cell => {
                    cell.className = 'viz-cell';
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
