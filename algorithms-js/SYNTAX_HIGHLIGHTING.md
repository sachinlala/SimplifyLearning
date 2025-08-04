# Syntax Highlighting Integration

This document describes the syntax highlighting integration for the SimplifyLearning project.

## Overview

The project now includes **Prism.js** for syntax highlighting with automatic theme switching between light and dark modes:

- **Light Mode**: GitHub Light theme with clean, bright colors
- **Dark Mode**: Dracula theme with vibrant colors on dark background

## Files Added

### Prism.js Core Files
- `assets/vendor/prism/prism.js` - Core Prism.js library
- `assets/vendor/prism/prism-javascript.js` - JavaScript language support
- `assets/vendor/prism/prism-css.js` - CSS language support  
- `assets/vendor/prism/prism-json.js` - JSON language support

### Theme Files
- `assets/vendor/prism/prism-github-light.css` - GitHub Light theme for light mode
- `assets/vendor/prism/prism-dracula.css` - Dracula theme for dark mode

### JavaScript Integration
- `assets/js/syntax-theme-toggle.js` - Handles automatic theme switching

## CSS Updates

Enhanced the existing `.code-viewer` class to work seamlessly with Prism.js themes:

```css
/* Enhanced Code Viewer - Compatible with Prism.js */
.code-viewer {
    background-color: #f8f9fa;
    border-left: 4px solid #007acc;
    padding: 15px;
    margin: 10px 0;
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, 'Courier New', monospace;
    white-space: pre-wrap;
    overflow-x: auto;
    border-radius: 6px;
    border: 1px solid #d1d9e0;
    transition: all 0.3s ease;
}

/* Dark mode support */
body.dark-mode .code-viewer {
    background-color: #282a36;
    border-left: 4px solid #58A6FF;
    border: 1px solid #44475a;
    color: #f8f8f2;
}
```

## Usage

### Basic Code Block

```html
<pre><code class="language-javascript">
function example() {
    console.log("Hello, World!");
}
</code></pre>
```

### With Code Viewer Wrapper

```html
<div class="code-viewer">
    <pre><code class="language-javascript">
    function binarySearch(arr, target) {
        let left = 0;
        let right = arr.length - 1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
            if (arr[mid] === target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return -1;
    }
    </code></pre>
</div>
```

## Supported Languages

- JavaScript (`language-javascript`)
- CSS (`language-css`)
- JSON (`language-json`)

Additional languages can be added by downloading the corresponding Prism.js component files.

## Theme Automatic Switching

The `SyntaxThemeToggle` class automatically:

1. Loads both light and dark theme CSS files
2. Monitors the `body.dark-mode` class changes
3. Switches between themes instantly
4. Re-highlights code blocks when themes change

## Integration in HTML

Add to the `<head>` section:

```html
<!-- Prism.js for syntax highlighting -->
<script src="assets/vendor/prism/prism.js"></script>
<script src="assets/vendor/prism/prism-javascript.js"></script>
<script src="assets/vendor/prism/prism-css.js"></script>
<script src="assets/vendor/prism/prism-json.js"></script>
```

Add before closing `</body>` tag:

```html
<!-- Syntax highlighting theme toggle -->
<script src="assets/js/syntax-theme-toggle.js"></script>
```

## Testing

A demo file `syntax-demo.html` is available to test the syntax highlighting functionality:

1. Open `syntax-demo.html` in a browser
2. Toggle between light and dark modes using the theme button
3. Observe how code blocks change themes automatically

## Benefits

- **Consistent**: Themes automatically match the overall site theme
- **Professional**: Clean, readable syntax highlighting
- **Accessible**: Good contrast ratios in both themes
- **Lightweight**: Only loads necessary components
- **Extensible**: Easy to add more languages as needed

## Future Enhancements

- Add more programming languages (Python, Java, etc.)
- Line numbers support
- Copy-to-clipboard functionality
- Code block folding/expanding
- Theme customization options
