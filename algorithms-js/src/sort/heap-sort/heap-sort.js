/**
 * Heap Sort - Visualization and Demo Implementation
 * 
 * This file contains the visualization functions for Heap Sort algorithm.
 * The core algorithm logic is in heap-sort-core.js.
 * 
 * @see https://github.com/sachinlala/SimplifyLearning
 */

/**
 * Run heap sort demo with specified parameters
 */
function runHeapSortDemo() {
    const arrayInput = document.getElementById('unsorted-array');
    const heapTypeInput = document.getElementById('heap-type');
    const resultContainer = document.getElementById('result');
    const errorContainer = document.getElementById('error-message');
    const visualizationSection = document.getElementById('visualization-section');
    
    // Check if required elements exist
    if (!arrayInput) {
        console.error('Element with ID "unsorted-array" not found');
        return;
    }
    if (!resultContainer) {
        console.error('Element with ID "result" not found');
        return;
    }
    if (!errorContainer) {
        console.error('Element with ID "error-message" not found');
        return;
    }
    
    const arrayInputStr = arrayInput.value;
    const heapType = heapTypeInput ? heapTypeInput.value : 'max';

    // Clear previous error and result
    errorContainer.innerHTML = '';
    errorContainer.style.display = 'none';
    resultContainer.innerHTML = '';
    if (visualizationSection) {
        visualizationSection.style.display = 'none';
    }

    // Parse input array
    let parsedArray;
    try {
        parsedArray = parseArray(arrayInputStr);
    } catch (e) {
        showError('Invalid array format. Please use comma-separated numbers.');
        return;
    }

    // Validate input
    if (parsedArray.length === 0) {
        showError('Array cannot be empty');
        return;
    }
    
    if (parsedArray.length > 12) {
        showError('Array size limited to 12 elements for visualization purposes');
        return;
    }

    try {
        const startTime = performance.now();
        
        // Always use steps for visualization
        const result = heapSortWithSteps(parsedArray, heapType);
        
        const endTime = performance.now();
        const executionTime = (endTime - startTime).toFixed(4);
        
        // Show result
        let resultHTML = `
            <strong>Algorithm:</strong> Heap Sort (${heapType === 'max' ? 'Max-Heap → Ascending' : 'Min-Heap → Descending'})<br>
            <strong>Original Array:</strong> [${parsedArray.join(', ')}]<br>
            <strong>Sorted Array:</strong> [${result.sortedArray.join(', ')}]<br>
            <strong>Total Comparisons:</strong> ${result.metrics.comparisons}<br>
            <strong>Total Swaps:</strong> ${result.metrics.swaps}<br>
            <strong>Heap Operations:</strong> ${result.metrics.heapOperations}<br>
            <strong>Execution Time:</strong> ${executionTime} ms
        `;
        
        resultContainer.innerHTML = resultHTML;

        // Show visualization if steps are available
        if (result.steps && result.steps.length > 0 && visualizationSection) {
            showHeapSortVisualization(arrayInputStr.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n)), result.steps, heapType);
            visualizationSection.style.display = 'block';
        }
        
    } catch (error) {
        showError(error.message);
    }
}

/**
 * Show heap sort visualization
 */
