# Developer Help Guide

## Quick Setup

### Prerequisites
```bash
# Java 11+
java -version

# Python 3+ (for JavaScript development server)
python3 --version

# Node.js (optional, for JavaScript tooling)
node --version
```

### Clone and Build
```bash
git clone https://github.com/yourusername/SimplifyLearning.git
cd SimplifyLearning
```

## Java Development (algorithms-java/)

### Build and Test
```bash
# Clean build with tests
./gradlew clean build

# Run tests only
./gradlew test

# Generate test coverage report
./gradlew jacocoTestReport

# Check code style
./gradlew checkstyleMain checkstyleTest
```

### IDE Setup
1. Import as Gradle project
2. Install [Google Java Style Guide](https://github.com/google/styleguide) 
3. Enable checkstyle plugin with `config/checkstyle/checkstyle.xml`

### Code Coverage
- View HTML report: `algorithms-java/build/reports/jacoco/test/html/index.html`
- Root coverage report: `build/reports/jacoco/jacocoRootReport/jacocoRootReport.xml`

## JavaScript Development (algorithms-js/)

### Development Server
```bash
cd algorithms-js
python -m http.server 8000
# Open http://localhost:8000
```

### Algorithm Structure
```
src/[category]/[algorithm-name]/
├── config.js              # Metadata and UI config
└── [algorithm-name].js     # Implementation
```

### Example config.js
```javascript
const config = {
    title: "Binary Search",
    category: "search",
    difficulty: "medium",
    description: "Efficient search in sorted arrays",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    tags: ["search", "divide-conquer"],
    interactive: true
};

export default config;
```

### Example implementation
```javascript
/**
 * Binary search implementation
 * @param {number[]} arr - Sorted array
 * @param {number} target - Target value
 * @returns {number} Index or -1 if not found
 */
function binarySearch(arr, target) {
    // Implementation here
}

export { binarySearch };
```

### Testing JavaScript
```bash
# Manual testing via browser console
# Automated testing: //TODO (Jest setup planned)
```

## Project Structure

```
SimplifyLearning/
├── algorithms-java/          # Java implementations
│   ├── src/main/java/        # Source code
│   ├── src/test/java/        # Tests
│   └── build.gradle          # Java build config
├── algorithms-js/            # JavaScript implementations
│   ├── src/                  # Algorithm implementations
│   ├── demos/                # Legacy HTML demos
│   ├── assets/               # CSS, fonts, favicons
│   └── index.html            # Main UI
├── build.gradle              # Root build config
├── settings.gradle           # Gradle modules
└── config/                   # Checkstyle and other configs
```

## Common Tasks

### Adding Java Algorithm
1. Create class in `algorithms-java/src/main/java/com/sl/algorithms/[category]/`
2. Add test in `algorithms-java/src/test/java/com/sl/algorithms/[category]/`
3. Run `./gradlew test` to verify
4. Update relevant README with algorithm entry

### Adding JavaScript Algorithm
1. Create directory: `algorithms-js/src/[category]/[algorithm-name]/`
2. Add `config.js` with metadata
3. Add `[algorithm-name].js` with implementation
4. Universal loader auto-registers the algorithm
5. Test via browser at http://localhost:8000

### Code Quality Checks
```bash
# Java: Checkstyle + tests + coverage
./gradlew check

# Coverage threshold: 95% instruction, 80% branch
./gradlew jacocoTestCoverageVerification
```

## Troubleshooting

### Java Build Issues
- **Permission denied**: `chmod +x gradlew`
- **Java version**: Ensure Java 11+ with `java -version`
- **Clean build**: `./gradlew clean build`

### JavaScript Issues
- **Port in use**: Try `python -m http.server 3000`
- **CORS errors**: Always use local server, not file:// protocol
- **Module loading**: Check browser console for syntax errors

### Coverage Issues
- View detailed report: `build/reports/jacoco/jacocoRootReport/html/index.html`
- Missing tests will fail the build (95% instruction coverage required)

## Environment Setup

### Recommended IDE Settings
- **IntelliJ IDEA**: Import as Gradle project, install Google Java Style plugin
- **VS Code**: Install Java Extension Pack and Prettier for JavaScript
- **Any editor**: Ensure consistent line endings (LF) and UTF-8 encoding

### Git Configuration
```bash
# Ensure consistent line endings
git config core.autocrlf false
git config core.eol lf
```
