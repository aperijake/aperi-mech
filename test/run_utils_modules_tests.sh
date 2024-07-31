#!/bin/bash

# -----------------------------------------------------------------------------
# Check for required files and folders

# Check if utils exists
if [[ ! -d ./utils ]]; then
	echo "utils directory not found. Please run this script from the build directory."
	exit 1
fi

# Check if utils/unit_test_all_modules.py exists
if [[ ! -f ./utils/unit_test_all_modules.py ]]; then
	echo "utils/unit_test_all_modules.py not found. Please run this script from the build directory."
	exit 1
fi

# -----------------------------------------------------------------------------

# Run unit tests for all modules
echo "Running unit tests for all utils modules..."
python3 ./utils/unit_test_all_modules.py
