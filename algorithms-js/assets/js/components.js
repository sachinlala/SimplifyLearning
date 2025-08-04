/**
 * Reusable JavaScript Components for SimplifyLearning Algorithm Demos
 * 
 * This file contains vanilla JavaScript components that can be reused across
 * different algorithm demonstration pages.
 */

// Accordion Component
class Accordion {
    constructor(element) {
        this.element = element;
        this.header = element.querySelector('.accordion-header');
        this.content = element.querySelector('.accordion-content');
        this.icon = element.querySelector('.accordion-icon');
        
        this.init();
    }
    
    init() {
        this.header.addEventListener('click', () => this.toggle());
        
        // Set initial icon
        if (!this.icon.textContent) {
            this.icon.textContent = '▼';
        }
    }
    
    toggle() {
        const isActive = this.element.classList.contains('active');
        
        if (isActive) {
            this.close();
        } else {
            this.open();
        }
    }
    
    open() {
        this.element.classList.add('active');
        this.icon.textContent = '▲';
    }
    
    close() {
        this.element.classList.remove('active');
        this.icon.textContent = '▼';
    }
}

// Code Viewer Component
class CodeViewer {
    constructor(element, code = '') {
        this.element = element;
        this.code = code;
        
        this.init();
    }
    
    init() {
        if (this.code) {
            this.setCode(this.code);
        }
        
        // Add copy functionality
        this.addCopyButton();
    }
    
    setCode(code) {
        this.code = code;
        this.element.textContent = code;
    }
    
    addCopyButton() {
        const copyBtn = document.createElement('button');
        copyBtn.textContent = 'Copy';
        copyBtn.className = 'copy-btn';
        copyBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: #007acc;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.8rem;
        `;
        
        // Make parent relative if not already
        const parent = this.element.parentElement;
        if (getComputedStyle(parent).position === 'static') {
            parent.style.position = 'relative';
        }
        
        copyBtn.addEventListener('click', () => this.copyCode());
        parent.appendChild(copyBtn);
    }
    
    copyCode() {
        navigator.clipboard.writeText(this.code).then(() => {
            // Visual feedback
            const copyBtn = this.element.parentElement.querySelector('.copy-btn');
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        });
    }
}

// Step List Component
class StepList {
    constructor(element, steps = []) {
        this.element = element;
        this.steps = steps;
        this.currentStep = 0;
        
        this.init();
    }
    
    init() {
        if (this.steps.length > 0) {
            this.render();
        }
    }
    
    setSteps(steps) {
        this.steps = steps;
        this.currentStep = 0;
        this.render();
    }
    
    render() {
        this.element.innerHTML = '';
        
        this.steps.forEach((step, index) => {
            const li = document.createElement('li');
            li.textContent = step;
            li.classList.add('step-item');
            
            if (index < this.currentStep) {
                li.classList.add('completed');
            } else if (index === this.currentStep) {
                li.classList.add('current');
            }
            
            this.element.appendChild(li);
        });
    }
    
}

// Algorithm List Auto-generator
class AlgorithmList {
    constructor(containerElement) {
        this.container = containerElement;
        this.algorithms = [];
        
        this.init();
    }
    
    init() {
        this.loadAlgorithms();
        this.render();
    }
    
    loadAlgorithms() {
        // This would typically fetch from an API or config file
        // For now, we'll define them manually but in a way that's easy to extend
        this.algorithms = [
            {
                name: 'Count and Say',
                description: 'Generate sequences where each term describes the previous term',
                url: 'demo.html?algo=patterns/count-and-say',
                category: 'sequences',
                subcategory: 'sequences'
            },
            {
                name: 'Binary Search',
                description: 'Efficient search algorithm for sorted arrays with O(log n) complexity',
                url: 'demo.html?algo=search/binary-search',
                category: 'search',
                subcategory: 'arrays'
            },
            {
                name: 'Bubble Sort',
                description: 'Simple sorting algorithm that repeatedly compares adjacent elements',
                url: 'demo.html?algo=sort/bubble-sort',
                category: 'sort',
                subcategory: 'comparison'
            }
            // More algorithms can be added here
        ];
    }
    
    addAlgorithm(algorithm) {
        this.algorithms.push(algorithm);
        this.render();
    }
    
    render() {
        if (!this.container) return;
        
        this.container.innerHTML = '';
        
        this.algorithms.forEach(algorithm => {
            const card = this.createAlgorithmCard(algorithm);
            this.container.appendChild(card);
        });
        
    }
    
    createAlgorithmCard(algorithm) {
        const card = document.createElement('div');
        card.className = 'algorithm-card';
        card.dataset.category = algorithm.category;
        
        
        card.innerHTML = `
            <h2>${algorithm.name}</h2>
            <p>${algorithm.description}</p>
            <div class="algorithm-meta">
                <span class="category">${algorithm.category}</span>
            </div>
            <a href="${algorithm.url}" class="demo-link">View Demo</a>
        `;
        
        return card;
    }
}

// Auto-initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all accordions
    document.querySelectorAll('.accordion').forEach(element => {
        new Accordion(element);
    });
    
    // Initialize all code viewers
    document.querySelectorAll('.code-viewer').forEach(element => {
        new CodeViewer(element);
    });
    
    // Initialize all step lists
    document.querySelectorAll('.step-list').forEach(element => {
        new StepList(element);
    });
    
    // Initialize algorithm list if container exists
    const algorithmGrid = document.querySelector('.algorithms-grid');
    if (algorithmGrid) {
        new AlgorithmList(algorithmGrid);
    }
});

// Export classes for manual instantiation if needed
window.SimplifyLearning = {
    Accordion,
    CodeViewer,
    StepList,
    AlgorithmList
};
