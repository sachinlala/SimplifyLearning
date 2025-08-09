#!/bin/bash

# Server startup script for algorithms-js project
# This script provides both Node.js (npx serve) and Python HTTP server options.
#
# Steps overview:
# 1) check_dependencies: Verify availability of required tools (Node.js+npm/npx or Python).
#    - If something is missing, the script lists what is missing and suggests macOS (Homebrew)
#      and Debian/Ubuntu install commands, then prompts to continue or exit.
# 2) start_server: Prefer Node.js via `npx serve` on port 8000; if not available, fall back to
#    Python HTTP server (python3, then python) on port 8000.
#
# Usage:
#   ./start-server.sh
#
# Behavior:
#   - Port: Uses port 8000 for both Node and Python servers.
#   - Prompts: If dependencies are missing, you'll see a prompt:
#       "Some dependencies are missing. Continue anyway? [y/N]"
#     Press 'y' to continue with any available tool, or anything else to exit.
#   - macOS notes: If tools are missing, suggested Homebrew commands are displayed.
#
# Note:
#   The dependency check is implemented inline in this script and referred to as the
#   "check_dependencies" step in comments and documentation for clarity.

echo "🚀 Starting local server for algorithms-js..."
echo ""

# Dependency checks
HAS_NODE_NPX=false
HAS_PY3=false
HAS_PY=false

if command -v npx &> /dev/null && command -v node &> /dev/null; then
  HAS_NODE_NPX=true
fi
if command -v python3 &> /dev/null; then
  HAS_PY3=true
fi
if command -v python &> /dev/null; then
  HAS_PY=true
fi

MISSING=false
MISSING_LIST=()

if [ "$HAS_NODE_NPX" != true ]; then
  MISSING=true
  MISSING_LIST+=("Node.js + npm (provides npx)")
fi
if [ "$HAS_PY3" != true ] && [ "$HAS_PY" != true ]; then
  MISSING=true
  MISSING_LIST+=("Python (python3 or python)")
fi

if [ "$MISSING" = true ]; then
  echo "⚠️  Some dependencies are missing:"
  for dep in "${MISSING_LIST[@]}"; do
    echo "  - $dep"
  done
  echo ""
  echo "Suggested install commands:"
  if [ "$HAS_NODE_NPX" != true ]; then
    echo "  # macOS (Homebrew)"
    echo "  brew install node"
    echo "  # Debian/Ubuntu"
    echo "  sudo apt-get update && sudo apt-get install -y nodejs npm"
  fi
  if [ "$HAS_PY3" != true ] && [ "$HAS_PY" != true ]; then
    echo "  # macOS (Homebrew)"
    echo "  brew install python"
    echo "  # Debian/Ubuntu"
    echo "  sudo apt-get update && sudo apt-get install -y python3"
  fi
  echo ""
  read -p "Some dependencies are missing. Continue anyway? [y/N] " choice
  case "$choice" in
    y|Y ) echo "Proceeding despite missing dependencies...";;
    * ) echo "Exiting."; exit 1;;
  esac
fi

# Option 1: Try npx serve (preferred)
echo "Attempting to start with npx serve..."
if [ "$HAS_NODE_NPX" = true ]; then
    echo "✅ Node.js and npm found"
    echo "Starting server at http://localhost:8000"
    echo "Press Ctrl+C to stop the server"
    echo ""
    npx serve . -p 8000
else
    echo "❌ Node.js/npm not found, falling back to Python..."
    echo ""
    
    # Option 2: Fallback to Python HTTP server
    if [ "$HAS_PY3" = true ]; then
        echo "✅ Python 3 found"
        echo "Starting Python HTTP server at http://localhost:8000"
        echo "Press Ctrl+C to stop the server"
        echo ""
        python3 -m http.server 8000
    elif [ "$HAS_PY" = true ]; then
        echo "✅ Python found"
        echo "Starting Python HTTP server at http://localhost:8000"
        echo "Press Ctrl+C to stop the server"
        echo ""
        python -m http.server 8000
    else
        echo "❌ Neither Node.js nor Python found!"
        echo "Please install Node.js or Python to run a local server."
        exit 1
    fi
fi