function showHeapSortVisualization(originalArray, steps, heapType) {
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
    controlsDiv.innerHTML = `
        <h4>Heap Sort Visualization (${heapType === 'max' ? 'Max-Heap' : 'Min-Heap'})</h4>
        <button id="start-sort-animation" class="viz-button start">Start Animation</button>
        <button id="pause-sort-animation" class="viz-button pause" disabled>Pause</button>
        <button id="reset-sort-animation" class="viz-button reset">Reset</button>
        <div class="viz-legend" id="heapsort-legend">
            <span class="viz-legend-desktop">🔵 Heap Region | 🟠 Comparing | 🟡 Current | 🔴 Pivot | 🟣 Swapping | 🟢 Sorted</span>
            <div class="viz-legend-mobile" style="display: none;">
                <div class="viz-legend-item">🔵 Heap Region</div>
                <div class="viz-legend-item">🟠 Comparing</div>
                <div class="viz-legend-item">🟡 Current</div>
                <div class="viz-legend-item">🔴 Pivot</div>
                <div class="viz-legend-item">🟣 Swapping</div>
                <div class="viz-legend-item">🟢 Sorted</div>
            </div>
        </div>
    `;
    arrayViz.appendChild(controlsDiv);
    
    // Toggle legend display based on screen size
    function updateLegendDisplay() {
        const isMobile = window.innerWidth <= 768;
        const desktopLegend = document.querySelector('#heapsort-legend .viz-legend-desktop');
        const mobileLegend = document.querySelector('#heapsort-legend .viz-legend-mobile');
        
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
    statusDiv.textContent = 'Ready to start heap sort animation...';
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
        
        // Highlight heap region (unsorted part)
        if (step.heapSize !== undefined) {
            for (let i = 0; i < step.heapSize; i++) {
                if (cells[i]) {
                    cells[i].className = 'viz-cell current-range';
                }
            }
            
            // Highlight sorted region
            for (let i = step.heapSize; i < step.array.length; i++) {
                if (cells[i]) {
                    cells[i].className = 'viz-cell sorted';
                }
            }
        }
        
        // Highlight current node being processed
        if (step.currentNode !== undefined && cells[step.currentNode]) {
            cells[step.currentNode].className = 'viz-cell current';
        }
        
        // Highlight nodes involved in comparison
        if (step.leftChild !== undefined && cells[step.leftChild]) {
            cells[step.leftChild].className = 'viz-cell comparing';
        }
        if (step.rightChild !== undefined && cells[step.rightChild]) {
            cells[step.rightChild].className = 'viz-cell comparing';
        }
        if (step.targetNode !== undefined && cells[step.targetNode]) {
            cells[step.targetNode].className = 'viz-cell pivot';
        }
        
        // Highlight swap operations
        if (step.swapIndices) {
            step.swapIndices.forEach(index => {
                if (cells[index]) {
                    cells[index].className = 'viz-cell swapping';
                }
            });
        }
        
        // Highlight extracted element
        if (step.extractedIndex !== undefined && cells[step.extractedIndex]) {
            cells[step.extractedIndex].className = 'viz-cell sorted';
        }
        
        // Update status
        statusDiv.textContent = step.message;
        
        // Show step info in container
        const stepInfo = document.createElement('div');
        stepInfo.className = step.type === 'complete' ? 'viz-step-info complete' : 'viz-step-info';
        
        let stepTypeColor = '#007acc';
        if (step.type === 'complete') stepTypeColor = '#28a745';
        else if (step.type === 'heap-built') stepTypeColor = '#4caf50';
        else if (step.type === 'extract') stepTypeColor = '#f44336';
        else if (step.type === 'heapify') stepTypeColor = '#ff9800';
        else if (step.type === 'swap') stepTypeColor = '#9c27b0';
        else if (step.type === 'build-heap-step') stepTypeColor = '#2196f3';
        
        stepInfo.style.borderLeftColor = stepTypeColor;
        
        let phaseInfo = '';
        if (step.phase) {
            phaseInfo = `Phase: ${step.phase.replace('-', ' ')} | `;
        }
        
        stepInfo.innerHTML = `
            <strong>Step ${currentStepIndex + 1}:</strong> ${step.message}<br>
            <small>
                ${phaseInfo}
                Heap Size: ${step.heapSize || 0} | 
                Comparisons: ${step.metrics?.comparisons || 0} | 
                Swaps: ${step.metrics?.swaps || 0}
            </small>
        `;
        
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
        }, 1800); // 1.8 second delay between steps
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
        document.getElementById('sort-status').textContent = 'Ready to start heap sort animation...';
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

/**
 * Heap sort with step-by-step visualization data
 * This function provides the step tracking needed for visualization
 * @param {number[]} arr - Array to be sorted
 * @param {string} heapType - Type of heap ('max' or 'min')
 * @returns {Object} Result with sorted array, steps, and metrics
 */
