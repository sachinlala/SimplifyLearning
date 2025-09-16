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
        
        // Check for production deployment patterns
        // Pattern 1: /algorithms/demo.html (like designforlife.co.in/algorithms/demo.html)
        const algorithmsLegacyIndex = pathParts.findIndex(part => part === 'algorithms');
        if (algorithmsLegacyIndex !== -1) {
            // We're in a production deployment where 'algorithms' folder contains the algorithms-js content
            return pathParts.slice(0, algorithmsLegacyIndex + 1).join('/');
        }
        
        // Pattern 2: Check if we're at domain root serving algorithms-js content
        // Look for demo.html in current path
        if (this.currentPath.includes('demo.html')) {
            // Extract the directory containing demo.html
            const demoIndex = pathParts.findIndex(part => part === 'demo.html');
            if (demoIndex > 0) {
                return pathParts.slice(0, demoIndex).join('/');
            }
        }
        
        // Local development fallback - assume we're at the root
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
            configPath: `${parts[2]}.config.js`,
            jsPath: `${parts[2]}.js`
        };
    }

    /**
     * Dynamically load the algorithm's config.js file
     */
    async loadConfig() {
        const algorithmInfo = this.getAlgorithmInfo();
        
        try {
            // Create a script element to load config file from the algorithm directory
            const configPath = this.buildPath(`${algorithmInfo.fullPath}/${algorithmInfo.configPath}`);
            return this.loadConfigFile(configPath, algorithmInfo);
        } catch (error) {
            throw new Error(`Failed to load configuration: ${error.message}`);
        }
    }
    
    /**
     * Load a specific config file
     */
    loadConfigFile(configPath, algorithmInfo) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = configPath;
            
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
                    reject(new Error(`Could not find configuration object in ${configPath}`));
                }
            };
            
            script.onerror = () => {
                reject(new Error(`Failed to load ${configPath}`));
            };
            
            document.head.appendChild(script);
        });
    }

    /**
     * Convert kebab-case to camelCase
     */
    toCamelCase(str) {
        return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
    }

    /**
     * Build proper path, avoiding double slashes
     */
    buildPath(relativePath) {
        if (!this.basePath || this.basePath === '') {
            return relativePath;
        }
        // Remove leading slash from relativePath if basePath exists
        const cleanRelativePath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
        // Ensure basePath doesn't end with slash before joining
        const cleanBasePath = this.basePath.endsWith('/') ? this.basePath.slice(0, -1) : this.basePath;
        return `${cleanBasePath}/${cleanRelativePath}`;
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
     * Generate error screen HTML with header and footer
     */
    generateErrorScreen(algorithmInfo, error) {
        const algorithmDisplayName = algorithmInfo.algorithmName
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error - ${algorithmDisplayName} Demo</title>
    <link rel="stylesheet" href="${this.basePath || '../../../'}/assets/css/styles.css">
</head>
<body>
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
            <a href="${this.basePath || '../../../'}/index.html" class="home-link">
                <img src="${this.basePath || '../../../'}/assets/images/sl-logo.svg" alt="SimplifyLearning" style="width: 32px; height: 32px;">
            </a>
        </div>
        <div class="header-right">
            <a href="${this.basePath || '../../../'}/index.html" class="back-to-home desktop-only">
                🏠 Home
            </a>
            <button id="global-theme-toggle" class="theme-toggle-btn">
                🌙
            </button>
        </div>
    </header>
    
    <main style="min-height: calc(100vh - 140px); display: flex; justify-content: center; align-items: center; font-family: Arial, sans-serif;">
        <div style="text-align: center; color: #dc3545; background: #fff; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); max-width: 500px;">
            <h2 style="color: #dc3545; margin-bottom: 20px;">Failed to Load Demo</h2>
            <p style="margin-bottom: 15px; color: #333;">There was an error loading the ${algorithmDisplayName} demo.</p>
            <p style="font-size: 14px; color: #666; background: #f8f9fa; padding: 10px; border-radius: 4px; font-family: monospace; margin-bottom: 20px;">${error.message}</p>
            <a href="${this.basePath || '../../../'}/index.html" style="display: inline-block; padding: 12px 24px; background: #007acc; color: white; text-decoration: none; border-radius: 4px; font-weight: 500; transition: background 0.3s ease;">← Back to Home</a>
        </div>
    </main>
    
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
    </footer>
    
    <script src="${this.basePath || '../../../'}/assets/js/unified-theme-manager.js"></script>
    <script src="${this.basePath || '../../../'}/assets/js/sidebar.js"></script>
</body>
</html>`;
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
            const templatePath = this.buildPath('assets/js/dynamic-template.js');
            await this.loadScript(templatePath);
            
            // Load utils.js immediately after dynamic template to ensure utilities are available
            const utilsPath = this.buildPath('assets/js/utils.js');
            await this.loadScript(utilsPath);
            
            // Verify utility functions are available in global scope
            await this.verifyDependencies();
            
            // Load algorithm configuration
            const config = await this.loadConfig();
            
            // Attempt to load category-specific utilities before core (e.g., SortingUtils for sort)
            try {
                const algoInfo = this.getAlgorithmInfo();
                if (algoInfo.category === 'sort') {
                    const sortUtilsPath = this.buildPath('src/sort/utils/sorting-utils.js');
                    await this.loadScript(sortUtilsPath);
                    console.log('✅ Loaded sorting utilities');
                }
            } catch (e) {
                console.warn('⚠️ Could not load category utilities:', e.message);
            }
            
            // Load core algorithm file first (if it exists)
            const coreJsPath = algorithmInfo.jsPath.replace('.js', '-core.js');
            const fullCoreJsPath = this.buildPath(`${algorithmInfo.fullPath}/${coreJsPath}`);
            
            try {
                await this.loadScript(fullCoreJsPath);
                console.log(`✅ Core algorithm loaded: ${coreJsPath}`);
            } catch (error) {
                console.log(`ℹ️  No core file found: ${coreJsPath} (this is optional)`);
            }
            
            // Load main algorithm JavaScript file
            const jsPath = this.buildPath(`${algorithmInfo.fullPath}/${algorithmInfo.jsPath}`);
            await this.loadScript(jsPath);
            
            // Create template generator and generate HTML
            const template = new DynamicAlgorithmTemplate();
            
            // Pass base path information to config
            config.basePath = this.basePath;
            
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
     * Load external script with enhanced error reporting
     */
    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => {
                console.log(`✅ Successfully loaded: ${src}`);
                resolve();
            };
            script.onerror = () => {
                const error = new Error(`Failed to load script: ${src}`);
                console.error(`❌ ${error.message}`);
                reject(error);
            };
            document.head.appendChild(script);
        });
    }
    
    /**
     * Verify that all required utility functions are available in global scope
     */
    async verifyDependencies() {
        const requiredUtilities = [
            'parseArray',
            'isSorted', 
            'measureTime',
            'generateRandomArray',
            'generateRandomSortedArray',
            'getMax',
            'getMin',
            'calculateBarHeight',
            'generateBarStyle',
            'wrapLongText',
            'formatNumber',
            'debounce',
            'copyToClipboard'
        ];
        
        const missingUtilities = [];
        
        for (const utilName of requiredUtilities) {
            if (typeof window[utilName] !== 'function') {
                missingUtilities.push(utilName);
            }
        }
        
        if (missingUtilities.length > 0) {
            const error = new Error(
                `Missing required utility functions: ${missingUtilities.join(', ')}. ` +
                'Please ensure utils.js is properly loaded and all functions are exported to the global scope.'
            );
            console.error('❌ Dependency verification failed:', error.message);
            throw error;
        }
        
        console.log('✅ All utility functions are available in global scope');
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
