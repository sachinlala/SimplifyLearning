# Contributing to SimplifyLearning

Thank you for your interest in contributing to SimplifyLearning! This project provides educational resources and interactive demos for learning algorithms and programming concepts.

## Project Structure

This repository contains multiple tracks:

- **algorithms-java/**: Java implementations with comprehensive tests and documentation
- **algorithms-js/**: JavaScript implementations with interactive web demos
- **sample-rest-service/**: Spring Boot REST API examples

## Component-Specific Guidelines

Please refer to the appropriate contributing guide for your area of interest:

- **[Java Components](algorithms-java/CONTRIBUTING-Java.md)** - Guidelines for Java algorithm implementations
- **[JavaScript Components](algorithms-js/CONTRIBUTING-JS.md)** - Guidelines for JavaScript demos and algorithms

## General Development Setup

### Prerequisites
- Java 11+ (for Java algorithms)
- Node.js and npm (for JavaScript development tools)
- Python 3+ (for local HTTP server)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/SimplifyLearning.git
   cd SimplifyLearning
   ```

2. **For Java development**
   ```bash
   ./gradlew build test
   ```

3. **For JavaScript development**
   ```bash
   cd algorithms-js
   python -m http.server 8000
   ```

## Pull Request Process

1. Fork the repository and create a feature branch
2. Follow the component-specific guidelines
3. Test your changes thoroughly
4. Update documentation as needed
5. Submit a pull request with clear description

## Getting Help

- Open an issue for questions
- Review existing code for patterns
- Check component-specific CONTRIBUTING files

Thank you for contributing to SimplifyLearning!
