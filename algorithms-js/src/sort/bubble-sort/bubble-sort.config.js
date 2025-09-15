/**
 * Configuration for Bubble Sort Algorithm Demo
 */

const config = {
    name: "Bubble Sort",
    category: ["sort", "beginner"],
    problem: "Sort an array of elements by repeatedly comparing adjacent elements and swapping them if they are in the wrong order.",
    cssPath: "../../../assets/css/styles.css",
    jsPath: "bubble-sort.js",
    githubPath: "https://github.com/sachinlala/SimplifyLearning/blob/master/algorithms-js/src/sort/bubble-sort/bubble-sort.js",
    
    // Multi-language source code paths
    sourceCode: {
        javascript: "https://github.com/sachinlala/SimplifyLearning/blob/master/algorithms-js/src/sort/bubble-sort/bubble-sort-core.js",
        java: "https://github.com/sachinlala/SimplifyLearning/blob/master/algorithms-java/src/main/java/com/sl/algorithms/sort/generalpurpose/smalldata/BubbleSort.java",
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
        // Simple bubble sort function for result display
        function bubbleSort(arr) {
            const sortedArray = [...arr];
            const n = sortedArray.length;
            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - i - 1; j++) {
                    if (sortedArray[j] > sortedArray[j + 1]) {
                        [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
                    }
                }
            }
            return sortedArray;
        }
        
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
            const maxValue = Math.max(...array.map(v => typeof v === 'number' ? v : v.toString().length));
            const minValue = Math.min(...array.map(v => typeof v === 'number' ? v : v.toString().length));
            const maxBarHeight = 200;
            const minBarHeight = 40;
            
            array.forEach((value, index) => {
                const bar = document.createElement('div');
                bar.textContent = value;
                
                // Calculate proportional height directly
                const numericValue = typeof value === 'number' ? value : value.toString().length;
                const normalizedValue = maxValue === minValue ? 0.5 : 
                    (numericValue - minValue) / (maxValue - minValue);
                const barHeight = minBarHeight + (normalizedValue * (maxBarHeight - minBarHeight));
                
                // Create bar with direct styling to ensure colors work
                bar.style.cssText = \`
                    width: 50px;
                    height: \${Math.round(barHeight)}px;
                    background: rgba(33, 150, 243, 0.8);
                    border: 3px solid #1976d2;
                    border-radius: 6px;
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                    color: #fff;
                    font-weight: bold;
                    font-size: 12px;
                    margin: 2px;
                    padding: 2px;
                    transition: all 0.4s ease;
                    position: relative;
                    box-sizing: border-box;
                    box-shadow: 0 2px 4px rgba(33, 150, 243, 0.3);
                \`;
                bar.setAttribute('data-index', index);
                bar.setAttribute('data-value', value);
                arrayDiv.appendChild(bar);
            });
            
            arrayViz.appendChild(arrayDiv);
            
            // Add status display
            const statusDiv = document.createElement('div');
            statusDiv.id = 'sort-status';
            statusDiv.className = 'viz-status';
            statusDiv.textContent = 'Ready to start bubble sort visualization...';
            arrayViz.appendChild(statusDiv);
            
            // Add controls with legend
            const controlsDiv = document.createElement('div');
            controlsDiv.className = 'viz-controls';
            controlsDiv.innerHTML = \`
                <h4>Bubble Sort Visualization</h4>
                <button id="start-animation" class="viz-button start">Start Animation</button>
                <button id="pause-animation" class="viz-button pause" disabled>Pause</button>
                <button id="reset-animation" class="viz-button reset">Reset</button>
                <div class="viz-legend" id="bubblesort-legend">
                    <span class="viz-legend-desktop">🔵 Unsorted | 🟡 Comparing | 🟢 Swapping | ✅ Complete</span>
                    <div class="viz-legend-mobile" style="display: none;">
                        <div class="viz-legend-item">🔵 Unsorted</div>
                        <div class="viz-legend-item">🟡 Comparing</div>
                        <div class="viz-legend-item">🟢 Swapping</div>
                        <div class="viz-legend-item">✅ Complete</div>
                    </div>
                </div>
            \`;
            arrayViz.appendChild(controlsDiv);
            
            // Toggle legend display based on screen size
            function updateLegendDisplay() {
                const isMobile = window.innerWidth <= 768;
                const desktopLegend = document.querySelector('#bubblesort-legend .viz-legend-desktop');
                const mobileLegend = document.querySelector('#bubblesort-legend .viz-legend-mobile');
                
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
            
            // Animation variables
            let currentStepIndex = 0;
            let animationRunning = false;
            let animationInterval;
            
            // Calculate delay based on speed (1-100 scale, inverted)
            const getDelay = () => Math.max(100, 2000 - (speed * 18));
            
            function updateVisualization(step) {
                const bars = arrayDiv.querySelectorAll('div');
                const statusDiv = document.getElementById('sort-status');
                
                // Reset all bar colors - default to unsorted (blue) - more visible
                bars.forEach(bar => {
                    bar.style.background = 'rgba(33, 150, 243, 0.8)';
                    bar.style.borderColor = '#1976d2';
                    bar.style.border = '3px solid';
                    bar.style.borderRadius = '6px';
                    bar.style.transform = 'scale(1)';
                    bar.style.transition = 'all 0.4s ease';
                    bar.style.boxShadow = '0 2px 4px rgba(33, 150, 243, 0.3)';
                });
                
                // Mark sorted elements (from the end) - more visible green
                const totalSteps = Math.max(0, array.length - 1);
                const currentPass = Math.floor(currentStepIndex / array.length) || 0;
                const sortedCount = Math.min(currentPass, array.length);
                
                for (let i = array.length - sortedCount; i < array.length; i++) {
                    if (bars[i]) {
                        bars[i].style.background = 'rgba(76, 175, 80, 0.7)';
                        bars[i].style.borderColor = '#388e3c';
                        bars[i].style.border = '3px solid';
                        bars[i].style.boxShadow = '0 2px 6px rgba(76, 175, 80, 0.4)';
                    }
                }
                
                // Update based on step type - more visible colors
                if (step.compareIndices) {
                    step.compareIndices.forEach(index => {
                        if (bars[index]) {
                            bars[index].style.background = '#ffc107';
                            bars[index].style.borderColor = '#f57c00';
                            bars[index].style.border = '3px solid';
                            bars[index].style.transform = 'scale(1.1)';
                            bars[index].style.boxShadow = '0 4px 12px rgba(255, 193, 7, 0.6)';
                            bars[index].style.color = '#000';
                        }
                    });
                }
                
                if (step.swapIndices) {
                    step.swapIndices.forEach(index => {
                        if (bars[index]) {
                            bars[index].style.background = '#4caf50';
                            bars[index].style.borderColor = '#2e7d32';
                            bars[index].style.border = '3px solid';
                            bars[index].style.transform = 'scale(1.15)';
                            bars[index].style.boxShadow = '0 6px 16px rgba(76, 175, 80, 0.7)';
                            bars[index].style.color = '#fff';
                        }
                    });
                }
                
                // Update the array visualization with current state
                if (step.array) {
                    // Recalculate proportional heights for current array state
                    const currentMaxValue = Math.max(...step.array.map(v => typeof v === 'number' ? v : v.toString().length));
                    const currentMinValue = Math.min(...step.array.map(v => typeof v === 'number' ? v : v.toString().length));
                    const maxBarHeight = 200;
                    const minBarHeight = 40;
                    
                    step.array.forEach((value, index) => {
                        if (bars[index]) {
                            bars[index].textContent = value;
                            bars[index].setAttribute('data-value', value);
                            
                            // Calculate proportional height directly
                            const numericValue = typeof value === 'number' ? value : value.toString().length;
                            const normalizedValue = currentMaxValue === currentMinValue ? 0.5 : 
                                (numericValue - currentMinValue) / (currentMaxValue - currentMinValue);
                            const barHeight = minBarHeight + (normalizedValue * (maxBarHeight - minBarHeight));
                            bars[index].style.height = Math.round(barHeight) + 'px';
                        }
                    });
                }
                
                // Update status
                if (statusDiv) {
                    statusDiv.textContent = step.message || 'Processing...';
                }
                
                // Show step info
                const stepInfo = document.createElement('div');
                stepInfo.className = 'viz-step-info';
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
                const originalMaxValue = Math.max(...array.map(v => typeof v === 'number' ? v : v.toString().length));
                const originalMinValue = Math.min(...array.map(v => typeof v === 'number' ? v : v.toString().length));
                const maxBarHeight = 200;
                const minBarHeight = 40;
                
                array.forEach((value, index) => {
                    if (bars[index]) {
                        bars[index].textContent = value;
                        
                        // Calculate proportional height directly
                        const numericValue = typeof value === 'number' ? value : value.toString().length;
                        const normalizedValue = originalMaxValue === originalMinValue ? 0.5 : 
                            (numericValue - originalMinValue) / (originalMaxValue - originalMinValue);
                        const barHeight = minBarHeight + (normalizedValue * (maxBarHeight - minBarHeight));
                        
                        // Apply complete styling
                        bars[index].style.cssText = \`
                            width: 50px;
                            height: \${Math.round(barHeight)}px;
                            background: rgba(33, 150, 243, 0.8);
                            border: 3px solid #1976d2;
                            border-radius: 6px;
                            display: flex;
                            align-items: flex-end;
                            justify-content: center;
                            color: #fff;
                            font-weight: bold;
                            font-size: 12px;
                            margin: 2px;
                            padding: 2px;
                            transition: all 0.4s ease;
                            position: relative;
                            box-sizing: border-box;
                            transform: scale(1);
                            box-shadow: 0 2px 4px rgba(33, 150, 243, 0.3);
                        \`;
                        bars[index].setAttribute('data-value', value);
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
