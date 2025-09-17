/**
 * Modular Dynamic Template System - Module Loader & Backward Compatibility
 * 
 * This file replaces the monolithic dynamic-template.js with a modular architecture.
 * It loads all the split modules and provides backward compatibility.
 * 
 * Architecture:
 * - PathGenerator: URL and path generation utilities  
 * - SourceCodeHandler: GitHub links and source code sections
 * - TemplateManager: Main orchestrator (replaces DynamicAlgorithmTemplate)
 * - HtmlSections: Header, footer, hero, problem sections (embedded)
 * - InputGenerators: Input forms and data toggles (embedded) 
 * - ContentGenerators: Content sections and explanations (embedded)
 * - ScriptStyleGenerators: Scripts and styles generation (embedded)
 * 
 * @see https://github.com/sachinlala/SimplifyLearning
 */

// Embedded modules to reduce HTTP requests while maintaining separation of concerns

// ===== PATH GENERATOR MODULE =====
class PathGenerator {
    static buildAssetPath(config, relativePath) {
        if (config.basePath) {
            return `${config.basePath}/${relativePath}`;
        }
        return relativePath;
    }

    static generateGithubPath(config) {
        const algorithmSlug = config.name.toLowerCase().replace(/\\s+/g, '-');
        const coreFileName = `${algorithmSlug}-core.js`;
        const fileName = config.jsPath || coreFileName;
        const primaryCategory = Array.isArray(config.category) ? config.category[0] : config.category;
        return `https://github.com/sachinlala/SimplifyLearning/blob/master/algorithms-js/src/${primaryCategory}/${algorithmSlug}/${fileName}`;
    }

    static generateJavaPath(config) {
        const primaryCategory = Array.isArray(config.category) ? config.category[0] : config.category;
        const algorithmName = config.name.toLowerCase().replace(/\\s+/g, '');
        return `https://github.com/sachinlala/SimplifyLearning/tree/master/algorithms-java/src/main/java/com/sl/algorithms/${primaryCategory}/${algorithmName}`;
    }

    static generateDynamicAlgorithmsHomeUrl(config) {
        if (config.basePath) {
            return config.basePath + '/';
        }
        return '../../../index.html';
    }
    
    static generateAlgorithmsHomeUrl(config) {
        if (config.basePath) {
            return `${config.basePath}/index.html`;
        }
        return '../../../index.html';
    }

    static generateFaviconPath(config, size = '') {
        const basePath = config.basePath || '../../../';
        const sizeStr = size ? `-${size}` : '';
        const extension = size ? '.png' : '.ico';
        return `${basePath}/assets/favicon/favicon${sizeStr}${extension}`;
    }

    static generateCSSPath(config) {
        return config.basePath ? `${config.basePath}/assets/css/styles.css` : config.cssPath;
    }

    static generateVendorPath(config, script = '') {
        const basePath = config.basePath || '../../../';
        const scriptPath = script ? `/${script}` : '';
        return `${basePath}/assets/vendor/prism${scriptPath}`;
    }

    static generateScriptPaths(config) {
        const basePath = config.basePath || '../../../';
        return {
            unifiedThemeManager: `${basePath}/assets/js/unified-theme-manager.js`,
            sidebar: `${basePath}/assets/js/sidebar.js`,
            components: config.componentsPath || `${basePath}/assets/js/components.js`,
            utils: `${basePath}/assets/js/utils.js`
        };
    }

    static isSortingAlgorithm(category) {
        if (typeof category === 'string') {
            return category === 'sort';
        }
        if (Array.isArray(category)) {
            return category.includes('sort');
        }
        return false;
    }

    static generateLogoPath(config) {
        const basePath = config.basePath || '../../../';
        return `${basePath}/assets/images/sl-logo.svg`;
    }
}

