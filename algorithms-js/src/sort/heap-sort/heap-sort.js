/**
 * Heap Sort - Visualization and Demo Implementation
 * 
 * This file contains the visualization functions for Heap Sort algorithm.
 * The core algorithm logic is in heap-sort-core.js.
 * 
 * @author SimplifyLearning
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
        <div class="viz-legend">
            🟡 Comparing | 🟢 Sorted
        </div>
    `;
    arrayViz.appendChild(controlsDiv);
    
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