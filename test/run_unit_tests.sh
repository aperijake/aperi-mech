#!/bin/bash

# -----------------------------------------------------------------------------
# Check for required files and folders

# Check if unit_tests exists
if [[ ! -f ./unit_tests ]]; then
    echo "unit_tests executable not found. Please build the project first."
    echo "This should be run from the build directory using the command: make run_all_tests"
    exit 1
fi

# -----------------------------------------------------------------------------

# Run C++ Google Tests
echo "Running C++ Google Tests..."
./unit_tests
