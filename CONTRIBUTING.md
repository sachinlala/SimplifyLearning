# Contributing to SimplifyLearning

Thank you for your interest! This is a multi-language mono-repo providing resources for learning foundational algorithms and programming concepts.

## Repository Structure

Each language track is completely independent with its own build system and lifecycle:

- **algorithms-java/**: Java implementations with comprehensive tests
- **algorithms-js/**: JavaScript implementations with interactive web demos

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/SimplifyLearning.git
   cd SimplifyLearning
   ```

2. **Build and test using the unified build script**
   ```bash
   # Test both modules
   ./build.sh
   
   # Test specific module
   ./build.sh java    # Fast Java build with tests
   ./build.sh js      # JavaScript setup and validation
   ```

3. **Or choose your language track for direct development**
   - **Java**: `cd algorithms-java && ./gradlew dev`
   - **JavaScript**: `cd algorithms-js && npm start`

## Language-Specific Guidelines

### Java (algorithms-java/)
- Standard Java package structure with Gradle build
- JUnit 5 testing with 95% coverage requirement
- Google Java Style Guide via checkstyle
- See [algorithms-java/README.md](algorithms-java/README.md) for details

### JavaScript (algorithms-js/)
- Simple structure: `src/[category]/[algorithm-name]/config.js` + `[algorithm-name].js`
- Universal loader handles registration automatically
- Modern ES6+ with JSDoc documentation
- See [algorithms-js/README.md](algorithms-js/README.md) for details

## Pull Request Process

1. Fork the repository and create a feature branch
2. Work within your chosen language track directory
3. Follow the language-specific guidelines and module README instructions
4. **Test your changes using the build script**:
   ```bash
   ./build.sh        # Test both modules
   ./build.sh java   # Test Java module only
   ./build.sh js     # Test JavaScript module only
   ```
5. Ensure all tests pass and coverage requirements are met
6. Submit a pull request with clear description

## Getting Help

- **Language-specific issues**: Check the respective module's `README.md` file
- **General questions**: Open an issue
- **Examples**: Review existing code for patterns

Thank you for contributing!
