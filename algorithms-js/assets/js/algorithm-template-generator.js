/**
 * Algorithm Template Generator
 * 
 * This module generates uniform HTML pages for algorithm demos based on configuration objects.
 * It eliminates code duplication and ensures consistent structure across all algorithm pages.
 */

class AlgorithmTemplateGenerator {
    constructor() {
        this.baseTemplate = null;
    }

    /**
     * Generate HTML page for an algorithm based on configuration
     * @param {Object} config - Algorithm configuration object
     * @returns {string} Complete HTML page content
     */
    generateHTML(config) {
        // Validate required config properties
        this.validateConfig(config);
        
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.title} - SimplifyLearning</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${config.cssPath}">
</head>
<body>
    ${this.generateHeader(config)}
    
    <main>
        ${this.generateHeroSection(config)}
        ${this.generateProblemSection(config)}
        
        <div class="demo-container" style="max-width: 1000px; margin: 0 auto; padding: 20px;">
            ${this.generateThemeToggle()}
            ${this.generateInputSection(config)}
            ${this.generateOutputSection(config)}
            ${config.hasVisualization ? this.generateVisualizationSection(config) : ''}
            ${this.generateExplanationSection(config)}
            ${this.generateSourceCodeSection(config)}
        </div>
    </main>
    
    ${this.generateFooter()}
    
