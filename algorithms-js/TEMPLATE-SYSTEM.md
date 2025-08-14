# Algorithm Template System

This document explains the template system used to generate uniform HTML pages for algorithm demonstrations in SimplifyLearning.

## Overview

The template system eliminates code duplication across algorithm pages by generating HTML from configuration files. This ensures:
- **Consistency**: All algorithm pages have the same structure and styling
- **Maintainability**: Changes to the template affect all pages
- **Simplicity**: Adding new algorithms requires only a configuration file

## System Components

### 1. Template Generator (`assets/js/algorithm-template-generator.js`)
The main class that generates HTML from configuration objects. Features:
- Validates configuration properties
- Generates uniform HTML structure
- Supports customization through config options
- Handles different input types and visualization needs

### 2. Build Script (`build-pages.js`)
Node.js script that:
- Scans for `config.js` files in the `src/` directory
- Generates HTML files from configurations
- Provides watch mode for development
- Reports build status and errors

### 3. Configuration Files (`src/*/config.js`)
JSON-like objects that define algorithm page structure:
- Algorithm metadata (name, category, GitHub link)
- Input field definitions
- Explanation content
- Custom demo functions
- Styling overrides

## Quick Start

### Running the Application
```bash
# Serve the application (no build step required)
npm start

# Or for development
npm run dev

# Or manually serve
npm run serve
```

**Note:** With the dynamic template system, no build step is required. Pages are generated at runtime.

### Adding a New Algorithm

1. **Create the algorithm directory structure:**
   ```
   src/category/algorithm-name/
   ├── algorithm-name.js    # Algorithm implementation
   ├── algorithm-name.html  # Generated (don't edit manually)
   └── config.js           # Configuration file
   ```

2. **Create a configuration file** (`config.js`):
   ```javascript
   const config = {
       name: "Algorithm Name",
       title: "Algorithm Name Demo",
       category: "category",
       cssPath: "../../../assets/css/styles.css",
       jsPath: "algorithm-name.js",
       githubPath: "https://github.com/sachinlala/SimplifyLearning/blob/master/algorithms-js/src/category/algorithm-name/algorithm-name.js",
       algorithmFunction: "mainAlgorithmFunction",
       
       inputs: [
           {
               id: "input-id",
               type: "number", // or "text", "range"
               label: "Input Label",
               defaultValue: 10,
               min: 1,
               max: 100,
               width: "80px"
           }
       ],
       
       example: "Optional example text",
       
       explanation: {
           description: "How the algorithm works...",
           steps: [
               "Step 1 explanation",
               "Step 2 explanation"
           ]
       }
   };
   
   module.exports = config;
   ```

3. **Run the build script:**
   ```bash
   npm run build
   ```

The HTML file will be automatically generated in the same directory.

## Configuration Options

### Required Properties
- `name`: Display name of the algorithm
- `title`: HTML page title
- `category`: Algorithm category (patterns, search, sort, etc.)
- `cssPath`: Relative path to CSS file
- `jsPath`: Algorithm JavaScript file name
- `githubPath`: GitHub source code URL
- `inputs`: Array of input field configurations
- `explanation`: Object with description and steps

### Optional Properties
- `algorithmFunction`: Main function name (default: "runAlgorithm")
- `hasVisualization`: Enable visualization section (default: false)
- `autoRun`: Auto-run demo on load (default: true)
- `example`: Example text to show in input section
- `customDemoFunction`: Override default demo function
- `customStyles`: Additional CSS styles
- `backPath`: Custom back navigation path

### Input Field Types

#### Number Input
```javascript
{
    id: "number-input",
    type: "number",
    label: "Number Field",
    min: 1,
    max: 100,
    defaultValue: 10,
    width: "80px"
}
```

#### Text Input
```javascript
{
    id: "text-input", 
    type: "text",
    label: "Text Field",
    defaultValue: "1,2,3,4,5",
    width: "200px"
}
```

#### Range Input
```javascript
{
    id: "range-input",
    type: "range", 
    label: "Range Field",
    min: 1,
    max: 100,
    defaultValue: 50,
    width: "120px"
}
```

