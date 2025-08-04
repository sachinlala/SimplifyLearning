/**
 * Universal Algorithm Loader
 * 
 * This universal loader can dynamically load any algorithm by:
 * 1. Detecting the algorithm path from the current URL
 * 2. Loading the appropriate config.js file
 * 3. Generating the HTML using the dynamic template system
 * 
 * This eliminates the need for duplicate index.html files in each algorithm directory.
 */

class UniversalAlgorithmLoader {
    constructor() {
        this.currentPath = window.location.pathname;
        this.urlParams = new URLSearchParams(window.location.search);
        this.basePath = this.detectBasePath();
        this.algorithmPath = this.detectAlgorithmPath();
    }

    /**
     * Detect the base path of the algorithms-js directory
     */
    detectBasePath() {
        const pathParts = this.currentPath.split('/');
        let algorithmsIndex = pathParts.findIndex(part => part === 'algorithms-js');
        
        if (algorithmsIndex !== -1) {
            return pathParts.slice(0, algorithmsIndex + 1).join('/');
        }
        
        // Check if we're serving from the algorithms-js root directory
        // by testing if common algorithm structure exists
        const testPaths = [
            '/src/sort/bubble-sort/bubble-sort.js',
            '/src/search/binary-search/binary-search.js',
            '/assets/js/dynamic-template.js'
        ];
        
        // If any of these paths exist, we're at the root
        // For local development, assume we're at the root if no algorithms-js in path
        return '';
    }

    /**
     * Detect the current algorithm path from URL parameters
     * e.g., demo.html?algo=patterns/count-and-say -> src/patterns/count-and-say
     */
    detectAlgorithmPath() {
        // First try URL parameter
        const algoParam = this.urlParams.get('algo');
        
        if (algoParam) {
            // Ensure it starts with 'src/'
            const result = algoParam.startsWith('src/') ? algoParam : `src/${algoParam}`;
            return result;
        }
        
        // Fallback to path-based detection for backward compatibility
        const pathParts = this.currentPath.split('/');
        let algorithmsIndex = pathParts.findIndex(part => part === 'algorithms-js');
        
        // Handle local paths where algorithms-js may not appear
        if (algorithmsIndex === -1) {
            const srcIndex = pathParts.indexOf('src');
            if (srcIndex !== -1) {
                // Get parts from 'src' onwards, filter out empty parts and 'index.html'
                const algorithmParts = pathParts.slice(srcIndex)
                    .filter(part => part && part !== 'index.html');
                
                if (algorithmParts.length >= 3) {
                    return algorithmParts.join('/');
                }
            }
        } else {
            // Get parts after algorithms-js, filter out empty parts and 'index.html'
            const algorithmParts = pathParts.slice(algorithmsIndex + 1)
                .filter(part => part && part !== 'index.html');
            
            if (algorithmParts.length >= 3) {
                return algorithmParts.join('/');
            }
        }
        
        throw new Error('Could not detect algorithm. Please use: demo.html?algo=category/algorithm-name');
    }

    /**
     * Get algorithm metadata from path
     */
    getAlgorithmInfo() {
        const parts = this.algorithmPath.split('/');
        
        if (parts.length < 3 || parts[0] !== 'src') {
            throw new Error('Invalid algorithm path. Expected format: src/category/algorithm-name');
        }
        
        return {
            category: parts[1],
            algorithmName: parts[2],
            fullPath: this.algorithmPath,
            configPath: `config.js`,
            jsPath: `${parts[2]}.js`
        };
    }

    /**
     * Dynamically load the algorithm's config.js file
     */
    async loadConfig() {
        const algorithmInfo = this.getAlgorithmInfo();
        
        try {
            // Create a script element to load config.js from the algorithm directory
            const script = document.createElement('script');
            const configPath = this.basePath ? `${this.basePath}/${algorithmInfo.fullPath}/config.js` : `${algorithmInfo.fullPath}/config.js`;
            script.src = configPath;
            
            return new Promise((resolve, reject) => {
                script.onload = () => {
                    // Try to find the config in window object
                    // Config files should export to window with a predictable name
                    const possibleNames = [
                        `${algorithmInfo.algorithmName.replace(/-/g, '')}Config`,
                        `${algorithmInfo.algorithmName.replace(/-/g, '').toLowerCase()}Config`,
                        `${this.toCamelCase(algorithmInfo.algorithmName)}Config`
                    ];
                    
                    let config = null;
                    for (const name of possibleNames) {
                        if (window[name]) {
                            config = window[name];
                            break;
                        }
                    }
                    
                    // Fallback: look for any config object in window
                    if (!config) {
                        const configKeys = Object.keys(window).filter(key => 
                            key.toLowerCase().includes('config') && 
                            typeof window[key] === 'object' &&
                            window[key] !== null
                        );
                        
                        if (configKeys.length > 0) {
                            config = window[configKeys[configKeys.length - 1]]; // Get the last one added
                        }
                    }
                    
                    if (config) {
                        resolve(config);
                    } else {
                        reject(new Error('Could not find configuration object in config.js'));
                    }
                };
                
                script.onerror = () => {
                    reject(new Error('Failed to load config.js'));
                };
                
                document.head.appendChild(script);
            });
            
        } catch (error) {
            throw new Error(`Failed to load configuration: ${error.message}`);
        }
    }

