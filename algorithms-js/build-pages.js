#!/usr/bin/env node

/**
 * Build Script for SimplifyLearning Algorithm Pages
 * 
 * This script generates uniform HTML pages for all algorithms based on their configuration files.
 * It eliminates code duplication and ensures consistent structure across all algorithm pages.
 */

const fs = require('fs');
const path = require('path');

// Import the template generator
const AlgorithmTemplateGenerator = require('./assets/js/algorithm-template-generator.js');

/**
 * Find all algorithm configuration files
 */
function findConfigFiles(dir) {
    const configFiles = [];
    
    function scanDirectory(currentDir) {
        const items = fs.readdirSync(currentDir);
        
        for (const item of items) {
            const fullPath = path.join(currentDir, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                scanDirectory(fullPath);
            } else if (item === 'config.js') {
                configFiles.push({
                    configPath: fullPath,
                    directory: path.dirname(fullPath)
                });
            }
        }
    }
    
    scanDirectory(dir);
    return configFiles;
}

/**
 * Load configuration from a file
 */
function loadConfig(configPath) {
    try {
        // Clear require cache to ensure fresh load
        delete require.cache[require.resolve(path.resolve(configPath))];
        return require(path.resolve(configPath));
    } catch (error) {
        console.error(`Error loading config from ${configPath}:`, error.message);
        return null;
    }
}

/**
 * Generate HTML file from configuration
 */
function generateHTMLFile(config, outputPath) {
    const generator = new AlgorithmTemplateGenerator();
    
    try {
        const html = generator.generateHTML(config);
        fs.writeFileSync(outputPath, html, 'utf8');
        return true;
    } catch (error) {
        console.error(`Error generating HTML for ${config.name}:`, error.message);
        return false;
    }
}

/**
 * Main build function
 */
function buildPages() {
    console.log('🔨 Building algorithm pages...\n');
    
    const srcDir = path.join(__dirname, 'src');
    const configFiles = findConfigFiles(srcDir);
    
    if (configFiles.length === 0) {
        console.log('⚠️  No configuration files found in src directory');
        return;
    }
    
    let successCount = 0;
    let totalCount = 0;
    
    for (const { configPath, directory } of configFiles) {
        totalCount++;
        
        console.log(`📄 Processing: ${path.relative(__dirname, configPath)}`);
        
        const config = loadConfig(configPath);
        if (!config) {
            console.log(`   ❌ Failed to load configuration`);
            continue;
        }
        
        // Determine output filename with 'generated-' prefix
        const algorithmName = path.basename(directory);
        const outputPath = path.join(directory, `generated-${algorithmName}.html`);
        
        // Generate HTML
        if (generateHTMLFile(config, outputPath)) {
            console.log(`   ✅ Generated: ${path.relative(__dirname, outputPath)}`);
            successCount++;
        } else {
            console.log(`   ❌ Failed to generate HTML`);
        }
    }
    
    console.log(`\n🎉 Build complete! ${successCount}/${totalCount} pages generated successfully.`);
    
    if (successCount > 0) {
        console.log('\n📋 Generated pages:');
        const configFiles2 = findConfigFiles(srcDir);
        for (const { directory } of configFiles2) {
            const algorithmName = path.basename(directory);
            const htmlPath = path.join(directory, `generated-${algorithmName}.html`);
            if (fs.existsSync(htmlPath)) {
                console.log(`   • ${path.relative(__dirname, htmlPath)}`);
            }
        }
    }
}

/**
 * Watch mode for development
 */
function watchMode() {
    console.log('👀 Watching for changes in configuration files...\n');
    
    const srcDir = path.join(__dirname, 'src');
    
    // Initial build
    buildPages();
    
    // Watch for changes
    fs.watch(srcDir, { recursive: true }, (eventType, filename) => {
        if (filename && filename.endsWith('config.js')) {
            console.log(`\n🔄 Configuration changed: ${filename}`);
            
            // Find and rebuild specific config
            const configPath = path.join(srcDir, filename);
            if (fs.existsSync(configPath)) {
                const config = loadConfig(configPath);
                if (config) {
                    const directory = path.dirname(configPath);
                    const algorithmName = path.basename(directory);
                    const outputPath = path.join(directory, `generated-${algorithmName}.html`);
                    
                    if (generateHTMLFile(config, outputPath)) {
                        console.log(`   ✅ Rebuilt: ${path.relative(__dirname, outputPath)}`);
                    } else {
                        console.log(`   ❌ Failed to rebuild`);
                    }
                }
            }
        }
    });
    
    console.log('\nPress Ctrl+C to stop watching...');
}

// Command line interface
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.includes('--watch') || args.includes('-w')) {
        watchMode();
    } else if (args.includes('--help') || args.includes('-h')) {
        console.log(`
SimplifyLearning Page Builder

Usage:
  node build-pages.js           Build all algorithm pages
  node build-pages.js --watch   Build pages and watch for changes
  node build-pages.js --help    Show this help message

This script generates HTML pages from algorithm configuration files located in the src/ directory.
Each algorithm should have a config.js file that defines its structure and behavior.
        `);
    } else {
        buildPages();
    }
}

module.exports = { buildPages, findConfigFiles, loadConfig, generateHTMLFile };
