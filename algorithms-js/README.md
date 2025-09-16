[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Mobile Friendly](https://img.shields.io/badge/Mobile-Friendly-blue.svg)]()
<a href="https://github.com/sachinlala/SimplifyLearning/actions/workflows/ci-js-pages.yml" target="_blank" rel="noopener noreferrer"><img src="https://github.com/sachinlala/SimplifyLearning/actions/workflows/ci-js-pages.yml/badge.svg?branch=master" alt="JavaScript CI with Pages"/></a>

> An interactive collection of algorithms with visual explanations and hands-on examples written in plain JavaScript.

### ✨ Features

- 🎯 **Interactive Demos**: Run algorithms with custom inputs
- 📱 **Mobile Responsive**: Works seamlessly on all devices
- 🌙 **Dark Mode Support**: Toggle between light and dark themes
- 🔍 **Smart Search**: Find algorithms by name, category, or description
- 🏷️ **Category Filtering**: Filter algorithms by type (search, sort, etc.)
- 📖 **Step-by-Step Explanations**: Understand how each algorithm works
- 🎨 **Beautiful UI**: Water drop style category tags and smooth animations
- 🧪 **Comprehensive Testing**: Jest test suite with coverage reports
- 📊 **Algorithm Summary**: Dedicated page comparing all sorting algorithms

### 🚀 Quick Start

#### Option 0: Root-level dev helper

```bash
# From repo root
./dev.sh start    # start http://localhost:8080
./dev.sh status   # check status
./dev.sh stop     # stop server
```

#### Option 1: Using root build script (Recommended)

```bash
# Clone the repository
git clone https://github.com/sachinlala/SimplifyLearning.git
cd SimplifyLearning

# Setup JavaScript module and dependencies
./build.sh js

# Then start the development server
cd algorithms-js
npm start
```

#### Option 2: Using npm scripts directly

```bash
# Clone the repository
git clone https://github.com/sachinlala/SimplifyLearning.git
cd SimplifyLearning/algorithms-js

# Start the development server
npm start

# Or use the short form
npm run dev
```

#### Option 3: Manual server setup

```bash
# Using Python (recommended - no redirect issues)
python3 -m http.server 8080

# Using Node.js alternatives
npx serve -l 8080 --no-clean-urls
npx http-server -p 8080 --ext="
npx live-server --port=8080 --no-browser
```

Then open: **http://localhost:8080**

#### Option 4: Using the helper script (with dependency checks)

```bash
# From repo root
cd algorithms-js
./start-server.sh
```

What it does:
- check_dependencies step: Verifies presence of required tools.
  - Preferred: Node.js + npm (provides npx)
  - Fallbacks: python3 or python
- If something is missing, it will:
  - List missing tools
  - Show suggested install commands for macOS (Homebrew) and Debian/Ubuntu
  - Prompt: "Some dependencies are missing. Continue anyway? [y/N]"
- Starts on port 8000 using:
  - npx serve (preferred)
  - python3 -m http.server 8000, or python -m http.server 8000 if Python 3 is unavailable

### 📦 npm Scripts Reference

| Command | Description |
|---------|-------------|
| `npm start` | Start development server (Python-based) |
| `npm run dev` | Alias for `npm start` |
| `npm run serve` | Start Python HTTP server on port 8080 |
| `npm run serve:node` | Start Node.js serve with clean URLs disabled |
| `npm run serve:http` | Start http-server without extension redirects |
| `npm run serve:live` | Start live-server with auto-reload |
| `npm test` | Run Jest test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate coverage report |
| `npm run test:manual` | Run all manual test files |
| `npm run clean` | Kill all running servers on port 8080 |
| `npm run restart` | Clean and restart the server |

### 🏗️ Project Structure

```
algorithms-js/
├── index.html              # Main landing page
├── demo.html              # Universal demo page loader  
├── assets/
│   ├── css/
│   │   └── styles.css     # Main styles with dark mode
│   └── js/
│       ├── components.js   # Reusable UI components
│       ├── ui.js          # Search & filtering logic
│       ├── theme-toggle.js # Dark/light mode toggle
│       ├── universal-loader.js # Dynamic page loader
│       └── dynamic-template.js # HTML template generator
├── src/
│   ├── patterns/
│   │   └── count-and-say/
│   │       ├── config.js   # Algorithm configuration
│   │       └── count-and-say.js # Implementation
│   ├── search/
│   │   └── binary-search/
│   └── sort/
│       ├── bubble-sort/
│       ├── bucket-sort/
│       ├── counting-sort/
│       ├── dutch-flag-sort/
│       ├── radix-sort/
│       ├── wiggle-sort/
│       ├── utils/           # Shared sorting utilities
│       └── sorting-algorithms.html  # Algorithm comparison page
│   └── .../
└── package.json
```

### Pre-requisites
```bash
# Python 3+ (for development server)
python3 --version

# Node.js (optional, for tooling)
node --version
```

### Development Server
```bash
# Start local server
python -m http.server 8000

# Alternative ports if 8000 is busy
python -m http.server 3000
```

### Adding a New Algorithm

1. **Create algorithm directory**:
   ```bash
   mkdir -p src/category/algorithm-name
   ```

2. **Add configuration** (`src/category/algorithm-name/config.js`):
   ```javascript
   const algorithmConfig = {
       name: "Algorithm Name",
       category: "category",
       problem: "Problem description here...",
       inputs: [
           {
               id: "input-field",
               label: "Input Label",
               type: "number",
               defaultValue: 5
           }
       ],
       explanation: {
           description: "How the algorithm works...",
           steps: [
               "Step 1 explanation",
               "Step 2 explanation"
           ]
       },
       algorithmFunction: "myAlgorithmFunction"
   };
   ```

3. **Add implementation** (`src/category/algorithm-name/algorithm-name.js`):
   ```javascript
   function myAlgorithmFunction(input) {
       // Your algorithm implementation
       return result;
   }
   ```

4. **Update components.js** to include your algorithm in the main list.

### Universal Loader
The universal loader automatically:
- Discovers your algorithm
- Registers it in the UI
- Handles module loading
- Provides interactive interface

### Code Quality Guidelines
- **ES6+**: Use modern JavaScript features
- **JSDoc**: Document all public functions
- **Validation**: Include input validation and error handling
- **Naming**: Use meaningful variable names
- **Indentation**: 2 spaces consistently

### 🧪 Testing

#### Jest Unit Tests
```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage
```

#### Manual Testing
```bash
# Run manual test suites
npm run test:manual

# Test specific algorithm
node src/sort/dutch-flag-sort/test-manual.js
```

#### Browser Testing
```bash
# Navigate to http://localhost:8080
# Open browser DevTools console
# Test functions interactively
```

### Browser Support
- Modern browsers with ES6+ module support
- Chrome, Firefox, Safari, Edge (recent versions)
- No IE support (uses modern JavaScript features)

### Troubleshooting
- **Port in use**: Try `python -m http.server 3000`
- **CORS errors**: Always use local server, not `file://` protocol
- **Module loading**: Check browser console for syntax errors
- **Function not found**: Ensure proper export/import syntax

### Server Issues & Solutions

**Problem**: Node.js servers (serve, http-server) automatically redirect `.html` files:
- `demo.html?algo=patterns/count-and-say` → `/demo` (loses parameters)

**Solution**: Use Python server or Node.js servers with redirect flags disabled:
```bash
# ✅ Works (no redirects)
python3 -m http.server 8080

# ✅ Node.js alternatives  
npx serve -l 8080 --no-clean-urls
npx http-server -p 8080 --ext="

# ❌ Causes redirects
npx serve -l 8080
npx http-server -p 8080
```

## 🎨 UI Features

### Search & Filtering
- **Smart search**: Search by algorithm name, description, or category
- **Multi-category selection**: Click multiple category tags to filter
- **Clear controls**: Separate reset buttons for search and categories
- **Real-time count**: Shows number of matching algorithms

### Dark Mode
- **Global toggle**: Available on all pages
- **Persistent**: Remembers your preference via localStorage
- **Complete coverage**: All components styled for dark mode

### Mobile Responsive
- **Adaptive layout**: Works on phones, tablets, and desktops
- **Touch-friendly**: Large tap targets and smooth interactions
- **Optimized typography**: Readable on all screen sizes

---

⭐ Please star the repo if you find it helpful.

---