    /**
     * Convert kebab-case to camelCase
     */
    toCamelCase(str) {
        return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
    }

    /**
     * Generate loading screen HTML
     */
    generateLoadingScreen(algorithmInfo) {
        const algorithmDisplayName = algorithmInfo.algorithmName
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        return `
            <div id="loading" style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial, sans-serif;">
                <div style="text-align: center;">
                    <div style="margin-bottom: 20px; font-size: 18px;">Loading ${algorithmDisplayName} Demo...</div>
                    <div style="width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #007acc; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
                </div>
            </div>
            
            <style>
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        `;
    }

    /**
     * Generate error screen HTML
     */
    generateErrorScreen(algorithmInfo, error) {
        const algorithmDisplayName = algorithmInfo.algorithmName
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        return `
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial, sans-serif;">
                <div style="text-align: center; color: #dc3545;">
                    <h2>Failed to Load Demo</h2>
                    <p>There was an error loading the ${algorithmDisplayName} demo.</p>
                    <p style="font-size: 14px; color: #666;">${error.message}</p>
                    <a href="${this.basePath}/index.html" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background: #007acc; color: white; text-decoration: none; border-radius: 4px;">← Back to Home</a>
                </div>
            </div>
        `;
    }

    /**
     * Initialize the accordion functionality after HTML is generated
     */
    initializeAccordion() {
        setTimeout(() => {
            const accordions = document.querySelectorAll('.accordion');
            accordions.forEach(accordion => {
                const header = accordion.querySelector('.accordion-header');
                if (header && !header.hasAttribute('data-initialized')) {
                    header.setAttribute('data-initialized', 'true');
                    header.addEventListener('click', () => {
                        accordion.classList.toggle('active');
                        const icon = accordion.querySelector('.accordion-icon');
                        if (icon) {
                            icon.textContent = accordion.classList.contains('active') ? '▲' : '▼';
                        }
                    });
                }
            });
        }, 100);
    }

    /**
     * Main loader function
     */
    async load() {
        try {
            const algorithmInfo = this.getAlgorithmInfo();
            
            // Show loading screen
            document.body.innerHTML = this.generateLoadingScreen(algorithmInfo);
            
            // Load required scripts
            const templatePath = this.basePath ? `${this.basePath}/assets/js/dynamic-template.js` : `assets/js/dynamic-template.js`;
            await this.loadScript(templatePath);
            
            // Load algorithm configuration
            const config = await this.loadConfig();
            
            // Load algorithm JavaScript file
            const jsPath = this.basePath ? `${this.basePath}/${algorithmInfo.fullPath}/${algorithmInfo.jsPath}` : `${algorithmInfo.fullPath}/${algorithmInfo.jsPath}`;
            await this.loadScript(jsPath);
            
            // Create template generator and generate HTML
            const template = new DynamicAlgorithmTemplate();
            const html = template.generateHTML(config);
            
            // Replace document with generated HTML
            document.open();
            document.write(html);
            document.close();
            
            // Initialize accordion functionality
            this.initializeAccordion();
            
        } catch (error) {
            console.error('Error loading algorithm page:', error);
            
            try {
                const algorithmInfo = this.getAlgorithmInfo();
                document.body.innerHTML = this.generateErrorScreen(algorithmInfo, error);
            } catch (infoError) {
                document.body.innerHTML = this.generateErrorScreen({ algorithmName: 'Unknown' }, error);
            }
        }
    }

    /**
     * Load external script
     */
    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
            document.head.appendChild(script);
        });
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const loader = new UniversalAlgorithmLoader();
        loader.load();
    });
} else {
    const loader = new UniversalAlgorithmLoader();
    loader.load();
}

// Export for manual use if needed
window.UniversalAlgorithmLoader = UniversalAlgorithmLoader;
