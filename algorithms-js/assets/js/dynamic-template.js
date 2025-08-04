/**
 * Dynamic Algorithm Template System
 * 
 * This system dynamically generates HTML pages at runtime instead of pre-building them.
 * It provides better flexibility and eliminates the need for generated files.
 */

class DynamicAlgorithmTemplate {
    constructor() {
        this.baseConfig = this.getBaseConfig();
    }

    /**
     * Get base configuration that's common across all algorithms
     */
    getBaseConfig() {
        return {
            cssPath: "../../../assets/css/styles.css",
            componentsPath: "../../../assets/js/components.js",
            backPath: "../../../index.html",
            hasVisualization: false
        };
    }

    /**
     * Merge base config with algorithm-specific config
     */
    mergeConfig(algorithmConfig) {
        return {
            ...this.baseConfig,
            ...algorithmConfig,
            // Auto-generate title from name if not provided
            title: algorithmConfig.title || `${algorithmConfig.name} Demo`,
            // Ensure required paths are properly set
            cssPath: algorithmConfig.cssPath || this.baseConfig.cssPath,
            jsPath: algorithmConfig.jsPath || `${algorithmConfig.name.toLowerCase().replace(/\s+/g, '-')}.js`,
            githubPath: algorithmConfig.githubPath || this.generateGithubPath(algorithmConfig)
        };
    }

    /**
     * Auto-generate GitHub path based on algorithm info
     */
    generateGithubPath(config) {
        const fileName = config.jsPath || `${config.name.toLowerCase().replace(/\s+/g, '-')}.js`;
        // Use the first category for the GitHub path
        const primaryCategory = Array.isArray(config.category) ? config.category[0] : config.category;
        return `https://github.com/sachinlala/SimplifyLearning/blob/main/algorithms-js/src/${primaryCategory}/${config.name.toLowerCase().replace(/\s+/g, '-')}/${fileName}`;
    }

    /**
     * Generate complete HTML page
     */
    generateHTML(algorithmConfig) {
        const config = this.mergeConfig(algorithmConfig);
        this.validateConfig(config);
        
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.title} - SimplifyLearning</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${config.cssPath}">
    
    <!-- Prism.js for syntax highlighting -->
    <script src="../../../assets/vendor/prism/prism.js"></script>
    <script src="../../../assets/vendor/prism/prism-javascript.js"></script>
    <script src="../../../assets/vendor/prism/prism-css.js"></script>
    <script src="../../../assets/vendor/prism/prism-json.js"></script>
</head>
<body>
    ${this.generateHeader(config)}
    
    <main>
        ${this.generateHeroSection(config)}
        ${this.generateProblemSection(config)}
        ${this.generateExplanationSection(config)}
        
        <div class="demo-container" style="max-width: 1000px; margin: 0 auto; padding: 20px;">
            ${this.generateInputSection(config)}
            ${this.generateOutputSection(config)}
            ${config.hasVisualization ? this.generateVisualizationSection(config) : ''}
            ${this.generateSourceCodeSection(config)}
        </div>
    </main>
    
    ${this.generateFooter()}
    
    ${this.generateScripts(config)}
    ${this.generateStyles(config)}
</body>
</html>`;
    }

    /**
     * Validate required configuration properties
     */
    validateConfig(config) {
        const required = ['name', 'category', 'problem'];
        const missing = required.filter(prop => !config[prop]);
        
        if (missing.length > 0) {
            throw new Error(`Missing required config properties: ${missing.join(', ')}`);
        }

        // Validate category is either string or non-empty array
        if (Array.isArray(config.category)) {
            if (config.category.length === 0) {
                throw new Error('Category array cannot be empty');
            }
        } else if (typeof config.category !== 'string') {
            throw new Error('Category must be a string or array of strings');
        }

        if (!config.inputs || !Array.isArray(config.inputs)) {
            throw new Error('Config must include inputs array');
        }

        if (!config.explanation || !config.explanation.description) {
            throw new Error('Config must include explanation with description');
        }
    }

    /**
     * Generate header section
     */
    generateHeader(config) {
        return `
    <header>
        <div class="header-left">
            <button id="hamburger-menu" class="hamburger-btn">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <a href="https://github.com/sachinlala/SimplifyLearning" target="_blank" class="github-link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
            </a>
        </div>
        <div class="header-center">
            <a href="${config.backPath || '../../../index.html'}" class="home-link">
                <img src="../../../assets/images/sl-logo.svg" alt="SimplifyLearning" style="width: 32px; height: 32px;">
            </a>
        </div>
        <div class="header-right">
            <a href="${config.backPath || '../../../index.html'}" class="back-to-home desktop-only">
                🏠 Home
            </a>
            <button id="global-theme-toggle" class="theme-toggle-btn">
                🌙
            </button>
        </div>
    </header>
    