    ${this.generateScripts(config)}
    ${this.generateStyles(config)}
</body>
</html>`;
        
        return html;
    }

    /**
     * Validate required configuration properties
     */
    validateConfig(config) {
const required = ['name', 'title', 'category', 'cssPath', 'jsPath', 'githubPath', 'problem'];
        const missing = required.filter(prop => !config[prop]);
        
        if (missing.length > 0) {
            throw new Error(`Missing required config properties: ${missing.join(', ')}`);
        }

        if (!config.inputs || !Array.isArray(config.inputs)) {
            throw new Error('Config must include inputs array');
        }

        if (!config.explanation || !config.explanation.description) {
            throw new Error('Config must include explanation with description');
        }
        if (typeof config.problem !== 'string' || !config.problem.trim()) {
            throw new Error('Config must include a non-empty string for problem');
        }

    }

    /**
     * Generate header section
     */
    generateHeader(config) {
        return `
    <header>
        <div class="header-left">
            <a href="https://github.com/sachinlala" target="_blank">
                <img src="../../../assets/images/sl-logo.svg" alt="SimplifyLearning" style="width: 32px; height: 32px; margin-right: 10px;">
            </a>
            <a href="https://github.com/sachinlala/SimplifyLearning" target="_blank" class="nav-logo">SimplifyLearning</a>
        </div>
        <nav class="nav-algorithms">
            <a href="${config.backPath || '../../../index.html'}">← Back to Home</a>
        </nav>
    </header>`;
    }

    /**
     * Generate hero section
     */
    generateHeroSection(config) {
        return `
        <section class="hero">
            <h1>Demo - ${config.name}</h1>
        </section>`;
    }

    /**
     * Generate problem description section
     */
    generateProblemSection(config) {
        return `
        <section class="problem-description">
            <h2>Problem</h2>
            <p>${config.problem}</p>
        </section>`;
    }

    /**
     * Generate theme toggle button
     */
    generateThemeToggle() {
        return `
            <!-- Theme Toggle -->
            <div class="theme-toggle" style="text-align: right; margin-bottom: 20px;">
                <button id="theme-toggle" style="padding: 8px 16px; background: #333; color: white; border: none; border-radius: 4px; cursor: pointer;">🌙 Dark Mode</button>
            </div>`;
    }

    /**
     * Generate input section based on config
     */
    generateInputSection(config) {
        const inputElements = config.inputs.map(input => this.generateInputElement(input)).join('\n                    ');
        
        return `
            <div class="input-section" style="background: #fff; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h3>Inputs</h3>
                <div style="display: flex; gap: 20px; flex-wrap: wrap; align-items: end;">
                    ${inputElements}
                    <div>
                        <button onclick="runDemo()" style="padding: 8px 16px; background: #007acc; color: white; border: none; border-radius: 4px; cursor: pointer;">Run Demo</button>
                    </div>
                </div>
                ${config.example ? this.generateExampleBox(config.example) : ''}
            </div>`;
    }

    /**
     * Generate individual input element
     */
    generateInputElement(input) {
        const commonStyles = 'padding: 8px; border: 1px solid #ddd; border-radius: 4px;';
        
        switch (input.type) {
            case 'number':
                return `
                    <div>
                        <label for="${input.id}" style="display: block; margin-bottom: 5px;">${input.label}</label>
                        <input type="number" id="${input.id}" ${input.min ? `min="${input.min}"` : ''} ${input.max ? `max="${input.max}"` : ''} value="${input.defaultValue || ''}" style="${commonStyles} width: ${input.width || '80px'};">
                    </div>`;
            case 'text':
                return `
                    <div>
                        <label for="${input.id}" style="display: block; margin-bottom: 5px;">${input.label}</label>
                        <input type="text" id="${input.id}" value="${input.defaultValue || ''}" style="${commonStyles} width: ${input.width || '200px'};">
                    </div>`;
            case 'range':
                return `
                    <div>
                        <label for="${input.id}" style="display: block; margin-bottom: 5px;">${input.label}</label>
                        <input type="range" id="${input.id}" min="${input.min || 1}" max="${input.max || 100}" value="${input.defaultValue || 50}" style="${commonStyles} width: ${input.width || '120px'};">
                    </div>`;
            default:
                return `<!-- Unsupported input type: ${input.type} -->`;
        }
    }

    /**
     * Generate example box if provided
     */
    generateExampleBox(example) {
        return `
                <div style="margin-top: 10px; padding: 10px; background: #f0f8ff; border-radius: 4px; font-size: 0.9em;">
                    <strong>Example:</strong> ${example}
                </div>`;
    }

    /**
     * Generate output section
     */
    generateOutputSection(config) {
        return `
            <div class="output-section" style="background: #fff; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h3>Result</h3>
                <div id="error-message" style="display: none; color: #dc3545; background: #f8d7da; border: 1px solid #f5c6cb; padding: 10px; border-radius: 4px; margin-bottom: 10px;"></div>
                <div id="result" style="font-family: monospace; font-size: 1.2rem; padding: 10px; background: #f8f9fa; border-radius: 4px; word-wrap: break-word; word-break: break-all; line-height: 1.4;"></div>
            </div>`;
    }

    /**
     * Generate visualization section if enabled
     */
    generateVisualizationSection(config) {
        return `
            <div id="visualization-section" style="background: #fff; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); display: none;">
                <h3>Step-by-Step Visualization</h3>
                <div id="array-visualization" style="margin-bottom: 20px;"></div>
                <div id="steps-container"></div>
            </div>`;
    }

    /**
     * Generate source code section
     */
    generateSourceCodeSection(config) {
        return `
            <!-- Source Code Link -->
            <div class="source-code-section" style="background: #fff; padding: 10px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); font-size: 0.85em;">
                <h4>Source Code</h4>
                <p>View the complete implementation on GitHub:</p>
                <a href="${config.githubPath}"
                   target="_blank" 
                   style="display: inline-block; padding: 8px 16px; background: #007acc; color: white; text-decoration: none; border-radius: 4px; font-weight: 500;">📂 View on GitHub</a>
            </div>`;
    }

    /**
     * Generate footer section
     */
    generateFooter() {
        return `
    <footer>
        <div class="footer-content">
            <div class="footer-line">Built with ❤️</div>
            <div class="footer-line">© <span id="footer-year">2025</span> <a href="https://github.com/sachinlala" target="_blank">Sachin Lala</a> • <a href="https://github.com/sachinlala/SimplifyLearning/blob/master/LICENSE" target="_blank">MIT License</a></div>
        </div>
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                const yearElement = document.getElementById('footer-year');
                if (yearElement) {
                    yearElement.textContent = new Date().getFullYear();
                }
            });
        </script>
    </footer>`;
    }

    /**
     * Generate explanation accordion section
     */
    generateExplanationSection(config) {
        const steps = config.explanation.steps ? 
            config.explanation.steps.map(step => `<li>${step}</li>`).join('\n                        ') : 
            '';

        return `
            <!-- Explanation using Accordion -->
            <div class="accordion">
                <div class="accordion-header">
                    <h3 class="accordion-title">How it works</h3>
                    <span class="accordion-icon">▼</span>
                </div>
                <div class="accordion-content">
                    <p>${config.explanation.description}</p>
                    ${steps ? `<ol class="step-list">\n                        ${steps}\n                    </ol>` : ''}
                </div>
            </div>`;
    }

    /**
     * Generate JavaScript section
     */
    generateScripts(config) {
        return `
    <script src="${config.componentsPath || '../../../assets/js/components.js'}"></script>
    <script src="${config.unifiedThemeManagerPath || '../../../assets/js/unified-theme-manager.js'}"></script>
    <script src="${config.jsPath}"></script>
    <script>
        ${this.generateDemoFunction(config)}
        ${this.generateUtilityFunctions(config)}
        ${this.generateInitializationScript(config)}
    </script>`;
    }

    /**
     * Generate main demo function based on config
     */
    generateDemoFunction(config) {
        // This will be algorithm-specific, so we'll generate a basic template
        // and allow configs to override with custom logic
        if (config.customDemoFunction) {
            return config.customDemoFunction;
        }

        // Generate basic input gathering and validation
        const inputGathering = config.inputs.map(input => 
            `const ${input.id.replace('-', '_')} = ${input.type === 'number' ? 'parseInt(' : ''}document.getElementById('${input.id}').value${input.type === 'number' ? ')' : ''};`
        ).join('\n            ');

        return `
        function runDemo() {
            ${inputGathering}
            const resultContainer = document.getElementById('result');
            const errorContainer = document.getElementById('error-message');
            
            // Clear previous error
            errorContainer.innerHTML = '';
            errorContainer.style.display = 'none';
            
            try {
                // Call algorithm function - this needs to be implemented in the JS file
                const result = ${config.algorithmFunction || 'runAlgorithm'}(${config.inputs.map(input => input.id.replace('-', '_')).join(', ')});
                resultContainer.innerHTML = result;
            } catch (error) {
                showError(error.message);
            }
        }`;
    }

    /**
     * Generate utility functions
     */
    generateUtilityFunctions(config) {
        return `
        function showError(message) {
            const errorContainer = document.getElementById('error-message');
            errorContainer.innerHTML = \`⚠️ \${message}\`;
            errorContainer.style.display = 'block';
        }
        
        function wrapLongText(text) {
            // Insert spaces every 50 characters to allow wrapping
            return text.replace(/(.{50})/g, '$1 ');
        }`;
    }


    /**
     * Generate initialization script
     */
    generateInitializationScript(config) {
        return `
        // Initialize demo
        document.addEventListener('DOMContentLoaded', () => {
            ${config.autoRun !== false ? '// Generate initial result\n            runDemo();' : ''}
        });
        
        ${config.autoRun !== false ? '// Generate initial result on load\n        runDemo();' : ''}`;
    }

    /**
     * Generate CSS styles
     */
    generateStyles(config) {
        return `
    <style>
        /* Dark mode styles */
        body.dark-mode {
            background-color: #1a1a1b;
            color: #d7dadc;
        }
        
        body.dark-mode .input-section,
        body.dark-mode .output-section,
        body.dark-mode .accordion,
        body.dark-mode div[style*="background: #fff"] {
            background-color: #272729 !important;
            color: #d7dadc;
        }
        
        body.dark-mode .accordion-header {
            background-color: #343536 !important;
        }
        
        body.dark-mode .code-viewer {
            background-color: #1e1e1e !important;
            color: #d4d4d4;
        }
        
        body.dark-mode #result {
            background-color: #1e1e1e !important;
            color: #d4d4d4;
        }
        
        body.dark-mode input {
            background-color: #1e1e1e;
            color: #d7dadc;
            border-color: #444;
        }
        
        body.dark-mode .step-list li {
            background-color: #272729;
            color: #d7dadc;
            border-color: #404040;
        }
        
        /* Fix dark mode title visibility */
        body.dark-mode h1,
        body.dark-mode h2,
        body.dark-mode h3,
        body.dark-mode .accordion-title {
            color: #d7dadc !important;
        }
        
        body.dark-mode #error-message {
            background-color: #3d1a1a !important;
            border-color: #5a2d2d !important;
            color: #ff6b6b !important;
        }
        
        /* Fix dark mode example section */
        body.dark-mode div[style*="background: #f0f8ff"] {
            background-color: #2a2a2b !important;
            color: #d7dadc !important;
            border: 1px solid #444 !important;
        }
        
        /* Dark mode for problem description section */
        body.dark-mode .problem-description {
            background-color: #272729 !important;
            color: #d7dadc;
        }
        
        body.dark-mode .problem-description h2 {
            color: #d7dadc !important;
        }
        
        body.dark-mode .problem-description p {
            color: #c1c1c1 !important;
        }
        
        /* Dark mode for header elements */
        body.dark-mode header {
            background-color: #272729 !important;
        }
        
        body.dark-mode .header-left img {
            opacity: 0.9;
        }
        
        body.dark-mode .nav-logo {
            color: #d7dadc !important;
        }
        
        body.dark-mode .nav-algorithms a {
            color: #c1c1c1 !important;
        }
        
        body.dark-mode .nav-algorithms a:hover {
            background-color: #343536 !important;
            color: #d7dadc !important;
        }
        
        /* Light mode styles for new components */
        .problem-description {
            max-width: 800px;
            margin: 0 auto 20px auto;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .problem-description h2 {
            margin: 0 0 10px 0;
            color: #333;
            font-size: 1.5rem;
            font-weight: 500;
        }

        .problem-description p {
            margin: 0;
            color: #555;
            line-height: 1.6;
            font-size: 1rem;
        }

        footer {
            background-color: #444;
            color: white;
            text-align: center;
            padding: 15px;
            margin-top: auto;
        }

        footer a {
            color: #7cb3d9;
            text-decoration: none;
        }

        footer a:hover {
            color: #a3c7e0;
        }

        /* Smaller Source Code card */
        .source-code-section {
            background: #fff;
            border: 1px solid #ddd;
            padding: 10px;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            font-size: 0.85em;
        }

        .source-code-section h4 {
            margin: 0 0 8px 0;
            font-size: 1.1em;
        }

        .source-code-section p {
            margin: 0 0 10px 0;
            font-size: 0.9em;
        }

        /* Avatar alignment improvements */
        .header-left {
            display: flex;
            align-items: center;
        }

        .header-left img {
            width: 32px; 
            height: 32px; 
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 10px;
        }

        /* Dark mode variants mirroring home page palette */
        body.dark-mode .problem-description {
            background-color: #272729 !important;
            color: #d7dadc;
        }

        body.dark-mode .problem-description h2 {
            color: #d7dadc !important;
        }

        body.dark-mode .problem-description p {
            color: #c1c1c1 !important;
        }

        body.dark-mode footer {
            background-color: #272729 !important;
            color: #d7dadc;
        }

        body.dark-mode footer a {
            color: #7cb3d9 !important;
        }

        body.dark-mode footer a:hover {
            color: #a3c7e0 !important;
        }

        body.dark-mode .source-code-section {
            background-color: #272729 !important;
            color: #d7dadc;
            border-color: #444;
        }

        body.dark-mode .source-code-section h4 {
            color: #d7dadc !important;
        }

        body.dark-mode .source-code-section p {
            color: #c1c1c1 !important;
        }
        
        ${config.hasVisualization ? this.generateVisualizationStyles() : ''}
        ${config.customStyles || ''}
    </style>`;
    }

    /**
     * Generate visualization-specific styles
     */
    generateVisualizationStyles() {
        return `
        /* Visualization styles */
        body.dark-mode #visualization-section {
            background-color: #272729 !important;
            color: #d7dadc;
        }
        
        body.dark-mode #steps-container > div {
            background-color: #343536 !important;
            border-color: #555 !important;
            color: #d7dadc !important;
        }
        
        body.dark-mode #steps-container h4 {
            color: #d7dadc !important;
        }`;
    }
}

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AlgorithmTemplateGenerator;
} else if (typeof window !== 'undefined') {
    window.AlgorithmTemplateGenerator = AlgorithmTemplateGenerator;
}