## Custom Demo Functions

For complex algorithms, you can provide a custom demo function:

```javascript
const config = {
    // ... other properties
    customDemoFunction: `
        function runDemo() {
            // Get input values
            const input1 = document.getElementById('input-1').value;
            const input2 = parseInt(document.getElementById('input-2').value);
            
            // Clear previous results
            const resultContainer = document.getElementById('result');
            const errorContainer = document.getElementById('error-message');
            errorContainer.style.display = 'none';
            
            try {
                // Call your algorithm function
                const result = myAlgorithmFunction(input1, input2);
                
                // Display result
                resultContainer.innerHTML = \`Result: \${result}\`;
                
            } catch (error) {
                showError(error.message);
            }
        }`
};
```

## Visualization Support

For algorithms that need step-by-step visualization, set `hasVisualization: true`:

```javascript
const config = {
    hasVisualization: true,
    customDemoFunction: `
        function runDemo() {
            // ... algorithm logic
            
            // Show visualization
            const visualizationSection = document.getElementById('visualization-section');
            visualizationSection.style.display = 'block';
            
            // Use these containers:
            // - document.getElementById('array-visualization')
            // - document.getElementById('steps-container')
        }`
};
```

## File Structure

```
algorithms-js/
├── assets/
│   └── js/
│       ├── algorithm-template-generator.js  # Template generator
│       ├── components.js                    # UI components
│       └── ui.js                           # Main UI logic
├── src/
│   ├── patterns/
│   │   └── count-and-say/
│   │       ├── config.js                   # Configuration
│   │       ├── count-and-say.js           # Implementation  
│   │       └── count-and-say.html         # Generated HTML
│   ├── search/
│   └── sort/
├── build-pages.js                          # Build script
├── package.json                            # NPM configuration
└── TEMPLATE-SYSTEM.md                      # This documentation
```

## Best Practices

1. **Keep configurations simple**: Use custom demo functions only when necessary
2. **Follow naming conventions**: Use kebab-case for IDs and file names
3. **Test generated pages**: Always test the generated HTML after building
4. **Use appropriate input types**: Choose the right input type for better UX
5. **Provide good examples**: Include helpful example text for complex inputs
6. **Write clear explanations**: Make algorithm descriptions accessible to learners

## Generated Files

HTML files are generated with a `generated-` prefix (e.g., `generated-count-and-say.html`) and are **automatically ignored by git**. This ensures:

- Only source files (configs) are tracked in version control
- No risk of HTML/config getting out of sync  
- Cleaner git history and smaller repository size
- Forces proper build process usage

## Deployment

The project uses GitHub Actions for automated deployment:

1. **On push to main/master**: GitHub Actions automatically builds HTML pages and deploys to GitHub Pages
2. **Local development**: Run `npm run build` to generate pages for testing
3. **Pull requests**: Pages are built but not deployed (for validation)

### GitHub Pages Setup

The repository includes a GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) that:
- Installs Node.js dependencies
- Runs the build process to generate HTML files
- Deploys the `algorithms-js` folder to GitHub Pages

To enable GitHub Pages deployment:
1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. The workflow will run automatically on commits to main branch

## Development Workflow

1. **Development mode**: Run `npm run dev` to watch for config changes
2. **Make changes**: Edit configuration files or algorithm implementations  
3. **Test locally**: Use `npm start` to build and serve the application
4. **Review generated HTML**: Ensure the output matches expectations
5. **Commit changes**: Only commit config files and source code (generated HTML is ignored)

## Troubleshooting

### Build Errors
- Check configuration syntax for missing commas or brackets
- Ensure all required properties are present
- Verify file paths are correct relative to the HTML location

### Runtime Errors  
- Make sure algorithm function names match the configuration
- Check that all required DOM elements have correct IDs
- Verify JavaScript implementations are compatible with the template

### Styling Issues
- Use `customStyles` property for algorithm-specific CSS
- Ensure dark mode compatibility in custom styles
- Test both light and dark themes
