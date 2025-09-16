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
        }).join('\\n                    ');
        
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

    // Simplified HTML generation methods (embedded for efficiency)
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
            <a href="${PathGenerator.generateAlgorithmsHomeUrl(config)}" class="home-link">
                <img src="${PathGenerator.generateLogoPath(config)}" alt="SimplifyLearning" style="width: 32px; height: 32px;">
            </a>
        </div>
        <div class="header-right">
            <a href="${PathGenerator.generateAlgorithmsHomeUrl(config)}" class="back-to-home desktop-only">
                🏠 Home
            </a>
            <button id="global-theme-toggle" class="theme-toggle-btn">
                🌙
            </button>
        </div>
    </header>`;
    }

    generateHeroSection(config) {
        return `
        <!-- Hero Section -->
        <section class="hero">
            <div class="hero-content">
                <h1>${config.name}</h1>
                <p class="hero-description">${config.problem}</p>
            </div>
        </section>`;
    }

    generateProblemSection(config) {
        return `
        <!-- Problem Statement -->
        <div class="problem-section" style="max-width: 800px; margin: 20px auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3>Problem Statement</h3>
            <p>${config.problem}</p>
        </div>`;
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
            return `
                <div style="margin-bottom: 15px;">
                    <label for="${input.id}" style="display: block; margin-bottom: 5px; font-weight: 500;">${input.label}</label>
                    <input type="${input.type || 'text'}" 
                           id="${input.id}" 
                           value="${input.defaultValue || ''}" 
                           style="padding: 8px; border: 1px solid #ddd; border-radius: 4px; width: ${input.width || '200px'};">
                </div>`;
        }).join('');

        return `
            <div class="input-section" style="background: #fff; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h3>Input</h3>
                ${inputElements}
                <button onclick="runDemo()" style="background: #007acc; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-weight: 500; margin-top: 10px;">Run Demo</button>
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
            <div id="visualization-section" style="background: #fff; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); display: none;">
                <h3>Step-by-Step Visualization</h3>
                <div id="array-visualization" style="margin-bottom: 20px;"></div>
                <div id="steps-container"></div>
            </div>`;
    }

    generateExplanationSection(config) {
        if (!config.explanation) return '';
        
        const steps = config.explanation.steps ? 
            config.explanation.steps.map(step => `<li>${step}</li>`).join('\\n                        ') : 
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
                        ${steps ? `<ol class="step-list">\\n                        ${steps}\\n                    </ol>` : ''}
                    </div>
                </div>
            </div>`;
    }

    generateScripts(config) {
        const scriptPaths = PathGenerator.generateScriptPaths(config);
        return `
    <script src="${scriptPaths.utils}"></script>
    <script src="${scriptPaths.unifiedThemeManager}"></script>
    <script src="${scriptPaths.sidebar}"></script>
    <script src="${scriptPaths.components}"></script>
    <script src="${config.jsPath}"></script>
    <script>
        ${config.customDemoFunction || 'function runDemo() { console.log("Demo function not implemented"); }'}
        
        function showError(message) {
            const errorContainer = document.getElementById('error-message');
            if (errorContainer) {
                errorContainer.innerHTML = message;
                errorContainer.style.display = 'block';
            }
        }
    </script>`;
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
        @media (max-width: 768px) {
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
    isSortingAlgorithm(category) { return PathGenerator.isSortingAlgorithm(category); }
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