function heapSortWithSteps(arr, heapType = 'max') {
    if (!arr || arr.length <= 1) {
        return {
            sortedArray: arr || [],
            steps: [],
            metrics: { comparisons: 0, swaps: 0, heapOperations: 0 }
        };
    }

    // Use core algorithm with step tracking
    if (window.HeapSortCore && window.HeapSortCore.heapSortWithSteps) {
        return window.HeapSortCore.heapSortWithSteps([...arr], heapType);
    }

    // Fallback implementation with basic step tracking
    const steps = [];
    const metrics = { comparisons: 0, swaps: 0, heapOperations: 0 };
    const workingArray = [...arr];
    const n = workingArray.length;
    
    // Comparison function based on heap type
    const shouldSwap = (parent, child) => {
        return heapType === 'max' ? workingArray[parent] < workingArray[child] :
                                   workingArray[parent] > workingArray[child];
    };
    
    // Heapify function
    function heapify(array, n, rootIndex, phase = 'build-heap') {
        let largest = rootIndex;
        let left = 2 * rootIndex + 1;
        let right = 2 * rootIndex + 2;
        
        // Compare with left child
        if (left < n) {
            metrics.comparisons++;
            if (shouldSwap(largest, left)) {
                largest = left;
            }
        }
        
        // Compare with right child
        if (right < n) {
            metrics.comparisons++;
            if (shouldSwap(largest, right)) {
                largest = right;
            }
        }
        
        // If largest is not root, swap and continue heapifying
        if (largest !== rootIndex) {
            [array[rootIndex], array[largest]] = [array[largest], array[rootIndex]];
            metrics.swaps++;
            metrics.heapOperations++;
            
            steps.push({
                type: phase === 'build-heap' ? 'build-heap-step' : 'heapify',
                array: [...array],
                phase: phase,
                heapSize: n,
                currentNode: rootIndex,
                targetNode: largest,
                leftChild: left < n ? left : undefined,
                rightChild: right < n ? right : undefined,
                swapIndices: [rootIndex, largest],
                message: `${phase === 'build-heap' ? 'Building heap' : 'Heapifying'}: Swapped ${array[rootIndex]} and ${array[largest]}`,
                metrics: { ...metrics }
            });
            
            // Recursively heapify the affected subtree
            heapify(array, n, largest, phase);
        } else {
            // No swap needed, just add a step to show the comparison
            steps.push({
                type: phase === 'build-heap' ? 'build-heap-step' : 'heapify',
                array: [...array],
                phase: phase,
                heapSize: n,
                currentNode: rootIndex,
                leftChild: left < n ? left : undefined,
                rightChild: right < n ? right : undefined,
                message: `${phase === 'build-heap' ? 'Building heap' : 'Heapifying'}: Node ${rootIndex} already in correct position`,
                metrics: { ...metrics }
            });
        }
    }
    
    // Build initial heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(workingArray, n, i, 'build-heap');
    }
    
    steps.push({
        type: 'heap-built',
        array: [...workingArray],
        phase: 'heap-built',
        heapSize: n,
        message: `${heapType === 'max' ? 'Max' : 'Min'}-heap built successfully`,
        metrics: { ...metrics }
    });
    
    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        [workingArray[0], workingArray[i]] = [workingArray[i], workingArray[0]];
        metrics.swaps++;
        
        steps.push({
            type: 'extract',
            array: [...workingArray],
            phase: 'extract-sort',
            heapSize: i,
            extractedIndex: i,
            swapIndices: [0, i],
            message: `Extracted ${workingArray[i]} to position ${i}`,
            metrics: { ...metrics }
        });
        
        // Call heapify on the reduced heap
        heapify(workingArray, i, 0, 'extract-sort');
    }
    
    steps.push({
        type: 'complete',
        array: [...workingArray],
        phase: 'complete',
        heapSize: 0,
        message: `Heap sort completed! Array sorted in ${heapType === 'max' ? 'ascending' : 'descending'} order.`,
        metrics: { ...metrics }
    });
    
    return {
        sortedArray: workingArray,
        steps: steps,
        metrics: metrics
    };
}

// Browser compatibility - expose functions
if (typeof window !== 'undefined') {
    window.heapSortWithSteps = heapSortWithSteps;
    window.runHeapSortDemo = runHeapSortDemo;
}
