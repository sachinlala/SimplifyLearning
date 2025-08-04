# Contributing to SimplifyLearning

Thank you for your interest in contributing to SimplifyLearning! This project provides educational resources and interactive demos for learning algorithms and programming concepts across multiple languages.

## Project Structure

This repository contains implementations in multiple programming languages:

- **algorithms-java/**: Java implementations with comprehensive tests and documentation
- **algorithms-js/**: JavaScript implementations with interactive web demos
- **algorithms-python/**: Python implementations //TODO
- **algorithms-go/**: Go implementations //TODO

## Language-Specific Guidelines

### Java (algorithms-java/)

**Structure**: Follow standard Java package conventions with comprehensive testing.

**Adding New Algorithms**:
1. Create implementation in appropriate package under `src/main/java/`
2. Add comprehensive JUnit 5 tests in `src/test/java/`
3. Include Javadoc with complexity analysis
4. Follow standard Java conventions and validate inputs
5. Run `./gradlew test` to verify

**Code Quality**:
- Use meaningful variable names and add Javadoc comments
- Write test cases covering edge cases and typical usage
- Aim for high test coverage
- Update documentation lists in README files

### JavaScript (algorithms-js/)

**Structure**: Modular approach with universal loader system.

**Adding New Algorithms**:
1. Create directory: `/src/[category]/[algorithm-name]/`
2. Add two files:
   • `config.js` - Algorithm metadata and UI configuration
   • `[algorithm-name].js` - Algorithm implementation
3. The universal loader handles everything else automatically

**Code Quality**:
- Use ES6+ features and meaningful variable names
- Add JSDoc comments for all public functions
- Include input validation and error handling
- Follow consistent indentation (2 spaces)

### Python (algorithms-python/) //TODO

**Structure**: Standard Python package structure with pytest.

**Adding New Algorithms**:
1. Create module in appropriate package
2. Add comprehensive tests with pytest
3. Include docstrings with complexity analysis
4. Follow PEP 8 style guidelines

### Go (algorithms-go/) //TODO

**Structure**: Standard Go module structure with built-in testing.

**Adding New Algorithms**:
1. Create package in appropriate directory
2. Add comprehensive tests with Go testing framework
3. Include documentation comments
4. Follow Go style guidelines and conventions

## Development Setup

### Prerequisites
- Java 11+ (for Java algorithms)
- Node.js (for JavaScript development tools)
- Python 3+ (for Python algorithms and local HTTP server)
- Go 1.19+ (for Go algorithms)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/SimplifyLearning.git
   cd SimplifyLearning
   ```

2. **Choose your language track**
   - Java: `./gradlew build test`
   - JavaScript: `cd algorithms-js && python -m http.server 8000`
   - Python: //TODO
   - Go: //TODO

## Pull Request Process

1. Fork the repository and create a feature branch
2. Follow the language-specific guidelines above
3. Test your changes thoroughly
4. Update documentation as needed
5. Submit a pull request with clear description

## Getting Help

- Open an issue for questions
- Review existing code for patterns
- Check [DevHelp.md](DevHelp.md) for detailed development instructions

Thank you for contributing to SimplifyLearning!
