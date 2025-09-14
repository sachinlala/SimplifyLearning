/**
 * Merge Sort - Visualization and Demo Implementation
 * 
 * This file contains the visualization functions for Merge Sort algorithm.
 * The core algorithm logic is in merge-sort-core.js.
 * 
 * @author SimplifyLearning
 * @see https://github.com/sachinlala/SimplifyLearning
 */

/**
 * Run merge sort demo with specified parameters
 */
function runMergeSortDemo() {
    const arrayInputStr = document.getElementById('unsorted-array').value;
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
        arrayInput = parseArray(arrayInputStr);
    } catch (e) {
        showError('Invalid array format. Please use comma-separated numbers.');
        return;
    }

    // Validate input
    if (arrayInput.length === 0) {
        showError('Array cannot be empty');
        return;
    }
    
    if (arrayInput.length > 16) {
        showError('Array size limited to 16 elements for visualization purposes');
        return;
    }

    try {
        const startTime = performance.now();
        
        // Always use steps for visualization
        const result = mergeSortWithSteps(arrayInput);
        
        const endTime = performance.now();
        const executionTime = (endTime - startTime).toFixed(4);
        
        // Show result
        let resultHTML = `
            <strong>Algorithm:</strong> Merge Sort (Top-Down)<br>
            <strong>Original Array:</strong> [${arrayInput.join(', ')}]<br>
            <strong>Sorted Array:</strong> [${result.sortedArray.join(', ')}]<br>
            <strong>Total Comparisons:</strong> ${result.metrics.comparisons}<br>
            <strong>Total Merges:</strong> ${result.metrics.merges}<br>
            <strong>Max Recursion Depth:</strong> ${result.metrics.recursiveDepth}<br>
            <strong>Execution Time:</strong> ${executionTime} ms
        `;
        
        resultContainer.innerHTML = resultHTML;

        // Always show visualization
        if (result.steps && result.steps.length > 0) {
            showMergeSortVisualization(arrayInput, result.steps);
            visualizationSection.style.display = 'block';
        }
        
    } catch (error) {
        showError(error.message);
    }
}

/**
 * Show merge sort visualization
 */
function showMergeSortVisualization(originalArray, steps) {
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
        <h4>Merge Sort Visualization</h4>
        <button id="start-sort-animation" class="viz-button start">Start Animation</button>
        <button id="pause-sort-animation" class="viz-button pause" disabled>Pause</button>
        <button id="reset-sort-animation" class="viz-button reset">Reset</button>
        <div class="viz-legend">
            🔵 Left Partition | 🟢 Right Partition | 🟡 Current | 🟢 Sorted
        </div>
    `;
    arrayViz.appendChild(controlsDiv);
    
    // Status display
    const statusDiv = document.createElement('div');
    statusDiv.id = 'sort-status';
    statusDiv.className = 'viz-status';
    statusDiv.textContent = 'Ready to start merge sort animation...';
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
        
        // Apply step-specific highlighting
        if (step.subArrays) {
            step.subArrays.forEach(subArray => {
                for (let i = subArray.start; i < subArray.end; i++) {
                    if (cells[i]) {
                        switch (subArray.type) {
                            case 'left':
                                cells[i].className = 'viz-cell left-partition';
                                break;
                            case 'right':
                                cells[i].className = 'viz-cell right-partition';
                                break;
                            case 'merged':
                                cells[i].className = 'viz-cell sorted';
                                break;
                        }
                    }
                }
            });
        }
        
        // Highlight target index during merge steps
        if (step.targetIndex !== undefined && cells[step.targetIndex]) {
            cells[step.targetIndex].className = 'viz-cell current';
        }
        
        // Update status
        statusDiv.textContent = step.message;
        
        // Show step info in container
        const stepInfo = document.createElement('div');
        stepInfo.className = step.type === 'complete' ? 'viz-step-info complete' : 'viz-step-info';
        
        let stepTypeColor = '#007acc';
        if (step.type === 'complete') stepTypeColor = '#28a745';
        else if (step.type === 'divide') stepTypeColor = '#ff9800';
        else if (step.type === 'merge-start') stepTypeColor = '#9c27b0';
        else if (step.type === 'merge-step') stepTypeColor = '#2196f3';
        else if (step.type === 'merge-complete') stepTypeColor = '#4caf50';
        
        stepInfo.style.borderLeftColor = stepTypeColor;
        
        stepInfo.innerHTML = `
            <strong>Step ${currentStepIndex + 1}:</strong> ${step.message}<br>
            <small>
                Depth: ${step.depth || 0} | 
                Comparisons: ${step.metrics?.comparisons || 0} | 
                Merges: ${step.metrics?.merges || 0}
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
        document.getElementById('sort-status').textContent = 'Ready to start merge sort animation...';
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