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
        javascript: "https://github.com/sachinlala/SimplifyLearning/blob/master/algorithms-js/src/sort/quick-sort/quick-sort-core.js",
        java: "https://github.com/sachinlala/SimplifyLearning/blob/master/algorithms-java/src/main/java/com/sl/algorithms/sort/generalpurpose/QuickSort.java"
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
        }
    ],
    
    explanation: {
        description: "Quick Sort is a highly efficient divide-and-conquer algorithm that works by selecting a 'pivot' element and partitioning the array around it. Elements smaller than the pivot go to the left, larger elements go to the right, then both sides are recursively sorted. This demo supports both recursive and iterative implementations.",
        steps: [
            "Choose a pivot element from the array using a selection strategy",
            "Partition the array so all elements < pivot are on the left, all elements > pivot are on the right",
            "The pivot is now in its final sorted position",
            "Recursively apply the same process to the left and right sub-arrays",
            "Continue until all sub-arrays have been sorted"
        ],
        implementations: {
            recursive: {
                description: "Standard recursive implementation using the call stack",
                details: "Uses function recursion to sort sub-arrays. Clean and intuitive but limited by stack size.",
                advantages: ["Simple to understand", "Clean code structure", "Automatic stack management"],
                disadvantages: ["Stack overflow risk on large datasets", "Function call overhead"]
            },
            iterative: {
                description: "Stack-based implementation that avoids recursion", 
                details: "Uses an explicit stack instead of recursion to avoid stack overflow on large datasets. Maintains the same partitioning logic but manages sub-array ranges manually.",
                advantages: ["No recursion stack limit", "Suitable for very large arrays", "Explicit memory control"],
                disadvantages: ["More complex implementation", "Manual stack management required"]
            }
        }
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
                
                // Execute recursive quicksort with steps for visualization
                const options = { pivotStrategy };
                const result = quickSortWithSteps(arrayInput, options);
                
                const endTime = performance.now();
                const executionTime = (endTime - startTime).toFixed(4);
                
                // Show result
                let resultHTML = \`
                    <strong>Pivot Strategy:</strong> \${pivotStrategy.replace('-', ' ').replace(/\\b\\w/g, l => l.toUpperCase())}<br>
                    <strong>Original Array:</strong> [\${arrayInput.join(', ')}]<br>
                    <strong>Sorted Array:</strong> [\${result.sortedArray.join(', ')}]<br>
                    <strong>Total Comparisons:</strong> \${result.metrics.comparisons}<br>
                    <strong>Total Swaps:</strong> \${result.metrics.swaps}<br>
                    <strong>Partitions Created:</strong> \${result.metrics.partitions}<br>
                    <strong>Max Recursion Depth:</strong> \${result.metrics.recursiveDepth}<br>
                    <strong>Execution Time:</strong> \${executionTime} ms
                \`;
                
                resultContainer.innerHTML = resultHTML;

                // Show visualization if steps are available
                if (result.steps && result.steps.length > 0) {
                    showQuickSortVisualization(arrayInput, result.steps, pivotStrategy);
                    visualizationSection.style.display = 'block';
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
            
            // Add controls
            const controlsDiv = document.createElement('div');
            controlsDiv.className = 'viz-controls';
            controlsDiv.innerHTML = \`
                <h4>QuickSort Visualization (\${pivotStrategy.replace('-', ' ')})</h4>
                <button id="start-sort-animation" class="viz-button start">Start Animation</button>
                <button id="pause-sort-animation" class="viz-button pause" disabled>Pause</button>
                <button id="reset-sort-animation" class="viz-button reset">Reset</button>
                <div class="viz-legend" id="quicksort-legend">
                    <span class="viz-legend-desktop">🔴 Pivot | 🟡 Comparing | 🟠 Swapping | 🔵 Left Partition | 🟢 Right Partition</span>
                    <div class="viz-legend-mobile" style="display: none;">
                        <div class="viz-legend-item">🔴 Pivot</div>
                        <div class="viz-legend-item">🟡 Comparing</div>
                        <div class="viz-legend-item">🟠 Swapping</div>
                        <div class="viz-legend-item">🔵 Left Partition</div>
                        <div class="viz-legend-item">🟢 Right Partition</div>
                    </div>
                </div>
            \`;
            
            arrayViz.appendChild(controlsDiv);
            
            // Toggle legend display based on screen size
            function updateLegendDisplay() {
                const isMobile = window.innerWidth <= 768;
                const desktopLegend = document.querySelector('#quicksort-legend .viz-legend-desktop');
                const mobileLegend = document.querySelector('#quicksort-legend .viz-legend-mobile');
                
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
            statusDiv.textContent = 'Ready to start quicksort animation...';
            arrayViz.appendChild(statusDiv);
            
            // Animation variables
            let currentStepIndex = 0;
            let animationRunning = false;
            let animationInterval;
            
            function updateVisualization(step) {
                const cells = arrayDiv.querySelectorAll('div');
                const statusDiv = document.getElementById('sort-status');
                
                // Debug: Log every step
                console.log('Step:', step.type, step);
                
                // Reset all cell colors
                cells.forEach(cell => {
                    cell.className = 'viz-cell'; // Reset to base class
                });
                
                // Update array values
                step.array.forEach((value, index) => {
                    if (cells[index]) {
                        cells[index].textContent = value;
                    }
                });
                
                // Highlight pivot element
                if (step.pivotIndex !== undefined && cells[step.pivotIndex]) {
                    cells[step.pivotIndex].className = 'viz-cell pivot';
                    console.log('Applied pivot to cell', step.pivotIndex);
                }
                
                // Highlight elements being compared
                if (step.compareIndices) {
                    step.compareIndices.forEach(index => {
                        if (cells[index] && index !== step.pivotIndex) {
                            cells[index].className = 'viz-cell comparing';
                            console.log('Applied comparing to cell', index);
                        }
                    });
                }
                
                // Highlight swap operations
                if (step.swapIndices) {
                    step.swapIndices.forEach(index => {
                        if (cells[index]) {
                            cells[index].className = 'viz-cell swapping';
                            console.log('Applied swapping to cell', index);
                        }
                    });
                }
                
                // Show partitions after pivot placement - CRITICAL DEBUG
                if (step.type === 'pivot-final') {
                    console.log('*** PIVOT-FINAL STEP DETECTED ***');
                    console.log('leftPartition:', step.leftPartition);
                    console.log('rightPartition:', step.rightPartition);
                    
                    if (step.leftPartition && step.rightPartition) {
                        console.log('*** APPLYING PARTITION COLORS ***');
                        
                        // Left partition (blue) - only if valid range
                        if (step.leftPartition[0] <= step.leftPartition[1]) {
                            for (let i = step.leftPartition[0]; i <= step.leftPartition[1]; i++) {
                                if (cells[i] && i !== step.pivotFinalIndex) {
                                    cells[i].className = 'viz-cell left-partition';
                                    console.log('*** APPLIED LEFT-PARTITION to cell', i, 'with color blue ***');
                                }
                            }
                        } else {
                            console.log('*** LEFT PARTITION EMPTY - range invalid:', step.leftPartition);
                        }
                        
                        // Right partition (green) - only if valid range
                        if (step.rightPartition[0] <= step.rightPartition[1]) {
                            for (let i = step.rightPartition[0]; i <= step.rightPartition[1]; i++) {
                                if (cells[i] && i !== step.pivotFinalIndex) {
                                    cells[i].className = 'viz-cell right-partition';
                                    console.log('*** APPLIED RIGHT-PARTITION to cell', i, 'with color green ***');
                                }
                            }
                        } else {
                            console.log('*** RIGHT PARTITION EMPTY - range invalid:', step.rightPartition);
                        }
                        
                        // Ensure pivot stays highlighted
                        if (step.pivotFinalIndex !== undefined && cells[step.pivotFinalIndex]) {
                            cells[step.pivotFinalIndex].className = 'viz-cell pivot';
                            console.log('*** KEPT PIVOT at cell', step.pivotFinalIndex);
                        }
                    } else {
                        console.log('*** MISSING PARTITION DATA ***', 'leftPartition:', step.leftPartition, 'rightPartition:', step.rightPartition);
                    }
                }
                
                // Update status
                statusDiv.textContent = step.message;
                
                // Show step info in container
                const stepInfo = document.createElement('div');
                stepInfo.className = 'viz-step-info';
                
                let stepTypeColor = '#007acc';
                if (step.type === 'complete') stepTypeColor = '#28a745';
                else if (step.type === 'pivot-final') stepTypeColor = '#f44336';
                else if (step.type === 'partition-start') stepTypeColor = '#ff9800';
                else if (step.type === 'swap') stepTypeColor = '#9c27b0';
                
                stepInfo.style.borderLeftColor = stepTypeColor;
                
                stepInfo.innerHTML = \`
                    <strong>Step \${currentStepIndex + 1}:</strong> \${step.message}<br>
                    <small style="color: #666;">
                        Depth: \${step.depth || 0} | 
                        Comparisons: \${step.metrics?.comparisons || 0} | 
                        Swaps: \${step.metrics?.swaps || 0}
                    </small>
                \`;
                
                if (step.type === 'complete') {
                    stepInfo.className = 'viz-step-info complete';
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
        }`,
        
    // CSS styles for QuickSort visualization
    customStyles: `
    .viz-cell {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #ddd;
        background: #f8f9fa;
        font-weight: bold;
        border-radius: 4px;
        margin: 2px;
        transition: all 0.6s ease;
        font-size: 14px;
    }
    
    
    .viz-cell.pivot {
        background: #ffecb3 !important;
        border-color: #f57f17 !important;
        transform: scale(1.2);
        box-shadow: 0 4px 8px rgba(245, 127, 23, 0.5);
        z-index: 10;
    }
    
    .viz-cell.comparing {
        background: #fff3e0 !important;
        border-color: #ff9800 !important;
        transform: scale(1.1);
        box-shadow: 0 3px 6px rgba(255, 152, 0, 0.4);
    }
    
    .viz-cell.swapping {
        background: #ff5722 !important;
        border-color: #d84315 !important;
        border-width: 4px !important;
        color: #fff !important;
        transform: scale(1.15) !important;
        animation: shake 0.5s;
        box-shadow: 0 4px 8px rgba(255, 87, 34, 0.7) !important;
        font-weight: bold !important;
    }
    
    .viz-cell.left-partition {
        background: #2196f3 !important;
        border-color: #0d47a1 !important;
        border-width: 4px !important;
        color: #fff !important;
        transform: scale(1.1) !important;
        box-shadow: 0 4px 12px rgba(33, 150, 243, 0.7) !important;
        font-weight: bold !important;
    }
    
    .viz-cell.right-partition {
        background: #4caf50 !important;
        border-color: #1b5e20 !important;
        border-width: 4px !important;
        color: #fff !important;
        transform: scale(1.1) !important;
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.7) !important;
        font-weight: bold !important;
    }
    
    .viz-status {
        text-align: center;
        margin: 20px 0;
        font-size: 1.1em;
        font-weight: bold;
        min-height: 25px;
        padding: 10px;
        background: #f0f8ff;
        border-radius: 6px;
        border: 1px solid #b3d9ff;
    }
    
    .viz-step-info {
        background: #f8f9fa;
        padding: 10px;
        margin: 5px 0;
        border-radius: 4px;
        font-size: 0.9em;
        border-left: 4px solid #007acc;
    }
    
    .viz-step-info.complete {
        border-left-color: #28a745;
        background: #d4edda;
    }
    
    .viz-summary {
        background: #f8f9fa;
        padding: 15px;
        border-radius: 4px;
        margin-top: 15px;
        border-left: 4px solid #007acc;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0) scale(1.15); }
        25% { transform: translateX(-2px) scale(1.15); }
        75% { transform: translateX(2px) scale(1.15); }
    }
    
    /* Light mode text colors - ensure visibility */
    .viz-cell {
        color: #333;
    }
    
    
    .viz-cell.pivot {
        color: #e65100;
    }
    
    .viz-cell.comparing {
        color: #e65100;
    }
    
    .viz-cell.swapping {
        color: #c62828;
    }
    
    
    /* Dark mode styles */
    body.dark-mode .viz-cell {
        background: #343a40 !important;
        border-color: #495057 !important;
        color: #fff !important;
    }
    
    
    body.dark-mode .viz-cell.pivot {
        color: #ffcc02 !important;
    }
    
    body.dark-mode .viz-cell.comparing {
        color: #ffb74d !important;
    }
    
    body.dark-mode .viz-cell.swapping {
        color: #ef5350 !important;
    }
    
    body.dark-mode .viz-cell.left-partition {
        background: #1976d2 !important;
        border-color: #0d47a1 !important;
        color: #fff !important;
        box-shadow: 0 4px 12px rgba(25, 118, 210, 0.8) !important;
    }
    
    body.dark-mode .viz-cell.right-partition {
        background: #388e3c !important;
        border-color: #1b5e20 !important;
        color: #fff !important;
        box-shadow: 0 4px 12px rgba(56, 142, 60, 0.8) !important;
    }
    
    body.dark-mode .viz-status {
        background: #343a40;
        border-color: #495057;
        color: #fff;
    }
    
    body.dark-mode .viz-step-info {
        background: #343a40;
        color: #fff;
    }
    
    body.dark-mode .viz-summary {
        background: #343a40;
        color: #fff;
    }
`
};

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} else if (typeof window !== 'undefined') {
    window.quickSortConfig = config;
}