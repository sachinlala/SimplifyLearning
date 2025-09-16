/**
 * Template Manager - Main Orchestrator for Dynamic Template System
 * 
 * This is the new main class that coordinates all the split modules.
 * It replaces the monolithic DynamicAlgorithmTemplate class.
 * 
 * @see https://github.com/sachinlala/SimplifyLearning
 */

class TemplateManager {
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
            githubPath: algorithmConfig.githubPath || PathGenerator.generateGithubPath(algorithmConfig)
        };
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
            throw new Error('Category must be a string or non-empty array');
        }
    }

    /**
     * Generate complete HTML page - Main orchestration method
     */
    generateHTML(algorithmConfig) {
        const config = this.mergeConfig(algorithmConfig);
        this.validateConfig(config);
        
        // Build dynamic paths based on basePath
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
    ${HtmlSections.generateHeader(config)}
    
    <main>
        ${HtmlSections.generateHeroSection(config)}
        ${HtmlSections.generateProblemSection(config)}
        ${ContentGenerators.generateExplanationSection(config)}
        
        <div class="demo-container" style="max-width: 1000px; margin: 0 auto; padding: 20px;">
            ${InputGenerators.generateInputSection(config)}
            ${ContentGenerators.generateOutputSection(config)}
            ${config.hasVisualization ? ContentGenerators.generateVisualizationSection(config) : ''}
            ${SourceCodeHandler.generateSourceCodeSection(config)}
        </div>
    </main>
    
    ${HtmlSections.generateFooter()}
    
    ${ScriptStyleGenerators.generateScripts(config)}
    ${ScriptStyleGenerators.generateStyles(config)}
    
    <!-- Fix mobile header center visibility -->
    <style>
        /* Override the !important rule for mobile header center */
        @media (max-width: 768px) {
            .header-center.mobile-only {
                display: flex !important;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                align-items: center;
                justify-content: center;
            }
        }
    </style>
</body>
</html>`;
    }
}

// For backward compatibility, create an alias
class DynamicAlgorithmTemplate extends TemplateManager {
    constructor() {
        super();
        // Maintain backward compatibility for any code that might directly reference the old methods
        this.generateGithubPath = PathGenerator.generateGithubPath;
        this.generateJavaPath = PathGenerator.generateJavaPath;
        this.generateDynamicAlgorithmsHomeUrl = PathGenerator.generateDynamicAlgorithmsHomeUrl;
        this.generateAlgorithmsHomeUrl = PathGenerator.generateAlgorithmsHomeUrl;
        this.isSortingAlgorithm = PathGenerator.isSortingAlgorithm;
        this.buildAssetPath = PathGenerator.buildAssetPath;
    }

    // Delegate methods to the appropriate modules for backward compatibility
    generateHeader(config) { return HtmlSections.generateHeader(config); }
    generateHeroSection(config) { return HtmlSections.generateHeroSection(config); }
    generateProblemSection(config) { return HtmlSections.generateProblemSection(config); }
    generateFooter() { return HtmlSections.generateFooter(); }
    generateInputSection(config) { return InputGenerators.generateInputSection(config); }
    generateOutputSection(config) { return ContentGenerators.generateOutputSection(config); }
    generateVisualizationSection(config) { return ContentGenerators.generateVisualizationSection(config); }
    generateSourceCodeSection(config) { return SourceCodeHandler.generateSourceCodeSection(config); }
    generateExplanationSection(config) { return ContentGenerators.generateExplanationSection(config); }
    generateScripts(config) { return ScriptStyleGenerators.generateScripts(config); }
    generateStyles(config) { return ScriptStyleGenerators.generateStyles(config); }
}

// Export for both environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TemplateManager, DynamicAlgorithmTemplate };
} else if (typeof window !== 'undefined') {
    window.TemplateManager = TemplateManager;
    window.DynamicAlgorithmTemplate = DynamicAlgorithmTemplate;
}