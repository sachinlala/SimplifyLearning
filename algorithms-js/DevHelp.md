# JavaScript Development Help

## Prerequisites
```bash
# Python 3+ (for development server)
python3 --version

# Node.js (optional, for tooling)
node --version
```

## Quick Setup
```bash
cd algorithms-js
python -m http.server 8000
# Open http://localhost:8000
```

## Development Server
```bash
# Start local server
python -m http.server 8000

# Alternative ports if 8000 is busy
python -m http.server 3000
```

## Project Structure
```
algorithms-js/
├── src/                  # Algorithm implementations
│   ├── [category]/       # Category directories
│   │   └── [algorithm]/  # Individual algorithm folders
│   │       ├── config.js     # Metadata and UI config
│   │       └── [algo].js     # Implementation
├── assets/               # CSS, fonts, favicons
├── demos/                # Legacy HTML demos
└── index.html            # Main UI entry point
```

## Adding New Algorithms

### 1. Create Directory Structure
```bash
mkdir -p src/[category]/[algorithm-name]
cd src/[category]/[algorithm-name]
```

### 2. Create config.js
```javascript
const config = {
    title: "Algorithm Name",
    category: "category",
    difficulty: "easy|medium|hard",
    description: "Brief description",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    tags: ["tag1", "tag2"],
    interactive: true
};

export default config;
```

### 3. Create Implementation File
```javascript
/**
 * Algorithm description
 * @param {type} param - Parameter description
 * @returns {type} Return description
 */
function algorithmName(param) {
    // Implementation here
}

export { algorithmName };
```

### 4. Universal Loader
The universal loader automatically:
- Discovers your algorithm
- Registers it in the UI
- Handles module loading
- Provides interactive interface

## Code Quality Guidelines
- **ES6+**: Use modern JavaScript features
- **JSDoc**: Document all public functions
- **Validation**: Include input validation and error handling
- **Naming**: Use meaningful variable names
- **Indentation**: 2 spaces consistently

## Testing
```bash
# Manual testing via browser console
# Navigate to http://localhost:8000
# Open browser DevTools console
# Test your functions interactively

# Automated testing: //TODO (Jest setup planned)
```

## Troubleshooting
- **Port in use**: Try `python -m http.server 3000`
- **CORS errors**: Always use local server, not `file://` protocol
- **Module loading**: Check browser console for syntax errors
- **Function not found**: Ensure proper export/import syntax

## Browser Support
- Modern browsers with ES6+ module support
- Chrome, Firefox, Safari, Edge (recent versions)
- No IE support (uses modern JavaScript features)
