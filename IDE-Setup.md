# IntelliJ IDEA Setup Guide

## Quick Setup

1. **Open Project**: Open the root `SimplifyLearning` directory in IntelliJ
2. **Gradle Import**: IntelliJ should automatically detect and import the `algorithms-java` Gradle module
3. **SDK Setup**: Ensure Java 21 is configured as project SDK
4. **Refresh Project**: If you see "Directory does not contain a Gradle build" error:
   - **Gradle Tool Window** → Click **+** → **Link Gradle Project**
   - Select `algorithms-java` directory (NOT the root directory)
   - Click **OK**

## Modules Overview

- **SimplifyLearning** (root): Container project with build scripts and documentation
- **algorithms-java**: Java implementations with `gradle` build system
- **algorithms-js**: JavaScript implementations with `npm` scripts

## Development Workflow

### Java Development

#### Quick Tasks
```bash
cd algorithms-java
./gradlew build
```
- **Fast Build**: `./gradlew dev` - Runs tests with coverage printing (no verification failures)
- **Quick Compile**: `./gradlew quick` - Compile only, no tests
- **Full Build**: `./gradlew build` - Complete build with all reports

### JavaScript Development

#### Quick Start
```bash
cd algorithms-js
npm start  # Starts Python dev server on port 8080
```

#### Pre-configured Run Configurations
- **JavaScript Dev Server**: Runs `npm start` from IntelliJ

## Unified Build System

### Root Level
```bash
./build.sh        # Build both modules
./build.sh java   # Build Java only
./build.sh js     # Build JavaScript only
```

### Java Module
```bash
cd algorithms-java
./gradlew dev     # Fast development build
./gradlew quick   # Compile only
./gradlew test    # Tests only
./gradlew build   # Full build with reports
```

### JavaScript Module
```bash
cd algorithms-js
npm start         # Start dev server
npm run dev       # Same as start
npm run clean     # Kill servers on port 8080
```

## Troubleshooting

### Gradle Issues

**"Directory does not contain a Gradle build" Error**:
1. **File → Settings → Build, Execution, Deployment → Build Tools → Gradle**
2. **Gradle Projects** → Click **+** → Select `algorithms-java` directory
3. Or refresh with correct path:
   ```bash
   cd algorithms-java
   ./gradlew --refresh-dependencies clean build
   ```

### Test Run Icons Missing
1. Go to **File → Project Structure**
2. Check **Modules → algorithms-java**
3. Ensure **Test Sources Root** points to `src/test/java`
4. **Apply** and restart IntelliJ

### Search Showing Build Artifacts
1. **File → Settings → Editor → File Types**
2. Add patterns to **Ignored Files and Folders**:
   - `*.class`
   - `*Test.html`
   - `*.java.html`

### Module Not Recognized
1. **File → Project Structure → Modules**
2. Click **+** → **Import Module**
3. Select `algorithms-java/build.gradle`
4. Import as Gradle project

## Performance Tips

- **Use `dev` task** for regular development (faster than `build`)
- **Use `quick` task** for compile-only checks
- **Keep build artifacts excluded** from version control and search
- **Use IntelliJ's built-in test runner** instead of Gradle for individual tests

## Coverage Reporting

- **Console**: Coverage percentage printed after every test run
- **Local HTML**: Available in `build/reports/jacoco/test/html/index.html`
- **CI/CD**: Automatically pushed to Coveralls on GitHub Actions

---
