#!/bin/bash

# Server startup script for algorithms-js project
# This script provides both Node.js (npx serve) and Python HTTP server options

echo "🚀 Starting local server for algorithms-js..."
echo ""

# Option 1: Try npx serve (preferred)
echo "Attempting to start with npx serve..."
if command -v npx &> /dev/null && command -v node &> /dev/null; then
    echo "✅ Node.js and npm found"
    echo "Starting server at http://localhost:8000"
    echo "Press Ctrl+C to stop the server"
    echo ""
    npx serve . -p 8000
else
    echo "❌ Node.js/npm not found, falling back to Python..."
    echo ""
    
    # Option 2: Fallback to Python HTTP server
    if command -v python3 &> /dev/null; then
        echo "✅ Python 3 found"
        echo "Starting Python HTTP server at http://localhost:8000"
        echo "Press Ctrl+C to stop the server"
        echo ""
        python3 -m http.server 8000
    elif command -v python &> /dev/null; then
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
