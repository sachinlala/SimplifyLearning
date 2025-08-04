# Developer Guide - SimplifyLearning Algorithms (Post-Refactoring)

## 🎯 **Overview**

This guide explains the refactored structure of the algorithms-js directory, designed to help developers focus on **algorithm implementation** rather than boilerplate code.

## 🗂️ **New Project Structure**

```
algorithms-js/
├── assets/
│   ├── js/
│   │   ├── unified-theme-manager.js    # 🆕 Single source for all theme management
│   │   ├── utils.js                    # 🔄 Consolidated utilities (array, UI, etc.)
│   │   ├── components.js               # Reusable UI components
│   │   ├── universal-loader.js         # Dynamic algorithm loading
│   │   └── ...
│   ├── css/styles.css
│   └── favicon/
├── src/
│   └── [category]/
│       └── [algorithm-name]/
│           ├── config.js               # Algorithm metadata
│           └── [algorithm-name].js     # Algorithm implementation
├── index.html                          # 🔄 Uses unified theme manager
├── demo.html                           # Universal demo loader
└── build-pages.js                      # Build system (optional)
```

## 🚀 **Quick Start: Adding a New Algorithm**

### Step 1: Create Directory Structure
```bash
mkdir -p src/[category]/[algorithm-name]
cd src/[category]/[algorithm-name]
```

### Step 2: Create `config.js`
```javascript
// Example: src/sort/quick-sort/config.js
const quickSortConfig = {
    name: 'Quick Sort',
    title: 'Quick Sort Algorithm',
    category: 'sort',
    
    // Problem description
    problem: 'Sort an array of numbers in ascending order using the quick sort algorithm.',
    
    // Input configuration
    inputs: [
        {
            id: 'array-input',
            type: 'text',
            label: 'Array (comma-separated)',
            defaultValue: '64,34,25,12,22,11,90',
            width: '300px'
        }
    ],
    
    // Explanation
    explanation: {
        description: 'Quick sort is a divide-and-conquer algorithm...',
        steps: [
            'Choose a pivot element',
            'Partition array around pivot',
            'Recursively sort sub-arrays'
        ]
    },
    
    // Paths (relative to algorithm directory)
    cssPath: '../../../assets/css/styles.css',
    jsPath: './quick-sort.js',
    githubPath: 'https://github.com/sachinlala/SimplifyLearning/blob/master/algorithms-js/src/sort/quick-sort/quick-sort.js',
    
    // Function to call for demo
    algorithmFunction: 'quickSort',
    
    // Optional: Enable visualization
    hasVisualization: true
};

// Export to global scope (required for template system)
window.quickSortConfig = quickSortConfig;
```

### Step 3: Create Algorithm Implementation
```javascript
// Example: src/sort/quick-sort/quick-sort.js
function quickSort(input) {
    try {
        // Parse input using utility function
        const arr = parseArray(input);
        
        // Implement your algorithm
        const result = quickSortAlgorithm([...arr]);
        
        // Return formatted result
        return `Original: [${arr.join(', ')}]<br>Sorted: [${result.join(', ')}]`;
    } catch (error) {
        throw new Error(`Invalid input: ${error.message}`);
    }
}

function quickSortAlgorithm(arr) {
    if (arr.length <= 1) return arr;
    
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    
    return [...quickSortAlgorithm(left), ...middle, ...quickSortAlgorithm(right)];
}
```

### Step 4: Access Your Algorithm
Visit: `demo.html?algo=sort/quick-sort`

## 🎨 **Theme Management**

### Unified Theme Manager
The new `unified-theme-manager.js` handles:
- ✅ UI dark/light mode switching
- ✅ Prism.js syntax highlighting themes
- ✅ Persistent theme storage
- ✅ Automatic theme synchronization

### Usage in Your Algorithm
Themes are handled automatically! The unified theme manager:
- Loads with the page
- Sets up toggle buttons
- Manages localStorage persistence
- Updates syntax highlighting themes

## 🛠️ **Utility Functions**

### Available in `utils.js`:

#### Array Utilities
```javascript
parseArray(input)              // Parse comma/space-separated input
generateRandomArray(size, min, max)  // Generate random array
isSorted(arr)                  // Check if array is sorted
getMax(arr) / getMin(arr)      // Get max/min values
```

#### UI Utilities
```javascript
wrapLongText(text, maxLength)  // Wrap text with <br> tags
formatNumber(num)              // Format numbers with separators
debounce(func, wait)           // Debounce function calls
copyToClipboard(text)          // Copy to clipboard (async)
```

#### Performance Utilities
```javascript
measureTime(fn)                // Measure execution time
```

#### Visualization Utilities
```javascript
calculateBarHeight(value, maxValue, maxHeight)  // Calculate bar heights
generateBarStyle(height, index, isActive)       // Generate bar CSS
```

## 📝 **Configuration Options**

### Required Config Properties
- `name` - Display name
- `title` - Page title
- `category` - Algorithm category
- `problem` - Problem description
- `inputs` - Array of input configurations
- `explanation` - Object with description and optional steps
- `cssPath`, `jsPath`, `githubPath` - File paths

### Input Types
```javascript
// Number input
{ id: 'size', type: 'number', label: 'Array Size', min: 1, max: 100, defaultValue: 10 }

// Text input
{ id: 'array', type: 'text', label: 'Array', defaultValue: '1,2,3', width: '200px' }

// Range slider
{ id: 'speed', type: 'range', label: 'Speed', min: 1, max: 10, defaultValue: 5 }
```

### Optional Features
```javascript
{
    hasVisualization: true,        // Enable visualization section
    autoRun: false,               // Disable auto-run on page load
    example: 'Try: 5,2,8,1,9',    // Show example in input section
    customStyles: 'css string',   // Add custom CSS
    customDemoFunction: 'js code' // Override default demo function
}
```

## 🔧 **Build System (Optional)**

### Generate Static HTML Files
```bash
node build-pages.js           # Build all algorithm pages
node build-pages.js --watch   # Watch for changes
```

This generates `generated-[algorithm-name].html` files for each algorithm.

### Universal Loader (Recommended)
Use `demo.html?algo=category/algorithm-name` for dynamic loading - no build step required!

## 🎭 **What Was Removed**

- ❌ `debug.html`, `syntax-demo.html`, `let` - Unnecessary dev files
- ❌ `ui-utils.js` - Merged into `utils.js`
- ❌ `theme-toggle.js` - Replaced by unified theme manager
- ❌ `syntax-theme-toggle.js` - Replaced by unified theme manager

## 🎯 **Benefits for Developers**

1. **Focus on Algorithms**: Minimal boilerplate, maximum algorithm focus
2. **Consistent UI**: Automatic theme management and styling
3. **Rich Utilities**: Pre-built functions for common tasks
4. **Easy Setup**: Just two files per algorithm
5. **Dynamic Loading**: No build step required for development
6. **Better Maintainability**: Single source of truth for themes

## 🤝 **Contributing**

1. Create your algorithm directory: `src/[category]/[algorithm-name]/`
2. Add `config.js` with algorithm metadata
3. Add `[algorithm-name].js` with implementation
4. Test with: `demo.html?algo=category/algorithm-name`
5. Submit pull request

## 📚 **Examples**

Check existing algorithms for reference:
- `src/patterns/count-and-say/` - String pattern generation
- `src/search/binary-search/` - Array searching  
- `src/sort/bubble-sort/` - Array sorting

---

**Happy Coding! 🚀** Focus on the algorithms - we handle the rest!