    <!-- Hamburger Menu Sidebar -->
    <div id="sidebar-overlay" class="sidebar-overlay">
        <div id="sidebar" class="sidebar">
            <div class="sidebar-header">
                <h3>Algorithms</h3>
                <button id="close-sidebar" class="close-btn">&times;</button>
            </div>
            <div class="sidebar-content">
                <!-- Mobile navigation controls -->
                <div class="mobile-nav-controls" style="padding: 15px; border-bottom: 1px solid #eee; margin-bottom: 10px;">
                    <a href="${config.backPath || '../../../index.html'}" class="mobile-back-home" style="display: block; padding: 12px; background: #007acc; color: white; text-decoration: none; border-radius: 6px; margin-bottom: 10px; text-align: center; font-weight: 500;">🏠 Back to Home</a>
                    <button id="mobile-theme-toggle" class="mobile-theme-btn" style="width: 100%; padding: 12px; background: #f8f9fa; color: #333; border: 1px solid #ddd; border-radius: 6px; cursor: pointer; font-weight: 500;">🌙 Toggle Theme</button>
                </div>
                <!-- Algorithm list will be populated by JavaScript -->
            </div>
        </div>
    </div>`;
    }

    /**
     * Generate hero section
     */
    generateHeroSection(config) {
        return `
        <section class="hero" style="padding: 20px 20px; min-height: auto;">
            <h1>${config.name}</h1>
        </section>`;
    }

    /**
     * Generate problem description section
     */
    generateProblemSection(config) {
        return `
        <section class="problem-description">
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
        const dataTypeToggleHtml = config.inputDataTypes ? this.generateDataTypeToggleInline(config.inputDataTypes) : '';
        
