/**
 * Configuration for Bubble Sort Algorithm Demo
 */

const config = {
    name: "Bubble Sort",
    title: "Bubble Sort Demo",
    category: "sort",
    problem: "Sort an array of elements by repeatedly comparing adjacent elements and swapping them if they are in the wrong order.",
    cssPath: "../../../assets/css/styles.css",
    jsPath: "bubble-sort.js",
    githubPath: "https://github.com/sachinlala/SimplifyLearning/blob/main/algorithms-js/src/sort/bubble-sort/bubble-sort.js",
    algorithmFunction: "bubbleSort",
    hasVisualization: true,
    autoRun: false, // Don't auto-run for sorting algorithms
    
    inputs: [
        {
            id: "array-input",
            type: "text",
            label: "Array (comma-separated)",
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
            const arrayInput = document.getElementById('array-input').value.split(',').map(num => parseInt(num.trim()));
            const animationSpeed = parseInt(document.getElementById('animation-speed').value);
            const resultContainer = document.getElementById('result');
            const errorContainer = document.getElementById('error-message');
            const visualizationSection = document.getElementById('visualization-section');

            // Clear previous error
            errorContainer.innerHTML = '';
            errorContainer.style.display = 'none';

            // Validate input
            if (arrayInput.some(isNaN)) {
                showError('Please enter valid numbers separated by commas');
                return;
            }

            if (arrayInput.length < 2) {
                showError('Array must contain at least 2 elements');
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
            
            // Create array visualization
            const arrayDiv = document.createElement('div');
            arrayDiv.style.cssText = 'display: flex; gap: 5px; justify-content: center; margin-bottom: 20px; flex-wrap: wrap;';
            arrayDiv.id = 'array-display';
            
            array.forEach((value, index) => {
                const bar = document.createElement('div');
                bar.textContent = value;
                bar.style.cssText = \`
                    width: 50px; height: \${Math.max(value * 3, 30)}px; 
                    display: flex; align-items: flex-end; justify-content: center;
                    background: #007acc; color: white; font-weight: bold;
                    border-radius: 4px 4px 0 0; margin: 2px;
                    transition: all 0.3s ease;
                \`;
                bar.setAttribute('data-index', index);
                bar.setAttribute('data-value', value);
                arrayDiv.appendChild(bar);
            });
            
            arrayViz.appendChild(arrayDiv);
            
            // Add status display
            const statusDiv = document.createElement('div');
            statusDiv.id = 'sort-status';
            statusDiv.style.cssText = 'text-align: center; margin-bottom: 20px; font-size: 1.1em; font-weight: bold;';
            statusDiv.textContent = 'Click "Run Demo" to start sorting...';
            arrayViz.appendChild(statusDiv);
        }`
};

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} else if (typeof window !== 'undefined') {
    window.bubbleSortConfig = config;
}