// ===== SOURCE CODE HANDLER MODULE =====
class SourceCodeHandler {
    static generateSourceCodeSection(config) {
        const sourceCode = config.sourceCode || {
            javascript: PathGenerator.generateGithubPath(config),
            java: PathGenerator.generateJavaPath(config),
            python: "",
            go: ""
        };
        
        const languages = [
            {
                name: 'JavaScript',
                icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" fill="#F7DF1E" rx="3"/><path d="m18.42 15.28-.96 1.73a4.56 4.56 0 01-3.82 1.59 4 4 0 01-4.19-4v-3.92H8v-1.6h6.19v1.6h-1.43v3.92a2.42 2.42 0 002.5 2.59 3 3 0 002.38-1.18l.96-1.73zm-8.76-.7H5.31v-1.6h4.35v1.6z" fill="#000"/></svg>`,
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
                <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px;">
                    ${languageLinks}
                </div>
            </div>`;
    }
}

// ===== TEMPLATE MANAGER (MAIN ORCHESTRATOR) =====
class TemplateManager {
    constructor() {
        this.baseConfig = this.getBaseConfig();
    }

    getBaseConfig() {
        return {
            cssPath: "../../../assets/css/styles.css",
            componentsPath: "../../../assets/js/components.js",
            backPath: "../../../index.html",
            hasVisualization: false
        };
    }

    mergeConfig(algorithmConfig) {
        return {
            ...this.baseConfig,
            ...algorithmConfig,
            title: algorithmConfig.title || `${algorithmConfig.name} Demo`,
            cssPath: algorithmConfig.cssPath || this.baseConfig.cssPath,
            jsPath: algorithmConfig.jsPath || `${algorithmConfig.name.toLowerCase().replace(/\\s+/g, '-')}.js`,
            githubPath: algorithmConfig.githubPath || PathGenerator.generateGithubPath(algorithmConfig)
        };
    }

    validateConfig(config) {
        const required = ['name', 'category', 'problem'];
        const missing = required.filter(prop => !config[prop]);
        
        if (missing.length > 0) {
            throw new Error(`Missing required config properties: ${missing.join(', ')}`);
        }

        if (Array.isArray(config.category)) {
            if (config.category.length === 0) {
                throw new Error('Category array cannot be empty');
            }
        } else if (typeof config.category !== 'string') {
            throw new Error('Category must be a string or non-empty array');
        }
    }
    
    isSortingAlgorithm(category) {
        if (typeof category === 'string') {
            return category === 'sort';
        }
        if (Array.isArray(category)) {
            return category.includes('sort');
        }
        return false;
    }

    // Simplified HTML generation methods (embedded for efficiency)
    generateHeader(config) {
        return `
    <header>
        <div class="header-left">
            <button id="hamburger-menu" class="hamburger-btn mobile-first">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <a href="${PathGenerator.generateAlgorithmsHomeUrl(config)}" class="home-link desktop-adjacent">
                <img src="${PathGenerator.generateLogoPath(config)}" alt="SimplifyLearning" style="width: 32px; height: 32px;">
            </a>
            <a href="https://github.com/sachinlala/SimplifyLearning" target="_blank" class="github-link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.30.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.30 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
            </a>
        </div>
        <div class="header-center mobile-only">
            <a href="${PathGenerator.generateAlgorithmsHomeUrl(config)}" class="home-link">
                <img src="${PathGenerator.generateLogoPath(config)}" alt="SimplifyLearning" style="width: 32px; height: 32px;">
            </a>
        </div>
        <div class="header-right">
            <a href="${PathGenerator.generateAlgorithmsHomeUrl(config)}" class="back-to-home desktop-only">
                🏠 Home
            </a>
            ${this.isSortingAlgorithm(config.category) ? `<a href="${config.basePath ? `${config.basePath}/docs/sorting-algorithms.html` : '../../../docs/sorting-algorithms.html'}" class="back-to-summary desktop-only" style="padding: 8px 16px; background: rgba(255,255,255,0.2); color: #333; text-decoration: none; border-radius: 4px; transition: all 0.3s ease; margin-right: 10px;">📊 Sorting Algorithms</a>` : ''}
            <div class="theme-slider-container">
                <label class="theme-slider" for="global-theme-toggle">
                    <input type="checkbox" id="global-theme-toggle" class="theme-toggle-input">
                    <span class="slider">
                        <span class="slider-icon sun">☀️</span>
                        <span class="slider-icon moon">🌙</span>
                        <span class="slider-thumb"></span>
                    </span>
                </label>
            </div>
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
                    <a href="${PathGenerator.generateAlgorithmsHomeUrl(config)}" class="mobile-back-home" style="display: block; padding: 12px; background: #007acc; color: white; text-decoration: none; border-radius: 6px; margin-bottom: 10px; text-align: center; font-weight: 500;">🏠 Back to Home</a>
                    ${this.isSortingAlgorithm(config.category) ? `<a href="${config.basePath ? `${config.basePath}/docs/sorting-algorithms.html` : '../../../docs/sorting-algorithms.html'}" class="mobile-back-summary" style="display: block; padding: 12px; background: #28a745; color: white; text-decoration: none; border-radius: 6px; margin-bottom: 10px; text-align: center; font-weight: 500;">📊 Sorting Algorithms</a>` : ''}
                    <button id="mobile-theme-toggle" class="mobile-theme-btn" style="width: 100%; padding: 12px; background: #f8f9fa; color: #333; border: 1px solid #ddd; border-radius: 6px; cursor: pointer; font-weight: 500;">🌙 Toggle Theme</button>
                </div>
                <!-- Algorithm list will be populated by JavaScript -->
            </div>
        </div>
    </div>`;
    }

    generateHeroSection(config) {
        return `
        <section class="hero" style="padding: 20px 20px; min-height: auto;">
            <h1>${config.name}</h1>
        </section>`;
    }

    generateProblemSection(config) {
        return `
        <section class="problem-description">
            <p>${config.problem}</p>
        </section>`;
    }

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

    generateHTML(algorithmConfig) {
        const config = this.mergeConfig(algorithmConfig);
        this.validateConfig(config);
        
        const cssPath = PathGenerator.generateCSSPath(config);
        const vendorPath = PathGenerator.generateVendorPath(config);
        
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.title} - SimplifyLearning</title>
    <link rel="icon" type="image/x-icon" href="${PathGenerator.generateFaviconPath(config)}">
    <link rel="icon" type="image/png" sizes="16x16" href="${PathGenerator.generateFaviconPath(config, '16x16')}">
    <link rel="icon" type="image/png" sizes="32x32" href="${PathGenerator.generateFaviconPath(config, '32x32')}">
    <link rel="icon" type="image/png" sizes="48x48" href="${PathGenerator.generateFaviconPath(config, '48x48')}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${cssPath}">
    
    <!-- Prism.js for syntax highlighting -->
    <script src="${vendorPath}/prism.js"></script>
    <script src="${vendorPath}/prism-javascript.js"></script>
    <script src="${vendorPath}/prism-css.js"></script>
    <script src="${vendorPath}/prism-json.js"></script>
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
            ${SourceCodeHandler.generateSourceCodeSection(config)}
        </div>
    </main>
    
    ${this.generateFooter()}
    
    ${this.generateScripts(config)}
    ${this.generateStyles(config)}
</body>
</html>`;
    }

    // Embedded simplified methods for key functionality
    generateInputSection(config) {
        if (!config.inputs || config.inputs.length === 0) return '';
        
        const inputElements = config.inputs.map(input => {
            const commonStyles = 'padding: 8px; border: 1px solid #ddd; border-radius: 4px;';
            
            // Handle select dropdown inputs
            if (input.type === 'select' && input.options) {
                const options = input.options.map(option => 
                    `<option value="${option.value}" ${option.value === input.defaultValue ? 'selected' : ''}>${option.text}</option>`
                ).join('\n                            ');
                
                return `
                    <div>
                        <label for="${input.id}" style="display: block; margin-bottom: 5px;">${input.label}</label>
                        <select id="${input.id}" style="${commonStyles} width: ${input.width || '150px'};">
                            ${options}
                        </select>
                    </div>`;
            }
            
            // Handle regular text inputs
            return `
                    <div>
                        <label for="${input.id}" style="display: block; margin-bottom: 5px;">${input.label}</label>
                        <input type="${input.type || 'text'}" id="${input.id}" value="${input.defaultValue || ''}" style="${commonStyles} width: ${input.width || '80px'};">
                    </div>`;
        }).join('\n                    ');
        
        // Check for data type toggle
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

    generateOutputSection(config) {
        return `
            <div class="output-section" style="background: #fff; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h3>Result</h3>
                <div id="error-message" style="display: none; color: #dc3545; background: #f8d7da; border: 1px solid #f5c6cb; padding: 10px; border-radius: 4px; margin-bottom: 10px;"></div>
                <div id="result" style="font-family: monospace; font-size: 1.2rem; padding: 10px; background: #f8f9fa; border-radius: 4px; word-wrap: break-word; word-break: break-all; line-height: 1.4;"></div>
            </div>`;
    }

    generateVisualizationSection(config) {
        return `
            <div id="visualization-section" style="padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); display: none;" class="themed-section">
                <h3>Step-by-Step Visualization</h3>
                <div id="array-visualization" style="margin-bottom: 20px;"></div>
                <div id="steps-container"></div>
            </div>`;
    }

    generateExplanationSection(config) {
        if (!config.explanation) return '';
        
        const steps = config.explanation.steps ? 
            config.explanation.steps.map(step => `<li>${step}</li>`).join('\n                        ') : 
            '';

        return `
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

    generateScripts(config) {
        const scriptPaths = PathGenerator.generateScriptPaths(config);
        // Note: The universal loader handles script loading, so we don't include them in HTML
        // Only include the inline script with custom functions
        return `
    <script>
        ${config.customDemoFunction || 'function runDemo() { console.log("Demo function not implemented"); }'}
        
        function showError(message) {
            const errorContainer = document.getElementById('error-message');
            if (errorContainer) {
                errorContainer.innerHTML = message;
                errorContainer.style.display = 'block';
            }
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
        
        // Accordion functionality handled by UniversalLoader.initializeAccordion()
    </script>`;
    }

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
    
    generateExampleBox(example) {
        return `
                <div style="margin-top: 10px; padding: 10px; background: #f0f8ff; border-radius: 4px; font-size: 0.9em;">
                    <strong>Example:</strong> ${example}
                </div>`;
    }

    generateStyles(config) {
        return `
    <style>
        .accordion-header { cursor: pointer; padding: 15px; background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 4px; margin-bottom: 10px; }
        .accordion.active .accordion-content { display: block; }
        .accordion-content { display: none; padding: 15px; background: #fff; border: 1px solid #e9ecef; border-radius: 4px; margin-bottom: 10px; }
        .step-list { padding-left: 20px; }
        .viz-button { padding: 8px 16px; margin: 5px; border: none; border-radius: 4px; cursor: pointer; font-weight: 500; }
        .viz-button.start { background: #28a745; color: white; }
        .viz-button.pause { background: #ffc107; color: black; }
        .viz-button.reset { background: #dc3545; color: white; }
        .viz-button:disabled { opacity: 0.6; cursor: not-allowed; }
        .viz-legend { margin-top: 10px; font-size: 0.9em; color: #666; }
        .themed-section { background: var(--bg-color, #fff); color: var(--text-color, #333); }
        body.dark-mode .themed-section { background: var(--dark-bg-secondary, #2c2c2c); color: var(--dark-text, #f0f0f0); }
        /* Fix mobile header center visibility */
        @media (max-width: 768px) {
            .header-center.mobile-only {
                display: flex !important;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                align-items: center;
                justify-content: center;
            }
            .viz-legend-desktop { display: none !important; }
            .viz-legend-mobile { display: flex !important; flex-direction: column; gap: 5px; }
        }
    </style>`;
    }

    // Backward compatibility methods
    generateGithubPath(config) { return PathGenerator.generateGithubPath(config); }
    generateJavaPath(config) { return PathGenerator.generateJavaPath(config); }
    generateDynamicAlgorithmsHomeUrl(config) { return PathGenerator.generateDynamicAlgorithmsHomeUrl(config); }
    generateAlgorithmsHomeUrl(config) { return PathGenerator.generateAlgorithmsHomeUrl(config); }
    buildAssetPath(config, relativePath) { return PathGenerator.buildAssetPath(config, relativePath); }
    generateSourceCodeSection(config) { return SourceCodeHandler.generateSourceCodeSection(config); }
}

// For backward compatibility, create an alias
const DynamicAlgorithmTemplate = TemplateManager;

// Export for both environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TemplateManager, DynamicAlgorithmTemplate, PathGenerator, SourceCodeHandler };
} else if (typeof window !== 'undefined') {
    window.TemplateManager = TemplateManager;
    window.DynamicAlgorithmTemplate = DynamicAlgorithmTemplate;
    window.PathGenerator = PathGenerator;
    window.SourceCodeHandler = SourceCodeHandler;
}