        return `
            <div class="input-section" style="background: #fff; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h3>Inputs</h3>
                <div style="display: flex; gap: 20px; flex-wrap: wrap; align-items: end;">
                    ${dataTypeToggleHtml}
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
            case 'select':
                const options = input.options ? input.options.map(opt => 
                    `<option value="${opt.value}" ${opt.value === input.defaultValue ? 'selected' : ''}>${opt.text}</option>`
                ).join('') : '';
                return `
                    <div>
                        <label for="${input.id}" style="display: block; margin-bottom: 5px;">${input.label}</label>
                        <select id="${input.id}" style="${commonStyles} width: ${input.width || '150px'};">
                            ${options}
                        </select>
                    </div>`;
            default:
                return `<!-- Unsupported input type: ${input.type} -->`
        }
    }

    /**
     * Generate data type toggle if provided
     */
    generateDataTypeToggle(inputDataTypes) {
        if (!inputDataTypes || !inputDataTypes.options || inputDataTypes.options.length === 0) {
            return '';
        }
        
        const toggleOptions = inputDataTypes.options.map((type) => {
            const isDefault = type.value === inputDataTypes.default;
            return `<option value="${type.value}" ${isDefault ? 'selected' : ''}>${type.label}</option>`;
        }).join('');
        
        return `
                <div style="margin-bottom: 15px; padding: 10px; background: #f8f9fa; border-radius: 4px; border: 1px solid #e9ecef;">
                    <label for="data-type-toggle" style="display: block; margin-bottom: 5px; font-weight: 500; color: #495057;">Input Data Type:</label>
                    <select id="data-type-toggle" onchange="handleDataTypeChange()" style="padding: 6px 12px; border: 1px solid #ced4da; border-radius: 4px; background: white; color: #495057; font-size: 0.9em; min-width: 120px;">
                        ${toggleOptions}
                    </select>
                    <small style="display: block; margin-top: 5px; color: #6c757d; font-size: 0.8em;">Toggle between different input data types for testing</small>
                </div>`;
    }

    /**
     * Generate inline data type toggle for flex layout
     */
    generateDataTypeToggleInline(inputDataTypes) {
        if (!inputDataTypes || !inputDataTypes.options || inputDataTypes.options.length === 0) {
            return '';
        }
        
        const toggleOptions = inputDataTypes.options.map((type) => {
            const isDefault = type.value === inputDataTypes.default;
            return `<option value="${type.value}" ${isDefault ? 'selected' : ''}>${type.label}</option>`;
        }).join('');
        
        return `
                    <div>
                        <label for="data-type-toggle" style="display: block; margin-bottom: 5px; font-weight: 500;">Input Data Type</label>
                        <select id="data-type-toggle" onchange="handleDataTypeChange()" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px; width: 140px;">
                            ${toggleOptions}
                        </select>
                    </div>`;
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
        // Use sourceCode paths if available, otherwise fallback to githubPath
        const sourceCode = config.sourceCode || {
            javascript: config.githubPath,
            java: "https://github.com/sachinlala/SimplifyLearning/tree/main/algorithms-java/src/main/java/com/algorithms",
            python: "",
            go: ""
        };
        
        // Language configurations with proper icons and more subtle colors
        const languages = [
            {
                name: 'JavaScript',
                icon: `<svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M0 0h256v256H0V0zm81.706 213.381c0 12.814-7.526 20.907-18.618 20.907-9.968 0-15.717-5.158-18.618-11.378l10.088-6.094c1.943 3.445 3.708 6.37 7.978 6.37 4.088 0 6.693-1.608 6.693-7.882v-42.669h12.477v61.646zm50.6 20.907c-11.565 0-19.056-5.503-22.732-12.814l10.088-5.837c2.644 4.315 6.092 7.526 12.12 7.526 5.085 0 8.345-2.532 8.345-6.04 0-4.2-3.348-5.68-8.978-8.134l-3.081-1.322c-8.887-3.784-14.787-8.535-14.787-18.573 0-9.24 7.04-16.28 18.056-16.28 7.844 0 13.471 2.733 17.522 9.887l-9.598 6.158c-2.111-3.784-4.385-5.269-7.924-5.269-3.606 0-5.895 2.287-5.895 5.269 0 3.686 2.289 5.178 7.587 7.465l3.081 1.322c10.473 4.496 16.373 9.106 16.373 19.454 0 11.146-8.75 17.177-20.478 17.177z"/></svg>`,
                url: sourceCode.javascript,
                background: '#fff3cd',
                color: '#856404',
                border: '#ffeaa7',
                enabled: true
            },
            {
                name: 'Java',
                icon: '☕',
                url: sourceCode.java,
                background: '#ffecd1', 
                color: '#d68910',
                border: '#f8c471',
                enabled: !!sourceCode.java
            },
            {
                name: 'Python',
                icon: `<svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z" fill="#306998"/><path d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z" fill="#FFD43B"/></svg>`,
                url: sourceCode.python,
                background: '#e8f4fd',
                color: '#2874a6',
                border: '#aed6f1',
                enabled: !!sourceCode.python
            },
            {
                name: 'Go',
                icon: `<svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M40.669 80.763v2.348c0 .653.461 1.192 1.073 1.307l35.24 6.652c.537.102 1.097-.216 1.239-.704l2.687-9.296c.142-.488-.197-1.018-.748-1.172l-35.249-9.835c-.551-.154-1.188.178-1.405.815l-2.837 9.885zm24.076 34.482h-.001c-11.292 0-20.451-8.801-20.451-19.656 0-10.855 9.159-19.656 20.451-19.656 11.293 0 20.451 8.801 20.451 19.656 0 10.855-9.158 19.656-20.45 19.656z" fill="#00ADD8"/><path d="M108.579 80.763v2.348c0 .653.461 1.192 1.073 1.307l35.24 6.652c.537.102 1.097-.216 1.239-.704l2.687-9.296c.142-.488-.197-1.018-.748-1.172l-35.249-9.835c-.551-.154-1.188.178-1.405.815l-2.837 9.885zm24.076 34.482h-.001c-11.292 0-20.451-8.801-20.451-19.656 0-10.855 9.159-19.656 20.451-19.656 11.293 0 20.451 8.801 20.451 19.656 0 10.855-9.158 19.656-20.45 19.656z" fill="#00ADD8"/></svg>`,
                url: sourceCode.go,
                background: '#e1f5fe',
                color: '#0288d1', 
                border: '#81d4fa',
                enabled: !!sourceCode.go
            }
        ];
        
        const languageLinks = languages.map(lang => {
            if (lang.enabled) {
                return `<a href="${lang.url}"
                           target="_blank" 
                           style="display: inline-flex; align-items: center; gap: 6px; padding: 8px 12px; background: ${lang.background}; color: ${lang.color}; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 0.85em; transition: all 0.3s ease; border: 1px solid ${lang.border || lang.background}; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                           ${lang.icon} ${lang.name}
                        </a>`;
            } else {
                return `<span style="display: inline-flex; align-items: center; gap: 6px; padding: 8px 12px; background: #f8f9fa; color: #6c757d; border-radius: 6px; font-weight: 500; font-size: 0.85em; cursor: not-allowed; opacity: 0.7; border: 1px solid #e9ecef; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                           ${lang.icon} <span style="text-decoration: line-through;">${lang.name}</span> <small>(Coming Soon)</small>
                        </span>`;
            }
        }).join('\n                    ');
        
        return `
            <!-- Source Code Links -->
            <div class="source-code-section" style="background: #fff; padding: 12px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); font-size: 0.85em;">
                <h4 style="margin: 0 0 8px 0; font-size: 1.1em;">Source Code</h4>
                <p style="margin: 0 0 10px 0; font-size: 0.9em;">View the complete implementation in multiple languages:</p>
                <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px;">
                    ${languageLinks}
                </div>
                <div style="margin-top: 8px; font-size: 0.75em; color: #666;">
                    <em>Note: Additional language implementations are in development.</em>
                </div>
            </div>`;
    }

    /**
     * Generate explanation accordion section
     */
    generateExplanationSection(config) {
        const steps = config.explanation.steps ? 
            config.explanation.steps.map(step => `<li>${step}</li>`).join('\n                        ') : 
            '';

        return `
            <!-- How it works section - positioned after problem description -->
            <div class="how-it-works-section" style="max-width: 800px; margin: 0 auto 20px auto;">
                <div class="accordion">
                    <div class="accordion-header">
                        <h3 class="accordion-title">How it works</h3>
                        <span class="accordion-icon">▼</span>
                    </div>
                    <div class="accordion-content">
                        <p>${config.explanation.description}</p>
                        ${steps ? `<ol class="step-list">\n                        ${steps}\n                    </ol>` : ''}
                    </div>
                </div>
            </div>`;
    }

    /**
     * Generate footer section
     */
    generateFooter() {
        return `
    <footer>
        <div class="footer-content">
            <div class="footer-line">
                <img src="https://avatars.githubusercontent.com/u/20021459?s=24&v=4" alt="Sachin Lala" class="footer-profile-img">
                Built with ❤️
            </div>
            <div class="footer-line">
                © 2025 <a href="https://github.com/sachinlala" target="_blank">Sachin Lala</a> • <a href="https://github.com/sachinlala/SimplifyLearning/blob/master/LICENSE" target="_blank">MIT License</a>
            </div>
        </div>
    </footer>`;
    }

    /**
     * Generate JavaScript section
     */
    generateScripts(config) {
        // Check if we're being loaded by the universal loader (algorithm JS already loaded)
        const isUniversalLoader = typeof window !== 'undefined' && window.UniversalAlgorithmLoader;
        const algorithmScriptTag = isUniversalLoader ? '' : `<script src="${config.jsPath}"></script>`;
        
        return `
    <script src="../../../assets/js/utils.js"></script>
    <script src="../../../assets/js/theme-toggle.js"></script>
    <script src="../../../assets/js/sidebar.js"></script>
    <script src="${config.componentsPath || '../../../assets/js/components.js'}"></script>
    
    <!-- Syntax highlighting theme toggle -->
    <script src="../../../assets/js/syntax-theme-toggle.js"></script>
    ${algorithmScriptTag}
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
            errorContainer.innerHTML = '⚠️ ' + message;
            errorContainer.style.display = 'block';
        }
        
        function wrapLongText(text) {
            // Insert spaces every 50 characters to allow wrapping
            return text.replace(/(.{50})/g, '$1 ');
        }
        
        // Data type toggle handler
        function handleDataTypeChange() {
            const dataTypeSelect = document.getElementById('data-type-toggle');
            if (!dataTypeSelect) return;
            
            const selectedType = dataTypeSelect.value;
            const config = window.algorithmConfig;
            
            if (config && config.inputDataTypes && config.inputDataTypes.options) {
                const typeConfig = config.inputDataTypes.options.find(type => type.value === selectedType);
                if (typeConfig && typeConfig.sampleData) {
                    // Update input fields with sample data
                    Object.keys(typeConfig.sampleData).forEach(inputId => {
                        const inputElement = document.getElementById(inputId);
                        if (inputElement) {
                            inputElement.value = typeConfig.sampleData[inputId];
                        }
                    });
                }
            }
        }
        `;
    }

    /**
     * Generate theme toggle script
     */
    generateThemeToggleScript() {
        return `
        // Dark/light mode toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const themeButton = document.getElementById('theme-toggle');
            if (document.body.classList.contains('dark-mode')) {
                themeButton.textContent = '☀️ Light Mode';
            } else {
                themeButton.textContent = '🌙 Dark Mode';
            }
        });`;
    }

    /**
     * Generate accordion script
     */
    generateAccordionScript() {
        return `
        // Accordion functionality
        document.addEventListener('DOMContentLoaded', () => {
            const accordionHeaders = document.querySelectorAll('.accordion-header');
            accordionHeaders.forEach(header => {
                header.addEventListener('click', () => {
                    const accordion = header.parentElement;
                    accordion.classList.toggle('active');
                });
            });
        });`;
    }

    /**
     * Generate initialization script
     */
    generateInitializationScript(config) {
        // Create a clean config object without functions for JSON serialization
        const cleanConfig = {
            name: config.name,
            inputDataTypes: config.inputDataTypes,
            inputs: config.inputs,
            hasVisualization: config.hasVisualization
        };
        
        // Safely embed JSON using string concatenation to avoid template literal issues
        const configString = JSON.stringify(cleanConfig);
        
        return [
            '        // Store config globally for data type functionality',
            '        window.algorithmConfig = ' + configString + ';',
            '        ',
            '        // Initialize demo',
            '        document.addEventListener(\'DOMContentLoaded\', () => {',
            '            // Initialize accordion after dynamic content load',
            '            const accordions = document.querySelectorAll(\'.accordion\');',
            '            accordions.forEach(accordion => {',
            '                if (window.SimplifyLearning && window.SimplifyLearning.Accordion) {',
            '                    new window.SimplifyLearning.Accordion(accordion);',
            '                } else {',
            '                    // Fallback manual initialization',
            '                    const header = accordion.querySelector(\'.accordion-header\');',
            '                    if (header) {',
            '                        header.addEventListener(\'click\', () => {',
            '                            accordion.classList.toggle(\'active\');',
            '                            const icon = accordion.querySelector(\'.accordion-icon\');',
            '                            if (icon) {',
            '                                icon.textContent = accordion.classList.contains(\'active\') ? \'\u25b2\' : \'\u25bc\';',
            '                            }',
            '                        });',
            '                    }',
            '                }',
            '            });',
            '        });',
            '        '
        ].join('\n');
    }

    /**
     * Generate CSS styles with dark mode support
     */
    generateStyles(config) {
        return `
    <style>
        /* CSS Palette Variables */
        :root {
            --bg-light: #F9F9F9;
            --surface-light: #FFFFFF;
            --text-primary-light: #1A1A1A;
            --text-body-light: #333333;
            --text-muted-light: #6B7280;
            --accent-light: #007AFF;
            
            /* Default to light mode values */
            --bg: var(--bg-light);
            --surface: var(--surface-light);
            --text-primary: var(--text-primary-light);
            --text-body: var(--text-body-light);
            --text-muted: var(--text-muted-light);
            --accent: var(--accent-light);
        }
        
        /* Dark mode styles */
        body.dark-mode {
            --bg-dark: #121212;
            --surface-dark: #1E1E1E;
            --text-primary-dark: #EAEAEA;
            --text-body-dark: #CCCCCC;
            --text-muted-dark: #888888;
            --accent-dark: #58A6FF;
            
            /* Override with dark mode values */
            --bg: var(--bg-dark);
            --surface: var(--surface-dark);
            --text-primary: var(--text-primary-dark);
            --text-body: var(--text-body-dark);
            --text-muted: var(--text-muted-dark);
            --accent: var(--accent-dark);
            
            background-color: var(--bg-dark);
            color: var(--text-body-dark);
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
        
        /* Dark mode for footer */
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
            gap: 10px;
        }

        .header-left img {
            width: 32px; 
            height: 32px; 
            border-radius: 50%;
            vertical-align: middle;
        }
        
        /* Header styling consistency with main page */
        header {
            background: linear-gradient(135deg, #87ceeb 0%, #b0e0e6 100%);
            padding: 10px 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
        }
        
        /* Header layout for desktop and mobile */
        .header-center {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            align-items: center;
        }
        
        .header-right {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        /* Theme toggle button styling */
        .theme-toggle-btn {
            padding: 8px 12px;
            background: rgba(255,255,255,0.2);
            color: #333;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1.2em;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .theme-toggle-btn:hover {
            background: rgba(255,255,255,0.3);
        }
        
        /* Fix back to home hover in light mode */
        .back-to-home {
            padding: 8px 16px;
            background: rgba(255,255,255,0.2);
            color: #333;
            text-decoration: none;
            border-radius: 4px;
            transition: all 0.3s ease;
        }
        
        .back-to-home:hover {
            background: rgba(255,255,255,0.4) !important;
            color: #000 !important;
        }
        
        /* Hero section vertical alignment */
        .hero {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            min-height: 120px;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }
        
        .hero h1 {
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        /* Footer consistency with header */
        footer {
            background: linear-gradient(135deg, #87ceeb 0%, #b0e0e6 100%);
            color: #333;
            text-align: center;
            padding: 15px;
            margin-top: auto;
        }

        footer a {
            color: #0066cc;
            text-decoration: none;
        }

        footer a:hover {
            color: #004499;
        }
        
        /* Footer profile image styling */
        .footer-profile-img {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 4px;
        }
        
        /* Professional top section color */
        .problem-description {
            max-width: 800px;
            margin: 0 auto 20px auto;
            padding: 20px;
            background: linear-gradient(135deg, #f1f3f4 0%, #e8eaf6 100%);
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.08);
            border-left: 4px solid #1976d2;
        }

        .problem-description h2 {
            margin: 0 0 10px 0;
            color: #1976d2;
            font-size: 1.5rem;
            font-weight: 500;
        }

        .problem-description p {
            margin: 0;
            color: #424242;
            line-height: 1.6;
            font-size: 1rem;
        }

        /* Desktop-only navigation */
        .desktop-only {
            display: flex;
        }
        
        /* Header right container */
        .header-right {
            display: flex;
            align-items: center;
        }

        /* Mobile responsive improvements */
        @media (max-width: 768px) {
            /* Hide desktop navigation in mobile */
            .desktop-only {
                display: none !important;
            }
            
            /* Mobile header layout */
            .algorithm-header {
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                padding: 12px 15px;
                height: auto;
                position: relative;
            }
            
            .header-left {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .header-right {
                display: flex;
                align-items: center;
            }
            
            /* Hamburger menu positioning */
            .hamburger-btn {
                position: relative;
                top: auto;
                right: auto;
            }
            
            /* Ensure hero section doesn't have extra padding */
            .hero {
                padding-top: 30px !important;
                min-height: 100px;
            }
            
            /* Reduce padding on mobile */
            .demo-container {
                padding: 10px;
            }
            
            .problem-description {
                margin: 0 10px 20px 10px;
                padding: 15px;
            }
        }
        
        /* Dark mode variants mirroring home page palette */
        body.dark-mode .problem-description {
            background: linear-gradient(135deg, #272729 0%, #2c3e50 100%) !important;
            color: #d7dadc;
            border-left-color: #74b9ff;
        }

        body.dark-mode .problem-description h2 {
            color: #74b9ff !important;
        }

        body.dark-mode .problem-description p {
            color: #c1c1c1 !important;
        }
        
        body.dark-mode header {
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%) !important;
        }
        
        body.dark-mode .back-to-home {
            background: rgba(255,255,255,0.1) !important;
            color: #d7dadc !important;
        }
        
        body.dark-mode .back-to-home:hover {
            background: rgba(255,255,255,0.2) !important;
            color: #ffffff !important;
        }
        
        body.dark-mode .hero {
            background: linear-gradient(135deg, #1a1a1b 0%, #272729 100%) !important;
        }

        body.dark-mode footer {
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%) !important;
            color: #d7dadc;
        }

        body.dark-mode footer a {
            color: #74b9ff !important;
        }

        body.dark-mode footer a:hover {
            color: #a3d5ff !important;
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
        
        /* Footer line styling */
        .footer-line {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 5px 0;
        }
        
        /* Dark mode data type toggle */
        body.dark-mode div[style*="background: #f8f9fa"] {
            background-color: #2a2a2b !important;
            color: #d7dadc !important;
            border-color: #444 !important;
        }
        
        body.dark-mode select {
            background-color: #1e1e1e !important;
            color: #d7dadc !important;
            border-color: #444 !important;
        }
        
        body.dark-mode .theme-toggle-btn {
            background: rgba(255,255,255,0.1) !important;
            color: #d7dadc !important;
        }
        
        body.dark-mode .theme-toggle-btn:hover {
            background: rgba(255,255,255,0.2) !important;
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
    module.exports = DynamicAlgorithmTemplate;
} else if (typeof window !== 'undefined') {
    window.DynamicAlgorithmTemplate = DynamicAlgorithmTemplate;
}
