# SimplifyLearning Algorithm Demos 🚀

> An interactive collection of JavaScript algorithm demonstrations with visual explanations and hands-on examples.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Mobile Friendly](https://img.shields.io/badge/Mobile-Friendly-blue.svg)]()

## ✨ Features

- 🎯 **Interactive Demos**: Run algorithms with custom inputs
- 📱 **Mobile Responsive**: Works seamlessly on all devices
- 🌙 **Dark Mode Support**: Toggle between light and dark themes
- 🔍 **Smart Search**: Find algorithms by name, category, or description
- 🏷️ **Category Filtering**: Filter algorithms by type (search, sort, etc.)
- 📖 **Step-by-Step Explanations**: Understand how each algorithm works
- 🎨 **Beautiful UI**: Water drop style category tags and smooth animations

## 🧮 Current Algorithms

### 🔍 Search Algorithms
- **Binary Search**: Efficient O(log n) search in sorted arrays

### 🔢 Sorting Algorithms  
- **Bubble Sort**: Simple comparison-based sorting algorithm

### 🎯 Pattern Algorithms
- **Count and Say**: Generate look-and-say sequence patterns

## 🚀 Quick Start

### Option 1: Using npm scripts (Recommended)

```bash
# Clone the repository
git clone https://github.com/sachinlala/SimplifyLearning.git
cd SimplifyLearning/algorithms-js

# Start the development server
npm start

# Or use the short form
npm run dev
```

### Option 2: Manual server setup

```bash
# Using Python (recommended - no redirect issues)
python3 -m http.server 8080

# Using Node.js alternatives
npx serve -l 8080 --no-clean-urls
npx http-server -p 8080 --ext="
npx live-server --port=8080 --no-browser
```

Then open: **http://localhost:8080**

## 📦 npm Scripts Reference

| Command | Description |
|---------|-------------|
| `npm start` | Start development server (Python-based) |
| `npm run dev` | Alias for `npm start` |
| `npm run serve` | Start Python HTTP server on port 8080 |
| `npm run serve:node` | Start Node.js serve with clean URLs disabled |
| `npm run serve:http` | Start http-server without extension redirects |
| `npm run serve:live` | Start live-server with auto-reload |
| `npm run clean` | Kill all running servers on port 8080 |
| `npm run restart` | Clean and restart the server |

## 🏗️ Project Structure

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
│       └── bubble-sort/
└── package.json
```

## 🔧 Development

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-algorithm`
3. Add your algorithm following the structure above
4. Test your changes: `npm start`
5. Commit your changes: `git commit -am 'Add new algorithm: Algorithm Name'`
6. Push to the branch: `git push origin feature/new-algorithm`
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/sachinlala/SimplifyLearning/blob/master/LICENSE) file for details.

## 👨‍💻 Author

**Sachin Lala**
- GitHub: [@sachinlala](https://github.com/sachinlala)
- Project: [SimplifyLearning](https://github.com/sachinlala/SimplifyLearning)

---

⭐ **Star this repo if you find it helpful!**

