#!/bin/bash

# SimplifyLearning - Unified Build Script
# Usage: ./build.sh [java|js]
# No arguments: builds both modules

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Dependency checks
check_dependencies() {
    print_info "Checking dependencies..."

    local -a missing=()

    # Homebrew (package manager)
    if ! command -v brew >/dev/null 2>&1; then
        print_warning "Homebrew (brew) is required but not found."
        echo "  - macOS install:"
        echo "    /bin/bash -c \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
        echo "  - Linux: install via your package manager or visit https://brew.sh"
        missing+=("brew (Homebrew)")
    fi

    # Java (required for building Java module via Gradle)
    if ! command -v java >/dev/null 2>&1; then
        missing+=("java (JDK)")
    fi

    # Node.js and npm (used for JavaScript module)
    if ! command -v node >/dev/null 2>&1; then
        missing+=("node")
    fi
    if ! command -v npm >/dev/null 2>&1; then
        missing+=("npm")
    fi

    # Python (used to run the simple dev server in algorithms-js)
    if ! command -v python3 >/dev/null 2>&1 && ! command -v python >/dev/null 2>&1; then
        missing+=("python or python3 (for dev server)")
    fi

    # Git (useful for Gradle wrapper and general development)
    if ! command -v git >/dev/null 2>&1; then
        missing+=("git")
    fi

    if [ ${#missing[@]} -eq 0 ]; then
        print_success "All dependencies are available."
    else
        print_warning "Missing dependencies detected:"
        for dep in "${missing[@]}"; do
            echo "  - $dep"
        done
        print_info "The build will attempt to continue, but some features may not work."
    fi

    # Expose the list to callers if needed
    MISSING_DEPS=("${missing[@]}")
}

# Functions
print_header() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}  SimplifyLearning - Build System${NC}"
    echo -e "${BLUE}========================================${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

build_java() {
    print_info "Building Java module (algorithms-java)..."
    
    if [ ! -d "algorithms-java" ]; then
        print_error "algorithms-java directory not found!"
        return 1
    fi
    
    cd algorithms-java
    
    # Check if gradlew exists and is executable
    if [ ! -f "./gradlew" ]; then
        print_error "Gradle wrapper not found!"
        cd ..
        return 1
    fi
    
    if [ ! -x "./gradlew" ]; then
        print_info "Making gradlew executable..."
        chmod +x ./gradlew
    fi
    
    print_info "Running Gradle dev task (faster build)..."
    ./gradlew dev
    
    if [ $? -eq 0 ]; then
        print_success "Java build completed successfully!"
        print_info "Reports available in: algorithms-java/build/reports/"
    else
        print_error "Java build failed!"
        cd ..
        return 1
    fi
    
    cd ..
}

build_js() {
    print_info "Building JavaScript module (algorithms-js)..."
    
    if [ ! -d "algorithms-js" ]; then
        print_error "algorithms-js directory not found!"
        return 1
    fi
    
    cd algorithms-js
    
    # Check if package.json exists
    if [ ! -f "package.json" ]; then
        print_error "package.json not found!"
        cd ..
        return 1
    fi
    
    # Check if npm is available
    if ! command -v npm &> /dev/null; then
        print_warning "npm not found. JavaScript module dependencies won't be installed."
        print_info "However, the module can still run with Python server (npm start)."
    else
        print_info "Installing npm dependencies..."
        npm install
        
        if [ $? -eq 0 ]; then
            print_success "npm dependencies installed successfully!"
        else
            print_warning "npm install had issues, but continuing..."
        fi
    fi
    
    # Check if Python is available for server
    if command -v python3 &> /dev/null; then
        print_success "Python3 available - JavaScript module can run with 'npm start'"
    elif command -v python &> /dev/null; then
        print_success "Python available - JavaScript module can run with 'npm start'"
    else
        print_warning "Python not found. Install Python to run the development server."
    fi
    
    print_success "JavaScript build/setup completed!"
    print_info "To run: ./dev.sh start (starts JS dev server)"
    print_info "Alternative: cd algorithms-js && npm start"
    
    cd ..
}

# Main script
print_header

# Check dependencies before proceeding
check_dependencies
if [ ${#MISSING_DEPS[@]} -ne 0 ]; then
    read -r -p "Some dependencies are missing. Continue anyway? [y/N]: " choice
    case "$choice" in
        [Yy]|[Yy][Ee][Ss])
            print_info "Continuing despite missing dependencies..."
            ;;
        *)
            print_error "Aborting due to missing dependencies."
            exit 1
            ;;
    esac
fi

case "${1:-both}" in
    "java")
        build_java
        ;;
    "js")
        build_js
        ;;
    "both"|"")
        print_info "Building both Java and JavaScript modules..."
        echo
        build_java
        echo
        build_js
        ;;
    *)
        print_error "Invalid argument: $1"
        echo "Usage: $0 [java|js]"
        echo "  java  - Build only Java module"
        echo "  js    - Build only JavaScript module"  
        echo "  both  - Build both modules (default)"
        exit 1
        ;;
esac

echo
if [ $? -eq 0 ]; then
    print_success "All builds completed successfully! 🎉"
    echo
    print_info "Next steps:"
    echo "  • Java: Check reports in algorithms-java/build/reports/"
    echo "  • JavaScript: Run 'cd algorithms-js && npm start' to start dev server"
    echo "  • Dev helper: From repo root, use './dev.sh start|stop|status' (JS dev server on http://localhost:8080)"
    echo "  • Local: Visit http://localhost:8080 (when running dev server)"
    echo "  • Remote: Visit https://sachinlala.github.io/SimplifyLearning/algorithms-js/ for live demo (push changes to trigger GitHub Action)"
else
    print_error "Some builds failed. Check the output above for details."
    exit 1
fi
