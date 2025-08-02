/**
 * Configuration for Binary Search Algorithm Demo
 */

const config = {
    name: "Binary Search",
    title: "Binary Search Demo",
    category: "search",
    problem: "Given a sorted array, find the index of a target value in O(log n) time.",
    cssPath: "../../../assets/css/styles.css",
    jsPath: "binary-search.js",
    githubPath: "https://github.com/sachinlala/SimplifyLearning/blob/main/algorithms-js/src/search/binary-search/binary-search.js",
    algorithmFunction: "binarySearchWithSteps",
    hasVisualization: true,
    
    inputs: [
        {
            id: "sorted-array",
            type: "text",
            label: "Sorted Array (comma-separated)",
            defaultValue: "1, 3, 5, 7, 9, 11, 13, 15",
            width: "300px"
        },
        {
            id: "target-element",
            type: "number",
            label: "Target Element",
            defaultValue: 7,
            width: "80px"
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
            const arrayInput = document.getElementById('sorted-array').value.split(',').map(Number);
            const targetElement = parseInt(document.getElementById('target-element').value);
            const resultContainer = document.getElementById('result');
            const errorContainer = document.getElementById('error-message');
            const visualizationSection = document.getElementById('visualization-section');

            // Clear previous error
            errorContainer.innerHTML = '';
            errorContainer.style.display = 'none';

            // Clear previous result
            resultContainer.innerHTML = '';
            visualizationSection.style.display = 'none';

            try {
                const result = binarySearchWithSteps(arrayInput, targetElement);
                
                // Show result
                if (result.found) {
                    resultContainer.innerHTML = \`<strong>Element found at index</strong>: \${result.index}<br>Total Comparisons: \${result.totalComparisons}\`;
                } else {
                    resultContainer.innerHTML = \`Element not found<br>Total Comparisons: \${result.totalComparisons}\`;
                }

                // Show visualization
                showVisualization(arrayInput, targetElement, result.steps);
                visualizationSection.style.display = 'block';
                
            } catch (error) {
                errorContainer.innerHTML = \`⚠️ \${error.message}\`;
                errorContainer.style.display = 'block';
            }
        }

        function showVisualization(array, target, steps) {
            const arrayViz = document.getElementById('array-visualization');
            const stepsContainer = document.getElementById('steps-container');
            
            // Clear previous visualization
            arrayViz.innerHTML = '';
            stepsContainer.innerHTML = '';
            
            // Create array visualization
            const arrayDiv = document.createElement('div');
            arrayDiv.style.cssText = 'display: flex; gap: 5px; justify-content: center; margin-bottom: 10px; flex-wrap: wrap;';
            
            array.forEach((value, index) => {
                const cell = document.createElement('div');
                cell.textContent = value;
                cell.style.cssText = \`
                    width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
                    border: 2px solid #ddd; background: #f8f9fa; font-weight: bold;
                    border-radius: 4px; margin: 2px;
                \`;
                cell.setAttribute('data-index', index);
                arrayDiv.appendChild(cell);
            });
            
            arrayViz.appendChild(arrayDiv);
            
            // Add target info
            const targetInfo = document.createElement('div');
            targetInfo.innerHTML = \`<strong>Target:</strong> \${target}\`;
            targetInfo.style.cssText = 'text-align: center; margin-bottom: 20px; font-size: 1.1em;';
            arrayViz.appendChild(targetInfo);
            
            // Create steps visualization
            steps.forEach((step, index) => {
                const stepDiv = document.createElement('div');
                stepDiv.style.cssText = 'margin-bottom: 15px; padding: 10px; border: 1px solid #ddd; border-radius: 4px; background: #f9f9f9;';
                
                const stepTitle = document.createElement('h4');
                stepTitle.textContent = \`Step \${step.step}\`;
                stepTitle.style.margin = '0 0 10px 0';
                
                const stepInfo = document.createElement('div');
                stepInfo.innerHTML = \`
                    <strong>Range:</strong> [\${step.start}, \${step.end}] &nbsp;&nbsp;
                    <strong>Mid Index:</strong> \${step.mid} &nbsp;&nbsp;
                    <strong>Mid Value:</strong> \${step.midValue} &nbsp;&nbsp;
                    <strong>Comparison:</strong> \${step.target} \${step.comparison === 'equal' ? '==' : step.comparison === 'less' ? '<' : '>'} \${step.midValue}
                \`;
                
                stepDiv.appendChild(stepTitle);
                stepDiv.appendChild(stepInfo);
                
                if (step.found) {
                    stepDiv.style.backgroundColor = '#d4edda';
                    stepDiv.style.borderColor = '#c3e6cb';
                    const foundMsg = document.createElement('div');
                    foundMsg.innerHTML = '<strong style="color: #155724;">✓ Target found!</strong>';
                    foundMsg.style.marginTop = '5px';
                    stepDiv.appendChild(foundMsg);
                }
                
                stepsContainer.appendChild(stepDiv);
            });
        }`
};

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} else if (typeof window !== 'undefined') {
    window.binarySearchConfig = config;
}
