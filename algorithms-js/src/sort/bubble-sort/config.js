/**
 * Configuration for Bubble Sort Algorithm Demo
 */

const config = {
    name: "Bubble Sort",
    category: ["sort", "beginner"],
    problem: "Sort an array of elements by repeatedly comparing adjacent elements and swapping them if they are in the wrong order.",
    cssPath: "../../../assets/css/styles.css",
    jsPath: "bubble-sort.js",
    githubPath: "https://github.com/sachinlala/SimplifyLearning/blob/main/algorithms-js/src/sort/bubble-sort/bubble-sort.js",
    
    // Multi-language source code paths
    sourceCode: {
        javascript: "https://github.com/sachinlala/SimplifyLearning/blob/main/algorithms-js/src/sort/bubble-sort/bubble-sort.js",
        java: "https://github.com/sachinlala/SimplifyLearning/blob/main/algorithms-java/src/main/java/com/algorithms/sort/BubbleSort.java",
        python: "", // Coming soon
        go: "" // Coming soon
    },
    algorithmFunction: "bubbleSort",
    hasVisualization: true,
    
    // Data type configuration for input toggle
    inputDataTypes: {
        default: "numeric",
        options: [
            {
                value: "numeric",
                label: "Numeric",
                sampleData: {
                    "array-input": "64, 34, 25, 12, 22, 11, 90"
                }
            },
            {
                value: "alphanumeric",
                label: "Alphanumeric",
                sampleData: {
                    "array-input": "zebra, apple, banana, cherry, dog, elephant, cat"
                }
            }
        ]
    },
    
    inputs: [
        {
            id: "array-input",
            type: "text",
            label: "Array (numbers or strings)",
            defaultValue: "64, 34, 25, 12, 22, 11, 90",
            width: "300px"
        },
        {
            id: "animation-speed",
            type: "range",
            label: "Animation Speed",
            min: 1,
            max: 100,
            defaultValue: 50,
            width: "120px"
        }
    ],
    
    explanation: {
        description: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order:",
        steps: [
            "Compare adjacent elements in the array",
            "If they are in the wrong order, swap them",
            "Continue through the array until no more swaps are needed",
            "Each pass through the array 'bubbles' the largest element to its correct position"
        ]
    },
    
    customDemoFunction: `  
        function runDemo() {
            const arrayInputStr = document.getElementById('array-input').value;
            const animationSpeed = parseInt(document.getElementById('animation-speed').value);
            const resultContainer = document.getElementById('result');
            const errorContainer = document.getElementById('error-message');
            const visualizationSection = document.getElementById('visualization-section');

            // Clear previous error
            errorContainer.innerHTML = '';
            errorContainer.style.display = 'none';

            // Parse input - support both numbers and strings
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

            // Validate input
            if (arrayInput.length === 0) {
                showError('Array cannot be empty');
                return;
            }

            if (arrayInput.length < 2) {
                showError('Array must contain at least 2 elements');
                return;
            }
            
            if (arrayInput.length > 20) {
                showError('Array size limited to 20 elements for demo purposes');
                return;
            }

            try {
                // Create a copy for sorting
                const arrayToSort = [...arrayInput];
                const sortedArray = bubbleSort(arrayToSort);
                
                resultContainer.innerHTML = \`
                    <strong>Original Array:</strong> [\${arrayInput.join(', ')}]<br>
                    <strong>Sorted Array:</strong> [\${sortedArray.join(', ')}]<br>
                    <strong>Algorithm:</strong> Bubble Sort
                \`;

                // Show visualization
                visualizationSection.style.display = 'block';
                visualizeSorting(arrayInput, animationSpeed);
                
            } catch (error) {
                showError(error.message);
            }
        }

        function visualizeSorting(array, speed) {
            const stepsContainer = document.getElementById('steps-container');
            const arrayViz = document.getElementById('array-visualization');
            
            // Clear previous visualization
            stepsContainer.innerHTML = '';
            arrayViz.innerHTML = '';
            
            // Create bubble sort instance for step tracking
            const bubbleSort = new BubbleSort();
            const steps = [];
            
            // Run bubble sort with step tracking
            bubbleSort.sort([...array], true);
            const sortingSteps = bubbleSort.getSteps();
            
            // Create array visualization
            const arrayDiv = document.createElement('div');
            arrayDiv.style.cssText = 'display: flex; gap: 5px; justify-content: center; margin-bottom: 20px; flex-wrap: wrap;';
            arrayDiv.id = 'array-display';
            
            // Calculate proportional heights
            const maxValue = getMax(array);
            const minValue = getMin(array);
            const maxBarHeight = 200;
            const minBarHeight = 40;
            
            array.forEach((value, index) => {
                const bar = document.createElement('div');
                bar.textContent = value;
                
                // Calculate proportional height using utility function
                const barHeight = calculateBarHeight(value, minValue, maxValue, minBarHeight, maxBarHeight);
                
                // Generate bar style using utility function
                bar.style.cssText = generateBarStyle(barHeight, '#007acc', 50);
                bar.setAttribute('data-index', index);
                bar.setAttribute('data-value', value);
                arrayDiv.appendChild(bar);
            });
            
            arrayViz.appendChild(arrayDiv);
            
            // Add status display
            const statusDiv = document.createElement('div');
            statusDiv.id = 'sort-status';
            statusDiv.style.cssText = 'text-align: center; margin-bottom: 20px; font-size: 1.1em; font-weight: bold;';
            statusDiv.textContent = 'Starting bubble sort visualization...';
            arrayViz.appendChild(statusDiv);
            
            // Add controls
            const controlsDiv = document.createElement('div');
            controlsDiv.style.cssText = 'text-align: center; margin-bottom: 20px;';
            controlsDiv.innerHTML = \`
                <button id="start-animation" style="padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 5px;">Start Animation</button>
                <button id="pause-animation" style="padding: 8px 16px; background: #ffc107; color: black; border: none; border-radius: 4px; cursor: pointer; margin: 0 5px;" disabled>Pause</button>
                <button id="reset-animation" style="padding: 8px 16px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 5px;">Reset</button>
            \`;
            arrayViz.appendChild(controlsDiv);
            
            // Animation variables
            let currentStepIndex = 0;
            let animationRunning = false;
            let animationInterval;
            
            // Calculate delay based on speed (1-100 scale, inverted)
            const getDelay = () => getMaxValue(100, 2000 - (speed * 18));
            
            function updateVisualization(step) {
                const bars = arrayDiv.querySelectorAll('div');
                const statusDiv = document.getElementById('sort-status');
                
                // Reset all bar colors
                bars.forEach(bar => {
                    bar.style.background = '#007acc';
                    bar.style.transform = 'scale(1)';
                });
                
                // Update based on step type
                if (step.compareIndices) {
                    step.compareIndices.forEach(index => {
                        if (bars[index]) {
                            bars[index].style.background = '#ffc107';
                            bars[index].style.transform = 'scale(1.1)';
                        }
                    });
                }
                
                if (step.swapIndices) {
                    step.swapIndices.forEach(index => {
                        if (bars[index]) {
                            bars[index].style.background = '#dc3545';
                            bars[index].style.transform = 'scale(1.2)';
                        }
                    });
                }
                
                // Update the array visualization with current state
                if (step.array) {
                    // Recalculate proportional heights for current array state
                    const currentMaxValue = getMax(step.array);
                    const currentMinValue = getMin(step.array);
                    const maxBarHeight = 200;
                    const minBarHeight = 40;
                    
                    step.array.forEach((value, index) => {
                        if (bars[index]) {
                            bars[index].textContent = value;
                            bars[index].setAttribute('data-value', value);
                            
                            // Calculate and update proportional height using utility function
                            const barHeight = calculateBarHeight(value, currentMinValue, currentMaxValue, minBarHeight, maxBarHeight);
                            bars[index].style.height = parseInt(barHeight) + 'px';
                        }
                    });
                }
                
                // Update status
                if (statusDiv) {
                    statusDiv.textContent = step.message || 'Processing...';
                }
                
                // Show step info
                const stepInfo = document.createElement('div');
                stepInfo.style.cssText = 'background: #f8f9fa; padding: 10px; margin: 5px 0; border-radius: 4px; font-size: 0.9em;';
                stepInfo.innerHTML = \`
                    <strong>Step \${currentStepIndex + 1}:</strong> \${step.message}<br>
                    <small>Comparisons: \${step.comparisons || 0}, Swaps: \${step.swaps || 0}</small>
                \`;
                
                if (stepsContainer.children.length > 10) {
                    stepsContainer.removeChild(stepsContainer.firstChild);
                }
                stepsContainer.appendChild(stepInfo);
            }
            
            function startAnimation() {
                if (animationRunning) return;
                
                animationRunning = true;
                document.getElementById('start-animation').disabled = true;
                document.getElementById('pause-animation').disabled = false;
                
                animationInterval = setInterval(() => {
                    if (currentStepIndex >= sortingSteps.length) {
                        clearInterval(animationInterval);
                        animationRunning = false;
                        document.getElementById('start-animation').disabled = false;
                        document.getElementById('pause-animation').disabled = true;
                        document.getElementById('sort-status').textContent = 'Sorting complete!';
                        return;
                    }
                    
                    updateVisualization(sortingSteps[currentStepIndex]);
                    currentStepIndex++;
                }, getDelay());
            }
            
            function pauseAnimation() {
                clearInterval(animationInterval);
                animationRunning = false;
                document.getElementById('start-animation').disabled = false;
                document.getElementById('pause-animation').disabled = true;
            }
            
            function resetAnimation() {
                clearInterval(animationInterval);
                animationRunning = false;
                currentStepIndex = 0;
                document.getElementById('start-animation').disabled = false;
                document.getElementById('pause-animation').disabled = true;
                stepsContainer.innerHTML = '';
                
                // Reset visualization to original state
                const bars = arrayDiv.querySelectorAll('div');
                
                // Recalculate proportional heights for original array
                const originalMaxValue = getMax(array);
                const originalMinValue = getMin(array);
                const maxBarHeight = 200;
                const minBarHeight = 40;
                
                array.forEach((value, index) => {
                    if (bars[index]) {
                        bars[index].textContent = value;
                        bars[index].style.background = '#007acc';
                        bars[index].style.transform = 'scale(1)';
                        bars[index].setAttribute('data-value', value);
                        
                        // Calculate and restore original proportional height using utility function
                        const barHeight = calculateBarHeight(value, originalMinValue, originalMaxValue, minBarHeight, maxBarHeight);
                        bars[index].style.height = roundNumber(barHeight) + 'px';
                    }
                });
                
                document.getElementById('sort-status').textContent = 'Ready to start animation...';
            }
            
            // Bind control events
            document.getElementById('start-animation').addEventListener('click', startAnimation);
            document.getElementById('pause-animation').addEventListener('click', pauseAnimation);
            document.getElementById('reset-animation').addEventListener('click', resetAnimation);
        }
    `
};

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} else if (typeof window !== 'undefined') {
    window.bubbleSortConfig = config;
}
