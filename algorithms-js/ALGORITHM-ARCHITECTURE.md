# Algorithm Architecture Guidelines

## File Structure Pattern

Each algorithm follows this standardized structure:

```
src/[category]/[algorithm-name]/
├── [algorithm-name]-core.js     # Core algorithm implementation
├── [algorithm-name].js          # Visualization with step tracking
├── [algorithm-name].config.js   # UI configuration and demo logic
└── README.md                    # Algorithm documentation (optional)
```

## Core Algorithm File (`[algorithm-name]-core.js`)

**Purpose**: Pure algorithm implementation with no DOM dependencies

- Core algorithm functions (iterative, recursive variants)
- Utility functions (swap, partition, etc.)
- Performance metrics tracking
- Browser compatibility exports

**Example structure**:
```javascript
/**
 * [Algorithm Name] - Core Implementation
 */

function algorithmName(arr, options = {}) {
    // Core algorithm logic
    return { sortedArray, metrics };
}

function algorithmNameIterative(arr) {
    // Alternative implementation
}

// Browser compatibility
if (typeof window !== 'undefined') {
    window.AlgorithmCore = { algorithmName, algorithmNameIterative };
}
```

## Visualization File (`[algorithm-name].js`)

**Purpose**: Step-by-step tracking for visualization

- Extends core algorithms with step tracking
- Generates animation steps
- No DOM manipulation (handled by config)
- Browser compatibility exports

**Example structure**:
```javascript
/**
 * [Algorithm Name] - Step Tracking for Visualization
 */

function algorithmNameWithSteps(arr, options = {}) {
    const steps = [];
    const metrics = { comparisons: 0, swaps: 0 };
    
    // Algorithm with step recording
    steps.push({
        type: 'start',
        array: [...arr],
        message: 'Starting algorithm'
    });
    
    return { sortedArray, steps, metrics };
}

// Browser compatibility
if (typeof window !== 'undefined') {
    window.algorithmNameWithSteps = algorithmNameWithSteps;
}
```

## Configuration File (`[algorithm-name].config.js`)

**Purpose**: Complete demo configuration including UI, visualization, and controls

- Algorithm metadata and documentation
- Input configuration and validation
- Complete visualization logic with DOM manipulation
- Animation controls and styling
- Browser compatibility exports

**Key sections**:
```javascript
const config = {
    name: "Algorithm Name",
    algorithmFunction: "algorithmNameWithSteps",
    hasVisualization: true,
    
    inputs: [/* Input configurations */],
    explanation: {/* Algorithm explanation */},
    complexityAnalysis: {/* Time/space complexity */},
    
    customDemoFunction: `/* Complete demo logic */`,
    customStyles: `/* CSS for visualization */`
};

// Browser compatibility
if (typeof window !== 'undefined') {
    window.algorithmNameConfig = config;
}
```

## Universal Loading System

Algorithms are loaded via `demo.html?algo=category/algorithm-name`:

1. **Universal Loader** (`assets/js/universal-loader.js`) detects algorithm from URL
2. **Config Loading** - Dynamically loads `[algorithm-name].config.js`
3. **Dependency Loading** - Config references core and visualization files
4. **DOM Generation** - Creates complete demo interface from configuration

## Utilities and DRY Principles

**Purpose**: Centralized reusable functions to avoid code duplication

### Algorithm-Specific Utilities (`src/sort/utils/sorting-utils.js`)
- Core algorithm functions: `swap`, `findMax`, `findMin`
- Array utilities: `generateRandomArray`, `isSorted`, `copyArray`
- Performance tracking: `PerformanceTracker`
- Step generation helpers for visualization
- Validation functions: `validateArrayWithConstraints`

### UI/Web Utilities (`assets/js/utils.js`)
- DOM/UI-specific functions: `parseArray`, `calculateBarHeight`
- Web utilities: `debounce`, `copyToClipboard`, `formatNumber`
- Style generators: `generateBarStyle`, `wrapLongText`

**Import Pattern**:
```javascript
// In core algorithm files
const SortingUtils = (typeof require !== 'undefined') ? 
    require('../utils/sorting-utils.js') : window.SortingUtils;

// Use: SortingUtils.swap(arr, i, j)
```

## Architecture Benefits

1. **Separation of Concerns**: Core logic, visualization, and UI are separate
2. **Dynamic Loading**: Single `demo.html` serves all algorithms
3. **Self-Contained**: Each algorithm directory is independent
4. **Consistent Interface**: Universal loader provides consistent UX
5. **Extensible**: Easy to add new algorithms following the pattern
6. **DRY Compliance**: Utilities are centralized and reusable
7. **Testing Ready**: Jest configuration for comprehensive testing
