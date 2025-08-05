# Java Development Help

## Prerequisites
```bash
# Java 11+
java -version
```

## Quick Setup
```bash
cd algorithms-java
./gradlew clean build
```

## Build Commands
```bash
# Clean build with tests
./gradlew clean build

# Run tests only
./gradlew test

# Generate test coverage report
./gradlew jacocoTestReport

# Check code style
./gradlew checkstyleMain checkstyleTest

# All quality checks (tests + coverage + checkstyle)
./gradlew check
```

## IDE Setup
1. Import `algorithms-java/` as Gradle project
2. Install [Google Java Style Guide](https://github.com/google/styleguide) 
3. Enable checkstyle plugin with `config/checkstyle/checkstyle.xml`

## Project Structure
```
algorithms-java/
├── src/main/java/        # Source code
├── src/test/java/        # Tests
├── build.gradle          # Build configuration
├── config/               # Checkstyle and other configs
└── build/                # Generated build artifacts
```

## Adding New Algorithms
1. Create implementation in `src/main/java/com/sl/algorithms/[category]/`
2. Add comprehensive JUnit 5 tests in `src/test/java/com/sl/algorithms/[category]/`
3. Include Javadoc with complexity analysis
4. Run `./gradlew test` to verify
5. Update relevant README with algorithm entry

## Code Quality Requirements
- **Coverage**: 95% instruction coverage, 80% branch coverage
- **Style**: Google Java Style Guide via checkstyle
- **Testing**: JUnit 5 with comprehensive test cases
- **Documentation**: Javadoc with complexity analysis
- **CI/CD**: Coverage published to Coveralls via GitHub Actions

## Reports and Coverage
- **Test reports**: `build/reports/tests/test/index.html`
- **Coverage report**: `build/reports/jacoco/test/html/index.html`
- **Checkstyle report**: `build/reports/checkstyle/main.html`
- **Coverage badge**: Published to [Coveralls](https://coveralls.io/github/sachinlala/SimplifyLearning)

## Troubleshooting
- **Permission denied**: `chmod +x gradlew`
- **Java version**: Ensure Java 11+ with `java -version`
- **Clean build**: `./gradlew clean build`
- **Coverage issues**: Build fails if coverage < 95% instruction
