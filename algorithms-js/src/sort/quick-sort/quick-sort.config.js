/**
 * Configuration for QuickSort Algorithm Demo
 */

const config = {
    name: "Quick Sort",
    title: "Quick Sort Demo",
    category: "sort",
    problem: "Sort an array efficiently using the divide-and-conquer approach by partitioning around a pivot element.",
    algorithmFunction: "quickSortWithSteps",
    hasVisualization: true,
    
    // Multi-language source code paths  
    sourceCode: {
        javascript: "https://github.com/sachinlala/SimplifyLearning/blob/master/algorithms-js/src/sort/quick-sort/quick-sort.js",
        java: "https://github.com/sachinlala/SimplifyLearning/tree/master/algorithms-java/src/main/java/com/sl/algorithms/sort/generalpurpose/quicksort"
    },
    
    inputs: [
        {
            id: "unsorted-array",
            type: "text",
            label: "Unsorted Array (max 10 elements)",
            defaultValue: "64, 34, 25, 12, 22, 11, 90, 88, 76, 50",
            width: "320px"
        },
        {
            id: "pivot-strategy",
            type: "select", 
            label: "Pivot Selection Strategy",
            options: [
                { value: "median-of-three", text: "Median of Three (Recommended)" },
                { value: "first", text: "First Element" },
                { value: "last", text: "Last Element" },
                { value: "random", text: "Random Element" }
            ],
            defaultValue: "median-of-three",
            width: "200px"
        },
        {
            id: "implementation",
            type: "select",
            label: "Implementation Type",
            options: [
                { value: "recursive", text: "Recursive (Standard)" },
                { value: "iterative", text: "Iterative (Stack-based)" }
            ],
            defaultValue: "recursive",
            width: "180px"
        }
    ],
    
    explanation: {
        description: "Quick Sort is a highly efficient divide-and-conquer algorithm that works by selecting a 'pivot' element and partitioning the array around it. Elements smaller than the pivot go to the left, larger elements go to the right, then both sides are recursively sorted.",
        steps: [
            "Choose a pivot element from the array using a selection strategy",
            "Partition the array so all elements < pivot are on the left, all elements > pivot are on the right",
            "The pivot is now in its final sorted position",
            "Recursively apply the same process to the left and right sub-arrays",
            "Continue until all sub-arrays have been sorted"
        ]
    },
    
    complexityAnalysis: {
        time: {
            best: "O(n log n) - Good pivot selection",
            average: "O(n log n) - Random pivot", 
            worst: "O(n²) - Poor pivot selection (already sorted with first/last pivot)"
        },
        space: "O(log n) average recursion stack, O(n) worst case",
        stability: false,
        inPlace: true,
        adaptive: false
    },
    
    characteristics: [
        "Divide-and-conquer algorithm",
        "In-place sorting (O(log n) space for recursion)",
        "Not stable (relative order of equal elements may change)",
        "Cache-efficient due to good locality of reference",
        "Performance depends heavily on pivot selection",
        "Widely used in practice due to excellent average-case performance"
    ],
    
    pivotStrategies: [
        {
            name: "Median-of-Three",
            description: "Chooses the median of first, middle, and last elements. Best general-purpose strategy.",
            pros: ["Avoids worst-case on sorted arrays", "Good average performance", "Simple to implement"],
            cons: ["Still O(n²) worst case possible", "Slight overhead for median calculation"]
        },
        {
            name: "Random",
            description: "Selects a random element as pivot. Good theoretical guarantees.",
            pros: ["Expected O(n log n) performance", "Works well on any input pattern"],
            cons: ["Random number generation overhead", "No guarantee against worst case"]
        },
        {
            name: "First/Last",
            description: "Simple but can perform poorly on sorted or reverse-sorted arrays.",
            pros: ["No overhead", "Simple implementation"],
            cons: ["O(n²) on sorted arrays", "Poor performance on many real-world datasets"]
        }
    ],
    
    customDemoFunction: `
        function runDemo() {
            const arrayInputStr = document.getElementById('unsorted-array').value;
            const pivotStrategy = document.getElementById('pivot-strategy').value;
            const implementation = document.getElementById('implementation').value;
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
                
                // Execute quicksort based on implementation type
                let result;
                if (implementation === 'iterative') {
                    result = quickSortIterative(arrayInput);
                    result.variant = 'Iterative QuickSort';
                } else {
                    const options = { pivotStrategy };
                    result = quickSortWithSteps(arrayInput, options);
                    result.variant = 'Recursive QuickSort';
                }
                
                const endTime = performance.now();
                const executionTime = (endTime - startTime).toFixed(4);
                
                // Show result
                let resultHTML = \\`
                    <strong>Algorithm:</strong> \\${result.variant}<br>
                    <strong>Pivot Strategy:</strong> \\${pivotStrategy.replace('-', ' ').replace(/\\b\\w/g, l => l.toUpperCase())}<br>
                    <strong>Original Array:</strong> [\\${arrayInput.join(', ')}]<br>
                    <strong>Sorted Array:</strong> [\\${result.sortedArray.join(', ')}]<br>
                    <strong>Total Comparisons:</strong> \\${result.metrics.comparisons}<br>
                    <strong>Total Swaps:</strong> \\${result.metrics.swaps}<br>
                    <strong>Partitions Created:</strong> \\${result.metrics.partitions}<br>
                    \\${result.metrics.recursiveDepth ? \\`<strong>Max Recursion Depth:</strong> \\${result.metrics.recursiveDepth}<br>\\` : ''}
                    \\${result.metrics.stackSize ? \\`<strong>Max Stack Size:</strong> \\${result.metrics.stackSize}<br>\\` : ''}
                    <strong>Execution Time:</strong> \\${executionTime} ms
                \\`;
                
                resultContainer.innerHTML = resultHTML;

                // Show visualization if steps are available (recursive only)
                if (result.steps && result.steps.length > 0 && implementation === 'recursive') {
                    showQuickSortVisualization(arrayInput, result.steps, pivotStrategy);
                    visualizationSection.style.display = 'block';
                } else if (implementation === 'iterative') {
                    // For iterative quicksort, show summary without step-by-step animation
                    const summaryDiv = document.createElement('div');
                    summaryDiv.style.cssText = 'background: #f8f9fa; padding: 15px; border-radius: 4px; margin-top: 15px;';
                    summaryDiv.innerHTML = \\`
                        <strong>Iterative QuickSort Summary:</strong><br>
                        Uses an explicit stack instead of recursion to avoid stack overflow on large datasets.<br>
                        Maintains the same partitioning logic but manages sub-array ranges manually.<br>
                        <strong>Advantage:</strong> No recursion stack limit, suitable for very large arrays.
                    \\`;
                    resultContainer.appendChild(summaryDiv);
                }
                
            } catch (error) {
                showError(error.message);
            }
        }

        function showQuickSortVisualization(originalArray, steps, pivotStrategy) {
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
                cell.style.cssText = \\`
                    width: 50px; height: 50px; display: flex; align-items: center; justify-content: center;
                    border: 2px solid #ddd; background: #f8f9fa; font-weight: bold;
                    border-radius: 4px; margin: 2px; transition: all 0.7s ease;
                    font-size: 14px; position: relative;
                \\`;
                cell.setAttribute('data-index', index);
                cell.setAttribute('data-value', value);
                arrayDiv.appendChild(cell);
            });
            
            arrayViz.appendChild(arrayDiv);
            
            // Add controls
            const controlsDiv = document.createElement('div');
            controlsDiv.style.cssText = 'text-align: center; margin-bottom: 20px;';
            controlsDiv.innerHTML = \\`
                <div style="margin-bottom: 15px;"><strong>QuickSort Visualization (\\${pivotStrategy.replace('-', ' ')})</strong></div>
                <button id="start-sort-animation" style="padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 5px;">Start Animation</button>
                <button id="pause-sort-animation" style="padding: 8px 16px; background: #ffc107; color: black; border: none; border-radius: 4px; cursor: pointer; margin: 0 5px;" disabled>Pause</button>
                <button id="reset-sort-animation" style="padding: 8px 16px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 0 5px;">Reset</button>
                <div style="margin-top: 10px; font-size: 0.9em; color: #666;">
                    🔴 Pivot | 🟡 Comparing | 🔵 Left Partition | 🟢 Right Partition | ⚪ Current Range
                </div>
            \\`;
            arrayViz.appendChild(controlsDiv);
            
            // Status display
            const statusDiv = document.createElement('div');
            statusDiv.id = 'sort-status';
            statusDiv.style.cssText = 'text-align: center; margin-bottom: 20px; font-size: 1.1em; font-weight: bold; min-height: 25px;';
            statusDiv.textContent = 'Ready to start quicksort animation...';
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
                    cell.style.boxShadow = 'none';
                });
                
                // Update array values
                step.array.forEach((value, index) => {
                    if (cells[index]) {
                        cells[index].textContent = value;
                    }
                });
                
                // Highlight current range being processed
                if (step.range) {
                    for (let i = step.range[0]; i <= step.range[1]; i++) {
                        if (cells[i]) {
                            cells[i].style.background = '#e8f4fd';
                            cells[i].style.borderColor = '#81c4e8';
                        }
                    }
                }
                
                // Highlight pivot element
                if (step.pivotIndex !== undefined && cells[step.pivotIndex]) {
                    cells[step.pivotIndex].style.background = '#ffebee';
                    cells[step.pivotIndex].style.borderColor = '#f44336';
                    cells[step.pivotIndex].style.transform = 'scale(1.15)';
                    cells[step.pivotIndex].style.boxShadow = '0 0 10px rgba(244, 67, 54, 0.5)';
                    cells[step.pivotIndex].style.zIndex = '10';
                }
                
                // Highlight elements being compared
                if (step.compareIndices) {
                    step.compareIndices.forEach(index => {
                        if (cells[index] && index !== step.pivotIndex) {
                            cells[index].style.background = '#fff3e0';
                            cells[index].style.borderColor = '#ff9800';
                            cells[index].style.transform = 'scale(1.1)';
                        }
                    });
                }
                
                // Highlight swap operations
                if (step.swapIndices) {
                    step.swapIndices.forEach(index => {
                        if (cells[index]) {
                            cells[index].style.background = '#f3e5f5';
                            cells[index].style.borderColor = '#9c27b0';
                            cells[index].style.transform = 'scale(1.1)';
                            cells[index].style.boxShadow = '0 0 8px rgba(156, 39, 176, 0.4)';
                        }
                    });
                }
                
                // Show partitions after pivot placement
                if (step.type === 'pivot-final' && step.leftPartition && step.rightPartition) {
                    // Left partition (blue)
                    for (let i = step.leftPartition[0]; i <= step.leftPartition[1]; i++) {
                        if (cells[i]) {
                            cells[i].style.background = '#e3f2fd';
                            cells[i].style.borderColor = '#2196f3';
                        }
                    }
                    // Right partition (green)  
                    for (let i = step.rightPartition[0]; i <= step.rightPartition[1]; i++) {
                        if (cells[i]) {
                            cells[i].style.background = '#e8f5e8';
                            cells[i].style.borderColor = '#4caf50';
                        }
                    }
                }
                
                // Update status
                statusDiv.textContent = step.message;
                
                // Show step info in container
                const stepInfo = document.createElement('div');
                stepInfo.style.cssText = 'background: #f8f9fa; padding: 10px; margin: 5px 0; border-radius: 4px; font-size: 0.9em; border-left: 4px solid #007acc;';
                
                let stepTypeColor = '#007acc';
                if (step.type === 'complete') stepTypeColor = '#28a745';
                else if (step.type === 'pivot-final') stepTypeColor = '#f44336';
                else if (step.type === 'partition-start') stepTypeColor = '#ff9800';
                else if (step.type === 'swap') stepTypeColor = '#9c27b0';
                
                stepInfo.style.borderLeftColor = stepTypeColor;
                
                stepInfo.innerHTML = \\`
                    <strong>Step \\${currentStepIndex + 1}:</strong> \\${step.message}<br>
                    <small style="color: #666;">
                        Depth: \\${step.depth || 0} | 
                        Comparisons: \\${step.metrics?.comparisons || 0} | 
                        Swaps: \\${step.metrics?.swaps || 0}
                    </small>
                \\`;
                
                if (step.type === 'complete') {
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
                }, 2000); // 2 second delay between steps
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
                document.getElementById('sort-status').textContent = 'Ready to start quicksort animation...';
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
    window.quickSortConfig = config;
}