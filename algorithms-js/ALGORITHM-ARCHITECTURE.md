# Algorithm Architecture Guidelines

## File Structure Pattern

Each algorithm should follow this standardized structure:

```
src/[category]/[algorithm-name]/
├── [algorithm-name].js          # Core algorithm logic only
├── [algorithm-name]-viz.js      # Visualization logic only  
├── config.js                    # Configuration for UI
└── README.md                    # Algorithm documentation
```

## Core Algorithm File (`[algorithm-name].js`)

**Purpose**: Pure algorithm implementation, no DOM manipulation or visualization
- Export core algorithm functions
- Include multiple implementations (iterative, recursive, etc.)
- Provide step-tracking functions for visualization consumption
- No browser-specific code

**Example structure**:
```javascript
/**
 * [Algorithm Name] - Core Implementation
 */

// Main algorithm function
export function algorithmName(input, options = {}) {
    // Core algorithm logic
}

// Alternative implementations  
export function algorithmNameIterative(input) {
    // Iterative version
}

export function algorithmNameRecursive(input) {
    // Recursive version
}

// Step-by-step version for visualization
export function algorithmNameWithSteps(input) {
    // Returns { result, steps, metrics }
}

// Utility functions
function helperFunction() {
    // Helper logic
}

// Browser compatibility
if (typeof window !== 'undefined') {
    window.AlgorithmName = { algorithmName, algorithmNameWithSteps };
}
```

## Visualization File (`[algorithm-name]-viz.js`)

**Purpose**: Handle all DOM manipulation, animation, and user interaction
- Import core algorithm functions
- Manage visualization canvas/DOM elements
- Handle animation timing and controls
- Provide interactive controls

**Example structure**:
```javascript
/**
 * [Algorithm Name] - Visualization Logic
 */

// Import core algorithm
import { algorithmName, algorithmNameWithSteps } from './algorithm-name.js';

export class AlgorithmVisualizer {
    constructor(containerElement) {
        this.container = containerElement;
        this.animationSpeed = 1000;
        this.isPlaying = false;
    }

    // Create visualization elements
    createVisualization(data) {
        // DOM creation logic
    }

    // Animate algorithm steps
    animate(steps) {
        // Animation logic
    }

    // Control methods
    play() { /* */ }
    pause() { /* */ }
    reset() { /* */ }
    
    // Event handlers
    setupControls() { /* */ }
}

// Browser compatibility
if (typeof window !== 'undefined') {
    window.AlgorithmVisualizer = AlgorithmVisualizer;
}
```

## Benefits of This Architecture

1. **Separation of Concerns**: Core logic separate from presentation
2. **Reusability**: Core algorithms can be used without visualization
3. **Testability**: Easier to unit test pure algorithm functions
4. **Maintainability**: Changes to visualization don't affect core logic
5. **Performance**: Core algorithms can be optimized independently

## Migration Strategy

1. Extract core algorithm logic from existing mixed files
2. Create separate visualization files with DOM manipulation
3. Update config.js to reference both files
4. Ensure backward compatibility during transition