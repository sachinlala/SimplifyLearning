# Contributing to SimplifyLearning

Thank you for your interest in contributing to SimplifyLearning! This is a multi-language mono-repo providing educational resources for learning algorithms and programming concepts.

## Repository Structure

Each language track is completely independent with its own build system and lifecycle:

- **algorithms-java/**: Java implementations with comprehensive tests
- **algorithms-js/**: JavaScript implementations with interactive web demos  
- **algorithms-python/**: Python implementations //TODO
- **algorithms-go/**: Go implementations //TODO

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/SimplifyLearning.git
   cd SimplifyLearning
   ```

2. **Choose your language track and see module-specific instructions**
   - **Java**: `cd algorithms-java && ./gradlew build test`
   - **JavaScript**: `cd algorithms-js && python -m http.server 8000`
   - **Python**: `cd algorithms-python` //TODO
   - **Go**: `cd algorithms-go` //TODO

## Language-Specific Guidelines

### Java (algorithms-java/)
- Standard Java package structure with Gradle build
- JUnit 5 testing with 95% coverage requirement
- Google Java Style Guide via checkstyle
- See [algorithms-java/DevHelp.md](algorithms-java/DevHelp.md) for details

### JavaScript (algorithms-js/)
- Simple structure: `src/[category]/[algorithm-name]/config.js` + `[algorithm-name].js`
- Universal loader handles registration automatically
- Modern ES6+ with JSDoc documentation
- See [algorithms-js/DevHelp.md](algorithms-js/DevHelp.md) for details

### Python (algorithms-python/) //TODO
- Standard Python package structure with pytest
- See [algorithms-python/DevHelp.md](algorithms-python/DevHelp.md) for details

### Go (algorithms-go/) //TODO
- Standard Go module structure with built-in testing
- See [algorithms-go/DevHelp.md](algorithms-go/DevHelp.md) for details

## Pull Request Process

1. Fork the repository and create a feature branch
2. Work within your chosen language track directory
3. Follow the language-specific guidelines and DevHelp instructions
4. Test your changes thoroughly using the module's build system
5. Submit a pull request with clear description

## Getting Help

- **Language-specific issues**: Check the respective `DevHelp.md` file
- **General questions**: Open an issue
- **Examples**: Review existing code for patterns

Thank you for contributing to SimplifyLearning!
