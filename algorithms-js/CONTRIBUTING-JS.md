# Contributing to SimplifyLearning JavaScript Components

Thank you for your interest in contributing to the JavaScript components of SimplifyLearning! Please follow these guidelines:

## Folder Structure

```
algorithms-js/
├── src/
│   ├── patterns/            # Pattern algorithms (e.g., Count and Say)
│   ├── core/                # Core data structure algorithms
│   │   ├── array/           # Array operations
│   │   └── strings/         # String operations
│   ├── search/              # Search algorithms
│   ├── sort/                # Sorting algorithms
│   └── shuffle/             # Shuffling algorithms
├── demos/                   # Interactive HTML demos
└── assets/                  # Shared CSS, fonts, images
```

## Adding New Algorithms

1. **Algorithm Implementation**
   - Create a JavaScript file in the appropriate `src/` subfolder
   - Use clear, well-documented functions
   - Include input validation and error handling
   - Add JSDoc comments for all public functions

2. **Demo Page**
   - Create an HTML file in `demos/` folder
   - Follow the established template structure
   - Include algorithm description and complexity analysis
   - Use consistent styling with existing demos

3. **Registration**
   - Add your demo to the main `index.html` file
   - Include appropriate tags for searchability

## Code Quality

- Use ES6+ features appropriately
- Follow consistent indentation (2 spaces)
- Use meaningful variable names
- Add comments for complex logic
